const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const conversationDir = path.join(root, 'conversation');
const outputPath = path.join(conversationDir, 'conversation-music-catalog-01-48.js');
const reportPath = path.join(root, 'docs', 'conversation-music-01-48-drafts.md');
const approvalsPath = path.join(conversationDir, 'conversation-music-approvals-01-48.json');
const checkedAt = new Date().toISOString().slice(0, 10);
const concurrency = 6;

global.window = {};
require(path.join(conversationDir, 'conversation-lessons-01-48-data.js'));
require(path.join(conversationDir, 'conversation-music-catalog-49-64.js'));
const lessons = global.window.CONVERSATION_LESSONS_01_48 || {};
const laterRecords = global.window.ConversationMusicCatalog?.records || [];
const approvals = fs.existsSync(approvalsPath) ? JSON.parse(fs.readFileSync(approvalsPath, 'utf8')) : {};

const blockedAnswers = new Set([
    'bitch', 'bitches', 'shit', 'fuck', 'fucking', 'motherfucker', 'damn', 'ass', 'dick', 'pussy',
    'nigga', 'nigger', 'whore', 'slut', 'cunt', 'faggot', 'retard'
]);
const stopwords = new Set(`
    a about above after again against all am an and any are as at be because been before being below between both but by
    can could did do does doing down during each few for from further had has have having he her here hers herself him
    himself his how i if in into is it its itself just me more most my myself no nor not of off on once only or other our
    ours ourselves out over own same she should so some such than that the their theirs them themselves then there these
    they this those through to too under until up very was we were what when where which while who whom why with would you
    your yours yourself yourselves gonna wanna gotta yeah oh ooh ah uh huh hmm mmm whoa woah woo la na da hey well cause
    got get gets getting make makes made come comes came go goes went like one two three four five six seven eight nine ten
  `.trim().split(/\s+/));

