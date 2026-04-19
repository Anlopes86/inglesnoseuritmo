document.addEventListener('DOMContentLoaded', () => {
    const db = typeof window.db !== 'undefined' ? window.db : firebase.firestore();
    const platformAccess = window.PlatformAccess;
    const loadingDiv = document.getElementById('loading');
    const grid = document.getElementById('lessons-grid');

    const lessonTitles = [
        'Dreams & Ambitions', 'Love & Relationships', 'Rebellion & Freedom', 'City Life vs. Country Life', 'Friendship',
        'Overcoming Challenges', 'Travel & Adventure', 'Work & Career', 'Technology & Social Media', 'Happiness & Life Philosophy',
        'The Supernatural & Mysteries', 'Memory & Nostalgia', 'Crime & Justice', 'Food & Culture', 'Success & Failure',
        'The Future & AI', 'Learning & Education', 'Animals & Nature', 'Sports & Competition', 'The Power of Habits',
        'Volunteering & Social Causes', 'Art & Creativity', 'Money & Personal Finance', 'The Gig Economy & Remote Work',
        'The Media, News & Politics', 'Psychology & Human Behavior', 'History & Historical Figures', 'Ethics & Morality',
        'Science & Space Exploration', 'Fashion & Personal Style', 'Culture & Leisure', 'The Modern Face of Love',
        'Childhood & Growing Up', 'Conspiracy Theories', 'Music, Emotions & Identity', 'Aging & Getting Older', 'Language & Communication',
        'Mistakes & Regrets', 'Heroes & Role Models', 'Strange Jobs & Unusual Careers', 'The Paradox of Choice', 'The Ethics of Biohacking',
        'The Art of Storytelling', 'Leadership & Influence', 'Winning & Playing Fair', 'Identity & Who We Are', 'Humor & The Power of Laughter',
        'Comfort Zones & Personal Growth'
    ];

    const unitLabels = [
        'Identity', 'Identity', 'Conflict', 'Lifestyle', 'Relationships', 'Resilience', 'Adventure', 'Work',
        'Modern Life', 'Mindset', 'Mystery', 'Memory', 'Society', 'Culture', 'Growth', 'Future',
        'Learning', 'Nature', 'Competition', 'Habits', 'Impact', 'Creativity', 'Money', 'Work Trends',
        'Media', 'Behavior', 'History', 'Ethics', 'Science', 'Style', 'Culture', 'Modern Love',
        'Childhood', 'Ideas', 'Music', 'Aging', 'Language', 'Reflection', 'Inspiration', 'Careers',
        'Decisions', 'Bioethics', 'Narrative', 'Leadership', 'Fair Play', 'Identity', 'Humor', 'Growth'
    ];

    function buildLessonCard(title, lessonNumber, state) {
        const padded = String(lessonNumber).padStart(2, '0');
        const canOpen = state !== 'locked';
        const iconClass = state === 'completed'
            ? 'fa-check-circle text-green-500'
            : state === 'available'
                ? 'fa-play-circle text-fuchsia-400'
                : 'fa-lock text-slate-500';
        const stateText = state === 'completed'
            ? 'Concluida'
            : state === 'available'
                ? 'Liberada'
                : 'Bloqueada';

        const card = document.createElement('a');
        card.href = canOpen ? `licao-${padded}.html` : '#';
        card.className = `lesson-card ${state}`;
        card.dataset.lesson = String(lessonNumber);
        card.setAttribute('aria-disabled', canOpen ? 'false' : 'true');

        card.innerHTML = `
            <div class="lesson-card-top">
                <span class="lesson-unit text-fuchsia-300">${unitLabels[lessonNumber - 1]}</span>
                <i class="fas ${iconClass} text-2xl"></i>
            </div>
            <div>
                <h3 class="lesson-title">${title}</h3>
                <p class="lesson-meta mt-2">Licao ${lessonNumber}</p>
            </div>
            <div class="lesson-state">
                <i class="fas ${state === 'locked' ? 'fa-lock' : state === 'completed' ? 'fa-award' : 'fa-forward'} text-fuchsia-400"></i>
                ${stateText}
            </div>
        `;

        if (!canOpen) {
            card.addEventListener('click', (event) => event.preventDefault());
        }

        return card;
    }

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
            throw new Error('Perfil sem acesso ao modulo.');
        }

        return { role, studentId: user.uid };
    }

    async function loadLessons() {
        try {
            const { role, studentId } = await resolveViewerContext();
            if (!studentId) throw new Error('Usuario nao identificado.');

            const doc = await db.collection('students').doc(studentId).get();
            const studentData = doc.exists ? doc.data() : {};
            const allProgress = studentData.progress ? studentData.progress : {};
            const progress = allProgress.conversation || {};
            const viewerDoc = await db.collection('students').doc(firebase.auth().currentUser.uid).get();
            const viewerData = viewerDoc.exists ? viewerDoc.data() : {};
            const lessonLimit = Math.min(
                Number(studentData.lessonCount || viewerData.lessonCount || 16) || 16,
                lessonTitles.length
            );
            const allowedProducts = Array.isArray(studentData.accessibleProducts) && studentData.accessibleProducts.length
                ? studentData.accessibleProducts
                : Array.isArray(studentData.modules) && studentData.modules.length
                    ? studentData.modules
                    : [];

            if (platformAccess && !platformAccess.canAccessModule(allowedProducts, 'conversation')) {
                throw new Error('Este aluno nao possui acesso ao Conversation Club.');
            }

            grid.innerHTML = '';
            lessonTitles.forEach((title, index) => {
                const lessonNumber = index + 1;
                const withinPack = lessonNumber <= lessonLimit;
                const isCompleted = withinPack && progress[`lesson_${lessonNumber}`] === true;
                const state = !withinPack
                    ? 'locked'
                    : isCompleted
                        ? 'completed'
                        : 'available';
                grid.appendChild(buildLessonCard(title, lessonNumber, state));
            });

            loadingDiv.classList.add('hidden');
            grid.classList.remove('hidden');
        } catch (error) {
            console.error('Erro ao carregar licoes de conversation:', error);
            loadingDiv.textContent = 'Erro ao carregar licoes.';
        }
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            loadLessons();
        } else {
            loadingDiv.textContent = 'Faca login para ver as licoes.';
        }
    });
});
