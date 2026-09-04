const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const storageData = new Map();
const context = {
    window: {
        setTimeout,
        clearTimeout,
        sessionStorage: {
            getItem: (key) => storageData.get(key) || null,
            setItem: (key, value) => storageData.set(key, value)
        }
    },
    AbortController,
    DOMException,
    URLSearchParams,
    console
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'js', 'lyrics-service-v3.js'), 'utf8'), context);

const service = context.window.LyricsServiceV3;
if (!service) throw new Error('LyricsServiceV3 was not installed.');

const fixture = [
    'Morning opens every window',
    'People carry quiet questions',
    'Music turns the street to silver',
    'Someone finds a hidden answer',
    'Evening sends the dream back home'
].join('\n');
const gaps = [
    { id: 'gap-1', answer: 'Morning', occurrence: 1, acceptedAnswers: ['morning'] },
    { id: 'gap-2', answer: 'questions', occurrence: 1, acceptedAnswers: ['question', 'questions'] },
    { id: 'gap-3', answer: 'Music', occurrence: 1, acceptedAnswers: ['music'] },
    { id: 'gap-4', answer: 'hidden', occurrence: 1, acceptedAnswers: ['hidden'] },
    { id: 'gap-5', answer: 'dream', occurrence: 1, acceptedAnswers: ['dream'] }
];

const model = service.buildFiveGapModel(fixture, gaps);
if (model.gaps.length !== 5) throw new Error('The model did not create exactly five gaps.');
if (model.lines.flatMap((line) => line.segments).filter((segment) => segment.type === 'gap').length !== 5) {
    throw new Error('The rendered model does not contain exactly five gap positions.');
}

const exact = service.gradeResponses(model.gaps, [
    { value: 'morning' },
    { value: 'question' },
    { value: 'MUSIC' },
    { value: 'hidden' },
    { value: 'dream' }
]);
if (!exact.every((item) => item.status === 'correct')) throw new Error('Normalization or accepted answers failed.');

const almost = service.gradeResponses(model.gaps, [
    { value: 'morningg' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' }
]);
if (almost[0].status !== 'almost') throw new Error('Near-answer feedback failed.');

const uiSource = fs.readFileSync(path.join(__dirname, 'conversation-music-cloze.js'), 'utf8');
if (!uiSource.includes('data-conversation-music-reveal')) throw new Error('Individual reveal controls are missing.');
if (!uiSource.includes("this.revealed.has(index)")) throw new Error('Reveal toggling is missing.');
if (!uiSource.includes("new Set(['provider-verified', 'draft-until-provider-match'])") || !uiSource.includes('runtimeMusicStatuses.has(this.entry.status)')) throw new Error('Authorized draft entries are not accepted by the runtime cloze.');
if (uiSource.includes('Loading the verified lyrics')) throw new Error('Draft runtime must not be presented as provider-verified.');
if (uiSource.includes('data-answer=')) throw new Error('Answers must not be exposed as data attributes.');

console.log('conversation-music-cloze.test.cjs passed: five gaps, layout masking, accepted answers, near matches, draft runtime and individual reveal controls.');
