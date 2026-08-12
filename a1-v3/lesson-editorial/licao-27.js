(function () {
    'use strict';

    function ingFormsSlide() {
        return `<section><div class="slide-heading"><p class="lesson-panel-title">Verb + ing</p><h2>Como formar as ações em andamento</h2><p>Escolha primeiro am, is ou are. Depois transforme somente o verbo principal.</p></div>
            <div class="lesson-table-scroll"><table class="grammar-table"><thead><tr><th>Padrão</th><th>Verbo</th><th>Forma -ing</th><th>Exemplo</th></tr></thead><tbody>
                <tr><td>maioria dos verbos</td><td>wait / talk / play</td><td>waiting / talking / playing</td><td>They are talking.</td></tr>
                <tr><td>verbo terminado em e</td><td>write / take</td><td>writing / taking</td><td>She is writing.</td></tr>
                <tr><td>vogal curta + consoante</td><td>sit</td><td>sitting</td><td>He is sitting.</td></tr>
            </tbody></table></div>
            <div class="number-patterns"><p><strong>Frase completa:</strong> sujeito + am/is/are + verbo-ing.</p><p><strong>Não diga:</strong> <s>She reading</s>. Diga: <strong>She is reading.</strong></p></div></section>`;
    }

    window.V3LessonEditorial.register('a1-v3', 27, lesson => ({
        ...lesson,
        afterVocabularySlides: [
            { title: 'Formas com ing', body: ingFormsSlide }
        ],
        activitySections: [
            {
                eyebrow: 'Build the Form',
                title: 'Forme o verbo com -ing',
                instruction: 'Observe a terminação do verbo. Escreva somente a forma com -ing e depois leia o exemplo completo.',
                items: [
                    ['Form', 'wait + ing', '', 'waiting'],
                    ['Form', 'talk + ing', '', 'talking'],
                    ['Form', 'play + ing', '', 'playing'],
                    ['Form', 'read + ing', '', 'reading'],
                    ['Form', 'write + ing', '', 'writing'],
                    ['Form', 'take + ing', '', 'taking'],
                    ['Form', 'sit + ing', '', 'sitting']
                ]
            },
            {
                eyebrow: 'What Is Happening?',
                title: 'Descreva a cena agora',
                instruction: 'Escolha am, is ou are e complete a ação. Nesta aula, produza somente frases afirmativas.',
                items: [
                    ['Complete', 'I ___ waiting near the door.', '', 'am'],
                    ['Complete', 'Mia ___ reading a message.', '', 'is'],
                    ['Complete', 'Ana and Eva ___ taking photos.', '', 'are'],
                    ['Build', 'Leo / play the guitar / now', '', 'Leo is playing the guitar now.'],
                    ['Build', 'we / write notes / at the moment', '', 'We are writing notes at the moment.'],
                    ['Describe', 'Ben: sit near the window', '', 'Ben is sitting near the window.'],
                    ['Correct', 'She reading a message.', '', 'She is reading a message.'],
                    ['Correct', 'They is taking photos.', '', 'They are taking photos.']
                ]
            }
        ],
        conversation: {
            questions: [
                'Say what you are doing right now.',
                'Say where you are sitting or standing.',
                'Imagine Mia is in a café. What is she doing?',
                'Imagine Leo is at home. What is he doing?',
                'Describe three people preparing for a show.'
            ],
            support: ['I am ...ing.', 'He/She is ...ing.', 'They are ...ing.', 'right now', 'at the moment']
        }
    }));
}());
