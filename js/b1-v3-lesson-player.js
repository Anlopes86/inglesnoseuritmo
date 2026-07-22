document.addEventListener('DOMContentLoaded', () => {
    const lessonNumber = getLessonNumberFromPath();
    const lesson = Array.isArray(window.B1_V3_LESSONS)
        ? window.B1_V3_LESSONS.find(item => item.number === lessonNumber)
        : null;
    const root = document.getElementById('slides-root');

    if (!lesson || !root) {
        if (root) {
            root.innerHTML = `
                <section class="slide active" data-title="Erro">
                    <div class="surface lesson-stage p-8 text-center">
                        <h2 class="text-3xl font-black text-slate-900">Lição não encontrada</h2>
                        <p class="text-slate-600 mt-3">Não foi possível carregar os dados desta aula do módulo B1.</p>
                    </div>
                </section>
            `;
        }
        return;
    }

    root.innerHTML = lesson.slides
        .map((slide, index) => renderSlide(slide, lesson, index))
        .join('');

    document.getElementById('lesson-title').textContent = `B1-V3 - Lição ${lesson.number}: ${lesson.title}`;
    document.title = `B1-V3 - Lição ${lesson.number}: ${lesson.title} | Inglês no seu Ritmo`;

    const slideEls = Array.from(root.querySelectorAll('.slide'));
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishLessonBtn = document.getElementById('finish-lesson-btn');
    const progressBar = document.getElementById('progress-bar');
    const slideCounter = document.getElementById('slide-counter');
    const slideTitleHeader = document.getElementById('slide-title-header');
    let currentSlide = 0;

    function showSlide(index) {
        if (!slideEls[index]) return;

        currentSlide = index;
        slideEls.forEach((slide, slideIndex) => {
            slide.classList.toggle('active', slideIndex === index);
            slide.setAttribute('aria-hidden', slideIndex === index ? 'false' : 'true');
        });

        const total = slideEls.length;
        progressBar.style.width = `${((index + 1) / total) * 100}%`;
        slideCounter.textContent = `${index + 1} / ${total}`;
        slideTitleHeader.textContent = slideEls[index].dataset.title || '';
        prevBtn.disabled = index === 0;

        const isLast = index === total - 1;
        nextBtn.classList.toggle('hidden', isLast);
        finishLessonBtn.classList.toggle('hidden', !isLast);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    root.addEventListener('click', event => {
        const vocabCard = event.target.closest('.b1-vocab-card');
        if (vocabCard) {
            const flipped = vocabCard.getAttribute('aria-pressed') !== 'true';
            vocabCard.setAttribute('aria-pressed', flipped ? 'true' : 'false');
            vocabCard.classList.toggle('flipped', flipped);
            return;
        }

        const revealBtn = event.target.closest('.reveal-btn');
        if (revealBtn) {
            toggleReveal(revealBtn);
            return;
        }

        const optionBtn = event.target.closest('.prep-option-btn');
        if (optionBtn) {
            const group = optionBtn.dataset.group;
            root.querySelectorAll(`.prep-option-btn[data-group="${cssEscape(group)}"]`).forEach(button => {
                button.classList.toggle('selected', button === optionBtn);
                button.setAttribute('aria-pressed', button === optionBtn ? 'true' : 'false');
            });
            return;
        }

        const checklistBtn = event.target.closest('.prep-check-btn');
        if (checklistBtn) {
            const selected = checklistBtn.getAttribute('aria-pressed') !== 'true';
            checklistBtn.setAttribute('aria-pressed', selected ? 'true' : 'false');
            checklistBtn.classList.toggle('selected', selected);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) showSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        if (currentSlide < slideEls.length - 1) showSlide(currentSlide + 1);
    });

    showSlide(0);
});

function renderSlide(slide, lesson, slideIndex) {
    const renderers = {
        opening: renderOpeningSlide,
        vocabulary: renderVocabularySlide,
        grammar: renderGrammarSlide,
        reviewGame: renderReviewGameSlide,
        languageBank: renderLanguageBankSlide,
        practice: renderPracticeSlide,
        dialogues: renderDialoguesSlide,
        reading: renderReadingSlide,
        microReading: renderMicroReadingSlide,
        teacherListening: renderTeacherListeningSlide,
        translation: renderTranslationSlide,
        speaking: renderSpeakingSlide,
        music: renderMusicSlide,
        assessment: renderAssessmentSlide,
        homework: renderHomeworkSlide
    };

    const renderer = renderers[slide.type];
    if (!renderer) {
        return renderUnknownSlide(slide, lesson, slideIndex);
    }

    return renderer(slide, lesson, slideIndex);
}

function slideSection(slide, slideIndex, content, classes = '') {
    const activeClass = slideIndex === 0 ? ' active' : '';
    return `
        <section class="slide${activeClass} ${classes}" data-title="${escapeAttribute(slide.title || '')}" data-slide-type="${escapeAttribute(slide.type || '')}" aria-hidden="${slideIndex === 0 ? 'false' : 'true'}">
            ${content}
        </section>
    `;
}

function renderOpeningSlide(slide, lesson, slideIndex) {
    const objectives = Array.isArray(slide.objectives) ? slide.objectives : [];
    const dialogue = slide.dialogue || {};
    const lines = Array.isArray(dialogue.lines) ? dialogue.lines : [];

    return slideSection(slide, slideIndex, `
        <div class="hero-card lesson-stage p-7 md:p-9">
            <div class="opening-heading">
                <p class="prep-eyebrow"><i class="fas fa-route"></i> ${escapeHtml(lesson.unit)}</p>
                <h2 class="prep-display-title mt-3">${escapeHtml(slide.title || lesson.title)}</h2>
                <p class="text-lg text-slate-600 mt-4 max-w-4xl">${escapeHtml(lesson.objective)}</p>
                <div class="flex flex-wrap gap-2 mt-5">
                    <span class="chip"><i class="fas fa-layer-group"></i> ${escapeHtml(lesson.focus)}</span>
                    <span class="chip"><i class="fas fa-arrow-trend-up"></i> ${escapeHtml(lesson.cefr)}</span>
                </div>
            </div>

            <div class="opening-grid mt-8">
                <div class="opening-objectives">
                    <p class="prep-section-label">O que será trabalhado</p>
                    <div class="grid gap-3 mt-4">
                        ${objectives.map(objective => `
                            <div class="prep-objective-row">
                                <i class="fas fa-check-circle"></i>
                                <span>${escapeHtml(objective)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="opening-dialogue">
                    <p class="prep-section-label">Introductory dialogue</p>
                    <h3 class="text-xl font-black text-slate-900 mt-2">${escapeHtml(dialogue.title || 'Everyday conversation')}</h3>
                    <div class="dialogue-lines mt-5">
                        ${lines.map(([speaker, text]) => `
                            <div class="dialogue-line">
                                <span class="dialogue-speaker">${escapeHtml(speaker)}:</span>
                                <div class="v3-dialogue-utterance">
                                    <strong>${escapeHtml(text)}</strong>
                                    <button type="button" class="v3-speak-btn" data-v3-speak="${escapeAttribute(text)}" aria-label="Ouvir: ${escapeAttribute(text)}" title="Ouvir frase em inglês"><i class="fas fa-volume-up" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `, 'opening-slide');
}

function renderVocabularySlide(slide, lesson, slideIndex) {
    const items = Array.isArray(slide.items) ? slide.items : [];

    return slideSection(slide, slideIndex, `
        <div class="lesson-stage">
            ${renderSlideHeading('fa-layer-group', 'Vocabulary', slide.title, slide.intro || 'Clique em cada cartão para ver o significado e um exemplo em contexto.')}
            <div class="b1-vocab-grid mt-7">
                ${items.map(item => {
                    const [term, type, meaning, example] = Array.isArray(item)
                        ? item
                        : [item.term, item.type, item.meaning, item.example];
                    return `
                        <article class="b1-vocab-card" data-save-card data-card-front="${escapeAttribute(term)}" data-card-back="${escapeAttribute(meaning)}" role="button" tabindex="0" aria-pressed="false">
                            <span class="b1-vocab-inner">
                                <span class="b1-vocab-face b1-vocab-front">
                                    <span class="prep-section-label">${escapeHtml(type || 'Expression')}</span>
                                    <strong>${escapeHtml(term)}</strong>
                                    <span class="b1-vocab-cue"><i class="fas fa-rotate"></i> Ver significado</span>
                                </span>
                                <span class="b1-vocab-face b1-vocab-back">
                                    <strong>${escapeHtml(meaning)}</strong>
                                    <span class="v3-card-example-translation" data-v3-translate="${escapeAttribute(example)}"></span>
                                </span>
                            </span>
                        </article>
                    `;
                }).join('')}
            </div>
        </div>
    `);
}

function renderGrammarSlide(slide, lesson, slideIndex) {
    const tables = Array.isArray(slide.tables) ? slide.tables : [];
    const notes = Array.isArray(slide.notes) ? slide.notes : [];

    return slideSection(slide, slideIndex, `
        <div class="lesson-stage">
            ${renderSlideHeading('fa-table-list', 'Grammar review', slide.title, slide.intro)}
            <div class="grammar-grid mt-7">
                ${tables.map(table => `
                    <div class="grammar-panel">
                        <h3 class="text-xl font-black text-slate-900">${escapeHtml(table.title)}</h3>
                        <div class="lesson-table-scroll mt-4">
                            <table class="prep-table">
                                <thead>
                                    <tr>${(table.headers || []).map(header => `<th>${escapeHtml(header)}</th>`).join('')}</tr>
                                </thead>
                                <tbody>
                                    ${(table.rows || []).map(row => `
                                        <tr>${row.map((cell, index) => `<${index === 0 ? 'th' : 'td'}>${escapeHtml(cell)}</${index === 0 ? 'th' : 'td'}>`).join('')}</tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `).join('')}
            </div>
            ${notes.length ? `
                <div class="prep-note-band mt-6">
                    ${notes.map(note => `
                        <div class="prep-note-item"><i class="fas fa-circle-info"></i><span>${escapeHtml(note)}</span></div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `, [8, 16, 24, 32].includes(lesson.number) ? 'review-grammar-slide' : '');
}

function b1MemoryPairs(lessonNumber, fallbackPairs) {
    const curated = {
        8: [
            ['Have you ever been to Hillford?', 'Yes, I went there last May.'],
            ['What were you doing when the train was cancelled?', 'I was waiting on platform three.'],
            ['Are you used to changing plans quickly?', "I'm getting better at it."],
            ['What had happened before you arrived?', 'My friends had moved lunch to a later time.'],
            ['What are you doing next month?', "We're going back to Hillford."],
            ['What will you do if tickets are available?', "We'll book the early train."]
        ],
        32: [
            ['The main issue is...', '...that the current process causes delays.'],
            ['According to the survey...', '...most users prefer a simpler form.'],
            ['You may be concerned that...', '...the trial will cost too much.'],
            ['The result can be measured...', '...by comparing cancellation rates.'],
            ['If the trial works...', '...we can expand it next month.'],
            ['To sum up...', '...I recommend a four-week pilot.']
        ]
    }[lessonNumber];
    if (!curated) return fallbackPairs;
    return curated.map(([cue, answer], index) => ({ id: String(index), cue, answer }));
}

function renderReviewGameSlide(slide, lesson, slideIndex) {
    const items = Array.isArray(slide.items) ? slide.items : [];
    const pairs = items.map((item, index) => ({ id: String(index), cue: `${getPracticeKindMeta(item.kind).label}: ${item.prompt}`, answer: item.answer }));
    let gameBody = '';

    if (slide.game === 'memory') {
        const memoryPairs = b1MemoryPairs(lesson.number, pairs);
        const cards = memoryPairs.map(pair => ({ ...pair, copy: pair.cue })).concat([...memoryPairs].reverse().map(pair => ({ ...pair, copy: pair.answer })));
        gameBody = `<div class="v3-review-game" data-v3-memory-board><div class="v3-review-game-head"><div><strong>Memory Challenge</strong><span>Forme a pergunta com sua resposta ou complete a linha de raciocínio.</span></div><i class="fas fa-clone"></i></div><div class="v3-memory-grid">${cards.map(card => `<button type="button" class="v3-memory-card" data-v3-memory-card data-pair-id="${escapeAttribute(card.id)}"><span class="v3-memory-cover"><i class="fas fa-question"></i></span><span class="v3-memory-copy">${escapeHtml(card.copy)}</span></button>`).join('')}</div><p class="v3-review-feedback" data-v3-game-feedback>Vire duas cartas por vez. Ao acertar, produza uma continuação própria.</p></div>`;
    } else if (slide.game === 'matching') {
        gameBody = `<div class="v3-review-game" data-v3-match-board><div class="v3-review-game-head"><div><strong>Match the Ideas</strong><span>Ligue cada desafio à solução e justifique a forma escolhida.</span></div><i class="fas fa-link"></i></div><div class="v3-match-grid"><div class="v3-match-column">${pairs.map(pair => `<button type="button" class="v3-match-option" data-v3-match-option data-side="left" data-pair-id="${escapeAttribute(pair.id)}">${escapeHtml(pair.cue)}</button>`).join('')}</div><div class="v3-match-column">${[...pairs].reverse().map(pair => `<button type="button" class="v3-match-option" data-v3-match-option data-side="right" data-pair-id="${escapeAttribute(pair.id)}">${escapeHtml(pair.answer)}</button>`).join('')}</div></div><p class="v3-review-feedback" data-v3-game-feedback>Comece por qualquer coluna.</p></div>`;
    } else if (slide.game === 'hangman') {
        gameBody = `<div class="v3-review-game"><div class="v3-review-game-head"><div><strong>Grammar Hangman</strong><span>Descubra a resposta a partir da pista e do contexto.</span></div><i class="fas fa-spell-check"></i></div><div class="v3-hangman-list">${pairs.map(pair => `<article class="v3-hangman-round" data-v3-hangman data-answer="${escapeAttribute(pair.answer)}"><p class="v3-hangman-hint">${escapeHtml(pair.cue)}</p><div class="v3-hangman-mask" data-v3-hangman-mask>${escapeHtml([...String(pair.answer)].map(character => /[a-z]/i.test(character) ? '_' : character).join(' '))}</div><div class="v3-game-actions"><button type="button" class="v3-game-action" data-v3-hangman-action="letter">Revelar letra</button><button type="button" class="v3-game-action" data-v3-hangman-action="answer">Mostrar resposta</button></div></article>`).join('')}</div></div>`;
    } else {
        gameBody = `<div class="v3-review-game"><div class="v3-review-game-head"><div><strong>Sentence Builder</strong><span>Reconstrua a resposta e depois crie uma versão mais pessoal.</span></div><i class="fas fa-cubes"></i></div><div class="v3-hangman-list">${pairs.map(pair => {
            const words = String(pair.answer).replace(/[?.!,]/g, '').split(/\s+/).filter(Boolean).reverse();
            return `<article class="v3-builder-round" data-v3-builder data-words=""><p class="v3-hangman-hint">${escapeHtml(pair.cue)}</p><div class="v3-builder-output" data-v3-builder-output>Monte a frase aqui.</div><div class="v3-builder-bank">${words.map(word => `<button type="button" class="v3-word-chip" data-v3-word-chip data-word="${escapeAttribute(word)}">${escapeHtml(word)}</button>`).join('')}</div><div class="v3-game-actions"><button type="button" class="v3-game-action" data-v3-builder-reset>Recomeçar</button></div></article>`;
        }).join('')}</div></div>`;
    }

    return slideSection(slide, slideIndex, `<div class="lesson-stage">${renderSlideHeading('fa-gamepad', 'Interactive review', slide.title, slide.intro)}<div class="mt-7">${gameBody}</div><div class="prep-note-band mt-6"><div class="prep-note-item"><i class="fas fa-microphone"></i><span>Depois do jogo, escolha dois itens e produza respostas novas sem repetir o modelo.</span></div></div></div>`, 'review-game-slide');
}

function renderLanguageBankSlide(slide, lesson, slideIndex) {
    const items = Array.isArray(slide.items) ? slide.items : [];

    return slideSection(slide, slideIndex, `
        <div class="lesson-stage">
            ${renderSlideHeading('fa-comments', 'Language bank', slide.title, slide.intro)}
            <div class="phrase-grid mt-7">
                ${items.map(item => `
                    <article class="phrase-card" data-save-card data-pronounce-text="${escapeAttribute(item.term)}" data-card-front="${escapeAttribute(item.term)}" data-card-back="${escapeAttribute(item.meaning)} — ${escapeAttribute(item.example)}">
                        <p class="phrase-term">${escapeHtml(item.term)}</p>
                        <p class="text-sm font-semibold text-amber-700 mt-2">${escapeHtml(item.meaning)}</p>
                        <p class="text-slate-700 mt-4">${escapeHtml(item.example)}</p>
                    </article>
                `).join('')}
            </div>
        </div>
    `);
}

function renderPracticeSlide(slide, lesson, slideIndex) {
    const items = Array.isArray(slide.items) ? slide.items : [];

    return slideSection(slide, slideIndex, `
        <div class="lesson-stage">
            ${renderSlideHeading('fa-pen-to-square', 'Practice circuit', slide.title, slide.intro)}
            <div class="practice-grid mt-7">
                ${items.map((item, itemIndex) => renderPracticeItem(item, lesson.number, slideIndex, itemIndex)).join('')}
            </div>
        </div>
    `);
}

function renderPracticeItem(item, lessonNumber, slideIndex, itemIndex) {
    const answerId = `practice-answer-${lessonNumber}-${slideIndex}-${itemIndex}`;
    const inputId = `practice-input-${lessonNumber}-${slideIndex}-${itemIndex}`;
    const kindMeta = getPracticeKindMeta(item.kind);
    const options = Array.isArray(item.options) ? item.options : [];
    const group = `practice-option-${lessonNumber}-${slideIndex}-${itemIndex}`;
    const longInputKinds = new Set(['summary', 'transform', 'timeline', 'sequence']);
    const inputControl = options.length
        ? `
            <div class="prep-option-group mt-4" role="group" aria-label="Opções da atividade ${itemIndex + 1}">
                ${options.map(option => `
                    <button type="button" class="prep-option-btn" data-group="${escapeAttribute(group)}" aria-pressed="false">${escapeHtml(option)}</button>
                `).join('')}
            </div>
        `
        : longInputKinds.has(item.kind)
            ? `<textarea id="${inputId}" class="response-input practice-response mt-4" rows="2" aria-label="Resposta da atividade ${itemIndex + 1}" placeholder="Resposta dada pelo aluno"></textarea>`
            : `<input id="${inputId}" class="response-input practice-response mt-4" type="text" aria-label="Resposta da atividade ${itemIndex + 1}" placeholder="Resposta dada pelo aluno">`;

    return `
        <article class="practice-card">
            <div class="practice-card-head">
                <span class="practice-kind"><i class="fas ${kindMeta.icon}"></i> ${kindMeta.label}</span>
                <span class="practice-number">${itemIndex + 1}</span>
            </div>
            <p class="practice-prompt mt-4">${escapeHtml(item.prompt)}</p>
            ${item.hint ? `<p class="practice-hint mt-3"><i class="fas fa-lightbulb"></i> Dica: ${escapeHtml(item.hint)}</p>` : ''}
            ${inputControl}
            <div class="practice-actions mt-4">
                ${renderRevealButton(answerId, 'Revelar resposta', 'Ocultar resposta', 'fa-eye')}
            </div>
            <div id="${answerId}" class="model-answer prep-answer hidden mt-4" aria-live="polite">
                <p class="prep-answer-label">Resposta</p>
                <p>${escapeHtml(item.answer)}</p>
            </div>
        </article>
    `;
}

function renderDialoguesSlide(slide, lesson, slideIndex) {
    const dialogues = Array.isArray(slide.dialogues) ? slide.dialogues : [];
    const indexes = lesson.number % 2 === 0 ? [1, 3] : [0, 2];
    const selectedDialogues = indexes.map((index) => dialogues[index]).filter(Boolean);

    return slideSection(slide, slideIndex, `
        <div class="lesson-stage">
            ${renderSlideHeading('fa-people-arrows', 'Everyday role-play', slide.title, slide.intro || 'Pratique as situações com o professor, trocando os papéis na segunda tentativa.')}
            <div class="b1-dialogue-grid mt-7">
                ${selectedDialogues.map((dialogue, dialogueIndex) => `
                    <article class="b1-dialogue-card">
                        <div class="b1-dialogue-head">
                            <span class="practice-number">${dialogueIndex + 1}</span>
                            <div>
                                <h3>${escapeHtml(dialogue.title)}</h3>
                                ${dialogue.context ? `<p>${escapeHtml(dialogue.context)}</p>` : ''}
                            </div>
                        </div>
                        <div class="dialogue-lines mt-5">
                            ${(dialogue.lines || []).map(([speaker, text]) => `
                                <div class="dialogue-line">
                                    <span class="dialogue-speaker">${escapeHtml(speaker)}:</span>
                                    <div class="v3-dialogue-utterance">
                                        <strong>${escapeHtml(text)}</strong>
                                        <button type="button" class="v3-speak-btn" data-v3-speak="${escapeAttribute(text)}" aria-label="Ouvir: ${escapeAttribute(text)}" title="Ouvir frase em inglês"><i class="fas fa-volume-up" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </article>
                `).join('')}
            </div>
        </div>
    `);
}

function renderReadingSlide(slide, lesson, slideIndex) {
    const paragraphs = Array.isArray(slide.paragraphs) ? slide.paragraphs : [];
    const vocabulary = Array.isArray(slide.vocabulary) ? slide.vocabulary : [];
    const questions = (Array.isArray(slide.questions) ? slide.questions : []).slice(0, 3);

    return slideSection(slide, slideIndex, `
        <div class="lesson-stage">
            ${renderSlideHeading('fa-book-open', slide.genre || 'Reading', slide.title, 'Leia o texto e localize nele as evidências para responder às perguntas ao lado.')}
            <div class="reading-layout mt-7">
                <article class="reading-block prep-reading-text reading-reference-column">
                    ${paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}
                </article>
                <div class="reading-support-column">
                    <section class="reading-check-panel">
                        <p class="prep-section-label">Reading check</p>
                        <h3 class="reading-check-title mt-2">Perguntas de interpretação</h3>
                        <div class="question-list reading-question-list mt-5">
                            ${questions.map((item, index) => renderOpenQuestion(item, lesson.number, slideIndex, index, 'reading')).join('')}
                        </div>
                    </section>
                    <aside class="vocabulary-panel">
                        <p class="prep-section-label">Vocabulary support</p>
                        <div class="grid gap-3 mt-4">
                            ${vocabulary.map(([term, meaning]) => `
                                <div class="vocab-row">
                                    <strong>${escapeHtml(term)}</strong>
                                    <span>${escapeHtml(meaning)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    `);
}

function renderMicroReadingSlide(slide, lesson, slideIndex) {
    const texts = Array.isArray(slide.texts) ? slide.texts : [];
    const questions = (Array.isArray(slide.questions) ? slide.questions : []).slice(0, 3);

    return slideSection(slide, slideIndex, `
        <div class="lesson-stage">
            ${renderSlideHeading('fa-file-lines', 'Practical reading', slide.title, 'Cruze informações de avisos, mensagens, horários e pequenos documentos.')}
            <div class="microtext-grid mt-7">
                ${texts.map(text => `
                    <article class="microtext-card">
                        <p class="prep-section-label">${escapeHtml(text.label)}</p>
                        <p class="text-slate-800 mt-3 leading-7">${escapeHtml(text.text)}</p>
                    </article>
                `).join('')}
            </div>
            <div class="question-list mt-7">
                ${questions.map((item, index) => renderOpenQuestion(item, lesson.number, slideIndex, index, 'micro')).join('')}
            </div>
        </div>
    `);
}

function renderTeacherListeningSlide(slide, lesson, slideIndex) {
    const questions = (Array.isArray(slide.questions) ? slide.questions : []).slice(0, 3);
    const scriptId = `listening-script-${lesson.number}-${slideIndex}`;

    return slideSection(slide, slideIndex, `
        <div class="lesson-stage">
            ${renderSlideHeading('fa-ear-listen', 'Teacher-read listening', slide.title, slide.setup)}
            <div class="v3-live-mission">
                <strong>Protocolo de aplicação</strong>
                <span>1ª leitura: sentido global, sem pausas artificiais. 2ª leitura: detalhes, com ritmo claro. Revele o roteiro somente depois das respostas.</span>
            </div>
            <div class="listening-toolbar mt-6">
                ${renderRevealButton(scriptId, 'Mostrar roteiro', 'Ocultar roteiro', 'fa-file-lines')}
            </div>
            <div id="${scriptId}" class="model-answer listening-script hidden mt-5">
                <p class="prep-answer-label">Roteiro do professor</p>
                <p class="leading-8">${escapeHtml(slide.script)}</p>
            </div>
            <div class="question-list mt-7">
                ${questions.map((item, index) => renderOpenQuestion(item, lesson.number, slideIndex, index, 'listening')).join('')}
            </div>
        </div>
    `);
}

function renderTranslationSlide(slide, lesson, slideIndex) {
    const items = Array.isArray(slide.items) ? slide.items : [];

    return slideSection(slide, slideIndex, `
        <div class="lesson-stage">
            ${renderSlideHeading('fa-language', 'Oral translation', slide.title, 'O aluno traduz oralmente a frase completa. Use o botão apenas depois da tentativa.')}
            <div class="translation-list mt-7">
                ${items.map((item, index) => {
                    const answerId = `translation-answer-${lesson.number}-${slideIndex}-${index}`;
                    return `
                        <article class="translation-row">
                            <div class="translation-source">
                                <span class="translation-number">${index + 1}</span>
                                <strong>${escapeHtml(item.pt)}</strong>
                            </div>
                            <div class="translation-actions">
                                ${renderRevealButton(answerId, 'Ver tradução', 'Ocultar tradução', 'fa-eye')}
                            </div>
                            <div id="${answerId}" class="model-answer prep-answer hidden">
                                <p class="prep-answer-label">Suggested translation</p>
                                <p>${escapeHtml(item.en)}</p>
                            </div>
                        </article>
                    `;
                }).join('')}
            </div>
        </div>
    `);
}

function renderSpeakingSlide(slide, lesson, slideIndex) {
    const rounds = (Array.isArray(slide.rounds) ? slide.rounds : []).map((round, index) => (
        typeof round === 'string'
            ? { title: `Rodada ${index + 1}`, prompt: round }
            : round
    ));
    const languageBank = Array.isArray(slide.languageBank) ? slide.languageBank : [];
    const teacherFocus = Array.isArray(slide.teacherFocus)
        ? slide.teacherFocus
        : slide.teacherFocus
            ? [slide.teacherFocus]
            : [];

    return slideSection(slide, slideIndex, `
        <div class="lesson-stage">
            ${renderSlideHeading('fa-comments', slide.label || 'Live speaking', slide.title, slide.scenario)}
            ${languageBank.length ? `
                <div class="speaking-bank mt-6">
                    ${languageBank.map(item => `<span>${escapeHtml(item)}</span>`).join('')}
                </div>
            ` : ''}
            <div class="speaking-rounds mt-7">
                ${rounds.map((round, index) => {
                    const modelId = `speaking-model-${lesson.number}-${slideIndex}-${index}`;
                    return `
                        <article class="speaking-card">
                            <div class="speaking-card-head">
                                <span class="practice-number">${index + 1}</span>
                                <h3>${escapeHtml(round.title)}</h3>
                            </div>
                            <p class="speaking-prompt mt-4">${escapeHtml(round.prompt)}</p>
                            ${(round.followUps || []).length ? `
                                <div class="follow-up-box mt-4">
                                    <p class="prep-answer-label">Follow-up prompts</p>
                                    <ul>${round.followUps.map(question => `<li>${escapeHtml(question)}</li>`).join('')}</ul>
                                </div>
                            ` : ''}
                            ${round.model ? `
                                <div class="mt-4">
                                    ${renderRevealButton(modelId, 'Revelar modelo', 'Ocultar modelo', 'fa-lightbulb')}
                                </div>
                                <div id="${modelId}" class="model-answer prep-answer hidden mt-4">
                                    <p class="prep-answer-label">Model after the first attempt</p>
                                    <p>${escapeHtml(round.model)}</p>
                                </div>
                            ` : ''}
                        </article>
                    `;
                }).join('')}
            </div>
            <div class="teacher-notes-panel mt-7">
                <div>
                    <p class="prep-section-label">Teacher focus</p>
                    <div class="flex flex-wrap gap-2 mt-3">
                        ${teacherFocus.map(item => `<span class="teacher-focus-chip">${escapeHtml(item)}</span>`).join('')}
                    </div>
                </div>
                <label class="teacher-notes-field">
                    <span>Notas da tentativa ao vivo</span>
                    <textarea class="response-input" rows="3" placeholder="Acertos, correção prioritária e meta para a segunda tentativa"></textarea>
                </label>
            </div>
        </div>
    `);
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

function renderMusicSlide(slide, lesson, slideIndex) {
    const spotifySource = slide.spotifyId
        ? `https://open.spotify.com/embed/track/${encodeURIComponent(slide.spotifyId)}?utm_source=generator`
        : `https://open.spotify.com/embed/search/${encodeURIComponent(`${slide.song || ''} ${slide.artist || ''}`)}`;

    return slideSection(slide, slideIndex, `
        <div class="lesson-stage">
            ${renderSlideHeading('fa-music', 'Music moment', slide.title || `${slide.song} - ${slide.artist}`, slide.focus)}
            <div class="b1-music-layout mt-7">
                <div class="b1-music-player">
                    <p class="prep-section-label">${escapeHtml(slide.song)}</p>
                    <h3>${escapeHtml(slide.artist)}</h3>
                    <iframe
                        src="${escapeAttribute(spotifySource)}"
                        width="100%"
                        height="152"
                        frameborder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title="Spotify: ${escapeAttribute(slide.song)} - ${escapeAttribute(slide.artist)}"
                    ></iframe>
                </div>
                <div class="b1-lyric-panel">
                    ${renderLyricPlaceholder()}
                </div>
            </div>
        </div>
    `);
}

function renderAssessmentSlide(slide, lesson, slideIndex) {
    const criteria = Array.isArray(slide.criteria) ? slide.criteria : [];

    return slideSection(slide, slideIndex, `
        <div class="lesson-stage">
            ${renderSlideHeading('fa-chart-line', 'Teacher assessment', slide.title, slide.intro)}
            <div class="assessment-scale mt-6">
                <span><strong>1</strong> precisa de apoio</span>
                <span><strong>2</strong> em desenvolvimento</span>
                <span><strong>3</strong> pronto para avançar</span>
                <span><strong>4</strong> controle consistente</span>
            </div>
            <div class="assessment-list mt-7">
                ${criteria.map((criterion, index) => `
                    <article class="assessment-row">
                        <div>
                            <p class="text-lg font-black text-slate-900">${escapeHtml(criterion.name)}</p>
                            <p class="text-slate-600 mt-2">${escapeHtml(criterion.descriptor)}</p>
                        </div>
                        <label>
                            <span class="sr-only">Pontuação de ${escapeHtml(criterion.name)}</span>
                            <select class="response-input assessment-select" aria-label="Pontuação de ${escapeAttribute(criterion.name)}">
                                <option value="">Nota</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </label>
                    </article>
                `).join('')}
            </div>
            <label class="teacher-notes-field assessment-notes mt-7">
                <span>Evidências e prioridade de revisão</span>
                <textarea class="response-input" rows="4" placeholder="Registre exemplos observados durante a aula"></textarea>
            </label>
        </div>
    `);
}

function renderHomeworkSlide(slide, lesson, slideIndex) {
    const options = Array.isArray(slide.options) ? slide.options : [];
    const checklist = Array.isArray(slide.checklist) ? slide.checklist : [];

    return slideSection(slide, slideIndex, `
        <div class="lesson-stage homework-stage">
            ${renderSlideHeading('fa-house-laptop', 'Homework', slide.title, slide.deliverable)}
            <div class="homework-options mt-7">
                ${options.map((option, index) => `
                    <article class="homework-card">
                        <span class="homework-option-number">${index + 1}</span>
                        <h3>${escapeHtml(option.title)}</h3>
                        <p>${escapeHtml(option.prompt)}</p>
                    </article>
                `).join('')}
            </div>
            <div class="homework-checklist mt-7">
                <p class="prep-section-label">Antes da próxima aula</p>
                <div class="grid gap-3 mt-4">
                    ${checklist.map(item => `
                        <button type="button" class="prep-check-btn" aria-pressed="false">
                            <i class="fas fa-check"></i><span>${escapeHtml(item)}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `, 'homework-slide');
}

function renderUnknownSlide(slide, lesson, slideIndex) {
    return slideSection(slide, slideIndex, `
        <div class="surface lesson-stage p-8">
            <h2 class="text-3xl font-black text-slate-900">${escapeHtml(slide.title || 'Slide')}</h2>
            <p class="text-slate-600 mt-3">Este conteúdo ainda não possui um formato de exibição.</p>
        </div>
    `);
}

function renderOpenQuestion(item, lessonNumber, slideIndex, index, prefix) {
    const answerId = `${prefix}-answer-${lessonNumber}-${slideIndex}-${index}`;
    const inputId = `${prefix}-input-${lessonNumber}-${slideIndex}-${index}`;

    return `
        <article class="open-question-row">
            <span class="question-index">${index + 1}</span>
            <div class="open-question-main">
                <p class="text-lg font-bold text-slate-900">${escapeHtml(item.question)}</p>
                <textarea id="${inputId}" class="response-input mt-3" rows="2" aria-label="Resposta da questão ${index + 1}" placeholder="Resposta dada pelo aluno"></textarea>
            </div>
            <div class="open-question-action">
                ${renderRevealButton(answerId, 'Ver resposta', 'Ocultar resposta', 'fa-eye')}
            </div>
            <div id="${answerId}" class="model-answer prep-answer hidden open-question-answer">
                <p class="prep-answer-label">Suggested answer</p>
                <p>${escapeHtml(item.answer)}</p>
            </div>
        </article>
    `;
}

function renderSlideHeading(icon, eyebrow, title, intro) {
    return `
        <header class="slide-heading">
            <p class="prep-eyebrow"><i class="fas ${escapeAttribute(icon)}"></i> ${escapeHtml(eyebrow || '')}</p>
            <h2 class="prep-slide-title mt-2">${escapeHtml(title || '')}</h2>
            ${intro ? `<p class="prep-slide-intro mt-3">${escapeHtml(intro)}</p>` : ''}
        </header>
    `;
}

function renderRevealButton(targetId, showLabel, hideLabel, icon) {
    return `
        <button
            type="button"
            class="reveal-btn"
            data-target="${escapeAttribute(targetId)}"
            data-show-label="${escapeAttribute(showLabel)}"
            data-hide-label="${escapeAttribute(hideLabel)}"
            aria-controls="${escapeAttribute(targetId)}"
            aria-expanded="false"
        >
            <i class="fas ${escapeAttribute(icon)}"></i><span>${escapeHtml(showLabel)}</span>
        </button>
    `;
}

function toggleReveal(button) {
    const targetId = button.dataset.target;
    const target = document.getElementById(targetId);
    if (!target) return;

    const willShow = target.classList.contains('hidden');
    target.classList.toggle('hidden', !willShow);
    if (target.classList.contains('music-answer')) {
        const placeholder = target.parentElement?.querySelector('.music-placeholder');
        if (placeholder) placeholder.classList.toggle('hidden', willShow);
    }
    button.setAttribute('aria-expanded', willShow ? 'true' : 'false');

    const label = button.querySelector('span');
    if (label) {
        label.textContent = willShow
            ? button.dataset.hideLabel || 'Ocultar'
            : button.dataset.showLabel || 'Revelar';
    }
}

function getPracticeKindMeta(kind) {
    const kinds = {
        complete: { label: 'Completar', icon: 'fa-pen' },
        choose: { label: 'Escolher', icon: 'fa-list-ul' },
        reorder: { label: 'Desembaralhar', icon: 'fa-arrow-down-1-9' },
        error: { label: 'Encontrar o erro', icon: 'fa-triangle-exclamation' },
        transform: { label: 'Transformar', icon: 'fa-repeat' },
        timeline: { label: 'Ordenar eventos', icon: 'fa-timeline' },
        match: { label: 'Relacionar', icon: 'fa-link' },
        reference: { label: 'Referência', icon: 'fa-magnifying-glass' },
        connector: { label: 'Conector', icon: 'fa-code-branch' },
        sequence: { label: 'Sequência', icon: 'fa-arrow-right' },
        summary: { label: 'Resumir', icon: 'fa-align-left' }
    };

    return kinds[kind] || { label: 'Atividade', icon: 'fa-shapes' };
}

function getLessonNumberFromPath() {
    const path = window.location.pathname.replace(/\\/g, '/');
    const match = path.match(/licao-(\d+)\.html$/i);
    return match ? parseInt(match[1], 10) : null;
}

function cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === 'function') {
        return window.CSS.escape(String(value));
    }

    return String(value).replace(/[^a-zA-Z0-9_-]/g, '\\$&');
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function escapeAttribute(value) {
    return escapeHtml(value);
}
