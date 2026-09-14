(function advancedV3ModuleHub(globalScope) {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const moduleId = document.body.dataset.module;
        const curriculum = globalScope.V3Curriculum;
        const lessons = curriculum?.getModule(moduleId) || [];
        const grid = document.getElementById('lessons-grid');
        const loading = document.getElementById('loading');
        const db = typeof globalScope.db !== 'undefined' ? globalScope.db : globalScope.firebase?.firestore?.();

        function card(lesson, state, canOpen, owner) {
            const link = document.createElement('a');
            const number = String(lesson.number).padStart(2, '0');
            link.href = canOpen ? globalScope.StudentContext.link(`licao-${number}.html`, owner) : '#';
            link.className = `module-lesson-card ${state} ${lesson.type}`;
            link.setAttribute('aria-disabled', String(!canOpen));
            link.innerHTML = `
                <div class="module-card-head">
                    <span>${lesson.type === 'content' ? 'Conteúdo integrado' : lesson.type === 'review' ? 'Missão comunicativa' : 'Capstone'}</span>
                    <i class="fas ${state === 'complete' ? 'fa-circle-check' : state === 'next' ? 'fa-circle-play' : 'fa-lock'}" aria-hidden="true"></i>
                </div>
                <p class="module-card-number">Lição ${number}</p>
                <h2>${lesson.title}</h2>
                <p>${lesson.linguisticFocus}</p>
                <div class="module-card-meta"><span>${lesson.oralInteractionMinutes} min oral</span><span>${state === 'complete' ? 'Concluída' : state === 'next' ? 'Disponível' : 'Bloqueada'}</span></div>`;
            if (!canOpen) link.addEventListener('click', event => event.preventDefault());
            return link;
        }

        function render(progress, isManager, owner) {
            const firstPending = lessons.find(lesson => !curriculum.isLessonComplete(progress, moduleId, lesson.id))?.number || lessons.length + 1;
            grid.innerHTML = '';
            lessons.forEach(lesson => {
                const complete = curriculum.isLessonComplete(progress, moduleId, lesson.id);
                const state = complete ? 'complete' : lesson.number === firstPending ? 'next' : 'locked';
                grid.appendChild(card(lesson, state, isManager || state !== 'locked', owner));
            });
            loading.hidden = true;
            grid.hidden = false;
        }

        async function load() {
            const user = globalScope.firebase?.auth?.().currentUser;
            if (!user || !db) {
                loading.textContent = 'Faça login para acessar este módulo de teste.';
                return;
            }
            try {
                const context = await globalScope.StudentContextReady;
                if (!context) throw new Error('Recarregue a página para validar o aluno.');
                const owner = await context.resolve(db, user);
                context.wireLinks(owner);
                const {role, studentId} = owner;
                const isManager = role === 'professor' || role === 'admin';
                const studentDoc = await db.collection('students').doc(studentId).get();
                const student = studentDoc.exists ? studentDoc.data() : {};
                if (role === 'professor' && student.teacherId !== user.uid) throw new Error('Acesso negado ao aluno selecionado.');

                const products = globalScope.PlatformAccess?.getStudentAccessibleProducts(student)
                    || [...(student.modules || []), ...(student.accessibleProducts || []), student.studentType].filter(Boolean);
                if (globalScope.PlatformAccess && !globalScope.PlatformAccess.canAccessModule(products, moduleId)) {
                    throw new Error(`Este aluno não possui acesso ao módulo ${moduleId.toUpperCase()}.`);
                }
                render(student.progress || {}, isManager, owner);
            } catch (error) {
                console.error(`Erro ao carregar ${moduleId}:`, error);
                loading.textContent = error.message || 'Não foi possível carregar as lições.';
            }
        }

        globalScope.firebase?.auth?.().onAuthStateChanged(user => {
            if (user) load();
            else loading.textContent = 'Faça login para acessar este módulo de teste.';
        });
    });
}(window));
