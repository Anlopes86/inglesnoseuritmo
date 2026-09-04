const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const conversationDir = path.join(root, 'conversation');
const dataPath = path.join(conversationDir, 'conversation-lessons-01-48-data.js');
global.window = {};
require(dataPath);
const lessons = global.window.CONVERSATION_LESSONS_01_48;

// Hand-written examples, one set per lesson. These are intentionally explicit
// editorial decisions rather than topic-based fallback generation.
const curatedExamples = {
    1: [
        'Maya decided to shoot for the stars and apply to three international programs.',
        'Opening a neighborhood bakery has been a lifelong dream for my father.',
        'Her plan to study abroad finally began to come true after two years of saving.',
        'I need to set a goal I can measure before the end of this month.',
        'He left a secure position to chase a dream of designing accessible games.',
        'Seeing my name on the published book was beyond my wildest dreams.'
    ],
    2: [
        'You can fall for someone quickly and still take time to build trust.',
        'They were head over heels, but they did not ignore their different priorities.',
        'After ten years together, they decided to tie the knot in a small ceremony.',
        'Jordan planned to pop the question during the trip where they first met.',
        'My grandparents seem like a match made in heaven, although they disagree often.',
        'I used to have a crush on a classmate who always made me laugh.'
    ],
    3: [
        'The musicians chose to rebel against something they considered unfair.',
        'It can be difficult to stand up for your beliefs when your friends disagree.',
        'Cycling alone through the countryside gives me a real sense of freedom.',
        'She refused to break the rules until she understood who the rule protected.',
        'Good journalists question authority while checking their evidence carefully.',
        'His decision to go against the grain made the campaign memorable.'
    ],
    4: [
        'I enjoy the hustle and bustle downtown, but only for a few hours.',
        'After a noisy week, we drove outside the city for some peace and quiet.',
        'The lower cost of living made the smaller town attractive to the family.',
        'Remote work changed her pace of life because she no longer rushed to commute.',
        'The park feels like an island of green inside the concrete jungle.',
        'We booked a cabin for the weekend to get away from it all.'
    ],
    5: [
        'A dependable friend will have someone\'s back without defending harmful behavior.',
        'When the audition went badly, Priya needed a shoulder to cry on.',
        'They stayed close through thick and thin, including two moves abroad.',
        'We hit it off while waiting for the same delayed flight.',
        'To be there for someone can mean listening instead of offering advice.',
        'Two close friends may drift apart when neither makes time to reconnect.'
    ],
    6: [
        'I had to face a challenge when my presentation software stopped working.',
        'Nora rose to the occasion and calmly led the team through the emergency.',
        'His coach said never give up, but also taught him when to change strategy.',
        'Losing that client was a blessing in disguise because we improved the service.',
        'A useful review helps people learn from their mistakes without feeling humiliated.',
        'She needed several quiet weeks to bounce back after the failed project.'
    ],
    7: [
        'We plan to hit the road before sunrise to avoid holiday traffic.',
        'Her wanderlust grew after she started exchanging postcards with people abroad.',
        'A local guide took us off the beaten path to a family-run workshop.',
        'Working from another town for a week gave me a welcome change of scenery.',
        'If we travel light, we can use trains instead of checking large bags.',
        'Seeing the northern lights would be a once-in-a-lifetime trip for me.'
    ],
    8: [
        'A nine-to-five job suits him because he values a predictable evening routine.',
        'She does not want to climb the corporate ladder if it means managing people.',
        'Without training or promotion prospects, the role began to feel like a dead-end job.',
        'Turning off work notifications after six improved my work-life balance.',
        'Being your own boss offers freedom, but every difficult decision is yours.',
        'People can burn out when urgent requests become the normal workload.'
    ],
    9: [
        'During the commute, everyone seemed to be glued to a screen.',
        'Instant messaging is a double-edged sword: it helps coordination but interrupts focus.',
        'I felt information overload after opening ten articles about the same event.',
        'She began to scroll endlessly whenever a task made her anxious.',
        'FOMO pushed him to attend an event he did not actually enjoy.',
        'Our family tried a digital detox during dinner for one full week.'
    ],
    10: [
        'I was on cloud nine when the rescue center approved my adoption application.',
        'A slow breakfast with my family is one of the simple things in life I value most.',
        'Volunteering helped her find her purpose after a difficult career change.',
        'On holiday, I try to live in the moment instead of photographing everything.',
        'Writing down three good moments helps me count my blessings on stressful days.',
        'For him, the temporary job was a means to an end while he completed his course.'
    ],
    11: [
        'The unexplained footsteps in the empty hallway sent shivers down my spine.',
        'The missing painting remains an unsolved mystery in the town museum.',
        'My aunt claims to have a sixth sense about when relatives will call.',
        'I had a gut feeling that the apparently perfect offer contained a hidden condition.',
        'The science presenter used a simple experiment to debunk a myth about the Moon.',
        'Every school seems to have an urban legend about a locked room.'
    ],
    12: [
        'An old photo album took us on a trip down memory lane after dinner.',
        'My uncle calls his university years the good old days, although he worked constantly.',
        'Learning to ride a bicycle with my sister became a core memory.',
        'I have a vague memory of the house, but I clearly remember its garden.',
        'The sound of the crowd at my first concert is etched in my memory.',
        'When I look back on that mistake, I notice how much my priorities changed.'
    ],
    13: [
        'The manager seemed to get away with murder because nobody challenged his behavior.',
        'After doing time, the applicant wanted employers to consider his recent record.',
        'Security caught the employee red-handed while removing confidential files.',
        'Investigators suspected an inside job because the alarm code had been used.',
        'A supervisor must not turn a blind eye to evidence of harassment.',
        'The documentary asks whether the long arm of the law reaches every community equally.'
    ],
    14: [
        'As a foodie, Lena plans trips around markets rather than famous landmarks.',
        'I have a sweet tooth, so I share dessert instead of ordering two.',
        'The restaurant offered a simple tasting plate for the picky eater in our group.',
        'Rice and beans are comfort food for me because they remind me of home.',
        'The company tried to wine and dine the visiting clients at a local restaurant.',
        'My mouth is watering just from the smell of bread leaving the oven.'
    ],
    15: [
        'The actor worked for years before she finally began to make it.',
        'We learned the hard way that a verbal agreement was not enough.',
        'He felt on top of the world after completing his first marathon.',
        'The interview showed that she had what it takes to lead the project.',
        'The business hit rock bottom before the owners asked customers what was wrong.',
        'Launching without a budget or user test would be a recipe for disaster.'
    ],
    16: [
        'The hospital is testing a cutting-edge tool that still requires a doctor\'s review.',
        'Reliable real-time translation could be a game-changer for emergency services.',
        'The team had to think outside the box when the obvious solution excluded some users.',
        'Remote collaboration created a paradigm shift in how the company hires talent.',
        'With cheap access to powerful tools, the sky is the limit for small creative teams.',
        'Using facial recognition everywhere could open a can of worms about privacy.'
    ],
    17: [
        'Mina is a quick study, so she learned the booking system in one afternoon.',
        'I picked up basic Italian by talking with customers at the café.',
        'Before the interview, he brushed up on the spreadsheet skills he had not used recently.',
        'Through trial and error, we found a revision routine that actually worked.',
        'The timeline helped the class connect the dots between three historical events.',
        'Building a small robot gave the students hands-on learning they could remember.'
    ],
    18: [
        'Our guide was a force of nature who kept everyone calm during the storm.',
        'The office felt like the law of the jungle until clear promotion rules were introduced.',
        'The children went wild when the rescued turtles were released.',
        'After finishing her exams, she felt as free as a bird for the first time in months.',
        'The twins\' different habits reopened the nature-versus-nurture debate in the family.',
        'We cannot see the forest for the trees if we protect one species but ignore its habitat.'
    ],
    19: [
        'I become a couch potato during long tournaments unless I schedule a walk.',
        'The captain asked one simple question to get the ball rolling at the team meeting.',
        'The two runners were neck and neck until the final ten meters.',
        'Our goalkeeper went the extra mile by helping younger players after practice.',
        'Even after a disputed call, she was a good sport and congratulated the winner.',
        'The team refused to throw in the towel after conceding an early goal.'
    ],
    20: [
        'I stick to a routine by preparing my running shoes the night before.',
        'My brother is a creature of habit who orders the same lunch every Friday.',
        'After the holiday, it took a week to get into the swing of things at work.',
        'I fell off the wagon during a stressful week, then restarted without blaming myself.',
        'Poor sleep and extra caffeine created a vicious cycle that affected her concentration.',
        'Old habits die hard, so he replaced the cue instead of relying on willpower alone.'
    ],
    21: [
        'After receiving a scholarship, Ana wanted to give back by mentoring new students.',
        'The local charity publishes exactly how each donation is spent.',
        'One hour of weekly tutoring can make a difference to a child\'s confidence.',
        'Our fundraising dinner covered the shelter\'s veterinary costs for a month.',
        'Housing insecurity is a social issue that no single organization can solve alone.',
        'The recycling campaign became a grassroots movement led by neighborhood volunteers.'
    ],
    22: [
        'For me, the quiet portrait is a masterpiece because every detail supports its mood.',
        'The designer had to think out of the box to make the exhibition accessible without stairs.',
        'The café\'s warm lighting is part of its aesthetics, not just decoration.',
        'A walk through the market can spark creativity when my ideas feel repetitive.',
        'The student exhibition included sketches so visitors could see the process.',
        'The museum used state-of-the-art projection while keeping the original objects central.'
    ],
    23: [
        'Our monthly budget includes rent, food, transport, savings, and a small amount for fun.',
        'Freelance income changes each month, so Priya plans from a conservative estimate.',
        'We could afford the course after comparing installments and cutting one subscription.',
        'He transfers a fixed amount to his savings account on payday.',
        'Paying only the minimum made the credit-card debt grow for another year.',
        'Before choosing an investment, she checked the fees, risk, and time horizon.'
    ],
    24: [
        'I commute twice a week and use the train time to read rather than answer messages.',
        'Unclear priorities and constant overtime pushed the whole team toward burnout.',
        'Her weekend photography side hustle now pays for new equipment.',
        'The contract states that overtime must be approved and compensated.',
        'He decided to quit only after calculating six months of essential expenses.',
        'Being called a workaholic stopped sounding positive when she missed every family dinner.'
    ],
    25: [
        'The report revealed its bias by quoting only people who supported one explanation.',
        'My feed became an echo chamber because I followed accounts with almost identical views.',
        'The dramatic clickbait headline promised a discovery the article never described.',
        'Before sharing the image, Leo fact-checked its date and original source.',
        'A partisan commentator may still cite facts, but the framing deserves careful attention.',
        'Local reporters acted as a watchdog by tracking how public funds were spent.'
    ],
    26: [
        'I jumped to conclusions when I assumed her short reply meant she was angry.',
        'A good facilitator reads the room before extending a difficult discussion.',
        'Try to put yourself in someone\'s shoes before calling their reaction unreasonable.',
        'I overthink it when I rewrite a simple message five times.',
        'He kept his cool when the customer blamed him for a system error.',
        'Joining an improvisation class pushed me to step out of my comfort zone.'
    ],
    27: [
        'The scientist\'s legacy includes both her discoveries and the students she mentored.',
        'The peaceful transfer of power became a turning point in the country\'s history.',
        'As the legal heir, she inherited the letters but donated them to an archive.',
        'Researchers used new imaging to study the ancient manuscript without opening it.',
        'The first public election was a milestone, although many people still could not vote.',
        'The reform had an unexpected outcome because local communities adapted it differently.'
    ],
    28: [
        'The doctor faced a dilemma between respecting privacy and preventing immediate harm.',
        'She showed integrity by reporting the error before anyone else discovered it.',
        'Anonymous altruism can help others without creating public recognition.',
        'A transparent system keeps decision-makers accountable for the consequences.',
        'Patience becomes a virtue when a quick answer would ignore important evidence.',
        'The whistleblower documented the safety problem before contacting an independent authority.'
    ],
    29: [
        'The new telescope is light-years ahead of the model our school used ten years ago.',
        'Reusable rockets represent a giant leap only if they also reduce cost and waste.',
        'Scientists explore the unknown by turning broad curiosity into testable questions.',
        'The agency will launch a mission to collect samples from the asteroid.',
        'A crewed trip to another star is a long shot with today\'s technology.',
        'The engineer brought the debate down to Earth by explaining the actual budget.'
    ],
    30: [
        'Wide-leg trousers became a trend again after appearing in several street-style videos.',
        'She paired a vintage jacket from her grandmother with modern shoes.',
        'A sustainable wardrobe begins with wearing and repairing what you already own.',
        'His interview outfit felt professional without hiding his personal style.',
        'A tailored jacket can fit well without being expensive or formal.',
        'Thrifting helped us find costumes while keeping the project under budget.'
    ],
    31: [
        'That dance challenge was the flavor of the month and disappeared by summer.',
        'The director brought a niche comic style into a mainstream family film.',
        'Opera is not my cup of tea, but I enjoyed learning how the production works.',
        'We decided to binge-watch only two episodes instead of losing the whole Sunday.',
        'The neighborhood festival is a melting pot of food, music, and family traditions.',
        'Her podcast found a loyal niche among people who restore old cameras.'
    ],
    32: [
        'It is kinder to end a conversation clearly than to ghost someone after several dates.',
        'Before booking the trip, they checked that they were on the same page about money.',
        'The couple went through a rough patch when both changed jobs at once.',
        'I clicked with Sam because our conversation moved easily from jokes to serious topics.',
        'They do not always see eye to eye, but they explain disagreement respectfully.',
        'Calling someone a soulmate can feel romantic, but compatibility still takes work.'
    ],
    33: [
        'I grew up near the coast, so the smell of the sea still feels familiar.',
        'As a child, I looked up to my aunt because she treated every question seriously.',
        'My grandfather is a child at heart whenever the family plays board games.',
        'The novel is a coming-of-age story about learning when to ask for help.',
        'At thirteen, I changed how I spoke because I desperately wanted to fit in.',
        'My skateboarding obsession was not just a phase; I still practice on weekends.'
    ],
    34: [
        'The video presents a conspiracy theory but never identifies a verifiable source.',
        'Deleting the meeting notes looked like a cover-up rather than a simple mistake.',
        'A careful reader should question everything, including claims that flatter their own beliefs.',
        'The explanation sounds far-fetched because it requires hundreds of people to stay silent.',
        'Our town has an urban legend about a train that stops at an abandoned platform.',
        'Do not spread a rumor just because the story is dramatic and easy to repeat.'
    ],
    35: [
        'That album became the soundtrack of my life during my first year away from home.',
        'The song\'s description of starting again really hit home after my career change.',
        'I get goosebumps when the audience joins the final chorus at a concert.',
        'This energetic playlist is my favorite mood booster on a difficult morning.',
        'Teenagers often relate to songs that describe feelings adults dismiss too quickly.',
        'The songwriter helped me put feelings into words that I had avoided discussing.'
    ],
    36: [
        'For me, aging gracefully means adapting without pretending every change is easy.',
        'I had a senior moment and searched for the glasses already on my head.',
        'The advertisement treats everyone over forty as over the hill, which is absurd.',
        'My neighbor is young at heart and learns a new dance every year.',
        'After surgery, he chose to slow down without giving up the activities he loves.',
        'A well-designed public space can stand the test of time for several generations.'
    ],
    37: [
        'She used a concrete example to get her point across during the meeting.',
        'Frequent messages followed by long silence gave me mixed signals about the plan.',
        'A little small talk helped the new colleague feel included before the workshop.',
        'We were on the same wavelength and reached a decision without a long explanation.',
        'To read between the lines, consider what the email avoids saying directly.',
        'The joke was lost in translation because the wordplay had no equivalent in Portuguese.'
    ],
    38: [
        'The national team was on a winning streak until it faced the defending champion.',
        'Even as substitutes, the players gave it their all during every training session.',
        'Revenue-sharing rules could level the playing field for clubs from smaller markets.',
        'A penalty in the final minute created a nail-biting finish.',
        'The captain took defeat gracefully and thanked the supporters before leaving.',
        'A semifinal between historic rivals will raise the stakes for players and fans.'
    ],
    39: [
        'My first manager became a role model because she admitted mistakes publicly.',
        'The actor used his platform to stand up for safer working conditions.',
        'The night nurse was the unsung hero of the family\'s difficult week.',
        'Parents lead by example when they apologize instead of demanding perfection.',
        'Her free community classes left a positive mark long after the project ended.',
        'The film turns an ordinary athlete into a larger-than-life symbol.'
    ],
    40: [
        'I saved room for dessert because the restaurant is famous for its lemon tart.',
        'Following the recipe was a piece of cake once we measured everything first.',
        'Take viral nutrition advice with a grain of salt until you check the source.',
        'The chef\'s comments about food waste gave the class food for thought.',
        'Catering is her bread and butter, while cake decoration is a creative side project.',
        'We bit off more than we could chew by cooking six new dishes for one dinner.'
    ],
    41: [
        'The twenty-page menu gave me choice overload before I reached the main dishes.',
        'We weighed the pros and cons of moving closer to work or staying near family.',
        'After booking the hotel, I second-guessed the decision whenever I saw another offer.',
        'By Friday evening, decision fatigue makes even choosing dinner feel difficult.',
        'Three priorities helped us narrow the apartment search down to two options.',
        'A good-enough phone can be wiser than paying twice as much for rarely used features.'
    ],
    42: [
        'The trial pushes the boundaries of treatment, so independent oversight is essential.',
        'Constant health tracking can be a mixed blessing: useful insight may become anxiety.',
        'Critics accuse researchers of playing God when edits could affect future generations.',
        'The clinic works at the cutting edge of prosthetic design.',
        'Clear consent rules keep commercial pressure in check during experimental treatment.',
        'Allowing enhancement for one condition could become a slippery slope toward social pressure.'
    ],
    43: [
        'Let me set the scene: the last train had left, and my phone had one percent battery.',
        'The writer builds suspense by revealing one contradiction at a time.',
        'The final photograph creates a plot twist without contradicting the earlier clues.',
        'A relatable character can make a fantastic world feel emotionally believable.',
        'Short chapters and unanswered questions keep the reader hooked.',
        'The moral of the story is not stated, so each listener interprets the ending differently.'
    ],
    44: [
        'We binge-watched the miniseries because every episode ended with a new question.',
        'The season closes on a cliffhanger just as the detective opens the letter.',
        'A supporting actor can steal the show with only a few memorable scenes.',
        'The studio expected a blockbuster, but audiences preferred the smaller drama.',
        'The documentary shows the costume team working behind the scenes.',
        'Spoiler alert: the trailer reveals a character who was supposed to be a surprise.'
    ],
    45: [
        'A community-run café became the hidden gem of our weekend trip.',
        'Saving for one meaningful journey helped her satisfy her wanderlust responsibly.',
        'The small guesthouse felt like a home away from home because the hosts knew the area.',
        'We saw the sights early, then spent the afternoon at a neighborhood market.',
        'For a three-day rail trip, I pack the essentials in one small backpack.',
        'The station was a stone\'s throw away from the apartment, so we did not need a taxi.'
    ],
    46: [
        'The team reused the proven checkout system instead of reinventing the wheel.',
        'A lightbulb moment came when we watched a child struggle with the package.',
        'The first prototype leaked, so it was back to the drawing board.',
        'We dreamed up an idea for an umbrella stand that sends a reminder before you leave.',
        'The low-cost water filter could break new ground in emergency response.',
        'After two guided attempts, my grandmother got the hang of the video-call app.'
    ],
    47: [
        'He cracked a joke to welcome the nervous speaker, then gave her the floor.',
        'The side character provides comic relief without making the serious conflict disappear.',
        'Our inside joke makes no sense until you hear the story of the missed train.',
        'The audience understood the setup, but the punchline arrived too late.',
        'She tried to laugh the mistake off, then realized an apology was still necessary.',
        'A flexible sense of humor helps when a joke does not translate across cultures.'
    ],
    48: [
        'Disposable plastic cards may become a thing of the past in many cities.',
        'Four-day workweeks could become the norm if trials continue to show good results.',
        'Affordable home batteries may be just around the corner, but access still matters.',
        'Robots may take over dangerous inspections while people handle judgment and repair.',
        'A resilient city should not rely on one digital system for essential services.',
        'A hotel on the Moon sounds far-fetched until we compare it with earlier predictions.'
    ]
};

