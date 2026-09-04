const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const catalogPaths = [
    path.join(root, 'conversation', 'conversation-music-catalog-01-48.js'),
    path.join(root, 'conversation', 'conversation-music-catalog-49-64.js')
];
const concurrency = 6;
const forcedEntryIds = new Set(process.argv.slice(2));

const blockedAnswers = new Set([
    'bitch', 'bitches', 'shit', 'fuck', 'fucking', 'motherfucker', 'damn', 'hell', 'ass', 'dick', 'pussy',
    'nigga', 'nigger', 'whore', 'slut', 'cunt', 'faggot', 'retard'
]);
const stopwords = new Set(`
    a about above after again against all am an and any are arent as at be because been before being below between both
    but by can cant cannot could couldnt did didnt do does doesnt doing dont down during each few for from further had
    hadnt has hasnt have havent having he hed hell hes her here heres hers herself him himself his how hows i id ill im
    ive if in into is isnt it its itself just lets me more most mustnt my myself no nor not of off on once only or other
    ought our ours ourselves out over own same shant she shed shell shes should shouldnt so some such than that thats the
    their theirs them themselves then there theres these they theyd theyll theyre theyve this those through to too under
    until up very was wasnt we wed well were weve were werent what whats when whens where wheres which while who whos whom
    why whys with wont would wouldnt you youd youll youre youve your yours yourself yourselves gonna wanna gotta yeah oh
    ooh ah uh uhh huh hmm mmh mmm whoa woah whoo woo la na da hey cause cuz aint got get gets getting make makes made
    come comes came go goes went like one two three four five six seven eight nine ten
`.trim().split(/\s+/));

function normalizeWord(value) {
    return String(value || '')
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '');
}

function singularKey(value) {
    const word = normalizeWord(value);
    if (word.length > 4 && word.endsWith('ies')) return `${word.slice(0, -3)}y`;
    if (word.length > 4 && /(ches|shes|sses|xes|zes)$/.test(word)) return word.slice(0, -2);
    if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
    return word;
}

function sameWordFamily(left, right) {
    const first = normalizeWord(left);
    const second = normalizeWord(right);
    if (!first || !second) return false;
    if (first === second) return true;
    const shorter = first.length <= second.length ? first : second;
    const longer = first.length > second.length ? first : second;
    return shorter.length >= 3 && longer.startsWith(shorter);
}

function tokenize(value) {
    const matches = String(value || '').match(/[\p{L}\p{M}]+(?:['’\-][\p{L}\p{M}]+)*|\p{N}/gu) || [];
    return matches.map((text, index) => ({ text, index, normalized: normalizeWord(text) }));
}

function titleIncludesAnswer(title, answer) {
    const wanted = singularKey(answer);
    return tokenize(title).some((token) => singularKey(token.text) === wanted);
}

function isVocalFiller(value) {
    const parts = String(value || '').toLowerCase().split(/[^a-z]+/).filter(Boolean);
    const fillers = new Set(['a', 'ah', 'la', 'na', 'oh', 'ooh', 'uh', 'whoa', 'woah', 'woo', 'yea', 'yeah']);
    return parts.length >= 2 && parts.every((part) => fillers.has(part));
}

function completeTitle(entry) {
    return [entry.song.title, entry.song.displayTitle, entry.song.version].filter(Boolean).join(' ');
}

function loadCatalog(filePath) {
    const context = { window: {} };
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(filePath, 'utf8'), context, { filename: filePath });
    return context.window.ConversationMusicCatalog0148?.records
        || context.window.ConversationMusicCatalog?.records
        || [];
}

async function fetchWithRetries(url, attempts = 4) {
    let lastError;
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
        try {
            const response = await fetch(url, { headers: { Accept: 'application/json' } });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            lastError = error;
            if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, attempt * 400));
        }
    }
    throw lastError;
}

async function mapLimit(items, limit, worker) {
    const results = new Array(items.length);
    let cursor = 0;
    async function run() {
        while (cursor < items.length) {
            const index = cursor;
            cursor += 1;
            results[index] = await worker(items[index], index);
        }
    }
    await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
    return results;
}

function resolveGapIndex(words, gap) {
    const wanted = normalizeWord(gap.providerAnswer || gap.answer);
    const matching = words.filter((word) => word.normalized === wanted);
    return matching[Number(gap.occurrence) - 1]?.index ?? -1;
}

