document.addEventListener('DOMContentLoaded', () => {
    const db = typeof window.db !== 'undefined' ? window.db : firebase.firestore();

    const loadingDiv = document.getElementById('loading');
    const grid = document.getElementById('lessons-grid');

    // Títulos alinhados com a grade oficial do módulo A1 em a1/a1.html
    const lessonTitles = [
        "Hello, World!", "Where Are You From?", "My World", "The Alphabet & Numbers", "Contact Information",
        "Everyday Objects", "This or That?", "Review (Module 1)", "My Daily Routine", "His/Her Routine",
        "Do You Like Music?", "I Don't Like That", "Object Pronouns", "How Often?", "What Time Is It?",
        "Review (Module 2)", "Possessive 's'", "My Job", "My House", "Where Is the Bank?",
        "How much / many?", "A little / a few", "Can / Can't", "What Are You Doing?",
        "Simple Present vs. Continuous", "Review (Module 3)", "Where Were You Born?", "What Did You Do Yesterday?",
        "Questions in the Past", "Future Plans", "Final Review", "Final Project"
    ];

    async function loadLessons() {
        try {
            const role = localStorage.getItem("loggedInUserRole") || 'aluno';
            let studentId;

            if (role === 'professor') {
                studentId = localStorage.getItem("selectedStudentId");
            } else {
                const user = firebase.auth().currentUser;
                studentId = user ? user.uid : null;
            }

            if (!studentId) {
                throw new Error("Usuário não identificado.");
            }

            const doc = await db.collection('students').doc(studentId).get();
            
            // *** CORRE???fO APLICADA AQUI ***
            const allProgress = doc.exists && doc.data().progress ? doc.data().progress : {};
            const progress = allProgress.a1 || {};
            
            let firstUncompleted = -1;

            grid.innerHTML = ''; // Limpa a grelha
            for (let i = 0; i < lessonTitles.length; i++) {
                const lessonNumber = i + 1;
                const isCompleted = progress[`lesson_${lessonNumber}`] === true;
                
                if (!isCompleted && firstUncompleted === -1) {
                    firstUncompleted = lessonNumber;
                }

                const canAccess = isCompleted || lessonNumber === firstUncompleted;
                
                const card = document.createElement('a');
                card.href = canAccess ? `licao-${String(lessonNumber).padStart(2, '0')}.html` : '#';
                card.className = `lesson-card p-6 bg-white rounded-lg shadow flex flex-col items-center text-center ${!canAccess ? 'locked' : ''} ${lessonNumber === firstUncompleted ? 'next' : ''}`;
                
                let iconClass = isCompleted ? 'fa-check-circle text-green-500' : (canAccess ? 'fa-play-circle text-blue-500' : 'fa-lock text-gray-400');

                card.innerHTML = `
                    <i class="fas ${iconClass} text-4xl mb-3"></i>
                    <h3 class="font-bold text-lg text-gray-800">${lessonTitles[i]}</h3>
                    <p class="text-sm text-gray-500 mt-1">Lição ${lessonNumber}</p>
                `;
                grid.appendChild(card);
            }

            loadingDiv.style.display = 'none';
            grid.classList.remove('hidden');

        } catch (error) {
            console.error("Erro ao carregar lições A1: ", error);
            loadingDiv.textContent = "Erro ao carregar lições. Verifique o console para mais detalhes.";
        }
    }
    
    firebase.auth().onAuthStateChanged(user => {
        if (user || localStorage.getItem("loggedInUserRole") === 'professor') {
            loadLessons();
        } else {
            console.log("Nenhum usuário logado.");
            loadingDiv.textContent = "Por favor, faça login para ver as lições.";
        }
    });
});
