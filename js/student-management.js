document.addEventListener('DOMContentLoaded', () => {
    // --- Configuração do Firebase ---
    const firebaseConfig = {
        apiKey: "AIzaSyA4srp5nACEhOLLD8Yd4cwe5_rZ8izcm1Y",
        authDomain: "inglesnoseuritmo-bae14.firebaseapp.com",
        projectId: "inglesnoseuritmo-bae14",
        storageBucket: "inglesnoseuritmo-bae14.appspot.com",
        messagingSenderId: "112615489735",
        appId: "1:112615489735:web:9ee215ab9a2246f3a13ee2"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();
    const auth = firebase.auth();

    // --- Seletores de Elementos do DOM ---
    const studentSelect = document.getElementById('student-select');
    const selectedStudentNameSpan = document.getElementById('selected-student-name');
    const studentPortalBtn = document.getElementById('student-portal-btn');
    const deleteStudentBtn = document.getElementById('delete-student-btn'); // Botão de excluir

    // --- FUNÇÃO PARA ATUALIZAR BARRAS DE PROGRESSO ---
    async function updateProgressBars(studentId) {
        const modules = ['conversation', 'a1', 'a2', 'b1', 'b2', 'c1'];

        if (!studentId) {
            modules.forEach(modId => {
                const bar = document.getElementById(`progress-bar-${modId}`);
                const text = document.getElementById(`progress-text-${modId}`);
                if (bar) bar.style.width = '0%';
                if (text) text.textContent = '0%';
            });
            return;
        }

        try {
            const studentDoc = await db.collection('students').doc(studentId).get();
            if (!studentDoc.exists) return;

            const studentData = studentDoc.data();
            const progressData = studentData.progress || {};
            
            if (typeof lessonData === 'undefined') {
                 console.warn("A variável `lessonData` não está definida. O cálculo de progresso não será executado.");
                 return;
            }

            modules.forEach(modId => {
                const bar = document.getElementById(`progress-bar-${modId}`);
                const text = document.getElementById(`progress-text-${modId}`);
                if (bar && text && lessonData[modId] && lessonData[modId].titles) {
                    const moduleProgress = progressData[modId] || {};
                    const completed = Object.keys(moduleProgress).length;
                    const total = lessonData[modId].titles.length;
                    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
                    
                    bar.style.width = `${percentage}%`;
                    text.textContent = `${percentage}%`;
                }
            });
        } catch (error) {
            console.error(`Erro ao atualizar progresso para o aluno ${studentId}:`, error);
        }
    }

    // --- FUNÇÃO PARA CARREGAR ALUNOS NO DROPDOWN ---
    function loadStudentsIntoSelect() {
        if (!studentSelect) return;

        db.collection('students')
          .where('role', '==', 'aluno')
          .onSnapshot(snapshot => {
            let students = [];
            snapshot.forEach(doc => {
                students.push({ id: doc.id, name: doc.data().name });
            });
            students.sort((a, b) => a.name.localeCompare(b.name));

            let options = '<option value="">Selecione um aluno...</option>';
            students.forEach(student => {
                options += `<option value="${student.id}">${student.name}</option>`;
            });

            const selectedId = localStorage.getItem('selectedStudentId');
            studentSelect.innerHTML = options;

            if (selectedId && students.some(s => s.id === selectedId)) {
                studentSelect.value = selectedId;
            } else {
                localStorage.removeItem('selectedStudentId');
                localStorage.removeItem('selectedStudentName');
            }
            studentSelect.dispatchEvent(new Event('change'));

        }, error => {
            console.error("Erro ao buscar alunos: ", error);
            studentSelect.innerHTML = '<option value="">Erro ao carregar</option>';
        });
    }

    // --- EVENTO DE MUDANÇA NO SELETOR DE ALUNO ---
    if (studentSelect) {
        studentSelect.addEventListener('change', () => {
            const studentId = studentSelect.value;
            updateProgressBars(studentId);

            if (studentId) {
                const studentName = studentSelect.options[studentSelect.selectedIndex].text;
                selectedStudentNameSpan.textContent = studentName;
                localStorage.setItem('selectedStudentId', studentId);
                localStorage.setItem('selectedStudentName', studentName);
                
                studentPortalBtn.href = 'aluno.html';
                studentPortalBtn.setAttribute('aria-disabled', 'false');
                studentPortalBtn.classList.remove('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
                studentPortalBtn.classList.add('bg-green-600', 'text-white', 'hover:bg-green-700');
            } else {
                selectedStudentNameSpan.textContent = "Nenhum";
                localStorage.removeItem('selectedStudentId');
                localStorage.removeItem('selectedStudentName');

                studentPortalBtn.href = '#';
                studentPortalBtn.setAttribute('aria-disabled', 'true');
                studentPortalBtn.classList.remove('bg-green-600', 'text-white', 'hover:bg-green-700');
                studentPortalBtn.classList.add('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
            }
        });
    }

    // --- NOVO: EVENTO DE CLIQUE NO BOTÃO EXCLUIR ALUNO ---
    if (deleteStudentBtn) {
        deleteStudentBtn.addEventListener('click', () => {
            const studentId = localStorage.getItem('selectedStudentId');
            const studentName = localStorage.getItem('selectedStudentName');

            if (!studentId) {
                alert("Por favor, selecione um aluno da lista para excluir.");
                return;
            }

            const isConfirmed = confirm(`Tem certeza de que deseja excluir o aluno "${studentName}"?\n\nEsta ação é permanente e não pode ser desfeita.`);

            if (isConfirmed) {
                db.collection("students").doc(studentId).delete()
                    .then(() => {
                        alert(`O aluno "${studentName}" foi excluído com sucesso.`);
                        // A lista de alunos será atualizada automaticamente pelo 'onSnapshot'.
                        // Não é preciso fazer mais nada aqui.
                    })
                    .catch((error) => {
                        console.error("Erro ao excluir aluno: ", error);
                        alert("Ocorreu um erro ao excluir o aluno. Verifique o console para mais detalhes.");
                    });
            }
        });
    }

    // --- VERIFICAÇÃO DE AUTENTICAÇÃO DO PROFESSOR ---
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection('students').doc(user.uid).get().then(doc => {
                if (doc.exists && doc.data().role === 'professor') {
                    localStorage.setItem('loggedInUserRole', 'professor');
                    loadStudentsIntoSelect();
                } else {
                    alert("Acesso restrito a professores.");
                    auth.signOut().then(() => { window.location.href = 'login.html'; });
                }
            });
        } else {
            localStorage.clear();
            window.location.href = 'login.html';
        }
    });
});
