// js/expressions.js

const lessonExpressions = {
    'default': [{ 
        expression: "Let's get started!",
        meaning: "Vamos começar! Uma expressão de encorajamento para iniciar os estudos."
    }],
    'a1-licao-01': [{
        expression: "What's up?",
        meaning: "E aí? / Tudo bem? Uma forma muito comum e informal de dizer 'How are you?'."
    }, {
        expression: "How's it going?",
        meaning: "Como vai? Outra alternativa informal e muito comum para 'How are you?'."
    }],
    'a1-licao-02': [{
        expression: "Likewise.",
        meaning: "Igualmente. Uma resposta curta e educada para 'Nice to meet you!'."
    }, {
        expression: "I'm from Brazil.",
        meaning: "Eu sou do Brasil. A estrutura padrão para responder de onde você é."
    }],
    'a1-licao-03': [{
        expression: "This is my friend.",
        meaning: "Este é o meu amigo. A forma mais comum de apresentar alguém a outra pessoa."
    }, {
        expression: "Pleased to meet you.",
        meaning: "Prazer em conhecê-lo. Uma alternativa um pouco mais formal para 'Nice to meet you'."
    }],
    'a1-licao-04': [{
        expression: "Could you spell that?",
        meaning: "Você poderia soletrar? Uma pergunta útil para confirmar a grafia de nomes ou palavras."
    }, {
        expression: "You can count on me.",
        meaning: "Você pode contar comigo. Uma expressão que usa números de forma figurada."
    }],
    'a1-licao-05': [{
        expression: "Keep in touch.",
        meaning: "Mantenha contato. Usado como uma forma amigável de se despedir de alguém."
    }, {
        expression: "What's your email address?",
        meaning: "Qual é o seu endereço de e-mail? A pergunta padrão para obter o e-mail de alguém."
    }],
    'a1-licao-06': [{
        expression: "It's an umbrella.",
        meaning: "É um guarda-chuva. Um exemplo clássico do uso de 'an' antes de um som de vogal."
    }, {
        expression: "A piece of cake.",
        meaning: "Moleza. Uma expressão idiomática que significa que algo é muito fácil."
    }],
    'a1-licao-07': [{
        expression: "This is for you.",
        meaning: "Isto é para você. Usado ao entregar um presente ou algo a alguém que está perto."
    }, {
        expression: "Look at that!",
        meaning: "Olha aquilo! Usado para chamar a atenção para algo que está longe."
    }],
    'a1-licao-08': [{
        expression: "So far, so good.",
        meaning: "Até agora, tudo bem. Usado para dizer que as coisas estão indo bem até o momento."
    }, {
        expression: "Let's review.",
        meaning: "Vamos revisar. Uma frase comum usada por professores para iniciar uma revisão."
    }],
    'a1-licao-09': [{
        expression: "To sleep in.",
        meaning: "Dormir até mais tarde. Usado para quando você não precisa acordar cedo."
    }, {
        expression: "Early bird.",
        meaning: "Pessoa matutina. Alguém que gosta de acordar cedo."
    }],
    'a1-licao-10': [{
        expression: "He works a lot.",
        meaning: "Ele trabalha muito. Um exemplo claro do uso do '-s' na terceira pessoa."
    }, {
        expression: "She has a dog.",
        meaning: "Ela tem um cachorro. Lembra que 'have' se torna 'has' para he/she/it."
    }],
    'a1-licao-11': [{
        expression: "It's not my cup of tea.",
        meaning: "Não é a minha praia. Uma forma educada de dizer que você não gosta de algo."
    }, {
        expression: "I'm a big fan of...",
        meaning: "Eu sou um grande fã de... Uma forma de expressar que você gosta muito de algo."
    }],
    'a1-licao-12': [{
        expression: "I don't mind.",
        meaning: "Eu não me importo. Uma forma de dizer que algo não o incomoda."
    }, {
        expression: "I'll pass.",
        meaning: "Vou passar. Uma maneira informal de recusar uma oferta ou convite."
    }],
    'a1-licao-13': [{
        expression: "Give me a hand.",
        meaning: "Me dê uma mãozinha / Me ajude. Um pedido informal de ajuda."
    }, {
        expression: "Talk to me.",
        meaning: "Fale comigo. Um exemplo direto do uso do pronome objeto 'me'."
    }],
    'a1-licao-14': [{
        expression: "Once in a blue moon.",
        meaning: "Uma vez na vida, outra na morte. Significa que algo acontece muito raramente."
    }, {
        expression: "From time to time.",
        meaning: "De vez em quando. Um sinônimo para 'sometimes'."
    }],
    'a1-licao-15': [{
        expression: "Time flies!",
        meaning: "O tempo voa! Uma expressão usada para dizer que o tempo passou muito rápido."
    }, {
        expression: "On the dot.",
        meaning: "Em ponto. Usado para dizer que algo acontece exatamente em um determinado horário (e.g., at 8 o'clock on the dot)."
    }],
    'a1-licao-16': [{
        expression: "Better late than never.",
        meaning: "Antes tarde do que nunca. Usado para dizer que é melhor fazer algo tarde do que não fazer."
    }, {
        expression: "To kill time.",
        meaning: "Matar o tempo. Fazer algo para se manter ocupado enquanto espera."
    }],
    'a1-licao-17': [{
        expression: "It rings a bell.",
        meaning: "Isso me soa familiar. Dito quando algo parece vagamente familiar."
    }, {
        expression: "For goodness' sake!",
        meaning: "Pelo amor de Deus! Uma expressão de surpresa ou frustração."
    }],
    'a1-licao-18': [{
        expression: "A jack of all trades.",
        meaning: "Pau para toda obra / Faz-tudo. Refere-se a uma pessoa com muitas habilidades."
    }, {
        expression: "Nine-to-five job.",
        meaning: "Trabalho de horário comercial. Refere-se a um trabalho com horário padrão."
    }],
    'a1-licao-19': [{
        expression: "Make yourself at home.",
        meaning: "Sinta-se em casa. Dito para fazer um convidado se sentir confortável em sua casa."
    }, {
        expression: "There you go.",
        meaning: "Aqui está / Isso mesmo. Usado ao entregar algo ou para confirmar que alguém acertou algo."
    }],
    'a1-licao-20': [{
        expression: "I'm on my way.",
        meaning: "Estou a caminho. Usado para informar que você já está indo para o local."
    }, {
        expression: "It's around the corner.",
        meaning: "É virando a esquina. Significa que algo está muito perto."
    }],
    'a1-licao-21': [{
        expression: "How much is it?",
        meaning: "Quanto custa? A pergunta fundamental para saber o preço de algo."
    }, {
        expression: "That's a rip-off!",
        meaning: "Isso é um roubo! Uma expressão forte para dizer que algo é muito caro."
    }],
    'a1-licao-22': [{
        expression: "Just a little bit.",
        meaning: "Só um pouquinho. Uma resposta comum para 'How much?' quando se refere a algo incontável."
    }, {
        expression: "A few good men.",
        meaning: "Alguns bons homens. Um exemplo clássico do uso de 'a few' com substantivos contáveis."
    }],
    'a1-licao-23': [{
        expression: "I can't help it.",
        meaning: "Eu não consigo evitar. Usado para dizer que você não tem controle sobre uma ação ou sentimento."
    }, {
        expression: "You can do it!",
        meaning: "Você consegue! Uma frase de encorajamento muito comum."
    }],
    'a1-licao-24': [{
        expression: "What are you up to?",
        meaning: "O que você está fazendo? Uma maneira informal e amigável de perguntar 'What are you doing?'."
    }, {
        expression: "I'm just kidding.",
        meaning: "Estou só brincando. Dito para esclarecer que algo não foi falado a sério."
    }],
    'a1-licao-25': [{
        expression: "For the time being.",
        meaning: "Por enquanto. Refere-se a uma situação temporária que está acontecendo agora."
    }, {
        expression: "Now and then.",
        meaning: "De vez em quando. Uma expressão que se refere a algo que acontece ocasionalmente (rotina)."
    }],
    'a1-licao-26': [{
        expression: "You rock!",
        meaning: "Você é demais! Um grande elogio, dizendo que alguém é incrível."
    }, {
        expression: "I'm on it.",
        meaning: "Estou cuidando disso. Uma forma de dizer que você está assumindo a responsabilidade por uma tarefa."
    }],
    'a1-licao-27': [{
        expression: "That was close!",
        meaning: "Foi por pouco! Dito quando você quase teve um problema, mas conseguiu evitar."
    }, {
        expression: "Were you there?",
        meaning: "Você estava lá? Uma pergunta comum para saber sobre a presença de alguém no passado."
    }],
    'a1-licao-28': [{
        expression: "I had a blast!",
        meaning: "Eu me diverti muito! Uma forma entusiasmada de dizer que você gostou muito de um evento."
    }, {
        expression: "Long story short.",
        meaning: "Resumindo a história. Usado para dar uma versão curta de um evento passado."
    }],
    'a1-licao-29': [{
        expression: "Did I miss anything?",
        meaning: "Eu perdi alguma coisa? Pergunta feita quando você chega atrasado."
    }, {
        expression: "It didn't work.",
        meaning: "Não funcionou. Uma frase simples para descrever uma tentativa fracassada no passado."
    }],
    'a1-licao-30': [{
        expression: "I'm looking forward to it.",
        meaning: "Estou ansioso por isso. Usado para mostrar entusiasmo sobre um evento futuro."
    }, {
        expression: "It's gonna be awesome.",
        meaning: "Vai ser incrível. 'Gonna' é a contração informal de 'going to'."
    }],
    'a1-licao-31': [{
        expression: "Let's wrap it up.",
        meaning: "Vamos encerrar. Uma expressão usada para finalizar uma reunião, aula ou tarefa."
    }, {
        expression: "In a nutshell.",
        meaning: "Em resumo. Usado para introduzir uma conclusão concisa de tudo o que foi dito."
    }],
    'a1-licao-32': [{
        expression: "Break a leg!",
        meaning: "Boa sorte! Uma forma idiomática de desejar sorte a alguém antes de uma apresentação."
    }, {
        expression: "The floor is yours.",
        meaning: "A palavra é sua. Dito para passar a vez para a próxima pessoa falar em uma apresentação."
    }],
    'conversation-licao-01': [{
        expression: "The sky's the limit.",
        meaning: "O céu é o limite. Significa que não há limites para o que se pode alcançar."
    }, {
        expression: "To set a goal.",
        meaning: "Definir um objetivo. O ato de estabelecer uma meta clara e específica."
    }],
    'conversation-licao-02': [{
        expression: "To be on the same page.",
        meaning: "Estar na mesma página. Significa que duas ou mais pessoas estão de acordo ou a pensar da mesma forma."
    }, {
        expression: "To tie the knot.",
        meaning: "Amarrar o nó / Casar-se. Uma expressão idiomática para o ato de casar."
    }],
    'conversation-licao-03': [{
        expression: "To break the mold.",
        meaning: "Quebrar o molde. Fazer algo de uma maneira nova e diferente do que é tradicional."
    }, {
        expression: "To stand up for something.",
        meaning: "Defender algo. Lutar por uma ideia, princípio ou pessoa em que se acredita."
    }],
    'conversation-licao-04': [{
        expression: "The best of both worlds.",
        meaning: "O melhor dos dois mundos. Descreve uma situação em que se pode usufruir das vantagens de duas coisas diferentes."
    }, {
        expression: "Hustle and bustle.",
        meaning: "Agitação e correria. Refere-se à energia e ao barulho de um lugar movimentado, como uma grande cidade."
    }],
    'conversation-licao-05': [{
        expression: "A friend in need is a friend indeed.",
        meaning: "Um amigo na necessidade é um amigo de verdade. Um provérbio que significa que um verdadeiro amigo ajuda quando você mais precisa."
    }, {
        expression: "To see eye to eye.",
        meaning: "Concordar plenamente. Quando duas pessoas partilham da mesma opinião sobre algo."
    }],
    'conversation-licao-06': [{
        expression: "Every cloud has a silver lining.",
        meaning: "Toda nuvem tem um lado bom / Há males que vêm para bem. Significa que há algo de positivo em toda a situação difícil."
    }, {
        expression: "To bite the bullet.",
        meaning: "Engolir o sapo / Aguentar firme. Decidir fazer algo difícil ou desagradável que se tem vindo a evitar."
    }],
    'conversation-licao-07': [{
        expression: "To get itchy feet.",
        meaning: "Ter comichão nos pés. Sentir uma forte vontade de viajar ou de se mudar para outro lugar."
    }, {
        expression: "Off the beaten path.",
        meaning: "Fora do caminho tradicional. Refere-se a lugares que não são muito visitados por turistas."
    }],
    'conversation-licao-08': [{
        expression: "To climb the career ladder.",
        meaning: "Subir na carreira. Progredir para posições mais altas e importantes numa empresa."
    }, {
        expression: "To work around the clock.",
        meaning: "Trabalhar sem parar / 24 horas por dia. Trabalhar por longos períodos sem descanso."
    }],
    'conversation-licao-09': [{
        expression: "A double-edged sword.",
        meaning: "Uma faca de dois gumes. Algo que tem tanto vantagens como desvantagens."
    }, {
        expression: "To go viral.",
        meaning: "Tornar-se viral. Quando um conteúdo (vídeo, imagem) se espalha rapidamente pela internet."
    }],
    'conversation-licao-10': [{
        expression: "To be in the same boat.",
        meaning: "Estar no mesmo barco. Estar na mesma situação difícil que outra pessoa."
    }, {
        expression: "To take something with a pinch of salt.",
        meaning: "Ver com um grão de sal / Não levar ao pé da letra. Não acreditar completamente em algo que se ouviu."
    }],
    'conversation-licao-11': [{
        expression: "To make your blood run cold.",
        meaning: "Fazer o sangue gelar. Causar muito medo ou terror em alguém."
    }, {
        expression: "A gut feeling.",
        meaning: "Um pressentimento / Intuição. Uma sensação forte de que algo está certo ou errado, sem uma razão lógica."
    }],
    'conversation-licao-12': [{
        expression: "To take a trip down memory lane.",
        meaning: "Fazer uma viagem pela estrada da memória. Relembrar e falar sobre eventos do passado."
    }, {
        expression: "Those were the days.",
        meaning: "Aqueles eram os dias. Uma expressão nostálgica para se referir a um tempo passado que era melhor."
    }],
    'conversation-licao-13': [{
        expression: "To be caught red-handed.",
        meaning: "Ser apanhado em flagrante. Ser apanhado no exato momento em que se está a fazer algo errado."
    }, {
        expression: "A grey area.",
        meaning: "Uma área cinzenta. Uma situação que não é clara e onde as regras não se aplicam facilmente."
    }],
    'conversation-licao-14': [{
        expression: "The proof is in the pudding.",
        meaning: "A prova está no pudim / A prova dos nove. Significa que a qualidade de algo só pode ser julgada depois de ser testada ou usada."
    }, {
        expression: "To have a sweet tooth.",
        meaning: "Gostar muito de doces. Descreve alguém que adora comer coisas doces."
    }],
    'conversation-licao-15': [{
        expression: "To learn from your mistakes.",
        meaning: "Aprender com os seus erros. Usar as experiências negativas como uma oportunidade de aprendizado."
    }, {
        expression: "Success is the best revenge.",
        meaning: "O sucesso é a melhor vingança. Um ditado que sugere que a melhor forma de responder a quem duvidou de si é alcançar o sucesso."
    }],
    'conversation-licao-16': [{
        expression: "A paradigm shift.",
        meaning: "Uma mudança de paradigma. Uma mudança fundamental na abordagem ou nos pressupostos subjacentes."
    }, {
        expression: "To think outside the box.",
        meaning: "Pensar fora da caixa. Pensar de forma criativa e não convencional."
    }],
    'conversation-licao-17': [{
        expression: "A learning curve.",
        meaning: "Uma curva de aprendizado. O processo de aprender uma nova habilidade, que pode ser difícil no início."
    }, {
        expression: "You can't teach an old dog new tricks.",
        meaning: "Não se pode ensinar truques novos a um cão velho. Um ditado que sugere que é difícil mudar os hábitos de alguém."
    }],
    'conversation-licao-18': [{
        expression: "A drop in the ocean.",
        meaning: "Uma gota no oceano. Uma quantidade muito pequena que não terá muito efeito."
    }, {
        expression: "The tip of the iceberg.",
        meaning: "A ponta do icebergue. Apenas uma pequena parte de um problema muito maior."
    }],
    'vestibular-licao-01': [{
        expression: "To read between the lines.",
        meaning: "Ler nas entrelinhas. Entender o significado implícito de um texto."
    }],
    'vestibular-licao-02': [{
        expression: "To get the gist of something.",
        meaning: "Pegar a ideia principal de algo. Entender o ponto central sem focar nos detalhes."
    }],
    'vestibular-licao-03': [{
        expression: "In a nutshell.",
        meaning: "Em resumo. Usado para apresentar a ideia principal de forma concisa."
    }],
    // NOVAS EXPRESSÕES DE BUSINESS
    'business-licao-01': [{
        expression: "To think outside the box.",
        meaning: "Pensar fora da caixa. Ter ideias criativas e inovadoras."
    }, {
        expression: "To be on the same page.",
        meaning: "Estar na mesma página. Significa que todos em um grupo entendem e concordam com algo."
    }],
    'business-licao-02': [{
        expression: "A steep learning curve.",
        meaning: "Uma curva de aprendizado íngreme. Significa que algo é difícil de aprender e exige muito esforço em pouco tempo."
    }]
};