(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { p, question, reading, homework, focus, speaking } = R.helpers;

    const stations = [
        focus(
            'Expressões de primeiro contato',
            'Revise os blocos prontos da Lição 1 sem analisar verbos isoladamente.',
            [
                ['cumprimento', 'Hello! / Good morning!', 'Good morning! I’m Ana.'],
                ['nome', 'What’s your name/last name/nickname?', 'What’s your nickname?'],
                ['outra pessoa', 'What’s his/her name?', 'What’s her name?'],
                ['cortesia', 'Excuse me. / Please. / Thank you.', 'Your last name, please.']
            ],
            [
                'Reconheça a situação e use a expressão completa.',
                'Nesta revisão, o objetivo é lembrar e compreender os modelos; não é produzir um diálogo novo.'
            ],
            [
                p('Choose', '8:00 a.m. → Good (morning / evening)', 'morning'),
                p('Choose', '3:00 p.m. → Good (afternoon / morning)', 'afternoon'),
                p('Complete', 'What’s your last ___?', 'name'),
                p('Complete', 'My ___ is Bia.', 'nickname'),
                p('Choose', 'Pergunta sobre um homem: What’s (his / her) name?', 'his'),
                p('Choose', 'Pergunta sobre uma mulher: What’s (his / her) name?', 'her'),
                p('Answer', 'Nice to meet you.', 'Nice to meet you too.'),
                p('Answer', 'Thank you.', 'You’re welcome.'),
                p('Match', 'Excuse me · Please · Thank you → chamar atenção · pedido · agradecimento', 'Excuse me = chamar atenção; Please = pedido; Thank you = agradecimento')
            ],
            'Escolha, complete e relacione as expressões prontas.'
        ),
        focus(
            'Verb to be',
            'Reúna as formas de be já apresentadas e retome os modelos fixos sobre local de trabalho.',
            [
                ['I', 'I am / I’m', 'I’m a teacher.'],
                ['you', 'You are / You’re', 'You’re a nurse.'],
                ['we', 'We are / We’re', 'We’re classmates.'],
                ['they', 'They are / They’re', 'They’re teachers.'],
                ['he', 'He is / He’s', 'He’s Leo.'],
                ['she', 'She is / She’s', 'She’s Julia.'],
                ['lugar', 'I/You work in/at + place', 'I work at a school.'],
                ['profissão', 'I/You work as + a/an + job', 'You work as a secretary.'],
                ['horário', 'I’m early. / I’m late.', 'I’m early for class.']
            ],
            [
                'Use am com I e are com you.',
                'Aprenda What do you do? e Where do you work? como perguntas completas; a gramática do Present Simple virá na Lição 7.'
            ],
            [
                p('Complete', 'I ___ a teacher.', 'am'),
                p('Complete', 'You ___ a nurse.', 'are'),
                p('Complete', 'I work ___ a hospital.', 'in'),
                p('Complete', 'I work ___ a school.', 'at'),
                p('Complete', 'You work ___ a secretary.', 'as'),
                p('Choose', 'Antes do horário: I’m (early / late).', 'early'),
                p('Choose', 'Depois do horário: I’m (early / late).', 'late'),
                p('Match', 'school · restaurant · office → teacher · waiter/waitress · secretary', 'school = teacher; restaurant = waiter/waitress; office = secretary'),
                p('Build', 'work / Where / you / do / ?', 'Where do you work?')
            ],
            'Complete os modelos de I/you e relacione cada profissão ao seu local.'
        ),
        focus(
            'We are e they are',
            'Revise como falar sobre o grupo de quem participa e sobre outros grupos.',
            [
                ['nosso grupo', 'We are / We’re', 'We’re classmates.'],
                ['outro grupo', 'They are / They’re', 'They’re teachers.'],
                ['negativa', 'We/They aren’t', 'They aren’t late.'],
                ['pergunta', 'Are we/they...?', 'Are they ready?']
            ],
            [
                'We inclui quem fala; they aponta para outro grupo.',
                'Use are com we e they em afirmações, negativas e perguntas.'
            ],
            [
                p('Choose', 'Meu grupo: (We / They) are classmates.', 'We'),
                p('Choose', 'Outro grupo: (We / They) are teachers.', 'They'),
                p('Complete', 'We ___ ready.', 'are'),
                p('Complete', 'They ___ at the cafeteria.', 'are'),
                p('Make negative', 'They are late.', 'They aren’t late.'),
                p('Build', 'hungry / Are / we / ?', 'Are we hungry?'),
                p('Build', 'ready / Are / they / ?', 'Are they ready?'),
                p('Answer', 'Are they classmates? Positive answer.', 'Yes, they are.'),
                p('Correct', 'We is early.', 'We are early.')
            ],
            'Identifique primeiro o grupo; depois escolha we ou they e complete com are.'
        ),
        focus(
            'He is, she is, his e her',
            'Retome a identificação de uma pessoa e as formas para falar do nome dela ou dele.',
            [
                ['homem', 'He is / He’s', 'He’s Leo.'],
                ['mulher', 'She is / She’s', 'She’s Julia.'],
                ['nome dele', 'his + noun', 'His name is Leo.'],
                ['nome dela', 'her + noun', 'Her name is Julia.'],
                ['pergunta', 'Is he/she...?', 'Is she a teacher?']
            ],
            [
                'Use he/his para um homem e she/her para uma mulher.',
                'He e she usam is; na pergunta, is vem antes do sujeito.'
            ],
            [
                p('Choose', 'Leo: (He / She) is a teacher.', 'He'),
                p('Choose', 'Julia: (He / She) is a secretary.', 'She'),
                p('Complete', '___ name is Leo.', 'His'),
                p('Complete', '___ name is Julia.', 'Her'),
                p('Complete', 'He ___ at school.', 'is'),
                p('Make negative', 'She is late.', 'She isn’t late.'),
                p('Build', 'teacher / Is / he / a / ?', 'Is he a teacher?'),
                p('Answer', 'Is she early? Positive answer.', 'Yes, she is.'),
                p('Correct', 'Her name is Leo.', 'His name is Leo.')
            ],
            'Observe a pessoa indicada, escolha he/she ou his/her e complete o modelo.'
        )
    ];

    stations.push(
        speaking('attempt', 'Leitura controlada: primeiro encontro', 'Leia as duas falas com o professor e troque apenas o nome.', {
            label: 'Controlled Practice 1',
            scenario: 'Modelo pronto: “Good morning. I’m Ana.” — “Hello, Ana. I’m Leo. Nice to meet you.”',
            task: 'Ouça uma fala, repita e depois leia a resposta indicada na tela.',
            condition: 'Não é necessário criar frases novas; troque somente Ana e Leo pelos nomes fornecidos pelo professor.',
            steps: ['Ouça o modelo completo.', 'Repita uma linha por vez.', 'Leia o diálogo com a troca de nomes.'],
            support: ['Good morning.', 'I’m...', 'What’s your name?', 'Nice to meet you.', 'Nice to meet you too.'],
            evidence: 'O aluno reconhece e reproduz os blocos de apresentação com apoio visual.'
        }),
        speaking('questions', 'Leitura controlada: profissão e lugar', 'Complete as lacunas com as opções e leia o perfil pronto.', {
            label: 'Controlled Practice 2',
            scenario: 'Opções: teacher · school · nurse · hospital · early · late.',
            task: 'Complete “I’m a ___”, “I work at/in a ___” e “I’m ___ today”; depois leia as três frases.',
            condition: 'Use somente as opções apresentadas na tela.',
            steps: ['Escolha a profissão.', 'Relacione o lugar.', 'Escolha early ou late e leia o perfil.'],
            support: ['I’m a teacher.', 'I work at a school.', 'I’m a nurse.', 'I work in a hospital.', 'I’m early today.'],
            evidence: 'O aluno combina corretamente profissão, lugar e condição com I.'
        }),
        speaking('final', 'Leitura controlada: pessoas e grupos', 'Aponte para a imagem ou ficha indicada e leia a frase correspondente.', {
            label: 'Controlled Practice 3',
            scenario: 'Cartões: Leo · Julia · our class · the teachers.',
            task: 'Selecione e leia um modelo com he, she, we ou they.',
            condition: 'A frase completa permanece visível durante toda a atividade.',
            steps: ['Observe o cartão.', 'Escolha o pronome.', 'Leia a frase completa duas vezes.'],
            support: ['He is Leo.', 'His name is Leo.', 'She is Julia.', 'Her name is Julia.', 'We are classmates.', 'They are teachers.'],
            evidence: 'O aluno distingue pessoa, posse e grupo sem precisar produzir linguagem livre.'
        })
    );

    R.register(5, R.review({
        title: 'Conversation Activities 1',
        objectives: [
            'Revisar somente o conteúdo das Lições 1–4.',
            'Reconhecer expressões, pessoas e grupos antes de responder.',
            'Ler e repetir modelos completos com apoio constante.'
        ],
        stations,
        reading: reading(
            'New classmates',
            '“Good morning. I’m Nina. I’m a new student.” “Hello, Nina. I’m Ben. Nice to meet you.” Nina says, “Nice to meet you too.” Nina and Ben are classmates. They are early for class. Their teachers are Ms. Reed and Mr. Costa. She is an English teacher. He is a math teacher.',
            question('Complete Nina’s model: I’m a new ___.', 'student'),
            question('Complete Ben’s greeting: Nice to ___ you.', 'meet'),
            question('Nina and Ben: We or they?', 'They.'),
            question('Complete: They ___ early for class.', 'are'),
            question('Ms. Reed: he or she?', 'She.'),
            question('Mr. Costa: his or her name?', 'His name.')
        ),
        homework: homework(
            'Revise uma apresentação-modelo e um perfil profissional das Lições 1–4. Leia cada frase pronta duas vezes; não é necessário criar um diálogo.',
            ['Cumprimentos e nomes', 'I/you com profissão e lugar', 'We/they e he/she'],
            ['Reconheço a expressão adequada.', 'Escolho am, is ou are no modelo.', 'Distingo we/they, he/she e his/her.']
        )
    }));
}());
