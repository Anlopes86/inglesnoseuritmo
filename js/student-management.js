// js/student-management.js

document.addEventListener('DOMContentLoaded', () => {
    if (!firebase || !firebase.apps.length) {
        console.error("Firebase não inicializado. Verifique a ordem dos scripts no seu HTML.");
        return;
    }
    const db = firebase.firestore();
    const auth = firebase.auth();

    const addStudentBtn = document.getElementById('add-student-btn');
    const deleteStudentBtn = document.getElementById('delete-student-btn');
    const studentSelect = document.getElementById('student-select');
    const studentSearchInput = document.getElementById('student-search');

    if (addStudentBtn) {
        addStudentBtn.addEventListener('click', async () => {
            const fullName = document.getElementById('new-student-fullname').value.trim();
            const username = document.getElementById('new-student-username').value.trim().toLowerCase();
            const password = document.getElementById('new-student-password').value;
            const studentType = document.getElementById('new-student-type').value;

            if (!fullName || !username || !password || !studentType) {
                alert("Por favor, preencha todos os campos para adicionar um novo aluno.");
                return;
            }

            addStudentBtn.classList.add('btn-loading');
            addStudentBtn.disabled = true;

            const email = `${username}@inglesnoseuritmo.com`;

            try {
                // Passo 1: Criar o usuário no serviço de Autenticação do Firebase
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;

                // Passo 2: Criar o documento do aluno no Firestore com todos os dados
                await db.collection("students").doc(user.uid).set({
                    name: fullName,
                    username: username,
                    studentType: studentType,
                    role: 'aluno',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    progress: {
                        a1: {}, a2: {}, conversation: {}, business: {}, vestibular: {}
                    },
                    gradesA1: { listening: '', writing: '', speaking: '', reading: '' },
                    nextClass: { date: '', time: '' },
                    focusWeek: ''
                });

                alert(`Aluno "${fullName}" criado com sucesso!`);
                document.getElementById('new-student-fullname').value = '';
                document.getElementById('new-student-username').value = '';
                document.getElementById('new-student-password').value = '';

            } catch (error) {
                console.error("Erro ao criar aluno:", error);
                if (error.code === 'auth/email-already-in-use') {
                    alert("Erro: Este nome de utilizador já está em uso. Por favor, escolha outro.");
                } else if (error.code === 'auth/weak-password') {
                    alert("Erro: A senha é muito fraca. Ela deve ter no mínimo 6 caracteres.");
                } else {
                    alert("Ocorreu um erro ao criar o aluno: " + error.message);
                }
            } finally {
                addStudentBtn.classList.remove('btn-loading');
                addStudentBtn.disabled = false;
            }
        });
    }

    if (deleteStudentBtn) {
        deleteStudentBtn.addEventListener('click', async () => {
            const studentId = studentSelect.value;
            if (!studentId) {
                alert("Por favor, selecione um aluno para excluir.");
                return;
            }

            const studentName = studentSelect.options[studentSelect.selectedIndex].text;
            if (confirm(`Tem certeza que deseja excluir o aluno "${studentName}"?\n\nATENÇÃO: Esta ação é irreversível e irá apagar todos os dados e o acesso do aluno.`)) {
                try {
                    // Esta função deleta apenas do Firestore. A remoção do usuário da
                    // aba "Authentication" no Firebase precisa ser feita manualmente ou com Cloud Functions.
                    await db.collection("students").doc(studentId).delete();
                    alert("Aluno excluído do banco de dados com sucesso.");
                    localStorage.removeItem('selectedStudentId');
                    localStorage.removeItem('selectedStudentName');
                    location.reload();
                } catch (error) {
                    console.error("Erro ao excluir aluno:", error);
                    alert("Ocorreu um erro ao excluir o aluno: " + error.message);
                }
            }
        });
    }
    
    if (studentSearchInput) {
        window.filterStudents = function() {
            const filter = studentSearchInput.value.toLowerCase();
            for (let option of studentSelect.options) {
                if (option.value) {
                    const studentName = option.text.toLowerCase();
                    option.style.display = studentName.includes(filter) ? '' : 'none';
                }
            }
        }
    }
});