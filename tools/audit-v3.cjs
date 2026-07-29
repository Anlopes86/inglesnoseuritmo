const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');

global.window = {};
require(path.join(root, 'js', 'v3-curriculum.js'));
const curriculum = window.V3Curriculum;

const reviewCycles = { 'a1-v3': 5, 'a2-v3': 4, 'b1-v3': 3, 'b2-v3': 2, 'c1-v3': 2 };
const expectedReviews = Object.fromEntries(Object.entries(reviewCycles).map(([moduleId, cycle]) => [
    moduleId,
    Array.from({ length: Math.floor(32 / cycle) }, (_, index) => (index + 1) * cycle)
        .filter(number => moduleId !== 'a1-v3' || number <= 30)
        .filter(number => moduleId !== 'b1-v3' || number <= 30)
]));
const expectedProjects = {
    'a1-v3': [31, 32],
    'a2-v3': [32],
    'b1-v3': [31, 32],
    'b2-v3': [31, 32],
    'c1-v3': [31, 32]
};
const modules = Object.keys(expectedReviews);
const cefrSkills = ['reception', 'production', 'interaction', 'mediation', 'linguistic', 'online'];

for (const moduleId of modules) {
    const lessons = curriculum.getModule(moduleId);
    check(lessons.length === 32, `${moduleId}: o manifesto deve ter exatamente 32 lições.`);
    check(new Set(lessons.map(lesson => lesson.id)).size === 32, `${moduleId}: IDs curriculares duplicados.`);
    check(lessons.every((lesson, index) => lesson.number === index + 1), `${moduleId}: numeração instável.`);
    const expectedVersion = curriculum.moduleVersions?.[moduleId] || curriculum.version;
    check(lessons.every(lesson => lesson.version === expectedVersion), `${moduleId}: versão curricular inconsistente.`);
    check(lessons.every(lesson => lesson.cefrObjectives.length === 6), `${moduleId}: uma lição não cobre as seis dimensões CEFR.`);
    const covered = new Set(lessons.flatMap(lesson => lesson.cefrObjectives.map(item => item.skill)));
    check(cefrSkills.every(skill => covered.has(skill)), `${moduleId}: cobertura CEFR incompleta.`);

    const actualReviewOrFinal = lessons
        .filter(lesson => lesson.type === 'review' || (lesson.type === 'project' && expectedReviews[moduleId].includes(lesson.number)))
        .map(lesson => lesson.number);
    check(JSON.stringify(actualReviewOrFinal) === JSON.stringify(expectedReviews[moduleId]), `${moduleId}: posições de revisão incorretas.`);
    check(JSON.stringify(lessons.filter(lesson => lesson.type === 'project').map(lesson => lesson.number)) === JSON.stringify(expectedProjects[moduleId]), `${moduleId}: posições de projeto incorretas.`);

    const files = fs.readdirSync(path.join(root, moduleId)).filter(name => /^licao-\d{2}\.html$/.test(name)).sort();
    check(files.length === 32, `${moduleId}: esperadas 32 páginas, encontradas ${files.length}.`);
    check(fs.existsSync(path.join(root, moduleId, `${moduleId}.html`)), `${moduleId}: hub ausente.`);
    for (const [index, file] of files.entries()) {
        check(file === `licao-${String(index + 1).padStart(2, '0')}.html`, `${moduleId}: URL ausente na sequência.`);
        const html = read(`${moduleId}/${file}`);
        check(html.includes('../js/v3-curriculum.js'), `${moduleId}/${file}: manifesto não carregado.`);
        check(html.includes('../js/progress-manager.js'), `${moduleId}/${file}: progresso compartilhado não carregado.`);
        if (['b2-v3', 'c1-v3'].includes(moduleId)) {
            check(html.includes('../js/advanced-v3-lessons-data.js'), `${moduleId}/${file}: dados avançados ausentes.`);
            check(html.includes('../js/advanced-v3-lesson-player.js'), `${moduleId}/${file}: player avançado ausente.`);
            check(html.includes('../css/advanced-v3.css'), `${moduleId}/${file}: tema avançado ausente.`);
        } else {
            check(html.includes('../js/v3-session-plan.js'), `${moduleId}/${file}: plano de 60 minutos ausente.`);
        }
    }
}

