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
        "Dreams & Ambitions", "Love & Relationships", "Rebellion & Freedom", "City Life vs. Country Life", 
        "Friendship", "Overcoming Challenges", "Travel & Adventure", "Work & Career", "Technology & Social Media",
        "Happiness & Life Philosophy", "The Supernatural & Mysteries", "Memory & Nostalgia","Crime & Justice", 
        "Food & Culture", "Success & Failure", "The Future & AI", "Learning & Education", "Animals & Nature"
    ];

    async function loadLessons() {
        const studentId = localStorage.getItem('loggedInUserId') || localStorage.getItem('selectedStudentId');
        if (!studentId) {
            loadingDiv.textContent = "Erro: Utilizador não encontrado. Por favor, faça login.";
            return;
        }

        const studentDoc = await db.collection('students').doc(studentId).get();
        const progress = studentDoc.exists ? studentDoc.data().progress.conversation || {} : {};
        
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
            
            let iconClass = isCompleted ? 'fa-check-circle text-green-500' : (canAccess ? 'fa-comment-dots text-purple-500' : 'fa-lock text-gray-400');

            card.innerHTML = `
                <i class="fas ${iconClass} text-4xl mb-3"></i>
                <h3 class="font-bold text-lg text-gray-800">${lessonTitles[i]}</h3>
                <p class="text-sm text-gray-500">Aula ${lessonNumber}</p>
            `;
            grid.appendChild(card);
        }

        loadingDiv.classList.add('hidden');
        grid.classList.remove('hidden');
    }

    loadLessons();
});