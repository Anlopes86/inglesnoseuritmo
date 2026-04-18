document.addEventListener('DOMContentLoaded', () => {
    const firebaseAuth = firebase.auth();
    const firebaseDb = firebase.firestore();
    const platformAccess = window.PlatformAccess;

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
            let profile = platformAccess
                ? await platformAccess.fetchProfileById(firebaseDb, user.uid)
                : null;

            if (profile && platformAccess) {
                profile = await platformAccess.ensureInitialAdmin(firebaseDb, profile);
            }

            if (!profile) {
                console.error('Usuario nao encontrado no banco de dados.');
                await firebaseAuth.signOut();
                setLoginError('Seu perfil ainda nao esta configurado para acesso.');
                resetButton();
                return;
            }

            localStorage.setItem('loggedInUserRole', profile.role);

            if (profile.role === 'aluno') {
                window.location.href = 'home-aluno.html';
                return;
            }

            if (profile.role === 'professor') {
                window.location.href = 'index.html';
                return;
            }

            if (profile.role === 'admin') {
                window.location.href = 'admin.html';
                return;
            }

            setLoginError('Seu perfil ainda nao possui um tipo de acesso valido.');
            resetButton();
        } catch (error) {
            console.error('Erro ao buscar dados do usuario:', error);
            setLoginError('Nao foi possivel carregar seu perfil agora.');
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
                setLoginError('Usuario ou senha invalidos.');
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
