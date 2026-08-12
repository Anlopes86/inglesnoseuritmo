(function () {
    'use strict';

    const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const tens = {
        20: 'twenty',
        30: 'thirty',
        40: 'forty',
        50: 'fifty',
        60: 'sixty',
        70: 'seventy',
        80: 'eighty',
        90: 'ninety'
    };

    function numberWord(number) {
        if (number === 100) return 'one hundred';
        const base = Math.floor(number / 10) * 10;
        const unit = number % 10;
        return unit ? `${tens[base]}-${units[unit]}` : tens[base];
    }

    function numberFamily(start, end) {
        const label = `${Math.floor(start / 10) * 10}s`;
        return `<article class="number-family"><h3><span>${label}</span>${tens[Math.floor(start / 10) * 10]}</h3><div>${Array.from({ length: end - start + 1 }, (_, index) => start + index).map(number => {
            const word = numberWord(number);
            return `<button type="button" class="number-chip" data-number-value="${number}" data-v3-speak="${word}" aria-label="Ouvir ${word}"><strong>${number}</strong><span>${word}</span><i class="fas fa-volume-up" aria-hidden="true"></i></button>`;
        }).join('')}</div></article>`;
    }

    function numbersToOneHundredSlide() {
        const families = [
            [21, 29], [30, 39], [40, 49], [50, 59],
            [60, 69], [70, 79], [80, 89], [90, 99]
        ];
        return `<section class="foundation-reference extended-numbers-reference">
            <div class="slide-heading"><p class="lesson-panel-title">Numbers 21–100</p><h2>Números de vinte e um a cem</h2><p>Observe como cada dezena forma uma família. Clique em qualquer número para ouvir e repita antes de usá-lo em telefone, endereço, idade ou preço.</p></div>
            <div class="number-spelling-alerts"><p><strong>twenty → twenty-one</strong><span>Use hífen entre a dezena e a unidade.</span></p><p><strong>forty</strong><span>Não escreva <s>fourty</s>.</span></p><p><strong>fifty / eighty</strong><span>Observe as mudanças na escrita.</span></p></div>
            <div class="number-family-grid">${families.map(([start, end]) => numberFamily(start, end)).join('')}</div>
            <div class="large-number-grid">
                <button type="button" class="hundred-card" data-number-value="100" data-v3-speak="one hundred" aria-label="Ouvir one hundred"><strong>100</strong><span>one hundred</span><i class="fas fa-volume-up" aria-hidden="true"></i></button>
                <button type="button" class="hundred-card" data-number-value="1000" data-v3-speak="one thousand" aria-label="Ouvir one thousand"><strong>1,000</strong><span>one thousand</span><i class="fas fa-volume-up" aria-hidden="true"></i></button>
                <button type="button" class="hundred-card" data-number-value="10000" data-v3-speak="ten thousand" aria-label="Ouvir ten thousand"><strong>10,000</strong><span>ten thousand</span><i class="fas fa-volume-up" aria-hidden="true"></i></button>
            </div>
        </section>`;
    }

    window.V3LessonEditorial.register('a1-v3', 6, lesson => ({
        ...lesson,
        vocab: [
            ...lesson.vocab,
            [
                'at (@)',
                'arroba',
                ['My email is ana@email.com.', 'Say: ana at email dot com.'],
                ['Meu e-mail é ana@email.com.', 'Diga: ana arroba email ponto com.']
            ],
            [
                'dot (.)',
                'ponto',
                ['My email is leo.silva@mail.com.', 'Say: leo dot silva at mail dot com.'],
                ['Meu e-mail é leo.silva@mail.com.', 'Diga: leo ponto silva arroba mail ponto com.']
            ]
        ],
        afterVocabularySlides: [
            { title: 'Números de 21 a 100', body: numbersToOneHundredSlide }
        ]
    }));
}());
