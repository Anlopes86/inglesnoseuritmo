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

const bridgeEnhancements = {
    1: {
        grammar: {
            points: [
                "Na afirmativa, he/she/it recebe -s ou -es: she works, he watches.",
                "Na negativa e na pergunta, use do/does e mantenha o verbo principal na forma base: Does she work? She doesn't work.",
                "Adverbios de frequencia normalmente aparecem antes do verbo principal, mas depois do verbo be: I usually study. She is always busy."
            ],
            table: [
                ["Affirmative", "I work / She works"],
                ["Negative", "I don't work / She doesn't work"],
                ["Question", "Do you work? / Does she work?"],
                ["Frequency", "always = sempre; usually = geralmente; often = frequentemente; sometimes = as vezes; rarely = raramente; never = nunca"]
            ]
        },
        activities: [
            {
                type: "sequence",
                title: "Order a morning routine",
                instruction: "Coloque as acoes em uma ordem logica antes de contar a rotina em voz alta.",
                items: ["wake up", "make coffee", "check the schedule", "go to work", "study English at night"],
                model: "I usually wake up, make coffee, check my schedule, go to work and study English at night."
            },
            {
                type: "match",
                title: "Frequency memory cards",
                instruction: "Combine o adverbio em ingles com a ideia em portugues.",
                items: [
                    { left: "always", right: "sempre" },
                    { left: "usually", right: "geralmente" },
                    { left: "rarely", right: "raramente" },
                    { left: "never", right: "nunca" }
                ]
            }
        ],
        secondaryReading: {
            title: "Another routine: night study",
            paragraphs: [
                "Daniel works during the day, so he usually studies English after 10 p.m. He does not study for a long time, but he often listens to short dialogues before sleeping.",
                "He says night study is quiet and practical, but sometimes he feels too tired to concentrate."
            ],
            tasks: [
                "Find two adverbs of frequency in the text.",
                "Underline or copy two present simple verbs.",
                "Do you prefer morning study or night study? Why?"
            ]
        },
        translations: [
            { from: "Does your sister usually work on Saturdays?", to: "Sua irma geralmente trabalha aos sabados?" },
            { from: "I don't often study before breakfast.", to: "Eu nao estudo com frequencia antes do cafe da manha." },
            { from: "Com que frequencia seu professor envia tarefas?", to: "How often does your teacher send homework?" },
            { from: "Eles nunca chegam atrasados para a aula.", to: "They never arrive late for class." }
        ]
    },
    2: {
        grammar: {
            points: [
                "Verbos regulares recebem -ed, mas alguns mudam a grafia: study -> studied, stop -> stopped.",
                "Perguntas e negativas usam did/didn't; o verbo principal volta para a forma base: Did you go? I didn't go.",
                "Used to descreve habitos ou estados do passado que nao sao mais verdadeiros: I used to play soccer."
            ],
            table: [
                ["Regular", "visit -> visited; travel -> travelled; study -> studied"],
                ["Irregular", "go -> went; have -> had; buy -> bought; feel -> felt"],
                ["Question", "Did you enjoy the trip?"],
                ["Used to", "I used to wake up late. / I didn't use to study at night."]
            ]
        },
        activities: [
            {
                type: "match",
                title: "Irregular verb quick match",
                instruction: "Associe o infinitivo ao passado.",
                items: [
                    { left: "go", right: "went" },
                    { left: "have", right: "had" },
                    { left: "buy", right: "bought" },
                    { left: "feel", right: "felt" }
                ]
            },
            {
                type: "sequence",
                title: "Timeline builder",
                instruction: "Use os marcadores para organizar uma historia curta.",
                items: ["first", "then", "after that", "finally"],
                model: "First, I arrived at the festival. Then, I met my friends. After that, we watched a concert. Finally, we went home tired but happy."
            }
        ],
        secondaryReading: {
            title: "A different kind of trip",
            paragraphs: [
                "When Laura was a teenager, she used to travel only with her family. Last year, she travelled with friends for the first time. They planned everything together and learned how to solve small problems.",
                "The trip was not perfect, but Laura felt more independent after it."
            ],
            tasks: [
                "Why did Laura feel more independent?",
                "Find one sentence with used to.",
                "Write one question you could ask Laura about the trip."
            ]
        },
        translations: [
            { from: "I didn't use to like crowded places.", to: "Eu nao costumava gostar de lugares cheios." },
            { from: "Did they buy tickets last month?", to: "Eles compraram ingressos no mes passado?" },
            { from: "No ano passado, ela viajou sozinha pela primeira vez.", to: "Last year, she travelled alone for the first time." },
            { from: "Nos costumavamos visitar nossos avos aos domingos.", to: "We used to visit our grandparents on Sundays." }
        ]
    },
    3: {
        grammar: {
            points: [
                "Present continuous para futuro combina melhor com arranjos ja marcados: hora, lugar ou pessoa definida.",
                "Going to destaca intencao, plano ou decisao ja pensada, mesmo sem compromisso fixo.",
                "Will pode aparecer em decisoes espontaneas e previsoes; o modulo aprofunda isso no B1."
            ],
            table: [
                ["Arrangement", "I'm meeting Carol at 7 p.m."],
                ["Intention", "I'm going to study more this month."],
                ["Invitation", "Are you coming to the workshop?"],
                ["Polite refusal", "Sorry, I can't. I'm working that morning."]
            ]
        },
        activities: [
            {
                type: "scenario",
                title: "Accept, refuse or reschedule",
                instruction: "Complete um mini-dialogo para cada situacao.",
                items: [
                    { title: "Accept", detail: "Your friend invites you to a cafe on Friday." },
                    { title: "Refuse", detail: "You already have an appointment." },
                    { title: "Reschedule", detail: "Suggest Saturday afternoon." }
                ],
                prompt: "Write three short replies.",
                model: "I'd love to. I'm free on Friday. / Sorry, I can't. I'm seeing my dentist. / Can we meet on Saturday afternoon instead?"
            },
            {
                type: "transform",
                title: "Future form transformer",
                instruction: "Decida se a frase soa melhor como arranjo marcado ou intencao.",
                items: [
                    { from: "I'm going to meet Ana at 8 p.m.", task: "Rewrite as a fixed arrangement." },
                    { from: "I'm taking an English test someday.", task: "Rewrite as an intention." }
                ],
                model: "I'm meeting Ana at 8 p.m. / I'm going to take an English test."
            }
        ],
        secondaryReading: {
            title: "Planning a surprise party",
            paragraphs: [
                "Four friends are organizing a surprise party for Leo. They are meeting at Julia's apartment on Friday night to prepare the decorations. They are going to buy snacks after work because nobody has time during the week.",
                "If Leo asks questions, they are going to say they are studying together."
            ],
            tasks: [
                "Which actions are fixed arrangements?",
                "Which actions are intentions or plans?",
                "Write one invitation for this party."
            ]
        }
    },
    4: {
        grammar: {
            points: [
                "Use there is com um lugar ou item singular; use there are com itens no plural.",
                "Preposicoes ajudam a localizar: next to, across from, between, in front of, behind.",
                "Direcoes claras devem ter comando, distancia e referencia visual."
            ],
            table: [
                ["next to", "ao lado de"],
                ["across from", "em frente / do outro lado"],
                ["between", "entre dois lugares"],
                ["behind", "atras de"],
                ["in front of", "na frente de"]
            ]
        },
        activities: [
            {
                type: "classify",
                title: "Preposition map labels",
                instruction: "Imagine um mapa simples e posicione mentalmente cada etiqueta.",
                items: [
                    { term: "The bakery is next to the bank.", category: "side by side" },
                    { term: "The school is across from the park.", category: "opposite side" },
                    { term: "The cafe is between the pharmacy and the bookstore.", category: "middle" }
                ]
            },
            {
                type: "scenario",
                title: "Lost tourist dialogue",
                instruction: "Monte uma resposta completa para um turista perdido.",
                items: [
                    { title: "Need", detail: "The tourist wants the subway station." },
                    { title: "Route", detail: "Two blocks straight, left after the bakery." }
                ],
                prompt: "Write directions with at least three direction verbs.",
                model: "Go straight for two blocks, turn left after the bakery and cross the street. The subway station is across from the pharmacy."
            }
        ],
        secondaryReading: {
            title: "A second wrong turn",
            paragraphs: [
                "Mateus left the bus station and turned right too early. He walked behind a supermarket and realized the street name was wrong. Instead of panicking, he asked a shop assistant for help.",
                "The assistant showed him that the museum was between the library and the city hall, not behind the supermarket."
            ],
            tasks: [
                "What mistake did Mateus make?",
                "What could he have done before walking?",
                "Describe the museum location in your own words."
            ]
        }
    },
    5: {
        grammar: {
            points: [
                "Much combina com incontaveis; many combina com contaveis no plural.",
                "Much/many aparecem muito em perguntas e negativas. Em afirmativas, a lot of/lots of soa mais natural.",
                "A few significa algumas unidades; few sugere poucas. A little significa um pouco; little sugere pouco ou insuficiente.",
                "Depois de should/shouldn't, use o verbo base: should drink, shouldn't skip."
            ],
            table: [
                ["Countable", "many apples, a few eggs, few vegetables"],
                ["Uncountable", "much water, a little sugar, little time"],
                ["Affirmative", "I drink a lot of water."],
                ["Question/negative", "How much water? / I don't eat many snacks."]
            ]
        },
        activities: [
            {
                type: "classify",
                title: "Countable or uncountable",
                instruction: "Classifique os itens antes de escolher o quantificador.",
                items: [
                    { term: "apple", category: "countable" },
                    { term: "rice", category: "uncountable" },
                    { term: "advice", category: "uncountable" },
                    { term: "egg", category: "countable" }
                ]
            },
            {
                type: "scenario",
                title: "Advice to a busy friend",
                instruction: "Seu amigo esta cansado, come mal e nao se exercita.",
                items: [
                    { title: "Problem 1", detail: "headache" },
                    { title: "Problem 2", detail: "too much screen time" },
                    { title: "Problem 3", detail: "not many healthy meals" }
                ],
                prompt: "Write three pieces of advice with should/shouldn't.",
                model: "You should drink more water. You shouldn't use your phone before bed. You should prepare a few simple meals at home."
            }
        ],
        secondaryReading: {
            title: "A simple recipe note",
            paragraphs: [
                "For a quick breakfast, mix two bananas, a little milk, some oats and a few strawberries. You do not need much sugar because the fruit is already sweet.",
                "This recipe is simple, but it gives you a lot of energy before work or class."
            ],
            tasks: [
                "Find two countable nouns.",
                "Find two uncountable nouns.",
                "Write your own healthy recipe with quantities."
            ]
        }
    },
    6: {
        grammar: {
            points: [
                "Must often shows a strong obligation from the speaker or from official rules: You must wear an ID badge.",
                "Have to often points to an external obligation or routine requirement: I have to send reports every Friday.",
                "Mustn't means prohibition. Don't have to means it is optional or not necessary.",
                "Comparatives: short adjectives use -er; long adjectives use more; good/bad are irregular."
            ],
            table: [
                ["Ability/permission", "I can work from home."],
                ["External obligation", "I have to follow company rules."],
                ["Strong rule", "Visitors must sign in."],
                ["Prohibition", "You mustn't share passwords."],
                ["Not necessary", "You don't have to work on Sunday."]
            ]
        },
        activities: [
            {
                type: "classify",
                title: "Obligation sorter",
                instruction: "Classifique a funcao de cada frase.",
                items: [
                    { term: "You mustn't use your phone during the exam.", category: "prohibition" },
                    { term: "I have to send invoices every Monday.", category: "routine obligation" },
                    { term: "You don't have to attend the optional meeting.", category: "not necessary" }
                ]
            },
            {
                type: "correct",
                title: "Fix common modal mistakes",
                instruction: "Observe o erro e a correcao.",
                items: [
                    { wrong: "I must to finish this report.", correct: "I must finish this report." },
                    { wrong: "She doesn't has to work today.", correct: "She doesn't have to work today." },
                    { wrong: "This job is more easy.", correct: "This job is easier." }
                ]
            }
        ],
        secondaryReading: {
            title: "Two work routines compared",
            paragraphs: [
                "In Carla's office, employees must arrive before 9 a.m. and they have to register every client call. In Diego's remote job, the schedule is more flexible, but he has to send a daily update.",
                "Carla thinks office work is clearer. Diego thinks remote work is better for concentration."
            ],
            tasks: [
                "Find one must rule and one have to obligation.",
                "Compare Carla's routine and Diego's routine.",
                "Which routine would work better for you?"
            ]
        }
    },
    7: {
        grammar: {
            points: [
                "For requests, can and could are common; could sounds more polite.",
                "For permission, can and may are possible; may sounds more formal.",
                "May is less common for asking someone to do something for you. Use could you for polite requests.",
                "Service English works best when you explain the problem briefly, then ask for a solution."
            ],
            table: [
                ["Direct request", "Can you check my reservation?"],
                ["Polite request", "Could you check my reservation, please?"],
                ["Formal permission", "May I see the menu?"],
                ["Problem frame", "There seems to be a problem with my boarding pass."]
            ]
        },
        activities: [
            {
                type: "scenario",
                title: "Airport problem simulator",
                instruction: "Escolha um problema e escreva o pedido ao atendente.",
                items: [
                    { title: "Boarding pass", detail: "Your name is spelled incorrectly." },
                    { title: "Lost bag", detail: "Your suitcase did not arrive." },
                    { title: "Delay", detail: "Your flight is delayed and you need information." }
                ],
                prompt: "Use there seems to be and could you.",
                model: "Excuse me, there seems to be a problem with my boarding pass. My name is spelled incorrectly. Could you help me correct it, please?"
            },
            {
                type: "match",
                title: "Politeness scale",
                instruction: "Compare the tone of each request.",
                items: [
                    { left: "Can you check this?", right: "neutral/direct" },
                    { left: "Could you check this, please?", right: "polite" },
                    { left: "May I see the manager?", right: "formal permission/request to speak" }
                ]
            }
        ],
        secondaryReading: {
            title: "At the hotel desk",
            paragraphs: [
                "Rafaela booked a quiet room, but the room faced a noisy avenue. She went to reception and said, 'There seems to be a problem with my room. I requested a quiet room. Could you check if another room is available?'",
                "The receptionist apologized and moved her to a room on a higher floor."
            ],
            tasks: [
                "Which phrase makes Rafaela sound polite?",
                "What problem did she explain?",
                "Write a similar request for a restaurant problem."
            ]
        }
    },
    8: {
        grammar: {
            points: [
                "Present perfect form: have/has + past participle.",
                "Regular participles often end in -ed: worked, tested, downloaded.",
                "Common irregular participles: been, gone, seen, used, had, bought, written.",
                "Use ever/never for life experience; use yesterday, last week and in 2024 with past simple."
            ],
            table: [
                ["Experience", "Have you ever used AI?"],
                ["No specific time", "I have tested three apps."],
                ["Finished time", "I downloaded the app yesterday."],
                ["Markers", "ever, never, just, for, since vs. yesterday, last month, in 2024"]
            ]
        },
        activities: [
            {
                type: "classify",
                title: "Perfect or past simple?",
                instruction: "Decida qual tempo verbal combina com o marcador.",
                items: [
                    { term: "ever", category: "present perfect" },
                    { term: "yesterday", category: "past simple" },
                    { term: "last month", category: "past simple" },
                    { term: "never", category: "present perfect" }
                ]
            },
            {
                type: "checklist",
                title: "Experience bingo",
                instruction: "Marque mentalmente experiencias que voce ja teve e transforme em frases.",
                items: [
                    "used virtual reality",
                    "talked to a foreigner online",
                    "taken an online course",
                    "used AI to correct English"
                ],
                model: "I have used AI to correct English. Last week, I used it to improve a short paragraph."
            }
        ],
        secondaryReading: {
            title: "A short tech diary",
            paragraphs: [
                "I have changed the way I study because of technology. I have used flashcard apps, online dictionaries and video calls with teachers. Last month, I also joined an online speaking group.",
                "The group helped me because I had to speak with real people, not only type answers."
            ],
            tasks: [
                "Copy three present perfect sentences or verb phrases.",
                "Find one past simple sentence.",
                "Write two sentences about your own technology habits."
            ]
        }
    },
    9: {
        grammar: {
            points: [
                "One-syllable adjectives usually use -er/-est: small, smaller, the smallest.",
                "Adjectives ending in -y change to -ier/-iest: funny, funnier, the funniest.",
                "Long adjectives use more/the most: more realistic, the most realistic.",
                "Do not double the comparison: avoid more easier or most funniest."
            ],
            table: [
                ["Short", "cheap -> cheaper -> the cheapest"],
                ["-y", "funny -> funnier -> the funniest"],
                ["Long", "interesting -> more interesting -> the most interesting"],
                ["Irregular", "good -> better -> the best; bad -> worse -> the worst"],
                ["Nouns", "more time / fewer mistakes / less stress"]
            ]
        },
        activities: [
            {
                type: "ranking",
                title: "Cultural ranking",
                instruction: "Ordene mentalmente tres filmes, series ou livros e justifique.",
                items: ["Most interesting", "More relaxing than...", "The best recommendation for a friend"],
                prompt: "Write a mini ranking with two comparatives and one superlative.",
                model: "For me, this documentary is the most interesting. The comedy is more relaxing than the drama, but the drama has the best story."
            },
            {
                type: "correct",
                title: "Avoid double comparatives",
                instruction: "Corrija os erros comuns.",
                items: [
                    { wrong: "This movie is more funnier.", correct: "This movie is funnier." },
                    { wrong: "It is the most cheapest option.", correct: "It is the cheapest option." },
                    { wrong: "I made less mistakes.", correct: "I made fewer mistakes." }
                ]
            }
        ],
        secondaryReading: {
            title: "Two weekend options",
            paragraphs: [
                "The theater is more expensive than the cinema, but it feels more personal. The cinema is cheaper and more comfortable for a simple night out.",
                "For me, the best option depends on the mood: theater for a special evening, cinema for a relaxing weekend."
            ],
            tasks: [
                "Find two comparatives.",
                "Find one superlative.",
                "Which option is better for you and why?"
            ]
        }
    },
    10: {
        grammar: {
            points: [
                "Use this final lesson to move between present, past, future, modals, quantifiers and comparisons.",
                "A strong B1-prep answer usually includes context, one example and one reason.",
                "Mistakes are useful data: identify the topic, review the rule and try again in a personal sentence."
            ],
            table: [
                ["Routine", "I usually study after work."],
                ["Past", "Last year, I started speaking more."],
                ["Future", "I am going to practice twice a week."],
                ["Advice", "I should review my mistakes."],
                ["Comparison", "Speaking is more challenging than reading."]
            ]
        },
        activities: [
            {
                type: "checklist",
                title: "Can-do self-assessment",
                instruction: "Marque mentalmente o que voce ja consegue fazer e escolha dois pontos para revisar.",
                items: [
                    "I can describe my routine clearly.",
                    "I can tell a short past story.",
                    "I can give directions.",
                    "I can use comparatives and superlatives.",
                    "I can explain a service problem politely."
                ],
                model: "My strongest point is routine language. My next review points are present perfect and polite requests."
            },
            {
                type: "project",
                title: "200-word written project",
                instruction: "Escreva um relato sobre sua evolucao no ingles.",
                items: [
                    "Mention your old routine.",
                    "Tell one past learning moment.",
                    "Explain future plans.",
                    "Compare your English before and now.",
                    "Include one piece of advice for yourself."
                ],
                prompt: "Write your final bridge reflection here.",
                model: "Before, I used to answer with very short sentences. Now, I can explain my routine, past experiences and future plans with more detail. My next goal is to speak more naturally in B1."
            }
        ],
        secondaryReading: {
            title: "Final integrated challenge",
            paragraphs: [
                "Before B1, a learner does not need perfect grammar, but they need control. Control means noticing time markers, choosing a useful structure and connecting ideas with reasons and examples.",
                "A good final answer can include a present habit, a past experience, a future plan and one comparison."
            ],
            tasks: [
                "Write one sentence for each structure: present, past, future and comparison.",
                "Which grammar point still feels unstable?",
                "Choose one topic to review before starting B1."
            ]
        }
    }
};

window.PREPB1_LESSONS = window.PREPB1_LESSONS.map(lesson => {
    const enhancement = bridgeEnhancements[lesson.number];
    if (!enhancement) return lesson;

    return {
        ...lesson,
        ...enhancement,
        grammar: {
            ...lesson.grammar,
            ...enhancement.grammar
        }
    };
});
