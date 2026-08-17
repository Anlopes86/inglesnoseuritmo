(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { v, x, p, t, line, dialogue, question, reading, activity, homework } = R.helpers;

    R.register(7, R.lesson({
        title: 'Let’s Go Out!',
        objectives: [
            'Compreender a estrutura do Present Simple com I, you, we e they.',
            'Formar afirmativas com verbo base e negativas com don’t.',
            'Formar perguntas com do e produzir respostas curtas.',
            'Falar de trabalho, estudo, gostos e hábitos de lazer.',
            'Usar convites como Let’s... depois da base gramatical.'
        ],
        intro: [
            line('Sarah', 'Do you work on Saturdays?', 'Você trabalha aos sábados?'),
            line('Emma', 'No, I don’t. I study in the morning.', 'Não. Eu estudo de manhã.'),
            line('Sarah', 'Do you like movies?', 'Você gosta de filmes?'),
            line('Emma', 'Yes, I do. We usually go out on Saturday nights.', 'Sim. Nós geralmente saímos nas noites de sábado.'),
            line('Sarah', 'Great. We have time tonight.', 'Ótimo. Nós temos tempo hoje à noite.'),
            line('Emma', 'Let’s meet at the movie theater at eight.', 'Vamos nos encontrar no cinema às oito.'),
            line('Sarah', 'Perfect. See you at eight.', 'Perfeito. Vejo você às oito.')
        ],
        vocab: [
            v('work', 'trabalhar', 'Do you work on Saturdays?', 'Você trabalha aos sábados?'),
            v('study', 'estudar', 'I study in the morning.', 'Eu estudo de manhã.'),
            v('like', 'gostar', 'We like movies.', 'Nós gostamos de filmes.'),
            v('have', 'ter', 'We have time tonight.', 'Nós temos tempo hoje à noite.'),
            v('want', 'querer', 'Do you want coffee?', 'Você quer café?'),
            v('go out', 'sair', 'We go out on Saturdays.', 'Nós saímos aos sábados.'),
            v('meet', 'encontrar-se', 'We meet at eight.', 'Nós nos encontramos às oito.'),
            v('movie theater', 'cinema', 'We meet at the movie theater.', 'Nós nos encontramos no cinema.'),
            v('restaurant', 'restaurante', 'They go to a restaurant.', 'Eles vão a um restaurante.'),
            v('café', 'cafeteria', 'We meet at the café.', 'Nós nos encontramos na cafeteria.'),
            v('park', 'parque', 'They like the park.', 'Eles gostam do parque.'),
            v('mall', 'shopping center', 'We go to the mall.', 'Nós vamos ao shopping.'),
            v('movie', 'filme', 'Do you like movies?', 'Você gosta de filmes?'),
            v('tonight', 'hoje à noite', 'We have time tonight.', 'Nós temos tempo hoje à noite.'),
            v('weekday', 'dia de semana', 'I work on weekdays.', 'Eu trabalho nos dias de semana.'),
            v('weekend', 'fim de semana', 'We go out on weekends.', 'Nós saímos nos fins de semana.'),
            v('free', 'livre; disponível', 'I’m free tonight.', 'Estou livre hoje à noite.'),
            v('busy', 'ocupado(a)', 'You’re busy today.', 'Você está ocupado hoje.')
        ],
        grammar: {
            title: 'Present Simple com I, you, we e they',
            summary: 'Use o verbo na forma base na afirmativa. Use don’t antes do verbo para negar e do antes do sujeito para perguntar.',
            spotlight: {
                formula: [
                    { text: 'SUBJECT', tone: 'blue' },
                    { text: 'DO / DON’T', tone: 'red' },
                    { text: 'BASE VERB', tone: 'green' }
                ],
                panels: [
                    { label: 'Forma afirmativa', tone: 'green', pattern: 'I / YOU / WE / THEY + VERB', examples: ['I work on weekdays.', 'We like movies.'] },
                    { label: 'Forma negativa', tone: 'red', pattern: 'I / YOU / WE / THEY + DON’T + VERB', examples: ['I don’t work on Saturdays.', 'They don’t like coffee.'] },
                    { label: 'Forma interrogativa', tone: 'yellow', pattern: 'DO + I / YOU / WE / THEY + VERB?', examples: ['Do you study at night?', 'Do they go out?'] }
                ],
                important: {
                    title: 'Importante',
                    text: 'Depois de do ou don’t, use sempre o verbo na forma base: Do you work?; I don’t work.'
                },
                contrast: {
                    title: 'Atenção',
                    correct: 'Do you work here?',
                    incorrect: 'Do you works here?'
                }
            },
            rows: [
                ['afirmativa', 'I/You/We/They + base verb', 'We like movies.', 'Nós gostamos de filmes.'],
                ['negativa', 'I/You/We/They + don’t + base verb', 'I don’t work on Saturdays.', 'Eu não trabalho aos sábados.'],
                ['pergunta', 'Do + I/you/we/they + base verb?', 'Do you study at night?', 'Você estuda à noite?'],
                ['resposta positiva', 'Yes, + subject + do.', 'Yes, I do.', 'Sim.'],
                ['resposta negativa', 'No, + subject + don’t.', 'No, we don’t.', 'Não.'],
                ['frequência', 'usually + base verb', 'We usually go out on Saturdays.', 'Nós geralmente saímos aos sábados.']
            ],
            notes: [
                'I, you, we e they usam a mesma forma base: work, study, like, have, want, go e meet.',
                'Do inicia a pergunta; don’t forma a negativa. Não use am/is/are com esses verbos.',
                'O -s da terceira pessoa ainda não entra nesta aula; ele será apresentado com he e she mais adiante.'
            ]
        },
        activitySections: [
            activity('Afirmativa ou negativa?', 'Complete com o verbo base ou com don’t + verbo.', [
                p('Complete', 'I ___ on weekdays. (work)', 'work'),
                p('Complete', 'We ___ movies. (like)', 'like'),
                p('Complete', 'They ___ time tonight. (have)', 'have'),
                p('Complete', 'I ___ work on Saturdays.', 'don’t'),
                p('Complete', 'We ___ like that restaurant.', 'don’t'),
                p('Build', 'study / I / at night', 'I study at night.'),
                p('Build', 'don’t / They / go out / on weekdays', 'They don’t go out on weekdays.'),
                p('Correct', 'We likes movies.', 'We like movies.')
            ], 'Present Simple · Statements'),
            activity('Perguntas e respostas com do', 'Coloque do no início e mantenha o verbo principal na forma base.', [
                p('Complete', '___ you work on Saturdays?', 'Do'),
                p('Complete', 'Do they ___ movies?', 'like'),
                p('Build', 'you / Do / at night / study / ?', 'Do you study at night?'),
                p('Build', 'they / Do / go out / ?', 'Do they go out?'),
                p('Answer', 'Do you like movies? Positive short answer.', 'Yes, I do.'),
                p('Answer', 'Do you work on Sundays? Negative short answer.', 'No, I don’t.'),
                p('Correct', 'Do you works here?', 'Do you work here?'),
                p('Correct', 'You don’t works on Saturdays.', 'You don’t work on Saturdays.')
            ], 'Present Simple · Questions'),
            activity('Hábitos e lazer', 'Use as estruturas já montadas para reconhecer tempo e frequência.', [
                p('Complete', 'I work ___ weekdays.', 'on'),
                p('Complete', 'We go out ___ weekends.', 'on'),
                p('Complete', 'I study ___ the morning.', 'in'),
                p('Complete', 'We meet ___ eight.', 'at'),
                p('Choose', 'We (usually / are) go out on Saturdays.', 'usually'),
                p('Build', 'usually / We / go out / on Saturdays', 'We usually go out on Saturdays.'),
                p('Complete', 'Let’s ___ at the café.', 'meet'),
                p('Complete', 'See you ___ eight.', 'at')
            ], 'Time Expressions')
        ],
        translations: [
            t('Eu trabalho nos dias de semana.', 'I work on weekdays.'),
            t('Você estuda de manhã.', 'You study in the morning.'),
            t('Nós gostamos de filmes.', 'We like movies.'),
            t('Eles têm tempo hoje à noite.', 'They have time tonight.'),
            t('Eu não trabalho aos sábados.', 'I don’t work on Saturdays.'),
            t('Nós não saímos nos dias de semana.', 'We don’t go out on weekdays.'),
            t('Você trabalha aos domingos?', 'Do you work on Sundays?'),
            t('Eles gostam de filmes?', 'Do they like movies?'),
            t('Sim, gosto.', 'Yes, I do.'),
            t('Não, nós não gostamos.', 'No, we don’t.'),
            t('Nós geralmente saímos aos sábados.', 'We usually go out on Saturdays.'),
            t('Vamos nos encontrar às oito.', 'Let’s meet at eight.')
        ],
        expressions: [
            x('Do you work...?', 'Você trabalha...?', 'Primeiro modelo de pergunta no Present Simple.', 'Do you work on Saturdays?', 'Você trabalha aos sábados?'),
            x('Do you study...?', 'Você estuda...?', 'Use do + you + verbo base.', 'Do you study at night?', 'Você estuda à noite?'),
            x('Do you like...?', 'Você gosta de...?', 'Use com substantivo depois de like.', 'Do you like movies?', 'Você gosta de filmes?'),
            x('Yes, I do. / No, I don’t.', 'Sim. / Não.', 'Respostas curtas para perguntas iniciadas por do.', 'Do you work here? — Yes, I do.', 'Você trabalha aqui? — Sim.'),
            x('I don’t...', 'Eu não...', 'Use don’t antes do verbo base.', 'I don’t work on Sundays.', 'Eu não trabalho aos domingos.'),
            x('We usually...', 'Nós geralmente...', 'Usually aparece antes do verbo principal.', 'We usually go out on Saturdays.', 'Nós geralmente saímos aos sábados.'),
            x('on weekdays/weekends', 'nos dias de semana/fins de semana', 'Use on como parte do bloco de tempo.', 'I work on weekdays.', 'Eu trabalho nos dias de semana.'),
            x('in the morning/afternoon/evening', 'de manhã/tarde/noite', 'Use in antes dessas partes do dia.', 'I study in the evening.', 'Eu estudo à noite.'),
            x('at night / at eight', 'à noite / às oito', 'Use at com night e com horários exatos.', 'We meet at eight.', 'Nós nos encontramos às oito.'),
            x('Let’s...', 'Vamos...', 'Depois de Let’s, use o verbo na forma base sem to.', 'Let’s meet at the café.', 'Vamos nos encontrar na cafeteria.'),
            x('See you at...', 'Vejo você às...', 'Use at antes do horário.', 'See you at eight.', 'Vejo você às oito.')
        ],
        dialogues: [
            dialogue('Work', line('A', 'Do you work on Saturdays?', 'Você trabalha aos sábados?'), line('B', 'No, I don’t.', 'Não.')),
            dialogue('Study', line('A', 'Do you study at night?', 'Você estuda à noite?'), line('B', 'Yes, I do.', 'Sim.')),
            dialogue('Movies', line('A', 'Do you like movies?', 'Você gosta de filmes?'), line('B', 'Yes, I do. I like comedies.', 'Sim. Eu gosto de comédias.')),
            dialogue('Weekend habit', line('A', 'What do you do on weekends?', 'O que você faz nos fins de semana?'), line('B', 'We usually go out.', 'Nós geralmente saímos.')),
            dialogue('A simple plan', line('A', 'Let’s meet at the movie theater.', 'Vamos nos encontrar no cinema.'), line('B', 'Great. See you at eight.', 'Ótimo. Vejo você às oito.'))
        ],
        reading: reading(
            'Our Saturday routine',
            'I work on weekdays, but I don’t work on Saturdays. My friends and I like movies. We usually go out on Saturday nights. We meet at the movie theater at eight. Do we have time for coffee? Yes, we do. We have coffee before the movie.',
            question('Do I work on Saturdays?', 'No, I don’t.'),
            question('What do we like?', 'We like movies.'),
            question('When do we usually go out?', 'We usually go out on Saturday nights.'),
            question('Where do we meet?', 'We meet at the movie theater.'),
            question('What time do we meet?', 'We meet at eight.'),
            question('Do we have coffee?', 'Yes, we do.')
        ),
        conversation: {
            questions: ['Do you work on Saturdays?', 'Do you study at night?', 'Do you like movies?', 'What do you do on weekends?', 'Do you usually go out?'],
            support: ['I work...', 'I don’t work...', 'Do you...?', 'Yes, I do. / No, I don’t.', 'We usually...', 'Let’s...']
        },
        homework: homework(
            'Complete uma rotina-modelo usando as estruturas da aula.',
            ['Dias de trabalho e estudo', 'Gostos', 'Um hábito de fim de semana'],
            ['Usei duas afirmativas.', 'Usei uma negativa com don’t.', 'Usei uma pergunta com do e uma resposta curta.']
        )
    }));
}());