function normalize(value) {
    return String(value || '')
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[‘’‛`´]/g, "'")
        .toLowerCase()
        .replace(/\b(feat|featuring|ft)\.?\b/g, ' ')
        .replace(/[^a-z0-9]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function comparableTitle(value) {
    return normalize(value)
        .replace(/\b(remaster(?:ed)?|version|edit|explicit|clean|mono|stereo|single|album|radio|original|soundtrack|feat)\b/g, ' ')
        .replace(/\b\d{4}\b/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function comparableArtist(value) {
    return normalize(value).replace(/\b(and|the)\b/g, ' ').replace(/\s+/g, ' ').trim();
}

function sameWordFamily(left, right) {
    const first = normalize(left).replace(/\s/g, '');
    const second = normalize(right).replace(/\s/g, '');
    if (!first || !second) return false;
    if (first === second) return true;
    const shorter = first.length <= second.length ? first : second;
    const longer = first.length > second.length ? first : second;
    return shorter.length >= 3 && longer.startsWith(shorter);
}

function tokens(lyrics) {
    const matches = String(lyrics || '').match(/[\p{L}\p{M}]+(?:['’\-][\p{L}\p{M}]+)*|\p{N}/gu) || [];
    return matches.map((text, index) => ({ text, index, normalized: normalize(text) }));
}

function singularKey(value) {
    const word = normalize(value).replace(/\s/g, '');
    if (word.length > 4 && word.endsWith('ies')) return `${word.slice(0, -3)}y`;
    if (word.length > 4 && /(ches|shes|sses|xes|zes)$/.test(word)) return word.slice(0, -2);
    if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
    return word;
}

function titleIncludesWord(title, value) {
    const wanted = singularKey(value);
    return tokens(title).some((token) => singularKey(token.text) === wanted);
}

function selectFiveGaps(plainLyrics, songTitle) {
    const words = tokens(plainLyrics);
    const frequencies = new Map();
    words.forEach((word) => frequencies.set(word.normalized, (frequencies.get(word.normalized) || 0) + 1));
    const baseCandidates = words.filter((word) => /^[a-z]+(?:'[a-z]+)?$/.test(word.normalized)
        && word.normalized.length >= 3
        && word.normalized.length <= 16
        && !blockedAnswers.has(word.normalized)
        && !titleIncludesWord(songTitle, word.text));
    const strictCandidates = baseCandidates.filter((word) => word.index > 4
        && word.index < words.length - 4
        && !stopwords.has(word.normalized));
    const relaxedCandidates = baseCandidates.filter((word) => word.normalized.length >= 4);
    function attemptSelection(eligible) {
        const attempt = [];
        for (const target of [0.12, 0.31, 0.5, 0.69, 0.88]) {
            const targetIndex = target * words.length;
            const available = eligible.filter((candidate) => !attempt.some((item) => item.index === candidate.index));
            const distinctAnswers = available.filter((candidate) => !attempt.some((item) => sameWordFamily(item.normalized, candidate.normalized)));
            const winner = distinctAnswers
                .map((candidate) => {
                    const frequency = frequencies.get(candidate.normalized) || 1;
                    const audible = frequency >= 2 && frequency <= 8 ? 1.2 : 0.3;
                    const spread = Math.abs(candidate.index - targetIndex) / Math.max(words.length, 1);
                    const stopwordPenalty = stopwords.has(candidate.normalized) ? 1.1 : 0;
                    return { candidate, score: audible + Math.min(candidate.normalized.length, 8) / 8 - stopwordPenalty - spread * 8 };
                })
                .sort((left, right) => right.score - left.score)[0]?.candidate;
            if (!winner) return null;
            attempt.push(winner);
        }
        return attempt;
    }
    const selected = attemptSelection(strictCandidates)
        || attemptSelection(relaxedCandidates);
    if (!selected) throw new Error('could not distribute five safe gaps');
    selected.sort((left, right) => left.index - right.index);
    const wanted = new Map(selected.map((word) => [word.index, word]));
    const occurrences = new Map();
    const gaps = [];
    words.forEach((word) => {
        const occurrence = (occurrences.get(word.normalized) || 0) + 1;
        occurrences.set(word.normalized, occurrence);
        if (!wanted.has(word.index)) return;
        gaps.push({
            id: `gap-${gaps.length + 1}`,
            answer: word.text,
            providerAnswer: word.text,
            occurrence,
            acceptedAnswers: [word.text]
        });
    });
    return gaps;
}

async function fetchWithRetries(url, options = {}, attempts = 3) {
    let lastError;
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
        try {
            const response = await fetch(url, options);
            if (response.ok) return response;
            lastError = new Error(`HTTP ${response.status}`);
            if (response.status !== 429 && response.status < 500) break;
        } catch (error) {
            lastError = error;
        }
        await new Promise((resolve) => setTimeout(resolve, attempt * 350));
    }
    throw lastError || new Error('request failed');
}

async function spotifyMetadata(spotifyId) {
    const response = await fetchWithRetries(`https://open.spotify.com/embed/track/${spotifyId}`, {
        headers: { 'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8' }
    });
    const html = await response.text();
    const json = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/)?.[1];
    if (!json) throw new Error('Spotify embed metadata missing');
    const entity = JSON.parse(json)?.props?.pageProps?.state?.data?.entity;
    if (!entity || entity.type !== 'track' || entity.id !== spotifyId) throw new Error('Spotify returned a different entity');
    return {
        title: entity.name || entity.title,
        artists: (entity.artists || []).map((artist) => artist.name),
        durationSeconds: Math.round(Number(entity.duration || 0) / 1000),
        isPlayableAtCheck: entity.isPlayable === true,
        playabilityReason: entity.playabilityReason || null,
        releaseDate: entity.releaseDate?.isoString || null,
        album: entity.album?.name || entity.albumOfTrack?.name || null
    };
}

