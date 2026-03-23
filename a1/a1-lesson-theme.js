document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
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
            document.getElementById('prev-btn')?.click();
        }

        if (event.key === 'ArrowRight') {
            document.getElementById('next-btn')?.click();
        }
    });
});
