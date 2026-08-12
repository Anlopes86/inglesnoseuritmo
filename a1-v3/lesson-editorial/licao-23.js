(function () {
    'use strict';

    window.V3LessonEditorial.register('a1-v3', 23, lesson => ({
        ...lesson,
        vocab: [
            ...lesson.vocab,
            ['orange', 'laranja', 'We need three oranges.', 'Precisamos de três laranjas.'],
            ['cheese', 'queijo', 'There is some cheese on the list.', 'Há queijo na lista.'],
            ['juice', 'suco', 'We need some juice.', 'Precisamos de suco.']
        ],
        expressions: [
            ...lesson.expressions,
            ['What do we need?', 'Do que precisamos?', 'Use para começar ou revisar a lista de compras.', 'What do we need from the market?', 'O que precisamos comprar no mercado?']
        ],
        activitySections: [
            {
                eyebrow: 'Countable or Uncountable?',
                title: 'Separe o que pode ser contado diretamente',
                instruction: 'Classifique cada alimento e produza um exemplo: número + plural para contáveis; some + substantivo para não contáveis.',
                items: [
                    ['Classify', 'apple', '', 'countable — two apples'],
                    ['Classify', 'egg', '', 'countable — six eggs'],
                    ['Classify', 'orange', '', 'countable — three oranges'],
                    ['Classify', 'rice', '', 'uncountable — some rice'],
                    ['Classify', 'bread', '', 'uncountable — some bread'],
                    ['Classify', 'milk', '', 'uncountable — some milk'],
                    ['Classify', 'cheese', '', 'uncountable — some cheese'],
                    ['Sort', 'apples · rice · eggs · water · bananas · juice', '', 'Countable: apples, eggs, bananas. Uncountable: rice, water, juice.']
                ]
            },
            {
                eyebrow: 'Shopping List',
                title: 'Monte uma lista com quantidades adequadas',
                instruction: 'Complete a lista sem usar números diretamente antes de rice, bread, water, milk, cheese ou juice.',
                items: [
                    ['Complete', 'We need ___ apples.', '', 'some / four'],
                    ['Complete', 'There is ___ water.', '', 'some'],
                    ['Build', 'eggs / six / need / We', '', 'We need six eggs.'],
                    ['Build', 'some / have / I / milk', '', 'I have some milk.'],
                    ['Correct', 'We need two rice.', '', 'We need some rice.'],
                    ['Correct', 'There are some bread.', '', 'There is some bread.'],
                    ['Describe', 'List: 4 apples, 6 eggs, rice, milk.', '', 'We need four apples, six eggs, some rice, and some milk.']
                ]
            }
        ],
        conversation: {
            questions: [
                'Name three countable foods.',
                'Name three uncountable foods or drinks.',
                'What is on your shopping list?',
                'How many eggs or apples do you need?',
                'Create a complete list for breakfast.'
            ],
            support: ['We need...', 'some...', 'two/three/four...', 'Let’s get...', 'That’s enough.']
        }
    }));
}());
