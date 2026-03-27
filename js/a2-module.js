document.addEventListener('DOMContentLoaded', () => {
    const db = typeof window.db !== 'undefined' ? window.db : firebase.firestore();
    const loadingDiv = document.getElementById('loading');
    const grid = document.getElementById('lessons-grid');

    const lessonTitles = [
        "The Past - Regular & Irregular", "Telling a Complete Story", "Comparing Places", "Comparing Opinions",
        "Same or Different?", "Setting the Scene", "Interrupted Stories", "Review & Rock Out! #1",
        "Future Intentions", "Future Predictions", "The Biggest and The Best", "My Favorite Things",
        "Rules at Work", "Do I Have to...?", "Giving Advice", "Review & Rock Out! #2",
        "Life Experiences", "Have You Ever...?", "Never Have I Ever...", "Been or Gone?",
        "What's the Matter?", "Medical Consultation & Conditions", "Asking for Directions", "Review & Rock Out! #3",
        "Giving Directions - The Basics", "Giving Directions - Details", "From A to B", "A2 Review - Grammar",
        "A2 Review - Vocabulary & Speaking", "My A2 Mixtape - Final Project Prep", "Final Project Workshop", "A2 Graduation - Show What You Know!"
    ];

    const unitLabels = [
        "Past Stories", "Past Stories", "Comparisons", "Comparisons", "Comparisons", "Storytelling", "Storytelling", "Checkpoint 1",
        "Future", "Future", "Comparison Power", "Comparison Power", "Work & Rules", "Work & Rules", "Advice", "Checkpoint 2",
        "Experiences", "Experiences", "Experiences", "Experiences", "Health", "Health", "Directions", "Checkpoint 3",
        "Directions", "Directions", "Directions", "A2 Review", "A2 Review", "Final Stretch", "Final Stretch", "Final Project"
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
                <span class="text-xs font-extrabold uppercase tracking-[0.2em] text-violet-600">${unitLabels[lessonNumber - 1]}</span>
                <i class="fas ${iconClass} text-2xl"></i>
            </div>
            <div>
                <h3 class="font-bold text-lg text-slate-900 leading-snug">${title}</h3>
                <p class="text-sm text-slate-500 mt-2">Licao ${lessonNumber}</p>
            </div>
            <div class="mt-auto text-sm text-slate-600 flex items-center gap-2">
                <i class="fas ${state === 'locked' ? 'fa-lock' : state === 'completed' ? 'fa-award' : 'fa-forward'} text-violet-500"></i>
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
            const progress = allProgress.a2 || {};

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
            console.error('Erro ao carregar licoes A2:', error);
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
