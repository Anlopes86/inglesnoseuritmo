(function () {
    const dataSource = window.A1V3_DATA;
    if (!dataSource) {
        console.error('A1 V3 data was not loaded.');
        return;
    }

    const escapeHtml = (value) => String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const normalize = (value) => String(value || '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[’‘]/g, "'")
        .replace(/[^a-z0-9']+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    const verbProfile = (vocabTerms, rows) => ({ vocabTerms, rows });
    const premiumVerbProfiles = {
        2: verbProfile(['work'], [
            ['be', 'was / were', 'been', 'ser; estar'], ['work', 'worked', 'worked', 'trabalhar']
        ]),
        3: verbProfile([], [
            ['be', 'was / were', 'been', 'ser; estar']
        ]),
        4: verbProfile([], [
            ['be', 'was / were', 'been', 'ser; estar']
        ]),
        7: verbProfile(['go out', 'meet', 'work', 'study', 'like', 'have', 'want'], [
            ['work', 'worked', 'worked', 'trabalhar'], ['study', 'studied', 'studied', 'estudar'], ['like', 'liked', 'liked', 'gostar'], ['have', 'had', 'had', 'ter; fazer'], ['want', 'wanted', 'wanted', 'querer'], ['go out', 'went out', 'gone out', 'sair'], ['meet', 'met', 'met', 'encontrar-se']
        ]),
        8: verbProfile(['wake up', 'get up', 'take a shower', 'get dressed', 'have breakfast', 'go to work', 'go to school', 'start work', 'have lunch', 'finish work', 'go home', 'have dinner', 'study', 'relax', 'go to bed'], [
            ['wake up', 'woke up', 'woken up', 'acordar'], ['get up', 'got up', 'gotten up', 'levantar-se'], ['take a shower', 'took a shower', 'taken a shower', 'tomar banho'], ['get dressed', 'got dressed', 'gotten dressed', 'vestir-se'], ['have breakfast', 'had breakfast', 'had breakfast', 'tomar café da manhã'], ['go to work', 'went to work', 'gone to work', 'ir ao trabalho'], ['go to school', 'went to school', 'gone to school', 'ir à escola'], ['start work', 'started work', 'started work', 'começar o trabalho'], ['have lunch', 'had lunch', 'had lunch', 'almoçar'], ['finish work', 'finished work', 'finished work', 'terminar o trabalho'], ['go home', 'went home', 'gone home', 'ir para casa'], ['have dinner', 'had dinner', 'had dinner', 'jantar'], ['study', 'studied', 'studied', 'estudar'], ['relax', 'relaxed', 'relaxed', 'relaxar'], ['go to bed', 'went to bed', 'gone to bed', 'ir dormir']
        ]),
        9: verbProfile(['live', 'work', 'study', 'start', 'finish', 'go', 'have'], [
            ['live', 'lived', 'lived', 'morar'], ['work', 'worked', 'worked', 'trabalhar'], ['study', 'studied', 'studied', 'estudar'], ['start', 'started', 'started', 'começar'], ['finish', 'finished', 'finished', 'terminar'], ['go', 'went', 'gone', 'ir'], ['have', 'had', 'had', 'ter; fazer refeições']
        ]),
        11: verbProfile([], [
            ['have', 'had', 'had', 'ter'], ['be', 'was / were', 'been', 'ser; estar'], ['live', 'lived', 'lived', 'morar'], ['love', 'loved', 'loved', 'amar'], ['visit', 'visited', 'visited', 'visitar']
        ]),
        12: verbProfile([], [
            ['be', 'was / were', 'been', 'ser; estar'], ['have', 'had', 'had', 'ter'], ['live', 'lived', 'lived', 'morar'], ['sleep', 'slept', 'slept', 'dormir'], ['sit', 'sat', 'sat', 'sentar-se']
        ]),
        13: verbProfile(['need', 'buy'], [
            ['need', 'needed', 'needed', 'precisar'], ['buy', 'bought', 'bought', 'comprar'], ['have', 'had', 'had', 'ter'], ['want', 'wanted', 'wanted', 'querer'], ['make', 'made', 'made', 'fazer']
        ]),
        14: verbProfile(['cost', 'try on', 'pay'], [
            ['cost', 'cost', 'cost', 'custar'], ['pay', 'paid', 'paid', 'pagar'], ['try on', 'tried on', 'tried on', 'experimentar'], ['buy', 'bought', 'bought', 'comprar'], ['spend', 'spent', 'spent', 'gastar']
        ]),
        16: verbProfile(['prefer'], [
            ['prefer', 'preferred', 'preferred', 'preferir'], ['choose', 'chose', 'chosen', 'escolher'], ['like', 'liked', 'liked', 'gostar'], ['want', 'wanted', 'wanted', 'querer'], ['wear', 'wore', 'worn', 'vestir; usar']
        ]),
        17: verbProfile(['belong to'], [
            ['belong to', 'belonged to', 'belonged to', 'pertencer a'], ['find', 'found', 'found', 'encontrar'], ['lose', 'lost', 'lost', 'perder'], ['return', 'returned', 'returned', 'devolver'], ['have', 'had', 'had', 'ter']
        ]),
        18: verbProfile(['look for', 'wait', 'try on', 'pay', 'carry', 'choose', 'talk', 'send', 'sit', 'stand', 'wear', 'smile'], [
            ['look for', 'looked for', 'looked for', 'procurar'], ['wait', 'waited', 'waited', 'esperar'], ['try on', 'tried on', 'tried on', 'experimentar'], ['pay', 'paid', 'paid', 'pagar'], ['carry', 'carried', 'carried', 'carregar'], ['choose', 'chose', 'chosen', 'escolher'], ['talk', 'talked', 'talked', 'conversar'], ['send', 'sent', 'sent', 'enviar'], ['sit', 'sat', 'sat', 'sentar-se'], ['stand', 'stood', 'stood', 'ficar em pé'], ['wear', 'wore', 'worn', 'vestir; usar'], ['smile', 'smiled', 'smiled', 'sorrir']
        ]),
        19: verbProfile([], [
            ['be', 'was / were', 'been', 'ser; estar'], ['have', 'had', 'had', 'ter'], ['look', 'looked', 'looked', 'parecer; olhar'], ['wear', 'wore', 'worn', 'usar; vestir'], ['tell', 'told', 'told', 'dizer; contar']
        ]),
        21: verbProfile([], [
            ['be', 'was / were', 'been', 'ser; estar'], ['go', 'went', 'gone', 'ir'], ['travel', 'traveled', 'traveled', 'viajar'], ['start', 'started', 'started', 'começar'], ['finish', 'finished', 'finished', 'terminar']
        ]),
        22: verbProfile(['happen', 'miss', 'walk', 'arrive', 'call', 'visit', 'stay', 'go → went', 'have → had', 'get → got', 'see → saw', 'eat → ate', 'buy → bought', 'say → said', 'take → took'], [
            ['happen', 'happened', 'happened', 'acontecer'], ['miss', 'missed', 'missed', 'perder; sentir falta'], ['walk', 'walked', 'walked', 'caminhar'], ['arrive', 'arrived', 'arrived', 'chegar'], ['call', 'called', 'called', 'ligar'], ['visit', 'visited', 'visited', 'visitar'], ['stay', 'stayed', 'stayed', 'ficar; hospedar-se'], ['go', 'went', 'gone', 'ir'], ['have', 'had', 'had', 'ter'], ['get', 'got', 'gotten', 'obter; chegar'], ['see', 'saw', 'seen', 'ver'], ['eat', 'ate', 'eaten', 'comer'], ['buy', 'bought', 'bought', 'comprar'], ['say', 'said', 'said', 'dizer'], ['take', 'took', 'taken', 'pegar; levar']
        ]),
        23: verbProfile(['check in', 'board', 'land'], [
            ['check in', 'checked in', 'checked in', 'fazer check-in'], ['board', 'boarded', 'boarded', 'embarcar'], ['land', 'landed', 'landed', 'pousar'], ['fly', 'flew', 'flown', 'voar'], ['know', 'knew', 'known', 'saber; conhecer']
        ]),
        24: verbProfile(['cancel', 'sleep', 'read', 'charge', 'rain', 'drive', 'cross', 'hear', 'fall'], [
            ['cancel', 'canceled', 'canceled', 'cancelar'], ['sleep', 'slept', 'slept', 'dormir'], ['read', 'read /red/', 'read /red/', 'ler'], ['charge', 'charged', 'charged', 'carregar'], ['rain', 'rained', 'rained', 'chover'], ['drive', 'drove', 'driven', 'dirigir'], ['cross', 'crossed', 'crossed', 'atravessar'], ['hear', 'heard', 'heard', 'ouvir'], ['fall', 'fell', 'fallen', 'cair']
        ]),
        26: verbProfile(['invite', 'bring'], [
            ['invite', 'invited', 'invited', 'convidar'], ['bring', 'brought', 'brought', 'trazer'], ['plan', 'planned', 'planned', 'planejar'], ['go', 'went', 'gone', 'ir'], ['have', 'had', 'had', 'ter; realizar']
        ]),
        27: verbProfile(['hurt', 'get better'], [
            ['hurt', 'hurt', 'hurt', 'doer; machucar'], ['rest', 'rested', 'rested', 'descansar'], ['take', 'took', 'taken', 'tomar; pegar'], ['feel', 'felt', 'felt', 'sentir-se'], ['get better', 'got better', 'gotten better', 'melhorar']
        ]),
        28: verbProfile(['call', 'answer', 'hold', 'call back', 'hear', 'repeat', 'spell', 'speak', 'leave', 'reach', 'hang up'], [
            ['call', 'called', 'called', 'ligar'], ['answer', 'answered', 'answered', 'atender; responder'], ['hold', 'held', 'held', 'aguardar; segurar'], ['call back', 'called back', 'called back', 'retornar a ligação'], ['hear', 'heard', 'heard', 'ouvir'], ['repeat', 'repeated', 'repeated', 'repetir'], ['spell', 'spelled', 'spelled', 'soletrar'], ['speak', 'spoke', 'spoken', 'falar'], ['leave', 'left', 'left', 'deixar'], ['reach', 'reached', 'reached', 'conseguir contato'], ['hang up', 'hung up', 'hung up', 'desligar']
        ]),
        29: verbProfile(['start', 'finish', 'relax', 'turn off', 'turn on', 'take it easy'], [
            ['start', 'started', 'started', 'começar'], ['finish', 'finished', 'finished', 'terminar'], ['rest', 'rested', 'rested', 'descansar'], ['relax', 'relaxed', 'relaxed', 'relaxar'], ['turn off', 'turned off', 'turned off', 'desligar'], ['turn on', 'turned on', 'turned on', 'ligar'], ['take it easy', 'took it easy', 'taken it easy', 'ir com calma']
        ])
    };

    function getLessonNumber() {
        const bodyNumber = Number(document.body?.dataset.lessonNumber || 0);
        if (bodyNumber) return bodyNumber;
        const match = window.location.pathname.match(/licao-(\d+)\.html/i);
        return match ? Number(match[1]) : 1;
    }

    function slide(title, body, className = '') {
        return { title, body, className };
    }

    function revealButton(targetId, label = 'Resposta') {
        return `<button type="button" class="answer-btn" data-reveal-target="${escapeHtml(targetId)}" aria-expanded="false" title="${escapeHtml(label)}"><i class="fas fa-eye" aria-hidden="true"></i><span>${escapeHtml(label)}</span></button>`;
    }

    function renderPrompt(prompt, answer, inputId) {
        const studentPrompt = String(prompt || '').replace(/^\s*Teacher\s*:\s*/i, '');
        const safePrompt = escapeHtml(studentPrompt);
        if (!safePrompt.includes('___')) return safePrompt;
        const size = Math.max(5, Math.min(20, String(answer || '').length + 2));
        return safePrompt.replace('___', `<input id="${escapeHtml(inputId)}" class="practice-input" data-answer="${escapeHtml(answer)}" size="${size}" autocomplete="off" aria-label="Complete a lacuna">`);
    }

    function activityGuidance(type) {
        const normalizedType = normalize(type);
        if (/unscramble|build|reorder/.test(normalizedType)) return 'Desembaralhe os elementos e forme uma frase completa.';
        if (/correct|error|repair/.test(normalizedType)) return 'Encontre o erro e reescreva a frase corretamente.';
        if (/complete|gap/.test(normalizedType)) return 'Complete a lacuna com a forma que deixa a frase correta.';
        if (/choose|select/.test(normalizedType)) return 'Escolha a alternativa adequada ao contexto e leia a frase completa.';
        if (/answer|response|reply/.test(normalizedType)) return 'Responda à pergunta ou fala com uma frase completa e natural.';
        if (/transform|switch|change/.test(normalizedType)) return 'Reescreva a frase fazendo a transformação solicitada.';
        if (/spell/.test(normalizedType)) return 'Soletre a palavra em voz alta e depois confira a sequência de letras.';
        if (/number|write/.test(normalizedType)) return 'Escreva a informação por extenso em inglês.';
        if (/order|sequence|schedule/.test(normalizedType)) return 'Coloque as informações na ordem correta e apresente o resultado em voz alta.';
        if (/classify|sort|group/.test(normalizedType)) return 'Classifique os itens nas categorias indicadas e explique pelo menos uma escolha.';
        if (/match|connect/.test(normalizedType)) return 'Relacione cada item à opção correspondente e leia os pares completos em voz alta.';
        if (/describe|identify/.test(normalizedType)) return 'Observe as informações apresentadas e descreva o item com uma frase completa.';
        if (/ask|make a question/.test(normalizedType)) return 'Forme uma pergunta completa adequada à informação apresentada.';
        if (/read aloud|say/.test(normalizedType)) return 'Leia em voz alta, mantendo as palavras juntas em blocos naturais.';
        if (/form/.test(normalizedType)) return 'Forme a palavra ou estrutura pedida aplicando a regra da aula.';
        if (/combine/.test(normalizedType)) return 'Una as ideias em uma única frase usando o conector indicado.';
        if (/translate/.test(normalizedType)) return 'Traduza oralmente antes de revelar o modelo.';
        if (/relationship|possession/.test(normalizedType)) return 'Identifique a relação ou a posse e escreva uma resposta completa.';
        return 'Realize a tarefa indicada e produza uma resposta completa em inglês.';
    }

    function activityDisplayType(type) {
        return /^(response|reply)$/i.test(String(type || '').trim()) ? 'Answer' : type;
    }

    function renderActivityItems(items, prefix) {
        return `<div class="activity-grid">${items.map((item, index) => {
            const [type, prompt, , answer] = item;
            const answerId = `${prefix}-answer-${index}`;
            const inputId = `${prefix}-input-${index}`;
            return `<article class="activity-card">
                <div class="activity-card-head">
                    <span class="activity-type">${escapeHtml(activityDisplayType(type))}</span>
                    ${revealButton(answerId)}
                </div>
                <p class="activity-prompt"><span class="activity-number">${index + 1}.</span> ${renderPrompt(prompt, answer, inputId)}</p>
                <p class="activity-hint"><i class="fas fa-list-check" aria-hidden="true"></i> <strong>Como fazer:</strong> ${escapeHtml(activityGuidance(type))}</p>
                <p id="${answerId}" class="hidden-answer" hidden><strong>Modelo:</strong> ${escapeHtml(answer)}</p>
            </article>`;
        }).join('')}</div>`;
    }

    function reviewGrammarTrap(focus) {
        const label = normalize(focus);
        if (/past continuous/.test(label)) return 'Past Continuous precisa de was/were + verbo-ing; não use apenas o verbo com -ing.';
        if (/past of be|dates and past of be|was were/.test(label)) return 'Com was/were, forme a pergunta pela inversão: Was she...? / Were they...?; não use did.';
        if (/to be|where be|be na descricao|i am|you are|we are|they are|he is|she is|verb to be/.test(label)) return 'Não acrescente do/does quando o verbo principal é be; faça a inversão com am, is ou are.';
        if (/present simple|do e does|perguntas pessoais|rotina|terceira pessoa/.test(label)) return 'Depois de do/does, use o verbo base. O -s fica no auxiliar does, não no verbo principal.';
        if (/possess|adjetivos possessivos/.test(label)) return 'Diferencie her (antes de substantivo) de hers (sozinho) e não use apóstrofo em my, your, his ou their.';
        if (/some e any|contagem|countable|quantifier|how much|quantidade/.test(label)) return 'Antes de escolher o quantificador, decida se o substantivo é contável e se a frase é afirmativa, negativa ou pergunta.';
        if (/there is|there are/.test(label)) return 'Faça o verbo concordar com o primeiro substantivo apresentado: There is a bank; There are two cafés.';
        if (/localizacao|preposicoes|rota|datas e horarios|tempo/.test(label)) return 'Não traduza a preposição isoladamente. Use o bloco completo com lugar, dia ou horário.';
        if (/gostos|frequencia/.test(label)) return 'Use verbo + -ing depois de enjoy e coloque o advérbio antes do verbo comum, mas depois de be.';
        if (/clima/.test(label)) return 'Use it como sujeito: It is cold / It is raining. Não comece apenas com Is ou Raining.';
        if (/should|conselho|can|have to|habilidades|pedidos/.test(label)) return 'Depois de should, can e could, use verbo base sem to. Have to mantém o to porque não é modal puro.';
        if (/present continuous|acoes agora|ortografia do ing/.test(label)) return 'A forma -ing precisa do auxiliar be. Evite frases como She waiting ou They is working.';
        if (/past|passado|was were|did/.test(label)) return 'Em perguntas com did, volte o verbo principal para a forma base: Did you go?, não Did you went?';
        if (/compar/.test(label)) return 'Use than depois do comparativo e não combine more com adjetivos que já recebem -er.';
        if (/plan|going to/.test(label)) return 'Going to precisa de am/is/are antes e de verbo base depois: She is going to travel.';
        return '';
    }

    function renderReviewGrammarCards(items) {
        return `<div class="v3-review-grammar-grid">${items.map(([focus, reminder, example]) => `<article class="v3-review-grammar-card">
            <h3>${escapeHtml(focus)}</h3>
            <dl>
                <div><dt>Quando e como usar</dt><dd>${escapeHtml(reminder)}</dd></div>
                <div><dt>Exemplo em contexto</dt><dd class="v3-review-example">${renderGrammarExample(example)}</dd></div>
            </dl>
        </article>`).join('')}</div>`;
    }

    function renderReviewGrammarTable(items) {
        return `<div class="lesson-table-scroll v3-review-grammar-table"><table class="grammar-table review-table"><thead><tr><th>Foco</th><th>Regra e uso</th><th>Exemplo</th></tr></thead><tbody>${items.map(([focus, reminder, example, translation]) => `<tr><td><strong>${escapeHtml(focus)}</strong></td><td>${escapeHtml(reminder)}</td><td>${renderGrammarExample(example, translation)}</td></tr>`).join('')}</tbody></table></div>`;
    }

    function reviewPairs(items) {
        return items.map((item, index) => ({ id: String(index), cue: `${activityDisplayType(item[0])}: ${String(item[1] || '').replace(/^\s*Teacher\s*:\s*/i, '')}`, answer: item[3] }));
    }

    function shuffledCopy(items) {
        const shuffled = [...items];
        for (let index = shuffled.length - 1; index > 0; index -= 1) {
            const target = Math.floor(Math.random() * (index + 1));
            [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
        }
        return shuffled;
    }

    function shuffledMatchingPairs(pairs) {
        if (pairs.length < 2) return [...pairs];
        const reversed = [...pairs].reverse();
        for (let attempt = 0; attempt < 16; attempt += 1) {
            const candidate = shuffledCopy(pairs);
            const hasSameRow = candidate.some((pair, index) => pair.id === pairs[index].id);
            const isReverseOrder = candidate.every((pair, index) => pair.id === reversed[index].id);
            if (!hasSameRow && !isReverseOrder) return candidate;
        }
        return pairs.map((_, index) => pairs[(index + 1) % pairs.length]);
    }

    function a1MemoryPairs(items) {
        return reviewPairs(items).slice(0, 5);
    }

    function renderMemoryGame(items) {
        const pairs = a1MemoryPairs(items);
        const cards = shuffledCopy(pairs.map(pair => ({ ...pair, copy: pair.cue })).concat(pairs.map(pair => ({ ...pair, copy: pair.answer }))));
        return `<div class="v3-review-game" data-v3-memory-board><div class="v3-review-game-head"><div><strong>Jogo da memória</strong></div><i class="fas fa-clone" aria-hidden="true"></i></div><div class="v3-memory-grid">${cards.map(card => `<button type="button" class="v3-memory-card" data-v3-memory-card data-pair-id="${escapeHtml(card.id)}"><span class="v3-memory-cover"><i class="fas fa-question" aria-hidden="true"></i></span><span class="v3-memory-copy">${escapeHtml(card.copy)}</span></button>`).join('')}</div><p class="v3-review-feedback" data-v3-game-feedback>0/${pairs.length} pares</p></div>`;
    }

    function renderMatchingGame(items) {
        const pairs = reviewPairs(items);
        const answerPairs = shuffledMatchingPairs(pairs);
        return `<div class="v3-review-game" data-v3-match-board><div class="v3-review-game-head"><div><strong>Ligue os cards</strong><span>Selecione um desafio e depois a resposta correspondente.</span></div><i class="fas fa-link" aria-hidden="true"></i></div><div class="v3-match-grid"><div class="v3-match-column">${pairs.map(pair => `<button type="button" class="v3-match-option" data-v3-match-option data-side="left" data-pair-id="${escapeHtml(pair.id)}">${escapeHtml(pair.cue)}</button>`).join('')}</div><div class="v3-match-column">${answerPairs.map(pair => `<button type="button" class="v3-match-option" data-v3-match-option data-side="right" data-pair-id="${escapeHtml(pair.id)}">${escapeHtml(pair.answer)}</button>`).join('')}</div></div><p class="v3-review-feedback" data-v3-game-feedback>Comece por qualquer coluna.</p></div>`;
    }

    function maskedAnswer(answer) {
        return [...String(answer)].map(character => /[a-z]/i.test(character) ? '_' : character).join(' ');
    }

    function renderHangmanGame(items) {
        const pairs = reviewPairs(items);
        return `<div class="v3-review-game"><div class="v3-review-game-head"><div><strong>Forca gramatical</strong><span>Use a pista para descobrir a resposta. Revele uma letra somente quando precisar.</span></div><i class="fas fa-spell-check" aria-hidden="true"></i></div><div class="v3-hangman-list">${pairs.map(pair => `<article class="v3-hangman-round" data-v3-hangman data-answer="${escapeHtml(pair.answer)}"><p class="v3-hangman-hint">${escapeHtml(pair.cue)}</p><div class="v3-hangman-mask" data-v3-hangman-mask>${escapeHtml(maskedAnswer(pair.answer))}</div><div class="v3-game-actions"><button type="button" class="v3-game-action" data-v3-hangman-action="letter">Revelar letra</button><button type="button" class="v3-game-action" data-v3-hangman-action="answer">Mostrar resposta</button></div></article>`).join('')}</div></div>`;
    }

    function renderBuilderGame(items) {
        const pairs = reviewPairs(items);
        return `<div class="v3-review-game"><div class="v3-review-game-head"><div><strong>Construtor de frases</strong><span>Toque nas palavras na ordem correta e depois leia a resposta com ritmo natural.</span></div><i class="fas fa-cubes" aria-hidden="true"></i></div><div class="v3-hangman-list">${pairs.map(pair => {
            const words = String(pair.answer).replace(/[?.!,]/g, '').split(/\s+/).filter(Boolean).reverse();
            return `<article class="v3-builder-round" data-v3-builder data-words=""><p class="v3-hangman-hint">${escapeHtml(pair.cue)}</p><div class="v3-builder-output" data-v3-builder-output>Monte a frase aqui.</div><div class="v3-builder-bank">${words.map(word => `<button type="button" class="v3-word-chip" data-v3-word-chip data-word="${escapeHtml(word)}">${escapeHtml(word)}</button>`).join('')}</div><div class="v3-game-actions"><button type="button" class="v3-game-action" data-v3-builder-reset>Recomeçar</button></div></article>`;
        }).join('')}</div></div>`;
    }

    function reviewGameType(lessonNumber, stationIndex) {
        const rotations = {
            5: ['matching', 'memory'],
            10: ['hangman', 'builder'],
            15: ['matching', 'builder'],
            20: ['memory', 'hangman'],
            25: ['hangman', 'matching'],
            30: ['builder', 'memory'],
            31: ['matching', 'hangman'],
            32: ['memory', 'matching', 'builder']
        };
        return rotations[lessonNumber]?.[stationIndex] || 'activities';
    }

    function renderReviewIndividualRound(station) {
        const round = station.round || {};
        const steps = round.steps || [];
        const support = round.support || [];
        return `<div class="v3-speaking-round v3-speaking-round-${escapeHtml(station.phase || 'attempt')}">
            <div class="v3-speaking-round-banner">
                <span>${escapeHtml(round.label || 'Communicative mission')}</span>
                <strong>${escapeHtml(round.scenario || station.instruction)}</strong>
            </div>
            <div class="v3-speaking-mission-grid">
                <article>
                    <h3><i class="fas fa-microphone" aria-hidden="true"></i> Sua tarefa</h3>
                    <p>${escapeHtml(round.task || '')}</p>
                </article>
                <article>
                    <h3><i class="fas fa-sliders-h" aria-hidden="true"></i> Condição desta rodada</h3>
                    <p>${escapeHtml(round.condition || '')}</p>
                </article>
            </div>
            <div class="v3-speaking-round-footer">
                <div><h3>Como realizar</h3><ol>${steps.map(step => `<li>${escapeHtml(step)}</li>`).join('')}</ol></div>
                <div><h3>Language support</h3><div class="v3-speaking-support">${support.map(chunk => `<span>${escapeHtml(chunk)}</span>`).join('')}</div></div>
            </div>
            <p class="v3-speaking-evidence"><i class="fas fa-clipboard-check" aria-hidden="true"></i> <strong>Evidência:</strong> ${escapeHtml(round.evidence || '')}</p>
        </div>`;
    }

    function renderReviewStation(station, lessonNumber, stationIndex) {
        if (station.kind === 'individual-round') return renderReviewIndividualRound(station);
        const type = reviewGameType(lessonNumber, stationIndex);
        if (type === 'memory') return renderMemoryGame(station.items);
        if (type === 'matching') return renderMatchingGame(station.items);
        if (type === 'hangman') return renderHangmanGame(station.items);
        if (type === 'builder') return renderBuilderGame(station.items);
        return renderActivityItems(station.items, `review-${lessonNumber}-station-${stationIndex}`);
    }

    function renderCommunicativeQuestions(questions, prefix) {
        return `<div class="reading-questions">${(questions || []).map(([prompt, answer], index) => {
            const answerId = `${prefix}-question-${index}`;
            return `<article class="reading-question">
                <div><span class="activity-number">${index + 1}.</span><strong>${escapeHtml(prompt)}</strong></div>
                ${revealButton(answerId)}
                <p id="${answerId}" class="hidden-answer" hidden>${escapeHtml(answer)}</p>
            </article>`;
        }).join('')}</div>`;
    }

    function renderCommunicativeActivity(activity, lessonNumber, activityIndex) {
        const prefix = `review-${lessonNumber}-communication-${activityIndex}`;
        const type = activity.type || 'practice';

        if (type === 'listening') {
            const dialogueValue = activity.dialogue || { title: activity.title, lines: [] };
            const lines = dialogueValue.lines || [];
            const completeAudio = lines.map(line => `${line[0]}: ${line[1]}`).join(' ');
            const scriptId = `${prefix}-script`;
            return `<div class="v3-speaking-round v3-communicative-listening">
                ${activity.scenario ? `<div class="v3-speaking-round-banner"><span>Listen & Understand</span><strong>${escapeHtml(activity.scenario)}</strong></div>` : ''}
                <div class="v3-speaking-round-footer">
                    <div><h3>Primeira escuta</h3><p>${escapeHtml(activity.firstListen || 'Ouça sem ler e identifique quem fala, onde estão e qual é a situação.')}</p></div>
                    <div><h3>Ouvir o diálogo</h3><button type="button" class="primary-action-btn v3-speak-btn" data-v3-speak="${escapeHtml(completeAudio)}"><i class="fas fa-headphones" aria-hidden="true"></i> Reproduzir diálogo</button></div>
                </div>
                ${renderCommunicativeQuestions(activity.questions, `${prefix}-listen`)}
                <div class="v3-speaking-round-footer"><div><h3>Segunda escuta</h3><p>${escapeHtml(activity.secondListen || 'Ouça novamente, confira as respostas e só então abra o roteiro.')}</p></div><div>${revealButton(scriptId, 'Roteiro')}</div></div>
                <article id="${scriptId}" class="dialogue-card hidden-answer" hidden><h3>${escapeHtml(dialogueValue.title || 'Dialog script')}</h3>${renderDialogue(lines, false, true)}</article>
            </div>`;
        }

        if (type === 'qa-board') {
            const pairs = activity.pairs || [];
            return `<div class="v3-speaking-round">
                <div class="v3-speaking-round-banner"><span>Q & A Challenge</span><strong>${escapeHtml(activity.scenario || 'Monte cada pergunta e encontre a resposta correspondente.')}</strong></div>
                <div class="expression-grid">${pairs.map((pair, index) => `<article class="expression-card"><div><strong>${String.fromCharCode(65 + index)}</strong></div><p>${escapeHtml(pair.answer)}</p></article>`).join('')}</div>
                <div class="activity-grid">${pairs.map((pair, index) => {
                    const answerId = `${prefix}-pair-${index}`;
                    return `<article class="activity-card"><div class="activity-card-head"><span class="activity-number">${index + 1}</span><strong>Desembaralhe e relacione</strong></div><p class="activity-prompt">${escapeHtml(pair.scrambled)}</p><p class="activity-hint">Como fazer: organize a pergunta em voz alta e escolha uma resposta do quadro.</p>${revealButton(answerId)}<p id="${answerId}" class="hidden-answer" hidden><strong>${escapeHtml(pair.question)}</strong><br>${escapeHtml(pair.answer)}</p></article>`;
                }).join('')}</div>
            </div>`;
        }

        if (type === 'interview') {
            const profile = activity.profile || [];
            return `<div class="v3-speaking-round">
                <div class="v3-speaking-round-banner"><span>Interview & Report</span><strong>${escapeHtml(activity.scenario || activity.instruction)}</strong></div>
                ${profile.length ? `<div class="expression-grid">${profile.map(([label, value]) => `<article class="expression-card"><div><strong>${escapeHtml(label)}</strong></div><p>${escapeHtml(value)}</p></article>`).join('')}</div>` : ''}
                <div class="dialogue-grid">${(activity.questions || []).map((prompt, index) => `<article class="dialogue-card"><span class="dialogue-number">${index + 1}</span><h3>${escapeHtml(prompt)}</h3><p>${escapeHtml(activity.questionInstruction || 'Faça a pergunta, ouça a resposta e anote apenas palavras-chave.')}</p></article>`).join('')}</div>
                <div class="v3-speaking-round-footer"><div><h3>Depois da entrevista</h3><p>${escapeHtml(activity.reportTask || 'Apresente as informações coletadas em frases completas.')}</p></div><div><h3>Language support</h3><div class="v3-speaking-support">${(activity.support || []).map(chunk => `<span>${escapeHtml(chunk)}</span>`).join('')}</div></div></div>
            </div>`;
        }

        return renderActivityItems(activity.items || [], prefix);
    }

    function communicativeSlides(activities, lessonNumber, startIndex = 0) {
        return (activities || []).map((activity, index) => slide(activity.title, `<section><div class="slide-heading"><p class="lesson-panel-title">${escapeHtml(activity.eyebrow || 'Conversation Activities')}</p><h2>${escapeHtml(activity.title)}</h2>${activity.instruction ? `<p>${escapeHtml(activity.instruction)}</p>` : ''}</div>${renderCommunicativeActivity(activity, lessonNumber, startIndex + index)}</section>`, activity.className || ''));
    }

    function renderTranslationItems(items, prefix) {
        return `<div class="translation-list">${items.map(([pt, en], index) => {
            const answerId = `${prefix}-answer-${index}`;
            return `<article class="translation-row">
                <div class="translation-copy"><span class="activity-number">${index + 1}.</span><p${pt ? '' : ` data-v3-translate="${escapeHtml(en)}"`}>${pt ? escapeHtml(pt) : ''}</p></div>
                ${revealButton(answerId, 'Tradução')}
                <p id="${answerId}" class="hidden-answer translation-answer" hidden>${escapeHtml(en)}</p>
            </article>`;
        }).join('')}</div>`;
    }

    function expressionTranslationItems(lesson) {
        const items = [...lesson.expressionTranslations];
        const used = new Set(items.map(([, en]) => normalize(en)));
        for (const expression of lesson.expressions) {
            const example = expression[3];
            if (!example || used.has(normalize(example))) continue;
            items.push([expression[4] || null, example]);
            used.add(normalize(example));
        }
        return items;
    }

    function renderObjectives(objectives) {
        return `<ul class="lesson-objectives">${objectives.map((objective) => `<li><i class="fas fa-check" aria-hidden="true"></i><span>${escapeHtml(objective)}</span></li>`).join('')}</ul>`;
    }

    function renderDialogue(lines, intro = false, showTranslation = false) {
        return `<div class="${intro ? 'intro-dialogue' : 'dialogue-lines'}">${lines.map(([speaker, text, inlineTranslation], index) => `<div class="dialogue-line">
            <strong class="${index % 2 === 0 ? 'speaker-primary' : 'speaker-secondary'}">${escapeHtml(speaker)}:</strong>
            <div class="v3-dialogue-utterance">
                <div class="dialogue-copy"><p>${escapeHtml(text)}</p>${showTranslation ? `<em data-v3-translate="${escapeHtml(text)}"${inlineTranslation ? ` data-v3-translation="${escapeHtml(inlineTranslation)}"` : ''}></em>` : ''}</div>
                <button type="button" class="v3-speak-btn" data-v3-speak="${escapeHtml(text)}" aria-label="Ouvir: ${escapeHtml(text)}" title="Ouvir frase em inglês"><i class="fas fa-volume-up" aria-hidden="true"></i></button>
            </div>
        </div>`).join('')}</div>`;
    }

    function renderGrammarExample(example, translation = '') {
        if (!example) return '';
        return `<span class="v3-grammar-example"><span class="v3-grammar-example-en">${escapeHtml(example)}</span><em class="v3-grammar-example-translation" data-v3-translate="${escapeHtml(example)}"${translation ? ` data-v3-translation="${escapeHtml(translation)}"` : ''}></em></span>`;
    }

    function renderGrammar(grammar) {
        const spotlight = grammar.spotlight;
        if (spotlight) {
            const formula = (spotlight.formula || []).map((part) => `<span class="grammar-formula-part grammar-formula-${escapeHtml(part.tone || 'neutral')}">${escapeHtml(part.text)}</span>`).join('<span class="grammar-formula-plus" aria-hidden="true">+</span>');
            const panels = (spotlight.panels || []).map((panel) => `<article class="grammar-pattern-card grammar-pattern-${escapeHtml(panel.tone || 'blue')}">
                <p class="grammar-pattern-label">${escapeHtml(panel.label)}</p>
                <h3>${escapeHtml(panel.pattern)}</h3>
                <div class="grammar-pattern-examples">${(panel.examples || []).map((example) => `<p>${escapeHtml(example)}</p>`).join('')}</div>
            </article>`).join('');
            const important = spotlight.important || {};
            const contrast = spotlight.contrast || {};
            return `<div class="grammar-layout grammar-layout-spotlight">
                <div class="grammar-summary grammar-spotlight-summary">
                    <p class="lesson-panel-title">Regra central</p>
                    <p>${escapeHtml(grammar.summary)}</p>
                    <div class="grammar-formula" aria-label="${escapeHtml((spotlight.formula || []).map(part => part.text).join(' mais '))}">${formula}</div>
                </div>
                <div class="grammar-pattern-grid">${panels}</div>
                <div class="grammar-callout-grid">
                    <aside class="grammar-important"><span><i class="fas fa-circle-exclamation" aria-hidden="true"></i></span><div><strong>${escapeHtml(important.title || 'Importante')}</strong><p>${escapeHtml(important.text || '')}</p></div></aside>
                    <aside class="grammar-contrast"><strong>${escapeHtml(contrast.title || 'Atenção')}</strong><p class="grammar-correct"><i class="fas fa-circle-check" aria-hidden="true"></i>${escapeHtml(contrast.correct || '')}</p><p class="grammar-incorrect"><i class="fas fa-circle-xmark" aria-hidden="true"></i>${escapeHtml(contrast.incorrect || '')}</p></aside>
                </div>
                <div class="lesson-table-scroll">
                    <table class="grammar-table">
                        <thead><tr><th>Uso</th><th>Estrutura</th><th>Exemplo</th></tr></thead>
                        <tbody>${grammar.rows.map(([use, structure, example, meaning]) => `<tr><td><strong>${escapeHtml(use)}</strong></td><td><code>${escapeHtml(structure)}</code></td><td>${renderGrammarExample(example, meaning)}</td></tr>`).join('')}</tbody>
                    </table>
                </div>
                <div class="grammar-notes">${grammar.notes.map((note) => `<p><i class="fas fa-circle-info" aria-hidden="true"></i><span>${escapeHtml(note)}</span></p>`).join('')}</div>
            </div>`;
        }
        const primaryStructure = grammar.rows?.[0]?.[1] || grammar.title;
        const primaryNote = grammar.notes?.[0] || grammar.summary;
        const grammarCaution = grammar.caution || reviewGrammarTrap(grammar.title);
        return `<div class="grammar-layout grammar-layout-premium">
            <div class="grammar-summary grammar-spotlight-summary">
                <p class="lesson-panel-title">Regra central</p>
                <p>${escapeHtml(grammar.summary)}</p>
                <div class="grammar-formula grammar-formula-single"><span class="grammar-formula-part grammar-formula-blue">${escapeHtml(primaryStructure)}</span></div>
            </div>
            <div class="grammar-pattern-grid grammar-concept-grid">${grammar.rows.map(([use, structure, example, meaning], index) => `<article class="grammar-pattern-card ${index % 3 === 0 ? 'grammar-pattern-green' : index % 3 === 1 ? 'grammar-pattern-yellow' : 'grammar-pattern-blue'}">
                <p class="grammar-pattern-label">${escapeHtml(use)}</p>
                <h3>${escapeHtml(structure)}</h3>
                <div class="grammar-pattern-examples">${renderGrammarExample(example, meaning)}</div>
            </article>`).join('')}</div>
            <div class="grammar-callout-grid">
                <aside class="grammar-important"><span><i class="fas fa-circle-exclamation" aria-hidden="true"></i></span><div><strong>Importante</strong><p>${escapeHtml(primaryNote)}</p></div></aside>
                ${grammarCaution ? `<aside class="grammar-contrast"><strong>Cuidado comum</strong><p><i class="fas fa-triangle-exclamation" aria-hidden="true"></i>${escapeHtml(grammarCaution)}</p></aside>` : ''}
            </div>
            ${grammar.notes.length > 1 ? `<div class="grammar-notes">${grammar.notes.slice(1).map((note) => `<p><i class="fas fa-circle-info" aria-hidden="true"></i><span>${escapeHtml(note)}</span></p>`).join('')}</div>` : ''}
        </div>`;
    }

    function enhanceAuthoredGrammarTables(root) {
        const alwaysTranslate = /^(pergunta útil|possíveis inícios|pergunta possível|resposta direta|detalhe|detalhe que pode entrar)$/i;
        root.querySelectorAll('table.grammar-table').forEach(table => {
            const headers = Array.from(table.querySelectorAll('thead th')).map(header => header.textContent.trim());
            table.querySelectorAll('tbody tr').forEach(row => {
                Array.from(row.children).forEach((cell, index) => {
                    if (cell.querySelector('.v3-grammar-example')) return;
                    const header = headers[index] || '';
                    const text = cell.textContent.trim();
                    const isExampleSentence = /^exemplo$/i.test(header) && /[.!?…]/.test(text);
                    if (!text || (!alwaysTranslate.test(header) && !isExampleSentence)) return;
                    cell.innerHTML = renderGrammarExample(text);
                });
            });
        });
    }

    function renderReading(reading, prefix) {
        return `<article class="reading-sheet">
            <p class="lesson-panel-title">Reading</p>
            <h3>${escapeHtml(reading.title)}</h3>
            <p class="reading-copy">${escapeHtml(reading.text)}</p>
        </article>
        <div class="reading-questions">${reading.questions.map(([question, answer], index) => {
            const answerId = `${prefix}-reading-answer-${index}`;
            return `<article class="reading-question">
                <div><span class="activity-number">${index + 1}.</span><strong>${escapeHtml(question)}</strong></div>
                ${revealButton(answerId)}
                <p id="${answerId}" class="hidden-answer" hidden>${escapeHtml(answer)}</p>
            </article>`;
        }).join('')}</div>`;
    }

    function musicLineWithBlank(line, answer, index) {
        const safeLine = escapeHtml(line);
        const safeAnswer = escapeHtml(answer);
        const escapedAnswer = String(answer).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pattern = new RegExp(`\\b${escapedAnswer}\\b`, 'i');
        const size = Math.max(5, Math.min(16, String(answer).length + 2));
        const input = `<input class="music-input" data-answer="${safeAnswer}" size="${size}" autocomplete="off" aria-label="Lacuna musical ${index + 1}">`;

        if (safeLine.includes('___')) {
            return safeLine.replace('___', input);
        }

        return pattern.test(line) ? safeLine.replace(pattern, input) : `${safeLine} ${input}`;
    }

    function renderLyricPlaceholder() {
        return `<div class="v3-lyric-placeholder">
            <div class="v3-lyric-copy">
                <p class="v3-lyric-stanza">
                    <span class="v3-lyric-line">I wake to see the <input class="v3-lyric-gap" type="text" aria-label="Lacuna musical 1" autocomplete="off" spellcheck="false"> through the window,</span>
                    <span class="v3-lyric-line">A quiet street is waiting down below.</span>
                    <span class="v3-lyric-line">I take a breath and <input class="v3-lyric-gap" type="text" aria-label="Lacuna musical 2" autocomplete="off" spellcheck="false"> the open doorway,</span>
                    <span class="v3-lyric-line">Not knowing where this winding road will go.</span>
                </p>
                <p class="v3-lyric-stanza">
                    <span class="v3-lyric-line">I carry every <input class="v3-lyric-gap" type="text" aria-label="Lacuna musical 3" autocomplete="off" spellcheck="false"> that you gave me,</span>
                    <span class="v3-lyric-line">It keeps me moving when the night is long.</span>
                    <span class="v3-lyric-line">And if I lose my <input class="v3-lyric-gap" type="text" aria-label="Lacuna musical 4" autocomplete="off" spellcheck="false"> for just a moment,</span>
                    <span class="v3-lyric-line">I close my eyes and listen for our song.</span>
                </p>
                <p class="v3-lyric-stanza">
                    <span class="v3-lyric-line">We keep on <input class="v3-lyric-gap" type="text" aria-label="Lacuna musical 5" autocomplete="off" spellcheck="false"> toward tomorrow,</span>
                    <span class="v3-lyric-line">With every step, a little more to learn.</span>
                    <span class="v3-lyric-line">Through every change, through every joy and sorrow,</span>
                    <span class="v3-lyric-line">The light we share will always <input class="v3-lyric-gap" type="text" aria-label="Lacuna musical 6" autocomplete="off" spellcheck="false">.</span>
                </p>
            </div>
        </div>`;
    }

    function renderMusic(music, prefix) {
        return `<div class="music-header">
            <h3>${escapeHtml(music.song)}</h3>
            <p>${escapeHtml(music.artist)}</p>
        </div>
        <div class="spotify-frame"><iframe src="https://open.spotify.com/embed/track/${escapeHtml(music.spotifyId)}?utm_source=generator" width="100%" height="152" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Spotify: ${escapeHtml(music.song)}"></iframe></div>
        <div id="${prefix}-music-copy">${renderLyricPlaceholder()}</div>`;
    }

    function renderHomework(homework) {
        return `<div class="homework-band">
            <p class="lesson-panel-title">${escapeHtml(homework.label || 'Homework')}</p>
            <h3>${escapeHtml(homework.heading || 'Escolha um tema')}</h3>
            <p class="homework-instruction">${escapeHtml(homework.instruction)}</p>
            <div class="theme-options">${homework.themes.map((theme, index) => `<article><span>${index + 1}</span><strong>${escapeHtml(theme)}</strong></article>`).join('')}</div>
            <div class="homework-checklist"><h4>Checklist</h4>${homework.checklist.map((item) => `<p><i class="fas fa-square-check" aria-hidden="true"></i>${escapeHtml(item)}</p>`).join('')}</div>
            <button type="button" id="finish-btn" class="primary-action-btn"><i class="fas fa-check" aria-hidden="true"></i> Finalizar aula</button>
        </div>`;
    }

    function guidedConversationQuestions(lesson) {
        const authoredQuestions = lesson.conversation?.questions;
        if (Array.isArray(authoredQuestions) && authoredQuestions.length) return authoredQuestions;
        const sources = [
            ...(lesson.intro || []).map(line => line[1]),
            ...(lesson.dialogues || []).flatMap(dialogue => (dialogue.lines || []).map(line => line[1])),
            ...(lesson.translations || []).map(item => item[1])
        ];
        const questions = [...new Set(sources.filter(text => /\?$/.test(String(text || '').trim())))];
        const topicFallbacks = {
            11: ['Diga em inglês três coisas que você faz pela manhã.', 'Descreva sua rotina depois do trabalho ou da escola.', 'Diga o que você faz antes da aula de inglês.', 'Descreva sua rotina à noite.'],
            12: ['Diga em inglês duas coisas de que você gosta.', 'Diga uma coisa de que você não gosta.', 'Fale sobre uma atividade de que você gosta depois do trabalho.', 'Compare uma preferência sua com a de outra pessoa.'],
            13: ['Descreva em inglês a rotina de uma pessoa que você conhece.', 'Diga o que essa pessoa faz pela manhã.', 'Diga o que ela faz depois do trabalho ou da escola.', 'Acrescente uma atividade de fim de semana.'],
            27: ['Descreva em inglês o que você está fazendo agora.', 'Diga o que uma pessoa próxima está fazendo.', 'Imagine uma cena e descreva duas ações em andamento.', 'Diga uma ação que não está acontecendo agora.']
        };
        const genericFallbacks = [
            `Diga algo verdadeiro usando ${lesson.grammar.title}.`,
            `Use “${lesson.expressions[0]?.[0] || lesson.title}” em uma resposta sobre você.`,
            `Use “${lesson.expressions[1]?.[0] || lesson.grammar.title}” para falar sobre uma pessoa ou situação.`,
            'Crie um exemplo diferente dos modelos da aula.'
        ];
        if (questions.length >= 3) return questions;
        return [...new Set([...questions, ...(topicFallbacks[lesson.number] || genericFallbacks)])];
    }

    function renderGuidedConversation(lesson) {
        const questions = guidedConversationQuestions(lesson);
        const support = lesson.conversation?.support || lesson.expressions.map(item => item[0]);
        return `<div class="dialogue-grid">${questions.map((question, index) => `<article class="dialogue-card"><span class="dialogue-number">${index + 1}</span><h3>${escapeHtml(question)}</h3><p>Responda em inglês e acrescente um detalhe verdadeiro ou uma informação inventada.</p></article>`).join('')}</div>
            <div class="v3-speaking-support">${support.map(chunk => `<span>${escapeHtml(chunk)}</span>`).join('')}</div>`;
    }

    function renderFoundationSpeaking(lesson) {
        const modelLines = (lesson.intro || []).slice(0, 6);
        return `<div class="dialogue-grid">${modelLines.map(([, text], index) => `<article class="dialogue-card"><span class="dialogue-number">${index + 1}</span><h3>${escapeHtml(text)}</h3><button type="button" class="v3-speak-btn" data-v3-speak="${escapeHtml(text)}" aria-label="Ouvir: ${escapeHtml(text)}"><i class="fas fa-volume-up" aria-hidden="true"></i></button></article>`).join('')}</div>
            <div class="v3-speaking-support"><span>1. Ouça</span><span>2. Repita</span><span>3. Leia o modelo</span><span>4. Leia a sequência completa</span></div>`;
    }

    function renderFoundationHomework(lesson) {
        return renderHomework({
            label: 'Guided Review',
            heading: 'Revisão controlada da lição',
            instruction: 'Nesta fase, você não precisa criar frases novas. Revise somente os modelos que já apareceram na aula.',
            themes: [
                'Ouça e repita o diálogo inicial duas vezes.',
                'Leia os flashcards e a lista de verbos em voz alta.',
                'Refaça o Drill #1 antes de revelar cada resposta.'
            ],
            checklist: [
                `Reconheço o tema “${lesson.title}”.`,
                'Consigo repetir os modelos sem mudar a estrutura.',
                'Conferi a resposta somente depois da minha tentativa.'
            ]
        });
    }

    function authoredSlides(items) {
        if (!Array.isArray(items)) return [];
        return items.flatMap((item) => {
            if (!item) return [];
            const body = typeof item.body === 'function' ? item.body() : item.body;
            if (!body) return [];
            return [slide(item.title || 'Conteúdo da aula', body, item.className || '')];
        });
    }

    function vocabularyItemsForLesson(lesson, lessonNumber) {
        const profile = premiumVerbProfiles[lessonNumber];
        if (!profile?.vocabTerms?.length) return lesson.vocab;
        const verbTerms = new Set(profile.vocabTerms.map(normalize));
        return lesson.vocab.filter(([word]) => !verbTerms.has(normalize(word)));
    }

    function premiumVerbSlides(lesson, lessonNumber) {
        const profile = premiumVerbProfiles[lessonNumber];
        if (!profile?.rows?.length) return [];
        const groups = [];
        for (let index = 0; index < profile.rows.length; index += 8) groups.push(profile.rows.slice(index, index + 8));
        return groups.map((rows, groupIndex) => {
            const groupLabel = groups.length > 1 ? ` · ${groupIndex + 1}/${groups.length}` : '';
            return slide(`Verbos em três formas${groups.length > 1 ? ` ${groupIndex + 1}` : ''}`, `<section class="verb-reference">
                <div class="slide-heading"><p class="lesson-panel-title">Vocabulary Expansion · Verbs${groupLabel}</p><h2>Os verbos da lição em três formas</h2><p>Leia cada linha completa. A forma base é a prioridade da aula; passado e particípio ficam como referência para construir uma memória verbal consistente.</p></div>
                <div class="lesson-table-scroll"><table class="grammar-table verb-table"><thead><tr><th>Forma base com to</th><th>Simple Past</th><th>Past Participle</th><th>Em português</th><th>Ouvir</th></tr></thead><tbody>${rows.map(([base, past, participle, meaning]) => `<tr><td><strong>${escapeHtml(`to ${base}`)}</strong></td><td class="verb-past">${escapeHtml(past)}</td><td class="verb-participle">${escapeHtml(participle)}</td><td class="verb-meaning">${escapeHtml(meaning)}</td><td><button type="button" class="foundation-audio" data-v3-speak="${escapeHtml(`to ${base}, ${past}, ${participle}`)}" aria-label="Ouvir as formas de to ${escapeHtml(base)}" title="Ouvir as três formas"><i class="fas fa-volume-up" aria-hidden="true"></i></button></td></tr>`).join('')}</tbody></table></div>
                <p class="verb-reference-note"><strong>Como ler a tabela:</strong> o <em>to</em> apresenta o verbo na lista. Ao montar a frase, siga a estrutura ensinada na aula para saber se o <em>to</em> permanece ou não.</p>
            </section>`, 'premium-verb-slide');
        });
    }

    function hasAuthoredHelpingYou(lesson) {
        return (lesson.afterGrammarSlides || []).some(item => /helping you/i.test(String(item?.title || '')));
    }

    function helpingTipLabel(tip, expressionFirst, index) {
        const source = normalize(tip);
        if (/excuse me|please|thank you|cortesia|agradece/.test(source)) return 'Cortesia em contexto';
        if (/telefone|phone number|algarism|numeros? em blocos/.test(source)) return 'Como ditar números';
        if (/e mail|email|at para|dot para|arroba/.test(source)) return 'Como dizer e-mails';
        if (/endereco|street|zip code/.test(source)) return 'Ordem do endereço';
        if (/idade|years old/.test(source)) return 'Idade em inglês';
        if (/\bdo\b.*\bdon't\b|pergunta.*negativ|negativ.*pergunta/.test(source)) return 'Perguntas e negativas';
        if (/are not|is not|do not|does not|aren't|isn't|don't|doesn't|negativ/.test(source)) return 'Forma negativa';
        if (/pergunta|interrog|antes do sujeito|ordem|\?/.test(source)) return 'Ordem da pergunta';
        if (/contrai|contracao|forma curta/.test(source)) return 'Contrações comuns';
        if (/\ba\s*\/\s*an\b|artigo/.test(source)) return 'Uso de a/an';
        if (/i e you|i you/.test(source) && /-s| s /.test(source)) return 'Verbo com I e you';
        if (/ainda nao|sera apresentado|mais adiante/.test(source) && /terceira pessoa|he e she/.test(source)) return 'Próxima etapa: he e she';
        if (/terceira pessoa|he e she|afirmativa/.test(source) && /-s| s /.test(source)) return 'Afirmativa com he e she';
        if (/preposi|\b(?:in|at|on|as|for)\b/.test(source)) return 'Combinação com preposição';
        if (/going to/.test(source) && /base/.test(source)) return 'Verbo depois de going to';
        if (/should|will/.test(source) && /base|sem to/.test(source)) return 'Verbo depois de should/will';
        if (/can could|could you|can you/.test(source)) return 'Pedidos com can/could';
        if (/\bcan\b/.test(source)) return 'Verbo depois de can';
        if (/forma base|verbo base|sem -s|sem s\b/.test(source)) return 'Forma do verbo';
        if (/plural irregular|children|child/.test(source)) return 'Plural irregular';
        if (/singular|plural|substantivo plural/.test(source)) return 'Singular e plural';
        if (/\bsome\b/.test(source)) return 'Quando usar some';
        if (/\bany\b/.test(source)) return 'Quando usar any';
        if (/a lot of/.test(source)) return 'Quantidade com a lot of';
        if (/a few|a little/.test(source)) return 'Pequenas quantidades';
        if (/\bfew\b|\blittle\b/.test(source)) return 'Quantidade insuficiente';
        if (/one ones|one\/ones/.test(source)) return 'Substituição com one/ones';
        if (/\bit\b.*\bthem\b|object pronoun/.test(source)) return 'Pronomes de objeto';
        if (/still|not yet/.test(source)) return 'Still e not yet';
        if (/mine|yours|hers|ours|theirs/.test(source)) return 'Pronome possessivo';
        if (/his.*mesma forma/.test(source)) return 'As duas funções de his';
        if (/whose|who's|who is/.test(source)) return 'Whose ou who’s?';
        if (/terminado em e|final e/.test(source)) return 'Verbos terminados em e';
        if (/dobram|consoante/.test(source)) return 'Consoante dobrada no -ing';
        if (/estado|acao/.test(source) && /was|were|ing/.test(source)) return 'Estado ou ação passada?';
        if (/start|finish/.test(source) && /ing/.test(source)) return 'Start/finish + -ing';
        if (/rotina.*agora|agora.*rotina/.test(source)) return 'Rotina ou ação de agora?';
        if (/wait.*waiting|talk.*talking|regra geral.*ing|\b-ing\b| ing\b|ing aprendidas/.test(source)) return 'Formação do -ing';
        if (/comprimento|tipo|cor.*hair|ordem comum/.test(source)) return 'Ordem dos adjetivos';
        if (/what time/.test(source)) return 'Perguntas sobre horário';
        if (/quarter|past six|to seven/.test(source)) return 'Quarter past e quarter to';
        if (/data|july|third/.test(source)) return 'Como dizer datas';
        if (/respostas? curtas?/.test(source)) return 'Respostas curtas';
        if (/regular|worked|studied|stopped/.test(source)) return 'Passado dos verbos regulares';
        if (/\bdid\b/.test(source)) return 'Verbo depois de did';
        if (/was were|was\/were/.test(source)) return 'Perguntas com was/were';
        if (/luggage|nao contavel/.test(source)) return 'Luggage é incontável';
        if (/on foot|by foot/.test(source)) return 'Meios de transporte';
        if (/\bwhen\b|\bwhile\b/.test(source)) return 'When e while';
        if (/concorda|concordancia/.test(source)) return 'Concordância com o sujeito';
        if (/clima|sunny|rain/.test(source)) return 'Estruturas para o clima';
        if (/plano anterior|decisao agora/.test(source)) return 'Plano ou decisão imediata?';
        if (/sintoma|headache|dizzy|hurts/.test(source)) return 'Como descrever sintomas';
        if (/ao telefone|this is/.test(source)) return 'Identificação ao telefone';
        if (/before|after/.test(source)) return 'Before e after';
        if (/\buntil\b/.test(source)) return 'Limite com until';
        if (/morning|afternoon|evening|horario|momento do dia/.test(source)) return 'Cumprimento e horário';
        if (/his|her|possess/.test(source)) return 'Referência a outra pessoa';
        if (/bloco|expressao inteira|expressoes inteiras/.test(source)) return 'Aprenda o bloco completo';
        return expressionFirst ? `Expressão em uso ${index + 1}` : `Ponto gramatical ${index + 1}`;
    }

    function helpingExampleForTip(lesson, tip, index) {
        const source = normalize(tip);
        const expressions = lesson.expressions || [];
        const expressionMatch = expressions.find(([phrase]) => {
            const key = normalize(phrase).replace(/\.{2,}/g, '').trim();
            return key.length >= 3 && source.includes(key);
        });
        if (expressionMatch) return [expressionMatch[3], expressionMatch[4]];

        if (/morning|afternoon|evening|horario|momento do dia/.test(source)) {
            const timeExpression = expressions.find(([phrase]) => /morning|afternoon|evening/i.test(String(phrase)));
            if (timeExpression) return [timeExpression[3], timeExpression[4]];
        }

        const rows = lesson.grammar.rows || [];
        const rowSource = row => normalize(row.join(' '));
        let row;
        const ignoredWords = new Set(['uma', 'umas', 'um', 'uns', 'para', 'com', 'sem', 'antes', 'depois', 'forma', 'frase', 'verbo', 'verbos', 'use', 'usar', 'como', 'quando', 'nao', 'que', 'por', 'dos', 'das', 'nos', 'nas', 'the', 'and', 'with', 'from', 'this', 'that']);
        const sourceWords = new Set(source.split(' ').filter(word => word.length > 2 && !ignoredWords.has(word)));
        const rankedRows = rows.map(item => ({
            item,
            score: [...new Set(rowSource(item).split(' '))].filter(word => sourceWords.has(word)).length
        })).sort((left, right) => right.score - left.score);
        if (rankedRows[0]?.score > 0) {
            row = rankedRows[0].item;
        } else if (/are not|is not|do not|does not|aren't|isn't|don't|doesn't|negativ/.test(source)) {
            row = rows.find(item => /not|aren't|isn't|don't|doesn't|wasn't|weren't|negativ/.test(rowSource(item)));
        } else if (/pergunta|interrog|antes do sujeito|ordem/.test(source)) {
            row = rows.find(item => /\?|pergunta|interrog/.test(rowSource(item)));
        } else if (/contrai|contracao|forma curta/.test(source)) {
            row = rows.find(item => /'m|'re|'s|'ve|'ll|'d/.test(rowSource(item)));
        } else if (/\ba\s*\/\s*an\b|artigo/.test(source)) {
            row = rows.find(item => /a an|\ba\/an\b/.test(rowSource(item)));
        } else if (/preposi|\b(?:in|at|on|as|for)\b/.test(source)) {
            row = rows.find(item => /\b(?:in|at|on|as|for)\b/.test(rowSource(item)));
        } else if (/forma base|verbo base|sem -s|sem s\b/.test(source)) {
            row = rows.find(item => /verb|verbo|base|do|does/.test(rowSource(item)));
        } else if (/his|her|possess/.test(source)) {
            row = rows.find(item => /his|her|possess/.test(rowSource(item)));
        }
        row ||= rows[index] || rows[0] || [];
        return [row[2] || '', row[3] || ''];
    }

    function renderAutomaticHelpingYou(lesson) {
        const notes = [...(lesson.grammar.notes || [])];
        const rowTips = (lesson.grammar.rows || []).map(([use, structure, example]) => `${use}: ${structure}. Exemplo: ${example}`);
        const tips = [...notes, ...rowTips].filter(Boolean).slice(0, Math.max(3, Math.min(4, notes.length)));
        const expressionFirst = /expressions?/i.test(String(lesson.grammar.eyebrow || ''));
        const helpingTitle = expressionFirst ? 'Dicas práticas para usar as expressões' : 'Dicas práticas para usar a gramática';
        const helpingInstruction = expressionFirst
            ? 'Reconheça a situação, escolha o bloco completo e repita o modelo sem desmontar a expressão.'
            : 'Cada cartão explica um ponto específico da estrutura. Compare a dica com o exemplo correspondente.';
        return `<section class="helping-you-reference">
            <div class="slide-heading"><p class="lesson-panel-title">Helping You</p><h2>${helpingTitle}</h2><p>${helpingInstruction}</p></div>
            <div class="helping-you-grid">${tips.map((tip, index) => {
                const [example, translation] = helpingExampleForTip(lesson, tip, index);
                return `<article class="helping-you-card"><h3>${escapeHtml(helpingTipLabel(tip, expressionFirst, index))}</h3><p>${escapeHtml(tip)}</p>${example ? `<div class="helping-example-list"><p>${renderGrammarExample(example, translation)}</p></div>` : ''}</article>`;
            }).join('')}</div>
        </section>`;
    }

    function drillGroupsForLesson(lesson) {
        if (Array.isArray(lesson.drillGroups) && lesson.drillGroups.length) return lesson.drillGroups;
        const items = lesson.translations || [];
        if (!items.length) return [];
        const midpoint = Math.ceil(items.length / 2);
        return [items.slice(0, midpoint), items.slice(midpoint)].filter(group => group.length).map((group, index) => ({
            slideTitle: `Drill ${index + 1}`,
            eyebrow: `Drill #${index + 1}`,
            title: index === 0 ? 'Construa a estrutura principal' : 'Recupere as frases em contexto',
            instruction: 'Leia apenas o português, traduza em voz alta e revele o inglês somente depois de concluir sua tentativa.',
            items: group
        }));
    }

    function enrichedExpressionNote(phrase, note) {
        const source = String(phrase || '').toLowerCase();
        const current = String(note || '').trim();
        if (/how about/.test(source) && !/-ing/i.test(current)) return `${current} Depois de how about, use um substantivo ou verbo + -ing.`;
        if (/(nice to meet|would you like to|do you want to|i['’]d like to|going to|know how to|something to)/.test(source) && !/verbo base/i.test(current)) return `${current} Depois de to, use o verbo na forma base.`;
        if (/from\s*\.{2,}\s*to|from \.{3} to/.test(source)) return `${current} Use from para o início e to para o limite final.`;
        if (/next to/.test(source)) return `${current} Next to é uma preposição composta; mantenha as duas palavras juntas.`;
        if (/belong/.test(source)) return `${current} Em belong to, to é preposição e vem antes do dono.`;
        if (/look for/.test(source)) return `${current} For faz parte do phrasal verb look for.`;
        if (/(on weekdays|on weekends|on vacation|on sale|on time)/.test(source)) return `${current} Aprenda on como parte fixa deste bloco.`;
        if (/(at the moment|at that moment)/.test(source)) return `${current} Use at para marcar esse ponto específico no tempo.`;
        if (/the person with/.test(source)) return `${current} Use with antes da característica ou do acessório.`;
        if (/the person in/.test(source)) return `${current} Use in antes da roupa ou cor que identifica a pessoa.`;
        if (/for you/.test(source)) return `${current} Use for antes da pessoa que recebe o benefício da ação.`;
        if (/speak to/.test(source)) return `${current} Use to antes da pessoa com quem se deseja falar.`;
        return current;
    }

    function regularSlides(lesson, lessonNumber) {
        const scaffoldedDialogueStage = lessonNumber < 9;
        const selectedDialogues = lesson.dialogues;
        const vocabularyItems = vocabularyItemsForLesson(lesson, lessonNumber);
        const vocabularyMeta = lesson.vocabularyMeta || (premiumVerbProfiles[lessonNumber] ? {
            slideTitle: 'Substantivos e palavras-chave',
            eyebrow: 'Vocabulary Expansion · Nouns & Key Words',
            title: 'Substantivos e palavras essenciais',
            instruction: 'Esta seção reúne substantivos, adjetivos e palavras de apoio. Os verbos aparecem separadamente, em uma lista com três formas.'
        } : {});
        const selectedDialogueGroups = Array.isArray(lesson.dialogueGroups) && lesson.dialogueGroups.length
            ? lesson.dialogueGroups
                .map(group => (Array.isArray(group) ? group : [])
                    .map(index => selectedDialogues[Number(index)])
                    .filter(Boolean))
                .filter(group => group.length)
            : [selectedDialogues];
        const slides = [
            slide('Objetivos e diálogo', `<section class="intro-layout">
                <div class="lesson-hero"><p class="lesson-panel-title">Topic & Scene</p><h2>${escapeHtml(lesson.title)}</h2>${renderObjectives(lesson.objectives)}</div>
                <div class="intro-dialogue-panel"><p class="lesson-panel-title">Dialog Sample</p>${renderDialogue(lesson.intro, true)}</div>
            </section>`),
            slide(vocabularyMeta.slideTitle || 'Vocabulário', `<section><div class="slide-heading"><p class="lesson-panel-title">${escapeHtml(vocabularyMeta.eyebrow || 'Vocabulary Expansion')}</p><h2>${escapeHtml(vocabularyMeta.title || 'Palavras e expressões em contexto')}</h2><p>${escapeHtml(vocabularyMeta.instruction || 'Observe significado, combinação e exemplo. Vire o card para conferir o sentido em português.')}</p></div><div class="flashcard-grid ${vocabularyItems.length <= 3 ? 'flashcard-grid-compact' : ''}">${vocabularyItems.map(([word, meaning, exampleValue, translationValue], index) => {
                const examples = Array.isArray(exampleValue) ? exampleValue : [exampleValue];
                const translations = Array.isArray(translationValue) ? translationValue : [translationValue];
                return `<article class="flashcard" data-flashcard data-save-card data-card-front="${escapeHtml(word)}" data-card-back="${escapeHtml(meaning)}" role="button" tabindex="0" aria-pressed="false"><span class="flashcard-inner"><span class="flashcard-front"><span class="flashcard-index">${String(index + 1).padStart(2, '0')}</span><strong>${escapeHtml(word)}</strong><span class="flashcard-examples">${examples.map(example => `<small>${escapeHtml(example)}</small>`).join('')}</span></span><span class="flashcard-back"><span class="flashcard-index flashcard-index-placeholder" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><strong>${escapeHtml(meaning)}</strong><span class="flashcard-examples">${examples.map((example, exampleIndex) => `<small class="v3-card-example-translation" data-v3-translate="${escapeHtml(example)}"${translations[exampleIndex] ? ` data-v3-translation="${escapeHtml(translations[exampleIndex])}"` : ''}></small>`).join('')}</span></span></span></article>`;
            }).join('')}</div></section>`)
        ];

        slides.push(...authoredSlides(lesson.afterVocabularySlides));
        slides.push(...premiumVerbSlides(lesson, lessonNumber));
        slides.push(slide(lesson.grammar.slideTitle || 'Gramática', `<section><div class="slide-heading"><p class="lesson-panel-title">${escapeHtml(lesson.grammar.eyebrow || 'Grammar in Context')}</p><h2>${escapeHtml(lesson.grammar.title)}</h2></div>${renderGrammar(lesson.grammar)}</section>`));
        slides.push(...authoredSlides(lesson.afterGrammarSlides));
        if (!hasAuthoredHelpingYou(lesson)) slides.push(slide('Helping You', renderAutomaticHelpingYou(lesson), 'premium-helping-slide'));

        const activitySections = Array.isArray(lesson.activitySections) && lesson.activitySections.length
            ? lesson.activitySections
            : [{
                title: 'Use a estrutura em diferentes tarefas',
                eyebrow: 'Practice Time',
                instruction: 'Leia a orientação de cada item antes de responder e só depois confira o modelo.',
                items: lesson.practice
        }];
        for (const [sectionIndex, section] of activitySections.entries()) {
            const sectionItems = Array.isArray(section.items) ? section.items : [];
            const items = lessonNumber <= 4
                ? sectionItems.filter(([type]) => !/^(create|role-play|describe|interview|personalize)$/i.test(String(type || '').trim()))
                : sectionItems;
            if (!items.length) continue;
            slides.push(slide(section.slideTitle || section.title, `<section><div class="slide-heading"><p class="lesson-panel-title">${escapeHtml(section.eyebrow || 'Practice Time')}</p><h2>${escapeHtml(section.title)}</h2>${section.instruction ? `<p>${escapeHtml(section.instruction)}</p>` : ''}</div>${renderActivityItems(items, `lesson-${lessonNumber}-activity-${sectionIndex}`)}</section>`));
        }

        const drillSlides = drillGroupsForLesson(lesson).map((group, groupIndex) => slide(group.slideTitle || `Drill ${groupIndex + 1}`, `<section><div class="slide-heading"><p class="lesson-panel-title">${escapeHtml(group.eyebrow || `Drill #${groupIndex + 1}`)}</p><h2>${escapeHtml(group.title || 'Traduza para o inglês')}</h2><p>${escapeHtml(group.instruction || 'Leia a frase em português, traduza em voz alta e só então revele o modelo em inglês.')}</p></div>${renderTranslationItems(group.items || [], `lesson-${lessonNumber}-drill-${groupIndex}`)}</section>`));
        const expressionMeta = lesson.expressionsMeta || {};
        const expressionSlide = slide(expressionMeta.slideTitle || 'Key Phrases', `<section><div class="slide-heading"><p class="lesson-panel-title">${escapeHtml(expressionMeta.eyebrow || 'Key Phrases & Expressions')}</p><h2>${escapeHtml(expressionMeta.title || 'Expressões úteis da situação')}</h2><p>${escapeHtml(expressionMeta.instruction || 'Aprenda cada expressão como um bloco e observe as preposições e formas verbais que aparecem depois dela.')}</p></div><div class="expression-grid">${lesson.expressions.map(([phrase, meaning, note, example]) => `<article class="expression-card" data-save-card data-pronounce-text="${escapeHtml(phrase)}" data-card-front="${escapeHtml(phrase)}" data-card-back="${escapeHtml(meaning)} — ${escapeHtml(example)}"><div><strong>${escapeHtml(phrase)}</strong><span>${escapeHtml(meaning)}</span></div><p>${escapeHtml(enrichedExpressionNote(phrase, note))}</p><small>${escapeHtml(example)}</small></article>`).join('')}</div></section>`);
        const dialogueSlides = [];
        selectedDialogueGroups.forEach((dialogueGroup, groupIndex) => {
            const multipleGroups = selectedDialogueGroups.length > 1;
            const groupLabel = multipleGroups ? ` · ${groupIndex + 1}/${selectedDialogueGroups.length}` : '';
            dialogueSlides.push(slide(`Mini diálogos${multipleGroups ? ` ${groupIndex + 1}` : ''}`, `<section><div class="slide-heading"><p class="lesson-panel-title">Dialog Samples${groupLabel}</p><h2>Observe as expressões em conversa</h2><p>Leia com o professor e depois substitua alimentos, bebidas e preferências para criar uma variação real.</p></div><div class="dialogue-grid">${dialogueGroup.map(dialogue => {
                const dialogueIndex = selectedDialogues.indexOf(dialogue);
                return `<article class="dialogue-card"><span class="dialogue-number">${dialogueIndex + 1}</span><h3>${escapeHtml(dialogue.title)}</h3>${renderDialogue(dialogue.lines, false, scaffoldedDialogueStage)}</article>`;
            }).join('')}</div></section>`));
        });

        if (lesson.coreSequence === 'drills-expressions-dialogues') {
            slides.push(...drillSlides, expressionSlide, ...dialogueSlides);
        } else {
            slides.push(...dialogueSlides, ...drillSlides, expressionSlide);
        }

        slides.push(
            slide('Leitura', `<section><div class="slide-heading"><p class="lesson-panel-title">Context Reading</p><h2>${escapeHtml(lesson.reading.title)}</h2></div>${renderReading(lesson.reading, `lesson-${lessonNumber}`)}</section>`),
            lessonNumber <= 4
                ? slide('Prática oral controlada', `<section><div class="slide-heading"><p class="lesson-panel-title">Let’s Talk · Controlled Practice</p><h2>Ouça, repita e leia os modelos</h2><p>O professor conduz uma fala por vez. Nesta etapa, o aluno repete e lê estruturas prontas, sem precisar criar respostas.</p></div>${renderFoundationSpeaking(lesson)}</section>`)
                : slide('Conversa guiada', `<section><div class="slide-heading"><p class="lesson-panel-title">Let’s Talk</p><h2>Responda e desenvolva suas ideias</h2><p>O professor faz uma pergunta por vez. Responda em inglês e acrescente uma informação além da resposta mínima.</p></div>${renderGuidedConversation(lesson)}</section>`),
            slide('Tradução oral 2', `<section><div class="slide-heading"><p class="lesson-panel-title">Expressions in Use</p><h2>Use as expressões em novas frases</h2><p>Traduza oralmente, confira uma versão possível e repita os blocos em que precisar de mais segurança.</p></div>${renderTranslationItems(expressionTranslationItems(lesson), `lesson-${lessonNumber}-translation-two`)}</section>`),
            slide('Música', `<section><div class="slide-heading"><p class="lesson-panel-title">Music Time</p><h2>Preencha as lacunas com a palavra que você ouvir</h2></div><div class="music-card">${renderMusic(lesson.music, `lesson-${lessonNumber}`)}</div></section>`),
            slide('Homework', `<section>${lessonNumber <= 4 ? renderFoundationHomework(lesson) : renderHomework(lesson.homework)}</section>`)
        );

        return slides;
    }

    function reviewSlides(review, lessonNumber) {
        const isProject = review.type === 'project';
        const focusStations = review.stations.filter(station => station.kind === 'focus-practice');
        const individualRounds = review.stations.filter(station => station.kind === 'individual-round');
        const communicativeActivities = Array.isArray(review.communicativeActivities) ? review.communicativeActivities : [];
        const beforeReadingActivities = communicativeActivities.filter(activity => activity.placement === 'before-reading');
        const afterReadingActivities = communicativeActivities.filter(activity => activity.placement !== 'before-reading');
        const slides = [
            slide(isProject ? 'Project' : 'Review', `<section class="intro-layout review-intro review-intro-compact"><div class="lesson-hero"><p class="lesson-panel-title">${isProject ? 'Project' : 'Review'}</p><h2>${escapeHtml(review.title)}</h2><p class="review-lead">${isProject ? 'Preparação e demonstração do que você já consegue fazer em inglês.' : 'Revisão do bloco anterior.'}</p></div></section>`)
        ];

        focusStations.forEach((station, index) => {
            const grammar = station.grammar || {};
            const grammarRows = grammar.rows || [];
            const grammarNotes = grammar.notes || [];
            slides.push(
                slide(`Revisão gramatical ${index + 1}`, `<section><div class="slide-heading"><p class="lesson-panel-title">Helping You · Revisão gramatical ${index + 1}</p><h2>${escapeHtml(grammar.title || station.title)}</h2>${grammar.summary ? `<p>${escapeHtml(grammar.summary)}</p>` : ''}</div>${renderReviewGrammarCards(grammarRows)}${grammarNotes.length ? `<div class="grammar-notes">${grammarNotes.map(note => `<p><i class="fas fa-circle-info" aria-hidden="true"></i><span>${escapeHtml(note)}</span></p>`).join('')}</div>` : ''}</section>`),
                slide(station.title, `<section><div class="slide-heading"><p class="lesson-panel-title">Prática ${index + 1}</p><h2>${escapeHtml(station.title)}</h2><p>${escapeHtml(station.instruction)}</p></div>${renderReviewStation(station, lessonNumber, index)}</section>`)
            );
        });

        if (isProject) slides.push(...authoredSlides(review.projectSlides));
        slides.push(...communicativeSlides(beforeReadingActivities, lessonNumber));

        const reviewSupport = [...new Set(individualRounds.flatMap(station => station.round?.support || []))];
        slides.push(slide(isProject ? 'Project Brief' : 'Reading Mission', `<section><div class="slide-heading"><p class="lesson-panel-title">${isProject ? 'Project Brief' : 'Context Reading'}</p><h2>${escapeHtml(review.reading.title)}</h2><p>${isProject ? 'Leia as orientações e confirme o que precisa aparecer na sua produção.' : 'Leia, identifique as informações principais e observe quais estruturas do bloco reaparecem no texto.'}</p></div>${renderReading(review.reading, `review-${lessonNumber}`)}</section>`));
        slides.push(...communicativeSlides(afterReadingActivities, lessonNumber, beforeReadingActivities.length));
        slides.push(slide('Useful Language', `<section><div class="slide-heading"><p class="lesson-panel-title">Key Phrases & Expressions</p><h2>Blocos para a conversa</h2><p>Use estas expressões como apoio. Complete cada uma com informações adequadas à pergunta do professor.</p></div><div class="expression-grid">${reviewSupport.map(chunk => `<article class="expression-card"><div><strong>${escapeHtml(chunk)}</strong></div></article>`).join('')}</div></section>`));

        individualRounds.forEach((station, index) => {
            slides.push(slide(station.title, `<section><div class="slide-heading"><p class="lesson-panel-title">Let’s Talk</p><h2>${escapeHtml(station.title)}</h2><p>${escapeHtml(station.instruction)}</p></div>${renderReviewStation(station, lessonNumber, focusStations.length + index)}</section>`));
        });

        slides.push(slide('Homework Project', `<section>${renderHomework(review.homework)}</section>`));

        return slides;
    }

    function mountSlides(slides) {
        const root = document.getElementById('lesson-root');
        root.innerHTML = slides.map((item, index) => `<div class="slide ${index === 0 ? 'active' : ''} ${escapeHtml(item.className)}" data-title="${escapeHtml(item.title)}">${item.body}</div>`).join('');
        enhanceAuthoredGrammarTables(root);
        return Array.from(root.querySelectorAll('.slide'));
    }

    function wireInteractiveElements() {
        document.addEventListener('click', (event) => {
            const reveal = event.target.closest('[data-reveal-target]');
            if (reveal) {
                const target = document.getElementById(reveal.dataset.revealTarget || '');
                if (!target) return;
                const willShow = target.hidden;
                target.hidden = !willShow;
                reveal.setAttribute('aria-expanded', String(willShow));
                const icon = reveal.querySelector('i');
                if (icon) icon.className = `fas ${willShow ? 'fa-eye-slash' : 'fa-eye'}`;
                return;
            }

            const card = event.target.closest('[data-flashcard]');
            if (card) {
                const flipped = !card.classList.contains('flipped');
                card.classList.toggle('flipped', flipped);
                card.setAttribute('aria-pressed', String(flipped));
            }
        });

        document.querySelectorAll('input[data-answer]').forEach((input) => {
            input.addEventListener('input', () => input.classList.remove('correct', 'incorrect'));
            input.addEventListener('blur', () => {
                const value = normalize(input.value);
                input.classList.remove('correct', 'incorrect');
                if (!value) return;
                input.classList.add(value === normalize(input.dataset.answer) ? 'correct' : 'incorrect');
            });
        });
    }

    function wireNavigation(slides, lessonNumber) {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const counter = document.getElementById('slide-counter');
        const bar = document.getElementById('progress-bar');
        const header = document.getElementById('slide-title-header');
        let current = 0;

        const render = () => {
            slides.forEach((item, index) => item.classList.toggle('active', index === current));
            counter.textContent = `${current + 1} / ${slides.length}`;
            bar.style.width = `${((current + 1) / slides.length) * 100}%`;
            header.textContent = slides[current]?.dataset.title || '';
            prevBtn.disabled = current === 0;
            nextBtn.hidden = current === slides.length - 1;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        prevBtn.addEventListener('click', () => {
            if (current > 0) {
                current -= 1;
                render();
            }
        });
        nextBtn.addEventListener('click', () => {
            if (current < slides.length - 1) {
                current += 1;
                render();
            }
        });

        document.addEventListener('click', async (event) => {
            const finish = event.target.closest('#finish-btn');
            if (!finish) return;
            finish.disabled = true;
            finish.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Salvando';
            try {
                if (typeof window.markLessonAsComplete === 'function') {
                    const saved = await window.markLessonAsComplete('a1-v3', lessonNumber);
                    if (saved === false) throw new Error('Lesson progress was not saved.');
                }
                finish.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Aula concluída';
            } catch (error) {
                console.error('Could not save lesson progress:', error);
                finish.disabled = false;
                finish.innerHTML = '<i class="fas fa-rotate-right" aria-hidden="true"></i> Tentar novamente';
            }
        });

        document.addEventListener('keydown', (event) => {
            if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || '')) return;
            if (event.key === 'ArrowLeft') prevBtn.click();
            if (event.key === 'ArrowRight' && !nextBtn.hidden) nextBtn.click();
        });
        render();
    }

    function hydrate() {
        const lessonNumber = getLessonNumber();
        let regular = dataSource.lessons[lessonNumber];
        let review = dataSource.reviews[lessonNumber];
        const editorial = window.V3LessonEditorial;
        if (regular && editorial?.has('a1-v3', lessonNumber)) regular = editorial.apply('a1-v3', lessonNumber, regular);
        if (review && editorial?.has('a1-v3', lessonNumber)) review = editorial.apply('a1-v3', lessonNumber, review);
        const content = regular || review;
        if (!content) {
            document.getElementById('lesson-root').innerHTML = '<p class="load-error">Conteúdo da lição não encontrado.</p>';
            return;
        }

        const padded = String(lessonNumber).padStart(2, '0');
        document.title = `A1 V3 | Lição ${padded}: ${content.title}`;
        document.getElementById('lesson-title').textContent = `A1 V3 · Lição ${padded}: ${content.title}`;
        const slides = mountSlides(regular ? regularSlides(regular, lessonNumber) : reviewSlides(review, lessonNumber));
        wireInteractiveElements();
        wireNavigation(slides, lessonNumber);
        document.body.classList.remove('lesson-loading');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hydrate, { once: true });
    } else {
        hydrate();
    }
}());
