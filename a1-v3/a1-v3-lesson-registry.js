(function installA1V3LessonRegistry(globalScope) {
    'use strict';

    if (globalScope.A1V3LessonRegistry) return;

    const entries = new Map();
    const dataSource = { lessons: {}, reviews: {}, lessonTitles: [], unitLabels: [] };
    const defaultMusic = {
        song: 'Everyday English Practice',
        artist: 'Music Time',
        spotifyId: '0vZ97gHhemKm6c64hTfJNA'
    };

    const v = (word, meaning, example, translation) => [word, meaning, example, translation];
    const x = (phrase, meaning, note, example, translation) => [phrase, meaning, note, example, translation];
    const p = (type, prompt, answer) => [type, prompt, '', answer];
    const t = (portuguese, english) => [portuguese, english];
    const line = (speaker, english, portuguese) => [speaker, english, portuguese];
    const dialogue = (title, ...lines) => ({ title, lines });
    const question = (prompt, answer) => [prompt, answer];
    const reading = (title, text, ...questions) => ({ title, text, questions });
    const activity = (title, instruction, items, eyebrow = 'Practice Time') => ({ title, instruction, items, eyebrow });
    const homework = (instruction, themes, checklist, options = {}) => ({ instruction, themes, checklist, ...options });
    const comm = (type, title, instruction, config = {}) => ({ type, title, instruction, ...config });

    function lesson(config) {
        const expressions = Array.isArray(config.expressions) ? config.expressions : [];
        return {
            type: 'content',
            objectives: [],
            intro: [],
            vocab: [],
            grammar: { title: 'Language in context', summary: '', rows: [], notes: [] },
            practice: [],
            activitySections: [],
            translations: [],
            expressions,
            expressionTranslations: expressions
                .map(item => [item[4], item[3]])
                .filter(([portuguese, english]) => portuguese && english),
            dialogues: [],
            reading: { title: config.title || 'Reading', text: '', questions: [] },
            conversation: { questions: [], support: [] },
            music: { ...defaultMusic, ...(config.music || {}) },
            homework: homework('Revise a linguagem da aula.', ['Use a linguagem em uma situação pessoal.'], ['Consigo produzir frases completas sem ler.']),
            ...config,
            expressions,
            expressionTranslations: config.expressionTranslations || expressions
                .map(item => [item[4], item[3]])
                .filter(([portuguese, english]) => portuguese && english),
            music: { ...defaultMusic, ...(config.music || {}) }
        };
    }

    function review(config) {
        return {
            type: 'review',
            objectives: [],
            recap: [],
            stations: [],
            reading: { title: config.title || 'Review', text: '', questions: [] },
            homework: homework('Revise o bloco praticado nesta aula.', ['Refaça os pontos em que precisou de ajuda.'], ['Consigo usar o conteúdo sem consultar a resposta.']),
            ...config
        };
    }

    function focus(title, summary, rows, notes, items, instruction) {
        return {
            kind: 'focus-practice',
            title: `Atividades: ${title}`,
            instruction: instruction || `Resolva as atividades sobre ${title} e leia as respostas completas em voz alta.`,
            grammar: { title, summary, rows, notes },
            items
        };
    }

    function speaking(phase, title, instruction, round) {
        return { kind: 'individual-round', phase, title, instruction, round };
    }

    function register(number, value) {
        const lessonNumber = Number(number);
        if (!Number.isInteger(lessonNumber) || lessonNumber < 1 || lessonNumber > 32) {
            throw new RangeError(`Número de lição A1-V3 inválido: ${number}`);
        }
        if (!value || typeof value !== 'object') throw new TypeError(`Conteúdo inválido para a lição ${lessonNumber}.`);

        const manifest = globalScope.V3Curriculum?.getLesson('a1-v3', lessonNumber);
        const entry = {
            ...value,
            number: lessonNumber,
            title: value.title || manifest?.title || `Lesson ${lessonNumber}`,
            type: value.type || manifest?.type || 'content',
            curriculumId: manifest?.id,
            curriculumVersion: manifest?.version,
            linguisticFocus: manifest?.linguisticFocus,
            reviewOf: manifest?.reviewOf ? [...manifest.reviewOf] : [],
            cefrObjectives: manifest?.cefrObjectives ? [...manifest.cefrObjectives] : [],
            oralInteractionMinutes: manifest?.oralInteractionMinutes
        };

        entries.set(lessonNumber, entry);
        if (entry.type === 'content') dataSource.lessons[lessonNumber] = entry;
        else dataSource.reviews[lessonNumber] = entry;
        dataSource.lessonTitles[lessonNumber - 1] = entry.title;
        dataSource.unitLabels[lessonNumber - 1] = entry.type === 'content' ? 'Integrated Content' : 'Conversation Activities';
        return entry;
    }

    function get(number) {
        return entries.get(Number(number));
    }

    globalScope.A1V3_DATA = dataSource;
    globalScope.A1V3LessonRegistry = Object.freeze({
        register,
        get,
        has: number => entries.has(Number(number)),
        lesson,
        review,
        helpers: Object.freeze({ v, x, p, t, line, dialogue, question, reading, activity, homework, focus, speaking, comm })
    });
}(window));
