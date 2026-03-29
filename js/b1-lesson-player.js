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

function generatePracticePrompts(lesson) {
    return [
        {
            title: "Say it about yourself",
            prompt: lesson.warmup,
            tip: "Use at least two complete sentences and one connector like because, but, so or although."
        },
        {
            title: "Rebuild the dialogue",
            prompt: `Retell the dialogue from this lesson using your own words and keep the same communication goal: ${lesson.focus}.`,
            tip: "Change some details, but keep the target grammar or communication pattern."
        },
        {
            title: "Use the grammar focus",
            prompt: `Create two original examples that show this target clearly: ${lesson.grammar.title}.`,
            tip: "One sentence can be personal and the other can be about work, study or daily life."
        },
        {
            title: "Use the new vocabulary",
            prompt: `Choose three words from the vocabulary set and use them in a short spoken or written response about ${lesson.title.toLowerCase()}.`,
            tip: "Keep the response natural. A short paragraph is enough."
        }
    ];
}
