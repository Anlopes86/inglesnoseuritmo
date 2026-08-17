(function () {
    'use strict';

    const alphabet = [
        ['A', '/eɪ/', 'êi'], ['B', '/biː/', 'bí'], ['C', '/siː/', 'cí'], ['D', '/diː/', 'dí'],
        ['E', '/iː/', 'í'], ['F', '/ef/', 'éf'], ['G', '/dʒiː/', 'djí'], ['H', '/eɪtʃ/', 'êitch'],
        ['I', '/aɪ/', 'ái'], ['J', '/dʒeɪ/', 'djêi'], ['K', '/keɪ/', 'kêi'], ['L', '/el/', 'él'],
        ['M', '/em/', 'ém'], ['N', '/en/', 'én'], ['O', '/oʊ/', 'ôu'], ['P', '/piː/', 'pí'],
        ['Q', '/kjuː/', 'kiú'], ['R', '/ɑːr/', 'ár'], ['S', '/es/', 'és'], ['T', '/tiː/', 'tí'],
        ['U', '/juː/', 'iú'], ['V', '/viː/', 'ví'], ['W', '/ˈdʌbəl.juː/', 'dâbol iú'],
        ['X', '/eks/', 'éks'], ['Y', '/waɪ/', 'uái'], ['Z', '/ziː/ (US) · /zed/ (UK)', 'zí / zéd']
    ];

    const numbersToTwenty = [
        'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
        'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
        'seventeen', 'eighteen', 'nineteen', 'twenty'
    ];

    function audioButton(text, label) {
        return `<button type="button" class="foundation-audio" data-v3-speak="${text}" aria-label="Ouvir ${label}" title="Ouvir pronúncia"><i class="fas fa-volume-up" aria-hidden="true"></i></button>`;
    }

    function alphabetSlide() {
        return `<section class="foundation-reference">
            <div class="slide-heading"><p class="lesson-panel-title">Alphabet & Pronunciation</p><h2>O alfabeto em inglês</h2><p>Ouça uma letra por vez e repita. A escrita entre barras mostra a pronúncia; a última linha é apenas uma aproximação em português.</p></div>
            <div class="alphabet-board">${alphabet.map(([letter, ipa, hint]) => `<article class="alphabet-tile"><strong>${letter}</strong><span>${ipa}</span><small>${hint}</small>${audioButton(letter, `a letra ${letter}`)}</article>`).join('')}</div>
            <p class="foundation-note"><strong>Pratique em blocos:</strong> A–F, G–L, M–R e S–Z. Depois, leia os nomes indicados pelo professor com o quadro visível.</p>
        </section>`;
    }

    function numbersSlide() {
        return `<section class="foundation-reference">
            <div class="slide-heading"><p class="lesson-panel-title">Numbers 0–20</p><h2>Números de zero a vinte</h2><p>Leia cada número em voz alta, ouça o modelo e depois pratique em ordem aleatória.</p></div>
            <div class="number-board number-board-foundation">${numbersToTwenty.map((word, number) => `<article class="number-tile"><strong>${number}</strong><span>${word}</span>${audioButton(word, `o número ${number}`)}</article>`).join('')}</div>
            <div class="number-patterns"><p><strong>13–19:</strong> a maioria termina em <em>-teen</em>.</p><p><strong>Atenção:</strong> thirteen, fifteen e eighteen mudam um pouco a escrita.</p></div>
        </section>`;
    }

    window.V3LessonEditorial.register('a1-v3', 4, lesson => ({
        ...lesson,
        afterVocabularySlides: [
            { title: 'Alfabeto e pronúncia', body: alphabetSlide },
            { title: 'Números de 0 a 20', body: numbersSlide }
        ],
        activitySections: [
            ...lesson.activitySections,
            {
                eyebrow: 'Spelling',
                title: 'Ouça o nome e registre as letras',
                instruction: 'O professor soletra cada nome duas vezes. Escreva o nome e depois soletre de volta para confirmar.',
                items: [
                    ['Spell', 'M-I-A', '', 'Mia'],
                    ['Spell', 'B-E-N', '', 'Ben'],
                    ['Spell', 'S-O-F-I-A', '', 'Sofia'],
                    ['Spell', 'L-E-O', '', 'Leo']
                ]
            },
            {
                eyebrow: 'Numbers 0–20',
                title: 'Reconheça e leia os números',
                instruction: 'Escreva o número por extenso. Depois, o professor diz outro número e você registra somente os algarismos.',
                items: [
                    ['Number', '0', '', 'zero'],
                    ['Number', '5', '', 'five'],
                    ['Number', '8', '', 'eight'],
                    ['Number', '11', '', 'eleven'],
                    ['Number', '12', '', 'twelve'],
                    ['Number', '15', '', 'fifteen'],
                    ['Number', '20', '', 'twenty']
                ]
            },
            {
                eyebrow: 'Registration Form',
                title: 'Leia um cadastro pronto',
                instruction: 'Use as informações fornecidas em cada item. Leia o modelo completo sem precisar inventar respostas.',
                items: [
                    ['Answer', 'First name: Mia → What is your first name?', '', 'My first name is Mia.'],
                    ['Answer', 'Last name: Reed → What is your last name?', '', 'My last name is Reed.'],
                    ['Answer', 'Last name: Reed → How do you spell your last name?', '', 'R-E-E-D.'],
                    ['Answer', 'Age: 18 → How old are you?', '', 'I am eighteen years old.'],
                    ['Answer', 'You did not understand one letter. What do you say?', '', 'Please repeat.']
                ]
            }
        ],
        conversation: {
            questions: [
                'What is your full name?',
                'How do you spell your first name?',
                'How do you spell your last name?',
                'Choose a number from zero to twenty and say it.',
                'Ask the teacher to repeat one piece of information.',
                'Complete a short online registration with the teacher.'
            ],
            support: ['What is your name?', 'My name is...', 'How do you spell...?', 'I am... years old.', 'Please repeat.']
        }
    }));
}());
