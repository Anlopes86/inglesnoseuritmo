(function () {
    'use strict';

    window.V3LessonEditorial.register('a2-v3', 1, data => ({
        ...data,
        title: 'Welcome Back! A Trip Abroad',
        bank: {
            ...data.bank,
            label: 'vacation greetings travel comparisons different from comparative than',
            matchLabel: 'vacation greetings travel comparisons different from comparative than',
            themes: [
                'a trip you took or would like to take',
                'a place that is different from your hometown',
                'welcoming someone back and asking about the experience'
            ],
            themeOptions: [
                'a trip you took or would like to take',
                'a place that is different from your hometown',
                'welcoming someone back and asking about the experience'
            ],
            objectives: [
                'greet someone who has returned from a trip',
                'ask natural follow-up questions about a vacation',
                'use different from and comparative adjectives with than',
                'describe a destination with clear details and reactions'
            ],
            introDialogue: [
                ['Carla', 'Hey, Ben! Welcome back! How was your trip?'],
                ['Ben', 'It was fantastic. Portugal was even more beautiful than I expected.'],
                ['Carla', 'Really? What was Lisbon like?'],
                ['Ben', 'It was lively and colorful, but it felt safer and more relaxed than my city.'],
                ['Carla', 'Was the food very different from the food here?'],
                ['Ben', 'Some dishes were different, but the seafood felt familiar.'],
                ['Carla', 'And what were the local people like?'],
                ['Ben', 'They were friendly and helpful. I had a great time talking to them.'],
                ['Carla', 'That sounds wonderful. I want to see your photos later.'],
                ['Ben', 'Of course. Let’s catch up after class.']
            ],
            vocab: [
                ['abroad', 'no exterior', 'This was my first vacation abroad.'],
                ['destination', 'destino', 'Lisbon was our final destination.'],
                ['flight', 'voo', 'The return flight was shorter than the first one.'],
                ['accommodation', 'hospedagem', 'Our accommodation was close to the old town.'],
                ['local', 'local; morador da região', 'A local showed us a quiet restaurant.'],
                ['crowded', 'lotado', 'The central square was more crowded at night.'],
                ['peaceful', 'tranquilo', 'The village was peaceful in the morning.'],
                ['familiar', 'familiar; conhecido', 'The music sounded familiar.'],
                ['unfamiliar', 'desconhecido; pouco familiar', 'The street names were unfamiliar at first.'],
                ['coastal', 'litorâneo; da costa', 'We stayed in a quiet coastal town.'],
                ['scenery', 'paisagem', 'The mountain scenery was unforgettable.']
            ],
            grammarTable: {
                title: 'Different from e comparações com than',
                headers: ['Objetivo', 'Estrutura', 'Exemplo'],
                rows: [
                    ['Mostrar diferença', 'A + be + different from + B', 'The food was different from ours.'],
                    ['Comparar adjetivo curto', 'adjective-er + than', 'The village was quieter than the city.'],
                    ['Comparar adjetivo longo', 'more + adjective + than', 'The coast was more beautiful than I expected.'],
                    ['Perguntar pela experiência', 'What + be + subject + like?', 'What was the hotel like?'],
                    ['Pedir mais informação', 'And what about...?', 'And what about the weather?']
                ]
            },
            grammar: [
                ['Different from', 'Use different from before the person, place, or thing you contrast with. Say “The climate is different from ours,” not “different that.”'],
                ['Comparative + than', 'Use -er with many short adjectives and more with longer adjectives. Than introduces the second item: quieter than, more comfortable than.'],
                ['What was it like?', 'Use What was...like? to ask for a description. It does not ask about preference; it invites details about the place or experience.']
            ],
            examples: [
                'The old town was different from the modern part of the city.',
                'Our room was smaller than the room in the photos.',
                'The train was more comfortable than the bus.',
                'The weather was warmer than I expected.',
                'What was the accommodation like?',
                'What were the local people like?'
            ],
            expressions: [
                ['Welcome back!', 'Bem-vindo(a) de volta!', 'Welcome back! We missed you.'],
                ['How was your trip?', 'Como foi sua viagem?', 'How was your trip to Portugal?'],
                ['What was it like?', 'Como era?; Como foi?', 'What was the old town like?'],
                ['have a great time', 'divertir-se muito; aproveitar bastante', 'We had a great time by the coast.'],
                ['get back', 'voltar; retornar', 'What time did you get back?'],
                ['catch up', 'colocar a conversa em dia', 'Let’s have coffee and catch up.'],
                ['nothing like', 'nada parecido com', 'The real beach was nothing like the photo.'],
                ['be worth a visit', 'valer uma visita', 'The small museum is worth a visit.']
            ],
            activitySections: [
                {
                    title: 'Construa comparações corretas',
                    instruction: 'Complete ou corrija cada frase. Depois leia a frase inteira em voz alta.',
                    items: [
                        { type: 'Complete', prompt: 'The coast was different ___ the countryside.', instruction: 'Complete com a preposição correta.', answer: 'The coast was different from the countryside.' },
                        { type: 'Complete', prompt: 'The return flight was ___ than the first flight. (short)', instruction: 'Use o comparativo do adjetivo entre parênteses.', answer: 'The return flight was shorter than the first flight.' },
                        { type: 'Complete', prompt: 'Our new accommodation was ___ than the old hotel. (comfortable)', instruction: 'Use more com o adjetivo longo.', answer: 'Our new accommodation was more comfortable than the old hotel.' },
                        { type: 'Correct', prompt: 'The village was more quiet than the capital.', instruction: 'Corrija a forma comparativa.', answer: 'The village was quieter than the capital.' },
                        { type: 'Correct', prompt: 'The food was different that ours.', instruction: 'Corrija a palavra usada depois de different.', answer: 'The food was different from ours.' },
                        { type: 'Unscramble', prompt: 'like / what / the local market / was / ?', instruction: 'Desembaralhe a pergunta.', answer: 'What was the local market like?' }
                    ]
                },
                {
                    title: 'Faça a conversa continuar',
                    instruction: 'Escolha ou produza a pergunta que pede exatamente o detalhe indicado.',
                    items: [
                        { type: 'Question', prompt: 'Ask for a general description of the hotel.', instruction: 'Use What was...like?', answer: 'What was the hotel like?' },
                        { type: 'Question', prompt: 'Ask whether the weather was different from the weather at home.', instruction: 'Use different from.', answer: 'Was the weather different from the weather at home?' },
                        { type: 'Follow-up', prompt: 'A friend says: “The city was amazing.” Ask about the local people.', instruction: 'Faça uma pergunta complementar natural.', answer: 'And what were the local people like?' },
                        { type: 'Expand', prompt: 'The village was peaceful.', instruction: 'Compare it with a crowded city using than.', answer: 'The village was more peaceful than the crowded city.' },
                        { type: 'Answer', prompt: '“Welcome back! How was your trip?”', instruction: 'Answer com uma reação e um detalhe.', answer: 'It was great! The scenery was more beautiful than I expected.' }
                    ]
                },
                {
                    title: 'Conte uma experiência completa',
                    instruction: 'Responda oralmente. Acrescente lugar, comparação e reação pessoal.',
                    items: [
                        { type: 'Personalize', prompt: 'Describe a place that was different from your hometown.', instruction: 'Use different from e explique uma diferença.', answer: 'The town was different from my hometown because it was smaller and more peaceful.' },
                        { type: 'Personalize', prompt: 'Compare two trips, cities, hotels, or means of transportation.', instruction: 'Use pelo menos duas comparações com than.', answer: 'The train trip was faster than the bus trip, and the seats were more comfortable.' },
                        { type: 'Role-play', prompt: 'You have just returned from a trip. Answer four follow-up questions from the interviewer.', instruction: 'Não memorize. Responda e desenvolva cada informação.', answer: 'Possible questions: How was your trip? What was the place like? What was different from home? What was the best part?' }
                    ]
                }
            ],
            translations: [
                { pt: 'Bem-vindo de volta! Como foi sua viagem?', en: 'Welcome back! How was your trip?' },
                { pt: 'Como era a cidade antiga?', en: 'What was the old town like?' },
                { pt: 'O clima era diferente do nosso.', en: 'The climate was different from ours.' },
                { pt: 'O vilarejo era mais tranquilo que a capital.', en: 'The village was quieter than the capital.' },
                { pt: 'O trem era mais confortável que o ônibus.', en: 'The train was more comfortable than the bus.' },
                { pt: 'Nós aproveitamos muito a viagem.', en: 'We had a great time on the trip.' },
                { pt: 'Que horas vocês voltaram?', en: 'What time did you get back?' },
                { pt: 'O museu pequeno vale uma visita.', en: 'The small museum is worth a visit.' }
            ],
            expressionTranslations: [
                { pt: 'Bem-vinda de volta! Sentimos sua falta.', en: 'Welcome back! We missed you.' },
                { pt: 'Como foi sua viagem ao exterior?', en: 'How was your trip abroad?' },
                { pt: 'Como era a hospedagem?', en: 'What was the accommodation like?' },
                { pt: 'Nós nos divertimos muito na praia.', en: 'We had a great time at the beach.' },
                { pt: 'Eu voltei no domingo à noite.', en: 'I got back on Sunday night.' },
                { pt: 'Vamos colocar a conversa em dia depois da aula.', en: 'Let’s catch up after class.' },
                { pt: 'O lugar não era nada parecido com as fotos.', en: 'The place was nothing like the photos.' },
                { pt: 'A região histórica vale uma visita.', en: 'The historic area is worth a visit.' }
            ],
            dialogues: [
                [
                    ['Friend', 'Welcome back! How was your trip to Chile?'],
                    ['Traveler', 'It was wonderful, but it was colder than I expected.'],
                    ['Friend', 'What was Santiago like?'],
                    ['Traveler', 'It was busier than my city, but public transportation was more efficient.'],
                    ['Friend', 'Was the food very different from Brazilian food?'],
                    ['Traveler', 'Some dishes were different, but I loved the seafood.'],
                    ['Friend', 'I want to hear more. Let’s catch up this weekend.'],
                    ['Traveler', 'Great. I’ll show you my photos too.']
                ],
                [
                    ['Guest', 'Excuse me, is this your first time here?'],
                    ['Visitor', 'Yes, it is. I arrived yesterday afternoon.'],
                    ['Guest', 'What is the neighborhood like?'],
                    ['Visitor', 'It is quieter than downtown and the streets are less crowded.'],
                    ['Guest', 'Is it very different from your hometown?'],
                    ['Visitor', 'Yes. My hometown is smaller and much drier.'],
                    ['Guest', 'The park near the river is worth a visit.'],
                    ['Visitor', 'Thanks for the recommendation.']
                ],
                [
                    ['Coworker', 'How was the conference abroad?'],
                    ['You', 'The event was better organized than last year.'],
                    ['Coworker', 'And what was the accommodation like?'],
                    ['You', 'The room was small, but it was more comfortable than it looked online.'],
                    ['Coworker', 'Did you have time to explore the city?'],
                    ['You', 'A little. A local took us to a market near the river.']
                ],
                [
                    ['Host', 'Hi! You must be Daniel. Welcome to Vancouver.'],
                    ['Daniel', 'Thank you. It’s nice to finally meet you.'],
                    ['Host', 'How was the flight?'],
                    ['Daniel', 'Long, but the second flight was more comfortable than the first.'],
                    ['Host', 'Are you hungry or would you like to rest first?'],
                    ['Daniel', 'I’d like to leave my bag in the room, and then we can eat.'],
                    ['Host', 'Perfect. Make yourself at home.'],
                    ['Daniel', 'Thanks. This already feels very welcoming.']
                ]
            ],
            readingTitle: 'A Different Kind of Vacation',
            reading: 'When Júlia visited a small coastal town in Uruguay, she expected a busy beach vacation. The experience was different from her plan. Her accommodation was farther from the center than the website suggested, and the town was much quieter than the cities she usually visited. At first, Júlia felt disappointed. There were fewer restaurants, the streets became empty early, and the weather was warmer than she expected. On her second morning, however, a local recommended a walking trail above the beach. The scenery was more impressive than anything Júlia had seen on the travel websites. Later, she talked to two shop owners, tried a regional dish, and spent the afternoon reading near the water. By the end of the trip, the quiet town no longer felt boring. It felt peaceful. When Júlia got back, her friends asked, “What was it like?” She told them that the vacation was nothing like her original plan, but that was exactly why it was memorable.',
            readingQuestions: [
                { question: 'What kind of vacation did Júlia expect?', answer: 'She expected a busy beach vacation.' },
                { question: 'How was the location of her accommodation different from the website?', answer: 'It was farther from the center than the website suggested.' },
                { question: 'Why did Júlia feel disappointed at first?', answer: 'The town was very quiet, had fewer restaurants, and became empty early.' },
                { question: 'What changed her opinion of the town?', answer: 'A local recommended a walking trail with impressive scenery.' },
                { question: 'Which activities did she do later?', answer: 'She talked to shop owners, tried a regional dish, and read near the water.' },
                { question: 'How did she describe the town at the end?', answer: 'She described it as peaceful, not boring.' },
                { question: 'Why was the vacation memorable?', answer: 'It was different from her original plan and gave her an unexpected experience.' }
            ],
            guidedConversation: {
                questions: [
                    'How do you usually greet a friend who has just returned from a trip?',
                    'What questions can you ask to keep the conversation going?',
                    'Which destination is very different from your hometown? Why?',
                    'Do you prefer a crowded city or a peaceful town on vacation?',
                    'Which is more important: comfortable accommodation or a good location?',
                    'Describe a trip that was better or worse than you expected.',
                    'Recommend one place that is worth a visit and explain why.'
                ],
                support: ['Welcome back!', 'How was...?', 'What was...like?', 'different from', 'quieter than', 'more...than', 'worth a visit']
            },
            homework: [
                { icon: 'fas fa-route', title: 'Escolha um destino', instruction: 'Escolha uma cidade que você conhece ou gostaria de conhecer. Anote cinco informações úteis sobre ela.' },
                { icon: 'fas fa-balance-scale', title: 'Faça comparações', instruction: 'Escreva seis frases comparando o destino com sua cidade. Use different from, dois comparativos curtos e dois comparativos longos.', model: 'The city is different from mine. It is larger than my city, but public transportation is more efficient.' },
                { icon: 'fas fa-comments', title: 'Prepare perguntas', instruction: 'Escreva quatro perguntas naturais para alguém que voltou desse destino.' },
                { icon: 'fas fa-microphone', title: 'Grave sua resposta', instruction: 'Faça um áudio de 60 a 90 segundos respondendo às perguntas sem ler um texto completo.' },
                { icon: 'fas fa-redo', title: 'Segunda tentativa', instruction: 'Ouça a gravação, escolha um ponto para melhorar e grave novamente.' }
            ]
        }
    }));
}());
