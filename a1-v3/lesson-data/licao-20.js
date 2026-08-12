(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { p, question, reading, homework, focus, speaking, comm, line, dialogue } = R.helpers;
    const stations = [
        focus('One, ones and object pronouns', 'Escolha roupas sem repetir substantivos e direcione pedidos corretamente.', [['singular', 'the ... one', 'the blue one'], ['plural', 'the ... ones', 'the black ones'], ['object', 'me/you/him/her/us/them', 'Show it to her.']], ['One substitui singular; ones substitui plural.', 'It/them substitui a coisa mencionada.'], [
            p('Transform', 'the red jacket', 'the red one'), p('Transform', 'the white shirts', 'the white ones'),
            p('Complete', 'These shoes are small. Show me the large ___.', 'ones'), p('Complete', 'I like this dress. I want to try ___ on.', 'it'),
            p('Complete', 'Sarah wants the jacket. Show it to ___.', 'her'), p('Complete', 'We need two shirts. Please show ___ the blue ones.', 'us'),
            p('Build', 'prefer / Which / do / one / you / ?', 'Which one do you prefer?'), p('Correct', 'I prefer the blue one jacket.', 'I prefer the blue jacket. / I prefer the blue one.'),
            p('Answer', 'Black jacket or blue jacket?', 'I prefer the ... one.'), p('Create', 'Ask to see and try on two different items.', 'Can you show ... to me? I’d like to try ... on.')
        ]),
        focus('Possession', 'Pergunte e responda a quem pertence cada objeto.', [['question', 'Whose ...?', 'Whose phone is this?'], ['adjective', 'my/your/his/her/our/their + noun', 'my phone'], ['pronoun', 'mine/yours/his/hers/ours/theirs', 'It is mine.']], ['Não use substantivo depois de mine/yours/hers/ours/theirs.', 'Whose não é who’s.'], [
            p('Choose', 'This is (my / mine) wallet.', 'my'), p('Choose', 'This wallet is (my / mine).', 'mine'),
            p('Choose', 'Those are (their / theirs) bags.', 'their'), p('Choose', 'Those bags are (their / theirs).', 'theirs'),
            p('Build', 'keys / Whose / these / are / ?', 'Whose keys are these?'), p('Answer', 'Owner: Daniel', 'They are Daniel’s. / They are his.'),
            p('Transform', 'This is Sarah’s phone.', 'This phone is hers.'), p('Correct', 'The blue charger is her.', 'The blue charger is hers.'),
            p('Correct', 'Who’s jacket is this?', 'Whose jacket is this?'), p('Create', 'Correct two wrong guesses about three lost objects.', 'No, it isn’t ... It belongs to ...')
        ]),
        focus('Present Continuous', 'Descreva o que está ou não está acontecendo agora.', [['affirmative', 'am/is/are + verb-ing', 'They are shopping.'], ['negative', 'isn’t/aren’t + verb-ing', 'He isn’t waiting.'], ['question', 'Is/Are + subject + verb-ing?', 'Are they paying?']], ['Inclua o verbo be.', 'Use Present Simple para hábito e Continuous para agora.'], [
            p('Complete', 'She ___ (try on) a dress.', 'is trying on'), p('Complete', 'They ___ (pay) now.', 'are paying'),
            p('Make negative', 'Leo is carrying a bag.', 'Leo isn’t carrying a bag.'), p('Make a question', 'Sarah is waiting.', 'Is Sarah waiting?'),
            p('Write -ing', 'sit', 'sitting'), p('Write -ing', 'make', 'making'),
            p('Choose', 'I (work / am working) every day.', 'work'), p('Choose', 'I (work / am working) right now.', 'am working'),
            p('Correct', 'What they are doing?', 'What are they doing?'), p('Describe', 'Store: man—pay; woman—try on jacket; children—sit', 'A man is paying. A woman is trying on a jacket. The children are sitting.')
        ]),
        focus('Appearance and time', 'Identifique pessoas e combine cada encontro com o horário correto.', [['appearance', 'be + adjective; have + feature', 'She is tall and has curly hair.'], ['visible item', 'be wearing', 'He is wearing glasses.'], ['time', 'past/to/o’clock', 'a quarter to seven']], ['What does ... look like? pergunta aparência.', 'What is ... like? pede descrição geral.'], [
            p('Complete', 'Julia ___ tall and ___ long hair.', 'is; has'), p('Complete', 'Leo is ___ glasses.', 'wearing'),
            p('Choose', 'Aparência: (What is he like? / What does he look like?)', 'What does he look like?'),
            p('Choose', 'Personalidade: (What is he like? / What does he look like?)', 'What is he like?'),
            p('Write', '6:15', 'a quarter past six / six fifteen'), p('Write', '7:45', 'a quarter to eight / seven forty-five'),
            p('Write', '9:30', 'half past nine / nine thirty'), p('Correct', 'She has tall and curly hair.', 'She is tall and has curly hair.'),
            p('Identify', 'Woman: short · long dark hair · red jacket', 'The short woman with long dark hair in the red jacket.'),
            p('Create', 'Describe a person and give the time you are meeting.', 'I’m meeting the ... person at ...')
        ])
    ];
    stations.push(
        speaking('attempt', 'Conversation: lost shopping bag', 'Identifique uma sacola, confirme seu dono e descreva o que há nela.', { label: 'Whose bag?', scenario: 'Há três sacolas parecidas no balcão de achados e perdidos.', task: 'Escolha a sacola correta usando cores, roupas e posse.', condition: 'Uma identificação inicial está errada; corrija-a com clareza.', steps: ['Descreva as sacolas.', 'Pergunte de quem são.', 'Confirme o conteúdo e o dono.'], support: ['Which one?', 'Whose ...?', 'It’s mine/hers.', 'It belongs to...'], evidence: 'A sacola e o dono ficam inequívocos.' }),
        speaking('questions', 'Conversation: live store scene', 'Descreva as pessoas e responda a perguntas sobre suas ações.', { label: 'What is happening?', scenario: 'Uma câmera mostra seis pessoas em uma loja.', task: 'Identifique cada pessoa e diga o que está fazendo.', condition: 'Duas pessoas mudam de ação durante o relato.', steps: ['Identifique por aparência.', 'Descreva as ações.', 'Atualize o relato.'], support: ['The person with/in...', 'He/She is ...ing.', 'They aren’t ...ing now.'], evidence: 'Descrição e ação atual aparecem em frases completas.' }),
        speaking('final', 'Conversation: find and meet', 'Encontre a pessoa certa e combine local e horário.', { label: 'Meeting challenge', scenario: 'Você recebeu descrições de três pessoas que usam roupas parecidas.', task: 'Faça perguntas até identificar seu contato e confirme o horário do encontro.', condition: 'O horário muda de 6:15 para 6:45.', steps: ['Pergunte pela aparência.', 'Identifique a pessoa.', 'Repita o novo horário.'], support: ['What does ... look like?', 'Which person...?', 'the ... one', 'at a quarter to...'], evidence: 'A pessoa e o horário final são confirmados sem ambiguidade.' })
    );
    R.register(20, R.review({
        title: 'Conversation Activities 4',
        objectives: ['Revisar exclusivamente as lições 16–19.', 'Alternar explicação curta e atividades do mesmo conteúdo.', 'Integrar escolhas, posse, ações atuais, aparência e horários em tarefas individuais.'],
        stations,
        reading: reading('The wrong shopping bag', 'At a quarter past six, Sarah is waiting near the store. She is holding a black shopping bag, but the bag is not hers. Hers is blue. Inside the black one, there is a gray sweater, a pair of brown shoes and an ID card. The card belongs to Daniel. Sarah calls him. Daniel is the tall man with short dark hair and glasses. He is wearing a green jacket and looking for his bag near the register. They agree to meet at a quarter to seven.',
            question('What time is Sarah waiting?', 'At a quarter past six.'), question('Is the black bag hers?', 'No. Hers is blue.'), question('What is inside the black bag?', 'A gray sweater, brown shoes and an ID card.'), question('Who does the bag belong to?', 'It belongs to Daniel.'), question('What does Daniel look like?', 'He is tall and has short dark hair and glasses.'), question('What is he doing?', 'He is looking for his bag.'), question('What time do they agree to meet?', 'At a quarter to seven.')),
        communicativeActivities:[
            comm('listening','Listen: the wrong bag','Ouça sem ler e identifique as duas sacolas, seus donos e o local do encontro.',{
                placement:'before-reading',
                scenario:'Sarah liga para o balcão de achados e perdidos depois de pegar a sacola errada.',
                dialogue:dialogue('A call to lost and found',
                    line('Clerk','Lost and found. How can I help you?','Achados e perdidos. Como posso ajudar?'),
                    line('Sarah','I have a black shopping bag, but it isn’t mine.','Estou com uma sacola preta, mas ela não é minha.'),
                    line('Clerk','What is inside it?','O que há dentro dela?'),
                    line('Sarah','There is a gray sweater and there are brown shoes.','Há um suéter cinza e sapatos marrons.'),
                    line('Clerk','There’s a man here looking for a black bag.','Há um homem aqui procurando uma sacola preta.'),
                    line('Sarah','What does he look like?','Como ele é fisicamente?'),
                    line('Clerk','He’s tall and he has short dark hair and glasses.','Ele é alto e tem cabelo escuro curto e óculos.'),
                    line('Sarah','That’s Daniel. The bag is his.','É Daniel. A sacola é dele.'),
                    line('Clerk','Your blue bag is here too.','Sua sacola azul também está aqui.'),
                    line('Sarah','Great. I’m coming now.','Ótimo. Estou indo agora.')
                ),
                questions:[
                    question('What color is the bag with Sarah?','Black.'),
                    question('Is it hers?','No, it isn’t.'),
                    question('What clothes are inside it?','A gray sweater and brown shoes.'),
                    question('What does Daniel look like?','He is tall and has short dark hair and glasses.'),
                    question('Whose is the black bag?','It is Daniel’s. It is his.'),
                    question('Where is Sarah’s blue bag?','At lost and found.'),
                    question('What is Sarah doing at the end?','She is going there.')
                ]
            }),
            comm('qa-board','The Q & A Game','Desembaralhe as perguntas, relacione-as às respostas e depois altere uma informação em cada par.',{
                scenario:'As perguntas sobre pessoas, roupas, posse e ações foram separadas das respostas.',
                pairs:[
                    {scrambled:'phone / Whose / this / is / ?',question:'Whose phone is this?',answer:'It’s hers.'},
                    {scrambled:'prefer / one / Which / you / do / ?',question:'Which one do you prefer?',answer:'I prefer the blue one.'},
                    {scrambled:'shoes / show / you / me / Can / the / ?',question:'Can you show me the shoes?',answer:'Of course. Here they are.'},
                    {scrambled:'doing / What / Sarah / is / ?',question:'What is Sarah doing?',answer:'She is waiting near the store.'},
                    {scrambled:'paying / they / Are / ?',question:'Are they paying?',answer:'No. They’re trying on jackets.'},
                    {scrambled:'friend / like / your / What / is / ?',question:'What is your friend like?',answer:'She’s friendly and funny.'},
                    {scrambled:'look / he / does / What / like / ?',question:'What does he look like?',answer:'He’s tall and has glasses.'},
                    {scrambled:'meeting / What / you / time / are / ?',question:'What time are you meeting?',answer:'At a quarter to seven.'}
                ]
            }),
            comm('practice','Update the live scene','Leia a situação, responda em voz alta e atualize a frase quando a ação mudar.',{
                eyebrow:'Live Scene',
                items:[
                    p('Describe','Nina · red dress · near the door','Nina is the woman in the red dress near the door.'),
                    p('Say what is happening','Nina · wait for Julia','Nina is waiting for Julia.'),
                    p('Update','Julia arrives; Nina talks to her now.','Nina isn’t waiting now. She is talking to Julia.'),
                    p('Describe','Leo · tall · beard · blue shirt','Leo is the tall man with a beard and a blue shirt.'),
                    p('Say what is happening','Leo · look for black wallet','Leo is looking for his black wallet.'),
                    p('Update','The wallet is under the chair; Leo picks it up.','Leo isn’t looking for it now. He is picking it up.'),
                    p('Identify possession','Blue bag: Sarah; black bag: Daniel','The blue bag is hers. The black one is his.'),
                    p('Confirm time','Original: 6:15 · new time: 6:45','We aren’t meeting at a quarter past six. We’re meeting at a quarter to seven.')
                ]
            }),
            comm('interview','Describe someone clearly','Responda sobre uma pessoa real ou inventada. O professor tentará identificar quem é.',{
                scenario:'Você descreve uma pessoa sem dizer o nome no início.',
                questions:['Is the person a man or a woman?','Is he or she tall or short?','What kind of hair does the person have?','Does he or she wear glasses?','What is the person wearing now?','What is he or she doing now?','What is the person like?','What time are you meeting this person?'],
                reportTask:'Junte as respostas em uma descrição contínua. Diga o nome somente depois da tentativa de identificação.',
                support:['He/She is...','He/She has...','He/She is wearing...','He/She is ...ing.','We’re meeting at...']
            })
        ],
        homework: homework('Prepare três produções usando somente as lições 16–19.', ['Uma escolha de roupas com várias opções', 'Uma situação de achados e perdidos', 'Uma cena com pessoas, ações e horários'], ['Usei one/ones e object pronouns.', 'Usei possessive pronouns e whose.', 'Usei Present Continuous, aparência e horários.'])
    }));
}());
