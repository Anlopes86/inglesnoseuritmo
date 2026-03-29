(function () {
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
        document.documentElement.style.colorScheme = theme;
        if (document.body) {
            document.body.setAttribute('data-theme', theme);
        }
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (error) {
            // ignore persistence issues
        }
    }

    function markThemeReady() {
        document.documentElement.classList.add('theme-ready');
        if (document.body) {
            document.body.classList.add('theme-ready');
            const currentTheme = document.documentElement.getAttribute('data-theme') || LIGHT;
            document.body.setAttribute('data-theme', currentTheme);
        }
    }

    function themeMeta(theme) {
        return theme === DARK
            ? { icon: 'fa-sun', label: 'Tema claro' }
            : { icon: 'fa-moon', label: 'Tema escuro' };
    }

    function syncButtons() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || LIGHT;
        const meta = themeMeta(currentTheme);
        document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
            button.innerHTML = `<i class="fas ${meta.icon}"></i><span>${meta.label}</span>`;
            button.setAttribute('aria-label', meta.label);
            button.setAttribute('title', meta.label);
        });
    }

    const initialTheme = getPreferredTheme();
    applyTheme(initialTheme);
    markThemeReady();

    document.addEventListener('DOMContentLoaded', () => {
        markThemeReady();
        syncButtons();

        document.addEventListener('click', (event) => {
            const toggle = event.target.closest('[data-theme-toggle]');
            if (!toggle) return;

            const currentTheme = document.documentElement.getAttribute('data-theme') || LIGHT;
            const nextTheme = currentTheme === DARK ? LIGHT : DARK;
            applyTheme(nextTheme);
            markThemeReady();
            syncButtons();
        });
    });
})();