function lrclibScore(candidate, spotify) {
    const wantedTitle = comparableTitle(spotify.title);
    const foundTitle = comparableTitle(candidate.trackName || candidate.name);
    const wantedArtists = spotify.artists.map(comparableArtist);
    const foundArtist = comparableArtist(candidate.artistName);
    let score = wantedTitle === foundTitle ? 50 : (wantedTitle.includes(foundTitle) || foundTitle.includes(wantedTitle) ? 22 : 0);
    if (wantedArtists.some((artist) => artist === foundArtist)) score += 30;
    else if (wantedArtists.some((artist) => artist.includes(foundArtist) || foundArtist.includes(artist))) score += 16;
    const durationDelta = Math.abs(Number(candidate.duration || 0) - spotify.durationSeconds);
    if (durationDelta <= 2) score += 15;
    else if (durationDelta <= 5) score += 9;
    else if (durationDelta <= 10) score += 3;
    if (candidate.plainLyrics && candidate.instrumental !== true) score += 5;
    return score;
}

async function lrclibMatch(spotify) {
    const query = new URLSearchParams({ track_name: spotify.title, artist_name: spotify.artists[0] || '' });
    const response = await fetchWithRetries(`https://lrclib.net/api/search?${query}`, { headers: { Accept: 'application/json' } });
    const candidates = await response.json();
    const ranked = candidates
        .filter((candidate) => typeof candidate.plainLyrics === 'string' && candidate.plainLyrics.trim().length >= 30 && candidate.instrumental !== true)
        .map((candidate) => ({ candidate, score: lrclibScore(candidate, spotify) }))
        .sort((left, right) => right.score - left.score);
    if (!ranked[0] || ranked[0].score < 82) throw new Error('no confident LRCLIB recording match');
    const candidate = ranked[0].candidate;
    return {
        id: candidate.id,
        trackName: candidate.trackName,
        artistName: candidate.artistName,
        albumName: candidate.albumName || null,
        durationSeconds: candidate.duration,
        score: ranked[0].score,
        gaps: selectFiveGaps(candidate.plainLyrics, `${spotify.title} ${candidate.trackName || ''}`)
    };
}

function normalizedSongKey(title, artists) {
    return `${comparableTitle(title)}::${(Array.isArray(artists) ? artists : [artists]).map(comparableArtist).sort().join('&')}`;
}

const laterSpotifyIds = new Set(laterRecords.map((entry) => entry.song.spotifyId));
const laterSongKeys = new Set(laterRecords.map((entry) => normalizedSongKey(entry.song.title, entry.song.artist)));

async function buildRecord(job) {
    const { lessonNumber, songIndex, sourceSong } = job;
    const id = `conversation-l${String(lessonNumber).padStart(2, '0')}-song-${songIndex + 1}`;
    const reasons = [];
    let spotify = null;
    let provider = null;
    try {
        spotify = await spotifyMetadata(sourceSong.spotifyId);
        if (!spotify.isPlayableAtCheck) reasons.push(`Spotify embed not playable at check (${spotify.playabilityReason || 'unknown reason'})`);
        if (comparableTitle(sourceSong.title) !== comparableTitle(spotify.title)) reasons.push(`source title differs from Spotify title (${spotify.title})`);
    } catch (error) {
        reasons.push(`Spotify verification failed: ${error.message}`);
    }
    if (laterSpotifyIds.has(sourceSong.spotifyId)) reasons.push('duplicate Spotify ID with lessons 49–64');
    if (spotify && laterSongKeys.has(normalizedSongKey(spotify.title, spotify.artists))) reasons.push('duplicate recording with lessons 49–64');
    if (spotify) {
        try {
            provider = await lrclibMatch(spotify);
        } catch (error) {
            reasons.push(`LRCLIB verification failed: ${error.message}`);
        }
    }
    reasons.push('BR availability requires human audit with an authenticated Spotify market check');
    reasons.push('exact recording/version and five occurrences require human playback audit');

    const approval = approvals[id];
    const canApprove = approval?.spotifyRecordingConfirmed === true
        && approval?.brAvailabilityConfirmed === true
        && approval?.lrclibRecordingConfirmed === true
        && approval?.fiveOccurrencesAudited === true
        && approval?.activityPlaybackTested === true
        && spotify
        && provider
        && provider.gaps.length === 5
        && !reasons.some((reason) => /failed|duplicate|differs|not playable/i.test(reason));
    if (approval && !canApprove) throw new Error(`${id} is manually approved but does not satisfy the complete verification contract`);

    return {
        id,
        lessonNumber,
        songIndex,
        status: canApprove ? 'provider-verified' : 'draft-until-provider-match',
        draftReasons: canApprove ? [] : reasons,
        song: {
            title: spotify?.title || sourceSong.title,
            artist: spotify?.artists?.join(', ') || sourceSong.artist,
            displayTitle: sourceSong.title,
            displayArtist: spotify?.artists?.join(', ') || sourceSong.artist,
            version: spotify?.title || 'pending exact-version review',
            album: spotify?.album || null,
            releaseDate: spotify?.releaseDate || null,
            durationSeconds: spotify?.durationSeconds || null,
            spotifyId: sourceSong.spotifyId,
            spotifyEmbedPlayableAtCheck: spotify?.isPlayableAtCheck === true,
            brAvailabilityConfirmed: canApprove
        },
        lyrics: {
            provider: 'lrclib',
            lrclibId: provider?.id || null,
            providerTrackName: provider?.trackName || null,
            providerArtistName: provider?.artistName || null,
            providerDurationSeconds: provider?.durationSeconds || null,
            fallback: 'lyricsovh',
            cache: 'sessionStorage',
            checkedAt
        },
        gaps: provider?.gaps || [],
        pedagogy: { maxAttempts: 3, application: sourceSong.discussionTitle },
        verification: {
            spotifyRecordingConfirmed: canApprove,
            brAvailabilityConfirmed: canApprove,
            lrclibRecordingConfirmed: canApprove,
            fiveOccurrencesAudited: canApprove,
            activityPlaybackTested: canApprove
        },
        rights: { usageScope: 'private-course-runtime', commercialPublicationApproved: false }
    };
}

