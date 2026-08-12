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
        'a2-v3': '2026.08.11-vacation-weather-cycle'
    };
    const SKILLS = ['reception', 'production', 'interaction', 'mediation', 'linguistic', 'online'];

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
            ['At Break', 'alimentos, bebidas e frases afirmativas com I/we/they + want/have', [7]],
            ['Names Around the Class', 'he/she, his/her, alfabeto, soletração e números 0–20', [2, 26]],
            ['Conversation Activities 1', 'revisão comunicativa das lições 1–4'],
            ['What’s Your Address?', 'endereço, contato, números 21–100, 1.000, 10.000, at e dot', [2]],
            ['Let’s Go Out!', 'convites, sugestões, aceitação e recusa'],
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
            ['Welcome Back! A Trip Abroad', 'Different from and comparative + than em conversas sobre viagem', [1]],
            ['Vacation Weather and Activities', 'Weather and enjoy + -ing para preferências e decisões de férias', [1]],
            ['Conversation Activities 1 · A Trip Abroad', 'interação, listening e speaking sobre viagem, clima e preferências'],
            ['Finding Your Way', 'Location prepositions and route instructions para localizar lugares e explicar caminhos', [3]],
            ['How Long Does It Take?', 'Asking for help and travel time com distância, duração e transporte', [3]],
            ['Conversation Activities 2 · In the Middle of Nowhere', 'listening, interação e resolução de problemas de localização'],
            ['Going To', 'planos, intenções e evidências', [9]],
            ['Arrangements and Predictions', 'Present Continuous, horários, will e mudanças', [10, 11]],
            ['Conversation Activities 3 · Plans in Motion', 'planos, arranjos, imprevistos e decisões'],
            ['Requests and Permission', 'can/could e pedidos polidos', [13]],
            ['Obligation and Need', 'must, have to, need to e regras', [14]],
            ['Conversation Activities 4 · Requests and Rules', 'pedidos, permissão, regras e solução social'],
            ['Life Experiences', 'Present Perfect, ever e never', [17, 18]],
            ['Present Perfect or Past Simple', 'experiência, detalhe passado e been/gone', [19, 20]],
            ['Conversation Activities 5 · Experiences and Details', 'entrevista, acompanhamento e relato de experiências'],
            ['Health and Consultation', 'sintomas, duração, consulta e conselho', [21, 22]],
            ['Place, Movement and Directions', 'preposições, rotas e esclarecimento', [23, 25, 27]],
            ['Conversation Activities 6 · Health and Directions', 'consulta, localização e instruções em etapas'],
            ['Hotel and Service Recovery', 'hotel, reclamação e recuperação de serviço', [28]],
            ['Gerunds and Infinitives', 'preferências e padrões verbais frequentes', [29]],
            ['Conversation Activities 7 · Practical English', 'problema de serviço, escolhas e solução prática'],
            ['Used To', 'hábitos, estados e mudanças do passado'],
            ['Zero and First Conditional', 'condições reais, consequências e alternativas', [30]],
            ['Conversation Activities 8 · Then, Now and Next', 'mudança de hábitos, condições e planos alternativos'],
            ['Superlatives and Ranking', 'superlativos, best/worst e evidências', [4]],
            ['Unless, Hope and Intention', 'unless, hope, intenção e previsão', [31]],
            ['Conversation Activities 9 · Best Choices and Hopes', 'ranking, expectativa e decisão justificada'],
            ['Deadlines and Time', 'prazos, datas e expressões de tempo', [26]],
            ['Specific Advice', 'should, ought to, instead of e conselho contextual', [15]],
            ['Conversation Activities 10 · Time, Advice and Decisions', 'prazos, conselho, consequência e decisão'],
            ['A2 Consolidation · Part 1', 'revisão extensa das lições 1–15'],
            ['A2 Consolidation · Part 2', 'revisão extensa das lições 16–30']
        ],
        'b1-v3': [
            ['Past Experience and Finished Time', 'Present Perfect versus passado concluído', [1]],
            ['Progress and Duration', 'Present Perfect Simple/Continuous e duração', [2]],
            ['Then, Now and Progress', 'missão de mudança e atualização'],
            ['Habits and Adaptation', 'used to, would, be/get used to', [3]],
            ['Layered Narratives', 'Past Simple, Continuous e Perfect em narrativa', [7]],
            ['Life Changes', 'relato de adaptação e mudança de vida'],
            ['Future Choices', 'will, going to, arranjos e horários', [4]],
            ['Conditions and Backup Plans', 'if, unless, in case e alternativas', [6]],
            ['Plan A, Change and Plan B', 'missão de planejamento sob mudança'],
            ['Deduction and Certainty', 'must, might, could e can’t', [5]],
            ['Rules, Permission and Expectations', 'modais e expectativas sociais', [13]],
            ['Evidence and Rules', 'investigação, evidência e aplicação de regras'],
            ['Opinions with Reasons', 'opinião, razão, exemplo e consequência', [9]],
            ['Disagreement and Clarification', 'discordância, esclarecimento e reformulação', [10]],
            ['Clear Communication', 'missão de discussão e reparo comunicativo'],
            ['Suggestions and Negotiation', 'sugestões, resposta e negociação', [11]],
            ['Comparing Trade-Offs', 'comparação precisa de alternativas', [12]],
            ['Reach an Agreement', 'missão de consenso justificado'],
            ['Relative Clauses for Detail', 'relative clauses e detalhamento', [14]],
            ['Passive Voice in Reports', 'voz passiva em notícias e processos', [15]],
            ['Explain and Report', 'missão de explicação e relato'],
            ['Reported Speech', 'relato de falas e mudança de referência', [17]],
            ['Indirect Questions and Requests', 'perguntas indiretas e pedidos polidos', [18]],
            ['Message Relay', 'mediação e retransmissão de mensagens'],
            ['Service Problems and Recovery', 'problemas, reclamações e solução de serviço', [19, 20]],
            ['Unexpected Events', 'imprevistos em viagem, saúde e trabalho', [21, 22, 23]],
            ['Real-World Problem Solving', 'missão integrada de solução prática'],
            ['Hypotheses, Wishes and Social Repair', 'Second Conditional, wishes e reparação social', [28, 29]],
            ['Presenting and Persuading', 'tese, evidência e resposta a perguntas', [30]],
            ['Persuade and Respond', 'missão de persuasão e resposta'],
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
        'a2-v3': [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 31, 32],
        'b1-v3': [3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
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

            return {
                id: stableId(moduleId, number, title),
                moduleId,
                level: level.toUpperCase(),
                version: MODULE_VERSIONS[moduleId] || VERSION,
                number,
                type,
                title,
                linguisticFocus,
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
        getModule,
        getLesson,
        isLessonComplete,
        migrateModuleProgress,
        audit
    });
}(window));
