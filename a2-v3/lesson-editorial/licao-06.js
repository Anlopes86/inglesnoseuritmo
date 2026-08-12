(function () {
    'use strict';

    window.V3LessonEditorial.register('a2-v3', 6, data => ({
        ...data,
        title: 'Conversation Activities 2: In the Middle of Nowhere',
        bank: {
            ...data.bank,
            label: 'conversation review location directions help distance travel time',
            matchLabel: 'conversation review location directions help distance travel time',
            introDialogue: [
                ['Driver', 'I think we took the wrong exit. Do you recognize this road?'],
                ['Passenger', 'No, and the map application has stopped working.'],
                ['Driver', 'There is a gas station ahead. We can ask for help there.'],
                ['Passenger', 'Good idea. We need to find the lake road before it gets dark.'],
                ['Attendant', 'Can I help you?'],
                ['Driver', 'Yes, please. How do we get to Pine Lake from here?'],
                ['Attendant', 'Go back to the roundabout, take the third exit, and continue for eight kilometers.'],
                ['Passenger', 'How long does it take?'],
                ['Attendant', 'About fifteen minutes. The lake entrance will be on your right.'],
                ['Driver', 'Let me check that: third exit, eight kilometers, entrance on the right.']
            ],
            dialogues: [
                [
                    ['Traveler', 'Excuse me. Could you help me find Oak Farm?'],
                    ['Resident', 'It is outside the village. Are you driving?'],
                    ['Traveler', 'Yes. How far is it from here?'],
                    ['Resident', 'About seven kilometers. Go along this road and cross the stone bridge.'],
                    ['Traveler', 'Do I turn after the bridge?'],
                    ['Resident', 'Yes. Turn left and continue until you see a red gate.'],
                    ['Traveler', 'How long does it take?'],
                    ['Resident', 'Around ten minutes by car.']
                ],
                [
                    ['Passenger', 'Is this the direct bus to Hilltown?'],
                    ['Driver', 'Not today. The main road is closed, so you need to transfer.'],
                    ['Passenger', 'Where do I make the transfer?'],
                    ['Driver', 'At North Bridge. The second bus leaves from the opposite side of the avenue.'],
                    ['Passenger', 'How long will the complete journey take?'],
                    ['Driver', 'Approximately one hour, including the transfer.'],
                    ['Passenger', 'Could you tell me when we reach North Bridge?'],
                    ['Driver', 'Of course.']
                ],
                [
                    ['Friend', 'You sound worried. Where are you?'],
                    ['You', 'I’m near a roundabout, but I cannot see the hotel.'],
                    ['Friend', 'Is there a large supermarket across from you?'],
                    ['You', 'Yes, and there is a bridge on my left.'],
                    ['Friend', 'Take the road beside the supermarket and go past the school.'],
                    ['You', 'Do I turn at the traffic lights?'],
                    ['Friend', 'No. Continue straight. The hotel entrance is after the second intersection.'],
                    ['You', 'I see the sign now. Thank you.']
                ],
                [
                    ['Visitor', 'What’s the best way to get to the waterfall?'],
                    ['Guide', 'The short trail is closed, so you need to use the river trail.'],
                    ['Visitor', 'How far is the waterfall from the parking area?'],
                    ['Guide', 'About four kilometers.'],
                    ['Visitor', 'How long does the walk take?'],
                    ['Guide', 'Approximately ninety minutes. Walk along the river and turn right at the wooden sign.'],
                    ['Visitor', 'Is the path clearly marked after that?'],
                    ['Guide', 'Yes, but allow extra time if the ground is wet.']
                ]
            ],
            reviewPlan: {
                title: 'Conversation Activities 2: In the Middle of Nowhere',
                focus: [
                    'Location prepositions and route instructions: posição, movimento, landmarks e sequência de caminho.',
                    'Asking for help and travel time: ajuda, distância, duração, transporte e escolha de rota.'
                ],
                drills: [
                    ['Location', 'The pharmacy is ___ the bank and the café.', 'between'],
                    ['Movement', 'Go ___ the library and turn left.', 'past'],
                    ['Movement', 'Walk ___ the square to the opposite side.', 'across'],
                    ['Help', 'Could you help me ___ this address?', 'find'],
                    ['Duration', 'How long does it ___ by bus?', 'take'],
                    ['Distance', '___ far is the terminal from here?', 'How'],
                    ['Transport', 'It takes twenty minutes ___ train.', 'by'],
                    ['Walking', 'The hotel is ten minutes away ___ foot.', 'on'],
                    ['Direction', 'Turn right ___ the traffic lights.', 'at'],
                    ['Estimate', 'The journey takes ___ thirty minutes.', 'about']
                ],
                focusSections: [
                    {
                        title: 'Location prepositions e instruções de rota',
                        focus: 'Location prepositions and route instructions: posição, movimento, landmarks e sequência de caminho.',
                        instruction: 'Revise onde o lugar está e depois descreva o movimento necessário para chegar até ele.',
                        items: [
                            ['Complete', 'The clinic is ___ the bank and the hotel.', 'The clinic is between the bank and the hotel.'],
                            ['Complete', 'The station is ___ from the public library.', 'The station is across from the public library.'],
                            ['Choose', 'Walk along / across King Street for two blocks.', 'Walk along King Street for two blocks.'],
                            ['Choose', 'Go past / through the post office and turn right.', 'Go past the post office and turn right.'],
                            ['Sequence', 'Put in order: cross the bridge / turn left / go along Lake Road.', 'Go along Lake Road, cross the bridge, and turn left.'],
                            ['Explain', 'Give a four-step route using a starting point and two landmarks.', 'Start at the station, walk across the square, go past the bank, and turn left at the theater.']
                        ]
                    },
                    {
                        title: 'Pedir ajuda e perguntar duração',
                        focus: 'Asking for help and travel time: ajuda, distância, duração, transporte e escolha de rota.',
                        instruction: 'Revise as perguntas e use tempo, distância e transporte para tomar uma decisão.',
                        items: [
                            ['Complete', 'Could you help me ___ the correct road?', 'Could you help me find the correct road?'],
                            ['Correct', 'How long does it takes to get there?', 'How long does it take to get there?'],
                            ['Answer', 'How long does it take by bus? Time: 35 minutes.', 'It takes about thirty-five minutes by bus.'],
                            ['Question', 'Ask the distance from the village to the lake.', 'How far is the lake from the village?'],
                            ['Compare', 'Taxi: 20 minutes. Bus: 45 minutes with one transfer.', 'The taxi is faster, but the bus may be cheaper and requires one transfer.'],
                            ['Decide', 'You have a heavy suitcase. Walking takes 25 minutes; a direct bus takes 15.', 'I would take the direct bus because it is faster and easier with a heavy suitcase.']
                        ]
                    }
                ],
                translations: [
                    ['A farmácia fica em frente ao hotel.', 'The pharmacy is across from the hotel.'],
                    ['Passe pela escola e atravesse a ponte.', 'Go past the school and cross the bridge.'],
                    ['Vire à direita no segundo cruzamento.', 'Turn right at the second intersection.'],
                    ['Você poderia me ajudar a encontrar esta estrada?', 'Could you help me find this road?'],
                    ['Quanto tempo leva para chegar lá?', 'How long does it take to get there?'],
                    ['Leva cerca de quarenta minutos de ônibus.', 'It takes about forty minutes by bus.'],
                    ['Qual é a distância do lago até aqui?', 'How far is the lake from here?'],
                    ['Qual é a melhor forma de chegar ao vilarejo?', 'What’s the best way to get to the village?']
                ],
                oralTest: [
                    ['Locate', 'Locate a destination using between, across from, and on.', 'The clinic is on River Street, between the bank and the café, across from the park.'],
                    ['Give directions', 'Explain a route with four steps and two landmarks.', 'Go along this road, cross the bridge, walk past the school, and turn at the tower.'],
                    ['Ask for help', 'Your phone has no signal. Ask someone to help you find a hotel.', 'Excuse me. Could you help me find the Green Valley Hotel?'],
                    ['Time and distance', 'Ask how far the hotel is and how long the journey takes.', 'How far is the hotel from here? How long does it take by car?']
                ],
                errorClinic: [
                    ['Location', 'The café is between the bank.', 'The café is between the bank and the bakery.'],
                    ['Corner', 'The hotel is in the corner.', 'The hotel is on the corner.'],
                    ['Movement', 'Walk across this street for two blocks.', 'Walk along this street for two blocks.'],
                    ['Help', 'Could you help me finding the road?', 'Could you help me find the road?'],
                    ['Duration', 'How long does it takes?', 'How long does it take?'],
                    ['Transport', 'It takes twenty minutes with bus.', 'It takes twenty minutes by bus.']
                ],
                recap: [
                    ['Route check', 'Listen to a route, repeat its main steps, and ask one clarification question.', 'Let me check that: I cross the bridge and turn left. Do I go past the school?'],
                    ['Choose a route', 'Compare two options and justify the best one for a traveler with luggage.', 'The direct bus is better because it has no transfers and requires less walking.'],
                    ['Voice message', 'Leave a short message explaining where you are and how someone can find you.', 'I am beside the gas station, across from the supermarket. Turn right at the roundabout.'],
                    ['Second attempt', 'Repeat one route after feedback, correcting one preposition and adding one landmark.', 'Walk along Lake Road, go past the school, and turn right at the clock tower.']
                ],
                contract: {
                    scenario: 'Você está em uma região desconhecida sem acesso ao mapa. Precisa identificar sua localização, pedir ajuda, confirmar uma rota e escolher como chegar ao destino.',
                    rounds: [
                        ['Primeira tentativa', 'Peça ajuda e explique o destino.', 'Use uma pergunta clara e confirme o ponto inicial.'],
                        ['Mudança inesperada', 'Uma estrada fecha ou o transporte atrasa.', 'Escolha outra rota e explique tempo e distância.'],
                        ['Segunda tentativa', 'Repita as instruções depois do feedback.', 'Corrija a preposição prioritária e acrescente um landmark.']
                    ],
                    teacherFocus: 'Escolha um único foco entre preposição de localização, movimento, How long does it take e transporte com by/on foot.',
                    cefrEvidence: 'O aluno compreende e transmite instruções de rota, pede esclarecimento e toma uma decisão prática usando distância e duração em nível A2.',
                    oralInteractionMinutes: 39
                }
            },
            reviewListening: {
                title: 'Lost Near Pine Lake',
                script: 'Rita and Daniel were driving to a guesthouse near Pine Lake when their phone lost its signal. They had already left the main highway and could not see any road signs. After ten minutes, they reached a small gas station beside an old bridge. Rita asked the attendant for help. He explained that the guesthouse was approximately nine kilometers away. They needed to go back across the bridge, turn right at the first intersection, and continue along Forest Road. After a large white church, they had to take a narrow road on the left. Daniel repeated the directions and asked how long the journey would take. The attendant estimated fifteen minutes, but warned them about roadwork near the church. Five minutes later, they found the church, but the narrow road was closed. Instead of continuing, they returned to the gas station and asked about another route. This time, the attendant drew a simple map and showed them a longer but safer road around the lake.',
                questions: [
                    ['Where were Rita and Daniel going?', 'They were going to a guesthouse near Pine Lake.'],
                    ['Why could they not use their phone?', 'The phone had lost its signal.'],
                    ['Where did they stop to ask for help?', 'They stopped at a gas station beside an old bridge.'],
                    ['How far was the guesthouse?', 'It was approximately nine kilometers away.'],
                    ['Which landmark came before the narrow road?', 'A large white church came before it.'],
                    ['How long did the attendant estimate the journey would take?', 'He estimated fifteen minutes.'],
                    ['What unexpected problem did they find?', 'The narrow road was closed.'],
                    ['How did they finally solve the problem?', 'They returned, asked again, and received a map with another route.']
                ]
            },
            reviewSpeaking: [
                ['Listening reconstruction', 'Retell Rita and Daniel’s journey: destination, problem, first route, unexpected condition and solution.', 'Organize the account with first, then, but, so and finally.'],
                ['Location detective', 'You can see a church, a bridge and a gas station. Ask questions to identify your location.', 'Is the gas station beside the bridge? Is the church across from the road?'],
                ['Route from landmarks', 'Use three landmarks supplied orally to construct a route.', 'Start at the bridge, go past the church, and turn left at the gas station.'],
                ['Time comparison', 'Compare a direct taxi, a bus with a transfer, and walking. Ask for missing information before choosing.', 'How long does each option take? How far is the walk? What is the fare?'],
                ['Closed road', 'A road in your route is closed. Explain an alternative without using a map.', 'Go back to the intersection, turn right, and follow the road around the lake.'],
                ['Clarification', 'You did not understand one landmark and one number. Ask two clarification questions.', 'Did you say the white church or the white house? Did you say fifteen or fifty minutes?'],
                ['Personal route', 'Explain a real route from your home to another place and answer follow-up questions.', 'Include starting point, landmarks, distance, transportation and approximate time.'],
                ['Final mission', 'Give complete directions, receive one changed condition, adapt the route and give the final instructions again.', 'Do not read a prepared script; preserve the destination and change only the affected steps.']
            ]
        }
    }));
}());
