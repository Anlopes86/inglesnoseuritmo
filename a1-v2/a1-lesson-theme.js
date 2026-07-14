(function () {
    const STORAGE_KEY = 'insr-theme';
    const LIGHT = 'light';
    const DARK = 'dark';

    function storedTheme() {
        try {
            const value = localStorage.getItem(STORAGE_KEY);
            return value === DARK || value === LIGHT ? value : null;
        } catch (error) {
            return null;
        }
    }

    function preferredTheme() {
        return storedTheme()
            || (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? DARK : LIGHT);
    }

    function applyTheme(theme) {
        document.documentElement.dataset.theme = theme;
        document.body.dataset.theme = theme;
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (error) {
            // Theme persistence is optional.
        }
    }

    function syncToggle(button) {
        if (!button) return;
        const dark = document.documentElement.dataset.theme === DARK;
        const label = dark ? 'Usar tema claro' : 'Usar tema escuro';
        button.innerHTML = `<i class="fas ${dark ? 'fa-sun' : 'fa-moon'}" aria-hidden="true"></i>`;
        button.setAttribute('aria-label', label);
        button.setAttribute('title', label);
    }

    function init() {
        applyTheme(preferredTheme());
        const toggle = document.querySelector('[data-a1-theme-toggle]');
        syncToggle(toggle);
        toggle?.addEventListener('click', () => {
            applyTheme(document.documentElement.dataset.theme === DARK ? LIGHT : DARK);
            syncToggle(toggle);
        });
        document.body.classList.add('a1-theme-ready');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
}());
