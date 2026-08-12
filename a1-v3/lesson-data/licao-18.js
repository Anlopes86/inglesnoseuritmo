(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { v, x, p, t, line, dialogue, question, reading, activity, homework } = R.helpers;

    R.register(18, R.lesson({
        title: 'What Are They Doing?',
        objectives: [
            'Descrever ações que estão acontecendo agora.',
            'Formar o Present Continuous afirmativo, negativo e interrogativo.',
            'Aplicar as mudanças ortográficas mais frequentes antes de -ing.',
            'Distinguir uma rotina de uma ação em andamento.'
        ],
        intro: [
            line('Emma', 'Where is everybody?', 'Onde está todo mundo?'),
            line('Sarah', 'Daniel is trying on a jacket. Leo is looking for his wallet.', 'Daniel está experimentando uma jaqueta. Leo está procurando a carteira dele.'),
            line('Emma', 'Are Ana and Julia waiting outside?', 'Ana e Julia estão esperando lá fora?'),
            line('Sarah', 'No, they aren’t. They’re paying at the register.', 'Não. Elas estão pagando no caixa.'),
            line('Emma', 'And what are you doing?', 'E o que você está fazendo?'),
            line('Sarah', 'I’m sending a message to Lucas.', 'Estou enviando uma mensagem para o Lucas.')
        ],
        vocab: [
            v('look for', 'procurar', 'Leo is looking for his wallet.', 'Leo está procurando a carteira dele.'),
            v('wait', 'esperar', 'I am waiting near the door.', 'Estou esperando perto da porta.'),
            v('try on', 'experimentar roupa', 'She is trying on a dress.', 'Ela está experimentando um vestido.'),
            v('pay', 'pagar', 'They are paying at the register.', 'Eles estão pagando no caixa.'),
            v('carry', 'carregar', 'He is carrying two bags.', 'Ele está carregando duas sacolas.'),
            v('choose', 'escolher', 'We are choosing a gift.', 'Estamos escolhendo um presente.'),
            v('talk', 'conversar', 'Ana is talking to the clerk.', 'Ana está conversando com a atendente.'),
            v('send', 'enviar', 'I am sending a message.', 'Estou enviando uma mensagem.'),
            v('sit', 'sentar; estar sentado', 'The children are sitting on a bench.', 'As crianças estão sentadas em um banco.'),
            v('stand', 'ficar em pé', 'A man is standing near the window.', 'Um homem está em pé perto da janela.'),
            v('wear', 'usar; vestir', 'She is wearing a red jacket.', 'Ela está usando uma jaqueta vermelha.'),
            v('smile', 'sorrir', 'The woman is smiling.', 'A mulher está sorrindo.'),
            v('register', 'caixa de loja', 'The register is near the door.', 'O caixa fica perto da porta.'),
            v('right now', 'agora mesmo', 'We are studying right now.', 'Estamos estudando agora mesmo.'),
            v('at the moment', 'neste momento', 'He is busy at the moment.', 'Ele está ocupado neste momento.')
        ],
        grammar: {
            title: 'Present Continuous',
            summary: 'Use am/is/are + verbo-ing para uma ação que está acontecendo agora ou ao redor do momento presente.',
            rows: [
                ['I', 'am + verb-ing', 'I am waiting.', 'Eu estou esperando.'],
                ['he/she/it', 'is + verb-ing', 'She is paying.', 'Ela está pagando.'],
                ['you/we/they', 'are + verb-ing', 'They are shopping.', 'Eles estão fazendo compras.'],
                ['negative', 'am not / isn’t / aren’t', 'He isn’t waiting.', 'Ele não está esperando.'],
                ['question', 'Am/Is/Are + subject + verb-ing?', 'Are you looking for me?', 'Você está me procurando?'],
                ['short answer', 'Yes, ... am/is/are. · No, ... isn’t/aren’t.', 'Yes, I am. No, they aren’t.', 'Sim. Não.']
            ],
            notes: [
                'Em geral: wait → waiting, talk → talking.',
                'Verbo terminado em e: make → making, write → writing.',
                'Alguns verbos curtos dobram a consoante: sit → sitting, run → running.',
                'Rotina: I work every day. Agora: I am working right now.'
            ]
        },
        activitySections: [
            activity('Forme a ação em andamento', 'Complete com am, is ou are e escreva o verbo com -ing.', [
                p('Complete', 'I ___ (wait) near the door.', 'am waiting'),
                p('Complete', 'Sarah ___ (try on) a dress.', 'is trying on'),
                p('Complete', 'They ___ (pay) at the register.', 'are paying'),
                p('Complete', 'We ___ (choose) a gift.', 'are choosing'),
                p('Complete', 'Leo ___ (look for) his wallet.', 'is looking for'),
                p('Complete', 'You ___ (carry) three bags.', 'are carrying'),
                p('Write -ing', 'make', 'making'),
                p('Write -ing', 'sit', 'sitting'),
                p('Write -ing', 'smile', 'smiling'),
                p('Write -ing', 'run', 'running'),
                p('Correct', 'She is pay at the register.', 'She is paying at the register.'),
                p('Correct', 'They are siting on a bench.', 'They are sitting on a bench.')
            ], 'Build the Form'),
            activity('Perguntas e respostas', 'Transforme afirmações, faça perguntas e responda com a forma curta.', [
                p('Make negative', 'Daniel is trying on a jacket.', 'Daniel isn’t trying on a jacket.'),
                p('Make negative', 'Ana and Julia are waiting outside.', 'Ana and Julia aren’t waiting outside.'),
                p('Make a question', 'Sarah is sending a message.', 'Is Sarah sending a message?'),
                p('Make a question', 'They are paying.', 'Are they paying?'),
                p('Build', 'you / What / doing / are / ?', 'What are you doing?'),
                p('Build', 'wearing / she / Is / a blue dress / ?', 'Is she wearing a blue dress?'),
                p('Answer', 'Are you studying English right now? Positive.', 'Yes, I am.'),
                p('Answer', 'Is Leo carrying a bag? Negative.', 'No, he isn’t.'),
                p('Answer', 'What is the woman doing? smile', 'She is smiling.'),
                p('Answer', 'What are the children doing? sit on a bench', 'They are sitting on a bench.'),
                p('Correct', 'Are waiting they outside?', 'Are they waiting outside?'),
                p('Correct', 'What she is doing?', 'What is she doing?')
            ], 'Questions'),
            activity('Rotina ou agora?', 'Escolha Present Simple para hábito e Present Continuous para a ação atual.', [
                p('Choose', 'Emma usually (works / is working) at home.', 'works'),
                p('Choose', 'Emma (works / is working) at the store right now.', 'is working'),
                p('Choose', 'They (shop / are shopping) every Saturday.', 'shop'),
                p('Choose', 'They (shop / are shopping) at the moment.', 'are shopping'),
                p('Complete', 'Leo usually ___ a backpack, but today he ___ two bags. (carry)', 'carries; is carrying'),
                p('Complete', 'I usually ___ by card. Right now, I ___ in cash. (pay)', 'pay; am paying'),
                p('Correct', 'She is working every day.', 'She works every day.'),
                p('Correct', 'Look! The bus comes.', 'Look! The bus is coming.'),
                p('Describe', 'Scene: woman—red dress/smile; man—pay; two children—sit', 'A woman is wearing a red dress and smiling. A man is paying. Two children are sitting.'),
                p('Create', 'Say one thing you do every day and one thing you are doing now.', 'I ... every day. I am ... now.')
            ], 'Now or Habit?')
        ],
        translations: [
            t('O que você está fazendo?', 'What are you doing?'),
            t('Estou esperando perto da porta.', 'I am waiting near the door.'),
            t('Ela está experimentando uma jaqueta.', 'She is trying on a jacket.'),
            t('Eles estão pagando no caixa.', 'They are paying at the register.'),
            t('Ele não está procurando a carteira.', 'He isn’t looking for his wallet.'),
            t('Elas estão esperando lá fora?', 'Are they waiting outside?'),
            t('Sim, elas estão.', 'Yes, they are.'),
            t('Não, ele não está.', 'No, he isn’t.'),
            t('Ela usa preto todos os dias.', 'She wears black every day.'),
            t('Ela está usando azul hoje.', 'She is wearing blue today.')
        ],
        expressions: [
            x('What are you doing?', 'O que você está fazendo?', 'Pergunta pela ação atual.', 'What are you doing right now?', 'O que você está fazendo agora?'),
            x('right now', 'agora mesmo', 'Marca claramente o momento presente.', 'I’m working right now.', 'Estou trabalhando agora mesmo.'),
            x('at the moment', 'neste momento', 'Outra expressão para ação atual.', 'She’s busy at the moment.', 'Ela está ocupada neste momento.'),
            x('look for', 'procurar', 'Use quando tenta encontrar algo.', 'I’m looking for my phone.', 'Estou procurando meu telefone.'),
            x('try ... on', 'experimentar roupa', 'O objeto pode ficar no meio.', 'Try it on.', 'Experimente.'),
            x('wait for', 'esperar por', 'Inclua for antes da pessoa ou coisa.', 'We’re waiting for the bus.', 'Estamos esperando o ônibus.'),
            x('What is happening?', 'O que está acontecendo?', 'Pergunta geral sobre a cena.', 'What is happening outside?', 'O que está acontecendo lá fora?'),
            x('Look!', 'Olhe!', 'Chama atenção para uma ação visível.', 'Look! The bus is coming.', 'Olhe! O ônibus está chegando.')
        ],
        dialogues: [
            dialogue('Waiting at the door', line('A', 'What are you doing here?', 'O que você está fazendo aqui?'), line('B', 'I’m waiting for Sarah.', 'Estou esperando a Sarah.'), line('A', 'Is she shopping inside?', 'Ela está fazendo compras lá dentro?'), line('B', 'Yes. She’s looking for a dress.', 'Sim. Ela está procurando um vestido.'), line('A', 'I’m waiting for Julia. Let’s wait together.', 'Estou esperando a Julia. Vamos esperar juntos.'), line('B', 'Good idea. Sarah’s coming now.', 'Boa ideia. Sarah está vindo agora.')),
            dialogue('The black jacket', line('A', 'Is Daniel trying on the blue jacket?', 'Daniel está experimentando a jaqueta azul?'), line('B', 'No, he isn’t. He’s trying on the black one.', 'Não. Ele está experimentando a preta.'), line('A', 'Does he like it?', 'Ele gosta dela?'), line('B', 'Yes. He’s buying it now.', 'Sim. Ele está comprando agora.')),
            dialogue('At the register', line('A', 'Are Ana and Julia paying?', 'Ana e Julia estão pagando?'), line('B', 'Yes, they are.', 'Sim.'), line('A', 'What are they buying?', 'O que elas estão comprando?'), line('B', 'They’re buying two shirts and a bag.', 'Elas estão comprando duas camisas e uma bolsa.')),
            dialogue('Looking for a wallet', line('A', 'What is Leo looking for?', 'O que Leo está procurando?'), line('B', 'He’s looking for his wallet.', 'Ele está procurando a carteira dele.'), line('A', 'Is he looking in his bag?', 'Ele está procurando na bolsa dele?'), line('B', 'Yes, but it isn’t there.', 'Sim, mas ela não está lá.'), line('A', 'Look. Is that his wallet under the chair?', 'Olhe. Aquela é a carteira dele embaixo da cadeira?'), line('B', 'Yes, it is. He’s picking it up now.', 'Sim. Ele está pegando agora.')),
            dialogue('Usually and today', line('A', 'Do you usually work here?', 'Você geralmente trabalha aqui?'), line('B', 'No. I usually work at the café.', 'Não. Geralmente trabalho no café.'), line('A', 'Why are you working here today?', 'Por que você está trabalhando aqui hoje?'), line('B', 'I’m helping my sister.', 'Estou ajudando minha irmã.'), line('A', 'Is she busy?', 'Ela está ocupada?'), line('B', 'Yes. A lot of people are shopping today.', 'Sim. Muitas pessoas estão fazendo compras hoje.'))
        ],
        dialogueGroups: [[0, 1], [2, 3, 4]],
        reading: reading('A busy store', 'It is Saturday afternoon and the store is busy. Emma is looking for a blue jacket. Daniel is carrying three bags and waiting for her. Near the register, Ana and Julia are paying for two shirts. A child is sitting on a bench and his mother is trying on a dress. Two clerks are talking to customers. Nobody is leaving yet.',
            question('What is Emma looking for?', 'She is looking for a blue jacket.'),
            question('What is Daniel doing?', 'He is carrying three bags and waiting for Emma.'),
            question('Who is paying?', 'Ana and Julia are paying.'),
            question('Where is the child sitting?', 'He is sitting on a bench.'),
            question('What is the child’s mother doing?', 'She is trying on a dress.'),
            question('Are the clerks leaving?', 'No, they aren’t. They are talking to customers.')),
        conversation: {
            questions: ['Say what you are doing right now.', 'Say two things you are not doing.', 'Describe four people in a busy store.', 'Ask what three people are doing.', 'Answer each question with a short answer and a full sentence.', 'Compare one daily habit with what is happening today.', 'Describe what people near you may be doing now.', 'Create a telephone exchange asking what someone is doing.'],
            support: ['I’m ...ing.', 'He/She is ...ing.', 'They aren’t ...ing.', 'Are you ...ing?', 'What is ... doing?', 'right now', 'at the moment']
        },
        homework: homework('Crie uma cena com pelo menos oito pessoas realizando ações diferentes.', ['Uma loja movimentada', 'Uma praça no sábado', 'Uma família em casa'], ['Usei afirmações, negativas e perguntas.', 'Usei pelo menos dez verbos com -ing.', 'Comparei duas rotinas com ações atuais.']),
        mission: { title: 'Live scene report', task: 'Descreva uma cena movimentada, responda a perguntas e corrija duas interpretações erradas.', focus: ['Present Continuous', 'perguntas e respostas', 'ação visível'] }
    }));
}());
