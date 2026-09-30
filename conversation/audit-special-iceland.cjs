const fs = require('fs');
const path = require('path');
const vm = require('vm');

const directory = __dirname;
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(directory, 'conversation-special-iceland-data.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(path.join(directory, 'conversation-special-iceland-music-catalog.js'), 'utf8'), context);

const lesson = context.window.CONVERSATION_SPECIAL_LESSONS?.[9001];
const catalog = context.window.ConversationSpecialMusicCatalog;
const errors = [];

if (!lesson) errors.push('Special lesson 9001 is unavailable.');
if (lesson?.warmups?.length !== 4) errors.push('Expected four warm-up questions.');
if (lesson?.expressions?.length !== 6) errors.push('Expected six expressions.');
if (lesson?.songs?.length !== 3) errors.push('Expected three songs.');
if (lesson?.songs?.some((song) => song.questions?.length !== 4)) errors.push('Every song needs four conversation questions.');
if (lesson?.contexts?.length !== 2 || lesson?.contexts?.some((block) => block.cards?.length !== 4)) errors.push('Expected two four-card conversation activities.');
if (lesson?.practice?.length !== 6) errors.push('Expected six expression-practice items.');
if (lesson?.speaking?.prompts?.length !== 4) errors.push('Expected four speaking prompts.');
if (lesson?.homework?.length !== 3) errors.push('Expected three homework options.');

const prompts = [
    ...(lesson?.warmups || []),
    ...(lesson?.songs || []).flatMap((song) => song.questions || []),
    ...(lesson?.contexts || []).map((block) => block.prompt),
    ...(lesson?.speaking?.prompts || [])
];
prompts.forEach((prompt) => {
    if (!String(prompt).trim().endsWith('?')) errors.push(`Conversation prompt is not a question: ${prompt}`);
});

const expressionTerms = lesson?.expressions?.map((item) => item.term) || [];
const practiceAnswers = lesson?.practice?.map((item) => item.answer) || [];
if (JSON.stringify(expressionTerms) !== JSON.stringify(practiceAnswers)) errors.push('Practice answers drift from the six expressions.');

const records = catalog?.records || [];
if (records.length !== 3) errors.push(`Expected three music records, found ${records.length}.`);
if (new Set(records.map((entry) => entry.song?.spotifyId)).size !== 3) errors.push('Spotify track IDs must be distinct.');
records.forEach((entry, index) => {
    const validation = catalog?.validate?.(entry);
    if (!validation?.valid) errors.push(`Music record ${index + 1}: ${(validation?.errors || ['invalid']).join(', ')}.`);
    if (entry.lessonNumber !== 9001 || entry.songIndex !== index) errors.push(`Music record ${index + 1} has the wrong lesson position.`);
    if (entry.lyrics?.cache !== 'sessionStorage') errors.push(`Music record ${index + 1} must use session-only caching.`);
    if (entry.rights?.commercialPublicationApproved !== false) errors.push(`Music record ${index + 1} has an invalid rights flag.`);
});

const html = fs.readFileSync(path.join(directory, 'licao-especial-islandia.html'), 'utf8');
const expectedScripts = [
    '../js/lyrics-service-v3.js',
    'conversation-special-iceland-data.js',
    'conversation-special-iceland-music-catalog.js',
    'conversation-music-cloze.js',
    'conversation-lessons-runtime.js'
];
let previousScript = -1;
expectedScripts.forEach((script) => {
    const index = html.indexOf(`src="${script}"`);
    if (index < 0) errors.push(`Missing script: ${script}.`);
    if (index >= 0 && index < previousScript) errors.push(`Script order is invalid near ${script}.`);
    previousScript = Math.max(previousScript, index);
});
if (!html.includes('data-lesson="9001"')) errors.push('HTML shell has the wrong special lesson ID.');
if (/<iframe\b/i.test(html)) errors.push('The HTML shell must not persist a music player.');

const dataSource = fs.readFileSync(path.join(directory, 'conversation-special-iceland-data.js'), 'utf8');
const catalogSource = fs.readFileSync(path.join(directory, 'conversation-special-iceland-music-catalog.js'), 'utf8');
const runtimeSource = fs.readFileSync(path.join(directory, 'conversation-lessons-runtime.js'), 'utf8');
const clozeSource = fs.readFileSync(path.join(directory, 'conversation-music-cloze.js'), 'utf8');
if (/plainLyrics|syncedLyrics|providerLines/i.test(`${dataSource}\n${catalogSource}`)) errors.push('Commercial lyrics must not be stored in the repository.');
if (!runtimeSource.includes('CONVERSATION_SPECIAL_LESSONS') || !runtimeSource.includes('ConversationSpecialMusicCatalog')) errors.push('The lesson runtime is not wired to the special registry.');
if (!clozeSource.includes('ConversationSpecialMusicCatalog')) errors.push('The music activity is not wired to the special catalog.');

console.log(JSON.stringify({
    lessonId: 9001,
    slides: 14,
    songs: records.length,
    discussionQuestions: (lesson?.songs || []).reduce((total, song) => total + song.questions.length, 0),
    homeworkOptions: lesson?.homework?.length || 0,
    persistedCommercialLyrics: false,
    errors
}, null, 2));

if (errors.length) process.exitCode = 1;
