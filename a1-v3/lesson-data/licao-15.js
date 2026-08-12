(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { p, question, reading, homework, focus, speaking, comm, line, dialogue } = R.helpers;
    const stations = [
        focus('Family, have/has and possession', 'Recupere relações familiares, quantidade e posse.', [['relação','person + ’s + noun','Lucas’s wife'],['posse','my/his/her/our/their + noun','Their daughter'],['ter','have/has','She has two sisters.']], ['Use has com he/she.', 'Use ’s com nomes de pessoas.'], [
            p('Match', 'aunt · uncle · cousin · daughter → parent’s sister · parent’s brother · aunt’s child · female child', 'aunt—parent’s sister; uncle—parent’s brother; cousin—aunt’s child; daughter—female child'),
            p('Complete', 'They ___ three children.', 'have'), p('Complete', 'She ___ one brother.', 'has'), p('Transform', 'the wife of Lucas', 'Lucas’s wife'),
            p('Choose', 'Lucas: (His / Her) daughter is Sofia.', 'His'), p('Choose', 'Lucas and Marina: (Our / Their) daughter is Sofia.', 'Their'),
            p('Correct', 'He have two sisters.', 'He has two sisters.'), p('Correct', 'The Marina’s husband is Lucas.', 'Marina’s husband is Lucas.'),
            p('Answer', 'How many cousins do you have?', 'I have ... cousin(s).'), p('Describe', 'Paulo + Ana; children: Lucas, Emma, Julia', 'Paulo and Ana have three children. Their children are Lucas, Emma and Julia.')
        ]),
        focus('There is/are and location', 'Descreva casa, móveis, roupas e localização.', [['singular','There is...','There is a sofa.'],['plural','There are...','There are two chairs.'],['lugar','in/on/under/next to/behind','The shoes are under the bed.']], ['Concorde is/are com singular ou plural.', 'Responda Where is/are com it/they.'], [
            p('Complete', 'There ___ a desk in the bedroom.', 'is'), p('Complete', 'There ___ three chairs.', 'are'), p('Build', 'there / Is / a closet / ?', 'Is there a closet?'),
            p('Build', 'shoes / there / Are / ?', 'Are there shoes?'), p('Choose', 'The jacket is (on / under) the chair.', 'on'), p('Choose', 'The shoes are (under / behind) the bed.', 'under'),
            p('Correct', 'There are a sofa.', 'There is a sofa.'), p('Correct', 'There is two windows.', 'There are two windows.'),
            p('Answer', 'Where are the clothes? closet', 'They are in the closet.'), p('Describe', 'Room: sofa near window · bag behind door · two chairs next to table', 'There is a sofa near the window. The bag is behind the door. There are two chairs next to the table.')
        ]),
        focus('Shopping quantities', 'Diferencie countable/uncountable e use some, any, how many/much.', [['contável','number/how many','six eggs'],['não contável','some/how much','some rice'],['disponibilidade','some/any','Do we have any milk?']], ['Some em afirmação; any em pergunta/negativa.', 'A lot of funciona nos dois grupos.'], [
            p('Classify', 'eggs · milk · apples · rice · bread · tomatoes', 'countable: eggs, apples, tomatoes; uncountable: milk, rice, bread'),
            p('Choose', 'We need (some / any) milk.', 'some'), p('Choose', 'Do we have (some / any) eggs?', 'any'), p('Choose', 'We don’t have (some / any) cheese.', 'any'),
            p('Choose', '(How many / How much) apples?', 'How many'), p('Choose', '(How many / How much) rice?', 'How much'),
            p('Correct', 'two milks', 'some milk / two bottles of milk'), p('Correct', 'How much eggs?', 'How many eggs?'),
            p('Answer', 'How many eggs do we need? 8', 'We need eight eggs.'), p('Describe', 'List: bread · apples 6 · milk · vegetables a lot', 'We need some bread, six apples, some milk and a lot of vegetables.')
        ]),
        focus('Prices and small quantities', 'Pergunte preços e use few/a few/little/a little.', [['preço singular','How much is...?','How much is this jacket?'],['preço plural','How much are...?','How much are those shoes?'],['quantidade pequena','a few/a little','a few shirts; a little time']], ['Few/little destaca insuficiência.', 'A few/a little indica alguma quantidade disponível.'], [
            p('Number', '125', 'one hundred twenty-five'), p('Number', '350', 'three hundred fifty'), p('Number', '1,500', 'one thousand five hundred'),
            p('Build', 'is / How much / jacket / this / ?', 'How much is this jacket?'), p('Build', 'those / How much / shoes / are / ?', 'How much are those shoes?'),
            p('Answer', 'Jacket: $120', 'It’s one hundred twenty dollars.'), p('Choose', 'We have (a few / a little) shirts.', 'a few'),
            p('Choose', 'I have (a few / a little) time.', 'a little'), p('Choose', 'There are (few / little) jackets left.', 'few'),
            p('Correct', 'I have a few money.', 'I have a little money.'), p('Correct', 'How much is those shirts?', 'How much are those shirts?')
        ])
    ];
    stations.push(
        speaking('attempt','Conversation: family photo','Apresente uma família e responda às perguntas.',{label:'Family description',scenario:'Você mostra uma foto com seis pessoas.',task:'Explique relações, nomes, idades e quantos filhos ou irmãos algumas pessoas têm.',condition:'Use pelo menos duas relações com ’s e duas frases com have/has.',steps:['Escolha a ordem das pessoas.','Apresente as relações.','Responda às perguntas.'],support:['This is...','...’s brother','He/She has...','They have...'],evidence:'Relações e posse ficam compreensíveis.'}),
        speaking('questions','Conversation: home and shopping list','Localize itens e decida o que comprar.',{label:'What is missing?',scenario:'Uma família prepara uma refeição em casa.',task:'Descreva a cozinha, localize quatro itens e descubra o que falta na lista.',condition:'Pergunte com Is there/Are there e Do we have any...?',steps:['Descreva o cômodo.','Localize os itens.','Monte a lista com quantidades.'],support:['There is/are...','It is/They are...','Do we have any...?','We need some...'],evidence:'Descrição e lista usam apenas as lições 11–14.'}),
        speaking('final','Conversation: store decision','Faça compras com orçamento e tempo limitados.',{label:'Final store task',scenario:'Você precisa comprar itens para a família e uma peça de roupa.',task:'Pergunte preços, compare com seu orçamento e finalize a compra.',condition:'Há poucas unidades de um item e você tem pouco tempo.',steps:['Pergunte os preços.','Confirme as quantidades.','Escolha e explique a compra.'],support:['How much is/are...?','a few','a little','I’d like...','Can I pay by card?'],evidence:'Preços, quantidades e decisão ficam claros.'})
    );
    R.register(15, R.review({
        title:'Conversation Activities 3',
        objectives:['Revisar exclusivamente as lições 11–14.','Alternar revisão curta e prática de cada conteúdo.','Integrar família, casa, compras, quantidades e preços em tarefas online individuais.'],
        stations,
        reading: reading('Shopping for the family','Lucas and Marina have one daughter, Sofia. Their kitchen has a table and four chairs, but there is little food at home. They need some milk, six eggs, a lot of vegetables and a few bottles of water. At the store, the eggs are six dollars and the water is two dollars each. Marina also sees a blue jacket for one hundred twenty dollars, but she has little time and does not try it on.',
            question('Who is Sofia?', 'She is Lucas and Marina’s daughter.'), question('How many chairs are there?', 'There are four chairs.'), question('What food do they need?', 'They need milk, eggs and vegetables.'), question('How many eggs do they need?', 'They need six eggs.'), question('How much is the jacket?', 'It is one hundred twenty dollars.'), question('Does Marina try it on?', 'No, she does not.')),
        communicativeActivities:[
            comm('listening','Listen: shopping with a budget','Ouça a conversa entre uma cliente e uma atendente. Registre produto, cor, preço, quantidade e decisão final.',{
                placement:'before-reading',
                scenario:'Marina procura uma jaqueta e ainda precisa comprar alimentos para a família.',
                dialogue:dialogue('At the store',
                    line('Clerk','Good afternoon. Can I help you?','Boa tarde. Posso ajudar?'),
                    line('Marina','Yes. Do you have any blue jackets?','Sim. Vocês têm jaquetas azuis?'),
                    line('Clerk','We have a few. This one is one hundred twenty dollars.','Temos algumas. Esta custa cento e vinte dólares.'),
                    line('Marina','That’s expensive. How about this jacket?','É cara. Que tal esta jaqueta?'),
                    line('Clerk','That one is ninety dollars.','Aquela custa noventa dólares.'),
                    line('Marina','Great. I’d like to try it on.','Ótimo. Gostaria de experimentá-la.'),
                    line('Clerk','Of course. Do you need anything else?','Claro. Precisa de mais alguma coisa?'),
                    line('Marina','Yes. Where can I find eggs and water?','Sim. Onde encontro ovos e água?'),
                    line('Clerk','They’re near the register.','Eles ficam perto do caixa.'),
                    line('Marina','Thank you. I need six eggs and a few bottles of water.','Obrigada. Preciso de seis ovos e algumas garrafas de água.')
                ),
                questions:[
                    question('What color jacket does Marina want?','Blue.'),
                    question('How much is the first jacket?','One hundred twenty dollars.'),
                    question('Does Marina say the first jacket is expensive?','Yes, she does.'),
                    question('How much is the second jacket?','Ninety dollars.'),
                    question('Where are the eggs and water?','Near the register.'),
                    question('How many eggs does Marina need?','Six.'),
                    question('Does she need a lot of water?','No. She needs a few bottles.')
                ]
            }),
            comm('practice','Positive or negative?','Traduza cada pergunta e responda de acordo com a condição indicada. Leia a pergunta e a resposta completas.',{
                eyebrow:'Response Challenge',
                items:[
                    p('Positive answer','Tem alguns ovos na geladeira?','Are there any eggs in the fridge? — Yes, there are some.'),
                    p('Negative answer','Tem algum leite na garrafa?','Is there any milk in the bottle? — No, there isn’t any.'),
                    p('Positive answer','Tem algumas cadeiras na sala de jantar?','Are there any chairs in the dining room? — Yes, there are some.'),
                    p('Negative answer','Tem algum sofá no quarto?','Is there a sofa in the bedroom? — No, there isn’t.'),
                    p('Positive answer','Tem algumas maçãs na mesa?','Are there any apples on the table? — Yes, there are some.'),
                    p('Negative answer','Tem algum arroz no armário?','Is there any rice in the cabinet? — No, there isn’t any.'),
                    p('Positive answer','Tem algumas camisas azuis na loja?','Are there any blue shirts at the store? — Yes, there are some.'),
                    p('Negative answer','Tem algum dinheiro na bolsa?','Is there any money in the bag? — No, there isn’t any.'),
                    p('Positive answer','Tem algumas garrafas embaixo da mesa?','Are there any bottles under the table? — Yes, there are some.'),
                    p('Negative answer','Tem algum queijo na lista?','Is there any cheese on the list? — No, there isn’t any.')
                ]
            }),
            comm('interview','Family and home interview','Entreviste o professor usando dados reais ou inventados. Em seguida, apresente a família e a casa em terceira pessoa.',{
                scenario:'Você reúne informações para descrever onde uma pessoa mora e quem faz parte da família dela.',
                questions:['Who do you live with?','Do you have brothers or sisters?','How many brothers and sisters do you have?','What’s one family member’s name?','How old is he or she?','Where does he or she live?','Is there a large kitchen in your home?','How many bedrooms are there?','Where is the sofa?'],
                reportTask:'Apresente pelo menos seis informações conectadas, mudando you/your para he/his ou she/her.',
                support:['He/She lives with...','He/She has...','His/Her ...’s name is...','There is/are...','The ... is next to...']
            }),
            comm('qa-board','Home, family and shopping Q & A','Desembaralhe, encontre a resposta e depois crie uma nova resposta usando informações diferentes.',{
                pairs:[
                    {scrambled:'children / they / Do / have / ?',question:'Do they have children?',answer:'Yes. They have one daughter.'},
                    {scrambled:'brother / old / How / your / is / ?',question:'How old is your brother?',answer:'He is twenty-seven.'},
                    {scrambled:'sofa / is / Where / the / ?',question:'Where is the sofa?',answer:'It is near the window.'},
                    {scrambled:'chairs / there / Are / any / ?',question:'Are there any chairs?',answer:'Yes, there are four.'},
                    {scrambled:'eggs / need / many / How / we / do / ?',question:'How many eggs do we need?',answer:'We need six.'},
                    {scrambled:'rice / have / much / How / we / do / ?',question:'How much rice do we have?',answer:'We have a little.'},
                    {scrambled:'jacket / this / is / much / How / ?',question:'How much is this jacket?',answer:'It’s ninety dollars.'},
                    {scrambled:'card / by / pay / I / Can / ?',question:'Can I pay by card?',answer:'Yes, of course.'}
                ]
            })
        ],
        homework: homework('Prepare três produções usando somente as lições 11–14.',['Uma árvore familiar','Uma casa com uma lista de compras','Uma compra com preços e orçamento'],['Usei have/has e posse.','Usei there is/are e preposições.','Usei quantificadores, perguntas de quantidade e preços.'])
    }));
}());
