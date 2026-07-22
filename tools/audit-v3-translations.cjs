const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const errors = [];

function read(relativePath) {
    return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function fail(message) {
    errors.push(message);
}

const translationContext = {
    window: {},
    document: { readyState: 'loading', addEventListener() {} },
    MutationObserver: class {},
    Element: class {}
};
vm.createContext(translationContext);
vm.runInContext(read('js/v3-pt-translations.js'), translationContext, { filename: 'v3-pt-translations.js' });
const translations = translationContext.window.V3Translations?.translations || {};

function verify(source, label) {
    const text = String(source || '').trim();
    const translation = translations[text];
    if (!text) fail(`${label}: empty English source.`);
    else if (!translation) fail(`${label}: missing Portuguese translation for "${text}".`);
    else if (translation.trim().toLowerCase() === text.toLowerCase() && !/^(?:[A-Z]-)+[A-Z]\.?$/.test(text)) fail(`${label}: translation repeats the English source.`);
}

const a1Context = { window: {} };
vm.createContext(a1Context);
vm.runInContext(read('a1-v3/a1-v3-data.js'), a1Context, { filename: 'a1-v3-data.js' });
const a1Lessons = a1Context.window.A1V3_DATA?.lessons || {};
const a1RendererSource = read('a1-v3/a1-v3-lesson-content.js');
let a1Cards = 0;
for (const [number, lesson] of Object.entries(a1Lessons)) {
    for (const item of lesson.vocab || []) {
        a1Cards += 1;
        verify(item[2], `A1 L${number} vocabulary`);
    }
    const usedExpressionExamples = new Set((lesson.expressionTranslations || []).map(([, en]) => String(en).trim().toLowerCase()));
    let extensionCount = 0;
    for (const item of lesson.expressions || []) {
        const example = String(item[3] || '');
        const key = example.trim().toLowerCase();
        if (!key || usedExpressionExamples.has(key)) continue;
        verify(example, `A1 L${number} expression extension`);
        usedExpressionExamples.add(key);
        extensionCount += 1;
        if ((lesson.expressionTranslations || []).length + extensionCount >= 6) break;
    }
    if ((lesson.expressionTranslations || []).length + extensionCount < 6 && !new RegExp(`\\n\\s*${number}: \\[`).test(a1RendererSource)) {
        fail(`A1 L${number}: fewer than six expression translation prompts.`);
    }
}
for (const number of [1, 2, 3, 5, 6, 7]) {
    for (const dialogue of a1Lessons[number]?.dialogues || []) {
        for (const [, line] of dialogue.lines || []) verify(line, `A1 L${number} scaffolded dialogue`);
    }
}
if (a1Cards !== 192) fail(`A1: expected 192 translated vocabulary examples, found ${a1Cards}.`);

let a2Source = read('a2-v3/a2-v3-lesson-content.js');
a2Source = a2Source.replace(/\}\(\)\);\s*$/, 'globalThis.__translationAudit = { getLessonData };\n}());');
const a2Document = { readyState: 'loading', title: '', addEventListener() {}, querySelector() { return null; } };
const a2Window = { location: { pathname: '' } };
const a2Context = { console, document: a2Document, window: a2Window };
vm.createContext(a2Context);
vm.runInContext(a2Source, a2Context, { filename: 'a2-v3-lesson-content.js' });
let a2Cards = 0;
for (let number = 1; number <= 32; number += 1) {
    if ([8, 16, 24, 32].includes(number)) continue;
    a2Window.location.pathname = `/a2-v3/licao-${String(number).padStart(2, '0')}.html`;
    const bank = a2Context.__translationAudit.getLessonData().bank;
    for (const item of bank.vocab || []) {
        a2Cards += 1;
        verify(item[2], `A2 L${number} vocabulary`);
    }
}
if (a2Cards !== 224) fail(`A2: expected 224 translated vocabulary examples, found ${a2Cards}.`);

global.window = {};
[
    'b1-v3-lessons-data.js',
    'b1-v3-lessons-block1a.js', 'b1-v3-lessons-block1b.js',
    'b1-v3-lessons-block2a.js', 'b1-v3-lessons-block2b.js',
    'b1-v3-lessons-block3a.js', 'b1-v3-lessons-block3b.js',
    'b1-v3-lessons-block4a.js', 'b1-v3-lessons-block4b.js'
].forEach(file => require(path.join(root, 'js', file)));
let b1Cards = 0;
for (const lesson of window.B1_V3_LESSONS || []) {
    if ([8, 16, 24, 32].includes(lesson.number)) continue;
    for (const slide of lesson.slides || []) {
        if (slide.type !== 'vocabulary') continue;
        for (const item of slide.items || []) {
            b1Cards += 1;
            verify(Array.isArray(item) ? item[3] : item.example, `B1 L${lesson.number} vocabulary`);
        }
    }
}
if (b1Cards !== 224) fail(`B1: expected 224 translated vocabulary examples, found ${b1Cards}.`);

if (errors.length) {
    console.error(`V3 translation audit failed with ${errors.length} issue(s):`);
    errors.forEach(error => console.error(`- ${error}`));
    process.exitCode = 1;
} else {
    console.log('V3 translation audit passed: 640 vocabulary examples plus early A1 dialogue support are complete in Portuguese.');
}
