(function initializeA2V3ModuleCards(globalScope) {
    'use strict';

    const materials = Object.freeze({
        vocabulary: Object.freeze({ icon: 'fa-spell-check', label: 'Vocabulary' }),
        grammar: Object.freeze({ icon: 'fa-book-open', label: 'Grammar' }),
        reading: Object.freeze({ icon: 'fa-book-reader', label: 'Reading' }),
        music: Object.freeze({ icon: 'fa-music', label: 'Music' }),
        listening: Object.freeze({ icon: 'fa-headphones', label: 'Listening' }),
        realWorldInput: Object.freeze({ icon: 'fa-earth-americas', label: 'Real-world Input' }),
        rolePlay: Object.freeze({ icon: 'fa-masks-theater', label: 'Role-play' }),
        speaking: Object.freeze({ icon: 'fa-microphone-lines', label: 'Speaking' }),
        review: Object.freeze({ icon: 'fa-arrows-rotate', label: 'Review' }),
        speakingChallenge: Object.freeze({ icon: 'fa-trophy', label: 'Speaking Challenge' }),
        learningActivities: Object.freeze({ icon: 'fa-layer-group', label: 'Learning Activities' })
    });
    const presentationByLessonKind = Object.freeze({
        lexical: Object.freeze({
            label: 'Language Building',
            materials: Object.freeze([materials.vocabulary, materials.grammar, materials.reading, materials.music])
        }),
        communicative: Object.freeze({
            label: 'Conversation Practice',
            materials: Object.freeze([materials.listening, materials.realWorldInput, materials.rolePlay, materials.speaking])
        }),
        consolidation: Object.freeze({
            label: 'Review Mission',
            materials: Object.freeze([materials.review, materials.listening, materials.speakingChallenge])
        })
    });
    const unknownPresentation = Object.freeze({
        label: 'Lesson Overview',
        materials: Object.freeze([materials.learningActivities])
    });

    function warnAboutUnknownMetadata(entry, field) {
        const logger = globalScope.console || console;
        logger.warn('[A2-V3 module] Metadado curricular desconhecido; usando fallback explícito.', {
            field,
            curriculumId: entry?.id || null,
            lessonNumber: entry?.number || null,
            lessonKind: entry?.lessonKind || null
        });
    }

    function getCardModel(entry) {
        if (!entry || typeof entry !== 'object') {
            warnAboutUnknownMetadata(entry, 'entry');
            return {
                curriculumId: null,
                number: null,
                title: 'Lesson unavailable',
                ...unknownPresentation
            };
        }

        const presentation = presentationByLessonKind[entry.lessonKind];
        if (!presentation) warnAboutUnknownMetadata(entry, 'lessonKind');

        const canonicalTitle = typeof entry.title === 'string' ? entry.title.trim() : '';
        if (!canonicalTitle) warnAboutUnknownMetadata(entry, 'title');

        return {
            curriculumId: entry.id || null,
            number: Number(entry.number) || null,
            title: canonicalTitle || (entry.number ? `Lesson ${entry.number}` : 'Lesson unavailable'),
            ...(presentation || unknownPresentation)
        };
    }

    globalScope.A2V3ModuleCards = Object.freeze({ getCardModel });
}(window));

