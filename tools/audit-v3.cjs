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

const expectedReviews = {
    'a1-v3': [3,6,9,12,15,18,21,24,27,30,33,36,37,38],
    'a2-v3': [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 31, 32],
    'b1-v3': Array.from({ length: 15 }, (_, index) => (index + 1) * 2),
    'b2-v3': Array.from({ length: 16 }, (_, index) => (index + 1) * 2),
    'c1-v3': Array.from({ length: 16 }, (_, index) => (index + 1) * 2)
};
const expectedProjects = {
    'a1-v3': [],
    'a2-v3': [],
    'b1-v3': [31, 32],
    'b2-v3': [31, 32],
    'c1-v3': [31, 32]
};
const modules = Object.keys(expectedReviews);
const cefrSkills = ['reception', 'production', 'interaction', 'mediation', 'linguistic', 'online'];

for (const moduleId of modules) {
    const lessons = curriculum.getModule(moduleId);
    const expectedCount=moduleId==='a1-v3'?38:32;
    check(lessons.length === expectedCount, `${moduleId}: o manifesto deve ter exatamente 32 lições.`);
    check(new Set(lessons.map(lesson => lesson.id)).size === expectedCount, `${moduleId}: IDs curriculares duplicados.`);
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
    check(files.length === expectedCount, `${moduleId}: esperadas 32 páginas, encontradas ${files.length}.`);
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
        } else if(moduleId === 'b1-v3' && (index === 0 || (index < 30 && index % 2 === 1))) {
            check(html.includes('../js/v3-presentation.js') && html.includes('b1-v3-presentation-data.js'), `${moduleId}/${file}: apresentação compartilhada ausente.`);
            if (lessons[index].lessonKind === 'communicative') check(html.includes('b1-v3-communicative-data.js'), `${moduleId}/${file}: fonte comunicativa atual ausente.`);
        } else if(!['a1-v3','a2-v3'].includes(moduleId)) {
            check(html.includes('../js/v3-session-plan.js'), `${moduleId}/${file}: plano de 60 minutos ausente.`);
        }
    }
}

require(path.join(root, 'a1-v3', 'a1-v3-lesson-registry.js'));
for (let number = 1; number <= 38; number += 1) {
    require(path.join(root, 'a1-v3', 'lesson-data', `licao-${String(number).padStart(2, '0')}.js`));
}
const registeredA1Data = window.A1V3_DATA;
window.A1V3_DATA = null;
[
    'b1-v3-lessons-data.js',
    'b1-v3-lessons-block1a.js', 'b1-v3-lessons-block1b.js',
    'b1-v3-lessons-block2a.js', 'b1-v3-lessons-block2b.js',
    'b1-v3-lessons-block3a.js', 'b1-v3-lessons-block3b.js',
    'b1-v3-lessons-block4a.js', 'b1-v3-lessons-block4b.js'
].forEach(file => require(path.join(root, 'js', file)));
require(path.join(root, 'js', 'v3-curriculum-adapters.js'));
window.A1V3_DATA = registeredA1Data;

