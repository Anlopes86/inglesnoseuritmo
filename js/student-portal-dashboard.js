document.addEventListener('DOMContentLoaded', () => {
    const db = firebase.firestore();
    const auth = firebase.auth();
    const platformAccess = window.PlatformAccess;

    const MODULES = {
        nivelamento: { href: 'nivelamento/licao-01.html', label: 'Teste de Nivelamento', family: 'Diagnóstico de entrada', icon: 'fa-clipboard-check', total: 1, helper: 'Descubra a faixa mais adequada para começar ou retomar o curso.' },
        a1: { href: 'a1/a1.html', label: 'Módulo A1', family: 'Trilha principal', icon: 'fa-seedling', total: 32, helper: 'Fundamentos para as primeiras interações, rotina e comunicação essencial.' },
        'a1-v2': { href: 'a1-v2/a1-v2.html', label: 'Módulo A1 V2', version: 'V2 · teste', family: 'Versão de teste', icon: 'fa-flask', total: 32, helper: 'Versão paralela do A1 disponível para validação pedagógica.' },
        'a1-v3': { href: 'a1-v3/a1-v3.html', label: 'Módulo A1 V3', version: 'V3 · teste', family: 'Versão de teste', icon: 'fa-flask-vial', total: 32, helper: 'Aulas prontas de 60 minutos com prática guiada e revisões focadas.' },
        a2: { href: 'a2/a2.html', label: 'Módulo A2', family: 'Trilha principal', icon: 'fa-compass', total: 32, helper: 'Mais repertório para falar do cotidiano, passado, planos e comparações.' },
        'a2-v2': { href: 'a2-v2/a2.html', label: 'Módulo A2 V2', version: 'V2 · teste', family: 'Versão de teste', icon: 'fa-flask', total: 32, helper: 'Versão paralela com tradução, fala e prática CEFR ampliada.' },
        'a2-v3': { href: 'a2-v3/a2-v3.html', label: 'Módulo A2 V3', version: 'V3 · teste', family: 'Versão de teste', icon: 'fa-flask-vial', total: 32, helper: 'Sessões fechadas de 60 minutos e missões comunicativas variadas.' },
        prepb1: { href: 'prepb1/prepb1.html', label: 'Ponte A2–B1', family: 'Transição CEFR', icon: 'fa-arrow-right-arrow-left', total: 8, helper: 'Consolidação de A1 e A2 antes da entrada no nível intermediário.' },
        b1: { href: 'b1/b1.html', label: 'Módulo B1', family: 'Trilha principal', icon: 'fa-chart-line', total: 32, helper: 'Autonomia para relatar experiências, sustentar opiniões e explicar planos.' },
        'b1-v2': { href: 'b1-v2/b1-v2.html', label: 'Módulo B1 V2', version: 'V2 · teste', family: 'Versão de teste', icon: 'fa-flask', total: 32, helper: 'Versão paralela do B1 para testar novos formatos de prática.' },
        'b1-v3': { href: 'b1-v3/b1-v3.html', label: 'Módulo B1 V3', version: 'V3 · teste', family: 'Versão de teste', icon: 'fa-flask-vial', total: 32, helper: 'Sessões de 60 minutos com speaking, listening guiado e avaliação.' },
        conversation: { href: 'conversation/conversation.html', label: 'Conversation Club', family: 'Fluência', icon: 'fa-comments', total: 64, helper: 'Temas para ampliar repertório, opinião e confiança na conversa.' },
        business: { href: 'business/business.html', label: 'Inglês para Negócios', family: 'Inglês profissional', icon: 'fa-briefcase', total: 8, helper: 'Preparação prática para entrevistas de emprego em inglês.' },
        essentials: { href: 'essentials/essentials.html', label: 'English Essentials', family: 'Reforço', icon: 'fa-key', total: 16, helper: 'Revisão dos fundamentos essenciais para fortalecer a base.' },
        vestibular: { href: 'vestibular/vestibular.html', label: 'Jornada Vestibular', family: 'Preparação', icon: 'fa-school', total: 16, helper: 'Leitura, gramática, estratégia e simulados autorais para provas.' }
    };

    const get = (id) => document.getElementById(id);
    const ui = {
        greeting: get('student-greeting'), headerName: get('header-student-name'), moduleChip: get('module-chip'),
        helper: get('hub-helper-text'), nextLesson: get('next-lesson-name'), nextHelper: get('next-lesson-helper'),
        lessonsLink: get('lessons-link'), mobileLessonsLink: get('mobile-lessons-link'), summaryModule: get('summary-module'),
        summaryLessons: get('summary-lessons'), summaryHours: get('summary-hours'), packageLabel: get('summary-package-label'),
        packagePercent: get('summary-package-percent'), packageProgress: get('summary-package-progress'), packageStatus: get('package-status-badge'),
        lastClassNote: get('last-class-note'), journeyCopy: get('journey-copy'), moduleList: get('module-selector-list'),
        moduleCount: get('modules-count-badge'), backBtn: get('back-btn'), backLabel: get('back-btn-label'),
        errorPanel: get('error-actions'), errorMessage: get('error-message'), retryBtn: get('retry-btn'), logoutBtn: get('logout-btn')
    };

    let studentId = '';
    let studentData = null;
    let activeModuleId = '';

    function toDate(value) {
        if (!value) return null;
        if (value instanceof Date) return value;
        if (typeof value.toDate === 'function') return value.toDate();
        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    function formatDate(value) {
        const date = toDate(value);
        return date ? new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(date) : '';
    }

    function progressState(progress, total) {
        const safe = progress || {};
        let next = null;
        let last = null;
        for (let lesson = 1; lesson <= total; lesson += 1) {
            if (safe[`lesson_${lesson}`] !== true) { next = lesson; break; }
        }
        for (let lesson = total; lesson >= 1; lesson -= 1) {
            if (safe[`lesson_${lesson}`] === true) { last = lesson; break; }
        }
        const completed = Math.min(Object.values(safe).filter((value) => value === true).length, total);
        return { completed, next, last };
    }

    function assignedModules(data) {
        const candidates = platformAccess?.getStudentAccessibleProducts
            ? platformAccess.getStudentAccessibleProducts(data)
            : [...(data.modules || []), ...(data.studentType ? [data.studentType] : [])];
        const released = [...new Set(candidates)].filter((id) => id !== 'nivelamento' && MODULES[id]);
        return ['nivelamento', ...released];
    }

    function setBackButton(profile, managerView) {
        ui.backBtn.classList.toggle('hidden', !managerView);
        if (!managerView) return;
        const isAdmin = platformAccess.isAdmin(profile);
        ui.backBtn.href = isAdmin ? 'admin.html' : 'index.html';
        ui.backLabel.textContent = isAdmin ? 'Voltar ao admin' : 'Voltar ao painel';
    }

    function renderPackage(data) {
        const used = Math.max(0, Number(data.classCount) || 0);
        const total = Math.max(0, Number(data.pacoteContratado) || 0);
        const percent = total > 0 ? Math.min(100, Math.round((used / total) * 100)) : 0;
        const latest = formatDate(data.lastClassRegisteredAt);
        const progressbar = document.querySelector('.package-progress-block [role="progressbar"]');

        ui.summaryHours.textContent = total > 0 ? `${used}h de ${total}h` : `${used}h`;
        ui.packageLabel.textContent = total > 0 ? `${used} de ${total} horas utilizadas` : 'Pacote ainda não informado';
        ui.packagePercent.textContent = `${percent}%`;
        ui.packageProgress.style.width = `${percent}%`;
        progressbar?.setAttribute('aria-valuenow', String(percent));
        ui.packageStatus.textContent = total > 0 ? (percent >= 100 ? 'Pacote concluído' : 'Pacote ativo') : 'Sem pacote';
        ui.lastClassNote.textContent = latest
            ? `Última aula registrada em ${latest}. Horas e lições são contabilizadas separadamente.`
            : 'As horas do pacote são independentes da quantidade de lições concluídas.';
    }

    function selectModule(moduleId) {
        const module = MODULES[moduleId];
        if (!module || !studentData) return;
        const state = progressState(studentData.progress?.[moduleId], module.total);
        const next = state.next ? `Lição ${String(state.next).padStart(2, '0')}` : 'Módulo concluído';

        activeModuleId = moduleId;
        localStorage.setItem(`studentPortalActiveModule:${studentId}`, moduleId);
        ui.moduleChip.innerHTML = `<i class="fas ${module.version ? 'fa-flask' : 'fa-route'}" aria-hidden="true"></i> ${module.label}`;
        ui.nextLesson.textContent = next;
        ui.nextHelper.textContent = state.next
            ? `${module.label} · ${state.completed} de ${module.total} lições concluídas`
            : 'Parabéns: todas as lições desta trilha estão concluídas.';
        ui.summaryModule.textContent = module.label;
        ui.summaryLessons.textContent = `${state.completed} de ${module.total}`;
        [ui.lessonsLink, ui.mobileLessonsLink].forEach((link) => {
            link.href = module.href;
            link.classList.remove('is-disabled');
            link.removeAttribute('aria-disabled');
        });
    }

    function renderModules(modules) {
        ui.moduleCount.textContent = `${modules.length} ${modules.length === 1 ? 'módulo' : 'módulos'}`;
        if (!modules.length) {
            ui.moduleList.innerHTML = '<p class="section-copy">Nenhum módulo foi liberado para este acesso ainda.</p>';
            ui.journeyCopy.textContent = 'Fale com seu professor para definir a primeira trilha.';
            return;
        }

        ui.moduleList.innerHTML = modules.map((id) => {
            const module = MODULES[id];
            const state = progressState(studentData.progress?.[id], module.total);
            const active = id === activeModuleId;
            const status = state.next ? `Próxima: lição ${String(state.next).padStart(2, '0')}` : 'Trilha concluída';
            return `
                <button type="button" class="student-module-card ${active ? 'is-active' : ''}" data-module-id="${id}" aria-pressed="${active}">
                    <span class="module-card-top">
                        <span class="module-card-icon"><i class="fas ${module.icon}" aria-hidden="true"></i></span>
                        <span class="module-version-badge">${module.version || module.family}</span>
                    </span>
                    <span><h3>${module.label}</h3><p>${module.helper}</p></span>
                    <span class="module-card-footer">
                        <span>${state.completed}/${module.total} lições</span>
                        <span class="module-progress-label">${active ? 'Selecionado' : status}</span>
                    </span>
                </button>`;
        }).join('');

        const testVersions = modules.filter((id) => MODULES[id].version).length;
        ui.journeyCopy.textContent = testVersions
            ? `${modules.length} trilhas disponíveis, incluindo ${testVersions} ${testVersions === 1 ? 'versão de teste' : 'versões de teste'}. Cada versão mantém seu próprio progresso.`
            : 'Escolha um módulo para consultar o progresso e continuar do ponto certo.';
    }

    function showError(message) {
        ui.errorMessage.textContent = message;
        ui.errorPanel.classList.remove('hidden');
        ui.moduleList.innerHTML = '<p class="section-copy">Não foi possível carregar os módulos.</p>';
    }

    async function loadPortal() {
        const user = auth.currentUser;
        if (!user) { window.location.href = 'login.html'; return; }
        ui.errorPanel.classList.add('hidden');
        const params = new URLSearchParams(window.location.search);
        const requestedId = params.get('studentId');

        try {
            const profile = platformAccess ? await platformAccess.fetchProfileById(db, user.uid) : null;
            const managerView = Boolean(requestedId && profile && platformAccess.isManager(profile));
            studentId = managerView ? requestedId : user.uid;
            setBackButton(profile, managerView);

            let studentDoc;
            if (managerView) {
                const access = await platformAccess.assertStudentAccess(db, profile, studentId);
                if (!access.ok) throw new Error('Este aluno não pertence ao espaço de trabalho desta conta.');
                studentDoc = access.doc;
            } else {
                studentDoc = await db.collection('students').doc(studentId).get();
            }
            if (!studentDoc.exists) throw new Error('Não encontramos os dados deste aluno.');

            studentData = studentDoc.data();
            const firstName = (studentData.name || 'Aluno').trim().split(/\s+/)[0];
            const modules = assignedModules(studentData);
            const stored = localStorage.getItem(`studentPortalActiveModule:${studentId}`);
            activeModuleId = [params.get('module'), stored, studentData.studentType, modules[0]]
                .find((id) => id && modules.includes(id)) || '';

            ui.greeting.textContent = `Olá, ${firstName}. Seu próximo passo já está pronto.`;
            ui.headerName.textContent = managerView ? `Visualizando ${firstName}` : `Olá, ${firstName}`;
            ui.headerName.classList.remove('hidden');
            ui.helper.textContent = managerView
                ? 'Você está vendo exatamente a experiência deste aluno. Escolha a trilha e abra a aula que será aplicada.'
                : 'Continue pela aula recomendada ou faça uma revisão rápida nos flashcards salvos.';

            renderPackage(studentData);
            if (activeModuleId) selectModule(activeModuleId);
            renderModules(modules);
        } catch (error) {
            console.error('Erro ao carregar o portal do aluno:', error);
            showError(error.message || 'Não foi possível carregar sua trilha agora.');
        }
    }

    ui.moduleList.addEventListener('click', (event) => {
        const button = event.target.closest('[data-module-id]');
        if (!button || !studentData) return;
        selectModule(button.dataset.moduleId);
        renderModules(assignedModules(studentData));
        document.getElementById('next-step-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    ui.retryBtn.addEventListener('click', loadPortal);
    ui.logoutBtn.addEventListener('click', async () => {
        ui.logoutBtn.disabled = true;
        try {
            await auth.signOut();
            localStorage.clear();
            window.location.href = 'login.html';
        } catch (error) {
            ui.logoutBtn.disabled = false;
            if (typeof showToast === 'function') showToast('Não foi possível sair agora.', 'error', 'Falha ao sair');
        }
    });

    auth.onAuthStateChanged((user) => {
        if (!user) { window.location.href = 'login.html'; return; }
        loadPortal();
    });
});
