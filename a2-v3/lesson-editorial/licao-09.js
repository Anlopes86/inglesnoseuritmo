(function () {
    'use strict';

    window.V3LessonEditorial.register('a2-v3', 9, data => ({
        ...data,
        bank: {
            ...data.bank,
            reviewListening: {
                title: 'A weekend plan that changed',
                script: 'Maya and Leo are going to spend Saturday at an outdoor market. They are meeting at the north entrance at nine thirty, and Maya is bringing breakfast. On Friday evening, the weather forecast changes. Heavy rain is expected after eleven. Leo calls Maya and says they will need a different plan. They decide to visit the indoor food market instead. Maya will send the new address, and Leo is going to reserve a table for lunch. They are still meeting at nine thirty, but now they are meeting at the subway station. Their activity changed, but their arrangement stayed clear.',
                questions: [
                    ['What were Maya and Leo originally going to do?', 'They were going to visit an outdoor market.'],
                    ['Where were they going to meet?', 'At the north entrance.'],
                    ['Why did they change the plan?', 'Because heavy rain was expected.'],
                    ['What immediate decision did Maya make?', 'She decided she would send the new address.'],
                    ['What arrangement stayed the same?', 'They were still meeting at nine thirty.']
                ]
            },
            reviewSpeaking: [
                ['Plan', 'Describe one plan you already have for next weekend.', 'I am going to visit my cousin on Saturday.'],
                ['Arrangement', 'Add a confirmed time, place and person to your plan.', 'I am meeting my cousin at the station at ten.'],
                ['Quick decision', 'Your original place is closed. Make an immediate decision with will.', 'I will look for another place now.'],
                ['Prediction', 'Make one prediction about the weather or the trip.', 'I think it will be crowded in the afternoon.'],
                ['Unexpected condition', 'The other person can only arrive two hours later. Reorganize the plan.', 'We are meeting at noon instead, and I am going to have breakfast at home.'],
                ['Role conversation', 'Answer questions about the complete plan without reading a model.', 'We are meeting at noon because the schedule changed.'],
                ['Second attempt', 'Present the original plan, the change and the final arrangement.', 'We were going to visit the outdoor market, but it may rain, so we will go indoors. We are meeting at noon.']
            ]
        }
    }));
}());
