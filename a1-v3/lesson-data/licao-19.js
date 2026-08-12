(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { v, x, p, t, line, dialogue, question, reading, activity, homework } = R.helpers;

    R.register(19, R.lesson({
        title: 'What’s Your Friend Like?',
        objectives: ['Descrever aparência física com be e have/has.', 'Perguntar e responder quem é uma pessoa em uma cena.', 'Distinguir What does ... look like? de What is ... like?', 'Dizer e perguntar as horas em situações cotidianas.'],
        intro: [
            line('Emma', 'Which person is your friend?', 'Qual pessoa é sua amiga?'),
            line('Sarah', 'The tall woman with long curly hair.', 'A mulher alta com cabelo longo e cacheado.'),
            line('Emma', 'Is she wearing a green jacket?', 'Ela está usando uma jaqueta verde?'),
            line('Sarah', 'Yes. Her name is Julia. She’s friendly and quiet.', 'Sim. O nome dela é Julia. Ela é simpática e quieta.'),
            line('Emma', 'What time is she leaving?', 'A que horas ela vai embora?'),
            line('Sarah', 'At a quarter past six.', 'Às seis e quinze.')
        ],
        vocab: [
            v('tall', 'alto(a)', 'Julia is tall.', 'Julia é alta.'), v('short', 'baixo(a)', 'Leo is short.', 'Leo é baixo.'),
            v('young', 'jovem', 'He is a young man.', 'Ele é um homem jovem.'), v('old', 'idoso(a); velho(a)', 'The old man is smiling.', 'O senhor idoso está sorrindo.'),
            v('slim', 'magro(a)', 'She is tall and slim.', 'Ela é alta e magra.'), v('strong', 'forte', 'He looks strong.', 'Ele parece forte.'),
            v('hair', 'cabelo', 'She has long hair.', 'Ela tem cabelo longo.'), v('long', 'longo(a)', 'Her hair is long.', 'O cabelo dela é longo.'),
            v('short hair', 'cabelo curto', 'He has short hair.', 'Ele tem cabelo curto.'), v('straight', 'liso(a)', 'She has straight hair.', 'Ela tem cabelo liso.'),
            v('curly', 'cacheado(a)', 'Julia has curly hair.', 'Julia tem cabelo cacheado.'), v('dark', 'escuro(a)', 'He has dark hair.', 'Ele tem cabelo escuro.'),
            v('blond', 'loiro(a)', 'The blond woman is Ana.', 'A mulher loira é Ana.'), v('beard', 'barba', 'The man has a beard.', 'O homem tem barba.'),
            v('glasses', 'óculos', 'She is wearing glasses.', 'Ela está usando óculos.'), v('friendly', 'simpático(a)', 'Julia is friendly.', 'Julia é simpática.'),
            v('quiet', 'quieto(a)', 'My friend is quiet.', 'Meu amigo é quieto.'), v('funny', 'engraçado(a)', 'Leo is very funny.', 'Leo é muito engraçado.'),
            v('o’clock', 'em ponto', 'It is six o’clock.', 'São seis horas.'), v('half past', 'e meia', 'It is half past seven.', 'São sete e meia.'),
            v('a quarter past', 'e quinze', 'It is a quarter past six.', 'São seis e quinze.'), v('a quarter to', 'quinze para', 'It is a quarter to nine.', 'São quinze para as nove.')
        ],
        grammar: {
            title: 'Describing people and telling time',
            summary: 'Use be com características gerais, have/has com cabelo e barba, e be wearing com roupas ou acessórios visíveis.',
            rows: [
                ['be', 'subject + am/is/are + adjective', 'She is tall and friendly.', 'Ela é alta e simpática.'],
                ['have/has', 'subject + have/has + feature', 'He has short dark hair.', 'Ele tem cabelo curto e escuro.'],
                ['wear now', 'subject + am/is/are wearing', 'She is wearing glasses.', 'Ela está usando óculos.'],
                ['appearance', 'What does ... look like?', 'What does Julia look like?', 'Como é a aparência da Julia?'],
                ['general description', 'What is ... like?', 'What is Julia like?', 'Como é a Julia?'],
                ['time', 'It is + time.', 'It is half past seven.', 'São sete e meia.']
            ],
            notes: ['Ordem comum: comprimento + tipo + cor + hair: long curly dark hair.', 'Pergunte What time is it? para a hora atual e What time does ...? para horários.', 'Para 6:45: a quarter to seven. Para 6:15: a quarter past six.']
        },
        activitySections: [
            activity('Build a description', 'Escolha be, have/has ou be wearing e organize os adjetivos.', [
                p('Complete', 'Julia ___ tall and slim.', 'is'), p('Complete', 'She ___ long curly hair.', 'has'),
                p('Complete', 'She ___ wearing a green jacket.', 'is'), p('Complete', 'Daniel ___ a beard.', 'has'),
                p('Build', 'has / dark / short / He / hair', 'He has short dark hair.'),
                p('Build', 'wearing / glasses / is / She', 'She is wearing glasses.'),
                p('Choose', 'My friend (is / has) friendly.', 'is'), p('Choose', 'My friend (is / has) blue eyes.', 'has'),
                p('Correct', 'She is long hair.', 'She has long hair.'), p('Correct', 'He has tall.', 'He is tall.'),
                p('Describe', 'Julia: tall · slim · long curly hair · glasses', 'Julia is tall and slim. She has long curly hair and is wearing glasses.'),
                p('Describe', 'Leo: short · strong · short dark hair · beard', 'Leo is short and strong. He has short dark hair and a beard.')
            ], 'Appearance'),
            activity('Identify the person', 'Faça perguntas e use detalhes suficientes para identificar a pessoa certa.', [
                p('Choose', 'Pergunta por aparência: (What is she like? / What does she look like?)', 'What does she look like?'),
                p('Choose', 'Pergunta por personalidade geral: (What is she like? / What does she look like?)', 'What is she like?'),
                p('Answer', 'What does Julia look like? tall · long curly hair', 'She is tall and has long curly hair.'),
                p('Answer', 'What is Julia like? friendly · quiet', 'She is friendly and quiet.'),
                p('Build', 'person / Which / friend / your / is / ?', 'Which person is your friend?'),
                p('Answer', 'Three women; your friend wears green.', 'The woman in the green jacket.'),
                p('Answer', 'Two men; your friend has a beard and glasses.', 'The man with a beard and glasses.'),
                p('Correct', 'What does she like? (aparência)', 'What does she look like?'),
                p('Correct', 'The woman with a red jacket.', 'The woman in the red jacket.'),
                p('Create', 'Give four clues so someone can identify one person.', 'The ... person with ... / in ...')
            ], 'Who Is It?'),
            activity('What time is it?', 'Leia, escreva e use os horários em perguntas reais.', [
                p('Write', '6:00', 'six o’clock'), p('Write', '7:30', 'half past seven / seven thirty'),
                p('Write', '8:15', 'a quarter past eight / eight fifteen'), p('Write', '9:45', 'a quarter to ten / nine forty-five'),
                p('Write', '10:20', 'twenty past ten / ten twenty'), p('Write', '11:50', 'ten to twelve / eleven fifty'),
                p('Build', 'time / What / it / is / ?', 'What time is it?'),
                p('Build', 'she / What time / leaving / is / ?', 'What time is she leaving?'),
                p('Answer', 'What time is the class? 6:30', 'It is at half past six.'),
                p('Answer', 'What time do you start work?', 'I start work at ...'),
                p('Correct', 'It is half seven.', 'It is half past seven.'),
                p('Create', 'Give a meeting time and identify the person you are meeting.', 'I’m meeting the ... person at ...')
            ], 'Time Practice')
        ],
        translations: [t('Como é a aparência dela?', 'What does she look like?'), t('Ela é alta e magra.', 'She is tall and slim.'), t('Ela tem cabelo longo e cacheado.', 'She has long curly hair.'), t('Ela está usando óculos.', 'She is wearing glasses.'), t('Como ela é?', 'What is she like?'), t('Ela é simpática e quieta.', 'She is friendly and quiet.'), t('Qual pessoa é seu amigo?', 'Which person is your friend?'), t('O homem de barba.', 'The man with a beard.'), t('Que horas são?', 'What time is it?'), t('São sete e meia.', 'It is half past seven.'), t('São quinze para as nove.', 'It is a quarter to nine.'), t('A que horas ela vai embora?', 'What time is she leaving?')],
        expressions: [
            x('What does ... look like?', 'Como é a aparência de...?', 'Pergunta por características físicas.', 'What does your friend look like?', 'Como é a aparência do seu amigo?'),
            x('What is ... like?', 'Como é...?', 'Pergunta por descrição geral ou personalidade.', 'What is Julia like?', 'Como é a Julia?'),
            x('the person with...', 'a pessoa com...', 'Identifica por característica.', 'The man with glasses.', 'O homem de óculos.'),
            x('the person in...', 'a pessoa de...', 'Identifica pela roupa ou cor.', 'The woman in blue.', 'A mulher de azul.'),
            x('Which person...?', 'Qual pessoa...?', 'Pede identificação entre opções.', 'Which person is Daniel?', 'Qual pessoa é o Daniel?'),
            x('What time is it?', 'Que horas são?', 'Pergunta pela hora.', 'What time is it? It’s six.', 'Que horas são? São seis.'),
            x('What time does ...?', 'A que horas...?', 'Pergunta por horário habitual.', 'What time does class start?', 'A que horas a aula começa?'),
            x('What time is ... -ing?', 'A que horas ... vai...?', 'Pergunta por horário de plano atual.', 'What time are you leaving?', 'A que horas você vai embora?')
        ],
        dialogues: [
            dialogue('Finding Julia', line('A', 'Which person is Julia?', 'Qual pessoa é a Julia?'), line('B', 'She’s the tall woman with curly hair.', 'Ela é a mulher alta de cabelo cacheado.'), line('A', 'Is she wearing a green dress?', 'Ela está usando um vestido verde?'), line('B', 'Yes, she is. She’s talking to Leo.', 'Sim. Ela está conversando com Leo.'), line('A', 'Oh, I see her now.', 'Ah, agora eu a vejo.'), line('B', 'Let’s go and say hello.', 'Vamos lá dizer olá.')),
            dialogue('Describing a friend', line('A', 'What does your friend look like?', 'Como é a aparência da sua amiga?'), line('B', 'She is short and has long dark hair.', 'Ela é baixa e tem cabelo longo e escuro.'), line('A', 'Does she wear glasses?', 'Ela usa óculos?'), line('B', 'No, she doesn’t.', 'Não.'), line('A', 'What’s her name?', 'Qual é o nome dela?'), line('B', 'Her name is Nina.', 'O nome dela é Nina.')),
            dialogue('Leo’s personality', line('A', 'What is Leo like?', 'Como é o Leo?'), line('B', 'He’s friendly and funny.', 'Ele é simpático e engraçado.'), line('A', 'Is he talkative too?', 'Ele também é comunicativo?'), line('B', 'Yes. He talks to everyone.', 'Sim. Ele conversa com todos.')),
            dialogue('The right person', line('A', 'Is Daniel the man in the blue shirt?', 'Daniel é o homem de camisa azul?'), line('B', 'No. He’s the man with glasses.', 'Não. Ele é o homem de óculos.'), line('A', 'The tall man near the door?', 'O homem alto perto da porta?'), line('B', 'No, Daniel is short and has a beard.', 'Não, Daniel é baixo e tem barba.'), line('A', 'Oh, I see him now.', 'Ah, agora eu o vejo.'), line('B', 'He’s coming this way.', 'Ele está vindo para cá.')),
            dialogue('Meeting Julia', line('A', 'What time are you meeting Julia?', 'A que horas você vai encontrar a Julia?'), line('B', 'At a quarter past six.', 'Às seis e quinze.'), line('A', 'Where are you meeting her?', 'Onde você vai encontrá-la?'), line('B', 'At the café near the station.', 'No café perto da estação.'), line('A', 'Is she usually on time?', 'Ela geralmente chega no horário?'), line('B', 'Yes. She’s never late.', 'Sim. Ela nunca se atrasa.'))
        ],
        dialogueGroups: [[0, 1], [2, 3, 4]],
        reading: reading('Meeting at the station', 'Sarah is waiting at the station at a quarter to six. She is meeting two friends. Julia is tall and slim. She has long curly hair and is wearing a green jacket. Leo is short and strong. He has short dark hair, a beard and glasses. Julia is quiet and friendly; Leo is funny and talks a lot. Their train leaves at half past six, so they have forty-five minutes.',
            question('What time is Sarah at the station?', 'At a quarter to six.'), question('What does Julia look like?', 'She is tall and slim and has long curly hair.'), question('What is Julia wearing?', 'She is wearing a green jacket.'), question('What does Leo look like?', 'He is short and strong and has short dark hair, a beard and glasses.'), question('What are the two friends like?', 'Julia is quiet and friendly; Leo is funny and talkative.'), question('What time does the train leave?', 'At half past six.')),
        conversation: { questions: ['Describe your appearance with four details.', 'Describe a friend or family member.', 'Answer What does this person look like?', 'Answer What is this person like?', 'Identify two people using with and in.', 'Say the current time.', 'Give three important times in your routine.', 'Arrange to meet a described person at a specific time.'], support: ['He/She is...', 'He/She has...', 'He/She is wearing...', 'the person with...', 'the person in...', 'at half past...', 'at a quarter to...'] },
        homework: homework('Prepare dois perfis completos e uma agenda de encontro.', ['Dois amigos', 'Duas pessoas da família', 'Duas personagens imaginárias'], ['Descrevi aparência e personalidade sem confundir as perguntas.', 'Usei be, have/has e be wearing.', 'Incluí pelo menos seis horários diferentes.']),
        mission: { title: 'Find the right person', task: 'Use pistas de aparência, roupa, personalidade e horário para identificar e encontrar a pessoa certa.', focus: ['descrição precisa', 'look like x be like', 'horários'] }
    }));
}());
