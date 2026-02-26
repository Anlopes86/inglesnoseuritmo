document.addEventListener('DOMContentLoaded', () => {

    const firebaseAuth = firebase.auth();
    const firebaseDb = firebase.firestore();

    const loginForm = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');
    const loginError = document.getElementById('login-error');

    async function handleUserRedirect(user) {
        if (!user) return;

        localStorage.setItem('loggedInUserId', user.uid);

        try {
            const userDoc = await firebaseDb.collection("students").doc(user.uid).get();

            if (userDoc.exists) {
                const userData = userDoc.data();
                localStorage.setItem('loggedInUserRole', userData.role);

                if (userData.role === 'aluno') {
                    window.location.href = 'home-aluno.html';
                } else if (userData.role === 'professor') {
                    window.location.href = 'index.html';
                }

            } else {
                console.error("Usuário não encontrado no banco de dados.");
                firebaseAuth.signOut();

                if (loginError) {
                    loginError.textContent = "Erro: Perfil não configurado.";
                    loginError.classList.remove('hidden');
                }
            }

        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const userInput = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            const email = userInput.includes('@')
                ? userInput
                : `${userInput.toLowerCase()}@inglesnoseuritmo.com`;

            try {
                if (loginBtn) loginBtn.disabled = true;

                await firebaseAuth.signInWithEmailAndPassword(email, password);

            } catch (error) {
                console.error("Erro de login:", error);

                if (loginError) {
                    loginError.textContent = "Usuário ou senha inválidos.";
                    loginError.classList.remove('hidden');
                }

                if (loginBtn) loginBtn.disabled = false;
            }
        });
    }

    firebaseAuth.onAuthStateChanged(user => {
        if (user) {
            handleUserRedirect(user);
        }
    });

});