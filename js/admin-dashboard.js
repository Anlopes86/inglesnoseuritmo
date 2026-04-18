document.addEventListener('DOMContentLoaded', () => {
    const db = firebase.firestore();
    const auth = firebase.auth();
    const platformAccess = window.PlatformAccess;

    const logoutBtn = document.getElementById('logout-btn');
    const adminSummary = document.getElementById('admin-summary');
    const teachersCount = document.getElementById('teachers-count');
    const teacherList = document.getElementById('teacher-list');
    const selectedTeacherChip = document.getElementById('selected-teacher-chip');
    const teacherPlanForm = document.getElementById('teacher-plan-form');
    const teacherPlanInput = document.getElementById('teacher-plan');
    const subscriptionStatusInput = document.getElementById('subscription-status');
    const studentLimitInput = document.getElementById('student-limit');
    const billingCycleInput = document.getElementById('billing-cycle');
    const planStartedAtInput = document.getElementById('plan-started-at');
    const planEndsAtInput = document.getElementById('plan-ends-at');
    const cancelAtPeriodEndInput = document.getElementById('cancel-at-period-end');
    const teacherMetrics = document.getElementById('teacher-metrics');
    const clearTeacherSelectionBtn = document.getElementById('clear-teacher-selection');
    const saveTeacherPlanBtn = document.getElementById('save-teacher-plan');
    const orphanCount = document.getElementById('orphan-count');
    const orphanList = document.getElementById('orphan-list');
    const assignOrphansBtn = document.getElementById('assign-orphans-btn');
    const refreshAdminDataBtn = document.getElementById('refresh-admin-data');

    let currentAdminProfile = null;
    let teachersCache = [];
    let orphanStudentsCache = [];
    let selectedTeacherId = '';

    function formatDateInput(value) {
        if (!value) return '';
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
        const date = value?.toDate ? value.toDate() : new Date(value);
        if (Number.isNaN(date.getTime())) return '';
        return date.toISOString().slice(0, 10);
    }

    function getSelectedTeacher() {
        return teachersCache.find((teacher) => teacher.id === selectedTeacherId) || null;
    }

    async function countStudentsForTeacher(teacherId) {
        if (!teacherId) return 0;
        const snapshot = await db.collection('students')
            .where('role', '==', platformAccess.ROLES.ALUNO)
            .where('teacherId', '==', teacherId)
            .get();
        return snapshot.size;
    }

    function renderTeacherForm(teacher) {
        if (!teacher) {
            selectedTeacherChip.textContent = 'Nenhum professor selecionado';
            teacherPlanInput.value = 'starter';
            subscriptionStatusInput.value = 'active';
            studentLimitInput.value = '';
            billingCycleInput.value = 'monthly';
            planStartedAtInput.value = '';
            planEndsAtInput.value = '';
            cancelAtPeriodEndInput.checked = false;
            teacherMetrics.innerHTML = '<p class="section-copy">Selecione um professor para ver ocupacao, limite e status.</p>';
            return;
        }

        const plan = platformAccess.getEffectivePlan(teacher.data);
        selectedTeacherChip.textContent = teacher.displayName;
        teacherPlanInput.value = plan.id;
        subscriptionStatusInput.value = teacher.data.subscriptionStatus || 'active';
        studentLimitInput.value = typeof teacher.data.studentLimit === 'number' ? teacher.data.studentLimit : '';
        billingCycleInput.value = teacher.data.billingCycle || plan.billingCycle;
        planStartedAtInput.value = formatDateInput(teacher.data.planStartedAt);
        planEndsAtInput.value = formatDateInput(teacher.data.planEndsAt);
        cancelAtPeriodEndInput.checked = teacher.data.cancelAtPeriodEnd === true;

        teacherMetrics.innerHTML = `
            <div class="grid gap-3 md:grid-cols-3">
                <div class="mini-stat">
                    <p class="kpi-label">Plano</p>
                    <p class="kpi-value text-2xl">${plan.label}</p>
                </div>
                <div class="mini-stat">
                    <p class="kpi-label">Alunos</p>
                    <p class="kpi-value text-2xl">${teacher.studentCount}/${platformAccess.formatStudentLimit(plan.studentLimit)}</p>
                </div>
                <div class="mini-stat">
                    <p class="kpi-label">Status</p>
                    <p class="kpi-value text-2xl">${platformAccess.getSubscriptionBadge(plan.subscriptionStatus)}</p>
                </div>
            </div>
        `;
    }

    function renderTeacherList() {
        teachersCount.textContent = `${teachersCache.length} ${teachersCache.length === 1 ? 'professor' : 'professores'}`;

        if (!teachersCache.length) {
            teacherList.innerHTML = '<p class="section-copy">Nenhum professor encontrado.</p>';
            renderTeacherForm(null);
            return;
        }

        teacherList.innerHTML = teachersCache.map((teacher) => {
            const plan = platformAccess.getEffectivePlan(teacher.data);
            const isActive = teacher.id === selectedTeacherId;
            return `
                <button
                    type="button"
                    class="teacher-card text-left ${isActive ? 'is-active' : ''}"
                    data-select-teacher="${teacher.id}"
                >
                    <div class="flex items-start justify-between gap-3">
                        <div>
                            <p class="text-lg font-extrabold strong-text">${teacher.displayName}</p>
                            <p class="section-copy mt-2">${teacher.data.email || 'Sem e-mail'}</p>
                        </div>
                        <span class="info-chip ${isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}">${plan.label}</span>
                    </div>
                    <div class="mt-4 flex flex-wrap gap-2">
                        <span class="info-chip bg-blue-100 text-blue-700">${teacher.studentCount} alunos</span>
                        <span class="info-chip bg-emerald-100 text-emerald-700">${platformAccess.getSubscriptionBadge(plan.subscriptionStatus)}</span>
                    </div>
                </button>
            `;
        }).join('');

        renderTeacherForm(getSelectedTeacher());
    }

    function renderOrphanStudents() {
        orphanCount.textContent = `${orphanStudentsCache.length} pendentes`;

        if (!orphanStudentsCache.length) {
            orphanList.innerHTML = '<p class="section-copy">Nenhum aluno pendente. A base ja esta alinhada com teacherId.</p>';
            return;
        }

        orphanList.innerHTML = orphanStudentsCache.map((student) => `
            <div class="orphan-item">
                <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p class="font-bold strong-text">${student.name || 'Aluno sem nome'}</p>
                        <p class="section-copy mt-1">${student.email || 'Sem e-mail cadastrado'}</p>
                    </div>
                    <span class="info-chip bg-amber-100 text-amber-700">${student.studentType || 'sem trilha'}</span>
                </div>
            </div>
        `).join('');
    }

    async function loadTeachers() {
        const teachersSnapshot = await db.collection('students')
            .where('role', '==', platformAccess.ROLES.PROFESSOR)
            .get();

        const teachers = await Promise.all(teachersSnapshot.docs.map(async (doc) => {
            const profile = platformAccess.buildProfile(doc.id, doc.data());
            const studentCount = await countStudentsForTeacher(doc.id);
            return {
                ...profile,
                studentCount
            };
        }));

        teachers.sort((a, b) => a.displayName.localeCompare(b.displayName));
        teachersCache = teachers;

        if (!selectedTeacherId && teachersCache.length) {
            selectedTeacherId = localStorage.getItem(platformAccess.STORAGE_KEYS.ADMIN_SELECTED_TEACHER_ID) || teachersCache[0].id;
        }

        if (selectedTeacherId && !teachersCache.some((teacher) => teacher.id === selectedTeacherId)) {
            selectedTeacherId = teachersCache[0]?.id || '';
        }

        platformAccess.setAdminManagedTeacherId(selectedTeacherId);
        renderTeacherList();
    }

    async function loadOrphanStudents() {
        const studentsSnapshot = await db.collection('students')
            .where('role', '==', platformAccess.ROLES.ALUNO)
            .get();

        orphanStudentsCache = studentsSnapshot.docs
            .filter((doc) => !doc.data().teacherId)
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => (a.name || '').localeCompare(b.name || ''));

        renderOrphanStudents();
    }

    async function loadAdminData() {
        await Promise.all([loadTeachers(), loadOrphanStudents()]);
        adminSummary.textContent = `${teachersCache.length} professores e ${orphanStudentsCache.length} aluno(s) legados aguardando vinculacao.`;
    }

    async function saveTeacherPlan(event) {
        event.preventDefault();
        const teacher = getSelectedTeacher();
        if (!teacher) {
            if (typeof showToast === 'function') {
                showToast('Selecione um professor antes de salvar.', 'info', 'Nenhum professor selecionado');
            }
            return;
        }

        saveTeacherPlanBtn.disabled = true;
        saveTeacherPlanBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';

        try {
            const parsedLimit = studentLimitInput.value === '' ? null : parseInt(studentLimitInput.value, 10);
            const payload = {
                platformPlan: teacherPlanInput.value,
                subscriptionStatus: subscriptionStatusInput.value,
                studentLimit: Number.isFinite(parsedLimit) ? parsedLimit : null,
                billingCycle: billingCycleInput.value,
                cancelAtPeriodEnd: cancelAtPeriodEndInput.checked,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            if (planStartedAtInput.value) payload.planStartedAt = planStartedAtInput.value;
            if (planEndsAtInput.value) payload.planEndsAt = planEndsAtInput.value;

            await db.collection('students').doc(teacher.id).update(payload);
            if (typeof showToast === 'function') {
                showToast('Plano e limites atualizados com sucesso.', 'success', 'Professor atualizado');
            }
            await loadAdminData();
        } catch (error) {
            console.error('Erro ao salvar plano do professor:', error);
            if (typeof showToast === 'function') {
                showToast('Nao foi possivel salvar a configuracao agora.', 'error', 'Falha ao salvar');
            }
        } finally {
            saveTeacherPlanBtn.disabled = false;
            saveTeacherPlanBtn.innerHTML = 'Salvar configuracao';
        }
    }

    async function assignOrphansToSelectedTeacher() {
        const teacher = getSelectedTeacher();
        if (!teacher) {
            if (typeof showToast === 'function') {
                showToast('Selecione um professor antes de vincular os alunos pendentes.', 'info', 'Professor necessario');
            }
            return;
        }

        if (!orphanStudentsCache.length) {
            if (typeof showToast === 'function') {
                showToast('Nao existem alunos pendentes para vincular.', 'info', 'Sem pendencias');
            }
            return;
        }

        assignOrphansBtn.disabled = true;
        assignOrphansBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Vinculando...';

        try {
            const batch = db.batch();
            orphanStudentsCache.forEach((student) => {
                const ref = db.collection('students').doc(student.id);
                batch.update(ref, {
                    teacherId: teacher.id,
                    teacherName: teacher.displayName,
                    tenantId: teacher.id,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            });
            await batch.commit();

            if (typeof showToast === 'function') {
                showToast(`${orphanStudentsCache.length} aluno(s) vinculados ao professor selecionado.`, 'success', 'Migracao aplicada');
            }
            await loadAdminData();
        } catch (error) {
            console.error('Erro ao vincular alunos pendentes:', error);
            if (typeof showToast === 'function') {
                showToast('Nao foi possivel vincular os alunos pendentes agora.', 'error', 'Falha na migracao');
            }
        } finally {
            assignOrphansBtn.disabled = false;
            assignOrphansBtn.innerHTML = '<i class="fas fa-link"></i> Vincular pendentes ao professor selecionado';
        }
    }

    teacherList.addEventListener('click', (event) => {
        const trigger = event.target.closest('[data-select-teacher]');
        if (!trigger) return;
        selectedTeacherId = trigger.dataset.selectTeacher;
        platformAccess.setAdminManagedTeacherId(selectedTeacherId);
        renderTeacherList();
    });

    teacherPlanForm.addEventListener('submit', saveTeacherPlan);

    clearTeacherSelectionBtn.addEventListener('click', () => {
        selectedTeacherId = '';
        platformAccess.setAdminManagedTeacherId('');
        renderTeacherList();
    });

    assignOrphansBtn.addEventListener('click', assignOrphansToSelectedTeacher);
    refreshAdminDataBtn.addEventListener('click', loadAdminData);

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            logoutBtn.disabled = true;
            try {
                await auth.signOut();
                localStorage.clear();
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Erro ao sair do admin:', error);
                logoutBtn.disabled = false;
            }
        });
    }

    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        currentAdminProfile = await platformAccess.getCurrentProfile(auth, db);
        if (!currentAdminProfile || !platformAccess.isAdmin(currentAdminProfile)) {
            if (typeof showToast === 'function') {
                showToast('Este painel e restrito para administradores.', 'error', 'Acesso restrito');
            }
            await auth.signOut();
            return;
        }

        await loadAdminData();
    });
});
