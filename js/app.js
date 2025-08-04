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

    // --- Lógica Específica do Portal do Professor ---
    // Todo o bloco a seguir só será executado se a lista de alunos (`studentSelect`) existir na página.
    if (studentSelect) {
        // --- Autenticação e Proteção da Página do Professor ---
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('students').doc(user.uid).get().then(doc => {
                    if (doc.exists && doc.data().role === 'professor') {
                        localStorage.setItem('loggedInUserRole', 'professor');
                        loadStudentsIntoSelect(); // Carrega os alunos assim que o professor é verificado
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

        // --- Carregar Alunos no Dropdown ---
        async function loadStudentsIntoSelect() {
            if (!studentSelect) return;
            studentSelect.innerHTML = '<option value="">Carregando alunos...</option>';
            
            // CORREÇÃO: A cláusula .orderBy('name') foi removida para evitar erro de índice no Firestore.
            // Para reativar a ordenação, é necessário criar um índice no seu painel do Firebase.
            db.collection('students').where('role', '==', 'aluno').onSnapshot(snapshot => {
                let students = [];
                snapshot.forEach(doc => {
                    students.push({ id: doc.id, name: doc.data().name });
                });

                // Ordenação manual feita no JavaScript como alternativa
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
                }
            }, error => {
                console.error("Erro ao buscar alunos: ", error);
                studentSelect.innerHTML = '<option value="">Erro ao carregar</option>';
            });
        }

        // --- Lógica de Seleção de Aluno ---
        studentSelect.addEventListener('change', () => {
            const studentId = studentSelect.value;
            if (studentId && selectedStudentNameSpan && studentPortalBtn) {
                const studentName = studentSelect.options[studentSelect.selectedIndex].text;
                selectedStudentNameSpan.textContent = studentName;
                localStorage.setItem('selectedStudentId', studentId);
                localStorage.setItem('selectedStudentName', studentName);
                studentPortalBtn.href = 'aluno.html';
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

    // --- Funcionalidade do Botão de Logout (pode existir em múltiplas páginas) ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            auth.signOut().then(() => {
                localStorage.clear();
                window.location.href = 'login.html';
            });
        });
    }

    // Adicione um polyfill para a classe 'disabled' se não tiver no seu CSS
    const style = document.createElement('style');
    style.innerHTML = `.disabled { opacity: 0.5; cursor: not-allowed; }`;
    document.head.appendChild(style);
});