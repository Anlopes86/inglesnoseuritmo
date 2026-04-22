const LESSON_RESTRUCTURE_PLAN = {
    1: { title: "Connect Life Milestones", activityType: "memory", targets: ["Present perfect continuous for ongoing effort", "Timeline logic for life milestones", "One-minute personal update recording"], activityPrompt: "Match achievement vocabulary with meaning before telling your timeline.", productionBoost: "Combine present perfect and present perfect continuous in your audio update.", musicHint: "Use a short chorus with present perfect for gap-fill listening." },
    2: { title: "Time Markers Precision", activityType: "timed_quiz", targets: ["Since/for and already/yet accuracy", "Recently/lately in progress updates", "Fast form selection under time pressure"], activityPrompt: "Timed challenge: choose the most accurate time marker.", productionBoost: "Write a mini progress email using all target markers.", musicHint: "Use any short excerpt with time markers for listening discrimination." },
    3: { title: "Milestone Story Builder", activityType: "ordering", targets: ["Present perfect plus past simple sequencing", "First/then/afterwards/finally connectors", "Impact reflection with comparatives"], activityPrompt: "Reorder story events and retell why the milestone mattered.", productionBoost: "Record a short milestone story with sequence connectors." },
    4: { title: "Then vs Now Contrast", activityType: "memory", targets: ["used to and would for past habits", "Past-to-present contrast language", "Peer feedback on habit change"], activityPrompt: "Match old habits to current routines and explain the shift.", productionBoost: "Create before/now contrast statements with clear reasons." },
    5: { title: "Future Planning Upgrade", activityType: "ordering", targets: ["Arrangements vs intentions", "Future continuous preview", "Calendar-based planning language"], activityPrompt: "Sort plans into arrangement, intention, or prediction.", productionBoost: "Use at least one future continuous sentence in your plan." },
    6: { title: "Prediction and Deduction", activityType: "debate", targets: ["will/might/probably/maybe nuance", "must/can't for deduction", "Argument support in pairs"], activityPrompt: "Debate one future trend and defend certainty level choices.", productionBoost: "Defend predictions with one modal of deduction.", musicHint: "Use a future-themed song line to discuss certainty level." },
    7: { title: "Conditional Decision Lab", activityType: "ordering", targets: ["First conditional in real contexts", "Zero conditional quick contrast", "Condition and consequence mapping"], activityPrompt: "Order conditions and outcomes to build realistic cause-effect logic.", productionBoost: "Create real-life if-clauses with practical consequences." },
    8: { title: "Block 1 Integration Sprint", activityType: "timed_quiz", targets: ["Past/present/future switching", "Time-frame awareness without translation", "Role-play transition practice"], activityPrompt: "Timed team quiz: pick the best tense for each situation.", productionBoost: "Perform a three-phase role-play: past, present, and future." },
    9: { title: "Opinion and Disagreement Lab", activityType: "debate", targets: ["Polite disagreement patterns", "however/although/on the other hand", "Simple speaking rubric use"], activityPrompt: "Two-side debate: record concise arguments and vote for clarity.", productionBoost: "Use one contrast connector and one respectful disagreement move." },
    10: { title: "Suggestion Voting Studio", activityType: "debate", targets: ["should/could/let's/why don't we", "ought to and had better", "Collaborative decision language"], activityPrompt: "Present solution cards and vote on the strongest plan.", productionBoost: "Build one decision statement after two suggestions." },
    11: { title: "Comparison Power Pack", activityType: "timed_quiz", targets: ["Comparatives and superlatives", "as...as and not as...as", "too/enough and so/such...that"], activityPrompt: "Complete comparison chains with high accuracy and speed.", productionBoost: "Explain choices using comparative and superlative evidence.", musicHint: "Choose a comparison-heavy lyric excerpt for quick gap-fill." },
    12: { title: "Rules and Expectations Clarifier", activityType: "timed_quiz", targets: ["must vs have to vs should", "don't have to vs mustn't", "Expectation framing with be supposed to"], activityPrompt: "Classify sentences by rule, obligation, suggestion, or expectation.", productionBoost: "Apply each modal family to one daily-life scenario." },
    13: { title: "Clause Assembly Workshop", activityType: "ordering", targets: ["Relative clauses for people/things/places", "Early review of indefinite pronouns", "Pronunciation support with TTS"], activityPrompt: "Match sentence halves to build clear relative clauses.", productionBoost: "Produce one polished sentence for person, thing, and place." },
    14: { title: "Passive Process Studio", activityType: "ordering", targets: ["Passive with and without agent", "Passive questions in routines", "Active/passive recognition"], activityPrompt: "Reorder process steps and rewrite them in passive voice.", productionBoost: "Alternate agent/no-agent passive forms in your report." },
    15: { title: "News and Quantifier Lens", activityType: "timed_quiz", targets: ["Main idea and summary extraction", "Indefinite pronouns in context", "Quantifiers from authentic short texts"], activityPrompt: "Read a short news excerpt, then run true/false and detail checks.", productionBoost: "Summarize a 150-200 word text with quantifier awareness.", musicHint: "Optional listening break: news-like spoken rhythm for dictation." },
    16: { title: "Block 2 Presentation Round", activityType: "debate", targets: ["Integrated block-2 structures", "Structured mini-presentations", "Peer question rounds"], activityPrompt: "Group micro-presentations with polite follow-up questions.", productionBoost: "Use connector + example + conclusion in every argument." },
    17: { title: "Past Narrative Timeline", activityType: "ordering", targets: ["Past continuous vs past simple", "when/while for simultaneous events", "Temporal markers for sequence"], activityPrompt: "Drag events into a coherent interrupted-action timeline.", productionBoost: "Retell events emphasizing interruption points." },
    18: { title: "Background and Sequence Depth", activityType: "ordering", targets: ["Past perfect and simple past contrast", "Past perfect continuous introduction", "Logical event linkage"], activityPrompt: "Connect background actions to main events in correct order.", productionBoost: "Explain what had happened before key events." },
    19: { title: "Reported Speech Relay", activityType: "timed_quiz", targets: ["Statements, questions, and imperatives in reporting", "Core tense shifts (will/would, can/could)", "Message clarity in retelling"], activityPrompt: "Convert direct lines into reported versions under time limit.", productionBoost: "Retell a short dialogue without losing meaning." },
    20: { title: "Problem-Solution Mapping", activityType: "ordering", targets: ["Cause-effect-solution triads", "however/nevertheless contrast", "Strong recommendation with must"], activityPrompt: "Match problems to causes and realistic solutions.", productionBoost: "Record a concise cause-solution rationale using connectors." },
    21: { title: "Travel Support Role-play", activityType: "scenario", targets: ["Travel issue handling language", "Conditionals in service situations", "Core travel phrasal verbs"], activityPrompt: "Role-play check-in/check-out problem solving with polite requests.", productionBoost: "Use at least two travel phrasal verbs in your response.", musicHint: "Optional travel-theme lyric cue for emotional context." },
    22: { title: "Wellbeing Language Builder", activityType: "memory", targets: ["Health and routine vocabulary", "Gerunds after preference verbs", "Quantifiers and indefinite pronouns in habits"], activityPrompt: "Match healthy habits to benefits, then build a wellbeing log.", productionBoost: "Use gerund structures and quantifiers in a personal routine note." },
    23: { title: "Career Puzzle", activityType: "ordering", targets: ["Study and career pathway vocabulary", "Reflexive pronouns in context", "Infinitives of purpose"], activityPrompt: "Link skills, experiences, and future goals into a career path chain.", productionBoost: "Record a 60-second self-introduction with purpose infinitives." },
    24: { title: "Block 3 Story Collaboration", activityType: "debate", targets: ["Narrative integration for block 3", "Review of indefinite/reflexive/quantifier/phrasal forms", "Collaborative storytelling"], activityPrompt: "Build a three-part group narrative: context, report, solution.", productionBoost: "Deliver a spoken story arc with clear transitions." },
    25: { title: "Digital Habits Analyzer", activityType: "timed_quiz", targets: ["Tech routines and impact language", "Gerund/infinitive in digital contexts", "Phrasal verbs and contrast linkers"], activityPrompt: "Run a habits quiz and interpret simple data trends.", productionBoost: "Present one chart insight using too much/enough/not enough." },
    26: { title: "Sustainability Decisions", activityType: "debate", targets: ["Environmental actions and impact", "Quantifiers and indefinite pronouns", "Passive voice for process focus"], activityPrompt: "Choose greener options and justify them with impact language.", productionBoost: "Record a 30-second campaign slogan with should/must.", musicHint: "Use an environmental lyric snippet to trigger discussion." },
    27: { title: "Smart Budget Simulator", activityType: "timed_quiz", targets: ["Money and shopping decisions", "Indefinite pronouns in value language", "Negotiation and conditional buying"], activityPrompt: "Compare offers and justify what is worth it under a fixed budget.", productionBoost: "Use worth it/too expensive/good enough with one conditional.", musicHint: "Optional spending-theme lyric for reflection on consumption." },
    28: { title: "Social Mediation Practice", activityType: "debate", targets: ["Relationship language and social repair", "Social phrasal verbs", "Reflexive pronouns for responsibility"], activityPrompt: "Mediate a misunderstanding and guide both sides to resolution.", productionBoost: "Use modals plus contrast connectors to negotiate calmly.", musicHint: "Friendship lyric cue for empathy and communication tone." },
    29: { title: "Hypothesis Generator", activityType: "timed_quiz", targets: ["Second conditional and wish review", "Intro to third conditional", "Regret and possibility expression"], activityPrompt: "Complete if/wish scenarios with correct hypothetical framing.", productionBoost: "Link wishes and regrets to one practical learning insight.", musicHint: "Wish/regret lyric cue for emotional framing practice." },
    30: { title: "Persuasion Slide Builder", activityType: "scenario", targets: ["Presentation structure and persuasive flow", "Advanced contrast/result linkers", "One-minute speaking design"], activityPrompt: "Draft main point, reasons, evidence, and conclusion in slide logic.", productionBoost: "Record a one-minute persuasive mini-talk." },
    31: { title: "Final Project Workshop Plus", activityType: "scenario", targets: ["Checklist-based project planning", "Inclusion of added B1 targets", "Self-review before submission"], activityPrompt: "Complete the project readiness checklist and patch weak points.", productionBoost: "Ensure quantifiers, gerunds, and phrasal verbs appear in draft." },
    32: { title: "Final Can-Do Assessment", activityType: "scenario", targets: ["Integrated B1 language control", "Multimodal delivery (text + audio/video)", "Bridge feedback toward B2"], activityPrompt: "Finalize written + spoken project and review performance rubric.", productionBoost: "Deliver a 200-250 word text plus a two-minute recording." }
};