function discussionContext(title, kicker, intro, prompt, cardTexts, icon = 'fa-comments') {
    return {
        title,
        kicker,
        intro,
        prompt,
        cards: cardTexts.map(([cardTitle, text]) => ({ title: cardTitle, text })),
        icon
    };
}

function setQuestions(lessonNumber, questionSets) {
    questionSets.forEach((questions, songIndex) => {
        lessons[lessonNumber].songs[songIndex].questions = questions;
    });
}

function applySensitiveLessonPolish() {
    Object.assign(lessons[20].songs[1], {
        title: 'Man in the Mirror - 2012 Remaster',
        artist: 'Michael Jackson',
        spotifyId: '3c7Ctlw9MKlIQPxRH3fOTt',
        sourceEmbed: 'https://open.spotify.com/embed/track/3c7Ctlw9MKlIQPxRH3fOTt',
        angle: 'The performance connects personal self-examination with the decision to change repeated behavior.',
        discussionTitle: 'Self-examination before lasting change'
    });
    Object.assign(lessons[44].songs[0], {
        title: 'Circle of Life',
        artist: 'Carmen Twillie, Lebo M.',
        spotifyId: '0H2960m5fFKxfEsOvJgI3W',
        sourceEmbed: 'https://open.spotify.com/embed/track/0H2960m5fFKxfEsOvJgI3W',
        angle: 'An opening number can establish a fictional world, its scale, and its central ideas before the plot begins.',
        discussionTitle: 'How a soundtrack builds a fictional world',
        questions: [
            'Which film opening immediately pulls you into its world, and what creates that effect?',
            'How do soundtracks help stories travel across languages and generations?',
            'What matters most in an opening sequence: music, visual scale, character, or information, and why?',
            'Hot take: a memorable soundtrack can make an ordinary film seem culturally important. How would you test that claim?'
        ]
    });
    setQuestions(13, [
        [
            'Have you ever disagreed with a rule but still followed it? What influenced your choice?',
            'How can a justice system consider financial pressure without removing individual responsibility?',
            'Which priority should consequences emphasize most: deterrence, repair, or rehabilitation, and why?',
            'Hot take: breaking a law can be morally defensible when the law itself is unjust. What evidence would you need before agreeing?'
        ],
        [
            'When have you seen someone keep going after repeated setbacks?',
            'What barriers can make it difficult to rebuild trust and stability after a conviction?',
            'How far should employers and communities go in offering a genuine second chance?',
            'Hot take: after a sentence is completed, most legal and social restrictions should end. What trade-off does that create?'
        ],
        [
            'How do you react when new evidence challenges a story that once seemed certain?',
            'Which safeguard best reduces wrongful convictions: independent review, legal representation, transparent evidence, or another?',
            'What useful role can journalism or art play in questioning a case, and where can it distort public judgment?',
            'Hot take: a slower but more careful justice process is preferable to a faster one. When might that be unfair?'
        ]
    ]);
    lessons[13].contexts = [
        discussionContext('Justice in Context', 'Separate explanation from excuse.', 'A court is reviewing a non-violent case involving financial pressure, conflicting evidence, and harm to another person.', 'How should context, responsibility, repair, and public safety influence the response?', [['Context', 'Identify relevant circumstances without assuming they determine the verdict.'], ['Responsibility', 'Clarify the person\'s choices and the harm caused.'], ['Repair', 'Propose a realistic way to address the harm.'], ['Safeguard', 'Name one protection against an unfair decision.']], 'fa-scale-balanced'),
        discussionContext('A Genuine Second Chance', 'Role-play a difficult hiring decision.', 'An applicant has completed a sentence, meets the job requirements, and is asking to be judged on current evidence.', 'What information is relevant, what boundaries are fair, and how would you explain the decision?', [['Applicant', 'Explain the evidence of change without demanding automatic trust.'], ['Employer', 'Ask job-relevant questions and avoid stereotypes.'], ['Community', 'Consider reintegration and public confidence.'], ['Decision', 'State a fair condition and justify it.']], 'fa-handshake')
    ];
    lessons[13].homework = { task: 'Write a balanced response to a justice case. Explain the context, individual responsibility, one safeguard, and one constructive consequence.', model: 'The court should not turn a blind eye to the harm, but due process matters. A fair response can require accountability while still allowing rehabilitation.', requiredExpressions: ['To turn a blind eye', 'The long arm of the law'] };

    setQuestions(16, [
        ['Which task in your week would you automate, and which would you keep human?', 'How can a workplace pursue productivity without creating a constant faster-is-better culture?', 'Which human-centered measure should matter alongside speed and output?', 'Hot take: efficiency gains are not progress if workers lose meaningful autonomy. Do you agree?'],
        ['Have you ever felt understood by a digital tool? What created that impression?', 'If an AI simulates empathy, who is accountable when its advice causes harm?', 'What criteria would convince you that emotional language shows genuine understanding?', 'Hot take: AI should never have the final say in healthcare or hiring. Where would you draw the line?'],
        ['Which app permission makes you pause, and what information would help you decide?', 'How can organizations use AI monitoring without turning useful oversight into surveillance?', 'When is convenience worth sharing personal data, and what protection would you require?', 'Hot take: every consequential automated decision should offer a meaningful human review. Is that practical?']
    ]);
    lessons[16].contexts = [
        discussionContext('AI at Work', 'Negotiate an automation proposal.', 'A team can automate a repetitive task, but the tool may also increase monitoring and change two people\'s roles.', 'What should be automated, what should remain human, and what protections belong in the plan?', [['Benefit', 'Name a measurable improvement beyond speed.'], ['Risk', 'Identify an effect on autonomy, privacy, or skills.'], ['Boundary', 'Set one task the system cannot decide alone.'], ['Review', 'Define when a person can challenge the result.']], 'fa-robot'),
        discussionContext('A High-Stakes Decision', 'Design responsible human oversight.', 'An organization wants AI to screen candidates for an important opportunity.', 'How would you test fairness, explain decisions, and create a genuine appeal?', [['Designer', 'Explain what evidence the system uses.'], ['Candidate', 'Ask for a clear reason and correction route.'], ['Reviewer', 'Check outcomes for unequal patterns.'], ['Policy', 'Decide who remains accountable.']], 'fa-user-shield')
    ];
    lessons[16].homework = { task: 'Propose one responsible use of AI in work or daily life. Include a benefit, a risk, a human boundary, and a review process.', model: 'Automating routine scheduling could be a game-changer, but giving software the final decision would open a can of worms. A person should review disputed results.', requiredExpressions: ['Game-changer', 'To open a can of worms'] };

    setQuestions(24, [
        ['What would make you leave a job even without another offer?', 'How should a worker respond when work repeatedly harms sleep or mental health?', 'What would a sustainable new foundation for a career look like for you?', 'Hot take: quitting can be a responsible career decision, not a failure. What conditions make that true?'],
        ['What does taking care of business mean when no manager is watching?', 'Is overtime more often commitment, poor planning, or an unrealistic workload?', 'Which boundary helps remote work remain flexible without becoming always-on work?', 'Hot take: remote workers should be evaluated by results, not online visibility. What could go wrong?'],
        ['When does a side hustle create freedom, and when can it become a second source of burnout?', 'How do platform ratings and unpredictable demand affect a freelancer\'s choices?', 'Which protection should gig workers receive without losing useful flexibility?', 'Hot take: convenience for customers often depends on hidden insecurity for workers. How could a platform respond?']
    ]);
    lessons[24].contexts = [
        discussionContext('A Freelance Contract', 'Negotiate clarity before accepting a gig.', 'A platform offers flexible work, but payment timing, cancellation rules, and ownership of the work are unclear.', 'Which terms must change before the offer becomes fair?', [['Pay', 'Set the rate, deadline, and late-payment rule.'], ['Scope', 'Define what is included and how revisions work.'], ['Cancellation', 'Decide who absorbs last-minute costs.'], ['Ownership', 'Clarify who may reuse the finished work.']], 'fa-file-contract'),
        discussionContext('Remote or Hybrid?', 'Balance flexibility, collaboration, and wellbeing.', 'A small team is redesigning its work policy after complaints about commuting and always-on messaging.', 'What schedule and communication boundaries would you recommend?', [['Focus', 'Protect uninterrupted work time.'], ['Teamwork', 'Choose when being together adds value.'], ['Access', 'Consider different homes, needs, and commutes.'], ['Boundary', 'Set a clear rule for messages outside work hours.']], 'fa-house-laptop')
    ];
    lessons[24].homework = { task: 'Design a fair work arrangement for a freelancer or remote employee. Include pay or schedule, communication boundaries, and one protection against burnout.', model: 'Reducing the commute can help, but remote work should not turn every evening into overtime. Clear response hours protect both flexibility and wellbeing.', requiredExpressions: ['To commute', 'Overtime'] };

    setQuestions(25, [
        ['When has a headline shaped your first impression before you read the full story?', 'Can media bias appear through selection and framing even when every stated fact is accurate?', 'Which evidence would you check before sharing a provocative political claim?', 'Hot take: emotionally charged headlines reduce public understanding even when they increase attention. Do you agree?'],
        ['Why do dramatic claims often travel farther than careful corrections?', 'How should responsibility for misinformation be shared among sources, platforms, and users?', 'What warning sign makes you stop and fact-check a post?', 'Hot take: platforms should slow the sharing of unverified viral claims. What benefit and risk would that create?'],
        ['How can privilege influence which experiences receive media attention?', 'What is the difference between reporting inequality and using it only to provoke outrage?', 'How would you compare two sources that frame the same event differently?', 'Hot take: a neutral tone does not guarantee neutral reporting. Which choices still reveal a perspective?']
    ]);
    lessons[25].contexts = [
        discussionContext('Check Before You Share', 'Trace a claim to its evidence.', 'Two posts describe the same public event with different headlines, cropped images, and unnamed sources.', 'Which checks would help you decide what is reliable without assuming either side is correct?', [['Source', 'Find the original report, document, or recording.'], ['Context', 'Check what appears before and after the quoted material.'], ['Corroboration', 'Compare independent reporting and primary evidence.'], ['Language', 'Notice emotional framing and unsupported certainty.']], 'fa-magnifying-glass'),
        discussionContext('Inside the Recommendation Feed', 'Examine an algorithmic trade-off.', 'A platform can maximize engagement or diversify the viewpoints and sources shown to each person.', 'How should it balance relevance, user choice, safety, and exposure to different evidence?', [['User', 'Choose what control and explanation you would want.'], ['Platform', 'Explain the objective being optimized.'], ['Journalist', 'Protect context and source visibility.'], ['Trade-off', 'Name one benefit and one unintended effect.']], 'fa-diagram-project')
    ];
    lessons[25].homework = { task: 'Choose one current headline and fact-check it. Identify the original source, one framing choice, one corroborating source, and what remains uncertain.', model: 'The headline may be clickbait because it overstates the evidence. To fact-check it, I would compare the original document with independent reporting.', requiredExpressions: ['Clickbait', 'To Fact-check'] };

    const cleanSong = lessons[35].songs[1];
    cleanSong.title = 'Forget You';
    cleanSong.sourceEmbed = 'https://open.spotify.com/embed/track/4TkgS6YXKZs37syf8v4p6O';
    cleanSong.spotifyId = '4TkgS6YXKZs37syf8v4p6O';
    cleanSong.angle = 'Forget You offers a radio-clean listening lens for expressing anger, boundaries, and recovery after rejection.';
    cleanSong.discussionTitle = 'Forget You: anger, boundaries, and moving forward';
    cleanSong.questions = ['When can music help someone express anger without directing it at another person?', 'Why do energetic break-up songs sometimes feel more empowering than sad ones?', 'How does a clean edit change the tone or audience of a song?', 'Hot take: expressing anger is healthiest when it leads to a clear boundary or next step. Do you agree?'];
    lessons[35].contexts[1] = discussionContext('The Playlist Boundary', 'Choose what belongs in a shared space.', 'You are creating a playlist for a mixed-age event. A powerful song fits the mood, but its original version contains explicit language.', 'Would you use a clean edit, choose another song, or change the setting, and what trade-off supports your choice?', [['Audience', 'Consider age, context, and expectations.'], ['Artist', 'Discuss whether an edit changes the intended expression.'], ['Organizer', 'Set a clear content standard.'], ['Choice', 'Defend the final playlist decision.']], 'fa-headphones');
    lessons[35].homework = { task: 'Write about one song that connects with your identity or a strong emotion. Explain the memory, the feeling, and why the song still matters.', model: 'This song is part of the soundtrack of my life because its message hits home whenever I face a difficult change.', requiredExpressions: ['Soundtrack of your life', 'To hit home'] };

    lessons[43].songs[2].questions = ['When has a person or situation challenged an assumption you did not realize you had?', 'How can a storyteller create surprise without treating someone\'s identity as a trick or punchline?', 'What does the narrator\'s uncertainty reveal about perspective and reliability?', 'Hot take: ambiguity can make a story richer, but it does not remove the need to discuss people respectfully. Do you agree?'];
    lessons[43].homework = { task: 'Write a 150-word story with a clear setting, one revealing detail, rising suspense, and a meaningful change in perspective.', model: 'Let me set the scene: the station was almost empty. I built suspense through the repeated announcement, then used a plot twist to change how the narrator understood the stranger.', requiredExpressions: ['To set the scene', 'To build suspense', 'Plot twist'] };

    setQuestions(45, [
        ['What does your personal idea of paradise include besides scenery?', 'When is travel a healthy break, and when can it become avoidance?', 'How do edited images and advertising shape expectations about famous destinations?', 'Hot take: protecting a place may require limiting the number of visitors. Who should decide?'],
        ['What would you be willing to give up for a meaningful trip?', 'How can a place name become a symbol rather than a realistic destination?', 'Would you choose a luxurious short trip or a simpler, longer journey? Why?', 'Hot take: the best travel memories often come from plans that did not work. Do you agree?'],
        ['Which destination have you first learned about through music or media?', 'How can media simplify a diverse continent or region, and how would you verify the picture it creates?', 'Which local sources or voices would help you plan a more responsible visit?', 'Hot take: tourism can support communities and damage them at the same time. What policy could improve the balance?']
    ]);
    lessons[45].contexts = [
        discussionContext('Build a Responsible Itinerary', 'Turn a travel dream into informed choices.', 'You are planning a visit to a place you mostly know through music, films, and social media.', 'Which local sources, cultural expectations, environmental limits, and spending choices should shape the plan?', [['Voices', 'Consult people and organizations based in the destination.'], ['Culture', 'Learn how to visit important places respectfully.'], ['Impact', 'Reduce waste, crowding, and avoidable disruption.'], ['Spending', 'Choose how more money can stay in the local community.']], 'fa-map-location-dot'),
        discussionContext('A Popular Place Under Pressure', 'Negotiate the cost of overtourism.', 'Residents depend on tourism income but face rising rents, congestion, and damage to shared spaces.', 'Which visitor limits, fees, or community protections would you support?', [['Resident', 'Name a daily-life impact that needs attention.'], ['Traveler', 'Explain what information and alternatives would help.'], ['Business', 'Protect livelihoods while reducing harm.'], ['Policy', 'Propose one measurable compromise.']], 'fa-people-group')
    ];
    lessons[45].homework = { task: 'Create a responsible three-day itinerary for a destination. Include one local source, one cultural consideration, one lower-impact choice, and one way to support local people.', model: 'I would look beyond the famous sights for a locally recommended hidden gem. The plan satisfies my wanderlust while respecting community limits.', requiredExpressions: ['A hidden gem', 'To satisfy one\'s wanderlust'] };

    lessons[47].contexts = [
        discussionContext('A Joke That Missed', 'Repair the moment without ending the conversation.', 'In a one-to-one conversation, a joke reduces tension for one person but makes the other feel dismissed.', 'How should each person explain their intention, impact, and boundary?', [['Speaker', 'Acknowledge impact without arguing that it was only a joke.'], ['Listener', 'Explain the boundary and what would help now.'], ['Repair', 'Choose an apology or clarification that fits.'], ['Next Time', 'Agree on a better way to use humor under stress.']], 'fa-face-smile'),
        discussionContext('Humor Across Contexts', 'Adapt a story for a different audience.', 'A funny story works among close friends but may not work with a colleague or someone from another culture.', 'Which details, assumptions, or punchline would you change, and why?', [['Relationship', 'Consider trust and shared history.'], ['Culture', 'Explain knowledge the joke assumes.'], ['Setting', 'Decide what is appropriate here.'], ['Alternative', 'Retell it without targeting a vulnerable person.']], 'fa-comments')
    ];
    lessons[47].homework = { task: 'Describe a moment when humor helped or failed. Explain the context, the impact, and how you would respond now.', model: 'I tried to crack a joke as comic relief, but it did not match the moment. I apologized instead of laughing the reaction off.', requiredExpressions: ['To crack a joke', 'Comic relief', 'To laugh something off'] };

    setQuestions(48, [
        ['Which object from daily life today might look ridiculous to someone in the year 3000?', 'Would living underwater solve a problem or mainly create new ones?', 'Which playful prediction helps us question a real habit today?', 'Hot take: future stories reveal more about the present than the future. What supports your view?'],
        ['When you imagine 2050, which feeling appears first, and what evidence influences it?', 'Which change would improve daily life most: cleaner energy, better healthcare, shorter workdays, or another?', 'Which major problem seems hardest to solve, and what smaller step is still possible?', 'Hot take: hopeful future stories are useful only when they point toward action. Do you agree?'],
        ['Which technological change in your lifetime has most altered an everyday routine?', 'The song connects technological progress with a painful historical memory. Why is it important to discuss both progress and unequal experience?', 'Can society call itself advanced if major benefits are not shared fairly?', 'Hot take: social progress is a better measure of the future than new devices. How would you measure it?']
    ]);
    lessons[48].homework = { task: 'Write a voice message from 2050 to someone living today. Describe one improved routine, one unresolved problem, and one choice people can make now.', model: 'By 2050, some repetitive chores have become a thing of the past, and shared clean transport has become the norm. However, access is still unequal, so today\'s choices matter.', requiredExpressions: ['A thing of the past', 'To become the norm'] };
}

