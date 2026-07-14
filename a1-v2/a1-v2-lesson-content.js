(function () {
    const dataSource = window.A1V2_DATA;
    if (!dataSource) {
        console.error('A1 V2 data was not loaded.');
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
                <div class="translation-copy"><span class="activity-number">${index + 1}.</span><p>${escapeHtml(pt)}</p></div>
                ${revealButton(answerId, 'Tradução')}
                <p id="${answerId}" class="hidden-answer translation-answer" hidden>${escapeHtml(en)}</p>
            </article>`;
        }).join('')}</div>`;
    }

    function renderObjectives(objectives) {
        return `<ul class="lesson-objectives">${objectives.map((objective) => `<li><i class="fas fa-check" aria-hidden="true"></i><span>${escapeHtml(objective)}</span></li>`).join('')}</ul>`;
    }

    function renderDialogue(lines, intro = false) {
        return `<div class="${intro ? 'intro-dialogue' : 'dialogue-lines'}">${lines.map(([speaker, text], index) => `<div class="dialogue-line">
            <strong class="${index % 2 === 0 ? 'speaker-primary' : 'speaker-secondary'}">${escapeHtml(speaker)}:</strong>
            <p>${escapeHtml(text)}</p>
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

    function renderMusic(music, prefix) {
        return `<div class="music-header">
            <p class="lesson-panel-title">Music Moment</p>
            <h3>${escapeHtml(music.song)}</h3>
            <p>${escapeHtml(music.artist)}</p>
        </div>
        <div class="spotify-frame"><iframe src="https://open.spotify.com/embed/track/${escapeHtml(music.spotifyId)}?utm_source=generator" width="100%" height="152" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Spotify: ${escapeHtml(music.song)}"></iframe></div>
        <div class="music-copy" id="${prefix}-music-copy"><p>${music.lines.map(([line, answer], index) => musicLineWithBlank(line, answer, index)).join(' ')}</p></div>`;
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
        const slides = [
            slide('Objetivos e diálogo', `<section class="intro-layout">
                <div class="lesson-hero"><p class="lesson-panel-title">O que será aprendido nesta lição</p><h2>${escapeHtml(lesson.title)}</h2>${renderObjectives(lesson.objectives)}</div>
                <div class="intro-dialogue-panel"><p class="lesson-panel-title">Introductory Dialogue</p>${renderDialogue(lesson.intro, true)}</div>
            </section>`),
            slide('Vocabulário', `<section><div class="slide-heading"><p class="lesson-panel-title">Vocabulary</p><h2>Flashcards da lição</h2></div><div class="flashcard-grid">${lesson.vocab.map(([word, meaning, example], index) => `<button type="button" class="flashcard" data-flashcard aria-pressed="false"><span class="flashcard-inner"><span class="flashcard-front"><span class="flashcard-index">${String(index + 1).padStart(2, '0')}</span><strong>${escapeHtml(word)}</strong><small>${escapeHtml(example)}</small></span><span class="flashcard-back"><strong>${escapeHtml(meaning)}</strong><small>${escapeHtml(example)}</small></span></span></button>`).join('')}</div></section>`),
            slide('Gramática', `<section><div class="slide-heading"><p class="lesson-panel-title">Deep Grammar</p><h2>${escapeHtml(lesson.grammar.title)}</h2></div>${renderGrammar(lesson.grammar)}</section>`),
            slide('Prática', `<section><div class="slide-heading"><p class="lesson-panel-title">Practice Time</p><h2>10 atividades objetivas</h2></div>${renderActivityItems(lesson.practice, `lesson-${lessonNumber}-practice`)}</section>`)
        ];

        for (const [labIndex, lab] of (lesson.labs || []).entries()) {
            const labItems = lab.items.map(([prompt, hint, answer]) => ['Lab', prompt, hint, answer]);
            slides.push(slide(lab.title, `<section><div class="slide-heading"><p class="lesson-panel-title">Skill Lab</p><h2>${escapeHtml(lab.title)}</h2><p>${escapeHtml(lab.instruction)}</p></div>${renderActivityItems(labItems, `lesson-${lessonNumber}-lab-${labIndex}`)}</section>`));
        }

        slides.push(
            slide('Tradução oral 1', `<section><div class="slide-heading"><p class="lesson-panel-title">Oral Translation</p><h2>Português → Inglês</h2><p>Traduza oralmente cada frase antes de conferir o modelo.</p></div>${renderTranslationItems(lesson.translations, `lesson-${lessonNumber}-translation-one`)}</section>`),
            slide('Expressões', `<section><div class="slide-heading"><p class="lesson-panel-title">Useful Language</p><h2>Expressões e phrasal verbs</h2></div><div class="expression-grid">${lesson.expressions.map(([phrase, meaning, note, example]) => `<article class="expression-card"><div><strong>${escapeHtml(phrase)}</strong><span>${escapeHtml(meaning)}</span></div><p>${escapeHtml(note)}</p><small>${escapeHtml(example)}</small></article>`).join('')}</div></section>`),
            slide('Mini diálogos', `<section><div class="slide-heading"><p class="lesson-panel-title">Speaking Practice</p><h2>Quatro situações do dia a dia</h2></div><div class="dialogue-grid">${lesson.dialogues.map((dialogue, index) => `<article class="dialogue-card"><span class="dialogue-number">${index + 1}</span><h3>${escapeHtml(dialogue.title)}</h3>${renderDialogue(dialogue.lines)}</article>`).join('')}</div></section>`),
            slide('Leitura', `<section><div class="slide-heading"><p class="lesson-panel-title">Reading & Comprehension</p><h2>${escapeHtml(lesson.reading.title)}</h2></div>${renderReading(lesson.reading, `lesson-${lessonNumber}`)}</section>`),
            slide('Tradução oral 2', `<section><div class="slide-heading"><p class="lesson-panel-title">Expressions Focus</p><h2>Tradução com as expressões da aula</h2><p>Traduza oralmente e depois confira uma versão correta.</p></div>${renderTranslationItems(lesson.expressionTranslations, `lesson-${lessonNumber}-translation-two`)}</section>`),
            slide('Música', `<section><div class="slide-heading"><p class="lesson-panel-title">Music Moment</p><h2>Ouça, acompanhe e complete</h2></div><div class="music-card">${renderMusic(lesson.music, `lesson-${lessonNumber}`)}</div></section>`),
            slide('Homework', `<section>${renderHomework(lesson.homework)}</section>`)
        );

        return slides;
    }

    function reviewSlides(review, lessonNumber) {
        const slides = [
            slide('Review Mission', `<section class="intro-layout review-intro"><div class="lesson-hero"><p class="lesson-panel-title">Checkpoint</p><h2>${escapeHtml(review.title)}</h2><p class="review-lead">Circuito de consolidação para usar o conteúdo das três lições anteriores em situações concretas.</p>${renderObjectives(review.objectives)}</div><div class="review-route"><p class="lesson-panel-title">Rota da aula</p>${review.stations.map((station, index) => `<div><span>${index + 1}</span><strong>${escapeHtml(station.title.replace(/^Station \d+: |^Mission \d+: /, ''))}</strong></div>`).join('')}</div></section>`),
            slide('Grammar Map', `<section><div class="slide-heading"><p class="lesson-panel-title">Grammar Map</p><h2>Relembre antes do circuito</h2></div><div class="lesson-table-scroll"><table class="grammar-table review-table"><thead><tr><th>Foco</th><th>Lembrete</th><th>Exemplo</th></tr></thead><tbody>${review.recap.map(([focus, reminder, example]) => `<tr><td><strong>${escapeHtml(focus)}</strong></td><td>${escapeHtml(reminder)}</td><td>${escapeHtml(example)}</td></tr>`).join('')}</tbody></table></div></section>`)
        ];

        review.stations.forEach((station, index) => {
            slides.push(slide(station.title, `<section><div class="slide-heading"><p class="lesson-panel-title">Review Circuit ${index + 1}/${review.stations.length}</p><h2>${escapeHtml(station.title)}</h2><p>${escapeHtml(station.instruction)}</p></div>${renderActivityItems(station.items, `review-${lessonNumber}-station-${index}`)}</section>`));
        });

        slides.push(
            slide('Reading Mission', `<section><div class="slide-heading"><p class="lesson-panel-title">Reading Mission</p><h2>${escapeHtml(review.reading.title)}</h2></div>${renderReading(review.reading, `review-${lessonNumber}`)}</section>`),
            slide('Music Review', `<section><div class="slide-heading"><p class="lesson-panel-title">Music Review</p><h2>Palavras do checkpoint em contexto</h2></div><div class="music-card">${renderMusic(review.music, `review-${lessonNumber}`)}</div></section>`),
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
                    const saved = await window.markLessonAsComplete('a1-v2', lessonNumber);
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
        document.title = `A1 V2 | Lição ${padded}: ${content.title}`;
        document.getElementById('lesson-title').textContent = `A1 V2 · Lição ${padded}: ${content.title}`;
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