function occurrenceAt(words, selected) {
    let occurrence = 0;
    for (let index = 0; index <= selected.index; index += 1) {
        if (words[index].normalized === selected.normalized) occurrence += 1;
    }
    return occurrence;
}

function replacementCandidate(words, title, targetIndex, lowerBound, upperBound, selected, allowStopwords = false, allowEdges = false) {
    const frequencies = new Map();
    words.forEach((word) => frequencies.set(word.normalized, (frequencies.get(word.normalized) || 0) + 1));
    const selectedIndices = new Set(selected.map((item) => item.index));
    const eligible = words.filter((word) => word.index >= lowerBound
        && word.index <= upperBound
        && (allowEdges || word.index > 4)
        && (allowEdges || word.index < words.length - 4)
        && /^[a-z]+$/.test(word.normalized)
        && word.normalized.length >= 3
        && word.normalized.length <= 16
        && (allowStopwords ? word.normalized.length >= 4 : !stopwords.has(word.normalized))
        && !blockedAnswers.has(word.normalized)
        && !isVocalFiller(word.text)
        && !titleIncludesAnswer(title, word.text)
        && !selectedIndices.has(word.index));
    const distinctAnswers = eligible.filter((word) => !selected.some((item) => sameWordFamily(item.text, word.text)));
    return distinctAnswers
        .map((word) => {
            const frequency = frequencies.get(word.normalized) || 1;
            const repetition = frequency >= 2 && frequency <= 8 ? 1.2 : frequency === 1 ? 0.35 : 0;
            const lexical = Math.min(word.normalized.length, 9) / 9;
            const distance = Math.abs(word.index - targetIndex) / Math.max(words.length, 1);
            const unexpectedCapital = /^[A-Z]/.test(word.text) ? 0.6 : 0;
            const stopwordPenalty = stopwords.has(word.normalized) ? 1.1 : 0;
            return { word, score: repetition + lexical - unexpectedCapital - stopwordPenalty - distance * 12 };
        })
        .sort((left, right) => right.score - left.score || left.word.index - right.word.index)[0]?.word;
}

function buildFreshGapSet(words, title) {
    let selected;
    for (const fallback of [
        { allowStopwords: false, allowEdges: false },
        { allowStopwords: true, allowEdges: false },
        { allowStopwords: true, allowEdges: true }
    ]) {
        selected = [];
        for (const target of [0.12, 0.31, 0.5, 0.69, 0.88]) {
            const candidate = replacementCandidate(words, title, target * words.length, 0, words.length - 1, selected, fallback.allowStopwords, fallback.allowEdges);
            if (!candidate) break;
            selected.push(candidate);
        }
        if (selected.length === 5) break;
    }
    if (selected.length !== 5) throw new Error('could not build a fresh five-gap set');
    selected.sort((left, right) => left.index - right.index);
    return selected.map((word, index) => ({
        id: `gap-${index + 1}`,
        answer: word.text,
        providerAnswer: word.text,
        occurrence: occurrenceAt(words, word),
        acceptedAnswers: [word.text]
    }));
}

