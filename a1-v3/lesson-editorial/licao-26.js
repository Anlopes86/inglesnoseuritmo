(function () {
    'use strict';

    window.V3LessonEditorial.register('a1-v3', 26, lesson => ({
        ...lesson,
        expressions: [
            ...lesson.expressions,
            ['What else can you do?', 'O que mais você sabe fazer?', 'Use para continuar a conversa depois da primeira resposta.', 'I can sing. — Great! What else can you do?', 'Eu sei cantar. — Ótimo! O que mais você sabe fazer?']
        ],
        activitySections: [
            {
                eyebrow: 'Can, And or But?',
                title: 'Monte respostas completas sobre habilidades',
                instruction: 'Use can sem to. Una duas habilidades com and ou faça um contraste com but.',
                items: [
                    ['Combine', 'I can sing. I can act.', 'use and', 'I can sing and act.'],
                    ['Combine', 'I can draw. I can’t dance.', 'use but', 'I can draw, but I can’t dance.'],
                    ['Complete', 'She can sing ___ play the guitar.', '', 'and'],
                    ['Complete', 'He can act, ___ he can’t sing.', '', 'but'],
                    ['Build', 'photos / can / take / Ana', '', 'Ana can take photos.'],
                    ['Build', 'you / guitar / play / Can / ?', '', 'Can you play the guitar?'],
                    ['Correct', 'I can to act and dance.', '', 'I can act and dance.'],
                    ['Correct', 'She cans draw very well.', '', 'She can draw very well.']
                ]
            },
            {
                eyebrow: 'Talent Show',
                title: 'Escolha pessoas para uma apresentação',
                instruction: 'Leia cada ficha e responda com frases completas. Justifique cada escolha com can, can’t, and ou but.',
                items: [
                    ['Describe', 'Mia: sing ✓ · dance ✓ · act ✗', '', 'Mia can sing and dance, but she can’t act.'],
                    ['Describe', 'Leo: guitar ✓ · sing ✗', '', 'Leo can play the guitar, but he can’t sing.'],
                    ['Answer', 'Who can take the show photos? Ana: take photos ✓', '', 'Ana can take the photos.'],
                    ['Answer', 'Can Ben sing? Ben: sing ✗ · act ✓', '', 'No, he can’t, but he can act.'],
                    ['Make a question', 'Answer: Yes, Eva can dance.', '', 'Can Eva dance?'],
                    ['Choose', 'The show needs music and photos. Choose Leo or Ana and explain.', '', 'Leo can play the guitar, and Ana can take photos. We need both.']
                ]
            }
        ],
        conversation: {
            questions: [
                'What can you do well?',
                'What can’t you do yet?',
                'Can you sing, dance or act?',
                'What else can you do?',
                'Describe the talents of one person you know.',
                'Choose two people for a talent show and explain your choices.'
            ],
            support: ['I can...', 'I can... and...', 'I can..., but I can’t...', 'He/She can...', 'What else can you do?']
        }
    }));
}());
