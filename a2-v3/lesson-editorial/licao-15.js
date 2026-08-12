(function () {
    'use strict';

    window.V3LessonEditorial.register('a2-v3', 15, data => ({
        ...data,
        bank: {
            ...data.bank,
            reviewListening: {
                title: 'A first solo trip',
                script: 'Carolina has traveled with her family many times, but last month she traveled alone for the first time. She has always wanted to visit Salvador, so she booked a short trip for her birthday. Before the trip, she had never stayed in a hotel alone. She felt nervous when she arrived, but the receptionist was friendly and gave her a map. Carolina visited two museums, tried local food, and joined a walking tour. She has already recommended the tour to three friends. She has not planned her next solo trip yet, but she says the experience made her more confident.',
                questions: [
                    ['Had Carolina traveled alone before last month?', 'No, she had not.'],
                    ['Why did she choose Salvador?', 'She had always wanted to visit it and traveled for her birthday.'],
                    ['How did she feel when she arrived?', 'She felt nervous.'],
                    ['Which activities did she do during the trip?', 'She visited museums, tried local food, and joined a walking tour.'],
                    ['Has she planned another solo trip yet?', 'No, she has not planned one yet.']
                ]
            },
            reviewSpeaking: [
                ['Experience question', 'Ask whether someone has ever traveled alone.', 'Have you ever traveled alone?'],
                ['Follow-up', 'After a positive answer, ask when, where and why.', 'When did you go? Where did you stay? Why did you choose that place?'],
                ['Experience and detail', 'Describe one experience and then give a finished-time detail.', 'I have visited Rio. I went there in 2024.'],
                ['Ever and never', 'Say one thing you have done and one thing you have never done.', 'I have tried surfing, but I have never traveled alone.'],
                ['Been or gone', 'Explain where someone is using been and gone.', 'Ana has been to the bank before, but she has gone there now.'],
                ['Interview', 'Answer four follow-up questions about a memorable experience.', 'I went with my sister, stayed for three days, and enjoyed the local food.'],
                ['Second attempt', 'Give a connected one-minute account with experience, date, detail and result.', 'I have traveled alone once. I went last year, stayed downtown, and became more confident.']
            ]
        }
    }));
}());
