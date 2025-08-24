document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Toggle para abrir/fechar menu mobile
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link (para navegação na mesma página)
    document.querySelectorAll('.nav-links a').forEach(link => {
        // Verifica se o link é para uma âncora na mesma página
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        }
    });
});
