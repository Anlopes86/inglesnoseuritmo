(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { v, x, p, t, line, dialogue, question, reading, activity, homework } = R.helpers;

    R.register(7, R.lesson({
        title: 'Let’s Go Out!',
        objectives: ['Convidar alguém para uma atividade simples.', 'Fazer sugestões com Let’s e How about...?', 'Aceitar, recusar e oferecer uma alternativa com educação.', 'Combinar lugar, dia e horário usando blocos frequentes.'],
        intro: [
            line('Sarah', 'Would you like to go out tonight?', 'Você gostaria de sair hoje à noite?'),
            line('Emma', 'Sure. How about a movie?', 'Claro. Que tal um filme?'),
            line('Sarah', 'That sounds great. Let’s meet at seven.', 'Parece ótimo. Vamos nos encontrar às sete.'),
            line('Emma', 'Sorry, I’m busy at seven. Is eight okay?', 'Desculpe, estou ocupada às sete. Oito está bom?'),
            line('Sarah', 'Yes, perfect. See you at eight.', 'Sim, perfeito. Vejo você às oito.'),
            line('Emma', 'See you!', 'Até!')
        ],
        vocab: [
            v('go out', 'sair', 'Would you like to go out?', 'Você gostaria de sair?'),
            v('movie theater', 'cinema', 'Let’s go to the movie theater.', 'Vamos ao cinema.'),
            v('restaurant', 'restaurante', 'The restaurant is open.', 'O restaurante está aberto.'),
            v('café', 'cafeteria', 'How about the new café?', 'Que tal a nova cafeteria?'),
            v('park', 'parque', 'Let’s meet at the park.', 'Vamos nos encontrar no parque.'),
            v('mall', 'shopping center', 'They are at the mall.', 'Eles estão no shopping.'),
            v('movie', 'filme', 'How about a movie?', 'Que tal um filme?'),
            v('dinner', 'jantar', 'Would you like to have dinner?', 'Você gostaria de jantar?'),
            v('tonight', 'hoje à noite', 'Are you free tonight?', 'Você está livre hoje à noite?'),
            v('tomorrow', 'amanhã', 'How about tomorrow?', 'Que tal amanhã?'),
            v('free', 'livre; disponível', 'I’m free after class.', 'Estou livre depois da aula.'),
            v('busy', 'ocupado(a)', 'I’m busy at seven.', 'Estou ocupada às sete.'),
            v('meet', 'encontrar-se', 'Let’s meet at eight.', 'Vamos nos encontrar às oito.'),
            v('plan', 'plano', 'That is a good plan.', 'Esse é um bom plano.')
        ],
        grammar: {
            title: 'Convites e sugestões como blocos',
            summary: 'Use estas expressões prontas para propor uma atividade. O verbo permanece na forma básica depois de to ou Let’s.',
            rows: [
                ['convite', 'Would you like to + verb?', 'Would you like to go out?', 'Você gostaria de sair?'],
                ['convite direto', 'Do you want to + verb?', 'Do you want to see a movie?', 'Você quer ver um filme?'],
                ['sugestão', 'Let’s + verb', 'Let’s meet at eight.', 'Vamos nos encontrar às oito.'],
                ['alternativa', 'How about + noun/time?', 'How about tomorrow?', 'Que tal amanhã?'],
                ['confirmação', 'Is + time/place + okay?', 'Is eight okay?', 'Oito está bom?']
            ],
            notes: ['Não use to depois de Let’s: Let’s go, não Let’s to go.', 'Aceite com Sure, Great ou That sounds good.', 'Ao recusar, use Sorry e ofereça outra opção quando possível.']
        },
        activitySections: [
            activity('Lugares, atividades e horários', 'Relacione cada sugestão a uma continuação natural.', [
                p('Match', 'movie · dinner · park · café → have · go to the · see a · meet at the', 'see a movie; have dinner; meet at the park; go to the café'),
                p('Complete', 'Would you like to see a ___?', 'movie'),
                p('Complete', 'Let’s have ___ at seven.', 'dinner'),
                p('Complete', 'How about the new ___?', 'café'),
                p('Choose', 'I’m (free / busy) = I can go.', 'free'),
                p('Choose', 'I’m (free / busy) = I cannot go at that time.', 'busy'),
                p('Answer', 'Choose one place for tonight.', 'A possible answer: the movie theater.'),
                p('Describe', 'Plan: park · tomorrow · 4:00', 'Let’s meet at the park tomorrow at four.')
            ], 'Vocabulary Practice'),
            activity('Forme convites e sugestões', 'Use a estrutura indicada e mantenha o verbo na forma básica.', [
                p('Build', 'like / Would / go out / to / you / ?', 'Would you like to go out?'),
                p('Build', 'movie / Let’s / a / see', 'Let’s see a movie.'),
                p('Build', 'tomorrow / about / How / ?', 'How about tomorrow?'),
                p('Build', 'eight / Is / okay / ?', 'Is eight okay?'),
                p('Complete', 'Do you want ___ have dinner?', 'to'),
                p('Complete', 'Let’s ___ at the café.', 'meet'),
                p('Correct', 'Let’s to see a movie.', 'Let’s see a movie.'),
                p('Correct', 'Would you like go out?', 'Would you like to go out?'),
                p('Transform', 'Let’s have dinner. → invitation', 'Would you like to have dinner?'),
                p('Transform', 'Would you like to go tonight? → direct invitation', 'Do you want to go tonight?')
            ]),
            activity('Aceite, recuse ou mude o plano', 'Responda de acordo com a condição e acrescente lugar ou horário quando necessário.', [
                p('Answer', 'Would you like to see a movie? Accept.', 'Sure. That sounds great.'),
                p('Answer', 'Would you like to have dinner? Accept and choose 8:00.', 'Yes, great. Let’s meet at eight.'),
                p('Answer', 'Are you free tonight? You are busy.', 'Sorry, I’m busy tonight.'),
                p('Answer', 'You cannot meet at seven. Offer eight.', 'Sorry, I’m busy at seven. How about eight?'),
                p('Answer', 'How about the mall? You prefer the park.', 'How about the park?'),
                p('Complete', 'That ___ great.', 'sounds'),
                p('Complete', 'Yes, ___. See you at eight.', 'perfect'),
                p('Correct', 'Sorry, I free tonight.', 'Sorry, I’m not free tonight. / Sorry, I’m busy tonight.'),
                p('Create', 'Invite someone to a café tomorrow.', 'Would you like to go to a café tomorrow?'),
                p('Create', 'Accept and confirm a time.', 'Sure. Let’s meet at ...')
            ], 'Conversation Choices')
        ],
        translations: [
            t('Você gostaria de sair hoje à noite?', 'Would you like to go out tonight?'), t('Você quer ver um filme?', 'Do you want to see a movie?'),
            t('Vamos jantar.', 'Let’s have dinner.'), t('Que tal amanhã?', 'How about tomorrow?'),
            t('Parece ótimo.', 'That sounds great.'), t('Estou livre às oito.', 'I’m free at eight.'),
            t('Desculpe, estou ocupada hoje à noite.', 'Sorry, I’m busy tonight.'), t('Oito está bom?', 'Is eight okay?'),
            t('Vamos nos encontrar no parque.', 'Let’s meet at the park.'), t('Vejo você amanhã.', 'See you tomorrow.')
        ],
        expressions: [
            x('Would you like to...?', 'Você gostaria de...?', 'Convite educado.', 'Would you like to have dinner?', 'Você gostaria de jantar?'),
            x('Do you want to...?', 'Você quer...?', 'Convite direto e comum entre pessoas conhecidas.', 'Do you want to see a movie?', 'Você quer ver um filme?'),
            x('Let’s...', 'Vamos...', 'Sugestão que inclui quem fala.', 'Let’s meet at the café.', 'Vamos nos encontrar na cafeteria.'),
            x('How about...?', 'Que tal...?', 'Use para oferecer alternativa de lugar ou horário.', 'How about tomorrow?', 'Que tal amanhã?'),
            x('That sounds great/good.', 'Parece ótimo/bom.', 'Aceitação positiva.', 'A movie? That sounds great.', 'Um filme? Parece ótimo.'),
            x('Sorry, I’m busy.', 'Desculpe, estou ocupado(a).', 'Recusa curta e educada.', 'Sorry, I’m busy tonight.', 'Desculpe, estou ocupada hoje à noite.'),
            x('Is ... okay?', '... está bom?', 'Confirma uma opção.', 'Is seven okay?', 'Sete está bom?'),
            x('See you at...', 'Vejo você às...', 'Confirma o encontro.', 'See you at eight.', 'Vejo você às oito.'),
            x('Maybe another day.', 'Talvez outro dia.', 'Recusa sem definir uma nova data.', 'Sorry. Maybe another day.', 'Desculpe. Talvez outro dia.')
        ],
        dialogues: [
            dialogue('A movie', line('A', 'Would you like to see a movie?', 'Você gostaria de ver um filme?'), line('B', 'Sure. That sounds great.', 'Claro. Parece ótimo.'), line('A', 'Let’s meet at seven.', 'Vamos nos encontrar às sete.')),
            dialogue('A different time', line('A', 'Is seven okay?', 'Sete está bom?'), line('B', 'Sorry, I’m busy at seven. How about eight?', 'Desculpe, estou ocupado às sete. Que tal oito?'), line('A', 'Perfect.', 'Perfeito.')),
            dialogue('Dinner', line('A', 'Do you want to have dinner tonight?', 'Você quer jantar hoje?'), line('B', 'Yes. How about the new restaurant?', 'Sim. Que tal o restaurante novo?'), line('A', 'Good idea.', 'Boa ideia.')),
            dialogue('Not tonight', line('A', 'Would you like to go out tonight?', 'Você gostaria de sair hoje?'), line('B', 'Sorry, I’m busy. Maybe tomorrow?', 'Desculpe, estou ocupado. Talvez amanhã?'), line('A', 'Yes, tomorrow is good.', 'Sim, amanhã está bom.')),
            dialogue('At the park', line('A', 'Let’s meet at the park.', 'Vamos nos encontrar no parque.'), line('B', 'Sure. Is four okay?', 'Claro. Quatro está bom?'), line('A', 'Yes. See you at four.', 'Sim. Vejo você às quatro.'))
        ],
        reading: reading('Three invitations', 'Sarah wants to see a movie tonight. Emma is busy at seven, but she is free at eight. Daniel wants to have dinner tomorrow. Mateo is not free tomorrow, so they plan dinner on Friday. Olivia wants to meet at the park on Saturday afternoon.',
            question('What does Sarah want to do?', 'She wants to see a movie.'), question('When is Emma free?', 'She is free at eight.'), question('What does Daniel want to do?', 'He wants to have dinner.'), question('Is Mateo free tomorrow?', 'No, he is not.'), question('Where does Olivia want to meet?', 'She wants to meet at the park.')),
        conversation: { questions: ['Are you free tonight?', 'Would you like to see a movie?', 'Invite the teacher to a café.', 'Suggest a place with Let’s.', 'Offer a different day with How about...?', 'Accept one invitation.', 'Refuse one invitation and give an alternative.', 'Create a complete plan with activity, place and time.'], support: ['Would you like to...?', 'Let’s...', 'How about...?', 'That sounds great.', 'Sorry, I’m busy.', 'Is ... okay?'] },
        homework: homework('Prepare três convites com respostas diferentes.', ['Um filme hoje à noite', 'Um encontro em uma cafeteria', 'Um plano que precisa mudar de horário'], ['Usei Would you like to, Let’s e How about.', 'Incluí aceitação e recusa educada.', 'Cada plano tem atividade, lugar ou horário.']),
        mission: { title: 'Make a plan', task: 'Convide alguém, negocie uma mudança de horário e finalize com um plano claro.', focus: ['convite completo', 'aceitação ou recusa', 'plano confirmado'] }
    }));
}());
