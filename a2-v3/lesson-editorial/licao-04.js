(function () {
    'use strict';

    window.V3LessonEditorial.register('a2-v3', 4, data => ({
        ...data,
        title: 'Finding Your Way',
        bank: {
            ...data.bank,
            label: 'location prepositions directions route instructions finding places',
            matchLabel: 'location prepositions directions route instructions finding places',
            themes: ['giving directions in your neighborhood', 'finding an unfamiliar place', 'explaining a route with clear landmarks'],
            themeOptions: ['giving directions in your neighborhood', 'finding an unfamiliar place', 'explaining a route with clear landmarks'],
            objectives: [
                'ask where a place is and how to get there',
                'locate buildings with precise place prepositions',
                'give route instructions with imperatives and movement prepositions',
                'check whether the listener understood the route'
            ],
            introDialogue: [
                ['Visitor', 'Excuse me. How do I get to the Riverside Museum?'],
                ['Local', 'Go straight along this avenue for two blocks.'],
                ['Visitor', 'Do I turn at the traffic lights?'],
                ['Local', 'Yes. Turn left and walk past the post office.'],
                ['Visitor', 'Is the museum on the corner?'],
                ['Local', 'Not exactly. It is between the library and a small theater, across from the park.'],
                ['Visitor', 'So I turn left, go past the post office, and look across from the park.'],
                ['Local', 'That’s right. The main entrance is beside the theater.'],
                ['Visitor', 'Great. Thank you for your help.'],
                ['Local', 'You’re welcome. You can’t miss it.']
            ],
            vocab: [
                ['block', 'quarteirão', 'Walk for two blocks and turn right.'],
                ['intersection', 'cruzamento', 'The bank is near the next intersection.'],
                ['landmark', 'ponto de referência', 'Use the clock tower as a landmark.'],
                ['entrance', 'entrada', 'Meet me at the main entrance.'],
                ['exit', 'saída', 'Take the second exit at the roundabout.'],
                ['bridge', 'ponte', 'Cross the bridge and continue straight.'],
                ['traffic lights', 'semáforo', 'Turn left at the traffic lights.'],
                ['roundabout', 'rotatória', 'Go around the roundabout carefully.'],
                ['sidewalk', 'calçada', 'Stay on the sidewalk near the school.'],
                ['crosswalk', 'faixa de pedestres', 'Use the crosswalk to cross the avenue.'],
                ['avenue', 'avenida', 'The hotel is on Central Avenue.'],
                ['alley', 'beco; viela', 'Do not take the narrow alley at night.']
            ],
            grammarTable: {
                title: 'Localização e movimento em uma rota',
                headers: ['Função', 'Estrutura útil', 'Exemplo'],
                rows: [
                    ['Localizar', 'next to / between / across from / on the corner', 'The bank is across from the park.'],
                    ['Seguir uma via', 'go/walk along + street', 'Walk along Green Street.'],
                    ['Passar por um ponto', 'go/walk past + place', 'Go past the pharmacy.'],
                    ['Atravessar', 'go across + open area / go through + enclosed area', 'Walk across the square and through the gate.'],
                    ['Mudar direção', 'turn left/right at + landmark', 'Turn right at the traffic lights.']
                ]
            },
            grammar: [
                ['Place prepositions', 'Use next to for one side, between for a middle position, and across from for the opposite side of a street or open space.'],
                ['Movement prepositions', 'Use along for following a line, past for passing a landmark, across for crossing an open surface, and through for entering and moving inside.'],
                ['Route imperatives', 'Begin instructions with the base verb: Go straight, turn left, cross the bridge. Add a landmark so the instruction is easy to follow.']
            ],
            examples: [
                'The pharmacy is next to the bakery.',
                'The hotel is between the station and the theater.',
                'Walk along River Avenue for one block.',
                'Go past the bank and turn right.',
                'Walk across the square and through the main gate.',
                'Turn left at the second intersection.'
            ],
            expressions: [
                ['How do I get to...?', 'Como eu chego a...?', 'How do I get to the city museum?'],
                ['Is there a...near here?', 'Tem algum(a)...perto daqui?', 'Is there a pharmacy near here?'],
                ['go straight ahead', 'seguir reto', 'Go straight ahead for one block.'],
                ['turn left/right', 'virar à esquerda/direita', 'Turn right at the corner.'],
                ['on your left/right', 'à sua esquerda/direita', 'The entrance is on your left.'],
                ['You can’t miss it.', 'Não tem como não ver.', 'It is a large blue building. You can’t miss it.'],
                ['Am I going the right way?', 'Estou indo pelo caminho certo?', 'Am I going the right way to the station?'],
                ['Let me check that.', 'Deixe-me confirmar.', 'Let me check that: I turn left after the bridge.']
            ],
            activitySections: [
                {
                    title: 'Localize cada lugar',
                    instruction: 'Complete a descrição com a preposição que representa a posição indicada.',
                    items: [
                        { type: 'Complete', prompt: 'The pharmacy is ___ the bank and the café.', instruction: 'O lugar está no meio de dois pontos.', answer: 'The pharmacy is between the bank and the café.' },
                        { type: 'Complete', prompt: 'The hotel is ___ from the station.', instruction: 'Os dois lugares ficam em lados opostos da rua.', answer: 'The hotel is across from the station.' },
                        { type: 'Complete', prompt: 'The bakery is next ___ the bookstore.', instruction: 'Complete a expressão de localização.', answer: 'The bakery is next to the bookstore.' },
                        { type: 'Correct', prompt: 'The museum is in the corner of King Street.', instruction: 'Corrija a preposição usada com corner.', answer: 'The museum is on the corner of King Street.' },
                        { type: 'Describe', prompt: 'Bank — café — hotel. The café is in the middle.', instruction: 'Escreva uma frase com between.', answer: 'The café is between the bank and the hotel.' }
                    ]
                },
                {
                    title: 'Construa uma rota clara',
                    instruction: 'Escolha a preposição de movimento ou organize a instrução na ordem correta.',
                    items: [
                        { type: 'Choose', prompt: 'Walk along / across Oak Street for two blocks.', instruction: 'Você deve seguir a rua, não atravessá-la.', answer: 'Walk along Oak Street for two blocks.' },
                        { type: 'Choose', prompt: 'Go past / through the bank and turn left.', instruction: 'Você apenas passa pelo banco.', answer: 'Go past the bank and turn left.' },
                        { type: 'Choose', prompt: 'Walk across / along the square to the opposite side.', instruction: 'Você cruza uma área aberta.', answer: 'Walk across the square to the opposite side.' },
                        { type: 'Choose', prompt: 'Go through / past the gate and enter the garden.', instruction: 'Você passa por dentro da abertura.', answer: 'Go through the gate and enter the garden.' },
                        { type: 'Unscramble', prompt: 'at / turn / the traffic lights / right', instruction: 'Desembaralhe a instrução.', answer: 'Turn right at the traffic lights.' },
                        { type: 'Sequence', prompt: 'Order the route: turn left / go past the library / walk for one block.', instruction: 'Comece pelo deslocamento inicial.', answer: 'Walk for one block, go past the library, and turn left.' }
                    ]
                },
                {
                    title: 'Explique e confirme o caminho',
                    instruction: 'Produza instruções completas e verifique se a rota ficou compreensível.',
                    items: [
                        { type: 'Question', prompt: 'Ask how to get to the nearest supermarket.', instruction: 'Use How do I get to...?', answer: 'How do I get to the nearest supermarket?' },
                        { type: 'Clarify', prompt: 'You did not understand where to turn.', instruction: 'Peça confirmação usando “Do I turn...?”', answer: 'Do I turn left at the bridge?' },
                        { type: 'Check', prompt: 'Repeat this route to confirm it: past the bank; right at the lights.', instruction: 'Use Let me check that.', answer: 'Let me check that: I go past the bank and turn right at the traffic lights.' },
                        { type: 'Personalize', prompt: 'Give directions from your home to a familiar place.', instruction: 'Use pelo menos três preposições de movimento e dois pontos de referência.', answer: 'Go along my street, walk past the bakery, turn left at the traffic lights, and cross the square.' }
                    ]
                }
            ],
            translations: [
                { pt: 'Como eu chego ao museu?', en: 'How do I get to the museum?' },
                { pt: 'A farmácia fica entre o banco e a padaria.', en: 'The pharmacy is between the bank and the bakery.' },
                { pt: 'O hotel fica em frente ao parque.', en: 'The hotel is across from the park.' },
                { pt: 'Siga por esta avenida por dois quarteirões.', en: 'Walk along this avenue for two blocks.' },
                { pt: 'Passe pela biblioteca e vire à direita.', en: 'Go past the library and turn right.' },
                { pt: 'Atravesse a praça e passe pelo portão.', en: 'Walk across the square and go through the gate.' },
                { pt: 'A entrada estará à sua esquerda.', en: 'The entrance will be on your left.' },
                { pt: 'Deixe-me confirmar: eu viro depois da ponte.', en: 'Let me check that: I turn after the bridge.' }
            ],
            expressionTranslations: [
                { pt: 'Tem uma farmácia perto daqui?', en: 'Is there a pharmacy near here?' },
                { pt: 'Siga reto até o próximo cruzamento.', en: 'Go straight ahead to the next intersection.' },
                { pt: 'Vire à esquerda no semáforo.', en: 'Turn left at the traffic lights.' },
                { pt: 'O prédio estará à sua direita.', en: 'The building will be on your right.' },
                { pt: 'É um prédio grande. Não tem como não ver.', en: 'It is a large building. You can’t miss it.' },
                { pt: 'Estou indo pelo caminho certo para a estação?', en: 'Am I going the right way to the station?' },
                { pt: 'Deixe-me confirmar as instruções.', en: 'Let me check the directions.' },
                { pt: 'Como eu chego à entrada principal?', en: 'How do I get to the main entrance?' }
            ],
            dialogues: [
                [
                    ['Tourist', 'Excuse me. Is there an ATM near here?'],
                    ['Local', 'Yes. Go straight ahead and turn left at the first intersection.'],
                    ['Tourist', 'Is it on the corner?'],
                    ['Local', 'No. Walk past the hotel. The ATM is next to a small grocery store.'],
                    ['Tourist', 'Let me check that: left at the intersection and past the hotel.'],
                    ['Local', 'Exactly. It will be on your right.'],
                    ['Tourist', 'Thank you.'],
                    ['Local', 'You’re welcome.']
                ],
                [
                    ['Driver', 'Am I going the right way to the airport?'],
                    ['Pedestrian', 'Yes, but do not turn at this traffic light. Continue to the roundabout.'],
                    ['Driver', 'Which exit should I take?'],
                    ['Pedestrian', 'Take the second exit and cross the bridge.'],
                    ['Driver', 'Is the airport entrance after the bridge?'],
                    ['Pedestrian', 'Yes. Follow the signs and keep to the left.'],
                    ['Driver', 'Great. That was very clear.']
                ],
                [
                    ['Visitor', 'How do I get from the station to the public library?'],
                    ['Clerk', 'Leave through the north exit and walk across the square.'],
                    ['Visitor', 'Do I go through the park?'],
                    ['Clerk', 'No. Walk along the avenue beside the park.'],
                    ['Visitor', 'What landmark should I look for?'],
                    ['Clerk', 'A clock tower. The library is directly across from it.'],
                    ['Visitor', 'Perfect. Thanks for the landmark.']
                ],
                [
                    ['Friend', 'Where is the new café you mentioned?'],
                    ['You', 'It is on Lake Street, between a bookstore and a flower shop.'],
                    ['Friend', 'Can I walk there from your apartment?'],
                    ['You', 'Yes. Go along Pine Avenue and turn right after the bridge.'],
                    ['Friend', 'Do I need to cross the big intersection?'],
                    ['You', 'Yes, but use the crosswalk. The café will be on your left.'],
                    ['Friend', 'I think I know the place now.']
                ]
            ],
            readingTitle: 'Directions That Actually Help',
            reading: 'When people give directions, they often imagine that the listener can see the same map in their head. This is why instructions such as “go over there” or “turn near the big building” are not very helpful. A useful route begins with a clear starting point and divides the journey into small steps. It also uses visible landmarks. For example, “Leave through the main exit, walk across the square, and turn right at the clock tower” is easier to follow than a long description without reference points. Good directions also distinguish location from movement. A café can be across from a park, but a person walks across the park. Finally, the listener should repeat the important steps. This gives the speaker an opportunity to correct a wrong turn before it happens. Clear directions are not only about knowing prepositions. They are about imagining what information another person needs at each point of the route.',
            readingQuestions: [
                { question: 'Why are expressions such as “go over there” not helpful?', answer: 'The listener may not know which place the speaker means.' },
                { question: 'What should a useful route begin with?', answer: 'It should begin with a clear starting point.' },
                { question: 'Why are landmarks useful?', answer: 'They give the listener visible reference points.' },
                { question: 'Which route does the text use as a clear example?', answer: 'Leave through the main exit, cross the square, and turn at the clock tower.' },
                { question: 'What is the difference between across from and across?', answer: 'Across from describes location; across describes movement to the other side.' },
                { question: 'Why should the listener repeat the route?', answer: 'It allows the speaker to correct a misunderstanding before the person leaves.' },
                { question: 'According to the final sentence, what are clear directions really about?', answer: 'They are about imagining the information another person needs.' }
            ],
            guidedConversation: {
                questions: [
                    'Which landmarks are useful near your home?',
                    'How do you get from your home to the nearest supermarket?',
                    'Which prepositions are most useful when you give directions?',
                    'What makes directions confusing?',
                    'Do you usually ask people or use a map application when you are lost?',
                    'Give a route and then listen while the teacher repeats it. Correct any wrong step.',
                    'Explain two different routes to the same place and choose the easier one.'
                ],
                support: ['How do I get to...?', 'go straight ahead', 'walk along', 'go past', 'across from', 'turn at', 'Let me check that']
            },
            homework: [
                { icon: 'fas fa-map', title: 'Desenhe uma rota simples', instruction: 'Escolha um ponto inicial, um destino e pelo menos cinco pontos de referência.' },
                { icon: 'fas fa-list-ol', title: 'Escreva as instruções', instruction: 'Produza oito a dez etapas usando preposições de localização e movimento.' },
                { icon: 'fas fa-search-location', title: 'Teste a clareza', instruction: 'Leia apenas suas instruções e confira se seria possível reconstruir o caminho sem ver o mapa.' },
                { icon: 'fas fa-microphone', title: 'Grave a rota', instruction: 'Explique o caminho oralmente sem ler o texto completo.' },
                { icon: 'fas fa-redo', title: 'Corrija e grave novamente', instruction: 'Substitua instruções vagas por pontos de referência claros e faça uma segunda gravação.' }
            ]
        }
    }));
}());
