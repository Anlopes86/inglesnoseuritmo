(function installA1V3LessonRegistry(globalScope) {
    'use strict';

    if (globalScope.A1V3LessonRegistry) return;

    const entries = new Map();
    const dataSource = { lessons: {}, reviews: {}, lessonTitles: [], unitLabels: [] };
    const v = (word, meaning, example, translation) => [word, meaning, example, translation];
    const x = (phrase, meaning, note, example, translation) => [phrase, meaning, note, example, translation];
    const p = (type, prompt, answer) => [type, prompt, '', answer];
    const t = (portuguese, english) => [portuguese, english];
    const line = (speaker, english, portuguese) => [speaker, english, portuguese];
    const dialogue = (title, ...lines) => ({ title, lines });
    const question = (prompt, answer) => [prompt, answer];
    const reading = (title, text, ...questions) => ({ title, text, questions });
    const activity = (title, instruction, items, eyebrow = 'Practice Time') => ({ title, instruction, items, eyebrow });
    const ROUTE_TIERS = Object.freeze(['core', 'extended', 'extra']);
    const ROUTE_BANDS = Object.freeze([
        Object.freeze({ tier: 'core', label: 'CORE', description: 'aula de 60 minutos' }),
        Object.freeze({ tier: 'extended', label: 'EXTENDED', description: 'usar se houver tempo' }),
        Object.freeze({ tier: 'extra', label: 'EXTRA', description: 'revisão ou referência' })
    ]);

    function homework(optionsOrInstruction, legacyThemes = [], legacyChecklist = [], legacyMeta = {}) {
        if (Array.isArray(optionsOrInstruction)) {
            return {
                label: 'Homework',
                heading: 'Choose one option.',
                instruction: 'Choose one option.',
                options: optionsOrInstruction.map(option => ({ ...option })),
                source: 'current-authored-content',
                usesFallback: false,
                ...legacyThemes
            };
        }

        // Kept temporarily readable so an incomplete migration fails audits instead
        // of making a published lesson disappear. Final A1 data must use options.
        return {
            instruction: optionsOrInstruction,
            themes: legacyThemes,
            checklist: legacyChecklist,
            source: 'legacy-theme-contract',
            usesFallback: true,
            ...legacyMeta
        };
    }

    const route = (config = {}) => ({ ...config, source: 'current-authored-content' });
    const comm = (type, title, instruction, config = {}) => ({ type, title, instruction, ...config });

    function defaultRouteFor(lessonKind) {
        const shared = {
            defaultMode: 'core',
            bands: ROUTE_BANDS.map(item => ({ ...item })),
            limits: {
                vocabulary: 8,
                activities: 6,
                translations: 6,
                expressions: 6,
                dialogues: 3,
                conversationQuestions: 4,
                verbRows: 8
            }
        };

        if (lessonKind === 'lexical') {
            return {
                ...shared,
                vocabularyCoreCount: 8,
                verbCoreCount: 8,
                activityCoreCount: 6,
                translationCoreCount: 4,
                expressionCoreCount: 6,
                dialogueCoreCount: 2,
                readingQuestionCoreCount: 3,
                conversationCoreCount: 4,
                introDialogueCoreLines: 6,
                grammarTier: 'core',
                readingTier: 'core',
                expressionTranslationTier: 'extended',
                authoredSlideTiers: {}
            };
        }

        if (lessonKind === 'consolidation') {
            return {
                ...shared,
                retrievalFocusCount: 4,
                reviewBankTier: 'extended',
                readingTier: 'extended',
                communicativeCoreCount: 3,
                oralCoreCount: 3,
                diagnosticMenu: true
            };
        }

        return {
            ...shared,
            retrievalFocusCount: 4,
            reviewBankTier: 'extended',
            readingTier: 'extended',
            communicativeCoreCount: 3,
            oralCoreCount: 3,
            diagnosticMenu: false
        };
    }

    function normalizeRoute(authoredRoute, lessonKind) {
        const defaults = defaultRouteFor(lessonKind);
        const authored = authoredRoute && typeof authoredRoute === 'object' ? authoredRoute : {};
        const routeContract = {
            ...defaults,
            ...authored,
            limits: { ...defaults.limits, ...(authored.limits || {}) },
            bands: ROUTE_BANDS.map(item => ({ ...item })),
            source: authored.source || 'registry-auditable-default'
        };
        routeContract.authoredSlideTiers = { ...(defaults.authoredSlideTiers || {}), ...(authored.authoredSlideTiers || {}) };
        return routeContract;
    }

    function normalizeHomework(authoredHomework, manifest) {
        const options = Array.isArray(authoredHomework?.options) ? authoredHomework.options : [];
        const usesFallback = authoredHomework?.usesFallback !== false || options.length !== 3;
        const normalizedOptions = options.map((task, index) => ({
            option: task.option || String.fromCharCode(65 + index),
            kind: task.kind || '',
            title: task.title || '',
            instruction: task.instruction || '',
            source: task.source || authoredHomework.source || 'current-authored-content',
            usesFallback: task.usesFallback ?? usesFallback,
            curriculumId: manifest?.id || null,
            semanticTags: Array.isArray(task.semanticTags) && task.semanticTags.length
                ? [...task.semanticTags]
                : [...(manifest?.languageTags || [])]
        }));
        return {
            label: authoredHomework?.label || 'Homework',
            heading: options.length ? 'Choose one option.' : (authoredHomework?.heading || 'Para a próxima aula'),
            instruction: authoredHomework?.instruction || '',
            themes: Array.isArray(authoredHomework?.themes) ? [...authoredHomework.themes] : [],
            checklist: Array.isArray(authoredHomework?.checklist) ? [...authoredHomework.checklist] : [],
            options: normalizedOptions,
            source: authoredHomework?.source || 'missing-authored-homework',
            usesFallback,
            curriculumId: manifest?.id || null,
            semanticTags: [...(manifest?.languageTags || [])],
            extendedChallenge: authoredHomework?.extendedChallenge || null,
            extraChallenge: authoredHomework?.extraChallenge || null
        };
    }

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
            homework: homework('Revise a linguagem da aula.', ['Use a linguagem em uma situação pessoal.'], ['Consigo produzir frases completas sem ler.']),
            ...config,
            expressions,
            expressionTranslations: config.expressionTranslations || expressions
                .map(item => [item[4], item[3]])
                .filter(([portuguese, english]) => portuguese && english)
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
        if (!Number.isInteger(lessonNumber) || lessonNumber < 1 || lessonNumber > (globalScope.V3Curriculum?.getModule('a1-v3').length || 38)) {
            throw new RangeError(`Número de lição A1-V3 inválido: ${number}`);
        }
        if (!value || typeof value !== 'object') throw new TypeError(`Conteúdo inválido para a lição ${lessonNumber}.`);

        const manifest = globalScope.V3Curriculum?.getLesson('a1-v3', lessonNumber);
        const lessonKind = manifest?.lessonKind || (value.type === 'content' ? 'lexical' : 'communicative');
        const entry = {
            ...value,
            number: lessonNumber,
            title: value.title || manifest?.title || `Lesson ${lessonNumber}`,
            type: value.type || manifest?.type || 'content',
            lessonKind,
            curriculumId: manifest?.id,
            curriculumVersion: manifest?.version,
            linguisticFocus: manifest?.linguisticFocus,
            reviewOf: manifest?.reviewOf ? [...manifest.reviewOf] : [],
            cefrObjectives: manifest?.cefrObjectives ? [...manifest.cefrObjectives] : [],
            oralInteractionMinutes: manifest?.oralInteractionMinutes,
            route: normalizeRoute(value.route, lessonKind),
            homework: normalizeHomework(value.homework, manifest)
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

    const previewEntries = new Map();
    function registerPreview(id, content) {
        const manifest = globalScope.V3Curriculum?.a1PreviewLessons.find(item => item.id === id);
        if (!manifest) throw new Error(`Manifesto de prévia ausente: ${id}`);
        if (!content.slides?.length || new Set(content.slides.map(item => item.id)).size !== content.slides.length) throw new Error(`Slides inválidos: ${id}`);
        if (!content.mission?.semanticTags?.some(tag => manifest.languageTags.includes(tag))) throw new Error(`Missão incompatível: ${id}`);
        const entry = Object.freeze({ ...content, ...manifest, curriculumId: id });
        previewEntries.set(id, entry);
        return entry;
    }

    globalScope.A1V3_DATA = dataSource;
    globalScope.A1V3LessonRegistry = Object.freeze({
        register,
        registerPreview,
        getPreview: id => previewEntries.get(id),
        get,
        has: number => entries.has(Number(number)),
        lesson,
        review,
        routeTiers: [...ROUTE_TIERS],
        routeBands: ROUTE_BANDS.map(item => ({ ...item })),
        helpers: Object.freeze({ v, x, p, t, line, dialogue, question, reading, activity, homework, route, focus, speaking, comm })
    });
}(window));
