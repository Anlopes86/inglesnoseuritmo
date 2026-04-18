document.addEventListener('DOMContentLoaded', () => {
    const db = firebase.firestore();
    const auth = firebase.auth();
    const headerLink = document.querySelector('header a');

    async function resolveStatusViewerContext(user) {
        if (!user) return { role: 'aluno', studentId: null };

        const viewerDoc = await db.collection('students').doc(user.uid).get();
        const viewerData = viewerDoc.exists ? viewerDoc.data() : {};
        const role = viewerData.role || localStorage.getItem('loggedInUserRole') || 'aluno';

        if (role === 'professor') {
            const selectedStudentId = localStorage.getItem('selectedStudentId');
            if (!selectedStudentId) return { role, studentId: null };

            const studentDoc = await db.collection('students').doc(selectedStudentId).get();
            if (!studentDoc.exists || studentDoc.data().teacherId !== user.uid) {
                throw new Error('Acesso negado ao aluno selecionado.');
            }

            return { role, studentId: selectedStudentId };
        }

        if (role === 'admin') {
            return { role, studentId: null };
        }

        return { role, studentId: user.uid };
    }

    auth.onAuthStateChanged(async (user) => {
        if (!user) return;

        let context = { role: 'aluno', studentId: null };
        try {
            context = await resolveStatusViewerContext(user);
        } catch (error) {
            console.error('Erro ao validar contexto de status:', error);
        }

        if (headerLink) {
            const targetHref = context.role === 'professor'
                ? '../index.html'
                : context.role === 'admin'
                    ? '../admin.html'
                    : '../home-aluno.html';
            const targetLabel = context.role === 'professor'
                ? ' Voltar ao painel'
                : context.role === 'admin'
                    ? ' Voltar ao admin'
                    : ' Voltar ao portal';

            headerLink.href = targetHref;
            for (const node of headerLink.childNodes) {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
                    node.textContent = targetLabel;
                    break;
                }
            }
        }

        const moduleKey = document.body.dataset.module;
        if (!moduleKey) {
            console.error("Atributo 'data-module' nao foi encontrado no <body>.");
            return;
        }

        if ((context.role === 'professor' && context.studentId) || context.role === 'aluno') {
            updateLessonStatuses(context.studentId, moduleKey, context.role);
        }
    });

    async function updateLessonStatuses(studentId, moduleKey, role) {
        if (!studentId) return;

        let progress = {};
        try {
            const studentDoc = await db.collection('students').doc(studentId).get();
            if (studentDoc.exists) {
                progress = (studentDoc.data().progress && studentDoc.data().progress[moduleKey]) || {};
            }
        } catch (error) {
            console.error('Erro ao buscar progresso do aluno:', error);
        }

        const lessons = document.querySelectorAll('[data-lesson]');
        let firstUncompleted = -1;

        lessons.forEach((lesson) => {
            const lessonNumber = parseInt(lesson.dataset.lesson, 10);
            if (!progress[`lesson_${lessonNumber}`] && firstUncompleted === -1) {
                firstUncompleted = lessonNumber;
            }
        });

        if (firstUncompleted === -1 && lessons.length > 0) {
            firstUncompleted = lessons.length + 1;
        }

        const isProfessor = role === 'professor';

        lessons.forEach((lesson) => {
            const lessonNumber = parseInt(lesson.dataset.lesson, 10);
            const isCompleted = progress[`lesson_${lessonNumber}`] === true;

            if (isCompleted) {
                lesson.classList.add('completed');
            } else if (lessonNumber === firstUncompleted) {
                lesson.classList.add('next');
            } else if (lessonNumber > firstUncompleted) {
                lesson.classList.add('locked');
            }

            const stateNode = lesson.querySelector('.lesson-state');
            if (stateNode) {
                stateNode.innerHTML = isCompleted
                    ? '<i class="fas fa-award text-emerald-600"></i>Concluida'
                    : lessonNumber === firstUncompleted
                        ? '<i class="fas fa-forward text-blue-600"></i>Disponivel agora'
                        : '<i class="fas fa-lock text-slate-400"></i>Bloqueada';
            }

            if (!isProfessor && !isCompleted && lessonNumber !== firstUncompleted) {
                lesson.setAttribute('href', '#');
            }
        });
    }
});