const a1Lessons=curriculum.getModule('a1-v3').map(m=>window.A1V3LessonRegistry.get(m.number));
const a1RendererSource=read('js/v3-presentation.js');
check(a1Lessons.length===38,'A1: esperadas 38 aulas.');
check(a1Lessons.filter(l=>l.lessonKind==='lexical').length===24,'A1: esperadas 24 lexicais.');
check(a1Lessons.filter(l=>l.lessonKind==='communicative').length===12,'A1: esperadas 12 conversações.');
check(a1Lessons.filter(l=>l.lessonKind==='consolidation').length===2,'A1: esperadas duas consolidações.');
for(const lesson of a1Lessons){
 const slides=lesson.slides||[], m=curriculum.getLesson('a1-v3',lesson.number);
 check(slides.length>=(m.lessonKind==='communicative'?5:8),'A1 L'+lesson.number+': seções insuficientes.');
 check(new Set(slides.map(s=>s.id)).size===slides.length,'A1: IDs de seção duplicados.');
 check(slides.every(s=>s.title&&s.instruction),'A1: seção sem orientação.');
 check(slides.at(-1)?.type==='homework'&&slides.at(-1).options?.length===3,'A1: homework deve encerrar com três opções.');
 check(lesson.curriculumId===m.id&&m.disableLegacyEditorial,'A1: fonte ou ID incoerente.');
 if(m.lessonKind==='lexical'){
  check(slides[0]?.type==='dialogue'&&slides[0].lines.length>=6,'A1: diálogo inicial ausente.');
  const words=slides.filter(s=>s.type==='cards'&&s.id!=='expressions').flatMap(s=>s.cards||s.groups.flatMap(g=>g.cards));
  check(words.length>=14,'A1: vocabulário insuficiente.');
  check(slides.some(s=>s.type==='verbs'&&s.cards.length),'A1: verbos ausentes.');
  check(slides.some(s=>s.type==='patterns'),'A1: explicações ausentes.');
  check(slides.some(s=>s.type==='drill'&&s.items.length>=6),'A1: prática oral insuficiente.');
  check(slides.some(s=>s.id==='expressions'&&s.cards.length>=6),'A1: expressões ausentes.');
  check(slides.some(s=>s.type==='reading'&&s.items.length>=3),'A1: leitura com perguntas ausente.');
 }else{
  if(m.lessonKind==='communicative'){
   check(slides.some(s=>['reading','dialogue','cloze'].includes(s.type)),'A1: CA precisa de entrada contextualizada.');
   check(slides.some(s=>['conversation','mission','roleplay','survey'].includes(s.type)),'A1: CA precisa de produção pessoal.');
   check(new Set(slides.filter(s=>s.type!=='homework').map(s=>s.type)).size>=3,'A1: variedade de ações insuficiente.');
   check(slides.filter(s=>['verbs','patterns','drill'].includes(s.type)).length<=1,'A1: CA dominada por apresentação lexical.');
  }
  check(m.requireExplicitCompletion,'A1: nova CA não pode ser concluída por inferência.');
 }
}
check(/markLessonAsComplete/.test(a1RendererSource),'A1: conclusão não integrada.');
check(/MusicClozeV3/.test(a1RendererSource),'A1: música não integrada.');
check(/saveAttrs/.test(a1RendererSource)&&/data-pronounce-text/.test(a1RendererSource),'A1: salvar e ouvir ausentes.');

try { console.log(require('child_process').execFileSync(process.execPath, [path.join(root, 'tools/audit-a2-v3-presentation.cjs')], {encoding:'utf8'}).trim()); } catch(error) { check(false, 'A2 presentation audit: '+error.message); }
try { console.log(require('child_process').execFileSync(process.execPath, [path.join(root, 'tools/audit-v3-communicative-variety.cjs')], {encoding:'utf8'}).trim()); } catch(error) { check(false, 'Active communicative sources: '+error.message); }

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

