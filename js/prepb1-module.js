document.addEventListener('DOMContentLoaded', () => {
    const db = typeof window.db !== 'undefined' ? window.db : firebase.firestore();
    const platformAccess = window.PlatformAccess;
    const loadingDiv = document.getElementById('loading');
    const grid = document.getElementById('lessons-grid');

    const lessonTitles = [
        'Daily Life, Preferences and Longer Answers',
        'Past Events, Experiences and Personal Stories',
        'Plans, Invitations and Future Arrangements',
        'Around Town, Directions and Small Problems',
        'Food, Health and Everyday Advice',
        'Study, Work and Communication Routines',
        'Travel, Service Situations and Practical English',
        'Bridge Review Project: Read, Speak and Respond'
    ];

    const unitLabels = [
        'Bridge 1', 'Bridge 1', 'Bridge 1', 'Bridge 1',
        'Bridge 2', 'Bridge 2', 'Bridge 2', 'Final Review'
    ];

    function buildLessonCard(title, lessonNumber, state, isProfessor) {
        const padded = String(lessonNumber).padStart(2, '0');
        const canOpen = isProfessor || state !== 'locked';
        const iconClass = state === 'completed'
            ? 'fa-check-circle text-green-500'
            : state === 'next'
                ? 'fa-play-circle text-teal-600'
                : 'fa-lock text-slate-400';
        const stateText = state === 'completed'
            ? 'Concluida'
            : state === 'next'
                ? 'Disponivel agora'
                : 'Bloqueada';

        const card = document.createElement('a');
        card.href = canOpen ? `licao-${padded}.html` : '#';
        card.className = `lesson-card ${state}`;
        card.dataset.lesson = String(lessonNumber);
        card.setAttribute('aria-disabled', canOpen ? 'false' : 'true');

        card.innerHTML = `
            <div class="lesson-card-top">
                <span class="lesson-unit text-teal-700">${unitLabels[lessonNumber - 1]}</span>
                <i class="fas ${iconClass} text-2xl"></i>
            </div>
            <div>
                <p class="lesson-meta mt-2">Licao ${lessonNumber}</p>
                <h3 class="lesson-title mt-2">${title}</h3>
            </div>
            <div class="lesson-state">
                <i class="fas ${state === 'locked' ? 'fa-lock' : state === 'completed' ? 'fa-award' : 'fa-forward'} text-teal-700"></i>
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
            throw new Error('Perfil sem acesso ao modulo.');
        }

        return { role, studentId: user.uid };
    }

    async function loadLessons() {
        try {
            const { role, studentId } = await resolveViewerContext();
            if (!studentId) throw new Error('Usuario nao identificado.');

            const isProfessor = role === 'professor' || role === 'admin';
            const doc = await db.collection('students').doc(studentId).get();
            const studentData = doc.exists ? doc.data() : {};
            const allProgress = studentData.progress ? studentData.progress : {};
            const progress = allProgress.prepb1 || {};
            const allowedProducts = Array.isArray(studentData.accessibleProducts) && studentData.accessibleProducts.length
                ? studentData.accessibleProducts
                : Array.isArray(studentData.modules) && studentData.modules.length
                    ? studentData.modules
                    : [];

            if (platformAccess && !platformAccess.canAccessModule(allowedProducts, 'prepb1')) {
                loadingDiv.textContent = 'Este aluno nao possui acesso a esta ponte.';
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
            console.error('Erro ao carregar licoes da ponte A2-B1:', error);
            loadingDiv.textContent = 'Erro ao carregar licoes.';
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