async function mapLimit(items, limit, worker) {
    const results = new Array(items.length);
    let cursor = 0;
    async function run() {
        while (cursor < items.length) {
            const index = cursor;
            cursor += 1;
            results[index] = await worker(items[index], index);
            process.stdout.write(`${String(index + 1).padStart(3, '0')}/${items.length} ${results[index].id} ${results[index].status}\n`);
        }
    }
    await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
    return results;
}

function validateRecord(entry) {
    const errors = [];
    if (!/^[A-Za-z0-9]{22}$/.test(entry.song.spotifyId || '')) errors.push('invalid Spotify track ID');
    if (!['provider-verified', 'draft-until-provider-match'].includes(entry.status)) errors.push('invalid status');
    if (entry.status === 'provider-verified') {
        if (!Number.isInteger(entry.lyrics.lrclibId)) errors.push('verified record missing LRCLIB ID');
        if (entry.gaps.length !== 5) errors.push('verified record must have five gaps');
        if (!entry.song.brAvailabilityConfirmed) errors.push('verified record missing BR confirmation');
        if (!Object.values(entry.verification).every(Boolean)) errors.push('verified record missing audit evidence');
    }
    if (entry.status === 'draft-until-provider-match' && !entry.draftReasons.length) errors.push('draft missing explicit reason');
    if (entry.rights.usageScope !== 'private-course-runtime' || entry.rights.commercialPublicationApproved !== false) errors.push('invalid rights');
    if (entry.lyrics.cache !== 'sessionStorage') errors.push('invalid cache policy');
    const answers = entry.gaps.map((gap) => normalize(gap.answer));
    if (answers.some((answer) => blockedAnswers.has(answer))) errors.push('offensive gap answer');
    const positions = new Set(entry.gaps.map((gap) => `${normalize(gap.answer)}:${gap.occurrence}`));
    if (positions.size !== entry.gaps.length) errors.push('repeated gap position');
    if (new Set(entry.gaps.map((gap) => singularKey(gap.answer))).size !== entry.gaps.length) errors.push('repeated gap answer');
    const completeTitle = [entry.song.title, entry.song.displayTitle, entry.song.version].filter(Boolean).join(' ');
    if (entry.gaps.some((gap) => titleIncludesWord(completeTitle, gap.answer))) errors.push('gap answer repeats a title word');
    return errors;
}

