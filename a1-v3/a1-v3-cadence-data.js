(function installA1V3Cadence(globalScope) {
    'use strict';

    const data = globalScope.A1V3_DATA;
    if (!data) return;

    const clone = value => JSON.parse(JSON.stringify(value));
    const inheritedLessons = clone(data.lessons);
    const v = (word, meaning, example, translation) => [word, meaning, example, translation];
    const p = (type, prompt, hint, answer) => [type, prompt, hint, answer];
    const t = (portuguese, english) => [portuguese, english];
    const x = (phrase, meaning, note, example, translation) => [phrase, meaning, note, example, translation];
    const line = (speaker, english, portuguese) => [speaker, english, portuguese];
    const dialogue = (title, ...lines) => ({ title, lines });
    const reading = (title, text, ...questions) => ({ title, text, questions });
    const question = (prompt, answer) => [prompt, answer];

    const EXTRA_VOCAB = {
        4: [
            v('age', 'idade', 'I am twenty years old.', 'Eu tenho vinte anos.'),
            v('phone', 'telefone', 'My phone is on the table.', 'Meu telefone está sobre a mesa.')
        ],
        6: [
            v('zip code', 'CEP', 'What is your zip code?', 'Qual é o seu CEP?'),
            v('contact', 'contato', 'This is my contact information.', 'Estas são as minhas informações de contato.')
        ],
        13: [v('morning', 'manhã', 'She studies in the morning.', 'Ela estuda de manhã.')],
        14: [
            v('routine', 'rotina', 'What is his routine?', 'Qual é a rotina dele?'),
            v('weekday', 'dia útil', 'She works on weekdays.', 'Ela trabalha nos dias úteis.')
        ],
        16: [
            v('often', 'frequentemente', 'I often read at night.', 'Eu leio frequentemente à noite.'),
            v('hardly ever', 'quase nunca', 'He hardly ever watches TV.', 'Ele quase nunca assiste à TV.')
        ],
        17: [
            v('noon', 'meio-dia', 'We have lunch at noon.', 'Nós almoçamos ao meio-dia.'),
            v('midnight', 'meia-noite', 'The day ends at midnight.', 'O dia termina à meia-noite.')
        ],
        18: [v('grandparents', 'avós', 'Our grandparents live nearby.', 'Nossos avós moram perto.')],
        19: [
            v('office', 'escritório', 'The receptionist works in an office.', 'A recepcionista trabalha em um escritório.'),
            v('restaurant', 'restaurante', 'The cook works in a restaurant.', 'O cozinheiro trabalha em um restaurante.')
        ],
        22: [
            v('hospital', 'hospital', 'There is a hospital near the park.', 'Há um hospital perto do parque.'),
            v('post office', 'correio', 'The post office is across from the bank.', 'O correio fica em frente ao banco.')
        ],
        23: [
            v('cheese', 'queijo', 'There is some cheese in the bag.', 'Há um pouco de queijo na sacola.'),
            v('vegetables', 'legumes', 'We need some vegetables.', 'Nós precisamos de alguns legumes.')
        ],
        24: [
            v('cash', 'dinheiro em espécie', 'Can I pay in cash?', 'Posso pagar em dinheiro?'),
            v('card', 'cartão', 'Can I pay by card?', 'Posso pagar com cartão?')
        ],
        26: [v('practice', 'prática', 'You can practice before the show.', 'Você pode praticar antes do show.')],
        27: [
            v('walking', 'caminhando', 'She is walking to school.', 'Ela está caminhando para a escola.'),
            v('running', 'correndo', 'They are running in the park.', 'Eles estão correndo no parque.')
        ],
        28: [
            v('driving', 'dirigindo', 'He is driving now.', 'Ele está dirigindo agora.'),
            v('cleaning', 'limpando', 'We are cleaning the kitchen.', 'Nós estamos limpando a cozinha.')
        ],
        29: [
            v('at the store', 'na loja', 'I was at the store yesterday.', 'Eu estava na loja ontem.'),
            v('at the gym', 'na academia', 'They were at the gym last night.', 'Eles estavam na academia ontem à noite.')
        ]
    };

    const EXTRA_VOCAB_EXAMPLES = {
        4: {
            spell: [['Can you spell your name?', 'Você pode soletrar seu nome?'], ['Please spell SILVA.', 'Por favor, soletre SILVA.']],
            'last name': [['Her last name is Costa.', 'O sobrenome dela é Costa.']]
        },
        6: {
            'phone number': [['Please repeat your phone number.', 'Por favor, repita seu número de telefone.']],
            email: [['Check your email address.', 'Confira seu endereço de e-mail.']],
            address: [['My address is 20 King Street.', 'Meu endereço é King Street, 20.']]
        },
        13: {
            studies: [['He studies English at night.', 'Ele estuda inglês à noite.']],
            has: [['She has lunch at noon.', 'Ela almoça ao meio-dia.']],
            finishes: [['He finishes work at six.', 'Ele termina o trabalho às seis.']]
        },
        14: {
            does: [['Does she work here?', 'Ela trabalha aqui?']],
            'every day': [['I study every day.', 'Eu estudo todos os dias.']],
            early: [['Does he get up early?', 'Ele se levanta cedo?']]
        },
        16: {
            usually: [['We usually cook at home.', 'Nós geralmente cozinhamos em casa.'], ['She usually studies after dinner.', 'Ela geralmente estuda depois do jantar.']],
            never: [['They never arrive late.', 'Eles nunca chegam atrasados.']],
            'hardly ever': [['I hardly ever drink soda.', 'Eu quase nunca tomo refrigerante.']]
        },
        17: {
            'quarter to': [['It is a quarter to nine.', 'São quinze para as nove.']],
            'half past': [['The class starts at half past seven.', 'A aula começa às sete e meia.']]
        },
        19: {
            receptionist: [['The receptionist can help you.', 'A recepcionista pode ajudar você.']],
            'use a computer': [['Can you use a computer?', 'Você sabe usar um computador?']]
        },
        22: {
            'next to': [['The café is next to the pharmacy.', 'O café fica ao lado da farmácia.'], ['There are two stores next to the bank.', 'Há duas lojas ao lado do banco.']],
            'across from': [['The school is across from the park.', 'A escola fica em frente ao parque.'], ['Is the café across from the bank?', 'O café fica em frente ao banco?']]
        },
        23: {
            rice: [['Do we have any rice?', 'Nós temos arroz?']],
            'shopping list': [['Milk is on the shopping list.', 'Leite está na lista de compras.']]
        },
        24: {
            bill: [['Could I have the bill, please?', 'Eu poderia receber a conta, por favor?']],
            'anything else': [['Would you like anything else?', 'Você gostaria de mais alguma coisa?'], ['No, thank you. Nothing else.', 'Não, obrigado. Nada mais.']]
        },
        27: {
            waiting: [['We are waiting for the bus.', 'Nós estamos esperando o ônibus.'], ['Who is waiting outside?', 'Quem está esperando lá fora?']],
            'taking photos': [['She is taking photos in the park.', 'Ela está tirando fotos no parque.']]
        },
        28: {
            coming: [['Are you coming with us?', 'Você está vindo conosco?']],
            leaving: [['They are leaving now.', 'Eles estão saindo agora.']],
            working: [['Is he working today?', 'Ele está trabalhando hoje?']]
        },
        29: {
            yesterday: [['Where were you yesterday?', 'Onde você estava ontem?'], ['She was busy yesterday.', 'Ela estava ocupada ontem.']],
            'last night': [['Were they at home last night?', 'Eles estavam em casa ontem à noite?']]
        }
    };

    const EXTRA_DIALOGUES = {
        4: dialogue('Conferindo o cadastro', line('A', 'How do you spell your last name?', 'Como você soletra seu sobrenome?'), line('B', 'C-O-S-T-A.', 'C-O-S-T-A.')),
        13: dialogue('Depois do trabalho', line('A', 'What does Leo do at night?', 'O que o Leo faz à noite?'), line('B', 'He studies English.', 'Ele estuda inglês.')),
        14: dialogue('Fim de semana', line('A', 'Does she work on weekends?', 'Ela trabalha nos fins de semana?'), line('B', 'No, she doesn’t.', 'Não, ela não trabalha.')),
        16: dialogue('Frequência', line('A', 'How often do you cook?', 'Com que frequência você cozinha?'), line('B', 'I usually cook at home.', 'Eu geralmente cozinho em casa.')),
        17: dialogue('Horário da aula', line('A', 'What time does the class start?', 'Que horas a aula começa?'), line('B', 'At half past seven.', 'Às sete e meia.')),
        19: dialogue('Entrevista curta', line('A', 'Can you use a computer?', 'Você sabe usar um computador?'), line('B', 'Yes, I can.', 'Sim, sei.')),
        22: dialogue('Procurando o correio', line('A', 'Is there a post office near here?', 'Há um correio perto daqui?'), line('B', 'Yes. It is across from the bank.', 'Sim. Fica em frente ao banco.')),
        23: dialogue('Lista de compras', line('A', 'Do we have any rice?', 'Nós temos arroz?'), line('B', 'No. We need some rice.', 'Não. Precisamos de arroz.')),
        24: dialogue('Hora de pagar', line('A', 'Could I have the bill, please?', 'Eu poderia receber a conta, por favor?'), line('B', 'Of course. Cash or card?', 'Claro. Dinheiro ou cartão?')),
        27: dialogue('Na estação', line('A', 'What are they doing?', 'O que eles estão fazendo?'), line('B', 'They are waiting for the train.', 'Eles estão esperando o trem.')),
        28: dialogue('Ligação rápida', line('A', 'Are you working now?', 'Você está trabalhando agora?'), line('B', 'No, I’m coming home.', 'Não, estou indo para casa.')),
        29: dialogue('Ontem à noite', line('A', 'Were you at the gym last night?', 'Você estava na academia ontem à noite?'), line('B', 'No, I was at home.', 'Não, eu estava em casa.'))
    };

    function uniqueByEnglish(items) {
        const used = new Set();
        return items.filter(item => {
            const english = String(item[1] || '').trim().toLowerCase();
            if (!english || used.has(english)) return false;
            used.add(english);
            return true;
        });
    }

    function contextualPairs(spec) {
        return uniqueByEnglish([
            ...spec.expressions.map(item => [item[4], item[3]]),
            ...spec.dialogues.flatMap(item => item.lines.map(([, english, portuguese]) => [portuguese, english])),
            ...spec.intro.map(([, english, portuguese]) => [portuguese, english])
        ].filter(([portuguese, english]) => portuguese && english));
    }

    function buildVocabulary(spec) {
        const vocabulary = [...spec.vocab, ...(EXTRA_VOCAB[spec.number] || [])];
        const additions = EXTRA_VOCAB_EXAMPLES[spec.number] || {};
        return vocabulary.map(item => {
            const [word, meaning, example, translation] = item;
            const extra = additions[word] || [];
            if (!extra.length) return item;
            return [
                word,
                meaning,
                [example, ...extra.map(([english]) => english)],
                [translation, ...extra.map(([, portuguese]) => portuguese)]
            ];
        });
    }

    function buildExpressions(spec) {
        return [...spec.expressions];
    }

    function buildTranslations(spec) {
        return uniqueByEnglish(spec.translations);
    }

    function buildPractice(spec) {
        return [...spec.practice];
    }

    function buildDialogues(spec) {
        const dialogues = [...spec.dialogues];
        const extra = EXTRA_DIALOGUES[spec.number];
        if (extra && !dialogues.some(item => item.title === extra.title)) dialogues.push(extra);
        return dialogues;
    }

    function buildLesson(spec) {
        const inherited = clone(inheritedLessons[spec.source] || inheritedLessons[1]);
        const vocab = buildVocabulary(spec);
        const expressionsWithContext = buildExpressions(spec);
        const translations = buildTranslations(spec);
        const practice = buildPractice(spec);
        const dialogues = buildDialogues(spec);
        const expressionTranslations = expressionsWithContext
            .map(item => [item[4], item[3]])
            .filter(([portuguese, english]) => portuguese && english);

        return {
            ...inherited,
            number: spec.number,
            title: spec.title,
            objectives: spec.objectives,
            intro: spec.intro,
            vocab,
            grammar: spec.grammar,
            practice,
            labs: undefined,
            activitySections: spec.activitySections || null,
            translations,
            expressions: expressionsWithContext.map(item => item.slice(0, 4)),
            dialogues,
            reading: spec.reading,
            expressionTranslations,
            homework: {
                instruction: `Prepare uma produção curta sobre “${spec.title}”. Use somente a linguagem já apresentada até esta lição.`,
                themes: spec.homework,
                checklist: [
                    `Use a estrutura central: ${spec.grammar.title}.`,
                    'Inclua blocos da seção Useful Language que façam sentido no seu texto.',
                    'Leia ou ensaie a produção e refaça os trechos que ainda não estiverem naturais.'
                ]
            },
            cadence: {
                stage: spec.stage,
                newLanguage: spec.newLanguage,
                recycledLanguage: spec.recycledLanguage,
                deferredLanguage: spec.deferredLanguage || []
            }
        };
    }

    const specs = [
        {
            number: 1,
            source: 1,
            stage: 'Foundation 1',
            title: 'Hello! I Am, You Are',
            newLanguage: ['I am', 'you are', 'Are you...?'],
            recycledLanguage: [],
            deferredLanguage: ['he/she/it', 'we/they', 'do/does', 'question words'],
            objectives: [
                'Cumprimentar e despedir-se em uma primeira conversa.',
                'Dizer o próprio nome com I am e My name is.',
                'Perguntar e confirmar a identidade de outra pessoa com Are you...?'
            ],
            intro: [
                line('Mia', 'Hello! I am Mia.', 'Olá! Eu sou a Mia.'),
                line('Ben', 'Hi, Mia. I am Ben.', 'Oi, Mia. Eu sou o Ben.'),
                line('Mia', 'Are you a new student?', 'Você é um aluno novo?'),
                line('Ben', 'Yes, I am. Nice to meet you.', 'Sim, sou. Prazer em conhecer você.')
            ],
            vocab: [
                v('hello', 'olá', 'Hello! I am Mia.', 'Olá! Eu sou a Mia.'),
                v('hi', 'oi', 'Hi! I am Ben.', 'Oi! Eu sou o Ben.'),
                v('good morning', 'bom dia', 'Good morning, Ana.', 'Bom dia, Ana.'),
                v('name', 'nome', 'My name is Leo.', 'Meu nome é Leo.'),
                v('student', 'aluno(a)', 'I am a student.', 'Eu sou aluno.'),
                v('teacher', 'professor(a)', 'You are my teacher.', 'Você é meu professor.'),
                v('thanks', 'obrigado(a)', 'I am fine, thanks.', 'Estou bem, obrigado.'),
                v('goodbye', 'tchau', 'Goodbye! See you.', 'Tchau! Até mais.')
            ],
            grammar: {
                title: 'I am / You are',
                summary: 'Nesta primeira aula, use somente I am para falar de você e you are para falar diretamente com outra pessoa.',
                rows: [
                    ['eu', 'I am / I’m', 'I am Mia. / I’m a student.', 'Eu sou Mia. / Eu sou aluna.'],
                    ['você', 'You are / You’re', 'You are Ben. / You’re new.', 'Você é Ben. / Você é novo.'],
                    ['confirmação', 'Are you...?', 'Are you Leo? Yes, I am.', 'Você é o Leo? Sim, sou.']
                ],
                notes: [
                    'I sempre é escrito com letra maiúscula.',
                    'Use am somente com I e are somente com you nesta etapa.',
                    'As outras pessoas e formas do verbo serão apresentadas nas próximas aulas.'
                ]
            },
            practice: [
                p('Complete', 'I ___ Mia.', 'I + am', 'am'),
                p('Complete', 'You ___ my teacher.', 'you + are', 'are'),
                p('Build', 'am / I / Ben', 'comece com I', 'I am Ben.'),
                p('Choose', '___ you a new student? (Am / Are)', 'pergunta com you', 'Are you a new student?'),
                p('Answer', 'Are you Ana?', 'resposta positiva', 'Yes, I am.'),
                p('Correct', 'I are ready.', 'I usa am', 'I am ready.'),
                p('Build', 'name / My / is / Leo', 'comece com My', 'My name is Leo.'),
                p('Answer', 'Nice to meet you.', 'resposta social', 'Nice to meet you too.')
            ],
            translations: [
                t('Olá! Eu sou a Mia.', 'Hello! I am Mia.'),
                t('Meu nome é Ben.', 'My name is Ben.'),
                t('Você é aluno?', 'Are you a student?'),
                t('Sim, sou.', 'Yes, I am.'),
                t('Você é meu professor.', 'You are my teacher.'),
                t('Tchau! Até mais.', 'Goodbye! See you.')
            ],
            expressions: [
                x('Nice to meet you.', 'Prazer em conhecer você.', 'Use no primeiro encontro.', 'Nice to meet you, Mia.', 'Prazer em conhecer você, Mia.'),
                x('Nice to meet you too.', 'Prazer em conhecer você também.', 'Resposta ao primeiro encontro.', 'Nice to meet you too, Ben.', 'Prazer em conhecer você também, Ben.'),
                x('How are you?', 'Como você está?', 'Use como bloco social; a estrutura será aprofundada depois.', 'Hi, Ana. How are you?', 'Oi, Ana. Como você está?'),
                x('See you.', 'Até mais.', 'Despedida curta e frequente.', 'Goodbye, Leo. See you.', 'Tchau, Leo. Até mais.')
            ],
            dialogues: [
                dialogue('Primeiro encontro', line('A', 'Hello! I am Eva.', 'Olá! Eu sou a Eva.'), line('B', 'Hi, Eva. I am Tom.', 'Oi, Eva. Eu sou o Tom.')),
                dialogue('Na porta da sala', line('A', 'Are you a new student?', 'Você é um aluno novo?'), line('B', 'Yes, I am.', 'Sim, sou.')),
                dialogue('Apresentação', line('A', 'My name is Lia.', 'Meu nome é Lia.'), line('B', 'Nice to meet you, Lia.', 'Prazer em conhecer você, Lia.')),
                dialogue('Despedida', line('A', 'Goodbye, Ben.', 'Tchau, Ben.'), line('B', 'See you, Mia.', 'Até mais, Mia.'))
            ],
            reading: reading(
                'A first hello',
                '“Hello! I am Mia. I am a new student.” “Hi, Mia. I am Ben. Are you in English class?” “Yes, I am.” “Nice to meet you.”',
                question('Is Mia a new student?', 'Yes.'),
                question('Is Ben in English class?', 'Yes.'),
                question('Complete: Nice to ___ you.', 'meet')
            ),
            homework: ['Uma apresentação de três frases', 'Um diálogo de primeiro encontro', 'Um áudio com cumprimento e despedida']
        },
        {
            number: 2,
            source: 27,
            stage: 'Foundation 2',
            title: 'He Is, She Is: Countries',
            newLanguage: ['he is', 'she is', 'Where is ... from?'],
            recycledLanguage: ['I am', 'you are'],
            deferredLanguage: ['we/they', 'all question words', 'nationality spelling rules'],
            objectives: [
                'Identificar um homem e uma mulher com he e she.',
                'Dizer de qual país uma pessoa é e reconhecer sua nacionalidade.',
                'Fazer uma pergunta previsível com Where is ... from?'
            ],
            intro: [
                line('Mia', 'This is Ken. He is from Japan. He is Japanese.', 'Este é o Ken. Ele é do Japão. Ele é japonês.'),
                line('Ben', 'And this is Sofia. She is from Brazil. She is Brazilian.', 'E esta é a Sofia. Ela é do Brasil. Ela é brasileira.'),
                line('Mia', 'Where is Ken from?', 'De onde o Ken é?'),
                line('Ben', 'He is from Japan.', 'Ele é do Japão.')
            ],
            vocab: [
                v('Brazil / Brazilian', 'Brasil / brasileiro(a)', ['She is from Brazil.', 'She is Brazilian.'], ['Ela é do Brasil.', 'Ela é brasileira.']),
                v('Japan / Japanese', 'Japão / japonês(a)', ['He is from Japan.', 'He is Japanese.'], ['Ele é do Japão.', 'Ele é japonês.']),
                v('Mexico / Mexican', 'México / mexicano(a)', ['He is from Mexico.', 'He is Mexican.'], ['Ele é do México.', 'Ele é mexicano.']),
                v('Canada / Canadian', 'Canadá / canadense', ['She is from Canada.', 'She is Canadian.'], ['Ela é do Canadá.', 'Ela é canadense.']),
                v('Italy / Italian', 'Itália / italiano(a)', ['He is from Italy.', 'He is Italian.'], ['Ele é da Itália.', 'Ele é italiano.']),
                v('United Kingdom / British', 'Reino Unido / britânico(a)', ['She is from the United Kingdom.', 'She is British.'], ['Ela é do Reino Unido.', 'Ela é britânica.']),
                v('United States / American', 'Estados Unidos / americano(a)', ['He is from the United States.', 'He is American.'], ['Ele é dos Estados Unidos.', 'Ele é americano.']),
                v('Spain / Spanish', 'Espanha / espanhol(a)', ['She is from Spain.', 'She is Spanish.'], ['Ela é da Espanha.', 'Ela é espanhola.']),
                v('country', 'país', 'Brazil is a country.', 'O Brasil é um país.'),
                v('from', 'de; vindo de', 'I am from Recife.', 'Eu sou de Recife.'),
                v('where', 'onde; de onde', 'Where is she from?', 'De onde ela é?')
            ],
            grammar: {
                title: 'He is / She is',
                summary: 'Acrescente duas pessoas novas à linguagem: he para um homem ou menino e she para uma mulher ou menina.',
                rows: [
                    ['ele', 'He is / He’s', 'He is Ken. He is from Japan.', 'Ele é o Ken. Ele é do Japão.'],
                    ['ela', 'She is / She’s', 'She is Sofia. She is from Brazil.', 'Ela é a Sofia. Ela é do Brasil.'],
                    ['origem', 'Where is + pessoa + from?', 'Where is Ana from?', 'De onde a Ana é?']
                ],
                notes: [
                    'Use he para uma pessoa masculina e she para uma pessoa feminina.',
                    'Depois de he e she, use is — nunca am ou are.',
                    'Nomes de países e nacionalidades começam com letra maiúscula em inglês.',
                    'Nesta aula, where aparece somente no bloco Where is ... from?'
                ]
            },
            practice: [
                p('Complete', 'Ken is from Japan. ___ is Japanese.', 'Ken = he', 'He'),
                p('Complete', 'Sofia is from Brazil. ___ is Brazilian.', 'Sofia = she', 'She'),
                p('Choose', 'He ___ from Mexico. (am / is)', 'he + is', 'is'),
                p('Choose', 'She ___ from Canada. (is / are)', 'she + is', 'is'),
                p('Build', 'from / is / Where / he / ?', 'bloco de origem', 'Where is he from?'),
                p('Answer', 'Where is Ana from? Brazil.', 'she', 'She is from Brazil.'),
                p('Correct', 'He are from Italy.', 'he usa is', 'He is from Italy.'),
                p('Transform', 'I am from Japan. → Ken', 'I muda para he', 'He is from Japan.')
            ],
            translations: [
                t('Ele é do Japão.', 'He is from Japan.'),
                t('Ela é do Brasil.', 'She is from Brazil.'),
                t('De onde ele é?', 'Where is he from?'),
                t('De onde a Sofia é?', 'Where is Sofia from?'),
                t('Ele é o Ken.', 'He is Ken.'),
                t('Ela é a Ana.', 'She is Ana.')
            ],
            expressions: [
                x('Where are you from?', 'De onde você é?', 'Pergunta direta para a pessoa.', 'Hi, Leo. Where are you from?', 'Oi, Leo. De onde você é?'),
                x('I’m from...', 'Eu sou de...', 'Resposta sobre sua própria origem.', 'I’m from Brazil.', 'Eu sou do Brasil.'),
                x('He’s from...', 'Ele é de...', 'Use para falar de um homem ou menino.', 'He’s from Canada.', 'Ele é do Canadá.'),
                x('She’s from...', 'Ela é de...', 'Use para falar de uma mulher ou menina.', 'She’s from Mexico.', 'Ela é do México.')
            ],
            dialogues: [
                dialogue('Novo colega', line('A', 'This is Ken.', 'Este é o Ken.'), line('B', 'Where is he from?', 'De onde ele é?')),
                dialogue('Resposta', line('A', 'Where is Ken from?', 'De onde o Ken é?'), line('B', 'He is from Japan.', 'Ele é do Japão.')),
                dialogue('Nova colega', line('A', 'This is Sofia.', 'Esta é a Sofia.'), line('B', 'She is from Brazil.', 'Ela é do Brasil.')),
                dialogue('Pergunta direta', line('A', 'Where are you from?', 'De onde você é?'), line('B', 'I’m from Canada.', 'Eu sou do Canadá.'))
            ],
            reading: reading(
                'Four name cards',
                'Ken: Japan. Sofia: Brazil. Leo: Italy. Emma: Canada. “I am Ken. I am from Japan.” “I am Sofia. I am from Brazil.”',
                question('Where is Ken from?', 'He is from Japan.'),
                question('Where is Sofia from?', 'She is from Brazil.'),
                question('Where is Emma from?', 'She is from Canada.')
            ),
            homework: ['Quatro cartões de pessoas e países', 'Uma apresentação de duas pessoas', 'Perguntas e respostas sobre origem']
        },
        {
            number: 3,
            source: 3,
            stage: 'Foundation 3',
            title: 'My World: Family and Possessives',
            newLanguage: ['my/your', 'his/her', 'Who is...?'],
            recycledLanguage: ['I am', 'you are', 'he is', 'she is'],
            deferredLanguage: ['have/has', 'possessive ’s', 'we/they'],
            objectives: [
                'Nomear familiares próximos.',
                'Usar my, your, his e her antes de um substantivo.',
                'Perguntar quem é uma pessoa com Who is...?'
            ],
            intro: [
                line('Mia', 'This is my family.', 'Esta é a minha família.'),
                line('Ben', 'Who is he?', 'Quem é ele?'),
                line('Mia', 'He is my brother. His name is Leo.', 'Ele é meu irmão. O nome dele é Leo.'),
                line('Ben', 'And who is she?', 'E quem é ela?')
            ],
            vocab: [
                v('mother', 'mãe', 'She is my mother.', 'Ela é minha mãe.'),
                v('father', 'pai', 'He is my father.', 'Ele é meu pai.'),
                v('brother', 'irmão', 'Leo is my brother.', 'Leo é meu irmão.'),
                v('sister', 'irmã', 'Ana is my sister.', 'Ana é minha irmã.'),
                v('friend', 'amigo(a)', 'You are my friend.', 'Você é meu amigo.'),
                v('family', 'família', 'This is my family.', 'Esta é a minha família.'),
                v('photo', 'foto', 'This is her photo.', 'Esta é a foto dela.'),
                v('who', 'quem', 'Who is she?', 'Quem é ela?')
            ],
            grammar: {
                title: 'My, your, his and her',
                summary: 'Use um possessivo antes do substantivo para mostrar de quem é a pessoa ou coisa.',
                rows: [
                    ['eu / você', 'my / your + noun', 'My sister / your brother', 'Minha irmã / seu irmão'],
                    ['ele', 'his + noun', 'His name is Leo.', 'O nome dele é Leo.'],
                    ['ela', 'her + noun', 'Her mother is Ana.', 'A mãe dela é Ana.'],
                    ['identidade', 'Who is he/she?', 'Who is she? She is my sister.', 'Quem é ela? Ela é minha irmã.']
                ],
                notes: [
                    'My, your, his e her aparecem antes do substantivo.',
                    'His combina com o dono masculino; her combina com a dona feminina.',
                    'Have/has e o possessivo com ’s ficarão para uma aula posterior.'
                ]
            },
            practice: [
                p('Complete', 'I am Mia. Leo is ___ brother.', 'meu', 'my'),
                p('Complete', 'You are Ben. Ana is ___ sister.', 'sua', 'your'),
                p('Complete', 'He is Leo. ___ mother is Eva.', 'dele', 'His'),
                p('Complete', 'She is Ana. ___ father is Tom.', 'dela', 'Her'),
                p('Answer', 'Who is he?', 'meu pai', 'He is my father.'),
                p('Build', 'is / sister / my / She', 'ela é...', 'She is my sister.'),
                p('Choose', 'Sofia is here. (His / Her) brother is here too.', 'dela', 'Her'),
                p('Correct', 'He is her brother. His name is Nina.', 'Nina é mulher', 'Her name is Nina.')
            ],
            translations: [
                t('Esta é a minha família.', 'This is my family.'),
                t('Ele é meu irmão.', 'He is my brother.'),
                t('O nome dele é Leo.', 'His name is Leo.'),
                t('Ela é minha irmã.', 'She is my sister.'),
                t('A mãe dela é Ana.', 'Her mother is Ana.'),
                t('Quem é ela?', 'Who is she?')
            ],
            expressions: [
                x('This is my...', 'Este(a) é meu/minha...', 'Use para apresentar alguém.', 'This is my sister, Ana.', 'Esta é minha irmã, Ana.'),
                x('Who is he?', 'Quem é ele?', 'Pergunta sobre um homem ou menino.', 'Who is he in the photo?', 'Quem é ele na foto?'),
                x('Who is she?', 'Quem é ela?', 'Pergunta sobre uma mulher ou menina.', 'Who is she next to Leo?', 'Quem é ela ao lado do Leo?'),
                x('He/She is my...', 'Ele/Ela é meu/minha...', 'Resposta simples sobre relação.', 'She is my friend.', 'Ela é minha amiga.')
            ],
            dialogues: [
                dialogue('Foto de família', line('A', 'Who is he?', 'Quem é ele?'), line('B', 'He is my father.', 'Ele é meu pai.')),
                dialogue('Irmã', line('A', 'Who is she?', 'Quem é ela?'), line('B', 'She is my sister.', 'Ela é minha irmã.')),
                dialogue('Nome dele', line('A', 'His name is Leo.', 'O nome dele é Leo.'), line('B', 'He is my friend.', 'Ele é meu amigo.')),
                dialogue('Nome dela', line('A', 'Her name is Ana.', 'O nome dela é Ana.'), line('B', 'She is my teacher.', 'Ela é minha professora.'))
            ],
            reading: reading(
                'Mia’s photo',
                '“I am Mia. This is my family. This is my mother, Eva. This is my father, Tom. This is my brother, Leo. His photo is next to her photo.”',
                question('Who is Eva?', 'She is Mia’s mother.'),
                question('Who is Tom?', 'He is Mia’s father.'),
                question('Who is Leo?', 'He is Mia’s brother.')
            ),
            homework: ['Uma foto com três pessoas', 'Um mapa simples da família', 'Uma apresentação de dois amigos']
        },
        {
            number: 4,
            source: 2,
            stage: 'Foundation 4',
            title: 'Alphabet and Numbers: Your Name',
            newLanguage: ['alphabet', 'numbers 0–20', 'How do you spell...?'],
            recycledLanguage: ['I am', 'my name is', 'your name'],
            deferredLanguage: ['address', 'email', 'numbers above 20', 'multiple personal questions'],
            objectives: [
                'Reconhecer e pronunciar letras do alfabeto.',
                'Usar números de zero a vinte.',
                'Perguntar e informar a grafia de um nome.'
            ],
            intro: [
                line('Clerk', 'What is your name?', 'Qual é o seu nome?'),
                line('Mia', 'My name is Mia Costa.', 'Meu nome é Mia Costa.'),
                line('Clerk', 'How do you spell Mia?', 'Como se soletra Mia?'),
                line('Mia', 'M-I-A.', 'M-I-A.')
            ],
            vocab: [
                v('letter', 'letra', 'A is a letter.', 'A é uma letra.'),
                v('alphabet', 'alfabeto', 'The English alphabet has twenty-six letters.', 'O alfabeto inglês tem vinte e seis letras.'),
                v('spell', 'soletrar', 'Please spell your name.', 'Por favor, soletre seu nome.'),
                v('zero', 'zero', 'The first number is zero.', 'O primeiro número é zero.'),
                v('ten', 'dez', 'My card has number ten.', 'Meu cartão tem o número dez.'),
                v('twenty', 'vinte', 'Ben is twenty.', 'Ben tem vinte anos.'),
                v('first name', 'primeiro nome', 'My first name is Mia.', 'Meu primeiro nome é Mia.'),
                v('last name', 'sobrenome', 'My last name is Costa.', 'Meu sobrenome é Costa.')
            ],
            grammar: {
                title: 'What is your name? / How do you spell...?',
                summary: 'Aprenda duas perguntas completas como blocos. O objetivo é identificar e soletrar nomes, sem estudar ainda todas as question words.',
                rows: [
                    ['nome', 'What is your name?', 'My name is Mia.', 'Qual é seu nome? Meu nome é Mia.'],
                    ['grafia', 'How do you spell + name?', 'How do you spell Mia? M-I-A.', 'Como se soletra Mia? M-I-A.'],
                    ['idade até 20', 'I am + number.', 'I am nineteen.', 'Eu tenho dezenove anos.']
                ],
                notes: [
                    'Memorize as duas perguntas como expressões completas.',
                    'Em inglês, a idade usa o verbo be: I am nineteen.',
                    'Endereço, telefone e e-mail serão praticados depois da primeira revisão.'
                ]
            },
            practice: [
                p('Spell', 'Mia', 'diga as letras', 'M-I-A'),
                p('Spell', 'Ben', 'diga as letras', 'B-E-N'),
                p('Complete', 'What is your ___?', 'nome', 'name'),
                p('Complete', 'How do you ___ Costa?', 'soletrar', 'spell'),
                p('Build', 'name / My / is / Ana', 'resposta', 'My name is Ana.'),
                p('Number', '12', 'escreva em inglês', 'twelve'),
                p('Number', '19', 'escreva em inglês', 'nineteen'),
                p('Answer', 'How do you spell Leo?', 'letras', 'L-E-O.')
            ],
            translations: [
                t('Qual é seu nome?', 'What is your name?'),
                t('Meu nome é Ana.', 'My name is Ana.'),
                t('Como se soletra Leo?', 'How do you spell Leo?'),
                t('L-E-O.', 'L-E-O.'),
                t('Eu tenho dezoito anos.', 'I am eighteen.'),
                t('Meu sobrenome é Costa.', 'My last name is Costa.')
            ],
            expressions: [
                x('What is your name?', 'Qual é seu nome?', 'Pergunta de identificação.', 'Hello. What is your name?', 'Olá. Qual é seu nome?'),
                x('My name is...', 'Meu nome é...', 'Resposta de identificação.', 'My name is Mia Costa.', 'Meu nome é Mia Costa.'),
                x('How do you spell...?', 'Como se soletra...?', 'Pergunta sobre grafia.', 'How do you spell Costa?', 'Como se soletra Costa?'),
                x('Please repeat.', 'Repita, por favor.', 'Use quando não entender uma letra ou número.', 'Sorry. Please repeat.', 'Desculpe. Repita, por favor.')
            ],
            dialogues: [
                dialogue('Nome', line('A', 'What is your name?', 'Qual é seu nome?'), line('B', 'My name is Lia.', 'Meu nome é Lia.')),
                dialogue('Grafia', line('A', 'How do you spell Lia?', 'Como se soletra Lia?'), line('B', 'L-I-A.', 'L-I-A.')),
                dialogue('Número', line('A', 'Is it number twelve?', 'É o número doze?'), line('B', 'Yes, twelve.', 'Sim, doze.')),
                dialogue('Repetição', line('A', 'Please repeat.', 'Repita, por favor.'), line('B', 'B-E-N.', 'B-E-N.'))
            ],
            reading: reading(
                'Three name tags',
                'Name tag 1: MIA — number eight. Name tag 2: BEN — number twelve. Name tag 3: ANA — number nineteen.',
                question('Which name is on number eight?', 'Mia is on number eight.'),
                question('How do you spell Ben?', 'B-E-N.'),
                question('Which number is Ana?', 'Ana is number nineteen.')
            ),
            homework: ['Seu nome e sobrenome soletrados', 'Cartões com números de zero a vinte', 'Um minidiálogo de matrícula']
        },
        {
            number: 6,
            source: 2,
            stage: 'Foundation 5',
            title: 'Contact Details',
            newLanguage: ['numbers 20–100', 'phone/email/address', 'contact confirmation'],
            recycledLanguage: ['alphabet', 'What is...?', 'How do you spell...?'],
            deferredLanguage: ['do/does as a grammar system', 'open personal interviews'],
            objectives: [
                'Informar telefone, e-mail e endereço.',
                'Compreender números frequentes em dados de contato.',
                'Pedir repetição ou confirmação de uma informação.'
            ],
            intro: [
                line('Clerk', 'What is your phone number?', 'Qual é seu número de telefone?'),
                line('Mia', 'It is 555-2038.', 'É 555-2038.'),
                line('Clerk', 'And your email?', 'E seu e-mail?'),
                line('Mia', 'It is mia@email.com.', 'É mia@email.com.')
            ],
            vocab: [
                v('phone number', 'número de telefone', 'My phone number is 555-2038.', 'Meu número de telefone é 555-2038.'),
                v('email', 'e-mail', 'My email is mia@email.com.', 'Meu e-mail é mia@email.com.'),
                v('address', 'endereço', 'My address is 20 King Street.', 'Meu endereço é Rua King, 20.'),
                v('street', 'rua', 'I am on Green Street.', 'Eu estou na Rua Green.'),
                v('number', 'número', 'Please check the number.', 'Por favor, confira o número.'),
                v('form', 'formulário', 'Complete the contact form.', 'Preencha o formulário de contato.'),
                v('repeat', 'repetir', 'Please repeat the email.', 'Por favor, repita o e-mail.'),
                v('check', 'conferir', 'Check your phone number.', 'Confira seu número de telefone.')
            ],
            grammar: {
                title: 'What is your phone number / email / address?',
                summary: 'Reutilize a pergunta What is your...? e troque apenas a informação necessária. Não é preciso aprender novas estruturas nesta aula.',
                rows: [
                    ['telefone', 'What is your phone number?', 'It is 555-2038.', 'Qual é seu telefone? É 555-2038.'],
                    ['e-mail', 'What is your email?', 'It is mia@email.com.', 'Qual é seu e-mail? É mia@email.com.'],
                    ['endereço', 'What is your address?', 'It is 20 King Street.', 'Qual é seu endereço? É Rua King, 20.']
                ],
                notes: [
                    'Diga números de telefone em grupos curtos.',
                    'Use at para @ e dot para o ponto ao ditar um e-mail.',
                    'A forma It is funciona como resposta para os três dados.'
                ]
            },
            practice: [
                p('Complete', 'What is your phone ___?', 'número', 'number'),
                p('Answer', 'What is your email?', 'mia@email.com', 'It is mia@email.com.'),
                p('Answer', 'What is your address?', '20 King Street', 'It is 20 King Street.'),
                p('Number', '35', 'escreva em inglês', 'thirty-five'),
                p('Number', '82', 'escreva em inglês', 'eighty-two'),
                p('Build', 'repeat / Please / the / number', 'pedido', 'Please repeat the number.'),
                p('Complete', 'mia ___ email dot com', 'símbolo @', 'at'),
                p('Correct', 'My email are mia@email.com.', 'resposta singular', 'My email is mia@email.com.')
            ],
            translations: [
                t('Qual é seu número de telefone?', 'What is your phone number?'),
                t('É 555-2038.', 'It is 555-2038.'),
                t('Qual é seu e-mail?', 'What is your email?'),
                t('Meu endereço é Rua King, 20.', 'My address is 20 King Street.'),
                t('Repita o número, por favor.', 'Please repeat the number.'),
                t('Confira o formulário.', 'Check the form.')
            ],
            expressions: [
                x('What is your phone number?', 'Qual é seu telefone?', 'Pergunta de contato.', 'What is your phone number, please?', 'Qual é seu número de telefone, por favor?'),
                x('What is your email?', 'Qual é seu e-mail?', 'Pergunta de contato digital.', 'What is your email, Mia?', 'Qual é seu e-mail, Mia?'),
                x('Could you repeat that?', 'Poderia repetir?', 'Pedido educado de repetição.', 'Sorry, could you repeat that?', 'Desculpe, poderia repetir?'),
                x('Let me check.', 'Deixe-me conferir.', 'Use antes de confirmar um dado.', 'Let me check the number.', 'Deixe-me conferir o número.')
            ],
            dialogues: [
                dialogue('Telefone', line('A', 'What is your phone number?', 'Qual é seu telefone?'), line('B', 'It is 555-2038.', 'É 555-2038.')),
                dialogue('E-mail', line('A', 'What is your email?', 'Qual é seu e-mail?'), line('B', 'It is mia@email.com.', 'É mia@email.com.')),
                dialogue('Endereço', line('A', 'What is your address?', 'Qual é seu endereço?'), line('B', 'It is 20 King Street.', 'É Rua King, 20.')),
                dialogue('Confirmação', line('A', 'Could you repeat that?', 'Poderia repetir?'), line('B', 'Yes. Fifty-five.', 'Sim. Cinquenta e cinco.'))
            ],
            reading: reading(
                'A contact card',
                'Name: Mia Costa. Phone: 555-2038. Email: mia@email.com. Address: 20 King Street. Check: M-I-A C-O-S-T-A.',
                question('What is Mia’s last name?', 'Her last name is Costa.'),
                question('What is her phone number?', 'It is 555-2038.'),
                question('What is her address?', 'It is 20 King Street.')
            ),
            homework: ['Um cartão de contato fictício', 'Um formulário com três pessoas', 'Um diálogo para confirmar telefone e e-mail']
        },
        {
            number: 7,
            source: 18,
            stage: 'Foundation 6',
            title: 'Everyday Objects: A and An',
            newLanguage: ['a/an', 'It is...', 'What is it?'],
            recycledLanguage: ['numbers', 'my/your'],
            deferredLanguage: ['this/that', 'these/those', 'there is/are'],
            objectives: [
                'Nomear objetos comuns de sala e de casa.',
                'Usar a ou an antes de um substantivo singular.',
                'Identificar um objeto com It is...'
            ],
            intro: [
                line('Teacher', 'What is it?', 'O que é isso?'),
                line('Mia', 'It is a notebook.', 'É um caderno.'),
                line('Teacher', 'And this?', 'E isto?'),
                line('Mia', 'It is an eraser.', 'É uma borracha.')
            ],
            vocab: [
                v('book', 'livro', 'It is a book.', 'É um livro.'),
                v('notebook', 'caderno', 'It is my notebook.', 'É meu caderno.'),
                v('pen', 'caneta', 'It is a blue pen.', 'É uma caneta azul.'),
                v('pencil', 'lápis', 'It is a pencil.', 'É um lápis.'),
                v('eraser', 'borracha', 'It is an eraser.', 'É uma borracha.'),
                v('key', 'chave', 'It is my key.', 'É minha chave.'),
                v('bag', 'bolsa; mochila', 'It is your bag.', 'É sua bolsa.'),
                v('umbrella', 'guarda-chuva', 'It is an umbrella.', 'É um guarda-chuva.')
            ],
            grammar: {
                title: 'A / an + singular object',
                summary: 'Use a antes de som consonantal e an antes de som vocálico. Nesta aula, todos os objetos estão no singular.',
                rows: [
                    ['som consonantal', 'a + noun', 'a book / a pen / a key', 'um livro / uma caneta / uma chave'],
                    ['som vocálico', 'an + noun', 'an eraser / an umbrella', 'uma borracha / um guarda-chuva'],
                    ['identificação', 'It is + a/an + noun.', 'It is a notebook.', 'É um caderno.']
                ],
                notes: [
                    'A escolha depende do som inicial, não somente da letra.',
                    'Use it para um objeto singular.',
                    'This e that serão apresentados na próxima aula.'
                ]
            },
            practice: [
                p('Choose', '___ book (a / an)', 'som /b/', 'a book'),
                p('Choose', '___ eraser (a / an)', 'som vocálico', 'an eraser'),
                p('Complete', 'It is ___ umbrella.', 'som vocálico', 'an'),
                p('Complete', 'It ___ a key.', 'it + is', 'is'),
                p('Answer', 'What is it? (notebook)', 'frase completa', 'It is a notebook.'),
                p('Build', 'is / It / pen / a', 'identificação', 'It is a pen.'),
                p('Correct', 'It is an book.', 'som consonantal', 'It is a book.'),
                p('Correct', 'It are a bag.', 'it usa is', 'It is a bag.')
            ],
            translations: [
                t('É um livro.', 'It is a book.'),
                t('É uma borracha.', 'It is an eraser.'),
                t('É meu caderno.', 'It is my notebook.'),
                t('É sua bolsa.', 'It is your bag.'),
                t('O que é isso?', 'What is it?'),
                t('É um guarda-chuva.', 'It is an umbrella.')
            ],
            expressions: [
                x('What is it?', 'O que é isso?', 'Pergunta sobre um objeto não identificado.', 'What is it? Is it a key?', 'O que é isso? É uma chave?'),
                x('It is a/an...', 'É um/uma...', 'Resposta de identificação.', 'It is an eraser.', 'É uma borracha.'),
                x('Is it your...?', 'É seu/sua...?', 'Pergunta para devolver um objeto.', 'Is it your notebook?', 'É seu caderno?'),
                x('Yes, it is.', 'Sim, é.', 'Confirmação curta sobre objeto.', 'Yes, it is my bag.', 'Sim, é minha bolsa.')
            ],
            dialogues: [
                dialogue('Na mesa', line('A', 'What is it?', 'O que é isso?'), line('B', 'It is a pen.', 'É uma caneta.')),
                dialogue('Borracha', line('A', 'Is it an eraser?', 'É uma borracha?'), line('B', 'Yes, it is.', 'Sim, é.')),
                dialogue('Objeto perdido', line('A', 'Is it your key?', 'É sua chave?'), line('B', 'Yes, it is my key.', 'Sim, é minha chave.')),
                dialogue('Na mochila', line('A', 'It is a notebook.', 'É um caderno.'), line('B', 'It is my notebook.', 'É meu caderno.'))
            ],
            reading: reading(
                'Objects on a desk',
                'A book is on the desk. A blue pen is next to the book. An eraser is next to the pen. A key is under the book. It is her key.',
                question('What is on the desk?', 'A book, a pen, an eraser, and a key.'),
                question('What color is the pen?', 'It is blue.'),
                question('Is the key under the book?', 'Yes, it is.')
            ),
            homework: ['Oito objetos da sua mesa', 'Etiquetas com a ou an', 'Um diálogo sobre um objeto perdido']
        },
        {
            number: 8,
            source: 15,
            stage: 'Foundation 7',
            title: 'This and That',
            newLanguage: ['this', 'that', 'Is this/that...?'],
            recycledLanguage: ['a/an', 'it is', 'objects'],
            deferredLanguage: ['these/those', 'plural nouns'],
            objectives: [
                'Diferenciar um objeto perto e um objeto mais distante.',
                'Usar this e that somente com substantivos singulares.',
                'Perguntar e confirmar a identidade de um objeto.'
            ],
            intro: [
                line('Mia', 'What is this?', 'O que é isto?'),
                line('Ben', 'This is a key.', 'Isto é uma chave.'),
                line('Mia', 'And what is that?', 'E o que é aquilo?'),
                line('Ben', 'That is an umbrella.', 'Aquilo é um guarda-chuva.')
            ],
            vocab: [
                v('this', 'isto; este(a)', 'This is my pen.', 'Esta é minha caneta.'),
                v('that', 'aquilo; aquele(a)', 'That is your bag.', 'Aquela é sua bolsa.'),
                v('near', 'perto', 'This book is near me.', 'Este livro está perto de mim.'),
                v('far', 'longe', 'That chair is far.', 'Aquela cadeira está longe.'),
                v('chair', 'cadeira', 'That is a chair.', 'Aquilo é uma cadeira.'),
                v('table', 'mesa', 'This is a table.', 'Isto é uma mesa.'),
                v('door', 'porta', 'That is the door.', 'Aquela é a porta.'),
                v('window', 'janela', 'This is a window.', 'Isto é uma janela.')
            ],
            grammar: {
                title: 'This is / That is',
                summary: 'Use this para uma coisa singular perto e that para uma coisa singular mais distante.',
                rows: [
                    ['perto', 'This is + singular noun.', 'This is a pen.', 'Isto é uma caneta.'],
                    ['distante', 'That is + singular noun.', 'That is a chair.', 'Aquilo é uma cadeira.'],
                    ['pergunta', 'Is this/that...?', 'Is that your bag?', 'Aquela é sua bolsa?']
                ],
                notes: [
                    'This e that nesta aula sempre indicam uma coisa singular.',
                    'Use is depois dos dois demonstrativos.',
                    'These e those serão ensinados separadamente na próxima aula.'
                ]
            },
            practice: [
                p('Choose', 'Objeto na sua mão: (This / That) is a key.', 'perto', 'This is a key.'),
                p('Choose', 'Objeto do outro lado da sala: (This / That) is a chair.', 'distante', 'That is a chair.'),
                p('Complete', '___ is my pen here.', 'perto', 'This'),
                p('Complete', '___ is the door over there.', 'distante', 'That'),
                p('Build', 'this / Is / notebook / your / ?', 'pergunta', 'Is this your notebook?'),
                p('Answer', 'Is that your bag?', 'negativa curta', 'No, it is not.'),
                p('Correct', 'This are a table.', 'singular', 'This is a table.'),
                p('Correct', 'That is an chair.', 'som consonantal', 'That is a chair.')
            ],
            translations: [
                t('Isto é uma caneta.', 'This is a pen.'),
                t('Aquilo é uma cadeira.', 'That is a chair.'),
                t('Este é meu caderno.', 'This is my notebook.'),
                t('Aquela é sua bolsa.', 'That is your bag.'),
                t('Esta é sua chave?', 'Is this your key?'),
                t('Aquilo não é uma janela.', 'That is not a window.')
            ],
            expressions: [
                x('What is this?', 'O que é isto?', 'Pergunta sobre algo perto.', 'What is this on the table?', 'O que é isto sobre a mesa?'),
                x('What is that?', 'O que é aquilo?', 'Pergunta sobre algo distante.', 'What is that near the door?', 'O que é aquilo perto da porta?'),
                x('Is this yours?', 'Isto é seu?', 'Pergunta curta sobre posse.', 'Excuse me, is this yours?', 'Com licença, isto é seu?'),
                x('Over there', 'ali; lá', 'Ajuda a marcar distância.', 'That is my bag over there.', 'Aquela é minha bolsa ali.')
            ],
            dialogues: [
                dialogue('Perto', line('A', 'What is this?', 'O que é isto?'), line('B', 'This is a key.', 'Isto é uma chave.')),
                dialogue('Longe', line('A', 'What is that?', 'O que é aquilo?'), line('B', 'That is a chair.', 'Aquilo é uma cadeira.')),
                dialogue('Posse', line('A', 'Is this yours?', 'Isto é seu?'), line('B', 'Yes, it is my pen.', 'Sim, é minha caneta.')),
                dialogue('Na sala', line('A', 'Is that the door?', 'Aquela é a porta?'), line('B', 'No, that is the window.', 'Não, aquela é a janela.'))
            ],
            reading: reading(
                'Near and far',
                'Mia is in a classroom. She holds a pen and says, “This is my pen.” Her bag is near the door. She points and says, “That is my bag.”',
                question('What is in Mia’s hand?', 'A pen is in her hand.'),
                question('Where is her bag?', 'It is near the door.'),
                question('Which word does she use for the bag?', 'She uses “that.”')
            ),
            homework: ['Quatro objetos perto e quatro distantes', 'Fotos com frases usando this e that', 'Um diálogo sobre objetos perdidos']
        },
        {
            number: 9,
            source: 15,
            stage: 'Foundation 8',
            title: 'These and Those',
            newLanguage: ['these', 'those', 'regular plurals'],
            recycledLanguage: ['this', 'that', 'a/an', 'objects'],
            deferredLanguage: ['there is/are', 'irregular plurals'],
            objectives: [
                'Formar plurais regulares frequentes.',
                'Usar these para coisas próximas e those para coisas distantes.',
                'Perguntar e responder sobre mais de um objeto.'
            ],
            intro: [
                line('Mia', 'What are these?', 'O que são estes?'),
                line('Ben', 'These are notebooks.', 'Estes são cadernos.'),
                line('Mia', 'And what are those?', 'E o que são aqueles?'),
                line('Ben', 'Those are bags.', 'Aquelas são bolsas.')
            ],
            vocab: [
                v('these', 'estes; estas', 'These are my keys.', 'Estas são minhas chaves.'),
                v('those', 'aqueles; aquelas', 'Those are your books.', 'Aqueles são seus livros.'),
                v('books', 'livros', 'These are new books.', 'Estes são livros novos.'),
                v('pens', 'canetas', 'Those are blue pens.', 'Aquelas são canetas azuis.'),
                v('keys', 'chaves', 'These are my keys.', 'Estas são minhas chaves.'),
                v('bags', 'bolsas; mochilas', 'Those are school bags.', 'Aquelas são mochilas escolares.'),
                v('chairs', 'cadeiras', 'These are classroom chairs.', 'Estas são cadeiras de sala.'),
                v('tables', 'mesas', 'Those are small tables.', 'Aquelas são mesas pequenas.')
            ],
            grammar: {
                title: 'These are / Those are',
                summary: 'Depois de dominar this e that no singular, use these e those para falar de duas ou mais coisas.',
                rows: [
                    ['plural perto', 'These are + plural noun.', 'These are my keys.', 'Estas são minhas chaves.'],
                    ['plural distante', 'Those are + plural noun.', 'Those are your books.', 'Aqueles são seus livros.'],
                    ['plural regular', 'noun + s', 'book → books / key → keys', 'livro → livros / chave → chaves']
                ],
                notes: [
                    'These e those usam are porque indicam plural.',
                    'Não use a ou an antes de substantivo plural.',
                    'Compare: this book / these books; that key / those keys.'
                ]
            },
            practice: [
                p('Transform', 'this book → plural', 'perto', 'these books'),
                p('Transform', 'that key → plural', 'distante', 'those keys'),
                p('Complete', '___ are my pens here.', 'plural perto', 'These'),
                p('Complete', '___ are the chairs over there.', 'plural distante', 'Those'),
                p('Choose', 'These (is / are) books.', 'plural', 'are'),
                p('Build', 'those / What / are / ?', 'pergunta plural', 'What are those?'),
                p('Correct', 'These are a notebooks.', 'sem a no plural', 'These are notebooks.'),
                p('Correct', 'Those is my bags.', 'plural usa are', 'Those are my bags.')
            ],
            translations: [
                t('Estes são meus livros.', 'These are my books.'),
                t('Aquelas são suas bolsas.', 'Those are your bags.'),
                t('O que são estes?', 'What are these?'),
                t('O que são aqueles?', 'What are those?'),
                t('Estas são chaves.', 'These are keys.'),
                t('Aquelas são cadeiras.', 'Those are chairs.')
            ],
            expressions: [
                x('What are these?', 'O que são estes?', 'Pergunta sobre coisas próximas.', 'What are these in the box?', 'O que são estes na caixa?'),
                x('What are those?', 'O que são aqueles?', 'Pergunta sobre coisas distantes.', 'What are those over there?', 'O que são aqueles ali?'),
                x('These are mine.', 'Estes são meus.', 'Resposta curta de posse.', 'These are mine, thank you.', 'Estes são meus, obrigado.'),
                x('Those are yours.', 'Aqueles são seus.', 'Resposta curta de posse.', 'Those are yours, Ben.', 'Aqueles são seus, Ben.')
            ],
            dialogues: [
                dialogue('Caixa', line('A', 'What are these?', 'O que são estes?'), line('B', 'These are keys.', 'Estas são chaves.')),
                dialogue('Outro lado', line('A', 'What are those?', 'O que são aqueles?'), line('B', 'Those are chairs.', 'Aquelas são cadeiras.')),
                dialogue('Meus objetos', line('A', 'Are these your books?', 'Estes são seus livros?'), line('B', 'Yes, these are mine.', 'Sim, estes são meus.')),
                dialogue('Seus objetos', line('A', 'Are those my bags?', 'Aquelas são minhas bolsas?'), line('B', 'No, those are yours.', 'Não, aquelas são suas.'))
            ],
            reading: reading(
                'The lost-and-found table',
                'Near Mia: these are two keys and three pens. Near the door: those are four books and two bags.',
                question('Which objects are near Mia?', 'Two keys and three pens are near Mia.'),
                question('Which objects are near the door?', 'Four books and two bags are near the door.'),
                question('Which word describes the distant objects?', 'The word is “those.”')
            ),
            homework: ['Pares de objetos no singular e plural', 'Fotos com these e those', 'Um inventário simples da sala']
        }
        ,
        {
            number: 11,
            source: 5,
            stage: 'Routine 1',
            title: 'My Routine: I and You',
            newLanguage: ['Present Simple affirmative with I/you', 'routine verbs'],
            recycledLanguage: ['I/you', 'time numbers'],
            deferredLanguage: ['don’t', 'he/she + s', 'do/does questions', 'frequency adverbs'],
            objectives: [
                'Descrever uma rotina própria com I + verbo.',
                'Falar diretamente sobre a rotina de outra pessoa com you + verbo.',
                'Organizar ações simples do começo ao fim do dia.'
            ],
            intro: [
                line('Mia', 'I wake up at seven.', 'Eu acordo às sete.'),
                line('Ben', 'I have breakfast at seven thirty.', 'Eu tomo café às sete e meia.'),
                line('Mia', 'You start class at nine.', 'Você começa a aula às nove.'),
                line('Ben', 'Yes. I study in the morning.', 'Sim. Eu estudo de manhã.')
            ],
            vocab: [
                v('wake up', 'acordar', 'I wake up at seven.', 'Eu acordo às sete.'),
                v('get up', 'levantar-se', 'I get up after the alarm.', 'Eu me levanto depois do despertador.'),
                v('have breakfast', 'tomar café da manhã', 'I have breakfast at home.', 'Eu tomo café da manhã em casa.'),
                v('go to work', 'ir ao trabalho', 'I go to work at eight.', 'Eu vou ao trabalho às oito.'),
                v('study', 'estudar', 'You study in the morning.', 'Você estuda de manhã.'),
                v('have lunch', 'almoçar', 'I have lunch at noon.', 'Eu almoço ao meio-dia.'),
                v('go home', 'ir para casa', 'You go home at five.', 'Você vai para casa às cinco.'),
                v('go to bed', 'ir dormir', 'I go to bed at ten.', 'Eu vou dormir às dez.')
            ],
            grammar: {
                title: 'I/You + base verb',
                summary: 'Para falar de hábitos com I e you, use o verbo em sua forma básica. Não acrescente -s nesta etapa.',
                rows: [
                    ['minha rotina', 'I + base verb', 'I work. / I study.', 'Eu trabalho. / Eu estudo.'],
                    ['sua rotina', 'You + base verb', 'You work. / You study.', 'Você trabalha. / Você estuda.'],
                    ['sequência', 'I + action + at + time', 'I have lunch at noon.', 'Eu almoço ao meio-dia.']
                ],
                notes: [
                    'Use a forma básica do verbo depois de I e you.',
                    'Nesta aula, trabalhe somente com frases afirmativas.',
                    'Negativas, terceira pessoa e perguntas terão aulas próprias.'
                ]
            },
            practice: [
                p('Complete', 'I ___ up at seven.', 'acordo', 'wake'),
                p('Complete', 'You ___ breakfast at home.', 'toma', 'have'),
                p('Choose', 'I (study / studies) at night.', 'I + base verb', 'study'),
                p('Build', 'work / I / at / eight', 'rotina', 'I work at eight.'),
                p('Build', 'home / You / at / go / five', 'you + verbo', 'You go home at five.'),
                p('Order', 'go to bed / have dinner / go home', 'fim do dia', 'go home → have dinner → go to bed'),
                p('Correct', 'I studies in the morning.', 'sem -s com I', 'I study in the morning.'),
                p('Correct', 'You goes to work at eight.', 'sem -s com you', 'You go to work at eight.')
            ],
            translations: [
                t('Eu acordo às sete.', 'I wake up at seven.'),
                t('Eu tomo café em casa.', 'I have breakfast at home.'),
                t('Você estuda de manhã.', 'You study in the morning.'),
                t('Eu almoço ao meio-dia.', 'I have lunch at noon.'),
                t('Você vai para casa às cinco.', 'You go home at five.'),
                t('Eu vou dormir às dez.', 'I go to bed at ten.')
            ],
            expressions: [
                x('In the morning', 'De manhã', 'Parte do dia.', 'I study in the morning.', 'Eu estudo de manhã.'),
                x('In the afternoon', 'À tarde', 'Parte do dia.', 'I work in the afternoon.', 'Eu trabalho à tarde.'),
                x('In the evening', 'À noite; no começo da noite', 'Parte do dia.', 'I go home in the evening.', 'Eu vou para casa à noite.'),
                x('At night', 'À noite', 'Use para hábitos noturnos.', 'I read at night.', 'Eu leio à noite.')
            ],
            dialogues: [
                dialogue('Manhã', line('A', 'I wake up at seven.', 'Eu acordo às sete.'), line('B', 'I get up at seven ten.', 'Eu me levanto às sete e dez.')),
                dialogue('Estudo', line('A', 'I study in the morning.', 'Eu estudo de manhã.'), line('B', 'You study at home.', 'Você estuda em casa.')),
                dialogue('Almoço', line('A', 'I have lunch at noon.', 'Eu almoço ao meio-dia.'), line('B', 'I have lunch at work.', 'Eu almoço no trabalho.')),
                dialogue('Noite', line('A', 'I go home at five.', 'Eu vou para casa às cinco.'), line('B', 'I go to bed at ten.', 'Eu vou dormir às dez.'))
            ],
            reading: reading(
                'Mia’s weekday',
                'I am Mia. I wake up at seven and have breakfast at home. I study in the morning. I have lunch at noon, go home at five, and go to bed at ten.',
                question('Complete: “I wake up at ___.”', 'seven'),
                question('Complete: “I have breakfast at ___.”', 'home'),
                question('Complete: “I study in the ___.”', 'morning')
            ),
            homework: ['Sua rotina da manhã', 'Seis ações de um dia de aula', 'Uma linha do tempo do seu dia']
        },
        {
            number: 12,
            source: 14,
            stage: 'Routine 2',
            title: 'Likes and Don’t Like',
            newLanguage: ['I/you like', 'I/you don’t like'],
            recycledLanguage: ['I/you + base verb', 'free-time nouns'],
            deferredLanguage: ['he/she likes', 'do/does questions', 'gerunds as a full system'],
            objectives: [
                'Expressar gostos pessoais com I like.',
                'Expressar uma preferência negativa com I don’t like.',
                'Reagir a gostos de outra pessoa com blocos simples.'
            ],
            intro: [
                line('Mia', 'I like music.', 'Eu gosto de música.'),
                line('Ben', 'I like music too.', 'Eu também gosto de música.'),
                line('Mia', 'I don’t like loud music.', 'Eu não gosto de música alta.'),
                line('Ben', 'I understand.', 'Eu entendo.')
            ],
            vocab: [
                v('music', 'música', 'I like music.', 'Eu gosto de música.'),
                v('movies', 'filmes', 'You like movies.', 'Você gosta de filmes.'),
                v('books', 'livros', 'I like books.', 'Eu gosto de livros.'),
                v('soccer', 'futebol', 'I don’t like soccer.', 'Eu não gosto de futebol.'),
                v('coffee', 'café', 'You like coffee.', 'Você gosta de café.'),
                v('tea', 'chá', 'I like tea.', 'Eu gosto de chá.'),
                v('loud', 'alto; barulhento', 'I don’t like loud music.', 'Eu não gosto de música alta.'),
                v('favorite', 'favorito(a)', 'Music is my favorite hobby.', 'Música é meu hobby favorito.')
            ],
            grammar: {
                title: 'I/You like and don’t like',
                summary: 'Use like para uma preferência positiva e don’t like para uma preferência negativa com I ou you.',
                rows: [
                    ['positivo', 'I/You + like + noun', 'I like music.', 'Eu gosto de música.'],
                    ['negativo', 'I/You + don’t like + noun', 'I don’t like soccer.', 'Eu não gosto de futebol.'],
                    ['também', 'I like + noun + too.', 'I like books too.', 'Eu também gosto de livros.']
                ],
                notes: [
                    'Don’t já marca a negativa; use like sem alteração depois dele.',
                    'Nesta etapa, use substantivos depois de like: music, books, coffee.',
                    'Perguntas com do serão apresentadas depois.'
                ]
            },
            practice: [
                p('Complete', 'I ___ music.', 'gosto', 'like'),
                p('Complete', 'I ___ like loud music.', 'não gosto', 'don’t'),
                p('Choose', 'You (like / likes) movies.', 'you + base verb', 'like'),
                p('Build', 'like / I / books', 'positivo', 'I like books.'),
                p('Build', 'do not / I / soccer / like', 'negativo', 'I do not like soccer.'),
                p('Answer', 'I like coffee.', 'eu também', 'I like coffee too.'),
                p('Correct', 'I don’t likes tea.', 'depois de don’t', 'I don’t like tea.'),
                p('Correct', 'You likes movies.', 'you + base verb', 'You like movies.')
            ],
            translations: [
                t('Eu gosto de música.', 'I like music.'),
                t('Eu não gosto de futebol.', 'I don’t like soccer.'),
                t('Você gosta de filmes.', 'You like movies.'),
                t('Eu também gosto de café.', 'I like coffee too.'),
                t('Eu não gosto de música alta.', 'I don’t like loud music.'),
                t('Livros são meus favoritos.', 'Books are my favorite.')
            ],
            expressions: [
                x('I like... a lot.', 'Eu gosto muito de...', 'Intensifica uma preferência.', 'I like music a lot.', 'Eu gosto muito de música.'),
                x('I don’t like...', 'Eu não gosto de...', 'Preferência negativa.', 'I don’t like loud movies.', 'Eu não gosto de filmes barulhentos.'),
                x('Me too.', 'Eu também.', 'Resposta curta a uma preferência positiva.', 'You like coffee? Me too.', 'Você gosta de café? Eu também.'),
                x('It’s my favorite.', 'É meu favorito.', 'Destaque uma preferência.', 'Tea is my favorite.', 'Chá é meu favorito.')
            ],
            dialogues: [
                dialogue('Música', line('A', 'I like music.', 'Eu gosto de música.'), line('B', 'Me too.', 'Eu também.')),
                dialogue('Filmes', line('A', 'I like movies a lot.', 'Eu gosto muito de filmes.'), line('B', 'Movies are my favorite.', 'Filmes são meus favoritos.')),
                dialogue('Futebol', line('A', 'I don’t like soccer.', 'Eu não gosto de futebol.'), line('B', 'I understand.', 'Eu entendo.')),
                dialogue('Bebidas', line('A', 'I like tea.', 'Eu gosto de chá.'), line('B', 'I like coffee.', 'Eu gosto de café.'))
            ],
            reading: reading(
                'Two preference cards',
                'Mia’s card: “I like music, books, and tea. I don’t like soccer.” Ben’s card: “I like movies, soccer, and coffee. I don’t like loud music.”',
                question('Complete Mia’s card: “I ___ soccer.”', 'don’t like'),
                question('Complete Ben’s card: “I ___ coffee.”', 'like'),
                question('Which person says “I don’t like loud music”?', 'Ben.')
            ),
            homework: ['Três coisas de que você gosta', 'Duas coisas de que você não gosta', 'Um cartão de preferências']
        },
        {
            number: 13,
            source: 5,
            stage: 'Routine 3',
            title: 'His and Her Routine',
            newLanguage: ['he/she + verb-s', 'has', 'goes'],
            recycledLanguage: ['routine verbs', 'he/she', 'his/her'],
            deferredLanguage: ['does questions', 'doesn’t', 'frequency adverbs'],
            objectives: [
                'Descrever a rotina de outra pessoa.',
                'Adicionar -s ao verbo com he e she.',
                'Usar formas frequentes como has e goes.'
            ],
            intro: [
                line('Mia', 'Leo works at a café.', 'Leo trabalha em uma cafeteria.'),
                line('Ben', 'What time does he start?', 'Que horas ele começa?'),
                line('Mia', 'He starts at eight.', 'Ele começa às oito.'),
                line('Ben', 'He has breakfast at work.', 'Ele toma café no trabalho.')
            ],
            vocab: [
                v('starts', 'começa', 'He starts work at eight.', 'Ele começa o trabalho às oito.'),
                v('works', 'trabalha', 'She works at a school.', 'Ela trabalha em uma escola.'),
                v('studies', 'estuda', 'He studies at night.', 'Ele estuda à noite.'),
                v('goes', 'vai', 'She goes home at six.', 'Ela vai para casa às seis.'),
                v('has', 'tem; toma', 'He has breakfast at work.', 'Ele toma café no trabalho.'),
                v('finishes', 'termina', 'She finishes class at five.', 'Ela termina a aula às cinco.'),
                v('cooks', 'cozinha', 'He cooks dinner.', 'Ele prepara o jantar.'),
                v('sleeps', 'dorme', 'She sleeps at eleven.', 'Ela dorme às onze.')
            ],
            grammar: {
                title: 'He/She + verb-s',
                summary: 'Com he ou she no Present Simple afirmativo, o verbo geralmente recebe -s.',
                rows: [
                    ['regra geral', 'he/she + verb-s', 'She works. / He starts.', 'Ela trabalha. / Ele começa.'],
                    ['terminações', 'go → goes / finish → finishes', 'He goes. / She finishes.', 'Ele vai. / Ela termina.'],
                    ['forma especial', 'have → has', 'She has breakfast.', 'Ela toma café da manhã.']
                ],
                notes: [
                    'O -s aparece somente na terceira pessoa afirmativa.',
                    'Study muda para studies; go muda para goes.',
                    'Perguntas com does serão o foco da próxima aula.'
                ]
            },
            practice: [
                p('Complete', 'He ___ at a café.', 'work + s', 'works'),
                p('Complete', 'She ___ at night.', 'study → studies', 'studies'),
                p('Complete', 'He ___ home at six.', 'go → goes', 'goes'),
                p('Complete', 'She ___ breakfast at home.', 'have → has', 'has'),
                p('Choose', 'Leo (start / starts) at eight.', 'he', 'starts'),
                p('Transform', 'I work at home. → she', 'adicione -s', 'She works at home.'),
                p('Correct', 'He study at night.', 'terceira pessoa', 'He studies at night.'),
                p('Correct', 'She haves lunch at noon.', 'forma especial', 'She has lunch at noon.')
            ],
            translations: [
                t('Ele trabalha em uma cafeteria.', 'He works at a café.'),
                t('Ela estuda à noite.', 'She studies at night.'),
                t('Ele vai para casa às seis.', 'He goes home at six.'),
                t('Ela toma café em casa.', 'She has breakfast at home.'),
                t('Ele prepara o jantar.', 'He cooks dinner.'),
                t('Ela dorme às onze.', 'She sleeps at eleven.')
            ],
            expressions: [
                x('He/She starts at...', 'Ele/Ela começa às...', 'Informe o começo da rotina.', 'She starts at nine.', 'Ela começa às nove.'),
                x('He/She finishes at...', 'Ele/Ela termina às...', 'Informe o final da atividade.', 'He finishes at five.', 'Ele termina às cinco.'),
                x('Before work', 'Antes do trabalho', 'Organiza a rotina.', 'She has coffee before work.', 'Ela toma café antes do trabalho.'),
                x('After class', 'Depois da aula', 'Organiza a rotina.', 'He goes home after class.', 'Ele vai para casa depois da aula.')
            ],
            dialogues: [
                dialogue('Trabalho', line('A', 'Leo works at a café.', 'Leo trabalha em uma cafeteria.'), line('B', 'He starts at eight.', 'Ele começa às oito.')),
                dialogue('Estudo', line('A', 'Ana studies at night.', 'Ana estuda à noite.'), line('B', 'She finishes at ten.', 'Ela termina às dez.')),
                dialogue('Café', line('A', 'He has breakfast at home.', 'Ele toma café em casa.'), line('B', 'She has breakfast at work.', 'Ela toma café no trabalho.')),
                dialogue('Fim do dia', line('A', 'She goes home at six.', 'Ela vai para casa às seis.'), line('B', 'He cooks dinner.', 'Ele prepara o jantar.'))
            ],
            reading: reading(
                'Leo’s weekday',
                'Leo works at a small café. He starts at eight and has breakfast at work. He finishes at four, goes home, and cooks dinner. He studies English at night.',
                question('Complete: “Leo ___ at a café.”', 'works'),
                question('Complete: “He ___ at eight.”', 'starts'),
                question('Complete: “He ___ English at night.”', 'studies')
            ),
            homework: ['A rotina de um familiar', 'A agenda de uma personagem', 'Frases sobre a rotina usando he ou she']
        },
        {
            number: 14,
            source: 6,
            stage: 'Routine 4',
            title: 'Do You...? Does He...?',
            newLanguage: ['Do you...?', 'Does he/she...?', 'short answers'],
            recycledLanguage: ['routine verbs', 'he/she + s', 'like/don’t like'],
            deferredLanguage: ['wh- questions beyond fixed chunks', 'frequency adverbs'],
            objectives: [
                'Fazer perguntas de rotina com do e does.',
                'Dar respostas curtas afirmativas e negativas.',
                'Manter o verbo principal na forma básica depois de does.'
            ],
            intro: [
                line('Mia', 'Do you work in the morning?', 'Você trabalha de manhã?'),
                line('Ben', 'Yes, I do.', 'Sim.'),
                line('Mia', 'Does Leo work with you?', 'O Leo trabalha com você?'),
                line('Ben', 'No, he doesn’t.', 'Não.')
            ],
            vocab: [
                v('do', 'auxiliar com I/you', 'Do you study at night?', 'Você estuda à noite?'),
                v('does', 'auxiliar com he/she', 'Does she work here?', 'Ela trabalha aqui?'),
                v('yes', 'sim', 'Yes, I do.', 'Sim.'),
                v('no', 'não', 'No, she does not.', 'Não.'),
                v('every day', 'todos os dias', 'Do you work every day?', 'Você trabalha todos os dias?'),
                v('on weekends', 'nos fins de semana', 'Does he study on weekends?', 'Ele estuda nos fins de semana?'),
                v('early', 'cedo', 'Do you wake up early?', 'Você acorda cedo?'),
                v('late', 'tarde; atrasado', 'Does she work late?', 'Ela trabalha até tarde?')
            ],
            grammar: {
                title: 'Do/Does + subject + base verb?',
                summary: 'Use do com I/you e does com he/she. Depois do auxiliar, o verbo volta à forma básica.',
                rows: [
                    ['I/you', 'Do + I/you + base verb?', 'Do you work? Yes, I do.', 'Você trabalha? Sim.'],
                    ['he/she', 'Does + he/she + base verb?', 'Does she work? No, she doesn’t.', 'Ela trabalha? Não.'],
                    ['verbo básico', 'does + work, not works', 'Does he study?', 'Ele estuda?']
                ],
                notes: [
                    'Do e does abrem a pergunta.',
                    'Depois de does, diga work, study e go sem -s.',
                    'Nas respostas curtas, repita do ou does.'
                ]
            },
            practice: [
                p('Complete', '___ you work at home?', 'you', 'Do'),
                p('Complete', '___ she study at night?', 'she', 'Does'),
                p('Choose', 'Does he (work / works) here?', 'verbo base', 'work'),
                p('Answer', 'Do you study English?', 'positiva', 'Yes, I do.'),
                p('Answer', 'Does Mia work here?', 'negativa', 'No, she doesn’t.'),
                p('Build', 'you / Do / early / wake up / ?', 'pergunta', 'Do you wake up early?'),
                p('Correct', 'Does he goes home at five?', 'does + base', 'Does he go home at five?'),
                p('Correct', 'Do she work late?', 'she usa does', 'Does she work late?')
            ],
            translations: [
                t('Você trabalha de manhã?', 'Do you work in the morning?'),
                t('Sim.', 'Yes, I do.'),
                t('Ela estuda à noite?', 'Does she study at night?'),
                t('Não.', 'No, she doesn’t.'),
                t('Ele acorda cedo?', 'Does he wake up early?'),
                t('Você gosta de café?', 'Do you like coffee?')
            ],
            expressions: [
                x('Do you...?', 'Você...?', 'Pergunta direta sobre hábito.', 'Do you work on weekends?', 'Você trabalha nos fins de semana?'),
                x('Does he/she...?', 'Ele/Ela...?', 'Pergunta sobre outra pessoa.', 'Does she study English?', 'Ela estuda inglês?'),
                x('Yes, I do.', 'Sim.', 'Resposta curta com I.', 'Do you like tea? Yes, I do.', 'Você gosta de chá? Sim.'),
                x('No, he/she doesn’t.', 'Não.', 'Resposta curta na terceira pessoa.', 'Does he work here? No, he doesn’t.', 'Ele trabalha aqui? Não.')
            ],
            dialogues: [
                dialogue('Trabalho', line('A', 'Do you work in the morning?', 'Você trabalha de manhã?'), line('B', 'Yes, I do.', 'Sim.')),
                dialogue('Estudo', line('A', 'Does she study at night?', 'Ela estuda à noite?'), line('B', 'No, she doesn’t.', 'Não.')),
                dialogue('Rotina', line('A', 'Do you wake up early?', 'Você acorda cedo?'), line('B', 'No, I don’t.', 'Não.')),
                dialogue('Gostos', line('A', 'Does he like coffee?', 'Ele gosta de café?'), line('B', 'Yes, he does.', 'Sim.'))
            ],
            reading: reading(
                'A short routine survey',
                'Mia asks Ben four questions. Does he work in the morning? Yes, he does. Does he study at night? No, he doesn’t. Does he like coffee? Yes, he does. Does he go to bed early? No, he doesn’t.',
                question('Does Ben work in the morning?', 'Yes, he does.'),
                question('Does he study at night?', 'No, he doesn’t.'),
                question('Does he like coffee?', 'Yes, he does.')
            ),
            homework: ['Uma pesquisa com quatro perguntas', 'Entrevista sobre rotina', 'Perguntas sobre uma personagem']
        },
        {
            number: 16,
            source: 14,
            stage: 'Routine 5',
            title: 'How Often?',
            newLanguage: ['always/usually', 'sometimes/never', 'How often...?'],
            recycledLanguage: ['Present Simple', 'do/does questions', 'hobbies'],
            deferredLanguage: ['complex frequency expressions', 'gerund patterns'],
            objectives: [
                'Indicar frequência com quatro advérbios básicos.',
                'Posicionar o advérbio antes do verbo principal.',
                'Perguntar How often...? em rotinas previsíveis.'
            ],
            intro: [
                line('Mia', 'How often do you read?', 'Com que frequência você lê?'),
                line('Ben', 'I usually read at night.', 'Eu geralmente leio à noite.'),
                line('Mia', 'Do you play soccer?', 'Você joga futebol?'),
                line('Ben', 'Sometimes, but I never play on Mondays.', 'Às vezes, mas eu nunca jogo às segundas.')
            ],
            vocab: [
                v('always', 'sempre', 'I always have breakfast.', 'Eu sempre tomo café da manhã.'),
                v('usually', 'geralmente', 'She usually reads at night.', 'Ela geralmente lê à noite.'),
                v('sometimes', 'às vezes', 'We sometimes watch movies.', 'Nós às vezes assistimos a filmes.'),
                v('never', 'nunca', 'He never drinks coffee.', 'Ele nunca toma café.'),
                v('read', 'ler', 'I usually read at night.', 'Eu geralmente leio à noite.'),
                v('watch movies', 'assistir a filmes', 'I sometimes watch movies.', 'Eu às vezes assisto a filmes.'),
                v('play soccer', 'jogar futebol', 'He plays soccer on Saturdays.', 'Ele joga futebol aos sábados.'),
                v('listen to music', 'ouvir música', 'She always listens to music.', 'Ela sempre ouve música.')
            ],
            grammar: {
                title: 'Frequency adverb + main verb',
                summary: 'Coloque always, usually, sometimes ou never antes do verbo principal.',
                rows: [
                    ['sempre', 'subject + always + verb', 'I always read.', 'Eu sempre leio.'],
                    ['geralmente/às vezes', 'subject + usually/sometimes + verb', 'She usually reads.', 'Ela geralmente lê.'],
                    ['nunca', 'subject + never + verb', 'He never drinks coffee.', 'Ele nunca toma café.']
                ],
                notes: [
                    'Com verbo comum, o advérbio vem antes do verbo.',
                    'Never já tem sentido negativo; não use don’t com never.',
                    'How often...? será praticado como um bloco completo.'
                ]
            },
            practice: [
                p('Order', 'always / I / breakfast / have', 'advérbio antes do verbo', 'I always have breakfast.'),
                p('Order', 'usually / She / at night / reads', 'terceira pessoa', 'She usually reads at night.'),
                p('Complete', 'He ___ drinks coffee. (0%)', 'nunca', 'never'),
                p('Choose', 'I (sometimes watch / watch sometimes) movies.', 'posição', 'sometimes watch'),
                p('Build', 'often / How / you / do / read / ?', 'bloco de frequência', 'How often do you read?'),
                p('Answer', 'How often do you play soccer?', 'às vezes', 'I sometimes play soccer.'),
                p('Correct', 'I don’t never drink tea.', 'never sem don’t', 'I never drink tea.'),
                p('Correct', 'She listens always to music.', 'posição', 'She always listens to music.')
            ],
            translations: [
                t('Eu sempre tomo café da manhã.', 'I always have breakfast.'),
                t('Ela geralmente lê à noite.', 'She usually reads at night.'),
                t('Eu às vezes assisto a filmes.', 'I sometimes watch movies.'),
                t('Ele nunca toma café.', 'He never drinks coffee.'),
                t('Com que frequência você lê?', 'How often do you read?'),
                t('Eu às vezes jogo futebol.', 'I sometimes play soccer.')
            ],
            expressions: [
                x('How often do you...?', 'Com que frequência você...?', 'Pergunta sobre frequência.', 'How often do you exercise?', 'Com que frequência você se exercita?'),
                x('Every day', 'Todos os dias', 'Frequência exata simples.', 'I study English every day.', 'Eu estudo inglês todos os dias.'),
                x('On weekends', 'Nos fins de semana', 'Frequência ligada à semana.', 'I watch movies on weekends.', 'Eu assisto a filmes nos fins de semana.'),
                x('Not very often', 'Não com muita frequência', 'Resposta aproximada.', 'I cook, but not very often.', 'Eu cozinho, mas não com muita frequência.')
            ],
            dialogues: [
                dialogue('Leitura', line('A', 'How often do you read?', 'Com que frequência você lê?'), line('B', 'I usually read at night.', 'Eu geralmente leio à noite.')),
                dialogue('Filmes', line('A', 'Do you watch movies?', 'Você assiste a filmes?'), line('B', 'Sometimes, on weekends.', 'Às vezes, nos fins de semana.')),
                dialogue('Café', line('A', 'Does he drink coffee?', 'Ele toma café?'), line('B', 'No, he never drinks coffee.', 'Não, ele nunca toma café.')),
                dialogue('Música', line('A', 'She always listens to music.', 'Ela sempre ouve música.'), line('B', 'Me too.', 'Eu também.'))
            ],
            reading: reading(
                'A week of hobbies',
                'Mia always reads before bed. She usually listens to music after work. She sometimes watches a movie on Saturday, but she never plays soccer.',
                question('When does Mia read?', 'She reads before bed.'),
                question('What does she usually do after work?', 'She listens to music.'),
                question('Does she play soccer?', 'No, she never plays soccer.')
            ),
            homework: ['Sua frequência em quatro atividades', 'Uma pesquisa sobre hobbies', 'A rotina semanal de uma personagem']
        },
        {
            number: 17,
            source: 6,
            stage: 'Routine 6',
            title: 'What Time Is It?',
            newLanguage: ['clock time', 'at + time', 'on + day'],
            recycledLanguage: ['routine verbs', 'numbers', 'do/does'],
            deferredLanguage: ['dates and ordinals beyond fixed forms', 'future timetables'],
            objectives: [
                'Dizer horas cheias e horários com minutos.',
                'Usar at antes de horários e on antes de dias.',
                'Perguntar a hora de uma atividade.'
            ],
            intro: [
                line('Mia', 'What time is it?', 'Que horas são?'),
                line('Ben', 'It is seven thirty.', 'São sete e meia.'),
                line('Mia', 'What time does class start?', 'Que horas a aula começa?'),
                line('Ben', 'It starts at eight on Tuesday.', 'Ela começa às oito na terça-feira.')
            ],
            vocab: [
                v('o’clock', 'em ponto', 'It is seven o’clock.', 'São sete horas em ponto.'),
                v('half past', 'e meia', 'It is half past seven.', 'São sete e meia.'),
                v('quarter past', 'e quinze', 'It is a quarter past eight.', 'São oito e quinze.'),
                v('quarter to', 'quinze para', 'It is a quarter to nine.', 'São quinze para as nove.'),
                v('Monday', 'segunda-feira', 'Class is on Monday.', 'A aula é na segunda-feira.'),
                v('Tuesday', 'terça-feira', 'Work starts on Tuesday.', 'O trabalho começa na terça-feira.'),
                v('early', 'cedo', 'The class starts early.', 'A aula começa cedo.'),
                v('on time', 'no horário', 'The bus is on time.', 'O ônibus está no horário.')
            ],
            grammar: {
                title: 'At + time / On + day',
                summary: 'Use at antes de uma hora específica e on antes de um dia da semana.',
                rows: [
                    ['hora', 'at + clock time', 'at seven / at 8:30', 'às sete / às oito e meia'],
                    ['dia', 'on + day', 'on Monday / on Friday', 'na segunda / na sexta'],
                    ['pergunta', 'What time does + activity + start?', 'What time does class start?', 'Que horas a aula começa?']
                ],
                notes: [
                    'At acompanha a hora; on acompanha o dia.',
                    'Em resposta, diga It is... para a hora atual.',
                    'Não misture at Monday nem on seven.'
                ]
            },
            practice: [
                p('Write', '7:00', 'em ponto', 'seven o’clock'),
                p('Write', '7:30', 'e meia', 'half past seven'),
                p('Choose', 'Class starts (at / on) eight.', 'hora', 'at'),
                p('Choose', 'Class is (at / on) Tuesday.', 'dia', 'on'),
                p('Build', 'time / What / it / is / ?', 'hora atual', 'What time is it?'),
                p('Build', 'class / time / What / start / does / ?', 'atividade', 'What time does class start?'),
                p('Correct', 'The meeting is at Monday.', 'dia usa on', 'The meeting is on Monday.'),
                p('Correct', 'Work starts on nine.', 'hora usa at', 'Work starts at nine.')
            ],
            translations: [
                t('São sete horas.', 'It is seven o’clock.'),
                t('São sete e meia.', 'It is half past seven.'),
                t('A aula começa às oito.', 'Class starts at eight.'),
                t('A aula é na terça-feira.', 'Class is on Tuesday.'),
                t('Que horas são?', 'What time is it?'),
                t('Que horas o trabalho começa?', 'What time does work start?')
            ],
            expressions: [
                x('What time is it?', 'Que horas são?', 'Pergunta sobre a hora atual.', 'Excuse me, what time is it?', 'Com licença, que horas são?'),
                x('What time does it start?', 'Que horas começa?', 'Pergunta sobre evento.', 'What time does the class start?', 'Que horas a aula começa?'),
                x('It starts at...', 'Começa às...', 'Resposta de horário.', 'It starts at eight thirty.', 'Começa às oito e meia.'),
                x('See you then.', 'Até lá.', 'Confirma um horário combinado.', 'Tuesday at eight? See you then.', 'Terça às oito? Até lá.')
            ],
            dialogues: [
                dialogue('Hora', line('A', 'What time is it?', 'Que horas são?'), line('B', 'It is seven thirty.', 'São sete e meia.')),
                dialogue('Aula', line('A', 'What time does class start?', 'Que horas a aula começa?'), line('B', 'It starts at eight.', 'Ela começa às oito.')),
                dialogue('Dia', line('A', 'Is class on Tuesday?', 'A aula é na terça?'), line('B', 'Yes, on Tuesday.', 'Sim, na terça.')),
                dialogue('Combinação', line('A', 'Monday at nine?', 'Segunda às nove?'), line('B', 'Yes. See you then.', 'Sim. Até lá.'))
            ],
            reading: reading(
                'Mia’s class card',
                'English class is on Tuesday and Thursday. It starts at seven in the evening and finishes at eight thirty. Mia arrives at six fifty-five, so she is always on time.',
                question('Which days is the class?', 'It is on Tuesday and Thursday.'),
                question('What time does it start?', 'It starts at seven.'),
                question('Is Mia late?', 'No, she is on time.')
            ),
            homework: ['Sua agenda de três dias', 'Horários de uma escola', 'Um diálogo para combinar dia e hora']
        },
        {
            number: 18,
            source: 3,
            stage: 'People 1',
            title: 'Family Possession: Have and Has',
            newLanguage: ['have/has', 'name + ’s', 'our/their'],
            recycledLanguage: ['family', 'my/your/his/her', 'he/she'],
            deferredLanguage: ['object pronouns', 'extended family detail'],
            objectives: [
                'Dizer o que uma pessoa ou família tem.',
                'Usar have com I/you/we/they e has com he/she.',
                'Mostrar posse ou relação com nome + ’s.'
            ],
            intro: [
                line('Mia', 'I have one brother.', 'Eu tenho um irmão.'),
                line('Ben', 'What is his name?', 'Qual é o nome dele?'),
                line('Mia', 'His name is Leo. Leo’s car is blue.', 'O nome dele é Leo. O carro do Leo é azul.'),
                line('Ben', 'Our family has a blue car too.', 'Nossa família também tem um carro azul.')
            ],
            vocab: [
                v('parents', 'pais', 'My parents have a car.', 'Meus pais têm um carro.'),
                v('son', 'filho', 'They have one son.', 'Eles têm um filho.'),
                v('daughter', 'filha', 'She has one daughter.', 'Ela tem uma filha.'),
                v('uncle', 'tio', 'My uncle has a red car.', 'Meu tio tem um carro vermelho.'),
                v('aunt', 'tia', 'Her aunt has a dog.', 'A tia dela tem um cachorro.'),
                v('cousin', 'primo(a)', 'I have two cousins.', 'Eu tenho dois primos.'),
                v('our', 'nosso(a)', 'Our family is small.', 'Nossa família é pequena.'),
                v('their', 'deles; delas', 'Their house is near.', 'A casa deles fica perto.')
            ],
            grammar: {
                title: 'Have / has and possessive ’s',
                summary: 'Use have ou has para posse. Use nome + ’s antes de uma coisa ou relação ligada àquela pessoa.',
                rows: [
                    ['I/you/we/they', 'have + noun', 'We have a car.', 'Nós temos um carro.'],
                    ['he/she', 'has + noun', 'She has a daughter.', 'Ela tem uma filha.'],
                    ['nome', 'person’s + noun', 'Leo’s car / Ana’s brother', 'O carro do Leo / o irmão da Ana']
                ],
                notes: [
                    'Has é usado somente com he, she ou um nome singular.',
                    'O ’s vem depois do nome da pessoa.',
                    'Our e their vêm antes do substantivo, como my e her.'
                ]
            },
            practice: [
                p('Choose', 'I (have / has) one brother.', 'I', 'have'),
                p('Choose', 'She (have / has) a daughter.', 'she', 'has'),
                p('Complete', 'They ___ two cousins.', 'they', 'have'),
                p('Transform', 'the car of Leo', 'possessive ’s', 'Leo’s car'),
                p('Complete', 'Mia and I love ___ family.', 'nossa', 'our'),
                p('Complete', 'Ben and Ana have a house. ___ house is new.', 'deles', 'Their'),
                p('Correct', 'He have one son.', 'he + has', 'He has one son.'),
                p('Correct', 'The Ana’s brother is here.', 'sem the antes do nome', 'Ana’s brother is here.')
            ],
            translations: [
                t('Eu tenho um irmão.', 'I have one brother.'),
                t('Ela tem uma filha.', 'She has one daughter.'),
                t('Eles têm dois primos.', 'They have two cousins.'),
                t('O carro do Leo é azul.', 'Leo’s car is blue.'),
                t('Nossa família é pequena.', 'Our family is small.'),
                t('A casa deles é nova.', 'Their house is new.')
            ],
            expressions: [
                x('I have...', 'Eu tenho...', 'Fale de posse ou família.', 'I have two cousins.', 'Eu tenho dois primos.'),
                x('He/She has...', 'Ele/Ela tem...', 'Fale de outra pessoa.', 'She has one daughter.', 'Ela tem uma filha.'),
                x('Whose ... is this?', 'De quem é...?', 'Pergunta simples de posse.', 'Whose car is this?', 'De quem é este carro?'),
                x('It’s Leo’s.', 'É do Leo.', 'Resposta curta de posse.', 'The blue bag? It’s Leo’s.', 'A bolsa azul? É do Leo.')
            ],
            dialogues: [
                dialogue('Irmãos', line('A', 'Do you have a brother?', 'Você tem um irmão?'), line('B', 'Yes, I have one brother.', 'Sim, eu tenho um irmão.')),
                dialogue('Filha', line('A', 'Does she have children?', 'Ela tem filhos?'), line('B', 'She has one daughter.', 'Ela tem uma filha.')),
                dialogue('Carro', line('A', 'Whose car is this?', 'De quem é este carro?'), line('B', 'It is Leo’s car.', 'É o carro do Leo.')),
                dialogue('Família', line('A', 'Our family is small.', 'Nossa família é pequena.'), line('B', 'Their family is big.', 'A família deles é grande.'))
            ],
            reading: reading(
                'The Silva family',
                'The Silva family has four people. Ana and Leo have two children: Mia and Ben. Ana’s sister lives nearby. Their children have three cousins.',
                question('How many people are in the Silva family?', 'There are four people.'),
                question('Who are the children?', 'Mia and Ben are the children.'),
                question('How many cousins do they have?', 'They have three cousins.')
            ),
            homework: ['Uma árvore familiar curta', 'Cinco frases com have e has', 'Objetos de três familiares']
        },
        {
            number: 19,
            source: 19,
            stage: 'People 2',
            title: 'Jobs and Basic Abilities',
            newLanguage: ['can/can’t + base verb', 'Can you...?'],
            recycledLanguage: ['jobs', 'I/you/he/she', 'short answers'],
            deferredLanguage: ['should', 'obligation', 'complex workplace language'],
            objectives: [
                'Nomear ocupações frequentes.',
                'Falar de habilidades com can e can’t.',
                'Perguntar sobre uma habilidade com Can you...?'
            ],
            intro: [
                line('Mia', 'I am a receptionist.', 'Eu sou recepcionista.'),
                line('Ben', 'Can you speak Spanish?', 'Você sabe falar espanhol?'),
                line('Mia', 'Yes, I can. I can help visitors.', 'Sim. Eu consigo ajudar visitantes.'),
                line('Ben', 'I can use a computer, but I can’t speak Spanish.', 'Eu sei usar computador, mas não sei falar espanhol.')
            ],
            vocab: [
                v('teacher', 'professor(a)', 'A teacher can explain lessons.', 'Um professor consegue explicar aulas.'),
                v('receptionist', 'recepcionista', 'She is a receptionist.', 'Ela é recepcionista.'),
                v('cook', 'cozinheiro(a)', 'A cook can prepare food.', 'Um cozinheiro consegue preparar comida.'),
                v('driver', 'motorista', 'He is a driver.', 'Ele é motorista.'),
                v('speak', 'falar', 'I can speak English.', 'Eu sei falar inglês.'),
                v('help', 'ajudar', 'She can help visitors.', 'Ela consegue ajudar visitantes.'),
                v('drive', 'dirigir', 'He can drive a bus.', 'Ele sabe dirigir um ônibus.'),
                v('use a computer', 'usar um computador', 'I can use a computer.', 'Eu sei usar um computador.')
            ],
            grammar: {
                title: 'Can / can’t + base verb',
                summary: 'Can indica habilidade. Ele não muda com a pessoa e sempre vem antes do verbo básico.',
                rows: [
                    ['habilidade', 'subject + can + base verb', 'She can drive.', 'Ela sabe dirigir.'],
                    ['sem habilidade', 'subject + can’t + base verb', 'He can’t cook.', 'Ele não sabe cozinhar.'],
                    ['pergunta', 'Can + subject + base verb?', 'Can you help? Yes, I can.', 'Você pode ajudar? Sim.']
                ],
                notes: [
                    'Can é igual com I, you, he e she.',
                    'Depois de can, use o verbo sem to e sem -s.',
                    'Use can’t para indicar que a pessoa não tem a habilidade.'
                ]
            },
            practice: [
                p('Complete', 'I ___ use a computer.', 'habilidade', 'can'),
                p('Complete', 'She ___ drive.', 'não sabe', 'can’t'),
                p('Choose', 'He can (cooks / cook).', 'verbo base', 'cook'),
                p('Build', 'you / Can / Spanish / speak / ?', 'pergunta', 'Can you speak Spanish?'),
                p('Answer', 'Can you help visitors?', 'positiva', 'Yes, I can.'),
                p('Answer', 'Can Leo drive?', 'negativa', 'No, he can’t.'),
                p('Correct', 'She cans use a computer.', 'can não muda', 'She can use a computer.'),
                p('Correct', 'He can to drive.', 'sem to', 'He can drive.')
            ],
            translations: [
                t('Eu sou recepcionista.', 'I am a receptionist.'),
                t('Eu sei usar um computador.', 'I can use a computer.'),
                t('Ela consegue ajudar visitantes.', 'She can help visitors.'),
                t('Ele não sabe cozinhar.', 'He can’t cook.'),
                t('Você sabe falar espanhol?', 'Can you speak Spanish?'),
                t('Sim, sei.', 'Yes, I can.')
            ],
            expressions: [
                x('What do you do?', 'Qual é sua profissão?', 'Pergunta frequente sobre trabalho.', 'Hello, Mia. What do you do?', 'Olá, Mia. Qual é sua profissão?'),
                x('I work as a...', 'Eu trabalho como...', 'Resposta sobre ocupação.', 'I work as a receptionist.', 'Eu trabalho como recepcionista.'),
                x('Can you...?', 'Você sabe/consegue...?', 'Pergunta de habilidade.', 'Can you use a computer?', 'Você sabe usar um computador?'),
                x('I can, but I can’t...', 'Eu sei..., mas não sei...', 'Contraste duas habilidades.', 'I can cook, but I can’t drive.', 'Eu sei cozinhar, mas não sei dirigir.')
            ],
            dialogues: [
                dialogue('Profissão', line('A', 'What do you do?', 'Qual é sua profissão?'), line('B', 'I am a teacher.', 'Eu sou professor.')),
                dialogue('Idioma', line('A', 'Can you speak Spanish?', 'Você sabe falar espanhol?'), line('B', 'Yes, I can.', 'Sim, sei.')),
                dialogue('Computador', line('A', 'Can she use a computer?', 'Ela sabe usar computador?'), line('B', 'Yes, she can.', 'Sim, sabe.')),
                dialogue('Direção', line('A', 'Can he drive?', 'Ele sabe dirigir?'), line('B', 'No, he can’t.', 'Não, não sabe.'))
            ],
            reading: reading(
                'Three people at work',
                'Mia is a receptionist. She can speak Spanish and help visitors. Ben is a cook. He can prepare food, but he can’t drive. Leo is a driver, and he can use a computer.',
                question('What is Mia’s job?', 'She is a receptionist.'),
                question('What can Ben do?', 'He can prepare food.'),
                question('Who can drive?', 'Leo can drive.')
            ),
            homework: ['Seu trabalho ou trabalho ideal', 'Habilidades de três pessoas', 'Uma entrevista curta sobre profissão']
        }
        ,
        {
            number: 21,
            source: 18,
            stage: 'Place 1',
            title: 'My Home: There Is',
            newLanguage: ['there is', 'in/on/under', 'singular rooms and furniture'],
            recycledLanguage: ['a/an', 'this/that', 'home objects'],
            deferredLanguage: ['there are', 'many place prepositions', 'directions'],
            objectives: [
                'Nomear cômodos e móveis básicos.',
                'Dizer que existe uma coisa com there is.',
                'Localizar um objeto com in, on ou under.'
            ],
            intro: [
                line('Mia', 'There is a desk in my bedroom.', 'Há uma escrivaninha no meu quarto.'),
                line('Ben', 'Is there a computer on the desk?', 'Há um computador sobre a escrivaninha?'),
                line('Mia', 'Yes, there is.', 'Sim, há.'),
                line('Ben', 'And there is a bag under the chair.', 'E há uma bolsa debaixo da cadeira.')
            ],
            vocab: [
                v('bedroom', 'quarto', 'There is a bed in the bedroom.', 'Há uma cama no quarto.'),
                v('kitchen', 'cozinha', 'There is a table in the kitchen.', 'Há uma mesa na cozinha.'),
                v('bathroom', 'banheiro', 'There is a bathroom near the bedroom.', 'Há um banheiro perto do quarto.'),
                v('living room', 'sala de estar', 'There is a sofa in the living room.', 'Há um sofá na sala.'),
                v('bed', 'cama', 'There is a bed in the room.', 'Há uma cama no quarto.'),
                v('sofa', 'sofá', 'There is a sofa near the window.', 'Há um sofá perto da janela.'),
                v('desk', 'escrivaninha', 'There is a desk in my bedroom.', 'Há uma escrivaninha no meu quarto.'),
                v('lamp', 'luminária', 'There is a lamp on the desk.', 'Há uma luminária sobre a escrivaninha.')
            ],
            grammar: {
                title: 'There is + one thing',
                summary: 'Use there is para dizer que uma coisa existe em um lugar. Nesta aula, trabalhe somente com o singular.',
                rows: [
                    ['existência', 'There is + a/an + singular noun', 'There is a sofa.', 'Há um sofá.'],
                    ['localização', 'noun + in/on/under + place', 'A lamp is on the desk.', 'Uma luminária está sobre a mesa.'],
                    ['pergunta', 'Is there + a/an...?', 'Is there a desk? Yes, there is.', 'Há uma escrivaninha? Sim.']
                ],
                notes: [
                    'There is apresenta uma coisa singular.',
                    'Use in para dentro, on para sobre e under para embaixo.',
                    'There are e o plural serão o foco da próxima aula.'
                ]
            },
            practice: [
                p('Complete', 'There ___ a bed in the room.', 'singular', 'is'),
                p('Complete', 'There is ___ lamp on the desk.', 'artigo', 'a'),
                p('Choose', 'The bag is (in / on) the box.', 'dentro', 'in'),
                p('Choose', 'The book is (on / under) the table.', 'sobre', 'on'),
                p('Build', 'a sofa / There / is / in the living room', 'existência', 'There is a sofa in the living room.'),
                p('Build', 'there / Is / a desk / ?', 'pergunta', 'Is there a desk?'),
                p('Correct', 'There are a bed.', 'singular', 'There is a bed.'),
                p('Correct', 'There is lamp on desk.', 'artigos', 'There is a lamp on the desk.')
            ],
            translations: [
                t('Há uma cama no quarto.', 'There is a bed in the bedroom.'),
                t('Há um sofá na sala.', 'There is a sofa in the living room.'),
                t('Há uma luminária sobre a mesa.', 'There is a lamp on the desk.'),
                t('A bolsa está debaixo da cadeira.', 'The bag is under the chair.'),
                t('Há uma cozinha?', 'Is there a kitchen?'),
                t('Sim, há.', 'Yes, there is.')
            ],
            expressions: [
                x('There is...', 'Há...', 'Apresente uma coisa no lugar.', 'There is a desk in my room.', 'Há uma escrivaninha no meu quarto.'),
                x('Is there...?', 'Há...?', 'Pergunte sobre uma coisa.', 'Is there a bathroom?', 'Há um banheiro?'),
                x('On the left', 'À esquerda', 'Localização simples como bloco.', 'The bedroom is on the left.', 'O quarto fica à esquerda.'),
                x('On the right', 'À direita', 'Localização simples como bloco.', 'The kitchen is on the right.', 'A cozinha fica à direita.')
            ],
            dialogues: [
                dialogue('Quarto', line('A', 'Is there a desk in the bedroom?', 'Há uma escrivaninha no quarto?'), line('B', 'Yes, there is.', 'Sim, há.')),
                dialogue('Sala', line('A', 'There is a sofa in the living room.', 'Há um sofá na sala.'), line('B', 'The lamp is near the sofa.', 'A luminária fica perto do sofá.')),
                dialogue('Objeto', line('A', 'Where is the bag?', 'Onde está a bolsa?'), line('B', 'It is under the chair.', 'Ela está debaixo da cadeira.')),
                dialogue('Cozinha', line('A', 'Is there a table?', 'Há uma mesa?'), line('B', 'Yes, in the kitchen.', 'Sim, na cozinha.'))
            ],
            reading: reading(
                'Mia’s small apartment',
                'Mia has a small apartment. There is a sofa in the living room and a table in the kitchen. In her bedroom, there is a bed and a desk. A lamp is on the desk.',
                question('What is in the living room?', 'There is a sofa.'),
                question('Where is the table?', 'It is in the kitchen.'),
                question('What is on the desk?', 'A lamp is on the desk.')
            ),
            homework: ['Um cômodo com cinco objetos', 'Uma planta simples da casa', 'Perguntas com Is there...?']
        },
        {
            number: 22,
            source: 10,
            stage: 'Place 2',
            title: 'My Neighborhood: There Are',
            newLanguage: ['there are', 'are there...?', 'next to/across from'],
            recycledLanguage: ['there is', 'places', 'in/on/under'],
            deferredLanguage: ['multi-step directions', 'imperative routes', 'transportation systems'],
            objectives: [
                'Nomear lugares frequentes do bairro.',
                'Dizer que existem duas ou mais coisas com there are.',
                'Localizar lugares com next to e across from.'
            ],
            intro: [
                line('Mia', 'There are two cafés near my house.', 'Há duas cafeterias perto da minha casa.'),
                line('Ben', 'Is there a bank?', 'Há um banco?'),
                line('Mia', 'Yes. It is next to the supermarket.', 'Sim. Ele fica ao lado do supermercado.'),
                line('Ben', 'Are there any parks?', 'Há parques?')
            ],
            vocab: [
                v('bank', 'banco', 'There is a bank near here.', 'Há um banco perto daqui.'),
                v('supermarket', 'supermercado', 'The bank is next to the supermarket.', 'O banco fica ao lado do supermercado.'),
                v('pharmacy', 'farmácia', 'There are two pharmacies.', 'Há duas farmácias.'),
                v('park', 'parque', 'There is a park across from the school.', 'Há um parque em frente à escola.'),
                v('school', 'escola', 'The school is on Green Street.', 'A escola fica na Rua Green.'),
                v('café', 'cafeteria', 'There are three cafés.', 'Há três cafeterias.'),
                v('next to', 'ao lado de', 'The bank is next to the café.', 'O banco fica ao lado da cafeteria.'),
                v('across from', 'em frente a', 'The park is across from the school.', 'O parque fica em frente à escola.')
            ],
            grammar: {
                title: 'There are + plural places',
                summary: 'Use there are para apresentar duas ou mais pessoas, coisas ou lugares.',
                rows: [
                    ['plural', 'There are + number + plural noun', 'There are two cafés.', 'Há duas cafeterias.'],
                    ['pergunta plural', 'Are there + plural noun...?', 'Are there any parks?', 'Há parques?'],
                    ['contraste', 'There is one / There are two', 'There is a bank. There are two cafés.', 'Há um banco. Há duas cafeterias.']
                ],
                notes: [
                    'Use are com substantivo plural.',
                    'Em pergunta, coloque are antes de there.',
                    'Rotas com várias etapas serão estudadas no A2; aqui o foco é localização.'
                ]
            },
            practice: [
                p('Complete', 'There ___ two cafés.', 'plural', 'are'),
                p('Complete', '___ there any parks?', 'pergunta plural', 'Are'),
                p('Choose', 'There (is / are) a bank.', 'singular', 'is'),
                p('Choose', 'There (is / are) three schools.', 'plural', 'are'),
                p('Build', 'two pharmacies / are / There', 'plural', 'There are two pharmacies.'),
                p('Complete', 'The bank is ___ to the supermarket.', 'ao lado', 'next'),
                p('Correct', 'There is two cafés.', 'plural', 'There are two cafés.'),
                p('Correct', 'Are there a park?', 'singular pede Is there', 'Is there a park?')
            ],
            translations: [
                t('Há duas cafeterias.', 'There are two cafés.'),
                t('Há três farmácias.', 'There are three pharmacies.'),
                t('Há parques?', 'Are there any parks?'),
                t('O banco fica ao lado do supermercado.', 'The bank is next to the supermarket.'),
                t('O parque fica em frente à escola.', 'The park is across from the school.'),
                t('Há um banco perto daqui.', 'There is a bank near here.')
            ],
            expressions: [
                x('Is there a... near here?', 'Há um/uma... perto daqui?', 'Pergunta prática de localização.', 'Is there a bank near here?', 'Há um banco perto daqui?'),
                x('Are there any...?', 'Há algum/alguns...?', 'Pergunta sobre lugares no plural.', 'Are there any cafés?', 'Há cafeterias?'),
                x('It’s next to...', 'Fica ao lado de...', 'Localização de um lugar.', 'It’s next to the supermarket.', 'Fica ao lado do supermercado.'),
                x('It’s across from...', 'Fica em frente a...', 'Localização de um lugar.', 'It’s across from the park.', 'Fica em frente ao parque.')
            ],
            dialogues: [
                dialogue('Banco', line('A', 'Is there a bank near here?', 'Há um banco perto daqui?'), line('B', 'Yes, next to the café.', 'Sim, ao lado da cafeteria.')),
                dialogue('Parques', line('A', 'Are there any parks?', 'Há parques?'), line('B', 'Yes, there are two.', 'Sim, há dois.')),
                dialogue('Farmácia', line('A', 'Where is the pharmacy?', 'Onde fica a farmácia?'), line('B', 'It is across from the school.', 'Fica em frente à escola.')),
                dialogue('Cafeterias', line('A', 'There are three cafés.', 'Há três cafeterias.'), line('B', 'The small café is near the bank.', 'A cafeteria pequena fica perto do banco.'))
            ],
            reading: reading(
                'Green Street',
                'Green Street is small but useful. There is a bank next to the supermarket. There are two cafés and three small stores. A park is across from the school.',
                question('What is next to the supermarket?', 'The bank is next to it.'),
                question('How many cafés are there?', 'There are two cafés.'),
                question('Where is the park?', 'It is across from the school.')
            ),
            homework: ['Um mapa do seu bairro', 'Cinco frases com there is/are', 'Perguntas sobre lugares próximos']
        },
        {
            number: 23,
            source: 7,
            stage: 'Needs 1',
            title: 'Market Day: Food and Some',
            newLanguage: ['countable/uncountable recognition', 'some in affirmative sentences'],
            recycledLanguage: ['there is/are', 'numbers', 'a/an'],
            deferredLanguage: ['any', 'how much/how many', 'detailed quantities'],
            objectives: [
                'Nomear alimentos e bebidas essenciais.',
                'Diferenciar itens contáveis e não contáveis em exemplos frequentes.',
                'Usar some em frases afirmativas de compra ou disponibilidade.'
            ],
            intro: [
                line('Mia', 'We need some apples and some rice.', 'Precisamos de algumas maçãs e um pouco de arroz.'),
                line('Ben', 'There are four apples here.', 'Há quatro maçãs aqui.'),
                line('Mia', 'Good. There is some rice too.', 'Ótimo. Há arroz também.'),
                line('Ben', 'Let’s get some water.', 'Vamos pegar água.')
            ],
            vocab: [
                v('apple', 'maçã', 'There are four apples.', 'Há quatro maçãs.'),
                v('banana', 'banana', 'I have two bananas.', 'Eu tenho duas bananas.'),
                v('egg', 'ovo', 'We need six eggs.', 'Precisamos de seis ovos.'),
                v('rice', 'arroz', 'There is some rice.', 'Há um pouco de arroz.'),
                v('bread', 'pão', 'We need some bread.', 'Precisamos de pão.'),
                v('water', 'água', 'There is some water.', 'Há um pouco de água.'),
                v('milk', 'leite', 'I have some milk.', 'Eu tenho um pouco de leite.'),
                v('shopping list', 'lista de compras', 'The apples are on the shopping list.', 'As maçãs estão na lista de compras.')
            ],
            grammar: {
                title: 'Countable nouns and some',
                summary: 'Conte maçãs, bananas e ovos diretamente. Use some em frases afirmativas com quantidades não específicas.',
                rows: [
                    ['contável', 'number + plural noun', 'two apples / six eggs', 'duas maçãs / seis ovos'],
                    ['quantidade não específica', 'some + noun', 'some rice / some apples', 'um pouco de arroz / algumas maçãs'],
                    ['disponibilidade', 'There is/are + some...', 'There is some milk.', 'Há um pouco de leite.']
                ],
                notes: [
                    'Itens contáveis podem aparecer com número e plural.',
                    'Rice, bread, water e milk não recebem plural nesses usos.',
                    'Any e perguntas de quantidade serão trabalhados na aula seguinte.'
                ]
            },
            practice: [
                p('Classify', 'apple', 'contável ou não contável', 'countable'),
                p('Classify', 'rice', 'contável ou não contável', 'uncountable'),
                p('Complete', 'We need ___ apples.', 'quantidade não específica', 'some'),
                p('Complete', 'There is ___ water.', 'afirmativa', 'some'),
                p('Build', 'eggs / six / need / We', 'contável', 'We need six eggs.'),
                p('Build', 'some / have / I / milk', 'não específico', 'I have some milk.'),
                p('Correct', 'We need two rice.', 'não contável', 'We need some rice.'),
                p('Correct', 'There are some bread.', 'bread singular no uso', 'There is some bread.')
            ],
            translations: [
                t('Precisamos de algumas maçãs.', 'We need some apples.'),
                t('Há quatro bananas.', 'There are four bananas.'),
                t('Há um pouco de arroz.', 'There is some rice.'),
                t('Eu tenho um pouco de leite.', 'I have some milk.'),
                t('Precisamos de seis ovos.', 'We need six eggs.'),
                t('Há água.', 'There is some water.')
            ],
            expressions: [
                x('We need...', 'Precisamos de...', 'Use com a lista de compras.', 'We need some bread.', 'Precisamos de pão.'),
                x('Let’s get...', 'Vamos pegar/comprar...', 'Sugestão simples no mercado.', 'Let’s get some apples.', 'Vamos comprar algumas maçãs.'),
                x('That’s enough.', 'Isso é suficiente.', 'Encerre uma quantidade.', 'Four apples? That’s enough.', 'Quatro maçãs? Isso é suficiente.'),
                x('It’s on the list.', 'Está na lista.', 'Confirme um item planejado.', 'Milk is on the list.', 'Leite está na lista.')
            ],
            dialogues: [
                dialogue('Maçãs', line('A', 'We need some apples.', 'Precisamos de algumas maçãs.'), line('B', 'Four apples?', 'Quatro maçãs?')),
                dialogue('Arroz', line('A', 'Is rice on the list?', 'Arroz está na lista?'), line('B', 'Yes, we need some rice.', 'Sim, precisamos de arroz.')),
                dialogue('Ovos', line('A', 'We need six eggs.', 'Precisamos de seis ovos.'), line('B', 'That’s enough.', 'Isso é suficiente.')),
                dialogue('Água', line('A', 'Let’s get some water.', 'Vamos pegar água.'), line('B', 'Good idea.', 'Boa ideia.'))
            ],
            reading: reading(
                'A short shopping list',
                'Mia’s list has four apples, six eggs, some bread, some rice, and some milk. At the market, there are no apples on the first table, but there are apples near the door.',
                question('How many eggs does Mia need?', 'She needs six eggs.'),
                question('Which non-countable foods are on the list?', 'Bread, rice, and milk.'),
                question('Where are the apples?', 'They are near the door.')
            ),
            homework: ['Uma lista de compras curta', 'Itens contáveis e não contáveis da cozinha', 'Um diálogo no mercado']
        },
        {
            number: 24,
            source: 7,
            stage: 'Needs 2',
            title: 'At the Café: Some and Any',
            newLanguage: ['any in questions/negatives', 'some in offers/requests as chunks', 'I’d like...'],
            recycledLanguage: ['food', 'some affirmative', 'countable recognition'],
            deferredLanguage: ['how much/how many system', 'complex service requests'],
            objectives: [
                'Perguntar se um item está disponível com any.',
                'Usar not any em uma resposta negativa.',
                'Fazer um pedido curto com I’d like...'
            ],
            intro: [
                line('Server', 'What would you like?', 'O que você gostaria?'),
                line('Mia', 'I’d like some tea, please.', 'Eu gostaria de chá, por favor.'),
                line('Server', 'Would you like any food?', 'Você gostaria de alguma comida?'),
                line('Mia', 'No, thank you.', 'Não, obrigada.')
            ],
            vocab: [
                v('coffee', 'café', 'I’d like some coffee.', 'Eu gostaria de café.'),
                v('tea', 'chá', 'I’d like some tea.', 'Eu gostaria de chá.'),
                v('sandwich', 'sanduíche', 'There are some sandwiches.', 'Há alguns sanduíches.'),
                v('cake', 'bolo', 'Do you have any cake?', 'Vocês têm bolo?'),
                v('menu', 'cardápio', 'Here is the menu.', 'Aqui está o cardápio.'),
                v('bill', 'conta', 'Can I have the bill?', 'Pode trazer a conta?'),
                v('anything else', 'mais alguma coisa', 'Anything else?', 'Mais alguma coisa?'),
                v('please', 'por favor', 'Some tea, please.', 'Um pouco de chá, por favor.')
            ],
            grammar: {
                title: 'Some in statements / Any in questions and negatives',
                summary: 'Use some em afirmações e pedidos-modelo. Use any principalmente em perguntas e negativas.',
                rows: [
                    ['afirmação/pedido', 'some + noun', 'I’d like some tea.', 'Eu gostaria de chá.'],
                    ['pergunta', 'any + noun?', 'Do you have any cake?', 'Vocês têm bolo?'],
                    ['negativa', 'not + any + noun', 'We don’t have any cake.', 'Não temos bolo.']
                ],
                notes: [
                    'Some e any indicam quantidade não específica.',
                    'Memorize I’d like... como um bloco educado de pedido.',
                    'How much e how many podem ficar para o A2.'
                ]
            },
            practice: [
                p('Choose', 'I’d like (some / any) tea.', 'pedido afirmativo', 'some'),
                p('Choose', 'Do you have (some / any) cake?', 'pergunta', 'any'),
                p('Complete', 'We don’t have ___ sandwiches.', 'negativa', 'any'),
                p('Build', 'like / I’d / coffee / some', 'pedido', 'I’d like some coffee.'),
                p('Build', 'have / you / cake / any / Do / ?', 'pergunta', 'Do you have any cake?'),
                p('Answer', 'Anything else?', 'negativa educada', 'No, thank you.'),
                p('Correct', 'I’d like any tea.', 'pedido usa some', 'I’d like some tea.'),
                p('Correct', 'We don’t have some cake.', 'negativa usa any', 'We don’t have any cake.')
            ],
            translations: [
                t('Eu gostaria de café, por favor.', 'I’d like some coffee, please.'),
                t('Vocês têm bolo?', 'Do you have any cake?'),
                t('Não temos sanduíches.', 'We don’t have any sandwiches.'),
                t('Aqui está o cardápio.', 'Here is the menu.'),
                t('Mais alguma coisa?', 'Anything else?'),
                t('A conta, por favor.', 'The bill, please.')
            ],
            expressions: [
                x('I’d like..., please.', 'Eu gostaria de..., por favor.', 'Pedido educado e direto.', 'I’d like some tea, please.', 'Eu gostaria de chá, por favor.'),
                x('Do you have any...?', 'Vocês têm...?', 'Pergunta sobre disponibilidade.', 'Do you have any sandwiches?', 'Vocês têm sanduíches?'),
                x('Anything else?', 'Mais alguma coisa?', 'Pergunta comum no atendimento.', 'Anything else for you?', 'Mais alguma coisa para você?'),
                x('The bill, please.', 'A conta, por favor.', 'Pedido ao finalizar.', 'Excuse me. The bill, please.', 'Com licença. A conta, por favor.')
            ],
            dialogues: [
                dialogue('Pedido', line('A', 'What would you like?', 'O que você gostaria?'), line('B', 'I’d like some tea, please.', 'Eu gostaria de chá, por favor.')),
                dialogue('Disponibilidade', line('A', 'Do you have any cake?', 'Vocês têm bolo?'), line('B', 'Yes, we do.', 'Sim, temos.')),
                dialogue('Sem item', line('A', 'Do you have any sandwiches?', 'Vocês têm sanduíches?'), line('B', 'No, we don’t have any.', 'Não, não temos.')),
                dialogue('Final', line('A', 'Anything else?', 'Mais alguma coisa?'), line('B', 'No. The bill, please.', 'Não. A conta, por favor.'))
            ],
            reading: reading(
                'A simple café order',
                'Mia is at a café. She would like some tea and a sandwich. The café does not have any cheese sandwiches, so she orders a chicken sandwich. At the end, she asks for the bill.',
                question('What drink does Mia order?', 'She orders tea.'),
                question('Which sandwich is not available?', 'A cheese sandwich is not available.'),
                question('What does she ask for at the end?', 'She asks for the bill.')
            ),
            homework: ['Um pedido curto de cafeteria', 'Um cardápio com itens disponíveis', 'Um diálogo usando some e any']
        },
        {
            number: 26,
            source: 19,
            stage: 'Action 1',
            title: 'Talent Show: Can You...?',
            newLanguage: ['recycling can in extended interaction', 'and/but for abilities'],
            recycledLanguage: ['can/can’t', 'jobs', 'hobbies', 'short answers'],
            deferredLanguage: ['comparatives', 'advanced performance language'],
            objectives: [
                'Reciclar can e can’t em uma situação de seleção.',
                'Conectar duas habilidades com and ou but.',
                'Fazer perguntas de acompanhamento sobre talentos.'
            ],
            intro: [
                line('Mia', 'Can you sing?', 'Você sabe cantar?'),
                line('Ben', 'Yes, I can sing and play the guitar.', 'Sim, eu sei cantar e tocar violão.'),
                line('Mia', 'Can you dance too?', 'Você também sabe dançar?'),
                line('Ben', 'No, I can’t dance, but I can act.', 'Não, não sei dançar, mas sei atuar.')
            ],
            vocab: [
                v('sing', 'cantar', 'I can sing.', 'Eu sei cantar.'),
                v('dance', 'dançar', 'She can dance.', 'Ela sabe dançar.'),
                v('play the guitar', 'tocar violão', 'He can play the guitar.', 'Ele sabe tocar violão.'),
                v('act', 'atuar', 'I can act in a play.', 'Eu sei atuar em uma peça.'),
                v('draw', 'desenhar', 'She can draw very well.', 'Ela sabe desenhar muito bem.'),
                v('take photos', 'tirar fotos', 'He can take photos.', 'Ele sabe tirar fotos.'),
                v('talent', 'talento', 'Music is her talent.', 'Música é o talento dela.'),
                v('show', 'apresentação; show', 'The talent show is on Friday.', 'O show de talentos é na sexta-feira.')
            ],
            grammar: {
                title: 'Can + verb, and / but',
                summary: 'Esta aula não apresenta um novo tempo verbal. Ela amplia can em respostas mais longas usando and e but.',
                rows: [
                    ['duas habilidades', 'can + verb + and + verb', 'I can sing and act.', 'Eu sei cantar e atuar.'],
                    ['contraste', 'can + verb, but can’t + verb', 'I can sing, but I can’t dance.', 'Eu sei cantar, mas não sei dançar.'],
                    ['pergunta extra', 'Can you + another verb?', 'Can you play the guitar too?', 'Você também sabe tocar violão?']
                ],
                notes: [
                    'Não repita to depois de can.',
                    'And soma habilidades; but marca contraste.',
                    'O objetivo principal é responder e continuar a conversa.'
                ]
            },
            practice: [
                p('Combine', 'I can sing. I can act.', 'use and', 'I can sing and act.'),
                p('Combine', 'I can draw. I can’t dance.', 'use but', 'I can draw, but I can’t dance.'),
                p('Complete', 'She can sing ___ play the guitar.', 'adição', 'and'),
                p('Complete', 'He can act, ___ he can’t sing.', 'contraste', 'but'),
                p('Build', 'you / photos / take / Can / ?', 'pergunta', 'Can you take photos?'),
                p('Answer', 'Can you dance?', 'sim + outra habilidade', 'Yes, I can, and I can sing too.'),
                p('Correct', 'I can to act and dance.', 'sem to', 'I can act and dance.'),
                p('Correct', 'She cans draw.', 'can não muda', 'She can draw.')
            ],
            translations: [
                t('Eu sei cantar e atuar.', 'I can sing and act.'),
                t('Eu sei desenhar, mas não sei dançar.', 'I can draw, but I can’t dance.'),
                t('Você sabe tocar violão?', 'Can you play the guitar?'),
                t('Ela sabe tirar fotos.', 'She can take photos.'),
                t('O show de talentos é na sexta.', 'The talent show is on Friday.'),
                t('Qual é seu talento?', 'What is your talent?')
            ],
            expressions: [
                x('What can you do?', 'O que você sabe fazer?', 'Pergunta aberta sobre habilidade.', 'What can you do for the show?', 'O que você sabe fazer para o show?'),
                x('I can... and...', 'Eu sei... e...', 'Some duas habilidades.', 'I can sing and act.', 'Eu sei cantar e atuar.'),
                x('I can..., but I can’t...', 'Eu sei..., mas não sei...', 'Contraste habilidades.', 'I can draw, but I can’t dance.', 'Eu sei desenhar, mas não sei dançar.'),
                x('That’s great!', 'Isso é ótimo!', 'Reação positiva.', 'You can sing? That’s great!', 'Você sabe cantar? Isso é ótimo!')
            ],
            dialogues: [
                dialogue('Canto', line('A', 'Can you sing?', 'Você sabe cantar?'), line('B', 'Yes, I can.', 'Sim, sei.')),
                dialogue('Dois talentos', line('A', 'What can you do?', 'O que você sabe fazer?'), line('B', 'I can act and dance.', 'Eu sei atuar e dançar.')),
                dialogue('Contraste', line('A', 'Can she play the guitar?', 'Ela sabe tocar violão?'), line('B', 'Yes, but she can’t sing.', 'Sim, mas ela não sabe cantar.')),
                dialogue('Reação', line('A', 'I can take photos.', 'Eu sei tirar fotos.'), line('B', 'That’s great!', 'Isso é ótimo!'))
            ],
            reading: reading(
                'The class talent show',
                'The class has a talent show on Friday. Mia can sing and play the guitar. Ben can act, but he can’t dance. Ana can draw and take photos for the show.',
                question('What can Mia do?', 'She can sing and play the guitar.'),
                question('Can Ben dance?', 'No, he can’t.'),
                question('Who can take photos?', 'Ana can take photos.')
            ),
            homework: ['Seu cartão de talentos', 'Uma equipe para um show', 'Entrevista com três perguntas usando can']
        },
        {
            number: 27,
            source: 23,
            stage: 'Action 2',
            title: 'What Is Happening Now?',
            newLanguage: ['Present Continuous affirmative', 'be + verb-ing'],
            recycledLanguage: ['am/is/are', 'action verbs', 'people'],
            deferredLanguage: ['negative and questions in Present Continuous', 'Present Simple contrast'],
            objectives: [
                'Descrever uma ação acontecendo agora.',
                'Combinar am, is ou are com verbo + ing.',
                'Identificar quem está realizando cada ação.'
            ],
            intro: [
                line('Mia', 'I am waiting for the show.', 'Eu estou esperando o show.'),
                line('Ben', 'Leo is playing the guitar.', 'Leo está tocando violão.'),
                line('Mia', 'Ana and Eva are taking photos.', 'Ana e Eva estão tirando fotos.'),
                line('Ben', 'Everyone is getting ready.', 'Todos estão se preparando.')
            ],
            vocab: [
                v('waiting', 'esperando', 'I am waiting outside.', 'Eu estou esperando do lado de fora.'),
                v('talking', 'conversando', 'She is talking to Mia.', 'Ela está conversando com Mia.'),
                v('playing', 'tocando; jogando', 'He is playing the guitar.', 'Ele está tocando violão.'),
                v('reading', 'lendo', 'She is reading a message.', 'Ela está lendo uma mensagem.'),
                v('writing', 'escrevendo', 'I am writing a note.', 'Eu estou escrevendo um bilhete.'),
                v('taking photos', 'tirando fotos', 'They are taking photos.', 'Eles estão tirando fotos.'),
                v('sitting', 'sentado(a)', 'Ben is sitting near the door.', 'Ben está sentado perto da porta.'),
                v('standing', 'em pé', 'Mia is standing by the window.', 'Mia está em pé perto da janela.')
            ],
            grammar: {
                title: 'Am/Is/Are + verb-ing',
                summary: 'Use o Present Continuous para uma ação em andamento agora. Primeiro escolha am/is/are; depois use o verbo com -ing.',
                rows: [
                    ['I', 'I am + verb-ing', 'I am waiting.', 'Eu estou esperando.'],
                    ['he/she', 'He/She is + verb-ing', 'She is reading.', 'Ela está lendo.'],
                    ['we/they', 'We/They are + verb-ing', 'They are talking.', 'Eles estão conversando.']
                ],
                notes: [
                    'A forma -ing precisa do verbo be.',
                    'Nesta aula, use somente frases afirmativas.',
                    'Negativas e perguntas serão praticadas na próxima aula.'
                ]
            },
            practice: [
                p('Complete', 'I ___ waiting.', 'I + am', 'am'),
                p('Complete', 'She ___ reading.', 'she + is', 'is'),
                p('Complete', 'They ___ talking.', 'they + are', 'are'),
                p('Form', 'play + ing', 'ação agora', 'playing'),
                p('Form', 'write + ing', 'retire e', 'writing'),
                p('Build', 'is / Leo / guitar / playing / the', 'agora', 'Leo is playing the guitar.'),
                p('Correct', 'She reading a message.', 'falta be', 'She is reading a message.'),
                p('Correct', 'They is taking photos.', 'they + are', 'They are taking photos.')
            ],
            translations: [
                t('Eu estou esperando.', 'I am waiting.'),
                t('Ela está lendo uma mensagem.', 'She is reading a message.'),
                t('Ele está tocando violão.', 'He is playing the guitar.'),
                t('Eles estão conversando.', 'They are talking.'),
                t('Nós estamos tirando fotos.', 'We are taking photos.'),
                t('Mia está em pé perto da janela.', 'Mia is standing by the window.')
            ],
            expressions: [
                x('Right now', 'Agora mesmo', 'Marca a ação em andamento.', 'I am working right now.', 'Eu estou trabalhando agora mesmo.'),
                x('At the moment', 'Neste momento', 'Outra marca de ação atual.', 'She is reading at the moment.', 'Ela está lendo neste momento.'),
                x('Look!', 'Olhe!', 'Chama atenção para a cena.', 'Look! Leo is playing.', 'Olhe! Leo está tocando.'),
                x('Everyone is...', 'Todos estão...', 'Descreve o grupo como unidade.', 'Everyone is getting ready.', 'Todos estão se preparando.')
            ],
            dialogues: [
                dialogue('Espera', line('A', 'What is happening?', 'O que está acontecendo?'), line('B', 'I am waiting outside.', 'Eu estou esperando lá fora.')),
                dialogue('Música', line('A', 'Look!', 'Olhe!'), line('B', 'Leo is playing the guitar.', 'Leo está tocando violão.')),
                dialogue('Fotos', line('A', 'Ana and Eva are taking photos.', 'Ana e Eva estão tirando fotos.'), line('B', 'They are near the stage.', 'Elas estão perto do palco.')),
                dialogue('Preparação', line('A', 'Everyone is getting ready.', 'Todos estão se preparando.'), line('B', 'The show is starting soon.', 'O show vai começar em breve.'))
            ],
            reading: reading(
                'Before the show',
                'The class is busy. Mia is waiting near the stage. Leo is playing the guitar. Ana and Eva are taking photos. Ben is sitting by the door and writing a note.',
                question('Where is Mia waiting?', 'She is waiting near the stage.'),
                question('What is Leo doing?', 'He is playing the guitar.'),
                question('Who is writing a note?', 'Ben is writing a note.')
            ),
            homework: ['Uma cena em andamento', 'Descrição de uma fotografia', 'Frases sobre o que acontece agora']
        },
        {
            number: 28,
            source: 23,
            stage: 'Action 3',
            title: 'Are You Doing It Now?',
            newLanguage: ['Present Continuous questions', 'Present Continuous negatives'],
            recycledLanguage: ['am/is/are + ing', 'short answers', 'actions now'],
            deferredLanguage: ['full Present Simple versus Continuous contrast', 'future arrangements'],
            objectives: [
                'Fazer perguntas sobre ações em andamento.',
                'Responder com respostas curtas usando be.',
                'Dizer que uma ação não está acontecendo agora.'
            ],
            intro: [
                line('Mia', 'Are you waiting for Leo?', 'Você está esperando o Leo?'),
                line('Ben', 'No, I’m not. I’m waiting for Ana.', 'Não. Estou esperando a Ana.'),
                line('Mia', 'Is she coming now?', 'Ela está vindo agora?'),
                line('Ben', 'Yes, she is.', 'Sim.')
            ],
            vocab: [
                v('coming', 'vindo', 'She is coming now.', 'Ela está vindo agora.'),
                v('leaving', 'saindo; indo embora', 'He is leaving the office.', 'Ele está saindo do escritório.'),
                v('working', 'trabalhando', 'Are you working now?', 'Você está trabalhando agora?'),
                v('studying', 'estudando', 'She is not studying now.', 'Ela não está estudando agora.'),
                v('cooking', 'cozinhando', 'Is he cooking?', 'Ele está cozinhando?'),
                v('sleeping', 'dormindo', 'The baby is sleeping.', 'O bebê está dormindo.'),
                v('now', 'agora', 'I am working now.', 'Eu estou trabalhando agora.'),
                v('today', 'hoje', 'She is working at home today.', 'Ela está trabalhando em casa hoje.')
            ],
            grammar: {
                title: 'Is/Are + subject + verb-ing?',
                summary: 'Para perguntar, mova am/is/are para antes do sujeito. Para negar, acrescente not depois de be.',
                rows: [
                    ['pergunta', 'Am/Is/Are + subject + verb-ing?', 'Are you working?', 'Você está trabalhando?'],
                    ['resposta', 'Yes, subject + be. / No, subject + be not.', 'Yes, she is. / No, she isn’t.', 'Sim. / Não.'],
                    ['negativa', 'subject + be + not + verb-ing', 'He is not cooking.', 'Ele não está cozinhando.']
                ],
                notes: [
                    'A pergunta começa com a forma correta de be.',
                    'A resposta curta repete am, is ou are.',
                    'O contraste detalhado com hábitos ficará para outro nível; aqui use now e today como pistas.'
                ]
            },
            practice: [
                p('Build', 'you / Are / working / ?', 'pergunta', 'Are you working?'),
                p('Build', 'she / Is / coming / now / ?', 'pergunta', 'Is she coming now?'),
                p('Answer', 'Are you studying?', 'negativa', 'No, I’m not.'),
                p('Answer', 'Is Leo cooking?', 'positiva', 'Yes, he is.'),
                p('Complete', 'She is ___ working today.', 'negativa', 'not'),
                p('Transform', 'He is sleeping. → question', 'inverta is', 'Is he sleeping?'),
                p('Correct', 'Are she coming?', 'she + is', 'Is she coming?'),
                p('Correct', 'He not is working.', 'not depois de is', 'He is not working.')
            ],
            translations: [
                t('Você está trabalhando agora?', 'Are you working now?'),
                t('Não, não estou.', 'No, I’m not.'),
                t('Ela está vindo?', 'Is she coming?'),
                t('Sim, está.', 'Yes, she is.'),
                t('Ele não está cozinhando.', 'He is not cooking.'),
                t('Eles estão estudando hoje?', 'Are they studying today?')
            ],
            expressions: [
                x('What are you doing?', 'O que você está fazendo?', 'Pergunta frequente sobre o momento.', 'Hi, Ben. What are you doing?', 'Oi, Ben. O que você está fazendo?'),
                x('I’m ... right now.', 'Estou... agora.', 'Resposta sobre ação atual.', 'I’m working right now.', 'Estou trabalhando agora.'),
                x('Not at the moment.', 'Não neste momento.', 'Negativa curta e natural.', 'Are you studying? Not at the moment.', 'Você está estudando? Não neste momento.'),
                x('Yes, I am. / No, I’m not.', 'Sim. / Não.', 'Respostas curtas com I.', 'Are you waiting? Yes, I am.', 'Você está esperando? Sim.')
            ],
            dialogues: [
                dialogue('Trabalho', line('A', 'Are you working now?', 'Você está trabalhando agora?'), line('B', 'No, I’m not.', 'Não, não estou.')),
                dialogue('Chegada', line('A', 'Is she coming?', 'Ela está vindo?'), line('B', 'Yes, she is.', 'Sim, está.')),
                dialogue('Cozinha', line('A', 'Is Leo cooking?', 'Leo está cozinhando?'), line('B', 'No, he isn’t.', 'Não, não está.')),
                dialogue('Atividade', line('A', 'What are you doing?', 'O que você está fazendo?'), line('B', 'I’m studying.', 'Estou estudando.'))
            ],
            reading: reading(
                'A video call',
                'Mia calls Ben. He is not working; he is cooking dinner. Ana is studying in the living room. Leo is not studying. He is sleeping on the sofa.',
                question('Is Ben working?', 'No, he isn’t.'),
                question('What is Ana doing?', 'She is studying.'),
                question('Is Leo studying?', 'No, he is sleeping.')
            ),
            homework: ['Perguntas sobre uma fotografia', 'Um diálogo por chamada de vídeo', 'Quatro ações afirmativas e duas negativas']
        },
        {
            number: 29,
            source: 29,
            stage: 'Action 4',
            title: 'Where Were You?',
            newLanguage: ['was/were', 'wasn’t/weren’t', 'Where were...?'],
            recycledLanguage: ['be in the present', 'places', 'time expressions'],
            deferredLanguage: ['Past Simple action verbs', 'did questions', 'past narratives'],
            objectives: [
                'Falar sobre localização e estado em um momento passado.',
                'Escolher was ou were de acordo com o sujeito.',
                'Perguntar onde alguém estava com Where was/were...?'
            ],
            intro: [
                line('Mia', 'Where were you yesterday?', 'Onde você estava ontem?'),
                line('Ben', 'I was at home.', 'Eu estava em casa.'),
                line('Mia', 'Was Ana with you?', 'A Ana estava com você?'),
                line('Ben', 'No, she was at work.', 'Não, ela estava no trabalho.')
            ],
            vocab: [
                v('yesterday', 'ontem', 'I was at home yesterday.', 'Eu estava em casa ontem.'),
                v('last night', 'ontem à noite', 'She was tired last night.', 'Ela estava cansada ontem à noite.'),
                v('at home', 'em casa', 'We were at home.', 'Nós estávamos em casa.'),
                v('at work', 'no trabalho', 'He was at work.', 'Ele estava no trabalho.'),
                v('at school', 'na escola', 'They were at school.', 'Eles estavam na escola.'),
                v('tired', 'cansado(a)', 'I was tired.', 'Eu estava cansado.'),
                v('busy', 'ocupado(a)', 'She was busy yesterday.', 'Ela estava ocupada ontem.'),
                v('happy', 'feliz', 'They were happy.', 'Eles estavam felizes.')
            ],
            grammar: {
                title: 'Was / were',
                summary: 'Was e were são formas passadas do verbo be. Use-as para lugar, condição ou identificação no passado — sem adicionar verbos de ação nesta etapa.',
                rows: [
                    ['I/he/she/it', 'was / wasn’t', 'She was at work.', 'Ela estava no trabalho.'],
                    ['you/we/they', 'were / weren’t', 'They were at school.', 'Eles estavam na escola.'],
                    ['pergunta', 'Was/Were + subject...?', 'Where were you? Was she home?', 'Onde você estava? Ela estava em casa?']
                ],
                notes: [
                    'Was combina com I, he, she e it.',
                    'Were combina com you, we e they.',
                    'Verbos de ação no Past Simple e perguntas com did ficam para o A2.'
                ]
            },
            practice: [
                p('Complete', 'I ___ at home yesterday.', 'I', 'was'),
                p('Complete', 'They ___ at school.', 'they', 'were'),
                p('Choose', 'She (was / were) busy.', 'she', 'was'),
                p('Choose', 'We (was / were) happy.', 'we', 'were'),
                p('Build', 'you / Where / were / ?', 'pergunta', 'Where were you?'),
                p('Answer', 'Was Ana at home?', 'negativa', 'No, she wasn’t.'),
                p('Correct', 'I were at work.', 'I + was', 'I was at work.'),
                p('Correct', 'Were he tired?', 'he + was', 'Was he tired?')
            ],
            translations: [
                t('Eu estava em casa ontem.', 'I was at home yesterday.'),
                t('Ela estava no trabalho.', 'She was at work.'),
                t('Eles estavam na escola.', 'They were at school.'),
                t('Onde você estava?', 'Where were you?'),
                t('Ela estava em casa?', 'Was she at home?'),
                t('Não, ela não estava.', 'No, she wasn’t.')
            ],
            expressions: [
                x('Where were you?', 'Onde você estava?', 'Pergunta sobre localização passada.', 'Where were you last night?', 'Onde você estava ontem à noite?'),
                x('I was at...', 'Eu estava em...', 'Resposta sobre localização.', 'I was at home.', 'Eu estava em casa.'),
                x('How was it?', 'Como foi?', 'Pergunta simples sobre experiência ou situação.', 'How was the class?', 'Como foi a aula?'),
                x('It was great.', 'Foi ótimo.', 'Avaliação curta no passado.', 'The show was great.', 'O show foi ótimo.')
            ],
            dialogues: [
                dialogue('Ontem', line('A', 'Where were you yesterday?', 'Onde você estava ontem?'), line('B', 'I was at home.', 'Eu estava em casa.')),
                dialogue('Trabalho', line('A', 'Was Ana at home?', 'Ana estava em casa?'), line('B', 'No, she was at work.', 'Não, ela estava no trabalho.')),
                dialogue('Escola', line('A', 'Were they at school?', 'Eles estavam na escola?'), line('B', 'Yes, they were.', 'Sim, estavam.')),
                dialogue('Avaliação', line('A', 'How was the show?', 'Como foi o show?'), line('B', 'It was great.', 'Foi ótimo.'))
            ],
            reading: reading(
                'Yesterday at six',
                'Yesterday at six, Mia was at work. Ben was at home, and Ana was at school. Leo and Eva were at a café. They were tired, but they were happy.',
                question('Where was Mia?', 'She was at work.'),
                question('Who was at home?', 'Ben was at home.'),
                question('Where were Leo and Eva?', 'They were at a café.')
            ),
            homework: ['Onde quatro pessoas estavam ontem', 'Um diálogo com Where were you?', 'Uma linha do tempo somente com was/were']
        }
    ];

    const cadenceLessons = {};
    specs.forEach(spec => {
        cadenceLessons[spec.number] = buildLesson(spec);
    });

    data.lessons = cadenceLessons;
    data.cadenceVersion = '2026.07.29-gradual-a1';
}(window));
