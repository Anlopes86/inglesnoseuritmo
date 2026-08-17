(function () {
    'use strict';
    const R = window.A1V3LessonRegistry;
    const { v, x, p, t, line, dialogue, question, reading, activity, homework } = R.helpers;
    const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const tens = { 20: 'twenty', 30: 'thirty', 40: 'forty', 50: 'fifty', 60: 'sixty', 70: 'seventy', 80: 'eighty', 90: 'ninety' };
    function numberWord(number) { if (number === 100) return 'one hundred'; const base = Math.floor(number / 10) * 10; const unit = number % 10; return unit ? `${tens[base]}-${units[unit]}` : tens[base]; }
    function family(start, end) { const base = Math.floor(start / 10) * 10; return `<article class="number-family"><h3><span>${base}s</span>${tens[base]}</h3><div>${Array.from({ length: end - start + 1 }, (_, index) => start + index).map(number => { const word = numberWord(number); return `<button type="button" class="number-chip" data-number-value="${number}" data-v3-speak="${word}" aria-label="Ouvir ${word}"><strong>${number}</strong><span>${word}</span><i class="fas fa-volume-up" aria-hidden="true"></i></button>`; }).join('')}</div></article>`; }
    function extendedNumbersSlide() { const families = [[21,29],[30,39],[40,49],[50,59],[60,69],[70,79],[80,89],[90,99]]; return `<section class="foundation-reference extended-numbers-reference"><div class="slide-heading"><p class="lesson-panel-title">Numbers 21–100</p><h2>Números para contato e endereço</h2><p>Clique em qualquer número, ouça e repita. Depois, use os números em telefone, endereço e código postal.</p></div><div class="number-spelling-alerts"><p><strong>twenty-one</strong><span>Use hífen entre dezena e unidade.</span></p><p><strong>forty</strong><span>Não escreva <s>fourty</s>.</span></p><p><strong>fifty / eighty</strong><span>Observe as mudanças na escrita.</span></p></div><div class="number-family-grid">${families.map(([start,end]) => family(start,end)).join('')}</div><div class="large-number-grid"><button type="button" class="hundred-card" data-number-value="100" data-v3-speak="one hundred"><strong>100</strong><span>one hundred</span><i class="fas fa-volume-up"></i></button><button type="button" class="hundred-card" data-number-value="1000" data-v3-speak="one thousand"><strong>1,000</strong><span>one thousand</span><i class="fas fa-volume-up"></i></button><button type="button" class="hundred-card" data-number-value="10000" data-v3-speak="ten thousand"><strong>10,000</strong><span>ten thousand</span><i class="fas fa-volume-up"></i></button></div></section>`; }

    R.register(6, R.lesson({
        title: 'What’s Your Address?',
        objectives: ['Perguntar e informar endereço, telefone, e-mail e código postal.', 'Ditar e confirmar números de 21 a 100, 1.000 e 10.000.', 'Usar at e dot ao dizer um endereço de e-mail.', 'Pedir repetição, soletração e confirmação de dados.'],
        intro: [
            line('Receptionist', 'What’s your address?', 'Qual é seu endereço?'),
            line('Emma', 'It’s 42 Green Street, apartment 8.', 'É Rua Green, 42, apartamento 8.'),
            line('Receptionist', 'And what’s your email?', 'E qual é seu e-mail?'),
            line('Emma', 'It’s emma dot torres at mail dot com.', 'É emma ponto torres arroba mail ponto com.'),
            line('Receptionist', 'Please repeat the phone number.', 'Por favor, repita o número de telefone.'),
            line('Emma', 'Sure. It’s 555-2874.', 'Claro. É 555-2874.')
        ],
        vocab: [
            v('address', 'endereço', 'My address is 42 Green Street.', 'Meu endereço é Rua Green, 42.'),
            v('street', 'rua', 'She lives on Green Street.', 'Ela mora na Rua Green.'),
            v('avenue', 'avenida', 'The office is on Central Avenue.', 'O escritório fica na Avenida Central.'),
            v('apartment', 'apartamento', 'My apartment number is eight.', 'O número do meu apartamento é oito.'),
            v('house number', 'número da casa', 'The house number is ninety-two.', 'O número da casa é noventa e dois.'),
            v('zip code', 'CEP; código postal', 'What is your zip code?', 'Qual é seu CEP?'),
            v('phone number', 'número de telefone', 'My phone number is 555-2874.', 'Meu telefone é 555-2874.'),
            v('email address', 'endereço de e-mail', 'Please confirm your email address.', 'Por favor, confirme seu e-mail.'),
            v('at (@)', 'arroba', ['Say: emma at mail dot com.', 'My email has one at sign.'], ['Diga: emma arroba mail ponto com.', 'Meu e-mail tem um sinal de arroba.']),
            v('dot (.)', 'ponto', ['Say: emma dot torres.', 'Use dot before com.'], ['Diga: emma ponto torres.', 'Use ponto antes de com.']),
            v('form', 'formulário', 'Complete the contact form.', 'Preencha o formulário de contato.'),
            v('contact details', 'dados de contato', 'Check your contact details.', 'Confira seus dados de contato.'),
            v('repeat', 'repetir', 'Please repeat the number.', 'Por favor, repita o número.'),
            v('confirm', 'confirmar', 'Please confirm your address.', 'Por favor, confirme seu endereço.')
        ],
        afterVocabularySlides: [{ title: 'Números de 21 a 100', body: extendedNumbersSlide }],
        grammar: {
            title: 'Perguntas de contato com What’s your...?',
            summary: 'Mantenha a mesma estrutura e troque somente o dado solicitado. Use It’s... ou My... is... nas respostas.',
            rows: [
                ['endereço', 'What’s your address?', 'It’s 42 Green Street.', 'Qual é seu endereço?'],
                ['telefone', 'What’s your phone number?', 'My phone number is 555-2874.', 'Qual é seu telefone?'],
                ['e-mail', 'What’s your email address?', 'It’s emma@mail.com.', 'Qual é seu e-mail?'],
                ['CEP', 'What’s your zip code?', 'It’s 20345.', 'Qual é seu CEP?']
            ],
            notes: ['Ao ditar telefone, diga os algarismos em grupos curtos.', 'Em e-mail, diga at para @ e dot para cada ponto.', 'Endereços em inglês normalmente apresentam o número antes do nome da rua.']
        },
        activitySections: [
            activity('Leia e escreva números maiores', 'Escreva cada número por extenso e observe hífen e mudanças de escrita.', [
                p('Number', '21', 'twenty-one'), p('Number', '28', 'twenty-eight'), p('Number', '30', 'thirty'), p('Number', '35', 'thirty-five'),
                p('Number', '40', 'forty'), p('Number', '47', 'forty-seven'), p('Number', '50', 'fifty'), p('Number', '68', 'sixty-eight'),
                p('Number', '79', 'seventy-nine'), p('Number', '84', 'eighty-four'), p('Number', '99', 'ninety-nine'), p('Number', '100', 'one hundred'),
                p('Number', '1,000', 'one thousand'), p('Number', '10,000', 'ten thousand')
            ], 'Numbers 21–10,000'),
            activity('Complete um formulário de contato', 'Leia o campo antes de responder com uma informação completa.', [
                p('Answer', 'What’s your address?', 'It’s ...'),
                p('Answer', 'What’s your phone number?', 'My phone number is ...'),
                p('Answer', 'What’s your email address?', 'It’s ... at ... dot com.'),
                p('Answer', 'What’s your zip code?', 'It’s ...'),
                p('Build', 'your / What’s / address / ?', 'What’s your address?'),
                p('Build', 'number / phone / your / What’s / ?', 'What’s your phone number?'),
                p('Complete', 'emma ___ mail ___ com', 'emma at mail dot com'),
                p('Complete', 'leo ___ silva ___ school ___ org', 'leo dot silva at school dot org'),
                p('Correct', 'My address are 42 Green Street.', 'My address is 42 Green Street.'),
                p('Correct', 'What your email address?', 'What’s your email address?')
            ]),
            activity('Confirme dados que não ficaram claros', 'Escolha um pedido de repetição ou confirmação e depois repita o dado corretamente.', [
                p('Answer', 'You did not understand the phone number.', 'Please repeat the phone number.'),
                p('Answer', 'You did not understand the last name.', 'How do you spell your last name?'),
                p('Answer', 'Verify the email.', 'Please confirm your email address.'),
                p('Answer', 'The receptionist says “Please repeat.”', 'Sure. It’s ...'),
                p('Build', 'repeat / Please / number / the', 'Please repeat the number.'),
                p('Build', 'confirm / address / your / Please', 'Please confirm your address.'),
                p('Describe', 'Card: 84 King Street · apartment 12 · zip code 30540', 'The address is 84 King Street, apartment twelve. The zip code is thirty thousand five hundred forty.'),
                p('Describe', 'Email: ana.souza@school.com', 'ana dot souza at school dot com')
            ], 'Accuracy Practice')
        ],
        translations: [
            t('Qual é seu endereço?', 'What’s your address?'), t('Meu endereço é Avenida Central, 84.', 'My address is 84 Central Avenue.'),
            t('Qual é seu número de telefone?', 'What’s your phone number?'), t('Por favor, repita o número.', 'Please repeat the number.'),
            t('Qual é seu endereço de e-mail?', 'What’s your email address?'), t('ana ponto silva arroba mail ponto com', 'ana dot silva at mail dot com'),
            t('Qual é seu CEP?', 'What’s your zip code?'), t('Por favor, confirme seu endereço.', 'Please confirm your address.'),
            t('O número do apartamento é quarenta e dois.', 'The apartment number is forty-two.'), t('O número da casa é cem.', 'The house number is one hundred.')
        ],
        expressions: [
            x('What’s your address?', 'Qual é seu endereço?', 'Pergunta direta de cadastro.', 'What’s your address, please?', 'Qual é seu endereço, por favor?'),
            x('My address is...', 'Meu endereço é...', 'Resposta completa para um formulário.', 'My address is 42 Green Street.', 'Meu endereço é Rua Green, 42.'),
            x('What’s your phone number?', 'Qual é seu telefone?', 'Pergunta sobre contato telefônico.', 'What’s your phone number?', 'Qual é seu telefone?'),
            x('What’s your email address?', 'Qual é seu e-mail?', 'Pergunta sobre contato digital.', 'What’s your email address?', 'Qual é seu endereço de e-mail?'),
            x('Please repeat.', 'Por favor, repita.', 'Pedido direto e educado.', 'Please repeat the phone number.', 'Por favor, repita o telefone.'),
            x('How do you spell...?', 'Como se soletra...?', 'Use quando a dificuldade é uma palavra ou nome.', 'How do you spell Green?', 'Como se soletra Green?'),
            x('Please confirm...', 'Por favor, confirme...', 'Use para verificar uma informação importante.', 'Please confirm your email.', 'Por favor, confirme seu e-mail.'),
            x('Let me check.', 'Deixe-me conferir.', 'Use antes de repetir um dado.', 'Let me check the address.', 'Deixe-me conferir o endereço.'),
            x('Is that correct?', 'Está correto?', 'Pergunta final de confirmação.', 'Forty-two Green Street. Is that correct?', 'Rua Green, 42. Está correto?')
        ],
        dialogues: [
            dialogue('Address', line('A', 'What’s your address?', 'Qual é seu endereço?'), line('B', 'It’s 42 Green Street, apartment 8.', 'É Rua Green, 42, apartamento 8.'), line('A', 'Is that correct?', 'Está correto?'), line('B', 'Yes, it is.', 'Sim.')),
            dialogue('Phone number', line('A', 'What’s your phone number?', 'Qual é seu telefone?'), line('B', 'It’s 555-2874.', 'É 555-2874.'), line('A', 'Please repeat.', 'Por favor, repita.'), line('B', 'Sure. 555-2874.', 'Claro. 555-2874.')),
            dialogue('Email', line('A', 'What’s your email address?', 'Qual é seu e-mail?'), line('B', 'emma dot torres at mail dot com.', 'emma ponto torres arroba mail ponto com.'), line('A', 'Let me check.', 'Deixe-me conferir.')),
            dialogue('Spelling the street', line('A', 'How do you spell Green?', 'Como se soletra Green?'), line('B', 'G-R-E-E-N.', 'G-R-E-E-N.'), line('A', 'Thank you.', 'Obrigado.')),
            dialogue('Zip code', line('A', 'What’s your zip code?', 'Qual é seu CEP?'), line('B', 'It’s 30540.', 'É 30540.'), line('A', 'Please confirm: three-zero-five-four-zero.', 'Confirme: três-zero-cinco-quatro-zero.'), line('B', 'That’s correct.', 'Está correto.'))
        ],
        reading: reading('Two contact cards', 'Contact card 1 — Emma Torres. Address: 42 Green Street, apartment 8. Phone: 555-2874. Email: emma.torres@mail.com. Contact card 2 — Daniel Costa. Address: 91 King Avenue, apartment 20. Phone: 555-4630. Email: daniel.costa@school.org.',
            question('What is Emma’s house number?', 'It is forty-two.'), question('What is Emma’s apartment number?', 'It is eight.'), question('What is Daniel’s address?', 'It is 91 King Avenue, apartment 20.'), question('What is Daniel’s phone number?', 'It is 555-4630.'), question('Spell Emma’s email.', 'emma dot torres at mail dot com.')),
        conversation: { questions: ['Say a fictitious address.', 'Say a fictitious phone number.', 'Say an email using at and dot.', 'Spell the street name.', 'Ask the teacher for an address.', 'Ask the teacher to repeat a number.', 'Confirm three contact details.', 'Complete a full online contact form orally.'], support: ['What’s your...?', 'My... is...', 'Please repeat.', 'How do you spell...?', 'Let me check.', 'Is that correct?'] },
        homework: homework('Crie dois cartões de contato fictícios e prepare-se para ditar todos os dados.', ['Duas pessoas no mesmo prédio', 'Um cadastro em uma escola', 'Contatos de uma pequena empresa'], ['Incluí endereço, telefone, e-mail e CEP.', 'Escrevi números por extenso para praticar.', 'Consigo dizer at, dot e pedir repetição.']),
        mission: { title: 'Contact form', task: 'Complete oralmente um cadastro e corrija dois dados que o professor repete incorretamente.', focus: ['números claros', 'at/dot no e-mail', 'confirmação de dados'] }
    }));
}());