require(path.join(root, 'a1-v3', 'a1-v3-data.js'));
require(path.join(root, 'a1-v3', 'a1-v3-cadence-data.js'));
[
    'b1-v3-lessons-data.js',
    'b1-v3-lessons-block1a.js', 'b1-v3-lessons-block1b.js',
    'b1-v3-lessons-block2a.js', 'b1-v3-lessons-block2b.js',
    'b1-v3-lessons-block3a.js', 'b1-v3-lessons-block3b.js',
    'b1-v3-lessons-block4a.js', 'b1-v3-lessons-block4b.js'
].forEach(file => require(path.join(root, 'js', file)));
require(path.join(root, 'js', 'v3-curriculum-adapters.js'));

const a1Numbers = [...Object.keys(window.A1V3_DATA.lessons), ...Object.keys(window.A1V3_DATA.reviews)].map(Number).sort((a, b) => a - b);
check(a1Numbers.length === 32 && a1Numbers.every((number, index) => number === index + 1), 'A1-V3: adaptador não produziu 32 lições.');
check(JSON.stringify(Object.keys(window.A1V3_DATA.reviews).map(Number)) === JSON.stringify([5, 10, 15, 20, 25, 30, 31, 32]), 'A1-V3: missões/projetos não foram remapeados.');
check(curriculum.getLesson('a1-v3', 1).version === '2026.07.29-gradual-a1-32', 'A1-V3: versão curricular gradual não foi registrada.');
check(window.A1V3_DATA.cadenceVersion === '2026.07.29-gradual-a1', 'A1-V3: dados de cadência gradual não foram carregados.');
const a1ContentNumbers = Object.keys(window.A1V3_DATA.lessons).map(Number);
check(a1ContentNumbers.length === 24, `A1-V3: esperadas 24 aulas de conteúdo gradual, encontradas ${a1ContentNumbers.length}.`);
const a1ContentLessons = Object.values(window.A1V3_DATA.lessons);
let a1MultiExampleCards = 0;
a1ContentLessons.forEach(lesson => {
    check(lesson.vocab?.length >= 6, `A1-V3 L${lesson.number}: carga lexical insuficiente para o foco da aula.`);
    check(lesson.practice?.length >= 6, `A1-V3 L${lesson.number}: prática controlada insuficiente.`);
    check(lesson.translations?.length >= 5, `A1-V3 L${lesson.number}: recuperação oral insuficiente.`);
    check(lesson.expressions?.length >= 3, `A1-V3 L${lesson.number}: blocos de linguagem insuficientes.`);
    check(lesson.dialogues?.length >= 3, `A1-V3 L${lesson.number}: prática dialogada insuficiente.`);
    check(lesson.labs?.every(lab => lab.items?.length >= 3), `A1-V3 L${lesson.number}: Skill Lab insuficiente.`);
    check(lesson.labs?.every(lab => lab.items.every(item => item.length >= 4 && item[0] !== 'Lab')), `A1-V3 L${lesson.number}: uma atividade do Skill Lab perdeu sua instrução operacional.`);
    const practiceSignatures = new Set(lesson.practice.map(item => `${item[1]}|${item[3]}`));
    check(lesson.labs?.every(lab => lab.items.every(item => !practiceSignatures.has(`${item[1]}|${item[3]}`))), `A1-V3 L${lesson.number}: o Skill Lab repete atividades da prática controlada.`);
    a1MultiExampleCards += lesson.vocab.filter(item => Array.isArray(item[2]) && item[2].length >= 2).length;
    check(lesson.grammar?.rows?.length >= 2 && lesson.grammar.rows.length <= 4, `A1-V3 L${lesson.number}: a gramática deve ter de duas a quatro linhas focais.`);
    check(lesson.cadence?.newLanguage?.length >= 1 && lesson.cadence.newLanguage.length <= 3, `A1-V3 L${lesson.number}: excesso de estruturas novas na mesma aula.`);
    check(Array.isArray(lesson.cadence?.deferredLanguage), `A1-V3 L${lesson.number}: conteúdos adiados não foram documentados.`);
});
for (const [field, minimumVariations] of [['vocab', 4], ['practice', 6], ['translations', 5], ['expressions', 4], ['dialogues', 3]]) {
    const counts = new Set(a1ContentLessons.map(lesson => lesson[field].length));
    check(counts.size >= minimumVariations, `A1-V3: ${field} ainda está engessado; foram encontradas apenas ${counts.size} cargas diferentes.`);
}
check(a1MultiExampleCards >= 20, `A1-V3: apenas ${a1MultiExampleCards} itens lexicais complexos têm exemplos repetidos em contexto.`);
const a1RendererSource = read('a1-v3/a1-v3-lesson-content.js');
check(!/Prática variada:|Seis frases|Quatro diálogos|Área reservada|etapa editorial|Texto musical fictício|Nenhuma letra protegida|Dica:|Observe:|Apoio:/i.test(a1RendererSource), 'A1-V3: o player ainda exibe contagens rígidas, dicas que entregam respostas ou recados editoriais ao aluno.');
check(/Desembaralhe os elementos/.test(a1RendererSource) && /Encontre o erro/.test(a1RendererSource), 'A1-V3: instruções operacionais de desembaralhar e corrigir não estão explícitas.');
check(/Music Time/.test(a1RendererSource) && /Preencha as lacunas com a palavra que você ouvir/.test(a1RendererSource), 'A1-V3: instrução limpa do Music Time está ausente.');
const a1CoreEnglish = lesson => [
    ...(lesson.grammar?.rows || []).flatMap(row => [row[1], row[2]]),
    ...(lesson.practice || []).flatMap(item => [item[1], item[3]]),
    ...(lesson.intro || []).map(item => item[1])
].join(' ');
const a1LessonOneCore = a1CoreEnglish(window.A1V3_DATA.lessons[1]);
check(!/\b(?:he|she|it|we|they|do|does)\b/i.test(a1LessonOneCore), 'A1-V3 L1: sujeitos ou auxiliares posteriores foram antecipados.');
const a1LessonTwoCore = a1CoreEnglish(window.A1V3_DATA.lessons[2]);
check(!/\b(?:do|does|what|who|how)\b/i.test(a1LessonTwoCore), 'A1-V3 L2: múltiplas question words ou do/does foram antecipados.');
const a1ManifestText = curriculum.getModule('a1-v3').map(lesson => `${lesson.title} ${lesson.linguisticFocus}`).join(' ');
check(!/\bcomparativ|\bgoing to\b|\bdid questions?\b/i.test(a1ManifestText), 'A1-V3: conteúdo deliberadamente movido para o A2 ainda aparece na grade.');
Object.values(window.A1V3_DATA.reviews).forEach(review => {
    check(review.contract?.rounds?.length === 3, `A1-V3 ${review.number}: contrato de três rodadas ausente.`);
    check(review.oralInteractionMinutes >= 36, `A1-V3 ${review.number}: tempo oral abaixo de 36 minutos.`);
    check(review.stations.some(station => /Unexpected Condition/.test(station.title)), `A1-V3 ${review.number}: condição inesperada ausente.`);
    const communicationRounds = review.stations.filter(station => station.kind === 'communicative-round');
    check(communicationRounds.length === 3, `A1-V3 ${review.number}: três rodadas comunicativas próprias são obrigatórias.`);
    check(
        JSON.stringify(communicationRounds.map(station => station.phase)) === JSON.stringify(['attempt', 'twist', 'retry']),
        `A1-V3 ${review.number}: sequência tentativa, imprevisto e segunda tentativa inválida.`
    );
    const roundSignatures = communicationRounds.map(station => JSON.stringify(station.round));
    check(new Set(roundSignatures).size === 3, `A1-V3 ${review.number}: rodadas comunicativas duplicadas.`);
    check(communicationRounds.every(station => !station.items), `A1-V3 ${review.number}: rodada comunicativa reutiliza exercício controlado.`);
    const controlledStations = review.stations.filter(station => station.kind !== 'communicative-round');
    check(controlledStations.length === 4, `A1-V3 ${review.number}: a revisão deve recuperar quatro focos antes das rodadas.`);
    check(new Set(controlledStations.map(station => station.title)).size === controlledStations.length, `A1-V3 ${review.number}: estações controladas duplicadas.`);
});