const premiumA2Vacation = { 'a2-v3': { lesson_1: true } };
check(curriculum.isLessonComplete(premiumA2Vacation, 'a2-v3', 1), 'A2 migration: Vacation and Weather did not recognize legacy lesson 1.');
check(curriculum.isLessonComplete(premiumA2Vacation, 'a2-v3', 2), 'A2 migration: the first conversation review did not follow lesson 1.');
const premiumA2Location = { 'a2-v3': { lesson_3: true } };
check(curriculum.isLessonComplete(premiumA2Location, 'a2-v3', 3), 'A2 migration: Location and Directions did not recognize legacy lesson 3.');
check(curriculum.isLessonComplete(premiumA2Location, 'a2-v3', 4), 'A2 migration: the location conversation review did not follow lesson 3.');
check(!curriculum.isLessonComplete({ 'a2-v3': { lesson_31: true } }, 'a2-v3', 31), 'A2 migration: new consolidation content should remain pending.');
check(!curriculum.isLessonComplete({ 'b1-v3': { lesson_32: true } }, 'b1-v3', 32), 'B1 migration: final assessment completed without the former workshop.');
check(curriculum.isLessonComplete({ 'b1-v3': { lesson_31: true, lesson_32: true } }, 'b1-v3', 32), 'B1 migration: final assessment did not recognize the former workshop and project.');
const oldOne=curriculum.a1HistoricalManifest[0];
check(curriculum.isLessonComplete({'a1-v3':{byId:{[oldOne.id]:true}}},'a1-v3',1),'A1: equivalência explícita não preservada.');
check(!curriculum.isLessonComplete({'a1-v3':{lesson_3:true}},'a1-v3',3),'A1: número antigo concluiu nova CA.');
check(!curriculum.isLessonComplete({'a1-v3':{byId:Object.fromEntries(curriculum.getModule('a1-v3').filter(l=>l.lessonKind==='lexical').map(l=>[l.id,true]))}},'a1-v3',3),'A1: CA concluída só pelas lexicais.');
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
check(/Guided response/.test(read('js/advanced-v3-lessons-data.js')) && /Teacher follow-up questions/.test(read('js/advanced-v3-lessons-data.js')) && /Final synthesis/.test(read('js/advanced-v3-lessons-data.js')), 'Player avançado não expõe a conversa guiada em três etapas naturais.');

const pedagogySources = {
    A1: a1RendererSource,
    A2: read('a2-v3/a2-v3-presentation-data.js'),
    B1: read('js/b1-v3-lesson-player.js'),
    Advanced: advancedPlayer
};
for (const [label, source] of Object.entries(pedagogySources)) {
    if(['A1','A2'].includes(label))continue; // The section contract is audited above.
    check(/Vocabulary Expansion/.test(source), `${label}: etapa Vocabulary Expansion ausente.`);
    check(/Helping You/.test(source), `${label}: etapa Helping You ausente.`);
    check(/Dialog Sample/.test(source), `${label}: etapa Dialog Samples ausente.`);
    check(/Context Reading/.test(source), `${label}: etapa Context Reading ausente.`);
    check(/Let(?:’|')s Talk/.test(source), `${label}: conversa guiada Let’s Talk ausente.`);
}
check(!/Attempt · Twist · Retry|Unexpected condition/.test(advancedPlayer), 'Player avançado ainda mostra a sequência artificial attempt/twist/retry.');
check(!/Esta aula funciona como um circuito de treino|Contrato comunicativo|Role-play Missions|One-Minute Oral Test/.test(pedagogySources.A2), 'A2: a revisão ainda mostra metatexto ou rótulo artificial ao aluno.');
check(!/Everyday role-play|troque os papéis|Choice and Information Gap/.test(pedagogySources.B1), 'B1: o player ainda pressupõe dupla ou troca de papéis.');
check(!/A condição inesperada e a nova decisão|segunda tentativa depois do feedback/i.test(read('js/v3-curriculum-adapters.js')), 'A1/B1: homework ainda descreve a sequência artificial anterior.');

const portalSource = [read('js/app.js'), read('js/student-portal-dashboard.js'), read('home-aluno.html'), read('index.html')].join('\n');
for (const moduleId of modules) check(portalSource.includes(moduleId), `${moduleId}: rota ausente do portal/gerenciamento.`);

if (errors.length) {
    console.error(`V3 curriculum audit failed with ${errors.length} issue(s):`);
    errors.forEach(error => console.error(`- ${error}`));
    process.exitCode = 1;
} else {
    console.log('V3 curriculum audit passed: 166 pages, A1 with 38 lessons and four 32-lesson manifests, review cadence, CEFR coverage, communicative contracts, progress migration and permissions checked.');
}
