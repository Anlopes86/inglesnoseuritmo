document.addEventListener('DOMContentLoaded', () => {
    if (!firebase || !firebase.apps.length) {
        console.error('Firebase nao inicializado! Verifique a ordem dos scripts no HTML.');
        return;
    }

    const db = firebase.firestore();
    const auth = firebase.auth();
    const platformAccess = window.PlatformAccess;
    const loadingDiv = document.getElementById('loading');
    const grid = document.getElementById('lessons-grid');
    const moduleId = 'vestibular';

    const lessonTitles = [
        'Leitura Ativa: Skimming, Scanning e Inferencia',
        'Ideia Central, Tese e Topicos Frasais',
        'Linking Words I: Adicao e Contraste',
        'Linking Words II: Causa, Consequencia e Proposito',
        'Pronomes e Coesao Referencial',
        'Phrasal Verbs e Preposicoes Essenciais',
        'Tempos Verbais I: Rotina, Agora e Narrativa',
        'Tempos Verbais II: Present Perfect e Futuro',
        'Modal Verbs em Questoes de Prova',
        'Voz Passiva, Comparativos e Superlativos',
        'Condicionais e Relacoes Logicas',
        'Leitura Critica: Fato, Opiniao e Argumento',
        'Deconstrucao de Enunciados',
        'Inferencia e Leitura nas Entrelinhas',
        'Pegadinhas, Eliminacao e Erros Comuns',
        'Simulado Final e Estrategia de Tempo'
    ];

    const lessonUnits = [
        'Base', 'Base', 'Conectores', 'Conectores',
        'Estrutura', 'Estrutura', 'Gramatica', 'Gramatica',
        'Gramatica', 'Gramatica', 'Leitura', 'Leitura',
        'Questoes', 'Questoes', 'Prova', 'Prova'
    ];

    const lessonMaterials = [
        ['slides', 'exercicios', 'ia'],
        ['slides', 'resumo', 'ia'],
        ['tabela', 'exercicios', 'flashcards'],
        ['tabela', 'exercicios', 'ia'],
        ['exercicios', 'flashcards', 'ia'],
        ['flashcards', 'exercicios', 'ia'],
        ['tabela', 'exercicios', 'ia'],
        ['tabela', 'exercicios', 'ia'],
        ['tabela', 'questoes', 'ia'],
        ['tabela', 'questoes', 'ia'],
        ['tabela', 'questoes', 'ia'],
        ['leitura', 'questoes', 'ia'],
        ['questoes', 'checklist', 'ia'],
        ['leitura', 'questoes', 'ia'],
        ['questoes', 'pegadinhas', 'ia'],
        ['simulado', 'cronometro', 'correcao']
    ];

    const materialMeta = {
        checklist: { icon: 'fa-list-check', label: 'Checklist' },
        correcao: { icon: 'fa-clipboard-check', label: 'Correcao' },
        cronometro: { icon: 'fa-stopwatch', label: 'Cronometro' },
        exercicios: { icon: 'fa-pen-to-square', label: 'Exercicios' },
        flashcards: { icon: 'fa-layer-group', label: 'Flashcards' },
        ia: { icon: 'fa-wand-magic-sparkles', label: 'IA' },
        leitura: { icon: 'fa-book-open-reader', label: 'Leitura' },
        pegadinhas: { icon: 'fa-triangle-exclamation', label: 'Pegadinhas' },
        questoes: { icon: 'fa-circle-question', label: 'Questoes' },
        resumo: { icon: 'fa-align-left', label: 'Resumo' },
        simulado: { icon: 'fa-file-circle-check', label: 'Simulado' },
        slides: { icon: 'fa-tv', label: 'Slides' },
        tabela: { icon: 'fa-table-list', label: 'Tabela' }
    };

    async function resolveViewerContext(user) {
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
            throw new Error('Perfil sem acesso ao modulo vestibular.');
        }

        return { role, studentId: user.uid };
    }

    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            window.location.href = '../login.html';
            return;
        }

        try {
            const context = await resolveViewerContext(user);
            if (!context.studentId) {
                loadingDiv.innerHTML = '<p class="text-red-500">Selecione um aluno valido no painel principal.</p>';
                return;
            }

            await loadLessons(context.studentId, context.role);
        } catch (error) {
            console.error('Erro ao validar contexto do vestibular:', error);
            loadingDiv.innerHTML = '<p class="text-red-500">Nao foi possivel validar o acesso a este aluno.</p>';
        }
    });

    function buildCard(title, lessonNumber, state, isProfessor) {
        const padded = String(lessonNumber).padStart(2, '0');
        const canOpen = isProfessor || state !== 'locked';
        const materials = lessonMaterials[lessonNumber - 1] || [];
        const iconClass = state === 'completed'
            ? 'fa-check-circle text-green-500'
            : state === 'next'
                ? 'fa-play-circle text-amber-500'
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
                <span class="lesson-unit text-amber-700">${lessonUnits[lessonNumber - 1]}</span>
                <i class="fas ${iconClass} text-2xl"></i>
            </div>
            <div>
                <p class="lesson-meta mt-2">Aula ${lessonNumber}</p>
                <h3 class="lesson-title mt-2">${title}</h3>
            </div>
            <div class="lesson-materials" aria-label="Materiais da aula">
                ${materials.map(type => {
                    const meta = materialMeta[type] || { icon: 'fa-circle-dot', label: type };
                    return `<span class="lesson-material-pill" title="${meta.label}"><i class="fas ${meta.icon}"></i>${meta.label}</span>`;
                }).join('')}
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
            const studentData = studentDoc.exists ? studentDoc.data() : {};
            const allProgress = studentData.progress ? studentData.progress : {};
            const progress = allProgress[moduleId] || {};
            const isProfessor = userRole === 'professor' || userRole === 'admin';
            const allowedProducts = platformAccess?.getStudentAccessibleProducts
                ? platformAccess.getStudentAccessibleProducts(studentData)
                : [
                    ...(Array.isArray(studentData.accessibleProducts) ? studentData.accessibleProducts : []),
                    ...(Array.isArray(studentData.modules) ? studentData.modules : []),
                    ...(studentData.studentType ? [studentData.studentType] : [])
                ];

            if (platformAccess && !platformAccess.canAccessModule(allowedProducts, moduleId)) {
                loadingDiv.innerHTML = '<p class="text-red-500">Este aluno nao possui acesso a esta jornada.</p>';
                return;
            }

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
            console.error('Erro ao carregar licoes do vestibular:', error);
            loadingDiv.innerHTML = '<p class="text-red-500">Ocorreu um erro ao carregar o modulo. Tente novamente.</p>';
        }
    }
});
