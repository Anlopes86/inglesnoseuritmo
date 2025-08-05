// js/badges.js

const A1_BADGES = [
    { req: 4,  title: "Iniciante Curioso", icon: "fa-seedling" }, { req: 8,  title: "Explorador de Palavras", icon: "fa-compass" }, 
    { req: 12, title: "Construtor de Frases", icon: "fa-cubes" }, { req: 16, title: "Navegador Gramatical", icon: "fa-anchor" }, 
    { req: 20, title: "Orador Confiante", icon: "fa-comment-dots" }, { req: 24, title: "Mestre do Diálogo", icon: "fa-microphone-alt" }, 
    { req: 28, title: "Fluente em Treino", icon: "fa-rocket" }, { req: 32, title: "Lenda do A1", icon: "fa-crown" }
];
const CONVERSATION_BADGES = [
    { req: 4,  title: "Articulador de Ideias", icon: "fa-lightbulb" }, { req: 8,  title: "Navegador de Debates", icon: "fa-comments" }, 
    { req: 12, title: "Mestre da Persuasão", icon: "fa-handshake" }, { req: 16, title: "Orador Eloquente", icon: "fa-chalkboard-user" }
];
const BUSINESS_BADGES = [
    { req: 4,  title: "The Applicant", icon: "fa-user-tie" }, { req: 8,  title: "The Communicator", icon: "fa-comments-dollar" },
    { req: 12, title: "The Presenter", icon: "fa-chart-pie" }, { req: 16, title: "The Strategist", icon: "fa-chess-king" }
];
const VESTIBULAR_BADGES = [
    { req: 2, title: "Estrategista de Prova", icon: "fa-stopwatch" },
    { req: 4, title: "Detetive de Contexto", icon: "fa-search" },
    { req: 6, title: "Decifrador de Mídia", icon: "fa-image" }
];

