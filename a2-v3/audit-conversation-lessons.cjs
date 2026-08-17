const fs = require('fs');
const path = require('path');

global.window = {};
require('./a2-v3-template.js');
require('./a2-v3-conversation-template.js');

const premium = window.A2V3PremiumCurriculum?.lessons || {};
const conversations = window.A2V3ConversationCurriculum?.lessons || {};
const expectedLessons = Array.from({ length: 15 }, (_, index) => (index + 1) * 2);
const failures = [];

function requireCount(items, minimum, label) {
    if (!Array.isArray(items) || items.length < minimum) failures.push(`${label}: expected at least ${minimum}, received ${items?.length || 0}.`);
}

for (const number of expectedLessons) {
    const lesson = conversations[number];
    const sourceNumber = number - 1;
    const source = premium[sourceNumber];
    const label = `Lesson ${String(number).padStart(2, '0')}`;
    if (!lesson) {
        failures.push(`${label}: missing conversation curriculum.`);
        continue;
    }
    if (lesson.sourceLesson !== sourceNumber) failures.push(`${label}: source lesson should be ${sourceNumber}, received ${lesson.sourceLesson}.`);
    if (!source) failures.push(`${label}: lexical source lesson ${sourceNumber} does not exist.`);
    if (!lesson.title || !lesson.mission || !lesson.outcome) failures.push(`${label}: title, mission, or outcome is empty.`);
    requireCount(lesson.quickStart, 4, `${label} quick start`);
    requireCount(lesson.model?.lines, 8, `${label} model dialogue`);
    requireCount(lesson.model?.questions, 4, `${label} listening questions`);
    requireCount(lesson.realWorld?.documents, 2, `${label} real-world documents`);
    requireCount(lesson.realWorld?.questions, 4, `${label} reading questions`);
    requireCount(lesson.frames, 4, `${label} language frames`);
    requireCount(lesson.recycle, 6, `${label} recycled language`);
    requireCount(lesson.rolePlay?.roles, 2, `${label} role cards`);
    requireCount(lesson.guided?.questions, 6, `${label} guided questions`);
    requireCount(lesson.guided?.followUps, 4, `${label} follow-ups`);
    requireCount(lesson.guided?.support, 4, `${label} support chunks`);
    requireCount(lesson.challenge?.steps, 4, `${label} challenge steps`);
    requireCount(lesson.challenge?.mustUse, 4, `${label} success criteria`);
    requireCount(lesson.homework, 3, `${label} homework tasks`);

    const lexicalTerms = new Set([...(source?.vocab || []), ...(source?.expressions || [])].map(item => item[0]));
    for (const term of lesson.recycle || []) {
        if (!lexicalTerms.has(term)) failures.push(`${label}: recycled term "${term}" is not in lexical lesson ${sourceNumber}.`);
    }

    const html = fs.readFileSync(path.join(__dirname, `licao-${String(number).padStart(2, '0')}.html`), 'utf8');
    if (!html.includes("<script src='a2-v3-conversation-template.js'></script>")) failures.push(`${label}: conversation template is not loaded by the HTML page.`);
}

const configuredNumbers = Object.keys(conversations).map(Number).sort((a, b) => a - b);
if (JSON.stringify(configuredNumbers) !== JSON.stringify(expectedLessons)) failures.push(`Conversation lesson set differs from the expected even lessons: ${configuredNumbers.join(', ')}.`);

const titles = expectedLessons.map(number => conversations[number]?.title);
if (new Set(titles).size !== titles.length) failures.push('Conversation lesson titles are not unique.');
const challenges = expectedLessons.map(number => conversations[number]?.challenge?.title);
if (new Set(challenges).size !== challenges.length) failures.push('Final communicative challenges are not unique.');

if (failures.length) {
    console.error(`A2-V3 conversation audit failed with ${failures.length} issue(s):`);
    failures.forEach(item => console.error(`- ${item}`));
    process.exitCode = 1;
} else {
    console.log('A2-V3 conversation audit passed: 15 paired lessons, lexical recycling, authentic input, role cards, guided talk and final challenges.');
}

