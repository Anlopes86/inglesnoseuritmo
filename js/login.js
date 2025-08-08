document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURAÇÃO DO FIREBASE (RESTAURADA PARA GARANTIR O FUNCIONAMENTO) ---
    const firebaseConfig = {
        apiKey: "AIzaSyA4srp5nACEhOLLD8Yd4cwe5_rZ8izcm1Y",
        authDomain: "inglesnoseuritmo-bae14.firebaseapp.com",
        projectId: "inglesnoseuritmo-bae14",
        storageBucket: "inglesnoseuritmo-bae14.appspot.com",
        messagingSenderId: "112615489735",
        appId: "1:112615489735:web:9ee215ab9a2246f3a13ee2"
    };

    // Inicializa o Firebase se ainda não foi inicializado
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const auth = firebase.auth();
    const db = firebase.firestore();
    // --------------------------------------------------------------------

    const loginForm = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');
    const loginError = document.getElementById('login-error');

    // --- FUNÇÃO DE REDIRECIONAMENTO ---
    async function handleUserRedirect(user) {
        if (!user) return;

        localStorage.setItem('loggedInUserId', user.uid);
        const userDoc = await db.collection("students").doc(user.uid).get();

        if (userDoc.exists) {
            const userData = userDoc.data();
            localStorage.setItem('loggedInUserRole', userData.role);

            if (userData.role === 'aluno') {
                window.location.href = 'aluno.html';
            } else if (userData.role === 'professor') {
                localStorage.removeItem('selectedStudentId');
                localStorage.removeItem('selectedStudentName');
                window.location.href = 'index.html';
            } else {
                auth.signOut();
                if (loginError) {
                    loginError.textContent = "Sua conta não tem um papel definido.";
                    loginError.classList.remove('hidden');
                }
            }
        } else {
            auth.signOut();
            if (loginError) {
                loginError.textContent = "Erro: Usuário não encontrado na base de dados.";
                loginError.classList.remove('hidden');
            }
        }
    }
    
    // --- LÓGICA DE LOGIN ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if(loginError) loginError.classList.add('hidden');
            if(loginBtn) {
                loginBtn.classList.add('btn-loading');
                loginBtn.disabled = true;
            }

            const userInput = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            
            let email;
            if (userInput.includes('@')) {
                email = userInput;
            } else {
                email = `${userInput.toLowerCase()}@inglesnoseuritmo.com`;
            }

            try {
                await auth.signInWithEmailAndPassword(email, password);
                // O onAuthStateChanged cuidará do redirecionamento.
            } catch (error) {
                console.error("Erro de login:", error);
                if (loginError) {
                    loginError.textContent = "Utilizador ou senha inválidos.";
                    loginError.classList.remove('hidden');
                }
                if (loginBtn) {
                    loginBtn.classList.remove('btn-loading');
                    loginBtn.disabled = false;
                }
            }
        });
    }

    // --- OBSERVADOR DE AUTENTICAÇÃO ---
    auth.onAuthStateChanged(user => {
        if (user) {
            // Se o usuário já estiver logado ou acabou de logar, redirecione.
            handleUserRedirect(user);
        }
        // Se não houver usuário, a página de login continua visível.
    });
});