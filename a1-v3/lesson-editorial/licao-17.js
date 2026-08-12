(function () {
    'use strict';

    function timeReferenceSlide() {
        return `<section><div class="slide-heading"><p class="lesson-panel-title">Clock Reference</p><h2>Quatro formas essenciais de dizer as horas</h2><p>Leia primeiro o relógio digital. Depois, compare a forma direta e a forma com past ou to.</p></div>
            <div class="lesson-table-scroll"><table class="grammar-table"><thead><tr><th>Relógio</th><th>Forma direta</th><th>Forma com past/to</th><th>Em português</th></tr></thead><tbody>
                <tr><td><strong>7:00</strong></td><td>seven o’clock</td><td>seven o’clock</td><td>sete em ponto</td></tr>
                <tr><td><strong>7:15</strong></td><td>seven fifteen</td><td>a quarter past seven</td><td>sete e quinze</td></tr>
                <tr><td><strong>7:30</strong></td><td>seven thirty</td><td>half past seven</td><td>sete e meia</td></tr>
                <tr><td><strong>7:45</strong></td><td>seven forty-five</td><td>a quarter to eight</td><td>quinze para as oito</td></tr>
            </tbody></table></div></section>`;
    }

    window.V3LessonEditorial.register('a1-v3', 17, lesson => ({
        ...lesson,
        vocab: [
            ...lesson.vocab,
            ['Wednesday', 'quarta-feira', 'The class is on Wednesday.', 'A aula é na quarta-feira.'],
            ['Thursday', 'quinta-feira', 'I work on Thursday.', 'Eu trabalho na quinta-feira.'],
            ['Friday', 'sexta-feira', 'The meeting is on Friday.', 'A reunião é na sexta-feira.'],
            ['Saturday', 'sábado', 'I study on Saturday.', 'Eu estudo no sábado.'],
            ['Sunday', 'domingo', 'The café is closed on Sunday.', 'A cafeteria está fechada no domingo.']
        ],
        afterVocabularySlides: [
            { title: 'Como dizer as horas', body: timeReferenceSlide }
        ],
        activitySections: [
            {
                eyebrow: 'Clock Time',
                title: 'Leia horários diferentes',
                instruction: 'Diga cada horário em voz alta antes de revelar. Quando houver duas formas naturais, pratique as duas.',
                items: [
                    ['Write', '7:00', '', 'seven o’clock'],
                    ['Write', '7:15', '', 'seven fifteen / a quarter past seven'],
                    ['Write', '7:30', '', 'seven thirty / half past seven'],
                    ['Write', '7:45', '', 'seven forty-five / a quarter to eight'],
                    ['Write', '8:20', '', 'eight twenty'],
                    ['Write', '9:50', '', 'nine fifty'],
                    ['Build', 'time / What / it / is / ?', '', 'What time is it?'],
                    ['Answer', 'What time is it? Clock: 6:30.', '', 'It is six thirty. / It is half past six.']
                ]
            },
            {
                eyebrow: 'Weekly Schedule',
                title: 'Combine dia e horário sem trocar at e on',
                instruction: 'Use on com o dia e at com a hora. Depois, leia a informação como parte de uma agenda.',
                items: [
                    ['Choose', 'Class starts (at / on) eight.', '', 'at'],
                    ['Choose', 'Class is (at / on) Tuesday.', '', 'on'],
                    ['Complete', 'The meeting is ___ Friday ___ nine.', '', 'on Friday at nine'],
                    ['Build', 'class / time / What / start / does / ?', '', 'What time does class start?'],
                    ['Correct', 'The meeting is at Monday.', '', 'The meeting is on Monday.'],
                    ['Correct', 'Work starts on nine.', '', 'Work starts at nine.'],
                    ['Describe', 'English class: Thursday, 7:30 p.m.', '', 'English class is on Thursday at seven thirty.']
                ]
            }
        ],
        conversation: {
            questions: [
                'What time is it now?',
                'What time do you start work or class?',
                'What time do you have lunch?',
                'Say the days you study English.',
                'Describe two appointments with a day and a time.'
            ],
            support: ['It is...', 'It starts at...', 'It is on...', 'on Monday at...', 'See you then.']
        }
    }));
}());