document.addEventListener('DOMContentLoaded', () => {
    const lessonNumber = getLessonNumberFromPath();
    const lesson = Array.isArray(window.B1_LESSONS) ? window.B1_LESSONS.find((item) => item.number === lessonNumber) : null;

    if (!lesson) {
        document.getElementById('slides-root').innerHTML = `
            <div class="surface rounded-[2rem] p-10 text-center">
                <h2 class="text-3xl font-black text-slate-900 mb-3">Lesson not found</h2>
                <p class="text-slate-600">We could not load this B1 lesson data.</p>
            </div>
        `;
        return;
    }

    const restructure = getRestructurePack(lesson);
    const root = document.getElementById('slides-root');
    root.innerHTML = buildSlides(lesson, restructure);

    document.getElementById('lesson-title').textContent = `B1 - Lesson ${lesson.number}: ${lesson.title}`;
    document.title = `B1 - Lesson ${lesson.number}: ${lesson.title} | Ingles no seu Ritmo`;

    let currentSlide = 0;
    const slideEls = Array.from(document.querySelectorAll('.slide'));
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishLessonBtn = document.getElementById('finish-lesson-btn');
    const progressBar = document.getElementById('progress-bar');
    const slideCounter = document.getElementById('slide-counter');
    const slideTitleHeader = document.getElementById('slide-title-header');

    const runtime = {
        memory: {},
        quiz: {},
        orderDrag: { itemId: null, boardId: null },
        debate: {},
        recorder: {},
        speech: {}
    };

    initializeQuizBoards(root, runtime);

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

    root.addEventListener('click', async (event) => {
        const speakBtn = event.target.closest('.speak-btn');
        if (speakBtn) {
            speak(speakBtn.dataset.speak || speakBtn.dataset.text || '');
            return;
        }

        const vocabCard = event.target.closest('.vocab-card');
        if (vocabCard) {
            vocabCard.classList.toggle('flipped');
            return;
        }

        const revealBtn = event.target.closest('.answer-btn');
        if (revealBtn) {
            const targetId = revealBtn.dataset.target;
            const input = document.getElementById(targetId);
            if (input) {
                input.value = input.dataset.answer;
                input.classList.remove('incorrect', 'correct');
                input.classList.add('revealed');
            }
            return;
        }

        const choiceBtn = event.target.closest('.choice-btn');
        if (choiceBtn) {
            const group = choiceBtn.dataset.group;
            const answer = choiceBtn.dataset.answer;
            const feedback = document.getElementById(`feedback-${group}`);
            document.querySelectorAll(`[data-group="${group}"]`).forEach((btn) => {
                btn.disabled = true;
                const isCorrect = btn.dataset.correct === 'true';
                btn.classList.add(isCorrect ? 'correct' : 'incorrect');
            });
            if (feedback) {
                feedback.textContent = answer;
                feedback.className = 'mt-3 text-sm font-semibold text-slate-600';
            }
            return;
        }

        if (handleMemoryClick(event, runtime)) return;
        if (handleQuizClick(event, runtime)) return;
        if (handleOrderingCheck(event)) return;
        if (handleDebateClick(event, runtime)) return;
        if (await handleRecordingClick(event, runtime)) return;
        if (handleTranscriptClick(event, runtime)) return;
    });

    root.addEventListener('blur', (event) => {
        const input = event.target.closest('.practice-input');
        if (!input) return;
        const value = normalize(input.value);
        const answer = normalize(input.dataset.answer);
        input.classList.remove('correct', 'incorrect', 'revealed');
        if (!value) return;
        input.classList.add(value === answer ? 'correct' : 'incorrect');
    }, true);

    root.addEventListener('dragstart', (event) => handleOrderingDragStart(event, runtime));
    root.addEventListener('dragend', (event) => handleOrderingDragEnd(event, runtime));
    root.addEventListener('dragover', handleOrderingDragOver);
    root.addEventListener('drop', (event) => handleOrderingDrop(event, runtime));

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

function normalize(text) {
    return String(text || '')
        .toLowerCase()
        .trim()
        .replace(/[.!?]/g, '')
        .replace(/\s+/g, ' ');
}

function escapeAttribute(text) {
    return String(text || '')
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function escapeHtml(text) {
    return String(text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function shuffleArray(list) {
    const clone = Array.isArray(list) ? [...list] : [];
    for (let i = clone.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [clone[i], clone[j]] = [clone[j], clone[i]];
    }
    return clone;
}

function getRestructurePack(lesson) {
    const baseTargets = [
        'Integrate reading, writing, listening, and speaking in the same lesson.',
        'Use formative feedback with simple rubric language.',
        'Close CEFR B1 gaps through controlled but meaningful practice.'
    ];
    const plan = LESSON_RESTRUCTURE_PLAN[lesson.number] || {};
    return {
        title: plan.title || 'B1 Premium Upgrade',
        targets: Array.isArray(plan.targets) && plan.targets.length ? plan.targets : baseTargets,
        activityType: plan.activityType || inferActivityType(lesson.number),
        activityPrompt: plan.activityPrompt || 'Use the interactive lab to apply the lesson language in context.',
        productionBoost: plan.productionBoost || 'Record a short response and self-evaluate with the rubric.',
        musicHint: plan.musicHint || ''
    };
}

function inferActivityType(lessonNumber) {
    if ([1, 4, 22].includes(lessonNumber)) return 'memory';
    if ([3, 5, 7, 13, 14, 17, 18, 20, 23].includes(lessonNumber)) return 'ordering';
    if ([6, 9, 10, 16, 24, 26, 28].includes(lessonNumber)) return 'debate';
    if ([21, 30, 31, 32].includes(lessonNumber)) return 'scenario';
    return 'timed_quiz';
}

function buildSlides(lesson, restructure) {
    return `
        ${buildWarmupSlide(lesson, restructure)}
        ${buildDialogueSlide(lesson)}
        ${buildGrammarSlide(lesson)}
        ${buildVocabularySlide(lesson)}
        ${buildInteractiveLabSlide(lesson, restructure)}
        ${buildPracticeSlide(lesson)}
        ${buildSpeakingStudioSlide(lesson, restructure)}
        ${buildProductionSlide(lesson, restructure)}
        ${buildCompletionSlide(lesson)}
    `;
}

function buildWarmupSlide(lesson, restructure) {
    return `
        <section class="slide active" data-title="Warm-up">
            <div class="hero-card rounded-[2rem] p-8 md:p-10">
                <div class="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
                    <div>
                        <p class="text-sm font-extrabold uppercase tracking-[0.22em] text-rose-500">${escapeHtml(lesson.unit)}</p>
                        <h2 class="text-4xl md:text-5xl font-black mt-3 text-slate-900">${escapeHtml(lesson.title)}</h2>
                        <p class="text-lg text-slate-600 mt-5 max-w-2xl">${escapeHtml(lesson.objective)}</p>
                        <div class="flex flex-wrap gap-3 mt-6">
                            <span class="chip"><i class="fas fa-bullseye"></i> ${escapeHtml(lesson.focus)}</span>
                            <span class="chip"><i class="fas fa-user-check"></i> ${escapeHtml(lesson.cefr)}</span>
                        </div>
                        <div class="mt-6 p-5 rounded-2xl bg-white border border-rose-100">
                            <p class="text-xs uppercase tracking-[0.18em] text-rose-500 font-bold">Restructure focus</p>
                            <h3 class="text-xl font-bold text-slate-900 mt-2">${escapeHtml(restructure.title)}</h3>
                            <div class="space-y-2 mt-4">
                                ${restructure.targets.map((item) => `<div class="flex items-start gap-3 text-slate-700"><i class="fas fa-arrow-trend-up text-rose-400 mt-1"></i><span>${escapeHtml(item)}</span></div>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="surface rounded-[1.5rem] p-6">
                        <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Warm-up prompt</p>
                        <p class="text-xl font-semibold text-slate-800 mt-3">${escapeHtml(lesson.warmup)}</p>
                        <div class="mt-6 space-y-3">
                            ${lesson.checkpoint.map((item) => `<div class="flex items-start gap-3 text-slate-700"><i class="fas fa-check-circle text-rose-500 mt-1"></i><span>${escapeHtml(item)}</span></div>`).join('')}
                        </div>
                        ${restructure.musicHint ? `<div class="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-100"><p class="text-xs uppercase tracking-[0.18em] text-amber-700 font-bold">Optional music cue</p><p class="text-sm text-amber-900 mt-2">${escapeHtml(restructure.musicHint)}</p></div>` : ''}
                    </div>
                </div>
            </div>
        </section>
    `;
}

function buildDialogueSlide(lesson) {
    const fullDialogue = lesson.dialogue.map((line) => line[1]).join(' ');
    return `
        <section class="slide" data-title="Dialogue">
            <div class="surface rounded-[2rem] p-8">
                <div class="flex items-center justify-between gap-4 flex-wrap mb-6">
                    <div>
                        <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Dialogue model</p>
                        <h3 class="text-3xl font-black text-slate-900 mt-2">${escapeHtml(lesson.dialogueTitle)}</h3>
                    </div>
                    <button class="speak-btn" data-speak="${escapeAttribute(fullDialogue)}">
                        <i class="fas fa-volume-up"></i> Listen all
                    </button>
                </div>
                <div class="space-y-5 text-lg">
                    ${lesson.dialogue.map((line) => `
                        <div class="flex items-start gap-4 flex-wrap">
                            <p class="w-24 font-bold ${line[0] === 'Teacher' ? 'text-rose-600' : 'text-orange-600'}">${escapeHtml(line[0])}:</p>
                            <div class="flex-1 min-w-[220px]">
                                <p>${escapeHtml(line[1])}</p>
                            </div>
                            <button class="speak-btn" data-speak="${escapeAttribute(line[1])}">
                                <i class="fas fa-volume-up"></i> Listen
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

function buildGrammarSlide(lesson) {
    return `
        <section class="slide" data-title="Language Focus">
            <div class="surface rounded-[2rem] p-8">
                <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Language focus</p>
                <h3 class="text-3xl font-black text-slate-900 mt-2">${escapeHtml(lesson.grammar.title)}</h3>
                <p class="text-lg text-slate-600 mt-4">${escapeHtml(lesson.grammar.intro)}</p>
                <div class="overflow-x-auto mt-8">
                    <table class="w-full text-left rounded-xl overflow-hidden">
                        <thead>
                            <tr class="bg-rose-50 text-slate-700">
                                <th class="p-4 font-bold">Use</th>
                                <th class="p-4 font-bold">Form</th>
                                <th class="p-4 font-bold">Example</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${lesson.grammar.points.map((point, index) => `
                                <tr class="${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'} border-t border-slate-100">
                                    <td class="p-4 font-semibold">${escapeHtml(point[0])}</td>
                                    <td class="p-4">${escapeHtml(point[1])}</td>
                                    <td class="p-4">${escapeHtml(point[2])}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    `;
}

function buildVocabularySlide(lesson) {
    return `
        <section class="slide" data-title="Vocabulary">
            <div class="text-center">
                <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Vocabulary set</p>
                <h3 class="text-4xl font-black text-slate-900 mt-2">${escapeHtml(lesson.vocabTitle)}</h3>
                <p class="text-slate-600 text-lg mt-3 mb-8">Click each card to flip and review meaning in context.</p>
                <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    ${lesson.vocabulary.map((item) => `
                        <div class="vocab-card">
                            <div class="vocab-card-inner">
                                <div class="vocab-face vocab-front">
                                    <p class="text-sm uppercase tracking-[0.18em] text-rose-400 font-bold">Front</p>
                                    <h4 class="text-2xl font-black text-slate-900 mt-3">${escapeHtml(item[0])}</h4>
                                </div>
                                <div class="vocab-face vocab-back text-left">
                                    <p class="text-sm uppercase tracking-[0.18em] text-white/70 font-bold">Meaning</p>
                                    <h4 class="text-2xl font-black mt-3">${escapeHtml(item[1])}</h4>
                                    <p class="mt-4 text-white/90">${escapeHtml(item[2])}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

function buildInteractiveLabSlide(lesson, restructure) {
    return `
        <section class="slide" data-title="Interactive Lab">
            <div class="surface rounded-[2rem] p-8">
                <div class="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                        <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Interactive methodology</p>
                        <h3 class="text-3xl font-black text-slate-900 mt-2">${escapeHtml(restructure.title)}</h3>
                    </div>
                    <span class="chip"><i class="fas fa-gamepad"></i> ${escapeHtml(restructure.activityType.replace('_', ' '))}</span>
                </div>
                <p class="text-slate-700 mt-4">${escapeHtml(restructure.activityPrompt)}</p>
                <div class="mt-6 p-5 rounded-2xl bg-rose-50 border border-rose-100">
                    <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Upgrade targets</p>
                    <div class="grid md:grid-cols-2 gap-3 mt-3">
                        ${restructure.targets.map((target) => `<div class="flex items-start gap-2 text-slate-700"><i class="fas fa-circle-check text-rose-400 mt-1"></i><span>${escapeHtml(target)}</span></div>`).join('')}
                    </div>
                </div>
                <div class="mt-8">
                    ${buildInteractiveLabBody(lesson, restructure)}
                </div>
            </div>
        </section>
    `;
}

function buildInteractiveLabBody(lesson, restructure) {
    switch (restructure.activityType) {
        case 'memory':
            return buildMemoryLabMarkup(lesson);
        case 'ordering':
            return buildOrderingLabMarkup(lesson);
        case 'debate':
            return buildDebateLabMarkup(lesson, restructure);
        case 'scenario':
            return buildScenarioLabMarkup(lesson, restructure);
        case 'timed_quiz':
        default:
            return buildQuizLabMarkup(lesson);
    }
}

function buildMemoryLabMarkup(lesson) {
    const boardId = `memory-${lesson.number}`;
    const basePairs = lesson.vocabulary.slice(0, 6).map((item, index) => ({ id: `${boardId}-${index}`, front: item[0], back: item[1] }));
    const cards = shuffleArray(basePairs.flatMap((pair) => ([
        { pairId: pair.id, label: pair.front },
        { pairId: pair.id, label: pair.back }
    ])));

    return `
        <div class="rounded-2xl border border-slate-200 bg-white p-6" data-memory-board="${boardId}" data-memory-total="${basePairs.length}">
            <div class="flex items-center justify-between gap-3 flex-wrap mb-4">
                <p class="font-semibold text-slate-800">Memory Match</p>
                <p class="text-sm text-slate-500">Match each keyword with its meaning.</p>
            </div>
            <div class="grid sm:grid-cols-3 lg:grid-cols-4 gap-3">
                ${cards.map((card, index) => `
                    <button
                        type="button"
                        class="memory-card rounded-xl border border-slate-200 bg-white px-4 py-4 text-left min-h-[90px] transition hover:border-rose-300"
                        data-memory-board="${boardId}"
                        data-memory-pair="${escapeAttribute(card.pairId)}"
                        data-memory-key="${boardId}-${index}"
                    >
                        <span class="memory-cover block text-sm uppercase tracking-[0.16em] text-slate-400 font-bold">Card</span>
                        <span class="memory-value hidden mt-2 text-base font-semibold text-slate-800">${escapeHtml(card.label)}</span>
                    </button>
                `).join('')}
            </div>
            <p id="memory-feedback-${boardId}" class="mt-4 text-sm font-semibold text-slate-600">Find all pairs.</p>
        </div>
    `;
}

function buildQuizLabMarkup(lesson) {
    const boardId = `quiz-${lesson.number}`;
    const questions = buildQuizQuestions(lesson);
    return `
        <div class="rounded-2xl border border-slate-200 bg-white p-6" data-quiz-board="${boardId}" data-quiz-seconds="120">
            <div class="flex items-center justify-between gap-3 flex-wrap mb-5">
                <p class="font-semibold text-slate-800">Timed Grammar Quiz</p>
                <div class="flex items-center gap-3">
                    <span class="text-sm text-slate-500">Time left:</span>
                    <span class="text-sm font-bold text-rose-600" data-quiz-timer="${boardId}">02:00</span>
                    <span class="text-sm font-bold text-slate-700" data-quiz-score="${boardId}">0 / ${questions.length}</span>
                </div>
            </div>
            <div class="space-y-5">
                ${questions.map((question, qIndex) => `
                    <div class="rounded-xl border border-slate-200 p-4" data-quiz-item="true" data-quiz-question-id="${boardId}-${qIndex}">
                        <p class="font-semibold text-slate-800">${escapeHtml(question.question)}</p>
                        <div class="grid md:grid-cols-2 gap-3 mt-3">
                            ${question.options.map((option, optionIndex) => `
                                <button
                                    type="button"
                                    class="lab-quiz-option text-left rounded-xl border border-slate-200 px-3 py-2 text-sm transition hover:border-rose-300"
                                    data-quiz-board="${boardId}"
                                    data-quiz-question-id="${boardId}-${qIndex}"
                                    data-quiz-correct="${optionIndex === question.correctIndex ? 'true' : 'false'}"
                                    data-quiz-feedback="${escapeAttribute(question.feedback)}"
                                >
                                    ${escapeHtml(option)}
                                </button>
                            `).join('')}
                        </div>
                        <p class="mt-3 text-sm text-slate-500" data-quiz-feedback></p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function buildOrderingLabMarkup(lesson) {
    const boardId = `order-${lesson.number}`;
    const sequence = buildOrderingSequence(lesson);
    const shuffled = shuffleArray(sequence);
    const correctOrder = sequence.map((item) => item.id);
    return `
        <div class="rounded-2xl border border-slate-200 bg-white p-6">
            <div class="flex items-center justify-between gap-3 flex-wrap mb-4">
                <p class="font-semibold text-slate-800">Sequence Builder</p>
                <p class="text-sm text-slate-500">Drag cards to create a logical order.</p>
            </div>
            <ul class="space-y-3" data-order-board="${boardId}" data-order-correct="${escapeAttribute(JSON.stringify(correctOrder))}">
                ${shuffled.map((item) => `
                    <li class="ordering-item rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 cursor-move" draggable="true" data-order-id="${escapeAttribute(item.id)}" data-order-board="${boardId}">
                        <div class="flex items-start gap-3">
                            <i class="fas fa-grip-vertical text-slate-400 mt-1"></i>
                            <span>${escapeHtml(item.label)}</span>
                        </div>
                    </li>
                `).join('')}
            </ul>
            <div class="mt-5 flex items-center gap-3 flex-wrap">
                <button type="button" class="rounded-xl bg-rose-600 text-white px-4 py-2 font-semibold hover:bg-rose-700 transition" data-order-check="${boardId}">Check order</button>
                <p class="text-sm font-semibold text-slate-600" id="order-feedback-${boardId}">Arrange all cards and then validate.</p>
            </div>
        </div>
    `;
}

function buildDebateLabMarkup(lesson, restructure) {
    const boardId = `debate-${lesson.number}`;
    const prompt = restructure.activityPrompt || lesson.warmup;
    return `
        <div class="rounded-2xl border border-slate-200 bg-white p-6" data-debate-board="${boardId}" data-debate-seconds="120">
            <p class="font-semibold text-slate-800">Debate and Voting</p>
            <p class="text-slate-600 mt-2">${escapeHtml(prompt)}</p>
            <div class="mt-4 grid lg:grid-cols-2 gap-4">
                <div class="rounded-xl border border-slate-200 p-4">
                    <p class="text-sm font-bold uppercase tracking-[0.15em] text-rose-500">Side A</p>
                    <textarea class="w-full mt-3 rounded-lg border border-slate-200 p-3 min-h-[110px]" placeholder="Build a concise argument with one reason and one example."></textarea>
                </div>
                <div class="rounded-xl border border-slate-200 p-4">
                    <p class="text-sm font-bold uppercase tracking-[0.15em] text-rose-500">Side B</p>
                    <textarea class="w-full mt-3 rounded-lg border border-slate-200 p-3 min-h-[110px]" placeholder="Respond politely and defend a different position."></textarea>
                </div>
            </div>
            <div class="mt-4 flex items-center gap-3 flex-wrap">
                <button type="button" class="rounded-xl bg-rose-600 text-white px-4 py-2 font-semibold hover:bg-rose-700 transition" data-debate-action="start" data-debate-board="${boardId}">Start timer</button>
                <button type="button" class="rounded-xl bg-slate-200 text-slate-700 px-4 py-2 font-semibold hover:bg-slate-300 transition" data-debate-action="stop" data-debate-board="${boardId}">Stop timer</button>
                <span class="text-sm font-bold text-rose-600" data-debate-timer="${boardId}">02:00</span>
            </div>
            <div class="mt-4 flex items-center gap-3 flex-wrap">
                <button type="button" class="rounded-xl border border-slate-200 px-4 py-2 font-semibold hover:border-rose-300 transition" data-debate-vote="a" data-debate-board="${boardId}">Vote A</button>
                <button type="button" class="rounded-xl border border-slate-200 px-4 py-2 font-semibold hover:border-rose-300 transition" data-debate-vote="b" data-debate-board="${boardId}">Vote B</button>
                <span class="text-sm text-slate-700">A: <strong data-debate-score="${boardId}-a">0</strong></span>
                <span class="text-sm text-slate-700">B: <strong data-debate-score="${boardId}-b">0</strong></span>
            </div>
        </div>
    `;
}

function buildScenarioLabMarkup(lesson, restructure) {
    const prompts = buildScenarioPrompts(lesson, restructure);
    return `
        <div class="rounded-2xl border border-slate-200 bg-white p-6">
            <p class="font-semibold text-slate-800">Scenario Builder</p>
            <p class="text-slate-600 mt-2">${escapeHtml(restructure.activityPrompt)}</p>
            <div class="grid lg:grid-cols-3 gap-4 mt-5">
                ${prompts.map((prompt, index) => `
                    <div class="rounded-xl border border-slate-200 p-4">
                        <p class="text-sm uppercase tracking-[0.15em] text-rose-500 font-bold">Step ${index + 1}</p>
                        <p class="text-slate-700 mt-2">${escapeHtml(prompt)}</p>
                        <textarea class="w-full mt-3 rounded-lg border border-slate-200 p-3 min-h-[100px]" placeholder="Draft your response here."></textarea>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function buildPracticeSlide(lesson) {
    const prompts = lesson.practicePrompts || generatePracticePrompts(lesson);
    return `
        <section class="slide" data-title="Guided Practice">
            <div class="surface rounded-[2rem] p-8">
                <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Guided practice</p>
                <h3 class="text-3xl font-black text-slate-900 mt-2">Use the lesson language actively</h3>
                <div class="grid lg:grid-cols-2 gap-6 mt-8">
                    ${prompts.map((item, index) => `
                        <div class="rounded-[1.5rem] border border-slate-200 bg-white p-6">
                            <p class="text-sm uppercase tracking-[0.18em] text-rose-400 font-bold">Task ${index + 1}</p>
                            <p class="text-lg font-semibold text-slate-800 mt-3">${escapeHtml(item.title)}</p>
                            <p class="text-slate-600 mt-3">${escapeHtml(item.prompt)}</p>
                            <p class="text-sm text-slate-500 mt-4">${escapeHtml(item.tip)}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

function buildSpeakingStudioSlide(lesson, restructure) {
    const studioId = `studio-${lesson.number}`;
    const modelText = lesson.production.model;
    return `
        <section class="slide" data-title="Speaking Studio">
            <div class="surface rounded-[2rem] p-8">
                <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Speaking and listening integration</p>
                <h3 class="text-3xl font-black text-slate-900 mt-2">TTS + Recorder + Transcript</h3>
                <p class="text-slate-600 mt-4">${escapeHtml(restructure.productionBoost)}</p>
                <div class="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                    <p class="text-sm uppercase tracking-[0.15em] text-slate-500 font-bold">Speech draft</p>
                    <textarea id="speech-text-${studioId}" class="w-full mt-3 rounded-xl border border-slate-200 p-3 min-h-[120px]">${escapeHtml(modelText)}</textarea>
                    <div class="mt-4 flex items-center gap-3 flex-wrap">
                        <button type="button" class="speak-btn" data-speak="${escapeAttribute(modelText)}"><i class="fas fa-volume-up"></i> Listen model</button>
                        <button type="button" class="rounded-xl border border-slate-200 px-4 py-2 font-semibold hover:border-rose-300 transition" data-speak-from-text="${studioId}">Read text box</button>
                    </div>
                </div>
                <div class="grid lg:grid-cols-2 gap-6 mt-6">
                    <div class="rounded-2xl border border-slate-200 bg-white p-5">
                        <p class="text-sm uppercase tracking-[0.15em] text-slate-500 font-bold">Audio recording</p>
                        <div class="mt-4 flex items-center gap-3 flex-wrap">
                            <button type="button" class="rounded-xl bg-rose-600 text-white px-4 py-2 font-semibold hover:bg-rose-700 transition" data-record-action="start" data-record-studio="${studioId}">Start recording</button>
                            <button type="button" class="rounded-xl bg-slate-200 text-slate-700 px-4 py-2 font-semibold hover:bg-slate-300 transition" data-record-action="stop" data-record-studio="${studioId}">Stop</button>
                            <button type="button" class="rounded-xl border border-slate-200 px-4 py-2 font-semibold hover:border-rose-300 transition" data-record-action="play" data-record-studio="${studioId}">Play</button>
                        </div>
                        <audio controls class="w-full mt-4" data-record-audio="${studioId}"></audio>
                        <p class="text-sm font-semibold text-slate-600 mt-3" data-record-status="${studioId}">Recorder idle.</p>
                    </div>
                    <div class="rounded-2xl border border-slate-200 bg-white p-5">
                        <p class="text-sm uppercase tracking-[0.15em] text-slate-500 font-bold">Speech transcript</p>
                        <div class="mt-4 flex items-center gap-3 flex-wrap">
                            <button type="button" class="rounded-xl bg-rose-600 text-white px-4 py-2 font-semibold hover:bg-rose-700 transition" data-transcript-action="start" data-transcript-studio="${studioId}">Start transcript</button>
                            <button type="button" class="rounded-xl bg-slate-200 text-slate-700 px-4 py-2 font-semibold hover:bg-slate-300 transition" data-transcript-action="stop" data-transcript-studio="${studioId}">Stop</button>
                        </div>
                        <div class="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 min-h-[120px] text-slate-700" data-transcript-output="${studioId}">Transcript will appear here when recognition is available.</div>
                        <p class="text-sm font-semibold text-slate-600 mt-3" data-transcript-status="${studioId}">Recognition idle.</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function buildProductionSlide(lesson, restructure) {
    return `
        <section class="slide" data-title="Production">
            <div class="grid lg:grid-cols-[0.95fr_1.05fr] gap-6">
                <div class="surface rounded-[2rem] p-8">
                    <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Speaking task</p>
                    <h3 class="text-3xl font-black text-slate-900 mt-2">${escapeHtml(lesson.production.title)}</h3>
                    <div class="space-y-3 mt-6">
                        ${lesson.production.steps.map((step) => `
                            <div class="flex items-start gap-3 text-slate-700">
                                <i class="fas fa-angle-right text-rose-500 mt-1"></i>
                                <span>${escapeHtml(step)}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="mt-6 p-5 rounded-2xl bg-rose-50 border border-rose-100">
                        <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Model</p>
                        <p class="text-lg font-medium text-slate-800 mt-3">${escapeHtml(lesson.production.model)}</p>
                        <button class="speak-btn mt-4" data-speak="${escapeAttribute(lesson.production.model)}">
                            <i class="fas fa-volume-up"></i> Listen model
                        </button>
                    </div>
                </div>
                <div class="surface rounded-[2rem] p-8">
                    <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Homework and extension</p>
                    <h3 class="text-3xl font-black text-slate-900 mt-2">Take it further</h3>
                    <p class="text-lg text-slate-700 mt-6">${escapeHtml(lesson.homework)}</p>
                    <div class="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                        <p class="text-sm uppercase tracking-[0.18em] text-slate-500 font-bold">Production boost</p>
                        <p class="text-slate-700 mt-3">${escapeHtml(restructure.productionBoost)}</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function buildCompletionSlide(lesson) {
    return `
        <section class="slide" data-title="Lesson Complete">
            <div class="hero-card rounded-[2rem] p-10 text-center min-h-[420px] flex flex-col items-center justify-center">
                <i class="fas fa-award text-rose-500 text-7xl mb-6"></i>
                <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Lesson complete</p>
                <h3 class="text-5xl font-black text-slate-900 mt-2">${escapeHtml(lesson.title)}</h3>
                <p class="text-xl text-slate-600 mt-4 max-w-3xl">${escapeHtml(lesson.celebration)}</p>
            </div>
        </section>
    `;
}

function buildQuizQuestions(lesson) {
    const points = Array.isArray(lesson.grammar?.points) ? lesson.grammar.points.slice(0, 3) : [];
    const forms = points.map((point) => point[1]).filter(Boolean);
    const questions = points.map((point, index) => {
        const distractors = shuffleArray(forms.filter((_, idx) => idx !== index)).slice(0, 2);
        while (distractors.length < 2) {
            distractors.push(index % 2 === 0 ? 'Subject + verb + clear connector' : 'Basic form without target marker');
        }
        const options = shuffleArray([point[1], ...distractors]);
        return {
            question: `Choose the most suitable form for: ${point[0]}`,
            options,
            correctIndex: options.indexOf(point[1]),
            feedback: point[2]
        };
    });

    const vocab = lesson.vocabulary || [];
    if (vocab.length >= 3 && questions.length < 4) {
        const first = vocab[0];
        const options = shuffleArray(vocab.slice(0, 3).map((item) => item[1]));
        questions.push({
            question: `Choose the closest meaning for: ${first[0]}`,
            options,
            correctIndex: options.indexOf(first[1]),
            feedback: first[2]
        });
    }

    return questions;
}

function buildOrderingSequence(lesson) {
    const dialogue = Array.isArray(lesson.dialogue) ? lesson.dialogue : [];
    if (dialogue.length >= 3) {
        return dialogue.slice(0, 4).map((line, index) => ({
            id: `d${index}`,
            label: `${line[0]}: ${line[1]}`
        }));
    }

    const productionSteps = Array.isArray(lesson.production?.steps) ? lesson.production.steps : [];
    if (productionSteps.length >= 3) {
        return productionSteps.slice(0, 4).map((step, index) => ({
            id: `p${index}`,
            label: step
        }));
    }

    return (lesson.checkpoint || []).slice(0, 4).map((item, index) => ({
        id: `c${index}`,
        label: item
    }));
}

function buildScenarioPrompts(lesson, restructure) {
    const fromProduction = Array.isArray(lesson.production?.steps) ? lesson.production.steps : [];
    const candidates = [
        ...fromProduction.slice(0, 2),
        `Use this focus clearly: ${lesson.focus}`,
        `Respond to this scenario: ${restructure.activityPrompt}`
    ];
    return candidates.slice(0, 3);
}

function generatePracticePrompts(lesson) {
    const tag = `${lesson.title} ${lesson.focus}`.toLowerCase();
    const generic = [
        {
            title: 'Pattern awareness',
            prompt: `Find one line in the dialogue that clearly models: ${lesson.focus}. Explain why it works.`,
            tip: 'Name the meaning choice, not only the grammar label.'
        },
        {
            title: 'Rebuild with variation',
            prompt: 'Rewrite part of the dialogue with your own details while keeping the same communicative goal.',
            tip: 'Keep structure, change context.'
        },
        {
            title: 'Personal transfer',
            prompt: `Write one sentence about your life and one about work/study using: ${lesson.grammar.title}.`,
            tip: 'Sound natural and specific.'
        },
        {
            title: 'Vocabulary in action',
            prompt: `Use at least three words from this lesson vocabulary set in a short response.`,
            tip: 'Avoid isolated phrases; connect ideas.'
        }
    ];

    if (tag.includes('present perfect')) {
        generic[0].prompt = 'Choose when present perfect is better than past simple and justify the timeline choice.';
        generic[1].prompt = 'Ask and answer one Have you ever...? exchange with a meaningful follow-up detail.';
    }

    if (tag.includes('opinion') || tag.includes('disagreement')) {
        generic[1].prompt = 'Write a 4-line micro debate: opinion, different view, polite response, conclusion.';
        generic[1].tip = 'Balance confidence and politeness.';
    }

    if (tag.includes('passive')) {
        generic[2].prompt = 'Rewrite one active sentence into passive and explain the shift in focus.';
    }

    if (tag.includes('second conditional') || tag.includes('wish')) {
        generic[2].prompt = 'Build one hypothetical sentence and one wish sentence about your current reality.';
    }

    return generic;
}

function initializeQuizBoards(root, runtime) {
    root.querySelectorAll('[data-quiz-board]').forEach((board) => {
        const boardId = board.dataset.quizBoard;
        const total = board.querySelectorAll('[data-quiz-item="true"]').length;
        const seconds = parseInt(board.dataset.quizSeconds || '120', 10);
        runtime.quiz[boardId] = {
            total,
            score: 0,
            answered: {},
            remaining: seconds,
            interval: null,
            timeUp: false,
            completed: false,
            started: false
        };

        const timerEl = root.querySelector(`[data-quiz-timer="${boardId}"]`);
        if (timerEl) {
            timerEl.textContent = formatClock(seconds);
        }

        const scoreEl = root.querySelector(`[data-quiz-score="${boardId}"]`);
        if (scoreEl) {
            scoreEl.textContent = `0 / ${total}`;
        }
    });
}

function startQuizTimer(boardId, runtime) {
    const state = runtime.quiz[boardId];
    if (!state || state.interval || state.timeUp) return;

    const timerEl = document.querySelector(`[data-quiz-timer="${boardId}"]`);
    const boardEl = document.querySelector(`[data-quiz-board="${boardId}"]`);
    if (!timerEl || !boardEl) return;

    const render = () => {
        const minutes = String(Math.floor(state.remaining / 60)).padStart(2, '0');
        const seconds = String(state.remaining % 60).padStart(2, '0');
        timerEl.textContent = `${minutes}:${seconds}`;
    };
    render();

    state.interval = window.setInterval(() => {
        if (state.timeUp) return;
        state.remaining -= 1;
        render();
        if (state.remaining <= 0) {
            state.timeUp = true;
            window.clearInterval(state.interval);
            state.interval = null;
            boardEl.querySelectorAll('.lab-quiz-option').forEach((btn) => {
                btn.disabled = true;
                btn.classList.add('opacity-60');
            });
        }
    }, 1000);
}

function handleMemoryClick(event, runtime) {
    const card = event.target.closest('.memory-card');
    if (!card) return false;

    const boardId = card.dataset.memoryBoard;
    const board = document.querySelector(`[data-memory-board="${boardId}"]`);
    const feedback = document.getElementById(`memory-feedback-${boardId}`);
    if (!board || !feedback) return true;

    if (!runtime.memory[boardId]) {
        runtime.memory[boardId] = {
            open: [],
            lock: false,
            matched: 0,
            total: parseInt(board.dataset.memoryTotal || '0', 10)
        };
    }

    const state = runtime.memory[boardId];
    if (state.lock || card.dataset.matched === 'true' || card.dataset.open === 'true') return true;

    revealMemoryCard(card);
    state.open.push(card);

    if (state.open.length < 2) return true;
    state.lock = true;

    const [first, second] = state.open;
    const isMatch = first.dataset.memoryPair === second.dataset.memoryPair;
    if (isMatch) {
        first.dataset.matched = 'true';
        second.dataset.matched = 'true';
        first.classList.add('ring-2', 'ring-green-400', 'bg-green-50');
        second.classList.add('ring-2', 'ring-green-400', 'bg-green-50');
        state.matched += 1;
        feedback.textContent = `Nice! ${state.matched}/${state.total} pairs matched.`;
        state.open = [];
        state.lock = false;
        if (state.matched >= state.total) {
            feedback.textContent = 'Excellent! You matched all pairs.';
            feedback.className = 'mt-4 text-sm font-semibold text-green-700';
        }
    } else {
        feedback.textContent = 'Not a match. Try another pair.';
        feedback.className = 'mt-4 text-sm font-semibold text-amber-700';
        window.setTimeout(() => {
            hideMemoryCard(first);
            hideMemoryCard(second);
            state.open = [];
            state.lock = false;
            feedback.className = 'mt-4 text-sm font-semibold text-slate-600';
            feedback.textContent = 'Find all pairs.';
        }, 850);
    }

    return true;
}

function revealMemoryCard(card) {
    card.dataset.open = 'true';
    card.classList.add('border-rose-300', 'bg-rose-50');
    const cover = card.querySelector('.memory-cover');
    const value = card.querySelector('.memory-value');
    if (cover) cover.classList.add('hidden');
    if (value) value.classList.remove('hidden');
}

function hideMemoryCard(card) {
    card.dataset.open = 'false';
    card.classList.remove('border-rose-300', 'bg-rose-50');
    const cover = card.querySelector('.memory-cover');
    const value = card.querySelector('.memory-value');
    if (cover) cover.classList.remove('hidden');
    if (value) value.classList.add('hidden');
}

function handleQuizClick(event, runtime) {
    const button = event.target.closest('.lab-quiz-option');
    if (!button) return false;

    const boardId = button.dataset.quizBoard;
    const questionBox = button.closest('[data-quiz-item="true"]');
    const questionId = questionBox ? questionBox.dataset.quizQuestionId : '';
    const state = runtime.quiz[boardId];
    if (!state || !questionBox || !questionId) return true;

    if (!state.started) {
        state.started = true;
        startQuizTimer(boardId, runtime);
    }

    if (state.timeUp || state.answered[questionId] || questionBox.dataset.quizAnswered === 'true') return true;

    const options = Array.from(questionBox.querySelectorAll('.lab-quiz-option'));
    options.forEach((option) => {
        option.disabled = true;
        const isCorrect = option.dataset.quizCorrect === 'true';
        styleQuizOptionState(option, isCorrect ? 'correct' : 'muted');
        setQuizOptionBadge(option, isCorrect ? '✓' : '');
    });

    const correctOptionEl = options.find((option) => option.dataset.quizCorrect === 'true');
    const correctText = correctOptionEl ? correctOptionEl.textContent.trim() : '';
    const extraFeedback = (button.dataset.quizFeedback || '').trim();

    if (button.dataset.quizCorrect === 'true') {
        state.score += 1;
        styleQuizOptionState(button, 'correct-focus');
        setQuizOptionBadge(button, '✓');
    } else {
        styleQuizOptionState(button, 'wrong');
        setQuizOptionBadge(button, '✗');
    }

    state.answered[questionId] = true;
    questionBox.dataset.quizAnswered = 'true';
    const feedback = questionBox.querySelector('[data-quiz-feedback]');
    if (feedback) {
        if (button.dataset.quizCorrect === 'true') {
            feedback.textContent = extraFeedback ? `Correto. ${extraFeedback}` : 'Correto.';
        } else {
            feedback.textContent = extraFeedback
                ? `Incorreto. Resposta correta: "${correctText}". ${extraFeedback}`
                : `Incorreto. Resposta correta: "${correctText}".`;
        }
        feedback.className = 'mt-3 text-sm text-slate-600';
    }

    const scoreEl = document.querySelector(`[data-quiz-score="${boardId}"]`);
    if (scoreEl) scoreEl.textContent = `${state.score} / ${state.total}`;

    if (Object.keys(state.answered).length >= state.total) {
        state.completed = true;
        if (state.interval) {
            window.clearInterval(state.interval);
            state.interval = null;
        }
    }

    return true;
}

function styleQuizOptionState(option, state) {
    if (!option) return;

    option.style.transition = 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease';
    option.style.borderWidth = '1px';
    option.style.borderRadius = '0.75rem';
    option.style.lineHeight = '1.35';
    option.style.fontWeight = '600';

    if (state === 'correct') {
        option.style.backgroundColor = '#ecfdf3';
        option.style.borderColor = '#22c55e';
        option.style.color = '#0f172a';
        option.style.boxShadow = 'none';
        return;
    }

    if (state === 'correct-focus') {
        option.style.backgroundColor = '#dcfce7';
        option.style.borderColor = '#16a34a';
        option.style.color = '#0f172a';
        option.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.18)';
        return;
    }

    if (state === 'wrong') {
        option.style.backgroundColor = '#fef2f2';
        option.style.borderColor = '#ef4444';
        option.style.color = '#0f172a';
        option.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.16)';
        return;
    }

    if (state === 'muted') {
        option.style.backgroundColor = '#f8fafc';
        option.style.borderColor = '#d1d5db';
        option.style.color = '#334155';
        option.style.boxShadow = 'none';
    }
}

function setQuizOptionBadge(option, symbol) {
    if (!option) return;

    const existing = option.querySelector('[data-quiz-badge]');
    if (existing) existing.remove();
    if (!symbol) return;

    option.style.display = 'flex';
    option.style.alignItems = 'center';
    option.style.justifyContent = 'space-between';
    option.style.gap = '0.5rem';

    const badge = document.createElement('span');
    badge.setAttribute('data-quiz-badge', 'true');
    badge.textContent = symbol;
    badge.style.fontWeight = '800';
    badge.style.fontSize = '0.95rem';
    badge.style.lineHeight = '1';
    badge.style.flex = '0 0 auto';
    badge.style.opacity = '0.95';

    option.appendChild(badge);
}

function handleOrderingDragStart(event, runtime) {
    const item = event.target.closest('.ordering-item');
    if (!item) return;
    runtime.orderDrag.itemId = item.dataset.orderId;
    runtime.orderDrag.boardId = item.dataset.orderBoard;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', item.dataset.orderId);
    item.classList.add('opacity-60');
}

function handleOrderingDragEnd(event, runtime) {
    const item = event.target.closest('.ordering-item');
    if (item) item.classList.remove('opacity-60');
    runtime.orderDrag.itemId = null;
    runtime.orderDrag.boardId = null;
}

function handleOrderingDragOver(event) {
    if (!event.target.closest('.ordering-item')) return;
    event.preventDefault();
}

function handleOrderingDrop(event, runtime) {
    const targetItem = event.target.closest('.ordering-item');
    if (!targetItem) return;
    event.preventDefault();

    const draggedId = runtime.orderDrag.itemId;
    const boardId = runtime.orderDrag.boardId;
    if (!draggedId || !boardId || targetItem.dataset.orderBoard !== boardId) return;

    const board = document.querySelector(`[data-order-board="${boardId}"]`);
    const dragged = board ? board.querySelector(`[data-order-id="${draggedId}"]`) : null;
    if (!board || !dragged || dragged === targetItem) return;

    const rect = targetItem.getBoundingClientRect();
    const shouldInsertBefore = event.clientY < rect.top + rect.height / 2;
    board.insertBefore(dragged, shouldInsertBefore ? targetItem : targetItem.nextSibling);
}

function handleOrderingCheck(event) {
    const button = event.target.closest('[data-order-check]');
    if (!button) return false;

    const boardId = button.dataset.orderCheck;
    const board = document.querySelector(`[data-order-board="${boardId}"]`);
    const feedback = document.getElementById(`order-feedback-${boardId}`);
    if (!board || !feedback) return true;

    const current = Array.from(board.querySelectorAll('.ordering-item')).map((item) => item.dataset.orderId);
    const expected = JSON.parse(board.dataset.orderCorrect || '[]');
    const isCorrect = expected.length === current.length && expected.every((item, index) => item === current[index]);

    if (isCorrect) {
        feedback.textContent = 'Great sequence. Your order is correct.';
        feedback.className = 'text-sm font-semibold text-green-700';
    } else {
        feedback.textContent = 'Not yet. Recheck transitions and logical order.';
        feedback.className = 'text-sm font-semibold text-amber-700';
    }
    return true;
}

function handleDebateClick(event, runtime) {
    const actionButton = event.target.closest('[data-debate-action]');
    if (actionButton) {
        const boardId = actionButton.dataset.debateBoard;
        if (!runtime.debate[boardId]) runtime.debate[boardId] = { a: 0, b: 0, timer: null, remaining: 120 };
        const state = runtime.debate[boardId];
        const timerEl = document.querySelector(`[data-debate-timer="${boardId}"]`);
        const board = document.querySelector(`[data-debate-board="${boardId}"]`);
        const defaultSeconds = parseInt(board?.dataset.debateSeconds || '120', 10);

        if (actionButton.dataset.debateAction === 'start') {
            if (state.timer) window.clearInterval(state.timer);
            state.remaining = defaultSeconds;
            if (timerEl) timerEl.textContent = formatClock(state.remaining);
            state.timer = window.setInterval(() => {
                state.remaining -= 1;
                if (timerEl) timerEl.textContent = formatClock(Math.max(state.remaining, 0));
                if (state.remaining <= 0) {
                    window.clearInterval(state.timer);
                    state.timer = null;
                }
            }, 1000);
        }

        if (actionButton.dataset.debateAction === 'stop' && state.timer) {
            window.clearInterval(state.timer);
            state.timer = null;
        }
        return true;
    }

    const voteButton = event.target.closest('[data-debate-vote]');
    if (!voteButton) return false;
    const boardId = voteButton.dataset.debateBoard;
    if (!runtime.debate[boardId]) runtime.debate[boardId] = { a: 0, b: 0, timer: null, remaining: 120 };
    const side = voteButton.dataset.debateVote === 'b' ? 'b' : 'a';
    runtime.debate[boardId][side] += 1;
    const scoreEl = document.querySelector(`[data-debate-score="${boardId}-${side}"]`);
    if (scoreEl) scoreEl.textContent = String(runtime.debate[boardId][side]);
    return true;
}

function formatClock(totalSeconds) {
    const value = Math.max(0, totalSeconds);
    const minutes = String(Math.floor(value / 60)).padStart(2, '0');
    const seconds = String(value % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
}

async function handleRecordingClick(event, runtime) {
    const button = event.target.closest('[data-record-action]');
    if (!button) return false;

    const studioId = button.dataset.recordStudio;
    if (!runtime.recorder[studioId]) {
        runtime.recorder[studioId] = { recorder: null, stream: null, chunks: [], url: '' };
    }
    const state = runtime.recorder[studioId];
    const statusEl = document.querySelector(`[data-record-status="${studioId}"]`);
    const audioEl = document.querySelector(`[data-record-audio="${studioId}"]`);

    if (button.dataset.recordAction === 'start') {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            if (statusEl) statusEl.textContent = 'MediaRecorder is not supported in this browser.';
            return true;
        }
        if (state.recorder && state.recorder.state === 'recording') return true;

        try {
            state.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            state.chunks = [];
            state.recorder = new MediaRecorder(state.stream);
            state.recorder.ondataavailable = (recordEvent) => {
                if (recordEvent.data && recordEvent.data.size > 0) state.chunks.push(recordEvent.data);
            };
            state.recorder.onstop = () => {
                const blob = new Blob(state.chunks, { type: 'audio/webm' });
                if (state.url) URL.revokeObjectURL(state.url);
                state.url = URL.createObjectURL(blob);
                if (audioEl) audioEl.src = state.url;
                if (statusEl) statusEl.textContent = 'Recording ready. You can play it now.';
            };
            state.recorder.start();
            if (statusEl) statusEl.textContent = 'Recording... speak clearly and naturally.';
        } catch (error) {
            if (statusEl) statusEl.textContent = 'Could not start recording. Check microphone permissions.';
        }
        return true;
    }

    if (button.dataset.recordAction === 'stop') {
        if (state.recorder && state.recorder.state === 'recording') {
            state.recorder.stop();
            if (state.stream) {
                state.stream.getTracks().forEach((track) => track.stop());
                state.stream = null;
            }
            if (statusEl) statusEl.textContent = 'Processing recording...';
        }
        return true;
    }

    if (button.dataset.recordAction === 'play') {
        if (audioEl && audioEl.src) {
            audioEl.play();
            if (statusEl) statusEl.textContent = 'Playing saved recording.';
        } else if (statusEl) {
            statusEl.textContent = 'Record something first.';
        }
        return true;
    }

    return true;
}

function handleTranscriptClick(event, runtime) {
    const button = event.target.closest('[data-transcript-action]');
    if (!button) {
        const speakFromText = event.target.closest('[data-speak-from-text]');
        if (speakFromText) {
            const studioId = speakFromText.dataset.speakFromText;
            const textArea = document.getElementById(`speech-text-${studioId}`);
            const text = textArea ? textArea.value : '';
            if ('speechSynthesis' in window && text.trim()) {
                const utterance = new SpeechSynthesisUtterance(text.trim());
                utterance.lang = 'en-US';
                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(utterance);
            }
            return true;
        }
        return false;
    }

    const studioId = button.dataset.transcriptStudio;
    if (!runtime.speech[studioId]) runtime.speech[studioId] = { recognition: null, active: false };
    const state = runtime.speech[studioId];
    const outputEl = document.querySelector(`[data-transcript-output="${studioId}"]`);
    const statusEl = document.querySelector(`[data-transcript-status="${studioId}"]`);
    const RecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!RecognitionCtor) {
        if (statusEl) statusEl.textContent = 'SpeechRecognition is not available in this browser.';
        return true;
    }

    if (button.dataset.transcriptAction === 'start') {
        if (state.active) return true;

        const recognition = new RecognitionCtor();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = (resultEvent) => {
            let transcript = '';
            for (let i = 0; i < resultEvent.results.length; i += 1) {
                transcript += `${resultEvent.results[i][0].transcript} `;
            }
            if (outputEl) outputEl.textContent = transcript.trim();
        };
        recognition.onerror = () => {
            if (statusEl) statusEl.textContent = 'Recognition error. Try again in a quieter place.';
            state.active = false;
        };
        recognition.onend = () => {
            state.active = false;
            if (statusEl) statusEl.textContent = 'Recognition stopped.';
        };
        recognition.start();
        state.recognition = recognition;
        state.active = true;
        if (statusEl) statusEl.textContent = 'Listening... speak naturally.';
        return true;
    }

    if (button.dataset.transcriptAction === 'stop') {
        if (state.recognition && state.active) {
            state.recognition.stop();
        }
        state.active = false;
        if (statusEl) statusEl.textContent = 'Recognition stopped by user.';
        return true;
    }

    return true;
}
