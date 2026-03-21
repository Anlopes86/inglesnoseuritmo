(function () {
    const BUTTON_CLASS = 'flashcard-pronounce-btn';
    const STYLE_ID = 'flashcard-pronunciation-style';

    function ensureStyles() {
        if (document.getElementById(STYLE_ID)) return;
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            .flashcard-front, .flip-card-front { overflow: hidden; }
            .flashcard-front .${BUTTON_CLASS}, .flip-card-front .${BUTTON_CLASS} {
                position: absolute;
                top: 0.75rem;
                right: 0.75rem;
                width: 2.25rem;
                height: 2.25rem;
                border-radius: 9999px;
                border: 1px solid rgba(255,255,255,0.25);
                background: rgba(255,255,255,0.18);
                color: currentColor;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: transform 0.2s, background-color 0.2s, opacity 0.2s;
                z-index: 2;
                opacity: 0.9;
            }
            .flashcard-front .${BUTTON_CLASS}:hover, .flip-card-front .${BUTTON_CLASS}:hover {
                transform: scale(1.05);
                background: rgba(255,255,255,0.3);
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    function getFrontText(front) {
        const heading = front.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading && heading.textContent.trim()) return heading.textContent.trim();

        const clone = front.cloneNode(true);
        clone.querySelectorAll('button').forEach((btn) => btn.remove());
        return clone.textContent.replace(/\s+/g, ' ').trim();
    }

    function speak(text) {
        if (!text || !('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    function addButton(front) {
        if (!front || front.querySelector(`.${BUTTON_CLASS}`) || front.querySelector('.speak-btn, .pronounce-btn')) return;

        const text = getFrontText(front);
        if (!text) return;

        const computedPosition = window.getComputedStyle(front).position;
        if (computedPosition === 'static') {
            front.style.position = 'relative';
        }

        const button = document.createElement('button');
        button.type = 'button';
        button.className = BUTTON_CLASS;
        button.setAttribute('aria-label', 'Hear pronunciation');
        button.innerHTML = '<i class="fas fa-volume-up"></i>';
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            speak(text);
        });
        front.appendChild(button);
    }

    function init() {
        ensureStyles();
        document.querySelectorAll('.flashcard-front, .flip-card-front').forEach(addButton);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
