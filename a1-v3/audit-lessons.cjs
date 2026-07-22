const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataPath = path.join(__dirname, 'a1-v3-data.js');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(dataPath, 'utf8'), context, { filename: dataPath });

const data = context.window.A1V3_DATA;
const errors = [];
const reviewNumbers = new Set([4, 8, 12, 16, 20, 24, 28, 32]);
const seen = {
    reading: new Map(),
    intro: new Map(),
    dialogue: new Map(),
    practice: new Map(),
    translation: new Map(),
    song: new Map(),
    vocabulary: new Map(),
    expression: new Map()
};

function fail(message) {
    errors.push(message);
}

function normalize(value) {
    return String(value || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
}

function remember(group, value, lessonNumber) {
    const key = normalize(value);
    if (!key) return;
    const bank = seen[group];
    if (!bank.has(key)) bank.set(key, new Set());
    bank.get(key).add(lessonNumber);
}

function answerAppearsOutsideGap(prompt, answer) {
    const promptWithoutGap = ` ${normalize(String(prompt || '').replace(/_{3,}/g, ' '))} `;
    const normalizedAnswer = normalize(answer);
    return Boolean(normalizedAnswer) && promptWithoutGap.includes(` ${normalizedAnswer} `);
}

function validateReading(reading, lessonNumber) {
    if (!reading?.title || !reading?.text) {
        fail(`Lesson ${lessonNumber}: reading title or text is missing.`);
        return;
    }
    const count = reading.text.trim().split(/\s+/).filter(Boolean).length;
    if (count < 45 || count > 130) {
        fail(`Lesson ${lessonNumber}: reading has ${count} words; expected 45-130 for A1/A1+.`);
    }
    if (!Array.isArray(reading.questions) || reading.questions.length !== 4) {
        fail(`Lesson ${lessonNumber}: reading must have exactly four questions.`);
    }
    for (const [question, answer] of reading.questions || []) {
        if (!question || !answer) fail(`Lesson ${lessonNumber}: incomplete reading question.`);
        if (/main situation|your own life|connect this text/i.test(question || '')) {
            fail(`Lesson ${lessonNumber}: reading has an abstract or personal question.`);
        }
    }
    remember('reading', reading.text, lessonNumber);
}

function validateMusic(music, lessonNumber) {
    if (!music?.song || !music?.artist) fail(`Lesson ${lessonNumber}: music selection is missing.`);
    if (!/^[A-Za-z0-9]{22}$/.test(music?.spotifyId || '')) {
        fail(`Lesson ${lessonNumber}: music needs a valid direct Spotify track ID.`);
    }
    if (!Array.isArray(music?.lines) || music.lines.length < 5) {
        fail(`Lesson ${lessonNumber}: music must have at least five continuous blanks.`);
        return;
    }
    for (const [line, answer] of music.lines) {
        const hasGap = String(line || '').includes('___') || normalize(line).includes(normalize(answer));
        if (!line || !answer || !hasGap) {
            fail(`Lesson ${lessonNumber}: music answer is not present in its line.`);
        }
    }
    remember('song', `${music.song} ${music.artist}`, lessonNumber);
}

function validateHomework(homework, lessonNumber) {
    if (!homework?.instruction) fail(`Lesson ${lessonNumber}: homework instruction is missing.`);
    if (!Array.isArray(homework?.themes) || homework.themes.length !== 3) {
        fail(`Lesson ${lessonNumber}: homework must offer exactly three themes.`);
    }
    if (!Array.isArray(homework?.checklist) || homework.checklist.length < 3) {
        fail(`Lesson ${lessonNumber}: homework checklist must have at least three items.`);
    }
    if (/\bgrave\b|grava[cç][aã]o|\brecord\b|\b[áa]udio\b/i.test(homework?.instruction || '')) {
        fail(`Lesson ${lessonNumber}: homework asks for a recording.`);
    }
}

function validateRegular(lesson, lessonNumber) {
    if (!Array.isArray(lesson.objectives) || lesson.objectives.length !== 3) {
        fail(`Lesson ${lessonNumber}: expected three objectives.`);
    }
    if (!Array.isArray(lesson.intro) || lesson.intro.length < 6) {
        fail(`Lesson ${lessonNumber}: introductory dialogue needs at least six lines.`);
    }
    remember('intro', (lesson.intro || []).flat().join(' '), lessonNumber);

    if (!Array.isArray(lesson.vocab) || lesson.vocab.length < 8) {
        fail(`Lesson ${lessonNumber}: expected at least eight vocabulary cards.`);
    }
    for (const [word, meaning, example] of lesson.vocab || []) {
        if (!word || !meaning || !example) fail(`Lesson ${lessonNumber}: incomplete vocabulary card.`);
        remember('vocabulary', word, lessonNumber);
    }
    if (!lesson.grammar?.summary || lesson.grammar?.rows?.length < 4 || lesson.grammar?.notes?.length < 3) {
        fail(`Lesson ${lessonNumber}: grammar explanation is incomplete.`);
    }
    if (!Array.isArray(lesson.practice) || lesson.practice.length < 10) {
        fail(`Lesson ${lessonNumber}: expected at least ten practice questions.`);
    }
    for (const [type, prompt, hint, answer] of lesson.practice || []) {
        if (!type || !prompt || !hint || !answer) fail(`Lesson ${lessonNumber}: incomplete practice item.`);
        if (type === 'Complete' && !/_{3,}/.test(prompt)) {
            fail(`Lesson ${lessonNumber}: Complete item has no blank: ${prompt}`);
        }
        if (type === 'Complete' && answerAppearsOutsideGap(prompt, answer)) {
            fail(`Lesson ${lessonNumber}: Complete item already contains its answer: ${prompt}`);
        }
        remember('practice', `${type} ${prompt}`, lessonNumber);
    }

    if (!Array.isArray(lesson.translations) || lesson.translations.length < 6) {
        fail(`Lesson ${lessonNumber}: first oral translation needs six sentences.`);
    }
    for (const [pt, en] of lesson.translations || []) {
        if (!pt || !en) fail(`Lesson ${lessonNumber}: incomplete translation.`);
        if (/traduza|use a ideia|using|answer about/i.test(pt || '')) {
            fail(`Lesson ${lessonNumber}: translation contains a metalinguistic prompt.`);
        }
        remember('translation', `${pt} ${en}`, lessonNumber);
    }

    if (!Array.isArray(lesson.expressions) || lesson.expressions.length !== 4) {
        fail(`Lesson ${lessonNumber}: expected four useful expressions.`);
    }
    for (const [phrase, meaning, note, example] of lesson.expressions || []) {
        if (!phrase || !meaning || !note || !example) fail(`Lesson ${lessonNumber}: incomplete expression card.`);
        remember('expression', phrase, lessonNumber);
    }
    if (!Array.isArray(lesson.dialogues) || lesson.dialogues.length !== 4) {
        fail(`Lesson ${lessonNumber}: expected four mini dialogues.`);
    } else if (!lesson.dialogues.some((dialogue) => dialogue.lines?.length >= 6)) {
        fail(`Lesson ${lessonNumber}: mini-dialogue lengths do not vary.`);
    }
    for (const dialogue of lesson.dialogues || []) {
        if (!dialogue.title || dialogue.lines?.length < 4) fail(`Lesson ${lessonNumber}: incomplete mini dialogue.`);
        remember('dialogue', (dialogue.lines || []).flat().join(' '), lessonNumber);
    }

    validateReading(lesson.reading, lessonNumber);
    if (!Array.isArray(lesson.expressionTranslations) || lesson.expressionTranslations.length !== 4) {
        fail(`Lesson ${lessonNumber}: expression translation needs four sentences.`);
    }
    for (const [pt, en] of lesson.expressionTranslations || []) {
        if (!pt || !en) fail(`Lesson ${lessonNumber}: incomplete expression translation.`);
        if (/traduza|use a ideia|using|answer about/i.test(pt || '')) {
            fail(`Lesson ${lessonNumber}: expression translation contains a metalinguistic prompt.`);
        }
        remember('translation', `${pt} ${en}`, lessonNumber);
    }
    validateMusic(lesson.music, lessonNumber);
    validateHomework(lesson.homework, lessonNumber);

    for (const [labIndex, lab] of (lesson.labs || []).entries()) {
        if (!lab.title || !lab.instruction || !Array.isArray(lab.items) || lab.items.length < 3) {
            fail(`Lesson ${lessonNumber}, lab ${labIndex + 1}: lab is incomplete.`);
        }
        for (const item of lab.items || []) {
            if (item.length !== 3 || item.some((value) => !value)) {
                fail(`Lesson ${lessonNumber}, lab ${labIndex + 1}: incomplete item.`);
            }
            if (/_{3,}/.test(item[0] || '') && answerAppearsOutsideGap(item[0], item[2])) {
                fail(`Lesson ${lessonNumber}, lab ${labIndex + 1}: prompt already contains its answer.`);
            }
        }
    }
}

function validateReview(review, lessonNumber) {
    if (!Array.isArray(review.objectives) || review.objectives.length !== 3) {
        fail(`Lesson ${lessonNumber}: review needs three objectives.`);
    }
    if (!Array.isArray(review.recap) || review.recap.length < 3) {
        fail(`Lesson ${lessonNumber}: review needs a grammar recap.`);
    }
    if (!Array.isArray(review.stations) || review.stations.length < 6) {
        fail(`Lesson ${lessonNumber}: review needs at least six activity stations.`);
    }
    const localPrompts = new Set();
    for (const [stationIndex, station] of (review.stations || []).entries()) {
        if (!station.title || !station.instruction || !Array.isArray(station.items) || station.items.length < 4) {
            fail(`Lesson ${lessonNumber}, station ${stationIndex + 1}: station is incomplete.`);
        }
        for (const [type, prompt, hint, answer] of station.items || []) {
            if (!type || !prompt || !hint || !answer) fail(`Lesson ${lessonNumber}: incomplete review item.`);
            if (type === 'Complete' && !/_{3,}/.test(prompt)) {
                fail(`Lesson ${lessonNumber}: review Complete item has no blank: ${prompt}`);
            }
            if (type === 'Complete' && answerAppearsOutsideGap(prompt, answer)) {
                fail(`Lesson ${lessonNumber}: review Complete item already contains its answer: ${prompt}`);
            }
            const key = normalize(prompt);
            if (localPrompts.has(key)) fail(`Lesson ${lessonNumber}: repeated prompt inside review: ${prompt}`);
            localPrompts.add(key);
        }
    }
    validateReading(review.reading, lessonNumber);
    validateHomework(review.homework, lessonNumber);
}

if (!data || !Array.isArray(data.lessonTitles) || data.lessonTitles.length !== 32) {
    fail('A1 V3 must expose exactly 32 lesson titles.');
}
if (!Array.isArray(data?.unitLabels) || data.unitLabels.length !== 32) {
    fail('A1 V3 must expose exactly 32 unit labels.');
}

const moduleSource = fs.readFileSync(path.join(__dirname, '..', 'js', 'a1-v3-module.js'), 'utf8');
for (const [variableName, expected] of [['lessonTitles', data?.lessonTitles], ['unitLabels', data?.unitLabels]]) {
    const match = moduleSource.match(new RegExp(`const ${variableName} = \\[([\\s\\S]*?)\\];`));
    if (!match) {
        fail(`A1 V3 module is missing ${variableName}.`);
        continue;
    }
    try {
        const actual = JSON.parse(`[${match[1]}]`);
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            fail(`A1 V3 module ${variableName} does not match the lesson data.`);
        }
    } catch {
        fail(`A1 V3 module ${variableName} could not be parsed.`);
    }
}

