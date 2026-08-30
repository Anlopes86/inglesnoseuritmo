const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const failures = [];
const warnings = [];
const check = (condition, message) => {
    if (!condition) failures.push(message);
};
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const normalize = value => String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9']+/gi, ' ')
    .trim()
    .toLowerCase();

const documentStub = {
    readyState: 'loading',
    title: '',
    addEventListener() {},
    querySelector() { return null; },
    querySelectorAll() { return []; },
    getElementById() { return null; }
};
const context = {
    window: {},
    document: documentStub,
    console,
    URL,
    URLSearchParams,
    AbortController,
    DOMException,
    setTimeout,
    clearTimeout
};
Object.assign(context.window, {
    window: context.window,
    document: documentStub,
    location: { pathname: '/a2-v3/licao-31.html' },
    setTimeout,
    clearTimeout
});
vm.createContext(context);
function run(file) {
    vm.runInContext(read(file), context, { filename: file });
}

[
    'js/v3-curriculum.js',
    'a2-v3/a2-v3-template.js',
    'a2-v3/a2-v3-conversation-template.js',
    'js/music-catalog-v3.js',
    'a2-v3/a2-v3-lesson-content.js',
    'js/a2-v3-module.js'
].forEach(run);

const curriculum = context.window.V3Curriculum;
const entries = curriculum.getModule('a2-v3');
const lexical = entries.filter(entry => entry.lessonKind === 'lexical');
const communicative = entries.filter(entry => entry.lessonKind === 'communicative');
const consolidations = entries.filter(entry => entry.lessonKind === 'consolidation');
const premiumLessons = context.window.A2V3PremiumCurriculum.lessons;
const conversationLessons = context.window.A2V3ConversationCurriculum.lessons;
const catalog = context.window.MusicCatalogV3;

check(entries.length === 32, `A2-V3: esperado 32 aulas; encontradas ${entries.length}.`);
check(lexical.length === 15, `A2-V3: esperado 15 aulas lexicais; encontradas ${lexical.length}.`);
check(communicative.length === 15, `A2-V3: esperado 15 aulas comunicativas; encontradas ${communicative.length}.`);
check(consolidations.length === 2, `A2-V3: esperado 2 consolidações; encontradas ${consolidations.length}.`);

entries.forEach(entry => {
    const padded = String(entry.number).padStart(2, '0');
    const file = `a2-v3/licao-${padded}.html`;
    check(fs.existsSync(path.join(root, file)), `${file}: página ausente.`);
    if (fs.existsSync(path.join(root, file))) {
        const source = read(file);
        check(source.includes("a2-v3-lesson-content.js"), `${file}: player A2 atual não está carregado.`);
    }
});

lexical.forEach(entry => {
    const lesson = premiumLessons[entry.number];
    check(Boolean(lesson), `A2 L${entry.number}: dados lexicais atuais ausentes.`);
    check(normalize(lesson?.title) === normalize(entry.title), `A2 L${entry.number}: título lexical diverge do manifesto (“${lesson?.title}” × “${entry.title}”).`);

    const route = lesson?.lessonRoute;
    check(route?.durationMinutes === 60, `A2 L${entry.number}: rota de 60 minutos ausente.`);
    check(Boolean(route?.core && route?.extended && route?.extra), `A2 L${entry.number}: rota Core/Extended/Extra incompleta.`);
    check(route?.core?.music === 'all' && route?.core?.homework === 'all', `A2 L${entry.number}: Music e Homework devem permanecer no Core.`);
    check((route?.core?.vocabulary || []).length === (entry.number === 1 ? 10 : 8), `A2 L${entry.number}: quantidade Core de vocabulário incorreta.`);
    if (entry.number === 1) {
        check(route.core.expressions.length === 6, 'A2 L1: exatamente seis expressões devem ser Core.');
        check(route.extended.miniDialogues.includes(3), 'A2 L1: o terceiro diálogo deve ser Extended.');
        check(route.extended.vocabulary.length + route.extra.vocabulary.length === lesson.vocab.length - route.core.vocabulary.length, 'A2 L1: vocabulário fora do Core não foi classificado.');
    }

    const homework = lesson?.homework || [];
    check(homework.length === 3, `A2 L${entry.number}: esperado exatamente 3 opções de homework; encontradas ${homework.length}.`);
    check(lesson?.homeworkPrompt === 'Choose one option.', `A2 L${entry.number}: instrução “Choose one option.” ausente.`);
    check(homework.every(option => option.title && option.instruction), `A2 L${entry.number}: opção de homework sem título ou instrução.`);
    check(homework.some(option => option.kind === 'speaking'), `A2 L${entry.number}: homework sem opção de speaking.`);
    check(homework.every(option => option.source === 'authored' && option.usesFallback === false), `A2 L${entry.number}: homework publicado ainda usa fallback.`);
    check(homework.every(option => option.curriculumId === entry.id && curriculum.hasSemanticIntersection(entry, option.semanticTags)), `A2 L${entry.number}: homework não está ligado semanticamente ao manifesto.`);

    const music = catalog.getForCurriculumId(entry.id);
    check(Boolean(music), `A2 L${entry.number}: música lexical publicada ausente.`);
    check(music?.gaps?.length === 5, `A2 L${entry.number}: música deve ter cinco lacunas.`);
    check(music?.pedagogy?.transferPrompts?.length === 3, `A2 L${entry.number}: música deve ter três perguntas pós-música.`);
});