document.addEventListener('DOMContentLoaded', () => {
    const db = typeof window.db !== 'undefined' ? window.db : firebase.firestore();
    const platformAccess = window.PlatformAccess;
    const loadingDiv = document.getElementById('loading');
    const grid = document.getElementById('lessons-grid');

    const moduleId = 'a2-v3';
    const accessModuleId = moduleId;
    const curriculumEntries = window.V3Curriculum?.getModule(moduleId) || [];
    const expectedLessonCount = 32;
    if (curriculumEntries.length !== expectedLessonCount) {
        console.warn(`[A2-V3 module] Manifesto curricular incompleto: esperadas ${expectedLessonCount} aulas, recebidas ${curriculumEntries.length}.`);
    }
    const lessonCards = curriculumEntries.map(entry => window.A2V3ModuleCards.getCardModel(entry));

    function buildLessonCard(cardModel, state, isProfessor, owner) {
        const { curriculumId, number: lessonNumber, title, label, materials } = cardModel;
        const padded = String(lessonNumber).padStart(2, '0');
        const canOpen = isProfessor || state !== 'locked';
        const iconClass = state === 'completed'
            ? 'fa-check-circle text-green-500'
            : state === 'next'
                ? 'fa-play-circle text-blue-500'
                : 'fa-lock text-slate-400';
        const stateText = state === 'completed'
            ? 'Concluída'
            : state === 'next'
                ? 'Disponível agora'
                : 'Bloqueada';
        const materialBadges = materials
            .map(meta => `<span class="lesson-material-pill" title="${meta.label}"><i class="fas ${meta.icon}"></i>${meta.label}</span>`)
            .join('');

        const card = document.createElement('a');
        card.href = canOpen ? window.StudentContext.link(`licao-${padded}.html`, owner) : '#';
        card.className = `lesson-card ${state}`;
        card.dataset.lesson = String(lessonNumber);
        if (curriculumId) card.dataset.curriculumId = curriculumId;
        card.setAttribute('aria-disabled', canOpen ? 'false' : 'true');

        card.innerHTML = `
            <div class="lesson-card-top">
                <span class="lesson-unit text-violet-700">${label}</span>
                <i class="fas ${iconClass} text-2xl"></i>
            </div>
            <div>
                <h3 class="lesson-title">${title}</h3>
                <p class="lesson-meta mt-2">Lição ${lessonNumber}</p>
                <div class="lesson-materials" aria-label="Materiais da aula">${materialBadges}</div>
            </div>
            <div class="lesson-state">
                <i class="fas ${state === 'locked' ? 'fa-lock' : state === 'completed' ? 'fa-award' : 'fa-forward'} text-violet-600"></i>
                ${stateText}
            </div>
        `;

        if (!canOpen) {
            card.addEventListener('click', (event) => event.preventDefault());
        }

        return card;
    }

    async function resolveViewerContext() {
        const context = await window.StudentContextReady;
        if (!context) throw new Error('Recarregue a página para validar o aluno.');
        const result = await context.resolve(db, firebase.auth().currentUser);
        context.wireLinks(result);
        return result;
    }

    async function loadLessons() {
        try {
            if (lessonCards.length !== expectedLessonCount) {
                throw new Error('Manifesto curricular A2 V3 indisponível ou incompleto.');
            }

            const owner = await resolveViewerContext();
            const { role, studentId } = owner;
            if (!studentId) throw new Error('Usuário não identificado.');

            const isProfessor = role === 'professor' || role === 'admin';
            const doc = await db.collection('students').doc(studentId).get();
            const studentData = doc.exists ? doc.data() : {};
            const allProgress = studentData.progress || {};
            const progress = allProgress[moduleId] || {};
            const allowedProducts = platformAccess?.getStudentAccessibleProducts
                ? platformAccess.getStudentAccessibleProducts(studentData)
                : [
                    ...(Array.isArray(studentData.accessibleProducts) ? studentData.accessibleProducts : []),
                    ...(Array.isArray(studentData.modules) ? studentData.modules : []),
                    ...(studentData.studentType ? [studentData.studentType] : [])
                ];

            if (platformAccess && !platformAccess.canAccessModule(allowedProducts, accessModuleId)) {
                loadingDiv.textContent = 'Este aluno não possui acesso ao módulo A2.';
                return;
            }

            const firstUncompletedIndex = lessonCards.findIndex(card => !window.V3Curriculum?.isLessonComplete(allProgress, moduleId, card.curriculumId));

            grid.innerHTML = '';
            lessonCards.forEach((cardModel, index) => {
                const isCompleted = window.V3Curriculum?.isLessonComplete(allProgress, moduleId, cardModel.curriculumId);
                const state = isCompleted ? 'completed' : (isProfessor || index === firstUncompletedIndex) ? 'next' : 'locked';
                grid.appendChild(buildLessonCard(cardModel, state, isProfessor, owner));
            });

            loadingDiv.classList.add('hidden');
            grid.classList.remove('hidden');
        } catch (error) {
            console.error('Erro ao carregar lições A2 V3:', error);
            loadingDiv.textContent = error.message || 'Erro ao carregar lições. Recarregue a página.';
        }
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            loadLessons();
        } else {
            grid.innerHTML = '';
            grid.classList.add('hidden');
            loadingDiv.classList.remove('hidden');
            loadingDiv.textContent = 'Faça login para ver as lições.';
        }
    });
});