applySensitiveLessonPolish();

function applyBenchmarkL31() {
    const lesson = lessons[31];
    lesson.songs[0].angle = 'The energetic arrangement links leisure with movement, discovery, and the feeling of becoming fully present.';
    lesson.songs[0].discussionTitle = 'Adventure, attention, and feeling alive';
    lesson.songs[0].questions = [
        'Which activity makes you feel fully alive rather than simply distracted, and why?',
        'Does your culture value active leisure more than quiet leisure, or the reverse? Give an example.',
        'Has constant phone access made it harder to unwind even during enjoyable activities?',
        'Hot take: leisure should sometimes take us outside our comfort zone instead of helping us relax. When is that true?'
    ];
    lesson.songs[1].angle = 'The relaxed sound contrasts financial loss with the ability to enjoy an ordinary afternoon.';
    lesson.songs[1].discussionTitle = 'Money, free time, and simple pleasures';
    lesson.songs[1].questions = [
        'Which free or inexpensive pleasure helps you unwind after a difficult week?',
        'How does income influence access to mainstream leisure such as travel, concerts, or streaming?',
        'Were people in earlier generations better at enjoying simple pleasures, or is that nostalgia?',
        'Hot take: doing nothing can be a valuable use of time. Where is the line between rest and avoidance?'
    ];
    lesson.songs[2].angle = 'The party setting creates a conflict between enjoying the present and protecting tomorrow\'s financial security.';
    lesson.songs[2].discussionTitle = 'Celebration, escape, and financial trade-offs';
    lesson.songs[2].questions = [
        'When has spending money on an experience felt genuinely worthwhile to you?',
        'Why is nightlife a mainstream symbol of fun even for people who do not enjoy it?',
        'Can a night out provide healthy recovery, or does it only postpone a problem? What makes the difference?',
        'Hot take: memorable experiences deserve priority over saving once basic needs are covered. What could this view underestimate?'
    ];
    lesson.contexts = [
        discussionContext('The Streaming Revolution', 'Redesign one evening of entertainment.', 'A family shares one television, three subscriptions, different tastes, and only two free hours together.', 'How would you choose something everyone can enjoy without spending the whole evening browsing?', [['Taste', 'Each person names one must-have and one flexible preference.'], ['Time', 'Set a limit for browsing before making the choice.'], ['Cost', 'Decide whether another subscription adds real value.'], ['Shared Moment', 'Protect conversation instead of treating the screen as background.']], 'fa-tv'),
        discussionContext('High Culture or Pop Culture?', 'Curate a public cultural weekend.', 'A community center has funding for one opera workshop, one mainstream film night, or several niche local performances.', 'Which program or mix should receive the budget, and how would you defend access, quality, and audience interest?', [['Audience', 'Identify who currently participates and who feels excluded.'], ['Value', 'Define quality without using popularity as the only measure.'], ['Access', 'Consider price, location, language, and familiarity.'], ['Pitch', 'Present a final two-event program and answer one objection.']], 'fa-palette')
    ];
    lesson.speaking = {
        title: 'Design Your Cultural Weekend',
        icon: 'fa-microphone-lines',
        prompts: [
            'Plan a Saturday that combines one mainstream activity and one niche interest without exhausting yourself.',
            'Tell the story of a cultural event that changed your expectations before, during, and after it.',
            'Recommend one series, exhibition, concert, or hobby to someone with different tastes and anticipate their objection.',
            'Defend a balance between screen-based entertainment and in-person cultural experiences in a busy week.'
        ],
        support: ['Flavor of the month', 'Mainstream', "It's not my cup of tea", 'Niche']
    };
    lesson.homework = {
        task: 'Plan a realistic cultural weekend with one shared activity, one niche interest, a budget, and time to unwind. Write 120–180 words.',
        model: 'On Saturday, I would visit a small photography exhibition because niche events often feel more personal. On Sunday, I would unwind by watching one mainstream film with my family instead of binge-watching a whole series.',
        requiredExpressions: ['Niche', 'Mainstream', 'Binge-watch']
    };
}

