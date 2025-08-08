document.addEventListener('DOMContentLoaded', () => {
    // Configuração do Firebase
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
    const logoutBtn = document.getElementById('logout-btn');
    const studentSelect = document.getElementById('student-select');

    // --- LÓGICA DO BOTÃO SAIR (MOVIDA PARA O TOPO) ---
    // Ativamos o botão de logout primeiro para garantir que ele sempre funcione.
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            auth.signOut().then(() => {
                localStorage.clear();
                window.location.href = 'login.html';
            });
        });
    }

    // --- NOVA FUNÇÃO PARA ATUALIZAR AS BARRAS DE PROGRESSO ---
    async function updateProgressBars(studentId) {
        const modules = ['conversation', 'a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
        
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

            const progressData = studentDoc.data().progress || {};

            modules.forEach(modId => {
                if (typeof lessonData !== 'undefined' && lessonData[modId] && lessonData[modId].titles) {
                    const moduleProgress = progressData[modId] || {};
                    const completed = Object.keys(moduleProgress).length;
                    const total = lessonData[modId].titles.length - 1;
                    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

                    const bar = document.getElementById(`progress-bar-${modId}`);
                    const text = document.getElementById(`progress-text-${modId}`);
                    if (bar) bar.style.width = `${percentage}%`;
                    if (text) text.textContent = `${percentage}%`;
                }
            });
        } catch (error) {
            console.error(`Erro ao atualizar progresso para o aluno ${studentId}:`, error);
        }
    }

    // --- Lógica Específica do Portal do Professor ---
    if (studentSelect) {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('students').doc(user.uid).get().then(doc => {
                    if (doc.exists && doc.data().role === 'professor') {
                        localStorage.setItem('loggedInUserRole', 'professor');
                        loadStudentsIntoSelect();
                    } else {
                        alert("Acesso restrito a professores.");
                        auth.signOut();
                    }
                });
            } else {
                localStorage.clear();
                window.location.href = 'login.html';
            }
        });

        const selectedStudentNameSpan = document.getElementById('selected-student-name');
        const studentPortalBtn = document.getElementById('student-portal-btn');

        function loadStudentsIntoSelect() {
            if (!studentSelect) return;
            studentSelect.innerHTML = '<option value="">Carregando alunos...</option>';
            
            db.collection('students').where('role', '==', 'aluno').onSnapshot(snapshot => {
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
                if (selectedId) {
                    studentSelect.value = selectedId;
                    studentSelect.dispatchEvent(new Event('change'));
                } else {
                    updateProgressBars(null);
                }
            }, error => {
                console.error("Erro ao buscar alunos: ", error);
                studentSelect.innerHTML = '<option value="">Erro ao carregar</option>';
            });
        }

        studentSelect.addEventListener('change', () => {
            const studentId = studentSelect.value;
            updateProgressBars(studentId);

            if (studentId && selectedStudentNameSpan && studentPortalBtn) {
                const studentName = studentSelect.options[studentSelect.selectedIndex].text;
                selectedStudentNameSpan.textContent = studentName;
                localStorage.setItem('selectedStudentId', studentId);
                localStorage.setItem('selectedStudentName', studentName);
                studentPortalBtn.href = `aluno.html?studentId=${studentId}`;
                studentPortalBtn.classList.remove('disabled');
            } else if (selectedStudentNameSpan && studentPortalBtn) {
                selectedStudentNameSpan.textContent = "Nenhum";
                localStorage.removeItem('selectedStudentId');
                localStorage.removeItem('selectedStudentName');
                studentPortalBtn.href = '#';
                studentPortalBtn.classList.add('disabled');
            }
        });
    }

    const style = document.createElement('style');
    style.innerHTML = `.disabled { opacity: 0.5; cursor: not-allowed; }`;
    document.head.appendChild(style);
});