async function main() {
    const jobs = Object.values(lessons).flatMap((lesson) => lesson.songs.map((sourceSong, songIndex) => ({
        lessonNumber: lesson.lessonNumber,
        songIndex,
        sourceSong
    })));
    if (jobs.length !== 144) throw new Error(`Expected 144 source songs, found ${jobs.length}`);
    const records = await mapLimit(jobs, concurrency, buildRecord);
    const validationErrors = records.flatMap((entry) => validateRecord(entry).map((error) => `${entry.id}: ${error}`));
    if (validationErrors.length) throw new Error(`Catalog validation failed before write:\n${validationErrors.join('\n')}`);

    const source = `(function installConversationMusicCatalog0148(globalScope) {\n    'use strict';\n\n    const records = ${JSON.stringify(records, null, 4).replace(/</g, '\\u003c')};\n    const byLessonAndSong = new Map(records.map((entry) => [entry.lessonNumber + ':' + entry.songIndex, entry]));\n\n    function get(lessonNumber, songIndex) {\n        return byLessonAndSong.get(Number(lessonNumber) + ':' + Number(songIndex)) || null;\n    }\n\n    function validate(entry) {\n        const errors = [];\n        if (!entry || !['provider-verified', 'draft-until-provider-match'].includes(entry.status)) errors.push('invalid publication status');\n        if (!/^[A-Za-z0-9]{22}$/.test(entry?.song?.spotifyId || '')) errors.push('missing exact Spotify track ID');\n        if (entry?.status === 'provider-verified' && (!Number.isInteger(entry?.lyrics?.lrclibId) || entry?.gaps?.length !== 5 || entry?.song?.brAvailabilityConfirmed !== true)) errors.push('incomplete verified record');\n        if (entry?.status === 'draft-until-provider-match' && !entry?.draftReasons?.length) errors.push('draft reason missing');\n        return { valid: errors.length === 0, errors };\n    }\n\n    globalScope.ConversationMusicCatalog0148 = Object.freeze({\n        version: '${checkedAt}-conversation-01-48',\n        records: Object.freeze(records),\n        get,\n        validate\n    });\n}(window));\n`;

    const verified = records.filter((entry) => entry.status === 'provider-verified');
    const drafts = records.filter((entry) => entry.status === 'draft-until-provider-match');
    const report = [
        '# Conversation music 01–48 — provider audit',
        '',
        `Checked: ${checkedAt}`,
        '',
        `- Records: ${records.length}`,
        `- Provider-verified: ${verified.length}`,
        `- Drafts blocked from Student View: ${drafts.length}`,
        `- Candidate five-gap sets derived from provider responses: ${records.filter((entry) => entry.gaps.length === 5).length}`,
        `- Persisted commercial lyrics: 0`,
        '',
        '> A candidate LRCLIB match and mechanically selected occurrences are not human verification. Promotion requires the five explicit approvals consumed by the builder.',
        '',
        '| Record | Spotify recording | LRCLIB | Gaps | Status | Reasons |',
        '|---|---|---:|---:|---|---|',
        ...records.map((entry) => `| ${entry.id} | ${entry.song.title} — ${entry.song.artist} (${entry.song.spotifyId}) | ${entry.lyrics.lrclibId || '—'} | ${entry.gaps.length} | ${entry.status} | ${entry.draftReasons.join('; ').replace(/\|/g, '\\|')} |`),
        ''
    ].join('\n');

    fs.writeFileSync(outputPath, source, 'utf8');
    fs.writeFileSync(reportPath, report, 'utf8');
    console.log(JSON.stringify({
        output: path.relative(root, outputPath),
        report: path.relative(root, reportPath),
        records: records.length,
        verified: verified.length,
        drafts: drafts.length,
        fiveGapCandidates: records.filter((entry) => entry.gaps.length === 5).length
    }, null, 2));
}

main().catch((error) => {
    console.error(error.stack || error.message);
    process.exitCode = 1;
});
