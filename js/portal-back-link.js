document.addEventListener('DOMContentLoaded', () => {
    const backLinks = document.querySelectorAll('[data-portal-back]');
    if (!backLinks.length) return;

    const destinations = {
        admin: { href: '../admin.html', label: ' Voltar ao Admin' },
        professor: { href: '../index.html', label: ' Voltar ao Painel' },
        aluno: { href: '../home-aluno.html', label: ' Voltar ao Portal' }
    };

    function normalizeRole(role) {
        return Object.prototype.hasOwnProperty.call(destinations, role) ? role : 'aluno';
    }

    function updateBackLinks(role) {
        const destination = destinations[normalizeRole(role)];

        backLinks.forEach((backLink) => {
            backLink.href = destination.href;

            for (const node of backLink.childNodes) {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
                    node.textContent = destination.label;
                    break;
                }
            }
        });
    }

    const storedRole = localStorage.getItem('loggedInUserRole');
    updateBackLinks(storedRole);

    if (typeof firebase === 'undefined' || !firebase.auth || !firebase.firestore) return;

    const auth = firebase.auth();
    const db = typeof window.db !== 'undefined' ? window.db : firebase.firestore();

    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            updateBackLinks('aluno');
            return;
        }

        try {
            const profileDoc = await db.collection('students').doc(user.uid).get();
            const authenticatedRole = profileDoc.exists ? profileDoc.data().role : storedRole;
            const role = normalizeRole(authenticatedRole);

            localStorage.setItem('loggedInUserRole', role);
            updateBackLinks(role);
        } catch (error) {
            console.error('Erro ao identificar o portal de retorno:', error);
            updateBackLinks(storedRole);
        }
    });
});
