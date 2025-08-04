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

    // Títulos de todas as 32 lições do A1
    const lessonTitles = [
        "Hello, World!", "Where Are You From?", "My World", "Alphabet & Numbers", "Contact Information", 
        "Everyday Objects", "This or That?", "Review 1", "My Daily Routine", "His/Her Routine", 
        "Do You Like Music?", "I Don't Like That", "Object Pronouns", "How Often?", "What Time Is It?", 
        "Review 2", "Possessive 's", "My Job", "My House", "Where Is the Bank?", 
        "How much/many?", "A little/a few", "Can/Can't", "Review 3", 
        "What Are You Doing?", "Present Continuous", "Simple Present vs Continuous", "Review 4",
        "Where Were You Born?", "What Did You Do?", "Questions in the Past", "Final Review"
    ];

    async function loadLessons() {
        const studentId = localStorage.getItem('loggedInUserId') || localStorage.getItem('selectedStudentId');
        if (!studentId) {
            loadingDiv.textContent = "Erro: Utilizador não encontrado. Por favor, faça login.";
            return;
        }

        const studentDoc = await db.collection('students').doc(studentId).get();
        const progress = studentDoc.exists ? studentDoc.data().progress.a1 || {} : {};
        
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
                <p class="text-sm text-gray-500">Lição ${lessonNumber}</p>
            `;
            grid.appendChild(card);
        }

        loadingDiv.classList.add('hidden');
        grid.classList.remove('hidden');
    }

    loadLessons();
});