document.addEventListener('DOMContentLoaded', () => {
    let lastFocusedElement = null;

    const db = firebase.firestore();
    const auth = firebase.auth();
    const platformAccess = window.PlatformAccess;
    let currentProfile = null;
    let studentsUnsubscribe = null;
    let dashboardRefreshTimer = null;
    let dashboardRefreshInFlight = false;

    const logoutBtn = document.getElementById('logout-btn');
    const studentSelect = document.getElementById('student-select');
    const noStudentSelectedDiv = document.getElementById('no-student-selected');
    const studentDashboardDiv = document.getElementById('student-dashboard');
    const studentActionButtons = document.getElementById('student-action-buttons');

    const classCountDisplay = document.getElementById('class-count-display');
    const classCountDisplaySecondary = document.getElementById('class-count-display-secondary');
    const lastClassRegisteredDisplay = document.getElementById('last-class-registered-display');
    const lastClassRegisteredSecondary = document.getElementById('last-class-registered-secondary');
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
    const assignedModulesStatus = document.getElementById('assigned-modules-status');
    const assignedModulesList = document.getElementById('assigned-modules-list');
    const moduleReleasePanel = document.getElementById('module-release-panel');
    const releaseModuleSelect = document.getElementById('release-module-select');
    const releaseModuleBtn = document.getElementById('release-module-btn');
    const releaseModuleHelper = document.getElementById('release-module-helper');

    const newPackageBtn = document.getElementById('new-package-btn');
    const packageControlCard = document.getElementById('package-control-card');
    const newPackageModal = document.getElementById('new-package-modal');
    const newPackageForm = document.getElementById('new-package-form');
    const cancelPackageBtn = document.getElementById('cancel-package-btn');
    const closePackageModalBtn = document.getElementById('close-package-modal-btn');
    const confirmPackageBtn = document.getElementById('confirm-package-btn');
    const managerPlanChip = document.getElementById('manager-plan-chip');
    const managerCapacityChip = document.getElementById('manager-capacity-chip');
    const adminPanelLink = document.getElementById('admin-panel-link');

    const modulesData = [
        { id: 'nivelamento', href: 'nivelamento/licao-01.html', title: 'Teste de Nivelamento', lessons: 0, buttonText: 'Abrir diagnóstico', icon: 'fa-clipboard-check', accent: 'blue', description: 'Diagnóstico escrito de A1 a C1 com recomendação de entrada e confirmação do professor.' },
        { id: 'vestibular', href: 'vestibular/vestibular.html', title: 'Jornada Vestibular', lessons: 16, buttonText: 'Ver trilha', icon: 'fa-school', accent: 'amber', description: 'Leitura, gram\u00e1tica, estrat\u00e9gia e simulados autorais em 16 aulas.' },
        { id: 'business', href: 'business/business.html', title: 'Ingl\u00eas para Neg\u00f3cios', lessons: 8, buttonText: 'Ver trilha', icon: 'fa-briefcase', accent: 'cyan', description: 'Prepara\u00e7\u00e3o pr\u00e1tica para entrevistas de emprego em ingl\u00eas.' },
        { id: 'essentials', href: 'essentials/essentials.html', lessons: 16, title: 'English Essentials', buttonText: 'Ver trilha', icon: 'fa-key', accent: 'rose', description: 'Curso enxuto para refor\u00e7ar fundamentos centrais do idioma.' },
        { id: 'conversation', href: 'conversation/conversation.html', title: 'Conversation Club', lessons: 64, buttonText: 'Ver trilha', icon: 'fa-comments', accent: 'violet', description: 'Aulas tem\u00e1ticas para destravar fala, opini\u00e3o e repert\u00f3rio.' },
        { id: 'a1', href: 'a1/a1.html', title: 'M\u00f3dulo A1', lessons: 32, buttonText: 'Ver trilha', icon: 'fa-seedling', accent: 'emerald', description: 'Base da comunica\u00e7\u00e3o, rotina e primeiras trocas sociais.' },
        { id: 'a1-v2', href: 'a1-v2/a1-v2.html', title: 'M\u00f3dulo A1 V2', lessons: 32, buttonText: 'Testar trilha', icon: 'fa-flask', accent: 'emerald', description: 'Vers\u00e3o paralela do A1 para testes com alunos.', isTestVersion: true },
        { id: 'a1-v3', href: 'a1-v3/a1-v3.html', title: 'M\u00f3dulo A1 V3', lessons: 32, buttonText: 'Testar trilha', icon: 'fa-flask-vial', accent: 'emerald', description: 'Aulas fechadas de 60 minutos com pr\u00e1tica guiada e revis\u00f5es focadas.', isTestVersion: true },
        { id: 'a2', href: 'a2/a2.html', title: 'M\u00f3dulo A2', lessons: 32, buttonText: 'Ver trilha', icon: 'fa-compass', accent: 'violet', description: 'Mais repert\u00f3rio, compara\u00e7\u00f5es, passado e futuro com clareza.' },
        { id: 'a2-v2', href: 'a2-v2/a2.html', title: 'M\u00f3dulo A2 V2', lessons: 32, buttonText: 'Testar trilha', icon: 'fa-flask', accent: 'violet', description: 'Vers\u00e3o paralela do A2 com tradu\u00e7\u00e3o PT-EN, fala, listening e gram\u00e1tica mais profunda.', isTestVersion: true },
        { id: 'a2-v3', href: 'a2-v3/a2-v3.html', title: 'M\u00f3dulo A2 V3', lessons: 32, buttonText: 'Testar trilha', icon: 'fa-flask-vial', accent: 'violet', description: 'Sess\u00f5es de 60 minutos com miss\u00f5es comunicativas variadas.', isTestVersion: true },
        { id: 'prepb1', href: 'prepb1/prepb1.html', title: 'Ponte A2-B1', lessons: 8, buttonText: 'Ver trilha', icon: 'fa-arrow-right-arrow-left', accent: 'cyan', description: 'Revis\u00e3o de transi\u00e7\u00e3o com leitura, interpreta\u00e7\u00e3o e conversa\u00e7\u00e3o antes do B1.' },
        { id: 'b1', href: 'b1/b1.html', title: 'M\u00f3dulo B1', lessons: 32, buttonText: 'Ver trilha', icon: 'fa-chart-line', accent: 'rose', description: 'Experi\u00eancias, opini\u00f5es e autonomia comunicativa.' },
        { id: 'b1-v2', href: 'b1-v2/b1-v2.html', title: 'M\u00f3dulo B1 V2', lessons: 32, buttonText: 'Testar trilha', icon: 'fa-flask', accent: 'rose', description: 'Vers\u00e3o paralela do B1 para testar novas ideias sem alterar a trilha original.', isTestVersion: true },
        { id: 'b1-v3', href: 'b1-v3/b1-v3.html', title: 'M\u00f3dulo B1 V3', lessons: 32, buttonText: 'Testar trilha', icon: 'fa-flask-vial', accent: 'rose', description: 'Sess\u00f5es B1 de 60 minutos com speaking, listening guiado e avalia\u00e7\u00e3o.', isTestVersion: true },
        { id: 'b2', href: 'b2/b2.html', title: 'M\u00f3dulo B2', lessons: 32, buttonText: 'Ver trilha', icon: 'fa-arrow-trend-up', accent: 'amber', description: 'Argumenta\u00e7\u00e3o, nuance e compreens\u00e3o de temas mais densos.', isComingSoon: true },
        { id: 'c1', href: 'c1/c1.html', title: 'M\u00f3dulo C1', lessons: 32, buttonText: 'Ver trilha', icon: 'fa-trophy', accent: 'cyan', description: 'Comunica\u00e7\u00e3o avan\u00e7ada para contextos sociais e profissionais.', isComingSoon: true },
        { id: 'c2', href: 'c2/c2.html', title: 'M\u00f3dulo C2', lessons: 32, buttonText: 'Ver trilha', icon: 'fa-crown', accent: 'slate', description: 'Refinamento total da express\u00e3o e da compreens\u00e3o.', isComingSoon: true }
    ];
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
        return lessonNumber ? `Li\u00e7\u00e3o ${String(lessonNumber).padStart(2, '0')}` : 'Nenhuma li\u00e7\u00e3o conclu\u00edda';
    }

    function resolveFirestoreDate(value) {
        if (!value) return null;
        if (value instanceof Date) return value;
        if (typeof value.toDate === 'function') return value.toDate();
        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    function formatClassRegistrationDate(value) {
        const date = resolveFirestoreDate(value);
        if (!date) return null;
        const datePart = new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
        const timePart = new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
        return `${datePart} \u00e0s ${timePart}`;
    }

    function updateLastClassRegistration(value, classCount = 0) {
        const formattedDate = formatClassRegistrationDate(value);
        const message = formattedDate
            ? `\u00daltima aula registrada: ${formattedDate}`
            : classCount > 0
                ? 'A data aparecer\u00e1 no pr\u00f3ximo registro.'
                : 'Nenhuma aula registrada neste pacote.';
        if (lastClassRegisteredDisplay) lastClassRegisteredDisplay.textContent = message;
        if (lastClassRegisteredSecondary) lastClassRegisteredSecondary.textContent = message;
    }

    function describeStudentType(moduleId) {
        const module = modulesData.find((item) => item.id === moduleId);
        return module ? module.title : 'M\u00f3dulo n\u00e3o definido';
    }

    function getModuleAccessSource(studentData) {
        if (studentData) {
            return platformAccess?.getStudentAccessibleProducts
                ? platformAccess.getStudentAccessibleProducts(studentData)
                : [
                    ...(Array.isArray(studentData.accessibleProducts) ? studentData.accessibleProducts : []),
                    ...(Array.isArray(studentData.modules) ? studentData.modules : []),
                    ...(studentData.studentType ? [studentData.studentType] : [])
                ];
        }

        if (currentProfile && platformAccess?.isManager(currentProfile) && platformAccess?.getManagerModuleProducts) {
            return platformAccess.getManagerModuleProducts(currentProfile);
        }

        return currentProfile?.plan || { products: [] };
    }

    function isModuleAvailableForContext(moduleId, studentData) {
        if (moduleId === 'nivelamento') return true;
        const source = getModuleAccessSource(studentData);
        return Boolean(platformAccess?.canAccessModule(source, moduleId));
    }

    function isModuleAssignableByManager(moduleId) {
        if (moduleId === 'nivelamento') return false;
        const source = getModuleAccessSource(null);
        return Boolean(platformAccess?.canAccessModule(source, moduleId));
    }

    function getModuleRequirementLabel(moduleId) {
        return platformAccess?.getModuleRequirementLabel(moduleId) || 'Pack indisponível';
    }

    function getConversationLessonLimit(studentData) {
        const conversationModule = modulesData.find((module) => module.id === 'conversation');
        const moduleMaximum = Number(conversationModule?.lessons) || 64;
        const studentLimit = platformAccess?.getLessonLimit
            ? platformAccess.getLessonLimit(studentData)
            : Number(studentData?.lessonCount);
        const managerLimit = platformAccess?.getLessonLimit
            ? platformAccess.getLessonLimit(currentProfile?.plan || currentProfile?.data)
            : Number(currentProfile?.plan?.lessonCount);
        const resolvedLimit = [studentLimit, managerLimit, 16]
            .map((value) => Number(value))
            .find((value) => Number.isFinite(value) && value > 0);

        return Math.min(Math.floor(resolvedLimit || 16), moduleMaximum);
    }

    function setStudentSummaryPlaceholders() {
        if (studentTypeDisplay) studentTypeDisplay.textContent = 'Nenhum aluno selecionado';
        if (nextLessonDisplay) nextLessonDisplay.textContent = 'Selecione um aluno';
        if (lastCompletedDisplay) lastCompletedDisplay.textContent = 'Selecione um aluno';
        if (teacherLastLesson) teacherLastLesson.textContent = 'Selecione um aluno';
        if (teacherNextLesson) teacherNextLesson.textContent = 'Selecione um aluno';
        if (lastClassRegisteredDisplay) lastClassRegisteredDisplay.textContent = 'Selecione um aluno para ver o \u00faltimo registro.';
        if (lastClassRegisteredSecondary) lastClassRegisteredSecondary.textContent = 'Selecione um aluno para ver o \u00faltimo registro.';
        if (teacherLessonNote) {
            teacherLessonNote.textContent = 'Os módulos do seu plano continuam visíveis. Selecione um aluno para liberar, acompanhar e abrir as lições.';
        }
        if (studentOverviewCopy) {
            studentOverviewCopy.textContent = 'Selecione um aluno para ver pacote, progresso e a trilha principal. Os módulos do seu plano seguem visíveis abaixo.';
        }
        renderModuleReleaseOptions(null, null);
    }

    function renderModuleCards(studentData = null, studentId = null) {
        if (!modulesContainer) return;

        const hasStudent = Boolean(studentData && studentId);
        const assignedModules = hasStudent ? getAssignedModules(studentData) : [];
        const primaryModule = hasStudent ? (studentData.studentType || assignedModules[0] || null) : null;

        modulesContainer.innerHTML = '';
        if (!hasStudent) {
            if (modulesStatus) modulesStatus.textContent = 'Selecione um aluno para ver as trilhas liberadas.';
            return;
        }

        const placementModule = modulesData.find((module) => module.id === 'nivelamento');
        const visibleModules = [
            placementModule,
            ...assignedModules.map((moduleId) => modulesData.find((module) => module.id === moduleId))
        ]
            .filter(Boolean)
            .sort((a, b) => {
                if (a.id === 'nivelamento') return -1;
                if (b.id === 'nivelamento') return 1;
                if (a.id === primaryModule) return -1;
                if (b.id === primaryModule) return 1;
                return a.title.localeCompare(b.title);
            });

        if (!visibleModules.length) {
            modulesContainer.innerHTML = '<p class="section-copy">Nenhuma trilha foi liberada para este aluno. Use o seletor acima para liberar a primeira.</p>';
            if (modulesStatus) modulesStatus.textContent = 'Sem módulos liberados.';
            return;
        }

        visibleModules.forEach((module) => {
            const accent = accentClasses(module.accent);
            const isPrimary = primaryModule === module.id;
            const isPlacement = module.id === 'nivelamento';

            const card = document.createElement('div');
            card.className = 'surface-card module-card p-5';
            card.dataset.version = module.isTestVersion ? 'test' : 'main';
            card.innerHTML = `
                <div class="flex items-center justify-between gap-3">
                    <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl ${accent.bg} ${accent.text}">
                        <i class="fas ${module.icon}"></i>
                    </div>
                    <span class="info-chip ${isPrimary ? 'bg-slate-900 text-white' : 'bg-emerald-100 text-emerald-700'}">${isPlacement ? 'Sempre disponível' : (isPrimary ? 'Trilha principal' : 'Liberado')}</span>
                </div>
                <div>
                    <h3 class="text-xl font-extrabold tracking-tight text-slate-950">${module.title}</h3>
                    <p class="section-copy mt-3">${module.description}</p>
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mt-4">${isPlacement ? 'Diagnóstico de entrada' : (module.isTestVersion ? 'Progresso independente da versão principal' : 'Trilha ativa do curso')}</p>
                </div>
                ${module.id === 'conversation' && hasStudent ? `
                    <div class="conversation-access-summary" data-conversation-access-summary>
                        <p class="conversation-access-label">Lições de conversação disponíveis</p>
                        <p class="conversation-access-count" data-conversation-lesson-limit>${getConversationLessonLimit(studentData)}</p>
                    </div>
                ` : ''}
                <div class="mt-auto space-y-3">
                    <a href="${module.href}" class="app-button w-full">
                        <i class="fas ${isPlacement ? 'fa-clipboard-check' : 'fa-book-open'}"></i>
                        ${module.buttonText || 'Abrir módulo'}
                    </a>
                    ${!isPlacement && !isPrimary ? `<button type="button" class="app-button-ghost w-full" data-set-primary-module="${module.id}"><i class="fas fa-bullseye"></i> Tornar principal</button>` : ''}
                </div>
            `;
            modulesContainer.appendChild(card);
        });

        if (modulesStatus) {
            modulesStatus.textContent = `Teste de nivelamento e ${assignedModules.length} ${assignedModules.length === 1 ? 'trilha liberada' : 'trilhas liberadas'}.`;
        }
    }

    function renderModuleReleaseOptions(studentData = null, studentId = null) {
        if (!moduleReleasePanel || !releaseModuleSelect || !releaseModuleBtn) return;

        const hasStudent = Boolean(studentData && studentId);
        moduleReleasePanel.classList.toggle('hidden', !hasStudent);
        releaseModuleSelect.innerHTML = '<option value="">Selecione um módulo...</option>';
        releaseModuleSelect.disabled = !hasStudent;
        releaseModuleBtn.disabled = true;

        if (!hasStudent) {
            if (releaseModuleHelper) releaseModuleHelper.textContent = 'Selecione um aluno para gerenciar as trilhas liberadas.';
            return;
        }

        const assignedModules = getAssignedModules(studentData);
        const availableModules = modulesData.filter((module) => (
            module.id !== 'nivelamento'
            && module.isComingSoon !== true
            && isModuleAssignableByManager(module.id)
            && !assignedModules.includes(module.id)
        ));

        availableModules.forEach((module) => {
            const option = document.createElement('option');
            option.value = module.id;
            option.textContent = module.title;
            releaseModuleSelect.appendChild(option);
        });

        if (releaseModuleHelper) {
            releaseModuleHelper.textContent = availableModules.length
                ? 'Liberar conteúdo não altera o pacote de horas do aluno.'
                : 'Todos os módulos disponíveis no seu plano já foram liberados para este aluno.';
        }
    }

    function getAssignedModules(studentData) {
        const currentModules = Array.isArray(studentData.modules) ? studentData.modules : [];
        const fallbackModules = studentData.studentType ? [studentData.studentType] : [];
        const validIds = new Set(modulesData.map((module) => module.id).filter((id) => id !== 'nivelamento'));

        const assigned = [...new Set([...currentModules, ...fallbackModules])];
        return assigned
            .filter((moduleId) => validIds.has(moduleId))
            .filter((moduleId) => isModuleAvailableForContext(moduleId, studentData));
    }

    function renderAssignedModules(studentData) {
        if (!assignedModulesStatus || !assignedModulesList) return;

        const assignedModules = getAssignedModules(studentData);
        const primaryModule = studentData.studentType || assignedModules[0] || null;

        assignedModulesList.innerHTML = '';

        if (!assignedModules.length) {
            assignedModulesStatus.textContent = 'Nenhum módulo liberado ainda.';
            assignedModulesList.innerHTML = '<p class="section-copy">Use os cards abaixo para liberar o primeiro módulo deste aluno.</p>';
            return;
        }

        assignedModulesStatus.textContent = `${assignedModules.length} ${assignedModules.length === 1 ? 'módulo liberado' : 'módulos liberados'} para este aluno.`;

        assignedModules.forEach((moduleId) => {
            const module = modulesData.find((item) => item.id === moduleId);
            if (!module) return;

            const chip = document.createElement('button');
            chip.type = 'button';
            chip.dataset.setPrimaryModule = moduleId;
            chip.className = primaryModule === moduleId
                ? 'info-chip bg-slate-900 text-white'
                : 'info-chip bg-slate-100 text-slate-700';
            chip.textContent = primaryModule === moduleId
                ? `${module.title} \u2022 principal`
                : `Definir ${module.title} como principal`;
            assignedModulesList.appendChild(chip);
        });
    }

    function updateStudentCapacityFeedback(studentCount) {
        const openAddStudentModalBtn = document.getElementById('open-add-student-modal-btn');
        const openAddStudentEmptyBtn = document.getElementById('open-add-student-empty-btn');
        const plan = currentProfile?.plan;
        const limitReached = platformAccess?.isStudentLimitReached(plan, studentCount);
        const planLabel = plan?.label || 'Starter';
        const limitLabel = platformAccess?.formatStudentLimit(plan?.studentLimit) || '0';

        if (managerPlanChip) {
            managerPlanChip.classList.remove('hidden');
            managerPlanChip.querySelector('span').textContent = planLabel;
        }
        if (managerCapacityChip) {
            managerCapacityChip.classList.remove('hidden');
            managerCapacityChip.querySelector('span').textContent = `${studentCount}/${limitLabel} alunos`;
        }

        if (studentOverviewCopy) {
            studentOverviewCopy.textContent = `Plano ${planLabel}: ${studentCount}/${limitLabel} alunos em uso.`;
        }

        [openAddStudentModalBtn, openAddStudentEmptyBtn].forEach((button) => {
            if (!button) return;
            button.classList.toggle('opacity-60', Boolean(limitReached));
            button.classList.toggle('cursor-not-allowed', Boolean(limitReached));
            button.setAttribute('aria-disabled', String(Boolean(limitReached)));
            button.title = limitReached
                ? 'Limite de alunos atingido para o plano atual.'
                : '';
        });
    }

    function renderStudentOptions(students) {
        students.sort((a, b) => a.name.localeCompare(b.name));

        let options = '<option value="">Selecione um aluno...</option>';
        students.forEach((student) => {
            options += `<option value="${student.id}">${student.name}</option>`;
        });

        const selectedId = localStorage.getItem('selectedStudentId');
        studentSelect.innerHTML = options;
        updateStudentCapacityFeedback(students.length);

        if (selectedId && students.some((student) => student.id === selectedId)) {
            studentSelect.value = selectedId;
            studentSelect.dispatchEvent(new Event('change'));
            return;
        }

        displayNoStudentSelected();
    }

    function scheduleDashboardRefresh(delay = 15000) {
        if (dashboardRefreshTimer) {
            window.clearTimeout(dashboardRefreshTimer);
        }

        dashboardRefreshTimer = window.setTimeout(() => {
            refreshDashboardState().catch((error) => {
                console.error('Erro ao atualizar painel:', error);
            });
        }, delay);
    }

    async function refreshDashboardState() {
        if (!currentProfile || !platformAccess || !db || dashboardRefreshInFlight) return;

        dashboardRefreshInFlight = true;
        try {
            await loadStudentsIntoSelect({ silent: true });

            const selectedStudentId = localStorage.getItem('selectedStudentId');
            if (!selectedStudentId) {
                displayNoStudentSelected();
                return;
            }

            const selectedStudentName = localStorage.getItem('selectedStudentName') || '';
            const optionExists = Array.from(studentSelect.options).some((option) => option.value === selectedStudentId);
            if (!optionExists) {
                displayNoStudentSelected();
                return;
            }

            await displayStudentDashboard(selectedStudentId, selectedStudentName || studentSelect.options[studentSelect.selectedIndex]?.text || 'Aluno');
        } finally {
            dashboardRefreshInFlight = false;
        }
    }

    function loadStudentsIntoSelect(options = {}) {
        if (!currentProfile || !platformAccess || !db) return Promise.resolve();
        if (studentsUnsubscribe) {
            studentsUnsubscribe();
            studentsUnsubscribe = null;
        }

        if (!options.silent) {
            studentSelect.innerHTML = '<option value="">Carregando...</option>';
        }

        const teacherId = platformAccess.getManagedTeacherId(currentProfile);
        const query = platformAccess.buildManagedStudentsQuery(db, currentProfile, teacherId);

        return query.get().then((snapshot) => {
            const students = [];
            snapshot.forEach((doc) => students.push({ id: doc.id, ...doc.data() }));
            renderStudentOptions(students);
            scheduleDashboardRefresh();
        }).catch((error) => {
            console.error('Erro ao buscar alunos:', error);
            studentSelect.innerHTML = '<option value="">Erro ao carregar</option>';
        });
    }

    window.addEventListener('focus', () => {
        refreshDashboardState().catch((error) => {
            console.error('Erro ao atualizar painel ao ganhar foco:', error);
        });
    });

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            refreshDashboardState().catch((error) => {
                console.error('Erro ao atualizar painel ao voltar para a aba:', error);
            });
        }
    });

    window.addEventListener('online', () => {
        refreshDashboardState().catch((error) => {
            console.error('Erro ao atualizar painel ao retornar online:', error);
        });
    });

    window.addEventListener('student:created', () => {
        loadStudentsIntoSelect().catch((error) => {
            console.error('Erro ao recarregar alunos após criar aluno:', error);
        });
    });

    auth.onAuthStateChanged(async (user) => {
        if (window.location.pathname.includes('/a1/autonomo/')) return;

        if (!user) {
            localStorage.clear();
            window.location.href = 'login.html';
            return;
        }

        currentProfile = platformAccess
            ? await platformAccess.fetchProfileById(db, user.uid)
            : null;

        if (!currentProfile || !platformAccess?.isManager(currentProfile)) {
            if (typeof showToast === 'function') {
                showToast('Este painel e restrito para gestores da plataforma.', 'error', 'Acesso restrito');
            }
            await auth.signOut();
            return;
        }

        if (adminPanelLink) {
            adminPanelLink.classList.toggle('hidden', !platformAccess.isAdmin(currentProfile));
        }

        try {
            const migratedStudents = platformAccess.isProfessor(currentProfile)
                ? await platformAccess.maybeMigrateLegacyStudents(db, currentProfile)
                : 0;
            if (migratedStudents > 0 && typeof showToast === 'function') {
                showToast(`${migratedStudents} aluno(s) antigos foram vinculados ao seu tenant.`, 'success', 'Migracao concluida');
            }
        } catch (error) {
            console.error('Erro ao migrar alunos antigos:', error);
        }

        loadStudentsIntoSelect();
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
                    showToast('N\u00e3o foi poss\u00edvel sair da plataforma agora.', 'error', 'Falha ao sair');
                }
                logoutBtn.disabled = false;
            }
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
        noStudentSelectedDiv.classList.remove('hidden');
        studentDashboardDiv.classList.add('hidden');
        studentActionButtons.classList.add('hidden');
        if (packageControlCard) packageControlCard.classList.add('hidden');
        setStudentSummaryPlaceholders();
        if (modulesContainer) modulesContainer.innerHTML = '';
    }

    async function displayStudentDashboard(studentId, studentName) {
        if (assignedModulesStatus) assignedModulesStatus.textContent = 'Carregando módulos liberados...';
        if (assignedModulesList) assignedModulesList.innerHTML = '';

        if (platformAccess && currentProfile) {
            const accessResult = await platformAccess.assertStudentAccess(db, currentProfile, studentId);
            if (!accessResult.ok) {
                if (typeof showToast === 'function') {
                    showToast('Este aluno nao pertence ao seu espaco de trabalho.', 'error', 'Acesso negado');
                }
                localStorage.removeItem('selectedStudentId');
                localStorage.removeItem('selectedStudentName');
                displayNoStudentSelected();
                loadStudentsIntoSelect();
                return;
            }
        }

        studentDashboardDiv.classList.remove('hidden');
        noStudentSelectedDiv.classList.add('hidden');
        studentActionButtons.classList.remove('hidden');
        if (packageControlCard) packageControlCard.classList.remove('hidden');

        document.getElementById('student-portal-btn').href = `home-aluno.html?studentId=${studentId}`;
        document.getElementById('selected-student-name-header').textContent = studentName;

        await updatePackageInfo(studentId);
        await updateModuleProgress(studentId);
    }
    async function updatePackageInfo(studentId) {
        try {
            const accessResult = platformAccess && currentProfile
                ? await platformAccess.assertStudentAccess(db, currentProfile, studentId)
                : { ok: true, doc: await db.collection('students').doc(studentId).get() };
            if (!accessResult.ok) return;

            const studentDoc = accessResult.doc;
            if (!studentDoc.exists) return;

            const data = studentDoc.data();
            const classCount = data.classCount || 0;
            const packageSize = data.pacoteContratado || 0;
            const packageValue = data.valorPacote ? data.valorPacote.toFixed(2).replace('.', ',') : '0,00';

            classCountDisplay.textContent = classCount;
            classCountDisplaySecondary.textContent = classCount;
            updateLastClassRegistration(data.lastClassRegisteredAt, classCount);

            if (packageSize > 0) {
                noPackageMessage.classList.add('hidden');
                packageDetails.classList.remove('hidden');
                const percentage = Math.round((classCount / packageSize) * 100);
                packageProgressBar.style.width = `${Math.min(100, percentage)}%`;
                packageProgressText.textContent = `${classCount} / ${packageSize} horas`;
                packageValueDisplay.textContent = `R$ ${packageValue}`;
                packageDateDisplay.textContent = data.dataInicioPacote || '--/--/----';
                packageStatusChip.textContent = percentage >= 100 ? 'Pacote conclu\u00eddo' : 'Pacote ativo';
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
            const accessResult = platformAccess && currentProfile
                ? await platformAccess.assertStudentAccess(db, currentProfile, studentId)
                : { ok: true, doc: await db.collection('students').doc(studentId).get() };
            if (!accessResult.ok) {
                modulesContainer.innerHTML = '<p class="section-copy">Este aluno nao pode ser gerenciado por esta conta.</p>';
                if (modulesStatus) modulesStatus.textContent = 'Acesso negado.';
                return;
            }

            const studentDoc = accessResult.doc;
            const studentData = studentDoc.exists ? studentDoc.data() : {};
            const progressData = studentData.progress || {};
            const studentType = studentData.studentType || 'a1';
            const assignedModules = getAssignedModules(studentData);
            renderModuleCards(studentData, studentId);

            const focusedModule = modulesData.find((module) => module.id === studentType);
            const focusedProgress = progressData[studentType] || {};
            const focusedState = resolveProgressState(focusedProgress, (focusedModule && focusedModule.lessons) || 0);
            const completedText = focusedState.lastCompleted ? formatLessonNumber(focusedState.lastCompleted) : 'Nenhuma li\u00e7\u00e3o conclu\u00edda';
            const nextText = focusedState.nextLesson ? formatLessonNumber(focusedState.nextLesson) : 'M\u00f3dulo conclu\u00eddo';

            studentTypeDisplay.textContent = describeStudentType(studentType);
            nextLessonDisplay.textContent = nextText;
            lastCompletedDisplay.textContent = completedText;
            if (teacherLastLesson) teacherLastLesson.textContent = completedText;
            if (teacherNextLesson) teacherNextLesson.textContent = nextText;
            if (teacherLessonNote) {
                teacherLessonNote.textContent = focusedState.nextLesson
                    ? `A próxima recomendação é ${nextText}. Use o portal ou abra o módulo em foco para manter a continuidade da aula.`
                    : 'A trilha principal já foi concluída. Este é um bom momento para revisão, consolidação ou transição de módulo.';
            }
            studentOverviewCopy.textContent = '';

            renderAssignedModules(studentData);
            renderModuleReleaseOptions(studentData, studentId);

            if (modulesStatus) modulesStatus.textContent = 'Modulos carregados com sucesso.';
        } catch (error) {
            console.error('Erro ao atualizar progresso dos módulos:', error);
            modulesContainer.innerHTML = '<p class="section-copy">Não foi possível carregar os módulos.</p>';
            if (modulesStatus) modulesStatus.textContent = 'Nao foi possivel carregar os modulos.';
        }
    }

    async function assignModuleToSelectedStudent(moduleId) {
        const studentId = localStorage.getItem('selectedStudentId');
        if (!studentId || !moduleId) return;

        try {
            if (platformAccess && currentProfile) {
                const accessResult = await platformAccess.assertStudentAccess(db, currentProfile, studentId);
                if (!accessResult.ok) throw new Error('Acesso negado ao aluno selecionado.');
                if (!isModuleAssignableByManager(moduleId)) {
                    throw new Error('Este modulo nao faz parte do plano atual.');
                }
            }

            await db.collection('students').doc(studentId).update({
                modules: firebase.firestore.FieldValue.arrayUnion(moduleId),
                accessibleProducts: firebase.firestore.FieldValue.arrayUnion(moduleId)
            });
            await updateModuleProgress(studentId);
            if (typeof showToast === 'function') {
                showToast(`${describeStudentType(moduleId)} foi liberado para o aluno.`, 'success', 'M\u00f3dulo liberado');
            }
        } catch (error) {
            console.error('Erro ao liberar módulo:', error);
            if (typeof showToast === 'function') {
                showToast('Não foi possível liberar o módulo agora.', 'error', 'Falha ao salvar');
            }
        }
    }

    async function setPrimaryModuleForSelectedStudent(moduleId) {
        const studentId = localStorage.getItem('selectedStudentId');
        if (!studentId || !moduleId) return;

        try {
            if (platformAccess && currentProfile) {
                const accessResult = await platformAccess.assertStudentAccess(db, currentProfile, studentId);
                if (!accessResult.ok) throw new Error('Acesso negado ao aluno selecionado.');
                if (!isModuleAssignableByManager(moduleId)) {
                    throw new Error('Este modulo nao faz parte do plano atual.');
                }
            }

            await db.collection('students').doc(studentId).update({
                studentType: moduleId,
                modules: firebase.firestore.FieldValue.arrayUnion(moduleId),
                accessibleProducts: firebase.firestore.FieldValue.arrayUnion(moduleId)
            });
            await updateModuleProgress(studentId);
            if (typeof showToast === 'function') {
                showToast(`${describeStudentType(moduleId)} agora \u00e9 a trilha principal do aluno.`, 'success', 'Trilha principal atualizada');
            }
        } catch (error) {
            console.error('Erro ao definir trilha principal:', error);
            if (typeof showToast === 'function') {
                showToast('N\u00e3o foi poss\u00edvel atualizar a trilha principal agora.', 'error', 'Falha ao salvar');
            }
        }
    }

    async function changeClassCount(amount) {
        const studentId = localStorage.getItem('selectedStudentId');
        if (!studentId) return;

        const studentRef = db.collection('students').doc(studentId);
        try {
            if (platformAccess && currentProfile) {
                const accessResult = await platformAccess.assertStudentAccess(db, currentProfile, studentId);
                if (!accessResult.ok) throw new Error('Acesso negado ao aluno selecionado.');
            }

            await db.runTransaction(async (transaction) => {
                const doc = await transaction.get(studentRef);
                if (!doc.exists) throw new Error('Aluno n\u00e3o encontrado.');
                const studentData = doc.data();
                const currentCount = studentData.classCount || 0;
                const newCount = currentCount + amount;
                if (newCount < 0) throw new Error('O contador j\u00e1 est\u00e1 zerado.');

                const registrationHistory = Array.isArray(studentData.classRegistrationHistory)
                    ? [...studentData.classRegistrationHistory]
                    : [];
                let lastClassRegisteredAt = studentData.lastClassRegisteredAt || null;

                if (amount > 0) {
                    const registeredAt = firebase.firestore.Timestamp.now();
                    registrationHistory.push(registeredAt);
                    lastClassRegisteredAt = registeredAt;
                } else if (amount < 0) {
                    registrationHistory.pop();
                    lastClassRegisteredAt = registrationHistory.length
                        ? registrationHistory[registrationHistory.length - 1]
                        : null;
                }

                transaction.update(studentRef, {
                    classCount: newCount,
                    classRegistrationHistory: registrationHistory.slice(-100),
                    lastClassRegisteredAt
                });
            });
            await updatePackageInfo(studentId);
            if (typeof showToast === 'function') {
                showToast('Hora registrada no pacote do aluno.', 'success', 'Carga horária atualizada');
            }
        } catch (error) {
            console.error('Erro ao atualizar contador:', error);
            if (typeof showToast === 'function') {
                showToast('N\u00e3o foi poss\u00edvel atualizar o contador agora.', 'error', 'Falha ao salvar');
            }
        }
    }

    if (addClassBtn) addClassBtn.addEventListener('click', () => changeClassCount(1));
    if (removeClassBtn) removeClassBtn.addEventListener('click', () => changeClassCount(-1));

    if (newPackageBtn) {
        newPackageBtn.addEventListener('click', () => {
            if (!localStorage.getItem('selectedStudentId')) return;
            openModal(newPackageModal, document.getElementById('package-type'));
        });
    }
    if (cancelPackageBtn) cancelPackageBtn.addEventListener('click', () => closeModal(newPackageModal));
    if (closePackageModalBtn) closePackageModalBtn.addEventListener('click', () => closeModal(newPackageModal));
    if (newPackageModal) {
        newPackageModal.addEventListener('click', (event) => {
            if (event.target === newPackageModal) closeModal(newPackageModal);
        });
    }

    if (newPackageForm) {
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
                if (platformAccess && currentProfile) {
                    const accessResult = await platformAccess.assertStudentAccess(db, currentProfile, studentId);
                    if (!accessResult.ok) throw new Error('Acesso negado ao aluno selecionado.');
                }

                await db.collection('students').doc(studentId).update({
                    pacoteContratado: packageSize,
                    valorPacote: packageValue,
                    dataInicioPacote: formattedDate,
                    classCount: 0,
                    classRegistrationHistory: [],
                    lastClassRegisteredAt: null
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
                    showToast('N\u00e3o foi poss\u00edvel salvar o novo pacote agora.', 'error', 'Falha ao salvar');
                }
            } finally {
                confirmPackageBtn.disabled = false;
                confirmPackageBtn.innerHTML = 'Confirmar pacote';
            }
        });
    }

    if (modulesContainer) {
        modulesContainer.addEventListener('click', async (event) => {
            const assignTrigger = event.target.closest('[data-assign-module]');
            if (assignTrigger) {
                event.preventDefault();
                if (assignTrigger.disabled) return;
                await assignModuleToSelectedStudent(assignTrigger.dataset.assignModule);
                return;
            }

            const primaryTrigger = event.target.closest('[data-set-primary-module]');
            if (primaryTrigger) {
                event.preventDefault();
                await setPrimaryModuleForSelectedStudent(primaryTrigger.dataset.setPrimaryModule);
            }
        });
    }

    if (releaseModuleSelect && releaseModuleBtn) {
        releaseModuleSelect.addEventListener('change', () => {
            releaseModuleBtn.disabled = !releaseModuleSelect.value;
        });

        releaseModuleBtn.addEventListener('click', async () => {
            const moduleId = releaseModuleSelect.value;
            if (!moduleId) return;

            releaseModuleBtn.disabled = true;
            releaseModuleBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Liberando...';

            try {
                await assignModuleToSelectedStudent(moduleId);
                releaseModuleSelect.value = '';
            } finally {
                releaseModuleBtn.innerHTML = '<i class="fas fa-unlock"></i> Liberar módulo';
                releaseModuleBtn.disabled = !releaseModuleSelect.value;
            }
        });
    }

    if (assignedModulesList) {
        assignedModulesList.addEventListener('click', async (event) => {
            const primaryTrigger = event.target.closest('[data-set-primary-module]');
            if (!primaryTrigger) return;
            event.preventDefault();
            await setPrimaryModuleForSelectedStudent(primaryTrigger.dataset.setPrimaryModule);
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        if (newPackageModal && !newPackageModal.classList.contains('hidden')) {
            closeModal(newPackageModal);
        }
    });
});



