document.addEventListener('DOMContentLoaded', () => {
    // A configuração do Firebase é inicializada pelo firebase-config.js
    if (!firebase || !firebase.apps.length) {
        console.error("Firebase não inicializado! Verifique a ordem dos scripts no HTML.");
        return;
    }
    const db = firebase.firestore();
    const auth = firebase.auth();

    const loadingDiv = document.getElementById('loading');
    const grid = document.getElementById('lessons-grid');
    const moduleId = 'vestibular';

    // Títulos de todas as 16 dicas do Módulo Vestibular
    const lessonTitles = [
        "Leitura Dinâmica (Skimming, Scanning e Vocabulário)",
        "Identificando a Ideia Central e os Tópicos Frasais",
        "Linking Words I (Adição e Contraste)",
        "Linking Words II (Causa, Consequência e Propósito)",
        "Referências Pronominais (Pronoun Reference)",
        "Preposições e Phrasal Verbs Essenciais",
        "Tempos Verbais I (Simple Present, Simple Past, Present Continuous)",
        "Tempos Verbais II (Present Perfect e Futuro)",
        "O Poder dos Modal Verbs",
        "Voz Passiva (Passive Voice) e Comparativos",
        "Interpretando o Não-Verbal (Charges, Cartoons e Gráficos)",
        "O Tom e o Propósito do Autor",
        "Desconstruindo as Perguntas",
        "Analisando Textos Literários e Poemas",
        "Análise de Pegadinhas e Erros Comuns",
        "Simulado Final e Estratégias de Prova"
    ];

    // --- LÓGICA DE AUTENTICAÇÃO E CARREGAMENTO ---
    auth.onAuthStateChanged(user => {
        if (user) {
            // Usuário está logado
            const role = localStorage.getItem('loggedInUserRole') || 'aluno';
            const studentId = (role === 'professor') ? localStorage.getItem('selectedStudentId') : user.uid;

            if (studentId) {
                loadLessons(studentId, role);
            } else {
                loadingDiv.innerHTML = '<p class="text-red-500">Erro: ID do aluno não encontrado. Por favor, selecione um aluno no painel principal.</p>';
            }
        } else {
            // Usuário não está logado, redireciona para o login
            window.location.href = '../login.html';
        }
    });

    async function loadLessons(studentId, userRole) { // Novo: Recebe o papel do usuário
        try {
            const studentDoc = await db.collection('students').doc(studentId).get();
            const progress = studentDoc.exists ? (studentDoc.data().progress[moduleId] || {}) : {};
            
            let firstUncompleted = -1;

            grid.innerHTML = ''; // Limpa a grade
            for (let i = 0; i < lessonTitles.length; i++) {
                const lessonNumber = i + 1;
                const isCompleted = progress[`lesson_${lessonNumber}`] === true;
                
                if (!isCompleted && firstUncompleted === -1) {
                    firstUncompleted = lessonNumber;
                }

                // Lógica de acesso: Professor tem acesso a tudo. Aluno só acessa o próximo ou os já completos.
                const canAccess = (userRole === 'professor') || isCompleted || lessonNumber === firstUncompleted;
                
                const card = document.createElement('a');
                card.href = canAccess ? `licao-${String(lessonNumber).padStart(2, '0')}.html` : '#';
                card.className = `lesson-card p-6 bg-white rounded-xl shadow flex flex-col items-center text-center transition-all duration-300 ease-in-out ${!canAccess ? 'locked' : ''} ${isCompleted ? 'border-2 border-green-400' : ''} ${lessonNumber === firstUncompleted ? 'next' : ''}`;
                
                let iconClass = isCompleted ? 'fa-check-circle text-green-500' : (canAccess ? 'fa-play-circle text-amber-500' : 'fa-lock text-gray-400');

                card.innerHTML = `
                    <i class="fas ${iconClass} text-5xl mb-4"></i>
                    <h3 class="font-bold text-lg text-gray-800 flex-grow">${lessonTitles[i]}</h3>
                    <p class="text-sm text-gray-500 mt-2">Dica ${lessonNumber}</p>
                `;
                grid.appendChild(card);
            }

            loadingDiv.classList.add('hidden');
            grid.classList.remove('hidden');

        } catch (error) {
            console.error("Erro ao carregar lições:", error);
            loadingDiv.innerHTML = `<p class="text-red-500">Ocorreu um erro ao carregar o seu progresso. Tente novamente.</p>`;
        }
    }
});