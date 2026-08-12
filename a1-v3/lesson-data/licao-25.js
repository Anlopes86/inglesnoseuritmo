(function(){
    'use strict';
    const R=window.A1V3LessonRegistry; const {p,question,reading,homework,focus,speaking,comm,line,dialogue}=R.helpers;
    const stations=[
        focus('Dates and was/were','Organize datas e localize pessoas no passado.',[['date','on + month + ordinal','on July third'],['singular','was/wasn’t','It was sunny.'],['plural','were/weren’t','We were in Bahia.']],['Use in para mês/ano e on para data.', 'Perguntas começam com Was/Were.'],[p('Write','12/25','December twenty-fifth'),p('Write','05/21','May twenty-first'),p('Complete','My vacation was ___ July.','in'),p('Complete','The trip was ___ July 3rd.','on'),p('Complete','We ___ at the hotel.','were'),p('Make negative','It was cold.','It wasn’t cold.'),p('Make a question','They were in Salvador.','Were they in Salvador?'),p('Correct','We was on vacation.','We were on vacation.'),p('Answer','Where were you last weekend?','I was ...'),p('Create','Give a start date, end date and two locations.','from ... to ...; I was/we were ...')]),
        focus('Past Simple story','Relate ações concluídas e organize a sequência.',[['regular','verb + ed','walked; visited'],['irregular','special form','went; saw; bought'],['question/negative','did + base verb','Did you go? I didn’t go.']],['Depois de did/didn’t, use o verbo base.', 'Use was/were sem did.'],[p('Past','miss','missed'),p('Past','go','went'),p('Past','buy','bought'),p('Past','see','saw'),p('Complete','We ___ a taxi. (take)','took'),p('Make negative','I bought a ticket.','I didn’t buy a ticket.'),p('Make a question','She arrived late.','Did she arrive late?'),p('Correct','Did you went?','Did you go?'),p('Order','arrived · missed bus · took taxi','I missed the bus, took a taxi and arrived.'),p('Create','Tell a five-event story with First, Then and Finally.','First... Then... Finally...')]),
        focus('Airport English and can','Passe por check-in, bagagem e portão usando pedidos claros.',[['permission','Can I + base verb?','Can I take this bag?'],['ability','can/can’t','I can use the machine.'],['knowledge','know how to','I know how to check in.']],['Can nunca recebe to.', 'Luggage não recebe plural.'],[p('Match','counter · gate · boarding pass · luggage','service desk · boarding place · document to board · bags'),p('Complete','Where can I check ___?','in'),p('Complete','The flight is late. It is ___.','delayed'),p('Build','take / Can / bag / this / I / ?', 'Can I take this bag?'),p('Build','can / Where / board / I / ?', 'Where can I board?'),p('Correct','I can to help.','I can help.'),p('Correct','two luggages','two bags / some luggage'),p('Complete','I know how ___ use the machine.','to'),p('Answer','Can you check in online?','Yes, I can. / No, I can’t.'),p('Create','Ask about documents, bag and gate.','Can I see...? Can I take...? Which gate?')]),
        focus('Past Continuous','Reconstrua o contexto e o evento que o interrompeu.',[['background','was/were + verb-ing','They were waiting.'],['event','Past Simple','The lights went out.'],['link','when/while','I was reading when they called.']],['Was/were + -ing descreve ação em andamento.', 'Não use did com o Past Continuous.'],[p('Complete','I ___ (wait) at the gate.','was waiting'),p('Complete','They ___ (sleep).','were sleeping'),p('Make negative','We were boarding.','We weren’t boarding.'),p('Make a question','Sarah was reading.','Was Sarah reading?'),p('Complete','I ___ when the agent ___. (wait/call)','was waiting; called'),p('Complete','The lights ___ while we ___. (go out/talk)','went out; were talking'),p('Correct','They was sleeping.','They were sleeping.'),p('Correct','What did you doing?','What were you doing?'),p('Describe','8:00—Daniel wait; Emma read; Sarah buy coffee','Daniel was waiting, Emma was reading and Sarah was buying coffee.'),p('Create','Add one interruption and the next event.','Suddenly... Then...')])
    ];
    stations.push(
        speaking('attempt','Conversation: vacation interview','Dê datas, lugares e uma sequência de eventos.',{label:'Past trip',scenario:'Você voltou de uma viagem e precisa reconstruir o calendário.',task:'Responda quando, onde, com quem e o que aconteceu.',condition:'Uma data fornecida está errada; corrija-a.',steps:['Dê as datas.','Localize as pessoas.','Conte quatro eventos.'],support:['from ... to...','I was/We were...','First... Then...'],evidence:'Datas e sequência ficam claras.'}),
        speaking('questions','Conversation: airport problem','Resolva uma passagem pelo aeroporto com uma dificuldade inesperada.',{label:'Get to the gate',scenario:'Seu voo sai de um portão distante e sua mala é grande.',task:'Faça check-in, resolva a bagagem e encontre o portão.',condition:'O voo sofre atraso de cinquenta minutos.',steps:['Mostre documentos.','Pergunte sobre a mala.','Confirme portão e novo horário.'],support:['Can I...?', 'Where can I...?', 'Is the flight on time?'],evidence:'O trajeto e a solução são compreensíveis.'}),
        speaking('final','Conversation: what happened at the gate?','Reconstrua uma cena antes e depois de um anúncio.',{label:'Gate investigation',scenario:'Há relatos parciais de cinco passageiros.',task:'Diga o que cada um estava fazendo e o que aconteceu.',condition:'Uma segunda informação contradiz seu primeiro relato.',steps:['Monte o contexto.','Inclua a interrupção.','Corrija a versão final.'],support:['was/were ...ing','when','while','Suddenly','Finally'],evidence:'Contexto e eventos concluídos não se confundem.'})
    );
    R.register(25,R.review({title:'Conversation Activities 5',objectives:['Revisar exclusivamente as lições 21–24.','Praticar cada conteúdo imediatamente após sua retomada.','Integrar calendário, passado e viagem em tarefas individuais.'],stations,
        reading:reading('A difficult return trip','Daniel’s return flight was on July seventeenth. He arrived at the airport at six and checked in at counter twelve. While he was walking to gate twenty-four, he heard an announcement: the flight was delayed. At seven, Daniel was reading and other passengers were sleeping when the lights suddenly went out. An agent explained that the airport had a technical problem. The lights came back after ten minutes, but the flight didn’t leave until nine thirty.',question('When was Daniel’s flight?','On July seventeenth.'),question('What did he do at counter twelve?','He checked in.'),question('What was he doing when he heard the announcement?','He was walking to the gate.'),question('What were other passengers doing at seven?','They were sleeping.'),question('What happened to the lights?','They went out.'),question('What time did the flight leave?','At nine thirty.')),
        communicativeActivities:[
            comm('listening','Listen: a gate change','Ouça o diálogo e anote data, voo, portão original, novo portão e horário de embarque.',{
                placement:'before-reading',
                scenario:'Um passageiro pede ajuda depois de ouvir apenas parte de um anúncio.',
                dialogue:dialogue('At the information desk',
                    line('Passenger','Excuse me. Is flight 308 on time?','Com licença. O voo 308 está no horário?'),
                    line('Agent','No. It was delayed by fifty minutes.','Não. Ele foi atrasado em cinquenta minutos.'),
                    line('Passenger','What time can we board?','A que horas podemos embarcar?'),
                    line('Agent','Boarding starts at nine fifteen.','O embarque começa às nove e quinze.'),
                    line('Passenger','Is the gate still twenty-four?','O portão ainda é o vinte e quatro?'),
                    line('Agent','No. The new gate is thirty-one.','Não. O novo portão é o trinta e um.'),
                    line('Passenger','Where can I find gate thirty-one?','Onde encontro o portão trinta e um?'),
                    line('Agent','Go straight and turn left after the café.','Siga reto e vire à esquerda depois do café.'),
                    line('Passenger','Can I take this suitcase with me?','Posso levar esta mala comigo?'),
                    line('Agent','No. You need to check it in first.','Não. Você precisa despachá-la primeiro.')
                ),
                questions:[
                    question('Which flight is the passenger taking?','Flight 308.'),
                    question('How long is the delay?','Fifty minutes.'),
                    question('What time does boarding start?','At nine fifteen.'),
                    question('What was the original gate?','Gate twenty-four.'),
                    question('What is the new gate?','Gate thirty-one.'),
                    question('How can the passenger get there?','Go straight and turn left after the café.'),
                    question('What must happen to the suitcase?','The passenger needs to check it in.')
                ]
            }),
            comm('practice','Rebuild the travel timeline','Organize as informações e conte a história inteira usando First, Then, While, Suddenly e Finally.',{
                eyebrow:'Timeline Challenge',
                items:[
                    p('Date','flight · 07/17','The flight was on July seventeenth.'),
                    p('Order','heard announcement · arrived · checked in','First, Daniel arrived. Then he checked in and heard an announcement.'),
                    p('Connect','Daniel walked to gate 24 · announcement started','Daniel was walking to gate twenty-four when the announcement started.'),
                    p('Connect','Daniel read · passengers slept','Daniel was reading while other passengers were sleeping.'),
                    p('Interrupt','people waited · lights went out','People were waiting when the lights suddenly went out.'),
                    p('Ask','passport','Can I see your passport?'),
                    p('Ask for directions','gate 31','Where can I find gate thirty-one?'),
                    p('Finish','lights returned · flight left at 9:30','Finally, the lights came back and the flight left at nine thirty.')
                ]
            }),
            comm('qa-board','Past trip Q & A','Desembaralhe as perguntas, encontre as respostas e conte o que aconteceu sem ler o quadro.',{
                pairs:[
                    {scrambled:'vacation / your / When / was / ?',question:'When was your vacation?',answer:'It was in July.'},
                    {scrambled:'you / were / Where / ?',question:'Where were you?',answer:'I was in Salvador.'},
                    {scrambled:'yesterday / do / What / you / did / ?',question:'What did you do yesterday?',answer:'I visited the old town.'},
                    {scrambled:'ticket / buy / you / Did / the / ?',question:'Did you buy the ticket?',answer:'Yes, I bought it online.'},
                    {scrambled:'passport / see / I / Can / your / ?',question:'Can I see your passport?',answer:'Of course. Here it is.'},
                    {scrambled:'gate / find / Where / I / can / the / ?',question:'Where can I find the gate?',answer:'Go straight and turn right.'},
                    {scrambled:'eight / doing / What / you / were / at / ?',question:'What were you doing at eight?',answer:'I was waiting at the gate.'},
                    {scrambled:'next / happened / What / ?',question:'What happened next?',answer:'The flight was canceled.'}
                ]
            }),
            comm('interview','Travel interview','Responda sobre uma viagem real ou inventada. Depois, reconte a viagem em ordem cronológica.',{
                scenario:'O professor entrevista você sobre uma viagem com um pequeno imprevisto.',
                questions:['When was the trip?','Where were you?','Who was with you?','How did you get there?','What did you do first?','What happened next?','Where were you when the problem started?','What were you doing?','What did you do finally?'],
                reportTask:'Conte a viagem novamente sem as perguntas. Inclua data, lugar, quatro eventos e uma ação em andamento interrompida.',
                support:['The trip was on...','I was/We were...','First... Then...','I was ...ing when...','Finally...']
            })
        ],
        homework:homework('Prepare três produções usando somente as lições 21–24.',['Um calendário de viagem passada','Um percurso completo no aeroporto','Uma interrupção durante a espera'],['Usei datas e was/were.','Usei Past Simple em sequência.','Usei can e linguagem de aeroporto.','Usei Past Continuous com when/while.'])}));
}());
