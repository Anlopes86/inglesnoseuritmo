(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { v, x, p, t, line, dialogue, question, reading, activity, homework } = R.helpers;

    R.register(13, R.lesson({
        title: 'Let’s Go Shopping',
        objectives: ['Distinguir substantivos contáveis e não contáveis frequentes.', 'Usar some e any em listas, perguntas e negativas.', 'Perguntar quantidade com how many e how much.', 'Usar a lot of em quantidades grandes sem contar exatamente.'],
        intro: [
            line('Sarah', 'Do we have any eggs?', 'Nós temos ovos?'),
            line('Emma', 'No, we don’t. We need some eggs and some milk.', 'Não. Precisamos de ovos e leite.'),
            line('Sarah', 'How many eggs do we need?', 'Quantos ovos precisamos?'),
            line('Emma', 'Six. We also need a lot of fruit.', 'Seis. Também precisamos de muita fruta.'),
            line('Sarah', 'How much rice do we have?', 'Quanto arroz temos?'),
            line('Emma', 'Not much. Let’s buy some rice too.', 'Não muito. Vamos comprar arroz também.')
        ],
        vocab: [
            v('shopping list', 'lista de compras', 'The shopping list is on my phone.', 'A lista de compras está no meu telefone.'), v('cart', 'carrinho', 'The cart is full.', 'O carrinho está cheio.'),
            v('basket', 'cesta', 'We need a basket.', 'Precisamos de uma cesta.'), v('egg', 'ovo', 'We need six eggs.', 'Precisamos de seis ovos.'),
            v('apple', 'maçã', 'There are four apples.', 'Há quatro maçãs.'), v('banana', 'banana', 'Buy some bananas.', 'Compre algumas bananas.'),
            v('tomato', 'tomate', 'How many tomatoes do we need?', 'Quantos tomates precisamos?'), v('bottle', 'garrafa', 'We need two bottles of water.', 'Precisamos de duas garrafas de água.'),
            v('milk', 'leite', 'We need some milk.', 'Precisamos de leite.'), v('rice', 'arroz', 'There is some rice at home.', 'Há arroz em casa.'),
            v('bread', 'pão', 'Do we have any bread?', 'Temos pão?'), v('cheese', 'queijo', 'There isn’t any cheese.', 'Não há queijo.'),
            v('coffee', 'café', 'We have a lot of coffee.', 'Temos muito café.'), v('fruit', 'fruta', 'We need a lot of fruit.', 'Precisamos de muita fruta.'),
            v('vegetables', 'legumes e verduras', 'They buy a lot of vegetables.', 'Eles compram muitos legumes.'), v('need', 'precisar', 'What do we need?', 'Do que precisamos?'),
            v('buy', 'comprar', 'Let’s buy some rice.', 'Vamos comprar arroz.'), v('enough', 'suficiente', 'We have enough water.', 'Temos água suficiente.')
        ],
        grammar: {
            title: 'Countable, uncountable e quantifiers',
            summary: 'Contáveis aceitam número e plural. Não contáveis aparecem como massa ou substância e não recebem plural neste uso.',
            rows: [
                ['contável', 'number + plural noun', 'six eggs; four apples', 'seis ovos; quatro maçãs'],
                ['não contável', 'some + noun', 'some milk; some rice', 'um pouco de leite; arroz'],
                ['pergunta/negativa', 'any + noun', 'Do we have any bread?', 'Temos pão?'],
                ['quantidade contável', 'How many + plural noun?', 'How many eggs?', 'Quantos ovos?'],
                ['quantidade não contável', 'How much + noun?', 'How much rice?', 'Quanto arroz?'],
                ['quantidade grande', 'a lot of + noun', 'a lot of fruit/vegetables', 'muita fruta/muitos legumes']
            ],
            notes: ['Use some em afirmações e listas.', 'Use any em perguntas de disponibilidade e negativas.', 'A lot of funciona com contáveis e não contáveis.']
        },
        activitySections: [
            activity('Contável ou não contável?', 'Classifique os alimentos e use uma combinação natural.', [
                p('Classify', 'eggs · milk · apples · rice · tomatoes · bread · bananas · cheese', 'countable: eggs, apples, tomatoes, bananas; uncountable: milk, rice, bread, cheese'),
                p('Choose', '(three / some) eggs', 'three eggs'), p('Choose', '(two / some) milk', 'some milk'), p('Choose', '(four / some) apples', 'four apples'),
                p('Choose', '(six / some) rice', 'some rice'), p('Complete', 'two ___ of water', 'bottles'), p('Complete', 'a lot of ___ (vegetable)', 'vegetables'),
                p('Correct', 'three breads', 'some bread / three loaves of bread'), p('Correct', 'two milks', 'some milk / two bottles of milk'),
                p('Describe', 'List: eggs 6 · milk · apples 4 · rice', 'We need six eggs, some milk, four apples and some rice.')
            ], 'Countability'),
            activity('Some, any ou a lot of?', 'Decida se a frase é lista, pergunta, negativa ou quantidade grande.', [
                p('Choose', 'We need (some / any) milk.', 'some'), p('Choose', 'Do we have (some / any) eggs?', 'any'), p('Choose', 'We don’t have (some / any) cheese.', 'any'),
                p('Choose', 'They buy (a lot of / any) vegetables every week.', 'a lot of'), p('Complete', 'There are ___ apples in the cart.', 'some'),
                p('Complete', 'There isn’t ___ coffee.', 'any'), p('Complete', 'We have ___ rice, but we need more.', 'some'),
                p('Build', 'bread / any / Do / have / we / ?', 'Do we have any bread?'), p('Correct', 'We need any eggs.', 'We need some eggs.'),
                p('Correct', 'Do we have some cheese?', 'Do we have any cheese?'), p('Create', 'Say two things you have and one thing you do not have.', 'We have some... and some... We don’t have any...')
            ]),
            activity('How many ou how much?', 'Observe se o substantivo pode ser contado diretamente.', [
                p('Choose', '(How many / How much) eggs do we need?', 'How many'), p('Choose', '(How many / How much) rice do we have?', 'How much'),
                p('Choose', '(How many / How much) bottles of water?', 'How many'), p('Choose', '(How many / How much) coffee?', 'How much'),
                p('Build', 'apples / many / How / need / we / do / ?', 'How many apples do we need?'), p('Build', 'milk / much / How / have / we / do / ?', 'How much milk do we have?'),
                p('Answer', 'How many eggs do we need? Quantity: 6', 'We need six eggs.'), p('Answer', 'How much rice do we need?', 'We need some rice. / We need a lot of rice.'),
                p('Correct', 'How much apples do we need?', 'How many apples do we need?'), p('Correct', 'How many milk do we have?', 'How much milk do we have?'),
                p('Create', 'Ask about two countable and two uncountable items.', 'How many...? How much...?')
            ], 'Quantity Questions')
        ],
        translations: [
            t('Precisamos de alguns ovos.', 'We need some eggs.'), t('Temos leite?', 'Do we have any milk?'), t('Não temos queijo.', 'We don’t have any cheese.'),
            t('Quantas maçãs precisamos?', 'How many apples do we need?'), t('Quanto arroz temos?', 'How much rice do we have?'),
            t('Precisamos de muitas frutas.', 'We need a lot of fruit.'), t('Há quatro tomates no carrinho.', 'There are four tomatoes in the cart.'),
            t('Vamos comprar um pouco de pão.', 'Let’s buy some bread.'), t('Temos água suficiente.', 'We have enough water.'), t('Do que precisamos?', 'What do we need?')
        ],
        expressions: [
            x('What do we need?', 'Do que precisamos?', 'Inicia uma lista de compras.', 'What do we need from the store?', 'O que precisamos comprar na loja?'),
            x('Do we have any...?', 'Temos...?', 'Pergunta sobre disponibilidade.', 'Do we have any eggs?', 'Temos ovos?'),
            x('We need some...', 'Precisamos de...', 'Afirmação de necessidade.', 'We need some milk.', 'Precisamos de leite.'),
            x('We don’t have any...', 'Não temos...', 'Negativa de disponibilidade.', 'We don’t have any cheese.', 'Não temos queijo.'),
            x('How many...?', 'Quantos/quantas...?', 'Quantidade de item contável.', 'How many apples do we need?', 'Quantas maçãs precisamos?'),
            x('How much...?', 'Quanto/quanta...?', 'Quantidade de item não contável.', 'How much rice do we have?', 'Quanto arroz temos?'),
            x('a lot of', 'muito(a); muitos(as)', 'Quantidade grande.', 'We buy a lot of vegetables.', 'Compramos muitos legumes.'),
            x('That’s enough.', 'É suficiente.', 'Indica que a quantidade basta.', 'Six eggs? That’s enough.', 'Seis ovos? É suficiente.'),
            x('We need more...', 'Precisamos de mais...', 'Indica quantidade insuficiente.', 'We need more water.', 'Precisamos de mais água.')
        ],
        dialogues: [
            dialogue('Eggs for breakfast', line('A', 'Do we have any eggs?', 'Temos ovos?'), line('B', 'No. We need some eggs.', 'Não. Precisamos de ovos.'), line('A', 'How many do we need?', 'De quantos precisamos?'), line('B', 'Six eggs.', 'Seis ovos.'), line('A', 'Okay. Six eggs on the list.', 'Certo. Seis ovos na lista.'), line('B', 'Thank you.', 'Obrigado.')),
            dialogue('Rice for dinner', line('A', 'How much rice do we have?', 'Quanto arroz temos?'), line('B', 'Not much. We need more rice.', 'Não muito. Precisamos de mais arroz.'), line('A', 'Do we need one bag or two?', 'Precisamos de um pacote ou dois?'), line('B', 'One bag is enough.', 'Um pacote é suficiente.'), line('A', 'And do we have any beans?', 'E temos feijão?'), line('B', 'Yes, we have a lot of beans.', 'Sim, temos bastante feijão.')),
            dialogue('Fruit for the week', line('A', 'How many apples do we need?', 'Quantas maçãs precisamos?'), line('B', 'Four apples and some bananas.', 'Quatro maçãs e algumas bananas.'), line('A', 'Do we need oranges too?', 'Precisamos de laranjas também?'), line('B', 'Yes, but only a few.', 'Sim, mas apenas algumas.')),
            dialogue('Water at home', line('A', 'Do we have enough water?', 'Temos água suficiente?'), line('B', 'Yes. We have two bottles.', 'Sim. Temos duas garrafas.'), line('A', 'Great. We don’t need more today.', 'Ótimo. Não precisamos de mais hoje.'), line('B', 'That’s right.', 'Isso mesmo.')),
            dialogue('The complete list', line('A', 'What do we need from the market?', 'Do que precisamos do mercado?'), line('B', 'Some milk, some bread and a lot of vegetables.', 'Leite, pão e muitos legumes.'), line('A', 'Do we need any cheese?', 'Precisamos de queijo?'), line('B', 'Yes, and we need a few tomatoes too.', 'Sim, e precisamos de alguns tomates também.'), line('A', 'Is that all?', 'É só isso?'), line('B', 'Yes. The list is complete.', 'Sim. A lista está completa.'))
        ],
        dialogueGroups: [[0, 1], [2, 3, 4]],
        reading: reading('A list for dinner', 'Sarah and Emma need food for dinner. They have some rice and a lot of vegetables, but they don’t have any cheese or bread. They need six eggs, two bottles of water, some milk and four tomatoes. They have enough coffee, so coffee is not on the shopping list.',
            question('Do they have rice?', 'Yes, they have some rice.'), question('Do they have any cheese?', 'No, they don’t.'), question('How many eggs do they need?', 'They need six eggs.'), question('How many bottles of water do they need?', 'They need two bottles.'), question('Is coffee on the list?', 'No. They have enough coffee.')),
        conversation: { questions: ['What food do you have at home?', 'Do you have any eggs?', 'How much coffee do you have?', 'How many bottles of water do you need?', 'Create a shopping list with ten items.', 'Ask four questions about the list.', 'Remove two items because you have enough.', 'Explain the final list in complete sentences.'], support: ['We need some...', 'Do we have any...?', 'We don’t have any...', 'How many...?', 'How much...?', 'a lot of', 'enough'] },
        homework: homework('Prepare uma lista de compras detalhada para uma refeição.', ['Café da manhã para quatro pessoas', 'Jantar em família', 'Compras para uma semana'], ['Classifiquei itens contáveis e não contáveis.', 'Usei some, any e a lot of.', 'Preparei perguntas com how many e how much.']),
        mission: { title: 'Build the shopping list', task: 'Verifique o que já existe, decida quantidades e explique uma lista final sem comprar itens desnecessários.', focus: ['some/any', 'how many/how much', 'decisão de quantidade'] }
    }));
}());
