// js/challenges.js


const dailyChallenges = [
    {
        "pergunta": "Como você se apresenta em inglês?",
        "resposta": "Hello, my name is [seu nome].",
        "dicas": [
            "Saudação e nome",
            "Começa com Hello"
        ],
        "explicacao": "Para se apresentar, diga 'Hello, my name is...' seguido do seu nome.",
        "nivel": "A1"
    },
    {
        "pergunta": "Qual a frase para perguntar 'Como você está?'",
        "resposta": "How are you?",
        "dicas": [
            "Pergunta comum",
            "Começa com How"
        ],
        "explicacao": "'How are you?' é a forma mais comum de perguntar como alguém está.",
        "nivel": "A1"
    },
    {
        "pergunta": "Como você responde 'Estou bem, obrigado'?",
        "resposta": "I'm fine, thank you.",
        "dicas": [
            "Resposta padrão",
            "Inclui agradecimento"
        ],
        "explicacao": "'I'm fine, thank you.' é uma resposta educada para 'How are you?'.",
        "nivel": "A1"
    },
    {
        "pergunta": "Qual a frase para se despedir?",
        "resposta": "Goodbye!",
        "dicas": [
            "Despedida simples",
            "Pode ser 'Bye'"
        ],
        "explicacao": "'Goodbye!' é uma forma comum de se despedir.",
        "nivel": "A1"
    },
    {
        "pergunta": "Como você pergunta 'Qual é o seu nome?'",
        "resposta": "What is your name?",
        "dicas": [
            "Pergunta sobre identificação",
            "Começa com What"
        ],
        "explicacao": "'What is your name?' é a pergunta para saber o nome de alguém.",
        "nivel": "A1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Prazer em conhecê-lo'?",
        "resposta": "Nice to meet you.",
        "dicas": [
            "Expressão de cortesia",
            "Após apresentação"
        ],
        "explicacao": "'Nice to meet you.' é uma expressão de cortesia ao conhecer alguém.",
        "nivel": "A1"
    },
    {
        "pergunta": "Como você pede desculpas?",
        "resposta": "I'm sorry.",
        "dicas": [
            "Expressão de arrependimento",
            "Simples e direta"
        ],
        "explicacao": "'I'm sorry.' é a forma mais comum de pedir desculpas.",
        "nivel": "A1"
    },
    {
        "pergunta": "Qual a frase para agradecer?",
        "resposta": "Thank you.",
        "dicas": [
            "Expressão de gratidão",
            "Pode ser 'Thanks'"
        ],
        "explicacao": "'Thank you.' é a forma padrão de agradecer.",
        "nivel": "A1"
    },
    {
        "pergunta": "Como você pergunta 'Você fala inglês?'",
        "resposta": "Do you speak English?",
        "dicas": [
            "Pergunta sobre idioma",
            "Começa com Do"
        ],
        "explicacao": "'Do you speak English?' é a pergunta para saber se alguém fala inglês.",
        "nivel": "A1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu não entendo'?",
        "resposta": "I don't understand.",
        "dicas": [
            "Expressão de confusão",
            "Negação"
        ],
        "explicacao": "'I don't understand.' é usado quando você não compreende algo.",
        "nivel": "A1"
    },
    {
        "pergunta": "Como você pede para repetir?",
        "resposta": "Can you repeat that, please?",
        "dicas": [
            "Pedido de clareza",
            "Usa 'Can you'"
        ],
        "explicacao": "'Can you repeat that, please?' é uma forma educada de pedir para alguém repetir.",
        "nivel": "A1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu preciso de ajuda'?",
        "resposta": "I need help.",
        "dicas": [
            "Pedido de socorro",
            "Verbo 'precisar'"
        ],
        "explicacao": "'I need help.' é usado quando você precisa de assistência.",
        "nivel": "A1"
    },
    {
        "pergunta": "Como você pergunta 'Onde é o banheiro?'",
        "resposta": "Where is the restroom?",
        "dicas": [
            "Pergunta de localização",
            "Sinônimo de 'bathroom'"
        ],
        "explicacao": "'Where is the restroom?' é uma forma educada de perguntar a localização do banheiro.",
        "nivel": "A1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com fome'?",
        "resposta": "I'm hungry.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm hungry.' é usado para expressar que você está com fome.",
        "nivel": "A1"
    },
    {
        "pergunta": "Como você diz 'Eu estou com sede'?",
        "resposta": "I'm thirsty.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm thirsty.' é usado para expressar que você está com sede.",
        "nivel": "A1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu gosto de café'?",
        "resposta": "I like coffee.",
        "dicas": [
            "Expressão de preferência",
            "Verbo 'gostar'"
        ],
        "explicacao": "'I like coffee.' é usado para expressar sua preferência por café.",
        "nivel": "A1"
    },
    {
        "pergunta": "Como você pergunta 'Quanto custa?'",
        "resposta": "How much is it?",
        "dicas": [
            "Pergunta sobre preço",
            "Começa com How much"
        ],
        "explicacao": "'How much is it?' é a pergunta para saber o preço de algo.",
        "nivel": "A1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu não sei'?",
        "resposta": "I don't know.",
        "dicas": [
            "Expressão de incerteza",
            "Negação"
        ],
        "explicacao": "'I don't know.' é usado quando você não tem a informação.",
        "nivel": "A1"
    },
    {
        "pergunta": "Como você diz 'Por favor'?",
        "resposta": "Please.",
        "dicas": [
            "Palavra de cortesia",
            "Antes de um pedido"
        ],
        "explicacao": "'Please.' é usado para tornar um pedido mais educado.",
        "nivel": "A1"
    },
    {
        "pergunta": "Qual a frase para dizer 'De nada'?",
        "resposta": "You're welcome.",
        "dicas": [
            "Resposta a agradecimento",
            "Cortesia"
        ],
        "explicacao": "'You're welcome.' é a resposta padrão para 'Thank you.'",
        "nivel": "A1"
    },
    {
        "pergunta": "Como você pergunta 'Que horas são?'",
        "resposta": "What time is it?",
        "dicas": [
            "Pergunta sobre tempo",
            "Começa com What time"
        ],
        "explicacao": "'What time is it?' é a pergunta para saber a hora atual.",
        "nivel": "A1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou cansado'?",
        "resposta": "I'm tired.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm tired.' é usado para expressar cansaço.",
        "nivel": "A1"
    },
    {
        "pergunta": "Como você diz 'Bom dia'?",
        "resposta": "Good morning.",
        "dicas": [
            "Saudação matinal",
            "Até o meio-dia"
        ],
        "explicacao": "'Good morning.' é a saudação usada pela manhã.",
        "nivel": "A1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Boa tarde'?",
        "resposta": "Good afternoon.",
        "dicas": [
            "Saudação vespertina",
            "Após o meio-dia"
        ],
        "explicacao": "'Good afternoon.' é a saudação usada à tarde.",
        "nivel": "A1"
    },
    {
        "pergunta": "Como você diz 'Boa noite' (ao chegar)?",
        "resposta": "Good evening.",
        "dicas": [
            "Saudação noturna",
            "Ao chegar"
        ],
        "explicacao": "'Good evening.' é usado para cumprimentar alguém à noite.",
        "nivel": "A1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Boa noite' (ao sair/dormir)?",
        "resposta": "Good night.",
        "dicas": [
            "Despedida noturna",
            "Ao sair ou ir dormir"
        ],
        "explicacao": "'Good night.' é usado para se despedir à noite ou antes de dormir.",
        "nivel": "A1"
    },
    {
        "pergunta": "Como você pergunta 'Você pode me ajudar?'",
        "resposta": "Can you help me?",
        "dicas": [
            "Pedido de ajuda",
            "Usa 'Can you'"
        ],
        "explicacao": "'Can you help me?' é uma forma educada de pedir ajuda.",
        "nivel": "A1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu moro em [cidade]'?",
        "resposta": "I live in [city].",
        "dicas": [
            "Informação pessoal",
            "Verbo 'morar'"
        ],
        "explicacao": "'I live in...' é usado para dizer onde você mora.",
        "nivel": "A1"
    },
    {
        "pergunta": "Como você pergunta 'De onde você é?'",
        "resposta": "Where are you from?",
        "dicas": [
            "Pergunta sobre origem",
            "Começa com Where"
        ],
        "explicacao": "'Where are you from?' é a pergunta para saber a nacionalidade ou origem de alguém.",
        "nivel": "A1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu sou do Brasil'?",
        "resposta": "I am from Brazil.",
        "dicas": [
            "Informação pessoal",
            "Nacionalidade"
        ],
        "explicacao": "'I am from Brazil.' é usado para dizer sua nacionalidade.",
        "nivel": "A1"
    },
    {
        "pergunta": "Como você diz 'Eu tenho [idade] anos'?",
        "resposta": "I am [age] years old.",
        "dicas": [
            "Informação pessoal",
            "Usa 'am'"
        ],
        "explicacao": "Em inglês, usamos 'I am' para expressar idade, não 'I have'.",
        "nivel": "A1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu tenho um irmão'?",
        "resposta": "I have a brother.",
        "dicas": [
            "Família",
            "Verbo 'ter'"
        ],
        "explicacao": "'I have a brother.' é usado para falar sobre um irmão.",
        "nivel": "A1"
    },
    {
        "pergunta": "Como você diz 'Eu tenho uma irmã'?",
        "resposta": "I have a sister.",
        "dicas": [
            "Família",
            "Verbo 'ter'"
        ],
        "explicacao": "'I have a sister.' é usado para falar sobre uma irmã.",
        "nivel": "A1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu tenho um cachorro'?",
        "resposta": "I have a dog.",
        "dicas": [
            "Animal de estimação",
            "Verbo 'ter'"
        ],
        "explicacao": "'I have a dog.' é usado para falar sobre um cachorro.",
        "nivel": "A1"
    },
    {
        "pergunta": "Como você diz 'Eu gosto de ler'?",
        "resposta": "I like to read.",
        "dicas": [
            "Hobby",
            "Verbo 'gostar'"
        ],
        "explicacao": "'I like to read.' é usado para expressar que você gosta de ler.",
        "nivel": "A1"
    },
    {
        "pergunta": "Complete a frase: 'She ___ to the store yesterday.'",
        "resposta": "went",
        "dicas": [
            "Passado simples",
            "Verbo 'ir'"
        ],
        "explicacao": "'Went' é o passado simples do verbo 'to go'.",
        "nivel": "A2"
    },
    {
        "pergunta": "Qual a frase para perguntar 'O que você está fazendo?'",
        "resposta": "What are you doing?",
        "dicas": [
            "Present continuous",
            "Ação no momento"
        ],
        "explicacao": "'What are you doing?' é usado para perguntar sobre uma ação que está acontecendo agora.",
        "nivel": "A2"
    },
    {
        "pergunta": "Como você diz 'Eu estou estudando inglês'?",
        "resposta": "I am studying English.",
        "dicas": [
            "Present continuous",
            "Ação em progresso"
        ],
        "explicacao": "'I am studying English.' indica uma ação em progresso no momento.",
        "nivel": "A2"
    },
    {
        "pergunta": "Qual a frase para perguntar 'Você pode me passar o sal?'",
        "resposta": "Can you pass me the salt?",
        "dicas": [
            "Pedido educado",
            "Usa 'Can you'"
        ],
        "explicacao": "'Can you pass me the salt?' é um pedido educado.",
        "nivel": "A2"
    },
    {
        "pergunta": "Como você diz 'Eu vou viajar no próximo mês'?",
        "resposta": "I am going to travel next month.",
        "dicas": [
            "Futuro próximo",
            "Usa 'going to'"
        ],
        "explicacao": "'I am going to travel next month.' expressa um plano futuro.",
        "nivel": "A2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu preciso ir agora'?",
        "resposta": "I need to go now.",
        "dicas": [
            "Necessidade imediata",
            "Verbo 'precisar'"
        ],
        "explicacao": "'I need to go now.' indica uma necessidade de sair imediatamente.",
        "nivel": "A2"
    },
    {
        "pergunta": "Como você pergunta 'Você já esteve em Londres?'",
        "resposta": "Have you ever been to London?",
        "dicas": [
            "Experiência de vida",
            "Present perfect"
        ],
        "explicacao": "'Have you ever been to London?' pergunta sobre uma experiência passada sem especificar quando.",
        "nivel": "A2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu nunca vi isso antes'?",
        "resposta": "I have never seen that before.",
        "dicas": [
            "Experiência negativa",
            "Present perfect"
        ],
        "explicacao": "'I have never seen that before.' expressa uma falta de experiência.",
        "nivel": "A2"
    },
    {
        "pergunta": "Como você diz 'Eu estou ansioso por isso'?",
        "resposta": "I'm looking forward to it.",
        "dicas": [
            "Expressão de expectativa",
            "Comum em e-mails"
        ],
        "explicacao": "'I'm looking forward to it.' é usado para expressar que você está animado com algo futuro.",
        "nivel": "A2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Não se preocupe'?",
        "resposta": "Don't worry.",
        "dicas": [
            "Consolo",
            "Imperativo negativo"
        ],
        "explicacao": "'Don't worry.' é usado para acalmar alguém.",
        "nivel": "A2"
    },
    {
        "pergunta": "Como você pergunta 'Você pode falar mais devagar?'",
        "resposta": "Can you speak more slowly?",
        "dicas": [
            "Pedido de clareza",
            "Usa 'Can you'"
        ],
        "explicacao": "'Can you speak more slowly?' é um pedido educado para que alguém fale mais devagar.",
        "nivel": "A2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Está chovendo'?",
        "resposta": "It's raining.",
        "dicas": [
            "Clima",
            "Present continuous"
        ],
        "explicacao": "'It's raining.' descreve o clima atual.",
        "nivel": "A2"
    },
    {
        "pergunta": "Como você diz 'Eu estou com frio'?",
        "resposta": "I'm cold.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm cold.' é usado para expressar que você está sentindo frio.",
        "nivel": "A2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com calor'?",
        "resposta": "I'm hot.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm hot.' é usado para expressar que você está sentindo calor.",
        "nivel": "A2"
    },
    {
        "pergunta": "Como você pergunta 'Você pode me dar uma carona?'",
        "resposta": "Can you give me a ride?",
        "dicas": [
            "Pedido de transporte",
            "Usa 'give a ride'"
        ],
        "explicacao": "'Can you give me a ride?' é usado para pedir uma carona.",
        "nivel": "A2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou atrasado'?",
        "resposta": "I'm late.",
        "dicas": [
            "Situação de tempo",
            "Adjetivo"
        ],
        "explicacao": "'I'm late.' é usado para dizer que você não está no horário.",
        "nivel": "A2"
    },
    {
        "pergunta": "Como você diz 'Eu estou com pressa'?",
        "resposta": "I'm in a hurry.",
        "dicas": [
            "Situação de tempo",
            "Expressão idiomática"
        ],
        "explicacao": "'I'm in a hurry.' significa que você precisa fazer algo rapidamente.",
        "nivel": "A2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu não me importo'?",
        "resposta": "I don't care.",
        "dicas": [
            "Expressão de indiferença",
            "Negação"
        ],
        "explicacao": "'I don't care.' é usado para expressar indiferença.",
        "nivel": "A2"
    },
    {
        "pergunta": "Como você diz 'Eu estou ocupado'?",
        "resposta": "I'm busy.",
        "dicas": [
            "Situação pessoal",
            "Adjetivo"
        ],
        "explicacao": "'I'm busy.' é usado para dizer que você tem muitas coisas para fazer.",
        "nivel": "A2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou livre'?",
        "resposta": "I'm free.",
        "dicas": [
            "Situação pessoal",
            "Adjetivo"
        ],
        "explicacao": "'I'm free.' é usado para dizer que você não tem compromissos.",
        "nivel": "A2"
    },
    {
        "pergunta": "Como você pergunta 'Você pode me ligar de volta?'",
        "resposta": "Can you call me back?",
        "dicas": [
            "Pedido de contato",
            "Usa 'call back'"
        ],
        "explicacao": "'Can you call me back?' é usado para pedir para alguém retornar a ligação.",
        "nivel": "A2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com dor de cabeça'?",
        "resposta": "I have a headache.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have a headache.' é usado para expressar dor de cabeça.",
        "nivel": "A2"
    },
    {
        "pergunta": "Como você diz 'Eu estou com febre'?",
        "resposta": "I have a fever.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have a fever.' é usado para expressar febre.",
        "nivel": "A2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou doente'?",
        "resposta": "I'm sick.",
        "dicas": [
            "Problema de saúde",
            "Adjetivo"
        ],
        "explicacao": "'I'm sick.' é usado para expressar que você está doente.",
        "nivel": "A2"
    },
    {
        "pergunta": "Como você diz 'Eu estou melhor'?",
        "resposta": "I'm better.",
        "dicas": [
            "Melhora de saúde",
            "Adjetivo"
        ],
        "explicacao": "'I'm better.' é usado para dizer que sua condição melhorou.",
        "nivel": "A2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou pior'?",
        "resposta": "I'm worse.",
        "dicas": [
            "Piora de saúde",
            "Adjetivo"
        ],
        "explicacao": "'I'm worse.' é usado para dizer que sua condição piorou.",
        "nivel": "A2"
    },
    {
        "pergunta": "Como você pergunta 'Você pode repetir?'",
        "resposta": "Could you repeat that?",
        "dicas": [
            "Pedido educado",
            "Usa 'Could you'"
        ],
        "explicacao": "'Could you repeat that?' é uma forma mais educada de pedir para repetir.",
        "nivel": "A2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou aprendendo'?",
        "resposta": "I'm learning.",
        "dicas": [
            "Processo de aprendizado",
            "Present continuous"
        ],
        "explicacao": "'I'm learning.' indica que você está em processo de aprendizado.",
        "nivel": "A2"
    },
    {
        "pergunta": "Como você diz 'Eu estou ensinando'?",
        "resposta": "I'm teaching.",
        "dicas": [
            "Processo de ensino",
            "Present continuous"
        ],
        "explicacao": "'I'm teaching.' indica que você está em processo de ensino.",
        "nivel": "A2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou trabalhando'?",
        "resposta": "I'm working.",
        "dicas": [
            "Ação em progresso",
            "Present continuous"
        ],
        "explicacao": "'I'm working.' indica que você está em processo de trabalho.",
        "nivel": "A2"
    },
    {
        "pergunta": "Como você diz 'Eu estou comendo'?",
        "resposta": "I'm eating.",
        "dicas": [
            "Ação em progresso",
            "Present continuous"
        ],
        "explicacao": "'I'm eating.' indica que você está em processo de alimentação.",
        "nivel": "A2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou bebendo'?",
        "resposta": "I'm drinking.",
        "dicas": [
            "Ação em progresso",
            "Present continuous"
        ],
        "explicacao": "'I'm drinking.' indica que você está em processo de beber.",
        "nivel": "A2"
    },
    {
        "pergunta": "Como você diz 'Eu estou dormindo'?",
        "resposta": "I'm sleeping.",
        "dicas": [
            "Ação em progresso",
            "Present continuous"
        ],
        "explicacao": "'I'm sleeping.' indica que você está em processo de dormir.",
        "nivel": "A2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou assistindo TV'?",
        "resposta": "I'm watching TV.",
        "dicas": [
            "Ação em progresso",
            "Present continuous"
        ],
        "explicacao": "'I'm watching TV.' indica que você está assistindo televisão.",
        "nivel": "A2"
    },
    {
        "pergunta": "Como você diz 'Eu estou ouvindo música'?",
        "resposta": "I'm listening to music.",
        "dicas": [
            "Ação em progresso",
            "Present continuous"
        ],
        "explicacao": "'I'm listening to music.' indica que você está ouvindo música.",
        "nivel": "A2"
    },
    {
        "pergunta": "Complete: 'If I ___ a bird, I would fly.'",
        "resposta": "were",
        "dicas": [
            "Second conditional",
            "Verbo 'to be'"
        ],
        "explicacao": "No second conditional, usamos 'were' para todas as pessoas no 'if-clause' com o verbo 'to be'.",
        "nivel": "B1"
    },
    {
        "pergunta": "Qual a diferença entre 'make' e 'do'?",
        "resposta": "make é criar/produzir, do é realizar/executar",
        "dicas": [
            "Verbos de ação",
            "Contexto"
        ],
        "explicacao": "'Make' é usado para criar ou produzir algo, enquanto 'do' é usado para realizar uma atividade ou tarefa.",
        "nivel": "B1"
    },
    {
        "pergunta": "Explique o phrasal verb 'look up to'.",
        "resposta": "admirar/respeitar",
        "dicas": [
            "Phrasal verb",
            "Sentido figurado"
        ],
        "explicacao": "'Look up to' significa admirar ou respeitar alguém.",
        "nivel": "B1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou acostumado com isso'?",
        "resposta": "I'm used to it.",
        "dicas": [
            "Hábito",
            "Expressão comum"
        ],
        "explicacao": "'I'm used to it.' significa que você está habituado a algo.",
        "nivel": "B1"
    },
    {
        "pergunta": "Como você diz 'Eu não aguento mais'?",
        "resposta": "I can't stand it anymore.",
        "dicas": [
            "Expressão de intolerância",
            "Verbo 'suportar'"
        ],
        "explicacao": "'I can't stand it anymore.' é usado para expressar que você não suporta mais uma situação.",
        "nivel": "B1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Está fora de questão'?",
        "resposta": "It's out of the question.",
        "dicas": [
            "Impossibilidade",
            "Expressão idiomática"
        ],
        "explicacao": "'It's out of the question.' significa que algo é impossível ou não será considerado.",
        "nivel": "B1"
    },
    {
        "pergunta": "Como você diz 'É a sua vez'?",
        "resposta": "It's your turn.",
        "dicas": [
            "Sequência",
            "Momento de agir"
        ],
        "explicacao": "'It's your turn.' é usado para indicar que é a vez de alguém fazer algo.",
        "nivel": "B1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com dor de garganta'?",
        "resposta": "I have a sore throat.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have a sore throat.' é usado para expressar dor de garganta.",
        "nivel": "B1"
    },
    {
        "pergunta": "Como você diz 'Eu estou com tosse'?",
        "resposta": "I have a cough.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have a cough.' é usado para expressar tosse.",
        "nivel": "B1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com dor de estômago'?",
        "resposta": "I have a stomachache.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have a stomachache.' é usado para expressar dor de estômago.",
        "nivel": "B1"
    },
    {
        "pergunta": "Como você diz 'Eu estou com dor de dente'?",
        "resposta": "I have a toothache.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have a toothache.' é usado para expressar dor de dente.",
        "nivel": "B1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com dor nas costas'?",
        "resposta": "I have a backache.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have a backache.' é usado para expressar dor nas costas.",
        "nivel": "B1"
    },
    {
        "pergunta": "Como você diz 'Eu estou com dor de ouvido'?",
        "resposta": "I have an earache.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have an earache.' é usado para expressar dor de ouvido.",
        "nivel": "B1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com dor de cabeça'?",
        "resposta": "I have a headache.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have a headache.' é usado para expressar dor de cabeça.",
        "nivel": "B1"
    },
    {
        "pergunta": "Como você diz 'Eu estou com febre'?",
        "resposta": "I have a fever.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have a fever.' é usado para expressar febre.",
        "nivel": "B1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou resfriado'?",
        "resposta": "I have a cold.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have a cold.' é usado para expressar que você está resfriado.",
        "nivel": "B1"
    },
    {
        "pergunta": "Como você diz 'Eu estou gripado'?",
        "resposta": "I have the flu.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have the flu.' é usado para expressar que você está gripado.",
        "nivel": "B1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com náuseas'?",
        "resposta": "I'm nauseous.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm nauseous.' é usado para expressar náuseas.",
        "nivel": "B1"
    },
    {
        "pergunta": "Como você diz 'Eu estou tonto'?",
        "resposta": "I'm dizzy.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm dizzy.' é usado para expressar tontura.",
        "nivel": "B1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com dor'?",
        "resposta": "I'm in pain.",
        "dicas": [
            "Sentimento físico",
            "Expressão idiomática"
        ],
        "explicacao": "'I'm in pain.' é usado para expressar que você está sentindo dor.",
        "nivel": "B1"
    },
    {
        "pergunta": "Como você diz 'Eu estou com coceira'?",
        "resposta": "I'm itchy.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm itchy.' é usado para expressar coceira.",
        "nivel": "B1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com sono'?",
        "resposta": "I'm sleepy.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm sleepy.' é usado para expressar sono.",
        "nivel": "B1"
    },
    {
        "pergunta": "Como você diz 'Eu estou com fome'?",
        "resposta": "I'm hungry.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm hungry.' é usado para expressar que você está com fome.",
        "nivel": "B1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com sede'?",
        "resposta": "I'm thirsty.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm thirsty.' é usado para expressar que você está com sede.",
        "nivel": "B1"
    },
    {
        "pergunta": "Como você diz 'Eu estou com calor'?",
        "resposta": "I'm hot.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm hot.' é usado para expressar que você está sentindo calor.",
        "nivel": "B1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com frio'?",
        "resposta": "I'm cold.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm cold.' é usado para expressar que você está sentindo frio.",
        "nivel": "B1"
    },
    {
        "pergunta": "Como você diz 'Eu estou bem'?",
        "resposta": "I'm fine.",
        "dicas": [
            "Sentimento geral",
            "Adjetivo"
        ],
        "explicacao": "'I'm fine.' é usado para expressar que você está bem.",
        "nivel": "B1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou ótimo'?",
        "resposta": "I'm great.",
        "dicas": [
            "Sentimento geral",
            "Adjetivo"
        ],
        "explicacao": "'I'm great.' é usado para expressar que você está ótimo.",
        "nivel": "B1"
    },
    {
        "pergunta": "Como você diz 'Eu estou cansado'?",
        "resposta": "I'm tired.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm tired.' é usado para expressar cansaço.",
        "nivel": "B1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou feliz'?",
        "resposta": "I'm happy.",
        "dicas": [
            "Sentimento emocional",
            "Adjetivo"
        ],
        "explicacao": "'I'm happy.' é usado para expressar felicidade.",
        "nivel": "B1"
    },
    {
        "pergunta": "Como você diz 'Eu estou triste'?",
        "resposta": "I'm sad.",
        "dicas": [
            "Sentimento emocional",
            "Adjetivo"
        ],
        "explicacao": "'I'm sad.' é usado para expressar tristeza.",
        "nivel": "B1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou bravo'?",
        "resposta": "I'm angry.",
        "dicas": [
            "Sentimento emocional",
            "Adjetivo"
        ],
        "explicacao": "'I'm angry.' é usado para expressar raiva.",
        "nivel": "B1"
    },
    {
        "pergunta": "Como você diz 'Eu estou surpreso'?",
        "resposta": "I'm surprised.",
        "dicas": [
            "Sentimento emocional",
            "Adjetivo"
        ],
        "explicacao": "'I'm surprised.' é usado para expressar surpresa.",
        "nivel": "B1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou entediado'?",
        "resposta": "I'm bored.",
        "dicas": [
            "Sentimento emocional",
            "Adjetivo"
        ],
        "explicacao": "'I'm bored.' é usado para expressar tédio.",
        "nivel": "B1"
    },
    {
        "pergunta": "Como você diz 'Eu estou animado'?",
        "resposta": "I'm excited.",
        "dicas": [
            "Sentimento emocional",
            "Adjetivo"
        ],
        "explicacao": "'I'm excited.' é usado para expressar animação.",
        "nivel": "B1"
    },
    {
        "pergunta": "Complete: 'If I ___ a bird, I would fly.'",
        "resposta": "were",
        "dicas": [
            "Second conditional",
            "Verbo 'to be'"
        ],
        "explicacao": "No second conditional, usamos 'were' para todas as pessoas no 'if-clause' com o verbo 'to be'.",
        "nivel": "B2"
    },
    {
        "pergunta": "Qual a diferença entre 'make' e 'do'?",
        "resposta": "make é criar/produzir, do é realizar/executar",
        "dicas": [
            "Verbos de ação",
            "Contexto"
        ],
        "explicacao": "'Make' é usado para criar ou produzir algo, enquanto 'do' é usado para realizar uma atividade ou tarefa.",
        "nivel": "B2"
    },
    {
        "pergunta": "Explique o phrasal verb 'look up to'.",
        "resposta": "admirar/respeitar",
        "dicas": [
            "Phrasal verb",
            "Sentido figurado"
        ],
        "explicacao": "'Look up to' significa admirar ou respeitar alguém.",
        "nivel": "B2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou acostumado com isso'?",
        "resposta": "I'm used to it.",
        "dicas": [
            "Hábito",
            "Expressão comum"
        ],
        "explicacao": "'I'm used to it.' significa que você está habituado a algo.",
        "nivel": "B2"
    },
    {
        "pergunta": "Como você diz 'Eu não aguento mais'?",
        "resposta": "I can't stand it anymore.",
        "dicas": [
            "Expressão de intolerância",
            "Verbo 'suportar'"
        ],
        "explicacao": "'I can't stand it anymore.' é usado para expressar que você não suporta mais uma situação.",
        "nivel": "B2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Está fora de questão'?",
        "resposta": "It's out of the question.",
        "dicas": [
            "Impossibilidade",
            "Expressão idiomática"
        ],
        "explicacao": "'It's out of the question.' significa que algo é impossível ou não será considerado.",
        "nivel": "B2"
    },
    {
        "pergunta": "Como você diz 'É a sua vez'?",
        "resposta": "It's your turn.",
        "dicas": [
            "Sequência",
            "Momento de agir"
        ],
        "explicacao": "'It's your turn.' é usado para indicar que é a vez de alguém fazer algo.",
        "nivel": "B2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com dor de garganta'?",
        "resposta": "I have a sore throat.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have a sore throat.' é usado para expressar dor de garganta.",
        "nivel": "B2"
    },
    {
        "pergunta": "Como você diz 'Eu estou com tosse'?",
        "resposta": "I have a cough.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have a cough.' é usado para expressar tosse.",
        "nivel": "B2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com dor de estômago'?",
        "resposta": "I have a stomachache.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have a stomachache.' é usado para expressar dor de estômago.",
        "nivel": "B2"
    },
    {
        "pergunta": "Como você diz 'Eu estou com dor de dente'?",
        "resposta": "I have a toothache.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have a toothache.' é usado para expressar dor de dente.",
        "nivel": "B2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com dor nas costas'?",
        "resposta": "I have a backache.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have a backache.' é usado para expressar dor nas costas.",
        "nivel": "B2"
    },
    {
        "pergunta": "Como você diz 'Eu estou com dor de ouvido'?",
        "resposta": "I have an earache.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have an earache.' é usado para expressar dor de ouvido.",
        "nivel": "B2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com dor de cabeça'?",
        "resposta": "I have a headache.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have a headache.' é usado para expressar dor de cabeça.",
        "nivel": "B2"
    },
    {
        "pergunta": "Como você diz 'Eu estou com febre'?",
        "resposta": "I have a fever.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have a fever.' é usado para expressar febre.",
        "nivel": "B2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou resfriado'?",
        "resposta": "I have a cold.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have a cold.' é usado para expressar que você está resfriado.",
        "nivel": "B2"
    },
    {
        "pergunta": "Como você diz 'Eu estou gripado'?",
        "resposta": "I have the flu.",
        "dicas": [
            "Problema de saúde",
            "Usa 'have'"
        ],
        "explicacao": "'I have the flu.' é usado para expressar que você está gripado.",
        "nivel": "B2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com náuseas'?",
        "resposta": "I'm nauseous.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm nauseous.' é usado para expressar náuseas.",
        "nivel": "B2"
    },
    {
        "pergunta": "Como você diz 'Eu estou tonto'?",
        "resposta": "I'm dizzy.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm dizzy.' é usado para expressar tontura.",
        "nivel": "B2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com dor'?",
        "resposta": "I'm in pain.",
        "dicas": [
            "Sentimento físico",
            "Expressão idiomática"
        ],
        "explicacao": "'I'm in pain.' é usado para expressar que você está sentindo dor.",
        "nivel": "B2"
    },
    {
        "pergunta": "Como você diz 'Eu estou com coceira'?",
        "resposta": "I'm itchy.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm itchy.' é usado para expressar coceira.",
        "nivel": "B2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com sono'?",
        "resposta": "I'm sleepy.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm sleepy.' é usado para expressar sono.",
        "nivel": "B2"
    },
    {
        "pergunta": "Como você diz 'Eu estou com fome'?",
        "resposta": "I'm hungry.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm hungry.' é usado para expressar que você está com fome.",
        "nivel": "B2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com sede'?",
        "resposta": "I'm thirsty.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm thirsty.' é usado para expressar que você está com sede.",
        "nivel": "B2"
    },
    {
        "pergunta": "Como você diz 'Eu estou com calor'?",
        "resposta": "I'm hot.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm hot.' é usado para expressar que você está sentindo calor.",
        "nivel": "B2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com frio'?",
        "resposta": "I'm cold.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm cold.' é usado para expressar que você está sentindo frio.",
        "nivel": "B2"
    },
    {
        "pergunta": "Como você diz 'Eu estou bem'?",
        "resposta": "I'm fine.",
        "dicas": [
            "Sentimento geral",
            "Adjetivo"
        ],
        "explicacao": "'I'm fine.' é usado para expressar que você está bem.",
        "nivel": "B2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou ótimo'?",
        "resposta": "I'm great.",
        "dicas": [
            "Sentimento geral",
            "Adjetivo"
        ],
        "explicacao": "'I'm great.' é usado para expressar que você está ótimo.",
        "nivel": "B2"
    },
    {
        "pergunta": "Como você diz 'Eu estou cansado'?",
        "resposta": "I'm tired.",
        "dicas": [
            "Sentimento físico",
            "Adjetivo"
        ],
        "explicacao": "'I'm tired.' é usado para expressar cansaço.",
        "nivel": "B2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou feliz'?",
        "resposta": "I'm happy.",
        "dicas": [
            "Sentimento emocional",
            "Adjetivo"
        ],
        "explicacao": "'I'm happy.' é usado para expressar felicidade.",
        "nivel": "B2"
    },
    {
        "pergunta": "Como você diz 'Eu estou triste'?",
        "resposta": "I'm sad.",
        "dicas": [
            "Sentimento emocional",
            "Adjetivo"
        ],
        "explicacao": "'I'm sad.' é usado para expressar tristeza.",
        "nivel": "B2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou bravo'?",
        "resposta": "I'm angry.",
        "dicas": [
            "Sentimento emocional",
            "Adjetivo"
        ],
        "explicacao": "'I'm angry.' é usado para expressar raiva.",
        "nivel": "B2"
    },
    {
        "pergunta": "Como você diz 'Eu estou surpreso'?",
        "resposta": "I'm surprised.",
        "dicas": [
            "Sentimento emocional",
            "Adjetivo"
        ],
        "explicacao": "'I'm surprised.' é usado para expressar surpresa.",
        "nivel": "B2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou entediado'?",
        "resposta": "I'm bored.",
        "dicas": [
            "Sentimento emocional",
            "Adjetivo"
        ],
        "explicacao": "'I'm bored.' é usado para expressar tédio.",
        "nivel": "B2"
    },
    {
        "pergunta": "Como você diz 'Eu estou animado'?",
        "resposta": "I'm excited.",
        "dicas": [
            "Sentimento emocional",
            "Adjetivo"
        ],
        "explicacao": "'I'm excited.' é usado para expressar animação.",
        "nivel": "B2"
    },
    {
        "pergunta": "Explique o significado da expressão 'to bite the bullet'.",
        "resposta": "enfrentar uma situação difícil com coragem",
        "dicas": [
            "Expressão idiomática",
            "Superar adversidade"
        ],
        "explicacao": "'To bite the bullet' significa aceitar uma situação difícil e desagradável porque é inevitável.",
        "nivel": "C1"
    },
    {
        "pergunta": "Qual a diferença entre 'economic' e 'economical'?",
        "resposta": "economic é relacionado à economia, economical é econômico/barato",
        "dicas": [
            "Adjetivos",
            "Significados diferentes"
        ],
        "explicacao": "'Economic' refere-se à economia, enquanto 'economical' significa que algo é barato ou eficiente.",
        "nivel": "C1"
    },
    {
        "pergunta": "Explique o uso de 'come to terms with'.",
        "resposta": "aceitar uma situação difícil",
        "dicas": [
            "Phrasal verb",
            "Lidar com algo"
        ],
        "explicacao": "'Come to terms with' significa aceitar e lidar com uma situação desagradável ou difícil.",
        "nivel": "C1"
    },
    {
        "pergunta": "Qual a frase para dizer 'É mais fácil falar do que fazer'?",
        "resposta": "Easier said than done.",
        "dicas": [
            "Expressão comum",
            "Dificuldade na prática"
        ],
        "explicacao": "'Easier said than done.' é usado quando algo parece simples, mas é difícil de executar.",
        "nivel": "C1"
    },
    {
        "pergunta": "Como você diz 'Não há problema'?",
        "resposta": "No worries.",
        "dicas": [
            "Informal",
            "Resposta a agradecimento/desculpa"
        ],
        "explicacao": "'No worries.' é uma forma informal de dizer 'De nada' ou 'Não há problema'.",
        "nivel": "C1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou por dentro' (informado)?",
        "resposta": "I'm in the loop.",
        "dicas": [
            "Expressão idiomática",
            "Informação"
        ],
        "explicacao": "'I'm in the loop.' significa que você está atualizado com as informações.",
        "nivel": "C1"
    },
    {
        "pergunta": "Como você diz 'Eu estou por fora' (desinformado)?",
        "resposta": "I'm out of the loop.",
        "dicas": [
            "Expressão idiomática",
            "Desinformação"
        ],
        "explicacao": "'I'm out of the loop.' significa que você não está atualizado com as informações.",
        "nivel": "C1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Vamos direto ao ponto'?",
        "resposta": "Let's get straight to the point.",
        "dicas": [
            "Direto e objetivo",
            "Reuniões"
        ],
        "explicacao": "'Let's get straight to the point.' é usado para ir direto ao assunto principal.",
        "nivel": "C1"
    },
    {
        "pergunta": "Como você diz 'É um mal necessário'?",
        "resposta": "It's a necessary evil.",
        "dicas": [
            "Expressão comum",
            "Algo ruim, mas inevitável"
        ],
        "explicacao": "'It's a necessary evil.' é usado para descrever algo desagradável, mas que precisa ser feito.",
        "nivel": "C1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou em cima do muro'?",
        "resposta": "I'm on the fence.",
        "dicas": [
            "Indecisão",
            "Expressão idiomática"
        ],
        "explicacao": "'I'm on the fence.' significa que você está indeciso sobre algo.",
        "nivel": "C1"
    },
    {
        "pergunta": "Como você diz 'É a gota d'água'?",
        "resposta": "It's the last straw.",
        "dicas": [
            "Limite da paciência",
            "Expressão idiomática"
        ],
        "explicacao": "'It's the last straw.' é usado quando algo pequeno causa o fim da paciência.",
        "nivel": "C1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com a faca e o queijo na mão'?",
        "resposta": "I have the upper hand.",
        "dicas": [
            "Vantagem",
            "Controle"
        ],
        "explicacao": "'I have the upper hand.' significa que você tem vantagem ou controle sobre uma situação.",
        "nivel": "C1"
    },
    {
        "pergunta": "Como você diz 'É melhor prevenir do que remediar'?",
        "resposta": "Better safe than sorry.",
        "dicas": [
            "Prevenção",
            "Cuidado"
        ],
        "explicacao": "'Better safe than sorry.' significa que é melhor ser cauteloso do que se arrepender depois.",
        "nivel": "C1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Não é minha praia'?",
        "resposta": "It's not my cup of tea.",
        "dicas": [
            "Não gostar",
            "Expressão idiomática"
        ],
        "explicacao": "'It's not my cup of tea.' é usado para dizer que você não gosta de algo.",
        "nivel": "C1"
    },
    {
        "pergunta": "Como você diz 'Ficar de olho em algo'?",
        "resposta": "Keep an eye on something.",
        "dicas": [
            "Observar",
            "Cuidar"
        ],
        "explicacao": "'Keep an eye on something.' significa observar algo com atenção.",
        "nivel": "C1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Pense fora da caixa'?",
        "resposta": "Think outside the box.",
        "dicas": [
            "Criatividade",
            "Inovação"
        ],
        "explicacao": "'Think outside the box.' significa pensar de forma criativa e não convencional.",
        "nivel": "C1"
    },
    {
        "pergunta": "Como você diz 'É um tiro no escuro'?",
        "resposta": "It's a shot in the dark.",
        "dicas": [
            "Tentativa incerta",
            "Adivinhação"
        ],
        "explicacao": "'It's a shot in the dark.' significa uma tentativa sem muita chance de sucesso.",
        "nivel": "C1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Colocar a mão na massa'?",
        "resposta": "Get your hands dirty.",
        "dicas": [
            "Trabalho prático",
            "Envolvimento"
        ],
        "explicacao": "'Get your hands dirty.' significa se envolver em um trabalho prático, mesmo que seja desagradável.",
        "nivel": "C1"
    },
    {
        "pergunta": "Como você diz 'Quebrar o gelo'?",
        "resposta": "Break the ice.",
        "dicas": [
            "Iniciar conversa",
            "Ambiente social"
        ],
        "explicacao": "'Break the ice.' significa iniciar uma conversa ou atividade para aliviar a tensão em um ambiente social.",
        "nivel": "C1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Custar os olhos da cara'?",
        "resposta": "Cost an arm and a leg.",
        "dicas": [
            "Muito caro",
            "Expressão idiomática"
        ],
        "explicacao": "'Cost an arm and a leg.' significa que algo é extremamente caro.",
        "nivel": "C1"
    },
    {
        "pergunta": "Como você diz 'Fazer vista grossa'?",
        "resposta": "Turn a blind eye.",
        "dicas": [
            "Ignorar",
            "Fingir não ver"
        ],
        "explicacao": "'Turn a blind eye.' significa ignorar intencionalmente algo errado.",
        "nivel": "C1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Pela culatra'?",
        "resposta": "Backfire.",
        "dicas": [
            "Resultado oposto",
            "Inesperado"
        ],
        "explicacao": "'Backfire.' significa que um plano ou ação tem um resultado oposto ao esperado.",
        "nivel": "C1"
    },
    {
        "pergunta": "Como você diz 'Ter a cabeça nas nuvens'?",
        "resposta": "Have your head in the clouds.",
        "dicas": [
            "Distraído",
            "Sonhador"
        ],
        "explicacao": "'Have your head in the clouds.' significa estar distraído ou sonhando acordado.",
        "nivel": "C1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Dar a volta por cima'?",
        "resposta": "Bounce back.",
        "dicas": [
            "Recuperação",
            "Superar"
        ],
        "explicacao": "'Bounce back.' significa se recuperar rapidamente de uma dificuldade.",
        "nivel": "C1"
    },
    {
        "pergunta": "Como você diz 'Fazer uma tempestade em copo d'água'?",
        "resposta": "Make a mountain out of a molehill.",
        "dicas": [
            "Exagerar",
            "Pequeno problema"
        ],
        "explicacao": "'Make a mountain out of a molehill.' significa exagerar a importância de um problema pequeno.",
        "nivel": "C1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Estar na mesma página'?",
        "resposta": "Be on the same page.",
        "dicas": [
            "Concordar",
            "Entendimento mútuo"
        ],
        "explicacao": "'Be on the same page.' significa que todos estão de acordo e entendem a situação.",
        "nivel": "C1"
    },
    {
        "pergunta": "Como você diz 'Pelo menos'?",
        "resposta": "At least.",
        "dicas": [
            "Mínimo",
            "Consolo"
        ],
        "explicacao": "'At least.' é usado para indicar o mínimo ou para oferecer consolo.",
        "nivel": "C1"
    },
    {
        "pergunta": "Qual a frase para dizer 'De vez em quando'?",
        "resposta": "Once in a while.",
        "dicas": [
            "Ocasionalmente",
            "Não frequentemente"
        ],
        "explicacao": "'Once in a while.' significa ocasionalmente.",
        "nivel": "C1"
    },
    {
        "pergunta": "Como você diz 'Em primeiro lugar'?",
        "resposta": "First of all.",
        "dicas": [
            "Introdução",
            "Prioridade"
        ],
        "explicacao": "'First of all.' é usado para introduzir o primeiro ponto ou a coisa mais importante.",
        "nivel": "C1"
    },
    {
        "pergunta": "Qual a frase para dizer 'No final das contas'?",
        "resposta": "At the end of the day.",
        "dicas": [
            "Conclusão",
            "Resumo"
        ],
        "explicacao": "'At the end of the day.' é usado para significar 'no final das contas' ou 'em resumo'.",
        "nivel": "C1"
    },
    {
        "pergunta": "Como você diz 'Sem mais delongas'?",
        "resposta": "Without further ado.",
        "dicas": [
            "Introdução formal",
            "Direto ao ponto"
        ],
        "explicacao": "'Without further ado.' é usado para introduzir algo sem mais atrasos.",
        "nivel": "C1"
    },
    {
        "pergunta": "Qual a frase para dizer 'É o que é'?",
        "resposta": "It is what it is.",
        "dicas": [
            "Aceitação",
            "Realidade"
        ],
        "explicacao": "'It is what it is.' é usado para aceitar uma situação como ela é, sem poder mudá-la.",
        "nivel": "C1"
    },
    {
        "pergunta": "Como você diz 'Não leve para o lado pessoal'?",
        "resposta": "Don't take it personally.",
        "dicas": [
            "Conselho",
            "Crítica"
        ],
        "explicacao": "'Don't take it personally.' é usado para aconselhar alguém a não se ofender com algo.",
        "nivel": "C1"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com a consciência pesada'?",
        "resposta": "I have a guilty conscience.",
        "dicas": [
            "Sentimento de culpa",
            "Remorso"
        ],
        "explicacao": "'I have a guilty conscience.' é usado para expressar remorso ou culpa.",
        "nivel": "C1"
    },
    {
        "pergunta": "Como você diz 'É um prazer'?",
        "resposta": "It's my pleasure.",
        "dicas": [
            "Cortesia",
            "Resposta a agradecimento"
        ],
        "explicacao": "'It's my pleasure.' é uma resposta educada para 'Thank you', indicando que foi um prazer ajudar.",
        "nivel": "C1"
    },
    {
        "pergunta": "Explique o significado da expressão 'to throw caution to the wind'.",
        "resposta": "agir sem se preocupar com as consequências",
        "dicas": [
            "Expressão idiomática",
            "Assumir riscos"
        ],
        "explicacao": "'To throw caution to the wind' significa agir de forma imprudente, sem considerar os riscos ou consequências.",
        "nivel": "C2"
    },
    {
        "pergunta": "Qual a diferença sutil entre 'obsolete' e 'archaic'?",
        "resposta": "obsolete é fora de uso, archaic é antigo/primitivo",
        "dicas": [
            "Adjetivos",
            "Tempo"
        ],
        "explicacao": "'Obsolete' refere-se a algo que não é mais usado porque foi substituído por algo novo. 'Archaic' refere-se a algo muito antigo, que pertence a um período anterior.",
        "nivel": "C2"
    },
    {
        "pergunta": "Explique o uso de 'to be at loggerheads with someone'.",
        "resposta": "estar em desacordo/conflito com alguém",
        "dicas": [
            "Expressão idiomática",
            "Conflito"
        ],
        "explicacao": "'To be at loggerheads with someone' significa estar em forte desacordo ou em conflito com alguém.",
        "nivel": "C2"
    },
    {
        "pergunta": "Qual a frase para dizer 'É um mal necessário'?",
        "resposta": "It's a necessary evil.",
        "dicas": [
            "Expressão comum",
            "Algo ruim, mas inevitável"
        ],
        "explicacao": "'It's a necessary evil.' é usado para descrever algo desagradável, mas que precisa ser feito.",
        "nivel": "C2"
    },
    {
        "pergunta": "Como você diz 'É um tiro no escuro'?",
        "resposta": "It's a shot in the dark.",
        "dicas": [
            "Tentativa incerta",
            "Adivinhação"
        ],
        "explicacao": "'It's a shot in the dark.' significa uma tentativa sem muita chance de sucesso.",
        "nivel": "C2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Colocar a mão na massa'?",
        "resposta": "Get your hands dirty.",
        "dicas": [
            "Trabalho prático",
            "Envolvimento"
        ],
        "explicacao": "'Get your hands dirty.' significa se envolver em um trabalho prático, mesmo que seja desagradável.",
        "nivel": "C2"
    },
    {
        "pergunta": "Como você diz 'Quebrar o gelo'?",
        "resposta": "Break the ice.",
        "dicas": [
            "Iniciar conversa",
            "Ambiente social"
        ],
        "explicacao": "'Break the ice.' significa iniciar uma conversa ou atividade para aliviar a tensão em um ambiente social.",
        "nivel": "C2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Custar os olhos da cara'?",
        "resposta": "Cost an arm and a leg.",
        "dicas": [
            "Muito caro",
            "Expressão idiomática"
        ],
        "explicacao": "'Cost an arm and a leg.' significa que algo é extremamente caro.",
        "nivel": "C2"
    },
    {
        "pergunta": "Como você diz 'Fazer vista grossa'?",
        "resposta": "Turn a blind eye.",
        "dicas": [
            "Ignorar",
            "Fingir não ver"
        ],
        "explicacao": "'Turn a blind eye.' significa ignorar intencionalmente algo errado.",
        "nivel": "C2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Pela culatra'?",
        "resposta": "Backfire.",
        "dicas": [
            "Resultado oposto",
            "Inesperado"
        ],
        "explicacao": "'Backfire.' significa que um plano ou ação tem um resultado oposto ao esperado.",
        "nivel": "C2"
    },
    {
        "pergunta": "Como você diz 'Ter a cabeça nas nuvens'?",
        "resposta": "Have your head in the clouds.",
        "dicas": [
            "Distraído",
            "Sonhador"
        ],
        "explicacao": "'Have your head in the clouds.' significa estar distraído ou sonhando acordado.",
        "nivel": "C2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Dar a volta por cima'?",
        "resposta": "Bounce back.",
        "dicas": [
            "Recuperação",
            "Superar"
        ],
        "explicacao": "'Bounce back.' significa se recuperar rapidamente de uma dificuldade.",
        "nivel": "C2"
    },
    {
        "pergunta": "Como você diz 'Fazer uma tempestade em copo d'água'?",
        "resposta": "Make a mountain out of a molehill.",
        "dicas": [
            "Exagerar",
            "Pequeno problema"
        ],
        "explicacao": "'Make a mountain out of a molehill.' significa exagerar a importância de um problema pequeno.",
        "nivel": "C2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Estar na mesma página'?",
        "resposta": "Be on the same page.",
        "dicas": [
            "Concordar",
            "Entendimento mútuo"
        ],
        "explicacao": "'Be on the same page.' significa que todos estão de acordo e entendem a situação.",
        "nivel": "C2"
    },
    {
        "pergunta": "Como você diz 'Pelo menos'?",
        "resposta": "At least.",
        "dicas": [
            "Mínimo",
            "Consolo"
        ],
        "explicacao": "'At least.' é usado para indicar o mínimo ou para oferecer consolo.",
        "nivel": "C2"
    },
    {
        "pergunta": "Qual a frase para dizer 'De vez em quando'?",
        "resposta": "Once in a while.",
        "dicas": [
            "Ocasionalmente",
            "Não frequentemente"
        ],
        "explicacao": "'Once in a while.' significa ocasionalmente.",
        "nivel": "C2"
    },
    {
        "pergunta": "Como você diz 'Em primeiro lugar'?",
        "resposta": "First of all.",
        "dicas": [
            "Introdução",
            "Prioridade"
        ],
        "explicacao": "'First of all.' é usado para introduzir o primeiro ponto ou a coisa mais importante.",
        "nivel": "C2"
    },
    {
        "pergunta": "Qual a frase para dizer 'No final das contas'?",
        "resposta": "At the end of the day.",
        "dicas": [
            "Conclusão",
            "Resumo"
        ],
        "explicacao": "'At the end of the day.' é usado para significar 'no final das contas' ou 'em resumo'.",
        "nivel": "C2"
    },
    {
        "pergunta": "Como você diz 'Sem mais delongas'?",
        "resposta": "Without further ado.",
        "dicas": [
            "Introdução formal",
            "Direto ao ponto"
        ],
        "explicacao": "'Without further ado.' é usado para introduzir algo sem mais atrasos.",
        "nivel": "C2"
    },
    {
        "pergunta": "Qual a frase para dizer 'É o que é'?",
        "resposta": "It is what it is.",
        "dicas": [
            "Aceitação",
            "Realidade"
        ],
        "explicacao": "'It is what it is.' é usado para aceitar uma situação como ela é, sem poder mudá-la.",
        "nivel": "C2"
    },
    {
        "pergunta": "Como você diz 'Não leve para o lado pessoal'?",
        "resposta": "Don't take it personally.",
        "dicas": [
            "Conselho",
            "Crítica"
        ],
        "explicacao": "'Don't take it personally.' é usado para aconselhar alguém a não se ofender com algo.",
        "nivel": "C2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Eu estou com a consciência pesada'?",
        "resposta": "I have a guilty conscience.",
        "dicas": [
            "Sentimento de culpa",
            "Remorso"
        ],
        "explicacao": "'I have a guilty conscience.' é usado para expressar remorso ou culpa.",
        "nivel": "C2"
    },
    {
        "pergunta": "Como você diz 'É um prazer'?",
        "resposta": "It's my pleasure.",
        "dicas": [
            "Cortesia",
            "Resposta a agradecimento"
        ],
        "explicacao": "'It's my pleasure.' é uma resposta educada para 'Thank you', indicando que foi um prazer ajudar.",
        "nivel": "C2"
    },
    {
        "pergunta": "Explique o significado de 'to pull strings'.",
        "resposta": "usar influência pessoal para conseguir algo",
        "dicas": [
            "Expressão idiomática",
            "Favores"
        ],
        "explicacao": "'To pull strings' significa usar sua influência ou contatos para obter uma vantagem ou favor.",
        "nivel": "C2"
    },
    {
        "pergunta": "Qual a diferença entre 'conscience' e 'consciousness'?",
        "resposta": "conscience é consciência moral, consciousness é estado de estar ciente",
        "dicas": [
            "Substantivos",
            "Significados distintos"
        ],
        "explicacao": "'Conscience' refere-se ao senso moral, enquanto 'consciousness' é o estado de estar acordado e ciente do ambiente.",
        "nivel": "C2"
    },
    {
        "pergunta": "Explique o uso de 'to be on the ball'.",
        "resposta": "estar atento/ligado/eficiente",
        "dicas": [
            "Expressão idiomática",
            "Desempenho"
        ],
        "explicacao": "'To be on the ball' significa estar alerta, rápido para entender e reagir, e ser eficiente.",
        "nivel": "C2"
    },
    {
        "pergunta": "Qual a frase para dizer 'É um tiro no pé'?",
        "resposta": "It's shooting yourself in the foot.",
        "dicas": [
            "Autossabotagem",
            "Ação prejudicial"
        ],
        "explicacao": "'Shooting yourself in the foot' significa fazer ou dizer algo que prejudica sua própria causa.",
        "nivel": "C2"
    },
    {
        "pergunta": "Como você diz 'Fazer das tripas coração'?",
        "resposta": "Go the extra mile.",
        "dicas": [
            "Esforço extra",
            "Dedicação"
        ],
        "explicacao": "'Go the extra mile' significa fazer um esforço extra para alcançar um objetivo.",
        "nivel": "C2"
    },
    {
        "pergunta": "Qual a frase para dizer 'É um mal que vem para o bem'?",
        "resposta": "It's a blessing in disguise.",
        "dicas": [
            "Situação negativa com resultado positivo",
            "Inesperado"
        ],
        "explicacao": "'A blessing in disguise' é algo que parece ruim no início, mas acaba sendo benéfico.",
        "nivel": "C2"
    },
    {
        "pergunta": "Como você diz 'Estar com a corda no pescoço'?",
        "resposta": "Be in hot water.",
        "dicas": [
            "Problemas",
            "Situação difícil"
        ],
        "explicacao": "'Be in hot water' significa estar em apuros ou em uma situação difícil.",
        "nivel": "C2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Pagar o pato'?",
        "resposta": "Foot the bill.",
        "dicas": [
            "Pagar a conta",
            "Assumir responsabilidade"
        ],
        "explicacao": "'Foot the bill' significa pagar por algo, especialmente algo caro ou que não é sua responsabilidade.",
        "nivel": "C2"
    },
    {
        "pergunta": "Como você diz 'Fazer a egípcia'?",
        "resposta": "Give someone the cold shoulder.",
        "dicas": [
            "Ignorar",
            "Tratar com frieza"
        ],
        "explicacao": "'Give someone the cold shoulder' significa ignorar ou tratar alguém de forma fria e desinteressada.",
        "nivel": "C2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Chutar o balde'?",
        "resposta": "Throw in the towel.",
        "dicas": [
            "Desistir",
            "Render-se"
        ],
        "explicacao": "'Throw in the towel' significa desistir de algo, especialmente após um longo esforço.",
        "nivel": "C2"
    },
    {
        "pergunta": "Como você diz 'Estar com a faca e o queijo na mão'?",
        "resposta": "Have the upper hand.",
        "dicas": [
            "Vantagem",
            "Controle"
        ],
        "explicacao": "'Have the upper hand.' significa ter vantagem ou controle sobre uma situação.",
        "nivel": "C2"
    },
    {
        "pergunta": "Qual a frase para dizer 'Pelo fio da navalha'?",
        "resposta": "By the skin of your teeth.",
        "dicas": [
            "Por pouco",
            "Quase não conseguir"
        ],
        "explicacao": "'By the skin of your teeth' significa conseguir algo por uma margem muito pequena.",
        "nivel": "C2"
    }
]