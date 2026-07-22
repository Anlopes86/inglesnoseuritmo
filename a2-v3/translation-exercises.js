(function () {
    const DEFAULT_FEEDBACK = {
        empty: 'Digite ou fale uma tradução antes de verificar.',
        great: 'Muito bom. A estrutura principal está correta.',
        close: 'Quase lá. Compare com a sugestão e ajuste ordem, verbo ou preposição.',
        review: 'Revise a frase modelo e tente repetir em voz alta.'
    };

    function getItems(root) {
        const inlineJson = root.querySelector('script[type="application/json"]');
        if (!inlineJson) return [];

        try {
            const parsed = JSON.parse(inlineJson.textContent);
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.error('Erro ao ler frases de tradução:', error);
            return [];
        }
    }

    function setFeedback(element, message, type) {
        if (!element) return;
        element.textContent = message;
        element.className = `translation-feedback ${type || ''}`.trim();
    }

    function initTranslationExercise(root) {
        const items = getItems(root);
        if (!items.length) return;

        const source = root.querySelector('[data-translation-source]');
        const input = root.querySelector('[data-translation-input]');
        const feedback = root.querySelector('[data-translation-feedback]');
        const progress = root.querySelector('[data-translation-progress]');
        const playButton = root.querySelector('[data-translation-play]');
        const checkButton = root.querySelector('[data-translation-check]');
        const revealButton = root.querySelector('[data-translation-reveal]');
        const nextButton = root.querySelector('[data-translation-next]');
        const speakButton = root.querySelector('[data-translation-speak-answer]');
        const score = { attempts: 0, strong: 0 };
        let currentIndex = 0;

        const render = () => {
            const item = items[currentIndex];
            if (source) source.textContent = item.pt;
            if (input) {
                input.value = '';
                input.classList.remove('correct', 'incorrect');
            }
            if (progress) progress.textContent = `${currentIndex + 1} / ${items.length}`;
            setFeedback(feedback, 'Ouça, traduza e depois confira.', '');
        };

        const current = () => items[currentIndex];

        playButton?.addEventListener('click', () => {
            window.A2V2Template?.speak(current().pt, 'pt-BR');
        });

        speakButton?.addEventListener('click', () => {
            window.A2V2Template?.speak(input?.value || current().en, 'en-US');
        });

        revealButton?.addEventListener('click', () => {
            const item = current();
            setFeedback(feedback, `Sugestão: ${item.en}`, 'review');
            window.A2V2Template?.speak(item.en, 'en-US');
        });

        checkButton?.addEventListener('click', () => {
            const item = current();
            const answer = input?.value || '';
            const normalized = window.A2V2Template?.normalizeText || ((value) => String(value).trim().toLowerCase());
            const similarity = window.A2V2Template?.similarity || (() => 0);

            if (!normalized(answer)) {
                setFeedback(feedback, DEFAULT_FEEDBACK.empty, 'review');
                return;
            }

            const ratio = similarity(answer, item.en);
            score.attempts += 1;
            input?.classList.remove('correct', 'incorrect');

            if (normalized(answer) === normalized(item.en) || ratio >= 0.86) {
                score.strong += 1;
                input?.classList.add('correct');
                setFeedback(feedback, `${DEFAULT_FEEDBACK.great} Modelo: ${item.en}`, 'success');
                return;
            }

            input?.classList.add('incorrect');
            const message = ratio >= 0.55 ? DEFAULT_FEEDBACK.close : DEFAULT_FEEDBACK.review;
            setFeedback(feedback, `${message} Modelo: ${item.en}`, 'review');
        });

        nextButton?.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % items.length;
            render();
        });

        root.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && event.target === input) {
                event.preventDefault();
                checkButton?.click();
            }
        });

        render();
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-translation-exercise]').forEach(initTranslationExercise);
    });
}());
