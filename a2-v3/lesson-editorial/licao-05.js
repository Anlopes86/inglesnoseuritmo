(function () {
    'use strict';

    window.V3LessonEditorial.register('a2-v3', 5, data => ({
        ...data,
        title: 'How Long Does It Take?',
        bank: {
            ...data.bank,
            label: 'asking for help distance travel time transport route choices',
            matchLabel: 'asking for help distance travel time transport route choices',
            themes: ['asking for help in an unfamiliar place', 'comparing travel time by different means of transportation', 'choosing a route when time is limited'],
            themeOptions: ['asking for help in an unfamiliar place', 'comparing travel time by different means of transportation', 'choosing a route when time is limited'],
            objectives: [
                'ask for help politely when finding a place',
                'ask and answer how long a journey takes',
                'distinguish travel time from physical distance',
                'explain the best route and transportation choice'
            ],
            introDialogue: [
                ['Traveler', 'Excuse me. Could you help me find the bus terminal?'],
                ['Clerk', 'Of course. Are you walking or taking public transportation?'],
                ['Traveler', 'I’m not sure. How far is it from here?'],
                ['Clerk', 'It is about four kilometers away.'],
                ['Traveler', 'How long does it take by bus?'],
                ['Clerk', 'Around fifteen minutes without traffic, but you need to make one transfer.'],
                ['Traveler', 'And how long does it take on foot?'],
                ['Clerk', 'Almost fifty minutes. The bus is definitely the best way.'],
                ['Traveler', 'Which line should I take first?'],
                ['Clerk', 'Take the number eight and transfer at Central Square.']
            ],
            vocab: [
                ['route', 'rota; caminho', 'This route is direct but usually busy.'],
                ['shortcut', 'atalho', 'The park path is a useful shortcut.'],
                ['distance', 'distância', 'The distance is only three kilometers.'],
                ['journey', 'trajeto; viagem', 'The train journey takes about an hour.'],
                ['delay', 'atraso', 'There is a twenty-minute delay.'],
                ['transfer', 'baldeação; conexão', 'You need to make one transfer.'],
                ['platform', 'plataforma', 'The train leaves from platform six.'],
                ['fare', 'tarifa; valor da passagem', 'The bus fare is two dollars.'],
                ['traffic', 'trânsito', 'Traffic is heavy before nine.'],
                ['estimate', 'estimativa; estimar', 'The time is only an estimate.'],
                ['approximately', 'aproximadamente', 'The journey takes approximately forty minutes.'],
                ['direct', 'direto; sem conexão', 'Is there a direct train to the airport?']
            ],
            grammarTable: {
                title: 'Ajuda, distância e duração do trajeto',
                headers: ['Objetivo', 'Estrutura', 'Exemplo'],
                rows: [
                    ['Pedir ajuda', 'Can/Could you help me + base verb?', 'Could you help me find this street?'],
                    ['Perguntar duração', 'How long does it take to + base verb?', 'How long does it take to get there?'],
                    ['Responder duração', 'It takes + period of time', 'It takes about thirty minutes.'],
                    ['Perguntar distância', 'How far is + place + from...?', 'How far is the station from here?'],
                    ['Indicar transporte', 'by + vehicle / on foot', 'It takes ten minutes by bus or thirty minutes on foot.']
                ]
            },
            grammar: [
                ['Can/Could you help me?', 'Use can for a normal request and could for a slightly softer request. After help me, use the base form: help me find, help me understand.'],
                ['How long does it take?', 'Use does because the subject is it, and keep take in the base form. Add to + verb when you name the action or destination.'],
                ['How far or how long?', 'How far asks about distance; how long asks about time. Answer distance with meters or kilometers and time with minutes or hours.']
            ],
            examples: [
                'Could you help me find the correct platform?',
                'Can you help me understand this map?',
                'How long does it take to get to the airport?',
                'It takes approximately twenty-five minutes by train.',
                'How far is the terminal from here?',
                'It is six kilometers away, but traffic can cause delays.'
            ],
            expressions: [
                ['Could you help me?', 'Você poderia me ajudar?', 'Could you help me find the correct platform?'],
                ['I’m trying to find...', 'Estou tentando encontrar...', 'I’m trying to find the bus terminal.'],
                ['How far is it?', 'Qual é a distância?', 'How far is it from here to the station?'],
                ['How long does it take?', 'Quanto tempo leva?', 'How long does it take by subway?'],
                ['It takes about...', 'Leva cerca de...', 'It takes about twenty minutes.'],
                ['What’s the best way to get there?', 'Qual é a melhor forma de chegar lá?', 'What’s the best way to get there during rush hour?'],
                ['Is there a direct...?', 'Existe algum(a)...direto(a)?', 'Is there a direct bus to the airport?'],
                ['allow extra time', 'reservar tempo adicional', 'Allow extra time because traffic is heavy.']
            ],
            activitySections: [
                {
                    title: 'Peça ajuda com clareza',
                    instruction: 'Monte pedidos completos e mantenha o verbo principal na forma base.',
                    items: [
                        { type: 'Complete', prompt: 'Could you help me ___ this address? (find)', instruction: 'Use o verbo na forma base.', answer: 'Could you help me find this address?' },
                        { type: 'Complete', prompt: 'Can you help me ___ this map? (understand)', instruction: 'Use o verbo na forma base.', answer: 'Can you help me understand this map?' },
                        { type: 'Correct', prompt: 'Could you help me to finding the platform?', instruction: 'Corrija a forma depois de help me.', answer: 'Could you help me find the platform?' },
                        { type: 'Rewrite', prompt: 'Where is the terminal?', instruction: 'Transforme em um pedido mais educado com I’m trying to find.', answer: 'Excuse me. I’m trying to find the terminal.' },
                        { type: 'Personalize', prompt: 'Ask for help finding a place you often visit.', instruction: 'Inclua o nome do lugar ou da rua.', answer: 'Could you help me find the Central Library?' }
                    ]
                },
                {
                    title: 'Pergunte e responda sobre tempo e distância',
                    instruction: 'Escolha entre how long e how far e complete a resposta com a unidade correta.',
                    items: [
                        { type: 'Choose', prompt: 'How long / How far does it take to get there?', instruction: 'A pergunta é sobre duração.', answer: 'How long does it take to get there?' },
                        { type: 'Choose', prompt: 'How long / How far is the airport from downtown?', instruction: 'A pergunta é sobre distância.', answer: 'How far is the airport from downtown?' },
                        { type: 'Complete', prompt: 'It ___ about forty minutes by train.', instruction: 'Complete com a forma correta de take.', answer: 'It takes about forty minutes by train.' },
                        { type: 'Correct', prompt: 'How long does it takes by bus?', instruction: 'Corrija o verbo depois de does.', answer: 'How long does it take by bus?' },
                        { type: 'Correct', prompt: 'It take thirty minutes on foot.', instruction: 'Corrija a concordância com it.', answer: 'It takes thirty minutes on foot.' },
                        { type: 'Answer', prompt: 'How far is the station? Distance: 2.5 km.', instruction: 'Responda com a unidade de distância.', answer: 'It is about two and a half kilometers away.' }
                    ]
                },
                {
                    title: 'Escolha a melhor forma de chegar',
                    instruction: 'Use duração, transferência, trânsito e praticidade para justificar sua decisão.',
                    items: [
                        { type: 'Compare', prompt: 'Bus: 25 minutes, one transfer. Subway: 18 minutes, direct.', instruction: 'Escolha uma opção e explique por quê.', answer: 'The subway is the best way because it is direct and takes only eighteen minutes.' },
                        { type: 'Problem', prompt: 'The direct train has a 40-minute delay. The bus leaves now and takes 50 minutes.', instruction: 'Decida qual opção usar e explique o tempo total.', answer: 'I would take the bus because it leaves now and the total journey is shorter.' },
                        { type: 'Clarify', prompt: 'You heard “fifteen” or “fifty” minutes, but you are not sure.', instruction: 'Peça confirmação da duração.', answer: 'Sorry, did you say fifteen or fifty minutes?' },
                        { type: 'Personalize', prompt: 'Explain the best way to travel from your home to a familiar destination.', instruction: 'Inclua transporte, duração, distância aproximada e possível atraso.', answer: 'The best way is by bus. It takes about twenty minutes, but I allow extra time when traffic is heavy.' }
                    ]
                }
            ],
            translations: [
                { pt: 'Você poderia me ajudar a encontrar esta rua?', en: 'Could you help me find this street?' },
                { pt: 'Estou tentando encontrar a plataforma seis.', en: 'I’m trying to find platform six.' },
                { pt: 'Quanto tempo leva para chegar ao aeroporto?', en: 'How long does it take to get to the airport?' },
                { pt: 'Leva aproximadamente trinta minutos de trem.', en: 'It takes approximately thirty minutes by train.' },
                { pt: 'Qual é a distância da estação até aqui?', en: 'How far is the station from here?' },
                { pt: 'Existe um ônibus direto para o centro?', en: 'Is there a direct bus downtown?' },
                { pt: 'Você precisa fazer uma baldeação.', en: 'You need to make one transfer.' },
                { pt: 'Reserve um tempo adicional por causa do trânsito.', en: 'Allow extra time because of the traffic.' }
            ],
            expressionTranslations: [
                { pt: 'Você poderia me ajudar?', en: 'Could you help me?' },
                { pt: 'Estou tentando encontrar o terminal.', en: 'I’m trying to find the terminal.' },
                { pt: 'Qual é a distância até o hotel?', en: 'How far is it to the hotel?' },
                { pt: 'Quanto tempo leva de ônibus?', en: 'How long does it take by bus?' },
                { pt: 'Leva cerca de quinze minutos.', en: 'It takes about fifteen minutes.' },
                { pt: 'Qual é a melhor forma de chegar lá?', en: 'What’s the best way to get there?' },
                { pt: 'Existe um trem direto?', en: 'Is there a direct train?' },
                { pt: 'Reserve um tempo adicional durante o horário de pico.', en: 'Allow extra time during rush hour.' }
            ],
            dialogues: [
                [
                    ['Passenger', 'Could you help me find platform four?'],
                    ['Employee', 'Certainly. Go through the ticket area and take the stairs on your left.'],
                    ['Passenger', 'How far is it from here?'],
                    ['Employee', 'Only about two hundred meters.'],
                    ['Passenger', 'How long does it take to walk there?'],
                    ['Employee', 'Less than five minutes, but your train is already boarding.'],
                    ['Passenger', 'I’ll go now. Thank you.'],
                    ['Employee', 'You’re welcome. Have a good journey.']
                ],
                [
                    ['Tourist', 'What’s the best way to get to the historic center?'],
                    ['Agent', 'The direct bus is usually the easiest option.'],
                    ['Tourist', 'How long does it take?'],
                    ['Agent', 'Approximately thirty minutes, depending on traffic.'],
                    ['Tourist', 'Is the subway faster?'],
                    ['Agent', 'The ride is faster, but you need to make two transfers.'],
                    ['Tourist', 'Then I’ll take the direct bus. What’s the fare?'],
                    ['Agent', 'It is three dollars. You can pay on the bus.']
                ],
                [
                    ['Visitor', 'I’m trying to find the Green Valley Hotel.'],
                    ['Driver', 'That hotel is outside town. Do you have the complete address?'],
                    ['Visitor', 'Yes, but my map application is not loading.'],
                    ['Driver', 'I can help you. It is about twelve kilometers from here.'],
                    ['Visitor', 'How long does it take by car?'],
                    ['Driver', 'Around twenty minutes without traffic.'],
                    ['Visitor', 'Could you show me the route on this paper map?'],
                    ['Driver', 'Of course. Follow this road until the second roundabout.']
                ],
                [
                    ['Friend', 'Are you still coming to the concert tonight?'],
                    ['You', 'Yes, but there is a delay on my train line.'],
                    ['Friend', 'How long will the journey take now?'],
                    ['You', 'The estimate is one hour and ten minutes.'],
                    ['Friend', 'There is a bus from Central Square. Is it direct?'],
                    ['You', 'Yes, but traffic may be heavy.'],
                    ['Friend', 'Allow extra time. The concert begins at eight.'],
                    ['You', 'I will. I’m leaving now.']
                ]
            ],
            readingTitle: 'The Fastest Route Is Not Always the Best Route',
            reading: 'A map application often suggests the route with the shortest estimated time, but travelers need more information before making a good decision. A twenty-minute subway journey may require two transfers, several flights of stairs, and a long walk from the final platform. A thirty-minute direct bus may be easier for someone carrying luggage. Distance can also be misleading. A hotel may be only three kilometers away, but a river, a closed bridge, or heavy traffic can make the journey much longer. Local advice is useful because residents know which routes are crowded, which shortcuts are safe, and when delays usually happen. When asking for help, explain your priorities. Do you need the fastest route, the cheapest fare, the fewest transfers, or the shortest walk? Ask the person to repeat unfamiliar names and confirm whether the estimate includes waiting time. Before leaving, repeat the main information: transportation, transfer point, platform, and approximate duration. The best answer depends on the traveler, the time of day, and the situation—not only on the number of minutes shown on a screen.',
            readingQuestions: [
                { question: 'Why may the fastest subway route be difficult?', answer: 'It may require transfers, stairs, and a long walk.' },
                { question: 'Who may prefer a direct bus?', answer: 'Someone carrying luggage may prefer it.' },
                { question: 'Why can a short distance still take a long time?', answer: 'A river, closed bridge, or traffic can make the journey longer.' },
                { question: 'What useful information do local residents know?', answer: 'They know crowded routes, safe shortcuts, and usual delays.' },
                { question: 'What should a traveler explain when asking for help?', answer: 'The traveler should explain their priorities.' },
                { question: 'Which four priorities does the text mention?', answer: 'Time, fare, number of transfers, and walking distance.' },
                { question: 'What determines the best route?', answer: 'The traveler, the time of day, and the situation determine it.' }
            ],
            guidedConversation: {
                questions: [
                    'When was the last time you asked someone for help with directions?',
                    'How long does your usual journey to work or school take?',
                    'How far is it from your home?',
                    'Which transportation options can you use?',
                    'Do you prefer a faster route with transfers or a slower direct route?',
                    'What usually causes delays in your city?',
                    'Give advice to a traveler who needs to reach the airport during rush hour.'
                ],
                support: ['Could you help me...?', 'How far...?', 'How long does it take...?', 'It takes about...', 'by bus', 'on foot', 'allow extra time']
            },
            homework: [
                { icon: 'fas fa-route', title: 'Escolha um trajeto real', instruction: 'Selecione um ponto de partida e um destino que ofereçam pelo menos duas formas de transporte.' },
                { icon: 'fas fa-clock', title: 'Compare duração e distância', instruction: 'Registre o tempo, a distância, o número de transferências e um possível atraso de cada opção.' },
                { icon: 'fas fa-question-circle', title: 'Prepare perguntas', instruction: 'Escreva seis perguntas que você faria a alguém para confirmar o melhor caminho.' },
                { icon: 'fas fa-balance-scale', title: 'Escolha uma opção', instruction: 'Escreva um parágrafo justificando a escolha com pelo menos três critérios.' },
                { icon: 'fas fa-microphone', title: 'Explique oralmente', instruction: 'Grave uma explicação de 90 segundos e faça uma segunda tentativa com menos pausas.' }
            ]
        }
    }));
}());
