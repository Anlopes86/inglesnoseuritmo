(function () {
    'use strict';

    window.V3LessonEditorial.register('a1-v3', 24, lesson => ({
        ...lesson,
        intro: [
            ['Server', 'What would you like?', 'O que você gostaria?'],
            ['Mia', 'I’d like some tea, please.', 'Eu gostaria de chá, por favor.'],
            ['Server', 'Would you like some food?', 'Você gostaria de alguma comida?'],
            ['Mia', 'No, thank you.', 'Não, obrigada.']
        ],
        grammar: {
            ...lesson.grammar,
            rows: [
                ['afirmação/pedido', 'some + noun', 'I’d like some tea.', 'Eu gostaria de chá.'],
                ['oferta', 'Would you like some + noun?', 'Would you like some cake?', 'Você gostaria de bolo?'],
                ['pergunta de disponibilidade', 'any + noun?', 'Do you have any cake?', 'Vocês têm bolo?'],
                ['negativa', 'not + any + noun', 'We don’t have any cake.', 'Não temos bolo.']
            ],
            notes: [
                'Use some em afirmações, pedidos e ofertas em que esperamos uma possível aceitação.',
                'Use any para perguntar se algo está disponível e em respostas negativas.',
                'Memorize I’d like... e Would you like...? como blocos educados.'
            ]
        },
        expressions: [
            ...lesson.expressions,
            ['Can I have...?', 'Posso pedir/receber...?', 'Outra forma educada e frequente de pedir.', 'Can I have some water, please?', 'Posso pedir um pouco de água, por favor?'],
            ['Would you like some...?', 'Você gostaria de...?', 'Oferta educada feita pelo atendente.', 'Would you like some cake?', 'Você gostaria de bolo?']
        ],
        activitySections: [
            {
                eyebrow: 'Some or Any?',
                title: 'Escolha pela função da frase',
                instruction: 'Antes de completar, decida se a frase é afirmação, oferta, pedido, pergunta de disponibilidade ou negativa.',
                items: [
                    ['Choose', 'I’d like (some / any) tea.', '', 'some'],
                    ['Choose', 'Would you like (some / any) cake?', '', 'some'],
                    ['Choose', 'Do you have (some / any) sandwiches?', '', 'any'],
                    ['Complete', 'We don’t have ___ juice.', '', 'any'],
                    ['Complete', 'Can I have ___ water?', '', 'some'],
                    ['Build', 'have / you / cake / any / Do / ?', '', 'Do you have any cake?'],
                    ['Correct', 'I’d like any tea.', '', 'I’d like some tea.'],
                    ['Correct', 'We don’t have some cake.', '', 'We don’t have any cake.']
                ]
            },
            {
                eyebrow: 'Café Order',
                title: 'Faça um pedido completo e reaja à disponibilidade',
                instruction: 'Responda como cliente de uma cafeteria online. Todas as escolhas e mudanças aparecem na tela.',
                items: [
                    ['Answer', 'What would you like? Choose tea + sandwich.', '', 'I’d like some tea and a sandwich, please.'],
                    ['Answer', 'Would you like some cake? Accept.', '', 'Yes, please.'],
                    ['Answer', 'Do you have any cheese sandwiches?', '', 'Yes, we do. / No, we don’t have any.'],
                    ['Answer', 'Anything else? Decline politely.', '', 'No, thank you.'],
                    ['Say', 'Ask for water politely.', '', 'Can I have some water, please?'],
                    ['Say', 'Finish the order and ask for the bill.', '', 'The bill, please.']
                ]
            }
        ],
        conversation: {
            questions: [
                'What would you like to drink?',
                'What food would you like?',
                'Ask if the café has cake.',
                'React when one item is not available.',
                'Give your complete order and finish politely.'
            ],
            support: ['I’d like some...', 'Do you have any...?', 'Can I have...?', 'No, thank you.', 'The bill, please.']
        }
    }));
}());
