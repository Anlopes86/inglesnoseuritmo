(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { v, x, p, t, line, dialogue, question, reading, activity, homework } = R.helpers;

    R.register(12, R.lesson({
        title: 'At Home',
        objectives: ['Nomear cômodos, móveis e alguns itens de roupa.', 'Descrever o que existe com there is e there are.', 'Localizar objetos com preposições básicas.', 'Perguntar e responder sobre uma casa ou quarto.'],
        intro: [
            line('Sarah', 'This is the living room. There is a sofa near the window.', 'Esta é a sala. Há um sofá perto da janela.'),
            line('Emma', 'Are there chairs in the room?', 'Há cadeiras no cômodo?'),
            line('Sarah', 'Yes, there are two chairs next to the table.', 'Sim, há duas cadeiras ao lado da mesa.'),
            line('Emma', 'Where is your blue jacket?', 'Onde está sua jaqueta azul?'),
            line('Sarah', 'It is on the chair, under the bag.', 'Ela está sobre a cadeira, embaixo da bolsa.'),
            line('Emma', 'Your house is very nice.', 'Sua casa é muito bonita.')
        ],
        vocab: [
            v('living room', 'sala de estar', 'There is a sofa in the living room.', 'Há um sofá na sala.'), v('bedroom', 'quarto', 'My bedroom is small.', 'Meu quarto é pequeno.'),
            v('kitchen', 'cozinha', 'There is a table in the kitchen.', 'Há uma mesa na cozinha.'), v('bathroom', 'banheiro', 'The bathroom is next to the bedroom.', 'O banheiro fica ao lado do quarto.'),
            v('dining room', 'sala de jantar', 'There are six chairs in the dining room.', 'Há seis cadeiras na sala de jantar.'), v('sofa', 'sofá', 'The sofa is near the window.', 'O sofá fica perto da janela.'),
            v('armchair', 'poltrona', 'There is an armchair by the door.', 'Há uma poltrona perto da porta.'), v('table', 'mesa', 'The keys are on the table.', 'As chaves estão sobre a mesa.'),
            v('chair', 'cadeira', 'The jacket is on the chair.', 'A jaqueta está sobre a cadeira.'), v('bed', 'cama', 'There is a bed in the bedroom.', 'Há uma cama no quarto.'),
            v('desk', 'escrivaninha', 'The laptop is on the desk.', 'O notebook está sobre a escrivaninha.'), v('closet', 'guarda-roupa', 'The clothes are in the closet.', 'As roupas estão no guarda-roupa.'),
            v('window', 'janela', 'The sofa is near the window.', 'O sofá fica perto da janela.'), v('door', 'porta', 'The bag is behind the door.', 'A bolsa está atrás da porta.'),
            v('shirt', 'camisa', 'The shirt is in the closet.', 'A camisa está no guarda-roupa.'), v('jacket', 'jaqueta', 'Her jacket is on the chair.', 'A jaqueta dela está sobre a cadeira.'),
            v('shoes', 'sapatos', 'The shoes are under the bed.', 'Os sapatos estão embaixo da cama.'), v('clothes', 'roupas', 'There are clothes on the bed.', 'Há roupas sobre a cama.')
        ],
        grammar: {
            title: 'There is, there are e localização',
            summary: 'Use there is para uma coisa e there are para mais de uma. Depois, acrescente lugar com uma preposição.',
            rows: [
                ['singular', 'There is + a/an + singular noun', 'There is a sofa in the room.', 'Há um sofá na sala.'],
                ['plural', 'There are + number/plural noun', 'There are two chairs.', 'Há duas cadeiras.'],
                ['pergunta singular', 'Is there...?', 'Is there a desk?', 'Há uma escrivaninha?'],
                ['pergunta plural', 'Are there...?', 'Are there chairs?', 'Há cadeiras?'],
                ['localização', 'in/on/under/next to/behind/near', 'The shoes are under the bed.', 'Os sapatos estão embaixo da cama.']
            ],
            notes: ['There is pode contrair para there’s.', 'Use are com substantivo plural.', 'Não traduza preposições isoladamente; memorize o bloco com o objeto.']
        },
        activitySections: [
            activity('Cômodos, móveis e roupas', 'Relacione cada item ao lugar mais provável.', [
                p('Match', 'sofa · bed · shower · table · closet → living room · bedroom · bathroom · dining room · bedroom', 'sofa—living room; bed—bedroom; shower—bathroom; table—dining room; closet—bedroom'),
                p('Classify', 'sofa · shirt · chair · shoes · bed · jacket · desk · clothes', 'furniture: sofa, chair, bed, desk; clothes: shirt, shoes, jacket, clothes'),
                p('Complete', 'The sofa is in the ___ room.', 'living'), p('Complete', 'The bed is in the ___.', 'bedroom'),
                p('Complete', 'The shirt is in the ___.', 'closet'), p('Answer', 'Name two items in a kitchen.', 'A possible answer: a table and chairs.'),
                p('Answer', 'Name three items in a bedroom.', 'A possible answer: a bed, a desk and a closet.'), p('Describe', 'Room: sofa · armchair · two chairs', 'The room has a sofa, an armchair and two chairs.')
            ], 'Vocabulary Practice'),
            activity('There is ou there are?', 'Observe singular ou plural antes de completar.', [
                p('Complete', 'There ___ a sofa in the room.', 'is'), p('Complete', 'There ___ two chairs.', 'are'), p('Complete', 'There ___ an armchair near the window.', 'is'),
                p('Complete', 'There ___ clothes on the bed.', 'are'), p('Build', 'a desk / There / is / in the bedroom', 'There is a desk in the bedroom.'),
                p('Build', 'three chairs / are / There / in the kitchen', 'There are three chairs in the kitchen.'), p('Build', 'there / Is / a closet / ?', 'Is there a closet?'),
                p('Build', 'shoes / there / Are / under the bed / ?', 'Are there shoes under the bed?'), p('Correct', 'There are a sofa.', 'There is a sofa.'),
                p('Correct', 'There is two windows.', 'There are two windows.'), p('Answer', 'Is there a bed in a bedroom?', 'Yes, there is.'), p('Answer', 'Are there two sofas? Negative.', 'No, there aren’t.')
            ]),
            activity('Localize os objetos', 'Escolha a preposição e produza uma frase completa.', [
                p('Choose', 'The keys are (in / on) the table.', 'on'), p('Choose', 'The shoes are (under / on) the bed.', 'under'), p('Choose', 'The clothes are (in / behind) the closet.', 'in'),
                p('Choose', 'The chair is (next to / in) the desk.', 'next to'), p('Choose', 'The bag is (behind / on) the door.', 'behind'),
                p('Build', 'near / sofa / window / the / is / The', 'The sofa is near the window.'), p('Build', 'on / jacket / chair / the / is / The', 'The jacket is on the chair.'),
                p('Answer', 'Where are the shoes? bed ↓', 'They are under the bed.'), p('Answer', 'Where is the laptop? desk ↑', 'It is on the desk.'),
                p('Describe', 'Bedroom: bed; desk next to bed; shoes under bed; jacket on chair', 'There is a bed. The desk is next to the bed. The shoes are under the bed. The jacket is on the chair.')
            ], 'Location Practice')
        ],
        translations: [
            t('Há um sofá na sala.', 'There is a sofa in the living room.'), t('Há duas cadeiras ao lado da mesa.', 'There are two chairs next to the table.'),
            t('Há uma escrivaninha no quarto?', 'Is there a desk in the bedroom?'), t('Há sapatos embaixo da cama?', 'Are there shoes under the bed?'),
            t('A jaqueta está sobre a cadeira.', 'The jacket is on the chair.'), t('As roupas estão no guarda-roupa.', 'The clothes are in the closet.'),
            t('A bolsa está atrás da porta.', 'The bag is behind the door.'), t('O banheiro fica ao lado do quarto.', 'The bathroom is next to the bedroom.'),
            t('Onde estão as chaves?', 'Where are the keys?'), t('Elas estão sobre a mesa.', 'They are on the table.')
        ],
        expressions: [
            x('There is/There’s...', 'Há...', 'Use com uma coisa.', 'There’s a sofa near the window.', 'Há um sofá perto da janela.'),
            x('There are...', 'Há...', 'Use com duas ou mais coisas.', 'There are two chairs.', 'Há duas cadeiras.'),
            x('Is there...?', 'Há...?', 'Pergunta sobre uma coisa.', 'Is there a bathroom?', 'Há um banheiro?'),
            x('Are there...?', 'Há...?', 'Pergunta sobre mais de uma coisa.', 'Are there chairs?', 'Há cadeiras?'),
            x('Where is/are...?', 'Onde está/estão...?', 'Pergunta por localização.', 'Where are my shoes?', 'Onde estão meus sapatos?'),
            x('It is... / They are...', 'Está... / Estão...', 'Resposta sobre localização.', 'They are under the bed.', 'Eles estão embaixo da cama.'),
            x('next to', 'ao lado de', 'Objetos próximos lateralmente.', 'The chair is next to the desk.', 'A cadeira fica ao lado da escrivaninha.'),
            x('behind', 'atrás de', 'Objeto na parte de trás.', 'The bag is behind the door.', 'A bolsa está atrás da porta.'),
            x('near', 'perto de', 'Proximidade sem posição exata.', 'The sofa is near the window.', 'O sofá fica perto da janela.')
        ],
        dialogues: [
            dialogue('In the living room', line('A', 'Is there a sofa in the living room?', 'Há um sofá na sala?'), line('B', 'Yes. It is near the window.', 'Sim. Ele fica perto da janela.'), line('A', 'Is there a TV too?', 'Há uma televisão também?'), line('B', 'Yes. The TV is opposite the sofa.', 'Sim. A televisão fica em frente ao sofá.'), line('A', 'It’s a comfortable room.', 'É uma sala confortável.'), line('B', 'Yes, we relax there every night.', 'Sim, nós relaxamos lá todas as noites.')),
            dialogue('The bedroom', line('A', 'Are there chairs in the bedroom?', 'Há cadeiras no quarto?'), line('B', 'Yes, there is one chair next to the desk.', 'Sim, há uma cadeira ao lado da escrivaninha.'), line('A', 'And where is the closet?', 'E onde fica o guarda-roupa?'), line('B', 'It is between the desk and the bed.', 'Ele fica entre a escrivaninha e a cama.')),
            dialogue('Missing shoes', line('A', 'Where are my shoes?', 'Onde estão meus sapatos?'), line('B', 'Are they in the closet?', 'Eles estão no guarda-roupa?'), line('A', 'No, they aren’t.', 'Não.'), line('B', 'Look under the bed.', 'Olhe embaixo da cama.'), line('A', 'Here they are! Thank you.', 'Aqui estão! Obrigado.'), line('B', 'You’re welcome.', 'De nada.')),
            dialogue('A jacket', line('A', 'Is my jacket in the closet?', 'Minha jaqueta está no guarda-roupa?'), line('B', 'No. It is on the chair.', 'Não. Ela está sobre a cadeira.'), line('A', 'Is it next to my bag?', 'Ela está ao lado da minha bolsa?'), line('B', 'Yes, it is.', 'Sim.')),
            dialogue('A quick house tour', line('A', 'Is there a dining room?', 'Há uma sala de jantar?'), line('B', 'Yes. There is a table and there are six chairs.', 'Sim. Há uma mesa e seis cadeiras.'), line('A', 'What is next to the dining room?', 'O que fica ao lado da sala de jantar?'), line('B', 'The kitchen is next to it.', 'A cozinha fica ao lado dela.'), line('A', 'Great. And where is the bathroom?', 'Ótimo. E onde fica o banheiro?'), line('B', 'It is across from the kitchen.', 'Ele fica em frente à cozinha.'))
        ],
        dialogueGroups: [[0, 1], [2, 3, 4]],
        reading: reading('Sarah’s small apartment', 'Sarah’s apartment is small but comfortable. There is a living room, a kitchen, one bedroom and one bathroom. There is a blue sofa near the living room window. There are two chairs next to a small table. In the bedroom, there is a bed and a desk. Her shoes are under the bed, and her clothes are in the closet. Her red jacket is behind the door.',
            question('Is Sarah’s apartment large?', 'No, it is small.'), question('How many bedrooms are there?', 'There is one bedroom.'), question('Where is the sofa?', 'It is near the window.'), question('Where are the shoes?', 'They are under the bed.'), question('Where is the red jacket?', 'It is behind the door.')),
        conversation: { questions: ['What rooms are in your home?', 'Is there a sofa in your living room?', 'How many chairs are there?', 'Where are your shoes?', 'Where is your favorite jacket?', 'Describe one room in five sentences.', 'Ask the teacher four questions with Is there or Are there.', 'Imagine a missing object and explain where it is.'], support: ['There is...', 'There are...', 'Is there...?', 'Are there...?', 'It is...', 'They are...', 'in/on/under/next to/behind'] },
        homework: homework('Desenhe ou imagine um cômodo e prepare uma descrição detalhada.', ['Seu quarto', 'Uma sala ideal', 'Um cômodo com um objeto perdido'], ['Incluí pelo menos oito objetos.', 'Usei there is e there are.', 'Usei cinco preposições e duas perguntas.']),
        mission: { title: 'Find the missing object', task: 'Descreva um cômodo e ajude o professor a localizar três objetos sem usar gestos.', focus: ['there is/are', 'preposições', 'descrição compreensível'] }
    }));
}());
