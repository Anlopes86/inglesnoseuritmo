(function () {
    'use strict';

    window.V3LessonEditorial.register('a1-v3', 28, lesson => ({
        ...lesson,
        expressions: [
            ...lesson.expressions,
            ['What is he/she doing?', 'O que ele/ela está fazendo?', 'Use para perguntar sobre outra pessoa na cena.', 'What is Ana doing? She is studying.', 'O que Ana está fazendo? Ela está estudando.']
        ],
        activitySections: [
            {
                eyebrow: 'Questions and Short Answers',
                title: 'Pergunte sobre o que acontece agora',
                instruction: 'Mova am, is ou are para antes do sujeito. Na resposta curta, repita a mesma forma do verbo be.',
                items: [
                    ['Build', 'you / Are / working / ?', '', 'Are you working?'],
                    ['Build', 'she / Is / coming / now / ?', '', 'Is she coming now?'],
                    ['Build', 'they / Are / studying / today / ?', '', 'Are they studying today?'],
                    ['Answer', 'Are you waiting?', 'negative', 'No, I’m not.'],
                    ['Answer', 'Is Leo cooking?', 'positive', 'Yes, he is.'],
                    ['Answer', 'Are Mia and Ana working?', 'negative', 'No, they aren’t.'],
                    ['Transform', 'He is sleeping. → question', '', 'Is he sleeping?'],
                    ['Correct', 'Are she coming?', '', 'Is she coming?']
                ]
            },
            {
                eyebrow: 'Video Call Check',
                title: 'Descubra o que cada pessoa está fazendo',
                instruction: 'Leia a informação e produza a pergunta, a resposta ou a negativa solicitada. Use now ou at the moment quando ajudar o sentido.',
                items: [
                    ['Make a question', 'Answer: Ana is studying.', '', 'What is Ana doing?'],
                    ['Make a question', 'Answer: Yes, Ben is cooking.', '', 'Is Ben cooking?'],
                    ['Answer', 'Is Leo studying? Leo: sleep now', '', 'No, he isn’t. He is sleeping.'],
                    ['Answer', 'What are Mia and Eva doing? take photos', '', 'They are taking photos.'],
                    ['Transform', 'She is working today. → negative', '', 'She is not working today.'],
                    ['Correct', 'He not is sleeping.', '', 'He is not sleeping.'],
                    ['Describe', 'You are on a call. Say one thing you are doing and one thing you are not doing.', '', 'I am talking, but I am not working.']
                ]
            }
        ],
        conversation: {
            questions: [
                'What are you doing right now?',
                'Are you sitting near a window?',
                'Are you studying or working today?',
                'Ask your teacher what he or she is doing.',
                'Imagine a video call with a friend. Ask two questions.',
                'Describe one thing a person is doing and one thing the person is not doing.'
            ],
            support: ['What are you doing?', 'Are you ...ing?', 'Yes, I am. / No, I’m not.', 'He/She is ...ing.', 'He/She isn’t ...ing.']
        }
    }));
}());
