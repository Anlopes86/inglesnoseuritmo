(function () {
    'use strict';

    window.V3LessonEditorial.register('a2-v3', 2, data => ({
        ...data,
        title: 'Vacation Weather and Activities',
        bank: {
            ...data.bank,
            label: 'vacation weather activities enjoy like love hate ing',
            matchLabel: 'vacation weather activities enjoy like love hate ing',
            themes: [
                'your ideal vacation weather and activities',
                'a vacation plan that changes because of the forecast',
                'activities you enjoy doing in different seasons'
            ],
            themeOptions: [
                'your ideal vacation weather and activities',
                'a vacation plan that changes because of the forecast',
                'activities you enjoy doing in different seasons'
            ],
            objectives: [
                'understand and describe common weather conditions',
                'ask about vacation preferences and give developed answers',
                'use enjoy, like, love, and hate followed by verb-ing',
                'adapt a simple vacation plan to a weather forecast'
            ],
            introDialogue: [
                ['Lena', 'Have you checked the forecast for our beach weekend?'],
                ['Marco', 'Yes. Friday will be sunny, but there may be heavy showers on Saturday.'],
                ['Lena', 'That’s disappointing. I love swimming and spending the day outside.'],
                ['Marco', 'Me too, but I don’t enjoy sitting on the beach in strong wind.'],
                ['Lena', 'What do you enjoy doing when the weather is rainy?'],
                ['Marco', 'I like visiting local markets and trying new food.'],
                ['Lena', 'Good idea. We can go to the beach on Friday and explore the town on Saturday.'],
                ['Marco', 'Exactly. The weather may change, but the trip can still be fun.'],
                ['Lena', 'Should I pack a jacket as well as my swimsuit?'],
                ['Marco', 'Definitely. The temperature drops quickly in the evening.']
            ],
            vocab: [
                ['forecast', 'previsão do tempo', 'The forecast says it will rain in the afternoon.'],
                ['sunny', 'ensolarado', 'It was sunny during most of the trip.'],
                ['cloudy', 'nublado', 'The morning was cloudy but warm.'],
                ['windy', 'com vento; ventoso', 'It is too windy to sit outside.'],
                ['foggy', 'com neblina; nebuloso', 'The road becomes dangerous when it is foggy.'],
                ['stormy', 'tempestuoso', 'The sea is rough in stormy weather.'],
                ['mild', 'ameno', 'Spring is usually mild in this region.'],
                ['freezing', 'congelante; muito frio', 'It was freezing at the top of the mountain.'],
                ['humid', 'úmido', 'Hot and humid weather makes me tired.'],
                ['shower', 'pancada de chuva', 'There may be a short shower after lunch.'],
                ['heat wave', 'onda de calor', 'The city is preparing for a heat wave.'],
                ['temperature', 'temperatura', 'The temperature drops at night.'],
                ['sunscreen', 'protetor solar', 'Take sunscreen even on a cloudy day.']
            ],
            grammarTable: {
                title: 'Preferências: enjoy, like, love e hate + verb-ing',
                headers: ['Função', 'Estrutura', 'Exemplo'],
                rows: [
                    ['Preferência positiva', 'subject + enjoy/like/love + verb-ing', 'I enjoy walking by the beach.'],
                    ['Preferência negativa', 'subject + do not enjoy/like + verb-ing', 'I do not enjoy traveling in extreme heat.'],
                    ['Pergunta', 'Do + subject + enjoy/like + verb-ing?', 'Do you enjoy hiking in cold weather?'],
                    ['Preferência forte', 'love/hate + verb-ing', 'She hates waiting inside the hotel.'],
                    ['Clima + atividade', 'weather condition + because/so + choice', 'It is windy, so we are staying indoors.']
                ]
            },
            grammar: [
                ['Verb + -ing', 'After enjoy, the next verb takes -ing: enjoy swimming. Like, love, and hate also commonly take -ing when you talk about activities in general.'],
                ['Questions about preferences', 'Use Do you enjoy/like + verb-ing? Give more than yes or no: add a reason, condition, or example.'],
                ['Weather and choices', 'Describe weather with It is + adjective. Then connect it to a choice with because or so: It is stormy, so we are staying indoors.']
            ],
            examples: [
                'I enjoy exploring small towns on vacation.',
                'She loves taking photos when the sky is clear.',
                'We do not like driving in foggy weather.',
                'Do you enjoy hiking when it is cold?',
                'It is humid, so we are going out later.',
                'I packed a jacket because the temperature drops at night.'
            ],
            expressions: [
                ['check the forecast', 'verificar a previsão do tempo', 'Check the forecast before you pack.'],
                ['clear up', 'abrir; melhorar, falando do tempo', 'The sky may clear up after lunch.'],
                ['cool down', 'esfriar; refrescar', 'It usually cools down in the evening.'],
                ['warm up', 'esquentar', 'The weather will warm up by midday.'],
                ['get caught in the rain', 'ser pego pela chuva', 'We got caught in the rain near the station.'],
                ['stay indoors', 'ficar em ambiente fechado', 'We stayed indoors during the storm.'],
                ['pack light', 'viajar com pouca bagagem', 'I prefer packing light for short trips.'],
                ['make the most of', 'aproveitar ao máximo', 'We made the most of the sunny morning.']
            ],
            activitySections: [
                {
                    title: 'Reconheça o clima na situação',
                    instruction: 'Leia cada pista e escolha a palavra de clima que comunica melhor a situação.',
                    items: [
                        { type: 'Identify', prompt: 'You cannot see the road clearly because of low clouds near the ground.', instruction: 'Diga a condição do tempo em uma palavra.', answer: 'It is foggy.' },
                        { type: 'Identify', prompt: 'The sun is shining and there are almost no clouds.', instruction: 'Diga a condição do tempo em uma palavra.', answer: 'It is sunny.' },
                        { type: 'Identify', prompt: 'There is thunder, strong rain, and dangerous wind.', instruction: 'Diga a condição do tempo em uma palavra.', answer: 'It is stormy.' },
                        { type: 'Complete', prompt: 'The day is pleasant: it is not very hot or very cold. It is ___.', instruction: 'Complete com o adjetivo adequado.', answer: 'mild' },
                        { type: 'Choose', prompt: 'A short period of rain: shower / heat wave / fog.', instruction: 'Escolha a opção correta.', answer: 'shower' }
                    ]
                },
                {
                    title: 'Fale sobre preferências com verb-ing',
                    instruction: 'Complete, corrija ou transforme as frases. Não use to depois de enjoy.',
                    items: [
                        { type: 'Complete', prompt: 'I enjoy ___ new places on foot. (explore)', instruction: 'Use a forma -ing.', answer: 'I enjoy exploring new places on foot.' },
                        { type: 'Complete', prompt: 'She loves ___ photos of the scenery. (take)', instruction: 'Use a forma -ing.', answer: 'She loves taking photos of the scenery.' },
                        { type: 'Correct', prompt: 'We enjoy to travel during the spring.', instruction: 'Corrija o verbo depois de enjoy.', answer: 'We enjoy traveling during the spring.' },
                        { type: 'Correct', prompt: 'Do you enjoy to walk in the rain?', instruction: 'Corrija a pergunta.', answer: 'Do you enjoy walking in the rain?' },
                        { type: 'Negative', prompt: 'Say that you do not like driving when it is foggy.', instruction: 'Use do not like + verb-ing.', answer: 'I do not like driving when it is foggy.' },
                        { type: 'Question', prompt: 'Ask about hiking in cold weather.', instruction: 'Use Do you enjoy...?', answer: 'Do you enjoy hiking in cold weather?' }
                    ]
                },
                {
                    title: 'Adapte o plano ao tempo',
                    instruction: 'Use because ou so e apresente uma decisão prática.',
                    items: [
                        { type: 'Combine', prompt: 'It is going to be stormy. We are staying indoors.', instruction: 'Una as ideias com so.', answer: 'It is going to be stormy, so we are staying indoors.' },
                        { type: 'Combine', prompt: 'I packed sunscreen. The forecast says it will be sunny.', instruction: 'Una as ideias com because.', answer: 'I packed sunscreen because the forecast says it will be sunny.' },
                        { type: 'Plan', prompt: 'Saturday morning: sunny. Saturday afternoon: heavy showers.', instruction: 'Crie uma atividade para cada período.', answer: 'We can go to the beach in the morning and visit a museum in the afternoon.' },
                        { type: 'Personalize', prompt: 'Describe weather you enjoy and two activities you like doing in that weather.', instruction: 'Responda em três frases conectadas.', answer: 'I enjoy mild, sunny weather. I like walking outdoors and having lunch by the water. I do not enjoy staying inside all day.' }
                    ]
                }
            ],
            translations: [
                { pt: 'Você verificou a previsão do tempo?', en: 'Did you check the weather forecast?' },
                { pt: 'Eu gosto de explorar cidades pequenas nas férias.', en: 'I enjoy exploring small towns on vacation.' },
                { pt: 'Ela adora tirar fotos quando está ensolarado.', en: 'She loves taking photos when it is sunny.' },
                { pt: 'Nós não gostamos de dirigir quando está com neblina.', en: 'We do not like driving when it is foggy.' },
                { pt: 'Você gosta de caminhar quando está frio?', en: 'Do you enjoy hiking when it is cold?' },
                { pt: 'Pode haver uma pancada de chuva depois do almoço.', en: 'There may be a shower after lunch.' },
                { pt: 'A temperatura cai rapidamente à noite.', en: 'The temperature drops quickly at night.' },
                { pt: 'Está ventando, então vamos ficar em um ambiente fechado.', en: 'It is windy, so we are going to stay indoors.' }
            ],
            expressionTranslations: [
                { pt: 'Verifique a previsão antes de fazer as malas.', en: 'Check the forecast before you pack.' },
                { pt: 'O tempo pode abrir depois do almoço.', en: 'The weather may clear up after lunch.' },
                { pt: 'Geralmente esfria no começo da noite.', en: 'It usually cools down in the early evening.' },
                { pt: 'O dia vai esquentar perto do meio-dia.', en: 'The day will warm up around midday.' },
                { pt: 'Fomos pegos pela chuva perto da praia.', en: 'We got caught in the rain near the beach.' },
                { pt: 'Nós ficamos em um ambiente fechado durante a tempestade.', en: 'We stayed indoors during the storm.' },
                { pt: 'Eu prefiro viajar com pouca bagagem.', en: 'I prefer packing light.' },
                { pt: 'Nós aproveitamos ao máximo a manhã ensolarada.', en: 'We made the most of the sunny morning.' }
            ],
            dialogues: [
                [
                    ['Traveler', 'What is the weather usually like here in September?'],
                    ['Local', 'It is generally mild, but the mornings can be foggy.'],
                    ['Traveler', 'Do you think I need a heavy coat?'],
                    ['Local', 'Probably not. A light jacket should be enough.'],
                    ['Traveler', 'Good. I enjoy walking, so I want to spend a lot of time outside.'],
                    ['Local', 'Then check the forecast each morning. The weather changes quickly near the mountains.'],
                    ['Traveler', 'Thanks. Is the lake trail safe after rain?'],
                    ['Local', 'Usually, but avoid it during a storm.']
                ],
                [
                    ['Mia', 'The forecast says there will be showers all afternoon.'],
                    ['Jon', 'That’s fine. I don’t mind visiting the museum first.'],
                    ['Mia', 'I thought you hated staying indoors on vacation.'],
                    ['Jon', 'I do, but I enjoy learning about local history.'],
                    ['Mia', 'If the sky clears up, we can walk along the river later.'],
                    ['Jon', 'Perfect. We can make the most of both places.']
                ],
                [
                    ['Guest', 'Is tomorrow a good day for the boat tour?'],
                    ['Receptionist', 'The morning will be sunny, but it will get windy after two.'],
                    ['Guest', 'I don’t enjoy being on a boat in strong wind.'],
                    ['Receptionist', 'Then I recommend the nine o’clock tour.'],
                    ['Guest', 'How long does it take?'],
                    ['Receptionist', 'About two hours, so you will return before the wind gets stronger.'],
                    ['Guest', 'Great. Please reserve two places for us.']
                ],
                [
                    ['Friend', 'What kind of vacation do you enjoy taking?'],
                    ['You', 'I love visiting cool places where I can hike.'],
                    ['Friend', 'Really? I hate feeling cold on vacation.'],
                    ['You', 'What do you prefer doing?'],
                    ['Friend', 'I enjoy swimming, eating outside, and relaxing in the sun.'],
                    ['You', 'Then our ideal vacations are completely different.'],
                    ['Friend', 'Maybe, but we both enjoy trying local food.']
                ]
            ],
            readingTitle: 'One Forecast, Two Vacation Plans',
            reading: 'Nora and Ethan traveled to the same island, stayed in the same hotel, and received the same weather forecast. However, they planned very different days. Nora loved being outdoors. She enjoyed swimming, walking along the coast, and taking photos of the scenery. When she heard that the morning would be sunny, she left the hotel early and made the most of the clear sky. Ethan disliked spending hours in strong sun. He preferred visiting cafés, talking to local people, and exploring indoor markets. He waited until the afternoon, when the temperature began to cool down. At three o’clock, dark clouds appeared and a heavy shower started. Nora got caught in the rain on her way back, while Ethan was already inside a market. That evening, they compared their days. Neither plan was perfect, but both travelers had enjoyed the island in a way that matched their preferences. They decided to check the next day’s forecast together and choose one activity they could both enjoy doing.',
            readingQuestions: [
                { question: 'Which activities did Nora enjoy doing?', answer: 'She enjoyed swimming, walking along the coast, and taking photos.' },
                { question: 'Why did she leave the hotel early?', answer: 'The morning was going to be sunny, so she wanted to use the clear weather.' },
                { question: 'What kind of activities did Ethan prefer?', answer: 'He preferred visiting cafés, talking to local people, and exploring indoor markets.' },
                { question: 'When did the temperature begin to cool down?', answer: 'It began to cool down in the afternoon.' },
                { question: 'Who got caught in the rain?', answer: 'Nora got caught in the rain.' },
                { question: 'Why did both travelers enjoy the island?', answer: 'Each person chose activities that matched their preferences.' },
                { question: 'What did they decide to do the next day?', answer: 'They decided to check the forecast together and choose an activity they could both enjoy.' }
            ],
            guidedConversation: {
                questions: [
                    'What kind of weather do you enjoy on vacation?',
                    'Which activities do you love doing when it is sunny?',
                    'What do you enjoy doing on a rainy vacation day?',
                    'Which weather conditions make traveling difficult for you?',
                    'Do you check the forecast before you pack? Why?',
                    'How would you change a beach plan if a storm were coming?',
                    'Describe your ideal three-day vacation using different weather conditions.'
                ],
                support: ['I enjoy...ing', 'I do not like...ing', 'when it is...', 'because', 'so', 'check the forecast', 'make the most of']
            },
            homework: [
                { icon: 'fas fa-cloud-sun', title: 'Crie uma previsão de três dias', instruction: 'Escolha um destino e registre o clima previsto para manhã e tarde durante três dias.' },
                { icon: 'fas fa-suitcase', title: 'Organize a mala', instruction: 'Faça uma lista de oito itens adequados à previsão e explique oralmente por que levaria quatro deles.' },
                { icon: 'fas fa-heart', title: 'Descreva suas preferências', instruction: 'Escreva oito frases verdadeiras usando enjoy, like, love ou hate + verb-ing. Repita verbos importantes em contextos diferentes quando isso ajudar a memorizar.' },
                { icon: 'fas fa-calendar-alt', title: 'Monte um plano flexível', instruction: 'Planeje uma atividade para cada período e inclua duas alternativas caso o tempo mude.' },
                { icon: 'fas fa-microphone', title: 'Apresente o plano', instruction: 'Faça um áudio de 90 segundos. Explique o clima, suas preferências e como o plano se adapta à previsão.' }
            ]
        }
    }));
}());