applyBenchmarkL31();

function decodeSourceText(value) {
    return String(value || '')
        .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&quot;|&#34;/gi, '"')
        .replace(/&#39;|&apos;/gi, "'")
        .replace(/&nbsp;/gi, ' ')
        .replace(/&ndash;|&#8211;/gi, '–')
        .replace(/&mdash;|&#8212;/gi, '—')
        .replace(/&hellip;|&#8230;/gi, '…')
        .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
        .replace(/\s+/g, ' ')
        .replace(/\s+([,.;!?])/g, '$1')
        .trim();
}

function sourceDivsByClass(html, className) {
    const stack = [];
    const blocks = [];
    const tags = /<\/?div\b[^>]*>/gi;
    let match;
    while ((match = tags.exec(html))) {
        if (/^<\/div/i.test(match[0])) {
            const start = stack.pop();
            if (start?.wanted) blocks.push({ index: start.index, html: html.slice(start.index, tags.lastIndex) });
            continue;
        }
        const classes = match[0].match(/class\s*=\s*["']([^"']*)["']/i)?.[1].split(/\s+/) || [];
        stack.push({ index: match.index, wanted: classes.includes(className) });
    }
    return blocks.sort((left, right) => left.index - right.index).map((block) => block.html);
}

function sourceTexts(html, pattern) {
    return [...String(html || '').matchAll(pattern)].map((match) => decodeSourceText(match[1])).filter(Boolean);
}

function sourceHeading(slide) {
    return sourceTexts(slide, /<h[1-4]\b[^>]*>([\s\S]*?)<\/h[1-4]>/gi)[0] || '';
}

// Restore authorial material from the committed lesson pages. Only descriptions,
// questions and homework prose are read; lyric containers are never copied.
function restoreCommittedEditorial() {
    for (let lessonNumber = 1; lessonNumber <= 48; lessonNumber += 1) {
        if (lessonNumber === 31) continue;
        const padded = String(lessonNumber).padStart(2, '0');
        const html = execFileSync('git', ['show', `HEAD:conversation/licao-${padded}.html`], { cwd: root, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
        const slides = sourceDivsByClass(html, 'slide');
        const musicSlides = slides.filter((slide) => /(?:song\s*[123]|music time)\s*:/i.test(sourceHeading(slide)) && !/debate|discussion|conversation/i.test(sourceHeading(slide)));
        musicSlides.slice(0, 3).forEach((slide, songIndex) => {
            const lessonSong = lessons[lessonNumber].songs[songIndex];
            const safeIntro = slide.split(/<div\b[^>]*class\s*=\s*["'][^"']*lyrics-box/i)[0];
            const paragraphs = [...safeIntro.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
                .filter((match) => !/<input\b|class\s*=\s*["'][^"']*(?:blank|answer-btn)|data-answer/i.test(match[1]))
                .map((match) => decodeSourceText(match[1]))
                .filter(Boolean);
            const description = paragraphs.find((text) => !/listen|complete|lyrics?|reveal|blank/i.test(text) && text.length >= 45 && text.length <= 500);
            if (description) lessonSong.angle = description;
            const position = slides.indexOf(slide);
            const debate = slides[position + 1] || '';
            const debateHeading = sourceHeading(debate);
            if (/debate|discussion|conversation/i.test(debateHeading)) {
                const debateParagraphs = sourceTexts(debate, /<p\b[^>]*>([\s\S]*?)<\/p>/gi);
                const label = debateParagraphs.find((text) => !text.endsWith('?') && text.length >= 12 && text.length <= 180);
                if (label) lessonSong.discussionTitle = label.replace(/^["'“]|["'”]$/g, '');
                const authoredQuestions = debateParagraphs.filter((text) => text.endsWith('?'));
                if (authoredQuestions.length >= 4) lessonSong.questions = authoredQuestions.slice(0, 4);
            }
        });

        const homeworkSlide = slides.find((slide) => /homework/i.test(sourceHeading(slide)));
        if (homeworkSlide) {
            const paragraphs = sourceTexts(homeworkSlide, /<p\b[^>]*>([\s\S]*?)<\/p>/gi);
            const model = paragraphs.find((text) => /^(?:example|model)\s*:/i.test(text));
            const task = paragraphs.find((text) => !/^(?:example|model)\s*:/i.test(text) && !/^homework$/i.test(text) && text.length >= 25);
            if (task) lessons[lessonNumber].homework.task = task;
            if (model) lessons[lessonNumber].homework.model = model.replace(/^(?:example|model)\s*:\s*/i, '').replace(/^["'“]|["'”]$/g, '');
        }
    }
}

restoreCommittedEditorial();

lessons[5].warmups = [
    'What quality makes you trust a friend with a difficult truth?',
    'How do you keep in touch with a friend who lives far away?',
    'When has a friend supported you without trying to solve the problem?',
    'Can a close friendship survive a long period with little contact?',
    'What boundary can make a friendship stronger rather than colder?'
];

function authoredContext(title, kicker, intro, prompt, cards, icon) {
    return discussionContext(title, kicker, intro, prompt, cards.map((card) => card.split('|')), icon);
}

// Explicit scenario decisions for lessons whose historical page did not contain
// two transferable contexts. No topic fallback is used here.
const contextBlueprints = {
    1: [
        ['Ambition Meets the Calendar', 'Turn a large dream into scheduled work.', 'A nurse wants to qualify for an international program while working rotating shifts.', 'Which first milestone is ambitious enough to matter and realistic enough to complete?', ['Goal|Define the application requirement precisely.', 'Time|Protect two study blocks around the shift pattern.', 'Support|Ask one person for practical help.', 'Review|Choose a date to measure progress.'], 'fa-calendar-check'],
        ['The Stable Job or the Studio', 'Compare security with a lifelong creative goal.', 'An accountant has enough savings for six months and an offer to join a friend\'s design studio.', 'What evidence should decide whether this is the right moment to chase the dream?', ['Savings|Calculate essential costs and a safety margin.', 'Demand|Test whether real clients will pay.', 'Identity|Explain why the work matters personally.', 'Exit|Keep a responsible route back if the studio fails.'], 'fa-rocket']
    ],
    2: [
        ['The Password Request', 'Distinguish trust from constant access.', 'One partner asks for the other\'s phone password after seeing an ambiguous message.', 'How can they address insecurity without normalizing surveillance?', ['Feeling|Name the fear without presenting it as proof.', 'Privacy|Explain why personal space still matters.', 'Evidence|Clarify the message directly.', 'Agreement|Set a boundary both people can follow.'], 'fa-lock'],
        ['Two Cities, One Relationship', 'Plan around distance instead of vague promises.', 'A couple receives career opportunities in different cities for the next eighteen months.', 'What plan would reveal whether the relationship can survive the distance?', ['Time|Agree on calls and protected visits.', 'Money|Budget travel without hidden resentment.', 'Career|Treat both opportunities as legitimate.', 'Decision|Set a date to review the arrangement.'], 'fa-map-location-dot']
    ],
    3: [
        ['The Dress-Code Petition', 'Challenge a rule with evidence.', 'A community arts venue bans political messages on clothing after one complaint.', 'Should the rule remain, change, or disappear, and how would you argue the case without attacking the staff?', ['Rule|Identify what the policy actually prohibits.', 'Voice|Explain whose expression is restricted.', 'Impact|Separate discomfort from measurable harm.', 'Action|Draft one fair revision to the policy.'], 'fa-file-signature'],
        ['Music After Midnight', 'Balance freedom with a neighbor\'s right to rest.', 'A young band rehearses in a garage while a nurse next door works early shifts.', 'What agreement protects creative freedom without asking the neighbor to accept unlimited noise?', ['Band|Name the rehearsal time it genuinely needs.', 'Neighbor|Describe the sleep disruption precisely.', 'Compromise|Choose hours and a sound limit.', 'Follow-up|Decide what happens if the agreement fails.'], 'fa-volume-high']
    ],
    4: [
        ['A Move to the Capital', 'Compare a real relocation offer.', 'A designer can accept a higher salary downtown or keep a quieter life near family in a small town.', 'Which option fits this person now, and what information is still missing?', ['Salary|Calculate the gain after housing and transport.', 'Time|Compare commuting with time near family.', 'Career|Estimate access to projects and mentors.', 'Wellbeing|Name the daily environment the person needs.'], 'fa-city'],
        ['The Last Green Lot', 'Decide what a growing neighborhood needs.', 'Developers propose apartments on an empty urban lot that residents use as an informal garden.', 'How could the city add housing without losing every benefit of the shared green space?', ['Housing|State who needs the new homes.', 'Nature|Identify the garden\'s practical value.', 'Design|Reserve a realistic shared area.', 'Decision|Choose who maintains and funds it.'], 'fa-tree-city']
    ],
    5: [
        ['The Missed Birthday', 'Repair a friendship after repeated absence.', 'One friend has missed three important events because of work and sends another last-minute apology.', 'What should each person say if they want honesty without ending the friendship?', ['Impact|Describe the pattern without exaggerating.', 'Reason|Explain the workload without using it as an excuse.', 'Boundary|Name what must change next time.', 'Repair|Offer one action that rebuilds trust.'], 'fa-cake-candles'],
        ['A Friend in Trouble', 'Support someone without taking over.', 'A close friend wants to quit a course after one humiliating presentation.', 'How can you be there for the person while leaving the final decision in their hands?', ['Listen|Ask what happened before advising.', 'Support|Offer one practical form of help.', 'Choice|Respect the friend\'s agency.', 'Check-in|Agree on when to talk again.'], 'fa-user-group']
    ],
    6: [
        ['The Failed Launch', 'Turn a public setback into a recovery plan.', 'A small team releases an app that crashes during its first customer demonstration.', 'What should the team communicate today, and what should it change before trying again?', ['Customer|Acknowledge the failed experience clearly.', 'Cause|Investigate without blaming one person.', 'Fix|Choose the smallest reliable next release.', 'Learning|Record what the team will test differently.'], 'fa-screwdriver-wrench'],
        ['The Second Audition', 'Prepare after rejection without false confidence.', 'A singer is invited to audition again after forgetting the lyrics the first time.', 'Which preparation plan would help the singer bounce back and perform under pressure?', ['Feedback|Identify the precise point of failure.', 'Routine|Schedule realistic rehearsal sessions.', 'Pressure|Simulate the audition conditions.', 'Perspective|Define success beyond winning the role.'], 'fa-microphone']
    ],
    7: [
        ['A Missed Connection', 'Rebuild an itinerary under pressure.', 'A delayed bus makes a traveler miss the final train in a town where few people speak English.', 'What should the traveler do first, and which risk should not be ignored?', ['Information|Confirm the next safe route.', 'Communication|Ask for help with simple, clear language.', 'Budget|Compare a hotel with a late taxi.', 'Safety|Tell someone where the traveler will stay.'], 'fa-route'],
        ['The Famous Trail', 'Plan adventure without damaging the place.', 'A mountain trail has become crowded after appearing in viral travel videos.', 'Which limits would preserve access while protecting residents and the landscape?', ['Visitors|Consider reservations or daily limits.', 'Residents|Protect roads, water, and privacy.', 'Nature|Identify the most vulnerable area.', 'Alternative|Promote another route or season.'], 'fa-mountain-sun']
    ],
    8: [
        ['The Promotion Offer', 'Examine what a higher title will cost.', 'An employee is offered a promotion with more pay, frequent travel, and no clear reduction in current tasks.', 'Which conditions should be negotiated before accepting the role?', ['Scope|List duties that must leave the old role.', 'Pay|Compare compensation with added responsibility.', 'Travel|Set a sustainable frequency.', 'Growth|Clarify training and decision authority.'], 'fa-briefcase'],
        ['A Career Change at Forty', 'Translate experience into a new field.', 'A project manager wants to become a nurse but worries about tuition, age, and starting again.', 'What evidence would make this career change responsible rather than impulsive?', ['Motivation|Test the daily reality of the new work.', 'Skills|Identify experience that transfers.', 'Money|Plan tuition and reduced income.', 'Timeline|Choose a reversible first step.'], 'fa-arrows-rotate']
    ],
    9: [
        ['The Family Group Chat', 'Set a boundary around constant availability.', 'Relatives expect immediate replies and interpret silence as rejection.', 'What message could protect quiet time without making the family feel ignored?', ['Expectation|Explain when replies are realistic.', 'Urgency|Choose a separate signal for emergencies.', 'Tone|Use warmth without apologizing for every delay.', 'Habit|Turn off one unnecessary notification.'], 'fa-comments'],
        ['A Viral Photo', 'Respond before a mistake spreads further.', 'Someone posts an embarrassing photo of a colleague without permission, and it begins circulating.', 'What should the poster, the colleague, and the platform each do now?', ['Consent|Acknowledge that permission was missing.', 'Removal|Delete the original and request repost takedowns.', 'Repair|Apologize without minimizing the impact.', 'Policy|Decide when moderation should intervene.'], 'fa-share-nodes']
    ],
    10: [
        ['The Perfect Morning Routine', 'Separate wellbeing from online performance.', 'A creator promotes a costly five-step routine as the secret to happiness and discipline.', 'Which parts might help, and which claims should a viewer question?', ['Evidence|Ask what supports the promised result.', 'Access|Notice the time and money required.', 'Fit|Adapt one habit to real circumstances.', 'Measure|Define a personal sign of improvement.'], 'fa-sun'],
        ['More Money or More Time?', 'Choose between two kinds of security.', 'A worker can take a well-paid weekend shift or keep the only free day shared with a partner.', 'Which choice makes sense this month, and what would change the answer?', ['Need|Identify the financial pressure.', 'Relationship|Value the scarce shared time.', 'Frequency|Distinguish one shift from a pattern.', 'Decision|Set a limit for future weekends.'], 'fa-scale-balanced']
    ],
    11: [
        ['Footsteps in the Apartment', 'Test an eerie claim before accepting it.', 'A tenant hears footsteps every night in an old building and a neighbor says the apartment is haunted.', 'What ordinary explanations should be investigated, and what evidence would change your mind?', ['Timing|Record when the sound occurs.', 'Building|Check pipes, floors, and neighboring units.', 'Witness|Compare independent observations.', 'Threshold|Define evidence stronger than a feeling.'], 'fa-ghost'],
        ['The Mystery Podcast', 'Tell a suspenseful story responsibly.', 'A podcast wants to cover a local disappearance that still affects the person\'s family.', 'How can it create suspense without turning real pain into entertainment?', ['Family|Seek consent and respect boundaries.', 'Evidence|Separate confirmed facts from rumor.', 'Tone|Avoid sensational descriptions.', 'Purpose|Explain what public value the episode serves.'], 'fa-podcast']
    ],
    12: [
        ['The Box of Letters', 'Decide what to preserve and what to share.', 'After a grandparent dies, a family finds personal letters that reveal an unknown relationship.', 'Who should read the letters, and how should privacy weigh against family history?', ['Ownership|Clarify who inherited the letters.', 'Privacy|Consider the writer and living people named.', 'History|Identify what the letters help explain.', 'Choice|Propose a limited way to preserve them.'], 'fa-box-archive'],
        ['A Childhood Place Rebuilt', 'Respond when memory and reality conflict.', 'Someone returns to a beloved playground and finds a modern apartment complex.', 'How can the person honor the memory without claiming the neighborhood should never change?', ['Memory|Describe one concrete detail from the past.', 'Change|Learn why redevelopment happened.', 'Community|Ask how current residents use the area.', 'Ritual|Choose a meaningful way to remember it.'], 'fa-camera-retro']
    ],
    14: [
        ['Dinner with Two Traditions', 'Design a menu that respects both families.', 'A couple is hosting relatives with different food traditions, allergies, and ideas about celebration.', 'What menu would feel generous without pretending every preference can be satisfied?', ['Tradition|Include one meaningful dish from each family.', 'Safety|Separate allergens and explain ingredients.', 'Choice|Provide a complete alternative, not a side dish.', 'Story|Invite each family to explain one recipe.'], 'fa-utensils'],
        ['The Viral Street-Food Stall', 'Protect a local business from sudden popularity.', 'A small stall becomes famous online and now faces long lines, waste, and complaints from neighbors.', 'How should the owner grow without losing quality or community support?', ['Capacity|Set a realistic daily quantity.', 'Neighbors|Manage queues, noise, and rubbish.', 'Price|Avoid exploiting short-term demand.', 'Identity|Keep the dish and service recognizable.'], 'fa-bowl-food']
    ],
    15: [
        ['The Award Nobody Expected', 'Define success beyond the headline.', 'A researcher wins a major award after years of rejected proposals and quiet team support.', 'How should the achievement be described without turning it into a lone-genius story?', ['Setbacks|Name one failure that changed the work.', 'Team|Credit invisible contributions.', 'Luck|Acknowledge timing and opportunity.', 'Meaning|Explain what the result enables next.'], 'fa-award'],
        ['A Business That Closed', 'Learn from failure without romanticizing loss.', 'A neighborhood café closes after eighteen months, leaving debt but also valuable customer knowledge.', 'What should the owner carry into a future project, and what should not be repeated?', ['Numbers|Review costs, margins, and demand.', 'Feedback|Separate useful patterns from isolated comments.', 'Wellbeing|Recognize the personal cost.', 'Next Step|Choose a small test before another launch.'], 'fa-store-slash']
    ],
    17: [
        ['The School of Real Life', 'Choose a practical skill for a crowded timetable.', 'A secondary school can add one weekly course but must reduce time from another subject.', 'Should it teach financial literacy, cooking, first aid, or digital safety, and what would learners actually do?', ['Need|Use evidence from students\' daily lives.', 'Practice|Design an activity, not another lecture.', 'Trade-off|Name what timetable space will shrink.', 'Measure|Show how the skill will be assessed.'], 'fa-school'],
        ['Learning Lab: Make It Stick', 'Redesign preparation after a failed exam.', 'A learner rereads notes for hours but cannot retrieve the ideas under pressure.', 'Which seven-day plan would replace passive review with durable learning?', ['Recall|Practice answering without notes.', 'Spacing|Return to material across several days.', 'Feedback|Correct mistakes soon after practice.', 'Transfer|Apply the idea to a new problem.'], 'fa-brain']
    ],
    18: [
        ['The Injured Wild Bird', 'Help an animal without causing more harm.', 'A bird with an injured wing is found beside a busy road.', 'What should a passerby do, and why is taking it home not automatically the best choice?', ['Safety|Move people away from traffic first.', 'Handling|Avoid unnecessary contact and stress.', 'Expert|Call a licensed wildlife service.', 'Follow-up|Share the exact location and condition.'], 'fa-dove'],
        ['A Park for Dogs and Wildlife', 'Divide a shared natural space fairly.', 'A city park needs off-leash space, nesting protection, and safe paths for children.', 'How should the park be redesigned across seasons and different areas?', ['Dogs|Provide exercise space with clear limits.', 'Wildlife|Protect nesting and feeding zones.', 'Families|Keep busy paths predictable.', 'Season|Adjust access during sensitive periods.'], 'fa-paw']
    ],
    19: [
        ['The Final Spot on the Team', 'Choose between current form and future potential.', 'A coach must select either an experienced player returning from injury or a younger player in excellent form.', 'Which evidence should decide the selection, and how should the decision be explained?', ['Fitness|Use current medical and training evidence.', 'Form|Compare recent performance under pressure.', 'Role|Identify what the team specifically needs.', 'Communication|Give both players a clear reason.'], 'fa-futbol'],
        ['Parents on the Sideline', 'Stop support from becoming abuse.', 'At a youth match, adults insult the referee and pressure children to play through pain.', 'What rules should the club enforce before the next game?', ['Behavior|Define unacceptable language.', 'Health|Give children authority to report pain.', 'Consequence|Set a proportionate sanction.', 'Culture|Reward respectful support publicly.'], 'fa-whistle']
    ],
    20: [
        ['The Phone Beside the Bed', 'Replace a habit through environment, not willpower alone.', 'Someone loses an hour of sleep each night by scrolling after the lights are off.', 'Which small redesign is realistic enough to last for two weeks?', ['Trigger|Identify when the scrolling begins.', 'Friction|Charge the phone outside reach.', 'Replacement|Choose a short wind-down activity.', 'Measure|Track bedtime, not perfect behavior.'], 'fa-mobile-screen'],
        ['A Team Habit That Punishes Honesty', 'Change a routine embedded in workplace culture.', 'A team schedules every meeting at 8 a.m., although two caregivers repeatedly arrive late.', 'How can the manager change the habit without lowering accountability?', ['Pattern|Look at attendance and care responsibilities.', 'Purpose|Ask whether the time serves the work.', 'Trial|Test a later slot for one month.', 'Review|Compare participation and results.'], 'fa-repeat']
    ],
    21: [
        ['A Weekend Food Drive', 'Turn goodwill into useful support.', 'Volunteers collect large amounts of food, but the local pantry lacks storage and needs different items.', 'How should the group redesign the drive around the pantry\'s actual needs?', ['Listen|Ask the pantry for a priority list.', 'Logistics|Match donations to storage capacity.', 'Dignity|Offer choice instead of random leftovers.', 'Impact|Report what was delivered and used.'], 'fa-box-open'],
        ['A Company Volunteer Day', 'Test whether service or publicity comes first.', 'A company offers one paid volunteer day but wants employees photographed throughout the event.', 'What conditions would make the partnership useful to the community?', ['Partner|Let the organization define the work.', 'Consent|Ask before photographing anyone.', 'Skills|Match employees to genuine needs.', 'Continuity|Offer support beyond one visible day.'], 'fa-hand-holding-heart']
    ],
    22: [
        ['The Empty Wall Commission', 'Choose public art for a contested space.', 'A city commissions a mural beside a market where residents disagree about history and style.', 'How should the artist gather input without turning the work into a vote on every detail?', ['Place|Study who uses the market daily.', 'History|Include more than one local memory.', 'Artist|Protect room for an original vision.', 'Process|Publish how feedback shaped the design.'], 'fa-palette'],
        ['AI in the Student Exhibition', 'Decide what authorship requires.', 'A photographer uses generative tools to alter half the images submitted to a local exhibition.', 'What should be disclosed, and how should judges evaluate the work?', ['Process|Describe where the tool entered the workflow.', 'Intent|Explain the choices made by the artist.', 'Rights|Check permission for source material.', 'Category|Decide whether separate judging is useful.'], 'fa-image']
    ],
    23: [
        ['The First Emergency Fund', 'Build protection on an uneven income.', 'A freelance translator has variable monthly income and wants to save without missing essential bills.', 'What rule could create a realistic emergency fund?', ['Baseline|Calculate essential monthly costs.', 'Percentage|Save more in high-income months.', 'Access|Keep emergency money liquid.', 'Review|Adjust after three months of real data.'], 'fa-piggy-bank'],
        ['The Buy-Now-Pay-Later Phone', 'Look past a small monthly payment.', 'A new phone seems affordable in installments, but late fees and two other debts are already active.', 'Which numbers should the buyer compare before deciding?', ['Total|Calculate the full price and fees.', 'Debt|List every current monthly payment.', 'Need|Separate replacement from upgrade.', 'Delay|Estimate the benefit of waiting three months.'], 'fa-credit-card']
    ],
    26: [
        ['The Meeting Misread', 'Slow down a conclusion about another person.', 'A colleague stays silent in a planning meeting and the manager assumes they are disengaged.', 'What should the manager ask before turning that impression into an evaluation?', ['Signal|Describe the observable behavior only.', 'Context|Check language, timing, and meeting dynamics.', 'Question|Invite the colleague\'s view privately.', 'Change|Offer another way to contribute.'], 'fa-people-arrows'],
        ['The Late-Night Thought Loop', 'Interrupt analysis that no longer produces insight.', 'Someone repeatedly rereads a brief message and invents increasingly negative explanations.', 'Which response could reduce uncertainty without demanding instant reassurance?', ['Fact|Separate the message from imagined motives.', 'Body|Notice fatigue and physical stress.', 'Pause|Delay interpretation until morning.', 'Contact|Ask one direct, non-accusatory question.'], 'fa-moon']
    ],
    27: [
        ['A Statue in the Square', 'Interpret history without freezing it.', 'Residents debate whether a statue of a powerful industrialist should remain in the central square.', 'What response could preserve evidence while addressing the harm the monument ignores?', ['Record|Research what the person did and who was affected.', 'Place|Ask what honor in the central square communicates.', 'Context|Consider a plaque, relocation, or counter-monument.', 'Decision|Explain who participates in the final choice.'], 'fa-monument'],
        ['The Hero in the Textbook', 'Revise a simplified national story.', 'A textbook presents one leader as the sole author of a social change created by thousands of people.', 'How should the chapter change without losing a clear narrative?', ['Leader|Describe the person\'s real contribution.', 'Movement|Name organizers and collective pressure.', 'Conflict|Include disagreement within the movement.', 'Source|Add a primary voice from the period.'], 'fa-book-open']
    ],
    28: [
        ['The Found Wallet', 'Test honesty when nobody appears to be watching.', 'A wallet contains cash, identification, and no contact number, and the nearest police station is far away.', 'What action best protects the owner and avoids creating a new risk?', ['Evidence|Keep the contents together and document the find.', 'Contact|Use a safe public channel to locate the owner.', 'Custody|Choose a trustworthy place to hand it in.', 'Privacy|Do not post personal details online.'], 'fa-wallet'],
        ['Medicine During a Shortage', 'Allocate a scarce resource transparently.', 'A clinic has five doses of a medicine and twelve patients who could benefit.', 'Which criteria are morally defensible, and how should the clinic explain them?', ['Need|Compare urgency and expected benefit.', 'Fairness|Avoid wealth or influence as criteria.', 'Process|Use more than one reviewer.', 'Communication|Explain the rule before individual outcomes.'], 'fa-capsules']
    ],
    30: [
        ['The Interview Outfit', 'Balance self-expression with an unfamiliar workplace.', 'A candidate loves bold clothing but is interviewing at a conservative financial firm.', 'What should the candidate wear, and which part of personal style should remain visible?', ['Signal|Research the workplace without assuming uniformity.', 'Comfort|Choose clothes that support confidence.', 'Expression|Keep one intentional personal detail.', 'Future|Ask whether the culture fits long term.'], 'fa-shirt'],
        ['The Cheap Trend Coat', 'Calculate the hidden cost of a bargain.', 'A fashionable coat costs little, but its fabric, labor conditions, and durability are unclear.', 'Would you buy it, find it second-hand, wait, or choose another option, and why?', ['Use|Estimate how often the coat will be worn.', 'Quality|Check construction and repairability.', 'Labor|Look for credible supply information.', 'Alternative|Compare borrowing, resale, and a durable purchase.'], 'fa-tags']
    ],
    29: [
        ['Space Tourism: Pack Your Bags', 'Price a private trip beyond the ticket.', 'A company offers a three-day orbital flight to wealthy passengers while public agencies fund climate research.', 'Should the flight be permitted, taxed, restricted, or encouraged?', ['Risk|Identify who carries rescue and launch danger.', 'Cost|Include public infrastructure and emissions.', 'Research|Ask what scientific value is produced.', 'Access|Consider who benefits from the industry.'], 'fa-shuttle-space'],
        ['Alien Evidence Lab', 'Rank extraordinary evidence carefully.', 'A telescope detects a repeating atmospheric signal that could indicate life or an instrument error.', 'What must scientists verify before announcing a possible discovery?', ['Instrument|Repeat the reading with another telescope.', 'Pattern|Test natural chemical explanations.', 'Review|Invite independent teams to inspect the method.', 'Message|State uncertainty without hiding the significance.'], 'fa-satellite-dish']
    ],
    32: [
        ['The Profile That Looks Too Perfect', 'Date with curiosity and reasonable caution.', 'A match shares polished photos, avoids video calls, and asks to move the conversation off the app immediately.', 'Which next step protects safety without assuming the person is dishonest?', ['Identity|Suggest a brief video call.', 'Platform|Keep early messages where reporting tools exist.', 'Meeting|Choose a public place and tell a friend.', 'Boundary|Decline financial or urgent personal requests.'], 'fa-user-shield'],
        ['The Slow Reply', 'Interpret silence without inventing certainty.', 'After two enjoyable dates, one person takes two days to answer but continues asking thoughtful questions.', 'How should the other person clarify expectations without demanding constant access?', ['Pattern|Look beyond one delayed reply.', 'Need|State the preferred communication rhythm.', 'Question|Ask what frequency feels realistic.', 'Choice|Decide whether the styles are compatible.'], 'fa-message']
    ],
    33: [
        ['A First Solo Trip', 'Negotiate independence between a teenager and parent.', 'A seventeen-year-old wants to travel by bus to a concert in another city with two friends.', 'Which plan would make the trip a responsible step toward independence?', ['Route|Share transport and venue details.', 'Contact|Agree on useful check-ins, not constant tracking.', 'Money|Carry an emergency amount.', 'Fallback|Plan what happens if the bus is missed.'], 'fa-bus-simple'],
        ['The Childhood Bedroom', 'Handle a family space after someone moves out.', 'Parents want to turn an adult child\'s old room into an office while the child treats it as a permanent home base.', 'What conversation respects memory and the family\'s current needs?', ['Belongings|Choose what is kept, collected, or donated.', 'Notice|Set a fair timeline before changing the room.', 'Meaning|Acknowledge what the space represents.', 'Future|Clarify where visits will happen.'], 'fa-house']
    ],
    34: [
        ['Why the Rumor Feels True', 'Examine attraction before arguing about facts.', 'A family chat shares a claim that a familiar product secretly causes a serious illness.', 'How can you question the claim without humiliating the relative who shared it?', ['Emotion|Recognize fear behind the message.', 'Source|Trace the claim to its first publication.', 'Evidence|Compare risk with credible health data.', 'Reply|Correct the claim without attacking the person.'], 'fa-magnifying-glass'],
        ['Inside the Recommendation Loop', 'See how repetition becomes false confirmation.', 'After watching two conspiracy videos, a user\'s feed fills with increasingly extreme versions of the same claim.', 'Which actions could introduce better evidence without pretending every source is equally reliable?', ['History|Clear or inspect recommendation signals.', 'Search|Use neutral terms outside the feed.', 'Source|Prioritize primary records and expertise.', 'Pause|Avoid sharing during emotional arousal.'], 'fa-diagram-project']
    ],
    35: [
        ['The Song That Changed Meaning', 'Trace identity through one recording.', 'A song associated with a happy childhood later becomes connected with a difficult breakup.', 'How can both meanings remain true when you hear it now?', ['First Memory|Describe where the early association began.', 'New Event|Explain what changed the emotional response.', 'Sound|Identify a musical detail that stayed constant.', 'Choice|Decide whether to reclaim or avoid the song.'], 'fa-music'],
        ['The Playlist Boundary', 'Choose what belongs in a shared space.', 'You are creating music for a mixed-age event, and a powerful track fits the mood but contains explicit language.', 'Would you use a clean edit, choose another song, or change the setting?', ['Audience|Consider age, context, and expectations.', 'Artist|Ask whether an edit changes the intended expression.', 'Organizer|Set one consistent content rule.', 'Choice|Defend the final playlist decision.'], 'fa-headphones']
    ],
    36: [
        ['The Apartment with No Lift', 'Protect independence through practical design.', 'An older resident loves a third-floor apartment but now struggles with stairs after surgery.', 'Which short-term support and long-term housing decision would preserve the most autonomy?', ['Recovery|Ask what mobility may improve.', 'Building|Assess rails, lifts, and delivery access.', 'Support|Arrange help without taking over every task.', 'Review|Set a date to reconsider the plan.'], 'fa-person-cane'],
        ['The Joke About Forgetting', 'Separate ordinary lapses from a health concern.', 'A family laughs at repeated forgotten appointments, but one relative notices the pattern is becoming disruptive.', 'How should they raise the concern without reducing the person to their age?', ['Pattern|Record specific changes over time.', 'Language|Describe behavior without a stereotype.', 'Choice|Invite the person into the decision.', 'Care|Suggest an appropriate professional check.'], 'fa-notes-medical']
    ],
    37: [
        ['The Message That Sounded Angry', 'Repair tone lost in a short text.', 'A manager writes “We need to talk” before going offline, and a colleague spends the evening expecting bad news.', 'How could both people clarify the situation and prevent the same ambiguity?', ['Intent|Explain what the manager meant.', 'Impact|Describe the avoidable anxiety.', 'Rewrite|Add topic, urgency, and timing.', 'Norm|Agree when sensitive messages need context.'], 'fa-comment-dots'],
        ['A Technical Idea for a Non-Expert', 'Make meaning accessible without talking down.', 'An engineer must explain a security update to a shop owner who needs to decide whether to close for an hour.', 'Which analogy and facts would help the owner make the decision?', ['Risk|State what could happen in plain language.', 'Analogy|Connect the issue to a familiar safeguard.', 'Cost|Explain downtime and alternatives.', 'Check|Ask the owner to summarize the choice.'], 'fa-language']
    ],
    38: [
        ['The Derby at Home', 'Keep rivalry from damaging a friendship.', 'Two close friends support rival clubs and one posts a humiliating meme after a painful final.', 'What response protects the friendship without pretending rivalry has no emotion?', ['Intent|Explain whether the post was teasing or targeted.', 'Impact|Let the hurt person describe the effect.', 'Boundary|Agree what stays out of future jokes.', 'Ritual|Create a respectful way to watch the next match.'], 'fa-trophy'],
        ['A World Cup Watch Party', 'Host supporters with different loyalties.', 'A community center expects families from four countries for the same match day.', 'Which rules and activities could turn competition into a shared event?', ['Welcome|Represent every participating community.', 'Safety|Ban abusive chants and harassment.', 'Space|Create quieter seating for children and elders.', 'Afterward|Plan one activity independent of the result.'], 'fa-earth-americas']
    ],
    39: [
        ['The Famous Athlete\'s Bad Decision', 'Admire achievement without excusing conduct.', 'A celebrated athlete supports youth programs but is filmed insulting a referee after a loss.', 'How should fans, sponsors, and the athlete respond?', ['Achievement|Keep sporting skill separate from conduct.', 'Impact|Consider the example set for young fans.', 'Repair|Require a specific apology and action.', 'Judgment|Avoid treating one incident as the whole person.'], 'fa-medal'],
        ['The Quiet Hero at Work', 'Recognize courage without creating a myth.', 'An employee reports a safety problem that delays production and angers a manager.', 'What makes the action courageous, and what support should follow?', ['Risk|Name the professional cost the employee faced.', 'Evidence|Check the reported danger carefully.', 'Protection|Prevent retaliation during review.', 'Culture|Reward reporting before an accident occurs.'], 'fa-shield-heart']
    ],
    40: [
        ['Dinner from a Mystery Box', 'Cook creatively with real constraints.', 'Four guests bring unfamiliar ingredients, one guest is vegan, and the kitchen has only one burner.', 'What menu can the host deliver safely and on time?', ['Ingredients|Identify flavor roles before combining them.', 'Diet|Build the main dish around the vegan constraint.', 'Equipment|Sequence tasks for one burner.', 'Backup|Choose one element that can be served cold.'], 'fa-kitchen-set'],
        ['The Family Recipe Video', 'Preserve technique without turning it into a performance.', 'A creator wants to film an aunt making a cherished dish, but she dislikes cameras and measures by instinct.', 'How can the recipe be documented respectfully and accurately?', ['Consent|Let the cook choose what is recorded.', 'Method|Capture visual cues instead of forcing exact grams.', 'Story|Ask which memories belong with the dish.', 'Credit|Name the cook and family tradition clearly.'], 'fa-video']
    ],
    41: [
        ['Twenty Cereal Boxes', 'Reduce a trivial choice that drains attention.', 'A shopper spends ten minutes comparing similar cereals and leaves without the food needed for dinner.', 'Which simple rule would make this decision good enough?', ['Priority|Choose one nutritional or taste requirement.', 'Limit|Compare no more than three options.', 'Default|Keep a reliable choice for busy days.', 'Time|Set a two-minute decision boundary.'], 'fa-cart-shopping'],
        ['Three Good Job Offers', 'Choose when every option has a real benefit.', 'One role offers money, another meaningful work, and a third flexibility near family.', 'How should the candidate weigh the offers without searching for a perfect answer?', ['Values|Rank what matters for the next two years.', 'Unknowns|Ask each employer the same key questions.', 'Cost|Name what each choice gives up.', 'Commitment|Set a date to decide and stop comparing.'], 'fa-road']
    ],
    42: [
        ['The Focus Implant Trial', 'Evaluate enhancement when long-term evidence is limited.', 'A company offers employees a voluntary implant that may improve concentration but continuously collects neural data.', 'Could consent be genuinely free in this workplace, and what safeguards would be essential?', ['Pressure|Consider career advantages for participants.', 'Evidence|Separate early results from long-term safety.', 'Data|Define ownership, access, and deletion.', 'Exit|Guarantee removal without professional penalty.'], 'fa-brain'],
        ['Gene Editing for Muscle Recovery', 'Draw a line between treatment and advantage.', 'A sports clinic can edit a gene to repair a rare disorder, with a possible extra performance benefit.', 'Who should receive the procedure, and how should sport regulators respond?', ['Treatment|Define the medical condition being addressed.', 'Advantage|Estimate effects beyond normal recovery.', 'Access|Consider cost and unequal availability.', 'Rule|Create a review process as evidence changes.'], 'fa-dna']
    ],
    43: [
        ['The Unreliable Witness', 'Build suspense from limited knowledge.', 'A witness describes a nighttime accident but later admits that fear changed what seemed certain.', 'How would you tell the scene so readers notice uncertainty without losing momentum?', ['Viewpoint|Limit the scene to what the witness perceives.', 'Detail|Choose one observation that may be misleading.', 'Timing|Reveal the correction at a meaningful moment.', 'Fairness|Avoid presenting assumption as fact.'], 'fa-eye'],
        ['A Family Story with Two Endings', 'Handle conflicting memories honestly.', 'Two siblings remember the day they left their childhood home in opposite ways.', 'Should a storyteller choose one version, alternate voices, or leave the conflict unresolved?', ['Voice|Give each sibling a distinct perspective.', 'Evidence|Use objects or records without treating them as complete truth.', 'Emotion|Show why each memory matters.', 'Ending|Choose what the disagreement changes now.'], 'fa-book']
    ],
    44: [
        ['The Reboot Pitch', 'Revisit a beloved story for a new audience.', 'A studio wants to remake a childhood classic while changing its setting and main character.', 'Which elements must remain recognizable, and which deserve reinvention?', ['Core|Name the story\'s essential conflict.', 'Audience|Identify what a new generation needs.', 'Representation|Avoid adding identity as decoration.', 'Risk|Explain one change that may divide fans.'], 'fa-clapperboard'],
        ['The Spoiler Agreement', 'Set expectations before a shared conversation.', 'Two friends watch the same series at different speeds, while their group chat discusses every episode.', 'What spoiler rule is clear, practical, and fair?', ['Window|Choose how long new episodes stay protected.', 'Signal|Label discussions before revealing details.', 'Space|Create a separate channel for current viewers.', 'Exception|Decide how to discuss an old classic.'], 'fa-tv']
    ],
    46: [
        ['The Self-Stirring Soup Bowl', 'Test whether a strange invention solves a real problem.', 'An inventor proposes a battery-powered bowl for people with limited hand movement but markets it as a novelty.', 'How should the product be tested and described before launch?', ['User|Co-design with people who have the relevant need.', 'Function|Compare it with simpler tools.', 'Safety|Test heat, cleaning, and battery failure.', 'Message|Market usefulness without mocking disability.'], 'fa-lightbulb'],
        ['Umbrellas for Delivery Drones', 'Move a wild idea toward a responsible prototype.', 'A startup wants tiny umbrellas to keep packages dry under delivery drones in tropical storms.', 'Which experiment would reveal quickly whether the idea is clever or impractical?', ['Weather|Define the wind and rain conditions.', 'Weight|Measure the effect on flight and battery.', 'Package|Compare waterproof packaging as an alternative.', 'Trial|Test away from people and traffic.'], 'fa-helicopter']
    ],
    48: [
        ['A Morning in 2050', 'Design a future routine around human needs.', 'A city introduces driverless buses, dynamic electricity prices, and digital health checks before work.', 'Which change improves an ordinary morning, and which needs a human alternative?', ['Transport|Keep service accessible without a smartphone.', 'Energy|Protect households that cannot shift usage.', 'Health|Limit what employers can see.', 'Choice|Preserve a non-digital route for essential services.'], 'fa-bus'],
        ['The Neighborhood Heat Plan', 'Prepare for a future already becoming visible.', 'Longer heatwaves threaten older residents while home cooling remains expensive.', 'What should the neighborhood build now rather than waiting for better technology?', ['Shade|Map streets and stops that need trees or cover.', 'Buildings|Create cool shared indoor spaces.', 'People|Organize check-ins for isolated residents.', 'Power|Plan for outages during extreme demand.'], 'fa-temperature-high']
    ]
};

Object.entries(contextBlueprints).forEach(([lessonNumberText, contexts]) => {
    lessons[Number(lessonNumberText)].contexts = contexts.map((context) => authoredContext(...context));
});

Object.assign(lessons[26].songs[0], { title: 'Human', artist: "Rag'n'Bone Man" });
Object.assign(lessons[26].songs[1], { title: 'Lost on You', artist: 'LP' });
Object.assign(lessons[26].songs[2], { title: 'Stressed Out', artist: 'Twenty One Pilots' });

const questionRepairs = {
    15: [
        ['When have you felt like a failure even though one result did not define you?', 'Why do cultures often attach a person\'s value to visible achievement?', 'Does admitting failure make recovery easier, or can the label become damaging?', 'Hot take: confidence sometimes begins with an honest account of what went wrong. Do you agree?'],
        ['Which setback have you survived that once seemed permanent?', 'Why are comeback stories so popular in sport, work, and entertainment?', 'What is the difference between resilience and refusing to leave a harmful situation?', 'Hot take: proving critics wrong is weaker motivation than building a life you value. What do you think?'],
        ['Which part of your future still feels unwritten?', 'How does pressure to avoid mistakes affect young people choosing study or work?', 'Can uncertainty be a source of freedom as well as anxiety?', 'Hot take: a safe plan can be riskier than an imperfect experiment because it delays learning. Do you agree?']
    ],
    17: [
        ['Which school rule helped your learning, and which only demanded obedience?', 'How do different education systems balance discipline with independent thought?', 'When does criticism of schooling become an excuse to stop learning?', 'Hot take: a teacher should sometimes encourage a learner to challenge the curriculum. Where is the boundary?'],
        ['Who taught you a lesson that changed how you treat other people?', 'What knowledge should one generation deliberately pass to the next?', 'Can advice remain useful when society and technology change quickly?', 'Hot take: children often learn more from adult behavior than from adult explanations. Do you agree?'],
        ['Which end-of-term memory still captures what school felt like for you?', 'Why do school holidays carry such strong cultural meaning?', 'Does freedom from school improve curiosity or simply provide necessary rest?', 'Hot take: formal education should include longer breaks for independent projects. What might learners gain or lose?']
    ],
    18: [
        ['Which difficult change has made you more aware of your own strength?', 'How has the blackbird become a cultural symbol beyond the animal itself?', 'Can art help a social movement without stating a political argument directly?', 'Hot take: hopeful symbols matter most when people can connect them to concrete action. Do you agree?'],
        ['Which natural place in your area has changed noticeably?', 'Why do societies often protect nature only after a loss becomes visible?', 'Should economic growth stop when an ecosystem cannot be restored?', 'Hot take: charging people to use vulnerable natural sites can protect them but also make nature less equal. How would you decide?'],
        ['Which ordinary sight or sound makes the world feel beautiful to you?', 'Why do simple images of nature travel so well across languages and generations?', 'Can celebrating beauty distract us from environmental destruction?', 'Hot take: wonder is a stronger motivation for conservation than fear. What evidence supports your view?']
    ],
    21: [
        ['Which local issue would make you volunteer your time rather than only donate money?', 'How should communities address historical responsibility for land and displacement?', 'When does urgency justify disruptive protest?', 'Hot take: people who benefit from an injustice have a duty to help repair it even if they did not create it. Do you agree?'],
        ['When has another person\'s problem felt impossible to ignore?', 'Why can messages about global suffering create compassion in one audience and fatigue in another?', 'Which social cause needs careful listening more than a quick campaign?', 'Hot take: a movement loses credibility when its public message is broader than its concrete plan. What do you think?'],
        ['Which principle would you publicly defend even if it cost you popularity?', 'How have music and collective chanting supported civil-rights movements?', 'What turns personal conviction into effective collective action?', 'Hot take: refusing to take a side in a serious injustice is itself a political choice. Do you agree?']
    ],
    22: [
        ['Which artwork has helped you understand another person\'s pain?', 'How does a culture decide which troubled artists to celebrate after death?', 'Should knowledge of an artist\'s biography change how we judge the work?', 'Hot take: romanticizing suffering can discourage artists from seeking help. Do you agree?'],
        ['Which routine sometimes makes you feel as if you are moving without thinking?', 'How can pop art criticize consumer culture while still being sold inside it?', 'Does an entertaining message make social criticism more accessible or less serious?', 'Hot take: art that comforts an audience is not automatically less valuable than art that disturbs it. What do you think?'],
        ['When have you changed your style or voice to fit into a group?', 'Why do creative industries reward distinctiveness and conformity at the same time?', 'How much adaptation is healthy before an artist loses a recognizable identity?', 'Hot take: refusing every label can become its own carefully managed brand. Do you agree?']
    ],
    23: [
        ['Which purchase has given you value that its price could not measure?', 'Why do societies use expensive objects as shortcuts for status?', 'Can money buy the conditions for happiness without buying happiness itself?', 'Hot take: talking openly about prices and salaries would improve most financial decisions. What could go wrong?'],
        ['Which financial worry most influences everyday choices in your household?', 'How have songs and films shaped the idea that wealth solves personal problems?', 'Is wanting financial security different from being materialistic, and where is the line?', 'Hot take: a society focused on individual budgeting can ignore wages and structural inequality. Do you agree?'],
        ['When has money changed the balance of power in a relationship or group?', 'Why is wealth often treated as evidence of competence?', 'Should people with much more money have proportionally greater obligations to society?', 'Hot take: every large purchase is also a vote for the kind of economy we want. Is that fair to consumers?']
    ],
    26: [
        ['When have stress or exhaustion made you react more sharply than you intended?', 'How do workplaces judge emotional control differently across roles and identities?', 'Which human limitation should we accommodate instead of treating it as weakness?', 'Hot take: self-control is shaped by circumstances more than personality. Do you agree?'],
        ['Which past relationship or opportunity is hardest for people to let go of?', 'Why do some cultures treat emotional openness as strength and others as loss of control?', 'Can revisiting a painful memory produce insight, or does it usually keep the pain active?', 'Hot take: closure is often a decision people make without receiving every answer. What do you think?'],
        ['Which adult responsibility makes you miss a simpler period of life?', 'How do economic pressure and social comparison affect young adults\' mental health?', 'Is nostalgia a useful warning about modern life or an unreliable comparison?', 'Hot take: society individualizes stress that is actually caused by working and living conditions. Do you agree?']
    ],
    27: [
        ['When has success changed the way other people treated you?', 'Why do revolutions often replace one heroic story with another?', 'What makes a leader\'s legacy survive after power disappears?', 'Hot take: monuments should describe how power was lost, not only how it was gained. Do you agree?'],
        ['Which historical period would you observe for one day if you could do so safely?', 'How do popular images make the past feel more orderly than it was?', 'Should historical stories prioritize accuracy even when uncertainty makes them less dramatic?', 'Hot take: nostalgia for a golden age usually reveals dissatisfaction with the present. What do you think?'],
        ['Which invention most changed life for people who never became famous?', 'Why do textbooks remember inventors more easily than workers and users?', 'How should we credit an invention developed through many small contributions?', 'Hot take: social conditions matter more than individual genius in explaining historical breakthroughs. Do you agree?']
    ],
    28: [
        ['When has telling the truth carried a real personal cost for you?', 'How do institutions decide when secrecy protects people and when it protects power?', 'Is a painful truth always morally preferable to a comforting lie?', 'Hot take: honesty without care can be a form of selfishness. Do you agree?'],
        ['Which mistake taught you a principle you could not learn from advice?', 'Why do cultures use cautionary stories to teach moral behavior?', 'Can a bad decision be morally understandable without becoming acceptable?', 'Hot take: judging a choice only by its outcome ignores too much. What else matters?'],
        ['Which public problem makes people feel powerless even when action is possible?', 'How does waiting for leaders to act affect democratic responsibility?', 'When is patience strategic, and when is it moral avoidance?', 'Hot take: small individual actions matter only when they help create collective pressure. Do you agree?']
    ],
    29: [
        ['Which part of isolation would be hardest for you during a long space mission?', 'How has space travel become a symbol for loneliness as well as discovery?', 'Should astronaut mental health limit the length of a mission?', 'Hot take: human exploration is valuable partly because machines cannot tell us what distance feels like. Do you agree?'],
        ['What personal sacrifice would make a dream career no longer worthwhile?', 'Why are explorers often celebrated while the families and teams supporting them disappear from the story?', 'Should public admiration influence how much risk a space agency accepts?', 'Hot take: the romance of exploration hides ordinary labor and loneliness. What do you think?'],
        ['Which image of the night sky has made scientific distance feel personal to you?', 'How do astronomy and fiction shape public support for space research?', 'Would finding life elsewhere change everyday moral priorities on Earth?', 'Hot take: wonder is a legitimate public benefit of science even when no product results. Do you agree?']
    ],
    30: [
        ['Which fashion choice makes you feel more confident rather than merely noticed?', 'How have dance, magazines, and social media turned poses into cultural language?', 'Does borrowing a style celebrate its source or erase it, and how can we tell?', 'Hot take: fashion is most creative when it stops trying to look timeless. Do you agree?'],
        ['When do formal clothes change how you behave?', 'Why do workplaces still connect certain clothes with competence?', 'Should a dress code describe safety and function instead of taste?', 'Hot take: being well dressed is a social skill, not a shallow concern. What do you think?'],
        ['What is the best second-hand item you have found or inherited?', 'How has thrifting changed from economic necessity to trend in many cities?', 'Can resale culture reduce waste if people continue buying too much?', 'Hot take: finding a bargain is not sustainable when the purchase was unnecessary. Do you agree?']
    ],
    40: [
        ['Which sweet food carries a particular memory for you?', 'Why does sugar represent pleasure, reward, and danger in so many cultures?', 'Should recipes protect indulgence, or adapt to health concerns?', 'Hot take: calling food guilty pleasure makes eating less enjoyable and less honest. Do you agree?'],
        ['Which playful food name has confused you because it did not describe the dish?', 'How do restaurants use fantasy and location to sell an experience?', 'Does a memorable name improve a mediocre dish?', 'Hot take: atmosphere matters as much as cooking in a restaurant meal. What do you think?'],
        ['Which slow breakfast helps you feel genuinely rested?', 'Why can simple home cooking symbolize escape from a busy economy?', 'Is cooking from scratch relaxing when someone has to plan and clean?', 'Hot take: convenience food can protect valuable time and still belong in a healthy life. Do you agree?']
    ],
    46: [
        ['Which strange invention from a film would you test in real life?', 'How do fictional laboratories shape trust and fear around science?', 'When does an absurd prototype reveal a serious unmet need?', 'Hot take: an invention that makes people curious has value even before it becomes useful. Do you agree?'],
        ['Which prediction about your future once felt certain but now seems unlikely?', 'Why do technology stories often focus on lonely inventors?', 'Should inventors describe social consequences before a product works?', 'Hot take: optimism about technology is irresponsible without a plan for failure. What do you think?'],
        ['Which everyday machine do you use without noticing its design?', 'How did cars change cities beyond the act of transportation?', 'Should autonomous machines imitate human behavior or be visibly different?', 'Hot take: the best future invention may be a system that helps people own fewer devices. Do you agree?']
    ]
};

Object.entries(questionRepairs).forEach(([lessonNumberText, questions]) => setQuestions(Number(lessonNumberText), questions));

const oralPrompts = {
    1: ['What ambition would you pursue if you had one protected hour every day?', 'Which milestone would show progress after three months?', 'What predictable obstacle could interrupt the plan?', 'How would you adapt without abandoning the larger dream?'],
    2: ['How would you describe a healthy relationship without using the word perfect?', 'Which boundary would be difficult but necessary to communicate?', 'What action rebuilds trust after jealousy or silence?', 'When is affection no longer enough reason to stay together?'],
    3: ['Which unfair rule in a familiar setting would you challenge?', 'How would you present evidence to the person responsible for it?', 'What consequence of changing the rule should you anticipate?', 'Which compromise would protect freedom without ignoring other people?'],
    4: ['Would your ideal weekday work better in a large city or a small town?', 'How would housing, transport, and community change the decision?', 'Which convenience would you willingly give up?', 'What would make you reconsider the move after one year?'],
    5: ['How would you address a friend who repeatedly cancels at the last minute?', 'Which explanation would you listen to before judging?', 'What support can you offer without solving the problem for them?', 'Which future behavior would show that the friendship is reciprocal?'],
    6: ['Describe a setback that required a different strategy rather than more effort?', 'Which early warning did you miss?', 'Who or what helped you recover?', 'What would you do in the first twenty-four hours if it happened again?'],
    7: ['Which unfamiliar destination would test your independence?', 'How would you prepare without planning away every surprise?', 'What local advice would you seek on arrival?', 'Which travel risk is worth accepting and which is not?'],
    8: ['Which job offer would be attractive on paper but wrong for your life?', 'What would you ask before accepting a promotion?', 'Which skill from your current work could transfer to another field?', 'How should a good career decision balance money, growth, and time?'],
    9: ['Which notification could you disable with no meaningful loss?', 'How would you ask permission before sharing someone else\'s image?', 'What makes an online exchange feel more hostile than the same conversation in person?', 'Which platform feature would you redesign to support healthier use?'],
    10: ['Which ordinary moment reliably improves your mood?', 'How would you distinguish contentment from avoiding ambition?', 'What purchase saves enough time or stress to be worthwhile?', 'Which personal measure of a good life would you use instead of status?'],
    11: ['Tell a mystery using one sound, one uncertain observation, and one ordinary explanation?', 'Which detail would make the audience doubt the narrator?', 'When would you reveal the strongest evidence?', 'Would you resolve the mystery or preserve ambiguity, and why?'],
    12: ['Which object carries a memory that a photograph cannot capture?', 'How has your version of one childhood event changed?', 'What would you preserve for a younger relative?', 'When can nostalgia prevent an honest view of the past?'],
    13: ['How should a court weigh financial pressure in a non-violent offense?', 'Which fact establishes responsibility rather than merely context?', 'What consequence could repair harm and support rehabilitation?', 'Which safeguard would reduce the chance of an unfair verdict?'],
    14: ['Which family dish would you introduce to someone from another culture?', 'What part of the recipe could change without losing its identity?', 'How would you accommodate an allergy without isolating the guest?', 'What can food reveal that a history book may miss?'],
    15: ['Present one failure as a timeline rather than a label?', 'Which decision contributed most to the result?', 'What useful lesson does not excuse the damage or cost?', 'Which small experiment would you try before attempting the goal again?'],
    16: ['Which workplace task should an AI assist but never decide alone?', 'What data would the system need, and what should remain private?', 'How could a person challenge a harmful result?', 'Who remains accountable when several vendors built the tool?'],
    17: ['Teach a useful skill in three clear stages?', 'Which mistake should a beginner expect?', 'How would you check understanding without giving a test?', 'What change would help a learner who needs more time?'],
    18: ['How would you respond after finding an injured wild animal?', 'Which expert or public service should be contacted?', 'What well-intended action might make the situation worse?', 'How could the local area reduce the same risk in future?'],
    19: ['How would you select the final player for an important match?', 'Which evidence matters beyond statistics?', 'How should the coach explain the decision to the person left out?', 'When should health take priority over competition?'],
    20: ['Which repeated behavior would you change by redesigning its trigger?', 'What replacement action could fit the same moment?', 'How would you measure consistency without demanding perfection?', 'Which social expectation makes the habit harder to change?'],
    21: ['Which local cause needs time, money, or specialized skill most?', 'How would you ask the organization what help is actually useful?', 'What would respectful volunteering look like on the first day?', 'How could support continue after public attention disappears?'],
    22: ['Pitch a public artwork for a place you know well?', 'Whose history should the work make visible?', 'How would you respond to someone who dislikes its style?', 'Which part of the artist\'s vision should not be decided by committee?'],
    23: ['Explain a monthly budget after an unexpected repair?', 'Which expense could be reduced without creating a larger problem?', 'How much uncertainty should an emergency fund cover?', 'When is paying more now likely to save money later?'],
    24: ['Negotiate a freelance project with an unclear revision policy?', 'Which payment deadline and cancellation term would you request?', 'How would you refuse work outside the agreed scope?', 'What makes flexibility sustainable rather than permanently available?'],
    25: ['Compare two headlines about the same event?', 'Which original source would you locate first?', 'What framing choice changes the reader\'s impression?', 'How would you state what remains uncertain before sharing?'],
    26: ['Explain a moment when stress changed your interpretation of another person?', 'Which assumption did you make too quickly?', 'What signal in the room should you have noticed?', 'How would empathy change the next conversation?'],
    27: ['Retell a historical event from a less powerful participant\'s viewpoint?', 'Which primary source could support that voice?', 'What uncertainty should remain explicit?', 'How would the new viewpoint change the familiar heroic story?'],
    28: ['Work through a moral dilemma with two defensible choices?', 'Which people experience the consequences?', 'What principle conflicts with another principle?', 'Would your decision change if the outcome were uncertain?'],
    29: ['Propose one scientific goal for a long space mission?', 'Why does it require people rather than only machines?', 'Which physical or psychological risk is hardest to justify?', 'What benefit on Earth should count in the mission\'s favor?'],
    30: ['Build an interview outfit around one intentional personal detail?', 'What does the workplace expect, and how did you learn that?', 'Which part of the dress code serves function rather than taste?', 'Would you want the job if personal style always had to disappear?'],
    31: ['Plan a Saturday with one mainstream activity and one niche interest?', 'How would you keep browsing from consuming the shared evening?', 'Which cultural event would you recommend to someone with different tastes?', 'What balance between screens and in-person leisure fits a busy week?'],
    32: ['Write a first message that refers to something specific in a profile?', 'Which question invites a real answer instead of small talk?', 'How would you respond if interest is not mutual?', 'When should an online conversation move to a safe in-person meeting?'],
    33: ['Describe one childhood rule you understand differently as an adult?', 'Who influenced the way you handled growing responsibility?', 'Which freedom arrived with an unexpected obligation?', 'What advice would you give your younger self without erasing necessary mistakes?'],
    34: ['Evaluate a rumor using a claim, source, and missing evidence?', 'Which detail makes the story emotionally attractive?', 'How could an algorithm amplify it?', 'What new evidence would genuinely change your conclusion?'],
    35: ['Introduce a song through the memory or identity it carries for you?', 'Which musical detail creates the emotional effect?', 'How would a clean edit change its audience or meaning?', 'When can a shared playlist require a boundary?'],
    36: ['Describe a later stage of life without relying on decline stereotypes?', 'Which ability may improve with age?', 'What environmental change would support independence?', 'How should younger and older people share responsibility for care?'],
    37: ['Explain a misunderstanding caused by tone rather than vocabulary?', 'Which phrase sent mixed signals?', 'How would you check the listener\'s interpretation?', 'What could you say differently while keeping the same intention?'],
    38: ['Set rules for watching a final with supporters of rival teams?', 'Which joke would cross the line?', 'How should the group respond to abusive language?', 'What shared ritual could matter regardless of the score?'],
    39: ['Present a person you admire through one concrete decision?', 'Which flaw complicates the example they set?', 'What action matters more than their public image?', 'How can admiration remain critical rather than becoming worship?'],
    40: ['Design a meal around one unfamiliar ingredient and one dietary restriction?', 'Which technique would make the ingredient approachable?', 'How would you sequence the work in a small kitchen?', 'What story or memory would you invite a guest to share?'],
    41: ['Compare three attractive options using only two priorities?', 'Which missing fact is worth investigating?', 'What opportunity cost would you accept?', 'When should you stop researching and commit?'],
    42: ['Evaluate a proposed enhancement for health, privacy, and fairness?', 'Who benefits first and who carries the risk?', 'Could consent remain voluntary under competitive pressure?', 'Which rule should be revisited when long-term evidence arrives?'],
    43: ['Tell a scene in which one detail changes meaning at the end?', 'What does the narrator believe at the beginning?', 'How will suspense rise without hiding essential information unfairly?', 'What new perspective should the ending create?'],
    44: ['Pitch a remake that preserves one essential element and changes another?', 'Who is the new audience?', 'Which casting or setting choice changes the story meaningfully?', 'How would you answer a fan who sees every change as betrayal?'],
    45: ['Present a three-day trip based on local rather than viral sources?', 'Which cultural expectation should a visitor learn?', 'How will spending benefit people in the destination?', 'What lower-impact alternative would you choose if a site is overcrowded?'],
    46: ['Pitch a strange invention by naming a real user and problem?', 'Which simple alternative must it outperform?', 'What is the cheapest safe prototype?', 'Which failed result would tell you to abandon the idea?'],
    47: ['Retell a joke that failed without making the listener the problem?', 'What assumption did the setup depend on?', 'How would you acknowledge the impact?', 'Which alternative could release tension without dismissing anyone?'],
    48: ['Describe an ordinary morning in 2050 through three concrete details?', 'Which service would work better, and for whom?', 'What non-digital alternative must remain?', 'Which decision made today could move that future closer?']
};

Object.entries(oralPrompts).forEach(([lessonNumberText, prompts]) => {
    const lesson = lessons[Number(lessonNumberText)];
    lesson.speaking = { ...lesson.speaking, title: `Speak: ${lesson.title}`, prompts };
});

const homeworkRepairs = {
    17: ['Design a seven-day plan to learn one small skill. Include a daily action, a likely mistake, and a way to check progress.', 'I am usually a quick study when I can see a demonstration. This week I will pick up basic photo editing by practicing one tool each day and comparing my final image with the original.'],
    19: ['Describe a time you went the extra mile for a goal. Explain the extra effort, its cost, and the result.', 'When our first community race stalled, I helped get the ball rolling by calling local clubs. I went the extra mile and designed the registration form that evening.'],
    26: ['Analyze one moment when you made a quick assumption. Explain the signal you missed and how empathy could change your response.', 'I jumped to conclusions when my colleague left the call, but I had failed to read the room. She was dealing with an emergency, not rejecting the project.'],
    28: ['Write about a moral dilemma with two defensible options. State the principle behind each option and make a final decision.', 'Returning the document showed integrity, but the dilemma was whether to expose private information inside it. I chose to contact the owner through a neutral third party.'],
    30: ['Describe one clothing purchase you would make differently today. Consider style, cost per wear, and environmental impact.', 'The vintage coat suited my personal style and lasted for years. Unlike a short-lived trend, it became a staple that I could repair instead of replace.'],
    34: ['Evaluate a rumor or conspiracy theory. Identify its claim, strongest source, missing evidence, and your current conclusion.', 'The cover-up claim sounds dramatic, but the anonymous video is not solid evidence. I would fact-check the date and look for independent records before believing the conspiracy theory.'],
    36: ['Write about one hope and one concern you have about getting older. Include a practical choice that could support wellbeing.', 'I hope to age gracefully by protecting my friendships and mobility. A senior moment may be harmless, but persistent changes deserve attention instead of a joke.'],
    37: ['Describe a conversation in which the message was misunderstood. Explain the mixed signals and rewrite the key sentence.', 'I did not get my point across because my brief reply sent mixed signals. I should have said that I agreed with the idea but needed a different deadline.'],
    39: ['Profile one person you admire through a specific decision, a limitation, and the lesson you take from their example.', 'My aunt is a role model because she stood up for a colleague who was being ignored. She was nervous and imperfect, which makes the choice more useful to me.'],
    41: ['Compare two current choices using three priorities and one opportunity cost. Make a decision and explain when you will review it.', 'Choice overload kept me comparing similar courses. After I weighed the pros and cons, I chose the shorter program because feedback and schedule matter more to me than a famous name.']
};

Object.entries(homeworkRepairs).forEach(([lessonNumberText, [task, model]]) => {
    const lesson = lessons[Number(lessonNumberText)];
    lesson.homework = { ...lesson.homework, task, model };
});

function cleanMeaning(value) {
    return String(value || '')
        .replace(/\s*["“][\s\S]*$/, '')
        .replace(/\s+/g, ' ')
        .replace(/\s+([,.;!?])/g, '$1')
        .trim();
}

function practiceFromExample(example, term) {
    const ignored = new Set(['the', 'and', 'for', 'from', 'with', 'your', 'you', 'into', 'someone', 'something', 'this', 'that']);
    const tokens = term.toLowerCase().match(/[a-z]+/g) || [];
    const keywords = tokens.filter((token) => token.length >= 3 && !ignored.has(token));
    let clue = example;
    keywords.forEach((keyword) => {
        const stem = keyword.length > 5 ? keyword.slice(0, -1) : keyword;
        clue = clue.replace(new RegExp(`\\b${stem}[a-z'-]*`, 'gi'), '_____');
    });
    return `${clue} → {gap}`;
}

Object.entries(curatedExamples).forEach(([lessonNumberText, examples]) => {
    const lessonNumber = Number(lessonNumberText);
    const lesson = lessons[lessonNumber];
    if (!lesson || examples.length !== 6 || lesson.expressions.length !== 6) throw new Error(`L${lessonNumber}: curated expression set is incomplete.`);
    lesson.expressions.forEach((expression, index) => {
        expression.meaning = cleanMeaning(expression.meaning);
        expression.example = examples[index].replace(/\s+([,.;!?])/g, '$1').trim();
        expression.practice = practiceFromExample(expression.example, expression.term);
    });
});

function topicLabel(title) {
    return title.replace(/\s*&\s*/g, ', ').replace(/^The\s+/i, '').toLowerCase();
}

let repairedContexts = 0;
let repairedPrompts = 0;
Object.values(lessons).forEach((lesson) => {
    lesson.homework.task = String(lesson.homework.task || '').replace(/\*\*/g, '').replace(/\s+([,.;!?])/g, '$1').trim();
    lesson.homework.model = String(lesson.homework.model || '').replace(/\*\*/g, '').replace(/^['"“]|['"”]$/g, '').replace(/\s+([,.;!?])/g, '$1').trim();
    lesson.songs.forEach((song) => {
        if (/offers a concrete listening lens/i.test(song.angle || '')) song.angle = '';
        if (/ideas, choices, and real-life consequences/i.test(song.discussionTitle || '')) song.discussionTitle = '';
        if (/\s+[,.;!?]/.test(song.angle || '')) song.angle = '';
        song.questions = song.questions.map((question) => {
            if (!/Give an example\.$/i.test(question)) return question;
            repairedPrompts += 1;
            return question.replace(/Give an example\.$/i, 'Which example supports your answer?');
        });
    });
    const topic = topicLabel(lesson.title);
    lesson.contexts.forEach((context, index) => {
        if (context.prompt === 'Which option would you choose, what would you give up, and why?') {
            context.prompt = `Which option would you choose in this ${topic} scenario, what would you give up, and why?`;
            repairedPrompts += 1;
        }
        if (index === 0 && context.prompt === 'Which situation would create the most useful real conversation?') {
            context.prompt = `Which situation would create the most useful real conversation about ${topic}, and why?`;
            repairedPrompts += 1;
        }
    });
    lesson.speaking.prompts = lesson.speaking.prompts.map((prompt) => {
        if (prompt !== 'Which counterargument is strongest, and how would you respond to it?') return prompt;
        repairedPrompts += 1;
        return `Which counterargument about ${topic} is strongest, and how would you respond to it?`;
    });
    lesson.practice = lesson.expressions.map((expression) => ({ text: expression.practice, answer: expression.term }));
});

const source = `(function installConversationLessons0148(globalScope) {\n    'use strict';\n\n    const lessons = ${JSON.stringify(lessons, null, 4).replace(/</g, '\\u003c')};\n\n    globalScope.CONVERSATION_LESSONS_01_48 = Object.freeze(lessons);\n}(window));\n`;
fs.writeFileSync(dataPath, source, 'utf8');
console.log(JSON.stringify({ data: path.relative(root, dataPath), repairedContexts, repairedPrompts }, null, 2));
