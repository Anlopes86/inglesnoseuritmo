const fs = require('fs');
const path = require('path');
const vm = require('vm');

const directory = __dirname;
const root = path.resolve(directory, '..');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(directory, 'conversation-lessons-49-64-data.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(path.join(directory, 'conversation-music-catalog-49-64.js'), 'utf8'), context);

const lessons = context.window.CONVERSATION_LESSONS_49_64 || {};
const catalog = context.window.ConversationMusicCatalog;
const errors = [];
const warnings = [];
const records = catalog?.records || [];

function normalizeAnswer(value) {
    return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function sameWordFamily(left, right) {
    const first = normalizeAnswer(left);
    const second = normalizeAnswer(right);
    if (!first || !second) return false;
    if (first === second) return true;
    const shorter = first.length <= second.length ? first : second;
    const longer = first.length > second.length ? first : second;
    return shorter.length >= 3 && longer.startsWith(shorter);
}

if (!catalog) errors.push('ConversationMusicCatalog was not installed.');
if (records.length !== 48) errors.push(`Expected 48 catalog records, found ${records.length}.`);

const ids = new Set();
records.forEach((entry) => {
    const key = `${entry.lessonNumber}:${entry.songIndex}`;
    if (ids.has(entry.id)) errors.push(`Duplicate entry id: ${entry.id}.`);
    ids.add(entry.id);
    const sourceSong = lessons[entry.lessonNumber]?.songs?.[entry.songIndex];
    if (!sourceSong) errors.push(`Catalog points to a missing song: ${key}.`);
    if (sourceSong && sourceSong.title !== entry.song.displayTitle) errors.push(`Title mismatch at ${key}.`);
    if (sourceSong && sourceSong.artist !== entry.song.displayArtist) errors.push(`Artist mismatch at ${key}.`);
    const validation = catalog.validate(entry);
    if (!validation.valid) errors.push(`${entry.id}: ${validation.errors.join(', ')}.`);
    const answers = entry.gaps?.map((gap) => gap.answer) || [];
    for (let left = 0; left < answers.length; left += 1) {
        for (let right = left + 1; right < answers.length; right += 1) {
            if (sameWordFamily(answers[left], answers[right])) {
                errors.push(`${entry.id}: repeated word family (${answers[left]} / ${answers[right]}).`);
            }
        }
    }
    if (entry.rights?.commercialPublicationApproved !== false) errors.push(`${entry.id}: commercial rights must remain unapproved.`);
    if (entry.rights?.usageScope !== 'private-course-runtime') errors.push(`${entry.id}: invalid usage scope.`);
    if (entry.lyrics?.cache !== 'sessionStorage') errors.push(`${entry.id}: lyrics cache must be sessionStorage.`);
    if (!/^[A-Za-z0-9]{22}$/.test(entry.song?.spotifyId || '')) errors.push(`${entry.id}: missing exact Spotify track id.`);
});

for (let lessonNumber = 49; lessonNumber <= 64; lessonNumber += 1) {
    const entries = records.filter((entry) => entry.lessonNumber === lessonNumber);
    if (entries.length !== 3) errors.push(`Lesson ${lessonNumber} must have three music entries.`);
    const html = fs.readFileSync(path.join(directory, `licao-${lessonNumber}.html`), 'utf8');
    const requiredScripts = [
        '../js/lyrics-service-v3.js',
        'conversation-lessons-49-64-data.js',
        'conversation-music-catalog-49-64.js',
        'conversation-music-cloze.js',
        'conversation-lessons-49-64-runtime.js'
    ];
    let previousIndex = -1;
    requiredScripts.forEach((script) => {
        const index = html.indexOf(`src="${script}"`);
        if (index < 0) errors.push(`Lesson ${lessonNumber} is missing ${script}.`);
        if (index >= 0 && index < previousIndex) errors.push(`Lesson ${lessonNumber} loads ${script} out of order.`);
        if (index >= 0) previousIndex = index;
    });
}

const catalogSource = fs.readFileSync(path.join(directory, 'conversation-music-catalog-49-64.js'), 'utf8');
const forbiddenPersistedFields = ['plainLyrics', 'syncedLyrics', 'lyricsfile', 'providerLines'];
forbiddenPersistedFields.forEach((field) => {
    if (catalogSource.includes(`"${field}"`)) errors.push(`Catalog must not persist ${field}.`);
});

const runtimeSource = fs.readFileSync(path.join(directory, 'conversation-lessons-49-64-runtime.js'), 'utf8');
if (runtimeSource.includes('Listening lens: complete the ideas')) warnings.push('Legacy synthetic listening lens is still present.');
if (!runtimeSource.includes('ConversationMusicCloze?.mount')) errors.push('Runtime does not lazy-mount the real lyrics activity.');
if (runtimeSource.includes('open.spotify.com/embed/search')) errors.push('Runtime still uses the unsupported Spotify search embed.');

console.log(JSON.stringify({
    lessons: Object.keys(lessons).length,
    catalogEntries: records.length,
    verifiedEntries: records.filter((entry) => entry.status === 'provider-verified').length,
    gaps: records.reduce((total, entry) => total + (entry.gaps?.length || 0), 0),
    persistedCommercialLyrics: false,
    errors,
    warnings
}, null, 2));

if (errors.length) process.exitCode = 1;
