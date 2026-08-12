(function () {
    'use strict';

    window.V3LessonEditorial.register('a1-v3', 7, lesson => ({
        ...lesson,
        intro: [
            ['Nora', 'What is it?', 'O que é isso?'],
            ['Mia', 'It is a notebook.', 'É um caderno.'],
            ['Nora', 'And this?', 'E isto?'],
            ['Mia', 'It is an eraser.', 'É uma borracha.']
        ],
        expressions: [
            ...lesson.expressions,
            ['I think it is...', 'Acho que é...', 'Use quando você ainda não tem certeza sobre o objeto.', 'I think it is a key.', 'Acho que é uma chave.']
        ],
        activitySections: [
            {
                eyebrow: 'A or An?',
                title: 'Escolha pelo som inicial',
                instruction: 'Diga o bloco completo em voz alta. Não escolha apenas pela primeira letra: preste atenção ao som da palavra.',
                items: [
                    ['Choose', '___ book (a / an)', '', 'a book'],
                    ['Choose', '___ eraser (a / an)', '', 'an eraser'],
                    ['Choose', '___ umbrella (a / an)', '', 'an umbrella'],
                    ['Choose', '___ notebook (a / an)', '', 'a notebook'],
                    ['Sort', 'book · umbrella · key · eraser · pen · bag', '', 'A: book, key, pen, bag. AN: umbrella, eraser.'],
                    ['Correct', 'It is an pencil.', '', 'It is a pencil.'],
                    ['Correct', 'It is a umbrella.', '', 'It is an umbrella.']
                ]
            },
            {
                eyebrow: 'Lost & Found',
                title: 'Identifique objetos encontrados',
                instruction: 'Leia cada descrição como se ela aparecesse na página de objetos perdidos de uma escola.',
                items: [
                    ['Complete', 'Object 1: It ___ a blue pen.', '', 'is'],
                    ['Complete', 'Object 2: It is ___ eraser.', '', 'an'],
                    ['Answer', 'The picture shows one notebook. What is it?', '', 'It is a notebook.'],
                    ['Answer', 'Is it your key?', '', 'Yes, it is. / No, it is not.'],
                    ['Describe', 'Picture: one bag with one book inside.', '', 'It is a bag. A book is inside.']
                ]
            }
        ],
        conversation: {
            questions: [
                'What is on your desk?',
                'Is it a book or a notebook?',
                'What is in your bag?',
                'What is near you: a bag or an umbrella?',
                'Choose an object. What is it?'
            ],
            support: ['It is a...', 'It is an...', 'I think it is...', 'Yes, it is.', 'No, it is not.']
        }
    }));
}());
