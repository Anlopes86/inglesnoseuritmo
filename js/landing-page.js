document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('site-header');
    const menuButton = document.getElementById('mobile-menu-button');
    const nav = document.getElementById('site-nav');
    const year = document.getElementById('current-year');

    if (year) year.textContent = new Date().getFullYear();

    function closeMenu() {
        nav?.classList.remove('is-open');
        menuButton?.setAttribute('aria-expanded', 'false');
        if (menuButton) menuButton.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
    }

    menuButton?.addEventListener('click', () => {
        const open = nav.classList.toggle('is-open');
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.innerHTML = `<i class="fas ${open ? 'fa-xmark' : 'fa-bars'}" aria-hidden="true"></i>`;
    });

    nav?.addEventListener('click', (event) => {
        if (event.target.closest('a')) closeMenu();
    });

    window.addEventListener('scroll', () => {
        header?.classList.toggle('is-scrolled', window.scrollY > 18);
    }, { passive: true });

    const revealItems = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
});
