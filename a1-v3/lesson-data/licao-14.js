(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { v, x, p, t, line, dialogue, question, reading, activity, homework } = R.helpers;

    function priceNumbersSlide() {
        const values = [['100','one hundred'],['150','one hundred fifty'],['200','two hundred'],['350','three hundred fifty'],['500','five hundred'],['750','seven hundred fifty'],['1,000','one thousand'],['1,500','one thousand five hundred'],['2,000','two thousand'],['10,000','ten thousand']];
        return `<section><div class="slide-heading"><p class="lesson-panel-title">Prices & Larger Numbers</p><h2>Números acima de cem</h2><p>Em preços, ouça primeiro a moeda e depois confirme o valor completo.</p></div><div class="large-number-grid">${values.map(([value,word]) => `<button type="button" class="hundred-card" data-v3-speak="${word}"><strong>${value}</strong><span>${word}</span><i class="fas fa-volume-up"></i></button>`).join('')}</div><div class="grammar-notes"><p><strong>US$ 125:</strong> one hundred twenty-five dollars.</p><p><strong>R$ 1,250:</strong> one thousand two hundred fifty reais.</p></div></section>`;
    }

    R.register(14, R.lesson({
        title: 'At the Store',
        objectives: ['Perguntar e informar preços no singular e plural.', 'Compreender números e preços acima de cem.', 'Usar a few/a little para pequenas quantidades suficientes.', 'Distinguir few/little quando a quantidade é insuficiente.'],
        intro: [
            line('Clerk', 'Can I help you?', 'Posso ajudar?'),
            line('Emma', 'Yes. How much is this jacket?', 'Sim. Quanto custa esta jaqueta?'),
            line('Clerk', 'It’s one hundred twenty dollars.', 'Custa cento e vinte dólares.'),
            line('Emma', 'And how much are those shirts?', 'E quanto custam aquelas camisas?'),
            line('Clerk', 'They’re forty-five dollars each. We have only a few blue shirts.', 'Elas custam quarenta e cinco dólares cada. Temos apenas algumas camisas azuis.'),
            line('Emma', 'Okay. I have a little time, so I’d like to try one on.', 'Certo. Tenho um pouco de tempo, então gostaria de experimentar uma.')
        ],
        vocab: [
            v('store', 'loja', 'The store is at the mall.', 'A loja fica no shopping.'), v('price', 'preço', 'The price is on the tag.', 'O preço está na etiqueta.'),
            v('tag', 'etiqueta', 'Check the price tag.', 'Confira a etiqueta de preço.'), v('cashier', 'caixa; pessoa do caixa', 'The cashier is near the door.', 'O caixa fica perto da porta.'),
            v('cash', 'dinheiro em espécie', 'I pay in cash.', 'Eu pago em dinheiro.'), v('card', 'cartão', 'Can I pay by card?', 'Posso pagar com cartão?'),
            v('cost', 'custar', 'How much does it cost?', 'Quanto custa?'), v('each', 'cada', 'The shirts are forty dollars each.', 'As camisas custam quarenta dólares cada.'),
            v('cheap', 'barato(a)', 'This shirt is cheap.', 'Esta camisa é barata.'), v('expensive', 'caro(a)', 'That jacket is expensive.', 'Aquela jaqueta é cara.'),
            v('sale', 'promoção', 'The shoes are on sale.', 'Os sapatos estão em promoção.'), v('change', 'troco', 'Here is your change.', 'Aqui está seu troco.'),
            v('few', 'poucos; insuficientes', 'There are few shirts left.', 'Restam poucas camisas.'), v('a few', 'alguns; quantidade pequena', 'We have a few blue shirts.', 'Temos algumas camisas azuis.'),
            v('little', 'pouco; insuficiente', 'We have little time.', 'Temos pouco tempo.'), v('a little', 'um pouco; quantidade pequena', 'I have a little time.', 'Tenho um pouco de tempo.'),
            v('try on', 'experimentar roupa', 'I’d like to try it on.', 'Eu gostaria de experimentar.'), v('pay', 'pagar', 'Where can I pay?', 'Onde posso pagar?')
        ],
        afterVocabularySlides: [{ title: 'Preços e números maiores', body: priceNumbersSlide }],
        grammar: {
            title: 'How much e pequenas quantidades',
            summary: 'How much is pergunta preço singular; How much are pergunta preço plural. A few acompanha contáveis e a little acompanha não contáveis.',
            rows: [
                ['preço singular', 'How much is this/that + noun?', 'How much is this jacket?', 'Quanto custa esta jaqueta?'],
                ['preço plural', 'How much are these/those + plural?', 'How much are those shirts?', 'Quanto custam aquelas camisas?'],
                ['pequena quantidade contável', 'a few + plural noun', 'a few shirts', 'algumas camisas'],
                ['quantidade contável insuficiente', 'few + plural noun', 'few shirts', 'poucas camisas'],
                ['pequena quantidade não contável', 'a little + noun', 'a little time', 'um pouco de tempo'],
                ['quantidade não contável insuficiente', 'little + noun', 'little money', 'pouco dinheiro']
            ],
            notes: ['A em a few/a little transmite uma pequena quantidade disponível.', 'Sem a, few/little frequentemente destaca insuficiência.', 'Use they’re para responder sobre itens plurais.']
        },
        activitySections: [
            activity('Leia preços e números maiores', 'Escreva o valor por extenso antes de revelar o modelo.', [
                p('Number', '105', 'one hundred five'), p('Number', '120', 'one hundred twenty'), p('Number', '245', 'two hundred forty-five'),
                p('Number', '500', 'five hundred'), p('Number', '750', 'seven hundred fifty'), p('Number', '999', 'nine hundred ninety-nine'),
                p('Number', '1,000', 'one thousand'), p('Number', '1,250', 'one thousand two hundred fifty'), p('Number', '2,500', 'two thousand five hundred'),
                p('Answer', 'Price: $45', 'forty-five dollars'), p('Answer', 'Price: $120', 'one hundred twenty dollars'), p('Answer', 'Price: R$1,500', 'one thousand five hundred reais')
            ], 'Price Reading'),
            activity('Pergunte o preço correto', 'Escolha is para um item e are para itens plurais.', [
                p('Complete', 'How much ___ this jacket?', 'is'), p('Complete', 'How much ___ those shirts?', 'are'), p('Complete', 'How much ___ these shoes?', 'are'),
                p('Build', 'is / How much / bag / this / ?', 'How much is this bag?'), p('Build', 'those / How much / are / jackets / ?', 'How much are those jackets?'),
                p('Answer', 'How much is the jacket? $120', 'It’s one hundred twenty dollars.'), p('Answer', 'How much are the shirts? $45 each', 'They’re forty-five dollars each.'),
                p('Correct', 'How many is this shirt?', 'How much is this shirt?'), p('Correct', 'How much is those shoes?', 'How much are those shoes?'),
                p('Create', 'Ask about one singular and one plural item.', 'How much is...? How much are...?')
            ]),
            activity('Few, a few, little ou a little?', 'Observe se o substantivo é contável e se a quantidade é suficiente.', [
                p('Choose', 'We have (a few / a little) shirts.', 'a few'), p('Choose', 'I have (a few / a little) time.', 'a little'),
                p('Choose', 'There are (few / little) shoes left.', 'few'), p('Choose', 'I have (few / little) money today.', 'little'),
                p('Complete', 'We have ___ blue jackets. You can choose one.', 'a few'), p('Complete', 'I have ___ time. I can try it on.', 'a little'),
                p('Complete', 'There are ___ items left. The store is almost empty.', 'few'), p('Complete', 'I have ___ money. I cannot buy the jacket.', 'little'),
                p('Correct', 'I have a few money.', 'I have a little money.'), p('Correct', 'There is a little shirts.', 'There are a few shirts.'),
                p('Describe', 'Store: blue shirts 3 available · time 10 minutes available', 'There are a few blue shirts, and I have a little time.')
            ], 'Quantity Nuance')
        ],
        translations: [
            t('Quanto custa esta jaqueta?', 'How much is this jacket?'), t('Ela custa cento e vinte dólares.', 'It’s one hundred twenty dollars.'),
            t('Quanto custam aquelas camisas?', 'How much are those shirts?'), t('Elas custam quarenta e cinco dólares cada.', 'They’re forty-five dollars each.'),
            t('Temos algumas camisas azuis.', 'We have a few blue shirts.'), t('Há poucas jaquetas restantes.', 'There are few jackets left.'),
            t('Tenho um pouco de tempo.', 'I have a little time.'), t('Tenho pouco dinheiro hoje.', 'I have little money today.'),
            t('Posso pagar com cartão?', 'Can I pay by card?'), t('Eu gostaria de experimentar.', 'I’d like to try it on.')
        ],
        expressions: [
            x('Can I help you?', 'Posso ajudar?', 'Abertura frequente em lojas.', 'Hello. Can I help you?', 'Olá. Posso ajudar?'),
            x('How much is this/that...?', 'Quanto custa este/aquele...?', 'Pergunta por um preço singular.', 'How much is this jacket?', 'Quanto custa esta jaqueta?'),
            x('How much are these/those...?', 'Quanto custam estes/aqueles...?', 'Pergunta por preço plural.', 'How much are those shoes?', 'Quanto custam aqueles sapatos?'),
            x('It’s... / They’re...', 'Custa... / Custam...', 'Resposta singular ou plural.', 'They’re forty dollars each.', 'Eles custam quarenta dólares cada.'),
            x('I’d like to try it on.', 'Eu gostaria de experimentar.', 'Pedido para experimentar uma peça.', 'This looks nice. I’d like to try it on.', 'Isto parece bonito. Eu gostaria de experimentar.'),
            x('It’s on sale.', 'Está em promoção.', 'Indica preço promocional.', 'The jacket is on sale.', 'A jaqueta está em promoção.'),
            x('Can I pay by card?', 'Posso pagar com cartão?', 'Pergunta sobre forma de pagamento.', 'Can I pay by card?', 'Posso pagar com cartão?'),
            x('Here is your change.', 'Aqui está seu troco.', 'Fala comum no caixa.', 'Thank you. Here is your change.', 'Obrigado. Aqui está seu troco.'),
            x('That’s too expensive.', 'Isso é caro demais.', 'Recusa baseada em preço.', 'One thousand dollars? That’s too expensive.', 'Mil dólares? Isso é caro demais.')
        ],
        dialogues: [
            dialogue('Trying on a jacket', line('A', 'Excuse me. How much is this jacket?', 'Com licença. Quanto custa esta jaqueta?'), line('B', 'It’s one hundred twenty dollars.', 'Custa cento e vinte dólares.'), line('A', 'Do you have it in blue?', 'Vocês têm esta peça em azul?'), line('B', 'Yes, but we have only a few.', 'Sim, mas temos apenas algumas.'), line('A', 'Great. I’d like to try on the blue one.', 'Ótimo. Eu gostaria de experimentar a azul.'), line('B', 'Of course. The fitting room is over there.', 'Claro. O provador fica ali.')),
            dialogue('Two shirts', line('A', 'How much are those shirts?', 'Quanto custam aquelas camisas?'), line('B', 'They’re forty-five dollars each.', 'Elas custam quarenta e cinco dólares cada.'), line('A', 'And how much are two shirts?', 'E quanto custam duas camisas?'), line('B', 'They’re ninety dollars.', 'Elas custam noventa dólares.')),
            dialogue('A bag on sale', line('A', 'Is this bag expensive?', 'Esta bolsa é cara?'), line('B', 'No. It’s on sale.', 'Não. Está em promoção.'), line('A', 'How much is it?', 'Quanto custa?'), line('B', 'It’s fifty dollars.', 'Custa cinquenta dólares.'), line('A', 'That’s a good price.', 'É um bom preço.'), line('B', 'Yes, the regular price is eighty dollars.', 'Sim, o preço normal é oitenta dólares.')),
            dialogue('A few blue shirts', line('A', 'Do you have blue shirts?', 'Vocês têm camisas azuis?'), line('B', 'Yes, but we have only a few.', 'Sim, mas temos apenas algumas.'), line('A', 'Can you show me a medium?', 'Pode me mostrar uma de tamanho médio?'), line('B', 'Sure. Here you are.', 'Claro. Aqui está.')),
            dialogue('At the register', line('A', 'Can I pay by card?', 'Posso pagar com cartão?'), line('B', 'Yes, of course.', 'Sim, claro.'), line('A', 'Great. I’ll take the jacket and the bag.', 'Ótimo. Vou levar a jaqueta e a bolsa.'), line('B', 'That’s one hundred seventy dollars.', 'São cento e setenta dólares.'), line('A', 'Here is my card.', 'Aqui está meu cartão.'), line('B', 'Thank you. Have a nice day.', 'Obrigado. Tenha um bom dia.'))
        ],
        dialogueGroups: [[0, 1], [2, 3, 4]],
        reading: reading('The weekend sale', 'The store has a weekend sale. There are a few blue shirts for thirty-five dollars each and a few black jackets for one hundred dollars. There are few red jackets left. Sarah has a little time before work and a little money for shopping. She buys one blue shirt. She does not buy a jacket because one hundred dollars is too expensive for her today.',
            question('What is on sale?', 'Shirts and jackets are on sale.'), question('How much are the blue shirts?', 'They are thirty-five dollars each.'), question('Are there many red jackets?', 'No. There are few red jackets left.'), question('Does Sarah have time to shop?', 'She has a little time.'), question('What does she buy?', 'She buys one blue shirt.'), question('Why doesn’t she buy a jacket?', 'It is too expensive for her.')),
        conversation: { questions: ['How much is a typical shirt where you live?', 'How much are typical shoes?', 'Name one cheap and one expensive item.', 'Ask the price of three items.', 'Say two prices above one hundred.', 'Use a few and a little in two sentences.', 'You have little money. What do you choose?', 'Complete a store conversation from greeting to payment.'], support: ['Can I help you?', 'How much is/are...?', 'It’s/They’re...', 'a few', 'a little', 'I’d like to try it on.', 'Can I pay by card?'] },
        homework: homework('Crie uma pequena loja com pelo menos dez itens e preços.', ['Uma loja de roupas', 'Uma loja com promoção', 'Compras com orçamento limitado'], ['Incluí preços abaixo e acima de cem.', 'Preparei perguntas no singular e plural.', 'Usei a few/a little e few/little em contexto.']),
        mission: { title: 'Shop with a budget', task: 'Descubra preços, experimente uma opção e escolha o que comprar com dinheiro e tempo limitados.', focus: ['preços claros', 'singular/plural', 'decisão com quantidade'] }
    }));
}());
