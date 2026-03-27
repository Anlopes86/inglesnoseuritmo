document.addEventListener('DOMContentLoaded', () => {
    const db = typeof window.db !== 'undefined' ? window.db : firebase.firestore();
    const loadingDiv = document.getElementById('loading');
    const grid = document.getElementById('lessons-grid');

    const lessonTitles = [
        "Life So Far",
        "Since, For, Already, Yet",
        "Experiences and Milestones",
        "Used To and Change Over Time",
        "Future Plans and Arrangements",
        "Predictions and Possibilities",
        "First Conditional in Real Life",
        "Review 1: Past, Present and Future",
        "Opinions and Polite Disagreement",
        "Making Suggestions and Decisions",
        "Comparatives, Too and Enough",
        "Advice, Rules and Expectations",
        "Relative Clauses for Clearer Descriptions",
        "Passive Voice in Everyday English",
        "News, Updates and Main Ideas",
        "Review 2: Communicate Clearly",
        "Stories in Progress",
        "Sequence and Background",
        "Reported Speech for Daily Conversations",
        "Problems, Causes and Solutions",
        "Travel Plans and Unexpected Issues",
        "Health, Stress and Wellbeing",
        "Study, Work and Career Paths",
        "Review 3: Real-World Communication",
        "Technology and Digital Habits",
        "The Environment and Responsible Choices",
        "Money, Shopping and Smart Decisions",
        "Relationships and Social Situations",
        "Wishes, Regrets and Possibilities",
        "Presenting and Persuading",
        "Final Project Workshop",
        "B1 Final Project and Can-Do Check"
    ];

    const unitLabels = [
        "Block 1", "Block 1", "Block 1", "Block 1", "Block 1", "Block 1", "Block 1", "Review 1",
        "Block 2", "Block 2", "Block 2", "Block 2", "Block 2", "Block 2", "Block 2", "Review 2",
        "Block 3", "Block 3", "Block 3", "Block 3", "Block 3", "Block 3", "Block 3", "Review 3",
        "Block 4", "Block 4", "Block 4", "Block 4", "Block 4", "Block 4", "Block 4", "Final Project"
    ];

    function buildLessonCard(title, lessonNumber, state, isProfessor) {
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
        card.href = canOpen ? `licao-${padded}.html` : '#';
        card.className = `lesson-card bg-white rounded-3xl p-6 flex flex-col gap-4 ${state}`;
        card.dataset.lesson = String(lessonNumber);
        card.setAttribute('aria-disabled', canOpen ? 'false' : 'true');

        card.innerHTML = `
            <div class="flex items-center justify-between gap-3">
                <span class="text-xs font-extrabold uppercase tracking-[0.2em] text-rose-600">${unitLabels[lessonNumber - 1]}</span>
                <i class="fas ${iconClass} text-2xl"></i>
            </div>
            <div>
                <h3 class="font-bold text-lg text-slate-900 leading-snug">${title}</h3>
                <p class="text-sm text-slate-500 mt-2">Licao ${lessonNumber}</p>
            </div>
            <div class="mt-auto text-sm text-slate-600 flex items-center gap-2">
                <i class="fas ${state === 'locked' ? 'fa-lock' : state === 'completed' ? 'fa-award' : 'fa-forward'} text-rose-500"></i>
                ${stateText}
            </div>
        `;

        if (!canOpen) {
            card.addEventListener('click', (event) => event.preventDefault());
        }

        return card;
    }

    async function resolveViewerContext() {
        const role = localStorage.getItem('loggedInUserRole') || 'aluno';
        if (role === 'professor') {
            return {
                role,
                studentId: localStorage.getItem('selectedStudentId')
            };
        }

        const user = firebase.auth().currentUser;
        return {
            role,
            studentId: user ? user.uid : null
        };
    }

    async function loadLessons() {
        try {
            const { role, studentId } = await resolveViewerContext();
            if (!studentId) {
                throw new Error('Usuario nao identificado.');
            }

            const isProfessor = role === 'professor';
            const doc = await db.collection('students').doc(studentId).get();
            const allProgress = doc.exists && doc.data().progress ? doc.data().progress : {};
            const progress = allProgress.b1 || {};

            let firstUncompleted = lessonTitles.findIndex((_, index) => progress[`lesson_${index + 1}`] !== true) + 1;
            if (firstUncompleted === 0) {
                firstUncompleted = lessonTitles.length + 1;
            }

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
            console.error('Erro ao carregar licoes B1:', error);
            loadingDiv.textContent = 'Erro ao carregar licoes.';
        }
    }

    firebase.auth().onAuthStateChanged(() => {
        if (localStorage.getItem('loggedInUserRole') === 'professor' || firebase.auth().currentUser) {
            loadLessons();
        } else {
            loadingDiv.textContent = 'Por favor, faca login para ver as licoes.';
        }
    });
});
