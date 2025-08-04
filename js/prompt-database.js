// js/prompt-database.js - VERSÃO COM TODOS OS SUPER PROMPTS E NOVOS DESAFIOS

const lessonData = {
    a1: {
        titles: [
            "", "Hello, World!", "Where Are You From?", "My World", "The Alphabet & Numbers",
            "Contact Information", "Everyday Objects", "This or That?", "Review (Module 1)",
            "My Daily Routine", "His/Her Routine", "Do You Like Music?", "I Don't Like That",
            "Object Pronouns", "How Often?", "What Time Is It?", "Review (Module 2)",
            "Possessive 's", "My Job", "My House", "Where Is the Bank?", "How much / many?",
            "A little / a few", "Can / Can't", "What Are You Doing?", "Simple Present vs. Continuous",
            "Review (Module 3)", "Where Were You Born?", "What Did You Do Yesterday?",
            "Questions in the Past", "Future Plans", "Final Review", "Final Project"
        ],
        prompts: { // Prompts de REVISÃO (aula concluída)
            1: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é cumprimentar e perguntar o nome. Siga estes passos:\n1. Inicie um diálogo simples comigo, como se estivéssemos numa festa. Comece com "Hello!".\n2. Espere pela minha resposta.\n3. Pergunte o meu nome usando "What's your name?".\n4. Quando eu responder, diga "Nice to meet you!".`,
            2: `Estou aprendendo inglês.\nAja como um agente de imigração. O tópico é perguntar a nacionalidade. Siga estes passos:\n1. Cumprimente-me e faça a pergunta "Where are you from?".\n2. Espere pela minha resposta.\n3. Depois, faça mais duas perguntas sobre a minha origem (ex: "What city?").\n4. No final, diga "Welcome and enjoy your stay!".`,
            3: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é apresentar pessoas. Siga estes passos:\n1. Explique brevemente como usar "This is my..." para apresentar alguém.\n2. Dê um exemplo: "This is my brother. His name is John.".\n3. Peça-me para eu apresentar duas pessoas da minha família (mãe e pai).\n4. Espere pela minha resposta e corrija-me se for necessário.`,
            4: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é o alfabeto e os números. Siga estes passos:\n1. Diga-me uma palavra simples em inglês (ex: "BOOK").\n2. Peça-me para soletrá-la ("Can you spell that, please?").\n3. Espere pela minha resposta e corrija-a.\n4. Depois, diga um número de telefone (dígito por dígito) e peça-me para o escrever.\n5. Verifique se a minha resposta está correta.`,
            5: `Estou aprendendo inglês.\nAja como rececionista de um hotel. O tópico é pedir informações de contacto. Siga estes passos:\n1. Cumprimente-me e diga que precisa dos meus dados para o check-in.\n2. Peça o meu nome completo, número de telefone e endereço de e-mail, uma pergunta de cada vez.\n3. Espere pelas minhas respostas.\n4. No final, agradeça e confirme as informações.`,
            6: `Estou aprendendo inglês.\nAja como o meu professor de inglês. O tópico são os objetos do dia a dia. Siga estes passos:\n1. Mostre-me (descreva) 3 objetos virtuais diferentes (ex: a pen, an eraser, a book).\n2. Para cada objeto, pergunte "What's this?".\n3. Espere pela minha resposta ("It's a/an...").\n4. Corrija-me se eu errar o artigo 'a' ou 'an'.`,
            7: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico são os pronomes demonstrativos. Siga estes passos:\n1. Explique em 2 frases a diferença entre 'this'/'that' e 'these'/'those'.\n2. Crie um exercício com 2 frases para eu completar com o pronome correto.\n3. Espere pela minha resposta e corrija-a.`,
            8: `Estou aprendendo inglês.\nAja como um novo colega de trabalho. O tópico é uma revisão geral do módulo 1. Siga estes passos:\n1. Inicie um diálogo, apresente-se e pergunte o meu nome.\n2. Depois de eu responder, pergunte de onde eu sou.\n3. Por fim, peça para eu soletrar o meu apelido.`,
            9: `Estou aprendendo inglês.\nAja como um entrevistador de um podcast. O tópico é a rotina diária (Simple Present). Siga estes passos:\n1. Comece a entrevista e faça-me 3 perguntas sobre a minha rotina, usando "Do you...?" (ex: "Do you wake up early?").\n2. Espere pelas minhas respostas a cada pergunta.\n3. No final, agradeça pela minha participação.`,
            10: `Estou aprendendo inglês.\nAja como o meu editor. O tópico é a 3ª pessoa do singular (he/she/it). Siga estes passos:\n1. Dê-me um pequeno texto (3 frases) sobre a rotina de alguém, mas com erros nos verbos (ex: "He go to work").\n2. Peça-me para encontrar e corrigir os 3 erros.\n3. Espere pela minha resposta e confirme se as correções estão certas.`,
            11: `Estou aprendendo inglês.\nAja como um amigo que está a planear uma festa. O tópico é gostar e não gostar. Siga estes passos:\n1. Pergunte-me sobre 3 géneros musicais usando "Do you like...?" para decidir a playlist da festa.\n2. Espere pelas minhas respostas.\n3. Com base nas minhas respostas, sugira um cantor ou banda.`,
            12: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é o negativo 'don't'. Siga estes passos:\n1. Dê-me uma lista de 3 atividades (ex: study math, watch horror movies, eat fish).\n2. Peça-me para criar 3 frases sobre mim, usando "I like..." ou "I don't like...".\n3. Espere pela minha resposta e verifique a estrutura das minhas frases negativas.`,
            13: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico são os pronomes objeto (me, him, her, us, them). Siga estes passos:\n1. Dê-me uma frase, como "I need to talk to John.".\n2. Peça-me para reescrever a frase usando um pronome objeto.\n3. Espere pela minha resposta ("I need to talk to him.") e corrija-a.\n4. Repita o processo mais 2 vezes com pessoas diferentes.`,
            14: `Estou aprendendo inglês.\nAja como um médico. O tópico são os advérbios de frequência. Siga estes passos:\n1. Pergunte-me sobre a frequência de 3 hábitos saudáveis usando "How often do you...?" (ex: eat vegetables).\n2. Espere pelas minhas respostas (com 'always', 'sometimes', 'never').\n3. No final, dê-me uma recomendação de saúde com base nas minhas respostas.`,
            15: `Estou aprendendo inglês.\nAja como o meu assistente pessoal. O tópico é dizer as horas. Siga estes passos:\n1. Diga-me 3 compromissos que eu tenho hoje, cada um com um horário diferente (ex: "You have a meeting at half past ten.").\n2. Peça-me para confirmar os horários, escrevendo-os em formato digital (ex: 10:30).\n3. Verifique se as minhas respostas estão corretas.`,
            16: `Estou aprendendo inglês.\nAja como um amigo. O tópico é uma revisão geral do módulo 2. Siga estes passos:\n1. Faça-me uma pergunta sobre os meus gostos ("Do you like...?").\n2. Faça-me uma pergunta sobre a minha rotina ("What time do you usually...?").\n3. Faça-me uma pergunta sobre a frequência de uma atividade ("How often do you...?").\n4. Mantenha um diálogo curto com base nas minhas respostas.`,
            17: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é o possessivo 's. Siga estes passos:\n1. Dê-me 3 frases com erros, como 'The car of my sister is red'.\n2. Peça-me para corrigi-las para 'My sister's car is red'.\n3. Espere pela minha resposta e dê feedback sobre as correções.`,
            18: `Estou aprendendo inglês.\nAja como um recrutador. O tópico é falar sobre profissões. Siga estes passos:\n1. Comece uma pequena entrevista e pergunte-me 'What do you do?'.\n2. Deixe-me descrever a minha profissão (ou uma profissão que eu queira).\n3. Faça uma pergunta de seguimento sobre o meu trabalho (ex: 'What do you like about your job?').`,
            19: `Estou aprendendo inglês.\nAja como um agente imobiliário. O tópico é descrever lugares com 'There is/are'. Siga estes passos:\n1. Descreva uma cozinha para mim usando 'There is a...' e 'There are some...'.\n2. Peça-me para descrever o meu quarto usando as mesmas estruturas.\n3. Espere pela minha resposta e corrija se necessário.`,
            20: `Estou aprendendo inglês.\nAja como um turista perdido. O tópico são as preposições de lugar. Siga estes passos:\n1. Peça-me direções para o café mais próximo.\n2. Eu vou tentar explicar usando 'next to', 'opposite', 'between'.\n3. Faça uma pergunta para confirmar se entendeu (ex: 'So, it's next to the bank?').`,
            21: `Estou aprendendo inglês.\nAja como o meu colega de casa. O tópico é 'How much' vs 'How many'. Siga estes passos:\n1. Diga que precisamos de ir às compras.\n2. Faça-me 2 perguntas com 'How many' (ex: eggs) e 2 perguntas com 'How much' (ex: milk).\n3. Espere pelas minhas respostas para criar a nossa lista de compras.`,
            22: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é 'a little' vs 'a few'. Siga estes passos:\n1. Explique em uma frase a diferença entre 'a little' (incontáveis) e 'a few' (contáveis).\n2. Dê-me 2 frases para eu completar com a opção correta.\n3. Espere pela minha resposta e corrija-a.`,
            23: `Estou aprendendo inglês.\nAja como meu amigo. O tópico é o uso de 'can'/'can't'. Siga estes passos:\n1. Pergunte-me sobre 2 habilidades usando 'Can you...?' (ex: 'Can you play the guitar?').\n2. Depois, faça-me um pedido usando 'Can you...?' (ex: 'Can you help me with this box?').`,
            24: `Estou aprendendo inglês.\nAja como se estivéssemos ao telefone. O tópico é o Present Continuous. Siga estes passos:\n1. Cumprimente-me e pergunte 'What are you doing?'.\n2. Deixe-me responder.\n3. Faça mais uma pergunta sobre o que está a acontecer à minha volta (ex: 'Is anyone else there with you?').`,
            25: `Estou aprendendo inglês.\nAja como um jornalista. O tópico é a diferença entre Simple Present e Present Continuous. Siga estes passos:\n1. Pergunte-me: 'What do you usually do on weekends?' (rotina).\n2. Depois de eu responder, pergunte: 'And what are you doing right now?' (ação no momento).\n3. Compare as minhas duas respostas para reforçar a diferença.`,
            26: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é uma revisão do módulo 3. Siga estes passos:\n1. Dê-me um exercício com 3 frases onde eu tenho que escolher entre o Simple Present e o Present Continuous.\n2. Espere pela minha resposta e dê feedback.\n3. Pergunte-me o que eu faria com 'a few' dólares.`,
            27: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é o verbo 'to be' no passado (was/were). Siga estes passos:\n1. Dê-me 3 frases com erros em 'was' ou 'were' (ex: 'They was happy.').\n2. Peça-me para encontrar e corrigir os erros.\n3. Espere pela minha resposta e confirme as correções.`,
            28: `Estou aprendendo inglês.\nAja como um amigo curioso. O tópico é o Simple Past. Siga estes passos:\n1. Pergunte-me 'What did you do yesterday?'.\n2. Eu vou responder com 2 ou 3 ações.\n3. Faça uma pergunta de seguimento sobre uma das minhas ações (ex: 'Oh, you watched a movie? Was it good?').`,
            29: `Estou aprendendo inglês.\nAja como um detetive. O tópico são perguntas no passado com 'Did'. Siga estes passos:\n1. Diga que está a investigar um 'crime' (ex: o último biscoito que desapareceu).\n2. Faça-me 3 perguntas sobre onde eu estava e o que fiz ontem, usando 'Did you...?'.\n3. Eu só posso responder 'Yes, I did' ou 'No, I didn't'.`,
            30: `Estou aprendendo inglês.\nAja como um agente de viagens. O tópico são planos futuros com 'going to'. Siga estes passos:\n1. Diga que eu ganhei uma viagem.\n2. Faça-me 3 perguntas sobre os meus planos usando 'Are you going to...?' (ex: 'Are you going to travel alone?').\n3. Com base nas minhas respostas, sugira um destino.`,
            31: `Estou aprendendo inglês.\nAja como um biógrafo. O tópico é uma revisão final do A1. Siga estes passos:\n1. Peça para eu me apresentar (presente).\n2. Pergunte sobre uma memória importante da minha infância (passado).\n3. Pergunte sobre um grande plano que tenho para o próximo ano (futuro).`,
            32: `Estou aprendendo inglês.\nAja como um escritor parceiro. O tópico é praticar a narração de histórias. Siga estes passos:\n1. Comece uma história com a frase: "Last year, I decided to learn a new skill...".\n2. Peça-me para continuar a história, explicando qual foi a habilidade e o que aconteceu.\n3. Adicione mais uma frase à minha história e peça para eu continuar novamente.`
        },
        preview_prompts: { // Prompts de PREPARAÇÃO (próxima aula)
            1: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. Vou ter a minha primeira aula. Siga estes passos:\n1. Ensine-me as 3 formas mais comuns de dizer "olá".\n2. Ensine-me a perguntar "Qual é o seu nome?" e a responder "O meu nome é...".\n3. Crie um mini-diálogo para eu completar, praticando o que aprendi.\n4. Espere pela minha resposta e corrija-a.`,
            2: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico será nacionalidades. Siga estes passos:\n1. Explique como se pergunta "De onde você é?" em inglês.\n2. Dê-me 3 exemplos de países com as suas nacionalidades (ex: Brazil - Brazilian).\n3. Crie um exercício onde me dá um país e eu tenho de dizer a nacionalidade.\n4. Espere pela minha resposta e corrija-a.`,
            3: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico será apresentar pessoas. Siga estes passos:\n1. Explique a diferença entre "his" (para homens) e "her" (para mulheres).\n2. Dê um exemplo: "This is my friend. His name is Paulo. This is my sister. Her name is Ana.".\n3. Crie um exercício para eu completar com "his" ou "her".\n4. Espere pela minha resposta e corrija-a.`,
            4: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico será o alfabeto e os números de 1 a 20. Siga estes passos:\n1. Mostre-me o alfabeto em inglês.\n2. Mostre-me os números de 1 a 20 por extenso.\n3. Faça-me um pequeno teste: diga um número e peça-me para o escrever por extenso.\n4. Espere pela minha resposta e corrija-a.`,
            5: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico será informações de contacto. Siga estes passos:\n1. Ensine-me a perguntar "What's your phone number?" e "What's your email address?".\n2. Explique como dizer "." (dot) e "@" (at) em inglês.\n3. Peça-me para praticar, perguntando-me o meu e-mail.\n4. Espere pela minha resposta e corrija-a.`,
            6: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico serão os artigos 'a' e 'an'. Siga estes passos:\n1. Explique a regra: quando usamos 'a' (antes de som de consoante) e quando usamos 'an' (antes de som de vogal).\n2. Dê-me 3 exemplos de cada.\n3. Crie um exercício com 3 palavras para eu completar com 'a' ou 'an'.\n4. Espere pela minha resposta e corrija-a, explicando o porquê.`,
            7: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico serão os pronomes demonstrativos. Siga estes passos:\n1. Explique a diferença entre 'this', 'that', 'these' e 'those'.\n2. Dê um exemplo visual (descrevendo objetos virtuais perto e longe).\n3. Peça-me para criar uma frase usando 'these'.\n4. Espere pela minha resposta e dê feedback.`,
            8: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é a revisão do Módulo 1. Siga estes passos:\n1. Diga que vamos fazer uma revisão rápida.\n2. Peça-me para me apresentar em inglês (nome e nacionalidade).\n3. Faça-me soletrar uma palavra (ex: 'FAMILY').\n4. Dê feedback sobre a minha apresentação e soletração.`,
            9: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é o Simple Present para rotinas. Siga estes passos:\n1. Explique que usamos o Simple Present para hábitos e rotinas.\n2. Dê 3 exemplos de verbos de rotina (wake up, have lunch, go to bed).\n3. Peça-me para criar uma frase sobre a minha rotina usando um desses verbos.\n4. Espere pela minha resposta e corrija-a.`,
            10: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é a regra do '-s' para he/she/it. Siga estes passos:\n1. Explique que para 'he', 'she' e 'it', o verbo geralmente ganha um '-s'.\n2. Dê 3 exemplos (He works, She plays, It rains).\n3. Crie um exercício para eu completar: "My brother ___ (live) in another city.".\n4. Espere pela minha resposta e explique a correção.`,
            11: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico são perguntas com 'Do' e 'Does'. Siga estes passos:\n1. Explique que usamos 'Do' para I/you/we/they e 'Does' para he/she/it.\n2. Dê um exemplo de cada: "Do you like coffee?", "Does he play tennis?".\n3. Peça-me para transformar a frase "She likes pizza" numa pergunta.\n4. Espere pela minha resposta e corrija-a.`,
            12: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico são negativas com 'don't' e 'doesn't'. Siga estes passos:\n1. Explique que usamos 'don't' para I/you/we/they e 'doesn't' para he/she/it.\n2. Dê um exemplo de cada: "I don't smoke.", "She doesn't work here.".\n3. Peça-me para transformar a frase "He speaks French" numa negativa.\n4. Espere pela minha resposta e corrija-a.`,
            13: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico são os pronomes objeto. Siga estes passos:\n1. Mostre-me uma lista: I -> me, you -> you, he -> him, she -> her, it -> it, we -> us, they -> them.\n2. Dê uma frase de exemplo: "I like her.".\n3. Crie um exercício para eu completar: "She gave the book to ___ (I).".\n4. Espere pela minha resposta e corrija-a.`,
            14: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico são advérbios de frequência. Siga estes passos:\n1. Ensine-me a ordem de frequência: always > usually > sometimes > never.\n2. Explique que eles vêm ANTES do verbo principal (ex: "I always drink coffee.").\n3. Peça-me para criar uma frase sobre mim usando 'sometimes'.\n4. Espere pela minha resposta e verifique a posição do advérbio.`,
            15: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é dizer as horas. Siga estes passos:\n1. Explique a diferença entre 'a.m.' (manhã) e 'p.m.' (tarde/noite).\n2. Ensine a estrutura simples: "It's [hora] [minutos]." (ex: "It's two fifteen.").\n3. Pergunte-me "What time is it now?".\n4. Espere pela minha resposta e ajude-me a dizê-la corretamente.`,
            16: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é uma revisão do Módulo 2. Siga estes passos:\n1. Diga que vamos fazer uma revisão rápida.\n2. Crie um exercício para eu completar com 'don't' ou 'doesn't': "He ___ like rainy days.".\n3. Espere pela minha resposta e corrija-a.\n4. Pergunte-me "What time do you usually go to bed?".`,
            17: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é o possessivo 's. Siga estes passos:\n1. Explique que usamos 's para mostrar posse (ex: "Maria's book").\n2. Dê 2 exemplos: um com nome singular e um com nome plural terminado em 's' (ex: "my parents' house").\n3. Peça-me para reescrever a frase "The name of my dog is Max." usando 's.\n4. Espere pela minha resposta e corrija-a.`,
            18: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é falar sobre profissões. Siga estes passos:\n1. Ensine-me a pergunta "What do you do?".\n2. Dê 3 exemplos de resposta: "I'm a student.", "I'm an engineer.", "I work in marketing.".\n3. Pergunte-me "What do you do?".\n4. Espere pela minha resposta e ajude-me a formulá-la corretamente.`,
            19: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é 'There is' e 'There are'. Siga estes passos:\n1. Explique que usamos 'There is' para singular e 'There are' para plural.\n2. Dê um exemplo de cada.\n3. Peça-me para descrever o que há nesta sala (virtualmente) usando 'There is' ou 'There are'.\n4. Espere pela minha resposta e dê feedback.`,
            20: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico são preposições de lugar. Siga estes passos:\n1. Ensine-me o significado de 3 preposições: 'in', 'on', 'under'.\n2. Dê um exemplo para cada uma (ex: "The cat is in the box.").\n3. Crie um exercício para eu completar: "The books are ___ the table.".\n4. Espere pela minha resposta e corrija-a.`,
            21: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é 'How much' e 'How many'. Siga estes passos:\n1. Explique a diferença: 'How many' para contáveis, 'How much' para incontáveis.\n2. Dê um exemplo para cada.\n3. Crie um exercício para eu escolher a opção correta: "___ (How much/How many) water do you drink?".\n4. Espere pela minha resposta e explique a correção.`,
            22: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é 'a little' e 'a few'. Siga estes passos:\n1. Explique a diferença: 'a few' para contáveis, 'a little' para incontáveis.\n2. Dê um exemplo para cada.\n3. Crie um exercício para eu escolher a opção correta: "I have ___ (a little/a few) friends.".\n4. Espere pela minha resposta e explique a correção.`,
            23: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é o modal 'can'. Siga estes passos:\n1. Explique que 'can' é usado para habilidades (eu sei fazer) e permissão (eu posso fazer).\n2. Dê um exemplo de cada.\n3. Peça-me para criar uma frase sobre uma habilidade que eu tenho.\n4. Espere pela minha resposta e dê feedback.`,
            24: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é o Present Continuous. Siga estes passos:\n1. Explique que o usamos para ações que estão a acontecer AGORA (verbo 'to be' + verbo com '-ing').\n2. Dê um exemplo: "I am talking to you.".\n3. Pergunte-me: "What are you doing right now?".\n4. Espere pela minha resposta e ajude-me a usar a estrutura correta.`,
            25: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é a diferença entre Simple Present e Present Continuous. Siga estes passos:\n1. Explique: Simple Present para rotinas, Present Continuous para o agora.\n2. Dê um exemplo claro que mostre a diferença: "I usually drink tea, but today I am drinking coffee.".\n3. Crie um exercício para eu completar: "She ___ (work) in a bank, but she ___ (not work) today.".\n4. Espere pela minha resposta e corrija-a.`,
            26: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é a revisão do Módulo 3. Siga estes passos:\n1. Diga que vamos fazer uma revisão rápida.\n2. Crie um exercício para eu escolher entre Simple Present e Present Continuous: "Listen! The baby ___ (cry).".\n3. Espere pela minha resposta e corrija-a.\n4. Pergunte-me: "Can you swim?".`,
            27: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é o passado de 'to be' (was/were). Siga estes passos:\n1. Explique quando usar 'was' (I, he, she, it) e 'were' (you, we, they).\n2. Dê um exemplo de cada.\n3. Crie um exercício para eu completar: "We ___ at home yesterday.".\n4. Espere pela minha resposta e explique a correção.`,
            28: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é o Simple Past para verbos regulares. Siga estes passos:\n1. Explique que para verbos regulares no passado, geralmente adicionamos '-ed'.\n2. Dê 3 exemplos: "work -> worked", "play -> played", "study -> studied".\n3. Peça-me para colocar o verbo 'watch' no passado numa frase.\n4. Espere pela minha resposta e corrija-a.`,
            29: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico são perguntas e negativas no Simple Past. Siga estes passos:\n1. Explique que usamos 'did' para perguntar e 'didn't' para negar, e que o verbo principal volta ao normal.\n2. Dê um exemplo: "Did you work yesterday? No, I didn't work.".\n3. Peça-me para transformar a frase "He played tennis" numa pergunta.\n4. Espere pela minha resposta e corrija-a.`,
            30: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é o futuro com 'going to'. Siga estes passos:\n1. Explique que usamos 'am/is/are + going to + verbo' para falar de planos futuros.\n2. Dê um exemplo: "I am going to travel next month.".\n3. Pergunte-me: "What are you going to do this weekend?".\n4. Espere pela minha resposta e ajude-me a usar a estrutura correta.`,
            31: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é uma revisão final do A1. Siga estes passos:\n1. Diga que vamos fazer uma revisão final.\n2. Pergunte-me algo no presente: "What do you do?".\n3. Pergunte-me algo no passado: "What did you do yesterday?".\n4. Pergunte-me algo no futuro: "What are you going to do tomorrow?".`,
            32: `Estou aprendendo inglês.\nAja como o meu tutor de inglês. O tópico é a preparação para o projeto final. Siga estes passos:\n1. Explique que o projeto será uma pequena apresentação sobre a minha vida.\n2. Dê-me 3 dicas para uma boa apresentação (ex: "Use frases simples", "Fale devagar", "Faça contacto visual").\n3. Pergunte-me qual será o primeiro tópico da minha apresentação.`
        }
    },
    conversation: {
        titles: [
            "", "Dreams & Ambitions", "Love & Relationships", "Rebellion & Freedom",
            "City Life vs. Country Life", "Friendship", "Overcoming Challenges",
            "Travel & Adventure", "Work & Career", "Technology & Social Media",
            "Happiness & Life Philosophy", "The Supernatural & Mysteries", "Memory & Nostalgia",
            "Crime & Justice", "Food & Culture", "Success & Failure",
            "The Future & AI", "Learning & Education", "Animals & Nature"
        ],
        prompts: { // Prompts de REVISÃO (aula concluída)
            1: `The entire conversation MUST be in English.\nAct as a career coach. The topic is dreams and ambitions.\nFollow these steps:\n1. Start the conversation by asking me: "What is the difference between a dream and a goal in your opinion?".\n2. After I answer, ask me about a long-term ambition I have and why it's important to me.\n3. During our conversation, introduce and explain the meaning of the idiom "the sky's the limit".`,
            2: `The entire conversation MUST be in English.\nAct as a relationship counselor. The topic is love and relationships.\nFollow these steps:\n1. Present me with this dilemma: "Some say that passion is the most important element to sustain a long-term relationship, while others argue that friendship is the key."\n2. Ask for my opinion on this topic and ask me to provide a reason.\n3. Gently challenge my viewpoint by presenting the opposite perspective.\n4. During our chat, try to use and explain the phrase "to be on the same page".`,
            3: `The entire conversation MUST be in English.\nAct as a journalist exploring the concept of freedom. The topic is rebellion and freedom.\nFollow these steps:\n1. Start by asking me: "Can true freedom exist without some form of rebellion, either personal or social?".\n2. Listen to my answer and then ask for a real-world example to support my view.\n3. Introduce a counter-argument. For example, if I agree, you can suggest that stability is more important than rebellion.\n4. During our talk, introduce and explain the concept of "civil disobedience".`,
            4: `The entire conversation MUST be in English.\nAct as a partner in a debate. The topic is City Life vs. Country Life.\nFollow these steps:\n1. State the motion of the debate: "This house believes that living in the countryside provides a better quality of life than living in a major city."\n2. Ask me to choose a side and present my main argument.\n3. After I speak, you must take the opposing side and present a strong counter-argument.\n4. During the debate, introduce and explain the idiom "the best of both worlds".`,
            5: `The entire conversation MUST be in English.\nAct as a sociologist studying friendship. The topic is the nature of modern friendship.\nFollow these steps:\n1. Start with this observation: "With social media, it's easier than ever to have hundreds of 'friends'. But some argue these connections are superficial."\n2. Ask me the question: "In your opinion, what is the true definition of a friend in the digital age?".\n3. Ask me a follow-up question about the difference between a "close friend" and an "acquaintance".\n4. During our conversation, try to use and explain the expression "a friend in need is a friend indeed".`,
            6: `The entire conversation MUST be in English.\nAct as a life coach. The topic is overcoming challenges.\nFollow these steps:\n1. Start by asking me to think about a significant challenge I've faced in my life.\n2. Ask me: "What was the biggest lesson you learned from that experience?".\n3. Based on my answer, ask a follow-up question about how that lesson helps me today.\n4. Introduce and explain the idiom "every cloud has a silver lining".`,
            7: `The entire conversation MUST be in English.\nAct as an experienced backpacker. The topic is travel and adventure.\nFollow these steps:\n1. Tell me about a fictional, amazing place you've "visited".\n2. Ask me: "If you could travel anywhere in the world, with no budget limits, where would you go and why?".\n3. Listen to my answer and ask a question about the kind of activities I would do there.\n4. Introduce and explain the expression "to get itchy feet".`,
            8: `The entire conversation MUST be in English.\nAct as a senior manager in a company. The topic is work and career.\nFollow these steps:\n1. Present this scenario: "Imagine you have to choose between a job that you love but pays poorly, and a job that you find boring but pays very well."\n2. Ask me: "Which one would you choose and what are your reasons?".\n3. Challenge my decision by highlighting the main benefit of the other option.\n4. Introduce and explain the phrase "to climb the career ladder".`,
            9: `The entire conversation MUST be in English.\nAct as a technology journalist. The topic is social media.\nFollow these steps:\n1. Start with this premise: "Some say social media is a powerful tool for connection, while others call it a source of anxiety."\n2. Ask for my opinion: "What is your personal experience? Has it been more of a positive or a negative force in your life?".\n3. Based on my answer, ask a follow-up question.\n4. Introduce and explain the term "digital footprint".`,
            10: `The entire conversation MUST be in English.\nAct as a philosopher. The topic is happiness.\nFollow these steps:\n1. Ask me the classic question: "If you could have one of these three things for the rest of your life, which would you choose: unlimited wealth, true love, or profound wisdom?".\n2. Ask me to justify my choice.\n3. Gently argue for one of the options I didn't choose, to deepen the discussion.\n4. Introduce and explain the concept of "hedonic treadmill".`,
            11: `The entire conversation MUST be in English.\nAct as an investigator of mysteries. The topic is the supernatural.\nFollow these steps:\n1. Tell me a very short, mysterious story (e.g., about a strange noise in an old house).\n2. Ask me: "Do you believe in ghosts or supernatural phenomena? Why or why not?".\n3. Listen to my answer and show curiosity, asking a follow-up question.\n4. Introduce and explain the idiom "to make your blood run cold".`,
            12: `The entire conversation MUST be in English.\nAct as a childhood friend. The topic is memory and nostalgia.\nFollow these steps:\n1. Start by saying: "I was just thinking about the good old days...".\n2. Ask me: "What's a sound, smell, or song that instantly takes you back to your childhood?".\n3. After I answer, ask me to describe the memory associated with it.\n4. Introduce and explain the expression "to take a trip down memory lane".`,
            13: `The entire conversation MUST be in English.\nAct as a law student. The topic is crime and justice.\nFollow these steps:\n1. Present a moral dilemma: "Is it ever acceptable for a person to steal, for example, to feed their starving family?".\n2. Ask for my opinion and my reasoning.\n3. Challenge my reasoning by presenting the legal perspective versus the moral one.\n4. Introduce and explain the concept of a "grey area".`,
            14: `The entire conversation MUST be in English.\nAct as a food critic. The topic is food and culture.\nFollow these steps:\n1. Start by saying: "I believe that to truly understand a culture, you must first understand its food.".\n2. Ask me: "What is a traditional dish from your culture, and what does it say about your country?".\n3. Ask me a follow-up question about the ingredients or how it's prepared.\n4. Introduce and explain the idiom "the proof is in the pudding".`,
            15: `The entire conversation MUST be in English.\nAct as a business mentor. The topic is success and failure.\nFollow these steps:\n1. Ask me the question: "Which is a better teacher: success or failure? Please explain why.".\n2. Listen to my answer and challenge it by arguing for the opposite viewpoint.\n3. Ask me to think of a famous person who exemplifies my point of view.\n4. Introduce and explain the expression "to learn from your mistakes".`,
            16: `The entire conversation MUST be in English.\nAct as a futurist. The topic is the future and AI.\nFollow these steps:\n1. Present this question: "In 50 years, what is one job that you think will be completely automated by AI, and one job that will still need a human?".\n2. Ask me to justify both of my choices.\n3. Offer your own opinion on one of my choices.\n4. Introduce and explain the concept of a "paradigm shift".`,
            17: `The entire conversation MUST be in English.\nAct as a university professor. The topic is learning and education.\nFollow these steps:\n1. Pose the question: "What is more valuable for a successful career: the knowledge you gain in university, or the soft skills like communication and teamwork?".\n2. Ask for my opinion and reasoning.\n3. Gently challenge my view by emphasizing the importance of the other side.\n4. Introduce and explain the concept of a "learning curve".`,
            18: `The entire conversation MUST be in English.\nAct as a wildlife documentarian. The topic is animals and nature.\nFollow these steps:\n1. Start with this statement: "Humans have a responsibility to protect endangered species."\n2. Ask me: "What do you think is the single most important thing we can do to protect the planet's biodiversity?".\n3. Listen to my idea and ask a follow-up question about how it could be implemented.\n4. Introduce and explain the term "domino effect" in the context of ecosystems.`
        },
        preview_prompts: { // Prompts de PREPARAÇÃO (próxima aula)
            1: `The entire conversation MUST be in English.\nAct as my English tutor. I'm preparing for a class about Dreams & Ambitions.\nFollow these steps:\n1. Explain the difference between 'ambition', 'goal', and 'dream'.\n2. Give me one example sentence for each.\n3. Ask me to create my own sentence using the word 'ambition'.\n4. Wait for my answer and provide feedback.`,
            2: `The entire conversation MUST be in English.\nAct as my English tutor. I'm preparing for a class about Love & Relationships.\nFollow these steps:\n1. Teach me 3 advanced adjectives to describe a good partner (e.g., supportive, reliable, thoughtful).\n2. Give me an example sentence for one of them.\n3. Ask me to describe the qualities of a good friend, encouraging me to use one of the new adjectives.\n4. Wait for my answer and provide feedback.`,
            3: `The entire conversation MUST be in English.\nAct as my English tutor. I'm preparing for a class about Rebellion & Freedom.\nFollow these steps:\n1. Explain the meaning of the expression "to stand up for what you believe in".\n2. Give a simple example.\n3. Ask me a question: "Think about a time you had to stand up for something. What was it?".\n4. Wait for my answer and help me express it in English if needed.`,
            4: `The entire conversation MUST be in English.\nAct as my English tutor. I'm preparing for a debate about City vs. Country life.\nFollow these steps:\n1. Provide me with two phrases for expressing opinions (e.g., "In my view...", "From my perspective...").\n2. Provide me with two phrases for disagreeing politely (e.g., "I see your point, but...", "I respectfully disagree because...").\n3. Start a mini-debate by saying "I believe city life is more exciting. What do you think?".\n4. Wait for my response and encourage me to use the new phrases.`,
            5: `The entire conversation MUST be in English.\nAct as my English tutor. I'm preparing for a class about Friendship.\nFollow these steps:\n1. Teach me two English idioms about friendship (e.g., "birds of a feather flock together", "to see eye to eye").\n2. Explain their meanings briefly.\n3. Ask me to try and use one of them in a sentence about my own friends.\n4. Wait for my answer and provide feedback.`,
            6: `The entire conversation MUST be in English.\nAct as my English tutor. I'm preparing for a class about overcoming challenges.\nFollow these steps:\n1. Explain the meaning of the word "resilience".\n2. Give me an example sentence.\n3. Ask me to describe a situation that requires resilience.\n4. Wait for my answer and provide feedback.`,
            7: `The entire conversation MUST be in English.\nAct as my English tutor. I'm preparing for a class about travel.\nFollow these steps:\n1. Explain the difference between 'travel', 'trip', and 'journey'.\n2. Give me an example for each.\n3. Ask me "What was the most memorable trip you've ever taken?".\n4. Wait for my answer and ask a follow-up question.`,
            8: `The entire conversation MUST be in English.\nAct as my English tutor. I'm preparing for a class about careers.\nFollow these steps:\n1. Teach me 3 "power verbs" for a resume (e.g., "managed", "developed", "achieved").\n2. Ask me to make a sentence about my professional experience using one of them.\n3. Wait for my answer and provide feedback.`,
            9: `The entire conversation MUST be in English.\nAct as my English tutor. I'm preparing for a class about technology.\nFollow these steps:\n1. Explain the term "digital detox".\n2. Give me one example sentence.\n3. Ask me for my opinion: "Do you think digital detoxes are a good idea?".\n4. Wait for my answer and ask me why I think so.`,
            10: `The entire conversation MUST be in English.\nAct as my English tutor. I'm preparing for a class about happiness.\nFollow these steps:\n1. Explain the difference between "fun" and "happiness".\n2. Ask me to describe something that is "fun" for me, and something that brings me "happiness".\n3. Wait for my answer and comment on it.`,
            11: `The entire conversation MUST be in English.\nAct as my English tutor. I'm preparing for a class about mysteries.\nFollow these steps:\n1. Teach me 3 words related to mystery: "clue", "suspect", "alibi".\n2. Give me an example sentence using one of them.\n3. Ask me to create a sentence with the word "suspect".\n4. Wait for my answer and provide feedback.`,
            12: `The entire conversation MUST be in English.\nAct as my English tutor. I'm preparing for a class about nostalgia.\nFollow these steps:\n1. Explain the meaning of the adjective "bittersweet".\n2. Give an example of a bittersweet memory.\n3. Ask me to describe a "bittersweet" memory of my own.\n4. Wait for my answer and offer a kind comment.`,
            13: `The entire conversation MUST be in English.\nAct as my English tutor. I'm preparing for a class about justice.\nFollow these steps:\n1. Explain the difference between "justice" and "revenge".\n2. Ask me for my opinion: "Is a life sentence a fair punishment for all serious crimes?".\n3. Wait for my answer and ask a follow-up question.`,
            14: `The entire conversation MUST be in English.\nAct as my English tutor. I'm preparing for a class about food.\nFollow these steps:\n1. Teach me 3 advanced adjectives to describe food texture (e.g., "creamy", "crunchy", "tender").\n2. Give an example for each.\n3. Ask me to describe my favorite food using one of these words.\n4. Wait for my answer and provide feedback.`,
            15: `The entire conversation MUST be in English.\nAct as my English tutor. I'm preparing for a class about success and failure.\nFollow these steps:\n1. Explain the meaning of the proverb "Failure is the mother of success.".\n2. Ask me if I agree with this statement and why.\n3. Wait for my answer and ask for a personal example.`,
            16: `The entire conversation MUST be in English.\nAct as my English tutor. I'm preparing for a class about AI.\nFollow these steps:\n1. Explain the term "AI ethics".\n2. Ask me for my opinion: "What is the biggest ethical concern we should have about AI?".\n3. Wait for my answer and ask me to elaborate on my point.`,
            17: `The entire conversation MUST be in English.\nAct as my English tutor. I'm preparing for a class about education.\nFollow these steps:\n1. Explain the difference between "knowledge" and "wisdom".\n2. Ask me: "What is something you have knowledge about, and what is something you have wisdom in?".\n3. Wait for my answer and comment on the distinction.`,
            18: `The entire conversation MUST be in English.\nAct as my English tutor. I'm preparing for a class about nature.\nFollow these steps:\n1. Explain the concept of a "carbon footprint".\n2. Give an example of how to reduce it.\n3. Ask me to name one thing I do in my daily life to help the environment.\n4. Wait for my answer and provide encouragement.`
        }
    }
};

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
        meaning: "Eu не возражаю. Uma forma de dizer que algo não o incomoda."
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
    }]
    // Adicione este conteúdo para o módulo de conversação dentro do objeto lessonExpressions
,
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
}]
};

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

// Adicione este objeto ao final do seu arquivo prompt-database.js

// Substitua o objeto badgeMessages antigo por este
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
    }
};