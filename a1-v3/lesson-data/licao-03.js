(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { v, x, p, t, line, dialogue, question, reading, activity, homework } = R.helpers;

    R.register(3, R.lesson({
        title: 'At Break',
        objectives: [
            'Usar we are/we’re para falar de um grupo que inclui quem fala.',
            'Usar they are/they’re para falar de outras pessoas.',
            'Formar negativas com aren’t e perguntas com Are we/they...?',
            'Descrever pessoas no intervalo com hungry, thirsty, early, late e ready.'
        ],
        intro: [
            line('Maya', 'We are early for break today.', 'Hoje nós estamos adiantados para o intervalo.'),
            line('Peter', 'Yes, we are. Are you hungry?', 'Sim. Você está com fome?'),
            line('Maya', 'Yes, I am. What about Julia and Leo?', 'Sim. E Julia e Leo?'),
            line('Peter', 'They are at the snack bar.', 'Eles estão na lanchonete.'),
            line('Maya', 'Are they hungry too?', 'Eles também estão com fome?'),
            line('Peter', 'Yes, they are. They are ready for lunch.', 'Sim. Eles estão prontos para o almoço.'),
            line('Maya', 'Great. We are ready too.', 'Ótimo. Nós também estamos prontos.')
        ],
        vocabularyMeta: {
            slideTitle: 'Palavras do intervalo',
            eyebrow: 'Vocabulary Expansion · Break Time',
            title: 'Pessoas, lugares e estados no intervalo',
            instruction: 'Vire os cards para conferir o sentido. O único verbo trabalhado nesta aula é be, agora com we e they.'
        },
        vocab: [
            v('break', 'intervalo', 'We are at break.', 'Nós estamos no intervalo.'),
            v('snack bar', 'lanchonete', 'They are at the snack bar.', 'Eles estão na lanchonete.'),
            v('cafeteria', 'refeitório; cafeteria', 'We are in the cafeteria.', 'Nós estamos no refeitório.'),
            v('classmates', 'colegas de turma', 'They are our classmates.', 'Eles são nossos colegas de turma.'),
            v('group', 'grupo', 'We are a group.', 'Nós somos um grupo.'),
            v('lunch', 'almoço', 'We are ready for lunch.', 'Nós estamos prontos para o almoço.'),
            v('sandwiches', 'sanduíches', 'Sandwiches for us, please.', 'Sanduíches para nós, por favor.'),
            v('drinks', 'bebidas', 'Drinks for them, please.', 'Bebidas para eles, por favor.'),
            v('coffee', 'café', 'Coffee for us, please.', 'Café para nós, por favor.'),
            v('juice', 'suco', 'Juice for them, please.', 'Suco para eles, por favor.'),
            v('hungry', 'com fome', 'We are hungry.', 'Nós estamos com fome.'),
            v('thirsty', 'com sede', 'They are thirsty.', 'Eles estão com sede.'),
            v('early', 'adiantados; cedo', 'We are early.', 'Nós estamos adiantados.'),
            v('late', 'atrasados', 'They are late.', 'Eles estão atrasados.'),
            v('ready', 'prontos', 'We are ready.', 'Nós estamos prontos.'),
            v('together', 'juntos', 'We are together.', 'Nós estamos juntos.')
        ],
        grammar: {
            title: 'We are e they are',
            summary: 'Use are com we e they. We inclui quem fala; they indica outras pessoas. Na negativa, use aren’t. Na pergunta, coloque are antes do sujeito.',
            spotlight: {
                formula: [
                    { text: 'WE / THEY', tone: 'blue' },
                    { text: 'ARE', tone: 'green' },
                    { text: 'INFORMATION', tone: 'blue' }
                ],
                panels: [
                    { label: 'Forma afirmativa', tone: 'green', pattern: 'WE / THEY + ARE', examples: ['We are hungry.', 'They are at the snack bar.'] },
                    { label: 'Forma negativa', tone: 'red', pattern: 'WE / THEY + AREN’T', examples: ['We aren’t late.', 'They aren’t thirsty.'] },
                    { label: 'Forma interrogativa', tone: 'yellow', pattern: 'ARE + WE / THEY ...?', examples: ['Are we early?', 'Are they ready?'] }
                ],
                important: {
                    title: 'Importante',
                    text: 'We e they usam are. Não use am ou is com esses dois sujeitos.'
                },
                contrast: {
                    title: 'Atenção',
                    correct: 'They are hungry.',
                    incorrect: 'They is hungry.'
                }
            },
            rows: [
                ['nós', 'We are / We’re + information', 'We’re at break.', 'Nós estamos no intervalo.'],
                ['eles/elas', 'They are / They’re + information', 'They’re classmates.', 'Eles são colegas de turma.'],
                ['negativa com we', 'We are not / We aren’t', 'We aren’t late.', 'Nós não estamos atrasados.'],
                ['negativa com they', 'They are not / They aren’t', 'They aren’t thirsty.', 'Eles não estão com sede.'],
                ['pergunta com we', 'Are we + information?', 'Are we early?', 'Nós estamos adiantados?'],
                ['pergunta com they', 'Are they + information?', 'Are they ready?', 'Eles estão prontos?'],
                ['respostas curtas', 'Yes, we/they are. · No, we/they aren’t.', 'Yes, they are.', 'Sim, eles estão.']
            ],
            notes: [
                'We are contrai para we’re; they are contrai para they’re.',
                'Are not contrai para aren’t com we e they.',
                'Na pergunta, coloque are antes de we ou they: Are we...? / Are they...?'
            ]
        },
        activitySections: [
            activity('We ou they?', 'Escolha we quando o falante faz parte do grupo e they para outras pessoas.', [
                p('Choose', 'Maya + Peter, speaking about themselves → (We / They)', 'We'),
                p('Choose', 'Maya speaking about Julia + Leo → (We / They)', 'They'),
                p('Complete', '___ are classmates. (nós)', 'We'),
                p('Complete', '___ are at the snack bar. (eles)', 'They'),
                p('Choose', 'We (am / are) hungry.', 'are'),
                p('Choose', 'They (is / are) ready.', 'are'),
                p('Correct', 'We is early.', 'We are early.'),
                p('Correct', 'They am thirsty.', 'They are thirsty.')
            ], 'Subject Recognition'),
            activity('Afirme, negue e pergunte com are', 'Complete e organize somente as estruturas de be apresentadas.', [
                p('Complete', 'We ___ hungry.', 'are'),
                p('Complete', 'They ___ late.', 'aren’t'),
                p('Complete', '___ they ready?', 'Are'),
                p('Complete', '___ we early?', 'Are'),
                p('Build', 'are / We / together', 'We are together.'),
                p('Build', 'aren’t / They / thirsty', 'They aren’t thirsty.'),
                p('Build', 'they / Are / classmates / ?', 'Are they classmates?'),
                p('Answer', 'Are they ready? Positive short answer.', 'Yes, they are.'),
                p('Answer', 'Are we late? Negative short answer.', 'No, we aren’t.'),
                p('Correct', 'Are they are hungry?', 'Are they hungry?')
            ], 'Be Practice')
        ],
        translations: [
            t('Nós somos colegas de turma.', 'We are classmates.'),
            t('Nós estamos no intervalo.', 'We are at break.'),
            t('Nós estamos com fome.', 'We are hungry.'),
            t('Nós não estamos atrasados.', 'We aren’t late.'),
            t('Nós estamos adiantados?', 'Are we early?'),
            t('Sim, estamos.', 'Yes, we are.'),
            t('Eles estão na lanchonete.', 'They are at the snack bar.'),
            t('Eles estão com sede.', 'They are thirsty.'),
            t('Eles não estão prontos.', 'They aren’t ready.'),
            t('Eles estão com fome?', 'Are they hungry?'),
            t('Sim, estão.', 'Yes, they are.'),
            t('Não, não estão.', 'No, they aren’t.')
        ],
        expressions: [
            x('We’re...', 'Nós somos/estamos...', 'We’re é a contração de we are.', 'We’re at break.', 'Nós estamos no intervalo.'),
            x('They’re...', 'Eles/Elas são/estão...', 'They’re é a contração de they are.', 'They’re our classmates.', 'Eles são nossos colegas de turma.'),
            x('We aren’t...', 'Nós não somos/estamos...', 'Aren’t é a contração de are not.', 'We aren’t late.', 'Nós não estamos atrasados.'),
            x('They aren’t...', 'Eles/Elas não são/estão...', 'Use a mesma forma aren’t com they.', 'They aren’t thirsty.', 'Eles não estão com sede.'),
            x('Are we...?', 'Nós somos/estamos...?', 'Coloque are antes de we para perguntar.', 'Are we early?', 'Nós estamos adiantados?'),
            x('Are they...?', 'Eles/Elas são/estão...?', 'Coloque are antes de they para perguntar.', 'Are they ready?', 'Eles estão prontos?'),
            x('Yes, we/they are.', 'Sim, nós/eles estamos.', 'Resposta positiva curta; não use contração no final.', 'Are they ready? — Yes, they are.', 'Eles estão prontos? — Sim.'),
            x('No, we/they aren’t.', 'Não, nós/eles não estamos.', 'Resposta negativa curta.', 'Are we late? — No, we aren’t.', 'Estamos atrasados? — Não.'),
            x('at break', 'no intervalo', 'Aprenda at como parte do bloco at break.', 'We’re at break.', 'Nós estamos no intervalo.'),
            x('ready for...', 'pronto(s) para...', 'Use for antes do evento ou da refeição.', 'They’re ready for lunch.', 'Eles estão prontos para o almoço.'),
            x('What about them?', 'E eles/elas?', 'Use para devolver o foco a outras pessoas.', 'We’re ready. What about them?', 'Nós estamos prontos. E eles?')
        ],
        dialogues: [
            dialogue('At break', line('A', 'Are we early?', 'Nós estamos adiantados?'), line('B', 'Yes, we are.', 'Sim.')),
            dialogue('Two classmates', line('A', 'Are they classmates?', 'Eles são colegas de turma?'), line('B', 'Yes, they are.', 'Sim.')),
            dialogue('At the snack bar', line('A', 'Where are Julia and Leo?', 'Onde estão Julia e Leo?'), line('B', 'They’re at the snack bar.', 'Eles estão na lanchonete.')),
            dialogue('Hungry or thirsty', line('A', 'Are they hungry?', 'Eles estão com fome?'), line('B', 'No, they aren’t. They’re thirsty.', 'Não. Eles estão com sede.')),
            dialogue('Ready for lunch', line('A', 'We’re ready for lunch.', 'Nós estamos prontos para o almoço.'), line('B', 'Great. They’re ready too.', 'Ótimo. Eles também estão prontos.'))
        ],
        reading: reading(
            'We are at break',
            'We are students, and we are at break. Julia and Leo are our classmates. They are at the snack bar. They are hungry, but they aren’t late. We are thirsty. Are they ready for lunch? Yes, they are. We are ready too.',
            question('Complete: ___ are students.', 'We'),
            question('Where are Julia and Leo?', 'They are at the snack bar.'),
            question('Are they hungry?', 'Yes, they are.'),
            question('Are they late?', 'No, they aren’t.'),
            question('Complete: We ___ thirsty.', 'are'),
            question('Are we ready too?', 'Yes, we are.')
        ),
        conversation: { questions: [], support: ['We’re...', 'They’re...', 'We aren’t...', 'They aren’t...', 'Are we...?', 'Are they...?'] },
        homework: homework('Revise we are e they are com os modelos da aula.', ['We’re/They’re', 'We/They aren’t', 'Are we/they...?'], ['Repito as frases prontas.', 'Diferencio we de they.', 'Uso somente o verbo be.'])
    }));
}());
