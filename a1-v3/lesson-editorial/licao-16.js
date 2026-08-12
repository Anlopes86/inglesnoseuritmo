(function () {
    'use strict';

    function frequencyScaleSlide() {
        const scale = [
            ['100%', 'always', 'sempre'], ['80%', 'usually', 'geralmente'], ['60%', 'often', 'frequentemente'],
            ['40%', 'sometimes', 'às vezes'], ['10%', 'hardly ever', 'quase nunca'], ['0%', 'never', 'nunca']
        ];
        return `<section><div class="slide-heading"><p class="lesson-panel-title">Frequency Scale</p><h2>De always a never</h2><p>As porcentagens são apenas uma referência visual. Na conversa real, esses advérbios indicam frequência aproximada.</p></div>
            <div class="frequency-scale">${scale.map(([percentage, word, meaning]) => `<article><span>${percentage}</span><strong>${word}</strong><small>${meaning}</small></article>`).join('')}</div>
            <div class="number-patterns"><p><strong>Verbo comum:</strong> She usually reads at night.</p><p><strong>Never:</strong> já é negativo; não use <s>doesn’t never</s>.</p></div></section>`;
    }

    window.V3LessonEditorial.register('a1-v3', 16, lesson => ({
        ...lesson,
        afterVocabularySlides: [
            { title: 'Escala de frequência', body: frequencyScaleSlide }
        ],
        activitySections: [
            {
                eyebrow: 'Frequency Position',
                title: 'Coloque o advérbio no lugar correto',
                instruction: 'Organize a frase com o advérbio antes do verbo principal. Depois, compare a frase com a escala.',
                items: [
                    ['Order', 'always / I / breakfast / have', '', 'I always have breakfast.'],
                    ['Order', 'usually / She / at night / reads', '', 'She usually reads at night.'],
                    ['Order', 'sometimes / We / movies / watch', '', 'We sometimes watch movies.'],
                    ['Complete', 'He ___ drinks coffee. (0%)', '', 'never'],
                    ['Complete', 'I ___ listen to music. (100%)', '', 'always'],
                    ['Choose', 'I (sometimes watch / watch sometimes) movies.', '', 'sometimes watch'],
                    ['Correct', 'I don’t never drink tea.', '', 'I never drink tea.'],
                    ['Correct', 'She listens always to music.', '', 'She always listens to music.']
                ]
            },
            {
                eyebrow: 'How Often?',
                title: 'Pergunte e responda sobre hábitos',
                instruction: 'Forme a pergunta completa e escolha uma frequência que faça sentido para a resposta.',
                items: [
                    ['Build', 'often / How / you / do / read / ?', '', 'How often do you read?'],
                    ['Answer', 'How often do you watch movies?', '', 'I sometimes watch movies. / I watch movies on weekends.'],
                    ['Answer', 'How often do you drink coffee?', '', 'I usually drink coffee. / I never drink coffee.'],
                    ['Make a question', 'Answer: She always listens to music.', '', 'How often does she listen to music?'],
                    ['Describe', 'Leo: soccer on Saturdays, no soccer on weekdays.', '', 'Leo plays soccer on Saturdays. He never plays on weekdays.'],
                    ['Sort', 'always · sometimes · never · usually · hardly ever · often', '', 'High frequency: always, usually, often. Lower frequency: sometimes, hardly ever, never.']
                ]
            }
        ],
        conversation: {
            questions: [
                'How often do you read?',
                'How often do you watch movies?',
                'How often do you listen to music?',
                'What do you never do in the morning?',
                'Describe one habit of a person you know.'
            ],
            support: ['I always...', 'I usually...', 'I sometimes...', 'I hardly ever...', 'I never...']
        }
    }));
}());
