document.addEventListener('DOMContentLoaded', () => {
    const db = typeof window.db !== 'undefined' ? window.db : firebase.firestore();
    const loadingDiv = document.getElementById('loading');
    const grid = document.getElementById('lessons-grid');

    const lessonTitles = [
        'Hello, World!', 'Where Are You From?', 'My World', 'The Alphabet & Numbers', 'Contact Information',
        'Everyday Objects', 'This or That?', 'Review (Module 1)', 'My Daily Routine', 'His/Her Routine',
        'Do You Like Music?', "I Don't Like That", 'Object Pronouns', 'How Often?', 'What Time Is It?',
        'Review (Module 2)', "Possessive 's", 'My Job', 'My House', 'Where Is the Bank?',
        'How Much / How Many?', 'A Little / A Few', "Can / Can't", 'What Are You Doing?',
        'Simple Present vs. Continuous', 'Review (Module 3)', 'Where Were You Born?', 'What Did You Do Yesterday?',
        'Questions in the Past', 'Future Plans', 'Final Review', 'Final Project'
    ];

    const unitLabels = [
        'Foundations', 'Foundations', 'Foundations', 'Foundations', 'Foundations', 'Foundations', 'Foundations', 'Checkpoint 1',
        'Daily Life', 'Daily Life', 'Daily Life', 'Daily Life', 'Daily Life', 'Daily Life', 'Daily Life', 'Checkpoint 2',
        'Places & People', 'Places & People', 'Places & People', 'Places & People', 'Places & People', 'Places & People', 'Places & People', 'Actions Now',
        'Actions Now', 'Checkpoint 3', 'Past & Future', 'Past & Future', 'Past & Future', 'Past & Future', 'Final Review', 'Final Project'
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
            ? 'Concluída'
            : state === 'next'
                ? 'Disponível agora'
                : 'Bloqueada';

        const card = document.createElement('a');
        card.href = canOpen ? `licao-${padded}.html` : '#';
        card.className = `lesson-card ${state}`;
        card.dataset.lesson = String(lessonNumber);
        card.setAttribute('aria-disabled', canOpen ? 'false' : 'true');

        card.innerHTML = `
            <div class="lesson-card-top">
                <span class="lesson-unit text-emerald-700">${unitLabels[lessonNumber - 1]}</span>
                <i class="fas ${iconClass} text-2xl"></i>
            </div>
            <div>
                <h3 class="lesson-title">${title}</h3>
                <p class="lesson-meta mt-2">Lição ${lessonNumber}</p>
            </div>
            <div class="lesson-state">
                <i class="fas ${state === 'locked' ? 'fa-lock' : state === 'completed' ? 'fa-award' : 'fa-forward'} text-emerald-600"></i>
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
            return { role, studentId: localStorage.getItem('selectedStudentId') };
        }

        const user = firebase.auth().currentUser;
        return { role, studentId: user ? user.uid : null };
    }

    async function loadLessons() {
        try {
            const { role, studentId } = await resolveViewerContext();
            if (!studentId) throw new Error('Usuário não identificado.');

            const isProfessor = role === 'professor';
            const doc = await db.collection('students').doc(studentId).get();
            const allProgress = doc.exists && doc.data().progress ? doc.data().progress : {};
            const progress = allProgress.a1 || {};

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
            console.error('Erro ao carregar lições A1:', error);
            loadingDiv.textContent = 'Erro ao carregar lições.';
        }
    }

    firebase.auth().onAuthStateChanged(() => {
        if (localStorage.getItem('loggedInUserRole') === 'professor' || firebase.auth().currentUser) {
            loadLessons();
        } else {
            loadingDiv.textContent = 'Faça login para ver as lições.';
        }
    });
});

