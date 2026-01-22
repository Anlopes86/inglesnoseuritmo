document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');
    const loginError = document.getElementById('login-error');

    async function handleUserRedirect(user) {
        if (!user) return;
        localStorage.setItem('loggedInUserId', user.uid);
        const userDoc = await db.collection("students").doc(user.uid).get();

        if (userDoc.exists) {
            const userData = userDoc.data();
            localStorage.setItem('loggedInUserRole', userData.role);

            if (userData.role === 'aluno') {
                window.location.href = 'home-aluno.html'; // REDIRECIONA PARA O HUB
            } else if (userData.role === 'professor') {
                window.location.href = 'index.html';
            }
        } else {
            auth.signOut();
            if (loginError) loginError.textContent = "Usuário não encontrado.";
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const userInput = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const email = userInput.includes('@') ? userInput : `${userInput.toLowerCase()}@inglesnoseuritmo.com`;

            try {
                await auth.signInWithEmailAndPassword(email, password);
            } catch (error) {
                if (loginError) {
                    loginError.textContent = "Usuário ou senha inválidos.";
                    loginError.classList.remove('hidden');
                }
            }
        });
    }

    auth.onAuthStateChanged(user => { if (user) handleUserRedirect(user); });
});