(function installLyricsServiceV3(globalScope) {
    'use strict';

    if (globalScope.LyricsServiceV3) return;

    const LRCLIB_BASE = 'https://lrclib.net/api';
    const LYRICS_OVH_BASE = 'https://api.lyrics.ovh/v1';
    const DEFAULT_TIMEOUT_MS = 10000;
    const MAX_RETRY_AFTER_MS = 5000;
    const CACHE_PREFIX = 'music-cloze-v3:lyrics:';

    class LyricsServiceError extends Error {
        constructor(code, message, cause) {
            super(message, cause ? { cause } : undefined);
            this.name = this.constructor.name;
            this.code = code;
        }
    }

    class LyricsTimeoutError extends LyricsServiceError {
        constructor(cause) { super('timeout', 'A busca da letra excedeu o tempo limite.', cause); }
    }

    class LyricsRateLimitError extends LyricsServiceError {
        constructor(cause) { super('rate-limited', 'O provedor de letras limitou temporariamente as consultas.', cause); }
    }

    class LyricsUnavailableError extends LyricsServiceError {
        constructor(cause) { super('lyrics-unavailable', 'Nenhum provedor retornou uma letra utilizável.', cause); }
    }

    class LyricsMatchError extends LyricsServiceError {
        constructor(message = 'A letra não corresponde inequivocamente à gravação cadastrada.', cause) {
            super('provider-mismatch', message, cause);
        }
    }

    class InvalidGapCountError extends LyricsServiceError {
        constructor() { super('invalid-gap-count', 'A atividade precisa declarar exatamente cinco lacunas.'); }
    }

    class GapNotFoundError extends LyricsServiceError {
        constructor(gapId) { super('gap-not-found', `A ocorrência ${gapId || ''} não foi encontrada na letra real.`.trim()); }
    }

    class DuplicateGapPositionError extends LyricsServiceError {
        constructor() { super('duplicate-gap-position', 'Duas lacunas apontam para a mesma ocorrência da letra.'); }
    }

    function normalizeAnswer(value) {
        return String(value ?? '')
            .normalize('NFKC')
            .replace(/[‘’‛`´]/g, "'")
            .trim()
            .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '')
            .toLocaleLowerCase('en');
    }

    function normalizeMetadata(value) {
        return normalizeAnswer(value)
            .replace(/\b(feat|featuring|ft)\.?\b/g, ' ')
            .replace(/[^\p{L}\p{N}]+/gu, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function isWordToken(value) {
        return /^(?:[\p{L}\p{M}]+(?:['’\-][\p{L}\p{M}]+)*|\p{N})$/u.test(value);
    }

    function tokenizePreservingLayout(plainLyrics) {
        const source = String(plainLyrics ?? '');
        const matches = source.match(/[\p{L}\p{M}]+(?:['’\-][\p{L}\p{M}]+)*|\p{N}|[^\p{L}\p{M}\p{N}]+/gu) || [];
        return matches.map((text, absoluteTokenIndex) => ({
            text,
            absoluteTokenIndex,
            kind: isWordToken(text) ? 'word' : 'layout'
        }));
    }

    function answerWords(value) {
        return tokenizePreservingLayout(value)
            .filter(token => token.kind === 'word')
            .map(token => normalizeAnswer(token.text));
    }

    function resolveOccurrence(tokens, spec) {
        const wanted = answerWords(spec?.providerAnswer || spec?.answer);
        if (!wanted.length || !Number.isInteger(spec?.occurrence) || spec.occurrence < 1) return null;
        const wordIndexes = tokens
            .map((token, index) => token.kind === 'word' ? index : -1)
            .filter(index => index >= 0);
        let occurrence = 0;

        for (let cursor = 0; cursor <= wordIndexes.length - wanted.length; cursor += 1) {
            const matches = wanted.every((word, offset) => normalizeAnswer(tokens[wordIndexes[cursor + offset]].text) === word);
            if (!matches) continue;
            occurrence += 1;
            if (occurrence === spec.occurrence) {
                const startTokenIndex = wordIndexes[cursor];
                const endTokenIndex = wordIndexes[cursor + wanted.length - 1];
                return {
                    id: spec.id,
                    answer: spec.answer,
                    providerAnswer: spec.providerAnswer || spec.answer,
                    acceptedAnswers: Array.from(new Set([spec.answer, ...(spec.acceptedAnswers || [])])),
                    occurrence: spec.occurrence,
                    absoluteTokenIndex: tokens[startTokenIndex].absoluteTokenIndex,
                    startTokenIndex,
                    endTokenIndex
                };
            }
        }
        return null;
    }

    function pushText(lines, value) {
        const chunks = String(value).split(/(\r?\n)/);
        chunks.forEach(chunk => {
            if (!chunk) return;
            if (/^\r?\n$/.test(chunk)) {
                lines.push({ id: `line-${lines.length + 1}`, segments: [] });
                return;
            }
            const line = lines[lines.length - 1];
            const previous = line.segments.at(-1);
            if (previous && previous.type === 'text') previous.text += chunk;
            else line.segments.push({ type: 'text', text: chunk });
        });
    }

    function maskResolvedTokens(tokens, resolved) {
        const byStart = new Map(resolved.map((gap, gapIndex) => [gap.startTokenIndex, { ...gap, gapIndex }]));
        const lines = [{ id: 'line-1', segments: [] }];
        for (let index = 0; index < tokens.length; index += 1) {
            const gap = byStart.get(index);
            if (gap) {
                lines[lines.length - 1].segments.push({
                    type: 'gap',
                    gapId: gap.id,
                    gapIndex: gap.gapIndex,
                    gapPosition: `gap-${gap.gapIndex + 1}`
                });
                index = gap.endTokenIndex;
                continue;
            }
            pushText(lines, tokens[index].text);
        }
        return lines;
    }

    function buildFiveGapModel(plainLyrics, gapSpecs) {
        if (!Array.isArray(gapSpecs) || gapSpecs.length !== 5) throw new InvalidGapCountError();
        const tokens = tokenizePreservingLayout(plainLyrics);
        const resolved = gapSpecs.map((spec, index) => resolveOccurrence(tokens, { id: spec.id || `gap-${index + 1}`, ...spec }));
        const missingIndex = resolved.findIndex(item => !item);
        if (missingIndex >= 0) throw new GapNotFoundError(gapSpecs[missingIndex]?.id || `gap-${missingIndex + 1}`);
        const positions = new Set(resolved.map(item => item.absoluteTokenIndex));
        if (positions.size !== 5) throw new DuplicateGapPositionError();
        return {
            lines: maskResolvedTokens(tokens, resolved),
            gaps: resolved.map(({ startTokenIndex, endTokenIndex, ...gap }) => gap)
        };
    }

    function hasUsablePlainLyrics(result) {
        const text = result?.plainLyrics;
        return typeof text === 'string' && text.trim().length >= 20 && result?.instrumental !== true;
    }

    function getSessionStorage() {
        try {
            return globalScope.sessionStorage || null;
        } catch {
            return null;
        }
    }

    function readSessionCache(entryId, storage = getSessionStorage()) {
        if (!entryId || !storage) return null;
        try {
            const parsed = JSON.parse(storage.getItem(`${CACHE_PREFIX}${entryId}`) || 'null');
            return hasUsablePlainLyrics(parsed) ? parsed : null;
        } catch {
            return null;
        }
    }

    function writeSessionCache(entryId, result, storage = getSessionStorage()) {
        if (!entryId || !storage || !hasUsablePlainLyrics(result)) return;
        try {
            storage.setItem(`${CACHE_PREFIX}${entryId}`, JSON.stringify(result));
        } catch {
            // sessionStorage can be unavailable in privacy/file modes; the activity still works.
        }
    }

    function retryDelayMs(response) {
        const header = response?.headers?.get?.('Retry-After');
        if (!header) return 1000;
        const seconds = Number(header);
        if (Number.isFinite(seconds)) return Math.min(MAX_RETRY_AFTER_MS, Math.max(0, seconds * 1000));
        const dateDelay = Date.parse(header) - Date.now();
        return Math.min(MAX_RETRY_AFTER_MS, Math.max(0, dateDelay || 1000));
    }

    function delay(ms, signal) {
        return new Promise((resolve, reject) => {
            const timer = globalScope.setTimeout(resolve, ms);
            signal?.addEventListener?.('abort', () => {
                globalScope.clearTimeout(timer);
                reject(signal.reason || new DOMException('Aborted', 'AbortError'));
            }, { once: true });
        });
    }

    async function requestJson(url, { fetchImpl, signal, timeoutMs = DEFAULT_TIMEOUT_MS, retry429 = true } = {}) {
        if (typeof fetchImpl !== 'function') throw new LyricsUnavailableError();
        const controller = new AbortController();
        const abortFromCaller = () => controller.abort(signal?.reason);
        signal?.addEventListener?.('abort', abortFromCaller, { once: true });
        const timer = globalScope.setTimeout(() => controller.abort(), timeoutMs);
        try {
            let response = await fetchImpl(url, { headers: { Accept: 'application/json' }, signal: controller.signal });
            if (response.status === 429 && retry429) {
                await delay(retryDelayMs(response), controller.signal);
                response = await fetchImpl(url, { headers: { Accept: 'application/json' }, signal: controller.signal });
            }
            if (response.status === 429) throw new LyricsRateLimitError();
            if (!response.ok) throw new LyricsServiceError(`http-${response.status}`, `Falha HTTP ${response.status} no provedor de letras.`);
            return await response.json();
        } catch (error) {
            if (error?.name === 'AbortError') throw new LyricsTimeoutError(error);
            throw error;
        } finally {
            globalScope.clearTimeout(timer);
            signal?.removeEventListener?.('abort', abortFromCaller);
        }
    }

    function sameMetadata(left, right) {
        const a = normalizeMetadata(left);
        const b = normalizeMetadata(right);
        return Boolean(a && b && (a === b || a.includes(b) || b.includes(a)));
    }

    function durationMatches(expected, actual, toleranceSeconds = 4) {
        if (!Number.isFinite(expected) || !Number.isFinite(actual)) return true;
        return Math.abs(expected - actual) <= toleranceSeconds;
    }

    function durationProximityScore(expected, actual, toleranceSeconds = 4) {
        if (!Number.isFinite(expected) || !Number.isFinite(actual)) return 0;
        return Math.max(0, toleranceSeconds + 1 - Math.abs(expected - actual));
    }

    function validateProviderMatch(candidate, song, { requireDuration = false } = {}) {
        if (!hasUsablePlainLyrics(candidate)) throw new LyricsUnavailableError();
        if (!sameMetadata(candidate.trackName, song?.title) || !sameMetadata(candidate.artistName, song?.artist)) {
            throw new LyricsMatchError();
        }
        if ((requireDuration || Number.isFinite(song?.durationSeconds)) && !durationMatches(song?.durationSeconds, candidate.duration)) {
            throw new LyricsMatchError('A duração da letra não corresponde à gravação cadastrada.');
        }
        return candidate;
    }

    function selectBestCandidate(candidates, song) {
        const usable = (Array.isArray(candidates) ? candidates : [])
            .filter(hasUsablePlainLyrics)
            .filter(candidate => sameMetadata(candidate.trackName, song?.title) && sameMetadata(candidate.artistName, song?.artist))
            .filter(candidate => durationMatches(song?.durationSeconds, candidate.duration))
            .map(candidate => ({
                candidate,
                score: 10
                    + (sameMetadata(candidate.albumName, song?.album) ? 2 : 0)
                    + durationProximityScore(song?.durationSeconds, candidate.duration)
            }))
            .sort((left, right) => right.score - left.score);
        if (!usable.length) throw new LyricsMatchError();
        if (usable[1] && usable[1].score === usable[0].score && usable[1].candidate.id !== usable[0].candidate.id) {
            throw new LyricsMatchError('A busca retornou mais de uma gravação igualmente provável.');
        }
        return usable[0].candidate;
    }

    async function lrclibGetById(id, options) {
        return requestJson(`${LRCLIB_BASE}/get/${encodeURIComponent(id)}`, options);
    }

    async function lrclibBestMatch(song, options) {
        const query = new URLSearchParams({ track_name: song.title, artist_name: song.artist });
        if (!song.album) {
            const candidates = await requestJson(`${LRCLIB_BASE}/search?${query}`, options);
            return selectBestCandidate(candidates, song);
        }

        query.set('album_name', song.album);
        try {
            const albumCandidates = await requestJson(`${LRCLIB_BASE}/search?${query}`, options);
            return selectBestCandidate(albumCandidates, song);
        } catch (error) {
            if (!(error instanceof LyricsMatchError)) throw error;
            query.delete('album_name');
            const broadCandidates = await requestJson(`${LRCLIB_BASE}/search?${query}`, options);
            return selectBestCandidate(broadCandidates, song);
        }
    }

    async function lyricsOvhFallback(song, options) {
        const result = await requestJson(`${LYRICS_OVH_BASE}/${encodeURIComponent(song.artist)}/${encodeURIComponent(song.title)}`, options);
        return {
            id: null,
            trackName: song.title,
            artistName: song.artist,
            albumName: song.album || null,
            duration: song.durationSeconds || null,
            instrumental: false,
            plainLyrics: result?.lyrics,
            syncedLyrics: null
        };
    }

    function sanitizedResult(result, source) {
        return {
            source,
            providerId: result?.id ?? null,
            trackName: result?.trackName || null,
            artistName: result?.artistName || null,
            albumName: result?.albumName || null,
            duration: Number.isFinite(result?.duration) ? result.duration : null,
            plainLyrics: result.plainLyrics,
            syncedLyrics: typeof result?.syncedLyrics === 'string' ? result.syncedLyrics : null
        };
    }

    async function getLyrics(entry, { signal, fetchImpl = globalScope.fetch?.bind(globalScope), timeoutMs = DEFAULT_TIMEOUT_MS, storage = getSessionStorage() } = {}) {
        const cached = readSessionCache(entry?.id, storage);
        if (cached) return cached;
        if (!entry?.song?.title || !entry?.song?.artist) throw new LyricsMatchError('Metadados da faixa incompletos.');
        const requestOptions = { fetchImpl, signal, timeoutMs };
        let primaryError = null;

        try {
            const candidate = entry?.lyrics?.lrclibId
                ? await lrclibGetById(entry.lyrics.lrclibId, requestOptions)
                : await lrclibBestMatch(entry.song, requestOptions);
            const matched = validateProviderMatch(candidate, entry.song);
            const result = sanitizedResult(matched, 'lrclib');
            writeSessionCache(entry.id, result, storage);
            return result;
        } catch (error) {
            primaryError = error;
        }

        if (entry?.lyrics?.fallback === 'lyricsovh') {
            try {
                const fallback = await lyricsOvhFallback(entry.song, requestOptions);
                if (hasUsablePlainLyrics(fallback)) {
                    const result = sanitizedResult(fallback, 'lyricsovh-fallback');
                    writeSessionCache(entry.id, result, storage);
                    return result;
                }
            } catch {
                // The typed error below intentionally hides provider internals from students.
            }
        }
        throw new LyricsUnavailableError(primaryError);
    }

    function editDistance(left, right) {
        const a = Array.from(left);
        const b = Array.from(right);
        const row = b.map((_, index) => index + 1);
        for (let i = 0; i < a.length; i += 1) {
            let previous = i;
            row[0] = i + 1;
            for (let j = 0; j < b.length; j += 1) {
                const current = row[j + 1];
                row[j + 1] = a[i] === b[j]
                    ? previous
                    : Math.min(previous + 1, row[j] + 1, row[j + 1] + 1);
                previous = current;
            }
        }
        return row[b.length] || a.length;
    }

    function gradeAnswer(value, gap) {
        const normalized = normalizeAnswer(value);
        const accepted = Array.from(new Set([gap.answer, ...(gap.acceptedAnswers || [])])).map(normalizeAnswer);
        if (normalized && accepted.includes(normalized)) return 'correct';
        const compact = normalized.replace(/'/g, '');
        if (compact && accepted.some(answer => answer.replace(/'/g, '') === compact || editDistance(normalized, answer) === 1)) return 'almost';
        return 'pending';
    }

    function gradeResponses(gaps, responses, { reveal = false } = {}) {
        return gaps.map((gap, index) => ({
            id: gap.id,
            status: gradeAnswer(responses[index]?.value, gap),
            reveal: reveal ? gap.answer : null
        }));
    }

    globalScope.LyricsServiceV3 = Object.freeze({
        version: '2026.08.22-lrclib-runtime',
        errors: Object.freeze({
            LyricsServiceError,
            LyricsTimeoutError,
            LyricsRateLimitError,
            LyricsUnavailableError,
            LyricsMatchError,
            InvalidGapCountError,
            GapNotFoundError,
            DuplicateGapPositionError
        }),
        normalizeAnswer,
        tokenizePreservingLayout,
        resolveOccurrence,
        buildFiveGapModel,
        hasUsablePlainLyrics,
        selectBestCandidate,
        gradeAnswer,
        gradeResponses,
        getLyrics,
        readSessionCache
    });
}(window));
