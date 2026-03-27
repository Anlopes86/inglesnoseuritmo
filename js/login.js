document.addEventListener('DOMContentLoaded', () => {
    const firebaseAuth = firebase.auth();
    const firebaseDb = firebase.firestore();

    const loginForm = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');
    const loginError = document.getElementById('login-error');

    function setLoginError(message) {
        if (!loginError) return;
        loginError.textContent = message;
        loginError.classList.remove('hidden');
        loginError.classList.add('is-visible');
    }

    function clearLoginError() {
        if (!loginError) return;
        loginError.textContent = '';
        loginError.classList.add('hidden');
        loginError.classList.remove('is-visible');
    }

    function resetButton() {
        if (!loginBtn) return;
        loginBtn.disabled = false;
        loginBtn.innerHTML = '<i class="fas fa-arrow-right-to-bracket"></i> Entrar';
    }

    async function handleUserRedirect(user) {
        if (!user) return;

        localStorage.setItem('loggedInUserId', user.uid);

        try {
            const userDoc = await firebaseDb.collection('students').doc(user.uid).get();

            if (userDoc.exists) {
                const userData = userDoc.data();
                localStorage.setItem('loggedInUserRole', userData.role);

                if (userData.role === 'aluno') {
                    window.location.href = 'home-aluno.html';
                } else if (userData.role === 'professor') {
                    window.location.href = 'index.html';
                } else {
                    setLoginError('Seu perfil ainda não possui um tipo de acesso válido.');
                    resetButton();
                }
            } else {
                console.error('Usuário não encontrado no banco de dados.');
                await firebaseAuth.signOut();
                setLoginError('Seu perfil ainda não está configurado para acesso.');
                resetButton();
            }
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
            setLoginError('Não foi possível carregar seu perfil agora.');
            resetButton();
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            clearLoginError();

            const userInput = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            const email = userInput.includes('@')
                ? userInput
                : `${userInput.toLowerCase()}@inglesnoseuritmo.com`;

            try {
                if (loginBtn) {
                    loginBtn.disabled = true;
                    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
                }

                await firebaseAuth.signInWithEmailAndPassword(email, password);
            } catch (error) {
                console.error('Erro de login:', error);
                setLoginError('Usuário ou senha inválidos.');
                if (typeof showToast === 'function') {
                    showToast('Confira seus dados e tente novamente.', 'error', 'Falha no acesso');
                }
                resetButton();
            }
        });
    }

    firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
            handleUserRedirect(user);
        } else {
            resetButton();
        }
    });
});
