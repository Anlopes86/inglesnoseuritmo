(function () {
    'use strict';

    window.V3LessonEditorial.register('a1-v3', 14, lesson => ({
        ...lesson,
        expressions: [
            ...lesson.expressions,
            ['And you?', 'E você?', 'Use depois de responder para continuar a conversa.', 'Yes, I do. And you?', 'Sim. E você?']
        ],
        activitySections: [
            {
                eyebrow: 'Do or Does?',
                title: 'Escolha o auxiliar e mantenha o verbo básico',
                instruction: 'Localize o sujeito primeiro. Em seguida, escolha do ou does e confira se o verbo principal está sem -s.',
                items: [
                    ['Complete', '___ you work at home?', '', 'Do'],
                    ['Complete', '___ she study at night?', '', 'Does'],
                    ['Complete', '___ Leo go home at five?', '', 'Does'],
                    ['Choose', 'Does he (work / works) here?', '', 'work'],
                    ['Choose', 'Do you (like / likes) coffee?', '', 'like'],
                    ['Build', 'you / Do / early / wake up / ?', '', 'Do you wake up early?'],
                    ['Build', 'she / Does / on weekends / work / ?', '', 'Does she work on weekends?'],
                    ['Correct', 'Does he goes home at five?', '', 'Does he go home at five?'],
                    ['Correct', 'Do she work late?', '', 'Does she work late?']
                ]
            },
            {
                eyebrow: 'Short Answers',
                title: 'Responda e mantenha a conversa',
                instruction: 'Dê a resposta curta solicitada. Quando indicado, acrescente uma informação verdadeira ou inventada.',
                items: [
                    ['Answer', 'Do you study English? Positive answer.', '', 'Yes, I do.'],
                    ['Answer', 'Does Mia work here? Negative answer.', '', 'No, she doesn’t.'],
                    ['Answer', 'Do you like coffee? Negative answer + preference.', '', 'No, I don’t. I like tea.'],
                    ['Answer', 'Does Leo study at night? Positive answer + time.', '', 'Yes, he does. He studies at eight.'],
                    ['Make a question', 'Answer: Yes, I do. I work in the morning.', '', 'Do you work in the morning?'],
                    ['Make a question', 'Answer: No, she doesn’t. She studies on weekdays.', '', 'Does she study on weekends?']
                ]
            }
        ],
        conversation: {
            questions: [
                'Do you wake up early?',
                'Do you study or work in the morning?',
                'Do you like coffee?',
                'Does someone in your family work on weekends?',
                'Does that person study English?'
            ],
            support: ['Yes, I do.', 'No, I don’t.', 'Yes, he/she does.', 'No, he/she doesn’t.', 'And you?']
        }
    }));
}());
