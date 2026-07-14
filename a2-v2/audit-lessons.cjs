const fs = require('fs');
const path = require('path');
const vm = require('vm');

const contentPath = path.join(__dirname, 'a2-v2-lesson-content.js');
const exportNames = [
    'lessonTitles',
    'getLessonData',
    'getReviewLesson',
    'getGrammarTable',
    'getMusicSelection'
];

const contentSource = fs.readFileSync(contentPath, 'utf8');
let source = contentSource;
source = source.replace(
    /\}\(\)\);\s*$/,
    `globalThis.__lessonAudit = { ${exportNames.join(', ')} };\n}());`
);

const document = {
    readyState: 'loading',
    title: 'A2 V2 audit',
    addEventListener() {}
};
const window = { location: { pathname: '/a2-v2/licao-01.html' } };
const context = { console, document, window };
vm.createContext(context);
vm.runInContext(source, context, { filename: contentPath });

const api = context.__lessonAudit;
const errors = [];
const reviewNumbers = new Set([8, 16, 24, 32]);
const recordingPromptPattern = /record (?:an? )?(?:audio|voice)|record your|gravar|grave (?:um|uma)|fa-microphone/i;
const duplicateBanks = {
    practice: new Map(),
    translation: new Map(),
    expressionTranslation: new Map(),
    intro: new Map(),
    dialogue: new Map(),
    reading: new Map(),
    grammarTable: new Map(),
    song: new Map()
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
    const bank = duplicateBanks[group];
    if (!bank.has(key)) bank.set(key, new Set());
    bank.get(key).add(lessonNumber);
}

function assertReview(number, review) {
    const requiredCounts = {
        drills: 8,
        translations: 5,
        oralTest: 5,
        errorClinic: 6,
        recap: 5
    };

    for (const [key, minimum] of Object.entries(requiredCounts)) {
        if (!Array.isArray(review[key]) || review[key].length < minimum) {
            fail(`Lesson ${number}: review.${key} must have at least ${minimum} items.`);
        }
    }

    const stationPrompts = new Map();
    const stationGroups = {
        drills: (review.drills || []).map((item) => item[1]),
        translations: (review.translations || []).map((item) => `${item[0]} ${item[1]}`),
        oralTest: (review.oralTest || []).map((item) => item[1]),
        errorClinic: (review.errorClinic || []).map((item) => item[1]),
        recap: (review.recap || []).map((item) => item[1])
    };

    for (const [station, prompts] of Object.entries(stationGroups)) {
        for (const prompt of prompts) {
            const key = normalize(prompt);
            if (stationPrompts.has(key)) {
                fail(`Lesson ${number}: repeated review prompt in ${stationPrompts.get(key)} and ${station}.`);
            }
            stationPrompts.set(key, station);
        }
    }
}

