(function () {
    'use strict';

    window.V3LessonEditorial.register('a1-v3', 21, lesson => ({
        ...lesson,
        expressions: [
            ...lesson.expressions,
            ['Where is the...?', 'Onde está o/a...?', 'Use para perguntar a posição de um objeto específico.', 'Where is the lamp?', 'Onde está a lâmpada?']
        ],
        activitySections: [
            {
                eyebrow: 'One Thing in a Place',
                title: 'Apresente um objeto com there is',
                instruction: 'Nesta aula, mantenha o foco em uma coisa singular. Complete a frase com artigo e localização quando necessário.',
                items: [
                    ['Complete', 'There ___ a bed in the room.', '', 'is'],
                    ['Complete', 'There is ___ lamp on the desk.', '', 'a'],
                    ['Complete', 'There is ___ armchair in the living room.', '', 'an'],
                    ['Build', 'a sofa / There / is / in the living room', '', 'There is a sofa in the living room.'],
                    ['Build', 'there / Is / a desk / ?', '', 'Is there a desk?'],
                    ['Answer', 'Is there a bed in the bedroom? Positive answer.', '', 'Yes, there is.'],
                    ['Correct', 'There are a bed.', '', 'There is a bed.'],
                    ['Correct', 'There is lamp on desk.', '', 'There is a lamp on the desk.']
                ]
            },
            {
                eyebrow: 'In, On or Under?',
                title: 'Localize cada objeto no cômodo',
                instruction: 'Observe a relação espacial indicada e escolha in, on ou under. Depois, junte as frases em uma descrição do cômodo.',
                items: [
                    ['Choose', 'The bag is (in / on) the box.', '', 'in'],
                    ['Choose', 'The book is (on / under) the table. It is above the table.', '', 'on'],
                    ['Choose', 'The shoes are (on / under) the bed. They are below it.', '', 'under'],
                    ['Describe', 'Bedroom: one bed + one lamp on the desk.', '', 'There is a bed in the bedroom. There is a lamp on the desk.'],
                    ['Describe', 'Kitchen: one table + one bag under the table.', '', 'There is a table in the kitchen. A bag is under the table.'],
                    ['Answer', 'Where is the book? Clue: on the desk.', '', 'The book is on the desk.']
                ]
            }
        ],
        conversation: {
            questions: [
                'Is there a desk in your bedroom?',
                'What is on your desk?',
                'What is under your bed or table?',
                'Describe one thing in your kitchen.',
                'Describe one room with three singular objects.'
            ],
            support: ['There is a...', 'Is there a...?', 'Yes, there is.', 'It is in...', 'It is on/under...']
        }
    }));
}());