let a2Source = read('a2-v3/a2-v3-lesson-content.js');
a2Source = a2Source.replace(/\}\(\)\);\s*$/, 'globalThis.__a2Audit = { getLessonData, getReviewLesson }; }());');
const a2Document = { readyState: 'loading', title: '', addEventListener() {} };
const a2Window = { location: { pathname: '' }, V3Curriculum: curriculum };
const a2Context = { console, document: a2Document, window: a2Window };
vm.createContext(a2Context);
vm.runInContext(a2Source, a2Context, { filename: 'a2-v3-lesson-content.js' });
const a2ExpectedLabels = { 3: /interrupted/, 7: /articles|quantity/, 29: /conditions/, 31: /past habits|used to/ };
for (const [number, pattern] of Object.entries(a2ExpectedLabels)) {
    a2Window.location.pathname = `/a2-v3/licao-${String(number).padStart(2, '0')}.html`;
    const data = a2Context.__a2Audit.getLessonData();
    check(pattern.test(data.bank.label), `A2-V3 L${number}: banco de conteúdo não corresponde ao novo foco.`);
}
for (const number of expectedReviews['a2-v3']) {
    const entry = curriculum.getLesson('a2-v3', number);
    const review = a2Context.__a2Audit.getReviewLesson(number);
    check(review?.contract?.rounds?.length === 3, `A2-V3 L${number}: contrato de revisão ausente.`);
    check(entry.oralInteractionMinutes >= 39, `A2-V3 L${number}: tempo oral abaixo de 39 minutos.`);
}

