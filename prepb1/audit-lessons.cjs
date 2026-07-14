const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
global.window = {};
require(path.join(root, 'js', 'prepb1-lessons-data.js'));

const lessons = window.PREPB1_LESSONS;
const failures = [];
const knownSlideTypes = new Set([
    'opening',
    'grammar',
    'languageBank',
    'practice',
    'reading',
    'readingQuestions',
    'microReading',
    'teacherListening',
    'translation',
    'speaking',
    'assessment',
    'homework'
]);

function check(condition, message) {
    if (!condition) failures.push(message);
}

function normalize(value) {
    return String(value || '')
        .toLocaleLowerCase('pt-BR')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
}

function wordCount(value) {
    return String(value || '').trim().split(/\s+/).filter(Boolean).length;
}

function findDuplicates(entries, label) {
    const seen = new Map();
    entries.forEach(({ value, lesson }) => {
        const key = normalize(value);
        if (!key) return;
        if (!seen.has(key)) seen.set(key, []);
        seen.get(key).push(lesson);
    });

    for (const [key, lessonNumbers] of seen) {
        if (lessonNumbers.length > 1) {
            failures.push(`${label} repetido nas lições ${lessonNumbers.join(', ')}: ${key}`);
        }
    }
}

check(Array.isArray(lessons), 'PREPB1_LESSONS precisa ser um array.');
check(lessons.length === 10, `Esperadas 10 lições; encontradas ${lessons.length}.`);

const allPracticePrompts = [];
const allTranslationPrompts = [];
const allOpeningLines = [];
const slideCounts = new Set();
const modulePracticeKinds = new Set();

lessons.forEach((lesson, index) => {
    const label = `Lição ${index + 1}`;
    const slides = Array.isArray(lesson.slides) ? lesson.slides : [];
    const byType = type => slides.filter(slide => slide.type === type);

    check(lesson.number === index + 1, `${label}: numeração inválida (${lesson.number}).`);
    check(Boolean(lesson.title && lesson.objective && lesson.focus && lesson.cefr), `${label}: metadados incompletos.`);
    check(slides.length >= 10, `${label}: precisa de pelo menos 10 slides; há ${slides.length}.`);
    slideCounts.add(slides.length);

    slides.forEach(slide => {
        check(knownSlideTypes.has(slide.type), `${label}: tipo de slide desconhecido: ${slide.type}.`);
        check(Boolean(slide.title), `${label}: slide ${slide.type} sem título.`);
    });

    const openings = byType('opening');
    check(openings.length === 1, `${label}: precisa de exatamente uma abertura.`);
    check(slides[0]?.type === 'opening', `${label}: a abertura precisa ser o primeiro slide.`);
    if (openings[0]) {
        const dialogueLines = openings[0].dialogue?.lines || [];
        check((openings[0].objectives || []).length >= 4, `${label}: abertura precisa de quatro objetivos em português.`);
        check(dialogueLines.length >= 8, `${label}: diálogo inicial precisa de pelo menos oito falas.`);
        dialogueLines.forEach(([, line]) => allOpeningLines.push({ value: line, lesson: lesson.number }));
    }

    const grammarSlides = byType('grammar');
    check(grammarSlides.length >= 1, `${label}: falta revisão gramatical.`);
    grammarSlides.forEach(slide => {
        check((slide.tables || []).length >= 1, `${label}: gramática sem tabela comparativa.`);
        (slide.tables || []).forEach(table => {
            check((table.headers || []).length >= 2, `${label}: tabela gramatical sem cabeçalhos suficientes.`);
            check((table.rows || []).length >= 2, `${label}: tabela gramatical curta demais.`);
        });
    });

    const practiceItems = byType('practice').flatMap(slide => slide.items || []);
    check(practiceItems.length >= 12, `${label}: precisa de pelo menos 12 atividades; há ${practiceItems.length}.`);
    check(new Set(practiceItems.map(item => item.kind)).size >= 5, `${label}: pouca variedade de formatos de prática.`);
    practiceItems.forEach((item, itemIndex) => {
        modulePracticeKinds.add(item.kind);
        check(Boolean(item.prompt), `${label}: atividade ${itemIndex + 1} sem enunciado.`);
        check(Boolean(item.answer), `${label}: atividade ${itemIndex + 1} sem resposta.`);
        check(Boolean(item.hint), `${label}: atividade ${itemIndex + 1} sem dica.`);
        if (item.kind === 'complete') {
            check(item.prompt.includes('____'), `${label}: atividade de completar sem lacuna: ${item.prompt}`);
        }
        allPracticePrompts.push({ value: item.prompt, lesson: lesson.number });
    });

    const readings = byType('reading');
    check(readings.length === 1, `${label}: precisa de exatamente uma leitura principal.`);
    if (readings[0]) {
        const readingWords = wordCount((readings[0].paragraphs || []).join(' '));
        check(readingWords >= 165, `${label}: leitura principal curta demais (${readingWords} palavras).`);
        check((readings[0].vocabulary || []).length >= 4, `${label}: apoio de vocabulário insuficiente.`);
    }

    const readingQuestions = byType('readingQuestions').flatMap(slide => slide.questions || []);
    check(readingQuestions.length >= 5, `${label}: precisa de pelo menos cinco perguntas de leitura.`);
    readingQuestions.forEach((item, questionIndex) => {
        check(Boolean(item.question && item.answer), `${label}: pergunta de leitura ${questionIndex + 1} incompleta.`);
        check(!/your own life|main situation|what do you think about your/i.test(item.question), `${label}: pergunta de leitura inadequadamente pessoal ou abstrata: ${item.question}`);
    });

    const microReadings = byType('microReading');
    check(microReadings.length >= 1, `${label}: falta leitura prática curta.`);
    const microWords = wordCount(microReadings.flatMap(slide => slide.texts || []).map(item => item.text).join(' '));
    check(microWords >= 40, `${label}: conjunto de leituras práticas curto demais (${microWords} palavras).`);
    microReadings.forEach(slide => {
        check((slide.questions || []).length >= 3, `${label}: leitura prática precisa de pelo menos três perguntas.`);
        (slide.questions || []).forEach((item, questionIndex) => {
            check(Boolean(item.question && item.answer), `${label}: questão prática ${questionIndex + 1} incompleta.`);
        });
    });

    const translations = byType('translation').flatMap(slide => slide.items || []);
    check(translations.length >= 6, `${label}: precisa de pelo menos seis traduções orais; há ${translations.length}.`);
    translations.forEach((item, itemIndex) => {
        check(Boolean(item.pt && item.en), `${label}: tradução ${itemIndex + 1} incompleta.`);
        check(!/use a ideia|crie uma frase|invente|translate|past simple|present perfect|first conditional/i.test(item.pt), `${label}: tradução ${itemIndex + 1} não é uma frase direta em português: ${item.pt}`);
        allTranslationPrompts.push({ value: item.pt, lesson: lesson.number });
    });

    const speakingSlides = byType('speaking');
    check(speakingSlides.length >= 2, `${label}: precisa de pelo menos dois blocos de fala ao vivo.`);
    speakingSlides.forEach((slide, speakingIndex) => {
        check((slide.rounds || []).length >= 2, `${label}: bloco de fala ${speakingIndex + 1} precisa de pelo menos duas rodadas.`);
        (slide.rounds || []).forEach((round, roundIndex) => {
            check(Boolean(round.prompt && round.model), `${label}: rodada de fala ${roundIndex + 1} sem prompt ou modelo.`);
            check((round.followUps || []).length >= 2, `${label}: rodada de fala ${roundIndex + 1} precisa de perguntas de continuação.`);
        });
    });

    const homeworkSlides = byType('homework');
    check(homeworkSlides.length === 1, `${label}: precisa de exatamente um homework.`);
    check(slides.at(-1)?.type === 'homework', `${label}: homework precisa ser o último slide.`);
    if (homeworkSlides[0]) {
        check((homeworkSlides[0].options || []).length === 3, `${label}: homework precisa oferecer exatamente três temas.`);
        check((homeworkSlides[0].checklist || []).length >= 3, `${label}: checklist do homework está incompleto.`);
    }

    const serialized = JSON.stringify(lesson);
    check(!/diego/i.test(serialized), `${label}: contém o nome proibido Diego.`);
    check(!/record (your|a) (voice|audio)|voice note|grave (sua|um) (voz|áudio)/i.test(serialized), `${label}: contém atividade de gravação.`);
    check(!/Ã|Â|�/.test(serialized), `${label}: contém caracteres corrompidos.`);
});

