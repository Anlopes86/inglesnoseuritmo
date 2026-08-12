(function () {
    'use strict';

    window.V3LessonEditorial.register('a1-v3', 3, lesson => ({
        ...lesson,
        activitySections: [
            {
                eyebrow: 'Family Clues',
                title: 'Identifique as pessoas da família',
                instruction: 'Leia cada pista e responda com uma frase completa usando he, she e o familiar adequado.',
                items: [
                    ['Answer', 'Eva is Mia’s mother. Who is Eva?', '', 'She is Mia’s mother.'],
                    ['Answer', 'Tom is Mia’s father. Who is Tom?', '', 'He is Mia’s father.'],
                    ['Answer', 'Leo is Mia’s brother. Who is Leo?', '', 'He is Mia’s brother.'],
                    ['Answer', 'Ana is Ben’s sister. Who is Ana?', '', 'She is Ben’s sister.'],
                    ['Build', 'is / my / This / friend / Nina', '', 'This is my friend Nina.'],
                    ['Correct', 'Who she is?', '', 'Who is she?']
                ]
            },
            {
                eyebrow: 'Possessives in Context',
                title: 'Mostre de quem é cada pessoa ou informação',
                instruction: 'Complete ou corrija usando my, your, his ou her. Explique em português quem é o dono antes de responder.',
                items: [
                    ['Complete', 'I am Mia. Leo is ___ brother.', '', 'my'],
                    ['Complete', 'You are Ben. Ana is ___ sister.', '', 'your'],
                    ['Complete', 'He is Leo. ___ mother is Eva.', '', 'His'],
                    ['Complete', 'She is Ana. ___ father is Tom.', '', 'Her'],
                    ['Choose', 'Sofia is here. (His / Her) brother is here too.', '', 'Her'],
                    ['Correct', 'Leo is my brother. Her name is Leo.', '', 'Leo is my brother. His name is Leo.'],
                    ['Transform', 'This is my sister. → talk directly to Ben about Ben’s sister', '', 'This is your sister.']
                ]
            }
        ],
        conversation: {
            questions: [
                'Who is one person in your family?',
                'What is his or her name?',
                'Introduce a friend to the teacher.',
                'Imagine a family photo and identify three people.',
                'Ask the teacher who one person in the imaginary photo is.'
            ],
            support: ['This is my...', 'Who is he?', 'Who is she?', 'His name is...', 'Her name is...']
        }
    }));
}());
