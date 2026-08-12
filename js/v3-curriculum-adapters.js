(function adaptLegacyV3LessonData(globalScope) {
    'use strict';

    const curriculum = globalScope.V3Curriculum;
    if (!curriculum) return;

    const clone = value => JSON.parse(JSON.stringify(value));
    const first = (lesson, type) => lesson?.slides?.find(slide => slide.type === type);
    const all = (lessons, type) => lessons.flatMap(lesson => lesson?.slides?.filter(slide => slide.type === type) || []);

    function attachMetadata(target, entry) {
        target.number = entry.number;
        target.title = entry.title;
        target.type = entry.type;
        target.curriculumId = entry.id;
        target.curriculumVersion = entry.version;
        target.linguisticFocus = entry.linguisticFocus;
        target.reviewOf = [...entry.reviewOf];
        target.cefrObjectives = clone(entry.cefrObjectives);
        target.oralInteractionMinutes = entry.oralInteractionMinutes;
        return target;
    }

    function reviewContract(entry, levelLabel) {
        return {
            scenario: `Use o conteúdo do bloco para conversar sobre “${entry.title}”, responder às perguntas do professor e construir uma conclusão clara.`,
            input: 'Leitura, diálogo ou listening curto que apresenta o tema e a linguagem em contexto.',
            controlledPractice: 'Recuperação breve de formas, colocações e expressões retiradas do contexto.',
            rounds: [
                'Apresentação guiada: organize uma primeira resposta com palavras-chave.',
                'Perguntas do professor: desenvolva fatos, razões, comparações ou exemplos.',
                'Resposta completa: reúna as ideias e aplique uma correção prioritária.'
            ],
            teacherFocus: 'Registre um acerto comunicativo e apenas um foco prioritário de correção; dê feedback antes da resposta completa.',
            cefrEvidence: `Evidência ${levelLabel}: recepção, produção, interação e mediação observáveis na realização da tarefa.`,
            cumulativeRecycling: 'Recupere pelo menos uma estrutura e duas colocações de blocos anteriores na conversa.',
            oralInteractionMinutes: entry.oralInteractionMinutes
        };
    }

    function buildA1IndividualRounds(entry, contract) {
        const blueprints = {
            5: {
                scenario: 'Faça uma apresentação curta sobre você e uma pessoa da sua família.',
                task: 'Diga seu nome e sua origem. Depois, apresente um familiar usando he ou she, um possessivo e a nacionalidade dessa pessoa.',
                questions: 'Responda às perguntas do professor sobre nome, origem, família e grafia.',
                finalTask: 'Faça uma apresentação final de quatro ou cinco frases conectando as informações principais.',
                support: ['My name is...', 'He/She is from...', 'He/She is...', 'How do you spell...?']
            },
            10: {
                scenario: 'Imagine uma mesa com um livro e uma chave perto, além de dois cadernos e três canetas longe.',
                task: 'Descreva os objetos com a/an e this, that, these ou those. Depois, informe um telefone ou e-mail fictício.',
                questions: 'Responda às perguntas do professor sobre quantidade, distância e dados de contato.',
                finalTask: 'Faça uma descrição final da mesa usando singular, plural, perto e longe com clareza.',
                support: ['This is...', 'That is...', 'These are...', 'Those are...']
            },
            15: {
                scenario: 'Fale sobre sua rotina e sobre a rotina de alguém que você conhece.',
                task: 'Diga duas atividades que você faz ou gosta de fazer e duas atividades que a outra pessoa faz.',
                questions: 'Responda às perguntas do professor usando do, does e respostas completas.',
                finalTask: 'Compare as duas rotinas em uma fala curta usando corretamente o verbo base e a terceira pessoa.',
                support: ['Do you...?', 'Does he/she...?', 'Yes, I do.', 'No, he/she doesn’t.']
            },
            20: {
                scenario: 'Escolha duas pessoas da sua família ou dois personagens conhecidos.',
                task: 'Fale sobre horários, frequência, profissão, posse e habilidades dessas pessoas.',
                questions: 'Responda às perguntas do professor sobre quando, com que frequência e o que cada pessoa sabe fazer.',
                finalTask: 'Apresente um pequeno perfil comparando as duas pessoas com have/has, can/can’t e uma expressão de frequência.',
                support: ['How often...?', 'At what time...?', 'He/She has...', 'He/She can...']
            },
            25: {
                scenario: 'Descreva sua casa, seu bairro e um pedido simples de comida.',
                task: 'Diga o que existe em um cômodo, cite dois lugares do bairro e escolha alimentos para um lanche.',
                questions: 'Responda às perguntas do professor usando Is there...?, Are there...? e any.',
                finalTask: 'Faça uma descrição final usando there is/are, localização e some/any.',
                support: ['There is/are...', 'It’s next to...', 'Is there any...?', 'I’d like some...']
            },
            30: {
                scenario: 'Pense em duas pessoas conhecidas e compare o que acontecia antes com o que acontece agora.',
                task: 'Diga o que elas sabem fazer, onde estavam antes e o que estão fazendo agora.',
                questions: 'Responda às perguntas do professor com can, was/were e Present Continuous.',
                finalTask: 'Conte a cena completa em uma sequência clara: habilidades, antes e agora.',
                support: ['He/She can...', 'He/She is ...ing.', 'He/She was...', 'They were...']
            },
            31: {
                scenario: 'Prepare individualmente um projeto pessoal A1 com apoio dos tópicos exibidos na tela.',
                task: 'Selecione fatos sobre identidade, família, rotina, habilidades e uma situação atual.',
                questions: 'Responda às perguntas do professor para completar informações que ainda não estão claras.',
                finalTask: 'Organize o projeto em começo, meio e fim e ensaie sem ler frases completas.',
                support: ['My project is about...', 'I usually...', 'I can...', 'Right now...']
            },
            32: {
                scenario: 'Faça sua apresentação final A1 e responda às perguntas do professor.',
                task: 'Apresente o projeto com exemplos claros sobre identidade, rotina, habilidades e experiências do nível.',
                questions: 'Responda a perguntas curtas do professor sobre os pontos apresentados.',
                finalTask: 'Faça o fechamento da apresentação e reformule somente o trecho indicado no feedback.',
                support: ['Let me explain...', 'Usually...', 'Right now...', 'Yesterday, I was...']
            }
        };
        const blueprint = blueprints[entry.number] || blueprints[32];

        return [
            {
                kind: 'individual-round',
                phase: 'attempt',
                title: 'Speaking: apresentação guiada',
                instruction: 'Use o apoio da tela para organizar sua fala.',
                round: {
                    label: 'Apresentação guiada',
                    scenario: blueprint.scenario,
                    task: blueprint.task,
                    condition: 'Use palavras-chave como apoio, sem ler frases completas.',
                    steps: ['Escolha as informações principais.', 'Organize a ordem das ideias.', 'Apresente em voz alta.'],
                    support: blueprint.support,
                    evidence: `${contract.cefrEvidence} Observe se a mensagem ficou compreensível.`
                }
            },
            {
                kind: 'individual-round',
                phase: 'questions',
                title: 'Speaking: perguntas do professor',
                instruction: 'Ouça e responda individualmente às perguntas do professor.',
                round: {
                    label: 'Perguntas e respostas',
                    scenario: blueprint.questions,
                    task: 'Responda com frases completas e peça repetição quando necessário.',
                    condition: 'O professor fará uma pergunta por vez e poderá pedir um detalhe adicional.',
                    steps: ['Ouça a pergunta.', 'Responda com uma frase completa.', 'Acrescente um detalhe quando conseguir.'],
                    support: ['Could you repeat, please?', 'Yes, I am.', 'Yes, I do.', 'Let me think.'],
                    evidence: 'Observe compreensão das perguntas e clareza das respostas.'
                }
            },
            {
                kind: 'individual-round',
                phase: 'final',
                title: 'Speaking: resposta completa',
                instruction: 'Organize as ideias principais em uma produção oral curta.',
                round: {
                    label: 'Produção final',
                    scenario: blueprint.finalTask,
                    task: 'Apresente a resposta completa sem depender de um roteiro escrito.',
                    condition: 'Use o apoio linguístico somente quando precisar e aplique uma correção indicada pelo professor.',
                    steps: ['Organize a ordem das ideias.', 'Faça sua apresentação.', 'Aplique uma correção curta, se necessário.'],
                    support: blueprint.support,
                    evidence: `${contract.teacherFocus} Registre o ponto que já ficou independente.`
                }
            }
        ];
    }

    function sampleEvenly(items, maximum) {
        if (items.length <= maximum) return [...items];
        if (maximum <= 1) return [items[0]];
        const last = items.length - 1;
        return Array.from({ length: maximum }, (_, index) => items[Math.round((index * last) / (maximum - 1))]);
    }

    const a1ReviewFocusGroups = {
        5: [
            { title: 'Verb to be', lessonNumbers: [1, 2], practiceCount: 7 },
            { title: 'Possessive adjectives', lessonNumbers: [3], practiceCount: 6 },
            { title: 'Names, spelling and age', lessonNumbers: [4], practiceCount: 6 }
        ],
        10: [
            { title: 'Personal information', lessonNumbers: [6], practiceCount: 5 },
            { title: 'Articles: a and an', lessonNumbers: [7], practiceCount: 6 },
            { title: 'Demonstratives: this, that, these and those', lessonNumbers: [8, 9], practiceCount: 7 }
        ],
        15: [
            { title: 'Present Simple: statements and preferences', lessonNumbers: [11, 12, 13], practiceCount: 8 },
            { title: 'Present Simple: questions with do and does', lessonNumbers: [14], practiceCount: 6 }
        ],
        20: [
            { title: 'Frequency', lessonNumbers: [16], practiceCount: 5 },
            { title: 'Time and days', lessonNumbers: [17], practiceCount: 6 },
            { title: 'Have and has', lessonNumbers: [18], practiceCount: 5 },
            { title: 'Can and can’t', lessonNumbers: [19], practiceCount: 6 }
        ],
        25: [
            { title: 'There is and there are', lessonNumbers: [21, 22], practiceCount: 7 },
            { title: 'Some and any', lessonNumbers: [23, 24], practiceCount: 7 }
        ],
        30: [
            { title: 'Can: abilities and questions', lessonNumbers: [26], practiceCount: 5 },
            { title: 'Present Continuous', lessonNumbers: [27, 28], practiceCount: 7 },
            { title: 'Past of be: was and were', lessonNumbers: [29], practiceCount: 6 }
        ]
    };

    function buildA1ReviewFocusStations(entry, lessons) {
        const requestedGroups = a1ReviewFocusGroups[entry.number];
        const groups = requestedGroups || sampleEvenly(lessons, 4).map(lesson => ({
            title: lesson.grammar?.title || lesson.title,
            lessonNumbers: [lesson.number]
        }));

        return groups.map(group => {
            const sources = group.lessonNumbers.map(number => lessons.find(lesson => lesson.number === number)).filter(Boolean);
            const rows = sources.flatMap(lesson => (lesson.grammar?.rows || []).map(row => row.slice(0, 3)));
            const notes = [...new Set(sources.flatMap(lesson => lesson.grammar?.notes || []))];
            const practice = sources.flatMap(lesson => lesson.practice || []);
            const practiceCount = group.practiceCount || Math.min(practice.length, Math.max(5, rows.length + 1));
            return {
                kind: 'focus-practice',
                title: `Atividades: ${group.title}`,
                instruction: `Resolva individualmente as atividades sobre ${group.title}.`,
                grammar: {
                    title: group.title,
                    summary: sources.map(lesson => lesson.grammar?.summary).filter(Boolean).join(' '),
                    rows,
                    notes
                },
                items: sampleEvenly(practice, practiceCount)
            };
        }).filter(station => station.grammar.rows.length && station.items.length);
    }

    function buildA1Review(entry, reviewedLessons) {
        const contract = reviewContract(entry, 'CEFR A1');
        const lessons = reviewedLessons.filter(Boolean);
        const grammarPoints = lessons.flatMap(lesson => (lesson.grammar?.rows || []).map(row => [
            `${lesson.title} · ${row[0]}`,
            row[1],
            row[2]
        ]));
        const recap = sampleEvenly(grammarPoints, 8);
        const stationLessons = sampleEvenly(lessons, 4);
        const focusStations = buildA1ReviewFocusStations(entry, lessons);
        const readingSource = lessons.at(-1)?.reading || lessons[0]?.reading || {
            title: entry.title,
            text: contract.scenario,
            questions: [['What is the mission?', 'Complete the mission with the language from the block.']]
        };
        const review = {
            title: entry.title,
            objectives: [
                `Recuperar a linguagem das aulas ${stationLessons.map(lesson => lesson.number).join(', ')} sem introduzir uma nova estrutura.`,
                'Praticar cada foco individualmente antes de avançar para o próximo conteúdo.',
                'Aplicar o feedback do professor em uma resposta final mais clara.'
            ],
            recap: recap.length ? recap : [[entry.title, entry.linguisticFocus, contract.cefrEvidence]],
            stations: [
                ...focusStations,
                ...buildA1IndividualRounds(entry, contract)
            ],
            reading: clone(readingSource),
            homework: {
                instruction: `Prepare uma resposta oral curta sobre “${entry.title}” para a próxima aula.`,
                themes: [
                    'As informações principais sobre o tema',
                    'Uma pergunta do professor respondida com detalhes',
                    'A resposta final depois do feedback'
                ],
                checklist: [
                    'Reciclei linguagem de todas as aulas do bloco.',
                    'Incluí uma razão, um exemplo ou uma comparação.',
                    'Corrigi um ponto específico na resposta final.'
                ]
            },
            contract
        };
        if (entry.number === 5) {
            review.homework = {
                instruction: 'Prepare uma apresentação pessoal curta para a próxima aula.',
                themes: [
                    'Seu nome, sua origem e sua nacionalidade',
                    'Uma pessoa da sua família: nome, relação e nacionalidade',
                    'A grafia de um nome e uma idade entre zero e vinte'
                ],
                checklist: [
                    'Usei am, is e are com os sujeitos corretos.',
                    'Usei my, his ou her antes do substantivo.',
                    'Consigo falar sem ler todas as frases.'
                ]
            };
        }
        return attachMetadata(review, entry);
    }

    function adaptA1() {
        const source = globalScope.A1V3_DATA;
        if (!source) return;

        const oldLessons = clone(source.lessons);
        const newLessons = {};
        const newReviews = {};
        const builtById = new Map();
        const builtContent = [];

        curriculum.getModule('a1-v3').forEach(entry => {
            if (entry.type === 'content') {
                const legacy = entry.legacyLessons[0];
                const lesson = clone(source.cadenceVersion ? oldLessons[entry.number] : oldLessons[legacy]);
                if (!lesson) return;
                lesson.title = entry.title;
                const adapted = attachMetadata(lesson, entry);
                newLessons[entry.number] = adapted;
                builtById.set(entry.id, adapted);
                builtContent.push(adapted);
                return;
            }

            const reviewed = entry.type === 'project'
                ? builtContent
                : entry.reviewOf.map(id => builtById.get(id)).filter(Boolean);
            const review = buildA1Review(entry, reviewed);
            newReviews[entry.number] = review;
            builtById.set(entry.id, review);
        });

        source.lessonTitles = curriculum.getModule('a1-v3').map(entry => entry.title);
        source.unitLabels = curriculum.getModule('a1-v3').map(entry => entry.type === 'content' ? 'Integrated Content' : entry.type === 'review' ? 'Action Mission' : 'Performance Project');
        source.lessons = newLessons;
        source.reviews = newReviews;
    }

    function mergeB1Content(entry, sourceLessons) {
        const base = clone(sourceLessons[0]);
        attachMetadata(base, entry);
        base.unit = `B1 Action Cycle · ${Math.ceil(entry.number / 3)}`;
        base.objective = `Integrar ${entry.linguisticFocus} em compreensão, diálogo e produção.`;
        base.focus = entry.linguisticFocus;
        base.cefr = entry.cefrObjectives.map(item => item.descriptor).join(' ');

        if (sourceLessons.length > 1) {
            const extras = sourceLessons.slice(1);
            const extraSlides = [
                ...all(extras, 'languageBank'),
                ...all(extras, 'reading'),
                ...all(extras, 'teacherListening'),
                ...all(extras, 'speaking')
            ].map(clone);
            const homeworkIndex = base.slides.findIndex(slide => slide.type === 'homework');
            base.slides.splice(homeworkIndex < 0 ? base.slides.length : homeworkIndex, 0, ...extraSlides);
        }
        return base;
    }

    function buildB1Review(entry, reviewedLessons) {
        const builder = globalScope.B1_V3_LESSON_BUILDERS;
        const opening = first(reviewedLessons[0], 'opening') || { dialogue: { title: entry.title, lines: [] } };
        const grammarSlides = all(reviewedLessons, 'grammar');
        const practiceItems = all(reviewedLessons, 'practice').flatMap(slide => slide.items || []);
        const reading = first(reviewedLessons.at(-1), 'reading') || first(reviewedLessons[0], 'reading');
        const listening = first(reviewedLessons.at(-1), 'teacherListening') || first(reviewedLessons[0], 'teacherListening');
        const translations = all(reviewedLessons, 'translation').flatMap(slide => slide.items || []);
        const contract = reviewContract(entry, 'CEFR B1');
        const fallbackItems = practiceItems.length ? practiceItems : [{ kind: 'complete', prompt: 'Complete a missão com uma resposta conectada.', hint: 'use o foco do bloco', answer: 'Resposta pessoal.' }];
        const grammarTables = grammarSlides.flatMap(slide => slide.tables || []);
        const grammarNotes = grammarSlides.flatMap(slide => slide.notes || []);
        const sourceSpeaking = first(reviewedLessons.at(-1), 'speaking') || {};
        const controlledKinds = new Set(['complete', 'choose', 'correct', 'repair', 'form']);
        const controlledItems = fallbackItems.filter(item => controlledKinds.has(String(item.kind || '').toLowerCase()));
        const communicativeItems = fallbackItems.filter(item => !controlledKinds.has(String(item.kind || '').toLowerCase()));

        const review = builder.createReviewLesson({
            number: entry.number,
            unit: `B1 Action Cycle · ${Math.ceil(entry.number / 3)}`,
            title: entry.title,
            objective: contract.scenario,
            focus: entry.linguisticFocus,
            cefr: contract.cefrEvidence,
            objectives: [
                'Recuperar linguagem do bloco a partir de um contexto curto.',
                'Responder a perguntas progressivas com fatos, razões e exemplos.',
                'Aplicar feedback específico em uma resposta final mais completa.'
            ],
            opening: opening.dialogue || opening,
            grammar: {
                title: 'Language Control Panel',
                intro: contract.controlledPractice,
                tables: grammarTables.length ? grammarTables : [{ title: 'Functions', headers: ['Need', 'Language', 'Evidence'], rows: [['Complete the mission', entry.linguisticFocus, 'A connected and intelligible response.']] }],
                notes: grammarNotes.length ? grammarNotes : [contract.teacherFocus]
            },
            stationOne: {
                title: 'Controlled Retrieval',
                intro: contract.controlledPractice,
                items: controlledItems.length ? controlledItems : fallbackItems
            },
            stationTwo: {
                title: 'Guided Questions and Choice',
                intro: 'O professor apresenta uma pergunta por vez. Responda, acrescente uma razão e compare opções quando necessário.',
                items: communicativeItems.length ? communicativeItems : fallbackItems
            },
            reading: reading || { title: 'Mission Input', genre: 'Short scenario', paragraphs: [contract.scenario], vocabulary: [], questions: [] },
            listening: listening || { title: 'Teacher Listening', setup: 'Ouça duas vezes e anote condição, problema e prioridade.', script: contract.scenario, questions: [] },
            translation: { title: 'Contextual Mediation', items: translations },
            speaking: {
                title: 'Guided Conversation',
                scenario: contract.scenario,
                languageBank: sourceSpeaking.languageBank || [entry.linguisticFocus, 'What if...?', 'In that case...', 'Let me clarify...', 'Our final choice is...'],
                rounds: contract.rounds,
                teacherFocus: `${contract.teacherFocus} ${contract.cefrEvidence}`
            },
            homework: {
                title: 'Performance Evidence',
                deliverable: 'Registre a solução final e uma breve reflexão sobre o feedback aplicado.',
                options: [{ title: 'Audio rehearsal', prompt: 'Grave ou ensaie uma versão de 90 segundos.' }, { title: 'Dialogue redesign', prompt: 'Escreva uma nova variação do cenário.' }],
                checklist: ['Usei linguagem do bloco.', 'Respondi com fatos, razões ou exemplos.', 'Apliquei o foco de correção.', 'Reciclei conteúdo anterior.']
            }
        });
        review.reviewContract = contract;
        return attachMetadata(review, entry);
    }

    function adaptB1() {
        if (!Array.isArray(globalScope.B1_V3_LESSONS) || !globalScope.B1_V3_LESSON_BUILDERS) return;
        const oldByNumber = new Map(globalScope.B1_V3_LESSONS.map(lesson => [lesson.number, clone(lesson)]));
        const builtById = new Map();
        const rebuilt = [];

        curriculum.getModule('b1-v3').forEach(entry => {
            if (entry.type === 'content') {
                const sources = entry.legacyLessons.map(number => oldByNumber.get(number)).filter(Boolean);
                if (!sources.length) return;
                const lesson = mergeB1Content(entry, sources);
                rebuilt.push(lesson);
                builtById.set(entry.id, lesson);
                return;
            }

            if (entry.type === 'project') {
                const source = oldByNumber.get(entry.legacyLessons[0] || entry.number);
                if (!source) return;
                const project = attachMetadata(clone(source), entry);
                project.title = entry.title;
                project.objective = `Produzir e defender o projeto B1 com evidências das competências previstas no manifesto.`;
                project.reviewContract = reviewContract(entry, 'CEFR B1');
                rebuilt.push(project);
                builtById.set(entry.id, project);
                return;
            }

            const reviewed = entry.reviewOf.map(id => builtById.get(id)).filter(Boolean);
            const review = buildB1Review(entry, reviewed);
            rebuilt.push(review);
            builtById.set(entry.id, review);
        });

        globalScope.B1_V3_LESSONS.length = 0;
        globalScope.B1_V3_LESSONS.push(...rebuilt.sort((a, b) => a.number - b.number));
    }

    adaptA1();
    adaptB1();
}(window));
