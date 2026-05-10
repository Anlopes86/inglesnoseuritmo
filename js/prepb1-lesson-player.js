document.addEventListener('DOMContentLoaded', () => {
    const lessonNumber = getLessonNumberFromPath();
    const lesson = Array.isArray(window.PREPB1_LESSONS) ? window.PREPB1_LESSONS.find(item => item.number === lessonNumber) : null;

    if (!lesson) {
        document.getElementById('slides-root').innerHTML = `
            <div class="surface rounded-[2rem] p-10 text-center">
                <h2 class="text-3xl font-black text-slate-900 mb-3">Lição não encontrada</h2>
                <p class="text-slate-600">Não foi possível carregar os dados desta aula preparatória.</p>
            </div>
        `;
        return;
    }

    const slides = buildSlides(lesson);
    const root = document.getElementById('slides-root');
    root.innerHTML = slides;

    document.getElementById('lesson-title').textContent = `Bridge - Lesson ${lesson.number}: ${lesson.title}`;
    document.title = `Bridge - Lesson ${lesson.number}: ${lesson.title} | Inglês no seu Ritmo`;

    let currentSlide = 0;
    const slideEls = Array.from(document.querySelectorAll('.slide'));
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishLessonBtn = document.getElementById('finish-lesson-btn');
    const progressBar = document.getElementById('progress-bar');
    const slideCounter = document.getElementById('slide-counter');
    const slideTitleHeader = document.getElementById('slide-title-header');

    function speak(text) {
        if (!('speechSynthesis' in window) || !text) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    }

    function showSlide(index) {
        slideEls.forEach((slide, i) => slide.classList.toggle('active', i === index));
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
        const speakBtn = event.target.closest('.speak-btn');
        if (speakBtn) {
            speak(speakBtn.dataset.speak || '');
            return;
        }

        const choiceBtn = event.target.closest('.choice-btn');
        if (choiceBtn) {
            const group = choiceBtn.dataset.group;
            const feedback = document.getElementById(`feedback-${group}`);
            document.querySelectorAll(`[data-group="${group}"]`).forEach(btn => {
                btn.disabled = true;
                const isCorrect = btn.dataset.correct === 'true';
                btn.classList.add(isCorrect ? 'correct' : 'incorrect');
            });
            if (feedback) {
                feedback.textContent = choiceBtn.dataset.feedback || '';
                feedback.className = 'mt-3 text-sm font-semibold text-slate-600';
            }
            return;
        }

        const revealBtn = event.target.closest('.reveal-btn');
        if (revealBtn) {
            const targetId = revealBtn.dataset.target;
            const target = document.getElementById(targetId);
            if (target) target.classList.toggle('hidden');
            return;
        }

        const checkInputBtn = event.target.closest('.check-input-btn');
        if (checkInputBtn) {
            const targetId = checkInputBtn.dataset.target;
            const input = document.getElementById(targetId);
            const feedback = document.getElementById(`${targetId}-feedback`);
            if (!input || !feedback) return;

            const expected = normalizeAnswer(checkInputBtn.dataset.answer || '');
            const actual = normalizeAnswer(input.value || '');
            const isCorrect = actual === expected;
            input.classList.toggle('border-green-500', isCorrect);
            input.classList.toggle('border-red-500', !isCorrect);
            feedback.textContent = isCorrect
                ? 'Correto. Boa recuperacao da forma.'
                : `Revise a dica: ${checkInputBtn.dataset.hint || 'compare com a resposta-modelo.'}`;
            feedback.className = `mt-3 text-sm font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`;
            return;
        }

        const checklistBtn = event.target.closest('.checklist-btn');
        if (checklistBtn) {
            checklistBtn.classList.toggle('bg-teal-100');
            checklistBtn.classList.toggle('border-teal-300');
            checklistBtn.classList.toggle('text-teal-800');
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide -= 1;
            showSlide(currentSlide);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentSlide < slideEls.length - 1) {
            currentSlide += 1;
            showSlide(currentSlide);
        }
    });

    showSlide(0);
});

function getLessonNumberFromPath() {
    const path = window.location.pathname.replace(/\\/g, '/');
    const match = path.match(/licao-(\d+)\.html$/i);
    return match ? parseInt(match[1], 10) : null;
}

