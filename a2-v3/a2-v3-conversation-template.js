(function installA2V3ConversationCurriculum(globalScope) {
    'use strict';

    const FOLLOW_UPS = {
  "2": [
    "A different last day",
    "Our hotel is far from the castle, and heavy rain is forecast. We can take a short bus trip to the museum or stay nearby and visit a café. I enjoy taking pictures, but I do not want to be outside the whole time.",
    [
      "Why does the traveler need a new plan?",
      "Which two alternatives are available?"
    ],
    [
      "Heavy rain is forecast.",
      "A bus trip to the museum or a nearby café."
    ],
    "The museum closes early. Agree on a different plan and explain why."
  ],
  "4": [
    "The bridge is closed",
    "The bridge near the station is closed today. To reach the square, walk past the clock tower, a useful landmark, and turn right at the next intersection. The entrance to the museum is opposite the square. Allow an extra ten minutes for the distance.",
    [
      "Which route is unavailable?",
      "Where is the museum entrance?"
    ],
    [
      "The route across the bridge.",
      "Opposite the square."
    ],
    "Your visitor has only fifteen minutes. Confirm a nearby meeting point instead."
  ],
  "6": [
    "A new member",
    "I am a beginner and want to improve my fitness at my own pace. My coach suggests two training sessions a week and a rest day after each one. I can train on Monday and Thursday, but my teammate is only free on Tuesday.",
    [
      "How often does the coach suggest training?",
      "What scheduling problem do the friends have?"
    ],
    [
      "Twice a week.",
      "They are free on different days."
    ],
    "The Monday session is full. Agree on another session and a realistic weekly plan."
  ],
  "8": [
    "A recommendation request",
    "My subscription ends this week. I want a podcast about current events with short episodes. I read a review of City Voices, but it sounds too technical. Can you give me a recommendation and explain what the first episode is about?",
    [
      "What kind of podcast does the listener want?",
      "What is the problem with City Voices?"
    ],
    [
      "Short episodes about current events.",
      "It sounds too technical."
    ],
    "The recommended podcast needs a paid subscription. Suggest an alternative and explain your choice."
  ],
  "10": [
    "One meal, two preferences",
    "I feel like something crispy rather than creamy tonight. My friend wants a mild vegetarian dish. We can share a portion, but we need to check the ingredients first. The app says the restaurant has fresh vegetables and a sweet sauce on the side.",
    [
      "What does the friend prefer?",
      "What should the diners check before ordering?"
    ],
    [
      "A mild vegetarian dish.",
      "The ingredients."
    ],
    "Only one vegetarian main course is available. Decide whether to share it or choose another restaurant."
  ],
  "12": [
    "Please check the order",
    "Our booking is for a table for two at seven. One guest has a peanut allergy. We asked the server for tap water and separate bills. The order ticket says peanut sauce and one shared bill. Please confirm the ingredients and correct the order before the meal arrives.",
    [
      "Which ingredient needs confirmation?",
      "What billing change is needed?"
    ],
    [
      "Peanut sauce, because one guest has a peanut allergy.",
      "Separate bills instead of one shared bill."
    ],
    "The server cannot confirm an ingredient. Ask for a clearly identified alternative before ordering."
  ],
  "14": [
    "A thoughtful reply",
    "I felt stressed after work, and my short reply sounded rude. My friend is usually calm and reliable, but she has not answered. I want to send a thoughtful apology and give her space. I do not want to pressure her to talk tonight.",
    [
      "Why does the writer want to apologize?",
      "What does the writer want to avoid?"
    ],
    [
      "The short reply sounded rude.",
      "Pressuring the friend to talk."
    ],
    "Your friend says she needs time. Reply in a supportive way without demanding an immediate answer."
  ],
  "16": [
    "Confirm the report",
    "A witness saw a cyclist fall on a slippery road near the park entrance. The cyclist has an arm injury, and an ambulance is on the way. The witness knows the location but does not know the cyclist’s emergency contact. The report needs the time and the exact meeting point.",
    [
      "Which details still need confirmation?",
      "What help is already on the way?"
    ],
    [
      "The time and exact meeting point.",
      "An ambulance."
    ],
    "The operator asks you to repeat the location. Confirm landmarks and report only what you observed."
  ],
  "18": [
    "The final price",
    "The bag is affordable at sixty dollars, but the delivery fee is twelve dollars. My budget is seventy. The other bag is more expensive, but it includes delivery and a longer warranty. Before deciding, I need to ask about the refund policy and the final price.",
    [
      "Why is the first bag over budget?",
      "What information should the buyer confirm?"
    ],
    [
      "Delivery makes the total seventy-two dollars.",
      "The refund policy and final price."
    ],
    "The shop offers free pickup for the first bag. Compare the options again and make your decision."
  ],
  "20": [
    "A clear agreement",
    "Could you do me a favor and lend me your camera? I have permission to take pictures at the event. I can return it by the end of the day on Sunday. If that deadline is too late, I can ask someone else for a replacement. Let us confirm our agreement first.",
    [
      "When will the borrower return the camera?",
      "What alternative is available?"
    ],
    [
      "By the end of the day on Sunday.",
      "Ask someone else for a replacement."
    ],
    "The owner needs the camera on Sunday morning. Negotiate an earlier return or a different solution."
  ],
  "22": [
    "Back in our hometown",
    "At the reunion, I met an old schoolmate. We lost touch when we left our hometown, but we still have a shared interest in music. Our families used to have lunch together every Sunday. We want to bring back that tradition and keep in touch more often.",
    [
      "What shared interest do the friends have?",
      "Which old tradition do they want to restart?"
    ],
    [
      "Music.",
      "Sunday lunch with their families."
    ],
    "One friend now lives far away. Agree on a realistic way to maintain the friendship."
  ],
  "24": [
    "Dress for the occasion",
    "The invitation says smart casual. I have a plain shirt, a striped jacket and some loose trousers. My favorite second-hand coat goes with the shirt, but it is too warm for this occasion. I want to dress up without buying a completely new outfit.",
    [
      "What does the invitation say?",
      "Why might the coat be unsuitable?"
    ],
    [
      "Smart casual.",
      "It is too warm for the occasion."
    ],
    "The event moves outdoors and the evening will be cool. Adapt the outfit and explain your choice."
  ],
  "26": [
    "A difficult choice",
    "I shared a private message without permission. Now my friend says I damaged her trust. I can make an apology, but I cannot undo what happened. From her point of view, privacy matters more than my intention. What is a responsible first step, and what risk should I avoid?",
    [
      "Why is the friend upset?",
      "What does the writer need help deciding?"
    ],
    [
      "A private message was shared without permission.",
      "A responsible first step and a risk to avoid."
    ],
    "Your friend does not want to meet yet. Suggest a respectful next step with no pressure to reply."
  ],
  "28": [
    "Avoid the crowds",
    "The most famous attraction has a long queue at midday. Our accommodation is near a peaceful garden with a great view. We want the boat trip to be the highlight of the day, but the station is crowded in the afternoon. What would you recommend for a relaxing itinerary?",
    [
      "Which place has a long midday queue?",
      "What do the travelers want as the highlight?"
    ],
    [
      "The most famous attraction.",
      "The boat trip."
    ],
    "The boat trip is cancelled. Choose a new highlight and adapt the itinerary."
  ],
  "30": [
    "A realistic first step",
    "My goal is to build a study habit one step at a time. My schedule changes every week, so that is my main obstacle. My first step is ten minutes after breakfast. If I miss that time, my backup plan is to study on the bus. I will review my progress on Sunday.",
    [
      "What is the main obstacle?",
      "What is the backup plan?"
    ],
    [
      "A changing weekly schedule.",
      "Study on the bus."
    ],
    "Breakfast is now too rushed. Choose a new first step and a way to check progress."
  ]
};
    // Authored activity sequences: each lesson chooses its own dynamics.
    function variedActivities(l) {
        const S=(id,type,title,instruction,rest)=>({id,type,title,kicker:'Conversation Activities',instruction,...rest});
        const T=(id,title,tasks,goal,challenge='Dê uma razão ou um exemplo.')=>S(id,'conversation',title,'Converse e compare suas ideias com as do professor.',{tasks,goal,challenge});
        const R=(id,title,paragraphs,items)=>S(id,'reading',title,'Acompanhe a leitura, leia depois e encontre evidências para suas respostas.',{paragraphs,items,translations:[]});
        const M=(id,title,options,items)=>S(id,'matching',title,'Associe números e letras. Leia a combinação e explique sua escolha.',{options,items});
        const C=(id,title,bank,paragraphs,items)=>S(id,'cloze',title,'Leia tudo antes de completar. Confira e use uma das expressões em outra situação.',{bank,paragraphs,items});
        const Q=(id,title,items)=>S(id,'questions',title,'Responda e justifique. Confira depois uma resposta possível.',{items});
        const U=(id,title,prompts,followUp)=>S(id,'survey',title,'Escolha uma resposta e desenvolva duas delas. Não há gabarito.',{prompts,options:['Yes','No','It depends'],followUp,support:'For me,… / In my experience,… / For example,…'});
        const model=()=>S('model','dialogue',l.model.title,'Leiam os papéis e observem como a conversa se desenvolve.',{lines:l.model.lines});
        const docs=()=>R('documents',l.realWorld.title,l.realWorld.documents.map(d=>d.heading+'. '+d.body),l.realWorld.questions.map(q=>Array.isArray(q)?q:[q.question,q.answer]));
        const home=(a,b,c)=>S('homework','homework','Take an idea with you','Escolha uma opção.',{options:[['A','Create',a],['B','Speak',b],['C','Explore',c]]});
        const plans={
        2:()=>{
            const targets=[['foggy','required'],['at least','required'],['take a picture','required'],['different','required'],['most of the time','bonus'],['the whole time','bonus'],['take a trip','bonus'],['have a picnic','bonus']];
            return [
                S('baggage-claim','luggage-mystery','Baggage claim · Which suitcase is it?','O sistema sorteia uma mala sem mostrar a resposta. O aluno observa as três malas e faz até três perguntas curtas antes de escolher.',{
                    bags:[
                        {id:'maya',label:'BAG 18',traveler:'Maya',place:'Scotland',duration:'three weeks',weather:'cool and foggy',art:'castle-camera',items:[{icon:'📷',label:'camera'},{icon:'🏰',label:'castle postcard'},{icon:'🧣',label:'warm scarf'}],facts:{trip:'It was terrific.',weather:'It was cool and foggy.',pictures:'Yes, I took many pictures.',castle:'Yes, I visited a famous castle.',camping:'No, I stayed at a hotel.'},summary:'Maya took a trip to Scotland. It was cool and foggy, and she took many pictures.'},
                        {id:'leo',label:'BAG 24',traveler:'Leo',place:'the coast',duration:'four days',weather:'warm most of the time',art:'picnic-fishing',items:[{icon:'🧺',label:'picnic basket'},{icon:'🎣',label:'fishing rod'},{icon:'🧢',label:'sun hat'}],facts:{trip:'It was fantastic.',weather:'It was warm most of the time.',pictures:'No, I did not take many pictures.',castle:'No, I did not visit a castle.',camping:'No. I stayed at a small hotel.'},summary:'Leo took a trip to the coast. It was warm most of the time, and he had a picnic.'},
                        {id:'nia',label:'BAG 31',traveler:'Nia',place:'the mountains',duration:'two days',weather:'snowy the whole time',art:'snow-camp',items:[{icon:'⛺',label:'tent'},{icon:'🧤',label:'winter glove'},{icon:'🏔️',label:'mountain photo'}],facts:{trip:'It was terrific.',weather:'It was snowy the whole time.',pictures:'Yes, I took a picture of the snow.',castle:'No, I did not visit a castle.',camping:'Yes, I went camping.'},summary:'Nia took a trip to the mountains. It was snowy the whole time, and she went camping.'}
                    ],
                    questions:[
                        {id:'trip',label:'Ask about the trip',text:'How was your trip?'},
                        {id:'weather',label:'Ask about the weather',text:'What was the weather like?'},
                        {id:'pictures',label:'Ask about pictures',text:'Did you take many pictures?'},
                        {id:'castle',label:'Ask about a castle',text:'Did you visit a castle?'},
                        {id:'camping',label:'Ask about camping',text:'Did you go camping?'}
                    ],
                    support:['How was your trip?','What was the weather like?','Did you take many pictures?','Did you visit a castle?','Did you go camping?'],
                    targets
                }),
                S('weather-rescue','weather-rescue','Weather changed · Save the day','Abra um cartão de clima. O aluno escolhe um plano B e diz uma frase com at least. O professor interpreta o viajante e reage.',{
                    rounds:[
                        {id:'picnic',plan:'Have a picnic by the river',planIcon:'🧺',weather:'heavy rain',weatherIcon:'🌧️',need:'The traveler wants to see one famous place before the 4 p.m. train.',options:[{id:'castle',icon:'🏰',label:'Visit the castle'},{id:'picnic',icon:'🧺',label:'Have the picnic outside'},{id:'hotel',icon:'🏨',label:'Stay at the hotel'}],answer:'castle',model:'There was heavy rain, so we visited the castle. At least it was open.',reaction:'Good idea! The castle was terrific.'},
                        {id:'fishing',plan:'Go fishing in the morning',planIcon:'🎣',weather:'foggy',weatherIcon:'🌫️',need:'The traveler can wait until noon and still use the afternoon.',options:[{id:'wait',icon:'☕',label:'Wait at the hotel'},{id:'fish',icon:'🎣',label:'Go fishing in the fog'},{id:'leave',icon:'🧳',label:'End the trip'}],answer:'wait',model:'It was foggy, so we waited at the hotel. At least it was warm.',reaction:'Yes. We can go fishing later.'},
                        {id:'camping',plan:'Go camping for two nights',planIcon:'⛺',weather:'snowy the whole time',weatherIcon:'🌨️',need:'The traveler must stay for two nights and has no winter camping equipment.',options:[{id:'hotel',icon:'🏨',label:'Stay at a hotel'},{id:'camp',icon:'⛺',label:'Camp in the snow'},{id:'picnic',icon:'🧺',label:'Have a picnic'}],answer:'hotel',model:'It was snowy the whole time, so we stayed at a hotel. At least it was warm.',reaction:'Perfect. The hotel is different from the pictures, but it is comfortable.'}
                    ],
                    support:['It was ___.','It was ___ most of the time.','At least we ___.'],
                    targets
                }),
                S('model','dialogue','One photo, one good story','Primeiro identifique o clima, o lugar e a atividade. Depois leiam os papéis, ocultem um personagem e troquem.',{
                    lines:[
                        ['Julia','Hey, Ben! Welcome back. How was your trip?','Oi, Ben! Bem-vindo de volta. Como foi sua viagem?'],
                        ['Ben','It was terrific. I took a trip to a small town by the sea.','Foi maravilhosa. Fiz uma viagem para uma cidade pequena perto do mar.'],
                        ['Julia','What was the weather like?','Como estava o tempo?'],
                        ['Ben','It was cool and foggy most of the time.','Estava fresco e com neblina na maior parte do tempo.'],
                        ['Julia','Were you at the hotel the whole time?','Você ficou no hotel o tempo todo?'],
                        ['Ben','No. At least the fog was light on Saturday, so we had a picnic.','Não. Pelo menos a neblina estava fraca no sábado, então fizemos um piquenique.'],
                        ['Julia','Did you take many pictures?','Você tirou muitas fotos?'],
                        ['Ben','You bet. I really enjoyed taking pictures of the boats.','Com certeza. Gostei muito de tirar fotos dos barcos.']
                    ],
                    focus:[['Trip','a small town by the sea'],['Weather','cool and foggy'],['Activity','had a picnic'],['Enjoy + -ing','enjoyed taking pictures']],
                    targets
                }),
                S('camera-check','photo-caption-check','Camera roll · Fix the caption','Observe cada foto ilustrada. Uma informação da legenda está errada. Toque no detalhe, corrija a frase em voz alta e aprove a foto.',{
                    photos:[
                        {id:'castle',art:'foggy-castle',stamp:'SAT 09:12',visual:['fog','castle','scarf'],caption:'It was hot at the famous castle.',wrong:'hot',choices:['hot','cool and foggy','snowy'],answer:'cool and foggy',correction:'It was cool and foggy at the famous castle.'},
                        {id:'hotel',art:'snow-hotel',stamp:'SUN 08:40',visual:['snow','hotel window','winter weather'],caption:'It was warm and sunny at the hotel.',wrong:'warm and sunny',choices:['warm and sunny','snowy','cool and foggy'],answer:'snowy',correction:'It was snowy at the hotel.'},
                        {id:'picnic',art:'river-picnic',stamp:'MON 13:05',visual:['river','picnic basket','camera'],caption:'We went fishing by the river.',wrong:'went fishing',choices:['went fishing','had a picnic','went camping'],answer:'had a picnic',correction:'We had a picnic by the river and took a picture.'}
                    ],
                    support:['No, it was ___.','We were ___ most of the time.','We had / took ___.'],
                    finish:'CAMERA ROLL CHECKED · 3 CAPTIONS READY',
                    targets
                }),
                S('voice-postcard','voice-postcard','Send a 20-second voice postcard','Monte quatro partes da mensagem. Leia o resultado sem correr; o professor abre uma pergunta surpresa e o aluno responde com uma frase curta.',{
                    steps:[
                        {id:'place',label:'1 · PLACE',prompt:'Where did you go?',options:[{id:'scotland',label:'Scotland',value:'Scotland'},{id:'coast',label:'the coast',value:'the coast'},{id:'mountains',label:'the mountains',value:'the mountains'}]},
                        {id:'weather',label:'2 · WEATHER',prompt:'What was the weather like?',options:[{id:'foggy',label:'cool + foggy',value:'cool and foggy most of the time'},{id:'warm',label:'warm',value:'warm most of the time'},{id:'snowy',label:'snowy',value:'snowy the whole time'}]},
                        {id:'activity',label:'3 · ACTIVITY',prompt:'What did you enjoy?',options:[{id:'pictures',label:'taking pictures',value:'taking pictures'},{id:'camping',label:'going camping',value:'going camping'},{id:'fishing',label:'going fishing',value:'going fishing'},{id:'picnic',label:'having a picnic',value:'having a picnic'}]},
                        {id:'ending',label:'4 · ENDING',prompt:'How was it?',options:[{id:'terrific',label:'terrific',value:'The trip was terrific.'},{id:'fantastic',label:'fantastic',value:'The trip was fantastic.'},{id:'different',label:'different',value:'The place was completely different from my city.'}]}
                    ],
                    template:'Hi! I took a trip to {place}. It was {weather}. I really enjoyed {activity}. {ending}',
                    followUps:[
                        {question:'Were you there the whole time?',answers:['Yes, I was there the whole time.','No. I took a day trip.']},
                        {question:'Did you take many pictures?',answers:['Yes, I took many pictures.','No, I did not take many pictures.']},
                        {question:'How was your trip?',answers:['It was terrific.','It was fantastic.']}
                    ],
                    finish:'VOICE POSTCARD READY',
                    targets
                }),
                home('Escreva uma legenda de foto com lugar, clima e uma atividade.','Grave uma mensagem de 20–30 segundos usando I took a trip…, It was… e I enjoyed…ing.','Escolha uma foto real ou inventada e prepare duas respostas curtas para as perguntas do professor.')
            ];
        },
        4:()=>{
            const targets=[['How do I get to...?','required'],['go straight','required'],['walk past','required'],['across from','required'],['How long does it take?','bonus'],['on foot','bonus']];
            const cityMap={
                viewBox:[0,0,730,450],
                description:'Main Street and Garden Road run from west to east. Pine Street connects them on the west side, and King Street connects them on the east side. North of Main Street, from west to east, are the pharmacy, the café and the bank. Between Main Street and Garden Road are the bus station, the park and the library. South of Garden Road are the supermarket in the west and the clinic in the east.',
                streets:[['main','Main Street',0,120,730,50,'horizontal'],['garden','Garden Road',0,280,730,50,'horizontal'],['pine','Pine Street',220,120,50,330,'vertical'],['king','King Street',460,120,50,330,'vertical']],
                landmarks:[['pharmacy','Pharmacy',25,20,170,90],['cafe','Café',280,20,170,90],['bank','Bank',535,20,170,90],['bus','Bus station',25,180,170,90],['park','Park',280,180,170,90,'park'],['library','Library',535,180,170,90],['supermarket','Supermarket',25,340,170,90],['clinic','Clinic',535,340,170,90]]
            };
            const routes=[
                {id:'a',label:'Pharmacy → Bank',from:'pharmacy',to:'bank',streets:['main'],waypoints:[[110,110],[110,145],[620,145],[620,110]],model:'How do I get to the bank? Go to Main Street and turn left. Go straight and walk past the café. The bank is across from the library. It takes about six minutes on foot.'},
                {id:'b',label:'Supermarket → Café',from:'supermarket',to:'cafe',streets:['garden','pine','main'],waypoints:[[110,340],[110,305],[245,305],[245,145],[365,145],[365,110]],model:'How do I get to the café? Go straight to Garden Road and turn right. Go to Pine Street and turn left. Walk past the bus station. Turn right at Main Street. The café is across from the park. It takes about eight minutes on foot.'},
                {id:'c',label:'Clinic → Pharmacy',from:'clinic',to:'pharmacy',streets:['garden','king','main'],waypoints:[[620,340],[620,305],[485,305],[485,145],[110,145],[110,110]],model:'How do I get to the pharmacy? Go straight to Garden Road and turn left. Go to King Street and turn right. Walk past the library. Turn left at Main Street. Go straight and walk past the café. The pharmacy is across from the bus station. It takes about twelve minutes on foot.'}
            ];
            return [
                S('polite-help','polite-repair','Make them stop and help','O professor interpreta a pessoa na rua. O aluno transforma o pedido inadequado em uma abordagem educada; só depois compara com o modelo.',{cases:[
                    {person:'Busy commuter',prompt:'Bank?',model:'Excuse me. Could you tell me how to get to the bank?',reaction:'Sure. Go straight and turn right at the café.'},
                    {person:'Shop owner',prompt:'Tell me the way to the pharmacy.',model:'Excuse me. Could you help me? How do I get to the pharmacy?',reaction:'Of course. It is across from the bus station.'},
                    {person:'Person at the bus stop',prompt:'Where is the café?',model:'Excuse me. Is there a café near here?',reaction:'Yes. Walk past the bank. It is on your left.'}
                ],support:['Excuse me.','Could you help me?','How do I get to the ___?','Is there a ___ near here?','Thank you.'],targets}),
                S('voice-note','voice-note','Information desk · Listen and complete the ticket','O professor toca a mensagem sem mostrar a transcrição. O aluno ouve, diz três informações curtas e completa o cartão de atendimento.',{cases:[
                    {from:'Maya',transcript:'Hi. I need the pharmacy. I am at the bus station, and I think it is across from here. I want to walk. How long does it take on foot?',fields:[
                        {id:'destination',label:'She needs…',options:['the pharmacy','the bank','the café'],answer:0},
                        {id:'landmark',label:'She is at…',options:['the library','the bus station','the park'],answer:1},
                        {id:'question',label:'She asks about…',options:['the price','the walking time','the bus number'],answer:1}
                    ],model:'Maya needs the pharmacy. She is at the bus station. She asks how long it takes on foot.'},
                    {from:'Leo',transcript:'Hello. I am looking for the bank. I am outside the library. Is the bank across from here? I can go on foot.',fields:[
                        {id:'destination',label:'He needs…',options:['the clinic','the bank','the supermarket'],answer:1},
                        {id:'landmark',label:'He is at…',options:['the library','the café','the pharmacy'],answer:0},
                        {id:'transport',label:'He can go…',options:['by taxi','by bus','on foot'],answer:2}
                    ],model:'Leo needs the bank. He is outside the library. He can go on foot.'}
                ],support:['She needs the ___.','He is at the ___.','She asks: “How long does it take?”','Could you repeat that, please?']}),
                S('secret-place','secret-place','Secret meeting spot · Ask, do not guess','O professor vê um lugar secreto enquanto o aluno fecha os olhos. Depois responde apenas yes ou no. O aluno tem até três perguntas para descobrir o lugar.',{street:[
                    {id:'pharmacy',label:'Pharmacy',icon:'✚',detail:'on the corner'},
                    {id:'cafe',label:'Café',icon:'☕',detail:'tables outside'},
                    {id:'bank',label:'Bank',icon:'$',detail:'ATM by the door'},
                    {id:'library',label:'Library',icon:'▤',detail:'between two stores'},
                    {id:'market',label:'Supermarket',icon:'▣',detail:'green awning'}
                ],rounds:[
                    {secret:'bank',teacherClues:['It is next to the café.','It has an ATM.','It is not on the corner.'],model:'Is it next to the café? Is it the bank?'},
                    {secret:'pharmacy',teacherClues:['It is on the corner.','It is next to the café.','You can buy medicine there.'],model:'Is it on the corner? Is it the pharmacy?'},
                    {secret:'library',teacherClues:['It is next to the bank.','It is not on the corner.','You can borrow books there.'],model:'Is it next to the bank? Is it the library?'}
                ],support:['Is it next to the ___?','Is it near the ___?','Is it on the corner?','Is it the ___?']}),
                S('city-map','map-route','Map challenge · From A to B','O professor escolhe uma rota e pergunta como chegar. O aluno guia o professor pelo mapa, dando uma instrução curta por vez.',{map:cityMap,routes,trackTargets:false,steps:['O professor escolhe a rota 1, 2 ou 3 e pergunta: “How do I get to the ___?”','O aluno dá uma instrução curta por vez; o professor acompanha com o cursor.','O professor faz um movimento errado e pergunta “Here?”; o aluno corrige a rota.','O aluno completa a rota e diz o tempo. Só então revelem a resposta.'],support:['How do I get to the ___?','Go straight to ___ Road.','Go straight on ___ Street.','Turn left / right at ___.','Walk past the ___.','It is across from the ___.','How long does it take on foot?'],targets}),
                S('travel-desk','travel-time','Will they arrive on time?','O aluno pergunta quanto demora cada opção. O professor revela somente a informação pedida; depois o aluno escolhe e dá uma recomendação curta.',{cases:[
                    {situation:'Nina has a clinic appointment in 15 minutes.',goal:'Arrive before the appointment.',options:[{id:'walk',label:'Walk',icon:'WALK',time:'25 minutes'},{id:'bus',label:'Bus',icon:'BUS',time:'18 minutes'},{id:'taxi',label:'Taxi',icon:'TAXI',time:'8 minutes'}],answer:'taxi',outcome:'On time · seven minutes early',model:'How long does it take by taxi? It takes eight minutes. Take a taxi.'},
                    {situation:'Sam has 25 minutes and wants to save money.',goal:'Choose the cheapest option that arrives on time.',options:[{id:'walk',label:'Walk',icon:'WALK',time:'16 minutes'},{id:'bus',label:'Bus',icon:'BUS',time:'12 minutes · $4'},{id:'taxi',label:'Taxi',icon:'TAXI',time:'6 minutes · $18'}],answer:'walk',outcome:'On time · free trip',model:'How long does it take on foot? It takes sixteen minutes. Walk there.'},
                    {situation:'It is raining. Jo has 20 minutes and no money for a taxi.',goal:'Stay dry and arrive on time.',options:[{id:'walk',label:'Walk',icon:'WALK',time:'17 minutes'},{id:'bus',label:'Bus',icon:'BUS',time:'11 minutes · $4'},{id:'taxi',label:'Taxi',icon:'TAXI',time:'7 minutes · $20'}],answer:'bus',outcome:'On time · dry and within budget',model:'How long does it take by bus? It takes eleven minutes. Take the bus.'}
                ],support:['How long does it take on foot?','How long does it take by bus?','It takes ___ minutes.','Walk there.','Take the bus / a taxi.']}),
                S('meeting-message','meeting-message','Send a message the teacher can act on','O professor olha para o lado enquanto o aluno lê o cartão. O aluno esconde o cartão e transmite os detalhes. O professor escolhe o compromisso que entendeu.',{cases:[
                    {student:{person:'Maya',place:'Café Luna',landmark:'across from the library',time:'6:20',journey:'ten minutes on foot'},options:[
                        {title:'Maya · Café Luna · 6:20',detail:'Across from the library · ten minutes on foot'},
                        {title:'Maya · Café Luna · 6:40',detail:'Across from the park · ten minutes on foot'},
                        {title:'Leo · City Bank · 6:20',detail:'Across from the library · six minutes on foot'}
                    ],answer:0,model:'Meet Maya at Café Luna at 6:20. It is across from the library. It takes ten minutes on foot.'},
                    {student:{person:'Leo',place:'Green Pharmacy',landmark:'across from the bus station',time:'4:15',journey:'eight minutes on foot'},options:[
                        {title:'Leo · Green Pharmacy · 4:50',detail:'Across from the bus station · eight minutes on foot'},
                        {title:'Leo · Green Pharmacy · 4:15',detail:'Across from the bus station · eight minutes on foot'},
                        {title:'Maya · Green Pharmacy · 4:15',detail:'Next to the bus station · twelve minutes on foot'}
                    ],answer:1,model:'Meet Leo at Green Pharmacy at 4:15. It is across from the bus station. It takes eight minutes on foot.'}
                ],support:['Meet ___ at ___.','It is across from ___.','The time is ___.','It takes ___ minutes on foot.','Could you repeat the time, please?']}),
                home('Grave uma mensagem de 20–30 segundos com um lugar, um ponto de referência, um horário e o tempo a pé.','Crie três perguntas para descobrir um lugar secreto sem perguntar o nome diretamente.','Escolha um trajeto real e prepare quatro instruções curtas para usar na próxima aula.')
            ];
        },
        6:()=>{
            const targets=[['How good are you at...?','required'],['twice a week','required'],['warm up','required'],['at my own pace','required'],['not bad at all','bonus'],['take a break','bonus']];
            return [
                S('sports-radar','sports-radar','Sports radar · Play, go or do?','Diga a expressão completa antes de colocar cada cartão na área correta. Depois confira o painel.',{
                    categories:[
                        {id:'play',label:'PLAY',subtitle:'sports and games'},
                        {id:'go',label:'GO + -ING',subtitle:'movement activities'},
                        {id:'do',label:'DO',subtitle:'exercise and activities'}
                    ],
                    items:[
                        {id:'volleyball',label:'volleyball',icon:'🏐',category:'play',phrase:'play volleyball'},
                        {id:'tennis',label:'tennis',icon:'🎾',category:'play',phrase:'play tennis'},
                        {id:'running',label:'running',icon:'🏃',category:'go',phrase:'go running'},
                        {id:'swimming',label:'swimming',icon:'🏊',category:'go',phrase:'go swimming'},
                        {id:'yoga',label:'yoga',icon:'🧘',category:'do',phrase:'do yoga'},
                        {id:'workout',label:'a workout',icon:'🏋️',category:'do',phrase:'do a workout'}
                    ],
                    support:['play volleyball','go swimming','do yoga','do a workout'],
                    targets
                }),
                S('culture-workouts','culture-workouts','Two ways to make movement easier','Leia os dois cartões. Em cada um, encontre a pista, escolha uma resposta e descubra uma expressão útil.',{
                    cards:[
                        {
                            place:'Japan',
                            title:'Three minutes with the radio',
                            text:'In Japan, many people follow rajio taiso: a short workout with radio instructions and music. It takes about three minutes, gently moves the whole body and is used to warm up before some school sports activities.',
                            question:'What makes it easy to include in a morning?',
                            options:['a long match','about three minutes','a big team'],
                            answer:1,
                            expression:'warm up',
                            meaning:'prepare the body before an activity · aquecer antes da atividade',
                            transfer:'They warm up with a short radio workout.',
                            source:{label:'Web Japan · Working Out to the Radio',url:'https://web-japan.org/jvt/summary.html'}
                        },
                        {
                            place:'parkrun communities',
                            title:'Nobody has to hurry',
                            text:'At parkrun events, people can walk, jog or run. Walkers are welcome, there is no cut-off time, and a volunteer called the Tail Walker stays at the back to support them.',
                            question:'Which person can join?',
                            options:['only fast runners','a beginner who wants to walk','only team players'],
                            answer:1,
                            expression:'at your own pace',
                            meaning:'move at a comfortable speed · seguir no seu próprio ritmo',
                            transfer:'A beginner can walk at their own pace.',
                            source:{label:'parkrun Volunteer Hub · Walkers',url:'https://volunteer.parkrun.com/hc/en-us/articles/16857824613266-2-9-Walkers'}
                        }
                    ],
                    bridge:'Both activities make movement accessible to people who are not professional athletes.',
                    targets
                }),
                S('model','dialogue','A first week that is not too much','Primeiro descubra o que Nia procura. Depois leiam os papéis, ocultem um deles e troquem de função.',{
                    lines:[
                        ['Coach','Welcome. Is this your first training session?'],
                        ['Nia','Yes. I am a beginner and a little out of shape.'],
                        ['Coach','What activities do you enjoy?'],
                        ['Nia','I do yoga at home, and I like volleyball.'],
                        ['Coach','How good are you at playing volleyball?'],
                        ['Nia','I am not bad at all, but I need practice.'],
                        ['Coach','Great. Warm up with the team and train at your own pace.'],
                        ['Nia','Perfect. Can I come twice a week?']
                    ],
                    targets
                }),
                S('coach-console','coach-console','Coach console · Keep the member moving','O professor lê a fala do participante. O aluno responde como treinador com uma frase curta. Revelem o modelo e avancem até terminar a sessão.',{
                    moments:[
                        {label:'Before class',member:'I am ready. Can I start?',model:'Warm up first.',reaction:'Good. I am warming up.'},
                        {label:'Minute 8',member:'The group is fast. I cannot follow.',model:'Train at your own pace.',reaction:'Okay. I will slow down.'},
                        {label:'Minute 18',member:'I am tired.',model:'Take a break.',reaction:'Good idea. I need a break.'}
                    ],
                    support:['Warm up first.','Train at your own pace.','Take a break.','You are doing well.'],
                    outcome:'SESSION FINISHED',
                    targets
                }),
                S('workout-planner','workout-planner','Build Camila’s two-day plan','O professor abre o cartão privado e interpreta Camila. O aluno entrevista, consulta as aulas e escolhe exatamente duas sessões. Depois precisa adaptar o plano a uma mudança.',{
                    profile:{
                        name:'Camila',
                        lines:['I am a beginner, a little out of shape, and I want to get in shape.','I like music and activities without a team.','I am free on Tuesday, Thursday and Saturday.','I want to train twice a week, with a rest day between sessions.']
                    },
                    sessions:[
                        {id:'yoga',name:'Easy Yoga',day:'Monday',time:'18:00',phrase:'do yoga',level:'beginner',detail:'quiet · mat provided',icon:'🧘'},
                        {id:'dance',name:'Dance Workout',day:'Tuesday',time:'18:30',phrase:'do a dance workout',level:'beginner',detail:'music · no team',icon:'🎵'},
                        {id:'swim',name:'Swim Start',day:'Thursday',time:'19:00',phrase:'go swimming',level:'beginner',detail:'individual · equipment provided',icon:'🏊'},
                        {id:'volleyball',name:'Volleyball Practice',day:'Friday',time:'18:30',phrase:'play volleyball',level:'beginner',detail:'team · ball provided',icon:'🏐'},
                        {id:'walk',name:'Park Walk',day:'Saturday',time:'09:00',phrase:'go walking',level:'beginner',detail:'outdoors · at your own pace',icon:'🚶'}
                    ],
                    validPlans:[['dance','swim'],['dance','walk']],
                    change:{message:'Tuesday dance workout is full.',unavailable:'dance',validPlans:[['swim','walk']]},
                    questions:['When are you free?','Do you prefer a team activity?','Do you like music?','How good are you at...?','Is it for beginners?'],
                    support:['Camila can ___ on ___.','She can train twice a week.','There is a rest day between sessions.','She can train at her own pace.'],
                    model:'Camila can go swimming on Thursday and go walking on Saturday. She can train twice a week at her own pace.',
                    outcome:'MEMBER PLAN CONFIRMED',
                    targets
                }),
                home('Crie um cartão de aula com nome, dia, nível e uma expressão com play, go ou do.','Grave uma resposta de treinador de 20–30 segundos usando warm up, at your own pace ou take a break.','Escolha uma pessoa real ou fictícia e monte uma rotina de dois dias com um dia de descanso.')
            ];
        },
        8:()=>{
            const targets=[['What kind of...?','required'],['be interested in','required'],['What is it about?','required'],['give it a try','required'],['kind of','bonus'],['be into','bonus'],['keep up with','bonus'],['in my free time','bonus']];
            return [
                S('my-feed','interest-feed','Build your free-time feed','Escolha um cartão de cada linha. Antes de clicar, diga a frase do cartão.',{
                    groups:[
                        {id:'format',label:'1 · Choose a format',options:[
                            {id:'watch',label:'WATCH',detail:'documentaries',art:'screen',sentence:'In my free time, I watch documentaries.'},
                            {id:'listen',label:'LISTEN',detail:'podcasts',art:'headphones',sentence:'In my free time, I listen to podcasts.'},
                            {id:'read',label:'READ',detail:'articles',art:'article',sentence:'In my free time, I read articles.'}
                        ]},
                        {id:'topic',label:'2 · Choose a subject',options:[
                            {id:'places',label:'PEOPLE & PLACES',art:'city',sentence:'I am interested in people and places.'},
                            {id:'ideas',label:'SCIENCE & TECHNOLOGY',art:'lightbulb',sentence:'I am interested in science and technology.'},
                            {id:'now',label:'WHAT IS HAPPENING NOW',art:'newspaper',sentence:'I keep up with current events.'}
                        ]},
                        {id:'style',label:'3 · Choose a style',options:[
                            {id:'short',label:'SHORT',art:'timer',sentence:'I like short episodes.'},
                            {id:'visual',label:'VISUAL',art:'camera',sentence:'I am into visual stories.'},
                            {id:'simple',label:'SIMPLE LANGUAGE',art:'speech',sentence:'I find technical language kind of difficult.'}
                        ]}
                    ],
                    fictionalPreset:{label:'Usar um perfil fictício',choices:{format:'listen',topic:'places',style:'short'}},
                    outputLabel:'MY FEED IS READY',
                    teacherPrompt:'What kind of content do you like?'
                }),
                S('slow-tv','slow-tv-story','Would you watch 134 hours of TV?','Faça uma previsão, descubra a história e dê uma reação de duas frases.',{
                    badge:'NORWAY · 2011',
                    headline:'One program. Almost six days.',
                    paragraphs:['In 2011, NRK showed a ship journey live.','The program followed MS Nordnorge from Bergen to Kirkenes.','It continued for 134 hours — almost six days.','Viewers saw the Norwegian coast minute by minute.'],
                    runtime:'134 h · 42 min · 45 sec',
                    hypothesis:{question:'What does “minute by minute” mean here?',options:['Only the most exciting moments.','The complete journey as it happened.','A short review after the trip.'],answer:1},
                    reactions:['I find the idea fascinating.','It sounds kind of slow.','I find it kind of boring.'],
                    tryChoices:['I want to give it a try.','I only want to watch a short part.','It is not for me.'],
                    sources:[
                        {label:'National Library of Norway · Hurtigruten minute by minute',url:'https://www.nb.no/dokumentarv-i-nasjonalbiblioteket/hurtigruten-minutt-for-minutt/'},
                        {label:'Guinness World Records · Longest live TV documentary broadcast',url:'https://www.guinnessworldrecords.com/world-records/longest-live-tv-documentary-broadcast'}
                    ]
                }),
                S('model','dialogue','A six-day recommendation','Primeiro identifique os interesses. Depois escolham os papéis e troquem.',{
                    lines:[
                        ['Maya','What do you do in your free time?','O que você faz no seu tempo livre?'],
                        ['Theo','I listen to podcasts. I like to keep up with current events.','Eu escuto podcasts. Gosto de acompanhar as atualidades.'],
                        ['Maya','What kind of podcasts do you like?','De que tipo de podcast você gosta?'],
                        ['Theo','Short ones with simple language. What are you interested in?','Dos curtos, com linguagem simples. Pelo que você se interessa?'],
                        ['Maya','I am into travel documentaries, but some are kind of slow.','Eu curto documentários de viagem, mas alguns são meio lentos.'],
                        ['Theo','Then try Coast Live. It follows a ship in Norway.','Então experimente Coast Live. Ele acompanha um navio na Noruega.'],
                        ['Maya','What is it about?','Sobre o que é?'],
                        ['Theo','The Norwegian coast. The views are fascinating. Give it a try.','A costa norueguesa. As paisagens são fascinantes. Experimente.']
                    ]
                }),
                S('review-desk','review-editor','The fair-review desk','Leia os fatos. Monte uma resenha justa, diga a frase e publique.',{
                    cases:[
                        {id:'city-podcast',rawTitle:'BORING FROM START TO FINISH!',facts:['The first two minutes are slow.','Then the host tells three fascinating city stories.'],slots:[['The whole episode','The beginning'],['is kind of slow','is terrible'],['and there is nothing interesting.','but the stories are fascinating.']],answer:[1,0,1],model:'The beginning is kind of slow, but the stories are fascinating.'},
                        {id:'science-article',rawTitle:'ONLY FOR EXPERTS!',facts:['The article uses two technical words.','The pictures are clear.','The explanations are short.'],slots:[['Some words','Every sentence'],['are impossible','are kind of technical'],['but the pictures help.','and nobody can understand it.']],answer:[0,1,0],model:'Some words are kind of technical, but the pictures help.'},
                        {id:'travel-documentary',rawTitle:'BEST DOCUMENTARY EVER!',facts:['The images are beautiful.','Two parts repeat the same idea.'],slots:[['I find the images','I find every part'],['perfect','fascinating'],['so the program has no problems.','but two parts are kind of boring.']],answer:[0,1,1],model:'I find the images fascinating, but two parts are kind of boring.'}
                    ],
                    teacherPrompt:'Which fact supports your review?',
                    outcome:'3 FAIR REVIEWS PUBLISHED'
                }),
                S('recommendation-desk','recommendation-studio','Help Luca choose','Faça as três perguntas, recomende uma opção e adapte quando a situação mudar.',{
                    caller:{name:'Luca',opening:'I need something for my bus ride, but I do not know what to choose.',questions:[
                        {prompt:'What kind of content do you like?',answer:'I like documentaries and photo articles.'},
                        {prompt:'What are you interested in?',answer:'Food, travel, and how people live.'},
                        {prompt:'How much time do you have?',answer:'About twenty minutes.'}
                    ]},
                    catalogue:[
                        {id:'city-ten',title:'City in Ten',kind:'podcast',about:'local news and current events',length:'10 min',level:'simple',access:'FREE',art:'city-headphones'},
                        {id:'future-everyday',title:'Future Everyday',kind:'podcast',about:'science and technology',length:'25 min',level:'kind of technical',access:'FREE',art:'future-microphone'},
                        {id:'people-plates',title:'People & Plates',kind:'documentary',about:'food, travel and family restaurants',length:'20 min',level:'simple',access:'FREE PREVIEW',art:'food-screen'},
                        {id:'night-lens',title:'Night Lens',kind:'photo article',about:'people and street photography in different cities',length:'5 min',level:'simple',access:'FREE',art:'night-camera'}
                    ],
                    firstAnswer:'people-plates',
                    teacherFollowUp:'That sounds interesting. What is it about?',
                    firstModel:'You are into travel and food, so try People & Plates. It is a short documentary about family restaurants. Give it a try.',
                    change:'The free preview has ended. This documentary now needs a subscription.',
                    alternativeAnswer:'night-lens',
                    alternativeModel:'Then try Night Lens. It is a free photo article about people in different cities. It is short. Give it a try.',
                    outcome:'LUCA SAVED IT FOR THE BUS RIDE',
                    targets
                }),
                home('Crie um card visual para um podcast, documentário ou artigo fictício. Inclua título, tipo, assunto e uma frase de recomendação.','Grave 20–30 segundos: diga o que faz no tempo livre, mencione um interesse, use fascinating ou kind of e termine com “Give it a try.”','Escolha algo real que você já conhece. Anote título, tipo, assunto e uma resposta curta para “What is it about?”.')
            ];
        },
        10:()=>{
            const targets=[['feel like','required'],['So do I.','required'],['Neither do I.','required'],['rather than','required'],['be in the mood for','bonus'],['That sounds good.','bonus'],['share a dish','bonus']];
            return [
                S('flavor-lens','flavor-lens','Flavor lens · How would you describe it?','Observe a ilustração e as pistas. Diga sua hipótese, escolha uma palavra e confira a frase.',{
                    cards:[
                        {id:'curry',icon:'🌶️',clues:['red sauce','strong flavor','with chili'],options:['sweet','spicy','sour'],answer:'spicy',model:'The curry tastes spicy.'},
                        {id:'chips',icon:'🍟',clues:['fried potato','salt on top','served hot'],options:['salty','bitter','sour'],answer:'salty',model:'The chips taste salty.'},
                        {id:'cake',icon:'🍰',clues:['dessert','with honey','with tea'],options:['sweet','salty','bitter'],answer:'sweet',model:'The cake tastes sweet.'},
                        {id:'lemon',icon:'🍋',clues:['yellow fruit','often in drinks','strong taste'],options:['fresh','sour','spicy'],answer:'sour',model:'The lemon tastes sour.'},
                        {id:'coffee',icon:'☕',clues:['dark drink','no milk','no sugar'],options:['bitter','sweet','salty'],answer:'bitter',model:'Black coffee can taste bitter.'},
                        {id:'salad',icon:'🥗',clues:['lettuce and tomato','made today','served cold'],options:['fresh','bitter','spicy'],answer:'fresh',model:'The salad is fresh.'}
                    ],
                    finale:{prompt:'Choose two foods. Which would you choose?',frame:'I would choose ___ rather than ___.'},
                    support:['It may be ___.','It tastes ___.','I prefer ___ rather than ___.']
                }),
                S('food-history','food-history-strip','The travelling dish · Build the story','Leia os três cartões ilustrados e coloque a história em ordem. Depois descubra dois sabores possíveis.',{
                    intro:'Fish and chips is famous in Britain, but its story connects different communities.',
                    cards:[
                        {id:'fish',date:'1500s',icon:'🐟',title:'Fried fish travels',text:'People from Jewish communities in Portugal and Spain probably brought a way of frying fish to London.'},
                        {id:'workers',date:'1800s',icon:'🐟 + 🥔',title:'Two foods meet',text:'Fried fish and potatoes became popular with London workers.'},
                        {id:'shop',date:'around 1860',icon:'🏪',title:'A chippy opens',text:'Joseph Malin, a Jewish migrant, opened one of London’s first fish-and-chip shops.'}
                    ],
                    order:['fish','workers','shop'],
                    languageNote:{title:'What does “chips” mean here?',text:'In this British dish, chips means fries.'},
                    tasteCheck:[
                        {question:'With salt, the chips taste...',options:['salty','sweet'],answer:0},
                        {question:'With vinegar, they can taste...',options:['bitter','sour'],answer:1}
                    ],
                    conclusion:'It is a British dish with a multicultural history.',
                    source:{label:'London Museum · How London got hooked on fish & chips',url:'https://www.londonmuseum.org.uk/collections/london-stories/how-london-got-hooked-on-fish-chips/'}
                }),
                S('model','dialogue','Dinner at the night market','Leiam os papéis. Depois oculte um personagem e troquem apenas duas preferências.',{
                    lines:[
                        ['Maya','Do you feel like eating out tonight?'],
                        ['Leo','Yes. I love spicy food, and I want to try something new.'],
                        ['Maya','So do I. I do not like very salty dishes.'],
                        ['Leo','Neither do I. What about the fresh curry?'],
                        ['Maya','It looks good. Does the sauce taste sour?'],
                        ['Leo','A little. Let’s choose it rather than the fried noodles.'],
                        ['Maya','Great. Let’s order one curry and one sweet dessert to share.'],
                        ['Leo','Perfect. We can try two different flavors.']
                    ]
                }),
                S('agreement-chain','agreement-chain','Same table? · Build the agreement chain','Alterne quem começa. O ouvinte escolhe SAME ou DIFFERENT e responde com uma frase curta.',{
                    rounds:[
                        {speaker:'Teacher',listener:'Student',statements:[{text:'I love trying spicy dishes.',polarity:'positive'}]},
                        {speaker:'Teacher',listener:'Student',statements:[{text:'I do not like bitter coffee.',polarity:'negative'}]},
                        {speaker:'Student',listener:'Teacher',statements:[{text:'I love sweet food.',polarity:'positive'},{text:'I prefer fresh food.',polarity:'positive'}]},
                        {speaker:'Student',listener:'Teacher',statements:[{text:'I do not like salty snacks.',polarity:'negative'},{text:'I do not like sour drinks.',polarity:'negative'}]}
                    ],
                    responseMap:{positive:{same:'So do I.',different:'I do not.'},negative:{same:'Neither do I.',different:'I do.'}},
                    outcome:'FOUR REACTIONS CONNECTED'
                }),
                S('shared-tray','shared-tray','Night-market tray · One order for two','Cada pessoa memoriza seu cartão privado. Depois conversem e coloquem exatamente dois pratos na bandeja.',{
                    profiles:[
                        {id:'student',label:'Student ticket',lines:['I feel like something sweet.','I love fresh food.','I do not like bitter flavors.']},
                        {id:'teacher',label:'Teacher ticket',lines:['I am in the mood for something spicy.','I want a dish with fruit.','I do not like food that is too salty.']}
                    ],
                    items:[
                        {id:'mango',name:'Chili Mango Bowl',icon:'🥭',flavors:['fresh','spicy','sour'],fruit:true},
                        {id:'berry',name:'Berry Cup',icon:'🫐',flavors:['fresh','sweet'],fruit:true},
                        {id:'noodles',name:'Fire Noodles',icon:'🍜',flavors:['spicy','salty'],fruit:false},
                        {id:'fish',name:'Lemon Fish',icon:'🐟',flavors:['sour','salty'],fruit:false},
                        {id:'cocoa',name:'Cocoa Bites',icon:'🍫',flavors:['sweet','bitter'],fruit:false},
                        {id:'wrap',name:'Green Wrap',icon:'🌯',flavors:['fresh','sour'],fruit:false}
                    ],
                    slots:2,
                    validTrays:[['mango','berry']],
                    questions:['What do you feel like eating?','Do you like spicy food?','Which flavor do you prefer?','Do you like bitter food?','Would you rather have ___ or ___?'],
                    support:['I feel like ___.','I love / do not like ___.','So do I. / Neither do I.','Let’s choose ___ rather than ___.'],
                    model:'Let’s order the Chili Mango Bowl and the Berry Cup. One is fresh and spicy, and the other is sweet.',
                    outcome:'SHARED TRAY READY',
                    targets
                }),
                home('Desenhe ou fotografe três alimentos, identifique os sabores e escreva uma comparação com rather than.','Grave 20–30 segundos respondendo “What do you feel like eating?” com dois sabores.','Prepare duas preferências positivas e duas negativas para um jogo de So do I / Neither do I.')
            ];
        },
        12:()=>{
            const targets=[['I would like...','required'],['without','required'],['There is a mistake with my order.','required'],['Could we have the bill?','required'],['Would you like...?','bonus'],['anything else','bonus'],['allergy','bonus'],['separate bills','bonus']];
            return [
                S('table-ready','table-ready','Table 4 · Ready for the guests?','Observe a reserva e a mesa. O aluno diz o que falta; o professor só adiciona o item depois de ouvir o pedido em inglês.',{
                    booking:{name:'Nia Costa',time:'7:00 p.m.',party:'table for two'},
                    checklist:['two chairs','two menus','two water glasses'],
                    initial:{chairs:2,menus:1,waterGlasses:1},
                    items:[
                        {id:'menu',label:'one more menu',art:'menu',phrase:'One more menu, please.',required:true},
                        {id:'water',label:'one more water glass',art:'water',phrase:'Tap water for two, please.',required:true},
                        {id:'dessert',label:'dessert',art:'dessert',phrase:'Would you like dessert?',required:false,feedback:'Too early. The guests have not ordered.'},
                        {id:'bill',label:'the bill',art:'bill',phrase:'Could we have the bill?',required:false,feedback:'Too early. The meal has not started.'}
                    ],
                    required:['menu','water'],
                    teacherPrompt:'Host: Is table 4 ready?',
                    finalModel:'Yes. The table for two is ready.',
                    outcome:'TABLE 4 READY'
                }),
                S('model','dialogue','Before the order goes to the kitchen','Identifique qual pedido é apenas uma preferência e qual informação exige verificação. Depois leiam os papéis, ocultem um deles e troquem.',{
                    lines:[
                        ['Server','Good evening. I have your booking for two.','Boa noite. Tenho sua reserva para duas pessoas.'],
                        ['Nia','Thank you. We would like some tap water, please.','Obrigada. Gostaríamos de água, por favor.'],
                        ['Server','Of course. Are you ready to order?','Claro. Vocês estão prontos para pedir?'],
                        ['Nia','Yes. I would like the vegetable pasta without cheese.','Sim. Eu gostaria da massa com vegetais sem queijo.'],
                        ['Server','Is that a preference or an allergy?','Isso é uma preferência ou uma alergia?'],
                        ['Nia','A preference. My friend has a peanut allergy.','Uma preferência. Minha amiga tem alergia a amendoim.'],
                        ['Server','Thank you for telling me. I will note the allergy and check with the kitchen before I confirm any food.','Obrigada por avisar. Vou registrar a alergia e verificar com a cozinha antes de confirmar qualquer alimento.'],
                        ['Nia','Great. We will wait before we order dessert.','Ótimo. Vamos esperar antes de pedir a sobremesa.']
                    ]
                }),
                S('allergy-checkpoint','allergy-checkpoint','Allergy checkpoint · Never guess from a short menu','O professor lê a fala do cliente. O aluno responde como atendente e escolhe somente a ação sustentada pelas informações disponíveis.',{
                    rule:'A short menu description is not a complete allergy check.',
                    menu:{name:'Sunset Cake',description:'Chocolate cake · cream · berries',price:'$7',warning:'Short description — not a complete ingredient or cross-contact record.'},
                    guest:'I have a peanut allergy. Is the Sunset Cake safe for me?',
                    firstStep:{prompt:'What can the server honestly do now?',actions:[
                        {id:'guess',label:'Guess from the short menu',correct:false,feedback:'The menu is incomplete. Do not promise safety.'},
                        {id:'check',label:'Check with the kitchen',correct:true,model:'I cannot confirm that from this menu. I will check with the kitchen.'}
                    ]},
                    kitchen:{message:'This cake is prepared in an area that also handles peanuts. We cannot confirm it is safe for this guest.'},
                    finalStep:{prompt:'Tell the guest only what the kitchen confirmed.',actions:[
                        {id:'promise-another',label:'Promise that another dessert is safe',correct:false,feedback:'That dessert was not checked either.'},
                        {id:'explain-and-check',label:'Explain the uncertainty and offer another check',correct:true,model:'We cannot confirm that this cake is safe. I can check another dessert for you.'}
                    ]},
                    preferenceCompare:{guest:'I do not like onions. Could you leave them out?',kitchen:'Yes. The onions can be left out before cooking.',model:'Yes, we can leave out the onions.',note:'The kitchen confirmed this preference change. That does not confirm allergy safety.'},
                    outcome:'COMMUNICATION CHECK PASSED · DISH NOT CONFIRMED SAFE',
                    sources:[
                        {label:'Food Standards Agency · Ordering allergy-safe food',url:'https://www.food.gov.uk/print/pdf/node/22196'},
                        {label:'FDA · Food Allergies and cross-contact',url:'https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/food-allergies'}
                    ]
                }),
                S('ticket-decoder','ticket-decoder','The kitchen printer speaks in code','Estes são códigos fictícios deste restaurante. O aluno decifra cada bloco em voz alta; o professor vira o bloco somente depois de ouvir.',{
                    notice:'Fictional house codes — real restaurants use different systems.',
                    legend:[['TS','tomato soup'],['VP','vegetable pasta'],['TW','tap water'],['NO','without'],['CHZ','cheese'],['D/L','dessert later']],
                    ticket:{table:'T4',tokens:[
                        {id:'starter',code:'1 TS',answer:'one tomato soup'},
                        {id:'main',code:'1 VP',answer:'one vegetable pasta'},
                        {id:'change',code:'NO CHZ',answer:'without cheese'},
                        {id:'drink',code:'2 TW',answer:'two tap waters'},
                        {id:'dessert',code:'D/L',answer:'dessert later'}
                    ]},
                    teacherPrompt:'What does the complete ticket say?',
                    model:'Table four would like one tomato soup and one vegetable pasta without cheese. They would like two tap waters, and dessert later.',
                    outcome:'ORDER CONFIRMED BEFORE COOKING'
                }),
                S('bill-audit','bill-audit','Table 4 · Stop the wrong bill','Primeiro peça a conta. Depois compare o pedido confirmado com o recibo. O aluno diz a correção e o professor marca somente as cobranças erradas.',{
                    openModel:'Could we have the bill, please?',
                    confirmedOrder:[
                        {id:'soup',label:'Tomato soup',quantity:1,amount:6},
                        {id:'pasta',label:'Vegetable pasta without cheese',quantity:1,amount:15},
                        {id:'tap-water',label:'Tap water',quantity:2,amount:0},
                        {id:'dessert-later',label:'Dessert',status:'later'}
                    ],
                    receipt:[
                        {id:'soup',label:'Tomato soup',quantity:1,amount:6},
                        {id:'pasta',label:'Vegetable pasta without cheese',quantity:1,amount:15},
                        {id:'sparkling-water',label:'Sparkling water',quantity:1,amount:3},
                        {id:'cake',label:'Chocolate cake',quantity:1,amount:7}
                    ],
                    printedTotal:31,
                    errorIds:['sparkling-water','cake'],
                    repairModel:'Excuse me. There is a mistake with my order. We ordered tap water, and we did not order cake.',
                    correctedReceipt:[
                        {label:'Tomato soup',quantity:1,amount:6},
                        {label:'Vegetable pasta without cheese',quantity:1,amount:15},
                        {label:'Tap water',quantity:2,amount:0}
                    ],
                    correctedTotal:21,
                    removedAmount:10,
                    tip:{printed:'TIP NOT INCLUDED',question:'Is the tip included?',answer:'No. The tip is not included.'},
                    closePrompt:'Ask for two bills.',
                    closeModel:'Could we have separate bills, please?',
                    splitBills:[{label:'Bill A',items:['Tomato soup'],total:6},{label:'Bill B',items:['Vegetable pasta without cheese'],total:15}],
                    outcome:'BILL CORRECTED · $10 REMOVED · TWO BILLS PRINTED',
                    targets
                }),
                home('Crie um ticket fictício com quatro códigos, uma legenda e a confirmação completa em inglês.','Grave 20–30 segundos como atendente: reconheça uma alergia, diga que precisa verificar com a cozinha e não confirme que um prato é seguro sem informação completa.','Crie um pedido e uma conta fictícia com um erro. Escreva a correção, o total certo e um pedido de contas separadas.')
            ];
        },
        14:()=>{const targets=[['upset','required'],['patient','required'],['give someone space','required'],['Is everything okay?','required'],['be in a good mood','bonus'],['cheer up','bonus']];return [
            S('targets','target-tracker','Your language mission','Use os quatro alvos obrigatórios ao longo da aula. Uma frase curta lida ou adaptada conta.',{targets}),
            S('tone-detective','decision','What does Kai need?','Leia a mensagem e escolha a informação correta. Depois complete duas frases com o banco de palavras.',{scenario:'Kai: “I am upset. I do not want to talk now.”',options:[['A','Advice now','Kai wants advice now.'],['B','Some space','Kai wants some space.'],['C','A celebration','Kai is in a good mood.']],followUp:'Complete: Kai is ____. Kai wants some ____.',support:'upset · space',choicePrompt:'Escolha a informação que aparece na mensagem.',targets}),
            S('model','dialogue','A short supportive response','Primeiro identifique: Kai quer conversar agora? Depois leiam os papéis. Na segunda vez, troquem os nomes.',{lines:[['Ana','You seem upset. Is everything okay?'],['Kai','I had a difficult day. I do not want to talk now.'],['Ana','Okay. I can give you some space.'],['Kai','Thank you.'],['Ana','I can send you a message later.'],['Kai','That is good. Thank you for being patient.']]}),
            S('round-1','roleplay','Round 1 · Talk or space?','O professor escolhe um cartão sem mostrar. O aluno ouve e responde em apenas duas ou três frases.',{roles:[{name:'Student · Friend',goal:'Ask one question and choose one short response.',details:['ask: Is everything okay?','listen for TALK or SPACE','choose one reply card','finish with one next step']},{name:'Teacher · Kai',goal:'Read one mood card and choose TALK or SPACE.',details:['I am upset. I want to talk.','I am upset. I need some space.','I am tired, but I am okay.','answer with one short sentence']}],steps:['Listen to the teacher’s card.','Ask: “Is everything okay?”','Listen for TALK or SPACE.','Choose and read one short response.'],support:['You seem upset.','Is everything okay?','I can listen.','Okay. I can give you some space.','No problem. I can be patient.'],model:'Is everything okay? Okay. I can give you some space. I can message you later.',targets}),
            S('support-replay','mission','Round 2 · Cheer Kai up','Leia a nova mensagem. Faça uma pergunta e escolha uma atividade. Depois troque somente a atividade quando a resposta mudar.',{board:[['New message','Kai: “I feel better now. I want to do something fun at home.”'],['Your result','Ask one question and offer one simple activity.']],steps:['Read the new message.','Ask if Kai is in a good mood now.','Offer one activity.','Reveal the change and replace only the activity.'],support:['Are you in a good mood now?','Let’s watch a video to cheer you up.','Do you want to play a game?','Okay. Let’s talk for five minutes.'],model:'Are you in a good mood now? Let’s watch a video to cheer you up.',surprise:'Kai does not want to watch a video. Kai wants to talk for five minutes. Change only the last sentence.',targets}),
            S('exit','exit','TALK or SPACE','O professor diz TALK ou SPACE. Responda com duas ou três frases usando o banco de apoio.',{checks:['Usei “upset” para reconhecer o humor.','Perguntei “Is everything okay?”','Usei “patient” ou “give someone space” numa resposta curta.'],targets}),
            home('Complete três respostas usando o banco de palavras.','Grave duas respostas de 15–20 segundos: uma para TALK e outra para SPACE.','Classifique três mensagens como TALK, SPACE ou CHEER UP.')
        ];},
        16:()=>[docs(),
            M('opening','Who does this information help?',['a witness','a receptionist','a person describing an injury'],[['1. Where does it hurt?','C — a person describing an injury'],['2. What did you see before the person fell?','A — a witness'],['3. What is your emergency contact’s phone number?','B — a receptionist']]),
            Q('report','The report writer made mistakes',[['Note: 4 p.m., wet entrance, left arm. Report: “At 5 p.m., he fell in the kitchen and hurt his right arm.” Correct it.','At 4 p.m., he fell at the wet entrance and hurt his left arm.'],['What can you say if you did not see how it started?','I did not see how it started.'],['Why should you separate what you saw from what you guessed?','So the listener knows which details are certain.']]),
            C('body','A small incident in a story',['slippery','arm','witness','bandage'],['In this fictional scene, the floor was (1) ____. A person fell and hurt an (2) ____. A (3) ____ described what happened. Later, the person returned with a (4) ____.'],[['1','slippery'],['2','arm'],['3','witness'],['4','bandage']]),
            T('retell','Same event, two voices',[['Witness','Descreva uma queda fictícia usando horário, local e o que viu.'],['Reporter','O professor resume; você corrige detalhes.'],['Swap','Troquem as funções com outro acontecimento simples.']],'Can we keep the facts accurate?','I saw… / It happened at… / I did not see…'),
            home('Escreva um relato fictício com quatro fatos verificáveis.','Ensaie como dizer onde dói e quando começou, sem buscar diagnóstico.','Descreva uma cena de filme distinguindo o que viu do que imaginou.')],
        18:()=>[
            U('opening','What makes it worth buying?',['The cheapest option is usually best.','A warranty matters to me.','I prefer to see a product before buying it.','A delivery fee can change my decision.'],'Which detail do you check first?'),docs(),
            M('adverts','The small print',['delivery fee','warranty','refund','budget'],[['1. Money you can spend.','D — budget'],['2. Money returned after a purchase.','C — refund'],['3. An extra charge to bring the item to you.','A — delivery fee'],['4. A promise covering certain product problems.','B — warranty']]),
            Q('compare','A fictional bargain',[['Store A: $30 plus $8 delivery. Store B: $35, free delivery. Which costs less in total?','Store B: $35 instead of $38.'],['Both sell the same item, but Store A offers a longer warranty. Is B necessarily the better choice?','No. It depends on the value you place on the warranty and the exact terms.'],['What would you ask before buying?','Possible questions: When will it arrive? What does the warranty cover?']]),
            T('advert','Make an honest advertisement',[['Describe','Escolha um objeto e apresente dois pontos bons.'],['Be honest','Inclua uma limitação.'],['Buyer','O professor faz perguntas e decide se compraria.']],'Would the advertisement help you decide?'),
            home('Crie dois anúncios com preços e condições fictícias.','Compare dois objetos que você conhece.','Identifique uma informação que costuma faltar em anúncios e faça uma pergunta em inglês.')],
        20:()=>[model(),
            U('opening','Would you lend it?',['I would lend a favorite book.','I would lend my phone for a quick call.','I like agreeing on a return date.','It is easy to say no to a friend.'],'What changes your answer?'),docs(),
            M('meanings','Same object, different direction',['borrow','lend','return','replace'],[['1. You give me your charger for one day. You… it to me.','B — lend'],['2. I use your charger for one day. I… it from you.','A — borrow'],['3. I bring the charger back. I… it.','C — return'],['4. It is broken, so I buy another one for you. I… it.','D — replace']]),
            T('library','A library of things',[['Imagine','Além de livros, o que uma biblioteca poderia emprestar?'],['Choose','Escolha três objetos e explique por que seriam úteis.'],['Agree','Combine prazo, uso e devolução de um objeto com o professor.']],'Which object would be the most popular?'),
            home('Crie regras simples para emprestar um objeto.','Ensaie um pedido e uma recusa educada.','Pense num objeto que poucas pessoas precisam usar todos os dias e explique como poderia ser compartilhado.')],
        22:()=>[
            R('letters','Two friends, two versions of a memory',['Jo: We met at a school music club. I remember that you were very confident. You invited me to sit with you, and we talked about our favorite songs. We used to meet there every Friday.','Cam: Confident? I was nervous! I invited you because I did not know anyone either. I remember that we both forgot the words to the first song. We laughed and became friends. We live in different cities now, but we still send each other music.'],[['Where did they meet?','At a school music club.'],['What did Jo think about Cam?','That Cam was confident.'],['How did Cam actually feel?','Nervous.'],['What tradition continues today?','They send each other music.']]),
            M('connections','Keeping the connection',['shared interest','hometown','reunion','tradition'],[['1. A place where someone grew up.','B — hometown'],['2. An activity repeated over time.','D — tradition'],['3. Something both people enjoy.','A — shared interest'],['4. Meeting again after time apart.','C — reunion']]),
            U('friendship','How do you stay in touch?',['I have a friend from childhood.','I enjoy sending short messages.','A shared activity makes conversation easier.'],'You can talk about a fictional friendship, too.'),
            T('portrait','A friend in three details',[['A habit','Conte algo que a pessoa costuma fazer.'],['A memory','Conte um momento que passaram juntos.'],['A difference','Diga uma diferença entre vocês e uma coisa em comum.']],'What makes this person special to you?'),
            home('Escreva um convite para reencontrar um amigo ou personagem.','Conte uma lembrança usando before, then e now.','Escolha uma música ou atividade que lembra alguém e explique a ligação, sem precisar citar letras.')],
        24:()=>[
            M('opening','Who is wearing it?',['a plain shirt','a striped shirt','a loose jacket','tight jeans'],[['1. It has lines in two colors.','B — a striped shirt'],['2. It has no pattern.','A — a plain shirt'],['3. It has plenty of room around the body.','C — a loose jacket'],['4. They fit very closely around the legs.','D — tight jeans']]),docs(),
            U('style','Your clothes, your choices',['Comfort is more important than fashion.','I like secondhand clothes.','I have clothes for one special occasion.','Colors can change how I feel.'],'Describe an outfit you enjoy wearing.'),
            Q('packing','The suitcase mistake',[['Trip: a cold weekend with a long walk. Bag: sandals, thin shirt, shorts. What is missing?','Possible answers: warm clothes, a jacket and suitable walking shoes.'],['Why might a fashionable item be the wrong choice for this trip?','It may not be warm or comfortable enough.']]),
            T('describe','The invisible outfit',[['Choose','Imagine uma roupa completa e a ocasião.'],['Describe','Descreva sem dizer para onde está indo.'],['Guess','O professor adivinha a ocasião e explica quais pistas usou.']],'How many different occasions fit the same clothes?'),
            home('Crie uma lista de roupas para uma ocasião e explique as escolhas.','Descreva uma roupa sem usar o nome das cores; use ocasião, textura ou combinação.','Observe uma peça de roupa e prepare uma descrição de padrão e tamanho.')],
        26:()=>{const targets=[['What should I do?','required'],['tell the truth','required'],['think it over','required'],['consequence','required'],['advice','bonus'],['truth','bonus']];return [
            R('reservation-story','The dinner reservation',['Lucas planned a birthday dinner for Emma. He said, “I booked a table for 8 p.m.” But he forgot to call the restaurant. When they arrived, there was no table.','Lucas felt embarrassed. He said, “The restaurant lost our reservation.” Ten minutes later, a table became free. Emma smiled and said, “It was not your fault.” Lucas now feels worse. Should he tell her the truth?'],[['What did Lucas forget?','He forgot to book the table.'],['What did he tell Emma?','He said the restaurant lost the reservation.'],['Does Emma know the truth?','No, she does not.']]),
            S('first-decision','decision','What would you do?','Não existe uma resposta única. Escolha o que você faria e use apenas um motivo do banco.',{scenario:'You are Lucas. Emma still believes the restaurant made the mistake. What do you do?',options:[['A','Tell her now','“I forgot the reservation. I am sorry.”'],['B','Tell her after dinner','Enjoy the dinner, then speak to her privately.'],['C','Say nothing','Keep the story about the restaurant.']],followUp:'Complete: I would choose ____. Because it is ____.',support:'honest · kind · a better moment · a possible problem later',choicePrompt:'Escolha A, B ou C. Depois dê um motivo curto.',targets}),
            S('model','dialogue','Lucas asks for advice','Leiam o diálogo. Depois oculte Maya e o aluno completa as falas de conselho com o apoio.',{lines:[['Lucas','I need your advice. I lied to Emma about the reservation.'],['Maya','Why did you lie?'],['Lucas','I was embarrassed. What should I do?'],['Maya','I think you should tell the truth.'],['Lucas','Now or after dinner?'],['Maya','Think it over, but do not wait too long. A small lie can have a bigger consequence.']]}),
            S('advice-clinic','roleplay','Give Lucas some advice','O professor interpreta Lucas. O aluno faz uma pergunta e dá um conselho de duas ou três frases. Pode ler o apoio.',{roles:[{name:'Student · Friend',goal:'Listen to Lucas and give short, practical advice.',details:['ask one question','choose now or after dinner','use should','add one consequence']},{name:'Teacher · Lucas',goal:'Tell the problem and react to the advice.',details:['I forgot the reservation','I blamed the restaurant','Emma does not know','But Emma may be angry']}],steps:['O professor conta o problema em duas frases.','O aluno escolhe uma pergunta do apoio.','O aluno dá um conselho de duas frases.','O professor diz “But Emma may be angry”; o aluno responde mais uma vez.'],support:['Why did you lie?','Does Emma know the truth?','You should tell the truth.','You can tell her after dinner.','Think it over, but…','One consequence is…'],model:'You should tell the truth and say sorry. She may be upset, but another lie can have a bigger consequence.',targets}),
            S('advice-replay','mission','A kind truth','Leia a nova situação e diga o que você falaria. Depois, responda à nova informação sem recomeçar toda a resposta.',{board:[['Real-life situation','Maria’s friend cooked dinner for her. Maria does not like the food. Her friend is very happy and asks, “Do you like it?”'],['Your choice','Lie, give a very direct answer, or be kind and honest?']],steps:['Escolha uma das três possibilidades.','Complete: “I would say…”','Dê um conselho curto para Maria.','Revele a nova informação e acrescente apenas uma frase.'],support:['Thank you for dinner.','It is not my favorite, but…','I want to be honest.','You should be kind.','Think it over before you answer.'],model:'Thank you for dinner. I want to be honest: it is not my favorite, but I am happy to be here. Maybe we can try a different dish next time.',surprise:'Her friend says: “Great! I will cook the same dish again next week.” Add one kind and honest sentence.',targets}),
            S('privacy','conversation','Privacy is not a lie','Pratiquem uma conversa curta. O professor é o colega curioso; o aluno responde sem inventar uma história.',{tasks:[['Situation','Sofia missed work yesterday. A coworker asks why. The reason is personal.'],['First answer','Choose: invent a reason · tell everything · protect her privacy politely.'],['Second turn','The coworker asks again: “But what happened?” Repeat the limit politely.']],goal:'What should Sofia say?',challenge:'It is personal, but everything is okay. / I prefer not to talk about it. / Thank you for asking.'}),
            S('exit','exit','Your real-life answer','O professor escolhe uma das três histórias. Diga três frases curtas: o que você faria, um conselho e uma possível consequência. Pode ler os alvos.',{checks:['Disse “I would…” para dar minha opinião.','Dei um conselho curto com “should”.','Usei “truth”, “think it over” ou “consequence”.'],targets}),
            home('Escolha uma história e escreva uma resposta de três frases.','Grave uma opinião de 20 segundos usando “I would…” e “You should…”.','Crie uma situação fictícia curta e duas opções de conselho.')
        ];},
        28:()=>[
            U('opening','Best for whom?',['A crowded place can be exciting.','The most famous place is always the best.','I prefer a peaceful afternoon to a busy tour.'],'Compare your answers with the professor’s.'),docs(),
            R('opinions','One place, opposite reviews',['Review A: The market was the highlight of my trip. There were people everywhere, music in every street and lots of food to try. I loved it.','Review B: The market was too crowded for me. The queues were long, and I could not find a peaceful place to sit. The quiet garden nearby was much better.'],[['Do the reviews necessarily disagree about the facts?','No. Both describe a busy market.'],['What is different?','The visitors’ preferences and reactions.'],['Which reviewer might recommend the market to someone who likes lively places?','Reviewer A.']]),
            T('ranking','An unexpected top three',[['Category','Escolha: lugares para conversar, comidas simples ou pequenas coisas que melhoram um dia.'],['Rank','Faça um top 3 e explique seus critérios.'],['Compare','Compare com o professor. Vocês precisam ter a mesma classificação?']],'Your reasons matter more than the order.'),
            home('Escreva duas opiniões diferentes sobre um mesmo lugar fictício.','Apresente seu top 3 com comparações.','Escolha um lugar conhecido e diga para quem ele seria uma boa opção.')],
        30:()=>[
            C('opening','A note to my future self',['hope','first step','habit','obstacle'],['I (1) ____ to read more in English. My (2) ____ is five minutes after lunch. A busy schedule is one (3) ____, so I want a small daily (4) ____.'],[['1','hope'],['2','first step'],['3','obstacle'],['4','habit']]),
            R('future','The time-capsule club',['Four friends wrote messages to their future selves. One hoped to live abroad. Another wanted to learn to cook. A third predicted that they would all have very different jobs. The fourth simply hoped they would still be friends.','They decided to open the messages in five years. Before closing the box, each person wrote one small action for the next week. “The future is interesting,” one friend said, “but what are we going to do on Monday?”'],[['What did they put in the box?','Messages about hopes and predictions.'],['Did all the messages focus on work?','No. They included cooking, living abroad and friendship.'],['Why did they add a small action?','To connect future hopes with something they could start soon.']]),
            U('predictions','Do you think so?',['I will have the same hobbies in five years.','I will use English outside class this year.','My town will look different in ten years.'],'Explain a prediction and how certain you are.'),
            T('capsule','Your three-message time capsule',[['A hope','Escreva ou diga algo que espera.'],['A prediction','Faça uma previsão sobre a vida cotidiana.'],['A question','Faça uma pergunta para seu eu do futuro.']],'What can you start next week?','I hope… / I think… will… / I am going to…'),
            home('Escreva sua mensagem para o futuro em 80–120 palavras.','Conte um objetivo, um obstáculo e um primeiro passo.','Observe uma mudança em sua rotina e faça uma previsão sobre ela.')]
        };
        return plans[l.sourceLesson+1]();
    }

    const lesson = config => Object.freeze({...config, followUp: FOLLOW_UPS[config.sourceLesson + 1], activities: variedActivities(config), editorialRevision: "2026-09-10-varied-communication"});

    const lessons = {
        2: lesson({
            sourceLesson: 1,
            title: 'A Trip Abroad',
            mission: 'Descobrir pistas de uma viagem, lidar com uma mudança de clima e enviar uma mensagem curta sobre a experiência.',
            outcome: 'Ao final, o aluno faz até três perguntas sobre uma viagem e conta lugar, clima e atividade em quatro frases curtas.',
            quickStart: [
                ['One question', 'Ask: How was your trip?'],
                ['Weather icon', 'Choose cool, warm, hot, foggy or snowy.'],
                ['One activity', 'Choose take a picture, go camping, go fishing or have a picnic.'],
                ['One positive detail', 'Complete: At least…']
            ],
            model: {
                title: 'Back from Scotland',
                setting: 'Julia meets Mark after his three-week vacation.',
                lines: [['Julia', 'Welcome back! How was your trip?'], ['Mark', 'It was terrific. I spent three weeks in Scotland.'], ['Julia', 'What was the weather like?'], ['Mark', 'It was cool and foggy most mornings, but at least it did not rain the whole time.'], ['Julia', 'Were you in Glasgow the whole time?'], ['Mark', 'Almost. I took a day trip to Edinburgh and visited a famous castle.'], ['Julia', 'Did you take many pictures?'], ['Mark', 'You bet. I really enjoyed exploring the city.']],
                questions: [['How long was Mark away?', 'He was away for three weeks.'], ['What was the weather like?', 'It was cool and foggy most mornings.'], ['Where did he take a day trip?', 'He took a day trip to Edinburgh.'], ['What did he enjoy doing?', 'He enjoyed exploring the city.']]
            },
            realWorld: {
                genre: 'Two travel updates',
                title: 'During the trip and after the trip',
                instruction: 'Leia as duas mensagens e observe como os detalhes mudam de uma atualização rápida para um relato depois da viagem.',
                documents: [
                    { label: 'Message 1 · Glasgow', heading: 'Hi, everyone!', body: 'I am having a fantastic time in Glasgow. It is cool and foggy today, so I am visiting a museum. Tomorrow I am taking a train to Edinburgh. At least the heavy rain has stopped!' },
                    { label: 'Message 2 · Back home', heading: 'The trip is over', body: 'I enjoyed every day of the trip. I visited a famous castle, took dozens of pictures, and tried local food. The weather was completely different from home, but that made the experience more interesting.' }
                ],
                questions: [['Why is the traveler visiting a museum?', 'Because it is cool and foggy.'], ['What is planned for the next day?', 'A train trip to Edinburgh.'], ['Which activities are mentioned after the trip?', 'Visiting a castle, taking pictures, and trying local food.'], ['How was the weather different?', 'It was completely different from the weather at home.']]
            },
            frames: [['Ask about place', 'Where did you spend your vacation?', 'Onde você passou suas férias?'], ['Ask about duration', 'How long were you away?', 'Quanto tempo você ficou fora?'], ['Ask for detail', 'What was the weather like?', 'Como estava o tempo?'], ['Develop the answer', 'I enjoyed visiting... because...', 'Eu gostei de visitar... porque...']],
            recycle: ['foggy', 'at least', 'take a picture', 'different', 'most of the time', 'the whole time', 'take a trip', 'have a picnic'],
            rolePlay: { title: 'Travel interview', instruction: 'O aluno é o viajante; o professor é o entrevistador. Depois, troquem os papéis.', roles: [{ name: 'Traveler', goal: 'Tell a clear vacation story.', details: ['destination and duration', 'weather', 'two activities', 'one memorable detail'] }, { name: 'Interviewer', goal: 'Keep the conversation moving.', details: ['ask where and how long', 'ask about weather', 'ask two follow-ups', 'react naturally'] }], outcome: 'The interviewer gives a 30-second summary of the traveler’s trip.' },
            guided: { questions: ['Where did you go on your last vacation or day trip?', 'How long were you there?', 'Who did you go with?', 'What did you do there?', 'What was the weather and food like?', 'Did you take pictures or buy anything?', 'Would you like to go there again? Why?'], followUps: ['What happened next?', 'What was the best part?', 'Was it like that the whole time?', 'How was it different from home?'], support: ['I was away for...', 'Most of the time...', 'At least...', 'I really enjoyed...ing'] },
            challenge: { title: 'A 20-second voice postcard', prompt: 'Say four short sentences, then answer one question from the teacher.', steps: ['Say the place.', 'Describe the weather.', 'Say one activity with enjoyed + -ing.', 'Finish with terrific, fantastic or at least.'], mustUse: ['take a trip', 'weather word', 'enjoyed + -ing', 'at least or most of the time'], model: 'I took a trip to the coast. It was warm most of the time. I enjoyed taking pictures. The trip was terrific.' },
            homework: ['Write one photo caption with place, weather and activity.', 'Prepare two short answers about a real or invented trip.', 'Record a 20–30 second voice postcard.']
        }),

        4: lesson({
            sourceLesson: 3,
            title: 'In the Middle of Nowhere',
            mission: 'Pedir e seguir direções com frases curtas quando o mapa do celular não funciona.',
            outcome: 'Ao final, o aluno pede uma rota, entende instruções curtas e repete dois ou três passos com apoio.',
            quickStart: [['Landmark check', 'Name four places people use as landmarks.'], ['One clear instruction', 'Give one route instruction with an imperative.'], ['Distance guess', 'Estimate how long a nearby route takes.'], ['Clarify', 'Ask the speaker to repeat one step.']],
            model: { title: 'No signal on Lake Road', setting: 'Two travelers stop at a gas station to ask for help.', lines: [['Traveler', 'Excuse me. Could you help us? We are looking for Pine Lake.'], ['Attendant', 'Sure. Go back to the roundabout and take the third exit.'], ['Traveler', 'Do we turn before or after the bridge?'], ['Attendant', 'After the bridge. Then continue straight for about eight kilometers.'], ['Traveler', 'Is the entrance easy to see?'], ['Attendant', 'Yes. It is across from a small hotel, next to a red gate.'], ['Traveler', 'How long does it take from here?'], ['Attendant', 'About fifteen minutes by car.']], questions: [['Where do the travelers want to go?', 'They want to go to Pine Lake.'], ['Which exit should they take?', 'The third exit.'], ['When should they turn?', 'After the bridge.'], ['Where is the entrance?', 'Across from a hotel, next to a red gate.']] },
            realWorld: { genre: 'Route card', title: 'Find the community center', instruction: 'Leia o cartão de rota e transforme as notas curtas em instruções completas.', documents: [{ label: 'Start', heading: 'Central Station', body: 'Exit through the main entrance. Turn right at the traffic light. Walk two blocks and cross the bridge.' }, { label: 'Finish', heading: 'Community Center', body: 'After the bridge, walk past the pharmacy. The center is on the corner, across from the park. The trip takes about twelve minutes on foot.' }], questions: [['Where does the route start?', 'At Central Station.'], ['What should you do at the traffic light?', 'Turn right.'], ['Which place do you walk past?', 'The pharmacy.'], ['How long does the route take?', 'About twelve minutes on foot.']] },
            frames: [['Ask for directions', 'How do I get to the community center?', 'Como chego ao centro comunitário?'], ['Check one step', 'Do I turn before or after the bridge?', 'Eu viro antes ou depois da ponte?'], ['Give a route', 'Go straight and walk past the bank.', 'Siga reto e passe pelo banco.'], ['Ask about time', 'How long does it take on foot?', 'Quanto tempo leva a pé?']],
            recycle: ['How do I get to...?', 'go straight', 'walk past', 'across from', 'How long does it take?', 'on foot'],
            rolePlay: { title: 'Information gap · Find the destination', instruction: 'Cada pessoa possui apenas parte da informação. Não mostrem os cartões; façam perguntas.', roles: [{ name: 'Student · Visitor', goal: 'Find the art center.', details: ['you are at the bus terminal', 'your phone has no signal', 'ask about distance and travel time', 'repeat the final route'] }, { name: 'Teacher · Local', goal: 'Guide the visitor.', details: ['two blocks straight', 'left after the bank', 'across from the library', 'eight minutes on foot'] }], outcome: 'The visitor repeats the full route without help.' },
            guided: { questions: ['How do I get from your home to a supermarket?', 'What is on the corner near your school or workplace?', 'Which places are across from each other in your neighborhood?', 'How long does your usual commute take?', 'When was the last time you asked for directions?', 'Which instruction is easiest to misunderstand?'], followUps: ['What happens after that?', 'Which landmark will I see?', 'Is it before or after the intersection?', 'Can you say the complete route again?'], support: ['Go straight...', 'Turn at...', 'Walk past...', 'It takes about...'] },
            challenge: { title: 'Route rescue', prompt: 'A visitor has no internet and must arrive before a building closes. Give the route and solve one misunderstanding.', steps: ['Identify the starting point.', 'Give 4–5 ordered instructions.', 'Use two landmarks.', 'Confirm the route and travel time.'], mustUse: ['at least three movement expressions', 'before or after', 'one clarification question', 'It takes...'], model: 'Go straight for two blocks and turn left after the bank. Walk past the pharmacy and cross the small bridge. The center is across from the library. It takes about ten minutes on foot.' },
            homework: ['Draw a simple route with five landmarks.', 'Write the directions in six complete steps.', 'Practice giving the route while looking only at the map.']
        }),

        6: lesson({
            sourceLesson: 5,
            title: 'Couch Potato or Soccer Fanatic?',
            mission: 'Usar play, go e do para falar de habilidade, frequência e uma rotina possível para um iniciante.',
            outcome: 'Ao final, o aluno entrevista um perfil, escolhe duas sessões e adapta o plano a uma mudança.',
            quickStart: [['Go, do or play?', 'Give one activity with each verb.'], ['Frequency', 'Say how often you exercise.'], ['Skill check', 'Describe one activity you are good or bad at.'], ['Goal', 'Say one reason to get in shape.']],
            model: { title: 'A routine that actually fits', setting: 'Mia asks Rafael about his weekly workout.', lines: [['Mia', 'Do you play any sports?'], ['Rafael', 'I play volleyball on Fridays, and I go running twice a week.'], ['Mia', 'How good are you at volleyball?'], ['Rafael', 'I am not bad at all, but I still need practice.'], ['Mia', 'Do you work out at a gym?'], ['Rafael', 'Sometimes. I prefer exercising outside. What about you?'], ['Mia', 'I do yoga, but I am a beginner at swimming.'], ['Rafael', 'There is a beginner class twice a week. You can train at your own pace.']], questions: [['Which sport does Rafael play?', 'He plays volleyball.'], ['How often does he go running?', 'Twice a week.'], ['Where does he prefer exercising?', 'Outside.'], ['What is Mia a beginner at?', 'Swimming.']] },
            realWorld: { genre: 'Weekly workout board', title: 'Choose the right class', instruction: 'Compare the schedule with the two member profiles.', documents: [{ label: 'Gym schedule', heading: 'Tuesday to Saturday', body: 'Tue 7 p.m.: beginner yoga. Thu 6 p.m.: circuit workout. Fri 7 p.m.: volleyball practice. Sat 9 a.m.: swimming for beginners.' }, { label: 'Member A', heading: 'Lucas', body: 'Lucas is out of shape and dislikes team sports. He is free on Tuesday and Saturday.' }, { label: 'Member B', heading: 'Nina', body: 'Nina plays volleyball well, wants more practice, and is only free on Friday evening.' }], questions: [['Which two classes fit Lucas’s schedule?', 'Beginner yoga and beginner swimming.'], ['Why is circuit workout not ideal for Lucas?', 'He is a beginner and wants a gentler activity.'], ['Which class is best for Nina?', 'Volleyball practice.'], ['What can each person do before exercising?', 'They can warm up.']] },
            frames: [['Ask about routine', 'What do you do to stay active?', 'O que você faz para se manter ativo?'], ['Ask about skill', 'How good are you at swimming?', 'Quão bom você é em natação?'], ['Describe frequency', 'I work out twice a week.', 'Eu treino duas vezes por semana.'], ['Give a modest answer', 'I am not bad at all, but I need practice.', 'Não sou nada mal, mas preciso praticar.']],
            recycle: ['How good are you at...?', 'not bad at all', 'get in shape', 'twice a week', 'warm up', 'at my own pace', 'take a break', 'beginner'],
            rolePlay: { title: 'Coach and new member', instruction: 'O professor entrevista; o aluno explica objetivos e limites. Depois, escolham uma rotina.', roles: [{ name: 'New member', goal: 'Find a realistic activity.', details: ['available twice a week', 'beginner at team sports', 'enjoys being outdoors', 'wants to get in shape'] }, { name: 'Coach', goal: 'Recommend a safe routine.', details: ['ask about preferences', 'ask about ability', 'offer two options', 'explain warm-up and frequency'] }], outcome: 'Agree on a two-day weekly plan and explain why it fits.' },
            guided: { questions: ['What do you do to stay active?', 'Which sports do you play or watch?', 'How good are you at one activity?', 'How often do you work out?', 'Do you prefer exercising alone or with a team?', 'What activity would you like to try?'], followUps: ['How long have you done that?', 'What equipment do you need?', 'What makes it difficult?', 'What would be a realistic first step?'], support: ['I play...', 'I go + -ing', 'I do...', 'I am good at + -ing'] },
            challenge: { title: 'Build a realistic week', prompt: 'Choose two beginner activities for a fictional member and present the plan in three short sentences.', steps: ['Ask about free days and preferences.', 'Choose two activities.', 'Say twice a week.', 'Add warm up or at your own pace.'], mustUse: ['one phrase with go, do or play', 'How good are you at...?', 'twice a week', 'warm up or at your own pace'], model: 'Camila can go swimming on Thursday and go walking on Saturday. She can train twice a week. She can warm up first and train at her own pace.' },
            homework: ['Create a seven-day activity calendar.', 'Write five questions for a fitness interview.', 'Record a one-minute recommendation for a beginner.']
        }),

        8: lesson({
            sourceLesson: 7,
            title: 'Free-Time Activities',
            mission: 'Fazer perguntas curtas sobre interesses, reagir a uma opinião e recomendar um conteúdo possível.',
            outcome: 'Ao final, o aluno monta um perfil, melhora uma resenha e adapta uma recomendação a uma nova informação.',
            quickStart: [['Three interests', 'Name three things you are interested in.'], ['Strong opinion', 'Describe something fascinating or boring.'], ['Media habit', 'Say what you read, watch, or listen to.'], ['Soft opinion', 'Use kind of before an adjective.']],
            model: { title: 'A podcast recommendation', setting: 'Lena and Sam compare what they follow in their free time.', lines: [['Lena', 'What kind of podcasts do you listen to?'], ['Sam', 'Mostly science and technology. I find them fascinating.'], ['Lena', 'I like them too, but some episodes are kind of technical.'], ['Sam', 'True. What are you interested in?'], ['Lena', 'Travel stories and local news.'], ['Sam', 'Are you into documentaries as well?'], ['Lena', 'Sometimes, especially when they show how people live.'], ['Sam', 'Then I have a great recommendation for you.']], questions: [['What kind of podcasts does Sam follow?', 'Science and technology podcasts.'], ['What does Lena find difficult?', 'Some episodes are kind of technical.'], ['Which subjects interest Lena?', 'Travel stories and local news.'], ['What will Sam probably do?', 'Recommend something to Lena.']] },
            realWorld: { genre: 'Event and media cards', title: 'Match the person to the activity', instruction: 'Leia os perfis e escolha a melhor opção para cada pessoa.', documents: [{ label: 'Option A', heading: 'City Stories Live', body: 'A local journalist shares surprising stories about the city. The talk is informal and includes audience questions.' }, { label: 'Option B', heading: 'Future Lab Podcast', body: 'A detailed weekly podcast about technology, science, and new research. Some episodes are technical.' }, { label: 'Option C', heading: 'Street Food Documentary', body: 'A short documentary about food, travel, and the people behind family restaurants.' }], questions: [['Which option is best for someone into technology?', 'Future Lab Podcast.'], ['Which option includes audience interaction?', 'City Stories Live.'], ['Which option combines travel and food?', 'Street Food Documentary.'], ['Which option may be difficult for a beginner?', 'Future Lab Podcast because it can be technical.']] },
            frames: [['Ask the category', 'What kind of documentaries do you watch?', 'Que tipo de documentário você assiste?'], ['Ask about interest', 'What are you interested in?', 'No que você tem interesse?'], ['Soften an opinion', 'It is kind of technical.', 'É meio técnico.'], ['Recommend', 'If you are into travel, you might like this.', 'Se você curte viagens, talvez goste disto.']],
            recycle: ['What kind of...?', 'be interested in', 'kind of', 'be into', 'keep up with', 'in my free time', 'give it a try', 'What is it about?'],
            rolePlay: { title: 'Recommendation exchange', instruction: 'Cada pessoa recebe um perfil diferente e deve recomendar uma opção adequada.', roles: [{ name: 'Student', goal: 'Find something for a quiet evening.', details: ['likes travel stories', 'does not enjoy technical language', 'has only one hour', 'wants something relaxing'] }, { name: 'Teacher / Partner', goal: 'Recommend and justify.', details: ['ask two interest questions', 'offer two options', 'compare them', 'explain the final choice'] }], outcome: 'The student accepts or rejects the recommendation and gives a reason.' },
            guided: { questions: ['What are you interested in these days?', 'What kind of news do you follow?', 'Which podcast or documentary do you recommend?', 'What do you find fascinating?', 'What is kind of boring for you?', 'How do you keep up with your interests?'], followUps: ['What do you like about it?', 'Who would also enjoy it?', 'How often do you follow it?', 'Can you give me one example?'], support: ['I am interested in...', 'I find it...', 'It is kind of...', 'You might like...'] },
            challenge: { title: 'One useful recommendation', prompt: 'Ask three short questions, choose one item and adapt it if the listener cannot access it.', steps: ['Ask about kind.', 'Ask about topic.', 'Check the time.', 'Recommend and adapt one detail.'], mustUse: ['What kind of...?', 'interested in', 'What is it about?', 'give it a try'], model: 'You are interested in travel, so try this short documentary. It is about family restaurants. Give it a try.' },
            homework: ['Write a short review of a podcast, article, or documentary.', 'Prepare three recommendations for different interests.', 'Record a 60-second free-time recommendation.']
        }),

        10: lesson({
            sourceLesson: 9,
            title: 'Fish ’n’ Chips',
            mission: 'Comparar preferências de comida e chegar a uma escolha que funcione para duas pessoas.',
            outcome: 'Ao final, o aluno descreve sabores, concorda ou discorda e negocia uma refeição.',
            quickStart: [['Flavor words', 'Describe one spicy, sweet, salty, and sour food.'], ['Today’s mood', 'Say what you feel like eating.'], ['Agreement', 'Agree with a positive food preference.'], ['Contrast', 'Choose one dish rather than another.']],
            model: { title: 'What are you in the mood for?', setting: 'Two friends choose dinner after work.', lines: [['Ana', 'Do you feel like eating out tonight?'], ['Ben', 'Yes. I am in the mood for something spicy.'], ['Ana', 'So am I, but I do not want anything too salty.'], ['Ben', 'What about the new Thai place?'], ['Ana', 'The curry looks good. I would choose that rather than fried food.'], ['Ben', 'Me too. Do you like sour flavors?'], ['Ana', 'Not very much. I prefer fresh, mild dishes.'], ['Ben', 'Then we can order two dishes and share.']], questions: [['What does Ben feel like eating?', 'Something spicy.'], ['What does Ana want to avoid?', 'Anything too salty.'], ['Which food does she prefer?', 'Curry rather than fried food.'], ['How do they solve the difference?', 'They decide to order two dishes and share.']] },
            realWorld: { genre: 'Food app reviews', title: 'Choose a place for both diners', instruction: 'Compare the reviews and find a restaurant that respects both profiles.', documents: [{ label: 'Review A', heading: 'Fire Bowl', body: 'Very spicy noodles and excellent service. The portions are large, but several dishes are quite salty.' }, { label: 'Review B', heading: 'Fresh Table', body: 'Fresh salads, mild soups, and homemade desserts. Good for people who prefer light flavors.' }, { label: 'Review C', heading: 'Market Kitchen', body: 'A mixed menu with spicy curry, fresh fish, rice dishes, and sweet desserts. Most dishes can be adjusted.' }], questions: [['Which restaurant is best for very spicy food?', 'Fire Bowl.'], ['Which place offers mostly mild food?', 'Fresh Table.'], ['Which place is easiest for different preferences?', 'Market Kitchen.'], ['Why is adjustment useful?', 'Because diners can choose the flavor intensity.']] },
            frames: [['Ask the immediate preference', 'What do you feel like eating?', 'O que você está com vontade de comer?'], ['Agree', 'So do I.', 'Eu também.'], ['Agree with a negative', 'Neither do I.', 'Eu também não.'], ['State a choice', 'I would choose fish rather than pasta.', 'Eu escolheria peixe em vez de massa.']],
            recycle: ['spicy', 'fresh', 'feel like', 'So do I.', 'Neither do I.', 'rather than', 'be in the mood for', 'share a dish'],
            rolePlay: { title: 'One dinner, two preferences', instruction: 'Não escolham antes de conversar. Descubram as preferências e negociem.', roles: [{ name: 'Student', goal: 'Choose a light meal.', details: ['likes fresh food', 'does not like bitter flavors', 'wants a small dessert', 'budget is flexible'] }, { name: 'Teacher / Partner', goal: 'Choose a flavorful meal.', details: ['likes spicy food', 'does not want fried food', 'prefers eating out', 'wants to share one dish'] }], outcome: 'Agree on a restaurant and a two-dish order.' },
            guided: { questions: ['What food do you feel like eating today?', 'Which flavors do you enjoy most?', 'What food is too salty or sweet for you?', 'Do you prefer eating out or cooking?', 'Which dish would you choose rather than fast food?', 'What is a good meal for people with different tastes?'], followUps: ['What does it taste like?', 'How is it prepared?', 'Who usually eats it with you?', 'What would you order with it?'], support: ['I feel like...', 'So do I.', 'Neither do I.', 'I would rather...'] },
            challenge: { title: 'One tray for two', prompt: 'Use two short preference tickets and choose two dishes that work together.', steps: ['Ask what the other person feels like eating.', 'React with So do I or Neither do I.', 'Choose two dishes.', 'Say the final order.'], mustUse: ['feel like', 'So do I or Neither do I', 'rather than', 'two flavor adjectives'], model: 'I feel like something fresh. Let’s choose the mango bowl rather than the noodles. We can share the berry cup too.' },
            homework: ['Create a five-item menu with flavor descriptions.', 'Write a dialogue between two diners with different preferences.', 'Record the final restaurant recommendation in one minute.']
        }),

        12: lesson({
            sourceLesson: 11,
            title: 'In a Restaurant',
            mission: 'Conduzir uma interação simples de restaurante, verificar uma alergia sem adivinhar e corrigir pedido e conta.',
            outcome: 'Ao final, o aluno prepara a mesa, confirma o pedido e corrige duas cobranças com frases curtas.',
            quickStart: [['Menu order', 'Put starter, main course, side dish, and dessert in order.'], ['Polite request', 'Ask for a menu politely.'], ['One restriction', 'Say one ingredient you want a dish without.'], ['Close the meal', 'Ask for the bill.']],
            model: { title: 'A small change to the order', setting: 'A customer asks questions before ordering lunch.', lines: [['Server', 'Good afternoon. Are you ready to order?'], ['Customer', 'Almost. What comes with the grilled fish?'], ['Server', 'It comes with rice and a side salad.'], ['Customer', 'Could I have vegetables instead of rice?'], ['Server', 'Of course. Would you like a starter?'], ['Customer', 'No, thank you. I would like the fish without onions, please.'], ['Server', 'Anything else?'], ['Customer', 'Sparkling water, please. We will decide about dessert later.']], questions: [['What is the main course?', 'Grilled fish.'], ['What change does the customer request?', 'Vegetables instead of rice.'], ['Which ingredient should be removed?', 'Onions.'], ['Do they order dessert now?', 'No, they decide later.']] },
            realWorld: { genre: 'Menu and order ticket', title: 'Check the order before it goes to the kitchen', instruction: 'Leia o cardápio e compare com o pedido registrado.', documents: [{ label: 'Lunch menu', heading: 'Riverside Café', body: 'Tomato soup $6 · Grilled fish with rice and salad $18 · Pasta with vegetables $15 · Chocolate cake $7 · Fruit salad $6.' }, { label: 'Order ticket', heading: 'Table 4', body: '1 tomato soup · 1 grilled fish without onions · replace rice with vegetables · 1 sparkling water · dessert later.' }], questions: [['How much is the grilled fish?', '$18.'], ['Which starter was ordered?', 'Tomato soup.'], ['What substitution is on the ticket?', 'Vegetables instead of rice.'], ['When will the customer choose dessert?', 'Later.']] },
            frames: [['Offer', 'Would you like a starter?', 'Você gostaria de uma entrada?'], ['Order', 'I would like the grilled fish.', 'Eu gostaria do peixe grelhado.'], ['Check readiness', 'Are you ready to order?', 'Você está pronto para pedir?'], ['Request the bill', 'Could we have the bill, please?', 'Poderíamos receber a conta, por favor?']],
            recycle: ['I would like...', 'without', 'There is a mistake with my order.', 'Could we have the bill?', 'Would you like...?', 'anything else', 'allergy', 'separate bills'],
            rolePlay: { title: 'Restaurant service', instruction: 'Façam a cena inteira: chegada, pedido, alteração, sobremesa e conta.', roles: [{ name: 'Student · Customer', goal: 'Order a complete meal.', details: ['ask what comes with one dish', 'replace one side dish', 'remove one ingredient', 'ask for the bill'] }, { name: 'Teacher · Server', goal: 'Guide the order politely.', details: ['offer a starter', 'clarify the side dish', 'confirm the change', 'offer dessert'] }], outcome: 'The server repeats the complete order and the customer confirms it.' },
            guided: { questions: ['What do you usually order as a main course?', 'Do you normally have a starter or dessert?', 'Which ingredient do you often ask for a dish without?', 'What makes restaurant service good?', 'How do you ask for a change politely?', 'When do you usually leave a tip?'], followUps: ['What comes with it?', 'Would you change the side dish?', 'Anything else?', 'Was the service worth the tip?'], support: ['I would like...', 'Could I have...instead of...?', 'without...', 'Could we have the bill?'] },
            challenge: { title: 'Table 4 in four short moves', prompt: 'Use one short sentence at each moment: order, allergy check, bill correction and split.', steps: ['Order one dish.', 'Say that an allergy must be checked.', 'Point out one bill mistake.', 'Ask for separate bills.'], mustUse: ['I would like...', 'allergy', 'There is a mistake with my order.', 'separate bills'], model: 'I would like the vegetable pasta without cheese. My friend has an allergy, so please check with the kitchen. There is a mistake with my order. Could we have separate bills, please?' },
            homework: ['Design a short menu with prices and side dishes.', 'Write a complete server–customer dialogue.', 'Practice the customer role without reading.']
        }),

        14: lesson({
            sourceLesson: 13,
            title: 'True Friends or False Friends?',
            mission: 'Reconhecer quando alguém diz que está chateado e responder com uma pergunta e uma opção simples.',
            outcome: 'Ao final, o aluno responde em duas ou três frases: pergunta como a pessoa está e oferece conversar ou dar espaço.',
            quickStart: [['Personality trio', 'Choose three adjectives for a good friend.'], ['Mood contrast', 'Say one sign of a good mood and one sign of a bad mood.'], ['Support', 'Say one way to cheer someone up.'], ['Respect', 'Explain when a person may need space.']],
            model: { title: 'Give her space or cheer her up?', setting: 'Two friends notice that Carla is unusually quiet.', lines: [['Leo', 'Carla seems upset today. She did not smile at anyone.'], ['Nina', 'I noticed that too. She is usually cheerful and talkative.'], ['Leo', 'Should we ask what happened?'], ['Nina', 'Maybe, but she is shy about personal problems.'], ['Leo', 'We could tell her we are here if she wants to talk.'], ['Nina', 'Good idea. Then we can give her some space.'], ['Leo', 'You are always patient with people.'], ['Nina', 'A good friend listens without forcing a conversation.']], questions: [['How is Carla acting today?', 'She is quiet and upset.'], ['How is she usually?', 'Cheerful and talkative.'], ['What do Leo and Nina decide to do?', 'Offer support and give her space.'], ['Which quality does Leo see in Nina?', 'Patience.']] },
            realWorld: { genre: 'Message thread', title: 'Read the mood behind the messages', instruction: 'Leia a conversa e identifique o problema, o tom e a resposta mais adequada.', documents: [{ label: '11:05 · Maya', heading: 'Group chat', body: 'I am sorry, but I do not feel like going out tonight. I had a difficult day and need some quiet time.' }, { label: '11:08 · Alex', heading: 'Reply', body: 'No problem. Take care of yourself. If you want to talk later, I am here.' }, { label: '11:09 · Chris', heading: 'Reply', body: 'Come on! Do not be boring. You always cancel our plans.' }], questions: [['What mood does Maya seem to be in?', 'She seems upset or tired.'], ['Which reply is more supportive?', 'Alex’s reply.'], ['Why may Chris’s reply make things worse?', 'It criticizes Maya and ignores her feelings.'], ['What could a friend do next?', 'Give her space and check on her later.']] },
            frames: [['Describe a person', 'She is usually cheerful and patient.', 'Ela geralmente é alegre e paciente.'], ['Describe a mood', 'He is in a bad mood today.', 'Ele está de mau humor hoje.'], ['Offer support', 'I am here if you want to talk.', 'Estou aqui se você quiser conversar.'], ['Respect a limit', 'Let’s give her some space.', 'Vamos dar um pouco de espaço para ela.']],
            recycle: ['upset', 'patient', 'give someone space', 'Is everything okay?', 'be in a good mood', 'cheer up'],
            rolePlay: { title: 'Supportive friend', instruction: 'O aluno apresenta o problema; o professor reage. Depois, troquem e comparem as respostas.', roles: [{ name: 'Friend A', goal: 'Explain why you are upset.', details: ['a plan changed suddenly', 'you do not want advice yet', 'you may want to talk later', 'state one clear limit'] }, { name: 'Friend B', goal: 'Respond with empathy.', details: ['notice the mood', 'ask one gentle question', 'offer support', 'respect the limit'] }], outcome: 'Choose one sentence that helped and explain why.' },
            guided: { questions: ['Which qualities matter most in a friend?', 'How can you tell when someone is upset?', 'Do you prefer advice or space when you are in a bad mood?', 'How do you cheer a friend up?', 'Is honesty always easy in a friendship?', 'What makes someone supportive?'], followUps: ['Can you give an example?', 'How would the other person feel?', 'What could you say instead?', 'Would that work for everyone?'], support: ['She is usually...', 'He seems...', 'I am here if...', 'Let’s give...space'] },
            challenge: { title: 'Choose the supportive response', prompt: 'Respond to three short friendship situations and justify the best response.', steps: ['Identify the person’s mood.', 'Choose a respectful response.', 'Add one gentle question.', 'Explain why the response helps.'], mustUse: ['two personality adjectives', 'in a good/bad mood', 'give someone space or cheer up', 'one reason'], model: 'Maya seems upset, so I would not pressure her. I would say, “I am here if you want to talk.” Then I would give her some space because patient friends respect limits.' },
            homework: ['Write two supportive replies to a difficult message.', 'Describe a good friend with five adjectives and examples.', 'Record a short response to someone who is upset.']
        }),

        16: lesson({
            sourceLesson: 15,
            title: 'A Car Crash',
            mission: 'Relatar um acidente com clareza, identificar ferimentos e pedir ajuda.',
            outcome: 'Ao final, o aluno reconstrói o que aconteceu e transmite informações essenciais com calma.',
            quickStart: [['Body check', 'Name four body parts that can be injured.'], ['Visible injury', 'Describe a cut or bruise.'], ['Safety warning', 'Give one Be careful instruction.'], ['Emergency question', 'Ask what happened.']],
            model: { title: 'A minor crash at the intersection', setting: 'A witness speaks to an emergency operator.', lines: [['Operator', 'Emergency services. What happened?'], ['Witness', 'Two cars crashed at the intersection near Green Street.'], ['Operator', 'Is anyone hurt?'], ['Witness', 'One driver cut his arm, and the other person hurt her shoulder.'], ['Operator', 'Are they conscious and breathing normally?'], ['Witness', 'Yes. They are both awake.'], ['Operator', 'Good. Please keep them away from traffic and do not move anyone with serious pain.'], ['Witness', 'All right. I will stay here until help arrives.']], questions: [['Where did the crash happen?', 'At an intersection near Green Street.'], ['Which injuries are mentioned?', 'A cut arm and a hurt shoulder.'], ['Are the drivers conscious?', 'Yes, they are.'], ['What should the witness do?', 'Keep them away from traffic and wait for help.']] },
            realWorld: { genre: 'Incident report', title: 'Put the facts in the right place', instruction: 'Compare the short witness notes with the official report.', documents: [{ label: 'Witness notes', heading: 'What I saw', body: '4:20 p.m. · wet road · blue car turned left · bicycle stopped suddenly · cyclist fell · cut on knee · driver called for help.' }, { label: 'Report', heading: 'Initial information', body: 'Location: Oak Street intersection. People involved: one driver and one cyclist. Injury: small cut on the cyclist’s knee. Immediate action: driver called emergency services.' }], questions: [['What time did the accident happen?', 'At 4:20 p.m.'], ['What was the road like?', 'It was wet.'], ['Who was injured?', 'The cyclist.'], ['Who called for help?', 'The driver.']] },
            frames: [['Ask for the event', 'What happened?', 'O que aconteceu?'], ['Ask about a person', 'What happened to the cyclist?', 'O que aconteceu com o ciclista?'], ['Report an injury', 'He hurt his knee and has a small cut.', 'Ele machucou o joelho e tem um pequeno corte.'], ['Give a warning', 'Be careful and stay away from traffic.', 'Tenha cuidado e fique longe do trânsito.']],
            recycle: ['shoulder', 'knee', 'cut', 'What happened?', 'Be careful!', 'call for help'],
            rolePlay: { title: 'Emergency call', instruction: 'O aluno é a testemunha e só pode usar os fatos do cartão. O professor faz as perguntas.', roles: [{ name: 'Student · Witness', goal: 'Report the situation clearly.', details: ['location: Park Avenue', 'one cyclist fell', 'ankle pain and a cut', 'traffic is still moving'] }, { name: 'Teacher · Operator', goal: 'Collect essential information.', details: ['ask what and where', 'ask who is hurt', 'check immediate danger', 'give two safety instructions'] }], outcome: 'The operator repeats the key facts; the witness corrects any wrong detail.' },
            guided: { questions: ['Have you ever seen a minor accident?', 'What happened?', 'Which body part was hurt?', 'Who called for help?', 'What should a witness do first?', 'Which details are essential in an emergency call?'], followUps: ['Where exactly did it happen?', 'Was anyone else involved?', 'What happened next?', 'Was the person able to move?'], support: ['What happened to...?', 'He/She hurt...', 'There was a cut...', 'Someone called for help'] },
            challenge: { title: 'Reconstruct the incident', prompt: 'Use six fact cards to tell the accident in order and answer the operator’s questions.', steps: ['State location and event.', 'Identify people and injuries.', 'Explain the immediate action.', 'Add one safety warning.'], mustUse: ['three body words', 'Past Simple verbs', 'What happened to...?', 'call for help'], model: 'A cyclist fell near the Oak Street intersection because the road was wet. She hurt her knee and had a small cut. The driver stopped and called for help. We kept her away from traffic until the ambulance arrived.' },
            homework: ['Complete a short incident report with time, place, people, injury, and action.', 'Write five emergency questions.', 'Practice a 45-second witness report.']
        }),

        18: lesson({
            sourceLesson: 17,
            title: 'Shopping in a Mall Store',
            mission: 'Comparar produtos, avaliar preço e qualidade e concluir uma compra.',
            outcome: 'Ao final, o aluno recomenda uma opção e conduz a conversa até o pagamento.',
            quickStart: [['Price question', 'Ask how much an item costs.'], ['Quality contrast', 'Compare a cheap item and a durable item.'], ['Payment', 'Say whether you prefer cash or card.'], ['Receipt check', 'Ask for a receipt politely.']],
            model: { title: 'Cheap or good value?', setting: 'A customer compares two backpacks with a sales assistant.', lines: [['Customer', 'How much does this blue backpack cost?'], ['Assistant', 'It is $45, and it is on sale today.'], ['Customer', 'What about the black one?'], ['Assistant', 'That one is $60, but the material is more durable.'], ['Customer', 'Can I try both of them on?'], ['Assistant', 'Of course. The black one also has a two-year warranty.'], ['Customer', 'Then it may be better value, even though it is more expensive.'], ['Assistant', 'Would you like to pay in cash or by card?']], questions: [['Which backpack is on sale?', 'The blue backpack.'], ['Which one is more durable?', 'The black backpack.'], ['Why may the black one be better value?', 'It is durable and has a two-year warranty.'], ['How can the customer pay?', 'In cash or by card.']] },
            realWorld: { genre: 'Product cards and receipt', title: 'Check price, discount, and final choice', instruction: 'Compare os cartões e confirme se o recibo combina com a decisão.', documents: [{ label: 'Option A', heading: 'City Shoes', body: '$80 · 25% discount · light material · six-month warranty.' }, { label: 'Option B', heading: 'Trail Shoes', body: '$95 · no discount · waterproof and durable · two-year warranty.' }, { label: 'Receipt', heading: 'Trail Shoes · paid by card', body: 'Item $95 · discount $0 · total $95 · return period 30 days.' }], questions: [['Which shoes are cheaper today?', 'City Shoes.'], ['Which shoes have the longer warranty?', 'Trail Shoes.'], ['Which product appears on the receipt?', 'Trail Shoes.'], ['How was the purchase paid for?', 'By card.']] },
            frames: [['Ask the price', 'How much does it cost?', 'Quanto custa?'], ['Ask about payment', 'Can I pay by card?', 'Posso pagar com cartão?'], ['Compare value', 'This one is more expensive but more durable.', 'Este é mais caro, mas mais durável.'], ['Evaluate', 'It is good value for the price.', 'Tem bom custo-benefício.']],
            recycle: ['price', 'discount', 'receipt', 'How much does it cost?', 'on sale', 'good value'],
            rolePlay: { title: 'Customer and sales assistant', instruction: 'O cliente tem necessidades específicas; o atendente deve descobrir antes de recomendar.', roles: [{ name: 'Student · Customer', goal: 'Buy a bag for daily use.', details: ['budget up to $70', 'needs durable material', 'wants to try it on', 'will pay by card'] }, { name: 'Teacher · Assistant', goal: 'Recommend one of two options.', details: ['ask about budget', 'explain discount', 'compare quality', 'offer receipt and return information'] }], outcome: 'The customer chooses, pays, and explains why the item is good value.' },
            guided: { questions: ['What was the last thing you bought?', 'Was it on sale?', 'Do you compare price and quality?', 'When is a more expensive item good value?', 'Do you prefer paying in cash or by card?', 'Why is a receipt useful?'], followUps: ['How much did it cost?', 'Did you try it on?', 'Was there a discount?', 'Would you buy it again?'], support: ['How much does...cost?', 'It is on sale.', 'This one is more...', 'I will pay by...'] },
            challenge: { title: 'Best buy under pressure', prompt: 'Compare three products for a customer with a budget and choose the best value.', steps: ['Ask about use and budget.', 'Compare price and quality.', 'Mention discount or warranty.', 'Complete the payment exchange.'], mustUse: ['one comparative', 'on sale', 'good value', 'pay for'], model: 'The blue bag is cheaper and on sale, but the black bag is more durable. Because you use it every day, the black one is better value. It costs $60, so it is within your budget. You can pay for it by card.' },
            homework: ['Create two product cards with price and quality information.', 'Write a recommendation comparing the products.', 'Record a one-minute sales conversation.']
        }),

        20: lesson({
            sourceLesson: 19,
            title: 'A Clever Boy',
            mission: 'Pedir algo emprestado, responder com limites claros e combinar a devolução.',
            outcome: 'Ao final, o aluno negocia um empréstimo simples e explica a opção mais responsável.',
            quickStart: [['Borrow or lend?', 'Use both verbs in two connected sentences.'], ['Small money', 'Name a coin and ask for change.'], ['Polite limit', 'Say you do not mind lending something with one condition.'], ['Repayment', 'Promise when you will pay someone back.']],
            model: { title: 'Can I borrow your charger?', setting: 'A student needs a charger before an online class.', lines: [['Maya', 'Can I borrow your charger for an hour?'], ['Leo', 'Sure. I do not mind lending it to you, but I need it back before lunch.'], ['Maya', 'No problem. I will give it back at eleven thirty.'], ['Leo', 'Do you need the wall adapter too?'], ['Maya', 'No, neither of my cables is broken. I just forgot the charger.'], ['Leo', 'All right. Please leave it on my desk when you finish.'], ['Maya', 'Thanks. I will return it right away.'], ['Leo', 'You are welcome.']], questions: [['What does Maya want to borrow?', 'Leo’s charger.'], ['What is Leo’s condition?', 'He needs it back before lunch.'], ['Are Maya’s cables broken?', 'No, neither of them is broken.'], ['Where should she leave the charger?', 'On Leo’s desk.']] },
            realWorld: { genre: 'Message exchange', title: 'A loan with a clear plan', instruction: 'Leia as mensagens e identifique pedido, limite, prazo e confirmação.', documents: [{ label: '9:10 · Bruno', heading: 'Request', body: 'Could I borrow $20 for the bus card? My wallet is at home. I can pay you back after work.' }, { label: '9:12 · Clara', heading: 'Answer', body: 'I can lend you $15, but I need the money back by six. I do not mind helping, but I cannot lend more today.' }, { label: '9:14 · Bruno', heading: 'Confirmation', body: 'That works. I will use my coins for the rest and pay you back at five thirty.' }], questions: [['How much does Bruno ask for?', '$20.'], ['How much can Clara lend?', '$15.'], ['What is Clara’s deadline?', 'Six o’clock.'], ['How will Bruno cover the rest?', 'He will use his coins.']] },
            frames: [['Ask to borrow', 'Can I borrow your charger?', 'Posso pegar seu carregador emprestado?'], ['Offer to lend', 'I can lend you fifteen dollars.', 'Posso lhe emprestar quinze dólares.'], ['Set a condition', 'I do not mind lending it, but I need it back by six.', 'Não me importo de emprestar, mas preciso de volta até as seis.'], ['Promise repayment', 'I will pay you back after work.', 'Vou devolver o dinheiro depois do trabalho.']],
            recycle: ['wallet', 'loan', 'choice', 'Can I borrow...?', 'I do not mind + -ing', 'pay back'],
            rolePlay: { title: 'Borrowing with boundaries', instruction: 'Negociem um empréstimo sem assumir que a resposta será sim.', roles: [{ name: 'Student · Borrower', goal: 'Borrow an item for one day.', details: ['explain why you need it', 'state when you will return it', 'offer an alternative', 'confirm the condition'] }, { name: 'Teacher · Owner', goal: 'Decide whether to lend it.', details: ['ask how it will be used', 'set one limit', 'state a deadline', 'accept or refuse politely'] }], outcome: 'Both people repeat the final agreement in one sentence.' },
            guided: { questions: ['What do people commonly borrow?', 'What is something you do not mind lending?', 'What would you never lend?', 'Why is a return deadline important?', 'Have you ever forgotten to pay someone back?', 'What makes borrowing responsible?'], followUps: ['When would you return it?', 'What condition would you set?', 'What could the person do instead?', 'How would you refuse politely?'], support: ['Can I borrow...?', 'I can lend you...', 'I do not mind...ing, but...', 'I will pay you back...'] },
            challenge: { title: 'Choose the responsible solution', prompt: 'A person needs an item or money urgently. Compare borrowing, buying, and waiting, then agree on one plan.', steps: ['Explain the need.', 'Discuss three choices.', 'Set limits and a deadline.', 'Confirm the final agreement.'], mustUse: ['borrow and lend correctly', 'neither or none', 'do not mind + -ing', 'pay back'], model: 'Can I borrow your charger until five? Neither of mine is working. I do not mind buying a new one tomorrow, but I need to join a class now. I will return yours and pay you back for any delivery cost after work.' },
            homework: ['Write a borrowing request and a clear response.', 'Create three responsible alternatives to borrowing money.', 'Practice a 60-second negotiation with a deadline.']
        }),

        22: lesson({
            sourceLesson: 21,
            title: 'Childhood Memories',
            mission: 'Comparar infância e vida atual, contando memórias e mudanças de hábito.',
            outcome: 'Ao final, o aluno constrói uma lembrança com contexto, mudança e significado pessoal.',
            quickStart: [['Then', 'Say one thing you used to do as a child.'], ['Now', 'Contrast that habit with your routine today.'], ['People', 'Name someone supportive from your childhood.'], ['Connection', 'Say how you keep in touch with an old friend.']],
            model: { title: 'We used to live on the same street', setting: 'Two childhood friends meet after several years.', lines: [['Nina', 'Do you remember when we used to ride our bikes after school?'], ['Paulo', 'Of course. We grew up together on the same street.'], ['Nina', 'You used to be so shy. Now you speak to everyone.'], ['Paulo', 'I became more confident at college. You changed too.'], ['Nina', 'Yes. I was not used to living in a big city at first.'], ['Paulo', 'Was it difficult to get used to?'], ['Nina', 'A little, but my neighbors were very supportive.'], ['Paulo', 'I am glad we still keep in touch.']], questions: [['What did they use to do after school?', 'Ride their bikes.'], ['How did Paulo change?', 'He became more confident.'], ['What was difficult for Nina?', 'Getting used to living in a big city.'], ['What do they still do?', 'They keep in touch.']] },
            realWorld: { genre: 'Then-and-now captions', title: 'A small family timeline', instruction: 'Leia as legendas e identifique hábitos antigos, mudanças e continuidades.', documents: [{ label: '2008', heading: 'Saturday at Grandma’s', body: 'We used to visit our grandmother every Saturday. My cousins and I played in the yard while the adults prepared lunch.' }, { label: '2018', heading: 'A new city', body: 'I moved away for work. I was not used to the traffic, and it took months to get used to the long commute.' }, { label: 'Today', heading: 'Still connected', body: 'We live in different cities now, but we keep in touch and have a family video call every Sunday.' }], questions: [['Where did the family go on Saturdays?', 'To their grandmother’s home.'], ['What did the children do?', 'They played in the yard.'], ['What was difficult after the move?', 'The traffic and long commute.'], ['How does the family stay connected?', 'With a weekly video call.']] },
            frames: [['Past habit', 'We used to play outside after school.', 'Nós costumávamos brincar fora depois da escola.'], ['Past state', 'I used to be shy.', 'Eu costumava ser tímido.'], ['Familiar now', 'I am used to the busy routine.', 'Estou acostumado à rotina corrida.'], ['Process of adapting', 'It took time to get used to the city.', 'Levou tempo para me acostumar à cidade.']],
            recycle: ['childhood', 'supportive', 'memory', 'used to', 'get used to', 'keep in touch'],
            rolePlay: { title: 'Old friends reconnect', instruction: 'Cada pessoa recebe lembranças diferentes. Façam perguntas para completar a história compartilhada.', roles: [{ name: 'Student · Friend A', goal: 'Recall school memories.', details: ['used to walk to school', 'was shy in class', 'loved a supportive teacher', 'moved away at age fourteen'] }, { name: 'Teacher · Friend B', goal: 'Recall neighborhood memories.', details: ['used to play soccer', 'grew up next door', 'kept old photographs', 'still knows some neighbors'] }], outcome: 'Together, create a four-event timeline using facts from both cards.' },
            guided: { questions: ['Where did you grow up?', 'What did you use to do after school?', 'Who was supportive when you were young?', 'How is your personality different now?', 'What did you have to get used to as an adult?', 'How do you keep in touch with relatives or old friends?'], followUps: ['How old were you?', 'Who was with you?', 'Why do you remember that?', 'What changed after that?'], support: ['I used to...', 'I did not use to...', 'I am used to...', 'I got used to...'] },
            challenge: { title: 'A memory with a before and after', prompt: 'Tell one childhood memory, explain what changed, and answer follow-up questions.', steps: ['Set the time and place.', 'Describe a repeated habit.', 'Introduce one person or event.', 'Connect the memory to life now.'], mustUse: ['used to', 'one personality adjective', 'get/be used to', 'keep in touch or be there for'], model: 'I used to spend weekends at my grandmother’s house. I was shy, but my cousins were supportive and always included me. When I moved, I had to get used to a different neighborhood. We still keep in touch today.' },
            homework: ['Choose three old photos and write one caption for each.', 'Prepare six childhood interview questions.', 'Record a one-minute then-and-now memory.']
        }),

        24: lesson({
            sourceLesson: 23,
            title: 'Fads and Crazes',
            mission: 'Conversar sobre tendências, combinar peças e avaliar se uma moda funciona para a vida real.',
            outcome: 'Ao final, o aluno monta e defende uma escolha de roupa usando vocabulário de estilo.',
            quickStart: [['Trend now', 'Name one thing that is currently in fashion.'], ['Old trend', 'Name something that went out of fashion.'], ['Match', 'Say which colors or patterns go together.'], ['Practical choice', 'Choose comfort instead of one fashionable detail.']],
            model: { title: 'Is this trend coming back?', setting: 'Two friends compare outfits in a store.', lines: [['Maya', 'Wide-leg jeans are back in fashion. What do you think?'], ['Luca', 'I like the style, but this fabric feels heavy.'], ['Maya', 'Try them on with that plain shirt. The colors go well together.'], ['Luca', 'Maybe. I usually wear simple patterns instead of bold ones.'], ['Maya', 'The jacket would make the outfit more fashionable.'], ['Luca', 'It looks good, but I want something comfortable for work.'], ['Maya', 'Then skip the jacket and choose the lighter fabric.'], ['Luca', 'Good idea. A trend only works if it fits real life.']], questions: [['Which item is back in fashion?', 'Wide-leg jeans.'], ['What problem does Luca notice?', 'The fabric feels heavy.'], ['What does he usually prefer?', 'Simple patterns instead of bold ones.'], ['What is his main priority?', 'Comfort for work.']] },
            realWorld: { genre: 'Style board', title: 'Three outfits, three situations', instruction: 'Leia os cartões e escolha a roupa que combina com cada situação.', documents: [{ label: 'Look A', heading: 'Bold Weekend', body: 'Patterned shirt, wide-leg jeans, bright sneakers. Fashionable and relaxed, but not very formal.' }, { label: 'Look B', heading: 'Simple Office', body: 'Plain shirt, dark trousers, light jacket. Comfortable fabric and neutral colors.' }, { label: 'Look C', heading: 'Evening Trend', body: 'Black outfit with a metallic jacket. The jacket is trendy, but the fabric is heavy.' }], questions: [['Which look is most suitable for an office?', 'Look B.'], ['Which look has a bold pattern?', 'Look A.'], ['Which item may be uncomfortable?', 'The metallic jacket in Look C.'], ['Which look is best for a casual weekend?', 'Look A.']] },
            frames: [['Current trend', 'Wide-leg jeans are in fashion.', 'Jeans de perna larga estão na moda.'], ['Past trend', 'That style is out of fashion.', 'Esse estilo está fora de moda.'], ['Match items', 'This jacket goes with those trousers.', 'Esta jaqueta combina com aquelas calças.'], ['Choose an alternative', 'I would wear the plain shirt instead of the patterned one.', 'Eu usaria a camisa lisa em vez da estampada.']],
            recycle: ['trend', 'outfit', 'fabric', 'in fashion', 'go with', 'instead of'],
            rolePlay: { title: 'Stylist and client', instruction: 'O estilista precisa descobrir ocasião, preferência e limite antes de montar o look.', roles: [{ name: 'Student · Client', goal: 'Choose an outfit for a work event.', details: ['prefers simple style', 'dislikes heavy fabric', 'needs comfortable shoes', 'wants one fashionable detail'] }, { name: 'Teacher · Stylist', goal: 'Build and justify the outfit.', details: ['ask about the occasion', 'offer two combinations', 'compare patterns and fabrics', 'replace one unsuitable item'] }], outcome: 'Agree on a complete outfit and explain why each item works.' },
            guided: { questions: ['How would you describe your style?', 'Which trends do you like or dislike?', 'What has recently come back into fashion?', 'Which colors and patterns go well together?', 'Do you choose comfort or fashion first?', 'What would you wear instead of an uncomfortable trend?'], followUps: ['When would you wear it?', 'What fabric is it made of?', 'What would go with it?', 'Will this trend last?'], support: ['It is in/out of fashion.', 'It goes with...', 'Try on...', 'I prefer...instead of...'] },
            challenge: { title: 'One outfit, one clear purpose', prompt: 'Build an outfit for a specific event from six item cards and defend every choice.', steps: ['Identify the occasion.', 'Choose three compatible items.', 'Reject one trend for a practical reason.', 'Add one alternative.'], mustUse: ['in or out of fashion', 'go with', 'instead of', 'fabric or pattern'], model: 'For the work event, I would choose the plain shirt because it goes with the dark trousers. I would wear comfortable shoes instead of the trendy boots. The light jacket adds one fashionable detail without making the outfit impractical.' },
            homework: ['Create a three-look style board with short descriptions.', 'Write five questions a stylist should ask.', 'Record a one-minute outfit recommendation.']
        }),

        26: lesson({
            sourceLesson: 25,
            title: 'To Lie or Not to Lie',
            mission: 'Ler histórias curtas do cotidiano, dizer o que faria e dar um conselho simples aos personagens.',
            outcome: 'Ao final, o aluno expressa uma escolha, dá um conselho curto e menciona uma possível consequência com apoio.',
            quickStart: [['Advice opener', 'Ask what you should do.'], ['Responsible action', 'Give one suggestion with should.'], ['Alternative', 'Use instead of to replace a poor choice.'], ['Pause', 'Tell someone to think it over.']],
            model: { title: 'Tell the truth now or later?', setting: 'A student damaged a friend’s headphones and asks for advice.', lines: [['Rafa', 'I made a mistake and I do not know what to do.'], ['Bia', 'What happened?'], ['Rafa', 'I borrowed Leo’s headphones and broke them. He has not noticed yet.'], ['Bia', 'You should tell him the truth.'], ['Rafa', 'I am afraid he will be angry.'], ['Bia', 'He may be upset, but lying could make the consequence worse.'], ['Rafa', 'Should I buy new headphones first?'], ['Bia', 'Think it over, but talk to him instead of hiding the mistake.']], questions: [['What did Rafa damage?', 'Leo’s headphones.'], ['What advice does Bia give?', 'Tell Leo the truth.'], ['Why is Rafa afraid?', 'Leo may be angry.'], ['What should Rafa avoid?', 'Hiding the mistake or lying.']] },
            realWorld: { genre: 'Advice column', title: 'Three possible responses', instruction: 'Leia o problema e compare as respostas antes de escolher o conselho mais responsável.', documents: [{ label: 'Problem', heading: 'I saw my friend cheating', body: 'My close friend copied answers during a test. The teacher asked whether I noticed anything. I care about my friend, but I do not want to lie.' }, { label: 'Reply A', heading: 'Say nothing', body: 'Protect the friendship and pretend you did not see anything.' }, { label: 'Reply B', heading: 'Talk first', body: 'Tell your friend privately that the choice was serious. Encourage the person to be honest with the teacher.' }, { label: 'Reply C', heading: 'Tell everyone', body: 'Post the story in the class group so other students know what happened.' }], questions: [['What is the central conflict?', 'Honesty versus protecting a friend.'], ['Which reply suggests a private conversation?', 'Reply B.'], ['Which reply may create a larger problem?', 'Reply C.'], ['Why is Reply B responsible?', 'It values truth and gives the friend a chance to act honestly.']] },
            frames: [['Ask for advice', 'What should I do?', 'O que eu deveria fazer?'], ['Give advice', 'You should tell the truth.', 'Você deveria dizer a verdade.'], ['Replace an action', 'Talk to her instead of sending a message.', 'Converse com ela em vez de mandar uma mensagem.'], ['Delay the decision', 'Think it over before you answer.', 'Pense bem antes de responder.']],
            recycle: ['advice', 'truth', 'consequence', 'What should I do?', 'tell the truth', 'think it over'],
            rolePlay: { title: 'Advice clinic', instruction: 'O aluno apresenta o dilema. O professor não dá conselho imediatamente: primeiro faz perguntas.', roles: [{ name: 'Student · Advice seeker', goal: 'Explain a difficult choice.', details: ['promised to keep a secret', 'the secret may hurt someone', 'does not want to lose a friend', 'needs a responsible next step'] }, { name: 'Teacher · Adviser', goal: 'Give careful advice.', details: ['ask for missing facts', 'name two consequences', 'offer two alternatives', 'recommend one action'] }], outcome: 'The advice seeker repeats the chosen plan and one consequence.' },
            guided: { questions: ['When is it difficult to tell the truth?', 'What makes advice useful?', 'Should you always protect a friend?', 'What consequences can a small lie create?', 'When should a person think a decision over?', 'What can someone do instead of hiding a mistake?'], followUps: ['Who could be affected?', 'What might happen next?', 'Is there a more honest alternative?', 'How could you say that kindly?'], support: ['What should I do?', 'You should...', 'Instead of...ing...', 'Think it over.'] },
            challenge: { title: 'Decision with consequences', prompt: 'Choose one of three actions in an ethical dilemma and defend the advice.', steps: ['Clarify the facts.', 'Predict two consequences.', 'Compare alternatives.', 'Give one practical recommendation.'], mustUse: ['should or should not', 'tell the truth', 'instead of + -ing', 'because or consequence'], model: 'You should talk to your friend privately instead of posting about the problem. Tell the truth about what you saw and explain why it matters. Hiding it may protect the friendship for one day, but the consequence could be worse later.' },
            homework: ['Write an advice-column problem and a responsible reply.', 'List two consequences for three different choices.', 'Record a one-minute piece of advice with reasons.']
        }),

        28: lesson({
            sourceLesson: 27,
            title: 'Honeymoon in New York',
            mission: 'Comparar experiências e montar um roteiro usando melhores, piores e extremos.',
            outcome: 'Ao final, o aluno cria um ranking justificado e recomenda um roteiro curto.',
            quickStart: [['Best place', 'Name the best place in your city.'], ['Worst part', 'Describe the worst part of a trip or event.'], ['One extreme', 'Use the most with a long adjective.'], ['Value', 'Say when a long line or high price is worth it.']],
            model: { title: 'The best day in New York', setting: 'A couple reviews the highlights of a trip.', lines: [['Luca', 'What was the best place we visited?'], ['Bia', 'Central Park was the most relaxing place for me.'], ['Luca', 'I agree. The museum was interesting, but it had the largest crowd.'], ['Bia', 'And Friday afternoon was by far the busiest time.'], ['Luca', 'What about the restaurant in Queens?'], ['Bia', 'It served the best meal and was the least expensive option.'], ['Luca', 'Was the long subway ride worth it?'], ['Bia', 'Definitely. That dinner was one of the best parts of the trip.']], questions: [['Which place was most relaxing?', 'Central Park.'], ['Where was the largest crowd?', 'At the museum.'], ['Which meal was least expensive?', 'The restaurant meal in Queens.'], ['Was the subway trip worth it?', 'Yes, it was.']] },
            realWorld: { genre: 'Traveler ranking', title: 'Build a one-day itinerary', instruction: 'Compare as avaliações e escolha atrações para manhã, tarde e noite.', documents: [{ label: 'Morning', heading: 'Skyline Deck', body: 'Best view · highest price · shortest visit · least crowded before 9 a.m.' }, { label: 'Afternoon', heading: 'Riverside Park', body: 'Most relaxing option · free · beautiful views · busiest after 4 p.m.' }, { label: 'Evening', heading: 'Queens Market', body: 'Best food value · farthest location · most varied menu · open until 10 p.m.' }], questions: [['Which attraction has the best view?', 'Skyline Deck.'], ['Which option is free?', 'Riverside Park.'], ['Where is the best food value?', 'Queens Market.'], ['When is the park busiest?', 'After 4 p.m.']] },
            frames: [['Ask for a ranking', 'What was the best place you visited?', 'Qual foi o melhor lugar que você visitou?'], ['Name a negative extreme', 'The traffic was the worst part.', 'O trânsito foi a pior parte.'], ['Intensify', 'It was by far the most exciting tour.', 'Foi de longe o passeio mais emocionante.'], ['Recommend', 'It is one of the best options in the city.', 'É uma das melhores opções da cidade.']],
            recycle: ['ranking', 'view', 'relaxing', 'the best...in', 'by far', 'worth it'],
            rolePlay: { title: 'Travel consultant and couple', instruction: 'O casal tem prioridades diferentes; o consultor deve montar um roteiro equilibrado.', roles: [{ name: 'Student · Traveler', goal: 'Plan one memorable day.', details: ['wants the best city view', 'dislikes large crowds', 'prefers a relaxing afternoon', 'needs good food value'] }, { name: 'Teacher · Consultant', goal: 'Recommend an itinerary.', details: ['compare three attractions', 'mention the least crowded time', 'include transport trade-off', 'justify the final ranking'] }], outcome: 'Agree on morning, afternoon, and evening plans.' },
            guided: { questions: ['What is the best place you have visited?', 'What was the worst part of a trip?', 'Which attraction in your city has the best view?', 'What is the busiest time to travel?', 'Which experience was expensive but worth it?', 'What is one of the most relaxing places you know?'], followUps: ['Best compared with what?', 'Why was it worth it?', 'Was there a less crowded option?', 'What would you rank second?'], support: ['the best...in', 'the worst part', 'by far', 'one of the most...'] },
            challenge: { title: 'The best possible day', prompt: 'Rank five options and build a one-day itinerary for a visitor with two priorities.', steps: ['Identify priorities.', 'Rank the options.', 'Choose three stops.', 'Defend one trade-off.'], mustUse: ['two superlatives', 'one of the best', 'by far', 'worth it'], model: 'The Skyline Deck has the best view, so we should go early when it is the least crowded. Riverside Park is by far the most relaxing afternoon option. Queens Market is far away, but the food is worth it and it is one of the best values in the city.' },
            homework: ['Create a top-five ranking for your city.', 'Write a one-day itinerary with three superlatives.', 'Record a 90-second travel recommendation.']
        }),

        30: lesson({
            sourceLesson: 29,
            title: 'Rick and His Dreams for the New Year',
            mission: 'Transformar esperanças em planos realistas e distinguir intenção, previsão e ação imediata.',
            outcome: 'Ao final, o aluno apresenta um plano de meta com etapas, condições e previsão.',
            quickStart: [['Hope', 'Say one thing you hope will happen.'], ['Plan', 'Say one action you are going to take.'], ['Prediction', 'Predict one result with will.'], ['Immediate step', 'Say what you will do right away.']],
            model: { title: 'A realistic goal, not a perfect promise', setting: 'Two friends discuss New Year goals.', lines: [['Maya', 'Do you think next year will be different?'], ['Theo', 'I hope so. I am going to change a few habits.'], ['Maya', 'What are you going to start with?'], ['Theo', 'I am going to plan my week right after Sunday dinner.'], ['Maya', 'Will that solve everything?'], ['Theo', 'Probably not. It depends on how consistent I am.'], ['Maya', 'What will you do if you miss one week?'], ['Theo', 'I will start again right away instead of giving up.']], questions: [['What does Theo hope?', 'He hopes next year will be different.'], ['What is his planned habit?', 'Planning his week after Sunday dinner.'], ['What does the result depend on?', 'His consistency.'], ['What will he do after a missed week?', 'Start again right away.']] },
            realWorld: { genre: 'Goal tracker', title: 'From hope to first action', instruction: 'Leia as metas e identifique qual delas já tem um plano concreto.', documents: [{ label: 'Goal A', heading: 'Improve my English', body: 'Hope: speak more confidently. Plan: join a conversation group on Tuesdays. First step: send the registration form right away.' }, { label: 'Goal B', heading: 'Be healthier', body: 'Hope: feel better next year. Plan: maybe exercise more. First step: not decided.' }, { label: 'Goal C', heading: 'Save for a trip', body: 'Hope: travel in July. Plan: save $100 each month. First step: create a separate account right after payday.' }], questions: [['Which goal includes a weekly arrangement?', 'Goal A.'], ['Which goal is still vague?', 'Goal B.'], ['How much will the person save?', '$100 each month.'], ['When will the person create an account?', 'Right after payday.']] },
            frames: [['Express hope', 'I hope next year will be better.', 'Espero que o próximo ano seja melhor.'], ['State a plan', 'I am going to change one habit.', 'Vou mudar um hábito.'], ['Predict', 'I think the routine will help.', 'Acho que a rotina vai ajudar.'], ['Name a dependency', 'It depends on my schedule.', 'Depende do meu horário.']],
            recycle: ['hope', 'goal', 'result', 'I hope so.', 'It depends on...', 'right after'],
            rolePlay: { title: 'Accountability partners', instruction: 'Uma pessoa apresenta a meta; a outra transforma ideias vagas em ações observáveis.', roles: [{ name: 'Student · Goal owner', goal: 'Create a realistic language goal.', details: ['wants more speaking confidence', 'has two free evenings', 'often gives up after a busy week', 'needs one immediate first step'] }, { name: 'Teacher · Partner', goal: 'Make the plan specific.', details: ['ask what and when', 'separate hope from plan', 'predict one obstacle', 'agree on a review date'] }], outcome: 'State the final goal, first action, schedule, and recovery plan.' },
            guided: { questions: ['What do you hope will happen next year?', 'What are you going to change?', 'Which result depends on consistency?', 'What will you do right after this lesson?', 'What might make your plan difficult?', 'How will you restart if the plan fails for a week?'], followUps: ['What is the first visible action?', 'When exactly will you do it?', 'What result do you predict?', 'What does success depend on?'], support: ['I hope...', 'I am going to...', 'I think...will...', 'It depends on...'] },
            challenge: { title: 'A goal you can actually follow', prompt: 'Turn one hope into a four-part action plan and answer skeptical follow-up questions.', steps: ['State the hope.', 'Choose a concrete plan.', 'Predict one result and obstacle.', 'Name the immediate action and restart strategy.'], mustUse: ['hope', 'going to', 'will', 'It depends on or right after'], model: 'I hope I will speak more confidently next year. I am going to join a Tuesday conversation group and practice for fifteen minutes on Friday. I think regular practice will help, but it depends on consistency. I will register right away and restart after any difficult week.' },
            homework: ['Create a four-week goal tracker.', 'Write one hope, one plan, one prediction, and one first action.', 'Record a 90-second goal presentation without reading.']
        })
    };

    globalScope.A2V3ConversationCurriculum = Object.freeze({
        version: '2026.08.17-communicative-pattern',
        lessons: Object.freeze(lessons)
    });
}(window));
