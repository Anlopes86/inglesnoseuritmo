(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { v, x, p, t, line, dialogue, question, reading, activity, homework } = R.helpers;

    const alphabet = [
        ['A', '/eɪ/', 'êi'], ['B', '/biː/', 'bí'], ['C', '/siː/', 'cí'], ['D', '/diː/', 'dí'],
        ['E', '/iː/', 'í'], ['F', '/ef/', 'éf'], ['G', '/dʒiː/', 'djí'], ['H', '/eɪtʃ/', 'êitch'],
        ['I', '/aɪ/', 'ái'], ['J', '/dʒeɪ/', 'djêi'], ['K', '/keɪ/', 'kêi'], ['L', '/el/', 'él'],
        ['M', '/em/', 'ém'], ['N', '/en/', 'én'], ['O', '/oʊ/', 'ôu'], ['P', '/piː/', 'pí'],
        ['Q', '/kjuː/', 'kiú'], ['R', '/ɑːr/', 'ár'], ['S', '/es/', 'és'], ['T', '/tiː/', 'tí'],
        ['U', '/juː/', 'iú'], ['V', '/viː/', 'ví'], ['W', '/ˈdʌbəl.juː/', 'dâbol iú'],
        ['X', '/eks/', 'éks'], ['Y', '/waɪ/', 'uái'], ['Z', '/ziː/ (US) · /zed/ (UK)', 'zí / zéd']
    ];
    const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
    const audioButton = (text, label) => `<button type="button" class="foundation-audio" data-v3-speak="${text}" aria-label="Ouvir ${label}" title="Ouvir pronúncia"><i class="fas fa-volume-up" aria-hidden="true"></i></button>`;
    const alphabetSlide = () => `<section class="foundation-reference"><div class="slide-heading"><p class="lesson-panel-title">Alphabet & Pronunciation</p><h2>O alfabeto em inglês</h2><p>Ouça uma letra por vez e repita. A última linha é uma aproximação para falantes de português.</p></div><div class="alphabet-board">${alphabet.map(([letter, ipa, hint]) => `<article class="alphabet-tile"><strong>${letter}</strong><span>${ipa}</span><small>${hint}</small>${audioButton(letter, `a letra ${letter}`)}</article>`).join('')}</div><p class="foundation-note"><strong>Pratique em blocos:</strong> A–F, G–L, M–R e S–Z. Depois, soletre nomes sem consultar o quadro.</p></section>`;
    const numbersSlide = () => `<section class="foundation-reference"><div class="slide-heading"><p class="lesson-panel-title">Numbers 0–20</p><h2>Números de zero a vinte</h2><p>Leia em voz alta, ouça o modelo e depois pratique em ordem aleatória.</p></div><div class="number-board number-board-foundation">${numbers.map((word, number) => `<article class="number-tile"><strong>${number}</strong><span>${word}</span>${audioButton(word, `o número ${number}`)}</article>`).join('')}</div><div class="number-patterns"><p><strong>13–19:</strong> a maioria termina em <em>-teen</em>.</p><p><strong>Atenção:</strong> thirteen, fifteen e eighteen mudam a escrita.</p></div></section>`;

    R.register(4, R.lesson({
        title: 'Names Around the Class',
        objectives: [
            'Apresentar outra pessoa com he, she, his e her.',
            'Perguntar nome, origem, nacionalidade e idade em blocos curtos.',
            'Reconhecer e pronunciar as 26 letras do alfabeto.',
            'Compreender e produzir números de zero a vinte.'
        ],
        intro: [
            line('Emma', 'Who is he?', 'Quem é ele?'),
            line('Daniel', 'He is Mateo. His last name is Ruiz.', 'Ele é Mateo. O sobrenome dele é Ruiz.'),
            line('Emma', 'How do you spell his last name?', 'Como se soletra o sobrenome dele?'),
            line('Daniel', 'R-U-I-Z. He is from Spain. He is Spanish.', 'R-U-I-Z. Ele é da Espanha. Ele é espanhol.'),
            line('Emma', 'And who is she?', 'E quem é ela?'),
            line('Daniel', 'She is Olivia. Her nickname is Liv. She is British.', 'Ela é Olivia. O apelido dela é Liv. Ela é britânica.')
        ],
        vocab: [
            v('man', 'homem', 'He is a man.', 'Ele é um homem.'),
            v('woman', 'mulher', 'She is a woman.', 'Ela é uma mulher.'),
            v('friend', 'amigo(a)', 'She is my friend.', 'Ela é minha amiga.'),
            v('country', 'país', 'Brazil is a country.', 'O Brasil é um país.'),
            v('nationality', 'nacionalidade', 'Brazilian is a nationality.', 'Brasileiro é uma nacionalidade.'),
            v('Brazil / Brazilian', 'Brasil / brasileiro(a)', 'She is from Brazil. She is Brazilian.', 'Ela é do Brasil. Ela é brasileira.'),
            v('the United States / American', 'Estados Unidos / americano(a)', 'He is from the United States. He is American.', 'Ele é dos Estados Unidos. Ele é americano.'),
            v('the United Kingdom / British', 'Reino Unido / britânico(a)', 'She is from the United Kingdom. She is British.', 'Ela é do Reino Unido. Ela é britânica.'),
            v('Spain / Spanish', 'Espanha / espanhol(a)', 'He is from Spain. He is Spanish.', 'Ele é da Espanha. Ele é espanhol.'),
            v('age', 'idade', 'Her age is twenty.', 'A idade dela é vinte anos.'),
            v('letter', 'letra', 'The first letter is M.', 'A primeira letra é M.'),
            v('alphabet', 'alfabeto', 'The English alphabet has twenty-six letters.', 'O alfabeto inglês tem vinte e seis letras.'),
            v('spell', 'soletrar', 'Please spell your name.', 'Por favor, soletre seu nome.'),
            v('repeat', 'repetir', 'Please repeat the last letter.', 'Por favor, repita a última letra.')
        ],
        afterVocabularySlides: [
            { title: 'Alfabeto e pronúncia', body: alphabetSlide },
            { title: 'Números de 0 a 20', body: numbersSlide }
        ],
        grammar: {
            title: 'He is, she is, his e her',
            summary: 'Use he/his para um homem ou menino e she/her para uma mulher ou menina.',
            rows: [
                ['homem/menino', 'He is... / His name is...', 'He is Mateo. His name is Mateo.', 'Ele é Mateo. O nome dele é Mateo.'],
                ['mulher/menina', 'She is... / Her name is...', 'She is Olivia. Her name is Olivia.', 'Ela é Olivia. O nome dela é Olivia.'],
                ['origem', 'He/She is from + country', 'She is from Brazil.', 'Ela é do Brasil.'],
                ['nacionalidade', 'He/She is + nationality', 'She is Brazilian.', 'Ela é brasileira.'],
                ['idade', 'He/She is + number + years old', 'He is twenty years old.', 'Ele tem vinte anos.']
            ],
            notes: [
                'His e her aparecem antes da informação: his name, her country, his age.',
                'Não use a/an antes de nacionalidades: She is Brazilian.',
                'Em inglês, a idade usa be: She is twenty years old.'
            ]
        },
        activitySections: [
            activity('He, she, his ou her?', 'Observe a pessoa mencionada e escolha o pronome ou possessivo adequado.', [
                p('Choose', 'Mateo is a man. (He / She) is Spanish.', 'He'),
                p('Choose', 'Olivia is a woman. (He / She) is British.', 'She'),
                p('Choose', 'Mateo: (His / Her) last name is Ruiz.', 'His'),
                p('Choose', 'Olivia: (His / Her) nickname is Liv.', 'Her'),
                p('Complete', '___ is from Brazil. Her name is Laura.', 'She'),
                p('Complete', '___ name is Ethan. He is American.', 'His'),
                p('Correct', 'She name is Olivia.', 'Her name is Olivia.'),
                p('Correct', 'His is from Spain.', 'He is from Spain.'),
                p('Transform', 'Mateo is Spanish. → pronoun', 'He is Spanish.'),
                p('Transform', 'Olivia’s nickname is Liv. → possessive adjective', 'Her nickname is Liv.')
            ]),
            activity('Soletre e confirme nomes', 'Leia as letras, escreva o nome e depois soletre a resposta em voz alta.', [
                p('Spell', 'M-A-T-E-O', 'Mateo'),
                p('Spell', 'O-L-I-V-I-A', 'Olivia'),
                p('Spell', 'R-U-I-Z', 'Ruiz'),
                p('Spell', 'S-I-L-V-A', 'Silva'),
                p('Build', 'spell / do / How / Olivia / you / ?', 'How do you spell Olivia?'),
                p('Answer', 'How do you spell “Ana”?', 'A-N-A.'),
                p('Answer', 'You did not understand the last letter.', 'Please repeat the last letter.'),
                p('Correct', 'How you spell your name?', 'How do you spell your name?')
            ], 'Spelling Practice'),
            activity('Números, idade e perfis', 'Escreva números por extenso e use-os em informações pessoais.', [
                p('Number', '0', 'zero'),
                p('Number', '7', 'seven'),
                p('Number', '11', 'eleven'),
                p('Number', '12', 'twelve'),
                p('Number', '13', 'thirteen'),
                p('Number', '15', 'fifteen'),
                p('Number', '18', 'eighteen'),
                p('Number', '20', 'twenty'),
                p('Answer', 'How old is Mateo? Age: 19', 'He is nineteen years old.'),
                p('Answer', 'How old is Olivia? Age: 20', 'She is twenty years old.'),
                p('Describe', 'Laura Silva · Brazil · Brazilian · 18', 'She is Laura Silva. She is from Brazil. She is Brazilian. She is eighteen years old.'),
                p('Describe', 'Ethan Clark · United States · American · 20', 'He is Ethan Clark. He is from the United States. He is American. He is twenty years old.')
            ], 'Numbers 0–20')
        ],
        translations: [
            t('Quem é ele?', 'Who is he?'),
            t('Ele é Mateo.', 'He is Mateo.'),
            t('O sobrenome dele é Ruiz.', 'His last name is Ruiz.'),
            t('Quem é ela?', 'Who is she?'),
            t('O apelido dela é Liv.', 'Her nickname is Liv.'),
            t('Ela é do Brasil.', 'She is from Brazil.'),
            t('Ela é brasileira.', 'She is Brazilian.'),
            t('Ele tem dezenove anos.', 'He is nineteen years old.'),
            t('Como se soletra o nome dela?', 'How do you spell her name?'),
            t('Por favor, repita a última letra.', 'Please repeat the last letter.')
        ],
        expressions: [
            x('Who is he/she?', 'Quem é ele/ela?', 'Pergunta para identificar outra pessoa.', 'Who is she? She is Olivia.', 'Quem é ela? Ela é Olivia.'),
            x('His/Her name is...', 'O nome dele/dela é...', 'Use his ou her antes de name.', 'Her name is Olivia.', 'O nome dela é Olivia.'),
            x('Where is he/she from?', 'De onde ele/ela é?', 'Pergunta sobre país de origem.', 'Where is he from? He is from Spain.', 'De onde ele é? Ele é da Espanha.'),
            x('He/She is from...', 'Ele/Ela é de...', 'Use antes do país.', 'She is from the United Kingdom.', 'Ela é do Reino Unido.'),
            x('He/She is...', 'Ele/Ela é...', 'Use diretamente antes da nacionalidade.', 'He is American.', 'Ele é americano.'),
            x('How do you spell...?', 'Como se soletra...?', 'Pergunta por uma sequência de letras.', 'How do you spell Ruiz?', 'Como se soletra Ruiz?'),
            x('Please repeat.', 'Por favor, repita.', 'Pedido simples quando algo não ficou claro.', 'Please repeat the letter.', 'Por favor, repita a letra.'),
            x('How old is he/she?', 'Quantos anos ele/ela tem?', 'Pergunta memorizada sobre idade.', 'How old is she? She is twenty.', 'Quantos anos ela tem? Ela tem vinte anos.')
        ],
        dialogues: [
            dialogue('A Brazilian student', line('A', 'Who is she?', 'Quem é ela?'), line('B', 'She is Laura Silva.', 'Ela é Laura Silva.'), line('A', 'Where is she from?', 'De onde ela é?'), line('B', 'She is from Brazil. She is Brazilian.', 'Ela é do Brasil. Ela é brasileira.')),
            dialogue('Spelling a last name', line('A', 'What’s his last name?', 'Qual é o sobrenome dele?'), line('B', 'Ruiz.', 'Ruiz.'), line('A', 'How do you spell it?', 'Como se soletra?'), line('B', 'R-U-I-Z.', 'R-U-I-Z.')),
            dialogue('An American friend', line('A', 'Who is he?', 'Quem é ele?'), line('B', 'He is Ethan.', 'Ele é Ethan.'), line('A', 'Is he British?', 'Ele é britânico?'), line('B', 'No. He is American.', 'Não. Ele é americano.')),
            dialogue('Age', line('A', 'How old is Olivia?', 'Quantos anos Olivia tem?'), line('B', 'She is twenty years old.', 'Ela tem vinte anos.'), line('A', 'And Mateo?', 'E Mateo?'), line('B', 'He is nineteen.', 'Ele tem dezenove.')),
            dialogue('Repeat, please', line('A', 'Her name is Siobhan.', 'O nome dela é Siobhan.'), line('B', 'Please repeat.', 'Por favor, repita.'), line('A', 'Siobhan. S-I-O-B-H-A-N.', 'Siobhan. S-I-O-B-H-A-N.'))
        ],
        reading: reading(
            'Four names on the class list',
            'Laura Silva is from Brazil. She is Brazilian and she is eighteen. Ethan Clark is from the United States. He is American and he is twenty. Mateo Ruiz is from Spain. He is Spanish and he is nineteen. Olivia Reed is from the United Kingdom. She is British and she is twenty.',
            question('Where is Laura from?', 'She is from Brazil.'),
            question('What is Ethan’s nationality?', 'He is American.'),
            question('How old is Mateo?', 'He is nineteen.'),
            question('What is Olivia’s last name?', 'Her last name is Reed.'),
            question('Who is British?', 'Olivia is British.')
        ),
        conversation: {
            questions: ['Spell your first name.', 'Spell your last name.', 'Choose and say three numbers from zero to twenty.', 'Create a Brazilian profile.', 'Create an American or British profile.', 'Ask about one person’s name and origin.', 'Ask the teacher to repeat and spell a name.', 'Present two people using he, she, his and her.'],
            support: ['Who is he/she?', 'His/Her name is...', 'He/She is from...', 'He/She is...', 'How do you spell...?', 'He/She is... years old.']
        },
        homework: homework(
            'Crie quatro cartões de identificação usando países e nacionalidades diferentes.',
            ['Uma lista de novos alunos', 'Quatro pessoas em uma conferência', 'Dois amigos e dois professores'],
            ['Incluí nome, sobrenome, país, nacionalidade e idade.', 'Usei he/his e she/her corretamente.', 'Consigo soletrar os quatro sobrenomes e dizer as idades.']
        ),
        mission: { title: 'Class list check', task: 'Identifique duas pessoas, confirme nome, origem, nacionalidade e idade e peça a soletração de um sobrenome.', focus: ['he/she e his/her', 'soletração compreensível', 'números 0–20'] }
    }));
}());
