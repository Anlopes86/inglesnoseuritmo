(function () {
    'use strict';

    window.V3LessonEditorial.register('a2-v3', 12, data => ({
        ...data,
        bank: {
            ...data.bank,
            reviewListening: {
                title: 'The community gym',
                script: 'Ravi wants to use the community gym for the first time. At reception, he asks if he can leave his bicycle near the entrance. The receptionist says bicycles must stay outside in the bike area. Ravi also asks whether he can borrow a towel. She explains that members can borrow one, but they have to return it before leaving. Everyone must wear clean shoes in the exercise room, and visitors need to show identification. Ravi has forgotten his ID, so the receptionist suggests downloading the digital card from the gym app. He follows her advice and enters a few minutes later.',
                questions: [
                    ['What did Ravi ask about first?', 'He asked where he could leave his bicycle.'],
                    ['Where must bicycles stay?', 'They must stay outside in the bike area.'],
                    ['What does Ravi have to do with the towel?', 'He has to return it before leaving.'],
                    ['What had Ravi forgotten?', 'He had forgotten his identification.'],
                    ['How did the receptionist solve the problem?', 'She suggested downloading the digital card.']
                ]
            },
            reviewSpeaking: [
                ['Polite request', 'Ask to borrow an item for a short time.', 'Could I borrow a towel for a few minutes, please?'],
                ['Permission', 'Ask if you can leave something near the entrance.', 'Can I leave my bicycle near the entrance?'],
                ['Rule', 'Explain one important rule using must or must not.', 'Visitors must show identification.'],
                ['Necessity', 'Explain two things a new member has to do.', 'A new member has to register and wear clean shoes.'],
                ['Solve the problem', 'The visitor has no physical ID and no battery. Offer another solution.', 'You can use the reception phone to call someone, or you can return with your ID.'],
                ['Personal context', 'Describe rules and permissions in a place you know.', 'At my workplace, visitors have to wear a badge, but they can use the cafeteria.']
            ]
        }
    }));
}());
