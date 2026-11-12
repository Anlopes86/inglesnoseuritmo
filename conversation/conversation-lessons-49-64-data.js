(function () {
    'use strict';

    let songIndex = 0;
    const E = (term, meaning, example, practice) => ({ term, meaning, example, practice });
    const S = (title, artist, spotifyId, angle, discussionTitle, lens, questions) => {
        const patterns = [
            [
                `The story connects the topic to {gap}.`,
                `The overall mood feels {gap}.`,
                `A key contrast appears between the situation and {gap}.`
            ],
            [
                `The narrator seems most concerned with {gap}.`,
                `The sound gives the message a {gap} quality.`,
                `Listen for the tension between reality and {gap}.`
            ],
            [
                `The song invites us to notice {gap}.`,
                `Its emotional energy can be described as {gap}.`,
                `The final idea points toward {gap}.`
            ]
        ][songIndex++ % 3];
        return {
            title, artist, spotifyId, angle, discussionTitle, questions,
            listening: patterns.map((text, index) => ({ text, answer: lens[index] }))
        };
    };
    const C = (title, kicker, intro, prompt, cards, icon, { revealCards = false } = {}) => ({
        title, kicker, intro, prompt, cards, icon, revealCards
    });
    const P = (expressions) => expressions.map((item) => ({ text: item.practice, answer: item.term }));
    const lesson = (config) => ({ ...config, practice: P(config.expressions) });

    window.CONVERSATION_LESSONS_49_64 = {
        49: lesson({
            title: 'Names, Nicknames & Identity', icon: 'fa-id-badge', accent: 'rose',
            warmupTitle: 'Warm-up: What Should We Call You?',
            warmupIntro: 'A name can carry history, start a conversation, or become completely irrelevant when a perfect nickname arrives.',
            warmups: [
                'Do you know why your name was chosen?',
                'Who calls you something that would sound strange coming from anyone else?',
                'Have you ever wanted to change or shorten your name?',
                'Which names are easiest for you to remember?'
            ],
            expressions: [
                E('To go by a name', 'To use a particular name in daily life.', 'Her full name is Beatriz, but she goes by Bia.', 'At work, he prefers {gap} that is easier to pronounce.'),
                E('To be named after someone', 'To receive the name of another person.', 'Maya was named after her grandmother.', 'The character seems {gap} from an old family story.'),
                E('A nickname that sticks', 'An informal name that people continue using.', '“Professor” began as a joke but became a nickname that sticks.', 'One funny incident can create {gap}.'),
                E('To use an alias', 'To use a different name, often for privacy or a role.', 'The detective used an alias at the hotel.', 'A secret agent needs {gap} convincingly.'),
                E('To make a name for yourself', 'To become known for your work or abilities.', 'She made a name for herself as a designer.', 'An unusual project can help you {gap}.'),
                E('What’s in a name?', 'A phrase asking how much meaning or importance a name carries.', 'The two cafés have opposite names—but what’s in a name?', 'When a product succeeds despite its terrible title, we ask: {gap}')
            ],
            songs: [
                S('A Boy Named Sue', 'Johnny Cash', null, 'Country storytelling turns an unusual name into a comic identity, a lifelong problem, and an unforgettable story.', 'When a name shapes the story', ['name', 'comic', 'identity'], [
                    'Do you know anyone whose name has an interesting story?',
                    'Did you ever dislike a name or nickname when you were younger?',
                    'Do first impressions change when you learn the reason behind a name?',
                    'Would you prefer a traditional name or an unusual one?'
                ]),
                S('You Can Call Me Al', 'Paul Simon', null, 'Playful pop-rock uses a simple nickname inside a much stranger journey of identity and curiosity.', 'The freedom of another name', ['nickname', 'playful', 'identity'], [
                    'Do different groups of people call you by different names?',
                    'Have you ever forgotten someone’s name immediately after meeting them?',
                    'Which kinds of nicknames sound friendly to you?',
                    'How would you introduce a friend whose real name you almost never use?'
                ]),
                S('Name', 'Goo Goo Dolls', null, 'Alternative rock treats a name as something personal that can remain private even when the world asks for a label.', 'Names, privacy, and recognition', ['name', 'reflective', 'privacy'], [
                    'Which version of your name feels most natural to you?',
                    'Have people ever shortened or mispronounced your name?',
                    'Do stage names change the way you see an artist?',
                    'Would you use a different name for work or social media?'
                ])
            ],
            contexts: [
                C(
                    'Who Gets to Call You That?',
                    'A name with a story',
                    'Pick one card and tell me about a name you’ve actually been called. Who said it first, and how did it stick?',
                    'Which name would take you back to a specific person or place?',
                    [
                        { title: 'Just One Person', text: 'A name that would sound strange coming from anyone else.' },
                        { title: 'A Lucky Mistake', text: 'A name that started when someone got yours wrong.' },
                        { title: 'From Another Time', text: 'A name you used to hear all the time.' },
                        { title: 'The One That Almost Stuck', text: 'A nickname someone tried to give you.' }
                    ],
                    'fa-id-card'
                ),
                C(
                    'What Would You Say?',
                    'A quick reply',
                    'Pick a situation and say exactly what you’d say in the moment. Then switch roles and try a different card.',
                    'When would you just let a name mistake go?',
                    [
                        { title: 'Coffee for Who?', text: 'The barista calls out a version of your name you barely recognize.' },
                        { title: 'A New Nickname', text: 'A new classmate shortens your name the first time you meet.' },
                        { title: 'Say It Again', text: 'Someone asks how to pronounce your name in English.' },
                        { title: 'Wait, That’s You?', text: 'Someone recognizes you by your online username.' }
                    ],
                    'fa-comments'
                )
            ],
            speaking: { title: 'The Stories Behind Our Names', icon: 'fa-signature', instruction: 'Start with any question and tell the story behind your answer.', prompts: [
                'What do people usually call you, and why?',
                'Have you ever given someone a nickname that stayed?',
                'Which names or nicknames are difficult for you to remember?',
                'Do unusual names usually help or hurt a first impression?'
            ], support: ['I go by…', 'The name comes from…', 'The nickname stuck because…', 'In formal situations, I prefer…'] },
            homework: ['Explain the story behind your name or a name in your family.', 'Compare what different groups of people call you and how each version feels.', 'Write a respectful guide for asking, pronouncing, and remembering someone’s name.'],
            closing: 'A name is a first clue, not the complete story.'
        }),

        50: lesson({
            title: 'Games, Puzzles & Escape Rooms', icon: 'fa-puzzle-piece', accent: 'indigo',
            warmupTitle: 'Warm-up: Your Move', warmupIntro: 'A good game can reveal logic, creativity, patience, and who becomes suspiciously competitive over a plastic sheep.',
            warmups: ['If you could get the same people together to play one game again, what would you play?', 'Do you prefer solving a puzzle alone or thinking aloud with a team?', 'How competitive are you when you play with other people?', 'Have you ever stopped playing a game because the rules were confusing?'],
            expressions: [
                E('To take turns', 'To act one after another in an agreed order.', 'Players take turns moving one piece.', 'With only one clue card, everyone needs {gap}.'),
                E('To play by the rules', 'To follow the agreed instructions of a game.', 'The match stays fair when everyone plays by the rules.', 'Even a creative player should agree {gap}.'),
                E('To think several moves ahead', 'To predict later consequences before acting.', 'A strong chess player thinks several moves ahead.', 'The maze becomes easier when you learn {gap}.'),
                E('A lucky guess', 'A correct answer reached without enough knowledge.', 'I did not know the code; it was a lucky guess.', 'Choosing the correct key on the first try was {gap}.'),
                E('To crack the code', 'To solve a difficult system, message, or puzzle.', 'The team cracked the code with thirty seconds left.', 'One final pattern helped us {gap}.'),
                E('A level playing field', 'A situation in which everyone has a fair chance.', 'Clear rules create a level playing field.', 'Equal starting resources gave the teams {gap}.')
            ],
            songs: [
                S('Pinball Wizard', 'The Who', null, 'Rock turns an unlikely player into a mysterious champion whose skill surprises everyone watching.', 'Unexpected ways to master a game', ['skill', 'energetic', 'surprise'], [
                    'Do you enjoy games that depend on quick reactions?',
                    'Have you ever become surprisingly good at a game?',
                    'Do you prefer improving at one game or trying many different ones?',
                    'Would you rather win through skill or through a lucky guess?'
                ]),
                S('The Riddle', 'Nik Kershaw', null, 'Synth-pop wraps memorable images in a puzzle that invites listeners to search for connections.', 'Why unanswered questions stay interesting', ['riddle', 'mysterious', 'interpretation'], [
                    'Do you enjoy riddles and logic puzzles?',
                    'Have you ever spent too long trying to solve one puzzle?',
                    'Do you usually ask for a hint or keep trying alone?',
                    'Who would you bring to an escape room, and what would they be good at?'
                ]),
                S('The Logical Song', 'Supertramp', null, 'Progressive pop-rock questions what it means to be logical, practical, and certain.', 'Logic versus imagination', ['logic', 'reflective', 'certainty'], [
                    'When do you trust logic more than intuition?',
                    'Do you like explaining how you reached an answer?',
                    'Have you ever solved a problem in an unexpected way?',
                    'Can games help you think differently in real situations?'
                ])
            ],
            contexts: [
                C(
                    'The Locked Suitcase',
                    'Three digits from 1 to 5, with no repeats',
                    'Open the clues one at a time. Say the code you’d try before opening the last card.',
                    'Which clue helped you narrow it down the most?',
                    [
                        { title: 'Clue 1', text: 'The first digit is double the last digit.' },
                        { title: 'Clue 2', text: 'The last digit is odd.' },
                        { title: 'Clue 3', text: 'The middle digit is one more than the first digit.' },
                        { title: 'Check the Code', text: '231. The first digit is 2, the last is 1, and the middle is 3.' }
                    ],
                    'fa-lock', { revealCards: true }
                ),
                C(
                    'Would This Ruin Game Night?',
                    'One game, one new rule',
                    'Think of a game you’ve played with friends. Pick one new rule you’d try and tell me how it would change the game.',
                    'Which rule would your friends argue about the most?',
                    [
                        { title: 'One Do-Over', text: 'Everyone gets one chance to undo their own move.' },
                        { title: 'Phones Down', text: 'Check your phone during the game and you miss a turn.' },
                        { title: 'Catch Up', text: 'The player in last place gets an extra turn halfway through.' },
                        { title: 'Score Swap', text: 'On the last turn, draw two names. Those players swap scores.' }
                    ],
                    'fa-dice'
                )
            ],
            speaking: { title: 'Game Night Stories', icon: 'fa-dice', instruction: 'Pick a question that makes you think of a game you’ve actually played.', prompts: ['What game do you usually play with friends or family?', 'Have you ever tried an escape room? What was it like?', 'Which game rule do people often misunderstand?', 'Do you prefer games based on luck, skill, or conversation?'], support: ['Players take turns…', 'The goal is to…', 'The clue suggests…', 'This keeps a level playing field because…'] },
            homework: ['Explain the rules of a game you know well to a new player.', 'Describe a puzzle or escape-room experience and how you approached it.', 'Review a game by comparing fun, fairness, strategy, and replay value.'],
            closing: 'A good game gives every player a reason to think, react, and talk.'
        }),

        51: lesson({
            title: 'Weather, Seasons & Mood', icon: 'fa-cloud-sun', accent: 'orange',
            warmupTitle: 'Warm-up: Today’s Emotional Forecast', warmupIntro: 'Weather changes clothes, plans, conversations, and the universal mystery of people who carry umbrellas only when it is sunny.',
            warmups: ['Which kind of weather gives you the most energy?', 'When did the weather turn a normal day into one you still remember?', 'What do you usually do on a rainy afternoon?', 'Does the weather affect your mood?'],
            expressions: [
                E('Come rain or shine', 'No matter what the weather or difficulty is.', 'The market opens every Sunday, come rain or shine.', 'They walk the dog at seven, {gap}.'),
                E('To take a rain check', 'To politely postpone an invitation or plan.', 'Can I take a rain check on dinner tonight?', 'If the storm gets worse, we may need {gap}.'),
                E('Under the weather', 'Feeling slightly ill or low in energy.', 'I am a little under the weather today.', 'He skipped the picnic because he felt {gap}.'),
                E('A storm in a teacup', 'A lot of excitement or worry about a small issue.', 'The argument about the window seat was a storm in a teacup.', 'One missing umbrella created {gap}.'),
                E('To clear up', 'To become brighter or less rainy.', 'The sky should clear up after lunch.', 'The forecast says the weather is likely {gap}.'),
                E('Every cloud has a silver lining', 'A difficult situation may contain something positive.', 'The rain cancelled the game, but every cloud has a silver lining: we found a great café.', 'When Plan B becomes better than Plan A, remember: {gap}.')
            ],
            songs: [
                S('Here Comes the Sun', 'The Beatles', null, 'Gentle pop-rock makes returning sunlight feel like relief, energy, and a fresh beginning.', 'Why better weather changes the atmosphere', ['sunlight', 'warm', 'relief'], ['Do sunny days change your plans?', 'What outdoor activity do you enjoy most?', 'Have you ever cancelled a plan because of bad weather?', 'Do you prefer very sunny days or mild, cloudy days?']),
                S('Rain on Me', 'Lady Gaga & Ariana Grande', null, 'Dance-pop turns rain into an energetic image of accepting discomfort and continuing to move.', 'Turning bad weather into momentum', ['rain', 'energetic', 'acceptance'], ['Do you enjoy going out when it is raining?', 'When has rain made something more fun than you expected?', 'Have you ever been caught in heavy rain without an umbrella?', 'Does rain make your city feel calmer or more stressful?']),
                S('Colder Weather', 'Zac Brown Band', null, 'Country storytelling connects cold weather, movement, distance, and the pull between staying and leaving.', 'Weather as part of a decision', ['cold', 'reflective', 'movement'], ['Which season changes your routine the most?', 'Do you prefer hot weather or cold weather?', 'Have you ever visited a place with a very different climate?', 'Would you move to another city because of the weather?'])
            ],
            contexts: [
                C(
                    'Your Perfect Day Off',
                    'The forecast is in',
                    'Pick two forecasts. For each one, tell me what you’d actually do if you had the whole afternoon free.',
                    'Which forecast would get you out the door fastest?',
                    [
                        { title: 'Warm and Sunny', text: 'It’s 25°C, and you don’t need a jacket.' },
                        { title: 'Rain All Afternoon', text: 'You can hear the rain from inside.' },
                        { title: 'Cold but Clear', text: 'The sun is out, and it’s 5°C.' },
                        { title: 'Warm and Windy', text: 'It’s warm enough to go out, but the wind keeps picking up.' }
                    ],
                    'fa-cloud-sun'
                ),
                C(
                    'Would You Still Go?',
                    'Your plans meet the forecast',
                    'Pick a plan and decide whether to go, change it, or reschedule. Say the first message you’d send your friend.',
                    'Which of these plans would you stick to even if the forecast got worse?',
                    [
                        { title: 'Outdoor Concert', text: 'You already have tickets, and it’s starting to drizzle.' },
                        { title: 'Birthday Picnic', text: 'You’ve packed the food, but the wind is getting stronger.' },
                        { title: 'Long Walk', text: 'You planned to meet at noon, and it’s already 32°C.' },
                        { title: 'Breakfast Outside', text: 'Your favorite café only has outdoor seats today, and it’s 6°C.' }
                    ],
                    'fa-umbrella'
                )
            ],
            speaking: { title: 'When the Weather Changed Your Plans', icon: 'fa-satellite-dish', instruction: 'Start with the question that brings a particular day or trip to mind.', prompts: ['How does today’s weather affect your plans?', 'What do you usually do when the forecast changes suddenly?', 'Which season fits your personality best?', 'Have you ever experienced weather that genuinely surprised you?'], support: ['The forecast calls for…', 'If it clears up…', 'Come rain or shine…', 'Our Plan B would be…'] },
            homework: ['Write a weather diary that includes mood, clothes, plans, and one observation.', 'Compare how your routine changes in two different seasons.', 'Describe a time when the weather changed an important plan and explain your Plan B.'],
            closing: 'Weather gives every ordinary plan a setting, a mood, and occasionally a surprise ending.'
        }),

        52: lesson({
            title: 'Noise, Silence & Everyday Soundscapes', icon: 'fa-ear-listen', accent: 'pink',
            warmupTitle: 'Warm-up: Sounds You Know by Heart',
            warmupIntro: 'Think of the click of a key in a lock or the hiss of a kettle. Some sounds tell you what is happening before you can see it.',
            warmups: ['Which everyday sound do you find especially satisfying?', 'Do you need background sound when you work or study?', 'What harmless noise annoys you more than it should?', 'Where can you go when you genuinely need silence?'],
            expressions: [
                E('Background noise', 'Sound you can hear while paying attention to something else.', 'There was so much background noise that I could barely hear her on the phone.', 'The microphone picked up a lot of {gap}, mostly traffic from the street.'),
                E('Peace and quiet', 'A calm situation without unwanted noise.', 'I went to the library for some peace and quiet.', 'After the festival, everyone wanted {gap}.'),
                E('To hear yourself think', 'To have enough quiet to concentrate. Usually used in the negative.', 'I can’t hear myself think with the TV that loud.', 'Turn off the TV if you want {gap}.'),
                E('A deafening silence', 'A silence that feels unusually strong or meaningful.', 'After the strange announcement, a deafening silence filled the room.', 'The failed joke was followed by {gap}.'),
                E('To fall on deaf ears', 'To be ignored. Used about a request, suggestion, or warning.', 'Our requests for quieter equipment fell on deaf ears.', 'The manager ignored two complaints. A third is likely {gap}, too.'),
                E('Noise pollution', 'Unwanted sound in the environment that disturbs people or animals.', 'Residents say late-night traffic causes noise pollution.', 'Diverting trucks away from homes could reduce {gap}.')
            ],
            songs: [
                S('The Sound of Silence', 'Simon & Garfunkel', null, 'Listen for the mood the voices create. What kind of silence does the performance make you imagine?', 'When silence says something', ['silence', 'haunting', 'attention'], ['When does silence feel comfortable rather than awkward?', 'Do you prefer silence or soft music when you need to concentrate?', 'Have you ever misunderstood someone’s silence?', 'Are you comfortable sitting quietly with another person?']),
                S('Noise', 'Kenny Chesney', null, 'As you listen, notice how the song makes a crowded world feel. Think about what gets lost when everything competes for your attention.', 'Who gets your attention?', ['noise', 'restless', 'overload'], ['What gives you a stronger sense of overload in the song: the words, the voice, or the instruments?', 'Which phone alert would you keep if you could only have one?', 'How could an app get your attention without making a sound?', 'Have you ever turned something off and only then noticed how much noise it was making?']),
                S('Listen to the Music', 'The Doobie Brothers', null, 'Listen for the moment when you most want to tap along or join in.', 'When music brings people in', ['listening', 'upbeat', 'connection'], ['What makes this song easy or hard to sing along to?', 'How does a familiar song change the mood when strangers start singing along?', 'What music could you and someone with very different taste agree on for a long drive?', 'How does hearing a favorite song in a crowd change the experience compared with listening to it alone?'])
            ],
            contexts: [
                C(
                    'Name That Sound',
                    'Two clues, one guess',
                    'Pick a card and think of a real sound. Give two clues or imitate it so the other person can guess.',
                    'Which sound would take you back to a specific place the fastest?',
                    [
                        { title: 'A Sound You Rarely Hear Now', text: 'Something you used to hear all the time, like an old phone or a school bell.' },
                        { title: 'Your Neighborhood', text: 'A sound you hear from your window or on your street.' },
                        { title: 'Oddly Satisfying', text: 'A sound you’d happily hear again and again.' },
                        { title: 'Please Mute That', text: 'A sound you wish had a volume button.' }
                    ],
                    'fa-ear-listen'
                )
            ],
            speaking: {
                title: 'What If the World Sounded Different?',
                icon: 'fa-volume-high',
                instruction: 'Start with any question and see where the conversation goes.',
                prompts: [
                    'Would you rather never hear music again or never have a moment of complete silence? Which would you miss more?',
                    'What if you could hear through walls for a day? When would you be tempted to listen, and when would you rather not know?',
                    'What if engines and loudspeakers went quiet for an hour every day? What would you notice that usually gets drowned out?',
                    'Would you rather live on a lively street that gets loud on weekends or on a quiet street where everything closes early? What could change your answer?'
                ],
                support: ['I’d miss… the most.', 'I’d put up with it if…', 'I might feel differently if…', 'I hadn’t thought about…']
            },
            homework: [
                'Write about a time someone’s silence meant something different from what you first assumed. What helped you understand it?',
                'Compare two places with different expectations about noise. What is perfectly normal in one place and surprising in the other?',
                'Write about a sound you rarely hear anymore. Describe the memory it brings back and say whether you miss hearing it.'
            ],
            closing: 'The wise man speaks because he has something to say; the fool speaks because he has to say something.'
        }),

        53: lesson({
            title: 'Birthdays, Gifts & Celebration Personalities', icon: 'fa-cake-candles', accent: 'indigo',
            warmupTitle: 'Warm-up: Make a Wish', warmupIntro: 'Some people want a room full of balloons. Others want cake, two friends, and no public singing whatsoever.',
            warmups: ['If you could relive one birthday just for the food or the company, which one would it be?', 'Do you enjoy organizing celebrations for other people?', 'Have you ever received a simple but thoughtful gift?', 'Do you prefer choosing your gift or being surprised?'],
            expressions: [
                E('To mark the occasion','To do something special for an important event.','We took a group photo to mark the occasion.','A handwritten note is a simple way {gap}.'),
                E('To make a fuss of someone','To give someone warm attention on a special day.','Her friends made a fuss of her at breakfast.','On birthdays, some families love {gap}.'),
                E('A thoughtful gift','A present chosen with care for the receiver.','The playlist was a thoughtful gift.', 'Something handmade can be {gap}.'),
                E('A surprise party','A celebration planned without the main person knowing.', 'They organized a surprise party in the garden.', 'Keeping {gap} secret requires a very quiet group chat.'),
                E('A milestone birthday','A birthday considered especially significant.', 'Turning fifty was a milestone birthday for her.', 'The family planned a trip for {gap}.'),
                E('It’s the thought that counts','Good intentions matter more than price or perfection.', 'The cake leaned to one side, but it’s the thought that counts.', 'The card arrived late; still, {gap}.')
            ],
            songs: [
                S('Birthday', 'The Beatles', null, 'Straightforward rock turns the occasion into an energetic invitation to celebrate together.', 'What makes a celebration feel alive', ['birthday', 'energetic', 'togetherness'], ['Do you usually enjoy your birthday?', 'Which birthday tradition do you like most?', 'Have you ever had or attended a surprise party?', 'What song would get people out of their seats at a birthday party you were throwing?']),
                S("It's My Party", 'Lesley Gore', null, 'Classic pop adds emotional drama to a party that is supposed to be joyful and public.', 'When the celebration does not follow the plan', ['party', 'dramatic', 'expectations'], ['Do you usually enjoy going to parties?', 'Have you ever left a party earlier than planned?', 'What helps you feel comfortable at a social event?', 'Do you prefer being the host or being a guest?']),
                S('My Wish', 'Rascal Flatts', null, 'Country-pop turns a gift into words of encouragement for someone beginning another year or chapter.', 'Giving wishes instead of objects', ['wish', 'warm', 'encouragement'], ['Do you usually send personal birthday messages?', 'Which gift do you still remember clearly?', 'Do you prefer receiving experiences or physical gifts?', 'Have you ever received a gift that showed someone understood you well?'])
            ],
            contexts: [
                C(
                    'I’d Get You This',
                    'A gift for someone you know',
                    'Think of a real person and tell me one thing they love. Pick a card and say what you’d give them.',
                    'Which gift would make them feel you really know them?',
                    [
                        { title: 'Something Useful', text: 'Something they’d use every week.' },
                        { title: 'An Experience', text: 'Something you could do together.' },
                        { title: 'An Inside Joke', text: 'Something they’d laugh at as soon as they opened it.' },
                        { title: 'Made by You', text: 'Something you could cook, make, or put together yourself.' }
                    ],
                    'fa-gift'
                ),
                C(
                    'The Birthday I’d Actually Want',
                    'Pick your invitation',
                    'Choose the birthday you’d be happiest to have. Tell me one detail you’d change to make it yours.',
                    'What would you still be talking about the next day?',
                    [
                        { title: 'Come Over', text: 'A few friends, your favorite snacks, and something to play or watch.' },
                        { title: 'Let’s Go Out to Eat', text: 'Dinner with one person at a place you’ve been wanting to try.' },
                        { title: 'A Day Away', text: 'A day trip with time to stop wherever you want.' },
                        { title: 'A Day to Yourself', text: 'Your favorite food, no schedule, and the whole day free.' }
                    ],
                    'fa-cake-candles'
                )
            ],
            speaking: {title:'Birthdays Worth Remembering',icon:'fa-calendar-check', instruction: 'Start with one birthday, gift, or surprise you still remember.', prompts:['How do you usually celebrate your birthday?', 'What is the most thoughtful gift you have received?', 'Have you ever helped organize a surprise?', 'Do adults make too much or too little fuss about birthdays?'],support:['To mark the occasion…', 'This gift is thoughtful because…', 'The guest of honor would prefer…', 'Our surprise Plan B is…']},
            homework: ['Recommend a thoughtful gift for a real person and explain the details that guided your choice.', 'Plan a celebration for someone you know, using their preferences and a realistic budget.', 'Write a birthday message that is specific, warm, and natural.'],
            closing: 'The best celebration fits the person, not a standard formula.'
        }),

        54: lesson({
            title: 'Amusement Parks & Visitor Experience', icon: 'fa-ticket', accent: 'purple',
            warmupTitle: 'Warm-up: Welcome to the Park', warmupIntro: 'A theme park is where people wait ninety minutes to be frightened for ninety seconds—and then immediately join another line.',
            warmups: ['If you could go back to a park, fair, or carnival for just one thing, what would you do again?', 'Which kind of attraction do you enjoy most?', 'What ride would you refuse even if the line were empty?', 'How long are you willing to wait for a popular attraction?'],
            expressions: [
                E('A thrill seeker','Someone who enjoys exciting and slightly frightening experiences.','Maya is a thrill seeker who loves the fastest rides.', 'The new upside-down coaster was designed for {gap}.'),
                E('Not for the faint-hearted','Too intense or frightening for easily nervous people.', 'The haunted tunnel is not for the faint-hearted.', 'A ride through total darkness is {gap}.'),
                E('To queue up','To wait in a line for something.', 'Visitors queued up before the gates opened.', 'Fans arrived early {gap} for the new attraction.'),
                E('Worth the wait','Good enough to justify waiting a long time.', 'The final ride was worth the wait.', 'After ninety minutes in line, the view needed to be {gap}.'),
                E('To hold on tight','To grip something firmly, especially during movement.', 'Hold on tight when the boat turns.', 'The operator warned everyone {gap}.'),
                E('The main attraction','The most important or popular feature of a place or event.', 'The wooden rollercoaster is the main attraction.', 'The night parade became {gap}.')
            ],
            songs: [
                S('Rollercoaster', 'Bleachers', null, 'Energetic pop-rock uses the motion of a rollercoaster to create speed, anticipation, and emotional momentum.', 'Why controlled thrills feel exciting', ['motion', 'energetic', 'anticipation'], ['Do you enjoy rollercoasters?', 'Have you ever been scared before a ride but enjoyed it afterward?', 'Which type of ride gives you the right amount of excitement?', 'Do you prefer fast rides or smooth, scenic rides?']),
                S('Fun, Fun, Fun', 'The Beach Boys', null, 'Fast pop-rock celebrates movement, freedom, and the pure attraction of an exciting machine.', 'When the ride becomes the event', ['fun', 'bright', 'movement'], ['Which attraction makes you feel like a child again?', 'Who would you most enjoy visiting a theme park with?', 'Do you spend more time on rides, shows, or food?', 'What’s the first thing you’d spend money on after getting through the gate?']),
                S('On Top of the World', 'Imagine Dragons', null, 'Upbeat pop-rock turns height into a feeling of achievement, wonder, and seeing everything differently.', 'Views, heights, and perspective', ['height', 'uplifting', 'perspective'], ['Are you comfortable with heights?', 'Have you ever ridden a Ferris wheel or observation ride?', 'Which high place gave you a memorable view?', 'Do clear safety explanations help you relax on a ride?'])
            ],
            contexts: [
                C(
                    'One Ride Left',
                    'The park closes in 45 minutes',
                    'Pick your last ride and tell me what makes it worth the wait. Then hear the other person’s pick.',
                    'What would you pick if your friend was scared of heights?',
                    [
                        { title: 'Big Drop', text: '40 minutes in line for the tallest drop in the park.' },
                        { title: 'Ferris Wheel', text: '15 minutes in line for a view of the park as the lights come on.' },
                        { title: 'Indoor Story Ride', text: '25 minutes in line for a ride through a set with actors.' },
                        { title: 'River Rafts', text: '20 minutes in line for a ride that might leave you soaked.' }
                    ],
                    'fa-ticket'
                ),
                C(
                    'What Would Get You Through the Gate?',
                    'Bring a friend to the park',
                    'Think of a friend who hates roller coasters. Pick the thing they’d most enjoy and tell them what you’d do together.',
                    'What would you want to do again on your next visit?',
                    [
                        { title: 'Live Show', text: 'See a stunt show with music and a surprise ending.' },
                        { title: 'Snack Break', text: 'Split a snack you can only get at the park.' },
                        { title: 'Carnival Games', text: 'Try to win something ridiculous to take home.' },
                        { title: 'Night Lights', text: 'Walk around after dark and find the best spot for a photo.' }
                    ],
                    'fa-star'
                )
            ],
            speaking: {title:'A Day at the Park',icon:'fa-compass-drafting', instruction: 'Pick a question and think of a park, fair, or carnival you know.', prompts:['Which amusement park experience do you remember most clearly?', 'What makes waiting in a long line more tolerable?', 'Would you visit a park if you did not like rollercoasters?', 'Can a simple classic ride be better than an expensive high-tech one?'],support:['The main attraction is…', 'Visitors queue up to…', 'I would avoid it because…', 'It is worth the wait because…']},
            homework: ['Plan a realistic day at a park for people with different preferences.', 'Write a clear safety announcement for a familiar type of ride.', 'Review an attraction using atmosphere, comfort, originality, and excitement.'],
            closing: 'A memorable attraction gives people a story before, during, and after the ride.'
        }),

        55: lesson({
            title: 'What If…? Absurd Scenarios', icon: 'fa-circle-question', accent: 'cyan',
            warmupTitle: 'Warm-up: Reality Has Left the Chat', warmupIntro: 'Logic is welcome, but today it must wear a ridiculous hat.',
            warmups: ['If your phone could complain about one thing you do, what would it say?', 'Which “what if” question has made you laugh?', 'Have you ever created a silly story with friends?', 'Do serious people sometimes enjoy the strangest jokes?'],
            expressions: [
                E('Hypothetically speaking','Used to introduce an imagined situation.','Hypothetically speaking, what if gravity stopped at lunchtime?','{gap}, could a penguin run a hotel?'),
                E('In the unlikely event that','If something improbable happens.','In the unlikely event that aliens call, be polite.','{gap} the moon disappears, we need a backup plan.'),
                E('To think outside the box','To consider creative, unconventional ideas.','We need to think outside the box to feed fifty dragons.','Her upside-down umbrella proves she is able {gap}.'),
                E('A long shot','An attempt or possibility unlikely to succeed.','Teaching the cat to answer emails is a long shot.','Winning with that bizarre plan is {gap}.'),
                E('Stranger things have happened','An unlikely idea may still be possible.','A robot mayor? Stranger things have happened.','Maybe the plan will work—{gap}.'),
                E('To suspend disbelief','To temporarily accept impossible ideas in a story.','Good fantasy helps us suspend disbelief.','To enjoy the talking refrigerator, you need {gap}.')
            ],
            songs: [
                S('Particle Man','They Might Be Giants',null,'Alternative rock creates tiny characters with unexplained powers, problems, and wonderfully strange logic.','When nonsense has its own rules',['characters','quirky','rules'],['Do you enjoy fictional characters with strange powers?', 'Which unusual fictional character do you remember well?', 'Have you ever enjoyed a story without fully understanding it?', 'Does an imaginary world need logical rules to be enjoyable?']),
                S('The Fox (What Does the Fox Say?)','Ylvis',null,'A simple unanswered question becomes a completely committed musical mystery.','Taking nonsense seriously',['mystery','energetic','sound'],['Do you know the sounds of many different animals?', 'Which unusual animal do you find most interesting?', 'Do silly songs stay in your memory easily?', 'Can a nonsense song improve your mood?']),
                S('Rock Lobster',"The B-52's",null,'New-wave rock commits completely to a surreal beach scene and turns nonsense into a dance-floor world.','Building an absurd world',['surreal','playful','imagination'],['If you had to turn this song into a ten-second video, what would we see?', 'Do you enjoy songs with strange or surreal lyrics?', 'Which novelty song do you still remember?', 'Does a funny song need a clear meaning?'])
            ],
            contexts: [
                C(
                    'Tomorrow, One Weird Rule',
                    'What would you do first?',
                    'Pick the weird rule you’d most like to wake up to. Tell me what you’d do with it in the first hour.',
                    'Who in your life would have the most fun with that rule?',
                    [
                        { title: 'Talking Pets', text: 'Every pet can talk for one day.' },
                        { title: 'An Elevator With Questions', text: 'The elevator moves only after you answer a question about yourself.' },
                        { title: 'Shoes With Plans', text: 'Your shoes decide where you walk next.' },
                        { title: 'A Peek at Tomorrow', text: 'Everyone gets to see ten seconds of their own day tomorrow.' }
                    ],
                    'fa-wand-magic-sparkles'
                ),
                C(
                    'Yes, and Then…',
                    'One sentence each',
                    'Open one card. Take turns adding one sentence to the story. After four new sentences, give the story a title.',
                    'Which sentence changed the story the most?',
                    [
                        { title: 'A Visitor', text: 'A pigeon with a tiny suitcase knocks on your window.' },
                        { title: 'Five More Minutes', text: 'Your alarm asks you to let it sleep in today.' },
                        { title: 'Wrong Order', text: 'You open a takeout bag and find a map of your own apartment.' },
                        { title: 'Out of Office', text: 'Your houseplant asks if it can take Friday off.' }
                    ],
                    'fa-book-open', { revealCards: true }
                )
            ],
            speaking: {title:'The What-If Machine',icon:'fa-gears',prompts:['Do you enjoy discussing impossible “what if” questions?', 'If animals could speak, which one would be most interesting?', 'What everyday rule would become funny if everyone followed it literally?', 'Have you ever enjoyed a story even though it made no logical sense?'],support:['Hypothetically speaking…','The first consequence would be…','The strangest part is…','Against all logic, it might…']},
            homework: ['Write five connected consequences of one absurd change.','Create an advertisement for a product nobody should need.','Interview an imaginary creature about an ordinary job.'],
            closing: 'A ridiculous question can produce surprisingly clever language.'
        }),

        56: lesson({
            title: 'Books, Bookshops & Reading Personalities', icon: 'fa-book-open-reader', accent: 'amber',
            warmupTitle: 'Warm-up: Between the Covers', warmupIntro: 'Some readers finish a novel overnight. Others buy it, admire the cover, and give it a meaningful home on the unread shelf.',
            warmups: ['Which book, comic, or audiobook would you love to start again for the first time?', 'What kind of book can keep your attention?', 'Do you prefer print, ebooks, or audiobooks?', 'How do you usually choose your next book?'],
            expressions: [
                E('A bookworm','A person who loves reading.', 'Maya is a bookworm who always carries a novel.', 'The library café was designed for {gap}.'),
                E('A page-turner','A book that is extremely difficult to stop reading.', 'The mystery was a real page-turner.', 'Short chapters helped make the novel {gap}.'),
                E('To get lost in a book','To become deeply absorbed in reading.', 'He got lost in a book and missed his stop.', 'A quiet afternoon is perfect {gap}.'),
                E('To read between the lines','To understand a meaning that is not stated directly.', 'The letter sounds polite, but read between the lines.', 'The detective needed {gap} to notice the warning.'),
                E('To judge a book by its cover','To form an opinion from appearance before knowing the content.', 'The strange cover was excellent—never judge a book by its cover.', 'The display invites shoppers {gap}.'),
                E('To put a book down','To stop reading, often because attention is needed elsewhere.', 'The story was so good that I could not put the book down.', 'Even at midnight, she refused {gap}.')
            ],
            songs: [
                S('Paperback Writer','The Beatles',null,'Pop-rock turns the dream of writing and publishing a book into a concise, energetic request for a reader’s attention.', 'Writing a book and finding readers',['writing','publishing','readers'],['If you wrote a book, what kind of book would it be?', 'Would starting the story or finishing it be more difficult for you?', 'Who would you ask to read the first draft?', 'What makes someone want to keep reading after the first page?']),
                S('The Book I Read','Talking Heads',null,'Art rock presents reading as a personal encounter: a book can feel connected to a reader’s own life and emotions.', 'When a book feels personal',['reading','personal','connection'],['Has a book ever felt closely connected to your own life?', 'What helps you identify with a narrator or character?', 'Do you remember a book’s plot or the feeling it gave you more clearly?', 'Can reading a book change the way you understand yourself?']),
                S('Ramble On','Led Zeppelin',null,'Rock turns a journey into a fantasy narrative and brings characters and places from Tolkien’s writing into the song.', "Tolkien's world inside a rock song",['literature','fantasy','references'],['Which topic could you read several books about?', 'What place from a book or story would you spend one afternoon in?', 'Have you ever loved a book that someone else disliked?', 'Do you reread books for comfort or discovery?'])
            ],
            contexts: [
                C(
                    'Would You Read Page Two?',
                    'Pick a first line',
                    'Read the four openings and pick the one you’d keep reading. Tell me what you hope to find out on the next page.',
                    'Which opening would you send to a friend who rarely reads?',
                    [
                        { title: 'Mystery', text: 'The key I’d lost last summer was in the pocket of a coat I’d bought that morning.' },
                        { title: 'Comedy', text: 'My dog gave me two weeks’ notice on a Tuesday.' },
                        { title: 'Romance', text: 'We’d taken the same train for a year, but that morning there was only one seat left.' },
                        { title: 'Adventure', text: 'The last bus out of town had a sign that said Anywhere.' }
                    ],
                    'fa-book-open'
                ),
                C(
                    'A Book for Right Now',
                    'A recommendation for the moment',
                    'Pick a situation and recommend something you’ve read or listened to. A book, comic, or audiobook all count.',
                    'What would you tell someone who isn’t sure they’d like your pick?',
                    [
                        { title: 'A Long Trip', text: 'You have five hours before you arrive.' },
                        { title: 'Ten Minutes to Kill', text: 'You’re early and waiting for a friend.' },
                        { title: 'A Long Day', text: 'You want to switch off and think about something else.' },
                        { title: 'One More Page', text: 'It’s bedtime, but you want something you’ll struggle to put down.' }
                    ],
                    'fa-book'
                )
            ],
            speaking: {title:'Your Reading Life',icon:'fa-book-bookmark',prompts:['Have you ever taken part in a book club? What was the experience like? If not, would you consider joining one?', 'Which book would you recommend to a friend, and why?', 'When is an audiobook more convenient than a printed book?', 'Do you usually finish every book you start?'],support:['It is a real page-turner because…', 'This format works well when…', 'Reading between the lines…', 'I could/could not put it down because…']},
            homework: ['Write a concise, spoiler-free recommendation for a book you have read.', 'Compare what, where, and how you read in two real situations.', 'Describe the kind of book club you would consider joining and explain what would keep you interested.'],
            closing: 'A book begins with words, but the reader supplies a second imagination.'
        }),

        57: lesson({
            title: 'Unpopular Opinions & Friendly Disagreement', icon: 'fa-comments', accent: 'red',
            warmupTitle: 'Warm-up: Convince Me', warmupIntro: 'A disagreement can be a battle—or a very enjoyable conversation about pineapple, alarm clocks, and the correct way to make coffee.',
            warmups: ['What harmless opinion of yours usually surprises people?', 'Which popular food, movie, or habit do you simply not understand?', 'Do you enjoy talking to people who have different opinions?', 'Have you ever changed your mind after a good conversation?'],
            expressions: [
                E('A hot take','A strong or surprising opinion offered for discussion.','Her hot take is that breakfast food is better at night.','Calling summer the worst season is {gap}.'),
                E('To agree to disagree','To accept that people will keep different opinions.', 'We could not choose the best ending, so we agreed to disagree.', 'After twenty minutes of debate, it was time {gap}.'),
                E('To see someone’s point','To understand the reason behind another opinion.','I still disagree, but I can see your point.', 'The example helped me {gap}.'),
                E('To hear someone out','To listen fully before responding or deciding.','Hear me out before you reject the idea.', 'The plan sounds strange, but I want {gap}.'),
                E('To play devil’s advocate','To argue another side in order to test an idea.', 'I will play devil’s advocate and defend the unpopular option.', 'For the next round, try {gap}.'),
                E('To find common ground','To identify an idea or goal both sides share.', 'They disagreed on the restaurant but found common ground on the budget.', 'A shared priority can help people {gap}.')
            ],
            songs: [
                S("You Don't Own Me",'Lesley Gore',null,'Classic pop uses a confident voice to reject control and state a personal point of view.', 'Speaking clearly without asking permission',['autonomy','confident','control'],['When is it easiest for you to express a different opinion?', 'Has friendly advice ever started to feel like control?', 'Do you usually ask for other people’s opinions before deciding?', 'Is it easy for you to say no clearly?']),
                S('We Can Work It Out','The Beatles',null,'Pop-rock turns disagreement into an invitation to slow down, listen, and search for a solution.', 'From argument to common ground',['disagreement','hopeful','compromise'],['What helps you stay calm during a disagreement?', 'You and a friend want to watch different things tonight. How would you settle it?', 'Do you compromise easily?', 'Are some disagreements better left unresolved?']),
                S('My Life','Billy Joel',null,'An assertive pop-rock narrator listens to outside opinions but keeps control of his own decisions.', 'Advice, independence, and personal choices',['independence','assertive','advice'],['Which personal choice do people often comment on unnecessarily?', 'Do people sometimes give you advice without asking?', 'Have you ever ignored advice and been happy with the result?', 'Whose advice do you trust most?'])
            ],
            contexts: [
                C(
                    'Pick a Hot Take',
                    'Agree, disagree, or it depends',
                    'Pick a take you have an opinion about. Say where you stand and give one example from your life. Then ask what the other person thinks.',
                    'Which take would split your group chat?',
                    [
                        { title: 'Breakfast at Night', text: 'Breakfast food tastes better at dinner.' },
                        { title: 'One More Episode', text: 'It’s better to wait and watch a whole season at once.' },
                        { title: 'Skip the Itinerary', text: 'The best trips have no day-by-day plan.' },
                        { title: 'Go for a Walk', text: 'A long walk beats an hour at the gym.' }
                    ],
                    'fa-comment-dots'
                ),
                C(
                    'Say It Another Way',
                    'Same opinion, better wording',
                    'Pick a blunt reply and say how you’d put it to a friend. Then let the other person answer.',
                    'What could you ask next to keep the conversation going?',
                    [
                        { title: 'A Movie They Loved', text: 'That movie was a waste of time.' },
                        { title: 'A Weekend Plan', text: 'That sounds boring.' },
                        { title: 'A Food Recommendation', text: 'I can’t believe you like that place.' },
                        { title: 'A Popular Café', text: 'Only a fool would wait an hour for a table there.' }
                    ],
                    'fa-comments'
                )
            ],
            speaking: {title:'The Friendly Debate Club',icon:'fa-scale-balanced',prompts:['Which harmless opinion of yours do people disagree with?', 'How do you react when a friend strongly disagrees with you?', 'Do you find it easy to see another person’s point?', 'When is it better to agree to disagree?'],support:['Hear me out…', 'I see your point, but…', 'To play devil’s advocate…', 'We can find common ground on…']},
            homework: ['Write both sides of a low-stakes debate.', 'Turn three blunt disagreements into curious responses.', 'Create a dialogue in which two people agree to disagree pleasantly.'],
            closing: 'A good disagreement leaves both people with more ideas than they brought.'
        }),

        58: lesson({
            title: 'Useless Talents & Hidden Skills', icon: 'fa-medal', accent: 'lime',
            warmupTitle: 'Warm-up: Surprisingly Impressive', warmupIntro: 'Not every talent belongs on a résumé. Some belong at a party at exactly 9:17 p.m.',
            warmups: ['What tiny task are you unusually good at?', 'Which friend would you bet on to win a completely random challenge? What would the challenge be?', 'What skill looks easy until you try it?', 'How do you usually learn a new skill?'],
            expressions: [
                E('To have a knack for something','To have a natural skill for something.','He has a knack for remembering voices.','Maya seems {gap}: she can fold fitted sheets perfectly.'),
                E('A hidden talent','An ability that most people do not know about.','Mimicking bird sounds is her hidden talent.','At karaoke, we discovered that singing was {gap}.'),
                E('To pick something up quickly','To learn a skill in little time.','She picked juggling up quickly.','When learning a new game, he tends {gap}.'),
                E('A party trick','A short entertaining skill shown socially.','Opening a bottle with paper is his party trick.','Her backwards alphabet became {gap}.'),
                E('To come in handy','To become useful in a particular situation.','That strange knot came in handy while camping.','Your map-reading skill is likely {gap}.'),
                E('Jack of all trades','Someone competent at many different activities.','Our neighbor is a jack of all trades.','She repairs bikes, bakes bread, and edits videos—a real {gap}.')
            ],
            songs: [
                S('Rockstar','Nickelback',null,'Rock fantasy exaggerates fame, image, luxury, and the dream of becoming effortlessly impressive.','Talent, image, and imaginary fame',['fame','comic','image'],['Which performer skill would you love to have?', 'Do you follow the lives of famous musicians or actors?', 'Have you ever been impressed by someone who was not famous?', 'Would you rather be highly skilled and unknown or famous for an average ability?']),
                S('One Week','Barenaked Ladies',null,'Rapid pop-rock delivery and dense references turn verbal agility into part of the fun.','Skills that look effortless',['speed','playful','wordplay'],['Which fast song or tongue twister is difficult for you?', 'Have you ever practiced something until it looked easy?', 'If you had a week to learn one trick for a bet, what would you try?', 'Is regular practice more important than natural talent?']),
                S('Tribute','Tenacious D',null,'Comedy rock turns an impossible performance into a proudly exaggerated legend.', 'The funniest way to describe greatness',['performance','dramatic','legend'],['Which ordinary achievement are you secretly proud of?', 'Has someone ever complimented an unexpected skill of yours?', 'Do you exaggerate stories to make them funnier?', 'Does a talent need to be useful to be valuable?'])
            ],
            contexts: [
                C(
                    'Tiny Skills I’d Borrow',
                    'I wish I could do that',
                    'Pick a skill you’d love to have. Tell me about a real moment when it would’ve come in handy.',
                    'Who do you know who’s weirdly good at one of these?',
                    [
                        { title: 'Name That Tune', text: 'Name a song after hearing two seconds of it.' },
                        { title: 'Packing Tetris', text: 'Fit a week’s worth of clothes into one small bag.' },
                        { title: 'Find Anything', text: 'Spot the thing everyone else missed in a messy drawer.' },
                        { title: 'The Popcorn Guess', text: 'Know how much popcorn to make to fill the bowl exactly.' }
                    ],
                    'fa-lightbulb'
                ),
                C(
                    'Teach Me in 30 Seconds',
                    'Show me your trick',
                    'Pick a trick you know, or choose one of your own. Explain how you do it and let the other person ask a question.',
                    'What’s the easiest part of your trick to get wrong?',
                    [
                        { title: 'Fold It Fast', text: 'Fold a T-shirt in just a few moves.' },
                        { title: 'Remember That Name', text: 'Make a new name stick after hearing it once.' },
                        { title: 'One Long Peel', text: 'Peel an orange without breaking the peel.' },
                        { title: 'A Paper Plane', text: 'Make a plane that flies across the room.' }
                    ],
                    'fa-hand'
                )
            ],
            speaking: {title:'The Low-Stakes Talent Show',icon:'fa-trophy',prompts:['What small skill comes naturally to you?', 'Which useful skill would you like to learn next?', 'Have you ever learned something unexpectedly quickly?', 'Which skill of a friend or relative impresses you?'],support:['I have a knack for…','It first came in handy when…','The trickiest part is…','It looks useless, but actually…']},
            homework: ['Practice and explain one small skill to another person.','Describe a time when an unexpected ability came in handy.','List three abilities you learned outside a classroom and how you learned them.'],
            closing: 'A skill does not need to change the world to make a good story.'
        }),

        59: lesson({
            title: 'Sleep, Dreams & Nighttime Mysteries', icon: 'fa-moon', accent: 'emerald',
            warmupTitle: 'Warm-up: Lights Out', warmupIntro: 'Sleep is a daily activity nobody fully controls, featuring strange plots, missing hours, and an alarm that always enters as the villain.',
            warmups: ['What helps your mind understand that the day is over?', 'Do you usually remember your dreams?', 'How many hours of sleep do you normally need?', 'What would tempt you to stay up for one more hour tonight?'],
            expressions: [
                E('To drift off','To gradually fall asleep.', 'The sound of rain helped me drift off.', 'After reading two pages, she began {gap}.'),
                E('To sleep like a log','To sleep very deeply.', 'After the long day, he slept like a log.', 'A quiet room helps Maya {gap}.'),
                E('To toss and turn','To move repeatedly because you cannot sleep comfortably.', 'I tossed and turned before the early flight.', 'When the room is too warm, I tend {gap}.'),
                E('To lose sleep over something','To worry about something, especially at night.', 'Do not lose sleep over one awkward email.', 'The tiny mistake is not serious enough {gap}.'),
                E('A power nap','A short sleep intended to restore energy.', 'A twenty-minute power nap helped me focus.', 'The long afternoon meeting made {gap} sound excellent.'),
                E('A vivid dream','A dream that feels especially clear and detailed.', 'She woke up remembering a vivid dream.', 'The talking elevator appeared in {gap}.')
            ],
            songs: [
                S('Mr. Sandman','The Chordettes',null,'Classic pop turns sleep into a playful request for a dream delivered by a mysterious nighttime visitor.', 'Ordering the perfect dream',['dream','playful','request'],['What kind of dreams do you remember most often?', 'If Mr. Sandman took requests, what would you ask him to leave out of your next dream?', 'Do familiar people often appear in your dreams?', 'Would you prefer to control your dreams or keep them unpredictable?']),
                S("I'm Only Sleeping",'The Beatles',null,'Psychedelic rock celebrates staying in bed and watching the world move without joining its urgency.', 'The appeal of doing absolutely nothing',['sleep','dreamy','slowness'],['When does extra sleep feel genuinely restorative?', 'Do you usually press the snooze button?', 'Can you take a short nap without feeling worse afterward?', 'Does your schedule match your natural sleeping habits?']),
                S('Daydream Believer','The Monkees',null,'Pop-rock moves between sleep, waking, imagination, and the cheerful identity of a daydreamer.', 'Dreaming while awake',['daydream','bright','imagination'],['What situation makes your mind begin to wander?', 'Do you daydream during boring tasks?', 'Has a daydream ever helped you solve a problem?', 'When does daydreaming become distracting for you?'])
            ],
            contexts: [
                C(
                    'The Weirdest Dream Detail',
                    'Tell one bit you remember',
                    'Pick a card and tell me one detail from a dream. If you can’t think of one, make it up. I’ll ask what happened next.',
                    'What title would you give that dream if it were a movie?',
                    [
                        { title: 'A Place', text: 'Somewhere familiar that looked different in the dream.' },
                        { title: 'A Person', text: 'Someone you didn’t expect to see there.' },
                        { title: 'An Object', text: 'Something ordinary that did something strange.' },
                        { title: 'A Feeling', text: 'A feeling that stayed with you after you woke up.' }
                    ],
                    'fa-cloud-moon'
                ),
                C(
                    'The Hotel Room at Midnight',
                    'You can fix one thing',
                    'You’ve just checked in after a long trip. Pick the first thing you’d deal with and tell me what you’d do.',
                    'Which of these would bother you most on a real trip?',
                    [
                        { title: 'Too Warm', text: 'You open the door and the room feels stuffy.' },
                        { title: 'Hallway Noise', text: 'People keep walking by and talking outside your door.' },
                        { title: 'Too Bright', text: 'A streetlight shines through a gap in the curtains.' },
                        { title: 'The Pillow', text: 'The only pillow is much taller than the one you use at home.' }
                    ],
                    'fa-bed'
                )
            ],
            speaking: {title:'Dreams and Late Nights',icon:'fa-cloud-moon', instruction: 'Pick a question that brings a particular night to mind. Tell me what happened.', prompts:['What usually helps you drift off?', 'Have you ever slept badly before an important day?', 'Which part of your bedroom helps you relax?', 'Do you think dreams need to have a meaning?'],support:['I began to drift off when…', 'The vivid detail was…', 'The strangest transition happened when…', 'A better nighttime routine would…']},
            homework: ['Write about a dream you remember or a night when you could not sleep.', 'Describe your current bedroom and one realistic change that could improve your sleep.', 'Compare two evening habits and explain which one helps you drift off more easily.'],
            closing: 'Sleep closes the day, but imagination often keeps the lights on.'
        }),

        60: lesson({
            title: 'Lists, Rankings & Top-Five Debates', icon: 'fa-ranking-star', accent: 'orange',
            warmupTitle: "Warm-up: I'd Go Back for That",
            warmupIntro: 'Think of the meals and snacks you still crave from your trips.',
            warmups: [
                'If you could go back today just to eat something you tried on a trip, what would be your top three places?',
                'What would you order at your number one?',
                'Which of the three has the best story behind it?',
                'If you could take me to just one of the three, where would we go?'
            ],
            expressions: [
                E('my top pick', 'The option I would choose first.', 'The bakery near the station was my top pick.', 'Of all the places we tried, the little café by the station was {gap}.'),
                E("I'd put", 'A way to say where something belongs in a ranking.', "I'd put that street market above the mall.", 'We only have half an hour. {gap} the café above the museum.'),
                E('make my top three', 'Earn one of the three highest spots on my list.', "The rooftop café didn't make my top three.", "The view was beautiful, but the long line meant the tower didn't {gap}."),
                E('worth the hype', 'As good as people say it is.', 'The cinnamon rolls were worth the hype.', 'I finally tried the bakery everyone talks about. It was definitely {gap}.'),
                E("I'd go back just for", 'One thing alone would make me want to return.', "I'd go back just for the dumplings.", 'That bakery was tiny, but {gap} those pastries.'),
                E('a close call', 'A hard decision between options that are almost equally good.', 'Choosing between the two beaches was a close call.', 'Both bakeries were excellent, so picking a winner was {gap}.')
            ],
            songs: [
                S('One', 'U2', null, 'Listen for the tension between feeling close to someone and seeing things differently.', 'One more day there', ['one', 'reflective', 'unity'], [
                    "If you could spend one more day anywhere you've been, which three places would you choose?",
                    'Which famous place lived up to the hype when you finally saw it?',
                    'If you could relive just one hour from any trip, which one would it be?',
                    'Which trip would you put first just for the people you shared it with?'
                ]),
                S('Two Princes', 'Spin Doctors', null, 'Two people make their case. Listen for what each one has to offer.', 'Two favorites, one ticket', ['choice', 'playful', 'criteria'], [
                    'Which of your two favorite cities would you go back to this weekend?',
                    'Which two neighborhoods would you put at the top of a list of places to wander with no plan?',
                    'Which place would you go back to with friends, and which would you rather revisit on your own?',
                    'If you could go back for either your favorite view or your favorite meal from a trip, which would you pick?'
                ]),
                S('50 Ways to Leave Your Lover', 'Paul Simon', null, 'Paul Simon turns an awkward decision into a playful list of ways out.', 'Travel lists worth making', ['list', 'witty', 'options'], [
                    'What are the three best things you found by chance while traveling?',
                    "What have you seen abroad that would top a list of things you'd love to have back home?",
                    "If you made a 'Never Again' list from your trips, what would go straight to number one?",
                    'What would be the first story in a Top 5 of your funniest travel moments?'
                ])
            ],
            contexts: [
                {
                    title: 'Blind Top Five', icon: 'fa-list-ol', blindRanking: true,
                    kicker: 'Little things that make your day',
                    intro: 'Reveal one surprise at a time and place it in an open spot from best to worst. At the end, you can swap two spots once.',
                    prompt: "Which surprise might have ranked higher if you'd seen it sooner?",
                    cards: [
                        { title: 'You find R$50 in your jacket pocket.' },
                        { title: 'You wake up and realize you can sleep for two more hours.' },
                        { title: 'A friend shows up with your favorite food.' },
                        { title: 'A plan you were dreading gets canceled.' },
                        { title: 'Your phone makes it home on 1% battery.' }
                    ]
                },
                {
                    title: 'Your Travel Top 3', icon: 'fa-earth-americas', revealCards: true,
                    kicker: "Say where each pick is and what you'd go back for.",
                    intro: 'Open a category and put three picks from your trips in order. You can mix countries. If a name slips your mind, describe the place.',
                    prompt: 'If you were back at your number one right now, what would you do first?',
                    cards: [
                        { title: "Places I'd Revisit", text: 'Which three cities would you happily spend a whole weekend in again?' },
                        { title: 'Best Landmarks', text: 'Which three landmarks made you stop and stare when you saw them in person?' },
                        { title: 'Favorite Cafés', text: 'If you could go back to any café from your trips for coffee or dessert, which three would make your list?' },
                        { title: 'Best Snacks', text: 'Which three snacks would make you go back to the exact spot where you tried them?' },
                        { title: 'Hidden Gems', text: "Which three places did you stumble across that you'd make a trip for now?" },
                        { title: 'Best Views', text: 'If you could see three views again at sunset, where would you be standing?' }
                    ]
                }
            ],
            speaking: {
                title: 'Where Should I Go?', icon: 'fa-ranking-star',
                instruction: "Pick one of your travel Top 3 lists. Pretend I'm planning a trip and want your advice. Tell me what I'd miss if I skipped each place.",
                prompts: [
                    'If I could go to only one of your three picks, where would you send me?',
                    "What's the one thing I should do, see, or order there?",
                    'Which of your other picks would you recommend if I wanted somewhere quieter?',
                    'Which one would you still choose for yourself?'
                ],
                support: ['My top pick is…', "I'd go back just for…", "I'd put … above … because…", 'It was worth the hype.']
            },
            homework: [
                "Make a Top 3 of things you ate on trips that you'd go back for. Say where you had them and tell the story of your favorite.",
                "Make a Top 3 for a friend visiting a city you know. Include one thing to see, one thing to try, and one spot they might miss. Say where you'd send them first.",
                "Make a Top 5 of moments from your trips you'd like to live again. Put them in order and tell the story behind your number one."
            ],
            closing: 'A ranking becomes a conversation when the reasons matter more than the numbers.'
        }),

        61: lesson({
            title: 'Gardens, Houseplants & Green Thumbs', icon: 'fa-seedling', accent: 'teal',
            warmupTitle: 'Warm-up: How Does Your Garden Grow?', warmupIntro: 'Plants ask for light, water, patience, and somehow still develop strong opinions about exactly one window.',
            warmups: ['If you could grow anything at home and it was guaranteed to thrive, what would you grow?', 'Are you good at keeping plants alive?', 'Which plant or flower do you like most?', 'Do you prefer gardens that are decorative or useful?'],
            expressions: [
                E('To have a green thumb','To be naturally good at growing plants.', 'My neighbor has a green thumb; everything flowers.', 'After saving three difficult orchids, she seems {gap}.'),
                E('In full bloom','At the stage when flowers are completely open.', 'The garden is in full bloom in September.', 'Visitors arrive when the roses are {gap}.'),
                E('To plant the seed of an idea','To introduce an idea that may develop later.', 'The community garden planted the seed of a larger neighborhood project.', 'One balcony tomato may be enough {gap}.'),
                E('To grow on someone','To become more appealing over time.', 'The unusual cactus grew on me.', 'That dramatic purple plant is likely {gap}.'),
                E('Low-maintenance','Requiring little time or effort to care for.', 'Succulents are often considered low-maintenance.', 'A busy traveler needs a {gap} plant.'),
                E('To weed something out','To remove unwanted parts from a group or system.', 'We weeded weak ideas out of the final design.', 'The gardener needed {gap} before planting herbs.')
            ],
            songs: [
                S('Garden Party','Ricky Nelson',null,'Country rock uses a garden party as the setting for expectations, performance, and doing things in your own way.','What people bring to a shared garden',['garden','easygoing','expectations'],['Do you enjoy meeting people in gardens or other outdoor spaces?', 'Have you ever attended an outdoor party?', 'Do you find it easier to talk to people outdoors?', 'Would you join a community garden?']),
                S('Flowers','Miley Cyrus',null,'Pop uses flowers as a simple symbol of care, independence, and giving something pleasant to yourself.', 'Why flowers carry messages',['flowers','confident','care'],['Do you ever buy flowers for yourself or other people?', 'Which flower or plant is especially memorable to you?', 'What small thing would you buy yourself to make an ordinary day better?', 'Would you prefer a living plant or cut flowers?']),
                S('Where the Green Grass Grows','Tim McGraw',null,'Country music imagines a greener, slower setting as the ideal place to build a satisfying daily life.', 'The appeal of green space',['grass','warm','space'],['Which green space do you use most often?', 'Do you spend enough time outdoors?', 'Has a small garden or park improved your neighborhood?', 'Should cities protect more space for gardens and parks?'])
            ],
            contexts: [
                C(
                    'A Spot I’d Actually Use',
                    'Make a little room for plants',
                    'Pick a spot and tell me what you’d grow there. Think of one thing you’d like to see, smell, or pick.',
                    'Where have you seen plants that made you want to stop and look?',
                    [
                        { title: 'A Tiny Balcony', text: 'There’s room for two pots and one chair.' },
                        { title: 'A Kitchen Window', text: 'There’s an empty ledge right by the sink.' },
                        { title: 'A Shared Courtyard', text: 'You and a neighbor have an empty corner.' },
                        { title: 'A Front Step', text: 'There’s room for one pot next to the door.' }
                    ],
                    'fa-seedling'
                ),
                C(
                    'A Plant as a Gift',
                    'Think of someone you know',
                    'Pick one person and choose a plant you’d give them. Tell me what made you think of that plant.',
                    'Which plant would you be tempted to keep for yourself?',
                    [
                        { title: 'The Home Cook', text: 'They love trying new recipes on weekends.' },
                        { title: 'The New Neighbor', text: 'They’ve just moved in and their place still feels empty.' },
                        { title: 'The Forgetful Friend', text: 'They love plants and often forget to water them.' },
                        { title: 'You', text: 'You get to pick something you’d enjoy seeing every day.' }
                    ],
                    'fa-leaf'
                )
            ],
            speaking: {title:'Your Life with Plants',icon:'fa-trowel',prompts:['How do you usually care for a houseplant?', 'Which low-maintenance plant would you recommend?', 'Would you like to grow herbs or vegetables at home?', 'What makes a public garden pleasant for you?'],support:['The plant may need…', 'It is low-maintenance because…', 'The garden would be in full bloom…', 'We should weed out…']},
            homework: ['Create a care card for a real plant you own or would realistically keep.', 'Plan a small garden for a real space, considering light, time, and purpose.', 'Describe a plant problem you have seen and the steps you would take before changing its care.'],
            closing: 'A little green space creates a surprising amount of conversation.'
        }),

        62: lesson({
            title: 'Social Rules, Manners & Pet Peeves', icon: 'fa-face-grimace', accent: 'yellow',
            warmupTitle: 'Warm-up: Polite Society, Tiny Annoyances', warmupIntro: 'Civilization is held together by patience, greetings, and people who do not play videos aloud on the bus.',
            warmups: ['Which small act of politeness improves your day?', 'What harmless habit annoys you more than it should?', 'Have you ever been surprised by a social rule in another place?', 'Do you usually say something when a stranger behaves rudely?'],
            expressions: [
                E('A pet peeve','A small behavior that especially annoys someone.','Loud chewing is his biggest pet peeve.','People blocking doorways is {gap} of mine.'),
                E('To have good manners','To behave politely and considerately.','She has good manners with staff and guests.','Waiting your turn is one way {gap}.'),
                E('To rub someone the wrong way','To irritate or create a negative impression.','His constant interruptions rub people the wrong way.','That sarcastic tone is likely {gap}.'),
                E('An unwritten rule','A social expectation that is not formally stated.','Standing on one side is an unwritten escalator rule.','Refilling the office coffee pot is {gap}.'),
                E('To call someone out','To directly criticize inappropriate behavior.','She called him out for skipping the line.','Would you be willing {gap} in front of everyone?'),
                E('To let it slide','To choose not to react to a minor problem.','It was one late reply, so I let it slide.','For a first mistake, we may decide {gap}.')
            ],
            songs: [
                S("Why Can't We Be Friends",'War',null,'A relaxed rock groove makes cooperation sound simple even when people are not identical.','Getting along without agreeing on everything',['friendship','relaxed','difference'],['Which minor disagreement should never ruin a friendship?', 'Have you ever laughed about a disagreement later?', 'Is humor helpful when a conversation becomes awkward?', 'Do you find it easy to disagree with friends politely?']),
                S("You're So Vain",'Carly Simon',null,'Witty pop-rock turns one memorable personality into a portrait of extreme self-importance.','When confidence becomes self-centeredness',['vanity','witty','behavior'],['Which conversation habit makes someone seem self-centered?', 'What would a good listener do in the first minute of meeting you?', 'Have you ever realized you were talking too much?', 'How do you change the subject politely?']),
                S('Yakety Yak','The Coasters',null,'Rock-and-roll turns household commands and teenage resistance into playful conflict.','Why rules sound different depending on who says them',['rules','comic','chores'],['Which household rule causes the most arguments?', 'Which chore do you dislike most?', 'Do people in your home divide chores fairly?', 'Is it easy for you to ask someone to do something politely?'])
            ],
            contexts: [
                C(
                    'Would You Say Something?',
                    'One real-life reply',
                    'Pick a situation. Say the words you’d actually use, or tell me what would make you let it go.',
                    'Which one would bother you enough to speak up right away?',
                    [
                        { title: 'On the Bus', text: 'Someone is watching videos out loud on an otherwise quiet bus.' },
                        { title: 'In the Doorway', text: 'Two people stop to chat, and you’re trying to get through.' },
                        { title: 'Over Lunch', text: 'A friend keeps looking at their phone while you’re telling a story.' },
                        { title: 'In Line', text: 'Someone steps in front of you and acts as if they’ve been there all along.' }
                    ],
                    'fa-comment'
                ),
                C(
                    'At Someone Else’s Place',
                    'You’re visiting for the first time',
                    'Pick a moment and say what you’d do or ask. Then tell me what usually happens in your own home.',
                    'Which of these moments feels most awkward when you’re somewhere new?',
                    [
                        { title: 'At the Door', text: 'You see shoes by the entrance as your host waves you in.' },
                        { title: 'Early Arrival', text: 'You get there 20 minutes before they’re expecting you.' },
                        { title: 'The Last Slice', text: 'There’s one slice of pizza left and nobody’s touching it.' },
                        { title: 'Time to Go', text: 'You want to leave, but everyone is still deep in conversation.' }
                    ],
                    'fa-door-open'
                )
            ],
            speaking: {title:'Your Social Habits',icon:'fa-phone',prompts:['Which social situation makes you feel awkward?', 'What is your biggest harmless pet peeve?', 'Do you politely call someone out when they skip a line?', 'Which unwritten rule should everyone know?'],support:['Would you mind…?','I may be overreacting, but…','The unwritten rule here is…','I would let it slide unless…']},
            homework: ['Collect three unwritten rules from different places.','Describe a cultural manners surprise without judging it.','Turn one complaint into a polite, specific request.'],
            closing: 'Good manners are mostly the art of noticing other people.'
        }),

        63: lesson({
            title: 'Lost, Found & Unexpected Objects', icon: 'fa-magnifying-glass', accent: 'rose',
            warmupTitle: 'Warm-up: Where Did I Put It?', warmupIntro: 'Lost objects travel through pockets, sofas, taxis, and mysterious dimensions before reappearing exactly where someone already checked twice.',
            warmups: ['What object do you misplace most often?', 'Where do your lost things usually turn up?', 'What’s the strangest thing you’ve ever found in a pocket or bag you hadn’t used in a while?', 'Do you normally return objects that you find?'],
            expressions: [
                E('To misplace something','To put an object somewhere and temporarily forget where.', 'I misplaced my glasses again.', 'It is surprisingly easy {gap} during a busy morning.'),
                E('To turn up','To be found or appear unexpectedly.', 'The missing receipt turned up inside a cookbook.', 'Lost keys are likely {gap} in the last place anyone expects.'),
                E('The lost and found','A place where lost items are stored for their owners.', 'Someone took the umbrella to the lost and found.', 'The unusual hat waited in {gap} for three weeks.'),
                E('To retrace your steps','To return along the route you followed earlier.', 'I retraced my steps from the station to the café.', 'When a wallet disappears, it helps {gap}.'),
                E('To return something to its rightful owner','To give a found object back to the person who owns it.', 'The hotel returned the ring to its rightful owner.', 'The message helped the team {gap}.'),
                E('Hidden in plain sight','Easy to see but unnoticed.', 'The remote was hidden in plain sight on the black table.', 'The final clue remained {gap}.')
            ],
            songs: [
                S('Lost in the Supermarket','The Clash',null,'Rock places disorientation inside an extremely ordinary public place full of signs, products, and choices.', 'Feeling lost in a familiar place',['lost','restless','surroundings'],['Where is it easy for you to lose your sense of direction?', 'Have you ever become lost in a familiar place?', 'Do you use signs, maps, or your phone to find your way?', 'Which sign would you add to a place where you always get turned around?']),
                S('Return to Sender','Elvis Presley',null,'Rock-and-roll turns a returned letter into a repeated physical clue that something has gone wrong.', 'When an object cannot reach its destination',['return','playful','message'],['What item have you had to return or send back?', 'Have you ever received a package meant for someone else?', 'Do you double-check an address before sending something?', 'What do you usually do when you find someone’s lost item?']),
                S("I Still Haven't Found What I'm Looking For",'U2',null,'Rock uses an unfinished search as a powerful image of continuing to look beyond the obvious.', 'Why searching can become a story',['search','expansive','persistence'],['What object took you too long to find?', 'Do you retrace your steps when something disappears?', 'Have you ever found something after you stopped searching?', 'Which lost object would be most difficult for you to replace?'])
            ],
            contexts: [
                C(
                    'Which One Is Yours?',
                    'At the lost and found',
                    'Pick an item silently. Describe it to the clerk in your own words without naming it, and say where you last had it. The clerk guesses.',
                    'What detail would make your own bag or phone easy to recognize?',
                    [
                        { title: 'Umbrella', text: 'The handle is bent, and you had it on the bus.' },
                        { title: 'Earbuds', text: 'There’s a blue sticker on the case. You last used them at the gym.' },
                        { title: 'Notebook', text: 'There’s a doodle on the cover. You last had it at a café.' },
                        { title: 'Water Bottle', text: 'It has a dent near the bottom. You left it by a park bench.' }
                    ],
                    'fa-magnifying-glass'
                ),
                C(
                    'Where Would You Look First?',
                    'Your keys have disappeared',
                    'You opened the door, carried in the groceries, and sat down. Now your keys are gone. Pick your first place to look and tell me why.',
                    'Where’s the weirdest place you’ve actually found something you’d lost?',
                    [
                        { title: 'The Front Door', text: 'You might have left the keys in the lock.' },
                        { title: 'The Kitchen Counter', text: 'You might have set them down while unpacking.' },
                        { title: 'The Sofa', text: 'They might have slipped out of your pocket.' },
                        { title: 'The Fridge', text: 'You might have put them down while putting the food away.' }
                    ],
                    'fa-key'
                )
            ],
            speaking: {title:'Your Lost-and-Found Stories',icon:'fa-user-secret',prompts:['What is the most important thing you have lost?', 'How do you usually retrace your steps?', 'Have you ever used a lost-and-found service?', 'What should happen to objects nobody claims?'],support:['It last turned up…', 'I would retrace my steps from…', 'The detail only the owner knows is…', 'It may be hidden in plain sight…']},
            homework: ['Write about a real occasion when you lost or found an object.', 'Write a clear description that could be given to a lost-and-found employee.', 'Describe the step-by-step search for something that was hidden in plain sight.'],
            closing: 'A lost object is an ordinary mystery waiting for the right question.'
        }),

        64: lesson({
            title: 'Customer Service, Complaints & Five-Star Reviews', icon: 'fa-headset', accent: 'green',
            warmupTitle: 'Warm-up: How Can I Help?', warmupIntro: 'Customer service is where patience, clear details, and a seventeen-digit reference number meet music that promises your call is important.',
            warmups: ['Do you usually complain when an order is wrong?', 'Who would get five stars from you for helping you solve a problem? What did they do?', 'Do you write online reviews of products or services?', 'Do you read reviews before buying something?'],
            expressions: [
                E('To hold the line','To wait on the telephone without ending the call.', 'Please hold the line while I check the order.', 'The recorded voice asked everyone {gap}.'),
                E('To get through to someone','To successfully contact a person by phone or message.', 'I finally got through to the delivery team.', 'It took three attempts {gap} who could help.'),
                E('To sort something out','To resolve a problem or confusing situation.', 'The manager sorted the billing problem out quickly.', 'A clear receipt should help us {gap}.'),
                E('To make a complaint','To formally express dissatisfaction.', 'She made a polite complaint about the damaged item.', 'The repeated charge gave him a reason {gap}.'),
                E('To ask for a refund','To request that money be returned.', 'The product never arrived, so I asked for a refund.', 'With the wrong size delivered twice, they decided {gap}.'),
                E('To go the extra mile','To make more effort than is normally expected.', 'The hotel went the extra mile and found the missing bag.', 'A short follow-up message can show that a company is willing {gap}.')
            ],
            songs: [
                S('Hold the Line','Toto',null,'Rock turns waiting for a response into an urgent, memorable command familiar to anyone who has used a telephone.', 'The emotional experience of waiting',['waiting','urgent','response'],['Are you patient when waiting for customer service?', 'Have you ever spent a long time on hold?', 'Do you prefer waiting on the phone or receiving a callback?', 'What do you usually do while you are waiting?']),
                S('Call Me','Blondie',null,'New-wave pop makes direct contact sound immediate, confident, and available at any time.', 'How easy should contact be?',['contact','energetic','availability'],['Do you prefer contacting a company by phone, chat, or email?', 'Have you ever had difficulty reaching a real person?', 'Do you explain problems more easily in writing or by phone?', 'Do chatbots usually help you?']),
                S('I Want It That Way','Backstreet Boys',null,'Pop repeats a direct statement of preference—exactly the language behind many requests, expectations, and complaints.', 'Stating what you want clearly',['preference','polished','clarity'],['Is it easy for you to explain exactly what you want?', 'Would you choose an instant refund or wait two days for a replacement? What would make you switch?', 'Have you ever asked for a refund or replacement?', 'Do you stay polite when a problem takes a long time to solve?'])
            ],
            contexts: [
                C(
                    'What Would You Actually Text?',
                    'Your first message to customer service',
                    'Pick a problem and say the first message you’d send. The other person is customer support and offers you a fix.',
                    'What reply would make you want to give that business another chance?',
                    [
                        { title: 'Missing Fries', text: 'The food just arrived, and part of your order is missing.' },
                        { title: 'Charged Twice', text: 'You paid once, but the same charge shows up twice.' },
                        { title: 'Late Birthday Gift', text: 'The gift is still on its way, and the birthday is tomorrow.' },
                        { title: 'Broken Zip', text: 'The zip broke the first time you used your new bag.' }
                    ],
                    'fa-headset'
                ),
                C(
                    'Give It a Star Rating',
                    'Your review in one line',
                    'Pick an experience. Give it one to five stars and say one line you’d actually leave in a review.',
                    'What would make you change your rating by one star?',
                    [
                        { title: 'The Cold Pizza', text: 'They replaced it quickly and brought you a free dessert.' },
                        { title: 'The Hotel Stay', text: 'The room was great, and construction outside started at 7 a.m.' },
                        { title: 'The Useful App', text: 'It worked well, but it took you 20 minutes to find out how to cancel.' },
                        { title: 'The Sold-Out Item', text: 'The clerk called another shop to check if they had it for you.' }
                    ],
                    'fa-star'
                )
            ],
            speaking: {title:'Your Customer-Service Experiences',icon:'fa-headset',prompts:['What was your most recent customer-service experience?', 'Do you usually leave online reviews?', 'Which type of service problem annoys you most?', 'Do you prefer speaking to a person or using a chatbot?'],support:['I’m calling about…', 'What I expected was…', 'Could you help me sort out…?', 'A reasonable solution would be…']},
            homework: ['Write one poor complaint and then improve it.', 'Compare two real online reviews and explain which one is more useful.', 'Write a customer-service policy for a business or service you know.'],
            closing: 'A clear request turns frustration into a conversation that can go somewhere.'
        })
    };
}());
