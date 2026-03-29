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
        const stored = getStoredTheme();
        if (stored === DARK || stored === LIGHT) return stored;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (error) {
            // ignore storage issues
        }
    }

    function getThemeMeta(theme) {
        return theme === DARK
            ? { icon: 'fa-sun', label: 'Tema claro' }
            : { icon: 'fa-moon', label: 'Tema escuro' };
    }

    function injectThemeToggle() {
        const headerContainer = document.querySelector('header .container');
        if (!headerContainer || headerContainer.querySelector('[data-business-theme-toggle]')) return;

        const spacer = headerContainer.lastElementChild;
        if (!spacer) return;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'business-theme-toggle';
        button.setAttribute('data-business-theme-toggle', 'true');
        headerContainer.replaceChild(button, spacer);
    }

    function syncThemeToggle() {
        const button = document.querySelector('[data-business-theme-toggle]');
        if (!button) return;
        const theme = document.documentElement.getAttribute('data-theme') || LIGHT;
        const meta = getThemeMeta(theme);
        button.innerHTML = `<i class="fas ${meta.icon}"></i><span>${meta.label}</span>`;
        button.setAttribute('aria-label', meta.label);
        button.setAttribute('title', meta.label);
    }

    function enhanceTables() {
        document.querySelectorAll('table').forEach((table) => {
            const parent = table.parentElement;
            if (!parent) return;
            if (table.closest('.overflow-x-auto, .lesson-table-scroll, .table-responsive')) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'lesson-table-scroll';
            parent.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        });
    }

    document.body.classList.add('business-lesson-page');
    applyTheme(getPreferredTheme());
    enhanceTables();
    injectThemeToggle();
    syncThemeToggle();

    const backLink = document.querySelector('header a');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn') || document.getElementById('finish-lesson-btn');

    if (backLink && /business\.html$/i.test(backLink.getAttribute('href') || '')) {
        backLink.innerHTML = '<i class="fas fa-chevron-left"></i> Voltar para Business';
    }
    if (nextBtn) nextBtn.textContent = 'Próximo';
    if (finishBtn) finishBtn.textContent = 'Finalizar aula';

    document.addEventListener('click', (event) => {
        const toggle = event.target.closest('[data-business-theme-toggle]');
        if (!toggle) return;
        const current = document.documentElement.getAttribute('data-theme') || LIGHT;
        applyTheme(current === DARK ? LIGHT : DARK);
        syncThemeToggle();
    });

    document.body.classList.add('business-theme-ready');
});
