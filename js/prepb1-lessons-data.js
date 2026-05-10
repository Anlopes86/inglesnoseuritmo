const bridgeSources = {
    frequency: "Adverbs of frequency normally go before the main verb: I usually study at night.",
    past: "Past simple uses regular -ed forms, irregular past forms, and did/didn't for questions and negatives.",
    future: "Use present continuous for fixed arrangements and going to for intentions or planned decisions.",
    directions: "Clear directions combine action verbs, distance and landmarks: go straight for two blocks, then turn left.",
    should: "Should is used for advice and suggestions: You should rest more.",
    comparatives: "Short adjectives often use -er; longer adjectives use more; irregular forms include better and worse.",
    obligations: "Have to is common for everyday obligations. Must is stronger or more formal. Don't have to means it is not necessary.",
    requests: "Could and may make requests sound more polite than a direct can question.",
    presentPerfect: "Present perfect uses have/has + past participle for experiences without a finished time.",
    superlatives: "Superlatives compare one item with a whole group: the best option, the most interesting movie."
};

function makeLesson(data) {
    return {
        variant: "premium_bridge",
        cefr: "Bridge A2-B1",
        checkpoint: data.checkpoint || [
            "Revisar a regra sem excesso de teoria.",
            "Praticar com frases, leitura, traducao e fala."
        ],
        ...data
    };
}

