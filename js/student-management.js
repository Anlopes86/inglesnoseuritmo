// Funcionalidades de gerenciamento de alunos
document.addEventListener('DOMContentLoaded', () => {
    const addStudentBtn = document.getElementById('add-student-btn');
    const deleteStudentBtn = document.getElementById('delete-student-btn');
    
    if (addStudentBtn) {
        addStudentBtn.addEventListener('click', addStudent);
    }
    
    if (deleteStudentBtn) {
        deleteStudentBtn.addEventListener('click', deleteStudent);
    }
});

// Função para adicionar aluno
async function addStudent() {
    const fullname = document.getElementById('new-student-fullname').value.trim();
    const username = document.getElementById('new-student-username').value.trim();
    const password = document.getElementById('new-student-password').value;
    const type = document.getElementById('new-student-type').value;
    const addBtn = document.getElementById('add-student-btn');

    if (!fullname || !username || !password) {
        showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }

    // Validar nome de usuário (apenas letras, números e underscore)
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        showMessage('Nome de utilizador deve conter apenas letras, números e underscore.', 'error');
        return;
    }

    // Mostrar estado de carregamento
    addBtn.classList.add('btn-loading');
    addBtn.disabled = true;

    try {
        const auth = firebase.auth();
        const db = firebase.firestore();
        
        // Criar email baseado no username
        const email = `${username.toLowerCase()}@inglesnoseuritmo.com`;
        
        // Verificar se o username já existe
        const existingUser = await db.collection('students')
            .where('username', '==', username.toLowerCase())
            .get();
            
        if (!existingUser.empty) {
            throw new Error('Nome de utilizador já existe. Escolha outro.');
        }

        // Criar usuário no Firebase Auth
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Salvar dados do aluno no Firestore
        await db.collection('students').doc(user.uid).set({
            name: fullname,
            username: username.toLowerCase(),
            email: email,
            role: 'aluno',
            courseType: type,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            progress: {
                a1: { completed: 0, total: 32 },
                conversation: { completed: 0, total: 18 }
            }
        });

        // Limpar formulário
        document.getElementById('new-student-fullname').value = '';
        document.getElementById('new-student-username').value = '';
        document.getElementById('new-student-password').value = '';
        document.getElementById('new-student-type').value = 'a1';

        showMessage(`Aluno ${fullname} adicionado com sucesso!`, 'success');

    } catch (error) {
        console.error('Erro ao adicionar aluno:', error);
        showMessage(error.message || 'Erro ao adicionar aluno. Tente novamente.', 'error');
    } finally {
        // Remover estado de carregamento
        addBtn.classList.remove('btn-loading');
        addBtn.disabled = false;
    }
}

// Função para excluir aluno
async function deleteStudent() {
    const studentSelect = document.getElementById('student-select');
    const selectedStudentId = studentSelect.value;
    const selectedStudentName = studentSelect.options[studentSelect.selectedIndex].text;

    if (!selectedStudentId) {
        showMessage('Por favor, selecione um aluno para excluir.', 'error');
        return;
    }

    // Confirmar exclusão
    if (!confirm(`Tem certeza que deseja excluir o aluno "${selectedStudentName}"? Esta ação não pode ser desfeita.`)) {
        return;
    }

    const deleteBtn = document.getElementById('delete-student-btn');
    deleteBtn.classList.add('btn-loading');
    deleteBtn.disabled = true;

    try {
        const auth = firebase.auth();
        const db = firebase.firestore();

        // Excluir dados do Firestore
        await db.collection('students').doc(selectedStudentId).delete();

        // Limpar seleção
        studentSelect.value = '';
        studentSelect.dispatchEvent(new Event('change'));

        showMessage(`Aluno "${selectedStudentName}" excluído com sucesso.`, 'success');

    } catch (error) {
        console.error('Erro ao excluir aluno:', error);
        showMessage('Erro ao excluir aluno. Tente novamente.', 'error');
    } finally {
        deleteBtn.classList.remove('btn-loading');
        deleteBtn.disabled = false;
    }
}

// Função para buscar alunos (melhorada com filtro)
function filterStudents() {
    const searchInput = document.getElementById('student-search');
    const studentSelect = document.getElementById('student-select');
    
    if (!searchInput || !studentSelect) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const options = studentSelect.querySelectorAll('option');
    
    options.forEach(option => {
        if (option.value === '') return; // Manter opção padrão
        
        const studentName = option.textContent.toLowerCase();
        if (studentName.includes(searchTerm)) {
            option.style.display = '';
        } else {
            option.style.display = 'none';
        }
    });
}

