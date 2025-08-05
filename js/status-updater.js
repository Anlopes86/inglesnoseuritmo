document.addEventListener('DOMContentLoaded', () => {
    const db = firebase.firestore();
    const auth = firebase.auth();

    const moduleKey = document.body.dataset.module;
    if (!moduleKey) {
        console.error("Atributo 'data-module' não encontrado no <body> da página.");
        return;
    }

    auth.onAuthStateChanged(user => {
        const role = localStorage.getItem('loggedInUserRole') || 'aluno';
        let studentId = role === 'professor' ? localStorage.getItem('selectedStudentId') : (user ? user.uid : null);
        
        if (role === 'professor' && !studentId) {
            return; 
        }

        updateLessonStatuses(studentId);
    });

    async function updateLessonStatuses(studentId) {
        let progress = {};
        if (studentId) {
            try {
                const studentDoc = await db.collection("students").doc(studentId).get();
                if (studentDoc.exists) {
                    progress = (studentDoc.data().progress && studentDoc.data().progress[moduleKey]) || {};
                }
            } catch (error) {
                console.error("Erro ao buscar progresso do aluno:", error);
            }
        }

        const lessons = document.querySelectorAll('[data-lesson]');
        let firstUncompleted = -1;

        lessons.forEach(lesson => {
            const lessonNumber = parseInt(lesson.dataset.lesson, 10);
            const isCompleted = progress[`lesson_${lessonNumber}`] === true;
            if (!isCompleted && firstUncompleted === -1) {
                firstUncompleted = lessonNumber;
            }
        });

        if (firstUncompleted === -1 && lessons.length > 0) {
            const hasAnyProgress = Object.keys(progress).length > 0;
            firstUncompleted = hasAnyProgress ? 999 : 1;
        }

        const isProfessor = localStorage.getItem('loggedInUserRole') === 'professor';

        lessons.forEach(lesson => {
            const lessonNumber = parseInt(lesson.dataset.lesson, 10);
            const isCompleted = progress[`lesson_${lessonNumber}`] === true;

            // PARTE 1: LÓGICA VISUAL (SEMPRE APLICADA)
            if (isCompleted) {
                lesson.classList.add('completed');
            } else if (lessonNumber === firstUncompleted) {
                lesson.classList.add('next');
            } else if (lessonNumber > firstUncompleted) {
                lesson.classList.add('locked');
            }

            // PARTE 2: LÓGICA DE ACESSO (APENAS PARA ALUNOS)
            if (!isProfessor) {
                if (!isCompleted && lessonNumber !== firstUncompleted) {
                    lesson.setAttribute('href', '#');
                }
            }
        });
    }
});