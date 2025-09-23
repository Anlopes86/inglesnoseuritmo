document.addEventListener('DOMContentLoaded', () => {
    // --- Configuração do Firebase ---
    const firebaseConfig = {
        apiKey: "AIzaSyA4srp5nACEhOLLD8Yd4cwe5_rZ8izcm1Y",
        authDomain: "inglesnoseuritmo-bae14.firebaseapp.com",
        projectId: "inglesnoseuritmo-bae14",
        storageBucket: "inglesnoseuritmo-bae14.appspot.com",
        messagingSenderId: "112615489735",
        appId: "1:112615489735:web:9ee215ab9a2246f3a13ee2"
    };
    if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
    const db = firebase.firestore();

    const loadingDiv = document.getElementById('loading');
    const grid = document.getElementById('lessons-grid');

    const lessonTitles = [
        "Beginner Test", "Elementary Test", "Pre-Intermediate Test", "Intermediate Test", 
        "Upper-Intermediate Test", "Advanced Test"
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
            
            // *** CORREÇÃO APLICADA AQUI ***
            const allProgress = doc.exists && doc.data().progress ? doc.data().progress : {};
            const progress = allProgress.nivelamento || {};
            
            let firstUncompleted = -1;

            grid.innerHTML = '';
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
                    <p class="text-sm text-gray-500 mt-1">Teste ${lessonNumber}</p>
                `;
                grid.appendChild(card);
            }

            loadingDiv.style.display = 'none';
            grid.classList.remove('hidden');

        } catch (error) {
            console.error("Erro ao carregar testes de nivelamento: ", error);
            loadingDiv.textContent = "Erro ao carregar testes. Verifique o console para mais detalhes.";
        }
    }

    firebase.auth().onAuthStateChanged(user => {
        if (user || localStorage.getItem("loggedInUserRole") === 'professor') {
            loadLessons();
        } else {
            console.log("Nenhum usuário logado.");
            loadingDiv.textContent = "Por favor, faça login para ver os testes.";
        }
    });
});