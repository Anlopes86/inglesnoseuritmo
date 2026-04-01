document.addEventListener('DOMContentLoaded', () => {
    const lessonNumber = getLessonNumberFromPath();
    const lesson = Array.isArray(window.B1_LESSONS) ? window.B1_LESSONS.find(item => item.number === lessonNumber) : null;

    if (!lesson) {
        document.getElementById('slides-root').innerHTML = `
            <div class="surface rounded-[2rem] p-10 text-center">
                <h2 class="text-3xl font-black text-slate-900 mb-3">Lição não encontrada</h2>
                <p class="text-slate-600">Não foi possível carregar os dados desta lição B1.</p>
            </div>
        `;
        return;
    }

    const slides = buildSlides(lesson);
    const root = document.getElementById('slides-root');
    root.innerHTML = slides;

    document.getElementById('lesson-title').textContent = `B1 - Lesson ${lesson.number}: ${lesson.title}`;
    document.title = `B1 - Lesson ${lesson.number}: ${lesson.title} | Inglês no seu Ritmo`;

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
            document.querySelectorAll(`[data-group="${group}"]`).forEach(btn => {
                btn.disabled = true;
                const isCorrect = btn.dataset.correct === 'true';
                btn.classList.add(isCorrect ? 'correct' : 'incorrect');
            });
            if (feedback) {
                feedback.textContent = answer;
                feedback.className = 'mt-3 text-sm font-semibold text-slate-600';
            }
        }
    });

    root.addEventListener('blur', event => {
        const input = event.target.closest('.practice-input');
        if (!input) return;
        const value = normalize(input.value);
        const answer = normalize(input.dataset.answer);
        input.classList.remove('correct', 'incorrect', 'revealed');
        if (!value) return;
        input.classList.add(value === answer ? 'correct' : 'incorrect');
    }, true);

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
    return (text || '')
        .toLowerCase()
        .trim()
        .replace(/[.!?]/g, '')
        .replace(/\s+/g, ' ');
}

