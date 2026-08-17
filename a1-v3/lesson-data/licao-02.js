(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { v, x, p, t, line, dialogue, question, reading, activity, homework } = R.helpers;

    R.register(2, R.lesson({
        title: 'A Few Days Later',
        objectives: [
            'Usar I am/I’m e you are/you’re em apresentações simples.',
            'Aprender os verbos be e work como os primeiros verbos do curso.',
            'Relacionar profissões aos locais de trabalho mais comuns.',
            'Usar What do you do? e Where do you work? como perguntas prontas.',
            'Dizer I’m early e I’m late em situações reais.'
        ],
        intro: [
            line('Emma', 'Good morning. Are you a new student?', 'Bom dia. Você é um aluno novo?'),
            line('Daniel', 'Yes, I am. I’m Daniel.', 'Sim. Eu sou Daniel.'),
            line('Emma', 'Nice to meet you. What do you do?', 'Prazer em conhecer você. Qual é a sua profissão?'),
            line('Daniel', 'I’m a nurse.', 'Eu sou enfermeiro.'),
            line('Emma', 'Where do you work?', 'Onde você trabalha?'),
            line('Daniel', 'I work in a hospital. What about you?', 'Eu trabalho em um hospital. E você?'),
            line('Emma', 'I’m a teacher. I work at a school.', 'Eu sou professora. Eu trabalho em uma escola.'),
            line('Daniel', 'Are you late for class?', 'Você está atrasada para a aula?'),
            line('Emma', 'No, I’m early today.', 'Não, hoje eu estou adiantada.')
        ],
        vocab: [
            v('work', 'trabalhar', 'I work in a hospital.', 'Eu trabalho em um hospital.'),
            v('school', 'escola', 'I work at a school.', 'Eu trabalho em uma escola.'),
            v('teacher', 'professor(a)', 'I’m a teacher.', 'Eu sou professora.'),
            v('restaurant', 'restaurante', 'You work at a restaurant.', 'Você trabalha em um restaurante.'),
            v('waiter', 'garçom', 'I’m a waiter.', 'Eu sou garçom.'),
            v('waitress', 'garçonete', 'I’m a waitress.', 'Eu sou garçonete.'),
            v('office', 'escritório', 'You work in an office.', 'Você trabalha em um escritório.'),
            v('secretary', 'secretário(a)', 'You work as a secretary.', 'Você trabalha como secretário.'),
            v('hospital', 'hospital', 'I work in a hospital.', 'Eu trabalho em um hospital.'),
            v('doctor', 'médico(a)', 'I’m a doctor.', 'Eu sou médica.'),
            v('nurse', 'enfermeiro(a)', 'You’re a nurse.', 'Você é enfermeiro.'),
            v('hotel', 'hotel', 'I work at a hotel.', 'Eu trabalho em um hotel.'),
            v('receptionist', 'recepcionista', 'I work as a receptionist.', 'Eu trabalho como recepcionista.'),
            v('store', 'loja', 'You work at a store.', 'Você trabalha em uma loja.'),
            v('salesperson', 'vendedor(a)', 'You’re a salesperson.', 'Você é vendedor.'),
            v('company', 'empresa', 'I work for a company.', 'Eu trabalho para uma empresa.'),
            v('early', 'adiantado(a); cedo', 'I’m early today.', 'Hoje eu estou adiantado.'),
            v('late', 'atrasado(a)', 'You’re late for class.', 'Você está atrasado para a aula.')
        ],
        grammar: {
            title: 'I am, you are e work',
            summary: 'Use am com I e are com you. Para falar de trabalho, aprenda I/You work com in, at ou as dentro de blocos prontos.',
            rows: [
                ['I', 'I am / I’m + information', 'I’m a teacher.', 'Eu sou professor.'],
                ['you', 'You are / You’re + information', 'You’re a nurse.', 'Você é enfermeiro.'],
                ['pergunta com be', 'Are you + information?', 'Are you a doctor?', 'Você é médico?'],
                ['local', 'I/You work in + place', 'I work in a hospital.', 'Eu trabalho em um hospital.'],
                ['local específico', 'I/You work at + workplace', 'You work at a school.', 'Você trabalha em uma escola.'],
                ['função profissional', 'I/You work as + a/an + job', 'You work as a nurse.', 'Você trabalha como enfermeiro.'],
                ['situação', 'I’m early. / I’m late.', 'I’m late for work.', 'Estou atrasado para o trabalho.']
            ],
            notes: [
                'I am contrai para I’m; you are contrai para you’re.',
                'Use a/an antes de profissão singular: a teacher, a nurse, an engineer.',
                'Aprenda What do you do? e Where do you work? como perguntas completas; o Present Simple será explicado na Lição 7.'
            ]
        },
        activitySections: [
            activity('Profissão e local de trabalho', 'Relacione cada profissão ao local mais provável e leia o par completo.', [
                p('Match', 'teacher → school / hospital', 'teacher → school'),
                p('Match', 'waiter or waitress → restaurant / office', 'waiter or waitress → restaurant'),
                p('Match', 'secretary → office / school', 'secretary → office'),
                p('Match', 'doctor or nurse → hospital / store', 'doctor or nurse → hospital'),
                p('Match', 'receptionist → hotel / restaurant', 'receptionist → hotel'),
                p('Match', 'salesperson → store / hospital', 'salesperson → store'),
                p('Classify', 'school · teacher · restaurant · waiter · office · secretary', 'places: school, restaurant, office; jobs: teacher, waiter, secretary'),
                p('Choose', 'You are ahead of time: (early / late)', 'early')
            ], 'Vocabulary Practice'),
            activity('I’m ou you’re?', 'Complete com a forma apresentada na aula.', [
                p('Complete', 'I ___ a teacher.', 'am'),
                p('Complete', 'You ___ a nurse.', 'are'),
                p('Complete', 'I___ early today.', '’m'),
                p('Complete', 'You___ late for class.', '’re'),
                p('Build', 'a receptionist / I / am', 'I am a receptionist.'),
                p('Build', 'a salesperson / You / are', 'You are a salesperson.'),
                p('Choose', '___ you a doctor? (Am / Are)', 'Are'),
                p('Correct', 'I are a teacher.', 'I am a teacher.')
            ], 'Be Practice'),
            activity('Blocos com work', 'Complete ou organize os modelos sem analisar do/does nesta etapa.', [
                p('Complete', 'I work ___ a hospital.', 'in'),
                p('Complete', 'You work ___ a school.', 'at'),
                p('Complete', 'I work ___ a receptionist.', 'as'),
                p('Build', 'work / I / an office / in', 'I work in an office.'),
                p('Build', 'as / You / a nurse / work', 'You work as a nurse.'),
                p('Answer', 'What do you do? Use: teacher', 'I’m a teacher.'),
                p('Answer', 'Where do you work? Use: hospital', 'I work in a hospital.'),
                p('Correct', 'I work as teacher.', 'I work as a teacher.')
            ], 'Work Chunks')
        ],
        translations: [
            t('Eu sou professor.', 'I’m a teacher.'),
            t('Você é enfermeira.', 'You’re a nurse.'),
            t('Você é médico?', 'Are you a doctor?'),
            t('Sim, sou.', 'Yes, I am.'),
            t('Qual é a sua profissão?', 'What do you do?'),
            t('Onde você trabalha?', 'Where do you work?'),
            t('Eu trabalho em um hospital.', 'I work in a hospital.'),
            t('Você trabalha em uma escola.', 'You work at a school.'),
            t('Eu trabalho como recepcionista.', 'I work as a receptionist.'),
            t('Você trabalha como enfermeiro.', 'You work as a nurse.'),
            t('Estou atrasado para o trabalho.', 'I’m late for work.'),
            t('Hoje estou adiantado.', 'I’m early today.')
        ],
        expressions: [
            x('What do you do?', 'Qual é a sua profissão?', 'Aprenda esta pergunta como um bloco pronto nesta etapa.', 'What do you do? — I’m a nurse.', 'Qual é a sua profissão? — Sou enfermeira.'),
            x('Where do you work?', 'Onde você trabalha?', 'Aprenda a pergunta inteira; do será explicado com o Present Simple na Lição 7.', 'Where do you work? — I work in a hospital.', 'Onde você trabalha? — Trabalho em um hospital.'),
            x('I’m a/an...', 'Eu sou...', 'Use a antes de som consonantal e an antes de som vocálico.', 'I’m an engineer.', 'Eu sou engenheiro.'),
            x('I work in...', 'Eu trabalho em...', 'Use in para falar do interior ou do tipo de lugar.', 'I work in an office.', 'Eu trabalho em um escritório.'),
            x('I work at...', 'Eu trabalho em...', 'Use at para apresentar o local de trabalho como um ponto específico.', 'I work at a school.', 'Eu trabalho em uma escola.'),
            x('I work as...', 'Eu trabalho como...', 'Use as antes da função; mantenha a/an: work as a nurse.', 'I work as a receptionist.', 'Eu trabalho como recepcionista.'),
            x('You work in/at...', 'Você trabalha em...', 'Use o mesmo verbo work com you.', 'You work at a restaurant.', 'Você trabalha em um restaurante.'),
            x('You work as...', 'Você trabalha como...', 'Use para falar diretamente da função da outra pessoa.', 'You work as a secretary.', 'Você trabalha como secretário.'),
            x('I’m early.', 'Estou adiantado(a).', 'Use quando chega antes do horário.', 'I’m early for class.', 'Estou adiantado para a aula.'),
            x('I’m late.', 'Estou atrasado(a).', 'Use late for + compromisso.', 'I’m late for work.', 'Estou atrasado para o trabalho.'),
            x('What about you?', 'E você?', 'Devolve a pergunta sem repeti-la.', 'I’m a teacher. What about you?', 'Sou professora. E você?')
        ],
        dialogues: [
            dialogue('At school', line('A', 'What do you do?', 'Qual é a sua profissão?'), line('B', 'I’m a teacher.', 'Sou professor.'), line('A', 'Where do you work?', 'Onde você trabalha?'), line('B', 'I work at a school.', 'Trabalho em uma escola.')),
            dialogue('At a restaurant', line('A', 'Are you a waiter?', 'Você é garçom?'), line('B', 'Yes, I am. I work at a restaurant.', 'Sim. Trabalho em um restaurante.')),
            dialogue('At a hospital', line('A', 'What do you do?', 'Qual é a sua profissão?'), line('B', 'I’m a nurse. I work in a hospital.', 'Sou enfermeira. Trabalho em um hospital.')),
            dialogue('At an office', line('A', 'Where do you work?', 'Onde você trabalha?'), line('B', 'I work in an office.', 'Trabalho em um escritório.'), line('A', 'You work as a secretary, right?', 'Você trabalha como secretário, certo?'), line('B', 'Yes.', 'Sim.')),
            dialogue('Early or late', line('A', 'Are you late for class?', 'Você está atrasado para a aula?'), line('B', 'No, I’m early today.', 'Não, estou adiantado hoje.'))
        ],
        reading: reading(
            'Two jobs, two places',
            '“I’m Laura. I’m a teacher. I work at a school.” “I’m Ben. I’m a nurse. I work in a hospital.” Laura asks, “Are you late for work?” Ben says, “No, I’m early today.”',
            question('Complete Laura’s model: I’m a ___.', 'teacher'),
            question('Complete Laura’s model: I work ___ a school.', 'at'),
            question('Complete Ben’s model: I’m a ___.', 'nurse'),
            question('Complete Ben’s model: I work ___ a hospital.', 'in'),
            question('Complete Ben’s model: I’m ___ today.', 'early'),
            question('Laura asks: Are you ___ for work?', 'late')
        ),
        conversation: { questions: [], support: ['I’m a/an...', 'You’re a/an...', 'What do you do?', 'Where do you work?', 'I work in/at...', 'I’m early/late.'] },
        homework: homework('Revise os modelos de profissão e trabalho.', ['I’m/You’re', 'work in/at', 'work as'], ['Repito as frases prontas.', 'Reconheço profissão e lugar.', 'Ainda não preciso formar perguntas novas.'])
    }));
}());
