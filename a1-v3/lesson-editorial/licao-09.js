(function () {
    'use strict';

    window.V3LessonEditorial.register('a1-v3', 9, lesson => ({
        ...lesson,
        expressions: [
            ...lesson.expressions,
            ['Are these yours?', 'Estes são seus?', 'Use para confirmar a posse de mais de um objeto próximo.', 'Excuse me, are these yours?', 'Com licença, estes são seus?']
        ],
        activitySections: [
            {
                eyebrow: 'Singular → Plural',
                title: 'Transforme um objeto em vários',
                instruction: 'Faça as três mudanças necessárias: demonstrativo, verbo e substantivo.',
                items: [
                    ['Transform', 'this book → plural', '', 'these books'],
                    ['Transform', 'that key → plural', '', 'those keys'],
                    ['Transform', 'This is my pen.', '', 'These are my pens.'],
                    ['Transform', 'That is your bag.', '', 'Those are your bags.'],
                    ['Complete', '___ are my notebooks here.', '', 'These'],
                    ['Complete', '___ are the chairs over there.', '', 'Those'],
                    ['Correct', 'These is a book.', '', 'These are books.'],
                    ['Correct', 'Those are a keys.', '', 'Those are keys.']
                ]
            },
            {
                eyebrow: 'Lost & Found Inventory',
                title: 'Descreva os objetos por quantidade e distância',
                instruction: 'Leia cada cartão do inventário e produza uma frase que permita localizar os objetos.',
                items: [
                    ['Describe', 'Near: two blue pens.', '', 'These are two blue pens.'],
                    ['Describe', 'Far: three school bags.', '', 'Those are three school bags.'],
                    ['Answer', 'Are these your keys? Give a positive answer.', '', 'Yes, these are mine.'],
                    ['Answer', 'Are those your books? Give a negative answer.', '', 'No, those are not mine.'],
                    ['Build', 'those / What / are / over there / ?', '', 'What are those over there?'],
                    ['Sort', 'this book · these books · that key · those keys', '', 'Singular: this book, that key. Plural: these books, those keys.']
                ]
            }
        ],
        conversation: {
            questions: [
                'What are these near you?',
                'What are those farther away?',
                'Are these your keys?',
                'Are those books or notebooks?',
                'Describe two singular objects and two plural objects.'
            ],
            support: ['These are...', 'Those are...', 'Are these...?', 'Are those...?', 'These are mine.']
        }
    }));
}());