function normalizeAnswer(value) {
    return String(value)
        .trim()
        .toLowerCase()
        .replace(/[.!?]+$/g, '')
        .replace(/\s+/g, ' ');
}

function buildSlides(lesson) {
    const variant = lesson.variant || 'default';
    const builders = {
        default: buildDefaultSlides,
        premium_bridge: buildPremiumBridgeSlides,
        advice_lab: buildAdviceLabSlides,
        compare_lab: buildCompareLabSlides,
        service_lab: buildServiceLabSlides,
        final_bridge: buildFinalBridgeSlides
    };

    return (builders[variant] || buildDefaultSlides)(lesson);
}

function buildDefaultSlides(lesson) {
    return `
        ${buildWarmupSlide(lesson)}
        ${buildConversationSlide(lesson)}
        ${buildReadingSlide(lesson)}
        ${buildComprehensionSlide(lesson)}
        ${buildResponseSlide(lesson)}
        ${buildSpeakingSlide(lesson)}
        ${buildCompleteSlide(lesson)}
    `;
}

function buildPremiumBridgeSlides(lesson) {
    return `
        ${buildWarmupSlide(lesson)}
        ${buildGrammarSlide(lesson)}
        ${buildControlledPracticeSlide(lesson)}
        ${buildReadingSlide(lesson)}
        ${buildComprehensionSlide(lesson)}
        ${buildTranslationSlide(lesson)}
        ${buildPersonalQuestionsSlide(lesson)}
        ${buildSpeakingSlide(lesson)}
        ${buildCompleteSlide(lesson)}
    `;
}