const b1Lessons = window.B1_V3_LESSONS || [];
check(b1Lessons.length === 32, 'B1-V3: adaptador não produziu 32 lições.');
for (const lesson of b1Lessons) {
    check(lesson.curriculumId === curriculum.getLesson('b1-v3', lesson.number).id, `B1-V3 L${lesson.number}: ID curricular divergente.`);
    if (lesson.type === 'review') {
        const types = lesson.slides.map(slide => slide.type);
        check(types.includes('reading') && types.includes('teacherListening') && types.includes('speaking'), `B1-V3 L${lesson.number}: revisão sem input e speaking.`);
        check(lesson.reviewContract?.rounds?.length === 3, `B1-V3 L${lesson.number}: três rodadas ausentes.`);
        check(lesson.oralInteractionMinutes >= 42, `B1-V3 L${lesson.number}: tempo oral abaixo de 42 minutos.`);
    }
}

require(path.join(root, 'js', 'advanced-v3-lessons-data.js'));
for (const moduleId of ['b2-v3', 'c1-v3']) {
    const lessons = window.AdvancedV3Lessons[moduleId] || [];
    check(lessons.length === 32, `${moduleId}: dados não geraram 32 lições.`);
    const uniqueness = new Set();
    lessons.forEach(lesson => {
        check(lesson.id === curriculum.getLesson(moduleId, lesson.number).id, `${moduleId} L${lesson.number}: ID divergente.`);
        if (lesson.number % 2 === 1) {
            check(lesson.input?.paragraphs?.length >= 2, `${moduleId} L${lesson.number}: leitura insuficiente.`);
            check(lesson.dialogue?.length >= 6, `${moduleId} L${lesson.number}: diálogo insuficiente.`);
            check(lesson.practice?.length >= 6, `${moduleId} L${lesson.number}: prática insuficiente.`);
            check(lesson.listening?.script && lesson.speaking?.rounds?.length === 3 && lesson.online?.prompt && lesson.homework, `${moduleId} L${lesson.number}: contrato de conteúdo incompleto.`);
            check(!uniqueness.has(lesson.uniquenessKey), `${moduleId} L${lesson.number}: conteúdo duplicado.`);
            uniqueness.add(lesson.uniquenessKey);
        } else {
            check(lesson.rounds?.length === 3, `${moduleId} L${lesson.number}: revisão sem três rodadas.`);
            check(lesson.input?.paragraphs?.length >= 2 && lesson.listening?.script, `${moduleId} L${lesson.number}: revisão sem input.`);
            check(lesson.teacherFocus && lesson.cefrEvidence?.length === 6, `${moduleId} L${lesson.number}: feedback/evidência CEFR ausente.`);
            check(lesson.oralInteractionMinutes >= 45, `${moduleId} L${lesson.number}: tempo oral abaixo de 45 minutos.`);
        }
    });
}

