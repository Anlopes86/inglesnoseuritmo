(function installIcelandConversationSpecial(globalScope) {
    'use strict';

    const expressions = [
        {
            term: 'To live up to expectations',
            meaning: 'To be as good as you hoped or expected.',
            example: 'The northern landscape lived up to every expectation I had before the trip.',
            practice: 'The place looked incredible online, but did it _____ _____ _____ _____ in real life? → {gap}'
        },
        {
            term: 'A breathtaking view',
            meaning: 'A view that is extremely beautiful or impressive.',
            example: 'We stopped the car because the coast offered a breathtaking view.',
            practice: 'We turned a corner and suddenly saw _____ _____ _____ across the water. → {gap}'
        },
        {
            term: 'A sight to behold',
            meaning: 'Something extremely impressive or beautiful to look at.',
            example: 'The glacier under the evening light was a sight to behold.',
            practice: 'Under the changing sky, the black-sand coast was truly _____ _____ _____ _____. → {gap}'
        },
        {
            term: 'To brave the weather',
            meaning: 'To go outside despite difficult weather conditions.',
            example: 'We braved the weather to see the waterfall before leaving the area.',
            practice: 'The wind was strong, but we decided _____ _____ _____ _____ and continue. → {gap}'
        },
        {
            term: 'Worth the journey',
            meaning: 'Good or special enough to justify the time and effort of getting there.',
            example: 'The remote waterfall was difficult to reach but completely worth the journey.',
            practice: 'The long drive was tiring, but the final view was _____ _____ _____. → {gap}'
        },
        {
            term: 'To take it all in',
            meaning: 'To pause and fully notice or enjoy everything around you.',
            example: 'I put my phone away for a moment and tried to take it all in.',
            practice: 'Instead of taking another photo, we stopped _____ _____ _____ _____ _____. → {gap}'
        }
    ];

    const lesson = {
        label: 'Iceland Special',
        title: 'Back from Iceland: Stories, Surprises & Memories',
        icon: 'fa-earth-europe',
        accent: 'cyan',
        warmupTitle: 'Warm-up: Take Me Back to Iceland',
        warmupIntro: 'This class begins with your real memories. There are no right answers—only details worth hearing.',
        warmups: [
            'What is the first image that comes to mind when you hear the word Iceland now?',
            'Which three words best describe your trip, and why did you choose them?',
            'What was better than you expected, and what was more difficult than you expected?',
            'When did you feel most aware that you were very far from home?'
        ],
        expressions,
        songs: [
            {
                title: 'Way Down We Go',
                artist: 'KALEO',
                angle: 'An Icelandic band brings a dark, powerful sound that matches the dramatic and sometimes intimidating side of the landscape.',
                discussionTitle: 'Going down into Iceland’s wilder side',
                questions: [
                    'The title suggests going down. Did any part of your trip take you down into a cave, valley, beach, canyon, or waterfall path?',
                    'Which Icelandic landscape best matches the song’s dark and powerful mood?',
                    'Was there a moment when the weather or landscape made you feel very small?',
                    'Is Iceland’s wild and uncomfortable side part of what makes it beautiful?'
                ]
            },
            {
                title: 'From The Start',
                artist: 'Laufey',
                angle: 'A warm, intimate song by an Icelandic artist creates space to revisit first impressions and the quieter side of the journey.',
                discussionTitle: 'First impressions and quiet memories',
                questions: [
                    'From the start of the trip, what immediately felt different from Brazil?',
                    'Which quiet or cozy moment from the trip fits this song’s softer mood?',
                    'Did Reykjavík feel like you imagined an Icelandic capital would feel?',
                    'Which small detail became more memorable than a famous attraction?'
                ]
            },
            {
                title: 'Little Talks',
                artist: 'Of Monsters and Men',
                angle: 'The back-and-forth voices of an Icelandic band invite stories about travel companions, local encounters, and conversations along the way.',
                discussionTitle: 'The conversations that became part of the trip',
                questions: [
                    'The song feels like a conversation. Which conversation from the trip do you still remember clearly?',
                    'What did you and your travel companions talk about most while moving between places?',
                    'Did you have an interesting, funny, or helpful interaction with a local person?',
                    'Can a short conversation change the way you remember a place?'
                ]
            }
        ],
        contexts: [
            {
                title: 'The Trip in Four Moments',
                kicker: 'Rebuild the journey through memory, not chronology.',
                intro: 'Choose one real memory for each card. Add where you were, who was there, what happened, and how you felt.',
                prompt: 'Which of these four moments would you tell first to make someone curious about Iceland?',
                cards: [
                    { title: 'Arrival', text: 'The first moment that made the trip feel real.' },
                    { title: 'The First Wow', text: 'The first place or view that stopped you in your tracks.' },
                    { title: 'The Surprise', text: 'Something funny, difficult, strange, or completely unexpected.' },
                    { title: 'The Last Impression', text: 'The memory or feeling you carried home.' }
                ],
                icon: 'fa-route'
            },
            {
                title: 'Expectation vs. Reality',
                kicker: 'Compare the Iceland in your imagination with the Iceland you experienced.',
                intro: 'Before the trip, you had ideas from photos, videos, weather reports, and other travelers. Decide where reality confirmed or changed those ideas.',
                prompt: 'Which difference between expectation and reality surprised you most?',
                cards: [
                    { title: 'Weather', text: 'Temperature, wind, rain, daylight, and how quickly conditions changed.' },
                    { title: 'Landscapes', text: 'Scale, colors, silence, distances, and how places looked beyond the camera.' },
                    { title: 'Daily Life', text: 'Food, prices, transport, language, people, shops, and routines.' },
                    { title: 'Tourism', text: 'Crowds, famous stops, quieter places, and what felt authentic.' }
                ],
                icon: 'fa-scale-balanced'
            }
        ],
        practice: expressions.map((item) => ({ text: item.practice, answer: item.term })),
        speaking: {
            title: 'The Story Behind One Photo',
            icon: 'fa-camera-retro',
            instruction: 'Choose one real photo from the trip and use all four prompts to tell the complete story behind it.',
            prompts: [
                'Where were you, who was with you, and what can we see in the photo?',
                'What happened immediately before and after this picture was taken?',
                'What could you hear, smell, feel, or notice that the photo does not show?',
                'Why would you keep this photo if you could save only one image from the trip?'
            ],
            support: [
                'It lived up to my expectations',
                'The most breathtaking part was…',
                'What the photo does not show is…',
                'I was trying to take it all in'
            ]
        },
        homework: [
            'Write a travel diary entry about one unforgettable day in Iceland. Include the route, one challenge, one sensory detail, and the moment you most want to remember.',
            'Write an honest Iceland guide for a friend. Give five practical recommendations based on your experience and include one thing you would do differently.',
            'Write an expectation-versus-reality reflection about Iceland. Compare what you imagined before the trip with what you discovered about the landscape, weather, culture, or daily life.'
        ],
        closing: 'The best travel stories begin where the photos stop.'
    };

    globalScope.CONVERSATION_SPECIAL_LESSONS = Object.freeze({
        9001: Object.freeze(lesson)
    });
}(window));
