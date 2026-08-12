(function () {
    'use strict';

    window.V3LessonEditorial.register('b1-v3', 1, lesson => {
        const slides = lesson.slides.flatMap(slide => {
            if (slide.type !== 'practice') return [slide];
            return [
                {
                    ...slide,
                    title: 'Choose the Time Perspective',
                    intro: 'Decida primeiro se o falante apresenta uma experiência conectada ao presente ou um acontecimento terminado em um momento específico.',
                    items: [
                        { kind: 'choose', prompt: 'I (have changed / changed) careers in 2022.', options: ['have changed', 'changed'], answer: 'changed' },
                        { kind: 'choose', prompt: 'She (has never lived / never lived) abroad.', options: ['has never lived', 'never lived'], answer: 'has never lived' },
                        { kind: 'timeline', prompt: 'Add a finished-time detail: I have met several inspiring teachers.', hint: 'move the event to a finished period', answer: 'I met an inspiring teacher during my first year at university.' },
                        { kind: 'transform', prompt: 'Turn the specific event into a life experience: I visited Canada in 2019.', answer: 'I have visited Canada.' },
                        { kind: 'repair', prompt: 'Correct: I have started my current job last March.', answer: 'I started my current job last March.' }
                    ]
                },
                {
                    type: 'practice',
                    title: 'Experience Interview Follow-ups',
                    intro: 'Responda à pergunta principal e prepare-se para acrescentar quando, onde, por que ou como.',
                    items: [
                        { kind: 'answer', prompt: 'Have you ever made a decision that changed your routine?', answer: 'Yes, I have. I changed jobs two years ago, and the new schedule gave me more free time.' },
                        { kind: 'answer', prompt: 'What is something you have learned recently?', answer: 'I have learned how to organize shorter study sessions. I started doing that last month.' },
                        { kind: 'summary', prompt: 'Describe one defining moment: experience, specific event and present result.', answer: 'I have always enjoyed technology. In 2021, I took my first programming course, and now I use those skills at work.' },
                        { kind: 'question', prompt: 'Ask the teacher one experience question and one Past Simple follow-up.', answer: 'Have you ever lived abroad? When did you move there?' }
                    ]
                }
            ];
        });
        return { ...lesson, slides };
    });
}());
