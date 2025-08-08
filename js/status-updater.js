document.addEventListener('DOMContentLoaded', () => {
    const db = firebase.firestore();
    const auth = firebase.auth();
    const headerLink = document.querySelector('header a'); // Seleciona o link do cabeçalho uma vez

    // Espera o status da autenticação ser definido para tomar qualquer ação
    auth.onAuthStateChanged(async user => {
        let userRole = 'professor'; // Assume 'professor' como padrão seguro
        let studentIdForProgress;

        if (user) {
            // Se há um usuário logado, verificamos seu papel no Firestore
            try {
                const userDoc = await db.collection("students").doc(user.uid).get();
                if (userDoc.exists) {
                    userRole = userDoc.data().role || 'aluno'; // Pega o papel, ou assume 'aluno' se não estiver definido
                }
            } catch (error) {
                console.error("Erro ao buscar o papel do usuário:", error);
            }
        }
        
        // --- 1. ATUALIZAÇÃO DO BOTÃO DO CABEÇALHO ---
        if (headerLink) {
            if (userRole === 'aluno') {
                headerLink.href = '../aluno.html';
                // Altera apenas o texto, preservando o ícone
                for (let node of headerLink.childNodes) {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
                        node.textContent = ' Voltar ao Portal';
                        break;
                    }
                }
            }
            // Se o papel for 'professor', o botão já está correto no HTML.
        }

        // --- 2. ATUALIZAÇÃO DO STATUS DAS LIÇÕES ---
        const moduleKey = document.body.dataset.module;
        if (!moduleKey) {
            console.error("Atributo 'data-module' não foi encontrado no <body>.");
            return;
        }

        // Define qual progresso de aluno deve ser exibido
        if (userRole === 'professor') {
            studentIdForProgress = localStorage.getItem("selectedStudentId"); // Professor vê o progresso do aluno selecionado
        } else {
            studentIdForProgress = user ? user.uid : null; // Aluno vê o seu próprio progresso
        }
        
        // Se for um professor sem aluno selecionado, não atualiza os status (tudo fica acessível)
        // Se for um aluno, precisa do ID para buscar o progresso
        if ((userRole === 'professor' && studentIdForProgress) || userRole === 'aluno') {
            updateLessonStatuses(studentIdForProgress, moduleKey, userRole);
        }
    });

    async function updateLessonStatuses(studentId, moduleKey, role) {
        if (!studentId) return;

        let progress = {};
        try {
            const studentDoc = await db.collection("students").doc(studentId).get();
            if (studentDoc.exists) {
                progress = (studentDoc.data().progress && studentDoc.data().progress[moduleKey]) || {};
            }
        } catch (error) {
            console.error("Erro ao buscar progresso do aluno:", error);
        }

        const lessons = document.querySelectorAll('[data-lesson]');
        let firstUncompleted = -1;

        lessons.forEach(lesson => {
            const lessonNumber = parseInt(lesson.dataset.lesson, 10);
            if (!progress[`lesson_${lessonNumber}`] && firstUncompleted === -1) {
                firstUncompleted = lessonNumber;
            }
        });

        if (firstUncompleted === -1 && lessons.length > 0) {
            firstUncompleted = lessons.length + 1; // Todas as lições foram completas
        }

        const isProfessor = (role === 'professor');

        lessons.forEach(lesson => {
            const lessonNumber = parseInt(lesson.dataset.lesson, 10);
            const isCompleted = progress[`lesson_${lessonNumber}`] === true;

            // Lógica Visual
            if (isCompleted) {
                lesson.classList.add('completed');
            } else if (lessonNumber === firstUncompleted) {
                lesson.classList.add('next');
            } else if (lessonNumber > firstUncompleted) {
                lesson.classList.add('locked');
            }
            
            // Lógica de Acesso (Professor tem acesso a tudo)
            if (!isProfessor) {
                if (!isCompleted && lessonNumber !== firstUncompleted) {
                    lesson.setAttribute('href', '#');
                }
            }
        });
    }
});