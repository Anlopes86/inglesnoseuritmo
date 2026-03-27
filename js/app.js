document.addEventListener('DOMContentLoaded', () => {
    const firebaseConfig = {
        apiKey: "AIzaSyA4srp5nACEhOLLD8Yd4cwe5_rZ8izcm1Y",
        authDomain: "inglesnoseuritmo-bae14.firebaseapp.com",
        projectId: "inglesnoseuritmo-bae14",
        storageBucket: "inglesnoseuritmo-bae14.appspot.com",
        messagingSenderId: "112615489735",
        appId: "1:112615489735:web:9ee215ab9a2246f3a13ee2"
    };

    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const auth = firebase.auth();

    const logoutBtn = document.getElementById('logout-btn');
    const studentSelect = document.getElementById('student-select');
    const noStudentSelectedDiv = document.getElementById('no-student-selected');
    const studentDashboardDiv = document.getElementById('student-dashboard');
    const studentActionButtons = document.getElementById('student-action-buttons');

    const classCountDisplay = document.getElementById('class-count-display');
    const classCountDisplaySecondary = document.getElementById('class-count-display-secondary');
    const addClassBtn = document.getElementById('add-class-btn');
    const removeClassBtn = document.getElementById('remove-class-btn');
    const packageProgressBar = document.getElementById('package-progress-bar');
    const packageProgressText = document.getElementById('package-progress-text');
    const packageValueDisplay = document.getElementById('package-value-display');
    const packageDateDisplay = document.getElementById('package-date-display');
    const noPackageMessage = document.getElementById('no-package-message');
    const packageDetails = document.getElementById('package-details');
    const packageStatusChip = document.getElementById('package-status-chip');
    const modulesStatus = document.getElementById('modules-status');
    const modulesContainer = document.querySelector('.module-grid');
    const studentOverviewCopy = document.getElementById('student-overview-copy');
    const nextLessonDisplay = document.getElementById('next-lesson-display');
    const lastCompletedDisplay = document.getElementById('last-completed-display');
    const studentTypeDisplay = document.getElementById('student-type-display');
    const teacherLastLesson = document.getElementById('teacher-last-lesson');
    const teacherNextLesson = document.getElementById('teacher-next-lesson');
    const teacherLessonNote = document.getElementById('teacher-lesson-note');

    const newPackageBtn = document.getElementById('new-package-btn');
    const newPackageModal = document.getElementById('new-package-modal');
    const newPackageForm = document.getElementById('new-package-form');
    const cancelPackageBtn = document.getElementById('cancel-package-btn');
    const closePackageModalBtn = document.getElementById('close-package-modal-btn');
    const confirmPackageBtn = document.getElementById('confirm-package-btn');

    const modulesData = [
        { id: 'nivelamento', href: 'nivelamento/licao-01.html', title: 'Teste de Nivelamento', lessons: 0, buttonText: 'Abrir teste', icon: 'fa-clipboard-check', accent: 'blue', description: 'Descubra o ponto de partida ideal para a jornada do aluno.' },
        { id: 'vestibular', href: 'vestibular/vestibular.html', title: 'Jornada Vestibular', lessons: 32, buttonText: 'Ver trilha', icon: 'fa-school', accent: 'amber', description: 'Leitura, prova, estratégia e revisão para vestibular.' },
        { id: 'business', href: 'business/business.html', title: 'Inglês para Negócios', lessons: 16, buttonText: 'Ver trilha', icon: 'fa-briefcase', accent: 'cyan', description: 'Reuniões, entrevistas, e-mails e comunicação profissional.' },
        { id: 'essentials', href: 'essentials/essentials.html', lessons: 16, title: 'English Essentials', buttonText: 'Ver trilha', icon: 'fa-key', accent: 'rose', description: 'Curso enxuto para reforçar fundamentos centrais do idioma.' },
        { id: 'conversation', href: 'conversation/conversation.html', title: 'Conversation Club', lessons: 48, buttonText: 'Ver trilha', icon: 'fa-comments', accent: 'violet', description: 'Aulas temáticas para destravar fala, opinião e repertório.' },
        { id: 'a1', href: 'a1/a1.html', title: 'Módulo A1', lessons: 32, buttonText: 'Ver trilha', icon: 'fa-seedling', accent: 'emerald', description: 'Base da comunicação, rotina e primeiras trocas sociais.' },
        { id: 'a2', href: 'a2/a2.html', title: 'Módulo A2', lessons: 32, buttonText: 'Ver trilha', icon: 'fa-compass', accent: 'violet', description: 'Mais repertório, comparações, passado e futuro com clareza.' },
        { id: 'b1', href: 'b1/b1.html', title: 'Módulo B1', lessons: 32, buttonText: 'Ver trilha', icon: 'fa-chart-line', accent: 'rose', description: 'Experiências, opiniões e autonomia comunicativa.' },
        { id: 'b2', href: 'b2/b2.html', title: 'Módulo B2', lessons: 32, buttonText: 'Ver trilha', icon: 'fa-arrow-trend-up', accent: 'amber', description: 'Argumentação, nuance e compreensão de temas mais densos.' },
        { id: 'c1', href: 'c1/c1.html', title: 'Módulo C1', lessons: 32, buttonText: 'Ver trilha', icon: 'fa-trophy', accent: 'cyan', description: 'Comunicação avançada para contextos sociais e profissionais.' },
        { id: 'c2', href: 'c2/c2.html', title: 'Módulo C2', lessons: 32, buttonText: 'Ver trilha', icon: 'fa-crown', accent: 'slate', description: 'Refinamento total da expressão e da compreensão.' }
    ];

    let lastFocusedElement = null;

    function openModal(modal, focusTarget) {
        if (!modal) return;
        lastFocusedElement = document.activeElement;
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('overflow-hidden');
        const target = focusTarget || modal.querySelector('input, select, button, [href]');
        if (target) target.focus();
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('overflow-hidden');
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    }

    function accentClasses(accent) {
        const map = {
            blue: { bg: 'bg-blue-100', text: 'text-blue-700', chip: 'bg-blue-100 text-blue-700', button: 'from-blue-600 to-cyan-600' },
            amber: { bg: 'bg-amber-100', text: 'text-amber-700', chip: 'bg-amber-100 text-amber-700', button: 'from-amber-500 to-orange-500' },
            cyan: { bg: 'bg-cyan-100', text: 'text-cyan-700', chip: 'bg-cyan-100 text-cyan-700', button: 'from-cyan-600 to-blue-600' },
            rose: { bg: 'bg-rose-100', text: 'text-rose-700', chip: 'bg-rose-100 text-rose-700', button: 'from-rose-600 to-red-600' },
            violet: { bg: 'bg-violet-100', text: 'text-violet-700', chip: 'bg-violet-100 text-violet-700', button: 'from-violet-600 to-purple-600' },
            emerald: { bg: 'bg-emerald-100', text: 'text-emerald-700', chip: 'bg-emerald-100 text-emerald-700', button: 'from-emerald-600 to-teal-600' },
            slate: { bg: 'bg-slate-100', text: 'text-slate-700', chip: 'bg-slate-100 text-slate-700', button: 'from-slate-600 to-gray-600' }
        };
        return map[accent] || map.blue;
    }

    function resolveProgressState(progress, totalLessons) {
        const safeProgress = progress || {};
        let nextLesson = null;
        let lastCompleted = null;

        for (let lessonNumber = 1; lessonNumber <= totalLessons; lessonNumber += 1) {
            if (safeProgress[`lesson_${lessonNumber}`] !== true) {
                nextLesson = lessonNumber;
                break;
            }
        }

        for (let lessonNumber = totalLessons; lessonNumber >= 1; lessonNumber -= 1) {
            if (safeProgress[`lesson_${lessonNumber}`] === true) {
                lastCompleted = lessonNumber;
                break;
            }
        }

        return {
            completedLessons: Object.keys(safeProgress).length,
            nextLesson,
            lastCompleted
        };
    }

    function formatLessonNumber(lessonNumber) {
        return lessonNumber ? `Lição ${String(lessonNumber).padStart(2, '0')}` : 'Nenhuma lição concluída';
    }

    function describeStudentType(moduleId) {
        const module = modulesData.find((item) => item.id === moduleId);
        return module ? module.title : 'Módulo não definido';
    }

    auth.onAuthStateChanged((user) => {
        if (window.location.pathname.includes('/a1/autonomo/')) return;

        if (user) {
            db.collection('students').doc(user.uid).get().then((doc) => {
                if (doc.exists && doc.data().role === 'professor') {
                    loadStudentsIntoSelect();
                } else {
                    if (typeof showToast === 'function') {
                        showToast('Este painel é restrito para professores.', 'error', 'Acesso restrito');
                    }
                    auth.signOut();
                }
            });
        } else {
            localStorage.clear();
            window.location.href = 'login.html';
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            logoutBtn.disabled = true;
            try {
                localStorage.removeItem('selectedStudentId');
                localStorage.removeItem('selectedStudentName');
                await auth.signOut();
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Erro ao sair:', error);
                if (typeof showToast === 'function') {
                    showToast('Não foi possível sair da plataforma agora.', 'error', 'Falha ao sair');
                }
                logoutBtn.disabled = false;
            }
        });
    }

    function loadStudentsIntoSelect() {
        studentSelect.innerHTML = '<option value="">Carregando...</option>';
        db.collection('students').where('role', '==', 'aluno').onSnapshot((snapshot) => {
            const students = [];
            snapshot.forEach((doc) => students.push({ id: doc.id, name: doc.data().name }));
            students.sort((a, b) => a.name.localeCompare(b.name));

            let options = '<option value="">Selecione um aluno...</option>';
            students.forEach((student) => {
                options += `<option value="${student.id}">${student.name}</option>`;
            });

            const selectedId = localStorage.getItem('selectedStudentId');
            studentSelect.innerHTML = options;

            if (selectedId && students.some((student) => student.id === selectedId)) {
                studentSelect.value = selectedId;
                studentSelect.dispatchEvent(new Event('change'));
            } else {
                displayNoStudentSelected();
            }
        }, (error) => {
            console.error('Erro ao buscar alunos:', error);
            studentSelect.innerHTML = '<option value="">Erro ao carregar</option>';
        });
    }

    studentSelect.addEventListener('change', () => {
        const studentId = studentSelect.value;
        const studentName = studentSelect.options[studentSelect.selectedIndex].text;

        if (studentId) {
            localStorage.setItem('selectedStudentId', studentId);
            localStorage.setItem('selectedStudentName', studentName);
            displayStudentDashboard(studentId, studentName);
        } else {
            localStorage.removeItem('selectedStudentId');
            localStorage.removeItem('selectedStudentName');
            displayNoStudentSelected();
        }
    });

    function displayNoStudentSelected() {
        studentDashboardDiv.classList.add('hidden');
        noStudentSelectedDiv.classList.remove('hidden');
        studentActionButtons.classList.add('hidden');
        if (modulesStatus) modulesStatus.textContent = 'Selecione um aluno para carregar os módulos.';
    }

    async function displayStudentDashboard(studentId, studentName) {
        noStudentSelectedDiv.classList.add('hidden');
        studentDashboardDiv.classList.remove('hidden');
        studentActionButtons.classList.remove('hidden');

        document.getElementById('student-portal-btn').href = `home-aluno.html?studentId=${studentId}`;
        document.getElementById('selected-student-name-header').textContent = studentName;

        await updatePackageInfo(studentId);
        await updateModuleProgress(studentId);
    }

    async function updatePackageInfo(studentId) {
        try {
            const studentDoc = await db.collection('students').doc(studentId).get();
            if (!studentDoc.exists) return;

            const data = studentDoc.data();
            const classCount = data.classCount || 0;
            const packageSize = data.pacoteContratado || 0;
            const packageValue = data.valorPacote ? data.valorPacote.toFixed(2).replace('.', ',') : '0,00';

            classCountDisplay.textContent = classCount;
            classCountDisplaySecondary.textContent = classCount;

            if (packageSize > 0) {
                noPackageMessage.classList.add('hidden');
                packageDetails.classList.remove('hidden');
                const percentage = Math.round((classCount / packageSize) * 100);
                packageProgressBar.style.width = `${Math.min(100, percentage)}%`;
                packageProgressText.textContent = `${classCount} / ${packageSize} horas`;
                packageValueDisplay.textContent = `R$ ${packageValue}`;
                packageDateDisplay.textContent = data.dataInicioPacote || '--/--/----';
                packageStatusChip.textContent = percentage >= 100 ? 'Pacote concluído' : 'Pacote ativo';
                packageStatusChip.className = `info-chip ${percentage >= 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-violet-100 text-violet-700'}`;
            } else {
                noPackageMessage.classList.remove('hidden');
                packageDetails.classList.add('hidden');
                packageProgressBar.style.width = '0%';
                packageProgressText.textContent = 'Nenhum pacote ativo';
                packageValueDisplay.textContent = 'R$ 0,00';
                packageDateDisplay.textContent = '--/--/----';
                packageStatusChip.textContent = 'Sem pacote ativo';
                packageStatusChip.className = 'info-chip bg-slate-100 text-slate-700';
            }
        } catch (error) {
            console.error('Erro ao buscar dados do pacote:', error);
        }
    }

    async function updateModuleProgress(studentId) {
        if (!modulesContainer) return;
        modulesContainer.innerHTML = '';
        if (modulesStatus) modulesStatus.textContent = 'Carregando módulos...';

        try {
            const studentDoc = await db.collection('students').doc(studentId).get();
            const studentData = studentDoc.exists ? studentDoc.data() : {};
            const progressData = studentData.progress || {};
            const studentType = studentData.studentType || 'a1';

            const focusedModule = modulesData.find((module) => module.id === studentType);
            const focusedProgress = progressData[studentType] || {};
            const focusedState = resolveProgressState(focusedProgress, (focusedModule && focusedModule.lessons) || 0);
            const completedText = focusedState.lastCompleted ? formatLessonNumber(focusedState.lastCompleted) : 'Nenhuma lição concluída';
            const nextText = focusedState.nextLesson ? formatLessonNumber(focusedState.nextLesson) : 'Módulo concluído';

            studentTypeDisplay.textContent = describeStudentType(studentType);
            nextLessonDisplay.textContent = nextText;
            lastCompletedDisplay.textContent = completedText;
            teacherLastLesson.textContent = completedText;
            teacherNextLesson.textContent = nextText;
            teacherLessonNote.textContent = focusedState.nextLesson
                ? `A próxima recomendação é ${nextText}. Use o portal ou abra o módulo em foco para manter a continuidade da aula.`
                : 'A trilha principal já foi concluída. Este é um bom momento para revisão, consolidação ou transição de módulo.';
            studentOverviewCopy.textContent = focusedState.nextLesson
                ? `A trilha principal atual é ${describeStudentType(studentType)}. O próximo passo mais claro é ${nextText}.`
                : `A trilha principal atual é ${describeStudentType(studentType)} e já foi concluída.`;

            modulesData.forEach((module) => {
                const accent = accentClasses(module.accent);
                const moduleProgress = progressData[module.id] || {};
                const totalLessons = module.lessons || 0;
                const completedLessons = totalLessons > 0 ? Object.keys(moduleProgress).length : 0;
                const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
                const isFocused = module.id === studentType;
                const stateLabel = totalLessons > 0
                    ? `${completedLessons} de ${totalLessons} concluídas`
                    : 'Acesso direto';

                const card = document.createElement('div');
                card.className = 'surface-card module-card p-5';
                card.innerHTML = `
                    <div class="flex items-center justify-between gap-3">
                        <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl ${accent.bg} ${accent.text}">
                            <i class="fas ${module.icon}"></i>
                        </div>
                        <span class="info-chip ${isFocused ? 'bg-slate-900 text-white' : accent.chip}">${isFocused ? 'Em foco' : stateLabel}</span>
                    </div>
                    <div>
                        <h3 class="text-xl font-extrabold tracking-tight text-slate-950">${module.title}</h3>
                        <p class="section-copy mt-3">${module.description}</p>
                    </div>
                    ${totalLessons > 0 ? `
                        <div>
                            <div class="flex items-center justify-between text-sm font-semibold text-slate-500 mb-2">
                                <span>Progresso</span>
                                <span>${percentage}%</span>
                            </div>
                            <div class="progress-track">
                                <div class="progress-fill bg-gradient-to-r ${accent.button}" style="width: ${percentage}%;"></div>
                            </div>
                        </div>
                    ` : ''}
                    <a href="${module.href}" class="app-button mt-auto">
                        <i class="fas ${totalLessons > 0 ? 'fa-book-open' : 'fa-play'}"></i>
                        ${module.buttonText}
                    </a>
                `;
                modulesContainer.appendChild(card);
            });

            if (modulesStatus) modulesStatus.textContent = 'Módulos carregados com sucesso.';
        } catch (error) {
            console.error('Erro ao atualizar progresso dos módulos:', error);
            modulesContainer.innerHTML = '<p class="section-copy">Não foi possível carregar os módulos.</p>';
            if (modulesStatus) modulesStatus.textContent = 'Não foi possível carregar os módulos.';
        }
    }

    async function changeClassCount(amount) {
        const studentId = localStorage.getItem('selectedStudentId');
        if (!studentId) return;

        const studentRef = db.collection('students').doc(studentId);
        try {
            await db.runTransaction(async (transaction) => {
                const doc = await transaction.get(studentRef);
                if (!doc.exists) throw new Error('Aluno não encontrado.');
                const currentCount = doc.data().classCount || 0;
                const newCount = currentCount + amount;
                if (newCount >= 0) {
                    transaction.update(studentRef, { classCount: newCount });
                }
            });
            await updatePackageInfo(studentId);
            if (typeof showToast === 'function') {
                showToast('Carga horária atualizada com sucesso.', 'success', 'Pacote atualizado');
            }
        } catch (error) {
            console.error('Erro ao atualizar contador:', error);
            if (typeof showToast === 'function') {
                showToast('Não foi possível atualizar o contador agora.', 'error', 'Falha ao salvar');
            }
        }
    }

    addClassBtn.addEventListener('click', () => changeClassCount(1));
    removeClassBtn.addEventListener('click', () => changeClassCount(-1));

    newPackageBtn.addEventListener('click', () => {
        if (!localStorage.getItem('selectedStudentId')) return;
        openModal(newPackageModal, document.getElementById('package-type'));
    });
    cancelPackageBtn.addEventListener('click', () => closeModal(newPackageModal));
    if (closePackageModalBtn) closePackageModalBtn.addEventListener('click', () => closeModal(newPackageModal));
    if (newPackageModal) {
        newPackageModal.addEventListener('click', (event) => {
            if (event.target === newPackageModal) closeModal(newPackageModal);
        });
    }

    newPackageForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const studentId = localStorage.getItem('selectedStudentId');
        const packageSize = parseInt(document.getElementById('package-type').value, 10);
        const packageValue = parseFloat(document.getElementById('package-value-input').value);
        const packageDateValue = document.getElementById('package-date-input').value;

        if (!studentId || !packageSize || Number.isNaN(packageValue) || !packageDateValue) {
            if (typeof showToast === 'function') {
                showToast('Preencha todos os campos do pacote antes de confirmar.', 'info', 'Dados incompletos');
            }
            return;
        }

        const [year, month, day] = packageDateValue.split('-');
        const formattedDate = `${day}/${month}/${year}`;

        confirmPackageBtn.disabled = true;
        confirmPackageBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';

        try {
            await db.collection('students').doc(studentId).update({
                pacoteContratado: packageSize,
                valorPacote: packageValue,
                dataInicioPacote: formattedDate,
                classCount: 0
            });
            closeModal(newPackageModal);
            newPackageForm.reset();
            await updatePackageInfo(studentId);
            if (typeof showToast === 'function') {
                showToast('Novo pacote salvo e contador reiniciado.', 'success', 'Pacote iniciado');
            }
        } catch (error) {
            console.error('Erro ao salvar novo pacote:', error);
            if (typeof showToast === 'function') {
                showToast('Não foi possível salvar o novo pacote agora.', 'error', 'Falha ao salvar');
            }
        } finally {
            confirmPackageBtn.disabled = false;
            confirmPackageBtn.innerHTML = 'Confirmar pacote';
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        if (newPackageModal && !newPackageModal.classList.contains('hidden')) {
            closeModal(newPackageModal);
        }
    });
});