for (let number = 1; number <= 32; number += 1) {
    const lessonPath = path.join(__dirname, `licao-${String(number).padStart(2, '0')}.html`);
    if (!fs.existsSync(lessonPath)) {
        fail(`Lesson ${number}: HTML file is missing.`);
        continue;
    }
    const lessonHtml = fs.readFileSync(lessonPath, 'utf8');
    const slideCount = (lessonHtml.match(/data-title=/g) || []).length;
    const contentScriptCount = (lessonHtml.match(/a2-v2-lesson-content\.js/g) || []).length;
    if (slideCount !== 11) fail(`Lesson ${number}: expected 11 slides, found ${slideCount}.`);
    if (contentScriptCount !== 1) fail(`Lesson ${number}: content script must be loaded exactly once.`);
    if (!lessonHtml.includes(api.lessonTitles[number - 1])) {
        fail(`Lesson ${number}: static title does not match the lesson data.`);
    }
    if (recordingPromptPattern.test(lessonHtml)) {
        fail(`Lesson ${number}: static HTML still contains a recording instruction.`);
    }

    window.location.pathname = `/a2-v2/licao-${String(number).padStart(2, '0')}.html`;
    document.title = `A2 V2 Lesson ${number}`;
    const data = api.getLessonData();
    const bank = data.bank;
    const review = api.getReviewLesson(number);

    if (recordingPromptPattern.test(JSON.stringify({ bank, review }))) {
        fail(`Lesson ${number}: lesson data contains a recording instruction.`);
    }

    if (reviewNumbers.has(number)) {
        if (!review) fail(`Lesson ${number}: review configuration is missing.`);
        else assertReview(number, review);
        continue;
    }

    if (review) fail(`Lesson ${number}: unexpected review configuration.`);
    if (!Array.isArray(bank.objectives) || bank.objectives.length !== 3) {
        fail(`Lesson ${number}: expected 3 learning objectives.`);
    }
    if (!Array.isArray(bank.vocab) || bank.vocab.length < 8) {
        fail(`Lesson ${number}: expected at least 8 vocabulary cards.`);
    }
    if (!Array.isArray(bank.practice) || bank.practice.length < 10) {
        fail(`Lesson ${number}: Practice Time must have at least 10 questions.`);
    }

    for (const [index, item] of (bank.practice || []).entries()) {
        if (!item.prompt || !item.answer || !item.hint) {
            fail(`Lesson ${number}, practice ${index + 1}: prompt, hint, or answer is missing.`);
        }
        if (['Explain', 'Challenge', 'Personal answer'].includes(item.type)) {
            fail(`Lesson ${number}, practice ${index + 1}: forbidden type ${item.type}.`);
        }
        if (item.type === 'Complete' && !/_{3,}/.test(item.prompt || '')) {
            fail(`Lesson ${number}, practice ${index + 1}: Complete item has no blank.`);
        }
        if (item.type === 'Complete') {
            const prompt = normalize(String(item.prompt).replace(/_{3,}/g, ''));
            const answer = normalize(item.answer);
            if (answer && prompt.includes(answer)) {
                fail(`Lesson ${number}, practice ${index + 1}: answer is still visible in the prompt.`);
            }
        }
        remember('practice', item.prompt, number);
    }

    if (!Array.isArray(bank.translations) || bank.translations.length < 6) {
        fail(`Lesson ${number}: Oral Translation I must have at least 6 sentences.`);
    }
    for (const item of bank.translations || []) {
        if (!item.pt || !item.en) fail(`Lesson ${number}: incomplete oral translation item.`);
        if (/use a ideia|using one structure|work problem that|answer about/i.test(item.pt || '')) {
            fail(`Lesson ${number}: oral translation contains a metalinguistic prompt.`);
        }
        remember('translation', `${item.pt} ${item.en}`, number);
    }

    if (!Array.isArray(bank.expressionTranslations) || bank.expressionTranslations.length < 4) {
        fail(`Lesson ${number}: Oral Translation II must have at least 4 sentences.`);
    }
    for (const item of bank.expressionTranslations || []) {
        if (!item.pt || !item.en) fail(`Lesson ${number}: incomplete expression translation item.`);
        remember('expressionTranslation', `${item.pt} ${item.en}`, number);
    }

    if (!Array.isArray(bank.introDialogue) || bank.introDialogue.length < 6) {
        fail(`Lesson ${number}: introductory dialogue must have at least 6 lines.`);
    }
    if (!Array.isArray(bank.dialogues) || bank.dialogues.length !== 4) {
        fail(`Lesson ${number}: expected exactly 4 mini dialogues.`);
    } else if (!bank.dialogues.some((dialogue) => dialogue.length > 4)) {
        fail(`Lesson ${number}: mini-dialogue lengths do not vary.`);
    }
    remember('intro', (bank.introDialogue || []).flat().join(' '), number);
    for (const [dialogueIndex, dialogue] of (bank.dialogues || []).entries()) {
        for (const [lineIndex, line] of dialogue.entries()) {
            if (!line?.[0] || !line?.[1]) {
                fail(`Lesson ${number}, dialogue ${dialogueIndex + 1}, line ${lineIndex + 1}: speaker or text is missing.`);
            }
            if (lineIndex > 0 && line[0] === dialogue[lineIndex - 1][0]) {
                fail(`Lesson ${number}, dialogue ${dialogueIndex + 1}: the same speaker has consecutive turns.`);
            }
        }
        remember('dialogue', dialogue.flat().join(' '), number);
    }

    const readingWords = String(bank.reading || '').trim().split(/\s+/).filter(Boolean).length;
    if (readingWords < 100) fail(`Lesson ${number}: reading has only ${readingWords} words.`);
    if (!Array.isArray(bank.readingQuestions) || bank.readingQuestions.length !== 4) {
        fail(`Lesson ${number}: reading must have exactly 4 questions.`);
    }
    for (const item of bank.readingQuestions || []) {
        if (!item.question || !item.answer) fail(`Lesson ${number}: reading question or answer is missing.`);
        if (/main situation|your own life/i.test(item.question || '')) {
            fail(`Lesson ${number}: reading contains a forbidden abstract/personal question.`);
        }
    }
    remember('reading', bank.reading, number);

    const grammarTable = api.getGrammarTable(data.title, bank);
    if (!grammarTable || !Array.isArray(grammarTable.rows) || grammarTable.rows.length < 4) {
        fail(`Lesson ${number}: specific grammar table is missing or too short.`);
    } else {
        remember('grammarTable', grammarTable.title, number);
    }

    const themes = bank.themes || bank.themeOptions;
    if (!Array.isArray(themes) || themes.length < 3) {
        fail(`Lesson ${number}: homework needs 3 theme options.`);
    }

    if (!Array.isArray(bank.musicLines) || bank.musicLines.length < 5) {
        fail(`Lesson ${number}: Music Moment needs at least 5 lyric blanks.`);
    }
    for (const [line, answer] of bank.musicLines || []) {
        if (!line || !answer || !line.includes(answer)) {
            fail(`Lesson ${number}: music line cannot hide its configured answer.`);
        }
    }
    const selection = api.getMusicSelection(data.title, bank);
    if (!selection?.song || !selection?.artist) fail(`Lesson ${number}: Spotify selection is missing.`);
    else if (!/^[A-Za-z0-9]{22}$/.test(selection.spotifyId || '')) {
        fail(`Lesson ${number}: Spotify selection needs a valid direct track ID.`);
    }
    else remember('song', `${selection.song} ${selection.artist}`, number);
}

