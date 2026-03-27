document.addEventListener('DOMContentLoaded', () => {
    if (!firebase || !firebase.apps.length) {
        console.error('Firebase não inicializado.');
        return;
    }

    const db = firebase.firestore();
    const auth = firebase.auth();

    const addStudentModal = document.getElementById('add-student-modal');
    const openAddStudentModalBtn = document.getElementById('open-add-student-modal-btn');
    const openAddStudentEmptyBtn = document.getElementById('open-add-student-empty-btn');
    const cancelAddStudentBtn = document.getElementById('cancel-add-student-btn');
    const closeAddStudentModalBtn = document.getElementById('close-add-student-modal-btn');
    const addStudentForm = document.getElementById('add-student-form');
    const addStudentBtn = document.getElementById('add-student-btn');
    const deleteStudentBtn = document.getElementById('delete-student-btn');
    const studentSelect = document.getElementById('student-select');
    const studentSearchInput = document.getElementById('student-search');

    let lastFocusedElement = null;

    function openModal(modal, focusTarget) {
        if (!modal) return;
        lastFocusedElement = document.activeElement;
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('overflow-hidden');
        const target = focusTarget || modal.querySelector('input, select, button');
        if (target) target.focus();
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('overflow-hidden');
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    }

    if (openAddStudentModalBtn) {
        openAddStudentModalBtn.addEventListener('click', () => openModal(addStudentModal, document.getElementById('new-student-fullname')));
    }
    if (openAddStudentEmptyBtn) {
        openAddStudentEmptyBtn.addEventListener('click', () => openModal(addStudentModal, document.getElementById('new-student-fullname')));
    }
    if (cancelAddStudentBtn) {
        cancelAddStudentBtn.addEventListener('click', () => closeModal(addStudentModal));
    }
    if (closeAddStudentModalBtn) {
        closeAddStudentModalBtn.addEventListener('click', () => closeModal(addStudentModal));
    }
    if (addStudentModal) {
        addStudentModal.addEventListener('click', (event) => {
            if (event.target === addStudentModal) closeModal(addStudentModal);
        });
    }

    if (addStudentForm) {
        addStudentForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const fullName = document.getElementById('new-student-fullname').value.trim();
            const username = document.getElementById('new-student-username').value.trim().toLowerCase();
            const password = document.getElementById('new-student-password').value;
            const studentType = document.getElementById('new-student-type').value;

            if (!fullName || !username || !password || !studentType) {
                if (typeof showToast === 'function') {
                    showToast('Preencha todos os campos antes de salvar.', 'info', 'Dados incompletos');
                }
                return;
            }

            addStudentBtn.disabled = true;
            addStudentBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';

            const email = `${username}@inglesnoseuritmo.com`;

            let secondaryApp = null;
            let secondaryAuth = null;

            try {
                const secondaryName = `studentCreator-${Date.now()}`;
                secondaryApp = firebase.initializeApp(firebase.app().options, secondaryName);
                secondaryAuth = secondaryApp.auth();
                const userCredential = await secondaryAuth.createUserWithEmailAndPassword(email, password);
                const studentId = userCredential.user.uid;

                await db.collection('students').doc(studentId).set({
                    name: fullName,
                    email,
                    role: 'aluno',
                    studentType,
                    modules: [studentType],
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });

                if (typeof showToast === 'function') {
                    showToast(`O acesso de ${fullName} foi criado com sucesso.`, 'success', 'Aluno adicionado');
                }
                closeModal(addStudentModal);
                addStudentForm.reset();
                window.dispatchEvent(new Event('student:created'));
            } catch (error) {
                console.error('Erro ao adicionar aluno:', error);
                if (typeof showToast === 'function') {
                    showToast('Não foi possível criar o novo acesso agora.', 'error', 'Falha ao adicionar');
                }
            } finally {
                if (secondaryAuth) {
                    try {
                        await secondaryAuth.signOut();
                    } catch (error) {
                        console.error('Erro ao encerrar sessão secundária:', error);
                    }
                }
                if (secondaryApp) {
                    try {
                        await secondaryApp.delete();
                    } catch (error) {
                        console.error('Erro ao remover app secundário:', error);
                    }
                }
                addStudentBtn.disabled = false;
                addStudentBtn.innerHTML = 'Adicionar aluno';
            }
        });
    }

    if (deleteStudentBtn) {
        deleteStudentBtn.addEventListener('click', async () => {
            const studentId = studentSelect ? studentSelect.value : localStorage.getItem('selectedStudentId');
            if (!studentId) {
                if (typeof showToast === 'function') {
                    showToast('Selecione um aluno antes de excluir.', 'info', 'Nenhum aluno selecionado');
                }
                return;
            }

            const studentName = localStorage.getItem('selectedStudentName') || 'este aluno';
            if (!window.confirm(`Tem certeza que deseja excluir o aluno "${studentName}"?\n\nEsta ação é irreversível.`)) {
                return;
            }

            try {
                await db.collection('students').doc(studentId).delete();
                localStorage.removeItem('selectedStudentId');
                localStorage.removeItem('selectedStudentName');
                if (typeof showToast === 'function') {
                    showToast('O aluno foi removido com sucesso.', 'success', 'Aluno excluído');
                }
                location.reload();
            } catch (error) {
                console.error('Erro ao excluir aluno:', error);
                if (typeof showToast === 'function') {
                    showToast('Não foi possível excluir o aluno agora.', 'error', 'Falha ao excluir');
                }
            }
        });
    }

    if (studentSearchInput && studentSelect) {
        studentSearchInput.addEventListener('input', () => {
            const filter = studentSearchInput.value.toLowerCase();
            Array.from(studentSelect.options).forEach((option) => {
                if (option.value) {
                    option.style.display = option.text.toLowerCase().includes(filter) ? '' : 'none';
                }
            });
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        if (addStudentModal && !addStudentModal.classList.contains('hidden')) {
            closeModal(addStudentModal);
        }
    });
});
