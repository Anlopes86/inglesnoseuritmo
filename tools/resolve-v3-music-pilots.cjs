const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const context = {
    window: {}, console, URL, URLSearchParams, AbortController, DOMException, setTimeout, clearTimeout, fetch
};
Object.assign(context.window, {
    window: context.window,
    fetch,
    setTimeout,
    clearTimeout
});
vm.createContext(context);

for (const file of ['js/v3-curriculum.js', 'js/music-catalog-v3.js', 'js/lyrics-service-v3.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}

const catalog = context.window.MusicCatalogV3;
const lyricsService = context.window.LyricsServiceV3;
const args = process.argv.slice(2);
const includeAll = args.includes('--all');
const compact = args.includes('--compact');
const summaryOnly = args.includes('--summary');
const countsArg = args.find(arg => arg.startsWith('--counts='));
const inspectionWords = (countsArg?.slice('--counts='.length) || '').split(',').map(value => value.trim()).filter(Boolean);
const requestedIds = new Set(args.filter(arg => !arg.startsWith('--')));
const snapshot = catalog.auditSnapshot();
const scope = includeAll ? snapshot : snapshot.filter(entry => entry.rollout?.pilot);
const entries = requestedIds.size ? scope.filter(entry => requestedIds.has(entry.id)) : scope;

function normalizeMetadata(value) {
    return lyricsService.normalizeAnswer(value)
        .replace(/\b(feat|featuring|ft)\.?\b/g, ' ')
        .replace(/[^\p{L}\p{N}]+/gu, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function sameMetadata(left, right) {
    const a = normalizeMetadata(left);
    const b = normalizeMetadata(right);
    return Boolean(a && b && (a === b || a.includes(b) || b.includes(a)));
}

async function inspectLrclibCandidates(entry) {
    const query = new URLSearchParams({ track_name: entry.song.title, artist_name: entry.song.artist });
    if (entry.song.album) query.set('album_name', entry.song.album);
    let response = await fetch(`https://lrclib.net/api/search?${query}`);
    if (!response.ok) return [];
    let candidates = await response.json();
    if ((!Array.isArray(candidates) || !candidates.length) && entry.song.album) {
        query.delete('album_name');
        response = await fetch(`https://lrclib.net/api/search?${query}`);
        if (!response.ok) return [];
        candidates = await response.json();
    }
    const inspected = (Array.isArray(candidates) ? candidates : [])
        .filter(candidate => sameMetadata(candidate.trackName, entry.song.title))
        .filter(candidate => sameMetadata(candidate.artistName, entry.song.artist))
        .filter(lyricsService.hasUsablePlainLyrics)
        .map(candidate => {
            const wordTokens = lyricsService.tokenizePreservingLayout(candidate.plainLyrics)
                .filter(token => token.kind === 'word')
                .map(token => lyricsService.normalizeAnswer(token.text));
            try {
                const model = lyricsService.buildFiveGapModel(candidate.plainLyrics, entry.gaps);
                return {
                    lrclibId: candidate.id,
                    trackName: candidate.trackName,
                    artistName: candidate.artistName,
                    albumName: candidate.albumName,
                    durationSeconds: candidate.duration,
                    gapValidation: '5-of-5',
                    resolvedGapCount: model.gaps.length,
                    distinctTokenCount: new Set(model.gaps.map(gap => gap.absoluteTokenIndex)).size,
                    wordCounts: Object.fromEntries(inspectionWords.map(word => [word, wordTokens.filter(token => token === lyricsService.normalizeAnswer(word)).length]))
                };
            } catch (error) {
                return {
                    lrclibId: candidate.id,
                    trackName: candidate.trackName,
                    artistName: candidate.artistName,
                    albumName: candidate.albumName,
                    durationSeconds: candidate.duration,
                    gapValidation: error?.code || 'invalid',
                    gapAvailability: entry.gaps.map(gap => ({
                        gapId: gap.id,
                        answer: gap.answer,
                        providerAnswer: gap.providerAnswer || gap.answer,
                        requiredOccurrence: gap.occurrence,
                        availableOccurrences: wordTokens.filter(word => word === lyricsService.normalizeAnswer(gap.providerAnswer || gap.answer)).length
                    })),
                    wordCounts: Object.fromEntries(inspectionWords.map(word => [word, wordTokens.filter(token => token === lyricsService.normalizeAnswer(word)).length]))
                };
            }
        });
    const ranked = inspected
        .map(candidate => ({
            candidate,
            score: (candidate.gapValidation === '5-of-5' ? 100 : 0)
                + (sameMetadata(candidate.albumName, entry.song.album) ? 20 : 0)
                + (Number.isFinite(entry.song.durationSeconds) && Number.isFinite(candidate.durationSeconds)
                    ? Math.max(0, 10 - Math.abs(entry.song.durationSeconds - candidate.durationSeconds))
                    : 0)
        }))
        .sort((left, right) => right.score - left.score)
        .map(item => item.candidate);
    return {
        candidateCount: inspected.length,
        validFiveGapCount: inspected.filter(candidate => candidate.gapValidation === '5-of-5').length,
        topCandidates: ranked.slice(0, 3)
    };
}

async function resolve(entry) {
    const base = {
        id: entry.id,
        curriculumId: entry.curriculumId,
        moduleId: entry.moduleId,
        lessonNumber: entry.lessonNumber,
        title: entry.song.title,
        artist: entry.song.artist,
        catalogSpotifyTrackId: entry.song.spotifyTrackId || null
    };
    try {
        const result = await lyricsService.getLyrics(entry, {
            fetchImpl: fetch,
            storage: null,
            timeoutMs: 10000
        });
        if (result.source !== 'lrclib') {
            return {
                ...base,
                status: 'fallback-only',
                source: result.source,
                blocker: 'lrclib-match',
                lrclibCandidates: await inspectLrclibCandidates(entry)
            };
        }
        const model = lyricsService.buildFiveGapModel(result.plainLyrics, entry.gaps);
        return {
            ...base,
            status: 'lrclib-5-of-5-candidate',
            source: result.source,
            lrclibId: result.providerId,
            providerTrackName: result.trackName,
            providerArtistName: result.artistName,
            providerAlbumName: result.albumName,
            providerDurationSeconds: result.duration,
            resolvedGapCount: model.gaps.length,
            distinctTokenCount: new Set(model.gaps.map(gap => gap.absoluteTokenIndex)).size,
            resolvedOccurrences: model.gaps.map(gap => ({
                gapId: gap.id,
                occurrence: gap.occurrence,
                absoluteTokenIndex: gap.absoluteTokenIndex
            }))
        };
    } catch (error) {
        return {
            ...base,
            status: 'blocked',
            blocker: error?.code || error?.name || 'unknown-error',
            message: error?.message || 'Falha sem detalhes.',
            lrclibCandidates: await inspectLrclibCandidates(entry).catch(() => [])
        };
    }
}

(async () => {
    const results = [];
    for (const entry of entries) results.push(await resolve(entry));
    const report = { generatedAt: new Date().toISOString(), count: results.length, results };
    if (summaryOnly) {
        console.log(JSON.stringify({
            generatedAt: report.generatedAt,
            count: report.count,
            statusCounts: Object.fromEntries([...new Set(results.map(result => result.status))].map(status => [status, results.filter(result => result.status === status).length])),
            failures: results.filter(result => result.status !== 'lrclib-5-of-5-candidate' || result.resolvedGapCount !== 5 || result.distinctTokenCount !== 5).map(result => ({
                id: result.id,
                status: result.status,
                blocker: result.blocker || null,
                resolvedGapCount: result.resolvedGapCount || 0,
                distinctTokenCount: result.distinctTokenCount || 0
            }))
        }, null, 2));
    } else if (compact) {
        console.log(JSON.stringify({
            generatedAt: report.generatedAt,
            count: report.count,
            results: results.map(result => ({
                id: result.id,
                status: result.status,
                blocker: result.blocker || null,
                lrclibId: result.lrclibId || result.lrclibCandidates?.topCandidates?.[0]?.lrclibId || null,
                providerTrackName: result.providerTrackName || result.lrclibCandidates?.topCandidates?.[0]?.trackName || null,
                providerArtistName: result.providerArtistName || result.lrclibCandidates?.topCandidates?.[0]?.artistName || null,
                providerAlbumName: result.providerAlbumName || result.lrclibCandidates?.topCandidates?.[0]?.albumName || null,
                providerDurationSeconds: result.providerDurationSeconds || result.lrclibCandidates?.topCandidates?.[0]?.durationSeconds || null,
                resolvedGapCount: result.resolvedGapCount || result.lrclibCandidates?.topCandidates?.[0]?.resolvedGapCount || 0,
                distinctTokenCount: result.distinctTokenCount || result.lrclibCandidates?.topCandidates?.[0]?.distinctTokenCount || 0,
                gapValidation: result.lrclibCandidates?.topCandidates?.[0]?.gapValidation || (result.status === 'lrclib-5-of-5-candidate' ? '5-of-5' : null),
                gapAvailability: result.lrclibCandidates?.topCandidates?.[0]?.gapAvailability || null
                ,wordCounts: result.lrclibCandidates?.topCandidates?.[0]?.wordCounts || null
            }))
        }, null, 2));
    } else {
        console.log(JSON.stringify(report, null, 2));
    }
    const expected = includeAll ? 54 : 12;
    if (!requestedIds.size && results.length !== expected) process.exitCode = 1;
})().catch(error => {
    console.error(error?.message || error);
    process.exit(1);
});
