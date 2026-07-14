(function () {
    const lessonTitles = [
        'Greetings and Introductions',
        'Personal Information',
        'Family and Relationships',
        'Review 1: Meeting People',
        'Daily Routine',
        'Time and Schedules',
        'Food and Drinks',
        'Review 2: Everyday Life',
        'Describing People',
        'Places in Town',
        'Asking for Directions',
        'Review 3: People and Places',
        'Weather and Seasons',
        'Hobbies and Free Time',
        'Clothes and Shopping',
        'Review 4: Daily Choices',
        'Health and Basic Advice',
        'Home and Furniture',
        'School and Work',
        'Review 5: Home, Health and Work',
        'Travel and Transportation',
        'Dates, Holidays and Celebrations',
        'Actions Now: Sports and Activities',
        'Review 6: Getting Around',
        'Animals and Nature',
        'Technology and Communication',
        'Countries, Nationalities and Languages',
        'Review 7: The World Around Us',
        'Past Simple: Yesterday and Life Events',
        'Comparatives and Everyday Choices',
        'Going To: Plans and Intentions',
        'Final Review and Project'
    ];

    const unitLabels = [
        'Foundations', 'Foundations', 'Foundations', 'Checkpoint 1',
        'Everyday Life', 'Everyday Life', 'Everyday Life', 'Checkpoint 2',
        'People & Places', 'People & Places', 'People & Places', 'Checkpoint 3',
        'Daily Choices', 'Daily Choices', 'Daily Choices', 'Checkpoint 4',
        'Real-Life Needs', 'Real-Life Needs', 'Real-Life Needs', 'Checkpoint 5',
        'Communication', 'Communication', 'Communication', 'Checkpoint 6',
        'Our World', 'Our World', 'Our World', 'Checkpoint 7',
        'A2 Bridge', 'A2 Bridge', 'A2 Bridge', 'Final Project'
    ];

    const lessons = {
        1: {
            title: lessonTitles[0],
            objectives: [
                'Cumprimentar pessoas em diferentes momentos do dia.',
                'Dizer seu nome e apresentar outra pessoa.',
                'Perguntar como alguém está e responder com naturalidade.'
            ],
            intro: [
                ['Sofia', 'Good morning! Is this your first class here?'],
                ['Lucas', 'Yes, it is. My name is Lucas.'],
                ['Sofia', 'I am Sofia. Nice to meet you, Lucas.'],
                ['Lucas', 'Nice to meet you too. How are you?'],
                ['Sofia', 'I am fine, thanks. Are you ready?'],
                ['Lucas', 'Yes, I am. Let\'s go inside.']
            ],
            vocab: [
                ['hello', 'olá', 'Hello, I am Sofia.'],
                ['good morning', 'bom dia', 'Good morning, Mr. Lee.'],
                ['name', 'nome', 'My name is Lucas.'],
                ['fine', 'bem', 'I am fine, thanks.'],
                ['thanks', 'obrigado(a)', 'I am fine, thanks.'],
                ['please', 'por favor', 'Come in, please.'],
                ['ready', 'pronto(a)', 'Are you ready?'],
                ['goodbye', 'tchau', 'Goodbye! See you tomorrow.']
            ],
            grammar: {
                title: 'Subject pronouns + verbo to be',
                summary: 'Use o verbo to be para dizer quem você é, como está e para identificar pessoas. A forma muda de acordo com o sujeito.',
                rows: [
                    ['I', 'am / am not', 'I am Lucas. / I am not tired.', 'Eu sou Lucas. / Eu não estou cansado.'],
                    ['you / we / they', 'are / are not', 'You are ready. / We are not late.', 'Você está pronto. / Nós não estamos atrasados.'],
                    ['he / she / it', 'is / is not', 'She is Sofia. / He is not here.', 'Ela é Sofia. / Ele não está aqui.'],
                    ['pergunta', 'Am/Is/Are + sujeito...?', 'Are you ready? Yes, I am.', 'Você está pronto? Sim.']
                ],
                notes: [
                    'Na fala, use contrações: I am → I\'m, you are → you\'re, she is → she\'s.',
                    'Com to be, não usamos do ou does: diga Are you...? e não Do you are...?',
                    'Respostas curtas repetem o verbo: Yes, she is. / No, she isn\'t.'
                ]
            },
            practice: [
                ['Complete', 'I ___ Sofia.', 'sou', 'am'],
                ['Complete', 'They ___ ready for class.', 'estão', 'are'],
                ['Unscramble', 'name / My / is / Lucas', 'Meu nome é Lucas.', 'My name is Lucas.'],
                ['Find the error', 'I is fine, thanks.', 'Eu estou bem.', 'I am fine, thanks.'],
                ['Complete', 'She ___ my teacher.', 'é', 'is'],
                ['Choose', '___ you a new student? (Am / Is / Are)', 'Você é...?', 'Are you a new student?'],
                ['Unscramble', 'are / How / you / ?', 'Como você está?', 'How are you?'],
                ['Find the error', 'Are she ready?', 'Ela está pronta?', 'Is she ready?'],
                ['Complete', 'We ___ not late.', 'não estamos', 'are'],
                ['Choose', 'He ___ Lucas. (am / is / are)', 'Ele é...', 'He is Lucas.']
            ],
            translations: [
                ['Bom dia! Meu nome é Sofia.', 'Good morning! My name is Sofia.'],
                ['Eu estou bem, obrigado.', 'I am fine, thanks.'],
                ['Você está pronto?', 'Are you ready?'],
                ['Ela é minha professora.', 'She is my teacher.'],
                ['Nós não estamos atrasados.', 'We are not late.'],
                ['Eles são novos alunos.', 'They are new students.']
            ],
            expressions: [
                ['Nice to meet you.', 'Prazer em conhecer você.', 'Use na primeira vez que encontra alguém.', 'Nice to meet you, Sofia.'],
                ['How are you?', 'Como você está?', 'Uma pergunta comum depois do cumprimento.', 'Hi, Lucas. How are you?'],
                ['See you later.', 'Até mais.', 'Use quando espera ver a pessoa novamente em breve.', 'I have class now. See you later.'],
                ['Take care.', 'Se cuida.', 'Uma despedida gentil e informal.', 'Goodbye, Maya. Take care.']
            ],
            dialogues: [
                { title: 'Antes da aula', lines: [['Teacher', 'Good morning! Are you Lucas?'], ['Lucas', 'Yes, I am.'], ['Teacher', 'I am Ms. Green. Nice to meet you.'], ['Lucas', 'Nice to meet you too.'], ['Teacher', 'Are you ready for class?'], ['Lucas', 'Yes, I am.']] },
                { title: 'Na cafeteria', lines: [['Clerk', 'Hello! How are you?'], ['Customer', 'I am fine, thanks. And you?'], ['Clerk', 'I am great, thank you.'], ['Customer', 'Good!']] },
                { title: 'Novo vizinho', lines: [['Nina', 'Hi, I am Nina. I live next door.'], ['Omar', 'Hello, Nina. My name is Omar.'], ['Nina', 'Nice to meet you.'], ['Omar', 'Nice to meet you too.']] },
                { title: 'Fim do encontro', lines: [['Maya', 'I have to go now.'], ['Ben', 'Okay. See you later.'], ['Maya', 'Goodbye, Ben. Take care.'], ['Ben', 'You too.']] }
            ],
            reading: {
                title: 'The first morning',
                text: 'Lucas is new at Green Street School. At the door, a student says, “Good morning!” Her name is Sofia. Lucas introduces himself, and Sofia shows him the classroom. Their teacher is Ms. Green. She is friendly, and Lucas is not nervous now. He is ready for his first English class.',
                questions: [
                    ['Where is Lucas new?', 'He is new at Green Street School.'],
                    ['Who meets Lucas at the door?', 'Sofia meets him at the door.'],
                    ['What is the teacher\'s name?', 'Her name is Ms. Green.'],
                    ['Is Lucas nervous at the end?', 'No, he is not.']
                ]
            },
            expressionTranslations: [
                ['Prazer em conhecer você.', 'Nice to meet you.'],
                ['Como você está?', 'How are you?'],
                ['Até mais.', 'See you later.'],
                ['Tchau, se cuida.', 'Goodbye, take care.']
            ],
            music: {
                song: 'Hello', artist: 'Adele', spotifyId: '1Yk0cQdMLx5RzzFTYwmuld',
                lines: [
                    ['Hello, can you hear my ___ today?', 'name'],
                    ['Good morning, I am ___ to begin.', 'ready'],
                    ['You say hello and I say hello ___ .', 'too'],
                    ['I am ___, and the day feels bright.', 'fine'],
                    ['Before we go, we smile and say ___ .', 'goodbye']
                ]
            },
            homework: {
                instruction: 'Escolha um tema e escreva 4 a 6 frases. Use o texto como apoio para uma apresentação oral na próxima aula.',
                themes: ['Apresentar-se a um colega novo', 'Cumprimentar alguém em uma cafeteria', 'Apresentar duas pessoas'],
                checklist: ['Use pelo menos três formas do verbo to be.', 'Inclua um cumprimento e uma despedida.', 'Pratique o texto em voz alta duas vezes.']
            }
        },

        2: {
            title: lessonTitles[1],
            objectives: [
                'Perguntar e informar nome completo, idade e cidade.',
                'Dar telefone e e-mail com clareza.',
                'Pedir repetição ou soletração quando necessário.'
            ],
            intro: [
                ['Receptionist', 'Hello. What is your full name?'],
                ['Maya', 'My full name is Maya Santos.'],
                ['Receptionist', 'How do you spell your last name?'],
                ['Maya', 'S-A-N-T-O-S.'],
                ['Receptionist', 'Thank you. Where do you live?'],
                ['Maya', 'I live in Campinas.']
            ],
            vocab: [
                ['first name', 'primeiro nome', 'My first name is Maya.'],
                ['last name', 'sobrenome', 'My last name is Santos.'],
                ['age', 'idade', 'Please write your age.'],
                ['address', 'endereço', 'What is your address?'],
                ['phone number', 'número de telefone', 'My phone number is on the form.'],
                ['email', 'e-mail', 'What is your email?'],
                ['spell', 'soletrar', 'How do you spell Santos?'],
                ['live', 'morar', 'I live in Campinas.']
            ],
            grammar: {
                title: 'Perguntas pessoais com be e do',
                summary: 'Algumas perguntas usam o verbo to be; outras usam do porque o verbo principal é diferente, como live ou speak.',
                rows: [
                    ['identidade', 'What is your...?', 'What is your last name?', 'Qual é o seu sobrenome?'],
                    ['idade', 'How old + be...?', 'How old are you?', 'Quantos anos você tem?'],
                    ['origem', 'Where + be + sujeito + from?', 'Where are you from?', 'De onde você é?'],
                    ['verbo comum', 'Where do + sujeito + verbo?', 'Where do you live?', 'Onde você mora?']
                ],
                notes: [
                    'Em inglês, dizemos I am 20 years old, e não I have 20 years.',
                    'Depois de do, use o verbo na forma base: Where do you live?',
                    'Ao informar e-mail, use at para @ e dot para ponto.'
                ]
            },
            practice: [
                ['Complete', 'What ___ your first name?', 'é', 'is'],
                ['Unscramble', 'old / are / How / you / ?', 'Quantos anos você tem?', 'How old are you?'],
                ['Choose', 'Where ___ you from? (is / are / do)', 'De onde você é?', 'Where are you from?'],
                ['Complete', 'Where do you ___?', 'morar', 'live'],
                ['Find the error', 'I have twenty years old.', 'Eu tenho vinte anos.', 'I am twenty years old.'],
                ['Unscramble', 'your / What / address / is / ?', 'Qual é o seu endereço?', 'What is your address?'],
                ['Complete', 'How do you ___ your last name?', 'soletrar', 'spell'],
                ['Choose', 'My phone ___ is 555-0182. (age / number / address)', 'número', 'My phone number is 555-0182.'],
                ['Find the error', 'Where you live?', 'Onde você mora?', 'Where do you live?'],
                ['Complete', 'My email ___ maya@email.com.', 'é', 'is']
            ],
            translations: [
                ['Qual é o seu nome completo?', 'What is your full name?'],
                ['Meu sobrenome é Santos.', 'My last name is Santos.'],
                ['Quantos anos você tem?', 'How old are you?'],
                ['Eu moro em Campinas.', 'I live in Campinas.'],
                ['Qual é o seu número de telefone?', 'What is your phone number?'],
                ['Como você soletra seu nome?', 'How do you spell your name?']
            ],
            expressions: [
                ['Could you repeat that?', 'Você poderia repetir?', 'Use quando não escuta ou não entende uma informação.', 'Sorry, could you repeat that?'],
                ['How do you spell that?', 'Como se soletra isso?', 'Use para confirmar nomes, ruas ou e-mails.', 'How do you spell that last name?'],
                ['One moment, please.', 'Um momento, por favor.', 'Use para pedir alguns segundos antes de responder.', 'One moment, please. My number is here.'],
                ['Here you are.', 'Aqui está.', 'Use ao entregar um documento ou uma informação.', 'Here you are. This is my ID.']
            ],
            dialogues: [
                { title: 'Matrícula no curso', lines: [['Assistant', 'What is your full name?'], ['Student', 'My name is Ravi Costa.'], ['Assistant', 'How old are you, Ravi?'], ['Student', 'I am nineteen.'], ['Assistant', 'And where do you live?'], ['Student', 'I live near the city center.']] },
                { title: 'Entrega em casa', lines: [['Courier', 'What is your address, please?'], ['Customer', 'It is 18 King Street.'], ['Courier', 'Could you repeat the number?'], ['Customer', 'Eighteen.']] },
                { title: 'Confirmando o e-mail', lines: [['Clerk', 'What is your email?'], ['Nina', 'It is nina.silva@email.com.'], ['Clerk', 'How do you spell Silva?'], ['Nina', 'S-I-L-V-A.']] },
                { title: 'Na recepção', lines: [['Receptionist', 'May I see your ID?'], ['Guest', 'Of course. Here you are.'], ['Receptionist', 'Thank you, Ms. Chen.'], ['Guest', 'You\'re welcome.']] }
            ],
            reading: {
                title: 'A new library card',
                text: 'Maya wants a library card. She writes her full name, age, address, phone number, and email on a form. The librarian cannot read her last name, so Maya spells it: S-A-N-T-O-S. Maya lives on Pine Street. After the librarian checks the form, Maya receives her new card.',
                questions: [
                    ['What does Maya want?', 'She wants a library card.'],
                    ['Which information does she write on the form?', 'She writes her name, age, address, phone number, and email.'],
                    ['Why does Maya spell her last name?', 'Because the librarian cannot read it.'],
                    ['Where does Maya live?', 'She lives on Pine Street.']
                ]
            },
            expressionTranslations: [
                ['Você poderia repetir?', 'Could you repeat that?'],
                ['Como se soletra isso?', 'How do you spell that?'],
                ['Um momento, por favor.', 'One moment, please.'],
                ['Aqui está o meu documento.', 'Here you are. This is my ID.']
            ],
            music: {
                song: 'What\'s My Name?', artist: 'Rihanna', spotifyId: '3WMcCzA085OB3NwdN6s4Mr',
                lines: [
                    ['Tell me your first ___ and say it slowly.', 'name'],
                    ['I write your ___ on this little card.', 'address'],
                    ['Please ___ the word so I can understand.', 'spell'],
                    ['Your phone ___ has eight clear digits.', 'number'],
                    ['Now I know the city where you ___ .', 'live']
                ]
            },
            homework: {
                instruction: 'Escolha um tema e prepare uma ficha com 5 informações. Traga também as perguntas completas para praticar com o professor.',
                themes: ['Ficha de matrícula em um curso', 'Cadastro em uma biblioteca', 'Check-in em uma recepção'],
                checklist: ['Inclua nome, idade, cidade, telefone e e-mail.', 'Use pelo menos duas perguntas completas.', 'Inclua um pedido de repetição ou soletração.']
            }
        },

        3: {
            title: lessonTitles[2],
            objectives: [
                'Nomear familiares e explicar relações simples.',
                'Usar my, your, his, her, our e their.',
                'Dizer quem possui algo com have, has e possessive s.'
            ],
            intro: [
                ['Nina', 'Is this your family photo?'],
                ['Omar', 'Yes. This is my mother, and that is my father.'],
                ['Nina', 'Who is the girl next to your mother?'],
                ['Omar', 'She is my sister, Layla.'],
                ['Nina', 'Does she live with your parents?'],
                ['Omar', 'No. She has an apartment near her university.']
            ],
            vocab: [
                ['mother', 'mãe', 'My mother is a nurse.'],
                ['father', 'pai', 'His father works at home.'],
                ['parents', 'pais', 'Our parents live nearby.'],
                ['sister', 'irmã', 'Her sister is a student.'],
                ['brother', 'irmão', 'I have one brother.'],
                ['daughter', 'filha', 'Their daughter is five.'],
                ['son', 'filho', 'Their son likes soccer.'],
                ['cousin', 'primo(a)', 'My cousin lives in Recife.']
            ],
            grammar: {
                title: 'Possessivos + have e has',
                summary: 'Use possessivos antes de um substantivo e have/has para falar de família, características e coisas que uma pessoa possui.',
                rows: [
                    ['I / you', 'my / your', 'My sister is here. / Your brother is tall.', 'Minha irmã... / Seu irmão...'],
                    ['he / she', 'his / her', 'His father is Paulo. / Her mother is Ana.', 'O pai dele... / A mãe dela...'],
                    ['we / they', 'our / their', 'Our house is small. / Their son is six.', 'Nossa casa... / O filho deles...'],
                    ['posse', 'nome + s / have-has', 'This is Clara\'s bag. / She has two cousins.', 'A bolsa da Clara. / Ela tem dois primos.']
                ],
                notes: [
                    'Use has com he, she e it. Use have com I, you, we e they.',
                    'His significa dele; her significa dela. Os dois vêm antes do substantivo.',
                    'No possessive s, o dono aparece primeiro: Lucas\'s mother = a mãe de Lucas.'
                ]
            },
            practice: [
                ['Complete', 'She is my mother. ___ name is Rosa.', 'dela', 'Her'],
                ['Choose', 'Lucas has a brother. ___ brother is ten. (His / Her / Their)', 'dele', 'His brother is ten.'],
                ['Complete', 'We love ___ family.', 'nossa', 'our'],
                ['Unscramble', 'two / I / sisters / have', 'Eu tenho duas irmãs.', 'I have two sisters.'],
                ['Find the error', 'She have one son.', 'Ela tem um filho.', 'She has one son.'],
                ['Complete', 'This is Nina___ photo.', 'da Nina', 'Nina\'s'],
                ['Choose', 'They live with ___ parents. (our / their / his)', 'deles', 'They live with their parents.'],
                ['Unscramble', 'your / Who / cousin / is / ?', 'Quem é seu primo?', 'Who is your cousin?'],
                ['Find the error', 'Her is my sister.', 'Ela é minha irmã.', 'She is my sister.'],
                ['Complete', 'My parents ___ a small house.', 'têm', 'have']
            ],
            translations: [
                ['Esta é a minha irmã.', 'This is my sister.'],
                ['O pai dele mora em Curitiba.', 'His father lives in Curitiba.'],
                ['Ela tem dois irmãos.', 'She has two brothers.'],
                ['Nossos pais trabalham juntos.', 'Our parents work together.'],
                ['A filha deles tem cinco anos.', 'Their daughter is five years old.'],
                ['Esta é a bolsa da Clara.', 'This is Clara\'s bag.']
            ],
            expressions: [
                ['This is my...', 'Este/Esta é meu/minha...', 'Use para apresentar alguém pessoalmente ou em uma foto.', 'This is my cousin, Maya.'],
                ['Who is that?', 'Quem é aquela pessoa?', 'Use quando quer identificar alguém.', 'Who is that next to your father?'],
                ['get along', 'dar-se bem', 'Get along with significa ter uma boa relação.', 'I get along with my sister.'],
                ['look after', 'cuidar de', 'Use para falar de cuidar de uma pessoa, animal ou coisa.', 'My aunt looks after the children.']
            ],
            dialogues: [
                { title: 'Olhando fotografias', lines: [['Maya', 'Who is that in the blue shirt?'], ['Ravi', 'That is my brother, Leo.'], ['Maya', 'Does he live with you?'], ['Ravi', 'No, he has a house near the beach.'], ['Maya', 'And who is the little girl?'], ['Ravi', 'She is Leo\'s daughter.']] },
                { title: 'Visita no domingo', lines: [['Friend', 'Are your parents home on Sunday?'], ['You', 'Yes. They are home, and lunch is at one.'], ['Friend', 'Can I visit in the afternoon?'], ['You', 'Of course.']] },
                { title: 'Buscando uma criança', lines: [['Teacher', 'Who is Mia\'s father?'], ['Omar', 'I am. Mia is my daughter.'], ['Teacher', 'Great. Mia is in the classroom.'], ['Omar', 'Thank you.']] },
                { title: 'Planos com a família', lines: [['Nina', 'Do you see your cousins often?'], ['Ben', 'Yes. We have dinner together on Fridays.'], ['Nina', 'Do you get along with them?'], ['Ben', 'Yes, we are good friends.']] }
            ],
            reading: {
                title: 'Sunday at Grandma\'s house',
                text: 'Every Sunday, Ravi visits his grandmother with his parents. His aunt and uncle are usually there too. Their daughter, Maya, is Ravi\'s cousin. Ravi and Maya get along well. They help their grandmother in the kitchen, and Ravi\'s father looks after the family dog in the garden. Lunch is always noisy, but everyone is happy.',
                questions: [
                    ['When does Ravi visit his grandmother?', 'He visits her every Sunday.'],
                    ['Who is Maya?', 'She is Ravi\'s cousin.'],
                    ['Where do Ravi and Maya help?', 'They help in the kitchen.'],
                    ['Who looks after the dog?', 'Ravi\'s father looks after the dog.']
                ]
            },
            expressionTranslations: [
                ['Esta é a minha prima, Maya.', 'This is my cousin, Maya.'],
                ['Quem é aquela pessoa?', 'Who is that?'],
                ['Eu me dou bem com a minha irmã.', 'I get along with my sister.'],
                ['Minha tia cuida das crianças.', 'My aunt looks after the children.']
            ],
            music: {
                song: 'We Are Family', artist: 'Sister Sledge', spotifyId: '5IKLwqBQG6KU6MP2zP80Nu',
                lines: [
                    ['We are a ___, together every day.', 'family'],
                    ['My ___ tells a story and makes us laugh.', 'brother'],
                    ['Her ___ is open when we come inside.', 'house'],
                    ['We ___ along, even when we disagree.', 'get'],
                    ['At the end of dinner, my ___ tells a funny story.', 'cousin']
                ]
            },
            homework: {
                instruction: 'Escolha um tema e escreva 5 a 7 frases. Use o texto para apresentar as pessoas ao professor na próxima aula.',
                themes: ['Uma fotografia da família', 'Pessoas que moram com você', 'Dois parentes e suas rotinas'],
                checklist: ['Use quatro palavras de família.', 'Inclua my, his, her, our ou their.', 'Use have ou has pelo menos duas vezes.']
            }
        },

        5: {
            title: lessonTitles[4],
            objectives: [
                'Descrever uma rotina diária em ordem.',
                'Usar o Present Simple em frases afirmativas.',
                'Aplicar a terminação de he, she e it corretamente.'
            ],
            intro: [
                ['Maya', 'What time do you get up on weekdays?'],
                ['Ravi', 'I get up at six thirty and make breakfast.'],
                ['Maya', 'Do you go to work early?'],
                ['Ravi', 'Yes. I leave home at seven thirty.'],
                ['Maya', 'And what does your sister do in the morning?'],
                ['Ravi', 'She studies at home and starts work after lunch.']
            ],
            vocab: [
                ['wake up', 'acordar', 'I wake up at six.'],
                ['get dressed', 'vestir-se', 'She gets dressed quickly.'],
                ['have breakfast', 'tomar café da manhã', 'We have breakfast together.'],
                ['leave home', 'sair de casa', 'He leaves home at eight.'],
                ['start work', 'começar o trabalho', 'I start work at nine.'],
                ['have lunch', 'almoçar', 'They have lunch at noon.'],
                ['cook dinner', 'preparar o jantar', 'Maya cooks dinner at night.'],
                ['go to bed', 'ir para a cama', 'I go to bed at eleven.']
            ],
            grammar: {
                title: 'Present Simple: rotina e terceira pessoa',
                summary: 'Use o Present Simple para hábitos, rotinas e fatos. Com he, she e it, normalmente acrescentamos s ao verbo.',
                rows: [
                    ['I / you / we / they', 'sujeito + verbo base', 'I start work at nine.', 'Eu começo a trabalhar às nove.'],
                    ['he / she / it', 'sujeito + verbo-s', 'She starts work at nine.', 'Ela começa a trabalhar às nove.'],
                    ['verbos em -ch, -sh, -ss, -x, -o', 'verbo + es', 'He watches TV. / She goes home.', 'Ele assiste TV. / Ela vai para casa.'],
                    ['consoante + y', 'y → ies', 'Maya studies at night.', 'Maya estuda à noite.']
                ],
                notes: [
                    'Have muda para has com he, she e it: She has breakfast at seven.',
                    'O s aparece somente na terceira pessoa afirmativa: he works, she studies.',
                    'Use conectores simples para organizar: first, then, after that e finally.'
                ]
            },
            practice: [
                ['Complete', 'I ___ up at six every day.', 'acordar', 'wake'],
                ['Complete', 'She ___ breakfast at home.', 'tomar', 'has'],
                ['Choose', 'Ravi ___ work at nine. (start / starts / starting)', 'começa', 'Ravi starts work at nine.'],
                ['Unscramble', 'home / seven / I / at / leave', 'Eu saio de casa às sete.', 'I leave home at seven.'],
                ['Find the error', 'He go to bed at ten.', 'Ele vai para a cama às dez.', 'He goes to bed at ten.'],
                ['Complete', 'Maya ___ English after dinner.', 'estudar', 'studies'],
                ['Choose', 'We ___ lunch at noon. (have / has / having)', 'almoçamos', 'We have lunch at noon.'],
                ['Unscramble', 'dinner / cooks / My father', 'Meu pai prepara o jantar.', 'My father cooks dinner.'],
                ['Find the error', 'They leaves home early.', 'Eles saem de casa cedo.', 'They leave home early.'],
                ['Complete', 'First I shower; ___ I get dressed.', 'depois', 'then']
            ],
            translations: [
                ['Eu acordo às seis todos os dias.', 'I wake up at six every day.'],
                ['Ela toma café da manhã em casa.', 'She has breakfast at home.'],
                ['Nós saímos de casa às oito.', 'We leave home at eight.'],
                ['Meu irmão começa a trabalhar às nove.', 'My brother starts work at nine.'],
                ['Eles almoçam juntos.', 'They have lunch together.'],
                ['Maya vai para a cama às onze.', 'Maya goes to bed at eleven.']
            ],
            expressions: [
                ['get up', 'levantar-se', 'É o momento de sair da cama; wake up é parar de dormir.', 'I wake up at six, but I get up at six ten.'],
                ['get ready', 'preparar-se', 'Use para toda a preparação antes de sair.', 'I get ready for work after breakfast.'],
                ['head to work', 'ir em direção ao trabalho', 'Uma forma natural e informal de dizer que vai trabalhar.', 'She heads to work at eight.'],
                ['come back', 'voltar', 'Use quando alguém retorna a um lugar.', 'We come back home after six.']
            ],
            dialogues: [
                { title: 'Manhã em casa', lines: [['Parent', 'Are you awake?'], ['Teen', 'Yes, but I am still in bed.'], ['Parent', 'You get up at seven on Mondays.'], ['Teen', 'I know. I am late today.'], ['Parent', 'Breakfast is in the kitchen.'], ['Teen', 'Great, thanks.']] },
                { title: 'Antes do trabalho', lines: [['Nina', 'Do you head to work now?'], ['Omar', 'Yes. I start at eight thirty.'], ['Nina', 'Do you have breakfast at the office?'], ['Omar', 'No, I eat at home.']] },
                { title: 'Depois da aula', lines: [['Friend', 'What do you do after class?'], ['Maya', 'I come back home and have lunch.'], ['Friend', 'Do you study in the afternoon?'], ['Maya', 'Yes, for one hour.']] },
                { title: 'Fim do dia', lines: [['Ravi', 'Who cooks dinner at your house?'], ['Ben', 'My father usually cooks.'], ['Ravi', 'What time do you eat?'], ['Ben', 'At about seven thirty.']] }
            ],
            reading: {
                title: 'Two different mornings',
                text: 'Maya and Ravi have different routines. Maya wakes up at seven, has breakfast, and studies at home in the morning. Ravi gets up at six thirty and leaves home at seven thirty. He starts work at eight. At lunchtime, they meet at a small café near Ravi’s office. After lunch, Maya goes to class and Ravi goes back to work.',
                questions: [
                    ['What time does Maya wake up?', 'She wakes up at seven.'],
                    ['Where does Maya study in the morning?', 'She studies at home.'],
                    ['When does Ravi leave home?', 'He leaves home at seven thirty.'],
                    ['Where do Maya and Ravi meet?', 'They meet at a café near Ravi’s office.']
                ]
            },
            expressionTranslations: [
                ['Eu levanto dez minutos depois de acordar.', 'I get up ten minutes after I wake up.'],
                ['Ela se prepara para o trabalho.', 'She gets ready for work.'],
                ['Nós vamos para o trabalho às oito.', 'We head to work at eight.'],
                ['Eles voltam para casa depois das seis.', 'They come back home after six.']
            ],
            music: {
                song: 'Wake Me Up', artist: 'Avicii', spotifyId: '0nrRP2bk19rLc0orkWPQk2',
                lines: [
                    ['I ___ up slowly when the morning starts.', 'wake'],
                    ['Then I get ___ and open the door.', 'dressed'],
                    ['I have ___ before I leave my home.', 'breakfast'],
                    ['After work, I come ___ before dinner.', 'back'],
                    ['At the end of the day, I go to ___ .', 'bed']
                ]
            },
            homework: {
                instruction: 'Escolha uma rotina e escreva 6 frases em ordem. Prepare-se para contar essa rotina ao professor.',
                themes: ['Sua manhã durante a semana', 'A rotina de alguém da família', 'Seu dia em um sábado'],
                checklist: ['Use pelo menos seis verbos da aula.', 'Confira o s de he ou she.', 'Inclua first, then e finally.']
            }
        },

        6: {
            title: lessonTitles[5],
            objectives: [
                'Perguntar e dizer horários.',
                'Formar perguntas e negativas no Present Simple.',
                'Usar at, on e in com expressões de tempo.'
            ],
            intro: [
                ['Assistant', 'What time does the class start?'],
                ['Student', 'It starts at a quarter past seven.'],
                ['Assistant', 'Does it finish before nine?'],
                ['Student', 'Yes, it finishes at eight forty-five.'],
                ['Assistant', 'Do you have class on Friday too?'],
                ['Student', 'No, I do not. I only study on Tuesdays and Thursdays.']
            ],
            vocab: [
                ['o’clock', 'em ponto', 'The meeting is at nine o’clock.'],
                ['half past', 'e meia', 'It is half past seven.'],
                ['quarter past', 'e quinze', 'Class starts at a quarter past eight.'],
                ['quarter to', 'quinze para', 'It is a quarter to six.'],
                ['early', 'cedo', 'She arrives early.'],
                ['late', 'atrasado(a)', 'The bus is late today.'],
                ['weekday', 'dia útil', 'Monday is a weekday.'],
                ['appointment', 'compromisso / consulta', 'I have an appointment at three.']
            ],
            grammar: {
                title: 'Do/does + horários e preposições',
                summary: 'Use do ou does para perguntas e negativas com verbos comuns. Depois de does, o verbo volta à forma base.',
                rows: [
                    ['pergunta com I/you/we/they', 'Do + sujeito + verbo...?', 'Do you work on Monday?', 'Você trabalha na segunda?'],
                    ['pergunta com he/she/it', 'Does + sujeito + verbo...?', 'Does she start at eight?', 'Ela começa às oito?'],
                    ['negativa', 'don’t / doesn’t + verbo', 'He doesn’t work at night.', 'Ele não trabalha à noite.'],
                    ['tempo', 'at + hora / on + dia / in + período', 'at 8 / on Friday / in the morning', 'às 8 / na sexta / de manhã']
                ],
                notes: [
                    'Diga Does she start...? e não Does she starts...?',
                    'At night é uma expressão fixa; para manhã, tarde e noite usamos in the morning/afternoon/evening.',
                    'Para responder: Yes, I do. / No, she doesn’t.'
                ]
            },
            practice: [
                ['Complete', 'What time ___ the meeting start?', 'auxiliar para it', 'does'],
                ['Choose', 'Do you work ___ Monday? (at / on / in)', 'na segunda-feira', 'Do you work on Monday?'],
                ['Unscramble', 'at / starts / Class / eight', 'A aula começa às oito.', 'Class starts at eight.'],
                ['Find the error', 'Does she works at night?', 'Ela trabalha à noite?', 'Does she work at night?'],
                ['Complete', 'I do not work ___ the evening.', 'à noite / no período', 'in'],
                ['Choose', 'It is ___ past seven. (half / late / early)', 'sete e meia', 'It is half past seven.'],
                ['Unscramble', 'you / Do / Fridays / study / on / ?', 'Você estuda às sextas?', 'Do you study on Fridays?'],
                ['Find the error', 'He don’t arrive early.', 'Ele não chega cedo.', 'He doesn’t arrive early.'],
                ['Complete', 'My appointment is ___ three o’clock.', 'às', 'at'],
                ['Choose', 'A quarter ___ six means 5:45. (past / to / at)', 'quinze para as seis', 'A quarter to six means 5:45.']
            ],
            translations: [
                ['Que horas a aula começa?', 'What time does the class start?'],
                ['A reunião é às nove em ponto.', 'The meeting is at nine o’clock.'],
                ['Você trabalha às sextas-feiras?', 'Do you work on Fridays?'],
                ['Ela não estuda à noite.', 'She does not study at night.'],
                ['Eu tenho uma consulta às três.', 'I have an appointment at three.'],
                ['O ônibus chega às sete e meia.', 'The bus arrives at half past seven.']
            ],
            expressions: [
                ['on time', 'no horário', 'Significa chegar exatamente no horário combinado.', 'The train is on time today.'],
                ['What time...?', 'Que horas...?', 'Use para perguntar o horário de uma ação ou evento.', 'What time do you finish work?'],
                ['from... to...', 'das... às...', 'Use para informar o início e o fim de um período.', 'I work from nine to five.'],
                ['right after', 'logo depois de', 'Mostra que uma ação acontece imediatamente depois de outra.', 'I call you right after class.']
            ],
            dialogues: [
                { title: 'Marcando uma consulta', lines: [['Receptionist', 'Do you prefer morning or afternoon?'], ['Patient', 'Afternoon, please.'], ['Receptionist', 'We have an appointment at three fifteen.'], ['Patient', 'That works. Is it on Tuesday?'], ['Receptionist', 'Yes, Tuesday the ninth.'], ['Patient', 'Great. Three fifteen is perfect.']] },
                { title: 'Horário do ônibus', lines: [['Traveler', 'What time does the next bus leave?'], ['Agent', 'At a quarter to six.'], ['Traveler', 'Is it on time today?'], ['Agent', 'Yes, it is.']] },
                { title: 'Fim do expediente', lines: [['Nina', 'Do you finish work at five?'], ['Omar', 'No, I finish at half past five.'], ['Nina', 'Can we meet right after work?'], ['Omar', 'Yes, at six.']] },
                { title: 'Aulas da semana', lines: [['Student', 'Does the course have class on Wednesday?'], ['Assistant', 'No. Classes are on Tuesday and Thursday.'], ['Student', 'From seven to nine?'], ['Assistant', 'Exactly.']] }
            ],
            reading: {
                title: 'A busy Tuesday',
                text: 'Nina has a busy schedule on Tuesdays. She starts work at eight thirty and has lunch at noon. Her English class is from six thirty to eight in the evening. The bus leaves at six, so Nina does not stay late at the office. She arrives at school ten minutes early and reviews her notes before class.',
                questions: [
                    ['What time does Nina start work?', 'She starts work at eight thirty.'],
                    ['When does she have lunch?', 'She has lunch at noon.'],
                    ['How long is her English class?', 'It is from six thirty to eight.'],
                    ['Why does Nina leave the office on time?', 'Because her bus leaves at six.']
                ]
            },
            expressionTranslations: [
                ['O trem está no horário.', 'The train is on time.'],
                ['Que horas você termina o trabalho?', 'What time do you finish work?'],
                ['Eu trabalho das nove às cinco.', 'I work from nine to five.'],
                ['Eu ligo para você logo depois da aula.', 'I call you right after class.']
            ],
            music: {
                song: '9 to 5', artist: 'Dolly Parton', spotifyId: '4w3tQBXhn5345eUXDGBWZG',
                lines: [
                    ['I work from nine ___ five on every weekday.', 'to'],
                    ['The clock says half ___ seven this morning.', 'past'],
                    ['My bus is ___ time, so I do not run.', 'on'],
                    ['Class starts ___ eight and finishes at nine.', 'at'],
                    ['I rest right ___ my busy day is done.', 'after']
                ]
            },
            homework: {
                instruction: 'Escolha uma agenda e escreva 6 compromissos com dias e horários. Use-a na próxima aula para responder às perguntas do professor.',
                themes: ['Sua agenda de um dia útil', 'Horários de um curso', 'Compromissos de uma pessoa da família'],
                checklist: ['Use at, on e in corretamente.', 'Inclua duas perguntas com do ou does.', 'Use uma expressão de horário como half past ou quarter to.']
            }
        },

        7: {
            title: lessonTitles[6],
            objectives: [
                'Pedir comidas e bebidas de forma simples.',
                'Diferenciar substantivos contáveis e incontáveis.',
                'Usar some, any e would like em pedidos.'
            ],
            intro: [
                ['Server', 'Good afternoon. Are you ready to order?'],
                ['Customer', 'Yes. I would like the chicken sandwich, please.'],
                ['Server', 'Would you like a salad with it?'],
                ['Customer', 'Yes, please. Do you have any orange juice?'],
                ['Server', 'Yes, we do. Anything else?'],
                ['Customer', 'No, thank you. That is all.']
            ],
            vocab: [
                ['breakfast', 'café da manhã', 'Breakfast is ready.'],
                ['lunch', 'almoço', 'We have lunch at noon.'],
                ['bread', 'pão', 'I would like some bread.'],
                ['rice', 'arroz', 'There is rice on the plate.'],
                ['fruit', 'fruta', 'We need some fruit.'],
                ['vegetables', 'legumes / verduras', 'The soup has vegetables.'],
                ['drink', 'bebida / beber', 'What would you like to drink?'],
                ['menu', 'cardápio', 'Can I see the menu?']
            ],
            grammar: {
                title: 'Countable, uncountable, some e any',
                summary: 'Itens contáveis podem ter número e plural. Itens incontáveis são tratados como quantidade. Some e any ajudam a falar de ambos.',
                rows: [
                    ['contável', 'a/an ou número + substantivo', 'a sandwich / two apples', 'um sanduíche / duas maçãs'],
                    ['incontável', 'some + substantivo', 'some rice / some water', 'um pouco de arroz / água'],
                    ['afirmativa e oferta', 'some', 'We have some fruit. / Would you like some tea?', 'Temos frutas. / Você gostaria de chá?'],
                    ['pergunta e negativa', 'any', 'Do you have any juice? / We don’t have any milk.', 'Tem suco? / Não temos leite.']
                ],
                notes: [
                    'Would like é mais educado que want em pedidos: I would like a coffee, please.',
                    'Bread, rice, water e information normalmente não recebem s.',
                    'Para contar um incontável, use recipiente ou porção: a bottle of water, two cups of coffee.'
                ]
            },
            practice: [
                ['Complete', 'I would like ___ water, please.', 'um pouco de', 'some'],
                ['Choose', 'Do you have ___ tea? (some / any / an)', 'algum', 'Do you have any tea?'],
                ['Unscramble', 'like / I / sandwich / would / a', 'Eu gostaria de um sanduíche.', 'I would like a sandwich.'],
                ['Find the error', 'We need two breads.', 'Precisamos de dois pães.', 'We need two loaves of bread.'],
                ['Complete', 'There are three ___ on the table.', 'maçãs', 'apples'],
                ['Choose', 'Rice is (countable / uncountable).', 'incontável', 'Rice is uncountable.'],
                ['Unscramble', 'any / have / Do / juice / you / ?', 'Você tem suco?', 'Do you have any juice?'],
                ['Find the error', 'I would like an coffee.', 'Eu gostaria de um café.', 'I would like a coffee.'],
                ['Complete', 'Would you like ___ fruit?', 'um pouco de', 'some'],
                ['Choose', 'We do not have ___ milk. (a / some / any)', 'nenhum', 'We do not have any milk.']
            ],
            translations: [
                ['Eu gostaria de um café, por favor.', 'I would like a coffee, please.'],
                ['Você tem suco de laranja?', 'Do you have any orange juice?'],
                ['Nós precisamos de algumas frutas.', 'We need some fruit.'],
                ['Não há leite na geladeira.', 'There is not any milk in the fridge.'],
                ['Ela quer duas maçãs.', 'She wants two apples.'],
                ['Você gostaria de um pouco de chá?', 'Would you like some tea?']
            ],
            expressions: [
                ['I’d like...', 'Eu gostaria de...', 'I’d é a contração comum de I would.', 'I’d like the soup, please.'],
                ['Anything else?', 'Mais alguma coisa?', 'Pergunta comum de atendentes antes de fechar o pedido.', 'Anything else for you today?'],
                ['for here or to go', 'para comer aqui ou levar', 'Use em cafeterias e lanchonetes.', 'Is that for here or to go?'],
                ['Here is the bill.', 'Aqui está a conta.', 'Use quando o atendente entrega a conta ao cliente.', 'Here is the bill. You can pay at the counter.']
            ],
            dialogues: [
                { title: 'Pedido no café', lines: [['Barista', 'What would you like?'], ['Customer', 'I’d like a small coffee and a cheese sandwich.'], ['Barista', 'Is that for here or to go?'], ['Customer', 'For here, please.'], ['Barista', 'Anything else?'], ['Customer', 'No, that is all.']] },
                { title: 'Preparando o almoço', lines: [['Maya', 'Do we have any rice?'], ['Ravi', 'Yes, but we do not have any vegetables.'], ['Maya', 'I can buy some carrots.'], ['Ravi', 'Great idea.']] },
                { title: 'No restaurante', lines: [['Server', 'Would you like something to drink?'], ['Guest', 'Some water, please.'], ['Server', 'Still or sparkling?'], ['Guest', 'Still, please.']] },
                { title: 'Hora de pagar', lines: [['Customer', 'Can I have the bill, please?'], ['Server', 'Of course. Here is the bill.'], ['Customer', 'Can I pay by card?'], ['Server', 'Yes, you can.']] }
            ],
            reading: {
                title: 'Lunch for four',
                text: 'Maya prepares lunch for four people. She has some rice, chicken, and vegetables, but she does not have any fruit. Ravi goes to the market and buys four apples and a bottle of juice. At noon, their friends arrive. Everyone likes the food, and there is enough juice for all four people.',
                questions: [
                    ['How many people have lunch together?', 'Four people have lunch together.'],
                    ['Which food does Maya already have?', 'She has rice, chicken, and vegetables.'],
                    ['What does Ravi buy?', 'He buys four apples and a bottle of juice.'],
                    ['Is there enough juice?', 'Yes, there is enough juice for everyone.']
                ]
            },
            expressionTranslations: [
                ['Eu gostaria da sopa, por favor.', 'I’d like the soup, please.'],
                ['Mais alguma coisa?', 'Anything else?'],
                ['É para comer aqui ou levar?', 'Is that for here or to go?'],
                ['Aqui está a conta.', 'Here is the bill.']
            ],
            music: {
                song: 'Banana Pancakes', artist: 'Jack Johnson', spotifyId: '451GvHwY99NKV4zdKPRWmv',
                lines: [
                    ['I would like some ___ on my plate.', 'fruit'],
                    ['There is warm ___ and coffee on the table.', 'bread'],
                    ['Do we have any ___ for the morning?', 'juice'],
                    ['The lunch ___ has soup and rice today.', 'menu'],
                    ['After the meal, the server brings the ___ .', 'bill']
                ]
            },
            homework: {
                instruction: 'Escolha uma situação e crie um pedido com 6 falas. Na próxima aula, pratique o diálogo com o professor.',
                themes: ['Pedido em uma cafeteria', 'Lista de compras para um almoço', 'Pedido de comida para levar'],
                checklist: ['Use some e any.', 'Inclua I’d like e Anything else?', 'Use pelo menos quatro alimentos ou bebidas.']
            }
        },

        9: {
            title: lessonTitles[8],
            objectives: [
                'Descrever aparência física com be e have.',
                'Posicionar adjetivos antes dos substantivos.',
                'Perguntar como uma pessoa é fisicamente.'
            ],
            intro: [
                ['Nina', 'I need to find the new manager. What does she look like?'],
                ['Omar', 'She is tall, and she has short black hair.'],
                ['Nina', 'Does she wear glasses?'],
                ['Omar', 'Yes, she does. She also has brown eyes.'],
                ['Nina', 'Is she in the meeting room?'],
                ['Omar', 'Yes. She is the woman next to the window.']
            ],
            vocab: [
                ['tall', 'alto(a)', 'The new manager is tall.'],
                ['short', 'baixo(a) / curto(a)', 'He has short hair.'],
                ['young', 'jovem', 'The teacher is young.'],
                ['hair', 'cabelo', 'She has curly hair.'],
                ['eyes', 'olhos', 'He has green eyes.'],
                ['glasses', 'óculos', 'My father wears glasses.'],
                ['friendly', 'amigável', 'Our neighbor is friendly.'],
                ['quiet', 'quieto(a)', 'The new student is quiet.']
            ],
            grammar: {
                title: 'Be, have e ordem dos adjetivos',
                summary: 'Use be com adjetivos gerais e have/has com cabelo, olhos e outras características. Antes de um substantivo, o adjetivo vem primeiro.',
                rows: [
                    ['descrição geral', 'sujeito + be + adjetivo', 'She is tall and friendly.', 'Ela é alta e amigável.'],
                    ['característica física', 'sujeito + have/has + substantivo', 'He has blue eyes.', 'Ele tem olhos azuis.'],
                    ['adjetivo + substantivo', 'adjetivo antes do nome', 'She has long black hair.', 'Ela tem cabelo preto comprido.'],
                    ['pergunta', 'What does + pessoa + look like?', 'What does your brother look like?', 'Como é a aparência do seu irmão?']
                ],
                notes: [
                    'Use wear/wears para óculos e roupas: She wears glasses.',
                    'Para cabelo, uma ordem simples é comprimento + cor + hair: short brown hair.',
                    'What does she look like? pergunta aparência; What is she like? pergunta personalidade.'
                ]
            },
            practice: [
                ['Complete', 'She ___ tall and friendly.', 'é', 'is'],
                ['Complete', 'He ___ green eyes.', 'tem', 'has'],
                ['Unscramble', 'short / has / hair / Maya / black', 'Maya tem cabelo preto curto.', 'Maya has short black hair.'],
                ['Find the error', 'He have blue eyes.', 'Ele tem olhos azuis.', 'He has blue eyes.'],
                ['Choose', 'My sister ___ glasses. (wear / wears / is)', 'usa', 'My sister wears glasses.'],
                ['Complete', 'What does your father look ___?', 'como', 'like'],
                ['Unscramble', 'a / man / friendly / He / is', 'Ele é um homem amigável.', 'He is a friendly man.'],
                ['Find the error', 'She has hair long.', 'Ela tem cabelo comprido.', 'She has long hair.'],
                ['Choose', 'Nina is very ___. She does not talk much. (quiet / tall / curly)', 'quieta', 'Nina is very quiet.'],
                ['Complete', 'They ___ young teachers.', 'são', 'are']
            ],
            translations: [
                ['Ela é alta e amigável.', 'She is tall and friendly.'],
                ['Ele tem olhos castanhos.', 'He has brown eyes.'],
                ['Minha irmã usa óculos.', 'My sister wears glasses.'],
                ['Maya tem cabelo preto curto.', 'Maya has short black hair.'],
                ['Como é a aparência do seu irmão?', 'What does your brother look like?'],
                ['Eles são jovens e quietos.', 'They are young and quiet.']
            ],
            expressions: [
                ['look like', 'parecer-se fisicamente', 'Use para perguntar ou comparar aparência.', 'What does your new teacher look like?'],
                ['wear glasses', 'usar óculos', 'Em inglês, usamos wear para algo que está no corpo.', 'The receptionist wears glasses.'],
                ['look young', 'parecer jovem', 'Look + adjetivo descreve a impressão visual.', 'Your grandmother looks young.'],
                ['easy to recognize', 'fácil de reconhecer', 'Use quando uma característica ajuda a identificar alguém.', 'He is easy to recognize because of his red hat.']
            ],
            dialogues: [
                { title: 'Encontrando um colega', lines: [['Visitor', 'Is Paulo here today?'], ['Receptionist', 'Yes. What does he look like?'], ['Visitor', 'He is short and has curly hair.'], ['Receptionist', 'Does he wear glasses?'], ['Visitor', 'No, but he has a red backpack.'], ['Receptionist', 'He is near the front desk.']] },
                { title: 'Pessoa na fotografia', lines: [['Maya', 'Who is the woman with long hair?'], ['Ravi', 'That is my aunt.'], ['Maya', 'She looks very friendly.'], ['Ravi', 'She is.']] },
                { title: 'Novo professor', lines: [['Student', 'What does our new teacher look like?'], ['Friend', 'He is tall and wears glasses.'], ['Student', 'Is he young?'], ['Friend', 'Yes, he is.']] },
                { title: 'No aeroporto', lines: [['Nina', 'I cannot see your cousin.'], ['Omar', 'She has short hair and a green jacket.'], ['Nina', 'Oh, is she next to the café?'], ['Omar', 'Yes, that is her.']] }
            ],
            reading: {
                title: 'The person at the front desk',
                text: 'A visitor arrives at a large office and asks for Mr. Khan. The receptionist says he is in the lobby. Mr. Khan is tall and has short gray hair. He wears glasses and carries a blue folder. The visitor looks around and sees two tall men, but only one has a blue folder. She walks over and introduces herself.',
                questions: [
                    ['Who does the visitor ask for?', 'She asks for Mr. Khan.'],
                    ['Where is Mr. Khan?', 'He is in the lobby.'],
                    ['What color is his hair?', 'His hair is gray.'],
                    ['Which object helps the visitor identify him?', 'His blue folder helps her identify him.']
                ]
            },
            expressionTranslations: [
                ['Como é a aparência do novo professor?', 'What does the new teacher look like?'],
                ['A recepcionista usa óculos.', 'The receptionist wears glasses.'],
                ['Sua avó parece jovem.', 'Your grandmother looks young.'],
                ['Ele é fácil de reconhecer.', 'He is easy to recognize.']
            ],
            music: {
                song: 'Just the Way You Are', artist: 'Bruno Mars', spotifyId: '7BqBn9nzAq8spo5e7cZ0dJ',
                lines: [
                    ['She has bright brown ___ and a friendly smile.', 'eyes'],
                    ['Her ___ is short and moves in the wind.', 'hair'],
                    ['He wears ___ when he reads at night.', 'glasses'],
                    ['They look ___, but they are very kind.', 'quiet'],
                    ['You are easy to ___ in the busy room.', 'recognize']
                ]
            },
            homework: {
                instruction: 'Escolha uma pessoa e escreva 6 frases sobre sua aparência sem informar o nome. O professor tentará adivinhar na próxima aula.',
                themes: ['Uma pessoa da família', 'Um personagem de filme ou série', 'Uma pessoa em uma fotografia'],
                checklist: ['Use be e have/has.', 'Inclua cabelo, olhos e mais duas características.', 'Use pelo menos uma expressão da aula.']
            }
        },

        10: {
            title: lessonTitles[9],
            objectives: [
                'Nomear lugares comuns da cidade.',
                'Usar there is e there are para indicar existência.',
                'Localizar lugares com preposições simples.'
            ],
            intro: [
                ['Guest', 'Is there a pharmacy near the hotel?'],
                ['Clerk', 'Yes. There is one on King Street.'],
                ['Guest', 'Is it next to the supermarket?'],
                ['Clerk', 'No, it is between the bank and the bakery.'],
                ['Guest', 'Are there any cafés nearby?'],
                ['Clerk', 'Yes, there are two cafés across from the park.']
            ],
            vocab: [
                ['bank', 'banco', 'The bank is on Green Street.'],
                ['pharmacy', 'farmácia', 'There is a pharmacy nearby.'],
                ['supermarket', 'supermercado', 'The supermarket closes at nine.'],
                ['station', 'estação', 'The station is across from the hotel.'],
                ['hospital', 'hospital', 'Is there a hospital in this area?'],
                ['post office', 'correio', 'The post office is next to the bank.'],
                ['park', 'parque', 'There are trees in the park.'],
                ['bakery', 'padaria', 'The bakery opens early.']
            ],
            grammar: {
                title: 'There is, there are e localização',
                summary: 'Use there is para uma coisa ou lugar e there are para mais de um. Depois, acrescente a localização.',
                rows: [
                    ['singular', 'there is / there isn’t', 'There is a bank on this street.', 'Há um banco nesta rua.'],
                    ['plural', 'there are / there aren’t', 'There are two cafés nearby.', 'Há dois cafés perto.'],
                    ['pergunta singular', 'Is there...?', 'Is there a pharmacy near here?', 'Há uma farmácia perto daqui?'],
                    ['pergunta plural', 'Are there any...?', 'Are there any parks downtown?', 'Há parques no centro?']
                ],
                notes: [
                    'Use next to para ao lado de, between para entre dois lugares e across from para do outro lado da rua.',
                    'Near não precisa de to: near the station, e não near to the station.',
                    'Em respostas curtas: Yes, there is. / No, there aren’t.'
                ]
            },
            practice: [
                ['Complete', 'There ___ a bank near the station.', 'há', 'is'],
                ['Complete', 'There ___ two parks in my neighborhood.', 'há', 'are'],
                ['Choose', '___ there a hospital nearby? (Is / Are / Does)', 'Há...?', 'Is there a hospital nearby?'],
                ['Unscramble', 'bakery / next / The / bank / is / to / the', 'A padaria fica ao lado do banco.', 'The bakery is next to the bank.'],
                ['Find the error', 'There are a pharmacy on this street.', 'Há uma farmácia nesta rua.', 'There is a pharmacy on this street.'],
                ['Complete', 'The station is ___ from the hotel.', 'do outro lado', 'across'],
                ['Choose', 'The café is ___ the bank and the pharmacy. (between / under / in)', 'entre', 'The café is between the bank and the pharmacy.'],
                ['Unscramble', 'any / Are / nearby / supermarkets / there / ?', 'Há supermercados por perto?', 'Are there any supermarkets nearby?'],
                ['Find the error', 'The park is near to my house.', 'O parque fica perto da minha casa.', 'The park is near my house.'],
                ['Complete', 'No, there ___ any cafés here.', 'não há', 'aren’t']
            ],
            translations: [
                ['Há uma farmácia perto daqui.', 'There is a pharmacy near here.'],
                ['Há dois parques no meu bairro.', 'There are two parks in my neighborhood.'],
                ['O banco fica ao lado do correio.', 'The bank is next to the post office.'],
                ['A estação fica em frente ao hotel.', 'The station is across from the hotel.'],
                ['Há algum supermercado por perto?', 'Is there a supermarket nearby?'],
                ['Não há cafés nesta rua.', 'There are not any cafés on this street.']
            ],
            expressions: [
                ['Is there a...?', 'Há um/uma...?', 'Uma pergunta essencial para procurar serviços.', 'Is there a bank near here?'],
                ['near here', 'perto daqui', 'Use quando o ponto de referência é o lugar onde você está.', 'Is there a restroom near here?'],
                ['around the corner', 'logo depois da esquina', 'Indica que o lugar está muito perto, após virar a esquina.', 'The bakery is around the corner.'],
                ['across from', 'em frente a / do outro lado', 'Indica que dois lugares estão em lados opostos.', 'The station is across from the park.']
            ],
            dialogues: [
                { title: 'Procurando um caixa eletrônico', lines: [['Tourist', 'Excuse me. Is there a bank near here?'], ['Local', 'Yes, there is one around the corner.'], ['Tourist', 'Is it next to the post office?'], ['Local', 'No, it is across from the post office.'], ['Tourist', 'Thank you for your help.'], ['Local', 'You’re welcome.']] },
                { title: 'No bairro novo', lines: [['Nina', 'Are there any parks in your neighborhood?'], ['Omar', 'Yes, there are two small parks.'], ['Nina', 'Is there a supermarket too?'], ['Omar', 'Yes, next to my building.']] },
                { title: 'Perto do hospital', lines: [['Visitor', 'Where is the pharmacy?'], ['Nurse', 'It is between the café and the hospital entrance.'], ['Visitor', 'Is it open now?'], ['Nurse', 'Yes, until ten.']] },
                { title: 'Encontrando a padaria', lines: [['Maya', 'I can smell fresh bread.'], ['Ravi', 'There is a bakery across from the station.'], ['Maya', 'Is it the place with the green door?'], ['Ravi', 'Yes, that is it.']] }
            ],
            reading: {
                title: 'A useful neighborhood',
                text: 'Omar lives in a busy neighborhood. There is a supermarket next to his building and a bakery around the corner. The bank is across from a small park. There is not a hospital in the neighborhood, but there is a clinic near the station. On Saturdays, Omar walks to the market because the streets are busy and parking is difficult.',
                questions: [
                    ['What is next to Omar’s building?', 'A supermarket is next to his building.'],
                    ['Where is the bakery?', 'It is around the corner.'],
                    ['Is there a hospital in the neighborhood?', 'No, there is not.'],
                    ['Why does Omar walk to the market on Saturdays?', 'Because the streets are busy and parking is difficult.']
                ]
            },
            expressionTranslations: [
                ['Há um banco perto daqui?', 'Is there a bank near here?'],
                ['Há um banheiro perto daqui?', 'Is there a restroom near here?'],
                ['A padaria fica logo depois da esquina.', 'The bakery is around the corner.'],
                ['A estação fica em frente ao parque.', 'The station is across from the park.']
            ],
            music: {
                song: 'Our House', artist: 'Madness', spotifyId: '5HrtZ0YLAcKIRx4tdQoHWc',
                lines: [
                    ['There is a small ___ at the end of the street.', 'park'],
                    ['The ___ is open when the morning begins.', 'bakery'],
                    ['A busy ___ stands across from the hotel.', 'station'],
                    ['The post office is next ___ the bank.', 'to'],
                    ['Everything we need is ___ here.', 'near']
                ]
            },
            homework: {
                instruction: 'Escolha um lugar e escreva 6 a 8 frases descrevendo o que existe e onde fica.',
                themes: ['Seu bairro', 'Uma rua comercial imaginária', 'A região ao redor de um hotel'],
                checklist: ['Use there is e there are.', 'Inclua quatro lugares da cidade.', 'Use next to, between e across from.']
            }
        },

        11: {
            title: lessonTitles[10],
            objectives: [
                'Pedir direções de maneira educada.',
                'Dar instruções com verbos no imperativo.',
                'Organizar um caminho com conectores de sequência.'
            ],
            intro: [
                ['Tourist', 'Excuse me. How do I get to the city museum?'],
                ['Local', 'Go straight for two blocks and turn right.'],
                ['Tourist', 'Do I turn at the traffic lights?'],
                ['Local', 'Yes. Then walk past the bank.'],
                ['Tourist', 'Is the museum on the left?'],
                ['Local', 'Yes, it is next to a small park.']
            ],
            vocab: [
                ['turn left', 'virar à esquerda', 'Turn left at the bank.'],
                ['turn right', 'virar à direita', 'Turn right at the corner.'],
                ['go straight', 'seguir em frente', 'Go straight for one block.'],
                ['cross', 'atravessar', 'Cross the street carefully.'],
                ['block', 'quarteirão', 'Walk for two blocks.'],
                ['traffic lights', 'semáforo', 'Turn at the traffic lights.'],
                ['corner', 'esquina', 'The café is on the corner.'],
                ['map', 'mapa', 'The route is on the map.']
            ],
            grammar: {
                title: 'Imperativos para instruções',
                summary: 'No imperativo, começamos diretamente com o verbo. O sujeito you fica implícito. Use don’t para uma instrução negativa.',
                rows: [
                    ['instrução afirmativa', 'verbo base + complemento', 'Turn left at the corner.', 'Vire à esquerda na esquina.'],
                    ['instrução negativa', 'don’t + verbo base', 'Don’t cross this street.', 'Não atravesse esta rua.'],
                    ['pergunta', 'How do I get to...?', 'How do I get to the station?', 'Como chego à estação?'],
                    ['sequência', 'first / then / after that', 'First go straight. Then turn right.', 'Primeiro siga reto. Depois vire à direita.']
                ],
                notes: [
                    'Use at com pontos específicos: at the corner, at the traffic lights.',
                    'Go past significa continuar passando por um lugar sem entrar nele.',
                    'Dê uma etapa de cada vez para que a direção fique fácil de acompanhar.'
                ]
            },
            practice: [
                ['Complete', '___ left at the traffic lights.', 'virar', 'Turn'],
                ['Unscramble', 'straight / two / Go / blocks / for', 'Siga em frente por dois quarteirões.', 'Go straight for two blocks.'],
                ['Find the error', 'Go straight to the bank and turn the left.', 'Siga até o banco e vire à esquerda.', 'Go straight to the bank and turn left.'],
                ['Choose', '___ the street carefully. (Cross / Across / Corner)', 'atravesse', 'Cross the street carefully.'],
                ['Complete', 'How do I get ___ the station?', 'para', 'to'],
                ['Unscramble', 'past / Walk / bank / the', 'Passe pelo banco.', 'Walk past the bank.'],
                ['Find the error', 'Don’t to turn here.', 'Não vire aqui.', 'Don’t turn here.'],
                ['Choose', 'Turn right ___ the traffic lights. (in / at / on)', 'no semáforo', 'Turn right at the traffic lights.'],
                ['Complete', 'First go straight. ___ turn left.', 'depois', 'Then'],
                ['Unscramble', 'left / museum / The / your / is / on', 'O museu fica à sua esquerda.', 'The museum is on your left.']
            ],
            translations: [
                ['Como eu chego à estação?', 'How do I get to the station?'],
                ['Siga em frente por dois quarteirões.', 'Go straight for two blocks.'],
                ['Vire à esquerda no semáforo.', 'Turn left at the traffic lights.'],
                ['Atravesse a rua com cuidado.', 'Cross the street carefully.'],
                ['Passe pelo banco e vire à direita.', 'Walk past the bank and turn right.'],
                ['O museu fica à sua esquerda.', 'The museum is on your left.']
            ],
            expressions: [
                ['Excuse me.', 'Com licença.', 'Use antes de abordar uma pessoa desconhecida.', 'Excuse me. Can you help me?'],
                ['How do I get to...?', 'Como eu chego a...?', 'Pergunta padrão para pedir um caminho.', 'How do I get to the bus station?'],
                ['go past', 'passar por', 'Significa seguir além de um ponto de referência.', 'Go past the bank and turn left.'],
                ['on your left/right', 'à sua esquerda/direita', 'Use para indicar em qual lado o destino aparecerá.', 'The hotel is on your right.']
            ],
            dialogues: [
                { title: 'A caminho do museu', lines: [['Tourist', 'Excuse me. How do I get to the museum?'], ['Local', 'Go straight and turn left at the bank.'], ['Tourist', 'Do I cross the avenue?'], ['Local', 'Yes. Cross at the traffic lights.'], ['Tourist', 'Is it far from there?'], ['Local', 'No. The museum is on your right.']] },
                { title: 'Dentro do shopping', lines: [['Customer', 'Where is the food court?'], ['Guard', 'Go up the stairs and turn right.'], ['Customer', 'Is it near the cinema?'], ['Guard', 'Yes, across from it.']] },
                { title: 'Procurando a plataforma', lines: [['Traveler', 'How do I get to platform six?'], ['Agent', 'Go past the café and use the stairs.'], ['Traveler', 'Left or right at the top?'], ['Agent', 'Turn left.']] },
                { title: 'Entrega no escritório', lines: [['Courier', 'I am at reception. Where is room twelve?'], ['Assistant', 'Walk down the hall and turn right.'], ['Courier', 'Is it the last door?'], ['Assistant', 'Yes, on your left.']] }
            ],
            reading: {
                title: 'The wrong street',
                text: 'Maya walks to a job interview, but she turns onto the wrong street. She asks a shop assistant for help. The assistant tells her to go back one block, cross at the traffic lights, and walk past a bank. The office building is on the right, next to a café. Maya follows the directions and arrives five minutes early.',
                questions: [
                    ['Where does Maya need to go?', 'She needs to go to a job interview.'],
                    ['Who gives her directions?', 'A shop assistant gives her directions.'],
                    ['Where does Maya cross?', 'She crosses at the traffic lights.'],
                    ['Does Maya arrive late?', 'No, she arrives five minutes early.']
                ]
            },
            expressionTranslations: [
                ['Com licença. Você pode me ajudar?', 'Excuse me. Can you help me?'],
                ['Como eu chego à rodoviária?', 'How do I get to the bus station?'],
                ['Passe pelo banco e vire à esquerda.', 'Go past the bank and turn left.'],
                ['O hotel fica à sua direita.', 'The hotel is on your right.']
            ],
            music: {
                song: 'Take Me Home, Country Roads', artist: 'John Denver', spotifyId: '1YYhDizHx7PnDhAhko6cDS',
                lines: [
                    ['Go ___ until you see the morning light.', 'straight'],
                    ['Turn ___ beside the old green park.', 'left'],
                    ['Walk ___ the station and cross the road.', 'past'],
                    ['The way back home is on your ___ .', 'right'],
                    ['I follow every sign upon the ___ .', 'map']
                ]
            },
            homework: {
                instruction: 'Escolha uma rota e escreva 6 instruções. Na próxima aula, guie o professor oralmente do início ao destino.',
                themes: ['Da sua casa até um mercado', 'Da estação até um hotel', 'Da entrada de um shopping até uma loja'],
                checklist: ['Use pelo menos quatro verbos no imperativo.', 'Inclua dois pontos de referência.', 'Organize com first, then e finally.']
            },
            labs: [
                {
                    title: 'Route Builder',
                    instruction: 'Leia o ponto de partida e organize as três etapas até o destino.',
                    items: [
                        ['Hotel → museum', 'turn right / go past the bank / museum on the left', 'Turn right, go past the bank, and the museum is on your left.'],
                        ['Station → café', 'go straight / cross the street / café on the corner', 'Go straight, cross the street, and the café is on the corner.'],
                        ['Lobby → room 12', 'walk down the hall / turn left / second door', 'Walk down the hall, turn left, and room 12 is the second door.']
                    ]
                }
            ]
        },

        13: {
            title: lessonTitles[12],
            objectives: [
                'Descrever o clima do momento.',
                'Falar sobre temperaturas e estações do ano.',
                'Entender uma previsão simples e escolher atividades adequadas.'
            ],
            intro: [
                ['Maya', 'What’s the weather like today?'],
                ['Ravi', 'It is cloudy and a little cold.'],
                ['Maya', 'Is it raining now?'],
                ['Ravi', 'Not now, but the forecast says rain this afternoon.'],
                ['Maya', 'Then let’s take an umbrella.'],
                ['Ravi', 'Good idea. I need my jacket too.']
            ],
            vocab: [
                ['sunny', 'ensolarado', 'It is sunny today.'],
                ['cloudy', 'nublado', 'The sky is cloudy.'],
                ['rainy', 'chuvoso', 'Spring is rainy here.'],
                ['windy', 'ventando', 'It is windy near the beach.'],
                ['hot', 'quente', 'It is very hot in January.'],
                ['cold', 'frio', 'The morning is cold.'],
                ['spring', 'primavera', 'Flowers grow in spring.'],
                ['winter', 'inverno', 'Winter starts in June in Brazil.']
            ],
            grammar: {
                title: 'It is + clima e ações do tempo',
                summary: 'Em inglês, usamos it como sujeito para falar do clima. Para uma condição, use be + adjetivo; para uma ação agora, use be + verbo-ing.',
                rows: [
                    ['condição', 'It is + adjetivo', 'It is sunny and warm.', 'Está ensolarado e quente.'],
                    ['ação agora', 'It is + verbo-ing', 'It is raining now.', 'Está chovendo agora.'],
                    ['pergunta', 'What’s the weather like?', 'What’s the weather like in Recife?', 'Como está o clima em Recife?'],
                    ['estações', 'in + estação', 'It is cold in winter.', 'Faz frio no inverno.']
                ],
                notes: [
                    'Não diga Is raining. O sujeito it é necessário: It is raining.',
                    'Temperature pode ser high/low; para a sensação usamos hot, warm, cool e cold.',
                    'What’s the weather like? pede descrição; What’s the temperature? pede um número.'
                ]
            },
            practice: [
                ['Complete', 'It ___ sunny this morning.', 'está', 'is'],
                ['Choose', 'Look at the rain! It is ___. (rain / raining / rainy day)', 'chovendo', 'It is raining.'],
                ['Unscramble', 'weather / like / What / the / is / ?', 'Como está o clima?', 'What is the weather like?'],
                ['Find the error', 'Is very cold today.', 'Está muito frio hoje.', 'It is very cold today.'],
                ['Classify', 'sunny / cloudy / winter / windy', 'Três condições e uma estação.', 'Winter is the season; sunny, cloudy, and windy describe conditions.'],
                ['Complete', 'It is cold ___ winter.', 'no', 'in'],
                ['Natural response', '“Is it raining?” — “___”', 'resposta negativa curta', 'No, it isn’t.'],
                ['True or false', '“It is rainy” describes a general condition.', 'verdadeiro', 'True.'],
                ['Find the error', 'The weather is wind today.', 'Está ventando hoje.', 'The weather is windy today.'],
                ['Choose', 'Take a jacket. It is (hot / cold / sunny).', 'frio', 'Take a jacket. It is cold.']
            ],
            translations: [
                ['Hoje está ensolarado e quente.', 'It is sunny and hot today.'],
                ['Está chovendo agora.', 'It is raining now.'],
                ['Como está o clima em Curitiba?', 'What is the weather like in Curitiba?'],
                ['Faz frio no inverno.', 'It is cold in winter.'],
                ['A manhã está nublada.', 'The morning is cloudy.'],
                ['Está ventando perto da praia.', 'It is windy near the beach.']
            ],
            expressions: [
                ['What’s the weather like?', 'Como está o clima?', 'Use para pedir uma descrição geral do tempo.', 'What’s the weather like there?'],
                ['It looks like rain.', 'Parece que vai chover.', 'Use quando há sinais de chuva, como nuvens escuras.', 'Take an umbrella. It looks like rain.'],
                ['clear up', 'abrir / melhorar', 'Use quando a chuva ou as nuvens desaparecem.', 'It clears up after three.'],
                ['cool down', 'esfriar', 'Pode descrever o clima ficando mais fresco.', 'It cools down in the evening.']
            ],
            dialogues: [
                { title: 'Antes de sair', lines: [['Parent', 'It looks cloudy outside.'], ['Teen', 'Does the forecast say rain?'], ['Parent', 'Yes, this afternoon.'], ['Teen', 'Then I need my umbrella.'], ['Parent', 'Take your jacket too.'], ['Teen', 'Okay. It is cold today.']] },
                { title: 'Ligação entre cidades', lines: [['Nina', 'What’s the weather like there?'], ['Omar', 'It is sunny but windy.'], ['Nina', 'Is it warm?'], ['Omar', 'Yes, about twenty-four degrees.']] },
                { title: 'Planos para o parque', lines: [['Maya', 'Can we go to the park this afternoon?'], ['Ravi', 'Maybe. It is raining now.'], ['Maya', 'Does it clear up later?'], ['Ravi', 'Yes, after three.']] },
                { title: 'No escritório', lines: [['Coworker', 'Why is the window closed?'], ['You', 'Because it is very windy.'], ['Coworker', 'Is the room cold?'], ['You', 'A little.']] }
            ],
            reading: {
                title: 'A changing forecast',
                text: 'On Saturday morning, the weather in Porto Alegre is cloudy and cool. Maya plans to visit an outdoor market, so she checks the forecast. Light rain starts at eleven, but the afternoon is sunny and warm. Maya takes an umbrella and visits a museum first. At two o’clock, the rain stops and she walks to the market. Her flexible plan saves the day.',
                questions: [
                    ['What is the weather like on Saturday morning?', 'It is cloudy and cool.'],
                    ['When does the rain start?', 'It starts at eleven.'],
                    ['Where does Maya go first?', 'She goes to a museum first.'],
                    ['What happens at two o’clock?', 'The rain stops.']
                ]
            },
            expressionTranslations: [
                ['Como está o clima aí?', 'What’s the weather like there?'],
                ['Parece que vai chover.', 'It looks like rain.'],
                ['O tempo melhora depois das três.', 'It clears up after three.'],
                ['Esfria à noite.', 'It cools down in the evening.']
            ],
            music: {
                song: 'Here Comes the Sun', artist: 'The Beatles', spotifyId: '6dGnYIeXmHdcikdzNNDMm2',
                lines: [
                    ['Here comes the ___ after a cloudy morning.', 'sun'],
                    ['The cloudy sky starts to clear ___ at noon.', 'up'],
                    ['No dark ___ can stay forever above us.', 'cloud'],
                    ['The wind grows quiet and the sky looks ___ .', 'bright'],
                    ['In ___, every garden wakes again.', 'spring']
                ]
            },
            homework: {
                instruction: 'Escolha uma previsão e escreva 6 frases. Inclua uma decisão prática para cada mudança no clima.',
                themes: ['Previsão para o próximo fim de semana', 'Clima de duas cidades diferentes', 'Um dia com mudanças de tempo'],
                checklist: ['Use quatro palavras de clima.', 'Inclua It is e It is + verbo-ing.', 'Use clear up ou cool down.']
            },
            labs: [
                {
                    title: 'Forecast Decisions',
                    instruction: 'Escolha a decisão mais lógica para cada previsão e depois confira.',
                    items: [
                        ['Heavy rain at 2 p.m.', 'take an umbrella / wear sandals / open the windows', 'Take an umbrella.'],
                        ['Hot and sunny at the beach', 'wear a warm coat / take water / stay near a heater', 'Take water.'],
                        ['Cold and windy in the evening', 'take a jacket / wear shorts / leave the jacket at home', 'Take a jacket.']
                    ]
                }
            ]
        },

        14: {
            title: lessonTitles[13],
            objectives: [
                'Falar sobre atividades de lazer.',
                'Expressar gostos e preferências com like, love e enjoy.',
                'Indicar frequência com always, often, sometimes e never.'
            ],
            intro: [
                ['Nina', 'What do you like doing after work?'],
                ['Omar', 'I enjoy cooking and listening to music.'],
                ['Nina', 'Do you ever play sports?'],
                ['Omar', 'Sometimes. I play tennis on Saturdays.'],
                ['Nina', 'I love tennis, but I am not very good at it.'],
                ['Omar', 'We can practice together this weekend.']
            ],
            vocab: [
                ['read', 'ler', 'I read before bed.'],
                ['watch movies', 'assistir a filmes', 'We watch movies on Friday.'],
                ['listen to music', 'ouvir música', 'She listens to music at home.'],
                ['play games', 'jogar', 'They play games online.'],
                ['draw', 'desenhar', 'Maya likes to draw.'],
                ['take photos', 'tirar fotos', 'She takes photos in the park.'],
                ['cook', 'cozinhar', 'I enjoy cooking.'],
                ['dance', 'dançar', 'We love dancing.']
            ],
            grammar: {
                title: 'Gostos + atividades e frequência',
                summary: 'Depois de like, love e enjoy, podemos usar uma atividade com ing. Os advérbios de frequência mostram com que regularidade algo acontece.',
                rows: [
                    ['gosto', 'like/love/enjoy + verbo-ing', 'I enjoy cooking. / She loves dancing.', 'Eu gosto de cozinhar. / Ela ama dançar.'],
                    ['não gostar', 'don’t/doesn’t like + verbo-ing', 'He doesn’t like running.', 'Ele não gosta de correr.'],
                    ['frequência', 'advérbio antes do verbo comum', 'We often watch movies.', 'Nós assistimos a filmes com frequência.'],
                    ['pergunta', 'Do/Does + sujeito + like...?', 'Do you like swimming?', 'Você gosta de nadar?']
                ],
                notes: [
                    'Enjoy normalmente vem com ing: enjoy reading, não enjoy to read neste nível.',
                    'Always, usually, often, sometimes e never vêm antes do verbo comum.',
                    'Com o verbo be, o advérbio vem depois: I am always tired after swimming.'
                ]
            },
            practice: [
                ['Complete', 'I enjoy ___ in the evening.', 'ler', 'reading'],
                ['Choose', 'She loves (dance / dancing / dances).', 'dançar', 'She loves dancing.'],
                ['Unscramble', 'often / movies / We / watch', 'Nós assistimos a filmes com frequência.', 'We often watch movies.'],
                ['Find the error', 'He enjoy playing chess.', 'Ele gosta de jogar xadrez.', 'He enjoys playing chess.'],
                ['Classify', 'always / sometimes / never', 'do mais frequente ao menos frequente', 'Always → sometimes → never.'],
                ['Complete', 'Omar does not like ___ early.', 'correr', 'running'],
                ['Natural response', '“Do you like swimming?” — “___”', 'resposta positiva curta', 'Yes, I do.'],
                ['Choose', 'I ___ play tennis on weekends, but not every weekend. (always / sometimes / never)', 'às vezes', 'I sometimes play tennis on weekends.'],
                ['Find the error', 'Maya likes cook.', 'Maya gosta de cozinhar.', 'Maya likes cooking.'],
                ['Unscramble', 'does / What / free time / she / do / in her / ?', 'O que ela faz no tempo livre?', 'What does she do in her free time?']
            ],
            translations: [
                ['Eu gosto de ler à noite.', 'I like reading at night.'],
                ['Ela ama dançar.', 'She loves dancing.'],
                ['Nós frequentemente assistimos a filmes.', 'We often watch movies.'],
                ['Omar não gosta de correr.', 'Omar does not like running.'],
                ['Você gosta de nadar?', 'Do you like swimming?'],
                ['Eu nunca jogo videogame de manhã.', 'I never play video games in the morning.']
            ],
            expressions: [
                ['be into', 'curtir / interessar-se por', 'Forma informal de dizer que gosta bastante de algo.', 'I am into photography.'],
                ['be good at', 'ser bom em', 'Depois de at, use substantivo ou verbo-ing.', 'She is good at drawing.'],
                ['in my free time', 'no meu tempo livre', 'Use para introduzir atividades de lazer.', 'In my free time, I listen to music.'],
                ['hang out', 'passar tempo junto', 'Expressão informal para encontrar amigos sem uma atividade formal.', 'We hang out at the park on Sundays.']
            ],
            dialogues: [
                { title: 'Escolhendo uma atividade', lines: [['Maya', 'Do you want to watch a movie tonight?'], ['Ravi', 'Maybe. I usually play soccer on Fridays.'], ['Maya', 'What time do you finish?'], ['Ravi', 'At seven. We can watch a late movie.'], ['Maya', 'Great. I am into science fiction.'], ['Ravi', 'Me too.']] },
                { title: 'Conhecendo um colega', lines: [['Nina', 'What do you do in your free time?'], ['Omar', 'I enjoy cooking and reading.'], ['Nina', 'Are you good at cooking?'], ['Omar', 'Yes, especially pasta.']] },
                { title: 'Plano de domingo', lines: [['Friend', 'Do you want to hang out on Sunday?'], ['You', 'Sure. I often go to the park.'], ['Friend', 'Can we ride bikes there?'], ['You', 'Yes, we can.']] },
                { title: 'Aula experimental', lines: [['Instructor', 'Do you like dancing?'], ['Student', 'Yes, but I am not good at it.'], ['Instructor', 'That is okay. This is a beginner class.'], ['Student', 'Perfect.']] }
            ],
            reading: {
                title: 'A club for every interest',
                text: 'The community center has activities every evening. On Monday, people practice drawing. The cooking club meets on Tuesday, and the dance class is on Thursday. Nina loves cooking, but she also wants to meet new people, so she joins the Tuesday club. Omar is good at drawing and helps beginners on Mondays. They sometimes meet after class for coffee.',
                questions: [
                    ['When does the drawing group meet?', 'It meets on Monday.'],
                    ['Which activity does Nina love?', 'She loves cooking.'],
                    ['Why does Nina join the cooking club?', 'Because she loves cooking and wants to meet people.'],
                    ['How does Omar help on Mondays?', 'He helps beginners with drawing.']
                ]
            },
            expressionTranslations: [
                ['Eu curto fotografia.', 'I am into photography.'],
                ['Ela é boa em desenhar.', 'She is good at drawing.'],
                ['No meu tempo livre, eu ouço música.', 'In my free time, I listen to music.'],
                ['Nós passamos tempo juntos no parque aos domingos.', 'We hang out at the park on Sundays.']
            ],
            music: {
                song: 'The Lazy Song', artist: 'Bruno Mars', spotifyId: '1ExfPZEiahqhLyajhybFeS',
                lines: [
                    ['In my free ___, I choose what I enjoy.', 'time'],
                    ['I often listen to ___ when the day is slow.', 'music'],
                    ['My friends hang ___ beside the park café.', 'out'],
                    ['She is good at ___ pictures of the town.', 'drawing'],
                    ['We love ___ when our favorite song begins.', 'dancing']
                ]
            },
            homework: {
                instruction: 'Escolha um perfil e escreva 6 a 8 frases sobre gostos, habilidades e frequência.',
                themes: ['Seus hobbies durante a semana', 'Os hobbies de uma pessoa da família', 'Um clube de atividades ideal'],
                checklist: ['Use like, love ou enjoy com ing.', 'Inclua três advérbios de frequência.', 'Use be into ou be good at.']
            },
            labs: [
                {
                    title: 'Class Survey',
                    instruction: 'Transforme cada informação em uma pergunta de pesquisa.',
                    items: [
                        ['likes cooking', 'pergunte se a pessoa gosta de cozinhar', 'Do you like cooking?'],
                        ['plays sports on weekends', 'pergunte o que ela faz no fim de semana', 'Do you play sports on weekends?'],
                        ['frequency of reading', 'pergunte com que frequência ela lê', 'How often do you read?']
                    ]
                }
            ]
        },

        15: {
            title: lessonTitles[14],
            objectives: [
                'Nomear roupas, tamanhos e preços.',
                'Usar this, that, these e those.',
                'Pedir para experimentar e decidir uma compra.'
            ],
            intro: [
                ['Sales Assistant', 'Can I help you?'],
                ['Customer', 'Yes. I like these jeans, but I need a larger size.'],
                ['Sales Assistant', 'What size do you wear?'],
                ['Customer', 'Medium. Can I try them on?'],
                ['Sales Assistant', 'Of course. The fitting room is over there.'],
                ['Customer', 'Thank you. How much are they?']
            ],
            vocab: [
                ['T-shirt', 'camiseta', 'This T-shirt is blue.'],
                ['jeans', 'calça jeans', 'These jeans are comfortable.'],
                ['dress', 'vestido', 'That dress is beautiful.'],
                ['shoes', 'sapatos', 'Those shoes are expensive.'],
                ['size', 'tamanho', 'What size do you wear?'],
                ['color', 'cor', 'Do you have another color?'],
                ['cheap', 'barato', 'The black shirt is cheap.'],
                ['expensive', 'caro', 'This jacket is expensive.']
            ],
            grammar: {
                title: 'Demonstrativos, singular e plural',
                summary: 'Use this/these para itens próximos e that/those para itens mais distantes. O verbo e o preço concordam com singular ou plural.',
                rows: [
                    ['perto + singular', 'this + substantivo / is', 'This shirt is small.', 'Esta camisa é pequena.'],
                    ['longe + singular', 'that + substantivo / is', 'That dress is beautiful.', 'Aquele vestido é bonito.'],
                    ['perto + plural', 'these + substantivo / are', 'These shoes are comfortable.', 'Estes sapatos são confortáveis.'],
                    ['longe + plural', 'those + substantivo / are', 'Those jeans are expensive.', 'Aquelas calças são caras.']
                ],
                notes: [
                    'Pergunte How much is this shirt? no singular e How much are these shoes? no plural.',
                    'Jeans e trousers são tratados como plural: These jeans are new.',
                    'Adjetivos não mudam no plural: one blue shirt, two blue shirts.'
                ]
            },
            practice: [
                ['Complete', '___ T-shirt here is very soft.', 'esta', 'This'],
                ['Choose', '___ shoes over there are black. (This / That / Those)', 'aqueles', 'Those shoes over there are black.'],
                ['Unscramble', 'much / dress / How / this / is / ?', 'Quanto custa este vestido?', 'How much is this dress?'],
                ['Find the error', 'These jacket is expensive.', 'Esta jaqueta é cara.', 'This jacket is expensive.'],
                ['Complete', 'Can I try these jeans ___?', 'experimentar', 'on'],
                ['Natural response', '“What size do you wear?” — “___”', 'tamanho médio', 'I wear medium.'],
                ['Choose', 'These shoes (is / are / be) comfortable.', 'são', 'These shoes are comfortable.'],
                ['Find the error', 'Those T-shirts are blues.', 'Aquelas camisetas são azuis.', 'Those T-shirts are blue.'],
                ['Complete', 'Do you have this shirt in another ___?', 'cor', 'color'],
                ['Dialogue order', '1. I’ll take it. 2. It fits well. 3. Can I try it on?', 'primeiro experimentar', 'Can I try it on? → It fits well. → I’ll take it.']
            ],
            translations: [
                ['Esta camiseta é azul.', 'This T-shirt is blue.'],
                ['Aquele vestido é bonito.', 'That dress is beautiful.'],
                ['Estes sapatos são confortáveis.', 'These shoes are comfortable.'],
                ['Quanto custa esta jaqueta?', 'How much is this jacket?'],
                ['Posso experimentar esta calça jeans?', 'Can I try these jeans on?'],
                ['Você tem esta camisa em outra cor?', 'Do you have this shirt in another color?']
            ],
            expressions: [
                ['Can I try it on?', 'Posso experimentar?', 'Use it para uma peça e them para itens no plural.', 'Can I try these shoes on?'],
                ['It fits well.', 'Serve bem.', 'Fit fala do tamanho e do caimento.', 'The jacket fits well.'],
                ['It is sold out.', 'Está esgotado.', 'Use quando a loja não tem mais o item.', 'The blue shirt is sold out.'],
                ['I’ll take it.', 'Vou levar.', 'Use para confirmar a decisão de compra.', 'It looks great. I’ll take it.']
            ],
            dialogues: [
                { title: 'No provador', lines: [['Customer', 'Can I try this jacket on?'], ['Assistant', 'Of course. What size do you need?'], ['Customer', 'A small, please.'], ['Assistant', 'Here you are.'], ['Customer', 'It fits well. How much is it?'], ['Assistant', 'It is forty dollars.']] },
                { title: 'Outra cor', lines: [['Customer', 'Do you have this shirt in green?'], ['Assistant', 'No, green is sold out.'], ['Customer', 'What colors do you have?'], ['Assistant', 'Blue and black.']] },
                { title: 'Escolhendo sapatos', lines: [['Maya', 'Do you like these shoes?'], ['Ravi', 'Yes, but they look expensive.'], ['Maya', 'They are on sale today.'], ['Ravi', 'Then try them on.']] },
                { title: 'Fechando a compra', lines: [['Assistant', 'How does the dress fit?'], ['Customer', 'It fits very well.'], ['Assistant', 'Would you like to see another one?'], ['Customer', 'No, thank you. I’ll take this one.']] }
            ],
            reading: {
                title: 'The right jacket',
                text: 'Nina needs a jacket for a cold trip. She finds a black jacket that is warm and cheap, but the small size does not fit. The assistant brings a medium jacket in blue. Nina usually wears black, but the blue jacket fits well and is comfortable. It is also on sale, so Nina decides to take it.',
                questions: [
                    ['Why does Nina need a jacket?', 'She needs it for a cold trip.'],
                    ['What is wrong with the black jacket?', 'The small size does not fit.'],
                    ['Which color does the assistant bring?', 'The assistant brings blue.'],
                    ['Why does Nina buy the blue jacket?', 'Because it fits well, is comfortable, and is on sale.']
                ]
            },
            expressionTranslations: [
                ['Posso experimentar esta jaqueta?', 'Can I try this jacket on?'],
                ['Ela serve bem.', 'It fits well.'],
                ['A camisa azul está esgotada.', 'The blue shirt is sold out.'],
                ['Gostei. Vou levar.', 'I like it. I’ll take it.']
            ],
            music: {
                song: 'Blue Suede Shoes', artist: 'Elvis Presley', spotifyId: '47gmoUrZV3w20JAnQOZMcO',
                lines: [
                    ['These blue ___ are beside the door.', 'shoes'],
                    ['That black ___ is on the wall.', 'jacket'],
                    ['I try it ___ and check the size again.', 'on'],
                    ['It ___ well, and the color looks bright.', 'fits'],
                    ['The price is right; I smile and ___ the blue one home.', 'take']
                ]
            },
            homework: {
                instruction: 'Escolha uma situação e crie um diálogo de compra com 6 a 8 falas. Na próxima aula, faça o papel de cliente com o professor.',
                themes: ['Comprar uma roupa para uma viagem', 'Trocar uma peça pelo tamanho correto', 'Escolher entre dois pares de sapatos'],
                checklist: ['Use this/that/these/those.', 'Pergunte tamanho, cor e preço.', 'Inclua try on, fit ou sold out.']
            },
            labs: [
                {
                    title: 'Shopping Tags',
                    instruction: 'Leia cada etiqueta e responda com uma frase completa.',
                    items: [
                        ['Blue T-shirt | Size M | $18', 'preço desta camiseta', 'This blue T-shirt is eighteen dollars.'],
                        ['Black shoes | Size 39 | sold out', 'disponibilidade destes sapatos', 'These black shoes are sold out.'],
                        ['Green dress | Size S | $42', 'tamanho e preço daquele vestido', 'That green dress is size small and costs forty-two dollars.']
                    ]
                }
            ]
        },

        17: {
            title: lessonTitles[16],
            objectives: [
                'Descrever sintomas comuns.',
                'Perguntar como alguém está se sentindo.',
                'Dar conselhos básicos com should e shouldn’t.'
            ],
            intro: [
                ['Pharmacist', 'Hello. How can I help you?'],
                ['Customer', 'I have a sore throat and a headache.'],
                ['Pharmacist', 'Do you have a fever?'],
                ['Customer', 'No, but I feel very tired.'],
                ['Pharmacist', 'You should drink water and get some rest.'],
                ['Customer', 'Thank you. Do I need any medicine?']
            ],
            vocab: [
                ['headache', 'dor de cabeça', 'I have a headache.'],
                ['sore throat', 'dor de garganta', 'She has a sore throat.'],
                ['cough', 'tosse', 'He has a bad cough at night.'],
                ['fever', 'febre', 'Do you have a fever?'],
                ['stomachache', 'dor de estômago', 'Maya has a stomachache.'],
                ['tired', 'cansado(a)', 'I feel tired today.'],
                ['dizzy', 'tonto(a)', 'Sit down if you feel dizzy.'],
                ['medicine', 'remédio', 'Take this medicine after lunch.']
            ],
            grammar: {
                title: 'Have/has, feel e should',
                summary: 'Use have/has com sintomas que funcionam como substantivos. Use feel com adjetivos e should para recomendar uma ação.',
                rows: [
                    ['sintoma', 'have/has + a + sintoma', 'I have a headache. / She has a cough.', 'Estou com dor de cabeça. / Ela está com tosse.'],
                    ['sensação', 'feel + adjetivo', 'I feel tired. / He feels dizzy.', 'Eu me sinto cansado. / Ele se sente tonto.'],
                    ['conselho', 'should + verbo base', 'You should rest.', 'Você deveria descansar.'],
                    ['conselho negativo', 'shouldn’t + verbo base', 'You shouldn’t go to work.', 'Você não deveria ir trabalhar.']
                ],
                notes: [
                    'Should não muda com he ou she: He should rest, sem s.',
                    'Depois de should, use verbo base: should drink, e não should to drink.',
                    'Esta aula pratica comunicação básica; sintomas intensos ou persistentes exigem orientação profissional.'
                ]
            },
            practice: [
                ['Complete', 'I ___ a headache.', 'estou com / tenho', 'have'],
                ['Choose', 'She ___ a sore throat. (have / has / feels)', 'está com', 'She has a sore throat.'],
                ['Unscramble', 'should / You / water / drink', 'Você deveria beber água.', 'You should drink water.'],
                ['Find the error', 'He feel dizzy.', 'Ele se sente tonto.', 'He feels dizzy.'],
                ['Natural response', '“Do you have a fever?” — “___”', 'resposta negativa', 'No, I don’t.'],
                ['Complete', 'You should ___ some rest.', 'descansar', 'get'],
                ['Choose', 'You (should / shouldn’t) drive when you feel dizzy.', 'não deveria', 'You shouldn’t drive when you feel dizzy.'],
                ['Find the error', 'She should to take this medicine.', 'Ela deveria tomar este remédio.', 'She should take this medicine.'],
                ['Match', 'headache / sore throat / stomachache', 'cabeça / garganta / estômago', 'headache = cabeça; sore throat = garganta; stomachache = estômago.'],
                ['Complete', 'My brother ___ tired today.', 'se sente', 'feels']
            ],
            translations: [
                ['Eu estou com dor de cabeça.', 'I have a headache.'],
                ['Ela está com dor de garganta.', 'She has a sore throat.'],
                ['Você está com febre?', 'Do you have a fever?'],
                ['Eu me sinto muito cansado.', 'I feel very tired.'],
                ['Você deveria beber água.', 'You should drink water.'],
                ['Ele não deveria dirigir.', 'He should not drive.']
            ],
            expressions: [
                ['What’s the matter?', 'Qual é o problema?', 'Pergunta comum para saber por que alguém não está bem.', 'You look tired. What’s the matter?'],
                ['feel better', 'sentir-se melhor', 'Use quando a saúde ou disposição melhora.', 'I hope you feel better soon.'],
                ['take medicine', 'tomar remédio', 'Em inglês, usamos take, não drink, para medicine.', 'Take the medicine after breakfast.'],
                ['get some rest', 'descansar um pouco', 'Expressão natural para recomendar repouso.', 'Go home and get some rest.']
            ],
            dialogues: [
                { title: 'Na farmácia', lines: [['Pharmacist', 'What’s the matter?'], ['Customer', 'I have a cough and a sore throat.'], ['Pharmacist', 'Do you have a fever?'], ['Customer', 'No, I don’t.'], ['Pharmacist', 'You should drink water and rest.'], ['Customer', 'Okay. Thank you.']] },
                { title: 'No trabalho', lines: [['Coworker', 'You look tired today.'], ['You', 'I have a bad headache.'], ['Coworker', 'You should go home.'], ['You', 'Yes, I think so.']] },
                { title: 'Depois do almoço', lines: [['Maya', 'My stomach hurts.'], ['Ravi', 'Do you feel sick?'], ['Maya', 'A little.'], ['Ravi', 'Sit down and get some rest.']] },
                { title: 'Ligando para a escola', lines: [['Parent', 'My daughter has a fever.'], ['Assistant', 'I’m sorry to hear that.'], ['Parent', 'She cannot go to class today.'], ['Assistant', 'That is okay. I hope she feels better soon.']] }
            ],
            reading: {
                title: 'A quiet day at home',
                text: 'Omar wakes up with a headache and a sore throat. He checks his temperature, but he does not have a fever. He calls his office and says he cannot work in the morning. Then he drinks warm tea, takes his medicine, and gets some rest. In the afternoon, his headache is gone and he feels better, but he stays home for the rest of the day.',
                questions: [
                    ['Which symptoms does Omar have?', 'He has a headache and a sore throat.'],
                    ['Does he have a fever?', 'No, he does not.'],
                    ['What does Omar do after calling his office?', 'He drinks tea, takes medicine, and rests.'],
                    ['How does he feel in the afternoon?', 'He feels better and his headache is gone.']
                ]
            },
            expressionTranslations: [
                ['Qual é o problema?', 'What’s the matter?'],
                ['Espero que você se sinta melhor logo.', 'I hope you feel better soon.'],
                ['Tome o remédio depois do café da manhã.', 'Take the medicine after breakfast.'],
                ['Vá para casa e descanse um pouco.', 'Go home and get some rest.']
            ],
            music: {
                song: 'Doctor My Eyes', artist: 'Jackson Browne', spotifyId: '5OuaAMBmGjjJMK7yXpaFAK',
                lines: [
                    ['My head feels heavy; I have a ___ today.', 'headache'],
                    ['I drink warm water for my sore ___ .', 'throat'],
                    ['The doctor says I should get some ___ .', 'rest'],
                    ['I take my ___ after a light meal.', 'medicine'],
                    ['By the evening, I begin to feel ___ .', 'better']
                ]
            },
            homework: {
                instruction: 'Escolha uma situação e escreva um diálogo de 6 a 8 falas com sintomas e conselhos.',
                themes: ['Uma conversa na farmácia', 'Avisar que você não vai trabalhar', 'Ajudar um amigo que não está bem'],
                checklist: ['Inclua dois sintomas.', 'Use should e shouldn’t.', 'Inclua duas expressões da aula.']
            },
            labs: [
                {
                    title: 'Symptom and Advice Clinic',
                    instruction: 'Associe cada situação a um conselho simples e seguro.',
                    items: [
                        ['I feel dizzy.', 'drive home / sit down / run outside', 'You should sit down.'],
                        ['I have a sore throat.', 'drink warm water / shout / eat very spicy food', 'You should drink warm water.'],
                        ['I am very tired.', 'get some rest / stay awake all night / skip water', 'You should get some rest.']
                    ]
                }
            ]
        },

        18: {
            title: lessonTitles[17],
            objectives: [
                'Nomear cômodos e móveis da casa.',
                'Descrever onde os objetos estão.',
                'Perguntar e responder sobre localização com where.'
            ],
            intro: [
                ['Maya', 'Where are the clean towels?'],
                ['Ravi', 'They are in the bathroom cabinet.'],
                ['Maya', 'I looked there, but I cannot see them.'],
                ['Ravi', 'Check the shelf above the sink.'],
                ['Maya', 'Oh, here they are. And where is the hair dryer?'],
                ['Ravi', 'It is under the sink, inside the blue box.']
            ],
            vocab: [
                ['kitchen', 'cozinha', 'The kitchen is next to the living room.'],
                ['bedroom', 'quarto', 'My bedroom is upstairs.'],
                ['bathroom', 'banheiro', 'The towels are in the bathroom.'],
                ['living room', 'sala de estar', 'There is a sofa in the living room.'],
                ['sofa', 'sofá', 'The keys are on the sofa.'],
                ['shelf', 'prateleira', 'The books are on the shelf.'],
                ['wardrobe', 'guarda-roupa', 'Her clothes are in the wardrobe.'],
                ['stairs', 'escadas', 'The bathroom is near the stairs.']
            ],
            grammar: {
                title: 'Preposições de lugar + where',
                summary: 'Use preposições para indicar a posição de pessoas e objetos. A pergunta com where muda apenas o verbo de posição.',
                rows: [
                    ['dentro / sobre / sob', 'in / on / under', 'The shoes are under the bed.', 'Os sapatos estão debaixo da cama.'],
                    ['ao lado / entre', 'next to / between', 'The lamp is next to the sofa.', 'A luminária está ao lado do sofá.'],
                    ['atrás / na frente', 'behind / in front of', 'The garden is behind the house.', 'O jardim fica atrás da casa.'],
                    ['pergunta', 'Where + be + objeto?', 'Where are the towels?', 'Onde estão as toalhas?']
                ],
                notes: [
                    'Use is para um objeto e are para mais de um: Where is the key? Where are the keys?',
                    'On indica contato com a superfície; above indica posição mais alta sem contato obrigatório.',
                    'Inside e outside reforçam a ideia de dentro e fora.'
                ]
            },
            practice: [
                ['Complete', 'The keys are ___ the table.', 'sobre', 'on'],
                ['Choose', 'The shoes are ___ the bed. (under / between / at)', 'debaixo', 'The shoes are under the bed.'],
                ['Unscramble', 'is / Where / remote / the / ?', 'Onde está o controle?', 'Where is the remote?'],
                ['Find the error', 'The towels is in the bathroom.', 'As toalhas estão no banheiro.', 'The towels are in the bathroom.'],
                ['Complete', 'The lamp is next ___ the sofa.', 'ao lado de', 'to'],
                ['Picture logic', 'The chair has a table on each side.', 'posição da cadeira', 'The chair is between the tables.'],
                ['Choose', 'The garden is ___ the house. You cannot see it from the street. (behind / on / inside)', 'atrás', 'The garden is behind the house.'],
                ['Find the error', 'Where the books are?', 'Onde estão os livros?', 'Where are the books?'],
                ['Complete', 'My bedroom is ___ . I use the stairs.', 'no andar de cima', 'upstairs'],
                ['Unscramble', 'wardrobe / clothes / in / are / Her / the', 'As roupas dela estão no guarda-roupa.', 'Her clothes are in the wardrobe.']
            ],
            translations: [
                ['As chaves estão sobre a mesa.', 'The keys are on the table.'],
                ['Os sapatos estão debaixo da cama.', 'The shoes are under the bed.'],
                ['Onde estão as toalhas?', 'Where are the towels?'],
                ['A luminária fica ao lado do sofá.', 'The lamp is next to the sofa.'],
                ['O jardim fica atrás da casa.', 'The garden is behind the house.'],
                ['As roupas dela estão no guarda-roupa.', 'Her clothes are in the wardrobe.']
            ],
            expressions: [
                ['at home', 'em casa', 'Use sem the para dizer que alguém está em casa.', 'I am at home this afternoon.'],
                ['upstairs / downstairs', 'no andar de cima / de baixo', 'Use para indicar o andar sem repetir room ou floor.', 'The bedrooms are upstairs.'],
                ['make the bed', 'arrumar a cama', 'Make é o verbo usado nesta combinação.', 'I make the bed every morning.'],
                ['tidy up', 'arrumar / organizar', 'Phrasal verb comum para deixar um espaço organizado.', 'We need to tidy up the living room.']
            ],
            dialogues: [
                { title: 'Procurando as chaves', lines: [['Nina', 'Where are my keys?'], ['Omar', 'Are they on the kitchen table?'], ['Nina', 'No, they aren’t.'], ['Omar', 'Look inside your bag.'], ['Nina', 'You’re right. They are in the small pocket.'], ['Omar', 'Great.']] },
                { title: 'Mostrando a casa', lines: [['Host', 'The living room is on your left.'], ['Guest', 'Where is the bathroom?'], ['Host', 'It is upstairs, next to the bedroom.'], ['Guest', 'Thank you.']] },
                { title: 'Arrumando a sala', lines: [['Parent', 'Can you tidy up the living room?'], ['Teen', 'Sure. Where do these books go?'], ['Parent', 'Put them on the shelf.'], ['Teen', 'Okay.']] },
                { title: 'Entrega de um móvel', lines: [['Driver', 'Where do you want the new chair?'], ['Customer', 'In the bedroom, next to the wardrobe.'], ['Driver', 'Is the bedroom upstairs?'], ['Customer', 'Yes, it is.']] }
            ],
            reading: {
                title: 'A small apartment with smart spaces',
                text: 'Maya lives in a small apartment, but every object has a place. Her books are on two shelves above the sofa. A narrow table is behind the sofa, and her work bag stays under it. In the bedroom, clothes are in the wardrobe and shoes are inside boxes under the bed. Maya tidies up for ten minutes every evening, so the apartment rarely feels crowded.',
                questions: [
                    ['Where are Maya’s books?', 'They are on shelves above the sofa.'],
                    ['What is behind the sofa?', 'A narrow table is behind the sofa.'],
                    ['Where does Maya keep her shoes?', 'She keeps them in boxes under the bed.'],
                    ['How long does Maya tidy up each evening?', 'She tidies up for ten minutes.']
                ]
            },
            expressionTranslations: [
                ['Eu estou em casa esta tarde.', 'I am at home this afternoon.'],
                ['Os quartos ficam no andar de cima.', 'The bedrooms are upstairs.'],
                ['Eu arrumo a cama todas as manhãs.', 'I make the bed every morning.'],
                ['Nós precisamos organizar a sala.', 'We need to tidy up the living room.']
            ],
            music: {
                song: 'Home', artist: 'Phillip Phillips', spotifyId: '10Ypu0yOfBL9LgqZDmQSnH',
                lines: [
                    ['The books are on the wooden ___ .', 'shelf'],
                    ['A quiet lamp stands next to the ___ .', 'sofa'],
                    ['My favorite room is ___, above the hall.', 'upstairs'],
                    ['I make the ___ when the morning begins.', 'bed'],
                    ['At night, I tidy ___ and turn off the light.', 'up']
                ]
            },
            homework: {
                instruction: 'Escolha um espaço e escreva 7 frases descrevendo a posição dos objetos. Faça também um desenho simples para seguir o texto.',
                themes: ['Seu quarto', 'Uma sala ideal', 'Um apartamento pequeno e organizado'],
                checklist: ['Use pelo menos cinco preposições.', 'Inclua uma pergunta com where.', 'Use make the bed ou tidy up.']
            }
        },

        19: {
            title: lessonTitles[18],
            objectives: [
                'Falar sobre escola, trabalho e tarefas comuns.',
                'Descrever habilidades com can e can’t.',
                'Indicar uma obrigação básica com have to.'
            ],
            intro: [
                ['Manager', 'Can you help with the morning meeting?'],
                ['Employee', 'Yes. I can prepare the room and the projector.'],
                ['Manager', 'Great. We have to start at nine exactly.'],
                ['Employee', 'Do I have to print the report?'],
                ['Manager', 'No. The digital version is fine.'],
                ['Employee', 'Okay. I can send it to everyone now.']
            ],
            vocab: [
                ['student', 'estudante', 'The students have a test today.'],
                ['teacher', 'professor(a)', 'Our teacher explains clearly.'],
                ['office', 'escritório', 'The office opens at eight.'],
                ['colleague', 'colega de trabalho', 'My colleague helps with the report.'],
                ['meeting', 'reunião', 'We have a meeting at ten.'],
                ['break', 'intervalo', 'Lunch break is at noon.'],
                ['homework', 'tarefa de casa', 'I finish my homework after dinner.'],
                ['uniform', 'uniforme', 'Students have to wear a uniform.']
            ],
            grammar: {
                title: 'Can para habilidade + have to para obrigação',
                summary: 'Use can para dizer o que alguém sabe ou consegue fazer. Use have to para uma regra ou tarefa necessária.',
                rows: [
                    ['habilidade', 'can + verbo base', 'I can use this program.', 'Eu sei usar este programa.'],
                    ['falta de habilidade', 'can’t + verbo base', 'She can’t drive.', 'Ela não sabe dirigir.'],
                    ['obrigação', 'have/has to + verbo base', 'We have to arrive early.', 'Nós temos que chegar cedo.'],
                    ['pergunta', 'Do/Does + sujeito + have to...?', 'Do students have to wear a uniform?', 'Os alunos precisam usar uniforme?']
                ],
                notes: [
                    'Depois de can, nunca use to: can help, e não can to help.',
                    'Can não recebe s com he ou she: She can speak English.',
                    'Has to aparece com he, she e it: The teacher has to open the room.'
                ]
            },
            practice: [
                ['Complete', 'I ___ use this computer program.', 'sei / consigo', 'can'],
                ['Choose', 'She (can / cans / can to) speak Spanish.', 'sabe', 'She can speak Spanish.'],
                ['Unscramble', 'early / have / arrive / We / to', 'Nós temos que chegar cedo.', 'We have to arrive early.'],
                ['Find the error', 'He can to help with the report.', 'Ele pode ajudar com o relatório.', 'He can help with the report.'],
                ['Complete', 'The teacher ___ to open the classroom.', 'tem que', 'has'],
                ['Natural response', '“Can you use the projector?” — “___”', 'resposta positiva', 'Yes, I can.'],
                ['Choose', 'Students ___ use phones during the test. (can / can’t / have)', 'não podem', 'Students can’t use phones during the test.'],
                ['Find the error', 'Do she have to wear a uniform?', 'Ela precisa usar uniforme?', 'Does she have to wear a uniform?'],
                ['Complete', 'I finish my ___ after dinner.', 'tarefa de casa', 'homework'],
                ['Classify', 'can write / have to write', 'habilidade / obrigação', 'Can write = habilidade; have to write = obrigação.']
            ],
            translations: [
                ['Eu sei usar este programa.', 'I can use this program.'],
                ['Ela não sabe dirigir.', 'She cannot drive.'],
                ['Nós temos uma reunião às dez.', 'We have a meeting at ten.'],
                ['Os alunos precisam usar uniforme.', 'The students have to wear a uniform.'],
                ['Você pode me ajudar com a tarefa?', 'Can you help me with the homework?'],
                ['Ele precisa chegar cedo.', 'He has to arrive early.']
            ],
            expressions: [
                ['take a break', 'fazer uma pausa', 'Use take com break para falar de uma pausa no trabalho ou estudo.', 'Let’s take a short break.'],
                ['work from home', 'trabalhar de casa', 'Expressão comum para trabalho remoto.', 'I work from home on Fridays.'],
                ['hand in', 'entregar uma tarefa', 'Phrasal verb usado para trabalhos escolares ou documentos.', 'Please hand in your homework today.'],
                ['be on duty', 'estar de plantão / serviço', 'Indica quem está responsável em determinado período.', 'Nina is on duty this morning.']
            ],
            dialogues: [
                { title: 'Antes da reunião', lines: [['Manager', 'Can you open the meeting room?'], ['Employee', 'Yes. Do I have to turn on the projector too?'], ['Manager', 'Please. The client arrives at ten.'], ['Employee', 'I can prepare everything by nine thirty.'], ['Manager', 'Perfect. Then take a short break.'], ['Employee', 'Thanks.']] },
                { title: 'Tarefa atrasada', lines: [['Teacher', 'Do you have your homework?'], ['Student', 'Yes, but I have to print it.'], ['Teacher', 'You can email it to me.'], ['Student', 'Great, thank you.']] },
                { title: 'Trabalho remoto', lines: [['Colleague', 'Are you at the office on Friday?'], ['You', 'No, I work from home.'], ['Colleague', 'Can we have an online meeting?'], ['You', 'Yes, at two.']] },
                { title: 'Plantão da manhã', lines: [['Visitor', 'Who can help me today?'], ['Assistant', 'Nina is on duty this morning.'], ['Visitor', 'Where is she?'], ['Assistant', 'She is in office three.']] }
            ],
            reading: {
                title: 'A shared morning task',
                text: 'Every Monday, Ben and Nina prepare the office for a team meeting. Ben can use the projector, and Nina can organize the digital files. They have to check the room before nine because the meeting starts at nine fifteen. This week, Ben cannot come early, so Nina asks another colleague for help. Everything is ready when the team arrives.',
                questions: [
                    ['When do Ben and Nina prepare the office?', 'They prepare it every Monday.'],
                    ['What can Ben do?', 'He can use the projector.'],
                    ['Why do they have to check the room before nine?', 'Because the meeting starts at nine fifteen.'],
                    ['Who helps Nina this week?', 'Another colleague helps her.']
                ]
            },
            expressionTranslations: [
                ['Vamos fazer uma pausa curta.', 'Let’s take a short break.'],
                ['Eu trabalho de casa às sextas-feiras.', 'I work from home on Fridays.'],
                ['Por favor, entregue sua tarefa hoje.', 'Please hand in your homework today.'],
                ['Nina está de plantão esta manhã.', 'Nina is on duty this morning.']
            ],
            music: {
                song: 'Manic Monday', artist: 'The Bangles', spotifyId: '084PXFhuurZHjsjgdwQci6',
                lines: [
                    ['The busy ___ opens early every Monday.', 'office'],
                    ['We have a team ___ before lunch today.', 'meeting'],
                    ['I can prepare the room and send the ___ .', 'report'],
                    ['At noon, everybody takes a short ___ .', 'break'],
                    ['Before we leave, we hand ___ our work.', 'in']
                ]
            },
            homework: {
                instruction: 'Escolha uma rotina e escreva 6 a 8 frases sobre habilidades, tarefas e horários.',
                themes: ['Sua rotina de estudo', 'Um dia em um escritório', 'As tarefas de uma profissão'],
                checklist: ['Use can e can’t.', 'Inclua duas obrigações com have to.', 'Use take a break, work from home ou hand in.']
            },
            labs: [
                {
                    title: 'Ability or Obligation?',
                    instruction: 'Leia a situação e escolha can ou have to antes de revelar a frase.',
                    items: [
                        ['Nina knows how to design presentations.', 'habilidade', 'Nina can design presentations.'],
                        ['The office rule says everyone arrives before nine.', 'obrigação', 'Everyone has to arrive before nine.'],
                        ['Ben does not know how to drive.', 'falta de habilidade', 'Ben can’t drive.']
                    ]
                }
            ]
        },

        21: {
            title: lessonTitles[20],
            objectives: [
                'Pedir informações sobre passagens e horários.',
                'Usar can e could em pedidos de viagem.',
                'Entender instruções básicas em estações e aeroportos.'
            ],
            intro: [
                ['Traveler', 'Good morning. Could I have a ticket to Brighton, please?'],
                ['Agent', 'Of course. One way or return?'],
                ['Traveler', 'Return, please. What time is the next train?'],
                ['Agent', 'It leaves at ten twenty from platform four.'],
                ['Traveler', 'Can I choose a window seat?'],
                ['Agent', 'Yes. Here is your ticket.']
            ],
            vocab: [
                ['ticket', 'passagem / bilhete', 'I need a train ticket.'],
                ['platform', 'plataforma', 'The train leaves from platform four.'],
                ['bus stop', 'ponto de ônibus', 'Wait at the bus stop.'],
                ['suitcase', 'mala', 'Her suitcase is very heavy.'],
                ['passport', 'passaporte', 'Show your passport at the desk.'],
                ['departure', 'partida', 'Departure is at ten twenty.'],
                ['arrival', 'chegada', 'Arrival is at noon.'],
                ['seat', 'assento', 'Can I have a window seat?']
            ],
            grammar: {
                title: 'Pedidos com can/could + viagem com by e on',
                summary: 'Can é comum e direto; could deixa o pedido mais gentil. Para o meio de transporte, use by sem artigo ou on quando está dentro dele.',
                rows: [
                    ['pedido comum', 'Can I + verbo...?', 'Can I choose a seat?', 'Posso escolher um assento?'],
                    ['pedido mais gentil', 'Could I + verbo...?', 'Could I have a return ticket?', 'Eu poderia comprar uma passagem de volta?'],
                    ['meio de transporte', 'by + transporte', 'We travel by train.', 'Nós viajamos de trem.'],
                    ['local durante a viagem', 'on + transporte público', 'My bag is on the bus.', 'Minha bolsa está no ônibus.']
                ],
                notes: [
                    'Depois de can ou could, use o verbo base: Could I have...?',
                    'Diga by car, by bus e by plane, sem a ou the.',
                    'One-way é somente ida; return ou round trip é ida e volta.'
                ]
            },
            practice: [
                ['Complete', 'Could I ___ a ticket to Oxford?', 'comprar / ter', 'have'],
                ['Choose', 'We travel ___ train. (on / by / at)', 'de trem', 'We travel by train.'],
                ['Unscramble', 'next / What / bus / time / the / is / ?', 'Que horas é o próximo ônibus?', 'What time is the next bus?'],
                ['Find the error', 'Can I to choose a seat?', 'Posso escolher um assento?', 'Can I choose a seat?'],
                ['Complete', 'The train leaves from ___ five.', 'plataforma', 'platform'],
                ['Natural response', '“One way or return?” — “___”', 'ida e volta', 'Return, please.'],
                ['Choose', 'My suitcase is ___ the bus. (on / by / from)', 'no ônibus', 'My suitcase is on the bus.'],
                ['Find the error', 'We go by the plane.', 'Nós vamos de avião.', 'We go by plane.'],
                ['Schedule reading', 'Departure 10:20 | Arrival 12:00', 'horário de chegada', 'Arrival is at twelve o’clock.'],
                ['Complete', 'Can I have a window ___?', 'assento', 'seat']
            ],
            translations: [
                ['Eu poderia comprar uma passagem para Oxford?', 'Could I have a ticket to Oxford?'],
                ['Que horas é o próximo trem?', 'What time is the next train?'],
                ['O trem sai da plataforma cinco.', 'The train leaves from platform five.'],
                ['Nós viajamos de ônibus.', 'We travel by bus.'],
                ['Posso escolher um assento na janela?', 'Can I choose a window seat?'],
                ['Minha mala está no ônibus.', 'My suitcase is on the bus.']
            ],
            expressions: [
                ['one way or return?', 'somente ida ou ida e volta?', 'Pergunta comum ao comprar uma passagem.', 'One way or return to Bristol?'],
                ['get on', 'embarcar / entrar', 'Use para ônibus, trem, avião e bicicleta.', 'We get on the train at platform two.'],
                ['get off', 'desembarcar / sair', 'Use para sair de ônibus, trem ou avião.', 'Get off at the next stop.'],
                ['be delayed', 'estar atrasado', 'Use para transporte que não sai ou chega no horário.', 'The flight is delayed by thirty minutes.']
            ],
            dialogues: [
                { title: 'Na bilheteria', lines: [['Agent', 'Where are you traveling today?'], ['Traveler', 'To York, please.'], ['Agent', 'One way or return?'], ['Traveler', 'Return. Can I have a window seat?'], ['Agent', 'Yes. The train leaves from platform three.'], ['Traveler', 'Thank you.']] },
                { title: 'Dentro do ônibus', lines: [['Passenger', 'Does this bus stop near the museum?'], ['Driver', 'Yes. Get off at the fourth stop.'], ['Passenger', 'Can you tell me when we are there?'], ['Driver', 'Of course.']] },
                { title: 'Voo atrasado', lines: [['Traveler', 'Why is the flight delayed?'], ['Agent', 'Because of heavy rain.'], ['Traveler', 'What is the new departure time?'], ['Agent', 'Eleven forty.']] },
                { title: 'Mala no trem', lines: [['Nina', 'Where can I put my suitcase?'], ['Omar', 'There is space above your seat.'], ['Nina', 'Can you help me lift it?'], ['Omar', 'Sure.']] }
            ],
            reading: {
                title: 'The last bus home',
                text: 'Maya finishes a concert at ten thirty and walks to the bus stop. The timetable says the last bus leaves at ten forty-five, but the display shows a fifteen-minute delay. Maya checks the bus number with another passenger. When the bus arrives, she asks the driver for a ticket and sits near the front. She gets off six stops later, close to her house.',
                questions: [
                    ['What time does the concert finish?', 'It finishes at ten thirty.'],
                    ['How late is the bus?', 'It is fifteen minutes late.'],
                    ['Who confirms the bus number?', 'Another passenger confirms it.'],
                    ['Where does Maya sit?', 'She sits near the front.']
                ]
            },
            expressionTranslations: [
                ['Somente ida ou ida e volta?', 'One way or return?'],
                ['Nós embarcamos na plataforma dois.', 'We get on the train at platform two.'],
                ['Desça no próximo ponto.', 'Get off at the next stop.'],
                ['O voo está atrasado em trinta minutos.', 'The flight is delayed by thirty minutes.']
            ],
            music: {
                song: 'Leaving on a Jet Plane', artist: 'John Denver', spotifyId: '3D8dwH690MXQRhtIZTSS9c',
                lines: [
                    ['My ___ is ready beside the door.', 'suitcase'],
                    ['The early ___ waits at platform four.', 'train'],
                    ['I keep my passport and my ___ in my hand.', 'ticket'],
                    ['The ___ time changes because of rain.', 'departure'],
                    ['I get ___ and find my window seat.', 'on']
                ]
            },
            homework: {
                instruction: 'Escolha uma situação e prepare um diálogo de 6 a 8 falas para praticar com o professor.',
                themes: ['Comprar uma passagem de trem', 'Pedir ajuda dentro de um ônibus', 'Perguntar sobre um voo atrasado'],
                checklist: ['Use can e could.', 'Inclua horário, plataforma ou ponto.', 'Use get on, get off ou delayed.']
            },
            labs: [
                {
                    title: 'Timetable Challenge',
                    instruction: 'Leia os dados e responda com frases completas.',
                    items: [
                        ['Train 204 | departure 09:15 | platform 6', 'horário e plataforma', 'Train 204 leaves at nine fifteen from platform six.'],
                        ['Bus 18 | delayed 20 min | new time 14:40', 'novo horário', 'Bus 18 is delayed and now leaves at two forty.'],
                        ['Flight 330 | arrival 18:05 | gate 12', 'chegada', 'Flight 330 arrives at six oh five.']
                    ]
                }
            ]
        },

        22: {
            title: lessonTitles[21],
            objectives: [
                'Dizer datas com meses e números ordinais.',
                'Falar sobre feriados e celebrações.',
                'Fazer e responder a um convite simples.'
            ],
            intro: [
                ['Nina', 'Are you free on Saturday the twelfth?'],
                ['Omar', 'I think so. Why?'],
                ['Nina', 'It is my birthday. The party is at my house.'],
                ['Omar', 'That sounds great. What time does it start?'],
                ['Nina', 'At seven in the evening. Would you like to come?'],
                ['Omar', 'Yes, I’d love to.']
            ],
            vocab: [
                ['birthday', 'aniversário', 'My birthday is in May.'],
                ['invitation', 'convite', 'I received an invitation.'],
                ['party', 'festa', 'The party starts at seven.'],
                ['gift', 'presente', 'This gift is for Maya.'],
                ['date', 'data', 'What is the date today?'],
                ['month', 'mês', 'June is my favorite month.'],
                ['first', 'primeiro', 'The event is on the first of July.'],
                ['celebrate', 'comemorar', 'We celebrate together.']
            ],
            grammar: {
                title: 'Datas, preposições e convites',
                summary: 'Use números ordinais nas datas. In acompanha meses e anos; on acompanha uma data ou um dia específico.',
                rows: [
                    ['mês / ano', 'in + mês/ano', 'My birthday is in May.', 'Meu aniversário é em maio.'],
                    ['dia / data', 'on + dia/data', 'The party is on Saturday, May 12th.', 'A festa é no sábado, 12 de maio.'],
                    ['hora', 'at + horário', 'It starts at seven.', 'Começa às sete.'],
                    ['convite', 'Would you like to + verbo?', 'Would you like to come?', 'Você gostaria de vir?']
                ],
                notes: [
                    'Os principais ordinais irregulares são first, second, third, fifth, eighth, ninth e twelfth.',
                    'Para aceitar: I’d love to. Para recusar gentilmente: I’m sorry, I can’t.',
                    'Meses e dias da semana começam com letra maiúscula em inglês.'
                ]
            },
            practice: [
                ['Complete', 'My birthday is ___ September.', 'em', 'in'],
                ['Choose', 'The party is ___ Saturday. (at / on / in)', 'no sábado', 'The party is on Saturday.'],
                ['Unscramble', 'like / Would / come / to / you / ?', 'Você gostaria de vir?', 'Would you like to come?'],
                ['Find the error', 'The event is in June 10th.', 'O evento é em 10 de junho.', 'The event is on June 10th.'],
                ['Complete', 'Three becomes ___ in a date.', 'terceiro', 'third'],
                ['Natural response', '“Would you like to come?” — “___”', 'aceitação', 'Yes, I’d love to.'],
                ['Choose', 'The dinner starts ___ eight. (at / on / in)', 'às oito', 'The dinner starts at eight.'],
                ['Find the error', 'My birthday is on october.', 'Meu aniversário é em outubro.', 'My birthday is in October.'],
                ['Calendar reading', 'Friday, August 23 | dinner 7:30 p.m.', 'data e hora', 'The dinner is on Friday, August 23rd, at seven thirty.'],
                ['Complete', 'We ___ New Year with family.', 'comemorar', 'celebrate']
            ],
            translations: [
                ['Meu aniversário é em maio.', 'My birthday is in May.'],
                ['A festa é no sábado, dia doze.', 'The party is on Saturday the twelfth.'],
                ['O jantar começa às sete.', 'The dinner starts at seven.'],
                ['Você gostaria de vir à minha festa?', 'Would you like to come to my party?'],
                ['Sim, eu adoraria.', 'Yes, I would love to.'],
                ['Nós comemoramos o Ano-Novo com a família.', 'We celebrate New Year with family.']
            ],
            expressions: [
                ['Happy birthday!', 'Feliz aniversário!', 'Cumprimento direto para aniversários.', 'Happy birthday, Maya!'],
                ['Would you like to...?', 'Você gostaria de...?', 'Forma gentil de fazer um convite.', 'Would you like to have dinner with us?'],
                ['come over', 'vir à casa de alguém', 'Phrasal verb informal usado em convites para casa.', 'Would you like to come over on Sunday?'],
                ['have a party', 'dar / fazer uma festa', 'Em inglês, usamos have para organizar uma celebração.', 'We have a party every year.']
            ],
            dialogues: [
                { title: 'Convite de aniversário', lines: [['Maya', 'My birthday dinner is on Friday.'], ['Ravi', 'Nice! What time?'], ['Maya', 'At seven thirty. Would you like to come?'], ['Ravi', 'I’d love to. Where is it?'], ['Maya', 'At the Italian restaurant on Green Street.'], ['Ravi', 'Perfect. See you there.']] },
                { title: 'Recusando com educação', lines: [['Nina', 'Would you like to come over on Sunday?'], ['Omar', 'I’m sorry, I can’t. I work on Sunday.'], ['Nina', 'No problem. Maybe next weekend.'], ['Omar', 'Yes, definitely.']] },
                { title: 'Comprando um presente', lines: [['Customer', 'I need a birthday gift for my sister.'], ['Assistant', 'What does she like?'], ['Customer', 'She loves cooking.'], ['Assistant', 'This cookbook is popular.']] },
                { title: 'Confirmando a data', lines: [['Guest', 'Is the party on June 13th?'], ['Host', 'No, it is on June 30th.'], ['Guest', 'At six o’clock?'], ['Host', 'Yes, exactly.']] }
            ],
            reading: {
                title: 'Two celebrations on one weekend',
                text: 'Maya has a busy weekend in June. Her cousin’s graduation is on Friday the fourteenth at six o’clock. On Saturday, her family celebrates her grandmother’s seventieth birthday. Lunch starts at noon, and everyone brings a dish. Maya cannot stay late on Friday because she has to help decorate her grandmother’s house on Saturday morning.',
                questions: [
                    ['When is the graduation?', 'It is on Friday the fourteenth at six o’clock.'],
                    ['Who has a birthday on Saturday?', 'Maya’s grandmother has a birthday.'],
                    ['What time does the birthday lunch start?', 'It starts at noon.'],
                    ['Why can’t Maya stay late on Friday?', 'Because she has to help decorate on Saturday morning.']
                ]
            },
            expressionTranslations: [
                ['Feliz aniversário, Maya!', 'Happy birthday, Maya!'],
                ['Você gostaria de jantar conosco?', 'Would you like to have dinner with us?'],
                ['Você gostaria de vir aqui em casa no domingo?', 'Would you like to come over on Sunday?'],
                ['Nós damos uma festa todos os anos.', 'We have a party every year.']
            ],
            music: {
                song: 'Celebration', artist: 'Kool & The Gang', spotifyId: '3K7Q9PHUWPTaknlbFPThn2',
                lines: [
                    ['We ___ together when the special day arrives.', 'celebrate'],
                    ['The birthday ___ begins at seven tonight.', 'party'],
                    ['Every ___ brings a smile and a surprise.', 'gift'],
                    ['Would you like to come ___ and join us?', 'over'],
                    ['The ___ is Saturday, the twenty-first.', 'date']
                ]
            },
            homework: {
                instruction: 'Escolha um evento e escreva um convite completo. Prepare também uma resposta positiva e uma negativa gentil.',
                themes: ['Uma festa de aniversário', 'Um jantar em casa', 'Uma celebração de fim de curso'],
                checklist: ['Inclua data, horário e lugar.', 'Use Would you like to...?', 'Use come over ou have a party.']
            },
            labs: [
                {
                    title: 'Calendar Planner',
                    instruction: 'Transforme as informações do calendário em frases completas.',
                    items: [
                        ['May 2 | birthday lunch | 12:30', 'data e hora', 'The birthday lunch is on May second at twelve thirty.'],
                        ['October 18 | party | 8:00 p.m.', 'convite', 'Would you like to come to a party on October eighteenth at eight?'],
                        ['Sunday | family dinner | home', 'local', 'The family dinner is at home on Sunday.']
                    ]
                }
            ]
        },

        23: {
            title: lessonTitles[22],
            objectives: [
                'Descrever ações que estão acontecendo agora.',
                'Formar afirmativas, negativas e perguntas no Present Continuous.',
                'Usar vocabulário de esportes em situações reais.'
            ],
            intro: [
                ['Maya', 'Where is everyone? The game is starting.'],
                ['Ravi', 'Nina is buying water, and Omar is finding our seats.'],
                ['Maya', 'Are the teams warming up?'],
                ['Ravi', 'Yes. The players are running across the field.'],
                ['Maya', 'Is Ben playing today?'],
                ['Ravi', 'No, he isn’t. He is watching from the bench.']
            ],
            vocab: [
                ['run', 'correr', 'The players are running.'],
                ['swim', 'nadar', 'She is swimming now.'],
                ['kick', 'chutar', 'He is kicking the ball.'],
                ['throw', 'arremessar', 'Maya is throwing the ball.'],
                ['score', 'marcar ponto / gol', 'The team is scoring again.'],
                ['watch', 'assistir / observar', 'We are watching the game.'],
                ['practice', 'praticar / treinar', 'They are practicing today.'],
                ['wait', 'esperar', 'The coach is waiting outside.']
            ],
            grammar: {
                title: 'Present Continuous: be + verbo-ing',
                summary: 'Use o Present Continuous para uma ação em progresso agora ou ao redor do momento da fala.',
                rows: [
                    ['afirmativa', 'sujeito + am/is/are + verbo-ing', 'She is swimming now.', 'Ela está nadando agora.'],
                    ['negativa', 'sujeito + am/is/are not + verbo-ing', 'He is not playing today.', 'Ele não está jogando hoje.'],
                    ['pergunta', 'Am/Is/Are + sujeito + verbo-ing?', 'Are they warming up?', 'Eles estão aquecendo?'],
                    ['resposta curta', 'Yes/No + sujeito + be', 'Yes, they are. / No, he isn’t.', 'Sim. / Não.']
                ],
                notes: [
                    'Retire o e final antes de ing: make → making, write → writing.',
                    'Em verbos curtos, pode haver duplicação: run → running, swim → swimming.',
                    'Use Present Simple para rotina e Present Continuous para agora: He plays on Fridays. He is playing now.'
                ]
            },
            practice: [
                ['Complete', 'The players are ___ across the field.', 'correr', 'running'],
                ['Choose', 'She is (swim / swimming / swims) now.', 'nadando', 'She is swimming now.'],
                ['Unscramble', 'watching / We / game / the / are', 'Nós estamos assistindo ao jogo.', 'We are watching the game.'],
                ['Find the error', 'He playing soccer now.', 'Ele está jogando futebol agora.', 'He is playing soccer now.'],
                ['Complete', '___ they warming up?', 'estão', 'Are'],
                ['Natural response', '“Is Ben playing?” — “___”', 'resposta negativa', 'No, he isn’t.'],
                ['Spelling', 'write + ing', 'retire o e', 'writing'],
                ['Spelling', 'run + ing', 'duplique a consoante', 'running'],
                ['Find the error', 'They are practice today.', 'Eles estão treinando hoje.', 'They are practicing today.'],
                ['Contrast', 'She plays tennis on Saturday. / She ___ tennis now.', 'está jogando', 'She is playing tennis now.']
            ],
            translations: [
                ['Os jogadores estão correndo.', 'The players are running.'],
                ['Ela está nadando agora.', 'She is swimming now.'],
                ['Nós estamos assistindo ao jogo.', 'We are watching the game.'],
                ['Ele não está jogando hoje.', 'He is not playing today.'],
                ['Eles estão se aquecendo?', 'Are they warming up?'],
                ['O treinador está esperando lá fora.', 'The coach is waiting outside.']
            ],
            expressions: [
                ['right now', 'agora mesmo', 'Reforça que a ação acontece neste momento.', 'The team is practicing right now.'],
                ['warm up', 'aquecer-se', 'Phrasal verb usado antes de exercício ou esporte.', 'The runners are warming up.'],
                ['cheer for', 'torcer por', 'Use para dizer qual pessoa ou equipe você apoia.', 'We are cheering for the home team.'],
                ['take part', 'participar', 'Take part in significa participar de uma atividade ou evento.', 'Maya is taking part in the race.']
            ],
            dialogues: [
                { title: 'Na arquibancada', lines: [['Maya', 'Who are you cheering for?'], ['Ravi', 'The team in blue.'], ['Maya', 'They are playing well.'], ['Ravi', 'Yes, and number ten is running very fast.'], ['Maya', 'Is he scoring now?'], ['Ravi', 'Yes! It’s a goal.']] },
                { title: 'Antes da aula de natação', lines: [['Instructor', 'Is everyone warming up?'], ['Student', 'Nina is, but Omar is still changing.'], ['Instructor', 'We are starting in five minutes.'], ['Student', 'Okay. I can call him.']] },
                { title: 'No parque', lines: [['Friend', 'What are those people doing?'], ['You', 'They are taking part in a race.'], ['Friend', 'Is Maya running too?'], ['You', 'Yes, she is near the front.']] },
                { title: 'Ligação durante o jogo', lines: [['Nina', 'Can you talk now?'], ['Omar', 'Not really. I am watching the final.'], ['Nina', 'Who is winning?'], ['Omar', 'The home team is winning by one point.']] }
            ],
            reading: {
                title: 'A busy sports center',
                text: 'It is six o’clock at the community sports center. In the pool, eight students are practicing with their instructor. On the main court, two teams are warming up for a basketball game. Near the entrance, Maya is waiting for a running class, but the coach is helping a new student. Parents are watching from the café, and some children are playing outside.',
                questions: [
                    ['What time is it at the sports center?', 'It is six o’clock.'],
                    ['How many students are practicing in the pool?', 'Eight students are practicing.'],
                    ['Why is Maya waiting?', 'Because the coach is helping a new student.'],
                    ['Where are the parents?', 'They are watching from the café.']
                ]
            },
            expressionTranslations: [
                ['O time está treinando agora mesmo.', 'The team is practicing right now.'],
                ['Os corredores estão se aquecendo.', 'The runners are warming up.'],
                ['Nós estamos torcendo pelo time da casa.', 'We are cheering for the home team.'],
                ['Maya está participando da corrida.', 'Maya is taking part in the race.']
            ],
            music: {
                song: 'We Are the Champions', artist: 'Queen', spotifyId: '1lCRw5FEZ1gPDNPzy1K4zW',
                lines: [
                    ['The players are warming ___ beside the field.', 'up'],
                    ['Our team is ___ fast and moving the ball.', 'running'],
                    ['Everyone is cheering ___ the players in blue.', 'for'],
                    ['Maya is taking ___ in the final race.', 'part'],
                    ['Right ___, the crowd is singing loudly.', 'now']
                ]
            },
            homework: {
                instruction: 'Escolha uma cena e escreva 7 frases sobre o que as pessoas estão fazendo naquele momento.',
                themes: ['Uma partida esportiva', 'Um parque movimentado', 'Uma academia no fim da tarde'],
                checklist: ['Use am/is/are + ing.', 'Inclua uma negativa e uma pergunta.', 'Use right now, warm up, cheer for ou take part.']
            },
            labs: [
                {
                    title: 'Live Commentary',
                    instruction: 'Transforme cada conjunto de notas em uma narração do momento.',
                    items: [
                        ['player 8 / run / ball', 'narração agora', 'Player eight is running with the ball.'],
                        ['fans / cheer / home team', 'torcida agora', 'The fans are cheering for the home team.'],
                        ['goalkeeper / not watch / ball', 'ação negativa', 'The goalkeeper is not watching the ball.']
                    ]
                }
            ]
        },

        25: {
            title: lessonTitles[24],
            objectives: [
                'Nomear animais e elementos da natureza.',
                'Descrever fatos simples no Present Simple.',
                'Falar sobre habilidades de animais com can e can’t.'
            ],
            intro: [
                ['Maya', 'Look at that bird near the river.'],
                ['Ravi', 'It is beautiful. Can it swim?'],
                ['Maya', 'Yes, it can. It swims and catches fish.'],
                ['Ravi', 'There are two more birds in the tree.'],
                ['Maya', 'Please stay away from the nest.'],
                ['Ravi', 'Of course. We can watch from here.']
            ],
            vocab: [
                ['dog', 'cachorro', 'The dog runs in the park.'],
                ['cat', 'gato', 'Cats sleep many hours a day.'],
                ['bird', 'pássaro', 'This bird can swim.'],
                ['tree', 'árvore', 'There are tall trees here.'],
                ['river', 'rio', 'The river crosses the town.'],
                ['forest', 'floresta', 'Many animals live in the forest.'],
                ['mountain', 'montanha', 'The mountain is very high.'],
                ['beach', 'praia', 'We walk on the beach.']
            ],
            grammar: {
                title: 'Fatos no Present Simple + habilidades com can',
                summary: 'Use o Present Simple para características e hábitos dos animais. Use can/can’t para habilidades e possibilidades.',
                rows: [
                    ['fato singular', 'animal + verbo-s', 'A bird builds a nest.', 'Um pássaro constrói um ninho.'],
                    ['fato plural', 'animais + verbo base', 'Birds build nests.', 'Pássaros constroem ninhos.'],
                    ['habilidade', 'can + verbo base', 'Ducks can swim.', 'Patos sabem nadar.'],
                    ['falta de habilidade', 'can’t + verbo base', 'Cats can’t fly.', 'Gatos não sabem voar.']
                ],
                notes: [
                    'Ao falar de uma espécie em geral, o plural é muito comum: Dogs need exercise.',
                    'Can permanece igual para todos os sujeitos e não recebe s.',
                    'Alguns plurais são irregulares: one fish/two fish, one mouse/two mice.'
                ]
            },
            practice: [
                ['Complete', 'A dog ___ exercise every day.', 'precisar', 'needs'],
                ['Choose', 'Birds (build / builds / building) nests.', 'constroem', 'Birds build nests.'],
                ['Unscramble', 'can / Ducks / swim', 'Patos sabem nadar.', 'Ducks can swim.'],
                ['Find the error', 'Birds can flies.', 'Pássaros sabem voar.', 'Birds can fly.'],
                ['Complete', 'Many animals live in the ___.', 'floresta', 'forest'],
                ['True or false', 'A mountain is a body of water.', 'falso', 'False. A mountain is high land.'],
                ['Choose', 'One fish, two ___. (fish / fishes / fishs)', 'peixes', 'One fish, two fish.'],
                ['Find the error', 'A bird build a nest.', 'Um pássaro constrói um ninho.', 'A bird builds a nest.'],
                ['Complete', 'Cats ___ fly.', 'não podem', 'can’t'],
                ['Classify', 'river / forest / dog / mountain', 'três lugares naturais e um animal', 'Dog is the animal; river, forest, and mountain are natural places.']
            ],
            translations: [
                ['Cachorros precisam de exercício.', 'Dogs need exercise.'],
                ['Este pássaro sabe nadar.', 'This bird can swim.'],
                ['Gatos não sabem voar.', 'Cats cannot fly.'],
                ['Muitos animais vivem na floresta.', 'Many animals live in the forest.'],
                ['Há árvores altas perto do rio.', 'There are tall trees near the river.'],
                ['Nós caminhamos na praia.', 'We walk on the beach.']
            ],
            expressions: [
                ['look at', 'olhar para', 'Use at depois de look quando direciona o olhar.', 'Look at the birds in the tree.'],
                ['stay away from', 'manter distância de', 'Use para avisos e segurança.', 'Stay away from wild animals.'],
                ['pick up', 'pegar / recolher', 'Pode significar levantar algo do chão.', 'Please pick up your trash.'],
                ['take care of', 'cuidar de', 'Use para responsabilidade com animais e lugares.', 'We take care of the park.']
            ],
            dialogues: [
                { title: 'Trilha no parque', lines: [['Guide', 'Please stay on the path.'], ['Visitor', 'Can we walk near the river?'], ['Guide', 'Yes, but stay away from the edge.'], ['Visitor', 'Are there animals in this forest?'], ['Guide', 'Yes. You can often see birds and small monkeys.'], ['Visitor', 'Great.']] },
                { title: 'Passeando com o cachorro', lines: [['Nina', 'Your dog has a lot of energy.'], ['Omar', 'Yes, he needs two walks every day.'], ['Nina', 'Can he swim?'], ['Omar', 'Yes, he loves the water.']] },
                { title: 'Na praia', lines: [['Parent', 'Please pick up that bottle.'], ['Child', 'Is it ours?'], ['Parent', 'No, but we take care of the beach.'], ['Child', 'Okay.']] },
                { title: 'Observando pássaros', lines: [['Maya', 'Look at the bird on that branch.'], ['Ravi', 'It has a red head.'], ['Maya', 'Can you take a photo?'], ['Ravi', 'Yes. I can take it from here.']] }
            ],
            reading: {
                title: 'Morning volunteers by the river',
                text: 'On the first Sunday of every month, volunteers clean a park beside the river. They pick up bottles and paper, check the walking paths, and water young trees. Birds build nests near the river, so volunteers stay away from those areas. Families can join the work, and children help separate the trash. By noon, the park is clean and safe for people and animals.',
                questions: [
                    ['When do the volunteers clean the park?', 'They clean it on the first Sunday of every month.'],
                    ['Which things do they pick up?', 'They pick up bottles and paper.'],
                    ['Why do they stay away from some areas?', 'Because birds build nests there.'],
                    ['How is the park by noon?', 'It is clean and safe.']
                ]
            },
            expressionTranslations: [
                ['Olhe para os pássaros na árvore.', 'Look at the birds in the tree.'],
                ['Mantenha distância dos animais selvagens.', 'Stay away from wild animals.'],
                ['Por favor, recolha o seu lixo.', 'Please pick up your trash.'],
                ['Nós cuidamos do parque.', 'We take care of the park.']
            ],
            music: {
                song: 'What a Wonderful World', artist: 'Louis Armstrong', spotifyId: '2wMADzg56fB8PHG4B8NkTn',
                lines: [
                    ['Tall green ___ move beside the river.', 'trees'],
                    ['A small ___ sings above the path.', 'bird'],
                    ['The quiet ___ reflects the morning sky.', 'river'],
                    ['We take ___ of every place we share.', 'care'],
                    ['Pick ___ the paper and leave the beach clean.', 'up']
                ]
            },
            homework: {
                instruction: 'Escolha um ambiente e escreva 7 frases com animais, fatos e cuidados necessários.',
                themes: ['Um parque perto de um rio', 'Uma praia limpa e segura', 'Animais que vivem em uma floresta'],
                checklist: ['Use Present Simple para três fatos.', 'Inclua can ou can’t.', 'Use look at, stay away, pick up ou take care of.']
            },
            labs: [
                {
                    title: 'Nature Fact Check',
                    instruction: 'Decida se a frase é verdadeira e corrija as falsas em inglês.',
                    items: [
                        ['Birds can build nests.', 'verdadeiro ou falso', 'True. Birds can build nests.'],
                        ['Monkeys can live under the ocean.', 'corrija', 'False. Monkeys can live in forests.'],
                        ['Fish can live in water.', 'verdadeiro ou falso', 'True. Fish can live in water.']
                    ]
                }
            ]
        },

        26: {
            title: lessonTitles[25],
            objectives: [
                'Nomear dispositivos e partes básicas.',
                'Dar instruções curtas para resolver um problema.',
                'Usar it e them para evitar repetições.'
            ],
            intro: [
                ['Nina', 'My phone is not charging. Can you help me?'],
                ['Omar', 'Sure. Is the charger plugged in?'],
                ['Nina', 'Yes, but the screen is still black.'],
                ['Omar', 'Unplug it, wait ten seconds, and plug it in again.'],
                ['Nina', 'Now it is turning on.'],
                ['Omar', 'Great. Check the battery before you leave.']
            ],
            vocab: [
                ['phone', 'telefone / celular', 'My phone is charging.'],
                ['computer', 'computador', 'The computer is very slow.'],
                ['screen', 'tela', 'The screen is black.'],
                ['battery', 'bateria', 'The battery is low.'],
                ['password', 'senha', 'I do not remember my password.'],
                ['message', 'mensagem', 'Please send me a message.'],
                ['app', 'aplicativo', 'Open the calendar app.'],
                ['charger', 'carregador', 'Where is my charger?']
            ],
            grammar: {
                title: 'Instruções + pronomes objeto',
                summary: 'Use o imperativo para instruções. Use it para um objeto ou ideia e them para mais de um, evitando repetir o nome.',
                rows: [
                    ['instrução', 'verbo base + complemento', 'Open the app. Check the battery.', 'Abra o aplicativo. Verifique a bateria.'],
                    ['instrução negativa', 'don’t + verbo', 'Don’t share your password.', 'Não compartilhe sua senha.'],
                    ['objeto singular', 'verbo + it', 'Turn the phone on. Charge it.', 'Ligue o celular. Carregue-o.'],
                    ['objeto plural', 'verbo + them', 'Save the photos. Back them up.', 'Salve as fotos. Faça cópias delas.']
                ],
                notes: [
                    'Phrasal verbs separáveis aceitam o objeto no meio: turn it on, plug it in.',
                    'Com um substantivo, turn on the phone e turn the phone on são possíveis.',
                    'Nunca diga turn on it; com pronome, use turn it on.'
                ]
            },
            practice: [
                ['Complete', 'Turn the computer ___.', 'ligar', 'on'],
                ['Choose', 'The battery is low. Charge (it / them / its).', 'carregue-a', 'Charge it.'],
                ['Unscramble', 'password / share / your / Don’t', 'Não compartilhe sua senha.', 'Don’t share your password.'],
                ['Find the error', 'Turn on it.', 'Ligue-o.', 'Turn it on.'],
                ['Complete', 'Plug the charger ___.', 'conectar', 'in'],
                ['Natural response', '“Can you send me the file?” — “___”', 'resposta positiva', 'Yes, I can send it now.'],
                ['Choose', 'Save the photos and back (it / them / they) up.', 'faça cópia delas', 'Save the photos and back them up.'],
                ['Find the error', 'Don’t to open that message.', 'Não abra aquela mensagem.', 'Don’t open that message.'],
                ['Sequence', 'restart: turn off / wait / turn on', 'ordem correta', 'Turn it off, wait ten seconds, and turn it on again.'],
                ['Complete', 'I do not remember my ___, so I cannot log in.', 'senha', 'password']
            ],
            translations: [
                ['Ligue o computador.', 'Turn the computer on.'],
                ['Não compartilhe sua senha.', 'Do not share your password.'],
                ['A bateria está fraca.', 'The battery is low.'],
                ['Conecte o carregador.', 'Plug the charger in.'],
                ['Envie a mensagem para mim.', 'Send the message to me.'],
                ['Salve as fotos e faça uma cópia delas.', 'Save the photos and back them up.']
            ],
            expressions: [
                ['turn on / turn off', 'ligar / desligar', 'Use com aparelhos, luzes e telas.', 'Turn the computer off before you leave.'],
                ['log in', 'entrar em uma conta', 'Normalmente usamos log in to + serviço.', 'Log in to the app with your email.'],
                ['plug in', 'conectar à tomada', 'O contrário é unplug.', 'Plug in the charger near the desk.'],
                ['back up', 'fazer cópia de segurança', 'Use com arquivos, fotos e dados.', 'Back up your photos every month.']
            ],
            dialogues: [
                { title: 'Celular sem bateria', lines: [['Nina', 'Do you have a charger?'], ['Omar', 'Yes. Is your battery low?'], ['Nina', 'It is at two percent.'], ['Omar', 'Plug it in near the desk.'], ['Nina', 'Thanks. Can I leave it there?'], ['Omar', 'Of course.']] },
                { title: 'Senha esquecida', lines: [['User', 'I cannot log in to my account.'], ['Support', 'Do you remember your password?'], ['User', 'No, I don’t.'], ['Support', 'Click “Reset password” and check your email.']] },
                { title: 'Computador lento', lines: [['Maya', 'The computer is very slow.'], ['Ravi', 'Turn it off and wait a moment.'], ['Maya', 'Then turn it on again?'], ['Ravi', 'Exactly.']] },
                { title: 'Protegendo fotografias', lines: [['Friend', 'Are all your photos on your phone?'], ['You', 'Yes, and I don’t have a copy.'], ['Friend', 'You should back them up.'], ['You', 'Good idea. I can do that tonight.']] }
            ],
            reading: {
                title: 'A simple fix before class',
                text: 'Five minutes before an online class, Maya’s computer screen freezes. She does not close the lesson page immediately. First, she saves her notes on her phone. Then she turns the computer off, waits ten seconds, and turns it on again. The computer restarts normally, but Maya cannot log in because she types the wrong password. She checks it carefully and joins the class on time.',
                questions: [
                    ['When does Maya’s screen freeze?', 'It freezes five minutes before class.'],
                    ['Where does she save her notes?', 'She saves them on her phone.'],
                    ['How long does she wait before restarting?', 'She waits ten seconds.'],
                    ['Why can’t Maya log in at first?', 'Because she types the wrong password.']
                ]
            },
            expressionTranslations: [
                ['Desligue o computador antes de sair.', 'Turn the computer off before you leave.'],
                ['Entre no aplicativo com seu e-mail.', 'Log in to the app with your email.'],
                ['Conecte o carregador perto da mesa.', 'Plug in the charger near the desk.'],
                ['Faça uma cópia das suas fotos todo mês.', 'Back up your photos every month.']
            ],
            music: {
                song: 'Call Me Maybe', artist: 'Carly Rae Jepsen', spotifyId: '6HkNDcyWdnFXCBkDV5WXNO',
                lines: [
                    ['Send me a ___ when your class is done.', 'message'],
                    ['My phone needs a ___ before I leave.', 'charger'],
                    ['I log ___ and check the calendar app.', 'in'],
                    ['Turn the bright ___ off before you sleep.', 'screen'],
                    ['Back ___ your photos so they stay safe.', 'up']
                ]
            },
            homework: {
                instruction: 'Escolha um problema e escreva um guia de 6 etapas para resolvê-lo. O professor seguirá suas instruções na próxima aula.',
                themes: ['Celular que não carrega', 'Senha esquecida em um aplicativo', 'Computador lento antes de uma aula'],
                checklist: ['Use verbos no imperativo.', 'Use it ou them em duas frases.', 'Inclua turn on/off, log in, plug in ou back up.']
            },
            labs: [
                {
                    title: 'Tech Support Flow',
                    instruction: 'Organize as ações e dê a instrução completa.',
                    items: [
                        ['phone frozen', 'turn off / wait / turn on', 'Turn the phone off, wait ten seconds, and turn it on again.'],
                        ['battery low', 'find charger / plug in / check screen', 'Find the charger, plug it in, and check the screen.'],
                        ['new photos', 'select photos / back up / confirm', 'Select the photos, back them up, and confirm the copy.']
                    ]
                }
            ]
        },

        27: {
            title: lessonTitles[26],
            objectives: [
                'Dizer país, cidade, nacionalidade e idioma.',
                'Perguntar de onde alguém é e quais idiomas fala.',
                'Usar letras maiúsculas corretamente em nomes próprios.'
            ],
            intro: [
                ['Host', 'Welcome to the international lunch. Where are you from?'],
                ['Guest', 'I am from Brazil, but I live in Portugal now.'],
                ['Host', 'What languages do you speak?'],
                ['Guest', 'I speak Portuguese and some English.'],
                ['Host', 'Is this your first visit to London?'],
                ['Guest', 'Yes, it is. I am happy to be here.']
            ],
            vocab: [
                ['country', 'país', 'Brazil is a large country.'],
                ['city', 'cidade', 'Lisbon is a beautiful city.'],
                ['nationality', 'nacionalidade', 'What is your nationality?'],
                ['language', 'idioma', 'English is an international language.'],
                ['capital', 'capital', 'Brasília is the capital of Brazil.'],
                ['flag', 'bandeira', 'The flag has three colors.'],
                ['abroad', 'no exterior', 'Omar lives abroad.'],
                ['speak', 'falar', 'She speaks Spanish.']
            ],
            grammar: {
                title: 'País, nacionalidade e idioma',
                summary: 'Use be from com o país ou cidade de origem, be + nacionalidade e speak + idioma. Esses nomes começam com letra maiúscula.',
                rows: [
                    ['origem', 'be from + lugar', 'I am from Brazil.', 'Eu sou do Brasil.'],
                    ['nacionalidade', 'be + nacionalidade', 'She is Brazilian.', 'Ela é brasileira.'],
                    ['idioma', 'speak + idioma', 'They speak Portuguese.', 'Eles falam português.'],
                    ['pergunta', 'Where are you from? / What language...?', 'What language does he speak?', 'Que idioma ele fala?']
                ],
                notes: [
                    'Não use from com nacionalidade: I am Brazilian, e não I am from Brazilian.',
                    'Países, nacionalidades e idiomas recebem maiúscula: Brazil, Brazilian, Portuguese.',
                    'Com he/she, speak recebe s: She speaks Japanese.'
                ]
            },
            practice: [
                ['Complete', 'I am ___ Brazil.', 'do', 'from'],
                ['Choose', 'She is from Japan. She is (Japan / Japanese / Japanish).', 'japonesa', 'She is Japanese.'],
                ['Unscramble', 'languages / do / What / speak / you / ?', 'Que idiomas você fala?', 'What languages do you speak?'],
                ['Find the error', 'He is from Italian.', 'Ele é italiano.', 'He is Italian.'],
                ['Complete', 'Maya ___ Portuguese and English.', 'fala', 'speaks'],
                ['Capitalization', 'brazil / brazilian / portuguese', 'use maiúsculas', 'Brazil / Brazilian / Portuguese'],
                ['Choose', 'Brasília is the ___ of Brazil. (country / capital / nationality)', 'capital', 'Brasília is the capital of Brazil.'],
                ['Find the error', 'They speaks Spanish.', 'Eles falam espanhol.', 'They speak Spanish.'],
                ['Natural response', '“Where are you from?” — “___”', 'Brasil', 'I am from Brazil.'],
                ['Complete', 'Is this your first ___ to London?', 'visita', 'visit']
            ],
            translations: [
                ['Eu sou do Brasil.', 'I am from Brazil.'],
                ['Ela é japonesa.', 'She is Japanese.'],
                ['Nós falamos português e inglês.', 'We speak Portuguese and English.'],
                ['Que idiomas você fala?', 'What languages do you speak?'],
                ['Brasília é a capital do Brasil.', 'Brasília is the capital of Brazil.'],
                ['Esta é a minha primeira visita a Londres.', 'This is my first visit to London.']
            ],
            expressions: [
                ['Where are you from?', 'De onde você é?', 'Pergunta sobre cidade ou país de origem.', 'Where are you from, Maya?'],
                ['come from', 'vir de / ser originário de', 'Forma verbal para indicar origem.', 'My family comes from Italy.'],
                ['live abroad', 'morar no exterior', 'Abroad significa em outro país.', 'Nina lives abroad for work.'],
                ['travel to', 'viajar para', 'Use to antes do destino.', 'We want to travel to Argentina.']
            ],
            dialogues: [
                { title: 'Evento internacional', lines: [['Host', 'Where are you from?'], ['Guest', 'I am from South Korea.'], ['Host', 'Do you live there now?'], ['Guest', 'No, I live abroad. I work in Toronto.'], ['Host', 'What languages do you speak?'], ['Guest', 'Korean and English.']] },
                { title: 'Colega novo', lines: [['Maya', 'Is Ravi Indian?'], ['Nina', 'Yes. He comes from Mumbai.'], ['Maya', 'Does he speak Hindi?'], ['Nina', 'Yes, and English too.']] },
                { title: 'Planejando uma viagem', lines: [['Omar', 'I want to travel to Argentina.'], ['Ben', 'Do you speak Spanish?'], ['Omar', 'Only a little.'], ['Ben', 'You can practice before the trip.']] },
                { title: 'Primeira visita', lines: [['Local', 'Is this your first visit to Lisbon?'], ['Traveler', 'Yes. I am from Canada.'], ['Local', 'Welcome to Portugal.'], ['Traveler', 'Thank you.']] }
            ],
            reading: {
                title: 'Three languages at one table',
                text: 'At a language exchange in Dublin, Maya sits with Kenji and Lucía. Maya is Brazilian and speaks Portuguese and English. Kenji comes from Japan and is learning Spanish. Lucía is Mexican and speaks Spanish and English. They use English for most of the conversation, but each person teaches the others one simple phrase from their first language. By the end, everyone has three new expressions.',
                questions: [
                    ['Where is the language exchange?', 'It is in Dublin.'],
                    ['Which languages does Maya speak?', 'She speaks Portuguese and English.'],
                    ['Where does Kenji come from?', 'He comes from Japan.'],
                    ['What does each person teach the others?', 'Each person teaches one phrase from their first language.']
                ]
            },
            expressionTranslations: [
                ['De onde você é?', 'Where are you from?'],
                ['Minha família vem da Itália.', 'My family comes from Italy.'],
                ['Nina mora no exterior por causa do trabalho.', 'Nina lives abroad for work.'],
                ['Nós queremos viajar para a Argentina.', 'We want to travel to Argentina.']
            ],
            music: {
                song: 'Englishman in New York', artist: 'Sting', spotifyId: '4KFM3A5QF2IMcc6nHsu3Wp',
                lines: [
                    ['I come ___ a country across the sea.', 'from'],
                    ['I live ___, but I remember my first home.', 'abroad'],
                    ['Every new ___ has a sound and a story.', 'language'],
                    ['We ___ to another city and meet new friends.', 'travel'],
                    ['At one table, everyone can ___ together.', 'speak']
                ]
            },
            homework: {
                instruction: 'Escolha um perfil e escreva 7 frases com origem, cidade, nacionalidade, idiomas e um destino de viagem.',
                themes: ['Seu próprio perfil internacional', 'Uma pessoa que mora no exterior', 'Um visitante em um evento internacional'],
                checklist: ['Use be from, uma nacionalidade e speak.', 'Confira as letras maiúsculas.', 'Inclua come from, live abroad ou travel to.']
            },
            labs: [
                {
                    title: 'Country Profile Cards',
                    instruction: 'Transforme cada cartão em três frases completas.',
                    items: [
                        ['Japan | Japanese | Japanese | Tokyo', 'origem, nacionalidade e capital', 'She is from Japan. She is Japanese and speaks Japanese. Tokyo is the capital.'],
                        ['Mexico | Mexican | Spanish | Mexico City', 'origem, nacionalidade e idioma', 'He is from Mexico. He is Mexican and speaks Spanish.'],
                        ['Canada | Canadian | English and French | Ottawa', 'idiomas e capital', 'Canadians speak English and French. Ottawa is the capital of Canada.']
                    ]
                }
            ]
        },

        29: {
            title: lessonTitles[28],
            objectives: [
                'Falar sobre eventos concluídos no passado.',
                'Usar was/were, verbos regulares e irregulares frequentes.',
                'Formar perguntas e negativas básicas com did.'
            ],
            intro: [
                ['Maya', 'Did you visit your grandparents last weekend?'],
                ['Ravi', 'Yes, I did. I went there on Saturday morning.'],
                ['Maya', 'Were they at home?'],
                ['Ravi', 'Yes. We cooked lunch and looked at old photos.'],
                ['Maya', 'Did you stay until Sunday?'],
                ['Ravi', 'No, I didn’t. I came home on Saturday night.']
            ],
            vocab: [
                ['yesterday', 'ontem', 'I worked yesterday.'],
                ['last week', 'semana passada', 'We traveled last week.'],
                ['was born', 'nasceu', 'Maya was born in Recife.'],
                ['lived', 'morou / viveu', 'He lived there for five years.'],
                ['studied', 'estudou', 'She studied English at school.'],
                ['worked', 'trabalhou', 'They worked together.'],
                ['moved', 'mudou-se', 'My family moved in 2018.'],
                ['went', 'foi', 'We went to the beach.']
            ],
            grammar: {
                title: 'Past Simple: be, verbos e did',
                summary: 'Use o Past Simple para fatos e ações concluídas. O momento costuma aparecer com yesterday, last..., ago ou uma data terminada.',
                rows: [
                    ['verbo be', 'was / were', 'I was at home. / They were tired.', 'Eu estava em casa. / Eles estavam cansados.'],
                    ['afirmativa', 'sujeito + verbo no passado', 'She worked. / We went home.', 'Ela trabalhou. / Nós fomos para casa.'],
                    ['negativa', 'didn’t + verbo base', 'He didn’t work yesterday.', 'Ele não trabalhou ontem.'],
                    ['pergunta', 'Did + sujeito + verbo base?', 'Did you visit your aunt?', 'Você visitou sua tia?']
                ],
                notes: [
                    'Did já marca o passado; depois dele, use go, work e visit, não went, worked ou visited.',
                    'Was acompanha I/he/she/it; were acompanha you/we/they.',
                    'Verbos regulares recebem ed; alguns comuns são irregulares: go/went, have/had, come/came, see/saw.'
                ]
            },
            practice: [
                ['Complete', 'I ___ at home yesterday.', 'estava', 'was'],
                ['Choose', 'They (was / were / are) tired after the trip.', 'estavam', 'They were tired after the trip.'],
                ['Complete', 'Maya ___ English last night.', 'estudar', 'studied'],
                ['Unscramble', 'went / We / beach / the / to', 'Nós fomos à praia.', 'We went to the beach.'],
                ['Find the error', 'Did you went to work?', 'Você foi trabalhar?', 'Did you go to work?'],
                ['Complete', 'He did not ___ yesterday.', 'trabalhar', 'work'],
                ['Choose', 'Go becomes (goed / went / goes) in the past.', 'foi', 'Go becomes went.'],
                ['Timeline', '2019: live in Recife | 2020: move to Natal', 'duas ações no passado', 'She lived in Recife in 2019 and moved to Natal in 2020.'],
                ['Find the error', 'We was at school last Monday.', 'Nós estávamos na escola.', 'We were at school last Monday.'],
                ['Natural response', '“Did you visit your aunt?” — “___”', 'resposta positiva', 'Yes, I did.']
            ],
            translations: [
                ['Eu estava em casa ontem.', 'I was at home yesterday.'],
                ['Eles estavam cansados depois da viagem.', 'They were tired after the trip.'],
                ['Maya estudou inglês ontem à noite.', 'Maya studied English last night.'],
                ['Nós fomos à praia no sábado.', 'We went to the beach on Saturday.'],
                ['Ele não trabalhou ontem.', 'He did not work yesterday.'],
                ['Você visitou sua tia?', 'Did you visit your aunt?']
            ],
            expressions: [
                ['last night', 'ontem à noite', 'Use sem preposição para o período da noite anterior.', 'I watched a movie last night.'],
                ['a long time ago', 'há muito tempo', 'Ago aparece depois da quantidade de tempo.', 'My grandparents moved here a long time ago.'],
                ['grow up', 'crescer', 'Use para falar do lugar ou período da infância.', 'I grew up in a small town.'],
                ['move to', 'mudar-se para', 'Use to antes do novo lugar.', 'My family moved to Salvador in 2015.']
            ],
            dialogues: [
                { title: 'Conversando na segunda-feira', lines: [['Maya', 'What did you do last weekend?'], ['Ravi', 'I visited my grandparents.'], ['Maya', 'Did you go by car?'], ['Ravi', 'No, I went by bus.'], ['Maya', 'Was the trip long?'], ['Ravi', 'No, it was only one hour.']] },
                { title: 'Fotografia antiga', lines: [['Nina', 'Who is this child in the photo?'], ['Omar', 'That was me at age six.'], ['Nina', 'Where did you live then?'], ['Omar', 'I lived in a small town.']] },
                { title: 'Dia de trabalho', lines: [['Manager', 'Did you send the report yesterday?'], ['Employee', 'Yes, I sent it before lunch.'], ['Manager', 'Did the client reply?'], ['Employee', 'No, she didn’t.']] },
                { title: 'Mudança de cidade', lines: [['Friend', 'When did your family move here?'], ['You', 'We moved here in 2021.'], ['Friend', 'Did you like your old city?'], ['You', 'Yes, but I like this city too.']] }
            ],
            reading: {
                title: 'A box of old photographs',
                text: 'Last Sunday, Nina helped her mother clean a closet and found a box of old photographs. One picture showed her mother at age eighteen in a small coastal town. She studied there, worked in a bakery, and rode her bicycle to the beach after work. In 1998, she moved to São Paulo for university. Nina asked many questions, and her mother told stories that Nina never heard before.',
                questions: [
                    ['What did Nina find?', 'She found a box of old photographs.'],
                    ['Where did Nina’s mother live at age eighteen?', 'She lived in a small coastal town.'],
                    ['Where did she work?', 'She worked in a bakery.'],
                    ['Why did she move to São Paulo?', 'She moved there for university.']
                ]
            },
            expressionTranslations: [
                ['Eu assisti a um filme ontem à noite.', 'I watched a movie last night.'],
                ['Meus avós se mudaram para cá há muito tempo.', 'My grandparents moved here a long time ago.'],
                ['Eu cresci em uma cidade pequena.', 'I grew up in a small town.'],
                ['Minha família se mudou para Salvador em 2015.', 'My family moved to Salvador in 2015.']
            ],
            music: {
                song: 'Yesterday', artist: 'The Beatles', spotifyId: '3BQHpFgAp4l80e1XslIjNI',
                lines: [
                    ['___, the streets were quiet after rain.', 'Yesterday'],
                    ['I ___ to an old house near the sea.', 'went'],
                    ['My family ___ there many years ago.', 'lived'],
                    ['We looked at photos from ___ night.', 'last'],
                    ['Then we ___ home before the sky was dark.', 'came']
                ]
            },
            homework: {
                instruction: 'Escolha um tema e escreva uma sequência de 7 a 9 frases sobre fatos concluídos. O professor fará perguntas sobre o texto.',
                themes: ['O que aconteceu no último fim de semana', 'Uma pequena história de vida', 'Um dia especial no passado'],
                checklist: ['Use was/were e pelo menos quatro verbos no passado.', 'Inclua uma negativa e uma pergunta com did.', 'Use last night, ago, grow up ou move to.']
            },
            labs: [
                {
                    title: 'Past Verb Sort',
                    instruction: 'Classifique e use cada grupo em uma frase.',
                    items: [
                        ['worked / visited / moved', 'regular ou irregular', 'They are regular verbs.'],
                        ['went / had / saw', 'regular ou irregular', 'They are irregular verbs.'],
                        ['did not go / did not work', 'qual forma vem depois de did?', 'The base form comes after did.']
                    ]
                },
                {
                    title: 'Life Timeline',
                    instruction: 'Conecte os eventos em uma pequena biografia de três frases.',
                    items: [
                        ['2001 born Recife | 2019 moved Fortaleza | 2023 started college', 'biografia', 'She was born in Recife in 2001, moved to Fortaleza in 2019, and started college in 2023.'],
                        ['2010 lived Rome | 2014 moved Lisbon | 2018 worked at hotel', 'biografia', 'He lived in Rome in 2010, moved to Lisbon in 2014, and worked at a hotel in 2018.'],
                        ['last night cooked dinner | watched film | went to bed', 'sequência', 'Last night, I cooked dinner, watched a film, and went to bed.']
                    ]
                }
            ]
        },

        30: {
            title: lessonTitles[29],
            objectives: [
                'Comparar duas pessoas, objetos ou lugares.',
                'Formar comparativos curtos e longos.',
                'Usar better e worse em escolhas cotidianas.'
            ],
            intro: [
                ['Maya', 'Which apartment do you prefer?'],
                ['Ravi', 'The first one is cheaper, but it is smaller.'],
                ['Maya', 'The second one is closer to the station.'],
                ['Ravi', 'Yes, and the street is quieter.'],
                ['Maya', 'Is it more expensive?'],
                ['Ravi', 'A little, but I think it is better for us.']
            ],
            vocab: [
                ['bigger', 'maior', 'This room is bigger.'],
                ['smaller', 'menor', 'The old phone is smaller.'],
                ['cheaper', 'mais barato', 'The bus is cheaper than a taxi.'],
                ['more expensive', 'mais caro', 'This hotel is more expensive.'],
                ['better', 'melhor', 'The second option is better.'],
                ['worse', 'pior', 'Traffic is worse today.'],
                ['faster', 'mais rápido', 'The train is faster than the bus.'],
                ['safer', 'mais seguro', 'This street is safer at night.']
            ],
            grammar: {
                title: 'Comparativos + than',
                summary: 'Use comparativos para mostrar a diferença entre duas coisas. Than introduz o segundo elemento da comparação.',
                rows: [
                    ['adjetivo curto', 'adjetivo-er + than', 'The train is faster than the bus.', 'O trem é mais rápido que o ônibus.'],
                    ['final e', 'adjetivo + r', 'This street is safer.', 'Esta rua é mais segura.'],
                    ['adjetivo longo', 'more + adjetivo + than', 'The hotel is more expensive than the hostel.', 'O hotel é mais caro que o hostel.'],
                    ['irregulares', 'good → better / bad → worse', 'This option is better.', 'Esta opção é melhor.']
                ],
                notes: [
                    'Big dobra a consoante: bigger. Happy troca y por i: happier.',
                    'Não misture as duas formas: more cheaper está incorreto; use cheaper.',
                    'Uma comparação completa identifica as duas opções: cheaper than the train.'
                ]
            },
            practice: [
                ['Complete', 'The train is ___ than the bus.', 'mais rápido', 'faster'],
                ['Choose', 'This room is (biger / bigger / more big).', 'maior', 'This room is bigger.'],
                ['Unscramble', 'cheaper / bus / taxi / A / than / is / a', 'Um ônibus é mais barato que um táxi.', 'A bus is cheaper than a taxi.'],
                ['Find the error', 'This hotel is expensiver than that one.', 'Este hotel é mais caro.', 'This hotel is more expensive than that one.'],
                ['Complete', 'Good becomes ___ in a comparison.', 'melhor', 'better'],
                ['Choose', 'Traffic is (badder / worse / more bad) today.', 'pior', 'Traffic is worse today.'],
                ['Data comparison', 'Bus: 50 min | Train: 30 min', 'qual é mais rápido?', 'The train is faster than the bus.'],
                ['Find the error', 'The blue phone is more cheaper.', 'O celular azul é mais barato.', 'The blue phone is cheaper.'],
                ['Complete', 'This neighborhood is ___ at night.', 'mais seguro', 'safer'],
                ['Natural choice', 'Option A: $20 | Option B: $35', 'qual é mais barato?', 'Option A is cheaper than option B.']
            ],
            translations: [
                ['Este quarto é maior que aquele.', 'This room is bigger than that one.'],
                ['O ônibus é mais barato que o táxi.', 'The bus is cheaper than the taxi.'],
                ['Este hotel é mais caro.', 'This hotel is more expensive.'],
                ['O trem é mais rápido que o ônibus.', 'The train is faster than the bus.'],
                ['Esta rua é mais segura à noite.', 'This street is safer at night.'],
                ['A segunda opção é melhor.', 'The second option is better.']
            ],
            expressions: [
                ['better than', 'melhor que', 'Use para comparar qualidade ou adequação.', 'This schedule is better than the old one.'],
                ['the same as', 'igual a / o mesmo que', 'Use quando não há diferença relevante.', 'My bag is the same as yours.'],
                ['compare with', 'comparar com', 'Use with antes do segundo item analisado.', 'Compare this price with the online price.'],
                ['go with', 'escolher / ficar com', 'Forma informal de anunciar uma escolha.', 'I’ll go with the cheaper option.']
            ],
            dialogues: [
                { title: 'Escolhendo um quarto', lines: [['Guest', 'Which room is quieter?'], ['Clerk', 'Room 12 is quieter than room 8.'], ['Guest', 'Is it more expensive?'], ['Clerk', 'Yes, but it is also bigger.'], ['Guest', 'Then I’ll go with room 12.'], ['Clerk', 'Good choice.']] },
                { title: 'Duas rotas', lines: [['Maya', 'Is the highway faster?'], ['Ravi', 'Yes, but the city road is safer in the rain.'], ['Maya', 'Then let’s take the safer road.'], ['Ravi', 'I agree.']] },
                { title: 'Comparando celulares', lines: [['Customer', 'This phone is cheaper than that one.'], ['Assistant', 'Yes, but the other phone has a better camera.'], ['Customer', 'The battery is the same, right?'], ['Assistant', 'Yes, it is.']] },
                { title: 'Horário de aula', lines: [['Student', 'Is the evening class better for you?'], ['Friend', 'No, the morning class is more convenient.'], ['Student', 'It starts earlier.'], ['Friend', 'That is okay for me.']] }
            ],
            reading: {
                title: 'Choosing the practical route',
                text: 'Nina can take a bus or a train to her new office. The bus ticket is cheaper, but the trip is longer and traffic is sometimes slow. The train is faster and more comfortable, but the station is farther from her house. Nina compares the total travel time, not only the ticket price. She chooses the train because it is more reliable in the morning.',
                questions: [
                    ['Which ticket is cheaper?', 'The bus ticket is cheaper.'],
                    ['Which transport is faster?', 'The train is faster.'],
                    ['What is farther from Nina’s house?', 'The train station is farther from her house.'],
                    ['Why does Nina choose the train?', 'Because it is more reliable in the morning.']
                ]
            },
            expressionTranslations: [
                ['Este horário é melhor que o antigo.', 'This schedule is better than the old one.'],
                ['Minha bolsa é igual à sua.', 'My bag is the same as yours.'],
                ['Compare este preço com o preço online.', 'Compare this price with the online price.'],
                ['Vou ficar com a opção mais barata.', 'I’ll go with the cheaper option.']
            ],
            music: {
                song: 'Stronger', artist: 'Kelly Clarkson', spotifyId: '1nInOsHbtotAmEOQhtvnzP',
                lines: [
                    ['Today I feel ___ than I felt before.', 'stronger'],
                    ['This road is ___, but the other one is safe.', 'faster'],
                    ['The new plan is ___ than the plan we had.', 'better'],
                    ['A smaller room can be ___ and warm.', 'cheaper'],
                    ['We compare the choices and go ___ one.', 'with']
                ]
            },
            homework: {
                instruction: 'Escolha duas opções reais e escreva 7 comparações antes de indicar sua escolha.',
                themes: ['Dois meios de transporte', 'Dois celulares ou computadores', 'Dois lugares para morar ou visitar'],
                checklist: ['Use quatro comparativos diferentes.', 'Inclua better ou worse.', 'Use compare with, the same as ou go with.']
            },
            labs: [
                {
                    title: 'Decision Grid',
                    instruction: 'Compare os dados e faça duas frases antes de escolher.',
                    items: [
                        ['Hotel A: $60, 2 km | Hotel B: $90, 500 m', 'preço e distância', 'Hotel A is cheaper, but hotel B is closer.'],
                        ['Bus: 45 min, $4 | Train: 25 min, $8', 'tempo e preço', 'The train is faster, but the bus is cheaper.'],
                        ['Phone A: battery 12 h | Phone B: battery 18 h', 'bateria', 'Phone B has a better battery than phone A.']
                    ]
                }
            ]
        },

        31: {
            title: lessonTitles[30],
            objectives: [
                'Falar sobre planos já decididos.',
                'Formar afirmativas, negativas e perguntas com going to.',
                'Combinar detalhes de um plano: atividade, dia, horário e lugar.'
            ],
            intro: [
                ['Nina', 'What are you going to do this weekend?'],
                ['Omar', 'I am going to visit my cousin on Saturday.'],
                ['Nina', 'Are you going to stay there overnight?'],
                ['Omar', 'No, I’m not. I’m going to come home after dinner.'],
                ['Nina', 'What about Sunday?'],
                ['Omar', 'I’m going to study in the morning and relax in the afternoon.']
            ],
            vocab: [
                ['tomorrow', 'amanhã', 'I am going to call tomorrow.'],
                ['next week', 'semana que vem', 'We are going to travel next week.'],
                ['plan', 'plano / planejar', 'What is your plan?'],
                ['visit', 'visitar', 'She is going to visit her aunt.'],
                ['travel', 'viajar', 'They are going to travel by train.'],
                ['study', 'estudar', 'I am going to study tonight.'],
                ['save', 'economizar / guardar', 'We are going to save money.'],
                ['book', 'reservar', 'Omar is going to book a room.']
            ],
            grammar: {
                title: 'Be going to + verbo base',
                summary: 'Use going to para planos e intenções que já existem antes do momento da fala. O verbo be concorda com o sujeito.',
                rows: [
                    ['afirmativa', 'sujeito + be + going to + verbo', 'I am going to study tonight.', 'Eu vou estudar hoje à noite.'],
                    ['negativa', 'sujeito + be not + going to + verbo', 'She isn’t going to travel.', 'Ela não vai viajar.'],
                    ['pergunta', 'Be + sujeito + going to + verbo?', 'Are you going to book a room?', 'Você vai reservar um quarto?'],
                    ['resposta curta', 'Yes/No + sujeito + be', 'Yes, I am. / No, they aren’t.', 'Sim. / Não.']
                ],
                notes: [
                    'Depois de going to, use o verbo base: going to visit, e não going to visiting.',
                    'Inclua uma expressão de futuro para deixar o plano claro: tomorrow, next week, on Saturday.',
                    'Na fala, going to pode soar como gonna, mas na escrita desta aula mantenha going to.'
                ]
            },
            practice: [
                ['Complete', 'I am going to ___ tonight.', 'estudar', 'study'],
                ['Choose', 'She (is / are / does) going to travel.', 'vai', 'She is going to travel.'],
                ['Unscramble', 'going / We / visit / are / to / them', 'Nós vamos visitá-los.', 'We are going to visit them.'],
                ['Find the error', 'He going to book a room.', 'Ele vai reservar um quarto.', 'He is going to book a room.'],
                ['Complete', '___ you going to work tomorrow?', 'você vai...?', 'Are'],
                ['Natural response', '“Are they going to stay?” — “___”', 'resposta negativa', 'No, they aren’t.'],
                ['Choose', 'I am going to (saving / save / saved) money.', 'economizar', 'I am going to save money.'],
                ['Find the error', 'We are going travel next week.', 'Nós vamos viajar na próxima semana.', 'We are going to travel next week.'],
                ['Plan detail', 'Saturday | museum | 2 p.m.', 'plano completo', 'We are going to visit the museum on Saturday at two.'],
                ['Complete', 'She is not going ___ call today.', 'vai ligar', 'to']
            ],
            translations: [
                ['Eu vou estudar hoje à noite.', 'I am going to study tonight.'],
                ['Ela vai visitar a tia no sábado.', 'She is going to visit her aunt on Saturday.'],
                ['Nós vamos viajar na próxima semana.', 'We are going to travel next week.'],
                ['Eles não vão ficar no hotel.', 'They are not going to stay at the hotel.'],
                ['Você vai reservar um quarto?', 'Are you going to book a room?'],
                ['Eu vou economizar dinheiro para a viagem.', 'I am going to save money for the trip.']
            ],
            expressions: [
                ['make plans', 'fazer planos', 'Use make, não do, com plans.', 'We are making plans for the holiday.'],
                ['get ready for', 'preparar-se para', 'Use antes de um evento, viagem ou atividade.', 'I am getting ready for my trip.'],
                ['save up for', 'juntar dinheiro para', 'Phrasal verb que destaca economia ao longo do tempo.', 'She is saving up for a new computer.'],
                ['see you then', 'até lá / nos vemos então', 'Use depois de combinar dia e horário.', 'Saturday at ten? Great. See you then.']
            ],
            dialogues: [
                { title: 'Plano de sábado', lines: [['Maya', 'Are you free on Saturday?'], ['Ravi', 'Yes. What are you planning?'], ['Maya', 'I am going to visit the new museum.'], ['Ravi', 'What time are you going?'], ['Maya', 'At two. Would you like to come?'], ['Ravi', 'Yes. See you then.']] },
                { title: 'Economizando para uma viagem', lines: [['Nina', 'Why are you cooking at home every day?'], ['Omar', 'I am saving up for a trip.'], ['Nina', 'Where are you going to go?'], ['Omar', 'To Chile next year.']] },
                { title: 'Preparação para prova', lines: [['Student', 'Are you going to study tonight?'], ['Friend', 'Yes, after dinner.'], ['Student', 'Can we review together online?'], ['Friend', 'Sure, at eight.']] },
                { title: 'Reserva do hotel', lines: [['Maya', 'Are you going to book the hotel today?'], ['Ravi', 'No, I’m going to compare prices first.'], ['Maya', 'Do we need two rooms?'], ['Ravi', 'No, one room is enough.']] }
            ],
            reading: {
                title: 'A weekend with a clear plan',
                text: 'Next weekend, Omar is going to visit his cousin in Santos. He is going to travel by bus on Friday evening and stay for two nights. On Saturday morning, they are going to walk along the beach. In the afternoon, they plan to visit an aquarium. Omar is not going to take his computer because he wants to relax. He is going to come home on Sunday after lunch.',
                questions: [
                    ['Where is Omar going next weekend?', 'He is going to Santos.'],
                    ['How is he going to travel?', 'He is going to travel by bus.'],
                    ['What are they going to visit on Saturday afternoon?', 'They are going to visit an aquarium.'],
                    ['Why isn’t Omar going to take his computer?', 'Because he wants to relax.']
                ]
            },
            expressionTranslations: [
                ['Nós estamos fazendo planos para o feriado.', 'We are making plans for the holiday.'],
                ['Eu estou me preparando para a viagem.', 'I am getting ready for my trip.'],
                ['Ela está juntando dinheiro para um computador novo.', 'She is saving up for a new computer.'],
                ['Sábado às dez? Ótimo. Até lá.', 'Saturday at ten? Great. See you then.']
            ],
            music: {
                song: 'I’m Gonna Be (500 Miles)', artist: 'The Proclaimers', spotifyId: '67iAlVNDDdddxqSD2EZhFs',
                lines: [
                    ['Tomorrow I am going to ___ a new journey.', 'start'],
                    ['We are making ___ for every day away.', 'plans'],
                    ['I am saving ___ for a ticket on the train.', 'up'],
                    ['She is going to ___ a room beside the sea.', 'book'],
                    ['When the time is set, I say, “See you ___.”', 'then']
                ]
            },
            homework: {
                instruction: 'Escolha um plano e escreva 8 frases com atividade, dia, horário, lugar e preparação.',
                themes: ['Seu próximo fim de semana', 'Uma pequena viagem', 'Um plano de estudo para a próxima semana'],
                checklist: ['Use três formas diferentes de be going to.', 'Inclua uma negativa e uma pergunta.', 'Use make plans, get ready for, save up for ou see you then.']
            },
            labs: [
                {
                    title: 'Plan Builder',
                    instruction: 'Combine as informações em um plano completo e faça uma pergunta de confirmação.',
                    items: [
                        ['Friday | 7 p.m. | restaurant | meet friends', 'plano + pergunta', 'I am going to meet my friends at a restaurant on Friday at seven. Are you going to come?'],
                        ['next month | save money | new phone', 'intenção', 'I am going to save money for a new phone next month.'],
                        ['Sunday | not work | rest at home', 'plano negativo', 'I am not going to work on Sunday. I am going to rest at home.']
                    ]
                }
            ]
        }
    };

    const reviews = {
        4: {
            title: lessonTitles[3],
            objectives: ['Apresentar-se com segurança.', 'Trocar informações pessoais.', 'Apresentar familiares e relações.'],
            recap: [
                ['To be: afirmação', 'Use am com I, is com he/she/it e are com you/we/they.', 'I am Maya. / They are ready.'],
                ['To be: pergunta', 'Coloque am/is/are antes do sujeito e responda com a mesma forma.', 'Is she new? Yes, she is.'],
                ['Perguntas pessoais', 'Use do com verbos como live e spell; não acrescente be.', 'Where do you live?'],
                ['Adjetivos possessivos', 'My, your, his, her, our e their vêm antes do substantivo.', 'Her phone number is new.'],
                ['Have e has', 'Use has com he/she/it e have com os demais sujeitos.', 'She has two brothers.'],
                ['’s possessivo', 'Acrescente ’s ao nome da pessoa para indicar posse ou relação.', 'Lucas’s father is here.']
            ],
            stations: [
                { title: 'Station 1: Welcome Desk', instruction: 'Complete as falas da recepção.', items: [
                    ['Complete', 'Good morning. My ___ is Maya.', 'nome', 'name'],
                    ['Complete', 'How ___ you today?', 'está', 'are'],
                    ['Natural response', '“Are you a new student?”', 'resposta positiva', 'Yes, I am.'],
                    ['Natural response', '“Nice to meet you.”', 'resposta natural', 'Nice to meet you too.']
                ]},
                { title: 'Station 2: Question Builder', instruction: 'Monte perguntas completas para cada informação.', items: [
                    ['Build', 'full name', 'qual é...', 'What is your full name?'],
                    ['Build', 'age', 'quantos anos...', 'How old are you?'],
                    ['Build', 'city of residence', 'onde você mora...', 'Where do you live?'],
                    ['Build', 'spelling of last name', 'como soletra...', 'How do you spell your last name?']
                ]},
                { title: 'Station 3: Pronoun Switch', instruction: 'Substitua a pessoa e ajuste toda a frase.', items: [
                    ['Transform', 'I am ready. → she', 'troque o sujeito', 'She is ready.'],
                    ['Transform', 'My name is Ben. → he', 'posse dele', 'His name is Ben.'],
                    ['Transform', 'They have a son. → she', 'have muda', 'She has a son.'],
                    ['Transform', 'Her mother is here. → we', 'nossa mãe', 'Our mother is here.']
                ]},
                { title: 'Station 4: Family Photo Clues', instruction: 'Resolva cada relação familiar.', items: [
                    ['Relationship', 'My mother’s son is not me.', 'homem da mesma família', 'He is my brother.'],
                    ['Relationship', 'My aunt’s daughter.', 'filha da tia', 'She is my cousin.'],
                    ['Possession', 'the bag of Lucas', 'use possessive s', 'Lucas’s bag'],
                    ['Complete', 'Ravi and I love ___ grandmother.', 'nossa', 'our']
                ]},
                { title: 'Station 5: Welcome Desk Repairs', instruction: 'Encontre e corrija um erro em cada frase.', items: [
                    ['Correct', 'I is a student.', 'to be com I', 'I am a student.'],
                    ['Correct', 'Where you live?', 'auxiliar', 'Where do you live?'],
                    ['Correct', 'She have one brother.', 'terceira pessoa', 'She has one brother.'],
                    ['Correct', 'He name is Omar.', 'possessivo', 'His name is Omar.']
                ]},
                { title: 'Station 6: Translation Relay', instruction: 'Traduza oralmente e revele o modelo depois da resposta.', items: [
                    ['Translate', 'Meu nome é Nina e eu sou do Brasil.', 'apresentação', 'My name is Nina and I am from Brazil.'],
                    ['Translate', 'Onde você mora?', 'verbo live', 'Where do you live?'],
                    ['Translate', 'Ela tem duas irmãs.', 'has', 'She has two sisters.'],
                    ['Translate', 'Este é o pai do Lucas.', 'possessive s', 'This is Lucas’s father.'],
                    ['Translate', 'Prazer em conhecer você.', 'expressão', 'Nice to meet you.']
                ]}
            ],
            reading: {
                title: 'The new course group',
                text: 'Four students meet before their first class. Maya is from Brazil and lives near the school. Kenji is Japanese, but he lives with his sister in London. Nina and Omar are cousins. Their family comes from Egypt. The students exchange names, phone numbers, and emails. When the teacher opens the door, everyone already knows one person in the group.',
                questions: [
                    ['Where is Maya from?', 'She is from Brazil.'],
                    ['Who lives with his sister?', 'Kenji lives with his sister.'],
                    ['What is the relationship between Nina and Omar?', 'They are cousins.'],
                    ['Which information do the students exchange?', 'They exchange names, phone numbers, and emails.']
                ]
            },
            music: { song: 'Count on Me', artist: 'Bruno Mars', spotifyId: '3B5UbSndRz907IZhhmUfLi', lines: [
                ['My ___ is clear when I meet you today.', 'name'],
                ['Your ___ is here, and mine is here too.', 'family'],
                ['We ___ ready for the first class together.', 'are'],
                ['Her brother ___ a friendly smile.', 'has'],
                ['Before class begins, we say, “Nice to ___ you.”', 'meet']
            ]},
            homework: {
                instruction: 'Escolha um perfil e prepare uma apresentação de 8 frases para usar na próxima aula.',
                themes: ['Seu perfil e sua família', 'Um personagem fictício e seus parentes', 'Dois novos alunos de uma turma'],
                checklist: ['Inclua identidade, cidade e contato.', 'Use quatro possessivos.', 'Inclua uma pergunta para o professor.']
            }
        },

        8: {
            title: lessonTitles[7],
            objectives: ['Descrever uma rotina.', 'Ler horários e agendas.', 'Resolver uma situação simples de alimentação.'],
            recap: [
                ['Rotina', 'Use o verbo base com I/you/we/they para hábitos e ações frequentes.', 'We start work at eight.'],
                ['Terceira pessoa', 'Com he/she/it, use s; após consoante + y, troque y por ies.', 'She works. / He studies.'],
                ['Do e does', 'Use do/does nas perguntas e don’t/doesn’t nas negativas.', 'Does he work? He doesn’t work.'],
                ['Tempo', 'Use at com hora, on com dia e in com parte do dia.', 'At seven / on Friday / in the morning'],
                ['Some e any', 'Use some em afirmativas e ofertas; use any em perguntas e negativas.', 'We have some tea. Do we have any milk?'],
                ['Contagem', 'Conte itens como apples; para líquidos e massas, use recipientes ou medidas.', 'Two apples / a bottle of water']
            ],
            stations: [
                { title: 'Station 1: Routine Timeline', instruction: 'Coloque a rotina em ordem e forme frases.', items: [
                    ['Order', 'leave home / wake up / have breakfast', 'manhã', 'Wake up → have breakfast → leave home.'],
                    ['Complete', 'She ___ work at eight.', 'começa', 'starts'],
                    ['Complete', 'They ___ lunch at noon.', 'almoçam', 'have'],
                    ['Order', 'cook dinner / come back home / go to bed', 'noite', 'Come back home → cook dinner → go to bed.']
                ]},
                { title: 'Station 2: Third-Person Switch', instruction: 'Passe cada rotina para he ou she.', items: [
                    ['Transform', 'I wake up at six. → he', 'terceira pessoa', 'He wakes up at six.'],
                    ['Transform', 'I study at night. → she', 'y muda', 'She studies at night.'],
                    ['Transform', 'I have breakfast. → he', 'have muda', 'He has breakfast.'],
                    ['Transform', 'I go home at five. → she', 'go + es', 'She goes home at five.']
                ]},
                { title: 'Station 3: Schedule Detective', instruction: 'Leia a agenda e responda.', items: [
                    ['Schedule', 'Class | Tuesday | 7:30 p.m.', 'dia e hora', 'Class is on Tuesday at seven thirty.'],
                    ['Schedule', 'Doctor | Friday | 3:15 p.m.', 'compromisso', 'The doctor’s appointment is on Friday at a quarter past three.'],
                    ['Question', 'work starts 8:00', 'pergunte o horário', 'What time does work start?'],
                    ['Negative', 'Nina | not work | Sunday', 'frase negativa', 'Nina does not work on Sunday.']
                ]},
                { title: 'Station 4: Café Counter', instruction: 'Escolha a fala adequada para completar o atendimento.', items: [
                    ['Response', 'Server: What would you like?', 'pedido de café', 'I’d like a coffee, please.'],
                    ['Response', 'Server: For here or to go?', 'para levar', 'To go, please.'],
                    ['Question', 'confirmar se há chá', 'use any', 'Do you have any tea?'],
                    ['Response', 'Server: Anything else?', 'encerrar pedido', 'No, thank you. That is all.']
                ]},
                { title: 'Station 5: Quantity Sort', instruction: 'Classifique e complete com some ou any.', items: [
                    ['Classify', 'apple / rice / sandwich / water', 'contável ou incontável', 'Countable: apple, sandwich. Uncountable: rice, water.'],
                    ['Complete', 'We need ___ bread.', 'afirmativa', 'some'],
                    ['Complete', 'Do we have ___ apples?', 'pergunta', 'any'],
                    ['Correct', 'I want two waters.', 'use recipientes', 'I want two bottles of water.']
                ]},
                { title: 'Station 6: Routine and Café Repairs', instruction: 'Corrija sem mudar o significado.', items: [
                    ['Correct', 'She go to work at nine.', 'terceira pessoa', 'She goes to work at nine.'],
                    ['Correct', 'Does he starts early?', 'depois de does', 'Does he start early?'],
                    ['Correct', 'My class is in Monday.', 'dia da semana', 'My class is on Monday.'],
                    ['Correct', 'We don’t have some milk.', 'negativa', 'We don’t have any milk.']
                ]},
                { title: 'Station 7: One-Day Planner', instruction: 'Combine rotina, agenda e alimentação em um único dia.', items: [
                    ['Plan', '6:30 wake up | 7:00 breakfast | 7:45 leave', 'ordem e horários', 'I wake up at six thirty, have breakfast at seven, and leave home at seven forty-five.'],
                    ['Schedule', 'English class | Tuesday | 7:30 p.m.', 'dia e horário', 'English class is on Tuesday at seven thirty.'],
                    ['Food plan', 'bread + fruit at home | no coffee', 'some e any', 'I have some bread and fruit, but I do not have any coffee.'],
                    ['Question', 'Nina | lunch | noon', 'pergunta com horário', 'What time does Nina have lunch?']
                ]}
            ],
            reading: {
                title: 'Breakfast before the early train',
                text: 'Ravi has an early train on Saturday. It leaves at seven fifteen, so he gets up at five forty-five. He has some bread, fruit, and coffee at home. There isn’t any food service on the first part of the trip. Ravi leaves home at six thirty and arrives at the station ten minutes early.',
                questions: [
                    ['What time does Ravi’s train leave?', 'It leaves at seven fifteen.'],
                    ['Why does he get up early?', 'Because he has an early train.'],
                    ['What does he have for breakfast?', 'He has bread, fruit, and coffee.'],
                    ['When does he arrive at the station?', 'He arrives at seven oh five.']
                ]
            },
            music: { song: 'Beautiful Day', artist: 'U2', spotifyId: '1VuBmEauSZywQVtqbxNqka', lines: [
                ['I wake ___ before the city starts to move.', 'up'],
                ['Breakfast is ready at half ___ six.', 'past'],
                ['There is ___ fruit beside my cup of tea.', 'some'],
                ['My bus arrives ___ time outside the door.', 'on'],
                ['She starts work early, but she ___ late.', 'finishes']
            ]},
            homework: {
                instruction: 'Escolha uma situação e monte uma página com rotina, agenda e alimentação.',
                themes: ['Manhã antes de uma viagem', 'Rotina de um dia de aula', 'Agenda de uma pessoa que trabalha à noite'],
                checklist: ['Inclua seis ações em ordem.', 'Use três horários.', 'Inclua some e any.']
            }
        },

        12: {
            title: lessonTitles[11],
            objectives: ['Identificar pessoas por características.', 'Localizar serviços na cidade.', 'Pedir e dar direções curtas.'],
            recap: [
                ['Be na descrição', 'Use be antes de idade aproximada, altura e adjetivos de personalidade.', 'He is young and friendly.'],
                ['Have na descrição', 'Use have/has para cabelo, olhos e outras características.', 'She has short black hair.'],
                ['Ordem do adjetivo', 'O adjetivo vem antes do substantivo em inglês.', 'A tall man / long hair'],
                ['There is e there are', 'Use is com um lugar e are com dois ou mais.', 'There is a bank. There are two cafés.'],
                ['Localização', 'Use next to, between e across from para relacionar dois lugares.', 'The bank is across from the park.'],
                ['Rota', 'Use imperativos e then para ordenar etapas sem sujeito explícito.', 'Go straight. Then turn left.']
            ],
            stations: [
                { title: 'Station 1: Person Finder', instruction: 'Use as pistas para formar uma descrição completa.', items: [
                    ['Describe', 'tall | short black hair | glasses', 'be + have + wear', 'She is tall, has short black hair, and wears glasses.'],
                    ['Describe', 'young | friendly | brown eyes', 'três características', 'He is young and friendly, and he has brown eyes.'],
                    ['Question', 'aparência do gerente', 'look like', 'What does the manager look like?'],
                    ['Correct', 'She has hair long.', 'ordem', 'She has long hair.']
                ]},
                { title: 'Station 2: City Map Clues', instruction: 'Resolva a posição de cada lugar.', items: [
                    ['Locate', 'bank | opposite park', 'em frente', 'The bank is across from the park.'],
                    ['Locate', 'café | bank + pharmacy', 'entre', 'The café is between the bank and the pharmacy.'],
                    ['Locate', 'bakery | after corner', 'logo após a esquina', 'The bakery is around the corner.'],
                    ['Question', 'hospital nearby', 'there is', 'Is there a hospital near here?']
                ]},
                { title: 'Station 3: Route Builder', instruction: 'Organize cada rota em instruções claras.', items: [
                    ['Route', 'straight 2 blocks / right / museum left', 'três etapas', 'Go straight for two blocks, turn right, and the museum is on your left.'],
                    ['Route', 'cross street / past bank / café corner', 'três etapas', 'Cross the street, go past the bank, and the café is on the corner.'],
                    ['Negative', 'not cross here', 'imperativo negativo', 'Don’t cross here.'],
                    ['Question', 'station', 'pedir direções', 'Excuse me. How do I get to the station?']
                ]},
                { title: 'Station 4: Real-Life Responses', instruction: 'Escolha uma resposta que faça a conversa continuar.', items: [
                    ['Response', '“What does he look like?”', 'descrição', 'He is short and has gray hair.'],
                    ['Response', '“Is there a pharmacy nearby?”', 'resposta afirmativa + local', 'Yes. There is one next to the supermarket.'],
                    ['Response', '“Do I turn at the lights?”', 'confirmação', 'Yes. Turn right at the traffic lights.'],
                    ['Response', '“Thank you for your help.”', 'resposta gentil', 'You’re welcome.']
                ]},
                { title: 'Station 5: Map and Description Repairs', instruction: 'Corrija os erros de forma e localização.', items: [
                    ['Correct', 'He have blue eyes.', 'has', 'He has blue eyes.'],
                    ['Correct', 'There are a bank here.', 'singular', 'There is a bank here.'],
                    ['Correct', 'The hotel is near to the station.', 'near sem to', 'The hotel is near the station.'],
                    ['Correct', 'Don’t to turn left.', 'imperativo', 'Don’t turn left.']
                ]},
                { title: 'Station 6: Translation Route', instruction: 'Traduza cada frase oralmente.', items: [
                    ['Translate', 'Ela é alta e usa óculos.', 'descrição', 'She is tall and wears glasses.'],
                    ['Translate', 'Há uma padaria perto daqui.', 'there is', 'There is a bakery near here.'],
                    ['Translate', 'O banco fica em frente ao parque.', 'across from', 'The bank is across from the park.'],
                    ['Translate', 'Siga em frente e vire à direita.', 'imperativos', 'Go straight and turn right.'],
                    ['Translate', 'O hotel fica à sua esquerda.', 'local final', 'The hotel is on your left.']
                ]}
            ],
            reading: {
                title: 'Meeting the guide downtown',
                text: 'Maya is meeting a tour guide near the city museum. The guide is short, has curly gray hair, and wears a green jacket. Maya arrives at the station and follows the message: go straight, walk past the bank, and turn left at the bakery. The museum is across from a park. Maya sees the green jacket near the entrance and finds the guide easily.',
                questions: [
                    ['What does the guide look like?', 'The guide is short, has curly gray hair, and wears a green jacket.'],
                    ['Where does Maya start the route?', 'She starts at the station.'],
                    ['Where does she turn left?', 'She turns left at the bakery.'],
                    ['Where is the museum?', 'It is across from a park.']
                ]
            },
            music: { song: 'Downtown', artist: 'Petula Clark', spotifyId: '2PaRgKXIroJJ351nwLmIe0', lines: [
                ['Go ___ until the old bank is behind you.', 'straight'],
                ['Turn at the ___ where the green trees grow.', 'corner'],
                ['The guide has curly hair and wears a blue ___ .', 'jacket'],
                ['There is a quiet park across ___ the museum.', 'from'],
                ['At the final sign, the door is on your ___ .', 'left']
            ]},
            homework: {
                instruction: 'Escolha uma missão e produza uma descrição e uma rota para o professor solucionar.',
                themes: ['Encontrar uma pessoa em um lugar público', 'Chegar a um serviço no centro', 'Guiar uma entrega até uma sala'],
                checklist: ['Descreva a pessoa com quatro características.', 'Inclua três lugares da cidade.', 'Dê pelo menos cinco instruções.']
            }
        },

        16: {
            title: lessonTitles[15],
            objectives: ['Entender uma previsão simples.', 'Falar de lazer e frequência.', 'Comprar roupas com tamanho, cor e preço.'],
            recap: [
                ['Clima com adjetivo', 'Use it como sujeito antes de sunny, cloudy, cold e outras condições.', 'It is cloudy today.'],
                ['Clima em ação', 'Use it is + verbo-ing para chuva ou neve acontecendo agora.', 'It is raining now.'],
                ['Gostos', 'Depois de like, love e enjoy, use a atividade com ing.', 'She enjoys drawing.'],
                ['Frequência', 'Always, often, sometimes e never aparecem antes do verbo comum.', 'We often watch movies.'],
                ['Demonstrativos', 'This/that são singulares; these/those são plurais.', 'This shirt / those shoes'],
                ['Experimentar roupa', 'Com substantivo, use try the jacket on; com pronome, use try it on.', 'Can I try it on?']
            ],
            stations: [
                { title: 'Station 1: Forecast Board', instruction: 'Leia a previsão e tome uma decisão prática.', items: [
                    ['Forecast', 'morning: rainy, 15°C', 'objeto útil', 'Take an umbrella and a jacket.'],
                    ['Forecast', 'afternoon: sunny, 29°C', 'atividade possível', 'We can go to the park in the afternoon.'],
                    ['Complete', 'It is ___ now; water is falling from the sky.', 'chovendo', 'raining'],
                    ['Correct', 'Is windy today.', 'sujeito it', 'It is windy today.']
                ]},
                { title: 'Station 2: Hobby Survey', instruction: 'Forme perguntas e respostas sobre lazer.', items: [
                    ['Question', 'gostar de nadar', 'do + like', 'Do you like swimming?'],
                    ['Frequency', 'Maya / often / draw', 'ordem do advérbio', 'Maya often draws.'],
                    ['Negative', 'Omar / not like / run', 'doesn’t + ing', 'Omar doesn’t like running.'],
                    ['Skill', 'Nina / good / cook', 'be good at', 'Nina is good at cooking.']
                ]},
                { title: 'Station 3: Shopping Tags', instruction: 'Leia as etiquetas e responda como cliente.', items: [
                    ['Tag', 'green jacket | M | $45', 'preço', 'This green jacket is forty-five dollars.'],
                    ['Tag', 'black shoes | 39 | sold out', 'disponibilidade', 'Those black shoes are sold out.'],
                    ['Request', 'experimentar jeans', 'try on', 'Can I try these jeans on?'],
                    ['Decision', 'dress fits well', 'encerrar compra', 'It fits well. I’ll take it.']
                ]},
                { title: 'Station 4: Natural Conversation', instruction: 'Escolha a resposta mais natural.', items: [
                    ['Response', '“What’s the weather like?”', 'nublado', 'It is cloudy and cool.'],
                    ['Response', '“What do you do in your free time?”', 'música', 'I often listen to music.'],
                    ['Response', '“What size do you wear?”', 'médio', 'I wear medium.'],
                    ['Response', '“Anything else?”', 'encerrar', 'No, thank you. That is all.']
                ]},
                { title: 'Station 5: Forecast and Fitting Repairs', instruction: 'Corrija um erro por frase.', items: [
                    ['Correct', 'It raining now.', 'be', 'It is raining now.'],
                    ['Correct', 'She enjoy dance.', 'terceira pessoa + ing', 'She enjoys dancing.'],
                    ['Correct', 'These shirt is cheap.', 'singular', 'This shirt is cheap.'],
                    ['Correct', 'Can I try on it?', 'posição do pronome', 'Can I try it on?']
                ]},
                { title: 'Station 6: Translation Mix', instruction: 'Traduza e conecte cada frase a uma situação real.', items: [
                    ['Translate', 'Parece que vai chover.', 'weather', 'It looks like rain.'],
                    ['Translate', 'Eu curto fotografia.', 'hobby', 'I am into photography.'],
                    ['Translate', 'Ela é boa em desenhar.', 'habilidade', 'She is good at drawing.'],
                    ['Translate', 'Posso experimentar esta jaqueta?', 'shopping', 'Can I try this jacket on?'],
                    ['Translate', 'Gostei. Vou levar.', 'decisão', 'I like it. I’ll take it.']
                ]},
                { title: 'Station 7: Three-Stop Saturday', instruction: 'Resolva as decisões de manhã, tarde e noite.', items: [
                    ['Decision', 'rainy morning | walk to market', 'objeto necessário', 'I take an umbrella to the market.'],
                    ['Frequency', 'photography | Saturdays | often', 'posição do advérbio', 'I often take photos on Saturdays.'],
                    ['Shop clue', 'jacket near speaker | singular', 'this', 'This jacket is size medium.'],
                    ['Shop clue', 'shoes far from speaker | plural', 'those', 'Those shoes are black.']
                ]}
            ],
            reading: {
                title: 'A change of plan at the street market',
                text: 'Nina plans to visit an outdoor market on Sunday morning, but it is raining heavily. She waits until noon, when the weather warms up and the rain stops. At the market, she looks at handmade clothes and tries on a blue jacket. It fits well, but Nina does not buy it because she is saving money for a dance course.',
                questions: [
                    ['Why does Nina wait until noon?', 'Because it is raining heavily in the morning.'],
                    ['What happens to the weather at noon?', 'It warms up and the rain stops.'],
                    ['Which item does Nina try on?', 'She tries on a blue jacket.'],
                    ['Why doesn’t she buy it?', 'Because she is saving money for a dance course.']
                ]
            },
            music: { song: 'Walking on Sunshine', artist: 'Katrina & The Waves', spotifyId: '05wIrZSwuaVWhcv5FfqeH0', lines: [
                ['The rain stops and the day warms ___ again.', 'up'],
                ['In my free time, I love ___ outside.', 'dancing'],
                ['This blue jacket ___ well in the afternoon.', 'fits'],
                ['Those black shoes are not my ___ today.', 'size'],
                ['The bright ___ returns above the market.', 'sun']
            ]},
            homework: {
                instruction: 'Escolha uma situação e escreva uma cena de 8 frases conectando clima, atividade e escolha de roupa.',
                themes: ['Preparação para um passeio', 'Compras em um dia de chuva', 'Roupa para praticar um hobby'],
                checklist: ['Descreva o clima.', 'Inclua uma atividade de lazer e frequência.', 'Use demonstrativos e uma expressão de compra.']
            }
        },

        20: {
            title: lessonTitles[19],
            objectives: ['Comunicar um problema de saúde.', 'Localizar objetos em casa.', 'Falar de habilidades e obrigações em estudo ou trabalho.'],
            recap: [
                ['Sintomas', 'Use have/has com headache, cough e fever.', 'She has a sore throat.'],
                ['Sensações e conselho', 'Use feel + adjetivo e should + verbo base.', 'I feel tired. You should rest.'],
                ['Where + be', 'O verbo concorda com o objeto procurado: is no singular, are no plural.', 'Where are the keys?'],
                ['Preposições', 'Use on, under, inside, behind, next to e between para posição.', 'The keys are inside the drawer.'],
                ['Can', 'Can indica habilidade e é seguido pelo verbo sem to.', 'She can use the projector.'],
                ['Have to', 'Have to indica obrigação; com he/she/it, use has to.', 'He has to arrive early.']
            ],
            stations: [
                { title: 'Station 1: Pharmacy Desk', instruction: 'Complete o atendimento com sintomas e conselhos.', items: [
                    ['Complete', 'I ___ a sore throat.', 'estou com', 'have'],
                    ['Question', 'confirmar febre', 'do you have', 'Do you have a fever?'],
                    ['Advice', 'headache + tired', 'descansar', 'You should get some rest.'],
                    ['Negative advice', 'dizzy + drive', 'não dirigir', 'You shouldn’t drive when you feel dizzy.']
                ]},
                { title: 'Station 2: Find It at Home', instruction: 'Use as pistas para localizar cada objeto.', items: [
                    ['Locate', 'keys | table surface', 'sobre', 'The keys are on the table.'],
                    ['Locate', 'shoes | bed lower space', 'debaixo', 'The shoes are under the bed.'],
                    ['Locate', 'lamp | sofa side', 'ao lado', 'The lamp is next to the sofa.'],
                    ['Question', 'towels', 'where + plural', 'Where are the towels?']
                ]},
                { title: 'Station 3: Work Skills', instruction: 'Decida entre habilidade e obrigação.', items: [
                    ['Ability', 'Maya knows the software.', 'can', 'Maya can use the software.'],
                    ['Obligation', 'Office rule: arrive before nine.', 'have to', 'Employees have to arrive before nine.'],
                    ['No ability', 'Ben does not know how to drive.', 'can’t', 'Ben can’t drive.'],
                    ['Question', 'uniform rule', 'does + have to', 'Does Nina have to wear a uniform?']
                ]},
                { title: 'Station 4: Real-Life Response', instruction: 'Dê uma resposta natural e útil.', items: [
                    ['Response', '“What’s the matter?”', 'dor de cabeça', 'I have a headache.'],
                    ['Response', '“Where is my bag?”', 'no sofá', 'It is on the sofa.'],
                    ['Response', '“Can you open the file?”', 'resposta positiva', 'Yes, I can.'],
                    ['Response', '“Do we have to print it?”', 'não', 'No, we don’t.']
                ]},
                { title: 'Station 5: Home, Health and Work Repairs', instruction: 'Corrija a estrutura que não pertence à frase.', items: [
                    ['Correct', 'She have a fever.', 'has', 'She has a fever.'],
                    ['Correct', 'You should to rest.', 'verbo base', 'You should rest.'],
                    ['Correct', 'Where the medicine is?', 'ordem', 'Where is the medicine?'],
                    ['Correct', 'He can to work from home.', 'can + base', 'He can work from home.']
                ]},
                { title: 'Station 6: Translation Shift', instruction: 'Traduza sem adicionar informações.', items: [
                    ['Translate', 'Eu me sinto cansado hoje.', 'feel', 'I feel tired today.'],
                    ['Translate', 'Você deveria tomar o remédio.', 'should', 'You should take the medicine.'],
                    ['Translate', 'Os livros estão na prateleira.', 'on', 'The books are on the shelf.'],
                    ['Translate', 'Eu sei usar o projetor.', 'can', 'I can use the projector.'],
                    ['Translate', 'Nós temos que chegar cedo.', 'have to', 'We have to arrive early.']
                ]}
            ],
            reading: {
                title: 'A different workday',
                text: 'Nina wakes up with a cough, but she does not have a fever. She calls her manager and asks to work from home. Her laptop is on the desk in the bedroom, and the charger is inside a drawer. Nina can join the morning meeting online, but she has to send one report before noon. After lunch, she takes medicine and rests.',
                questions: [
                    ['Which symptom does Nina have?', 'She has a cough.'],
                    ['Where does she work?', 'She works from home.'],
                    ['Where is the charger?', 'It is inside a drawer.'],
                    ['What does Nina have to send?', 'She has to send a report.']
                ]
            },
            music: { song: 'With a Little Help from My Friends', artist: 'The Beatles', spotifyId: '2RnPATK99oGOZygnD2GTO6', lines: [
                ['I feel ___, so I stay at home today.', 'tired'],
                ['My laptop waits on the bedroom ___ .', 'desk'],
                ['I can join the morning ___ from here.', 'meeting'],
                ['Before lunch, I have to send the ___ .', 'report'],
                ['Then I take my medicine and get some ___ .', 'rest']
            ]},
            homework: {
                instruction: 'Escolha uma situação e escreva um plano de solução com 8 frases.',
                themes: ['Trabalhar em casa porque não está bem', 'Organizar um espaço de estudo', 'Preparar uma sala para uma reunião'],
                checklist: ['Use uma expressão de saúde.', 'Localize três objetos.', 'Inclua can e have to.']
            }
        },

        24: {
            title: lessonTitles[23],
            objectives: ['Resolver uma etapa de viagem.', 'Combinar data e horário de um evento.', 'Descrever o que está acontecendo agora.'],
            recap: [
                ['Pedidos de viagem', 'Use Can I...? ou Could I...? + verbo base para pedir algo.', 'Could I have a return ticket?'],
                ['Transporte', 'Use by para o meio de transporte e on para estar dentro dele.', 'We travel by train. We are on the train.'],
                ['Datas e horários', 'Use in com mês, on com data ou dia e at com hora.', 'On May 2nd at seven'],
                ['Convites', 'Use Would you like to...?; aceite com I’d love to.', 'Would you like to come?'],
                ['Ações agora', 'Forme o Present Continuous com am/is/are + verbo-ing.', 'The passengers are waiting.'],
                ['Ortografia do ing', 'Retire e final em write e duplique a consoante em run.', 'Writing / running']
            ],
            stations: [
                { title: 'Station 1: Ticket Counter', instruction: 'Resolva cada pedido de viagem.', items: [
                    ['Request', 'return ticket to Bristol', 'could I have', 'Could I have a return ticket to Bristol?'],
                    ['Question', 'next train time', 'what time', 'What time is the next train?'],
                    ['Information', 'platform 7 | 10:25', 'frase completa', 'The train leaves from platform seven at ten twenty-five.'],
                    ['Request', 'window seat', 'can I', 'Can I have a window seat?']
                ]},
                { title: 'Station 2: Calendar Invitation', instruction: 'Transforme os dados em convite e resposta.', items: [
                    ['Invite', 'June 12 | dinner | 7 p.m.', 'would you like', 'Would you like to have dinner on June twelfth at seven?'],
                    ['Accept', 'convite para sábado', 'aceitar', 'Yes, I’d love to.'],
                    ['Decline', 'trabalha no sábado', 'recusar gentilmente', 'I’m sorry, I can’t. I work on Saturday.'],
                    ['Correct', 'The party is in Friday at eight.', 'dia', 'The party is on Friday at eight.']
                ]},
                { title: 'Station 3: What Is Happening?', instruction: 'Descreva a cena usando ações em progresso.', items: [
                    ['Scene', 'passengers / wait / platform', 'agora', 'The passengers are waiting on the platform.'],
                    ['Scene', 'Maya / buy / ticket', 'agora', 'Maya is buying a ticket.'],
                    ['Negative', 'train / not move', 'agora', 'The train is not moving.'],
                    ['Question', 'Omar / carry / suitcase', 'presente contínuo', 'Is Omar carrying the suitcase?']
                ]},
                { title: 'Station 4: Information Board', instruction: 'Leia o quadro e responda com uma frase completa.', items: [
                    ['Board', 'Train 44 | delayed 15 min', 'situação', 'Train 44 is delayed by fifteen minutes.'],
                    ['Board', 'Flight arrival | 18:30', 'horário', 'The flight arrives at six thirty.'],
                    ['Board', 'Birthday lunch | Sunday 1 p.m.', 'data e hora', 'The birthday lunch is on Sunday at one.'],
                    ['Board', 'Race | happening now | park', 'ação', 'The race is happening in the park right now.']
                ]},
                { title: 'Station 5: Travel Board Repairs', instruction: 'Corrija um erro em cada contexto.', items: [
                    ['Correct', 'Could I to have a ticket?', 'verbo base', 'Could I have a ticket?'],
                    ['Correct', 'My birthday is on July.', 'mês', 'My birthday is in July.'],
                    ['Correct', 'They are wait for the bus.', 'ing', 'They are waiting for the bus.'],
                    ['Correct', 'She is swim now.', 'spelling', 'She is swimming now.']
                ]},
                { title: 'Station 6: Translation Connections', instruction: 'Traduza e identifique a situação.', items: [
                    ['Translate', 'O ônibus está atrasado.', 'viagem', 'The bus is delayed.'],
                    ['Translate', 'Desça no próximo ponto.', 'transporte', 'Get off at the next stop.'],
                    ['Translate', 'Você gostaria de vir à festa?', 'convite', 'Would you like to come to the party?'],
                    ['Translate', 'Os jogadores estão se aquecendo.', 'ação agora', 'The players are warming up.'],
                    ['Translate', 'Nós estamos torcendo pelo time azul.', 'expressão', 'We are cheering for the blue team.']
                ]},
                { title: 'Station 7: Live Travel Update', instruction: 'Transforme cada dado em uma atualização clara para outra pessoa.', items: [
                    ['Announcement', 'Saturday | train delayed 15 min | platform 4', 'data e situação', 'The Saturday train is delayed by fifteen minutes and leaves from platform four.'],
                    ['Now', 'passengers / check / information board', 'ação em progresso', 'The passengers are checking the information board.'],
                    ['Invite', 'party | Sunday | 2 p.m.', 'would like', 'Would you like to come to the party on Sunday at two?'],
                    ['Request', 'return ticket | window seat', 'pedido educado', 'Could I have a return ticket and a window seat, please?']
                ]}
            ],
            reading: {
                title: 'A birthday trip by train',
                text: 'Maya is traveling to her cousin’s birthday party. Her train leaves on Saturday at nine, but it is delayed by twenty minutes. Many passengers are waiting on platform three. Some are checking the information board, and a child is sleeping on a suitcase. The party starts at two in the afternoon, so Maya still has enough time. She sends her cousin a message with the new arrival time.',
                questions: [
                    ['Why is Maya traveling?', 'She is going to her cousin’s birthday party.'],
                    ['How late is the train?', 'It is twenty minutes late.'],
                    ['Where are the passengers waiting?', 'They are waiting on platform three.'],
                    ['What does Maya send her cousin?', 'She sends the new arrival time.']
                ]
            },
            music: { song: 'The Final Countdown', artist: 'Europe', spotifyId: '3MrRksHupTVEQ7YbA0FsZK', lines: [
                ['The train is ___, but we still have time.', 'delayed'],
                ['The passengers are ___ beside platform three.', 'waiting'],
                ['Our birthday ___ starts at two today.', 'party'],
                ['Would you like to come and ___ with us?', 'celebrate'],
                ['Get ___ the train when the doors are open.', 'on']
            ]},
            homework: {
                instruction: 'Escolha uma missão e escreva 8 frases conectando transporte, horário e ação em progresso.',
                themes: ['Viagem para uma festa', 'Espera em uma estação', 'Chegada a um evento esportivo'],
                checklist: ['Inclua um pedido com can/could.', 'Use uma data e dois horários.', 'Inclua três ações no Present Continuous.']
            }
        },

        28: {
            title: lessonTitles[27],
            objectives: ['Descrever fatos sobre natureza.', 'Dar instruções tecnológicas.', 'Apresentar origem, nacionalidade e idioma.'],
            recap: [
                ['Fatos da natureza', 'Use o Present Simple; acrescente s quando o sujeito é singular.', 'Birds build nests. A bird builds a nest.'],
                ['Habilidades', 'Use can ou can’t + verbo base para habilidades de animais.', 'Ducks can swim. Cats can’t fly.'],
                ['Instruções', 'Comece com o verbo base para orientar uma ação.', 'Turn the computer on.'],
                ['It e them', 'Use it para um objeto e them para vários; no phrasal verb, o pronome fica no meio.', 'Turn it off. Back them up.'],
                ['Origem e nacionalidade', 'Use be from + país e be + nacionalidade.', 'She is from Japan. She is Japanese.'],
                ['Idioma e maiúsculas', 'Use speak + idioma e inicial maiúscula em país, nacionalidade e idioma.', 'He speaks Spanish.']
            ],
            stations: [
                { title: 'Station 1: Nature Ranger', instruction: 'Complete fatos e avisos do parque.', items: [
                    ['Fact', 'birds / build / nests', 'plural', 'Birds build nests.'],
                    ['Ability', 'ducks / swim', 'can', 'Ducks can swim.'],
                    ['Warning', 'wild animals', 'stay away', 'Stay away from wild animals.'],
                    ['Care', 'trash on path', 'pick up', 'Please pick up your trash.']
                ]},
                { title: 'Station 2: Tech Support', instruction: 'Dê as instruções na ordem correta.', items: [
                    ['Fix', 'screen frozen', 'desligar e ligar', 'Turn it off, wait, and turn it on again.'],
                    ['Account', 'open app account', 'log in', 'Log in to the app with your email.'],
                    ['Battery', 'battery low', 'plug in', 'Plug the charger in.'],
                    ['Safety', 'important photos', 'back up', 'Back them up before you reset the phone.']
                ]},
                { title: 'Station 3: Country Cards', instruction: 'Transforme os dados em um perfil.', items: [
                    ['Profile', 'Brazil | Brazilian | Portuguese', 'três frases', 'She is from Brazil. She is Brazilian and speaks Portuguese.'],
                    ['Profile', 'Japan | Japanese | Japanese', 'três informações', 'He is from Japan. He is Japanese and speaks Japanese.'],
                    ['Capital', 'Canada | Ottawa', 'frase', 'Ottawa is the capital of Canada.'],
                    ['Question', 'idiomas', 'pergunta', 'What languages do you speak?']
                ]},
                { title: 'Station 4: Pronoun Repair', instruction: 'Substitua a repetição por it ou them.', items: [
                    ['Replace', 'Turn the phone off. Turn the phone on.', 'it', 'Turn the phone off. Turn it on again.'],
                    ['Replace', 'Save the photos. Back up the photos.', 'them', 'Save the photos. Back them up.'],
                    ['Correct', 'Plug in it.', 'posição', 'Plug it in.'],
                    ['Correct', 'Turn off them.', 'posição', 'Turn them off.']
                ]},
                { title: 'Station 5: Nature and Language Repairs', instruction: 'Corrija o erro sem trocar o tema.', items: [
                    ['Correct', 'A bird build a nest.', 'terceira pessoa', 'A bird builds a nest.'],
                    ['Correct', 'Birds can flies.', 'can + base', 'Birds can fly.'],
                    ['Correct', 'She is from Brazilian.', 'nacionalidade', 'She is Brazilian.'],
                    ['Correct', 'He speak spanish.', 'verbo + maiúscula', 'He speaks Spanish.']
                ]},
                { title: 'Station 6: Translation World', instruction: 'Traduza cada comando ou informação.', items: [
                    ['Translate', 'Muitos animais vivem na floresta.', 'natureza', 'Many animals live in the forest.'],
                    ['Translate', 'Cuide do parque.', 'take care of', 'Take care of the park.'],
                    ['Translate', 'Ligue o computador.', 'turn on', 'Turn the computer on.'],
                    ['Translate', 'Faça uma cópia das fotos.', 'back up', 'Back up the photos.'],
                    ['Translate', 'Ela é do Japão e fala japonês.', 'origem e idioma', 'She is from Japan and speaks Japanese.']
                ]},
                { title: 'Station 7: International Eco-Tech Brief', instruction: 'Una participante, natureza e tecnologia em cada resposta.', items: [
                    ['Profile', 'Maya | Brazil | Portuguese | park volunteer', 'origem e função', 'Maya is from Brazil, speaks Portuguese, and helps at the park.'],
                    ['Files', 'park photos | important | plural pronoun', 'back up + them', 'The park photos are important, so back them up.'],
                    ['Profile', 'Kenji | Japanese | English and Japanese', 'nacionalidade e idiomas', 'Kenji is Japanese and speaks English and Japanese.'],
                    ['Instruction', 'paper beside river path', 'pick up', 'Please pick up the paper beside the river path.']
                ]}
            ],
            reading: {
                title: 'An international park project',
                text: 'Students from three countries join an online nature project. Maya is Brazilian, Kenji is Japanese, and Lucía is Mexican. They share photos of parks in their cities. Maya’s phone has many large files, so she backs them up before the meeting. During the call, the group compares rivers, trees, and local birds. Then they create simple signs that ask visitors to stay away from nests and pick up trash.',
                questions: [
                    ['How many countries are represented?', 'Three countries are represented.'],
                    ['Why does Maya back up her photos?', 'Because her phone has many large files.'],
                    ['Which natural things does the group compare?', 'They compare rivers, trees, and birds.'],
                    ['What do the signs ask visitors to do?', 'They ask visitors to stay away from nests and pick up trash.']
                ]
            },
            music: { song: 'Across the Universe', artist: 'The Beatles', spotifyId: '4dkoqJrP0L8FXftrMZongF', lines: [
                ['Every ___ has rivers, parks, and trees.', 'country'],
                ['We take ___ of the places where we live.', 'care'],
                ['I save the photos and back them ___ today.', 'up'],
                ['My new friends ___ three languages together.', 'speak'],
                ['Please pick ___ the paper beside the path.', 'up']
            ]},
            homework: {
                instruction: 'Escolha um projeto e escreva 9 frases com fatos, instruções e participantes de países diferentes.',
                themes: ['Campanha internacional por um parque', 'Guia digital sobre animais', 'Apresentação online de três cidades'],
                checklist: ['Inclua três fatos sobre natureza.', 'Dê três instruções tecnológicas ou ambientais.', 'Apresente duas nacionalidades e idiomas.']
            }
        },

        32: {
            title: lessonTitles[31],
            objectives: ['Demonstrar as principais funções comunicativas do A1.', 'Conectar frases em situações cotidianas.', 'Preparar uma apresentação final concreta.'],
            recap: [
                ['Identity', 'Apresente nome, origem e família com be, have e possessivos.', 'I am Maya. I am from Brazil. I have one sister.'],
                ['Routine', 'Use Present Simple, do/does e horários.', 'She starts work at nine. Does she work on Friday?'],
                ['Places', 'Use there is/are, preposições e imperativos.', 'There is a bank. Turn left at the corner.'],
                ['Needs', 'Use should, can e have to.', 'You should rest. I can help. We have to leave.'],
                ['Now', 'Use be + ing para ações em progresso.', 'They are waiting for the bus.'],
                ['Past', 'Use was/were, passado verbal e did.', 'We went home. Did you call?'],
                ['Comparison', 'Use comparative + than.', 'The train is faster than the bus.'],
                ['Plans', 'Use be going to + verbo base.', 'I am going to travel next week.']
            ],
            stations: [
                { title: 'Mission 1: Meet Someone', instruction: 'Construa uma troca inicial completa.', items: [
                    ['Introduce', 'name Maya | Brazil | Recife', 'três informações', 'My name is Maya. I am from Brazil, and I live in Recife.'],
                    ['Question', 'nome completo', 'personal info', 'What is your full name?'],
                    ['Family', 'one brother | his name Ravi', 'have + possessive', 'I have one brother. His name is Ravi.'],
                    ['Close', 'despedida gentil', 'expressão', 'Nice to meet you. See you later.']
                ]},
                { title: 'Mission 2: Plan a Weekday', instruction: 'Leia a agenda e explique a rotina.', items: [
                    ['Routine', 'wake 6:30 | work 8:00', 'duas frases', 'I wake up at six thirty and start work at eight.'],
                    ['Question', 'class start time', 'does', 'What time does the class start?'],
                    ['Negative', 'not work Sunday', 'Present Simple', 'I do not work on Sunday.'],
                    ['Schedule', 'English | Tuesday | 7 p.m.', 'at/on', 'English class is on Tuesday at seven.']
                ]},
                { title: 'Mission 3: Order and Shop', instruction: 'Resolva uma compra de comida e roupa.', items: [
                    ['Order', 'coffee + sandwich', 'I’d like', 'I’d like a coffee and a sandwich, please.'],
                    ['Quantity', 'ask about juice', 'any', 'Do you have any juice?'],
                    ['Clothes', 'try jeans', 'try on', 'Can I try these jeans on?'],
                    ['Decision', 'fits well', 'take it', 'It fits well. I’ll take it.']
                ]},
                { title: 'Mission 4: Cross the City', instruction: 'Localize e dê a rota.', items: [
                    ['Existence', 'pharmacy near station', 'there is', 'There is a pharmacy near the station.'],
                    ['Location', 'bank opposite park', 'across from', 'The bank is across from the park.'],
                    ['Route', 'straight / right at lights / hotel left', 'instruções', 'Go straight, turn right at the traffic lights, and the hotel is on your left.'],
                    ['Question', 'museum route', 'how do I get', 'How do I get to the museum?']
                ]},
                { title: 'Mission 5: Solve a Real Need', instruction: 'Dê uma resposta útil em saúde, casa ou trabalho.', items: [
                    ['Health', 'headache + advice', 'should', 'You have a headache. You should get some rest.'],
                    ['Home', 'keys under sofa', 'where answer', 'The keys are under the sofa.'],
                    ['Ability', 'use projector', 'can', 'I can use the projector.'],
                    ['Obligation', 'arrive before nine', 'have to', 'We have to arrive before nine.']
                ]},
                { title: 'Mission 6: Travel on a Special Day', instruction: 'Conecte passagem, data e horário.', items: [
                    ['Ticket', 'return to Oxford', 'could', 'Could I have a return ticket to Oxford?'],
                    ['Departure', 'platform 4 | 10:15', 'frase', 'The train leaves from platform four at ten fifteen.'],
                    ['Invitation', 'birthday | Saturday | 7 p.m.', 'would like', 'Would you like to come to my birthday party on Saturday at seven?'],
                    ['Delay', 'bus 20 minutes', 'delayed', 'The bus is delayed by twenty minutes.']
                ]},
                { title: 'Mission 7: Describe the Screen', instruction: 'Diga o que está acontecendo e dê uma instrução tecnológica.', items: [
                    ['Now', 'Maya / wait / station', 'Present Continuous', 'Maya is waiting at the station.'],
                    ['Now', 'players / warm up', 'plural', 'The players are warming up.'],
                    ['Tech', 'phone frozen', 'restart', 'Turn it off, wait, and turn it on again.'],
                    ['Files', 'important photos', 'back up', 'Back them up before you reset the phone.']
                ]},
                { title: 'Mission 8: Past, Choice and Plan', instruction: 'Conecte ontem, uma escolha e o próximo passo.', items: [
                    ['Past', 'visit family last weekend', 'Past Simple', 'I visited my family last weekend.'],
                    ['Question', 'go by bus?', 'did + base', 'Did you go by bus?'],
                    ['Compare', 'train faster than bus', 'comparative', 'The train is faster than the bus.'],
                    ['Plan', 'travel next month', 'going to', 'I am going to travel next month.']
                ]}
            ],
            reading: {
                title: 'A complete Saturday in a new city',
                text: 'Last Saturday, Maya visited her cousin in a new city. She traveled by train because it was faster than the bus. At the station, her cousin was waiting near a café. They had lunch, walked through a park, and visited a small museum. In the evening, Maya had a headache, so they went home early and she rested. Next month, Maya is going to return for her cousin’s birthday. She is going to stay for the whole weekend.',
                questions: [
                    ['Why did Maya travel by train?', 'Because it was faster than the bus.'],
                    ['Where was her cousin waiting?', 'Her cousin was waiting near a café.'],
                    ['Why did they go home early?', 'Because Maya had a headache.'],
                    ['What is Maya going to do next month?', 'She is going to return for her cousin’s birthday.']
                ]
            },
            music: { song: 'On Top of the World', artist: 'Imagine Dragons', spotifyId: '6KuHjfXHkfnIjdmcIvt9r0', lines: [
                ['I know my ___ and I can introduce myself.', 'name'],
                ['I talk about yesterday and what I ___ then.', 'did'],
                ['Today I am ___ every useful word.', 'using'],
                ['Tomorrow I am going to follow my new ___ .', 'plan'],
                ['Step by step, my English becomes ___ .', 'stronger']
            ]},
            homework: {
                instruction: 'Escolha um projeto final e prepare 10 a 12 frases organizadas. Use o texto como apoio para uma apresentação ao vivo com perguntas do professor.',
                themes: ['Minha rotina, meu último fim de semana e meu próximo plano', 'Um visitante passa um fim de semana na minha cidade', 'Perfil e planos de uma pessoa que começa um curso novo'],
                checklist: ['Inclua presente, passado e going to.', 'Use uma comparação e uma necessidade real.', 'Prepare respostas para três perguntas do professor.']
            }
        }
    };

    window.A1V2_DATA = { lessonTitles, unitLabels, lessons, reviews };
}());
