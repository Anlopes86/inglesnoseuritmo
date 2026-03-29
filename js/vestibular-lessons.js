document.addEventListener('DOMContentLoaded', () => {
    if (!firebase || !firebase.apps.length) {
        console.error('Firebase não inicializado! Verifique a ordem dos scripts no HTML.');
        return;
    }

    const db = firebase.firestore();
    const auth = firebase.auth();
    const loadingDiv = document.getElementById('loading');
    const grid = document.getElementById('lessons-grid');
    const moduleId = 'vestibular';

    const lessonTitles = [
        'Leitura Dinâmica: Skimming, Scanning e Vocabulário',
        'Ideia Central e Tópicos Frasais',
        'Linking Words I: Adição e Contraste',
        'Linking Words II: Causa, Consequência e Propósito',
        'Referências Pronominais',
        'Preposições e Phrasal Verbs Essenciais',
        'Tempos Verbais I: Base de Leitura',
        'Tempos Verbais II: Present Perfect e Futuro',
        'Modal Verbs em Questões de Prova',
        'Voz Passiva e Comparativos',
        'Condições e Relações Lógicas',
        'Comparando Ideias e Argumentos',
        'Desconstruindo o Enunciado',
        'Lendo nas Entrelinhas',
        'Pegadinhas, Eliminação e Erros Comuns',
        'Simulado Final e Estratégia de Tempo'
    ];

    const lessonUnits = [
        'Base', 'Base', 'Conectores', 'Conectores',
        'Estrutura', 'Estrutura', 'Gramática', 'Gramática',
        'Gramática', 'Gramática', 'Leitura', 'Leitura',
        'Questões', 'Questões', 'Prova', 'Prova'
    ];

    auth.onAuthStateChanged(user => {
        if (!user) {
            window.location.href = '../login.html';
            return;
        }

        const role = localStorage.getItem('loggedInUserRole') || 'aluno';
        const studentId = role === 'professor' ? localStorage.getItem('selectedStudentId') : user.uid;

        if (!studentId) {
            loadingDiv.innerHTML = '<p class="text-red-500">Erro: ID do aluno não encontrado. Selecione um aluno no painel principal.</p>';
            return;
        }

        loadLessons(studentId, role);
    });

    function buildCard(title, lessonNumber, state, isProfessor) {
        const padded = String(lessonNumber).padStart(2, '0');
        const canOpen = isProfessor || state !== 'locked';
        const iconClass = state === 'completed'
            ? 'fa-check-circle text-green-500'
            : state === 'next'
                ? 'fa-play-circle text-amber-500'
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
                <span class="lesson-unit text-amber-700">${lessonUnits[lessonNumber - 1]}</span>
                <i class="fas ${iconClass} text-2xl"></i>
            </div>
            <div>
                <p class="lesson-meta mt-2">Aula ${lessonNumber}</p>
                <h3 class="lesson-title mt-2">${title}</h3>
            </div>
            <div class="lesson-state">
                <i class="fas ${state === 'locked' ? 'fa-lock' : state === 'completed' ? 'fa-award' : 'fa-forward'} text-amber-600"></i>
                ${stateText}
            </div>
        `;

        if (!canOpen) {
            card.addEventListener('click', event => event.preventDefault());
        }

        return card;
    }

    async function loadLessons(studentId, userRole) {
        try {
            const studentDoc = await db.collection('students').doc(studentId).get();
            const allProgress = studentDoc.exists && studentDoc.data().progress ? studentDoc.data().progress : {};
            const progress = allProgress[moduleId] || {};
            const isProfessor = userRole === 'professor';

            let firstUncompleted = lessonTitles.findIndex((_, index) => progress[`lesson_${index + 1}`] !== true) + 1;
            if (firstUncompleted === 0) firstUncompleted = lessonTitles.length + 1;

            grid.innerHTML = '';
            lessonTitles.forEach((title, index) => {
                const lessonNumber = index + 1;
                const isCompleted = progress[`lesson_${lessonNumber}`] === true;
                const state = isCompleted ? 'completed' : lessonNumber === firstUncompleted ? 'next' : 'locked';
                grid.appendChild(buildCard(title, lessonNumber, state, isProfessor));
            });

            loadingDiv.classList.add('hidden');
            grid.classList.remove('hidden');
        } catch (error) {
            console.error('Erro ao carregar lições do vestibular:', error);
            loadingDiv.innerHTML = '<p class="text-red-500">Ocorreu um erro ao carregar o módulo. Tente novamente.</p>';
        }
    }
});
