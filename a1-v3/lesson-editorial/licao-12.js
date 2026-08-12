(function () {
    'use strict';

    window.V3LessonEditorial.register('a1-v3', 12, lesson => ({
        ...lesson,
        expressions: [
            ...lesson.expressions,
            ['What about you?', 'E você?', 'Use depois de falar da sua preferência para devolver a conversa.', 'I like coffee. What about you?', 'Eu gosto de café. E você?']
        ],
        activitySections: [
            {
                eyebrow: 'Like or Don’t Like?',
                title: 'Expresse preferências positivas e negativas',
                instruction: 'Leia a informação entre parênteses e produza a frase completa sem acrescentar -s depois de I ou you.',
                items: [
                    ['Complete', 'I ___ music. (positive)', '', 'like'],
                    ['Complete', 'I ___ like loud music. (negative)', '', 'don’t'],
                    ['Choose', 'You (like / likes) movies.', '', 'like'],
                    ['Build', 'like / I / books / a lot', '', 'I like books a lot.'],
                    ['Build', 'don’t / I / soccer / like', '', 'I don’t like soccer.'],
                    ['Correct', 'I don’t likes tea.', '', 'I don’t like tea.'],
                    ['Correct', 'You likes coffee.', '', 'You like coffee.']
                ]
            },
            {
                eyebrow: 'Preference Card',
                title: 'Crie e compare um cartão de preferências',
                instruction: 'Responda como se estivesse preenchendo um perfil. Depois, reaja a cada preferência com um bloco social curto.',
                items: [
                    ['Describe', 'Music: positive preference.', '', 'I like music. / I like music a lot.'],
                    ['Describe', 'Sports: negative preference.', '', 'I don’t like soccer.'],
                    ['Answer', 'I like coffee.', '', 'Me too. / I like tea.'],
                    ['Answer', 'Books are my favorite.', '', 'Me too. / Movies are my favorite.'],
                    ['Say', 'I like music. Devolva a conversa.', '', 'I like music. What about you?']
                ]
            }
        ],
        conversation: {
            questions: [
                'Name three things you like.',
                'Name two things you don’t like.',
                'What is your favorite drink?',
                'What is your favorite: books, movies or music?',
                'Compare your preference with an imaginary profile.'
            ],
            support: ['I like...', 'I like... a lot.', 'I don’t like...', 'It’s my favorite.', 'What about you?']
        }
    }));
}());
