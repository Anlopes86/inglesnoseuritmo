window.PREPB1_LESSONS = [
    {
        number: 1,
        unit: "Bridge Diagnostic",
        title: "Everyday English Diagnostic",
        objective: "Reativar as estruturas essenciais do A1 e verificar se o aluno consegue sustentar respostas simples sobre a vida cotidiana.",
        focus: "Question forms, routines, frequency and connected answers",
        cefr: "A2+ readiness",
        slides: [
            {
                type: "opening",
                title: "Everyday English Diagnostic",
                objectives: [
                    "Revisar perguntas com be, do e does.",
                    "Descrever rotinas usando advérbios de frequência.",
                    "Conectar informações com because, but e so.",
                    "Responder e fazer perguntas de continuação."
                ],
                dialogue: {
                    title: "Before leaving home",
                    lines: [
                        ["Maya", "Are you working from home today?"],
                        ["Noah", "No, I have a meeting downtown at nine."],
                        ["Maya", "Do you usually take the bus?"],
                        ["Noah", "Usually, but the subway is faster on Mondays."],
                        ["Maya", "What time do you need to leave?"],
                        ["Noah", "In about ten minutes. I just need to find my keys."],
                        ["Maya", "They are next to your coffee cup."],
                        ["Noah", "Perfect. You always know where everything is."]
                    ]
                }
            },
            {
                type: "grammar",
                title: "The foundations that hold a conversation together",
                intro: "Nesta revisão, a escolha do auxiliar depende do tipo de informação que vem depois.",
                tables: [
                    {
                        title: "Be or do/does?",
                        headers: ["Purpose", "Pattern", "Example"],
                        rows: [
                            ["Estado ou descrição", "be + subject", "Is your office busy?"],
                            ["Rotina com I/you/we/they", "do + subject + base verb", "Do you work on Saturdays?"],
                            ["Rotina com he/she/it", "does + subject + base verb", "Does she take the bus?"],
                            ["Resposta negativa", "do not / does not + base verb", "He doesn't drive to work."]
                        ]
                    },
                    {
                        title: "Frequency and connection",
                        headers: ["Tool", "Position or meaning", "Example"],
                        rows: [
                            ["usually / often / rarely", "Antes do verbo principal", "I usually cook at home."],
                            ["always / never with be", "Depois do verbo be", "She is always on time."],
                            ["because", "Apresenta a razão", "I walk because the office is close."],
                            ["but / so", "Contraste / consequência", "I was tired, but I went. / It rained, so I stayed home."]
                        ]
                    }
                ],
                notes: [
                    "Depois de does ou doesn't, o verbo principal volta à forma base.",
                    "Uma resposta A2+ fica mais clara quando inclui informação, razão e um detalhe."
                ]
            },
            {
                type: "practice",
                title: "Foundation Check: Questions and routines",
                intro: "Complete, reorganize ou corrija cada item. Revele a resposta somente depois da tentativa do aluno.",
                items: [
                    { kind: "complete", prompt: "My brother ____ work at eight every morning.", answer: "starts", hint: "começar" },
                    { kind: "choose", prompt: "____ your office near the subway station?", options: ["Is", "Does", "Do"], answer: "Is your office near the subway station?", hint: "A pergunta descreve localização." },
                    { kind: "reorder", prompt: "often / do / how / you / cook / at home / ?", answer: "How often do you cook at home?", hint: "Comece com How often." },
                    { kind: "error", prompt: "She don't check her messages before breakfast.", answer: "She doesn't check her messages before breakfast.", hint: "Observe o sujeito she e o auxiliar." },
                    { kind: "transform", prompt: "Transforme em pergunta: Paula checks the schedule every morning.", answer: "Does Paula check the schedule every morning?", hint: "Use does e mantenha check na forma base." },
                    { kind: "complete", prompt: "The kitchen is small, ____ we share the table carefully.", answer: "so", hint: "então / por isso" }
                ]
            },
            {
                type: "practice",
                title: "Foundation Check: Accuracy and connection",
                intro: "Misture forma e significado para verificar o que já está automático.",
                items: [
                    { kind: "error", prompt: "He usually is tired after the night shift.", answer: "He is usually tired after the night shift.", hint: "Com be, o advérbio aparece depois do verbo." },
                    { kind: "complete", prompt: "I ____ usually available after six.", answer: "am", hint: "estar / ser" },
                    { kind: "choose", prompt: "____ you take the same train every day?", options: ["Do", "Are", "Does"], answer: "Do you take the same train every day?", hint: "Take é o verbo principal." },
                    { kind: "reorder", prompt: "your neighbors / are / at night / usually / home / ?", answer: "Are your neighbors usually home at night?", hint: "Comece com Are." },
                    { kind: "transform", prompt: "Passe para a negativa: Leo works from home on Fridays.", answer: "Leo doesn't work from home on Fridays.", hint: "Use doesn't + verbo base." },
                    { kind: "complete", prompt: "I like the neighborhood, ____ the morning traffic is difficult.", answer: "but", hint: "mas" }
                ]
            },
            {
                type: "reading",
                title: "Two routines, one apartment",
                genre: "Everyday profile",
                paragraphs: [
                    "Elena shares a small apartment with her brother, Victor, but their daily routines are very different. Elena works at a bakery and starts at six in the morning. She usually gets up before five, makes coffee quietly and leaves home while the street is still empty. Victor works for an online store, so he normally begins later. He checks customer messages from home at nine and goes to the office only twice a week.",
                    "Their different schedules used to create small problems. Victor sometimes had late video meetings at the same table where Elena wanted to eat dinner, and Elena's alarm woke him on Saturday mornings. Instead of arguing, they made a simple weekly plan. Victor now uses headphones during evening meetings, and Elena keeps her alarm across the room so she can turn it off quickly.",
                    "The apartment is still small, but the routine works better because both people know what the other person needs. They also have breakfast together every Sunday, when neither of them has to hurry."
                ],
                vocabulary: [
                    ["shares", "divide / compartilha"],
                    ["instead of", "em vez de"],
                    ["arguing", "discutindo"],
                    ["neither", "nenhum dos dois"],
                    ["hurry", "ter pressa"]
                ]
            },
            {
                type: "readingQuestions",
                title: "Reading Check: Two routines",
                questions: [
                    { question: "Why does Elena leave home before the street becomes busy?", answer: "Because she starts work at six in the morning." },
                    { question: "How often does Victor go to the office?", answer: "He goes to the office twice a week." },
                    { question: "Which two problems did their schedules create?", answer: "Victor had late meetings at the dinner table, and Elena's alarm woke him on Saturdays." },
                    { question: "What changes did they make to solve those problems?", answer: "Victor started using headphones, and Elena began keeping her alarm across the room." },
                    { question: "What shows that their new arrangement is successful?", answer: "The routine works better, they understand each other's needs, and they have breakfast together on Sundays." }
                ]
            },
            {
                type: "microReading",
                title: "Read for specific information",
                texts: [
                    { label: "Office notice", text: "Monday: team meeting at 8:30 a.m. Remote staff should join five minutes early. The afternoon training has moved from Room 4 to Room 7." },
                    { label: "Message from Elena", text: "I am leaving the bakery at 2 today. Could you buy some milk on your way home? I can cook dinner if your meeting finishes before seven." },
                    { label: "Victor's reply", text: "No problem. I usually pass the supermarket after work. My meeting ends at 6:30, so I will be home before seven." }
                ],
                questions: [
                    { question: "What time should remote workers join the meeting?", answer: "They should join at 8:25 a.m." },
                    { question: "Where will the afternoon training happen?", answer: "It will happen in Room 7." },
                    { question: "What does Elena ask Victor to buy?", answer: "She asks him to buy some milk." },
                    { question: "Why can Victor be home before seven?", answer: "Because his meeting ends at 6:30 and he passes the supermarket after work." }
                ]
            },
            {
                type: "translation",
                title: "Oral Translation: Everyday routines",
                items: [
                    { pt: "Minha irmã geralmente começa a trabalhar às oito.", en: "My sister usually starts work at eight." },
                    { pt: "Você trabalha de casa às sextas-feiras?", en: "Do you work from home on Fridays?" },
                    { pt: "Ele não pega o ônibus porque o escritório fica perto.", en: "He doesn't take the bus because the office is nearby." },
                    { pt: "Com que frequência seus vizinhos cozinham em casa?", en: "How often do your neighbors cook at home?" },
                    { pt: "Eu gosto da minha rotina, mas as manhãs são corridas.", en: "I like my routine, but the mornings are busy." },
                    { pt: "Nós dividimos a mesa, então precisamos organizar os horários.", en: "We share the table, so we need to organize our schedules." }
                ]
            },
            {
                type: "speaking",
                title: "Speaking Round 1: Everyday interview",
                label: "Guided interaction",
                scenario: "O professor entrevista o aluno sobre uma rotina real. Depois de cada resposta, faz uma pergunta de continuação.",
                languageBank: ["I usually...", "It depends on...", "because...", "but on weekends...", "How often do you...?"],
                rounds: [
                    { title: "Morning", prompt: "What do you usually do during the first hour of your day?", followUps: ["What time does that normally happen?", "Why does this routine work for you?"], model: "I usually get up at seven and make breakfast before I check my messages. This works for me because I prefer a calm start." },
                    { title: "Responsibilities", prompt: "Which task do you always have to do during the week?", followUps: ["Who else helps with it?", "What happens when your routine changes?"], model: "I always have to organize my work schedule on Monday. My coworker helps me when there is an unexpected meeting." },
                    { title: "Ask back", prompt: "Faça duas perguntas ao professor sobre a rotina dele.", followUps: ["Use do/does or be correctly.", "Ask one How often question."], model: "Do you usually work in the evening? How often are you free on Friday afternoon?" }
                ],
                teacherFocus: ["Question formation", "Third-person -s", "Connected answers", "Follow-up questions"]
            },
            {
                type: "speaking",
                title: "Speaking Round 2: Compare two schedules",
                label: "Information-based speaking",
                scenario: "Compare os dois perfis e explique qual rotina parece mais prática. A resposta deve usar because, but e so.",
                languageBank: ["earlier than", "more flexible", "both", "while", "for that reason"],
                rounds: [
                    { title: "Profile A", prompt: "Rosa: starts at 7 a.m.; works at a clinic; finishes at 3 p.m.; studies twice a week.", followUps: ["Mention one advantage.", "Mention one possible difficulty."], model: "Rosa starts early, so she finishes in the afternoon. Her routine is useful for studying, but mornings may be tiring." },
                    { title: "Profile B", prompt: "Kenji: starts at 10 a.m.; works remotely; finishes at 7 p.m.; cooks every evening.", followUps: ["Compare his schedule with Rosa's.", "Say which one is more flexible."], model: "Kenji starts later than Rosa and works from home, so his mornings are more flexible. However, he finishes much later." },
                    { title: "Decision", prompt: "Which schedule would be easier for a person who takes an evening course? Give two reasons.", followUps: ["Use one comparison.", "Finish with a clear choice."], model: "Rosa's schedule would be easier because she finishes earlier and has time before class. Kenji's routine is more flexible in the morning, but it ends too late." }
                ],
                teacherFocus: ["Comparing information", "Giving reasons", "Maintaining a 45-second answer"]
            },
            {
                type: "assessment",
                title: "Baseline Snapshot",
                intro: "Registre o ponto de partida. A mesma escala será usada novamente na lição 10.",
                criteria: [
                    { name: "Accuracy", descriptor: "Controla be, do/does e terceira pessoa em frases frequentes." },
                    { name: "Range", descriptor: "Usa vocabulário suficiente para rotina, horários e responsabilidades." },
                    { name: "Fluency", descriptor: "Consegue continuar por 30–45 segundos com pausas administráveis." },
                    { name: "Interaction", descriptor: "Responde e faz ao menos uma pergunta de continuação." },
                    { name: "Coherence", descriptor: "Conecta ideias com because, but e so." }
                ]
            },
            {
                type: "homework",
                title: "Homework: Prepare a fuller everyday answer",
                deliverable: "Escolha um tema e prepare oito frases conectadas e três perguntas para usar oralmente na próxima aula.",
                options: [
                    { title: "A busy weekday", prompt: "Descreva manhã, tarde e noite, incluindo horários e duas responsabilidades." },
                    { title: "A shared home", prompt: "Explique como duas pessoas dividem tarefas, espaços ou horários." },
                    { title: "A better routine", prompt: "Compare sua rotina atual com uma rotina mais prática e explique duas mudanças." }
                ],
                checklist: ["Use três advérbios de frequência.", "Inclua because, but e so.", "Prepare três perguntas corretas."]
            }
        ]
    },
    {
        number: 2,
        unit: "Narrative Skills",
        title: "Telling Clear Past Stories",
        objective: "Revisar os tempos narrativos do A2 e organizar acontecimentos passados com começo, problema e resultado.",
        focus: "Past Simple, Past Continuous, when, while and sequence markers",
        cefr: "A2+ narrative control",
        slides: [
            {
                type: "opening",
                title: "Telling Clear Past Stories",
                objectives: [
                    "Diferenciar ações concluídas e ações em progresso no passado.",
                    "Usar did com o verbo principal na forma base.",
                    "Organizar histórias com marcadores de sequência.",
                    "Responder perguntas sobre detalhes de um acontecimento."
                ],
                dialogue: {
                    title: "A sudden change of plan",
                    lines: [
                        ["Priya", "You look tired. What happened on your way home?"],
                        ["Alex", "I was walking to the bus stop when it started raining."],
                        ["Priya", "Didn't you have an umbrella?"],
                        ["Alex", "I did, but I left it at the cafe."],
                        ["Priya", "So what did you do?"],
                        ["Alex", "I ran into a bookstore and waited there for twenty minutes."],
                        ["Priya", "Did the rain stop?"],
                        ["Alex", "Yes, and the store owner helped me call the cafe about my umbrella."]
                    ]
                }
            },
            {
                type: "languageBank",
                title: "Story-building language",
                intro: "Use estes blocos para tornar a ordem dos acontecimentos clara.",
                items: [
                    { term: "At first", meaning: "no começo", example: "At first, I thought the bag was at home." },
                    { term: "While", meaning: "enquanto", example: "While I was waiting, the driver called." },
                    { term: "Suddenly", meaning: "de repente", example: "Suddenly, the bus doors closed." },
                    { term: "A few minutes later", meaning: "alguns minutos depois", example: "A few minutes later, I received a message." },
                    { term: "In the end", meaning: "no fim", example: "In the end, I got everything back." },
                    { term: "It turned out that", meaning: "acabou que", example: "It turned out that another passenger found it." }
                ]
            },
            {
                type: "grammar",
                title: "Past actions: background and main events",
                intro: "Escolha o tempo verbal de acordo com a função da ação na história.",
                tables: [
                    {
                        title: "Narrative contrast",
                        headers: ["Function", "Form", "Example"],
                        rows: [
                            ["Ação concluída", "Past Simple", "The driver called me."],
                            ["Cena em progresso", "was/were + verb-ing", "I was waiting at the terminal."],
                            ["Interrupção", "Past Continuous + when + Past Simple", "I was leaving when my phone rang."],
                            ["Duas ações simultâneas", "while + Past Continuous", "While I was talking, the driver was checking the seats."]
                        ]
                    },
                    {
                        title: "Questions and negatives",
                        headers: ["Type", "Pattern", "Example"],
                        rows: [
                            ["Past Simple question", "Did + subject + base verb", "Did you see the bag?"],
                            ["Past Simple negative", "didn't + base verb", "I didn't notice it."],
                            ["Past Continuous question", "Was/Were + subject + verb-ing", "Were you carrying anything else?"],
                            ["Past Continuous negative", "wasn't/weren't + verb-ing", "The driver wasn't using the bus."]
                        ]
                    }
                ],
                notes: [
                    "Evite Did you saw? O auxiliar did já marca o passado.",
                    "Use marcadores temporais para ajudar o ouvinte a acompanhar a história."
                ]
            },
            {
                type: "practice",
                title: "Story Mechanics: Choose the right past",
                intro: "Observe se a ação cria a cena ou move a história para frente.",
                items: [
                    { kind: "complete", prompt: "I ____ for the bus when I noticed my backpack was missing.", answer: "was waiting", hint: "estava esperando" },
                    { kind: "complete", prompt: "The driver ____ me ten minutes later.", answer: "called", hint: "ligar" },
                    { kind: "choose", prompt: "While Rosa ____ to the attendant, her friend checked the platform.", options: ["was talking", "talked", "did talk"], answer: "While Rosa was talking to the attendant, her friend checked the platform.", hint: "A conversa estava em progresso." },
                    { kind: "error", prompt: "Did the driver found the backpack?", answer: "Did the driver find the backpack?", hint: "Depois de did, use o verbo base." },
                    { kind: "reorder", prompt: "when / the lights / we / went out / were eating / dinner", answer: "We were eating dinner when the lights went out.", hint: "A refeição cria o cenário." },
                    { kind: "transform", prompt: "Passe para a negativa: The passengers were paying attention.", answer: "The passengers weren't paying attention.", hint: "Use weren't + verbo com -ing." },
                    { kind: "complete", prompt: "____ I was looking under the seat, my phone rang.", answer: "While", hint: "enquanto" }
                ]
            },
            {
                type: "practice",
                title: "Story Mechanics: Order and repair",
                intro: "Construa uma sequência coerente sem trocar o sentido dos acontecimentos.",
                items: [
                    { kind: "timeline", prompt: "Ordene: the terminal called / I got off the bus / I noticed the bag was gone / I returned to collect it", answer: "I got off the bus → I noticed the bag was gone → the terminal called → I returned to collect it.", hint: "Comece pela saída do ônibus." },
                    { kind: "complete", prompt: "____, I checked the seat. Then I called the terminal.", answer: "First", hint: "primeiro" },
                    { kind: "error", prompt: "While I waited outside, the rain was starting.", answer: "While I was waiting outside, the rain started.", hint: "A ação longa usa Past Continuous; o evento curto usa Past Simple." },
                    { kind: "transform", prompt: "Una as frases com when: I was crossing the street. I heard my name.", answer: "I was crossing the street when I heard my name.", hint: "When introduz o evento curto." },
                    { kind: "choose", prompt: "Qual marcador apresenta o resultado final?", options: ["In the end", "At first", "Meanwhile"], answer: "In the end", hint: "Pense no encerramento da história." },
                    { kind: "reorder", prompt: "did / what / after that / you / do / ?", answer: "What did you do after that?", hint: "Comece com What did." },
                    { kind: "complete", prompt: "It ____ out that another passenger had my bag.", answer: "turned", hint: "acabou sendo" }
                ]
            },
            {
                type: "reading",
                title: "The backpack on Route 46",
                genre: "Short narrative",
                paragraphs: [
                    "On Tuesday evening, Hana was travelling home on Route 46 after a long day at work. The bus was crowded, so she put her backpack under the seat and held her shopping bag on her lap. While she was answering a message, the bus reached her stop. Hana got off quickly because the doors were already closing.",
                    "She was walking toward her building when she realized that she was carrying only the shopping bag. Her laptop, house keys and work notebook were all inside the backpack. At first, she tried to run after the bus, but it was already around the corner. She called the transport office and gave the attendant the bus number, the time and a description of the bag.",
                    "Meanwhile, the driver was checking the seats at the final stop. He found the backpack and took it to the terminal office. Twenty minutes later, the attendant called Hana. She borrowed a spare key from her neighbor and went to the terminal by taxi. In the end, nothing was missing. Hana thanked the driver and decided to keep important items in a smaller bag from then on."
                ],
                vocabulary: [
                    ["crowded", "lotado"],
                    ["reached", "chegou a"],
                    ["realized", "percebeu"],
                    ["meanwhile", "enquanto isso"],
                    ["spare key", "chave reserva"]
                ]
            },
            {
                type: "readingQuestions",
                title: "Reading Check: The lost backpack",
                questions: [
                    { question: "Why did Hana leave the bus so quickly?", answer: "Because the doors were already closing when the bus reached her stop." },
                    { question: "Which important items were inside the backpack?", answer: "Her laptop, house keys and work notebook were inside it." },
                    { question: "What information did Hana give the transport office?", answer: "She gave the bus number, the time and a description of the bag." },
                    { question: "Where did the driver find the backpack?", answer: "He found it under a seat while checking the bus at the final stop." },
                    { question: "What decision did Hana make after recovering her things?", answer: "She decided to keep important items in a smaller bag." }
                ]
            },
            {
                type: "teacherListening",
                title: "Teacher Listening: A witness at the station",
                setup: "O professor lê o relato duas vezes. Na primeira, o aluno identifica o problema. Na segunda, anota a sequência.",
                script: "I was buying a ticket when I heard a loud noise near Platform 3. A suitcase fell from a luggage cart, and some clothes landed on the floor. Two passengers were helping the owner while a station employee was moving the cart away from the entrance. Nobody was hurt. A few minutes later, the owner closed the suitcase, thanked everyone and boarded the train.",
                questions: [
                    { question: "What was the speaker doing when the noise happened?", answer: "The speaker was buying a ticket." },
                    { question: "What caused the noise?", answer: "A suitcase fell from a luggage cart." },
                    { question: "Who helped the owner?", answer: "Two passengers helped the owner." },
                    { question: "Did anyone get hurt?", answer: "No, nobody was hurt." }
                ]
            },
            {
                type: "microReading",
                title: "Timeline and message check",
                texts: [
                    { label: "Terminal log", text: "18:12 — Passenger called about a grey backpack. 18:19 — Driver arrived at the terminal. 18:22 — Bag delivered to the service desk. 18:37 — Passenger collected the bag." },
                    { label: "Message to a neighbor", text: "Hi, Samira. I left my keys on the bus, but the driver found my backpack. Could I borrow the spare key until I get back from the terminal?" }
                ],
                questions: [
                    { question: "How many minutes passed between the first call and the driver arriving?", answer: "Seven minutes passed." },
                    { question: "Where was the backpack at 18:22?", answer: "It was at the service desk." },
                    { question: "Why does the passenger need the spare key?", answer: "Because the house keys are inside the backpack at the terminal." },
                    { question: "Which event happened last?", answer: "The passenger collected the bag at 18:37." }
                ]
            },
            {
                type: "translation",
                title: "Oral Translation: Past events",
                items: [
                    { pt: "Eu estava esperando o ônibus quando meu telefone tocou.", en: "I was waiting for the bus when my phone rang." },
                    { pt: "Ela não percebeu que a mochila estava debaixo do banco.", en: "She didn't notice that the backpack was under the seat." },
                    { pt: "O motorista encontrou a mala no ponto final.", en: "The driver found the suitcase at the final stop." },
                    { pt: "O que você fez depois disso?", en: "What did you do after that?" },
                    { pt: "Enquanto eles ajudavam o passageiro, o funcionário afastou o carrinho.", en: "While they were helping the passenger, the employee moved the cart away." },
                    { pt: "No fim, nada estava faltando.", en: "In the end, nothing was missing." },
                    { pt: "Acabou que outra pessoa encontrou minhas chaves.", en: "It turned out that another person found my keys." }
                ]
            },
            {
                type: "speaking",
                title: "Speaking Round 1: Rebuild the story",
                label: "Guided retelling",
                scenario: "Conte a história a partir dos acontecimentos. O professor pode interromper apenas para pedir um detalhe de tempo, lugar ou causa.",
                languageBank: ["At first", "while", "when", "a few minutes later", "in the end"],
                rounds: [
                    { title: "Scene", prompt: "6:10 p.m. — crowded bus — backpack under the seat — passenger answering a message", followUps: ["What was happening around the passenger?", "Where was the bag?"], model: "At 6:10, the passenger was travelling on a crowded bus. While she was answering a message, her backpack was under the seat." },
                    { title: "Problem", prompt: "bus doors closing — passenger gets off — notices the missing bag", followUps: ["Why did she get off quickly?", "When did she notice the problem?"], model: "She got off quickly because the doors were closing. She was walking home when she noticed that the bag was missing." },
                    { title: "Result", prompt: "calls terminal — driver finds bag — passenger collects it", followUps: ["How was the problem solved?", "What could the passenger do differently next time?"], model: "She called the terminal, and the driver found the bag. In the end, she collected it and decided to keep her keys in a smaller bag." }
                ],
                teacherFocus: ["Past tense choice", "Sequence markers", "Clear beginning and ending"]
            },
            {
                type: "speaking",
                title: "Speaking Round 2: Witness interview",
                label: "Role-play",
                scenario: "O aluno é uma testemunha na estação. O professor faz as perguntas do funcionário responsável pelo relatório.",
                languageBank: ["I was... when...", "I saw...", "Then...", "I am not sure, but...", "Nobody was..."],
                rounds: [
                    { title: "What you noticed", prompt: "Explain where you were and what you heard.", followUps: ["What time was it?", "What were the other passengers doing?"], model: "I was near Platform 3 when I heard a loud noise. Some passengers were walking toward the train, and two people stopped to help." },
                    { title: "What happened next", prompt: "Describe the actions of the owner, passengers and employee.", followUps: ["Who moved the cart?", "How did the owner react?"], model: "Two passengers picked up the clothes while an employee moved the cart. The owner looked embarrassed but thanked everyone." },
                    { title: "Confirm details", prompt: "Answer one question even if you are not completely sure.", followUps: ["Use I think or I am not sure, but...", "Do not invent an exact fact."], model: "I am not sure, but I think the suitcase fell when the cart turned near the entrance." }
                ],
                teacherFocus: ["Answering follow-up questions", "Repair language", "Narrative fluency"]
            },
            {
                type: "homework",
                title: "Homework: Prepare a short past story",
                deliverable: "Escolha um tema e prepare uma sequência de oito a dez frases para contar oralmente, sem gravar.",
                options: [
                    { title: "A forgotten object", prompt: "Conte onde você estava, quando percebeu o problema e como ele terminou." },
                    { title: "An unexpected delay", prompt: "Descreva o que estava acontecendo quando o atraso começou e o que você fez." },
                    { title: "A helpful stranger", prompt: "Conte uma situação em que alguém ajudou a resolver um problema cotidiano." }
                ],
                checklist: ["Use Past Simple e Past Continuous.", "Inclua quatro marcadores de sequência.", "Prepare respostas para when, where, why e what happened next."]
            }
        ]
    },
    {
        number: 3,
        unit: "Time and Experience",
        title: "Experiences and Life Changes",
        objective: "Consolidar Present Perfect e Past Simple para falar de experiências e acrescentar detalhes concluídos.",
        focus: "Present Perfect, Past Simple, ever, never, already, yet, been and gone",
        cefr: "A2+ experience exchange",
        slides: [
            {
                type: "opening",
                title: "Experiences and Life Changes",
                objectives: [
                    "Apresentar experiências sem mencionar um momento concluído.",
                    "Acrescentar detalhes específicos usando Past Simple.",
                    "Usar ever, never, already e yet com precisão.",
                    "Diferenciar been e gone em situações cotidianas."
                ],
                dialogue: {
                    title: "Lunch near the new restaurant",
                    lines: [
                        ["Lena", "Have you tried the new Thai restaurant yet?"],
                        ["Omar", "Yes, I have been there twice."],
                        ["Lena", "Really? When did you go?"],
                        ["Omar", "I went last Saturday with my cousins."],
                        ["Lena", "Have they tried Thai food before?"],
                        ["Omar", "One cousin has, but the other hasn't tried it yet."],
                        ["Lena", "Is the restaurant open now?"],
                        ["Omar", "Yes, but Mia has gone there to collect our order, so she will be back soon."]
                    ]
                }
            },
            {
                type: "grammar",
                title: "Experience first, details second",
                intro: "Present Perfect abre o assunto; Past Simple localiza e desenvolve o acontecimento.",
                tables: [
                    {
                        title: "Choose the time frame",
                        headers: ["Meaning", "Form", "Example"],
                        rows: [
                            ["Experiência sem tempo concluído", "have/has + participle", "I have tried Thai food."],
                            ["Detalhe em tempo concluído", "Past Simple", "I tried it last Saturday."],
                            ["Pergunta sobre experiência", "Have you ever + participle?", "Have you ever cooked curry?"],
                            ["Pergunta sobre o detalhe", "When/Where did + base verb?", "Where did you learn?" ]
                        ]
                    },
                    {
                        title: "Markers and movement",
                        headers: ["Word", "Use", "Example"],
                        rows: [
                            ["already", "Aconteceu antes do esperado", "She has already ordered."],
                            ["yet", "Perguntas e negativas, normalmente no fim", "Have they arrived yet?"],
                            ["been", "Foi e voltou", "Leo has been to the market."],
                            ["gone", "Foi e ainda está lá", "Leo has gone to the market."]
                        ]
                    }
                ],
                notes: [
                    "Não use Present Perfect com yesterday, last week ou in 2023.",
                    "Depois de uma resposta com have/has, faça uma pergunta em Past Simple para obter detalhes."
                ]
            },
            {
                type: "practice",
                title: "Experience Check: Form and markers",
                intro: "Escolha a forma que combina com o marcador e com a situação.",
                items: [
                    { kind: "complete", prompt: "Have you ever ____ a cooking class?", answer: "taken", hint: "feito / participado de" },
                    { kind: "complete", prompt: "I ____ my first class last month.", answer: "took", hint: "fiz / participei de" },
                    { kind: "choose", prompt: "Nora has ____ finished the online registration.", options: ["already", "yet", "last night"], answer: "Nora has already finished the online registration.", hint: "A ação terminou antes do esperado." },
                    { kind: "error", prompt: "I have visited that museum yesterday.", answer: "I visited that museum yesterday.", hint: "Yesterday exige Past Simple." },
                    { kind: "transform", prompt: "Faça uma pergunta sobre experiência: you / travel alone", answer: "Have you ever travelled alone?", hint: "Use Have you ever + particípio." },
                    { kind: "complete", prompt: "We haven't received the confirmation ____.", answer: "yet", hint: "ainda" },
                    { kind: "choose", prompt: "Mina isn't here. She has ____ to the pharmacy.", options: ["gone", "been", "went"], answer: "Mina has gone to the pharmacy.", hint: "Ela ainda está lá." }
                ]
            },
            {
                type: "practice",
                title: "Experience Check: Follow-up details",
                intro: "Passe da experiência geral para uma conversa com detalhes.",
                items: [
                    { kind: "transform", prompt: "Crie a pergunta de detalhe: Yes, I have tried kayaking.", answer: "When did you try kayaking? / Where did you try kayaking?", hint: "Pergunte quando ou onde usando did." },
                    { kind: "reorder", prompt: "you / how many times / have / used / this app / ?", answer: "How many times have you used this app?", hint: "How many times vem no início." },
                    { kind: "error", prompt: "Did you ever been to a food festival?", answer: "Have you ever been to a food festival?", hint: "Experiência sem tempo usa Have you ever." },
                    { kind: "complete", prompt: "My parents have ____ to Chile three times, and they always come back with new recipes.", answer: "been", hint: "foram e voltaram" },
                    { kind: "choose", prompt: "Which sentence refers to a finished trip in 2024?", options: ["I travelled to Recife in 2024.", "I have travelled to Recife in 2024.", "I have gone to Recife in 2024."], answer: "I travelled to Recife in 2024.", hint: "O ano está concluído." },
                    { kind: "complete", prompt: "She ____ never cooked for a large group.", answer: "has", hint: "ter" },
                    { kind: "transform", prompt: "Complete a troca: Have you ever worked at an event? — Yes, ____. I ____ at a book fair last year.", answer: "Yes, I have. I worked at a book fair last year.", hint: "Primeiro experiência; depois detalhe concluído." }
                ]
            },
            {
                type: "reading",
                title: "A community kitchen with a second purpose",
                genre: "Community feature",
                paragraphs: [
                    "The Riverside Community Kitchen has offered affordable cooking classes for three years. More than four hundred people have taken part, but the project is not only about recipes. It also helps new residents meet their neighbors and practise English in a relaxed environment. The organizers have already created classes for beginners, families and older adults, and they have recently added a Saturday international food workshop.",
                    "Sofia joined the project six months ago after moving to the area for work. It was her first time cooking for other people, so her first class felt difficult. During that session, she prepared vegetable soup with a group of five. The soup was too salty, but everyone laughed and ate it anyway. Since then, Sofia has attended eight classes and has become one of the volunteer assistants.",
                    "Last weekend, she helped a new group prepare food for a neighborhood event. She explained the recipe, organized the ingredients and answered questions. The project has not turned Sofia into a professional chef, but it has changed how connected she feels to the community."
                ],
                vocabulary: [
                    ["affordable", "acessível"],
                    ["residents", "moradores"],
                    ["relaxed", "descontraído"],
                    ["salty", "salgado"],
                    ["connected", "integrada / conectada"]
                ]
            },
            {
                type: "readingQuestions",
                title: "Reading Check: Community Kitchen",
                questions: [
                    { question: "Besides teaching recipes, what two purposes does the kitchen serve?", answer: "It helps new residents meet neighbors and practise English." },
                    { question: "Why was Sofia's first class challenging?", answer: "Because it was her first time cooking for other people." },
                    { question: "What went wrong with the soup?", answer: "It was too salty." },
                    { question: "How has Sofia's role changed since her first class?", answer: "She has attended eight classes and become a volunteer assistant." },
                    { question: "What effect has the project had on Sofia outside the kitchen?", answer: "It has made her feel more connected to the community." }
                ]
            },
            {
                type: "microReading",
                title: "Updates, posts and completed actions",
                texts: [
                    { label: "Workshop update", text: "We have already filled the morning group, but there are still four places in the afternoon session. Participants have not received the ingredient list yet. We will send it on Thursday." },
                    { label: "Sofia's post", text: "I have volunteered at Riverside since January. Last Saturday, I helped twelve people prepare lunch, and I learned a faster way to organize the tables." },
                    { label: "Message", text: "Has Ravi gone home? No. He has gone to the supermarket for more rice. He has been there for about fifteen minutes." }
                ],
                questions: [
                    { question: "Which workshop group is full?", answer: "The morning group is full." },
                    { question: "What information have participants not received?", answer: "They have not received the ingredient list." },
                    { question: "What did Sofia learn last Saturday?", answer: "She learned a faster way to organize the tables." },
                    { question: "Where is Ravi now, and why?", answer: "He is at the supermarket because he went to buy more rice." }
                ]
            },
            {
                type: "translation",
                title: "Oral Translation: Experience and detail",
                items: [
                    { pt: "Você já participou de uma aula de culinária?", en: "Have you ever taken a cooking class?" },
                    { pt: "Eu participei da minha primeira aula no mês passado.", en: "I took my first class last month." },
                    { pt: "Ela já terminou a inscrição.", en: "She has already finished the registration." },
                    { pt: "Nós ainda não recebemos a lista de ingredientes.", en: "We haven't received the ingredient list yet." },
                    { pt: "Meus pais foram ao Chile três vezes.", en: "My parents have been to Chile three times." },
                    { pt: "Ravi foi ao supermercado e ainda não voltou.", en: "Ravi has gone to the supermarket and hasn't come back yet." },
                    { pt: "Quando você visitou esse lugar?", en: "When did you visit that place?" }
                ]
            },
            {
                type: "speaking",
                title: "Speaking Round 1: Experience interview",
                label: "Question chain",
                scenario: "O aluno responde sobre uma experiência e o professor sempre pede um detalhe em Past Simple. Depois, o aluno faz uma pergunta equivalente.",
                languageBank: ["Have you ever...?", "Yes, I have. / No, I haven't.", "When did...?", "What happened?", "How did you feel?"],
                rounds: [
                    { title: "Food or event", prompt: "Have you ever tried an unfamiliar dish or attended a community event?", followUps: ["When did it happen?", "Who was with you?", "What was memorable?"], model: "Yes, I have. I tried Korean food at a festival last year. I went with two friends, and the busiest food stand was also the best one." },
                    { title: "Practical skill", prompt: "Have you ever learned a useful skill outside school?", followUps: ["Where did you learn it?", "Have you used it recently?"], model: "Yes, I have learned basic home repairs. My uncle showed me how to fix a shelf two years ago, and I have used that skill several times." },
                    { title: "Reverse interview", prompt: "Faça ao professor uma pergunta com Have you ever e duas perguntas de detalhe.", followUps: ["Listen to the first answer before choosing the next question.", "Use Past Simple for the details."], model: "Have you ever worked at a public event? When did you do it? What was your responsibility?" }
                ],
                teacherFocus: ["Present Perfect opening", "Past Simple follow-up", "Listening before asking"]
            },
            {
                type: "speaking",
                title: "Speaking Round 2: Before, event and result",
                label: "Connected mini-talk",
                scenario: "Escolha um dos cartões e fale por aproximadamente um minuto, conectando situação anterior, acontecimento específico e resultado atual.",
                languageBank: ["Before that...", "Then, in...", "Since then...", "I have already...", "I haven't... yet"],
                rounds: [
                    { title: "A new responsibility", prompt: "A task you did for the first time and can now do more confidently.", followUps: ["Mention when the first attempt happened.", "Explain what has changed since then."], model: "I organized a large meeting for the first time last August, and it was stressful. Since then, I have planned three more meetings and have become much more confident." },
                    { title: "A place", prompt: "A place you have visited more than once and one specific visit you remember.", followUps: ["Use been correctly.", "Add one finished-time detail."], model: "I have been to Curitiba several times. I went there for a conference in 2024, and that visit helped me meet people from my field." },
                    { title: "An unfinished goal", prompt: "Something you have already started but have not completed yet.", followUps: ["Say when you started.", "Explain the next step."], model: "I have already started reorganizing my home office, but I haven't finished it yet. I bought a new desk last week, and the next step is adding better lighting." }
                ],
                teacherFocus: ["Time-frame switching", "Connected sequence", "Accurate markers"]
            },
            {
                type: "homework",
                title: "Homework: Build an experience timeline",
                deliverable: "Escolha um tema e prepare uma fala de um minuto com Present Perfect para abrir e Past Simple para desenvolver.",
                options: [
                    { title: "A useful skill", prompt: "Apresente a experiência, conte quando começou e explique como ela ajuda hoje." },
                    { title: "A memorable place", prompt: "Diga quantas vezes foi, descreva uma visita específica e explique por que lembra dela." },
                    { title: "An unfinished project", prompt: "Explique o que já fez, o que ainda não terminou e qual será o próximo passo." }
                ],
                checklist: ["Use ever/never ou already/yet.", "Inclua dois detalhes em Past Simple.", "Prepare duas perguntas de continuação."]
            }
        ]
    },
    {
        number: 4,
        unit: "Future Decisions",
        title: "Plans, Predictions and Backup Plans",
        objective: "Integrar as formas de futuro do A2 e usar condições reais para negociar planos e reagir a mudanças.",
        focus: "Going to, Present Continuous, will and First Conditional",
        cefr: "A2+ planning and problem-solving",
        slides: [
            {
                type: "opening",
                title: "Plans, Predictions and Backup Plans",
                objectives: [
                    "Diferenciar intenção, compromisso marcado e decisão imediata.",
                    "Fazer previsões com will e evidências com going to.",
                    "Usar First Conditional para consequências possíveis.",
                    "Negociar horários e criar um plano alternativo."
                ],
                dialogue: {
                    title: "Plans for the outdoor market",
                    lines: [
                        ["Tariq", "Are we still meeting at the outdoor market on Saturday?"],
                        ["June", "Yes. I am meeting you at the north entrance at ten."],
                        ["Tariq", "The forecast says there will be heavy rain after lunch."],
                        ["June", "Then we are going to visit the indoor stalls first."],
                        ["Tariq", "What will we do if the weather gets worse early?"],
                        ["June", "If it starts before ten, I will message you and we can meet at the cafe across the street."],
                        ["Tariq", "Good plan. I will check the forecast before I leave."],
                        ["June", "Perfect. That way we won't waste the morning."]
                    ]
                }
            },
            {
                type: "languageBank",
                title: "Useful language for changing plans",
                intro: "Estas expressões ajudam a manter a conversa prática quando o plano muda.",
                items: [
                    { term: "Are we still...?", meaning: "o plano continua?", example: "Are we still meeting at ten?" },
                    { term: "That works for me", meaning: "esse horário serve", example: "Saturday afternoon? That works for me." },
                    { term: "What if...?", meaning: "e se...?", example: "What if the train is delayed?" },
                    { term: "backup plan", meaning: "plano alternativo", example: "The cafe is our backup plan." },
                    { term: "instead", meaning: "em vez disso", example: "We can meet online instead." },
                    { term: "I'll let you know", meaning: "eu aviso", example: "I'll let you know if anything changes." }
                ]
            },
            {
                type: "grammar",
                title: "Four future jobs, four useful choices",
                intro: "Não escolha o futuro pela tradução de vou; escolha pela intenção comunicativa.",
                tables: [
                    {
                        title: "Future forms",
                        headers: ["Meaning", "Form", "Example"],
                        rows: [
                            ["Intenção ou plano", "be going to + base verb", "We are going to visit the stalls."],
                            ["Compromisso combinado", "Present Continuous", "I am meeting June at ten."],
                            ["Previsão/opinião", "will + base verb", "It will probably rain."],
                            ["Decisão no momento", "will + base verb", "I'll check the forecast now."]
                        ]
                    },
                    {
                        title: "Real future condition",
                        headers: ["Part", "Form", "Example"],
                        rows: [
                            ["Condition", "if + Present Simple", "If it rains..."],
                            ["Result", "will + base verb", "...we will meet inside."],
                            ["Reverse order", "result + if + condition", "We will meet inside if it rains."],
                            ["Important", "No will after if", "If it rains, not If it will rain"]
                        ]
                    }
                ],
                notes: [
                    "Going to também pode indicar previsão baseada em evidência: Look at those clouds. It is going to rain.",
                    "Use Present Continuous quando horário, pessoa ou lugar já estiverem combinados."
                ]
            },
            {
                type: "practice",
                title: "Future Control: Plans and arrangements",
                intro: "Identifique se há intenção, compromisso ou decisão imediata.",
                items: [
                    { kind: "complete", prompt: "We ____ at the station at 8:15 tomorrow.", answer: "are meeting", hint: "vamos nos encontrar" },
                    { kind: "complete", prompt: "I am going to ____ the hotel after class.", answer: "book", hint: "reservar" },
                    { kind: "choose", prompt: "The phone is ringing. Which response is natural?", options: ["I'll answer it.", "I'm answering it tomorrow.", "I going to answer it."], answer: "I'll answer it.", hint: "É uma decisão tomada agora." },
                    { kind: "error", prompt: "She is going meet the organizer tonight.", answer: "She is going to meet the organizer tonight.", hint: "Going to precisa de to antes do verbo." },
                    { kind: "transform", prompt: "Transforme em compromisso marcado: We plan to see the manager at 3 p.m.", answer: "We are seeing the manager at 3 p.m.", hint: "Use Present Continuous." },
                    { kind: "reorder", prompt: "doing / what / are / after the workshop / you / ?", answer: "What are you doing after the workshop?", hint: "Use Present Continuous para o compromisso." },
                    { kind: "choose", prompt: "Look at that dark sky. It ____ rain soon.", options: ["is going to", "is raining next month", "does"], answer: "It is going to rain soon.", hint: "Há uma evidência visível." }
                ]
            },
            {
                type: "practice",
                title: "Future Control: Conditions and backup plans",
                intro: "Conecte cada condição a uma consequência realista.",
                items: [
                    { kind: "complete", prompt: "If the market closes early, we ____ to the indoor food hall.", answer: "will go", hint: "iremos" },
                    { kind: "error", prompt: "If the bus will be late, I will take the subway.", answer: "If the bus is late, I will take the subway.", hint: "Depois de if, use Present Simple." },
                    { kind: "transform", prompt: "Una com if: The rain starts. We move the event inside.", answer: "If the rain starts, we will move the event inside.", hint: "Condição no presente, resultado com will." },
                    { kind: "choose", prompt: "Which sentence is a prediction, not an arrangement?", options: ["The event will be crowded.", "We are meeting at Gate 2.", "I am having lunch with Bea at noon."], answer: "The event will be crowded.", hint: "Não há horário combinado com outra pessoa." },
                    { kind: "complete", prompt: "I will let you know if the schedule ____.", answer: "changes", hint: "mudar" },
                    { kind: "reorder", prompt: "what / do / will / if / you / the train is cancelled / ?", answer: "What will you do if the train is cancelled?", hint: "Will aparece na pergunta principal." },
                    { kind: "transform", prompt: "Responda com uma decisão imediata: We don't have enough chairs.", answer: "I'll bring two more chairs. / I will get more chairs.", hint: "Use I'll + verbo base." }
                ]
            },
            {
                type: "reading",
                title: "A market day with two plans",
                genre: "Event planning story",
                paragraphs: [
                    "The Hill Street Market is holding its spring event this Saturday. More than thirty local sellers are bringing food, books and handmade products. The organizers are opening the gates at nine, and a small band is performing at eleven. However, the weather forecast has created a problem: light rain is expected in the morning, and stronger wind may arrive after two.",
                    "The team has already prepared a backup plan. If the rain stays light, the outdoor stalls will open normally, but sellers will use waterproof covers. If the wind becomes strong, the book and craft sellers will move into the community hall. The food trucks will remain outside because there is not enough space for them indoors.",
                    "Camila is meeting two friends at the market at ten. They are going to buy lunch and watch the band, but they have agreed to check the event page before leaving home. If the concert moves inside, they will enter through the side door near the library. Camila thinks the event will still be enjoyable because the organizers have communicated the changes clearly."
                ],
                vocabulary: [
                    ["handmade", "feito à mão"],
                    ["expected", "previsto"],
                    ["waterproof covers", "coberturas impermeáveis"],
                    ["remain", "permanecer"],
                    ["side door", "porta lateral"]
                ]
            },
            {
                type: "readingQuestions",
                title: "Reading Check: Market plans",
                questions: [
                    { question: "Which two weather conditions may affect the event?", answer: "Light rain in the morning and stronger wind after two may affect it." },
                    { question: "What will happen if the rain remains light?", answer: "The outdoor stalls will open normally with waterproof covers." },
                    { question: "Why will the food trucks stay outside?", answer: "Because there is not enough space for them inside the community hall." },
                    { question: "What are Camila and her friends going to do before leaving home?", answer: "They are going to check the event page." },
                    { question: "Why does Camila remain positive about the event?", answer: "Because the organizers have communicated the possible changes clearly." }
                ]
            },
            {
                type: "microReading",
                title: "Calendar, alert and group chat",
                texts: [
                    { label: "Calendar", text: "Saturday 9:00 — gates open. 10:00 — Camila meets friends at north entrance. 11:00 — live band. 14:00 — weather review by organizers." },
                    { label: "Weather alert", text: "Wind speeds may increase between 1 p.m. and 4 p.m. Outdoor structures should be secured before noon." },
                    { label: "Group chat", text: "Camila: The north entrance will close if the stalls move inside. Let's use the library entrance instead. Jo: That works. I'll bring an umbrella and message Luis." }
                ],
                questions: [
                    { question: "How long after the gates open are the friends meeting?", answer: "They are meeting one hour after the gates open." },
                    { question: "What must happen before noon according to the alert?", answer: "Outdoor structures must be secured before noon." },
                    { question: "Which entrance is the backup meeting point?", answer: "The library entrance is the backup meeting point." },
                    { question: "What immediate decision does Jo make?", answer: "Jo decides to bring an umbrella and message Luis." }
                ]
            },
            {
                type: "teacherListening",
                title: "Teacher Listening: Rescheduling an appointment",
                setup: "O professor lê a mensagem de voz. O aluno anota o compromisso original, o problema e as novas opções.",
                script: "Hello, this is Morgan from Westside Dental Clinic. You are seeing Dr. Lee tomorrow at 2:30, but the doctor is going to arrive later than expected. We can move your appointment to 4 p.m. tomorrow, or you can come on Thursday at 10:15. If neither time works, please call us before six today, and we will find another option.",
                questions: [
                    { question: "What time is the original appointment?", answer: "The original appointment is tomorrow at 2:30." },
                    { question: "Why does the clinic need to change it?", answer: "Because Dr. Lee is going to arrive later than expected." },
                    { question: "Which two new times are offered?", answer: "Tomorrow at 4 p.m. and Thursday at 10:15." },
                    { question: "What should the patient do if neither option works?", answer: "The patient should call before six today." }
                ]
            },
            {
                type: "translation",
                title: "Oral Translation: Future decisions",
                items: [
                    { pt: "Nós vamos nos encontrar na entrada às dez.", en: "We are meeting at the entrance at ten." },
                    { pt: "Eu vou reservar o hotel depois da aula.", en: "I am going to book the hotel after class." },
                    { pt: "Acho que o evento estará lotado.", en: "I think the event will be crowded." },
                    { pt: "Se chover, nós vamos nos encontrar lá dentro.", en: "If it rains, we will meet inside." },
                    { pt: "Eu aviso se o horário mudar.", en: "I will let you know if the schedule changes." },
                    { pt: "O que você fará se o trem for cancelado?", en: "What will you do if the train is cancelled?" },
                    { pt: "O telefone está tocando; eu atendo.", en: "The phone is ringing; I'll answer it." }
                ]
            },
            {
                type: "speaking",
                title: "Speaking Round 1: Schedule negotiation",
                label: "Role-play",
                scenario: "O professor e o aluno têm agendas diferentes e precisam encontrar um horário. O primeiro horário sugerido não pode funcionar.",
                languageBank: ["Are you available...?", "I'm afraid I can't", "I'm already...", "Could we meet instead?", "That works for me"],
                rounds: [
                    { title: "Student card", prompt: "Free: Tuesday after 6, Thursday morning, Saturday after 2. Busy: Wednesday evening and Friday all day.", followUps: ["Suggest one time.", "Refuse the teacher's first suggestion politely."], model: "Are you available on Tuesday after six? I'm afraid I can't meet on Wednesday because I am attending a class." },
                    { title: "Change", prompt: "The chosen location closes early. Suggest a new place and confirm the time.", followUps: ["Use instead.", "Repeat the final arrangement clearly."], model: "The cafe closes at six, so could we meet at the library instead? Great, we are meeting there on Tuesday at 6:30." },
                    { title: "Backup", prompt: "Add a backup plan in case public transportation is delayed.", followUps: ["Use if + Present Simple.", "Use will in the result."], model: "If the subway is delayed, I will message you and we will start online." }
                ],
                teacherFocus: ["Natural future choice", "Polite refusal", "Confirming details"]
            },
            {
                type: "speaking",
                title: "Speaking Round 2: Decision tree",
                label: "Problem-solving",
                scenario: "Resolva cada mudança sem abandonar o objetivo principal do plano.",
                languageBank: ["If that happens...", "Our backup plan is...", "I think... will...", "Let's... instead", "I'll..."],
                rounds: [
                    { title: "Outdoor event", prompt: "You are going to a concert, but rain is expected.", followUps: ["What are you going to take?", "What will you do if the concert moves inside?"], model: "I am going to take a light raincoat. If the concert moves inside, I will use the side entrance and message my friends." },
                    { title: "Train trip", prompt: "You are catching a train at 8, but the subway may be delayed.", followUps: ["Name the fixed arrangement.", "Create a realistic backup plan."], model: "I am taking the 8 o'clock train. If the subway is delayed, I will take a taxi to the station." },
                    { title: "Work presentation", prompt: "You are presenting tomorrow, but your coworker may be absent.", followUps: ["Make a prediction.", "Make an immediate decision."], model: "I think my coworker will call in the morning. If she is absent, I'll present her section too." }
                ],
                teacherFocus: ["Condition-result logic", "Fast decisions", "One-minute problem-solving"]
            },
            {
                type: "homework",
                title: "Homework: Plan, change and respond",
                deliverable: "Escolha um cenário e prepare um plano principal, dois compromissos e duas condições com consequências.",
                options: [
                    { title: "A weekend event", prompt: "Organize horário, encontro, previsão do tempo e plano alternativo." },
                    { title: "A short trip", prompt: "Inclua transporte, reserva, possível atraso e uma decisão imediata." },
                    { title: "A work or study deadline", prompt: "Explique o que já está marcado, o que pretende fazer e o que acontecerá se houver um problema." }
                ],
                checklist: ["Use as três formas de futuro.", "Inclua duas frases com if.", "Prepare uma recusa e uma nova sugestão."]
            }
        ]
    },
    {
        number: 5,
        unit: "Choices and Evidence",
        title: "Choices, Quantities and Opinions",
        objective: "Revisar comparação e quantidade para analisar opções e justificar decisões com evidências concretas.",
        focus: "Comparatives, superlatives, as...as, too, enough and quantifiers",
        cefr: "A2+ decision-making",
        slides: [
            {
                type: "opening",
                title: "Choices, Quantities and Opinions",
                objectives: [
                    "Comparar duas ou mais opções com precisão.",
                    "Usar too e enough para explicar limites.",
                    "Escolher quantificadores adequados para cada substantivo.",
                    "Defender uma escolha com preço, qualidade e necessidade."
                ],
                dialogue: {
                    title: "Choosing a laptop for the front desk",
                    lines: [
                        ["Mina", "Which laptop do you think we should buy for reception?"],
                        ["Gabriel", "The silver one is cheaper, but it only has eight gigabytes of memory."],
                        ["Mina", "Is that enough for the booking system?"],
                        ["Gabriel", "Probably, but the battery isn't as reliable as the black model's."],
                        ["Mina", "The black one is the most expensive option."],
                        ["Gabriel", "True, but it is lighter and has twice as much storage."],
                        ["Mina", "We don't need the fastest computer. We need one that will last."],
                        ["Gabriel", "Then the middle option may be the best value."]
                    ]
                }
            },
            {
                type: "grammar",
                title: "Compare what matters",
                intro: "Uma comparação útil deixa claro o critério: preço, tamanho, quantidade, qualidade ou adequação.",
                tables: [
                    {
                        title: "Comparison toolkit",
                        headers: ["Purpose", "Pattern", "Example"],
                        rows: [
                            ["Comparative", "-er / more + than", "This model is lighter than that one."],
                            ["Equality", "as + adjective + as", "It is as fast as the premium model."],
                            ["Superlative", "the -est / the most", "It is the most reliable option."],
                            ["Irregular", "better / worse / the best", "The middle plan offers better value."]
                        ]
                    },
                    {
                        title: "Limits and quantities",
                        headers: ["Tool", "Use", "Example"],
                        rows: [
                            ["too", "Mais do que é adequado", "It is too expensive."],
                            ["enough", "Quantidade adequada", "The screen is large enough."],
                            ["many / a few", "Contáveis", "There are many features but a few problems."],
                            ["much / a little", "Incontáveis", "We don't have much money, but we have a little time."]
                        ]
                    }
                ],
                notes: [
                    "Use fewer com itens contáveis e less com incontáveis: fewer errors, less time.",
                    "Evite formas duplas como more cheaper e the most fastest."
                ]
            },
            {
                type: "practice",
                title: "Comparison Lab: Form and accuracy",
                intro: "Corrija as formas antes de usar as comparações em uma decisão.",
                items: [
                    { kind: "complete", prompt: "The blue model is ____ than the black one. (light)", answer: "lighter", hint: "mais leve" },
                    { kind: "complete", prompt: "This is the ____ reliable option in our price range.", answer: "most", hint: "mais" },
                    { kind: "error", prompt: "The basic plan is more cheaper than the standard plan.", answer: "The basic plan is cheaper than the standard plan.", hint: "Não use more com cheaper." },
                    { kind: "transform", prompt: "Use as...as: Both batteries last ten hours.", answer: "The first battery lasts as long as the second one. / The batteries are equally long-lasting.", hint: "Mostre igualdade." },
                    { kind: "choose", prompt: "Which sentence is correct?", options: ["It is the best value.", "It is the most best value.", "It is more better value."], answer: "It is the best value.", hint: "Good tem forma irregular." },
                    { kind: "complete", prompt: "The screen is large ____ for the reception desk.", answer: "enough", hint: "suficiente" },
                    { kind: "error", prompt: "This printer is too much noisy for the office.", answer: "This printer is too noisy for the office.", hint: "Too vem diretamente antes do adjetivo." }
                ]
            },
            {
                type: "practice",
                title: "Quantity Lab: Count, measure and decide",
                intro: "Observe o substantivo e o significado positivo ou negativo da quantidade.",
                items: [
                    { kind: "complete", prompt: "We don't have ____ money for the premium package.", answer: "much", hint: "muito / muita" },
                    { kind: "complete", prompt: "There are only a ____ customer reviews for the new model.", answer: "few", hint: "poucas" },
                    { kind: "choose", prompt: "The updated system makes ____ errors than the old one.", options: ["fewer", "less", "little"], answer: "The updated system makes fewer errors than the old one.", hint: "Errors é contável." },
                    { kind: "error", prompt: "We need an information about the warranty.", answer: "We need some information about the warranty. / We need information about the warranty.", hint: "Information é incontável." },
                    { kind: "transform", prompt: "Expresse limite: The desk cannot hold this large monitor.", answer: "The monitor is too large for the desk. / The desk isn't large enough for the monitor.", hint: "Use too ou enough." },
                    { kind: "reorder", prompt: "storage / does / how much / this model / have / ?", answer: "How much storage does this model have?", hint: "Storage é incontável." },
                    { kind: "choose", prompt: "Choose the most natural affirmative sentence.", options: ["It has a lot of useful features.", "It has much useful features.", "It has a little useful features."], answer: "It has a lot of useful features.", hint: "Features é contável plural." }
                ]
            },
            {
                type: "reading",
                title: "A practical purchase for the community center",
                genre: "Decision report",
                paragraphs: [
                    "The Eastview Community Center needs a new laptop for its reception desk. Staff members use it to manage bookings, answer emails and prepare simple posters. The center has a limited budget, so the team compared three models instead of automatically choosing the fastest one.",
                    "Model A is the cheapest and lightest. It has enough memory for email and bookings, but its battery is weaker than the other batteries, and the warranty lasts only one year. Model B costs eighty dollars more. It is not as light as Model A, but it has more storage, a three-year warranty and many positive customer reviews. Model C is the fastest and has the largest screen, but it is too expensive and too heavy for the small reception desk.",
                    "After discussing the options, the team chose Model B. It was not the cheapest or the most powerful, but it offered the best balance of price, reliability and support. The team also had enough money left to buy a protective case and a wireless mouse."
                ],
                vocabulary: [
                    ["limited budget", "orçamento limitado"],
                    ["warranty", "garantia"],
                    ["storage", "armazenamento"],
                    ["reliability", "confiabilidade"],
                    ["protective case", "capa protetora"]
                ]
            },
            {
                type: "readingQuestions",
                title: "Reading Check: The laptop decision",
                questions: [
                    { question: "Which three tasks will staff perform on the laptop?", answer: "They will manage bookings, answer emails and prepare simple posters." },
                    { question: "What are the two main weaknesses of Model A?", answer: "It has a weaker battery and only a one-year warranty." },
                    { question: "Why is Model C unsuitable for the reception desk?", answer: "Because it is too expensive and too heavy for the small desk." },
                    { question: "Which advantages made the team choose Model B?", answer: "Its storage, three-year warranty, positive reviews and balanced price made it the best choice." },
                    { question: "What does the final purchase show about the team's budget?", answer: "It shows that the team stayed within budget and still had enough money for accessories." }
                ]
            },
            {
                type: "microReading",
                title: "Compare three service plans",
                texts: [
                    { label: "Basic — $18/month", text: "50 GB storage, email support, one user. Best for simple personal use. Extra users cost $6 each." },
                    { label: "Standard — $27/month", text: "150 GB storage, chat support, three users and weekly backup. Most popular with small teams." },
                    { label: "Premium — $45/month", text: "Unlimited storage, phone support, ten users and daily backup. A twelve-month contract is required." }
                ],
                questions: [
                    { question: "Which plan supports exactly three users without an extra fee?", answer: "The Standard plan supports three users." },
                    { question: "How much would the Basic plan cost for two users?", answer: "It would cost $24 per month." },
                    { question: "Which plan has the shortest backup interval?", answer: "The Premium plan, with daily backup." },
                    { question: "Why might a small team avoid the Premium plan?", answer: "It is the most expensive and requires a twelve-month contract." }
                ]
            },
            {
                type: "translation",
                title: "Oral Translation: Compare and justify",
                items: [
                    { pt: "O modelo azul é mais leve que o preto.", en: "The blue model is lighter than the black one." },
                    { pt: "Esta opção é tão rápida quanto a mais cara.", en: "This option is as fast as the most expensive one." },
                    { pt: "O monitor é grande demais para a mesa.", en: "The monitor is too large for the desk." },
                    { pt: "Nós não temos dinheiro suficiente para o plano premium.", en: "We don't have enough money for the premium plan." },
                    { pt: "O sistema novo comete menos erros.", en: "The new system makes fewer errors." },
                    { pt: "Há poucas avaliações, mas elas são positivas.", en: "There are a few reviews, but they are positive." },
                    { pt: "O plano intermediário oferece o melhor custo-benefício.", en: "The middle plan offers the best value." }
                ]
            },
            {
                type: "speaking",
                title: "Speaking Round 1: Purchase meeting",
                label: "Evidence-based decision",
                scenario: "Escolha um dos três planos dos microtextos para uma equipe de três pessoas. O professor questionará preço, necessidade e risco.",
                languageBank: ["compared with", "as...as", "too expensive", "enough", "better value", "the main drawback"],
                rounds: [
                    { title: "Initial choice", prompt: "State your choice and give two concrete reasons from the plan descriptions.", followUps: ["Why not the cheapest plan?", "Is the storage enough?"], model: "I would choose the Standard plan because it supports three users and includes weekly backup. It is more expensive than Basic, but the extra support offers better value." },
                    { title: "Challenge", prompt: "The team may grow to five people next year. Does your choice still work?", followUps: ["Compare the possible extra cost.", "Mention one uncertainty."], model: "The Standard plan may not be large enough for five users. We need more information about extra-user fees before we make a long-term decision." },
                    { title: "Final recommendation", prompt: "Give a final recommendation in 40–60 seconds.", followUps: ["Include one disadvantage.", "Finish with the deciding factor."], model: "Standard is not the cheapest option, and it may need an upgrade later. However, it is reliable enough for the current team, and weekly backup is the deciding factor." }
                ],
                teacherFocus: ["Accurate comparisons", "Evidence from a text", "Clear recommendation"]
            },
            {
                type: "speaking",
                title: "Speaking Round 2: Rank the weekend options",
                label: "Comparison and preference",
                scenario: "Rank three activities for a group with a $60 total budget: free museum day, $40 cinema package, or $55 outdoor food fair.",
                languageBank: ["the most affordable", "less crowded", "not as flexible as", "good enough", "worth the extra cost"],
                rounds: [
                    { title: "Compare", prompt: "Compare price, flexibility and comfort for all three options.", followUps: ["Which is the cheapest?", "Which may be the least predictable?"], model: "The museum is the most affordable option. The cinema is more comfortable than the food fair, but it is not as flexible because the film has a fixed time." },
                    { title: "Rank", prompt: "Place the options from first to third and justify each position.", followUps: ["Use one superlative.", "Use one not as...as comparison."], model: "I would put the museum first because it is free and flexible. The cinema comes second, and the food fair is third because it is not as affordable as the other choices." },
                    { title: "New condition", prompt: "It may rain and one person dislikes crowded places. Revise your ranking.", followUps: ["Explain what changed.", "Use too or enough."], model: "With rain and crowd concerns, the cinema becomes the best option. It is comfortable enough for everyone, and the food fair may be too crowded." }
                ],
                teacherFocus: ["Responding to new information", "Ranking", "Justification"]
            },
            {
                type: "homework",
                title: "Homework: Make a supported choice",
                deliverable: "Escolha um tema, compare três opções e prepare uma recomendação oral com pelo menos cinco critérios.",
                options: [
                    { title: "Three products", prompt: "Compare três celulares, computadores ou eletrodomésticos reais ou fictícios." },
                    { title: "Three places", prompt: "Compare três bairros, hotéis ou destinos considerando preço, localização e conforto." },
                    { title: "Three services", prompt: "Compare planos de internet, cursos ou academias considerando necessidade e orçamento." }
                ],
                checklist: ["Use dois comparativos e um superlativo.", "Inclua too ou enough.", "Use quantificadores e termine com uma recomendação."]
            }
        ]
    },
    {
        number: 6,
        unit: "Rules and Wellbeing",
        title: "Rules, Health and Practical Advice",
        objective: "Diferenciar obrigação, proibição, ausência de necessidade e conselho em situações de trabalho e bem-estar.",
        focus: "Must, have to, need to, don't have to, mustn't and should",
        cefr: "A2+ practical guidance",
        slides: [
            {
                type: "opening",
                title: "Rules, Health and Practical Advice",
                objectives: [
                    "Distinguir obrigação, proibição e escolha.",
                    "Dar conselhos claros sem transformar sugestão em regra.",
                    "Descrever sintomas cotidianos com linguagem simples.",
                    "Explicar políticas e orientar outra pessoa."
                ],
                dialogue: {
                    title: "A difficult afternoon at work",
                    lines: [
                        ["Nora", "You don't look well. Do you have a headache?"],
                        ["Sam", "Yes. I started at eight and haven't taken a proper break."],
                        ["Nora", "You should take a break and drink some water."],
                        ["Sam", "I have to finish the customer report before four."],
                        ["Nora", "You don't have to do every section alone. I can check the final page."],
                        ["Sam", "Thanks. Do I need to tell the manager?"],
                        ["Nora", "Yes, because you mustn't ignore a problem if it is affecting your work."],
                        ["Sam", "You're right. I'll send her a message and step away for ten minutes."]
                    ]
                }
            },
            {
                type: "languageBank",
                title: "Practical language for rules and advice",
                intro: "A força da mensagem muda conforme o modal escolhido.",
                items: [
                    { term: "You have to...", meaning: "obrigação externa", example: "You have to wear an ID badge." },
                    { term: "You mustn't...", meaning: "proibição", example: "You mustn't share your password." },
                    { term: "You don't have to...", meaning: "não é necessário", example: "You don't have to attend the optional meeting." },
                    { term: "You should...", meaning: "conselho", example: "You should take regular breaks." },
                    { term: "Do I need to...?", meaning: "perguntar necessidade", example: "Do I need to bring a document?" },
                    { term: "It might help to...", meaning: "sugestão mais suave", example: "It might help to turn off notifications." }
                ]
            },
            {
                type: "grammar",
                title: "How strong is the message?",
                intro: "Use a estrutura que representa a intenção real, não apenas a tradução literal.",
                tables: [
                    {
                        title: "Rules and necessity",
                        headers: ["Meaning", "Form", "Example"],
                        rows: [
                            ["Regra forte", "must + base verb", "Visitors must sign in."],
                            ["Obrigação prática", "have to + base verb", "I have to submit the report."],
                            ["Necessidade", "need to + base verb", "You need to update the form."],
                            ["Não é necessário", "don't/doesn't have to", "You don't have to print it."],
                            ["Proibição", "mustn't + base verb", "You mustn't block this exit."]
                        ]
                    },
                    {
                        title: "Advice",
                        headers: ["Purpose", "Pattern", "Example"],
                        rows: [
                            ["Conselho", "should + base verb", "You should rest your eyes."],
                            ["Conselho negativo", "shouldn't + base verb", "You shouldn't skip lunch."],
                            ["Pergunta", "Should + subject + base verb?", "Should I call the clinic?"],
                            ["Sugestão suave", "It might help to + base verb", "It might help to take a short walk."]
                        ]
                    }
                ],
                notes: [
                    "Mustn't significa que algo é proibido; don't have to significa que é opcional.",
                    "Depois de modal, use o verbo base: must wear, should rest, not must to wear."
                ]
            },
            {
                type: "practice",
                title: "Rule Clinic: Obligation or choice?",
                intro: "Identifique a força necessária em cada situação.",
                items: [
                    { kind: "complete", prompt: "All visitors ____ sign in at reception.", answer: "must", hint: "devem" },
                    { kind: "choose", prompt: "The meeting is optional. You ____ attend.", options: ["don't have to", "mustn't", "have to"], answer: "You don't have to attend.", hint: "Não é necessário, mas é permitido." },
                    { kind: "error", prompt: "Employees must to lock the door after six.", answer: "Employees must lock the door after six.", hint: "Depois de must, use o verbo base sem to." },
                    { kind: "complete", prompt: "You ____ share this access code with customers.", answer: "mustn't", hint: "não pode" },
                    { kind: "transform", prompt: "Transforme em pergunta de necessidade: bring my own laptop", answer: "Do I need to bring my own laptop?", hint: "Use Do I need to." },
                    { kind: "choose", prompt: "Which sentence means the task is required by the schedule?", options: ["I have to send it by noon.", "I should send it by noon.", "I don't have to send it."], answer: "I have to send it by noon.", hint: "Existe uma obrigação externa." },
                    { kind: "error", prompt: "She doesn't has to work this Saturday.", answer: "She doesn't have to work this Saturday.", hint: "Depois de doesn't, use have." }
                ]
            },
            {
                type: "practice",
                title: "Advice Clinic: Useful, clear and realistic",
                intro: "Dê conselho sem exagerar a gravidade da situação.",
                items: [
                    { kind: "complete", prompt: "You ____ take a short break if your eyes feel tired.", answer: "should", hint: "deveria" },
                    { kind: "complete", prompt: "You ____ skip every lunch break during a busy week.", answer: "shouldn't", hint: "não deveria" },
                    { kind: "transform", prompt: "Dê um conselho: My shoulders hurt after I work at the kitchen table.", answer: "You should adjust your chair or work at a proper desk.", hint: "Use should + verbo base." },
                    { kind: "choose", prompt: "Which response is a suggestion, not a rule?", options: ["It might help to turn off notifications.", "You must wear safety glasses.", "Staff have to sign the form."], answer: "It might help to turn off notifications.", hint: "É uma possibilidade útil." },
                    { kind: "error", prompt: "You should to drink more water during the day.", answer: "You should drink more water during the day.", hint: "Should não recebe to." },
                    { kind: "reorder", prompt: "should / who / I / if / feel worse / call / I / ?", answer: "Who should I call if I feel worse?", hint: "Comece com Who should I." },
                    { kind: "transform", prompt: "Suavize o conselho: Turn off your phone before bed.", answer: "It might help to turn off your phone before bed.", hint: "Use It might help to." }
                ]
            },
            {
                type: "reading",
                title: "A healthier busy season",
                genre: "Workplace case study",
                paragraphs: [
                    "Every December, Northline Design becomes extremely busy. Last year, several employees worked through lunch, answered messages late at night and stopped taking short breaks. The team completed its projects, but people felt exhausted, and the company made more small mistakes than usual. This year, the managers have introduced a clearer wellbeing plan.",
                    "Employees still have to meet client deadlines, but they must record overtime and mustn't work after 8 p.m. without approval. They do not have to answer non-urgent messages in the evening. Team leaders also need to check workloads twice a week, so one person does not receive too many urgent tasks.",
                    "The plan includes recommendations as well as rules. Staff should take a short screen break every ninety minutes, keep water near their desks and speak to a manager before a small problem becomes serious. After the first three weeks, the team has completed the same amount of work with fewer corrections. Employees say the season is still demanding, but the expectations are now clearer and more realistic."
                ],
                vocabulary: [
                    ["worked through lunch", "trabalharam durante o almoço"],
                    ["exhausted", "exaustos"],
                    ["overtime", "hora extra"],
                    ["workloads", "cargas de trabalho"],
                    ["demanding", "exigente"]
                ]
            },
            {
                type: "readingQuestions",
                title: "Reading Check: Workplace wellbeing",
                questions: [
                    { question: "Which habits caused problems during the previous busy season?", answer: "Employees skipped lunch, answered late messages and stopped taking breaks." },
                    { question: "What must employees do when they work extra hours?", answer: "They must record their overtime." },
                    { question: "Which evening activity is optional rather than prohibited?", answer: "Answering non-urgent messages is optional; employees do not have to do it." },
                    { question: "Why do team leaders check workloads twice a week?", answer: "To prevent one person from receiving too many urgent tasks." },
                    { question: "What evidence suggests the new plan is helping?", answer: "The team has completed the same amount of work with fewer corrections." }
                ]
            },
            {
                type: "microReading",
                title: "Rules in three everyday documents",
                texts: [
                    { label: "Clinic message", text: "Please arrive ten minutes early and bring a photo ID. You do not have to print the confirmation email. If you cannot attend, you need to cancel at least four hours before the appointment." },
                    { label: "Office notice", text: "Emergency exit: keep this area clear at all times. Staff mustn't store boxes in front of the door. Report damaged signs to reception." },
                    { label: "Pharmacy label", text: "Store this product in a cool, dry place. Do not use it after the date on the package. Ask the pharmacist if the instructions are unclear." }
                ],
                questions: [
                    { question: "Which clinic document can remain digital?", answer: "The confirmation email can remain digital." },
                    { question: "How early should a patient arrive?", answer: "A patient should arrive ten minutes early." },
                    { question: "What is prohibited near the emergency exit?", answer: "Storing boxes in front of the exit is prohibited." },
                    { question: "Who should answer questions about unclear product instructions?", answer: "The pharmacist should answer them." }
                ]
            },
            {
                type: "teacherListening",
                title: "Teacher Listening: First-day instructions",
                setup: "O professor lê as instruções. O aluno separa o que é obrigatório, opcional e recomendado.",
                script: "Welcome to the workshop. You have to wear your visitor badge while you are in the building, and you mustn't enter the equipment room alone. You don't have to bring a laptop because we have shared computers. You should keep a notebook nearby, and it might help to write down any questions for the final discussion. If you need a break, tell the instructor before you leave the room.",
                questions: [
                    { question: "What must visitors wear?", answer: "They must wear a visitor badge." },
                    { question: "Where must visitors not go alone?", answer: "They must not enter the equipment room alone." },
                    { question: "Which item is provided by the workshop?", answer: "Shared computers are provided, so visitors do not need a laptop." },
                    { question: "What is recommended for the final discussion?", answer: "Writing questions in a notebook is recommended." }
                ]
            },
            {
                type: "translation",
                title: "Oral Translation: Rules and advice",
                items: [
                    { pt: "Todos os visitantes precisam se registrar na recepção.", en: "All visitors have to sign in at reception." },
                    { pt: "Você não pode bloquear a saída de emergência.", en: "You mustn't block the emergency exit." },
                    { pt: "Você não precisa imprimir o e-mail.", en: "You don't have to print the email." },
                    { pt: "Eu preciso avisar o gerente?", en: "Do I need to tell the manager?" },
                    { pt: "Você deveria fazer uma pausa curta.", en: "You should take a short break." },
                    { pt: "Talvez ajude desligar as notificações.", en: "It might help to turn off notifications." },
                    { pt: "Os funcionários têm que registrar as horas extras.", en: "Employees have to record overtime." }
                ]
            },
            {
                type: "speaking",
                title: "Speaking Round 1: New employee orientation",
                label: "Explain rules clearly",
                scenario: "O aluno orienta uma pessoa nova. O professor pergunta o que é obrigatório, proibido, opcional e recomendado.",
                languageBank: ["You have to...", "You mustn't...", "You don't have to...", "You should...", "If you need..., ask..."],
                rounds: [
                    { title: "Building access", prompt: "Badge required; equipment room restricted; kitchen available to everyone.", followUps: ["What is prohibited?", "What can everyone use?"], model: "You have to wear your badge, and you mustn't enter the equipment room without permission. You can use the kitchen whenever it is free." },
                    { title: "Daily routine", prompt: "Team update by 9:30; lunch time flexible; non-urgent evening messages optional.", followUps: ["Which task has a deadline?", "What doesn't the employee have to do?"], model: "You need to send a team update by 9:30. You can choose your lunch time, and you don't have to answer non-urgent messages at night." },
                    { title: "Wellbeing", prompt: "Screen breaks recommended; report workload problems early.", followUps: ["Give one reason.", "Make the advice sound supportive."], model: "You should take regular screen breaks because long sessions can be tiring. If your workload becomes difficult, you should speak to the team leader early." }
                ],
                teacherFocus: ["Modal meaning", "Clear orientation", "Answering clarification questions"]
            },
            {
                type: "speaking",
                title: "Speaking Round 2: Solve a busy-day problem",
                label: "Advice and negotiation",
                scenario: "O professor apresenta um problema de rotina. O aluno faz perguntas, separa obrigação de escolha e propõe uma solução realista.",
                languageBank: ["Do you have to...?", "You don't have to...", "You should...", "It might help to...", "Could someone else...?"],
                rounds: [
                    { title: "Too many tasks", prompt: "A coworker has three reports due today and an optional afternoon meeting.", followUps: ["Ask what is truly required.", "Give two pieces of advice."], model: "Do you have to attend the meeting? If it is optional, you don't have to go. You should ask which report is most urgent and request help with the others." },
                    { title: "Screen fatigue", prompt: "A student has worked at a laptop for four hours and still needs to study.", followUps: ["Avoid giving medical diagnoses.", "Suggest two practical changes."], model: "You should step away from the screen for a few minutes and drink some water. It might also help to study from printed notes for the next section." },
                    { title: "Shared responsibility", prompt: "One person is doing every part of a group task.", followUps: ["State what the group has to do.", "State what that person doesn't have to do alone."], model: "The group has to divide the remaining tasks clearly. That person doesn't have to complete every section alone, and someone else should check the final version." }
                ],
                teacherFocus: ["Asking before advising", "Realistic solutions", "Supportive tone"]
            },
            {
                type: "assessment",
                title: "Quick Can-Do Check",
                intro: "Use a escala para registrar se o aluno distingue significado, não apenas forma.",
                criteria: [
                    { name: "Obligation", descriptor: "Explica uma regra usando must, have to ou need to." },
                    { name: "Prohibition", descriptor: "Usa mustn't sem confundir com don't have to." },
                    { name: "Advice", descriptor: "Oferece conselho com should ou uma sugestão mais suave." },
                    { name: "Interaction", descriptor: "Faz perguntas antes de propor uma solução." }
                ]
            },
            {
                type: "homework",
                title: "Homework: Create a practical guide",
                deliverable: "Escolha um contexto e prepare um guia oral com duas obrigações, uma proibição, uma opção e dois conselhos.",
                options: [
                    { title: "First day at work", prompt: "Explique acesso, horários, comunicação e uma recomendação de organização." },
                    { title: "A healthy study day", prompt: "Separe responsabilidades reais de hábitos recomendados para estudar melhor." },
                    { title: "Visitor instructions", prompt: "Oriente alguém em uma clínica, evento ou prédio público." }
                ],
                checklist: ["Use mustn't e don't have to corretamente.", "Inclua uma pergunta com need to.", "Explique pelo menos uma razão."]
            }
        ]
    },
    {
        number: 7,
        unit: "Real-World Mobility",
        title: "Travel, Directions and Service Problems",
        objective: "Integrar pedidos educados, direções em várias etapas e resolução de problemas em viagens e serviços.",
        focus: "Polite requests, location, movement and service language",
        cefr: "A2+ travel interaction",
        slides: [
            {
                type: "opening",
                title: "Travel, Directions and Service Problems",
                objectives: [
                    "Fazer pedidos educados e explicar problemas com clareza.",
                    "Dar direções usando sequência, distância e referência.",
                    "Interpretar avisos, horários e mensagens de serviço.",
                    "Confirmar informações para evitar mal-entendidos."
                ],
                dialogue: {
                    title: "A room that is not ready",
                    lines: [
                        ["Guest", "Hi. I have a reservation under the name Aisha Rahman."],
                        ["Clerk", "Welcome, Ms. Rahman. Could I see your passport, please?"],
                        ["Guest", "Of course. I also received a message saying my room was ready."],
                        ["Clerk", "I am sorry, but housekeeping is still checking the room."],
                        ["Guest", "Do you know how long it will take? I have an online meeting at three."],
                        ["Clerk", "It should be ready in twenty minutes. You can use the business lounge in the meantime."],
                        ["Guest", "Could you show me how to get there?"],
                        ["Clerk", "Certainly. Go past the elevators, turn left at the restaurant and use the second door on your right."]
                    ]
                }
            },
            {
                type: "languageBank",
                title: "Service moves that keep the conversation calm",
                intro: "Uma boa solicitação combina contexto curto, problema específico e pedido claro.",
                items: [
                    { term: "There seems to be a problem with...", meaning: "apresentar o problema", example: "There seems to be a problem with my room key." },
                    { term: "Could you check...?", meaning: "pedido educado", example: "Could you check the reservation again?" },
                    { term: "Do you know how long...?", meaning: "perguntar duração", example: "Do you know how long it will take?" },
                    { term: "Just to confirm...", meaning: "confirmar informação", example: "Just to confirm, breakfast starts at seven, right?" },
                    { term: "in the meantime", meaning: "enquanto isso", example: "You can wait in the lounge in the meantime." },
                    { term: "Is there another option?", meaning: "pedir alternativa", example: "Is there another train this evening?" }
                ]
            },
            {
                type: "grammar",
                title: "Requests, place and movement",
                intro: "A estrutura precisa ser correta, mas a clareza da sequência é igualmente importante.",
                tables: [
                    {
                        title: "Polite service language",
                        headers: ["Purpose", "Pattern", "Example"],
                        rows: [
                            ["Pedir ação", "Could you + base verb...?", "Could you print a new ticket?"],
                            ["Pedir permissão", "Could I / May I...?", "Could I leave my bag here?"],
                            ["Perguntar disponibilidade", "Is there / Are there...?", "Is there another room available?"],
                            ["Confirmar", "Just to confirm...", "Just to confirm, the train leaves at 6:20."]
                        ]
                    },
                    {
                        title: "Clear directions",
                        headers: ["Step", "Useful forms", "Example"],
                        rows: [
                            ["Movement", "go past / walk through / cross", "Go past the elevators."],
                            ["Turn", "turn left/right at", "Turn right at the pharmacy."],
                            ["Position", "next to / across from / between", "It is across from Gate 4."],
                            ["Sequence", "first / then / after that / finally", "First, cross the lobby. Then, take the stairs."]
                        ]
                    }
                ],
                notes: [
                    "Could you é normalmente mais educado do que can you, mas ambos usam verbo base.",
                    "Repita o destino ou o horário ao final para confirmar que entendeu."
                ]
            },
            {
                type: "practice",
                title: "Service Desk: Explain and request",
                intro: "Monte pedidos completos em vez de usar palavras soltas.",
                items: [
                    { kind: "complete", prompt: "____ you check my reservation again, please?", answer: "Could", hint: "poderia" },
                    { kind: "complete", prompt: "There seems to be a problem ____ my room key.", answer: "with", hint: "com" },
                    { kind: "error", prompt: "Could you to print a new boarding pass?", answer: "Could you print a new boarding pass?", hint: "Depois de could, use verbo base." },
                    { kind: "reorder", prompt: "how long / do / know / it will take / you / ?", answer: "Do you know how long it will take?", hint: "Comece com Do you know." },
                    { kind: "transform", prompt: "Torne mais educado: Check the booking again.", answer: "Could you check the booking again, please?", hint: "Use Could you." },
                    { kind: "choose", prompt: "Which sentence asks for permission?", options: ["Could I leave my bag here?", "Could you carry my bag?", "Is my bag here?"], answer: "Could I leave my bag here?", hint: "O próprio falante quer fazer algo." },
                    { kind: "complete", prompt: "Is there ____ option later this evening?", answer: "another", hint: "outra" }
                ]
            },
            {
                type: "practice",
                title: "Route Builder: Multi-step directions",
                intro: "Cada resposta deve incluir ação, referência e destino final.",
                items: [
                    { kind: "complete", prompt: "Go ____ the elevators and turn left at the restaurant.", answer: "past", hint: "passe por" },
                    { kind: "complete", prompt: "Walk ____ the glass doors into the main hall.", answer: "through", hint: "através de" },
                    { kind: "error", prompt: "The lounge is in front the elevators.", answer: "The lounge is in front of the elevators.", hint: "In front precisa de of." },
                    { kind: "reorder", prompt: "the pharmacy / across from / is / Gate 4 / the help desk", answer: "The help desk is across from the pharmacy at Gate 4. / The pharmacy is across from the help desk at Gate 4.", hint: "Use across from entre os dois lugares." },
                    { kind: "transform", prompt: "Una os passos: Cross the lobby. Turn right at reception. Use the second door.", answer: "First, cross the lobby. Then turn right at reception and use the second door.", hint: "Use conectores de sequência." },
                    { kind: "choose", prompt: "Which instruction means continue beyond the cafe?", options: ["Go past the cafe.", "Go into the cafe.", "Stop across from the cafe."], answer: "Go past the cafe.", hint: "Você passa pelo local e continua." },
                    { kind: "complete", prompt: "The ticket office is ____ the bank and the information desk.", answer: "between", hint: "entre" }
                ]
            },
            {
                type: "reading",
                title: "A delayed check-in and a useful alternative",
                genre: "Travel problem narrative",
                paragraphs: [
                    "Aisha arrived at the Harbor View Hotel at 2:20 p.m., forty minutes before an important online meeting. She booked a quiet room and received a message saying that it was ready. At reception, however, the clerk explained that housekeeping was still checking a problem with the air conditioner. The room would not be available for another twenty minutes.",
                    "Aisha calmly explained that she needed a private place with reliable internet. Instead of demanding a different room immediately, she asked whether there was another option. The clerk offered the business lounge, which had small meeting rooms and free Wi-Fi. He gave her a temporary access card and clear directions: go past the elevators, turn left after the restaurant and enter through the second door on the right.",
                    "Aisha reached the lounge with enough time to test the connection. Her hotel room became available while she was finishing the meeting. Later, the hotel sent her bags upstairs and offered a free breakfast for the inconvenience. The situation was not ideal, but clear information and a practical alternative prevented it from becoming a larger problem."
                ],
                vocabulary: [
                    ["housekeeping", "equipe de limpeza e arrumação"],
                    ["reliable", "confiável"],
                    ["demanding", "exigindo"],
                    ["temporary", "temporário"],
                    ["inconvenience", "transtorno"]
                ]
            },
            {
                type: "readingQuestions",
                title: "Reading Check: Hotel solution",
                questions: [
                    { question: "Why was Aisha concerned about the twenty-minute delay?", answer: "Because she had an important online meeting and needed a quiet place with reliable internet." },
                    { question: "How did Aisha present the problem to the clerk?", answer: "She explained her need calmly and asked whether another option was available." },
                    { question: "Which facilities made the business lounge suitable?", answer: "It had small meeting rooms and free Wi-Fi." },
                    { question: "What did the hotel do after the meeting?", answer: "It sent her bags to the room and offered a free breakfast." },
                    { question: "What prevented the delay from becoming a larger problem?", answer: "Clear information and a practical alternative prevented it." }
                ]
            },
            {
                type: "microReading",
                title: "Travel information under pressure",
                texts: [
                    { label: "Departure board", text: "Train 618 to Brighton — delayed 25 minutes. New departure: 18:45 from Platform 7. Passengers for Westport should take Train 204 from Platform 5 at 18:32." },
                    { label: "Hotel message", text: "The main entrance closes at midnight. After midnight, use the side entrance on Lake Street and scan your room card. Reception is staffed all night." },
                    { label: "Map note", text: "From Platform 7, go down the stairs, walk through the central hall and turn right after the coffee stand. The taxi desk is between the pharmacy and Exit C." }
                ],
                questions: [
                    { question: "When and where will Train 618 now leave?", answer: "It will leave at 18:45 from Platform 7." },
                    { question: "Which passengers need to change trains?", answer: "Passengers travelling to Westport need to take Train 204." },
                    { question: "How can a hotel guest enter after midnight?", answer: "The guest can use the Lake Street side entrance and scan the room card." },
                    { question: "What two landmarks are beside the taxi desk?", answer: "The pharmacy and Exit C are beside it." }
                ]
            },
            {
                type: "teacherListening",
                title: "Teacher Listening: Station announcement",
                setup: "O professor lê o anúncio duas vezes. O aluno anota mudança, motivo, novo local e orientação final.",
                script: "Attention, passengers travelling on the 7:10 service to Greenford. Because of a technical problem, the train will not leave from Platform 2. Please go to Platform 6. To reach Platform 6, use the stairs beside the information desk, cross the upper bridge and take the elevator down. The train is expected to leave fifteen minutes late. Passengers who need assistance should speak to a member of staff near the elevator.",
                questions: [
                    { question: "Which train is affected?", answer: "The 7:10 service to Greenford is affected." },
                    { question: "What is the new platform?", answer: "The new platform is Platform 6." },
                    { question: "How can passengers reach it?", answer: "They should use the stairs, cross the upper bridge and take the elevator down." },
                    { question: "Where can passengers request assistance?", answer: "They can speak to staff near the elevator." }
                ]
            },
            {
                type: "translation",
                title: "Oral Translation: Travel and service",
                items: [
                    { pt: "Parece haver um problema com a minha reserva.", en: "There seems to be a problem with my reservation." },
                    { pt: "Você poderia verificar o horário novamente, por favor?", en: "Could you check the time again, please?" },
                    { pt: "Há outro quarto disponível?", en: "Is there another room available?" },
                    { pt: "Só para confirmar, o trem sai da plataforma sete.", en: "Just to confirm, the train leaves from Platform 7." },
                    { pt: "Passe pelos elevadores e vire à esquerda no restaurante.", en: "Go past the elevators and turn left at the restaurant." },
                    { pt: "O balcão de táxi fica entre a farmácia e a saída.", en: "The taxi desk is between the pharmacy and the exit." },
                    { pt: "Você sabe quanto tempo vai demorar?", en: "Do you know how long it will take?" }
                ]
            },
            {
                type: "speaking",
                title: "Speaking Round 1: Hotel service desk",
                label: "Role-play",
                scenario: "O aluno é o hóspede. Deve explicar o problema, informar por que ele importa e pedir uma solução específica.",
                languageBank: ["I have a reservation under...", "There seems to be...", "I need... because...", "Could you...?", "Is there another option?"],
                rounds: [
                    { title: "Room problem", prompt: "Reserved quiet room; assigned room faces construction; online interview at 9 a.m.", followUps: ["What exactly did you reserve?", "Would a higher floor solve the problem?"], model: "There seems to be a problem with my room. I reserved a quiet room, but this one faces the construction area. Could you check whether a room on a higher floor is available?" },
                    { title: "Missing item", prompt: "Requested extra towel two hours ago; it has not arrived; leaving for dinner soon.", followUps: ["When did you request it?", "What solution do you want now?"], model: "I requested an extra towel two hours ago, but it hasn't arrived yet. Could someone bring it in the next fifteen minutes, please?" },
                    { title: "Confirm the solution", prompt: "The clerk offers a room change after 8 p.m. Confirm time, key and luggage arrangements.", followUps: ["Ask three short confirmation questions.", "Repeat the final plan."], model: "Just to confirm, the new room will be ready after eight, right? Where can I collect the key, and will someone move my luggage?" }
                ],
                teacherFocus: ["Clear problem statement", "Polite request", "Confirmation"]
            },
            {
                type: "speaking",
                title: "Speaking Round 2: Information-gap directions",
                label: "Live navigation",
                scenario: "O professor escolhe secretamente um destino. O aluno faz perguntas e dá uma rota completa a partir das pistas fornecidas.",
                languageBank: ["Where are you starting from?", "Go past...", "Walk through...", "It is across from...", "Did you say...?"],
                rounds: [
                    { title: "Route A", prompt: "Start: hotel lobby. Destination: business lounge. Landmarks: elevators, restaurant, second door on right.", followUps: ["Give at least three steps.", "Confirm the final door."], model: "Go past the elevators and turn left after the restaurant. The business lounge is through the second door on your right." },
                    { title: "Route B", prompt: "Start: Platform 7. Destination: taxi desk. Landmarks: stairs, central hall, coffee stand, pharmacy.", followUps: ["Use through and between.", "Repeat the destination at the end."], model: "Go down the stairs and walk through the central hall. Turn right after the coffee stand. The taxi desk is between the pharmacy and Exit C." },
                    { title: "Clarification", prompt: "The teacher deliberately gives one unclear step. Ask for clarification before continuing.", followUps: ["Use Did you say...? or Do you mean...?", "Do not guess the route."], model: "Did you say the first or the second door on the right? Do you mean the stairs beside the information desk?" }
                ],
                teacherFocus: ["Multi-step clarity", "Clarification strategy", "Accurate prepositions"]
            },
            {
                type: "speaking",
                title: "Speaking Round 3: Choose the best response",
                label: "Fast service decisions",
                scenario: "Responda imediatamente a cada mudança, mantendo tom educado e objetivo.",
                languageBank: ["In that case...", "Could I...?", "Would it be possible to...?", "That solution works", "I still need..."],
                rounds: [
                    { title: "Train delay", prompt: "Your connection leaves in twenty minutes, but your train is delayed by twenty-five.", followUps: ["Ask about another route.", "Confirm the platform."], model: "I may miss my connection. Is there another route to Westport, and could you confirm which platform I need?" },
                    { title: "Closed entrance", prompt: "You return to the hotel after midnight and the main entrance is locked.", followUps: ["Use the information from the microtext.", "Ask for help only if the card fails."], model: "I will use the Lake Street entrance and scan my room card. If it doesn't work, I will contact reception." },
                    { title: "No immediate room", prompt: "The room is delayed, but the lounge is available.", followUps: ["Accept the useful part.", "Ask what happens to the bags."], model: "The lounge works for my meeting, thank you. Could you keep my bags safely and send them to the room when it is ready?" }
                ],
                teacherFocus: ["Using available information", "Fast adaptation", "Polite tone"]
            },
            {
                type: "homework",
                title: "Homework: Prepare for a travel problem",
                deliverable: "Escolha um cenário e prepare um diálogo com problema, pedido, alternativa, confirmação e encerramento.",
                options: [
                    { title: "Hotel", prompt: "Resolva um problema de quarto, reserva ou serviço sem repetir o cenário da aula." },
                    { title: "Train or airport", prompt: "Lide com atraso, mudança de plataforma ou conexão curta." },
                    { title: "Finding a place", prompt: "Prepare direções em cinco etapas entre dois pontos conhecidos." }
                ],
                checklist: ["Use dois pedidos educados.", "Inclua uma pergunta de confirmação.", "Prepare uma alternativa realista."]
            }
        ]
    },
    {
        number: 8,
        unit: "Habits and Learning",
        title: "Habits, Technology and Learning",
        objective: "Revisar padrões com gerúndio e infinitivo e explicar hábitos, processos e resultados previsíveis.",
        focus: "Gerunds, infinitives, Zero Conditional and digital habits",
        cefr: "A2+ explanation and routine",
        slides: [
            {
                type: "opening",
                title: "Habits, Technology and Learning",
                objectives: [
                    "Usar gerúndio depois de preferências e atividades.",
                    "Usar infinitivo para planos, necessidades e propósitos.",
                    "Explicar resultados gerais com Zero Conditional.",
                    "Descrever um processo digital em etapas claras."
                ],
                dialogue: {
                    title: "A quieter evening routine",
                    lines: [
                        ["Mei", "You answered my message much later than usual yesterday."],
                        ["Jonas", "I am trying to stop checking notifications during dinner."],
                        ["Mei", "Has it helped?"],
                        ["Jonas", "Yes. If I leave my phone in another room, I finish eating without distractions."],
                        ["Mei", "I keep picking mine up without thinking."],
                        ["Jonas", "Try turning off the sound for an hour."],
                        ["Mei", "Good idea. I also want to start reading before bed again."],
                        ["Jonas", "That may help too. I sleep better when I avoid bright screens late at night."]
                    ]
                }
            },
            {
                type: "grammar",
                title: "What comes after the verb?",
                intro: "Alguns verbos e expressões pedem gerúndio; outros pedem infinitivo com to.",
                tables: [
                    {
                        title: "Gerund and infinitive patterns",
                        headers: ["Pattern", "Common words", "Example"],
                        rows: [
                            ["verb + -ing", "enjoy, avoid, finish, keep", "I avoid checking messages at dinner."],
                            ["preposition + -ing", "good at, interested in, before", "She is good at organizing files."],
                            ["verb + to + base", "want, need, plan, decide", "We plan to update the system."],
                            ["purpose", "to + base verb", "I use a calendar to remember deadlines."]
                        ]
                    },
                    {
                        title: "Zero Conditional",
                        headers: ["Meaning", "Pattern", "Example"],
                        rows: [
                            ["Resultado geral ou previsível", "if + Present Simple, Present Simple", "If I turn off alerts, I concentrate better."],
                            ["Reverse order", "Present Simple + if + Present Simple", "I sleep better if I avoid screens."],
                            ["When for regular results", "when + Present Simple", "When the battery is low, the icon turns red."],
                            ["Not future", "No will for a general result", "If I restart it, it works better."]
                        ]
                    }
                ],
                notes: [
                    "Enjoy to read não é a forma padrão; use enjoy reading.",
                    "Want studying não funciona; use want to study."
                ]
            },
            {
                type: "practice",
                title: "Pattern Lab: Gerund or infinitive?",
                intro: "Escolha a estrutura exigida pela palavra anterior.",
                items: [
                    { kind: "complete", prompt: "I enjoy ____ short articles on my commute.", answer: "reading", hint: "ler" },
                    { kind: "complete", prompt: "We need ____ the password before Friday.", answer: "to change", hint: "mudar" },
                    { kind: "error", prompt: "She is good at to organize digital files.", answer: "She is good at organizing digital files.", hint: "Depois de at, use -ing." },
                    { kind: "choose", prompt: "Which sentence expresses purpose?", options: ["I use reminders to remember deadlines.", "I enjoy using reminders.", "I avoid reminders."], answer: "I use reminders to remember deadlines.", hint: "To remember explica a finalidade." },
                    { kind: "transform", prompt: "Una com infinitivo de propósito: I opened the app. I wanted to check the schedule.", answer: "I opened the app to check the schedule.", hint: "Use to + verbo base." },
                    { kind: "complete", prompt: "He keeps ____ the same weak password.", answer: "using", hint: "usando" },
                    { kind: "error", prompt: "They decided updating the website tonight.", answer: "They decided to update the website tonight.", hint: "Decide pede to + verbo base." }
                ]
            },
            {
                type: "practice",
                title: "Habit Lab: Cause and regular result",
                intro: "Use Zero Conditional para explicar o que normalmente acontece.",
                items: [
                    { kind: "complete", prompt: "If I turn off notifications, I ____ better.", answer: "concentrate", hint: "me concentro" },
                    { kind: "complete", prompt: "When the battery ____ below ten percent, the screen becomes darker.", answer: "drops", hint: "cai" },
                    { kind: "error", prompt: "If I will study with music, I lose focus.", answer: "If I study with music, I lose focus.", hint: "Resultado geral usa Present Simple nas duas partes." },
                    { kind: "transform", prompt: "Una com if: I write tasks down. I remember them more easily.", answer: "If I write tasks down, I remember them more easily.", hint: "Use Present Simple nas duas orações." },
                    { kind: "choose", prompt: "Which sentence describes a regular result?", options: ["When I update the app, it usually runs better.", "I will update the app tomorrow.", "I am updating the app at six."], answer: "When I update the app, it usually runs better.", hint: "Acontece normalmente." },
                    { kind: "reorder", prompt: "better / if / sleep / avoid / I / screens / late / I", answer: "I sleep better if I avoid screens late.", hint: "A condição também pode vir no final." },
                    { kind: "complete", prompt: "I use a calendar ____ keep all deadlines in one place.", answer: "to", hint: "para" }
                ]
            },
            {
                type: "reading",
                title: "One week with fewer notifications",
                genre: "Personal experiment report",
                paragraphs: [
                    "For one week, Marcus changed the notification settings on his phone. He did not want to stop using technology; he wanted to notice which alerts were useful and which ones interrupted him without a good reason. On Monday, he turned off shopping, news and social media notifications but kept calls, calendar reminders and messages from close family.",
                    "The first two days felt strange. Marcus kept reaching for his phone whenever the screen lit up, even when there was no sound. By Wednesday, he was checking it less often. If he left the phone face down while working, he completed tasks more quickly. When he used a twenty-minute timer to read, he usually finished the full session without opening another app.",
                    "At the end of the week, Marcus did not delete any social media accounts. Instead, he decided to check them at two planned times each day. He has continued using that routine because it gives him more control without making his phone less useful. The experiment showed him that changing a setting is easy, but changing an automatic habit takes longer."
                ],
                vocabulary: [
                    ["alerts", "alertas"],
                    ["interrupted", "interrompiam"],
                    ["reaching for", "pegando / estendendo a mão para"],
                    ["face down", "com a tela virada para baixo"],
                    ["automatic habit", "hábito automático"]
                ]
            },
            {
                type: "readingQuestions",
                title: "Reading Check: Notification experiment",
                questions: [
                    { question: "Which notifications did Marcus decide to keep?", answer: "He kept calls, calendar reminders and messages from close family." },
                    { question: "What habit continued during the first two days even without sound?", answer: "He continued reaching for his phone when the screen lit up." },
                    { question: "Which two actions helped him complete tasks or reading sessions?", answer: "Leaving the phone face down and using a twenty-minute timer helped him." },
                    { question: "What routine did Marcus choose instead of deleting his accounts?", answer: "He chose two planned times each day to check social media." },
                    { question: "What contrast did he notice at the end of the experiment?", answer: "Changing a setting was easy, but changing an automatic habit took longer." }
                ]
            },
            {
                type: "microReading",
                title: "Instructions and habit data",
                texts: [
                    { label: "App help", text: "To silence one group, open Settings, select Notifications and choose the app. Turn off Sound but keep Badges on if you still want to see the number of new items." },
                    { label: "Study log", text: "Monday: 4 interruptions in 20 minutes. Wednesday: 2 interruptions. Friday: 0 interruptions. The phone stayed face down during every session." },
                    { label: "Team tip", text: "If a message is truly urgent, call. When every message is marked urgent, people stop noticing the difference." }
                ],
                questions: [
                    { question: "Which setting can remain active while sound is off?", answer: "Badges can remain active." },
                    { question: "How did the number of interruptions change from Monday to Friday?", answer: "It fell from four interruptions to zero." },
                    { question: "Which condition remained the same during all study sessions?", answer: "The phone stayed face down." },
                    { question: "Why should teams avoid marking every message as urgent?", answer: "Because people stop recognizing which messages are truly urgent." }
                ]
            },
            {
                type: "translation",
                title: "Oral Translation: Habits and processes",
                items: [
                    { pt: "Eu gosto de ler artigos curtos no ônibus.", en: "I enjoy reading short articles on the bus." },
                    { pt: "Nós precisamos mudar a senha antes de sexta-feira.", en: "We need to change the password before Friday." },
                    { pt: "Ela usa um calendário para lembrar os prazos.", en: "She uses a calendar to remember deadlines." },
                    { pt: "Se eu desligo as notificações, eu me concentro melhor.", en: "If I turn off notifications, I concentrate better." },
                    { pt: "Quando a bateria fica fraca, o ícone fica vermelho.", en: "When the battery is low, the icon turns red." },
                    { pt: "Ele continua usando a mesma senha fraca.", en: "He keeps using the same weak password." },
                    { pt: "Eles decidiram atualizar o site esta noite.", en: "They decided to update the website tonight." }
                ]
            },
            {
                type: "speaking",
                title: "Speaking Round 1: Explain a digital process",
                label: "Step-by-step explanation",
                scenario: "Explique um processo para alguém que não consegue ver sua tela. Use comandos claros e confirme o resultado final.",
                languageBank: ["First, open...", "Then select...", "After that...", "Make sure...", "If you..., the app..."],
                rounds: [
                    { title: "Change notifications", prompt: "Open Settings → Notifications → choose app → turn off Sound → keep Badges on.", followUps: ["What happens if Badges stay on?", "How can the person confirm the change?"], model: "First, open Settings and select Notifications. Then choose the app and turn off Sound. Keep Badges on if you still want to see the number of new items." },
                    { title: "Create a calendar reminder", prompt: "Open calendar → choose date → add title and time → set alert → save.", followUps: ["Why is the alert useful?", "What should the person check before saving?"], model: "Open the calendar and choose the date. Add the title and time, set an alert, and check the details before you save it." },
                    { title: "Troubleshoot", prompt: "The setting did not change. Give two simple checks.", followUps: ["Use if for a regular result.", "Avoid inventing technical details."], model: "If the setting does not change, close and reopen the app. You should also check whether you selected the correct app in Notifications." }
                ],
                teacherFocus: ["Sequence language", "Clear imperatives", "Purpose and result"]
            },
            {
                type: "speaking",
                title: "Speaking Round 2: Interpret a habit survey",
                label: "Data-based discussion",
                scenario: "Use os dados para descrever tendências e recomendar uma mudança realista.",
                languageBank: ["most people", "a few people", "more often than", "If people..., they...", "I would recommend..."],
                rounds: [
                    { title: "Survey data", prompt: "20 learners: 14 check messages during study; 9 use a timer; 5 leave the phone in another room; 3 turn off all alerts.", followUps: ["Which habit is most common?", "Which is least common?"], model: "Most learners check messages during study, while only a few turn off all alerts. Using a timer is more common than leaving the phone in another room." },
                    { title: "Explain a result", prompt: "Connect one habit to a likely regular result using Zero Conditional.", followUps: ["Use Present Simple in both parts.", "Keep the result realistic."], model: "If learners check messages every few minutes, they lose concentration and take longer to finish a task." },
                    { title: "Recommendation", prompt: "Recommend one small change and explain why it is more realistic than an extreme solution.", followUps: ["Use gerund or infinitive correctly.", "Mention one limitation."], model: "I would recommend turning off sound during short study sessions. It is easier to maintain than deleting every app, and learners can still check important messages later." }
                ],
                teacherFocus: ["Quantifying information", "General cause and result", "Balanced recommendation"]
            },
            {
                type: "homework",
                title: "Homework: Explain a useful habit",
                deliverable: "Escolha um tema e prepare uma explicação oral com processo, propósito e dois resultados gerais.",
                options: [
                    { title: "A digital setting", prompt: "Ensine como alterar uma configuração útil em cinco etapas simples." },
                    { title: "A study routine", prompt: "Explique o que você gosta de fazer, o que evita e o que pretende mudar." },
                    { title: "A household process", prompt: "Explique uma tarefa cotidiana e o que normalmente acontece quando uma etapa é esquecida." }
                ],
                checklist: ["Use dois gerúndios e dois infinitivos.", "Inclua duas frases no Zero Conditional.", "Use marcadores de sequência."]
            }
        ]
    },
    {
        number: 9,
        unit: "Reading to Speaking",
        title: "Reading and Speaking Workshop",
        objective: "Desenvolver estratégias de leitura A2+ e transformar informações de textos em resumo, comparação e opinião oral.",
        focus: "Gist, detail, reference, inference, summary and discussion",
        cefr: "A2+ receptive-to-productive bridge",
        slides: [
            {
                type: "opening",
                title: "Reading and Speaking Workshop",
                objectives: [
                    "Localizar detalhes sem traduzir todas as palavras.",
                    "Identificar a que pronomes e expressões se referem.",
                    "Reconhecer contraste, causa e consequência.",
                    "Resumir informações e sustentar uma opinião simples."
                ],
                dialogue: {
                    title: "A broken lamp gets a second chance",
                    lines: [
                        ["Renata", "Are you throwing that lamp away?"],
                        ["Colin", "I was going to. It stopped working again."],
                        ["Renata", "The repair cafe is open at the library today."],
                        ["Colin", "Do they fix electrical items there?"],
                        ["Renata", "Volunteers help you examine them, but you repair the item together."],
                        ["Colin", "That sounds better than buying another lamp."],
                        ["Renata", "It may not be fixable, but at least they can explain the problem."],
                        ["Colin", "All right. I'll take it there before I decide what to do."]
                    ]
                }
            },
            {
                type: "languageBank",
                title: "Reading signals",
                intro: "Estas palavras mostram como uma informação se conecta à anterior.",
                items: [
                    { term: "however", meaning: "contraste", example: "The service is free. However, parts are not included." },
                    { term: "because", meaning: "causa", example: "People return because they learn practical skills." },
                    { term: "as a result", meaning: "consequência", example: "Fewer items become waste as a result." },
                    { term: "for example", meaning: "exemplo", example: "Some repairs are simple; for example, a loose wire." },
                    { term: "this / they / it", meaning: "referência", example: "The event grew. This surprised the organizers." },
                    { term: "overall", meaning: "síntese", example: "Overall, the project has had a positive effect." }
                ]
            },
            {
                type: "grammar",
                title: "Build a reliable summary",
                intro: "Um resumo curto seleciona ideia, evidência e resultado; ele não repete cada frase.",
                tables: [
                    {
                        title: "From text to summary",
                        headers: ["Step", "Question", "Useful frame"],
                        rows: [
                            ["Topic", "What is the text specifically about?", "The text describes..."],
                            ["Key point", "What changed, happened or was decided?", "The key point is that..."],
                            ["Evidence", "Which detail proves it?", "For example,..."],
                            ["Result", "Why does it matter?", "As a result,... / Overall,..."]
                        ]
                    },
                    {
                        title: "Reference check",
                        headers: ["Signal", "How to solve it", "Example"],
                        rows: [
                            ["it / they", "Look for a matching noun before it", "The volunteers checked the lamp. It needed a new cable."],
                            ["this / that", "Look for a whole previous idea", "Attendance doubled. This created a space problem."],
                            ["former / latter", "Identify the first and second option", "Repair or replace: the former creates less waste."],
                            ["however / therefore", "Check whether the idea contrasts or results", "Parts cost money; however, the help is free."]
                        ]
                    }
                ],
                notes: [
                    "Evite começar com The text talks about something. Nomeie o assunto de forma específica.",
                    "Uma opinião vem depois da compreensão e deve usar pelo menos uma informação do texto."
                ]
            },
            {
                type: "reading",
                title: "The repair cafe that outgrew its room",
                genre: "Local news feature",
                paragraphs: [
                    "Two years ago, the Westbrook Library started a monthly repair cafe in a small meeting room. Residents could bring broken household items and work with volunteers to examine them. The goal was not to offer a free professional repair service. Instead, volunteers wanted owners to understand the problem, learn a basic skill and decide whether an item was safe and practical to repair.",
                    "At the first event, only eleven people arrived. Last month, sixty-three residents brought lamps, fans, toys, small pieces of furniture and torn clothing. The increased attendance has created a new difficulty: the meeting room is no longer large enough. People sometimes wait in the corridor, and volunteers have too little table space for tools. However, the library does not want to limit the event because it has produced clear benefits. During the last twelve months, volunteers repaired or improved 418 items, and many visitors returned to help other residents.",
                    "The organizers are now considering two options. They could move the cafe to the sports hall, which is larger but farther from public transportation, or hold two smaller sessions at the library each month. A survey showed that older residents prefer the library location, while volunteers prefer the sports hall because equipment could remain there between events. The team will test two library sessions next month before making a permanent decision.",
                    "Whatever location they choose, the project has already changed local habits. Residents say they now check whether an object can be repaired before replacing it. Some have also started sharing tools with neighbors. As a result, the cafe has become both an environmental project and a place for practical community learning."
                ],
                vocabulary: [
                    ["residents", "moradores"],
                    ["torn clothing", "roupas rasgadas"],
                    ["corridor", "corredor"],
                    ["permanent", "permanente"],
                    ["replacing", "substituindo"]
                ]
            },
            {
                type: "readingQuestions",
                title: "Reading Check 1: Evidence and reference",
                questions: [
                    { question: "What were the three original goals of the repair cafe?", answer: "To help owners understand problems, learn basic skills and decide whether repair was safe and practical." },
                    { question: "Which figures show that the event has grown?", answer: "Attendance grew from eleven people at the first event to sixty-three last month." },
                    { question: "In the second paragraph, what does the increased attendance refer to?", answer: "It refers to the much larger number of residents coming to the repair cafe." },
                    { question: "Why do volunteers prefer the sports hall?", answer: "Because it has more space and equipment could remain there between events." },
                    { question: "Which option will the team test before making a permanent decision?", answer: "It will test holding two library sessions in one month." }
                ]
            },
            {
                type: "readingQuestions",
                title: "Reading Check 2: Meaning and inference",
                questions: [
                    { question: "Why does the library not simply reduce the number of visitors?", answer: "Because the event has produced clear environmental, practical and community benefits." },
                    { question: "What can we infer about public transportation near the library?", answer: "It is probably easier to reach by public transportation than the sports hall." },
                    { question: "Which contrast is introduced by however in paragraph two?", answer: "Space is becoming a problem, but the library still does not want to limit the successful event." },
                    { question: "How has the project influenced behavior outside the monthly event?", answer: "Residents now consider repair before replacement and share tools with neighbors." },
                    { question: "Which title best reflects the complete article: A Free Repair Shop, A Growing Project Faces a Space Decision, or Why Libraries Should Close Meeting Rooms?", answer: "A Growing Project Faces a Space Decision best reflects the article." }
                ]
            },
            {
                type: "practice",
                title: "Text Evidence Lab",
                intro: "Responda usando palavras do texto e explique onde a evidência aparece.",
                items: [
                    { kind: "match", prompt: "418 items", answer: "The number of items repaired or improved during the last twelve months.", hint: "Procure o número no segundo parágrafo." },
                    { kind: "match", prompt: "sixty-three residents", answer: "The attendance at last month's repair cafe.", hint: "Compare com o primeiro evento." },
                    { kind: "reference", prompt: "The library does not want to limit the event because it has produced clear benefits. What does it refer to?", answer: "It refers to the repair cafe/event.", hint: "Procure um substantivo singular anterior." },
                    { kind: "connector", prompt: "Replace However with another connector that keeps the contrast.", answer: "Nevertheless / Even so / But", hint: "Mantenha a ideia de contraste." },
                    { kind: "sequence", prompt: "Order the decision process: permanent decision / survey / test two sessions / identify two options", answer: "identify two options → survey → test two sessions → permanent decision", hint: "A decisão permanente vem por último." },
                    { kind: "summary", prompt: "Complete: The project is successful, but it now needs to decide ____.", answer: "where and how often to hold the repair cafe because the current room is too small", hint: "Inclua o problema de espaço." }
                ]
            },
            {
                type: "practice",
                title: "Summary Repair Lab",
                intro: "Escolha informações centrais e elimine detalhes que não sustentam o resumo.",
                items: [
                    { kind: "choose", prompt: "Which detail is essential in a two-sentence summary?", options: ["The event grew and now needs more space.", "Some visitors brought fans.", "The corridor is inside the library."], answer: "The event grew and now needs more space.", hint: "Escolha a mudança que organiza o artigo." },
                    { kind: "error", prompt: "The article is about a library with a corridor and some tables.", answer: "The article describes a successful repair cafe that has outgrown its current library space.", hint: "O resumo precisa nomear projeto, sucesso e problema." },
                    { kind: "transform", prompt: "Combine: Attendance increased. The room became too small. Use as a result.", answer: "Attendance increased; as a result, the room became too small.", hint: "A segunda ideia é consequência da primeira." },
                    { kind: "transform", prompt: "Combine the two preferences with while: Older residents prefer the library. Volunteers prefer the sports hall.", answer: "Older residents prefer the library, while volunteers prefer the sports hall.", hint: "While apresenta contraste." },
                    { kind: "summary", prompt: "Write one sentence with the tested solution and the reason for testing it.", answer: "The team will test two monthly library sessions because this may solve the space problem without moving to a less accessible location.", hint: "Inclua solução temporária e motivo." },
                    { kind: "choose", prompt: "Which closing sentence reflects the article's broader result?", options: ["The project has changed repair habits and strengthened community learning.", "The sports hall has a large door.", "Every broken object can be repaired."], answer: "The project has changed repair habits and strengthened community learning.", hint: "Use o último parágrafo." }
                ]
            },
            {
                type: "microReading",
                title: "Three voices about the location",
                texts: [
                    { label: "Older resident", text: "I can walk to the library, and the bus stops outside. I support two sessions because moving the event would make it harder for me to attend." },
                    { label: "Volunteer", text: "The sports hall has strong tables, storage and better ventilation. We lose time carrying tools to the library every month." },
                    { label: "Library manager", text: "Two sessions may reduce crowding, but they will require more volunteer hours. We need to test whether the team can support both dates." }
                ],
                questions: [
                    { question: "Which practical advantage matters most to the resident?", answer: "Easy access by walking and bus matters most." },
                    { question: "What repeated task frustrates the volunteer?", answer: "Carrying tools to and from the library every month." },
                    { question: "What resource concerns the library manager?", answer: "The number of volunteer hours needed for two sessions." },
                    { question: "Which option satisfies the resident but may create a staffing problem?", answer: "Holding two library sessions." }
                ]
            },
            {
                type: "translation",
                title: "Oral Translation: Connect and summarize",
                items: [
                    { pt: "O projeto cresceu; por isso, a sala ficou pequena demais.", en: "The project grew; as a result, the room became too small." },
                    { pt: "Os moradores preferem a biblioteca, enquanto os voluntários preferem o ginásio.", en: "Residents prefer the library, while volunteers prefer the sports hall." },
                    { pt: "No entanto, a biblioteca não quer limitar o evento.", en: "However, the library does not want to limit the event." },
                    { pt: "Por exemplo, muitos moradores agora compartilham ferramentas.", en: "For example, many residents now share tools." },
                    { pt: "O ponto principal é que o projeto precisa de mais espaço.", en: "The key point is that the project needs more space." },
                    { pt: "De modo geral, o café de reparos mudou hábitos locais.", en: "Overall, the repair cafe has changed local habits." }
                ]
            },
            {
                type: "speaking",
                title: "Speaking Round 1: A 60-second summary",
                label: "Reading-to-speaking",
                scenario: "Resuma o artigo sem olhar para o texto completo. Use apenas quatro notas: origem, crescimento, problema e próximo passo.",
                languageBank: ["The article describes...", "It started...", "The key problem is...", "The team is considering...", "Overall..."],
                rounds: [
                    { title: "Opening", prompt: "Introduce the project and its original purpose in one or two sentences.", followUps: ["Avoid vague openings.", "Name the project specifically."], model: "The article describes a monthly repair cafe at Westbrook Library. It helps residents examine broken items and learn basic repair skills." },
                    { title: "Development", prompt: "Explain how success created a new problem and mention one piece of evidence.", followUps: ["Use a number from the text.", "Connect cause and result."], model: "Attendance grew from eleven people to sixty-three, so the original meeting room is no longer large enough." },
                    { title: "Decision and result", prompt: "Present the two options, the test and one wider effect of the project.", followUps: ["Use while for the two preferences.", "Finish with overall."], model: "The team is comparing the sports hall with two monthly library sessions. It will test the second option first. Overall, the project has reduced waste and encouraged neighbors to share skills." }
                ],
                teacherFocus: ["Selection of key information", "Connectors", "60-second coherence"]
            },
            {
                type: "speaking",
                title: "Speaking Round 2: Recommend a location",
                label: "Text-based discussion",
                scenario: "Escolha uma solução usando evidências dos quatro pontos de vista: artigo, morador, voluntário e gerente.",
                languageBank: ["According to...", "I see the advantage, but...", "The strongest evidence is...", "A possible solution is...", "For that reason..."],
                rounds: [
                    { title: "Compare", prompt: "Give one advantage and one disadvantage for each location plan.", followUps: ["Mention access.", "Mention tools or volunteer time."], model: "The sports hall offers more space and storage, but it is harder to reach. Two library sessions preserve access, but they require more volunteer hours." },
                    { title: "Choose", prompt: "Recommend one plan for the next three months, not forever.", followUps: ["Use evidence from at least two voices.", "Recognize one limitation."], model: "I recommend testing two library sessions because access matters to residents. However, the manager's concern about volunteer hours is valid, so the test should last only three months." },
                    { title: "Respond", prompt: "The teacher disagrees and supports the sports hall. Respond politely and defend your evidence.", followUps: ["Use I see your point, but...", "Do not repeat your first sentence unchanged."], model: "I see your point, and storage would be easier there. However, the survey shows that some residents may not attend if the event moves, so accessibility should be tested first." }
                ],
                teacherFocus: ["Using evidence", "Polite disagreement", "Responsive interaction"]
            },
            {
                type: "speaking",
                title: "Speaking Round 3: Transfer the idea",
                label: "Independent response",
                scenario: "Aplique o mesmo raciocínio a um novo projeto comunitário sem repetir frases do artigo.",
                languageBank: ["The project aims to...", "The difficulty is...", "One option would be...", "This would help because...", "The trade-off is..."],
                rounds: [
                    { title: "Community class", prompt: "A free evening class has too many students for one room. Suggest two realistic options.", followUps: ["Mention access and teacher time.", "Choose a temporary test."], model: "The class could move to a larger building or offer two smaller sessions. I would test two sessions first because students already know the location, although the teacher would need more time." },
                    { title: "Tool-sharing shelf", prompt: "A neighborhood tool shelf is popular, but some tools are not returned on time.", followUps: ["Identify cause and result.", "Propose one practical rule."], model: "The shelf is useful, but late returns leave other residents without tools. A simple booking list and a three-day limit could make the system fairer." },
                    { title: "Short conclusion", prompt: "Explain what both new projects have in common with the repair cafe.", followUps: ["Use both and as a result.", "Finish in two sentences."], model: "Both projects became harder to manage because more people started using them. As a result, success created a need for clearer organization." }
                ],
                teacherFocus: ["Transfer of reading ideas", "Independent wording", "Follow-up response"]
            },
            {
                type: "homework",
                title: "Homework: Read, select and speak",
                deliverable: "Escolha um tema, leia um texto curto confiável ou use um texto fornecido pelo professor e prepare um resumo oral de 75 segundos.",
                options: [
                    { title: "A local project", prompt: "Resuma objetivo, resultado, dificuldade e próximo passo de uma iniciativa comunitária." },
                    { title: "A practical change", prompt: "Resuma um texto sobre transporte, trabalho ou tecnologia e destaque causa e consequência." },
                    { title: "Two viewpoints", prompt: "Compare duas opiniões curtas sobre uma decisão cotidiana e recomende uma opção." }
                ],
                checklist: ["Selecione quatro informações centrais.", "Use três conectores diferentes.", "Prepare duas respostas para possíveis perguntas do professor."]
            }
        ]
    },
    {
        number: 10,
        unit: "Final Readiness Check",
        title: "B1 Readiness Challenge",
        objective: "Avaliar de forma integrada leitura, controle gramatical, tradução oral, narrativa, interação e organização da fala.",
        focus: "Integrated A1-A2 control for the transition to B1",
        cefr: "A2+ exit performance",
        slides: [
            {
                type: "opening",
                title: "B1 Readiness Challenge",
                objectives: [
                    "Recuperar estruturas de A1 e A2 sem depender de uma única regra por vez.",
                    "Ler textos narrativos e práticos com perguntas variadas.",
                    "Sustentar entrevistas, histórias e role-plays ao vivo.",
                    "Comparar o desempenho final com o diagnóstico da lição 1."
                ],
                dialogue: {
                    title: "A full update before a busy weekend",
                    lines: [
                        ["Leila", "Have you finished preparing for the neighborhood event yet?"],
                        ["Ben", "Almost. I printed the signs yesterday, but I haven't collected the name tags."],
                        ["Leila", "Who is picking them up?"],
                        ["Ben", "I am meeting the printer at five, unless the afternoon meeting runs late."],
                        ["Leila", "What will you do if that happens?"],
                        ["Ben", "I will ask Priya to collect them because she works nearby."],
                        ["Leila", "Good. The new room is larger than the old one, but visitors may need directions."],
                        ["Ben", "I have already prepared a simple map, and I am going to put copies near both entrances."]
                    ]
                }
            },
            {
                type: "assessment",
                title: "How the final challenge works",
                intro: "Use a mesma escala em todas as estações. O objetivo é observar controle e comunicação, não perfeição.",
                criteria: [
                    { name: "Accuracy", descriptor: "Seleciona estruturas frequentes de acordo com tempo e significado." },
                    { name: "Range", descriptor: "Recupera vocabulário e expressões de diferentes contextos cotidianos." },
                    { name: "Fluency", descriptor: "Mantém respostas de 60–90 segundos com pausas administráveis." },
                    { name: "Interaction", descriptor: "Responde, pergunta, confirma e repara mal-entendidos." },
                    { name: "Coherence", descriptor: "Organiza ideias em uma sequência conectada." }
                ]
            },
            {
                type: "grammar",
                title: "Rapid review before the stations",
                intro: "Use os marcadores para escolher o quadro correto rapidamente.",
                tables: [
                    {
                        title: "Time and meaning map",
                        headers: ["Signal", "Likely choice", "Example"],
                        rows: [
                            ["usually / every week", "Present Simple", "She usually checks the list."],
                            ["yesterday / last month", "Past Simple", "They moved the event yesterday."],
                            ["while / when", "Past Continuous + Past Simple", "I was printing when she called."],
                            ["ever / already / yet", "Present Perfect", "Have you finished yet?"],
                            ["fixed time tomorrow", "Present Continuous", "We are meeting at five."],
                            ["if + possible future", "Present Simple + will", "If it rains, we will move inside."]
                        ]
                    },
                    {
                        title: "Function map",
                        headers: ["Need", "Useful tool", "Example"],
                        rows: [
                            ["Compare", "comparative / superlative", "The new room is larger."],
                            ["Advise", "should", "You should add another sign."],
                            ["State a rule", "must / have to", "Visitors must use the main entrance."],
                            ["Request", "could", "Could you check the booking?"],
                            ["Explain purpose", "to + base verb", "We made a map to help visitors."]
                        ]
                    }
                ],
                notes: [
                    "Leia o contexto inteiro antes de escolher a forma.",
                    "Quando perceber um erro, reformule e continue; não abandone a resposta."
                ]
            },
            {
                type: "practice",
                title: "Station 1: Mixed Accuracy Check",
                intro: "Cada item recupera um ponto diferente. Não há sequência de respostas iguais.",
                items: [
                    { kind: "complete", prompt: "My coworker usually ____ the first train.", answer: "takes", hint: "pega" },
                    { kind: "error", prompt: "Did you sent the confirmation yesterday?", answer: "Did you send the confirmation yesterday?", hint: "Depois de did, use verbo base." },
                    { kind: "complete", prompt: "I ____ checking the list when the printer called.", answer: "was", hint: "estava" },
                    { kind: "choose", prompt: "We haven't collected the name tags ____.", options: ["yet", "yesterday", "last"], answer: "We haven't collected the name tags yet.", hint: "Ainda não aconteceu." },
                    { kind: "complete", prompt: "The new room is ____ than the old one.", answer: "larger", hint: "maior" },
                    { kind: "error", prompt: "Visitors don't have block the side door.", answer: "Visitors mustn't block the side door.", hint: "A frase expressa proibição." }
                ]
            },
            {
                type: "practice",
                title: "Station 2: Meaning and Response Check",
                intro: "Produza a frase que resolve a situação, não apenas uma forma isolada.",
                items: [
                    { kind: "transform", prompt: "Faça um pedido educado: check the room booking", answer: "Could you check the room booking, please?", hint: "Use Could you." },
                    { kind: "complete", prompt: "If the meeting runs late, I ____ Priya for help.", answer: "will ask", hint: "pedirei" },
                    { kind: "error", prompt: "She enjoys to organize community events.", answer: "She enjoys organizing community events.", hint: "Enjoy pede verbo com -ing." },
                    { kind: "reorder", prompt: "already / the map / has / Ben / prepared / ?", answer: "Has Ben already prepared the map?", hint: "Comece com Has Ben." },
                    { kind: "transform", prompt: "Una com propósito: We printed signs. We wanted to guide visitors.", answer: "We printed signs to guide visitors.", hint: "Use to + verbo base." },
                    { kind: "choose", prompt: "Which response confirms information?", options: ["Just to confirm, the side entrance opens at six, right?", "Open the side entrance.", "The side entrance is blue."], answer: "Just to confirm, the side entrance opens at six, right?", hint: "A pessoa repete o dado e pede confirmação." }
                ]
            },
            {
                type: "reading",
                title: "The event that almost changed location",
                genre: "Integrated narrative",
                paragraphs: [
                    "The Oakview Neighborhood Association planned its annual skills exchange for Saturday morning. Residents were going to offer short demonstrations on bicycle repair, basic cooking, gardening and computer safety. More than eighty people registered, so the association moved the event from a small cafe to the community center.",
                    "On Friday afternoon, the organizer, Leila, received a message saying that a water pipe broke in the center's main hall. While maintenance workers were examining the damage, Leila called the building manager and asked whether another room was available. The upstairs meeting room was dry and large enough, but it had only one narrow entrance and was difficult to reach with heavy equipment.",
                    "Leila considered cancelling the event, but two volunteers suggested a different arrangement. They moved the cooking and gardening demonstrations to the covered courtyard and kept the computer and bicycle sessions upstairs. If a visitor needed the elevator, a volunteer would meet that person at reception and show the safest route. The team updated the event page, sent a message to every registered visitor and placed signs at both entrances.",
                    "The next morning, the event opened only fifteen minutes late. A few visitors went to the wrong room at first, but volunteers redirected them quickly. By lunchtime, forty people joined demonstrations, and several residents offered to teach a skill at the next exchange. The broken pipe created extra work, but it also showed that the team could communicate clearly and adapt without losing the purpose of the event."
                ],
                vocabulary: [
                    ["skills exchange", "troca de habilidades"],
                    ["water pipe", "cano de água"],
                    ["narrow", "estreito"],
                    ["courtyard", "pátio"],
                    ["redirected", "redirecionaram"]
                ]
            },
            {
                type: "readingQuestions",
                title: "Station 3: Narrative Reading Check",
                questions: [
                    { question: "Why did the association change the original location?", answer: "Because more than eighty people registered and the cafe was too small." },
                    { question: "What was happening when Leila contacted the building manager?", answer: "Maintenance workers were examining the damage from the broken pipe." },
                    { question: "Which two disadvantages did the upstairs room have?", answer: "It had a narrow entrance and was difficult to reach with heavy equipment." },
                    { question: "How did the team divide the four demonstrations?", answer: "Cooking and gardening moved to the courtyard; computer safety and bicycle repair stayed upstairs." },
                    { question: "Which details show that the adapted event succeeded?", answer: "It opened only fifteen minutes late, forty people joined demonstrations, and residents volunteered for the next event." },
                    { question: "What did the problem reveal about the organizing team?", answer: "It revealed that the team could communicate clearly and adapt while preserving the event's purpose." }
                ]
            },
            {
                type: "microReading",
                title: "Station 4: Practical Reading Scan",
                texts: [
                    { label: "Updated program", text: "9:15 — doors open. 9:30 — computer safety, Room 2. 10:15 — bicycle repair, Room 3. 10:30 — basic cooking, covered courtyard. 11:20 — gardening, covered courtyard." },
                    { label: "Access notice", text: "The main stairs are open. Visitors using the elevator should check in at reception. Large bicycles must enter through the parking-lot door beside the loading area." },
                    { label: "Visitor message", text: "Your registration remains valid. You do not have to register again. Bring your confirmation email, and arrive fifteen minutes before your first session." },
                    { label: "Weather update", text: "Light rain is possible after noon. Morning courtyard sessions will continue under the permanent roof." }
                ],
                questions: [
                    { question: "Where and when is the computer safety session?", answer: "It is in Room 2 at 9:30." },
                    { question: "Which door should visitors with large bicycles use?", answer: "They should use the parking-lot door beside the loading area." },
                    { question: "What does a registered visitor not need to do again?", answer: "The visitor does not need to register again." },
                    { question: "Why can the morning courtyard sessions continue in light rain?", answer: "Because the courtyard has a permanent roof." },
                    { question: "How early should a visitor arrive?", answer: "The visitor should arrive fifteen minutes before the first session." }
                ]
            },
            {
                type: "teacherListening",
                title: "Station 5: Teacher-read Update",
                setup: "O professor lê o anúncio uma vez para ideia geral e outra para detalhes. O aluno responde sem ver o roteiro.",
                script: "Good morning, everyone. The gardening session will still begin at 11:20, but it is moving from the courtyard to Room 4 because the instructor needs a projector. If you registered for bicycle repair, please leave your bicycle near the parking-lot entrance before going upstairs. Finally, the cooking demonstration is full, so only visitors with a green ticket can enter that area.",
                questions: [
                    { question: "Which session is changing location?", answer: "The gardening session is changing location." },
                    { question: "Why is it moving to Room 4?", answer: "Because the instructor needs a projector." },
                    { question: "Where should bicycles be left?", answer: "They should be left near the parking-lot entrance." },
                    { question: "Who may enter the cooking demonstration?", answer: "Only visitors with a green ticket may enter." }
                ]
            },
            {
                type: "translation",
                title: "Station 6: Oral Translation Mix",
                items: [
                    { pt: "Mais de oitenta pessoas já se inscreveram.", en: "More than eighty people have already registered." },
                    { pt: "Os funcionários estavam examinando o dano quando Leila ligou.", en: "The workers were examining the damage when Leila called." },
                    { pt: "A sala de cima é grande o suficiente, mas a entrada é estreita.", en: "The upstairs room is large enough, but the entrance is narrow." },
                    { pt: "Se um visitante precisar do elevador, um voluntário ajudará.", en: "If a visitor needs the elevator, a volunteer will help." },
                    { pt: "Você não precisa se inscrever novamente.", en: "You don't have to register again." },
                    { pt: "Você poderia me mostrar o caminho mais seguro?", en: "Could you show me the safest route?" },
                    { pt: "Eles mudaram as atividades para manter o evento aberto.", en: "They moved the activities to keep the event open." },
                    { pt: "De modo geral, a equipe se adaptou sem perder o objetivo.", en: "Overall, the team adapted without losing the purpose." }
                ]
            },
            {
                type: "speaking",
                title: "Station 7: Familiar-topic interview",
                label: "Unprepared interaction",
                scenario: "O professor escolhe um tema familiar e faz perguntas de continuação que não aparecem antecipadamente.",
                languageBank: ["In general...", "One example is...", "It depends on...", "The main reason is...", "What about you?"],
                rounds: [
                    { title: "Routine and change", prompt: "Describe one routine that has changed during the last year.", followUps: ["What caused the change?", "Is the new routine better? Why?"], model: "My weekday routine has changed because I started working earlier. I now prepare lunch the night before, which makes the morning less stressful." },
                    { title: "Experience", prompt: "Describe one useful experience from work, study or daily life.", followUps: ["When did it happen?", "What have you done differently since then?"], model: "I have learned to organize small events. I helped with my first one last year, and since then I have become better at checking details early." },
                    { title: "Ask back", prompt: "Continue the interaction by asking the professor two relevant questions.", followUps: ["Use information from the professor's previous answer.", "Avoid changing to an unrelated topic."], model: "When did you first have that experience? Has it changed the way you work now?" }
                ],
                teacherFocus: ["Spontaneous follow-up", "Connected answer", "Topic maintenance"]
            },
            {
                type: "speaking",
                title: "Station 8: Narrative challenge",
                label: "Past story",
                scenario: "Crie uma história coerente usando todos os cartões, sem ler um modelo antes da tentativa.",
                languageBank: ["At first", "while", "when", "because", "a few minutes later", "in the end"],
                rounds: [
                    { title: "Beginning", prompt: "Friday afternoon — carrying event signs — walking toward community center — receives urgent message", followUps: ["What was the person doing?", "What did the message say?"], model: "On Friday afternoon, I was carrying event signs toward the community center when I received an urgent message about a broken pipe." },
                    { title: "Problem and action", prompt: "main hall unavailable — calls manager — compares two rooms — asks volunteers for help", followUps: ["Why was one room difficult?", "What decision did the team make?"], model: "The main hall was unavailable, so I called the manager and compared two alternatives. One room was hard to access, but volunteers helped divide the activities." },
                    { title: "Ending", prompt: "updates visitors — event opens late — visitors participate — lesson learned", followUps: ["Use one number or concrete detail.", "Finish with the lesson learned."], model: "We updated the visitors, and the event opened only fifteen minutes late. In the end, the activities were successful, and we learned that clear communication makes adaptation easier." }
                ],
                teacherFocus: ["Tense control", "Story arc", "Specific detail"]
            },
            {
                type: "speaking",
                title: "Station 9: Planning and decision role-play",
                label: "Future problem-solving",
                scenario: "O aluno organiza uma pequena atividade. O professor introduz duas mudanças durante a conversa.",
                languageBank: ["We are meeting...", "We are going to...", "If..., we will...", "Could we... instead?", "Just to confirm..."],
                rounds: [
                    { title: "Initial plan", prompt: "Community class next Saturday; six participants; library room available from 2 to 4.", followUps: ["Set a meeting time.", "Explain what you are going to prepare."], model: "We are meeting at the library at 1:45, and I am going to prepare the materials on Friday." },
                    { title: "Change 1", prompt: "The library room is only available from 3 to 5.", followUps: ["Reschedule politely.", "Confirm the new arrangement."], model: "Could we start at three instead? Just to confirm, we are now meeting at 2:45 and using the room until five." },
                    { title: "Change 2", prompt: "Two more participants register, but there are only six chairs.", followUps: ["Create a conditional solution.", "Make one immediate decision."], model: "If two more people attend, we will need extra chairs. I'll call the community center now and ask whether we can borrow them." }
                ],
                teacherFocus: ["Future forms", "Response to change", "Confirmation"]
            },
            {
                type: "speaking",
                title: "Station 10: Service recovery role-play",
                label: "Travel interaction",
                scenario: "O aluno precisa resolver um problema sem aceitar uma solução que não atende à necessidade principal.",
                languageBank: ["There seems to be...", "I need... because...", "Could you...?", "That option won't work because...", "Is there another option?"],
                rounds: [
                    { title: "Problem", prompt: "Hotel room not ready; online appointment in thirty minutes; lobby is noisy.", followUps: ["Explain why waiting in the lobby is not enough.", "Ask for one specific facility."], model: "There seems to be a delay with my room. I have an online appointment in thirty minutes, so the lobby won't be quiet enough. Could I use a meeting room?" },
                    { title: "First offer", prompt: "The clerk offers luggage storage but no quiet place.", followUps: ["Acknowledge the offer.", "Repeat the unsolved need politely."], model: "Thank you, luggage storage is helpful, but I still need a quiet place with internet. Is there a business lounge or another room I could use?" },
                    { title: "Solution", prompt: "A small office is available for forty minutes. Confirm access, Wi-Fi and what happens to the bags.", followUps: ["Ask three confirmation questions.", "Close the conversation naturally."], model: "That solution works. Just to confirm, where do I collect the key, how do I access the Wi-Fi, and will my bags be sent to the room later? Thank you for your help." }
                ],
                teacherFocus: ["Maintaining the need", "Politeness", "Clarification and closure"]
            },
            {
                type: "speaking",
                title: "Station 11: Reading-to-speaking response",
                label: "Summary and opinion",
                scenario: "Resuma a leitura principal e responda a uma pergunta do professor usando evidência do texto.",
                languageBank: ["The text describes...", "The problem began when...", "The team responded by...", "This worked because...", "In my view..."],
                rounds: [
                    { title: "Summary", prompt: "Give a 60-second summary with plan, problem, response and result.", followUps: ["Do not list every detail.", "Use at least three connectors."], model: "The text describes a neighborhood event that almost changed location after a pipe broke. The team divided the activities, updated visitors and created an access plan. As a result, the event opened only fifteen minutes late and remained successful." },
                    { title: "Evidence question", prompt: "Which team decision was most important, and which detail supports your answer?", followUps: ["Cite a concrete result.", "Recognize another useful action."], model: "Dividing the activities was the most important decision because it kept all four sessions open. The signs and visitor messages were also useful because only a few people went to the wrong room." },
                    { title: "Transfer", prompt: "Give one recommendation for a different event facing a last-minute location problem.", followUps: ["Use should.", "Add an if sentence."], model: "Organizers should update every communication channel immediately. If access changes, they should place a person and a clear sign at the original entrance." }
                ],
                teacherFocus: ["Summary selection", "Evidence", "Independent transfer"]
            },
            {
                type: "assessment",
                title: "Final Snapshot: Compare with Lesson 1",
                intro: "Registre o desempenho e compare com o Baseline Snapshot. Use exemplos observados, não apenas uma impressão geral.",
                criteria: [
                    { name: "Accuracy", descriptor: "Alterna presente, passado, experiência, futuro e modais com controle suficiente." },
                    { name: "Range", descriptor: "Usa vocabulário de rotina, narrativa, decisão, regras, tecnologia e serviços." },
                    { name: "Fluency", descriptor: "Mantém respostas de 60–90 segundos e consegue reformular após um erro." },
                    { name: "Interaction", descriptor: "Faz perguntas, responde a mudanças e confirma entendimento." },
                    { name: "Coherence", descriptor: "Conecta uma sequência linear com razões, exemplos e resultados." }
                ]
            },
            {
                type: "homework",
                title: "Homework: Prepare the first B1 contribution",
                deliverable: "Escolha um tema e prepare uma fala de 90 segundos com abertura, dois pontos desenvolvidos, exemplo e conclusão.",
                options: [
                    { title: "A change that helped", prompt: "Conte uma mudança de rotina, explique o resultado atual e dê uma recomendação." },
                    { title: "A practical problem solved", prompt: "Narre o problema, descreva decisões e explique o que faria se acontecesse novamente." },
                    { title: "A supported opinion", prompt: "Compare duas opções cotidianas e defenda uma usando critérios e evidências." }
                ],
                checklist: ["Use pelo menos três tempos ou funções diferentes.", "Inclua um exemplo concreto e uma razão.", "Prepare duas perguntas para continuar a conversa no B1."]
            }
        ]
    }
];
