document.addEventListener('DOMContentLoaded', () => {
    const firebaseAuth = firebase.auth();
    const firebaseDb = firebase.firestore();
    const platformAccess = window.PlatformAccess;

    const loginForm = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');
    const resetPasswordBtn = document.getElementById('reset-password-btn');
    const loginError = document.getElementById('login-error');
    const loginStatus = document.getElementById('login-status');
    let redirectInFlight = null;

    function withTimeout(promise, milliseconds) {
        let timer;
        const deadline = new Promise((_, reject) => {
            timer = setTimeout(() => {
                const error = new Error('Login request timed out');
                error.code = 'login/timeout';
                reject(error);
            }, milliseconds);
        });
        return Promise.race([promise, deadline]).finally(() => clearTimeout(timer));
    }

    function accessErrorMessage(error, profileStage = false) {
        if (error?.code === 'permission-denied') return 'Sua conta foi autenticada, mas o acesso ao perfil foi recusado. É necessário revisar as permissões do cadastro.';
        if (['login/timeout', 'auth/network-request-failed', 'unavailable'].includes(error?.code)) return 'A conexão demorou ou ficou indisponível. Verifique sua internet e tente entrar novamente.';
        if (error?.code === 'auth/too-many-requests') return 'Houve muitas tentativas. Aguarde um pouco antes de tentar novamente.';
        if (error?.code === 'auth/user-disabled') return 'Este acesso está desativado. Entre em contato com o responsável pela plataforma.';
        if (profileStage) return 'Não foi possível carregar seu perfil agora. Tente entrar novamente.';
        return 'Usuário ou senha inválidos.';
    }

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

    function setLoginStatus(message, tone = 'muted') {
        if (!loginStatus) return;
        loginStatus.textContent = message || '';
        loginStatus.classList.remove('text-green-600', 'text-red-600', 'text-slate-500');
        if (!message) return;

        if (tone === 'success') {
            loginStatus.classList.add('text-green-600');
            return;
        }

        if (tone === 'error') {
            loginStatus.classList.add('text-red-600');
            return;
        }

        loginStatus.classList.add('text-slate-500');
    }

    function resetButton() {
        if (!loginBtn) return;
        loginBtn.disabled = false;
        loginBtn.innerHTML = '<i class="fas fa-arrow-right-to-bracket"></i> Entrar';
    }

    function deriveEmailFromUsername() {
        const userInput = document.getElementById('username')?.value.trim() || '';
        if (!userInput) return '';
        return userInput.includes('@')
            ? userInput
            : `${userInput.toLowerCase()}@inglesnoseuritmo.com`;
    }

    function handleUserRedirect(user) {
        if (!user) return Promise.resolve();
        if (redirectInFlight) return redirectInFlight;
        redirectInFlight = loadProfileAndRedirect(user).finally(() => { redirectInFlight = null; });
        return redirectInFlight;
    }

    async function loadProfileAndRedirect(user) {
        if (!user) return;
        setLoginStatus('Carregando seu perfil…');

        try {
            const profile = platformAccess
                ? await withTimeout(platformAccess.fetchProfileById(firebaseDb, user.uid), 15000)
                : null;

            // Signing in only reads the user's profile. Administrative migrations
            // must not run here or require a professor to list other accounts.

            if (!profile) {
                console.error('Usuario nao encontrado no banco de dados.');
                await withTimeout(firebaseAuth.signOut(), 15000);
                setLoginStatus('');
                setLoginError('Seu perfil ainda nao esta configurado para acesso.');
                resetButton();
                return;
            }

            localStorage.setItem('loggedInUserId', user.uid);
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
            setLoginStatus('');
            resetButton();
        } catch (error) {
            console.error('Erro ao buscar dados do usuario:', error);
            setLoginStatus('');
            setLoginError(accessErrorMessage(error, true));
            resetButton();
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            clearLoginError();
            setLoginStatus('');

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

                setLoginStatus('Verificando seu acesso…');
                const credential = await withTimeout(firebaseAuth.signInWithEmailAndPassword(email, password), 20000);
                // A retry with the same signed-in user need not emit another auth
                // event. Explicitly retry profile loading; concurrent calls coalesce.
                await handleUserRedirect(credential.user);
            } catch (error) {
                console.error('Erro de login:', error);
                setLoginStatus('');
                const message = accessErrorMessage(error);
                setLoginError(message);
                if (typeof showToast === 'function') {
                    showToast(message, 'error', 'Falha no acesso');
                }
                resetButton();
            }
        });
    }

    if (resetPasswordBtn) {
        resetPasswordBtn.addEventListener('click', async () => {
            clearLoginError();
            setLoginStatus('');

            const email = deriveEmailFromUsername();
            if (!email) {
                setLoginStatus('Digite seu nome de usuario antes de pedir a redefinicao.', 'error');
                return;
            }

            resetPasswordBtn.disabled = true;
            resetPasswordBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

            try {
                await firebaseAuth.sendPasswordResetEmail(email);
                setLoginStatus('Se existir uma conta com esse acesso, um e-mail de redefinicao foi enviado.', 'success');
                if (typeof showToast === 'function') {
                    showToast('Verifique sua caixa de entrada para redefinir a senha.', 'success', 'Link enviado');
                }
            } catch (error) {
                console.error('Erro ao enviar redefinicao de senha:', error);
                setLoginStatus('Nao foi possivel enviar o link agora. Tente novamente em instantes.', 'error');
            } finally {
                resetPasswordBtn.disabled = false;
                resetPasswordBtn.innerHTML = '<i class="fas fa-key"></i> Esqueci minha senha';
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
