document.addEventListener('DOMContentLoaded', () => {
    const lessonNumber = getLessonNumberFromPath();
    const lesson = Array.isArray(window.PREPB1_LESSONS)
        ? window.PREPB1_LESSONS.find(item => item.number === lessonNumber)
        : null;
    const root = document.getElementById('slides-root');

    if (!lesson || !root) {
        if (root) {
            root.innerHTML = `
                <section class="slide active" data-title="Erro">
                    <div class="surface lesson-stage p-8 text-center">
                        <h2 class="text-3xl font-black text-slate-900">Lição não encontrada</h2>
                        <p class="text-slate-600 mt-3">Não foi possível carregar os dados desta aula preparatória.</p>
                    </div>
                </section>
            `;
        }
        return;
    }

    root.innerHTML = lesson.slides
        .map((slide, index) => renderSlide(slide, lesson, index))
        .join('');

    document.getElementById('lesson-title').textContent = `Bridge - Lesson ${lesson.number}: ${lesson.title}`;
    document.title = `Bridge - Lesson ${lesson.number}: ${lesson.title} | Inglês no seu Ritmo`;

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
        grammar: renderGrammarSlide,
        languageBank: renderLanguageBankSlide,
        practice: renderPracticeSlide,
        reading: renderReadingSlide,
        readingQuestions: renderReadingQuestionsSlide,
        microReading: renderMicroReadingSlide,
        teacherListening: renderTeacherListeningSlide,
        translation: renderTranslationSlide,
        speaking: renderSpeakingSlide,
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
                                <strong>${escapeHtml(text)}</strong>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `, 'opening-slide');
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
    `);
}

function renderLanguageBankSlide(slide, lesson, slideIndex) {
    const items = Array.isArray(slide.items) ? slide.items : [];

    return slideSection(slide, slideIndex, `
        <div class="lesson-stage">
            ${renderSlideHeading('fa-comments', 'Language bank', slide.title, slide.intro)}
            <div class="phrase-grid mt-7">
                ${items.map(item => `
                    <article class="phrase-card">
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

function renderReadingSlide(slide, lesson, slideIndex) {
    const paragraphs = Array.isArray(slide.paragraphs) ? slide.paragraphs : [];
    const vocabulary = Array.isArray(slide.vocabulary) ? slide.vocabulary : [];

    return slideSection(slide, slideIndex, `
        <div class="lesson-stage">
            ${renderSlideHeading('fa-book-open', slide.genre || 'Reading', slide.title, 'Leia primeiro para entender a sequência geral; depois volte ao texto para localizar evidências.')}
            <div class="reading-layout mt-7">
                <article class="reading-block prep-reading-text">
                    ${paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}
                </article>
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
    `);
}

function renderReadingQuestionsSlide(slide, lesson, slideIndex) {
    const questions = Array.isArray(slide.questions) ? slide.questions : [];

    return slideSection(slide, slideIndex, `
        <div class="lesson-stage">
            ${renderSlideHeading('fa-magnifying-glass', 'Reading evidence', slide.title, 'Responda com informação do texto. Revele a resposta depois que o aluno localizar a evidência.')}
            <div class="question-list mt-7">
                ${questions.map((item, index) => renderOpenQuestion(item, lesson.number, slideIndex, index, 'reading')).join('')}
            </div>
        </div>
    `);
}

function renderMicroReadingSlide(slide, lesson, slideIndex) {
    const texts = Array.isArray(slide.texts) ? slide.texts : [];
    const questions = Array.isArray(slide.questions) ? slide.questions : [];

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
    const questions = Array.isArray(slide.questions) ? slide.questions : [];
    const scriptId = `listening-script-${lesson.number}-${slideIndex}`;

    return slideSection(slide, slideIndex, `
        <div class="lesson-stage">
            ${renderSlideHeading('fa-ear-listen', 'Teacher-read listening', slide.title, slide.setup)}
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
    const rounds = Array.isArray(slide.rounds) ? slide.rounds : [];
    const languageBank = Array.isArray(slide.languageBank) ? slide.languageBank : [];
    const teacherFocus = Array.isArray(slide.teacherFocus) ? slide.teacherFocus : [];

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
                            <div class="mt-4">
                                ${renderRevealButton(modelId, 'Revelar modelo', 'Ocultar modelo', 'fa-lightbulb')}
                            </div>
                            <div id="${modelId}" class="model-answer prep-answer hidden mt-4">
                                <p class="prep-answer-label">Model after the first attempt</p>
                                <p>${escapeHtml(round.model)}</p>
                            </div>
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
