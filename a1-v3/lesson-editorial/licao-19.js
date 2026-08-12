(function () {
    'use strict';

    window.V3LessonEditorial.register('a1-v3', 19, lesson => ({
        ...lesson,
        vocab: [
            ...lesson.vocab,
            ['nurse', 'enfermeiro(a)', 'A nurse can help patients.', 'Um enfermeiro consegue ajudar pacientes.'],
            ['mechanic', 'mecânico(a)', 'A mechanic can repair cars.', 'Um mecânico consegue consertar carros.'],
            ['office worker', 'funcionário(a) de escritório', 'An office worker can use a computer.', 'Um funcionário de escritório sabe usar computador.']
        ],
        expressions: [
            ...lesson.expressions,
            ['I can ... well.', 'Eu sei ... bem.', 'Use para destacar uma habilidade sem introduzir uma nova estrutura.', 'I can cook well.', 'Eu sei cozinhar bem.']
        ],
        activitySections: [
            {
                eyebrow: 'Jobs & Skills',
                title: 'Relacione profissões e habilidades',
                instruction: 'Escolha uma habilidade possível para cada profissão e produza uma frase com can. Há mais de uma resposta possível em alguns casos.',
                items: [
                    ['Match', 'teacher · cook · driver · receptionist', '', 'teacher—explain lessons; cook—prepare food; driver—drive; receptionist—help visitors'],
                    ['Describe', 'nurse + help patients', '', 'A nurse can help patients.'],
                    ['Describe', 'mechanic + repair cars', '', 'A mechanic can repair cars.'],
                    ['Describe', 'office worker + use a computer', '', 'An office worker can use a computer.'],
                    ['Complete', 'She ___ speak Spanish.', '', 'can'],
                    ['Complete', 'He ___ drive. (no ability)', '', 'can’t'],
                    ['Choose', 'A cook can (prepares / prepare) food.', '', 'prepare'],
                    ['Correct', 'She cans use a computer.', '', 'She can use a computer.']
                ]
            },
            {
                eyebrow: 'Ability Interview',
                title: 'Pergunte, responda e acrescente um detalhe',
                instruction: 'Responda com can ou can’t e acrescente uma habilidade relacionada quando houver uma pista.',
                items: [
                    ['Build', 'you / Can / Spanish / speak / ?', '', 'Can you speak Spanish?'],
                    ['Answer', 'Can you use a computer? Positive answer.', '', 'Yes, I can.'],
                    ['Answer', 'Can Leo drive? Negative answer.', '', 'No, he can’t.'],
                    ['Answer', 'Can Mia help visitors? Yes + Spanish.', '', 'Yes, she can. She can speak Spanish too.'],
                    ['Make a question', 'Answer: Yes, I can cook.', '', 'Can you cook?'],
                    ['Correct', 'He can to drive.', '', 'He can drive.'],
                    ['Describe', 'Your job or ideal job + two abilities.', '', 'I work as a... I can... and I can...']
                ]
            }
        ],
        conversation: {
            questions: [
                'What do you do or what is your ideal job?',
                'What can you do at work or school?',
                'Can you use a computer?',
                'Can you speak another language?',
                'Describe a person, a job and two abilities.'
            ],
            support: ['I work as a...', 'I can...', 'I can’t...', 'Yes, I can.', 'I can ... well.']
        }
    }));
}());