for (let lessonNumber = 1; lessonNumber <= 32; lessonNumber += 1) {
    const padded = String(lessonNumber).padStart(2, '0');
    const htmlPath = path.join(__dirname, `licao-${padded}.html`);
    if (!fs.existsSync(htmlPath)) {
        fail(`Lesson ${lessonNumber}: HTML page is missing.`);
        continue;
    }
    const html = fs.readFileSync(htmlPath, 'utf8');
    if (!html.includes(`data-lesson-number="${lessonNumber}"`)) fail(`Lesson ${lessonNumber}: wrong body lesson number.`);
    if ((html.match(/a1-v3-data\.js/g) || []).length !== 1) fail(`Lesson ${lessonNumber}: data script must load once.`);
    if ((html.match(/a1-v3-lesson-content\.js/g) || []).length !== 1) fail(`Lesson ${lessonNumber}: renderer must load once.`);
    if (!html.includes('<main id="lesson-root"')) fail(`Lesson ${lessonNumber}: lesson root is missing.`);

    const regular = data.lessons[lessonNumber];
    const review = data.reviews[lessonNumber];
    if (reviewNumbers.has(lessonNumber)) {
        if (regular) fail(`Lesson ${lessonNumber}: review also exists as a regular lesson.`);
        if (!review) fail(`Lesson ${lessonNumber}: review data is missing.`);
        else validateReview(review, lessonNumber);
    } else {
        if (review) fail(`Lesson ${lessonNumber}: regular lesson also exists as a review.`);
        if (!regular) fail(`Lesson ${lessonNumber}: regular lesson data is missing.`);
        else validateRegular(regular, lessonNumber);
    }
}

