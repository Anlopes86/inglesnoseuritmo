(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { v, x, p, t, line, dialogue, question, reading, activity, homework } = R.helpers;

    const nameMapSlide = () => `<section><div class="slide-heading"><p class="lesson-panel-title">Names in English</p><h2>As partes de um nome</h2><p>Leia as perguntas como blocos completos. A análise dos verbos começa somente nas próximas lições.</p></div><div class="lesson-table-scroll"><table class="grammar-table"><thead><tr><th>Informação</th><th>Exemplo</th><th>Pergunta pronta</th></tr></thead><tbody>
        <tr><td>first name</td><td>Ana</td><td>What’s your first name?</td></tr>
        <tr><td>last name</td><td>Souza</td><td>What’s your last name?</td></tr>
        <tr><td>full name</td><td>Ana Souza</td><td>What’s your full name?</td></tr>
        <tr><td>nickname</td><td>Aninha</td><td>What’s your nickname?</td></tr>
    </tbody></table></div><div class="grammar-notes"><p><strong>Nesta aula:</strong> reconheça, repita e use as expressões inteiras.</p><p>Você ainda não precisa separar sujeito e verbo.</p></div></section>`;

    R.register(1, R.lesson({
        title: 'First Day of Class',
        objectives: [
            'Cumprimentar alguém em diferentes momentos do dia.',
            'Dizer o próprio nome e perguntar nome, sobrenome e apelido.',
            'Reconhecer his name e her name como blocos prontos.',
            'Usar please, excuse me, thank you e respostas sociais básicas.'
        ],
        intro: [
            line('Teacher', 'Good morning! Hello, I’m Ms. Green.', 'Bom dia! Olá, eu sou a professora Green.'),
            line('Ana', 'Good morning. Excuse me, is this the English class?', 'Bom dia. Com licença, esta é a aula de inglês?'),
            line('Teacher', 'Yes. What’s your name?', 'Sim. Qual é o seu nome?'),
            line('Ana', 'I’m Ana Souza.', 'Eu sou Ana Souza.'),
            line('Teacher', 'What’s your last name?', 'Qual é o seu sobrenome?'),
            line('Ana', 'Souza. My nickname is Aninha.', 'Souza. Meu apelido é Aninha.'),
            line('Teacher', 'Nice to meet you, Ana.', 'Prazer em conhecer você, Ana.'),
            line('Ana', 'Nice to meet you too. Thank you.', 'Prazer em conhecer você também. Obrigada.'),
            line('Teacher', 'You’re welcome.', 'De nada.')
        ],
        vocabularyMeta: {
            slideTitle: 'Expressões essenciais',
            eyebrow: 'Vocabulary Expansion · Ready-Made Expressions',
            title: 'Primeiras expressões em inglês',
            instruction: 'Leia e repita cada expressão completa. Nesta primeira lição, não há lista de verbos nem análise gramatical.'
        },
        vocab: [
            v('Hello! / Hi!', 'Olá! / Oi!', 'Hello! I’m Ana.', 'Olá! Eu sou Ana.'),
            v('Good morning!', 'Bom dia!', 'Good morning, Ms. Green.', 'Bom dia, professora Green.'),
            v('Good afternoon!', 'Boa tarde!', 'Good afternoon, everyone.', 'Boa tarde a todos.'),
            v('Good evening!', 'Boa noite!', 'Good evening, Daniel.', 'Boa noite, Daniel.'),
            v('Excuse me.', 'Com licença.', 'Excuse me. What’s your name?', 'Com licença. Qual é o seu nome?'),
            v('Please.', 'Por favor.', 'Your name, please.', 'Seu nome, por favor.'),
            v('Thank you. / Thanks.', 'Obrigado(a).', 'Thank you for your help.', 'Obrigado pela ajuda.'),
            v('You’re welcome.', 'De nada.', 'Thank you. — You’re welcome.', 'Obrigado. — De nada.'),
            v('Nice to meet you.', 'Prazer em conhecer você.', 'Nice to meet you, Ana.', 'Prazer em conhecer você, Ana.'),
            v('name', 'nome', 'What’s your name?', 'Qual é o seu nome?'),
            v('first name', 'primeiro nome', 'My first name is Ana.', 'Meu primeiro nome é Ana.'),
            v('last name', 'sobrenome', 'My last name is Souza.', 'Meu sobrenome é Souza.'),
            v('full name', 'nome completo', 'My full name is Ana Souza.', 'Meu nome completo é Ana Souza.'),
            v('nickname', 'apelido', 'My nickname is Aninha.', 'Meu apelido é Aninha.'),
            v('his name', 'o nome dele', 'His name is Leo.', 'O nome dele é Leo.'),
            v('her name', 'o nome dela', 'Her name is Julia.', 'O nome dela é Julia.')
        ],
        afterVocabularySlides: [{ title: 'Partes do nome', body: nameMapSlide }],
        grammar: {
            slideTitle: 'Expressões',
            eyebrow: 'Expressions in Context',
            title: 'Blocos prontos para o primeiro contato',
            summary: 'Memorize as expressões completas e associe cada uma à situação. Os verbos serão apresentados gradualmente a partir da Lição 2.',
            rows: [
                ['cumprimento', 'Hello! / Hi!', 'Hello! I’m Ana.', 'Olá! Eu sou Ana.'],
                ['apresentação', 'I’m + name', 'I’m Carlos.', 'Eu sou Carlos.'],
                ['seu nome', 'What’s your name?', 'What’s your name?', 'Qual é o seu nome?'],
                ['outra pessoa', 'What’s his/her name?', 'What’s her name?', 'Qual é o nome dela?'],
                ['resposta social', 'Nice to meet you.', 'Nice to meet you too.', 'Prazer em conhecer você também.'],
                ['educação', 'Excuse me. / Please. / Thank you.', 'Your last name, please.', 'Seu sobrenome, por favor.']
            ],
            notes: [
                'Aprenda I’m..., What’s your name? e What’s his/her name? como expressões inteiras.',
                'Use Good morning, Good afternoon e Good evening de acordo com o horário.',
                'Excuse me inicia o contato; please acompanha um pedido; thank you agradece.'
            ]
        },
        activitySections: [
            activity('Reconheça a expressão adequada', 'Escolha ou relacione a expressão pronta à situação apresentada.', [
                p('Choose', '8:00 a.m. → (Good morning / Good evening)', 'Good morning'),
                p('Choose', '3:00 p.m. → (Good afternoon / Good morning)', 'Good afternoon'),
                p('Choose', '7:00 p.m., meeting someone → (Good evening / Good afternoon)', 'Good evening'),
                p('Match', 'Excuse me · Please · Thank you → chamar atenção · pedido · agradecimento', 'Excuse me = chamar atenção; Please = pedido; Thank you = agradecimento'),
                p('Complete', 'Nice to ___ you.', 'meet'),
                p('Complete', 'You’re ___.', 'welcome'),
                p('Choose', 'First contact: (Hello / Goodbye)', 'Hello'),
                p('Answer', 'Nice to meet you.', 'Nice to meet you too.')
            ], 'Recognition Practice'),
            activity('Nome, sobrenome e apelido', 'Complete apenas com as palavras apresentadas no quadro.', [
                p('Complete', 'What’s your ___ name?', 'first'),
                p('Complete', 'What’s your ___ name?', 'last'),
                p('Complete', 'What’s your full ___?', 'name'),
                p('Complete', 'What’s your ___?', 'nickname'),
                p('Choose', 'Leo → (His / Her) name is Leo.', 'His'),
                p('Choose', 'Julia → (His / Her) name is Julia.', 'Her'),
                p('Build', 'your / What’s / name / ?', 'What’s your name?'),
                p('Build', 'name / her / What’s / ?', 'What’s her name?')
            ], 'Name Practice')
        ],
        translations: [
            t('Olá! Eu sou Ana.', 'Hello! I’m Ana.'),
            t('Bom dia!', 'Good morning!'),
            t('Boa tarde!', 'Good afternoon!'),
            t('Boa noite!', 'Good evening!'),
            t('Com licença. Qual é o seu nome?', 'Excuse me. What’s your name?'),
            t('Qual é o seu sobrenome?', 'What’s your last name?'),
            t('Qual é o seu apelido?', 'What’s your nickname?'),
            t('Qual é o nome dele?', 'What’s his name?'),
            t('O nome dela é Julia.', 'Her name is Julia.'),
            t('Prazer em conhecer você.', 'Nice to meet you.'),
            t('Por favor.', 'Please.'),
            t('Obrigado. — De nada.', 'Thank you. — You’re welcome.')
        ],
        expressions: [
            x('Hello! / Hi!', 'Olá! / Oi!', 'Use para iniciar uma conversa.', 'Hi! I’m Bruno.', 'Oi! Eu sou Bruno.'),
            x('Good morning/afternoon/evening.', 'Bom dia/boa tarde/boa noite.', 'Escolha a expressão de acordo com o horário.', 'Good afternoon, Julia.', 'Boa tarde, Julia.'),
            x('I’m...', 'Eu sou...', 'Use como bloco pronto antes do seu nome.', 'I’m Mariana.', 'Eu sou Mariana.'),
            x('What’s your name?', 'Qual é o seu nome?', 'Pergunta principal de apresentação.', 'Hello. What’s your name?', 'Olá. Qual é o seu nome?'),
            x('What’s your last name?', 'Qual é o seu sobrenome?', 'Pergunta específica sobre o sobrenome.', 'What’s your last name? — Costa.', 'Qual é o seu sobrenome? — Costa.'),
            x('What’s your nickname?', 'Qual é o seu apelido?', 'Pergunta específica sobre o apelido.', 'What’s your nickname? — Bia.', 'Qual é o seu apelido? — Bia.'),
            x('What’s his/her name?', 'Qual é o nome dele/dela?', 'Memorize como bloco; his indica “dele” e her indica “dela”.', 'What’s his name? His name is Leo.', 'Qual é o nome dele? O nome dele é Leo.'),
            x('Nice to meet you.', 'Prazer em conhecer você.', 'Expressão usada após a apresentação.', 'Nice to meet you, Carlos.', 'Prazer em conhecer você, Carlos.'),
            x('Excuse me.', 'Com licença.', 'Use antes de chamar alguém ou fazer uma pergunta.', 'Excuse me. Is this the English class?', 'Com licença. Esta é a aula de inglês?'),
            x('Please.', 'Por favor.', 'Use para tornar um pedido mais educado.', 'Your full name, please.', 'Seu nome completo, por favor.'),
            x('Thank you. / Thanks.', 'Obrigado(a).', 'Thank you é mais completo; thanks é mais informal.', 'Thank you for your help.', 'Obrigado pela ajuda.'),
            x('You’re welcome.', 'De nada.', 'Resposta frequente a thank you.', 'Thank you. — You’re welcome.', 'Obrigado. — De nada.')
        ],
        dialogues: [
            dialogue('Morning greeting', line('A', 'Good morning!', 'Bom dia!'), line('B', 'Good morning! I’m Laura.', 'Bom dia! Eu sou Laura.')),
            dialogue('Afternoon greeting', line('A', 'Good afternoon. What’s your name?', 'Boa tarde. Qual é o seu nome?'), line('B', 'I’m Pedro.', 'Eu sou Pedro.')),
            dialogue('Last name', line('A', 'What’s your last name?', 'Qual é o seu sobrenome?'), line('B', 'My last name is Lima.', 'Meu sobrenome é Lima.')),
            dialogue('Another student', line('A', 'What’s her name?', 'Qual é o nome dela?'), line('B', 'Her name is Sofia.', 'O nome dela é Sofia.')),
            dialogue('Polite exchange', line('A', 'Your full name, please.', 'Seu nome completo, por favor.'), line('B', 'Ana Souza.', 'Ana Souza.'), line('A', 'Thank you.', 'Obrigado.'), line('B', 'You’re welcome.', 'De nada.'))
        ],
        reading: reading(
            'A first hello',
            'Teacher: “Good morning! What’s your name?” Ana: “Hello! I’m Ana Souza.” Teacher: “Your first name, please.” Ana: “Ana.” Teacher: “Your last name, please.” Ana: “Souza.” Teacher: “Your nickname?” Ana: “Aninha.” Teacher: “Nice to meet you, Ana.” Ana: “Nice to meet you too. Thank you.”',
            question('Complete the greeting: Good ___.', 'morning'),
            question('Complete: I’m ___ Souza.', 'Ana'),
            question('Complete the first name: ___.', 'Ana'),
            question('Complete the last name: ___.', 'Souza'),
            question('Complete the nickname: ___.', 'Aninha'),
            question('Complete: Nice to ___ you.', 'meet'),
            question('Complete Ana’s final expression: Thank ___.', 'you')
        ),
        conversation: { questions: [], support: ['Hello!', 'Good morning!', 'I’m...', 'What’s your name?', 'Nice to meet you.', 'Thank you.'] },
        homework: homework('Revise as expressões prontas da aula.', ['Cumprimentos', 'Partes do nome', 'Expressões de educação'], ['Reconheço as expressões.', 'Repito os modelos completos.', 'Não preciso criar frases novas.'])
    }));
}());
