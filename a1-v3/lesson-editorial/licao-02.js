(function () {
    'use strict';

    window.V3LessonEditorial.register('a1-v3', 2, lesson => ({
        ...lesson,
        activitySections: [
            {
                eyebrow: 'Vocabulary in Use',
                title: 'País ou nacionalidade?',
                instruction: 'Complete com o país ou com a nacionalidade indicada pelo contexto. Leia a frase completa depois de responder.',
                items: [
                    ['Complete', 'She is from ___. She is Brazilian.', '', 'Brazil'],
                    ['Complete', 'He is from Japan. He is ___.', '', 'Japanese'],
                    ['Complete', 'She is from Spain. She is ___.', '', 'Spanish'],
                    ['Complete', 'He is from the United States. He is ___.', '', 'American'],
                    ['Complete', 'She is from ___. She is British.', '', 'the United Kingdom'],
                    ['Complete', 'He is from Mexico. He is ___.', '', 'Mexican'],
                    ['Complete', 'She is from Canada. She is ___.', '', 'Canadian']
                ]
            },
            {
                eyebrow: 'Grammar in Action',
                title: 'Escolha he ou she e complete a informação',
                instruction: 'Observe o nome e a informação de origem. Use o pronome e o verbo corretos.',
                items: [
                    ['Complete', 'Ken is from Japan. ___ is Japanese.', '', 'He'],
                    ['Complete', 'Sofia is from Brazil. ___ is Brazilian.', '', 'She'],
                    ['Correct', 'Emma is Canadian. He is from Canada.', '', 'Emma is Canadian. She is from Canada.'],
                    ['Correct', 'Leo are from Italy.', '', 'Leo is from Italy.'],
                    ['Build', 'from / Where / Sofia / is / ?', '', 'Where is Sofia from?']
                ]
            },
            {
                eyebrow: 'Teacher–Student Exchange',
                title: 'Descubra a origem das pessoas',
                instruction: 'O professor lê a informação do cartão. Faça a pergunta adequada ou responda com país e nacionalidade.',
                items: [
                    ['Answer', 'Card: Pablo — Spain. Ask about Pablo.', '', 'Where is Pablo from?'],
                    ['Answer', 'Where is Grace from? Card: United Kingdom.', '', 'She is from the United Kingdom. She is British.'],
                    ['Answer', 'Where is Mateo from? Card: Mexico.', '', 'He is from Mexico. He is Mexican.']
                ]
            }
        ],
        conversation: {
            questions: [
                'Where are you from?',
                'What nationality are you?',
                'Name a person from the United Kingdom and describe their nationality.',
                'Ask where Sofia is from.',
                'Say the country and nationality for a person from Spain.'
            ],
            support: ['Where are you from?', 'I’m from...', 'He’s from...', 'She’s from...', 'He/She is...']
        }
    }));
}());