for (const [group, values] of Object.entries(duplicateBanks)) {
    for (const lessons of values.values()) {
        if (lessons.size > 1) {
            fail(`${group}: duplicated content across lessons ${[...lessons].join(', ')}.`);
        }
    }
}

if (/\bdiego\b/i.test(contentSource)) {
    fail('Forbidden name found in lesson content.');
}

if (/data-a2-speak|Ouvir exemplo|fa-volume-high/i.test(contentSource)) {
    fail('Automated listening control found; examples must be read by the teacher.');
}

if (/open\.spotify\.com\/embed\/search/i.test(contentSource)) {
    fail('A2 V2 renderer still uses a generic Spotify search instead of direct tracks.');
}

if (!/data-music-reveal/.test(contentSource)) {
    fail('Music lyric gaps do not expose individual reveal controls.');
}

if (/window\.location\.href\s*=\s*['"]a2\.html['"]/i.test(contentSource)) {
    fail('Finish button still points to the nonexistent a2.html page.');
}

if (!/window\.location\.href\s*=\s*['"]a2-v2\.html['"]/i.test(contentSource)) {
    fail('Finish button does not have the a2-v2.html fallback.');
}

if (errors.length) {
    console.error(`A2 V2 audit failed with ${errors.length} issue(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
} else {
    console.log('A2 V2 audit passed: 32 lessons checked, including 4 review circuits.');
}
