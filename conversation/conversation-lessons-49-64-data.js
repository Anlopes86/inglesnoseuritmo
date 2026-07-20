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
            title: 'Family, Expectations & Independence', icon: 'fa-people-roof', accent: 'rose',
            warmupTitle: 'Warm-up: The Family Group Chat',
            warmupIntro: 'Families can be supportive, funny, intense—and sometimes all three before breakfast.',
            warmups: [
                'What family habit would look strange to an outsider?',
                'Which decision should young adults make without family approval?',
                'What is a harmless expectation your family has about you?',
                'If your family had a slogan, what would it be?'
            ],
            expressions: [
                E('To follow in someone’s footsteps', 'To choose a similar path to another person.', 'Everyone expected Maya to follow in her mother’s footsteps.', 'His father is a chef, but Leo does not want {gap}. He wants to design games.'),
                E('To stand on your own two feet', 'To become independent and responsible for yourself.', 'Moving out helped me stand on my own two feet.', 'After getting her first job, Nina was ready {gap}.'),
                E('To live up to expectations', 'To perform as well as people hope.', 'The pressure to live up to expectations was exhausting.', 'The new family business owner worried she would not {gap}.'),
                E('To set boundaries', 'To clearly state what behavior you will accept.', 'He set boundaries about surprise visits.', 'Saying “please call before coming over” is one way {gap}.'),
                E('To have someone’s best interests at heart', 'To genuinely want what is best for someone.', 'My aunt is strict, but she has my best interests at heart.', 'Even when they disagree with me, I know my parents {gap}.'),
                E('The black sheep of the family', 'A relative who feels or behaves differently from the group.', 'The adventurous cousin became the black sheep of the family.', 'Everyone loves routine except Carla, so she jokes that she is {gap}.')
            ],
            songs: [
                S('Family Portrait', 'P!nk', '5atvzr0zbAghxvFMzQ4CSB', 'A child’s view of family conflict and the wish to make home feel safe again.', 'What makes a family feel stable?', ['security', 'vulnerable', 'appearances'], [
                    'Which small routine can make a home feel calmer during a stressful week?',
                    'What do films and advertisements usually get wrong about the “perfect family”?',
                    'When relatives disagree, what helps a conversation stay respectful?',
                    'Which family problem is easier to joke about than to solve?'
                ]),
                S('Father and Son', 'Yusuf / Cat Stevens', '62IEgHYfHy0969CK16IcbK', 'Two generations speak past each other: one values caution, while the other wants freedom.', 'Advice versus autonomy', ['independence', 'reflective', 'experience'], [
                    'What advice from an older relative became useful only years later?',
                    'Which life choice creates the biggest generation gap today?',
                    'How can parents offer guidance without controlling the final decision?',
                    'Imagine switching roles with a parent for one day. What would surprise both of you?'
                ]),
                S('Independent Women, Pt. 1', 'Destiny’s Child', '0SARtM2035y7DaoQg2HFl1', 'A confident celebration of financial independence and personal agency.', 'What independence looks like in real life', ['self-reliance', 'confident', 'dependence'], [
                    'What was your first small taste of independence?',
                    'Besides money, which everyday skill makes someone more independent?',
                    'What purchase feels more satisfying when you pay for it yourself?',
                    'Can accepting help be a sign of independence rather than weakness? How?'
                ])
            ],
            contexts: [
                C('The Expectation Menu', 'Some expectations protect; others prescribe.', 'Family expectations often arrive as advice, jokes, comparisons, or traditions. The useful question is not “expectations: good or bad?” but “who gets the final say?”', 'Which expectation deserves a polite “no, thank you”?', [
                    { title: 'Support', text: 'Encouragement, practical help, and honest feedback can create confidence.' },
                    { title: 'Pressure', text: 'Comparison and guilt can make love feel conditional.' },
                    { title: 'Culture', text: 'Ideas about work, marriage, and home vary across generations.' },
                    { title: 'Negotiation', text: 'Boundaries work best when they are clear, calm, and consistent.' }
                ], 'fa-clipboard-list'),
                C('Independence Is Not Isolation', 'Standing alone is different from doing everything alone.', 'Adult independence includes choosing when to ask for help, sharing responsibilities, and making decisions you can explain—not proving that you need nobody.', 'What can you do independently but still prefer doing with family?', [
                    { title: 'Practical', text: 'Money, cooking, transport, appointments, and household tasks.' },
                    { title: 'Emotional', text: 'Handling disagreement without disappearing or exploding.' },
                    { title: 'Shared', text: 'Helping relatives without giving up your entire routine.' },
                    { title: 'Flexible', text: 'Different stages of life require different kinds of support.' }
                ], 'fa-person-walking-arrow-right')
            ],
            speaking: { title: 'The Family Negotiation', icon: 'fa-comments-dollar', prompts: [
                'A relative wants you to choose a “safer” career. Respond respectfully but firmly.',
                'You want more privacy at home. Propose two specific boundaries.',
                'Your family expects everyone at every Sunday lunch. Suggest a realistic compromise.',
                'Describe one family expectation you would keep for the next generation.'
            ], support: ['I understand why you feel that way…', 'What I need is…', 'Could we agree to…?', 'The final decision should…'] },
            homework: ['Write a respectful message setting one imaginary family boundary.', 'Compare independence at age 18 in two different generations.', 'Describe a family tradition you would adapt rather than abandon.'],
            closing: 'Growing up is learning how to belong without disappearing.'
        }),

        50: lesson({
            title: 'Trust, Betrayal & Second Chances', icon: 'fa-handshake-angle', accent: 'indigo',
            warmupTitle: 'Warm-up: Trust Test', warmupIntro: 'Trust is built slowly, lost quickly, and discussed endlessly in group chats.',
            warmups: ['What tiny action makes someone seem trustworthy?', 'Which harmless secret are you terrible at keeping?', 'What is easier to forgive: lateness, dishonesty, or broken promises?', 'How would you rate a friend who returns borrowed items without reminders?'],
            expressions: [
                E('To earn someone’s trust', 'To prove through actions that you are reliable.', 'It took months to earn the team’s trust.', 'Keeping small promises is a good way {gap}.'),
                E('To stab someone in the back', 'To betray someone who trusted you.', 'Sharing her private message felt like stabbing her in the back.', 'He pretended to support the plan, then criticized it privately; he seemed {gap}.'),
                E('To give someone the benefit of the doubt', 'To choose a generous explanation when facts are unclear.', 'I gave him the benefit of the doubt about the late reply.', 'There may be a reasonable explanation, so let’s {gap}.'),
                E('To make amends', 'To repair harm through sincere action.', 'An apology was the first step to making amends.', 'Replacing what she damaged helped her {gap}.'),
                E('Once bitten, twice shy', 'After a bad experience, people become more cautious.', 'I was scammed online, so now I am once bitten, twice shy.', 'After one terrible roommate, Paulo became {gap}.'),
                E('A clean slate', 'A fresh start without old mistakes controlling everything.', 'The new semester gave both friends a clean slate.', 'They agreed to stop bringing up the old argument and start with {gap}.')
            ],
            songs: [
                S('Back Stabbers', 'The O’Jays', '50H9JNoKqPMDQazo1BEv0J', 'A lively warning about charming people whose private intentions are less friendly.', 'Spotting unreliable behavior', ['betrayal', 'suspicious', 'friendliness'], [
                    'Which warning sign matters more: gossip, inconsistency, or competitive behavior?',
                    'How can you check a rumor without creating more drama?',
                    'What is the funniest “betrayal” that can happen in a shared kitchen?',
                    'When does protecting yourself become unfair suspicion?'
                ]),
                S('Apologize', 'Timbaland feat. OneRepublic', '6q3zC9dDD4lUNk8nfUztXy', 'An apology arrives after the relationship has already reached its limit.', 'When sorry is not enough', ['limits', 'dramatic', 'forgiveness'], [
                    'What makes an apology sound sincere instead of automatic?',
                    'Which is worse after a mistake: excuses, silence, or repeating it?',
                    'What should a good apology contain besides the word “sorry”?',
                    'Name a minor situation where it is genuinely “too late to apologize.”'
                ]),
                S('Second Chance', 'Shinedown', '28y5IIBbLVk0wxFr4JBQn5', 'Leaving, changing, and asking others to see a difficult decision as a new beginning.', 'Who deserves another opportunity?', ['renewal', 'hopeful', 'the past'], [
                    'What kind of mistake deserves a second chance at work or school?',
                    'How can someone demonstrate change without making a big speech?',
                    'Which famous fictional villain would be funniest in a redemption story?',
                    'Should second chances come with conditions? Give a practical example.'
                ])
            ],
            contexts: [
                C('The Trust Bank', 'Every action is a deposit or withdrawal.', 'Reliability is rarely one grand gesture. It is a pattern: arriving, telling the truth, respecting privacy, and admitting mistakes before being caught.', 'Which everyday behavior is the biggest trust deposit?', [
                    { title: 'Words', text: 'Clear promises matter, but vague promises create loopholes.' },
                    { title: 'Actions', text: 'Consistency makes people feel safe enough to depend on us.' },
                    { title: 'Privacy', text: 'Keeping confidence is different from hiding harmful behavior.' },
                    { title: 'Repair', text: 'Trust returns through evidence, not pressure to “move on.”' }
                ], 'fa-building-columns'),
                C('The Second-Chance Checklist', 'Forgiveness and access are not identical.', 'You can forgive someone emotionally and still change the rules of the relationship. A second chance may include time, boundaries, proof, and a smaller responsibility first.', 'What is one reasonable condition for rebuilding trust?', [
                    { title: 'Ownership', text: 'The person names what they did without minimizing it.' },
                    { title: 'Repair', text: 'They replace, correct, or compensate when possible.' },
                    { title: 'Pattern', text: 'New behavior continues after attention disappears.' },
                    { title: 'Choice', text: 'The hurt person is not required to restore the old closeness.' }
                ], 'fa-list-check')
            ],
            speaking: { title: 'The Repair Conversation', icon: 'fa-screwdriver-wrench', prompts: ['A friend shared your news before you were ready. Explain the impact.', 'A colleague missed an important deadline twice. Set conditions for another chance.', 'Defend a fictional character who deserves a clean slate.', 'Create a three-step plan for rebuilding trust after a small lie.'], support: ['What bothered me was…', 'I need to see…', 'I’m willing to…', 'A fair next step would be…'] },
            homework: ['Write a realistic apology that includes responsibility and repair.', 'Explain the difference between forgiveness and restored trust.', 'Create a “trust guide” for new roommates or coworkers.'],
            closing: 'A second chance becomes meaningful when the second behavior is different.'
        }),

        51: lesson({
            title: 'Fear, Risk & Courage', icon: 'fa-shield-heart', accent: 'orange',
            warmupTitle: 'Warm-up: Tiny Fears, Big Reactions', warmupIntro: 'Courage can mean skydiving—or finally making a phone call you have avoided all week.',
            warmups: ['Which everyday situation makes you irrationally nervous?', 'What risky activity looks exciting from a safe distance?', 'When have you felt brave five minutes after feeling terrified?', 'Invent a ridiculous warning label for something completely safe.'],
            expressions: [
                E('To face your fears', 'To confront something that frightens you.', 'She faced her fear of public speaking.', 'Taking one swimming lesson helped Bruno {gap}.'),
                E('To take a leap of faith', 'To act despite uncertainty because you believe it may work.', 'Changing careers was a leap of faith.', 'They had little information, but decided {gap}.'),
                E('To play it safe', 'To avoid unnecessary risk.', 'We played it safe and took the earlier train.', 'With a storm coming, the hikers chose {gap}.'),
                E('To get cold feet', 'To become nervous just before doing something.', 'He got cold feet before the audition.', 'Minutes before the bungee jump, I began {gap}.'),
                E('A calculated risk', 'A risk considered carefully before action.', 'The small business loan was a calculated risk.', 'She researched the market, so the investment was {gap}.'),
                E('Courage is not the absence of fear', 'Bravery means acting while still afraid.', 'I was nervous, but courage is not the absence of fear.', 'He spoke honestly despite shaking because {gap}.')
            ],
            songs: [
                S('Brave', 'Sara Bareilles', '3hWfKBt3n7j1xqIy6LA5ve', 'An invitation to speak clearly instead of letting fear control the conversation.', 'Everyday acts of courage', ['expression', 'encouraging', 'silence'], ['What conversation requires more courage than people admit?', 'Which compliment could help someone speak more confidently?', 'What is a low-risk way to practice being assertive?', 'When can “being brave” become pressure to ignore real danger?']),
                S('The Fear', 'Lily Allen', '3eGDjKXH3ETuBwILa817Ri', 'A satirical look at status anxiety, consumer culture, and fears manufactured by comparison.', 'Fears we learn from society', ['status', 'ironic', 'confidence'], ['Which modern fear seems largely created by social media?', 'What product is sold by making customers feel insecure first?', 'How would daily life change if nobody could see follower counts?', 'Which fear is useful because it genuinely protects us?']),
                S('I Lived', 'OneRepublic', '7bi6eXK2VzZ5iucR7xYxEi', 'A hopeful message about accepting discomfort so life contains stories, not only precautions.', 'Risk, memory, and a full life', ['experience', 'uplifting', 'regret'], ['What small adventure would make this month more memorable?', 'Which safe choice are you genuinely glad you made?', 'What experience was uncomfortable but became a good story?', 'How should people balance future security with enjoying the present?'])
            ],
            contexts: [
                C('The Risk Thermometer', 'Not every fear deserves the same response.', 'Good decisions separate discomfort from danger. An awkward introduction and an unsafe road may both raise your heartbeat, but they require very different plans.', 'Which fear becomes smaller after good preparation?', [{title:'Low stakes',text:'Embarrassment, trying a hobby, or asking a question.'},{title:'Medium stakes',text:'Career changes, travel, or difficult conversations.'},{title:'High stakes',text:'Physical danger, major debt, or irreversible consequences.'},{title:'Hidden risk',text:'Doing nothing also creates missed opportunities and regret.'}], 'fa-temperature-half'),
                C('The Courage Recipe', 'Preparation does not cancel bravery.', 'Courage often combines information, support, a backup plan, and one manageable first step. “Just do it” is catchy; “prepare and begin” is usually more useful.', 'What is the smallest brave step you could take this week?', [{title:'Name it',text:'Specific fears are easier to plan for than vague anxiety.'},{title:'Shrink it',text:'Turn the challenge into a first step that takes ten minutes.'},{title:'Support it',text:'Ask someone to practice, accompany, or check in.'},{title:'Review it',text:'Afterward, notice what was easier than expected.'}], 'fa-stairs')
            ],
            speaking: { title: 'The Risk Room', icon: 'fa-dice', prompts: ['Rate three activities from “healthy stretch” to “bad idea.”', 'Persuade a cautious friend to try a safe new experience.', 'Explain a calculated risk you would take with one month of free time.', 'Design a courage challenge with three increasingly difficult levels.'], support: ['The potential benefit is…', 'The main risk would be…', 'I would reduce it by…', 'My first step would be…'] },
            homework: ['Write a plan for facing one manageable fear.', 'Compare courage and recklessness using two examples.', 'Tell the story of a risk that taught someone something useful.'],
            closing: 'Courage is fear with a plan and a reason to move.'
        }),

        52: lesson({
            title: 'Beauty, Body Image & Self-Esteem', icon: 'fa-face-smile-beam', accent: 'pink',
            warmupTitle: 'Warm-up: Mirror, Camera, Filter', warmupIntro: 'Beauty standards change; bad lighting remains surprisingly powerful.',
            warmups: ['What style choice makes you feel instantly more confident?', 'Which beauty trend from the past deserves a comeback—or a permanent goodbye?', 'Why do people often dislike photos that others think look great?', 'Create an honest slogan for a beauty filter.'],
            expressions: [
                E('To feel comfortable in your own skin', 'To accept yourself and feel at ease.', 'She finally feels comfortable in her own skin.', 'Wearing clothes he actually likes helped him {gap}.'),
                E('Beauty is in the eye of the beholder', 'Different people find different things attractive.', 'I love the unusual design; beauty is in the eye of the beholder.', 'They disagreed about the outfit because {gap}.'),
                E('To put yourself down', 'To speak negatively about yourself.', 'Stop putting yourself down over one bad photo.', 'Calling yourself “terrible” after every mistake means you tend {gap}.'),
                E('To embrace your flaws', 'To accept imperfections without shame.', 'He learned to embrace his flaws instead of hiding them.', 'She stopped editing every tiny detail and began {gap}.'),
                E('A confidence boost', 'Something that makes you feel more capable or attractive.', 'The new haircut gave me a confidence boost.', 'Positive feedback before the presentation was {gap}.'),
                E('Unrealistic beauty standards', 'Appearance expectations that most people cannot naturally meet.', 'Edited images can create unrealistic beauty standards.', 'Comparing real skin to filtered ads reinforces {gap}.')
            ],
            songs: [
                S('Scars to Your Beautiful', 'Alessia Cara', '42ydLwx4i5V49RXHOozJZq', 'A compassionate challenge to appearance pressure and the idea that worth must be earned through perfection.', 'Who defines beautiful?', ['self-acceptance', 'supportive', 'perfection'], ['Which appearance rule would you happily delete from society?', 'What is a compliment that has nothing to do with looks?', 'How can friends discuss body image without giving empty reassurance?', 'Which industry has the greatest responsibility for realistic representation?']),
                S('Unpretty', 'TLC', '0BUoLE4o9eVahDHvTqak67', 'The difference between looking approved by others and actually feeling good about yourself.', 'External approval versus internal confidence', ['insecurity', 'honest', 'approval'], ['What can make a fashionable outfit feel completely wrong for someone?', 'Why is confidence sometimes mistaken for arrogance?', 'Which comment about appearance sounds positive but can create pressure?', 'How would social media look if filters had visible warning labels?']),
                S('Beautiful', 'Christina Aguilera', '1FvUDOkmQOJINFQrRQsQBb', 'A direct affirmation of dignity when criticism and self-doubt become loud.', 'Building self-esteem without clichés', ['worth', 'powerful', 'criticism'], ['What activity makes you forget to worry about your appearance?', 'Which personal quality became more valuable to you with age?', 'How can someone respond gracefully to an unwanted comment about their body?', 'What would a healthier advertisement for clothing or fitness show?'])
            ],
            contexts: [
                C('The Beauty Timeline', 'Standards move; human bodies do not follow trends.', 'Different decades celebrate different shapes, hairstyles, skin tones, and levels of “naturalness.” Treating a trend as a universal truth guarantees that most people feel temporarily wrong.', 'Which current beauty trend will look funniest in twenty years?', [{title:'Fashion',text:'Clothes can express identity but sizing systems often create frustration.'},{title:'Media',text:'Lighting, posing, retouching, and selection shape what looks “normal.”'},{title:'Culture',text:'Beauty ideals vary widely between places and communities.'},{title:'Age',text:'Confidence can grow when appearance stops being the only score.'}], 'fa-timeline'),
                C('The Compliment Upgrade', 'Specific beats automatic.', '“You look nice” is pleasant. A fuller compliment notices effort, energy, humor, taste, kindness, or skill—and does not make the other person defend themselves.', 'What compliment would you like people to give more often?', [{title:'Effort',text:'“You handled that difficult situation really well.”'},{title:'Style',text:'“That color feels completely like you.”'},{title:'Presence',text:'“You make people feel included.”'},{title:'Growth',text:'“You seem much more confident explaining your ideas.”'}], 'fa-comment-dots')
            ],
            speaking: { title: 'The Confidence Studio', icon: 'fa-camera-retro', prompts: ['Redesign a beauty advertisement to make it more realistic.', 'Give a friend a confidence boost before an important event.', 'Explain one beauty standard you do not personally understand.', 'Create three rules for a healthier relationship with photos and mirrors.'], support: ['What matters more to me is…', 'I feel most like myself when…', 'That standard seems unrealistic because…', 'A better message would be…'] },
            homework: ['Write a letter to your younger self about appearance and confidence.', 'Analyze how one advertisement creates desire or insecurity.', 'Describe a personal style choice that expresses identity.'],
            closing: 'Self-esteem grows when the mirror stops being the only judge.'
        }),

        53: lesson({
            title: 'Loneliness, Solitude & Human Connection', icon: 'fa-people-arrows-left-right', accent: 'indigo',
            warmupTitle: 'Warm-up: Alone, Not Necessarily Lonely', warmupIntro: 'A quiet evening can be peaceful, awkward, productive—or all three before dinner.',
            warmups: ['What is your ideal activity when nobody else is around?', 'Which place makes it easiest to start a conversation with a stranger?', 'What tiny gesture can make someone feel included?', 'Invent a funny warning sign that your social battery is empty.'],
            expressions: [
                E('To enjoy your own company','To feel comfortable spending time alone.','She enjoys her own company on long train rides.','Cooking alone can help you {gap}.'),
                E('To feel left out','To feel excluded from a group or activity.','He felt left out when nobody explained the joke.','Not receiving the invitation made her {gap}.'),
                E('To reach out','To contact someone and offer or request connection.','I reached out to an old friend last weekend.','If somebody goes unusually quiet, it can help {gap}.'),
                E('A sense of belonging','The feeling of being accepted by a group.','The club gave newcomers a sense of belonging.','Shared rituals can create {gap}.'),
                E('To recharge your social battery','To recover energy after social interaction.','I need a quiet morning to recharge my social battery.','After the crowded conference, he stayed home to {gap}.'),
                E('A meaningful connection','A relationship or interaction that feels genuine.','One honest conversation created a meaningful connection.','Small talk sometimes develops into {gap}.')
            ],
            songs: [
                S('Boulevard of Broken Dreams','Green Day','59Kw6inNc9aLAhEMCUNlHK','Walking alone becomes both an image of independence and a sign of disconnection.','When solitude changes into loneliness',['alone','reflective','direction'],['What makes a solo walk feel relaxing instead of lonely?','Which public place can feel surprisingly isolating?','What soundtrack would fit a confident walk through your city?','How can independence hide a need for support?']),
                S('Lonely','Akon',null,'A public confession about discovering that success does not replace dependable relationships.','Attention is not the same as connection',['regret','vulnerable','company'],['Which is worse: having nobody to call or feeling unable to call anyone?','Why can popular people still feel disconnected?','What low-pressure message could restart an old friendship?','Which everyday routine becomes better with company?']),
                S('People Help the People','Birdy','0YywjDvFudcaHG74NuWISy','An invitation to notice pain and respond with practical human warmth.','Small actions, real connection',['empathy','gentle','support'],['What is the easiest way to make a newcomer comfortable?','When is advice less useful than simply listening?','Which community space brings different generations together?','Design a one-minute habit that strengthens a friendship.'])
            ],
            contexts: [
                C('Solitude or Loneliness?','The difference is often choice.','Solitude can restore attention and creativity. Loneliness appears when the connection we want is different from the connection we have.','What is your personal recipe for enjoyable solitude?',[{title:'Chosen',text:'A quiet afternoon can feel like freedom.'},{title:'Unchosen',text:'An empty weekend can feel like rejection.'},{title:'Digital',text:'Constant messages do not guarantee closeness.'},{title:'Balanced',text:'Most people need both privacy and belonging.'}],'fa-moon'),
                C('The Connection Menu','Not every social need requires a party.','Connection can be a deep talk, a shared task, a silly meme, familiar faces at a café, or five comfortable minutes with a neighbor.','Which type of connection is underrated?',[{title:'Deep',text:'One person and an honest conversation.'},{title:'Playful',text:'Games, jokes, and shared nonsense.'},{title:'Practical',text:'Cooking, studying, fixing, or volunteering together.'},{title:'Ambient',text:'Being around people without needing to perform.'}],'fa-users')
            ],
            speaking: {title:'The Connection Clinic',icon:'fa-comments',prompts:['Plan a welcoming evening for someone new in town.','Compare a peaceful solo weekend with an active social weekend.','Role-play reaching out to a friend after a long silence.','Create a guide for respecting an introvert without excluding them.'],support:['You could make them feel included by…','I value time alone because…','A low-pressure invitation might be…','Connection feels genuine when…']},
            homework: ['Describe a place where you feel you belong.','Write a friendly message that reconnects without creating pressure.','Plan one solo activity and one social activity for a balanced weekend.'],
            closing: 'Good connection leaves room for both conversation and quiet.'
        }),

        54: lesson({
            title: 'Superpowers, Magic & Impossible Abilities', icon: 'fa-wand-magic-sparkles', accent: 'purple',
            warmupTitle: 'Warm-up: Choose Your Power Carefully', warmupIntro: 'Every superpower sounds perfect until someone asks about laundry, traffic, and secret identities.',
            warmups: ['Which ordinary inconvenience would you eliminate with magic?', 'What superpower would be impressive but almost completely useless?', 'Choose a magical object to take to work or school.', 'What would be the funniest weakness for a superhero?'],
            expressions: [
                E('To have a hidden power','To possess an ability others do not know about.','The quiet librarian has a hidden power.','Nobody knew the chef seemed {gap}.'),
                E('A blessing and a curse','Something with both major benefits and disadvantages.','Reading minds would be a blessing and a curse.','Perfect memory could become {gap}.'),
                E('To save the day','To solve a serious problem at the right moment.','Her ability to freeze time saved the day.','The flying dog arrived just in time {gap}.'),
                E('To bend the rules','To interpret or change rules in a flexible way.','Magic lets the story bend the rules of reality.','A time traveler might be tempted {gap}.'),
                E('Beyond your wildest dreams','More extraordinary than you imagined possible.','The castle was beyond their wildest dreams.','The inventor created something {gap}.'),
                E('With great power comes great responsibility','Abilities create duties and consequences.','He cannot use invisibility carelessly; with great power comes great responsibility.','The hero learned that {gap}.')
            ],
            songs: [
                S("Superman (It's Not Easy)",'Five for Fighting','3TwtrR1yNLY1PMPsrGQpOp','A powerful figure admits that being exceptional can still feel exhausting and lonely.','The inconvenient side of being super',['pressure','human','expectations'],['Which superpower would create the most paperwork?','What ordinary skill does every superhero still need?','How should a hero decide who to help first?','Which famous power would ruin a normal social life?']),
                S('Magic','Pilot',null,'Wonder is treated as a joyful force that changes how an ordinary day feels.','Everyday things that feel magical',['wonder','bright','transformation'],['Which modern technology would look like magic two centuries ago?','What simple experience still feels magical to you?','Invent a spell for an extremely minor problem.','Would a world with real magic need magic licenses? Why?']),
                S('Kryptonite','3 Doors Down',null,'Heroic imagery becomes a way to discuss loyalty, vulnerability, and limits.','Every hero needs a weakness',['loyalty','intense','weakness'],['What harmless object could be your comic-book kryptonite?','Why are flawless heroes usually less interesting?','Which weakness could unexpectedly become an advantage?','Create a superhero duo whose powers cause constant arguments.'])
            ],
            contexts: [
                C('The Power Exchange','No power comes without a catch.','Choose an ability, then accept a strange limitation: teleportation only on Tuesdays, invisibility that leaves your shoes visible, or flight at walking speed.','Which limitation produces the funniest hero?',[{title:'Time',text:'Pause time, but every pause makes you hungry.'},{title:'Mind',text:'Read thoughts, but only about food.'},{title:'Travel',text:'Teleport, but arrive with wet socks.'},{title:'Nature',text:'Talk to animals, but they mostly complain.'}],'fa-bolt'),
                C('Magic in Real Life','A miracle may need customer support.','If magic were common, people would build jobs, laws, scams, sports, and boring instruction manuals around it.','Which magical service would become the biggest business?',[{title:'Work',text:'Spell technicians would fix badly cast enchantments.'},{title:'Law',text:'Courts would need rules for memory spells.'},{title:'Travel',text:'Broom parking would become a city problem.'},{title:'Home',text:'Self-washing dishes might finally unite humanity.'}],'fa-hat-wizard')
            ],
            speaking: {title:'The Superpower Draft',icon:'fa-shield-halved',prompts:['Choose a power and negotiate its limitation.','Pitch a superhero whose mission is completely ordinary.','Design three laws for responsible magic.','Solve a city problem using a team of unusual powers.'],support:['The main advantage would be…','The unexpected drawback is…','This power should only be used when…','Our hero would struggle with…']},
            homework: ['Create a hero profile with a power, weakness, costume, and day job.','Write five rules for owning a magic wand.','Describe one real skill that feels almost like a superpower.'],
            closing: 'Imagination gets better when impossible powers meet very human problems.'
        }),

        55: lesson({
            title: 'What If…? Absurd Scenarios', icon: 'fa-circle-question', accent: 'cyan',
            warmupTitle: 'Warm-up: Reality Has Left the Chat', warmupIntro: 'Logic is welcome, but today it must wear a ridiculous hat.',
            warmups: ['What if pets could leave online reviews about their owners?', 'What if every lie produced a loud trumpet sound?', 'What if weekends lasted five days but Mondays lasted forty-eight hours?', 'Choose one object in the room and give it a secret life.'],
            expressions: [
                E('Hypothetically speaking','Used to introduce an imagined situation.','Hypothetically speaking, what if gravity stopped at lunchtime?','{gap}, could a penguin run a hotel?'),
                E('In the unlikely event that','If something improbable happens.','In the unlikely event that aliens call, be polite.','{gap} the moon disappears, we need a backup plan.'),
                E('To think outside the box','To consider creative, unconventional ideas.','We need to think outside the box to feed fifty dragons.','Her upside-down umbrella proves she can {gap}.'),
                E('A long shot','An attempt or possibility unlikely to succeed.','Teaching the cat to answer emails is a long shot.','Winning with that bizarre plan is {gap}.'),
                E('Stranger things have happened','An unlikely idea may still be possible.','A robot mayor? Stranger things have happened.','Maybe the plan will work—{gap}.'),
                E('To suspend disbelief','To temporarily accept impossible ideas in a story.','Good fantasy helps us suspend disbelief.','To enjoy the talking refrigerator, you must {gap}.')
            ],
            songs: [
                S('If I Had $1,000,000','Barenaked Ladies',null,'A huge fantasy is filled with oddly specific, funny purchases and everyday dreams.','What absurd wealth reveals',['money','playful','choices'],['What ridiculous luxury would you buy with unlimited money?','Which cheap item would you continue using even after becoming rich?','Design the least practical mansion room imaginable.','What gift would confuse a billionaire?']),
                S('The Fox (What Does the Fox Say?)','Ylvis',null,'A simple unanswered question becomes a completely committed musical mystery.','Taking nonsense seriously',['mystery','energetic','sound'],['Which animal deserves a dramatic theme song?','Invent three sounds for an animal nobody has discovered yet.','Why can nonsense be more memorable than a serious message?','What ordinary question could become an absurd hit song?']),
                S('White & Nerdy',"'Weird Al' Yankovic",null,'Exaggerated details turn hobbies, skills, and social awkwardness into comic pride.','Exaggeration as comedy',['identity','fast','details'],['Which harmless habit could you exaggerate into a superhero origin story?','What niche knowledge are you strangely proud of?','Create a dramatic title for a boring daily task.','Which hobby would be funniest at the Olympic Games?'])
            ],
            contexts: [
                C('The Absurd City Council','Serious meeting, impossible problem.','The city must respond to clouds that park illegally, pigeons that demand salaries, and a fountain that predicts embarrassing moments.','Which problem should receive the emergency budget?',[{title:'Transport',text:'All buses now move sideways.'},{title:'Housing',text:'Every apartment grows one extra room at midnight.'},{title:'Animals',text:'Squirrels have formed a local government.'},{title:'Weather',text:'It rains soup every Thursday.'}],'fa-building-columns'),
                C('One Tiny Change','Small rules can transform everything.','Imagine a world where names expire, chairs choose their owners, or every question must be answered with a drawing. Follow the consequences.','Which tiny change creates the biggest chaos?',[{title:'Language',text:'People can use only ten words per day.'},{title:'Food',text:'Dessert must legally come first.'},{title:'Time',text:'Everyone gets one personal Tuesday.'},{title:'Objects',text:'Lost socks return with souvenirs.'}],'fa-shuffle')
            ],
            speaking: {title:'The What-If Machine',icon:'fa-gears',prompts:['Pick an absurd law and defend it to the class.','Explain how daily life changes when animals can speak.','Sell a product designed for an impossible problem.','Continue a story that begins: “This morning, gravity apologized.”'],support:['Hypothetically speaking…','The first consequence would be…','The strangest part is…','Against all logic, it might…']},
            homework: ['Write five connected consequences of one absurd change.','Create an advertisement for a product nobody should need.','Interview an imaginary creature about an ordinary job.'],
            closing: 'A ridiculous question can produce surprisingly clever language.'
        }),

        56: lesson({
            title: 'Traditions: Keep, Change or Let Go?', icon: 'fa-landmark', accent: 'amber',
            warmupTitle: 'Warm-up: Old, Gold or Just Cold?', warmupIntro: 'Some traditions connect generations. Others survive because nobody remembers who was supposed to cancel them.',
            warmups: ['Which family or local tradition involves the best food?', 'What tradition would confuse a visitor from another planet?', 'Which celebration could use one modern upgrade?', 'Invent a tradition people would actually enjoy on Mondays.'],
            expressions: [
                E('To pass something down','To transfer a custom or object to a younger generation.','The recipe was passed down through four generations.','They hope {gap} the festival tradition.'),
                E('To keep a tradition alive','To continue practicing a custom.','Community volunteers keep the tradition alive.','Annual storytelling nights help {gap}.'),
                E('To be set in stone','To be fixed and difficult to change.','The ceremony is traditional, but the details are not set in stone.','The dress code should not be {gap}.'),
                E('To move with the times','To adapt to current ideas or needs.','The festival moved with the times and reduced plastic waste.','Old institutions sometimes need {gap}.'),
                E('To outlive its purpose','To continue after it is no longer useful.','That rule has outlived its purpose.','A custom can {gap} when its original context disappears.'),
                E('A sense of continuity','A feeling of connection between past and present.','The yearly meal creates a sense of continuity.','Old photographs give the event {gap}.')
            ],
            songs: [
                S('Tradition','Fiddler on the Roof Cast',null,'A community explains how established roles create order, identity, and tension.','Why traditions feel powerful',['roles','theatrical','stability'],['Which tradition teaches useful values without needing strict rules?','When does preserving a custom become pressure?','What role in a traditional celebration would you choose?','How can newcomers participate without feeling like outsiders?']),
                S("The Times They Are A-Changin'",'Bob Dylan',null,'Social change is presented as unavoidable, asking people to recognize a new moment.','Adapting without erasing the past',['change','urgent','generations'],['Which custom has improved because people updated it?','Why do generations disagree about the speed of change?','What old-fashioned habit still works perfectly well?','How can a group change a tradition respectfully?']),
                S('Changes','David Bowie',null,'Personal and cultural transformation become something to face rather than escape.','Change as part of identity',['change','restless','identity'],['Which yearly tradition would you redesign for your current life?','What should stay recognizable when a celebration evolves?','Which new habit might become a tradition in fifty years?','How do food and music help traditions travel between cultures?'])
            ],
            contexts: [
                C('The Tradition Test','Keep the meaning; question the method.','A tradition can provide belonging, memory, fun, or values. It can also exclude people, waste resources, or demand behavior nobody wants.','What question should every tradition answer?',[{title:'Keep',text:'It connects people and remains enjoyable.'},{title:'Adapt',text:'Its meaning matters, but the format needs work.'},{title:'Optional',text:'People may participate without social punishment.'},{title:'Retire',text:'It causes harm or has clearly lost its purpose.'}],'fa-scale-balanced'),
                C('A Festival Redesign','The town wants old charm and new relevance.','A century-old festival has low attendance, expensive costumes, too much waste, and one truly excellent cake. The council needs a respectful update.','What would you protect first?',[{title:'Story',text:'Explain where the celebration came from.'},{title:'Access',text:'Make activities affordable and welcoming.'},{title:'Planet',text:'Replace wasteful materials and travel.'},{title:'Fun',text:'Keep the cake; improve the rest.'}],'fa-cake-candles')
            ],
            speaking: {title:'Keep, Change, Let Go',icon:'fa-arrows-rotate',prompts:['Classify four traditions and justify each decision.','Modernize a celebration without removing its identity.','Defend an unusual family custom to a skeptical visitor.','Create a new tradition that encourages community connection.'],support:['The original purpose was…','What still matters is…','I would preserve… but update…','Participation should be optional because…']},
            homework: ['Ask someone about a tradition that changed during their lifetime.','Describe the sounds, food, and objects of one celebration.','Propose one new tradition for your family, workplace, or community.'],
            closing: 'Traditions stay alive when people can carry their meaning forward.'
        }),

        57: lesson({
            title: 'Free Speech, Censorship & Public Consequences', icon: 'fa-microphone-lines', accent: 'red',
            warmupTitle: 'Warm-up: Say It, Post It, Own It', warmupIntro: 'Having a voice matters. So does remembering that screenshots have excellent memories.',
            warmups: ['What opinion about food would get you dramatically booed by friends?', 'Which public place most needs a “think before you speak” sign?', 'What makes disagreement entertaining instead of hostile?', 'Write a harmless statement that sounds strangely controversial.'],
            expressions: [
                E('To speak your mind','To express an opinion honestly.','She spoke her mind during the meeting.','You can {gap} without insulting anyone.'),
                E('To cross the line','To go beyond acceptable behavior.','The joke crossed the line when it targeted a colleague.','Criticism becomes harassment when it {gap}.'),
                E('To face the consequences','To experience the results of an action.','Public comments may require you to face the consequences.','He posted the accusation and had {gap}.'),
                E('To silence a voice','To prevent someone from expressing a view.','Removing every disagreement can silence important voices.','Threats were used {gap}.'),
                E('A chilling effect','Fear that discourages legitimate speech.','Vague punishment rules can create a chilling effect.','The policy had {gap} on honest debate.'),
                E('To hold someone accountable','To require responsibility for words or actions.','Criticism can hold leaders accountable.','Fact-checking helps {gap} public figures.')
            ],
            songs: [
                S("You Don't Own Me",'Lesley Gore',null,'A clear refusal to be controlled becomes a statement about autonomy and voice.','Speaking when others expect obedience',['autonomy','defiant','control'],['What helps a person disagree confidently without becoming aggressive?','When does advice begin to sound like control?','Which phrase can set a respectful conversational boundary?','How should a group protect quieter voices in a debate?']),
                S('Radio Ga Ga','Queen',null,'The song looks at mass media with affection while noticing how its influence and role are changing.','Media, influence, and shared attention',['media','nostalgic','influence'],['Which medium shapes public conversation most strongly today?','What do people lose when everyone receives different information?','Which old form of media still creates community?','How can an audience reward responsible public speech?']),
                S('Zombie','The Cranberries',null,'A forceful protest transforms grief and political frustration into a message that is difficult to ignore.','Why protest art uses strong emotion',['conflict','intense','protest'],['When does a song communicate an issue better than a speech?','How can artists discuss conflict without simplifying it too much?','What makes a protest message memorable rather than merely loud?','Should public platforms explain why content is removed? What should that explanation include?'])
            ],
            contexts: [
                C('Speech, Reach, Response','A right to speak is not a guarantee of agreement.','Public expression may receive criticism, lost trust, moderation, or professional consequences. The difficult discussion is whether the response is proportionate and transparent.','What makes a consequence fair?',[{title:'Context',text:'A private joke and a public campaign have different reach.'},{title:'Power',text:'Influence changes the possible harm of a statement.'},{title:'Intent',text:'Purpose matters, but impact also matters.'},{title:'Repair',text:'Correction and apology should have a real path.'}],'fa-bullhorn'),
                C('The Moderation Desk','Every option has a cost.','A platform must choose whether to label, reduce, remove, or leave a disputed post. Evidence is incomplete, attention is growing, and users demand an instant answer.','Which information should moderators check first?',[{title:'Leave',text:'Protect open discussion and add context.'},{title:'Label',text:'Warn readers and link reliable information.'},{title:'Limit',text:'Reduce algorithmic promotion temporarily.'},{title:'Remove',text:'Use for clear threats or defined violations.'}],'fa-shield')
            ],
            speaking: {title:'The Public Square',icon:'fa-gavel',prompts:['Create fair rules for a student discussion forum.','Respond to an offensive joke in three different ways.','Debate whether old public comments should follow someone forever.','Design an appeal process for removed content.'],support:['People should be free to… provided that…','This crosses the line because…','A proportionate response would be…','The decision should be transparent about…']},
            homework: ['Write a short code of conduct for a public discussion.','Compare disagreement, criticism, and harassment with examples.','Rewrite an aggressive comment as a firm but constructive response.'],
            closing: 'Strong public conversation protects expression and expects responsibility.'
        }),

        58: lesson({
            title: 'Useless Talents & Hidden Skills', icon: 'fa-medal', accent: 'lime',
            warmupTitle: 'Warm-up: Surprisingly Impressive', warmupIntro: 'Not every talent belongs on a résumé. Some belong at a party at exactly 9:17 p.m.',
            warmups: ['What tiny task are you unusually good at?', 'Which useless world record might you realistically attempt?', 'What skill looks easy until you try it?', 'Invent a talent show category that everyone could enter.'],
            expressions: [
                E('To have a knack for something','To have a natural skill for something.','He has a knack for remembering voices.','She {gap} folding fitted sheets.'),
                E('A hidden talent','An ability that most people do not know about.','Mimicking bird sounds is her hidden talent.','At karaoke, we discovered his {gap}.'),
                E('To pick something up quickly','To learn a skill in little time.','She picked juggling up quickly.','He tends {gap} musical patterns.'),
                E('A party trick','A short entertaining skill shown socially.','Opening a bottle with paper is his party trick.','Her backwards alphabet is a reliable {gap}.'),
                E('To come in handy','To become useful in a particular situation.','That strange knot came in handy while camping.','Your map-reading skill may {gap}.'),
                E('Jack of all trades','Someone competent at many different activities.','Our neighbor is a jack of all trades.','She repairs bikes, bakes bread, and edits videos—a real {gap}.')
            ],
            songs: [
                S('The Elements','Tom Lehrer',null,'A difficult list becomes entertainment through speed, memory, and comic precision.','When memorization becomes performance',['memory','rapid','precision'],['What list could you perform from memory?','Which school fact has remained in your brain for no useful reason?','What talent becomes impressive mainly because of speed?','Invent a mnemonic for something absurd.']),
                S('One Week','Barenaked Ladies',null,'Rapid delivery and dense references turn verbal agility into part of the fun.','Skills that look effortless',['speed','playful','wordplay'],['Which song, speech, or tongue twister would be hardest to perform?','What do experts make look deceptively simple?','Which skill would you learn purely to surprise people?','How much practice changes a talent into a skill?']),
                S('Tribute','Tenacious D',null,'An exaggerated story celebrates a supposedly legendary performance that nobody can reproduce.','The funniest way to describe greatness',['performance','dramatic','legend'],['What ordinary achievement deserves an unnecessarily epic song?','Which forgotten skill would you like to demonstrate one more time?','How do people usually react when a party trick fails?','Create a grand title for your most minor ability.'])
            ],
            contexts: [
                C('The Talent Auction','Spend imaginary points wisely.','Bid on perfect whistling, speed-reading menus, identifying fonts, folding maps, guessing microwave time, or always choosing the fastest supermarket line.','Which talent is secretly the most useful?',[{title:'Social',text:'Remember every name after hearing it once.'},{title:'Home',text:'Fold any fitted sheet perfectly.'},{title:'Travel',text:'Pack a suitcase in three minutes.'},{title:'Chaos',text:'Catch any falling object except your phone.'}],'fa-gavel'),
                C('Skill Origin Stories','Talent often starts accidentally.','People learn strange abilities through boredom, unusual jobs, siblings, games, repeated mistakes, or one overly competitive family holiday.','What is the funniest believable origin for a skill?',[{title:'Boredom',text:'A long commute creates a memory champion.'},{title:'Work',text:'A café job creates a foam-art expert.'},{title:'Family',text:'Competitive gift wrapping becomes serious.'},{title:'Accident',text:'A broken remote leads to expert button pressing.'}],'fa-star')
            ],
            speaking: {title:'The Low-Stakes Talent Show',icon:'fa-trophy',prompts:['Teach a tiny skill in three clear steps.','Pitch your useless talent as an essential professional service.','Choose the best hidden skill for a survival team.','Interview a classmate about how they learned an unusual ability.'],support:['I have a knack for…','It first came in handy when…','The trickiest part is…','It looks useless, but actually…']},
            homework: ['Practice and explain one small skill.','Write a funny advertisement for your hidden talent.','List three abilities you learned outside a classroom and how you learned them.'],
            closing: 'A skill does not need to change the world to make a good story.'
        }),

        59: lesson({
            title: 'Advertising, Consumerism & Why We Buy', icon: 'fa-cart-shopping', accent: 'emerald',
            warmupTitle: 'Warm-up: Add to Cart?', warmupIntro: 'Some purchases solve problems. Others arrive in beautiful packaging and create new ones.',
            warmups: ['What cheap purchase has given you surprisingly good value?', 'Which advertisement do you remember better than the actual product?', 'What item is hardest to resist when it is on sale?', 'Create an honest slogan for online shopping at midnight.'],
            expressions: [
                E('To buy into something','To accept an idea or marketing message.','Consumers bought into the promise of instant success.','I do not {gap} the idea that expensive always means better.'),
                E('An impulse purchase','Something bought suddenly without planning.','The novelty lamp was an impulse purchase.','Snacks beside the checkout encourage {gap}.'),
                E('To get your money’s worth','To receive enough value for the price.','I used the coat for ten years and got my money’s worth.','Choose the durable model if you want {gap}.'),
                E('A must-have item','A product presented as essential or highly desirable.','The campaign turned the bottle into a must-have item.','Influencers called the gadget {gap}.'),
                E('To shop around','To compare products and prices before buying.','Shop around before choosing a phone plan.','We {gap} and found a better warranty.'),
                E('Buyer’s remorse','Regret after making a purchase.','The giant exercise machine caused immediate buyer’s remorse.','Waiting one day can prevent {gap}.')
            ],
            songs: [
                S("Opportunities (Let's Make Lots of Money)",'Pet Shop Boys',null,'A comic partnership reduces ambition and relationships to a business opportunity.','Selling the dream of success',['money','satirical','partnership'],['What promise appears most often in get-rich-quick advertising?','Which product category sells status more than function?','How can humor expose a dishonest sales pitch?','Invent a business partnership between two completely incompatible people.']),
                S('Material Girl','Madonna',null,'Material comfort, image, and romantic attention are presented with playful confidence and irony.','What possessions communicate',['status','playful','desire'],['Which possession is commonly treated as a success symbol?','What object says more about taste than wealth?','When does collecting become clutter?','What would a “non-material world” advertisement sell?']),
                S('Ka-Ching!','Shania Twain',null,'Shopping culture is criticized through the language, sounds, and excitement of spending.','Why buying feels rewarding',['spending','upbeat','temptation'],['Which store design trick makes people stay longer?','What subscription is easiest to forget you are paying for?','How would you make repairing products more attractive than replacing them?','Which purchase deserves a mandatory twenty-four-hour waiting period?'])
            ],
            contexts: [
                C('The Persuasion Toolbox','Ads rarely sell only the object.','They sell convenience, identity, belonging, security, attractiveness, nostalgia, or the fear of missing out. Recognizing the appeal does not make us immune, but it makes the choice clearer.','Which appeal works best on you?',[{title:'Scarcity',text:'“Only two left” creates urgency.'},{title:'Social Proof',text:'Reviews suggest everybody already loves it.'},{title:'Identity',text:'The product promises a version of you.'},{title:'Ease',text:'One click removes time for reflection.'}],'fa-bullseye'),
                C('The Honest Ad Agency','Truth can still be persuasive.','Your team must advertise a reusable bottle, a slow laptop, or an uncomfortable designer chair without hiding its limits or inventing impossible benefits.','What makes an honest ad attractive?',[{title:'Specific',text:'Use evidence instead of vague superlatives.'},{title:'Useful',text:'Show the real problem it solves.'},{title:'Transparent',text:'Name relevant limitations clearly.'},{title:'Memorable',text:'Humor does not require deception.'}],'fa-rectangle-ad')
            ],
            speaking: {title:'The Smart Shopper Studio',icon:'fa-tags',prompts:['Analyze the hidden promise behind a familiar advertisement.','Convince a friend not to make an impulse purchase.','Pitch an ordinary object without exaggerating.','Rank five purchases by value, usefulness, and joy.'],support:['The ad is really selling…','The urgency is created by…','You would get more value if…','Before buying, I would compare…']},
            homework: ['Keep a one-day log of advertisements you notice.','Rewrite one exaggerated product claim honestly.','Describe your best and funniest worst purchase.'],
            closing: 'The smartest purchase begins by noticing what is really being sold.'
        }),

        60: lesson({
            title: 'Stereotypes, Bias & First Impressions', icon: 'fa-eye', accent: 'orange',
            warmupTitle: 'Warm-up: First Look, Second Thought', warmupIntro: 'Brains love shortcuts. Unfortunately, they sometimes take the scenic route directly to the wrong conclusion.',
            warmups: ['What harmless detail do people often misread about you?', 'Which job has the most recognizable stereotype in movies?', 'What first impression can clothing create?', 'Invent two completely different biographies for the same person waiting at a bus stop.'],
            expressions: [
                E('To jump to conclusions','To decide before having enough evidence.','I jumped to conclusions because he looked serious.','One short message is not enough {gap}.'),
                E('To judge a book by its cover','To evaluate someone only by appearance.','Her quiet style reminds us not to judge a book by its cover.','The flashy office made them {gap}.'),
                E('A preconceived notion','An opinion formed before knowing the facts.','Travel challenged my preconceived notions about the city.','He arrived with {gap} about the team.'),
                E('To prove someone wrong','To show that another person’s belief was incorrect.','She proved the doubters wrong with her first performance.','The new employee quickly {gap}.'),
                E('To give someone the benefit of the doubt','To choose a favorable interpretation without full evidence.','Give her the benefit of the doubt; the train may be late.','Instead of assuming disrespect, we {gap}.'),
                E('An unconscious bias','An automatic preference or assumption we may not notice.','An unconscious bias affected which names seemed familiar.','Structured interviews can reduce {gap}.')
            ],
            songs: [
                S('Common People','Pulp',null,'Class identity and the fantasy of briefly borrowing another person’s life are examined with sharp storytelling.','Experience versus assumption',['class','sharp','perspective'],['Why is observing a lifestyle different from living it?','Which stereotype about wealth appears frequently in entertainment?','How can curiosity become disrespectful?','What question helps replace an assumption with real information?']),
                S('Black or White','Michael Jackson',null,'The song rejects racial division through a direct message of shared humanity.','Simple messages about complex bias',['equality','energetic','unity'],['When can a simple slogan help a complicated conversation?','What does genuine inclusion look like in an everyday group?','Which shared activity helps strangers see beyond categories?','How can media show difference without turning people into symbols?']),
                S('Short People','Randy Newman',null,'An intentionally absurd prejudice uses exaggeration to expose the irrational structure of discrimination.','Satire and the danger of missing the joke',['satire','ironic','prejudice'],['How can an audience recognize that a song is satirical?','When might satire reinforce the idea it wants to criticize?','Create an obviously ridiculous stereotype about people who prefer one kind of snack.','What responsibility does a comedian have when a joke can be misunderstood?'])
            ],
            contexts: [
                C('The Five-Second Biography','Evidence is smaller than the story.','A photo can suggest mood, age, style, or setting. Then our minds invent personality, education, job, and intentions as if those details were visible too.','Which invented detail feels most convincing—and why?',[{title:'Visible',text:'A bright jacket, headphones, and a suitcase.'},{title:'Possible',text:'Perhaps they are traveling for work.'},{title:'Invented',text:'They must be irresponsible or adventurous.'},{title:'Better',text:'Hold several explanations until evidence appears.'}],'fa-id-card'),
                C('The First-Impression Reset','Update the file, not just the footnote.','People often notice evidence that confirms an early opinion and treat contrary evidence as an exception. A fair reset means allowing new behavior to genuinely change the story.','What makes you revise an opinion about someone?',[{title:'Pause',text:'Name the assumption before acting on it.'},{title:'Ask',text:'Use an open question instead of a label.'},{title:'Compare',text:'Would you judge another person the same way?'},{title:'Update',text:'Let repeated evidence replace the first guess.'}],'fa-arrows-spin')
            ],
            speaking: {title:'The Assumption Detective',icon:'fa-magnifying-glass',prompts:['Separate visible facts from invented details in a scenario.','Tell a story about a first impression that changed.','Rewrite a stereotypical fictional character with unexpected traits.','Design a fairer way to choose a team leader.'],support:['My first assumption was…','The actual evidence shows…','Another explanation could be…','I changed my mind when…']},
            homework: ['Notice and question one harmless assumption during the week.','Rewrite a character introduction without stereotypical shortcuts.','Describe three ways a workplace or school can reduce bias.'],
            closing: 'A first impression is a draft, not a final biography.'
        }),

        61: lesson({
            title: 'Alternative Lifestyles: Tiny Homes, Nomads & Off-Grid Living', icon: 'fa-house-chimney-window', accent: 'teal',
            warmupTitle: 'Warm-up: Less Space, More Story', warmupIntro: 'Freedom looks wonderful in travel photos. It looks slightly different when the water tank is empty.',
            warmups: ['What is the smallest space where you could live comfortably?', 'Which possession would be hardest to fit into a tiny home?', 'What job would travel well with a nomadic lifestyle?', 'Choose one modern convenience you could abandon and one you absolutely could not.'],
            expressions: [
                E('To live with less','To intentionally own or consume fewer things.','Tiny-home residents often choose to live with less.','Downsizing taught them {gap}.'),
                E('To put down roots','To settle and build a stable life in one place.','After years of travel, she wanted to put down roots.','They chose the coastal town {gap}.'),
                E('To live off the grid','To live independently from public utilities or systems.','The cabin lets them live off the grid.','Solar panels made it easier {gap}.'),
                E('A change of scenery','A different environment that refreshes you.','Remote work gave him a change of scenery.','A month in the mountains offered {gap}.'),
                E('To make do with','To manage using what is available.','In the van, they make do with a tiny kitchen.','We had {gap} limited storage.'),
                E('The trade-off','A disadvantage accepted in exchange for an advantage.','Less privacy is the trade-off for lower costs.','Reliable internet is {gap} for total isolation.')
            ],
            songs: [
                S('Home','Edward Sharpe & The Magnetic Zeros',null,'Home is connected more to a relationship than to a fixed building or address.','What makes a place home',['home','warm','belonging'],['Which three objects make an unfamiliar room feel like yours?','Can a person feel at home in several places? How?','What makes shared small spaces easier to manage?','Which matters more for home: comfort, people, routine, or location?']),
                S('On the Road Again','Willie Nelson',null,'Movement, music, and companionship make travel itself feel like the destination.','The romance and routine of constant travel',['travel','easygoing','movement'],['Which part of long-term travel is less glamorous than it looks?','What routine would you keep while moving constantly?','Who would be an ideal travel companion for a small vehicle?','Which landscape would make you happily take the slower route?']),
                S('Ends of the Earth','Lord Huron',null,'Adventure and devotion meet in an invitation to follow a life beyond familiar boundaries.','How far would you go for a different life?',['adventure','expansive','choice'],['What would make you leave a comfortable routine?','Which skill is essential for living far from services?','How long should someone test an alternative lifestyle before committing?','Design a realistic one-month experiment in living differently.'])
            ],
            contexts: [
                C('The Lifestyle Reality Check','Every beautiful choice has maintenance.', 'Tiny homes reduce space and costs but demand organization. Nomadic life offers movement but complicates community. Off-grid living creates independence but requires technical work.','Which trade-off would bother you most?',[{title:'Tiny',text:'Lower costs; almost no private storage.'},{title:'Nomadic',text:'Constant novelty; unstable routines.'},{title:'Off-Grid',text:'More autonomy; more responsibility for systems.'},{title:'Co-Living',text:'Community and shared resources; less privacy.'}],'fa-compass'),
                C('Pack Your Life','Twenty objects, no secret storage unit.','Choose what supports health, work, identity, comfort, and joy. Every object needs space, and every duplicate must defend itself.','Which unnecessary item would still earn a place?',[{title:'Essential',text:'Documents, medicine, tools, and weather protection.'},{title:'Work',text:'Equipment that reliably earns income.'},{title:'Comfort',text:'One object that improves difficult days.'},{title:'Joy',text:'A small possession with a large emotional value.'}],'fa-suitcase')
            ],
            speaking: {title:'The Lifestyle Fair',icon:'fa-van-shuttle',prompts:['Pitch one lifestyle honestly, including its worst inconvenience.','Design a functional tiny home for two very different people.','Negotiate what to keep when moving into a van.','Plan a month-long off-grid trial with safety rules.'],support:['The lifestyle appeals to people who…','The biggest trade-off is…','You would need to adapt by…','Before committing, I would test…']},
            homework: ['Sketch and describe your minimum comfortable living space.','Interview someone about a major change of scenery.','Compare the real monthly needs of two alternative lifestyles.'],
            closing: 'A different lifestyle works when its daily reality fits your priorities.'
        }),

        62: lesson({
            title: 'Social Rules, Manners & Pet Peeves', icon: 'fa-face-grimace', accent: 'yellow',
            warmupTitle: 'Warm-up: Polite Society, Tiny Annoyances', warmupIntro: 'Civilization is held together by patience, greetings, and people who do not play videos aloud on the bus.',
            warmups: ['Which small act of politeness improves your whole day?', 'What harmless habit annoys you more than it logically should?', 'Which social rule changes most between cultures?', 'Invent a polite sign for an extremely specific bad habit.'],
            expressions: [
                E('A pet peeve','A small behavior that especially annoys someone.','Loud chewing is his biggest pet peeve.','People blocking doorways is {gap} of mine.'),
                E('To have good manners','To behave politely and considerately.','She has good manners with staff and guests.','Waiting your turn shows you {gap}.'),
                E('To rub someone the wrong way','To irritate or create a negative impression.','His constant interruptions rub people the wrong way.','That sarcastic tone may {gap}.'),
                E('An unwritten rule','A social expectation that is not formally stated.','Standing on one side is an unwritten escalator rule.','Refilling the office coffee pot is {gap}.'),
                E('To call someone out','To directly criticize inappropriate behavior.','She called him out for skipping the line.','Would you {gap} in front of everyone?'),
                E('To let it slide','To choose not to react to a minor problem.','It was one late reply, so I let it slide.','For a first mistake, we can {gap}.')
            ],
            songs: [
                S("Why Can't We Be Friends",'War',null,'A repeated friendly question makes cooperation sound simple, even when people are different.','Getting along without being identical',['friendship','relaxed','difference'],['Which minor disagreement should never ruin a friendship?','What social skill makes group travel easier?','How can humor repair a slightly awkward moment?','What is the friendliest way to disagree about a plan?']),
                S("You're So Vain",'Carly Simon',null,'A sharply observed personality becomes a memorable portrait of self-importance.','When confidence becomes self-centeredness',['vanity','witty','behavior'],['Which conversation habit makes someone seem self-centered?','How can a person redirect a conversation without embarrassing anyone?','What is the difference between sharing and showing off?','Invent a subtle signal that a friend has talked too long.']),
                S('Yakety Yak','The Coasters',null,'Household commands and teenage resistance turn everyday expectations into playful conflict.','Why rules sound different depending on who says them',['rules','comic','chores'],['Which household rule causes the silliest arguments?','What makes a request sound respectful instead of bossy?','Which chore needs an international competition?','Create a fair rule for shared kitchens.'])
            ],
            contexts: [
                C('The Annoyance Court','Is it rude, unfortunate, or just your preference?','A pet peeve may involve real inconvenience, cultural difference, or a personal sensitivity. Before delivering a dramatic verdict, classify the offense.','Which case deserves the strongest response?',[{title:'Public Audio',text:'A phone plays videos on a quiet train.'},{title:'Late Arrival',text:'A friend arrives twelve minutes late.'},{title:'Slow Walking',text:'A group fills the entire sidewalk.'},{title:'Long Voice Note',text:'Someone sends eight minutes instead of two lines.'}],'fa-scale-balanced'),
                C('Manners Across Maps','Polite behavior needs context.','Eye contact, punctuality, tipping, personal space, greetings, shoes, and directness can carry different meanings. Curiosity is safer than assuming your rule is universal.','Which custom should travelers research first?',[{title:'Observe',text:'Notice what local people consistently do.'},{title:'Ask',text:'A respectful question prevents confident mistakes.'},{title:'Adapt',text:'Follow local norms when the cost is small.'},{title:'Explain',text:'Clarify your own needs without declaring them superior.'}],'fa-earth-americas')
            ],
            speaking: {title:'The Etiquette Hotline',icon:'fa-phone',prompts:['Give advice for four awkward social situations.','Rank pet peeves from minor to completely unacceptable.','Role-play politely calling out someone who skips a line.','Write five unwritten rules for a shared space.'],support:['Would you mind…?','I may be overreacting, but…','The unwritten rule here is…','I would let it slide unless…']},
            homework: ['Collect three unwritten rules from different places.','Describe a cultural manners surprise without judging it.','Turn one complaint into a polite, specific request.'],
            closing: 'Good manners are mostly the art of noticing other people.'
        }),

        63: lesson({
            title: 'Would You Rather? Survival & Impossible Choices', icon: 'fa-mountain-sun', accent: 'rose',
            warmupTitle: 'Warm-up: Pick Your Problem', warmupIntro: 'There is no perfect answer—only confident reasoning and the occasional emergency rubber duck.',
            warmups: ['Would you rather lose your map or your phone charger on a trip?', 'Choose one survival item that looks useless but might save the day.', 'Would you prefer an excellent plan with a difficult team or no plan with a great team?', 'Invent an impossible choice involving food and weather.'],
            expressions: [
                E('To weigh your options','To compare possible choices carefully.','We weighed our options before leaving the shelter.','With limited water, the team must {gap}.'),
                E('The lesser of two evils','The less harmful of two bad choices.','Sleeping in the car was the lesser of two evils.','Both routes are dangerous, but the valley is {gap}.'),
                E('To be caught between a rock and a hard place','To face two difficult alternatives.','With the storm and broken bridge, we were caught between a rock and a hard place.','The leader felt {gap}.'),
                E('A calculated risk','A risk considered carefully before action.','Crossing before dark was a calculated risk.','Using the old radio is {gap} worth taking.'),
                E('To trust your gut','To follow your instinct.','The path looked wrong, so I trusted my gut.','When the facts are equal, you may {gap}.'),
                E('To make the call','To make the final decision.','The guide had to make the call before sunset.','Someone needs {gap} now.')
            ],
            songs: [
                S('The Gambler','Kenny Rogers',null,'Card-game advice becomes a practical lesson about timing, judgment, and knowing when to stop.','Knowing when to act',['choices','wise','timing'],['When is quitting a smart decision rather than a failure?','Which teammate should make the final call in a crisis?','What information matters before taking a calculated risk?','Create one piece of survival advice using a game metaphor.']),
                S('Should I Stay or Should I Go','The Clash',null,'Indecision becomes urgent when both action and delay have consequences.','The cost of not choosing',['indecision','urgent','consequences'],['What makes a deadline improve decision-making?','Would you rather decide quickly or gather one more fact? Why?','Which choice becomes worse the longer you postpone it?','How can a team break a perfect tie?']),
                S('Run Through the Jungle','Creedence Clearwater Revival',null,'A threatening landscape creates tension, movement, and uncertainty.','Survival atmosphere versus useful strategy',['danger','tense','movement'],['Which sound in the dark would worry you most?','What is more useful in survival: strength, calmness, knowledge, or luck?','How would you keep a nervous group focused?','Choose three items for crossing an unfamiliar landscape.'])
            ],
            contexts: [
                C('The Emergency Backpack','Ten useful items, room for three.','Choose among water, rope, first-aid supplies, a mirror, a knife, a blanket, a radio, a flashlight, chocolate, and a deck of cards. Conditions are unknown.','Which item changes value most depending on location?',[{title:'Signal',text:'Help must be able to find you.'},{title:'Shelter',text:'Weather can become the immediate threat.'},{title:'Water',text:'A container may matter as much as the water.'},{title:'Morale',text:'Calm thinking protects every other resource.'}],'fa-backpack'),
                C('The Impossible Rescue','Every choice leaves something behind.','A small boat has one free place. Candidates include a doctor, an engineer, a child’s caregiver, and a local guide. The scenario is deliberately incomplete: ask for missing information before deciding.','Which missing fact could reverse your choice?',[{title:'Need',text:'Who is in immediate danger?'},{title:'Ability',text:'What can each person actually contribute?'},{title:'Alternatives',text:'Is there another route or second trip?'},{title:'Fairness',text:'Should chance decide when values conflict?'}],'fa-life-ring')
            ],
            speaking: {title:'The Survival Council',icon:'fa-campground',prompts:['Defend one choice, then argue for the opposite choice.','Select three people and five objects for a rescue team.','Respond when new information ruins your original plan.','Create a difficult but funny would-you-rather question.'],support:['Given what we know…','The main trade-off is…','I would change my decision if…','It is the lesser of two evils because…']},
            homework: ['Write three impossible choices with enough context for debate.','Explain one decision using priorities, risks, and a backup plan.','Design a survival kit for an unusual location.'],
            closing: 'A difficult choice becomes useful conversation when the reasons matter.'
        }),

        64: lesson({
            title: 'Luck, Fate & Free Will', icon: 'fa-clover', accent: 'green',
            warmupTitle: 'Warm-up: Lucky You?', warmupIntro: 'Perhaps everything happens for a reason. Perhaps you simply remembered your umbrella.',
            warmups: ['What is the luckiest small thing that can happen on an ordinary day?', 'Which object is considered lucky in a culture you know?', 'Do skill and luck contribute equally to board games? Explain with an example.', 'Invent a ridiculous ritual for good luck before a meeting.'],
            expressions: [
                E('A stroke of luck','A sudden fortunate event.','Finding the final ticket was a stroke of luck.','The empty parking space was {gap}.'),
                E('To leave something to chance','To allow an uncertain outcome instead of controlling it.','We left the restaurant choice to chance.','Important safety checks should not be {gap}.'),
                E('To make your own luck','To create opportunities through preparation and action.','She networks and practices; she makes her own luck.','Consistent effort can help you {gap}.'),
                E('It was meant to be','The event seems destined to happen.','They missed one train and met—perhaps it was meant to be.','The perfect timing made it feel {gap}.'),
                E('Against all odds','Despite very low probability.','Against all odds, the tiny team won.','The plant survived {gap}.'),
                E('To take control of your destiny','To actively shape your future.','Changing careers helped him take control of his destiny.','She moved abroad {gap}.')
            ],
            songs: [
                S('Lucky Man','The Verve',null,'Happiness and good fortune are considered alongside awareness, choice, and perspective.','Recognizing your own good fortune',['luck','reflective','gratitude'],['Which ordinary advantage do people often forget is lucky?','Does gratitude change luck or only our perception of it?','What achievement looked lucky from outside but required preparation?','How would you explain “beginner’s luck” after winning a game?']),
                S('Que Sera, Sera','Doris Day',null,'Uncertainty about the future receives a calm answer: not everything can be known in advance.','Accepting uncertainty without becoming passive',['future','gentle','acceptance'],['Which future question would you actually prefer not to know?','When is “wait and see” a sensible strategy?','What can you control while an outcome remains uncertain?','How would life change if everyone knew one fact about their future?']),
                S('Freewill','Rush',null,'The song argues for personal choice and responsibility rather than surrendering every outcome to fate.','Choice inside uncertain circumstances',['choice','forceful','responsibility'],['Which matters more in success: opportunity, preparation, timing, or persistence?','How can people acknowledge bad luck without giving up agency?','What choice has a small action but a large long-term effect?','Can two people with equal effort receive very different results? What follows from that?'])
            ],
            contexts: [
                C('The Luck Equation','Outcome is not a single ingredient.','Imagine a result produced by preparation, opportunity, decisions, support, timing, and randomness. Different stories change the proportions without removing the other ingredients.','Which ingredient do success stories usually understate?',[{title:'Preparation',text:'Skill increases the ability to use an opportunity.'},{title:'Opportunity',text:'A door must exist before someone can enter.'},{title:'Decision',text:'People still choose whether to act.'},{title:'Randomness',text:'Timing and circumstances never disappear completely.'}],'fa-dice'),
                C('The Fortune Teller’s Receipt','Knowing the future creates new choices.','You may learn one fact about your next year, but it must fit on a receipt. It cannot reveal lottery numbers, and your response may change the prediction.','What would you ask—and what would you avoid asking?',[{title:'Career',text:'Learn whether one project succeeds.'},{title:'Travel',text:'Discover one place you will visit.'},{title:'People',text:'Know whether an old friend returns.'},{title:'Mystery',text:'Receive only: “Tuesday will be important.”'}],'fa-crystal-ball')
            ],
            speaking: {title:'The Luck Laboratory',icon:'fa-dice-d20',prompts:['Estimate the luck-versus-effort ratio in four achievements.','Tell one event from a fate explanation and a free-will explanation.','Create a harmless lucky ritual and persuade others to try it.','Advise someone after both unusually good and unusually bad luck.'],support:['A stroke of luck helped because…','Preparation mattered when…','What they could control was…','It felt meant to be, although…']},
            homework: ['Describe a lucky event and the preparation that made it useful.','Collect three superstitions and suggest why they persist.','Write a short scene where a prediction changes someone’s behavior.'],
            closing: 'We cannot control every card, but we can still choose how to play the hand.'
        })
    };
}());
