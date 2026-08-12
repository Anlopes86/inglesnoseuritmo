(function () {
    'use strict';

    window.V3LessonEditorial.register('a2-v3', 3, data => ({
        ...data,
        title: 'Conversation Activities 1: A Trip Abroad',
        bank: {
            ...data.bank,
            label: 'conversation review vacation weather travel preferences',
            matchLabel: 'conversation review vacation weather travel preferences',
            introDialogue: [
                ['Friend', 'Welcome back! How was your trip?'],
                ['Traveler', 'It was great, but the weather was different from what I expected.'],
                ['Friend', 'What was the destination like?'],
                ['Traveler', 'The coast was quieter than the capital and much more relaxing.'],
                ['Friend', 'What did you enjoy doing there?'],
                ['Traveler', 'I enjoyed walking by the water and talking to local people.'],
                ['Friend', 'Did the weather change any of your plans?'],
                ['Traveler', 'Yes. It was stormy one afternoon, so I visited an indoor market.'],
                ['Friend', 'Would you recommend the trip?'],
                ['Traveler', 'Definitely. The experience was different from my plan, but I made the most of it.']
            ],
            dialogues: [
                [
                    ['Friend', 'Welcome back! What was the island like?'],
                    ['Traveler', 'It was greener and more peaceful than I expected.'],
                    ['Friend', 'Was the weather different from the forecast?'],
                    ['Traveler', 'A little. The mornings were sunny, but it rained most afternoons.'],
                    ['Friend', 'What did you enjoy doing there?'],
                    ['Traveler', 'I enjoyed hiking early and visiting cafés when the rain started.'],
                    ['Friend', 'It sounds like you had a flexible plan.'],
                    ['Traveler', 'I had to. The weather changed very quickly.']
                ],
                [
                    ['Guest', 'Is tomorrow a good day to visit the national park?'],
                    ['Guide', 'The morning will be mild, but heavy showers are possible after two.'],
                    ['Guest', 'I love taking photos outdoors. Which trail has the best scenery?'],
                    ['Guide', 'The lake trail is more beautiful than the forest trail, but it is also longer.'],
                    ['Guest', 'Is it very different from the path near the hotel?'],
                    ['Guide', 'Yes. It is steeper and much less crowded.'],
                    ['Guest', 'Then I’ll leave early and check the forecast again at noon.']
                ],
                [
                    ['Friend', 'Do you prefer beach vacations or mountain vacations?'],
                    ['Student', 'I prefer beach vacations because I enjoy swimming and walking by the water.'],
                    ['Friend', 'What kind of weather do you like?'],
                    ['Student', 'I like warm, sunny days, but I hate sleeping when it is very humid.'],
                    ['Friend', 'What do you do when it rains?'],
                    ['Student', 'I usually visit a museum or try a local restaurant.'],
                    ['Friend', 'So bad weather does not completely ruin the trip?'],
                    ['Student', 'No. A different activity can still make the day interesting.']
                ],
                [
                    ['Receptionist', 'Good evening. How was your day tour?'],
                    ['Guest', 'The village was beautiful, but the return trip was longer than expected.'],
                    ['Receptionist', 'Did you get caught in the rain?'],
                    ['Guest', 'Yes, and I didn’t have an umbrella.'],
                    ['Receptionist', 'The forecast for tomorrow is better. It should clear up before breakfast.'],
                    ['Guest', 'That’s good. I enjoy exploring on foot, so I want to visit the old town.'],
                    ['Receptionist', 'It is worth a visit, especially early in the morning.']
                ]
            ],
            reviewPlan: {
                title: 'Conversation Activities 1: A Trip Abroad',
                focus: [
                    'Different from and comparative + than: contraste e comparação entre destinos, experiências e condições.',
                    'Weather and enjoy + -ing: clima, preferências e escolhas de atividades nas férias.'
                ],
                drills: [
                    ['Different from', 'The climate was ___ ours.', 'different from'],
                    ['Comparative', 'The village was ___ than the capital. (quiet)', 'quieter'],
                    ['Long comparative', 'The train was ___ than the bus. (comfortable)', 'more comfortable'],
                    ['Travel question', 'Ask for a description of the accommodation.', 'What was the accommodation like?'],
                    ['Weather', 'A short period of rain.', 'a shower'],
                    ['Verb-ing', 'I enjoy ___ new places. (explore)', 'exploring'],
                    ['Preference question', 'Ask about walking in cold weather.', 'Do you enjoy walking in cold weather?'],
                    ['Weather choice', 'It is stormy, ___ we are staying indoors.', 'so']
                ],
                focusSections: [
                    {
                        title: 'Different from e comparações com than',
                        focus: 'Different from and comparative + than: contraste e comparação entre destinos, experiências e condições.',
                        instruction: 'Revise a estrutura e use-a imediatamente para comparar lugares e experiências de viagem.',
                        items: [
                            ['Complete', 'The weather was different ___ the weather at home.', 'The weather was different from the weather at home.'],
                            ['Complete', 'The hotel was ___ than the apartment. (comfortable)', 'The hotel was more comfortable than the apartment.'],
                            ['Correct', 'The old town was more quiet than downtown.', 'The old town was quieter than downtown.'],
                            ['Correct', 'The food was different that ours.', 'The food was different from ours.'],
                            ['Question', 'Ask for a description of the local market.', 'What was the local market like?'],
                            ['Personalize', 'Compare a destination with your hometown using different from and than.', 'The destination was different from my hometown because it was smaller and more peaceful.']
                        ]
                    },
                    {
                        title: 'Weather e preferências com verb-ing',
                        focus: 'Weather and enjoy + -ing: clima, preferências e escolhas de atividades nas férias.',
                        instruction: 'Revise o padrão e use-o em escolhas reais determinadas pelo clima.',
                        items: [
                            ['Complete', 'I enjoy ___ along the coast when it is mild. (walk)', 'I enjoy walking along the coast when it is mild.'],
                            ['Complete', 'She loves ___ photos when the sky is clear. (take)', 'She loves taking photos when the sky is clear.'],
                            ['Correct', 'We enjoy to visit local markets.', 'We enjoy visiting local markets.'],
                            ['Question', 'Ask whether someone enjoys traveling in cold weather.', 'Do you enjoy traveling in cold weather?'],
                            ['Weather decision', 'The afternoon will be stormy. Give a practical alternative with so.', 'The afternoon will be stormy, so we can visit the indoor market.'],
                            ['Personalize', 'Name one activity you enjoy doing in sunny weather and one you do not enjoy doing in rainy weather.', 'I enjoy swimming when it is sunny, but I do not enjoy driving when it is rainy.']
                        ]
                    }
                ],
                translations: [
                    ['Como foi sua viagem?', 'How was your trip?'],
                    ['Como era a cidade?', 'What was the city like?'],
                    ['O clima era diferente do nosso.', 'The weather was different from ours.'],
                    ['A vila era mais tranquila do que a capital.', 'The village was quieter than the capital.'],
                    ['A hospedagem era mais confortável do que eu esperava.', 'The accommodation was more comfortable than I expected.'],
                    ['Eu gosto de explorar lugares novos a pé.', 'I enjoy exploring new places on foot.'],
                    ['Você gosta de viajar quando está frio?', 'Do you enjoy traveling when it is cold?'],
                    ['Estava chovendo, então nós ficamos em um ambiente fechado.', 'It was raining, so we stayed indoors.']
                ],
                oralTest: [
                    ['Warm-up', 'Welcome the teacher back from a trip and ask two natural questions.', 'Welcome back! How was your trip? What was the city like?'],
                    ['Compare', 'Compare the destination with your hometown in two ways.', 'It was different from my hometown. It was smaller but more peaceful.'],
                    ['Preferences', 'Say what you enjoy doing in two different weather conditions.', 'I enjoy walking when it is mild, and I like visiting museums when it is rainy.'],
                    ['Plan change', 'The beach day is now stormy. Explain a new plan.', 'It is going to be stormy, so we can visit the old market and have lunch downtown.']
                ],
                errorClinic: [
                    ['Different from', 'The climate was different that ours.', 'The climate was different from ours.'],
                    ['Short comparative', 'The village was more quiet than the city.', 'The village was quieter than the city.'],
                    ['Long comparative', 'The hotel was comfortabler than the apartment.', 'The hotel was more comfortable than the apartment.'],
                    ['Enjoy + -ing', 'I enjoy to explore new places.', 'I enjoy exploring new places.'],
                    ['Preference question', 'Do you enjoy to swim?', 'Do you enjoy swimming?'],
                    ['Weather description', 'Today has windy.', 'It is windy today.']
                ],
                recap: [
                    ['Travel summary', 'Give a 45-second description of a trip: destination, contrast, weather and activities.', 'The destination was different from my city. It was warmer, and I enjoyed walking by the beach.'],
                    ['Follow-up chain', 'Answer a question and continue with one relevant detail before the teacher asks the next question.', 'It was more peaceful than I expected, especially in the morning.'],
                    ['Message', 'Create a short voice message recommending a destination and warning about the weather.', 'The town is worth a visit, but check the forecast because the weather changes quickly.'],
                    ['Second attempt', 'Repeat one answer after feedback, improving one grammar point and adding one detail.', 'The hotel was more comfortable than I expected, and it was close to the old town.']
                ],
                contract: {
                    scenario: 'Você voltou de uma viagem. Durante a conversa, você recebe perguntas, faz comparações e reage a uma mudança inesperada na previsão do tempo.',
                    rounds: [
                        ['Primeira tentativa', 'Descreva a viagem com o apoio das perguntas.', 'Use frases completas e detalhes compreensíveis.'],
                        ['Mudança inesperada', 'O tempo muda e uma atividade deixa de ser possível.', 'Escolha uma alternativa e explique sua decisão.'],
                        ['Segunda tentativa', 'Repita o relato depois de um foco de correção.', 'Melhore precisão, clareza e desenvolvimento.']
                    ],
                    teacherFocus: 'Escolha apenas um foco prioritário entre different from, comparativo + than e verb-ing. Dê feedback antes da segunda tentativa.',
                    cefrEvidence: 'O aluno compreende um relato curto, responde a perguntas de detalhe, compara lugares e explica preferências e decisões simples em nível A2.',
                    oralInteractionMinutes: 39
                }
            },
            reviewListening: {
                title: 'Maya’s Changing Island Plan',
                script: 'Maya returned from a six-day vacation on a small island. Before the trip, she imagined spending every day on the beach because the online photos showed clear skies and calm water. The real weather was different from the photos. The first two days were hotter and more humid than she expected, and on Wednesday the forecast announced strong wind and afternoon showers. Maya loves swimming, but she does not enjoy sitting on a windy beach. She changed her plan and joined a food tour in the old town. The guide was friendlier than she expected and introduced the group to several local dishes. On Thursday morning, the sky cleared up. Maya got up early, walked along the coast, and finally went swimming before breakfast. When she got back home, her brother asked if the bad weather had ruined the vacation. Maya said no. She explained that changing her plan helped her discover a more interesting side of the island.',
                questions: [
                    ['How long was Maya’s vacation?', 'It was six days long.'],
                    ['What did she imagine doing before the trip?', 'She imagined spending every day on the beach.'],
                    ['How was the real weather different from the photos?', 'It was hotter and more humid, and later there were strong winds and showers.'],
                    ['Why did Maya change her beach plan?', 'She does not enjoy sitting on a windy beach.'],
                    ['Which alternative activity did she choose?', 'She joined a food tour in the old town.'],
                    ['How did the guide compare with her expectation?', 'The guide was friendlier than she expected.'],
                    ['What happened on Thursday morning?', 'The sky cleared up, and Maya walked along the coast and went swimming.'],
                    ['What did Maya learn from changing her plan?', 'She discovered a more interesting side of the island.']
                ]
            },
            reviewSpeaking: [
                ['Interview', 'You have returned from a trip. Answer the teacher’s questions about destination, accommodation, weather and activities.', 'Use full answers and add one detail before the next question.'],
                ['Compare two places', 'Compare the destination with your hometown in at least three ways.', 'Use different from, one short comparative and one long comparative.'],
                ['Weather preferences', 'Explain which weather you enjoy and which conditions you dislike on vacation.', 'I enjoy walking in mild weather, but I hate traveling during a heat wave.'],
                ['Plan the day', 'Morning: sunny and mild. Afternoon: stormy. Create a complete vacation plan.', 'We can hike in the morning and visit an indoor market in the afternoon.'],
                ['Unexpected condition', 'The museum is closed and heavy rain starts. Choose another activity and justify it.', 'We can go to a local café because it is nearby and we can stay indoors.'],
                ['Ask follow-up questions', 'The teacher says, “My trip was better than I expected.” Ask four questions that develop the conversation.', 'Where did you go? What was it like? What was better than expected? What did you enjoy doing?'],
                ['Recommend', 'Recommend a destination for someone who enjoys cool weather and walking outdoors.', 'Give a place, two reasons, one comparison and one weather warning.'],
                ['Final retelling', 'Retell Maya’s listening story without seeing the script. Include the original plan, the problem, the change and the result.', 'Use first, but, so, later and in the end to organize the answer.']
            ]
        }
    }));
}());
