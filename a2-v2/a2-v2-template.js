(function () {
    function normalizeText(value) {
        return String(value || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[.,!?;:'"]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function similarity(a, b) {
        const source = normalizeText(a);
        const target = normalizeText(b);
        if (!source || !target) return 0;
        if (source === target) return 1;

        const sourceWords = new Set(source.split(' '));
        const targetWords = new Set(target.split(' '));
        const shared = [...sourceWords].filter((word) => targetWords.has(word)).length;
        return shared / Math.max(sourceWords.size, targetWords.size);
    }

    function speak(text, lang = 'en-US') {
        if (!('speechSynthesis' in window) || !text) return false;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
        return true;
    }

    function createLessonIndex() {
        const slides = Array.from(document.querySelectorAll('.slide'));
        const header = document.querySelector('header');
        if (!slides.length || !header || document.querySelector('[data-lesson-index]')) return;

        const nav = document.createElement('nav');
        nav.className = 'lesson-index';
        nav.setAttribute('data-lesson-index', 'true');
        nav.setAttribute('aria-label', 'Índice da lição');
        nav.innerHTML = slides.map((slide, index) => {
            const title = slide.dataset.title || `Slide ${index + 1}`;
            return `<button type="button" data-jump-slide="${index}">${index + 1}. ${title}</button>`;
        }).join('');

        header.insertAdjacentElement('afterend', nav);

        nav.addEventListener('click', (event) => {
            const trigger = event.target.closest('[data-jump-slide]');
            if (!trigger) return;

            const targetIndex = Number(trigger.dataset.jumpSlide);
            if (!Number.isInteger(targetIndex)) return;

            const activeIndex = slides.findIndex((slide) => slide.classList.contains('active'));
            const delta = targetIndex - activeIndex;
            const buttonId = delta > 0 ? 'next-btn' : 'prev-btn';
            const button = document.getElementById(buttonId);

            for (let step = 0; step < Math.abs(delta); step += 1) {
                button?.click();
            }

            document.dispatchEvent(new CustomEvent('a2v2:slide-jump', { detail: { index: targetIndex } }));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        const sync = () => {
            const activeIndex = slides.findIndex((slide) => slide.classList.contains('active'));
            nav.querySelectorAll('[data-jump-slide]').forEach((button, index) => {
                button.classList.toggle('is-active', index === activeIndex);
            });
        };

        slides.forEach((slide) => {
            new MutationObserver(sync).observe(slide, { attributes: true, attributeFilter: ['class'] });
        });
        sync();
    }

    window.A2V2Template = {
        normalizeText,
        similarity,
        speak,
        createLessonIndex
    };

    document.addEventListener('DOMContentLoaded', createLessonIndex);
}());