communicative.forEach(entry => {
    const lesson = conversationLessons[entry.number];
    const source = curriculum.getLesson('a2-v3', entry.sourceLesson);
    check(Boolean(lesson), `A2 L${entry.number}: dados comunicativos ausentes.`);
    check(Boolean(source) && source.lessonKind === 'lexical', `A2 L${entry.number}: sourceLesson não aponta para aula lexical.`);
    check(entry.sourceLesson === entry.number - 1, `A2 L${entry.number}: par lexical → comunicativa quebrado.`);
    check(normalize(entry.title).endsWith(normalize(lesson?.title)), `A2 L${entry.number}: título comunicativo não corresponde ao manifesto.`);
    check(catalog.getForCurriculumId(entry.id) === null, `A2 L${entry.number}: música indevida em aula comunicativa.`);
});

const consolidationSnapshot = context.window.A2V3Consolidations.auditSnapshot();
check(consolidationSnapshot.length === 2, 'A2: as duas consolidações precisam de dados explícitos atuais.');
consolidationSnapshot.forEach(record => {
    const entry = curriculum.getLesson('a2-v3', record.number);
    const reviewed = (entry?.reviewOf || []).map(id => curriculum.getLesson('a2-v3', id)).filter(Boolean);
    const reviewedTags = new Set(reviewed.flatMap(lesson => lesson.languageTags));
    const listeningTags = record.reviewListening?.semanticTags || [];
    check(record.source === 'current-v3-consolidation', `A2 L${record.number}: fonte de consolidação atual não declarada.`);
    check(record.reviewListening?.script && record.reviewListening?.questions?.length === 4, `A2 L${record.number}: listening explícito deve ter texto e quatro perguntas.`);
    check(record.reviewSpeaking?.length >= 3, `A2 L${record.number}: atividade oral posterior insuficiente.`);
    check(listeningTags.length >= 3 && listeningTags.every(tag => reviewedTags.has(tag)), `A2 L${record.number}: temas do listening não correspondem integralmente a reviewOf.`);
    check(catalog.getForCurriculumId(entry.id) === null, `A2 L${record.number}: consolidação recebeu música.`);
});

const lessonSource = read('a2-v3/a2-v3-lesson-content.js');
const consolidationBranch = lessonSource.indexOf("curriculumEntry?.lessonKind === 'consolidation'");
const consolidationBranchEnd = lessonSource.indexOf('const sourceNumber', consolidationBranch);
const consolidationBranchSource = lessonSource.slice(consolidationBranch, consolidationBranchEnd);
const legacyProfileRead = lessonSource.indexOf('const profile = standaloneBank');
check(consolidationBranch >= 0 && legacyProfileRead > consolidationBranch, 'A2: consolidações podem voltar a consumir lessonProfiles antes do desvio atual.');
check(consolidationBranchEnd > consolidationBranch && !/lessonProfiles|\bprofile\b/.test(consolidationBranchSource), 'A2: o desvio das consolidações voltou a consultar um perfil legado.');
check(!/31:\s*32|32:\s*32/.test(lessonSource.slice(lessonSource.indexOf('const legacySourceByLesson'), lessonSource.indexOf('function getLessonData'))), 'A2: consolidações ainda estão mapeadas para perfis legados.');
check(/const title = curriculumEntry\?\.title \|\|/.test(lessonSource), 'A2: título do manifesto não é a fonte prioritária do player.');
check(/const manifestTitle = data\.title \|\| lesson\.title/.test(lessonSource), 'A2: título comunicativo renderizado não usa o manifesto.');
check(!/had received difficult news|Renato had never needed stitches|Had he needed stitches before\?|No, he had not/.test(read('a2-v3/a2-v3-template.js')), 'A2: Past Perfect indevido ainda aparece nas aulas 13 ou 15.');

const modulePage = read('a2-v3/a2-v3.html');
check(modulePage.includes('Past Simple, Present Perfect, used to, comparativos, should, would like e futuros com going to e will.'), 'Página A2: descrição curricular atual ausente.');
check(!/além de condicionais para situações reais/i.test(modulePage), 'Página A2: promessa indevida de condicionais ainda aparece.');

const moduleSource = read('js/a2-v3-module.js');
check(!/const\s+lessonTitles\s*=|const\s+unitLabels\s*=|function\s+getLessonMaterials/.test(moduleSource), 'Cards A2: mapa editorial antigo por número ainda está ativo.');
const expectedCards = {
    lexical: ['Vocabulary', 'Grammar', 'Reading', 'Music'],
    communicative: ['Listening', 'Real-world Input', 'Role-play', 'Speaking'],
    consolidation: ['Review', 'Listening', 'Speaking Challenge']
};
entries.forEach(entry => {
    const card = context.window.A2V3ModuleCards.getCardModel(entry);
    check(card.title === entry.title, `Card A2 L${entry.number}: título não deriva do manifesto.`);
    check(JSON.stringify(Array.from(card.materials, material => material.label)) === JSON.stringify(expectedCards[entry.lessonKind]), `Card A2 L${entry.number}: materiais não derivam de lessonKind.`);
});

if (consolidationSnapshot.find(record => record.number === 31)?.reviewSpeaking?.length !== 3) {
    warnings.push('A2 L31: a atividade oral posterior deveria permanecer enxuta, com três propostas.');
}

if (failures.length) {
    console.error(`A2-V3 final-polish audit failed with ${failures.length} issue(s):`);
    failures.forEach(message => console.error(`- ${message}`));
    process.exit(1);
}

console.log('A2-V3 final-polish audit passed: 32 pages, 15 lexical routes/homeworks/music sets, 15 communicative pairs, manifest titles/cards and two current consolidations checked.');
if (warnings.length) {
    console.warn(`A2-V3 final-polish warnings (${warnings.length}):`);
    warnings.forEach(message => console.warn(`- ${message}`));
}
