const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
global.window = {};
require(path.join(root, 'conversation', 'conversation-lessons-49-64-data.js'));

const lessons = global.window.CONVERSATION_LESSONS_49_64 || {};
const outputPath = path.join(root, 'conversation', 'conversation-music-catalog-49-64.js');
const LRCLIB_SEARCH = 'https://lrclib.net/api/search';
const checkedAt = new Date().toISOString().slice(0, 10);

// Spotify embeds accept entity IDs, not search-result URLs. Keep the audited
// recording here so player and lyric version can be reviewed together.
const spotifyTrackIds = Object.freeze({
    'conversation-l49-song-1': '1Ra0pQectEGFwphga6Wjp3',
    'conversation-l49-song-2': '6wLr2oR8eqUG5Beleh2Crm',
    'conversation-l49-song-3': '2ta2DmbyI7KdW9yOwPw7ZO',
    'conversation-l50-song-1': '6LbbHFEajG9e4m0G3L47c4',
    'conversation-l50-song-2': '2Gmd9BitEz234M0E3B7G42',
    'conversation-l50-song-3': '4NcLRJO8OhQMQG53z6UHH1',
    'conversation-l51-song-1': '6dGnYIeXmHdcikdzNNDMm2',
    'conversation-l51-song-2': '7ju97lgwC2rKQ6wwsf9no9',
    'conversation-l51-song-3': '203lAMNjyNvuFUHXUxh3hI',
    'conversation-l52-song-1': '7hm9miC688ky6xX21rgicM',
    'conversation-l52-song-2': '5QZZn6JcZC3VtB0epVMRCB',
    'conversation-l52-song-3': '52jNazR4uZDqOG1k9oayWi',
    'conversation-l53-song-1': '1ABegtCPBMMJaMpfDyATjE',
    'conversation-l53-song-2': '1Pq47iFLC5U7j8xeNiNcuS',
    'conversation-l53-song-3': '5hKlxxRX96eR2Oi0auituc',
    'conversation-l54-song-1': '02GgUmkJBMmSdy0WXeV7CN',
    'conversation-l54-song-2': '00mZZjdgFvsWVcca64tiTe',
    'conversation-l54-song-3': '70smu7ojvXHycIMfw8BSBc',
    'conversation-l55-song-1': '5bRSLTBk2FYSll8VNSL8Xy',
    'conversation-l55-song-2': '0amPV8GYRh530Z3Oau0JwY',
    'conversation-l55-song-3': '2Q5wSOwq6BDSu7sSVMNrtT',
    'conversation-l56-song-1': '4401c08DdNwwGEg8WGCkQf',
    'conversation-l56-song-2': '1E8z7qBXF8k1N7oYJ7llVn',
    'conversation-l56-song-3': '4joYvfuYl38ce44TmKi74q',
    'conversation-l57-song-1': '7ngRS53kqxLcEt9Pythc5d',
    'conversation-l57-song-2': '1V1E46FalG2rEIsGEQae98',
    'conversation-l57-song-3': '5JGh8pdA0z7DBG6gtqc2uN',
    'conversation-l58-song-1': '7a9o5iz0mLrjNsBnTa5UUO',
    'conversation-l58-song-2': '3VrCnA0h6RhoEOHbvVM4be',
    'conversation-l58-song-3': '6crBy2sODw2HS53xquM6us',
    'conversation-l59-song-1': '4NJEoeZyXB5ICzn4iqznGn',
    'conversation-l59-song-2': '2KqkqX4G9Ep9igo6t6I28R',
    'conversation-l59-song-3': '7uEcCGtM1FBBGIhPozhJjv',
    'conversation-l60-song-1': '56SZtozlz8G1KbBXojnysp',
    'conversation-l60-song-2': '31golgIvnyzT0BklBNbUc8',
    'conversation-l60-song-3': '2gaswcB7zEJ8w8BcSCUpfx',
    'conversation-l61-song-1': '7J5tyfg3OYVNR97KH66ovw',
    'conversation-l61-song-2': '7DSAEUvxU8FajXtRloy8M0',
    'conversation-l61-song-3': '0nDjzA4kns1QOWPXuOn6Xw',
    'conversation-l62-song-1': '6vYsu67lzz1ET39RJa4irq',
    'conversation-l62-song-2': '3muHGMnrTzoQlmbTNxtn2B',
    'conversation-l62-song-3': '3Lbxie6whOW4eMt4jtI32k',
    'conversation-l63-song-1': '5ZMRR5EogWKCDrMkukglXr',
    'conversation-l63-song-2': '5Kw39uF15bTJAf3QEu0UgP',
    'conversation-l63-song-3': '5MEMiHV54Y5ODV1zvEPsyp',
    'conversation-l64-song-1': '3wpUbtLdckaDqaaGQIu6a6',
    'conversation-l64-song-2': '3Xb3Dkg22CazcSc9eTrJfw',
    'conversation-l64-song-3': '5whWSsKs8TvXHAB8RUbxFY'
});

