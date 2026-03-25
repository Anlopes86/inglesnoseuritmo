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
        addStudentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fullName = document.getElementById('new-student-fullname').value.trim();
            const username = document.getElementById('new-student-username').value.trim().toLowerCase();
            const password = document.getElementById('new-student-password').value;
            
            // Captura o tipo de curso selecionado.
            const studentTypeElement = document.getElementById('new-student-type');
            const studentType = studentTypeElement ? studentTypeElement.value : '';

            const modulos = ['a1', 'a2', 'b1', 'b2', 'business', 'conversation', 'essentials', 'vestibular'];
            const modulosLiberados = [];

            modulos.forEach(m => {
                const checkbox = document.getElementById(`module-${m}`);
                if (checkbox && checkbox.checked) {
                    modulosLiberados.push(m);
                }
            });

            if (!fullName || !username || !password || !studentType) {
                return alert("Por favor, preencha todos os campos.");
            }

            addStudentBtn.classList.add('btn-loading');
            addStudentBtn.disabled = true;

            const email = `${username}@inglesnoseuritmo.com`;

            try {
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                const studentId = userCredential.user.uid;

                await db.collection('students').doc(studentId).set({
                    name: fullName,
                    email: email,
                    role: 'aluno',
                    studentType: studentType,
                    modules: modulosLiberados,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });

                alert(`Aluno "${fullName}" adicionado com sucesso!`);
                
                // Recarrega para restaurar a sessão do professor no painel.
                location.reload(); 

            } catch (error) {
                console.error("Erro ao adicionar aluno:", error);
                alert("Erro ao adicionar aluno: " + error.message);
            } finally {
                addStudentBtn.classList.remove('btn-loading');
                addStudentBtn.disabled = false;
            }
        });
    }

    if (deleteStudentBtn) {
        deleteStudentBtn.addEventListener('click', async () => {
            const studentId = studentSelect ? studentSelect.value : localStorage.getItem('selectedStudentId');
            if (!studentId) return alert("Nenhum aluno selecionado.");

            const studentName = localStorage.getItem('selectedStudentName') || "este aluno";
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
    
    if (studentSearchInput && studentSelect) {
        studentSearchInput.addEventListener('input', () => {
            const filter = studentSearchInput.value.toLowerCase();
            for (let option of studentSelect.options) {
                if (option.value) {
                    option.style.display = option.text.toLowerCase().includes(filter) ? '' : 'none';
                }
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        if (addStudentModal && !addStudentModal.classList.contains('hidden')) {
            closeModal(addStudentModal);
        }
    });
});
