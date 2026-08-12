(function () {
    'use strict';

    window.V3LessonEditorial.register('a2-v3', 30, data => ({
        ...data,
        bank: {
            ...data.bank,
            reviewListening: {
                title: 'A deadline under pressure',
                script: 'Beatriz has to send a project proposal by Friday at noon. On Wednesday, a coworker asks her to add two new sections. Beatriz knows she cannot complete everything alone, so she asks for help instead of working all night. Her manager says she should finish the budget first because the client needs those numbers for a meeting. He also advises her to send the introduction on Thursday and the complete document on Friday morning. Beatriz follows the plan and stops checking email for one hour so she can concentrate. By eleven thirty on Friday, the proposal is ready. She sends it before the deadline and keeps a copy for the meeting.',
                questions: [
                    ['When is the project deadline?', 'It is Friday at noon.'],
                    ['What changed on Wednesday?', 'A coworker asked Beatriz to add two sections.'],
                    ['What should Beatriz finish first?', 'She should finish the budget first.'],
                    ['What did she stop doing for one hour?', 'She stopped checking email.'],
                    ['Did she send the proposal on time?', 'Yes, she sent it before the deadline.']
                ]
            },
            reviewSpeaking: [
                ['Deadline', 'Explain a task, its deadline and the first action you need to take.', 'I have to send the form by Friday, so I need to check the information first.'],
                ['Advice', 'Give two specific pieces of advice to someone with too much work.', 'You should choose one priority, and you should ask for help.'],
                ['Instead of', 'Suggest a better action using instead of + -ing.', 'Ask for help instead of working all night.'],
                ['Time sequence', 'Organize three actions with before, after and until.', 'Finish the budget before lunch, call the client after lunch, and work until four.'],
                ['Changed deadline', 'The client now needs the proposal Thursday afternoon. Negotiate a solution.', 'I can send the budget on Thursday and the complete proposal on Friday.'],
                ['Personal decision', 'Describe a situation when advice helped you make a decision.', 'I had too many tasks, and a colleague advised me to start with the shortest one.']
            ]
        }
    }));
}());
