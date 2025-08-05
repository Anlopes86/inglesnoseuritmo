document.addEventListener('DOMContentLoaded', () => {
    // A configuração do Firebase já deve estar no seu app.js ou firebase-config.js
    // mas garantimos a inicialização aqui também.
    if (!firebase.apps.length) {
        console.error("Firebase não foi inicializado. Verifique seus scripts.");
        return;
    }
    const db = firebase.firestore();
    const auth = firebase.auth();

    // --- Seletores de Elementos ---
    const addStudentBtn = document.getElementById('add-student-btn');
    const studentNameInput = document.getElementById('new-student-fullname');
    const studentUsernameInput = document.getElementById('new-student-username');
    const studentPasswordInput = document.getElementById('new-student-password');
    const studentTypeSelect = document.getElementById('new-student-type');
    const studentSelect = document.getElementById('student-select');
    const deleteStudentBtn = document.getElementById('delete-student-btn');

    // --- Lógica para Adicionar Aluno ---
    if (addStudentBtn) {
        addStudentBtn.addEventListener('click', async () => {
            const fullName = studentNameInput.value.trim();
            const username = studentUsernameInput.value.trim();
            const password = studentPasswordInput.value.trim();
            const studentType = studentTypeSelect.value;

            if (!fullName || !username || !password) {
                alert('Por favor, preencha todos os campos para adicionar um aluno.');
                return;
            }

            // O Firebase Auth usa e-mail para login. Criamos um e-mail "fictício" para o aluno.
            // O aluno fará login com o nome de utilizador, mas o sistema usará este e-mail por trás.
            const email = `${username}@aluno.com`;

            addStudentBtn.classList.add('btn-loading');
            addStudentBtn.disabled = true;

            try {
                // Passo 1: Criar o usuário no Firebase Authentication
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                const newUserId = userCredential.user.uid;

                // Passo 2: Salvar os detalhes do aluno no Firestore
                await db.collection('students').doc(newUserId).set({
                    name: fullName,
                    username: username,
                    email: email,
                    studentType: studentType, // Salva o tipo de curso (ex: 'business')
                    role: 'aluno',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    progress: { // Inicializa o progresso para todos os módulos
                        a1: {},
                        conversation: {},
                        business: {}
                    }
                });

                alert(`Aluno "${fullName}" adicionado com sucesso!`);
                
                // Limpa os campos do formulário
                studentNameInput.value = '';
                studentUsernameInput.value = '';
                studentPasswordInput.value = '';
                studentTypeSelect.value = 'a1';

            } catch (error) {
                console.error("Erro ao adicionar aluno: ", error);
                if (error.code === 'auth/email-already-in-use') {
                    alert('Erro: Este nome de utilizador já existe. Por favor, escolha outro.');
                } else if (error.code === 'auth/weak-password') {
                    alert('Erro: A senha deve ter no mínimo 6 caracteres.');
                } else {
                    alert('Ocorreu um erro ao criar o aluno. Verifique a consola para mais detalhes.');
                }
            } finally {
                // Volta ao estado normal do botão
                addStudentBtn.classList.remove('btn-loading');
                addStudentBtn.disabled = false;
            }
        });
    }

    // --- Lógica para Excluir Aluno ---
    if (deleteStudentBtn && studentSelect) {
        deleteStudentBtn.addEventListener('click', async () => {
            const studentId = studentSelect.value;
            if (!studentId) {
                alert('Por favor, selecione um aluno para excluir.');
                return;
            }

            const studentName = studentSelect.options[studentSelect.selectedIndex].text;
            if (confirm(`Tem a certeza de que deseja excluir o aluno "${studentName}"?\nEsta ação não pode ser desfeita.`)) {
                try {
                    // Aqui estamos a excluir apenas o documento do Firestore.
                    // A exclusão do usuário de autenticação é mais complexa e requer um ambiente de back-end.
                    // Para este projeto, remover do Firestore é suficiente para que ele desapareça da sua lista.
                    await db.collection('students').doc(studentId).delete();
                    alert('Aluno excluído com sucesso.');
                    // A lista de alunos será atualizada automaticamente pelo listener do app.js
                } catch (error) {
                    console.error("Erro ao excluir aluno: ", error);
                    alert('Ocorreu um erro ao excluir o aluno.');
                }
            }
        });
    }
});

// --- Lógica para Filtrar Alunos (função global chamada pelo oninput do HTML) ---
function filterStudents() {
    const searchInput = document.getElementById('student-search');
    const studentSelect = document.getElementById('student-select');
    const filter = searchInput.value.toLowerCase();
    const options = studentSelect.options;

    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        const text = option.text.toLowerCase();
        if (option.value === "") continue; // Sempre mostrar "Selecione um aluno..."
        
        if (text.includes(filter)) {
            option.style.display = "";
        } else {
            option.style.display = "none";
        }
    }
}