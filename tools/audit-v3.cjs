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
    'a1-v3': [5, 10, 15, 20, 25, 30, 31, 32],
    'a2-v3': [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 31, 32],
    'b1-v3': [3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
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

require(path.join(root, 'a1-v3', 'a1-v3-lesson-registry.js'));
for (let number = 1; number <= 32; number += 1) {
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

const a1Numbers = [...Object.keys(window.A1V3_DATA.lessons), ...Object.keys(window.A1V3_DATA.reviews)].map(Number).sort((a, b) => a - b);
check(a1Numbers.length === 32 && a1Numbers.every((number, index) => number === index + 1), 'A1-V3: adaptador não produziu 32 lições.');
check(JSON.stringify(Object.keys(window.A1V3_DATA.reviews).map(Number)) === JSON.stringify([5, 10, 15, 20, 25, 30, 31, 32]), 'A1-V3: missões/projetos não foram remapeados.');
check(curriculum.getLesson('a1-v3', 1).version === '2026.08.05-expanded-a1-32', 'A1-V3: versão curricular expandida não foi registrada.');
const a1ContentNumbers = Object.keys(window.A1V3_DATA.lessons).map(Number);
check(a1ContentNumbers.length === 24, `A1-V3: esperadas 24 aulas de conteúdo gradual, encontradas ${a1ContentNumbers.length}.`);
const a1ContentLessons = Object.values(window.A1V3_DATA.lessons);
a1ContentLessons.forEach(lesson => {
    check(lesson.vocab?.length > 0, `A1-V3 L${lesson.number}: vocabulário ausente.`);
    check(lesson.activitySections?.length > 0, `A1-V3 L${lesson.number}: seções de prática específicas ausentes.`);
    check(lesson.activitySections.every(section => section.items?.length > 0), `A1-V3 L${lesson.number}: seção de prática vazia.`);
    check(lesson.translations?.length > 0, `A1-V3 L${lesson.number}: recuperação oral ausente.`);
    check(lesson.expressions?.length > 0, `A1-V3 L${lesson.number}: blocos de linguagem ausentes.`);
    check(lesson.dialogues?.length > 0, `A1-V3 L${lesson.number}: prática dialogada ausente.`);
    check(!lesson.labs, `A1-V3 L${lesson.number}: o antigo Skill Lab ainda está presente.`);
    check(lesson.grammar?.rows?.length > 0, `A1-V3 L${lesson.number}: explicação gramatical ausente.`);
});
const a1VocabularyCounts = new Set(a1ContentLessons.map(lesson => lesson.vocab.length));
check(a1VocabularyCounts.size >= 4, `A1-V3: a carga lexical ainda está engessada; foram encontradas apenas ${a1VocabularyCounts.size} cargas diferentes.`);
check(a1ContentLessons.every(lesson => fs.existsSync(path.join(root, 'a1-v3', 'lesson-data', `licao-${String(lesson.number).padStart(2, '0')}.js`))), 'A1-V3: arquivo individual de uma aula de conteúdo ausente.');
check(Array.from({ length: 32 }, (_, index) => index + 1).every(number => read(`a1-v3/licao-${String(number).padStart(2, '0')}.html`).includes(`lesson-data/licao-${String(number).padStart(2, '0')}.js`)), 'A1-V3: uma página não carrega seu próprio arquivo de conteúdo.');
check(Array.from({ length: 32 }, (_, index) => index + 1).every(number => !/a1-v3-data|a1-v3-cadence-data|lesson-editorial|v3-curriculum-adapters/.test(read(`a1-v3/licao-${String(number).padStart(2, '0')}.html`))), 'A1-V3: uma página ainda depende do gerador editorial antigo.');
const a1RendererSource = read('a1-v3/a1-v3-lesson-content.js');
check(!/Prática variada:|Seis frases|Quatro diálogos|Área reservada|etapa editorial|Texto musical fictício|Nenhuma letra protegida|Dica:|Observe:|Apoio:/i.test(a1RendererSource), 'A1-V3: o player ainda exibe contagens rígidas, dicas que entregam respostas ou recados editoriais ao aluno.');
check(/Desembaralhe os elementos/.test(a1RendererSource) && /Encontre o erro/.test(a1RendererSource), 'A1-V3: instruções operacionais de desembaralhar e corrigir não estão explícitas.');
check(/Music Time/.test(a1RendererSource) && /Preencha as lacunas com a palavra que você ouvir/.test(a1RendererSource), 'A1-V3: instrução limpa do Music Time está ausente.');
const a1ExpectedFocusGroups = { 5: 4, 10: 4, 15: 4, 20: 4, 25: 4, 30: 4, 31: 12, 32: 12 };
Object.values(window.A1V3_DATA.reviews).forEach(review => {
    check(review.oralInteractionMinutes >= 36, `A1-V3 ${review.number}: tempo oral abaixo de 36 minutos.`);
    const communicationRounds = review.stations.filter(station => station.kind === 'individual-round');
    const expectedRoundCount = review.number >= 31 ? 4 : 3;
    check(communicationRounds.length === expectedRoundCount, `A1-V3 ${review.number}: número de rodadas individuais incorreto.`);
    check(
        JSON.stringify(communicationRounds.map(station => station.phase)) === JSON.stringify(review.number >= 31 ? ['attempt', 'questions', 'condition', 'final'] : ['attempt', 'questions', 'final']),
        `A1-V3 ${review.number}: sequência de apresentação, perguntas e resposta final inválida.`
    );
    const roundSignatures = communicationRounds.map(station => JSON.stringify(station.round));
    check(new Set(roundSignatures).size === expectedRoundCount, `A1-V3 ${review.number}: rodadas comunicativas duplicadas.`);
    check(communicationRounds.every(station => !station.items), `A1-V3 ${review.number}: rodada comunicativa reutiliza exercício controlado.`);
    const controlledStations = review.stations.filter(station => station.kind === 'focus-practice');
    check(controlledStations.length === a1ExpectedFocusGroups[review.number], `A1-V3 ${review.number}: agrupamento de conteúdos gramaticais incorreto.`);
    check(new Set(controlledStations.map(station => station.title)).size === controlledStations.length, `A1-V3 ${review.number}: estações controladas duplicadas.`);
    check(controlledStations.every(station => station.grammar?.rows?.length && station.items?.length), `A1-V3 ${review.number}: cada foco precisa de revisão gramatical seguida de atividades.`);
    check(controlledStations.every(station => station.grammar.rows.every(row => !/ · /.test(row[0]))), `A1-V3 ${review.number}: a coluna de foco ainda inclui o título da aula de origem.`);
    check(communicationRounds.every(station => !station.round?.roleA && !station.round?.roleB && !station.round?.informationGap), `A1-V3 ${review.number}: uma rodada ainda depende de papéis para dois alunos.`);
    check(!/\b(?:Dois alunos|dois colegas|Aluno A|Aluno B|Role A|Role B|não mostrem|fichas|papéis diferentes|em dupla|a turma)\b/i.test(JSON.stringify(review)), `A1-V3 ${review.number}: há instrução incompatível com aula particular online.`);
});
check(window.A1V3_DATA.reviews[5].stations.some(station => station.grammar?.title === 'Verb to be' && station.grammar.rows.length >= 6), 'A1-V3 L5: as formas do verb to be não foram reunidas na mesma revisão gramatical.');
check(/apresenta|perfil/i.test(window.A1V3_DATA.reviews[5].homework?.instruction || ''), 'A1-V3 L5: homework pessoal e adequado ao bloco ausente.');

const memoryWiringSource = read('js/v3-session-plan.js');
const memoryWiringBlock = memoryWiringSource.slice(memoryWiringSource.indexOf("const memoryCard = event.target.closest('[data-v3-memory-card]')"), memoryWiringSource.indexOf("const matchOption = event.target.closest('[data-v3-match-option]')"));
check(/pendingReset/.test(memoryWiringBlock), 'A1-V3: o jogo da memória não mantém o par incorreto aberto até o próximo clique.');
check(!/setTimeout|dataset\.busy/.test(memoryWiringBlock), 'A1-V3: o jogo da memória ainda fecha cartas por tempo.');
check(!/Role A|Role B|Information gap|Rota da aula|Contrato comunicativo/.test(a1RendererSource), 'A1-V3: o player de revisão ainda mostra orientação coletiva ou o texto longo da abertura.');
check(!/Produção oral \d+\/\d+/.test(a1RendererSource), 'A1-V3: o player ainda mostra a sequência artificial Produção oral 2/3 ou 3/3.');

let a2Source = read('a2-v3/a2-v3-lesson-content.js');
a2Source = a2Source.replace(/\}\(\)\);\s*$/, 'globalThis.__a2Audit = { getLessonData, getReviewLesson }; }());');
const a2Document = { readyState: 'loading', title: '', addEventListener() {} };
const a2Window = { location: { pathname: '' }, V3Curriculum: curriculum };
const a2Context = { console, document: a2Document, window: a2Window };
vm.createContext(a2Context);
vm.runInContext(a2Source, a2Context, { filename: 'a2-v3-lesson-content.js' });
const a2ExpectedLabels = { 5: /articles|quantity/, 22: /past habits|used to/, 29: /advice/ };
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
    const padded = String(number).padStart(2, '0');
    const editorialFile = `a2-v3/lesson-editorial/licao-${padded}.js`;
    check(fs.existsSync(path.join(root, editorialFile)), `A2-V3 L${number}: arquivo individual da revisão ausente.`);
    const editorialSource = fs.existsSync(path.join(root, editorialFile)) ? read(editorialFile) : '';
    check(/reviewListening/.test(editorialSource) && /script:/.test(editorialSource) && /questions:/.test(editorialSource), `A2-V3 L${number}: listening com roteiro e perguntas ausente.`);
    check(/reviewSpeaking/.test(editorialSource), `A2-V3 L${number}: atividades específicas de speaking ausentes.`);
    const html = read(`a2-v3/licao-${padded}.html`);
    check(html.includes('../js/v3-lesson-editorial.js') && html.includes(`lesson-editorial/licao-${padded}.js`), `A2-V3 L${number}: página não carrega seus próprios dados de revisão.`);
}
check(/data-a2-listening-toggle/.test(a2Source) && /data-a2-listening-script/.test(a2Source), 'A2-V3: controle do roteiro oculto de listening ausente.');
check(/Listening sem acompanhar o texto/.test(a2Source) && /Perguntas para ouvir e responder/.test(a2Source), 'A2-V3: instrução de listening e perguntas visíveis ausentes.');
require(path.join(root, 'js', 'v3-lesson-editorial.js'));
[1, 2, 4, 5].forEach(number => require(path.join(root, 'a2-v3', 'lesson-editorial', `licao-${String(number).padStart(2, '0')}.js`)));
const a2AuthoredVocabulary = {};
for (const number of [1, 2, 4, 5]) {
    const padded = String(number).padStart(2, '0');
    const data = window.V3LessonEditorial.apply('a2-v3', number, { number, title: '', bank: {} });
    const practiceCount = (data.bank.activitySections || []).reduce((sum, section) => sum + (section.items || []).length, 0);
    check((data.bank.vocab || []).length >= (number === 1 ? 10 : 12), `A2-V3 L${number}: vocabulário insuficiente para o foco editorial.`);
    check((data.bank.expressions || []).length >= 7, `A2-V3 L${number}: expressões insuficientes.`);
    check(practiceCount >= 12, `A2-V3 L${number}: prática específica insuficiente.`);
    check((data.bank.dialogues || []).length >= 4 && data.bank.dialogues.every(dialogue => dialogue.length >= 6), `A2-V3 L${number}: diálogos precisam ser mais extensos e realistas.`);
    check(String(data.bank.reading || '').split(/\s+/).filter(Boolean).length >= 150, `A2-V3 L${number}: leitura contextual curta demais.`);
    check((data.bank.guidedConversation?.questions || []).length >= 6, `A2-V3 L${number}: conversa guiada insuficiente.`);
    a2AuthoredVocabulary[number] = new Set((data.bank.vocab || []).map(item => String(item[0]).trim().toLowerCase()));
    const html = read(`a2-v3/licao-${padded}.html`);
    check(html.includes('../js/v3-lesson-editorial.js') && html.includes(`lesson-editorial/licao-${padded}.js`), `A2-V3 L${number}: página não carrega sua autoria individual.`);
}
const a2SeenVocabulary = new Map();
for (const number of [1, 2, 4, 5]) {
    for (const word of a2AuthoredVocabulary[number]) {
        check(!a2SeenVocabulary.has(word), `A2-V3 L${number}: vocabulary flashcard “${word}” já apareceu na L${a2SeenVocabulary.get(word)}.`);
        a2SeenVocabulary.set(word, number);
    }
}
check(/cue:\s*item\[1\]/.test(a2Source) && !/cue:\s*`\$\{item\[0\]\}:/.test(a2Source), 'A2-V3: matching ainda entrega a categoria ou a resposta junto da frase incompleta.');
expectedReviews['a2-v3'].forEach(number => require(path.join(root, 'a2-v3', 'lesson-editorial', `licao-${String(number).padStart(2, '0')}.js`)));
const a2SpeakingCounts = new Set();
for (const number of expectedReviews['a2-v3']) {
    const data = window.V3LessonEditorial.apply('a2-v3', number, { number, bank: {} });
    const listening = data.bank.reviewListening;
    const speaking = data.bank.reviewSpeaking || [];
    check(String(listening?.script || '').split(/\s+/).filter(Boolean).length >= 80, `A2-V3 L${number}: roteiro de listening curto demais.`);
    check((listening?.questions || []).length >= 5, `A2-V3 L${number}: listening precisa de pelo menos cinco perguntas visíveis.`);
    check(speaking.length >= 5, `A2-V3 L${number}: speaking precisa de pelo menos cinco tarefas.`);
    if ([3, 6].includes(number)) check((data.bank.reviewPlan?.focusSections || []).length === 2, `A2-V3 L${number}: revisão precisa alternar cada foco gramatical com sua prática.`);
    a2SpeakingCounts.add(speaking.length);
}
check(a2SpeakingCounts.size >= 3, 'A2-V3: a quantidade de tarefas de speaking ainda está engessada.');

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

const legacyVacation = { 'a2-v3': { lesson_1: true } };
check(curriculum.isLessonComplete(legacyVacation, 'a2-v3', 1), 'Migração A2: a primeira aula de Vacation and Weather não reconheceu sua origem.');
check(curriculum.isLessonComplete(legacyVacation, 'a2-v3', 2), 'Migração A2: o aprofundamento de Vacation and Weather não reconheceu sua origem.');
check(curriculum.isLessonComplete(legacyVacation, 'a2-v3', 3), 'Migração A2: a revisão do primeiro bloco não reconheceu as duas partes equivalentes.');
check(!curriculum.isLessonComplete({ 'a2-v3': { lesson_2: true } }, 'a2-v3', 1), 'Migração A2: uma origem não relacionada concluiu a primeira aula.');
const legacyLocation = { 'a2-v3': { lesson_3: true } };
check(curriculum.isLessonComplete(legacyLocation, 'a2-v3', 4), 'Migração A2: a primeira aula de Location and Directions não reconheceu sua origem.');
check(curriculum.isLessonComplete(legacyLocation, 'a2-v3', 5), 'Migração A2: o aprofundamento de Location and Directions não reconheceu sua origem.');
check(curriculum.isLessonComplete(legacyLocation, 'a2-v3', 6), 'Migração A2: a revisão de Location and Directions não reconheceu o bloco equivalente.');
check(!curriculum.isLessonComplete({ 'a2-v3': { lesson_31: true } }, 'a2-v3', 31), 'Migração: conteúdo novo deveria permanecer pendente.');
check(!curriculum.isLessonComplete({ 'b1-v3': { lesson_32: true } }, 'b1-v3', 32), 'Migração: avaliação B1 foi concluída sem o workshop antigo.');
check(curriculum.isLessonComplete({ 'b1-v3': { lesson_31: true, lesson_32: true } }, 'b1-v3', 32), 'Migração: avaliação B1 não reconheceu workshop e projeto antigos.');
const a1Block = { 'a1-v3': { lesson_1: true, lesson_2: true, lesson_7: true, lesson_18: true, lesson_26: true } };
check(curriculum.isLessonComplete(a1Block, 'a1-v3', 5), 'Migração: revisão antiga não foi convertida após bloco completo.');
check(!curriculum.isLessonComplete({ 'a1-v3': { lesson_1: true } }, 'a1-v3', 2), 'Migração A1: aula combinada foi concluída com apenas uma origem.');
check(curriculum.isLessonComplete({ 'a1-v3': { lesson_1: true, lesson_18: true } }, 'a1-v3', 2), 'Migração A1: aula combinada não reconheceu todas as origens.');
check(!curriculum.isLessonComplete({ 'a1-v3': { lesson_13: true } }, 'a1-v3', 7), 'Migração A1: conteúdo novo recebeu equivalência incorreta.');
check(!curriculum.isLessonComplete({ 'a1-v3': { byId: { 'a1-v3-31-my-english-profile-workshop': true } } }, 'a1-v3', 31), 'Migração A1: antiga oficina concluiu indevidamente a nova consolidação extensa.');
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
check(/Guided response/.test(read('js/advanced-v3-lessons-data.js')) && /Teacher follow-up questions/.test(read('js/advanced-v3-lessons-data.js')) && /Final synthesis/.test(read('js/advanced-v3-lessons-data.js')), 'Player avançado não expõe a conversa guiada em três etapas naturais.');

const pedagogySources = {
    A1: a1RendererSource,
    A2: read('a2-v3/a2-v3-lesson-content.js'),
    B1: read('js/b1-v3-lesson-player.js'),
    Advanced: advancedPlayer
};
for (const [label, source] of Object.entries(pedagogySources)) {
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
    console.log('V3 curriculum audit passed: 160 pages, five 32-lesson manifests, review cadence, CEFR coverage, communicative contracts, progress migration and permissions checked.');
}
