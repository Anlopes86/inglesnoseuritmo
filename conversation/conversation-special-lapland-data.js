(function installLaplandConversationSpecial(globalScope) {
    'use strict';

    const expressions = [
        {
            term: 'Bundle up',
            meaning: 'To put on several layers of warm clothes.',
            example: 'We bundled up before leaving for the aurora hunt.',
            practice: 'It was freezing outside, so everyone had to _____ _____. → {gap}'
        },
        {
            term: 'A waiting game',
            meaning: 'A situation in which you need patience because you cannot control when something will happen.',
            example: 'Aurora hunting became a waiting game once the clouds arrived.',
            practice: 'After midnight, the experience turned into _____ _____ _____. → {gap}'
        },
        {
            term: 'Keep an eye on the sky',
            meaning: 'To watch the sky carefully for a change or event.',
            example: 'The guide told us to keep an eye on the sky while we warmed up.',
            practice: 'Even during the break, we continued to _____ _____ _____ _____ _____ _____. → {gap}'
        },
        {
            term: 'Fingers crossed',
            meaning: 'An expression used when you strongly hope that something will happen.',
            example: 'The forecast improved, so we waited with our fingers crossed.',
            practice: 'The clouds were finally moving away—_____ _____! → {gap}'
        },
        {
            term: 'In the middle of nowhere',
            meaning: 'In a very remote place, far from towns and other people.',
            example: 'We stopped in the middle of nowhere, away from the city lights.',
            practice: 'Soon we were standing _____ _____ _____ _____ _____, surrounded by snow and silence. → {gap}'
        },
        {
            term: 'The sky lit up',
            meaning: 'The sky suddenly became bright or full of color.',
            example: 'After a long wait, the sky lit up above the trees.',
            practice: 'Just when we were ready to leave, _____ _____ _____ _____. → {gap}'
        }
    ];

    const lesson = {
        label: 'Lapland Special',
        title: 'Chasing the Northern Lights',
        icon: 'fa-snowflake',
        accent: 'cyan',
        warmupTitle: 'Warm-up: Back from the Arctic',
        warmupIntro: 'Start with the memories that come naturally. The details of the real trip will guide the conversation.',
        warmups: [
            'What is the first moment that comes to mind when you think about this trip to Lapland?',
            'Which three words describe this particular trip best, and why?',
            'How has working as an aurora guide changed the way you experience the northern lights?',
            'Apart from the northern lights, what was the best moment of the trip?'
        ],
        expressions,
        songs: [
            {
                title: 'In the Shadows',
                artist: 'The Rasmus',
                angle: 'Our first musical stop is Finland, represented by one of the country’s best-known rock bands.',
                discussionTitle: 'Before the hunt: planning for other people',
                questions: [
                    'What do guests usually ask before an aurora hunt begins?',
                    'How do you explain the chances of seeing the lights without discouraging people?',
                    'What clothing or preparation do visitors most often underestimate?',
                    'Which part of the job requires more planning than guests probably realize?'
                ]
            },
            {
                title: 'Take on Me',
                artist: 'a-ha',
                angle: 'The route continues through Norway with a-ha, adding another country from the Lapland region to our soundtrack.',
                discussionTitle: 'During the hunt: leading the group',
                questions: [
                    'How do you decide whether the group should stay in one place or keep moving?',
                    'How do you keep people comfortable and interested during a long wait?',
                    'Which signs in the weather or sky are you always watching?',
                    'What is the most memorable reaction you have seen from a guest?'
                ]
            },
            {
                title: 'Lovefool',
                artist: 'The Cardigans',
                angle: 'The final musical stop is Sweden, completing our three-country soundtrack for Lapland.',
                discussionTitle: 'After the lights: the guide’s perspective',
                questions: [
                    'What do you enjoy most about watching someone see the aurora for the first time?',
                    'Which expectations from photos do you often need to correct?',
                    'Does the aurora still feel magical when seeing it is also part of your work?',
                    'Which story from this Lapland trip will be useful or entertaining when you guide future groups?'
                ]
            }
        ],
        contexts: [
            {
                title: 'Behind the Scenes of an Aurora Guide',
                kicker: 'Guests watch the sky; the guide manages the whole experience.',
                intro: 'Explain what you need to consider in each area before and during a real aurora hunt.',
                prompt: 'Which responsibility requires the most judgment from the guide?',
                cards: [
                    { title: 'Forecast', text: 'Interpret changing conditions and explain uncertainty honestly.' },
                    { title: 'Route', text: 'Choose a dark, accessible, and safe place for the group.' },
                    { title: 'People', text: 'Notice cold, tiredness, fear, impatience, and excitement.' },
                    { title: 'Plan B', text: 'Make the night worthwhile even if the aurora does not appear.' }
                ],
                icon: 'fa-clock-rotate-left'
            },
            {
                title: 'One Night, Two Perspectives',
                kicker: 'The guests and the guide can experience the same night very differently.',
                intro: 'Compare what usually receives the guests’ attention with everything the guide is noticing at the same time.',
                prompt: 'When can the guide stop working for a moment and simply enjoy the sky?',
                cards: [
                    { title: 'The Guests', text: 'The lights, the photos, the excitement, and the possibility of disappointment.' },
                    { title: 'The Guide', text: 'Time, weather, route, safety, visibility, and the next decision.' },
                    { title: 'The Group', text: 'Different needs, reactions, energy levels, and expectations.' },
                    { title: 'The Personal Moment', text: 'The point when the guide can also pause and take it all in.' }
                ],
                icon: 'fa-camera'
            }
        ],
        practice: expressions.map((item) => ({ text: item.practice, answer: item.term })),
        speaking: {
            title: 'The Guide’s Pre-Hunt Briefing',
            icon: 'fa-microphone-lines',
            instruction: 'Imagine that you are meeting tonight’s group just before departure. Use all four prompts to give a friendly and realistic briefing.',
            prompts: [
                'What should the group realistically expect from the weather and the aurora?',
                'What should everyone wear, bring, and do before leaving?',
                'What may happen during the waiting, and how can people stay comfortable?',
                'How can the group help keep the night safe, positive, and enjoyable?'
            ],
            support: [
                'The forecast suggests…',
                'There is no guarantee, but…',
                'Please bundle up and…',
                'If the lights do not appear…'
            ]
        },
        homework: [
            'Write “A Night from the Guide’s Point of View,” a 120–180-word story. Include one important decision, one guest reaction, and something unexpected.',
            'Write a 120–180-word welcome message for tonight’s group. Set realistic expectations, explain what to bring, describe the plan, and help everyone feel prepared.',
            'Write an honest 120–180-word aurora-hunt FAQ. Include four questions visitors often ask about the forecast, cold, photos, waiting, or the possibility of not seeing the lights.'
        ],
        closing: 'Some journeys are about reaching a place. Others are about waiting for the sky to surprise you.'
    };

    globalScope.CONVERSATION_SPECIAL_LESSONS = Object.freeze({
        ...(globalScope.CONVERSATION_SPECIAL_LESSONS || {}),
        9002: Object.freeze(lesson)
    });
}(window));
