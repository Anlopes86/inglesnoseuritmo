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
        const button = document.querySelector('[data-a2-theme-toggle]');
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
        if (!headerContainer || !slideCounter || headerContainer.querySelector('[data-a2-theme-toggle]')) {
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'flex items-center gap-3';

        const themeButton = document.createElement('button');
        themeButton.type = 'button';
        themeButton.className = 'lesson-theme-toggle';
        themeButton.setAttribute('data-a2-theme-toggle', 'true');

        slideCounter.parentNode.insertBefore(wrapper, slideCounter);
        wrapper.appendChild(themeButton);
        wrapper.appendChild(slideCounter);
    }

    document.body.classList.add('a2-lesson-page');
    applyTheme(getPreferredTheme());

    document.addEventListener('click', (event) => {
        const themeToggle = event.target.closest('[data-a2-theme-toggle]');
        if (themeToggle) {
            const currentTheme = document.documentElement.getAttribute('data-theme') || LIGHT;
            applyTheme(currentTheme === DARK ? LIGHT : DARK);
            syncThemeToggle();
            return;
        }

        const flashcard = event.target.closest('.flashcard, .flip-card');
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

    const slides = Array.from(document.querySelectorAll('.slide'));
    const headerContainer = document.querySelector('header .container');
    const headerTitle = headerContainer?.querySelector('h1');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn') || document.getElementById('finish-lesson-btn');

    const addClasses = (elements, className) => {
        elements.forEach((element) => element.classList.add(...className.split(' ')));
    };

    const scrollToTopSoon = () => {
        window.requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    const topLevelCards = new Set();

    slides.forEach((slide, index) => {
        slide.classList.add('a2-slide-shell');

        const directChildren = Array.from(slide.children);
        directChildren.forEach((child) => {
            if (child.matches('div, section, article')) {
                const card = child.matches('[class*="bg-white"], .music-card, .grammar-box, table')
                    ? child
                    : child.querySelector(':scope > [class*="bg-white"], :scope > .music-card, :scope > .grammar-box, :scope > table');
                if (card) topLevelCards.add(card);
            }
        });

        const whiteCards = Array.from(slide.querySelectorAll('[class*="bg-white"]'));
        whiteCards.forEach((card) => {
            if (!card.closest('.music-card') && !card.classList.contains('lesson-hero')) {
                card.classList.add('section-card');
            }
        });

        addClasses(Array.from(slide.querySelectorAll('[class*="bg-gray-50"], [class*="bg-slate-50"]')), 'activity-card');
        addClasses(Array.from(slide.querySelectorAll('[class*="bg-orange-50"], [class*="bg-amber-50"]')), 'callout-warning');
        addClasses(Array.from(slide.querySelectorAll('[class*="bg-indigo-50"], [class*="bg-violet-50"], [class*="bg-blue-50"]')), 'callout-note');
        addClasses(Array.from(slide.querySelectorAll('[class*="bg-green-100"], [class*="bg-green-50"]')), 'callout-success');
        addClasses(Array.from(slide.querySelectorAll('.music-card')), 'section-card');
        addClasses(Array.from(slide.querySelectorAll('table')), 'grammar-table');

        const headings = Array.from(slide.querySelectorAll('h3, h4'));
        headings.forEach((heading) => {
            const parent = heading.parentElement;
            if (!parent) return;
            if (parent.matches('.section-card, .lesson-panel, .activity-card, .callout-note, .callout-success, .callout-warning, .grammar-box')) {
                heading.classList.add('lesson-panel-title');
            }
        });

        if (index === 0) {
            const introContainer = slide.querySelector('.text-center, .max-w-4xl, .max-w-5xl, .max-w-6xl');
            const alreadyStructured = slide.querySelector('.lesson-hero') || introContainer?.classList.contains('grid');
            if (introContainer && !alreadyStructured) {
                introContainer.classList.add('lesson-hero', 'rounded-[2rem]', 'p-8', 'md:p-10');

                const heroGrid = document.createElement('div');
                heroGrid.className = 'grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start';

                const copy = document.createElement('div');
                copy.className = 'a2-hero-copy';

                const aside = document.createElement('div');
                aside.className = 'a2-hero-aside';

                Array.from(introContainer.children).forEach((child) => {
                    if (child.matches('[class*="bg-white"], [class*="bg-green-"], [class*="bg-red-"], [class*="bg-orange-"], [class*="bg-amber-"], [class*="bg-indigo-"], [class*="bg-blue-"]')) {
                        aside.appendChild(child);
                    } else {
                        copy.appendChild(child);
                    }
                });

                if (!copy.children.length) {
                    Array.from(introContainer.childNodes).forEach((node) => copy.appendChild(node));
                } else {
                    introContainer.append(copy, aside);
                    heroGrid.append(copy, aside);
                    introContainer.appendChild(heroGrid);
                }

                if (!introContainer.contains(heroGrid)) {
                    introContainer.innerHTML = '';
                    heroGrid.append(copy, aside);
                    introContainer.appendChild(heroGrid);
                }

                const mainHeading = copy.querySelector('h2');
                const bodyText = copy.querySelector('p');
                if (mainHeading && !copy.querySelector('.lesson-chip')) {
                    const chipRow = document.createElement('div');
                    chipRow.className = 'flex flex-wrap gap-3 mt-6';
                    const chips = [
                        { icon: 'fa-compass', text: 'A2 em contexto' },
                        { icon: 'fa-comments', text: 'Foco em comunicação' },
                        { icon: 'fa-layer-group', text: 'Mais estrutura' }
                    ];
                    chips.forEach(({ icon, text }) => {
                        const chip = document.createElement('div');
                        chip.className = 'lesson-chip';
                        chip.innerHTML = `<i class="fas ${icon} text-violet-600"></i> ${text}`;
                        chipRow.appendChild(chip);
                    });
                    if (bodyText) {
                        bodyText.insertAdjacentElement('afterend', chipRow);
                    } else {
                        copy.appendChild(chipRow);
                    }
                }
            }
        }

        const isCompleteSlide = (slide.dataset.title || '').trim().toLowerCase() === 'lesson complete';
        if (isCompleteSlide) {
            const completeCard = slide.firstElementChild;
            if (completeCard) {
                completeCard.classList.add('lesson-hero', 'rounded-[2rem]', 'p-10', 'lesson-complete-card');
            }
        }
    });

    topLevelCards.forEach((card) => {
        if (!card.classList.contains('lesson-hero')) {
            card.classList.add('section-card');
        }
    });

    const getSlideTitle = (slide, index) => {
        const explicitTitle = slide.dataset.title?.trim();
        if (explicitTitle) return explicitTitle;

        const heading = slide.querySelector('h2, h3');
        const headingText = heading?.textContent?.trim();
        return headingText || `Step ${index + 1}`;
    };

    if (slides.length && headerContainer && headerTitle) {
        let slideLabel = document.getElementById('slide-title-header');
        let slideCounter = document.getElementById('slide-counter');

        if (!slideLabel) {
            slideLabel = document.createElement('p');
            slideLabel.id = 'slide-title-header';
            slideLabel.className = 'text-xs text-slate-400 font-medium';
            headerTitle.insertAdjacentElement('afterend', slideLabel);
        }

        if (!slideCounter) {
            slideCounter = document.createElement('div');
            slideCounter.id = 'slide-counter';
            slideCounter.className = 'text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full';

            const rightSlot = headerContainer.lastElementChild;
            if (rightSlot && rightSlot !== headerTitle.parentElement) {
                rightSlot.innerHTML = '';
                rightSlot.className = slideCounter.className;
                rightSlot.id = 'slide-counter';
                slideCounter = rightSlot;
            } else {
                headerContainer.appendChild(slideCounter);
            }
        }

        slides.forEach((slide, index) => {
            if (!slide.dataset.title) {
                slide.dataset.title = getSlideTitle(slide, index);
            }
        });
    }

    const syncHeader = () => {
        const activeSlide = slides.find((slide) => slide.classList.contains('active'));
        const activeTitle = activeSlide?.dataset.title;
        const slideCounter = document.getElementById('slide-counter');
        const slideLabel = document.getElementById('slide-title-header');
        const activeIndex = slides.findIndex((slide) => slide.classList.contains('active'));

        if (slideLabel) slideLabel.textContent = activeTitle || '';
        if (slideCounter && activeIndex >= 0) slideCounter.textContent = `${activeIndex + 1} / ${slides.length}`;
    };

    injectThemeToggle();
    syncThemeToggle();
    syncHeader();

    const observer = new MutationObserver(syncHeader);
    slides.forEach((slide) => {
        observer.observe(slide, { attributes: true, attributeFilter: ['class'] });
    });

    const backLink = document.querySelector('header a[href="a2.html"]');
    if (backLink) {
        backLink.innerHTML = '<i class="fas fa-chevron-left"></i> Voltar para A2';
    }

    if (prevBtn) prevBtn.innerHTML = '<i class="fas fa-chevron-left mr-1"></i> Anterior';
    if (nextBtn) nextBtn.innerHTML = 'Próximo <i class="fas fa-chevron-right ml-1"></i>';
    if (finishBtn) finishBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Finalizar aula';

    prevBtn?.addEventListener('click', scrollToTopSoon);
    nextBtn?.addEventListener('click', scrollToTopSoon);

    document.addEventListener('keydown', (event) => {
        const tag = document.activeElement?.tagName;
        const isTyping = /INPUT|TEXTAREA|SELECT/.test(tag || '');
        if (isTyping) return;

        if (event.key === 'ArrowLeft') {
            document.getElementById('prev-btn')?.click();
        }

        if (event.key === 'ArrowRight') {
            document.getElementById('next-btn')?.click();
        }
    });

    const choiceBuilders = Array.from(document.querySelectorAll('[data-choice-builder]'));

    choiceBuilders.forEach((builder) => {
        const preview = builder.querySelector('[data-choice-preview]');
        const resetButton = builder.querySelector('[data-choice-reset]');
        const speakButton = builder.querySelector('[data-choice-speak]');
        const template = builder.dataset.template || '';
        const requiredSlots = (builder.dataset.required || '')
            .split(',')
            .map((value) => value.trim())
            .filter(Boolean);
        const emptyText = builder.dataset.previewEmpty || 'Monte sua resposta usando as opções abaixo.';
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

        resetButton?.addEventListener('click', () => {
            Object.keys(state).forEach((key) => delete state[key]);
            builder.querySelectorAll('[data-choice-slot]').forEach((button) => {
                button.classList.remove('is-active');
            });
            render();
        });

        speakButton?.addEventListener('click', () => {
            const text = preview?.textContent?.trim();
            if (!text || text === emptyText) return;

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            speechSynthesis.cancel();
            speechSynthesis.speak(utterance);
        });

        render();
    });

    document.body.classList.remove('lesson-loading');
    document.body.classList.add('a2-theme-ready');
});
