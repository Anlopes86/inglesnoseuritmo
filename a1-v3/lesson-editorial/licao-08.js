(function () {
    'use strict';

    window.V3LessonEditorial.register('a1-v3', 8, lesson => ({
        ...lesson,
        expressions: [
            ...lesson.expressions,
            ['Here you are.', 'Aqui está.', 'Use ao entregar um objeto para alguém.', 'Here you are. This is your key.', 'Aqui está. Esta é sua chave.']
        ],
        activitySections: [
            {
                eyebrow: 'Near or Far?',
                title: 'Escolha this ou that pela distância',
                instruction: 'Imagine a posição indicada. Depois, leia a frase completa apontando para perto ou para longe.',
                items: [
                    ['Choose', 'The key is in your hand: (This / That) is a key.', '', 'This is a key.'],
                    ['Choose', 'The chair is across the room: (This / That) is a chair.', '', 'That is a chair.'],
                    ['Complete', '___ is my pen here.', '', 'This'],
                    ['Complete', '___ is the door over there.', '', 'That'],
                    ['Build', 'this / Is / notebook / your / ?', '', 'Is this your notebook?'],
                    ['Build', 'that / What / is / ?', '', 'What is that?']
                ]
            },
            {
                eyebrow: 'Object Check',
                title: 'Confirme antes de devolver o objeto',
                instruction: 'Use as pistas da tela para perguntar, confirmar ou corrigir a identificação.',
                items: [
                    ['Answer', 'Is this your bag? Give a positive answer.', '', 'Yes, it is.'],
                    ['Answer', 'Is that your notebook? Give a negative answer.', '', 'No, it is not.'],
                    ['Correct', 'This are my key.', '', 'This is my key.'],
                    ['Correct', 'That is an chair.', '', 'That is a chair.'],
                    ['Describe', 'Near: a blue pen. Far: a black bag.', '', 'This is a blue pen. That is a black bag.']
                ]
            }
        ],
        conversation: {
            questions: [
                'What is this near you?',
                'What is that across the room?',
                'Is this your phone?',
                'Is that a door or a window?',
                'Point to one near object and one far object. What are they?'
            ],
            support: ['This is...', 'That is...', 'Is this...?', 'Is that...?', 'Here you are.']
        }
    }));
}());
