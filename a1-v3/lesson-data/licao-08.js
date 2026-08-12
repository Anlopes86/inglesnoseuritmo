(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { v, x, p, t, line, dialogue, question, reading, activity, homework } = R.helpers;

    R.register(8, R.lesson({
        title: 'My Everyday Life',
        objectives: ['Descrever uma rotina diária com I e you.', 'Usar Present Simple afirmativo e negativo com don’t.', 'Fazer perguntas simples com Do you...?', 'Organizar ações com first, then, after that e finally.'],
        intro: [
            line('Sarah', 'What do you do in the morning?', 'O que você faz de manhã?'),
            line('Emma', 'I wake up at seven, take a shower and have breakfast.', 'Acordo às sete, tomo banho e tomo café da manhã.'),
            line('Sarah', 'Do you work in the morning?', 'Você trabalha de manhã?'),
            line('Emma', 'Yes, I do. I start work at nine.', 'Sim. Começo a trabalhar às nove.'),
            line('Sarah', 'Do you study at night?', 'Você estuda à noite?'),
            line('Emma', 'No, I don’t. I study in the afternoon.', 'Não. Eu estudo à tarde.')
        ],
        vocab: [
            v('wake up', 'acordar', 'I wake up at seven.', 'Eu acordo às sete.'),
            v('get up', 'levantar-se', 'I get up after the alarm.', 'Eu me levanto depois do alarme.'),
            v('take a shower', 'tomar banho', 'I take a shower in the morning.', 'Eu tomo banho de manhã.'),
            v('get dressed', 'vestir-se', 'I get dressed at seven thirty.', 'Eu me visto às sete e meia.'),
            v('have breakfast', 'tomar café da manhã', 'I have breakfast at home.', 'Eu tomo café da manhã em casa.'),
            v('go to work', 'ir ao trabalho', 'I go to work at eight.', 'Eu vou trabalhar às oito.'),
            v('go to school', 'ir à escola', 'You go to school in the morning.', 'Você vai à escola de manhã.'),
            v('start work', 'começar o trabalho', 'I start work at nine.', 'Eu começo o trabalho às nove.'),
            v('have lunch', 'almoçar', 'I have lunch at noon.', 'Eu almoço ao meio-dia.'),
            v('finish work', 'terminar o trabalho', 'I finish work at five.', 'Eu termino o trabalho às cinco.'),
            v('go home', 'ir para casa', 'I go home after work.', 'Eu vou para casa depois do trabalho.'),
            v('have dinner', 'jantar', 'I have dinner with my family.', 'Eu janto com minha família.'),
            v('study', 'estudar', 'I study English at night.', 'Eu estudo inglês à noite.'),
            v('relax', 'relaxar', 'I relax after dinner.', 'Eu relaxo depois do jantar.'),
            v('go to bed', 'ir para a cama', 'I go to bed at eleven.', 'Eu vou para a cama às onze.'),
            v('every day', 'todos os dias', 'I work every day.', 'Eu trabalho todos os dias.')
        ],
        grammar: {
            title: 'Present Simple com I e you',
            summary: 'Use a forma básica do verbo com I e you. Para negar, use don’t antes do verbo. Para perguntar, comece com Do.',
            rows: [
                ['afirmativa', 'I/You + base verb', 'I work in the morning.', 'Eu trabalho de manhã.'],
                ['negativa', 'I/You + don’t + base verb', 'I don’t work at night.', 'Eu não trabalho à noite.'],
                ['pergunta', 'Do + you + base verb?', 'Do you study at night?', 'Você estuda à noite?'],
                ['resposta positiva', 'Yes, I do.', 'Yes, I do.', 'Sim.'],
                ['resposta negativa', 'No, I don’t.', 'No, I don’t.', 'Não.']
            ],
            notes: ['O verbo não recebe -s com I e you.', 'Depois de don’t e do, use o verbo básico.', 'Use at com horário, in com partes do dia e every day sem preposição.']
        },
        activitySections: [
            activity('Organize uma rotina', 'Coloque as ações em uma ordem possível e complete as combinações.', [
                p('Order', 'go to bed · wake up · have lunch · go to work', 'wake up → go to work → have lunch → go to bed'),
                p('Match', 'wake up · have · go to · take a → breakfast · shower · work · at seven', 'wake up at seven; have breakfast; go to work; take a shower'),
                p('Complete', 'I ___ breakfast at home.', 'have'),
                p('Complete', 'I ___ to work at eight.', 'go'),
                p('Complete', 'You ___ work at five.', 'finish'),
                p('Complete', 'I ___ English at night.', 'study'),
                p('Choose', 'I have lunch (at / in) noon.', 'at noon'),
                p('Choose', 'I study (at / in) the evening.', 'in the evening'),
                p('Describe', '7:00 wake up · 8:00 go to work · 12:00 lunch', 'I wake up at seven, go to work at eight and have lunch at noon.'),
                p('Describe', '6:00 finish work · dinner · relax · 11:00 bed', 'I finish work at six, have dinner, relax and go to bed at eleven.')
            ], 'Routine Vocabulary'),
            activity('Afirmativa e negativa', 'Complete com o verbo básico ou com don’t + verbo.', [
                p('Complete', 'I ___ up at seven. (wake)', 'wake'),
                p('Complete', 'You ___ breakfast at home. (have)', 'have'),
                p('Complete', 'I ___ work at night. (negative)', 'don’t'),
                p('Complete', 'You don’t ___ to school on Sunday.', 'go'),
                p('Transform', 'I work in the morning. → negative', 'I don’t work in the morning.'),
                p('Transform', 'You study at night. → negative', 'You don’t study at night.'),
                p('Correct', 'I works at home.', 'I work at home.'),
                p('Correct', 'I don’t works at night.', 'I don’t work at night.'),
                p('Correct', 'You no study in the morning.', 'You don’t study in the morning.'),
                p('Create', 'Say one thing you do and one thing you don’t do in the morning.', 'I ... in the morning, but I don’t ...')
            ]),
            activity('Pergunte sobre hábitos', 'Forme perguntas com Do you e responda com uma frase curta seguida de um detalhe.', [
                p('Build', 'you / Do / early / wake up / ?', 'Do you wake up early?'),
                p('Build', 'breakfast / have / you / Do / ?', 'Do you have breakfast?'),
                p('Build', 'at night / study / you / Do / ?', 'Do you study at night?'),
                p('Answer', 'Do you work in the morning? Positive.', 'Yes, I do. I start work at ...'),
                p('Answer', 'Do you study at night? Negative.', 'No, I don’t. I study in the ...'),
                p('Answer', 'Do you have lunch at home?', 'Yes, I do. / No, I don’t.'),
                p('Correct', 'Do you studies English?', 'Do you study English?'),
                p('Correct', 'You do work at home?', 'Do you work at home?'),
                p('Make a question', 'Answer: Yes, I do. I wake up at six.', 'Do you wake up early?'),
                p('Make a question', 'Answer: No, I don’t. I go to bed at eleven.', 'Do you go to bed early?')
            ], 'Question Practice')
        ],
        translations: [
            t('Eu acordo às sete.', 'I wake up at seven.'), t('Eu tomo café da manhã em casa.', 'I have breakfast at home.'),
            t('Eu trabalho de manhã.', 'I work in the morning.'), t('Eu não trabalho à noite.', 'I don’t work at night.'),
            t('Você estuda inglês?', 'Do you study English?'), t('Sim. Eu estudo à tarde.', 'Yes, I do. I study in the afternoon.'),
            t('Você vai para casa às seis?', 'Do you go home at six?'), t('Não. Eu vou para casa às sete.', 'No, I don’t. I go home at seven.'),
            t('Depois, eu janto.', 'Then, I have dinner.'), t('Finalmente, eu vou para a cama.', 'Finally, I go to bed.')
        ],
        expressions: [
            x('What do you do in the morning?', 'O que você faz de manhã?', 'Pergunta aberta sobre rotina.', 'What do you do in the morning?', 'O que você faz de manhã?'),
            x('First,...', 'Primeiro,...', 'Apresenta a primeira ação.', 'First, I take a shower.', 'Primeiro, eu tomo banho.'),
            x('Then,...', 'Depois,...', 'Liga a próxima ação.', 'Then, I have breakfast.', 'Depois, eu tomo café da manhã.'),
            x('After that,...', 'Depois disso,...', 'Continua uma sequência.', 'After that, I go to work.', 'Depois disso, eu vou ao trabalho.'),
            x('Finally,...', 'Finalmente,...', 'Apresenta a última ação.', 'Finally, I go to bed.', 'Finalmente, eu vou para a cama.'),
            x('Do you...?', 'Você...?', 'Pergunta sobre rotina ou hábito.', 'Do you work in the morning?', 'Você trabalha de manhã?'),
            x('Yes, I do. / No, I don’t.', 'Sim. / Não.', 'Respostas curtas com Present Simple.', 'Do you study? Yes, I do.', 'Você estuda? Sim.'),
            x('every day', 'todos os dias', 'Frequência regular sem preposição.', 'I study every day.', 'Eu estudo todos os dias.'),
            x('in the morning/afternoon/evening', 'de manhã/à tarde/à noite', 'Blocos para partes do dia.', 'I work in the afternoon.', 'Eu trabalho à tarde.')
        ],
        dialogues: [
            dialogue('Morning routine', line('A', 'What do you do in the morning?', 'O que você faz de manhã?'), line('B', 'I wake up, take a shower and have breakfast.', 'Eu acordo, tomo banho e tomo café da manhã.')),
            dialogue('Work', line('A', 'Do you work in the morning?', 'Você trabalha de manhã?'), line('B', 'Yes, I do. I start at eight.', 'Sim. Começo às oito.')),
            dialogue('Study time', line('A', 'Do you study at night?', 'Você estuda à noite?'), line('B', 'No, I don’t. I study in the afternoon.', 'Não. Eu estudo à tarde.')),
            dialogue('After work', line('A', 'What do you do after work?', 'O que você faz depois do trabalho?'), line('B', 'I go home, have dinner and relax.', 'Vou para casa, janto e relaxo.')),
            dialogue('Bedtime', line('A', 'Do you go to bed early?', 'Você vai dormir cedo?'), line('B', 'No, I don’t. I go to bed at eleven.', 'Não. Eu vou para a cama às onze.'))
        ],
        reading: reading('Emma’s weekday', 'Emma wakes up at seven and takes a shower. She has breakfast at seven thirty. She goes to work at eight and starts at nine. She has lunch at noon and finishes work at five. After work, she goes home, has dinner and studies English. She goes to bed at eleven.',
            question('What time does Emma wake up?', 'She wakes up at seven.'), question('Where does she go at eight?', 'She goes to work.'), question('What time does she have lunch?', 'She has lunch at noon.'), question('What does she do after dinner?', 'She studies English.'), question('What time does she go to bed?', 'She goes to bed at eleven.')),
        conversation: { questions: ['What time do you wake up?', 'What do you do in the morning?', 'Do you have breakfast at home?', 'Do you work or study in the afternoon?', 'What do you do after work or class?', 'What don’t you do at night?', 'Describe your routine in six actions.', 'Ask the teacher three questions about routine.'], support: ['I wake up...', 'I don’t...', 'Do you...?', 'Yes, I do. / No, I don’t.', 'First...', 'Then...', 'Finally...'] },
        homework: homework('Prepare uma linha do tempo da sua rotina com ações verdadeiras e duas informações inventadas.', ['Um dia de trabalho', 'Um dia de estudo', 'Sua rotina ideal'], ['Incluí pelo menos oito ações.', 'Usei duas negativas com don’t.', 'Preparei três perguntas com Do you...?']),
        mission: { title: 'Routine interview', task: 'Descreva sua rotina, responda a perguntas e descubra duas diferenças entre sua rotina e a do professor.', focus: ['sequência clara', 'do/don’t', 'detalhes de horário'] }
    }));
}());
