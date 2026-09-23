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
        'a1-v3': '2026.09-a1-38',
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
        ['past-experience', /\b(past|passado|yesterday|ontem|happened|aconteceu|was|were|did|experience|experiencia|memories|memorias|have you ever)\b/],
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
        [
                "Hello, I'm…",
                "Cumprimentos, nome, despedidas e cortesia; I/you, am/are em blocos; What's your name?; Please repeat."
        ],
        [
                "Names and People",
                "Alfabeto, soletração, números 0–20; he/she, is, my/your/his/her; this is…; How do you spell…?"
        ],
        [
                "Meet Someone New",
                "Aplicação de 1–2: escuta de apresentações, cartões de identidade e troca de papéis."
        ],
        [
                "People at Work",
                "Profissões e locais; a/an; be afirmativo, negativo e pergunta; work in/at/as como combinações; What do you do? como pergunta pronta."
        ],
        [
                "Stay in Touch",
                "Endereço, telefone, e-mail; números 21–100; at/dot; What's your…?; It's…; confirmação de dígitos."
        ],
        [
                "A New Registration",
                "Aplicação de 4–5; retoma nomes e soletração de 1–2."
        ],
        [
                "At the Café",
                "Alimentos e bebidas; like/want/have/eat/drink com I/you; do/don't; What do you want?; Here you are."
        ],
        [
                "My Everyday Life",
                "Ações de rotina, dias da semana e horas; I/you/we/they; always/usually/sometimes/never; at/on/in em combinações selecionadas."
        ],
        [
                "A Day in My Life",
                "Aplicação de 7–8; retoma profissão e números."
        ],
        [
                "Someone Else's Routine",
                "work/study/live/go e outros verbos já conhecidos; he/she + -s; does/doesn't; perguntas curtas sobre rotina."
        ],
        [
                "My Family",
                "Pessoas da família e idade; have/has; possessive 's; our/their; Who is…?; How old…?"
        ],
        [
                "People in My Life",
                "Aplicação de 10–11; retoma horários, profissão e local."
        ],
        [
                "At Home",
                "Cômodos, móveis e objetos; there is/are; in/on/under/next to/between; Where is/are…?"
        ],
        [
                "What's in the Kitchen?",
                "Comida e embalagens; contável/não contável em contexto; some/any; how much/how many; need."
        ],
        [
                "Let's Get Ready",
                "Aplicação de 13–14; retoma preferências e números."
        ],
        [
                "At the Store",
                "Produtos, preços, quantidades e pagamento; números acima de 100 em preços; How much is/are…?; I'd like… como bloco."
        ],
        [
                "Which One?",
                "Roupas, cores e tamanhos; this/that/these/those; one/ones; it/them em pedidos; a few/a little como extensão."
        ],
        [
                "Find the Right Item",
                "Aplicação de 16–17; retoma some/any, preferências e localização."
        ],
        [
                "Is It Yours?",
                "Objetos pessoais; whose; mine/yours/his/hers/ours/theirs; retomada de possessivos; belong to como extensão."
        ],
        [
                "What Are They Doing?",
                "Ações visíveis; Present Continuous afirmativo, negativo e pergunta; now; wear/carry/wait."
        ],
        [
                "Lost and Found",
                "Aplicação de 19–20; retoma cores, objetos e localização."
        ],
        [
                "What Is Your Friend Like?",
                "Aparência e traços comuns de personalidade; be/have/be wearing; What…like? e look like em modelos; him/her como apoio."
        ],
        [
                "Around Town",
                "Lugares e transportes; can/can't para capacidade e ajuda; imperativos curtos; turn/go/stop; by bus/on foot."
        ],
        [
                "Meet Me There",
                "Aplicação de 22–23; retoma horas, roupas e ações atuais."
        ],
        [
                "My Vacation Calendar",
                "Meses, datas e lugares; yesterday/last…; was/were; perguntas de lugar e condição; ordinais mais usados em datas."
        ],
        [
                "What Happened?",
                "Past Simple com poucos verbos frequentes: went, had, saw, visited, stayed; did/didn't; first/then."
        ],
        [
                "A Short Trip",
                "Aplicação de 25–26; retoma datas, transportes e preferências."
        ],
        [
                "At the Airport",
                "Bilhete, voo, portão e bagagem; can/could em pedidos prontos; need; Where…?; revisão de números e horários."
        ],
        [
                "Travel Updates",
                "waiting/boarding/leaving, late/early/ready; ações e condições atuais; anúncio curto. Extensão: was/were + -ing para uma ação em andamento no passado."
        ],
        [
                "A Change of Plans",
                "Aplicação de 28–29; retoma viagem passada de 25–26."
        ],
        [
                "Let's Make Plans",
                "Clima e estações; going to para planos; Let's…; Would you like…? como convite pronto; before/after em horários conhecidos."
        ],
        [
                "I Need Some Help",
                "Partes do corpo e sintomas comuns; I have… / I feel… / I need…; help/rest/call; I'll… em ofertas prontas."
        ],
        [
                "Can We Reschedule?",
                "Aplicação de 31–32; retoma dias, horários e cortesia."
        ],
        [
                "On the Phone",
                "Iniciar/encerrar ligação; Can I speak to…?; Can you repeat…?; leave a message; retomada de can/could e contato."
        ],
        [
                "Take It Easy",
                "Agenda e organização; start/finish/before/after/until em combinações; revisão de rotina, passado e planos; will em decisões/ofertas curtas."
        ],
        [
                "My Week, My Plans",
                "Aplicação de 34–35; retoma 31–33 e contato."
        ],
        [
                "Everyday English",
                "Cadastro e apresentação; entrevista de rotina/família; localizar itens e comprar. Repertório principal: 1–18."
        ],
        [
                "English in Action",
                "Encontrar alguém; resolver informação de viagem; confirmar um compromisso por fala e mensagem. Repertório principal: 19–36, com retomada de 1–18."
        ]
],
        'a2-v3': [
            ['Welcome Back! Vacation and Weather', 'greetings, clima, viagem, different from/than e enjoy + -ing', [1]],
            ['Conversation Activities · A Trip Abroad', 'revisão comunicativa da lição 1: viagem, clima e atividades de férias'],
            ['Location and Directions', 'preposições, pedir ajuda e How long does it take...?', [3]],
            ['Conversation Activities · In the Middle of Nowhere', 'revisão comunicativa da lição 3: localização, direções e duração'],
            ['Sports and Workout', 'go, do e play com esportes; How good are you at...?', [5]],
            ['Conversation Activities · Couch Potato or Soccer Fanatic?', 'revisão comunicativa da lição 5: esportes, treino e habilidade'],
            ['Interests and Preferences', 'adjetivos, news, kind of e interesses pessoais', [7]],
            ['Conversation Activities · Free-Time Activities', 'revisão comunicativa da lição 7: interesses e tempo livre'],
            ['Food and Drink 1 · Preferences', 'adjetivos, like/love/hate, so/neither, feel like e rather than', [9]],
            ['Conversation Activities · Fish ’n’ Chips', 'revisão comunicativa da lição 9: preferências de comida e bebida'],
            ['Food and Drink 2 · At a Restaurant', 'Would you like...? e concordância com so/neither', [11]],
            ['Conversation Activities · In a Restaurant', 'revisão comunicativa da lição 11: pedidos e atendimento'],
            ['Personalities and Moods', 'adjetivos, even, smile at e in the mood', [13]],
            ['Conversation Activities · True Friends or False Friends?', 'revisão comunicativa da lição 13: personalidade e humor'],
            ['Accidents and the Human Body', 'reflexivos, to happen, Have you ever...? e be careful', [15]],
            ['Conversation Activities · A Car Crash', 'revisão comunicativa da lição 15: acidentes, corpo e segurança'],
            ['Money and Shopping 1 · Compare and Pay', 'comparativos, pay for e both of us', [17]],
            ['Conversation Activities · Shopping in a Mall Store', 'revisão comunicativa da lição 17: comparação, preço e pagamento'],
            ['Money and Shopping 2 · Borrow or Lend?', 'neither of them, none, borrow, lend e mind + -ing', [19]],
            ['Conversation Activities · A Clever Boy', 'revisão comunicativa da lição 19: empréstimos e escolhas'],
            ['Family and Friendship', 'become, get, used to e adaptação', [21]],
            ['Conversation Activities · Childhood Memories', 'revisão comunicativa da lição 21: família, amizade e passado'],
            ['Fashionable and Unfashionable', 'stop + -ing/to, die/dye e in/out of fashion', [23]],
            ['Conversation Activities · Fads and Crazes', 'revisão comunicativa da lição 23: moda e tendências'],
            ['Giving and Asking for Advice', 'should, care about, lie, say/tell e instead of + -ing', [25]],
            ['Conversation Activities · To Lie or Not to Lie', 'revisão comunicativa da lição 25: conselho, honestidade e alternativas'],
            ['The Best and the Worst', 'superlativos, rankings e justificativas', [27]],
            ['Conversation Activities · Honeymoon in New York', 'revisão comunicativa da lição 27: melhores, piores e extremos'],
            ['Hopes and Predictions', 'depend on, will/going to, right away e right after', [29]],
            ['Conversation Activities · Rick and His Dreams for the New Year', 'revisão comunicativa da lição 29: esperanças, planos e previsões'],
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
        'a1-v3': [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 37, 38],
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

    const a1HistoricalManifest = [{"id":"a1-v3-01-first-day-of-class","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":1,"type":"content","lessonKind":"lexical","title":"First Day of Class","linguisticFocus":"apresentações, nomes, agradecimentos e blocos com be","languageTags":["introductions"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[1],"legacyIds":["a1-v3-01-greetings-and-introductions"],"actionOriented":false},{"id":"a1-v3-02-a-few-days-later","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":2,"type":"content","lessonKind":"lexical","title":"A Few Days Later","linguisticFocus":"cumprimentos, profissões, a/an e I am/you are","languageTags":["introductions","identity-personal-data"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[1,18],"legacyIds":["a1-v3-01-greetings-and-introductions","a1-v3-18-school-work-and-abilities"],"actionOriented":false},{"id":"a1-v3-03-at-break","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":3,"type":"content","lessonKind":"lexical","title":"At Break","linguisticFocus":"intervalo, alimentos e bebidas; we/they com be; hungry, thirsty, early, late e ready","languageTags":["food-drink","be-we-they"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[7],"legacyIds":["a1-v3-07-food-and-quantities"],"actionOriented":false},{"id":"a1-v3-04-names-around-the-class","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":4,"type":"content","lessonKind":"lexical","title":"Names Around the Class","linguisticFocus":"he/she, his/her, alfabeto, soletração e números 0–20","languageTags":["identity-personal-data","numbers-quantities","possessives"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[2,26],"legacyIds":["a1-v3-02-personal-information","a1-v3-26-countries-and-languages"],"actionOriented":false},{"id":"a1-v3-05-conversation-activities-1","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":5,"type":"review","lessonKind":"communicative","title":"Conversation Activities 1","linguisticFocus":"revisão comunicativa das lições 1–4","languageTags":["consolidation-progress"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":["a1-v3-01-first-day-of-class","a1-v3-02-a-few-days-later","a1-v3-03-at-break","a1-v3-04-names-around-the-class"],"oralInteractionMinutes":36,"legacyLessons":[],"legacyIds":[],"actionOriented":true},{"id":"a1-v3-06-what-s-your-address","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":6,"type":"content","lessonKind":"lexical","title":"What’s Your Address?","linguisticFocus":"endereço, contato, números 21–100, 1.000, 10.000, at e dot","languageTags":["identity-personal-data","numbers-quantities"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[2],"legacyIds":["a1-v3-02-personal-information"],"actionOriented":false},{"id":"a1-v3-07-let-s-go-out","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":7,"type":"content","lessonKind":"lexical","title":"Let’s Go Out!","linguisticFocus":"Present Simple com I/you/we/they; do/don’t; preferências, convites, aceitação e recusa","languageTags":["be-we-they","invitations-plans","routines-habits"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[],"legacyIds":[],"actionOriented":false},{"id":"a1-v3-08-my-everyday-life","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":8,"type":"content","lessonKind":"lexical","title":"My Everyday Life","linguisticFocus":"Present Simple com I/you, rotina e preferências","languageTags":["routines-habits"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[4],"legacyIds":["a1-v3-04-routines-and-present-simple"],"actionOriented":false},{"id":"a1-v3-09-sarah-s-routine","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":9,"type":"content","lessonKind":"lexical","title":"Sarah’s Routine","linguisticFocus":"terceira pessoa, do/does e informações pessoais","languageTags":["routines-habits"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[4],"legacyIds":["a1-v3-04-routines-and-present-simple"],"actionOriented":false},{"id":"a1-v3-10-conversation-activities-2","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":10,"type":"review","lessonKind":"communicative","title":"Conversation Activities 2","linguisticFocus":"revisão comunicativa das lições 6–9","languageTags":["consolidation-progress"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":["a1-v3-06-what-s-your-address","a1-v3-07-let-s-go-out","a1-v3-08-my-everyday-life","a1-v3-09-sarah-s-routine"],"oralInteractionMinutes":36,"legacyLessons":[],"legacyIds":[],"actionOriented":true},{"id":"a1-v3-11-family-photos","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":11,"type":"content","lessonKind":"lexical","title":"Family Photos","linguisticFocus":"família, possessive ’s, have/has e idades","languageTags":["family-friendship"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[3],"legacyIds":["a1-v3-03-family-and-possessives"],"actionOriented":false},{"id":"a1-v3-12-at-home","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":12,"type":"content","lessonKind":"lexical","title":"At Home","linguisticFocus":"móveis, roupas, preposições e there is/there are","languageTags":["home-location"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[17],"legacyIds":["a1-v3-17-home-and-location"],"actionOriented":false},{"id":"a1-v3-13-let-s-go-shopping","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":13,"type":"content","lessonKind":"lexical","title":"Let’s Go Shopping","linguisticFocus":"contáveis, não contáveis, some/any, much/many e a lot of","languageTags":["numbers-quantities","invitations-plans","shopping-money"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[7,14],"legacyIds":["a1-v3-07-food-and-quantities","a1-v3-14-shopping-and-prices"],"actionOriented":false},{"id":"a1-v3-14-at-the-store","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":14,"type":"content","lessonKind":"lexical","title":"At the Store","linguisticFocus":"preços, quantidades, a few/a little e números acima de 100","languageTags":["numbers-quantities","shopping-money"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[14],"legacyIds":["a1-v3-14-shopping-and-prices"],"actionOriented":false},{"id":"a1-v3-15-conversation-activities-3","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":15,"type":"review","lessonKind":"communicative","title":"Conversation Activities 3","linguisticFocus":"revisão comunicativa das lições 11–14","languageTags":["consolidation-progress"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":["a1-v3-11-family-photos","a1-v3-12-at-home","a1-v3-13-let-s-go-shopping","a1-v3-14-at-the-store"],"oralInteractionMinutes":36,"legacyLessons":[],"legacyIds":[],"actionOriented":true},{"id":"a1-v3-16-which-one","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":16,"type":"content","lessonKind":"lexical","title":"Which One?","linguisticFocus":"cores, roupas, one/ones e object pronouns","languageTags":["home-location"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[],"legacyIds":[],"actionOriented":false},{"id":"a1-v3-17-is-it-yours-or-mine","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":17,"type":"content","lessonKind":"lexical","title":"Is It Yours or Mine?","linguisticFocus":"whose e possessive pronouns","languageTags":["possessives"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[],"legacyIds":[],"actionOriented":false},{"id":"a1-v3-18-what-are-they-doing","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":18,"type":"content","lessonKind":"lexical","title":"What Are They Doing?","linguisticFocus":"Present Continuous em ações atuais","languageTags":["be-we-they","actions-now"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[22],"legacyIds":["a1-v3-22-actions-now"],"actionOriented":false},{"id":"a1-v3-19-what-s-your-friend-like","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":19,"type":"content","lessonKind":"lexical","title":"What’s Your Friend Like?","linguisticFocus":"aparência, descrição pessoal e horários","languageTags":["family-friendship","describing-people","interests-preferences"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[8,6],"legacyIds":["a1-v3-08-describing-people","a1-v3-06-time-and-schedules"],"actionOriented":false},{"id":"a1-v3-20-conversation-activities-4","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":20,"type":"review","lessonKind":"communicative","title":"Conversation Activities 4","linguisticFocus":"revisão comunicativa das lições 16–19","languageTags":["consolidation-progress"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":["a1-v3-16-which-one","a1-v3-17-is-it-yours-or-mine","a1-v3-18-what-are-they-doing","a1-v3-19-what-s-your-friend-like"],"oralInteractionMinutes":36,"legacyLessons":[],"legacyIds":[],"actionOriented":true},{"id":"a1-v3-21-vacation-calendar","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":21,"type":"content","lessonKind":"lexical","title":"Vacation Calendar","linguisticFocus":"meses, datas, férias e was/were","languageTags":["travel-weather","past-experience"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[21,27],"legacyIds":["a1-v3-21-dates-and-celebrations","a1-v3-27-past-simple-essentials"],"actionOriented":false},{"id":"a1-v3-22-what-happened","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":22,"type":"content","lessonKind":"lexical","title":"What Happened?","linguisticFocus":"Past Simple regular e verbos irregulares essenciais","languageTags":["past-experience"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[27],"legacyIds":["a1-v3-27-past-simple-essentials"],"actionOriented":false},{"id":"a1-v3-23-at-the-airport","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":23,"type":"content","lessonKind":"lexical","title":"At the Airport","linguisticFocus":"transporte, viagem, can e know how to","languageTags":["travel-weather","phone-requests"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[18,19],"legacyIds":["a1-v3-18-school-work-and-abilities","a1-v3-19-transportation"],"actionOriented":false},{"id":"a1-v3-24-what-was-happening","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":24,"type":"content","lessonKind":"lexical","title":"What Was Happening?","linguisticFocus":"Past Continuous básico em cenas de viagem","languageTags":["travel-weather","past-experience"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[],"legacyIds":[],"actionOriented":false},{"id":"a1-v3-25-conversation-activities-5","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":25,"type":"review","lessonKind":"communicative","title":"Conversation Activities 5","linguisticFocus":"revisão comunicativa das lições 21–24","languageTags":["consolidation-progress"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":["a1-v3-21-vacation-calendar","a1-v3-22-what-happened","a1-v3-23-at-the-airport","a1-v3-24-what-was-happening"],"oralInteractionMinutes":36,"legacyLessons":[],"legacyIds":[],"actionOriented":true},{"id":"a1-v3-26-sabrina-s-invitation","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":26,"type":"content","lessonKind":"lexical","title":"Sabrina’s Invitation","linguisticFocus":"estações, clima e going to","languageTags":["invitations-plans","travel-weather","future-hopes"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[12,29],"legacyIds":["a1-v3-12-weather","a1-v3-29-going-to"],"actionOriented":false},{"id":"a1-v3-27-health-problems","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":27,"type":"content","lessonKind":"lexical","title":"Health Problems","linguisticFocus":"sintomas, conselhos e will em decisões simples","languageTags":["health-accidents","future-hopes"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[],"legacyIds":[],"actionOriented":false},{"id":"a1-v3-28-on-the-phone","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":28,"type":"content","lessonKind":"lexical","title":"On the Phone","linguisticFocus":"linguagem telefônica, convites e pedidos com can/could","languageTags":["phone-requests"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[],"legacyIds":[],"actionOriented":false},{"id":"a1-v3-29-take-it-easy","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":29,"type":"content","lessonKind":"lexical","title":"Take It Easy","linguisticFocus":"start/finish, before/after/until e contraste temporal essencial","languageTags":["routines-habits"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":[],"oralInteractionMinutes":24,"legacyLessons":[],"legacyIds":[],"actionOriented":false},{"id":"a1-v3-30-conversation-activities-6","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":30,"type":"review","lessonKind":"communicative","title":"Conversation Activities 6","linguisticFocus":"revisão comunicativa das lições 26–29","languageTags":["consolidation-progress"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":["a1-v3-26-sabrina-s-invitation","a1-v3-27-health-problems","a1-v3-28-on-the-phone","a1-v3-29-take-it-easy"],"oralInteractionMinutes":36,"legacyLessons":[],"legacyIds":[],"actionOriented":true},{"id":"a1-v3-31-a1-consolidation-part-1","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":31,"type":"review","lessonKind":"consolidation","title":"A1 Consolidation · Part 1","linguisticFocus":"grande revisão das lições 1–15","languageTags":["consolidation-progress"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":["a1-v3-01-first-day-of-class","a1-v3-02-a-few-days-later","a1-v3-03-at-break","a1-v3-04-names-around-the-class","a1-v3-06-what-s-your-address","a1-v3-07-let-s-go-out","a1-v3-08-my-everyday-life","a1-v3-09-sarah-s-routine","a1-v3-11-family-photos","a1-v3-12-at-home","a1-v3-13-let-s-go-shopping","a1-v3-14-at-the-store"],"oralInteractionMinutes":36,"legacyLessons":[],"legacyIds":[],"actionOriented":true},{"id":"a1-v3-32-a1-consolidation-part-2","moduleId":"a1-v3","level":"A1","version":"2026.08.05-expanded-a1-32","number":32,"type":"review","lessonKind":"consolidation","title":"A1 Consolidation · Part 2","linguisticFocus":"grande revisão das lições 16–30","languageTags":["consolidation-progress"],"sourceLesson":null,"cefrObjectives":[{"skill":"reception","descriptor":"Compreender palavras, frases e instruções curtas em situações familiares."},{"skill":"production","descriptor":"Produzir frases simples sobre si, pessoas, lugares e necessidades imediatas."},{"skill":"interaction","descriptor":"Participar de trocas breves com apoio, repetição e perguntas previsíveis."},{"skill":"mediation","descriptor":"Transmitir informação simples de placas, agendas, perfis e mensagens curtas."},{"skill":"linguistic","descriptor":"Usar repertório básico memorizado com controle suficiente para ser compreendido."},{"skill":"online","descriptor":"Participar de trocas online simples, com saudações e informações pessoais básicas."}],"reviewOf":["a1-v3-16-which-one","a1-v3-17-is-it-yours-or-mine","a1-v3-18-what-are-they-doing","a1-v3-19-what-s-your-friend-like","a1-v3-21-vacation-calendar","a1-v3-22-what-happened","a1-v3-23-at-the-airport","a1-v3-24-what-was-happening","a1-v3-26-sabrina-s-invitation","a1-v3-27-health-problems","a1-v3-28-on-the-phone","a1-v3-29-take-it-easy"],"oralInteractionMinutes":36,"legacyLessons":[],"legacyIds":[],"actionOriented":true}];
    const a1EquivalentSources = {"1":1,"2":4,"4":2,"5":6,"8":8,"10":9,"11":11,"13":12,"14":13,"16":14,"17":16,"19":17,"20":18,"22":19,"25":21,"26":22,"28":23,"31":26,"32":27,"34":28,"35":29};
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
            const reviewedNumbers = moduleId === 'a1-v3' && number === 37
                ? definitions.map((_, candidate) => candidate + 1).filter(candidate => candidate <= 15 && !reviewSet.has(candidate))
                : moduleId === 'a1-v3' && number === 38
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
                : ((moduleId === 'a1-v3' && number >= 37) || (moduleId === 'a2-v3' && number >= 31))
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

    const a1LanguageTags = {"1":["introductions","identity-personal-data"],"2":["identity-personal-data","numbers-quantities","possessives"],"4":["routines-habits","identity-personal-data"],"5":["identity-personal-data","numbers-quantities"],"7":["food-drink","restaurant-service","interests-preferences"],"8":["routines-habits"],"10":["routines-habits"],"11":["family-friendship","possessives"],"13":["home-location"],"14":["food-drink","numbers-quantities"],"16":["shopping-money","numbers-quantities"],"17":["shopping-money","fashion-trends"],"19":["possessives"],"20":["actions-now"],"22":["describing-people"],"23":["directions-location","invitations-plans","phone-requests"],"25":["travel-weather","past-experience"],"26":["travel-weather","past-experience"],"28":["travel-weather","phone-requests"],"29":["travel-weather","actions-now"],"31":["invitations-plans","travel-weather","future-hopes"],"32":["health-accidents","borrowing-help"],"34":["phone-requests"],"35":["routines-habits","future-hopes"]};
    modules['a1-v3'].forEach((lesson,index)=>{
        lesson.languageTags = [...new Set([...lesson.languageTags,...(a1LanguageTags[lesson.number]||[])])];
        lesson.id = ["a1-v3-38-01-hello-i-m","a1-v3-38-02-names-and-people","a1-v3-38-03-meet-someone-new","a1-v3-38-04-people-at-work","a1-v3-38-05-stay-in-touch","a1-v3-38-06-a-new-registration","a1-v3-38-07-at-the-cafe","a1-v3-38-08-my-everyday-life","a1-v3-38-09-a-day-in-my-life","a1-v3-38-10-someone-else-s-routine","a1-v3-38-11-my-family","a1-v3-38-12-people-in-my-life","a1-v3-38-13-at-home","a1-v3-38-14-what-s-in-the-kitchen","a1-v3-38-15-let-s-get-ready","a1-v3-38-16-at-the-store","a1-v3-38-17-which-one","a1-v3-38-18-find-the-right-item","a1-v3-38-19-is-it-yours","a1-v3-38-20-what-are-they-doing","a1-v3-38-21-lost-and-found","a1-v3-38-22-what-is-your-friend-like","a1-v3-38-23-around-town","a1-v3-38-24-meet-me-there","a1-v3-38-25-my-vacation-calendar","a1-v3-38-26-what-happened","a1-v3-38-27-a-short-trip","a1-v3-38-28-at-the-airport","a1-v3-38-29-travel-updates","a1-v3-38-30-a-change-of-plans","a1-v3-38-31-let-s-make-plans","a1-v3-38-32-i-need-some-help","a1-v3-38-33-can-we-reschedule","a1-v3-38-34-on-the-phone","a1-v3-38-35-take-it-easy","a1-v3-38-36-my-week-my-plans","a1-v3-38-37-everyday-english","a1-v3-38-38-english-in-action"][index];
        const source = a1HistoricalManifest.find(item=>item.number===a1EquivalentSources[lesson.number]);
        lesson.legacyIds = source ? [source.id, ...source.legacyIds] : [];
        lesson.legacyLessons = source ? [...source.legacyLessons] : [];
        lesson.requireExplicitCompletion = lesson.lessonKind !== 'lexical';
        lesson.disableLegacyEditorial = true;
        if(lesson.lessonKind==='communicative')lesson.languageTags=[...new Set([...modules['a1-v3'][index-2].languageTags,...modules['a1-v3'][index-1].languageTags])];
        lesson.dependencies = lesson.lessonKind === 'communicative' ? [modules['a1-v3'][index-2].id,modules['a1-v3'][index-1].id] : [];
        lesson.reviewOf = lesson.lessonKind === 'communicative' ? [...lesson.dependencies] : lesson.lessonKind === 'consolidation' ? modules['a1-v3'].filter(item=>item.number<lesson.number && (lesson.number===37 ? item.number<=18 : item.number>=19&&item.number<=36)).map(item=>item.id) : [];
    });
    modules['a1-v3'].forEach(lesson=>{if(lesson.lessonKind==='consolidation')lesson.reviewOf=modules['a1-v3'].filter(item=>lesson.number===37?item.number<=18:item.number>=19&&item.number<=36).map(item=>item.id);});
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

        if (!lesson.requireExplicitCompletion && lesson.type === 'review' && lesson.reviewOf.length) {
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

    // Isolated proposal: these IDs never participate in published progress migration.
    const a1PreviewLessons = Object.freeze([
        { id: 'a1-preview-cafe', slug: 'at-the-cafe', number: 7, title: 'At the Café', lessonKind: 'lexical', languageTags: ['food-drink', 'interests-preferences', 'restaurant-service'], dependencies: [], prerequisite: 'Apresentações, números e perguntas simples com apoio.' },
        { id: 'a1-preview-routine', slug: 'my-everyday-life', number: 8, title: 'My Everyday Life', lessonKind: 'lexical', languageTags: ['routines-habits', 'food-drink'], dependencies: ['a1-preview-cafe'], prerequisite: 'I/you, do/don’t e preferências praticados em At the Café.' },
        { id: 'a1-preview-day', slug: 'a-day-in-my-life', number: 9, title: 'A Day in My Life', lessonKind: 'communicative', languageTags: ['routines-habits', 'food-drink', 'interests-preferences'], dependencies: ['a1-preview-cafe', 'a1-preview-routine'], prerequisite: 'Repertório das duas aulas deste ciclo.' }
    ].map(item => Object.freeze({ ...item, languageTags: Object.freeze(item.languageTags), dependencies: Object.freeze(item.dependencies), version: '2026.09-a1-preview-38', disableLegacyEditorial: true })));

    globalScope.V3Curriculum = Object.freeze({
        a1HistoricalManifest,
        a1PreviewLessons,
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
