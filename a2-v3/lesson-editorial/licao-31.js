(function () {
    'use strict';

    window.V3LessonEditorial.register('a2-v3', 31, data => ({
        ...data,
        bank: {
            ...data.bank,
            reviewListening: {
                title: 'A trip, a change and a useful conversation',
                script: 'Last month, Diego planned a weekend trip with two friends. They were driving toward the coast when their car started making a strange noise. While one friend was calling roadside assistance, Diego compared two nearby hotels on his phone. The first was cheaper, but the second had better reviews and enough space for three people. They decided to book the second hotel. At reception, Diego asked if they could check in early because they had nowhere to wait. The receptionist explained that guests normally had to wait until two, but she offered to keep their bags and let them use the lounge. Diego and his friends have traveled together several times, but they say this was their most complicated trip. It was also one of the best examples of staying calm, asking clearly, and choosing a practical solution.',
                questions: [
                    ['Where were Diego and his friends going?', 'They were going toward the coast.'],
                    ['What happened while they were driving?', 'The car started making a strange noise.'],
                    ['Why did they choose the second hotel?', 'It had better reviews and enough space for three people.'],
                    ['What permission did Diego request?', 'He asked if they could check in early.'],
                    ['Which rule did the receptionist explain?', 'Guests normally had to wait until two.'],
                    ['What solution did she offer?', 'She kept their bags and let them use the lounge.'],
                    ['How did the group describe the trip?', 'It was their most complicated trip.']
                ]
            },
            reviewSpeaking: [
                ['Story', 'Tell a past story with a background action and an interruption.', 'We were driving home when the car broke down.'],
                ['Sequence', 'Add a clear beginning, middle and ending to the story.', 'First we stopped safely. Then we called for help. In the end, a mechanic arrived.'],
                ['Comparison', 'Compare two possible solutions and choose one.', 'The bus is cheaper, but the taxi is faster. I would choose the taxi.'],
                ['Quantity', 'Explain what a group needs for a short trip.', 'We need enough water, a few snacks, and a little cash.'],
                ['Plan and arrangement', 'Describe a plan and one confirmed arrangement.', 'We are going to travel on Saturday, and we are meeting at the station at seven.'],
                ['Request', 'Make a polite request in a hotel or public place.', 'Could we leave our bags here before check-in?'],
                ['Rule and necessity', 'Explain one rule and one necessary action.', 'Guests must show ID, and we have to check out before noon.'],
                ['Experience interview', 'Answer Have you ever...? and give a finished-time detail.', 'Yes, I have. I traveled alone last year.'],
                ['Second performance', 'Connect story, choice and result in a 90-second response.', 'While we were traveling, the car broke down. We compared two options, chose the faster one, and arrived safely.']
            ]
        }
    }));
}());
