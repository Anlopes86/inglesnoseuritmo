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
        document.querySelector('[data-lesson-index]')?.remove();
    }

    window.A2V2Template = {
        normalizeText,
        similarity,
        speak,
        createLessonIndex
    };

    document.addEventListener('DOMContentLoaded', createLessonIndex);
}());