check(slideCounts.size >= 4, `As lições ainda estão uniformes demais: apenas ${slideCounts.size} contagens de slides.`);
check(modulePracticeKinds.size >= 10, `O módulo precisa de mais formatos de prática; há ${modulePracticeKinds.size}.`);
check(lessons[0]?.slides.some(slide => slide.type === 'assessment'), 'Lição 1 precisa de avaliação diagnóstica.');
check(lessons[9]?.slides.some(slide => slide.type === 'assessment'), 'Lição 10 precisa de avaliação final.');

findDuplicates(allPracticePrompts, 'Enunciado de prática');
findDuplicates(allTranslationPrompts, 'Frase de tradução');
findDuplicates(allOpeningLines, 'Fala de diálogo inicial');

const playerSource = fs.readFileSync(path.join(root, 'js', 'prepb1-lesson-player.js'), 'utf8');
check(!/Ã|Â|�/.test(playerSource), 'Player contém caracteres corrompidos.');
check(/lesson\.slides\s*\.map/.test(playerSource), 'Player não está renderizando a estrutura variável de slides.');
check(/renderRevealButton/.test(playerSource), 'Player não possui controle reutilizável para revelar respostas.');
check(/teacherListening:\s*renderTeacherListeningSlide/.test(playerSource), 'Player não renderiza listening conduzido pelo professor.');
check(/translation:\s*renderTranslationSlide/.test(playerSource), 'Player não renderiza tradução oral.');

const moduleSource = fs.readFileSync(path.join(root, 'js', 'prepb1-module.js'), 'utf8');
lessons.forEach(lesson => {
    check(moduleSource.includes(`'${lesson.title}'`), `Página do módulo não lista o título da lição ${lesson.number}.`);
});

if (failures.length) {
    console.error(`\nAuditoria falhou com ${failures.length} problema(s):\n`);
    failures.forEach((failure, index) => console.error(`${index + 1}. ${failure}`));
    process.exit(1);
}

console.log('Auditoria PREP B1 aprovada.');
console.log(`10 lições | ${[...slideCounts].sort((a, b) => a - b).join(', ')} slides por aula`);
console.log(`${modulePracticeKinds.size} formatos de prática | ${allPracticePrompts.length} atividades sem repetição`);
console.log(`${allTranslationPrompts.length} traduções orais diretas | ${allOpeningLines.length} falas iniciais únicas`);
