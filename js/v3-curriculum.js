(function attachV3Curriculum(globalScope) {
    'use strict';

    if (!globalScope.V3LessonEditorial) {
        const editorialTransforms = new Map();
        const editorialKey = (moduleId, lessonNumber) => `${String(moduleId).toLowerCase()}:${Number(lessonNumber)}`;
        globalScope.V3LessonEditorial = Object.freeze({
            register(moduleId, lessonNumber, transform) {
                if (typeof transform !== 'function') throw new TypeError('A transformação editorial da lição precisa ser uma função.');
                const key = editorialKey(moduleId, lessonNumber);
                editorialTransforms.set(key, [...(editorialTransforms.get(key) || []), transform]);
            },
            apply(moduleId, lessonNumber, lesson) {
                return (editorialTransforms.get(editorialKey(moduleId, lessonNumber)) || [])
                    .reduce((current, transform) => transform(current) || current, lesson);
            },
            has(moduleId, lessonNumber) {
                return editorialTransforms.has(editorialKey(moduleId, lessonNumber));
            }
        });
    }

    const VERSION = '2026.07-action-oriented-32';
    const MODULE_VERSIONS = {
        'a1-v3': '2026.08.05-expanded-a1-32',
        'a2-v3': '2026.08.16-premium-book-2-cycle',
        'b1-v3': '2026.08.22-lexical-communicative-cycle'
    };
    const SKILLS = ['reception', 'production', 'interaction', 'mediation', 'linguistic', 'online'];

    // Controlled semantic vocabulary used by missions, music and automated audits.
    // Keep these tags independent from lesson numbers so a curriculum reorder does
    // not silently attach an activity from an older sequence.
    const SEMANTIC_RULES = [
        ['introductions', /\b(greeting|greetings|introduc\w*|apresenta\w*|cumpriment\w*|first day|welcome)\b/],
        ['identity-personal-data', /\b(name|names|nome|profiss\w*|address|endere\w*|contact|contato|alphabet|alfabeto|spell|soletra\w*|nationalit\w*|nacionalidade|email)\b/],
        ['numbers-quantities', /\b(number|numbers|numero|numeros|quantit|much|many|some|any|countable|contave|preco|price)\b/],
        ['food-drink', /\b(food|drink|alimento|bebida|snack|lunch|hungry|thirsty|restaurant|meal|dish|flavor|comida|cafe|pedido)\b/],
        ['be-we-they', /\b(verb to be|we|they|we are|they are|aren't|hungry|thirsty)\b/],
        ['invitations-plans', /\b(invitation|invite|convite|convid|suggest|sugest|accept|aceita|recusa|go out|let's|plan|plano)\b/],
        ['routines-habits', /\b(routine|rotina|habit|habito|everyday|present simple|work|study|schedule|agenda|before|after|until)\b/],
        ['family-friendship', /\b(family|familia|friend|amizade|childhood|infancia|relationship|relacionamento)\b/],
        ['home-location', /\b(home|casa|room|comodo|furniture|moveis|object|objeto|there is|there are|preposition|preposic)\b/],
        ['directions-location', /\b(direction|directions|direcao|direcoes|route|rota|location|localiza|map|mapa|corner|bridge|across|movement|movimento|how long does it take)\b/],
        ['shopping-money', /\b(shop|shopping|store|loja|money|dinheiro|pay|pagamento|price|preco|cash|card|compr)\b/],
        ['comparison-shopping', /\b(comparative|comparativo|compare|comparar|comparacao|both of us|quality|qualidade)\b/],
        ['possessives', /\b(possess|posse|whose|mine|yours|his|her)\b/],
        ['actions-now', /\b(present continuous|action|acoes atuais|agora|doing|live scene)\b/],
        ['describing-people', /\b(appearance|aparencia|description|descricao|personalit|personalidade|mood|humor|look like|be like)\b/],
        ['travel-weather', /\b(travel|trip|viagem|vacation|ferias|airport|aeroporto|hotel|weather|clima|season|estacao|flight|voo)\b/],
        ['past-experience', /\b(past|passado|yesterday|ontem|happened|aconteceu|was|were|did|experience|experiencia|memories|memorias)\b/],
        ['sports-workout', /\b(sport|sports|esporte|workout|treino|exercise|exercicio|soccer|gym|shape|ability|habilidade)\b/],
        ['interests-preferences', /\b(interest|interesse|preference|preferencia|like|love|hate|free-time|tempo livre|news|podcast|opinion|opiniao|rather than)\b/],
        ['restaurant-service', /\b(restaurant|server|customer|menu|order|pedido|atendimento|service|would you like|i would like|bill)\b/],
        ['health-accidents', /\b(health|saude|accident|acidente|body|corpo|injur|ferimento|symptom|sintoma|doctor|medical|crash|careful)\b/],
        ['borrowing-help', /\b(borrow|lend|emprest\w*|charger|pay back|help|ajuda)\b/],
        ['past-habits', /\b(used to|past habit|habito passado|adapt|mudanca de habito)\b/],
        ['fashion-trends', /\b(fashion|moda|trend|tendencia|fad|craze|dye|unfashionable)\b/],
        ['advice-honesty', /\b(advice|conselho|should|honest|honestidade|truth|verdade|lie|mentir|decision|decisao)\b/],
        ['superlatives-ranking', /\b(superlative|superlativo|best|worst|ranking|melhor|pior|extreme|extremo)\b/],
        ['future-hopes', /\b(future|futuro|hope|esperan\w*|prediction|previs\w*|will|going to|dream\w*|sonho|wish)\b/],
        ['phone-requests', /\b(phone|telefone|call|ligacao|request|pedido|can|could|permission|permissao)\b/],
        ['conditions-backup', /\b(condition|conditional|condi[cç]\w*|if|unless|in case|backup|contingenc\w*|plano alternativo)\b/],
        ['deduction-evidence', /\b(deduction|dedu[cç]\w*|evidence|evid[eê]ncia|certainty|certeza|must|might|can['’]?t)\b/],
        ['rules-expectations', /\b(rule|rules|regra|expectation|expectativa|obligation|obriga[cç]\w*|restriction|restri[cç]\w*)\b/],
        ['factual-reporting', /\b(factual|factual reporting|relato factual|relative clause|ora[cç][aã]o relativa|passive voice|voz passiva|reporting|report)\b/],
        ['reported-speech', /\b(reported speech|discurso relatado|indirect question|pergunta indireta|message relay|retransmiss[aã]o)\b/],
        ['complaints-repair', /\b(complaint|complaints|reclama[cç]\w*|service recovery|recupera[cç][aã]o de servi[cç]o|social repair|repara[cç][aã]o social)\b/],
        ['hypotheses-wishes', /\b(hypothesis|hypotheses|hip[oó]tese|hip[oó]teses|second conditional|if i were|wishes|desejos?)\b/],
        ['consolidation-progress', /\b(consolidation|consolidacao|review|revisao|project|projeto|progress|progresso|assessment|avaliacao)\b/]
    ];

    function normalizeSemanticText(value) {
        return String(value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[’']/g, "'")
            .toLowerCase();
    }

    function flattenSemanticValues(values) {
        return values.flat(Infinity).flatMap(value => {
            if (!value) return [];
            if (typeof value === 'object') return Object.values(value);
            return [value];
        });
    }

    function languageTagsFor(...values) {
        const text = normalizeSemanticText(flattenSemanticValues(values).join(' '));
        return SEMANTIC_RULES
            .filter(([, pattern]) => pattern.test(text))
            .map(([tag]) => tag);
    }

    function hasSemanticIntersection(lessonOrTags, assetOrTags) {
        const lessonTags = Array.isArray(lessonOrTags) ? lessonOrTags : lessonOrTags?.languageTags || [];
        const assetTags = Array.isArray(assetOrTags)
            ? assetOrTags
            : assetOrTags?.semanticTags || languageTagsFor(assetOrTags);
        return assetTags.some(tag => lessonTags.includes(tag));
    }

    const LEVEL_PROFILES = {
        a1: {
            reception: 'Compreender palavras, frases e instruções curtas em situações familiares.',
            production: 'Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas.',
            interaction: 'Participar de trocas breves com apoio, repetição e perguntas previsíveis.',
            mediation: 'Transmitir informação simples de placas, agendas, perfis e mensagens curtas.',
            linguistic: 'Usar repertório básico memorizado com controle suficiente para ser compreendido.',
            online: 'Participar de trocas online simples, com saudações e informações pessoais básicas.'
        },
        a2: {
            reception: 'Compreender textos e falas curtas sobre experiências e necessidades cotidianas.',
            production: 'Conectar frases para narrar, descrever planos e explicar problemas práticos.',
            interaction: 'Conduzir trocas rotineiras, pedir esclarecimento e negociar soluções simples.',
            mediation: 'Repassar os pontos principais de instruções, relatos e informações práticas.',
            linguistic: 'Usar estruturas frequentes e vocabulário cotidiano com crescente autonomia.',
            online: 'Realizar transações e trocas sociais online simples, esclarecendo detalhes.'
        },
        b1: {
            reception: 'Compreender os pontos principais de textos e falas claras sobre temas familiares.',
            production: 'Produzir discurso conectado para narrar, explicar e sustentar uma opinião.',
            interaction: 'Manter conversas, lidar com imprevistos e negociar acordos em temas familiares.',
            mediation: 'Resumir e retransmitir informação principal, destacando pontos relevantes.',
            linguistic: 'Usar repertório suficiente para se expressar com razoável precisão e fluidez.',
            online: 'Sustentar interação online, explicar detalhes e responder a contribuições.'
        },
        b2: {
            reception: 'Compreender ideias principais, detalhes e posicionamentos em textos complexos.',
            production: 'Produzir discurso claro e detalhado com argumento, evidência e organização.',
            interaction: 'Interagir com espontaneidade, negociar e responder a argumentos com nuance.',
            mediation: 'Sintetizar e explicar informações de diferentes fontes e perspectivas.',
            linguistic: 'Controlar ampla variedade estrutural e lexical com boa precisão e naturalidade.',
            online: 'Conduzir colaboração online, relacionando contribuições e resolvendo mal-entendidos.'
        },
        c1: {
            reception: 'Compreender textos extensos e exigentes, inclusive sentidos implícitos e estilo.',
            production: 'Produzir discurso complexo, flexível, coeso e adequado ao efeito pretendido.',
            interaction: 'Interagir com precisão, espontaneidade e sensibilidade a registro e implicatura.',
            mediation: 'Sintetizar criticamente fontes densas e adaptar a informação a públicos distintos.',
            linguistic: 'Controlar repertório amplo, idiomático e sofisticado com alta precisão.',
            online: 'Orquestrar interação online complexa e adaptar registro, tom e organização.'
        }
    };

    const raw = {
        'a1-v3': [
            ['First Day of Class', 'apresentações, nomes, agradecimentos e blocos com be', [1]],
            ['A Few Days Later', 'cumprimentos, profissões, a/an e I am/you are', [1, 18]],
            ['At Break', 'intervalo, alimentos e bebidas; we/they com be; hungry, thirsty, early, late e ready', [7]],
            ['Names Around the Class', 'he/she, his/her, alfabeto, soletração e números 0–20', [2, 26]],
            ['Conversation Activities 1', 'revisão comunicativa das lições 1–4'],
            ['What’s Your Address?', 'endereço, contato, números 21–100, 1.000, 10.000, at e dot', [2]],
            ['Let’s Go Out!', 'Present Simple com I/you/we/they; do/don’t; preferências, convites, aceitação e recusa'],
            ['My Everyday Life', 'Present Simple com I/you, rotina e preferências', [4]],
            ['Sarah’s Routine', 'terceira pessoa, do/does e informações pessoais', [4]],
            ['Conversation Activities 2', 'revisão comunicativa das lições 6–9'],
            ['Family Photos', 'família, possessive ’s, have/has e idades', [3]],
            ['At Home', 'móveis, roupas, preposições e there is/there are', [17]],
            ['Let’s Go Shopping', 'contáveis, não contáveis, some/any, much/many e a lot of', [7, 14]],
            ['At the Store', 'preços, quantidades, a few/a little e números acima de 100', [14]],
            ['Conversation Activities 3', 'revisão comunicativa das lições 11–14'],
            ['Which One?', 'cores, roupas, one/ones e object pronouns'],
            ['Is It Yours or Mine?', 'whose e possessive pronouns'],
            ['What Are They Doing?', 'Present Continuous em ações atuais', [22]],
            ['What’s Your Friend Like?', 'aparência, descrição pessoal e horários', [8, 6]],
            ['Conversation Activities 4', 'revisão comunicativa das lições 16–19'],
            ['Vacation Calendar', 'meses, datas, férias e was/were', [21, 27]],
            ['What Happened?', 'Past Simple regular e verbos irregulares essenciais', [27]],
            ['At the Airport', 'transporte, viagem, can e know how to', [18, 19]],
            ['What Was Happening?', 'Past Continuous básico em cenas de viagem'],
            ['Conversation Activities 5', 'revisão comunicativa das lições 21–24'],
            ['Sabrina’s Invitation', 'estações, clima e going to', [12, 29]],
            ['Health Problems', 'sintomas, conselhos e will em decisões simples'],
            ['On the Phone', 'linguagem telefônica, convites e pedidos com can/could'],
            ['Take It Easy', 'start/finish, before/after/until e contraste temporal essencial'],
            ['Conversation Activities 6', 'revisão comunicativa das lições 26–29'],
            ['A1 Consolidation · Part 1', 'grande revisão das lições 1–15'],
            ['A1 Consolidation · Part 2', 'grande revisão das lições 16–30']
        ],
        'a2-v3': [
            ['Welcome Back! Vacation and Weather', 'greetings, clima, viagem, different from/than e enjoy + -ing', [1]],
            ['Conversation Activities 1 · A Trip Abroad', 'revisão comunicativa da lição 1: viagem, clima e atividades de férias'],
            ['Location and Directions', 'preposições, pedir ajuda e How long does it take...?', [3]],
            ['Conversation Activities 2 · In the Middle of Nowhere', 'revisão comunicativa da lição 3: localização, direções e duração'],
            ['Sports and Workout', 'go, do e play com esportes; How good are you at...?', [5]],
            ['Conversation Activities 3 · Couch Potato or Soccer Fanatic?', 'revisão comunicativa da lição 5: esportes, treino e habilidade'],
            ['Interests and Preferences', 'adjetivos, news, kind of e interesses pessoais', [7]],
            ['Conversation Activities 4 · Free-Time Activities', 'revisão comunicativa da lição 7: interesses e tempo livre'],
            ['Food and Drink 1 · Preferences', 'adjetivos, like/love/hate, so/neither, feel like e rather than', [9]],
            ['Conversation Activities 5 · Fish ’n’ Chips', 'revisão comunicativa da lição 9: preferências de comida e bebida'],
            ['Food and Drink 2 · At a Restaurant', 'Would you like...? e concordância com so/neither', [11]],
            ['Conversation Activities 6 · In a Restaurant', 'revisão comunicativa da lição 11: pedidos e atendimento'],
            ['Personalities and Moods', 'adjetivos, even, smile at e in the mood', [13]],
            ['Conversation Activities 7 · True Friends or False Friends?', 'revisão comunicativa da lição 13: personalidade e humor'],
            ['Accidents and the Human Body', 'reflexivos, to happen, Have you ever...? e be careful', [15]],
            ['Conversation Activities 8 · A Car Crash', 'revisão comunicativa da lição 15: acidentes, corpo e segurança'],
            ['Money and Shopping 1 · Compare and Pay', 'comparativos, pay for e both of us', [17]],
            ['Conversation Activities 9 · Shopping in a Mall Store', 'revisão comunicativa da lição 17: comparação, preço e pagamento'],
            ['Money and Shopping 2 · Borrow or Lend?', 'neither of them, none, borrow, lend e mind + -ing', [19]],
            ['Conversation Activities 10 · A Clever Boy', 'revisão comunicativa da lição 19: empréstimos e escolhas'],
            ['Family and Friendship', 'become, get, used to e adaptação', [21]],
            ['Conversation Activities 11 · Childhood Memories', 'revisão comunicativa da lição 21: família, amizade e passado'],
            ['Fashionable and Unfashionable', 'stop + -ing/to, die/dye e in/out of fashion', [23]],
            ['Conversation Activities 12 · Fads and Crazes', 'revisão comunicativa da lição 23: moda e tendências'],
            ['Giving and Asking for Advice', 'should, care about, lie, say/tell e instead of + -ing', [25]],
            ['Conversation Activities 13 · To Lie or Not to Lie', 'revisão comunicativa da lição 25: conselho, honestidade e alternativas'],
            ['The Best and the Worst', 'superlativos, rankings e justificativas', [27]],
            ['Conversation Activities 14 · Honeymoon in New York', 'revisão comunicativa da lição 27: melhores, piores e extremos'],
            ['Hopes and Predictions', 'depend on, will/going to, right away e right after', [29]],
            ['Conversation Activities 15 · Rick and His Dreams for the New Year', 'revisão comunicativa da lição 29: esperanças, planos e previsões'],
            ['A2 Consolidation · Part 1', 'grande revisão das lições 1–15'],
            ['A2 Consolidation · Part 2', 'grande revisão das lições 16–30']
        ],
        'b1-v3': [
            ['Defining Moments', 'Present Perfect versus passado concluído; decisões, oportunidades e consequências', [1]],
            ['Communicative Lab · Defining Moments', 'decisões, consequências e relato pessoal'],
            ['Progress and Duration', 'Present Perfect Simple/Continuous, progresso, duração e lately', [2]],
            ['Communicative Lab · Progress Update', 'atualização de progresso com resultados, duração e próximos passos'],
            ['Habits and Adaptation', 'used to, would, be/get used to e adaptação', [3]],
            ['Communicative Lab · Then and Now', 'comparação de hábitos e adaptação a mudanças'],
            ['Stories with Layers', 'Past Simple, Continuous e Perfect em narrativa', [7]],
            ['Communicative Lab · Reconstruct the Story', 'reconstrução de narrativa, sequência e causa'],
            ['Plans in Motion', 'will, going to, arranjos, horários e mudança de plano', [4]],
            ['Communicative Lab · Plan A and Plan B', 'planejamento, imprevisto e alternativa negociada'],
            ['Conditions and Backup Plans', 'if, unless, in case, count on e alternativas', [6]],
            ['Communicative Lab · What If?', 'condições reais, prevenção e plano de contingência'],
            ['Deduction and Evidence', 'must, might, could, can’t e evidência', [5]],
            ['Communicative Lab · Evidence Check', 'investigação e graus de certeza'],
            ['Rules, Permission and Expectations', 'modais, regras, permissão e expectativas sociais', [13]],
            ['Communicative Lab · Rules in Context', 'explicação, negociação e aplicação de regras'],
            ['Opinions, Disagreement and Clarification', 'opinião, discordância, esclarecimento e reformulação', [9, 10]],
            ['Communicative Lab · Clear Communication', 'discordância polida e reparo comunicativo'],
            ['Suggestions, Trade-Offs and Negotiation', 'sugestões, comparação de alternativas e negociação', [11, 12]],
            ['Communicative Lab · Reach an Agreement', 'trade-offs, concessões e consenso justificado'],
            ['Detail and Factual Reporting', 'relative clauses, voz passiva e relato factual', [14, 15]],
            ['Communicative Lab · Explain and Report', 'detalhamento, processo e relato de fatos'],
            ['Reported Speech and Indirect Questions', 'discurso relatado, perguntas indiretas e pedidos polidos', [17, 18]],
            ['Communicative Lab · Message Relay', 'mediação e retransmissão de mensagens'],
            ['Problems, Complaints and Social Repair', 'problemas, reclamações e recuperação de serviço', [19, 20]],
            ['Communicative Lab · Service Recovery', 'reclamação, resposta e solução negociada'],
            ['Real-World Progress and Challenges', 'imprevistos em viagem, saúde, estudo e trabalho', [21, 22, 23]],
            ['Communicative Lab · Solve the Challenge', 'solução integrada de problema real'],
            ['Hypotheses and Wishes', 'Second Conditional, wishes e reparação social', [28, 29]],
            ['Communicative Lab · If Things Were Different', 'hipóteses, desejos e resposta social'],
            ['B1 Project Workshop', 'planejamento e ensaio do projeto', [31]],
            ['B1 Performance Assessment', 'apresentação, perguntas e avaliação', [31, 32]]
        ],
        'b2-v3': [
            ['Narrative Perspective and Time Control', 'tempos narrativos, perspectiva e enquadramento'],
            ['Reconstruct and Report', 'reconstrução e relato com mudança de perspectiva'],
            ['Perfect Aspect: Result and Duration', 'perfect simple/continuous e resultado observável'],
            ['Evidence-Based Update', 'atualização baseada em evidências e duração'],
            ['Present and Past Modality', 'dedução, obrigação e crítica no presente e passado'],
            ['Investigation and Deduction', 'investigação com graus de certeza'],
            ['Real, Unreal and Mixed Conditionals', 'condicionais e relações temporais'],
            ['Decisions and Consequences', 'decisão sob cenários e consequências'],
            ['Passive, Causative and Reporting Structures', 'passiva, have/get something done e reporting'],
            ['Newsroom and Process Lab', 'notícia, processo e responsabilidade'],
            ['Reported Speech and Attribution', 'distanciamento, relato e atribuição'],
            ['Source Mediation', 'mediação de fontes e preservação de posicionamento'],
            ['Determiners and Complex Noun Phrases', 'artigos, determinantes e grupos nominais'],
            ['Precision Description Lab', 'descrição precisa e resolução de ambiguidade'],
            ['Relative and Participle Clauses', 'orações relativas e participiais'],
            ['Information Compression', 'compressão e expansão de informação'],
            ['Verb Patterns and Collocation', 'padrões verbais, preposições dependentes e colocações'],
            ['Lexical Naturalness Lab', 'reformulação com naturalidade lexical'],
            ['Cohesion and Reference', 'referência, substituição e conectores'],
            ['Text Reconstruction', 'reconstrução coesa de texto fragmentado'],
            ['Stance, Hedging and Emphasis', 'posicionamento, cautela e ênfase'],
            ['Nuanced Opinion Forum', 'opinião graduada e resposta a objeções'],
            ['Claim, Evidence and Counterargument', 'tese, evidência e contra-argumento'],
            ['Structured Debate', 'debate com síntese e réplica'],
            ['Negotiation, Register and Consensus', 'registro, concessão e consenso'],
            ['Simulated Meeting', 'reunião orientada a resultado'],
            ['Synthesising Texts and Data', 'síntese intertextual e descrição de dados'],
            ['Mediation Briefing', 'briefing fiel para público específico'],
            ['Extended Presentation and Online Interaction', 'apresentação extensa, interação online e Q&A'],
            ['Presentation Rehearsal', 'ensaio, perguntas e segunda tentativa'],
            ['B2 Capstone Studio', 'planejamento e produção do capstone'],
            ['B2 Final Performance', 'apresentação, argumentação e feedback CEFR']
        ],
        'c1-v3': [
            ['Aspect and Temporal Framing', 'aspecto, enquadramento e perspectiva temporal'],
            ['Perspective Shift Narrative', 'narrativa com mudança deliberada de perspectiva'],
            ['Advanced Modality and Evidentiality', 'modalidade epistêmica e fontes de evidência'],
            ['Hypothesis Evaluation', 'avaliação cautelosa de hipóteses'],
            ['Inversion and Fronting', 'inversão negativa e fronting'],
            ['Controlled Emphasis', 'ênfase marcada em discurso'],
            ['Cleft and Pseudo-Cleft Sentences', 'clefts e estrutura informacional'],
            ['Information Structure Lab', 'foco, contraste e informação nova'],
            ['Nominalisation and Dense Noun Groups', 'nominalização e densidade informacional'],
            ['Formal Register Redesign', 'reescrita formal clara e densa'],
            ['Participle, Reduced and Absolute Clauses', 'orações reduzidas e absolute clauses'],
            ['Synthesis and Concision', 'síntese concisa sem perda de relações'],
            ['Advanced and Implied Conditionals', 'condições complexas e implícitas'],
            ['Complex Scenario Lab', 'cenários com pressupostos variáveis'],
            ['Ellipsis, Substitution and Reference', 'elipse, substituição e referência'],
            ['Sophisticated Cohesion', 'coesão de discurso extenso'],
            ['Reporting Verbs and Intertextuality', 'atribuição, reporting verbs e intertextualidade'],
            ['Critical Source Mediation', 'mediação crítica de posições'],
            ['Hedging, Boosting and Diplomacy', 'cautela, reforço e diplomacia'],
            ['Precision Positioning', 'posicionamento preciso em situação sensível'],
            ['Collocation, Idiomaticity and Connotation', 'colocações, conotação e idiomaticidade'],
            ['Refined Lexical Choice', 'escolha lexical e efeitos de sentido'],
            ['Register and Style Shift', 'mudança de registro social, acadêmico e profissional'],
            ['Audience Adaptation Lab', 'adaptação de conteúdo, tom e densidade'],
            ['Argument, Evaluation and Counterposition', 'argumentação avaliativa e contraposição'],
            ['Complex Discussion', 'discussão, síntese e reposicionamento'],
            ['Dense-Source Synthesis and Mediation', 'síntese de fontes densas'],
            ['Oral and Written Report', 'relatório oral e escrito para públicos distintos'],
            ['Academic and Professional Interaction', 'seminário, reunião e negociação'],
            ['Simulated Seminar', 'interação extensa e defesa de posição'],
            ['C1 Multiregister Capstone', 'produto multirregistro e curadoria de fontes'],
            ['C1 Final Defence', 'apresentação e defesa oral']
        ]
    };

    const reviewPositions = {
        'a1-v3': [5, 10, 15, 20, 25, 30, 31, 32],
        'a2-v3': [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 31, 32],
        'b1-v3': Array.from({ length: 15 }, (_, index) => (index + 1) * 2),
        'b2-v3': Array.from({ length: 16 }, (_, index) => (index + 1) * 2),
        'c1-v3': Array.from({ length: 16 }, (_, index) => (index + 1) * 2)
    };

    const projectPositions = {
        'a1-v3': [],
        'a2-v3': [],
        'b1-v3': [31, 32],
        'b2-v3': [31, 32],
        'c1-v3': [31, 32]
    };

    const oralMinutes = { 'a1-v3': 36, 'a2-v3': 39, 'b1-v3': 42, 'b2-v3': 45, 'c1-v3': 45 };
    const levelFor = moduleId => moduleId.replace('-v3', '');
    const stableId = (moduleId, number, title) => `${moduleId}-${String(number).padStart(2, '0')}-${String(title).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
    const a1PreviousEquivalents = {
        1: [[1, 'Greetings and Introductions']],
        2: [[1, 'Greetings and Introductions'], [18, 'School, Work and Abilities']],
        3: [[7, 'Food and Quantities']],
        4: [[2, 'Personal Information'], [26, 'Countries and Languages']],
        6: [[2, 'Personal Information']],
        8: [[4, 'Routines and Present Simple']],
        9: [[4, 'Routines and Present Simple']],
        11: [[3, 'Family and Possessives']],
        12: [[17, 'Home and Location']],
        13: [[7, 'Food and Quantities'], [14, 'Shopping and Prices']],
        14: [[14, 'Shopping and Prices']],
        18: [[22, 'Actions Now']],
        19: [[8, 'Describing People'], [6, 'Time and Schedules']],
        21: [[21, 'Dates and Celebrations'], [27, 'Past Simple Essentials']],
        22: [[27, 'Past Simple Essentials']],
        23: [[18, 'School, Work and Abilities'], [19, 'Transportation']],
        26: [[12, 'Weather'], [29, 'Going To']]
    };
    const a2PreviousEquivalents = {
        1: [[1, 'Past Stories']],
        2: [[2, 'Interrupted Stories']],
        3: [[3, 'Conversation Activities 1: Stories in Context'], [3, 'Conversation Activities 1 · Stories in Context']],
        4: [[4, 'Comparatives in Context']],
        5: [[5, 'Articles, Quantity and Choice']],
        6: [[6, 'Conversation Activities 2: Compare and Choose'], [6, 'Conversation Activities 2 · Compare and Choose']]
    };

    const modules = {};
    Object.entries(raw).forEach(([moduleId, definitions]) => {
        const reviewSet = new Set(reviewPositions[moduleId]);
        const projectSet = new Set(projectPositions[moduleId]);
        const level = levelFor(moduleId);
        const profile = LEVEL_PROFILES[level];

        modules[moduleId] = definitions.map(([title, linguisticFocus, legacyLessons = []], index) => {
            const number = index + 1;
            const type = projectSet.has(number) ? 'project' : reviewSet.has(number) ? 'review' : 'content';
            const previousBoundary = [...reviewPositions[moduleId]].filter(position => position < number).pop() || 0;
            const reviewedNumbers = moduleId === 'a1-v3' && number === 31
                ? definitions.map((_, candidate) => candidate + 1).filter(candidate => candidate <= 15 && !reviewSet.has(candidate))
                : moduleId === 'a1-v3' && number === 32
                    ? definitions.map((_, candidate) => candidate + 1).filter(candidate => candidate >= 16 && candidate <= 30 && !reviewSet.has(candidate))
                    : moduleId === 'a2-v3' && number === 31
                        ? definitions.map((_, candidate) => candidate + 1).filter(candidate => candidate <= 15 && !reviewSet.has(candidate))
                        : moduleId === 'a2-v3' && number === 32
                            ? definitions.map((_, candidate) => candidate + 1).filter(candidate => candidate >= 16 && candidate <= 30 && !reviewSet.has(candidate))
                    : type === 'review' || (type === 'project' && number === 32)
                        ? Array.from({ length: number - previousBoundary - 1 }, (_, offset) => previousBoundary + offset + 1)
                            .filter(candidate => candidate < number)
                        : [];

            const sourceLesson = ['a2-v3', 'b1-v3'].includes(moduleId) && type === 'review' && number <= 30 ? number - 1 : null;
            const sourceDefinition = sourceLesson ? definitions[sourceLesson - 1] : null;
            const languageTags = languageTagsFor(title, linguisticFocus, sourceDefinition?.[0], sourceDefinition?.[1]);
            const lessonKind = type === 'project'
                ? 'project'
                : ['a1-v3', 'a2-v3'].includes(moduleId) && number >= 31
                    ? 'consolidation'
                    : type === 'review'
                        ? 'communicative'
                        : 'lexical';
            return {
                id: stableId(moduleId, number, title),
                moduleId,
                level: level.toUpperCase(),
                version: MODULE_VERSIONS[moduleId] || VERSION,
                number,
                type,
                lessonKind,
                title,
                linguisticFocus,
                languageTags,
                sourceLesson,
                cefrObjectives: SKILLS.map(skill => ({ skill, descriptor: profile[skill] })),
                reviewOf: reviewedNumbers.map(reviewed => stableId(moduleId, reviewed, definitions[reviewed - 1][0])),
                oralInteractionMinutes: type === 'review' || type === 'project' ? oralMinutes[moduleId] : 24,
                legacyLessons: [...legacyLessons],
                legacyIds: moduleId === 'a1-v3'
                    ? (a1PreviousEquivalents[number] || []).map(([legacyNumber, legacyTitle]) => stableId(moduleId, legacyNumber, legacyTitle))
                    : moduleId === 'a2-v3'
                        ? (a2PreviousEquivalents[number] || []).map(([legacyNumber, legacyTitle]) => stableId(moduleId, legacyNumber, legacyTitle))
                        : [],
                actionOriented: type !== 'content'
            };
        });
    });

    function getModule(moduleId) {
        return modules[String(moduleId || '').toLowerCase()] || [];
    }

    function getLesson(moduleId, numberOrId) {
        const lessons = getModule(moduleId);
        if (typeof numberOrId === 'string' && !/^\d+$/.test(numberOrId)) {
            return lessons.find(lesson => lesson.id === numberOrId) || null;
        }
        return lessons.find(lesson => lesson.number === Number(numberOrId)) || null;
    }

    function resolveMission(moduleId, number, source = {}) {
        const lesson = getLesson(moduleId, number);
        if (!lesson) return null;

        const authored = source?.mission;
        const authoredMission = authored && typeof authored === 'object'
            ? { title: authored.title, task: authored.task, focus: authored.focus }
            : typeof authored === 'string'
                ? { title: source.title || lesson.title, task: authored, focus: source.outcome ? [source.outcome] : [] }
                : null;
        if (authoredMission) {
            const semanticTags = languageTagsFor(authoredMission.title, authoredMission.task, authoredMission.focus);
            if (hasSemanticIntersection(lesson, semanticTags)) {
                return { ...authoredMission, semanticTags, source: 'current-authored-content' };
            }
        }

        const objectives = Array.isArray(source?.objectives) ? source.objectives : [];
        const themes = Array.isArray(source?.themes) ? source.themes : [];
        const primaryObjective = objectives[0] || source?.outcome || `usar ${lesson.linguisticFocus} em uma troca curta`;
        const context = themes.length ? ` Use como contexto: ${themes.slice(0, 2).join(' e ')}.` : '';
        return {
            title: `Missão · ${lesson.title}`,
            task: `${primaryObjective.charAt(0).toUpperCase()}${primaryObjective.slice(1)}.${context}`,
            focus: objectives.slice(1, 4).length ? objectives.slice(1, 4) : [lesson.linguisticFocus],
            semanticTags: [...lesson.languageTags],
            source: authoredMission ? 'manifest-fallback-after-incompatible-authored-content' : 'current-manifest'
        };
    }

    function resolveMusic(moduleId, number, options = {}) {
        const lesson = getLesson(moduleId, number);
        if (!lesson || lesson.lessonKind !== 'lexical') return null;
        return globalScope.MusicCatalogV3?.getForCurriculumId(lesson.id, options) || null;
    }

    function legacyLessonComplete(moduleProgress, number) {
        return moduleProgress?.[`lesson_${number}`] === true
            || moduleProgress?.legacy?.[`lesson_${number}`] === true;
    }

    function isLessonComplete(progress, moduleId, numberOrId) {
        const lesson = getLesson(moduleId, numberOrId);
        if (!lesson) return false;
        const moduleProgress = progress?.[moduleId] || {};
        if (moduleProgress.byId?.[lesson.id] === true) return true;
        if (lesson.legacyIds?.some(id => moduleProgress.byId?.[id] === true)) return true;

        if (lesson.legacyLessons.length) {
            return lesson.legacyLessons.every(number => legacyLessonComplete(moduleProgress, number));
        }

        if (lesson.type === 'review' && lesson.reviewOf.length) {
            return lesson.reviewOf.every(id => isLessonComplete(progress, moduleId, id));
        }

        return false;
    }

    function migrateModuleProgress(progress, moduleId) {
        const source = progress || {};
        const migrated = {};
        getModule(moduleId).forEach(lesson => {
            if (isLessonComplete(source, moduleId, lesson.id)) migrated[lesson.id] = true;
        });
        return { version: getModule(moduleId)[0]?.version || VERSION, byId: migrated };
    }

    function audit() {
        return Object.fromEntries(Object.entries(modules).map(([moduleId, lessons]) => {
            const expectedReviews = reviewPositions[moduleId];
            const actualReviews = lessons.filter(lesson => lesson.type === 'review').map(lesson => lesson.number);
            const skills = new Set(lessons.flatMap(lesson => lesson.cefrObjectives.map(item => item.skill)));
            return [moduleId, {
                lessonCount: lessons.length,
                expectedReviews,
                actualReviews,
                reviewPositionsValid: JSON.stringify(expectedReviews.filter(number => !projectPositions[moduleId].includes(number))) === JSON.stringify(actualReviews),
                cefrCoverage: SKILLS.every(skill => skills.has(skill)),
                idsUnique: new Set(lessons.map(lesson => lesson.id)).size === lessons.length
            }];
        }));
    }

    globalScope.V3Curriculum = Object.freeze({
        version: VERSION,
        moduleVersions: { ...MODULE_VERSIONS },
        skills: [...SKILLS],
        modules,
        reviewPositions,
        projectPositions,
        oralMinutes,
        semanticRules: SEMANTIC_RULES.map(([tag]) => tag),
        languageTagsFor,
        hasSemanticIntersection,
        getModule,
        getLesson,
        resolveMission,
        resolveMusic,
        isLessonComplete,
        migrateModuleProgress,
        audit
    });
}(window));
