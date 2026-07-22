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
        const safePrompt = escapeHtml(prompt);
        if (!safePrompt.includes('___')) return safePrompt;
        const size = Math.max(5, Math.min(20, String(answer || '').length + 2));
        return safePrompt.replace('___', `<input id="${escapeHtml(inputId)}" class="practice-input" data-answer="${escapeHtml(answer)}" size="${size}" autocomplete="off" aria-label="Complete a lacuna">`);
    }

    function renderActivityItems(items, prefix) {
        return `<div class="activity-grid">${items.map((item, index) => {
            const [type, prompt, hint, answer] = item;
            const answerId = `${prefix}-answer-${index}`;
            const inputId = `${prefix}-input-${index}`;
            return `<article class="activity-card">
                <div class="activity-card-head">
                    <span class="activity-type">${escapeHtml(type)}</span>
                    ${revealButton(answerId)}
                </div>
                <p class="activity-prompt"><span class="activity-number">${index + 1}.</span> ${renderPrompt(prompt, answer, inputId)}</p>
                <p class="activity-hint"><i class="fas fa-lightbulb" aria-hidden="true"></i> Dica: ${escapeHtml(hint)}</p>
                <p id="${answerId}" class="hidden-answer" hidden><strong>Modelo:</strong> ${escapeHtml(answer)}</p>
            </article>`;
        }).join('')}</div>`;
    }

    function reviewGrammarTrap(focus) {
        const label = normalize(focus);
        if (/to be|where be|be na descricao/.test(label)) return 'Não acrescente do/does quando o verbo principal é be; faça a inversão com am, is ou are.';
        if (/do e does|perguntas pessoais|rotina|terceira pessoa/.test(label)) return 'Depois de do/does, use o verbo base. O -s fica no auxiliar does, não no verbo principal.';
        if (/possess|adjetivos possessivos/.test(label)) return 'Diferencie her (antes de substantivo) de hers (sozinho) e não use apóstrofo em my, your, his ou their.';
        if (/some e any|contagem/.test(label)) return 'Antes de escolher o quantificador, decida se o substantivo é contável e se a frase é afirmativa, negativa ou pergunta.';
        if (/there is|there are/.test(label)) return 'Faça o verbo concordar com o primeiro substantivo apresentado: There is a bank; There are two cafés.';
        if (/localizacao|preposicoes|rota|datas e horarios|tempo/.test(label)) return 'Não traduza a preposição isoladamente. Use o bloco completo com lugar, dia ou horário.';
        if (/gostos|frequencia/.test(label)) return 'Use verbo + -ing depois de enjoy e coloque o advérbio antes do verbo comum, mas depois de be.';
        if (/clima/.test(label)) return 'Use it como sujeito: It is cold / It is raining. Não comece apenas com Is ou Raining.';
        if (/should|conselho|can|have to|habilidades|pedidos/.test(label)) return 'Depois de should, can e could, use verbo base sem to. Have to mantém o to porque não é modal puro.';
        if (/present continuous|acoes agora|ortografia do ing/.test(label)) return 'A forma -ing precisa do auxiliar be. Evite frases como She waiting ou They is working.';
        if (/past|passado|was were|did/.test(label)) return 'Em perguntas com did, volte o verbo principal para a forma base: Did you go?, não Did you went?';
        if (/compar/.test(label)) return 'Use than depois do comparativo e não combine more com adjetivos que já recebem -er.';
        if (/plan|going to/.test(label)) return 'Going to precisa de am/is/are antes e de verbo base depois: She is going to travel.';
        return 'Use a estrutura dentro de uma frase completa e confirme se o sujeito, o auxiliar e o verbo principal combinam.';
    }

    function renderReviewGrammarCards(items) {
        return `<div class="v3-review-grammar-grid">${items.map(([focus, reminder, example]) => `<article class="v3-review-grammar-card">
            <h3>${escapeHtml(focus)}</h3>
            <dl>
                <div><dt>Quando e como usar</dt><dd>${escapeHtml(reminder)}</dd></div>
                <div><dt>Exemplo em contexto</dt><dd class="v3-review-example">${escapeHtml(example)}</dd></div>
                <div><dt>Cuidado comum</dt><dd>${escapeHtml(reviewGrammarTrap(focus))}</dd></div>
                <div><dt>Checagem oral</dt><dd>Crie uma frase verdadeira e depois transforme-a em pergunta ou negativa.</dd></div>
            </dl>
        </article>`).join('')}</div>`;
    }

    function renderReviewGrammarTable(items) {
        return `<div class="lesson-table-scroll v3-review-grammar-table"><table class="grammar-table review-table"><thead><tr><th>Foco</th><th>Regra e uso</th><th>Exemplo</th></tr></thead><tbody>${items.map(([focus, reminder, example]) => `<tr><td><strong>${escapeHtml(focus)}</strong></td><td>${escapeHtml(reminder)}</td><td>${escapeHtml(example)}</td></tr>`).join('')}</tbody></table></div>`;
    }

    function reviewPairs(items) {
        return items.map((item, index) => ({ id: String(index), cue: `${item[0]}: ${item[1]}`, answer: item[3] }));
    }

    function a1MemoryPairs(lessonNumber, items) {
        const curated = {
            4: [
                ["What's your name?", 'My name is Maya.'],
                ['Where are you from?', "I'm from Brazil."],
                ['How do you spell your last name?', "It's S-I-L-V-A."],
                ['Do you have any brothers or sisters?', 'Yes, I have one sister.']
            ],
            16: [
                ["It's cloudy today.", 'Está nublado hoje.'],
                ['I often listen to music.', 'Eu frequentemente ouço música.'],
                ['Can I try it on?', 'Posso experimentar?'],
                ['How much are these shoes?', 'Quanto custam estes sapatos?']
            ],
            24: [
                ['Could I have...', '...a return ticket, please?'],
                ['The train leaves...', '...at half past seven.'],
                ['Would you like...', '...to come on Friday?'],
                ['The passengers are...', '...waiting on platform two.']
            ],
            32: [
                ["What's your name?", 'My name is...'],
                ['Where do you live?', 'I live in...'],
                ['What did you do yesterday?', 'I went...'],
                ['What are you going to do next weekend?', "I'm going to..."]
            ]
        }[lessonNumber];
        if (!curated) return reviewPairs(items);
        return curated.map(([cue, answer], index) => ({ id: String(index), cue, answer }));
    }

    function renderMemoryGame(items, lessonNumber) {
        const pairs = a1MemoryPairs(lessonNumber, items);
        const cards = pairs.map(pair => ({ ...pair, copy: pair.cue })).concat([...pairs].reverse().map(pair => ({ ...pair, copy: pair.answer })));
        return `<div class="v3-review-game" data-v3-memory-board><div class="v3-review-game-head"><div><strong>Jogo da memória</strong><span>Forme relações que fazem sentido: pergunta e resposta, frase e tradução ou começo e conclusão.</span></div><i class="fas fa-clone" aria-hidden="true"></i></div><div class="v3-memory-grid">${cards.map(card => `<button type="button" class="v3-memory-card" data-v3-memory-card data-pair-id="${escapeHtml(card.id)}"><span class="v3-memory-cover"><i class="fas fa-question" aria-hidden="true"></i></span><span class="v3-memory-copy">${escapeHtml(card.copy)}</span></button>`).join('')}</div><p class="v3-review-feedback" data-v3-game-feedback>Vire duas cartas por vez. Ao acertar, leia o par completo em voz alta.</p></div>`;
    }

    function renderMatchingGame(items) {
        const pairs = reviewPairs(items);
        return `<div class="v3-review-game" data-v3-match-board><div class="v3-review-game-head"><div><strong>Ligue os cards</strong><span>Selecione um desafio e depois a resposta correspondente.</span></div><i class="fas fa-link" aria-hidden="true"></i></div><div class="v3-match-grid"><div class="v3-match-column">${pairs.map(pair => `<button type="button" class="v3-match-option" data-v3-match-option data-side="left" data-pair-id="${escapeHtml(pair.id)}">${escapeHtml(pair.cue)}</button>`).join('')}</div><div class="v3-match-column">${[...pairs].reverse().map(pair => `<button type="button" class="v3-match-option" data-v3-match-option data-side="right" data-pair-id="${escapeHtml(pair.id)}">${escapeHtml(pair.answer)}</button>`).join('')}</div></div><p class="v3-review-feedback" data-v3-game-feedback>Comece por qualquer coluna.</p></div>`;
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
        const rotations = { 4: ['matching', 'memory'], 8: ['hangman', 'builder'], 12: ['matching', 'builder'], 16: ['memory', 'hangman'], 20: ['hangman', 'matching'], 24: ['builder', 'memory'], 28: ['matching', 'hangman'], 32: ['memory', 'matching', 'builder'] };
        return rotations[lessonNumber]?.[stationIndex] || 'activities';
    }

    function renderReviewStation(station, lessonNumber, stationIndex) {
        const type = reviewGameType(lessonNumber, stationIndex);
        if (type === 'memory') return renderMemoryGame(station.items, lessonNumber);
        if (type === 'matching') return renderMatchingGame(station.items);
        if (type === 'hangman') return renderHangmanGame(station.items);
        if (type === 'builder') return renderBuilderGame(station.items);
        return renderActivityItems(station.items, `review-${lessonNumber}-station-${stationIndex}`);
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
            items.push([null, example]);
            used.add(normalize(example));
            if (items.length >= 6) break;
        }
        const supplements = {
            3: [['Eu me dou bem com meus primos.', 'I get along with my cousins.'], ['Ela cuida da avó aos domingos.', 'She looks after her grandmother on Sundays.']],
            6: [['Eu trabalho das nove às cinco.', 'I work from nine to five.'], ['Eu ligo para você logo depois da aula.', 'I call you right after class.']],
            10: [['A padaria fica logo depois da esquina.', 'The bakery is around the corner.'], ['A estação fica em frente ao parque.', 'The station is across from the park.']],
            11: [['Passe pelo banco e vire à esquerda.', 'Go past the bank and turn left.'], ['O hotel fica à sua direita.', 'The hotel is on your right.']],
            13: [['O tempo abre depois das três.', 'It clears up after three.'], ['Esfria no começo da noite.', 'It cools down in the evening.']],
            14: [['No meu tempo livre, eu ouço música.', 'In my free time, I listen to music.'], ['Nós passamos um tempo no parque aos domingos.', 'We hang out at the park on Sundays.']],
            17: [['Tome o remédio depois do café da manhã.', 'Take the medicine after breakfast.'], ['Vá para casa e descanse um pouco.', 'Go home and get some rest.']],
            18: [['Eu arrumo a cama todas as manhãs.', 'I make the bed every morning.'], ['Precisamos arrumar a sala de estar.', 'We need to tidy up the living room.']],
            19: [['Por favor, entregue sua tarefa hoje.', 'Please hand in your homework today.'], ['Nina está de plantão esta manhã.', 'Nina is on duty this morning.']],
            21: [['Desça no próximo ponto.', 'Get off at the next stop.'], ['O voo está atrasado em trinta minutos.', 'The flight is delayed by thirty minutes.']],
            22: [['Você gostaria de vir aqui em casa no domingo?', 'Would you like to come over on Sunday?'], ['Nós damos uma festa todos os anos.', 'We have a party every year.']],
            23: [['Nós estamos torcendo pelo time da casa.', 'We are cheering for the home team.'], ['Maya está participando da corrida.', 'Maya is taking part in the race.']],
            25: [['Por favor, recolha seu lixo.', 'Please pick up your trash.'], ['Nós cuidamos do parque.', 'We take care of the park.']],
            26: [['Conecte o carregador perto da mesa.', 'Plug in the charger near the desk.'], ['Faça backup das suas fotos todos os meses.', 'Back up your photos every month.']],
            27: [['Nina mora no exterior por causa do trabalho.', 'Nina lives abroad for work.'], ['Nós queremos viajar para a Argentina.', 'We want to travel to Argentina.']],
            29: [['Eu cresci em uma cidade pequena.', 'I grew up in a small town.'], ['Minha família se mudou para Salvador em 2015.', 'My family moved to Salvador in 2015.']],
            30: [['Compare este preço com o preço online.', 'Compare this price with the online price.'], ['Eu vou ficar com a opção mais barata.', 'I’ll go with the cheaper option.']],
            31: [['Ela está juntando dinheiro para um computador novo.', 'She is saving up for a new computer.'], ['Sábado às dez? Ótimo. Até lá.', 'Saturday at ten? Great. See you then.']]
        }[lesson.number] || [];
        for (const item of supplements) {
            if (items.length >= 6) break;
            if (used.has(normalize(item[1]))) continue;
            items.push(item);
            used.add(normalize(item[1]));
        }
        return items.slice(0, 6);
    }

    function renderObjectives(objectives) {
        return `<ul class="lesson-objectives">${objectives.map((objective) => `<li><i class="fas fa-check" aria-hidden="true"></i><span>${escapeHtml(objective)}</span></li>`).join('')}</ul>`;
    }

    function renderDialogue(lines, intro = false, showTranslation = false) {
        return `<div class="${intro ? 'intro-dialogue' : 'dialogue-lines'}">${lines.map(([speaker, text], index) => `<div class="dialogue-line">
            <strong class="${index % 2 === 0 ? 'speaker-primary' : 'speaker-secondary'}">${escapeHtml(speaker)}:</strong>
            <div class="v3-dialogue-utterance">
                <div class="dialogue-copy"><p>${escapeHtml(text)}</p>${showTranslation ? `<em data-v3-translate="${escapeHtml(text)}"></em>` : ''}</div>
                <button type="button" class="v3-speak-btn" data-v3-speak="${escapeHtml(text)}" aria-label="Ouvir: ${escapeHtml(text)}" title="Ouvir frase em inglês"><i class="fas fa-volume-up" aria-hidden="true"></i></button>
            </div>
        </div>`).join('')}</div>`;
    }

    function renderGrammar(grammar) {
        return `<div class="grammar-layout">
            <div class="grammar-summary">
                <p class="lesson-panel-title">Regra central</p>
                <h3>${escapeHtml(grammar.title)}</h3>
                <p>${escapeHtml(grammar.summary)}</p>
            </div>
            <div class="lesson-table-scroll">
                <table class="grammar-table">
                    <thead><tr><th>Uso</th><th>Estrutura</th><th>Exemplo</th><th>Sentido</th></tr></thead>
                    <tbody>${grammar.rows.map(([use, structure, example, meaning]) => `<tr><td><strong>${escapeHtml(use)}</strong></td><td><code>${escapeHtml(structure)}</code></td><td>${escapeHtml(example)}</td><td>${escapeHtml(meaning)}</td></tr>`).join('')}</tbody>
                </table>
            </div>
            <div class="grammar-notes">${grammar.notes.map((note) => `<p><i class="fas fa-circle-info" aria-hidden="true"></i><span>${escapeHtml(note)}</span></p>`).join('')}</div>
        </div>`;
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
            <div class="v3-lyric-placeholder-head"><strong>Letra com lacunas</strong><span>Texto musical fictício para preservar o layout até a inserção do conteúdo autorizado.</span></div>
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
            <p class="v3-copyright-note"><i class="fas fa-shield-halved" aria-hidden="true"></i> Nenhuma letra protegida é distribuída nesta versão.</p>
        </div>`;
    }

    function renderMusic(music, prefix) {
        return `<div class="music-header">
            <p class="lesson-panel-title">Music Moment</p>
            <h3>${escapeHtml(music.song)}</h3>
            <p>${escapeHtml(music.artist)}</p>
        </div>
        <div class="spotify-frame"><iframe src="https://open.spotify.com/embed/track/${escapeHtml(music.spotifyId)}?utm_source=generator" width="100%" height="152" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Spotify: ${escapeHtml(music.song)}"></iframe></div>
        <div id="${prefix}-music-copy">${renderLyricPlaceholder()}</div>`;
    }

    function renderHomework(homework) {
        return `<div class="homework-band">
            <p class="lesson-panel-title">Homework</p>
            <h3>Escolha um tema</h3>
            <p class="homework-instruction">${escapeHtml(homework.instruction)}</p>
            <div class="theme-options">${homework.themes.map((theme, index) => `<article><span>${index + 1}</span><strong>${escapeHtml(theme)}</strong></article>`).join('')}</div>
            <div class="homework-checklist"><h4>Checklist</h4>${homework.checklist.map((item) => `<p><i class="fas fa-square-check" aria-hidden="true"></i>${escapeHtml(item)}</p>`).join('')}</div>
            <button type="button" id="finish-btn" class="primary-action-btn"><i class="fas fa-check" aria-hidden="true"></i> Finalizar aula</button>
        </div>`;
    }

    function regularSlides(lesson, lessonNumber) {
        const dialogueIndexes = lessonNumber % 2 === 0 ? [1, 3] : [0, 2];
        const scaffoldedDialogueStage = lessonNumber < 9;
        const selectedDialogues = scaffoldedDialogueStage
            ? lesson.dialogues.slice(0, 4)
            : dialogueIndexes.map((index) => lesson.dialogues[index]).filter(Boolean);
        const slides = [
            slide('Objetivos e diálogo', `<section class="intro-layout">
                <div class="lesson-hero"><p class="lesson-panel-title">O que será aprendido nesta lição</p><h2>${escapeHtml(lesson.title)}</h2>${renderObjectives(lesson.objectives)}</div>
                <div class="intro-dialogue-panel"><p class="lesson-panel-title">Introductory Dialogue</p>${renderDialogue(lesson.intro, true)}</div>
            </section>`),
            slide('Vocabulário', `<section><div class="slide-heading"><p class="lesson-panel-title">Vocabulary</p><h2>Flashcards da lição</h2></div><div class="flashcard-grid">${lesson.vocab.map(([word, meaning, example], index) => `<article class="flashcard" data-flashcard data-save-card data-card-front="${escapeHtml(word)}" data-card-back="${escapeHtml(meaning)}" role="button" tabindex="0" aria-pressed="false"><span class="flashcard-inner"><span class="flashcard-front"><span class="flashcard-index">${String(index + 1).padStart(2, '0')}</span><strong>${escapeHtml(word)}</strong><small>${escapeHtml(example)}</small></span><span class="flashcard-back"><span class="flashcard-index flashcard-index-placeholder" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><strong>${escapeHtml(meaning)}</strong><small class="v3-card-example-translation" data-v3-translate="${escapeHtml(example)}"></small></span></span></article>`).join('')}</div></section>`),
            slide('Gramática', `<section><div class="slide-heading"><p class="lesson-panel-title">Deep Grammar</p><h2>${escapeHtml(lesson.grammar.title)}</h2></div>${renderGrammar(lesson.grammar)}</section>`),
            slide('Prática', `<section><div class="slide-heading"><p class="lesson-panel-title">Practice Time</p><h2>Prática variada: ${lesson.practice.length} atividades</h2></div>${renderActivityItems(lesson.practice, `lesson-${lessonNumber}-practice`)}</section>`)
        ];

        const availableLabs = lesson.labs || [];
        const selectedLabs = availableLabs.length > 1
            ? [availableLabs[(lessonNumber - 1) % availableLabs.length]]
            : availableLabs;
        for (const [labIndex, lab] of selectedLabs.entries()) {
            const labItems = lab.items.map(([prompt, hint, answer]) => ['Lab', prompt, hint, answer]);
            slides.push(slide(lab.title, `<section><div class="slide-heading"><p class="lesson-panel-title">Skill Lab</p><h2>${escapeHtml(lab.title)}</h2><p>${escapeHtml(lab.instruction)}</p></div>${renderActivityItems(labItems, `lesson-${lessonNumber}-lab-${labIndex}`)}</section>`));
        }

        slides.push(
            slide('Tradução oral 1', `<section><div class="slide-heading"><p class="lesson-panel-title">Oral Translation</p><h2>Seis frases de recuperação</h2><p>Traduza oralmente cada frase antes de conferir o modelo.</p></div>${renderTranslationItems(lesson.translations, `lesson-${lessonNumber}-translation-one`)}</section>`),
            slide('Expressões', `<section><div class="slide-heading"><p class="lesson-panel-title">Useful Language</p><h2>Expressões e phrasal verbs</h2></div><div class="expression-grid">${lesson.expressions.map(([phrase, meaning, note, example]) => `<article class="expression-card" data-save-card data-pronounce-text="${escapeHtml(phrase)}" data-card-front="${escapeHtml(phrase)}" data-card-back="${escapeHtml(meaning)} — ${escapeHtml(example)}"><div><strong>${escapeHtml(phrase)}</strong><span>${escapeHtml(meaning)}</span></div><p>${escapeHtml(note)}</p><small>${escapeHtml(example)}</small></article>`).join('')}</div></section>`),
            slide('Mini diálogos', `<section><div class="slide-heading"><p class="lesson-panel-title">Speaking Practice</p><h2>${scaffoldedDialogueStage ? 'Quatro diálogos com apoio em português' : 'Duas situações + missão ao vivo'}</h2></div><div class="dialogue-grid">${selectedDialogues.map((dialogue, index) => `<article class="dialogue-card"><span class="dialogue-number">${index + 1}</span><h3>${escapeHtml(dialogue.title)}</h3>${renderDialogue(dialogue.lines, false, scaffoldedDialogueStage)}</article>`).join('')}</div></section>`),
            slide('Leitura', `<section><div class="slide-heading"><p class="lesson-panel-title">Reading & Comprehension</p><h2>${escapeHtml(lesson.reading.title)}</h2></div>${renderReading(lesson.reading, `lesson-${lessonNumber}`)}</section>`),
            slide('Tradução oral 2', `<section><div class="slide-heading"><p class="lesson-panel-title">Expressions Focus</p><h2>Seis frases com as expressões da aula</h2><p>Traduza oralmente e depois confira uma versão correta.</p></div>${renderTranslationItems(expressionTranslationItems(lesson), `lesson-${lessonNumber}-translation-two`)}</section>`),
            slide('Música', `<section><div class="slide-heading"><p class="lesson-panel-title">Music Moment</p><h2>Área reservada para o trecho musical</h2><p>O trecho autorizado com lacunas será inserido na etapa editorial.</p></div><div class="music-card">${renderMusic(lesson.music, `lesson-${lessonNumber}`)}</div></section>`),
            slide('Homework', `<section>${renderHomework(lesson.homework)}</section>`)
        );

        return slides;
    }

    function reviewSlides(review, lessonNumber) {
        const grammarMidpoint = Math.ceil(review.recap.length / 2);
        const grammarParts = [review.recap.slice(0, grammarMidpoint), review.recap.slice(grammarMidpoint)];
        const slides = [
            slide('Review Mission', `<section class="intro-layout review-intro"><div class="lesson-hero"><p class="lesson-panel-title">Checkpoint</p><h2>${escapeHtml(review.title)}</h2><p class="review-lead">Circuito de consolidação para usar o conteúdo das três lições anteriores em situações concretas.</p>${renderObjectives(review.objectives)}</div><div class="review-route"><p class="lesson-panel-title">Rota da aula</p>${review.stations.map((station, index) => `<div><span>${index + 1}</span><strong>${escapeHtml(station.title.replace(/^Station \d+: |^Mission \d+: /, ''))}</strong></div>`).join('')}</div></section>`),
            slide('Grammar Lab 1', `<section><div class="slide-heading"><p class="lesson-panel-title">Grammar Lab · Parte 1</p><h2>Entenda a escolha antes de praticar</h2><p>Comece pela tabela para comparar forma, uso e exemplo. Depois, leia os blocos completos e faça a checagem oral: a revisão não é uma corrida de regras.</p></div>${renderReviewGrammarTable(grammarParts[0])}${renderReviewGrammarCards(grammarParts[0])}</section>`),
            slide('Grammar Lab 2', `<section><div class="slide-heading"><p class="lesson-panel-title">Grammar Lab · Parte 2</p><h2>Antecipe os erros mais comuns</h2><p>Use a tabela como mapa rápido e as explicações detalhadas para justificar cada resposta, perceber o erro previsível e criar uma frase própria.</p></div>${renderReviewGrammarTable(grammarParts[1])}${renderReviewGrammarCards(grammarParts[1])}</section>`)
        ];

        review.stations.forEach((station, index) => {
            slides.push(slide(station.title, `<section><div class="slide-heading"><p class="lesson-panel-title">Review Circuit ${index + 1}/${review.stations.length}</p><h2>${escapeHtml(station.title)}</h2><p>${escapeHtml(station.instruction)}</p></div>${renderReviewStation(station, lessonNumber, index)}</section>`));
        });

        slides.push(
            slide('Reading Mission', `<section><div class="slide-heading"><p class="lesson-panel-title">Reading Mission</p><h2>${escapeHtml(review.reading.title)}</h2></div>${renderReading(review.reading, `review-${lessonNumber}`)}</section>`),
            slide('Homework Project', `<section>${renderHomework(review.homework)}</section>`)
        );

        return slides;
    }

    function mountSlides(slides) {
        const root = document.getElementById('lesson-root');
        root.innerHTML = slides.map((item, index) => `<div class="slide ${index === 0 ? 'active' : ''} ${escapeHtml(item.className)}" data-title="${escapeHtml(item.title)}">${item.body}</div>`).join('');
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
        const regular = dataSource.lessons[lessonNumber];
        const review = dataSource.reviews[lessonNumber];
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
