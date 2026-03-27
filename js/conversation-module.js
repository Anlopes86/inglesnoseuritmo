document.addEventListener('DOMContentLoaded', () => {
    const db = typeof window.db !== 'undefined' ? window.db : firebase.firestore();
    const loadingDiv = document.getElementById('loading');
    const grid = document.getElementById('lessons-grid');

    const lessonTitles = [
        "Dreams & Ambitions", "Love & Relationships", "Rebellion & Freedom", "City Life vs. Country Life", "Friendship",
        "Overcoming Challenges", "Travel & Adventure", "Work & Career", "Technology & Social Media", "Happiness & Life Philosophy",
        "The Supernatural & Mysteries", "Memory & Nostalgia", "Crime & Justice", "Food & Culture", "Success & Failure",
        "The Future & AI", "Learning & Education", "Animals & Nature", "Sports & Competition", "The Power of Habits",
        "Volunteering & Social Causes", "Art & Creativity", "Money & Personal Finance", "The Gig Economy & Remote Work",
        "The Media, News & Politics", "Psychology & Human Behavior", "History & Historical Figures", "Ethics & Morality",
        "Science & Space Exploration", "Fashion & Personal Style", "Culture & Leisure", "The Modern Face of Love",
        "Childhood & Growing Up", "Conspiracy Theories", "Music, Emotions & Identity", "Aging & Getting Older", "Language & Communication",
        "Mistakes & Regrets", "Heroes & Role Models", "Strange Jobs & Unusual Careers", "The Paradox of Choice", "The Ethics of Biohacking",
        "The Art of Storytelling", "Leadership & Influence", "Winning & Playing Fair", "Identity & Who We Are", "Humor & The Power of Laughter",
        "Comfort Zones & Personal Growth"
    ];

    const unitLabels = [
        "Identity", "Identity", "Conflict", "Lifestyle", "Relationships", "Resilience", "Adventure", "Work",
        "Modern Life", "Mindset", "Mystery", "Memory", "Society", "Culture", "Growth", "Future",
        "Learning", "Nature", "Competition", "Habits", "Impact", "Creativity", "Money", "Work Trends",
        "Media", "Behavior", "History", "Ethics", "Science", "Style", "Culture", "Modern Love",
        "Childhood", "Ideas", "Music", "Aging", "Language", "Reflection", "Inspiration", "Careers",
        "Decisions", "Bioethics", "Narrative", "Leadership", "Fair Play", "Identity", "Humor", "Growth"
    ];

    function buildLessonCard(title, lessonNumber, state, isProfessor) {
        const padded = String(lessonNumber).padStart(2, '0');
        const canOpen = isProfessor || state !== 'locked';
        const iconClass = state === 'completed'
            ? 'fa-check-circle text-green-500'
            : state === 'next'
                ? 'fa-play-circle text-fuchsia-500'
                : 'fa-lock text-slate-400';
        const stateText = state === 'completed'
            ? 'Concluída'
            : state === 'next'
                ? 'Disponível agora'
                : 'Bloqueada';

        const card = document.createElement('a');
        card.href = canOpen ? `licao-${padded}.html` : '#';
        card.className = `lesson-card bg-white rounded-3xl p-6 flex flex-col gap-4 ${state}`;
        card.dataset.lesson = String(lessonNumber);
        card.setAttribute('aria-disabled', canOpen ? 'false' : 'true');

        card.innerHTML = `
            <div class="flex items-center justify-between gap-3">
                <span class="text-xs font-extrabold uppercase tracking-[0.2em] text-fuchsia-600">${unitLabels[lessonNumber - 1]}</span>
                <i class="fas ${iconClass} text-2xl"></i>
            </div>
            <div>
                <h3 class="font-bold text-lg text-slate-100 leading-snug">${title}</h3>
                <p class="text-sm text-slate-400 mt-2">Lição ${lessonNumber}</p>
            </div>
            <div class="mt-auto text-sm text-slate-300 flex items-center gap-2">
                <i class="fas ${state === 'locked' ? 'fa-lock' : state === 'completed' ? 'fa-award' : 'fa-forward'} text-fuchsia-500"></i>
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
                throw new Error('Usuário não identificado.');
            }

            const isProfessor = role === 'professor';
            const doc = await db.collection('students').doc(studentId).get();
            const allProgress = doc.exists && doc.data().progress ? doc.data().progress : {};
            const progress = allProgress.conversation || {};

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
            console.error('Erro ao carregar lições de conversation:', error);
            loadingDiv.textContent = 'Erro ao carregar lições.';
        }
    }

    firebase.auth().onAuthStateChanged(() => {
        if (localStorage.getItem('loggedInUserRole') === 'professor' || firebase.auth().currentUser) {
            loadLessons();
        } else {
            loadingDiv.textContent = 'Por favor, faça login para ver as lições.';
        }
    });
});
