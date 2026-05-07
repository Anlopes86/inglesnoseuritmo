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

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function getLessonNumber() {
        const match = window.location.pathname.match(/licao-(\d+)\.html/i);
        return match ? Number(match[1]) : 0;
    }

    function getLessonTitle() {
        const headerTitle = document.querySelector('header h1')?.textContent || '';
        const heroTitle = document.querySelector('.lesson-hero h2')?.textContent || '';
        return (headerTitle || heroTitle || 'A1 English')
            .replace(/^A1\s+V2\s*-\s*Lesson\s+\d+:\s*/i, '')
            .replace(/^Aula\s+\d+\s*-\s*/i, '')
            .trim();
    }

    function getLessonContext() {
        const heroText = document.querySelector('.lesson-hero p')?.textContent || '';
        const contextMatch = heroText.match(/situa(?:ç|c)(?:ã|a)o real:\s*([^.]*)/i);
        return (contextMatch?.[1] || getLessonTitle()).trim().toLowerCase();
    }

    function getPremiumWordSet(lessonNumber) {
        const words = [
            ['opportunity', 'make a plan', 'look for'],
            ['challenge', 'take notes', 'find out'],
            ['environment', 'ask a question', 'carry on'],
            ['research', 'give an example', 'set up'],
            ['community', 'share an idea', 'turn out'],
            ['culture', 'compare opinions', 'point out'],
            ['technology', 'solve a problem', 'work on'],
            ['choice', 'explain a reason', 'bring up']
        ];
        return words[(Math.max(lessonNumber, 1) - 1) % words.length];
    }

    function getConnectorSet(lessonNumber) {
        if (lessonNumber >= 24) return ['however', 'therefore', 'as a result'];
        if (lessonNumber >= 16) return ['also', 'because', 'although'];
        if (lessonNumber >= 8) return ['and', 'but', 'so'];
        return ['and', 'but', 'because'];
    }

    function getWritingGoal(lessonNumber) {
        if (lessonNumber >= 24) return '80-100 words';
        if (lessonNumber >= 12) return '60-80 words';
        return '40-60 words';
    }

    function buildPremiumPack() {
        const lessonNumber = getLessonNumber();
        const title = getLessonTitle();
        const context = getLessonContext();
        const [advancedWord, collocation, phrasalVerb] = getPremiumWordSet(lessonNumber);
        const connectors = getConnectorSet(lessonNumber);
        const lowerTitle = title.toLowerCase();
        const goal = getWritingGoal(lessonNumber);
        const student = lessonNumber % 2 === 0 ? 'Bruno' : 'Ana';

        return {
            lessonNumber,
            title,
            context,
            advancedWord,
            collocation,
            phrasalVerb,
            connectors,
            goal,
            student,
            readingText: `${student} is studying ${lowerTitle} in a real situation: ${context}. At first, the task looks simple, but the class needs to read carefully. The teacher asks the students to read quickly first, find one detail, and explain the reason for each answer. This routine helps beginners connect simple A1 English with longer school texts. It also builds confidence for tests because students learn to notice keywords, examples, connectors, and small changes in meaning.`,
            modelText: `${student} is learning ${lowerTitle}. The topic is useful because it appears in real conversations and school texts. I can use simple vocabulary, examples, and connectors such as ${connectors.join(', ')}. This helps me understand the main idea and give a clearer answer in English.`
        };
    }

    function createPremiumSlide(title, html) {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.dataset.title = title;
        slide.dataset.a1V2Premium = 'true';
        slide.innerHTML = html;
        return slide;
    }

    function buildReadingSlide(pack) {
        return createPremiumSlide('Reading Strategy', `
            <div class="section-card p-8 max-w-6xl mx-auto">
                <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div>
                        <p class="lesson-panel-title">Reading Strategy</p>
                        <h2 class="text-3xl font-bold text-slate-900">Skimming, scanning and inference</h2>
                    </div>
                    <span class="mini-metric"><i class="fas fa-book-open"></i> Vestibular bridge</span>
                </div>
                <div class="grid md:grid-cols-3 gap-4 mb-6">
                    <div class="activity-card">
                        <h3 class="font-bold text-slate-900 mb-2">Skimming</h3>
                        <p class="text-slate-700">Read fast to identify the topic, repeated words, and the general idea.</p>
                    </div>
                    <div class="activity-card">
                        <h3 class="font-bold text-slate-900 mb-2">Scanning</h3>
                        <p class="text-slate-700">Look for a specific detail: a name, number, place, action, or keyword.</p>
                    </div>
                    <div class="activity-card">
                        <h3 class="font-bold text-slate-900 mb-2">Inference</h3>
                        <p class="text-slate-700">Use clues in the text to understand an idea that is not said directly.</p>
                    </div>
                </div>
                <div class="activity-card mb-6">
                    <p class="lesson-panel-title">Mini reading in English</p>
                    <p class="text-lg leading-relaxed text-slate-800 mt-2">${escapeHtml(pack.readingText)}</p>
                </div>
                <div class="grid lg:grid-cols-3 gap-4">
                    <div class="activity-card" data-visible-item data-answer="A student uses a simple reading routine.">
                        <p class="font-bold text-slate-900 mb-3">1. What is the main idea?</p>
                        <div class="option-cloud">
                            <button class="option-chip" data-visible-choice="The text only lists vocabulary.">The text only lists vocabulary.</button>
                            <button class="option-chip" data-visible-choice="A student uses a simple reading routine.">A student uses a simple reading routine.</button>
                            <button class="option-chip" data-visible-choice="The teacher cancels the lesson.">The teacher cancels the lesson.</button>
                        </div>
                        <p class="mt-3 text-sm font-bold text-slate-600" data-visible-feedback></p>
                    </div>
                    <div class="activity-card" data-visible-item data-answer="one detail">
                        <p class="font-bold text-slate-900 mb-3">2. What does the teacher ask students to find?</p>
                        <div class="option-cloud">
                            <button class="option-chip" data-visible-choice="one detail">one detail</button>
                            <button class="option-chip" data-visible-choice="a song title">a song title</button>
                            <button class="option-chip" data-visible-choice="a long translation">a long translation</button>
                        </div>
                        <p class="mt-3 text-sm font-bold text-slate-600" data-visible-feedback></p>
                    </div>
                    <div class="activity-card" data-visible-item data-answer="It helps students connect simple English with longer texts.">
                        <p class="font-bold text-slate-900 mb-3">3. What can we infer?</p>
                        <div class="option-cloud">
                            <button class="option-chip" data-visible-choice="It helps students connect simple English with longer texts.">It helps students connect simple English with longer texts.</button>
                            <button class="option-chip" data-visible-choice="It makes students ignore keywords.">It makes students ignore keywords.</button>
                            <button class="option-chip" data-visible-choice="It replaces speaking practice.">It replaces speaking practice.</button>
                        </div>
                        <p class="mt-3 text-sm font-bold text-slate-600" data-visible-feedback></p>
                    </div>
                </div>
            </div>
        `);
    }

    function buildDialogueSlide(pack) {
        return createPremiumSlide('Natural Dialogue', `
            <div class="section-card p-8 max-w-6xl mx-auto">
                <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div>
                        <p class="lesson-panel-title">Dialogue upgrade</p>
                        <h2 class="text-3xl font-bold text-slate-900">A more natural conversation</h2>
                    </div>
                    <span class="mini-metric"><i class="fas fa-comments"></i> 10 lines</span>
                </div>
                <div class="grid lg:grid-cols-[1.25fr_0.75fr] gap-6">
                    <div class="activity-card space-y-3 text-lg leading-relaxed">
                        <p><strong>A:</strong> Hi, are you ready to practice ${escapeHtml(pack.title)}?</p>
                        <p><strong>B:</strong> I think so, but I need a real example.</p>
                        <p><strong>A:</strong> Sure. Imagine we are talking about ${escapeHtml(pack.context)}.</p>
                        <p><strong>B:</strong> That helps. What should I say first?</p>
                        <p><strong>A:</strong> Start with a simple sentence, then add one detail.</p>
                        <p><strong>B:</strong> Okay. I can also use "${escapeHtml(pack.connectors[0])}" to connect ideas.</p>
                        <p><strong>A:</strong> Exactly. Use "${escapeHtml(pack.connectors[1])}" when you explain a reason.</p>
                        <p><strong>B:</strong> Good point. This is a useful ${escapeHtml(pack.advancedWord)} for speaking and reading.</p>
                        <p><strong>A:</strong> Nice. Now ${escapeHtml(pack.collocation)} and answer with confidence.</p>
                        <p><strong>B:</strong> Thanks. I will ${escapeHtml(pack.phrasalVerb)} new examples after class.</p>
                    </div>
                    <div class="space-y-4">
                        <div class="activity-card">
                            <p class="lesson-panel-title">Premium vocabulary</p>
                            <ul class="mt-3 space-y-2 text-slate-700">
                                <li><strong>${escapeHtml(pack.advancedWord)}</strong> - a high-frequency school word.</li>
                                <li><strong>${escapeHtml(pack.collocation)}</strong> - words that naturally go together.</li>
                                <li><strong>${escapeHtml(pack.phrasalVerb)}</strong> - common verb + particle expression.</li>
                            </ul>
                        </div>
                        <div class="teacher-guide">
                            <p class="font-bold mb-2">Teacher guidance</p>
                            <p>Use this as role-play. Ask students to replace the context, keep the connectors, and add one new detail in English.</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    function buildWritingSlide(pack) {
        const textareaId = `premium-writing-${pack.lessonNumber}`;
        return createPremiumSlide('Guided Writing', `
            <div class="section-card p-8 max-w-5xl mx-auto">
                <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div>
                        <p class="lesson-panel-title">Guided writing</p>
                        <h2 class="text-3xl font-bold text-slate-900">From short answers to test-ready writing</h2>
                    </div>
                    <span class="mini-metric"><i class="fas fa-pen"></i> Goal: ${escapeHtml(pack.goal)}</span>
                </div>
                <div class="grid lg:grid-cols-2 gap-6">
                    <div class="activity-card">
                        <p class="font-bold text-slate-900 mb-3">Model in English</p>
                        <p class="text-slate-800 leading-relaxed">${escapeHtml(pack.modelText)}</p>
                        <div class="mt-5 grid sm:grid-cols-3 gap-3">
                            ${pack.connectors.map((connector) => `<span class="mini-metric">${escapeHtml(connector)}</span>`).join('')}
                        </div>
                    </div>
                    <div class="activity-card">
                        <label for="${textareaId}" class="font-bold text-slate-900 block mb-3">Write your paragraph in English.</label>
                        <textarea id="${textareaId}" data-word-count-input data-word-count-target="${textareaId}-count" class="w-full min-h-44 rounded-2xl border border-slate-300 bg-white p-4 text-slate-900" placeholder="Write in English using the connectors and vocabulary from this lesson."></textarea>
                        <p id="${textareaId}-count" class="mt-3 text-sm font-bold text-slate-600">0 words</p>
                    </div>
                </div>
                <div class="homework-rubric mt-6">
                    <p class="font-bold mb-2">Checklist</p>
                    <p>Include a main idea, two details, at least two connectors, and one useful word from the vocabulary bank.</p>
                </div>
            </div>
        `);
    }

    function injectA1V2PremiumSlides() {
        if (!/\/a1-v2\//i.test(window.location.pathname.replace(/\\/g, '/'))) return;
        if (document.querySelector('[data-a1-v2-premium]')) return;

        const lessonNumber = getLessonNumber();
        const main = document.querySelector('main');
        if (!main || !lessonNumber) return;

        const slides = Array.from(main.querySelectorAll('.slide'));
        const anchor = slides.find((slide) => slide.dataset.title === 'Homework')
            || slides.find((slide) => slide.dataset.title === 'Lesson Complete')
            || null;
        const pack = buildPremiumPack();

        [buildReadingSlide(pack), buildDialogueSlide(pack), buildWritingSlide(pack)].forEach((slide) => {
            if (anchor) {
                main.insertBefore(slide, anchor);
            } else {
                main.appendChild(slide);
            }
        });

        document.querySelectorAll('[data-word-count-input]').forEach((textarea) => {
            const target = document.getElementById(textarea.dataset.wordCountTarget || '');
            const updateCount = () => {
                const words = textarea.value.trim().split(/\s+/).filter(Boolean).length;
                if (target) target.textContent = `${words} ${words === 1 ? 'word' : 'words'}`;
            };
            textarea.addEventListener('input', updateCount);
            updateCount();
        });
    }

    applyTheme(getPreferredTheme());
    injectThemeToggle();
    enhanceTables();
    injectA1V2PremiumSlides();
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
