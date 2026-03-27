document.addEventListener('DOMContentLoaded', () => {
    const db = firebase.firestore();
    const auth = firebase.auth();
    const headerLink = document.querySelector('header a');

    auth.onAuthStateChanged(async (user) => {
        let userRole = 'professor';
        let studentIdForProgress;

        if (user) {
            try {
                const userDoc = await db.collection('students').doc(user.uid).get();
                if (userDoc.exists) {
                    userRole = userDoc.data().role || 'aluno';
                }
            } catch (error) {
                console.error('Erro ao buscar o papel do usuário:', error);
            }
        }

        if (headerLink) {
            const targetHref = userRole === 'professor' ? '../index.html' : '../home-aluno.html';
            const targetLabel = userRole === 'professor' ? ' Voltar ao painel' : ' Voltar ao portal';

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
            console.error("Atributo 'data-module' não foi encontrado no <body>.");
            return;
        }

        if (userRole === 'professor') {
            studentIdForProgress = localStorage.getItem('selectedStudentId');
        } else {
            studentIdForProgress = user ? user.uid : null;
        }

        if ((userRole === 'professor' && studentIdForProgress) || userRole === 'aluno') {
            updateLessonStatuses(studentIdForProgress, moduleKey, userRole);
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
                    ? '<i class="fas fa-award text-emerald-600"></i>Concluída'
                    : lessonNumber === firstUncompleted
                        ? '<i class="fas fa-forward text-blue-600"></i>Disponível agora'
                        : '<i class="fas fa-lock text-slate-400"></i>Bloqueada';
            }

            if (!isProfessor && !isCompleted && lessonNumber !== firstUncompleted) {
                lesson.setAttribute('href', '#');
            }
        });
    }
});
