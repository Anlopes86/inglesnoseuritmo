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
    const C = (title, kicker, intro, prompt, cards, icon) => ({ title, kicker, intro, prompt, cards, icon });
    const P = (expressions) => expressions.map((item) => ({ text: item.practice, answer: item.term }));
    const lesson = (config) => ({ ...config, practice: P(config.expressions) });

    window.CONVERSATION_LESSONS_49_64 = {
        49: lesson({
            title: 'Names, Nicknames & Secret Identities', icon: 'fa-id-badge', accent: 'rose',
            warmupTitle: 'Warm-up: What Should We Call You?',
            warmupIntro: 'A name can carry history, start a conversation, or become completely irrelevant when a perfect nickname arrives.',
            warmups: [
                'Do you know why your name was chosen?',
                'Do your friends and family use the same name for you?',
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
                    'Would you feel comfortable asking someone how to pronounce their name?'
                ]),
                S('Name', 'Goo Goo Dolls', null, 'Alternative rock treats a name as something personal that can remain private even when the world asks for a label.', 'Names, privacy, and recognition', ['name', 'reflective', 'privacy'], [
                    'Which version of your name feels most natural to you?',
                    'Have people ever shortened or mispronounced your name?',
                    'Do stage names change the way you see an artist?',
                    'Would you use a different name for work or social media?'
                ])
            ],
            contexts: [
                C('The Nickname Workshop', 'A good nickname needs a reason.', 'Create nicknames from habits, talents, favorite objects, accidental moments, or ironic opposites. Keep them affectionate and easy to explain.', 'Which nickname would actually stick?', [
                    { title: 'Habit', text: '“Two Coffees” always arrives carrying both.' },
                    { title: 'Talent', text: '“GPS” never gets lost inside a building.' },
                    { title: 'Opposite', text: '“Speedy” takes forty minutes to choose lunch.' },
                    { title: 'Origin Story', text: '“Captain” once organized a chaotic beach trip.' }
                ], 'fa-tags'),
                C('The Secret-Identity Passport', 'One person, one cover story, three details.', 'Choose an alias, occupation, signature object, and harmless mission. The identity should sound believable until one detail makes it delightfully strange.', 'Which detail makes the identity memorable?', [
                    { title: 'Alias', text: 'A name that fits the role without sounding obvious.' },
                    { title: 'Occupation', text: 'A mobile piano tuner or professional queue tester.' },
                    { title: 'Object', text: 'A red notebook that never contains notes.' },
                    { title: 'Mission', text: 'Find the person replacing office spoons with tiny forks.' }
                ], 'fa-user-secret')
            ],
            speaking: { title: 'The Naming Agency', icon: 'fa-signature', prompts: [
                'What do people usually call you, and why?',
                'Have you ever given someone a nickname that stayed?',
                'Which names or nicknames are difficult for you to remember?',
                'Do unusual names usually help or hurt a first impression?'
            ], support: ['I go by…', 'The name comes from…', 'The nickname stuck because…', 'Under this alias, I would…'] },
            homework: ['Create five character names and explain what each one suggests.', 'Write the origin story of an invented nickname.', 'Design a secret-identity passport with four convincing details.'],
            closing: 'A name is a first clue, not the complete story.'
        }),

        50: lesson({
            title: 'Games, Puzzles & Escape Rooms', icon: 'fa-puzzle-piece', accent: 'indigo',
            warmupTitle: 'Warm-up: Your Move', warmupIntro: 'A good game can reveal logic, creativity, patience, and who becomes suspiciously competitive over a plastic sheep.',
            warmups: ['Which game can you happily play more than once?', 'Do you prefer solving a puzzle alone or thinking aloud with a team?', 'How competitive are you when you play with other people?', 'Have you ever stopped playing a game because the rules were confusing?'],
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
                    'Are puzzles more fun alone or with other people?'
                ]),
                S('The Logical Song', 'Supertramp', null, 'Progressive pop-rock questions what it means to be logical, practical, and certain.', 'Logic versus imagination', ['logic', 'reflective', 'certainty'], [
                    'When do you trust logic more than intuition?',
                    'Do you like explaining how you reached an answer?',
                    'Have you ever solved a problem in an unexpected way?',
                    'Can games help you think differently in real situations?'
                ])
            ],
            contexts: [
                C('The Escape-Room Briefing', 'Four locks, sixty minutes, one suspicious lamp.', 'Your team enters a room with a map, a broken clock, five postcards, a locked suitcase, and a plant that may be a clue or simply a plant.', 'Which object should the team examine first?', [
                    { title: 'Pattern', text: 'The postcards show times instead of places.' },
                    { title: 'Sound', text: 'The clock makes one extra click every minute.' },
                    { title: 'Language', text: 'The map labels one street in a different alphabet.' },
                    { title: 'Teamwork', text: 'Two clues must be viewed at the same time.' }
                ], 'fa-key'),
                C('The House-Rule Court', 'Every group eventually invents its own version.', 'Choose which rules improve a game and which create chaos: trading cards, time limits, second chances, secret partnerships, bonus points, or a punishment for checking your phone.', 'Which house rule would you keep?', [
                    { title: 'Speed', text: 'Every turn lasts no more than forty seconds.' },
                    { title: 'Mercy', text: 'A new player receives one free mistake.' },
                    { title: 'Chaos', text: 'A mystery rule appears halfway through.' },
                    { title: 'Story', text: 'Every move needs a dramatic explanation.' }
                ], 'fa-gavel')
            ],
            speaking: { title: 'The Game Designer’s Table', icon: 'fa-dice', prompts: ['What game do you usually play with friends or family?', 'Have you ever tried an escape room? What was it like?', 'Which game rule do people often misunderstand?', 'Do you prefer games based on luck, skill, or conversation?'], support: ['Players take turns…', 'The goal is to…', 'The clue suggests…', 'This keeps a level playing field because…'] },
            homework: ['Write clear rules for a five-minute original game.', 'Create three connected escape-room clues.', 'Review a game by comparing fun, fairness, strategy, and replay value.'],
            closing: 'A good game gives every player a reason to think, react, and talk.'
        }),

        51: lesson({
            title: 'Weather, Seasons & Mood', icon: 'fa-cloud-sun', accent: 'orange',
            warmupTitle: 'Warm-up: Today’s Emotional Forecast', warmupIntro: 'Weather changes clothes, plans, conversations, and the universal mystery of people who carry umbrellas only when it is sunny.',
            warmups: ['Which kind of weather gives you the most energy?', 'Do you check the weather forecast every day?', 'What do you usually do on a rainy afternoon?', 'Does the weather affect your mood?'],
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
                S('Rain on Me', 'Lady Gaga & Ariana Grande', null, 'Dance-pop turns rain into an energetic image of accepting discomfort and continuing to move.', 'Turning bad weather into momentum', ['rain', 'energetic', 'acceptance'], ['Do you enjoy going out when it is raining?', 'What is your favorite rainy-day plan?', 'Have you ever been caught in heavy rain without an umbrella?', 'Does rain make your city feel calmer or more stressful?']),
                S('Colder Weather', 'Zac Brown Band', null, 'Country storytelling connects cold weather, movement, distance, and the pull between staying and leaving.', 'Weather as part of a decision', ['cold', 'reflective', 'movement'], ['Which season changes your routine the most?', 'Do you prefer hot weather or cold weather?', 'Have you ever visited a place with a very different climate?', 'Would you move to another city because of the weather?'])
            ],
            contexts: [
                C('The Weather Personality Test', 'Choose a forecast that sounds like you.', 'Match each weather type to a personality, social plan, soundtrack, and ideal meal. There are no scientific results—only useful language and strong opinions.', 'Which forecast best matches your energy today?', [{title:'Clear Sky',text:'Direct, energetic, and ready to begin early.'},{title:'Light Rain',text:'Calm, reflective, and looking for a window seat.'},{title:'Thunderstorm',text:'Dramatic, productive, and impossible to ignore.'},{title:'Changing Clouds',text:'Flexible, curious, and refusing to choose one plan.'}], 'fa-temperature-half'),
                C('The Forecast-Proof Event', 'The event must work in four seasons.', 'Plan one celebration that can survive heat, cold, rain, and strong wind. Keep the main idea while adapting the place, clothes, food, and activities.', 'Which weather condition forces the most creative Plan B?', [{title:'Heat',text:'Provide shade, water, and a slower schedule.'},{title:'Cold',text:'Use warm food, movement, and smaller spaces.'},{title:'Rain',text:'Protect the route and make indoors feel intentional.'},{title:'Wind',text:'Remove anything that can become an accidental kite.'}], 'fa-cloud-showers-heavy')
            ],
            speaking: { title: 'The Weather Studio', icon: 'fa-satellite-dish', prompts: ['How does today’s weather affect your plans?', 'What do you usually do when the forecast changes suddenly?', 'Which season fits your personality best?', 'Have you ever experienced weather that genuinely surprised you?'], support: ['The forecast calls for…', 'If it clears up…', 'Come rain or shine…', 'Our Plan B would be…'] },
            homework: ['Write a weather diary that includes mood, clothes, plans, and one observation.', 'Create a four-season guide for one activity.', 'Describe an imaginary town whose unusual weather shapes daily life.'],
            closing: 'Weather gives every ordinary plan a setting, a mood, and occasionally a surprise ending.'
        }),

        52: lesson({
            title: 'Noise, Silence & Everyday Soundscapes', icon: 'fa-ear-listen', accent: 'pink',
            warmupTitle: 'Warm-up: What Can You Hear?', warmupIntro: 'Every place has a soundtrack: traffic, birds, keyboards, neighbors, coffee machines, and one mysterious beep nobody can locate.',
            warmups: ['Which everyday sound do you find especially satisfying?', 'Do you need background sound when you work or study?', 'What harmless noise annoys you more than it should?', 'Where can you go when you genuinely need silence?'],
            expressions: [
                E('Background noise', 'Sound that is present but not the main focus.', 'The café has gentle background noise.', 'Soft conversation created comfortable {gap}.'),
                E('Peace and quiet', 'A calm situation without unwanted noise.', 'I went to the library for some peace and quiet.', 'After the festival, everyone wanted {gap}.'),
                E('To hear yourself think', 'To have enough quiet to concentrate.', 'The office was so loud that I could not hear myself think.', 'You need a quieter room {gap}.'),
                E('A deafening silence', 'A silence that feels unusually strong or meaningful.', 'After the strange announcement, a deafening silence filled the room.', 'The failed joke was followed by {gap}.'),
                E('To fall on deaf ears', 'To be ignored or not considered.', 'Our requests for a quieter machine fell on deaf ears.', 'Another unexplained warning is likely {gap}.'),
                E('Noise pollution', 'Harmful or disturbing environmental sound.', 'Late-night traffic creates serious noise pollution.', 'Better building design can reduce {gap}.')
            ],
            songs: [
                S('The Sound of Silence', 'Simon & Garfunkel', null, 'Folk rock gives silence a presence and asks what happens when communication becomes sound without connection.', 'When silence says something', ['silence', 'haunting', 'attention'], ['When does silence feel comfortable rather than awkward?', 'Do you prefer silence or soft music when you need to concentrate?', 'Have you ever misunderstood someone’s silence?', 'Are you comfortable sitting quietly with another person?']),
                S('Noise', 'Kenny Chesney', null, 'Country rock describes a world crowded by alerts, voices, advertising, engines, and nonstop information.', 'Living inside constant noise', ['noise', 'restless', 'overload'], ['Which modern sound would you most like to mute for one day?', 'Do phone notifications interrupt you often?', 'Where is the noisiest place in your routine?', 'Have you ever left a place because it was too noisy?']),
                S('Listen to the Music', 'The Doobie Brothers', null, 'Classic rock treats shared listening as an invitation to relax, gather, and pay attention together.', 'Listening as a social act', ['listening', 'upbeat', 'connection'], ['Which place has the most recognizable sounds in your routine?', 'Do you listen to music while working or travelling?', 'Which sounds help you relax?', 'Are you good at listening when there are distractions around you?'])
            ],
            contexts: [
                C('The Sound Map', 'Close your eyes and build a story from sound.', 'Listen for twenty seconds. Choose three sounds and describe where they come from, how they feel, and what scene they could belong to. Compare your imagined scenes.', 'Which sound creates the best story?', [{title:'Near',text:'Breathing, fabric, a keyboard, or a glass on a table.'},{title:'Middle',text:'Conversation, appliances, footsteps, or doors.'},{title:'Far',text:'Traffic, weather, animals, or construction.'},{title:'Imagined',text:'The sound that would completely change the scene.'}], 'fa-map-location-dot'),
                C('The Quiet-Space Challenge', 'Quiet does not have to feel empty.', 'Design a café, waiting room, office, or train carriage where people can concentrate without feeling uncomfortable or controlled.', 'Which design choice matters most?', [{title:'Materials',text:'Soft surfaces reduce echoes and sharp sounds.'},{title:'Zones',text:'Conversation and quiet receive separate spaces.'},{title:'Signals',text:'Clear signs replace angry personal reminders.'},{title:'Choice',text:'People can select lively, calm, or silent areas.'}], 'fa-volume-low')
            ],
            speaking: { title: 'The Sound Designer’s Booth', icon: 'fa-sliders', prompts: ['What sounds can you hear right now?', 'Which place in your routine is noisier than you would like?', 'Do you prefer a quiet café or a lively one?', 'Which sound brings back a strong memory for you?'], support: ['In the background, you can hear…', 'The sound is rhythmic/sharp/distant…', 'Without that noise…', 'The space needs more peace and quiet because…'] },
            homework: ['Record a written sound diary for three different places.', 'Write a short scene in which silence changes the meaning.', 'Design a quiet-zone proposal for one noisy environment.'],
            closing: 'A soundscape tells the story of a place before anyone explains it.'
        }),

        53: lesson({
            title: 'Birthdays, Gifts & Celebration Personalities', icon: 'fa-cake-candles', accent: 'indigo',
            warmupTitle: 'Warm-up: Make a Wish', warmupIntro: 'Some people want a room full of balloons. Others want cake, two friends, and no public singing whatsoever.',
            warmups: ['What kind of birthday celebration suits your personality?', 'Do you enjoy organizing celebrations for other people?', 'Have you ever received a simple but thoughtful gift?', 'Do you prefer choosing your gift or being surprised?'],
            expressions: [
                E('To mark the occasion','To do something special for an important event.','We took a group photo to mark the occasion.','A handwritten note is a simple way {gap}.'),
                E('To make a fuss of someone','To give someone warm attention on a special day.','Her friends made a fuss of her at breakfast.','On birthdays, some families love {gap}.'),
                E('A thoughtful gift','A present chosen with care for the receiver.','The playlist was a thoughtful gift.', 'Something handmade can be {gap}.'),
                E('A surprise party','A celebration planned without the main person knowing.', 'They organized a surprise party in the garden.', 'Keeping {gap} secret requires a very quiet group chat.'),
                E('A milestone birthday','A birthday considered especially significant.', 'Turning fifty was a milestone birthday for her.', 'The family planned a trip for {gap}.'),
                E('It’s the thought that counts','Good intentions matter more than price or perfection.', 'The cake leaned to one side, but it’s the thought that counts.', 'The card arrived late; still, {gap}.')
            ],
            songs: [
                S('Birthday', 'The Beatles', null, 'Straightforward rock turns the occasion into an energetic invitation to celebrate together.', 'What makes a celebration feel alive', ['birthday', 'energetic', 'togetherness'], ['Do you usually enjoy your birthday?', 'Which birthday tradition do you like most?', 'Have you ever had or attended a surprise party?', 'Do you prefer a small celebration or a large one?']),
                S("It's My Party", 'Lesley Gore', null, 'Classic pop adds emotional drama to a party that is supposed to be joyful and public.', 'When the celebration does not follow the plan', ['party', 'dramatic', 'expectations'], ['Do you usually enjoy going to parties?', 'Have you ever left a party earlier than planned?', 'What helps you feel comfortable at a social event?', 'Do you prefer being the host or being a guest?']),
                S('My Wish', 'Rascal Flatts', null, 'Country-pop turns a gift into words of encouragement for someone beginning another year or chapter.', 'Giving wishes instead of objects', ['wish', 'warm', 'encouragement'], ['Do you usually send personal birthday messages?', 'Which gift do you still remember clearly?', 'Do you prefer receiving experiences or physical gifts?', 'Have you ever received a gift that showed someone understood you well?'])
            ],
            contexts: [
                C('The Gift Laboratory','Match the gift to the person, not the price.', 'Choose one fictional person below. Ask your partner two questions about them, suggest a gift, and defend your choice. Then switch people and roles.', 'Which gift sounds most thoughtful?', [{title:'The Minimalist',text:'Owns little and loves long conversations.'},{title:'The Explorer',text:'Collects experiences but has no free weekends.'},{title:'The Maker',text:'Enjoys tools, materials, and unfinished projects.'},{title:'The Impossible One',text:'Says, “I don’t need anything,” and means it.'}], 'fa-gift'),
                C('The Celebration Personality Test','Not everyone wants the same amount of attention.', 'Design four versions of the same birthday: quiet, social, adventurous, and completely ridiculous. Let the guest of honor choose without judgment.', 'Which version would be easiest to organize well?', [{title:'Quiet',text:'A favorite meal, two people, and no surprise singing.'},{title:'Social',text:'A flexible gathering with room to move and talk.'},{title:'Active',text:'A shared challenge followed by relaxed food.'},{title:'Ridiculous',text:'A formal ceremony for an imaginary royal title.'}], 'fa-champagne-glasses')
            ],
            speaking: {title:'The Celebration Planner',icon:'fa-calendar-check',prompts:['How do you usually celebrate your birthday?', 'What is the most thoughtful gift you have received?', 'Have you ever helped organize a surprise?', 'Do adults make too much or too little fuss about birthdays?'],support:['To mark the occasion…', 'This gift is thoughtful because…', 'The guest of honor would prefer…', 'Our surprise Plan B is…']},
            homework: ['Write a gift guide for three very different fictional people.', 'Plan a celebration with a limited budget and one unusual constraint.', 'Create a birthday message that is specific, warm, and not sentimental.'],
            closing: 'The best celebration fits the person, not a standard formula.'
        }),

        54: lesson({
            title: 'Amusement Parks & Imaginary Attractions', icon: 'fa-ticket', accent: 'purple',
            warmupTitle: 'Warm-up: Welcome to the Park', warmupIntro: 'A theme park is where people wait ninety minutes to be frightened for ninety seconds—and then immediately join another line.',
            warmups: ['Have you ever visited a large amusement park?', 'Which kind of attraction do you enjoy most?', 'What ride would you refuse even if the line were empty?', 'How long are you willing to wait for a popular attraction?'],
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
                S('Fun, Fun, Fun', 'The Beach Boys', null, 'Fast pop-rock celebrates movement, freedom, and the pure attraction of an exciting machine.', 'When the ride becomes the event', ['fun', 'bright', 'movement'], ['Which attraction makes you feel like a child again?', 'Who would you most enjoy visiting a theme park with?', 'Do you spend more time on rides, shows, or food?', 'Can a park be fun without fast or frightening attractions?']),
                S('On Top of the World', 'Imagine Dragons', null, 'Upbeat pop-rock turns height into a feeling of achievement, wonder, and seeing everything differently.', 'Views, heights, and perspective', ['height', 'uplifting', 'perspective'], ['Are you comfortable with heights?', 'Have you ever ridden a Ferris wheel or observation ride?', 'Which high place gave you a memorable view?', 'Do clear safety explanations help you relax on a ride?'])
            ],
            contexts: [
                C('The Ride Pitch','Thirty seconds to sell one impossible attraction.', 'Combine a setting, motion, story, surprise, and harmless limitation. The attraction must sound exciting without pretending every visitor wants the same intensity.', 'Which pitch deserves to be built?', [{title:'Setting',text:'A bakery, a moon base, a library, or the inside of a clock.'},{title:'Motion',text:'Float, spin, slide, climb, or move backward very slowly.'},{title:'Surprise',text:'The final room changes based on one earlier choice.'},{title:'Limit',text:'Nobody gets wet, dizzy, trapped, or publicly embarrassed.'}], 'fa-person-chalkboard'),
                C('The Three-Zone Park','A small park needs strong choices.', 'Choose only three zones. Take turns pitching one zone, asking a follow-up question, and deciding where it belongs on the map.', 'Which zone should be nearest the entrance?', [{title:'Thrill',text:'Fast rides with clear intensity ratings.'},{title:'Wonder',text:'Beautiful spaces, light, sound, and hidden detail.'},{title:'Play',text:'Interactive attractions for groups and solo visitors.'},{title:'Recharge',text:'Quiet seating, water, shade, and no forced entertainment.'}], 'fa-map')
            ],
            speaking: {title:'The Attraction Design Studio',icon:'fa-compass-drafting',prompts:['Which amusement park experience do you remember most clearly?', 'What makes waiting in a long line more tolerable?', 'Would you visit a park if you did not like rollercoasters?', 'Can a simple classic ride be better than an expensive high-tech one?'],support:['The main attraction is…', 'Visitors queue up to…', 'The surprise happens when…', 'It is worth the wait because…']},
            homework: ['Draw and describe a six-zone imaginary park.', 'Write a safety announcement that is clear and funny.', 'Review an attraction using atmosphere, comfort, originality, and excitement.'],
            closing: 'A memorable attraction gives people a story before, during, and after the ride.'
        }),

        55: lesson({
            title: 'What If…? Absurd Scenarios', icon: 'fa-circle-question', accent: 'cyan',
            warmupTitle: 'Warm-up: Reality Has Left the Chat', warmupIntro: 'Logic is welcome, but today it must wear a ridiculous hat.',
            warmups: ['Do you enjoy absurd or nonsensical humor?', 'Which “what if” question has made you laugh?', 'Have you ever created a silly story with friends?', 'Do serious people sometimes enjoy the strangest jokes?'],
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
                S('Rock Lobster',"The B-52's",null,'New-wave rock commits completely to a surreal beach scene and turns nonsense into a dance-floor world.','Building an absurd world',['surreal','playful','imagination'],['Have you heard “Rock Lobster” before?', 'Do you enjoy songs with strange or surreal lyrics?', 'Which novelty song do you still remember?', 'Does a funny song need a clear meaning?'])
            ],
            contexts: [
                C('The Absurd City Council','Serious meeting, impossible problem.','The city must respond to clouds that park illegally, pigeons that demand salaries, and a fountain that predicts embarrassing moments.','Which problem should receive the emergency budget?',[{title:'Transport',text:'All buses now move sideways.'},{title:'Housing',text:'Every apartment grows one extra room at midnight.'},{title:'Animals',text:'Squirrels have formed a local government.'},{title:'Weather',text:'It rains soup every Thursday.'}],'fa-building-columns'),
                C('One Tiny Change','Small rules can transform everything.','Imagine a world where names expire, chairs choose their owners, or every question must be answered with a drawing. Follow the consequences.','Which tiny change creates the biggest chaos?',[{title:'Language',text:'People can use only ten words per day.'},{title:'Food',text:'Dessert must legally come first.'},{title:'Time',text:'Everyone gets one personal Tuesday.'},{title:'Objects',text:'Lost socks return with souvenirs.'}],'fa-shuffle')
            ],
            speaking: {title:'The What-If Machine',icon:'fa-gears',prompts:['Do you enjoy discussing impossible “what if” questions?', 'If animals could speak, which one would be most interesting?', 'What everyday rule would become funny if everyone followed it literally?', 'Have you ever enjoyed a story even though it made no logical sense?'],support:['Hypothetically speaking…','The first consequence would be…','The strangest part is…','Against all logic, it might…']},
            homework: ['Write five connected consequences of one absurd change.','Create an advertisement for a product nobody should need.','Interview an imaginary creature about an ordinary job.'],
            closing: 'A ridiculous question can produce surprisingly clever language.'
        }),

        56: lesson({
            title: 'Books, Bookshops & Reading Personalities', icon: 'fa-book-open-reader', accent: 'amber',
            warmupTitle: 'Warm-up: Between the Covers', warmupIntro: 'Some readers finish a novel overnight. Others buy it, admire the cover, and give it a meaningful home on the unread shelf.',
            warmups: ['How often do you read books?', 'What kind of book can keep your attention?', 'Do you prefer print, ebooks, or audiobooks?', 'How do you usually choose your next book?'],
            expressions: [
                E('A bookworm','A person who loves reading.', 'Maya is a bookworm who always carries a novel.', 'The library café was designed for {gap}.'),
                E('A page-turner','A book that is extremely difficult to stop reading.', 'The mystery was a real page-turner.', 'Short chapters helped make the novel {gap}.'),
                E('To get lost in a book','To become deeply absorbed in reading.', 'He got lost in a book and missed his stop.', 'A quiet afternoon is perfect {gap}.'),
                E('To read between the lines','To understand a meaning that is not stated directly.', 'The letter sounds polite, but read between the lines.', 'The detective needed {gap} to notice the warning.'),
                E('To judge a book by its cover','To form an opinion from appearance before knowing the content.', 'The strange cover was excellent—never judge a book by its cover.', 'The display invites shoppers {gap}.'),
                E('To put a book down','To stop reading, often because attention is needed elsewhere.', 'The story was so good that I could not put the book down.', 'Even at midnight, she refused {gap}.')
            ],
            songs: [
                S('Paperback Writer','The Beatles',null,'Pop-rock turns the dream of publishing into a concise, energetic request for a reader’s attention.', 'How books find their readers',['publishing','energetic','readers'],['Which reading format do you use most often?', 'Where do you usually read?', 'Have you ever bought a book because of its cover?', 'Do recommendations influence what you read?']),
                S('Everyday I Write the Book','Elvis Costello & The Attractions',null,'New-wave rock uses familiar book language as a playful structure for changing relationships.', 'Reading habits and bookshop choices',['books','witty','habits'],['What reading habit fits your current routine?', 'Do you read a little every day or in longer sessions?', 'Have you ever abandoned a book and returned to it later?', 'Do you feel any obligation to finish every book?']),
                S('The Book of Love','Peter Gabriel',null,'Pop transforms an imaginary book into a warm collection of rules, details, and human contradictions.', 'Why every reader sees a different book',['reading','warm','perspective'],['Which topic could you read several books about?', 'Do you enjoy discussing books with other people?', 'Have you ever loved a book that someone else disliked?', 'Do you reread books for comfort or discovery?'])
            ],
            contexts: [
                C('The Bookshop Personality Test','Every reader enters through a different door.','Design sections for readers who want comfort, speed, surprise, facts, beautiful objects, or a book they can discuss with someone else.', 'Which section would you visit first?', [{title:'One More Chapter',text:'Fast stories, short chapters, impossible bedtime decisions.'},{title:'Slow Reading',text:'Books with language worth pausing over.'},{title:'Useful Curiosity',text:'Specific facts that make ordinary life more interesting.'},{title:'Beautiful Shelf',text:'Design so attractive that reading becomes the responsible next step.'}], 'fa-store'),
                C('The Reading Tasting Menu','Sample a book before choosing it.', 'Readers can inspect the cover, read the opening, jump to a random middle page, or hear one minute of the audiobook. Compare what each sample reveals—and what it hides.', 'Which sample predicts your interest best?', [{title:'Cover',text:'Visual mood, genre clues, and promises that may be misleading.'},{title:'Opening',text:'The first page reveals voice, pace, and the initial invitation.'},{title:'Middle',text:'A random page shows the everyday texture without setup.'},{title:'Voice',text:'One audio minute tests whether the narrator makes you want more.'}], 'fa-book-open')
            ],
            speaking: {title:'The Bookshop Curator',icon:'fa-book-bookmark',prompts:['Which book would you recommend to a friend?', 'What makes a bookshop comfortable for you?', 'When is an audiobook more convenient than a printed book?', 'Do you usually finish every book you start?'],support:['It is a real page-turner because…', 'This format works well when…', 'Reading between the lines…', 'I could/could not put it down because…']},
            homework: ['Write a concise, spoiler-free book recommendation.', 'Create a seven-day reading challenge with flexible goals.', 'Describe a bookshop section that does not exist but should.'],
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
                S('We Can Work It Out','The Beatles',null,'Pop-rock turns disagreement into an invitation to slow down, listen, and search for a solution.', 'From argument to common ground',['disagreement','hopeful','compromise'],['What helps you stay calm during a disagreement?', 'Have you ever solved a disagreement through conversation?', 'Do you compromise easily?', 'Are some disagreements better left unresolved?']),
                S('My Life','Billy Joel',null,'An assertive pop-rock narrator listens to outside opinions but keeps control of his own decisions.', 'Advice, independence, and personal choices',['independence','assertive','advice'],['Which personal choice do people often comment on unnecessarily?', 'Do people sometimes give you advice without asking?', 'Have you ever ignored advice and been happy with the result?', 'Whose advice do you trust most?'])
            ],
            contexts: [
                C('The Friendly-Debate Café','The opinions are strong; the stakes are deliciously low.','Choose a table and defend one side. Your goal is not to win immediately—it is to ask a good question, give an example, and understand the opposite view.', 'Which debate would create the best conversation?', [{title:'Food',text:'Sweet breakfast versus savory breakfast.'},{title:'Time',text:'Early birds versus night owls.'},{title:'Stories',text:'Books versus screen adaptations.'},{title:'Travel',text:'Detailed itinerary versus spontaneous exploration.'}], 'fa-mug-hot'),
                C('The Disagreement Toolkit','Good conversation needs more than “yes” or “no.”','Useful disagreement separates the person from the idea, checks understanding, gives reasons, and leaves room for humor or uncertainty.', 'Which move changes the tone most quickly?', [{title:'Clarify',text:'“Do you mean that in every situation?”'},{title:'Acknowledge',text:'“I can see why that matters to you.”'},{title:'Example',text:'“Here is the situation that changed my mind.”'},{title:'Common Ground',text:'“At least we both want the same result.”'}], 'fa-toolbox')
            ],
            speaking: {title:'The Friendly Debate Club',icon:'fa-scale-balanced',prompts:['Which harmless opinion of yours do people disagree with?', 'How do you react when a friend strongly disagrees with you?', 'Do you find it easy to see another person’s point?', 'When is it better to agree to disagree?'],support:['Hear me out…', 'I see your point, but…', 'To play devil’s advocate…', 'We can find common ground on…']},
            homework: ['Write both sides of a low-stakes debate.', 'Turn three blunt disagreements into curious responses.', 'Create a dialogue in which two people agree to disagree pleasantly.'],
            closing: 'A good disagreement leaves both people with more ideas than they brought.'
        }),

        58: lesson({
            title: 'Useless Talents & Hidden Skills', icon: 'fa-medal', accent: 'lime',
            warmupTitle: 'Warm-up: Surprisingly Impressive', warmupIntro: 'Not every talent belongs on a résumé. Some belong at a party at exactly 9:17 p.m.',
            warmups: ['What tiny task are you unusually good at?', 'Do you have a hidden talent?', 'What skill looks easy until you try it?', 'How do you usually learn a new skill?'],
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
                S('One Week','Barenaked Ladies',null,'Rapid pop-rock delivery and dense references turn verbal agility into part of the fun.','Skills that look effortless',['speed','playful','wordplay'],['Which fast song or tongue twister is difficult for you?', 'Have you ever practiced something until it looked easy?', 'Do you usually pick up new skills quickly?', 'Is regular practice more important than natural talent?']),
                S('Tribute','Tenacious D',null,'Comedy rock turns an impossible performance into a proudly exaggerated legend.', 'The funniest way to describe greatness',['performance','dramatic','legend'],['Which ordinary achievement are you secretly proud of?', 'Has someone ever complimented an unexpected skill of yours?', 'Do you exaggerate stories to make them funnier?', 'Does a talent need to be useful to be valuable?'])
            ],
            contexts: [
                C('The Talent Auction','Spend imaginary points wisely.','Bid on perfect whistling, speed-reading menus, identifying fonts, folding maps, guessing microwave time, or always choosing the fastest supermarket line.','Which talent is secretly the most useful?',[{title:'Social',text:'Remember every name after hearing it once.'},{title:'Home',text:'Fold any fitted sheet perfectly.'},{title:'Travel',text:'Pack a suitcase in three minutes.'},{title:'Chaos',text:'Catch any falling object except your phone.'}],'fa-gavel'),
                C('Skill Origin Stories','Talent often starts accidentally.','People learn strange abilities through boredom, unusual jobs, siblings, games, repeated mistakes, or one overly competitive family holiday.','What is the funniest believable origin for a skill?',[{title:'Boredom',text:'A long commute creates a memory champion.'},{title:'Work',text:'A café job creates a foam-art expert.'},{title:'Family',text:'Competitive gift wrapping becomes serious.'},{title:'Accident',text:'A broken remote leads to expert button pressing.'}],'fa-star')
            ],
            speaking: {title:'The Low-Stakes Talent Show',icon:'fa-trophy',prompts:['What small skill comes naturally to you?', 'Which useful skill would you like to learn next?', 'Have you ever learned something unexpectedly quickly?', 'Which skill of a friend or relative impresses you?'],support:['I have a knack for…','It first came in handy when…','The trickiest part is…','It looks useless, but actually…']},
            homework: ['Practice and explain one small skill.','Write a funny advertisement for your hidden talent.','List three abilities you learned outside a classroom and how you learned them.'],
            closing: 'A skill does not need to change the world to make a good story.'
        }),

        59: lesson({
            title: 'Sleep, Dreams & Nighttime Mysteries', icon: 'fa-moon', accent: 'emerald',
            warmupTitle: 'Warm-up: Lights Out', warmupIntro: 'Sleep is a daily activity nobody fully controls, featuring strange plots, missing hours, and an alarm that always enters as the villain.',
            warmups: ['What helps your mind understand that the day is over?', 'Do you usually remember your dreams?', 'How many hours of sleep do you normally need?', 'Do you have a regular bedtime routine?'],
            expressions: [
                E('To drift off','To gradually fall asleep.', 'The sound of rain helped me drift off.', 'After reading two pages, she began {gap}.'),
                E('To sleep like a log','To sleep very deeply.', 'After the long day, he slept like a log.', 'A quiet room helps Maya {gap}.'),
                E('To toss and turn','To move repeatedly because you cannot sleep comfortably.', 'I tossed and turned before the early flight.', 'When the room is too warm, I tend {gap}.'),
                E('To lose sleep over something','To worry about something, especially at night.', 'Do not lose sleep over one awkward email.', 'The tiny mistake is not serious enough {gap}.'),
                E('A power nap','A short sleep intended to restore energy.', 'A twenty-minute power nap helped me focus.', 'The long afternoon meeting made {gap} sound excellent.'),
                E('A vivid dream','A dream that feels especially clear and detailed.', 'She woke up remembering a vivid dream.', 'The talking elevator appeared in {gap}.')
            ],
            songs: [
                S('Mr. Sandman','The Chordettes',null,'Classic pop turns sleep into a playful request for a dream delivered by a mysterious nighttime visitor.', 'Ordering the perfect dream',['dream','playful','request'],['What kind of dreams do you remember most often?', 'Have you ever had a funny or confusing dream?', 'Do familiar people often appear in your dreams?', 'Would you prefer to control your dreams or keep them unpredictable?']),
                S("I'm Only Sleeping",'The Beatles',null,'Psychedelic rock celebrates staying in bed and watching the world move without joining its urgency.', 'The appeal of doing absolutely nothing',['sleep','dreamy','slowness'],['When does extra sleep feel genuinely restorative?', 'Do you usually press the snooze button?', 'Can you take a short nap without feeling worse afterward?', 'Does your schedule match your natural sleeping habits?']),
                S('Daydream Believer','The Monkees',null,'Pop-rock moves between sleep, waking, imagination, and the cheerful identity of a daydreamer.', 'Dreaming while awake',['daydream','bright','imagination'],['What situation makes your mind begin to wander?', 'Do you daydream during boring tasks?', 'Has a daydream ever helped you solve a problem?', 'When does daydreaming become distracting for you?'])
            ],
            contexts: [
                C('The Dream Director','The plot needs dream logic, not normal logic.', 'Choose a setting, familiar person, impossible change, repeating object, and abrupt ending. Explain why everything feels normal to the dreamer.', 'Which element makes the dream most memorable?', [{title:'Setting',text:'A school built inside a train station.'},{title:'Change',text:'Every door opens into the same kitchen.'},{title:'Object',text:'A red umbrella that answers questions.'},{title:'Ending',text:'The alarm appears as a character and apologizes.'}], 'fa-clapperboard'),
                C('The Sleep-Friendly Room','Give advice to a very difficult sleeper.', 'Invent a difficult sleeper. Take turns suggesting one change to the room and explaining why it might help. Include one ridiculous idea before choosing the best realistic solution.', 'Which suggestion would help most?', [{title:'Light',text:'Warm and low before bed; dark during sleep.'},{title:'Sound',text:'Quiet, steady background sound, or ear protection.'},{title:'Routine',text:'A place for tomorrow’s tasks outside the bed.'},{title:'Wildcard',text:'A gentle alarm that refuses to negotiate after minute ten.'}], 'fa-bed')
            ],
            speaking: {title:'The Dream & Sleep Lab',icon:'fa-cloud-moon',prompts:['What usually helps you drift off?', 'Have you ever slept badly before an important day?', 'Which part of your bedroom helps you relax?', 'Do you think dreams need to have a meaning?'],support:['I began to drift off when…', 'The vivid detail was…', 'The strangest transition happened when…', 'A better nighttime routine would…']},
            homework: ['Write a short dream with one repeating object and an unexpected ending.', 'Describe a sleep-friendly room using five sensory details.', 'Create a polite guide for responding when someone tells you a very long dream.'],
            closing: 'Sleep closes the day, but imagination often keeps the lights on.'
        }),

        60: lesson({
            title: 'Lists, Rankings & Top-Five Debates', icon: 'fa-ranking-star', accent: 'orange',
            warmupTitle: 'Warm-up: Make the List', warmupIntro: 'People rank restaurants, songs, cities, snacks, and sometimes pens with the seriousness of an international committee.',
            warmups: ['What is one category you could rank confidently?', 'Do you enjoy reading top-ten lists?', 'Do you prefer choosing one favorite or creating a top five?', 'Have you ever disagreed strongly with a popular ranking?'],
            expressions: [
                E('A top pick','One of the most preferred choices.', 'The quiet café is my top pick for conversation.', 'After testing every chair, the blue one became {gap}.'),
                E('To rank something from best to worst','To place options in order of preference or quality.', 'We ranked the desserts from best to worst.', 'The judges need {gap} using the same criteria.'),
                E('To make the shortlist','To enter a smaller group of the strongest options.', 'Three designs made the shortlist.', 'A clear requirement helped the unusual idea {gap}.'),
                E('To tie for first place','To receive the same highest position as another option.', 'The two songs tied for first place.', 'With equal points, both cafés managed {gap}.'),
                E('At the bottom of the list','In the least preferred or lowest position.', 'Long queues are at the bottom of my list.', 'For the night owl, a 6 a.m. meeting belongs {gap}.'),
                E('To compare apples and oranges','To compare things that are too different for a fair judgment.', 'Ranking a bicycle against a sofa means comparing apples and oranges.', 'Without shared criteria, we begin {gap}.')
            ],
            songs: [
                S('One','U2',null,'Rock uses the idea of “one” to explore unity without pretending that people or perspectives are identical.','What deserves the number-one position',['one','reflective','unity'],['Which category has an unquestionable number one for you?', 'Is it difficult for you to choose one favorite song or film?', 'Do ratings influence what you watch or buy?', 'Have you ever changed your number-one choice?']),
                S('Two Princes','Spin Doctors',null,'Alternative rock presents two competing options and invites a choice based on more than status.','Choosing between two strong options',['choice','playful','criteria'],['Which two everyday options are difficult for you to choose between?', 'Do you usually compare price, quality, or convenience first?', 'Are you comfortable saying that two options are equally good?', 'Do you sometimes avoid ranking things you enjoy?']),
                S('50 Ways to Leave Your Lover','Paul Simon',null,'Pop-rock uses the language of a long list to make one complicated situation sound almost systematic.','Why lists make ideas memorable',['list','witty','options'],['Do you make lists to organize your ideas?', 'Do you use a daily to-do list?', 'Can too many options make a decision harder for you?', 'Do you trust articles with titles like “ten best ways”?'])
            ],
            contexts: [
                C('The Top-Five Challenge','Five places, no ties, clear reasons.', 'Rank options using one criterion at a time. A café may win for atmosphere and lose for speed; a film may win for dialogue and lose for rewatch value.', 'Which criterion changes a ranking most?', [{title:'Quality',text:'How well does the option do its main job?'},{title:'Value',text:'What does it offer for the time, effort, or price?'},{title:'Originality',text:'Does it provide something difficult to replace?'},{title:'Personal Fit',text:'Would this be right for you, not only impressive generally?'}], 'fa-list-ol'),
                C('The Impossible Ranking Committee','Some comparisons need creative criteria.', 'Rank a spoon, a cloud, a bicycle, and a song. First invent a fair category: usefulness in a mystery, ability to improve a Monday, or likelihood of appearing in a dream.', 'Which strange criterion creates the best debate?', [{title:'Survival',text:'How could the object help on a deserted office floor?'},{title:'Comedy',text:'Which option creates the funniest misunderstanding?'},{title:'Comfort',text:'Which can improve a difficult waiting room?'},{title:'Story',text:'Which produces the strongest opening scene?'}], 'fa-scale-unbalanced-flip')
            ],
            speaking: {title:'The Ranking Committee',icon:'fa-clipboard-list',prompts:['What would be at the top of your weekend activity list?', 'Which product ratings do you check before buying?', 'Have you ever loved something that received poor reviews?', 'Do ratings help you choose or make every choice feel the same?'],support:['My top pick is…', 'It makes the shortlist because…', 'These two tie for…', 'That comparison is apples and oranges because…']},
            homework: ['Create a top-five list with one sentence of evidence for each position.', 'Compare two published-style rankings that use different criteria.', 'Invent an impossible ranking and explain the category that makes it fair.'],
            closing: 'A ranking becomes a conversation when the reasons matter more than the numbers.'
        }),

        61: lesson({
            title: 'Gardens, Houseplants & Green Thumbs', icon: 'fa-seedling', accent: 'teal',
            warmupTitle: 'Warm-up: How Does Your Garden Grow?', warmupIntro: 'Plants ask for light, water, patience, and somehow still develop strong opinions about exactly one window.',
            warmups: ['Do you have any plants at home?', 'Are you good at keeping plants alive?', 'Which plant or flower do you like most?', 'Do you prefer gardens that are decorative or useful?'],
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
                S('Flowers','Miley Cyrus',null,'Pop uses flowers as a simple symbol of care, independence, and giving something pleasant to yourself.', 'Why flowers carry messages',['flowers','confident','care'],['Do you ever buy flowers for yourself or other people?', 'Which flower or plant is especially memorable to you?', 'Have you ever received a plant as a gift?', 'Would you prefer a living plant or cut flowers?']),
                S('Where the Green Grass Grows','Tim McGraw',null,'Country music imagines a greener, slower setting as the ideal place to build a satisfying daily life.', 'The appeal of green space',['grass','warm','space'],['Which green space do you use most often?', 'Do you spend enough time outdoors?', 'Has a small garden or park improved your neighborhood?', 'Should cities protect more space for gardens and parks?'])
            ],
            contexts: [
                C('The Houseplant Hospital','The leaves are communicating—badly.', 'Diagnose four fictional patients using clues about water, light, roots, temperature, and one pet that looks suspiciously innocent.', 'Which clue should the plant doctor check first?', [{title:'Droopy',text:'The soil is wet, but the window is dark.'},{title:'Crispy',text:'The plant sits beside a heater all day.'},{title:'Leaning',text:'Every leaf points toward one distant window.'},{title:'Mysterious',text:'The soil is on the floor and the cat knows nothing.'}], 'fa-stethoscope'),
                C('The Pocket Garden','A tiny space forces an interesting conversation.', 'Choose a tiny space and three priorities. Take turns adding one feature. Your partner can accept it or suggest a trade-off before the next feature is added.', 'Which goal deserves the most space?', [{title:'Food',text:'Herbs and vegetables that people will actually use.'},{title:'Color',text:'Plants that bloom at different times.'},{title:'Rest',text:'Shade, scent, and somewhere comfortable to sit.'},{title:'Wildlife',text:'Water and flowers that support birds and insects.'}], 'fa-leaf')
            ],
            speaking: {title:'Your Life with Plants',icon:'fa-trowel',prompts:['How do you usually care for a houseplant?', 'Which low-maintenance plant would you recommend?', 'Would you like to grow herbs or vegetables at home?', 'What makes a public garden pleasant for you?'],support:['The plant may need…', 'It is low-maintenance because…', 'The garden would be in full bloom…', 'We should weed out…']},
            homework: ['Create a care card for a real or imaginary plant.', 'Design a pocket garden with four purposes.', 'Write a dialogue between two houseplants with opposite personalities.'],
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
                S("You're So Vain",'Carly Simon',null,'Witty pop-rock turns one memorable personality into a portrait of extreme self-importance.','When confidence becomes self-centeredness',['vanity','witty','behavior'],['Which conversation habit makes someone seem self-centered?', 'Do you know someone who talks much more than they listen?', 'Have you ever realized you were talking too much?', 'How do you change the subject politely?']),
                S('Yakety Yak','The Coasters',null,'Rock-and-roll turns household commands and teenage resistance into playful conflict.','Why rules sound different depending on who says them',['rules','comic','chores'],['Which household rule causes the most arguments?', 'Which chore do you dislike most?', 'Do people in your home divide chores fairly?', 'Is it easy for you to ask someone to do something politely?'])
            ],
            contexts: [
                C('The Annoyance Court','Is it rude, unfortunate, or just your preference?','A pet peeve may involve real inconvenience, cultural difference, or a personal sensitivity. Before delivering a dramatic verdict, classify the offense.','Which case deserves the strongest response?',[{title:'Public Audio',text:'A phone plays videos on a quiet train.'},{title:'Late Arrival',text:'A friend arrives twelve minutes late.'},{title:'Slow Walking',text:'A group fills the entire sidewalk.'},{title:'Long Voice Note',text:'Someone sends eight minutes instead of two lines.'}],'fa-scale-balanced'),
                C('Manners Across Maps','Polite behavior needs context.','Eye contact, punctuality, tipping, personal space, greetings, shoes, and directness can carry different meanings. Curiosity is safer than assuming your rule is universal.','Which custom should travelers research first?',[{title:'Observe',text:'Notice what local people consistently do.'},{title:'Ask',text:'A respectful question prevents confident mistakes.'},{title:'Adapt',text:'Follow local norms when the cost is small.'},{title:'Explain',text:'Clarify your own needs without declaring them superior.'}],'fa-earth-americas')
            ],
            speaking: {title:'Your Social Habits',icon:'fa-phone',prompts:['Which social situation makes you feel awkward?', 'What is your biggest harmless pet peeve?', 'Do you politely call someone out when they skip a line?', 'Which unwritten rule should everyone know?'],support:['Would you mind…?','I may be overreacting, but…','The unwritten rule here is…','I would let it slide unless…']},
            homework: ['Collect three unwritten rules from different places.','Describe a cultural manners surprise without judging it.','Turn one complaint into a polite, specific request.'],
            closing: 'Good manners are mostly the art of noticing other people.'
        }),

        63: lesson({
            title: 'Lost, Found & Unexpected Objects', icon: 'fa-magnifying-glass', accent: 'rose',
            warmupTitle: 'Warm-up: Where Did I Put It?', warmupIntro: 'Lost objects travel through pockets, sofas, taxis, and mysterious dimensions before reappearing exactly where someone already checked twice.',
            warmups: ['What object do you misplace most often?', 'Where do your lost things usually turn up?', 'Have you ever found something valuable?', 'Do you normally return objects that you find?'],
            expressions: [
                E('To misplace something','To put an object somewhere and temporarily forget where.', 'I misplaced my glasses again.', 'It is surprisingly easy {gap} during a busy morning.'),
                E('To turn up','To be found or appear unexpectedly.', 'The missing receipt turned up inside a cookbook.', 'Lost keys are likely {gap} in the last place anyone expects.'),
                E('The lost and found','A place where lost items are stored for their owners.', 'Someone took the umbrella to the lost and found.', 'The unusual hat waited in {gap} for three weeks.'),
                E('To retrace your steps','To return along the route you followed earlier.', 'I retraced my steps from the station to the café.', 'When a wallet disappears, it helps {gap}.'),
                E('To return something to its rightful owner','To give a found object back to the person who owns it.', 'The hotel returned the ring to its rightful owner.', 'The message helped the team {gap}.'),
                E('Hidden in plain sight','Easy to see but unnoticed.', 'The remote was hidden in plain sight on the black table.', 'The final clue remained {gap}.')
            ],
            songs: [
                S('Lost in the Supermarket','The Clash',null,'Rock places disorientation inside an extremely ordinary public place full of signs, products, and choices.', 'Feeling lost in a familiar place',['lost','restless','surroundings'],['Where is it easy for you to lose your sense of direction?', 'Have you ever become lost in a familiar place?', 'Do you use signs, maps, or your phone to find your way?', 'Are large supermarkets easy or confusing for you?']),
                S('Return to Sender','Elvis Presley',null,'Rock-and-roll turns a returned letter into a repeated physical clue that something has gone wrong.', 'When an object cannot reach its destination',['return','playful','message'],['What item have you had to return or send back?', 'Have you ever received a package meant for someone else?', 'Do you double-check an address before sending something?', 'What do you usually do when you find someone’s lost item?']),
                S("I Still Haven't Found What I'm Looking For",'U2',null,'Rock uses an unfinished search as a powerful image of continuing to look beyond the obvious.', 'Why searching can become a story',['search','expansive','persistence'],['What object took you too long to find?', 'Do you retrace your steps when something disappears?', 'Have you ever found something after you stopped searching?', 'Which lost object would be most difficult for you to replace?'])
            ],
            contexts: [
                C('The Lost-and-Found Desk','Every object arrives without its story.', 'Match a single glove, a tiny notebook, a formal shoe, a toy dinosaur, and a key marked “Thursday” to possible owners. Ask questions before deciding.', 'Which object produces the best story?', [{title:'Visible Clue',text:'Material, size, wear, color, and location found.'},{title:'Possible Use',text:'What situation would require this object?'},{title:'Owner Question',text:'What detail can the real owner describe?'},{title:'Wrong Story',text:'Create one convincing explanation that is completely false.'}], 'fa-box-open'),
                C('The Suitcase Mystery','The label is gone, but the contents speak.', 'A suitcase contains a cookbook, binoculars, one red glove, a toy crown, three identical postcards, and an unopened invitation.', 'What can you infer—and what are you only inventing?', [{title:'Certain',text:'The suitcase contains six listed items.'},{title:'Likely',text:'Some objects may relate to one event.'},{title:'Possible',text:'The owner could be travelling for work or celebration.'},{title:'Wild Theory',text:'The crown belongs to a very small secret kingdom.'}], 'fa-suitcase')
            ],
            speaking: {title:'Your Lost-and-Found Stories',icon:'fa-user-secret',prompts:['What is the most important thing you have lost?', 'How do you usually retrace your steps?', 'Have you ever used a lost-and-found service?', 'What should happen to objects nobody claims?'],support:['It last turned up…', 'I would retrace my steps from…', 'The detail only the owner knows is…', 'It may be hidden in plain sight…']},
            homework: ['Write a short mystery beginning with an object in a lost-and-found box.', 'Create a clear lost-item description without naming the object.', 'Describe the step-by-step search for something hidden in plain sight.'],
            closing: 'A lost object is an ordinary mystery waiting for the right question.'
        }),

        64: lesson({
            title: 'Customer Service, Complaints & Five-Star Reviews', icon: 'fa-headset', accent: 'green',
            warmupTitle: 'Warm-up: How Can I Help?', warmupIntro: 'Customer service is where patience, clear details, and a seventeen-digit reference number meet music that promises your call is important.',
            warmups: ['Do you usually complain when an order is wrong?', 'Have you ever received excellent customer service?', 'Do you write online reviews of products or services?', 'Do you read reviews before buying something?'],
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
                S('I Want It That Way','Backstreet Boys',null,'Pop repeats a direct statement of preference—exactly the language behind many requests, expectations, and complaints.', 'Stating what you want clearly',['preference','polished','clarity'],['Is it easy for you to explain exactly what you want?', 'Do you usually complain when a restaurant order is wrong?', 'Have you ever asked for a refund or replacement?', 'Do you stay polite when a problem takes a long time to solve?'])
            ],
            contexts: [
                C('The Service Counter','Real problems, clear questions, practical solutions.', 'Choose a familiar situation and role-play it twice: first as the customer, then as the employee. Say what happened, ask for a solution, and agree on the next step.', 'Which situation would you complain about immediately?', [{title:'Wrong Order',text:'The restaurant delivered a meal you did not order.'},{title:'Late Delivery',text:'A birthday gift arrived after the party.'},{title:'Damaged Product',text:'An online order arrived with a visible defect.'},{title:'Incorrect Charge',text:'A service charged you twice for the same purchase.'}], 'fa-comments'),
                C('Your Review Habits','Talk about the reviews you read and write.', 'Choose a familiar product or service. Say whether you would leave a review, what rating you would give, and which detail you would mention. Your partner asks one follow-up question.', 'Which experience would make you write a review?', [{title:'Restaurant',text:'The food was good, but the service was very slow.'},{title:'Online Order',text:'The product looked different from the photos.'},{title:'Hotel',text:'The room was clean, but the street was noisy.'},{title:'App or Service',text:'It was useful, but cancelling the subscription was difficult.'}], 'fa-star')
            ],
            speaking: {title:'Your Customer-Service Experiences',icon:'fa-headset',prompts:['What was your most recent customer-service experience?', 'Do you usually leave online reviews?', 'Which type of service problem annoys you most?', 'Do you prefer speaking to a person or using a chatbot?'],support:['I’m calling about…', 'What I expected was…', 'Could you help me sort out…?', 'A reasonable solution would be…']},
            homework: ['Write one poor complaint and then improve it.', 'Create three online reviews with different levels of reliability.', 'Design a customer-service policy for an imaginary product.'],
            closing: 'A clear request turns frustration into a conversation that can go somewhere.'
        })
    };
}());
