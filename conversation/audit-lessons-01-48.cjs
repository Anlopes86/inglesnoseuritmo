const fs = require('fs');
const path = require('path');
const vm = require('vm');

const directory = __dirname;
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(directory, 'conversation-lessons-01-48-data.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(path.join(directory, 'conversation-music-catalog-01-48.js'), 'utf8'), context);

const lessons = context.window.CONVERSATION_LESSONS_01_48 || {};
const catalog = context.window.ConversationMusicCatalog0148;
const errors = [];
const warnings = [];
const expectedScripts = [
    '../js/lyrics-service-v3.js',
    'conversation-lessons-01-48-data.js',
    'conversation-music-catalog-01-48.js',
    'conversation-music-cloze.js',
    'conversation-lessons-runtime.js'
];

function normalize(value) {
    return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

if (Object.keys(lessons).length !== 48) errors.push(`Expected 48 lessons, found ${Object.keys(lessons).length}.`);
if (!catalog) errors.push('ConversationMusicCatalog0148 is unavailable.');

const promptOwners = new Map();
const sentenceOwners = new Map();
const contextSignatures = new Map();
const forbiddenEditorial = /This situation is a clear example of|offers a concrete listening lens|ideas, choices, and real-life consequences|Everyday Transfer|Decision Lab|Theme in Context|Choose a realistic situation from home|Choose the safer or more familiar path|Tell a two-minute personal story|What position do you take on one difficult question|What realistic plan or solution would improve/i;
const genericMusicQuestion = /personal experience or reaction connects you|central idea in .+ appear in culture|Which interpretation of .+ fits the theme|attitude in .+ is useful in real life but hides/i;
const malformedText = /(?:^|\s)\d+[.)]\s+\d+[.)]\s|""|''|““|””|&(?:amp|quot|apos|nbsp|#\d+);|\s+[,.;!?]/;

function collectSentences(value, owner) {
    String(value || '').split(/(?<=[.!?])\s+/).map((item) => item.trim()).filter((item) => item.length >= 35).forEach((sentence) => {
        const key = normalize(sentence);
        const owners = sentenceOwners.get(key) || new Set();
        owners.add(owner);
        sentenceOwners.set(key, owners);
    });
}

function stringValues(value, result = []) {
    if (typeof value === 'string') result.push(value);
    else if (Array.isArray(value)) value.forEach((item) => stringValues(item, result));
    else if (value && typeof value === 'object') Object.values(value).forEach((item) => stringValues(item, result));
    return result;
}

Object.values(lessons).forEach((lesson) => {
    const prefix = `L${lesson.lessonNumber}`;
    if (!lesson.title || normalize(lesson.title).includes('lesson unavailable')) errors.push(`${prefix}: missing title.`);
    if (lesson.warmups?.length !== 5) errors.push(`${prefix}: expected five warm-up prompts.`);
    if (lesson.expressions?.length !== 6) errors.push(`${prefix}: expected six expressions.`);
    if (lesson.songs?.length !== 3) errors.push(`${prefix}: expected three songs.`);
    if (lesson.songs?.some((song) => song.questions?.length !== 4)) errors.push(`${prefix}: every song needs exactly four discussion questions.`);
    if (lesson.contexts?.length !== 2) errors.push(`${prefix}: expected two transfer contexts.`);
    if (lesson.contexts?.some((block) => block.cards?.length !== 4 || !String(block.prompt).trim().endsWith('?'))) errors.push(`${prefix}: malformed transfer context.`);
    if (lesson.practice?.length !== 6) errors.push(`${prefix}: practice must recover six expressions.`);
    if (lesson.speaking?.prompts?.length !== 4) errors.push(`${prefix}: oral production needs four supports/prompts.`);
    if (!lesson.homework?.task || !lesson.homework?.model || lesson.homework?.requiredExpressions?.length < 2) errors.push(`${prefix}: homework task, model, or two-expression target missing.`);
    if (!lesson.closing) errors.push(`${prefix}: closing missing.`);
    const serialized = JSON.stringify(lesson);
    if (forbiddenEditorial.test(serialized)) errors.push(`${prefix}: generic editorial filler remains.`);
    const malformedValue = stringValues(lesson).find((value) => malformedText.test(value));
    if (malformedValue) errors.push(`${prefix}: malformed text detected: ${malformedValue}`);
    const terms = lesson.expressions?.map((expression) => expression.term) || [];
    const practiceAnswers = lesson.practice?.map((item) => item.answer) || [];
    if (JSON.stringify(terms) !== JSON.stringify(practiceAnswers)) errors.push(`${prefix}: practice answers drift from the six flashcards.`);
    lesson.expressions?.forEach((expression, index) => {
        if (!expression.example || expression.example.length < 35 || /clear example|useful expression|this situation/i.test(expression.example)) errors.push(`${prefix}: expression ${index + 1} has a generic or missing example.`);
        if (/["'“”].+["'“”]/.test(expression.meaning)) errors.push(`${prefix}: expression ${index + 1} meaning still contains an embedded example.`);
    });
    const practiceTexts = lesson.practice?.map((item) => normalize(item.text)) || [];
    if (new Set(practiceTexts).size !== 6) errors.push(`${prefix}: practice situations are not distinct.`);
    lesson.practice?.forEach((item, index) => {
        if (!String(item.text).includes('{gap}') || normalize(item.text) === normalize(lesson.expressions[index]?.meaning)) errors.push(`${prefix}: practice ${index + 1} is not a contextualized gap situation.`);
        if (normalize(item.text).includes(normalize(item.answer))) errors.push(`${prefix}: practice ${index + 1} exposes its answer.`);
    });
    lesson.songs?.forEach((song, songIndex) => {
        if (new Set((song.questions || []).map(normalize)).size !== 4) errors.push(`${prefix}: song ${songIndex + 1} questions are not distinct.`);
        if ((song.questions || []).some((question) => genericMusicQuestion.test(question))) errors.push(`${prefix}: song ${songIndex + 1} retains generated debate filler.`);
    });
    lesson.contexts?.forEach((block, index) => {
        const signature = normalize([block.title, block.intro, block.prompt, ...(block.cards || []).map((card) => `${card.title} ${card.text}`)].join(' '));
        const owner = contextSignatures.get(signature);
        if (owner) errors.push(`${prefix}: context ${index + 1} duplicates ${owner}.`);
        contextSignatures.set(signature, `${prefix} context ${index + 1}`);
        if (new Set((block.cards || []).map((card) => normalize(`${card.title} ${card.text}`))).size !== 4) errors.push(`${prefix}: context ${index + 1} cards are not distinct.`);
    });
    if (/clear example|useful expression|write about one of the following/i.test(lesson.homework?.model || '')) errors.push(`${prefix}: homework model is generic.`);
    collectSentences(serialized, prefix);
    const prompts = [
        ...(lesson.warmups || []),
        ...(lesson.songs || []).flatMap((song) => song.questions || []),
        ...(lesson.contexts || []).map((block) => block.prompt),
        ...(lesson.speaking?.prompts || [])
    ];
    prompts.forEach((prompt) => {
        if (!String(prompt).trim().endsWith('?')) errors.push(`${prefix}: non-question conversation prompt: ${prompt}`);
        const key = normalize(prompt);
        const owner = promptOwners.get(key);
        if (owner && owner !== prefix) warnings.push(`${prefix}: prompt also used by ${owner}: ${prompt}`);
        else promptOwners.set(key, prefix);
    });
});

sentenceOwners.forEach((owners, sentence) => {
    if (owners.size > 2) errors.push(`Repeated sentence appears in ${owners.size} lessons: ${sentence}`);
});

for (let lessonNumber = 1; lessonNumber <= 48; lessonNumber += 1) {
    const padded = String(lessonNumber).padStart(2, '0');
    const filePath = path.join(directory, `licao-${padded}.html`);
    if (!fs.existsSync(filePath)) {
        errors.push(`L${lessonNumber}: page missing.`);
        continue;
    }
    const html = fs.readFileSync(filePath, 'utf8');
    if ((html.match(/<!DOCTYPE html>/gi) || []).length !== 1) errors.push(`L${lessonNumber}: malformed or nested document.`);
    if (html.includes('open.spotify.com/embed/search') || /youtube(?:-nocookie)?\.com\/embed/i.test(html)) errors.push(`L${lessonNumber}: unsupported music embed persisted in shell.`);
    if (/<iframe\b/i.test(html)) errors.push(`L${lessonNumber}: shell must not persist a player; runtime owns verified embeds.`);
    if (/copyright-safe|placeholder|awaiting verification|under review|backstage/i.test(html)) errors.push(`L${lessonNumber}: backstage text in Student View shell.`);
    let previous = -1;
    expectedScripts.forEach((script) => {
        const index = html.indexOf(`src="${script}"`);
        if (index < 0) errors.push(`L${lessonNumber}: missing ${script}.`);
        if (index >= 0 && index < previous) errors.push(`L${lessonNumber}: shared scripts out of order.`);
        previous = Math.max(previous, index);
    });
    if (!html.includes('../js/progress-manager.js') || !html.includes('id="progress-bar"') || !html.includes('id="slide-counter"')) errors.push(`L${lessonNumber}: progress integration missing.`);
}

const dataSource = fs.readFileSync(path.join(directory, 'conversation-lessons-01-48-data.js'), 'utf8');
const catalogSource = fs.readFileSync(path.join(directory, 'conversation-music-catalog-01-48.js'), 'utf8');
const runtimeSource = fs.readFileSync(path.join(directory, 'conversation-lessons-runtime.js'), 'utf8');
const themeSource = fs.readFileSync(path.join(directory, 'conversation-lesson-theme.js'), 'utf8');
if (/plainLyrics|syncedLyrics|providerLines|lyricsfile/i.test(dataSource + catalogSource)) errors.push('Persisted commercial lyric field detected.');
if (/Copyright-safe lyric placeholder|complete the lyrics|complete the interpretation/i.test(dataSource)) errors.push('Legacy music body or synthetic lyric interpretation detected in canonical data.');
if (/\*\*\*?|students should|artist pending source review|placeholder|awaiting verification|under review|backstage/i.test(dataSource)) errors.push('Literal formatting, classroom-incompatible instruction, placeholder, or backstage text detected in canonical data.');
if (forbiddenEditorial.test(dataSource)) errors.push('Generic editorial filler detected in canonical data.');
if (/lighterPrompts|Private Eyes.*innerHTML|Make .Em Laugh.*innerHTML|querySelectorAll\(['"]p['"]\)/s.test(themeSource)) errors.push('conversation-lesson-theme.js still acts as an editorial source.');
if (runtimeSource.includes('Math.random')) errors.push('Runtime must keep practice and answers deterministic.');
if (!runtimeSource.includes("['Personal', 'Culture & Society / Reflection', 'Opinion', 'Hot Take / Debate']")) errors.push('Required four-lens debate progression missing.');
if (!runtimeSource.includes("new Set(['provider-verified', 'draft-until-provider-match'])") || !runtimeSource.includes('musicAvailableInRuntime(display.entry)')) errors.push('Runtime does not expose verified and draft music under the authorized runtime contract.');
const expectedKinds = ['warmup', 'expressions', 'music', 'debate', 'context', 'music', 'debate', 'context', 'music', 'debate', 'practice', 'speaking', 'homework', 'closing'];
const runtimeOrder = [
    'data-slide-kind="warmup"',
    'data-slide-kind="expressions"',
    'songSlide(lesson.songs[0], 0)',
    'debateSlide(lesson.songs[0], 0)',
    'contextSlide(lesson.contexts[0], 0)',
    'songSlide(lesson.songs[1], 1)',
    'debateSlide(lesson.songs[1], 1)',
    'contextSlide(lesson.contexts[1], 1)',
    'songSlide(lesson.songs[2], 2)',
    'debateSlide(lesson.songs[2], 2)',
    'practiceSlide()',
    'speakingSlide()',
    'homeworkSlide()',
    'data-slide-kind="closing"'
];
let runtimePosition = -1;
runtimeOrder.forEach((needle, index) => {
    const position = runtimeSource.indexOf(needle, runtimePosition + 1);
    if (position < 0) errors.push(`Unified runtime missing structural step ${index + 1}: ${expectedKinds[index]}.`);
    runtimePosition = Math.max(runtimePosition, position);
});

console.log(JSON.stringify({
    lessons: Object.keys(lessons).length,
    canonicalSongs: Object.values(lessons).reduce((total, lesson) => total + lesson.songs.length, 0),
    warmupPrompts: Object.values(lessons).reduce((total, lesson) => total + lesson.warmups.length, 0),
    expressions: Object.values(lessons).reduce((total, lesson) => total + lesson.expressions.length, 0),
    discussionCards: Object.values(lessons).reduce((total, lesson) => total + lesson.songs.reduce((sum, song) => sum + song.questions.length, 0), 0),
    contexts: Object.values(lessons).reduce((total, lesson) => total + lesson.contexts.length, 0),
    expectedSlidesPerLesson: 14,
    persistedCommercialLyrics: false,
    errors,
    warnings
}, null, 2));

if (errors.length) process.exitCode = 1;