function buildSlides(lesson) {
    return `
        <section class="slide active" data-title="Warm-up">
            <div class="hero-card rounded-[2rem] p-8 md:p-10">
                <div class="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
                    <div>
                        <p class="text-sm font-extrabold uppercase tracking-[0.22em] text-rose-500">${lesson.unit}</p>
                        <h2 class="text-4xl md:text-5xl font-black mt-3 text-slate-900">${lesson.title}</h2>
                        <p class="text-lg text-slate-600 mt-5 max-w-2xl">${lesson.objective}</p>
                        <div class="flex flex-wrap gap-3 mt-6">
                            <span class="chip"><i class="fas fa-bullseye"></i> ${lesson.focus}</span>
                            <span class="chip"><i class="fas fa-user-check"></i> ${lesson.cefr}</span>
                        </div>
                    </div>
                    <div class="surface rounded-[1.5rem] p-6">
                        <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Warm-up prompt</p>
                        <p class="text-xl font-semibold text-slate-800 mt-3">${lesson.warmup}</p>
                        <div class="mt-6 space-y-3">
                            ${lesson.checkpoint.map(item => `<div class="flex items-start gap-3 text-slate-700"><i class="fas fa-check-circle text-rose-500 mt-1"></i><span>${item}</span></div>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="slide" data-title="Dialogue">
            <div class="surface rounded-[2rem] p-8">
                <div class="flex items-center justify-between gap-4 flex-wrap mb-6">
                    <div>
                        <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Dialogue model</p>
                        <h3 class="text-3xl font-black text-slate-900 mt-2">${lesson.dialogueTitle}</h3>
                    </div>
                    <button class="speak-btn" data-speak="${escapeAttribute(lesson.dialogue.map(line => line[1]).join(' '))}">
                        <i class="fas fa-volume-up"></i> Ouvir tudo
                    </button>
                </div>
                <div class="space-y-5 text-lg">
                    ${lesson.dialogue.map(line => `
                        <div class="flex items-start gap-4 flex-wrap">
                            <p class="w-24 font-bold ${line[0] === 'Teacher' ? 'text-rose-600' : 'text-orange-600'}">${line[0]}:</p>
                            <div class="flex-1 min-w-[220px]">
                                <p>${line[1]}</p>
                            </div>
                            <button class="speak-btn" data-speak="${escapeAttribute(line[1])}">
                                <i class="fas fa-volume-up"></i> Ouvir
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section class="slide" data-title="Language Focus">
            <div class="surface rounded-[2rem] p-8">
                <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Language focus</p>
                <h3 class="text-3xl font-black text-slate-900 mt-2">${lesson.grammar.title}</h3>
                <p class="text-lg text-slate-600 mt-4">${lesson.grammar.intro}</p>
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
                                    <td class="p-4 font-semibold">${point[0]}</td>
                                    <td class="p-4">${point[1]}</td>
                                    <td class="p-4">${point[2]}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <section class="slide" data-title="Vocabulary">
            <div class="text-center">
                <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Vocabulary set</p>
                <h3 class="text-4xl font-black text-slate-900 mt-2">${lesson.vocabTitle}</h3>
                <p class="text-slate-600 text-lg mt-3 mb-8">Clique para virar o card e ver tradução e exemplo.</p>
                <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    ${lesson.vocabulary.map(item => `
                        <div class="vocab-card">
                            <div class="vocab-card-inner">
                                <div class="vocab-face vocab-front">
                                    <p class="text-sm uppercase tracking-[0.18em] text-rose-400 font-bold">Front</p>
                                    <h4 class="text-2xl font-black text-slate-900 mt-3">${item[0]}</h4>
                                </div>
                                <div class="vocab-face vocab-back text-left">
                                    <p class="text-sm uppercase tracking-[0.18em] text-white/70 font-bold">Meaning</p>
                                    <h4 class="text-2xl font-black mt-3">${item[1]}</h4>
                                    <p class="mt-4 text-white/90">${item[2]}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section class="slide" data-title="Guided Practice">
            <div class="surface rounded-[2rem] p-8">
                <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Guided practice</p>
                <h3 class="text-3xl font-black text-slate-900 mt-2">Use the lesson language actively</h3>
                <div class="grid lg:grid-cols-2 gap-6 mt-8">
                    ${(lesson.practicePrompts || generatePracticePrompts(lesson)).map((item, index) => `
                        <div class="rounded-[1.5rem] border border-slate-200 bg-white p-6">
                            <p class="text-sm uppercase tracking-[0.18em] text-rose-400 font-bold">Task ${index + 1}</p>
                            <p class="text-lg font-semibold text-slate-800 mt-3">${item.title}</p>
                            <p class="text-slate-600 mt-3">${item.prompt}</p>
                            <p class="text-sm text-slate-500 mt-4">${item.tip}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section class="slide" data-title="Production">
            <div class="grid lg:grid-cols-[0.95fr_1.05fr] gap-6">
                <div class="surface rounded-[2rem] p-8">
                    <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Speaking task</p>
                    <h3 class="text-3xl font-black text-slate-900 mt-2">${lesson.production.title}</h3>
                    <div class="space-y-3 mt-6">
                        ${lesson.production.steps.map(step => `
                            <div class="flex items-start gap-3 text-slate-700">
                                <i class="fas fa-angle-right text-rose-500 mt-1"></i>
                                <span>${step}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="mt-6 p-5 rounded-2xl bg-rose-50 border border-rose-100">
                        <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Model</p>
                        <p class="text-lg font-medium text-slate-800 mt-3">${lesson.production.model}</p>
                        <button class="speak-btn mt-4" data-speak="${escapeAttribute(lesson.production.model)}">
                            <i class="fas fa-volume-up"></i> Ouvir modelo
                        </button>
                    </div>
                    <div class="mt-6 p-5 rounded-2xl bg-white border border-slate-200">
                        <p class="text-sm uppercase tracking-[0.18em] text-slate-500 font-bold">Self-check</p>
                        <div class="space-y-3 mt-4">
                            ${buildSelfCheckItems(lesson).map(item => `
                                <div class="flex items-start gap-3 text-slate-700">
                                    <i class="fas fa-check text-rose-400 mt-1"></i>
                                    <span>${item}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="surface rounded-[2rem] p-8">
                    <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Homework</p>
                    <h3 class="text-3xl font-black text-slate-900 mt-2">Take it further</h3>
                    <p class="text-lg text-slate-700 mt-6">${lesson.homework}</p>
                    <div class="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                        <p class="text-sm uppercase tracking-[0.18em] text-slate-500 font-bold">B1 reminder</p>
                        <p class="text-slate-700 mt-3">No B1, o aluno já consegue organizar ideias em mais de uma frase. Priorize clareza, conectores simples e exemplos reais.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="slide" data-title="Lesson Complete">
            <div class="hero-card rounded-[2rem] p-10 text-center min-h-[420px] flex flex-col items-center justify-center">
                <i class="fas fa-award text-rose-500 text-7xl mb-6"></i>
                <p class="text-sm uppercase tracking-[0.18em] text-rose-500 font-bold">Lesson complete</p>
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

function buildSelfCheckItems(lesson) {
    const title = (lesson.title || '').toLowerCase();
    const focus = (lesson.focus || '').toLowerCase();
    const tag = `${title} ${focus}`;
    const items = [
        "Use at least two complete sentences.",
        "Add one connector such as because, but, so, if or when.",
        "Include one detail that sounds real for your life, work or study."
    ];

    if (tag.includes('opinion') || tag.includes('disagreement')) {
        items.push("State an opinion and react politely to a different view.");
    } else if (tag.includes('first conditional')) {
        items.push("Show one clear condition and one result.");
    } else if (tag.includes('present perfect')) {
        items.push("Make sure the sentence sounds like experience or result now, not a finished past time.");
    } else if (tag.includes('used to')) {
        items.push("Make the contrast between before and now very clear.");
    } else if (tag.includes('reported speech')) {
        items.push("Retell the message clearly without losing the original meaning.");
    } else if (tag.includes('relative clauses')) {
        items.push("Use the clause to make the description clearer, not just longer.");
    } else if (tag.includes('passive')) {
        items.push("Keep the focus on the action or result, not only on the grammar form.");
    } else if (tag.includes('second conditional') || tag.includes('wish')) {
        items.push("Make it clear that the situation is imaginary, hypothetical or unreal now.");
    } else if (tag.includes('persuading') || tag.includes('presentation')) {
        items.push("Include a main point, support and a short conclusion.");
    } else {
        items.push("Check that the grammar choice matches the meaning you want to express.");
    }

    return items;
}

function generatePracticePrompts(lesson) {
    const lowerTitle = (lesson.title || '').toLowerCase();
    const lowerFocus = (lesson.focus || '').toLowerCase();
    const focusTag = `${lowerTitle} ${lowerFocus}`;

    const defaultPrompts = [
        {
            title: "Notice the pattern",
            prompt: `Look at the dialogue again and identify one sentence that clearly shows this lesson target: ${lesson.focus}. Then explain why that form was chosen.`,
            tip: "Do not only copy the sentence. Name the clue: time, intention, opinion, condition, result or experience."
        },
        {
            title: "Rebuild with support",
            prompt: `Retell the dialogue from this lesson in your own words, but keep the same communication goal: ${lesson.focus}.`,
            tip: "Change details, but keep the same grammar logic and one connector such as because, but, so or if."
        },
        {
            title: "Transform the idea",
            prompt: `Write one sentence about yourself and one about work, study or daily life using this target clearly: ${lesson.grammar.title}.`,
            tip: "Check whether the meaning is really the same as the target. A correct form with the wrong use does not count."
        },
        {
            title: "Use vocabulary with purpose",
            prompt: `Choose three words from the vocabulary set and use them in a short response connected to ${lesson.title.toLowerCase()}.`,
            tip: "Keep the response natural. One short paragraph is enough if every word has a clear function."
        }
    ];

    if (focusTag.includes('present perfect')) {
        return [
            {
                title: "Choose the timeline",
                prompt: "Decide which sentence should use present perfect and which should use past simple: an experience with no time given, or a finished event with a clear time.",
                tip: "Ask yourself: does the sentence say when? If yes, simple past is usually the safer choice."
            },
            {
                title: "Answer like real conversation",
                prompt: "Write one short exchange with Have you ever...? and answer it with Yes, I have / No, I haven't plus one extra detail.",
                tip: "The first sentence can be short. The second sentence should add meaning, not just repeat the question."
            },
            {
                title: "Expand an experience",
                prompt: "Start with one present perfect sentence about your life and then add one follow-up sentence explaining why it mattered.",
                tip: "Use present perfect to open the topic, then add a reason, result or reaction."
            },
            {
                title: "Vocabulary in reflection",
                prompt: `Use three words from the vocabulary list to describe progress, change or experience connected to ${lesson.title.toLowerCase()}.`,
                tip: "Try to sound reflective, not like isolated vocabulary practice."
            }
        ];
    }

    if (focusTag.includes('used to')) {
        return [
            {
                title: "Then and now",
                prompt: "Write two sentences with used to and two contrasting sentences with now or these days.",
                tip: "The change matters more than the grammar label. Make the contrast very clear."
            },
            {
                title: "Spot the meaning",
                prompt: "Explain why used to is better than simple past in one sentence about an old habit.",
                tip: "Use used to when the situation was true before and is different now."
            },
            {
                title: "Guided speaking",
                prompt: "Say one thing you used to do, one thing you did not use to do and one reason the change happened.",
                tip: "Use because or but now to connect the ideas."
            },
            {
                title: "Vocabulary in context",
                prompt: "Choose three vocabulary items and use them in a short then-and-now paragraph.",
                tip: "A useful response sounds like a mini story of change."
            }
        ];
    }

    if (focusTag.includes('future plans') || focusTag.includes('going to') || focusTag.includes('arrangements')) {
        return [
            {
                title: "Choose the future form",
                prompt: "Write one sentence for a fixed arrangement and one for a personal intention. Then decide which one needs present continuous and which one needs going to.",
                tip: "An arranged time in the calendar usually sounds stronger with present continuous."
            },
            {
                title: "Build a mini calendar",
                prompt: "Create three short future plans for this week or next month: one meeting, one personal plan and one follow-up question.",
                tip: "Use time markers so the plan sounds real and practical."
            },
            {
                title: "Reschedule and react",
                prompt: "Imagine one plan changed. Write a short response that explains the change and proposes a new arrangement.",
                tip: "A strong B1 answer keeps the communication moving, not only the grammar."
            },
            {
                title: "Vocabulary for planning",
                prompt: "Use three vocabulary items to write a realistic message about your availability, schedule or next step.",
                tip: "This should sound like a real text or spoken update."
            }
        ];
    }

    if (focusTag.includes('will, might') || focusTag.includes('prediction') || focusTag.includes('possibilit')) {
        return [
            {
                title: "How certain is it?",
                prompt: "Write one strong prediction with will and one less certain idea with might or maybe.",
                tip: "Do not make both sentences sound equally certain."
            },
            {
                title: "Add probability language",
                prompt: "Take a simple future sentence and rewrite it using probably so it sounds more balanced.",
                tip: "Probability words help B1 answers sound less absolute."
            },
            {
                title: "Predict with support",
                prompt: "Answer this question in three sentences: What might change in work, study or technology this year?",
                tip: "Give at least one reason or example for one prediction."
            },
            {
                title: "Vocabulary for trends",
                prompt: "Use three vocabulary items in a short paragraph about a future trend or uncertain outcome.",
                tip: "Your paragraph should sound analytical, not random."
            }
        ];
    }

    if (focusTag.includes('first conditional')) {
        return [
            {
                title: "Build the pattern",
                prompt: "Complete two ideas using the first conditional: one about study or work and one about health or money.",
                tip: "Use present simple after if and will in the result clause."
            },
            {
                title: "Cause and consequence",
                prompt: "Turn one everyday problem into a first conditional sentence and then reverse the order of the clauses.",
                tip: "Both versions should mean the same thing."
            },
            {
                title: "Decision practice",
                prompt: "Answer this question in two sentences: What will you do if your plan changes suddenly?",
                tip: "Show one condition and one backup action."
            },
            {
                title: "Vocabulary for outcomes",
                prompt: "Use two vocabulary items from the lesson in a short conditional response about a real possibility.",
                tip: "This should sound like planning, not like a random example."
            }
        ];
    }

    if (focusTag.includes('integrated review') || focusTag.includes('integrated final performance')) {
        return [
            {
                title: "Choose the right frame",
                prompt: "Write three short ideas about your life: one past habit, one present result and one future plan. Then label the grammar choice for each.",
                tip: "This task is about selection. Start from meaning, then choose the form."
            },
            {
                title: "Retell across time",
                prompt: "Build a four-sentence update that moves from past to present to future without sounding disconnected.",
                tip: "Use connectors to guide the listener through the timeline."
            },
            {
                title: "Repair the mismatch",
                prompt: "Check one sentence that sounds wrong for the meaning and rewrite it with a better tense or structure.",
                tip: "Ask yourself what the speaker really wants to express: habit, result, plan, opinion or condition."
            },
            {
                title: "Vocabulary in reflection",
                prompt: "Use three review words in a short self-update about progress, challenge and next step.",
                tip: "A good review answer should sound personal and organized."
            }
        ];
    }

    if (focusTag.includes('should, could') || focusTag.includes('lets') || focusTag.includes('why dont we') || focusTag.includes('decision-making')) {
        return [
            {
                title: "Match the function",
                prompt: "Write one sentence with should for advice, one with could for an option and one with let's for a final decision.",
                tip: "Each form should have a different job in the conversation."
            },
            {
                title: "Negotiate a choice",
                prompt: "Imagine two people need to improve a routine. Write a four-line exchange with two suggestions and one decision.",
                tip: "Show movement from ideas to agreement."
            },
            {
                title: "React and improve",
                prompt: "Read one suggestion from the dialogue and answer it with a positive reaction plus a practical adjustment.",
                tip: "Useful discussion language often builds on the first idea instead of repeating it."
            },
            {
                title: "Vocabulary for collaboration",
                prompt: "Use three vocabulary items in a short message about solving a shared problem.",
                tip: "This should sound cooperative and action-focused."
            }
        ];
    }

    if (focusTag.includes('opinion') || focusTag.includes('disagreement')) {
        return [
            {
                title: "Opinion or reaction?",
                prompt: "Write one sentence to state your opinion and one different sentence to react politely to another view.",
                tip: "Do not use the same starter twice. Vary the interaction."
            },
            {
                title: "Disagree with care",
                prompt: "Respond to this idea: Online learning is always better than classroom learning.",
                tip: "Use one polite disagreement phrase and one reason."
            },
            {
                title: "Mini discussion",
                prompt: "Write a four-line discussion: opinion, different view, polite response, short conclusion.",
                tip: "A good B1 answer sounds balanced, not absolute."
            },
            {
                title: "Vocabulary in argument",
                prompt: "Use three discussion words from the vocabulary set in a short paragraph about a familiar topic.",
                tip: "Your paragraph should include an opinion and some support."
            }
        ];
    }

    if (focusTag.includes('reported speech')) {
        return [
            {
                title: "Change direct to reported",
                prompt: "Take one line from the dialogue and report it as if you were telling another person later.",
                tip: "Focus on the communication goal first. Then adjust pronouns and time references if needed."
            },
            {
                title: "What did they say?",
                prompt: "Write two short direct quotes and then convert both into reported speech.",
                tip: "Keep the meaning stable. The words can change, but the message should stay the same."
            },
            {
                title: "Conversation relay",
                prompt: "Imagine a friend missed the conversation. Tell them what each speaker said in two or three connected sentences.",
                tip: "This should sound like natural retelling, not isolated grammar."
            },
            {
                title: "Vocabulary in retelling",
                prompt: "Use two vocabulary items while reporting a message, update or instruction from someone else.",
                tip: "One of the words should help explain why the message mattered."
            }
        ];
    }

    if (focusTag.includes('relative clauses')) {
        return [
            {
                title: "Join the ideas",
                prompt: "Combine two short sentences into one clearer sentence using who, which or that.",
                tip: "The goal is better description, not longer writing for its own sake."
            },
            {
                title: "Describe more clearly",
                prompt: "Write one sentence about a person, one about a place and one about a thing using relative clauses.",
                tip: "Choose the pronoun based on what you are describing."
            },
            {
                title: "Fix the repetition",
                prompt: "Rewrite a sentence that sounds repetitive by combining the ideas into one smoother description.",
                tip: "Relative clauses help the answer sound more natural and less mechanical."
            },
            {
                title: "Vocabulary in description",
                prompt: "Use two vocabulary items to describe something or someone important in your life more precisely.",
                tip: "A strong answer should be clearer after the rewrite than before it."
            }
        ];
    }

    if (focusTag.includes('passive')) {
        return [
            {
                title: "Choose active or passive",
                prompt: "Decide when passive is more useful: when the action matters more, or when the person doing it matters more.",
                tip: "Passive is common when the result or process is the real focus."
            },
            {
                title: "Rewrite for focus",
                prompt: "Turn one active sentence into a passive sentence and explain what becomes more important.",
                tip: "Do not rewrite only by form. Notice the change in emphasis."
            },
            {
                title: "Everyday passive",
                prompt: "Write two passive sentences connected to work, media, services or everyday routines.",
                tip: "Choose contexts where people often do not mention the agent."
            },
            {
                title: "Vocabulary in process",
                prompt: "Use two vocabulary items while describing a product, message, rule or service in the passive.",
                tip: "The sentence should sound practical and real-world."
            }
        ];
    }

    if (focusTag.includes('second conditional') || focusTag.includes('wish')) {
        return [
            {
                title: "Real or imaginary?",
                prompt: "Write one sentence about a real possibility and one about an unreal possibility. Then mark which one needs the second conditional.",
                tip: "If the idea is imaginary now or unlikely now, second conditional is usually the better fit."
            },
            {
                title: "One change, one result",
                prompt: "Complete this idea: If I had more ___, I would ___. Then add one wish sentence about your current life.",
                tip: "The two sentences should connect, but they should not be identical."
            },
            {
                title: "Advice through hypotheticals",
                prompt: "Write one sentence with If I were you... and one sentence about your own wish or regret.",
                tip: "Keep the tone natural and personal, not dramatic."
            },
            {
                title: "Vocabulary in reflection",
                prompt: "Use three vocabulary items in a short reflective paragraph about opportunities, choices or regrets.",
                tip: "A good answer sounds thoughtful and specific."
            }
        ];
    }

    if (focusTag.includes('persuading') || focusTag.includes('presentation')) {
        return [
            {
                title: "Build the frame",
                prompt: "Plan a mini persuasive answer with four parts: main point, reason 1, reason 2, example.",
                tip: "If the structure is clear, the language can stay simple."
            },
            {
                title: "Improve the logic",
                prompt: "Take a simple opinion and add sequence words and one example so it sounds more convincing.",
                tip: "Use first, second, for example or that is why."
            },
            {
                title: "Speak to a listener",
                prompt: "Recommend one study habit, app or practical solution in four or five connected sentences.",
                tip: "Imagine someone really needs your suggestion. Make it usable."
            },
            {
                title: "Vocabulary for persuasion",
                prompt: "Use three vocabulary items from the lesson in a short recommendation or mini presentation.",
                tip: "Choose words that make your argument clearer, not just longer."
            }
        ];
    }

    return defaultPrompts;
}
