(function () {
    "use strict";

    const lessons = [];

    function expressionItems(items) {
        return items.map(([term, meaning, example]) => ({ term, meaning, example }));
    }

    function q(kind, prompt, hint, answer, options) {
        return options ? { kind, prompt, hint, answer, options } : { kind, prompt, hint, answer };
    }

    function tr(pt, en) {
        return { pt, en };
    }

    function rq(question, answer) {
        return { question, answer };
    }

    function dialogue(title, context, lines) {
        return { title, context, lines };
    }

    function homeworkOption(title, prompt) {
        return { title, prompt };
    }

    function createNormalLesson(spec) {
        const slides = [
            {
                type: "opening",
                title: spec.title,
                objectives: spec.objectives,
                dialogue: spec.opening
            },
            {
                type: "vocabulary",
                title: spec.vocabTitle || `Vocabulary: ${spec.title}`,
                intro: spec.vocabIntro,
                items: spec.vocabulary
            },
            {
                type: "grammar",
                title: spec.grammar.title,
                intro: spec.grammar.intro,
                tables: spec.grammar.tables,
                notes: spec.grammar.notes
            },
            {
                type: "practice",
                title: spec.practiceTitle || "Practice Time",
                intro: spec.practiceIntro || "Complete, reorganize, transform or correct each item. Reveal the answer only after the student's attempt.",
                items: spec.practice
            },
            {
                type: "translation",
                title: spec.translationTitle || "Oral Translation: Core Language",
                items: spec.translations
            },
            {
                type: "languageBank",
                title: spec.expressionTitle || "Useful Expressions and Phrasal Verbs",
                intro: spec.expressionIntro,
                items: expressionItems(spec.expressions)
            },
            {
                type: "dialogues",
                title: spec.dialogueTitle || "Four Everyday Mini Dialogues",
                intro: spec.dialogueIntro,
                dialogues: spec.dialogues
            },
            {
                type: "reading",
                title: spec.reading.title,
                genre: spec.reading.genre,
                paragraphs: spec.reading.paragraphs,
                vocabulary: spec.reading.vocabulary,
                questions: spec.reading.questions
            }
        ];

        if (spec.listening) {
            slides.push({
                type: "teacherListening",
                title: spec.listening.title,
                setup: spec.listening.setup,
                script: spec.listening.script,
                questions: spec.listening.questions
            });
        }

        slides.push(
            {
                type: "translation",
                title: spec.expressionTranslationTitle || "Oral Translation: Expressions in Context",
                items: spec.expressionTranslations
            },
            {
                type: "speaking",
                label: "Speaking studio",
                title: spec.speaking.title,
                scenario: spec.speaking.scenario,
                languageBank: spec.speaking.languageBank,
                rounds: spec.speaking.rounds,
                teacherFocus: spec.speaking.teacherFocus
            },
            {
                type: "music",
                title: `Music Moment: ${spec.music.song}`,
                ...spec.music
            },
            {
                type: "homework",
                title: spec.homework.title,
                deliverable: spec.homework.deliverable,
                options: spec.homework.options,
                checklist: spec.homework.checklist
            }
        );

        return {
            number: spec.number,
            unit: spec.unit,
            title: spec.title,
            objective: spec.objective,
            focus: spec.focus,
            cefr: spec.cefr,
            slides
        };
    }

    function createReviewLesson(spec) {
        return {
            number: spec.number,
            unit: spec.unit,
            title: spec.title,
            objective: spec.objective,
            focus: spec.focus,
            cefr: spec.cefr,
            slides: [
                { type: "opening", title: spec.title, objectives: spec.objectives, dialogue: spec.opening },
                { type: "grammar", title: spec.grammar.title, intro: spec.grammar.intro, tables: spec.grammar.tables, notes: spec.grammar.notes },
                { type: "practice", title: spec.stationOne.title, intro: spec.stationOne.intro, items: spec.stationOne.items },
                { type: "practice", title: spec.stationTwo.title, intro: spec.stationTwo.intro, items: spec.stationTwo.items },
                { type: "reading", title: spec.reading.title, genre: spec.reading.genre, paragraphs: spec.reading.paragraphs, vocabulary: spec.reading.vocabulary, questions: spec.reading.questions },
                { type: "teacherListening", title: spec.listening.title, setup: spec.listening.setup, script: spec.listening.script, questions: spec.listening.questions },
                { type: "translation", title: spec.translation.title, items: spec.translation.items },
                { type: "speaking", label: "Review challenge", title: spec.speaking.title, scenario: spec.speaking.scenario, languageBank: spec.speaking.languageBank, rounds: spec.speaking.rounds, teacherFocus: spec.speaking.teacherFocus },
                { type: "assessment", title: spec.assessment.title, intro: spec.assessment.intro, criteria: spec.assessment.criteria },
                { type: "homework", title: spec.homework.title, deliverable: spec.homework.deliverable, options: spec.homework.options, checklist: spec.homework.checklist }
            ]
        };
    }

    // BLOCK 1: TIME, CHANGE AND POSSIBILITY
    lessons.push(createNormalLesson({
        number: 1,
        unit: "Block 1: Time, Change and Possibility",
        title: "Defining Moments",
        objective: "Consolidar a diferença entre experiências conectadas ao presente e acontecimentos concluídos em momentos específicos.",
        focus: "Past Simple vs Present Perfect",
        cefr: "B1: descreve experiências e acrescenta detalhes de tempo em uma sequência conectada.",
        objectives: [
            "Distinguir experiências gerais de acontecimentos concluídos.",
            "Usar Present Perfect para introduzir uma experiência e Past Simple para contar os detalhes.",
            "Narrar uma decisão importante com sequência, resultado e reflexão.",
            "Usar vocabulário sobre mudanças, oportunidades e consequências."
        ],
        opening: {
            title: "A new city, one year later",
            lines: [
                ["Anna", "I heard you moved to Brighton last year. What made you decide to go?"],
                ["Daniel", "I received a job offer in March, and I decided to take the risk."],
                ["Anna", "Was it difficult to leave your friends behind?"],
                ["Daniel", "Very difficult. The first month was lonely, but things slowly improved."],
                ["Anna", "And how has life changed since then?"],
                ["Daniel", "I have made close friends, learned to live on my own and become more confident."],
                ["Anna", "Do you ever regret the decision?"],
                ["Daniel", "No. Moving here has been one of the best decisions I have ever made."]
            ]
        },
        vocabTitle: "Vocabulary: Decisions and Change",
        vocabulary: [
            ["turning point", "noun phrase", "momento decisivo", "That conversation was a turning point in her career."],
            ["take a risk", "verb phrase", "correr um risco", "He took a risk and accepted the position abroad."],
            ["adjust", "verb", "adaptar-se", "It took me a few weeks to adjust to the new routine."],
            ["opportunity", "noun", "oportunidade", "The course gave her an unexpected opportunity."],
            ["outcome", "noun", "resultado final", "The outcome was better than we expected."],
            ["regret", "verb / noun", "arrepender-se / arrependimento", "I do not regret changing jobs."],
            ["overcome", "verb", "superar", "She has overcome several difficulties this year."],
            ["look back", "phrasal verb", "relembrar / olhar para trás", "When I look back, I can see how much I have changed."]
        ],
        grammar: {
            title: "Past Event or Present Connection?",
            intro: "O ponto principal não é apenas a forma do verbo. Primeiro identifique se o tempo está concluído ou se a experiência ainda se conecta ao presente.",
            tables: [
                {
                    title: "Choose by meaning",
                    headers: ["Meaning", "Form", "Example"],
                    rows: [
                        ["Acontecimento concluído", "Past Simple", "I changed jobs in 2023."],
                        ["Experiência sem data específica", "Present Perfect", "I have changed jobs twice."],
                        ["Período ainda aberto", "Present Perfect", "I have learned a lot this year."],
                        ["Detalhe da experiência", "Past Simple", "I took my first course last May."]
                    ]
                },
                {
                    title: "Forms and follow-up",
                    headers: ["Function", "Pattern", "Example"],
                    rows: [
                        ["Present Perfect", "have/has + participle", "She has accepted a new role."],
                        ["Present Perfect question", "Have/Has + subject + participle?", "Have you ever lived alone?"],
                        ["Past Simple", "past form", "She accepted the role on Monday."],
                        ["Past Simple question", "Did + subject + base verb?", "When did she accept it?"],
                        ["Negative", "haven't/hasn't + participle", "I haven't made a final decision yet."],
                        ["Finished-time negative", "didn't + base verb", "I didn't accept the first offer."]
                    ]
                }
            ],
            notes: [
                "Evite Present Perfect com yesterday, last week, ago ou uma data concluída.",
                "Uma resposta B1 pode começar com Have you ever...? e continuar com When?, Why? e What happened next?",
                "This week, this month e this year podem usar Present Perfect quando o período ainda não terminou."
            ]
        },
        practice: [
            { kind: "complete", prompt: "Mara ____ a new department last September.", hint: "entrou; tempo concluído", answer: "joined" },
            { kind: "complete", prompt: "I ____ three difficult decisions this month.", hint: "tomei; mês ainda em andamento", answer: "have made" },
            { kind: "choose", prompt: "Choose: Have you ever changed / Did you ever change careers?", options: ["Have you ever changed careers?", "Did you ever change careers?"], hint: "experiência sem data", answer: "Have you ever changed careers?" },
            { kind: "complete", prompt: "She has never ____ such a challenging project.", hint: "liderou; particípio irregular", answer: "led" },
            { kind: "error", prompt: "I have accepted the offer yesterday morning.", hint: "yesterday encerra o tempo", answer: "I accepted the offer yesterday morning." },
            { kind: "reorder", prompt: "ever / have / a difficult choice / you / regretted / ?", hint: "comece com Have", answer: "Have you ever regretted a difficult choice?" },
            { kind: "transform", prompt: "Add a finished-time detail: I have moved to another city.", hint: "use last year", answer: "I moved to another city last year." },
            { kind: "choose", prompt: "Choose: We have met / met during a conference in 2022.", options: ["We have met during a conference in 2022.", "We met during a conference in 2022."], hint: "2022 é um período concluído", answer: "We met during a conference in 2022." },
            { kind: "complete", prompt: "My priorities ____ a lot since I started this job.", hint: "mudaram desde então", answer: "have changed" },
            { kind: "error", prompt: "Did she ever worked abroad?", hint: "did já marca o passado", answer: "Did she ever work abroad?" }
        ],
        translations: [
            { pt: "Eu tomei uma decisão importante no mês passado.", en: "I made an important decision last month." },
            { pt: "Você já morou sozinho?", en: "Have you ever lived alone?" },
            { pt: "Ela ainda não aceitou a proposta.", en: "She hasn't accepted the offer yet." },
            { pt: "Nós nos conhecemos durante um curso em 2021.", en: "We met during a course in 2021." },
            { pt: "Minha rotina mudou muito desde janeiro.", en: "My routine has changed a lot since January." },
            { pt: "Quando você começou esse trabalho?", en: "When did you start this job?" },
            { pt: "Ele superou muitos desafios este ano.", en: "He has overcome many challenges this year." },
            { pt: "Eu não me arrependi da escolha que fiz.", en: "I didn't regret the choice I made." }
        ],
        expressionTitle: "Expressions for Life Stories and Turning Points",
        expressions: [
            ["take the plunge", "tomar coragem e finalmente fazer algo", "After months of planning, she took the plunge and opened the shop."],
            ["turn things around", "mudar uma situação ruim para melhor", "A new routine helped him turn things around."],
            ["work out", "dar certo / funcionar", "The plan was risky, but it worked out well."],
            ["end up", "acabar em uma situação ou fazendo algo", "We ended up staying in the city for five years."],
            ["have second thoughts", "começar a ter dúvidas sobre uma decisão", "I had second thoughts before signing the contract."],
            ["a fresh start", "um recomeço", "The move gave the family a fresh start."],
            ["make a name for yourself", "tornar-se conhecido pelo próprio trabalho", "She made a name for herself as a talented engineer."],
            ["overcome the odds", "superar grandes dificuldades", "He overcame the odds and reached the highest level of the sport."],
            ["leave a lasting legacy", "deixar um legado duradouro", "Her work has left a lasting legacy in education."],
            ["look back on", "recordar e avaliar algo do passado", "He looked back on the decision as a turning point."]
        ],
        dialogues: [
            {
                title: "A last-minute application",
                context: "Two coworkers before lunch",
                lines: [
                    ["Nora", "Have you applied for the team leader position?"],
                    ["Eli", "Yes. I sent the application this morning."],
                    ["Nora", "Good! What made you change your mind?"],
                    ["Eli", "Our manager encouraged me, so I decided to take the plunge."]
                ]
            },
            {
                title: "Back in the neighborhood",
                context: "Old neighbors meet at a bakery",
                lines: [
                    ["Rita", "I haven't seen you in years. Do you still live near the park?"],
                    ["Sam", "No, I moved downtown two years ago."],
                    ["Rita", "How has the move worked out?"],
                    ["Sam", "Pretty well. I have found a better job and made new friends."],
                    ["Rita", "Do you miss the old neighborhood?"],
                    ["Sam", "Sometimes, but moving gave me a fresh start."]
                ]
            },
            {
                title: "A useful evening course",
                context: "Friends waiting for the bus",
                lines: [
                    ["Kai", "You seem more confident at work lately."],
                    ["Lena", "I have completed a public-speaking course, and it has really helped me."]
                ]
            },
            {
                title: "The driving test",
                context: "A family phone call",
                lines: [
                    ["Aunt", "Have you taken your driving test yet?"],
                    ["Mia", "Yes, I took it on Friday, but I didn't pass."],
                    ["Aunt", "I'm sorry. Have you booked another test?"],
                    ["Mia", "Not yet. I want a few more lessons first."]
                ]
            }
        ],
        reading: {
            title: "Ayrton Senna: Defining Moments and a Lasting Legacy",
            genre: "Biographical profile",
            paragraphs: [
                "Ayrton Senna was born in São Paulo in 1960 and started racing karts when he was young. He entered Formula 1 in 1984 and won his first Grand Prix in Portugal the following year. His skill in wet conditions soon helped him make a name for himself around the world.",
                "Senna joined McLaren in 1988, a move that became a major turning point in his career. He won the Formula 1 world championship that year and became champion again in 1990 and 1991. Fans admired his speed, concentration and determination, but they also saw how seriously he represented Brazil.",
                "Senna died after an accident during the San Marino Grand Prix in 1994. His racing career ended suddenly, but his influence did not. Since then, new drivers have described him as an inspiration, and documentaries, exhibitions and public tributes have introduced his story to younger generations.",
                "His name has also remained connected with education through the Ayrton Senna Institute in Brazil. More than three decades after his final race, Senna has left a lasting legacy that reaches far beyond motorsport."
            ],
            vocabulary: [["wet conditions", "condições de pista molhada"], ["turning point", "momento decisivo"], ["determination", "determinação"], ["tribute", "homenagem"], ["legacy", "legado"]],
            questions: [
                { question: "When did Senna enter Formula 1, and when did he win his first Grand Prix?", answer: "He entered Formula 1 in 1984 and won his first Grand Prix in 1985." },
                { question: "Which career change became a turning point in 1988?", answer: "He joined McLaren and won his first Formula 1 world championship." },
                { question: "Which two qualities, in addition to speed, did fans admire?", answer: "They admired his concentration and determination." },
                { question: "What evidence shows that Senna's influence has continued after 1994?", answer: "Drivers still describe him as an inspiration, his story reaches new generations, and his name remains connected with education." }
            ]
        },
        expressionTranslations: [
            { pt: "Ela finalmente tomou coragem e enviou a inscrição.", en: "She finally took the plunge and sent the application." },
            { pt: "A nova rotina mudou completamente a situação.", en: "The new routine turned things around." },
            { pt: "No fim, o plano deu certo.", en: "In the end, the plan worked out." },
            { pt: "Nós acabamos ficando até o fim do evento.", en: "We ended up staying until the end of the event." },
            { pt: "Eu comecei a ter dúvidas antes da mudança.", en: "I had second thoughts before the move." },
            { pt: "O novo emprego foi um recomeço para ele.", en: "The new job was a fresh start for him." },
            { pt: "Ela se tornou conhecida por seu trabalho na ciência.", en: "She made a name for herself through her work in science." },
            { pt: "Ele superou grandes dificuldades para chegar ao topo.", en: "He overcame the odds to reach the top." },
            { pt: "O projeto deixou um legado duradouro na comunidade.", en: "The project left a lasting legacy in the community." },
            { pt: "Ela recorda aquela decisão como um momento decisivo.", en: "She looks back on that decision as a turning point." }
        ],
        speaking: {
            title: "Build a Defining-Moment Story",
            scenario: "O professor fornece os detalhes gradualmente. O aluno organiza a resposta em experiência, momento específico e resultado atual.",
            languageBank: ["I have always...", "The change happened when...", "At first...", "Since then...", "Looking back..."],
            rounds: [
                { title: "The opportunity", prompt: "A new course appeared at the right moment. Explain why the person accepted it.", followUps: ["When did the course begin?", "What was difficult at first?"], model: "I had never studied design before, but I accepted the opportunity last spring because I wanted a new challenge. At first, the software was difficult to use." },
                { title: "The result", prompt: "Explain two present results of that past decision.", followUps: ["What has improved?", "What has not happened yet?"], model: "Since the course, I have created several projects and become more confident. I haven't changed jobs yet, but I have started building a portfolio." },
                { title: "The full account", prompt: "Combine the opportunity, the specific event and the result in a 60–90 second account.", followUps: ["Why was it a turning point?", "Would you make the same choice again?"], model: "Last year, I joined a course after a colleague recommended it. I struggled during the first week, but I completed my first project in June. Since then, I have used the skill at work, so the course has become an important turning point for me." }
            ],
            teacherFocus: ["time-frame choice", "past participles", "sequence connectors", "follow-up answers"]
        },
        music: {
            song: "The Story",
            artist: "Brandi Carlile",
            spotifyId: "0EKBV6GybPtALXUgWqWrym",
            focus: "Ouça procurando referências a experiência, mudança e história pessoal.",
            lines: [
                ["I have ", "carried", " every lesson from the road behind me."],
                ["One choice ", "changed", " the direction of my day."],
                ["I looked back and ", "noticed", " how far I had come."],
                ["Now I can tell the ", "story", " in a clearer way."]
            ],
            discussion: ["Which words in the song suggest personal experience?", "Does the singer seem to focus on one event or a longer journey?", "Which tense would be useful to summarize that journey?"]
        },
        homework: {
            title: "Homework: One Decision, Two Time Frames",
            deliverable: "Escolha um tema e escreva 100–130 palavras. Use Present Perfect para a conexão atual e Past Simple para os detalhes concluídos.",
            options: [
                { title: "A useful decision", prompt: "Conte uma decisão prática, quando ela aconteceu e como ela ajuda hoje." },
                { title: "An unexpected opportunity", prompt: "Descreva como a oportunidade apareceu, o que você fez e qual foi o resultado." },
                { title: "A fresh start", prompt: "Explique uma mudança de rotina, estudo, trabalho ou cidade e o que mudou desde então." }
            ],
            checklist: ["Incluí pelo menos duas formas de Present Perfect.", "Usei Past Simple com um momento concluído.", "Conectei os acontecimentos com at first, then, since then ou in the end.", "Revisei os particípios irregulares."]
        }
    }));

    lessons.push(createNormalLesson({
        number: 2,
        unit: "Block 1: Time, Change and Possibility",
        title: "Changes in Progress",
        objective: "Distinguir resultados alcançados de atividades que continuam ou explicam uma situação presente.",
        focus: "Present Perfect Simple vs Present Perfect Continuous",
        cefr: "B1: descreve progresso, duração e resultados atuais com detalhes claros.",
        objectives: [
            "Contrastar resultado concluído e atividade em andamento.",
            "Usar for, since, lately e recently com naturalidade.",
            "Evitar o continuous com verbos de estado como know e believe.",
            "Dar atualizações completas sobre projetos e mudanças recentes."
        ],
        opening: {
            title: "The apartment is finally taking shape",
            lines: [
                ["Jo", "The living room looks completely different. How long have you been renovating it?"],
                ["Max", "We have been working on it for almost three weeks."],
                ["Jo", "It must be exhausting. What have you finished so far?"],
                ["Max", "We have painted the walls and replaced the old lights."],
                ["Jo", "What are you doing with all these boxes?"],
                ["Max", "I have been sorting them since breakfast, but I have only emptied four."],
                ["Jo", "Do you need help with the rest?"],
                ["Max", "Yes, please. I have been trying to move that bookcase on my own."]
            ]
        },
        vocabTitle: "Vocabulary: Progress and Effort",
        vocabulary: [
            ["progress", "noun", "progresso", "The team has made steady progress this week."],
            ["effort", "noun", "esforço", "Your effort has improved the final result."],
            ["deadline", "noun", "prazo", "We have been working hard because the deadline is Friday."],
            ["lately", "adverb", "ultimamente", "I have been sleeping better lately."],
            ["maintain", "verb", "manter", "It is difficult to maintain the same pace every day."],
            ["delay", "noun / verb", "atraso / atrasar", "A delivery problem has delayed the renovation."],
            ["exhausted", "adjective", "exausto", "She feels exhausted after working all weekend."],
            ["make headway", "expression", "avançar", "We are finally making headway on the report."]
        ],
        grammar: {
            title: "Result, Duration or Visible Evidence?",
            intro: "As duas formas conectam passado e presente. A escolha depende de destacar o resultado ou o processo.",
            tables: [
                {
                    title: "Simple or continuous?",
                    headers: ["Focus", "Form", "Example"],
                    rows: [
                        ["Resultado / quantidade", "have/has + participle", "I have answered twelve emails."],
                        ["Atividade / duração", "have/has been + -ing", "I have been answering emails all morning."],
                        ["Resultado visível", "continuous", "Your hands are dirty. Have you been painting?"],
                        ["Ação concluída", "simple", "We have painted the kitchen."],
                        ["Repetição até agora", "simple or continuous", "She has called three times. / She has been calling all day."]
                    ]
                },
                {
                    title: "Time markers and stative verbs",
                    headers: ["Tool", "Use", "Example"],
                    rows: [
                        ["for", "duração", "We have been waiting for an hour."],
                        ["since", "ponto inicial", "He has worked here since 2022."],
                        ["lately / recently", "período recente", "I have been feeling tired lately."],
                        ["so far / already", "resultado até agora", "We have completed two sections so far."],
                        ["know / believe / own", "normalmente sem continuous", "I have known her for ten years."]
                    ]
                }
            ],
            notes: [
                "Use How many...? com resultado contável e How long...? com duração.",
                "Não diga I have been knowing. Use I have known.",
                "A atividade pode ter terminado há pouco e ainda usar continuous quando a evidência está presente."
            ]
        },
        practice: [
            { kind: "complete", prompt: "We ____ the first three rooms so far.", hint: "pintamos; resultado contado", answer: "have painted" },
            { kind: "complete", prompt: "We ____ the hallway since nine o'clock.", hint: "estamos pintando; atividade e duração", answer: "have been painting" },
            { kind: "choose", prompt: "Choose: I have read / have been reading 80 pages today.", options: ["I have read 80 pages today.", "I have been reading 80 pages today."], hint: "quantidade concluída", answer: "I have read 80 pages today." },
            { kind: "complete", prompt: "How long ____ you ____ for the delivery?", hint: "há quanto tempo está esperando", answer: "have you been waiting" },
            { kind: "error", prompt: "I have been knowing this neighborhood for years.", hint: "know é verbo de estado", answer: "I have known this neighborhood for years." },
            { kind: "reorder", prompt: "lately / has / working / too much / been / she", hint: "ultimamente", answer: "She has been working too much lately." },
            { kind: "choose", prompt: "Choose: He has fixed / has been fixing the sink, so we can use it now.", options: ["He has fixed the sink, so we can use it now.", "He has been fixing the sink, so we can use it now."], hint: "resultado concluído", answer: "He has fixed the sink, so we can use it now." },
            { kind: "complete", prompt: "My eyes hurt because I ____ at this screen all afternoon.", hint: "estou olhando; atividade que explica o resultado", answer: "have been looking" },
            { kind: "transform", prompt: "Ask about duration: She works on the project.", hint: "How long", answer: "How long has she been working on the project?" },
            { kind: "error", prompt: "They have been completed four tasks today.", hint: "resultado: retire been", answer: "They have completed four tasks today." }
        ],
        translations: [
            { pt: "Estamos trabalhando nisso desde segunda-feira.", en: "We have been working on it since Monday." },
            { pt: "Eu já terminei três partes do relatório.", en: "I have already finished three parts of the report." },
            { pt: "Há quanto tempo você está esperando?", en: "How long have you been waiting?" },
            { pt: "Ela conhece a equipe há cinco anos.", en: "She has known the team for five years." },
            { pt: "Tenho dormido melhor ultimamente.", en: "I have been sleeping better lately." },
            { pt: "Eles fizeram muito progresso até agora.", en: "They have made a lot of progress so far." },
            { pt: "Por que suas mãos estão sujas? Você estava pintando?", en: "Why are your hands dirty? Have you been painting?" },
            { pt: "O atraso afetou dois departamentos.", en: "The delay has affected two departments." }
        ],
        expressionTitle: "Expressions for Progress and Workload",
        expressions: [
            ["keep up with", "acompanhar o ritmo de algo", "I have been trying to keep up with all the new requests."],
            ["fall behind", "ficar atrasado", "The team fell behind after the system stopped working."],
            ["catch up", "colocar algo em dia", "I stayed late to catch up on my messages."],
            ["make headway", "avançar de forma perceptível", "We have finally made headway on the difficult section."],
            ["be tied up", "estar muito ocupado", "I have been tied up with a client problem all morning."],
            ["call it a day", "encerrar o trabalho por hoje", "We have done enough. Let's call it a day."]
        ],
        dialogues: [
            {
                title: "A delayed report",
                context: "Coworkers before a meeting",
                lines: [
                    ["Owen", "Have you finished the budget section?"],
                    ["Priya", "Not yet. I have been checking the figures all morning."],
                    ["Owen", "Are we falling behind?"],
                    ["Priya", "A little, but I have completed the most difficult table."]
                ]
            },
            {
                title: "A busy café",
                context: "Two friends meet after work",
                lines: [
                    ["Iris", "You look exhausted. Have you been working late again?"],
                    ["Ben", "Yes. Two people have been away this week."],
                    ["Iris", "How many extra shifts have you done?"],
                    ["Ben", "I have done three, and I still have one tomorrow."],
                    ["Iris", "That is a lot. Are you free on Sunday?"],
                    ["Ben", "Finally. I am going to sleep and call it a day before lunch."]
                ]
            },
            {
                title: "The repaired bike",
                context: "Neighbors in the garage",
                lines: [
                    ["Luis", "The bike looks great. Have you fixed it?"],
                    ["Eva", "Almost. I have replaced the brakes, but I have been looking for a new light."]
                ]
            },
            {
                title: "Catching up after a trip",
                context: "Colleagues at the office",
                lines: [
                    ["May", "How has your first morning back been?"],
                    ["Theo", "Busy. I have been catching up on emails since eight."],
                    ["May", "How many have you answered?"],
                    ["Theo", "About twenty, but I still have a long way to go."]
                ]
            }
        ],
        reading: {
            title: "A Garden That Keeps Growing",
            genre: "Community project update",
            paragraphs: [
                "Residents on Bell Street started a community garden eighteen months ago after an empty piece of land had become full of rubbish. At first, only six people joined the project. They cleared the area, built simple wooden boxes and planted vegetables that could grow in a small space.",
                "Since then, the group has transformed the land. Volunteers have built a tool shed, installed two water tanks and created a path that wheelchair users can access. They have also donated more than 300 kilograms of vegetables to a nearby food bank. These completed results are easy to measure, but the ongoing work is equally important.",
                "The volunteers have been meeting every Saturday morning, even during the colder months. Recently, they have been teaching local children how to plant seeds and reduce food waste. They have also been discussing how to protect the garden from increasingly hot summers. One team has been testing a system that uses rainwater more efficiently.",
                "The project still faces difficulties. The organizers have not secured permanent funding, and they have been spending too much time completing complicated forms. Nevertheless, the garden has become a valued meeting place, and more residents have been asking how they can participate."
            ],
            vocabulary: [["cleared", "limparam / desocuparam"], ["shed", "depósito pequeno"], ["donated", "doaram"], ["ongoing", "em andamento"], ["secured", "garantiram"]],
            questions: [
                { question: "Which three physical improvements have the volunteers completed?", answer: "They have built a tool shed, installed water tanks and created an accessible path." },
                { question: "What have the volunteers been doing with local children recently?", answer: "They have been teaching them how to plant seeds and reduce food waste." },
                { question: "Why is the rainwater system important for the garden's future?", answer: "Because summers are becoming hotter and the group needs to use water more efficiently." },
                { question: "What contrast does the final paragraph present?", answer: "The project still lacks permanent funding and requires paperwork, but the garden is valued and attracting more residents." }
            ]
        },
        listening: {
            title: "Teacher Listening: A Project Update",
            setup: "Leia o roteiro duas vezes. Na primeira, o aluno identifica o resultado geral; na segunda, anota números e tarefas em andamento.",
            script: "Our website update is moving forward, but we have had a few delays. The design team has completed the home page and the contact section. They have also tested the site on three different phones. However, the content team has been rewriting the service descriptions because several paragraphs were unclear. We have been waiting for the new photographs since Tuesday, so the product page is not ready yet. If the photographs arrive tomorrow, we should still meet Friday's deadline. For now, I have asked everyone to focus on the sections we can finish without them.",
            questions: [
                { question: "Which two sections has the design team completed?", answer: "The home page and the contact section." },
                { question: "Why has the content team been rewriting the descriptions?", answer: "Because several paragraphs were unclear." },
                { question: "What condition will allow the team to meet Friday's deadline?", answer: "The photographs need to arrive tomorrow." }
            ]
        },
        expressionTranslations: [
            { pt: "Estou tentando acompanhar todas as mudanças.", en: "I have been trying to keep up with all the changes." },
            { pt: "A equipe ficou atrasada depois do feriado.", en: "The team fell behind after the holiday." },
            { pt: "Preciso colocar meus e-mails em dia.", en: "I need to catch up on my emails." },
            { pt: "Finalmente estamos avançando no projeto.", en: "We are finally making headway on the project." },
            { pt: "Ela esteve muito ocupada com uma reclamação.", en: "She has been tied up with a complaint." },
            { pt: "Já fizemos bastante por hoje. Vamos encerrar.", en: "We have done enough for today. Let's call it a day." }
        ],
        speaking: {
            title: "Give a Clear Progress Update",
            scenario: "Transforme informações curtas em uma atualização organizada sobre resultados, tarefas em andamento e próximos obstáculos.",
            languageBank: ["So far, we have...", "We have been...", "We haven't... yet", "The main delay is...", "Next, we need to..."],
            rounds: [
                { title: "Home project", prompt: "Completed: walls and lights. In progress: shelves. Problem: late delivery.", followUps: ["How long has the work continued?", "What is ready to use now?"], model: "We have painted the walls and replaced the lights. We have been building the shelves for two days, but a late delivery has slowed us down." },
                { title: "Study plan", prompt: "Completed: four units. In progress: vocabulary review. Problem: limited evening time.", followUps: ["What has improved?", "How will the learner catch up?"], model: "I have completed four units and improved my reading. I have been reviewing vocabulary every morning because my evenings have been very busy." },
                { title: "Work update", prompt: "Give a 60-second update with two measurable results, one ongoing activity and one obstacle.", followUps: ["What has the team learned?", "What still needs attention?"], model: "The team has interviewed twelve customers and completed the first report. We have been analyzing the comments since Monday. We haven't solved the delivery problem yet, so that is our next priority." }
            ],
            teacherFocus: ["simple vs continuous", "for/since", "measurable results", "clear next step"]
        },
        music: {
            song: "The Climb",
            artist: "Miley Cyrus",
            focus: "Ouça procurando palavras relacionadas a esforço, progresso e continuidade.",
            lines: [
                ["We have been ", "climbing", " even when the path feels slow."],
                ["Every small ", "step", " has brought us closer."],
                ["We have not ", "finished", " the journey yet."],
                ["But steady ", "effort", " has changed what we can do."]
            ],
            discussion: ["Which line emphasizes an ongoing process?", "Which line emphasizes a result achieved so far?", "How could the song's message describe a long project?"]
        },
        homework: {
            title: "Homework: Progress Report",
            deliverable: "Escolha um tema e escreva 110–140 palavras, separando resultados concluídos de atividades em andamento.",
            options: [
                { title: "A personal project", prompt: "Explique o que já terminou, no que está trabalhando e qual obstáculo ainda existe." },
                { title: "A changing routine", prompt: "Descreva o que tem feito ultimamente e quais resultados já percebeu." },
                { title: "A team update", prompt: "Crie uma atualização profissional com números, duração, atraso e próximo passo." }
            ],
            checklist: ["Usei Present Perfect Simple para pelo menos dois resultados.", "Usei Present Perfect Continuous para duração ou atividade.", "Usei for, since, lately ou so far corretamente.", "Evitei continuous com know, believe ou own."]
        }
    }));

    // BLOCK 2 CONTENT IS INSERTED BELOW.

    window.B1_V3_LESSON_BUILDERS = {
        createNormalLesson,
        createReviewLesson,
        q,
        tr,
        rq,
        dialogue,
        homeworkOption
    };
    window.B1_V3_LESSONS = lessons.sort((a, b) => a.number - b.number);
})();
