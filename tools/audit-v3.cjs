const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const errors = [];

function fail(message) {
    errors.push(message);
}

function read(relativePath) {
    return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function lessonFiles(moduleId) {
    return fs.readdirSync(path.join(root, moduleId))
        .filter(name => /^licao-\d{2}\.html$/.test(name))
        .sort();
}

const modules = [
    { id: 'a1-v3', hub: 'a1-v3.html', localData: 'a1-v3-data.js', localRenderer: 'a1-v3-lesson-content.js' },
    { id: 'a2-v3', hub: 'a2-v3.html', localRenderer: 'a2-v3-lesson-content.js' },
    { id: 'b1-v3', hub: 'b1-v3.html', rootRenderer: 'js/b1-v3-lesson-player.js' }
];

for (const module of modules) {
    const files = lessonFiles(module.id);
    if (files.length !== 32) fail(`${module.id}: expected 32 lesson pages, found ${files.length}.`);
    if (!fs.existsSync(path.join(root, module.id, module.hub))) fail(`${module.id}: module hub is missing.`);

    for (const [index, filename] of files.entries()) {
        const source = read(`${module.id}/${filename}`);
        const number = index + 1;
        if (!source.includes('../css/v3-session.css')) fail(`${module.id} L${number}: V3 session CSS is missing.`);
        if (!source.includes('../js/v3-session-plan.js')) fail(`${module.id} L${number}: 60-minute session plan is missing.`);
        if (/a1-v2|a2-v2|b1-v2|B1_V2|A1V2/.test(source)) fail(`${module.id} L${number}: V2 reference leaked into V3.`);
        if (!source.includes(`${module.id.split('-')[0]}-v3`)) fail(`${module.id} L${number}: V3 identity is missing.`);
    }
}

const sessionSource = read('js/v3-session-plan.js');
const context = {
    window: {},
    location: { pathname: '/' },
    document: { readyState: 'loading', addEventListener() {}, body: { dataset: {} } },
    MutationObserver: class { observe() {} disconnect() {} }
};
vm.createContext(context);
vm.runInContext(sessionSource, context, { filename: 'v3-session-plan.js' });
const plan = context.window.V3SessionPlan;

if (!plan || plan.TOTAL_MINUTES !== 60) fail('V3 session plan must expose a 60-minute total.');
if (Object.keys(plan?.missions?.['a1-v3'] || {}).length !== 24) fail('A1-V3 must have one curated live mission for each regular lesson.');
if (Object.keys(plan?.missions?.['a2-v3'] || {}).length !== 28) fail('A2-V3 must have one curated live mission for each regular lesson.');
if (!/v3-speaking-structure/.test(sessionSource) || !/Primeira tentativa/.test(sessionSource) || !/Segunda tentativa/.test(sessionSource)) {
    fail('A1/A2 live missions do not use the B1-inspired three-round speaking structure.');
}
if (!/Foco do professor/.test(sessionSource) || !/correção prioritária/.test(sessionSource)) {
    fail('A1/A2 live missions lack an explicit teacher focus and prioritized feedback.');
}

for (let count = 9; count <= 14; count += 1) {
    const mockSlides = Array.from({ length: count }, (_, index) => ({
        dataset: { title: ['opening', 'vocabulary', 'grammar', 'practice', 'translation', 'dialogues', 'reading', 'listening', 'speaking', 'music', 'homework'][index % 11] },
        querySelector() { return null; }
    }));
    const minutes = plan.allocateMinutes(mockSlides);
    if (minutes.reduce((sum, value) => sum + value, 0) !== 60) fail(`Minute allocation failed for ${count} slides.`);
    if (minutes.some(value => value < 2)) fail(`Minute allocation produced an unusable phase for ${count} slides.`);
}

const a1Renderer = read('a1-v3/a1-v3-lesson-content.js');
if (!/renderActivityItems\(lesson\.practice,/.test(a1Renderer)) fail('A1-V3 does not render the complete ten-item practice bank.');
if (!/renderTranslationItems\(lesson\.translations,/.test(a1Renderer)) fail('A1-V3 does not render all six primary translation prompts.');
if (!/scaffoldedDialogueStage/.test(a1Renderer) || !/lesson\.dialogues\.slice\(0, 4\)/.test(a1Renderer)) fail('A1-V3 early lessons do not provide four scaffolded dialogues.');
if (!/data-v3-speak/.test(a1Renderer) || !/data-v3-translate/.test(a1Renderer)) fail('A1-V3 lacks per-line speech or Portuguese dialogue support.');
if (/station\.items\.slice\(0, 3\)/.test(a1Renderer)) fail('A1-V3 review stations still hide activities from the teacher.');
if (!/renderReviewGrammarTable/.test(a1Renderer) || !/renderReviewGrammarCards/.test(a1Renderer)) fail('A1-V3 reviews need summary tables plus expanded grammar explanations.');
if (!/a1MemoryPairs/.test(a1Renderer) || !/What's your name\?/.test(a1Renderer)) fail('A1-V3 memory games need communicative question/answer, translation, or sentence-half pairs.');
if (/CEFR Progress Check|renderCanDoAssessment|Can-Do Check/.test(a1Renderer)) fail('A1-V3 still contains the removed Can-Do assessment.');
if (/slide\('Music Review'/.test(a1Renderer)) fail('A1-V3 reviews still use a music stage instead of performance assessment.');
if (!/Letra com lacunas/.test(a1Renderer) || (a1Renderer.match(/class="v3-lyric-line"/g) || []).length < 12 || (a1Renderer.match(/class="v3-lyric-gap"/g) || []).length < 6) fail('A1-V3 music placeholder is not a complete flowing lyric with six integrated gaps.');
if (/Cole aqui a linha|Verse 1|linha \$\{/.test(a1Renderer)) fail('A1-V3 music placeholder still uses editorial line labels.');

const a1DataSource = read('a1-v3/a1-v3-data.js');
if (!/song: 'Hello, Goodbye', artist: 'The Beatles', spotifyId: '0vZ97gHhemKm6c64hTfJNA'/.test(a1DataSource)) {
    fail('A1-V3 lesson 1 does not use Hello, Goodbye by The Beatles.');
}

const a2Renderer = read('a2-v3/a2-v3-lesson-content.js');
if (!/return bank\.practice;/.test(a2Renderer)) fail('A2-V3 does not render the complete ten-item practice bank.');
if (!/bank\.translations \|\| \[\]\)\.slice\(0, 6\)/.test(a2Renderer)) fail('A2-V3 does not render six primary translation prompts.');
if (!/expressionTranslationItems/.test(a2Renderer)) fail('A2-V3 does not guarantee six expression translation prompts.');
if (/const musicLyricsByLesson/.test(a2Renderer)) fail('A2-V3 still distributes a copyrighted lyric block.');
if (!/Letra com lacunas/.test(a2Renderer) || (a2Renderer.match(/class="v3-lyric-line"/g) || []).length < 12 || (a2Renderer.match(/class="v3-lyric-gap"/g) || []).length < 6) fail('A2-V3 music placeholder is not a complete flowing lyric with six integrated gaps.');
if (/Cole aqui a linha|Verse 1|linha \$\{/.test(a2Renderer)) fail('A2-V3 music placeholder still uses editorial line labels.');

if (!/renderA2GrammarTable/.test(a2Renderer) || !/renderA2GrammarCards/.test(a2Renderer)) fail('A2-V3 reviews need summary tables plus expanded grammar explanations.');
if (!/a2MemoryPairs/.test(a2Renderer) || !/Have you ever traveled alone\?/.test(a2Renderer)) fail('A2-V3 memory games need contextual language pairs.');
if (/Station 9: Can-Do Assessment|assessmentCriteria|v3-can-do-assessment/.test(a2Renderer)) fail('A2-V3 still contains the removed Can-Do assessment.');
if (/Rapid Recap Loop/.test(a2Renderer)) fail('A2-V3 reviews still contain the superseded rapid recap stage.');

const pronunciationSource = read('js/flashcard-pronunciation.js');
const saveSource = read('js/lesson-flashcard-save.js');
if (!/b1-vocab-front/.test(pronunciationSource) || !/data-pronounce-text/.test(pronunciationSource)) fail('Pronunciation controls do not cover vocabulary and expression cards across V3.');
if (!/data-save-card/.test(saveSource) || !/b1-vocab-card/.test(saveSource)) fail('Student-profile saving does not cover vocabulary and expression cards across V3.');
if (!/ensureHelperScript\('v3-pt-translations\.js'\)/.test(sessionSource)) fail('Contextual Portuguese translations are not loaded by every V3 lesson.');

const b1Renderer = read('js/b1-v3-lesson-player.js');
if (!/const items = Array\.isArray\(slide\.items\) \? slide\.items : \[\];/.test(b1Renderer)) fail('B1-V3 still truncates practice or translation banks.');
if (!/Protocolo de aplicação/.test(b1Renderer)) fail('B1-V3 teacher-read listening lacks an application protocol.');
if (!/Letra com lacunas/.test(b1Renderer) || (b1Renderer.match(/class="v3-lyric-line"/g) || []).length < 12 || (b1Renderer.match(/class="v3-lyric-gap"/g) || []).length < 6) fail('B1-V3 music placeholder is not a complete flowing lyric with six integrated gaps.');
if (/Cole aqui a linha|Verse 1|linha \$\{/.test(b1Renderer)) fail('B1-V3 music placeholder still uses editorial line labels.');
if (!/b1MemoryPairs/.test(b1Renderer) || !/Have you ever been to Hillford\?/.test(b1Renderer)) fail('B1-V3 memory games need communicative and discourse-completion pairs.');

global.window = {};
[
    'b1-v3-lessons-data.js',
    'b1-v3-lessons-block1a.js', 'b1-v3-lessons-block1b.js',
    'b1-v3-lessons-block2a.js', 'b1-v3-lessons-block2b.js',
    'b1-v3-lessons-block3a.js', 'b1-v3-lessons-block3b.js',
    'b1-v3-lessons-block4a.js', 'b1-v3-lessons-block4b.js'
].forEach(file => require(path.join(root, 'js', file)));

const b1Lessons = window.B1_V3_LESSONS || [];
const reviewSet = new Set([8, 16, 24, 32]);
for (const lesson of b1Lessons) {
    const types = lesson.slides.map(slide => slide.type);
    if (reviewSet.has(lesson.number)) {
        if (types.includes('vocabulary') || types.includes('languageBank') || types.includes('music')) {
            fail(`B1-V3 L${lesson.number}: review introduces a regular vocabulary/music stage.`);
        }
        if (types.includes('assessment')) fail(`B1-V3 L${lesson.number}: review still contains the removed assessment.`);
    } else if (!types.includes('speaking')) {
        fail(`B1-V3 L${lesson.number}: regular lesson lacks a live speaking task.`);
    }
}

const home = [read('home-aluno.html'), read('js/student-portal-dashboard.js'), read('js/app.js')].join('\n');
for (const module of modules) {
    if (!home.includes(`'${module.id}'`)) fail(`${module.id}: portal route is missing.`);
}

if (errors.length) {
    console.error(`V3 product audit failed with ${errors.length} issue(s):`);
    errors.forEach(error => console.error(`- ${error}`));
    process.exitCode = 1;
} else {
    console.log('V3 product audit passed: 96 lessons, fixed 60-minute allocation, curated A1/A2 missions, review rules and portal routes checked.');
}
