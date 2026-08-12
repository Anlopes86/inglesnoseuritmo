(function () {
    'use strict';

    function spellingSlide() {
        return `<section><div class="slide-heading"><p class="lesson-panel-title">Third Person Forms</p><h2>O verbo muda com he e she</h2><p>Observe os três padrões mais frequentes antes de descrever a rotina de outra pessoa.</p></div>
            <div class="lesson-table-scroll"><table class="grammar-table"><thead><tr><th>Padrão</th><th>Forma básica</th><th>Com he/she</th><th>Exemplo</th></tr></thead><tbody>
                <tr><td>maioria dos verbos</td><td>work / start / cook</td><td>works / starts / cooks</td><td>She works at home.</td></tr>
                <tr><td>terminações específicas</td><td>go / finish</td><td>goes / finishes</td><td>He goes home at six.</td></tr>
                <tr><td>consoante + y</td><td>study</td><td>studies</td><td>She studies at night.</td></tr>
                <tr><td>forma especial</td><td>have</td><td>has</td><td>He has breakfast at work.</td></tr>
            </tbody></table></div></section>`;
    }

    window.V3LessonEditorial.register('a1-v3', 13, lesson => ({
        ...lesson,
        intro: [
            ['Mia', 'Leo works at a café.', 'Leo trabalha em uma cafeteria.'],
            ['Ben', 'He starts at eight.', 'Ele começa às oito.'],
            ['Mia', 'He has breakfast at work.', 'Ele toma café no trabalho.'],
            ['Ben', 'He studies English at night.', 'Ele estuda inglês à noite.']
        ],
        afterVocabularySlides: [
            { title: 'Formas da terceira pessoa', body: spellingSlide }
        ],
        activitySections: [
            {
                eyebrow: 'Verb Form',
                title: 'Escolha a forma correta para he e she',
                instruction: 'Identifique o padrão do verbo antes de completar. Depois, leia a frase inteira em voz alta.',
                items: [
                    ['Complete', 'He ___ at a café. (work)', '', 'works'],
                    ['Complete', 'She ___ at night. (study)', '', 'studies'],
                    ['Complete', 'He ___ home at six. (go)', '', 'goes'],
                    ['Complete', 'She ___ breakfast at home. (have)', '', 'has'],
                    ['Complete', 'Leo ___ class at five. (finish)', '', 'finishes'],
                    ['Sort', 'works · studies · goes · has · cooks · finishes', '', '-s: works, cooks. -es: goes, finishes. -ies: studies. Special: has.'],
                    ['Correct', 'He study at night.', '', 'He studies at night.'],
                    ['Correct', 'She haves lunch at noon.', '', 'She has lunch at noon.']
                ]
            },
            {
                eyebrow: 'Profile Transfer',
                title: 'Passe da sua rotina para a rotina de outra pessoa',
                instruction: 'Transforme cada frase com I em uma frase sobre a pessoa indicada. Altere sujeito e verbo.',
                items: [
                    ['Transform', 'I work at home. → Ana', '', 'Ana works at home.'],
                    ['Transform', 'I study in the morning. → Leo', '', 'Leo studies in the morning.'],
                    ['Transform', 'I go home at five. → she', '', 'She goes home at five.'],
                    ['Transform', 'I have lunch at noon. → he', '', 'He has lunch at noon.'],
                    ['Describe', 'Eva: work at a school + finish at four.', '', 'Eva works at a school. She finishes at four.'],
                    ['Describe', 'Tom: cook dinner + study at night.', '', 'Tom cooks dinner. He studies at night.']
                ]
            }
        ],
        conversation: {
            questions: [
                'Describe one person’s morning.',
                'Say where this person works or studies.',
                'Say what this person does after work or class.',
                'Describe this person’s evening.',
                'Give the complete routine in five sentences.'
            ],
            support: ['He/She works...', 'He/She studies...', 'He/She goes...', 'He/She has...', 'After work/class...']
        }
    }));
}());
