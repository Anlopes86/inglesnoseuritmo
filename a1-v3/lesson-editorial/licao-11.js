(function () {
    'use strict';

    window.V3LessonEditorial.register('a1-v3', 11, lesson => ({
        ...lesson,
        expressions: [
            ...lesson.expressions,
            ['First...', 'Primeiro...', 'Use para apresentar a primeira ação do dia.', 'First, I wake up at seven.', 'Primeiro, eu acordo às sete.'],
            ['Then...', 'Depois...', 'Use para ligar a próxima ação da rotina.', 'Then, I have breakfast.', 'Depois, eu tomo café da manhã.']
        ],
        activitySections: [
            {
                eyebrow: 'Daily Timeline',
                title: 'Organize as ações do dia',
                instruction: 'Monte uma sequência possível e leia a rotina usando first e then. Nesta aula, mantenha as frases afirmativas com I ou you.',
                items: [
                    ['Complete', 'I ___ up at seven.', '', 'wake'],
                    ['Complete', 'You ___ breakfast at home.', '', 'have'],
                    ['Choose', 'I (study / studies) in the morning.', '', 'study'],
                    ['Build', 'go / I / to work / at eight', '', 'I go to work at eight.'],
                    ['Build', 'lunch / You / at noon / have', '', 'You have lunch at noon.'],
                    ['Order', 'wake up · have breakfast · go to work', '', 'wake up → have breakfast → go to work'],
                    ['Order', 'go home · have dinner · go to bed', '', 'go home → have dinner → go to bed'],
                    ['Correct', 'I goes home at five.', '', 'I go home at five.']
                ]
            },
            {
                eyebrow: 'My Real Routine',
                title: 'Construa uma rotina que faça sentido para você',
                instruction: 'Complete cada etapa com informações verdadeiras ou inventadas. Depois, conecte as frases em uma fala curta.',
                items: [
                    ['Describe', 'Morning: wake up + time.', '', 'I wake up at...'],
                    ['Describe', 'Morning: breakfast + place.', '', 'I have breakfast at...'],
                    ['Describe', 'Day: work or study + time.', '', 'I work/study at...'],
                    ['Describe', 'Evening: go home + time.', '', 'I go home at...'],
                    ['Describe', 'Night: go to bed + time.', '', 'I go to bed at...']
                ]
            }
        ],
        conversation: {
            questions: [
                'Describe your morning in three sentences.',
                'Say what you do at noon.',
                'Describe one activity in the afternoon.',
                'Say what you do in the evening.',
                'Give your complete routine from morning to night.'
            ],
            support: ['First, I...', 'Then, I...', 'In the morning...', 'In the afternoon...', 'At night...']
        }
    }));
}());
