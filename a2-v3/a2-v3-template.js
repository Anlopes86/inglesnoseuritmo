(function installA2V3PremiumCurriculum(globalScope) {
    'use strict';

    const ROUTE_TIERS = Object.freeze({
        core: Object.freeze({ label: 'CORE', description: 'Priority for a 60-minute lesson.' }),
        extended: Object.freeze({ label: 'EXTENDED', description: 'Use if there is time.' }),
        extra: Object.freeze({ label: 'EXTRA', description: 'Review or additional practice.' })
    });

    const numberedItems = (start, end) => Object.freeze(
        start > end ? [] : Array.from({ length: end - start + 1 }, (_, index) => start + index)
    );

    function splitRouteItems(total, coreCount, extraCount = 0) {
        const safeTotal = Math.max(0, Number(total) || 0);
        const safeCore = Math.min(safeTotal, Math.max(0, Number(coreCount) || 0));
        const safeExtra = Math.min(safeTotal - safeCore, Math.max(0, Number(extraCount) || 0));
        const extendedEnd = safeTotal - safeExtra;
        return Object.freeze({
            core: numberedItems(1, safeCore),
            extended: numberedItems(safeCore + 1, extendedEnd),
            extra: numberedItems(extendedEnd + 1, safeTotal)
        });
    }

    function createLexicalRoute(config, options = {}) {
        const vocabulary = splitRouteItems(
            config.vocab?.length,
            options.coreVocabularyCount ?? Math.min(8, config.vocab?.length || 0),
            options.extraVocabularyCount || 0
        );
        const expressions = splitRouteItems(
            config.expressions?.length,
            options.coreExpressionCount ?? Math.min(6, config.expressions?.length || 0),
            options.extraExpressionCount || 0
        );
        const translations = splitRouteItems(
            config.translations?.length,
            Math.ceil((config.translations?.length || 0) / 2)
        );
        const miniDialogues = splitRouteItems(config.dialogues?.length, Math.min(1, config.dialogues?.length || 0));

        return Object.freeze({
            durationMinutes: 60,
            tiers: ROUTE_TIERS,
            core: Object.freeze({
                introDialogue: 'all',
                vocabulary: vocabulary.core,
                verbs: 'all',
                languageExplanation: Object.freeze(['grammarTable', 'grammar', 'examples', 'helpingYou']),
                practice: 'first-half',
                translations: translations.core,
                expressions: expressions.core,
                miniDialogues: miniDialogues.core,
                guidedConversation: 'all',
                music: 'all',
                homework: 'all'
            }),
            extended: Object.freeze({
                vocabulary: vocabulary.extended,
                practice: 'remaining-half',
                translations: translations.extended,
                expressions: expressions.extended,
                expressionTranslations: 'all',
                reading: 'all',
                miniDialogues: miniDialogues.extended
            }),
            extra: Object.freeze({
                vocabulary: vocabulary.extra,
                expressions: expressions.extra,
                review: 'as-needed',
                optionalChallenges: 'as-needed'
            }),
            indicator: Object.freeze({
                core: `60 min · Words 1–${vocabulary.core.length} · Expressions 1–${expressions.core.length} · Dialogue 1`,
                extended: `Remaining items & practice · reading · ${miniDialogues.extended.length === 1 ? 'Dialogue 2' : `Dialogues ${miniDialogues.extended.join('–')}`}`,
                extra: vocabulary.extra.length
                    ? `${vocabulary.extra.length} extra words · review or optional task`
                    : 'Review or optional task'
            })
        });
    }

    function createLexicalHomework(lessonNumber, tasks) {
        const curriculumAvailable = typeof globalScope.V3Curriculum?.getLesson === 'function';
        const manifestLesson = curriculumAvailable
            ? globalScope.V3Curriculum.getLesson('a2-v3', lessonNumber)
            : null;
        if (curriculumAvailable && (!manifestLesson || manifestLesson.lessonKind !== 'lexical')) {
            throw new Error(`A2-V3 L${lessonNumber}: homework must be linked to a current lexical curriculum entry.`);
        }
        const semanticTags = Object.freeze([...(manifestLesson?.languageTags || [])]);
        const definitions = [
            ['writing', 'A', 'Writing', 'fas fa-edit', tasks.writing],
            ['speaking', 'B', 'Speaking', 'fas fa-microphone', tasks.speaking],
            ['real-life', 'C', 'Real-life', 'fas fa-comments', tasks.realLife]
        ];
        return Object.freeze(definitions.map(([kind, option, label, icon, instruction]) => {
            if (!instruction) throw new Error(`A2-V3 L${lessonNumber}: missing authored ${kind} homework.`);
            return Object.freeze({
                option,
                kind,
                title: `Option ${option} — ${label}`,
                icon,
                instruction,
                source: 'authored',
                usesFallback: false,
                curriculumId: manifestLesson?.id || `a2-v3-l${String(lessonNumber).padStart(2, '0')}`,
                semanticTags
            });
        }));
    }

    const HOMEWORK_TASKS = Object.freeze({
        1: Object.freeze({
            writing: 'Write 6–8 sentences about a real or imagined trip. Include two weather words, one Past Simple detail, enjoy + -ing, and different from/than.',
            speaking: 'Prepare a 45–60 second vacation update without reading a full text. Say where you went, describe the weather, and explain one activity you enjoyed doing.',
            realLife: 'Create a 6-line welcome-back conversation. Ask about a trip and weather, then compare the destination with your city.'
        }),
        3: Object.freeze({
            writing: 'Write 6–8 direction steps from a familiar starting point to a destination. Use at least four place or movement expressions and say how long it takes.',
            speaking: 'Give 45–60 seconds of directions without reading. Include a polite request for help, two landmarks, and an estimated travel time.',
            realLife: 'Create a tourist-and-local mini-dialogue in which the tourist is lost, asks for help, confirms one turn, and asks “How long does it take?”'
        }),
        5: Object.freeze({
            writing: 'Write 6–8 sentences about your sports or workout routine. Use go, do, and play correctly and answer “How good are you at...?”',
            speaking: 'Give a 45–60 second sports profile. Mention what you do, how often, your current ability, and one goal for improvement.',
            realLife: 'Create a short conversation between a coach and a new student choosing an activity and agreeing on a realistic first workout.'
        }),
        7: Object.freeze({
            writing: 'Write 6–8 sentences about three interests. Use at least three adjectives, kind of, and one clear preference with a reason.',
            speaking: 'Prepare a 45–60 second free-time profile. Explain what you follow, watch, or listen to and why it interests you.',
            realLife: 'Create a mini-dialogue between two people choosing a free-time activity. They must discover one shared interest and one different preference.'
        }),
        9: Object.freeze({
            writing: 'Write 6–8 sentences comparing food and drink preferences. Use like/love/hate, so or neither, feel like, and rather than.',
            speaking: 'Speak for 45–60 seconds about what you feel like eating today and what you would choose rather than a common alternative.',
            realLife: 'Create a mini-dialogue in which two friends choose a meal, agree with so/neither, and make one final preference clear.'
        }),
        11: Object.freeze({
            writing: 'Write 6–8 lines of a restaurant exchange. Include a polite greeting, “Would you like...?”, “I would like...”, one follow-up, and the bill.',
            speaking: 'Prepare a 45–60 second restaurant role-play as the customer. Order a dish and drink, answer a server’s question, and make one polite request.',
            realLife: 'Create an 8-line server-and-customer mini-dialogue with an unavailable item, a new choice, and a polite solution.'
        }),
        13: Object.freeze({
            writing: 'Write 6–8 sentences describing two people and one change of mood. Use four personality or mood adjectives and one expression with mood or smile at.',
            speaking: 'Speak for 45–60 seconds about your personality and what usually puts you in a good or bad mood. Add one example.',
            realLife: 'Create a supportive mini-dialogue in which one person seems upset and the other asks what happened, gives space, or tries to cheer them up.'
        }),
        15: Object.freeze({
            writing: 'Write 6–8 sentences about a minor accident. Use a body part, a reflexive pronoun, What happened?, Have you ever...?, and one safety warning.',
            speaking: 'Tell a 45–60 second accident story without reading. Explain the background action, what happened, who helped, and the advice you received.',
            realLife: 'Create a clinic mini-dialogue in which a patient explains an injury and a nurse asks questions and gives one Be careful warning.'
        }),
        17: Object.freeze({
            writing: 'Write 6–8 sentences comparing two products or stores. Use two comparatives, pay for, both of us, and a final purchase decision.',
            speaking: 'Speak for 45–60 seconds about two shopping options. Compare price and quality, explain who will pay, and choose the better option.',
            realLife: 'Create a buyer-and-friend mini-dialogue with a fixed budget, two alternatives, a comparison, and a shared decision.'
        }),
        19: Object.freeze({
            writing: 'Write 6–8 sentences about borrowing and lending in one practical situation. Use borrow, lend, mind + -ing, and neither or none.',
            speaking: 'Prepare a 45–60 second explanation of something you need to borrow, why you need it, when you will return it, and how you will ask politely.',
            realLife: 'Create a mini-dialogue in which someone borrows an item, negotiates a return time, and promises to pay back or replace it if necessary.'
        }),
        21: Object.freeze({
            writing: 'Write 6–8 sentences about a family or friendship habit that changed. Use used to, did not use to, become or get, and one present contrast.',
            speaking: 'Speak for 45–60 seconds about a relationship or habit in the past and how it is different now. Include a reason for the change.',
            realLife: 'Create a reunion mini-dialogue in which two people remember an old habit, notice a change, and make a new plan together.'
        }),
        23: Object.freeze({
            writing: 'Write 6–8 sentences about a fashion trend. Use in/out of fashion, stop + -ing or stop + to, and correctly distinguish die and dye.',
            speaking: 'Give a 45–60 second opinion on one current or past trend. Say who followed it, why it became popular, and whether you would try it.',
            realLife: 'Create a shop-or-closet mini-dialogue in which two people evaluate a trend and decide to keep, dye, stop wearing, or replace an item.'
        }),
        25: Object.freeze({
            writing: 'Write 6–8 sentences giving advice about an honest decision. Use should/should not, care about, say or tell, lie, and instead of + -ing.',
            speaking: 'Speak for 45–60 seconds about a difficult choice. Explain the problem, give two pieces of advice, and justify the most honest option.',
            realLife: 'Create an advice mini-dialogue in which one person considers telling a lie and the other suggests a practical alternative.'
        }),
        27: Object.freeze({
            writing: 'Write 6–8 sentences ranking three places, products, or experiences. Use at least three superlatives and give evidence for first and last place.',
            speaking: 'Give a 45–60 second best-and-worst ranking. Compare three options, name the winner, and justify it with two details.',
            realLife: 'Create a mini-dialogue in which two people use rankings to choose the best option for a trip, meal, or activity.'
        }),
        29: Object.freeze({
            writing: 'Write 6–8 sentences about next year. Include one hope, one going to plan, one will prediction, depend on, and right away/right after.',
            speaking: 'Speak for 45–60 seconds about a realistic hope and plan. Explain what you are going to do first and what result you think will happen.',
            realLife: 'Create a planning mini-dialogue in which two people discuss a prediction, identify what it depends on, and agree on one immediate action.'
        })
    });

    const PRESENTATION_EXPANSION = {
  "3": {
    "vocab": [
      [
        "landmark",
        "ponto de referência",
        "The clock tower is a useful landmark."
      ],
      [
        "station",
        "estação",
        "Meet me outside the station."
      ],
      [
        "square",
        "praça",
        "Walk across the square."
      ],
      [
        "opposite",
        "em frente a; do lado oposto",
        "The hotel is opposite the bank."
      ],
      [
        "straight ahead",
        "logo à frente",
        "The entrance is straight ahead."
      ],
      [
        "distance",
        "distância",
        "What is the distance to the station?"
      ]
    ],
    "expressions": [
      [
        "Am I going the right way?",
        "Estou indo pelo caminho certo?",
        "Use para confirmar a rota.",
        "Am I going the right way to the museum?"
      ],
      [
        "How long does it take?",
        "Quanto tempo leva?",
        "Use does + take.",
        "How long does it take on foot?"
      ]
    ]
  },
  "5": {
    "vocab": [
      [
        "fitness",
        "condicionamento físico",
        "Walking can improve your fitness."
      ],
      [
        "stretch",
        "alongamento",
        "We do a short stretch before practice."
      ],
      [
        "coach",
        "treinador",
        "The coach helps beginners."
      ],
      [
        "teammate",
        "colega de equipe",
        "My teammate practices with me."
      ],
      [
        "rest day",
        "dia de descanso",
        "Sunday is my rest day."
      ],
      [
        "training session",
        "sessão de treino",
        "The training session lasts an hour."
      ]
    ],
    "expressions": [
      [
        "at my own pace",
        "no meu próprio ritmo",
        "Use para ajustar a intensidade.",
        "I prefer to exercise at my own pace."
      ],
      [
        "take a break",
        "fazer uma pausa",
        "Use para interromper a atividade por um momento.",
        "Let us take a break after this match."
      ]
    ]
  },
  "7": {
    "vocab": [
      [
        "headline",
        "manchete",
        "This headline caught my attention."
      ],
      [
        "episode",
        "episódio",
        "The latest episode is about travel."
      ],
      [
        "review",
        "resenha; avaliação",
        "I read a review before choosing a film."
      ],
      [
        "subscription",
        "assinatura",
        "My subscription includes podcasts."
      ],
      [
        "recommendation",
        "recomendação",
        "Thanks for the recommendation."
      ],
      [
        "current events",
        "acontecimentos atuais",
        "We discuss current events at lunch."
      ]
    ],
    "expressions": [
      [
        "give it a try",
        "experimentar",
        "Use ao sugerir uma novidade.",
        "You should give this podcast a try."
      ],
      [
        "What is it about?",
        "Sobre o que é?",
        "Pergunte pelo assunto.",
        "That documentary sounds interesting. What is it about?"
      ]
    ]
  },
  "9": {
    "vocab": [
      [
        "crispy",
        "crocante",
        "The potatoes are crispy."
      ],
      [
        "creamy",
        "cremoso",
        "This sauce is very creamy."
      ],
      [
        "mild",
        "suave; pouco picante",
        "Could I have a mild curry?"
      ],
      [
        "portion",
        "porção",
        "This portion is enough for two."
      ],
      [
        "ingredient",
        "ingrediente",
        "What ingredients are in this dish?"
      ],
      [
        "vegetarian",
        "vegetariano",
        "Do you have a vegetarian option?"
      ]
    ],
    "expressions": [
      [
        "That sounds good.",
        "Isso parece bom.",
        "Reaja a uma sugestão.",
        "A mild curry? That sounds good."
      ],
      [
        "share a dish",
        "dividir um prato",
        "Use quando duas pessoas comem o mesmo pedido.",
        "We can share a dish rather than order two."
      ]
    ]
  },
  "11": {
    "vocab": [
      [
        "server",
        "garçom; atendente",
        "The server brought our menus."
      ],
      [
        "table for two",
        "mesa para dois",
        "We would like a table for two."
      ],
      [
        "booking",
        "reserva",
        "The booking is under my name."
      ],
      [
        "tap water",
        "água da torneira",
        "Could we have some tap water?"
      ],
      [
        "allergy",
        "alergia",
        "I have a peanut allergy."
      ],
      [
        "separate bills",
        "contas separadas",
        "Could we have separate bills?"
      ]
    ],
    "expressions": [
      [
        "There is a mistake with my order.",
        "Há um erro no meu pedido.",
        "Explique o problema com educação.",
        "Excuse me, there is a mistake with my order."
      ],
      [
        "Could you leave out...?",
        "Você poderia tirar...?",
        "Peça para não incluir um ingrediente.",
        "Could you leave out the onions?"
      ]
    ]
  },
  "13": {
    "vocab": [
      [
        "reliable",
        "confiável",
        "She is reliable and always calls back."
      ],
      [
        "thoughtful",
        "atencioso",
        "That was a thoughtful message."
      ],
      [
        "calm",
        "calmo",
        "He stays calm when plans change."
      ],
      [
        "sensitive",
        "sensível",
        "She is sensitive to other people's feelings."
      ],
      [
        "rude",
        "grosseiro",
        "That reply sounded rude."
      ],
      [
        "stressed",
        "estressado",
        "I feel stressed before a busy day."
      ]
    ],
    "expressions": [
      [
        "Is everything okay?",
        "Está tudo bem?",
        "Inicie uma conversa de apoio.",
        "You seem upset. Is everything okay?"
      ],
      [
        "Do you want to talk about it?",
        "Você quer conversar sobre isso?",
        "Convide sem pressionar.",
        "Do you want to talk about it, or do you need some space?"
      ]
    ]
  },
  "15": {
    "vocab": [
      [
        "injury",
        "lesão; ferimento",
        "He has an injury to his arm."
      ],
      [
        "witness",
        "testemunha",
        "A witness called for help."
      ],
      [
        "ambulance",
        "ambulância",
        "An ambulance arrived quickly."
      ],
      [
        "bandage",
        "curativo; bandagem",
        "There is a bandage on her wrist."
      ],
      [
        "slippery",
        "escorregadio",
        "The floor is slippery."
      ],
      [
        "emergency contact",
        "contato de emergência",
        "Who is your emergency contact?"
      ]
    ],
    "expressions": [
      [
        "Are you all right?",
        "Você está bem?",
        "Verifique como alguém está.",
        "You fell over. Are you all right?"
      ],
      [
        "Stay where you are.",
        "Fique onde está.",
        "Use ao combinar ajuda ou localização.",
        "I can see the entrance. Stay where you are."
      ]
    ]
  },
  "17": {
    "vocab": [
      [
        "affordable",
        "acessível; que cabe no orçamento",
        "This model is more affordable."
      ],
      [
        "expensive",
        "caro",
        "The leather bag is too expensive."
      ],
      [
        "warranty",
        "garantia",
        "Does it come with a warranty?"
      ],
      [
        "refund",
        "reembolso",
        "Can I ask for a refund?"
      ],
      [
        "budget",
        "orçamento",
        "My budget is eighty dollars."
      ],
      [
        "delivery fee",
        "taxa de entrega",
        "Is there a delivery fee?"
      ]
    ],
    "expressions": [
      [
        "Does that include delivery?",
        "Isso inclui a entrega?",
        "Confirme o custo total.",
        "The price is sixty dollars. Does that include delivery?"
      ],
      [
        "I will take it.",
        "Vou levar.",
        "Confirme a compra.",
        "It is within my budget. I will take it."
      ]
    ]
  },
  "19": {
    "vocab": [
      [
        "deadline",
        "prazo final",
        "We need to agree on a deadline."
      ],
      [
        "permission",
        "permissão",
        "Ask for permission before using it."
      ],
      [
        "favor",
        "favor",
        "Could you do me a favor?"
      ],
      [
        "amount",
        "quantia",
        "It is a small amount of money."
      ],
      [
        "agreement",
        "acordo",
        "Our agreement is to return it on Friday."
      ],
      [
        "replacement",
        "substituto; reposição",
        "I can bring a replacement tomorrow."
      ]
    ],
    "expressions": [
      [
        "Could you do me a favor?",
        "Você poderia me fazer um favor?",
        "Introduza um pedido.",
        "Could you do me a favor and lend me your charger?"
      ],
      [
        "by the end of the day",
        "até o fim do dia",
        "Defina um prazo claro.",
        "I will return it by the end of the day."
      ]
    ]
  },
  "21": {
    "vocab": [
      [
        "reunion",
        "reencontro",
        "We met at a family reunion."
      ],
      [
        "schoolmate",
        "colega de escola",
        "My old schoolmate lives nearby."
      ],
      [
        "bond",
        "vínculo",
        "We have a strong bond."
      ],
      [
        "tradition",
        "tradição",
        "Sunday lunch is a family tradition."
      ],
      [
        "hometown",
        "cidade natal",
        "I visit my hometown every year."
      ],
      [
        "shared interest",
        "interesse em comum",
        "Music is one of our shared interests."
      ]
    ],
    "expressions": [
      [
        "We have a lot in common.",
        "Temos muito em comum.",
        "Fale de interesses compartilhados.",
        "We both enjoy hiking. We have a lot in common."
      ],
      [
        "We lost touch.",
        "Perdemos contato.",
        "Explique uma pausa na relação.",
        "We lost touch after school, but we met again last year."
      ]
    ]
  },
  "23": {
    "vocab": [
      [
        "striped",
        "listrado",
        "The striped shirt goes with these trousers."
      ],
      [
        "plain",
        "liso; sem estampa",
        "I prefer a plain T-shirt."
      ],
      [
        "loose",
        "folgado",
        "These trousers are too loose."
      ],
      [
        "tight",
        "apertado",
        "The jacket feels tight."
      ],
      [
        "occasion",
        "ocasião",
        "What is the occasion?"
      ],
      [
        "second-hand",
        "de segunda mão",
        "I bought a second-hand coat."
      ]
    ],
    "expressions": [
      [
        "Does this suit me?",
        "Isso combina comigo?",
        "Peça opinião sobre aparência.",
        "Does this color suit me?"
      ],
      [
        "dress up",
        "vestir-se de forma mais elegante",
        "Use para uma ocasião especial.",
        "We are going to dress up for the dinner."
      ]
    ]
  },
  "25": {
    "vocab": [
      [
        "option",
        "opção",
        "Let's consider another option."
      ],
      [
        "trust",
        "confiança",
        "It takes time to build trust."
      ],
      [
        "apology",
        "pedido de desculpas",
        "She accepted his apology."
      ],
      [
        "privacy",
        "privacidade",
        "We should respect his privacy."
      ],
      [
        "risk",
        "risco",
        "What is the risk of waiting?"
      ],
      [
        "point of view",
        "ponto de vista",
        "Try to understand her point of view."
      ]
    ],
    "expressions": [
      [
        "If I were you,...",
        "Se eu fosse você,...",
        "Use como bloco para dar uma sugestão.",
        "If I were you, I would talk to her first."
      ],
      [
        "It is up to you.",
        "Você decide.",
        "Respeite a escolha da outra pessoa.",
        "I can explain the options, but it is up to you."
      ]
    ]
  },
  "27": {
    "vocab": [
      [
        "attraction",
        "atração",
        "Which attraction is worth visiting?"
      ],
      [
        "queue",
        "fila",
        "The queue was longer than expected."
      ],
      [
        "highlight",
        "ponto alto",
        "The boat trip was the highlight."
      ],
      [
        "accommodation",
        "hospedagem",
        "Our accommodation was close to the beach."
      ],
      [
        "crowded",
        "lotado",
        "The square is very crowded."
      ],
      [
        "peaceful",
        "tranquilo",
        "The garden is the most peaceful place here."
      ]
    ],
    "expressions": [
      [
        "What would you recommend?",
        "O que você recomendaria?",
        "Peça uma indicação.",
        "We have one afternoon. What would you recommend?"
      ],
      [
        "avoid the crowds",
        "evitar as multidões",
        "Use ao planejar horário ou local.",
        "Go early to avoid the crowds."
      ]
    ]
  },
  "29": {
    "vocab": [
      [
        "progress",
        "progresso",
        "I can see my progress."
      ],
      [
        "habit",
        "hábito",
        "I want to build a new habit."
      ],
      [
        "schedule",
        "agenda; programação",
        "It depends on my schedule."
      ],
      [
        "obstacle",
        "obstáculo",
        "Time is my biggest obstacle."
      ],
      [
        "first step",
        "primeiro passo",
        "My first step is to make a plan."
      ],
      [
        "backup plan",
        "plano alternativo",
        "We need a backup plan if it rains."
      ]
    ],
    "expressions": [
      [
        "one step at a time",
        "um passo de cada vez",
        "Use para tornar um plano viável.",
        "I am going to change my routine one step at a time."
      ],
      [
        "stick to the plan",
        "seguir o plano",
        "Use para falar de consistência.",
        "It is easier to stick to the plan with a friend."
      ]
    ]
  }
};

    const OHE_ENRICHMENT = {
        1: {
            lab: [
                ['How are you doing?', ['How are you doing after the long flight?', 'Hi, Paula! How are you doing?'], 'Como você está depois da viagem?', 'How are you doing after the trip?'],
                ['most of the time', ['We stayed outdoors most of the time.', 'Most of the time, the weather was pleasant.'], 'Na maior parte do tempo, nós caminhamos pela cidade.', 'Most of the time, we walked around the city.'],
                ['the whole time', ['The children slept the whole time.', 'It was windy the whole time we were there.'], 'Ela ficou no hotel o tempo todo.', 'She stayed at the hotel the whole time.'],
                ['at least', ['The train was late, but at least it was comfortable.', 'At least we had one sunny afternoon.'], 'Pelo menos nós não perdemos o voo.', 'At least we did not miss the flight.'],
                ['as usual', ['The beach was crowded, as usual.', 'He arrived early, as usual.'], 'Como de costume, fez frio à noite.', 'It was cold at night, as usual.'],
                ['take a picture', ['Can you take a picture of us?', 'She took a picture from the top of the hill.'], 'Você tirou uma foto do castelo?', 'Did you take a picture of the castle?'],
                ['take a trip', ['They are going to take a trip in October.', 'We took a short trip to the coast.'], 'Nós fizemos uma viagem curta no fim de semana.', 'We took a short trip on the weekend.'],
                ['go camping', ['My cousins go camping every summer.', 'We went camping near a lake.'], 'Você quer ir acampar nas férias?', 'Do you want to go camping on vacation?'],
                ['go fishing', ['My grandfather goes fishing on Sundays.', 'They went fishing before breakfast.'], 'Nós fomos pescar perto do rio.', 'We went fishing near the river.'],
                ['have a picnic', ['Let us have a picnic in the park.', 'We had a picnic despite the cool weather.'], 'Eles fizeram um piquenique perto do lago.', 'They had a picnic near the lake.']
            ],
            dialogues: [
                [['Friend', 'Welcome back! How are you doing after the long flight?'], ['Traveler', 'Pretty well, thanks. I am tired, but the trip was fantastic.'], ['Friend', 'What was the weather like in Scotland?'], ['Traveler', 'It was cool most of the time and foggy in the mornings.'], ['Friend', 'Did you stay in Glasgow the whole time?'], ['Traveler', 'No. I took a short trip to Edinburgh and visited the castle.'], ['Friend', 'Did you take many pictures?'], ['Traveler', 'Yes, and at least one of them is good enough to frame.']],
                [['Friend', 'What do you usually do on vacation?'], ['Traveler', 'I usually go camping with my cousins.'], ['Friend', 'Do you stay at the campsite the whole time?'], ['Traveler', 'Not always. We go fishing or take a trip to a nearby town.'], ['Friend', 'What do you do when the weather is warm?'], ['Traveler', 'We have a picnic by the lake, as usual.'], ['Friend', 'That sounds relaxing. Can I come next summer?'], ['Traveler', 'Of course. At least you already have a tent!']]
            ]
        },
        5: {
            lab: [
                ['How good are you at...?', ['How good are you at playing volleyball?', 'How good is Mia at running long distances?'], 'Quão bom você é em andar de bicicleta?', 'How good are you at cycling?'],
                ['not bad at all', ['Your serve is not bad at all.', 'For a beginner, I am not bad at all.'], 'Meu tempo não foi nada mal.', 'My time was not bad at all.'],
                ['be out of shape', ['I felt out of shape after the holidays.', 'He is out of shape because he stopped training.'], 'Estou um pouco fora de forma agora.', 'I am a little out of shape now.'],
                ['get in shape', ['Walking every day helped me get in shape.', 'She joined a gym to get in shape.'], 'Ele quer entrar em forma antes da corrida.', 'He wants to get in shape before the race.'],
                ['twice a week', ['We play basketball twice a week.', 'She goes swimming twice a week.'], 'Eu faço ioga duas vezes por semana.', 'I do yoga twice a week.'],
                ['warm up', ['The team warmed up before the game.', 'Warm up for five minutes before you run.'], 'Precisamos aquecer antes do treino.', 'We need to warm up before the workout.'],
                ['at my own pace', ['I learn the exercises at my own pace.', 'Let me run at my own pace today.'], 'Prefiro treinar no meu próprio ritmo.', 'I prefer to work out at my own pace.'],
                ['take a break', ['You look tired. Take a break.', 'We took a short break between games.'], 'Vamos fazer uma pausa depois desta série.', 'Let us take a break after this set.']
            ],
            dialogues: [
                [['Maya', 'What do you usually do to stay active?'], ['Leo', 'I go running twice a week, but I am a little out of shape.'], ['Maya', 'That is a good start. Do you warm up before you run?'], ['Leo', 'Not always. I usually start slowly and continue at my own pace.'], ['Maya', 'A short warm-up can help prevent injuries.'], ['Leo', 'Good point. How long should I exercise today?'], ['Maya', 'Try twenty minutes, then take a break and see how you feel.'], ['Leo', 'Great. I want to get in shape without doing too much too soon.']],
                [['Maya', 'How good are you at volleyball?'], ['Leo', 'I am not bad at all, but my serve needs work.'], ['Maya', 'We practice at the community center twice a week.'], ['Leo', 'Is the group okay for beginners?'], ['Maya', 'Yes. Everyone can train at their own pace.'], ['Leo', 'Do you warm up together before practice?'], ['Maya', 'We do, and we take a break halfway through.'], ['Leo', 'That sounds perfect. Can I join you on Thursday?']]
            ]
        },
        7: {
            lab: [
                ['What kind of...?', ['What kind of books do you read?', 'What kind of podcasts does she enjoy?'], 'Que tipo de série você assiste?', 'What kind of series do you watch?'],
                ['be interested in', ['He is interested in learning about history.', 'Are you interested in joining the book club?'], 'Ela tem interesse em fotografia de rua.', 'She is interested in street photography.'],
                ['kind of', ['I am kind of tired tonight.', 'The first episode was kind of slow.'], 'Esse livro é meio difícil.', 'This book is kind of difficult.'],
                ['be into', ['I am really into science fiction.', 'They are into playing board games.'], 'Meu irmão curte música eletrônica.', 'My brother is into electronic music.'],
                ['keep up with', ['It is hard to keep up with all the new films.', 'She keeps up with her favorite artists online.'], 'Eu acompanho as notícias de tecnologia.', 'I keep up with technology news.'],
                ['in my free time', ['In my free time, I draw and listen to music.', 'He studies Italian in his free time.'], 'Eu gosto de cozinhar no meu tempo livre.', 'I like cooking in my free time.'],
                ['give it a try', ['The class is free, so give it a try.', 'I was unsure about the game, but I gave it a try.'], 'Esse podcast parece bom; vou experimentar.', 'That podcast sounds good; I will give it a try.'],
                ['What is it about?', ['You recommended that book. What is it about?', 'This film looks unusual. What is it about?'], 'Você gosta dessa série. Sobre o que é?', 'You like that series. What is it about?']
            ],
            dialogues: [
                [['Nina', 'What kind of podcasts do you listen to?'], ['Omar', 'Mostly science and technology. I like to keep up with new ideas.'], ['Nina', 'I am kind of new to podcasts. Which one should I start with?'], ['Omar', 'There is a short series called Future Everyday.'], ['Nina', 'What is it about?'], ['Omar', 'It explains how technology changes ordinary life.'], ['Nina', 'That sounds interesting. I will give it a try.'], ['Omar', 'Great. Tell me what you think after the first episode.']],
                [['Omar', 'What do you do in your free time?'], ['Nina', 'I am into street photography, especially at night.'], ['Omar', 'How did you become interested in that?'], ['Nina', 'A friend invited me on a photo walk last year.'], ['Omar', 'Do I need an expensive camera to start?'], ['Nina', 'Not at all. You can use your phone and learn at your own pace.'], ['Omar', 'The technical side seems kind of difficult.'], ['Nina', 'Come with us on Saturday and give it a try.']]
            ]
        },
        9: {
            lab: [
                ['feel like', ['Do you feel like cooking tonight?', 'I feel like something warm and spicy.'], 'Estou com vontade de comer massa.', 'I feel like having pasta.'],
                ['So do I.', ['I enjoy Thai food. — So do I.', 'I usually order tea. — So do I.'], 'Eu adoro sobremesas. — Eu também.', 'I love desserts. — So do I.'],
                ['Neither do I.', ['I do not drink soda. — Neither do I.', 'I do not like raw onions. — Neither do I.'], 'Eu não como carne. — Eu também não.', 'I do not eat meat. — Neither do I.'],
                ['rather than', ['Let us walk rather than take a taxi.', 'She ordered fruit rather than cake.'], 'Vou pedir arroz em vez de batata frita.', 'I will have rice rather than fries.'],
                ['be in the mood for', ['Are you in the mood for pizza?', 'I am not in the mood for anything heavy.'], 'Estamos a fim de comida mexicana.', 'We are in the mood for Mexican food.'],
                ['eat out', ['We rarely eat out during the week.', 'They ate out to celebrate her birthday.'], 'Vamos comer fora hoje à noite.', 'Let us eat out tonight.'],
                ['That sounds good.', ['We could share a pizza. — That sounds good.', 'How about soup and bread? — That sounds good.'], 'Podemos pedir um curry suave. — Isso parece bom.', 'We can order a mild curry. — That sounds good.'],
                ['share a dish', ['Would you like to share a dish?', 'We shared a dish because the portions were large.'], 'Podemos dividir um prato principal.', 'We can share a main dish.']
            ],
            dialogues: [
                [['Lena', 'Do you feel like eating out tonight?'], ['Ravi', 'Yes. I am in the mood for something spicy.'], ['Lena', 'So am I. How about the new Thai restaurant?'], ['Ravi', 'That sounds good, but I do not eat seafood.'], ['Lena', 'Neither do I. They have several vegetable dishes.'], ['Ravi', 'Great. We could share a curry rather than order two.'], ['Lena', 'Good idea. The portions look large.'], ['Ravi', 'Let us book a table for seven, then.']],
                [['Ravi', 'What do you feel like having for lunch?'], ['Lena', 'Something light. I am not in the mood for a big meal.'], ['Ravi', 'Neither am I. Would you like soup or salad?'], ['Lena', 'Soup sounds better, especially on a cold day.'], ['Ravi', 'There is a café nearby that makes tomato soup.'], ['Lena', 'Perfect. Do they have fresh bread too?'], ['Ravi', 'Yes. We can share a sandwich rather than order two.'], ['Lena', 'That sounds good. Let us go before it gets busy.']]
            ]
        },
        11: {
            lab: [
                ['Would you like...?', ['Would you like a table by the window?', 'Would you like to hear today\'s specials?'], 'Você gostaria de água com gás?', 'Would you like sparkling water?'],
                ['I would like...', ['I would like the vegetable curry.', 'I would like to make a reservation for two.'], 'Eu gostaria da sopa do dia.', 'I would like the soup of the day.'],
                ['Are you ready to order?', ['Are you ready to order, or do you need more time?', 'I will come back when you are ready to order.'], 'Vocês estão prontos para pedir?', 'Are you ready to order?'],
                ['anything else', ['Can I bring you anything else?', 'We do not need anything else, thank you.'], 'Vocês precisam de mais alguma coisa?', 'Do you need anything else?'],
                ['Could we have the bill?', ['Could we have the bill when you have a moment?', 'Excuse me, could we have the bill, please?'], 'Poderia trazer a conta separada?', 'Could we have separate bills?'],
                ['without', ['I will have the sandwich without cheese.', 'Can I get the sauce without garlic?'], 'Quero a salada sem tomate.', 'I would like the salad without tomatoes.'],
                ['There is a mistake with my order.', ['There is a mistake with my order; I asked for soup.', 'Excuse me, there is a mistake with our order.'], 'Há um erro no meu pedido: pedi peixe.', 'There is a mistake with my order: I ordered fish.'],
                ['Could you leave out...?', ['Could you leave out the chili?', 'Could you leave out the nuts, please?'], 'Você poderia tirar o queijo?', 'Could you leave out the cheese?']
            ],
            dialogues: [
                [['Server', 'Good evening. Would you like a table by the window?'], ['Guest', 'Yes, please. A table for two would be perfect.'], ['Server', 'Here are the menus. Would you like something to drink?'], ['Guest', 'I would like sparkling water, please.'], ['Server', 'Of course. Are you ready to order, or do you need more time?'], ['Guest', 'We are ready. I would like the grilled fish without the cream sauce.'], ['Server', 'Certainly. Would you like anything else?'], ['Guest', 'A green salad, please. Could you leave out the onions?']],
                [['Guest', 'Excuse me, there is a mistake with my order.'], ['Server', 'I am sorry. What did you order?'], ['Guest', 'I ordered the vegetable pasta, but this one has chicken.'], ['Server', 'You are right. I will replace it immediately.'], ['Guest', 'Thank you. Could you also bring some water?'], ['Server', 'Of course. Is there anything else I can do?'], ['Guest', 'No, thank you. Could we have the bill after the pasta arrives?'], ['Server', 'Certainly, and I will remove the wrong dish from the bill.']]
            ]
        },
        13: {
            lab: [
                ['be in a good mood', ['The whole team is in a good mood today.', 'I am usually in a good mood after a walk.'], 'Ela está de bom humor esta manhã.', 'She is in a good mood this morning.'],
                ['be in a bad mood', ['Do not take it personally; he is in a bad mood.', 'I was in a bad mood after the long meeting.'], 'Por que você está de mau humor?', 'Why are you in a bad mood?'],
                ['be in the mood for', ['We are in the mood for a comedy.', 'He is not in the mood for a long conversation.'], 'Estou a fim de uma noite tranquila.', 'I am in the mood for a quiet evening.'],
                ['smile at', ['The baby smiled at everyone.', 'She smiled at me across the room.'], 'Ele sorriu para a nova colega.', 'He smiled at the new coworker.'],
                ['give someone space', ['She looks overwhelmed, so give her some space.', 'Sometimes I need to give myself space to think.'], 'Vamos dar um pouco de espaço a ele.', 'Let us give him some space.'],
                ['cheer up', ['A funny message cheered me up.', 'Cheer up! Tomorrow will be easier.'], 'Esse filme sempre me anima.', 'This movie always cheers me up.'],
                ['Is everything okay?', ['You seem distracted. Is everything okay?', 'Is everything okay at home?'], 'Você está muito quieta. Está tudo bem?', 'You are very quiet. Is everything okay?'],
                ['Do you want to talk about it?', ['You look worried. Do you want to talk about it?', 'I am here if you want to talk about it.'], 'Você parece chateado. Quer conversar sobre isso?', 'You seem upset. Do you want to talk about it?']
            ],
            dialogues: [
                [['Alex', 'You have been very quiet today. Is everything okay?'], ['Clara', 'I had a difficult morning, and I am in a bad mood.'], ['Alex', 'I am sorry. Do you want to talk about it?'], ['Clara', 'Not right now. I think I need a little space.'], ['Alex', 'Of course. I will be in the kitchen if you need me.'], ['Clara', 'Thanks for understanding and not taking it personally.'], ['Alex', 'No problem. Maybe we can watch a comedy later to cheer you up.'], ['Clara', 'That might help. I may be in the mood for one after dinner.']],
                [['Clara', 'Your new coworker smiled at everyone during the meeting.'], ['Alex', 'Yes, Sam is usually cheerful and easy to talk to.'], ['Clara', 'Was Sam in a good mood even during the busy afternoon?'], ['Alex', 'Mostly, but I could see that the pressure was difficult.'], ['Clara', 'Did you ask if everything was okay?'], ['Alex', 'I did. Sam wanted to finish the task before talking.'], ['Clara', 'It was thoughtful of you to give Sam some space.'], ['Alex', 'Later we had coffee, and the conversation cheered us both up.']]
            ]
        },
        15: {
            lab: [
                ['What happened?', ['You look worried. What happened?', 'What happened near the entrance?'], 'Você está mancando. O que aconteceu?', 'You are limping. What happened?'],
                ['What happened to...?', ['What happened to your shoulder?', 'What happened to the bicycle?'], 'O que aconteceu com o braço dela?', 'What happened to her arm?'],
                ['Have you ever...?', ['Have you ever needed stitches?', 'Have you ever fallen off a bike?'], 'Você já machucou o tornozelo?', 'Have you ever hurt your ankle?'],
                ['Be careful!', ['Be careful! That knife is sharp.', 'Be careful when you walk down the wet stairs.'], 'Cuidado! O chão está escorregadio.', 'Be careful! The floor is slippery.'],
                ['hurt yourself', ['He hurt himself while lifting a box.', 'Be careful not to hurt yourself.'], 'Ela se machucou durante o treino.', 'She hurt herself during practice.'],
                ['call for help', ['Call for help if the pain gets worse.', 'A neighbor heard the noise and called for help.'], 'Ele caiu e pediu ajuda.', 'He fell and called for help.'],
                ['Are you all right?', ['That was a hard fall. Are you all right?', 'Are you all right, or should I call someone?'], 'Você bateu a cabeça. Está bem?', 'You hit your head. Are you all right?'],
                ['Stay where you are.', ['Stay where you are; I am coming to you.', 'If you feel dizzy, stay where you are.'], 'Fique onde está; vou buscar ajuda.', 'Stay where you are; I will get help.']
            ],
            dialogues: [
                [['Riley', 'Excuse me, could you help me? I fell near the bridge.'], ['Sam', 'Of course. Are you all right?'], ['Riley', 'I think so, but my ankle hurts when I stand.'], ['Sam', 'Stay where you are. Do not try to walk yet.'], ['Riley', 'Should we call for help?'], ['Sam', 'Yes. I will call the park office and explain what happened.'], ['Riley', 'Thank you. I was running too fast on the wet path.'], ['Sam', 'The ground is slippery today. Be careful when you move your foot.']],
                [['Riley', 'What happened to your hand?'], ['Sam', 'I cut myself while I was preparing dinner.'], ['Riley', 'That looks painful. Have you ever had a cut like that before?'], ['Sam', 'No, but I cleaned it and put on a bandage right away.'], ['Riley', 'Are you all right now?'], ['Sam', 'Yes. It is not deep, but I need to be more careful.'], ['Riley', 'Do you want me to finish cutting the vegetables?'], ['Sam', 'Please. I do not want to hurt myself again tonight.']]
            ]
        },
        17: {
            lab: [
                ['How much does it cost?', ['How much does the larger suitcase cost?', 'This lamp has no price tag. How much does it cost?'], 'Quanto custa este par de sapatos?', 'How much does this pair of shoes cost?'],
                ['pay for', ['Who is going to pay for the tickets?', 'I paid for the repair by card.'], 'Ela pagou pelo presente.', 'She paid for the gift.'],
                ['both of us', ['This table is big enough for both of us.', 'The store gave both of us a discount.'], 'Esse horário funciona para nós dois.', 'This time works for both of us.'],
                ['on sale', ['All winter coats are on sale.', 'I bought this laptop when it was on sale.'], 'A mochila azul está em promoção.', 'The blue backpack is on sale.'],
                ['good value', ['The basic model is good value.', 'This hotel is good value for families.'], 'Esse casaco parece ter bom custo-benefício.', 'This coat looks like good value.'],
                ['try on', ['Where can I try on this jacket?', 'She tried the shoes on before buying them.'], 'Posso experimentar o tamanho menor?', 'Can I try on the smaller size?'],
                ['Does that include delivery?', ['The desk costs two hundred dollars. Does that include delivery?', 'Does that price include delivery and installation?'], 'Custa oitenta reais. Isso inclui a entrega?', 'It costs eighty reais. Does that include delivery?'],
                ['I will take it.', ['The size is right, so I will take it.', 'If the warranty is included, I will take it.'], 'Está dentro do meu orçamento. Vou levar.', 'It is within my budget. I will take it.']
            ],
            dialogues: [
                [['Mia', 'Excuse me, how much does this blue jacket cost?'], ['Noah', 'It is eighty dollars, and it is on sale today.'], ['Mia', 'Can I try on the medium size?'], ['Noah', 'Certainly. The fitting rooms are next to the mirrors.'], ['Mia', 'The fit is good, but is the fabric durable?'], ['Noah', 'Yes. It is more durable than the gray one and good value.'], ['Mia', 'Great. Can I pay by card?'], ['Noah', 'Of course.'], ['Mia', 'Then I will take it.']],
                [['Mia', 'Which desk do you think is better for our office?'], ['Noah', 'The larger one works for both of us, but it costs more.'], ['Mia', 'How much does it cost?'], ['Noah', 'It is two hundred and forty dollars.'], ['Mia', 'Does that include delivery?'], ['Noah', 'No, delivery is another twenty dollars.'], ['Mia', 'The smaller desk is on sale and includes delivery.'], ['Noah', 'Then it may be better value. Let us take that one.']]
            ]
        },
        19: {
            lab: [
                ['Can I borrow...?', ['Can I borrow your notes after class?', 'Could I borrow this book for the weekend?'], 'Posso pegar seu guarda-chuva emprestado?', 'Can I borrow your umbrella?'],
                ['lend someone something', ['My neighbor lent me a ladder.', 'Could you lend Ana your dictionary?'], 'Você pode me emprestar dez reais?', 'Could you lend me ten reais?'],
                ['Neither of them', ['Neither of them has the correct charger.', 'I tried two coats, but neither of them fit.'], 'Nenhum dos dois está disponível hoje.', 'Neither of them is available today.'],
                ['None of them', ['I checked four stores, but none of them had it.', 'None of them wants to wait.'], 'Nenhum deles aceita cartão.', 'None of them accepts cards.'],
                ['I do not mind + -ing', ['I do not mind sharing the room.', 'She does not mind waiting a few minutes.'], 'Eu não me importo de devolver amanhã.', 'I do not mind returning it tomorrow.'],
                ['pay back', ['I can pay you back on Friday.', 'He paid me back as soon as he got his salary.'], 'Vou te pagar de volta depois do almoço.', 'I will pay you back after lunch.'],
                ['Could you do me a favor?', ['Could you do me a favor and hold this bag?', 'Could you do me a favor before you leave?'], 'Você poderia me fazer um favor e imprimir isto?', 'Could you do me a favor and print this?'],
                ['by the end of the day', ['Please send the file by the end of the day.', 'I can return the keys by the end of the day.'], 'Vou devolver o carregador até o fim do dia.', 'I will return the charger by the end of the day.']
            ],
            dialogues: [
                [['Ben', 'Could you do me a favor? My phone battery is almost dead.'], ['Aisha', 'Sure. What do you need?'], ['Ben', 'Can I borrow your charger during the meeting?'], ['Aisha', 'Of course. I do not mind lending it to you.'], ['Ben', 'Thanks. I will return it by the end of the day.'], ['Aisha', 'That is fine, but please leave it on my desk.'], ['Ben', 'I will. Do you need your power bank too?'], ['Aisha', 'No. I brought two, and neither of them is empty.']],
                [['Aisha', 'Could you lend me twenty dollars for lunch?'], ['Ben', 'I only have ten in cash, but you can borrow that.'], ['Aisha', 'Thanks. I will pay you back tomorrow morning.'], ['Ben', 'No hurry. I do not mind waiting until Friday.'], ['Aisha', 'I checked three payment apps, but none of them is working.'], ['Ben', 'The café may accept a bank transfer.'], ['Aisha', 'I asked. Neither of the two accounts worked.'], ['Ben', 'Then take the cash. We can solve the rest later.']]
            ]
        },
        21: {
            lab: [
                ['used to', ['My sister and I used to share a room.', 'Did you use to visit your grandparents every weekend?'], 'Nós costumávamos conversar por horas.', 'We used to talk for hours.'],
                ['be used to', ['He is used to living alone.', 'I am not used to such a large family dinner.'], 'Ela está acostumada com o barulho das crianças.', 'She is used to the noise from the children.'],
                ['get used to', ['You will get used to the new routine.', 'It took me time to get used to sharing an office.'], 'Estou me acostumando a morar longe da família.', 'I am getting used to living far from my family.'],
                ['grow up together', ['We grew up together in a small town.', 'They grew up together and still meet every month.'], 'Meus primos e eu crescemos juntos.', 'My cousins and I grew up together.'],
                ['keep in touch', ['Let us keep in touch after the course.', 'I keep in touch with my childhood friends online.'], 'Você ainda mantém contato com ela?', 'Do you still keep in touch with her?'],
                ['be there for someone', ['My best friend was there for me during a difficult year.', 'Families can be there for one another in different ways.'], 'Quero estar presente para meu irmão.', 'I want to be there for my brother.'],
                ['We have a lot in common.', ['We both love old films; we have a lot in common.', 'Although we have a lot in common, we do not agree on everything.'], 'Nós dois gostamos de viajar. Temos muito em comum.', 'We both like traveling. We have a lot in common.'],
                ['We lost touch.', ['We lost touch when she moved abroad.', 'After college, we lost touch for several years.'], 'Nós perdemos contato depois da escola.', 'We lost touch after school.']
            ],
            dialogues: [
                [['Maya', 'How do you know Sofia?'], ['Daniel', 'We grew up together and used to live on the same street.'], ['Maya', 'Do you still keep in touch?'], ['Daniel', 'Yes. We message each other every week.'], ['Maya', 'You must have a lot in common.'], ['Daniel', 'We do, especially music and hiking.'], ['Maya', 'Has she always been there for you?'], ['Daniel', 'Absolutely. She supported me when I moved to a new city.']],
                [['Daniel', 'I saw a photo of your cousin online. Are you close?'], ['Maya', 'We used to be, but we lost touch after university.'], ['Daniel', 'Would you like to contact her again?'], ['Maya', 'Yes, but I am not used to starting conversations after so long.'], ['Daniel', 'You will get used to it once you send the first message.'], ['Maya', 'Maybe I can mention that we grew up together.'], ['Daniel', 'Exactly. Tell her you would like to keep in touch again.'], ['Maya', 'I will. It is important to be there for family.']]
            ]
        },
        23: {
            lab: [
                ['in fashion', ['Bright colors are in fashion this season.', 'Are leather jackets still in fashion?'], 'Calças largas estão na moda novamente.', 'Wide pants are in fashion again.'],
                ['out of fashion', ['That cut went out of fashion years ago.', 'Some trends go out of fashion very quickly.'], 'Esse tipo de chapéu está fora de moda.', 'That kind of hat is out of fashion.'],
                ['come back into fashion', ['Old sneakers have come back into fashion.', 'That pattern may come back into fashion next year.'], 'As jaquetas curtas voltaram à moda.', 'Short jackets have come back into fashion.'],
                ['try on', ['I would like to try on the black dress.', 'Try these trousers on and check the length.'], 'Ela experimentou três casacos.', 'She tried on three coats.'],
                ['go with', ['This belt goes with your shoes.', 'Which shirt goes with these trousers?'], 'Essa bolsa combina com o vestido azul.', 'This bag goes with the blue dress.'],
                ['instead of', ['I wore sneakers instead of formal shoes.', 'Repair the zipper instead of replacing the jacket.'], 'Vou usar uma saia em vez de calça.', 'I will wear a skirt instead of trousers.'],
                ['Does this suit me?', ['I like the color, but does it suit me?', 'Does this shorter haircut suit me?'], 'Este estilo combina comigo?', 'Does this style suit me?'],
                ['dress up', ['We need to dress up for the wedding.', 'He enjoys dressing up for special events.'], 'Vamos nos vestir de forma elegante para o jantar.', 'We are going to dress up for dinner.']
            ],
            dialogues: [
                [['Lia', 'Excuse me, can I try on this green jacket?'], ['Tom', 'Of course. The fitting room is on your left.'], ['Lia', 'I like the color, but does this style suit me?'], ['Tom', 'Yes, and it goes well with the trousers you are wearing.'], ['Lia', 'Are shorter jackets still in fashion?'], ['Tom', 'They have come back into fashion this year.'], ['Lia', 'Maybe I will choose this instead of the longer one.'], ['Tom', 'Good choice. The shorter one also fits you better.']],
                [['Lia', 'Do we need to dress up for the company dinner?'], ['Tom', 'A little. I am going to wear a dark shirt and smart trousers.'], ['Lia', 'I was thinking of wearing sneakers instead of heels.'], ['Tom', 'That could work if the sneakers go with your dress.'], ['Lia', 'They are simple and white. Are those still in fashion?'], ['Tom', 'Yes, and comfort never really goes out of fashion.'], ['Lia', 'True. I will try the whole outfit on tonight.'], ['Tom', 'Send me a picture if you want a second opinion.']]
            ]
        },
        25: {
            lab: [
                ['What should I do?', ['I made a mistake at work. What should I do?', 'The two options are good. What should I do?'], 'Perdi o prazo. O que eu deveria fazer?', 'I missed the deadline. What should I do?'],
                ['You should...', ['You should speak to her in person.', 'You should write down the advantages and disadvantages.'], 'Você deveria pedir desculpas primeiro.', 'You should apologize first.'],
                ['care about', ['I care about keeping our friendship strong.', 'He cares about what his team thinks.'], 'Ela se importa em fazer um trabalho honesto.', 'She cares about doing honest work.'],
                ['tell the truth', ['It is difficult, but you need to tell the truth.', 'He finally told the truth about the mistake.'], 'Você deveria contar a verdade ao seu chefe.', 'You should tell your boss the truth.'],
                ['instead of', ['Call her instead of sending another text.', 'Let us look for a solution instead of blaming someone.'], 'Converse com ele em vez de discutir.', 'Talk to him instead of arguing.'],
                ['think it over', ['You do not have to decide today; think it over.', 'She thought the offer over before answering.'], 'Vou pensar melhor antes de responder.', 'I will think it over before I answer.'],
                ['If I were you,...', ['If I were you, I would ask for more time.', 'If I were you, I would listen before giving advice.'], 'Se eu fosse você, falaria com ela amanhã.', 'If I were you, I would talk to her tomorrow.'],
                ['It is up to you.', ['I can share my opinion, but it is up to you.', 'You can stay or leave; it is up to you.'], 'A decisão é sua.', 'It is up to you.']
            ],
            dialogues: [
                [['Ana', 'I forgot my friend\'s birthday. What should I do?'], ['Luis', 'If I were you, I would call her and tell the truth.'], ['Ana', 'Should I send a message instead of calling?'], ['Luis', 'A call feels more personal, especially if you care about the friendship.'], ['Ana', 'You are right. I should apologize without making excuses.'], ['Luis', 'Exactly, and you could invite her to lunch this weekend.'], ['Ana', 'I will think it over and call her tonight.'], ['Luis', 'Good plan, but the final choice is up to you.']],
                [['Luis', 'My manager offered me a new position, but it means longer hours.'], ['Ana', 'That is a big decision. What matters most to you?'], ['Luis', 'I care about growing professionally, but I also need family time.'], ['Ana', 'You should ask whether the schedule is flexible.'], ['Luis', 'Should I answer today or ask for more time?'], ['Ana', 'If I were you, I would ask for two days to think it over.'], ['Luis', 'That sounds sensible instead of deciding under pressure.'], ['Ana', 'Exactly. Gather the facts, and then it is up to you.']]
            ]
        },
        27: {
            lab: [
                ['the best...in', ['This is the best bakery in the neighborhood.', 'Which is the best beach in the region?'], 'É o melhor hotel da cidade.', 'It is the best hotel in the city.'],
                ['the worst part', ['The worst part was waiting in the rain.', 'What was the worst part of the journey?'], 'O barulho foi a pior parte.', 'The noise was the worst part.'],
                ['one of the best', ['That was one of the best concerts I have seen.', 'It is one of the best parks for children.'], 'Este é um dos melhores cafés da região.', 'This is one of the best cafés in the area.'],
                ['by far', ['The morning tour was by far the least crowded.', 'This is by far the most comfortable chair.'], 'Foi de longe a melhor opção.', 'It was by far the best option.'],
                ['the least', ['Monday is the least busy day.', 'Which route is the least expensive?'], 'Esta sala é a menos barulhenta.', 'This room is the least noisy.'],
                ['worth it', ['The tickets were expensive, but the show was worth it.', 'Is the longer tour worth it?'], 'A subida foi difícil, mas valeu a pena.', 'The climb was difficult, but it was worth it.'],
                ['What would you recommend?', ['I only have two hours. What would you recommend?', 'What would you recommend for a first visit?'], 'Quero experimentar comida local. O que você recomendaria?', 'I want to try local food. What would you recommend?'],
                ['avoid the crowds', ['Visit early to avoid the crowds.', 'We took a side street to avoid the crowds.'], 'Vamos durante a semana para evitar as multidões.', 'Let us go during the week to avoid the crowds.']
            ],
            dialogues: [
                [['Visitor', 'I have one free afternoon. What would you recommend?'], ['Local', 'The science museum is one of the best places in the city.'], ['Visitor', 'Is it usually crowded?'], ['Local', 'Go after three o\'clock to avoid the crowds.'], ['Visitor', 'Which exhibit is the most interesting?'], ['Local', 'The space exhibit is by far the most popular.'], ['Visitor', 'The ticket is a little expensive. Is it worth it?'], ['Local', 'Definitely. The only bad part is that two hours may feel too short.']],
                [['Local', 'How was your weekend at the coast?'], ['Visitor', 'Wonderful. It was one of the best short trips I have taken.'], ['Local', 'Which beach did you like most?'], ['Visitor', 'North Beach was by far the quietest and cleanest.'], ['Local', 'What was the worst part of the trip?'], ['Visitor', 'The traffic. Next time I will leave earlier to avoid the crowds.'], ['Local', 'Was the long drive worth it?'], ['Visitor', 'Yes. Sunday morning was the best part of the whole weekend.']]
            ]
        },
        29: {
            lab: [
                ['I hope so.', ['Do you think the interview will go well? — I hope so.', 'Will we finish on time? — I hope so.'], 'Você acha que o tempo vai melhorar? — Espero que sim.', 'Do you think the weather will improve? — I hope so.'],
                ['It depends on...', ['It depends on how much time we have.', 'The final date depends on the client.'], 'Depende do meu novo horário.', 'It depends on my new schedule.'],
                ['right away', ['Please tell me right away if anything changes.', 'She answered the email right away.'], 'Vou começar o projeto imediatamente.', 'I will start the project right away.'],
                ['right after', ['We will celebrate right after the exam.', 'Call me right after you arrive.'], 'Vou caminhar logo depois do trabalho.', 'I will go for a walk right after work.'],
                ['right before', ['I checked the address right before I left.', 'Do not drink coffee right before bed.'], 'Ela revisa as notas logo antes da reunião.', 'She reviews her notes right before the meeting.'],
                ['look forward to', ['We look forward to seeing you again.', 'I am looking forward to starting the course.'], 'Estou ansioso para conhecer a nova equipe.', 'I look forward to meeting the new team.'],
                ['one step at a time', ['Let us solve the problem one step at a time.', 'She is rebuilding her routine one step at a time.'], 'Vou aprender isso um passo de cada vez.', 'I will learn this one step at a time.'],
                ['stick to the plan', ['We can reach the goal if we stick to the plan.', 'It was difficult to stick to the plan during the holidays.'], 'Quero seguir o plano desta vez.', 'I want to stick to the plan this time.']
            ],
            dialogues: [
                [['Mina', 'What are you hoping to change next year?'], ['Carlos', 'I want to exercise regularly and improve my English.'], ['Mina', 'That sounds ambitious. How are you going to begin?'], ['Carlos', 'One step at a time. I will start with two short study sessions a week.'], ['Mina', 'When will you exercise?'], ['Carlos', 'Right after work on Tuesdays and Thursdays.'], ['Mina', 'Do you think you can stick to the plan?'], ['Carlos', 'I hope so. It depends on keeping the routine realistic.']],
                [['Carlos', 'Are you looking forward to starting your new job?'], ['Mina', 'Yes, but I am also a little nervous.'], ['Carlos', 'When do you begin?'], ['Mina', 'Next Monday. I will review my notes right before the first meeting.'], ['Carlos', 'What will you do if you do not understand something?'], ['Mina', 'I will ask right away instead of pretending I understand.'], ['Carlos', 'That is a good plan. Do you think the team will be supportive?'], ['Mina', 'I hope so. It depends on the project, but everyone seems friendly.']]
            ]
        }
    };

    const expressionLabFromRows = rows => Object.fromEntries(rows.map(([term, examples, promptPt, answer]) => [term, { examples, promptPt, answer }]));

    const lesson = (lessonNumber, config) => {
        const { routeOptions, ...authored } = config;
        const expansion = PRESENTATION_EXPANSION[lessonNumber];
        if (expansion) { authored.vocab = [...authored.vocab, ...expansion.vocab]; authored.expressions = [...authored.expressions, ...expansion.expressions]; }
        const oheEnrichment = OHE_ENRICHMENT[lessonNumber];
        if (oheEnrichment) {
            authored.expressionLab = expressionLabFromRows(oheEnrichment.lab);
            authored.dialogues = oheEnrichment.dialogues;
        }
        const homeworkTasks = HOMEWORK_TASKS[lessonNumber];
        if (!homeworkTasks) throw new Error(`A2-V3 L${lessonNumber}: missing authored homework tasks.`);
        return Object.freeze({
            ...authored,
            homeworkPrompt: 'Choose one option.',
            homework: createLexicalHomework(lessonNumber, homeworkTasks),
            lessonRoute: createLexicalRoute(authored, routeOptions)
        });
    };

    const lessons = {
        1: lesson(1, {
            title: 'Welcome Back! Vacation and Weather',
            routeOptions: { coreVocabularyCount: 10, extraVocabularyCount: 3, coreExpressionCount: 6 },
            label: 'vacation weather greetings past trip enjoy ing different from',
            themes: ['a vacation abroad', 'weather during a trip', 'activities people enjoy on vacation'],
            objectives: ['receber alguém de volta e perguntar sobre uma viagem', 'descrever o clima e uma viagem concluída', 'usar enjoy seguido de verbo com -ing', 'usar different from ou different than naturalmente'],
            introDialogue: [
                ['Julia', 'Hey, Mark! Welcome back. How was your trip?'],
                ['Mark', 'It was terrific. I spent three weeks in Scotland.'],
                ['Julia', 'Nice! What was the weather like?'],
                ['Mark', 'It was cool and foggy most mornings, but at least it did not rain the whole time.'],
                ['Julia', 'Did you stay in Glasgow the whole time?'],
                ['Mark', 'Almost. I took a day trip to Edinburgh and visited a famous castle.'],
                ['Julia', 'Did you take many pictures?'],
                ['Mark', 'You bet. I really enjoyed exploring the city.']
            ],
            vocab: [
                ['fog', 'nevoeiro; neblina', 'There was heavy fog in the morning.'],
                ['foggy', 'com nevoeiro; com neblina', 'It was foggy early in the morning.'],
                ['snow', 'neve', 'There was snow on the mountains.'],
                ['snowy', 'com neve; coberto de neve', 'The roads were snowy.'],
                ['heavy', 'forte; pesado', 'We had heavy rain on Tuesday.'],
                ['light', 'leve; fraco', 'There was light snow at night.'],
                ['cool', 'fresco', 'The afternoons were cool.'],
                ['warm', 'morno; quente agradável', 'It became warm during the day.'],
                ['hot', 'quente', 'It was hot by lunchtime.'],
                ['away', 'fora; ausente', 'I was away for about three weeks.'],
                ['terrific', 'magnífico; maravilhoso', 'The trip was terrific.'],
                ['fantastic', 'fantástico', 'The view from the castle was fantastic.'],
                ['completely', 'completamente', 'The town was completely different in winter.'],
                ['different', 'diferente', 'The weather was different from ours.'],
                ['famous', 'famoso', 'We visited a famous castle.'],
                ['place', 'lugar; local', 'It is a beautiful place.'],
                ['castle', 'castelo', 'The castle was near the city center.'],
                ['hotel', 'hotel', 'We stayed at a small hotel.'],
                ['trip', 'viagem', 'How was your trip to Europe?']
            ],
            verbRows: [
                ['travel', 'traveled', 'traveled', 'viajar'],
                ['enjoy', 'enjoyed', 'enjoyed', 'gostar de; aproveitar']
            ],
            grammarTable: {
                title: 'Como falar da viagem e das atividades',
                headers: ['Uso', 'Estrutura', 'Exemplo'],
                rows: [
                    ['Perguntar pela experiência', 'How was + noun?', 'How was your trip?'],
                    ['Perguntar por descrição', 'What was + noun + like?', 'What was the weather like?'],
                    ['Falar de uma atividade prazerosa', 'enjoy + verb-ing', 'I enjoyed visiting the castle.'],
                    ['Mostrar diferença', 'different from / different than', 'The weather was different from ours.']
                ]
            },
            grammar: [
                ['Enjoy + -ing', 'Depois de enjoy, a atividade vem com -ing: enjoy traveling, enjoy taking pictures. Não use enjoy to travel.'],
                ['Was e were', 'Use was com I, he, she e it; use were com you, we e they ao descrever a viagem no passado.'],
                ['Perguntas com did', 'Depois de did, o verbo volta para a forma base: Did you travel? e Did you take pictures?']
            ],
            examples: ['I enjoyed traveling around Scotland.', 'The mornings were foggy and cool.', 'Did you visit any castles?', 'The hotel was different from the pictures online.'],
            helpingYou: [
                ['Enjoy pede -ing', 'Quando enjoy apresenta uma atividade, use o verbo com -ing.', 'I enjoy traveling. / He enjoys playing soccer.'],
                ['Different from ou different than', 'As duas formas são usadas. Different from é a opção mais segura em contextos formais e internacionais.', 'This place is different from my hometown.'],
                ['In a hotel e at a hotel', 'In a hotel destaca estar dentro do prédio; at a hotel destaca o local de hospedagem ou encontro.', 'We stayed at a hotel. I left my bag in the hotel.'],
                ['Take em blocos úteis', 'Aprenda as combinações inteiras: take a picture, take a trip e take a day trip.', 'I took a day trip and took many pictures.']
            ],
            expressions: [
                ['How are you doing?', 'Como vai você?', 'Cumprimento informal; responda com Pretty well, Not bad ou Great.', 'How are you doing? — Not bad.'],
                ['most of the time', 'na maior parte do tempo', 'Use of antes de the time.', 'It was sunny most of the time.'],
                ['the whole time', 'o tempo todo', 'Equivale a all the time neste contexto.', 'Were you there the whole time?'],
                ['at least', 'pelo menos', 'Use para destacar um ponto positivo ou mínimo.', 'At least it was not raining.'],
                ['as usual', 'como de costume', 'Bloco fixo, normalmente no fim da oração.', 'It was cold as usual.'],
                ['take a picture', 'tirar uma foto', 'Take muda para took no passado.', 'Did you take any pictures?'],
                ['take a trip', 'fazer uma viagem', 'Também se diz go on a trip.', 'We took a trip to Edinburgh.'],
                ['go camping', 'ir acampar', 'Depois de go, algumas atividades usam -ing.', 'We usually go camping in July.'],
                ['go fishing', 'ir pescar', 'Aprenda go fishing como bloco.', 'They went fishing by the river.'],
                ['have a picnic', 'fazer um piquenique', 'Use have, não make, neste bloco.', "Why don't we have a picnic?"]
            ],
            translations: [
                { pt: 'Como foi sua viagem à Europa?', en: 'How was your trip to Europe?' },
                { pt: 'Como estava o tempo lá?', en: 'What was the weather like there?' },
                { pt: 'Eu fiquei fora por cerca de três semanas.', en: 'I was away for about three weeks.' },
                { pt: 'Estava fresco e com neblina de manhã.', en: 'It was cool and foggy in the morning.' },
                { pt: 'Você visitou algum castelo?', en: 'Did you visit any castles?' },
                { pt: 'Eu gostei muito de viajar pela Escócia.', en: 'I really enjoyed traveling around Scotland.' },
                { pt: 'O lugar era completamente diferente da minha cidade.', en: 'The place was completely different from my city.' },
                { pt: 'Pelo menos não nevou o tempo todo.', en: 'At least it did not snow the whole time.' }
            ],
            expressionTranslations: [
                { pt: 'Como vai você? Nada mal.', en: 'How are you doing? Not bad.' },
                { pt: 'Ficamos em Glasgow na maior parte do tempo.', en: 'We stayed in Glasgow most of the time.' },
                { pt: 'Você ficou no hotel o tempo todo?', en: 'Were you at the hotel the whole time?' },
                { pt: 'Eu fiz uma viagem de um dia a Edimburgo.', en: 'I took a day trip to Edinburgh.' },
                { pt: 'Nós geralmente vamos acampar com amigos.', en: 'We usually go camping with friends.' },
                { pt: 'Que tal fazer um piquenique perto do rio?', en: 'How about having a picnic by the river?' }
            ],
            dialogues: [
                [['A', 'How long were you away?'], ['B', 'I was away for about three weeks.'], ['A', 'How was your trip?'], ['B', 'It was terrific. I enjoyed it a lot.']],
                [['A', 'What was the weather like in Glasgow?'], ['B', 'It was cold as usual, but at least it was not raining.'], ['A', 'Were you there the whole time?'], ['B', 'Most of the time. I took one day trip to Edinburgh.']],
                [['A', 'How do you usually spend your vacations?'], ['B', 'I usually go camping with some friends.'], ['A', "Why don't we have a picnic and go fishing this weekend?"], ['B', 'That is a terrific idea!']]
            ],
            readingTitle: 'Three Weeks in Scotland',
            reading: 'Lucas was away for three weeks in Scotland. He stayed at a small hotel in Glasgow most of the time, but he also took a day trip to Edinburgh. The mornings were usually cool and foggy. Some afternoons were warm, and there was only light rain. Lucas enjoyed walking through old streets, visiting a famous castle, and taking pictures. The weather was different from the weather in Brazil, but that made the trip more interesting. When he got home, he said the vacation was terrific.',
            readingQuestions: [
                { question: 'How long was Lucas away?', answer: 'He was away for three weeks.' },
                { question: 'Where did he stay most of the time?', answer: 'He stayed in Glasgow.' },
                { question: 'What was the weather like?', answer: 'It was usually cool and foggy, with some warm afternoons and light rain.' },
                { question: 'Which activities did he enjoy?', answer: 'He enjoyed walking, visiting a castle, and taking pictures.' }
            ],
            guidedConversation: {
                questions: ['How are you doing today?', 'How was your last trip or day away?', 'What was the weather like?', 'What do you enjoy doing on vacation?', 'Which place is very different from your city?'],
                support: ['Not bad.', 'It was terrific.', 'most of the time', 'at least', 'I enjoy + -ing', 'different from']
            }
        }),

        3: lesson(3, {
            title: 'Location and Directions',
            label: 'location directions prepositions help how long take',
            themes: ['asking for directions', 'explaining a route', 'estimating travel time'],
            objectives: ['pedir ajuda com educação', 'localizar lugares com preposições', 'dar direções claras em etapas', 'perguntar quanto tempo um trajeto leva'],
            introDialogue: [['Tourist', 'Excuse me. Could you help me?'], ['Local', 'Of course. Where are you going?'], ['Tourist', 'I am looking for the City Museum.'], ['Local', 'Go straight, walk past the bank, and turn left at the traffic light.'], ['Tourist', 'Is it far from here?'], ['Local', 'No. It takes about ten minutes on foot.']],
            vocab: [['corner', 'esquina', 'Turn right at the corner.'], ['traffic light', 'semáforo', 'The museum is after the traffic light.'], ['block', 'quarteirão', 'Walk two blocks.'], ['intersection', 'cruzamento', 'Wait at the intersection.'], ['bridge', 'ponte', 'Go across the bridge.'], ['entrance', 'entrada', 'The entrance is next to the café.'], ['nearby', 'por perto', 'Is there a pharmacy nearby?'], ['far', 'longe', 'Is it far from here?']],
            verbRows: [['help', 'helped', 'helped', 'ajudar'], ['turn', 'turned', 'turned', 'virar'], ['cross', 'crossed', 'crossed', 'atravessar'], ['take', 'took', 'taken', 'levar; pegar']],
            grammarTable: { title: 'Localização, movimento e duração', headers: ['Uso', 'Estrutura', 'Exemplo'], rows: [['Pedir ajuda', 'Could you + base verb?', 'Could you help me?'], ['Dar instrução', 'imperative + complement', 'Turn left at the corner.'], ['Perguntar duração', 'How long does it take...?', 'How long does it take by bus?'], ['Responder duração', 'It takes + time', 'It takes about ten minutes.']] },
            grammar: [['Imperativo', 'Comece a instrução com o verbo na forma base: Go straight, Turn left, Walk past the bank.'], ['Does + take', 'Na pergunta, does já marca a terceira pessoa; por isso usamos take, não takes.'], ['Preposição precisa', 'Use at para um ponto, across para atravessar e past para passar por um lugar.']],
            examples: ['Could you help me?', 'Walk past the bank.', 'How long does it take on foot?', 'It takes about fifteen minutes.'],
            helpingYou: [['At the corner', 'Use at quando a esquina é o ponto de ação.', 'Turn left at the corner.'], ['On the corner', 'Use on para dizer onde um prédio fica localizado.', 'The bank is on the corner.'], ['On foot', 'Para dizer “a pé”, use on foot, nunca by foot.', 'It takes ten minutes on foot.']],
            expressions: [['Excuse me.', 'Com licença.', 'Use para iniciar o contato com educação.', 'Excuse me. Could you help me?'], ['How do I get to...?', 'Como chego a...?', 'Use get to antes do destino.', 'How do I get to the station?'], ['go straight', 'seguir reto', 'Bloco de instrução no imperativo.', 'Go straight for two blocks.'], ['walk past', 'passar por', 'Past indica movimento além de um ponto.', 'Walk past the pharmacy.'], ['across from', 'em frente a', 'Across from indica lados opostos.', 'It is across from the bank.'], ['on foot', 'a pé', 'Aprenda a preposição on como parte do bloco.', 'I usually go on foot.']],
            expressionLab: {
                'Excuse me.': {
                    examples: ['Excuse me. Is there a bus stop near here?', 'Excuse me. I think I am lost.'],
                    promptPt: 'Com licença. Você poderia me ajudar a encontrar a estação?',
                    answer: 'Excuse me. Could you help me find the station?'
                },
                'How do I get to...?': {
                    examples: ['How do I get to the city center from here?', 'How do I get to the nearest subway station?'],
                    promptPt: 'Como eu chego ao hospital?',
                    answer: 'How do I get to the hospital?'
                },
                'go straight': {
                    examples: ['Go straight until you reach the square.', 'Go straight and cross the bridge.'],
                    promptPt: 'Siga reto até chegar ao semáforo.',
                    answer: 'Go straight until you reach the traffic light.'
                },
                'walk past': {
                    examples: ['Walk past the park and turn right.', 'Walk past the hotel; the station is on your left.'],
                    promptPt: 'Passe pela padaria e vire à esquerda.',
                    answer: 'Walk past the bakery and turn left.'
                },
                'across from': {
                    examples: ['The bus stop is across from the hotel.', 'The café is across from the main entrance.'],
                    promptPt: 'A biblioteca fica em frente ao café.',
                    answer: 'The library is across from the café.'
                },
                'on foot': {
                    examples: ['The museum is only ten minutes away on foot.', 'Can we get there on foot?'],
                    promptPt: 'Leva cerca de quinze minutos a pé.',
                    answer: 'It takes about fifteen minutes on foot.'
                },
                'Am I going the right way?': {
                    examples: ['Am I going the right way to the station?', 'Excuse me, am I going the right way to the bridge?'],
                    promptPt: 'Estou indo pelo caminho certo para o centro?',
                    answer: 'Am I going the right way to the city center?'
                },
                'How long does it take?': {
                    examples: ['How long does it take by subway?', 'How long does it take to walk there?'],
                    promptPt: 'Quanto tempo leva de carro?',
                    answer: 'How long does it take by car?'
                }
            },
            translations: [{ pt: 'Você poderia me ajudar a encontrar o museu?', en: 'Could you help me find the museum?' }, { pt: 'Existe uma farmácia por perto?', en: 'Is there a pharmacy nearby?' }, { pt: 'Vire à direita na esquina.', en: 'Turn right at the corner.' }, { pt: 'Atravesse a ponte e continue reto.', en: 'Cross the bridge and continue straight.' }, { pt: 'A entrada fica ao lado do café.', en: 'The entrance is next to the café.' }, { pt: 'O banco fica na esquina.', en: 'The bank is on the corner.' }, { pt: 'A viagem leva cerca de vinte minutos de metrô.', en: 'The trip takes about twenty minutes by subway.' }, { pt: 'Não é longe daqui.', en: 'It is not far from here.' }],
            dialogues: [
                [
                    ['Tourist', 'Excuse me. Is there a bank nearby?'],
                    ['Local', 'Yes. Go straight for one block and turn right at the traffic light.'],
                    ['Tourist', 'Is it on the corner?'],
                    ['Local', 'Not exactly. It is across from the café, next to the pharmacy.'],
                    ['Tourist', 'Am I going the right way if I walk past the square?'],
                    ['Local', 'Yes. The bank will be on your left after the square.'],
                    ['Tourist', 'Great. How long does it take on foot?'],
                    ['Local', 'About seven minutes from here.']
                ],
                [
                    ['Tourist', 'Could you help me? How do I get to the City Museum?'],
                    ['Local', 'Take the number twelve bus from the station and get off at the stop after the bridge.'],
                    ['Tourist', 'How long does it take by bus?'],
                    ['Local', 'About fifteen minutes, but the next bus does not arrive for twenty minutes.'],
                    ['Tourist', 'Can I get there on foot instead?'],
                    ['Local', 'Yes, but it takes about thirty minutes. Cross the bridge and walk past the park.'],
                    ['Tourist', 'Is the museum entrance across from the café?'],
                    ['Local', 'Exactly. You will see the main entrance straight ahead.']
                ]
            ],
            readingTitle: 'A Clear Route to the Museum',
            reading: 'Nina asks a local for help because her phone has no signal. The local tells her to go straight for two blocks, cross a small bridge, and turn right at the traffic light. The museum entrance is across from a café. The route takes about twelve minutes on foot, and Nina repeats the directions before she leaves.',
            readingQuestions: [{ question: 'Why does Nina ask for help?', answer: 'Because her phone has no signal.' }, { question: 'What does she cross?', answer: 'She crosses a small bridge.' }, { question: 'Where is the entrance?', answer: 'It is across from a café.' }, { question: 'How long does the route take?', answer: 'It takes about twelve minutes on foot.' }],
            guidedConversation: { questions: ['How do I get from your home to a nearby supermarket?', 'What place is across from your school or workplace?', 'How long does your usual commute take?', 'When do you normally ask someone for directions?'], support: ['Could you help me?', 'go straight', 'turn at', 'across from', 'It takes...'] }
        }),

        5: lesson(5, {
            title: 'Sports and Workout',
            label: 'sports workout go do play how good at',
            themes: ['sports you play', 'exercise routines', 'abilities and practice'],
            objectives: ['escolher go, do ou play com esportes', 'falar sobre rotinas de treino', 'perguntar o nível de habilidade em uma atividade', 'descrever habilidade sem exagero'],
            introDialogue: [['Mia', 'Do you play any sports?'], ['Rafael', 'I play volleyball on Fridays, and I go running twice a week.'], ['Mia', 'Nice. How good are you at volleyball?'], ['Rafael', 'I am not bad, but I need more practice. What about you?'], ['Mia', 'I do yoga and sometimes go swimming.'], ['Rafael', 'There is a beginner class at my gym. Do you want to try it?']],
            vocab: [['workout', 'treino', 'That was a difficult workout.'], ['gym', 'academia', 'My gym opens early.'], ['team', 'time; equipe', 'Our team practices on Friday.'], ['match', 'partida', 'We have a match tonight.'], ['court', 'quadra', 'They are on the tennis court.'], ['equipment', 'equipamento', 'The gym has new equipment.'], ['beginner', 'iniciante', 'This class is for beginners.'], ['practice', 'prática; treino', 'I need more practice.']],
            verbRows: [['play', 'played', 'played', 'jogar; praticar'], ['go', 'went', 'gone', 'ir'], ['do', 'did', 'done', 'fazer'], ['work out', 'worked out', 'worked out', 'treinar']],
            grammarTable: { title: 'Go, do ou play?', headers: ['Padrão', 'Uso', 'Exemplo'], rows: [['play + sport', 'jogos e esportes com bola', 'play tennis'], ['go + activity-ing', 'atividades de movimento', 'go swimming'], ['do + activity', 'atividades e exercícios', 'do yoga'], ['be good at + noun/-ing', 'nível de habilidade', 'She is good at running.']] },
            grammar: [['Play', 'Use play com jogos competitivos: play soccer, play tennis, play chess.'], ['Go + -ing', 'Use go com várias atividades terminadas em -ing: go running, swimming, cycling.'], ['Good at', 'Depois de at, use substantivo ou verbo com -ing: good at tennis; good at playing tennis.']],
            examples: ['I play soccer on Saturdays.', 'We go running before work.', 'She does yoga at home.', 'How good are you at swimming?'],
            helpingYou: [['At pede -ing', 'Em good at, bad at e better at, at é preposição; um verbo depois dela recebe -ing.', 'I am good at playing volleyball.'], ['Frequência clara', 'Coloque once/twice a week no fim da frase.', 'I work out twice a week.'], ['Play sem artigo', 'Com o nome do esporte, normalmente não use the.', 'They play tennis after class.']],
            expressions: [['How good are you at...?', 'Quão bom você é em...?', 'Depois de at, use substantivo ou -ing.', 'How good are you at swimming?'], ['not bad at all', 'nada mal', 'Resposta modesta e positiva.', 'I am not bad at all.'], ['be out of shape', 'estar fora de forma', 'Use be antes da expressão.', 'I am a little out of shape.'], ['get in shape', 'entrar em forma', 'Get indica mudança de estado.', 'I want to get in shape.'], ['twice a week', 'duas vezes por semana', 'Não use two times em rotinas neutras.', 'She trains twice a week.'], ['warm up', 'aquecer', 'Pode ser verbo ou substantivo com hífen: warm-up.', 'Always warm up first.']],
            translations: [{ pt: 'Você pratica algum esporte?', en: 'Do you play any sports?' }, { pt: 'Eu corro duas vezes por semana.', en: 'I go running twice a week.' }, { pt: 'Ela faz ioga em casa.', en: 'She does yoga at home.' }, { pt: 'Quão bom você é em nadar?', en: 'How good are you at swimming?' }, { pt: 'Eu não sou muito bom em tênis.', en: 'I am not very good at tennis.' }, { pt: 'Nós treinamos depois do trabalho.', en: 'We work out after work.' }, { pt: 'Quero entrar em forma.', en: 'I want to get in shape.' }, { pt: 'Sempre aqueça antes da partida.', en: 'Always warm up before the match.' }],
            dialogues: [[['A', 'What do you do to stay active?'], ['B', 'I go cycling and do yoga.']], [['A', 'How good is Leo at soccer?'], ['B', 'He is pretty good, but he needs more practice.']]],
            readingTitle: 'A Routine That Fits',
            reading: 'Paula wanted to get in shape, but she did not enjoy crowded gyms. She started doing yoga at home and going for a run in the park twice a week. Later, a friend invited her to play volleyball. Paula was not very good at first, but regular practice helped. Now her routine includes activities she actually enjoys.',
            readingQuestions: [{ question: 'Why did Paula avoid gyms?', answer: 'Because she did not enjoy crowded gyms.' }, { question: 'What did she do at home?', answer: 'She did yoga.' }, { question: 'Which team sport did she try?', answer: 'She tried volleyball.' }, { question: 'What helped her improve?', answer: 'Regular practice helped her improve.' }],
            guidedConversation: { questions: ['What do you do to stay active?', 'Which sports do you play or watch?', 'How good are you at one physical activity?', 'What exercise would you like to try?'], support: ['I play...', 'I go + -ing', 'I do...', 'good at + -ing', 'twice a week'] }
        }),

        7: lesson(7, {
            title: 'Interests and Preferences',
            label: 'interests preferences adjectives news kind of free time',
            themes: ['free-time activities', 'types of news and entertainment', 'strong and mild opinions'],
            objectives: ['descrever interesses com adjetivos precisos', 'perguntar de que tipo de coisa alguém gosta', 'suavizar opiniões com kind of', 'manter uma conversa sobre tempo livre'],
            introDialogue: [['Lena', 'What kind of podcasts do you listen to?'], ['Sam', 'Mostly science and technology. I find them fascinating.'], ['Lena', 'I like them too, but some episodes are kind of technical.'], ['Sam', 'True. What are you interested in?'], ['Lena', 'Travel stories and local news. I like learning how people live in different places.'], ['Sam', 'Then I have a great recommendation for you.']],
            vocab: [['interest', 'interesse', 'Travel is one of her interests.'], ['news', 'notícias', 'I read the local news.'], ['article', 'artigo', 'This article is interesting.'], ['podcast', 'podcast', 'He listens to a history podcast.'], ['documentary', 'documentário', 'The documentary was fascinating.'], ['fascinating', 'fascinante', 'The story was fascinating.'], ['boring', 'entediante', 'The first episode was boring.'], ['technical', 'técnico', 'The explanation is very technical.']],
            verbRows: [['read', 'read', 'read', 'ler'], ['watch', 'watched', 'watched', 'assistir'], ['listen', 'listened', 'listened', 'escutar'], ['recommend', 'recommended', 'recommended', 'recomendar']],
            grammarTable: { title: 'Perguntar e qualificar preferências', headers: ['Uso', 'Estrutura', 'Exemplo'], rows: [['Perguntar o tipo', 'What kind of + noun...?', 'What kind of music do you like?'], ['Interesse', 'be interested in + noun/-ing', 'I am interested in traveling.'], ['Opinião suave', 'kind of + adjective', 'It is kind of confusing.'], ['Reação', 'find + object + adjective', 'I find documentaries fascinating.']] },
            grammar: [['Interested e interesting', 'Interested descreve a pessoa; interesting descreve aquilo que provoca interesse.'], ['In + -ing', 'Depois de interested in, um verbo recebe -ing: interested in learning.'], ['Kind of', 'Antes de adjetivo, kind of reduz a força da opinião e soa mais conversacional.']],
            examples: ['What kind of news do you follow?', 'I am interested in learning languages.', 'That program is kind of repetitive.', 'I find local stories interesting.'],
            helpingYou: [['Pessoa ou coisa?', 'Use -ed para sentimento da pessoa e -ing para a característica da coisa.', 'I am interested. The article is interesting.'], ['Listen to', 'O verbo listen pede a preposição to antes do que é ouvido.', 'I listen to podcasts on my commute.'], ['Interested in', 'In faz parte do bloco e pede substantivo ou -ing.', 'She is interested in photography.']],
            expressions: [['What kind of...?', 'Que tipo de...?', 'Use antes de um substantivo.', 'What kind of movies do you like?'], ['be interested in', 'ter interesse em', 'In é preposição; use substantivo ou -ing.', 'I am interested in cooking.'], ['kind of', 'meio; um pouco', 'Suaviza um adjetivo ou opinião.', 'The ending was kind of strange.'], ['be into', 'curtir; gostar de', 'Expressão informal seguida de substantivo ou -ing.', 'She is into street photography.'], ['keep up with', 'acompanhar', 'With introduz o assunto acompanhado.', 'I keep up with technology news.'], ['in my free time', 'no meu tempo livre', 'Use in como parte do bloco.', 'I read in my free time.']],
            translations: [{ pt: 'Que tipo de música você gosta?', en: 'What kind of music do you like?' }, { pt: 'Eu me interesso por aprender idiomas.', en: 'I am interested in learning languages.' }, { pt: 'Esse documentário é fascinante.', en: 'That documentary is fascinating.' }, { pt: 'O começo foi meio confuso.', en: 'The beginning was kind of confusing.' }, { pt: 'Eu acompanho as notícias locais.', en: 'I keep up with the local news.' }, { pt: 'Ela curte fotografia.', en: 'She is into photography.' }, { pt: 'Eu escuto podcasts no meu tempo livre.', en: 'I listen to podcasts in my free time.' }, { pt: 'Recomendo esse artigo.', en: 'I recommend this article.' }],
            dialogues: [[['A', 'What are you into these days?'], ['B', 'I am really into cooking shows.']], [['A', 'Do you follow the news?'], ['B', 'Yes, but political news is sometimes kind of stressful.']]],
            readingTitle: 'A New Kind of Interest',
            reading: 'Bruno used to think history podcasts were boring. A friend recommended a short series about his city, and he decided to listen to one episode. The language was not too technical, and the stories were fascinating. Now Bruno keeps up with the program and reads related articles in his free time.',
            readingQuestions: [{ question: 'What did Bruno think at first?', answer: 'He thought history podcasts were boring.' }, { question: 'Who recommended the series?', answer: 'A friend recommended it.' }, { question: 'Was the language very technical?', answer: 'No, it was not.' }, { question: 'What does Bruno do now?', answer: 'He follows the program and reads related articles.' }],
            guidedConversation: { questions: ['What are you interested in?', 'What kind of news do you follow?', 'Which activity do you find fascinating?', 'What are you kind of tired of?'], support: ['What kind of...?', 'interested in + -ing', 'kind of', 'I find...'] }
        }),

        9: lesson(9, {
            title: 'Food and Drink 1 · Preferences',
            label: 'food drink adjectives like love hate ing so neither feel like rather than',
            themes: ['food preferences', 'agreeing and disagreeing', 'choosing what to eat'],
            objectives: ['descrever alimentos com adjetivos úteis', 'usar like, love e hate com to ou -ing', 'concordar com so do I e neither do I', 'usar feel like seguido de substantivo ou -ing'],
            introDialogue: [['Nora', 'Do you feel like eating out tonight?'], ['Ian', 'Yes. I would rather have Thai food than pizza.'], ['Nora', 'Good idea. I love trying spicy dishes.'], ['Ian', 'So do I, but I do not like food that is too salty.'], ['Nora', 'Neither do I. There is a small place near the station.'], ['Ian', "Perfect. Let's try it."]],
            vocab: [['spicy', 'apimentado', 'This curry is spicy.'], ['salty', 'salgado', 'The soup is too salty.'], ['sweet', 'doce', 'I prefer sweet desserts.'], ['sour', 'azedo', 'The sauce tastes sour.'], ['bitter', 'amargo', 'Black coffee can be bitter.'], ['fresh', 'fresco', 'The vegetables are fresh.'], ['dish', 'prato', 'This is a regional dish.'], ['flavor', 'sabor', 'The flavor is strong.']],
            verbRows: [['taste', 'tasted', 'tasted', 'ter gosto; provar'], ['prefer', 'preferred', 'preferred', 'preferir'], ['try', 'tried', 'tried', 'experimentar'], ['order', 'ordered', 'ordered', 'pedir']],
            grammarTable: { title: 'Preferências e concordância', headers: ['Uso', 'Estrutura', 'Exemplo'], rows: [['Gostar de atividade', 'like/love/hate + to verb ou verb-ing', 'I love cooking.'], ['Vontade agora', 'feel like + noun/verb-ing', 'I feel like having soup.'], ['Concordar com afirmativa', 'So + auxiliary + subject', 'So do I.'], ['Concordar com negativa', 'Neither + auxiliary + subject', 'Neither do I.']] },
            grammar: [['To ou -ing', 'Like, love e hate aceitam as duas formas em muitos contextos; -ing costuma enfatizar a atividade em geral.'], ['Feel like', 'Like aqui é preposição; por isso, um verbo depois dela recebe -ing.'], ['So e neither', 'Repita o auxiliar adequado à frase anterior: So do I, So am I, Neither can I.']],
            examples: ['I love trying new dishes.', 'I feel like having pasta.', 'I do not like bitter coffee. Neither do I.', 'I chose tea rather than soda.'],
            helpingYou: [['Feel like pede -ing', 'Não use feel like to eat. Use um substantivo ou verbo com -ing.', 'I feel like eating something light.'], ['Mesmo auxiliar', 'Em so/neither, escolha o auxiliar da frase anterior.', 'I am hungry. So am I. / I cook. So do I.'], ['Rather than', 'Use rather than para apresentar a alternativa não escolhida.', 'I would rather cook than order food.']],
            expressions: [['feel like', 'estar com vontade de', 'Use substantivo ou verbo + -ing.', 'I feel like having coffee.'], ['So do I.', 'Eu também.', 'Concorda com frase no Present Simple.', 'I love pasta. — So do I.'], ['Neither do I.', 'Eu também não.', 'Concorda com frase negativa.', 'I do not eat meat. — Neither do I.'], ['rather than', 'em vez de; ao invés de', 'Liga duas alternativas paralelas.', 'I chose rice rather than fries.'], ['be in the mood for', 'estar a fim de', 'For vem antes de substantivo ou -ing.', 'I am in the mood for soup.'], ['eat out', 'comer fora', 'Phrasal verb sem objeto obrigatório.', 'We eat out on Fridays.']],
            translations: [{ pt: 'Você está com vontade de comer fora?', en: 'Do you feel like eating out?' }, { pt: 'Eu adoro experimentar pratos novos.', en: 'I love trying new dishes.' }, { pt: 'Eu não gosto de café amargo.', en: 'I do not like bitter coffee.' }, { pt: 'Eu também não.', en: 'Neither do I.' }, { pt: 'Eu prefiro sopa a salada.', en: 'I prefer soup to salad.' }, { pt: 'Este molho está muito salgado.', en: 'This sauce is too salty.' }, { pt: 'Estou a fim de algo doce.', en: 'I am in the mood for something sweet.' }, { pt: 'Vamos pedir comida tailandesa.', en: "Let's order Thai food." }],
            dialogues: [[['A', 'I love spicy food.'], ['B', 'So do I, but I do not like very salty dishes.']], [['A', 'What do you feel like having?'], ['B', 'I would rather have soup than a sandwich.']]],
            readingTitle: 'One Dinner, Different Tastes',
            reading: 'Four friends wanted to eat out, but they had different preferences. Mia loved spicy food, Carlos hated it, and Jo did not eat meat. They checked a restaurant menu and found fresh salads, a mild curry, and several vegetable dishes. Everyone ordered something different, but they shared one sweet dessert.',
            readingQuestions: [{ question: 'Why was choosing difficult?', answer: 'Because the friends had different preferences.' }, { question: 'Who hated spicy food?', answer: 'Carlos did.' }, { question: 'What did Jo not eat?', answer: 'Jo did not eat meat.' }, { question: 'What did they share?', answer: 'They shared a sweet dessert.' }],
            guidedConversation: { questions: ['What food do you love eating?', 'What do you never feel like having?', 'Which flavors do you prefer?', 'Would you rather cook or eat out tonight?'], support: ['I love + -ing', 'feel like + -ing', 'So do I.', 'Neither do I.', 'rather than'] }
        }),

        11: lesson(11, {
            title: 'Food and Drink 2 · At a Restaurant',
            label: 'restaurant would like so neither ordering food drink',
            themes: ['ordering at a restaurant', 'offering food and drinks', 'responding politely'],
            objectives: ['oferecer comida e bebida com would you like', 'pedir com educação usando I would like', 'aceitar ou recusar uma oferta', 'concordar com so e neither usando o auxiliar correto'],
            introDialogue: [['Server', 'Good evening. Would you like something to drink?'], ['Maya', 'Yes, I would like sparkling water, please.'], ['Server', 'And are you ready to order?'], ['Maya', 'I think so. I would like the grilled fish with vegetables.'], ['Leo', 'So would I, but without the sauce, please.'], ['Server', 'Of course. Would you like anything else?'], ['Leo', 'Not right now, thank you.']],
            vocab: [['menu', 'cardápio', 'Could we see the menu?'], ['starter', 'entrada', 'We shared a starter.'], ['main course', 'prato principal', 'The fish is my main course.'], ['side dish', 'acompanhamento', 'Rice is a side dish.'], ['dessert', 'sobremesa', 'Would you like dessert?'], ['bill', 'conta', 'Could we have the bill?'], ['tip', 'gorjeta', 'The tip is not included.'], ['reservation', 'reserva', 'I have a reservation for two.']],
            verbRows: [['serve', 'served', 'served', 'servir'], ['choose', 'chose', 'chosen', 'escolher'], ['bring', 'brought', 'brought', 'trazer'], ['pay', 'paid', 'paid', 'pagar']],
            grammarTable: { title: 'Would like para oferecer e pedir', headers: ['Uso', 'Estrutura', 'Exemplo'], rows: [['Oferecer coisa', 'Would you like + noun?', 'Would you like some water?'], ['Oferecer ação', 'Would you like to + base verb?', 'Would you like to order?'], ['Fazer pedido', 'I would like + noun', 'I would like the soup.'], ['Responder', 'Yes, please. / No, thank you.', 'No, thank you.']] },
            grammar: [['Would like', 'É uma forma polida para desejos e pedidos no momento; não significa gostar em geral.'], ['To + base', 'Em would like to, use o verbo na forma base: would like to order.'], ['Some em ofertas', 'Some é natural em ofertas e pedidos quando esperamos uma resposta positiva.']],
            examples: ['Would you like something to drink?', 'I would like to order now.', 'Could we have the bill, please?', 'Neither would I.'],
            helpingYou: [['Would like x like', 'Would like fala de um desejo agora; like fala de preferência geral.', 'I like tea. I would like tea now.'], ['Pedido sem “want”', 'No restaurante, I would like soa mais educado do que I want.', 'I would like the main course, please.'], ['Pay for', 'Use pay for antes daquilo que você paga.', 'I paid for dinner.']],
            expressions: [['Would you like...?', 'Você gostaria de...?', 'Use substantivo ou to + verbo base.', 'Would you like to see the menu?'], ['I would like...', 'Eu gostaria de...', 'Forma polida de pedir.', 'I would like the soup, please.'], ['Are you ready to order?', 'Está pronto para pedir?', 'Order funciona sem preposição aqui.', 'Are you ready to order?'], ['anything else', 'mais alguma coisa', 'Com perguntas, anything é natural.', 'Would you like anything else?'], ['Could we have the bill?', 'Poderia trazer a conta?', 'Pedido polido com could.', 'Could we have the bill, please?'], ['without', 'sem', 'Use diretamente antes do item retirado.', 'The salad without onions, please.']],
            translations: [{ pt: 'Você gostaria de algo para beber?', en: 'Would you like something to drink?' }, { pt: 'Eu gostaria de pedir agora.', en: 'I would like to order now.' }, { pt: 'Eu quero o peixe grelhado, por favor.', en: 'I would like the grilled fish, please.' }, { pt: 'Você gostaria de mais alguma coisa?', en: 'Would you like anything else?' }, { pt: 'Não, obrigado.', en: 'No, thank you.' }, { pt: 'A salada sem cebola, por favor.', en: 'The salad without onions, please.' }, { pt: 'Poderia trazer a conta?', en: 'Could we have the bill, please?' }, { pt: 'A gorjeta está incluída?', en: 'Is the tip included?' }],
            dialogues: [[['Server', 'Would you like to order?'], ['Guest', 'Yes. I would like the pasta, please.']], [['Guest', 'Could we have the bill?'], ['Server', 'Of course. I will bring it right away.']]],
            readingTitle: 'A Simple Order',
            reading: 'Ana and Pedro had a reservation at a small restaurant. Ana ordered a starter and grilled fish. Pedro chose pasta without cheese. The server offered dessert, but they politely declined because they were full. When the bill arrived, Pedro checked whether the tip was included and then paid for dinner.',
            readingQuestions: [{ question: 'Did they have a reservation?', answer: 'Yes, they did.' }, { question: 'What did Pedro choose?', answer: 'He chose pasta without cheese.' }, { question: 'Why did they decline dessert?', answer: 'Because they were full.' }, { question: 'What did Pedro check?', answer: 'He checked whether the tip was included.' }],
            guidedConversation: { questions: ['What would you like to drink right now?', 'How do you usually order a main course?', 'Which polite expressions do you use with a server?', 'Do you normally leave a tip?'], support: ['I would like...', 'Would you like...?', 'without...', 'anything else', 'the bill, please'] }
        }),

        13: lesson(13, {
            title: 'Personalities and Moods',
            label: 'personalities moods adjectives even smile at in the mood',
            themes: ['personality traits', 'temporary moods', 'how behavior affects relationships'],
            objectives: ['diferenciar personalidade de humor passageiro', 'descrever pessoas com adjetivos', 'usar even para acrescentar informação surpreendente', 'usar smile at e in the mood corretamente'],
            introDialogue: [['Tina', 'Is Max always this quiet?'], ['Omar', 'No. He is usually talkative, but he is in a bad mood today.'], ['Tina', 'Did something happen?'], ['Omar', 'He had a difficult morning. He did not even smile at me.'], ['Tina', 'I will give him some space, then.'], ['Omar', 'Good idea. He is friendly; he is just not in the mood to talk.']],
            vocab: [['friendly', 'amigável', 'She is friendly with everyone.'], ['patient', 'paciente', 'He is a patient teacher.'], ['honest', 'honesto', 'I appreciate honest people.'], ['generous', 'generoso', 'That was generous of you.'], ['shy', 'tímido', 'She feels shy in large groups.'], ['talkative', 'falante', 'He is very talkative today.'], ['cheerful', 'alegre', 'Maya looks cheerful.'], ['upset', 'chateado', 'Why are you upset?']],
            verbRows: [['smile', 'smiled', 'smiled', 'sorrir'], ['trust', 'trusted', 'trusted', 'confiar'], ['seem', 'seemed', 'seemed', 'parecer'], ['feel', 'felt', 'felt', 'sentir-se']],
            grammarTable: { title: 'Traço permanente ou estado momentâneo?', headers: ['Uso', 'Estrutura', 'Exemplo'], rows: [['Personalidade', 'subject + be + adjective', 'She is patient.'], ['Humor agora', 'subject + be/feel + mood adjective', 'He feels upset.'], ['Surpresa', 'even + focused word', 'He did not even call.'], ['Direção da ação', 'smile at + person', 'She smiled at me.']] },
            grammar: [['Be e feel', 'Use be para descrição e feel para enfatizar como a pessoa se sente no momento.'], ['Even', 'Coloque even imediatamente antes da informação surpreendente.'], ['In the mood', 'Use for + substantivo ou to + verbo: in the mood for coffee; in the mood to talk.']],
            examples: ['She is usually cheerful.', 'He feels upset today.', 'She did not even say hello.', 'I am not in the mood to go out.'],
            helpingYou: [['Smile at', 'At introduz a pessoa que recebe o sorriso.', 'The child smiled at the waiter.'], ['In the mood for', 'Depois de for, use substantivo ou verbo com -ing.', 'I am in the mood for dancing.'], ['In the mood to', 'Com uma ação específica, use to + forma base.', 'I am not in the mood to talk.']],
            expressions: [['be in a good mood', 'estar de bom humor', 'Use be antes do bloco.', 'She is in a good mood today.'], ['be in a bad mood', 'estar de mau humor', 'Mood é substantivo; use a.', 'He woke up in a bad mood.'], ['be in the mood for', 'estar a fim de', 'For pede substantivo ou -ing.', 'I am in the mood for a movie.'], ['smile at', 'sorrir para', 'At introduz a pessoa.', 'She smiled at the child.'], ['give someone space', 'dar espaço a alguém', 'Someone fica entre give e space.', 'Give him some space.'], ['cheer up', 'animar-se; animar alguém', 'Pode ser intransitivo ou separável.', 'This song always cheers me up.']],
            translations: [{ pt: 'Ela é uma pessoa muito paciente.', en: 'She is a very patient person.' }, { pt: 'Ele está de mau humor hoje.', en: 'He is in a bad mood today.' }, { pt: 'Ela nem sorriu para mim.', en: 'She did not even smile at me.' }, { pt: 'Não estou a fim de sair.', en: 'I am not in the mood to go out.' }, { pt: 'Ele parece chateado.', en: 'He seems upset.' }, { pt: 'Dê um pouco de espaço a ela.', en: 'Give her some space.' }, { pt: 'Essa música sempre me anima.', en: 'This song always cheers me up.' }, { pt: 'Ela geralmente é alegre e falante.', en: 'She is usually cheerful and talkative.' }],
            dialogues: [[['A', 'Why is Clara so quiet?'], ['B', 'She is just not in the mood to talk.']], [['A', 'What is your new coworker like?'], ['B', 'He is honest, patient, and very friendly.']]],
            readingTitle: 'Not Her Usual Self',
            reading: 'Lia is usually cheerful and talkative, but on Monday she seemed quiet and upset. Her coworkers first thought she was angry. Then they learned that she received some difficult news that morning. They gave her some space, and one friend invited her for coffee. By the afternoon, Lia felt better and even smiled at a joke.',
            readingQuestions: [{ question: 'How is Lia usually?', answer: 'She is usually cheerful and talkative.' }, { question: 'How did she seem on Monday?', answer: 'She seemed quiet and upset.' }, { question: 'What did her coworkers do?', answer: 'They gave her some space.' }, { question: 'What happened in the afternoon?', answer: 'She felt better and smiled at a joke.' }],
            guidedConversation: { questions: ['Which adjectives describe your personality?', 'What puts you in a good mood?', 'What do you do when a friend seems upset?', 'Are you usually in the mood to talk in the morning?'], support: ['I am usually...', 'I feel...', 'in a good mood', 'smile at', 'give someone space'] }
        }),

        15: lesson(15, {
            title: 'Accidents and the Human Body',
            label: 'accidents human body reflexive pronouns happen have you ever careful',
            themes: ['minor accidents', 'parts of the body', 'life experiences and safety'],
            objectives: ['nomear partes do corpo e ferimentos leves', 'usar pronomes reflexivos', 'perguntar sobre experiências com have you ever', 'alertar alguém com be careful'],
            introDialogue: [['Nurse', 'What happened to your hand?'], ['Davi', 'I cut myself while I was cooking.'], ['Nurse', 'Have you ever had a cut this deep before?'], ['Davi', 'No, never. It happened very quickly.'], ['Nurse', 'I will clean it. Be careful when you use that knife again.'], ['Davi', 'I will. Thank you.']],
            vocab: [['head', 'cabeça', 'My head hurts.'], ['shoulder', 'ombro', 'She hurt her shoulder.'], ['arm', 'braço', 'He broke his arm.'], ['wrist', 'pulso', 'My wrist is sore.'], ['knee', 'joelho', 'She injured her knee.'], ['ankle', 'tornozelo', 'I twisted my ankle.'], ['cut', 'corte', 'The cut is not deep.'], ['bruise', 'hematoma', 'He has a bruise on his leg.']],
            verbRows: [['hurt', 'hurt', 'hurt', 'machucar; doer'], ['cut', 'cut', 'cut', 'cortar'], ['fall', 'fell', 'fallen', 'cair'], ['happen', 'happened', 'happened', 'acontecer']],
            grammarTable: { title: 'Acidente, experiência e pronome reflexivo', headers: ['Uso', 'Estrutura', 'Exemplo'], rows: [['Ação sobre si mesmo', 'verb + reflexive pronoun', 'I cut myself.'], ['Perguntar experiência', 'Have you ever + participle?', 'Have you ever broken a bone?'], ['Evento passado', 'What happened?', 'What happened to your knee?'], ['Aviso', 'Be careful + complement', 'Be careful with that knife.']] },
            grammar: [['Reflexivos', 'Use myself, yourself, himself, herself, itself, ourselves, yourselves e themselves quando sujeito e objeto são a mesma pessoa.'], ['Have you ever', 'Use particípio para perguntar se algo já aconteceu em algum momento da vida.'], ['Happen to', 'Use happen to + pessoa/coisa: What happened to your arm?']],
            examples: ['I hurt myself at the gym.', 'She cut herself while cooking.', 'Have you ever broken a bone?', 'Be careful on the wet floor.'],
            helpingYou: [['Sem artigo com possessivo', 'Diga my arm ou the arm, mas não the my arm.', 'I hurt my arm.'], ['Hurt pode não mudar', 'As três formas são hurt; o contexto mostra o tempo.', 'I hurt my knee yesterday.'], ['Careful with/about', 'Use with antes do objeto e about antes do risco ou decisão.', 'Be careful with the knife. Be careful about what you lift.']],
            expressions: [['What happened?', 'O que aconteceu?', 'Pergunta geral sobre o evento.', 'What happened at the gym?'], ['What happened to...?', 'O que aconteceu com...?', 'To introduz a pessoa ou parte afetada.', 'What happened to your hand?'], ['Have you ever...?', 'Você já...?', 'Use o particípio depois de ever.', 'Have you ever broken a bone?'], ['Be careful!', 'Tenha cuidado!', 'Pode vir sozinho como aviso.', 'Be careful! The floor is wet.'], ['hurt yourself', 'machucar-se', 'Ajuste o reflexivo ao sujeito.', 'Did you hurt yourself?'], ['call for help', 'pedir ajuda', 'For faz parte do bloco.', 'She called for help.']],
            translations: [{ pt: 'O que aconteceu com sua mão?', en: 'What happened to your hand?' }, { pt: 'Eu me cortei enquanto cozinhava.', en: 'I cut myself while I was cooking.' }, { pt: 'Você já quebrou um osso?', en: 'Have you ever broken a bone?' }, { pt: 'Eu nunca machuquei meu joelho.', en: 'I have never hurt my knee.' }, { pt: 'Cuidado com esse piso molhado.', en: 'Be careful on that wet floor.' }, { pt: 'Ela torceu o tornozelo ontem.', en: 'She twisted her ankle yesterday.' }, { pt: 'Eles se machucaram no acidente.', en: 'They hurt themselves in the accident.' }, { pt: 'Nós pedimos ajuda imediatamente.', en: 'We called for help immediately.' }],
            dialogues: [[['A', 'What happened to your ankle?'], ['B', 'I fell and hurt myself during a run.']], [['A', 'Have you ever broken a bone?'], ['B', 'No, I have not, but I have had a bad cut.']]],
            readingTitle: 'A Small Accident in the Kitchen',
            reading: 'Renato was preparing dinner when he cut himself with a sharp knife. He washed the cut, but it continued to bleed, so he called his sister for help. She took him to a clinic. The nurse cleaned his hand and told him to be careful with the bandage. It was Renato’s first time getting stitches, but the procedure was quick.',
            readingQuestions: [{ question: 'What was Renato doing?', answer: 'He was preparing dinner.' }, { question: 'How did he hurt himself?', answer: 'He cut himself with a knife.' }, { question: 'Who helped him?', answer: 'His sister helped him.' }, { question: 'Was it his first time getting stitches?', answer: 'Yes, it was.' }],
            guidedConversation: { questions: ['Have you ever had a minor accident?', 'What happened?', 'Which part of the body did you hurt?', 'What safety advice would you give?'], support: ['I hurt myself...', 'What happened to...?', 'Have you ever...?', 'Be careful with...'] }
        }),

        17: lesson(17, {
            title: 'Money and Shopping 1 · Compare and Pay',
            label: 'money shopping comparatives pay for both of us',
            themes: ['comparing products', 'prices and value', 'paying for another person'],
            objectives: ['comparar preços e produtos', 'usar adjetivos comparativos com precisão', 'usar pay for com compras', 'usar both of us para duas pessoas'],
            introDialogue: [['Nina', 'Which backpack do you prefer?'], ['Alex', 'The blue one is lighter, but the black one is more durable.'], ['Nina', 'The black one is also more expensive.'], ['Alex', 'True, but it will last longer. I can pay for it today.'], ['Nina', 'Are you sure? We both need new bags.'], ['Alex', 'There is a discount if we buy two. That is better for both of us.']],
            vocab: [['price', 'preço', 'The price is reasonable.'], ['discount', 'desconto', 'There is a twenty-percent discount.'], ['cash', 'dinheiro em espécie', 'Do you pay in cash?'], ['card', 'cartão', 'I paid by card.'], ['receipt', 'recibo', 'Keep the receipt.'], ['quality', 'qualidade', 'The quality is excellent.'], ['durable', 'durável', 'This bag is more durable.'], ['cheap', 'barato', 'The cheaper option is smaller.']],
            verbRows: [['pay', 'paid', 'paid', 'pagar'], ['cost', 'cost', 'cost', 'custar'], ['compare', 'compared', 'compared', 'comparar'], ['save', 'saved', 'saved', 'economizar']],
            grammarTable: { title: 'Comparar duas opções', headers: ['Tipo', 'Estrutura', 'Exemplo'], rows: [['Adjetivo curto', 'adjective-er + than', 'This bag is lighter than that one.'], ['Adjetivo longo', 'more + adjective + than', 'It is more durable.'], ['Comparativo irregular', 'good → better; bad → worse', 'This deal is better.'], ['Beneficiário', 'both of + object pronoun', 'It is good for both of us.']] },
            grammar: [['Comparativo', 'Use -er com muitos adjetivos curtos e more com adjetivos longos.'], ['Than', 'Than apresenta a segunda opção da comparação.'], ['Both of us', 'Depois de of, use pronome objeto: both of us, both of them.']],
            examples: ['This shirt is cheaper than that one.', 'The black bag is more durable.', 'This deal is better for both of us.', 'Who paid for the tickets?'],
            helpingYou: [['Pay for', 'Pay pede for antes da compra ou serviço; sem for, pode vir a pessoa.', 'I paid for the shoes. I paid the cashier.'], ['By card, in cash', 'Use by com card e in com cash.', 'Can I pay by card? I paid in cash.'], ['One/ones', 'Use one ou ones para não repetir o substantivo.', 'The blue one is cheaper.']],
            expressions: [['How much does it cost?', 'Quanto custa?', 'Does pede cost na forma base.', 'How much does this jacket cost?'], ['pay for', 'pagar por', 'For introduz a compra.', 'I paid for both tickets.'], ['both of us', 'nós dois', 'Of pede pronome objeto.', 'This works for both of us.'], ['on sale', 'em promoção', 'Use on como parte fixa do bloco.', 'These shoes are on sale.'], ['good value', 'bom custo-benefício', 'Value é incontável neste sentido.', 'It is good value for money.'], ['try on', 'experimentar roupa', 'Phrasal verb separável com pronome.', 'Try it on.']],
            translations: [{ pt: 'Esta bolsa é mais leve que aquela.', en: 'This bag is lighter than that one.' }, { pt: 'O casaco preto é mais durável.', en: 'The black coat is more durable.' }, { pt: 'Quanto custa esta camisa?', en: 'How much does this shirt cost?' }, { pt: 'Eu paguei pelos dois ingressos.', en: 'I paid for both tickets.' }, { pt: 'Isso é melhor para nós dois.', en: 'This is better for both of us.' }, { pt: 'Esses sapatos estão em promoção.', en: 'These shoes are on sale.' }, { pt: 'Posso pagar com cartão?', en: 'Can I pay by card?' }, { pt: 'Experimente antes de comprar.', en: 'Try it on before you buy it.' }],
            dialogues: [[['A', 'Which phone is cheaper?'], ['B', 'The gray one, but the blue one has a better camera.']], [['A', 'Who is going to pay for dinner?'], ['B', 'I can pay. The discount is good for both of us.']]],
            readingTitle: 'The Cheaper One or the Better One?',
            reading: 'Bia compared two pairs of shoes. The first pair was cheaper and lighter. The second pair was more expensive but more durable. Both were on sale. She tried them on, checked the quality, and decided that the second pair was better value. She paid by card and kept the receipt.',
            readingQuestions: [{ question: 'Which pair was cheaper?', answer: 'The first pair was cheaper.' }, { question: 'Which pair was more durable?', answer: 'The second pair was more durable.' }, { question: 'Why did Bia choose the second pair?', answer: 'Because it was better value.' }, { question: 'How did she pay?', answer: 'She paid by card.' }],
            guidedConversation: { questions: ['What do you compare before buying something?', 'Do you prefer the cheaper option or the more durable one?', 'When do you pay in cash?', 'What purchase would be useful for both you and a friend?'], support: ['cheaper than', 'more...than', 'pay for', 'both of us', 'on sale'] }
        }),

        19: lesson(19, {
            title: 'Money and Shopping 2 · Borrow or Lend?',
            label: 'money shopping neither none borrow lend mind ing',
            themes: ['borrowing and lending', 'sharing shopping decisions', 'polite responses'],
            objectives: ['diferenciar borrow de lend', 'usar neither of them e none', 'usar mind seguido de verbo com -ing', 'responder com educação a pedidos envolvendo dinheiro ou objetos'],
            introDialogue: [['Rui', 'Could I borrow your charger? Neither of mine is working.'], ['Sara', 'Sure. I do not mind lending you this one.'], ['Rui', 'Thanks. Which cable should I use?'], ['Sara', 'Neither of them. This charger does not need a cable.'], ['Rui', 'Great. I will return it after lunch.'], ['Sara', 'No problem. Just do not forget it.']],
            vocab: [['wallet', 'carteira', 'I left my wallet at home.'], ['change', 'troco', 'Keep the change.'], ['coin', 'moeda', 'I need a coin.'], ['cashier', 'caixa', 'Ask the cashier for help.'], ['loan', 'empréstimo', 'The bank approved the loan.'], ['debt', 'dívida', 'He paid the debt.'], ['choice', 'escolha', 'Neither choice is ideal.'], ['item', 'item; produto', 'None of the items is available.']],
            verbRows: [['borrow', 'borrowed', 'borrowed', 'pegar emprestado'], ['lend', 'lent', 'lent', 'emprestar'], ['mind', 'minded', 'minded', 'importar-se'], ['return', 'returned', 'returned', 'devolver']],
            grammarTable: { title: 'Borrow, lend, neither e none', headers: ['Uso', 'Estrutura', 'Exemplo'], rows: [['Receber temporariamente', 'borrow + object + from', 'I borrowed money from Ana.'], ['Dar temporariamente', 'lend + person + object', 'Ana lent me money.'], ['Nenhum de dois', 'neither of + object pronoun', 'Neither of them works.'], ['Não se importar', 'do not mind + verb-ing', 'I do not mind waiting.']] },
            grammar: [['Borrow x lend', 'Borrow observa quem recebe; lend observa quem entrega.'], ['Neither e none', 'Neither trata de duas opções. None pode tratar de três ou mais.'], ['Mind + -ing', 'Depois de mind, uma atividade vem com -ing, nunca com to.']],
            examples: ['Can I borrow your pen?', 'I can lend you ten dollars.', 'Neither of them is available.', 'I do not mind waiting.'],
            helpingYou: [['Borrow from', 'Use from antes da pessoa que fornece o objeto.', 'I borrowed a book from Leo.'], ['Lend to ou lend someone', 'Diga lend something to someone ou lend someone something.', 'She lent the car to me. She lent me the car.'], ['Mind + possessivo opcional', 'Em pedidos, Do you mind my opening...? é formal; Do you mind if I open...? é muito natural.', 'Do you mind if I use this chair?']],
            expressions: [['Can I borrow...?', 'Posso pegar emprestado...?', 'Borrow recebe o objeto.', 'Can I borrow your umbrella?'], ['lend someone something', 'emprestar algo a alguém', 'A pessoa vem antes do objeto.', 'Could you lend me a pen?'], ['Neither of them', 'nenhum dos dois', 'Of pede pronome objeto.', 'Neither of them fits.'], ['None of them', 'nenhum deles', 'Use para três ou mais opções.', 'None of them is cheap.'], ['I do not mind + -ing', 'Eu não me importo de...', 'Mind pede verbo com -ing.', 'I do not mind waiting.'], ['pay back', 'devolver dinheiro', 'Phrasal verb separável com pronome.', 'I will pay you back tomorrow.']],
            translations: [{ pt: 'Posso pegar seu carregador emprestado?', en: 'Can I borrow your charger?' }, { pt: 'Você poderia me emprestar uma caneta?', en: 'Could you lend me a pen?' }, { pt: 'Nenhum dos dois funciona.', en: 'Neither of them works.' }, { pt: 'Nenhum deles está em promoção.', en: 'None of them is on sale.' }, { pt: 'Eu não me importo de esperar.', en: 'I do not mind waiting.' }, { pt: 'Peguei dinheiro emprestado da minha irmã.', en: 'I borrowed money from my sister.' }, { pt: 'Ela me emprestou o carro.', en: 'She lent me the car.' }, { pt: 'Eu te pago de volta amanhã.', en: 'I will pay you back tomorrow.' }],
            dialogues: [[['A', 'Could you lend me twenty dollars?'], ['B', 'Sure. When can you pay me back?']], [['A', 'Which jacket should I buy?'], ['B', 'Neither of them. None of the colors looks good.']]],
            readingTitle: 'The Forgotten Wallet',
            reading: 'Marcelo reached the cashier and realized that his wallet was at home. He asked his friend to lend him enough money for lunch. His friend did not mind helping, but he had very little cash. They checked two payment apps, but neither of them was working. In the end, the cashier let Marcelo return after lunch to pay.',
            readingQuestions: [{ question: 'What did Marcelo forget?', answer: 'He forgot his wallet.' }, { question: 'What did he ask his friend to do?', answer: 'He asked his friend to lend him money.' }, { question: 'Were the payment apps working?', answer: 'No. Neither of them was working.' }, { question: 'What solution did the cashier offer?', answer: 'Marcelo could return after lunch to pay.' }],
            guidedConversation: { questions: ['What things do people often borrow?', 'Do you mind lending books to friends?', 'When did you last borrow something?', 'What should someone do before borrowing money?'], support: ['borrow from', 'lend someone', 'Neither of them', 'I do not mind + -ing', 'pay back'] }
        }),

        21: lesson(21, {
            title: 'Family and Friendship',
            label: 'family friendship become get used to',
            themes: ['changes in relationships', 'childhood friends', 'getting used to new situations'],
            objectives: ['falar sobre mudanças nos relacionamentos', 'usar become e get para mudanças', 'descrever hábitos passados com used to', 'diferenciar used to de be/get used to'],
            introDialogue: [['Lia', 'Do you still talk to your childhood friend Bruno?'], ['Marta', 'Yes. We used to live on the same street.'], ['Lia', 'Is he still quiet?'], ['Marta', 'Not anymore. He became much more confident in college.'], ['Lia', 'Do you see each other often?'], ['Marta', 'Not as often as before, but we are getting used to living in different cities.']],
            vocab: [['childhood', 'infância', 'We met in childhood.'], ['friendship', 'amizade', 'Their friendship is strong.'], ['relative', 'parente', 'Many relatives came to the party.'], ['neighbor', 'vizinho', 'My neighbor became a close friend.'], ['confident', 'confiante', 'She became more confident.'], ['supportive', 'solidário; apoiador', 'He is a supportive friend.'], ['close', 'próximo; íntimo', 'We are very close.'], ['memory', 'lembrança', 'That song brings back a memory.']],
            verbRows: [['become', 'became', 'become', 'tornar-se'], ['get', 'got', 'gotten', 'ficar; obter'], ['meet', 'met', 'met', 'conhecer; encontrar'], ['grow up', 'grew up', 'grown up', 'crescer']],
            grammarTable: { title: 'Mudanças e adaptação', headers: ['Uso', 'Estrutura', 'Exemplo'], rows: [['Hábito passado', 'used to + base verb', 'We used to live nearby.'], ['Familiaridade atual', 'be used to + noun/-ing', 'I am used to the distance.'], ['Processo de adaptação', 'get used to + noun/-ing', 'We are getting used to living apart.'], ['Mudança de estado', 'become/get + adjective', 'He became confident.']] },
            grammar: [['Used to', 'Descreve hábito ou estado passado que não é mais verdadeiro.'], ['Be used to', 'Significa estar acostumado; to é preposição e pede substantivo ou -ing.'], ['Get used to', 'Destaca o processo de se acostumar a uma nova situação.']],
            examples: ['We used to play together every day.', 'I am used to living alone.', 'She is getting used to her new school.', 'He became more patient.'],
            helpingYou: [['Do passado para agora', 'Used to + base não usa be: I used to live, não I was used to live para hábito passado.', 'We used to be neighbors.'], ['To como preposição', 'Em be/get used to, um verbo depois de to recebe -ing.', 'I am used to waking up early.'], ['Become x get', 'Become costuma soar mais neutro ou formal; get é muito comum na fala.', 'He became confident. He got tired.']],
            expressions: [['used to', 'costumava', 'Depois, use verbo na forma base.', 'We used to talk every day.'], ['be used to', 'estar acostumado a', 'To é preposição; use substantivo ou -ing.', 'I am used to the noise.'], ['get used to', 'acostumar-se a', 'Destaca adaptação.', 'She got used to working nights.'], ['grow up together', 'crescer juntos', 'Together fecha o bloco.', 'We grew up together.'], ['keep in touch', 'manter contato', 'Use with para dizer com quem.', 'We keep in touch online.'], ['be there for someone', 'estar presente para alguém', 'For introduz a pessoa apoiada.', 'Good friends are there for you.']],
            translations: [{ pt: 'Nós costumávamos morar na mesma rua.', en: 'We used to live on the same street.' }, { pt: 'Estou acostumado com a distância.', en: 'I am used to the distance.' }, { pt: 'Ela está se acostumando a trabalhar de casa.', en: 'She is getting used to working from home.' }, { pt: 'Ele ficou mais confiante.', en: 'He became more confident.' }, { pt: 'Nós crescemos juntos.', en: 'We grew up together.' }, { pt: 'Ainda mantemos contato.', en: 'We still keep in touch.' }, { pt: 'Bons amigos estão presentes para você.', en: 'Good friends are there for you.' }, { pt: 'Eles não são tão próximos quanto antes.', en: 'They are not as close as before.' }],
            dialogues: [[['A', 'Did you use to play with your cousins?'], ['B', 'Yes. We used to spend every vacation together.']], [['A', 'Are you used to living far from your family?'], ['B', 'Not yet, but I am getting used to it.']]],
            readingTitle: 'Friends in Different Cities',
            reading: 'Carol and Pri grew up together and used to meet almost every day. After college, Pri moved to another city and became very busy. At first, both friends found the change difficult. Now they are used to sending voice messages during the week and making one long video call on Sundays. The routine is different, but their friendship is still close.',
            readingQuestions: [{ question: 'What did Carol and Pri use to do?', answer: 'They used to meet almost every day.' }, { question: 'What changed after college?', answer: 'Pri moved to another city.' }, { question: 'How do they communicate now?', answer: 'They send voice messages and make video calls.' }, { question: 'Is their friendship still close?', answer: 'Yes, it is.' }],
            guidedConversation: { questions: ['Who did you use to spend time with as a child?', 'What family routine changed as you grew up?', 'What new situation are you getting used to?', 'How do you keep in touch with distant friends?'], support: ['used to + base', 'be used to + -ing', 'get used to + -ing', 'keep in touch'] }
        }),

        23: lesson(23, {
            title: 'Fashionable and Unfashionable',
            label: 'fashion fads stop ing to die dye in fashion out of fashion',
            themes: ['fashion trends', 'changing personal style', 'fads and responsible choices'],
            objectives: ['falar sobre o que está dentro ou fora de moda', 'diferenciar stop doing de stop to do', 'distinguir die de dye', 'descrever tendências respeitando escolhas pessoais'],
            introDialogue: [['Eva', 'Are wide-leg jeans in fashion again?'], ['Noah', 'Yes, but I stopped following every trend.'], ['Eva', 'Why?'], ['Noah', 'I was buying clothes I rarely wore. Now I stop to think before I buy anything.'], ['Eva', 'That makes sense. I want to dye this old jacket instead of replacing it.'], ['Noah', 'Great idea. Personal style never really goes out of fashion.']],
            vocab: [['trend', 'tendência', 'This trend became popular online.'], ['style', 'estilo', 'She has a simple style.'], ['outfit', 'look; conjunto de roupa', 'That outfit looks comfortable.'], ['fabric', 'tecido', 'The fabric feels soft.'], ['pattern', 'estampa; padrão', 'I like this pattern.'], ['brand', 'marca', 'The brand is expensive.'], ['fashionable', 'na moda', 'These colors are fashionable.'], ['unfashionable', 'fora de moda', 'The cut looks unfashionable now.']],
            verbRows: [['wear', 'wore', 'worn', 'vestir; usar'], ['stop', 'stopped', 'stopped', 'parar'], ['dye', 'dyed', 'dyed', 'tingir'], ['die', 'died', 'died', 'morrer']],
            grammarTable: { title: 'Stop + -ing ou stop + to', headers: ['Forma', 'Sentido', 'Exemplo'], rows: [['stop + verb-ing', 'parar uma atividade', 'I stopped buying fast fashion.'], ['stop + to + base', 'parar para fazer outra ação', 'I stopped to look at the window.'], ['in fashion', 'na moda', 'This color is in fashion.'], ['out of fashion', 'fora de moda', 'That pattern is out of fashion.']] },
            grammar: [['Stop doing', 'A atividade depois de stop termina.'], ['Stop to do', 'A primeira ação pausa para que outra ação aconteça.'], ['Die x dye', 'Die significa morrer; dye significa tingir. O passado é died e dyed.']],
            examples: ['I stopped wearing that jacket.', 'We stopped to look at the display.', 'Bright colors are in fashion.', 'She dyed her old jeans black.'],
            helpingYou: [['Mude o sentido', 'Compare: stopped talking = parou de falar; stopped to talk = parou para conversar.', 'He stopped talking. He stopped to talk to me.'], ['In/out of', 'Aprenda as preposições dentro dos blocos in fashion e out of fashion.', 'That style is back in fashion.'], ['Wear x use', 'Para roupas e acessórios no corpo, use wear.', 'She is wearing a blue jacket.']],
            expressions: [['in fashion', 'na moda', 'Use in como parte do bloco.', 'Wide-leg jeans are in fashion.'], ['out of fashion', 'fora de moda', 'Use out of como bloco completo.', 'That style went out of fashion.'], ['come back into fashion', 'voltar à moda', 'Into destaca a entrada no estado.', 'This pattern came back into fashion.'], ['try on', 'experimentar roupa', 'Com pronome, separe: try it on.', 'Can I try this on?'], ['go with', 'combinar com', 'With introduz a outra peça.', 'These shoes go with the dress.'], ['instead of', 'em vez de', 'Depois de of, use substantivo ou -ing.', 'Dye it instead of buying a new one.']],
            translations: [{ pt: 'Essas calças estão na moda.', en: 'These pants are in fashion.' }, { pt: 'Esse estilo saiu de moda.', en: 'That style went out of fashion.' }, { pt: 'Parei de comprar roupas que não uso.', en: 'I stopped buying clothes I do not wear.' }, { pt: 'Parei para olhar a vitrine.', en: 'I stopped to look at the window display.' }, { pt: 'Ela tingiu a jaqueta de preto.', en: 'She dyed the jacket black.' }, { pt: 'Posso experimentar isto?', en: 'Can I try this on?' }, { pt: 'Esses sapatos combinam com o vestido.', en: 'These shoes go with the dress.' }, { pt: 'Conserte em vez de jogar fora.', en: 'Repair it instead of throwing it away.' }],
            dialogues: [[['A', 'Is this color still in fashion?'], ['B', 'Maybe, but choose it only if you like it.']], [['A', 'Why did you stop buying that brand?'], ['B', 'Because the clothes did not last very long.']]],
            readingTitle: 'A Trend with a Longer Life',
            reading: 'Mila used to buy a new outfit for every event. Then she stopped following short trends and started choosing durable fabrics. She learned to repair small problems and dyed two old shirts in new colors. Her wardrobe became smaller, but every item worked with several outfits. For Mila, thoughtful choices never go out of fashion.',
            readingQuestions: [{ question: 'What did Mila use to do?', answer: 'She used to buy a new outfit for every event.' }, { question: 'What did she stop doing?', answer: 'She stopped following short trends.' }, { question: 'What did she dye?', answer: 'She dyed two old shirts.' }, { question: 'How did her wardrobe change?', answer: 'It became smaller and more versatile.' }],
            guidedConversation: { questions: ['Which styles are in fashion now?', 'Have you stopped wearing any trend?', 'Do you stop to compare prices before buying clothes?', 'Would you dye or repair an old item?'], support: ['in fashion', 'out of fashion', 'stop + -ing', 'stop to + base', 'instead of + -ing'] }
        }),

        25: lesson(25, {
            title: 'Giving and Asking for Advice',
            label: 'advice should care about lie say tell instead of ing',
            themes: ['asking for advice', 'honesty and difficult decisions', 'giving practical alternatives'],
            objectives: ['pedir e dar conselhos com should', 'usar care about com substantivo ou -ing', 'diferenciar lie, say e tell', 'usar instead of seguido de substantivo ou -ing'],
            introDialogue: [['Ben', 'I made a mistake at work, and I do not know what to do.'], ['Clara', 'You should tell your manager the truth.'], ['Ben', 'I am worried she will be angry.'], ['Clara', 'She may be upset, but lying will make the problem worse.'], ['Ben', 'Should I send a message?'], ['Clara', 'Talk to her in person instead of sending a long message. Show that you care about fixing it.']],
            vocab: [['advice', 'conselho', 'I need some advice.'], ['truth', 'verdade', 'Tell me the truth.'], ['lie', 'mentira', 'That was a serious lie.'], ['mistake', 'erro', 'Everyone makes mistakes.'], ['choice', 'escolha', 'It is your choice.'], ['consequence', 'consequência', 'Think about the consequence.'], ['honest', 'honesto', 'Give an honest answer.'], ['responsible', 'responsável', 'That was a responsible decision.']],
            verbRows: [['advise', 'advised', 'advised', 'aconselhar'], ['care', 'cared', 'cared', 'importar-se'], ['lie', 'lied', 'lied', 'mentir'], ['tell', 'told', 'told', 'contar; dizer'], ['say', 'said', 'said', 'dizer']],
            grammarTable: { title: 'Conselho e escolha de verbo', headers: ['Uso', 'Estrutura', 'Exemplo'], rows: [['Dar conselho', 'should + base verb', 'You should tell the truth.'], ['Conselho negativo', 'should not + base verb', 'You should not lie.'], ['Importar-se', 'care about + noun/-ing', 'I care about helping.'], ['Alternativa', 'instead of + noun/verb-ing', 'Call instead of texting.']] },
            grammar: [['Should', 'Depois de should, use a forma base sem to.'], ['Say x tell', 'Say destaca as palavras; tell normalmente vem com a pessoa: say something, tell someone.'], ['Instead of', 'Of é preposição; um verbo depois dela recebe -ing.']],
            examples: ['You should talk to her.', 'You should not hide the mistake.', 'Tell your manager what happened.', 'Call her instead of sending a message.'],
            helpingYou: [['Advice é incontável', 'Diga some advice ou a piece of advice, não an advice.', 'Can you give me some advice?'], ['Tell someone', 'Tell normalmente precisa da pessoa; say pode vir sem pessoa ou com to.', 'Tell me the truth. Say it to me.'], ['Instead of + -ing', 'Depois de of, a atividade recebe -ing.', 'Listen instead of interrupting.']],
            expressions: [['What should I do?', 'O que eu deveria fazer?', 'Should vem antes do sujeito na pergunta.', 'What should I do now?'], ['You should...', 'Você deveria...', 'Depois de should, use forma base.', 'You should apologize.'], ['care about', 'importar-se com', 'About pede substantivo ou -ing.', 'I care about doing the right thing.'], ['tell the truth', 'dizer a verdade', 'Use tell neste bloco.', 'Please tell the truth.'], ['instead of', 'em vez de', 'Use substantivo ou verbo + -ing.', 'Talk instead of arguing.'], ['think it over', 'pensar melhor', 'Phrasal verb separável com pronome.', 'Think it over before you decide.']],
            translations: [{ pt: 'O que eu deveria fazer?', en: 'What should I do?' }, { pt: 'Você deveria dizer a verdade.', en: 'You should tell the truth.' }, { pt: 'Você não deveria mentir para ela.', en: 'You should not lie to her.' }, { pt: 'Eu me importo em fazer a coisa certa.', en: 'I care about doing the right thing.' }, { pt: 'Fale com ele em vez de mandar mensagem.', en: 'Talk to him instead of sending a message.' }, { pt: 'Ela me contou o que aconteceu.', en: 'She told me what happened.' }, { pt: 'Pense melhor antes de decidir.', en: 'Think it over before you decide.' }, { pt: 'Preciso de um conselho.', en: 'I need some advice.' }],
            dialogues: [[['A', 'What should I tell my friend?'], ['B', 'You should be honest but kind.']], [['A', 'Should I answer now?'], ['B', 'Think it over instead of reacting immediately.']]],
            readingTitle: 'Advice That Solves the Real Problem',
            reading: 'Joana promised to help a friend move, but she also accepted an extra shift at work. She thought about inventing an excuse. Her brother advised her to tell the truth instead of lying. Joana called her friend, explained the conflict, and offered to help the next morning. Her friend appreciated the honest solution.',
            readingQuestions: [{ question: 'What two commitments did Joana have?', answer: 'Helping a friend move and working an extra shift.' }, { question: 'What did she consider doing?', answer: 'She considered inventing an excuse.' }, { question: 'What advice did her brother give?', answer: 'He advised her to tell the truth.' }, { question: 'How did her friend react?', answer: 'Her friend appreciated the honest solution.' }],
            guidedConversation: { questions: ['Who do you ask for advice?', 'What should someone do after making a mistake?', 'When is it difficult to tell the truth?', 'What can people do instead of arguing?'], support: ['What should I do?', 'You should...', 'care about + -ing', 'tell the truth', 'instead of + -ing'] }
        }),

        27: lesson(27, {
            title: 'The Best and the Worst',
            label: 'best worst superlatives ranking',
            themes: ['ranking places and experiences', 'best and worst choices', 'supporting strong opinions'],
            objectives: ['formar superlativos regulares e irregulares', 'usar the antes de superlativos', 'definir o grupo comparado', 'justificar rankings com motivos'],
            introDialogue: [['Luca', 'What was the best place you visited in New York?'], ['Bia', 'Central Park was the most relaxing place for me.'], ['Luca', 'And what was the worst part of the trip?'], ['Bia', 'The traffic. Friday afternoon was the busiest time.'], ['Luca', 'Which restaurant had the best food?'], ['Bia', 'A tiny place near the hotel. It was also the least expensive meal we had.']],
            vocab: [['ranking', 'classificação', 'The ranking changed this year.'], ['choice', 'escolha', 'That was the best choice.'], ['experience', 'experiência', 'It was an unforgettable experience.'], ['crowd', 'multidão', 'The largest crowd arrived at noon.'], ['view', 'vista', 'This hotel has the best view.'], ['service', 'atendimento; serviço', 'The service was excellent.'], ['relaxing', 'relaxante', 'It was the most relaxing day.'], ['disappointing', 'decepcionante', 'The tour was disappointing.']],
            verbRows: [['rank', 'ranked', 'ranked', 'classificar'], ['choose', 'chose', 'chosen', 'escolher'], ['recommend', 'recommended', 'recommended', 'recomendar'], ['visit', 'visited', 'visited', 'visitar']],
            grammarTable: { title: 'Superlativos com contexto', headers: ['Tipo', 'Forma', 'Exemplo'], rows: [['Adjetivo curto', 'the + adjective-est', 'the cheapest option'], ['Adjetivo longo', 'the most + adjective', 'the most relaxing place'], ['Irregular', 'good → best; bad → worst', 'the best meal'], ['Menor grau', 'the least + adjective', 'the least expensive hotel']] },
            grammar: [['The', 'Superlativos normalmente usam the porque identificam um extremo dentro de um grupo.'], ['Grupo', 'Diga in + lugar ou of + conjunto: the best in town; the best of the three.'], ['Irregulares', 'Good vira best; bad vira worst; far pode virar farthest/furthest.']],
            examples: ['This is the cheapest hotel in the area.', 'It was the most exciting tour.', 'That was the worst day of the trip.', 'Which option is the least expensive?'],
            helpingYou: [['In ou of?', 'Use in com lugar/grupo coletivo e of com quantidade ou conjunto explícito.', 'the best in town; the best of the three'], ['Sem comparação vazia', 'Acrescente o grupo para a afirmação ter sentido preciso.', 'It is the safest route on this map.'], ['Most x the most', 'Most também pode significar “a maioria”; no superlativo, use the most.', 'Most people chose the most convenient option.']],
            expressions: [['the best...in', 'o melhor...em', 'Use in com lugar ou grupo.', 'It is the best café in town.'], ['the worst part', 'a pior parte', 'Worst é o superlativo de bad.', 'The delay was the worst part.'], ['one of the best', 'um dos melhores', 'Depois de one of the, use plural.', 'It is one of the best museums.'], ['by far', 'de longe', 'Intensifica comparativo ou superlativo.', 'This was by far the best meal.'], ['the least', 'o menos', 'Use antes de adjetivo longo.', 'It is the least crowded day.'], ['worth it', 'valer a pena', 'It retoma a experiência ou custo.', 'The long line was worth it.']],
            translations: [{ pt: 'Qual foi o melhor lugar que você visitou?', en: 'What was the best place you visited?' }, { pt: 'Este é o hotel mais barato da região.', en: 'This is the cheapest hotel in the area.' }, { pt: 'Foi o passeio mais emocionante.', en: 'It was the most exciting tour.' }, { pt: 'O trânsito foi a pior parte.', en: 'The traffic was the worst part.' }, { pt: 'É um dos melhores museus da cidade.', en: 'It is one of the best museums in the city.' }, { pt: 'Este foi de longe o melhor jantar.', en: 'This was by far the best dinner.' }, { pt: 'Qual opção é a menos cara?', en: 'Which option is the least expensive?' }, { pt: 'A fila longa valeu a pena.', en: 'The long line was worth it.' }],
            dialogues: [[['A', 'What is the best restaurant in your neighborhood?'], ['B', 'The Italian place is by far the best.']], [['A', 'What was the worst part of the event?'], ['B', 'The sound was the most disappointing part.']]],
            readingTitle: 'A Personal City Ranking',
            reading: 'After a week in New York, Camila made a personal ranking. The subway was the fastest way to move around, but Friday was the busiest day. A small museum in Queens was the most surprising attraction, and a neighborhood café served the best breakfast. The hotel had the least comfortable bed, but its location was excellent.',
            readingQuestions: [{ question: 'What was the fastest transportation?', answer: 'The subway was the fastest.' }, { question: 'Which day was the busiest?', answer: 'Friday was the busiest.' }, { question: 'What was the most surprising attraction?', answer: 'A small museum in Queens.' }, { question: 'What was the hotel problem?', answer: 'It had the least comfortable bed.' }],
            guidedConversation: { questions: ['What is the best place in your city?', 'What was your most memorable trip?', 'Which day of the week is the busiest for you?', 'What is one of the worst services you have experienced?'], support: ['the best in', 'the most...', 'the worst...', 'one of the best', 'by far'] }
        }),

        29: lesson(29, {
            title: 'Hopes and Predictions',
            label: 'hopes predictions depend on will going to right away right after',
            themes: ['hopes for the near future', 'predictions based on evidence', 'what happens immediately before or after an event'],
            objectives: ['diferenciar esperanças, planos e previsões', 'escolher will ou going to pelo sentido', 'usar depend on corretamente', 'sequenciar ações com right away e right after'],
            introDialogue: [['Maya', 'Do you think the new year will be different?'], ['Theo', 'I hope so. I am going to change a few habits.'], ['Maya', 'What are you going to start with?'], ['Theo', 'I am going to plan my week right after Sunday dinner.'], ['Maya', 'Will that solve everything?'], ['Theo', 'Probably not. It depends on how consistent I am. But I will start right away.']],
            vocab: [['hope', 'esperança', 'My main hope is to travel.'], ['prediction', 'previsão', 'That prediction may be correct.'], ['future', 'futuro', 'Nobody knows the future.'], ['goal', 'meta', 'Set one realistic goal.'], ['plan', 'plano', 'The plan is ready.'], ['result', 'resultado', 'The result depends on practice.'], ['change', 'mudança', 'Small changes can help.'], ['decision', 'decisão', 'That was a quick decision.']],
            verbRows: [['hope', 'hoped', 'hoped', 'esperar; ter esperança'], ['depend', 'depended', 'depended', 'depender'], ['predict', 'predicted', 'predicted', 'prever'], ['start', 'started', 'started', 'começar'], ['finish', 'finished', 'finished', 'terminar']],
            grammarTable: { title: 'Plano, previsão e reação imediata', headers: ['Ideia', 'Forma', 'Exemplo'], rows: [['Plano decidido', 'be going to + base', 'I am going to study more.'], ['Previsão/opinião', 'will + base', 'I think it will improve.'], ['Dependência', 'depend on + noun/wh-clause', 'It depends on the weather.'], ['Sequência imediata', 'right after + noun/clause', 'Call me right after class.']] },
            grammar: [['Going to', 'Use para intenção ou plano que já existe e para previsão com evidência visível.'], ['Will', 'Use para previsão baseada em opinião, decisão tomada agora, promessa ou oferta.'], ['After e before', 'Depois de right after/right before, use substantivo ou oração no presente para referência futura.']],
            examples: ['I am going to start a new course.', 'I think it will be useful.', 'It depends on my schedule.', 'I will call you right after the meeting.'],
            helpingYou: [['Depend on', 'Depend sempre pede on antes do fator que influencia o resultado.', 'It depends on the weather.'], ['Presente depois de after', 'Mesmo falando do futuro, use Present Simple na oração com after.', 'I will call you after I finish.'], ['Hope x wish', 'Hope combina com possibilidade real; wish costuma apresentar situação imaginada ou contrária ao fato.', 'I hope it works. I wish I had more time.']],
            expressions: [['I hope so.', 'Espero que sim.', 'So substitui a ideia anterior.', 'Will it work? — I hope so.'], ['It depends on...', 'Depende de...', 'On introduz o fator.', 'It depends on the price.'], ['right away', 'imediatamente', 'Bloco adverbial sem preposição extra.', 'I will do it right away.'], ['right after', 'logo depois de', 'Use substantivo ou oração.', 'Call me right after class.'], ['right before', 'logo antes de', 'Use substantivo ou oração.', 'Check it right before you leave.'], ['look forward to', 'aguardar com expectativa', 'To é preposição; use substantivo ou -ing.', 'I look forward to traveling.']],
            translations: [{ pt: 'Espero que o próximo ano seja melhor.', en: 'I hope next year will be better.' }, { pt: 'Vou mudar alguns hábitos.', en: 'I am going to change a few habits.' }, { pt: 'Acho que vai funcionar.', en: 'I think it will work.' }, { pt: 'Depende do meu horário.', en: 'It depends on my schedule.' }, { pt: 'Vou começar imediatamente.', en: 'I will start right away.' }, { pt: 'Ligue para mim logo depois da aula.', en: 'Call me right after class.' }, { pt: 'Vou conferir logo antes de sair.', en: 'I will check right before I leave.' }, { pt: 'Estou ansioso para viajar.', en: 'I look forward to traveling.' }],
            dialogues: [[['A', 'Are you going to study next year?'], ['B', 'I hope so. It depends on my work schedule.']], [['A', 'When will you call the client?'], ['B', 'Right after I finish this meeting.']]],
            readingTitle: 'A Plan for the New Year',
            reading: 'At the end of December, Ravi wrote three realistic goals. He is going to exercise twice a week, call his family every Sunday, and save money for a trip. He hopes the routine will reduce stress, but he knows the result depends on consistency. He is going to prepare his calendar right away and review it right after each month ends.',
            readingQuestions: [{ question: 'How many goals did Ravi write?', answer: 'He wrote three goals.' }, { question: 'How often is he going to exercise?', answer: 'Twice a week.' }, { question: 'What does the result depend on?', answer: 'It depends on consistency.' }, { question: 'When will he review the calendar?', answer: 'Right after each month ends.' }],
            guidedConversation: { questions: ['What do you hope will happen next year?', 'What are you going to change?', 'What result depends on your consistency?', 'What will you do right after this course?'], support: ['I hope...', 'I am going to...', 'I think...will', 'It depends on...', 'right after'] }
        })
    };

    globalScope.A2V3PremiumCurriculum = Object.freeze({
        version: '2026.08.16-premium-pattern',
        disableLegacyEditorial: true,
        lessons: Object.freeze(lessons)
    });
}(window));
