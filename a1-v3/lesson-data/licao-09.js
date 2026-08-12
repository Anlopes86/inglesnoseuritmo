(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { v, x, p, t, line, dialogue, question, reading, activity, homework } = R.helpers;

    function thirdPersonSlide() {
        return `<section><div class="slide-heading"><p class="lesson-panel-title">Third Person Forms</p><h2>O verbo muda com he e she</h2><p>Observe os padrões antes de descrever a rotina de outra pessoa.</p></div><div class="lesson-table-scroll"><table class="grammar-table"><thead><tr><th>Forma básica</th><th>Com he/she</th><th>Exemplo</th></tr></thead><tbody><tr><td>work / start</td><td>works / starts</td><td>She works at home.</td></tr><tr><td>go / finish</td><td>goes / finishes</td><td>He goes home at six.</td></tr><tr><td>study</td><td>studies</td><td>She studies at night.</td></tr><tr><td>have</td><td>has</td><td>He has lunch at noon.</td></tr></tbody></table></div></section>`;
    }

    R.register(9, R.lesson({
        title: 'Sarah’s Routine',
        objectives: ['Descrever a rotina de he e she.', 'Formar terceira pessoa afirmativa com -s, -es, -ies e has.', 'Usar doesn’t em negativas e does em perguntas.', 'Perguntar e dar informações pessoais sobre outra pessoa.'],
        intro: [
            line('Emma', 'Where does Sarah live?', 'Onde Sarah mora?'),
            line('Daniel', 'She lives near the school.', 'Ela mora perto da escola.'),
            line('Emma', 'Does she work at home?', 'Ela trabalha em casa?'),
            line('Daniel', 'No, she doesn’t. She works at a hospital.', 'Não. Ela trabalha em um hospital.'),
            line('Emma', 'What does she do after work?', 'O que ela faz depois do trabalho?'),
            line('Daniel', 'She goes home and studies English.', 'Ela vai para casa e estuda inglês.')
        ],
        vocab: [
            v('live', 'morar', 'Sarah lives near the school.', 'Sarah mora perto da escola.'),
            v('work', 'trabalhar', 'She works at a hospital.', 'Ela trabalha em um hospital.'),
            v('study', 'estudar', 'She studies English.', 'Ela estuda inglês.'),
            v('start', 'começar', 'She starts work at eight.', 'Ela começa a trabalhar às oito.'),
            v('finish', 'terminar', 'She finishes work at four.', 'Ela termina o trabalho às quatro.'),
            v('go', 'ir', 'She goes home after work.', 'Ela vai para casa depois do trabalho.'),
            v('have', 'ter; fazer refeição', 'She has lunch at noon.', 'Ela almoça ao meio-dia.'),
            v('hospital', 'hospital', 'Sarah works at a hospital.', 'Sarah trabalha em um hospital.'),
            v('school', 'escola', 'The school is near her house.', 'A escola fica perto da casa dela.'),
            v('near', 'perto', 'She lives near the school.', 'Ela mora perto da escola.'),
            v('far from', 'longe de', 'He lives far from work.', 'Ele mora longe do trabalho.'),
            v('weekday', 'dia útil', 'She works on weekdays.', 'Ela trabalha nos dias úteis.'),
            v('weekend', 'fim de semana', 'She relaxes on weekends.', 'Ela relaxa nos fins de semana.'),
            v('personal information', 'informações pessoais', 'This is her personal information.', 'Estas são as informações pessoais dela.')
        ],
        afterVocabularySlides: [{ title: 'Formas da terceira pessoa', body: thirdPersonSlide }],
        grammar: {
            title: 'Present Simple com he e she',
            summary: 'Na afirmativa, o verbo muda. Com does e doesn’t, o verbo volta à forma básica.',
            rows: [
                ['afirmativa', 'He/She + verb-s', 'She works at a hospital.', 'Ela trabalha em um hospital.'],
                ['negativa', 'He/She + doesn’t + base verb', 'She doesn’t work at home.', 'Ela não trabalha em casa.'],
                ['pergunta', 'Does + he/she + base verb?', 'Does she work at home?', 'Ela trabalha em casa?'],
                ['resposta', 'Yes, he/she does. / No, he/she doesn’t.', 'No, she doesn’t.', 'Não.'],
                ['pergunta aberta', 'Where/What + does + subject + base verb?', 'Where does she live?', 'Onde ela mora?']
            ],
            notes: ['O -s aparece somente na afirmativa.', 'Depois de does e doesn’t: work, live, study, go e have.', 'Does she works? está incorreto; diga Does she work?']
        },
        activitySections: [
            activity('Forme a terceira pessoa', 'Aplique o padrão adequado a cada verbo.', [
                p('Form', 'work → she', 'works'), p('Form', 'start → he', 'starts'), p('Form', 'finish → she', 'finishes'), p('Form', 'go → he', 'goes'), p('Form', 'study → she', 'studies'), p('Form', 'have → he', 'has'),
                p('Complete', 'Sarah ___ near the school. (live)', 'lives'), p('Complete', 'She ___ English at night. (study)', 'studies'),
                p('Complete', 'She ___ lunch at noon. (have)', 'has'), p('Correct', 'He go home at six.', 'He goes home at six.'),
                p('Correct', 'She studys English.', 'She studies English.'), p('Correct', 'He haves lunch at work.', 'He has lunch at work.')
            ], 'Verb Forms'),
            activity('Negativas com doesn’t', 'Retire a marca da terceira pessoa do verbo depois de doesn’t.', [
                p('Transform', 'She works at home. → negative', 'She doesn’t work at home.'),
                p('Transform', 'He studies at night. → negative', 'He doesn’t study at night.'),
                p('Transform', 'Sarah goes to school. → negative', 'Sarah doesn’t go to school.'),
                p('Complete', 'She ___ live far from work.', 'doesn’t'),
                p('Complete', 'He doesn’t ___ lunch at home.', 'have'),
                p('Complete', 'Sarah doesn’t ___ on weekends.', 'work'),
                p('Correct', 'She doesn’t works here.', 'She doesn’t work here.'),
                p('Correct', 'He don’t study English.', 'He doesn’t study English.'),
                p('Create', 'Sarah: work weekdays ✓ · work weekends ✗', 'Sarah works on weekdays. She doesn’t work on weekends.'),
                p('Create', 'Leo: live near school ✗ · live near work ✓', 'Leo doesn’t live near school. He lives near work.')
            ]),
            activity('Perguntas com does', 'Comece com does e mantenha o verbo principal na forma básica.', [
                p('Build', 'she / Does / at home / work / ?', 'Does she work at home?'),
                p('Build', 'live / Where / Sarah / does / ?', 'Where does Sarah live?'),
                p('Build', 'after work / What / he / does / do / ?', 'What does he do after work?'),
                p('Answer', 'Does Sarah work at a hospital? Positive.', 'Yes, she does.'),
                p('Answer', 'Does she work on weekends? Negative.', 'No, she doesn’t.'),
                p('Answer', 'Where does Sarah live?', 'She lives near the school.'),
                p('Correct', 'Does she works at home?', 'Does she work at home?'),
                p('Correct', 'Where she does live?', 'Where does she live?'),
                p('Make a question', 'Answer: She starts work at eight.', 'What time does she start work?'),
                p('Make a question', 'Answer: No, he doesn’t study at night.', 'Does he study at night?')
            ], 'Question Practice')
        ],
        translations: [
            t('Sarah mora perto da escola.', 'Sarah lives near the school.'), t('Ela trabalha em um hospital.', 'She works at a hospital.'),
            t('Ela não trabalha em casa.', 'She doesn’t work at home.'), t('Onde ela mora?', 'Where does she live?'),
            t('Ela trabalha nos fins de semana?', 'Does she work on weekends?'), t('Não, ela não trabalha.', 'No, she doesn’t.'),
            t('Que horas ela começa a trabalhar?', 'What time does she start work?'), t('Ela começa às oito.', 'She starts at eight.'),
            t('O que ele faz depois do trabalho?', 'What does he do after work?'), t('Ele vai para casa e estuda.', 'He goes home and studies.')
        ],
        expressions: [
            x('Where does he/she live?', 'Onde ele/ela mora?', 'Pergunta sobre residência.', 'Where does Sarah live?', 'Onde Sarah mora?'),
            x('He/She lives...', 'Ele/Ela mora...', 'Resposta com terceira pessoa.', 'She lives near the school.', 'Ela mora perto da escola.'),
            x('Where does he/she work?', 'Onde ele/ela trabalha?', 'Pergunta sobre trabalho.', 'Where does she work?', 'Onde ela trabalha?'),
            x('What does he/she do?', 'Qual é a profissão dele/dela?; O que ele/ela faz?', 'O contexto define o sentido.', 'What does she do? She is a nurse.', 'Qual é a profissão dela? Ela é enfermeira.'),
            x('What time does...?', 'Que horas...?', 'Pergunta por horário da rotina.', 'What time does she start work?', 'Que horas ela começa a trabalhar?'),
            x('Does he/she...?', 'Ele/Ela...?', 'Pergunta de rotina com terceira pessoa.', 'Does she study English?', 'Ela estuda inglês?'),
            x('Yes, he/she does.', 'Sim.', 'Resposta curta positiva.', 'Does she work here? Yes, she does.', 'Ela trabalha aqui? Sim.'),
            x('No, he/she doesn’t.', 'Não.', 'Resposta curta negativa.', 'Does he live here? No, he doesn’t.', 'Ele mora aqui? Não.'),
            x('on weekdays / on weekends', 'nos dias úteis / nos fins de semana', 'Blocos frequentes de tempo.', 'She works on weekdays.', 'Ela trabalha nos dias úteis.')
        ],
        dialogues: [
            dialogue('Where Sarah lives', line('A', 'Where does Sarah live?', 'Onde Sarah mora?'), line('B', 'She lives near the school.', 'Ela mora perto da escola.')),
            dialogue('Her job', line('A', 'What does she do?', 'Qual é a profissão dela?'), line('B', 'She is a nurse.', 'Ela é enfermeira.'), line('A', 'Where does she work?', 'Onde ela trabalha?'), line('B', 'She works at a hospital.', 'Ela trabalha em um hospital.')),
            dialogue('Weekends', line('A', 'Does she work on weekends?', 'Ela trabalha nos fins de semana?'), line('B', 'No, she doesn’t. She relaxes at home.', 'Não. Ela relaxa em casa.')),
            dialogue('Study', line('A', 'Does she study English?', 'Ela estuda inglês?'), line('B', 'Yes, she does. She studies at night.', 'Sim. Ela estuda à noite.')),
            dialogue('Work time', line('A', 'What time does she start work?', 'Que horas ela começa a trabalhar?'), line('B', 'She starts at eight and finishes at four.', 'Ela começa às oito e termina às quatro.'))
        ],
        reading: reading('Sarah’s profile', 'Sarah is twenty-eight years old. She lives near Central School, but she doesn’t work there. She is a nurse and works at City Hospital. She starts work at eight and finishes at four. After work, she goes home and studies English. She doesn’t study on Fridays. On weekends, she relaxes and meets her friends.',
            question('How old is Sarah?', 'She is twenty-eight years old.'), question('Where does she live?', 'She lives near Central School.'), question('Where does she work?', 'She works at City Hospital.'), question('What does she do after work?', 'She goes home and studies English.'), question('Does she study on Fridays?', 'No, she doesn’t.'), question('What does she do on weekends?', 'She relaxes and meets her friends.')),
        conversation: { questions: ['Choose a real or imaginary person.', 'Where does this person live?', 'What does this person do?', 'Where does this person work or study?', 'What time does this person start?', 'What doesn’t this person do on weekends?', 'Ask three questions with does.', 'Present the complete profile in eight sentences.'], support: ['He/She lives...', 'He/She works...', 'He/She doesn’t...', 'Where does...?', 'Does he/she...?', 'Yes, ... does. / No, ... doesn’t.'] },
        homework: homework('Crie um perfil completo de uma pessoa real ou imaginária.', ['Um profissional da saúde', 'Um novo vizinho', 'Uma pessoa que estuda e trabalha'], ['Incluí idade, residência, profissão e rotina.', 'Usei pelo menos três formas de terceira pessoa.', 'Preparei duas negativas e quatro perguntas com does.']),
        mission: { title: 'Profile interview', task: 'Descubra e apresente a rotina de uma pessoa, incluindo uma informação que ela não faz.', focus: ['terceira pessoa', 'does/doesn’t', 'perguntas de acompanhamento'] }
    }));
}());
