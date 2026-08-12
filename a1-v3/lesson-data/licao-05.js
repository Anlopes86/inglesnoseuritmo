(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { p, question, reading, homework, focus, speaking, comm, line, dialogue } = R.helpers;

    const stations = [
        focus(
            'Names, introductions and social expressions',
            'Use os blocos completos para apresentar-se, perguntar nomes, agradecer e responder.',
            [
                ['apresentação', 'My name is... / I’m...', 'My name is Laura. I’m a new student.'],
                ['pergunta', 'What’s your/his/her name?', 'What’s her name?'],
                ['resposta social', 'Nice to meet you. / You’re welcome.', 'Nice to meet you too.']
            ],
            ['Diferencie first name, last name, full name e nickname.', 'Use his para um homem e her para uma mulher.'],
            [
                p('Complete', 'My ___ is Pedro Lima.', 'name'),
                p('Complete', 'My ___ name is Lima.', 'last'),
                p('Complete', 'My ___ is Pedrinho.', 'nickname'),
                p('Build', 'your / What’s / name / ?', 'What’s your name?'),
                p('Build', 'name / her / What’s / ?', 'What’s her name?'),
                p('Answer', 'Nice to meet you.', 'Nice to meet you too.'),
                p('Answer', 'Thank you for your help.', 'You’re welcome.'),
                p('Answer', 'Get someone’s attention before a question.', 'Excuse me.'),
                p('Correct', 'I name is Laura.', 'My name is Laura.'),
                p('Describe', 'Name: Gabriel Souza · nickname: Gabi', 'His full name is Gabriel Souza. His nickname is Gabi.')
            ]
        ),
        focus(
            'Verb to be',
            'Reúna am, is e are em afirmações, negativas, perguntas e respostas curtas.',
            [
                ['I', 'am / am not', 'I’m a student. I’m not a teacher.'],
                ['he', 'is / isn’t', 'He’s Mateo. He isn’t Brazilian.'],
                ['she', 'is / isn’t', 'She’s Laura. She isn’t Spanish.'],
                ['you', 'are / aren’t', 'You’re an engineer. You aren’t late.'],
                ['we', 'are / aren’t', 'We’re hungry. We aren’t tired.'],
                ['they', 'are / aren’t', 'They’re students. They aren’t thirsty.'],
                ['question', 'Am/Is/Are + subject?', 'Are you a nurse? Is she American?']
            ],
            ['Use am somente com I; is com he/she; are com you/we/they.', 'Na pergunta, coloque am/is/are antes do sujeito.'],
            [
                p('Choose', '8:00 a.m. → Good (morning / evening)', 'morning'),
                p('Choose', '6:30 p.m., meeting someone → Good (afternoon / evening)', 'evening'),
                p('Complete', 'I ___ a teacher.', 'am'),
                p('Complete', 'He ___ Mateo.', 'is'),
                p('Complete', 'She ___ American.', 'is'),
                p('Complete', 'You ___ an engineer.', 'are'),
                p('Complete', 'We ___ hungry.', 'are'),
                p('Complete', 'They ___ students.', 'are'),
                p('Make negative', 'She is Brazilian.', 'She isn’t Brazilian.'),
                p('Make negative', 'They are thirsty.', 'They aren’t thirsty.'),
                p('Choose', '(a / an) doctor', 'a doctor'),
                p('Choose', '(a / an) office worker', 'an office worker'),
                p('Build', 'you / Are / nurse / a / ?', 'Are you a nurse?'),
                p('Build', 'American / she / Is / ?', 'Is she American?'),
                p('Answer', 'Are you a student? Positive answer.', 'Yes, I am.'),
                p('Answer', 'Is he Spanish? Negative answer.', 'No, he isn’t.'),
                p('Answer', 'How are you? Say you are great.', 'I’m great, thanks.'),
                p('Correct', 'I’m a engineer.', 'I’m an engineer.'),
                p('Correct', 'We is hungry.', 'We are hungry.'),
                p('Correct', 'Are she a doctor?', 'Is she a doctor?')
            ]
        ),
        focus(
            'Food, drinks, want and have',
            'Diferencie o que as pessoas desejam do que elas já têm.',
            [
                ['want com I', 'I want + item', 'I want a ham sandwich.'],
                ['want com grupos', 'We/They want + item', 'We want coffee.'],
                ['have', 'I/We/They have + item', 'They have chicken sandwiches.']
            ],
            ['Want indica desejo; have indica o que a pessoa tem.', 'Com I, we e they, use want e have sem -s.'],
            [
                p('Complete', 'I ___ a ham sandwich.', 'want'),
                p('Complete', 'We ___ two sandwiches.', 'want'),
                p('Complete', 'They ___ chicken sandwiches.', 'have'),
                p('Build', 'want / I / coffee', 'I want coffee.'),
                p('Build', 'have / We / orange juice', 'We have orange juice.'),
                p('Choose', 'Desejo: They (want / have) cake.', 'want'),
                p('Choose', 'Item com eles: They (want / have) cake.', 'have'),
                p('Correct', 'We wants water.', 'We want water.'),
                p('Correct', 'They has two sandwiches.', 'They have two sandwiches.'),
                p('Answer', 'Coffee or tea? Choose tea politely.', 'Tea, please.'),
                p('Answer', 'Someone gives you the tea.', 'Thank you. / Thanks.'),
                p('Describe', 'Emma + Daniel: coffee ✓ · ham sandwiches ✓', 'They have coffee and ham sandwiches.')
            ]
        ),
        focus(
            'Spelling, countries and numbers 0–20',
            'Identifique pessoas, relacione país e nacionalidade, soletre nomes e use números em idades.',
            [
                ['posse', 'his/her + noun', 'His last name is Ruiz. Her nickname is Liv.'],
                ['origem', 'from + country', 'from Spain; from Brazil'],
                ['nacionalidade', 'nationality adjective', 'Spanish; Brazilian'],
                ['idade', 'be + number + years old', 'She is twenty years old.']
            ],
            ['País recebe from; nacionalidade não recebe from.', 'Em inglês, idade usa be.'],
            [
                p('Choose', 'Laura: (He / She) is Brazilian.', 'She'),
                p('Choose', 'Mateo: (His / Her) last name is Ruiz.', 'His'),
                p('Complete', 'She is ___ Brazil.', 'from'),
                p('Correct', 'He is from Spanish.', 'He is from Spain. / He is Spanish.'),
                p('Spell', 'L-A-U-R-A', 'Laura'),
                p('Spell', 'R-U-I-Z', 'Ruiz'),
                p('Number', '12', 'twelve'),
                p('Number', '15', 'fifteen'),
                p('Number', '18', 'eighteen'),
                p('Answer', 'How old is Olivia? Age: 20', 'She is twenty years old.'),
                p('Describe', 'Ethan Clark · United States · American · 19', 'He is Ethan Clark. He is from the United States. He is American. He is nineteen years old.')
            ]
        )
    ];

    stations.push(
        speaking('attempt', 'Conversation: first meeting', 'Faça a primeira conversa usando o apoio da tela.', {
            label: 'Primeira tentativa',
            scenario: 'Você encontra uma pessoa no primeiro dia de um curso.',
            task: 'Cumprimente, apresente-se, pergunte nome completo, apelido e profissão e encerre com educação.',
            condition: 'Use pelo menos uma pergunta e duas respostas sociais.',
            steps: ['Escolha suas informações.', 'Inicie a conversa.', 'Faça as perguntas e encerre.'],
            support: ['Good morning.', 'What’s your name?', 'What do you do?', 'Nice to meet you.', 'Thank you.'],
            evidence: 'A conversa é compreensível e usa apenas a linguagem das lições 1–4.'
        }),
        speaking('questions', 'Conversation: complete the profile', 'Responda às perguntas e complete as informações que faltam.', {
            label: 'Novas perguntas',
            scenario: 'O professor acrescenta uma segunda pessoa ao cadastro.',
            task: 'Pergunte nome, origem, nacionalidade e idade da nova pessoa. Peça repetição ou soletração quando necessário.',
            condition: 'Use he/his ou she/her de acordo com o perfil apresentado.',
            steps: ['Identifique a pessoa.', 'Faça uma pergunta por vez.', 'Confirme a informação em uma frase.'],
            support: ['Who is he/she?', 'What’s his/her name?', 'Where is he/she from?', 'How old is he/she?', 'Please repeat.'],
            evidence: 'As perguntas combinam com a pessoa e as informações são confirmadas corretamente.'
        }),
        speaking('final', 'Conversation: choices during the break', 'Faça uma nova tentativa em uma situação diferente.', {
            label: 'Situação final',
            scenario: 'Você e a pessoa que acabou de conhecer escolhem comida e bebida no intervalo.',
            task: 'Diga o que você quer, o que a outra pessoa quer e o que vocês já têm.',
            condition: 'Troque uma das escolhas entre ham e chicken e encerre com please e Thank you.',
            steps: ['Faça sua escolha.', 'Fale pelas duas pessoas com we.', 'Confirme os itens com have e finalize.'],
            support: ['I want...', 'We want...', 'They have...', 'Coffee, please.', 'Here you are.', 'Thank you.'],
            evidence: 'O aluno diferencia want e have e reutiliza respostas sociais com autonomia crescente.'
        })
    );

    R.register(5, R.review({
        title: 'Conversation Activities 1',
        objectives: [
            'Recuperar somente a linguagem das lições 1–4.',
            'Praticar cada conteúdo imediatamente depois da revisão correspondente.',
            'Usar nomes, profissões, pedidos, soletração e números em conversas curtas.'
        ],
        stations,
        reading: reading(
            'The first break',
            'Laura is a new student. Her last name is Silva and her nickname is Lau. She is Brazilian and she is eighteen years old. Her classmate is Ethan. He is American and he is nineteen. At break, they are hungry. They want coffee and orange juice. They want two sandwiches: ham and chicken. Now they have their food and drinks.',
            question('What is Laura’s nickname?', 'Her nickname is Lau.'),
            question('Where is Laura from?', 'She is from Brazil.'),
            question('How old is Ethan?', 'He is nineteen.'),
            question('Complete: “They ___ coffee and orange juice.”', 'want'),
            question('Complete: “They want ___ and ___ sandwiches.”', 'ham; chicken'),
            question('Complete: “They ___ their food and drinks at the end.”', 'have')
        ),
        communicativeActivities: [
            comm('listening', 'Listen: a new student arrives', 'Ouça o diálogo completo antes de abrir o roteiro. Depois, responda sem repetir frases decoradas.', {
                placement: 'before-reading',
                scenario: 'Uma nova aluna chega à recepção de um curso e confirma suas informações.',
                dialogue: dialogue('At reception',
                    line('Reception', 'Good morning. What’s your name?', 'Bom dia. Qual é seu nome?'),
                    line('Nina', 'My name is Nina Lima.', 'Meu nome é Nina Lima.'),
                    line('Reception', 'How do you spell your last name?', 'Como se soletra seu sobrenome?'),
                    line('Nina', 'L-I-M-A.', 'L-I-M-A.'),
                    line('Reception', 'Are you Brazilian?', 'Você é brasileira?'),
                    line('Nina', 'Yes, I am. I’m from Recife.', 'Sim. Sou de Recife.'),
                    line('Reception', 'How old are you?', 'Quantos anos você tem?'),
                    line('Nina', 'I’m twenty years old.', 'Tenho vinte anos.'),
                    line('Reception', 'Coffee or tea?', 'Café ou chá?'),
                    line('Nina', 'Tea, please. Thank you.', 'Chá, por favor. Obrigada.')
                ),
                questions: [
                    question('What is the student’s full name?', 'Her full name is Nina Lima.'),
                    question('How do you spell her last name?', 'L-I-M-A.'),
                    question('Is Nina Brazilian?', 'Yes, she is.'),
                    question('Where is she from?', 'She is from Recife.'),
                    question('How old is she?', 'She is twenty years old.'),
                    question('Does she choose coffee or tea?', 'Tea.')
                ]
            }),
            comm('qa-board', 'The Question and Answer Board', 'Desembaralhe cada pergunta oralmente e escolha a resposta adequada. Depois, troque as informações e repita.', {
                scenario: 'Perguntas e respostas de um primeiro encontro ficaram separadas.',
                pairs: [
                    { scrambled: 'your / What’s / name / ?', question: 'What’s your name?', answer: 'My name is Nina.' },
                    { scrambled: 'last / your / What’s / name / ?', question: 'What’s your last name?', answer: 'It’s Lima.' },
                    { scrambled: 'spell / do / How / it / you / ?', question: 'How do you spell it?', answer: 'L-I-M-A.' },
                    { scrambled: 'student / you / a / Are / ?', question: 'Are you a student?', answer: 'Yes, I am.' },
                    { scrambled: 'from / she / Where / is / ?', question: 'Where is she from?', answer: 'She is from Brazil.' },
                    { scrambled: 'old / he / How / is / ?', question: 'How old is he?', answer: 'He is nineteen.' },
                    { scrambled: 'want / they / What / do / ?', question: 'What do they want?', answer: 'They want two sandwiches.' },
                    { scrambled: 'have / water / they / Do / ?', question: 'Do they have water?', answer: 'Yes, they do.' }
                ]
            }),
            comm('interview', 'Interview and introduce', 'Entreviste o professor usando informações reais ou inventadas. Anote palavras-chave e depois apresente a pessoa em inglês.', {
                scenario: 'Você precisa apresentar uma pessoa nova em uma chamada online.',
                questions: ['What’s your full name?', 'What’s your nickname?', 'How do you spell your last name?', 'Are you Brazilian?', 'Where are you from?', 'How old are you?', 'Are you a teacher?', 'Coffee or tea?'],
                reportTask: 'Use he/his ou she/her para apresentar nome, apelido, origem, idade, profissão e escolha no intervalo.',
                support: ['His/Her name is...', 'His/Her nickname is...', 'He/She is from...', 'He/She is... years old.', 'He/She wants...']
            })
        ],
        homework: homework(
            'Prepare uma apresentação pessoal e três conversas curtas usando somente o conteúdo das lições 1–4.',
            ['Apresentação e profissão', 'Perfil de uma terceira pessoa', 'Pedido no intervalo'],
            ['Incluí nomes, his/her e uma idade.', 'Usei a/an com profissões.', 'Usei want e have e finalizei uma troca com agradecimento.']
        )
    }));
}());
