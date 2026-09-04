const fs = require('fs');
const path = require('path');
const vm = require('vm');

const directory = __dirname;
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(directory, 'conversation-lessons-01-48-data.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(path.join(directory, 'conversation-music-catalog-01-48.js'), 'utf8'), context);
const laterContext = { window: {} };
vm.createContext(laterContext);
vm.runInContext(fs.readFileSync(path.join(directory, 'conversation-music-catalog-49-64.js'), 'utf8'), laterContext);

const lessons = context.window.CONVERSATION_LESSONS_01_48 || {};
const catalog = context.window.ConversationMusicCatalog0148;
const records = catalog?.records || [];
const laterRecords = laterContext.window.ConversationMusicCatalog?.records || [];
const errors = [];
const blocked = new Set(['bitch', 'bitches', 'shit', 'fuck', 'fucking', 'motherfucker', 'damn', 'ass', 'dick', 'pussy', 'nigga', 'nigger', 'whore', 'slut', 'cunt', 'faggot', 'retard']);

function normalize(value) {
    return String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\b(feat|featuring|ft)\.?\b/g, ' ').replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function normalizeAnswer(value) {
    return normalize(value).replace(/\s/g, '');
}

function singularKey(value) {
    const word = normalizeAnswer(value);
    if (word.length > 4 && word.endsWith('ies')) return `${word.slice(0, -3)}y`;
    if (word.length > 4 && /(ches|shes|sses|xes|zes)$/.test(word)) return word.slice(0, -2);
    if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
    return word;
}

function titleWords(value) {
    return String(value || '').match(/[\p{L}\p{M}]+(?:['’\-][\p{L}\p{M}]+)*|\p{N}/gu) || [];
}

function titleIncludesAnswer(title, answer) {
    const wanted = singularKey(answer);
    return titleWords(title).some((word) => singularKey(word) === wanted);
}

function titleKey(entry) {
    return `${normalize(entry.song.title).replace(/\b(remaster(?:ed)?|version|edit|explicit|clean|mono|stereo|single|album|radio|original)\b/g, '').replace(/\s+/g, ' ').trim()}::${normalize(entry.song.artist)}`;
}

if (!catalog) errors.push('ConversationMusicCatalog0148 is unavailable.');
if (records.length !== 144) errors.push(`Expected 144 records, found ${records.length}.`);
const ids = new Set();
const spotifyIds = new Set();
const songKeys = new Set();
const laterSpotify = new Set(laterRecords.map((entry) => entry.song.spotifyId));
const laterKeys = new Set(laterRecords.map(titleKey));

records.forEach((entry) => {
    const location = `${entry.lessonNumber}:${entry.songIndex}`;
    if (ids.has(entry.id)) errors.push(`${entry.id}: duplicate record ID.`);
    ids.add(entry.id);
    if (!lessons[entry.lessonNumber]?.songs?.[entry.songIndex]) errors.push(`${entry.id}: source song missing.`);
    if (!/^[A-Za-z0-9]{22}$/.test(entry.song?.spotifyId || '')) errors.push(`${entry.id}: invalid Spotify track ID.`);
    if (spotifyIds.has(entry.song.spotifyId)) errors.push(`${entry.id}: duplicate Spotify ID inside lessons 1–48.`);
    spotifyIds.add(entry.song.spotifyId);
    const key = titleKey(entry);
    if (songKeys.has(key)) errors.push(`${entry.id}: duplicate title/artist inside lessons 1–48.`);
    songKeys.add(key);
    if (laterSpotify.has(entry.song.spotifyId) || laterKeys.has(key)) errors.push(`${entry.id}: duplicate recording with lessons 49–64.`);
    if (!['provider-verified', 'draft-until-provider-match'].includes(entry.status)) errors.push(`${entry.id}: invalid status.`);
    const validation = catalog.validate(entry);
    if (!validation.valid) errors.push(`${entry.id}: ${validation.errors.join(', ')}.`);
    if (entry.status === 'provider-verified') {
        if (!Number.isInteger(entry.lyrics?.lrclibId)) errors.push(`${entry.id}: verified record missing LRCLIB ID.`);
        if (entry.gaps?.length !== 5) errors.push(`${entry.id}: verified record must have five gaps.`);
        if (entry.song?.brAvailabilityConfirmed !== true) errors.push(`${entry.id}: verified record missing BR confirmation.`);
        if (!Object.values(entry.verification || {}).every(Boolean)) errors.push(`${entry.id}: verified record missing complete audit evidence.`);
    } else if (!entry.draftReasons?.length) {
        errors.push(`${entry.id}: draft does not explain why it is blocked.`);
    }
    if (entry.gaps?.length && entry.gaps.length !== 5) errors.push(`${entry.id}: a candidate gap set must contain exactly five words.`);
    const positions = new Set((entry.gaps || []).map((gap) => `${normalize(gap.answer)}:${gap.occurrence}`));
    if (positions.size !== (entry.gaps || []).length) errors.push(`${entry.id}: repeated gap position.`);
    const answerKeys = (entry.gaps || []).map((gap) => singularKey(gap.answer));
    if (new Set(answerKeys).size !== answerKeys.length) errors.push(`${entry.id}: repeated gap answer.`);
    (entry.gaps || []).forEach((gap) => {
        const completeTitle = [entry.song.title, entry.song.displayTitle, entry.song.version].filter(Boolean).join(' ');
        if (titleIncludesAnswer(completeTitle, gap.answer)) errors.push(`${entry.id}: gap answer repeats a title word (${gap.answer}).`);
        if (!/^\p{L}+(?:['’\-]\p{L}+)*$/u.test(gap.answer)) errors.push(`${entry.id}: non-word gap answer (${gap.answer}).`);
        if (blocked.has(normalize(gap.answer))) errors.push(`${entry.id}: offensive gap answer.`);
        if (!Number.isInteger(gap.occurrence) || gap.occurrence < 1) errors.push(`${entry.id}: invalid occurrence.`);
        if (!Array.isArray(gap.acceptedAnswers) || !gap.acceptedAnswers.length) errors.push(`${entry.id}: accepted answers missing.`);
    });
    if (entry.lyrics?.cache !== 'sessionStorage') errors.push(`${entry.id}: cache must be sessionStorage.`);
    if (entry.lyrics?.provider !== 'lrclib' || entry.lyrics?.fallback !== 'lyricsovh') errors.push(`${entry.id}: provider chain mismatch.`);
    if (entry.rights?.usageScope !== 'private-course-runtime' || entry.rights?.commercialPublicationApproved !== false) errors.push(`${entry.id}: rights policy mismatch.`);
    if (entry.lessonNumber < 1 || entry.lessonNumber > 48 || entry.songIndex < 0 || entry.songIndex > 2) errors.push(`${entry.id}: invalid location ${location}.`);
});

for (let lessonNumber = 1; lessonNumber <= 48; lessonNumber += 1) {
    if (records.filter((entry) => entry.lessonNumber === lessonNumber).length !== 3) errors.push(`L${lessonNumber}: expected three catalog records.`);
}

const catalogSource = fs.readFileSync(path.join(directory, 'conversation-music-catalog-01-48.js'), 'utf8');
const runtimeSource = fs.readFileSync(path.join(directory, 'conversation-lessons-runtime.js'), 'utf8');
const clozeSource = fs.readFileSync(path.join(directory, 'conversation-music-cloze.js'), 'utf8');
if (/"(?:plainLyrics|syncedLyrics|providerLines|lyricsfile)"/i.test(catalogSource)) errors.push('Catalog persists commercial lyrics.');
if (!runtimeSource.includes("new Set(['provider-verified', 'draft-until-provider-match'])") || !runtimeSource.includes('musicAvailableInRuntime(display.entry)')) errors.push('Runtime does not expose verified and draft music under the authorized runtime contract.');
if (!clozeSource.includes("new Set(['provider-verified', 'draft-until-provider-match'])") || !clozeSource.includes('runtimeMusicStatuses.has(this.entry.status)')) errors.push('Cloze runtime does not accept authorized draft entries.');
if (!runtimeSource.includes('open.spotify.com/embed/track/${spotifyId}')) errors.push('Runtime does not use exact Spotify track embeds.');
if (runtimeSource.includes('open.spotify.com/embed/search') || /youtube(?:-nocookie)?\.com/i.test(runtimeSource)) errors.push('Runtime contains unsupported player type.');
if (!clozeSource.includes('ConversationMusicCatalog0148') || !clozeSource.includes('sessionStorage') && !fs.readFileSync(path.resolve(directory, '..', 'js', 'lyrics-service-v3.js'), 'utf8').includes('sessionStorage')) errors.push('Shared cloze/catalog/session cache integration missing.');

const drafts = records.filter((entry) => entry.status === 'draft-until-provider-match');
const verified = records.filter((entry) => entry.status === 'provider-verified');
const reasonCounts = {};
drafts.flatMap((entry) => entry.draftReasons).forEach((reason) => {
    const category = reason.split(':')[0];
    reasonCounts[category] = (reasonCounts[category] || 0) + 1;
});

console.log(JSON.stringify({
    lessons: Object.keys(lessons).length,
    catalogEntries: records.length,
    verifiedEntries: verified.length,
    draftsRuntimeEnabled: drafts.length,
    candidateFiveGapSets: records.filter((entry) => entry.gaps?.length === 5).length,
    verifiedGaps: verified.reduce((total, entry) => total + entry.gaps.length, 0),
    candidateGaps: records.reduce((total, entry) => total + (entry.gaps?.length || 0), 0),
    persistedCommercialLyrics: false,
    draftReasonCounts: reasonCounts,
    errors
}, null, 2));

if (errors.length) process.exitCode = 1;
