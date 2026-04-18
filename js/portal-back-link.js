document.addEventListener('DOMContentLoaded', () => {
    const backLink = document.querySelector('[data-portal-back]');
    if (!backLink) return;

    const userRole = localStorage.getItem('loggedInUserRole') || 'aluno';
    const isProfessor = userRole === 'professor';
    const isAdmin = userRole === 'admin';

    backLink.href = isAdmin ? '../admin.html' : isProfessor ? '../index.html' : '../home-aluno.html';

    for (const node of backLink.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
            node.textContent = isAdmin ? ' Voltar ao Admin' : isProfessor ? ' Voltar ao Painel' : ' Voltar ao Portal';
            break;
        }
    }
});
