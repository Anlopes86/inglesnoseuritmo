(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { p, question, reading, homework, focus, speaking, comm, line, dialogue } = R.helpers;
    const stations = [
        focus('Contact details and numbers', 'Pergunte, dite e confirme endereço, telefone, e-mail e CEP.', [
            ['pergunta', 'What’s your + contact detail?', 'What’s your email address?'], ['resposta', 'It’s... / My... is...', 'My address is 84 King Street.'], ['confirmação', 'Please repeat/confirm...', 'Please repeat the phone number.']
        ], ['Use at para @ e dot para ponto.', 'Ao ditar telefone, use grupos curtos de algarismos.'], [
            p('Number', '28', 'twenty-eight'), p('Number', '40', 'forty'), p('Number', '55', 'fifty-five'), p('Number', '82', 'eighty-two'), p('Number', '100', 'one hundred'),
            p('Complete', 'ana ___ school ___ org', 'ana at school dot org'), p('Build', 'address / your / What’s / ?', 'What’s your address?'),
            p('Answer', 'You did not understand the email.', 'Please repeat the email address.'), p('Correct', 'My phone number are 555-2098.', 'My phone number is 555-2098.'),
            p('Describe', '84 King Street · apartment 20 · email: leo@mail.com', 'The address is 84 King Street, apartment twenty. The email is leo at mail dot com.')
        ]),
        focus('Invitations and suggestions', 'Faça um convite, aceite ou recuse e confirme um plano.', [
            ['convite', 'Would you like to...?', 'Would you like to see a movie?'], ['sugestão', 'Let’s... / How about...?', 'Let’s meet at eight.'], ['resposta', 'That sounds great. / Sorry, I’m busy.', 'Sorry, I’m busy tonight.']
        ], ['Depois de Let’s, use verbo sem to.', 'Uma recusa pode incluir uma alternativa.'], [
            p('Build', 'like / Would / dinner / have / to / you / ?', 'Would you like to have dinner?'), p('Build', 'at seven / meet / Let’s', 'Let’s meet at seven.'),
            p('Build', 'tomorrow / about / How / ?', 'How about tomorrow?'), p('Complete', 'That ___ great.', 'sounds'),
            p('Answer', 'Would you like to see a movie? Accept.', 'Sure. That sounds great.'), p('Answer', 'You are busy at seven. Offer eight.', 'Sorry, I’m busy at seven. How about eight?'),
            p('Correct', 'Let’s to go to the café.', 'Let’s go to the café.'), p('Correct', 'Would you like go out?', 'Would you like to go out?'),
            p('Create', 'Invite someone to the park tomorrow.', 'Would you like to go to the park tomorrow?'), p('Create', 'Accept and confirm a time.', 'Sure. Let’s meet at ...')
        ]),
        focus('Present Simple with I and you', 'Descreva rotinas, negativas e perguntas com Do you...?', [
            ['afirmativa', 'I/You + base verb', 'I work in the morning.'], ['negativa', 'I/You don’t + base verb', 'I don’t study at night.'], ['pergunta', 'Do you + base verb?', 'Do you have breakfast?']
        ], ['Não acrescente -s com I ou you.', 'Depois de do e don’t, use verbo básico.'], [
            p('Complete', 'I ___ up at seven.', 'wake'), p('Complete', 'You ___ breakfast at home.', 'have'), p('Complete', 'I ___ work at night.', 'don’t'),
            p('Build', 'you / Do / at home / work / ?', 'Do you work at home?'), p('Answer', 'Do you study English? Positive.', 'Yes, I do.'),
            p('Answer', 'Do you work at night? Negative + detail.', 'No, I don’t. I work in the morning.'), p('Transform', 'I go to bed at eleven. → negative', 'I don’t go to bed at eleven.'),
            p('Correct', 'I works in the morning.', 'I work in the morning.'), p('Correct', 'Do you studies at night?', 'Do you study at night?'),
            p('Order', 'go home · wake up · have lunch · go to bed', 'wake up → have lunch → go home → go to bed')
        ]),
        focus('Third-person routines', 'Use he/she nas afirmativas e does/doesn’t nas perguntas e negativas.', [
            ['afirmativa', 'He/She + verb-s', 'She works at a hospital.'], ['negativa', 'He/She doesn’t + base verb', 'She doesn’t work at home.'], ['pergunta', 'Does + he/she + base verb?', 'Where does she live?']
        ], ['O verbo perde o -s depois de does e doesn’t.', 'Lembre-se de goes, studies, finishes e has.'], [
            p('Form', 'work → she', 'works'), p('Form', 'go → he', 'goes'), p('Form', 'study → she', 'studies'), p('Form', 'have → he', 'has'),
            p('Complete', 'Sarah ___ at a hospital.', 'works'), p('Transform', 'She studies at night. → negative', 'She doesn’t study at night.'),
            p('Build', 'live / Where / she / does / ?', 'Where does she live?'), p('Answer', 'Does Sarah work at home? Negative.', 'No, she doesn’t.'),
            p('Correct', 'Does he works here?', 'Does he work here?'), p('Correct', 'She don’t live near school.', 'She doesn’t live near school.'),
            p('Describe', 'Leo: live near work · start at eight · not work weekends', 'Leo lives near work. He starts at eight. He doesn’t work on weekends.')
        ])
    ];
    stations.push(
        speaking('attempt', 'Conversation: complete a contact form', 'Use dados verdadeiros ou inventados.', { label: 'Cadastro oral', scenario: 'Uma recepção precisa confirmar seus dados.', task: 'Informe nome, endereço, telefone e e-mail. Soletre uma palavra e peça repetição de um número.', condition: 'O professor repetirá um dado incorretamente; corrija-o.', steps: ['Responda um campo por vez.', 'Ouça a confirmação.', 'Corrija o dado quando necessário.'], support: ['My address is...', 'My phone number is...', 'at', 'dot', 'Please repeat.', 'That’s correct.'], evidence: 'Dados compreensíveis e confirmação adequada.' }),
        speaking('questions', 'Conversation: make a plan', 'Negocie um encontro sem usar informações de blocos anteriores.', { label: 'Convite e mudança', scenario: 'Você quer encontrar a pessoa do cadastro fora da aula.', task: 'Faça um convite, escolha lugar e horário e responda a uma mudança.', condition: 'A primeira opção de horário não está disponível.', steps: ['Faça o convite.', 'Sugira horário e lugar.', 'Ofereça uma alternativa e confirme.'], support: ['Would you like to...?', 'Let’s...', 'How about...?', 'Sorry, I’m busy.', 'See you at...'], evidence: 'Convite, negociação e fechamento claros.' }),
        speaking('final', 'Conversation: compare routines', 'Use I/you e he/she em uma conversa curta.', { label: 'Rotinas conectadas', scenario: 'Fale da sua rotina e da rotina de Sarah.', task: 'Diga três ações suas, faça duas perguntas sobre a rotina apresentada e apresente três ações de Sarah.', condition: 'Inclua uma negativa com don’t e outra com doesn’t.', steps: ['Fale sobre você.', 'Faça as perguntas.', 'Apresente Sarah e as negativas.'], support: ['I...', 'I don’t...', 'Do you...?', 'She...', 'She doesn’t...', 'Does she...?'], evidence: 'Controle adequado entre I/you e he/she.' })
    );

    R.register(10, R.review({
        title: 'Conversation Activities 2',
        objectives: ['Revisar exclusivamente as lições 6–9.', 'Praticar contato, convites e rotinas em tarefas individuais online.', 'Distinguir I/you de he/she no Present Simple.'],
        stations,
        reading: reading('Sarah’s new contact card', 'Sarah lives at 55 Park Avenue, apartment 30. Her phone number is 555-4082 and her email is sarah.green@mail.com. She works at a hospital on weekdays and studies English at night. She doesn’t work on weekends. On Saturday, she is free at eight and wants to see a movie.',
            question('What is Sarah’s address?', 'It is 55 Park Avenue, apartment 30.'), question('What is her phone number?', 'It is 555-4082.'), question('Where does she work?', 'She works at a hospital.'), question('Does she work on weekends?', 'No, she doesn’t.'), question('When is she free?', 'She is free on Saturday at eight.'), question('What does she want to do?', 'She wants to see a movie.')),
        communicativeActivities: [
            comm('listening', 'Listen: complete the registration', 'Ouça a conversa e complete mentalmente os campos de contato e rotina antes de abrir o roteiro.', {
                placement: 'before-reading',
                scenario: 'Uma recepcionista confirma o cadastro e o melhor horário de aula de Leo.',
                dialogue: dialogue('A registration call',
                    line('Reception', 'Hello. Is this Leo Martins?', 'Olá. É Leo Martins?'),
                    line('Leo', 'Yes, it is.', 'Sim.'),
                    line('Reception', 'What’s your address, Leo?', 'Qual é seu endereço, Leo?'),
                    line('Leo', 'It’s 84 King Street, apartment twenty.', 'É Rua King, 84, apartamento vinte.'),
                    line('Reception', 'And what’s your email address?', 'E qual é seu endereço de e-mail?'),
                    line('Leo', 'It’s leo dot martins at mail dot com.', 'É leo ponto martins arroba mail ponto com.'),
                    line('Reception', 'Do you work in the morning?', 'Você trabalha de manhã?'),
                    line('Leo', 'Yes, I do. I finish work at two.', 'Sim. Termino o trabalho às duas.'),
                    line('Reception', 'How about English class at four?', 'Que tal aula de inglês às quatro?'),
                    line('Leo', 'That sounds great.', 'Parece ótimo.')
                ),
                questions: [
                    question('What is Leo’s last name?', 'Martins.'),
                    question('What is his street number?', 'Eighty-four.'),
                    question('What is his apartment number?', 'Twenty.'),
                    question('What is his email address?', 'leo.martins@mail.com'),
                    question('Does Leo work in the morning?', 'Yes, he does.'),
                    question('What time does he finish work?', 'At two.'),
                    question('What time is the English class?', 'At four.')
                ]
            }),
            comm('qa-board', 'Build the questions', 'Organize as perguntas e encontre as respostas. Na segunda rodada, substitua os dados destacados.', {
                scenario: 'O cadastro, o convite e a rotina de Sarah estão misturados.',
                pairs: [
                    { scrambled: 'address / your / What’s / ?', question: 'What’s your address?', answer: 'It’s 55 Park Avenue.' },
                    { scrambled: 'phone / your / number / What’s / ?', question: 'What’s your phone number?', answer: 'It’s 555-4082.' },
                    { scrambled: 'repeat / Could / that / you / ?', question: 'Could you repeat that?', answer: 'Sure. Five-five-five, four-zero-eight-two.' },
                    { scrambled: 'movie / see / to / Would / a / you / like / ?', question: 'Would you like to see a movie?', answer: 'I’d love to.' },
                    { scrambled: 'eight / Is / okay / ?', question: 'Is eight okay?', answer: 'Sorry, I’m busy at eight.' },
                    { scrambled: 'work / you / Do / weekends / on / ?', question: 'Do you work on weekends?', answer: 'No, I don’t.' },
                    { scrambled: 'she / Where / work / does / ?', question: 'Where does she work?', answer: 'She works at a hospital.' },
                    { scrambled: 'English / study / Does / she / ?', question: 'Does she study English?', answer: 'Yes, she does.' }
                ]
            }),
            comm('interview', 'Contact, schedule and report', 'Entreviste o professor ou use um perfil inventado. Depois, mude de you para he ou she ao apresentar as informações.', {
                scenario: 'Você prepara o cartão de contato e a disponibilidade semanal de uma nova pessoa.',
                questions: ['What’s your address?', 'What’s your phone number?', 'What’s your email address?', 'Do you work in the morning?', 'What time do you finish work?', 'Do you study at night?', 'What do you do on Saturday?', 'Would you like to see a movie this weekend?'],
                reportTask: 'Apresente endereço e contato, duas ações da rotina, uma negativa e o plano combinado.',
                support: ['His/Her address is...', 'He/She works...', 'He/She doesn’t...', 'On Saturday, he/she...', 'We’re meeting at...']
            })
        ],
        homework: homework('Prepare três tarefas curtas usando somente as lições 6–9.', ['Um cartão de contato completo', 'Um convite que precisa mudar', 'Sua rotina e a rotina de outra pessoa'], ['Usei números, at e dot.', 'Incluí aceitação ou recusa com alternativa.', 'Usei do/don’t e does/doesn’t corretamente.'])
    }));
}());