const legacyPartial = { 'a2-v3': { lesson_6: true } };
const legacyMerged = { 'a2-v3': { lesson_6: true, lesson_7: true } };
check(!curriculum.isLessonComplete(legacyPartial, 'a2-v3', 3), 'Migração: aula combinada foi concluída com apenas uma origem.');
check(curriculum.isLessonComplete(legacyMerged, 'a2-v3', 3), 'Migração: aula combinada não foi concluída com todas as origens.');
check(!curriculum.isLessonComplete({ 'a2-v3': { lesson_31: true } }, 'a2-v3', 31), 'Migração: conteúdo novo deveria permanecer pendente.');
check(!curriculum.isLessonComplete({ 'b1-v3': { lesson_32: true } }, 'b1-v3', 32), 'Migração: avaliação B1 foi concluída sem o workshop antigo.');
check(curriculum.isLessonComplete({ 'b1-v3': { lesson_31: true, lesson_32: true } }, 'b1-v3', 32), 'Migração: avaliação B1 não reconheceu workshop e projeto antigos.');
const a1Block = { 'a1-v3': { lesson_1: true, lesson_2: true, lesson_3: true, lesson_27: true } };
check(curriculum.isLessonComplete(a1Block, 'a1-v3', 5), 'Migração: revisão antiga não foi convertida após bloco completo.');
const a1PreviousId = curriculum.getLesson('a1-v3', 1).legacyIds[0];
check(curriculum.isLessonComplete({ 'a1-v3': { byId: { [a1PreviousId]: true } } }, 'a1-v3', 1), 'Migração A1: ID da versão anterior não foi preservado.');
const directEntry = curriculum.getLesson('b2-v3', 1);
check(curriculum.isLessonComplete({ 'b2-v3': { byId: { [directEntry.id]: true } } }, 'b2-v3', directEntry.id), 'Progresso por ID não foi reconhecido.');

const progressSource = read('js/progress-manager.js');
check(/progress\.\$\{moduleId\}\.byId\.\$\{curriculumLesson\.id\}/.test(progressSource), 'Novas conclusões não são gravadas por ID.');
check(/curriculumVersion|V3Curriculum\.version|\.version/.test(progressSource), 'Versão curricular não é gravada.');
check(/lesson_\$\{lessonId\}/.test(progressSource), 'Leitura/gravação legada para módulos não V3 foi removida.');

global.window = {};
require(path.join(root, 'js', 'platform-access.js'));
check(window.PlatformAccess.canAccessModule(['b2'], 'b2-v3'), 'Permissão b2-v3 → b2 ausente.');
check(window.PlatformAccess.canAccessModule(['c1'], 'c1-v3'), 'Permissão c1-v3 → c1 ausente.');
check(!window.PlatformAccess.canAccessModule(['b1'], 'b2-v3'), 'Permissão B2-V3 está ampla demais.');

const sessionSource = read('js/v3-session-plan.js');
check(!/new Set\(\[(?:4|8|12|16)/.test(sessionSource), 'Plano de sessão ainda contém lista duplicada de revisões.');
check(/window\.V3Curriculum\?\.getModule/.test(sessionSource), 'Plano de sessão não consulta o manifesto.');
const advancedPlayer = read('js/advanced-v3-lesson-player.js');
check(/const totalMinutes = slides\.reduce/.test(advancedPlayer), 'Player avançado não confere a soma da sessão.');
check(/const oralMinutes = slides\.reduce/.test(advancedPlayer), 'Player avançado não confere tempo oral.');
check(/Attempt · Twist · Retry/.test(advancedPlayer), 'Player avançado não expõe o ciclo de revisão.');

const portalSource = [read('js/app.js'), read('js/student-portal-dashboard.js'), read('home-aluno.html'), read('index.html')].join('\n');
for (const moduleId of modules) check(portalSource.includes(moduleId), `${moduleId}: rota ausente do portal/gerenciamento.`);

if (errors.length) {
    console.error(`V3 curriculum audit failed with ${errors.length} issue(s):`);
    errors.forEach(error => console.error(`- ${error}`));
    process.exitCode = 1;
} else {
    console.log('V3 curriculum audit passed: 160 pages, five 32-lesson manifests, review cadence, CEFR coverage, communicative contracts, progress migration and permissions checked.');
}
