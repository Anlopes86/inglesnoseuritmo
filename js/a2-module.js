document.addEventListener('DOMContentLoaded', () => {
    const firebaseConfig = {
        apiKey: "AIzaSyA4srp5nACEhOLLD8Yd4cwe5_rZ8izcm1Y",
        authDomain: "inglesnoseuritmo-bae14.firebaseapp.com",
        projectId: "inglesnoseuritmo-bae14",
        storageBucket: "inglesnoseuritmo-bae14.appspot.com",
        messagingSenderId: "112615489735",
        appId: "1:112615489735:web:9ee215ab9a2246f3a13ee2"
    };
    if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

    const loadingDiv = document.getElementById('loading');
    const grid = document.getElementById('lessons-grid');

    const lessonTitles = [
        "The Past - Regular & Irregular", "Telling a Complete Story", "Comparing Places", "Comparing Opinions",
        "Same or Different?", "Setting the Scene", "Interrupted Stories", "Review & Rock Out! #1",
        "Future Intentions", "Future Predictions", "The Biggest and The Best", "My Favorite Things",
        "Rules at Work", "Do I Have to...?", "Giving Advice", "Review & Rock Out! #2",
        "Life Experiences", "Have You Ever...?", "Never Have I Ever...", "Been or Gone?",
        "What's the Matter?", "Advice for the Doctor", "Asking for Directions", "Review & Rock Out! #3",
        "Giving Directions - The Basics", "Giving Directions - Details", "From A to B", "A2 Review - Grammar",
        "A2 Review - Vocabulary & Speaking", "My A2 Mixtape - Final Project Prep", "Lição 31 (Ajustar Título)", "A2 Graduation - Show What You Know!"
    ];

    function loadAllLessons() {
        grid.innerHTML = ''; // Limpa a grelha
        for (let i = 0; i < lessonTitles.length; i++) {
            const lessonNumber = i + 1;
            
            // LÓGICA SIMPLIFICADA: Todas as aulas estão sempre acessíveis
            const canAccess = true;
            
            const card = document.createElement('a');
            card.href = canAccess ? `licao-${String(lessonNumber).padStart(2, '0')}.html` : '#';
            card.className = `lesson-card p-6 bg-white rounded-lg shadow flex flex-col items-center text-center`;

            // Ícone de "play" para todas as aulas
            const iconClass = 'fa-play-circle text-blue-500';

            card.innerHTML = `
                <i class="fas ${iconClass} text-4xl mb-3"></i>
                <h3 class="font-bold text-lg text-gray-800">${lessonTitles[i]}</h3>
                <p class="text-sm text-gray-500 mt-1">Lição ${lessonNumber}</p>
            `;
            grid.appendChild(card);
        }

        loadingDiv.style.display = 'none';
        grid.classList.remove('hidden');
    }
    
    // A função é chamada diretamente, sem verificar login, para garantir que as aulas apareçam.
    loadAllLessons();
});