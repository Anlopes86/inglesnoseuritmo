const path = require('path');

global.window = {};

[
    'b1-v3-lessons-data.js',
    'b1-v3-lessons-block1a.js',
    'b1-v3-lessons-block1b.js',
    'b1-v3-lessons-block2a.js',
    'b1-v3-lessons-block2b.js',
    'b1-v3-lessons-block3a.js',
    'b1-v3-lessons-block3b.js',
    'b1-v3-lessons-block4a.js',
    'b1-v3-lessons-block4b.js'
].forEach(file => require(path.join(__dirname, '..', 'js', file)));

const lessons = window.B1_V3_LESSONS || [];
const errors = [];
const warnings = [];
const reviews = new Set([8, 16, 24, 32]);

function fail(lesson, message) {
    errors.push(`L${String(lesson.number).padStart(2, '0')}: ${message}`);
}

function warn(lesson, message) {
    warnings.push(`L${String(lesson.number).padStart(2, '0')}: ${message}`);
}

function slidesOf(lesson, type) {
    return lesson.slides.filter(slide => slide.type === type);
}

function wordCount(value) {
    return String(value || '').trim().split(/\s+/).filter(Boolean).length;
}

function normalize(value) {
    return String(value || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
}

if (lessons.length !== 32) errors.push(`Module: expected 32 lessons, found ${lessons.length}.`);

const numbers = lessons.map(lesson => lesson.number);
for (let number = 1; number <= 32; number += 1) {
    if (!numbers.includes(number)) errors.push(`Module: missing lesson ${number}.`);
}

const duplicateNumbers = numbers.filter((number, index) => numbers.indexOf(number) !== index);
if (duplicateNumbers.length) errors.push(`Module: duplicate lesson numbers ${[...new Set(duplicateNumbers)].join(', ')}.`);

const forbiddenText = [
    /\bdiego\b/i,
    /record (your|a) voice/i,
    /grave (sua|a) voz/i,
    /audio recorder/i,
    /use (the )?microphone/i,
    /copyright[- ]safe lyric placeholder/i,
    /placeholder lyric/i,
    /what is the main situation/i,
    /how could you connect this text to your own life/i,
    /as you read, underline/i,
    /use a ideia de/i
];

const exactPrompts = new Map();
const exactPortuguese = new Map();

lessons.forEach(lesson => {
    const serialized = JSON.stringify(lesson);
    forbiddenText.forEach(pattern => {
        if (pattern.test(serialized)) fail(lesson, `forbidden text matched ${pattern}.`);
    });

    if (!lesson.title || !lesson.objective || !lesson.focus || !lesson.cefr) {
        fail(lesson, 'missing catalog metadata.');
    }

    if (slidesOf(lesson, 'opening').length !== 1) fail(lesson, 'must contain one opening slide.');
    const opening = slidesOf(lesson, 'opening')[0];
    if (!opening || !Array.isArray(opening.objectives) || opening.objectives.length < 4) fail(lesson, 'opening needs at least four objectives.');
    if (!opening || !opening.dialogue || opening.dialogue.lines.length < 6) fail(lesson, 'introductory dialogue needs at least six lines.');

    if (slidesOf(lesson, 'grammar').length !== 1) fail(lesson, 'must contain one grammar slide.');
    const grammar = slidesOf(lesson, 'grammar')[0];
    if (!grammar || !Array.isArray(grammar.tables) || grammar.tables.length < 2) fail(lesson, 'grammar needs at least two tables.');
    if (!grammar || !Array.isArray(grammar.notes) || grammar.notes.length < 3) fail(lesson, 'grammar needs at least three concise notes.');

    const practiceSlides = slidesOf(lesson, 'practice');
    const practiceItems = practiceSlides.flatMap(slide => slide.items || []);
    const expectedMinimum = reviews.has(lesson.number) ? 20 : 10;
    if (practiceItems.length < expectedMinimum) fail(lesson, `expected at least ${expectedMinimum} practice items, found ${practiceItems.length}.`);

    practiceItems.forEach((item, index) => {
        if (!item.prompt || !item.answer) fail(lesson, `practice item ${index + 1} lacks prompt or answer.`);
        if (!item.hint) fail(lesson, `practice item ${index + 1} lacks a Portuguese hint.`);
        if (item.kind === 'complete' && !item.prompt.includes('____')) fail(lesson, `complete item ${index + 1} has no blank.`);
        if (item.kind === 'complete' && /\([A-Za-z][^)]*\)\s*[?.!]*$/.test(item.prompt)) {
            fail(lesson, `complete item ${index + 1} reveals an English cue in parentheses.`);
        }
        const key = normalize(item.prompt);
        if (key.length > 24) {
            if (exactPrompts.has(key)) fail(lesson, `practice prompt duplicates ${exactPrompts.get(key)}.`);
            else exactPrompts.set(key, `L${lesson.number}`);
        }
    });

    const reading = slidesOf(lesson, 'reading')[0];
    const separateReadingQuestions = slidesOf(lesson, 'readingQuestions');
    if (!reading || (reading.paragraphs || []).length < 3) fail(lesson, 'reading needs at least three paragraphs.');
    const readingWords = wordCount((reading?.paragraphs || []).join(' '));
    if (readingWords < 120) warn(lesson, `reading has only ${readingWords} words.`);
    if (separateReadingQuestions.length) fail(lesson, 'reading questions must not use a separate slide.');
    if (!reading || (reading.questions || []).length !== 4) fail(lesson, 'reading slide must contain exactly four questions.');
    (reading?.questions || []).forEach((item, index) => {
        if (!item.question || !item.answer) fail(lesson, `reading question ${index + 1} lacks question or answer.`);
        if (/\byou\b|your own|your life|personally/i.test(item.question)) fail(lesson, `reading question ${index + 1} is personal.`);
    });

    const translationSlides = slidesOf(lesson, 'translation');
    const translations = translationSlides.flatMap(slide => slide.items || []);
    const translationMinimum = reviews.has(lesson.number) ? 10 : 14;
    if (translations.length < translationMinimum) fail(lesson, `expected at least ${translationMinimum} translation items, found ${translations.length}.`);
    translations.forEach((item, index) => {
        if (!item.pt || !item.en) fail(lesson, `translation ${index + 1} lacks Portuguese or English.`);
        if (wordCount(item.pt) < 3) {
            warn(lesson, `translation ${index + 1} may not be a complete Portuguese prompt: ${item.pt}`);
        }
        if (/\b(the|this|that|should|would|could|must|work problem|past simple|present perfect|phrasal verb)\b/i.test(item.pt)) {
            fail(lesson, `translation ${index + 1} appears to mix English into Portuguese: ${item.pt}`);
        }
        const key = normalize(item.pt);
        if (key.length > 24) {
            if (exactPortuguese.has(key)) fail(lesson, `Portuguese translation duplicates ${exactPortuguese.get(key)}.`);
            else exactPortuguese.set(key, `L${lesson.number}`);
        }
    });

    const homework = slidesOf(lesson, 'homework')[0];
    if (!homework || (homework.options || []).length !== 3) fail(lesson, 'homework must offer exactly three themes.');
    if (!homework || (homework.checklist || []).length < 4) fail(lesson, 'homework needs a four-item checklist.');

    const speaking = slidesOf(lesson, 'speaking')[0];
    if (!speaking || (speaking.rounds || []).length < 3) fail(lesson, 'speaking needs at least three teacher-led rounds.');
    (speaking?.rounds || []).forEach((round, index) => {
        const prompt = typeof round === 'string' ? round : round.prompt;
        if (!prompt || !String(prompt).trim()) fail(lesson, `speaking round ${index + 1} has no prompt.`);
    });
    if (!speaking || !(Array.isArray(speaking.teacherFocus) ? speaking.teacherFocus.length : String(speaking.teacherFocus || '').trim())) {
        fail(lesson, 'speaking needs a visible teacher focus.');
    }

    if (reviews.has(lesson.number)) {
        if (lesson.slides.length !== 10) fail(lesson, `review should have 10 distinct slides, found ${lesson.slides.length}.`);
        if (practiceSlides.length !== 2) fail(lesson, 'review needs two different practice stations.');
        if (slidesOf(lesson, 'assessment').length !== 1) fail(lesson, 'review needs one assessment slide.');
        if (slidesOf(lesson, 'teacherListening').length !== 1) fail(lesson, 'review needs one teacher-read listening slide.');
        if (slidesOf(lesson, 'music').length) fail(lesson, 'review should not reuse the normal music structure.');
    } else {
        const vocabulary = slidesOf(lesson, 'vocabulary')[0];
        if (!vocabulary || (vocabulary.items || []).length < 8) fail(lesson, 'normal lesson needs at least eight vocabulary cards.');

        const bank = slidesOf(lesson, 'languageBank')[0];
        if (!bank || (bank.items || []).length < 6) fail(lesson, 'normal lesson needs at least six expressions.');

        const dialogueSlide = slidesOf(lesson, 'dialogues')[0];
        const dialogues = dialogueSlide?.dialogues || [];
        if (dialogues.length !== 4) fail(lesson, `expected four mini dialogues, found ${dialogues.length}.`);
        const dialogueLengths = dialogues.map(item => (item.lines || []).length);
        if (!dialogueLengths.some(length => length >= 6) || new Set(dialogueLengths).size < 2) {
            fail(lesson, `mini-dialogue lengths need meaningful variation; found ${dialogueLengths.join(', ')}.`);
        }
        dialogues.forEach((item, index) => {
            if (!item.title || !item.context || (item.lines || []).length < 2) fail(lesson, `mini dialogue ${index + 1} is incomplete.`);
        });

        const music = slidesOf(lesson, 'music')[0];
        if (!music || !music.song || !music.artist || (music.lines || []).length < 4) fail(lesson, 'normal lesson needs a music slide with four running gap lines.');
        (music?.lines || []).forEach((line, index) => {
            if (!Array.isArray(line) || line.length !== 3 || !line[1]) fail(lesson, `music gap ${index + 1} is invalid.`);
        });
    }
});

const titleKeys = lessons.map(lesson => normalize(lesson.title));
const duplicateTitles = titleKeys.filter((title, index) => titleKeys.indexOf(title) !== index);
if (duplicateTitles.length) errors.push(`Module: duplicate titles ${[...new Set(duplicateTitles)].join(', ')}.`);

console.log(`B1-V3 audit: ${lessons.length} lessons, ${errors.length} errors, ${warnings.length} warnings.`);
if (errors.length) console.log(`\nERRORS\n${errors.join('\n')}`);
if (warnings.length) console.log(`\nWARNINGS\n${warnings.join('\n')}`);

process.exitCode = errors.length ? 1 : 0;
