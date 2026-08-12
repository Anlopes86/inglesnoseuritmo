(function () {
    'use strict';

    window.V3LessonEditorial.register('c1-v3', 1, lesson => ({
        ...lesson,
        practice: [
            { label: 'Reframe', prompt: 'Open with the consequence, then move back to the chain of events that produced it.', answer: 'The breakdown was avoidable. For months, minor warnings had been dismissed as isolated incidents.' },
            { label: 'Shift perspective', prompt: 'Recast the account from institutional distance to personal immediacy.', answer: 'What the report calls a minor disruption felt, to those present, like a complete loss of control.' },
            { label: 'Aspect choice', prompt: 'Explain the contrast: had been monitoring / monitored / was monitoring.', answer: 'The forms foreground prior duration, a completed action, or an activity in progress at the reference point.' },
            { label: 'Compression', prompt: 'Combine four chronological statements into two sentences without obscuring the timeline.', answer: 'Having ignored repeated warnings, the team continued the rollout. Only after the system had failed did management suspend it.' },
            { label: 'Controlled narrative', prompt: 'Deliver a 45-second account with one flashback and one explicit return to the present frame.', answer: 'A clear response establishes the present frame, signals the flashback and marks the return unambiguously.' },
            { label: 'Editorial judgment', prompt: 'Choose which event deserves foregrounding for a technical audience and justify the decision.', answer: 'Foreground the event that changes the causal interpretation, then retain the remaining chronology as supporting context.' }
        ]
    }));
}());