for (const [group, values] of Object.entries(seen)) {
    for (const lessons of values.values()) {
        if (lessons.size > 1) {
            fail(`${group}: duplicated content across lessons ${[...lessons].join(', ')}.`);
        }
    }
}

const allSource = fs.readFileSync(dataPath, 'utf8');
const rendererSource = fs.readFileSync(path.join(__dirname, 'a1-v3-lesson-content.js'), 'utf8');
if (/\bdiego\b/i.test(allSource)) fail('Forbidden name Diego found in A1 V3 content.');
if (/record (yourself|your voice)|gravar? (sua )?voz|grave (um )?[áa]udio|use (o )?microfone|envie (um )?[áa]udio/i.test(allSource)) {
    fail('A recording or microphone activity was found in A1 V3 content.');
}
if (/Let.?s practice this situation|Good\. Now continue|One more short exchange/i.test(allSource)) {
    fail('Generic dialogue template language found in A1 V3 content.');
}
if (/open\.spotify\.com\/embed\/search/i.test(rendererSource)) {
    fail('A1 V3 renderer still uses a generic Spotify search instead of direct tracks.');
}

if (errors.length) {
    console.error(`A1 V3 audit failed with ${errors.length} issue(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
} else {
    console.log('A1 V3 audit passed: 24 regular lessons, 8 review circuits, and 32 generated pages checked.');
}
