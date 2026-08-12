(function () {
    'use strict';

    window.V3LessonEditorial.register('a1-v3', 18, lesson => ({
        ...lesson,
        expressions: [
            ...lesson.expressions,
            ['How many ... do you have?', 'Quantos/quantas ... você tem?', 'Use para perguntar quantidade dentro da família.', 'How many cousins do you have?', 'Quantos primos você tem?']
        ],
        activitySections: [
            {
                eyebrow: 'Have or Has?',
                title: 'Escolha a forma pela pessoa',
                instruction: 'Identifique o sujeito e complete com have ou has. Não use has com I, you, we ou they.',
                items: [
                    ['Choose', 'I (have / has) one brother.', '', 'have'],
                    ['Choose', 'She (have / has) a daughter.', '', 'has'],
                    ['Complete', 'They ___ two cousins.', '', 'have'],
                    ['Complete', 'Leo ___ one son.', '', 'has'],
                    ['Complete', 'My parents ___ a blue car.', '', 'have'],
                    ['Correct', 'He have one son.', '', 'He has one son.'],
                    ['Correct', 'We has a small family.', '', 'We have a small family.']
                ]
            },
            {
                eyebrow: 'Whose Is It?',
                title: 'Mostre relação e posse',
                instruction: 'Transforme a informação usando nome + ’s, our ou their. Depois, confirme de quem é a pessoa ou o objeto.',
                items: [
                    ['Transform', 'the car of Leo', '', 'Leo’s car'],
                    ['Transform', 'the sister of Ana', '', 'Ana’s sister'],
                    ['Complete', 'Mia and I love ___ family.', '', 'our'],
                    ['Complete', 'Ben and Ana have a house. ___ house is new.', '', 'Their'],
                    ['Answer', 'Whose blue bag is this? It belongs to Leo.', '', 'It is Leo’s bag. / It is Leo’s.'],
                    ['Correct', 'The Ana’s brother is here.', '', 'Ana’s brother is here.'],
                    ['Describe', 'Eva has one daughter. Her name is Mia.', '', 'Mia is Eva’s daughter. Eva has one daughter.']
                ]
            }
        ],
        conversation: {
            questions: [
                'How many brothers or sisters do you have?',
                'How many cousins do you have?',
                'Describe one person in your family with has.',
                'Name one object that belongs to a family member.',
                'Describe your family with our or their.'
            ],
            support: ['I have...', 'He/She has...', 'Our family...', 'Their house...', 'It is ...’s.']
        }
    }));
}());
