(function(){
    'use strict';
    const R=window.A1V3LessonRegistry; const {p,question,reading,homework,focus,speaking,comm,line,dialogue}=R.helpers;
    const stations=[
        focus('Weather and going to','Organize planos e alternativas de acordo com a previsão.',[['weather','It is + adjective','It is windy.'],['plan','be going to + base verb','We’re going to eat outside.'],['question','be + subject + going to?','Are you going to come?']],['Concorde be com o sujeito.', 'Use o verbo base após going to.'],[p('Match','summer · winter · spring · fall','hot · cold · warm · cool'),p('Complete','It is going to ___ rainy.','be'),p('Complete','I ___ going to bring dessert.','am'),p('Make negative','She is going to drive.','She isn’t going to drive.'),p('Make a question','They are going to come.','Are they going to come?'),p('Correct','I going to bring food.','I’m going to bring food.'),p('Correct','She is going to brings drinks.','She is going to bring drinks.'),p('Plan','Sunny → outside; rain → inside','We’re going to stay outside. If it rains, we’re going inside.'),p('Create','Give a forecast and event plan.','It’s going to... We’re going to...')]),
        focus('Health, should and will','Descreva sintomas, aconselhe e ofereça ajuda imediata.',[['symptom','have/feel/hurt','I have a headache.'],['advice','should/shouldn’t + base','You should rest.'],['offer','will + base','I’ll call a doctor.']],['Não use to após should/will.', 'Diferencie plano prévio com going to de decisão atual com will.'],[p('Complete','I ___ a sore throat.','have'),p('Complete','My back ___.','hurts'),p('Complete','She ___ dizzy.','feels'),p('Advice','fever','You should stay home.'),p('Negative advice','dizzy + drive','You shouldn’t drive.'),p('Answer','I need water.','I’ll get some water.'),p('Correct','You should to rest.','You should rest.'),p('Correct','I will to call the doctor.','I will call the doctor.'),p('Choose','Plan: (I’ll see / I’m going to see) the doctor at three.','I’m going to see'),p('Create','Symptoms + two pieces of advice + an offer','I have... You should... I’ll...')]),
        focus('Phone communication','Conduza uma ligação e confirme informações.',[['open','Can I speak to...?', 'Can I speak to Sarah?'],['request','Could you + base?', 'Could you repeat?'],['identify','This is + name','This is Emma.'],['confirm','Let me confirm...','Let me confirm the time.']],['Ao telefone: This is..., não I am...', 'Registre quem ligou, motivo, contato e horário.'],[p('Complete','Who’s ___?','calling'),p('Complete','Please ___.','hold'),p('Complete','Can I leave a ___?','message'),p('Complete','Please call me ___.','back'),p('Make polite','Repeat the number.','Could you repeat the number?'),p('Correct','I am Emma. (phone)','This is Emma.'),p('Correct','Could you to spell it?','Could you spell it?'),p('Confirm','555-0148','Let me repeat that: 555-0148.'),p('Take a message','Daniel · call after 6 · meeting moved to 7:30','Daniel called. Call him after six. The meeting moved to seven thirty.'),p('Create','A call with bad line and time confirmation.','The line is bad... Could you repeat...? Let me confirm...')]),
        focus('Schedule and tense choice','Organize sequência e selecione o tempo pelo contexto.',[['habit','Present Simple','I finish at five.'],['past','Past Simple','I finished late.'],['now','Present Continuous','I’m finishing now.'],['future','going to / will','I’m going to rest. I’ll help.']],['Use before/after/until para ordenar.', 'Observe every day, yesterday, now e tomorrow.'],[p('Complete','I work ___ nine ___ five.','from; to'),p('Complete','I relax ___ work.','after'),p('Complete','I waited ___ six.','until'),p('Complete','Yesterday I ___ late. (finish)','finished'),p('Complete','Right now I ___ a report. (finish)','am finishing'),p('Complete','Tomorrow I ___ early.','am going to finish'),p('Answer','The phone is ringing.','I’ll answer it.'),p('Correct','Yesterday I am working until ten.','Yesterday I worked until ten.'),p('Correct','I waited after midnight. (até)','I waited until midnight.'),p('Create','Habit + yesterday + now + tomorrow','I usually... Yesterday... Now... Tomorrow...')])
    ];
    stations.push(
        speaking('attempt','Conversation: invitation and forecast','Organize um evento e distribua responsabilidades.',{label:'Plan the event',scenario:'Um encontro ao ar livre está marcado para sábado.',task:'Convide, confirme contribuições e explique o plano.',condition:'A previsão muda para chuva forte.',steps:['Faça o convite.','Confirme o que cada pessoa vai levar.','Apresente o plano alternativo.'],support:['Would you like to...?', 'I’m going to...', 'If it rains...'],evidence:'O plano final responde à previsão.'}),
        speaking('questions','Conversation: health call','Faça uma ligação em nome de alguém que está doente.',{label:'Call for help',scenario:'Daniel tem sintomas e não pode ir ao compromisso.',task:'Descreva os sintomas, deixe um recado e reorganize o horário.',condition:'A linha está ruim e um número precisa ser repetido.',steps:['Explique o problema.','Registre o recado.','Confirme o novo horário.'],support:['What’s wrong?', 'He should...', 'Could you repeat...?', 'Let me confirm...'],evidence:'Sintomas e recado chegam completos.'}),
        speaking('final','Conversation: repair the weekend','Reorganize uma agenda depois de dois imprevistos.',{label:'Weekend reset',scenario:'O evento muda e uma pessoa fica doente.',task:'Cancele, remarque ou redistribua atividades e preserve tempo de descanso.',condition:'O novo horário conflita com uma consulta.',steps:['Explique o plano original.','Tome decisões imediatas.','Dê a agenda final.'],support:['The original plan is...', 'I’m going to...', 'I’ll...', 'before/after/until'],evidence:'Decisões, horários e justificativas são claros.'})
    );
    R.register(30,R.review({title:'Conversation Activities 6',objectives:['Revisar exclusivamente as lições 26–29.','Praticar clima, saúde, telefone e agenda em blocos conectados.','Resolver tarefas online individuais com mudança de condição.'],stations,
        reading:reading('A change of plans','Sabrina is going to have a barbecue on Saturday at two thirty. On Friday evening, the forecast says it is going to rain all day. Then Daniel calls. He has a fever and a sore throat, so he isn’t going to come. Emma answers the phone, takes his message and offers to call Sabrina. They change the barbecue to Sunday at noon and move it inside. Daniel is going to rest on Saturday, and Sabrina will call him after his doctor’s appointment.',question('What is Sabrina planning?','A barbecue on Saturday.'),question('What does the forecast say?','It is going to rain all day.'),question('Which symptoms does Daniel have?','A fever and a sore throat.'),question('Who takes his message?','Emma does.'),question('When is the new event?','Sunday at noon.'),question('What is Daniel going to do on Saturday?','Rest.'),question('When will Sabrina call him?','After his appointment.')),
        communicativeActivities:[
            comm('listening','Listen: take a phone message','Ouça a ligação sem ler. Anote quem ligou, sintomas, compromisso, telefone e ação solicitada.',{
                placement:'before-reading',
                scenario:'Daniel liga para Sabrina, mas Emma atende e precisa registrar um recado completo.',
                dialogue:dialogue('A health message',
                    line('Emma','Hello, this is Emma.','Alô, aqui é Emma.'),
                    line('Daniel','Hi, Emma. Can I speak to Sabrina, please?','Oi, Emma. Posso falar com Sabrina, por favor?'),
                    line('Emma','I’m sorry, she isn’t available. Can I take a message?','Desculpe, ela não está disponível. Posso anotar um recado?'),
                    line('Daniel','Yes. I have a fever and a sore throat.','Sim. Estou com febre e dor de garganta.'),
                    line('Emma','You should rest. Are you going to the barbecue?','Você deveria descansar. Vai ao churrasco?'),
                    line('Daniel','No, I’m not. I’m going to see a doctor at three.','Não. Vou ao médico às três.'),
                    line('Emma','I’ll tell Sabrina. What number can she call?','Vou avisar a Sabrina. Para qual número ela pode ligar?'),
                    line('Daniel','It’s 555-0176.','É 555-0176.'),
                    line('Emma','Let me repeat: 555-0167.','Deixe-me repetir: 555-0167.'),
                    line('Daniel','No, the last two numbers are seven-six.','Não, os dois últimos números são sete-seis.'),
                    line('Emma','Got it. She’ll call after your appointment.','Entendi. Ela vai ligar depois da sua consulta.')
                ),
                questions:[
                    question('Who answers the phone?','Emma.'),
                    question('Why isn’t Daniel going to the barbecue?','He has a fever and a sore throat.'),
                    question('What advice does Emma give?','He should rest.'),
                    question('What is Daniel going to do at three?','See a doctor.'),
                    question('What is his correct phone number?','555-0176.'),
                    question('Which numbers does Emma say incorrectly?','The last two numbers.'),
                    question('When will Sabrina call?','After Daniel’s appointment.')
                ]
            }),
            comm('practice','Translation and creation cards','Traduza ou crie exatamente o que cada cartão solicita. Dê uma segunda resposta com informações diferentes.',{
                eyebrow:'Create & Speak',
                items:[
                    p('Translate','primavera · verão · outono · inverno','spring · summer · fall/autumn · winter'),
                    p('Translate','chuvoso · ensolarado · nublado · com vento','rainy · sunny · cloudy · windy'),
                    p('Translate','dor nas costas · resfriado · tosse · dor de cabeça','backache · cold · cough · headache'),
                    p('Translate','dor de dente · febre · dor de garganta · gripe','toothache · fever · sore throat · flu'),
                    p('Create a dialogue','What’s wrong?','A: What’s wrong? B: I have a bad headache.'),
                    p('Create advice','fever · should','You should stay home and rest.'),
                    p('Create an offer','medicine · will','I’ll go to the pharmacy.'),
                    p('Create a phone exchange','Can I speak to...? · unavailable · message','A: Can I speak to Nina? B: She isn’t available. Can I take a message?'),
                    p('Create a sentence','before · appointment','I’ll call you before the appointment.'),
                    p('Create a sentence','until · six','I’m going to work until six.'),
                    p('Create a plan','rain · event inside','If it rains, we’re going to have the event inside.'),
                    p('Create two connected sentences','finish · then · rest','I’ll finish this report. Then I’m going to rest.')
                ]
            }),
            comm('qa-board','Plans, health and phone Q & A','Organize cada pergunta, relacione a resposta e mude o plano quando o professor apresentar uma nova condição.',{
                pairs:[
                    {scrambled:'rain / going / Is / to / it / ?',question:'Is it going to rain?',answer:'Yes. It’s going to rain all day.'},
                    {scrambled:'bring / going / What / you / are / to / ?',question:'What are you going to bring?',answer:'I’m going to bring dessert.'},
                    {scrambled:'wrong / What’s / ?',question:'What’s wrong?',answer:'I have a fever and a sore throat.'},
                    {scrambled:'do / should / What / I / ?',question:'What should I do?',answer:'You should rest.'},
                    {scrambled:'Sabrina / speak / I / Can / to / ?',question:'Can I speak to Sabrina?',answer:'I’m sorry, she isn’t available.'},
                    {scrambled:'message / leave / Can / a / I / ?',question:'Can I leave a message?',answer:'Of course.'},
                    {scrambled:'work / finish / you / do / When / ?',question:'When do you finish work?',answer:'I finish at six.'},
                    {scrambled:'work / after / doing / What / you / are / ?',question:'What are you doing after work?',answer:'I’m going to rest.'}
                ]
            }),
            comm('interview','Rebuild the weekend','Faça perguntas ao professor para descobrir previsão, sintomas e horários. Depois, apresente um plano final sem conflitos.',{
                scenario:'Um evento precisa mudar por causa do clima, de uma consulta e do horário de trabalho.',
                profile:[['Original event','Saturday · 2:30 p.m. · park'],['Forecast','heavy rain'],['Health problem','fever · doctor at 3:00'],['Work','until 6:00 p.m.'],['Available option','Sunday · noon · indoors']],
                questions:['What’s the weather going to be like?','Who is going to the event?','What’s wrong with Daniel?','What should he do?','When is his appointment?','What time does Emma finish work?','Can the event start after six?','What is the best new day, time and place?'],
                reportTask:'Explique o plano original, os problemas, as decisões imediatas e a agenda final. Depois, responda a uma última mudança.',
                support:['The original plan is...','It’s going to...','He should...','I’ll...','before/after/until...','The new plan is...']
            })
        ],
        homework:homework('Prepare três produções usando somente as lições 26–29.',['Um evento com plano B','Uma ligação sobre saúde','Uma agenda reorganizada'],['Usei clima e going to.','Usei sintomas, should e will.','Conduzi a ligação e confirmei dados.','Usei before, after, until e os tempos adequados.'])}));
}());
