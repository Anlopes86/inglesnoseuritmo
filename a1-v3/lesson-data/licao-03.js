(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { v, x, p, t, line, dialogue, question, reading, activity, homework } = R.helpers;

    function menuSlide() {
        return `<section><div class="slide-heading"><p class="lesson-panel-title">Break-Time Menu</p><h2>Escolha algo para comer e beber</h2><p>Leia os alimentos e as bebidas em voz alta. Depois, monte combinações usando <strong>want</strong> e <strong>have</strong>.</p></div><div class="dialogue-grid">
            <article class="dialogue-card"><h3>Drinks</h3><p>coffee · tea · water · orange juice</p></article>
            <article class="dialogue-card"><h3>Food</h3><p>ham · chicken · sandwich · cheese bread · cake · fruit</p></article>
            <article class="dialogue-card"><h3>Useful combinations</h3><p>a coffee · a ham sandwich · a chicken sandwich · a piece of cake</p></article>
        </div><div class="grammar-notes"><p><strong>Want</strong> indica o que você deseja. <strong>Have</strong> indica o que você já tem.</p><p><strong>I want a chicken sandwich.</strong> · <strong>I have a ham sandwich.</strong></p></div></section>`;
    }

    R.register(3, R.lesson({
        title: 'At Break',
        objectives: [
            'Nomear alimentos e bebidas comuns em um intervalo.',
            'Usar want para dizer o que você ou outras pessoas desejam.',
            'Usar have para dizer o que você ou outras pessoas têm.',
            'Fazer uma escolha simples com please e agradecer ao receber algo.'
        ],
        intro: [
            line('Café', 'Hi. Coffee or tea?', 'Olá. Café ou chá?'),
            line('Emma', 'Coffee, please. I want a ham sandwich too.', 'Café, por favor. Eu quero um sanduíche de presunto também.'),
            line('Daniel', 'Orange juice, please. I want a chicken sandwich.', 'Suco de laranja, por favor. Eu quero um sanduíche de frango.'),
            line('Café', 'Here you are.', 'Aqui está.'),
            line('Emma', 'Thank you.', 'Obrigada.'),
            line('Daniel', 'We have our food and drinks now.', 'Nós temos nossa comida e nossas bebidas agora.')
        ],
        vocab: [
            v('break', 'intervalo', 'The break is at ten.', 'O intervalo é às dez.'),
            v('menu', 'cardápio', 'The menu is on the table.', 'O cardápio está sobre a mesa.'),
            v('coffee', 'café', 'I want a coffee.', 'Eu quero um café.'),
            v('tea', 'chá', 'They want tea.', 'Eles querem chá.'),
            v('water', 'água', 'We have water.', 'Nós temos água.'),
            v('orange juice', 'suco de laranja', 'I want orange juice.', 'Eu quero suco de laranja.'),
            v('sandwich', 'sanduíche', 'I have a sandwich.', 'Eu tenho um sanduíche.'),
            v('ham', 'presunto', 'I want a ham sandwich.', 'Eu quero um sanduíche de presunto.'),
            v('chicken', 'frango', 'They have chicken sandwiches.', 'Eles têm sanduíches de frango.'),
            v('cheese bread', 'pão de queijo', 'We want cheese bread.', 'Nós queremos pão de queijo.'),
            v('cake', 'bolo', 'They have a piece of cake.', 'Eles têm um pedaço de bolo.'),
            v('fruit', 'fruta', 'We have fruit.', 'Nós temos fruta.'),
            v('hungry', 'com fome', 'We are hungry.', 'Nós estamos com fome.'),
            v('thirsty', 'com sede', 'They are thirsty.', 'Eles estão com sede.')
        ],
        afterVocabularySlides: [{ title: 'Cardápio do intervalo', body: menuSlide }],
        grammar: {
            title: 'Want e have',
            summary: 'Use want para falar do que alguém deseja e have para falar do que alguém tem. Nesta aula, pratique apenas frases afirmativas com I, we e they.',
            rows: [
                ['I + want', 'I want + item', 'I want a coffee.', 'Eu quero um café.'],
                ['we + want', 'We want + item', 'We want two sandwiches.', 'Nós queremos dois sanduíches.'],
                ['they + want', 'They want + item', 'They want orange juice.', 'Eles querem suco de laranja.'],
                ['I + have', 'I have + item', 'I have a ham sandwich.', 'Eu tenho um sanduíche de presunto.'],
                ['we + have', 'We have + item', 'We have water.', 'Nós temos água.'],
                ['they + have', 'They have + item', 'They have chicken sandwiches.', 'Eles têm sanduíches de frango.']
            ],
            notes: [
                'Want = querer. Have = ter.',
                'Com I, we e they, use sempre want e have sem acrescentar -s.',
                'Em uma escolha simples, você também pode dizer apenas Coffee, please.'
            ]
        },
        activitySections: [
            activity('Alimentos, bebidas e combinações', 'Reconheça os itens do cardápio e forme combinações naturais.', [
                p('Match', 'ham · chicken · orange · cheese → juice · bread · sandwich · sandwich', 'ham sandwich; chicken sandwich; orange juice; cheese bread'),
                p('Complete', 'a ham ___', 'sandwich'),
                p('Complete', 'a ___ sandwich', 'chicken'),
                p('Complete', 'orange ___', 'juice'),
                p('Complete', 'cheese ___', 'bread'),
                p('Choose', 'I am thirsty: (water / ham)', 'water'),
                p('Choose', 'I am hungry: (tea / sandwich)', 'sandwich'),
                p('Classify', 'coffee · chicken · tea · cake · water · ham', 'drinks: coffee, tea, water; food: chicken, cake, ham'),
                p('Answer', 'Choose one drink and one food item.', 'A possible answer: coffee and a ham sandwich.')
            ], 'Vocabulary Practice'),
            activity('Diga o que você quer', 'Complete e organize frases afirmativas com want.', [
                p('Complete', 'I ___ a coffee.', 'want'),
                p('Complete', 'We ___ two sandwiches.', 'want'),
                p('Complete', 'They ___ orange juice.', 'want'),
                p('Build', 'want / I / tea', 'I want tea.'),
                p('Build', 'a ham sandwich / We / want', 'We want a ham sandwich.'),
                p('Build', 'want / They / chicken sandwiches', 'They want chicken sandwiches.'),
                p('Correct', 'I wants coffee.', 'I want coffee.'),
                p('Correct', 'We want a orange juice.', 'We want orange juice.'),
                p('Transform', 'Emma and Daniel want cake. → pronoun', 'They want cake.'),
                p('Transform', 'Daniel and I want water. → pronoun', 'We want water.'),
                p('Create', 'Say one drink you want.', 'I want...'),
                p('Create', 'Say two foods you and another person want.', 'We want...')
            ]),
            activity('Diga o que você tem', 'Use have e depois complete uma troca curta no café.', [
                p('Complete', 'I ___ a sandwich.', 'have'),
                p('Complete', 'We ___ coffee.', 'have'),
                p('Complete', 'They ___ two pieces of cake.', 'have'),
                p('Build', 'have / I / a chicken sandwich', 'I have a chicken sandwich.'),
                p('Build', 'water / We / have', 'We have water.'),
                p('Build', 'have / They / fruit', 'They have fruit.'),
                p('Correct', 'I has a ham sandwich.', 'I have a ham sandwich.'),
                p('Correct', 'They has coffee.', 'They have coffee.'),
                p('Choose', 'Desejo agora: I (want / have) tea.', 'want'),
                p('Choose', 'Item comigo agora: I (want / have) tea.', 'have'),
                p('Answer', 'Coffee or tea? Choose coffee politely.', 'Coffee, please.'),
                p('Answer', 'Someone gives you your food.', 'Thank you. / Thanks.'),
                p('Complete', 'Here you ___.', 'are'),
                p('Describe', 'Emma: ham sandwich in her hand · Daniel: chicken sandwich in his hand', 'They have a ham sandwich and a chicken sandwich.')
            ], 'Want and Have Practice')
        ],
        translations: [
            t('Eu quero um café.', 'I want a coffee.'),
            t('Nós queremos dois sanduíches.', 'We want two sandwiches.'),
            t('Eles querem suco de laranja.', 'They want orange juice.'),
            t('Eu tenho um sanduíche de presunto.', 'I have a ham sandwich.'),
            t('Nós temos água.', 'We have water.'),
            t('Eles têm sanduíches de frango.', 'They have chicken sandwiches.'),
            t('Café, por favor.', 'Coffee, please.'),
            t('Aqui está.', 'Here you are.'),
            t('Obrigado.', 'Thank you.'),
            t('Nós estamos com fome.', 'We are hungry.')
        ],
        expressions: [
            x('I want...', 'Eu quero...', 'Use para dizer o alimento ou a bebida que você deseja.', 'I want a ham sandwich.', 'Eu quero um sanduíche de presunto.'),
            x('We want...', 'Nós queremos...', 'Use quando você fala por você e outra pessoa.', 'We want two coffees.', 'Nós queremos dois cafés.'),
            x('They want...', 'Eles querem...', 'Use para falar do desejo de outras pessoas.', 'They want chicken sandwiches.', 'Eles querem sanduíches de frango.'),
            x('I have...', 'Eu tenho...', 'Use para dizer o que está com você.', 'I have orange juice.', 'Eu tenho suco de laranja.'),
            x('We have...', 'Nós temos...', 'Use para falar do que seu grupo tem.', 'We have our food.', 'Nós temos nossa comida.'),
            x('Coffee, please.', 'Café, por favor.', 'Uma escolha curta e adequada nesta situação.', 'Coffee, please.', 'Café, por favor.'),
            x('Here you are.', 'Aqui está.', 'Use ao entregar algo diretamente.', 'Here you are. One coffee.', 'Aqui está. Um café.'),
            x('Thank you.', 'Obrigado.', 'Agradeça quando receber algo.', 'Thank you. — You’re welcome.', 'Obrigado. — De nada.')
        ],
        dialogues: [
            dialogue('Coffee or tea', line('A', 'Coffee or tea?', 'Café ou chá?'), line('B', 'Coffee, please.', 'Café, por favor.'), line('A', 'Here you are.', 'Aqui está.'), line('B', 'Thank you.', 'Obrigado.')),
            dialogue('What we want', line('A', 'I want a ham sandwich.', 'Eu quero um sanduíche de presunto.'), line('B', 'I want a chicken sandwich.', 'Eu quero um sanduíche de frango.'), line('A', 'We want two sandwiches.', 'Nós queremos dois sanduíches.')),
            dialogue('Food on the table', line('A', 'We have coffee and tea.', 'Nós temos café e chá.'), line('B', 'We have cake too.', 'Nós temos bolo também.')),
            dialogue('Two friends', line('A', 'Emma and Daniel are hungry.', 'Emma e Daniel estão com fome.'), line('B', 'They want sandwiches.', 'Eles querem sanduíches.'), line('A', 'They have orange juice.', 'Eles têm suco de laranja.')),
            dialogue('A different choice', line('A', 'Chicken or ham?', 'Frango ou presunto?'), line('B', 'Ham, please.', 'Presunto, por favor.'), line('A', 'Here you are.', 'Aqui está.'), line('B', 'Thanks.', 'Obrigado.'))
        ],
        reading: reading(
            'Break at ten',
            'Emma and Daniel have a break at ten. They are hungry and thirsty. They want two sandwiches. Emma says, “I want a ham sandwich.” Daniel says, “I want a chicken sandwich.” They want coffee and orange juice too. Now they have their food and drinks. They say, “Thank you.”',
            question('What time is the break?', 'It is at ten.'),
            question('Are Emma and Daniel hungry?', 'Yes, they are.'),
            question('Complete Emma’s sentence: “I want a ___ sandwich.”', 'ham'),
            question('Complete Daniel’s sentence: “I want a ___ sandwich.”', 'chicken'),
            question('Complete: “They ___ their food and drinks at the end.”', 'have')
        ),
        conversation: {
            questions: ['Are you hungry or thirsty now?', 'Choose one food item.', 'Choose one drink.', 'Say what you want.', 'Say what you and another person want.', 'Look at the menu and say what you have.', 'Choose between chicken and ham.', 'Complete a short exchange with please, Here you are and Thank you.'],
            support: ['I want...', 'We want...', 'They want...', 'I have...', 'We have...', 'Coffee, please.', 'Here you are.', 'Thank you.']
        },
        homework: homework(
            'Crie um pequeno cardápio e escreva frases sobre escolhas e itens disponíveis.',
            ['Quatro frases com want', 'Quatro frases com have', 'Uma troca curta com please, Here you are e Thank you'],
            ['Incluí alimentos e bebidas.', 'Usei I, we e they.', 'Diferenciei o que as pessoas querem do que elas já têm.']
        ),
        mission: { title: 'Break-time choices', task: 'Escolha comida e bebida para você e outra pessoa. Diga o que vocês querem, o que já têm e finalize a troca com educação.', focus: ['want', 'have', 'please e thank you'] }
    }));
}());
