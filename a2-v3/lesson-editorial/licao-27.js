(function () {
    'use strict';

    window.V3LessonEditorial.register('a2-v3', 27, data => ({
        ...data,
        bank: {
            ...data.bank,
            reviewListening: {
                title: 'The best option for a short break',
                script: 'Ana and Bruno are choosing a place for a three-day holiday. Ana thinks Lakeview is the most relaxing option because it has the quietest hotels and the best walking routes. Bruno prefers Coast City. It is farther away and more expensive, but it has the largest food market and the most interesting museums. The weather may influence their decision. If the forecast is sunny, they hope to spend time outdoors at Lakeview. Unless the weather improves, they will choose Coast City because it has more indoor activities. They are going to check the forecast on Thursday and book the trip that evening.',
                questions: [
                    ['Why does Ana prefer Lakeview?', 'It has quiet hotels and good walking routes.'],
                    ['Which place is farther and more expensive?', 'Coast City is farther and more expensive.'],
                    ['What does Coast City offer?', 'It has a large food market and interesting museums.'],
                    ['What will they do if the forecast is sunny?', 'They hope to spend time outdoors at Lakeview.'],
                    ['When are they going to make the final decision?', 'On Thursday evening.']
                ]
            },
            reviewSpeaking: [
                ['Rank', 'Rank three places, activities or products from best to worst.', 'The park is the most relaxing place, the café is the most convenient, and the station is the noisiest.'],
                ['Evidence', 'Support your first choice with two concrete reasons.', 'It is the best choice because it is quiet and has the easiest route.'],
                ['Hope', 'Say what you hope will happen during a future plan.', 'I hope the weather will be sunny.'],
                ['Unless', 'Create one warning or consequence with unless.', 'Unless we book today, the price will increase.'],
                ['Intention', 'Explain what you are going to check before deciding.', 'I am going to check the price, the location, and the reviews.'],
                ['Changed condition', 'The cheapest option is suddenly unavailable. Make a new choice.', 'I will choose the second option because it is the most convenient one available.'],
                ['Final recommendation', 'Give a 45-second recommendation with ranking, evidence and hope.', 'Lakeview is the best option because it is quiet and affordable. I hope the weather stays sunny.']
            ]
        }
    }));
}());
