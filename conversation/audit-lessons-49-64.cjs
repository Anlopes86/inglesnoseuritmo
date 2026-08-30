const fs = require('fs');
const path = require('path');

global.window = {};
require('./conversation-lessons-49-64-data.js');

const data = window.CONVERSATION_LESSONS_49_64;
const keys = Object.keys(data);
const normalize = (value) => value.toLowerCase().replace(/&amp;/g, '&').replace(/[^a-z0-9]+/g, ' ').trim();
const duplicates = (items) => [...new Set(items.filter((value, index) => items.indexOf(value) !== index))];
const newSongs = keys.flatMap((key) => data[key].songs.map((song) => normalize(song.title)));
const newQuestions = keys.flatMap((key) => [
    ...data[key].warmups,
    ...data[key].songs.flatMap((song) => song.questions),
    ...data[key].contexts.map((context) => context.prompt),
    ...data[key].speaking.prompts
]).map(normalize);
const primaryConversationPrompts = keys.flatMap((key) => {
    const lesson = data[key];
    return [
        ...lesson.warmups,
        ...lesson.songs.flatMap((song) => song.questions),
        ...lesson.speaking.prompts
    ].map((prompt) => ({ lesson: key, prompt }));
});
const imperativeStart = /^(invent|create|design|write|give|choose|pitch|debate|rank|tell|describe|role-play|help|defend|argue|explain|lead|change|present|plan|pick|sell|continue|teach|interview|diagnose|rescue|build)\b/i;
const nonQuestionConversationPrompts = primaryConversationPrompts
    .filter(({ prompt }) => !prompt.trim().endsWith('?'))
    .map(({ lesson, prompt }) => `${lesson}: ${prompt}`);
const imperativeConversationPrompts = primaryConversationPrompts
    .filter(({ prompt }) => imperativeStart.test(prompt.trim()))
    .map(({ lesson, prompt }) => `${lesson}: ${prompt}`);
const contexts = keys.flatMap((key) => data[key].contexts.map((context) => ({ lesson: key, ...context })));
const overlongContextInstructions = contexts
    .filter((context) => context.intro.trim().split(/\s+/).length > 32)
    .map((context) => `${context.lesson}: ${context.title}`);
const malformedConversationActivities = contexts
    .filter((context) => !context.prompt.trim().endsWith('?') || context.cards.length !== 4)
    .map((context) => `${context.lesson}: ${context.title}`);

const existingSongs = [];
for (let lesson = 1; lesson <= 48; lesson += 1) {
    const file = path.join(__dirname, `licao-${String(lesson).padStart(2, '0')}.html`);
    const html = fs.readFileSync(file, 'utf8');
    for (const match of html.matchAll(/Song\s*[123]:\s*([^<\r\n]+)/gi)) {
        const title = match[1].split(/\s+-\s+|\s+<span/i)[0];
        existingSongs.push(normalize(title));
    }
}

const invalid = keys.filter((key) => {
    const lesson = data[key];
    return lesson.expressions.length !== 6
        || lesson.songs.length !== 3
        || lesson.songs.some((song) => song.questions.length !== 4 || song.listening.length !== 3)
        || lesson.contexts.length !== 2
        || lesson.contexts.some((context) => context.cards.length !== 4 || !context.prompt.trim().endsWith('?'))
        || lesson.practice.length !== 6
        || lesson.speaking.prompts.length !== 4
        || lesson.homework.length !== 3;
});

const repeatedFromEarlierLessons = [...new Set(newSongs.filter((song) => existingSongs.includes(song)))];
const missingPages = keys.filter((key) => !fs.existsSync(path.join(__dirname, `licao-${key}.html`)));

console.log(JSON.stringify({
    lessons: keys.length,
    songs: newSongs.length,
    discussionPrompts: newQuestions.length,
    invalid,
    missingPages,
    duplicateNewSongs: duplicates(newSongs),
    duplicateNewQuestions: duplicates(newQuestions),
    repeatedFromEarlierLessons,
    overlongContextInstructions,
    malformedConversationActivities,
    nonQuestionConversationPrompts,
    imperativeConversationPrompts
}, null, 2));

if (invalid.length || missingPages.length || duplicates(newSongs).length || duplicates(newQuestions).length || repeatedFromEarlierLessons.length || overlongContextInstructions.length || malformedConversationActivities.length || nonQuestionConversationPrompts.length || imperativeConversationPrompts.length) {
    process.exitCode = 1;
}
