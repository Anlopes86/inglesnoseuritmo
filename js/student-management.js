document.addEventListener('DOMContentLoaded', () => {
    if (!firebase || !firebase.apps.length) {
        console.error("Firebase não inicializado.");
        return;
    }
    const db = firebase.firestore();
    const auth = firebase.auth();

    // --- Seletores do DOM para Modais ---
    const addStudentModal = document.getElementById('add-student-modal');
    const openAddStudentModalBtn = document.getElementById('open-add-student-modal-btn');
    const cancelAddStudentBtn = document.getElementById('cancel-add-student-btn');
    const addStudentForm = document.getElementById('add-student-form');
    const addStudentBtn = document.getElementById('add-student-btn'); 
    const deleteStudentBtn = document.getElementById('delete-student-btn');
    const studentSelect = document.getElementById('student-select');
    const studentSearchInput = document.getElementById('student-search');

    // --- Lógica para Abrir e Fechar Modal de Adicionar Aluno ---
    if (openAddStudentModalBtn) {
        openAddStudentModalBtn.addEventListener('click', () => addStudentModal.classList.remove('hidden'));
    }
    if (cancelAddStudentBtn) {
        cancelAddStudentBtn.addEventListener('click', () => addStudentModal.classList.add('hidden'));
    }
    
    // --- Lógica para Adicionar Aluno ---
    if (addStudentForm) {
        addStudentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Captura de valores do formulário
            const fullName = document.getElementById('new-student-fullname').value.trim();
            const username = document.getElementById('new-student-username').value.trim().toLowerCase();
            const password = document.getElementById('new-student-password').value;
            
            // CORREÇÃO: Capturando o tipo de aluno (Certifique-se que o ID no HTML seja este)
            const studentTypeField = document.getElementById('new-student-type');
            const studentType = studentTypeField ? studentTypeField.value : '';

            const modulos = ['a1', 'a2', 'b1', 'b2', 'business', 'conversation', 'essentials', 'vestibular'];
            const modulosLiberados = [];

            modulos.forEach(m => {
                const checkbox = document.getElementById(`module-${m}`);
                if (checkbox && checkbox.checked) {
                    modulosLiberados.push(m);
                }
            });

            // Validação
            if (!fullName || !username || !password || !studentType) {
                return alert("Por favor, preencha todos os campos, incluindo o tipo de aluno.");
            }

            addStudentBtn.classList.add('btn-loading');
            addStudentBtn.disabled = true;

            const email = `${username}@inglesnoseuritmo.com`;

            try {
                // Criar usuário no Firebase Auth
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                const studentId = userCredential.user.uid;

                // Criar documento do aluno no Firestore
                await db.collection('students').doc(studentId).set({
                    name: fullName,
                    email: email,
                    role: 'aluno',
                    studentType: studentType,
                    modules: modulosLiberados, // Salva os módulos marcados
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });

                alert(`Aluno "${fullName}" adicionado com sucesso!`);
                addStudentModal.classList.add('hidden');
                addStudentForm.reset();
                
                // Recarrega a lista para mostrar o novo aluno (opcional, dependendo da sua UI)
                if (typeof loadStudents === 'function') loadStudents();

            } catch (error) {
                console.error("Erro ao adicionar aluno: ", error);
                alert("Erro ao adicionar aluno: " + error.message);
            } finally {
                addStudentBtn.classList.remove('btn-loading');
                addStudentBtn.disabled = false;
            }
        });
    }

    // --- Lógica para Excluir Aluno ---
    if (deleteStudentBtn) {
        deleteStudentBtn.addEventListener('click', async () => {
            const studentId = localStorage.getItem('selectedStudentId');
            if (!studentId) return alert("Nenhum aluno selecionado.");

            const studentName = localStorage.getItem('selectedStudentName');
            if (confirm(`Tem certeza que deseja excluir o aluno "${studentName}"?\n\nATENÇÃO: Esta ação é irreversível.`)) {
                try {
                    await db.collection("students").doc(studentId).delete();
                    alert("Aluno excluído com sucesso.");
                    localStorage.removeItem('selectedStudentId');
                    localStorage.removeItem('selectedStudentName');
                    location.reload(); 
                } catch (error) {
                    console.error("Erro ao excluir aluno:", error);
                    alert("Ocorreu um erro ao excluir o aluno.");
                }
            }
        });
    }
    
    // --- Lógica da Busca de Alunos ---
    if (studentSearchInput) {
        window.filterStudents = function() {
            const filter = studentSearchInput.value.toLowerCase();
            for (let option of studentSelect.options) {
                if (option.value) {
                    option.style.display = option.text.toLowerCase().includes(filter) ? '' : 'none';
                }
            }
        }
    }
});