window.PREPB1_LESSONS = [
    makeLesson({
        number: 1,
        unit: "Bridge 1",
        title: "Daily Routine and Preferences",
        objective: "Revisar present simple e adverbios de frequencia para falar da rotina com respostas mais completas.",
        focus: "Present simple + adverbs of frequency",
        icon: "fa-calendar-check",
        warmup: "What do you usually do in the morning? Com que frequencia voce pratica ingles fora da aula?",
        grammar: {
            title: "Present simple com frequencia",
            rule: "Use o present simple para habitos, fatos e rotinas. Em frases afirmativas com he, she e it, lembre do -s no verbo. Adverbios como always, usually, often, sometimes e rarely normalmente aparecem entre o sujeito e o verbo principal.",
            source: bridgeSources.frequency,
            examples: [
                ["I usually study after dinner.", "Eu geralmente estudo depois do jantar."],
                ["She rarely checks social media in the morning.", "Ela raramente verifica redes sociais de manha."],
                ["Do you often work from home?", "Voce costuma trabalhar de casa?"]
            ]
        },
        practice: [
            { prompt: "She ____ to the gym before work.", answer: "goes", hint: "he/she/it + verbo com -s" },
            { prompt: "I ____ check my messages during class.", answer: "rarely", hint: "Use um adverbio de frequencia." },
            { prompt: "____ your brother study English every week?", answer: "Does", hint: "Pergunta no present simple com he/she/it." }
        ],
        readingTitle: "A balanced weekday",
        reading: [
            "Marina studies marketing and works remotely three days a week. She usually starts her morning with coffee, a short walk and ten minutes of English practice. On busy days, she does not study for a long time, but she always reviews a few useful phrases.",
            "In the evening, Marina often watches short videos in English because she wants to understand natural speech better. She says her routine is simple, but it works because it is realistic."
        ],
        vocabulary: [
            ["remotely", "remotamente"],
            ["busy", "ocupado"],
            ["realistic", "realista"]
        ],
        comprehension: [
            { question: "How often does Marina review useful phrases?", options: ["Always", "Never", "Only on weekends"], correctIndex: 0, feedback: "The text says she always reviews a few useful phrases." },
            { question: "Why does she watch short videos in English?", options: ["To understand natural speech better", "To become a marketing teacher", "To avoid work"], correctIndex: 0, feedback: "She wants to understand natural speech better." },
            { question: "True or false: Marina's routine works because it is realistic.", options: ["True", "False"], correctIndex: 0, feedback: "The final sentence says exactly that." }
        ],
        translations: [
            { from: "I usually study English at night.", to: "Eu geralmente estudo ingles a noite." },
            { from: "She does not work from home every day.", to: "Ela nao trabalha de casa todos os dias." },
            { from: "Com que frequencia voce le em ingles?", to: "How often do you read in English?" },
            { from: "Meu amigo raramente acorda cedo.", to: "My friend rarely wakes up early." }
        ],
        personalQuestions: [
            "What do you usually do before work or school?",
            "Which habit helps you learn English more consistently?",
            "How is your weekend routine different from your weekday routine?"
        ],
        speakingTask: {
            title: "Describe your real routine",
            steps: [
                "Fale sobre manha, tarde e noite.",
                "Use pelo menos tres adverbios de frequencia.",
                "Explique uma preferencia com because."
            ],
            model: "I usually start my day early because I feel more organized. I often study English at night, but I rarely practice for more than thirty minutes. This routine works for me because it is simple."
        },
        homework: "Mantenha um mini diario por uma semana com cinco frases em ingles sobre frequencia.",
        celebration: "Voce revisou rotina e frequencia com uma base mais organizada para respostas longas."
    }),
    makeLesson({
        number: 2,
        unit: "Bridge 1",
        title: "Past Stories and Experiences",
        objective: "Reforcar past simple, marcadores temporais e used to para contar historias curtas.",
        focus: "Past simple + used to",
        icon: "fa-clock-rotate-left",
        warmup: "Tell me about a day that was different from your normal routine.",
        grammar: {
            title: "Past simple e used to",
            rule: "Use past simple para acoes terminadas em um tempo definido. Verbos regulares recebem -ed, verbos irregulares mudam de forma, e perguntas/negativas usam did. Use used to para habitos do passado que mudaram.",
            source: bridgeSources.past,
            examples: [
                ["We visited Gramado last year.", "Nos visitamos Gramado no ano passado."],
                ["Did you enjoy the festival?", "Voce gostou do festival?"],
                ["I used to play soccer every weekend.", "Eu costumava jogar futebol todo fim de semana."]
            ]
        },
        practice: [
            { prompt: "Last weekend, I ____ my cousins in another city.", answer: "visited", hint: "visit no passado regular." },
            { prompt: "She ____ use public transportation when she was a child.", answer: "used to", hint: "Habito antigo." },
            { prompt: "____ you watch the concert online yesterday?", answer: "Did", hint: "Pergunta no passado simples." }
        ],
        readingTitle: "A festival memory",
        reading: [
            "Last July, Pedro travelled to a winter festival with two friends. They arrived in the afternoon, walked around the city center and tried local food. At first, Pedro felt tired because the bus trip was long, but the music in the main square changed his mood.",
            "When he was younger, Pedro used to avoid crowded events. Now he enjoys them when he goes with close friends. At the end of the night, they took photos, bought hot chocolate and promised to return the next year."
        ],
        vocabulary: [["crowded", "cheio"], ["mood", "humor"], ["promised", "prometeram"]],
        comprehension: [
            { question: "When did Pedro travel?", options: ["Last July", "Last January", "Next year"], correctIndex: 0, feedback: "The first sentence says Last July." },
            { question: "What changed Pedro's mood?", options: ["The music", "The bus trip", "The cold weather"], correctIndex: 0, feedback: "The music in the main square changed his mood." },
            { question: "What did Pedro use to avoid?", options: ["Crowded events", "Hot chocolate", "Close friends"], correctIndex: 0, feedback: "The reading says he used to avoid crowded events." }
        ],
        translations: [
            { from: "We visited Gramado last year.", to: "Nos visitamos Gramado no ano passado." },
            { from: "Did you travel with your family?", to: "Voce viajou com sua familia?" },
            { from: "Eu costumava estudar de manha.", to: "I used to study in the morning." },
            { from: "Ela nao gostou do hotel.", to: "She didn't like the hotel." }
        ],
        personalQuestions: [
            "What is one childhood memory you can describe in English?",
            "Did you use to have a very different routine?",
            "Tell a short story with first, then, after that and finally."
        ],
        speakingTask: {
            title: "Tell a mini story",
            steps: ["Escolha um evento real.", "Use quatro marcadores temporais.", "Inclua um problema, uma emocao e um resultado."],
            model: "Last year, I started a new course. First, I felt nervous because I did not know anyone. Then I met two classmates and felt better. In the end, the experience was useful and fun."
        },
        homework: "Entreviste um parente sobre como era a rotina dele 20 anos atras e apresente um resumo em ingles.",
        celebration: "Historias ficam mais claras quando voce controla tempo, ordem e detalhes simples."
    }),
    makeLesson({
        number: 3,
        unit: "Bridge 1",
        title: "Plans and Invitations",
        objective: "Revisar going to e present continuous para convites, planos e compromissos.",
        focus: "Going to + present continuous for future",
        icon: "fa-calendar-plus",
        warmup: "What are you doing this weekend? What are you going to do next month?",
        grammar: {
            title: "Dois futuros praticos",
            rule: "Use be going to para intencoes e planos pessoais. Use present continuous para compromissos ja marcados, normalmente com horario, pessoa ou lugar combinados.",
            source: bridgeSources.future,
            examples: [
                ["I am going to study more this month.", "Eu vou estudar mais este mes."],
                ["I am meeting Ana at 7 p.m.", "Vou encontrar a Ana as 19h."],
                ["Are you coming to the workshop?", "Voce vem para o workshop?"]
            ]
        },
        practice: [
            { prompt: "I ____ meet my friends at 8 tonight.", answer: "am meeting", hint: "Compromisso marcado." },
            { prompt: "We ____ start a new project soon.", answer: "are going to", hint: "Intencao/plano." },
            { prompt: "____ you coming to class tomorrow?", answer: "Are", hint: "Present continuous para futuro." }
        ],
        readingTitle: "A local tech fair",
        reading: [
            "Two friends are planning to visit a local technology fair on Saturday. Lucas is meeting his cousin at the entrance at 10 a.m., and they are going to watch a presentation about artificial intelligence. Julia is interested too, but she is working in the morning.",
            "They decide to meet for lunch after the first presentation. Julia is going to bring her notebook because she wants to collect ideas for a university project."
        ],
        vocabulary: [["fair", "feira"], ["entrance", "entrada"], ["collect ideas", "coletar ideias"]],
        comprehension: [
            { question: "Where is Lucas meeting his cousin?", options: ["At the entrance", "At the restaurant", "At the university"], correctIndex: 0, feedback: "He is meeting his cousin at the entrance." },
            { question: "Why is Julia bringing her notebook?", options: ["For a university project", "For a cooking class", "For a job interview"], correctIndex: 0, feedback: "She wants ideas for a university project." },
            { question: "True or false: Julia is free on Saturday morning.", options: ["False", "True"], correctIndex: 0, feedback: "She is working in the morning." }
        ],
        translations: [
            { from: "Are you going to the party?", to: "Voce vai para a festa?" },
            { from: "I am meeting my teacher tomorrow.", to: "Vou encontrar meu professor amanha." },
            { from: "Nos vamos visitar uma feira de tecnologia.", to: "We are going to visit a technology fair." },
            { from: "Desculpa, nao posso ir hoje.", to: "Sorry, I can't go today." }
        ],
        personalQuestions: [
            "What are you doing this weekend?",
            "Are you going to travel or study more this year?",
            "How do you usually accept or refuse invitations politely?"
        ],
        speakingTask: {
            title: "Invite, accept and reschedule",
            steps: ["Convide alguem para uma atividade.", "Use going to e present continuous.", "Mude um detalhe e resolva o plano."],
            model: "Are you free on Friday? I am meeting some friends for coffee at 6. We are going to talk about our course. If Friday is difficult, we can meet on Saturday."
        },
        homework: "Monte um roteiro ficticio de viagem de fim de semana usando going to e present continuous.",
        celebration: "Voce agora tem um roteiro claro para falar de planos sem misturar todas as formas de futuro."
    }),
    makeLesson({
        number: 4,
        unit: "Bridge 1",
        title: "Around Town and Directions",
        objective: "Revisar there is/there are, preposicoes de lugar e instrucoes pela cidade.",
        focus: "There is/are + directions",
        icon: "fa-map-location-dot",
        warmup: "How do you get to your favorite cafe, school or supermarket?",
        grammar: {
            title: "Localizacao e direcoes",
            rule: "Use there is para singular e there are para plural. Para direcoes, combine verbo de acao, distancia e ponto de referencia: go straight, turn left, cross the street, next to the bank.",
            source: bridgeSources.directions,
            examples: [
                ["There is a pharmacy across from the bank.", "Ha uma farmacia em frente ao banco."],
                ["Go straight for two blocks.", "Siga reto por dois quarteiroes."],
                ["Turn right at the second street.", "Vire a direita na segunda rua."]
            ]
        },
        practice: [
            { prompt: "There ____ two cafes near the station.", answer: "are", hint: "Plural." },
            { prompt: "The museum is ____ from the park.", answer: "across", hint: "Em frente / do outro lado." },
            { prompt: "____ left after the supermarket.", answer: "Turn", hint: "Verbo de direcao." }
        ],
        readingTitle: "Lost before class",
        reading: [
            "Nina was visiting a new city and wanted to find her English school. There were many small streets near the bus station, and her phone battery was almost dead. She asked a woman for help outside a bakery.",
            "The woman said, 'Go straight for one block, cross the street and turn right after the pharmacy. The school is next to a small bookstore.' Nina repeated the directions, thanked her and arrived five minutes before class."
        ],
        vocabulary: [["bakery", "padaria"], ["battery", "bateria"], ["bookstore", "livraria"]],
        comprehension: [
            { question: "What problem did Nina have?", options: ["Her phone battery was almost dead", "She lost her passport", "The school was closed"], correctIndex: 0, feedback: "The text says her phone battery was almost dead." },
            { question: "Where is the school?", options: ["Next to a bookstore", "Behind the bus station", "Inside a bakery"], correctIndex: 0, feedback: "The woman says the school is next to a small bookstore." },
            { question: "Did Nina arrive late?", options: ["No", "Yes"], correctIndex: 0, feedback: "She arrived five minutes before class." }
        ],
        translations: [
            { from: "Turn right at the second street.", to: "Vire a direita na segunda rua." },
            { from: "There is a bank next to the pharmacy.", to: "Ha um banco ao lado da farmacia." },
            { from: "Siga reto por dois quarteiroes.", to: "Go straight for two blocks." },
            { from: "O cafe fica em frente ao parque.", to: "The cafe is across from the park." }
        ],
        personalQuestions: [
            "Describe the way from your house to a place you like.",
            "When was the last time you got lost?",
            "Which landmarks are useful near your home?"
        ],
        speakingTask: {
            title: "Give directions from a simple map",
            steps: ["Escolha dois lugares.", "Explique o caminho com tres comandos.", "Confirme se a pessoa entendeu."],
            model: "Go straight for two blocks, then turn left after the bakery. Cross the street, and the cafe is next to the bookstore. Is that clear?"
        },
        homework: "Use um mapa em ingles por um dia e registre cinco palavras novas.",
        celebration: "Direcoes ficam mais faceis quando cada passo tem acao, distancia e referencia."
    }),
    makeLesson({
        number: 5,
        unit: "Bridge 2",
        title: "Food, Health and Advice",
        objective: "Revisar contaveis/incontaveis, quantificadores e should para conselhos simples.",
        focus: "Countable/uncountable + should",
        icon: "fa-heart-pulse",
        warmup: "What should people do to stay healthy during a busy week?",
        grammar: {
            title: "Quantidade e conselho",
            rule: "Substantivos contaveis podem ter plural: apples, bananas. Incontaveis normalmente nao recebem plural: water, advice. Use some/any, much/many, a few/a little conforme a ideia. Use should para sugestoes e conselhos.",
            source: bridgeSources.should,
            examples: [
                ["You should drink more water.", "Voce deveria beber mais agua."],
                ["There are a few apples in the kitchen.", "Ha algumas macas na cozinha."],
                ["I don't have much time for exercise.", "Nao tenho muito tempo para exercicio."]
            ]
        },
        practice: [
            { prompt: "You ____ sleep more if you feel tired.", answer: "should", hint: "Conselho." },
            { prompt: "How ____ water do you drink every day?", answer: "much", hint: "Water e incontavel." },
            { prompt: "I bought a ____ bananas for breakfast.", answer: "few", hint: "Bananas e contavel plural." }
        ],
        readingTitle: "Small health changes",
        reading: [
            "Many people think a healthy routine needs big changes, but small actions can help a lot. You can drink more water, prepare a few simple meals at home and take short breaks during work. You should also sleep enough because tired people often make worse food choices.",
            "A realistic plan is better than a perfect plan. If you do not have much time, start with ten minutes of walking or a little stretching after work."
        ],
        vocabulary: [["breaks", "pausas"], ["stretching", "alongamento"], ["choices", "escolhas"]],
        comprehension: [
            { question: "What kind of plan is better?", options: ["A realistic plan", "A perfect but impossible plan", "No plan"], correctIndex: 0, feedback: "The reading says a realistic plan is better than a perfect plan." },
            { question: "Why should people sleep enough?", options: ["Because tired people often make worse food choices", "Because walking is dangerous", "Because water is expensive"], correctIndex: 0, feedback: "The text connects sleep with food choices." },
            { question: "What can busy people start with?", options: ["Ten minutes of walking", "A long gym program", "No exercise"], correctIndex: 0, feedback: "The final sentence suggests ten minutes of walking." }
        ],
        translations: [
            { from: "You should drink more water.", to: "Voce deveria beber mais agua." },
            { from: "I don't eat much sugar.", to: "Eu nao como muito acucar." },
            { from: "Voce deveria descansar hoje.", to: "You should rest today." },
            { from: "Ha algumas frutas na mesa.", to: "There are a few fruits on the table." }
        ],
        personalQuestions: [
            "Which habit would you like to change?",
            "What advice would you give to a very busy student?",
            "Do you eat many vegetables during the week?"
        ],
        speakingTask: {
            title: "Doctor and patient role-play",
            steps: ["Descreva dois sintomas.", "Peca conselho.", "Responda com should/shouldn't."],
            model: "I have a headache and I feel tired. You should drink water, rest for a while and avoid screens tonight. You shouldn't work until very late."
        },
        homework: "Crie um cardapio semanal simples em ingles com conselhos de saude.",
        celebration: "Voce praticou conselhos uteis com linguagem de quantidade do dia a dia."
    }),
    makeLesson({
        number: 6,
        unit: "Bridge 2",
        title: "Study, Work and Obligations",
        objective: "Revisar can/can't, have to, must e comparativos em contextos de estudo e trabalho.",
        focus: "Can/can't + have to/must + comparatives",
        icon: "fa-briefcase",
        warmup: "Can you work or study from home? What do you have to do every week?",
        grammar: {
            title: "Habilidade, obrigacao e comparacao",
            rule: "Can expressa habilidade ou permissao e usa verbo base. Have to e comum para obrigacoes cotidianas; must e mais forte/formal. Don't have to significa que nao e necessario. Comparativos usam -er, more ou formas irregulares como better/worse.",
            source: `${bridgeSources.obligations} ${bridgeSources.comparatives}`,
            examples: [
                ["I can work from home twice a week.", "Eu posso trabalhar de casa duas vezes por semana."],
                ["We have to finish the project by Friday.", "Temos que terminar o projeto ate sexta."],
                ["This routine is more flexible than my old one.", "Esta rotina e mais flexivel que a antiga."]
            ]
        },
        practice: [
            { prompt: "My job is ____ stressful than my last job.", answer: "more", hint: "Adjetivo longo." },
            { prompt: "Students ____ use phones during the test.", answer: "must not", hint: "Proibicao formal." },
            { prompt: "I ____ prepare reports every Monday.", answer: "have to", hint: "Obrigacao cotidiana." }
        ],
        readingTitle: "Remote work routines",
        reading: [
            "Remote work can be more flexible than office work, but it is not always easier. Some professionals can organize their own schedule, but they also have to answer messages, attend online meetings and separate work time from personal time.",
            "Companies must create clear rules for communication. Without clear rules, people may work longer hours and feel more tired. A balanced routine is usually better than a routine with no limits."
        ],
        vocabulary: [["schedule", "agenda"], ["attend", "participar"], ["limits", "limites"]],
        comprehension: [
            { question: "What is one advantage of remote work?", options: ["It can be more flexible", "It has no meetings", "It is always easier"], correctIndex: 0, feedback: "The text says it can be more flexible." },
            { question: "What must companies create?", options: ["Clear communication rules", "More traffic", "Less technology"], correctIndex: 0, feedback: "Companies must create clear rules for communication." },
            { question: "True or false: Remote work is always easier than office work.", options: ["False", "True"], correctIndex: 0, feedback: "The text says it is not always easier." }
        ],
        translations: [
            { from: "We have to finish the project by Friday.", to: "Temos que terminar o projeto ate sexta-feira." },
            { from: "This routine is better than my old routine.", to: "Esta rotina e melhor que minha rotina antiga." },
            { from: "Eu posso trabalhar de casa.", to: "I can work from home." },
            { from: "Voce nao precisa estudar no domingo.", to: "You don't have to study on Sunday." }
        ],
        personalQuestions: [
            "Compare your study routine with a friend's routine.",
            "What do you have to do every week?",
            "Which is better for you: studying at home or in a classroom?"
        ],
        speakingTask: {
            title: "Remote work mini debate",
            steps: ["Diga uma vantagem.", "Diga uma desvantagem.", "Use pelo menos um comparativo e uma obrigacao."],
            model: "Remote work is more flexible than office work, but people have to be disciplined. For me, it is better when the company has clear rules."
        },
        homework: "Escreva um paragrafo comparando duas profissoes e as habilidades necessarias.",
        celebration: "Voce conectou trabalho, estudo e regras com comparacoes mais naturais."
    }),
    makeLesson({
        number: 7,
        unit: "Bridge 2",
        title: "Travel and Service Situations",
        objective: "Praticar pedidos educados, vocabulario de viagem e solucao de problemas em servicos.",
        focus: "Can/could/may for polite requests",
        icon: "fa-plane-departure",
        warmup: "Tell me about a time you had a small problem while travelling.",
        grammar: {
            title: "Pedidos educados",
            rule: "Use can para pedidos simples, could para soar mais educado e may em contextos mais formais. Em servicos, explique o problema brevemente e peca uma solucao clara.",
            source: bridgeSources.requests,
            examples: [
                ["Could you check my reservation, please?", "Voce poderia verificar minha reserva, por favor?"],
                ["May I see the menu?", "Posso ver o cardapio?"],
                ["Can you help me with this room key?", "Voce pode me ajudar com esta chave?"]
            ]
        },
        practice: [
            { prompt: "____ you give me the menu, please?", answer: "Could", hint: "Pedido educado." },
            { prompt: "There ____ to be a problem with my reservation.", answer: "seems", hint: "There seems to be..." },
            { prompt: "May I ____ your passport, please?", answer: "see", hint: "Verbo base depois de may." }
        ],
        readingTitle: "A problem at the airport",
        reading: [
            "Bianca arrived at the airport early, but she noticed that her name was spelled incorrectly on the boarding pass. She felt worried, so she went to the service desk and explained the problem calmly.",
            "The attendant checked her document, corrected the spelling and printed a new boarding pass. Bianca thanked him and learned an important lesson: in travel situations, clear and polite language can solve problems faster."
        ],
        vocabulary: [["boarding pass", "cartao de embarque"], ["spelled", "soletrado"], ["service desk", "balcao de atendimento"]],
        comprehension: [
            { question: "What was wrong with Bianca's boarding pass?", options: ["Her name was spelled incorrectly", "The flight time was missing", "The seat was broken"], correctIndex: 0, feedback: "The text says her name was spelled incorrectly." },
            { question: "How did she explain the problem?", options: ["Calmly", "Angrily", "In Portuguese only"], correctIndex: 0, feedback: "She explained the problem calmly." },
            { question: "What did the attendant do?", options: ["Printed a new boarding pass", "Cancelled the trip", "Changed the hotel"], correctIndex: 0, feedback: "He corrected the spelling and printed a new boarding pass." }
        ],
        translations: [
            { from: "Could you check my reservation, please?", to: "Voce poderia verificar minha reserva, por favor?" },
            { from: "There is a problem with my room.", to: "Ha um problema com meu quarto." },
            { from: "Posso ver o cardapio?", to: "May I see the menu?" },
            { from: "Eu perdi meu documento no aeroporto.", to: "I lost my document at the airport." }
        ],
        personalQuestions: [
            "Where would you like to travel and why?",
            "What service situation makes you nervous in English?",
            "How can polite language help during a problem?"
        ],
        speakingTask: {
            title: "Hotel, airport or restaurant role-play",
            steps: ["Escolha uma situacao de servico.", "Explique o problema em duas frases.", "Faca um pedido educado com could ou may."],
            model: "Excuse me, there seems to be a problem with my reservation. I booked a room for two nights, but my name is not here. Could you check again, please?"
        },
        homework: "Pesquise um destino turistico e prepare um mini guia em ingles.",
        celebration: "Voce praticou ingles pratico para resolver situacoes reais com mais calma."
    }),
    makeLesson({
        number: 8,
        unit: "Bridge 2",
        title: "Technology and Communication",
        objective: "Introduzir a diferenca entre present perfect para experiencias e past simple para eventos finalizados.",
        focus: "Present perfect vs past simple",
        icon: "fa-mobile-screen-button",
        warmup: "How has technology changed your daily communication?",
        grammar: {
            title: "Experiencia x tempo finalizado",
            rule: "Use present perfect com have/has + past participle para experiencias sem tempo definido ou com efeito no presente. Use past simple quando o tempo esta claro e terminado, como yesterday, last week ou in 2024.",
            source: bridgeSources.presentPerfect,
            examples: [
                ["I have never used virtual reality.", "Eu nunca usei realidade virtual."],
                ["I downloaded the app yesterday.", "Eu baixei o aplicativo ontem."],
                ["She has changed her phone twice this year.", "Ela trocou de celular duas vezes este ano."]
            ]
        },
        practice: [
            { prompt: "I ____ never used a smartwatch.", answer: "have", hint: "Present perfect." },
            { prompt: "She ____ the app yesterday.", answer: "downloaded", hint: "Yesterday pede past simple." },
            { prompt: "Have you ever ____ a video call in English?", answer: "had", hint: "Past participle de have." }
        ],
        readingTitle: "From email to instant messages",
        reading: [
            "Communication has changed quickly in the last twenty years. Many people have stopped writing long emails for simple daily conversations. Instead, they use instant messages, voice notes and short videos.",
            "Last month, a small company tested a new communication app with its team. The workers liked the app because it organized tasks and messages in one place. However, some people said they still preferred email for formal decisions."
        ],
        vocabulary: [["voice notes", "audios curtos"], ["tasks", "tarefas"], ["formal decisions", "decisoes formais"]],
        comprehension: [
            { question: "What has changed in daily communication?", options: ["People use more instant messages and voice notes", "People stopped using phones", "Email disappeared completely"], correctIndex: 0, feedback: "The text mentions instant messages, voice notes and short videos." },
            { question: "When did the company test the app?", options: ["Last month", "Tomorrow", "In 2010"], correctIndex: 0, feedback: "Last month is in the second paragraph." },
            { question: "Why did workers like the app?", options: ["It organized tasks and messages", "It blocked all emails", "It translated everything"], correctIndex: 0, feedback: "The app organized tasks and messages in one place." }
        ],
        translations: [
            { from: "I have never used virtual reality.", to: "Eu nunca usei realidade virtual." },
            { from: "I downloaded the app yesterday.", to: "Eu baixei o aplicativo ontem." },
            { from: "Voce ja fez uma chamada de video em ingles?", to: "Have you ever had a video call in English?" },
            { from: "Ela comprou um celular novo no mes passado.", to: "She bought a new phone last month." }
        ],
        personalQuestions: [
            "Which app has helped you study or work better?",
            "When did you last turn off your phone for a long time?",
            "Have you ever used AI to practice English?"
        ],
        speakingTask: {
            title: "Technology opinion talk",
            steps: ["Diga uma experiencia com tecnologia usando present perfect.", "Diga um evento especifico usando past simple.", "Explique uma opiniao com because."],
            model: "I have used AI tools to practice English, and they have helped me with vocabulary. Last week, I used one app to correct a short text. I think technology is useful because it gives fast feedback."
        },
        homework: "Escreva um post curto em ingles sobre uma inovacao tecnologica que voce admira.",
        celebration: "Voce deu o primeiro passo para diferenciar experiencias gerais de eventos terminados."
    }),
    makeLesson({
        number: 9,
        unit: "Bridge 3",
        title: "Culture, Leisure and Recommendations",
        objective: "Praticar comparativos e superlativos para falar de filmes, eventos, hobbies e recomendacoes.",
        focus: "Comparatives + superlatives",
        icon: "fa-masks-theater",
        warmup: "What is the most interesting movie, concert or event you have experienced recently?",
        grammar: {
            title: "Comparar uma coisa ou o grupo todo",
            rule: "Use comparativos para comparar duas coisas: cheaper, more interesting, better. Use superlativos para destacar uma coisa dentro de um grupo: the cheapest, the most interesting, the best.",
            source: `${bridgeSources.comparatives} ${bridgeSources.superlatives}`,
            examples: [
                ["This series is more exciting than the book.", "Esta serie e mais empolgante que o livro."],
                ["It was the best concert of the year.", "Foi o melhor show do ano."],
                ["The theater is smaller but more comfortable.", "O teatro e menor, mas mais confortavel."]
            ]
        },
        practice: [
            { prompt: "This is the ____ movie I have ever seen. (funny)", answer: "funniest", hint: "Superlativo de funny." },
            { prompt: "The museum is ____ interesting than the mall.", answer: "more", hint: "Comparativo com adjetivo longo." },
            { prompt: "That was the ____ show of the festival. (good)", answer: "best", hint: "Irregular." }
        ],
        readingTitle: "A short movie review",
        reading: [
            "I watched a Brazilian documentary last weekend, and it was one of the most inspiring films I have seen this year. The story was slower than an action movie, but it was more emotional and more realistic.",
            "The best part was the interview with a young musician who used art to transform his neighborhood. I would recommend the film to people who enjoy culture, music and real stories."
        ],
        vocabulary: [["documentary", "documentario"], ["inspiring", "inspirador"], ["neighborhood", "bairro"]],
        comprehension: [
            { question: "What kind of film did the writer watch?", options: ["A documentary", "An action movie", "A comedy series"], correctIndex: 0, feedback: "The first sentence says Brazilian documentary." },
            { question: "How was it compared with an action movie?", options: ["Slower but more emotional", "Faster and cheaper", "Shorter and boring"], correctIndex: 0, feedback: "The text says slower, but more emotional and realistic." },
            { question: "Who was in the best part?", options: ["A young musician", "A famous chef", "A soccer player"], correctIndex: 0, feedback: "The best part was the interview with a young musician." }
        ],
        translations: [
            { from: "This book is more interesting than the movie.", to: "Este livro e mais interessante que o filme." },
            { from: "It was the best concert of the year.", to: "Foi o melhor show do ano." },
            { from: "O teatro e menor que o cinema.", to: "The theater is smaller than the cinema." },
            { from: "Esta e a serie mais divertida que eu ja vi.", to: "This is the funniest series I have ever seen." }
        ],
        personalQuestions: [
            "What is the best series you have watched recently?",
            "Compare two hobbies you enjoy.",
            "Compared with last year, how has your English improved?"
        ],
        speakingTask: {
            title: "Recommend something cultural",
            steps: ["Escolha filme, serie, livro, musica ou evento.", "Use dois comparativos.", "Use um superlativo e explique sua recomendacao."],
            model: "I recommend this series because it is more realistic than many dramas and more emotional than I expected. For me, it is the best series I have watched this year."
        },
        homework: "Crie uma lista de tres recomendacoes culturais em ingles e justifique cada uma.",
        celebration: "Voce agora consegue recomendar e comparar experiencias com mais precisao."
    }),
    makeLesson({
        number: 10,
        unit: "Final Review",
        title: "Final Bridge Project",
        objective: "Consolidar o modulo com revisao integrada, leitura, escrita, fala e autoavaliacao.",
        focus: "Integrated A2-B1 review",
        icon: "fa-trophy",
        warmup: "What can you do in English now that was difficult at the beginning of A1 or A2?",
        grammar: {
            title: "Revisao rapida antes do B1",
            rule: "Nesta aula, o foco e combinar o que voce revisou: rotina, passado, planos, direcoes, conselhos, obrigacoes, comparacoes, pedidos e experiencias. A meta nao e perfeicao; e comunicacao mais independente.",
            source: "Integrated review based on the grammar boxes from lessons 1-9.",
            examples: [
                ["Before, I could answer only short questions.", "Antes, eu conseguia responder apenas perguntas curtas."],
                ["Now, I can explain plans and past experiences.", "Agora, consigo explicar planos e experiencias passadas."],
                ["My next goal is to speak more naturally.", "Minha proxima meta e falar com mais naturalidade."]
            ]
        },
        practice: [
            { prompt: "Before A2, I ____ to speak very slowly.", answer: "used to", hint: "Habito antigo." },
            { prompt: "Next month, I ____ going to practice speaking more.", answer: "am", hint: "Going to precisa do verbo be." },
            { prompt: "B1 texts are usually ____ challenging than A2 texts.", answer: "more", hint: "Comparativo." }
        ],
        readingTitle: "Ana's bridge to B1",
        reading: [
            "When Ana started English, she could answer basic personal questions, but she usually stopped after one sentence. During A1 and A2, she learned to describe routines, talk about past events, make plans, ask for help and understand short texts.",
            "Now she is preparing for B1. Last week, she recorded a two-minute audio about her progress. She said that speaking is still more challenging than reading, but she has become more confident. Her next goal is to give longer answers with examples and clearer opinions.",
            "Ana knows she will make mistakes, but she also knows that mistakes are part of communication. The bridge module helped her review old language and use it in more connected ways."
        ],
        vocabulary: [["progress", "progresso"], ["challenging", "desafiador"], ["connected", "conectado"]],
        comprehension: [
            { question: "What could Ana do at the beginning?", options: ["Answer basic personal questions", "Debate complex topics", "Read academic articles"], correctIndex: 0, feedback: "The first sentence says she could answer basic personal questions." },
            { question: "What did she record last week?", options: ["A two-minute audio", "A movie review", "A travel complaint"], correctIndex: 0, feedback: "The second paragraph mentions a two-minute audio." },
            { question: "What is her next goal?", options: ["Give longer answers with examples", "Stop reading", "Avoid opinions"], correctIndex: 0, feedback: "Her next goal is to give longer answers with examples and clearer opinions." }
        ],
        translations: [
            { from: "Now I can talk about past experiences.", to: "Agora eu consigo falar sobre experiencias passadas." },
            { from: "My next goal is to speak more naturally.", to: "Minha proxima meta e falar com mais naturalidade." },
            { from: "Eu ja usei ingles em uma viagem.", to: "I have used English on a trip." },
            { from: "Antes, eu costumava responder com frases muito curtas.", to: "Before, I used to answer with very short sentences." }
        ],
        personalQuestions: [
            "What do you still find challenging?",
            "Which lesson helped you the most?",
            "What are your plans for continuing English after this module?"
        ],
        speakingTask: {
            title: "Final 2-3 minute presentation",
            steps: [
                "Parte 1: diga o que era dificil antes.",
                "Parte 2: diga o que voce consegue fazer agora com exemplos.",
                "Parte 3: compare seu ingles atual com o anterior e defina metas para B1."
            ],
            model: "Before, I used to answer with very short sentences. Now, I can talk about my routine, past experiences and plans with more detail. Speaking is still more difficult than reading, but I am more confident. My next goal is to give clearer opinions in B1."
        },
        homework: "Grave um audio ou video de 2 a 3 minutos sobre sua jornada no ingles e escreva uma autoavaliacao curta.",
        celebration: "Parabens: voce fechou a ponte A2-B1 com revisao, producao e mais prontidao para o B1."
    })
];
