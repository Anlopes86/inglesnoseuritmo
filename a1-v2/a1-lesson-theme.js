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
        const button = document.querySelector('[data-a1-theme-toggle]');
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
        if (!headerContainer || !slideCounter || headerContainer.querySelector('[data-a1-theme-toggle]')) {
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'flex items-center gap-3';

        const themeButton = document.createElement('button');
        themeButton.type = 'button';
        themeButton.className = 'lesson-theme-toggle';
        themeButton.setAttribute('data-a1-theme-toggle', 'true');

        slideCounter.parentNode.insertBefore(wrapper, slideCounter);
        wrapper.appendChild(themeButton);
        wrapper.appendChild(slideCounter);
    }

    function enhanceTables() {
        document.querySelectorAll('table').forEach((table) => {
            const parent = table.parentElement;
            if (!parent) return;

            if (parent.classList.contains('grammar-table')) {
                parent.classList.add('lesson-table-scroll');
                return;
            }

            if (table.closest('.overflow-x-auto, .lesson-table-scroll, .table-responsive')) {
                return;
            }

            const wrapper = document.createElement('div');
            wrapper.className = 'lesson-table-scroll';
            parent.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        });
    }

    applyTheme(getPreferredTheme());
    injectThemeToggle();
    enhanceTables();
    syncThemeToggle();

    const backLink = document.querySelector('header a[href="a1.html"]');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn') || document.getElementById('finish-lesson-btn');

    if (backLink) {
        backLink.innerHTML = '<i class="fas fa-chevron-left"></i> Voltar para A1';
    }

    if (prevBtn) prevBtn.innerHTML = '<i class="fas fa-chevron-left mr-1"></i> Anterior';
    if (nextBtn) nextBtn.innerHTML = 'Próximo <i class="fas fa-chevron-right ml-1"></i>';
    if (finishBtn) finishBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Finalizar aula';

    document.addEventListener('click', (event) => {
        const themeToggle = event.target.closest('[data-a1-theme-toggle]');
        if (themeToggle) {
            const currentTheme = document.documentElement.getAttribute('data-theme') || LIGHT;
            applyTheme(currentTheme === DARK ? LIGHT : DARK);
            syncThemeToggle();
            return;
        }

        const flashcard = event.target.closest('.flashcard');
        if (!flashcard) return;

        if (event.target.closest('button, a, input, textarea, select, label')) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();
        flashcard.classList.toggle('flipped');
        flashcard.dispatchEvent(new CustomEvent('flashcard:toggled', {
            bubbles: true,
            detail: { flipped: flashcard.classList.contains('flipped') }
        }));
    }, true);

    const stepItems = Array.from(document.querySelectorAll('[data-step-target]'));
    if (stepItems.length) {
        const slides = Array.from(document.querySelectorAll('.slide'));

        const syncSteps = () => {
            const activeSlide = slides.find((slide) => slide.classList.contains('active'));
            const activeTitle = activeSlide?.dataset.title;

            stepItems.forEach((item) => {
                item.classList.toggle('is-active', item.dataset.stepTarget === activeTitle);
            });
        };

        syncSteps();

        const observer = new MutationObserver(syncSteps);
        slides.forEach((slide) => {
            observer.observe(slide, { attributes: true, attributeFilter: ['class'] });
        });
    }

    document.addEventListener('keydown', (event) => {
        const tag = document.activeElement?.tagName;
        const isTyping = /INPUT|TEXTAREA|SELECT/.test(tag || '');
        if (isTyping) return;

        if (event.key === 'ArrowLeft') {
            prevBtn?.click();
        }

        if (event.key === 'ArrowRight') {
            nextBtn?.click();
        }
    });

    const choiceBuilders = Array.from(document.querySelectorAll('[data-choice-builder]'));

    const normalizePracticeAnswer = (text) => (text || '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[.?!"']/g, '')
        .replace(/\s+/g, ' ');

    const checkPracticeSelect = (select) => {
        select.classList.remove('correct', 'incorrect');
        if (!select.value.trim()) return;
        const ok = normalizePracticeAnswer(select.value) === normalizePracticeAnswer(select.dataset.answer || '');
        select.classList.add(ok ? 'correct' : 'incorrect');
    };

    document.querySelectorAll('select[data-answer]').forEach((select) => {
        select.addEventListener('change', () => checkPracticeSelect(select));
    });

    document.querySelectorAll('[data-visible-choice]').forEach((button) => {
        button.addEventListener('click', () => {
            const item = button.closest('[data-visible-item]');
            if (!item) return;

            const ok = normalizePracticeAnswer(button.dataset.visibleChoice) === normalizePracticeAnswer(item.dataset.answer || '');
            item.querySelectorAll('[data-visible-choice]').forEach((choice) => {
                choice.classList.remove('selected-correct', 'selected-incorrect');
            });
            button.classList.add(ok ? 'selected-correct' : 'selected-incorrect');

            const feedback = item.querySelector('[data-visible-feedback]');
            if (feedback) {
                feedback.textContent = ok ? 'Correct!' : `Try again. Correct answer: ${item.dataset.answer || ''}`;
            }
        });
    });

    choiceBuilders.forEach((builder) => {
        const preview = builder.querySelector('[data-choice-preview]');
        const resetButton = builder.querySelector('[data-choice-reset]');
        const speakButton = builder.querySelector('[data-choice-speak]');
        const template = builder.dataset.template || '';
        const requiredSlots = (builder.dataset.required || '')
            .split(',')
            .map((value) => value.trim())
            .filter(Boolean);
        const emptyText = builder.dataset.previewEmpty || 'Monte sua frase usando os blocos abaixo.';
        const state = {};

        const render = () => {
            const sentence = template.replace(/\{(.*?)\}/g, (_, slotName) => {
                const key = String(slotName).trim();
                return state[key] || '...';
            });
            const isComplete = requiredSlots.every((slot) => Boolean(state[slot]));

            if (preview) {
                preview.textContent = isComplete ? sentence : emptyText;
                preview.classList.toggle('is-complete', isComplete);
            }

            if (speakButton) {
                speakButton.disabled = !isComplete;
            }
        };

        builder.querySelectorAll('[data-choice-slot]').forEach((button) => {
            button.addEventListener('click', () => {
                const slot = button.dataset.choiceSlot;
                const value = button.dataset.choiceValue || '';
                if (!slot) return;

                state[slot] = value;

                builder.querySelectorAll(`[data-choice-slot="${slot}"]`).forEach((item) => {
                    item.classList.toggle('is-active', item === button);
                });

                render();
            });
        });

        if (resetButton) {
            resetButton.addEventListener('click', () => {
                Object.keys(state).forEach((key) => delete state[key]);
                builder.querySelectorAll('[data-choice-slot]').forEach((button) => {
                    button.classList.remove('is-active');
                });
                render();
            });
        }

        if (speakButton) {
            speakButton.addEventListener('click', () => {
                const text = preview?.textContent?.trim();
                if (!text || text === emptyText) return;

                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'en-US';
                speechSynthesis.cancel();
                speechSynthesis.speak(utterance);
            });
        }

        render();
    });

    document.body.classList.add('a1-theme-ready');
});
