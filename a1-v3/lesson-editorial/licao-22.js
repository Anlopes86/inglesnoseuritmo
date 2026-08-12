(function () {
    'use strict';

    window.V3LessonEditorial.register('a1-v3', 22, lesson => ({
        ...lesson,
        intro: [
            ['Mia', 'There are two cafés near my house.', 'Há duas cafeterias perto da minha casa.'],
            ['Ben', 'Is there a bank?', 'Há um banco?'],
            ['Mia', 'Yes. It is next to the supermarket.', 'Sim. Ele fica ao lado do supermercado.'],
            ['Ben', 'Are there parks near your house?', 'Há parques perto da sua casa?']
        ],
        grammar: {
            ...lesson.grammar,
            rows: [
                ['plural', 'There are + number + plural noun', 'There are two cafés.', 'Há duas cafeterias.'],
                ['pergunta plural', 'Are there + plural noun...?', 'Are there parks near here?', 'Há parques perto daqui?'],
                ['contraste', 'There is one / There are two', 'There is a bank. There are two cafés.', 'Há um banco. Há duas cafeterias.']
            ],
            notes: [
                'Use are com substantivo plural.',
                'Em pergunta, coloque are antes de there.',
                'Any será apresentado depois; nesta aula, concentre-se em there is e there are.'
            ]
        },
        expressions: [
            lesson.expressions[0],
            ['Are there... near here?', 'Há ... perto daqui?', 'Pergunta sobre lugares no plural sem antecipar any.', 'Are there cafés near here?', 'Há cafeterias perto daqui?'],
            lesson.expressions[2],
            lesson.expressions[3],
            ['How many ... are there?', 'Quantos/quantas ... há?', 'Use quando quiser uma quantidade exata.', 'How many cafés are there?', 'Quantas cafeterias há?']
        ],
        activitySections: [
            {
                eyebrow: 'One or More?',
                title: 'Escolha there is ou there are',
                instruction: 'Observe primeiro se o lugar está no singular ou no plural. Depois, forme a frase ou a pergunta completa.',
                items: [
                    ['Complete', 'There ___ two cafés.', '', 'are'],
                    ['Complete', 'There ___ one bank.', '', 'is'],
                    ['Complete', '___ there parks near here?', '', 'Are'],
                    ['Choose', 'There (is / are) three schools.', '', 'are'],
                    ['Build', 'two pharmacies / are / There', '', 'There are two pharmacies.'],
                    ['Build', 'cafés / there / Are / near here / ?', '', 'Are there cafés near here?'],
                    ['Correct', 'There is two cafés.', '', 'There are two cafés.'],
                    ['Correct', 'Are there a park?', '', 'Is there a park?']
                ]
            },
            {
                eyebrow: 'Neighborhood Map',
                title: 'Localize lugares em um mapa descrito',
                instruction: 'Use next to, across from ou near. As informações estão todas na tela; não é necessário mover objetos físicos.',
                items: [
                    ['Complete', 'The bank is ___ to the supermarket.', '', 'next'],
                    ['Complete', 'The park is ___ from the school.', '', 'across'],
                    ['Describe', 'Map: bank beside café.', '', 'The bank is next to the café.'],
                    ['Describe', 'Map: park opposite school.', '', 'The park is across from the school.'],
                    ['Answer', 'How many pharmacies are there? Map: 3.', '', 'There are three pharmacies.'],
                    ['Describe', 'Map: one bank, two cafés, one park.', '', 'There is a bank and a park. There are two cafés.']
                ]
            }
        ],
        conversation: {
            questions: [
                'Is there a bank near your home?',
                'Are there cafés near your home?',
                'How many supermarkets are there in your neighborhood?',
                'What place is next to another place?',
                'Describe your neighborhood with there is and there are.'
            ],
            support: ['There is...', 'There are...', 'Is there...?', 'Are there...?', 'It is next to/across from...']
        }
    }));
}());
