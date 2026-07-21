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
        <div class="reading-questions">${reading.questions.slice(0, 3).map(([question, answer], index) => {
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

    function renderMusic(music, prefix) {
        return `<div class="music-header">
            <p class="lesson-panel-title">Music Moment</p>
            <h3>${escapeHtml(music.song)}</h3>
            <p>${escapeHtml(music.artist)}</p>
        </div>
        <div class="spotify-frame"><iframe src="https://open.spotify.com/embed/track/${escapeHtml(music.spotifyId)}?utm_source=generator" width="100%" height="152" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Spotify: ${escapeHtml(music.song)}"></iframe></div>
        <div class="v3-lyric-placeholder" id="${prefix}-music-copy">
            <div class="v3-lyric-placeholder-head"><strong>Letra com lacunas — modelo editorial</strong><span>Substitua somente os textos entre colchetes pelo trecho autorizado.</span></div>
            ${Array.from({ length: 6 }, (_, index) => `<label class="v3-lyric-placeholder-line"><small>${index < 3 ? 'Verse 1' : 'Verse 2'} · linha ${(index % 3) + 1}</small><span>[Cole aqui a linha da música com uma <b>________</b>]</span><input type="text" aria-label="Resposta da lacuna musical ${index + 1}" placeholder="Resposta ouvida"></label>`).join('')}
            <p class="v3-copyright-note"><i class="fas fa-shield-halved" aria-hidden="true"></i> Nenhum trecho protegido é distribuído nesta versão.</p>
        </div>`;
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

    function renderCanDoAssessment() {
        const criteria = [
            ['Realização da tarefa', 'Usa as funções revisadas para responder à situação proposta.'],
            ['Interação', 'Pergunta e responde com apoio quando necessário.'],
            ['Clareza', 'Produz fala curta que o interlocutor consegue compreender.'],
            ['Controle prioritário', 'Usa as estruturas do checkpoint sem impedir a comunicação.']
        ];
        return `<div class="v3-can-do-assessment">
            <p class="v3-assessment-scale">Escala: 1 = ainda não &nbsp;·&nbsp; 2 = com bastante apoio &nbsp;·&nbsp; 3 = com pouco apoio &nbsp;·&nbsp; 4 = com autonomia</p>
            ${criteria.map(([title, descriptor]) => `<label class="v3-assessment-row"><span><strong>${title}</strong><span>${descriptor}</span></span><select aria-label="Avaliação: ${title}"><option value="">Selecionar</option><option>1 — Ainda não</option><option>2 — Com apoio</option><option>3 — Quase autônomo</option><option>4 — Autônomo</option></select></label>`).join('')}
            <label class="v3-assessment-notes">Evidência observada e próximo passo<textarea rows="3" placeholder="Registre uma evidência concreta da fala e um foco para a próxima aula."></textarea></label>
        </div>`;
    }

    function reviewSlides(review, lessonNumber) {
        const slides = [
            slide('Review Mission', `<section class="intro-layout review-intro"><div class="lesson-hero"><p class="lesson-panel-title">Checkpoint</p><h2>${escapeHtml(review.title)}</h2><p class="review-lead">Circuito de consolidação para usar o conteúdo das três lições anteriores em situações concretas.</p>${renderObjectives(review.objectives)}</div><div class="review-route"><p class="lesson-panel-title">Rota da aula</p>${review.stations.map((station, index) => `<div><span>${index + 1}</span><strong>${escapeHtml(station.title.replace(/^Station \d+: |^Mission \d+: /, ''))}</strong></div>`).join('')}</div></section>`),
            slide('Grammar Map', `<section><div class="slide-heading"><p class="lesson-panel-title">Grammar Map</p><h2>Relembre antes do circuito</h2></div><div class="lesson-table-scroll"><table class="grammar-table review-table"><thead><tr><th>Foco</th><th>Lembrete</th><th>Exemplo</th></tr></thead><tbody>${review.recap.map(([focus, reminder, example]) => `<tr><td><strong>${escapeHtml(focus)}</strong></td><td>${escapeHtml(reminder)}</td><td>${escapeHtml(example)}</td></tr>`).join('')}</tbody></table></div></section>`)
        ];

        review.stations.forEach((station, index) => {
            slides.push(slide(station.title, `<section><div class="slide-heading"><p class="lesson-panel-title">Review Circuit ${index + 1}/${review.stations.length}</p><h2>${escapeHtml(station.title)}</h2><p>${escapeHtml(station.instruction)}</p></div>${renderActivityItems(station.items.slice(0, 3), `review-${lessonNumber}-station-${index}`)}</section>`));
        });

        slides.push(
            slide('Reading Mission', `<section><div class="slide-heading"><p class="lesson-panel-title">Reading Mission</p><h2>${escapeHtml(review.reading.title)}</h2></div>${renderReading(review.reading, `review-${lessonNumber}`)}</section>`),
            slide('Can-Do Check', `<section><div class="slide-heading"><p class="lesson-panel-title">CEFR Progress Check</p><h2>O que o aluno já consegue fazer?</h2><p>Avalie o desempenho observado durante o circuito, sem introduzir conteúdo novo.</p></div>${renderCanDoAssessment()}</section>`),
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
