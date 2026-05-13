document.addEventListener('DOMContentLoaded', () => {
    const db = typeof window.db !== 'undefined' ? window.db : firebase.firestore();
    const platformAccess = window.PlatformAccess;
    const loadingDiv = document.getElementById('loading');
    const grid = document.getElementById('lessons-grid');

    const moduleId = 'a2-v2';
    const accessModuleId = 'a2';

    const lessonTitles = [
        'Past Simple: Regular & Irregular Review', 'Complete Past Stories', 'Comparatives in Context', 'Superlatives and Irregular Adjectives',
        'Articles and Quantifiers', 'Setting the Scene: Past Continuous', 'Interrupted Stories', 'Review & Rock Out! #1',
        'Going To for Plans', 'Will for Predictions and Decisions', 'Present Continuous for Future Plans', 'Future Review in Real Situations',
        'Can, Could and Permission', 'Must, Have To and Need To', 'Should for Advice', 'Review & Rock Out! #2',
        'Present Perfect: Experiences', 'Ever, Never, Already and Yet', 'Present Perfect vs Past Simple', 'Been and Gone',
        'Health Problems and Advice', 'Medical Consultation & Conditions', 'Prepositions of Place', 'Review & Rock Out! #3',
        'Prepositions of Movement', 'Prepositions of Time', 'From A to B: Directions', 'At the Hotel',
        'Gerunds and Infinitives', 'Zero and First Conditional', 'Unless, Wishes and Real-Life Hopes', 'Final Review and Project'
    ];

    const unitLabels = [
        'Past Stories', 'Past Stories', 'Comparisons', 'Comparisons',
        'Nouns & Quantity', 'Storytelling', 'Storytelling', 'Checkpoint 1',
        'Future', 'Future', 'Future', 'Future Review',
        'Modals', 'Modals', 'Advice', 'Checkpoint 2',
        'Experiences', 'Experiences', 'Experiences', 'Experiences',
        'Health', 'Health', 'Prepositions', 'Checkpoint 3',
        'Prepositions', 'Prepositions', 'Directions', 'Real-Life English',
        'Verb Patterns', 'Conditionals', 'Conditionals', 'Final Project'
    ];

    const materialMeta = {
        grammar: { icon: 'fa-book-open', label: 'Gramática+' },
        translation: { icon: 'fa-language', label: 'PT-EN' },
        speaking: { icon: 'fa-microphone-lines', label: 'Fala' },
        quiz: { icon: 'fa-circle-question', label: 'Quiz' },
        writing: { icon: 'fa-pen', label: 'Escrita' },
        listening: { icon: 'fa-headphones', label: 'Listening' }
    };

    function getLessonMaterials(lessonNumber) {
        if (lessonNumber % 4 === 0 || lessonNumber === 32) {
            return ['grammar', 'translation', 'quiz', 'writing'];
        }

        if ([6, 10, 17, 23, 29, 30, 31].includes(lessonNumber)) {
            return ['grammar', 'translation', 'speaking', 'listening'];
        }

        return ['grammar', 'translation', 'speaking', 'quiz'];
    }

    function buildLessonCard(title, lessonNumber, state, isProfessor) {
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
        const materialBadges = getLessonMaterials(lessonNumber)
            .map((key) => {
                const meta = materialMeta[key];
                return `<span class="lesson-material-pill"><i class="fas ${meta.icon}"></i>${meta.label}</span>`;
            })
            .join('');

        const card = document.createElement('a');
        card.href = canOpen ? `licao-${padded}.html` : '#';
        card.className = `lesson-card ${state}`;
        card.dataset.lesson = String(lessonNumber);
        card.setAttribute('aria-disabled', canOpen ? 'false' : 'true');

        card.innerHTML = `
            <div class="lesson-card-top">
                <span class="lesson-unit text-violet-700">${unitLabels[lessonNumber - 1]}</span>
                <i class="fas ${iconClass} text-2xl"></i>
            </div>
            <div>
                <h3 class="lesson-title">${title}</h3>
                <p class="lesson-meta mt-2">Lição ${lessonNumber}</p>
                <div class="lesson-materials">${materialBadges}</div>
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
        const user = firebase.auth().currentUser;
        if (!user) {
            return { role: 'aluno', studentId: null };
        }

        const viewerDoc = await db.collection('students').doc(user.uid).get();
        const viewerData = viewerDoc.exists ? viewerDoc.data() : {};
        const role = viewerData.role || localStorage.getItem('loggedInUserRole') || 'aluno';

        if (role === 'professor' || role === 'admin') {
            const studentId = localStorage.getItem('selectedStudentId');
            if (!studentId) {
                return { role, studentId: null };
            }

            const studentDoc = await db.collection('students').doc(studentId).get();
            if (!studentDoc.exists) {
                return { role, studentId: null };
            }

            if (role === 'professor' && studentDoc.data().teacherId !== user.uid) {
                throw new Error('Acesso negado ao aluno selecionado.');
            }

            return { role, studentId };
        }

        if (role !== 'aluno') {
            throw new Error('Perfil sem acesso ao módulo.');
        }

        return { role, studentId: user.uid };
    }

    async function loadLessons() {
        try {
            const { role, studentId } = await resolveViewerContext();
            if (!studentId) throw new Error('Usuário não identificado.');

            const isProfessor = role === 'professor' || role === 'admin';
            const doc = await db.collection('students').doc(studentId).get();
            const studentData = doc.exists ? doc.data() : {};
            const progress = (studentData.progress || {})[moduleId] || {};
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

            let firstUncompleted = lessonTitles.findIndex((_, index) => progress[`lesson_${index + 1}`] !== true) + 1;
            if (firstUncompleted === 0) firstUncompleted = lessonTitles.length + 1;

            grid.innerHTML = '';
            lessonTitles.forEach((title, index) => {
                const lessonNumber = index + 1;
                const isCompleted = progress[`lesson_${lessonNumber}`] === true;
                const state = isCompleted ? 'completed' : lessonNumber === firstUncompleted ? 'next' : 'locked';
                grid.appendChild(buildLessonCard(title, lessonNumber, state, isProfessor));
            });

            loadingDiv.classList.add('hidden');
            grid.classList.remove('hidden');
        } catch (error) {
            console.error('Erro ao carregar lições A2 V2:', error);
            loadingDiv.textContent = 'Erro ao carregar lições.';
        }
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            loadLessons();
        } else {
            loadingDiv.textContent = 'Faça login para ver as lições.';
        }
    });
});
