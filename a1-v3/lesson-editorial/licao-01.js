(function () {
    'use strict';

    window.V3LessonEditorial.register('a1-v3', 1, lesson => ({
        ...lesson,
        activitySections: [
            {
                eyebrow: 'Comprehension Check',
                title: 'Escolha a resposta que combina com a situação',
                instruction: 'Leia a fala do professor e escolha uma resposta possível. Depois, diga a resposta completa em voz alta.',
                items: [
                    ['Choose', 'Hello! (Hello! / Goodbye!)', '', 'Hello!'],
                    ['Choose', 'Nice to meet you. (Nice to meet you too. / My name.)', '', 'Nice to meet you too.'],
                    ['Choose', 'Are you a new student? (Yes, I am. / Yes, you are.)', '', 'Yes, I am.'],
                    ['Choose', 'Goodbye, Eva. (See you. / Good morning.)', '', 'See you.']
                ]
            },
            {
                eyebrow: 'Conversation Builder',
                title: 'Construa seu primeiro encontro em inglês',
                instruction: 'Monte cada fala e, no final, faça a conversa completa com o professor usando seu nome verdadeiro.',
                items: [
                    ['Build', 'Hello / am / I / Bruno', '', 'Hello! I am Bruno.'],
                    ['Answer', 'Hello! I am Laura.', '', 'Hi, Laura. I am Bruno.'],
                    ['Answer', 'Are you a new student?', '', 'Yes, I am.'],
                    ['Answer', 'Nice to meet you.', '', 'Nice to meet you too.']
                ]
            }
        ],
        conversation: {
            questions: [
                'Say hello and tell the teacher your name.',
                'Ask this question: “Are you a new teacher?”',
                'Answer: “Are you a new student?”',
                'Finish the conversation with a polite goodbye.'
            ],
            support: ['Hello! I am...', 'Are you...?', 'Yes, I am.', 'Nice to meet you.', 'See you.']
        }
    }));
}());
