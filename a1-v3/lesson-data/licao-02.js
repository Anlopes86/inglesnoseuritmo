(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { v, x, p, t, line, dialogue, question, reading, activity, homework } = R.helpers;

    R.register(2, R.lesson({
        title: 'A Few Days Later',
        objectives: [
            'Cumprimentar alguém em diferentes momentos do dia.',
            'Perguntar e responder como uma pessoa está.',
            'Dizer uma profissão com I am/you are e a/an.',
            'Usar contrações básicas sem perder a forma completa.'
        ],
        intro: [
            line('Daniel', 'Good morning, Emma. How are you?', 'Bom dia, Emma. Como você está?'),
            line('Emma', 'I’m great, thanks. And you?', 'Estou ótima, obrigada. E você?'),
            line('Daniel', 'I’m fine. Are you a teacher?', 'Estou bem. Você é professora?'),
            line('Emma', 'No, I’m not. I’m an engineer.', 'Não. Eu sou engenheira.'),
            line('Daniel', 'Really? I’m a designer.', 'Sério? Eu sou designer.'),
            line('Emma', 'That’s interesting.', 'Que interessante.')
        ],
        vocab: [
            v('morning', 'manhã', 'Good morning!', 'Bom dia!'),
            v('afternoon', 'tarde', 'Good afternoon, Ms. Clark.', 'Boa tarde, Sra. Clark.'),
            v('evening', 'noite, ao encontrar', 'Good evening, everyone.', 'Boa noite a todos.'),
            v('fine', 'bem', 'I’m fine, thanks.', 'Estou bem, obrigado.'),
            v('great', 'ótimo(a)', 'I’m great today.', 'Estou ótimo hoje.'),
            v('tired', 'cansado(a)', 'I’m tired today.', 'Estou cansado hoje.'),
            v('job', 'profissão; trabalho', 'What is your job?', 'Qual é sua profissão?'),
            v('teacher', 'professor(a)', 'I’m a teacher.', 'Eu sou professor.'),
            v('doctor', 'médico(a)', 'She is a doctor.', 'Ela é médica.'),
            v('engineer', 'engenheiro(a)', 'I’m an engineer.', 'Eu sou engenheira.'),
            v('designer', 'designer', 'He is a designer.', 'Ele é designer.'),
            v('nurse', 'enfermeiro(a)', 'You are a nurse.', 'Você é enfermeiro.'),
            v('office worker', 'funcionário(a) de escritório', 'I’m an office worker.', 'Eu trabalho em escritório.'),
            v('student', 'estudante', 'You are a student.', 'Você é estudante.')
        ],
        grammar: {
            title: 'I am, you are e a/an',
            summary: 'Use am com I e are com you. Antes de uma profissão singular, use a ou an de acordo com o som inicial.',
            rows: [
                ['I', 'I am / I’m', 'I’m a teacher.', 'Eu sou professor.'],
                ['you', 'You are / You’re', 'You’re a student.', 'Você é estudante.'],
                ['pergunta', 'Are you + profession?', 'Are you a doctor?', 'Você é médico?'],
                ['resposta positiva', 'Yes, I am.', 'Yes, I am.', 'Sim.'],
                ['resposta negativa', 'No, I’m not.', 'No, I’m not.', 'Não.'],
                ['artigo a', 'a + consonant sound', 'a teacher; a designer', 'um professor; um designer'],
                ['artigo an', 'an + vowel sound', 'an engineer; an office worker', 'um engenheiro; um funcionário de escritório']
            ],
            notes: [
                'I am contrai para I’m; you are contrai para you’re.',
                'A escolha entre a e an depende do som, não apenas da letra.',
                'Não use a/an antes de fine, great ou tired: I’m tired.'
            ]
        },
        activitySections: [
            activity('Cumprimentos e respostas sociais', 'Escolha a expressão adequada ao horário e complete cada troca.', [
                p('Choose', '8:00 a.m. → (Good morning / Good evening)', 'Good morning'),
                p('Choose', '3:00 p.m. → (Good afternoon / Good night)', 'Good afternoon'),
                p('Choose', '7:30 p.m., meeting someone → (Good evening / Good afternoon)', 'Good evening'),
                p('Answer', 'How are you? Give a positive answer.', 'I’m fine, thanks. / I’m great, thanks.'),
                p('Answer', 'How are you? Say you are tired.', 'I’m tired today.'),
                p('Complete', 'I’m fine, thanks. ___ you?', 'And'),
                p('Correct', 'Good night! How are you? (You are meeting the person.)', 'Good evening! How are you?'),
                p('Build', 'are / How / you / ?', 'How are you?')
            ], 'Social English'),
            activity('I am ou you are?', 'Identifique o sujeito e complete com a forma correta de be.', [
                p('Complete', 'I ___ a student.', 'am'),
                p('Complete', 'You ___ a teacher.', 'are'),
                p('Complete', 'I___ an engineer.', '’m'),
                p('Complete', 'You___ a designer.', '’re'),
                p('Build', 'a nurse / I / am', 'I am a nurse.'),
                p('Build', 'an office worker / You / are', 'You are an office worker.'),
                p('Correct', 'I are a doctor.', 'I am a doctor.'),
                p('Correct', 'You am a student.', 'You are a student.')
            ]),
            activity('A, an e perguntas sobre profissão', 'Complete o artigo e produza a pergunta ou resposta indicada.', [
                p('Choose', '___ teacher (a / an)', 'a teacher'),
                p('Choose', '___ engineer (a / an)', 'an engineer'),
                p('Choose', '___ designer (a / an)', 'a designer'),
                p('Choose', '___ office worker (a / an)', 'an office worker'),
                p('Build', 'you / Are / doctor / a / ?', 'Are you a doctor?'),
                p('Answer', 'Are you a student? Positive answer.', 'Yes, I am.'),
                p('Answer', 'Are you an engineer? Negative answer + real job.', 'No, I’m not. I’m a ...'),
                p('Correct', 'I’m a engineer.', 'I’m an engineer.'),
                p('Correct', 'Are you teacher?', 'Are you a teacher?')
            ], 'More Practice')
        ],
        translations: [
            t('Bom dia. Como você está?', 'Good morning. How are you?'),
            t('Estou ótimo, obrigado. E você?', 'I’m great, thanks. And you?'),
            t('Eu sou professor.', 'I’m a teacher.'),
            t('Eu sou engenheira.', 'I’m an engineer.'),
            t('Você é estudante.', 'You’re a student.'),
            t('Você é médico?', 'Are you a doctor?'),
            t('Sim, sou.', 'Yes, I am.'),
            t('Não, não sou.', 'No, I’m not.'),
            t('Estou cansado hoje.', 'I’m tired today.'),
            t('Que interessante!', 'That’s interesting!')
        ],
        expressions: [
            x('Good morning/afternoon/evening.', 'Bom dia/boa tarde/boa noite.', 'Escolha de acordo com o momento em que encontra alguém.', 'Good afternoon, Daniel.', 'Boa tarde, Daniel.'),
            x('How are you?', 'Como você está?', 'Cumprimento social frequente.', 'Hi, Emma. How are you?', 'Oi, Emma. Como você está?'),
            x('I’m fine/great, thanks.', 'Estou bem/ótimo, obrigado.', 'Resposta curta e natural.', 'I’m fine, thanks. And you?', 'Estou bem, obrigado. E você?'),
            x('And you?', 'E você?', 'Devolve a pergunta sem repeti-la.', 'I’m great. And you?', 'Estou ótimo. E você?'),
            x('What do you do?', 'Qual é a sua profissão?', 'Aprenda como bloco para perguntar profissão.', 'What do you do? I’m a nurse.', 'Qual é sua profissão? Sou enfermeira.'),
            x('I’m a/an...', 'Eu sou...', 'Use com uma profissão singular.', 'I’m an engineer.', 'Eu sou engenheiro.'),
            x('Are you a/an...?', 'Você é...?', 'Use para confirmar uma profissão.', 'Are you a teacher?', 'Você é professor?'),
            x('Really?', 'Sério?', 'Mostra surpresa ou interesse.', 'I’m a designer. — Really?', 'Sou designer. — Sério?'),
            x('That’s interesting.', 'Que interessante.', 'Reação positiva que mantém a conversa.', 'You’re an engineer? That’s interesting.', 'Você é engenheiro? Que interessante.')
        ],
        dialogues: [
            dialogue('Morning greeting', line('A', 'Good morning. How are you?', 'Bom dia. Como você está?'), line('B', 'I’m fine, thanks. And you?', 'Estou bem, obrigado. E você?'), line('A', 'I’m great.', 'Estou ótimo.')),
            dialogue('A teacher', line('A', 'What do you do?', 'Qual é sua profissão?'), line('B', 'I’m a teacher.', 'Sou professor.'), line('A', 'That’s interesting.', 'Que interessante.')),
            dialogue('Confirming a job', line('A', 'Are you an engineer?', 'Você é engenheira?'), line('B', 'Yes, I am.', 'Sim.'), line('A', 'Really? Me too.', 'Sério? Eu também.')),
            dialogue('A correction', line('A', 'Are you a doctor?', 'Você é médico?'), line('B', 'No, I’m not. I’m a nurse.', 'Não. Sou enfermeiro.'), line('A', 'Oh, I see.', 'Ah, entendi.')),
            dialogue('After class', line('A', 'Good evening, Julia.', 'Boa noite, Julia.'), line('B', 'Good evening. Are you tired?', 'Boa noite. Você está cansado?'), line('A', 'Yes, I am.', 'Sim.'))
        ],
        reading: reading(
            'People in the evening class',
            'The evening class has four new students. Clara is a doctor. Hugo is an engineer. Beatriz is a teacher, and Paulo is an office worker. Hugo is tired, but Clara is great. They say, “Good evening,” before class.',
            question('Is Clara a doctor?', 'Yes, she is.'),
            question('What is Hugo’s job?', 'He is an engineer.'),
            question('Who is a teacher?', 'Beatriz is a teacher.'),
            question('Is Paulo an engineer?', 'No. He is an office worker.'),
            question('How is Hugo?', 'He is tired.')
        ),
        conversation: {
            questions: ['How are you today?', 'Are you tired or great?', 'What do you do?', 'Are you a student?', 'Name three professions.', 'Introduce yourself with your name and profession.', 'Imagine a new profession for yourself. What are you?', 'Ask your teacher about his or her profession.'],
            support: ['Good morning/afternoon/evening.', 'I’m fine/great/tired.', 'I’m a/an...', 'Are you a/an...?', 'Yes, I am. / No, I’m not.']
        },
        homework: homework(
            'Crie três perfis profissionais curtos e prepare uma apresentação oral.',
            ['Você em uma nova profissão', 'Três pessoas em uma turma', 'Uma conversa no primeiro dia de trabalho'],
            ['Usei a/an corretamente.', 'Incluí I’m e you’re.', 'Incluí um cumprimento, How are you? e uma reação social.']
        ),
        mission: { title: 'Meet a professional', task: 'Cumprimente uma pessoa, descubra como ela está e confirme a profissão dela.', focus: ['Cumprimento adequado', 'I am/you are', 'a/an com profissões'] }
    }));
}());
