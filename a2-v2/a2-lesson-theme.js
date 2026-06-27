(() => {
    const STORAGE_KEY = 'insr-theme';
    const DARK = 'dark';
    const LIGHT = 'light';

    function getStoredTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (error) {
            return null;
        }
    }

    function getPreferredTheme() {
        const storedTheme = getStoredTheme();
        if (storedTheme === DARK || storedTheme === LIGHT) {
            return storedTheme;
        }

        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? DARK
            : LIGHT;
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (error) {
            // ignore persistence issues
        }
    }

    function getThemeMeta(theme) {
        return theme === DARK
            ? { icon: 'fa-sun', label: 'Tema claro' }
            : { icon: 'fa-moon', label: 'Tema escuro' };
    }

    function syncThemeToggle() {
        const button = document.querySelector('[data-a2-theme-toggle]');
        if (!button) return;

        const currentTheme = document.documentElement.getAttribute('data-theme') || LIGHT;
        const meta = getThemeMeta(currentTheme);
        button.innerHTML = `<i class="fas ${meta.icon}"></i><span>${meta.label}</span>`;
        button.setAttribute('aria-label', meta.label);
        button.setAttribute('title', meta.label);
    }

    function injectThemeToggle() {
        const headerContainer = document.querySelector('header .container');
        const slideCounter = document.getElementById('slide-counter');
        if (!headerContainer || !slideCounter || headerContainer.querySelector('[data-a2-theme-toggle]')) {
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'flex items-center gap-3';

        const themeButton = document.createElement('button');
        themeButton.type = 'button';
        themeButton.className = 'lesson-theme-toggle';
        themeButton.setAttribute('data-a2-theme-toggle', 'true');

        slideCounter.parentNode.insertBefore(wrapper, slideCounter);
        wrapper.appendChild(themeButton);
        wrapper.appendChild(slideCounter);
    }

    function enhanceTables() {
        document.querySelectorAll('table').forEach((table) => {
            const parent = table.parentElement;
            if (!parent) return;

            if (parent.classList.contains('grammar-table')) {
                parent.classList.add('lesson-table-scroll');
                return;
            }

            if (table.closest('.overflow-x-auto, .lesson-table-scroll, .table-responsive')) {
                return;
            }

            const wrapper = document.createElement('div');
            wrapper.className = 'lesson-table-scroll';
            parent.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        });
    }

    const LESSON_TOPICS = [
        'past stories', 'complete past stories', 'comparisons', 'superlatives',
        'articles and quantifiers', 'past continuous', 'interrupted stories', 'past review',
        'future plans', 'future predictions', 'future arrangements', 'future review',
        'permission and ability', 'obligation', 'advice', 'modals review',
        'experiences', 'ever and never', 'present perfect versus past simple', 'been and gone',
        'health problems', 'medical consultations', 'prepositions of place', 'review and directions',
        'movement', 'time expressions', 'directions', 'hotel English',
        'gerunds and infinitives', 'zero and first conditional', 'wishes and hopes', 'final review'
    ];

    const TOPIC_BANKS = {
        past: {
            title: 'Past stories',
            grammar: 'past simple and sequence markers',
            context: 'weekend stories and completed actions',
            answers: ['watched', 'went', 'did not go', 'Did you see', 'after that', 'because I was tired', 'was cooking', 'arrived', 'took', 'had'],
            pt: [
                'Eu assisti a um filme ontem à noite.',
                'Ela não foi ao mercado no sábado.',
                'O que você fez depois da aula?',
                'Nós estávamos conversando quando o telefone tocou.',
                'Depois disso, eu voltei para casa.',
                'Eles compraram comida e prepararam o jantar.',
                'Você viu seus amigos no fim de semana?',
                'Eu estava estudando quando minha mãe chegou.'
            ],
            dialogues: [
                ['Teacher', 'How was your weekend?', 'Student', 'It was busy. I cleaned my room and visited my cousin.'],
                ['Friend', 'Did you go out last night?', 'Student', 'No, I did not. I stayed home because I was tired.'],
                ['Teacher', 'What were you doing at eight?', 'Student', 'I was watching a movie when my brother called.'],
                ['Friend', 'What happened after lunch?', 'Student', 'We went to the park and took some photos.']
            ]
        },
        compare: {
            title: 'Comparisons',
            grammar: 'comparatives, superlatives and opinion phrases',
            context: 'places, choices and preferences',
            answers: ['bigger than', 'the most interesting', 'as comfortable as', 'too expensive', 'not old enough', 'better than', 'the worst', 'more practical', 'less crowded', 'the best option'],
            pt: [
                'Minha cidade é mais tranquila do que São Paulo.',
                'Este restaurante é o melhor do bairro.',
                'O ônibus não é tão rápido quanto o metrô.',
                'Esse curso é prático o suficiente para mim.',
                'O hotel é caro demais para uma semana.',
                'Qual opção é mais confortável?',
                'Esta rua é menos movimentada à noite.',
                'Eu acho que a segunda opção é melhor.'
            ],
            dialogues: [
                ['Teacher', 'Which city is better for you?', 'Student', 'Curitiba is quieter than São Paulo.'],
                ['Friend', 'Is this hotel too expensive?', 'Student', 'Yes, but it is more comfortable than the other one.'],
                ['Teacher', 'What is the best option?', 'Student', 'The bus is the cheapest option today.'],
                ['Friend', 'Do you prefer this neighborhood?', 'Student', 'Yes. It is less crowded and more practical.']
            ]
        },
        future: {
            title: 'Future plans',
            grammar: 'going to, will and present continuous for future',
            context: 'plans, predictions and arrangements',
            answers: ['am going to study', 'will help', 'are meeting', 'is going to rain', 'will probably arrive', 'am not working', 'Are you going to travel', 'will call', 'is having', 'are not coming'],
            pt: [
                'Eu vou estudar inglês amanhã.',
                'Ela vai ligar para você depois da reunião.',
                'Nós vamos nos encontrar às seis.',
                'Acho que vai chover hoje à noite.',
                'Você vai viajar no próximo mês?',
                'Eu não vou trabalhar no sábado.',
                'Eles vão fazer uma apresentação amanhã.',
                'Eu vou te ajudar com esse problema.'
            ],
            dialogues: [
                ['Friend', 'What are you doing tonight?', 'Student', 'I am meeting my sister for dinner.'],
                ['Teacher', 'Do you have plans for Saturday?', 'Student', 'Yes. I am going to study and then relax.'],
                ['Friend', 'The sky is very dark.', 'Student', 'I think it will rain soon.'],
                ['Teacher', 'Can you send the homework later?', 'Student', 'Sure. I will send it after class.']
            ]
        },
        modals: {
            title: 'Modals in real life',
            grammar: 'can, could, must, have to, need to and should',
            context: 'permission, rules and advice',
            answers: ['can', 'could', 'must', 'have to', 'need to', 'should', 'should not', 'do not have to', 'Can I', 'Could you'],
            pt: [
                'Você pode abrir a janela?',
                'Eu preciso terminar isso hoje.',
                'Nós temos que chegar cedo.',
                'Você deveria descansar um pouco.',
                'Ela não deve dirigir cansada.',
                'Posso usar seu carregador?',
                'Eles não precisam pagar agora.',
                'Você poderia repetir, por favor?'
            ],
            dialogues: [
                ['Student', 'Can I leave five minutes early?', 'Teacher', 'Yes, but you have to finish the activity first.'],
                ['Friend', 'I have a headache.', 'Student', 'You should drink water and rest.'],
                ['Receptionist', 'You must show your ID.', 'Guest', 'Of course. Here it is.'],
                ['Student', 'Could you explain that again?', 'Teacher', 'Sure. You need to use the base verb after should.']
            ]
        },
        perfect: {
            title: 'Experiences',
            grammar: 'present perfect with ever, never, already and yet',
            context: 'life experiences and recent results',
            answers: ['have visited', 'has never tried', 'Have you ever', 'already finished', 'yet', 'went', 'have been', 'has gone', 'since', 'for'],
            pt: [
                'Eu já visitei aquela cidade.',
                'Você já experimentou comida japonesa?',
                'Ela nunca trabalhou em um hotel.',
                'Nós ainda não terminamos o projeto.',
                'Ele foi ao banco ontem.',
                'Eu moro aqui há três anos.',
                'Ela foi para casa e ainda não voltou.',
                'Você já esteve em outro país?'
            ],
            dialogues: [
                ['Teacher', 'Have you ever traveled alone?', 'Student', 'No, I have never traveled alone.'],
                ['Friend', 'Did you finish the report?', 'Student', 'Yes, I have already finished it.'],
                ['Teacher', 'Has she gone home?', 'Student', 'Yes. She left twenty minutes ago.'],
                ['Friend', 'How long have you studied English?', 'Student', 'I have studied English for one year.']
            ]
        },
        practical: {
            title: 'Practical English',
            grammar: 'prepositions, requests and clear instructions',
            context: 'health, directions, hotels and daily situations',
            answers: ['next to', 'across from', 'turn left', 'go straight', 'at seven', 'on Monday', 'in May', 'under my name', 'is not working', 'Could I have'],
            pt: [
                'A farmácia fica ao lado do banco.',
                'Vire à esquerda depois da ponte.',
                'Siga em frente por dois quarteirões.',
                'Tenho uma reserva no meu nome.',
                'O chuveiro não está funcionando.',
                'Você poderia me trazer outra toalha?',
                'Minha consulta é às oito da manhã.',
                'A estação fica em frente ao hotel.'
            ],
            dialogues: [
                ['Tourist', 'Excuse me, where is the pharmacy?', 'Local', 'It is next to the bank, across from the hotel.'],
                ['Guest', 'The air conditioner is not working.', 'Receptionist', 'I am sorry. I will send maintenance now.'],
                ['Patient', 'I have had a headache since yesterday.', 'Doctor', 'You should rest and drink more water.'],
                ['Tourist', 'How do I get to the station?', 'Local', 'Go straight and turn left at the lights.']
            ]
        },
        conditionals: {
            title: 'Conditions and choices',
            grammar: 'verb patterns, zero conditional, first conditional and wishes',
            context: 'habits, plans, hopes and consequences',
            answers: ['enjoy studying', 'decided to call', 'If it rains', 'will stay', 'unless', 'would travel', 'If I were', 'want to improve', 'need practicing', 'hope to get'],
            pt: [
                'Eu gosto de estudar de manhã.',
                'Ela decidiu ligar para o cliente.',
                'Se chover, eu vou ficar em casa.',
                'Você vai melhorar se praticar todo dia.',
                'A menos que você saia cedo, vai se atrasar.',
                'Se eu tivesse mais tempo, viajaria mais.',
                'Eu gostaria de falar com mais confiança.',
                'Nós esperamos conseguir uma resposta amanhã.'
            ],
            dialogues: [
                ['Teacher', 'What do you enjoy doing after work?', 'Student', 'I enjoy watching series and practicing English.'],
                ['Friend', 'What will you do if it rains?', 'Student', 'If it rains, I will stay home.'],
                ['Teacher', 'What would you do with more time?', 'Student', 'I would travel and study more.'],
                ['Friend', 'Do you want to improve pronunciation?', 'Student', 'Yes. I hope to speak more naturally.']
            ]
        }
    };

    function getLessonNumber() {
        const match = window.location.pathname.match(/licao-(\d+)/i)
            || document.title.match(/(?:Lesson|Lição)\s*(\d+)/i);
        return match ? Number(match[1]) : 1;
    }

    function getBank(lessonNumber) {
        if (lessonNumber <= 2 || [6, 7, 8].includes(lessonNumber)) return TOPIC_BANKS.past;
        if (lessonNumber <= 5) return TOPIC_BANKS.compare;
        if (lessonNumber <= 12) return TOPIC_BANKS.future;
        if (lessonNumber <= 16) return TOPIC_BANKS.modals;
        if (lessonNumber <= 20) return TOPIC_BANKS.perfect;
        if (lessonNumber <= 28) return TOPIC_BANKS.practical;
        return TOPIC_BANKS.conditionals;
    }

    function createSlide(title, html) {
        const slide = document.createElement('div');
        slide.className = 'slide a2-generated-slide';
        slide.dataset.title = title;
        slide.innerHTML = html;
        return slide;
    }

    function insertBeforeClosingSlides(slide) {
        const main = document.querySelector('main.container') || document.querySelector('main');
        if (!main) return;

        const anchors = Array.from(main.querySelectorAll('.slide')).filter((item) => {
            const title = (item.dataset.title || '').toLowerCase();
            return title.includes('homework') || title.includes('lesson complete');
        });
        main.insertBefore(slide, anchors[0] || null);
    }

    function removeRepetitiveBuilders() {
        document.querySelectorAll('[data-choice-builder]').forEach((builder) => {
            const slide = builder.closest('.slide');
            if (slide) slide.remove();
        });
    }

    function makeExamples(bank) {
        const patterns = {
            'Past stories': [
                'I watched a movie last night.',
                'She went to the market on Saturday.',
                'I did not go out because I was tired.',
                'Did you see your friends yesterday?',
                'After that, we had dinner at home.',
                'I went home because I was tired.',
                'I was cooking when my brother arrived.',
                'My friends arrived late.',
                'We took some photos at the park.',
                'I had a great weekend.'
            ],
            'Comparisons': [
                'São Paulo is bigger than my city.',
                'This museum is the most interesting place downtown.',
                'The bus is not as comfortable as the subway.',
                'That hotel is too expensive for us.',
                'This neighborhood is not old enough to have many historic buildings.',
                'The train is better than the bus today.',
                'Monday morning is the worst time to drive.',
                'Online classes are more practical for me.',
                'This street is less crowded at night.',
                'Walking is the best option for short distances.'
            ],
            'Future plans': [
                'I am going to study tonight.',
                'I will help you after class.',
                'We are meeting at seven.',
                'It is going to rain later.',
                'She will probably arrive late.',
                'I am not working this weekend.',
                'Are you going to travel next month?',
                'I will call you tomorrow.',
                'She is having lunch with her parents.',
                'They are not coming to the party.'
            ],
            'Modals in real life': [
                'Can I open the window?',
                'Could you repeat that, please?',
                'You must show your ID.',
                'We have to arrive early.',
                'I need to finish this today.',
                'You should rest a little.',
                'You should not drive tired.',
                'You do not have to pay now.',
                'Can I use your charger?',
                'Could you help me with this?'
            ],
            'Experiences': [
                'I have visited that city before.',
                'She has never tried Japanese food.',
                'Have you ever traveled alone?',
                'I have already finished the report.',
                'I have not finished it yet.',
                'We went to the bank yesterday.',
                'I have been to Canada twice.',
                'She has gone home.',
                'I have lived here since 2020.',
                'I have studied English for one year.'
            ],
            'Practical English': [
                'The pharmacy is next to the bank.',
                'The station is across from the hotel.',
                'Turn left after the bridge.',
                'Go straight for two blocks.',
                'My appointment is at seven.',
                'I have class on Monday.',
                'My vacation is in May.',
                'I have a reservation under my name.',
                'The shower is not working.',
                'Could I have another towel?'
            ],
            'Conditions and choices': [
                'I enjoy studying in the morning.',
                'She decided to call the client.',
                'If it rains, I will stay home.',
                'I will stay here unless you need help.',
                'Unless we leave early, we will be late.',
                'I would travel more if I had time.',
                'If I were you, I would practice every day.',
                'I want to improve my pronunciation.',
                'This skill needs practicing every week.',
                'I hope to get an answer tomorrow.'
            ]
        };
        const sentences = patterns[bank.title] || patterns['Practical English'];
        return bank.answers.map((answer, index) => {
            return {
                answer,
                sentence: sentences[index % sentences.length],
                pt: bank.pt[index % bank.pt.length],
                context: bank.context
            };
        });
    }

    function wordChips(sentence) {
        return sentence
            .replace(/[?.]/g, '')
            .split(/\s+/)
            .filter(Boolean)
            .reverse()
            .map((word) => `<button type="button" class="word-chip" data-word-chip="${word}">${word}</button>`)
            .join('');
    }

    function blankWord(word) {
        return String(word).replace(/[A-Za-zÀ-ÿ]/g, '_');
    }

    function renderWrittenCard(index, label, prompt, support = '') {
        return `
            <div class="activity-card generated-task-card">
                <div class="flex items-center justify-between gap-3 mb-3">
                    <span class="generated-question-number">${index + 1}</span>
                    <span class="generated-tag">${label}</span>
                </div>
                <p class="font-bold text-slate-900">${prompt}</p>
                ${support ? `<p class="text-sm text-slate-500 mt-2">${support}</p>` : ''}
                <textarea rows="2" class="mt-3" placeholder="Write your answer..."></textarea>
            </div>
        `;
    }

    const ACTIVITY_BUILDERS = [
        {
            title: 'Unscramble Sprint',
            icon: 'fa-shuffle',
            instruction: 'Coloque as palavras na ordem correta para formar uma frase natural. Depois leia a frase em voz alta.',
            render: (bank) => makeExamples(bank).map((item, index) => `
                <div class="activity-card generated-task-card">
                    <div class="flex items-center justify-between gap-3 mb-3">
                        <span class="generated-question-number">${index + 1}</span>
                        <span class="generated-tag">desembaralhar</span>
                    </div>
                    <div class="word-chip-row">${wordChips(item.sentence)}</div>
                    <input class="mt-3" data-unscramble-answer placeholder="Click the words or type the sentence...">
                    <p class="text-sm text-slate-500 mt-2">Dica: ${item.pt}</p>
                </div>
            `).join('')
        },
        {
            title: 'Error Clinic',
            icon: 'fa-stethoscope',
            instruction: 'Leia cada frase, encontre o problema e reescreva a versão correta. Depois diga a frase em voz alta.',
            render: (bank) => makeExamples(bank).map((item, index) => {
                const wrong = index % 2
                    ? item.sentence.replace(/\b(is|are|am|was|were)\b/i, '').replace(/\s+/g, ' ')
                    : item.sentence.replace(/\b(I|She|He|We|They|You)\b/, '$1 usually').replace(/\s+/g, ' ');
                return renderWrittenCard(index, 'corrigir', wrong, `Rewrite the correct version. Target: ${item.answer}`);
            }).join('')
        },
        {
            title: 'Match the Halves',
            icon: 'fa-link',
            instruction: 'Ligue cada começo ao final correto. Depois escolha três frases e fale uma versão sobre sua vida.',
            render: (bank) => {
                const items = makeExamples(bank);
                const left = items.map((item, index) => {
                    const start = item.sentence.split(item.answer)[0] || 'I need to use ';
                    return `<button type="button" class="match-option" data-match-side="left" data-match-id="${index}"><strong>${index + 1}.</strong> ${start}</button>`;
                }).join('');
                // Build right side entries and shuffle their order so matching isn't obvious
                let rightItems = items.map((item, index) => {
                    const ending = `${item.answer}${item.sentence.split(item.answer)[1] || ''}`;
                    return { id: index, text: ending };
                });
                for (let i = rightItems.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [rightItems[i], rightItems[j]] = [rightItems[j], rightItems[i]];
                }
                const right = rightItems.map((it) => `<button type="button" class="match-option" data-match-side="right" data-match-id="${it.id}">${it.text}</button>`).join('');
                return `
                    <div class="activity-card md:col-span-2" data-matching-activity>
                        <div class="matching-board">
                            <div class="space-y-3">${left}</div>
                            <div class="space-y-3">${right}</div>
                        </div>
                        <p class="matching-feedback mt-4">Clique em um começo e depois no final correspondente.</p>
                        <textarea rows="4" class="mt-4" placeholder="Depois de ligar os pares, crie 3 exemplos pessoais."></textarea>
                    </div>
                `;
            }
        },
        
        
        {
            title: 'Choice Quest',
            icon: 'fa-circle-check',
            instruction: 'Escolha a melhor opção para completar a ideia. Em seguida, explique oralmente por que ela funciona.',
            render: (bank) => makeExamples(bank).map((item, index) => `
                <div class="activity-card generated-task-card">
                    <div class="flex items-center justify-between gap-3 mb-3">
                        <span class="generated-question-number">${index + 1}</span>
                        <span class="generated-tag">quiz</span>
                    </div>
                    <p class="font-bold text-slate-900">${item.sentence.replace(item.answer, '_____')}</p>
                    <div class="choice-mini-grid mt-3">
                        <button type="button">${item.answer}</button>
                        <button type="button">${bank.answers[(index + 3) % bank.answers.length]}</button>
                        <button type="button">${bank.answers[(index + 6) % bank.answers.length]}</button>
                    </div>
                </div>
            `).join('')
        },
        {
            title: 'Sequence Builder',
            icon: 'fa-arrow-down-1-9',
            instruction: 'Organize as ideias em uma sequência lógica. Depois conte a sequência sem olhar para a tela.',
            render: (bank) => makeExamples(bank).map((item, index) => `
                <div class="activity-card generated-task-card">
                    <div class="flex items-center justify-between gap-3 mb-3">
                        <span class="generated-question-number">${index + 1}</span>
                        <span class="generated-tag">sequência</span>
                    </div>
                    <ol class="space-y-2">
                        <li>C. Add a reason or detail.</li>
                        <li>A. Start with: ${item.answer}</li>
                        <li>B. Connect it to: ${item.context}</li>
                    </ol>
                    <input class="mt-3" placeholder="Correct order: A-B-C...">
                </div>
            `).join('')
        },
        {
            title: 'Translation Relay',
            icon: 'fa-language',
            instruction: 'Traduza primeiro oralmente, depois escreva. A segunda rodada deve sair mais rápida e natural.',
            render: (bank) => bank.pt.concat(bank.pt.slice(0, 2)).map((phrase, index) => renderWrittenCard(index, 'traduzir', phrase, `Translate to English using ${bank.grammar}.`)).join('')
        },
        {
            title: 'Role-play Cards',
            icon: 'fa-comments',
            instruction: 'Faça uma mini-cena. Um aluno/professor lê a situação; o outro responde como personagem.',
            render: (bank) => makeExamples(bank).map((item, index) => renderWrittenCard(index, 'role-play', `Situation: ${item.pt}`, `Answer naturally and include "${item.answer}".`)).join('')
        }
    ];

    function // buildChallengeSlide(lessonNumber, bank) {
        const topic = LESSON_TOPICS[lessonNumber - 1] || bank.title.toLowerCase();
        const builder = ACTIVITY_BUILDERS[(lessonNumber - 1) % ACTIVITY_BUILDERS.length];
        const cards = builder.render(bank);

        return createSlide('Challenge Lab', `
            <div class="section-card p-8">
                <div class="text-center max-w-3xl mx-auto mb-8">
                    <p class="lesson-panel-title mb-2">Atividade ${lessonNumber} - 10 tarefas</p>
                    <h2 class="text-4xl font-black text-violet-700"><i class="fas ${builder.icon} mr-2"></i>${builder.title}: ${bank.title}</h2>
                    <p class="text-lg text-slate-600 mt-3">${builder.instruction}</p>
                    <p class="text-sm text-slate-500 mt-2">Tema da lição: ${topic}. Foco: ${bank.grammar}.</p>
                </div>
                <div class="generated-activity-grid md:grid-cols-2 text-lg">${cards}</div>
            </div>
        `);
    }

    function // buildDialogSlide(bank) {
        const extensions = {
            'Past stories': [
                ['Teacher', 'Did you enjoy it?', 'Student', 'Yes, I did. It was simple, but I had a good time.'],
                ['Friend', 'Were you tired the next day?', 'Student', 'A little. I woke up late and had breakfast at home.'],
                ['Teacher', 'What happened after the call?', 'Student', 'I paused the movie and talked to him for ten minutes.'],
                ['Friend', 'Did you take many photos?', 'Student', 'Yes, we took some photos near the lake.']
            ],
            'Comparisons': [
                ['Teacher', 'Is it also cheaper?', 'Student', 'Not really. It is quieter, but it is a little more expensive.'],
                ['Friend', 'Do you want to book it?', 'Student', 'Maybe. I want to compare one more hotel first.'],
                ['Teacher', 'Why is the bus better today?', 'Student', 'Because it is cheaper and the traffic is not too bad.'],
                ['Friend', 'Would you live there?', 'Student', 'Yes, but only if it were closer to work.']
            ],
            'Future plans': [
                ['Friend', 'What time are you meeting her?', 'Student', 'At seven. We are going to try a new restaurant.'],
                ['Teacher', 'Are you going to study alone?', 'Student', 'No. I am going to study with a friend online.'],
                ['Friend', 'Do you have an umbrella?', 'Student', 'Yes, I do. I will take it with me.'],
                ['Teacher', 'Can you send it before dinner?', 'Student', 'Yes. I will send it around six.']
            ],
            'Modals in real life': [
                ['Student', 'Do I need to show it today?', 'Teacher', 'Yes, you have to show it before you leave.'],
                ['Friend', 'Should I take medicine?', 'Student', 'Maybe, but you should talk to a doctor first.'],
                ['Receptionist', 'Do you have your passport?', 'Guest', 'Yes, I do. It is in my bag.'],
                ['Student', 'Can I write one more example?', 'Teacher', 'Of course. That will help you remember it.']
            ],
            'Experiences': [
                ['Teacher', 'Would you like to try it?', 'Student', 'Yes, I would. It sounds interesting.'],
                ['Friend', 'Can I read it?', 'Student', 'Sure. I can send it to you now.'],
                ['Teacher', 'When did she leave?', 'Student', 'She left after lunch.'],
                ['Friend', 'Do you enjoy studying?', 'Student', 'Yes. I enjoy it more when I practice speaking.']
            ],
            'Practical English': [
                ['Tourist', 'Is it far from here?', 'Local', 'No, it is about five minutes on foot.'],
                ['Guest', 'Can I change rooms?', 'Receptionist', 'Yes. I can check another room for you.'],
                ['Patient', 'Should I take anything?', 'Doctor', 'Take this medicine after meals and rest today.'],
                ['Tourist', 'Do I cross the street?', 'Local', 'Yes. Cross the street and the station is on your right.']
            ],
            'Conditions and choices': [
                ['Teacher', 'Do you do that every day?', 'Student', 'Not every day, but I try to do it three times a week.'],
                ['Friend', 'And if it does not rain?', 'Student', 'Then I will go for a walk after lunch.'],
                ['Teacher', 'Where would you travel first?', 'Student', 'I would travel to Canada because I want to practice English.'],
                ['Friend', 'What is your next step?', 'Student', 'I want to practice short conversations every day.']
            ]
        };
        const extraLines = extensions[bank.title] || extensions['Practical English'];
        const cards = bank.dialogues.map((dialogue, index) => `
            <div class="activity-card">
                <p class="lesson-panel-title mb-3">Dialog ${index + 1}</p>
                <div class="space-y-3">
                    <div class="dialogue-line"><strong class="text-violet-700">${dialogue[0]}:</strong><p>${dialogue[1]}</p></div>
                    <div class="dialogue-line"><strong class="text-orange-600">${dialogue[2]}:</strong><p>${dialogue[3]}</p></div>
                    <div class="dialogue-line"><strong class="text-violet-700">${extraLines[index][0]}:</strong><p>${extraLines[index][1]}</p></div>
                    <div class="dialogue-line"><strong class="text-orange-600">${extraLines[index][2]}:</strong><p>${extraLines[index][3]}</p></div>
                </div>
            </div>
        `).join('');
        const speakText = bank.dialogues.map((item, index) => `${item[0]}: ${item[1]} ${item[2]}: ${item[3]} ${extraLines[index][0]}: ${extraLines[index][1]} ${extraLines[index][2]}: ${extraLines[index][3]}`).join(' ');

        return createSlide('Dialog Samples', `
            <div class="section-card p-8">
                <div class="flex flex-wrap justify-between items-center gap-4 mb-6">
                    <div>
                        <p class="lesson-panel-title mb-2">Dialog samples</p>
                        <h2 class="text-4xl font-black text-violet-700">4 dialog samples: ${bank.context}</h2>
                    </div>
                    <button type="button" class="primary-action-btn" data-generated-speak="${speakText}">
                        <i class="fas fa-volume-up mr-2"></i> Ouvir diálogos
                    </button>
                </div>
                <div class="grid md:grid-cols-2 gap-4 text-lg">${cards}</div>
            </div>
        `);
    }

    function getOralPhrases(lessonNumber, bank) {
        // Custom overrides for specific lessons
        if (lessonNumber === 2) {
            return [
                'Primeiro, eu fiz o check-in no hotel.',
                'Depois, nós caminhamos pela praia.',
                'Almoçamos em um restaurante pequeno.',
                'Tirei muitas fotos durante a tarde.',
                'Comprei lembrancinhas para a família.',
                'À noite, assistimos ao pôr do sol.',
                'No dia seguinte, visitei um museu.',
                'Finalmente, pegamos o avião de volta para casa.'
            ];
        }
        return bank.pt;
    }

    function // buildOralTranslationSlide(bank, lessonNumber) {
        const phrasesList = getOralPhrases(lessonNumber, bank);
        const phrases = phrasesList.map((phrase, index) => `
            <div class="activity-card oral-translation-card">
                <span class="generated-question-number">${index + 1}</span>
                <span>${phrase}</span>
            </div>
        `).join('');

        return createSlide('Oral Translation', `
            <div class="section-card p-8">
                <div class="text-center max-w-3xl mx-auto mb-8">
                    <p class="lesson-panel-title mb-2">Tradução oral - 8 frases</p>
                    <h2 class="text-4xl font-black text-violet-700">Português para inglês</h2>
                    <p class="text-lg text-slate-600 mt-3">O professor lê em português; o aluno fala a tradução em inglês. Depois, o aluno repete com ritmo natural.</p>
                </div>
                <div class="grid md:grid-cols-2 gap-4 text-lg">${phrases}</div>
            </div>
        `);
    }

    function normalizeActivityQuestionCounts(bank) {
        const activityTitles = /practice|activity|quiz|translation|review|correct|order|fix/i;

        document.querySelectorAll('.slide').forEach((slide) => {
            if (slide.classList.contains('a2-generated-slide')) return;
            if (!activityTitles.test(slide.dataset.title || '')) return;
            if (/music|song|lyrics/i.test(slide.dataset.title || '')) return;
            if (slide.dataset.a2QuestionNormalized === 'true') return;

            const questionCount = slide.querySelectorAll('input[data-answer], [data-quiz-item], .activity-card').length;
            if (questionCount >= 10) return;

            const host = slide.querySelector('.section-card, .bg-white, .activity-lab, [id^="practice"], .space-y-5, .space-y-6') || slide;
            const supplement = document.createElement('div');
            supplement.className = 'a2-question-supplement grid md:grid-cols-2 gap-4 mt-6';

            const needed = 10 - questionCount;
            const supplementPrompts = [
                ['check', `Choose the correct idea and explain why "${bank.answers[0]}" fits.`],
                ['speak', `Say a complete answer using "${bank.answers[1]}".`],
                ['fix', `Correct a mistake with "${bank.answers[2]}".`],
                ['ask', `Create a question using "${bank.answers[3]}".`],
                ['reply', `Answer a real-life situation about ${bank.context}.`],
                ['expand', `Add a reason, a time expression or a contrast.`],
                ['translate', `Translate one sentence from Portuguese to English.`],
                ['personalize', `Make the sentence true for your life.`],
                ['compare', `Compare two possible answers and choose the better one.`],
                ['repeat', `Repeat your best answer aloud with natural rhythm.`]
            ];
            for (let index = 0; index < needed; index += 1) {
                const [label, prompt] = supplementPrompts[index % supplementPrompts.length];
                const card = document.createElement('div');
                card.className = 'activity-card generated-question-card';
                card.innerHTML = `
                    <div class="generated-question-number">${questionCount + index + 1}</div>
                    <div>
                        <span class="generated-tag">${label}</span>
                        <p class="font-bold text-slate-900 mt-3">${prompt}</p>
                        <p class="text-sm text-slate-500 mt-2">Focus: ${bank.grammar}</p>
                    </div>
                `;
                supplement.appendChild(card);
            }

            host.appendChild(supplement);
            slide.dataset.a2QuestionNormalized = 'true';
        });
    }

    function enhanceLessonContent() {
        removeRepetitiveBuilders();

        const lessonNumber = getLessonNumber();
        const bank = getBank(lessonNumber);

        if (!document.querySelector('[data-title="Challenge Lab"]')) {
            insertBeforeClosingSlides(// buildChallengeSlide(lessonNumber, bank));
        }
        if (!document.querySelector('[data-title="Dialog Samples"]')) {
            insertBeforeClosingSlides(// buildDialogSlide(bank));
        }
        if (!document.querySelector('.a2-generated-slide[data-title="Oral Translation"]')) {
            insertBeforeClosingSlides(// buildOralTranslationSlide(bank, lessonNumber));
        }

        document.addEventListener('DOMContentLoaded', () => {
            normalizeActivityQuestionCounts(bank);
        });
    }

    document.body.classList.add('a2-lesson-page');
    applyTheme(getPreferredTheme());
    enhanceLessonContent();
    enhanceTables();

    document.addEventListener('click', (event) => {
        const themeToggle = event.target.closest('[data-a2-theme-toggle]');
        if (themeToggle) {
            const currentTheme = document.documentElement.getAttribute('data-theme') || LIGHT;
            applyTheme(currentTheme === DARK ? LIGHT : DARK);
            syncThemeToggle();
            return;
        }

        const revealButton = event.target.closest('[data-model-answer]');
        if (revealButton) {
            const answer = revealButton.parentElement?.querySelector('.generated-model-answer');
            answer?.classList.toggle('hidden');
            return;
        }

        const generatedSpeak = event.target.closest('[data-generated-speak]');
        if (generatedSpeak) {
            window.A2V2Template?.speak(generatedSpeak.dataset.generatedSpeak, 'en-US');
            return;
        }

        const wordChip = event.target.closest('[data-word-chip]');
        if (wordChip) {
            const card = wordChip.closest('.generated-task-card');
            const input = card?.querySelector('[data-unscramble-answer]');
            if (!input || wordChip.disabled) return;

            input.value = `${input.value}${input.value ? ' ' : ''}${wordChip.dataset.wordChip}`;
            wordChip.disabled = true;
            wordChip.classList.add('is-used');
            input.focus();
            return;
        }

        const matchOption = event.target.closest('[data-match-side]');
        if (matchOption) {
            const activity = matchOption.closest('[data-matching-activity]');
            const feedback = activity?.querySelector('.matching-feedback');
            if (!activity || matchOption.classList.contains('is-correct')) return;

            const side = matchOption.dataset.matchSide;
            const oppositeSide = side === 'left' ? 'right' : 'left';
            const selected = activity.querySelector(`.match-option.is-selected[data-match-side="${oppositeSide}"]`);

            activity.querySelectorAll(`.match-option[data-match-side="${side}"]`).forEach((option) => {
                option.classList.remove('is-selected');
            });
            matchOption.classList.add('is-selected');

            if (!selected) {
                if (feedback) feedback.textContent = side === 'left'
                    ? 'Agora escolha o final correspondente.'
                    : 'Agora escolha o começo correspondente.';
                return;
            }

            const isCorrect = selected.dataset.matchId === matchOption.dataset.matchId;
            selected.classList.remove('is-selected', 'is-wrong');
            matchOption.classList.remove('is-selected', 'is-wrong');

            if (isCorrect) {
                selected.classList.add('is-correct');
                matchOption.classList.add('is-correct');
                selected.disabled = true;
                matchOption.disabled = true;
                if (feedback) feedback.textContent = 'Certo. Esse par está completo.';
            } else {
                selected.classList.add('is-wrong');
                matchOption.classList.add('is-wrong');
                if (feedback) feedback.textContent = 'Ainda não. Tente outro par.';
                window.setTimeout(() => {
                    selected.classList.remove('is-wrong');
                    matchOption.classList.remove('is-wrong');
                }, 900);
            }
            return;
        }

        const flashcard = event.target.closest('.flashcard, .flip-card');
        if (!flashcard) return;

        if (event.target.closest('button, a, input, textarea, select, label')) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();
        flashcard.classList.toggle('flipped');
        flashcard.dispatchEvent(new CustomEvent('flashcard:toggled', {
            bubbles: true,
            detail: { flipped: flashcard.classList.contains('flipped') }
        }));
    }, true);

    document.addEventListener('input', (event) => {
        const input = event.target.closest('[data-unscramble-answer]');
        if (!input || input.value.trim()) return;

        input.closest('.generated-task-card')?.querySelectorAll('[data-word-chip]').forEach((chip) => {
            chip.disabled = false;
            chip.classList.remove('is-used');
        });
    });

    const slides = Array.from(document.querySelectorAll('.slide'));
    const headerContainer = document.querySelector('header .container');
    const headerTitle = headerContainer?.querySelector('h1');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn') || document.getElementById('finish-lesson-btn');

    const addClasses = (elements, className) => {
        elements.forEach((element) => element.classList.add(...className.split(' ')));
    };

    const scrollToTopSoon = () => {
        window.requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    const topLevelCards = new Set();

    slides.forEach((slide, index) => {
        slide.classList.add('a2-slide-shell');

        const directChildren = Array.from(slide.children);
        directChildren.forEach((child) => {
            if (child.matches('div, section, article')) {
                const card = child.matches('[class*="bg-white"], .music-card, .grammar-box, table')
                    ? child
                    : child.querySelector(':scope > [class*="bg-white"], :scope > .music-card, :scope > .grammar-box, :scope > table');
                if (card) topLevelCards.add(card);
            }
        });

        const whiteCards = Array.from(slide.querySelectorAll('[class*="bg-white"]'));
        whiteCards.forEach((card) => {
            if (!card.closest('.music-card') && !card.classList.contains('lesson-hero')) {
                card.classList.add('section-card');
            }
        });

        addClasses(Array.from(slide.querySelectorAll('[class*="bg-gray-50"], [class*="bg-slate-50"]')), 'activity-card');
        addClasses(Array.from(slide.querySelectorAll('[class*="bg-orange-50"], [class*="bg-amber-50"]')), 'callout-warning');
        addClasses(Array.from(slide.querySelectorAll('[class*="bg-indigo-50"], [class*="bg-violet-50"], [class*="bg-blue-50"]')), 'callout-note');
        addClasses(Array.from(slide.querySelectorAll('[class*="bg-green-100"], [class*="bg-green-50"]')), 'callout-success');
        addClasses(Array.from(slide.querySelectorAll('.music-card')), 'section-card');
        addClasses(Array.from(slide.querySelectorAll('table')), 'grammar-table');

        const headings = Array.from(slide.querySelectorAll('h3, h4'));
        headings.forEach((heading) => {
            const parent = heading.parentElement;
            if (!parent) return;
            if (parent.matches('.section-card, .lesson-panel, .activity-card, .callout-note, .callout-success, .callout-warning, .grammar-box')) {
                heading.classList.add('lesson-panel-title');
            }
        });

        if (index === 0) {
            const introContainer = slide.querySelector('.text-center, .max-w-4xl, .max-w-5xl, .max-w-6xl');
            const alreadyStructured = slide.querySelector('.lesson-hero') || introContainer?.classList.contains('grid');
            if (introContainer && !alreadyStructured) {
                introContainer.classList.add('lesson-hero', 'rounded-[2rem]', 'p-8', 'md:p-10');

                const heroGrid = document.createElement('div');
                heroGrid.className = 'grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start';

                const copy = document.createElement('div');
                copy.className = 'a2-hero-copy';

                const aside = document.createElement('div');
                aside.className = 'a2-hero-aside';

                Array.from(introContainer.children).forEach((child) => {
                    if (child.matches('[class*="bg-white"], [class*="bg-green-"], [class*="bg-red-"], [class*="bg-orange-"], [class*="bg-amber-"], [class*="bg-indigo-"], [class*="bg-blue-"]')) {
                        aside.appendChild(child);
                    } else {
                        copy.appendChild(child);
                    }
                });

                if (!copy.children.length) {
                    Array.from(introContainer.childNodes).forEach((node) => copy.appendChild(node));
                } else {
                    introContainer.append(copy, aside);
                    heroGrid.append(copy, aside);
                    introContainer.appendChild(heroGrid);
                }

                if (!introContainer.contains(heroGrid)) {
                    introContainer.innerHTML = '';
                    heroGrid.append(copy, aside);
                    introContainer.appendChild(heroGrid);
                }

                const mainHeading = copy.querySelector('h2');
                const bodyText = copy.querySelector('p');
                if (mainHeading && !copy.querySelector('.lesson-chip')) {
                    const chipRow = document.createElement('div');
                    chipRow.className = 'flex flex-wrap gap-3 mt-6';
                    const chips = [
                        { icon: 'fa-compass', text: 'A2 em contexto' },
                        { icon: 'fa-comments', text: 'Foco em comunicação' },
                        { icon: 'fa-layer-group', text: 'Mais estrutura' }
                    ];
                    chips.forEach(({ icon, text }) => {
                        const chip = document.createElement('div');
                        chip.className = 'lesson-chip';
                        chip.innerHTML = `<i class="fas ${icon} text-violet-600"></i> ${text}`;
                        chipRow.appendChild(chip);
                    });
                    if (bodyText) {
                        bodyText.insertAdjacentElement('afterend', chipRow);
                    } else {
                        copy.appendChild(chipRow);
                    }
                }
            }
        }

        const isCompleteSlide = (slide.dataset.title || '').trim().toLowerCase() === 'lesson complete';
        if (isCompleteSlide) {
            const completeCard = slide.firstElementChild;
            if (completeCard) {
                completeCard.classList.add('lesson-hero', 'rounded-[2rem]', 'p-10', 'lesson-complete-card');
            }
        }
    });

    topLevelCards.forEach((card) => {
        if (!card.classList.contains('lesson-hero')) {
            card.classList.add('section-card');
        }
    });

    const getSlideTitle = (slide, index) => {
        const explicitTitle = slide.dataset.title?.trim();
        if (explicitTitle) return explicitTitle;

        const heading = slide.querySelector('h2, h3');
        const headingText = heading?.textContent?.trim();
        return headingText || `Step ${index + 1}`;
    };

    if (slides.length && headerContainer && headerTitle) {
        let slideLabel = document.getElementById('slide-title-header');
        let slideCounter = document.getElementById('slide-counter');

        if (!slideLabel) {
            slideLabel = document.createElement('p');
            slideLabel.id = 'slide-title-header';
            slideLabel.className = 'text-xs text-slate-400 font-medium';
            headerTitle.insertAdjacentElement('afterend', slideLabel);
        }

        if (!slideCounter) {
            slideCounter = document.createElement('div');
            slideCounter.id = 'slide-counter';
            slideCounter.className = 'text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full';

            const rightSlot = headerContainer.lastElementChild;
            if (rightSlot && rightSlot !== headerTitle.parentElement) {
                rightSlot.innerHTML = '';
                rightSlot.className = slideCounter.className;
                rightSlot.id = 'slide-counter';
                slideCounter = rightSlot;
            } else {
                headerContainer.appendChild(slideCounter);
            }
        }

        slides.forEach((slide, index) => {
            if (!slide.dataset.title) {
                slide.dataset.title = getSlideTitle(slide, index);
            }
        });
    }

    const syncHeader = () => {
        const activeSlide = slides.find((slide) => slide.classList.contains('active'));
        const activeTitle = activeSlide?.dataset.title;
        const slideCounter = document.getElementById('slide-counter');
        const slideLabel = document.getElementById('slide-title-header');
        const activeIndex = slides.findIndex((slide) => slide.classList.contains('active'));

        if (slideLabel) slideLabel.textContent = activeTitle || '';
        if (slideCounter && activeIndex >= 0) slideCounter.textContent = `${activeIndex + 1} / ${slides.length}`;
    };

    injectThemeToggle();
    syncThemeToggle();
    syncHeader();

    const observer = new MutationObserver(syncHeader);
    slides.forEach((slide) => {
        observer.observe(slide, { attributes: true, attributeFilter: ['class'] });
    });

    const backLink = document.querySelector('header a[href="a2.html"]');
    if (backLink) {
        backLink.innerHTML = '<i class="fas fa-chevron-left"></i> Voltar para A2 V2';
    }

    if (prevBtn) prevBtn.innerHTML = '<i class="fas fa-chevron-left mr-1"></i> Anterior';
    if (nextBtn) nextBtn.innerHTML = 'Próximo <i class="fas fa-chevron-right ml-1"></i>';
    if (finishBtn) finishBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Finalizar aula';

    prevBtn?.addEventListener('click', scrollToTopSoon);
    nextBtn?.addEventListener('click', scrollToTopSoon);

    document.addEventListener('keydown', (event) => {
        const tag = document.activeElement?.tagName;
        const isTyping = /INPUT|TEXTAREA|SELECT/.test(tag || '');
        if (isTyping) return;

        if (event.key === 'ArrowLeft') {
            document.getElementById('prev-btn')?.click();
        }

        if (event.key === 'ArrowRight') {
            document.getElementById('next-btn')?.click();
        }
    });

    const choiceBuilders = Array.from(document.querySelectorAll('[data-choice-builder]'));

    choiceBuilders.forEach((builder) => {
        const preview = builder.querySelector('[data-choice-preview]');
        const resetButton = builder.querySelector('[data-choice-reset]');
        const speakButton = builder.querySelector('[data-choice-speak]');
        const template = builder.dataset.template || '';
        const requiredSlots = (builder.dataset.required || '')
            .split(',')
            .map((value) => value.trim())
            .filter(Boolean);
        const emptyText = builder.dataset.previewEmpty || 'Monte sua resposta usando as opções abaixo.';
        const state = {};

        const render = () => {
            const sentence = template.replace(/\{(.*?)\}/g, (_, slotName) => {
                const key = String(slotName).trim();
                return state[key] || '...';
            });
            const isComplete = requiredSlots.every((slot) => Boolean(state[slot]));

            if (preview) {
                preview.textContent = isComplete ? sentence : emptyText;
                preview.classList.toggle('is-complete', isComplete);
            }

            if (speakButton) {
                speakButton.disabled = !isComplete;
            }
        };

        builder.querySelectorAll('[data-choice-slot]').forEach((button) => {
            button.addEventListener('click', () => {
                const slot = button.dataset.choiceSlot;
                const value = button.dataset.choiceValue || '';
                if (!slot) return;

                state[slot] = value;

                builder.querySelectorAll(`[data-choice-slot="${slot}"]`).forEach((item) => {
                    item.classList.toggle('is-active', item === button);
                });

                render();
            });
        });

        resetButton?.addEventListener('click', () => {
            Object.keys(state).forEach((key) => delete state[key]);
            builder.querySelectorAll('[data-choice-slot]').forEach((button) => {
                button.classList.remove('is-active');
            });
            render();
        });

        speakButton?.addEventListener('click', () => {
            const text = preview?.textContent?.trim();
            if (!text || text === emptyText) return;

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            speechSynthesis.cancel();
            speechSynthesis.speak(utterance);
        });

        render();
    });

    document.body.classList.remove('lesson-loading');
    document.body.classList.add('a2-theme-ready');
})();
