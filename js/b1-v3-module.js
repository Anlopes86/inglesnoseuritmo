document.addEventListener('DOMContentLoaded', () => {
    const db = typeof window.db !== 'undefined' ? window.db : firebase.firestore();
    const platformAccess = window.PlatformAccess;
    const loadingDiv = document.getElementById('loading');
    const grid = document.getElementById('lessons-grid');

    const lessonTitles = [
        'Defining Moments', 'Changes in Progress', 'Habits and Adaptation', 'Plans in Motion',
        'Degrees of Certainty', 'Conditions and Backup Plans', 'Stories with Layers', 'Review 1: Time and Change',
        'Opinions with Reasons', 'Polite Disagreement and Clarification', 'Suggestions and Negotiation', 'Comparing Trade-Offs',
        'Rules, Permission and Expectations', 'Relative Clauses for Detail', 'Crime in the News: Passive Voice', 'Review 2: Clear Communication',
        'Reported Speech and Messages', 'Indirect Questions and Polite Requests', 'Problems, Causes and Solutions', 'Complaints and Service Recovery',
        'Travel Disruptions', 'Health, Stress and Wellbeing', 'Work, Study and Career Paths', 'Review 3: Real-World Problem Solving',
        'Technology and Digital Balance', 'Environment and Community Choices', 'Money, Value and Spending', 'Relationships and Social Repair',
        'Second Conditional and Wishes', 'Presenting and Persuading', 'Final Project Workshop', 'B1 Final Project'
    ];

    const unitLabels = [
        'Block 1', 'Block 1', 'Block 1', 'Block 1', 'Block 1', 'Block 1', 'Block 1', 'Review 1',
        'Block 2', 'Block 2', 'Block 2', 'Block 2', 'Block 2', 'Block 2', 'Block 2', 'Review 2',
        'Block 3', 'Block 3', 'Block 3', 'Block 3', 'Block 3', 'Block 3', 'Block 3', 'Review 3',
        'Block 4', 'Block 4', 'Block 4', 'Block 4', 'Block 4', 'Block 4', 'Block 4', 'Final Project'
    ];
    const curriculumEntries = window.V3Curriculum?.getModule('b1-v3') || [];
    if (curriculumEntries.length === 32) {
        lessonTitles.splice(0, lessonTitles.length, ...curriculumEntries.map(entry => entry.title));
        unitLabels.splice(0, unitLabels.length, ...curriculumEntries.map(entry => entry.type === 'content' ? 'Conteúdo integrado' : entry.type === 'review' ? 'Missão comunicativa' : 'Projeto'));
    }

    function buildLessonCard(title, lessonNumber, state, isProfessor, owner) {
        const padded = String(lessonNumber).padStart(2, '0');
        const canOpen = isProfessor || state !== 'locked';
        const iconClass = state === 'completed'
            ? 'fa-check-circle text-green-500'
            : state === 'next'
                ? 'fa-play-circle text-blue-500'
                : 'fa-lock text-slate-400';
        const stateText = state === 'completed'
            ? 'Concluida'
            : state === 'next'
                ? 'Disponivel agora'
                : 'Bloqueada';

        const card = document.createElement('a');
        card.href = canOpen ? window.StudentContext.link(`licao-${padded}.html`, owner) : '#';
        card.className = `lesson-card ${state}`;
        card.dataset.lesson = String(lessonNumber);
        card.setAttribute('aria-disabled', canOpen ? 'false' : 'true');

        card.innerHTML = `
            <div class="lesson-card-top">
                <span class="lesson-unit text-rose-700">${unitLabels[lessonNumber - 1]}</span>
                <i class="fas ${iconClass} text-2xl"></i>
            </div>
            <div>
                <p class="lesson-meta mt-2">Licao ${lessonNumber}</p>
                <h3 class="lesson-title mt-2">${title}</h3>
            </div>
            <div class="lesson-state">
                <i class="fas ${state === 'locked' ? 'fa-lock' : state === 'completed' ? 'fa-award' : 'fa-forward'} text-rose-600"></i>
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
            const owner = await resolveViewerContext();
            const { role, studentId } = owner;
            if (!studentId) throw new Error('Usuario nao identificado.');

            const isProfessor = role === 'professor' || role === 'admin';
            const doc = await db.collection('students').doc(studentId).get();
            const studentData = doc.exists ? doc.data() : {};
            const allProgress = studentData.progress ? studentData.progress : {};
            const progress = allProgress['b1-v3'] || {};
            const allowedProducts = platformAccess?.getStudentAccessibleProducts
                ? platformAccess.getStudentAccessibleProducts(studentData)
                : [
                    ...(Array.isArray(studentData.accessibleProducts) ? studentData.accessibleProducts : []),
                    ...(Array.isArray(studentData.modules) ? studentData.modules : []),
                    ...(studentData.studentType ? [studentData.studentType] : [])
                ];

            if (platformAccess && !(platformAccess.canAccessModule(allowedProducts, 'b1-v3') || platformAccess.canAccessModule(allowedProducts, 'b1'))) {
                loadingDiv.textContent = 'Este aluno nao possui acesso ao modulo B1-V3.';
                return;
            }

            let firstUncompleted = lessonTitles.findIndex((_, index) => !window.V3Curriculum?.isLessonComplete(allProgress, 'b1-v3', index + 1)) + 1;
            if (firstUncompleted === 0) firstUncompleted = lessonTitles.length + 1;

            grid.innerHTML = '';
            lessonTitles.forEach((title, index) => {
                const lessonNumber = index + 1;
                const isCompleted = window.V3Curriculum?.isLessonComplete(allProgress, 'b1-v3', lessonNumber) || progress[`lesson_${lessonNumber}`] === true;
                const state = isCompleted ? 'completed' : lessonNumber === firstUncompleted ? 'next' : 'locked';
                grid.appendChild(buildLessonCard(title, lessonNumber, state, isProfessor, owner));
            });

            loadingDiv.classList.add('hidden');
            grid.classList.remove('hidden');
        } catch (error) {
            console.error('Erro ao carregar licoes B1-V3:', error);
            loadingDiv.textContent = error.message || 'Erro ao carregar lições. Recarregue a página.';
        }
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            loadLessons();
        } else {
            loadingDiv.textContent = 'Faca login para ver as licoes.';
        }
    });
});

