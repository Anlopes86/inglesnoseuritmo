(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { v, x, p, t, line, dialogue, question, reading, activity, homework } = R.helpers;

    R.register(11, R.lesson({
        title: 'Family Photos',
        objectives: ['Nomear familiares próximos e relações básicas.', 'Expressar posse com possessive ’s e adjetivos possessivos.', 'Usar have e has para falar de família.', 'Perguntar e informar nomes, relações e idades.'],
        intro: [
            line('Sarah', 'Who is this in the photo?', 'Quem é esta pessoa na foto?'),
            line('Emma', 'This is my brother, Lucas. He is twenty-five.', 'Este é meu irmão, Lucas. Ele tem vinte e cinco anos.'),
            line('Sarah', 'And who is Lucas’s wife?', 'E quem é a esposa de Lucas?'),
            line('Emma', 'Her name is Marina. They have one daughter.', 'O nome dela é Marina. Eles têm uma filha.'),
            line('Sarah', 'What’s their daughter’s name?', 'Qual é o nome da filha deles?'),
            line('Emma', 'Her name is Sofia. She is three years old.', 'O nome dela é Sofia. Ela tem três anos.')
        ],
        vocab: [
            v('parents', 'pais', 'My parents live nearby.', 'Meus pais moram perto.'), v('mother / mom', 'mãe', 'My mother is in the photo.', 'Minha mãe está na foto.'),
            v('father / dad', 'pai', 'His father is a teacher.', 'O pai dele é professor.'), v('husband', 'marido', 'Her husband is Lucas.', 'O marido dela é Lucas.'),
            v('wife', 'esposa', 'Lucas’s wife is Marina.', 'A esposa de Lucas é Marina.'), v('brother', 'irmão', 'I have one brother.', 'Eu tenho um irmão.'),
            v('sister', 'irmã', 'She has two sisters.', 'Ela tem duas irmãs.'), v('son', 'filho', 'They have one son.', 'Eles têm um filho.'),
            v('daughter', 'filha', 'Their daughter is three.', 'A filha deles tem três anos.'), v('child / children', 'criança / filhos', 'They have two children.', 'Eles têm dois filhos.'),
            v('grandmother', 'avó', 'My grandmother is eighty.', 'Minha avó tem oitenta anos.'), v('grandfather', 'avô', 'His grandfather is in the photo.', 'O avô dele está na foto.'),
            v('grandparents', 'avós', 'Our grandparents live in Spain.', 'Nossos avós moram na Espanha.'), v('aunt', 'tia', 'Her aunt is a doctor.', 'A tia dela é médica.'),
            v('uncle', 'tio', 'My uncle has one son.', 'Meu tio tem um filho.'), v('cousin', 'primo(a)', 'I have four cousins.', 'Eu tenho quatro primos.'),
            v('relative', 'parente', 'She is a close relative.', 'Ela é uma parente próxima.'), v('only child', 'filho(a) único(a)', 'He is an only child.', 'Ele é filho único.')
        ],
        grammar: {
            title: 'Family possession: have, has e ’s',
            summary: 'Use have com I/you/we/they, has com he/she e ’s depois de uma pessoa para indicar relação ou posse.',
            rows: [
                ['I/you/we/they', 'have', 'They have two children.', 'Eles têm dois filhos.'],
                ['he/she', 'has', 'She has one brother.', 'Ela tem um irmão.'],
                ['pessoa + relação', 'name + ’s + noun', 'Lucas’s wife is Marina.', 'A esposa de Lucas é Marina.'],
                ['adjetivo possessivo', 'my/your/his/her/our/their + noun', 'Their daughter is Sofia.', 'A filha deles é Sofia.'],
                ['quantidade', 'How many + plural + do/does... have?', 'How many children do they have?', 'Quantos filhos eles têm?']
            ],
            notes: ['Use ’s com pessoas: Sarah’s brother.', 'His e her dependem do dono, não do objeto.', 'Children é o plural irregular de child.']
        },
        activitySections: [
            activity('Construa a árvore da família', 'Identifique cada relação a partir das informações.', [
                p('Match', 'mother · father · daughter · son · aunt · uncle → female parent · male parent · female child · male child · parent’s sister · parent’s brother', 'mother—female parent; father—male parent; daughter—female child; son—male child; aunt—parent’s sister; uncle—parent’s brother'),
                p('Answer', 'Marina is Lucas’s wife. Who is Lucas?', 'He is Marina’s husband.'), p('Answer', 'Sofia is Lucas’s daughter. Who is Lucas?', 'He is Sofia’s father.'),
                p('Answer', 'Ana is Emma’s mother. Who is Emma?', 'She is Ana’s daughter.'), p('Answer', 'Pedro is your mother’s brother. Who is Pedro?', 'He is my uncle.'),
                p('Answer', 'Julia is your aunt’s daughter. Who is Julia?', 'She is my cousin.'), p('Classify', 'parents · cousin · daughter · grandparents · uncle · sister', 'singular: cousin, daughter, uncle, sister; plural: parents, grandparents'),
                p('Describe', 'Family: Lucas + Marina; child: Sofia', 'Lucas is Marina’s husband. Marina is Lucas’s wife. Sofia is their daughter.')
            ], 'Family Vocabulary'),
            activity('Have ou has?', 'Escolha a forma de acordo com o sujeito.', [
                p('Complete', 'I ___ two sisters.', 'have'), p('Complete', 'She ___ one brother.', 'has'), p('Complete', 'They ___ three children.', 'have'),
                p('Complete', 'Lucas ___ one daughter.', 'has'), p('Complete', 'Our grandparents ___ five grandchildren.', 'have'),
                p('Build', 'has / Marina / daughter / one', 'Marina has one daughter.'), p('Build', 'cousins / We / four / have', 'We have four cousins.'),
                p('Correct', 'He have two brothers.', 'He has two brothers.'), p('Correct', 'They has one son.', 'They have one son.'),
                p('Answer', 'How many brothers do you have?', 'I have ... brother(s).'), p('Answer', 'How many children does Marina have?', 'She has one daughter.')
            ]),
            activity('Posse com ’s e possessivos', 'Reescreva a relação de forma natural.', [
                p('Transform', 'the wife of Lucas', 'Lucas’s wife'), p('Transform', 'the daughter of Marina', 'Marina’s daughter'), p('Transform', 'the brother of Sarah', 'Sarah’s brother'),
                p('Choose', 'Lucas is a man. (His / Her) wife is Marina.', 'His'), p('Choose', 'Marina is a woman. (His / Her) daughter is Sofia.', 'Her'),
                p('Choose', 'Lucas and Marina: (Our / Their) daughter is Sofia.', 'Their'), p('Complete', 'Sofia is Lucas___ daughter.', '’s'),
                p('Correct', 'The Lucas’s wife is Marina.', 'Lucas’s wife is Marina.'), p('Correct', 'They daughter is Sofia.', 'Their daughter is Sofia.'),
                p('Describe', 'Emma · brother: Lucas · his wife: Marina · their daughter: Sofia', 'Emma’s brother is Lucas. His wife is Marina. Their daughter is Sofia.')
            ], 'Possession Practice')
        ],
        translations: [
            t('Eu tenho dois irmãos.', 'I have two brothers.'), t('Ela tem uma irmã.', 'She has one sister.'), t('Eles têm três filhos.', 'They have three children.'),
            t('A esposa de Lucas é Marina.', 'Lucas’s wife is Marina.'), t('Qual é o nome da filha deles?', 'What’s their daughter’s name?'),
            t('O nome dela é Sofia.', 'Her name is Sofia.'), t('Quantos primos você tem?', 'How many cousins do you have?'),
            t('Meus avós moram perto.', 'My grandparents live nearby.'), t('O tio dele é médico.', 'His uncle is a doctor.'), t('Nossa família é grande.', 'Our family is big.')
        ],
        expressions: [
            x('Who is this?', 'Quem é esta pessoa?', 'Pergunta sobre alguém em uma foto.', 'Who is this in the photo?', 'Quem é esta pessoa na foto?'),
            x('This is my...', 'Este/Esta é meu/minha...', 'Apresenta um familiar.', 'This is my sister, Julia.', 'Esta é minha irmã, Julia.'),
            x('How are you related?', 'Qual é o parentesco de vocês?', 'Pergunta sobre relação familiar.', 'How are you related? She is my cousin.', 'Qual é o parentesco? Ela é minha prima.'),
            x('He/She is my...', 'Ele/Ela é meu/minha...', 'Resposta sobre relação.', 'He is my uncle.', 'Ele é meu tio.'),
            x('How many ... do you have?', 'Quantos/quantas ... você tem?', 'Pergunta por quantidade na família.', 'How many cousins do you have?', 'Quantos primos você tem?'),
            x('I have... / He has...', 'Eu tenho... / Ele tem...', 'Have muda para has com he/she.', 'She has two sisters.', 'Ela tem duas irmãs.'),
            x('...’s husband/wife', 'marido/esposa de...', 'Posse e relação familiar.', 'Ana’s husband is Paulo.', 'O marido de Ana é Paulo.'),
            x('only child', 'filho(a) único(a)', 'Pessoa sem irmãos.', 'I am an only child.', 'Eu sou filho único.')
        ],
        dialogues: [
            dialogue('A family photo', line('A', 'Is that your family photo?', 'Essa é a foto da sua família?'), line('B', 'Yes. This is my sister, Julia.', 'Sim. Esta é minha irmã, Julia.'), line('A', 'How old is she?', 'Quantos anos ela tem?'), line('B', 'She is twenty-two.', 'Ela tem vinte e dois anos.'), line('A', 'Does she live with you?', 'Ela mora com você?'), line('B', 'No. She lives in Curitiba.', 'Não. Ela mora em Curitiba.')),
            dialogue('Children', line('A', 'Do Lucas and Marina have children?', 'Lucas e Marina têm filhos?'), line('B', 'Yes. They have one daughter.', 'Sim. Eles têm uma filha.'), line('A', 'What’s her name?', 'Qual é o nome dela?'), line('B', 'Her name is Sofia.', 'O nome dela é Sofia.'), line('A', 'How old is she?', 'Quantos anos ela tem?'), line('B', 'She is five years old.', 'Ela tem cinco anos.')),
            dialogue('Brothers and sisters', line('A', 'How many brothers and sisters do you have?', 'Quantos irmãos e irmãs você tem?'), line('B', 'I have one brother and two sisters.', 'Tenho um irmão e duas irmãs.'), line('A', 'How old is your brother?', 'Quantos anos seu irmão tem?'), line('B', 'He is twenty-seven.', 'Ele tem vinte e sete anos.')),
            dialogue('My uncle Pedro', line('A', 'Who is Pedro?', 'Quem é Pedro?'), line('B', 'He is my mother’s brother.', 'Ele é irmão da minha mãe.'), line('A', 'So he is your uncle.', 'Então ele é seu tio.'), line('B', 'That’s right. He has two sons.', 'Isso mesmo. Ele tem dois filhos.')),
            dialogue('Grandparents in Spain', line('A', 'Where do your grandparents live?', 'Onde seus avós moram?'), line('B', 'They live in Spain.', 'Eles moram na Espanha.'), line('A', 'Are they Spanish?', 'Eles são espanhóis?'), line('B', 'Yes, they are. Their home is in Madrid.', 'Sim. A casa deles fica em Madri.'))
        ],
        dialogueGroups: [[0, 1], [2, 3, 4]],
        reading: reading('The Martins family', 'Paulo and Ana are husband and wife. They have three children: Lucas, Emma and Julia. Lucas’s wife is Marina, and their daughter is Sofia. Emma is an engineer and she is an only parent with one son, Leo. Julia does not have children. Paulo and Ana have two grandchildren: Sofia and Leo.',
            question('Who is Ana’s husband?', 'Paulo is Ana’s husband.'), question('How many children do Paulo and Ana have?', 'They have three children.'), question('Who is Lucas’s wife?', 'Marina is Lucas’s wife.'), question('What is their daughter’s name?', 'Her name is Sofia.'), question('How many grandchildren do Paulo and Ana have?', 'They have two grandchildren.')),
        conversation: { questions: ['Who is in your family?', 'Do you have brothers or sisters?', 'How many cousins do you have?', 'Choose one family member and say the person’s name and age.', 'Describe two relationships with ’s.', 'Ask the teacher two questions about family.', 'Create an imaginary family with six people.', 'Present the family without reading complete sentences.'], support: ['This is my...', 'He/She is my...', 'I have...', 'He/She has...', '...’s brother/sister', 'Their...'] },
        homework: homework('Crie uma árvore familiar real ou imaginária com pelo menos seis pessoas.', ['Sua família', 'Uma família fictícia', 'A família de uma personagem'], ['Incluí nomes, relações e idades.', 'Usei have e has.', 'Usei pelo menos quatro relações com ’s ou possessivos.']),
        mission: { title: 'Family photo guide', task: 'Apresente uma foto com seis pessoas e responda a perguntas sobre relações, nomes e idades.', focus: ['vocabulário familiar', 'have/has', 'posse com ’s'] }
    }));
}());
