(function () {
    'use strict';
    const R=window.A1V3LessonRegistry; const {v,x,p,t,line,dialogue,question,reading,activity,homework}=R.helpers;
    R.register(16,R.lesson({
        title:'Which One?',
        objectives:['Nomear cores e peças de roupa frequentes.','Evitar repetição com one e ones.','Usar object pronouns em pedidos e respostas simples.','Usar still e not yet em situações de compra.'],
        intro:[
            line('Clerk','Which jacket do you prefer, the black one or the blue one?','Qual jaqueta você prefere, a preta ou a azul?'),
            line('Emma','I like the blue one. Can you show it to me?','Gosto da azul. Pode mostrá-la para mim?'),
            line('Clerk','Of course. Do you want to try it on?','Claro. Você quer experimentá-la?'),
            line('Emma','Yes, but I still need a shirt.','Sim, mas ainda preciso de uma camisa.'),
            line('Clerk','What about these white ones?','Que tal estas brancas?'),
            line('Emma','I’m not sure yet.','Ainda não tenho certeza.')
        ],
        vocab:[
            v('black','preto(a)','I like the black jacket.','Gosto da jaqueta preta.'),v('white','branco(a)','These white shirts are on sale.','Estas camisas brancas estão em promoção.'),
            v('blue','azul','The blue one is nice.','A azul é bonita.'),v('red','vermelho(a)','Show me the red dress.','Mostre-me o vestido vermelho.'),
            v('green','verde','He has a green sweater.','Ele tem um suéter verde.'),v('yellow','amarelo(a)','Those yellow socks are small.','Aquelas meias amarelas são pequenas.'),
            v('gray','cinza','The gray pants are expensive.','A calça cinza é cara.'),v('brown','marrom','I prefer the brown shoes.','Prefiro os sapatos marrons.'),
            v('shirt','camisa','I need a shirt.','Preciso de uma camisa.'),v('T-shirt','camiseta','This T-shirt is comfortable.','Esta camiseta é confortável.'),
            v('sweater','suéter','The sweater is warm.','O suéter é quente.'),v('dress','vestido','She likes the red dress.','Ela gosta do vestido vermelho.'),
            v('skirt','saia','The black skirt is short.','A saia preta é curta.'),v('pants','calça','These pants are large.','Esta calça é grande.'),
            v('shorts','shorts','The blue shorts are cheap.','O shorts azul é barato.'),v('socks','meias','I need new socks.','Preciso de meias novas.'),
            v('size','tamanho','What size do you need?','De que tamanho você precisa?'),v('prefer','preferir','I prefer the blue one.','Prefiro a azul.')
        ],
        grammar:{title:'One, ones e object pronouns',summary:'Use one para substituir um substantivo singular e ones para plural. Object pronouns recebem a ação.',rows:[
            ['singular','the + adjective + one','the blue one','o/a azul'],['plural','the + adjective + ones','the white ones','os/as brancos(as)'],
            ['coisa singular','it','Try it on.','Experimente-a.'],['pessoas/coisas plurais','them','Show them to me.','Mostre-os para mim.'],
            ['pessoa que fala','me','Can you help me?','Pode me ajudar?'],['outras pessoas','him/her/us','Show him/her/us the jacket.','Mostre a jaqueta a ele/ela/nós.']
        ],notes:['One/ones substitui o substantivo; não use os dois juntos.', 'It e them aparecem depois do verbo ou preposição.', 'Still = ainda continua; not yet = ainda não.']},
        activitySections:[
            activity('Cores e roupas','Combine cor e peça e produza descrições completas.',[
                p('Match','shirt · dress · shoes · sweater · socks → white · red · brown · green · yellow','white shirt; red dress; brown shoes; green sweater; yellow socks'),
                p('Complete','a ___ jacket (azul)','blue'),p('Complete','___ pants (cinza)','gray'),p('Complete','a ___ skirt (preta)','black'),
                p('Classify','shirt · pants · dress · socks · sweater · skirt','singular: shirt, dress, sweater, skirt; plural form: pants, socks'),
                p('Describe','Jacket: blue · size M · $80','It is a blue jacket. It is size M and it is eighty dollars.'),
                p('Describe','Shoes: brown · size 9 · $120','They are brown shoes. They are size nine and cost one hundred twenty dollars.'),
                p('Answer','Choose two colors you wear often.','I often wear ... and ...')
            ],'Clothes & Colors'),
            activity('One ou ones?','Substitua o substantivo repetido sem perder singular ou plural.',[
                p('Complete','I like the blue jacket, not the black ___.','one'),p('Complete','These shirts are small. Show me the large ___.','ones'),
                p('Transform','the red dress','the red one'),p('Transform','the white shirts','the white ones'),
                p('Answer','Which jacket do you prefer: black or blue?','I prefer the ... one.'),p('Answer','Which shirts do you prefer: white or green?','I prefer the ... ones.'),
                p('Correct','I like the blue one jacket.','I like the blue jacket. / I like the blue one.'),p('Correct','Show me the black ones shirt.','Show me the black shirt. / Show me the black one.'),
                p('Build','prefer / one / I / blue / the','I prefer the blue one.'),p('Build','about / What / white / ones / the / ?','What about the white ones?')
            ]),
            activity('It, them, me, him, her ou us?','Escolha o pronome que recebe a ação e use still/not yet em contexto.',[
                p('Complete','This jacket is nice. I want to try ___ on.','it'),p('Complete','These shoes are nice. Show ___ to me.','them'),
                p('Complete','Can you help ___? I need a size M.','me'),p('Complete','Sarah likes the dress. Show it to ___.','her'),
                p('Complete','Leo likes the jacket. Show it to ___.','him'),p('Complete','We need two shirts. Please show ___ the blue ones.','us'),
                p('Complete','I ___ need a shirt.','still'),p('Complete','I’m not ready ___.','yet'),
                p('Correct','I want to try them on. (one jacket)','I want to try it on.'),p('Correct','Show she the blue shirt.','Show her the blue shirt.'),
                p('Create','You need a jacket but are not sure about the color.','I still need a jacket, but I’m not sure about the color yet.')
            ],'Pronoun Practice')
        ],
        translations:[t('Qual jaqueta você prefere?','Which jacket do you prefer?'),t('Eu prefiro a azul.','I prefer the blue one.'),t('Eu prefiro as brancas.','I prefer the white ones.'),t('Pode mostrá-la para mim?','Can you show it to me?'),t('Eu quero experimentá-la.','I want to try it on.'),t('Mostre-os para ela.','Show them to her.'),t('Ainda preciso de uma camisa.','I still need a shirt.'),t('Ainda não tenho certeza.','I’m not sure yet.'),t('De que tamanho você precisa?','What size do you need?'),t('Estas calças cinzas são caras.','These gray pants are expensive.')],
        expressions:[
            x('Which one?', 'Qual deles/delas?', 'Pergunta por uma opção singular.','Which one do you prefer?','Qual você prefere?'),
            x('Which ones?', 'Quais deles/delas?', 'Pergunta por opções plurais.','Which ones do you like?','Quais você gosta?'),
            x('the ... one/ones','o/a ...; os/as ...','Evita repetir o substantivo.','I prefer the black ones.','Prefiro os pretos.'),
            x('Can you show it/them to me?','Pode mostrar para mim?','Pedido por um ou vários itens.','Can you show them to me?','Pode mostrá-los para mim?'),
            x('I’d like to try it on.','Gostaria de experimentar.','Pedido para provar roupa.','I’d like to try the blue one on.','Gostaria de experimentar a azul.'),
            x('What size do you need?','De que tamanho você precisa?','Pergunta comum em loja.','What size do you need? Size M.','De que tamanho precisa? M.'),
            x('I still need...','Ainda preciso de...','Necessidade que continua.','I still need shoes.','Ainda preciso de sapatos.'),
            x('I’m not sure yet.','Ainda não tenho certeza.','Decisão ainda não concluída.','Blue or black? I’m not sure yet.','Azul ou preto? Ainda não tenho certeza.')
        ],
        dialogues:[
            dialogue('Choosing a jacket',line('A','Which jacket do you prefer?','Qual jaqueta você prefere?'),line('B','The blue one.','A azul.'),line('A','Would you like to try it on?','Gostaria de experimentá-la?'),line('B','Yes, please. Do you have a medium?','Sim, por favor. Vocês têm tamanho médio?'),line('A','Yes. Here it is.','Sim. Aqui está.'),line('B','Thank you. I really like it.','Obrigado. Eu gostei muito dela.')),
            dialogue('White or green shirts',line('A','Do you like these white shirts?','Você gosta destas camisas brancas?'),line('B','They’re nice, but I prefer the green ones.','Elas são bonitas, mas prefiro as verdes.'),line('A','Do you want to try them on?','Você quer experimentá-las?'),line('B','Yes. Show me a small one, please.','Sim. Mostre-me uma pequena, por favor.')),
            dialogue('The brown shoes',line('A','Can you show me the brown shoes?','Pode me mostrar os sapatos marrons?'),line('B','Of course. Here they are.','Claro. Aqui estão.'),line('A','They’re nice. How much are they?','Eles são bonitos. Quanto custam?'),line('B','They’re eighty dollars.','Custam oitenta dólares.'),line('A','Do you have them in black?','Vocês os têm em preto?'),line('B','Yes. I can show them to you.','Sim. Posso mostrá-los para você.')),
            dialogue('Still shopping',line('A','Are you ready to pay?','Você está pronto para pagar?'),line('B','Not yet. I still need a sweater.','Ainda não. Ainda preciso de um suéter.'),line('A','What color do you want?','Que cor você quer?'),line('B','Gray or black.','Cinza ou preto.'),line('A','How about this gray one?','Que tal este cinza?'),line('B','Perfect. I’ll take it.','Perfeito. Vou levá-lo.')),
            dialogue('A dress for Sarah',line('A','Sarah likes this dress.','Sarah gosta deste vestido.'),line('B','Show it to her.','Mostre-o para ela.'),line('A','Do you think she likes the red one?','Você acha que ela gosta do vermelho?'),line('B','Yes, but show her the blue one too.','Sim, mas mostre o azul para ela também.'),line('A','Good idea.','Boa ideia.'))
        ],
        dialogueGroups: [[0, 1], [2, 3, 4]],
        reading:reading('Emma’s choices','Emma needs a jacket, two shirts and new shoes. She likes the blue jacket, but she is not sure yet. The black one is cheaper. The white shirts are small, so she asks for the green ones. The clerk shows them to her. Emma still needs shoes. She likes the brown ones and tries them on.',question('What does Emma need?','She needs a jacket, two shirts and shoes.'),question('Which jacket is cheaper?','The black one is cheaper.'),question('Why doesn’t she choose the white shirts?','They are small.'),question('Which shirts does she ask for?','She asks for the green ones.'),question('Which shoes does she like?','She likes the brown ones.')),
        conversation:{questions:['What colors do you wear often?','Which color do you prefer for a jacket?','Name six pieces of clothing.','Choose between two shirts using one or ones.','Ask to see an item.','Say what you still need.','Say one decision you have not made yet.','Create a full store exchange with three choices.'],support:['Which one/ones?','I prefer the ... one/ones.','Show it/them to me.','I’d like to try it on.','I still need...','Not yet.']},
        homework:homework('Crie três conjuntos de roupas e prepare decisões de compra.',['Roupas para o trabalho','Roupas para uma viagem','Compras com três cores e tamanhos'],['Incluí pelo menos dez peças e oito cores.','Usei one/ones e object pronouns.','Incluí still e not yet em situações naturais.']),
        mission:{title:'Choose the outfit',task:'Escolha roupas para uma situação, peça para ver e experimentar itens e explique as escolhas.',focus:['one/ones','object pronouns','decisão clara']}
    }));
}());
