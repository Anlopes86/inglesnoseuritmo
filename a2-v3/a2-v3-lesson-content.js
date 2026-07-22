(function () {
    const lessonTitles = [
        'Past Simple: Details and Time Markers',
        'Complete Past Stories',
        'Comparing Options: More, Less and As...As',
        'Superlatives and Irregular Adjectives',
        'Articles and Quantifiers',
        'Setting the Scene: Past Continuous',
        'Interrupted Stories',
        'Integrated Review #1: Past and Comparison',
        'Going To: Evidence and Detailed Plans',
        'Will for Predictions and Decisions',
        'Present Continuous for Future Plans',
        'Future Review in Real Situations',
        'Can, Could and Permission',
        'Must, Have To and Need To',
        'Giving Specific and Tactful Advice',
        'Integrated Review #2: Plans, Modals and Advice',
        'Present Perfect: Experiences',
        'Ever, Never, Already and Yet',
        'Present Perfect vs Past Simple',
        'Been and Gone',
        'Health Changes and Recovery',
        'Medical Consultation & Conditions',
        'Precise Location: In, On and At',
        'Integrated Review #3: Experiences and Practical English',
        'Prepositions of Movement',
        'Time Expressions and Deadlines',
        'Clarifying Multi-Step Directions',
        'At the Hotel',
        'Gerunds and Infinitives',
        'Zero and First Conditional',
        'Unless, Wishes and Real-Life Hopes',
        'Final Review and Project'
    ];

    const topicMap = [
        'past', 'past', 'compare', 'compare', 'quantity', 'pastContinuous', 'pastContinuous', 'reviewPast',
        'future', 'future', 'future', 'future', 'modals', 'modals', 'advice', 'reviewModals',
        'perfect', 'perfect', 'perfect', 'perfect', 'health', 'health', 'prepositions', 'reviewPractical',
        'prepositions', 'prepositions', 'directions', 'hotel', 'verbPatterns', 'conditionals', 'conditionals', 'finalProject'
    ];

    const banks = {
        past: {
            label: 'past stories',
            themeOptions: ['a work problem that happened yesterday', 'a travel story from the weekend', 'a routine that changed unexpectedly'],
            objectives: ['tell short stories in the past', 'choose between regular and irregular verbs', 'use time markers to organize events'],
            vocab: [
                ['realize', 'perceber', 'I realized my mistake after the meeting.'],
                ['happen', 'acontecer', 'What happened after class?'],
                ['miss', 'perder / sentir falta', 'I missed the bus yesterday.'],
                ['arrive', 'chegar', 'They arrived late.'],
                ['leave', 'sair / deixar', 'She left home at eight.'],
                ['spend', 'passar tempo / gastar', 'We spent the day downtown.'],
                ['forget', 'esquecer', 'He forgot the address.'],
                ['fix', 'consertar', 'I fixed the problem quickly.']
            ],
            grammar: [
                ['Completed actions', 'Use the Past Simple when the action is finished and the time is finished or understood. "I worked late yesterday" is different from "I have worked late" because yesterday is closed time.'],
                ['Regular and irregular verbs', 'Regular verbs usually end in -ed, but pronunciation changes: worked /t/, played /d/, wanted /id/. Irregular verbs need memory and context: go/went, buy/bought, take/took.'],
                ['Questions and negatives', 'Use did for questions and negatives, and return the main verb to base form: "Did she go?", "She did not go." Avoid "Did she went?" because did already carries the past.']
            ],
            examples: ['I visited my cousin last weekend.', 'She did not answer the message.', 'Did you finish the report?', 'We went home because it started to rain.'],
            expressions: [
                ['turn out', 'acabar sendo / acontecer no fim', 'The meeting turned out better than expected.'],
                ['run into', 'encontrar por acaso', 'I ran into an old friend at the mall.'],
                ['end up', 'acabar fazendo algo', 'We ended up eating at home.'],
                ['look back on', 'relembrar', 'When I look back on that day, I laugh.']
            ],
            readingTitle: 'A day that changed the plan',
            reading: 'Last Friday, Marina planned a simple day: work, lunch, and an early night. However, nothing went exactly as expected. First, her bus arrived late, so she missed the morning meeting. Then her manager asked her to explain a report she had not finished. Instead of panicking, Marina told the truth, organized the information quickly, and asked a colleague for help. By the afternoon, the situation had turned around. The team found a better solution, and Marina learned that a bad start does not always mean a bad day. When she looked back on the experience, she realized that clear communication helped more than a perfect plan.',
            music: ['A story about yesterday', 'past actions and consequences']
        },
        pastContinuous: {
            label: 'background and interruptions',
            themeOptions: ['an accident in a public place', 'a strange moment during a trip', 'a problem during a normal workday'],
            objectives: ['describe background actions', 'connect Past Continuous and Past Simple', 'tell interrupted stories clearly'],
            vocab: [
                ['cross', 'atravessar', 'She was crossing the street.'],
                ['notice', 'notar', 'I noticed a strange sound.'],
                ['drop', 'derrubar', 'He dropped his phone.'],
                ['ring', 'tocar', 'The phone rang during dinner.'],
                ['wait', 'esperar', 'We were waiting outside.'],
                ['carry', 'carregar', 'She was carrying two bags.'],
                ['suddenly', 'de repente', 'Suddenly, the lights went out.'],
                ['while', 'enquanto', 'I listened while he explained.']
            ],
            grammar: [
                ['Background action', 'Past Continuous shows an action in progress at a moment in the past: "I was studying at 8 p.m." It creates the scene.'],
                ['Interruption', 'Use Past Simple for the shorter action that interrupts: "I was cooking when the phone rang." The long action is the background; the short action changes it.'],
                ['While vs when', 'Use while before a longer action and when before the interrupting event: "While I was walking, I saw Ana" or "I was walking when I saw Ana."']
            ],
            examples: ['I was reading when the power went out.', 'They were talking while I was taking notes.', 'What were you doing when I called?', 'She was not listening during the explanation.'],
            expressions: [
                ['go off', 'disparar / tocar', 'The alarm went off at midnight.'],
                ['break down', 'parar de funcionar', 'The car broke down while we were driving.'],
                ['find out', 'descobrir', 'I found out what happened later.'],
                ['calm down', 'se acalmar', 'Everyone calmed down after a few minutes.']
            ],
            readingTitle: 'The moment the lights went out',
            reading: 'Daniel was giving a presentation when the lights suddenly went out. At first, everybody stopped talking. Some people were checking their phones, and others were looking toward the window. Daniel was nervous, but he decided to continue. He used his laptop screen, asked the group to move closer, and turned the problem into a more informal discussion. While he was explaining the final point, the electricity came back. Surprisingly, the audience remembered that presentation more than any other because Daniel reacted calmly under pressure.',
            music: ['When everything stopped', 'interrupted actions']
        },
        compare: {
            label: 'comparisons and choices',
            themeOptions: ['choosing a city to live in', 'comparing jobs and routines', 'deciding the best travel option'],
            objectives: ['compare people, places, and choices', 'use superlatives with evidence', 'explain preferences with reasons'],
            vocab: [
                ['crowded', 'lotado', 'The subway is crowded today.'],
                ['convenient', 'conveniente', 'Online classes are convenient.'],
                ['reliable', 'confiável', 'This app is reliable.'],
                ['affordable', 'acessivel', 'The hotel is affordable.'],
                ['quiet', 'tranquilo', 'This neighborhood is quiet.'],
                ['modern', 'moderno', 'The station is modern.'],
                ['safe', 'seguro', 'The area feels safe.'],
                ['efficient', 'eficiente', 'The new system is efficient.']
            ],
            grammar: [
                ['Comparatives', 'Use adjective + -er for many short adjectives and more + adjective for longer ones: cheaper, safer, more reliable. Add than when you compare two things.'],
                ['Superlatives', 'Use the + adjective + -est or the most + adjective when one item stands out in a group: "the safest option", "the most convenient app."'],
                ['Irregular adjectives', 'Good becomes better/the best. Bad becomes worse/the worst. Far becomes farther/further. These forms are common, so practice them in full sentences.']
            ],
            examples: ['This route is faster than the other one.', 'It is the most reliable option.', 'The second hotel is not as comfortable as the first.', 'A smaller city can be more practical.'],
            expressions: [
                ['stand out', 'se destacar', 'The cheaper plan stands out.'],
                ['weigh up', 'comparar antes de decidir', 'We need to weigh up the advantages.'],
                ['come down to', 'depender de / se resumir a', 'It comes down to price and location.'],
                ['go for', 'escolher', 'I would go for the safer option.']
            ],
            readingTitle: 'The best option is not always obvious',
            reading: 'When Rafael compared two job offers, the first one looked better at first. It paid more and had a more impressive title. The second offer was less glamorous, but it was closer to home, more flexible, and connected to the area he wanted to grow in. After weighing up both choices, Rafael realized that the best option was not simply the one with the highest salary. For him, time, energy, and long-term learning were more important than a bigger number on paper.',
            music: ['Better than before', 'comparisons and decisions']
        },
        quantity: {
            label: 'articles and quantity',
            themeOptions: ['planning food for a meeting', 'shopping for a small trip', 'organizing things at home'],
            objectives: ['choose a/an/the correctly', 'use some, any, much, many, a few, and a little', 'talk about countable and uncountable nouns'],
            vocab: [
                ['receipt', 'recibo', 'Keep the receipt.'],
                ['ingredient', 'ingrediente', 'We need a few ingredients.'],
                ['advice', 'conselho', 'She gave me useful advice.'],
                ['information', 'informação', 'I need some information.'],
                ['bottle', 'garrafa', 'Buy a bottle of water.'],
                ['slice', 'fatia', 'Would you like a slice of cake?'],
                ['enough', 'suficiente', 'We have enough time.'],
                ['several', 'vários', 'Several people arrived late.']
            ],
            grammar: [
                ['Articles', 'Use a/an when something is one of many or mentioned for the first time. Use the when both people know which thing you mean: "I saw a café. The café was full."'],
                ['Countable vs uncountable', 'Countable nouns can be plural: apples, chairs, ideas. Uncountable nouns usually do not take plural -s: information, advice, furniture, money.'],
                ['Quantity words', 'Use many/few with countable nouns and much/little with uncountable nouns. Some and any can work with both, depending on sentence type and meaning.']
            ],
            examples: ['I need some advice.', 'Do we have any eggs?', 'There are a few chairs outside.', 'There is not much information on the website.'],
            expressions: [
                ['run out of', 'ficar sem', 'We ran out of coffee.'],
                ['stock up on', 'comprar bastante', 'We need to stock up on snacks.'],
                ['cut down on', 'reduzir', 'I am trying to cut down on sugar.'],
                ['make do with', 'se virar com', 'We can make do with what we have.']
            ],
            readingTitle: 'Preparing without overbuying',
            reading: 'Before the workshop, Julia had to buy snacks and materials for twenty people. She did not want to run out of anything, but she also did not want to waste money. She made a list with countable items, such as notebooks, pens, and sandwiches, and uncountable items, such as coffee, juice, and information for the handout. In the end, she bought enough for everyone and kept a little extra for unexpected guests. The event showed her that good planning is not about buying a lot; it is about buying the right amount.',
            music: ['Enough for today', 'quantity and needs']
        },
        future: {
            label: 'future plans and predictions',
            themeOptions: ['planning the next month', 'making predictions about work', 'organizing a trip with friends'],
            objectives: ['use going to for plans', 'use will for decisions and predictions', 'use present continuous for arrangements'],
            vocab: [
                ['schedule', 'agenda', 'Check your schedule.'],
                ['arrangement', 'combinado', 'We have an arrangement for Friday.'],
                ['probably', 'provavelmente', 'It will probably rain.'],
                ['deadline', 'prazo', 'The deadline is tomorrow.'],
                ['book', 'reservar', 'I am going to book a room.'],
                ['confirm', 'confirmar', 'Please confirm the time.'],
                ['postpone', 'adiar', 'They postponed the meeting.'],
                ['expect', 'esperar / achar provável', 'I expect good results.']
            ],
            grammar: [
                ['Going to', 'Use going to when you already have a plan or evidence: "I am going to call her after class" or "Look at the clouds. It is going to rain."'],
                ['Will', 'Use will for quick decisions, promises, offers, and predictions based on opinion: "I will help you" or "I think it will be difficult."'],
                ['Present Continuous for future', 'Use present continuous for fixed arrangements with time/place: "I am meeting Pedro at 7." It sounds more concrete than a general plan.']
            ],
            examples: ['I am going to study tonight.', 'I will send the file later.', 'We are meeting at the station.', 'Are you going to travel next month?'],
            expressions: [
                ['set up', 'organizar / marcar', 'We set up a meeting for Monday.'],
                ['put off', 'adiar', 'Do not put off the decision.'],
                ['work out', 'dar certo / resolver', 'I hope the plan works out.'],
                ['count on', 'contar com', 'You can count on me tomorrow.']
            ],
            readingTitle: 'Planning with flexibility',
            reading: 'Bianca is going to start a new course next month, so she is organizing her schedule carefully. She is meeting her manager on Friday to discuss working hours, and she will probably study three evenings a week. However, she knows that plans can change. If the workload becomes too heavy, she will adjust the routine instead of giving up. Her goal is not to control every detail of the future, but to create a plan that is strong enough to guide her and flexible enough to survive real life.',
            music: ['Tomorrow is open', 'future plans and promises']
        },
        modals: {
            label: 'rules, permission, and obligation',
            themeOptions: ['asking for permission at work', 'understanding rules in a course', 'solving a problem politely'],
            objectives: ['ask for permission politely', 'explain rules and obligations', 'distinguish must, have to, and need to'],
            vocab: [
                ['permission', 'permissão', 'Ask for permission first.'],
                ['rule', 'regra', 'This rule is important.'],
                ['requirement', 'exigência', 'It is a requirement.'],
                ['optional', 'opcional', 'The last task is optional.'],
                ['allowed', 'permitido', 'Phones are not allowed.'],
                ['forbidden', 'proibido', 'Smoking is forbidden here.'],
                ['request', 'pedido', 'Can I make a request?'],
                ['policy', 'política / regra interna', 'Read the company policy.']
            ],
            grammar: [
                ['Can and could', 'Can is direct and common. Could is softer and more polite. "Could I leave early?" sounds more careful than "Can I leave early?"'],
                ['Must vs have to', 'Must often feels like a strong rule or speaker authority. Have to often comes from an external rule: "I have to show my ID."'],
                ['Need to and do not have to', 'Need to means something is necessary. Do not have to means it is not necessary, not that it is forbidden.']
            ],
            examples: ['Can I use your charger?', 'You must wear an ID badge.', 'We have to arrive before nine.', 'You do not have to print the document.'],
            expressions: [
                ['sign up for', 'se inscrever em', 'You have to sign up for the workshop.'],
                ['fill out', 'preencher', 'Please fill out this form.'],
                ['hand in', 'entregar', 'You must hand in the task today.'],
                ['check in', 'fazer entrada / registrar chegada', 'Visitors need to check in at reception.']
            ],
            readingTitle: 'A rule that makes sense',
            reading: 'At first, Leo thought the new office policy was unnecessary. Everyone had to book meeting rooms in advance, and visitors had to check in before entering the workspace. After a few weeks, however, he understood the reason. Meetings became easier to organize, guests received help faster, and confidential conversations were better protected. Leo still believed that rules should be simple, but he also learned that a clear rule can reduce confusion when people understand why it exists.',
            music: ['Can I ask you something?', 'permission and rules']
        },
        advice: {
            label: 'advice and recommendations',
            themeOptions: ['helping a tired friend', 'giving study advice', 'responding to a personal problem'],
            objectives: ['give advice with should', 'soften recommendations', 'explain reasons and consequences'],
            vocab: [
                ['rest', 'descansar', 'You should rest.'],
                ['avoid', 'evitar', 'Avoid too much caffeine.'],
                ['improve', 'melhorar', 'Practice improves confidence.'],
                ['habit', 'hábito', 'Build a healthy habit.'],
                ['balanced', 'equilibrado', 'Keep a balanced routine.'],
                ['pressure', 'pressão', 'She is under pressure.'],
                ['support', 'apoio / apoiar', 'Ask for support.'],
                ['overwhelmed', 'sobrecarregado', 'I feel overwhelmed.']
            ],
            grammar: [
                ['Should', 'Use should for advice, expectations, and opinions: "You should talk to her." It is not as strong as must.'],
                ['Softening advice', 'Use maybe, I think, or if I were you to sound supportive: "Maybe you should take a break."'],
                ['Negative advice', 'Use should not before the base verb: "You should not ignore the problem." Avoid "should not to ignore."']
            ],
            examples: ['You should drink more water.', 'Maybe you should talk to your teacher.', 'You should not study all night.', 'If I were you, I would write a plan.'],
            expressions: [
                ['slow down', 'ir mais devagar', 'You should slow down this week.'],
                ['open up', 'se abrir', 'It helps to open up to someone.'],
                ['deal with', 'lidar com', 'She is dealing with stress.'],
                ['keep up with', 'acompanhar / manter ritmo', 'Do not try to keep up with everyone.']
            ],
            readingTitle: 'Advice that actually helps',
            reading: 'When Paula felt overwhelmed, many people gave her quick advice: sleep more, work less, be positive. The problem was that none of it felt practical. Her friend Lucas listened first. Then he suggested one small change: choose the three most important tasks each morning and postpone the rest. Paula tried it for a week. She still had responsibilities, but she felt more in control. She learned that good advice is not always dramatic; sometimes it is a small action that a person can really do.',
            music: ['Take a breath', 'advice and self-care']
        },
        perfect: {
            label: 'life experiences and recent results',
            themeOptions: ['travel experiences', 'professional achievements', 'new things you have tried'],
            objectives: ['talk about experiences without exact time', 'use ever, never, already, and yet', 'contrast experience and finished time'],
            vocab: [
                ['experience', 'experiência', 'It was a great experience.'],
                ['achievement', 'conquista', 'That was an important achievement.'],
                ['recently', 'recentemente', 'I have recently changed jobs.'],
                ['already', 'já', 'I have already finished.'],
                ['yet', 'ainda / já em perguntas', 'Have you finished yet?'],
                ['abroad', 'no exterior', 'She has lived abroad.'],
                ['improve', 'melhorar', 'I have improved a lot.'],
                ['challenge', 'desafio', 'This has been a challenge.']
            ],
            grammar: [
                ['Present Perfect for experience', 'Use have/has + past participle to talk about life experience when the exact time is not the focus: "I have visited Chile."'],
                ['Ever, never, already, yet', 'Ever appears often in questions. Never means no experience until now. Already suggests something happened sooner than expected. Yet is common in questions and negatives.'],
                ['Present Perfect vs Past Simple', 'Use Past Simple when you say when: "I visited Chile in 2022." Use Present Perfect when the experience matters now: "I have visited Chile."']
            ],
            examples: ['Have you ever worked in sales?', 'She has never tried Japanese food.', 'I have already sent the email.', 'We have not decided yet.'],
            expressions: [
                ['try out', 'experimentar / testar', 'I have tried out a new app.'],
                ['catch up on', 'colocar em dia', 'I need to catch up on the lessons.'],
                ['come across', 'encontrar por acaso', 'I came across an interesting article.'],
                ['go through', 'passar por', 'She has gone through many changes.']
            ],
            readingTitle: 'More than a list of experiences',
            reading: 'When people talk about experiences, they often mention impressive things: countries they have visited, courses they have completed, or projects they have led. But experience is more than a list. It includes mistakes, small improvements, and moments that changed how a person thinks. Marcos has never lived abroad, but he has worked with international clients, studied with foreign teachers, and learned how to communicate across cultures. He has discovered that experience is not only where you have been; it is also what you have learned from what you have done.',
            music: ['I have been there', 'experiences and growth']
        },
        health: {
            label: 'health and medical conversations',
            themeOptions: ['describing symptoms to a doctor', 'giving health advice', 'explaining a recent health problem'],
            objectives: ['describe symptoms clearly', 'ask and answer medical questions', 'combine advice with present perfect when needed'],
            vocab: [
                ['symptom', 'sintoma', 'What symptoms do you have?'],
                ['headache', 'dor de cabeça', 'I have a headache.'],
                ['sore throat', 'dor de garganta', 'She has a sore throat.'],
                ['appointment', 'consulta / compromisso', 'I booked an appointment.'],
                ['prescription', 'receita médica', 'The doctor gave me a prescription.'],
                ['recover', 'se recuperar', 'He recovered quickly.'],
                ['dizzy', 'tonto', 'I feel dizzy.'],
                ['treatment', 'tratamento', 'The treatment helped.']
            ],
            grammar: [
                ['Have for symptoms', 'Use have with many symptoms: have a headache, have a fever, have a sore throat. Use feel with adjectives: feel dizzy, feel tired.'],
                ['Present Perfect with since/for', 'Use has/have had to say how long a symptom continues: "I have had a cough for three days."'],
                ['Advice in health contexts', 'Should is useful for advice, but must/have to can sound stronger when something is necessary: "You should rest" vs "You have to see a doctor."']
            ],
            examples: ['I have had a headache since Monday.', 'You should drink more water.', 'Have you taken any medicine yet?', 'She needs to book an appointment.'],
            expressions: [
                ['come down with', 'ficar doente com', 'I came down with a cold.'],
                ['get over', 'se recuperar de', 'She got over the flu.'],
                ['check up on', 'verificar como alguém está', 'I called to check up on him.'],
                ['cut back on', 'reduzir', 'You should cut back on coffee.']
            ],
            readingTitle: 'Explaining the problem clearly',
            reading: 'During a medical appointment, clear language matters. A patient who says "I feel bad" gives very little information. A patient who says "I have had a sore throat for four days, and I feel dizzy in the morning" gives the doctor a much better picture. Clara learned this after a confusing appointment. The next time, she wrote down her symptoms, when they started, and what made them better or worse. The conversation was faster, calmer, and more useful for both her and the doctor.',
            music: ['Feeling better slowly', 'symptoms and recovery']
        },
        prepositions: {
            label: 'place, movement, and time',
            themeOptions: ['explaining a route in the city', 'describing where things are', 'talking about schedules and dates'],
            objectives: ['use prepositions of place', 'describe movement clearly', 'use at, on, and in for time'],
            vocab: [
                ['across from', 'em frente a', 'The bank is across from the park.'],
                ['next to', 'ao lado de', 'The café is next to the station.'],
                ['through', 'através de', 'Walk through the park.'],
                ['toward', 'em direção a', 'Go toward the bridge.'],
                ['between', 'entre', 'It is between the pharmacy and the bank.'],
                ['around', 'ao redor / por volta', 'Walk around the building.'],
                ['entrance', 'entrada', 'Meet me at the entrance.'],
                ['corner', 'esquina', 'Turn at the corner.']
            ],
            grammar: [
                ['Place', 'Use in for enclosed spaces, on for surfaces/streets, and at for specific points: in the room, on Main Street, at the entrance.'],
                ['Movement', 'Use to, into, out of, through, across, and past to show direction. "Go to the bank" is destination; "go past the bank" means continue after it.'],
                ['Time', 'Use at for clock times, on for days/dates, and in for months, years, and longer periods: at 8, on Monday, in July.']
            ],
            examples: ['The hotel is next to the pharmacy.', 'Walk through the park and turn left.', 'My appointment is at nine on Friday.', 'The keys are in the drawer.'],
            expressions: [
                ['head to', 'ir para', 'We are heading to the station.'],
                ['drop by', 'passar rapidamente', 'Drop by my office later.'],
                ['show up', 'aparecer / chegar', 'He showed up late.'],
                ['move in', 'se mudar para', 'They moved in last month.']
            ],
            readingTitle: 'Finding your way without panic',
            reading: 'Getting lost in a new city can be stressful, especially when you are trying to understand directions in another language. Nina discovered that the key was not memorizing every street name. Instead, she listened for landmarks and prepositions: next to the museum, across from the bank, through the park, toward the station. Once she started focusing on relationships between places, the city became easier to understand. Directions became a map of connections, not a list of random words.',
            music: ['On the road again', 'movement and direction']
        },
        directions: {
            label: 'directions and practical instructions',
            themeOptions: ['helping a tourist downtown', 'giving instructions by phone', 'finding a place in a large building'],
            objectives: ['give step-by-step directions', 'ask for clarification politely', 'use landmarks and sequence words'],
            vocab: [
                ['landmark', 'ponto de referência', 'Use the museum as a landmark.'],
                ['intersection', 'cruzamento', 'Turn right at the intersection.'],
                ['block', 'quarteirão', 'Walk two blocks.'],
                ['entrance', 'entrada', 'The entrance is on the left.'],
                ['exit', 'saída', 'Use the main exit.'],
                ['straight ahead', 'em frente', 'Go straight ahead.'],
                ['nearby', 'perto', 'There is a pharmacy nearby.'],
                ['route', 'rota', 'This route is faster.']
            ],
            grammar: [
                ['Imperatives', 'Use the base verb for instructions: turn left, go straight, cross the street. It is direct and normal for directions.'],
                ['Sequencing', 'Use first, then, after that, and finally to make directions easier to follow.'],
                ['Polite clarification', 'Use "Could you repeat that?" or "Do I turn before or after the bank?" when directions are not clear.']
            ],
            examples: ['Go straight for two blocks.', 'Turn left after the supermarket.', 'Could you repeat the last part?', 'The entrance is across from the parking lot.'],
            expressions: [
                ['get around', 'se locomover', 'It is easy to get around here.'],
                ['pull over', 'encostar o carro', 'Pull over after the bridge.'],
                ['come up to', 'chegar até', 'Come up to the main gate.'],
                ['go past', 'passar por', 'Go past the school and turn right.']
            ],
            readingTitle: 'Directions that people can actually follow',
            reading: 'Good directions are not just accurate; they are easy to follow. When Andre gave directions to his cousin, he first gave too many details: street names, store names, traffic lights, and distances. His cousin got confused. Then Andre simplified the route: "Go straight for two blocks, turn right after the supermarket, and the building is across from the pharmacy." This version worked because it used clear steps and visible landmarks. In real life, simple directions often beat perfect directions.',
            music: ['Find the way', 'directions and landmarks']
        },
        hotel: {
            label: 'hotel and travel problems',
            themeOptions: ['checking in at a hotel', 'reporting a problem with the room', 'asking politely for help while traveling'],
            objectives: ['handle hotel check-in', 'make polite requests', 'explain travel problems clearly'],
            vocab: [
                ['reservation', 'reserva', 'I have a reservation.'],
                ['reception', 'recepção', 'Ask at reception.'],
                ['check-in', 'entrada', 'Check-in starts at two.'],
                ['check-out', 'saída', 'Check-out is at noon.'],
                ['towel', 'toalha', 'Could I have another towel?'],
                ['shower', 'chuveiro', 'The shower is not working.'],
                ['key card', 'cartão-chave', 'My key card does not work.'],
                ['available', 'disponível', 'Is breakfast available?']
            ],
            grammar: [
                ['Polite requests', 'Use "Could I have..." and "Could you..." when asking for help in hotels. These forms sound respectful and natural.'],
                ['Problems in progress', 'Use present continuous or simple present for current problems: "The air conditioner is not working" or "The key card does not work."'],
                ['Under my name', 'For reservations, say "under my name": "I have a reservation under Mariana Silva."']
            ],
            examples: ['I have a reservation under my name.', 'Could I have another towel?', 'The shower is not working.', 'Is breakfast included?'],
            expressions: [
                ['check in', 'fazer entrada', 'We checked in at 3 p.m.'],
                ['check out', 'fazer saída', 'They checked out early.'],
                ['sort out', 'resolver', 'Reception sorted out the problem.'],
                ['make up for', 'compensar', 'They offered breakfast to make up for the mistake.']
            ],
            readingTitle: 'A calm complaint',
            reading: 'When Sofia arrived at the hotel, her room was not ready. She was tired and frustrated, but she decided to explain the problem calmly. She said, "I have a reservation under Sofia Almeida, and check-in was confirmed for 2 p.m. Could you check if another room is available?" The receptionist apologized, sorted out the issue, and offered a free breakfast. Sofia learned that a calm complaint is often more effective than an angry one because it focuses on the solution.',
            music: ['Room for one more night', 'travel and requests']
        },
        verbPatterns: {
            label: 'gerunds and infinitives',
            themeOptions: ['talking about study habits', 'explaining personal goals', 'describing likes and decisions'],
            objectives: ['use gerunds after certain verbs', 'use infinitives after common verbs', 'avoid translating word by word from Portuguese'],
            vocab: [
                ['decide', 'decidir', 'I decided to study more.'],
                ['avoid', 'evitar', 'Avoid studying when exhausted.'],
                ['enjoy', 'gostar de / curtir', 'I enjoy learning new words.'],
                ['promise', 'prometer', 'She promised to call.'],
                ['practice', 'praticar', 'Practice speaking every day.'],
                ['plan', 'planejar', 'We plan to travel.'],
                ['mind', 'se importar', 'Do you mind waiting?'],
                ['hope', 'esperar / ter esperanca', 'I hope to improve.']
            ],
            grammar: [
                ['Gerunds', 'Some verbs are followed by -ing: enjoy learning, avoid wasting time, mind waiting. The -ing form behaves like a noun.'],
                ['Infinitives', 'Some verbs are followed by to + verb: decide to study, hope to improve, plan to travel.'],
                ['Meaning changes', 'Some verbs can take both forms with a change in meaning, but at this level it is more useful to memorize common patterns in chunks.']
            ],
            examples: ['I enjoy studying in the morning.', 'She decided to change jobs.', 'Do you mind waiting a minute?', 'We hope to get an answer soon.'],
            expressions: [
                ['keep on', 'continuar', 'Keep on practicing.'],
                ['give up', 'desistir', 'Do not give up learning.'],
                ['look forward to', 'esperar ansiosamente', 'I look forward to seeing you.'],
                ['get used to', 'se acostumar com', 'I am getting used to speaking more.']
            ],
            readingTitle: 'Learning how to keep going',
            reading: 'Many students start studying with energy, but they stop when progress becomes slower. A better strategy is to enjoy the process, not only the result. Felipe decided to practice for twenty minutes every morning. He avoided studying late at night because he was too tired. He looked forward to small wins: understanding a song, writing a better message, or speaking with less hesitation. After a few months, he realized that consistency was more powerful than motivation.',
            music: ['Keep on learning', 'habits and persistence']
        },
        conditionals: {
            label: 'conditions and real-life hopes',
            themeOptions: ['making plans with conditions', 'talking about habits and results', 'expressing hopes and wishes'],
            objectives: ['use zero conditional for facts and habits', 'use first conditional for real possibilities', 'use unless and wish carefully'],
            vocab: [
                ['unless', 'a menos que', 'We will be late unless we leave now.'],
                ['condition', 'condição', 'There is one condition.'],
                ['result', 'resultado', 'The result depends on practice.'],
                ['habit', 'hábito', 'If I sleep well, I focus better.'],
                ['possibility', 'possibilidade', 'There is a real possibility.'],
                ['improve', 'melhorar', 'You will improve if you practice.'],
                ['wish', 'desejar', 'I wish I had more time.'],
                ['realistic', 'realista', 'Make a realistic plan.']
            ],
            grammar: [
                ['Zero conditional', 'Use if + present, present for facts, rules, and habits: "If I sleep badly, I feel tired."'],
                ['First conditional', 'Use if + present, will + verb for real future possibilities: "If it rains, I will stay home."'],
                ['Unless', 'Unless means if not. "Unless we leave now" means "if we do not leave now." Do not use not after unless in the same clause.']
            ],
            examples: ['If you practice daily, you will improve.', 'Unless we hurry, we will miss the bus.', 'If water freezes, it becomes ice.', 'I wish I had more free time.'],
            expressions: [
                ['depend on', 'depender de', 'Success depends on practice.'],
                ['figure out', 'descobrir / entender', 'We will figure out a solution.'],
                ['stick to', 'manter-se fiel a', 'Stick to your plan.'],
                ['miss out on', 'perder oportunidade', 'Do not miss out on the chance.']
            ],
            readingTitle: 'A realistic plan for change',
            reading: 'Change often fails when the plan is too dramatic. Laura wanted to improve her English, but she knew that studying two hours every day was not realistic. She made a conditional plan instead: if she had a busy day, she would review vocabulary for ten minutes; if she had more time, she would write a paragraph and prepare two spoken answers for her next class. Unless she was sick, she would do at least one small task. This flexible plan helped her continue even when life was unpredictable.',
            music: ['If tomorrow comes', 'conditions and hopes']
        },
        reviewPast: null,
        reviewModals: null,
        reviewPractical: null,
        finalProject: null
    };

    banks.reviewPast = Object.assign({}, banks.past, {
        label: 'past review checkpoint',
        music: ['Yesterday in rhythm', 'past review']
    });
    banks.reviewModals = Object.assign({}, banks.modals, {
        label: 'modals review checkpoint',
        music: ['Rules and choices', 'modals review']
    });
    banks.reviewPractical = Object.assign({}, banks.prepositions, {
        label: 'practical English review',
        music: ['Around the city', 'practical review']
    });
    banks.finalProject = Object.assign({}, banks.conditionals, {
        label: 'final review and project',
        objectives: ['connect the main A2 V3 structures', 'prepare a short personal project', 'speak with clearer reasons and examples'],
        music: ['One step further', 'final reflection']
    });

    const lessonProfiles = [
        {
            themes: ['telling a weekend story', 'explaining a mistake at work', 'describing a finished personal project'],
            objectives: ['ask detailed questions about past events', 'use past forms without mixing did and changed verbs', 'organize an account with precise time and sequence markers'],
            vocab: [['oversleep', 'acordar tarde', 'I overslept and missed the bus.'], ['realize', 'perceber', 'I realized the file was missing.'], ['manage to', 'conseguir', 'We managed to finish on time.'], ['apologize', 'pedir desculpas', 'She apologized for the delay.'], ['borrow', 'pegar emprestado', 'I borrowed my brother\'s charger.'], ['return', 'devolver / voltar', 'They returned home late.'], ['forget', 'esquecer', 'He forgot the password.'], ['solve', 'resolver', 'We solved the problem quickly.']],
            grammar: [['Detailed questions', 'Use a question word + did + subject + base verb: Why did you leave? What did she forget? With be, use was/were and no did: Where were you?'], ['One past marker', 'In affirmatives, change the main verb: She forgot. In questions and negatives, did carries the past: Did she forget? She did not forget.'], ['Precise sequence', 'Use first, then, after that, before, later, and in the end to show order. Add because or so to connect reason and result.']],
            examples: ['Why did you oversleep on Monday?', 'Where were you when you realized the folder was missing?', 'First, I called my manager; then I sent the file.', 'We managed to solve the problem before the meeting.'],
            expressions: [['turn out', 'acabar sendo', 'The problem turned out to be simple.'], ['run into', 'encontrar por acaso', 'I ran into my old teacher.'], ['end up', 'acabar fazendo', 'We ended up taking a taxi.'], ['look back on', 'relembrar', 'I look back on that day and laugh.']],
            readingTitle: 'The morning everything went wrong',
            reading: 'Rafa planned a normal Monday, but the morning quickly became complicated. He overslept, missed the bus, and realized that he had left an important folder at home. Instead of inventing an excuse, he called his manager and explained what happened. Later, he managed to send the file from his phone and arrived before the client meeting. The day was not perfect, but he learned that honesty and quick decisions can save a difficult situation.',
            music: ['Yesterday did not win', 'past mistakes and recovery']
        },
        {
            themes: ['telling a travel story in order', 'describing a memorable celebration', 'reporting a problem that was solved'],
            objectives: ['connect past events into a longer story', 'use sequence markers naturally', 'add reasons and consequences'],
            vocab: [['check in', 'fazer check-in', 'We checked in at the hotel.'], ['get lost', 'se perder', 'They got lost downtown.'], ['notice', 'notar', 'I noticed a small café.'], ['decide', 'decidir', 'We decided to stay longer.'], ['book', 'reservar', 'She booked a room online.'], ['delay', 'atraso', 'The delay changed our plan.'], ['explore', 'explorar', 'We explored the old town.'], ['remember', 'lembrar', 'I remembered the address later.']],
            grammar: [['Narrative order', 'A complete past story needs order. Use sequence markers to show what happened first, next, and finally.'], ['Past reasons', 'Use because, so, and but to explain why events changed: The train was late, so we took a taxi.'], ['Past questions in stories', 'Use What happened?, Where did you go?, and How did you solve it? to keep the conversation moving.']],
            examples: ['First, we checked in at the hotel.', 'Then we got lost near the station.', 'We decided to explore the area on foot.', 'Finally, we found a restaurant by the river.'],
            expressions: [['set off', 'sair / partir', 'We set off early in the morning.'], ['come across', 'encontrar por acaso', 'We came across a quiet square.'], ['sort out', 'resolver', 'The receptionist sorted out the problem.'], ['head back', 'voltar', 'We headed back after dinner.']],
            readingTitle: 'A trip that became a story',
            reading: 'The trip started with a delay, but it became one of Camila\'s favorite memories. First, the train arrived forty minutes late. Then she and her friend got lost because the map on the phone stopped working. While they were looking for the hotel, they came across a small local market. They tried new food, talked to a vendor, and finally found the right street. The problem did not ruin the trip; it gave them a better story to tell.',
            music: ['First then finally', 'complete past stories']
        },
        {
            themes: ['comparing two cities', 'choosing between two courses', 'comparing online and in-person work'],
            objectives: ['compare differences with degree modifiers', 'express equality and inequality with as...as', 'weigh up options using more, less, and reasons'],
            vocab: [['much more convenient', 'muito mais conveniente', 'The subway is much more convenient.'], ['a little cheaper', 'um pouco mais barato', 'The morning ticket is a little cheaper.'], ['not as crowded as', 'não tão lotado quanto', 'This café is not as crowded as the other one.'], ['just as useful as', 'tão útil quanto', 'The free version is just as useful as the paid one.'], ['far more reliable', 'muito mais confiável', 'This app is far more reliable.'], ['slightly closer', 'um pouco mais perto', 'The new office is slightly closer.'], ['less stressful', 'menos estressante', 'The local route is less stressful.'], ['busier', 'mais movimentado', 'The center is busier after six.']],
            grammar: [['Degree modifiers', 'Use much, far, or a lot before a comparative for a big difference. Use a little or slightly for a small difference: much faster, slightly cheaper.'], ['Equality', 'Use as + adjective + as for equal qualities: The bus is as comfortable as the train. Use not as...as when the first option has less of that quality.'], ['Less and comparison', 'Use less + adjective + than to compare a lower degree: This route is less stressful than the highway. Add a reason to make the choice clear.']],
            examples: ['The subway is much more convenient than the bus.', 'The weekday plan is a little cheaper than the weekend plan.', 'The afternoon class is not as crowded as the evening class.', 'Online support is just as useful as in-person support.'],
            expressions: [['weigh up', 'avaliar opções', 'We need to weigh up both plans.'], ['have an advantage over', 'ter uma vantagem sobre', 'The train has an advantage over the bus.'], ['be worth it', 'valer a pena', 'The extra cost is worth it.'], ['come down to', 'se resumir a', 'It comes down to time and money.']],
            readingTitle: 'Choosing the more practical option',
            reading: 'When Rafael compared two English courses, the cheaper option was not automatically the best. The first course was cheaper and closer to home, but the second was more flexible and offered more speaking practice. Rafael made a table with price, schedule, teacher support, and travel time. After comparing everything, he chose the second course because it was more useful for his routine. The decision came down to value, not only cost.',
            music: ['More than one choice', 'comparatives']
        },
        {
            themes: ['describing the best place in town', 'choosing the most useful app', 'talking about the worst travel problem'],
            objectives: ['use superlatives correctly', 'handle best/worst and irregular adjectives', 'support opinions with examples'],
            vocab: [['the best', 'o melhor', 'This is the best option.'], ['the worst', 'o pior', 'That was the worst delay.'], ['the farthest', 'o mais distante', 'It is the farthest station.'], ['the most useful', 'o mais útil', 'This is the most useful feature.'], ['the least expensive', 'o menos caro', 'It is the least expensive plan.'], ['the busiest', 'o mais movimentado', 'Friday is the busiest day.'], ['the easiest', 'o mais fácil', 'This is the easiest route.'], ['the most comfortable', 'o mais confortável', 'It was the most comfortable seat.']],
            grammar: [['The + superlative', 'Use the before superlatives because you are identifying one item in a group: the best hotel, the most useful app.'], ['Irregular forms', 'Good -> better -> the best. Bad -> worse -> the worst. Far -> farther/further -> the farthest/furthest.'], ['Superlative with context', 'Always make the group clear: the best restaurant in this neighborhood, the most useful app for studying.']],
            examples: ['This is the most useful app for vocabulary.', 'Monday morning is the worst time to drive downtown.', 'That was the easiest explanation in the course.', 'What is the best restaurant near your house?'],
            expressions: [['rank as', 'classificar como', 'It ranks as the best choice.'], ['stand above', 'ficar acima', 'This option stands above the rest.'], ['beat the others', 'superar os outros', 'The location beats the others.'], ['at its best', 'no seu melhor', 'The city is at its best in spring.']],
            readingTitle: 'The best is not always the biggest',
            reading: 'A group of students had to choose the best place for a class meeting. The largest café had more tables, but it was also the noisiest. The cheapest place was too far from the subway. The smallest café was the quietest and had the most comfortable chairs. In the end, the group chose it because the best place was the one that helped them talk, listen, and study, not the one that looked most impressive.',
            music: ['The best part', 'superlatives']
        },
        {
            themes: ['planning food for a meeting', 'shopping for a trip', 'organizing supplies at home'],
            objectives: ['use articles with new and known information', 'separate countable and uncountable nouns', 'choose quantifiers correctly'],
            vocab: [['a receipt', 'um recibo', 'Keep the receipt.'], ['some advice', 'alguns conselhos', 'I need some advice.'], ['a few chairs', 'algumas cadeiras', 'We need a few chairs.'], ['a little time', 'um pouco de tempo', 'We have a little time.'], ['much information', 'muita informação', 'There is not much information.'], ['many people', 'muitas pessoas', 'Many people arrived early.'], ['enough water', 'água suficiente', 'We have enough water.'], ['several options', 'várias opções', 'There are several options.']],
            grammar: [['A/an/the', 'Use a/an for one item mentioned for the first time. Use the when both speakers know which item you mean.'], ['Countable nouns', 'Use many, a few, several, and numbers with countable nouns: many chairs, a few questions.'], ['Uncountable nouns', 'Use much, a little, some, and enough with uncountable nouns: much information, a little time.']],
            examples: ['I need some information about the event.', 'There are a few chairs in the next room.', 'We do not have much time before lunch.', 'Could you buy a bottle of water?'],
            expressions: [['run out of', 'ficar sem', 'We ran out of coffee.'], ['stock up on', 'comprar bastante', 'We stocked up on snacks.'], ['cut down on', 'reduzir', 'I want to cut down on sugar.'], ['make do with', 'se virar com', 'We can make do with two tables.']],
            readingTitle: 'Buying the right amount',
            reading: 'Before a small workshop, Nina had to buy food and supplies. She counted the chairs, checked how much coffee was left, and asked if anyone had food restrictions. She bought a few extra notebooks, some fruit, and enough water for the group. She did not buy too much because the budget was limited. The event went well because she understood the difference between buying a lot and buying the right amount.',
            music: ['Enough for everyone', 'articles and quantifiers']
        },
        {
            themes: ['describing a scene before an event', 'explaining what people were doing in a photo', 'telling what was happening during a problem'],
            objectives: ['use was/were + -ing for background', 'describe simultaneous actions', 'set the scene before the main event'],
            vocab: [['crossing', 'atravessando', 'She was crossing the street.'], ['waiting', 'esperando', 'We were waiting outside.'], ['carrying', 'carregando', 'He was carrying two bags.'], ['raining', 'chovendo', 'It was raining hard.'], ['standing', 'em pé', 'They were standing near the door.'], ['watching', 'assistindo / observando', 'I was watching the news.'], ['listening', 'ouvindo', 'She was listening carefully.'], ['background', 'contexto/cenário', 'The background explains the story.']],
            grammar: [['Past Continuous form', 'Use was/were + verb-ing: I was studying, they were waiting.'], ['Scene setting', 'Past Continuous describes what was in progress before something important happened.'], ['Two actions in progress', 'Use while to connect two longer actions: I was cooking while she was studying.']],
            examples: ['I was waiting outside the bank.', 'They were talking near the entrance.', 'It was raining when we arrived.', 'What were you doing at nine?'],
            expressions: [['hang around', 'ficar por perto', 'We were hanging around the lobby.'], ['look around', 'olhar ao redor', 'She was looking around the store.'], ['sit around', 'ficar sentado sem fazer muito', 'They were sitting around before class.'], ['walk by', 'passar andando', 'A man was walking by the window.']],
            readingTitle: 'Before the announcement',
            reading: 'Before the announcement, everyone in the office was doing something different. Paula was answering emails, Bruno was checking a spreadsheet, and two interns were carrying boxes to the meeting room. It was raining outside, so people were arriving slowly. When the manager walked in, the room became quiet. The background helped everyone understand why the announcement felt sudden and important.',
            music: ['While the world was moving', 'setting the scene']
        },
        {
            themes: ['a phone call that interrupted dinner', 'a problem during a presentation', 'an accident on the way to class'],
            objectives: ['combine Past Continuous and Past Simple', 'use when and while accurately', 'tell interrupted stories with clarity'],
            vocab: [['interrupt', 'interromper', 'The call interrupted dinner.'], ['fall', 'cair', 'The books fell on the floor.'], ['crash', 'bater / travar', 'The computer crashed.'], ['spill', 'derramar', 'He spilled coffee on the table.'], ['knock', 'bater na porta', 'Someone knocked on the door.'], ['ring', 'tocar', 'My phone rang twice.'], ['suddenly', 'de repente', 'Suddenly, the lights went out.'], ['while', 'enquanto', 'I was reading while she was cooking.']],
            grammar: [['Long and short actions', 'Use Past Continuous for the action in progress and Past Simple for the interruption.'], ['When', 'When often introduces the shorter event: I was driving when the tire exploded.'], ['While', 'While often introduces the longer background action: While I was driving, the tire exploded.']],
            examples: ['I was presenting when the computer crashed.', 'She was cooking while I was setting the table.', 'What were you doing when the alarm rang?', 'They were walking home when it started to rain.'],
            expressions: [['go off', 'disparar/tocar', 'The alarm went off during the meeting.'], ['break down', 'parar de funcionar', 'The elevator broke down.'], ['calm down', 'se acalmar', 'Everyone calmed down after a minute.'], ['find out', 'descobrir', 'We found out what caused the problem.']],
            readingTitle: 'The interruption that changed the meeting',
            reading: 'Marta was presenting the final numbers when the projector stopped working. At first, she froze. People were waiting, and her manager was looking at the screen. Then Marta took a breath, opened the report on her laptop, and continued without the slides. While she was explaining the last chart, the projector came back. The interruption made the meeting less perfect, but it also showed that Marta could stay calm under pressure.',
            music: ['When the lights went out', 'interrupted stories']
        },
        {
            themes: ['reviewing a weekend story', 'comparing two memories', 'telling a story with a song theme'],
            objectives: ['review past forms from lessons 1-7', 'mix sequence and interruption language', 'speak longer without losing order'],
            vocab: [['memory', 'memória', 'That memory is important to me.'], ['unexpected', 'inesperado', 'It was an unexpected moment.'], ['fortunately', 'felizmente', 'Fortunately, nobody was hurt.'], ['unfortunately', 'infelizmente', 'Unfortunately, we arrived late.'], ['meanwhile', 'enquanto isso', 'Meanwhile, my sister was calling us.'], ['afterwards', 'depois disso', 'We talked about it afterwards.'], ['turning point', 'virada', 'That was the turning point.'], ['ending', 'final', 'The ending was funny.']],
            grammar: [['Reviewing past stories', 'Use Past Simple for completed events and Past Continuous for background or interruptions.'], ['Adding connectors', 'Use fortunately, unfortunately, meanwhile, and afterwards to make the story richer.'], ['Longer speaking', 'A longer story needs clear order, not just more sentences.']],
            examples: ['Fortunately, we found the address before dark.', 'Meanwhile, my phone was running out of battery.', 'The trip started badly but ended well.', 'What was the turning point in the story?'],
            expressions: [['bring back', 'trazer de volta', 'That song brings back memories.'], ['sum up', 'resumir', 'Can you sum up the story?'], ['go wrong', 'dar errado', 'Everything went wrong at first.'], ['work out', 'dar certo', 'In the end, it worked out.']],
            readingTitle: 'A song and a memory',
            reading: 'Some songs bring back complete stories. When Leo hears one specific song, he remembers a rainy bus trip with his friends. They were going to a concert, but the bus broke down. While they were waiting for another bus, everyone started singing. Unfortunately, they missed the first part of the concert. Fortunately, the night still became unforgettable because the problem created a memory they still talk about.',
            music: ['A memory in the chorus', 'past review']
        },
        {
            themes: ['making personal plans', 'planning a study routine', 'organizing the next weekend'],
            objectives: ['describe detailed plans with purpose and timing', 'use going to for predictions based on visible evidence', 'ask follow-up questions about intentions'],
            vocab: [['evidence', 'evidência', 'There is clear evidence in the sky.'], ['sign', 'sinal', 'Those clouds are a sign of rain.'], ['intend to', 'pretender', 'I intend to reduce my expenses.'], ['prepare', 'preparar', 'We are going to prepare the room tonight.'], ['improve', 'melhorar', 'She is going to improve the schedule.'], ['reduce', 'reduzir', 'They are going to reduce the price.'], ['replace', 'substituir', 'We are going to replace the old chairs.'], ['continue', 'continuar', 'I am going to continue with the plan.']],
            grammar: [['Detailed plans', 'Use be going to + base verb for a prior decision. Add when, where, or why: We are going to prepare the room tonight because the event starts early.'], ['Prediction from evidence', 'Use going to when a present sign supports the prediction: Look at those dark clouds. It is going to rain.'], ['Follow-up questions', 'Use What, When, Where, Why, or How + be + subject + going to + verb: What are you going to change first?']],
            examples: ['We are going to prepare the room tonight because the event starts early.', 'Look at those dark clouds. It is going to rain.', 'What are you going to change first?', 'They are not going to cancel the picnic; they are going to move it indoors.'],
            expressions: [['map out', 'planejar em detalhes', 'I mapped out the whole week.'], ['follow through', 'levar o plano até o fim', 'We are going to follow through with the plan.'], ['sign up for', 'se inscrever', 'He is going to sign up for the course.'], ['stick to', 'seguir firme', 'I want to stick to my plan.']],
            readingTitle: 'A plan that fits real life',
            reading: 'Renata is going to improve her English this month, but she is not going to make an impossible plan. She is going to study for twenty minutes on weekdays and watch one short video on Sundays. She is also going to practice a short answer aloud twice a week. The plan is simple, but it fits her routine. Because of that, she believes she is going to continue even when work gets busy.',
            music: ['I am going to begin', 'future plans']
        },
        {
            themes: ['making predictions about work', 'offering help quickly', 'deciding during a conversation'],
            objectives: ['use will for predictions', 'use will for offers and promises', 'separate will from going to'],
            vocab: [['probably', 'provavelmente', 'It will probably rain.'], ['promise', 'prometer', 'I promise I will call.'], ['offer', 'oferecer', 'I will help you.'], ['decision', 'decisão', 'I will decide later.'], ['believe', 'acreditar', 'I believe it will work.'], ['expect', 'esperar/achar', 'We expect prices will rise.'], ['guess', 'chutar/imaginar', 'I guess she will agree.'], ['soon', 'em breve', 'They will arrive soon.']],
            grammar: [['Will for prediction', 'Use will when you predict based on opinion or belief: I think it will be difficult.'], ['Will for instant decisions', 'Use will when you decide at the moment of speaking: I will answer it.'], ['Will for offers', 'Use will to offer help: I will carry that for you.']],
            examples: ['I think the meeting will be short.', 'I will send you the address.', 'She will probably arrive late.', 'Will prices go up next year?'],
            expressions: [['count on', 'contar com', 'You can count on me.'], ['turn out', 'acabar sendo', 'It will turn out fine.'], ['come up', 'surgir', 'Something will come up.'], ['take care of', 'cuidar de', 'I will take care of the tickets.']],
            readingTitle: 'A quick decision',
            reading: 'During the meeting, the team discovered that one document was missing. Nobody had planned for the problem. Clara immediately said, "I will call the client and ask for another copy." Her manager predicted that the client would answer quickly because they had worked together before. Clara called, explained the situation, and received the file in ten minutes. Sometimes will is the grammar of quick help and quick decisions.',
            music: ['I will be there', 'predictions and promises']
        },
        {
            themes: ['fixed plans with friends', 'appointments this week', 'professional arrangements'],
            objectives: ['use present continuous for future arrangements', 'include time and place', 'contrast arrangements with intentions'],
            vocab: [['meeting', 'encontrando/reunião', 'I am meeting Ana at six.'], ['leaving', 'saindo', 'We are leaving tomorrow.'], ['having lunch', 'almocando', 'She is having lunch with a client.'], ['flying', 'voando', 'They are flying to Recife.'], ['appointment', 'compromisso/consulta', 'I have an appointment on Friday.'], ['schedule', 'agenda', 'Check your schedule.'], ['confirmed', 'confirmado', 'The time is confirmed.'], ['reschedule', 'remarcar', 'Can we reschedule the call?']],
            grammar: [['Arrangement meaning', 'Present Continuous can describe future plans that are arranged with time/place: I am meeting João at 7.'], ['Time expressions', 'Use future time expressions to avoid confusion: tomorrow, next week, on Friday.'], ['Not only now', 'I am meeting can mean now or future. Context tells the listener which one you mean.']],
            examples: ['I am meeting my teacher tomorrow.', 'We are leaving at seven on Saturday.', 'She is having lunch with a client on Friday.', 'Are you working from home next week?'],
            expressions: [['set up', 'marcar/organizar', 'We set up a call for Tuesday.'], ['move up', 'adiantar', 'They moved up the meeting.'], ['push back', 'adiar', 'Can we push back the appointment?'], ['show up', 'aparecer/comparecer', 'Please show up on time.']],
            readingTitle: 'A calendar full of arrangements',
            reading: 'This week, Andre is not just thinking about plans; he has several arrangements. He is meeting a student on Tuesday, having lunch with a colleague on Wednesday, and visiting his parents on Saturday. Because these times are confirmed, he uses the present continuous when he talks about them. The grammar shows that the plans are already in his calendar, not just ideas in his head.',
            music: ['Meeting you at seven', 'future arrangements']
        },
        {
            themes: ['choosing the best future form', 'planning and predicting a project', 'talking about real future situations'],
            objectives: ['choose going to, will, or present continuous', 'explain why the form fits', 'speak about future situations naturally'],
            vocab: [['arrangement', 'combinado', 'The arrangement is confirmed.'], ['prediction', 'previsão', 'My prediction is positive.'], ['intention', 'intenção', 'Her intention is to help.'], ['deadline', 'prazo', 'The deadline is next week.'], ['likely', 'provável', 'It is likely to work.'], ['unlikely', 'improvável', 'It is unlikely to rain.'], ['confirm', 'confirmar', 'Please confirm the time.'], ['cancel', 'cancelar', 'They will not cancel.']],
            grammar: [['Choosing the form', 'Use going to for plans, will for instant decisions/predictions, and present continuous for fixed arrangements.'], ['Meaning first', 'Do not choose grammar by translating. Decide what you mean first: plan, prediction, offer, or arrangement.'], ['Mixed future talk', 'Real conversations often mix forms: I am meeting Ana, and I think we will finish early.']],
            examples: ['I am meeting the team at nine.', 'We are going to present the idea next month.', 'I think the client will like it.', 'I will send the file after class.'],
            expressions: [['follow up', 'dar seguimento', 'I will follow up tomorrow.'], ['work out', 'dar certo', 'The plan will work out.'], ['back up', 'apoiar/fazer backup', 'Back up the file before the meeting.'], ['line up', 'organizar/alinhar', 'We lined up three options.']],
            readingTitle: 'Three ways to talk about next week',
            reading: 'Julia is preparing for a presentation next week. She is meeting her partner on Monday because the appointment is confirmed. They are going to rehearse twice because that is their plan. Julia thinks the presentation will go well because the research is strong. In one short conversation, she uses three future forms, each with a different meaning. That is why future grammar is about intention, not just time.',
            music: ['Next week has a plan', 'future review']
        },
        {
            themes: ['asking permission in class', 'making polite requests at work', 'talking about what is allowed'],
            objectives: ['use can and could for permission', 'sound polite without being too formal', 'answer permission requests clearly'],
            vocab: [['permission', 'permissão', 'Can I ask for permission?'], ['allowed', 'permitido', 'Phones are allowed here.'], ['request', 'pedido', 'I have a small request.'], ['borrow', 'pegar emprestado', 'Could I borrow your pen?'], ['leave early', 'sair cedo', 'Can I leave early today?'], ['use', 'usar', 'Can I use your charger?'], ['repeat', 'repetir', 'Could you repeat that?'], ['interrupt', 'interromper', 'Sorry to interrupt.']],
            grammar: [['Can for permission', 'Use Can I...? for common permission requests: Can I open the window?'], ['Could for politeness', 'Could I...? and Could you...? sound softer and more polite.'], ['Short answers', 'Use clear answers: Yes, of course. Sorry, not right now. Sure, go ahead.']],
            examples: ['Can I use your charger?', 'Could I leave five minutes early?', 'Can we use this room?', 'Could you repeat the instruction?'],
            expressions: [['go ahead', 'va em frente', 'Sure, go ahead.'], ['hold on', 'esperar', 'Could you hold on a second?'], ['speak up', 'falar mais alto', 'Could you speak up, please?'], ['turn down', 'abaixar', 'Can you turn down the volume?']],
            readingTitle: 'Polite does not mean complicated',
            reading: 'In a language class, permission requests happen all the time. A student may need to leave early, borrow a pen, or ask the teacher to repeat an instruction. Simple grammar can sound polite when the tone is respectful. "Could you repeat that, please?" is short, clear, and natural. The goal is not to use difficult words; it is to make the request easy to understand and easy to answer.',
            music: ['Could I ask you', 'permission']
        },
        {
            themes: ['rules at work', 'course requirements', 'things you need to do before a trip'],
            objectives: ['use must, have to, and need to', 'separate strong rules from practical necessities', 'explain obligations with reasons'],
            vocab: [['must', 'deve/precisa', 'You must wear a badge.'], ['have to', 'ter que', 'We have to arrive early.'], ['need to', 'precisar', 'I need to finish this form.'], ['requirement', 'exigência', 'This is a requirement.'], ['badge', 'crachá', 'Visitors must wear a badge.'], ['deadline', 'prazo', 'We have to meet the deadline.'], ['document', 'documento', 'You need to bring a document.'], ['mandatory', 'obrigatório', 'Attendance is mandatory.']],
            grammar: [['Must', 'Must often sounds like a strong rule or official instruction.'], ['Have to', 'Have to often shows an external obligation: a law, schedule, rule, or situation.'], ['Need to', 'Need to focuses on practical necessity: I need to call the hotel before check-in.']],
            examples: ['You must show your ID at reception.', 'We have to submit the form today.', 'She needs to call the doctor before noon.', 'Do we have to pay now?'],
            expressions: [['fill out', 'preencher', 'You need to fill out this form.'], ['hand in', 'entregar', 'We have to hand in the report.'], ['check in', 'registrar entrada', 'Visitors must check in first.'], ['keep up with', 'acompanhar', 'I have to keep up with the course.']],
            readingTitle: 'The rule behind the rule',
            reading: 'At the language school, new students have to complete a short placement form before the first class. They must also bring an ID if they are taking an official test. At first, Pedro thought the rules were annoying, but he understood them later. The form helped the teacher prepare the class, and the ID protected the test process. Obligations feel easier to accept when people understand the reason behind them.',
            music: ['Rules of the room', 'obligation']
        },
        {
            themes: ['giving advice to a tired friend', 'study advice for consistency', 'healthier daily habits'],
            objectives: ['give specific advice that is realistic to follow', 'make recommendations sound tactful and supportive', 'explain priorities, reasons, and limits'],
            vocab: [['specific', 'específico', 'Try to give specific advice.'], ['realistic', 'realista', 'Choose a realistic goal.'], ['manageable', 'possível de administrar', 'Make the task manageable.'], ['overwhelmed', 'sobrecarregado', 'She feels overwhelmed.'], ['priority', 'prioridade', 'Choose one priority today.'], ['boundary', 'limite', 'Set a clear boundary at work.'], ['supportive', 'acolhedor', 'His message was supportive.'], ['balanced', 'equilibrado', 'Keep a balanced routine.']],
            grammar: [['Action plus reason', 'Use should or could + base verb, then explain why: You should choose one priority because your list is too long.'], ['Tactful openings', 'Maybe, I think, and If I were you make advice less direct. Could suggests one possible option instead of one correct answer.'], ['Limits and boundaries', 'Use I do not think you should... for a careful warning. Use need to when the situation requires a stronger next step.']],
            examples: ['Maybe you should choose one priority because your list is too long.', 'If I were you, I would turn off notifications for an hour.', 'You could make the goal more manageable by dividing it into three steps.', 'I do not think you should compare your progress with someone else\'s.'],
            expressions: [['slow down', 'ir mais devagar', 'You should slow down this week.'], ['open up', 'se abrir', 'You should open up to someone.'], ['deal with', 'lidar com', 'She is dealing with stress.'], ['burn out', 'ficar esgotado', 'Do not burn out before the test.']],
            readingTitle: 'Advice that a person can actually follow',
            reading: 'When Tiago felt overwhelmed, people gave him advice that sounded good but was too general. "Study more" did not help. His teacher gave him a smaller suggestion: review five sentences every morning and prepare one short answer twice a week. Tiago followed the advice because it was realistic. He learned that useful advice is specific, kind, and possible to do.',
            music: ['You should breathe', 'advice']
        },
        {
            themes: ['reviewing polite requests', 'discussing rules and advice', 'solving a classroom problem'],
            objectives: ['review can, could, must, have to, need to, and should', 'choose the best modal for meaning', 'make requests and advice sound natural'],
            vocab: [['choice', 'escolha', 'The modal changes the choice.'], ['tone', 'tom', 'Tone changes the message.'], ['necessary', 'necessário', 'It is necessary today.'], ['optional', 'opcional', 'The last task is optional.'], ['polite', 'educado', 'Could sounds more polite.'], ['strict', 'rígido', 'Must sounds strict.'], ['helpful', 'útil', 'Should gives helpful advice.'], ['rule', 'regra', 'This rule is clear.']],
            grammar: [['Modal meaning', 'Can/could ask permission, must/have to express obligation, and should gives advice.'], ['No to after modals', 'Use the base verb after modals: should study, must leave, can ask.'], ['Context decides', 'The correct modal depends on tone and situation, not only translation.']],
            examples: ['Could you help me with this exercise?', 'You must not share the test answers.', 'We have to finish before five.', 'You should review the examples aloud.'],
            expressions: [['speak up', 'falar mais alto', 'Could you speak up?'], ['hand in', 'entregar', 'You must hand in the form.'], ['keep up', 'acompanhar', 'You should keep up with the lessons.'], ['go ahead', 'va em frente', 'Can I start? Yes, go ahead.']],
            readingTitle: 'One problem, different modals',
            reading: 'A student arrived late and did not understand the activity. First, she asked, "Could you explain the instructions again?" The teacher answered, "Of course, but you have to finish the first part before the break." Another student said, "You should start with the easier questions." In one short moment, the class used permission, obligation, and advice. Each modal had a different job.',
            music: ['Could should must', 'modals review']
        },
        {
            themes: ['travel experiences', 'professional achievements', 'new things you have tried'],
            objectives: ['use Present Perfect for life experiences', 'ask questions with ever', 'answer with never and before'],
            vocab: [['ever', 'já alguma vez', 'Have you ever traveled alone?'], ['never', 'nunca', 'I have never tried sushi.'], ['experience', 'experiência', 'It was a great experience.'], ['abroad', 'no exterior', 'She has studied abroad.'], ['achievement', 'conquista', 'It is an achievement.'], ['try', 'experimentar', 'Have you tried this app?'], ['visit', 'visitar', 'I have visited three capitals.'], ['before', 'antes', 'I have seen this before.']],
            grammar: [['Have/has + participle', 'Use have/has + past participle for experiences without exact finished time.'], ['Ever in questions', 'Use ever to ask about life experience: Have you ever...?'], ['Never in answers', 'Never means zero experience until now: I have never traveled alone.']],
            examples: ['Have you ever worked with foreign clients?', 'I have never traveled alone.', 'She has visited three countries.', 'We have tried that restaurant before.'],
            expressions: [['try out', 'testar', 'I have tried out a new app.'], ['come across', 'encontrar por acaso', 'I came across a useful article.'], ['go through', 'passar por', 'She has gone through many changes.'], ['build up', 'desenvolver aos poucos', 'He has built up confidence.']],
            readingTitle: 'Experience is more than travel',
            reading: 'When people hear the word experience, they often think about travel. But experience can also come from work, study, mistakes, and conversations. Marina has never lived abroad, but she has worked with international customers and has spoken English in several real situations. Those moments have helped her become more confident. Present Perfect is useful because it connects past experiences to who we are now.',
            music: ['Have you ever', 'life experiences']
        },
        {
            themes: ['things already done this week', 'tasks not finished yet', 'experiences you have never had'],
            objectives: ['use already in affirmative sentences', 'use yet in questions and negatives', 'use ever/never for experience'],
            vocab: [['already', 'já', 'I have already finished.'], ['yet', 'ainda/já', 'Have you finished yet?'], ['still', 'ainda', 'I still need help.'], ['recently', 'recentemente', 'She has recently moved.'], ['complete', 'completar', 'We have completed the task.'], ['submit', 'enviar/entregar', 'He has submitted the file.'], ['reply', 'responder', 'They have not replied yet.'], ['update', 'atualizar', 'I have updated the document.']],
            grammar: [['Already', 'Already usually appears in affirmative sentences and suggests something happened sooner than expected.'], ['Yet', 'Yet is common in questions and negatives: Have you eaten yet? I have not eaten yet.'], ['Ever and never', 'Ever asks about experience; never gives a negative experience answer.']],
            examples: ['I have already sent the report.', 'She has not replied yet.', 'Have you updated the document yet?', 'He has never missed a deadline.'],
            expressions: [['catch up on', 'colocar em dia', 'I need to catch up on emails.'], ['send out', 'enviar para várias pessoas', 'We have sent out the invitations.'], ['check off', 'marcar como feito', 'I checked off three tasks.'], ['fall behind', 'ficar atrasado', 'She has fallen behind this week.']],
            readingTitle: 'The list that keeps changing',
            reading: 'By Thursday afternoon, Lucas had already completed three important tasks, but he had not replied to all his messages yet. He had sent out the invitations, updated the spreadsheet, and checked off the budget review. However, two clients still had not answered. The list showed his progress and his unfinished work at the same time. Already and yet helped him explain both sides clearly.',
            music: ['Not yet already', 'task progress']
        },
        {
            themes: ['a trip with and without dates', 'work experience and finished events', 'talking about recent results'],
            objectives: ['contrast Present Perfect and Past Simple', 'use finished time expressions correctly', 'avoid mixing exact time with Present Perfect'],
            vocab: [['in 2022', 'em 2022', 'I visited Recife in 2022.'], ['before', 'antes', 'I have been there before.'], ['last year', 'ano passado', 'She changed jobs last year.'], ['recently', 'recentemente', 'I have recently changed jobs.'], ['yesterday', 'ontem', 'We finished the project yesterday.'], ['so far', 'até agora', 'We have finished three tasks so far.'], ['twice', 'duas vezes', 'I have visited Salvador twice.'], ['when', 'quando', 'When did you send the file?']],
            grammar: [['Past Simple with when', 'Use Past Simple when you say when: yesterday, last month, in 2021.'], ['Present Perfect without exact time', 'Use Present Perfect when the experience or result matters more than the exact date.'], ['Do not mix', 'Avoid: I have visited London last year. Say: I visited London last year.']],
            examples: ['I visited Salvador in 2021.', 'I have visited Salvador twice.', 'She finished the course last month.', 'She has finished the course and feels more confident.'],
            expressions: [['look back on', 'relembrar', 'I look back on that trip often.'], ['bring up', 'mencionar', 'He brought up an old project.'], ['move on from', 'seguir em frente', 'She moved on from that job.'], ['come a long way', 'evoluir muito', 'You have come a long way.']],
            readingTitle: 'Two ways to tell the same history',
            reading: 'Ana can say, "I visited Chile in 2019" when the date matters. She can also say, "I have visited Chile" when she wants to talk about experience. Both sentences are correct, but they answer different questions. Past Simple places the event on a timeline. Present Perfect connects the event to the present. Choosing the right tense helps the listener understand what is important.',
            music: ['Then and now', 'past simple versus present perfect']
        },
        {
            themes: ['where someone has been', 'where someone has gone', 'travel and return', 'people not here right now'],
            objectives: ['separate been and gone', 'explain returned and not returned situations', 'use context to avoid confusion'],
            vocab: [['been to', 'foi e voltou', 'I have been to Curitiba.'], ['gone to', 'foi e ainda está lá', 'She has gone to the bank.'], ['returned', 'voltou', 'He has returned home.'], ['away', 'fora/ausente', 'She is away this week.'], ['back', 'de volta', 'They are back now.'], ['trip', 'viagem', 'The trip was short.'], ['destination', 'destino', 'What was the destination?'], ['still there', 'ainda lá', 'He is still there.']],
            grammar: [['Been to', 'Use been to when the person visited and returned: I have been to London.'], ['Gone to', 'Use gone to when the person went and is not back yet: She has gone to the store.'], ['Context matters', 'Been and gone can change the whole meaning of the sentence, especially when explaining where someone is.']],
            examples: ['I have been to that museum twice.', 'She has gone to the pharmacy and will be back soon.', 'Have you ever been to Argentina?', 'They have gone home already.'],
            expressions: [['get back', 'voltar', 'She will get back soon.'], ['go away', 'viajar/sair', 'He has gone away for the weekend.'], ['come back', 'voltar', 'They came back yesterday.'], ['stop by', 'passar rapidamente', 'I stopped by the office.']],
            readingTitle: 'Where is Clara?',
            reading: 'At lunch, two coworkers talked about Clara. One said, "She has been to the new café," meaning Clara visited it before and returned. The other said, "No, she has gone to the café," meaning Clara was there at that moment. The small difference mattered because they were trying to find her. Been and gone are short words, but they can explain whether someone is back or still away.',
            music: ['Been there gone now', 'been and gone']
        },
        {
            themes: ['describing symptoms', 'giving simple health advice', 'explaining how long a problem has lasted'],
            objectives: ['describe changes in symptoms over time', 'use present perfect to report recovery and recent results', 'decide when a health change needs a next step'],
            vocab: [['mild', 'leve', 'The pain is mild today.'], ['severe', 'forte / grave', 'Call the clinic if the pain becomes severe.'], ['swollen', 'inchado', 'My ankle is still swollen.'], ['rash', 'erupção na pele', 'The rash has spread.'], ['congested', 'congestionado', 'I still feel congested.'], ['nauseous', 'enjoado', 'She has felt nauseous since lunch.'], ['improve', 'melhorar', 'The cough has improved.'], ['get worse', 'piorar', 'The pain has got worse.']],
            grammar: [['Change until now', 'Use have/has + past participle to report a change with a result now: My cough has got worse since yesterday.'], ['Still, already, and yet', 'Still shows a continuing symptom. Already shows an earlier result. Yet is common in questions and negatives: Has the swelling gone down yet?'], ['Change and next step', 'Describe the change first, then choose advice or necessity: The rash has spread, so you need to call the clinic.']],
            examples: ['My cough has got worse since yesterday.', 'The fever has already gone down.', 'I still feel weak, but the medicine has started to work.', 'The rash has spread, so I need to call the clinic.'],
            expressions: [['come down with', 'ficar doente', 'I came down with a cold.'], ['get over', 'se recuperar', 'She is getting over the flu.'], ['flare up', 'voltar a piorar', 'The rash flared up last night.'], ['wear off', 'perder o efeito', 'The medicine has worn off.']],
            readingTitle: 'Explaining symptoms clearly',
            reading: 'When Daniel called the clinic, he did not simply say, "I feel bad." He explained that he had had a sore throat since Monday, felt dizzy in the morning, and had a light fever at night. The receptionist asked a few questions and booked an appointment. Clear symptom language helped Daniel get the right kind of help faster.',
            music: ['Feeling better slowly', 'health problems']
        },
        {
            themes: ['talking to a doctor', 'describing pain and duration', 'asking about treatment'],
            objectives: ['handle a basic medical consultation', 'answer doctor questions clearly', 'use since/for with symptoms'],
            vocab: [['symptom', 'sintoma', 'What symptoms do you have?'], ['pain', 'dor', 'Where is the pain?'], ['treatment', 'tratamento', 'The treatment helped.'], ['prescription', 'receita médica', 'The doctor gave me a prescription.'], ['allergy', 'alergia', 'Do you have any allergies?'], ['dose', 'dose', 'Take one dose at night.'], ['for three days', 'por três dias', 'I have felt sick for three days.'], ['since Friday', 'desde sexta', 'I have had pain since Friday.']],
            grammar: [['How long questions', 'Use How long have you had...? to ask about duration.'], ['For and since', 'Use for with a period of time and since with a starting point.'], ['Medical clarity', 'Use specific words: sharp pain, mild fever, strong cough, light headache.']],
            examples: ['How long have you had this cough?', 'I have had back pain for three days.', 'She has felt dizzy since Friday.', 'Do you have any allergies?'],
            expressions: [['take in', 'ingerir/absorver', 'Take in more fluids.'], ['lie down', 'deitar', 'You should lie down for a while.'], ['clear up', 'melhorar/desaparecer', 'The rash cleared up.'], ['follow up', 'acompanhar', 'The doctor will follow up next week.']],
            readingTitle: 'A better doctor visit',
            reading: 'Before her appointment, Beatriz wrote down her symptoms, when they started, and what made them worse. During the consultation, she said, "I have had stomach pain for three days, and it gets worse after lunch." The doctor asked about allergies and gave her a simple treatment plan. Because Beatriz was specific, the conversation was calmer and more useful.',
            music: ['Tell me where it hurts', 'medical consultation']
        },
        {
            themes: ['describing a room', 'explaining where objects are', 'giving location clues'],
            objectives: ['distinguish points, areas, surfaces, and floors', 'use in the corner and at the corner accurately', 'give precise location details in buildings and streets'],
            vocab: [['at the front desk', 'na recepção', 'Leave the package at the front desk.'], ['on the second floor', 'no segundo andar', 'The office is on the second floor.'], ['in the corner', 'no canto interno', 'The chair is in the corner.'], ['at the corner', 'na esquina', 'Meet me at the corner of King Street.'], ['inside', 'dentro', 'Wait inside the building.'], ['outside', 'do lado de fora', 'The taxi is outside.'], ['at the back', 'nos fundos', 'The garden is at the back.'], ['on the left-hand side', 'do lado esquerdo', 'The elevator is on the left-hand side.']],
            grammar: [['In or at', 'Use in for an area or enclosed space: in the lobby, in the office. Use at for a point or service location: at reception, at the entrance.'], ['On', 'Use on for surfaces, street names, and floors: on the desk, on Pine Street, on the third floor.'], ['Two kinds of corner', 'In the corner means inside a room or space. At the corner means a street intersection: a chair in the corner; a café at the corner.']],
            examples: ['Leave the package at the front desk in the lobby.', 'The meeting room is on the second floor.', 'There is a small table in the corner of the office.', 'The café is at the corner of Lake Street and Park Road.'],
            expressions: [['look for', 'procurar', 'I am looking for my keys.'], ['put away', 'guardar', 'Put away the documents.'], ['show around', 'mostrar o lugar', 'She showed me around the apartment.'], ['move around', 'mudar de lugar', 'We moved the chairs around.']],
            readingTitle: 'The missing keys',
            reading: 'Before leaving home, Sofia could not find her keys. She looked on the table, under the notebook, and behind the sofa. Then she remembered that she had put them in the small bowl next to the door. The search was annoying, but it was a perfect exercise in prepositions of place. Location language becomes useful when something is missing.',
            music: ['Right where you are', 'place prepositions']
        },
        {
            themes: ['reviewing city directions', 'describing places and times', 'solving a practical problem in town'],
            objectives: ['review practical prepositions', 'combine place, movement, and time', 'speak through a real-life situation'],
            vocab: [['landmark', 'ponto de referência', 'Use the museum as a landmark.'], ['nearby', 'perto', 'There is a café nearby.'], ['corner', 'esquina', 'Turn at the corner.'], ['entrance', 'entrada', 'The entrance is on the left.'], ['at noon', 'ao meio-dia', 'Meet me at noon.'], ['on Monday', 'na segunda', 'The office opens on Monday.'], ['in July', 'em julho', 'The event is in July.'], ['around the block', 'ao redor do quarteirão', 'Walk around the block.']],
            grammar: [['Place review', 'Use at for points, in for areas, and on for streets/surfaces.'], ['Movement review', 'Use to, into, out of, across, through, and past for direction.'], ['Time review', 'Use at for times, on for days/dates, and in for months/years.']],
            examples: ['Walk past the museum and turn left at the corner.', 'The meeting is at noon on Monday.', 'The entrance is across from the parking lot.', 'We are staying in Recife in July.'],
            expressions: [['get around', 'se locomover', 'It is easy to get around here.'], ['drop by', 'passar rapidamente', 'Drop by the office later.'], ['show up', 'aparecer/chegar', 'He showed up at ten.'], ['head to', 'ir para', 'We are heading to the station.']],
            readingTitle: 'A practical message',
            reading: 'Carla sent her friend a voice message with directions and time information. She said, "Meet me at the entrance of the museum at noon. Walk past the bank, turn left at the corner, and you will see a small café across from the parking lot." The message was short but complete because it combined place, movement, and time clearly.',
            music: ['Around the block', 'preposition review']
        },
        {
            themes: ['describing movement through a city', 'explaining how someone got somewhere', 'telling a route with action verbs'],
            objectives: ['use movement prepositions', 'describe routes step by step', 'separate destination from path'],
            vocab: [['to', 'para', 'Go to the station.'], ['into', 'para dentro', 'Walk into the building.'], ['out of', 'para fora', 'Come out of the room.'], ['through', 'através de', 'Walk through the park.'], ['across', 'atravessando', 'Go across the street.'], ['past', 'passando por', 'Walk past the bank.'], ['toward', 'em direção a', 'Go toward the bridge.'], ['along', 'ao longo de', 'Walk along the river.']],
            grammar: [['Destination', 'Use to for destination: go to the hotel.'], ['Path', 'Use through, across, past, along, and toward to describe the path.'], ['Into/out of', 'Use into and out of when movement crosses a boundary.']],
            examples: ['Walk through the park and across the bridge.', 'Go past the supermarket and turn right.', 'She ran into the station because she was late.', 'We walked along the river after lunch.'],
            expressions: [['come across', 'encontrar por acaso', 'We came across a small bookstore.'], ['go past', 'passar por', 'Go past the church.'], ['pull into', 'entrar com veículo', 'The bus pulled into the station.'], ['head toward', 'ir em direção a', 'Head toward the main square.']],
            readingTitle: 'The route by the river',
            reading: 'Instead of taking the fastest route, Leo walked along the river, through a quiet park, and across a small bridge. He went past a bookstore and came across a weekend market. The route took longer, but it helped him understand the neighborhood. Movement prepositions turned the walk into a clear mental map.',
            music: ['Through the streets', 'movement prepositions']
        },
        {
            themes: ['talking about schedules', 'planning dates and times', 'explaining routines in a calendar'],
            objectives: ['distinguish deadlines from continuing periods', 'use during, for, before, and after accurately', 'negotiate time windows and schedule changes'],
            vocab: [['by Friday', 'até sexta como prazo', 'Please send the form by Friday.'], ['until noon', 'até meio-dia continuamente', 'The office is open until noon.'], ['from...to...', 'de...até...', 'The class runs from six to eight.'], ['during', 'durante', 'Do not use your phone during the meeting.'], ['before', 'antes de', 'Call me before lunch.'], ['after', 'depois de', 'We can talk after class.'], ['within', 'dentro de um prazo', 'We will reply within two days.'], ['in two days', 'daqui a dois dias', 'The order will arrive in two days.']],
            grammar: [['By or until', 'By gives a deadline: Send it by Friday. Until describes continuation to an end point: The office is open until Friday.'], ['During or for', 'During comes before an event or period: during the meeting. For shows duration: for two hours.'], ['Time windows', 'Use from...to... for a complete range. Use before and after to position one event in relation to another. Within means before a period ends.']],
            examples: ['Please send the signed form by Friday.', 'The support desk is open until noon.', 'The workshop runs from nine to eleven.', 'We will reply within two business days.'],
            expressions: [['put off', 'adiar', 'Do not put off the task.'], ['move up', 'adiantar', 'They moved up the deadline.'], ['fit in', 'encaixar', 'Can we fit in a short call?'], ['run late', 'estar atrasado', 'I am running late.']],
            readingTitle: 'A schedule that finally made sense',
            reading: 'Marcos used to confuse at, on, and in when talking about his schedule. Then he started thinking in categories: exact time, day/date, and larger period. His class was at 7 p.m. on Tuesday in March. This simple pattern helped him write messages more clearly and avoid misunderstandings about appointments and deadlines.',
            music: ['At seven on Friday', 'time prepositions']
        },
        {
            themes: ['helping a tourist downtown', 'giving directions by phone', 'finding a room in a large building'],
            objectives: ['give multi-step directions with clear landmarks', 'locate turns before and after reference points', 'check and clarify a route during a conversation'],
            vocab: [['intersection', 'cruzamento', 'Turn right at the next intersection.'], ['pedestrian crossing', 'faixa de pedestres', 'Cross at the pedestrian crossing.'], ['roundabout', 'rotatória', 'Take the second exit at the roundabout.'], ['entrance', 'entrada', 'The side entrance is after the café.'], ['exit', 'saída', 'Use the north exit.'], ['landmark', 'ponto de referência', 'The library is a useful landmark.'], ['before', 'antes de', 'Turn left before the bridge.'], ['after', 'depois de', 'The clinic is just after the bank.']],
            grammar: [['Route sequence', 'Divide a longer route into stages with first, then, after that, and finally. Give one landmark for each important turn.'], ['Before or after', 'Place before or after directly before the landmark: Turn left before the bridge. The entrance is just after the pharmacy.'], ['Clarify and check', 'Ask one precise question: Is that before or after the roundabout? Then check back: So I take the second exit, right?']],
            examples: ['First, cross at the pedestrian crossing and keep going to the roundabout.', 'Take the second exit, then turn left after the library.', 'Is the side entrance before or after the café?', 'So I use the north exit and cross the parking lot, right?'],
            expressions: [['keep going', 'continuar em frente', 'Keep going until the roundabout.'], ['take the second left', 'pegar a segunda a esquerda', 'Take the second left after the bridge.'], ['cross over', 'atravessar', 'Cross over at the traffic lights.'], ['pull over', 'encostar o carro', 'Pull over after the corner.']],
            readingTitle: 'Simple directions work better',
            reading: 'When a tourist asked for directions, Bruno first gave too much information. The tourist looked confused. Bruno tried again: "Go straight for two blocks, turn left after the bank, and the museum is opposite the park." This time, the tourist understood. Good directions are not the longest directions; they are the clearest ones.',
            music: ['Find the way', 'directions']
        },
        {
            themes: ['checking in at a hotel', 'reporting a room problem', 'asking politely for travel help'],
            objectives: ['use hotel vocabulary', 'make polite requests', 'explain problems with the room'],
            vocab: [['reservation', 'reserva', 'I have a reservation.'], ['reception', 'recepção', 'Ask at reception.'], ['check in', 'fazer entrada', 'We checked in at two.'], ['check out', 'fazer saída', 'Check-out is at noon.'], ['key card', 'cartão-chave', 'My key card does not work.'], ['towel', 'toalha', 'Could I have another towel?'], ['shower', 'chuveiro', 'The shower is not working.'], ['included', 'incluído', 'Is breakfast included?']],
            grammar: [['Polite requests', 'Use Could I have...? and Could you...? for hotel requests.'], ['Current problems', 'Use simple present or present continuous: The key card does not work. The shower is not working.'], ['Under my name', 'Use under my name for reservations: I have a reservation under Ana Lima.']],
            examples: ['I have a reservation under my name.', 'Could I have another towel, please?', 'The air conditioner is not working.', 'Is breakfast included in the price?'],
            expressions: [['check in', 'fazer entrada', 'We checked in late.'], ['check out', 'fazer saída', 'They checked out before breakfast.'], ['sort out', 'resolver', 'Reception sorted out the problem.'], ['make up for', 'compensar', 'They offered coffee to make up for the delay.']],
            readingTitle: 'A calm hotel complaint',
            reading: 'When Laura entered her hotel room, the air conditioner was not working and there were no towels. She was tired, but she called reception calmly. She said, "I have just checked in, and the air conditioner is not working. Could you send someone to check it and bring two towels, please?" The receptionist understood immediately and sorted out the problem.',
            music: ['Room for tonight', 'hotel English']
        },
        {
            themes: ['study habits', 'personal goals', 'likes, decisions, and plans'],
            objectives: ['use gerunds after common verbs', 'use infinitives after common verbs', 'memorize verb patterns in chunks'],
            vocab: [['enjoy learning', 'gostar de aprender', 'I enjoy learning with examples.'], ['avoid studying late', 'evitar estudar tarde', 'I avoid studying late.'], ['decide to start', 'decidir começar', 'She decided to start again.'], ['plan to travel', 'planejar viajar', 'We plan to travel soon.'], ['hope to improve', 'esperar melhorar', 'I hope to improve pronunciation.'], ['mind waiting', 'se importar de esperar', 'Do you mind waiting?'], ['practice speaking', 'praticar fala', 'Practice speaking every day.'], ['promise to call', 'prometer ligar', 'He promised to call.']],
            grammar: [['Gerund patterns', 'Use -ing after enjoy, avoid, mind, finish, and practice.'], ['Infinitive patterns', 'Use to + verb after decide, hope, plan, promise, and want.'], ['Chunks over rules', 'Learn full chunks like enjoy learning and decide to study. This is safer than translating word by word.']],
            examples: ['I enjoy studying in the morning.', 'She decided to take a short course.', 'Do you mind waiting a minute?', 'We hope to speak more naturally.'],
            expressions: [['keep on', 'continuar', 'Keep on practicing.'], ['give up', 'desistir', 'Do not give up learning.'], ['look forward to', 'esperar ansiosamente', 'I look forward to seeing you.'], ['get used to', 'se acostumar', 'I am getting used to speaking.']],
            readingTitle: 'Small habits that continue',
            reading: 'Felipe wanted to improve his English, but he often gave up after a few days. Then he changed his plan. He decided to study for fifteen minutes every morning and avoided studying when he was exhausted. He enjoyed tracking small improvements and looked forward to using new phrases in class. The change worked because the habit was realistic.',
            music: ['Keep on practicing', 'gerunds and infinitives']
        },
        {
            themes: ['facts and habits', 'real future possibilities', 'plans with consequences'],
            objectives: ['use zero conditional for facts/habits', 'use first conditional for real future results', 'connect condition and result clearly'],
            vocab: [['if', 'se', 'If I sleep well, I focus better.'], ['result', 'resultado', 'The result depends on practice.'], ['habit', 'hábito', 'This habit helps me.'], ['condition', 'condição', 'There is one condition.'], ['will improve', 'vai melhorar', 'You will improve with practice.'], ['on time', 'no horário', 'If we hurry, we will arrive on time.'], ['depend on', 'depender de', 'It depends on the weather.'], ['realistic', 'realista', 'Make a realistic plan.']],
            grammar: [['Zero conditional', 'Use if + present, present for facts and habits: If I sleep badly, I feel tired.'], ['First conditional', 'Use if + present, will + verb for real future possibilities.'], ['Comma option', 'When the if-clause comes first, a comma is common: If it rains, I will stay home.']],
            examples: ['If I study in the morning, I remember more.', 'If it rains tomorrow, we will cancel the picnic.', 'You will improve if you practice every day.', 'If the office is closed, I will call later.'],
            expressions: [['depend on', 'depender de', 'It depends on the schedule.'], ['work out', 'dar certo', 'If we prepare well, the plan will work out.'], ['stick to', 'manter-se fiel a', 'Stick to your routine.'], ['figure out', 'descobrir/resolver', 'We will figure out a solution.']],
            readingTitle: 'A plan with conditions',
            reading: 'Laura made a study plan with conditions because her routine changes a lot. If she has a quiet morning, she studies grammar. If work is busy, she reviews vocabulary for ten minutes at night. If she misses a day, she does not give up; she starts again the next day. The plan works because it is flexible and realistic.',
            music: ['If I keep going', 'zero and first conditional']
        },
        {
            themes: ['using unless in plans', 'talking about hopes', 'expressing wishes carefully'],
            objectives: ['use unless without double negatives', 'talk about real hopes', 'use wish for imagined situations'],
            vocab: [['unless', 'a menos que', 'We will be late unless we leave now.'], ['hope to', 'esperar', 'I hope to get better.'], ['wish', 'gostaria/queria', 'I wish I had more time.'], ['interview', 'entrevista', 'I hope I get an interview.'], ['confident', 'confiante', 'I wish I felt more confident.'], ['consequence', 'consequência', 'Every choice has a consequence.'], ['prepare', 'preparar', 'Prepare before the interview.'], ['opportunity', 'oportunidade', 'Do not miss the opportunity.']],
            grammar: [['Unless means if not', 'Unless we leave now means if we do not leave now. Avoid unless we do not leave now.'], ['Hope', 'Use hope for possible or real future outcomes: I hope I pass.'], ['Wish', 'Use wish for situations that are not real or not easy to change: I wish I had more time.']],
            examples: ['Unless we hurry, we will miss the train.', 'I hope to speak more confidently.', 'I wish I had more free time.', 'You will miss the opportunity unless you apply today.'],
            expressions: [['miss out on', 'perder oportunidade', 'Do not miss out on this chance.'], ['count on', 'contar com', 'You can count on my help.'], ['prepare for', 'preparar-se para', 'Prepare for the interview.'], ['look ahead', 'olhar para frente', 'Let us look ahead and plan.']],
            readingTitle: 'Hope, wish, and action',
            reading: 'Bruno hopes to get a better job, but he knows that hope is not a plan by itself. Unless he updates his resume and practices interviews, nothing will change. He also says, "I wish I had more confidence," but his teacher reminds him that confidence grows through action. Hope looks forward, wish shows a desire, and unless warns about the consequence of doing nothing.',
            music: ['Unless I try', 'unless and wishes']
        },
        {
            themes: ['presenting a personal learning project', 'telling your progress story', 'planning the next level'],
            objectives: ['review the main A2 V3 structures', 'speak in a longer organized answer', 'prepare a final personal project'],
            vocab: [['progress', 'progresso', 'My progress is clear.'], ['goal', 'meta', 'My next goal is fluency.'], ['challenge', 'desafio', 'Pronunciation is my challenge.'], ['strategy', 'estratégia', 'My strategy is simple.'], ['evidence', 'evidência', 'Give evidence in your answer.'], ['reflect', 'refletir', 'Reflect on your progress.'], ['improve', 'melhorar', 'I want to improve listening.'], ['next step', 'próximo passo', 'My next step is daily practice.']],
            grammar: [['Project structure', 'Use past forms to explain progress, present forms to describe your routine, and future forms to plan next steps.'], ['Evidence and examples', 'A final answer needs examples: what changed, what helped, and what still needs work.'], ['Connected speech', 'Use connectors like first, however, because, after that, and if to organize a longer answer.']],
            examples: ['I have improved my confidence since the first lesson.', 'I used to avoid speaking, but now I try more often.', 'If I practice every day, I will keep improving.', 'My next step is to answer one question aloud every day.'],
            expressions: [['look back on', 'relembrar', 'I look back on my first lesson.'], ['build up', 'desenvolver aos poucos', 'I built up confidence.'], ['keep going', 'continuar', 'I want to keep going.'], ['set a goal', 'definir meta', 'Set a clear goal for next month.']],
            readingTitle: 'The final reflection',
            reading: 'For the final project, Nina prepared a short reflection about her English journey. She explained what she had learned, which habits helped her, and what she was going to do next. She did not claim to be perfect. Instead, she gave evidence of progress: she could tell stories, compare options, ask for help, talk about experiences, and explain plans. Her final project was not an ending; it was a map for the next stage.',
            music: ['One step further', 'final project']
        }
    ];

    const lessonDialogueContent = {
        1: {
            intro: [['Friend', 'Why were you late this morning?'], ['You', 'I woke up late and missed the bus.'], ['Friend', 'Did you call your manager?'], ['You', 'Yes. I called her, explained the problem, and took a taxi.'], ['Friend', 'What happened when you arrived?'], ['You', 'The meeting started before I arrived, but I joined and answered the last question.']],
            dialogues: [
                [['Ana', 'Did you finish the report yesterday?'], ['Leo', 'Yes, I finished it after dinner.'], ['Ana', 'Did you send it to Paula?'], ['Leo', 'No, I sent it this morning.']],
                [['Mom', 'Where did you put the keys?'], ['Son', 'I left them on the kitchen table.'], ['Mom', 'I checked there and did not see them.'], ['Son', 'Sorry, I moved them to my backpack.']],
                [['Friend', 'How was the movie?'], ['You', 'It was funny, but it started late.'], ['Friend', 'Did you stay until the end?'], ['You', 'Yes, we stayed and talked about it after.']],
                [['Coworker', 'Did the client like the idea?'], ['You', 'Yes, she liked it and asked for a small change.'], ['Coworker', 'Did you change the file?'], ['You', 'I changed it and saved a new version.']]
            ]
        },
        2: {
            intro: [['Brother', 'Tell me about the trip. What happened first?'], ['Sister', 'First, we left home early and caught the train.'], ['Brother', 'Did everything go well?'], ['Sister', 'Not exactly. The train stopped for twenty minutes.'], ['Brother', 'What did you do after that?'], ['Sister', 'We called the hotel, arrived late, and still had a great dinner.']],
            dialogues: [
                [['Rafa', 'How did you lose your wallet?'], ['Bia', 'I paid for coffee, put it on the counter, and walked away.'], ['Rafa', 'Did someone find it?'], ['Bia', 'Yes, the barista kept it for me.']],
                [['Neighbor', 'Why was the street closed?'], ['You', 'A tree fell during the storm, so the police blocked the road.'], ['Neighbor', 'How did you get home?'], ['You', 'I walked around the park and came through the back street.']],
                [['Manager', 'What happened with the delivery?'], ['Assistant', 'The driver went to the wrong address first.'], ['Manager', 'So how did you solve it?'], ['Assistant', 'I called him, sent the location, and he arrived at noon.']],
                [['Friend', 'How was your first day at the gym?'], ['You', 'I arrived nervous, met the trainer, and started slowly.'], ['Friend', 'Did you enjoy it?'], ['You', 'Yes, and after that I signed up for the month.']]
            ]
        },
        3: {
            intro: [['Rafa', 'Which apartment do you prefer?'], ['Lu', 'The first one is a little cheaper, but it is not as quiet as the second one.'], ['Rafa', 'Is the second one much farther from work?'], ['Lu', 'Only slightly farther, and the subway is much more convenient from there.'], ['Rafa', 'The rooms look just as spacious as the rooms in the first apartment.'], ['Lu', 'They are, and the building is far more secure. I think the higher rent is worth it.']],
            dialogues: [
                [['Customer', 'Is the unlimited phone plan much more expensive?'], ['Seller', 'It is a little more expensive, but it is far more reliable when you travel.'], ['Customer', 'The basic plan is not as useful for work, then.'], ['Seller', 'Exactly. The unlimited plan has an advantage over it outside the city.']],
                [['Ana', 'Should we take the bus or the subway?'], ['Leo', 'The subway is much faster during rush hour.'], ['Ana', 'Is it as comfortable as the bus?'], ['Leo', 'Not quite, but it is less stressful than sitting in traffic.'], ['Ana', 'Then the subway is worth it today.']],
                [['Friend', 'How is the new grocery store?'], ['You', 'It is slightly closer, and the prices are just as good as the old store.'], ['Friend', 'Is it as crowded on Saturdays?'], ['You', 'No, it is not as crowded, so shopping there is much quicker.']],
                [['Mia', 'Do you want to work at this café?'], ['Dan', 'Yes. It is far quieter than the café near my office.'], ['Mia', 'The tables are a little smaller.'], ['Dan', 'True, but the Wi-Fi is just as reliable, so it comes down to noise.']]
            ]
        },
        4: {
            intro: [['Rafa', 'Which restaurant is the best in this neighborhood?'], ['Lu', 'The Italian place is the most popular, but the small café is the cheapest.'], ['Rafa', 'Which one has the best service?'], ['Lu', 'The café. The staff is the friendliest.'], ['Rafa', 'And what is the worst option?'], ['Lu', 'The burger place. It is the noisiest and the slowest.']],
            dialogues: [
                [['Traveler', 'What is the best hotel near the station?'], ['Local', 'The Central Hotel is the most convenient.'], ['Traveler', 'Is it expensive?'], ['Local', 'It is not the cheapest, but it has the best location.']],
                [['Friend', 'Which app is the most useful for your routine?'], ['You', 'The calendar app. It is the simplest and the fastest.'], ['Friend', 'What is the least useful app?'], ['You', 'The shopping app. I almost never open it.']],
                [['Mom', 'Who made the best dessert?'], ['Son', 'Grandma did. Her cake was the softest.'], ['Mom', 'And the sweetest?'], ['Son', 'The chocolate pie was the sweetest.']],
                [['Coworker', 'What was the hardest part of the project?'], ['You', 'The first meeting was the hardest.'], ['Coworker', 'And the easiest part?'], ['You', 'Sending the final file was the easiest.']]
            ]
        },
        5: {
            intro: [['Host', 'Do we have enough coffee for everyone?'], ['You', 'We have some coffee, but only a few cups.'], ['Host', 'How many people are coming?'], ['You', 'About twelve, so we need a few more chairs too.'], ['Host', 'Can you buy a pack of cups and a little milk?'], ['You', 'Sure. I will go to the supermarket now.']],
            dialogues: [
                [['Coworker', 'Do we have enough chairs for the meeting?'], ['You', 'We have several chairs, but not enough tables.'], ['Coworker', 'How much time do we have?'], ['You', 'Only a little time, so let us move fast.']],
                [['Roommate', 'Is there any rice left?'], ['You', 'There is a little rice, but there are not many vegetables.'], ['Roommate', 'Should I buy some?'], ['You', 'Yes, buy a few carrots and an onion.']],
                [['Customer', 'I need a notebook and a pen.'], ['Seller', 'The notebooks are on the shelf. The pens are near the register.'], ['Customer', 'Do you have any blue pens?'], ['Seller', 'Yes, we have a few.']],
                [['Ana', 'Did you read the information?'], ['Leo', 'Yes, but there was too much detail.'], ['Ana', 'Was there enough time?'], ['Leo', 'No, we had very little time before the call.']]
            ]
        },
        6: {
            intro: [['Neighbor', 'What were you doing when you heard the noise?'], ['You', 'I was cooking dinner and listening to music.'], ['Neighbor', 'Was anyone outside?'], ['You', 'Two people were walking past the house.'], ['Neighbor', 'Did you check the window?'], ['You', 'Yes. The wind was moving the tree against the glass.']],
            dialogues: [
                [['Mom', 'Why did you miss my call?'], ['Son', 'I was driving, so I could not answer.'], ['Mom', 'Were you going home?'], ['Son', 'Yes, I was coming from the supermarket.']],
                [['Friend', 'Why was the kitchen so messy?'], ['You', 'I was making pasta while my brother was making dessert.'], ['Friend', 'That sounds busy.'], ['You', 'It was, but dinner was good.']],
                [['Coworker', 'Did you see the message at nine?'], ['You', 'No, I was presenting the numbers to the team.'], ['Coworker', 'Were people listening?'], ['You', 'Yes, everyone was taking notes.']],
                [['Ana', 'Why were your shoes wet?'], ['Leo', 'I was walking home when it started raining.'], ['Ana', 'Did you have an umbrella?'], ['Leo', 'No, and the wind was blowing hard.']]
            ]
        },
        7: {
            intro: [['Manager', 'What happened during the presentation?'], ['Marta', 'I was showing the final numbers when the projector stopped working.'], ['Manager', 'What did you do?'], ['Marta', 'I opened the report on my laptop and continued.'], ['Manager', 'Were people still following?'], ['Marta', 'Yes. They were looking at the screen and asking good questions.']],
            dialogues: [
                [['Friend', 'Why did you stop cooking?'], ['You', 'I was cutting vegetables when the phone rang.'], ['Friend', 'Was it important?'], ['You', 'Yes, my manager needed a quick answer.']],
                [['Dad', 'Why did the kids wake up?'], ['Mom', 'They were sleeping when the dog started barking.'], ['Dad', 'Did you see anything outside?'], ['Mom', 'No, just a delivery person at the gate.']],
                [['Passenger', 'Why did the train stop?'], ['Worker', 'We were leaving the station when a warning light turned on.'], ['Passenger', 'How long did we wait?'], ['Worker', 'About ten minutes.']],
                [['Ana', 'Why is your shirt dirty?'], ['Leo', 'I was carrying coffee when someone bumped into me.'], ['Ana', 'Did it spill everywhere?'], ['Leo', 'Luckily, only on my sleeve.']]
            ]
        },
        8: {
            intro: [['Friend', 'Your trip sounded stressful. What happened?'], ['You', 'First, our flight was delayed. Then we missed the bus to the hotel.'], ['Friend', 'Were you waiting at the airport for long?'], ['You', 'Yes, we were waiting when the airline changed the gate again.'], ['Friend', 'How did the day end?'], ['You', 'We arrived late, but the hotel gave us a better room.']],
            dialogues: [
                [['Brother', 'Did you fix the laptop?'], ['Sister', 'Yes. It was updating when the battery died.'], ['Brother', 'What did you do?'], ['Sister', 'I charged it, restarted it, and saved the files.']],
                [['Host', 'How was the dinner?'], ['Guest', 'Great, but the oven stopped while we were baking the potatoes.'], ['Host', 'Did you finish them?'], ['Guest', 'Yes, we used a smaller oven.']],
                [['Coworker', 'Why did the meeting start late?'], ['You', 'People were joining the call when the internet went down.'], ['Coworker', 'Did everyone come back?'], ['You', 'Yes, after ten minutes.']],
                [['Friend', 'Did you find your bag?'], ['You', 'Yes. I was looking near the café when a guard called my name.'], ['Friend', 'Where was it?'], ['You', 'Behind the front desk.']]
            ]
        },
        9: {
            intro: [['Mia', 'Are you still going to have the picnic in the park?'], ['Dan', 'No. Look at those dark clouds. It is going to rain.'], ['Mia', 'What are you going to do instead?'], ['Dan', 'We are going to move everything to my apartment and prepare the living room tonight.'], ['Mia', 'Are you going to cancel any part of the plan?'], ['Dan', 'Only the outdoor games. We are going to follow through with the lunch and board games.']],
            dialogues: [
                [['Friend', 'What are you going to change in the kitchen first?'], ['You', 'I am going to replace the broken shelf on Saturday.'], ['Friend', 'Why are you going to do that first?'], ['You', 'Because the wood is starting to bend, and the glasses could fall.']],
                [['Mom', 'The cake is already leaning to one side.'], ['Son', 'It is going to fall if we move it now.'], ['Mom', 'How are you going to carry it?'], ['Son', 'I am going to put it in a larger box and ask Nina to hold it.']],
                [['Coworker', 'What are we going to prepare before the client arrives?'], ['You', 'I am going to print the figures, and Jo is going to test the projector.'], ['Coworker', 'When are you going to map out the presentation?'], ['You', 'This afternoon, so we can follow through with the final plan tomorrow.']],
                [['Ana', 'How are you going to reduce your monthly expenses?'], ['Leo', 'I am going to cancel one subscription and take lunch to work.'], ['Ana', 'Are you going to set a weekly limit too?'], ['Leo', 'Yes. I have mapped out the first four weeks already.']]
            ]
        },
        10: {
            intro: [['Coworker', 'The client needs the file now.'], ['You', 'I will send it in five minutes.'], ['Coworker', 'Do you think they will approve the design?'], ['You', 'I think they will like the clean version.'], ['Coworker', 'Can you call them after lunch?'], ['You', 'Sure. I will call and explain the changes.']],
            dialogues: [
                [['Friend', 'It is raining hard.'], ['You', 'I will drive you home.'], ['Friend', 'Are you sure?'], ['You', 'Yes, it will be safer than walking.']],
                [['Mom', 'The bags are heavy.'], ['Son', 'I will carry them for you.'], ['Mom', 'Thank you.'], ['Son', 'No problem. I will put them in the kitchen.']],
                [['Manager', 'Do you think the meeting will be difficult?'], ['Assistant', 'It will be fine if we show the numbers clearly.'], ['Manager', 'Good.'], ['Assistant', 'I will prepare the first slide.']],
                [['Ana', 'I forgot my umbrella.'], ['Leo', 'I will lend you mine.'], ['Ana', 'But what about you?'], ['Leo', 'I will take a taxi later.']]
            ]
        },
        11: {
            intro: [['Mia', 'What are you doing after work?'], ['Dan', 'I am meeting my sister at seven.'], ['Mia', 'Where are you meeting her?'], ['Dan', 'At the Italian restaurant downtown.'], ['Mia', 'Are you doing anything before that?'], ['Dan', 'Yes, I am picking up a cake at six.']],
            dialogues: [
                [['Receptionist', 'Are you seeing Dr. Lima tomorrow?'], ['Patient', 'Yes, I am seeing her at nine.'], ['Receptionist', 'Please arrive ten minutes early.'], ['Patient', 'Sure, I am taking the first bus.']],
                [['Coworker', 'Are we having lunch with Paula today?'], ['You', 'Yes, we are meeting her at noon.'], ['Coworker', 'Where?'], ['You', 'At the café across from the office.']],
                [['Friend', 'Are you traveling this Friday?'], ['You', 'Yes, I am flying to Recife in the morning.'], ['Friend', 'Who is picking you up?'], ['You', 'My cousin is meeting me at the airport.']],
                [['Ana', 'What are you doing tonight?'], ['Leo', 'I am studying with Bruno at the library.'], ['Ana', 'Is it a fixed plan?'], ['Leo', 'Yes, we booked a study room.']]
            ]
        },
        12: {
            intro: [['Assistant', 'The presentation is next week. What is the plan?'], ['Julia', 'I am meeting Pedro on Monday to organize the slides.'], ['Assistant', 'Are you going to rehearse?'], ['Julia', 'Yes, we are going to rehearse twice.'], ['Assistant', 'Do you think it will go well?'], ['Julia', 'Yes, I think the client will understand the idea.']],
            dialogues: [
                [['Friend', 'What are you doing this weekend?'], ['You', 'I am visiting my parents on Saturday.'], ['Friend', 'Are you going to stay overnight?'], ['You', 'No, I will come back after dinner.']],
                [['Manager', 'The client changed the time.'], ['You', 'No problem. I will update the calendar.'], ['Manager', 'Are we meeting at two now?'], ['You', 'Yes, and I am going to send a reminder.']],
                [['Sister', 'Are you going to buy a gift today?'], ['Brother', 'Yes, I am going to buy it after work.'], ['Sister', 'Will you wrap it too?'], ['Brother', 'Yes, I will do it tonight.']],
                [['Neighbor', 'The sink is leaking.'], ['You', 'I will call the plumber now.'], ['Neighbor', 'Is he coming today?'], ['You', 'He is coming at four.']]
            ]
        },
        13: {
            intro: [['Neighbor', 'Could I borrow your charger for a few minutes?'], ['You', 'Sure, but I need it back before I leave.'], ['Neighbor', 'Of course. Can I use the outlet near the sofa?'], ['You', 'Yes, go ahead.'], ['Neighbor', 'Could you text me when you need it?'], ['You', 'No problem. I will message you.']],
            dialogues: [
                [['Guest', 'Could I open the window?'], ['Host', 'Of course. It is warm in here.'], ['Guest', 'Thanks. Can I move this chair too?'], ['Host', 'Sure, go ahead.']],
                [['Employee', 'Can I leave five minutes early today?'], ['Manager', 'Yes, but please send the report first.'], ['Employee', 'Could I send it by email?'], ['Manager', 'Yes, that is fine.']],
                [['Friend', 'Could I use your phone?'], ['You', 'Sure. Is everything okay?'], ['Friend', 'Yes, my battery died.'], ['You', 'No problem. Take your time.']],
                [['Customer', 'Can I try this jacket on?'], ['Seller', 'Yes, the fitting room is on the left.'], ['Customer', 'Could you hold my bag for a second?'], ['Seller', 'Of course.']]
            ]
        },
        14: {
            intro: [['Receptionist', 'You have to sign in before you go upstairs.'], ['Visitor', 'No problem. Do I need to show my ID?'], ['Receptionist', 'Yes, all visitors must show ID.'], ['Visitor', 'Do I have to wear this badge?'], ['Receptionist', 'Yes, please. You need to keep it visible.'], ['Visitor', 'Got it. I will follow the rules.']],
            dialogues: [
                [['Airport Agent', 'You must remove your laptop from the bag.'], ['Traveler', 'Do I have to remove my shoes too?'], ['Airport Agent', 'Not today. Just place the laptop in the tray.'], ['Traveler', 'Okay.']],
                [['Manager', 'We need to finish this by three.'], ['Employee', 'Do I have to call the supplier now?'], ['Manager', 'Yes, we need the answer before lunch.'], ['Employee', 'I will call them.']],
                [['Hotel Clerk', 'You have to check out by noon.'], ['Guest', 'Can I leave my bags here after that?'], ['Hotel Clerk', 'Yes, but you must keep the ticket.'], ['Guest', 'Thank you.']],
                [['Dad', 'You need to take your medicine after dinner.'], ['Daughter', 'Do I have to take it with water?'], ['Dad', 'Yes, and you must not skip it.'], ['Daughter', 'Okay.']]
            ]
        },
        15: {
            intro: [['Friend', 'I feel overwhelmed. I have twelve tasks and everything seems urgent.'], ['You', 'Maybe you should choose one priority before you answer any messages.'], ['Friend', 'Should I try to finish the whole list tonight?'], ['You', 'I do not think you should. That plan is not realistic after a full day of work.'], ['Friend', 'What would you do first?'], ['You', 'If I were you, I would finish the report, move two tasks to tomorrow, and set a boundary for the evening.']],
            dialogues: [
                [['Ana', 'I cannot finish all three presentations today.'], ['Leo', 'Maybe you should ask which one is the priority.'], ['Ana', 'I do not want to sound unprepared.'], ['Leo', 'You could explain your workload and suggest a realistic deadline.']],
                [['Brother', 'I keep checking work messages during dinner.'], ['Sister', 'If I were you, I would turn off notifications for one hour.'], ['Brother', 'What if my manager needs me?'], ['Sister', 'You could tell the team when you will be available again. That is a clear boundary.']],
                [['Coworker', 'I am nervous about tomorrow\'s interview.'], ['You', 'You should prepare two specific examples because they are easier to remember.'], ['Coworker', 'Should I practice every possible question?'], ['You', 'I do not think you should. Choose five common questions and keep the plan manageable.']],
                [['Friend', 'I missed two workouts, so I want to train for three hours tonight.'], ['You', 'Maybe you should start with thirty minutes.'], ['Friend', 'That feels too short.'], ['You', 'A balanced routine is more useful than one exhausting session.']]
            ]
        },
        16: {
            intro: [['Visitor', 'Can I go upstairs now?'], ['Receptionist', 'You can, but you must wear this badge.'], ['Visitor', 'Do I have to sign another form?'], ['Receptionist', 'No, you already did.'], ['Visitor', 'Should I wait near the elevator?'], ['Receptionist', 'Yes, and someone will meet you there.']],
            dialogues: [
                [['Library Assistant', 'You must be quiet in this room.'], ['Visitor', 'Can I take a phone call outside?'], ['Library Assistant', 'Yes, but you should take your bag with you.'], ['Visitor', 'Okay.']],
                [['Neighbor', 'Could you help me move this table?'], ['You', 'Sure, but we should lift it carefully.'], ['Neighbor', 'Do we have to move the chairs first?'], ['You', 'Yes, that will be easier.']],
                [['Airport Agent', 'You need to show your passport.'], ['Traveler', 'Can I use the digital copy?'], ['Airport Agent', 'No, you must show the original.'], ['Traveler', 'I have it here.']],
                [['Manager', 'We have to finish before six.'], ['Employee', 'Should I call the client now?'], ['Manager', 'Yes, and could you send the summary after?'], ['Employee', 'Of course.']]
            ]
        },
        17: {
            intro: [['Friend', 'Have you ever traveled alone?'], ['You', 'No, I have never traveled alone.'], ['Friend', 'Would you like to try it?'], ['You', 'Yes. I have saved some money for a short trip.'], ['Friend', 'Where would you go first?'], ['You', 'I think I would visit Curitiba because I have never been there.']],
            dialogues: [
                [['Ana', 'Have you ever tried Thai food?'], ['Leo', 'Yes, I have tried it once.'], ['Ana', 'Did you like it?'], ['Leo', 'Yes, but I have never cooked it at home.']],
                [['Coworker', 'Have you worked with international clients before?'], ['You', 'Yes, I have spoken with clients from Chile and Canada.'], ['Coworker', 'That is useful.'], ['You', 'It has helped my confidence.']],
                [['Friend', 'Have you ever sung in public?'], ['You', 'No, I have never done that.'], ['Friend', 'Would you try karaoke?'], ['You', 'Maybe, if the room is small.']],
                [['Brother', 'Have you visited that museum?'], ['Sister', 'Yes, I have been there twice.'], ['Brother', 'Is it worth it?'], ['Sister', 'Yes, especially the photography room.']]
            ]
        },
        18: {
            intro: [['Manager', 'Have you sent the report yet?'], ['Employee', 'Yes, I have already sent it.'], ['Manager', 'Has the client replied?'], ['Employee', 'Not yet, but I have already scheduled a follow-up.'], ['Manager', 'Good. Have you checked the numbers?'], ['Employee', 'Yes, I have checked them twice.']],
            dialogues: [
                [['Mom', 'Have you eaten yet?'], ['Son', 'Not yet. I have already set the table.'], ['Mom', 'Good. Have you washed your hands?'], ['Son', 'Yes, already.']],
                [['Friend', 'Have you watched the new episode yet?'], ['You', 'No, not yet.'], ['Friend', 'I have already watched it.'], ['You', 'Do not tell me the ending.']],
                [['Assistant', 'Have the guests arrived yet?'], ['Host', 'Two people have already arrived.'], ['Assistant', 'Has Paula come yet?'], ['Host', 'Not yet. She said she is on the way.']],
                [['Ana', 'Have you packed your bag yet?'], ['Leo', 'Almost. I have already packed my clothes.'], ['Ana', 'What about your passport?'], ['Leo', 'I have not found it yet.']]
            ]
        },
        19: {
            intro: [['Friend', 'Have you been to Recife?'], ['You', 'Yes, I have been there before.'], ['Friend', 'When did you go?'], ['You', 'I went in 2022 for a work event.'], ['Friend', 'Did you have time to see the city?'], ['You', 'Yes. I visited the old town and had dinner near the beach.']],
            dialogues: [
                [['Coworker', 'Have you sent the file?'], ['You', 'Yes, I have sent it.'], ['Coworker', 'When did you send it?'], ['You', 'I sent it at nine this morning.']],
                [['Ana', 'Have you tried that bakery?'], ['Leo', 'Yes, I have tried it.'], ['Ana', 'When did you go?'], ['Leo', 'I went last Saturday.']],
                [['Brother', 'Have you lost your keys again?'], ['Sister', 'No, but I lost them yesterday for ten minutes.'], ['Brother', 'Where did you find them?'], ['Sister', 'I found them under the sofa.']],
                [['Manager', 'Have you worked with Paula before?'], ['Employee', 'Yes, I have.'], ['Manager', 'When did you work with her?'], ['Employee', 'We worked together last year.']]
            ]
        },
        20: {
            intro: [['Ana', 'Where is Bruno?'], ['Leo', 'He has gone to the pharmacy.'], ['Ana', 'So he is not back yet?'], ['Leo', 'Exactly. He has gone there to buy medicine.'], ['Ana', 'Has he been there before?'], ['Leo', 'Yes, he has been there many times, so he knows the way.']],
            dialogues: [
                [['Mom', 'Where is your sister?'], ['Son', 'She has gone to the supermarket.'], ['Mom', 'Is she coming back soon?'], ['Son', 'Yes, she only needed milk.']],
                [['Friend', 'Have you been to London?'], ['You', 'Yes, I have been there once.'], ['Friend', 'Is your brother there now?'], ['You', 'Yes, he has gone to London for work.']],
                [['Receptionist', 'Where is Dr. Lima?'], ['Nurse', 'She has gone to room three.'], ['Receptionist', 'Has she been there long?'], ['Nurse', 'No, just two minutes.']],
                [['Dad', 'Where are the kids?'], ['Mom', 'They have gone to the park.'], ['Dad', 'Have they been there before alone?'], ['Mom', 'Yes, but only in the afternoon.']]
            ]
        },
        21: {
            intro: [['Friend', 'How are you feeling today? Has the medicine helped?'], ['You', 'The fever has already gone down, but I still feel weak and congested.'], ['Friend', 'Has the cough improved yet?'], ['You', 'Not really. It has got a little worse since last night.'], ['Friend', 'You should call the clinic if it keeps getting worse.'], ['You', 'I will. I am going to wait until noon and check my temperature again.']],
            dialogues: [
                [['Friend', 'Is your ankle still swollen?'], ['You', 'A little, but the pain has improved since yesterday.'], ['Friend', 'Can you walk on it now?'], ['You', 'Yes, but I am still avoiding the stairs.']],
                [['Mom', 'Has the rash cleared up yet?'], ['Daughter', 'No. It flared up again after lunch.'], ['Mom', 'Has it spread?'], ['Daughter', 'Yes, so I am going to call the clinic.']],
                [['Coworker', 'Are you coming back tomorrow?'], ['You', 'Probably. I have got over the fever, but I still feel weak.'], ['Coworker', 'Take another day if you need it.'], ['You', 'Thanks. I will see how I feel this evening.']],
                [['Customer', 'The pain returned about an hour after I took the tablet.'], ['Pharmacist', 'The effect may have worn off. Is the pain mild or severe now?'], ['Customer', 'It is still mild.'], ['Pharmacist', 'Follow the instructions on the package, and contact a doctor if it gets worse.']]
            ]
        },
        22: {
            intro: [['Doctor', 'How long have you had this cough?'], ['Patient', 'For four days.'], ['Doctor', 'Have you had a fever too?'], ['Patient', 'Yes, it started yesterday.'], ['Doctor', 'Is the cough mild or severe?'], ['Patient', 'It is mild during the day, but it gets worse at night.']],
            dialogues: [
                [['Receptionist', 'What seems to be the problem?'], ['Patient', 'I have had back pain since Friday.'], ['Receptionist', 'Can you come at two?'], ['Patient', 'Yes, that works.']],
                [['Doctor', 'How long have you felt dizzy?'], ['Patient', 'Since this morning.'], ['Doctor', 'Have you eaten today?'], ['Patient', 'Only a small breakfast.']],
                [['Nurse', 'Has the medicine helped?'], ['Patient', 'A little. The fever has gone down.'], ['Nurse', 'Any side effects?'], ['Patient', 'No, just sleepy.']],
                [['Doctor', 'When did the headache start?'], ['Patient', 'It started after lunch.'], ['Doctor', 'Have you had enough water today?'], ['Patient', 'Probably not.']]
            ]
        },
        23: {
            intro: [['Courier', 'I have a package for the design office. Where should I leave it?'], ['Receptionist', 'Leave it at the front desk in the main lobby.'], ['Courier', 'Is the design office on this floor?'], ['Receptionist', 'No, it is on the second floor, on the left-hand side of the elevator.'], ['Courier', 'Should I wait inside or outside the office?'], ['Receptionist', 'Inside, please. There is a small waiting area in the corner.']],
            dialogues: [
                [['Guest', 'Where is breakfast served?'], ['Clerk', 'In the dining room on the ground floor.'], ['Guest', 'Is it near reception?'], ['Clerk', 'Yes. The entrance is at the back of the lobby.']],
                [['Customer', 'Is the new café on Market Street?'], ['Local', 'Yes, at the corner of Market Street and Hill Road.'], ['Customer', 'Is there seating outside?'], ['Local', 'Yes, and there are more tables inside near the window.']],
                [['Tenant', 'Where should I put this plant?'], ['Roommate', 'Put it in the corner of the living room.'], ['Tenant', 'On the left-hand side of the bookcase?'], ['Roommate', 'Exactly. It will get more light there.']],
                [['Visitor', 'I am at the front desk. How do I find room 204?'], ['Receptionist', 'Take the elevator to the second floor.'], ['Visitor', 'Is the room on the right?'], ['Receptionist', 'No, it is on the left-hand side, at the end of the hall.']]
            ]
        },
        24: {
            intro: [['Carla', 'Meet me at the museum entrance at noon on Monday.'], ['Friend', 'How do I get there from the station?'], ['Carla', 'Walk past the bank and turn left at the corner.'], ['Friend', 'Is the museum entrance across from the parking lot?'], ['Carla', 'Yes, and it is next to the café.'], ['Friend', 'Perfect. I will be there before noon.']],
            dialogues: [
                [['Tourist', 'Is there a bus stop nearby?'], ['Local', 'Yes, it is around the corner.'], ['Tourist', 'On this street?'], ['Local', 'No, on Green Street.']],
                [['Friend', 'When is the appointment?'], ['You', 'At noon on Monday.'], ['Friend', 'Where do we meet?'], ['You', 'At the main entrance.']],
                [['Driver', 'Do I go through the tunnel?'], ['Passenger', 'No, go past the museum and across the bridge.'], ['Driver', 'Then left?'], ['Passenger', 'Yes, at the corner.']],
                [['Ana', 'Where is the office?'], ['Leo', 'It is in the blue building, on the second floor.'], ['Ana', 'Near the elevator?'], ['Leo', 'Yes, next to it.']]
            ]
        },
        25: {
            intro: [['Friend', 'How do I get to the station from here?'], ['You', 'Walk through the park and go across the bridge.'], ['Friend', 'Do I go into the mall?'], ['You', 'No, go past the mall and toward the traffic lights.'], ['Friend', 'Then what?'], ['You', 'Walk along the river for two minutes. The station is on the right.']],
            dialogues: [
                [['Runner', 'Which route do you take?'], ['Coach', 'Run along the river and through the park.'], ['Runner', 'Do I go across the bridge?'], ['Coach', 'Yes, then come back toward the gym.']],
                [['Traveler', 'How do I leave the platform?'], ['Worker', 'Go out of this door and down the stairs.'], ['Traveler', 'Into the main hall?'], ['Worker', 'Yes, then follow the signs.']],
                [['Dad', 'Where did the dog run?'], ['Son', 'It ran across the street and into the garden.'], ['Dad', 'Did it go through the gate?'], ['Son', 'Yes, but I closed it after.']],
                [['Friend', 'Did you walk home?'], ['You', 'Yes, I walked past the supermarket and along the canal.'], ['Friend', 'Was it far?'], ['You', 'No, about fifteen minutes.']]
            ]
        },
        26: {
            intro: [['Manager', 'Can you send the final schedule by Friday?'], ['Assistant', 'Yes. I will finish the first version before lunch tomorrow.'], ['Manager', 'The venue is holding our reservation until noon on Friday.'], ['Assistant', 'Then I will ask everyone to reply within two days.'], ['Manager', 'Good. Are you available during the planning meeting?'], ['Assistant', 'Yes, from nine to eleven. I can make the changes after that.']],
            dialogues: [
                [['Customer', 'How long will the repair take?'], ['Technician', 'We will finish it within three business days.'], ['Customer', 'Can I use the computer until then?'], ['Technician', 'No, we need to keep it here during the repair.']],
                [['Manager', 'Can you finish the figures by noon?'], ['Employee', 'I can send the first table before eleven.'], ['Manager', 'I will be in a meeting from eleven to twelve.'], ['Employee', 'No problem. I will send the final version after the meeting.']],
                [['Friend', 'How long is the food festival open?'], ['You', 'From ten in the morning to eight at night.'], ['Friend', 'Should we arrive before lunch?'], ['You', 'Yes. It gets crowded during the afternoon.']],
                [['Receptionist', 'We can hold the appointment until four.'], ['Patient', 'I am running late. Can I arrive within twenty minutes?'], ['Receptionist', 'Yes, but please call again if you cannot get here by four.'], ['Patient', 'I will. Thank you.']]
            ]
        },
        27: {
            intro: [['Traveler', 'Excuse me, how do I get to the train station from here?'], ['Local', 'First, cross at the pedestrian crossing and keep going to the roundabout.'], ['Traveler', 'Which exit should I take?'], ['Local', 'Take the second exit, then turn left after the public library.'], ['Traveler', 'Is the station entrance before or after the parking garage?'], ['Local', 'Just after it, on your right.'], ['Traveler', 'So I take the second exit and turn left after the library, right?'], ['Local', 'Exactly. The clock tower is the last landmark before the entrance.']],
            dialogues: [
                [['Driver', 'How do I reach the underground parking area?'], ['Passenger', 'Keep going to the roundabout and take the first exit.'], ['Driver', 'Do I turn before the hotel?'], ['Passenger', 'No, turn after it and pull over beside the blue sign.']],
                [['Caller', 'I am at the hospital entrance. How do I find the X-ray department?'], ['Receptionist', 'Cross the main lobby and take the second left after the elevators.'], ['Caller', 'Is that before the café?'], ['Receptionist', 'Yes. The department is just before the café, opposite room 12.']],
                [['Shopper', 'How do I get to the electronics store from here?'], ['Assistant', 'Use the north exit and cross over to the other building.'], ['Shopper', 'Then do I take the escalator?'], ['Assistant', 'Yes. Go up one floor, take the second left, and it is beside the bookstore.']],
                [['Friend', 'Can you explain the route to your apartment again?'], ['You', 'First, cross at the pedestrian crossing. Then keep going past the pharmacy.'], ['Friend', 'Do I turn before or after the bakery?'], ['You', 'After the bakery. Take the second left, and my building is at the end of the street.'], ['Friend', 'Second left after the bakery, right?'], ['You', 'Right.']]
            ]
        },
        28: {
            intro: [['Guest', 'Hi, I have a reservation under Ana Lima.'], ['Receptionist', 'Welcome. May I see your ID, please?'], ['Guest', 'Of course. Is breakfast included?'], ['Receptionist', 'Yes, breakfast is served until ten.'], ['Guest', 'Great. Also, my key card is not working.'], ['Receptionist', 'No problem. I will sort it out now.']],
            dialogues: [
                [['Guest', 'Could I have another towel, please?'], ['Housekeeper', 'Sure. I will bring one in a minute.'], ['Guest', 'Thank you.'], ['Housekeeper', 'Anything else?']],
                [['Guest', 'The shower is not working.'], ['Receptionist', 'I am sorry. I will call maintenance.'], ['Guest', 'Could someone come soon?'], ['Receptionist', 'Yes, within ten minutes.']],
                [['Guest', 'What time is check-out?'], ['Receptionist', 'Check-out is at noon.'], ['Guest', 'Can I leave my bags here?'], ['Receptionist', 'Yes, at reception.']],
                [['Guest', 'Is room service available tonight?'], ['Receptionist', 'Yes, until eleven.'], ['Guest', 'Could I see the menu?'], ['Receptionist', 'Of course.']]
            ]
        },
        29: {
            intro: [['Roommate', 'Do you mind cooking tonight?'], ['You', 'I do not mind cooking, but I want to finish work first.'], ['Roommate', 'I can help by washing the dishes.'], ['You', 'Great. I decided to make pasta.'], ['Roommate', 'Do you enjoy cooking after work?'], ['You', 'Sometimes. I prefer cooking when the kitchen is quiet.']],
            dialogues: [
                [['Friend', 'Do you enjoy running?'], ['You', 'I enjoy running in the morning.'], ['Friend', 'Do you avoid running at night?'], ['You', 'Yes, I avoid running late.']],
                [['Manager', 'Did you finish checking the file?'], ['Employee', 'Yes, and I plan to send it today.'], ['Manager', 'Good. Do you want to call the client first?'], ['Employee', 'Yes, I hope to call before lunch.']],
                [['Customer', 'Do you mind waiting five minutes?'], ['You', 'No, I do not mind waiting.'], ['Customer', 'Thank you.'], ['You', 'I need to answer one message anyway.']],
                [['Ana', 'Why did you stop using that app?'], ['Leo', 'I stopped using it because it was slow.'], ['Ana', 'Are you going to try another one?'], ['Leo', 'Yes, I want to test a simpler app.']]
            ]
        },
        30: {
            intro: [['Friend', 'Are we still going to the outdoor market tomorrow?'], ['You', 'If the weather is good, we will go in the morning.'], ['Friend', 'What will we do if it rains?'], ['You', 'If it rains, we will visit the indoor market instead.'], ['Friend', 'Do you always change the plan when the weather is bad?'], ['You', 'Yes. If the weather changes, we choose a place indoors.']],
            dialogues: [
                [['Friend', 'What do you do if you sleep badly?'], ['You', 'If I sleep badly, I drink less coffee the next day.'], ['Friend', 'Does that help?'], ['You', 'Yes, a little.']],
                [['Mom', 'What will you do if it rains?'], ['Son', 'If it rains, I will take the bus.'], ['Mom', 'And if it is sunny?'], ['Son', 'I will walk.']],
                [['Coworker', 'If the client calls, what should I say?'], ['You', 'If the client calls, tell her I will call back.'], ['Coworker', 'Okay.'], ['You', 'I will be free after two.']],
                [['Ana', 'If we save money, we can travel.'], ['Leo', 'Yes, if we cook at home, we will spend less.'], ['Ana', 'Good plan.'], ['Leo', 'Small changes help.']]
            ]
        },
        31: {
            intro: [['Friend', 'Are you going to apply for the job?'], ['You', 'Yes. Unless I try, I will miss the opportunity.'], ['Friend', 'I hope you get an interview.'], ['You', 'Me too. I wish I had more confidence.'], ['Friend', 'You can prepare this weekend.'], ['You', 'Good idea. If I practice, I will feel better.']],
            dialogues: [
                [['Mom', 'We will miss the train unless we leave now.'], ['Son', 'I am ready.'], ['Mom', 'Do you have your ticket?'], ['Son', 'Yes, it is in my bag.']],
                [['Coworker', 'I hope the meeting goes well.'], ['You', 'It will, unless the client changes the plan again.'], ['Coworker', 'I wish we had more time.'], ['You', 'Me too, but we are prepared.']],
                [['Friend', 'I wish I had a free weekend.'], ['You', 'What would you do?'], ['Friend', 'I would visit my family.'], ['You', 'I hope you can go soon.']],
                [['Ana', 'Unless we book today, the price will go up.'], ['Leo', 'Then let us book now.'], ['Ana', 'I hope the hotel is good.'], ['Leo', 'The reviews look great.']]
            ]
        },
        32: {
            intro: [['Friend', 'Are you ready for your weekend trip?'], ['You', 'Almost. I have already booked the hotel, but I have not packed yet.'], ['Friend', 'Have you been to this city before?'], ['You', 'No, but I compared two routes and chose the faster one.'], ['Friend', 'What are you going to do if it rains?'], ['You', 'If it rains, I will visit the indoor market and the museum.']],
            dialogues: [
                [['Coach', 'What was your biggest challenge?'], ['You', 'Pronunciation was my biggest challenge.'], ['Coach', 'What strategy helped?'], ['You', 'Repeating short answers helped me notice mistakes.']],
                [['Friend', 'What can you do now that you could not do before?'], ['You', 'I can ask for help and explain problems.'], ['Friend', 'That is useful.'], ['You', 'Yes, especially at work.']],
                [['Mentor', 'What evidence shows your progress?'], ['You', 'I can tell past stories and talk about plans.'], ['Mentor', 'What still needs work?'], ['You', 'Listening to fast speech.']],
                [['Friend', 'What is your next step?'], ['You', 'My next step is daily speaking practice.'], ['Friend', 'How will you keep going?'], ['You', 'I will set a small goal every week.']]
            ]
        }
    };

    const readingUpgrades = {
        1: {
            title: 'The morning everything went wrong',
            text: `On Monday, Rafa woke up late because his alarm did not ring. He got dressed quickly, forgot his breakfast, and ran to the bus stop, but the bus left before he arrived. While he was waiting for the next one, he realized an important folder was still at home. Rafa called his manager, apologized, and explained the situation honestly. Then he borrowed a laptop at a café and sent a digital copy of the document. He reached the office twenty minutes before the client meeting. At the end of the day, his manager thanked him for solving the problem instead of hiding it.`,
            questions: [
                ['Why did Rafa wake up late?', 'Because his alarm did not ring.'],
                ['What did he realize at the bus stop?', 'He realized that an important folder was still at home.'],
                ['How did he send the document?', 'He borrowed a laptop at a café and sent a digital copy.'],
                ['What did his manager do at the end of the day?', 'His manager thanked him for solving the problem.']
            ]
        },
        2: {
            title: 'A trip that became a story',
            text: `Camila and her friend set off early for a weekend trip, but their train arrived forty minutes late. After they reached the city, the map on Camila's phone stopped working, so they walked in the wrong direction and got lost. They asked a vendor for help and came across a small market near the old town. The vendor showed them the correct street and recommended a local restaurant. First, they checked in at the hotel. Then they returned to the market for dinner. Finally, they watched a street concert in the square. The delay changed their plan, but the unexpected stops made the trip more memorable.`,
            questions: [
                ['Why did Camila and her friend get lost?', 'Because the map on Camila\'s phone stopped working.'],
                ['Who helped them find the correct street?', 'A vendor at the market helped them.'],
                ['What did they do after checking in?', 'They returned to the market for dinner.'],
                ['Why did the trip become memorable?', 'The unexpected stops led them to a market, a local restaurant, and a street concert.']
            ]
        },
        3: {
            title: 'Weighing up two evening courses',
            text: `Rafael compared two evening English courses before making a decision. The first course was a little cheaper and slightly closer to his apartment. However, its classes were much larger, and its schedule was not as flexible as the schedule at the second school. The second course was farther away, but the subway route was far more reliable than the bus route to the first school. Both courses offered just as much class time, yet the second one included smaller groups and clear catch-up notes. Rafael weighed up price, travel time, class size, and teacher support. In the end, he decided that the extra cost was worth it because the second course was less stressful for his routine.`,
            questions: [
                ['Which course was a little cheaper?', 'The first course was a little cheaper.'],
                ['Why was the route to the second school more reliable?', 'Because Rafael could take the subway instead of the bus.'],
                ['What did both courses offer in equal amounts?', 'They offered just as much class time.'],
                ['Why did Rafael think the extra cost was worth it?', 'Because the second course was less stressful for his routine.']
            ]
        },
        4: {
            title: 'The best place for a group meeting',
            text: `A group of students visited three cafes before choosing a place for their monthly meeting. The largest café had the most tables, but it was also the noisiest. The cheapest café was near the bus terminal, although its chairs were the least comfortable. The smallest café was farther from the station, but it had the friendliest staff, the quietest room, and the best internet connection. The group tested the internet, checked the menu, and asked about reservations. In the end, they selected the smallest café. It was not the biggest or the cheapest option, but it was the most suitable place for a long conversation.`,
            questions: [
                ['What was the problem with the largest café?', 'It was the noisiest café.'],
                ['Which café had the least comfortable chairs?', 'The cheapest café near the bus terminal.'],
                ['What did the group check before deciding?', 'They tested the internet, checked the menu, and asked about reservations.'],
                ['Which café did they select?', 'They selected the smallest café.']
            ]
        },
        5: {
            title: 'Buying the right amount',
            text: `Nina organized a workshop for eighteen people and prepared a careful shopping list. She counted the chairs, checked how much coffee was left, and asked whether any guests had food restrictions. At the store, she bought a few extra notebooks, several pens, some fruit, two bottles of juice, and enough water for everyone. She wanted a cake too, but the bakery did not have any small ones, so she chose a box of cookies instead. Nina kept the receipt and stayed within the budget. After the workshop, there was only a little fruit and some water left, so almost nothing went to waste.`,
            questions: [
                ['How many people were coming to the workshop?', 'Eighteen people were coming.'],
                ['What did Nina ask the guests about?', 'She asked whether they had any food restrictions.'],
                ['Why did she buy cookies instead of a cake?', 'Because the bakery did not have any small cakes.'],
                ['What was left after the workshop?', 'Only a little fruit and some water were left.']
            ]
        },
        6: {
            title: 'Before the announcement',
            text: `At nine o'clock, the office was unusually busy. Paula was answering customer emails, Bruno was checking a spreadsheet, and two interns were carrying boxes into the meeting room. Near the window, another employee was testing a projector while the receptionist was speaking to a visitor. It was raining heavily outside, so several people were arriving with wet coats and umbrellas. Nobody knew why the manager had called an urgent meeting. When she finally walked into the room, everyone became quiet. She smiled and announced that the company was opening a new branch. While people were listening, the interns brought in coffee and a large cake.`,
            questions: [
                ['What was Paula doing?', 'She was answering customer emails.'],
                ['Why were several people arriving with wet coats?', 'Because it was raining heavily outside.'],
                ['What happened when the manager entered?', 'Everyone became quiet.'],
                ['What did the manager announce?', 'She announced that the company was opening a new branch.']
            ]
        },
        7: {
            title: 'The interruption that changed the meeting',
            text: `Marta was presenting the final sales numbers when the projector suddenly stopped working. At first, she froze because everyone was waiting and her manager was looking at the blank screen. While a technician was checking the cable, Marta opened the report on her laptop and asked the group to move closer. She continued with the main results and invited questions instead of reading every slide. People were taking notes and discussing the figures when the projector came back on. Marta finished the presentation without using it. After the meeting, the client said the discussion was clearer and more useful than a normal slide presentation.`,
            questions: [
                ['What happened during Marta\'s presentation?', 'The projector suddenly stopped working.'],
                ['What was the technician doing?', 'The technician was checking the cable.'],
                ['How did Marta continue?', 'She used her laptop, invited the group closer, and discussed the results.'],
                ['What did the client say afterward?', 'The client said the discussion was clearer and more useful than a normal presentation.']
            ]
        },
        8: {
            title: 'A difficult trip with a good ending',
            text: `Leo and three friends planned a cheap weekend trip to see a concert. Their bus was less expensive than the train, but it was also slower. While they were traveling, the bus broke down outside a small town. The driver called another vehicle, and the passengers waited at a café across from the station. There were not many tables, but the owner brought a few extra chairs and enough water for everyone. The group missed the first song of the concert, yet they arrived before their favorite band played. At the hotel, they discovered that their room was larger and quieter than the one they originally booked.`,
            questions: [
                ['Why did the friends choose the bus?', 'Because it was cheaper than the train.'],
                ['Where did the passengers wait?', 'They waited at a café across from the station.'],
                ['What part of the concert did the group miss?', 'They missed the first song.'],
                ['How was the hotel room different?', 'It was larger and quieter than the room they originally booked.']
            ]
        },
        9: {
            title: 'Changing the plan before the rain',
            text: `On Thursday, Renata mapped out a neighborhood picnic for Saturday afternoon. She is going to prepare the food on Friday night, and two friends are going to bring tables and games on Saturday morning. However, the weather forecast now shows heavy rain, and dark clouds are already forming over the city. Renata thinks it is going to rain before the picnic begins. She is not going to cancel the event. Instead, she is going to move it to the community room in her building. She has sent the new address to every guest and is going to check the room after work. By changing the location early, Renata can follow through with the plan without waiting for the weather to ruin it.`,
            questions: [
                ['When is Renata going to prepare the food?', 'She is going to prepare it on Friday night.'],
                ['What present evidence suggests rain?', 'Dark clouds are already forming over the city.'],
                ['Is Renata going to cancel the event?', 'No. She is going to move it to the community room.'],
                ['What has she already sent to the guests?', 'She has sent them the new address.']
            ]
        },
        10: {
            title: 'A quick decision at work',
            text: `During a morning meeting, Clara's team discovered that an important document was missing. The client needed the information before lunch, and nobody had planned for the problem. Clara immediately said, "I will call the client and ask for another copy." Her manager offered to check the shared folder while another coworker promised to update the final page. Clara believed the client would answer quickly because they had worked together before. She called, explained the situation, and received the file ten minutes later. "I will save a backup this time," she said. The team finished the report, and the manager predicted the client would approve it that afternoon.`,
            questions: [
                ['What did the team discover?', 'They discovered that an important document was missing.'],
                ['What did Clara decide to do?', 'She decided to call the client and ask for another copy.'],
                ['Why did she expect a quick answer?', 'Because the team had worked with the client before.'],
                ['What did Clara promise to do next time?', 'She promised to save a backup.']
            ]
        },
        11: {
            title: 'A calendar full of arrangements',
            text: `Andre has a busy but organized week. On Tuesday evening, he is meeting a new student at the library. On Wednesday, he is having lunch with a colleague who is moving to another department. He is working from home on Thursday because a technician is repairing his internet connection. On Friday night, Andre and his sister are watching a play downtown, and they already have their tickets. He is picking her up at six thirty, and they are eating near the theater before the show. On Saturday, he is visiting his parents. Every arrangement has a time, a place, or another person involved, so his calendar is full but clear.`,
            questions: [
                ['Where is Andre meeting a student?', 'He is meeting the student at the library.'],
                ['Why is he working from home on Thursday?', 'Because a technician is repairing his internet connection.'],
                ['What are Andre and his sister doing on Friday?', 'They are watching a play downtown.'],
                ['What time is he picking up his sister?', 'He is picking her up at six thirty.']
            ]
        },
        12: {
            title: 'Preparing for next week',
            text: `Julia is preparing for an important presentation next Thursday. She is meeting her partner Pedro on Monday at nine to organize the slides. They are going to rehearse twice because they want the timing to feel natural. Julia thinks the client will like the proposal, but she expects several questions about the budget. On Wednesday, she is having a short call with the finance team to confirm the numbers. If a document is missing during the presentation, Pedro will open the backup folder. After the meeting, Julia is going to send a summary to everyone. The arrangements are confirmed, the preparation is planned, and the final result is still a prediction.`,
            questions: [
                ['When is Julia meeting Pedro?', 'She is meeting Pedro on Monday at nine.'],
                ['Why are they going to rehearse twice?', 'Because they want the timing to feel natural.'],
                ['What questions does Julia expect?', 'She expects questions about the budget.'],
                ['What will Pedro do if a document is missing?', 'He will open the backup folder.']
            ]
        },
        13: {
            title: 'A quiet afternoon at the library',
            text: `Aline went to the library to finish a group project. The main study area was full, so she approached the librarian and asked, "Could we use the small meeting room upstairs?" The librarian checked the schedule and gave permission, but asked the group to keep the door closed. Aline's laptop battery was low, so she asked another student, "Could I use the outlet near your chair for a few minutes?" Later, the group needed to play a short video with sound. They asked if that was allowed and learned that they could use a media room downstairs. Polite questions helped them solve each problem without disturbing anyone.`,
            questions: [
                ['Why did Aline speak to the librarian?', 'Because the main study area was full and she wanted to use a meeting room.'],
                ['What did the librarian ask the group to do?', 'The librarian asked them to keep the door closed.'],
                ['Why did Aline need an outlet?', 'Because her laptop battery was low.'],
                ['Where could the group play the video?', 'They could play it in a media room downstairs.']
            ]
        },
        14: {
            title: 'The rules at the testing center',
            text: `Pedro arrived at a testing center thirty minutes before his exam. At reception, he had to show his ID and confirm his registration. All candidates had to leave their bags in a locker, and they needed to turn off their phones. Pedro asked whether he had to print his confirmation email, but the receptionist said a digital copy was enough. Inside the room, candidates must not speak after the instructions begin. They can take water to their desks, but the bottle has to be transparent. Pedro first thought there were too many rules. Once the exam started, however, he understood that the same rules created a fair and quiet environment for everyone.`,
            questions: [
                ['What did Pedro have to show at reception?', 'He had to show his ID.'],
                ['Where did candidates leave their bags?', 'They left their bags in a locker.'],
                ['Did Pedro have to print the confirmation email?', 'No. A digital copy was enough.'],
                ['Why did he understand the rules later?', 'Because they created a fair and quiet environment.']
            ]
        },
        15: {
            title: 'Advice that was specific enough to use',
            text: `Tiago felt overwhelmed because he worked all day and tried to study for two hours every night. A friend simply told him to work harder, but that advice increased the pressure and gave him no clear first step. His teacher took a more supportive approach. She said, "Maybe you should choose one priority for each study session because your evenings are short." She also suggested reviewing five sentences before breakfast and preparing one short answer twice a week. Finally, she told him to set a boundary: after nine o'clock, he should close his books and rest. Tiago followed the manageable plan for a month. He missed fewer study days, remembered more vocabulary, and stopped feeling guilty about doing a shorter session.`,
            questions: [
                ['Why was the first friend\'s advice not useful?', 'It increased the pressure and gave Tiago no clear first step.'],
                ['What priority did the teacher recommend?', 'She recommended choosing one priority for each study session.'],
                ['What boundary did she suggest?', 'She suggested closing his books and resting after nine o\'clock.'],
                ['What changed after Tiago followed the plan?', 'He missed fewer study days, remembered more vocabulary, and felt less guilty.']
            ]
        },
        16: {
            title: 'The first day at a shared office',
            text: `Larissa visited a shared office for the first time because her home internet was not working. At reception, she had to show an ID and fill out a short form. She asked, "Could I sit near a window?" The receptionist said she could choose any free desk, but she must wear a visitor badge. During a video call, a coworker politely asked Larissa to speak more quietly. She apologized and moved to a phone booth. Later, she felt tired, and another visitor suggested, "You should take a break on the terrace." By lunchtime, Larissa understood the rules, used the space comfortably, and completed her work.`,
            questions: [
                ['Why did Larissa use the shared office?', 'Because her home internet was not working.'],
                ['What did she have to do at reception?', 'She had to show an ID and fill out a form.'],
                ['Why did she move to a phone booth?', 'Because someone asked her to speak more quietly.'],
                ['What advice did another visitor give her?', 'The visitor said she should take a break on the terrace.']
            ]
        },
        17: {
            title: 'Experience beyond travel',
            text: `Marina has never lived abroad, but she has used English in several real situations. She has helped international customers at work, joined online meetings with a Canadian team, and written messages to suppliers in Mexico. She has also made mistakes. Once, she misunderstood a delivery date, but she asked for clarification and solved the problem. Marina has taken two short courses and has practiced with a conversation group for six months. These experiences have changed the way she sees her ability. She has not become fluent yet, but she has built enough confidence to start conversations, ask follow-up questions, and continue when she does not know a word.`,
            questions: [
                ['Has Marina ever lived abroad?', 'No, she has never lived abroad.'],
                ['Who has she spoken to in online meetings?', 'She has spoken to a Canadian team.'],
                ['What happened when she misunderstood a delivery date?', 'She asked for clarification and solved the problem.'],
                ['What can she do more confidently now?', 'She can start conversations, ask follow-up questions, and continue speaking.']
            ]
        },
        18: {
            title: 'The list that keeps changing',
            text: `Lucas is organizing a small company event. By Thursday afternoon, he has already completed several important tasks. He has sent out the invitations, updated the guest list, and checked off the budget review. The caterer has already confirmed the menu, but the musician has not replied yet. Lucas has never organized an event alone, so he checks every detail twice. Two guests have not confirmed yet, and he still has to print the name cards. His manager asks, "Have you booked the projector yet?" Lucas looks at the list and realizes he has forgotten it. He sends the request immediately and adds one final reminder for Friday morning.`,
            questions: [
                ['Which tasks has Lucas already completed?', 'He has sent the invitations, updated the guest list, and reviewed the budget.'],
                ['Who has not replied yet?', 'The musician has not replied yet.'],
                ['Has Lucas organized an event alone before?', 'No, he has never organized one alone.'],
                ['What did he forget to book?', 'He forgot to book the projector.']
            ]
        },
        19: {
            title: 'Ana and the Chile project',
            text: `Ana has worked with several international teams, but one project in Chile is especially memorable. She traveled to Santiago in 2019 and stayed there for three weeks. During that trip, she visited two offices, trained a customer service team, and explored the city on weekends. Since then, Ana has returned to Chile twice, although she does not mention exact dates when she talks about her general experience. Last year, she worked with the same team online and helped them launch a new system. She has kept in touch with several colleagues from the project, and one of them visited Brazil last month. Ana met her for dinner and showed her around the city.`,
            questions: [
                ['When did Ana first travel to Santiago?', 'She first traveled there in 2019.'],
                ['What did she do during the first trip?', 'She visited offices, trained a team, and explored the city.'],
                ['How many times has she returned to Chile?', 'She has returned twice.'],
                ['What happened last month?', 'A colleague visited Brazil, and Ana met her for dinner.']
            ]
        },
        20: {
            title: 'Where is Clara?',
            text: `At lunchtime, two coworkers were looking for Clara because a delivery had arrived. Paulo said, "She has been to the new café across the street, so she probably knows its phone number." Renata checked Clara's desk and answered, "She has gone to the café now. Her coat and phone are not here." They called the café, and Clara answered. She had gone there to collect sandwiches for the team and was waiting for one final order. Paulo told her about the delivery, and she said she would get back in ten minutes. Clara has been to that café many times, but on this occasion she had gone there and was still away.`,
            questions: [
                ['Why were the coworkers looking for Clara?', 'Because a delivery had arrived.'],
                ['How did Renata know Clara was away?', 'Clara\'s coat and phone were not at her desk.'],
                ['Why had Clara gone to the café?', 'She had gone there to collect sandwiches for the team.'],
                ['When did Clara say she would return?', 'She said she would return in ten minutes.']
            ]
        },
        21: {
            title: 'A recovery that needed one more check',
            text: `Daniel came down with a cold on Monday and developed a mild fever that evening. By Wednesday, the fever had already gone down and his sore throat had improved. However, his cough had got worse, and he still felt congested after taking the medicine. On Thursday morning, a small rash appeared on his arm. Daniel waited for an hour, but the rash spread instead of clearing up. He called the clinic and described each change in order. The nurse said the medicine might have caused the rash and told him not to take another dose until a doctor checked it. Most of Daniel's symptoms were improving, but the new change required professional advice.`,
            questions: [
                ['Which symptoms had improved by Wednesday?', 'The fever had gone down and the sore throat had improved.'],
                ['Which symptom had got worse?', 'Daniel\'s cough had got worse.'],
                ['What new symptom appeared on Thursday?', 'A rash appeared on his arm.'],
                ['Why did the nurse tell him not to take another dose?', 'Because the medicine might have caused the rash.']
            ]
        },
        22: {
            title: 'A well-prepared consultation',
            text: `Before her appointment, Beatriz wrote down her symptoms, when they started, and what made them worse. During the consultation, she said, "I have had stomach pain for three days, and it gets worse after lunch." The doctor asked whether the pain was sharp or mild and whether she had any allergies. Beatriz explained that she had felt slightly dizzy since the previous evening but had not had a fever. The doctor examined her, recommended a simple treatment, and explained the correct dose. He also asked her to follow up in one week. Because Beatriz gave precise information, the consultation was calm, efficient, and easy to understand.`,
            questions: [
                ['How long had Beatriz had stomach pain?', 'She had had it for three days.'],
                ['When did the dizziness start?', 'It started the previous evening.'],
                ['Did she have a fever?', 'No, she did not have a fever.'],
                ['When did the doctor ask her to follow up?', 'He asked her to follow up in one week.']
            ]
        },
        23: {
            title: 'Delivering a package to the right office',
            text: `A courier arrived at a large medical building with a package for the finance office. The directory at the entrance said that finance was on the third floor, but it did not show which side of the building to use. At the front desk in the main lobby, the receptionist explained that the finance office was on the left-hand side of the elevators. She asked the courier to wait inside the office and leave the package on a small table in the corner. The courier first went to a desk at the back of the lobby by mistake. After checking the floor number again, he took the elevator and found the correct office. Precise location details prevented the package from being left at the wrong service point.`,
            questions: [
                ['Which floor was the finance office on?', 'It was on the third floor.'],
                ['Where did the receptionist give the directions?', 'She gave them at the front desk in the main lobby.'],
                ['Where should the courier leave the package?', 'He should leave it on a small table in the corner of the office.'],
                ['Where did the courier go by mistake?', 'He went to a desk at the back of the lobby.']
            ]
        },
        24: {
            title: 'A clinic visit in an unfamiliar neighborhood',
            text: `Carla had never visited the Westside Clinic, so she checked the address before leaving home. Her appointment was at noon on Monday, and she arrived in the neighborhood twenty minutes early. The clinic was on King Street, between a pharmacy and a small café. Carla had had a headache since Saturday, but she had not taken any medicine yet. At reception, she confirmed her name and waited near the window. The doctor asked how long the pain had lasted and whether she felt dizzy. After the consultation, Carla went across the street to the pharmacy, bought the prescribed medicine, and sent her family a message saying she was feeling calmer.`,
            questions: [
                ['When was Carla\'s appointment?', 'It was at noon on Monday.'],
                ['Where was the clinic?', 'It was on King Street, between a pharmacy and a café.'],
                ['How long had Carla had a headache?', 'She had had it since Saturday.'],
                ['Where did she go after the consultation?', 'She went across the street to the pharmacy.']
            ]
        },
        25: {
            title: 'The route by the river',
            text: `Leo decided to walk to a new bookstore instead of taking the bus. He left the station, went through a quiet park, and walked across a small bridge. After the bridge, he followed a path along the river and went past a sports center. He almost turned into the wrong street, but a sign pointed toward the main square. Near the square, Leo came across a weekend market and stopped to buy coffee. Then he walked around the market, headed toward the church, and found the bookstore beside it. The route took fifteen minutes longer than expected, but Leo discovered several places he wanted to visit again.`,
            questions: [
                ['What did Leo walk through after leaving the station?', 'He walked through a quiet park.'],
                ['What did he cross?', 'He crossed a small bridge.'],
                ['Where did he stop for coffee?', 'He stopped at a weekend market near the square.'],
                ['Where was the bookstore?', 'It was beside the church.']
            ]
        },
        26: {
            title: 'A deadline and a time window',
            text: `Marcos is organizing a training workshop that runs from nine to four on Friday. The venue will hold the reservation until noon on Wednesday, so he needs to confirm the number of participants by that time. He has asked the speakers to send their slides by Tuesday evening. During the workshop, each speaker will have thirty minutes, followed by a ten-minute break. The technical team will test the sound system before the first session and will remain in the room for two hours. Participants can send accessibility requests within three business days of registering. Marcos has put off one optional activity, but every task connected to the deadline is now clearly marked on the schedule.`,
            questions: [
                ['What is the complete time window for the workshop?', 'It runs from nine to four on Friday.'],
                ['Until when will the venue hold the reservation?', 'It will hold the reservation until noon on Wednesday.'],
                ['What must the speakers send by Tuesday evening?', 'They must send their slides.'],
                ['How long will the technical team remain in the room?', 'It will remain there for two hours.']
            ]
        },
        27: {
            title: 'Checking a route one step at a time',
            text: `A traveler asked Bruno how to walk from the bus terminal to the city museum. Bruno divided the route into three stages. First, the traveler had to use the north exit and cross at the pedestrian crossing. Then he needed to keep going to the roundabout and take the second exit. After the roundabout, he had to turn left just after the public library. The museum entrance was before the parking garage, beside a large clock tower. The traveler checked the difficult part: "So I take the second exit and turn left after the library, right?" Bruno confirmed it and corrected one final detail about the entrance. By repeating the route, the traveler discovered the mistake before he started walking.`,
            questions: [
                ['Which terminal exit should the traveler use?', 'He should use the north exit.'],
                ['Which exit should he take at the roundabout?', 'He should take the second exit.'],
                ['Where should he turn left?', 'He should turn left just after the public library.'],
                ['Which landmark is beside the museum entrance?', 'A large clock tower is beside the entrance.']
            ]
        },
        28: {
            title: 'A calm hotel complaint',
            text: `Laura checked into her hotel after a long train journey. At reception, she confirmed the reservation under her name and asked whether breakfast was included. When she entered room 408, she discovered that the air conditioner was not working and there were no towels in the bathroom. She was tired, but she called reception calmly and described both problems. "Could you send someone to check the air conditioner and bring two towels, please?" she asked. The receptionist apologized, sent a maintenance worker, and offered Laura a drink while she waited. The problem was sorted out in fifteen minutes, and the hotel extended her check-out time to make up for the delay.`,
            questions: [
                ['What did Laura ask about at check-in?', 'She asked whether breakfast was included.'],
                ['Which two problems did she find in the room?', 'The air conditioner was not working, and there were no towels.'],
                ['What did the receptionist offer while Laura waited?', 'The receptionist offered her a drink.'],
                ['How did the hotel make up for the delay?', 'It extended her check-out time.']
            ]
        },
        29: {
            title: 'A study habit that continued',
            text: `Felipe wanted to improve his English, but he often gave up after a few days. He used to create ambitious schedules and then avoid studying when he felt tired. This time, he decided to study for fifteen minutes every morning. He enjoyed tracking small improvements in a notebook and started listening to one short podcast during breakfast. Felipe also planned to join a conversation group, but he felt nervous about speaking. A friend encouraged him to try one session before making a decision. After attending twice, he began looking forward to the weekly meetings. He still dislikes making mistakes, but he has learned to keep on speaking instead of stopping.`,
            questions: [
                ['Why did Felipe often give up?', 'Because he created ambitious schedules and avoided studying when tired.'],
                ['What did he decide to do every morning?', 'He decided to study for fifteen minutes.'],
                ['What was he nervous about?', 'He was nervous about speaking in a conversation group.'],
                ['What changed after two sessions?', 'He began looking forward to the weekly meetings.']
            ]
        },
        30: {
            title: 'A flexible plan with clear conditions',
            text: `Laura's work schedule changes every week, so she uses a flexible study plan. If she has a quiet morning, she studies grammar before breakfast. If work is busy, she reviews vocabulary for ten minutes at night. She knows that if she sleeps badly, she remembers less the next day, so she does not study after midnight. For the coming month, she has one clear goal: if she completes four short sessions each week, she will reward herself with a movie in English on Sunday. If she misses a day, she will not double the next session. She will simply continue with the plan because consistency works better than punishment.`,
            questions: [
                ['What does Laura do if she has a quiet morning?', 'She studies grammar before breakfast.'],
                ['Why does she avoid studying after midnight?', 'Because she remembers less when she sleeps badly.'],
                ['What will she do after four short sessions?', 'She will watch a movie in English on Sunday.'],
                ['What will happen if she misses a day?', 'She will simply continue with the plan.']
            ]
        },
        31: {
            title: 'Hope, wish, and action',
            text: `Bruno hopes to get a better job before the end of the year. He has found an interesting position, but the application closes on Friday. Unless he updates his resume tonight, he will not have enough time to prepare the other documents. Bruno wishes he had more confidence in interviews, so he asks a friend to practice with him on Wednesday. His friend agrees and helps him prepare examples from his work experience. Bruno also hopes the company will offer remote work, although the advertisement does not mention it. By Thursday evening, his application is ready. He still feels nervous, but he knows he will miss the opportunity unless he sends it.`,
            questions: [
                ['When does the application close?', 'It closes on Friday.'],
                ['What must Bruno do tonight?', 'He must update his resume.'],
                ['What does Bruno wish he had?', 'He wishes he had more confidence in interviews.'],
                ['Who helps him prepare for the interview?', 'A friend helps him.']
            ]
        },
        32: {
            title: 'The final reflection',
            text: `For her final project, Nina prepared a short presentation about her progress in English. She began with a story about her first class, when she understood questions but was afraid to answer. Since then, she has practiced short conversations, learned to describe problems, and answered one question aloud every week. Her most useful strategy was repeating the same answer with clearer details. Next month, she is going to join an online conversation group, and she thinks the regular meetings will improve her listening. Nina knows she will continue making mistakes, but she no longer sees them as a reason to stop. If she keeps a realistic routine, she believes her confidence will continue to grow.`,
            questions: [
                ['What was Nina afraid to do in her first class?', 'She was afraid to answer questions.'],
                ['Which strategy helped her most?', 'Repeating the same answer with clearer details helped her most.'],
                ['What is she going to do next month?', 'She is going to join an online conversation group.'],
                ['How does she see mistakes now?', 'She no longer sees them as a reason to stop.']
            ]
        }
    };

    const dialogueFollowUps = {
        1: [['Ana', 'Did Paula reply after you sent it?'], ['Leo', 'Yes, she thanked me and asked for one small change.']],
        2: [['Rafa', 'Where did the barista keep it?'], ['Bia', 'She put it behind the counter until I returned.']],
        3: [['Customer', 'Does the unlimited plan include international calls too?'], ['Seller', 'Yes, and that is another advantage when you travel.']],
        4: [['Traveler', 'Does the Central Hotel include breakfast?'], ['Local', 'Yes, and guests say it has the friendliest staff.']],
        5: [['Coworker', 'How many people are coming?'], ['You', 'Twelve, so we need one more table and a few cups.']],
        6: [['Mom', 'What were people doing near the store?'], ['Son', 'They were standing under the roof and waiting for the rain to stop.']],
        7: [['Friend', 'What did your manager need?'], ['You', 'She needed the updated price before the client called.']],
        8: [['Brother', 'Did all the files open after that?'], ['Sister', 'Yes, and I made a backup before I closed the laptop.']],
        9: [['Friend', 'Are you going to empty the shelf before Saturday?'], ['You', 'Yes. I am going to move the glasses on Friday night.']],
        10: [['Friend', 'What will you do if the road near my house is flooded?'], ['You', 'I will take the main avenue and avoid that street.']],
        11: [['Receptionist', 'Are you bringing your test results?'], ['Patient', 'Yes, I am picking them up this afternoon.']],
        12: [['Friend', 'Are you working on Sunday too?'], ['You', 'No, I think I will rest and prepare for Monday.']],
        13: [['Guest', 'Could I put it beside the sofa?'], ['Host', 'Yes, that will leave more space near the table.']],
        14: [['Airport Agent', 'You can leave your phone inside your bag.'], ['Traveler', 'Good. Then I am ready.']],
        15: [['Ana', 'Which presentation should I finish first?'], ['Leo', 'Maybe the one for tomorrow\'s client because its deadline is closest.']],
        16: [['Visitor', 'Do I have to show my library card again?'], ['Library Assistant', 'No, but you need to keep it with you.']],
        17: [['Ana', 'Which dish have you tried?'], ['Leo', 'I have tried green curry, and I would order it again.']],
        18: [['Mom', 'Is dinner ready now?'], ['Son', 'Almost. I have not heated the soup yet.']],
        19: [['Coworker', 'Has the client replied?'], ['You', 'Yes. She replied ten minutes after I sent it.']],
        20: [['Mom', 'What time will she get back?'], ['Son', 'She said she would be back before dinner.']],
        21: [['Friend', 'Are you going to call the clinic about the swelling?'], ['You', 'Only if it gets worse or has not gone down by tomorrow.']],
        22: [['Receptionist', 'Would you like me to add you to the morning cancellation list?'], ['Patient', 'Yes, please. The pain usually gets worse after lunch.']],
        23: [['Guest', 'Is the dining room inside the lobby?'], ['Clerk', 'No. Go through the door at the back, and it is on your left.']],
        24: [['Tourist', 'How do I get there from this corner?'], ['Local', 'Walk past the bank and turn right at the traffic lights.']],
        25: [['Runner', 'How long is the complete route?'], ['Coach', 'About five kilometers if you return along the main road.']],
        26: [['Customer', 'Can you call me before you replace any parts?'], ['Technician', 'Of course. We will contact you by noon tomorrow.']],
        27: [['Driver', 'Is the blue sign before or after the garage entrance?'], ['Passenger', 'It is just before the entrance, on your right.']],
        28: [['Guest', 'The shower is not working very well either.'], ['Housekeeper', 'I will ask maintenance to check it while I get the towel.']],
        29: [['Friend', 'Do you want to enter the morning race?'], ['You', 'Maybe. I plan to train for another month first.']],
        30: [['Friend', 'What do you do if you still feel tired?'], ['You', 'If I still feel tired, I take a short walk after lunch.']],
        31: [['Mom', 'What will we do if traffic is heavy?'], ['Son', 'We will take the subway unless the road is clear.']],
        32: [['Coach', 'What is your next goal?'], ['You', 'I am going to practice listening with short interviews.']]
    };

    // Aulas-assinatura: o mesmo objetivo gramatical da trilha A2, agora com um
    // contexto editorial que conecta vocabulário, prática, leitura e produção oral.
    // As associações de cores e os perfis de horóscopo são apresentados como
    // referências culturais e prompts de conversa, não como diagnósticos pessoais.
    const signatureLessonUpgrades = {
        3: {
            label: 'comparatives through colors moods and personality',
            themes: ['comparing how colors make a room feel', 'describing two personality styles', 'choosing colors for a study or relaxation space'],
            objectives: ['compare moods and personality traits with degree modifiers', 'use as...as and not as...as to express similarity and difference', 'discuss color associations without treating them as fixed rules'],
            vocab: [['calming', 'relaxante / calmante', 'Blue can feel calming in a quiet room.'], ['energetic', 'cheio de energia', 'Orange feels energetic to many people.'], ['cheerful', 'alegre', 'The yellow wall makes the kitchen feel cheerful.'], ['bold', 'ousado', 'The bold red chair stands out.'], ['gentle', 'suave / delicado', 'This pale green is gentler than the dark one.'], ['serious', 'sério', 'The gray office looks more serious.'], ['creative', 'criativo', 'The purple corner feels creative.'], ['reserved', 'reservado', 'He is quieter and more reserved in large groups.']],
            grammar: [['Big and small differences', 'Use much, far, or a lot before a comparative for a strong difference: Red feels much more energetic than beige. Use a little or slightly for a small difference: Pale blue is slightly calmer than green.'], ['Similarity and contrast', 'Use as + adjective + as when two things share a quality: Green can be as calming as blue. Use not as...as when the first has less of that quality: Black is not as cheerful as yellow.'], ['People are more complex than labels', 'Comparatives describe an impression, not an absolute truth. Add softeners such as for me, in this room, or can feel: Purple can feel more creative in this space.']],
            examples: ['Yellow feels much more cheerful than gray in this kitchen.', 'Pale blue is a little gentler than bright blue.', 'Green can be just as calming as blue.', 'A reserved person is not necessarily less confident than an outgoing person.'],
            expressions: [['brighten up', 'deixar mais alegre / iluminado', 'Yellow cushions brighten up the room.'], ['calm down', 'acalmar-se', 'Soft colors help me calm down after work.'], ['stand out', 'se destacar', 'The red chair stands out against the white wall.'], ['feel drawn to', 'sentir-se atraído por', 'I feel drawn to warm colors.'], ['bring out', 'realçar / revelar', 'Natural light brings out the green tones.'], ['go well with', 'combinar com', 'Blue goes well with light wood.']],
            introDialogue: [['Maya', 'Which corner feels better for reading?'], ['Leo', 'The blue corner feels much calmer than the red one.'], ['Maya', 'I agree, but the red corner is a little more energetic.'], ['Leo', 'True. It might be better for creative work.'], ['Maya', 'Is green as calming as blue for you?'], ['Leo', 'Almost. Green feels gentler, but blue helps me focus more.'], ['Maya', 'So color changes the mood of a space.'], ['Leo', 'It can, but people do not always react in the same way.']],
            practice: [
                { type: 'Complete', prompt: 'For me, pale blue is much ____ than bright red.', hint: 'mais calmante', answer: 'more calming' },
                { type: 'Complete', prompt: 'This yellow room feels a little ____ than the gray room.', hint: 'mais alegre', answer: 'more cheerful' },
                { type: 'Complete', prompt: 'Green can be ____ calming ____ blue in this space.', hint: 'tão...quanto', answer: 'as ... as' },
                { type: 'Complete', prompt: 'The black wall is not as ____ as the orange wall.', hint: 'energético', answer: 'energetic' },
                { type: 'Choose', prompt: 'Choose the sentence that expresses a small difference.', hint: 'pequena diferença', answer: 'The morning train is slightly less crowded than the evening train.' },
                { type: 'Correct', prompt: 'This route is much convenient than the other one.', hint: 'comparativo com adjetivo longo', answer: 'This route is much more convenient than the other one.' },
                { type: 'Unscramble', prompt: 'as / is / the new app / reliable / the old one / as / ?', hint: 'igualdade', answer: 'Is the new app as reliable as the old one?' },
                { type: 'Transform', prompt: 'Mia is outgoing. Her brother is more reserved.', hint: 'use not as...as', answer: 'Mia is not as reserved as her brother.' },
                { type: 'Complete', prompt: 'Her clear answer made her ____ out in the interview.', hint: 'destacar-se', answer: 'stand' },
                { type: 'Personalize', prompt: 'Compare two ways to study using one degree modifier.', hint: 'much / a little / slightly', answer: 'Studying in the morning is a little easier for me than studying at night.' }
            ],
            translations: [
                { pt: 'Para mim, azul é muito mais relaxante do que vermelho.', en: 'For me, blue is much more calming than red.' },
                { pt: 'Este verde é um pouco mais suave do que o outro.', en: 'This green is a little gentler than the other one.' },
                { pt: 'Amarelo pode ser tão alegre quanto laranja.', en: 'Yellow can be as cheerful as orange.' },
                { pt: 'Uma pessoa reservada não é necessariamente menos confiante.', en: 'A reserved person is not necessarily less confident.' },
                { pt: 'O ônibus novo é muito mais confortável.', en: 'The new bus is much more comfortable.' },
                { pt: 'A aula online é tão útil quanto a aula presencial.', en: 'The online class is as useful as the in-person class.' }
            ],
            expressionTranslations: [
                { pt: 'A mensagem dela alegrou meu dia.', en: 'Her message brightened up my day.' },
                { pt: 'Respire e se acalme antes da entrevista.', en: 'Take a breath and calm down before the interview.' },
                { pt: 'A resposta clara fez ele se destacar.', en: 'The clear answer made him stand out.' },
                { pt: 'Eu me sinto atraído por projetos criativos.', en: 'I feel drawn to creative projects.' },
                { pt: 'A conversa realçou a confiança dela.', en: 'The conversation brought out her confidence.' },
                { pt: 'Esse horário combina com a minha rotina.', en: 'This schedule goes well with my routine.' }
            ],
            dialogues: [
                [['Designer', 'Do you prefer the blue or the orange wall?'], ['Client', 'The blue wall is much calmer, but the orange one is more cheerful.'], ['Designer', 'Which mood do you want for this room?'], ['Client', 'A calm place where I can read.'], ['Designer', 'Then the blue is probably a better fit.'], ['Client', 'Yes, especially with the natural light.']],
                [['Commuter', 'Is the subway much faster than the bus?'], ['Local', 'During rush hour, yes. It is also a little more reliable.'], ['Commuter', 'Is it as comfortable?'], ['Local', 'Not quite, but the trip is much shorter.']],
                [['Student', 'Is Mia as outgoing as her sister?'], ['Teacher', 'No, she is more reserved in large groups.'], ['Student', 'Is she less confident?'], ['Teacher', 'Not at all. She simply communicates differently.']],
                [['Coworker', 'Which workspace do you prefer?'], ['You', 'The small room is quieter than the open office.'], ['Coworker', 'Is the internet just as reliable there?'], ['You', 'Yes, so it is much better for video calls.']]
            ],
            readingUpgrade: {
                title: 'Can Color Change the Mood of a Room?',
                text: 'Colors can change the first impression of a space, but they do not affect everyone in exactly the same way. Many people describe blue and green rooms as calmer than bright red or orange rooms. Warm colors can feel more energetic, while pale colors may feel gentler. Context also matters. A dark blue wall in a small room can feel more serious, but the same color near a large sunny window may feel fresh and comfortable. Culture, memory, light, and personal taste all influence the reaction. For that reason, color associations are useful conversation starters, not fixed personality tests. A person who loves black is not necessarily sad, and someone who likes yellow is not always outgoing. The best question is not “What does this color prove?” but “How does this color make you feel here?”',
                questions: [['Which colors do many people describe as calming?', 'Many people describe blue and green as calming.'], ['Which four factors can influence a reaction to color?', 'Culture, memory, light, and personal taste.'], ['Does a favorite color prove a personality type?', 'No. Color associations are not fixed personality tests.'], ['What question does the text recommend?', 'How does this color make you feel here?']]
            }
        },
        4: {
            label: 'superlatives through horoscope and personality',
            themes: ['creating a playful horoscope profile', 'ranking useful qualities for a situation', 'comparing a horoscope description with a real person'],
            objectives: ['use superlatives to rank personality qualities', 'review irregular forms such as best and worst', 'agree or disagree with a playful horoscope using evidence'],
            vocab: [['adventurous', 'aventureiro', 'An adventurous person enjoys new experiences.'], ['patient', 'paciente', 'A patient person can wait calmly.'], ['confident', 'confiante', 'She sounds confident in meetings.'], ['sensitive', 'sensível', 'He is sensitive to other people’s feelings.'], ['reliable', 'confiável', 'You can depend on a reliable friend.'], ['independent', 'independente', 'She likes solving problems independently.'], ['outgoing', 'extrovertido / sociável', 'An outgoing person enjoys meeting people.'], ['practical', 'prático', 'A practical person looks for a clear solution.']],
            grammar: [['The + superlative', 'Use the before a superlative when one person or quality stands above the group: the most patient person in my family. Short adjectives usually take -est; longer adjectives use the most.'], ['Irregular forms', 'Good becomes the best, bad becomes the worst, and far becomes the farthest or the furthest. Do not build forms such as the most good.'], ['Give the group and the reason', 'A strong answer identifies the group and adds evidence: Leo is the most reliable person on the team because he always keeps his promises.']],
            examples: ['Who is the most adventurous person in your family?', 'Patience is the most useful quality in this situation.', 'That was the best description in the horoscope.', 'The least accurate part was the idea that I am always outgoing.'],
            expressions: [['get along with', 'se dar bem com', 'I get along with calm, honest people.'], ['speak your mind', 'falar o que pensa', 'She speaks her mind respectfully.'], ['keep calm', 'manter a calma', 'He keeps calm under pressure.'], ['take the lead', 'assumir a liderança', 'Maya usually takes the lead in group tasks.'], ['pay attention to', 'prestar atenção em', 'A sensitive person pays attention to other people.'], ['count on', 'contar com', 'She is the friend I can always count on.']],
            introDialogue: [['Lia', 'This horoscope says Taurus is the most patient sign.'], ['Noah', 'Do you think that describes you?'], ['Lia', 'Sometimes, but I am not the most patient person in my family.'], ['Noah', 'Which part is the most accurate?'], ['Lia', 'It says I am practical and reliable. My friends agree with that.'], ['Noah', 'And the least accurate part?'], ['Lia', 'It says I dislike change. I am actually quite adventurous.'], ['Noah', 'So the profile is a fun prompt, not a complete definition.']],
            practice: [
                { type: 'Complete', prompt: 'Nina is the ____ patient person on the team.', hint: 'mais', answer: 'most' },
                { type: 'Complete', prompt: 'That is the ____ profile in the set.', hint: 'melhor', answer: 'best' },
                { type: 'Complete', prompt: 'The least ____ part is the sentence about confidence.', hint: 'preciso', answer: 'accurate' },
                { type: 'Choose', prompt: 'Choose the correct superlative of reliable.', hint: 'adjetivo longo', answer: 'the most reliable' },
                { type: 'Correct', prompt: 'Leo is most outgoing person in our class.', hint: 'artigo definido', answer: 'Leo is the most outgoing person in our class.' },
                { type: 'Correct', prompt: 'This is the most good description.', hint: 'forma irregular', answer: 'This is the best description.' },
                { type: 'Unscramble', prompt: 'quality / most / what / useful / is / the / ?', hint: 'pergunta', answer: 'What is the most useful quality?' },
                { type: 'Transform', prompt: 'No other person in my family is as practical as Ana.', hint: 'use superlative', answer: 'Ana is the most practical person in my family.' },
                { type: 'Complete', prompt: 'Maya often takes the ____ in group projects.', hint: 'liderança', answer: 'lead' },
                { type: 'Personalize', prompt: 'Name the most reliable person you know and give one reason.', hint: 'the most...because...', answer: 'My sister is the most reliable person I know because she always keeps her promises.' }
            ],
            translations: [
                { pt: 'Quem é a pessoa mais aventureira da sua família?', en: 'Who is the most adventurous person in your family?' },
                { pt: 'Paciência é a qualidade mais útil nesta situação.', en: 'Patience is the most useful quality in this situation.' },
                { pt: 'Essa foi a melhor parte do perfil.', en: 'That was the best part of the profile.' },
                { pt: 'A parte menos precisa foi a descrição sobre confiança.', en: 'The least accurate part was the description about confidence.' },
                { pt: 'Ela mantém a calma sob pressão.', en: 'She keeps calm under pressure.' },
                { pt: 'Ele é a pessoa com quem eu sempre posso contar.', en: 'He is the person I can always count on.' }
            ],
            expressionTranslations: [
                { pt: 'Eu me dou bem com pessoas honestas.', en: 'I get along with honest people.' },
                { pt: 'Ela fala o que pensa com respeito.', en: 'She speaks her mind respectfully.' },
                { pt: 'Ele mantém a calma sob pressão.', en: 'He keeps calm under pressure.' },
                { pt: 'Maya assume a liderança nos projetos.', en: 'Maya takes the lead in projects.' },
                { pt: 'Ela presta atenção aos sentimentos dos outros.', en: 'She pays attention to other people’s feelings.' },
                { pt: 'Você sempre pode contar com a minha ajuda.', en: 'You can always count on my help.' }
            ],
            dialogues: [
                [['Friend', 'Which quality is the most important in a friend?'], ['You', 'Reliability is the most important for me.'], ['Friend', 'Why?'], ['You', 'Because I need someone I can count on.'], ['Friend', 'Who is the most reliable person you know?'], ['You', 'My brother, because he always keeps his promises.']],
                [['Ana', 'Is your horoscope accurate today?'], ['Leo', 'The funniest part is accurate, but the serious part is not.'], ['Ana', 'Which line is the least accurate?'], ['Leo', 'The line that says I never speak my mind.']],
                [['Manager', 'Who is the best person to lead this task?'], ['Assistant', 'Maya is the most practical person on the team.'], ['Manager', 'Is she patient too?'], ['Assistant', 'Yes, and she keeps calm under pressure.']],
                [['Coach', 'Who is the most independent player on the team?'], ['Captain', 'Rosa. She makes good decisions without waiting for help.'], ['Coach', 'And who is the most patient?'], ['Captain', 'Ben. He stays calm when the game becomes difficult.']]
            ],
            readingUpgrade: {
                title: 'Four Signs, Four Traditional Personality Profiles',
                text: 'In Western astrology, each sign is traditionally connected with an element, a symbol, and a group of personality traits. The date ranges below are approximate and can vary slightly near the first and last day. These descriptions are part of astrological tradition and popular culture; they are not scientific personality tests.',
                profiles: [
                    { sign: 'Aquarius', dates: 'January 20 – February 18', element: 'Air', traits: 'independent, original, inventive', preference: 'Aquarians are traditionally described as people who enjoy new ideas, knowledge, social causes, and doing things in an unconventional way.' },
                    { sign: 'Taurus', dates: 'April 20 – May 20', element: 'Earth', traits: 'patient, reliable, practical', preference: 'Taureans are traditionally associated with stability, comfortable places, good food, nature, and routines they can depend on.' },
                    { sign: 'Leo', dates: 'July 23 – August 22', element: 'Fire', traits: 'confident, warm, creative', preference: 'Leos are often described as expressive people who enjoy leading, encouraging others, creating things, and receiving recognition for good work.' },
                    { sign: 'Scorpio', dates: 'October 24 – November 21', element: 'Water', traits: 'determined, private, loyal', preference: 'Scorpios are traditionally said to prefer deep conversations, trusted relationships, difficult questions, and activities that require concentration.' }
                ],
                questions: [['Which sign is traditionally associated with originality and new ideas?', 'Aquarius.'], ['What kinds of things are Taureans said to prefer?', 'Stability, comfort, good food, nature, and dependable routines.'], ['Which profile includes confidence, warmth, and creativity?', 'Leo.'], ['Why does the introduction call the date ranges approximate?', 'Because dates can vary slightly near the first and last day.']]
            }
        },
        7: {
            label: 'interrupted stories through a fictional museum mystery',
            themes: ['reconstructing a fictional museum mystery', 'describing what witnesses were doing', 'building a timeline with when and while'],
            objectives: ['combine Past Continuous and Past Simple in a mystery timeline', 'distinguish background actions from short interruptions', 'ask witnesses clear follow-up questions'],
            vocab: [['gallery', 'galeria', 'The painting was in the east gallery.'], ['security guard', 'segurança', 'The security guard was checking the doors.'], ['footprint', 'pegada', 'They found a wet footprint.'], ['witness', 'testemunha', 'A witness heard a loud noise.'], ['interrupt', 'interromper', 'A phone call interrupted the meeting.'], ['notice', 'notar / perceber', 'I noticed a problem on the screen.'], ['suddenly', 'de repente', 'The lights suddenly went out.'], ['vanish', 'desaparecer', 'My nervousness vanished after a minute.']],
            grammar: [['Background action', 'Use was/were + -ing for an action already in progress: The guard was checking the doors.'], ['The interruption', 'Use Past Simple for the shorter event that changes the scene: The alarm went off.'], ['When, while, and questions', 'When often introduces the short event; while often introduces the longer action. Ask What were you doing when...? to place a witness on the timeline.']],
            examples: ['The guard was checking the doors when the alarm went off.', 'While visitors were leaving, someone opened the display case.', 'What were you doing when the lights went out?', 'A witness was taking a photo when the painting vanished.'],
            expressions: [['go off', 'disparar / tocar', 'My alarm went off during the call.'], ['look into', 'investigar', 'The manager will look into the delivery problem.'], ['find out', 'descobrir', 'We found out why the train stopped.'], ['turn up', 'aparecer / ser encontrado', 'My missing passport turned up in my backpack.'], ['point to', 'apontar para / indicar', 'The numbers point to a larger problem.'], ['piece together', 'juntar informações', 'We pieced together the complete story.']],
            introDialogue: [['Inspector', 'What were you doing when the alarm went off?'], ['Guard', 'I was checking the west gallery.'], ['Inspector', 'Were visitors still inside?'], ['Guard', 'A small group was leaving through the main hall.'], ['Inspector', 'What happened when the lights came back?'], ['Guard', 'We noticed that a painting was missing.'], ['Inspector', 'Did anyone see the display case open?'], ['Guard', 'One visitor was taking a photo near it.']],
            practice: [
                { type: 'Complete', prompt: 'The guard ____ the doors when the alarm went off.', hint: 'estava verificando', answer: 'was checking' },
                { type: 'Complete', prompt: 'While the visitors ____ the gallery, the lights went out.', hint: 'estavam deixando', answer: 'were leaving' },
                { type: 'Complete', prompt: 'A witness ____ a wet footprint near the door.', hint: 'notou', answer: 'noticed' },
                { type: 'Choose', prompt: 'Choose the background action.', hint: 'ação em progresso', answer: 'The guide was speaking to a group.' },
                { type: 'Correct', prompt: 'I was present the results when the computer crashed.', hint: 'was + -ing', answer: 'I was presenting the results when the computer crashed.' },
                { type: 'Correct', prompt: 'While the phone rang, we were having dinner.', hint: 'when para evento curto', answer: 'When the phone rang, we were having dinner.' },
                { type: 'Unscramble', prompt: 'doing / phone / you / were / what / the / rang / when / ?', hint: 'pergunta sobre o momento', answer: 'What were you doing when the phone rang?' },
                { type: 'Transform', prompt: 'The lights went out during our meeting.', hint: 'use while', answer: 'The lights went out while we were having a meeting.' },
                { type: 'Complete', prompt: 'We tried to ____ out why the train stopped.', hint: 'descobrir', answer: 'find' },
                { type: 'Timeline', prompt: 'Connect: children play / rain start.', hint: 'while + Past Continuous', answer: 'It started to rain while the children were playing.' }
            ],
            translations: [
                { pt: 'O segurança estava verificando as portas quando o alarme disparou.', en: 'The security guard was checking the doors when the alarm went off.' },
                { pt: 'Enquanto os visitantes saíam, alguém abriu a vitrine.', en: 'While the visitors were leaving, someone opened the display case.' },
                { pt: 'O que você estava fazendo quando as luzes apagaram?', en: 'What were you doing when the lights went out?' },
                { pt: 'Eu estava apresentando quando o computador travou.', en: 'I was presenting when the computer crashed.' },
                { pt: 'O telefone tocou enquanto nós jantávamos.', en: 'The phone rang while we were having dinner.' },
                { pt: 'Nós descobrimos por que o trem parou.', en: 'We found out why the train stopped.' }
            ],
            expressionTranslations: [
                { pt: 'Meu alarme tocou durante a ligação.', en: 'My alarm went off during the call.' },
                { pt: 'O gerente vai investigar o problema da entrega.', en: 'The manager will look into the delivery problem.' },
                { pt: 'Nós descobrimos por que o trem parou.', en: 'We found out why the train stopped.' },
                { pt: 'Meu passaporte apareceu na mochila.', en: 'My passport turned up in my backpack.' },
                { pt: 'Os números indicam um problema maior.', en: 'The numbers point to a larger problem.' },
                { pt: 'Nós juntamos a história completa.', en: 'We pieced together the complete story.' }
            ],
            dialogues: [
                [['Inspector', 'Where were you standing when the alarm went off?'], ['Visitor', 'I was standing beside the information desk.'], ['Inspector', 'Did you see anyone run?'], ['Visitor', 'No, but a guide was closing the garden door.'], ['Inspector', 'What was the guide carrying?'], ['Visitor', 'A radio and a folder.']],
                [['Dad', 'Why did you leave the table?'], ['Daughter', 'We were having dinner when my manager called.'], ['Dad', 'Was there a problem?'], ['Daughter', 'Yes, but we solved it quickly.']],
                [['Manager', 'What happened during your presentation?'], ['You', 'I was explaining the final chart when the computer crashed.'], ['Manager', 'How did you continue?'], ['You', 'I opened the report on my phone.']],
                [['Passenger', 'Why did the bus stop?'], ['Driver', 'We were crossing the bridge when a warning light came on.'], ['Passenger', 'Did you find out what happened?'], ['Driver', 'Yes. The engine was getting too hot.']]
            ],
            readingUpgrade: {
                title: 'The Painting That Vanished for Twenty Minutes',
                text: 'The museum was preparing to close when the lights suddenly went out. A guide was speaking to five visitors, and a security guard was checking the west doors. When the emergency lights came on, the group noticed that a small painting was no longer in its display space. While the manager was calling the security office, a guard found a wet footprint near the garden door. Everyone thought it was an important clue. The team checked the cameras and interviewed the staff. Then the missing painting turned up in a protected storage room. A curator had moved it because water was coming through the gallery ceiling, but her radio stopped working before she could tell the team. The footprint belonged to a gardener who was closing a window. No crime had taken place. The mystery was solved when the staff pieced together two interrupted stories.',
                questions: [['What were the guide and the guard doing when the lights went out?', 'The guide was speaking to visitors, and the guard was checking the doors.'], ['Why did the curator move the painting?', 'Because water was coming through the ceiling.'], ['Who made the wet footprint?', 'A gardener made it.'], ['Had a crime taken place?', 'No. The painting had been moved to protect it.']]
            }
        },
        11: {
            label: 'future arrangements through a weekend getaway',
            themes: ['organizing a confirmed weekend getaway', 'checking an itinerary with a travel partner', 'changing one fixed arrangement politely'],
            objectives: ['use Present Continuous for confirmed future arrangements', 'include a clear time, place, or person in each plan', 'distinguish a fixed arrangement from a general intention'],
            vocab: [['itinerary', 'roteiro de viagem', 'Our itinerary is full but flexible.'], ['getaway', 'viagem curta / escapada', 'We are taking a weekend getaway.'], ['departure', 'partida', 'Our departure is at 7:15.'], ['guided tour', 'passeio guiado', 'We are joining a guided tour on Saturday.'], ['reservation', 'reserva', 'The restaurant reservation is confirmed.'], ['carry-on', 'bagagem de mão', 'I am only taking a carry-on.'], ['pick up', 'buscar', 'Maya is picking us up at the station.'], ['reschedule', 'remarcar', 'We are rescheduling the boat trip.']],
            grammar: [['A fixed arrangement', 'Use am/is/are + verb-ing when a future plan is already arranged: We are leaving on Friday at seven. A ticket, booking, calendar entry, or agreement often supports the arrangement.'], ['Add the practical detail', 'A clear arrangement usually includes when, where, or with whom: I am meeting Lara at the station at 6:45.'], ['Arrangement or intention?', 'Present Continuous presents the plan as fixed. Going to presents an intention: We are visiting the museum at ten (booked). We are going to explore the old town (general plan).']],
            examples: ['We are leaving for Paraty on Friday evening.', 'I am meeting Lara at the bus station at six forty-five.', 'We are joining a guided tour on Saturday morning.', 'Are you bringing a carry-on or a large suitcase?'],
            expressions: [['set off', 'partir / sair', 'We are setting off before sunrise.'], ['check in', 'fazer check-in', 'We are checking in at two.'], ['look forward to', 'aguardar com expectativa', 'I am looking forward to the new course.'], ['move up', 'adiantar', 'We are moving the client call up to ten.'], ['push back', 'adiar', 'They are pushing back my appointment.'], ['fit in', 'encaixar na agenda', 'Can we fit in a quick review before lunch?']],
            introDialogue: [['Lara', 'Are we still leaving for Paraty on Friday?'], ['Ben', 'Yes. We are meeting at the bus station at six forty-five.'], ['Lara', 'Where are we staying?'], ['Ben', 'We are checking in at a small hotel near the historic center.'], ['Lara', 'What are we doing on Saturday morning?'], ['Ben', 'We are joining a guided walking tour at ten.'], ['Lara', 'And the boat trip?'], ['Ben', 'We are taking it on Sunday if the weather is good.']],
            practice: [
                { type: 'Complete', prompt: 'We ____ for Paraty on Friday evening.', hint: 'estamos partindo', answer: 'are leaving' },
                { type: 'Complete', prompt: 'I ____ Lara at the station at 6:45.', hint: 'estou encontrando', answer: 'am meeting' },
                { type: 'Complete', prompt: 'They ____ a guided tour on Saturday.', hint: 'estão fazendo / participando', answer: 'are joining' },
                { type: 'Choose', prompt: 'Choose the sentence with a confirmed arrangement.', hint: 'reserva confirmada', answer: 'We are having dinner at Maré Alta at eight.' },
                { type: 'Correct', prompt: 'She meeting the new client at ten.', hint: 'falta o verbo be', answer: 'She is meeting the new client at ten.' },
                { type: 'Correct', prompt: 'Are you work from home on Friday?', hint: 'be + -ing', answer: 'Are you working from home on Friday?' },
                { type: 'Unscramble', prompt: 'meeting / are / where / the team / we / ?', hint: 'pergunta de lugar', answer: 'Where are we meeting the team?' },
                { type: 'Transform', prompt: 'I have a confirmed dentist appointment at three.', hint: 'use Present Continuous', answer: 'I am seeing the dentist at three.' },
                { type: 'Complete', prompt: 'Can we ____ in a short call before lunch?', hint: 'encaixar', answer: 'fit' },
                { type: 'Schedule', prompt: 'Create one arrangement with day, time, place, and person.', hint: 'am/is/are + -ing', answer: 'I am meeting Ana at the office at ten on Tuesday.' }
            ],
            translations: [
                { pt: 'Nós vamos partir para Paraty na sexta à noite.', en: 'We are leaving for Paraty on Friday evening.' },
                { pt: 'Eu vou encontrar Lara na rodoviária às seis e quarenta e cinco.', en: 'I am meeting Lara at the bus station at six forty-five.' },
                { pt: 'Nós vamos participar de um passeio guiado no sábado.', en: 'We are joining a guided tour on Saturday.' },
                { pt: 'Você vai trabalhar de casa na sexta?', en: 'Are you working from home on Friday?' },
                { pt: 'Ela vai encontrar o novo cliente às dez.', en: 'She is meeting the new client at ten.' },
                { pt: 'Estou ansioso pelo novo curso.', en: 'I am looking forward to the new course.' }
            ],
            expressionTranslations: [
                { pt: 'Nós vamos partir antes do amanhecer.', en: 'We are setting off before sunrise.' },
                { pt: 'Nós vamos fazer check-in às duas.', en: 'We are checking in at two.' },
                { pt: 'Estou ansioso pelo novo curso.', en: 'I am looking forward to the new course.' },
                { pt: 'Nós vamos adiantar a ligação com o cliente para as dez.', en: 'We are moving the client call up to ten.' },
                { pt: 'Eles estão adiando minha consulta.', en: 'They are pushing back my appointment.' },
                { pt: 'Podemos encaixar uma revisão rápida antes do almoço?', en: 'Can we fit in a quick review before lunch?' }
            ],
            dialogues: [
                [['Traveler', 'What time are we setting off tomorrow?'], ['Friend', 'We are leaving the hotel at eight.'], ['Traveler', 'Who is picking us up?'], ['Friend', 'Our guide is meeting us in the lobby.'], ['Traveler', 'Are we bringing lunch?'], ['Friend', 'No, we are eating near the waterfall.']],
                [['Patient', 'Are you seeing the dentist this afternoon?'], ['You', 'Yes. My appointment is at three.'], ['Patient', 'Are you taking the bus?'], ['You', 'No, my sister is picking me up.']],
                [['Coworker', 'Are we still having lunch with Paula?'], ['You', 'Yes, but we are meeting her at twelve thirty.'], ['Coworker', 'Can we fit in the budget review first?'], ['You', 'Yes. We are starting it at eleven.']],
                [['Sister', 'What are you doing on Sunday?'], ['Brother', 'We are having lunch for Dad’s birthday.'], ['Sister', 'Is everyone coming?'], ['Brother', 'Yes, and Aunt Rosa is bringing dessert.']]
            ],
            readingUpgrade: {
                title: 'A Weekend Getaway That Fits on One Screen',
                text: 'Lara and Ben are taking a short trip to Paraty next weekend. They are meeting at the bus station at 6:45 on Friday evening, and their bus is leaving at 7:15. A driver is picking them up when they arrive, so they are checking in before midnight. On Saturday morning, they are joining a guided walk through the historic center. They have a lunch reservation near the harbor, and they are visiting a small art studio in the afternoon. They are not filling every hour. On Sunday, they are taking a boat trip only if the weather is calm. Before traveling home, they are meeting a friend for coffee. Their itinerary is clear because the fixed arrangements include times, places, and people. The free spaces give them room to rest and explore.',
                questions: [['What time is their bus leaving?', 'It is leaving at 7:15 on Friday evening.'], ['Who is picking them up?', 'A driver is picking them up.'], ['Which Saturday activities are already arranged?', 'A guided walk, lunch, and an art studio visit.'], ['Why does the itinerary include free spaces?', 'So they have time to rest and explore.']]
            }
        },
        18: {
            label: 'present perfect markers through a travel bucket list',
            themes: ['updating a travel bucket list', 'talking about experiences already completed', 'planning what has not happened yet'],
            objectives: ['ask about experiences with ever and answer with never', 'use already and yet to update travel plans', 'continue an experience question with a Past Simple detail'],
            vocab: [['bucket list', 'lista de sonhos / experiências', 'Visiting the Andes is on my bucket list.'], ['local dish', 'prato local', 'I have already tried the local dish.'], ['landmark', 'ponto turístico / marco', 'Have you visited this landmark yet?'], ['road trip', 'viagem de carro', 'I have never taken a long road trip.'], ['hiking trail', 'trilha', 'They have already completed the trail.'], ['travel solo', 'viajar sozinho', 'Have you ever traveled solo?'], ['book', 'reservar', 'We have not booked the tickets yet.'], ['recommend', 'recomendar', 'A friend has recommended a small town.']],
            grammar: [['Ever and never', 'Use ever in questions about life experience: Have you ever traveled alone? Use never for no experience: I have never traveled alone. Never already carries a negative meaning, so do not add not.'], ['Already and yet', 'Use already mainly in affirmative updates: I have already booked the hotel. Use yet at the end of questions and negatives: Have you booked the tour yet? I have not booked it yet.'], ['From experience to story', 'Present Perfect opens the topic; Past Simple adds a finished detail: Have you ever visited Chile? Yes, I have. I went there in 2023.']],
            examples: ['Have you ever traveled solo?', 'I have never taken a long road trip.', 'We have already booked the hotel.', 'Have you chosen the next destination yet?'],
            expressions: [['set off', 'partir', 'We set off early for the coast.'], ['check off', 'marcar como realizado', 'I have checked three tasks off my list.'], ['look forward to', 'aguardar com expectativa', 'I am looking forward to the weekend.'], ['come across', 'encontrar por acaso', 'I came across an interesting article.'], ['stop over', 'fazer escala / parada', 'We stopped over in Lima.'], ['get around', 'se locomover', 'It is easy to get around by subway.']],
            introDialogue: [['Mia', 'Have you ever traveled alone?'], ['Tom', 'No, I have never traveled solo. What about you?'], ['Mia', 'I have. I went to Uruguay by myself last year.'], ['Tom', 'Have you checked it off your bucket list?'], ['Mia', 'Yes, and I have already added a new goal.'], ['Tom', 'Which one?'], ['Mia', 'A train trip across the Andes. I have not booked it yet.'], ['Tom', 'That sounds like an amazing next adventure.']],
            practice: [
                { type: 'Complete', prompt: 'Have you ____ traveled solo?', hint: 'alguma vez', answer: 'ever' },
                { type: 'Complete', prompt: 'I have ____ taken a long road trip.', hint: 'nunca', answer: 'never' },
                { type: 'Complete', prompt: 'We have ____ booked the hotel.', hint: 'já', answer: 'already' },
                { type: 'Complete', prompt: 'Have you chosen the destination ____?', hint: 'já / final da pergunta', answer: 'yet' },
                { type: 'Correct', prompt: 'I have not never used this program.', hint: 'never já é negativo', answer: 'I have never used this program.' },
                { type: 'Correct', prompt: 'Have you already sent the email yet?', hint: 'use um marcador', answer: 'Have you sent the email yet?' },
                { type: 'Unscramble', prompt: 'ever / you / a presentation / have / given / ?', hint: 'experiência', answer: 'Have you ever given a presentation?' },
                { type: 'Transform', prompt: 'I have led a meeting. Add the finished detail: last Monday.', hint: 'Past Simple', answer: 'I led a meeting last Monday.' },
                { type: 'Complete', prompt: 'I have ____ three tasks off my list.', hint: 'marcado', answer: 'checked' },
                { type: 'Interview', prompt: 'Ask one Have you ever...? question and add a Past Simple follow-up.', hint: 'When did...? / Where did...?', answer: 'Have you ever cooked for a large group? When did you do it?' }
            ],
            translations: [
                { pt: 'Você já viajou sozinho alguma vez?', en: 'Have you ever traveled solo?' },
                { pt: 'Eu nunca fiz uma longa viagem de carro.', en: 'I have never taken a long road trip.' },
                { pt: 'Nós já reservamos o hotel.', en: 'We have already booked the hotel.' },
                { pt: 'Você já enviou o relatório?', en: 'Have you sent the report yet?' },
                { pt: 'Eu nunca usei esse programa.', en: 'I have never used this program.' },
                { pt: 'Eu conduzi uma reunião na segunda passada.', en: 'I led a meeting last Monday.' }
            ],
            expressionTranslations: [
                { pt: 'Nós partimos cedo para o litoral.', en: 'We set off early for the coast.' },
                { pt: 'Eu marquei três tarefas como concluídas.', en: 'I have checked three tasks off my list.' },
                { pt: 'Estou ansioso pelo fim de semana.', en: 'I am looking forward to the weekend.' },
                { pt: 'Eu encontrei um artigo interessante por acaso.', en: 'I came across an interesting article.' },
                { pt: 'Nós fizemos uma escala em Lima.', en: 'We stopped over in Lima.' },
                { pt: 'É fácil se locomover de metrô.', en: 'It is easy to get around by subway.' }
            ],
            dialogues: [
                [['Friend', 'Have you ever slept in a tent?'], ['You', 'Yes, I have. I camped by a lake last year.'], ['Friend', 'Did you enjoy it?'], ['You', 'Yes, but the night was very cold.'], ['Friend', 'Have you camped again since then?'], ['You', 'Not yet, but I have already bought a warmer sleeping bag.']],
                [['Manager', 'Have you sent the report yet?'], ['Leo', 'Yes, I have already sent it.'], ['Manager', 'Has the client replied?'], ['Leo', 'Not yet, but I have scheduled a follow-up.']],
                [['Friend', 'Have you ever cooked for a large group?'], ['You', 'Yes, I have.'], ['Friend', 'When did you do it?'], ['You', 'I cooked for twenty people at my sister’s birthday.']],
                [['Sister', 'What have you finished in the apartment?'], ['Brother', 'I have already painted the kitchen.'], ['Sister', 'Have you repaired the bedroom window yet?'], ['Brother', 'Not yet. I have never repaired a window before.']]
            ],
            readingUpgrade: {
                title: 'The Travel List That Became More Personal',
                text: 'When Nina created her first travel bucket list, it included famous landmarks from photographs. She has already visited two of them, but the most memorable experiences were not on the original list. She has tried a local cooking class, traveled alone for a weekend, and come across a small music festival by accident. She has never taken a long road trip, and she has not traveled on a sleeper train yet. Those experiences are still on the list. Nina now adds goals that connect with people, food, nature, and everyday life. She still wants to see famous places, but she no longer treats travel as a collection of photos. Her list has become a collection of experiences she wants to understand. She has already chosen her next destination, although she has not booked the tickets yet.',
                questions: [['How many original landmarks has Nina already visited?', 'She has already visited two.'], ['Which unexpected experiences became memorable?', 'A cooking class, a solo weekend, and a music festival.'], ['Which two experiences has she not had yet?', 'A long road trip and a sleeper train journey.'], ['How has her idea of travel changed?', 'It now focuses on meaningful experiences, not only famous photos.']]
            }
        },
        29: {
            label: 'gerunds and infinitives through travel and leisure',
            themes: ['choosing a new weekend hobby', 'planning a leisure trip', 'discussing activities you enjoy or avoid'],
            objectives: ['use gerunds after common preference and avoidance verbs', 'use infinitives after plan, decide, hope, and want', 'talk about leisure choices in complete verb-pattern chunks'],
            vocab: [['enjoy hiking', 'gostar de fazer trilha', 'I enjoy hiking near the coast.'], ['avoid traveling', 'evitar viajar', 'We avoid traveling on holiday weekends.'], ['decide to explore', 'decidir explorar', 'They decided to explore the old town.'], ['plan to camp', 'planejar acampar', 'We plan to camp by the lake.'], ['hope to visit', 'esperar visitar', 'I hope to visit the national park.'], ['mind sharing', 'se importar de compartilhar', 'Do you mind sharing a room?'], ['practice surfing', 'praticar surfe', 'She practices surfing every Saturday.'], ['promise to pack', 'prometer arrumar', 'He promised to pack light.']],
            grammar: [['Verb + -ing', 'Use -ing after enjoy, avoid, mind, finish, and practice: I enjoy hiking. Learn the first and second verb together as a useful chunk.'], ['Verb + to + infinitive', 'Use to + verb after decide, hope, plan, promise, and want: We plan to camp.'], ['Meaning depends on the pattern', 'Do not translate word by word. Notice the complete pattern in context, and use a new activity after it: avoid driving, decide to walk, look forward to traveling.']],
            examples: ['I enjoy exploring small towns.', 'We avoid traveling during long holiday weekends.', 'She decided to try kayaking.', 'Do you mind sharing a room?'],
            expressions: [['set off', 'partir', 'We set off before the road became busy.'], ['try out', 'experimentar', 'I want to try out the new design tool.'], ['take up', 'começar uma atividade', 'She decided to take up photography.'], ['give up', 'desistir / parar', 'He gave up drinking soda every day.'], ['look forward to', 'aguardar com expectativa', 'I look forward to meeting the new team.'], ['wind down', 'relaxar aos poucos', 'Quiet music helps me wind down.']],
            introDialogue: [['Rosa', 'What do you enjoy doing on weekends?'], ['Ian', 'I enjoy exploring small towns and taking photos.'], ['Rosa', 'Do you plan to travel this weekend?'], ['Ian', 'Yes. I decided to visit a coastal village.'], ['Rosa', 'Do you mind traveling alone?'], ['Ian', 'Not at all, but I avoid driving at night.'], ['Rosa', 'Would you like to try kayaking there?'], ['Ian', 'Definitely. I have wanted to try it for a long time.']],
            practice: [
                { type: 'Complete', prompt: 'I enjoy ____ small towns.', hint: 'explorar', answer: 'exploring' },
                { type: 'Complete', prompt: 'We avoid ____ during holiday weekends.', hint: 'viajar', answer: 'traveling' },
                { type: 'Complete', prompt: 'She decided ____ kayaking.', hint: 'experimentar', answer: 'to try' },
                { type: 'Complete', prompt: 'They plan ____ by the lake.', hint: 'acampar', answer: 'to camp' },
                { type: 'Choose', prompt: 'Choose the correct pattern after mind.', hint: 'mind + -ing', answer: 'Do you mind waiting a minute?' },
                { type: 'Correct', prompt: 'I hope finishing the report today.', hint: 'hope + infinitive', answer: 'I hope to finish the report today.' },
                { type: 'Correct', prompt: 'He enjoys to read before bed.', hint: 'enjoy + -ing', answer: 'He enjoys reading before bed.' },
                { type: 'Unscramble', prompt: 'to / decided / an online course / she / take', hint: 'decide + infinitive', answer: 'She decided to take an online course.' },
                { type: 'Complete', prompt: 'Quiet music helps me ____ down after work.', hint: 'relaxar aos poucos', answer: 'wind' },
                { type: 'Personalize', prompt: 'Say one leisure activity you enjoy and one you hope to try.', hint: 'enjoy + -ing / hope + to', answer: 'I enjoy cycling, and I hope to try kayaking.' }
            ],
            translations: [
                { pt: 'Eu gosto de explorar cidades pequenas.', en: 'I enjoy exploring small towns.' },
                { pt: 'Nós evitamos viajar em feriados prolongados.', en: 'We avoid traveling on long holiday weekends.' },
                { pt: 'Ela decidiu experimentar caiaque.', en: 'She decided to try kayaking.' },
                { pt: 'Eles planejam terminar o relatório hoje.', en: 'They plan to finish the report today.' },
                { pt: 'Você se importa de esperar um minuto?', en: 'Do you mind waiting a minute?' },
                { pt: 'Espero falar com o cliente amanhã.', en: 'I hope to talk to the client tomorrow.' }
            ],
            expressionTranslations: [
                { pt: 'Nós partimos antes do trânsito.', en: 'We set off before the traffic.' },
                { pt: 'Quero experimentar a nova ferramenta de design.', en: 'I want to try out the new design tool.' },
                { pt: 'Ela decidiu começar fotografia.', en: 'She decided to take up photography.' },
                { pt: 'Ele parou de tomar refrigerante todos os dias.', en: 'He gave up drinking soda every day.' },
                { pt: 'Estou ansioso para conhecer a nova equipe.', en: 'I look forward to meeting the new team.' },
                { pt: 'Música tranquila me ajuda a relaxar.', en: 'Quiet music helps me wind down.' }
            ],
            dialogues: [
                [['Friend', 'Do you enjoy hiking?'], ['You', 'Yes, but I avoid hiking in very hot weather.'], ['Friend', 'Where do you like going?'], ['You', 'I enjoy walking on forest trails.'], ['Friend', 'Do you plan to hike this weekend?'], ['You', 'Yes, I hope to visit a new trail on Sunday.']],
                [['Manager', 'Did you finish checking the report?'], ['Employee', 'Yes, and I plan to send it before lunch.'], ['Manager', 'Do you mind calling the client first?'], ['Employee', 'Not at all. I hope to speak to her at ten.']],
                [['Customer', 'Do you mind waiting five minutes?'], ['Assistant', 'No, I do not mind waiting.'], ['Customer', 'Thank you. I need to print one document.'], ['Assistant', 'That is fine. I plan to answer an email.']],
                [['Student', 'Why did you take an online course?'], ['Friend', 'I wanted to improve my presentation skills.'], ['Student', 'Do you enjoy studying online?'], ['Friend', 'Yes, and I hope to use the skill at work.']]
            ],
            readingUpgrade: {
                title: 'A Weekend for Trying Something New',
                text: 'After months of doing the same things on weekends, Clara decided to create a small leisure challenge. She wrote down activities she enjoyed doing and activities she hoped to try. She enjoys walking, taking photos, and visiting street markets, but she wants to spend more time in nature. First, she decided to take up birdwatching because it does not require expensive equipment. She plans to join a local group on Sunday and hopes to learn the names of five common birds. Clara avoids making ambitious plans because she does not want leisure to feel like another job. She also gave up checking work messages during her walks. Now she looks forward to having one quiet activity each weekend. The challenge is not about becoming an expert. It is about learning to wind down, notice new places, and keep curiosity in her routine.',
                questions: [['Why did Clara create a leisure challenge?', 'Because her weekends had become repetitive.'], ['Which hobby did she decide to take up?', 'She decided to take up birdwatching.'], ['Why does she avoid ambitious plans?', 'Because she does not want leisure to feel like work.'], ['What did she give up doing during walks?', 'She gave up checking work messages.']]
            }
        }
    };

    function getLessonNumber() {
        const pathMatch = window.location.pathname.match(/licao-(\d+)/i);
        const titleMatch = document.title.match(/(?:Lesson|Licao|Lição)\s*(\d+)/i);
        return Number((pathMatch && pathMatch[1]) || (titleMatch && titleMatch[1]) || 1);
    }

    function getLessonData() {
        const number = getLessonNumber();
        const title = lessonTitles[number - 1] || lessonTitles[0];
        const baseBank = banks[topicMap[number - 1]] || banks.past;
        const profile = lessonProfiles[number - 1] || {};
        const signature = signatureLessonUpgrades[number] || {};
        const lessonSpecific = lessonDialogueContent[number] || {};
        const bank = Object.assign({}, baseBank, profile, signature);

        bank.label = signature.label || profile.label || baseBank.label || title.toLowerCase();
        bank.matchLabel = `${title.toLowerCase()} ${baseBank.label || ''}`;
        bank.introDialogue = signature.introDialogue || profile.introDialogue || lessonSpecific.intro || null;
        bank.practice = signature.practice || profile.practice || createPracticeItems(bank, number);
        bank.translations = signature.translations || profile.translations || createTranslations(bank, title, number);
        bank.expressionTranslations = signature.expressionTranslations || profile.expressionTranslations || createExpressionTranslations(bank, number);
        bank.dialogues = signature.dialogues || profile.dialogues || lessonSpecific.dialogues || createDialogues(bank, title);
        const followUp = dialogueFollowUps[number];
        if (followUp && bank.dialogues.length && !signature.dialogues) {
            bank.dialogues = bank.dialogues.map((dialogue, index) => index === 0 ? [...dialogue, ...followUp] : dialogue);
        }
        bank.musicLines = profile.musicLines || createMusicLines(bank);
        const readingUpgrade = signature.readingUpgrade || readingUpgrades[number];
        if (readingUpgrade) {
            bank.readingTitle = readingUpgrade.title;
            bank.reading = readingUpgrade.text;
            bank.readingProfiles = readingUpgrade.profiles || null;
            bank.readingQuestions = readingUpgrade.questions.map(([question, answer]) => ({ question, answer }));
        }

        return { number, title, bank };
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function blankTerm(sentence, term) {
        if (!sentence || !term) return sentence || '';
        const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const withBlank = sentence.replace(new RegExp(`(^|[^A-Za-z])(${escaped})(?![A-Za-z])`, 'i'), '$1____');
        if (withBlank !== sentence) return withBlank;
        return sentence.replace(/([.!?])?$/, ' ____$1');
    }

    function regularVariants(word) {
        if (!/^[A-Za-z]+$/.test(word)) return [word];
        const variants = [word, `${word}s`, `${word}ed`, `${word}ing`];
        if (word.endsWith('e')) {
            variants.push(`${word}d`, `${word.slice(0, -1)}ing`);
        }
        if (/[^aeiou]y$/i.test(word)) {
            variants.push(`${word.slice(0, -1)}ied`, `${word.slice(0, -1)}ies`);
        }
        const doubled = word.match(/^(.*[aeiou])([^aeiou])$/i);
        if (doubled && word.length <= 5) {
            variants.push(`${word}${word.slice(-1)}ed`, `${word}${word.slice(-1)}ing`);
        }
        return Array.from(new Set(variants));
    }

    function clozeCandidates(term) {
        const irregular = {
            oversleep: ['overslept'],
            get: ['got'],
            fall: ['fell'],
            ring: ['rang'],
            leave: ['left'],
            lose: ['lost'],
            begin: ['began'],
            go: ['went', 'gone'],
            come: ['came'],
            run: ['ran'],
            take: ['took', 'taken'],
            give: ['gave', 'given'],
            make: ['made'],
            see: ['saw', 'seen'],
            speak: ['spoke', 'spoken'],
            write: ['wrote', 'written'],
            drive: ['drove', 'driven'],
            fly: ['flew', 'flown'],
            be: ['was', 'were', 'been']
        };
        const value = String(term || '').trim();
        if (!value) return [];
        const words = value.split(/\s+/);
        const first = words[0];
        const rest = words.slice(1).join(' ');
        const firstForms = [...regularVariants(first), ...(irregular[first.toLowerCase()] || [])];
        const phraseForms = rest
            ? firstForms.map((form) => `${form} ${rest}`)
            : firstForms;
        return Array.from(new Set([...phraseForms, value])).sort((a, b) => b.length - a.length);
    }

    function createCompleteItem(vocabItem) {
        const [term, hint, sentence] = vocabItem;
        const candidates = clozeCandidates(term);
        for (const candidate of candidates) {
            const escaped = candidate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const pattern = new RegExp(`(^|[^A-Za-z])(${escaped})(?![A-Za-z])`, 'i');
            if (pattern.test(sentence)) {
                return {
                    type: 'Complete',
                    prompt: sentence.replace(pattern, '$1____'),
                    hint,
                    answer: sentence.match(pattern)[2]
                };
            }
        }
        return {
            type: 'Complete',
            prompt: sentence.replace(/([.!?])?$/, ' ____$1'),
            hint,
            answer: term
        };
    }

    const practiceClozeOverrides = {
        5: [
            ['Please keep ____ after the purchase.', 'o recibo', 'the receipt'],
            ['I need ____ before I make a decision.', 'um conselho', 'some advice'],
            ['We need ____ for the guests.', 'algumas cadeiras', 'a few chairs'],
            ['There is only ____ before the event.', 'um pouco de tempo', 'a little time']
        ],
        10: [
            ['It will ____ rain this afternoon.', 'provavelmente', 'probably'],
            ['I ____ I will call after lunch.', 'prometo', 'promise'],
            ['Do not worry. I will ____ you with the boxes.', 'ajudar', 'help'],
            ['I will make a ____ after I see the price.', 'decisão', 'decision']
        ],
        15: [
            ['Dividing the project into three steps makes it more ____.', 'possível de administrar', 'manageable'],
            ['She feels ____ because every task seems urgent.', 'sobrecarregada', 'overwhelmed'],
            ['Choose one ____ before you answer your messages.', 'prioridade', 'priority'],
            ['You could set a clear ____ for the evening.', 'limite', 'boundary']
        ],
        28: [
            ['I have a ____ under my name.', 'reserva', 'reservation'],
            ['Please ask for help at ____.', 'recepção', 'reception'],
            ['We ____ at two yesterday.', 'fizemos check-in', 'checked in'],
            ['What time is ____?', 'check-out', 'check-out']
        ],
        31: [
            ['We will be late ____ we leave now.', 'a menos que', 'unless'],
            ['I ____ to get an interview next week.', 'espero', 'hope'],
            ['I ____ I had more free time.', 'gostaria', 'wish'],
            ['Unless you apply today, you will miss the ____.', 'oportunidade', 'opportunity']
        ]
    };

    const practiceChecks = {
        1: [
            ['Transform', 'Ask for the reason: "You overslept on Monday."', 'Why + did + verbo base', 'Why did you oversleep on Monday?'],
            ['Choose', 'Choose: Where (were you / did you be) when the call arrived?', 'be no passado não usa did', 'were you'],
            ['Find the error', 'Correct: "Did he apologized for the delay?"', 'did + verbo base', 'Did he apologize for the delay?'],
            ['Combine', 'Connect the result: "The bus left. I took a taxi."', 'so', 'The bus left, so I took a taxi.']
        ],
        2: [
            ['Find the error', 'Correct: "First, we check in at the hotel."', 'passado de check in', 'First, we checked in at the hotel.'],
            ['Complete', 'The train was late, ____ we took a taxi.', 'consequência', 'so'],
            ['Transform', 'Make a question: "They got lost near the station."', 'did + verbo base', 'Did they get lost near the station?'],
            ['Choose', 'Choose the best final marker: (First / Finally), we found the hotel.', 'fim da história', 'Finally']
        ],
        3: [
            ['Find the error', 'Correct: "The subway is more much convenient than the bus."', 'modificador antes do comparativo', 'The subway is much more convenient than the bus.'],
            ['Transform', 'Show equality: "The two plans are equally useful."', 'as + adjetivo + as', 'The first plan is as useful as the second plan.'],
            ['Choose', 'Choose the small difference: The morning ticket is (a little / far) cheaper.', 'diferença pequena', 'a little'],
            ['Combine', 'Compare the crowds: "The afternoon class has fewer people than the evening class."', 'not as...as', 'The afternoon class is not as crowded as the evening class.']
        ],
        4: [
            ['Find the error', 'Correct: "This is the bestest option."', 'forma irregular', 'This is the best option.'],
            ['Find the error', 'Correct: "It is the most cheapest hotel."', 'uma única forma de superlativo', 'It is the cheapest hotel.'],
            ['Transform', 'Use a superlative: "No app is more useful than this one."', 'the most useful', 'This is the most useful app.'],
            ['Choose', 'Choose: That is the (farthest / most far) station.', 'superlativo irregular', 'farthest']
        ],
        5: [
            ['Find the error', 'Correct: "She gave me two useful advices."', 'substantivo incontável', 'She gave me some useful advice.'],
            ['Find the error', 'Correct: "We do not have many time."', 'quantidade incontável', 'We do not have much time.'],
            ['Choose', 'Choose: I até (a / an) apple before class.', 'som inicial', 'an'],
            ['Choose', 'Choose: There are (a little / a few) chairs outside.', 'substantivo contável', 'a few']
        ],
        6: [
            ['Find the error', 'Correct: "They was waiting near the door."', 'they + were', 'They were waiting near the door.'],
            ['Find the error', 'Correct: "I were cooking at eight."', 'I + was', 'I was cooking at eight.'],
            ['Transform', 'Make negative: "She was listening carefully."', 'was not + -ing', 'She was not listening carefully.'],
            ['Choose', 'Choose: I was cooking (while / when) she was setting the table.', 'duas ações em progresso', 'while']
        ],
        7: [
            ['Find the error', 'Correct: "I was drive when the phone rang."', 'was + verbo-ing', 'I was driving when the phone rang.'],
            ['Find the error', 'Correct: "The alarm was rang during dinner."', 'ação curta no Past Simple', 'The alarm rang during dinner.'],
            ['Transform', 'Combine with when: "Marta was presenting. The projector stopped."', 'ação longa + when + interrupção', 'Marta was presenting when the projector stopped.'],
            ['Choose', 'Choose: We were walking home (when / while) it started to rain.', 'evento que interrompe', 'when']
        ],
        9: [
            ['Choose', 'Look at the dark clouds. It (is going to / will probably) rain.', 'previsão com evidência visível', 'is going to'],
            ['Transform', 'Ask about the first change: "They are going to change the schedule."', 'What + are + subject + going to', 'What are they going to change first?'],
            ['Combine', 'Add the reason: "We are going to prepare tonight. The event starts early."', 'because', 'We are going to prepare tonight because the event starts early.'],
            ['Transform', 'Keep the event but change the location: "They are going to cancel the picnic."', 'not cancel; move indoors', 'They are not going to cancel the picnic; they are going to move it indoors.']
        ],
        10: [
            ['Find the error', 'Correct: "I will to call the client."', 'will + verbo base', 'I will call the client.'],
            ['Find the error', 'Correct: "She will arrives late."', 'will + verbo sem s', 'She will arrive late.'],
            ['Transform', 'Make a question: "Prices will go up next year."', 'will antes do sujeito', 'Will prices go up next year?'],
            ['Choose', 'The phone is ringing. I (will answer / am going to answer) it.', 'decisão tomada agora', 'will answer']
        ],
        11: [
            ['Find the error', 'Correct: "I meeting my sister tonight."', 'am + verbo-ing', 'I am meeting my sister tonight.'],
            ['Find the error', 'Correct: "They are leave at seven."', 'are + verbo-ing', 'They are leaving at seven.'],
            ['Transform', 'Make a question: "She is having lunch with a client on Friday."', 'is antes do sujeito', 'Is she having lunch with a client on Friday?'],
            ['Choose', 'Choose the fixed arrangement: (I am meeting Ana at six / I may call Ana someday).', 'horário confirmado', 'I am meeting Ana at six.']
        ],
        12: [
            ['Choose', 'Choose for a confirmed appointment: I (am meeting / will meet) the dentist at three.', 'compromisso marcado', 'am meeting'],
            ['Choose', 'Choose for an existing plan: We (are going to present / will present) the idea next month.', 'plano anterior', 'are going to present'],
            ['Choose', 'Choose for an immediate offer: I (will send / am sending) the file for you.', 'oferta feita agora', 'will send'],
            ['Find the error', 'Correct: "I will going to call her later."', 'use apenas uma forma de futuro', 'I will call her later. / I am going to call her later.']
        ],
        13: [
            ['Find the error', 'Correct: "Could I to borrow your pen?"', 'could + verbo base', 'Could I borrow your pen?'],
            ['Find the error', 'Correct: "Can you opening the window?"', 'can + verbo base', 'Can you open the window?'],
            ['Transform', 'Make the request more polite: "Repeat the instruction."', 'could + please', 'Could you repeat the instruction, please?'],
            ['Choose', 'Choose the softer request: (Can I leave? / Could I leave a little early, please?)', 'pedido mais educado', 'Could I leave a little early, please?']
        ],
        14: [
            ['Find the error', 'Correct: "Visitors must to wear a badge."', 'must + verbo base', 'Visitors must wear a badge.'],
            ['Find the error', 'Correct: "She needs call the doctor."', 'need + to + verbo', 'She needs to call the doctor.'],
            ['Transform', 'Make a question: "We have to pay now."', 'do + have to', 'Do we have to pay now?'],
            ['Choose', '"You do not have to print it" means: (It is optional / It is forbidden).', 'ausência de necessidade', 'It is optional.']
        ],
        15: [
            ['Transform', 'Make this advice tactful: "Finish the report now."', 'maybe + should', 'Maybe you should finish the report first.'],
            ['Combine', 'Add a reason: "You should choose one priority. Your list is too long."', 'because', 'You should choose one priority because your list is too long.'],
            ['Choose', 'Choose the supportive advice: (Stop complaining. / You could divide the task into three steps.)', 'opção gentil e específica', 'You could divide the task into three steps.'],
            ['Transform', 'Give a careful warning: "Do not compare your progress with other people."', 'I do not think you should', 'I do not think you should compare your progress with other people\'s.']
        ],
        17: [
            ['Find the error', 'Correct: "She have visited three countries."', 'she + has', 'She has visited three countries.'],
            ['Find the error', 'Correct: "Have you ever went abroad?"', 'past participle', 'Have you ever gone abroad?'],
            ['Transform', 'Make an experience question: "You tried Thai food."', 'Have you ever + participio', 'Have you ever tried Thai food?'],
            ['Choose', 'Choose: I have (never traveled / traveled never) alone.', 'posição de never', 'never traveled']
        ],
        18: [
            ['Find the error', 'Correct: "I have sent already the report."', 'already antes do participio', 'I have already sent the report.'],
            ['Find the error', 'Correct: "Did you finish the task yet?"', 'resultado ligado ao presente', 'Have you finished the task yet?'],
            ['Transform', 'Use yet: "She has not replied."', 'yet no final', 'She has not replied yet.'],
            ['Choose', 'Choose: Have the guests arrived (already / yet)?', 'pergunta sobre algo esperado', 'yet']
        ],
        19: [
            ['Find the error', 'Correct: "I have visited Chile in 2019."', 'tempo terminado', 'I visited Chile in 2019.'],
            ['Find the error', 'Correct: "She has finished the course last month."', 'last month pede Past Simple', 'She finished the course last month.'],
            ['Choose', 'Choose: I (have tried / tried) that restaurant twice, but I do not remember the dates.', 'experiência sem tempo exato', 'have tried'],
            ['Transform', 'Add yesterday: "I have sent the email."', 'mude para Past Simple', 'I sent the email yesterday.']
        ],
        20: [
            ['Find the error', 'Clara is still at the pharmacy. Correct: "She has been to the pharmacy."', 'foi e ainda não voltou', 'She has gone to the pharmacy.'],
            ['Find the error', 'He visited London twice and returned. Correct: "He has gone to London twice."', 'visitou e voltou', 'He has been to London twice.'],
            ['Choose', 'Paula is not at home. She has (been / gone) to work.', 'ainda está fora', 'gone'],
            ['Transform', 'Make a question about experience: "You have been to Argentina."', 'have antes do sujeito', 'Have you been to Argentina?']
        ],
        21: [
            ['Find the error', 'Correct: "My cough has get worse since yesterday."', 'has + participio', 'My cough has got worse since yesterday.'],
            ['Choose', 'The fever ended earlier than expected: It has (already / still) gone down.', 'resultado antecipado', 'already'],
            ['Transform', 'Ask about a result until now: "The swelling has not gone down."', 'yet em pergunta', 'Has the swelling gone down yet?'],
            ['Combine', 'Connect the change and next step: "The rash has spread. I need to call the clinic."', 'so', 'The rash has spread, so I need to call the clinic.']
        ],
        22: [
            ['Find the error', 'Correct: "I have had back pain since three days."', 'for + período', 'I have had back pain for three days.'],
            ['Find the error', 'Correct: "She has felt dizzy for Friday."', 'since + ponto inicial', 'She has felt dizzy since Friday.'],
            ['Transform', 'Ask about duration: "I have had this cough for a week."', 'How long...?', 'How long have you had this cough?'],
            ['Choose', 'Choose: The pain started Monday, so I have had it (for / since) Monday.', 'ponto inicial', 'since']
        ],
        23: [
            ['Find the error', 'Correct: "The meeting room is in the second floor."', 'andar pede on', 'The meeting room is on the second floor.'],
            ['Choose', 'The chair is (in / at) the corner of the office.', 'canto dentro de um ambiente', 'in'],
            ['Choose', 'The café is (in / at) the corner of Lake Street and Park Road.', 'esquina entre ruas', 'at'],
            ['Transform', 'Add both locations: "Leave the package. The front desk is in the lobby."', 'at + ponto; in + área', 'Leave the package at the front desk in the lobby.']
        ],
        25: [
            ['Find the error', 'Correct: "Walk across the park to reach the other gate."', 'caminho dentro do parque', 'Walk through the park to reach the other gate.'],
            ['Find the error', 'Correct: "The bus went through the station and stopped inside."', 'movimento para dentro', 'The bus went into the station and stopped inside.'],
            ['Transform', 'Combine the route: park -> bridge -> station.', 'through + across + to', 'Walk through the park, across the bridge, and to the station.'],
            ['Choose', 'Choose: We walked (along / into) the river for twenty minutes.', 'seguindo ao lado', 'along']
        ],
        26: [
            ['Choose', 'Please send the form (by / until) Friday.', 'prazo final', 'by'],
            ['Choose', 'The support desk stays open (by / until) noon.', 'continua até o horário', 'until'],
            ['Find the error', 'Correct: "We talked for the meeting."', 'durante um evento', 'We talked during the meeting.'],
            ['Transform', 'Express the complete time window: "The workshop starts at nine and ends at eleven."', 'from...to...', 'The workshop runs from nine to eleven.']
        ],
        27: [
            ['Order', 'Put the stages in order: turn left after the library / cross at the pedestrian crossing / take the second exit.', 'inicio, rotatória, curva', 'Cross at the pedestrian crossing, take the second exit, and turn left after the library.'],
            ['Choose', 'The entrance is (before / after) the café, so stop when you see it on your right.', 'a entrada vem primeiro', 'before'],
            ['Transform', 'Check the route: "I take the second exit."', 'So...right?', 'So I take the second exit, right?'],
            ['Find the error', 'Correct: "Take the second exit in the roundabout."', 'at + ponto da rota', 'Take the second exit at the roundabout.']
        ],
        28: [
            ['Find the error', 'Correct: "I have a reservation in my name."', 'under + nome', 'I have a reservation under my name.'],
            ['Find the error', 'Correct: "Could I have other towel?"', 'mais um item', 'Could I have another towel?'],
            ['Transform', 'Make a polite complaint: "The shower does not work."', 'descreva o problema + pedido', 'The shower is not working. Could someone check it, please?'],
            ['Choose', 'Choose: Is breakfast (included / including) in the price?', 'voz passiva', 'included']
        ],
        29: [
            ['Find the error', 'Correct: "I enjoy to study in the morning."', 'enjoy + -ing', 'I enjoy studying in the morning.'],
            ['Find the error', 'Correct: "She decided taking a short course."', 'decide + to + verbo', 'She decided to take a short course.'],
            ['Transform', 'Use avoid: "I do not study when I am exhausted."', 'avoid + -ing', 'I avoid studying when I am exhausted.'],
            ['Choose', 'Choose: Do you mind (waiting / to wait) a minute?', 'mind + -ing', 'waiting']
        ],
        30: [
            ['Find the error', 'Correct: "If it will rain tomorrow, we will stay home."', 'if + presente', 'If it rains tomorrow, we will stay home.'],
            ['Find the error', 'Correct: "If I sleep badly, I will always feel tired."', 'fato habitual: presente + presente', 'If I sleep badly, I always feel tired.'],
            ['Choose', 'Choose the zero conditional: (If water reaches 100 C, it boils. / If it rains, I will call.)', 'fato geral', 'If water reaches 100 C, it boils.'],
            ['Transform', 'Make a real future condition: "Practice daily. You will improve."', 'if + presente, will + verbo', 'If you practice daily, you will improve.']
        ],
        31: [
            ['Find the error', 'Correct: "Unless we do not hurry, we will miss the train."', 'unless já significa if not', 'Unless we hurry, we will miss the train.'],
            ['Find the error', 'Correct: "I wish I have more free time."', 'wish + passado para situação imaginada', 'I wish I had more free time.'],
            ['Choose', 'Choose for a realistic possibility: (I hope I get the job. / I wish I had wings.)', 'esperanca real', 'I hope I get the job.'],
            ['Transform', 'Use unless: "If you do not apply today, you will miss the opportunity."', 'unless = if not', 'Unless you apply today, you will miss the opportunity.']
        ]
    };

    function createPracticeItems(bank, lessonNumber) {
        const vocab = bank.vocab || [];
        const examples = bank.examples || [];
        const term = (index) => vocab[index] || vocab[0] || ['answer', 'resposta', 'Answer the question.'];
        const example = (index) => examples[index] || examples[0] || 'I can explain this topic.';
        const override = practiceClozeOverrides[lessonNumber];
        const completeItems = override
            ? override.map(([prompt, hint, answer]) => ({ type: 'Complete', prompt, hint, answer }))
            : [0, 1, 2, 3].map((index) => createCompleteItem(term(index)));
        const unscrambleItems = [0, 1].map((index) => ({
            type: 'Unscramble',
            prompt: `Put in order: ${example(index).split(' ').reverse().join(' / ')}`,
            hint: 'ordem da frase',
            answer: example(index)
        }));
        const checks = (practiceChecks[lessonNumber] || [
            ['Find the error', `Correct: "${example(2)}"`, 'estrutura da lição', example(2)],
            ['Choose', `Choose the sentence that follows the rule: "${example(0)}"`, 'regra principal', example(0)],
            ['Transform', `Rewrite using another form from the lesson: "${example(1)}"`, 'observe os exemplos', example(3)],
            ['Complete', 'Complete with one key word from the lesson: ____', 'vocabulário da aula', term(0)[0]]
        ]).map(([type, prompt, hint, answer]) => ({ type, prompt, hint, answer }));

        return [...completeItems, ...unscrambleItems, ...checks];
    }

    const translationPortuguese = {
        1: ['Por que você acordou tarde na segunda-feira?', 'Onde você estava quando percebeu que a pasta tinha desaparecido?', 'Primeiro, eu liguei para meu gerente; depois, enviei o arquivo.', 'Nós conseguimos resolver o problema antes da reunião.', 'Eu peguei emprestado o carregador do meu irmão.', 'Eles voltaram para casa tarde.'],
        2: ['Primeiro, nós fizemos check-in no hotel.', 'Depois, nós nos perdemos perto da estação.', 'Nós decidimos explorar a área a pé.', 'Finalmente, encontramos um restaurante perto do rio.', 'Ela reservou um quarto pela internet.', 'O atraso mudou nosso plano.'],
        3: ['O metrô é muito mais conveniente do que o ônibus.', 'O plano de dias úteis é um pouco mais barato do que o plano de fim de semana.', 'A turma da tarde não é tão lotada quanto a turma da noite.', 'O suporte online é tão útil quanto o suporte presencial.', 'Este aplicativo é muito mais confiável.', 'O novo escritório é um pouco mais perto.'],
        4: ['Este é o aplicativo mais útil para vocabulário.', 'Segunda de manhã é o pior horário para dirigir no centro.', 'Essa foi a explicação mais fácil do curso.', 'Qual é o melhor restaurante perto da sua casa?', 'Este é o plano menos caro.', 'Sexta-feira é o dia mais movimentado.'],
        5: ['Eu preciso de algumas informações sobre o evento.', 'Há algumas cadeiras na outra sala.', 'Nós não temos muito tempo antes do almoço.', 'Você poderia comprar uma garrafa de água?', 'Não há muita informação.', 'Muitas pessoas chegaram cedo.'],
        6: ['Eu estava esperando do lado de fora do banco.', 'Eles estavam conversando perto da entrada.', 'Estava chovendo quando nós chegamos.', 'O que você estava fazendo às nove?', 'Eles estavam em pé perto da porta.', 'Eu estava assistindo ao noticiário.'],
        7: ['Eu estava apresentando quando o computador travou.', 'Ela estava cozinhando enquanto eu arrumava a mesa.', 'O que você estava fazendo quando o alarme tocou?', 'Eles estavam voltando para casa quando começou a chover.', 'Alguém bateu na porta.', 'Meu telefone tocou duas vezes.'],
        9: ['Nós vamos preparar a sala hoje à noite porque o evento começa cedo.', 'Olhe para aquelas nuvens escuras. Vai chover.', 'O que você vai mudar primeiro?', 'Eles não vão cancelar o piquenique; eles vão levá-lo para um local fechado.', 'Ela vai melhorar o horário.', 'Eles vão reduzir o preço.'],
        10: ['Eu acho que a reunião será curta.', 'Eu vou enviar o endereço para você.', 'Ela provavelmente vai chegar atrasada.', 'Os preços vão subir no próximo ano?', 'Eu acredito que vai dar certo.', 'Nós esperamos que os preços subam.'],
        11: ['Eu vou encontrar meu professor amanhã.', 'Nós vamos sair às sete no sábado.', 'Ela vai almoçar com um cliente na sexta-feira.', 'Você vai trabalhar de casa na próxima semana?', 'Eu tenho uma consulta na sexta-feira.', 'Confira sua agenda.'],
        12: ['Eu vou encontrar a equipe às nove.', 'Nós vamos apresentar a ideia no próximo mês.', 'Eu acho que o cliente vai gostar.', 'Eu vou enviar o arquivo depois da aula.', 'É provável que dê certo.', 'É improvável que chova.'],
        13: ['Posso usar seu carregador?', 'Eu poderia sair cinco minutos mais cedo?', 'Podemos usar esta sala?', 'Você poderia repetir a instrução?', 'Posso sair mais cedo hoje?', 'Eu poderia pegar sua caneta emprestada?'],
        14: ['Você deve mostrar seu documento na recepção.', 'Nós temos que entregar o formulário hoje.', 'Ela precisa ligar para o médico antes do meio-dia.', 'Nós temos que pagar agora?', 'Visitantes devem usar crachá.', 'Nós temos que cumprir o prazo.'],
        15: ['Talvez você devesse escolher uma prioridade porque sua lista está muito longa.', 'Se eu fosse você, desligaria as notificações por uma hora.', 'Você poderia tornar a meta mais administrável dividindo-a em três etapas.', 'Eu não acho que você deveria comparar seu progresso com o de outra pessoa.', 'Escolha uma prioridade hoje.', 'Estabeleça um limite claro no trabalho.'],
        17: ['Você já trabalhou com clientes estrangeiros?', 'Eu nunca viajei sozinho.', 'Ela já visitou três países.', 'Nós já experimentamos aquele restaurante.', 'Isso é uma conquista.', 'Você já experimentou este aplicativo?'],
        18: ['Eu já enviei o relatório.', 'Ela ainda não respondeu.', 'Você já atualizou o documento?', 'Ele nunca perdeu um prazo.', 'Nós concluímos a tarefa.', 'Ele entregou o arquivo.'],
        19: ['Eu visitei Salvador em 2021.', 'Eu já visitei Salvador duas vezes.', 'Ela terminou o curso no mês passado.', 'Ela terminou o curso e agora se sente mais confiante.', 'Nós terminamos o projeto na sexta-feira passada.', 'Nós já terminamos o projeto.'],
        20: ['Eu já fui a esse museu duas vezes.', 'Ela foi à farmácia e voltará logo.', 'Você já foi à Argentina?', 'Eles já foram para casa.', 'Eles já voltaram.', 'Ela foi ao banco e ainda não voltou.'],
        21: ['Minha tosse piorou desde ontem.', 'A febre já baixou.', 'Eu ainda me sinto fraco, mas o remédio começou a fazer efeito.', 'A erupção se espalhou, então preciso ligar para a clínica.', 'Eu ainda me sinto congestionado.', 'Ela tem se sentido enjoada desde o almoço.'],
        22: ['Há quanto tempo você está com essa tosse?', 'Estou com dor nas costas há três dias.', 'Ela se sente tonta desde sexta-feira.', 'Você tem alguma alergia?', 'Tome uma dose à noite.', 'O médico me deu uma receita.'],
        23: ['Deixe o pacote na recepção do saguão.', 'A sala de reunião fica no segundo andar.', 'Há uma pequena mesa no canto do escritório.', 'O café fica na esquina da Lake Street com a Park Road.', 'Espere dentro do prédio.', 'O táxi está do lado de fora.'],
        25: ['Atravesse o parque e a ponte.', 'Passe pelo supermercado e vire à direita.', 'Ela correu para dentro da estação porque estava atrasada.', 'Nós caminhamos ao longo do rio depois do almoço.', 'Atravesse a rua.', 'Passe pelo banco.'],
        26: ['Por favor, envie o formulário assinado até sexta-feira.', 'O atendimento fica aberto até o meio-dia.', 'A oficina acontece das nove às onze.', 'Nós responderemos dentro de dois dias úteis.', 'Ligue para mim antes do almoço.', 'Podemos conversar depois da aula.'],
        27: ['Primeiro, atravesse na faixa de pedestres e continue até a rotatória.', 'Pegue a segunda saída e depois vire à esquerda após a biblioteca.', 'A entrada lateral fica antes ou depois do café?', 'Então eu uso a saída norte e atravesso o estacionamento, certo?', 'Use a saída norte.', 'A biblioteca é um ponto de referência útil.'],
        28: ['Eu tenho uma reserva no meu nome.', 'Eu poderia receber outra toalha, por favor?', 'O ar-condicionado não está funcionando.', 'O café da manhã está incluído no preço?', 'Meu cartão-chave não funciona.', 'Que horas é o check-out?'],
        29: ['Eu gosto de estudar de manhã.', 'Ela decidiu fazer um curso curto.', 'Você se importa de esperar um minuto?', 'Nós esperamos falar com mais naturalidade.', 'Eu espero melhorar minha pronúncia.', 'Você se importa de esperar?'],
        30: ['Se eu estudo de manhã, lembro mais.', 'Se chover amanhã, vamos cancelar o piquenique.', 'Você vai melhorar se praticar todos os dias.', 'Se o escritório estiver fechado, vou ligar mais tarde.', 'Você vai melhorar com prática.', 'Se nós nos apressarmos, chegaremos no horário.'],
        31: ['A menos que nós nos apressemos, vamos perder o trem.', 'Eu espero falar com mais confiança.', 'Eu queria ter mais tempo livre.', 'Você vai perder a oportunidade a menos que se candidate hoje.', 'Eu espero conseguir o emprego.', 'Eu queria ter mais confiança.']
    };

    const translationExtraAnswers = {
        13: ['Can I leave early today?', 'Could I borrow your pen?'],
        19: ['We finished the project last Friday.', 'We have finished the project.'],
        20: ['They are back now.', 'She has gone to the bank and has not returned yet.'],
        22: ['Take one dose at night.', 'The doctor gave me a prescription.'],
        28: ['My key card does not work.', 'What time is check-out?'],
        30: ['You will improve with practice.', 'If we hurry, we will be on time.'],
        31: ['I hope I get the job.', 'I wish I had more confidence.']
    };

    function createTranslations(bank, title, lessonNumber) {
        const localized = translationPortuguese[lessonNumber];
        if (localized) {
            const extras = translationExtraAnswers[lessonNumber] || [bank.vocab?.[4]?.[2], bank.vocab?.[5]?.[2]];
            const answers = [...(bank.examples || []).slice(0, 4), ...extras];
            return localized.map((pt, index) => ({ pt, en: answers[index] }));
        }

        const label = (bank.matchLabel || bank.label || '').toLowerCase();
        if (/past simple/.test(label)) return [
            { pt: 'Eu acordei tarde e perdi o primeiro ônibus.', en: 'I overslept and missed the first bus.' },
            { pt: 'Ela não esqueceu a reunião.', en: 'She did not forget the meeting.' },
            { pt: 'Você conseguiu resolver o problema?', en: 'Did you manage to solve the problem?' },
            { pt: 'Nós voltamos para casa depois da meia-noite.', en: 'We returned home after midnight.' },
            { pt: 'Eu pedi desculpas pelo atraso.', en: 'I apologized for the delay.' },
            { pt: 'Eles terminaram o projeto ontem.', en: 'They finished the project yesterday.' }
        ];
        if (/complete past/.test(label)) return [
            { pt: 'Primeiro, nós fizemos check-in no hotel.', en: 'First, we checked in at the hotel.' },
            { pt: 'Depois, nós nos perdemos perto da estação.', en: 'Then we got lost near the station.' },
            { pt: 'Nós decidimos explorar a área a pé.', en: 'We decided to explore the area on foot.' },
            { pt: 'Finalmente, encontramos um restaurante perto do rio.', en: 'Finally, we found a restaurant by the river.' },
            { pt: 'A viagem começou com um atraso.', en: 'The trip started with a delay.' },
            { pt: 'Eu lembrei o endereço mais tarde.', en: 'I remembered the address later.' }
        ];
        if (/comparative/.test(label)) return [
            { pt: 'O escritório novo é mais perto do que o antigo.', en: 'The new office is closer than the old one.' },
            { pt: 'Aulas online são mais flexíveis do que aulas presenciais.', en: 'Online classes are more flexible than in-person classes.' },
            { pt: 'Essa rota é menos estressante do que a rodovia.', en: 'This route is less stressful than the highway.' },
            { pt: 'O trem é mais rápido do que o ônibus?', en: 'Is the train faster than the bus?' },
            { pt: 'Esse aplicativo é mais confiável.', en: 'This app is more reliable.' },
            { pt: 'O centro é mais movimentado à noite.', en: 'The center is busier at night.' }
        ];
        if (/superlative/.test(label)) return [
            { pt: 'Esse é o aplicativo mais útil para vocabulário.', en: 'This is the most useful app for vocabulary.' },
            { pt: 'Segunda de manhã é o pior horário para dirigir no centro.', en: 'Monday morning is the worst time to drive downtown.' },
            { pt: 'Essa foi a explicação mais fácil do curso.', en: 'That was the easiest explanation in the course.' },
            { pt: 'Qual é o melhor restaurante perto da sua casa?', en: 'What is the best restaurant near your house?' },
            { pt: 'Esse é o plano menos caro.', en: 'This is the least expensive plan.' },
            { pt: 'Foi o assento mais confortável.', en: 'It was the most comfortable seat.' }
        ];
        if (/articles|quantifiers/.test(label)) return [
            { pt: 'Eu preciso de algumas informações sobre o evento.', en: 'I need some information about the event.' },
            { pt: 'Há algumas cadeiras na outra sala.', en: 'There are a few chairs in the next room.' },
            { pt: 'Nós não temos muito tempo antes do almoço.', en: 'We do not have much time before lunch.' },
            { pt: 'Você pode comprar uma garrafa de água?', en: 'Could you buy a bottle of water?' },
            { pt: 'Muitas pessoas chegaram cedo.', en: 'Many people arrived early.' },
            { pt: 'Nós temos água suficiente para o grupo.', en: 'We have enough water for the group.' }
        ];
        if (/past continuous|interrupted|setting the scene/.test(label)) return [
            { pt: 'Eu estava esperando do lado de fora do banco.', en: 'I was waiting outside the bank.' },
            { pt: 'Eles estavam conversando perto da entrada.', en: 'They were talking near the entrance.' },
            { pt: 'Estava chovendo quando nós chegamos.', en: 'It was raining when we arrived.' },
            { pt: 'O que você estava fazendo às nove?', en: 'What were you doing at nine?' },
            { pt: 'Eu estava apresentando quando o computador travou.', en: 'I was presenting when the computer crashed.' },
            { pt: 'Ela estava cozinhando enquanto eu arrumava a mesa.', en: 'She was cooking while I was setting the table.' }
        ];
        if (/going to/.test(label)) return [
            { pt: 'Eu vou revisar a lição hoje à noite.', en: 'I am going to review the lesson tonight.' },
            { pt: 'Ela vai economizar dinheiro para uma viagem.', en: 'She is going to save money for a trip.' },
            { pt: 'Você vai começar uma nova rotina?', en: 'Are you going to start a new routine?' },
            { pt: 'Eles não vão cancelar o evento.', en: 'They are not going to cancel the event.' },
            { pt: 'Eu vou preparar o jantar.', en: 'I am going to prepare dinner.' },
            { pt: 'Nós vamos visitar minha tia.', en: 'We are going to visit my aunt.' }
        ];
        if (/will/.test(label)) return [
            { pt: 'Eu acho que a reunião será curta.', en: 'I think the meeting will be short.' },
            { pt: 'Eu vou te enviar o endereço.', en: 'I will send you the address.' },
            { pt: 'Ela provavelmente vai chegar atrasada.', en: 'She will probably arrive late.' },
            { pt: 'Os preços vão subir no próximo ano?', en: 'Will prices go up next year?' },
            { pt: 'Eu vou cuidar dos ingressos.', en: 'I will take care of the tickets.' },
            { pt: 'Eu prometo que vou ligar.', en: 'I promise I will call.' }
        ];
        if (/present continuous for future/.test(label)) return [
            { pt: 'Eu vou encontrar meu professor amanhã.', en: 'I am meeting my teacher tomorrow.' },
            { pt: 'Nós vamos sair às sete no sábado.', en: 'We are leaving at seven on Saturday.' },
            { pt: 'Ela vai almoçar com um cliente na sexta.', en: 'She is having lunch with a client on Friday.' },
            { pt: 'Você vai trabalhar de casa na próxima semana?', en: 'Are you working from home next week?' },
            { pt: 'Eles vão voar para Recife.', en: 'They are flying to Recife.' },
            { pt: 'Nós vamos remarcar a ligação.', en: 'We are rescheduling the call.' }
        ];
        if (/future review/.test(label)) return [
            { pt: 'Eu vou encontrar a equipe às nove.', en: 'I am meeting the team at nine.' },
            { pt: 'Nós vamos apresentar a ideia no próximo mês.', en: 'We are going to present the idea next month.' },
            { pt: 'Eu acho que o cliente vai gostar.', en: 'I think the client will like it.' },
            { pt: 'Eu vou enviar o arquivo depois da aula.', en: 'I will send the file after class.' },
            { pt: 'A reunião está confirmada para terça.', en: 'The meeting is confirmed for Tuesday.' },
            { pt: 'Provavelmente vai dar certo.', en: 'It will probably work out.' }
        ];
        if (/permission|can, could/.test(label)) return [
            { pt: 'Posso usar seu carregador?', en: 'Can I use your charger?' },
            { pt: 'Eu poderia sair cinco minutos mais cedo?', en: 'Could I leave five minutes early?' },
            { pt: 'Podemos usar esta sala?', en: 'Can we use this room?' },
            { pt: 'Você poderia repetir a instrução?', en: 'Could you repeat the instruction?' },
            { pt: 'Posso pegar sua caneta emprestada?', en: 'Could I borrow your pen?' },
            { pt: 'Desculpa interromper.', en: 'Sorry to interrupt.' }
        ];
        if (/must|have to|need to/.test(label)) return [
            { pt: 'Você deve mostrar seu documento na recepção.', en: 'You must show your ID at reception.' },
            { pt: 'Nós temos que enviar o formulário hoje.', en: 'We have to submit the form today.' },
            { pt: 'Ela precisa ligar para o médico antes do meio-dia.', en: 'She needs to call the doctor before noon.' },
            { pt: 'Nós temos que pagar agora?', en: 'Do we have to pay now?' },
            { pt: 'Visitantes devem usar crachá.', en: 'Visitors must wear a badge.' },
            { pt: 'Eu preciso terminar este formulário.', en: 'I need to finish this form.' }
        ];
        if (/should|advice/.test(label)) return [
            { pt: 'Você deveria fazer uma pausa curta.', en: 'You should take a short break.' },
            { pt: 'Talvez você devesse escrever um plano de estudo.', en: 'Maybe you should write a study plan.' },
            { pt: 'Você não deveria se comparar com os outros.', en: 'You should not compare yourself to others.' },
            { pt: 'Se eu fosse você, eu praticaria dez minutos por dia.', en: 'If I were you, I would practice for ten minutes a day.' },
            { pt: 'Você deveria descansar esta semana.', en: 'You should rest this week.' },
            { pt: 'Ele deveria evitar café demais.', en: 'He should avoid too much coffee.' }
        ];
        if (/present perfect|ever|never|already|yet|been and gone/.test(label)) return [
            { pt: 'Você já trabalhou com clientes estrangeiros?', en: 'Have you ever worked with foreign clients?' },
            { pt: 'Eu nunca viajei sozinho.', en: 'I have never traveled alone.' },
            { pt: 'Ela já visitou três países.', en: 'She has visited three countries.' },
            { pt: 'Nós já experimentamos aquele restaurante antes.', en: 'We have tried that restaurant before.' },
            { pt: 'Eu já enviei o relatório.', en: 'I have already sent the report.' },
            { pt: 'Ela ainda não respondeu.', en: 'She has not replied yet.' }
        ];
        if (/health|medical/.test(label)) return [
            { pt: 'Eu estou com dor de cabeça.', en: 'I have a headache.' },
            { pt: 'Ela está com dor de garganta.', en: 'She has a sore throat.' },
            { pt: 'Ele está tossindo há dois dias.', en: 'He has had a cough for two days.' },
            { pt: 'Você está com febre?', en: 'Do you have a fever?' },
            { pt: 'Eu me sinto tonto de manhã.', en: 'I feel dizzy in the morning.' },
            { pt: 'Você deveria marcar uma consulta.', en: 'You should book an appointment.' }
        ];
        if (/prepositions of place/.test(label)) return [
            { pt: 'A farmácia fica em frente ao banco.', en: 'The pharmacy is across from the bank.' },
            { pt: 'Minhas chaves estão embaixo do caderno.', en: 'My keys are under the notebook.' },
            { pt: 'O hotel fica na Green Street.', en: 'The hotel is on Green Street.' },
            { pt: 'Encontre-me na entrada principal.', en: 'Meet me at the main entrance.' },
            { pt: 'A bolsa está atrás da cadeira.', en: 'The bag is behind the chair.' },
            { pt: 'A luminária está ao lado da cama.', en: 'The lamp is next to the bed.' }
        ];
        if (/movement|directions|hotel|time|at the hotel|from a to b/.test(label)) return [
            { pt: 'Siga em frente por dois quarteirões e vire à esquerda.', en: 'Go straight for two blocks and turn left.' },
            { pt: 'A entrada fica em frente ao supermercado.', en: 'The entrance is opposite the supermarket.' },
            { pt: 'Eu tenho uma reserva no meu nome.', en: 'I have a reservation under my name.' },
            { pt: 'O chuveiro não está funcionando.', en: 'The shower is not working.' },
            { pt: 'Minha consulta é as três na quinta-feira.', en: 'My appointment is at three on Thursday.' },
            { pt: 'Atravesse o parque e vire à direita.', en: 'Walk through the park and turn right.' }
        ];
        if (/gerunds|infinitives/.test(label)) return [
            { pt: 'Eu gosto de estudar de manhã.', en: 'I enjoy studying in the morning.' },
            { pt: 'Ela decidiu fazer um curso curto.', en: 'She decided to take a short course.' },
            { pt: 'Você se importa de esperar um minuto?', en: 'Do you mind waiting a minute?' },
            { pt: 'Nós esperamos falar com mais naturalidade.', en: 'We hope to speak more naturally.' },
            { pt: 'Eu evito estudar quando estou exausto.', en: 'I avoid studying when I am exhausted.' },
            { pt: 'Ele prometeu ligar.', en: 'He promised to call.' }
        ];
        if (/conditional|unless|wishes/.test(label)) return [
            { pt: 'Se eu estudo de manhã, eu lembro mais.', en: 'If I study in the morning, I remember more.' },
            { pt: 'Se chover amanhã, nós vamos cancelar o piquenique.', en: 'If it rains tomorrow, we will cancel the picnic.' },
            { pt: 'Você vai melhorar se praticar todos os dias.', en: 'You will improve if you practice every day.' },
            { pt: 'A menos que a gente se apresse, vamos perder o trem.', en: 'Unless we hurry, we will miss the train.' },
            { pt: 'Eu espero falar com mais confiança.', en: 'I hope to speak more confidently.' },
            { pt: 'Eu queria ter mais tempo livre.', en: 'I wish I had more free time.' }
        ];
        return [
            { pt: 'Eu melhorei minha confiança desde a primeira aula.', en: 'I have improved my confidence since the first lesson.' },
            { pt: 'Eu evitava falar, mas agora tento com mais frequência.', en: 'I used to avoid speaking, but now I try more often.' },
            { pt: 'Se eu praticar todos os dias, vou continuar melhorando.', en: 'If I practice every day, I will keep improving.' },
            { pt: 'Meu próximo passo é responder uma pergunta em voz alta todos os dias.', en: 'My next step is to answer one question aloud every day.' },
            { pt: 'Eu quero continuar estudando.', en: 'I want to keep going.' },
            { pt: 'Minha meta é falar com mais clareza.', en: 'My goal is to speak more clearly.' }
        ];
    }

    const expressionTranslationPortuguese = {
        1: ['O problema acabou sendo simples.', 'Eu encontrei meu antigo professor por acaso.', 'No fim, nós pegamos um táxi.', 'Eu relembro aquele dia e dou risada.'],
        2: ['Nós partimos cedo de manhã.', 'Nós encontramos uma praça tranquila por acaso.', 'A recepcionista resolveu o problema.', 'Nós voltamos depois do jantar.'],
        3: ['Precisamos avaliar os dois planos.', 'O trem tem uma vantagem sobre o ônibus.', 'O custo extra vale a pena.', 'A decisão se resume a tempo e dinheiro.'],
        4: ['Ela é considerada a melhor opção.', 'Esta opção fica acima das demais.', 'A localização supera as outras.', 'A cidade está no seu melhor na primavera.'],
        5: ['Nós ficamos sem café.', 'Nós compramos bastante lanche.', 'Eu quero reduzir o açúcar.', 'Podemos nos virar com duas mesas.'],
        6: ['Nós estavamos passando o tempo no saguão.', 'Ela estava olhando ao redor da loja.', 'Eles estavam sentados sem fazer muita coisa antes da aula.', 'Um homem estava passando pela janela.'],
        7: ['O alarme disparou durante a reunião.', 'O elevador parou de funcionar.', 'Todos se acalmaram depois de um minuto.', 'Nós descobrimos o que causou o problema.'],
        9: ['Eu planejei a semana inteira em detalhes.', 'Nós vamos levar o plano até o fim.', 'Ele vai se inscrever no curso.', 'Eu quero seguir firme com meu plano.'],
        10: ['Você pode contar comigo.', 'No fim, tudo vai dar certo.', 'Alguma coisa vai surgir.', 'Eu vou cuidar dos ingressos.'],
        11: ['Nós marcamos uma ligação para terça-feira.', 'Eles adiantaram a reunião.', 'Podemos adiar a consulta?', 'Por favor, chegue no horário.'],
        12: ['Eu vou dar seguimento amanhã.', 'O plano vai dar certo.', 'Faça uma cópia do arquivo antes da reunião.', 'Nós organizamos três opções.'],
        13: ['Claro, pode ir em frente.', 'Você poderia esperar um segundo?', 'Você poderia falar mais alto, por favor?', 'Você pode abaixar o volume?'],
        14: ['Você precisa preencher este formulário.', 'Nós temos que entregar o relatório.', 'Visitantes devem fazer o registro primeiro.', 'Eu tenho que acompanhar o curso.'],
        15: ['Você deveria ir mais devagar esta semana.', 'Você deveria se abrir com alguém.', 'Ela está lidando com estresse.', 'Não se esgote antes da prova.'],
        17: ['Eu experimentei um aplicativo novo.', 'Eu encontrei um artigo útil por acaso.', 'Ela passou por muitas mudanças.', 'Ele desenvolveu confiança aos poucos.'],
        18: ['Eu preciso colocar os e-mails em dia.', 'Nós enviamos os convites.', 'Eu marquei três tarefas como concluídas.', 'Ela ficou atrasada nas tarefas esta semana.'],
        19: ['Eu relembro aquela viagem com frequência.', 'Ele mencionou um projeto antigo.', 'Ela seguiu em frente depois daquele emprego.', 'Você avançou muito.'],
        20: ['Ela vai voltar logo.', 'Ele viajou no fim de semana.', 'Eles voltaram ontem.', 'Eu passei rapidamente no escritório.'],
        21: ['Eu fiquei resfriado.', 'Ela está se recuperando da gripe.', 'A erupção voltou a piorar ontem à noite.', 'O efeito do remédio passou.'],
        22: ['Beba mais líquidos.', 'Você deveria se deitar por um tempo.', 'A irritação desapareceu.', 'O médico fará o acompanhamento na próxima semana.'],
        23: ['Eu estou procurando minhas chaves.', 'Guarde os documentos.', 'Ela me mostrou o apartamento.', 'Nós mudamos as cadeiras de lugar.'],
        25: ['Nós encontramos uma pequena livraria por acaso.', 'Passe pela igreja.', 'O ônibus entrou na estação.', 'Siga em direção à praça principal.'],
        26: ['Não adie a tarefa.', 'Eles adiantaram o prazo.', 'Podemos encaixar uma ligação curta?', 'Eu estou atrasado.'],
        27: ['Continue até a rotatória.', 'Pegue a segunda rua à esquerda depois da ponte.', 'Atravesse no semáforo.', 'Encoste depois da esquina.'],
        28: ['Nós fizemos check-in tarde.', 'Eles fizeram check-out antes do café da manhã.', 'A recepção resolveu o problema.', 'Eles ofereceram café para compensar o atraso.'],
        29: ['Continue praticando.', 'Não desista de aprender.', 'Estou ansioso para ver você.', 'Estou me acostumando a falar.'],
        30: ['Isso depende do horário.', 'Se nós nos prepararmos bem, o plano vai dar certo.', 'Siga sua rotina.', 'Nós vamos encontrar uma solução.'],
        31: ['Não perca esta oportunidade.', 'Você pode contar com minha ajuda.', 'Prepare-se para a entrevista.', 'Vamos olhar para frente e planejar.']
    };

    function createExpressionTranslations(bank, lessonNumber) {
        const localized = expressionTranslationPortuguese[lessonNumber];
        if (localized) {
            return localized.map((pt, index) => ({ pt, en: bank.expressions[index][2] }));
        }

        const label = bank.matchLabel || bank.label || '';
        if (/past simple|complete past|past continuous|interrupted/.test(label)) return [
            { pt: 'No fim, nós pegamos um táxi.', en: 'We ended up taking a taxi.' },
            { pt: 'Eu encontrei um velho amigo por acaso.', en: 'I ran into an old friend.' },
            { pt: 'O alarme tocou durante a reunião.', en: 'The alarm went off during the meeting.' },
            { pt: 'O carro parou de funcionar na estrada.', en: 'The car broke down on the road.' },
            { pt: 'Todo mundo se acalmou depois de alguns minutos.', en: 'Everyone calmed down after a few minutes.' },
            { pt: 'Nós descobrimos o que aconteceu mais tarde.', en: 'We found out what happened later.' }
        ];
        if (/comparative|superlative|articles|quantifiers/.test(label)) return [
            { pt: 'A opção mais flexível se destaca.', en: 'The more flexible option stands out.' },
            { pt: 'A decisão se resume a tempo e dinheiro.', en: 'The decision comes down to time and money.' },
            { pt: 'Eu escolheria a rota mais segura.', en: 'I would go for the safer route.' },
            { pt: 'Nós ficamos sem café.', en: 'We ran out of coffee.' },
            { pt: 'Nós compramos bastante lanche.', en: 'We stocked up on snacks.' },
            { pt: 'Podemos nos virar com duas mesas.', en: 'We can make do with two tables.' }
        ];
        if (/going to|will|present continuous for future|future review/.test(label)) return [
            { pt: 'Nós marcamos uma ligação para terça.', en: 'We set up a call for Tuesday.' },
            { pt: 'Não adie a decisão.', en: 'Do not put off the decision.' },
            { pt: 'Eu espero que o plano dê certo.', en: 'I hope the plan works out.' },
            { pt: 'Você pode contar comigo amanhã.', en: 'You can count on me tomorrow.' },
            { pt: 'Eu vou dar seguimento amanhã.', en: 'I will follow up tomorrow.' },
            { pt: 'Eles adiaram a reunião.', en: 'They pushed back the meeting.' }
        ];
        if (/permission|must|have to|need to|should|advice/.test(label)) return [
            { pt: 'Claro, va em frente.', en: 'Sure, go ahead.' },
            { pt: 'Você poderia falar mais alto?', en: 'Could you speak up?' },
            { pt: 'Você precisa preencher este formulário.', en: 'You need to fill out this form.' },
            { pt: 'Nós temos que entregar o relatório.', en: 'We have to hand in the report.' },
            { pt: 'Você deveria ir mais devagar esta semana.', en: 'You should slow down this week.' },
            { pt: 'Ela está lidando com estresse.', en: 'She is dealing with stress.' }
        ];
        if (/present perfect|ever|never|already|yet|been and gone/.test(label)) return [
            { pt: 'Eu testei um aplicativo novo.', en: 'I have tried out a new app.' },
            { pt: 'Eu preciso colocar as aulas em dia.', en: 'I need to catch up on the lessons.' },
            { pt: 'Eu encontrei um artigo interessante por acaso.', en: 'I came across an interesting article.' },
            { pt: 'Ela passou por muitas mudanças.', en: 'She has gone through many changes.' },
            { pt: 'Ela vai voltar em breve.', en: 'She will get back soon.' },
            { pt: 'Eles voltaram ontem.', en: 'They came back yesterday.' }
        ];
        if (/health|medical/.test(label)) return [
            { pt: 'Eu fiquei resfriado.', en: 'I came down with a cold.' },
            { pt: 'Ela se recuperou da gripe.', en: 'She got over the flu.' },
            { pt: 'Você deveria reduzir o café.', en: 'You should cut back on coffee.' },
            { pt: 'Eu liguei para saber como ele estava.', en: 'I called to check up on him.' },
            { pt: 'Você deveria deitar por um tempo.', en: 'You should lie down for a while.' },
            { pt: 'A médica vai acompanhar na próxima semana.', en: 'The doctor will follow up next week.' }
        ];
        if (/prepositions|movement|directions|hotel|time|at the hotel|from a to b/.test(label)) return [
            { pt: 'Eu estou procurando minhas chaves.', en: 'I am looking for my keys.' },
            { pt: 'Guarde os documentos.', en: 'Put away the documents.' },
            { pt: 'É fácil se locomover aqui.', en: 'It is easy to get around here.' },
            { pt: 'Passe no escritório mais tarde.', en: 'Drop by the office later.' },
            { pt: 'A recepção resolveu o problema.', en: 'Reception sorted out the problem.' },
            { pt: 'Nós fizemos check-in tarde.', en: 'We checked in late.' }
        ];
        if (/gerunds|infinitives|conditional|unless|wishes/.test(label)) return [
            { pt: 'Continue praticando.', en: 'Keep on practicing.' },
            { pt: 'Não desista de aprender.', en: 'Do not give up learning.' },
            { pt: 'Eu estou me acostumando a falar.', en: 'I am getting used to speaking.' },
            { pt: 'O sucesso depende de prática.', en: 'Success depends on practice.' },
            { pt: 'Nós vamos encontrar uma solução.', en: 'We will figure out a solution.' },
            { pt: 'Não perca essa oportunidade.', en: 'Do not miss out on this chance.' }
        ];
        return [
            { pt: 'Eu olho para trás e vejo progresso.', en: 'I look back and see progress.' },
            { pt: 'Eu desenvolvi confiança aos poucos.', en: 'I built up confidence.' },
            { pt: 'Eu quero continuar.', en: 'I want to keep going.' },
            { pt: 'Defina uma meta clara.', en: 'Set a clear goal.' },
            { pt: 'Meu próximo passo é praticar mais.', en: 'My next step is to practice more.' },
            { pt: 'Eu posso explicar meu progresso.', en: 'I can explain my progress.' }
        ];
    }

    function createDialogues(bank) {
        const label = (bank.matchLabel || bank.label || '').toLowerCase();
        const example = (index, fallback) => fallback;
        const expression = (index, fallback) => [fallback, '', fallback];

        if (!/present perfect/.test(label) && /past continuous|interrupted actions|interrupted stories|past review|complete past|past simple/.test(label)) return [
            [['Friend', 'Why were you late this morning?'], ['You', example(0, 'I overslept and missed the first bus.')], ['Friend', 'Did you call your manager?'], ['You', 'Yes. I explained the problem and arrived twenty minutes later.']],
            [['Neighbor', 'What happened to the window?'], ['You', example(1, 'I was cooking when I heard a loud noise.')], ['Neighbor', 'Was anyone outside?'], ['You', 'No, but a branch fell during the storm.']],
            [['Coworker', 'How was the meeting yesterday?'], ['You', example(2, 'The client asked a lot of questions, but we solved the problem.')], ['Coworker', expression(0, 'How did it work out?')[2]], ['You', 'It worked out well in the end.']],
            [['Sister', 'Did you enjoy the weekend trip?'], ['Brother', example(3, 'We visited a small town and tried a new restaurant.')], ['Sister', 'That sounds nice. Did anything go wrong?'], ['Brother', 'The hotel lost our reservation, but they sorted it out quickly.']]
        ];
        if (/health|medical/.test(label)) return [
            [['Patient', 'Good morning. I have had a sore throat since Monday.'], ['Doctor', 'Do you have a fever too?'], ['Patient', example(1, 'I feel dizzy in the morning.')], ['Doctor', 'You should rest and drink more water today.']],
            [['Friend', 'You look tired. Are you okay?'], ['You', example(0, 'I have a headache, and I think I came down with a cold.')], ['Friend', expression(0, 'You should lie down for a while.')[2]], ['You', 'Good idea. I will take a break after lunch.']],
            [['Receptionist', 'How long have you had this cough?'], ['Patient', 'For three days. It gets worse at night.'], ['Receptionist', 'I can book an appointment for this afternoon.'], ['Patient', 'Thank you. That would help a lot.']],
            [['Mother', 'Did the medicine help?'], ['Son', 'A little. The pain cleared up, but I still feel weak.'], ['Mother', expression(2, 'The doctor will follow up next week.')[2]], ['Son', 'Yes, and I will call if the fever comes back.']]
        ];
        if (/hotel|at the hotel/.test(label)) return [
            [['Guest', example(0, 'Hi, I have a reservation under Ana Lima.')], ['Receptionist', 'Welcome. May I see your ID, please?'], ['Guest', 'Of course. Is breakfast included?'], ['Receptionist', 'Yes, breakfast is included until 10 a.m.']],
            [['Guest', example(1, 'Excuse me, my key card does not work.')], ['Receptionist', expression(0, 'I will sort it out now.')[2]], ['Guest', 'Thank you. I just checked in.']],
            [['Guest', 'Could I have another towel, please?'], ['Housekeeper', 'Sure. I will bring one in a minute.'], ['Guest', example(2, 'The shower is not working very well.')], ['Housekeeper', 'I will call maintenance for you.']],
            [['Guest', 'What time is check-out?'], ['Receptionist', 'Check-out is at noon.'], ['Guest', expression(2, 'Could I leave my bags here after check-out?')[2]], ['Receptionist', 'Yes, you can leave them at reception.']]
        ];
        if (/prepositions|movement|directions|from a to b|practical english review/.test(label)) return [
            [['Tourist', 'Excuse me, where is the pharmacy?'], ['Local', example(0, 'It is across from the bank, next to the café.')], ['Tourist', 'Is it far from here?'], ['Local', 'No, go straight for one block.']],
            [['Ana', 'I cannot find my keys.'], ['Leo', example(1, 'Did you look under the notebook?')], ['Ana', 'Yes, and behind the sofa too.'], ['Leo', 'Maybe they are in the bowl next to the door.']],
            [['Driver', 'Do I turn before or after the bridge?'], ['Friend', example(2, 'Turn right after the bridge, then go past the supermarket.')], ['Driver', 'Got it. Is the entrance on the left?'], ['Friend', 'Yes, opposite the parking lot.']],
            [['Client', 'What time is the appointment?'], ['Receptionist', example(3, 'It is at three on Thursday.')], ['Client', 'And where do I go?'], ['Receptionist', expression(0, 'Go straight and turn left at the corner.')[2]]]
        ];
        if (/permission|must|have to|need to|should|advice|modals/.test(label)) return [
            [['Neighbor', 'Could I borrow your ladder for ten minutes?'], ['You', 'Sure, but please bring it back before six.'], ['Neighbor', 'Of course. I need to fix a light outside.'], ['You', example(0, 'You should be careful on the ladder.')]],
            [['Employee', 'I need to leave five minutes early today.'], ['Manager', example(1, 'You must send the report first.')], ['Employee', expression(1, 'I will hand it in before lunch.')[2]], ['Manager', 'Thanks. Then you can go.']],
            [['Friend', 'I feel overwhelmed this week.'], ['You', example(2, 'You should slow down and choose only three important tasks.')], ['Friend', 'You are right. I should not try to do everything today.']],
            [['Visitor', expression(3, 'Can I go ahead?')[2]], ['Receptionist', 'Please check in first and wear this badge.'], ['Visitor', 'Do I have to fill out a form?'], ['Receptionist', 'Yes, it is required for all visitors.']]
        ];
        if (/going to|will|present continuous for future|future review/.test(label)) return [
            [['Mia', 'What are you doing tonight?'], ['Dan', example(0, 'I am meeting my sister at seven.')], ['Mia', 'Nice. Are you going to have dinner downtown?'], ['Dan', 'Yes, and I will send you the restaurant later.']],
            [['Coworker', 'The client asked for the file.'], ['You', example(1, 'I will send it after lunch.')], ['Coworker', 'Thanks. Do you think they will approve it?'], ['You', 'I think they will like the final version.']],
            [['Friend', 'Are you free on Saturday?'], ['You', example(2, 'I am going to visit my parents this weekend.')], ['Friend', 'No problem. We can meet another day.'], ['You', expression(0, 'I will check my calendar and get back to you.')[2]]],
            [['Assistant', 'The meeting is confirmed for Tuesday.'], ['Manager', example(3, 'We are meeting the team at nine.')], ['Assistant', expression(2, 'Should I follow up tomorrow?')[2]], ['Manager', 'Yes, please. Send a reminder in the morning.']]
        ];
        if (/present perfect|ever|never|already|yet|been and gone/.test(label)) return [
            [['Friend', 'Have you ever traveled alone?'], ['You', example(0, 'No, I have never traveled alone.')], ['Friend', 'Would you like to try it?'], ['You', 'Maybe. I have already saved some money for a trip.']],
            [['Manager', 'Have you sent the report yet?'], ['Employee', example(1, 'Yes, I have already sent it.')], ['Manager', 'Great. Has the client replied?'], ['Employee', expression(2, 'Not yet. I will follow up tomorrow.')[2]]],
            [['Ana', 'Where is Bruno?'], ['Leo', example(2, 'He has gone to the pharmacy.')], ['Ana', 'So he is not back yet?'], ['Leo', 'Exactly. But he has been there before, so he knows the way.']],
            [['Sister', 'Have you tried the new bakery near the station?'], ['Brother', example(3, 'Yes, I have been there twice.')], ['Sister', 'Is it good?'], ['Brother', expression(0, 'It really stands out.')[2]]]
        ];
        if (/comparative|superlative|articles|quantifiers/.test(label)) return [
            [['Rafa', 'Which apartment should we rent?'], ['Lu', example(0, 'This one is cheaper, but the other one is bigger.')], ['Rafa', expression(0, 'The quiet street stands out for me.')[2]], ['Lu', 'Then I would choose this one.']],
            [['Customer', 'What is the best phone for work?'], ['Seller', example(1, 'This model is the most reliable option.')], ['Customer', 'Does it have enough storage?'], ['Seller', 'Yes, and the battery lasts longer.']],
            [['Host', 'Do we have enough water for everyone?'], ['Assistant', example(2, 'We have a few bottles, but not many cups.')], ['Host', expression(2, 'Please stock up on cups and coffee.')[2]], ['Assistant', 'I will go to the supermarket now.']],
            [['Friend', 'This café is quieter than the other one.'], ['You', example(3, 'And the chairs are more comfortable.')], ['Friend', 'Is it the best place for our meeting?'], ['You', 'For me, yes. It is the least stressful option.']]
        ];
        if (/gerunds|infinitives|conditional|unless|wishes/.test(label)) return [
            [['Roommate', 'Do you mind cooking tonight?'], ['You', example(0, 'I do not mind cooking, but I want to finish work first.')], ['Roommate', 'No problem. I can wash the dishes later.'], ['You', expression(0, 'Thanks for helping out.')[2]]],
            [['Friend', 'Are you going to apply for the job?'], ['You', example(1, 'Unless I try, I will miss out on the opportunity.')], ['Friend', 'That is true. I hope you get it.']],
            [['Ana', 'I wish I had more free time.'], ['Leo', example(2, 'If you leave earlier, you will avoid traffic.')], ['Ana', 'Good point. I can change my schedule tomorrow.']],
            [['Partner', 'Do you want to go out tonight?'], ['You', example(3, 'I decided to stay home and save money.')], ['Partner', expression(2, 'That depends on how tired you are.')[2]], ['You', 'Exactly. If I feel better later, I will call you.']]
        ];
        return [
            [['Friend', 'How was your week?'], ['You', example(0, 'I have improved my confidence this month.')], ['Friend', 'That is great. What helped you most?'], ['You', expression(0, 'I looked back and noticed small wins.')[2]]],
            [['Coworker', 'You sound more confident on calls now.'], ['You', example(1, 'I used to avoid speaking, but now I try more often.')], ['Coworker', 'It really shows. Keep going.']],
            [['Cousin', 'Do you have a clear goal for next month?'], ['You', example(2, 'My next step is to answer one question aloud every day.')], ['Cousin', 'That sounds practical.'], ['You', 'Yes. If I practice every day, I will keep improving.']],
            [['Friend', 'What changed for you recently?'], ['You', example(3, 'I can explain my ideas better now.')], ['Friend', expression(2, 'You built up confidence step by step.')[2]], ['You', 'Yes, and I want to keep going.']]
        ];
    }

    function createMusicLines(bank) {
        const vocab = bank.vocab || [];
        const expressions = bank.expressions || [];
        const sources = [vocab[0], vocab[2], expressions[0], vocab[4], expressions[2]].filter(Boolean);
        return sources.map((item) => {
            const complete = createCompleteItem(item);
            return [complete.prompt.replace('____', complete.answer), complete.answer];
        });
    }

    const musicSelectionsByLesson = {
        1: { song: 'Yesterday', artist: 'The Beatles', spotifyId: '3BQHpFgAp4l80e1XslIjNI', focus: 'yesterday e ações terminadas no passado' },
        2: { song: 'The Story', artist: 'Brandi Carlile', spotifyId: '0EKBV6GybPtALXUgWqWrym', focus: 'story, acontecimentos e sequência' },
        3: { song: 'Stronger', artist: 'Kelly Clarkson', spotifyId: '1nInOsHbtotAmEOQhtvnzP', focus: 'stronger e comparações' },
        4: { song: 'The Best', artist: 'Tina Turner', spotifyId: '6pPWRBubXOBAHnjl5ZIujB', focus: 'best e superlativos' },
        5: { song: 'Count on Me', artist: 'Bruno Mars', spotifyId: '3B5UbSndRz907IZhhmUfLi', focus: 'count, one, two e quantidade' },
        6: { song: 'While My Guitar Gently Weeps', artist: 'The Beatles', spotifyId: '389QX9Q1eUOEZ19vtzzI9O', focus: 'while e ações em andamento' },
        7: { song: 'When the Party\'s Over', artist: 'Billie Eilish', spotifyId: '43zdsphuZLzwA9k4DJhU0I', focus: 'when e mudança de acontecimento' },
        9: { song: 'I\'m Gonna Be (500 Miles)', artist: 'The Proclaimers', spotifyId: '67iAlVNDDdddxqSD2EZhFs', focus: 'gonna e intenção futura' },
        10: { song: 'I\'ll Be There', artist: 'Jackson 5', spotifyId: '6Dt6QsLEEYyZ0fMjEEpIjP', focus: 'will e promessa' },
        11: { song: 'Leaving on a Jet Plane', artist: 'John Denver', spotifyId: '3D8dwH690MXQRhtIZTSS9c', focus: 'leaving e compromisso de viagem' },
        12: { song: 'Que Será, Será', artist: 'Doris Day', spotifyId: '1Rf1RkpFDKat8IDa8OvZKE', focus: 'will e previsões sobre o futuro' },
        13: { song: 'Can I Kick It?', artist: 'A Tribe Called Quest', spotifyId: '5q6pg1kvXfT7z5MqG0KKSs', focus: 'Can I...? e permissão' },
        14: { song: 'I\'ll Have to Say I Love You in a Song', artist: 'Jim Croce', spotifyId: '0QnabBTpfVdrjhE4XznAuE', focus: 'have to e necessidade' },
        15: { song: 'Should I Stay or Should I Go', artist: 'The Clash', spotifyId: '39shmbIHICJ2Wxnk1fPSdz', focus: 'should e decisão' },
        17: { song: 'Have You Ever', artist: 'Brandy', spotifyId: '6tBD4yjOf9P8rWwUlXdJFm', focus: 'Have you ever...? e experiências' },
        18: { song: 'Never Ever', artist: 'All Saints', spotifyId: '596XLiW6tohIgkcTMf4M6a', focus: 'never e ever' },
        19: { song: 'Since U Been Gone', artist: 'Kelly Clarkson', spotifyId: '6JY1IdkZGeIcPegKxjSKeb', focus: 'since, been e referência ao passado' },
        20: { song: 'Gone, Gone, Gone', artist: 'Phillip Phillips', spotifyId: '20S0KRq4z2v2Utym0C246s', focus: 'gone e ausência' },
        21: { song: 'Fix You', artist: 'Coldplay', spotifyId: '7LVHVU3tWfcxj5aiPFEW4Q', focus: 'tired, fix e cuidado' },
        22: { song: 'Doctor My Eyes', artist: 'Jackson Browne', spotifyId: '5OuaAMBmGjjJMK7yXpaFAK', focus: 'doctor e descrição de um problema' },
        23: { song: 'Next to Me', artist: 'Emeli Sande', spotifyId: '5VHuGRvkB61pvdQjAgUazm', focus: 'next to e localização' },
        25: { song: 'Across the Universe', artist: 'The Beatles', spotifyId: '4dkoqJrP0L8FXftrMZongF', focus: 'across e movimento' },
        26: { song: 'Time After Time', artist: 'Cyndi Lauper', spotifyId: '7o9uu2GDtVDr9nsR7ZRN73', focus: 'time e marcadores temporais' },
        27: { song: 'Follow Me', artist: 'Uncle Kracker', spotifyId: '4KoecuyOpZaNFZ0UqVsllc', focus: 'follow e orientação' },
        28: { song: 'Hotel California', artist: 'Eagles', spotifyId: '1rh232CwAy3EDEWFJkwH88', focus: 'hotel e situações de viagem' },
        29: { song: 'Don\'t Stop Believin\'', artist: 'Journey', spotifyId: '4bHsxqR3GMrXTxEPLuK5ue', focus: 'stop + -ing e continuidade' },
        30: { song: 'If I Ain\'t Got You', artist: 'Alicia Keys', spotifyId: '3XVBdLihbNbxUwZosxcGuJ', focus: 'if e condição' },
        31: { song: 'Wish You Were Here', artist: 'Pink Floyd', spotifyId: '6mFkJmJqdDVQ1REhVfGgd1', focus: 'wish e situação imaginada' }
    };

    function getMusicSelection(title, bank) {
        const specificSelection = musicSelectionsByLesson[getLessonNumber()];
        if (specificSelection) return specificSelection;

        const label = (bank.matchLabel || bank.label || title || '').toLowerCase();

        if (/present perfect|ever|never|already|yet|been and gone/.test(label)) {
            return { song: 'Have You Ever Seen The Rain', artist: 'Creedence Clearwater Revival', focus: 'have you ever, seen, rain, experience' };
        }
        if (/past continuous|interrupted/.test(label)) {
            return { song: 'When The Party Is Over', artist: 'Billie Eilish', focus: 'when, was/were, past scene, interruption' };
        }
        if (/past simple|complete past|past review/.test(label)) {
            return { song: 'Yesterday', artist: 'The Beatles', focus: 'yesterday, past memories, changed, said' };
        }
        if (/superlative/.test(label)) {
            return { song: 'The Best', artist: 'Tina Turner', focus: 'best, better, superlative emphasis' };
        }
        if (/comparative/.test(label)) {
            return { song: 'Stronger', artist: 'Kelly Clarkson', focus: 'stronger, better, comparison' };
        }
        if (/articles|quantifiers/.test(label)) {
            return { song: 'Count on Me', artist: 'Bruno Mars', focus: 'count, one, two, enough, support' };
        }
        if (/going to/.test(label)) {
            return { song: 'I\'m Gonna Be (500 Miles)', artist: 'The Proclaimers', focus: 'gonna, future intention, distance' };
        }
        if (/will|future|present continuous for future/.test(label)) {
            return { song: 'I\'ll Be There', artist: 'Jackson 5', focus: 'will, promise, future support' };
        }
        if (/health|medical/.test(label)) {
            return { song: 'Fix You', artist: 'Coldplay', focus: 'feel, tired, fix, comfort' };
        }
        if (/permission|can and could/.test(label)) {
            return { song: 'Can I Kick It?', artist: 'A Tribe Called Quest', focus: 'can I, permission question' };
        }
        if (/must|have to|need to|should|advice|modals/.test(label)) {
            return { song: 'Should I Stay or Should I Go', artist: 'The Clash', focus: 'should, decision, advice' };
        }
        if (/hotel|at the hotel/.test(label)) {
            return { song: 'Hotel California', artist: 'Eagles', focus: 'hotel, reservation/travel setting' };
        }
        if (/prepositions|movement|directions|from a to b|practical english review/.test(label)) {
            return { song: 'On The Road Again', artist: 'Willie Nelson', focus: 'road, movement, direction' };
        }
        if (/gerunds|infinitives/.test(label)) {
            return { song: 'Don\'t Stop Believin\'', artist: 'Journey', focus: 'stop + -ing, believing, keeping going' };
        }
        if (/conditional|unless|wishes/.test(label)) {
            return { song: 'If I Ain\'t Got You', artist: 'Alicia Keys', focus: 'if, condition, wish/value' };
        }
        return { song: 'I Won\'t Give Up', artist: 'Jason Mraz', focus: 'will, persistence, personal progress' };
    }

    function setHtml(selector, html) {
        const element = document.querySelector(selector);
        if (element) element.innerHTML = html;
    }

    function revealButton(answer) {
        return `<button type="button" class="reveal-answer-btn" data-a2-reveal="${escapeHtml(answer)}"><i class="fas fa-eye"></i> Ver resposta</button>`;
    }

    function renderPracticePrompt(item) {
        const text = item && item.type === 'Complete' && !/_{3,}/.test(item.prompt || '')
            ? String(item.prompt || '').replace(/([.!?])?$/, ' ____$1')
            : (item.prompt || '');
        return escapeHtml(text).replace(/_{3,}/g, '<span class="inline-block min-w-32 border-b-2 border-emerald-600 mx-1">&nbsp;</span>');
    }

    function renderThemes(options) {
        return options.map((theme, index) => `
            <li class="flex gap-3">
                <i class="fas fa-star text-emerald-500 mt-1"></i>
                <span><strong>Opção ${index + 1}:</strong> ${escapeHtml(theme)}</span>
            </li>
        `).join('');
    }

    function translateObjective(item) {
        const translations = {
            'ask detailed questions about past events': 'fazer perguntas detalhadas sobre acontecimentos passados',
            'use past forms without mixing did and changed verbs': 'usar as formas de passado sem misturar did com o verbo alterado',
            'organize an account with precise time and sequence markers': 'organizar um relato com marcadores precisos de tempo e sequência',
            'compare differences with degree modifiers': 'comparar diferencas usando modificadores de intensidade',
            'express equality and inequality with as...as': 'expressar igualdade e desigualdade com as...as',
            'weigh up options using more, less, and reasons': 'avaliar opções usando more, less e motivos claros',
            'describe detailed plans with purpose and timing': 'descrever planos detalhados com objetivo e horário',
            'use going to for predictions based on visible evidence': 'usar going to para previsões baseadas em evidências visíveis',
            'ask follow-up questions about intentions': 'fazer perguntas de continuação sobre intenções',
            'give specific advice that is realistic to follow': 'dar conselhos específicos e realistas de seguir',
            'make recommendations sound tactful and supportive': 'fazer recomendações com um tom cuidadoso e acolhedor',
            'explain priorities, reasons, and limits': 'explicar prioridades, motivos e limites',
            'describe changes in symptoms over time': 'descrever mudanças nos sintomas ao longo do tempo',
            'use present perfect to report recovery and recent results': 'usar Present Perfect para relatar recuperação e resultados recentes',
            'decide when a health change needs a next step': 'identificar quando uma mudança de saúde exige uma próxima ação',
            'distinguish points, areas, surfaces, and floors': 'diferenciar pontos, áreas, superfícies e andares',
            'use in the corner and at the corner accurately': 'usar in the corner e at the corner corretamente',
            'give precise location details in buildings and streets': 'dar detalhes precisos de localização em prédios e ruas',
            'distinguish deadlines from continuing periods': 'diferenciar prazos de periodos que continuam até um ponto',
            'use during, for, before, and after accurately': 'usar during, for, before e after corretamente',
            'negotiate time windows and schedule changes': 'negociar janelas de horário e mudanças na agenda',
            'give multi-step directions with clear landmarks': 'dar orientações em várias etapas com referências claras',
            'locate turns before and after reference points': 'posicionar curvas antes e depois de pontos de referência',
            'check and clarify a route during a conversation': 'confirmar e esclarecer uma rota durante a conversa',
            'review regular and irregular past verbs': 'revisar verbos regulares e irregulares no passado',
            'form negatives and questions with did': 'formar perguntas e frases negativas com did',
            'tell a complete past event with time markers': 'contar um acontecimento completo no passado com marcadores de tempo',
            'connect past events into a longer story': 'conectar acontecimentos passados em uma história mais longa',
            'use sequence markers naturally': 'usar marcadores de sequência com naturalidade',
            'add reasons and consequences': 'adicionar motivos e consequências',
            'use comparative adjectives accurately': 'usar adjetivos comparativos corretamente',
            'compare with reasons': 'comparar dando motivos',
            'talk about advantages and disadvantages': 'falar sobre vantagens e desvantagens',
            'use superlatives correctly': 'usar superlativos corretamente',
            'handle best/worst and irregular adjectives': 'usar best, worst e adjetivos irregulares',
            'support opinions with examples': 'apoiar opiniões com exemplos',
            'use articles with new and known information': 'usar artigos para informações novas e já conhecidas',
            'separate countable and uncountable nouns': 'diferenciar substantivos contáveis e incontáveis',
            'choose quantifiers correctly': 'escolher quantificadores corretamente',
            'use was/were + -ing for background': 'usar was/were + -ing para criar contexto',
            'describe simultaneous actions': 'descrever ações simultaneas',
            'set the scene before the main event': 'preparar a cena antes do evento principal',
            'combine Past Continuous and Past Simple': 'combinar Past Continuous e Past Simple',
            'use when and while accurately': 'usar when e while corretamente',
            'tell interrupted stories with clarity': 'contar histórias interrompidas com clareza',
            'review past forms from lessons 1-7': 'revisar as formas de passado das lições 1 a 7',
            'mix sequence and interruption language': 'misturar linguagem de sequência e interrupção',
            'speak longer without losing order': 'falar por mais tempo sem perder a ordem das ideias',
            'use going to for plans': 'usar going to para planos',
            'talk about intentions': 'falar sobre intenções',
            'ask about future plans': 'perguntar sobre planos futuros',
            'use will for predictions': 'usar will para previsões',
            'use will for offers and promises': 'usar will para ofertas e promessas',
            'separate will from going to': 'diferenciar will de going to',
            'use present continuous for future arrangements': 'usar Present Continuous para compromissos futuros marcados',
            'include time and place': 'incluir hora e lugar',
            'contrast arrangements with intentions': 'comparar compromissos marcados com intenções',
            'choose going to, will, or present continuous': 'escolher entre going to, will e Present Continuous',
            'explain why the form fits': 'explicar por que a forma combina com a situação',
            'speak about future situations naturally': 'falar sobre situações futuras com naturalidade',
            'use can and could for permission': 'usar can e could para pedir permissão',
            'sound polite without being too formal': 'soar educado sem ficar formal demais',
            'answer permission requests clearly': 'responder pedidos de permissão com clareza',
            'use must, have to, and need to': 'usar must, have to e need to',
            'separate strong rules from practical necessities': 'diferenciar regras fortes de necessidades práticas',
            'explain obligations with reasons': 'explicar obrigações com motivos',
            'use should and should not': 'usar should e should not',
            'soften advice politely': 'suavizar conselhos com educação',
            'support advice with reasons': 'apoiar conselhos com motivos',
            'review can, could, must, have to, need to, and should': 'revisar can, could, must, have to, need to e should',
            'choose the best modal for meaning': 'escolher o modal mais adequado ao significado',
            'make requests and advice sound natural': 'fazer pedidos e conselhos soarem naturais',
            'use Present Perfect for life experiences': 'usar Present Perfect para experiências de vida',
            'ask questions with ever': 'fazer perguntas com ever',
            'answer with never and before': 'responder com never e before',
            'use already in affirmative sentences': 'usar already em frases afirmativas',
            'use yet in questions and negatives': 'usar yet em perguntas e negativas',
            'use ever/never for experience': 'usar ever e never para experiências',
            'contrast Present Perfect and Past Simple': 'comparar Present Perfect e Past Simple',
            'use finished time expressions correctly': 'usar expressões de tempo finalizado corretamente',
            'avoid mixing exact time with Present Perfect': 'evitar misturar tempo exato com Present Perfect',
            'separate been and gone': 'diferenciar been e gone',
            'explain returned and not returned situations': 'explicar situações de quem voltou e de quem ainda não voltou',
            'use context to avoid confusion': 'usar o contexto para evitar confusão',
            'name common health problems': 'nomear problemas de saúde comuns',
            'use have/feel for symptoms': 'usar have e feel para sintomas',
            'give advice with should and need to': 'dar conselhos com should e need to',
            'handle a basic medical consultation': 'participar de uma consulta médica básica',
            'answer doctor questions clearly': 'responder perguntas médicas com clareza',
            'use since/for with symptoms': 'usar since e for com sintomas',
            'use in/on/at accurately': 'usar in, on e at corretamente',
            'describe relative position': 'descrever posição relativa',
            'ask where something is': 'perguntar onde algo está',
            'review practical prepositions': 'revisar preposições práticas',
            'combine place, movement, and time': 'combinar lugar, movimento e tempo',
            'speak through a real-life situation': 'falar em uma situação real do dia a dia',
            'use movement prepositions': 'usar preposições de movimento',
            'describe routes step by step': 'descrever rotas passo a passo',
            'separate destination from path': 'diferenciar destino de caminho',
            'use at, on, and in for time': 'usar at, on e in para tempo',
            'talk about deadlines and appointments': 'falar sobre prazos e compromissos',
            'avoid direct translation from Portuguese': 'evitar tradução direta do português',
            'give directions step by step': 'dar direções passo a passo',
            'use landmarks': 'usar pontos de referência',
            'ask for clarification': 'pedir esclarecimento',
            'use hotel vocabulary': 'usar vocabulário de hotel',
            'make polite requests': 'fazer pedidos educados',
            'explain problems with the room': 'explicar problemas no quarto',
            'use gerunds after common verbs': 'usar gerundios depois de verbos comuns',
            'use infinitives after common verbs': 'usar infinitivos depois de verbos comuns',
            'memorize verb patterns in chunks': 'memorizar padrões de verbos em blocos',
            'use zero conditional for facts/habits': 'usar zero conditional para fatos e hábitos',
            'use first conditional for real future results': 'usar first conditional para resultados futuros reais',
            'connect condition and result clearly': 'conectar condição e resultado com clareza',
            'use unless without double negatives': 'usar unless sem dupla negativa',
            'talk about real hopes': 'falar sobre esperancas reais',
            'use wish for imagined situations': 'usar wish para situações imaginadas',
            'review the main A2 V3 structures': 'revisar as principais estruturas do A2 V3',
            'speak in a longer organized answer': 'falar em uma resposta mais longa e organizada',
            'prepare a final personal project': 'preparar um projeto pessoal final'
        };
        return translations[item] || item;
    }

    function renderIntroDialogue(title, bank) {
        if (Array.isArray(bank.introDialogue) && bank.introDialogue.length) {
            return bank.introDialogue.map(([speaker, text]) => `
                <div class="grid grid-cols-[7rem_1fr] gap-4 items-start text-left">
                    <span class="font-black text-emerald-700">${escapeHtml(speaker)}:</span>
                    <div class="v3-dialogue-utterance">
                        <p class="text-lg md:text-xl font-bold text-slate-800 leading-relaxed">${escapeHtml(text)}</p>
                        <button type="button" class="v3-speak-btn" data-v3-speak="${escapeHtml(text)}" aria-label="Ouvir: ${escapeHtml(text)}" title="Ouvir frase em inglês"><i class="fas fa-volume-up" aria-hidden="true"></i></button>
                    </div>
                </div>
            `).join('');
        }

        const label = (bank.matchLabel || bank.label || title || '').toLowerCase();
        let lines;

        if (/present perfect|ever|never|already|yet|been and gone/.test(label)) {
            lines = [['Friend', 'Have you ever tried that new bakery near the station?'], ['You', 'Yes, I have already been there twice. The bread is really good.'], ['Friend', 'Has Bruno gone there too?'], ['You', 'Not yet. He has gone to the pharmacy, but we can invite him later.'], ['Friend', 'Great. I have never eaten there before.'], ['You', 'Then let us go after work. I have already saved the address.']];
        } else if (!/present perfect/.test(label) && /past continuous|interrupted actions|interrupted stories|past review|complete past|past simple/.test(label)) {
            lines = [['Friend', 'Why were you late this morning?'], ['You', 'I missed the bus because I woke up late.'], ['Friend', 'Oh no. What happened after that?'], ['You', 'I called my manager, took a taxi, and arrived twenty minutes later.'], ['Friend', 'Did the meeting start without you?'], ['You', 'Yes, but I joined quickly and explained what happened.']];
        } else if (/health|medical/.test(label)) {
            lines = [['Patient', 'Good morning. I have had a sore throat since Monday.'], ['Doctor', 'Do you have a fever or a headache?'], ['Patient', 'A light fever, and I feel dizzy in the morning.'], ['Doctor', 'How long have you felt dizzy?'], ['Patient', 'Since yesterday afternoon. I also have a cough at night.'], ['Doctor', 'You should rest today and drink plenty of water.']];
        } else if (/hotel|at the hotel/.test(label)) {
            lines = [['Guest', 'Hi, I have a reservation under Ana Lima.'], ['Receptionist', 'Welcome. May I see your ID, please?'], ['Guest', 'Of course. Is breakfast included?'], ['Receptionist', 'Yes, breakfast is served until ten.'], ['Guest', 'Great. Also, my key card is not working.'], ['Receptionist', 'No problem. I will sort it out now.']];
        } else if (/prepositions|movement|directions|from a to b|practical english review/.test(label)) {
            lines = [['Tourist', 'Excuse me, is there a pharmacy nearby?'], ['Local', 'Yes. Walk past the bank and turn left at the corner.'], ['Tourist', 'Do I go through the park or along this street?'], ['Local', 'Stay on this street. The park is behind the museum.'], ['Tourist', 'Is the pharmacy across from the café?'], ['Local', 'Exactly. The entrance is next to the parking lot.']];
        } else if (/permission|must|have to|need to|should|advice|modals/.test(label)) {
            lines = [['Neighbor', 'Could I borrow your charger for a few minutes?'], ['You', 'Sure, but I need it back before I leave.'], ['Neighbor', 'Of course. Do I have to bring it upstairs?'], ['You', 'No, just leave it on the kitchen table.'], ['Neighbor', 'Thanks. Should I close the door when I leave?'], ['You', 'Yes, please. You can leave the key under the mat.']];
        } else if (/going to|will|present continuous for future|future review/.test(label)) {
            lines = [['Mia', 'What are you doing after work?'], ['Dan', 'I am meeting my sister at seven.'], ['Mia', 'Are you going to have dinner downtown?'], ['Dan', 'Yes, we are going to try the new Italian place.'], ['Mia', 'Nice. Do you think it will be crowded?'], ['Dan', 'Maybe. I will send you the restaurant later.']];
        } else if (/superlative/.test(label)) {
            lines = [['Rafa', 'Which restaurant is the best in this neighborhood?'], ['Lu', 'The Italian place is the most popular, but the small café is the cheapest.'], ['Rafa', 'Which one has the best service?'], ['Lu', 'The café. The staff is the friendliest.'], ['Rafa', 'And what is the worst option?'], ['Lu', 'The burger place. It is the noisiest and the slowest.']];
        } else if (/comparative/.test(label)) {
            lines = [['Rafa', 'Which apartment do you prefer?'], ['Lu', 'This one is cheaper, but the other one is quieter.'], ['Rafa', 'The second one seems better for me.'], ['Lu', 'I agree. The location is more convenient.'], ['Rafa', 'Is it farther from work?'], ['Lu', 'A little, but the street is safer at night.']];
        } else if (/articles|quantifiers/.test(label)) {
            lines = [['Host', 'Do we have enough coffee for everyone?'], ['You', 'We have some coffee, but only a few cups.'], ['Host', 'How many people are coming?'], ['You', 'About twelve, so we need a few more chairs too.'], ['Host', 'Can you buy a pack of cups and a little milk?'], ['You', 'Sure. I will go to the supermarket now.']];
        } else if (/gerunds|infinitives|conditional|unless|wishes/.test(label)) {
            lines = [['Roommate', 'Do you mind cooking tonight?'], ['You', 'I do not mind cooking, but I want to finish work first.'], ['Roommate', 'If you cook, I will wash the dishes.'], ['You', 'Deal. Unless I finish late, dinner will be ready at eight.'], ['Roommate', 'I hope we have enough rice.'], ['You', 'I wish we had more vegetables, but we can make it work.']];
        } else {
            lines = [['Friend', 'How was your week?'], ['You', 'Busy, but I solved a few problems at work.'], ['Friend', 'That is good. What are you going to do next?'], ['You', 'I will rest tonight and make a better plan for tomorrow.'], ['Friend', 'Do you feel more confident now?'], ['You', 'Yes. I can explain my ideas more clearly.']];
        }

        return lines.map(([speaker, text]) => `
            <div class="grid grid-cols-[7rem_1fr] gap-4 items-start text-left">
                <span class="font-black text-emerald-700">${speaker}:</span>
                <div class="v3-dialogue-utterance">
                    <p class="text-lg md:text-xl font-bold text-slate-800 leading-relaxed">${escapeHtml(text)}</p>
                    <button type="button" class="v3-speak-btn" data-v3-speak="${escapeHtml(text)}" aria-label="Ouvir: ${escapeHtml(text)}" title="Ouvir frase em inglês"><i class="fas fa-volume-up" aria-hidden="true"></i></button>
                </div>
            </div>
        `).join('');
    }

    function fillIntro(data) {
        const { title, bank } = data;
        setHtml('.slide[data-title="Intro & Dialogue"] .lesson-hero .max-w-3xl', `
            <p class="lesson-panel-title">O que será aprendido nesta lição</p>
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4">${escapeHtml(title)} em contexto real.</h2>
            <div class="grid md:grid-cols-3 gap-4 mt-6">
                ${bank.objectives.map((item) => `<div class="lesson-panel p-4"><p class="font-bold text-slate-900">${escapeHtml(translateObjective(item))}</p></div>`).join('')}
            </div>
        `);
        setHtml('#intro-dialogue', renderIntroDialogue(title, bank));
    }

    function shortGrammarText(body) {
        const text = String(body || '').trim();
        const parts = text.split(/(?<=[.!?])\s+/).filter(Boolean);
        return parts.slice(0, 2).join(' ');
    }

    const grammarTablesByTitle = {
        'Past Simple: Details and Time Markers': {
            title: 'Past Simple: perguntas detalhadas e uma única marca de passado',
            headers: ['Função', 'Estrutura', 'Exemplo'],
            rows: [
                ['Afirmativa', 'subject + past form', 'She forgot the folder.'],
                ['Pergunta com did', 'Wh-word + did + subject + base verb?', 'Why did she leave?'],
                ['Pergunta com be', 'Wh-word + was/were + subject?', 'Where were you?'],
                ['Negativa', 'subject + did not + base verb', 'She did not forget.'],
                ['Sequência e resultado', 'first / then / before / so', 'The bus left, so I took a taxi.']
            ]
        },
        'Complete Past Stories': {
            title: 'Past stories: ordem, motivo e resultado',
            headers: ['Função', 'Palavras úteis', 'Exemplo'],
            rows: [
                ['Inicio', 'first / at first', 'First, we checked in.'],
                ['Sequência', 'then / after that / later', 'Then we explored the town.'],
                ['Motivo', 'because', 'We stopped because it was raining.'],
                ['Resultado', 'so', 'The map failed, so we asked for help.'],
                ['Final', 'finally / in the end', 'Finally, we found the hotel.']
            ]
        },
        'Comparing Options: More, Less and As...As': {
            title: 'Comparações: tamanho da diferença e igualdade',
            headers: ['Ideia', 'Forma', 'Exemplo'],
            rows: [
                ['Diferença grande', 'much/far + comparative', 'The train is much faster.'],
                ['Diferença pequena', 'a little/slightly + comparative', 'This plan is slightly cheaper.'],
                ['Igualdade', 'as + adjective + as', 'The bus is as comfortable as the train.'],
                ['Desigualdade', 'not as + adjective + as', 'This café is not as crowded as that one.'],
                ['Menor grau', 'less + adjective + than', 'This route is less stressful than the highway.']
            ]
        },
        'Superlatives and Irregular Adjectives': {
            title: 'Superlatives: uma opção dentro de um grupo',
            headers: ['Tipo', 'Forma', 'Exemplo'],
            rows: [
                ['Adjetivo curto', 'the + adjective-est', 'It is the cheapest café.'],
                ['Final em -y', 'the + adjective-iest', 'Friday is the busiest day.'],
                ['Adjetivo longo', 'the most + adjective', 'It is the most comfortable chair.'],
                ['Menor grau', 'the least + adjective', 'It is the least expensive plan.'],
                ['Irregular', 'the best / the worst', 'This is the best option.']
            ]
        },
        'Articles and Quantifiers': {
            title: 'Articles and quantifiers: nome + quantidade',
            headers: ['Item', 'Use com', 'Exemplo'],
            rows: [
                ['a / an', 'um item novo ou não específico', 'a chair / an apple'],
                ['the', 'algo já identificado', 'the chair near the door'],
                ['many / a few', 'substantivos contáveis', 'many guests / a few cups'],
                ['much / a little', 'substantivos incontáveis', 'much time / a little milk'],
                ['some / any', 'quantidade não exata', 'some water / any questions']
            ]
        },
        'Setting the Scene: Past Continuous': {
            title: 'Past Continuous: a cena estava em andamento',
            headers: ['Tipo', 'Estrutura', 'Exemplo'],
            rows: [
                ['Afirmativa', 'subject + was/were + verb-ing', 'They were waiting.'],
                ['Negativa', 'subject + was/were not + verb-ing', 'She was not listening.'],
                ['Pergunta', 'Was/Were + subject + verb-ing?', 'What were you doing?'],
                ['Duas ações longas', 'while + Past Continuous', 'I was cooking while she was studying.']
            ]
        },
        'Interrupted Stories': {
            title: 'Past Continuous + Past Simple: fundo e interrupção',
            headers: ['Parte', 'Forma', 'Exemplo'],
            rows: [
                ['Ação em andamento', 'was/were + verb-ing', 'Marta was presenting...'],
                ['Interrupção curta', 'Past Simple', '...the projector stopped.'],
                ['Com when', 'long action + when + short event', 'I was driving when it rained.'],
                ['Com while', 'while + long action, short event', 'While I was driving, it rained.']
            ]
        },
        'Going To: Evidence and Detailed Plans': {
            title: 'Going to: plano detalhado ou previsão com evidência',
            headers: ['Função', 'Estrutura', 'Exemplo'],
            rows: [
                ['Plano com detalhe', 'be going to + verb + time/place/reason', 'We are going to prepare tonight.'],
                ['Previsão com evidência', 'present sign + be going to', 'The glass is falling. It is going to break.'],
                ['Pergunta de detalhe', 'Wh-word + be + subject + going to + verb?', 'What are you going to change?'],
                ['Mudança de plano', 'not going to X; going to Y', 'We are not going to cancel; we are going to move indoors.']
            ]
        },
        'Will for Predictions and Decisions': {
            title: 'Will: decisão agora, oferta, promessa e opinião',
            headers: ['Uso', 'Estrutura', 'Exemplo'],
            rows: [
                ['Decisão agora', 'will + base verb', 'The phone is ringing. I will answer.'],
                ['Oferta', 'will + base verb', 'I will carry the boxes.'],
                ['Promessa', 'will + base verb', 'I will call you tonight.'],
                ['Previsão/opinião', 'I think + will', 'I think prices will rise.'],
                ['Pergunta', 'Will + subject + base verb?', 'Will they approve it?']
            ]
        },
        'Present Continuous for Future Plans': {
            title: 'Present Continuous: compromisso já marcado',
            headers: ['Tipo', 'Estrutura', 'Exemplo'],
            rows: [
                ['Afirmativa', 'am/is/are + verb-ing + future time', 'I am meeting Ana at six.'],
                ['Negativa', 'am/is/are not + verb-ing', 'He is not working tomorrow.'],
                ['Pergunta', 'Am/Is/Are + subject + verb-ing?', 'Are you leaving tonight?'],
                ['Sinal de compromisso', 'hora, lugar ou pessoa confirmada', 'We are flying on Friday.']
            ]
        },
        'Future Review in Real Situations': {
            title: 'Future forms: escolha pela intenção',
            headers: ['Forma', 'Melhor uso', 'Exemplo'],
            rows: [
                ['Going to', 'plano que já existia', 'We are going to rehearse.'],
                ['Will', 'decisão agora, oferta ou opinião', 'I will send the file.'],
                ['Present Continuous', 'compromisso confirmado', 'I am meeting Pedro at nine.'],
                ['Contraste', 'plano x previsão', 'We are going to present it. I think they will like it.']
            ]
        },
        'Can, Could and Permission': {
            title: 'Permission and requests: direto ou mais educado',
            headers: ['Função', 'Estrutura', 'Exemplo'],
            rows: [
                ['Pedir permissão', 'Can I + base verb?', 'Can I use this chair?'],
                ['Pedir com mais cuidado', 'Could I + base verb?', 'Could I leave early?'],
                ['Fazer um pedido', 'Could you + base verb?', 'Could you repeat that?'],
                ['Dar permissão', 'can / go ahead', 'Yes, you can. / Sure, go ahead.'],
                ['Recusar com educação', 'Sorry, you cannot...', 'Sorry, you cannot use this room now.']
            ]
        },
        'Must, Have To and Need To': {
            title: 'Obligation and necessity: níveis diferentes',
            headers: ['Forma', 'Ideia', 'Exemplo'],
            rows: [
                ['must + verb', 'regra forte', 'Visitors must wear a badge.'],
                ['have to + verb', 'obrigação externa', 'We have to submit the form.'],
                ['need to + verb', 'necessidade prática', 'She needs to call the doctor.'],
                ['do not have to', 'não é necessário', 'You do not have to print it.'],
                ['must not', 'e proibido', 'You must not enter this room.']
            ]
        },
        'Giving Specific and Tactful Advice': {
            title: 'Conselhos: ação específica, tom e motivo',
            headers: ['Função', 'Estrutura', 'Exemplo'],
            rows: [
                ['Recomendação', 'should + specific action + reason', 'You should choose one task because time is short.'],
                ['Opção possível', 'could + base verb', 'You could divide it into three steps.'],
                ['Tom mais gentil', 'maybe / I think + should', 'Maybe you should ask for help.'],
                ['Conselho pessoal', 'If I were you, I would...', 'If I were you, I would turn off notifications.'],
                ['Aviso cuidadoso', 'I do not think you should...', 'I do not think you should work all night.']
            ]
        },
        'Present Perfect: Experiences': {
            title: 'Present Perfect: experiências sem data terminada',
            headers: ['Tipo', 'Estrutura', 'Exemplo'],
            rows: [
                ['Afirmativa', 'have/has + past participle', 'She has visited Chile.'],
                ['Pergunta', 'Have/Has + subject + ever + participle?', 'Have you ever traveled alone?'],
                ['Nunca', 'have/has + never + participle', 'I have never tried it.'],
                ['Resposta curta', 'Yes, I have. / No, I have not.', 'Yes, she has.']
            ]
        },
        'Ever, Never, Already and Yet': {
            title: 'Position of ever, never, already and yet',
            headers: ['Palavra', 'Posição', 'Exemplo'],
            rows: [
                ['ever', 'antes do participio em perguntas', 'Have you ever worked abroad?'],
                ['never', 'antes do participio; frase afirmativa', 'I have never missed a deadline.'],
                ['already', 'normalmente antes do participio', 'She has already replied.'],
                ['yet', 'fim de perguntas e negativas', 'Have they arrived yet?'],
                ['still', 'antes de have/has em negativas', 'She still has not replied.']
            ]
        },
        'Present Perfect vs Past Simple': {
            title: 'Present Perfect ou Past Simple?',
            headers: ['Foco', 'Forma', 'Exemplo'],
            rows: [
                ['Experiência; sem data', 'Present Perfect', 'I have visited Chile.'],
                ['Tempo terminado', 'Past Simple', 'I visited Chile in 2019.'],
                ['Resultado agora', 'Present Perfect', 'She has finished the report.'],
                ['Quando?', 'Past Simple', 'When did she finish it?'],
                ['Marcadores', 'yesterday/last/in 2020 -> Past', 'We met last year.']
            ]
        },
        'Been and Gone': {
            title: 'Been to x gone to: a pessoa voltou?',
            headers: ['Forma', 'Significado', 'Exemplo'],
            rows: [
                ['has/have been to', 'visitou e voltou', 'She has been to the café.'],
                ['has/have gone to', 'foi e ainda está fora', 'She has gone to the café.'],
                ['Experiência', 'ever + been to', 'Have you ever been to Argentina?'],
                ['Local atual', 'gone to + contexto', 'He has gone to work. He is not home.']
            ]
        },
        'Health Changes and Recovery': {
            title: 'Mudanças de saúde: resultado, continuidade e próximo passo',
            headers: ['Ideia', 'Estrutura', 'Exemplo'],
            rows: [
                ['Mudança até agora', 'have/has + past participle', 'The cough has improved.'],
                ['Resultado antecipado', 'have/has already + participle', 'The fever has already gone down.'],
                ['Continuidade', 'still + present form', 'I still feel weak.'],
                ['Pergunta por resultado', 'Have/Has + subject + participle + yet?', 'Has the swelling gone down yet?'],
                ['Mudança + ação', 'change + so + next step', 'The rash has spread, so call the clinic.']
            ]
        },
        'Medical Consultation & Conditions': {
            title: 'Medical consultation: detalhe e duração',
            headers: ['Pergunta', 'Resposta esperada', 'Exemplo'],
            rows: [
                ['How long...?', 'for + período / since + inicio', 'For three days. / Since Monday.'],
                ['When did it start?', 'Past Simple + tempo', 'It started yesterday.'],
                ['What does it feel like?', 'sharp / mild / constant', 'It is a mild pain.'],
                ['Any allergies?', 'Yes/No + detalhe', 'I am allergic to aspirin.'],
                ['Dose', 'imperative + quantity/time', 'Take one dose at night.']
            ]
        },
        'Precise Location: In, On and At': {
            title: 'Localização precisa: área, superfície, andar e ponto',
            headers: ['Uso', 'Preposição', 'Exemplo'],
            rows: [
                ['Área ou espaco fechado', 'in', 'in the lobby / in the office'],
                ['Superfície, rua ou andar', 'on', 'on the desk / on King Street / on the second floor'],
                ['Ponto ou serviço', 'at', 'at the entrance / at the front desk'],
                ['Canto interno', 'in the corner', 'a chair in the corner of the room'],
                ['Esquina de ruas', 'at the corner', 'a café at the corner of King Street']
            ]
        },
        'Prepositions of Movement': {
            title: 'Movement: destino, entrada, caminho e passagem',
            headers: ['Movimento', 'Preposição', 'Exemplo'],
            rows: [
                ['Destino', 'to / toward', 'Walk to the station.'],
                ['Entrada/saída', 'into / out of', 'Go into the building.'],
                ['De um lado ao outro', 'across', 'Walk across the bridge.'],
                ['Dentro de um espaco', 'through', 'Go through the park.'],
                ['Ao lado/depois', 'along / past', 'Walk along the river and past the bank.']
            ]
        },
        'Time Expressions and Deadlines': {
            title: 'Tempo: prazo, continuidade, duração e janela',
            headers: ['Ideia', 'Forma', 'Exemplo'],
            rows: [
                ['Prazo final', 'by + time', 'Send it by Friday.'],
                ['Continuidade até um ponto', 'until + time', 'The office is open until noon.'],
                ['Evento x duração', 'during + event / for + period', 'during the meeting / for two hours'],
                ['Janela completa', 'from + start + to + end', 'from nine to eleven'],
                ['Limite de resposta', 'within + period', 'We will reply within two days.']
            ]
        },
        'Clarifying Multi-Step Directions': {
            title: 'Rotas em etapas: referência, ordem e confirmação',
            headers: ['Etapa', 'Linguagem útil', 'Exemplo'],
            rows: [
                ['Iniciar a rota', 'first + action + landmark', 'First, cross at the pedestrian crossing.'],
                ['Avancar', 'then / after that', 'Then keep going to the roundabout.'],
                ['Posicionar a curva', 'before / after + landmark', 'Turn left after the library.'],
                ['Escolher uma saída', 'take the first/second exit', 'Take the second exit at the roundabout.'],
                ['Confirmar', 'So I..., right?', 'So I turn after the library, right?']
            ]
        },
        'At the Hotel': {
            title: 'Hotel English: reserva, pedido e problema',
            headers: ['Situação', 'Frase útil', 'Resposta comum'],
            rows: [
                ['Reserva', 'I have a reservation under my name.', 'May I see your ID?'],
                ['Inclusão', 'Is breakfast included?', 'Yes, it is included.'],
                ['Pedido', 'Could I have another towel?', 'I will bring one.'],
                ['Problema', 'The air conditioner is not working.', 'I will send maintenance.'],
                ['Saída', 'What time is check-out?', 'Check-out is at noon.']
            ]
        },
        'Gerunds and Infinitives': {
            title: 'Verb patterns: memorize o verbo junto com o padrão',
            headers: ['Padrão', 'Depois de', 'Exemplo'],
            rows: [
                ['verb + -ing', 'enjoy, avoid, mind, finish', 'I enjoy studying.'],
                ['to + base verb', 'want, decide, hope, plan', 'She decided to study.'],
                ['Pergunta com mind', 'Do you mind + -ing?', 'Do you mind waiting?'],
                ['Expressão com to', 'look forward to + -ing', 'I look forward to seeing you.'],
                ['Negativa', 'not antes do padrão', 'I decided not to go.']
            ]
        },
        'Zero and First Conditional': {
            title: 'Zero x First Conditional: fato ou resultado futuro?',
            headers: ['Tipo', 'Estrutura', 'Exemplo'],
            rows: [
                ['Zero: fato/hábito', 'if + present, present', 'If I sleep badly, I feel tired.'],
                ['First: futuro real', 'if + present, will + verb', 'If it rains, I will stay home.'],
                ['Ordem invertida', 'result + if + condition', 'I will call if I am late.'],
                ['Pontuação', 'vírgula quando if vem primeiro', 'If we hurry, we will arrive on time.'],
                ['Cuidado', 'não use will depois de if', 'If she calls, I will answer.']
            ]
        },
        'Unless, Wishes and Real-Life Hopes': {
            title: 'Unless, hope and wish: três significados',
            headers: ['Forma', 'Uso', 'Exemplo'],
            rows: [
                ['unless', 'if not; sem dupla negativa', 'Unless we hurry, we will be late.'],
                ['hope + present/future', 'possibilidade real', 'I hope I get the job.'],
                ['wish + past', 'situação imaginada agora', 'I wish I had more time.'],
                ['Consequência', 'unless + present, will + verb', 'Unless you apply, you will miss it.'],
                ['Cuidado', 'unless + afirmativa', 'Unless we leave now...']
            ]
        }
    };

    function getGrammarTable(title, bank) {
        if (grammarTablesByTitle[title]) return grammarTablesByTitle[title];

        const label = (bank.matchLabel || bank.label || title || '').toLowerCase();

        if (/past continuous|interrupted/.test(label)) {
            return {
                title: 'Past Continuous: ação em progresso no passado',
                headers: ['Tipo', 'Estrutura', 'Exemplo'],
                rows: [
                    ['Afirmativa', 'Subject + was/were + verb-ing', 'I was cooking.'],
                    ['Negativa', 'Subject + was/were not + verb-ing', 'She was not sleeping.'],
                    ['Pergunta', 'Was/Were + subject + verb-ing?', 'Were you driving?'],
                    ['Interrupção', 'Past Continuous + when + Past Simple', 'I was cooking when the phone rang.'],
                    ['Ações simultaneas', 'Past Continuous + while + Past Continuous', 'I was cooking while she was studying.']
                ]
            };
        }

        if (!/present perfect/.test(label) && /past simple|complete past|past review/.test(label)) {
            return {
                title: 'Past Simple: afirmativa, negativa e pergunta',
                headers: ['Tipo', 'Estrutura', 'Exemplo'],
                rows: [
                    ['Afirmativa regular', 'Subject + verb-ed', 'I worked yesterday.'],
                    ['Afirmativa irregular', 'Subject + past verb', 'She went home.'],
                    ['Negativa', 'Subject + did not + base verb', 'They did not go.'],
                    ['Pergunta', 'Did + subject + base verb?', 'Did you work?'],
                    ['Resposta curta', 'Yes, subject did. / No, subject did not.', 'Yes, I did. / No, I did not.']
                ]
            };
        }

        if (/present perfect|ever|never|already|yet|been and gone/.test(label)) {
            return {
                title: 'Present Perfect: experiência e resultado',
                headers: ['Uso', 'Estrutura', 'Exemplo'],
                rows: [
                    ['Experiência', 'Subject + have/has + participle', 'I have tried sushi.'],
                    ['Pergunta com ever', 'Have/Has + subject + ever + participle?', 'Have you ever traveled alone?'],
                    ['Negativa com never', 'Subject + have/has + never + participle', 'She has never been there.'],
                    ['Already', 'Algo já aconteceu', 'I have already sent it.'],
                    ['Yet', 'Perguntas e negativas', 'Have you eaten yet? / Not yet.']
                ]
            };
        }

        if (/going to|will|present continuous for future|future review/.test(label)) {
            return {
                title: 'Future forms: escolha pelo significado',
                headers: ['Forma', 'Quando usar', 'Exemplo'],
                rows: [
                    ['Going to', 'plano ou intenção', 'I am going to call her.'],
                    ['Will', 'decisão na hora, oferta ou previsão', 'I will help you.'],
                    ['Present Continuous', 'compromisso marcado', 'I am meeting Ana at 7.'],
                    ['Pergunta', 'forma auxiliar antes do sujeito', 'Are you going to travel?'],
                    ['Negativa', 'not depois do auxiliar', 'She is not coming tonight.']
                ]
            };
        }

        if (/permission|must|have to|need to|should|advice|modals/.test(label)) {
            return {
                title: 'Modals: verbo base depois do modal',
                headers: ['Modal', 'Ideia', 'Exemplo'],
                rows: [
                    ['Can / Could', 'permissão ou pedido educado', 'Could I use your charger?'],
                    ['Must', 'regra forte', 'You must wear a badge.'],
                    ['Have to', 'obrigação externa', 'I have to leave now.'],
                    ['Need to', 'necessidade prática', 'We need to call the hotel.'],
                    ['Should', 'conselho', 'You should rest.']
                ]
            };
        }

        if (/comparative/.test(label)) {
            return {
                title: 'Comparatives: comparando duas opções',
                headers: ['Adjetivo', 'Forma', 'Exemplo'],
                rows: [
                    ['curto', 'adjective + -er + than', 'This room is cheaper than that one.'],
                    ['longo', 'more + adjective + than', 'This route is more convenient.'],
                    ['negativo', 'less + adjective + than', 'It is less expensive.'],
                    ['irregular', 'good -> better / bad -> worse', 'This option is better.']
                ]
            };
        }

        if (/superlative/.test(label)) {
            return {
                title: 'Superlatives: destacando uma opção no grupo',
                headers: ['Adjetivo', 'Forma', 'Exemplo'],
                rows: [
                    ['curto', 'the + adjective-est', 'This is the cheapest hotel.'],
                    ['longo', 'the most + adjective', 'It is the most comfortable room.'],
                    ['negativo', 'the least + adjective', 'It is the least expensive plan.'],
                    ['irregular', 'good -> the best / bad -> the worst', 'This is the best option.']
                ]
            };
        }

        if (/articles|quantifiers/.test(label)) {
            return {
                title: 'Articles and quantifiers',
                headers: ['Item', 'Use com', 'Exemplo'],
                rows: [
                    ['a/an', 'uma coisa nova ou não específica', 'I need a chair.'],
                    ['the', 'algo já conhecido', 'The chair near the window is free.'],
                    ['many / a few', 'contáveis', 'many cups / a few chairs'],
                    ['much / a little', 'incontáveis', 'much time / a little milk'],
                    ['enough', 'quantidade suficiente', 'We have enough coffee.']
                ]
            };
        }

        if (/prepositions|movement|directions|from a to b|practical english review/.test(label)) {
            return {
                title: 'Prepositions: lugar, movimento e tempo',
                headers: ['Tipo', 'Preposições', 'Exemplo'],
                rows: [
                    ['Lugar', 'in / on / at', 'at the entrance / on Main Street'],
                    ['Posição', 'next to / between / across from', 'The café is next to the bank.'],
                    ['Movimento', 'to / into / out of / through / past', 'Walk past the museum.'],
                    ['Tempo', 'at / on / in', 'at 8 / on Monday / in July'],
                    ['Direção', 'turn / go / walk / cross', 'Turn left at the corner.']
                ]
            };
        }

        if (/health|medical/.test(label)) {
            return {
                title: 'Health and medical questions',
                headers: ['Função', 'Estrutura', 'Exemplo'],
                rows: [
                    ['Sintoma com have', 'have + symptom', 'I have a headache.'],
                    ['Sensação com feel', 'feel + adjective', 'I feel dizzy.'],
                    ['Duração', 'How long have you had...?', 'How long have you had this cough?'],
                    ['For / since', 'for + período / since + inicio', 'for three days / since Monday'],
                    ['Conselho', 'should / need to + base verb', 'You should rest.']
                ]
            };
        }

        if (/hotel|at the hotel/.test(label)) {
            return {
                title: 'Hotel requests: pedidos educados',
                headers: ['Situação', 'Frase útil', 'Resposta comum'],
                rows: [
                    ['Reserva', 'I have a reservation under Ana Lima.', 'May I see your ID?'],
                    ['Pedido', 'Could I have another towel?', 'Sure. I will bring one.'],
                    ['Problema', 'The key card is not working.', 'I will sort it out.'],
                    ['Check-out', 'What time is check-out?', 'Check-out is at noon.']
                ]
            };
        }

        if (/gerunds|infinitives/.test(label)) {
            return {
                title: 'Gerund or infinitive',
                headers: ['Padrão', 'Depois de', 'Exemplo'],
                rows: [
                    ['verb + -ing', 'enjoy, avoid, mind, finish', 'I enjoy cooking.'],
                    ['to + verb', 'want, decide, hope, plan', 'She decided to stay.'],
                    ['pergunta', 'Do you mind + -ing?', 'Do you mind waiting?'],
                    ['chunk', 'memorize a frase completa', 'I hope to see you soon.']
                ]
            };
        }

        if (/final review|final project/.test(label)) {
            return {
                title: 'Final review: conectando ideias',
                headers: ['Objetivo', 'Estrutura útil', 'Exemplo'],
                rows: [
                    ['Passado', 'Past Simple / Past Continuous', 'I solved a problem yesterday.'],
                    ['Experiência', 'Present Perfect', 'I have improved my confidence.'],
                    ['Futuro', 'going to / will', 'I am going to practice more.'],
                    ['Condição', 'if + present, will + verb', 'If I practice, I will improve.'],
                    ['Organização', 'first, then, however, because', 'First, I made a plan.']
                ]
            };
        }

        if (/conditional|unless|wishes/.test(label)) {
            return {
                title: 'Conditionals, unless and wish',
                headers: ['Forma', 'Estrutura', 'Exemplo'],
                rows: [
                    ['Zero conditional', 'If + present, present', 'If I sleep badly, I feel tired.'],
                    ['First conditional', 'If + present, will + verb', 'If it rains, I will stay home.'],
                    ['Unless', 'unless = if not', 'Unless we leave now, we will be late.'],
                    ['Wish', 'situação imaginada ou difícil de mudar', 'I wish I had more time.']
                ]
            };
        }

        return null;
    }

    function renderGrammarTable(table) {
        if (!table) return '';
        return `
            <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table class="w-full text-left text-sm md:text-base">
                    <thead class="bg-emerald-50 text-emerald-800">
                        <tr>${table.headers.map((header) => `<th class="p-3 font-black">${escapeHtml(header)}</th>`).join('')}</tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${table.rows.map((row) => `
                            <tr>${row.map((cell) => `<td class="p-3 align-top text-slate-700">${escapeHtml(cell)}</td>`).join('')}</tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    function fillVocabulary(bank) {
        setHtml('#flashcards-container', bank.vocab.map(([word, pt, example]) => `
            <div class="flashcard bg-white rounded-2xl shadow p-5 min-h-48 cursor-pointer border border-slate-200" data-save-card data-card-front="${escapeHtml(word)}" data-card-back="${escapeHtml(pt)}">
                <div class="flashcard-inner">
                    <div class="flashcard-front text-center space-y-3">
                        <p class="text-sm uppercase tracking-wide text-emerald-600 font-bold">Vocabulary</p>
                        <h3 class="text-2xl font-black text-slate-900">${escapeHtml(word)}</h3>
                        <p class="text-sm text-slate-500">Clique para ver significado e exemplo</p>
                    </div>
                    <div class="flashcard-back text-center space-y-3">
                        <h3 class="text-xl font-black text-emerald-700">${escapeHtml(pt)}</h3>
                        <p class="v3-card-example-translation text-slate-600" data-v3-translate="${escapeHtml(example)}"></p>
                    </div>
                </div>
            </div>
        `).join(''));
    }

    function fillGrammar(data) {
        const { title, bank } = data;
        const slide = document.querySelector('.slide[data-title="Deep Grammar"]');
        if (!slide) return;
        const table = getGrammarTable(title, bank);
        slide.querySelector('h2').textContent = `Grammar Focus: ${title}`;
        setHtml('.slide[data-title="Deep Grammar"] .max-w-4xl', `
            <div class="activity-card border-t-8 border-emerald-500 p-8 space-y-5">
                ${table ? `
                    <section class="space-y-3">
                        <h3 class="text-2xl font-bold text-emerald-700">${escapeHtml(table.title)}</h3>
                        ${renderGrammarTable(table)}
                    </section>
                ` : ''}
                <div class="grid md:grid-cols-3 gap-4">
                ${bank.grammar.map(([heading, body]) => `
                    <section class="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <h3 class="text-lg font-black mb-2 text-emerald-700">${escapeHtml(heading)}</h3>
                        <p class="text-sm text-slate-600 leading-relaxed">${escapeHtml(shortGrammarText(body))}</p>
                    </section>
                `).join('')}
                </div>
                <div class="bg-slate-100 p-5 rounded-xl space-y-2">
                    <p class="font-black text-slate-900">Exemplos para observar:</p>
                    ${bank.examples.slice(0, 4).map((example) => `<p><i class="fas fa-check text-emerald-600 mr-2"></i>${escapeHtml(example)}</p>`).join('')}
                </div>
                <div class="callout-note p-5 rounded-xl">
                    <p class="font-bold">Prática rápida</p>
                    <p>Transforme dois exemplos em afirmativa, negativa e pergunta antes de seguir para as atividades.</p>
                </div>
            </div>
        `);
    }

    function buildPractice(bank) {
        if (Array.isArray(bank.practice) && bank.practice.length) {
            return bank.practice;
        }

        return createPracticeItems(bank);
    }

    function fillPractice(bank) {
        setHtml('#practice-questions', buildPractice(bank).map((item, index) => `
            <div class="activity-card p-5">
                <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span class="generated-tag">${index + 1}. ${escapeHtml(item.type)}</span>
                    ${revealButton(item.answer)}
                </div>
                <p class="text-lg font-semibold text-slate-900">${renderPracticePrompt(item)}</p>
                <p class="text-sm text-slate-500 mt-2"><strong>Dica:</strong> ${escapeHtml(item.hint)}</p>
                <p class="a2-answer hidden mt-3 p-3 rounded-lg bg-emerald-50 text-emerald-800 font-semibold"></p>
            </div>
        `).join(''));
    }

    function expressionTranslationItems(bank) {
        const items = [...(bank.expressionTranslations || [])];
        const used = new Set(items.map(item => String(item.en || '').trim().toLowerCase()));
        const label = String(bank.matchLabel || bank.label || '').toLowerCase();
        let supplements = [
            { pt: 'Eu quero continuar.', en: 'I want to keep going.' },
            { pt: 'Eu desenvolvi confiança aos poucos.', en: 'I built up confidence.' }
        ];
        if (/past simple|complete past|past continuous|interrupted/.test(label)) supplements = [
            { pt: 'Todo mundo se acalmou depois de alguns minutos.', en: 'Everyone calmed down after a few minutes.' },
            { pt: 'Nós descobrimos o que aconteceu mais tarde.', en: 'We found out what happened later.' }
        ];
        else if (/comparative|superlative|articles|quantifiers/.test(label)) supplements = [
            { pt: 'Nós compramos bastante lanche.', en: 'We stocked up on snacks.' },
            { pt: 'Podemos nos virar com duas mesas.', en: 'We can make do with two tables.' }
        ];
        else if (/going to|will|present continuous for future|future review/.test(label)) supplements = [
            { pt: 'Eu vou dar seguimento amanhã.', en: 'I will follow up tomorrow.' },
            { pt: 'Eles adiaram a reunião.', en: 'They pushed back the meeting.' }
        ];
        else if (/permission|must|have to|need to|should|advice/.test(label)) supplements = [
            { pt: 'Você deveria ir mais devagar esta semana.', en: 'You should slow down this week.' },
            { pt: 'Ela está lidando com estresse.', en: 'She is dealing with stress.' }
        ];
        else if (/present perfect|ever|never|already|yet|been and gone/.test(label)) supplements = [
            { pt: 'Ela vai voltar em breve.', en: 'She will get back soon.' },
            { pt: 'Eles voltaram ontem.', en: 'They came back yesterday.' }
        ];
        else if (/health|medical/.test(label)) supplements = [
            { pt: 'Você deveria deitar por um tempo.', en: 'You should lie down for a while.' },
            { pt: 'A médica vai acompanhar na próxima semana.', en: 'The doctor will follow up next week.' }
        ];
        else if (/prepositions|movement|directions|hotel|time|from a to b/.test(label)) supplements = [
            { pt: 'A recepção resolveu o problema.', en: 'Reception sorted out the problem.' },
            { pt: 'Nós fizemos check-in tarde.', en: 'We checked in late.' }
        ];
        else if (/gerunds|infinitives|conditional|unless|wishes/.test(label)) supplements = [
            { pt: 'Nós vamos encontrar uma solução.', en: 'We will figure out a solution.' },
            { pt: 'Não perca essa oportunidade.', en: 'Do not miss out on this chance.' }
        ];
        for (const item of supplements) {
            const key = item.en.trim().toLowerCase();
            if (used.has(key)) continue;
            items.push(item);
            used.add(key);
            if (items.length >= 6) break;
        }
        return items.slice(0, 6);
    }

    function fillTranslations(bank, selector, focusExpressions) {
        const items = focusExpressions
            ? expressionTranslationItems(bank)
            : (bank.translations || []).slice(0, 6);

        setHtml(selector, items.map((item, index) => `
            <div class="activity-card p-5">
                <div class="flex flex-wrap items-center justify-between gap-3">
                    <p class="text-lg font-semibold text-slate-900"><span class="text-emerald-700 font-black">${index + 1}.</span> <span${item.pt ? '' : ` data-v3-translate="${escapeHtml(item.en)}"`}>${item.pt ? escapeHtml(item.pt) : ''}</span></p>
                    ${revealButton(item.en)}
                </div>
                <p class="a2-answer hidden mt-3 p-3 rounded-lg bg-emerald-50 text-emerald-800 font-semibold"></p>
            </div>
        `).join(''));
    }

    function fillExpressions(bank) {
        setHtml('#expressions-container', bank.expressions.map(([expr, meaning, example]) => `
            <div class="activity-card p-6" data-save-card data-pronounce-text="${escapeHtml(expr)}" data-card-front="${escapeHtml(expr)}" data-card-back="${escapeHtml(meaning)} — ${escapeHtml(example)}">
                <h3 class="text-2xl font-black text-emerald-700">${escapeHtml(expr)}</h3>
                <p class="text-slate-500 font-semibold mt-2">${escapeHtml(meaning)}</p>
                <p class="text-slate-700 mt-4">${escapeHtml(example)}</p>
            </div>
        `).join(''));
    }

    function fillDialogues(bank) {
        const dialogues = bank.dialogues || [];
        const indexes = getLessonNumber() % 2 === 0 ? [1, 3] : [0, 2];
        const selectedDialogues = indexes.map((index) => dialogues[index]).filter(Boolean);

        setHtml('#mini-dialogues-container', selectedDialogues.map((dialogue, index) => `
            <div class="activity-card p-6 space-y-3">
                <h3 class="lesson-panel-title">Dialogue ${index + 1}</h3>
                ${dialogue.map(([speaker, text]) => `
                    <div class="flex gap-3">
                        <span class="font-black text-emerald-700 min-w-20">${escapeHtml(speaker)}:</span>
                        <div class="v3-dialogue-utterance flex-1">
                            <p>${escapeHtml(text)}</p>
                            <button type="button" class="v3-speak-btn" data-v3-speak="${escapeHtml(text)}" aria-label="Ouvir: ${escapeHtml(text)}" title="Ouvir frase em inglês"><i class="fas fa-volume-up" aria-hidden="true"></i></button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `).join(''));
    }

    function createReadingQuestions(bank) {
        if (Array.isArray(bank.readingQuestions) && bank.readingQuestions.length) {
            return bank.readingQuestions;
        }

        return [
            {
                question: 'Who is the text about?',
                answer: 'Possible answer: Name the person or people mentioned in the text.'
            },
            {
                question: 'Where does the situation happen?',
                answer: 'Possible answer: Say the place mentioned in the text, such as work, home, a hotel, a clinic, or a city.'
            },
            {
                question: 'What happens first?',
                answer: 'Possible answer: Find the first action or first event in the text.'
            },
            {
                question: 'What happens at the end?',
                answer: 'Possible answer: Say the final action, result, or decision in the text.'
            }
        ];
    }

    function fillReading(bank) {
        const profileMarkup = Array.isArray(bank.readingProfiles) && bank.readingProfiles.length
            ? `<div class="grid md:grid-cols-2 gap-4 mt-5">
                ${bank.readingProfiles.map((profile) => `
                    <article class="activity-card p-5 text-left">
                        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <h4 class="text-xl font-black text-slate-900">${escapeHtml(profile.sign)}</h4>
                            <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">${escapeHtml(profile.dates)}</span>
                        </div>
                        <p class="text-xs font-black uppercase tracking-wider text-emerald-700 mb-2">${escapeHtml(profile.element)} · Traditional profile</p>
                        <p class="font-bold text-slate-800 mb-2">${escapeHtml(profile.traits)}</p>
                        <p class="text-sm leading-relaxed text-slate-600">${escapeHtml(profile.preference)}</p>
                    </article>
                `).join('')}
            </div>`
            : '';
        setHtml('#reading-text', `
            <h3 class="text-2xl font-black text-slate-900 mb-4">${escapeHtml(bank.readingTitle)}</h3>
            <p>${escapeHtml(bank.reading)}</p>
            ${profileMarkup}
        `);
        const questions = createReadingQuestions(bank).slice(0, 3);
        setHtml('#reading-questions', `
            <p class="font-bold text-xl mb-4">Interpretation Questions:</p>
            ${questions.map((item, index) => `
                <div class="activity-card p-4">
                    <p class="font-semibold">${index + 1}. ${escapeHtml(item.question)}</p>
                    ${revealButton(item.answer)}
                    <p class="a2-answer hidden mt-3 p-3 rounded-lg bg-emerald-50 text-emerald-800 font-semibold"></p>
                </div>
            `).join('')}
        `);
    }

    function renderLyricPlaceholder() {
        return `<div class="v3-lyric-placeholder">
            <div class="v3-lyric-placeholder-head"><strong>Letra com lacunas</strong><span>Texto musical fictício para preservar o layout até a inserção do conteúdo autorizado.</span></div>
            <div class="v3-lyric-copy">
                <p class="v3-lyric-stanza">
                    <span class="v3-lyric-line">I wake to see the <input class="v3-lyric-gap" type="text" aria-label="Lacuna musical 1" autocomplete="off" spellcheck="false"> through the window,</span>
                    <span class="v3-lyric-line">A quiet street is waiting down below.</span>
                    <span class="v3-lyric-line">I take a breath and <input class="v3-lyric-gap" type="text" aria-label="Lacuna musical 2" autocomplete="off" spellcheck="false"> the open doorway,</span>
                    <span class="v3-lyric-line">Not knowing where this winding road will go.</span>
                </p>
                <p class="v3-lyric-stanza">
                    <span class="v3-lyric-line">I carry every <input class="v3-lyric-gap" type="text" aria-label="Lacuna musical 3" autocomplete="off" spellcheck="false"> that you gave me,</span>
                    <span class="v3-lyric-line">It keeps me moving when the night is long.</span>
                    <span class="v3-lyric-line">And if I lose my <input class="v3-lyric-gap" type="text" aria-label="Lacuna musical 4" autocomplete="off" spellcheck="false"> for just a moment,</span>
                    <span class="v3-lyric-line">I close my eyes and listen for our song.</span>
                </p>
                <p class="v3-lyric-stanza">
                    <span class="v3-lyric-line">We keep on <input class="v3-lyric-gap" type="text" aria-label="Lacuna musical 5" autocomplete="off" spellcheck="false"> toward tomorrow,</span>
                    <span class="v3-lyric-line">With every step, a little more to learn.</span>
                    <span class="v3-lyric-line">Through every change, through every joy and sorrow,</span>
                    <span class="v3-lyric-line">The light we share will always <input class="v3-lyric-gap" type="text" aria-label="Lacuna musical 6" autocomplete="off" spellcheck="false">.</span>
                </p>
            </div>
            <p class="v3-copyright-note"><i class="fas fa-shield-halved" aria-hidden="true"></i> Nenhuma letra protegida é distribuída nesta versão.</p>
        </div>`;
    }

    function fillMusic(bank) {
        const selection = getMusicSelection(document.title, bank);
        const lyricMarkup = renderLyricPlaceholder();

        setHtml('#music-lyrics', `
            <div class="text-left text-lg space-y-5">
                <div class="activity-card p-5 space-y-4">
                    <div>
                        <p class="lesson-panel-title">Spotify</p>
                        <h3 class="text-2xl font-black text-slate-900">${escapeHtml(selection.song)} <span class="text-lg text-slate-500">- ${escapeHtml(selection.artist)}</span></h3>
                        <p class="text-sm text-slate-500 mt-2">Foco de escuta: ${escapeHtml(selection.focus)}.</p>
                    </div>
                    <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/${escapeHtml(selection.spotifyId)}?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </div>
                <div class="activity-card p-6 space-y-5">
                    ${lyricMarkup}
                </div>
            </div>
        `);
    }

    function renderMusicLyricLine(entry, stanzaIndex, lineIndex) {
        if (!Array.isArray(entry)) {
            return `<span class="music-lyric-line">${escapeHtml(entry)}</span>`;
        }

        const [line, answer] = entry;
        const marker = '________';
        const markerIndex = line.indexOf(marker);
        if (markerIndex < 0) {
            return `<span class="music-lyric-line">${escapeHtml(line)}</span>`;
        }

        const answerId = `music-gap-answer-${stanzaIndex}-${lineIndex}`;
        const placeholderId = `music-gap-placeholder-${stanzaIndex}-${lineIndex}`;
        const before = line.slice(0, markerIndex);
        const after = line.slice(markerIndex + marker.length);

        return `
            <span class="music-lyric-line">
                ${escapeHtml(before)}<span class="music-gap-control">
                    <span id="${placeholderId}" class="music-gap-placeholder">${marker}</span>
                    <strong id="${answerId}" class="music-gap-answer hidden" aria-live="polite">${escapeHtml(answer)}</strong>
                    <button
                        type="button"
                        class="music-answer-toggle"
                        data-music-reveal
                        data-placeholder-id="${placeholderId}"
                        aria-controls="${answerId}"
                        aria-expanded="false"
                        aria-label="Revelar resposta desta lacuna"
                        title="Revelar resposta"
                    ><i class="fas fa-eye" aria-hidden="true"></i></button>
                </span>${escapeHtml(after)}
            </span>
        `;
    }

    function fillHomework(data) {
        const { title, bank } = data;
        const themes = (bank.themes || bank.themeOptions || []).slice(0, 3);
        setHtml('#homework-list', `
            <li class="block">
                <div class="font-black mb-2"><i class="fas fa-map-pin mr-2"></i>Escolha um tema para o homework:</div>
                <div class="grid gap-2">
                    ${themes.map((theme, index) => `<div class="bg-white/20 rounded-xl p-3"><strong>Tema ${index + 1}:</strong> ${escapeHtml(theme)}</div>`).join('')}
                </div>
            </li>
            <li class="flex gap-3"><i class="fas fa-edit mt-1"></i> Escreva 8 frases usando ${escapeHtml(title)} com o tema escolhido acima.</li>
            <li class="flex gap-3"><i class="fas fa-comment-dots mt-1"></i> Prepare um roteiro de 60 a 90 segundos com pelo menos 3 palavras do vocabulário e 1 expressão do slide 6 para apresentar ao vivo.</li>
            <li class="flex gap-3"><i class="fas fa-comments mt-1"></i> Crie um mini diálogo novo com 6 a 8 falas sobre o mesmo tema.</li>
            <li class="flex gap-3"><i class="fas fa-book-open mt-1"></i> Releia o texto do slide 8 e responda novamente as perguntas com respostas mais completas.</li>
        `);
    }

    function getReviewLesson(number) {
        const reviews = {
            8: {
                title: 'Review 1: Past Stories, Comparisons and Quantity',
                focus: ['Past Simple: use did for questions/negatives and past verbs in affirmatives.', 'Past Continuous: use was/were + -ing for background actions.', 'Comparatives/Superlatives: compare options and identify the strongest option.', 'Articles/Quantifiers: choose a/an/the, some, many, much, enough.'],
                drills: [
                    ['Complete', 'Yesterday I ____ late and missed the first bus.', 'woke up'],
                    ['Choose', 'Which is correct: Did you went? / Did you go?', 'Did you go?'],
                    ['Correct', 'She was cook when I arrived.', 'She was cooking when I arrived.'],
                    ['Compare', 'Make a sentence comparing bus and subway.', 'The subway is faster than the bus.'],
                    ['Superlative', 'Use "the best" in a sentence about a restaurant.', 'This is the best restaurant near my house.'],
                    ['Quantifier', 'Complete: We do not have ____ time before the meeting.', 'much'],
                    ['Unscramble', 'late / arrived / because / I / overslept', 'I arrived late because I overslept.'],
                    ['Find the error', 'There are much people in the room.', 'There are many people in the room.']
                ],
                translations: [
                    ['Eu acordei tarde ontem.', 'I woke up late yesterday.'],
                    ['Você conseguiu resolver o problema?', 'Did you manage to solve the problem?'],
                    ['Eu estava cozinhando quando o telefone tocou.', 'I was cooking when the phone rang.'],
                    ['Este bairro e mais seguro.', 'This neighborhood is safer.'],
                    ['Nós temos cadeiras suficientes.', 'We have enough chairs.']
                ],
                oralTest: [
                    ['Timeline', 'Tell the story using these facts: missed bus / called manager / arrived by taxi.', 'I missed the bus, so I called my manager. Then I arrived by taxi.'],
                    ['Background', 'Complete the scene: rain / people wait / bus arrive.', 'It was raining, and people were waiting when the bus arrived.'],
                    ['Comparison', 'Choose a travel option: bus is cheap; train is fast and comfortable.', 'The bus is cheaper, but the train is faster and more comfortable. I would choose the train.'],
                    ['Quantity plan', 'Prepare a meeting for ten people using enough, a few, and a little.', 'We have enough water, a few extra chairs, and a little time before the meeting.'],
                    ['Question round', 'Ask one Past Simple question and one Past Continuous question.', 'Did you call the hotel? What were you doing when the phone rang?']
                ],
                errorClinic: [
                    ['Past Simple', 'I did not went to the meeting.', 'I did not go to the meeting.'],
                    ['Past Continuous', 'They was waiting outside.', 'They were waiting outside.'],
                    ['Comparative', 'This route is more fast than that one.', 'This route is faster than that one.'],
                    ['Superlative', 'It is best option for us.', 'It is the best option for us.'],
                    ['Quantifier', 'We have many information.', 'We have much information.'],
                    ['Article', 'I kept receipt in my bag.', 'I kept the receipt in my bag.']
                ],
                recap: [
                    ['Story chain', 'Say 3 sentences: one finished action, one background action, one result.', 'I left home late. It was raining. I missed the bus.'],
                    ['Two-option decision', 'Compare two places using cheaper, safer, and the best.', 'This area is cheaper, that area is safer, but this one is the best for me.'],
                    ['Quantity check', 'Say what you have and do not have for a small meeting.', 'We have enough water, but we do not have many cups.'],
                    ['Past question sprint', 'Ask two questions with did about yesterday.', 'Did you work yesterday? Did you arrive late?'],
                    ['Scene builder', 'Describe what three people were doing when something happened.', 'I was cooking, Ana was reading, and Leo was calling us when the lights went out.']
                ]
            },
            16: {
                title: 'Review 2: Future Forms and Modals',
                focus: ['Going to: plans and intentions already decided.', 'Will: instant decisions, promises and predictions.', 'Present Continuous: confirmed future arrangements.', 'Modals: can/could for permission, must/have to/need to for obligation, should for advice.'],
                drills: [
                    ['Choose', 'Plan or instant decision? "I will help you."', 'instant decision / offer'],
                    ['Complete', 'I am going to ____ dinner tonight.', 'prepare'],
                    ['Correct', 'She going to call later.', 'She is going to call later.'],
                    ['Arrangement', 'Make a sentence with "I am meeting..."', 'I am meeting Ana at seven.'],
                    ['Permission', 'Ask politely to use a charger.', 'Could I use your charger?'],
                    ['Obligation', 'Complete: Visitors ____ wear a badge.', 'must'],
                    ['Advice', 'Give advice to a tired friend.', 'You should rest.'],
                    ['Find the error', 'You should to drink water.', 'You should drink water.']
                ],
                translations: [
                    ['Eu vou ligar para ela agora.', 'I will call her now.'],
                    ['Nós vamos visitar minha tia.', 'We are going to visit my aunt.'],
                    ['Eu vou encontrar Ana às sete.', 'I am meeting Ana at seven.'],
                    ['Você poderia repetir isso?', 'Could you repeat that?'],
                    ['Você deveria descansar.', 'You should rest.']
                ],
                oralTest: [
                    ['Weekend plan', 'Say one existing plan for Saturday and one activity that is already arranged.', 'I am going to clean the apartment, and I am meeting my sister at seven.'],
                    ['Quick response', 'Your coworker cannot carry two boxes. Respond with an immediate offer.', 'I will help you with the boxes.'],
                    ['Visitor rules', 'Tell a visitor one obligation and one thing that is optional.', 'You must wear a badge, but you do not have to print the form.'],
                    ['Polite solution', 'Ask permission to open a window, then ask someone to lower the volume.', 'Could I open the window? Could you turn down the volume, please?'],
                    ['Practical advice', 'A friend studies until 2 a.m. and feels exhausted. Give two pieces of advice.', 'You should stop earlier, and you should not skip sleep.']
                ],
                errorClinic: [
                    ['Going to', 'I going to call the hotel.', 'I am going to call the hotel.'],
                    ['Will', 'I will to help you.', 'I will help you.'],
                    ['Arrangement', 'We meeting the client at noon.', 'We are meeting the client at noon.'],
                    ['Permission', 'Could I to leave early?', 'Could I leave early?'],
                    ['Obligation', 'She must to bring a document.', 'She must bring a document.'],
                    ['Advice', 'You should to take a break.', 'You should take a break.']
                ],
                recap: [
                    ['Calendar check', 'Say one fixed arrangement, one plan, and one quick decision.', 'I am meeting Ana at six. I am going to prepare dinner. I will call you now.'],
                    ['Polite request chain', 'Ask for permission, then make the request softer with could.', 'Can I open the window? Could I open the window, please?'],
                    ['Rule or advice?', 'Create one rule with must and one advice sentence with should.', 'You must wear a badge. You should arrive early.'],
                    ['Future contrast', 'Explain the difference between a plan and a promise using examples.', 'I am going to study tonight. I will help you with the file.'],
                    ['Office situation', 'Respond to a manager using have to, need to, and will.', 'I have to finish this first. I need to call the client. I will send it soon.']
                ]
            },
            24: {
                title: 'Review 3: Experiences, Health and Practical Directions',
                focus: ['Present Perfect: have/has + participle for experiences and unfinished results.', 'Been/Gone: been means visited and returned; gone means went and is not back.', 'Health: use have for symptoms and feel + adjective.', 'Prepositions: use place, movement and time language for practical situations.'],
                drills: [
                    ['Complete', 'I have never ____ sushi.', 'tried'],
                    ['Choose', 'He has been to the bank / He has gone to the bank. Which means he is still there?', 'He has gone to the bank.'],
                    ['Correct', 'I have visited Recife last year.', 'I visited Recife last year.'],
                    ['Health', 'Say one symptom with "have".', 'I have a headache.'],
                    ['Advice', 'Give advice to someone with a fever.', 'You should rest and drink water.'],
                    ['Direction', 'Complete: Walk ____ the bank and turn left.', 'past'],
                    ['Time', 'Complete: The appointment is ____ Friday at nine.', 'on'],
                    ['Find the error', 'The pharmacy is in the corner.', 'The pharmacy is on/at the corner.']
                ],
                translations: [
                    ['Você já viajou sozinho?', 'Have you ever traveled alone?'],
                    ['Ele foi para a farmácia e ainda não voltou.', 'He has gone to the pharmacy.'],
                    ['Eu tenho dor de cabeça.', 'I have a headache.'],
                    ['A consulta e na sexta às nove.', 'The appointment is on Friday at nine.'],
                    ['Siga em frente por dois quarteirões.', 'Go straight for two blocks.']
                ],
                oralTest: [
                    ['Experience + date', 'Say that you have visited a city, then say exactly when you went.', 'I have visited Curitiba. I went there in 2024.'],
                    ['Been or gone?', 'Clara is at the bank now. Say where she is, then mention a bank she visited before.', 'Clara has gone to the bank. She has been to the bank near the station before.'],
                    ['Clinic message', 'Describe a cough, its duration, and one other symptom.', 'I have had a cough for four days, and I feel dizzy in the morning.'],
                    ['Find the place', 'Locate a clinic using between, across from, and on.', 'The clinic is on Green Street, between the café and the bank, across from the park.'],
                    ['Route + appointment', 'Give a route and finish with the appointment time.', 'Walk through the park and past the pharmacy. The appointment is at ten on Monday.']
                ],
                errorClinic: [
                    ['Present Perfect', 'She has seen that movie yesterday.', 'She saw that movie yesterday.'],
                    ['Yet', 'Have you yet finished?', 'Have you finished yet?'],
                    ['Been/Gone', 'She has been to the pharmacy, so she is not here now.', 'She has gone to the pharmacy, so she is not here now.'],
                    ['Health', 'I feel a headache.', 'I have a headache.'],
                    ['Place', 'The café is in the corner.', 'The café is on/at the corner.'],
                    ['Movement', 'Walk to the park and across the gate.', 'Walk through the park and through/past the gate.']
                ],
                recap: [
                    ['Experience check', 'Ask and answer two Have you ever questions.', 'Have you ever traveled alone? Yes, I have. Have you ever tried sushi? No, I have not.'],
                    ['Where is Bruno?', 'Explain been to and gone to with pharmacy examples.', 'He has been to the pharmacy before, but now he has gone to the pharmacy.'],
                    ['Doctor desk', 'Describe symptoms, duration, and advice in 3 sentences.', 'I have had a cough for three days. I feel weak. I should rest.'],
                    ['Map briefing', 'Give directions using past, across from, and at.', 'Walk past the bank. The pharmacy is across from the café. Meet me at the entrance.'],
                    ['Appointment message', 'Say a date, time, place, and symptom clearly.', 'My appointment is on Friday at nine at the clinic. I have a sore throat.']
                ]
            },
            32: {
                title: 'Final Review: Build Longer Answers',
                focus: ['Past: explain what happened and give sequence.', 'Present Perfect: describe progress and experiences.', 'Future: explain plans and next steps.', 'Conditionals/Wish/Unless: connect choices, consequences and hopes.'],
                drills: [
                    ['Past', 'Complete: First, I practiced. Then I ____ more confident.', 'became'],
                    ['Present Perfect', 'Complete: I have ____ my speaking confidence.', 'improved'],
                    ['Future', 'Say one next step with "going to".', 'I am going to practice every day.'],
                    ['Conditional', 'Complete: If I practice daily, I ____ improve.', 'will'],
                    ['Unless', 'Complete: I will forget vocabulary unless I ____ it.', 'review'],
                    ['Wish', 'Make a sentence with "I wish..."', 'I wish I had more time.'],
                    ['Connector', 'Connect two ideas with "because".', 'I practice because I want to speak better.'],
                    ['Long answer', 'Give a 3-sentence progress answer.', 'I have improved my confidence. I still make mistakes, but I speak more often. My next goal is to practice listening.']
                ],
                translations: [
                    ['Eu melhorei minha confiança.', 'I have improved my confidence.'],
                    ['Eu praticava pouco, mas agora pratico mais.', 'I used to practice little, but now I practice more.'],
                    ['Se eu praticar todos os dias, vou melhorar.', 'If I practice every day, I will improve.'],
                    ['Meu próximo passo é ouvir mais inglês.', 'My next step is to listen to more English.'],
                    ['Eu quero continuar.', 'I want to keep going.']
                ],
                oralTest: [
                    ['Past evidence', 'Describe one difficulty you had and the action that helped.', 'I felt nervous during calls, so I practiced short answers every morning.'],
                    ['Progress evidence', 'Say two things you have learned to do more confidently.', 'I have learned to ask follow-up questions and explain simple problems.'],
                    ['Next arrangement', 'Give one plan and one confirmed arrangement for next month.', 'I am going to review vocabulary, and I am joining a conversation group on Tuesday.'],
                    ['Conditional routine', 'Connect a study action to a future result.', 'If I practice listening every day, I will understand more natural speech.'],
                    ['Hope and obstacle', 'Use hope, wish, and unless in one short response.', 'I hope I speak more naturally soon. I wish I had more time, but I will not improve unless I practice.']
                ],
                errorClinic: [
                    ['Past + progress', 'I have improved yesterday.', 'I improved yesterday. / I have improved recently.'],
                    ['Future plan', 'I will going to practice more.', 'I am going to practice more. / I will practice more.'],
                    ['Conditional', 'If I will study, I will improve.', 'If I study, I will improve.'],
                    ['Unless', 'Unless I do not practice, I will forget.', 'Unless I practice, I will forget.'],
                    ['Wish', 'I wish I have more time.', 'I wish I had more time.'],
                    ['Connector', 'I practice. Because I want fluency.', 'I practice because I want fluency.']
                ],
                recap: [
                    ['Progress pitch', 'Give a 45-second answer: past progress, current challenge, next step.', 'I improved my confidence. My challenge is listening. My next step is daily practice.'],
                    ['Timeline answer', 'Use past, present perfect, and future in one answer.', 'I started slowly. I have learned useful phrases. I am going to practice more.'],
                    ['Problem solver', 'Explain a problem, what helped, and what you will do next.', 'Pronunciation was difficult. Repeating short answers helped me. I will repeat short phrases every day.'],
                    ['Conditional goal', 'Make two goal sentences with if and unless.', 'If I practice daily, I will improve. Unless I review, I will forget.'],
                    ['Final reflection', 'Say what changed, what still needs work, and why you will keep going.', 'I speak more now. Listening still needs work. I will keep going because I can see progress.']
                ]
            }
        };
        return reviews[number] || null;
    }

    function renderReviewItems(items) {
        return items.map((item, index) => `
            <div class="activity-card p-5">
                <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span class="generated-tag">${index + 1}. ${escapeHtml(item[0])}</span>
                    ${revealButton(item[2])}
                </div>
                <p class="text-lg font-semibold text-slate-900">${escapeHtml(item[1]).replace(/____/g, '<span class="inline-block min-w-32 border-b-2 border-emerald-600 mx-1">&nbsp;</span>')}</p>
                <p class="a2-answer hidden mt-3 p-3 rounded-lg bg-emerald-50 text-emerald-800 font-semibold"></p>
            </div>
        `).join('');
    }

    function expandReviewFocus(item) {
        const [name, detail = ''] = String(item).split(':');
        const extra = {
            'Past Simple': 'Use when the action is finished. In questions and negatives, did carries the past, so the main verb stays in base form: Did you go? I did not go.',
            'Past Continuous': 'Use for the background action, the scene, or an action in progress before something interrupted it. It often works with when and while.',
            'Comparatives/Superlatives': 'Comparatives compare two options; superlatives choose one option inside a group. Always add the context: cheaper than what? the best in which group?',
            'Articles/Quantifiers': 'Use a/an for one new item, the for a known item, many/few with countable nouns, and much/little with uncountable nouns.',
            'Going to': 'Use for plans that existed before the moment of speaking. It sounds intentional and planned.',
            'Will': 'Use for decisions made now, offers, promises, and predictions based on opinion.',
            'Present Continuous': 'Use for future arrangements that already have time, place, or another person involved.',
            'Modals': 'After can, could, must, should, and might, use the base verb. Do not add to after the modal.',
            'Present Perfect': 'Use when the experience or result matters now and the exact finished time is not the focus.',
            'Been/Gone': 'Been means the person visited and returned. Gone means the person went and is not back yet.',
            'Health': 'Use have with symptoms and feel with adjectives. For duration, use have had with for or since.',
            'Prepositions': 'Prepositions are small but precise: place tells where, movement tells the path, and time tells when.',
            'Past': 'Use past forms to explain what changed. Add sequence words so the listener can follow the story.',
            'Future': 'Choose the future form by meaning: plan, arrangement, promise, prediction, or next step.',
            'Conditionals/Wish/Unless': 'Use conditionals to connect action and result. Use unless as if not. Use wish for imagined or difficult-to-change situations.'
        };
        return {
            name: name.trim(),
            detail: detail.trim(),
            extra: extra[name.trim()] || 'Use this structure in a complete situation, not as an isolated rule. Add context, reason, and result when possible.'
        };
    }

    function reviewTableRows(items) {
        return items.map((item) => {
            const expanded = expandReviewFocus(item);
            return `<tr>
                <td class="p-3 font-black text-emerald-700">${escapeHtml(expanded.name)}</td>
                <td class="p-3 text-slate-700">${escapeHtml(expanded.detail)}</td>
                <td class="p-3 text-slate-700">${escapeHtml(expanded.extra)}</td>
            </tr>`;
        }).join('');
    }

    function renderA2GrammarTable(items) {
        return `<div class="overflow-x-auto rounded-xl border border-slate-200 bg-white v3-review-grammar-table"><table class="w-full text-left text-sm md:text-base"><thead class="bg-emerald-50 text-emerald-800"><tr><th class="p-3 font-black">Foco</th><th class="p-3 font-black">Regra e uso</th><th class="p-3 font-black">Como decidir</th></tr></thead><tbody class="divide-y divide-slate-100">${reviewTableRows(items)}</tbody></table></div>`;
    }

    function reviewGamePairs(items) {
        return items.map((item, index) => ({ id: String(index), cue: `${item[0]}: ${item[1]}`, answer: item[2] }));
    }

    function a2MemoryPairs(lessonNumber, items) {
        const curated = {
            8: [
                ['I was cooking...', '...when the phone rang.'],
                ['Did you...', '...go to the meeting?'],
                ['The subway is...', '...faster than the bus.'],
                ['This is...', '...the busiest station in the city.'],
                ["We don't have...", '...much time before the meeting.'],
                ['There are...', '...a few seats left.']
            ],
            24: [
                ['Have you ever traveled alone?', 'Você já viajou sozinho?'],
                ['I have already booked the appointment.', 'Eu já marquei a consulta.'],
                ['She has gone to the pharmacy.', 'Ela foi à farmácia e ainda está lá.'],
                ['The clinic is across from the bank.', 'A clínica fica em frente ao banco.'],
                ['You should rest for a few days.', 'Você deveria descansar por alguns dias.'],
                ['I have had this cough since Monday.', 'Estou com esta tosse desde segunda-feira.']
            ]
        }[lessonNumber];
        if (!curated) return reviewGamePairs(items);
        return curated.map(([cue, answer], index) => ({ id: String(index), cue, answer }));
    }

    function renderA2ReviewGame(items, type, lessonNumber) {
        const pairs = type === 'memory' ? a2MemoryPairs(lessonNumber, items) : reviewGamePairs(items);
        if (type === 'memory') {
            const cards = pairs.map(pair => ({ ...pair, copy: pair.cue })).concat([...pairs].reverse().map(pair => ({ ...pair, copy: pair.answer })));
            return `<div class="v3-review-game" data-v3-memory-board><div class="v3-review-game-head"><div><strong>Memory Challenge</strong><span>Encontre a relação de sentido: começo e fim da frase ou inglês e tradução.</span></div><i class="fas fa-clone"></i></div><div class="v3-memory-grid">${cards.map(card => `<button type="button" class="v3-memory-card" data-v3-memory-card data-pair-id="${card.id}"><span class="v3-memory-cover"><i class="fas fa-question"></i></span><span class="v3-memory-copy">${escapeHtml(card.copy)}</span></button>`).join('')}</div><p class="v3-review-feedback" data-v3-game-feedback>Vire duas cartas por vez. Ao acertar, leia e amplie o par oralmente.</p></div>`;
        }
        if (type === 'matching') {
            return `<div class="v3-review-game" data-v3-match-board><div class="v3-review-game-head"><div><strong>Match the Cards</strong><span>Ligue cada situação à solução linguística adequada.</span></div><i class="fas fa-link"></i></div><div class="v3-match-grid"><div class="v3-match-column">${pairs.map(pair => `<button type="button" class="v3-match-option" data-v3-match-option data-side="left" data-pair-id="${pair.id}">${escapeHtml(pair.cue)}</button>`).join('')}</div><div class="v3-match-column">${[...pairs].reverse().map(pair => `<button type="button" class="v3-match-option" data-v3-match-option data-side="right" data-pair-id="${pair.id}">${escapeHtml(pair.answer)}</button>`).join('')}</div></div><p class="v3-review-feedback" data-v3-game-feedback>Comece por qualquer coluna.</p></div>`;
        }
        if (type === 'hangman') {
            return `<div class="v3-review-game"><div class="v3-review-game-head"><div><strong>Grammar Hangman</strong><span>Descubra a forma-alvo usando a situação como pista.</span></div><i class="fas fa-spell-check"></i></div><div class="v3-hangman-list">${pairs.map(pair => `<article class="v3-hangman-round" data-v3-hangman data-answer="${escapeHtml(pair.answer)}"><p class="v3-hangman-hint">${escapeHtml(pair.cue)}</p><div class="v3-hangman-mask" data-v3-hangman-mask>${escapeHtml([...String(pair.answer)].map(character => /[a-z]/i.test(character) ? '_' : character).join(' '))}</div><div class="v3-game-actions"><button type="button" class="v3-game-action" data-v3-hangman-action="letter">Revelar letra</button><button type="button" class="v3-game-action" data-v3-hangman-action="answer">Mostrar resposta</button></div></article>`).join('')}</div></div>`;
        }
        return `<div class="v3-review-game"><div class="v3-review-game-head"><div><strong>Sentence Builder</strong><span>Monte a resposta clicando nas palavras e depois produza uma nova versão.</span></div><i class="fas fa-cubes"></i></div><div class="v3-hangman-list">${pairs.map(pair => {
            const words = String(pair.answer).replace(/[?.!,]/g, '').split(/\s+/).filter(Boolean).reverse();
            return `<article class="v3-builder-round" data-v3-builder data-words=""><p class="v3-hangman-hint">${escapeHtml(pair.cue)}</p><div class="v3-builder-output" data-v3-builder-output>Monte a frase aqui.</div><div class="v3-builder-bank">${words.map(word => `<button type="button" class="v3-word-chip" data-v3-word-chip data-word="${escapeHtml(word)}">${escapeHtml(word)}</button>`).join('')}</div><div class="v3-game-actions"><button type="button" class="v3-game-action" data-v3-builder-reset>Recomeçar</button></div></article>`;
        }).join('')}</div></div>`;
    }

    function renderA2GrammarCards(review, items, offset = 0) {
        return `<div class="v3-review-grammar-grid">${items.map((item, index) => {
            const expanded = expandReviewFocus(item);
            const example = review.drills[(offset + index) % review.drills.length]?.[2] || 'Crie um exemplo ligado à sua rotina.';
            return `<article class="v3-review-grammar-card"><h3>${escapeHtml(expanded.name)}</h3><dl><div><dt>Ideia central</dt><dd>${escapeHtml(expanded.detail)}</dd></div><div><dt>Como decidir</dt><dd>${escapeHtml(expanded.extra)}</dd></div><div><dt>Exemplo recuperado</dt><dd class="v3-review-example">${escapeHtml(example)}</dd></div><div><dt>Teste oral</dt><dd>Explique por que essa forma funciona e contraste com uma alternativa possível.</dd></div></dl></article>`;
        }).join('')}</div>`;
    }

    function insertA2ReviewSlide(afterElement, title, eyebrow, heading, intro, body) {
        if (!afterElement) return null;
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.dataset.title = title;
        slide.innerHTML = `<div class="slide-heading text-center mb-7"><p class="lesson-panel-title">${escapeHtml(eyebrow)}</p><h2 class="text-4xl font-bold text-emerald-700">${escapeHtml(heading)}</h2><p class="text-slate-600 text-lg mt-3">${escapeHtml(intro)}</p></div><div class="max-w-4xl mx-auto">${body}</div>`;
        afterElement.insertAdjacentElement('afterend', slide);
        return slide;
    }

    function fillReviewLesson(data, review) {
        const gamePlan = {
            8: ['memory', 'builder'],
            16: ['matching', 'hangman'],
            24: ['hangman', 'memory'],
            32: ['builder', 'matching']
        }[data.number] || ['memory', 'matching'];
        const focusPairs = review.focus.map((item, index) => {
            const expanded = expandReviewFocus(item);
            return [expanded.name, expanded.detail, expanded.extra];
        });
        const grammarMidpoint = Math.ceil(review.focus.length / 2);
        setHtml('.slide[data-title="Intro & Dialogue"] .lesson-hero .max-w-3xl', `
            <p class="lesson-panel-title">Aula de revisão</p>
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4">${escapeHtml(review.title)}</h2>
            <p class="text-lg text-slate-600">Esta aula funciona como um circuito de treino: você revisa regras, corrige erros, traduz, fala e combina estruturas em situações novas.</p>
            <div class="grid md:grid-cols-3 gap-4 mt-6 text-left">
                <div class="lesson-panel p-4"><p class="font-black text-slate-900">1. Relembrar</p><p class="text-sm text-slate-600">Leia as regras curtas e veja o contraste entre formas parecidas.</p></div>
                <div class="lesson-panel p-4"><p class="font-black text-slate-900">2. Misturar</p><p class="text-sm text-slate-600">Resolva atividades que alternam estruturas sem avisar demais.</p></div>
                <div class="lesson-panel p-4"><p class="font-black text-slate-900">3. Produzir</p><p class="text-sm text-slate-600">Use as estruturas em fala, mini situações e respostas longas.</p></div>
            </div>
        `);
        setHtml('#intro-dialogue', renderIntroDialogue(data.title, data.bank));

        document.querySelector('.slide[data-title="Vocabulary Flashcards"] h2').textContent = `Station 1: ${gamePlan[0] === 'memory' ? 'Grammar Memory' : gamePlan[0] === 'matching' ? 'Connect the Ideas' : gamePlan[0] === 'hangman' ? 'Grammar Hangman' : 'Sentence Builder'}`;
        const reviewFlashcardsContainer = document.getElementById('flashcards-container');
        if (reviewFlashcardsContainer) reviewFlashcardsContainer.className = 'max-w-4xl mx-auto';
        setHtml('#flashcards-container', renderA2ReviewGame(focusPairs, gamePlan[0], data.number));

        document.querySelector('.slide[data-title="Deep Grammar"] h2').textContent = 'Station 2: Grammar Control Panel';
        const grammarSlide = document.querySelector('.slide[data-title="Deep Grammar"]');
        const grammarPartOneItems = review.focus.slice(0, grammarMidpoint);
        const grammarPartTwoItems = review.focus.slice(grammarMidpoint);
        setHtml('.slide[data-title="Deep Grammar"] .max-w-4xl', `${renderA2GrammarTable(grammarPartOneItems)}${renderA2GrammarCards(review, grammarPartOneItems, 0)}`);
        const grammarPartTwo = insertA2ReviewSlide(grammarSlide, 'Grammar Lab II', 'Grammar Lab · Parte 2', 'Contrastes, escolhas e erros previsíveis', 'Comece pela tabela comparativa. Em seguida, use cada explicação para justificar a escolha, antecipar um erro e criar um exemplo novo.', `${renderA2GrammarTable(grammarPartTwoItems)}${renderA2GrammarCards(review, grammarPartTwoItems, grammarMidpoint)}`);
        insertA2ReviewSlide(grammarPartTwo, 'Interactive Review Game', 'Game Lab', gamePlan[1] === 'memory' ? 'Jogo da memória em contexto' : gamePlan[1] === 'matching' ? 'Ligue as situações às respostas' : gamePlan[1] === 'hangman' ? 'Forca gramatical' : 'Construtor de frases', 'Resolva o jogo, justifique cada resposta e crie uma variação oral.', renderA2ReviewGame(review.drills.slice(0, 6), gamePlan[1], data.number));

        document.querySelector('.slide[data-title="Practice Activities"] h2').textContent = 'Station 3: Mixed Drill Board';
        setHtml('#practice-questions', `
            <div class="callout-note p-4 rounded-xl"><p class="font-bold">Modo review</p><p>As atividades misturam regras. Leia a frase inteira antes de escolher a estrutura.</p></div>
            ${renderReviewItems(review.drills)}
        `);

        document.querySelector('.slide[data-title="Oral Translation I"] h2').textContent = 'Station 4: Translation Relay';
        const reviewTranslations = [...review.translations];
        (data.bank.translations || []).forEach((item) => {
            if (reviewTranslations.length < 8 && item.pt && item.en) reviewTranslations.push([item.pt, item.en]);
        });
        setHtml('#oral-translation-1', reviewTranslations.map(([pt, en], index) => `
            <div class="activity-card p-5">
                <div class="flex flex-wrap items-center justify-between gap-3">
                    <p class="text-lg font-semibold text-slate-900"><span class="text-emerald-700 font-black">${index + 1}.</span> ${escapeHtml(pt)}</p>
                    ${revealButton(en)}
                </div>
                <p class="a2-answer hidden mt-3 p-3 rounded-lg bg-emerald-50 text-emerald-800 font-semibold"></p>
            </div>
        `).join(''));

        document.querySelector('.slide[data-title="Expressions & Phrasal Verbs"] h2').textContent = 'Station 5: Error Clinic';
        setHtml('#expressions-container', (review.errorClinic || []).map((item) => `
            <div class="activity-card p-6">
                <h3 class="text-xl font-black text-emerald-700">${escapeHtml(item[0])}</h3>
                <p class="text-slate-700 mt-3">${escapeHtml(item[1])}</p>
                ${revealButton(item[2])}
                <p class="a2-answer hidden mt-3 p-3 rounded-lg bg-emerald-50 text-emerald-800 font-semibold"></p>
            </div>
        `).join(''));

        document.querySelector('.slide[data-title="Mini Dialogues"] h2').textContent = 'Station 6: Role-play Missions';
        fillDialogues(data.bank);
        document.querySelector('.slide[data-title="Reading & Comprehension"] h2').textContent = 'Station 7: Case File Reading';
        fillReading(data.bank);
        document.querySelector('.slide[data-title="Oral Translation II"] h2').textContent = 'Station 8: One-Minute Oral Test';
        setHtml('#oral-translation-2', `
            <div class="callout-note p-4 rounded-xl"><p class="font-bold">Responda sem ler um roteiro.</p><p>Depois, revele apenas para comparar estrutura e clareza.</p></div>
            ${renderReviewItems((review.oralTest || []).concat((review.recap || []).slice(0, 3)))}
        `);
        document.querySelector('.slide[data-title="Music Moment"]')?.remove();
        setHtml('#homework-list', `
            <li class="block">
                <div class="font-black mb-2"><i class="fas fa-map-pin mr-2"></i>Escolha um foco para o homework:</div>
                <div class="grid gap-2">
                    ${review.focus.slice(0, 3).map((focus, index) => `<div class="bg-white/20 rounded-xl p-3"><strong>Foco ${index + 1}:</strong> ${escapeHtml(expandReviewFocus(focus).name)}</div>`).join('')}
                </div>
            </li>
            <li class="flex gap-3"><i class="fas fa-edit mt-1"></i> Reescreva 8 frases corrigindo erros dos tópicos revisados.</li>
            <li class="flex gap-3"><i class="fas fa-comment-dots mt-1"></i> Prepare um roteiro oral de 90 segundos usando pelo menos 3 estruturas revisadas para apresentar na próxima aula.</li>
            <li class="flex gap-3"><i class="fas fa-comments mt-1"></i> Crie um diálogo com 8 falas usando o foco escolhido e mais um conteúdo da revisão.</li>
        `);
    }

    function wireActions() {
        document.addEventListener('click', (event) => {
            const musicReveal = event.target.closest('[data-music-reveal]');
            if (musicReveal) {
                const answer = document.getElementById(musicReveal.getAttribute('aria-controls'));
                const placeholder = document.getElementById(musicReveal.dataset.placeholderId);
                if (!answer || !placeholder) return;

                const willReveal = answer.classList.contains('hidden');
                answer.classList.toggle('hidden', !willReveal);
                placeholder.classList.toggle('hidden', willReveal);
                musicReveal.setAttribute('aria-expanded', willReveal ? 'true' : 'false');
                musicReveal.setAttribute('aria-label', willReveal ? 'Ocultar resposta desta lacuna' : 'Revelar resposta desta lacuna');
                musicReveal.setAttribute('title', willReveal ? 'Ocultar resposta' : 'Revelar resposta');

                const icon = musicReveal.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-eye', !willReveal);
                    icon.classList.toggle('fa-eye-slash', willReveal);
                }
                return;
            }

            const reveal = event.target.closest('[data-a2-reveal]');
            if (reveal) {
                const card = reveal.closest('.activity-card') || reveal.parentElement;
                const answer = card?.querySelector('.a2-answer');
                if (answer) {
                    answer.textContent = reveal.dataset.a2Reveal;
                    answer.classList.toggle('hidden');
                }
                return;
            }

        });

        const finishButton = document.getElementById('finish-btn');
        if (finishButton && !finishButton.dataset.a2FinishWired) {
            finishButton.dataset.a2FinishWired = 'true';
            finishButton.addEventListener('click', async () => {
                const lessonNumber = getLessonNumber();
                finishButton.disabled = true;
                finishButton.innerHTML = 'Finalizando... <i class="fas fa-spinner fa-spin ml-2"></i>';

                if (typeof window.markLessonAsComplete === 'function') {
                    const saved = await window.markLessonAsComplete('a2-v3', lessonNumber);
                    if (saved) return;
                }

                window.location.href = 'a2-v3.html';
            });
        }
    }

    function hydrateLesson() {
        const data = getLessonData();
        const review = getReviewLesson(data.number);
        if (review) {
            fillReviewLesson(data, review);
            wireActions();
            return;
        }
        fillIntro(data);
        fillVocabulary(data.bank);
        fillGrammar(data);
        fillPractice(data.bank);
        fillTranslations(data.bank, '#oral-translation-1', false);
        fillExpressions(data.bank);
        fillDialogues(data.bank);
        fillReading(data.bank);
        fillTranslations(data.bank, '#oral-translation-2', true);
        fillMusic(data.bank);
        fillHomework(data);
        wireActions();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hydrateLesson);
    } else {
        hydrateLesson();
    }
}());
