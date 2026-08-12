(function () {
    'use strict';

    function wasWereReferenceSlide() {
        return `<section><div class="slide-heading"><p class="lesson-panel-title">Past of Be</p><h2>Was ou were?</h2><p>Use estas formas para dizer onde alguém estava ou como alguém estava. Os verbos de ação no passado ficam para o A2.</p></div>
            <div class="lesson-table-scroll"><table class="grammar-table"><thead><tr><th>Sujeito</th><th>Afirmativa</th><th>Negativa</th><th>Pergunta</th></tr></thead><tbody>
                <tr><td>I / he / she / it</td><td>was</td><td>wasn’t</td><td>Was...?</td></tr>
                <tr><td>you / we / they</td><td>were</td><td>weren’t</td><td>Were...?</td></tr>
            </tbody></table></div>
            <div class="number-patterns"><p><strong>Lugar:</strong> She was at work yesterday.</p><p><strong>Estado:</strong> They were tired last night.</p><p><strong>Pergunta:</strong> Where were you?</p></div></section>`;
    }

    window.V3LessonEditorial.register('a1-v3', 29, lesson => ({
        ...lesson,
        afterVocabularySlides: [
            { title: 'Was ou were', body: wasWereReferenceSlide }
        ],
        activitySections: [
            {
                eyebrow: 'Was or Were?',
                title: 'Escolha a forma correta do passado de be',
                instruction: 'Identifique primeiro o sujeito. Depois complete com was, were, wasn’t ou weren’t.',
                items: [
                    ['Complete', 'I ___ at home yesterday.', '', 'was'],
                    ['Complete', 'They ___ at school.', '', 'were'],
                    ['Choose', 'She (was / were) busy.', '', 'was'],
                    ['Choose', 'We (was / were) happy.', '', 'were'],
                    ['Complete', 'Leo ___ at work. He was at home.', 'negative', 'wasn’t'],
                    ['Complete', 'Ana and Eva ___ tired. They were happy.', 'negative', 'weren’t'],
                    ['Correct', 'I were at work.', '', 'I was at work.'],
                    ['Correct', 'They was at school.', '', 'They were at school.']
                ]
            },
            {
                eyebrow: 'Yesterday at Six',
                title: 'Pergunte onde as pessoas estavam',
                instruction: 'Use Was...? com uma pessoa e Were...? com you ou mais de uma pessoa. Responda com a informação da ficha.',
                items: [
                    ['Build', 'you / Where / were / yesterday / ?', '', 'Where were you yesterday?'],
                    ['Build', 'Ana / Was / at home / ?', '', 'Was Ana at home?'],
                    ['Answer', 'Was Ben at work? Ben: at home', '', 'No, he wasn’t. He was at home.'],
                    ['Answer', 'Were Leo and Eva at a café? yes', '', 'Yes, they were.'],
                    ['Make a question', 'Answer: Mia was at school.', '', 'Where was Mia?'],
                    ['Make a question', 'Answer: No, they weren’t at home.', '', 'Were they at home?'],
                    ['Describe', 'Yesterday: Mia — work; Ben — home; Ana and Leo — school', '', 'Mia was at work. Ben was at home. Ana and Leo were at school.']
                ]
            }
        ],
        conversation: {
            questions: [
                'Where were you yesterday morning?',
                'Where were you last night?',
                'Were you busy yesterday?',
                'How was your day?',
                'Say where two people you know were yesterday.',
                'Ask your teacher two questions with was or were.'
            ],
            support: ['I was at...', 'I wasn’t...', 'Where were you?', 'Was he/she...?', 'Were they...?', 'It was...']
        }
    }));
}());