function reviseRecord(entry, plainLyrics, forceFresh = false) {
    const title = completeTitle(entry);
    const words = tokenize(plainLyrics);
    const offending = entry.gaps.map((gap) => titleIncludesAnswer(title, gap.answer));
    const lacksVariety = new Set(entry.gaps.map((gap) => singularKey(gap.answer))).size < 5;
    if (!forceFresh && !offending.some(Boolean) && !lacksVariety) return { entry, replacements: 0 };
    if (forceFresh || lacksVariety) {
        const freshGaps = buildFreshGapSet(words, title);
        const replacements = freshGaps.filter((gap, index) => normalizeWord(gap.answer) !== normalizeWord(entry.gaps[index].answer)
            || gap.occurrence !== entry.gaps[index].occurrence).length;
        return { entry: { ...entry, gaps: freshGaps }, replacements };
    }

    const originalIndices = entry.gaps.map((gap) => resolveGapIndex(words, gap));
    if (originalIndices.some((index) => index < 0)) throw new Error(`${entry.id}: an existing gap no longer resolves against its exact LRCLIB record`);

    const selected = entry.gaps
        .map((gap, index) => offending[index] ? null : ({ text: gap.answer, index: originalIndices[index] }))
        .filter(Boolean);
    const revisedGaps = entry.gaps.map((gap) => ({ ...gap }));

    for (let gapIndex = 0; gapIndex < offending.length; gapIndex += 1) {
        if (!offending[gapIndex]) continue;
        const originalGap = entry.gaps[gapIndex];
        const lowerBound = gapIndex === 0 ? 5 : originalIndices[gapIndex - 1] + 1;
        const upperBound = gapIndex === entry.gaps.length - 1 ? words.length - 5 : originalIndices[gapIndex + 1] - 1;
        const candidate = replacementCandidate(words, title, originalIndices[gapIndex], lowerBound, upperBound, selected);
        if (!candidate) {
            let freshGaps;
            try {
                freshGaps = buildFreshGapSet(words, title);
            } catch (error) {
                throw new Error(`${entry.id}: ${error.message}`);
            }
            const replacements = freshGaps.filter((gap, index) => normalizeWord(gap.answer) !== normalizeWord(entry.gaps[index].answer)
                || gap.occurrence !== entry.gaps[index].occurrence).length;
            return { entry: { ...entry, gaps: freshGaps }, replacements };
        }
        const occurrence = occurrenceAt(words, candidate);
        revisedGaps[gapIndex] = {
            ...originalGap,
            answer: candidate.text,
            providerAnswer: candidate.text,
            occurrence,
            acceptedAnswers: [candidate.text]
        };
        selected.push(candidate);
    }

    const resolvedIndices = revisedGaps.map((gap) => resolveGapIndex(words, gap));
    if (resolvedIndices.some((index) => index < 0) || new Set(resolvedIndices).size !== 5) {
        throw new Error(`${entry.id}: revised gaps do not resolve to five distinct positions`);
    }
    revisedGaps.forEach((gap) => {
        if (titleIncludesAnswer(title, gap.answer)) throw new Error(`${entry.id}: title overlap remains after revision`);
    });
    if (new Set(revisedGaps.map((gap) => singularKey(gap.answer))).size !== 5) {
        throw new Error(`${entry.id}: revised gaps contain repeated answers`);
    }
    return { entry: { ...entry, gaps: revisedGaps }, replacements: offending.filter(Boolean).length };
}

function replaceCatalogRecords(filePath, records) {
    const source = fs.readFileSync(filePath, 'utf8');
    const eol = source.includes('\r\n') ? '\r\n' : '\n';
    const startMarker = '    const records = ';
    const start = source.indexOf(startMarker);
    const end = source.indexOf(`${eol}    const byLessonAndSong`, start);
    if (start < 0 || end < 0) throw new Error(`Could not locate records block in ${filePath}`);
    const recordsStart = start + startMarker.length;
    const revised = `${source.slice(0, recordsStart)}${JSON.stringify(records, null, 4).replace(/</g, '\\u003c')};${source.slice(end)}`;
    fs.writeFileSync(filePath, revised, 'utf8');
}

async function main() {
    const report = [];
    for (const filePath of catalogPaths) {
        const records = loadCatalog(filePath);
        const candidates = records.filter((entry) => {
            const title = completeTitle(entry);
            return forcedEntryIds.has(entry.id)
                || entry.gaps.some((gap) => titleIncludesAnswer(title, gap.answer))
                || new Set(entry.gaps.map((gap) => singularKey(gap.answer))).size < 5;
        });
        const fetched = await mapLimit(candidates, concurrency, async (entry) => {
            const payload = await fetchWithRetries(`https://lrclib.net/api/get/${entry.lyrics.lrclibId}`);
            if (payload.instrumental || typeof payload.plainLyrics !== 'string' || payload.plainLyrics.trim().length < 20) {
                throw new Error(`${entry.id}: exact LRCLIB record has no usable plain lyrics`);
            }
            return reviseRecord(entry, payload.plainLyrics, forcedEntryIds.has(entry.id));
        });
        const revisions = new Map(fetched.map((item) => [item.entry.id, item]));
        const revisedRecords = records.map((entry) => revisions.get(entry.id)?.entry || entry);
        replaceCatalogRecords(filePath, revisedRecords);
        report.push({
            catalog: path.basename(filePath),
            records: records.length,
            revisedRecords: candidates.length,
            replacedGaps: fetched.reduce((total, item) => total + item.replacements, 0)
        });
    }
    console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
});