const exactLrclibIds = Object.freeze({
    'conversation-l56-song-2': 35012356,
    'conversation-l56-song-3': 36888631
});

const stopwords = new Set(`
  a about above after again against all am an and any are aren't as at be because been before being below
  between both but by can can't cannot could couldn't did didn't do does doesn't doing don't down during each
  few for from further had hadn't has hasn't have haven't having he he'd he'll he's her here here's hers herself
  him himself his how how's i i'd i'll i'm i've if in into is isn't it it's its itself just let's me more most
  mustn't my myself no nor not of off on once only or other ought our ours ourselves out over own same shan't
  she she'd she'll she's should shouldn't so some such than that that's the their theirs them themselves then
  there there's these they they'd they'll they're they've this those through to too under until up very was wasn't
  we we'd we'll we're we've were weren't what what's when when's where where's which while who who's whom why
  why's with won't would wouldn't you you'd you'll you're you've your yours yourself yourselves gonna wanna gotta
  yeah oh ooh ah uh uhh huh hmm mmh mmm whoa woah whoo woo la na da hey well cause cuz ain't got get gets getting make makes made come comes came go goes
  went like one two three four five six seven eight nine ten
`.trim().split(/\s+/));

const blockedAnswers = new Set(['bitch', 'shit', 'fuck', 'fucking', 'damn', 'hell', 'ass', 'dick', 'pussy']);

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

function comparable(value) {
    return normalize(value).replace(/\b(the|and)\b/g, ' ').replace(/\s+/g, ' ').trim();
}

function metadataScore(candidate, song, index) {
    const candidateTitle = comparable(candidate.trackName || candidate.name);
    const wantedTitle = comparable(song.title);
    const candidateArtist = comparable(candidate.artistName);
    const wantedArtist = comparable(song.artist);
    let score = 0;
    if (candidateTitle === wantedTitle) score += 40;
    else if (candidateTitle.includes(wantedTitle) || wantedTitle.includes(candidateTitle)) score += 20;
    if (candidateArtist === wantedArtist) score += 30;
    else if (candidateArtist.includes(wantedArtist) || wantedArtist.includes(candidateArtist)) score += 15;
    if (candidate.syncedLyrics) score += 3;
    if (Number.isFinite(candidate.duration) && candidate.duration >= 80 && candidate.duration <= 600) score += 2;
    score -= index / 1000;
    return score;
}

