document.addEventListener('DOMContentLoaded', () => {
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
    const auth = firebase.auth();
    const db = firebase.firestore();

    const loginForm = document.getElementById('login-form');
    const userArea = document.getElementById('user-area');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const userNameSpan = document.getElementById('user-name');
    const dashboardLink = document.getElementById('dashboard-link');
    const loginError = document.getElementById('login-error');

    // Função ATUALIZADA para redirecionar utilizadores com base no seu papel
    async function handleUserRedirect(user) {
        const userDoc = await db.collection("students").doc(user.uid).get();

        if (userDoc.exists) {
            const userData = userDoc.data();
            
            // Define o localStorage para o aluno ou professor (para o painel de lições)
            localStorage.setItem('selectedStudentId', user.uid);
            localStorage.setItem('selectedStudentName', userData.name);

            if (userData.role === 'aluno') {
                window.location.href = 'aluno.html';
            } else if (userData.role === 'professor') {
                // Limpa a seleção de aluno se o professor fizer login
                localStorage.removeItem('selectedStudentId');
                localStorage.removeItem('selectedStudentName');
                window.location.href = 'index.html';
            } else {
                auth.signOut();
                loginError.textContent = "A sua conta não tem um papel definido.";
                loginError.classList.remove('hidden');
            }
        } else {
            // Se o utilizador existe na Autenticação mas não no Firestore
            auth.signOut();
            loginError.textContent = "Erro: Utilizador não encontrado na base de dados.";
            loginError.classList.remove('hidden');
        }
    }
    
    // Lógica de Login ATUALIZADA
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginError.classList.add('hidden');
        loginBtn.classList.add('btn-loading');
        loginBtn.disabled = true;

        const userInput = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        // Lógica inteligente para diferenciar email de nome de utilizador
        let email;
        if (userInput.includes('@')) {
            email = userInput; // Assume que é um email de professor
        } else {
            email = `${userInput.toLowerCase()}@inglesnoseuritmo.com`; // Assume que é um nome de utilizador de aluno
        }

        try {
            await auth.signInWithEmailAndPassword(email, password);
            // O onAuthStateChanged fará o redirecionamento
        } catch (error) {
            console.error("Erro de login:", error);
            loginError.textContent = "Utilizador ou senha inválidos.";
            loginError.classList.remove('hidden');
            loginBtn.classList.remove('btn-loading');
            loginBtn.disabled = false;
        }
    });

    logoutBtn.addEventListener('click', () => {
        auth.signOut();
    });

    // Observador do estado de autenticação (redireciona automaticamente se já estiver logado)
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            // Se o utilizador está logado, chama a função de redirecionamento
            handleUserRedirect(user);
        } else {
            // Se não está logado, garante que a UI está no estado de logout
            localStorage.removeItem('selectedStudentId');
            localStorage.removeItem('selectedStudentName');
            loginForm.classList.remove('hidden');
            userArea.classList.add('hidden');
        }
    });
});