const badgeMessages = {
    // Emblemas A1
    "Iniciante Curioso": {
        message: "O primeiro passo é o mais importante! Você demonstrou coragem e curiosidade para iniciar sua jornada. O mundo do inglês está se abrindo para você!",
        skills: ["Apresentar-se", "Perguntar e responder nomes", "Cumprimentar e despedir-se"]
    },
    "Explorador de Palavras": {
        message: "Excelente! Você está a construir o seu vocabulário e a descobrir novas palavras. Cada uma delas é uma nova ferramenta para se expressar.",
        skills: ["Usar o alfabeto e os números", "Identificar objetos do dia a dia", "Dar informações de contacto"]
    },
    "Construtor de Frases": {
        message: "Parabéns! Suas palavras estão a conectar-se e a formar ideias. Você já pode comunicar de forma simples e direta sobre as suas rotinas.",
        skills: ["Descrever rotinas diárias (Simple Present)", "Falar sobre gostos (like/don't like)", "Usar pronomes objeto (me, him, her)"]
    },
    "Navegador Gramatical": {
        message: "Impressionante! Você está a começar a entender as regras do jogo. A gramática é o mapa que o guiará para a fluência. Continue a navegar!",
        skills: ["Fazer perguntas com 'Do' e 'Does'", "Usar advérbios de frequência", "Perguntar e dizer as horas"]
    },
    "Orador Confiante": {
        message: "Uau! A sua confiança está a crescer a cada lição. Você já consegue descrever o mundo à sua volta com mais detalhes. Continue assim!",
        skills: ["Usar o possessivo ('s)", "Falar sobre profissões", "Descrever lugares com 'There is/are'"]
    },
    "Mestre do Diálogo": {
        message: "Incrível! Você já consegue manter conversas sobre o que está a acontecer agora e pedir ajuda. A comunicação é uma via de mão dupla, e você está a dirigir muito bem!",
        skills: ["Perguntar sobre quantidades (How much/many)", "Usar 'Can' para habilidades e pedidos", "Descrever ações no momento (Present Continuous)"]
    },
    "Fluente em Treino": {
        message: "Fantástico! O inglês já faz parte da sua rotina. Sua dedicação mostra que a fluência não é um sonho distante, mas um destino certo.",
        skills: ["Falar sobre o passado (was/were)", "Descrever ações passadas (Simple Past)", "Fazer perguntas no passado com 'Did'"]
    },
    "Lenda do A1": {
        message: "LENDÁRIO! Você completou a fundação do seu conhecimento. O nível A1 foi dominado com mestria. Prepare-se para os próximos desafios!",
        skills: ["Falar sobre planos futuros com 'going to'", "Utilizar os tempos verbais (presente, passado, futuro)", "Estruturar uma pequena apresentação pessoal"]
    },

    // Emblemas de Conversação
    "Articulador de Ideias": {
        message: "Brilhante! Você consegue expressar os seus pensamentos e opiniões com clareza. As suas ideias agora têm uma voz em inglês!",
        skills: ["Diferenciar sonhos, metas e ambições", "Descrever qualidades de um bom parceiro", "Defender aquilo em que acredita"]
    },
    "Navegador de Debates": {
        message: "Excelente! Você não apenas expressa as suas ideias, mas também consegue ouvir, compreender e responder a diferentes pontos de vista.",
        skills: ["Expressar opiniões e discordar polidamente", "Compreender e usar idiomas sobre amizade", "Discutir o conceito de resiliência"]
    },
    "Mestre da Persuasão": {
        message: "Impressionante! A sua habilidade de usar a linguagem para argumentar e convencer está a aprimorar-se. As pessoas estão a começar a ouvir o que você tem a dizer.",
        skills: ["Usar 'power verbs' para descrever experiências", "Discutir prós e contras da tecnologia", "Argumentar sobre dilemas morais"]
    },
    "Orador Eloquente": {
        message: "Magnífico! A sua fala é fluida, confiante e clara. Você domina a arte da conversação em inglês. O mundo agora é o seu palco!",
        skills: ["Discutir conceitos abstratos (sucesso, fracasso)", "Explicar a diferença entre conhecimento e sabedoria", "Debater sobre o futuro e ética em IA"]
    },

    // Emblemas de Vestibular
    "Estrategista de Prova": {
        message: "Parabéns! Você dominou as táticas essenciais de prova. Skimming e scanning já não têm segredos para si. A sua eficiência aumentou!",
        skills: ["Aplicar Skimming para ideias gerais", "Aplicar Scanning para detalhes específicos", "Gerir o tempo de leitura eficazmente"]
    },
    "Detetive de Contexto": {
        message: "Fantástico! A sua capacidade de deduzir o significado de palavras pelo contexto é uma superpotência no vestibular. Nenhuma palavra desconhecida o vai parar!",
        skills: ["Inferir significado de vocabulário", "Identificar a ideia principal de parágrafos", "Compreender o tom do autor"]
    },
    "Decifrador de Mídia": {
        message: "Incrível! Você agora consegue interpretar as mensagens ocultas em cartoons, charges e textos literários, uma habilidade crucial para as questões mais complexas.",
        skills: ["Analisar linguagem figurada", "Interpretar elementos visuais e verbais", "Compreender críticas e ironias"]
    },

    // NOVOS EMBLEMAS DE BUSINESS
    "The Applicant": {
        message: "Parabéns! Você dominou o básico para se apresentar e conseguir uma entrevista. A porta do mundo corporativo está se abrindo para você!",
        skills: ["Entender o mindset de uma entrevista", "Descrever suas habilidades", "Usar a técnica STAR para responder perguntas"]
    },
    "The Communicator": {
        message: "Excelente! Sua habilidade de comunicação profissional está afiada. Você consegue construir relacionamentos (networking) e se comunicar de forma clara por e-mail e telefone.",
        skills: ["Fazer Small Talk e Networking", "Escrever e-mails profissionais", "Participar de chamadas de negócios"]
    },
    "The Presenter": {
        message: "Incrível! Você agora tem as ferramentas para apresentar suas ideias, dados e projetos com confiança e persuasão. Seu público está pronto para te ouvir.",
        skills: ["Estruturar e fazer uma apresentação", "Descrever dados e tendências", "Participar de negociações"]
    },
    "The Strategist": {
        message: "Fantástico! Você alcançou o nível estratégico do inglês para negócios. Você consegue discutir finanças, resolver problemas e liderar. Você não é mais apenas um participante, é um jogador-chave.",
        skills: ["Discutir finanças e orçamento", "Estruturar a solução de problemas", "Entender comunicação intercultural"]
    }
};