document.addEventListener('DOMContentLoaded', () => {
    const db = firebase.firestore();
    const platformAccess = window.PlatformAccess;
    const loadingDiv = document.getElementById('loading');
    const grid = document.getElementById('lessons-grid');

    const lessonTitles = [
        'Beginner Test', 'Elementary Test', 'Pre-Intermediate Test', 'Intermediate Test',
        'Upper-Intermediate Test', 'Advanced Test'
    ];

    async function resolveViewerContext() {
        const user = firebase.auth().currentUser;
        if (!user) {
            return { role: 'aluno', studentId: null };
        }

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
            throw new Error('Perfil sem acesso ao nivelamento.');
        }

        return { role, studentId: user.uid };
    }

    async function loadLessons() {
        try {
            const { role, studentId } = await resolveViewerContext();
            if (!studentId) {
                throw new Error('Usuario nao identificado.');
            }

            const doc = await db.collection('students').doc(studentId).get();
            const studentData = doc.exists ? doc.data() : {};
            const allProgress = studentData.progress ? studentData.progress : {};
            const progress = allProgress.nivelamento || {};
            const allowedProducts = Array.isArray(studentData.accessibleProducts) && studentData.accessibleProducts.length
                ? studentData.accessibleProducts
                : Array.isArray(studentData.modules) && studentData.modules.length
                    ? studentData.modules
                    : [];

            if (platformAccess && !platformAccess.canAccessModule(allowedProducts, 'nivelamento')) {
                loadingDiv.innerHTML = '<p class="text-red-500">Este aluno nao possui acesso ao nivelamento.</p>';
                return;
            }

            let firstUncompleted = -1;

            grid.innerHTML = '';
            for (let i = 0; i < lessonTitles.length; i += 1) {
                const lessonNumber = i + 1;
                const isCompleted = progress[`lesson_${lessonNumber}`] === true;

                if (!isCompleted && firstUncompleted === -1) {
                    firstUncompleted = lessonNumber;
                }

                const canAccess = role === 'professor' || role === 'admin' || isCompleted || lessonNumber === firstUncompleted;

                const card = document.createElement('a');
                card.href = canAccess ? `licao-${String(lessonNumber).padStart(2, '0')}.html` : '#';
                card.className = `lesson-card p-6 bg-white rounded-lg shadow flex flex-col items-center text-center ${!canAccess ? 'locked' : ''} ${lessonNumber === firstUncompleted ? 'next' : ''}`;

                const iconClass = isCompleted
                    ? 'fa-check-circle text-green-500'
                    : canAccess
                        ? 'fa-play-circle text-blue-500'
                        : 'fa-lock text-gray-400';

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
            console.error('Erro ao carregar testes de nivelamento:', error);
            loadingDiv.textContent = 'Erro ao carregar testes. Verifique o acesso do aluno selecionado.';
        }
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            loadLessons();
        } else {
            loadingDiv.textContent = 'Por favor, faca login para ver os testes.';
        }
    });
});
