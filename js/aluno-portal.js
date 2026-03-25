document.addEventListener('DOMContentLoaded', () => {
    const loadingMessage = document.getElementById('loading-message');
    const portalContainer = document.getElementById('portal-container');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const logoutBtnContainer = document.getElementById('logout-btn-container');
    const backBtn = document.getElementById('back-to-index-btn');

    const studentNameEl = document.getElementById('student-name-welcome');
    const moduleCardTitle = document.getElementById('module-card-title');
    const moduleCardDescription = document.getElementById('module-card-description');
    const moduleCardName = document.getElementById('module-card-name');
    const lastLessonLabel = document.getElementById('last-lesson-label');
    const moduleMainLink = document.getElementById('module-main-link');
    const moduleSecondaryLink = document.getElementById('module-secondary-link');

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    const moduleDetails = {
        a1: {
            name: 'Módulo A1',
            description: 'Abra suas lições principais do A1 e avance no seu ritmo.',
            url: 'a1/a1.html',
            secondaryUrl: 'a1/autonomo/index.html',
            secondaryLabel: 'Iniciar A1 Autônomo'
        },
        a2: {
            name: 'Módulo A2',
            description: 'Continue evoluindo com as lições do A2.',
            url: 'a2/a2.html'
        },
        conversation: {
            name: 'Conversação',
            description: 'Pratique temas de fala e compreensão com foco em fluidez.',
            url: 'conversation/conversation.html'
        },
        business: {
            name: 'Inglês para Negócios',
            description: 'Acesse as aulas voltadas para contexto profissional.',
            url: 'business/business.html'
        },
        vestibular: {
            name: 'Dicas para Vestibular',
            description: 'Revise as lições e estratégias para provas.',
            url: 'vestibular/vestibular.html'
        },
        essentials: {
            name: 'English Essentials',
            description: 'Retome os fundamentos essenciais do inglês.',
            url: 'essentials/essentials.html'
        }
    };

    function openMenu() {
        if (sidebar) sidebar.classList.add('open');
        overlay.classList.add('active');
    }

    function closeMenu() {
        if (sidebar) sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }

    function showPortal() {
        if (loadingMessage) loadingMessage.classList.add('hidden');
        if (portalContainer) portalContainer.classList.remove('hidden');
    }

    function showError(message) {
        if (loadingMessage) {
            loadingMessage.innerHTML = `<div><i class="fas fa-circle-exclamation mr-3 text-red-500"></i>${message}</div>`;
        }
    }

    function findLastCompletedLesson(progress, studentType) {
        const moduleProgress = progress?.[studentType] || {};
        const completedLessons = Object.keys(moduleProgress)
            .map((key) => parseInt(key.replace('lesson_', ''), 10))
            .filter((value) => !Number.isNaN(value))
            .sort((a, b) => b - a);

        return completedLessons[0] || 0;
    }

    function populatePortal(studentData) {
        const firstName = (studentData.name || 'Aluno').split(' ')[0];
        const studentType = studentData.studentType || 'a1';
        const progress = studentData.progress || {};
        const details = moduleDetails[studentType] || {
            name: 'Seu módulo',
            description: 'Abra suas lições e continue estudando.',
            url: '#'
        };
        const lastCompleted = findLastCompletedLesson(progress, studentType);

        if (studentNameEl) studentNameEl.textContent = firstName;
        if (moduleCardTitle) moduleCardTitle.textContent = details.name;
        if (moduleCardDescription) moduleCardDescription.textContent = details.description;
        if (moduleCardName) moduleCardName.textContent = details.name;
        if (lastLessonLabel) {
            lastLessonLabel.textContent = lastCompleted > 0 ? `Lição ${String(lastCompleted).padStart(2, '0')}` : 'Nenhuma ainda';
        }
        if (moduleMainLink) moduleMainLink.href = details.url;

        if (moduleSecondaryLink) {
            if (details.secondaryUrl) {
                moduleSecondaryLink.href = details.secondaryUrl;
                moduleSecondaryLink.textContent = details.secondaryLabel || 'Acesso extra';
                moduleSecondaryLink.classList.remove('hidden');
            } else {
                moduleSecondaryLink.classList.add('hidden');
            }
        }
    }

    function setupActionButtons(role) {
        const isProfessor = role === 'professor';

        if (backBtn) backBtn.style.display = isProfessor ? 'flex' : 'none';

        if (logoutBtnContainer && !logoutBtnContainer.querySelector('#logout-btn')) {
            logoutBtnContainer.innerHTML = `
                <button id="logout-btn" class="w-full text-left enhanced-btn bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition">
                    <i class="fas fa-sign-out-alt nav-icon"></i>Sair
                </button>
            `;

            document.getElementById('logout-btn').addEventListener('click', async () => {
                try {
                    localStorage.removeItem('selectedStudentId');
                    localStorage.removeItem('selectedStudentName');
                    await auth.signOut();
                    localStorage.clear();
                    window.location.href = 'login.html';
                } catch (error) {
                    console.error('Erro ao sair do portal:', error);
                    alert('Não foi possível sair do portal.');
                }
            });
        }
    }

    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const studentIdFromUrl = urlParams.get('studentId');
        const viewingAsRole = localStorage.getItem('loggedInUserRole');
        const isProfessorView = Boolean(studentIdFromUrl && viewingAsRole === 'professor');
        const studentIdToLoad = isProfessorView ? studentIdFromUrl : user.uid;

        if (!studentIdToLoad) {
            showError('Erro: ID do aluno não encontrado.');
            return;
        }

        try {
            const studentDoc = await db.collection('students').doc(studentIdToLoad).get();
            if (!studentDoc.exists) {
                showError('Aluno não encontrado.');
                return;
            }

            populatePortal(studentDoc.data());
            setupActionButtons(isProfessorView ? 'professor' : 'aluno');
            showPortal();
        } catch (error) {
            console.error('Erro ao carregar o portal:', error);
            showError('Erro ao carregar o portal.');
        }
    });

    if (menuToggleBtn) menuToggleBtn.addEventListener('click', openMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
});
