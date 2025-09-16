// js/vocabulary.js

const lessonVocabulary = {
    '1': {
        words: [
            { english: 'Hello', portuguese: 'Olá' },
            { english: 'Hi', portuguese: 'Oi' },
            { english: 'I', portuguese: 'Eu' },
            { english: 'You', portuguese: 'Você' },
            { english: 'Am', portuguese: 'Sou, estou' },
            { english: 'Are', portuguese: 'É, está, são, estão' },
            { english: 'From', portuguese: 'De, do, da' },
            { english: 'A', portuguese: 'Um, uma' },
            { english: 'An', portuguese: 'Um, uma (usado antes de som de vogal)' },
            { english: 'Teacher', portuguese: 'Professor(a)' },
            { english: 'Student', portuguese: 'Estudante' },
            { english: 'Doctor', portuguese: 'Médico(a)' },
            { english: 'Engineer', portuguese: 'Engenheiro(a)' },
            { english: 'Brazil', portuguese: 'Brasil' },
            { english: 'Canada', portuguese: 'Canadá' },
            { english: 'Friend', portuguese: 'Amigo(a)' },
            { english: 'Name', portuguese: 'Nome' },
            { english: 'Good morning', portuguese: 'Bom dia' },
            { english: 'Good afternoon', portuguese: 'Boa tarde' },
            { english: 'Good evening', portuguese: 'Boa noite (ao chegar)' },
            { english: 'Good night', portuguese: 'Boa noite (ao sair/dormir)' },
            { english: 'Nice', portuguese: 'Agradável, legal' },
            { english: 'Meet', portuguese: 'Conhecer' }
        ],
        expressions: [
            { english: 'Hello, my name is...', portuguese: 'Olá, meu nome é...' },
            { english: 'Hi, how are you?', portuguese: 'Oi, como você está?' },
            { english: "I'm from...", portuguese: 'Eu sou de...' },
            { english: 'Nice to meet you.', portuguese: 'Prazer em te conhecer.' },
            { english: 'What about you?', portuguese: 'E você?' },
            { english: 'What is your name?', portuguese: 'Qual é o seu nome?' },
            { english: "I'm fine, thank you.", portuguese: 'Estou bem, obrigado(a).' },
            { english: "Pleased to meet you.", portuguese: 'Prazer em te conhecer.' },
            { english: "Where are you from?", portuguese: "De onde você é?" }
        ],
        verbs: {
            present: [{ english: 'to be', portuguese: 'ser, estar' }, { english: 'to meet', portuguese: 'conhecer' }],
            past_simple: [{ english: 'was', portuguese: 'ser, estar' }, { english: 'were', portuguese: 'ser, estar' }, { english: 'met', portuguese: 'conhecer' }],
            past_participle: [{ english: 'been', portuguese: 'ser, estar' }, { english: 'met', portuguese: 'conhecer' }]
        }
    },
    '2': {
        words: [
            { english: 'Where', portuguese: 'Onde' },
            { english: 'City', portuguese: 'Cidade' },
            { english: 'Country', portuguese: 'País' },
            { english: 'Nationality', portuguese: 'Nacionalidade' },
            { english: 'Address', portuguese: 'Endereço' },
            { english: 'Street', portuguese: 'Rua' },
            { english: 'House', portuguese: 'Casa' },
            { english: 'Apartment', portuguese: 'Apartamento' },
            { english: 'Here', portuguese: 'Aqui' },
            { english: 'There', portuguese: 'Lá' },
            { english: 'Home', portuguese: 'Lar, casa' },
            { english: 'State', portuguese: 'Estado' },
            { english: 'Neighbor', portuguese: 'Vizinho(a)' },
            { english: 'Map', portuguese: 'Mapa' },
            { english: 'Globe', portuguese: 'Globo terrestre' },
            { english: 'Language', portuguese: 'Idioma' },
            { english: 'Capital', portuguese: 'Capital' },
            { english: 'Continent', portuguese: 'Continente' }
        ],
        expressions: [
            { english: 'Where are you from?', portuguese: 'De onde você é?' },
            { english: "I'm from Rio.", portuguese: 'Eu sou do Rio.' },
            { english: "What's your address?", portuguese: 'Qual é o seu endereço?' },
            { english: "What country is this?", portuguese: 'Que país é este?' },
            { english: "Do you live here?", portuguese: 'Você mora aqui?' },
            { english: "I'm a citizen of Brazil.", portuguese: "Eu sou um(a) cidadão(ã) do Brasil." },
            { english: "What language do you speak?", portuguese: "Que idioma você fala?" },
            { english: "Where is your family from?", portuguese: "De onde sua família é?" }
        ],
        verbs: {
            present: [{ english: 'to live', portuguese: 'morar, viver' }, { english: 'to speak', portuguese: 'falar' }, { english: 'to travel', portuguese: 'viajar' }],
            past_simple: [{ english: 'lived', portuguese: 'morar, viver' }, { english: 'spoke', portuguese: 'falar' }, { english: 'traveled', portuguese: 'viajar' }],
            past_participle: [{ english: 'lived', portuguese: 'morar, viver' }, { english: 'spoken', portuguese: 'falar' }, { english: 'traveled', portuguese: 'viajar' }]
        }
    },
    '3': {
        words: [
            { english: 'My', portuguese: 'Meu/minha' },
            { english: 'Your', portuguese: 'Seu/sua' },
            { english: 'His', portuguese: 'Dele' },
            { english: 'Her', portuguese: 'Dela' },
            { english: 'It', portuguese: 'Ele/ela (para objetos)' },
            { english: 'Our', portuguese: 'Nosso/nossa' },
            { english: 'Their', portuguese: 'Deles/delas' },
            { english: 'Brother', portuguese: 'Irmão' },
            { english: 'Sister', portuguese: 'Irmã' },
            { english: 'Father', portuguese: 'Pai' },
            { english: 'Mother', portuguese: 'Mãe' },
            { english: 'Family', portuguese: 'Família' },
            { english: 'Parents', portuguese: 'Pais' },
            { english: 'Grandfather', portuguese: 'Avô' },
            { english: 'Grandmother', portuguese: 'Avó' },
            { english: 'Grandparents', portuguese: 'Avós' },
            { english: 'Uncle', portuguese: 'Tio' },
            { english: 'Aunt', portuguese: 'Tia' },
            { english: 'Cousin', portuguese: 'Primo(a)' },
            { english: 'Child', portuguese: 'Criança' },
            { english: 'Children', portuguese: 'Crianças' },
            { english: 'Son', portuguese: 'Filho' },
            { english: 'Daughter', portuguese: 'Filha' },
            { english: 'Pet', portuguese: 'Animal de estimação' },
            { english: 'Wife', portuguese: 'Esposa' },
            { english: 'Husband', portuguese: 'Marido' }
        ],
        expressions: [
            { english: 'This is my family.', portuguese: 'Esta é minha família.' },
            { english: 'His name is...', portuguese: 'O nome dele é...' },
            { english: 'Her name is...', portuguese: 'O nome dela é...' },
            { english: 'We are a big family.', portuguese: 'Nós somos uma família grande.' },
            { english: 'How many brothers and sisters do you have?', portuguese: 'Quantos irmãos e irmãs você tem?' },
            { english: "I have two children.", portuguese: "Eu tenho dois filhos." },
            { english: "This is our car.", portuguese: "Este é o nosso carro." },
            { english: "Their house is big.", portuguese: "A casa deles é grande." }
        ],
        verbs: {
            present: [{ english: 'to have', portuguese: 'ter' }, { english: 'to love', portuguese: 'amar' }, { english: 'to share', portuguese: 'compartilhar' }],
            past_simple: [{ english: 'had', portuguese: 'ter' }, { english: 'loved', portuguese: 'amar' }, { english: 'shared', portuguese: 'compartilhar' }],
            past_participle: [{ english: 'had', portuguese: 'ter' }, { english: 'loved', portuguese: 'amar' }, { english: 'shared', portuguese: 'compartilhar' }]
        }
    },
    '4': {
        words: [
            { english: 'Alphabet', portuguese: 'Alfabeto' },
            { english: 'Number', portuguese: 'Número' },
            { english: 'One', portuguese: 'Um' },
            { english: 'Two', portuguese: 'Dois' },
            { english: 'Ten', portuguese: 'Dez' },
            { english: 'Twenty', portuguese: 'Vinte' },
            { english: 'Thirty', portuguese: 'Trinta' },
            { english: 'Forty', portuguese: 'Quarenta' },
            { english: 'Fifty', portuguese: 'Cinquenta' },
            { english: 'Sixty', portuguese: 'Sessenta' },
            { english: 'Seventy', portuguese: 'Setenta' },
            { english: 'Eighty', portuguese: 'Oitenta' },
            { english: 'Ninety', portuguese: 'Noventa' },
            { english: 'One hundred', portuguese: 'Cem' },
            { english: 'Thousand', portuguese: 'Mil' },
            { english: 'Zero', portuguese: 'Zero' },
            { english: 'Age', portuguese: 'Idade' },
            { english: 'Phone', portuguese: 'Telefone' },
            { english: 'Email', portuguese: 'E-mail' },
            { english: 'Password', portuguese: 'Senha' }
        ],
        expressions: [
            { english: 'How old are you?', portuguese: 'Quantos anos você tem?' },
            { english: "I'm 25 years old.", portuguese: 'Eu tenho 25 anos.' },
            { english: 'What is your phone number?', portuguese: 'Qual é o seu número de telefone?' },
            { english: 'How do you spell your name?', portuguese: 'Como você soletra seu nome?' },
            { english: "My number is...", portuguese: "Meu número é..." },
            { english: "What's your email?", portuguese: "Qual é o seu e-mail?" },
            { english: "Can you count to ten?", portuguese: "Você pode contar até dez?" }
        ],
        verbs: {
            present: [{ english: 'to spell', portuguese: 'soletrar' }, { english: 'to count', portuguese: 'contar' }],
            past_simple: [{ english: 'spelled', portuguese: 'soletrar' }, { english: 'counted', portuguese: 'contar' }],
            past_participle: [{ english: 'spelled', portuguese: 'soletrar' }, { english: 'counted', portuguese: 'contar' }]
        }
    },
    '5': {
        words: [
            { english: 'Email', portuguese: 'E-mail' },
            { english: 'Phone', portuguese: 'Telefone' },
            { english: 'Cell phone', portuguese: 'Celular' },
            { english: 'Address', portuguese: 'Endereço' },
            { english: 'Street', portuguese: 'Rua' },
            { english: 'Avenue', portuguese: 'Avenida' },
            { english: 'Road', portuguese: 'Estrada' },
            { english: 'Zip code', portuguese: 'CEP' },
            { english: 'City', portuguese: 'Cidade' },
            { english: 'State', portuguese: 'Estado' },
            { english: 'Country', portuguese: 'País' },
            { english: 'Username', portuguese: 'Nome de usuário' },
            { english: 'Password', portuguese: 'Senha' },
            { english: 'Websites', portuguese: 'Sites' },
            { english: 'App', portuguese: 'Aplicativo' }
        ],
        expressions: [
            { english: 'What’s your email address?', portuguese: 'Qual é o seu endereço de e-mail?' },
            { english: 'My email is...', portuguese: 'Meu e-mail é...' },
            { english: 'What’s your phone number?', portuguese: 'Qual é o seu número de telefone?' },
            { english: 'What is your username?', portuguese: 'Qual é o seu nome de usuário?' },
            { english: 'My password is...', portuguese: 'Minha senha é...' },
            { english: "Can you tell me your address?", portuguese: "Você pode me dizer seu endereço?" }
        ],
        verbs: {
            present: [{ english: 'to use', portuguese: 'usar' }, { english: 'to register', portuguese: 'registrar' }],
            past_simple: [{ english: 'used', portuguese: 'usar' }, { english: 'registered', portuguese: 'registrar' }],
            past_participle: [{ english: 'used', portuguese: 'usar' }, { english: 'registered', portuguese: 'registrar' }]
        }
    },
    '6': {
        words: [
            { english: 'Table', portuguese: 'Mesa' },
            { english: 'Chair', portuguese: 'Cadeira' },
            { english: 'Book', portuguese: 'Livro' },
            { english: 'Pen', portuguese: 'Caneta' },
            { english: 'Pencil', portuguese: 'Lápis' },
            { english: 'Notebook', portuguese: 'Caderno' },
            { english: 'Bag', portuguese: 'Mochila, bolsa' },
            { english: 'Computer', portuguese: 'Computador' },
            { english: 'TV', portuguese: 'Televisão' },
            { english: 'Phone', portuguese: 'Telefone' },
            { english: 'Wallet', portuguese: 'Carteira' },
            { english: 'Keys', portuguese: 'Chaves' },
            { english: 'Glasses', portuguese: 'Óculos' },
            { english: 'Headphones', portuguese: 'Fones de ouvido' },
            { english: 'Desk', portuguese: 'Escrivaninha' },
            { english: 'Clock', portuguese: 'Relógio' },
            { english: 'Cup', portuguese: 'Copo' },
            { english: 'Bottle', portuguese: 'Garrafa' }
        ],
        expressions: [
            { english: 'What is this?', portuguese: 'O que é isso?' },
            { english: 'It’s a book.', portuguese: 'É um livro.' },
            { english: 'What are these?', portuguese: 'O que são estes?' },
            { english: "They're pencils.", portuguese: 'São lápis.' },
            { english: "Is this your bag?", portuguese: 'Essa é a sua mochila?' },
            { english: "These are my things.", portuguese: "Estas são as minhas coisas." },
            { english: "Where is the notebook?", portuguese: "Onde está o caderno?" }
        ],
        verbs: {
            present: [{ english: 'to have', portuguese: 'ter' }, { english: 'to put', portuguese: 'colocar' }],
            past_simple: [{ english: 'had', portuguese: 'ter' }, { english: 'put', portuguese: 'colocar' }],
            past_participle: [{ english: 'had', portuguese: 'ter' }, { english: 'put', portuguese: 'colocar' }]
        }
    },
    '7': {
        words: [
            { english: 'This', portuguese: 'Este/esta' },
            { english: 'That', portuguese: 'Aquele/aquela' },
            { english: 'These', portuguese: 'Estes/estas' },
            { english: 'Those', portuguese: 'Aqueles/aquelas' },
            { english: 'Box', portuguese: 'Caixa' },
            { english: 'Key', portuguese: 'Chave' },
            { english: 'Wallet', portuguese: 'Carteira' },
            { english: 'Headphones', portuguese: 'Fones de ouvido' },
            { english: 'Door', portuguese: 'Porta' },
            { english: 'Window', portuguese: 'Janela' },
            { english: 'Floor', portuguese: 'Chão' },
            { english: 'Wall', portuguese: 'Parede' },
            { english: 'Car', portuguese: 'Carro' },
            { english: 'Bicycle', portuguese: 'Bicicleta' },
            { english: 'Bag', portuguese: 'Bolsa' }
        ],
        expressions: [
            { english: 'Is this your book?', portuguese: 'Este é o seu livro?' },
            { english: 'Yes, it is.', portuguese: 'Sim, é.' },
            { english: "No, it isn't.", portuguese: 'Não, não é.' },
            { english: 'Are those your keys?', portuguese: 'Aquelas são suas chaves?' },
            { english: 'Yes, they are.', portuguese: 'Sim, são.' },
            { english: "That is my friend's car.", portuguese: "Aquele é o carro do meu amigo." },
            { english: "These are my new shoes.", portuguese: "Estes são meus sapatos novos." },
            { english: "Is that his phone?", portuguese: "Aquele é o telefone dele?" }
        ],
        verbs: {
            present: [{ english: 'to point', portuguese: 'apontar' }, { english: 'to open', portuguese: 'abrir' }],
            past_simple: [{ english: 'pointed', portuguese: 'apontar' }, { english: 'opened', portuguese: 'abrir' }],
            past_participle: [{ english: 'pointed', portuguese: 'apontar' }, { english: 'opened', portuguese: 'abrir' }]
        }
    },
    '8': {
        words: [
            { english: 'Review', portuguese: 'Revisão' },
            { english: 'Question', portuguese: 'Pergunta' },
            { english: 'Answer', portuguese: 'Resposta' },
            { english: 'Quiz', portuguese: 'Teste' },
            { english: 'Mistake', portuguese: 'Erro' },
            { english: 'Correction', portuguese: 'Correção' },
            { english: 'Example', portuguese: 'Exemplo' },
            { english: 'Rule', portuguese: 'Regra' },
            { english: 'Difficult', portuguese: 'Difícil' },
            { english: 'Easy', portuguese: 'Fácil' }
        ],
        expressions: [
            { english: "Let's review.", portuguese: 'Vamos revisar.' },
            { english: 'Do you have any questions?', portuguese: 'Você tem alguma pergunta?' },
            { english: 'How do you spell it?', portuguese: 'Como você soletra isso?' },
            { english: "What is the answer?", portuguese: "Qual é a resposta?" },
            { english: "Can you repeat that?", portuguese: "Você pode repetir isso?" },
            { english: "Let's check the answers.", portuguese: "Vamos verificar as respostas." },
            { english: "Could you give me an example?", portuguese: "Você poderia me dar um exemplo?" }
        ],
        verbs: {
            present: [{ english: 'to review', portuguese: 'revisar' }, { english: 'to ask', portuguese: 'perguntar' }, { english: 'to answer', portuguese: 'responder' }, { english: 'to correct', portuguese: 'corrigir' }],
            past_simple: [{ english: 'reviewed', portuguese: 'revisar' }, { english: 'asked', portuguese: 'perguntar' }, { english: 'answered', portuguese: 'responder' }, { english: 'corrected', portuguese: 'corrigir' }],
            past_participle: [{ english: 'reviewed', portuguese: 'revisar' }, { english: 'asked', portuguese: 'perguntar' }, { english: 'answered', portuguese: 'responder' }, { english: 'corrected', portuguese: 'corrigir' }]
        }
    },
    '9': {
        words: [
            { english: 'Routine', portuguese: 'Rotina' },
            { english: 'Morning', portuguese: 'Manhã' },
            { english: 'Afternoon', portuguese: 'Tarde' },
            { english: 'Evening', portuguese: 'Noite (fim de tarde)' },
            { english: 'Night', portuguese: 'Noite' },
            { english: 'Breakfast', portuguese: 'Café da manhã' },
            { english: 'Lunch', portuguese: 'Almoço' },
            { english: 'Dinner', portuguese: 'Jantar' },
            { english: 'Work', portuguese: 'Trabalho' },
            { english: 'Study', portuguese: 'Estudo' },
            { english: 'School', portuguese: 'Escola' },
            { english: 'Home', portuguese: 'Casa' },
            { english: 'Weekend', portuguese: 'Fim de semana' },
            { english: 'Shower', portuguese: 'Banho' },
            { english: 'Teeth', portuguese: 'Dentes' }
        ],
        expressions: [
            { english: 'What is your routine?', portuguese: 'Qual é a sua rotina?' },
            { english: 'I wake up at...', portuguese: 'Eu acordo às...' },
            { english: 'I go to bed at...', portuguese: 'Eu vou para a cama às...' },
            { english: 'I have breakfast at...', portuguese: 'Eu tomo café da manhã às...' },
            { english: 'I go to work by car.', portuguese: 'Eu vou para o trabalho de carro.' },
            { english: 'I finish work at...', portuguese: 'Eu termino o trabalho às...' },
            { english: "What time do you wake up?", portuguese: "Que horas você acorda?" },
            { english: "I take a shower every morning.", portuguese: "Eu tomo banho toda manhã." }
        ],
        verbs: {
            present: [
                { english: 'to wake up', portuguese: 'acordar' },
                { english: 'to get up', portuguese: 'levantar' },
                { english: 'to go to bed', portuguese: 'ir para a cama' },
                { english: 'to work', portuguese: 'trabalhar' },
                { english: 'to study', portuguese: 'estudar' },
                { english: 'to have', portuguese: 'ter' },
                { english: 'to eat', portuguese: 'comer' },
                { english: 'to take', portuguese: 'pegar, tomar' }
            ],
            past_simple: [
                { english: 'woke up', portuguese: 'acordar' },
                { english: 'got up', portuguese: 'levantar' },
                { english: 'went to bed', portuguese: 'ir para a cama' },
                { english: 'worked', portuguese: 'trabalhar' },
                { english: 'studied', portuguese: 'estudar' },
                { english: 'had', portuguese: 'ter' },
                { english: 'ate', portuguese: 'comer' },
                { english: 'took', portuguese: 'pegar, tomar' }
            ],
            past_participle: [
                { english: 'woken up', portuguese: 'acordar' },
                { english: 'got up', portuguese: 'levantar' },
                { english: 'gone to bed', portuguese: 'ir para a cama' },
                { english: 'worked', portuguese: 'trabalhar' },
                { english: 'studied', portuguese: 'estudar' },
                { english: 'had', portuguese: 'ter' },
                { english: 'eaten', portuguese: 'comer' },
                { english: 'taken', portuguese: 'pegar, tomar' }
            ]
        }
    },
    '10': {
        words: [
            { english: 'He', portuguese: 'Ele' },
            { english: 'She', portuguese: 'Ela' },
            { english: 'His', portuguese: 'Dele' },
            { english: 'Her', portuguese: 'Dela' },
            { english: 'Gets up', portuguese: 'Levanta-se' },
            { english: 'Has', portuguese: 'Tem' },
            { english: 'Goes', portuguese: 'Vai' },
            { english: 'Sleeps', portuguese: 'Dorme' },
            { english: 'Wakes up', portuguese: 'Acorda' },
            { english: 'Does', portuguese: 'Faz' },
            { english: 'Watches', portuguese: 'Assiste' },
            { english: 'Reads', portuguese: 'Lê' },
            { english: 'Drinks', portuguese: 'Bebe' }
        ],
        expressions: [
            { english: 'He has breakfast at...', portuguese: 'Ele toma café da manhã às...' },
            { english: 'She goes to work by bus.', portuguese: 'Ela vai para o trabalho de ônibus.' },
            { english: 'He watches TV in the evening.', portuguese: 'Ele assiste TV à noite.' },
            { english: 'She does her homework.', portuguese: 'Ela faz o dever de casa.' },
            { english: 'He sleeps late on weekends.', portuguese: 'Ele dorme tarde nos fins de semana.' },
            { english: "She reads a book before sleeping.", portuguese: "Ela lê um livro antes de dormir." },
            { english: "He drinks a lot of coffee.", portuguese: "Ele bebe muito café." }
        ],
        verbs: {
            present: [
                { english: 'to get up', portuguese: 'levantar' },
                { english: 'to have', portuguese: 'ter' },
                { english: 'to go', portuguese: 'ir' },
                { english: 'to sleep', portuguese: 'dormir' },
                { english: 'to do', portuguese: 'fazer' },
                { english: 'to watch', portuguese: 'assistir' },
                { english: 'to read', portuguese: 'ler' },
                { english: 'to drink', portuguese: 'beber' }
            ],
            past_simple: [
                { english: 'got up', portuguese: 'levantar' },
                { english: 'had', portuguese: 'ter' },
                { english: 'went', portuguese: 'ir' },
                { english: 'slept', portuguese: 'dormir' },
                { english: 'did', portuguese: 'fazer' },
                { english: 'watched', portuguese: 'assistir' },
                { english: 'read', portuguese: 'ler' },
                { english: 'drank', portuguese: 'beber' }
            ],
            past_participle: [
                { english: 'got up', portuguese: 'levantar' },
                { english: 'had', portuguese: 'ter' },
                { english: 'gone', portuguese: 'ir' },
                { english: 'slept', portuguese: 'dormir' },
                { english: 'done', portuguese: 'fazer' },
                { english: 'watched', portuguese: 'assistir' },
                { english: 'read', portuguese: 'ler' },
                { english: 'drunk', portuguese: 'beber' }
            ]
        }
    },
    '11': {
        words: [
            { english: 'Music', portuguese: 'Música' },
            { english: 'Movies', portuguese: 'Filmes' },
            { english: 'Sports', portuguese: 'Esportes' },
            { english: 'Reading', portuguese: 'Leitura' },
            { english: 'Cooking', portuguese: 'Cozinhar' },
            { english: 'Dance', portuguese: 'Dançar' },
            { english: 'Art', portuguese: 'Arte' },
            { english: 'Hobby', portuguese: 'Passatempo' },
            { english: 'Singing', portuguese: 'Cantar' },
            { english: 'Playing', portuguese: 'Jogar, tocar' },
            { english: 'Traveling', portuguese: 'Viajar' }
        ],
        expressions: [
            { english: 'Do you like music?', portuguese: 'Você gosta de música?' },
            { english: 'Yes, I do.', portuguese: 'Sim, eu gosto.' },
            { english: "No, I don't.", portuguese: 'Não, eu não gosto.' },
            { english: 'What do you like to do?', portuguese: 'O que você gosta de fazer?' },
            { english: "I like listening to music.", portuguese: "Eu gosto de ouvir música." },
            { english: "She loves to read.", portuguese: "Ela adora ler." },
            { english: "I enjoy watching movies.", portuguese: "Eu gosto de assistir filmes." },
            { english: "He prefers playing video games.", portuguese: "Ele prefere jogar videogames." }
        ],
        verbs: {
            present: [
                { english: 'to like', portuguese: 'gostar' },
                { english: 'to love', portuguese: 'amar, adorar' },
                { english: 'to enjoy', portuguese: 'apreciar, gostar' },
                { english: 'to prefer', portuguese: 'preferir' },
                { english: 'to read', portuguese: 'ler' },
                { english: 'to listen', portuguese: 'ouvir' },
                { english: 'to play', portuguese: 'jogar, tocar' },
                { english: 'to watch', portuguese: 'assistir' }
            ],
            past_simple: [
                { english: 'liked', portuguese: 'gostar' },
                { english: 'loved', portuguese: 'amar, adorar' },
                { english: 'enjoyed', portuguese: 'apreciar, gostar' },
                { english: 'preferred', portuguese: 'preferir' },
                { english: 'read', portuguese: 'ler' },
                { english: 'listened', portuguese: 'ouvir' },
                { english: 'played', portuguese: 'jogar, tocar' },
                { english: 'watched', portuguese: 'assistir' }
            ],
            past_participle: [
                { english: 'liked', portuguese: 'gostar' },
                { english: 'loved', portuguese: 'amar, adorar' },
                { english: 'enjoyed', portuguese: 'apreciar, gostar' },
                { english: 'preferred', portuguese: 'preferir' },
                { english: 'read', portuguese: 'ler' },
                { english: 'listened', portuguese: 'ouvir' },
                { english: 'played', portuguese: 'jogar, tocar' },
                { english: 'watched', portuguese: 'assistir' }
            ]
        }
    },
    '12': {
        words: [
            { english: 'Hate', portuguese: 'Odiar' },
            { english: 'Dislike', portuguese: 'Não gostar' },
            { english: 'Never', portuguese: 'Nunca' },
            { english: 'Anything', portuguese: 'Qualquer coisa' },
            { english: 'Nothing', portuguese: 'Nada' },
            { english: 'Food', portuguese: 'Comida' },
            { english: 'Vegetables', portuguese: 'Vegetais' },
            { english: 'Broccoli', portuguese: 'Brócolis' },
            { english: 'Spiders', portuguese: 'Aranhas' },
            { english: 'Snakes', portuguese: 'Cobras' },
            { english: 'Loud noise', portuguese: 'Barulho alto' },
            { english: 'Rainy days', portuguese: 'Dias chuvosos' }
        ],
        expressions: [
            { english: "I don't like that.", portuguese: 'Eu não gosto disso.' },
            { english: 'He hates broccoli.', portuguese: 'Ele odeia brócolis.' },
            { english: "I'm not a fan of...", portuguese: 'Eu não sou fã de...' },
            { english: "She never eats meat.", portuguese: "Ela nunca come carne." },
            { english: "Do you dislike anything?", portuguese: "Você não gosta de alguma coisa?" },
            { english: "I can't stand spiders.", portuguese: "Eu não suporto aranhas." }
        ],
        verbs: {
            present: [{ english: 'to hate', portuguese: 'odiar' }, { english: 'to dislike', portuguese: 'não gostar' }, { english: 'to stand', portuguese: 'suportar' }],
            past_simple: [{ english: 'hated', portuguese: 'odiar' }, { english: 'disliked', portuguese: 'não gostar' }, { english: 'stood', portuguese: 'suportar' }],
            past_participle: [{ english: 'hated', portuguese: 'odiar' }, { english: 'disliked', portuguese: 'não gostar' }, { english: 'stood', portuguese: 'suportar' }]
        }
    },
    '13': {
        words: [
            { english: 'Me', portuguese: 'Me, mim' },
            { english: 'You', portuguese: 'Te, a você' },
            { english: 'Him', portuguese: 'Lhe, a ele' },
            { english: 'Her', portuguese: 'Lhe, a ela' },
            { english: 'It', portuguese: 'Lhe, a ele/ela (objeto)' },
            { english: 'Us', portuguese: 'Nos, a nós' },
            { english: 'Them', portuguese: 'Lhes, a eles/elas' },
            { english: 'Help', portuguese: 'Ajuda' },
            { english: 'Gift', portuguese: 'Presente' },
            { english: 'Message', portuguese: 'Mensagem' },
            { english: 'Ball', portuguese: 'Bola' },
            { english: 'Book', portuguese: 'Livro' }
        ],
        expressions: [
            { english: 'He talks to me.', portuguese: 'Ele fala comigo.' },
            { english: 'She gives it to him.', portuguese: 'Ela dá isso a ele.' },
            { english: 'We love them.', portuguese: 'Nós os amamos.' },
            { english: 'Can you help us?', portuguese: 'Você pode nos ajudar?' },
            { english: "I will call you later.", portuguese: "Eu vou te ligar mais tarde." },
            { english: "Give her the book.", portuguese: "Dê o livro a ela." },
            { english: "He saw us at the park.", portuguese: "Ele nos viu no parque." }
        ],
        verbs: {
            present: [{ english: 'to call', portuguese: 'ligar, chamar' }, { english: 'to help', portuguese: 'ajudar' }, { english: 'to see', portuguese: 'ver' }, { english: 'to give', portuguese: 'dar' }],
            past_simple: [{ english: 'called', portuguese: 'ligar, chamar' }, { english: 'helped', portuguese: 'ajudar' }, { english: 'saw', portuguese: 'ver' }, { english: 'gave', portuguese: 'dar' }],
            past_participle: [{ english: 'called', portuguese: 'ligar, chamar' }, { english: 'helped', portuguese: 'ajudar' }, { english: 'seen', portuguese: 'ver' }, { english: 'given', portuguese: 'dar' }]
        }
    },
    '14': {
        words: [
            { english: 'Often', portuguese: 'Frequentemente' },
            { english: 'Sometimes', portuguese: 'Às vezes' },
            { english: 'Always', portuguese: 'Sempre' },
            { english: 'Usually', portuguese: 'Geralmente' },
            { english: 'Rarely', portuguese: 'Raramente' },
            { english: 'Every day', portuguese: 'Todos os dias' },
            { english: 'Once a week', portuguese: 'Uma vez por semana' },
            { english: 'Twice a month', portuguese: 'Duas vezes por mês' },
            { english: 'Every weekend', portuguese: 'Todo fim de semana' },
            { english: 'From time to time', portuguese: 'De vez em quando' },
            { english: 'Never', portuguese: 'Nunca' }
        ],
        expressions: [
            { english: 'How often do you study?', portuguese: 'Com que frequência você estuda?' },
            { english: 'I always read before bed.', portuguese: 'Eu sempre leio antes de dormir.' },
            { english: 'She rarely goes to the gym.', portuguese: 'Ela raramente vai à academia.' },
            { english: 'We usually watch a movie on Fridays.', portuguese: 'Nós geralmente assistimos a um filme nas sextas.' },
            { english: "They play soccer twice a week.", portuguese: "Eles jogam futebol duas vezes por semana." },
            { english: "He never drinks coffee.", portuguese: "Ele nunca bebe café." }
        ],
        verbs: {
            present: [{ english: 'to visit', portuguese: 'visitar' }, { english: 'to drive', portuguese: 'dirigir' }, { english: 'to travel', portuguese: 'viajar' }, { english: 'to cook', portuguese: 'cozinhar' }],
            past_simple: [{ english: 'visited', portuguese: 'visitar' }, { english: 'drove', portuguese: 'dirigir' }, { english: 'traveled', portuguese: 'viajar' }, { english: 'cooked', portuguese: 'cozinhar' }],
            past_participle: [{ english: 'visited', portuguese: 'visitar' }, { english: 'driven', portuguese: 'dirigir' }, { english: 'traveled', portuguese: 'viajar' }, { english: 'cooked', portuguese: 'cozinhar' }]
        }
    },
    '15': {
        words: [
            { english: 'Time', portuguese: 'Tempo, hora' },
            { english: 'O\'clock', portuguese: 'Em ponto' },
            { english: 'Half past', portuguese: 'E meia' },
            { english: 'Quarter past', portuguese: 'E quinze' },
            { english: 'Quarter to', portuguese: 'Quinze para' },
            { english: 'Morning', portuguese: 'Manhã' },
            { english: 'Afternoon', portuguese: 'Tarde' },
            { english: 'Evening', portuguese: 'Noite (fim de tarde)' },
            { english: 'Minute', portuguese: 'Minuto' },
            { english: 'Hour', portuguese: 'Hora' },
            { english: 'At noon', portuguese: 'Ao meio-dia' },
            { english: 'At midnight', portuguese: 'À meia-noite' }
        ],
        expressions: [
            { english: 'What time is it?', portuguese: 'Que horas são?' },
            { english: 'It\'s two o\'clock.', portuguese: 'São duas em ponto.' },
            { english: 'It\'s half past three.', portuguese: 'São três e meia.' },
            { english: 'It\'s a quarter to four.', portuguese: 'São quinze para as quatro.' },
            { english: 'It\'s ten minutes past seven.', portuguese: 'São dez minutos depois das sete.' },
            { english: 'My class starts at eight.', portuguese: 'Minha aula começa às oito.' },
            { english: "What time do you have lunch?", portuguese: "Que horas você almoça?" }
        ],
        verbs: {
            present: [{ english: 'to start', portuguese: 'começar' }, { english: 'to finish', portuguese: 'terminar' }, { english: 'to arrive', portuguese: 'chegar' }, { english: 'to leave', portuguese: 'sair' }],
            past_simple: [{ english: 'started', portuguese: 'começar' }, { english: 'finished', portuguese: 'terminar' }, { english: 'arrived', portuguese: 'chegar' }, { english: 'left', portuguese: 'sair' }],
            past_participle: [{ english: 'started', portuguese: 'começar' }, { english: 'finished', portuguese: 'terminar' }, { english: 'arrived', portuguese: 'chegar' }, { english: 'left', portuguese: 'sair' }]
        }
    },
    '16': {
        words: [
            { english: 'Review', portuguese: 'Revisão' },
            { english: 'Question', portuguese: 'Pergunta' },
            { english: 'Answer', portuguese: 'Resposta' },
            { english: 'Practice', portuguese: 'Prática' },
            { english: 'Difficult', portuguese: 'Difícil' },
            { english: 'Easy', portuguese: 'Fácil' },
            { english: 'Topic', portuguese: 'Tópico' },
            { english: 'Mistake', portuguese: 'Erro' }
        ],
        expressions: [
            { english: "Let's review.", portuguese: 'Vamos revisar.' },
            { english: 'Can you repeat?', portuguese: 'Você pode repetir?' },
            { english: 'What does this mean?', portuguese: 'O que isso significa?' },
            { english: 'How do you say...?', portuguese: 'Como você diz...?' },
            { english: "Is this correct?", portuguese: "Isso está correto?" },
            { english: "I don't understand.", portuguese: "Eu não entendo." },
            { english: "Could you explain that again?", portuguese: "Você poderia explicar isso de novo?" }
        ],
        verbs: {
            present: [{ english: 'to remember', portuguese: 'lembrar' }, { english: 'to understand', portuguese: 'entender' }, { english: 'to explain', portuguese: 'explicar' }, { english: 'to practice', portuguese: 'praticar' }],
            past_simple: [{ english: 'remembered', portuguese: 'lembrar' }, { english: 'understood', portuguese: 'entender' }, { english: 'explained', portuguese: 'explicar' }, { english: 'practiced', portuguese: 'praticar' }],
            past_participle: [{ english: 'remembered', portuguese: 'lembrar' }, { english: 'understood', portuguese: 'entender' }, { english: 'explained', portuguese: 'explicar' }, { english: 'practiced', portuguese: 'praticar' }]
        }
    },
    '17': {
        words: [
            { english: 'Friend\'s car', portuguese: 'Carro do amigo' },
            { english: 'Sister\'s bag', portuguese: 'Bolsa da irmã' },
            { english: 'Parents\' house', portuguese: 'Casa dos pais' },
            { english: 'Book', portuguese: 'Livro' },
            { english: 'Phone', portuguese: 'Telefone' },
            { english: 'Dog', portuguese: 'Cachorro' },
            { english: 'Name', portuguese: 'Nome' },
            { english: 'Color', portuguese: 'Cor' },
            { english: 'Toy', portuguese: 'Brinquedo' },
            { english: 'Possession', portuguese: 'Posse' },
            { english: 'Belonging', portuguese: 'Pertence' }
        ],
        expressions: [
            { english: "This is my friend's book.", portuguese: 'Este é o livro do meu amigo.' },
            { english: "That's my sister's dog.", portuguese: 'Aquele é o cachorro da minha irmã.' },
            { english: "I'm going to my parents' house.", portuguese: 'Eu estou indo para a casa dos meus pais.' },
            { english: "What is your brother's name?", portuguese: 'Qual é o nome do seu irmão?' },
            { english: "The car's color is red.", portuguese: "A cor do carro é vermelha." },
            { english: "Whose bag is this?", portuguese: "De quem é esta bolsa?" }
        ],
        verbs: [
            { english: 'to belong', portuguese: 'pertencer' }, 
            { english: 'to own', portuguese: 'possuir' }
        ],
        past_simple: [
            { english: 'belonged', portuguese: 'pertencer' }, 
            { english: 'owned', portuguese: 'possuir' }
        ],
        past_participle: [
            { english: 'belonged', portuguese: 'pertencer' }, 
            { english: 'owned', portuguese: 'possuir' }
        ]
    },
    '18': {
        words: [
            { english: 'Job', portuguese: 'Trabalho, emprego' },
            { english: 'Profession', portuguese: 'Profissão' },
            { english: 'Doctor', portuguese: 'Médico(a)' },
            { english: 'Teacher', portuguese: 'Professor(a)' },
            { english: 'Engineer', portuguese: 'Engenheiro(a)' },
            { english: 'Nurse', portuguese: 'Enfermeiro(a)' },
            { english: 'Cook', portuguese: 'Cozinheiro(a)' },
            { english: 'Waiter', portuguese: 'Garçom' },
            { english: 'Cashier', portuguese: 'Caixa' },
            { english: 'Artist', portuguese: 'Artista' },
            { english: 'Student', portuguese: 'Estudante' },
            { english: 'Pilot', portuguese: 'Piloto' },
            { english: 'Manager', portuguese: 'Gerente' },
            { english: 'Office', portuguese: 'Escritório' },
            { english: 'Company', portuguese: 'Empresa' }
        ],
        expressions: [
            { english: 'What is your job?', portuguese: 'Qual é o seu trabalho?' },
            { english: "I'm a student.", portuguese: 'Eu sou um estudante.' },
            { english: 'She works as a nurse.', portuguese: 'Ela trabalha como enfermeira.' },
            { english: 'He is a pilot.', portuguese: 'Ele é um piloto.' },
            { english: "Where do you work?", portuguese: "Onde você trabalha?" },
            { english: "I work for a big company.", portuguese: "Eu trabalho para uma grande empresa." }
        ],
        verbs: {
            present: [{ english: 'to work', portuguese: 'trabalhar' }, { english: 'to manage', portuguese: 'gerenciar' }, { english: 'to teach', portuguese: 'ensinar' }],
            past_simple: [{ english: 'worked', portuguese: 'trabalhar' }, { english: 'managed', portuguese: 'gerenciar' }, { english: 'taught', portuguese: 'ensinar' }],
            past_participle: [{ english: 'worked', portuguese: 'trabalhar' }, { english: 'managed', portuguese: 'gerenciar' }, { english: 'taught', portuguese: 'ensinar' }]
        }
    },
    '19': {
        words: [
            { english: 'House', portuguese: 'Casa' },
            { english: 'Apartment', portuguese: 'Apartamento' },
            { english: 'Room', portuguese: 'Quarto, cômodo' },
            { english: 'Living room', portuguese: 'Sala de estar' },
            { english: 'Kitchen', portuguese: 'Cozinha' },
            { english: 'Bedroom', portuguese: 'Quarto de dormir' },
            { english: 'Bathroom', portuguese: 'Banheiro' },
            { english: 'Garden', portuguese: 'Jardim' },
            { english: 'Garage', portuguese: 'Garagem' },
            { english: 'Balcony', portuguese: 'Varanda' },
            { english: 'Dining room', portuguese: 'Sala de jantar' },
            { english: 'Furniture', portuguese: 'Móveis' },
            { english: 'Bed', portuguese: 'Cama' },
            { english: 'Sofa', portuguese: 'Sofá' },
            { english: 'Table', portuguese: 'Mesa' },
            { english: 'Chair', portuguese: 'Cadeira' }
        ],
        expressions: [
            { english: "This is my house.", portuguese: 'Esta é a minha casa.' },
            { english: 'My house has three bedrooms.', portuguese: 'Minha casa tem três quartos.' },
            { english: 'Is there a bathroom?', portuguese: 'Tem um banheiro?' },
            { english: "The kitchen is big.", portuguese: "A cozinha é grande." },
            { english: "I live in an apartment.", portuguese: "Eu moro em um apartamento." },
            { english: "My room has a big window.", portuguese: "Meu quarto tem uma janela grande." }
        ],
        verbs: {
            present: [{ english: 'to live', portuguese: 'morar' }, { english: 'to have', portuguese: 'ter' }, { english: 'to decorate', portuguese: 'decorar' }],
            past_simple: [{ english: 'lived', portuguese: 'morar' }, { english: 'had', portuguese: 'ter' }, { english: 'decorated', portuguese: 'decorar' }],
            past_participle: [{ english: 'lived', portuguese: 'morar' }, { english: 'had', portuguese: 'ter' }, { english: 'decorated', portuguese: 'decorar' }]
        }
    },
    '20': {
        words: [
            { english: 'Bank', portuguese: 'Banco' },
            { english: 'Post office', portuguese: 'Correios' },
            { english: 'Restaurant', portuguese: 'Restaurante' },
            { english: 'Supermarket', portuguese: 'Supermercado' },
            { english: 'Pharmacy', portuguese: 'Farmácia' },
            { english: 'School', portuguese: 'Escola' },
            { english: 'Park', portuguese: 'Parque' },
            { english: 'Museum', portuguese: 'Museu' },
            { english: 'Hospital', portuguese: 'Hospital' },
            { english: 'Store', portuguese: 'Loja' },
            { english: 'Library', portuguese: 'Biblioteca' },
            { english: 'Gym', portuguese: 'Academia' },
            { english: 'Near', portuguese: 'Perto' },
            { english: 'Far', portuguese: 'Longe' },
            { english: 'Next to', portuguese: 'Ao lado de' },
            { english: 'Across from', portuguese: 'Em frente a' },
            { english: 'Between', portuguese: 'Entre' }
        ],
        expressions: [
            { english: 'Where is the bank?', portuguese: 'Onde é o banco?' },
            { english: 'It is next to the park.', portuguese: 'É ao lado do parque.' },
            { english: 'Go straight.', portuguese: 'Vá em frente.' },
            { english: 'Turn right.', portuguese: 'Vire à direita.' },
            { english: 'Turn left.', portuguese: 'Vire à esquerda.' },
            { english: 'How do I get to the...', portuguese: 'Como eu chego ao/à...?' },
            { english: 'Is there a supermarket near here?', portuguese: 'Tem um supermercado perto daqui?' },
            { english: "The museum is across from the library.", portuguese: "O museu é em frente à biblioteca." }
        ],
        verbs: {
            present: [{ english: 'to go', portuguese: 'ir' }, { english: 'to turn', portuguese: 'virar' }, { english: 'to find', portuguese: 'encontrar' }],
            past_simple: [{ english: 'went', portuguese: 'ir' }, { english: 'turned', portuguese: 'virar' }, { english: 'found', portuguese: 'encontrar' }],
            past_participle: [{ english: 'gone', portuguese: 'ir' }, { english: 'turned', portuguese: 'virar' }, { english: 'found', portuguese: 'encontrar' }]
        }
    },
    '21': {
        words: [
            { english: 'How much', portuguese: 'Quanto (para incontáveis)' },
            { english: 'How many', portuguese: 'Quantos (para contáveis)' },
            { english: 'Water', portuguese: 'Água' },
            { english: 'Money', portuguese: 'Dinheiro' },
            { english: 'Time', portuguese: 'Tempo' },
            { english: 'Apples', portuguese: 'Maçãs' },
            { english: 'Books', portuguese: 'Livros' },
            { english: 'Students', portuguese: 'Alunos' },
            { english: 'Sugar', portuguese: 'Açúcar' },
            { english: 'Milk', portuguese: 'Leite' },
            { english: 'Chairs', portuguese: 'Cadeiras' },
            { english: 'Information', portuguese: 'Informação' },
            { english: 'People', portuguese: 'Pessoas' }
        ],
        expressions: [
            { english: 'How much money do you have?', portuguese: 'Quanto dinheiro você tem?' },
            { english: 'How many people are there?', portuguese: 'Quantas pessoas há lá?' },
            { english: "I don't have much time.", portuguese: 'Eu não tenho muito tempo.' },
            { english: 'There are many students.', portuguese: 'Há muitos alunos.' },
            { english: "How much is this?", portuguese: "Quanto custa isso?" },
            { english: "How many books do you read?", portuguese: "Quantos livros você lê?" }
        ],
        verbs: {
            present: [{ english: 'to need', portuguese: 'precisar' }, { english: 'to cost', portuguese: 'custar' }],
            past_simple: [{ english: 'needed', portuguese: 'precisar' }, { english: 'cost', portuguese: 'custar' }],
            past_participle: [{ english: 'needed', portuguese: 'precisar' }, { english: 'cost', portuguese: 'custar' }]
        }
    },
    '22': {
        words: [
            { english: 'A little', portuguese: 'Um pouco de (incontável)' },
            { english: 'A few', portuguese: 'Alguns (contável)' },
            { english: 'Some', portuguese: 'Algum(uns), um pouco de' },
            { english: 'Any', portuguese: 'Nenhum, algum(uns)' },
            { english: 'Lot of', portuguese: 'Muito(s)' },
            { english: 'Enough', portuguese: 'Suficiente' },
            { english: 'Too much', portuguese: 'Demais (incontável)' },
            { english: 'Too many', portuguese: 'Demais (contável)' }
        ],
        expressions: [
            { english: 'I need a little help.', portuguese: 'Eu preciso de uma pequena ajuda.' },
            { english: 'He has a few friends.', portuguese: 'Ele tem alguns amigos.' },
            { english: 'Do you have any questions?', portuguese: 'Você tem alguma pergunta?' },
            { english: "I don't have any money.", portuguese: 'Eu não tenho nenhum dinheiro.' },
            { english: "We have a lot of work to do.", portuguese: "Nós temos muito trabalho a fazer." },
            { english: "There is some water.", portuguese: "Há um pouco de água." },
            { english: "I have some ideas.", portuguese: "Eu tenho algumas ideias." }
        ],
        verbs: {
            present: [{ english: 'to drink', portuguese: 'beber' }, { english: 'to eat', portuguese: 'comer' }],
            past_simple: [{ english: 'drank', portuguese: 'beber' }, { english: 'ate', portuguese: 'comer' }],
            past_participle: [{ english: 'drunk', portuguese: 'beber' }, { english: 'eaten', portuguese: 'comer' }]
        }
    },
    '23': {
        words: [
            { english: 'Can', portuguese: 'Poder, conseguir' },
            { english: 'Can\'t', portuguese: 'Não poder, não conseguir' },
            { english: 'Ability', portuguese: 'Habilidade' },
            { english: 'Permission', portuguese: 'Permissão' },
            { english: 'Swim', portuguese: 'Nadar' },
            { english: 'Drive', portuguese: 'Dirigir' },
            { english: 'Speak', portuguese: 'Falar' },
            { english: 'Help', portuguese: 'Ajudar' },
            { english: 'Run', portuguese: 'Correr' },
            { english: 'Sing', portuguese: 'Cantar' },
            { english: 'Cook', portuguese: 'Cozinhar' }
        ],
        expressions: [
            { english: 'Can you swim?', portuguese: 'Você sabe nadar?' },
            { english: 'Yes, I can.', portuguese: 'Sim, eu sei.' },
            { english: "No, I can't.", portuguese: 'Não, eu não sei.' },
            { english: 'She can speak three languages.', portuguese: 'Ela sabe falar três idiomas.' },
            { english: "Can I help you?", portuguese: "Posso te ajudar?" },
            { english: "They can't come tonight.", portuguese: "Eles não podem vir esta noite." },
            { english: "I can run fast.", portuguese: "Eu consigo correr rápido." }
        ],
        verbs: {
            present: [{ english: 'to swim', portuguese: 'nadar' }, { english: 'to drive', portuguese: 'dirigir' }, { english: 'to speak', portuguese: 'falar' }],
            past_simple: [{ english: 'swam', portuguese: 'nadar' }, { english: 'drove', portuguese: 'dirigir' }, { english: 'spoke', portuguese: 'falar' }],
            past_participle: [{ english: 'swum', portuguese: 'nadar' }, { english: 'driven', portuguese: 'dirigir' }, { english: 'spoken', portuguese: 'falar' }]
        }
    },
    '24': {
        words: [
            { english: 'Doing', portuguese: 'Fazendo' },
            { english: 'Reading', portuguese: 'Lendo' },
            { english: 'Writing', portuguese: 'Escrevendo' },
            { english: 'Sleeping', portuguese: 'Dormindo' },
            { english: 'Eating', portuguese: 'Comendo' },
            { english: 'Studying', portuguese: 'Estudando' },
            { english: 'Watching', portuguese: 'Assistindo' },
            { english: 'Listening', portuguese: 'Ouvindo' },
            { english: 'Playing', portuguese: 'Jogando' },
            { english: 'Cooking', portuguese: 'Cozinhando' }
        ],
        expressions: [
            { english: 'What are you doing?', portuguese: 'O que você está fazendo?' },
            { english: 'I am reading a book.', portuguese: 'Eu estou lendo um livro.' },
            { english: 'They are playing soccer.', portuguese: 'Eles estão jogando futebol.' },
            { english: 'He is sleeping right now.', portuguese: 'Ele está dormindo agora.' },
            { english: 'She is cooking dinner.', portuguese: 'Ela está cozinhando o jantar.' },
            { english: "We are watching TV.", portuguese: "Nós estamos assistindo TV." }
        ],
        verbs: {
            present: [{ english: 'to do', portuguese: 'fazer' }, { english: 'to read', portuguese: 'ler' }, { english: 'to write', portuguese: 'escrever' }, { english: 'to sleep', portuguese: 'dormir' }],
            past_simple: [{ english: 'did', portuguese: 'fazer' }, { english: 'read', portuguese: 'ler' }, { english: 'wrote', portuguese: 'escrever' }, { english: 'slept', portuguese: 'dormir' }],
            past_participle: [{ english: 'done', portuguese: 'fazer' }, { english: 'read', portuguese: 'ler' }, { english: 'written', portuguese: 'escrever' }, { english: 'slept', portuguese: 'dormir' }]
        }
    },
    '25': {
        words: [
            { english: 'Simple Present', portuguese: 'Presente Simples' },
            { english: 'Present Continuous', portuguese: 'Presente Contínuo' },
            { english: 'Habit', portuguese: 'Hábito' },
            { english: 'Action', portuguese: 'Ação' },
            { english: 'Now', portuguese: 'Agora' },
            { english: 'Always', portuguese: 'Sempre' },
            { english: 'Usually', portuguese: 'Geralmente' },
            { english: 'Right now', portuguese: 'Agora mesmo' },
            { english: 'Today', portuguese: 'Hoje' },
            { english: 'Every day', portuguese: 'Todos os dias' }
        ],
        expressions: [
            { english: 'I work every day. (Simple Present)', portuguese: 'Eu trabalho todos os dias.' },
            { english: 'I am working now. (Present Continuous)', portuguese: 'Eu estou trabalhando agora.' },
            { english: 'He watches TV. (Simple Present)', portuguese: 'Ele assiste TV.' },
            { english: 'He is watching TV. (Present Continuous)', portuguese: 'Ele está assistindo TV.' },
            { english: 'What do you do?', portuguese: 'O que você faz?' },
            { english: 'What are you doing?', portuguese: 'O que você está fazendo?' },
            { english: "She always drinks coffee.", portuguese: "Ela sempre toma café." }
        ],
        verbs: {
            present: [{ english: 'to work', portuguese: 'trabalhar' }, { english: 'to watch', portuguese: 'assistir' }, { english: 'to drink', portuguese: 'beber' }],
            past_simple: [{ english: 'worked', portuguese: 'trabalhar' }, { english: 'watched', portuguese: 'assistir' }, { english: 'drank', portuguese: 'beber' }],
            past_participle: [{ english: 'worked', portuguese: 'trabalhar' }, { english: 'watched', portuguese: 'assistir' }, { english: 'drunk', portuguese: 'beber' }]
        }
    },
    '26': {
        words: [
            { english: 'Progress', portuguese: 'Progresso' },
            { english: 'Practice', portuguese: 'Prática' },
            { english: 'Test', portuguese: 'Teste' },
            { english: 'Mistake', portuguese: 'Erro' },
            { english: 'Success', portuguese: 'Sucesso' },
            { english: 'Skill', portuguese: 'Habilidade' },
            { english: 'Improvement', portuguese: 'Melhoria' }
        ],
        expressions: [
            { english: "Let's practice.", portuguese: 'Vamos praticar.' },
            { english: 'You are making great progress.', portuguese: 'Você está fazendo um ótimo progresso.' },
            { english: "I'm ready for the test.", portuguese: "Eu estou pronto para o teste." },
            { english: "Don't worry about mistakes.", portuguese: "Não se preocupe com os erros." },
            { english: "Keep up the good work!", portuguese: "Continue com o bom trabalho!" }
        ],
        verbs: {
            present: [{ english: 'to practice', portuguese: 'praticar' }, { english: 'to improve', portuguese: 'melhorar' }, { english: 'to make', portuguese: 'fazer' }],
            past_simple: [{ english: 'practiced', portuguese: 'praticar' }, { english: 'improved', portuguese: 'melhorar' }, { english: 'made', portuguese: 'fazer' }],
            past_participle: [{ english: 'practiced', portuguese: 'praticar' }, { english: 'improved', portuguese: 'melhorar' }, { english: 'made', portuguese: 'fazer' }]
        }
    },
    '27': {
        words: [
            { english: 'Born', portuguese: 'Nascido' },
            { english: 'Where', portuguese: 'Onde' },
            { english: 'When', portuguese: 'Quando' },
            { english: 'Past', portuguese: 'Passado' },
            { english: 'Event', portuguese: 'Evento' },
            { english: 'Date', portuguese: 'Data' },
            { english: 'Year', portuguese: 'Ano' },
            { english: 'City', portuguese: 'Cidade' },
            { english: 'Birthday', portuguese: 'Aniversário' }
        ],
        expressions: [
            { english: 'Where were you born?', portuguese: 'Onde você nasceu?' },
            { english: "I was born in...", portuguese: 'Eu nasci em...' },
            { english: 'When were you born?', portuguese: 'Quando você nasceu?' },
            { english: 'I was born on...', portuguese: 'Eu nasci em...' },
            { english: "She was born in 1990.", portuguese: "Ela nasceu em 1990." },
            { english: "My birthday is in May.", portuguese: "Meu aniversário é em maio." }
        ],
        verbs: {
            present: [{ english: 'to be born', portuguese: 'nascer' }],
            past_simple: [{ english: 'was born', portuguese: 'nascer' }, { english: 'were born', portuguese: 'nascer' }],
            past_participle: [{ english: 'been born', portuguese: 'nascer' }]
        }
    },
    '28': {
        words: [
            { english: 'Yesterday', portuguese: 'Ontem' },
            { english: 'Last week', portuguese: 'Semana passada' },
            { english: 'Last month', portuguese: 'Mês passado' },
            { english: 'Last year', portuguese: 'Ano passado' },
            { english: 'Last night', portuguese: 'Noite passada' },
            { english: 'Weekend', portuguese: 'Fim de semana' },
            { english: 'Ago', portuguese: 'Atrás' },
            { english: 'Holiday', portuguese: 'Feriado, férias' }
        ],
        expressions: [
            { english: 'What did you do yesterday?', portuguese: 'O que você fez ontem?' },
            { english: 'I went to the park.', portuguese: 'Eu fui ao parque.' },
            { english: 'She played tennis.', portuguese: 'Ela jogou tênis.' },
            { english: "We ate at a restaurant.", portuguese: "Nós comemos em um restaurante." },
            { english: "They studied for the test.", portuguese: "Eles estudaram para o teste." },
            { english: "I went on holiday two years ago.", portuguese: "Eu fui de férias há dois anos." }
        ],
        verbs: {
            present: [
                { english: 'to go', portuguese: 'ir' }, 
                { english: 'to play', portuguese: 'jogar, brincar' }, 
                { english: 'to eat', portuguese: 'comer' }, 
                { english: 'to study', portuguese: 'estudar' },
                { english: 'to visit', portuguese: 'visitar' }
            ],
            past_simple: [
                { english: 'went', portuguese: 'ir' }, 
                { english: 'played', portuguese: 'jogar, brincar' }, 
                { english: 'ate', portuguese: 'comer' }, 
                { english: 'studied', portuguese: 'estudar' },
                { english: 'visited', portuguese: 'visitar' }
            ],
            past_participle: [
                { english: 'gone', portuguese: 'ir' }, 
                { english: 'played', portuguese: 'jogar, brincar' }, 
                { english: 'eaten', portuguese: 'comer' }, 
                { english: 'studied', portuguese: 'estudar' },
                { english: 'visited', portuguese: 'visitar' }
            ]
        }
    },
    '29': {
        words: [
            { english: 'Did', portuguese: 'Auxiliar de passado' },
            { english: 'Did not (didn\'t)', portuguese: 'Não (no passado)' },
            { english: 'Question', portuguese: 'Pergunta' },
            { english: 'Answer', portuguese: 'Resposta' },
            { english: 'What', portuguese: 'O que' },
            { english: 'Who', portuguese: 'Quem' },
            { english: 'When', portuguese: 'Quando' },
            { english: 'Where', portuguese: 'Onde' },
            { english: 'Why', portuguese: 'Por que' }
        ],
        expressions: [
            { english: 'Did you go to the beach?', portuguese: 'Você foi para a praia?' },
            { english: 'Yes, I did.', portuguese: 'Sim, eu fui.' },
            { english: "No, I didn't.", portuguese: 'Não, eu não fui.' },
            { english: 'What did he say?', portuguese: 'O que ele disse?' },
            { english: "When did they arrive?", portuguese: "Quando eles chegaram?" },
            { english: "Why did you call me?", portuguese: "Por que você me ligou?" },
            { english: "Who did you see?", portuguese: "Quem você viu?" }
        ],
        verbs: {
            present: [
                { english: 'to say', portuguese: 'dizer' }, 
                { english: 'to arrive', portuguese: 'chegar' }, 
                { english: 'to call', portuguese: 'ligar' }
            ],
            past_simple: [
                { english: 'said', portuguese: 'dizer' }, 
                { english: 'arrived', portuguese: 'chegar' }, 
                { english: 'called', portuguese: 'ligar' }
            ],
            past_participle: [
                { english: 'said', portuguese: 'dizer' }, 
                { english: 'arrived', portuguese: 'chegar' }, 
                { english: 'called', portuguese: 'ligar' }
            ]
        }
    },
    '30': {
        words: [
            { english: 'Future', portuguese: 'Futuro' },
            { english: 'Tomorrow', portuguese: 'Amanhã' },
            { english: 'Next week', portuguese: 'Semana que vem' },
            { english: 'Next month', portuguese: 'Mês que vem' },
            { english: 'Plans', portuguese: 'Planos' },
            { english: 'Trip', portuguese: 'Viagem' },
            { english: 'Movie', portuguese: 'Filme' },
            { english: 'Going to', portuguese: 'Vou, vai' },
            { english: 'Will', portuguese: 'Futuro simples' }
        ],
        expressions: [
            { english: 'What are you going to do tomorrow?', portuguese: 'O que você vai fazer amanhã?' },
            { english: 'I am going to travel.', portuguese: 'Eu vou viajar.' },
            { english: 'She is going to study.', portuguese: 'Ela vai estudar.' },
            { english: "We are going to watch a movie.", portuguese: "Nós vamos assistir a um filme." },
            { english: "Are you going to travel next month?", portuguese: "Você vai viajar no mês que vem?" },
            { english: "I think it will rain.", portuguese: "Eu acho que vai chover." },
            { english: "She will be a doctor.", portuguese: "Ela será uma médica." }
        ],
        verbs: {
            present: [{ english: 'to travel', portuguese: 'viajar' }, { english: 'to plan', portuguese: 'planejar' }],
            past_simple: [{ english: 'traveled', portuguese: 'viajar' }, { english: 'planned', portuguese: 'planejar' }],
            past_participle: [{ english: 'traveled', portuguese: 'viajar' }, { english: 'planned', portuguese: 'planejar' }]
        }
    },
    '31': {
        words: [
            { english: 'Final', portuguese: 'Final' },
            { english: 'Summary', portuguese: 'Resumo' },
            { english: 'Grammar', portuguese: 'Gramática' },
            { english: 'Vocabulary', portuguese: 'Vocabulário' },
            { english: 'Progress', portuguese: 'Progresso' },
            { english: 'Skill', portuguese: 'Habilidade' },
            { english: 'Knowledge', portuguese: 'Conhecimento' }
        ],
        expressions: [
            { english: "Let's summarize the module.", portuguese: 'Vamos resumir o módulo.' },
            { english: 'You have completed the module.', portuguese: 'Você completou o módulo.' },
            { english: "What did you learn?", portuguese: "O que você aprendeu?" },
            { english: "I have learned a lot.", portuguese: "Eu aprendi muito." },
            { english: "My English has improved.", portuguese: "Meu inglês melhorou." }
        ],
        verbs: {
            present: [{ english: 'to complete', portuguese: 'completar' }, { english: 'to learn', portuguese: 'aprender' }],
            past_simple: [{ english: 'completed', portuguese: 'completar' }, { english: 'learned', portuguese: 'aprender' }],
            past_participle: [{ english: 'completed', portuguese: 'completar' }, { english: 'learned', portuguese: 'aprender' }]
        }
    },
    '32': {
        words: [
            { english: 'Project', portuguese: 'Projeto' },
            { english: 'Presentation', portuguese: 'Apresentação' },
            { english: 'Review', portuguese: 'Revisão' },
            { english: 'Final', portuguese: 'Final' },
            { english: 'Speaking', portuguese: 'Falar' },
            { english: 'Writing', portuguese: 'Escrever' },
            { english: 'Topic', portuguese: 'Tópico' },
            { english: 'Performance', portuguese: 'Desempenho' }
        ],
        expressions: [
            { english: 'This is the final project.', portuguese: 'Este é o projeto final.' },
            { english: 'You did a great job!', portuguese: 'Você fez um ótimo trabalho!' },
            { english: "I'm ready for my presentation.", portuguese: "Eu estou pronto para a minha apresentação." },
            { english: "Your performance was excellent.", portuguese: "Seu desempenho foi excelente." }
        ],
        verbs: {
            present: [{ english: 'to present', portuguese: 'apresentar' }, { english: 'to finish', portuguese: 'terminar' }, { english: 'to prepare', portuguese: 'preparar' }],
            past_simple: [{ english: 'presented', portuguese: 'apresentar' }, { english: 'finished', portuguese: 'terminar' }, { english: 'prepared', portuguese: 'preparar' }],
            past_participle: [{ english: 'presented', portuguese: 'apresentar' }, { english: 'finished', portuguese: 'terminar' }, { english: 'prepared', portuguese: 'preparar' }]
        }
    }
};