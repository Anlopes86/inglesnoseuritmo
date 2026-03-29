document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'insr-theme';
    const DARK = 'dark';
    const LIGHT = 'light';

    function getStoredTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (error) {
            return null;
        }
    }

    function getPreferredTheme() {
        const storedTheme = getStoredTheme();
        if (storedTheme === DARK || storedTheme === LIGHT) {
            return storedTheme;
        }

        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? DARK
            : LIGHT;
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (error) {
            // ignore persistence issues
        }
    }

    function getThemeMeta(theme) {
        return theme === DARK
            ? { icon: 'fa-sun', label: 'Tema claro' }
            : { icon: 'fa-moon', label: 'Tema escuro' };
    }

    function syncThemeToggle() {
        const button = document.querySelector('[data-b1-theme-toggle]');
        if (!button) return;

        const currentTheme = document.documentElement.getAttribute('data-theme') || LIGHT;
        const meta = getThemeMeta(currentTheme);
        button.innerHTML = `<i class="fas ${meta.icon}"></i><span>${meta.label}</span>`;
        button.setAttribute('aria-label', meta.label);
        button.setAttribute('title', meta.label);
    }

    function injectThemeToggle() {
        const headerContainer = document.querySelector('header .container');
        const slideCounter = document.getElementById('slide-counter');
        if (!headerContainer || !slideCounter || headerContainer.querySelector('[data-b1-theme-toggle]')) {
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'flex items-center gap-3';

        const themeButton = document.createElement('button');
        themeButton.type = 'button';
        themeButton.className = 'lesson-theme-toggle';
        themeButton.setAttribute('data-b1-theme-toggle', 'true');

        slideCounter.parentNode.insertBefore(wrapper, slideCounter);
        wrapper.appendChild(themeButton);
        wrapper.appendChild(slideCounter);
    }

    document.body.classList.add('b1-lesson-page');
    applyTheme(getPreferredTheme());
    injectThemeToggle();
    syncThemeToggle();

    const backLink = document.querySelector('header a[href="b1.html"]');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn') || document.getElementById('finish-lesson-btn');

    if (backLink) {
        backLink.innerHTML = '<i class="fas fa-chevron-left"></i> Voltar para B1';
    }

    if (prevBtn) prevBtn.innerHTML = '<i class="fas fa-chevron-left mr-1"></i> Anterior';
    if (nextBtn) nextBtn.innerHTML = 'Próximo <i class="fas fa-chevron-right ml-1"></i>';
    if (finishBtn) finishBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Finalizar aula';

    document.addEventListener('click', (event) => {
        const themeToggle = event.target.closest('[data-b1-theme-toggle]');
        if (!themeToggle) return;

        const currentTheme = document.documentElement.getAttribute('data-theme') || LIGHT;
        applyTheme(currentTheme === DARK ? LIGHT : DARK);
        syncThemeToggle();
    });

    document.body.classList.add('b1-theme-ready');
});

