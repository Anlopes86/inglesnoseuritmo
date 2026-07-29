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
            scenario: `Use o conteúdo do bloco para cumprir a missão “${entry.title}” com uma decisão real e informação incompleta.`,
            input: 'Leitura, diálogo ou listening curto antes da produção.',
            controlledPractice: 'Recuperação breve de formas e blocos lexicais retirados do contexto.',
            rounds: [
                'Primeira tentativa: conclua a missão com a informação disponível.',
                'Condição inesperada: o professor altera uma restrição, prioridade ou dado.',
                'Segunda tentativa: refaça a missão com mais clareza, precisão e autonomia.'
            ],
            teacherFocus: 'Registre um acerto comunicativo e apenas um foco prioritário de correção; dê feedback e preserve tempo para a segunda tentativa.',
            cefrEvidence: `Evidência ${levelLabel}: recepção, produção, interação e mediação observáveis na realização da tarefa.`,
            cumulativeRecycling: 'Recupere pelo menos uma estrutura e duas colocações de blocos anteriores.',
            oralInteractionMinutes: entry.oralInteractionMinutes
        };
    }

    function buildA1CommunicationRounds(entry, contract) {
        const blueprints = {
            5: {
                scenario: 'Dois alunos se encontram antes da primeira aula e precisam completar cartões de identificação.',
                roleA: 'Aluno A: você tem os nomes e países, mas não sabe quem são os familiares nem como os nomes são escritos.',
                roleB: 'Aluno B: você conhece as relações familiares e a grafia, mas não sabe de onde cada pessoa é.',
                informationGap: 'Não mostrem as fichas. Façam perguntas para completar nome, país, relação familiar e grafia.',
                choice: 'Escolham a melhor dupla e apresentem as duas pessoas ao professor.',
                twist: 'Uma identificação está com uma letra errada e um novo aluno chega sem cartão. Confirmem a grafia e reorganizem as duplas.',
                retryGoal: 'Refaçam a apresentação sem ler, incluindo uma pergunta de acompanhamento e uma correção educada.',
                support: ['What’s your name?', 'Where is he/she from?', 'Who is he/she?', 'How do you spell...?']
            },
            10: {
                scenario: 'A turma organiza uma mesa de achados e perdidos e precisa devolver cada objeto à pessoa certa.',
                roleA: 'Aluno A: você sabe quais objetos estão perto e os nomes dos donos, mas não conhece telefone nem grafia.',
                roleB: 'Aluno B: você possui os dados de contato, mas precisa descobrir quais objetos são singulares, plurais, próximos ou distantes.',
                informationGap: 'Descrevam os objetos com this/that/these/those e confirmem os dados sem mostrar as fichas.',
                choice: 'Entreguem cada objeto ao dono correto e confirmem um dado de contato.',
                twist: 'Dois objetos são muito parecidos e um telefone foi registrado com um número incorreto.',
                retryGoal: 'Refaçam a devolução distinguindo singular, plural, perto e longe com clareza.',
                support: ['What is this/that?', 'What are these/those?', 'Is this yours?', 'Could you repeat the number?']
            },
            15: {
                scenario: 'Dois colegas precisam descobrir se suas rotinas e preferências permitem formar uma dupla de estudos.',
                roleA: 'Aluno A: você conhece sua rotina e seus gostos, mas não conhece os horários nem as preferências do colega.',
                roleB: 'Aluno B: você possui uma agenda diferente e informações sobre a rotina de uma terceira pessoa.',
                informationGap: 'Façam perguntas com do/does para completar rotina, gostos e disponibilidade.',
                choice: 'Decidam se a dupla funciona e indiquem o melhor período para estudar.',
                twist: 'Uma das respostas do perfil estava errada e a terceira pessoa precisa entrar na dupla.',
                retryGoal: 'Refaçam a entrevista usando a forma correta depois de do/does e respostas completas.',
                support: ['Do you...?', 'Does he/she...?', 'Yes, I do.', 'No, he/she doesn’t.']
            },
            20: {
                scenario: 'Uma família precisa organizar a semana conciliando horários, trabalho e habilidades de cada pessoa.',
                roleA: 'Aluno A: você conhece os horários e a frequência das atividades, mas não sabe quem tem cada habilidade.',
                roleB: 'Aluno B: você conhece profissões, habilidades e relações familiares, mas faltam dias e horários.',
                informationGap: 'Perguntem sobre frequência, hora, posse familiar e habilidades para completar a agenda.',
                choice: 'Distribuam três tarefas entre as pessoas e justifiquem a escolha.',
                twist: 'Uma pessoa muda de horário e outra não pode realizar a habilidade prevista.',
                retryGoal: 'Apresentem a nova agenda com horários corretos, can/can’t e pelo menos um advérbio de frequência.',
                support: ['How often...?', 'What time...?', 'He/She has...', 'Can he/she...?']
            },
            25: {
                scenario: 'Dois colegas vão receber uma visita e precisam preparar a casa, indicar lugares próximos e organizar um lanche.',
                roleA: 'Aluno A: você conhece a casa e o bairro, mas não sabe quais alimentos estão disponíveis.',
                roleB: 'Aluno B: você tem a lista do mercado e o cardápio, mas não sabe onde ficam os lugares e objetos.',
                informationGap: 'Troquem informações usando there is/are, localização e some/any.',
                choice: 'Escolham onde receber a visita e o que servir.',
                twist: 'O café não tem um item do pedido e o cômodo escolhido passa a ficar indisponível.',
                retryGoal: 'Apresentem a solução final localizando o novo espaço e fazendo um pedido alternativo.',
                support: ['There is/are...', 'It’s next to...', 'Do you have any...?', 'I’d like some...']
            },
            30: {
                scenario: 'A turma reconstrói o que aconteceu antes e durante um show usando talentos, ações atuais e localizações passadas.',
                roleA: 'Aluno A: você sabe onde as pessoas estavam antes do show, mas não sabe o que estão fazendo agora.',
                roleB: 'Aluno B: você vê as ações atuais e conhece os talentos, mas não sabe as localizações anteriores.',
                informationGap: 'Perguntem sobre can, ações em andamento e was/were para completar a linha do tempo.',
                choice: 'Organizem as pessoas na cena correta e apresentem o antes e o agora.',
                twist: 'Uma foto recebeu horário errado e duas pessoas trocaram de lugar.',
                retryGoal: 'Reconstruam a cena usando was/were para antes e Present Continuous para agora.',
                support: ['Can he/she...?', 'What is he/she doing?', 'Where was/were...?', 'Now, he/she is...']
            },
            31: {
                scenario: 'O aluno prepara um projeto pessoal A1 e precisa selecionar informações que formem uma apresentação clara.',
                roleA: 'Aluno: traga fatos sobre identidade, família, rotina, habilidades e uma situação atual.',
                roleB: 'Professor/colega: faça perguntas para encontrar lacunas e informações pouco claras.',
                informationGap: 'O ouvinte recebe apenas o título do projeto e precisa descobrir os detalhes por perguntas.',
                choice: 'Escolham os fatos e o apoio visual que realmente ajudam o público.',
                twist: 'O tempo da apresentação é reduzido e uma imagem deixa de poder ser usada.',
                retryGoal: 'Reorganize o projeto, ensaie novamente e responda a duas perguntas sem roteiro completo.',
                support: ['My project is about...', 'I usually...', 'I can...', 'Right now...']
            },
            32: {
                scenario: 'Apresentação final A1 com perguntas autênticas e uma segunda versão após feedback.',
                roleA: 'Aluno: apresente seu projeto e sustente a conversa com respostas completas.',
                roleB: 'Professor: escute, peça esclarecimento e faça perguntas sobre identidade, rotina, habilidades, ações atuais e localização passada.',
                informationGap: 'O aluno não conhece previamente as perguntas; o professor não conhece todos os detalhes do projeto.',
                choice: 'Selecione exemplos que tornem a mensagem compreensível para o público.',
                twist: 'O professor pede um detalhe adicional e a reformulação de uma frase que ficou ambígua.',
                retryGoal: 'Apresente novamente o trecho principal, aplicando o feedback e encerrando com autonomia.',
                support: ['Let me explain...', 'Usually...', 'Right now...', 'Yesterday, I was...']
            }
        };
        const blueprint = blueprints[entry.number] || blueprints[32];

        return [
            {
                kind: 'communicative-round',
                phase: 'attempt',
                title: 'Round 1: First Attempt',
                instruction: 'Trabalhem em papéis diferentes. Não mostrem suas informações e cheguem a uma decisão conjunta.',
                round: {
                    label: 'Tentativa inicial',
                    scenario: blueprint.scenario,
                    roleA: blueprint.roleA,
                    roleB: blueprint.roleB,
                    informationGap: blueprint.informationGap,
                    task: blueprint.choice,
                    steps: ['Leia somente o seu papel.', 'Faça perguntas para completar as lacunas.', 'Negocie uma escolha e anuncie a decisão.'],
                    support: blueprint.support,
                    evidence: `${contract.cefrEvidence} Nesta rodada, observe se a mensagem foi compreendida.`
                }
            },
            {
                kind: 'communicative-round',
                phase: 'twist',
                title: 'Round 2: Unexpected Condition',
                instruction: 'O professor revela a mudança somente depois da primeira decisão. Reajam sem reiniciar a conversa.',
                round: {
                    label: 'Condição inesperada',
                    scenario: blueprint.twist,
                    roleA: 'Aluno A: explique qual parte do plano ainda pode ser mantida.',
                    roleB: 'Aluno B: proponha uma alternativa e peça confirmação.',
                    informationGap: 'Cada aluno recebe uma consequência diferente da mudança; descubram ambas conversando.',
                    task: 'Abandonem, adaptem ou defendam a primeira escolha e expliquem o motivo.',
                    steps: ['Ouça a nova condição.', 'Confirme o problema com uma pergunta.', 'Negocie uma solução diferente.'],
                    support: ['Wait, there is a problem.', 'Can we... instead?', 'What about...?', 'Okay, let’s change...'],
                    evidence: 'Observe reação, pedido de esclarecimento e capacidade de manter a interação.'
                }
            },
            {
                kind: 'communicative-round',
                phase: 'retry',
                title: 'Round 3: Second Attempt',
                instruction: 'Aplique o foco de correção do professor e refaça a parte principal com menos apoio.',
                round: {
                    label: 'Segunda tentativa',
                    scenario: blueprint.retryGoal,
                    roleA: 'Falante: reconstrua a mensagem sem ler frases completas.',
                    roleB: 'Ouvinte: faça uma pergunta de acompanhamento e confirme a decisão final.',
                    informationGap: 'O professor informa somente um foco de correção; o aluno decide onde e como aplicá-lo.',
                    task: 'Entregue uma versão mais clara, correta e autônoma da missão.',
                    steps: ['Registre um acerto e um ajuste.', 'Refaça a fala principal.', 'Responda à pergunta e faça o fechamento.'],
                    support: blueprint.support.slice(0, 2),
                    evidence: `${contract.teacherFocus} Evidência final: compare a primeira e a segunda tentativa.`
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
        const readingSource = lessons.at(-1)?.reading || lessons[0]?.reading || {
            title: entry.title,
            text: contract.scenario,
            questions: [['What is the mission?', 'Complete the mission with the language from the block.']]
        };
        const review = {
            title: entry.title,
            objectives: [
                `Recuperar a linguagem das aulas ${stationLessons.map(lesson => lesson.number).join(', ')} sem introduzir uma nova estrutura.`,
                'Trocar informação, tomar uma decisão e reagir a uma condição inesperada.',
                'Aplicar um foco de feedback em uma segunda tentativa mais clara.'
            ],
            recap: recap.length ? recap : [[entry.title, entry.linguisticFocus, contract.cefrEvidence]],
            stations: [
                ...stationLessons.map((lesson, index) => ({
                    title: `Station ${index + 1}: ${lesson.title}`,
                    instruction: `Recupere somente o foco de “${lesson.title}” antes de iniciar a missão comunicativa.`,
                    items: (lesson.practice || []).slice(index % 2 === 0 ? 0 : 4, index % 2 === 0 ? 4 : 8)
                })),
                ...buildA1CommunicationRounds(entry, contract)
            ],
            reading: clone(readingSource),
            homework: {
                instruction: `Registre a solução da missão “${entry.title}” e prepare uma versão oral curta para a próxima aula.`,
                themes: [
                    'A primeira tentativa e o que funcionou',
                    'A condição inesperada e a nova decisão',
                    'A segunda tentativa depois do feedback'
                ],
                checklist: [
                    'Reciclei linguagem de todas as aulas do bloco.',
                    'Registrei uma escolha ou informação que faltava.',
                    'Corrigi um ponto específico na segunda tentativa.'
                ]
            },
            contract
        };
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
                ...all(extras, 'languageBank').slice(0, 1),
                ...all(extras, 'reading').slice(0, 2),
                ...all(extras, 'teacherListening').slice(0, 2),
                ...all(extras, 'speaking').slice(0, 2)
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
        const grammarTables = grammarSlides.flatMap(slide => slide.tables || []).slice(0, 2);
        const grammarNotes = grammarSlides.flatMap(slide => slide.notes || []).slice(0, 4);
        const sourceSpeaking = first(reviewedLessons.at(-1), 'speaking') || {};

        const review = builder.createReviewLesson({
            number: entry.number,
            unit: `B1 Action Cycle · ${Math.ceil(entry.number / 3)}`,
            title: entry.title,
            objective: contract.scenario,
            focus: entry.linguisticFocus,
            cefr: contract.cefrEvidence,
            objectives: [
                'Recuperar linguagem do bloco a partir de um contexto curto.',
                'Negociar uma escolha ou completar informação em três rodadas.',
                'Aplicar feedback específico na segunda tentativa.'
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
                items: fallbackItems.slice(0, 10)
            },
            stationTwo: {
                title: 'Choice and Information Gap',
                intro: 'O professor mantém parte da informação. Faça perguntas, compare opções e confirme uma decisão.',
                items: fallbackItems.slice(5, 15).length ? fallbackItems.slice(5, 15) : fallbackItems.slice(0, 8)
            },
            reading: reading || { title: 'Mission Input', genre: 'Short scenario', paragraphs: [contract.scenario], vocabulary: [], questions: [] },
            listening: listening || { title: 'Teacher Listening', setup: 'Ouça duas vezes e anote condição, problema e prioridade.', script: contract.scenario, questions: [] },
            translation: { title: 'Contextual Mediation', items: translations.slice(0, 10) },
            speaking: {
                title: 'Three-Round Performance',
                scenario: contract.scenario,
                languageBank: sourceSpeaking.languageBank || [entry.linguisticFocus, 'What if...?', 'In that case...', 'Let me clarify...', 'Our final choice is...'],
                rounds: contract.rounds,
                teacherFocus: `${contract.teacherFocus} ${contract.cefrEvidence}`
            },
            homework: {
                title: 'Performance Evidence',
                deliverable: 'Registre a solução final e uma breve reflexão sobre o feedback aplicado.',
                options: [{ title: 'Audio rehearsal', prompt: 'Grave ou ensaie uma versão de 90 segundos.' }, { title: 'Dialogue redesign', prompt: 'Escreva uma nova variação do cenário.' }],
                checklist: ['Usei linguagem do bloco.', 'Reagi à condição inesperada.', 'Apliquei o foco de correção.', 'Reciclei conteúdo anterior.']
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