function tokenizeWords(lyrics) {
    const tokens = String(lyrics || '').match(/[\p{L}\p{M}]+(?:['’\-][\p{L}\p{M}]+)*|\p{N}/gu) || [];
    return tokens.map((text, index) => ({ text, index, normalized: normalize(text) }));
}

function sameWordFamily(left, right) {
    const first = normalize(left);
    const second = normalize(right);
    if (!first || !second) return false;
    if (first === second) return true;
    const shorter = first.length <= second.length ? first : second;
    const longer = first.length > second.length ? first : second;
    return shorter.length >= 3 && longer.startsWith(shorter);
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
    return tokenizeWords(title).some((token) => singularKey(token.text) === wanted);
}

function chooseGapSpecs(lyrics, song) {
    const words = tokenizeWords(lyrics);
    const frequencies = new Map();
    words.forEach((token) => frequencies.set(token.normalized, (frequencies.get(token.normalized) || 0) + 1));
    const lensWords = new Set((song.listening || []).flatMap((item) => normalize(item.answer).split(' ')).filter((word) => word && !stopwords.has(word)));
    const baseCandidates = words.filter((token) => {
        const word = token.normalized;
        const thematic = lensWords.has(word);
        return word.length >= 3
            && word.length <= 16
            && /^[a-z]+(?:'[a-z]+)?$/.test(word)
            && !blockedAnswers.has(word)
            && !titleIncludesWord(song.title, token.text);
    });
    const strictCandidates = baseCandidates.filter((token) => token.index > 3
        && token.index < words.length - 3
        && (lensWords.has(token.normalized) || !stopwords.has(token.normalized)));
    const relaxedCandidates = baseCandidates.filter((token) => token.normalized.length >= 4);

    const targets = [0.14, 0.31, 0.48, 0.65, 0.82];
    function attemptSelection(eligible) {
        const attempt = [];
        for (const target of targets) {
            const targetIndex = target * words.length;
            const ranked = eligible
                .filter((token) => !attempt.some((item) => item.index === token.index))
                .filter((token) => !attempt.some((item) => sameWordFamily(item.normalized, token.normalized)))
                .map((token) => {
                    const frequency = frequencies.get(token.normalized) || 1;
                    const distance = Math.abs(token.index - targetIndex) / Math.max(words.length, 1);
                    const lexical = Math.min(token.normalized.length, 9) / 9;
                    const repetition = frequency >= 2 && frequency <= 7 ? 1.2 : frequency === 1 ? 0.45 : 0;
                    const thematic = lensWords.has(token.normalized) ? 1.8 : 0;
                    const unexpectedCapital = /^[A-Z]/.test(token.text) ? 0.8 : 0;
                    const stopwordPenalty = stopwords.has(token.normalized) ? 1.1 : 0;
                    return { token, score: thematic + repetition + lexical - unexpectedCapital - stopwordPenalty - distance * 8 };
                })
                .sort((left, right) => right.score - left.score);
            const winner = ranked[0]?.token;
            if (!winner) return null;
            attempt.push(winner);
        }
        return attempt;
    }
    const selected = attemptSelection(strictCandidates)
        || attemptSelection(relaxedCandidates);
    if (!selected) throw new Error('could not distribute five safe gaps');

    selected.sort((left, right) => left.index - right.index);
    const occurrences = new Map();
    const wanted = new Map(selected.map((token) => [token.index, token]));
    const gaps = [];
    words.forEach((token) => {
        const occurrence = (occurrences.get(token.normalized) || 0) + 1;
        occurrences.set(token.normalized, occurrence);
        if (!wanted.has(token.index)) return;
        gaps.push({
            id: `gap-${gaps.length + 1}`,
            answer: token.text,
            providerAnswer: token.text,
            occurrence,
            acceptedAnswers: [token.text]
        });
    });
    return gaps;
}

async function fetchCandidates(song) {
    const query = new URLSearchParams({ track_name: song.title, artist_name: song.artist });
    for (let attempt = 1; attempt <= 3; attempt += 1) {
        const response = await fetch(`${LRCLIB_SEARCH}?${query}`, { headers: { Accept: 'application/json' } });
        if (response.ok) return await response.json();
        const retryable = response.status === 429 || response.status >= 500;
        if (!retryable || attempt === 3) throw new Error(`LRCLIB ${response.status}`);
        await new Promise((resolve) => setTimeout(resolve, attempt * 500));
    }
    throw new Error('LRCLIB request failed');
}

async function fetchExactCandidate(id) {
    const response = await fetch(`https://lrclib.net/api/get/${id}`, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`LRCLIB ${response.status}`);
    return await response.json();
}

function serialize(value) {
    return JSON.stringify(value, null, 4).replace(/</g, '\\u003c');
}

async function main() {
    const records = [];
    const failures = [];
    for (const [lessonNumber, lesson] of Object.entries(lessons)) {
        for (const [songIndex, sourceSong] of lesson.songs.entries()) {
            const id = `conversation-l${lessonNumber}-song-${songIndex + 1}`;
            try {
                const spotifyId = spotifyTrackIds[id];
                if (!/^[A-Za-z0-9]{22}$/.test(spotifyId || '')) throw new Error('missing audited Spotify track id');
                const providerCandidates = exactLrclibIds[id]
                    ? [await fetchExactCandidate(exactLrclibIds[id])]
                    : await fetchCandidates(sourceSong);
                const candidates = providerCandidates
                    .filter((candidate) => typeof candidate.plainLyrics === 'string' && candidate.plainLyrics.trim().length >= 20 && candidate.instrumental !== true)
                    .map((candidate, index) => ({ candidate, score: metadataScore(candidate, sourceSong, index) }))
                    .sort((left, right) => right.score - left.score);
                const best = candidates[0];
                if (!best || best.score < 45) throw new Error('no confident provider match');
                const gaps = chooseGapSpecs(best.candidate.plainLyrics, {
                    ...sourceSong,
                    title: `${sourceSong.title} ${best.candidate.trackName || ''}`
                });
                records.push({
                    id,
                    lessonNumber: Number(lessonNumber),
                    songIndex,
                    status: 'provider-verified',
                    song: {
                        title: best.candidate.trackName || sourceSong.title,
                        artist: best.candidate.artistName || sourceSong.artist,
                        displayTitle: sourceSong.title,
                        displayArtist: sourceSong.artist,
                        durationSeconds: Number.isFinite(best.candidate.duration) ? best.candidate.duration : null,
                        spotifyId
                    },
                    lyrics: {
                        provider: 'lrclib',
                        lrclibId: best.candidate.id,
                        fallback: 'lyricsovh',
                        cache: 'sessionStorage',
                        checkedAt
                    },
                    gaps,
                    pedagogy: {
                        maxAttempts: 3,
                        application: sourceSong.discussionTitle
                    },
                    rights: {
                        usageScope: 'private-course-runtime',
                        commercialPublicationApproved: false
                    }
                });
                process.stdout.write(`OK ${id}: LRCLIB ${best.candidate.id} · ${gaps.map((gap) => gap.answer).join(', ')}\n`);
            } catch (error) {
                failures.push({ id, title: sourceSong.title, artist: sourceSong.artist, reason: error.message });
                process.stdout.write(`DRAFT ${id}: ${error.message}\n`);
            }
        }
    }

    if (failures.length) {
        process.stdout.write(`${failures.length} draft matches; existing catalog was preserved:\n${JSON.stringify(failures, null, 2)}\n`);
        process.exitCode = 2;
        return;
    }

    const source = `(function installConversationMusicCatalog(globalScope) {\n    'use strict';\n\n    const records = ${serialize(records)};\n    const byLessonAndSong = new Map(records.map((entry) => [entry.lessonNumber + ':' + entry.songIndex, entry]));\n\n    function get(lessonNumber, songIndex) {\n        return byLessonAndSong.get(Number(lessonNumber) + ':' + Number(songIndex)) || null;\n    }\n\n    function validate(entry) {\n        const errors = [];\n        if (!entry || entry.status !== 'provider-verified') errors.push('entry is not provider-verified');\n        if (!Number.isInteger(entry?.lyrics?.lrclibId)) errors.push('missing LRCLIB id');\n        if (!Array.isArray(entry?.gaps) || entry.gaps.length !== 5) errors.push('exactly five gaps are required');\n        const positions = new Set((entry?.gaps || []).map((gap) => String(gap.answer).toLowerCase() + ':' + gap.occurrence));\n        if (positions.size !== 5) errors.push('gap positions must be distinct');\n        return { valid: errors.length === 0, errors };\n    }\n\n    globalScope.ConversationMusicCatalog = Object.freeze({\n        version: '${checkedAt}-pilot-49-64',\n        records: Object.freeze(records),\n        get,\n        validate\n    });\n}(window));\n`;
    fs.writeFileSync(outputPath, source, 'utf8');
    process.stdout.write(`\nWrote ${records.length} verified records to ${path.relative(root, outputPath)}.\n`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