function buildAdviceLabSlides(lesson) {
    return `
        ${buildWarmupSlide(lesson)}
        ${buildReadingSlide(lesson)}
        <section class="slide" data-title="Healthy Choices">
            <div class="surface rounded-[2rem] p-8">
                <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Healthy choices</p>
                <h3 class="text-3xl font-black text-slate-900 mt-2">${lesson.activityTitle}</h3>
                <div class="grid lg:grid-cols-3 gap-6 mt-8">
                    ${lesson.activityCards.map((item, index) => `
                        <div class="question-card rounded-[1.5rem] p-6">
                            <p class="text-sm uppercase tracking-[0.18em] text-amber-600 font-bold">Card ${index + 1}</p>
                            <p class="text-lg font-semibold text-slate-800 mt-3">${item.situation}</p>
                            <p class="text-slate-600 mt-4">${item.task}</p>
                            <button type="button" class="reveal-btn mt-5" data-target="advice-${lesson.number}-${index}">
                                <i class="fas fa-lightbulb"></i> Ver ideia-modelo
                            </button>
                            <div id="advice-${lesson.number}-${index}" class="model-answer hidden rounded-[1rem] p-4 mt-4">
                                <p class="text-sm font-bold uppercase tracking-[0.15em]">Model answer</p>
                                <p class="mt-3">${item.model}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ${buildComprehensionSlide(lesson)}
        <section class="slide" data-title="Weekly Planner">
            <div class="surface rounded-[2rem] p-8">
                <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Planner task</p>
                <h3 class="text-3xl font-black text-slate-900 mt-2">${lesson.plannerTitle}</h3>
                <div class="grid lg:grid-cols-2 gap-6 mt-8">
                    ${lesson.plannerPrompts.map((item, index) => `
                        <div class="response-card rounded-[1.5rem] p-6">
                            <p class="text-sm uppercase tracking-[0.18em] text-amber-600 font-bold">Plan ${index + 1}</p>
                            <p class="text-lg font-semibold text-slate-800 mt-3">${item.prompt}</p>
                            <p class="text-sm text-slate-500 mt-3">${item.tip}</p>
                            <textarea class="response-input mt-5" placeholder="${item.placeholder}"></textarea>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ${buildSpeakingSlide(lesson)}
        ${buildCompleteSlide(lesson)}
    `;
}

function buildGrammarSlide(lesson) {
    const grammar = lesson.grammar || {};
    const examples = Array.isArray(grammar.examples) ? grammar.examples : [];

    return `
        <section class="slide" data-title="Grammar Review">
            <div class="surface rounded-[2rem] p-8">
                <div class="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
                    <div>
                        <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Grammar review</p>
                        <h3 class="text-3xl font-black text-slate-900 mt-2">${grammar.title || lesson.focus}</h3>
                        <p class="text-lg text-slate-700 mt-5 leading-8">${grammar.rule || lesson.objective}</p>
                        <div class="mt-6 p-5 rounded-2xl bg-teal-50 border border-teal-100">
                            <p class="text-sm uppercase tracking-[0.18em] text-teal-700 font-bold">Dica de regra</p>
                            <p class="text-slate-700 mt-3">${grammar.source || 'Revise a regra e aplique em respostas curtas antes de produzir fala longa.'}</p>
                        </div>
                    </div>
                    <div class="space-y-4">
                        ${examples.map((example, index) => `
                            <div class="question-card rounded-[1.5rem] p-5">
                                <p class="text-sm uppercase tracking-[0.18em] text-amber-600 font-bold">Example ${index + 1}</p>
                                <p class="text-xl font-bold text-slate-900 mt-3">${example[0]}</p>
                                <p class="text-slate-600 mt-2">${example[1]}</p>
                                <button class="speak-btn mt-4" data-speak="${escapeAttribute(example[0])}">
                                    <i class="fas fa-volume-up"></i> Ouvir
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>
    `;
}

function buildControlledPracticeSlide(lesson) {
    const practice = Array.isArray(lesson.practice) ? lesson.practice : [];

    return `
        <section class="slide" data-title="Practice">
            <div class="surface rounded-[2rem] p-8">
                <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Controlled practice</p>
                <h3 class="text-3xl font-black text-slate-900 mt-2">Complete, check and adjust</h3>
                <div class="grid lg:grid-cols-3 gap-6 mt-8">
                    ${practice.map((item, index) => {
                        const inputId = `practice-${lesson.number}-${index}`;
                        return `
                            <div class="response-card rounded-[1.5rem] p-6">
                                <p class="text-sm uppercase tracking-[0.18em] text-amber-600 font-bold">Gap ${index + 1}</p>
                                <p class="text-lg font-semibold text-slate-800 mt-3">${item.prompt}</p>
                                <input id="${inputId}" class="response-input mt-5 min-h-0 h-14" type="text" placeholder="Type your answer">
                                <button
                                    type="button"
                                    class="check-input-btn reveal-btn mt-4"
                                    data-target="${inputId}"
                                    data-answer="${escapeAttribute(item.answer)}"
                                    data-hint="${escapeAttribute(item.hint || '')}"
                                >
                                    <i class="fas fa-check"></i> Checar
                                </button>
                                <button type="button" class="reveal-btn mt-4 ml-2" data-target="${inputId}-answer">
                                    <i class="fas fa-eye"></i> Ver resposta
                                </button>
                                <p id="${inputId}-feedback" class="mt-3 text-sm font-semibold text-slate-500"></p>
                                <div id="${inputId}-answer" class="model-answer hidden rounded-[1rem] p-4 mt-4">
                                    <p class="text-sm font-bold uppercase tracking-[0.15em]">Answer</p>
                                    <p class="mt-2">${item.answer}</p>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </section>
    `;
}

function buildTranslationSlide(lesson) {
    const translations = Array.isArray(lesson.translations) ? lesson.translations : [];

    return `
        <section class="slide" data-title="Translation">
            <div class="surface rounded-[2rem] p-8">
                <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Translation lab</p>
                <h3 class="text-3xl font-black text-slate-900 mt-2">Translate and compare</h3>
                <div class="grid lg:grid-cols-2 gap-6 mt-8">
                    ${translations.map((item, index) => `
                        <div class="response-card rounded-[1.5rem] p-6">
                            <p class="text-sm uppercase tracking-[0.18em] text-amber-600 font-bold">Translation ${index + 1}</p>
                            <p class="text-lg font-semibold text-slate-800 mt-3">${item.from}</p>
                            <textarea class="response-input mt-5" placeholder="Write your translation here"></textarea>
                            <button type="button" class="reveal-btn mt-4" data-target="translation-${lesson.number}-${index}">
                                <i class="fas fa-language"></i> Comparar
                            </button>
                            <div id="translation-${lesson.number}-${index}" class="model-answer hidden rounded-[1rem] p-4 mt-4">
                                <p class="text-sm font-bold uppercase tracking-[0.15em]">Suggested translation</p>
                                <p class="mt-3">${item.to}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

function buildPersonalQuestionsSlide(lesson) {
    const questions = Array.isArray(lesson.personalQuestions) ? lesson.personalQuestions : [];

    return `
        <section class="slide" data-title="Personal Questions">
            <div class="surface rounded-[2rem] p-8">
                <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Personal production</p>
                <h3 class="text-3xl font-black text-slate-900 mt-2">Answer with 2-3 connected sentences</h3>
                <div class="grid lg:grid-cols-3 gap-6 mt-8">
                    ${questions.map((question, index) => `
                        <div class="response-card rounded-[1.5rem] p-6">
                            <p class="text-sm uppercase tracking-[0.18em] text-amber-600 font-bold">Question ${index + 1}</p>
                            <p class="text-lg font-semibold text-slate-800 mt-3">${question}</p>
                            <textarea class="response-input mt-5" placeholder="Use because, but, so, first, then or examples."></textarea>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

function buildCompareLabSlides(lesson) {
    return `
        ${buildWarmupSlide(lesson)}
        <section class="slide" data-title="Compare">
            <div class="surface rounded-[2rem] p-8">
                <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Compare routines</p>
                <h3 class="text-3xl font-black text-slate-900 mt-2">${lesson.compareTitle}</h3>
                <div class="grid lg:grid-cols-2 gap-6 mt-8">
                    ${lesson.compareCards.map((item, index) => `
                        <div class="question-card rounded-[1.5rem] p-6">
                            <p class="text-sm uppercase tracking-[0.18em] text-amber-600 font-bold">${item.label}</p>
                            <p class="text-lg font-semibold text-slate-800 mt-3">${item.summary}</p>
                            <ul class="mt-4 space-y-3 text-slate-700">
                                ${item.points.map(point => `<li class="flex items-start gap-3"><i class="fas fa-check-circle text-teal-600 mt-1"></i><span>${point}</span></li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ${buildReadingSlide(lesson)}
        ${buildComprehensionSlide(lesson)}
        <section class="slide" data-title="Voice Note">
            <div class="surface rounded-[2rem] p-8">
                <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Voice-note builder</p>
                <h3 class="text-3xl font-black text-slate-900 mt-2">${lesson.voiceNoteTitle}</h3>
                <div class="grid lg:grid-cols-3 gap-6 mt-8">
                    ${lesson.voiceNoteSteps.map((item, index) => `
                        <div class="response-card rounded-[1.5rem] p-6">
                            <p class="text-sm uppercase tracking-[0.18em] text-amber-600 font-bold">Part ${index + 1}</p>
                            <p class="text-lg font-semibold text-slate-800 mt-3">${item.prompt}</p>
                            <textarea class="response-input mt-5" placeholder="${item.placeholder}"></textarea>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ${buildSpeakingSlide(lesson)}
        ${buildCompleteSlide(lesson)}
    `;
}

function buildServiceLabSlides(lesson) {
    return `
        ${buildWarmupSlide(lesson)}
        ${buildConversationSlide(lesson)}
        ${buildReadingSlide(lesson)}
        <section class="slide" data-title="Service Moves">
            <div class="surface rounded-[2rem] p-8">
                <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Useful moves</p>
                <h3 class="text-3xl font-black text-slate-900 mt-2">${lesson.serviceMovesTitle}</h3>
                <div class="grid lg:grid-cols-2 gap-6 mt-8">
                    ${lesson.serviceMoves.map((item, index) => `
                        <div class="question-card rounded-[1.5rem] p-6">
                            <p class="text-sm uppercase tracking-[0.18em] text-amber-600 font-bold">Move ${index + 1}</p>
                            <p class="text-lg font-semibold text-slate-800 mt-3">${item.step}</p>
                            <p class="text-slate-600 mt-3">${item.use}</p>
                            <div class="model-answer rounded-[1rem] p-4 mt-4">
                                <p class="text-sm font-bold uppercase tracking-[0.15em]">Example</p>
                                <p class="mt-3">${item.example}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ${buildComprehensionSlide(lesson)}
        <section class="slide" data-title="Build A Script">
            <div class="surface rounded-[2rem] p-8">
                <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Mini script</p>
                <h3 class="text-3xl font-black text-slate-900 mt-2">${lesson.scriptTitle}</h3>
                <div class="grid lg:grid-cols-2 gap-6 mt-8">
                    ${lesson.scriptPrompts.map((item, index) => `
                        <div class="response-card rounded-[1.5rem] p-6">
                            <p class="text-sm uppercase tracking-[0.18em] text-amber-600 font-bold">Script ${index + 1}</p>
                            <p class="text-lg font-semibold text-slate-800 mt-3">${item.prompt}</p>
                            <p class="text-sm text-slate-500 mt-3">${item.tip}</p>
                            <textarea class="response-input mt-5" placeholder="${item.placeholder}"></textarea>
                            <button type="button" class="reveal-btn mt-4" data-target="script-${lesson.number}-${index}">
                                <i class="fas fa-lightbulb"></i> Ver resposta-modelo
                            </button>
                            <div id="script-${lesson.number}-${index}" class="model-answer hidden rounded-[1rem] p-4 mt-4">
                                <p class="text-sm font-bold uppercase tracking-[0.15em]">Model answer</p>
                                <p class="mt-3">${item.model}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ${buildSpeakingSlide(lesson)}
        ${buildCompleteSlide(lesson)}
    `;
}

function buildFinalBridgeSlides(lesson) {
    return `
        ${buildWarmupSlide(lesson)}
        <section class="slide" data-title="Bridge Check">
            <div class="surface rounded-[2rem] p-8">
                <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Bridge check</p>
                <h3 class="text-3xl font-black text-slate-900 mt-2">${lesson.checkTitle}</h3>
                <div class="grid lg:grid-cols-2 gap-6 mt-8">
                    ${lesson.canDoChecklist.map((item, index) => `
                        <button type="button" class="checklist-btn question-card rounded-[1.5rem] p-6 text-left transition border">
                            <p class="text-sm uppercase tracking-[0.18em] text-amber-600 font-bold">Can-do ${index + 1}</p>
                            <p class="text-lg font-semibold text-slate-800 mt-3">${item}</p>
                        </button>
                    `).join('')}
                </div>
                <p class="text-sm text-slate-500 mt-6">Clique nos cards que você sente que já consegue fazer com mais segurança.</p>
            </div>
        </section>
        ${buildReadingSlide(lesson)}
        ${buildComprehensionSlide(lesson)}
        <section class="slide" data-title="Final Build">
            <div class="surface rounded-[2rem] p-8">
                <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Final build</p>
                <h3 class="text-3xl font-black text-slate-900 mt-2">${lesson.finalBuildTitle}</h3>
                <div class="grid lg:grid-cols-3 gap-6 mt-8">
                    ${lesson.finalBuildSteps.map((item, index) => `
                        <div class="response-card rounded-[1.5rem] p-6">
                            <p class="text-sm uppercase tracking-[0.18em] text-amber-600 font-bold">Part ${index + 1}</p>
                            <p class="text-lg font-semibold text-slate-800 mt-3">${item.prompt}</p>
                            <p class="text-sm text-slate-500 mt-3">${item.tip}</p>
                            <textarea class="response-input mt-5" placeholder="${item.placeholder}"></textarea>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ${buildSpeakingSlide(lesson)}
        ${buildCompleteSlide(lesson)}
    `;
}

function buildWarmupSlide(lesson) {
    return `
        <section class="slide active" data-title="Warm-up">
            <div class="hero-card rounded-[2rem] p-8 md:p-10">
                <div class="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
                    <div>
                        <p class="text-sm font-extrabold uppercase tracking-[0.22em] text-teal-600">${lesson.unit}</p>
                        <h2 class="text-4xl md:text-5xl font-black mt-3 text-slate-900">${lesson.title}</h2>
                        <p class="text-lg text-slate-600 mt-5 max-w-2xl">${lesson.objective}</p>
                        <div class="flex flex-wrap gap-3 mt-6">
                            <span class="chip"><i class="fas fa-comments"></i> ${lesson.focus}</span>
                            <span class="chip"><i class="fas fa-user-check"></i> ${lesson.cefr}</span>
                        </div>
                    </div>
                    <div class="surface rounded-[1.5rem] p-6">
                        <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Warm-up prompt</p>
                        <p class="text-xl font-semibold text-slate-800 mt-3">${lesson.warmup}</p>
                        <div class="mt-6 space-y-3">
                            ${lesson.checkpoint.map(item => `<div class="flex items-start gap-3 text-slate-700"><i class="fas fa-check-circle text-amber-500 mt-1"></i><span>${item}</span></div>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function buildConversationSlide(lesson) {
    return `
        <section class="slide" data-title="Conversation Lab">
            <div class="surface rounded-[2rem] p-8">
                <div class="flex items-center justify-between gap-4 flex-wrap mb-6">
                    <div>
                        <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Conversation lab</p>
                        <h3 class="text-3xl font-black text-slate-900 mt-2">${lesson.dialogueTitle}</h3>
                    </div>
                    <button class="speak-btn" data-speak="${escapeAttribute(lesson.dialogue.map(line => line[1]).join(' '))}">
                        <i class="fas fa-volume-up"></i> Ouvir diálogo
                    </button>
                </div>
                <div class="space-y-5 text-lg">
                    ${lesson.dialogue.map(line => `
                        <div class="flex items-start gap-4 flex-wrap">
                            <p class="w-24 font-bold ${line[0] === 'Teacher' ? 'text-teal-700' : 'text-amber-700'}">${line[0]}:</p>
                            <div class="flex-1 min-w-[220px]">
                                <p>${line[1]}</p>
                            </div>
                            <button class="speak-btn" data-speak="${escapeAttribute(line[1])}">
                                <i class="fas fa-volume-up"></i> Ouvir
                            </button>
                        </div>
                    `).join('')}
                </div>
                <div class="rounded-[1.5rem] bg-teal-50 border border-teal-100 p-6 mt-8">
                    <p class="text-sm uppercase tracking-[0.18em] text-teal-700 font-bold">Language bank</p>
                    <div class="flex flex-wrap gap-3 mt-4">
                        ${lesson.languageBank.map(item => `<span class="chip">${item}</span>`).join('')}
                    </div>
                </div>
            </div>
        </section>
    `;
}

function buildReadingSlide(lesson) {
    const vocabulary = Array.isArray(lesson.vocabulary) ? lesson.vocabulary : [];

    return `
        <section class="slide" data-title="Reading">
            <div class="surface rounded-[2rem] p-8">
                <div class="flex items-center justify-between gap-4 flex-wrap mb-6">
                    <div>
                        <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Reading focus</p>
                        <h3 class="text-3xl font-black text-slate-900 mt-2">${lesson.readingTitle}</h3>
                    </div>
                    <button class="speak-btn" data-speak="${escapeAttribute(lesson.reading.join(' '))}">
                        <i class="fas fa-volume-up"></i> Ouvir texto
                    </button>
                </div>
                <div class="reading-block rounded-[1.5rem] p-6 md:p-8 space-y-5 text-lg leading-8">
                    ${lesson.reading.map(paragraph => `<p>${paragraph}</p>`).join('')}
                </div>
                ${vocabulary.length ? `
                    <div class="mt-6 rounded-[1.5rem] bg-teal-50 border border-teal-100 p-6">
                        <p class="text-sm uppercase tracking-[0.18em] text-teal-700 font-bold">Vocabulary support</p>
                        <div class="flex flex-wrap gap-3 mt-4">
                            ${vocabulary.map(item => `<span class="chip">${item[0]} = ${item[1]}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        </section>
    `;
}

function buildComprehensionSlide(lesson) {
    return `
        <section class="slide" data-title="Interpretation">
            <div class="surface rounded-[2rem] p-8">
                <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Reading check</p>
                <h3 class="text-3xl font-black text-slate-900 mt-2">Read, think and choose the best answer</h3>
                <div class="grid lg:grid-cols-2 gap-6 mt-8">
                    ${lesson.comprehension.map((item, index) => `
                        <div class="question-card rounded-[1.5rem] p-6">
                            <p class="text-sm uppercase tracking-[0.18em] text-amber-600 font-bold">Question ${index + 1}</p>
                            <p class="text-lg font-semibold text-slate-800 mt-3">${item.question}</p>
                            <div class="space-y-3 mt-5">
                                ${item.options.map((option, optionIndex) => `
                                    <button
                                        type="button"
                                        class="choice-btn w-full text-left rounded-2xl border px-4 py-3 transition"
                                        data-group="prep-${lesson.number}-${index}"
                                        data-correct="${optionIndex === item.correctIndex ? 'true' : 'false'}"
                                        data-feedback="${escapeAttribute(item.feedback)}"
                                    >
                                        ${option}
                                    </button>
                                `).join('')}
                            </div>
                            <p id="feedback-prep-${lesson.number}-${index}" class="mt-3 text-sm font-semibold text-slate-500"></p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

function buildResponseSlide(lesson) {
    return `
        <section class="slide" data-title="Build Your Answer">
            <div class="surface rounded-[2rem] p-8">
                <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Written response</p>
                <h3 class="text-3xl font-black text-slate-900 mt-2">Write fuller answers before you speak</h3>
                <div class="grid lg:grid-cols-2 gap-6 mt-8">
                    ${lesson.responseBuilder.map((item, index) => `
                        <div class="response-card rounded-[1.5rem] p-6">
                            <p class="text-sm uppercase tracking-[0.18em] text-amber-600 font-bold">Task ${index + 1}</p>
                            <p class="text-lg font-semibold text-slate-800 mt-3">${item.prompt}</p>
                            <p class="text-sm text-slate-500 mt-3">${item.tip}</p>
                            <textarea class="response-input mt-5" placeholder="${item.placeholder}"></textarea>
                            <button type="button" class="reveal-btn mt-4" data-target="model-${lesson.number}-${index}">
                                <i class="fas fa-lightbulb"></i> Ver resposta-modelo
                            </button>
                            <div id="model-${lesson.number}-${index}" class="model-answer hidden rounded-[1rem] p-4 mt-4">
                                <p class="text-sm font-bold uppercase tracking-[0.15em]">Model answer</p>
                                <p class="mt-3">${item.model}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

function buildSpeakingSlide(lesson) {
    return `
        <section class="slide" data-title="Speaking Task">
            <div class="grid lg:grid-cols-[0.95fr_1.05fr] gap-6">
                <div class="surface rounded-[2rem] p-8">
                    <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Speaking task</p>
                    <h3 class="text-3xl font-black text-slate-900 mt-2">${lesson.speakingTask.title}</h3>
                    <div class="space-y-3 mt-6">
                        ${lesson.speakingTask.steps.map(step => `
                            <div class="flex items-start gap-3 text-slate-700">
                                <i class="fas fa-angle-right text-amber-500 mt-1"></i>
                                <span>${step}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="mt-6 p-5 rounded-2xl bg-amber-50 border border-amber-100">
                        <p class="text-sm uppercase tracking-[0.18em] text-amber-700 font-bold">Model</p>
                        <p class="text-lg font-medium text-slate-800 mt-3">${lesson.speakingTask.model}</p>
                        <button class="speak-btn mt-4" data-speak="${escapeAttribute(lesson.speakingTask.model)}">
                            <i class="fas fa-volume-up"></i> Ouvir modelo
                        </button>
                    </div>
                </div>
                <div class="surface rounded-[2rem] p-8">
                    <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Homework</p>
                    <h3 class="text-3xl font-black text-slate-900 mt-2">Take it into class</h3>
                    <p class="text-lg text-slate-700 mt-6">${lesson.homework}</p>
                    <div class="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                        <p class="text-sm uppercase tracking-[0.18em] text-slate-500 font-bold">Bridge reminder</p>
                        <p class="text-slate-700 mt-3">Aqui o objetivo não é decorar mais regras, e sim recuperar o repertório de A1/A2 com respostas mais longas, interpretação mais estável e fala mais organizada.</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function buildCompleteSlide(lesson) {
    return `
        <section class="slide" data-title="Lesson Complete">
            <div class="hero-card rounded-[2rem] p-10 text-center min-h-[420px] flex flex-col items-center justify-center">
                <i class="fas fa-arrow-right-arrow-left text-teal-600 text-7xl mb-6"></i>
                <p class="text-sm uppercase tracking-[0.18em] text-teal-600 font-bold">Lesson complete</p>
                <h3 class="text-5xl font-black text-slate-900 mt-2">${lesson.title}</h3>
                <p class="text-xl text-slate-600 mt-4 max-w-3xl">${lesson.celebration}</p>
            </div>
        </section>
    `;
}

function escapeAttribute(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
