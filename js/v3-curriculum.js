(function attachV3Curriculum(globalScope) {
    'use strict';

    const VERSION = '2026.07-action-oriented-32';
    const MODULE_VERSIONS = {
        'a1-v3': '2026.07.29-gradual-a1-32'
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
            ['Hello! I Am, You Are', 'cumprimentos, identidade e I am/you are', [1]],
            ['He Is, She Is: Countries', 'he/she + is e origem com Where ... from', [27]],
            ['My World: Family and Possessives', 'família e my/your/his/her', [3]],
            ['Alphabet and Numbers: Your Name', 'alfabeto, números 0–20 e soletração', [2]],
            ['Hello and Profiles', 'missão de apresentação, origem, família e nome'],
            ['Contact Details', 'telefone, e-mail, endereço e números 20–100', [2]],
            ['Everyday Objects: A and An', 'objetos singulares, a/an e it is'],
            ['This and That', 'demonstrativos singulares e distância'],
            ['These and Those', 'demonstrativos plurais e plural regular'],
            ['People and Things', 'missão de contato, identificação e objetos'],
            ['My Routine: I and You', 'Present Simple afirmativo com I/you', [5]],
            ['Likes and Don’t Like', 'gostos e negativa com I/you', [14]],
            ['His and Her Routine', 'terceira pessoa afirmativa e verbos frequentes', [5]],
            ['Do You...? Does He...?', 'perguntas e respostas curtas com do/does', [5]],
            ['Routine Interview', 'missão de rotina, gostos e perguntas'],
            ['How Often?', 'advérbios básicos de frequência', [14]],
            ['What Time Is It?', 'horários, at + hora e on + dia', [6]],
            ['Family Possession: Have and Has', 'have/has, our/their e possessive ’s', [3]],
            ['Jobs and Basic Abilities', 'ocupações e can/can’t', [19]],
            ['People and Weekly Life', 'missão de frequência, horários, família e habilidades'],
            ['My Home: There Is', 'there is singular e in/on/under', [18]],
            ['My Neighborhood: There Are', 'there are plural e localização básica', [10]],
            ['Market Day: Food and Some', 'contáveis, não contáveis e some afirmativo', [7]],
            ['At the Café: Some and Any', 'some/any e pedidos curtos', [7]],
            ['Home and Everyday Needs', 'missão de casa, bairro, mercado e cafeteria'],
            ['Talent Show: Can You...?', 'reciclagem de can com and/but', [19]],
            ['What Is Happening Now?', 'Present Continuous afirmativo', [23]],
            ['Are You Doing It Now?', 'perguntas e negativas no Present Continuous', [23]],
            ['Where Were You?', 'was/were para localização e estado passado', [29]],
            ['Now and Before', 'missão de habilidades, ações atuais e was/were'],
            ['My A1 Profile Workshop', 'preparação de projeto com linguagem consolidada'],
            ['A1 Oral Performance', 'apresentação, perguntas e avaliação oral A1']
        ],
        'a2-v3': [
            ['Past Stories', 'Past Simple em relatos completos', [1]],
            ['Sequence, Cause and Result', 'conectores de sequência, causa e resultado', [2]],
            ['Interrupted Stories', 'Past Continuous, Past Simple e interrupções', [6, 7]],
            ['Story Lab', 'reconstrução e narração de uma história'],
            ['Comparatives in Context', 'comparativos e as...as', [3]],
            ['Superlatives and Ranking', 'superlativos e formas irregulares', [4]],
            ['Articles and Quantifiers', 'artigos, contáveis e quantificadores', [5]],
            ['Compare and Choose', 'comparar alternativas e justificar uma escolha'],
            ['Going To', 'planos e evidências', [9]],
            ['Will', 'previsões, decisões e promessas', [10]],
            ['Arrangements and Timetables', 'Present Continuous e horários futuros', [11]],
            ['Planning Under Change', 'planejamento, imprevisto e plano alternativo'],
            ['Requests and Permission', 'can/could e pedidos polidos', [13]],
            ['Obligation and Need', 'must, have to e need to', [14]],
            ['Specific Advice', 'should, ought to e conselho contextual', [15]],
            ['Social Problem Solving', 'pedido, regra, conselho e solução social'],
            ['Life Experiences', 'Present Perfect e experiências', [17]],
            ['Just, Already and Yet', 'marcadores de resultado e progresso', [18]],
            ['Present Perfect or Past Simple', 'experiência, detalhe passado e been/gone', [19, 20]],
            ['Experience Interview', 'entrevista de experiências e acompanhamento'],
            ['Health and Consultation', 'sintomas, duração e consulta', [21, 22]],
            ['Place and Movement', 'preposições de lugar e movimento', [23, 25]],
            ['Multi-Step Routes', 'rotas, esclarecimento e sequência', [27]],
            ['Health and Directions', 'missão de consulta e deslocamento'],
            ['Deadlines and Time', 'prazos, datas e expressões de tempo', [26]],
            ['Hotel and Service Recovery', 'hotel, reclamação e recuperação de serviço', [28]],
            ['Gerunds and Infinitives', 'padrões verbais frequentes', [29]],
            ['Practical English', 'missão de prazo, hotel e solução prática'],
            ['Zero and First Conditional', 'condições reais e resultados', [30]],
            ['Unless, Hope and Intention', 'unless, hope e intenção', [31]],
            ['Used To', 'hábitos e estados passados'],
            ['A2 Final Project', 'projeto, revisão cumulativa e desempenho']
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
        'a1-v3': [5, 10, 15, 20, 25, 30],
        'a2-v3': [4, 8, 12, 16, 20, 24, 28, 32],
        'b1-v3': [3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
        'b2-v3': Array.from({ length: 16 }, (_, index) => (index + 1) * 2),
        'c1-v3': Array.from({ length: 16 }, (_, index) => (index + 1) * 2)
    };

    const projectPositions = {
        'a1-v3': [31, 32],
        'a2-v3': [32],
        'b1-v3': [31, 32],
        'b2-v3': [31, 32],
        'c1-v3': [31, 32]
    };

    const oralMinutes = { 'a1-v3': 36, 'a2-v3': 39, 'b1-v3': 42, 'b2-v3': 45, 'c1-v3': 45 };
    const levelFor = moduleId => moduleId.replace('-v3', '');
    const stableId = (moduleId, number, title) => `${moduleId}-${String(number).padStart(2, '0')}-${String(title).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
    const a1PreviousEquivalents = {
        1: [[1, 'Greetings and Introductions']],
        2: [[26, 'Countries and Languages']],
        3: [[3, 'Family and Possessives']],
        4: [[2, 'Personal Information']],
        6: [[2, 'Personal Information']],
        8: [[14, 'Shopping and Prices']],
        9: [[14, 'Shopping and Prices']],
        11: [[4, 'Routines and Present Simple']],
        12: [[13, 'Hobbies and Frequency']],
        13: [[4, 'Routines and Present Simple']],
        14: [[4, 'Routines and Present Simple']],
        16: [[13, 'Hobbies and Frequency']],
        17: [[6, 'Time and Schedules']],
        18: [[3, 'Family and Possessives']],
        19: [[18, 'School, Work and Abilities']],
        21: [[17, 'Home and Location']],
        22: [[9, 'Places in Town']],
        23: [[7, 'Food and Quantities']],
        24: [[7, 'Food and Quantities']],
        26: [[18, 'School, Work and Abilities']],
        27: [[22, 'Actions Now']],
        28: [[22, 'Actions Now']],
        29: [[27, 'Past Simple Essentials']],
        31: [[31, 'My English Profile Workshop']],
        32: [[32, 'A1 Oral Performance']]
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
            const reviewedNumbers = type === 'review' || (type === 'project' && number === 32)
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
