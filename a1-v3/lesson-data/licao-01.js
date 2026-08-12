(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { v, x, p, t, line, dialogue, question, reading, activity, homework } = R.helpers;

    function nameMapSlide() {
        return `<section><div class="slide-heading"><p class="lesson-panel-title">Names in English</p><h2>First name, last name e nickname</h2><p>Observe como cada parte do nome aparece em uma apresentação.</p></div><div class="lesson-table-scroll"><table class="grammar-table"><thead><tr><th>Informação</th><th>Exemplo</th><th>Pergunta útil</th></tr></thead><tbody>
            <tr><td>first name</td><td>Maria</td><td>What’s your first name?</td></tr>
            <tr><td>last name</td><td>Silva</td><td>What’s your last name?</td></tr>
            <tr><td>full name</td><td>Maria Silva</td><td>What’s your full name?</td></tr>
            <tr><td>nickname</td><td>Mari</td><td>Do you have a nickname?</td></tr>
        </tbody></table></div><div class="grammar-notes"><p><strong>What’s</strong> é a contração de <strong>What is</strong>.</p><p>Nesta aula, memorize as perguntas como blocos completos para conversar.</p></div></section>`;
    }

    R.register(1, R.lesson({
        title: 'First Day of Class',
        objectives: [
            'Apresentar-se e perguntar o nome de outra pessoa.',
            'Distinguir first name, last name, full name e nickname.',
            'Usar agradecimentos, pedidos de atenção e respostas sociais básicas.',
            'Reconhecer contrações frequentes em apresentações.'
        ],
        intro: [
            line('Emma', 'Excuse me. Is this the English class?', 'Com licença. Esta é a aula de inglês?'),
            line('Daniel', 'Yes, it is. I’m Daniel. What’s your name?', 'Sim. Eu sou Daniel. Qual é o seu nome?'),
            line('Emma', 'My name is Emma Torres, but my nickname is Em.', 'Meu nome é Emma Torres, mas meu apelido é Em.'),
            line('Daniel', 'Nice to meet you, Em.', 'Prazer em conhecer você, Em.'),
            line('Emma', 'Nice to meet you too. Thanks for your help.', 'Prazer em conhecer você também. Obrigada pela ajuda.'),
            line('Daniel', 'You’re welcome.', 'De nada.')
        ],
        vocab: [
            v('name', 'nome', 'My name is Emma.', 'Meu nome é Emma.'),
            v('first name', 'primeiro nome', 'My first name is Emma.', 'Meu primeiro nome é Emma.'),
            v('last name', 'sobrenome', 'My last name is Torres.', 'Meu sobrenome é Torres.'),
            v('full name', 'nome completo', 'My full name is Emma Torres.', 'Meu nome completo é Emma Torres.'),
            v('nickname', 'apelido', 'My nickname is Em.', 'Meu apelido é Em.'),
            v('class', 'aula; turma', 'This is my English class.', 'Esta é minha aula de inglês.'),
            v('classmate', 'colega de turma', 'Daniel is my classmate.', 'Daniel é meu colega de turma.'),
            v('student', 'aluno(a)', 'I’m a new student.', 'Eu sou uma aluna nova.'),
            v('teacher', 'professor(a)', 'She is the teacher.', 'Ela é a professora.'),
            v('help', 'ajuda; ajudar', 'Thanks for your help.', 'Obrigado pela sua ajuda.'),
            v('thanks', 'obrigado(a)', 'Thanks, Daniel.', 'Obrigado, Daniel.'),
            v('welcome', 'bem-vindo(a); de nada', 'You’re welcome.', 'De nada.')
        ],
        afterVocabularySlides: [{ title: 'Partes do nome', body: nameMapSlide }],
        grammar: {
            title: 'Blocos para falar de nomes',
            summary: 'Use estas estruturas completas para apresentar nomes. A explicação detalhada do verbo be será construída gradualmente nas próximas aulas.',
            rows: [
                ['apresentação', 'My name is + name', 'My name is Emma.', 'Meu nome é Emma.'],
                ['forma curta', 'I’m + name', 'I’m Daniel.', 'Eu sou Daniel.'],
                ['pergunta direta', 'What’s your name?', 'What’s your name?', 'Qual é o seu nome?'],
                ['outra pessoa', 'What’s his/her name?', 'What’s her name?', 'Qual é o nome dela?'],
                ['resposta', 'His/Her name is + name', 'Her name is Emma.', 'O nome dela é Emma.']
            ],
            notes: [
                'I’m = I am; What’s = What is; You’re = You are.',
                'His fala de um homem ou menino; her fala de uma mulher ou menina.',
                'Aprenda What’s his name? e What’s her name? como perguntas prontas nesta etapa.'
            ]
        },
        activitySections: [
            activity('Entenda as informações de um nome', 'Identifique qual parte do nome está sendo pedida ou apresentada.', [
                p('Match', 'first name · last name · full name · nickname → Torres · Emma Torres · Emma · Em', 'first name—Emma; last name—Torres; full name—Emma Torres; nickname—Em'),
                p('Choose', 'Emma Torres: Torres is her (first name / last name).', 'last name'),
                p('Choose', 'Daniel Costa: Daniel is his (first name / nickname).', 'first name'),
                p('Answer', 'Full name: Lucas Almeida. What is his last name?', 'His last name is Almeida.'),
                p('Answer', 'Full name: Sofia Mendes. What is her first name?', 'Her first name is Sofia.'),
                p('Complete', 'My ___ name is Beatriz Souza.', 'full'),
                p('Complete', 'My name is Gabriel, but my ___ is Gabi.', 'nickname'),
                p('Describe', 'Profile: first name Noah · last name Lima · nickname No', 'His full name is Noah Lima. His nickname is No.')
            ], 'Vocabulary Practice'),
            activity('Complete as apresentações', 'Complete cada troca com o bloco social mais adequado e depois leia o diálogo inteiro.', [
                p('Complete', 'Hello. My ___ is Julia.', 'name'),
                p('Complete', 'Hi, I___ Pedro.', '’m'),
                p('Complete', 'What___ your name?', '’s'),
                p('Complete', 'Her ___ is Ana.', 'name'),
                p('Complete', 'Nice to ___ you.', 'meet'),
                p('Complete', 'Nice to meet you ___.', 'too'),
                p('Answer', 'What’s your name?', 'My name is ... / I’m ...'),
                p('Answer', 'Thanks for your help.', 'You’re welcome.'),
                p('Correct', 'I name is Marcos.', 'My name is Marcos.'),
                p('Correct', 'What your name?', 'What’s your name?')
            ]),
            activity('Reconstrua conversas do primeiro dia', 'Organize as falas e produza respostas naturais para cada situação.', [
                p('Build', 'name / your / What’s / ?', 'What’s your name?'),
                p('Build', 'name / My / Alice / is', 'My name is Alice.'),
                p('Build', 'meet / Nice / you / to', 'Nice to meet you.'),
                p('Build', 'name / his / What’s / ?', 'What’s his name?'),
                p('Build', 'name / Her / Camila / is', 'Her name is Camila.'),
                p('Answer', 'You need someone’s attention before asking a question.', 'Excuse me.'),
                p('Answer', 'A new classmate says: “Nice to meet you.”', 'Nice to meet you too.'),
                p('Answer', 'A classmate helps you find the room.', 'Thank you. / Thanks for your help.')
            ], 'More Practice')
        ],
        translations: [
            t('Com licença. Qual é o seu nome?', 'Excuse me. What’s your name?'),
            t('Meu nome é Helena Costa.', 'My name is Helena Costa.'),
            t('Meu primeiro nome é Helena.', 'My first name is Helena.'),
            t('Meu sobrenome é Costa.', 'My last name is Costa.'),
            t('Meu apelido é Lena.', 'My nickname is Lena.'),
            t('Qual é o nome dele?', 'What’s his name?'),
            t('O nome dela é Amanda.', 'Her name is Amanda.'),
            t('Prazer em conhecer você.', 'Nice to meet you.'),
            t('Obrigado pela ajuda.', 'Thanks for your help.'),
            t('De nada.', 'You’re welcome.')
        ],
        expressions: [
            x('Hello! / Hi!', 'Olá! / Oi!', 'Duas formas comuns de iniciar uma conversa.', 'Hi! I’m Daniel.', 'Oi! Eu sou Daniel.'),
            x('What’s your name?', 'Qual é o seu nome?', 'Pergunta direta e neutra.', 'Hello. What’s your name?', 'Olá. Qual é o seu nome?'),
            x('My name is... / I’m...', 'Meu nome é... / Eu sou...', 'Duas formas naturais de se apresentar.', 'My name is Emma. I’m a new student.', 'Meu nome é Emma. Eu sou uma aluna nova.'),
            x('What’s his/her name?', 'Qual é o nome dele/dela?', 'Use para perguntar sobre outra pessoa.', 'What’s her name? Her name is Sofia.', 'Qual é o nome dela? O nome dela é Sofia.'),
            x('Nice to meet you.', 'Prazer em conhecer você.', 'Resposta comum em uma primeira apresentação.', 'Nice to meet you, Daniel.', 'Prazer em conhecer você, Daniel.'),
            x('Nice to meet you too.', 'Prazer em conhecer você também.', 'Resposta à expressão anterior.', 'Nice to meet you too, Emma.', 'Prazer em conhecer você também, Emma.'),
            x('Thank you. / Thanks.', 'Obrigado(a).', 'Thank you é um pouco mais completo; thanks é mais informal.', 'Thanks for your help.', 'Obrigado pela ajuda.'),
            x('You’re welcome.', 'De nada.', 'Resposta frequente a um agradecimento.', 'Thank you. — You’re welcome.', 'Obrigado. — De nada.'),
            x('Excuse me.', 'Com licença.', 'Use antes de chamar alguém ou fazer uma pergunta.', 'Excuse me. Is this the English class?', 'Com licença. Esta é a aula de inglês?')
        ],
        dialogues: [
            dialogue('A new classmate', line('A', 'Hi! I’m Laura. What’s your name?', 'Oi! Eu sou Laura. Qual é o seu nome?'), line('B', 'My name is Bruno. Nice to meet you.', 'Meu nome é Bruno. Prazer em conhecer você.'), line('A', 'Nice to meet you too.', 'Prazer em conhecer você também.')),
            dialogue('A full name', line('A', 'What’s your full name?', 'Qual é o seu nome completo?'), line('B', 'My full name is Rafael Gomes.', 'Meu nome completo é Rafael Gomes.'), line('A', 'And your nickname?', 'E seu apelido?'), line('B', 'It’s Rafa.', 'É Rafa.')),
            dialogue('Another student', line('A', 'What’s her name?', 'Qual é o nome dela?'), line('B', 'Her name is Nina.', 'O nome dela é Nina.'), line('A', 'Is she a new student?', 'Ela é uma aluna nova?'), line('B', 'Yes, she is.', 'Sim.')),
            dialogue('Getting attention', line('A', 'Excuse me. Is this seat free?', 'Com licença. Este lugar está livre?'), line('B', 'Yes, it is.', 'Sim.'), line('A', 'Thank you.', 'Obrigado.'), line('B', 'You’re welcome.', 'De nada.')),
            dialogue('The teacher', line('A', 'What’s his name?', 'Qual é o nome dele?'), line('B', 'His name is Mr. Lee.', 'O nome dele é Sr. Lee.'), line('A', 'Thanks.', 'Obrigado.'), line('B', 'No problem.', 'Sem problema.'))
        ],
        reading: reading(
            'Three new students',
            'It is the first day of class. Emma Torres is a new student. Her nickname is Em. Daniel Costa is her classmate. His nickname is Dani. Their teacher is Mr. Lee. Emma says, “Nice to meet you,” and Daniel says, “Nice to meet you too.”',
            question('What is Emma’s last name?', 'Her last name is Torres.'),
            question('What is Emma’s nickname?', 'Her nickname is Em.'),
            question('What is Daniel’s last name?', 'His last name is Costa.'),
            question('What is the teacher’s name?', 'His name is Mr. Lee.'),
            question('Is this their first day?', 'Yes, it is.')
        ),
        conversation: {
            questions: [
                'What’s your name?',
                'What’s your first name?',
                'What’s your last name?',
                'What’s your full name?',
                'Do you have a nickname?',
                'Introduce yourself in three sentences.',
                'Imagine a classmate named Alex. What’s his or her full name?',
                'Thank your teacher for something and answer the teacher’s response.'
            ],
            support: ['My name is...', 'I’m...', 'My first/last name is...', 'My nickname is...', 'Nice to meet you.', 'Thanks for...']
        },
        music: { song: 'Hello, Goodbye', artist: 'The Beatles', spotifyId: '0vZ97gHhemKm6c64hTfJNA' },
        homework: homework(
            'Prepare uma apresentação curta usando palavras-chave. Inclua uma segunda pessoa real ou imaginária.',
            ['Seu nome completo e apelido', 'Uma apresentação em uma nova turma', 'Você e um colega fictício'],
            ['Usei What’s your name? e uma pergunta com his ou her.', 'Incluí Nice to meet you e um agradecimento.', 'Consigo apresentar sem ler um parágrafo completo.']
        ),
        mission: {
            title: 'First meeting',
            task: 'Apresente-se, descubra o nome completo e o apelido de uma pessoa imaginária e encerre a conversa com educação.',
            focus: ['Apresentação clara', 'Perguntas sobre nomes', 'Resposta social adequada']
        }
    }));
}());
