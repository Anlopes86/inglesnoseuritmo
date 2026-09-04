(function installConversationLessonsRuntime() {
    'use strict';

    const lessonNumber = Number(document.body.dataset.lesson);
    const lesson = window.CONVERSATION_LESSONS_01_48?.[lessonNumber]
        || window.CONVERSATION_LESSONS_49_64?.[lessonNumber];
    if (!lesson) {
        document.body.innerHTML = '<main class="p-10 text-white"><h1>Lesson unavailable</h1><p>This lesson could not be loaded.</p></main>';
        return;
    }

    const escapeHtml = (value) => String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    const catalogFor = (number) => number <= 48 ? window.ConversationMusicCatalog0148 : window.ConversationMusicCatalog;
    const catalogEntry = (songIndex) => catalogFor(lessonNumber)?.get(lessonNumber, songIndex) || null;
    const accent = lesson.accent || 'fuchsia';
    const accentText = `text-${accent}-400`;
    const accentBg = `bg-${accent}-600`;
    const accentHover = `hover:bg-${accent}-500`;
    const accentBorder = `border-${accent}-500`;
    const iconFor = (index) => ['fa-user', 'fa-clock-rotate-left', 'fa-lightbulb', 'fa-scale-balanced', 'fa-arrow-right'][index % 5];
    const debateLabels = ['Personal', 'Culture & Society / Reflection', 'Opinion', 'Hot Take / Debate'];
    const debateColors = [
        'bg-blue-500/20 text-blue-300',
        'bg-amber-500/20 text-amber-300',
        'bg-purple-500/20 text-purple-300',
        'bg-green-500/20 text-green-300'
    ];
    const debateIcons = ['fa-user', 'fa-earth-americas', 'fa-lightbulb', 'fa-scale-balanced'];
    const runtimeMusicStatuses = new Set(['provider-verified', 'draft-until-provider-match']);

    function musicAvailableInRuntime(entry) {
        return Boolean(entry && runtimeMusicStatuses.has(entry.status));
    }

    function displaySong(song, index) {
        const entry = catalogEntry(index);
        return {
            title: entry?.song?.displayTitle || song.title,
            artist: entry?.song?.displayArtist || song.artist,
            entry
        };
    }

    function expressionCards() {
        return lesson.expressions.map((item, index) => `
            <article class="flashcard" data-flashcard-card data-card-front="${escapeHtml(item.term)}" data-card-back="${escapeHtml(`${item.meaning} Example: ${item.example}`)}" role="button" tabindex="0" aria-expanded="false" aria-label="Expression ${index + 1}: ${escapeHtml(item.term)}. Activate to show meaning and example.">
                <div class="flashcard-inner">
                    <div class="flashcard-front" data-pronounce-text="${escapeHtml(item.term)}"><span class="text-2xl font-bold" data-flashcard-term>${escapeHtml(item.term)}</span><span class="conversation-flashcard-hint" aria-hidden="true">Show meaning</span></div>
                    <div class="flashcard-back"><span class="text-lg"><b data-flashcard-meaning>${escapeHtml(item.meaning)}</b><br><em data-flashcard-example>“${escapeHtml(item.example)}”</em></span><span class="conversation-flashcard-hint" aria-hidden="true">Show expression</span></div>
                </div>
            </article>`).join('');
    }

    function songSlide(song, index) {
        const colors = ['amber', 'blue', 'cyan'];
        const color = colors[index];
        const display = displaySong(song, index);
        const available = musicAvailableInRuntime(display.entry);
        const spotifyId = display.entry?.song?.spotifyId;
        const player = available && /^[A-Za-z0-9]{22}$/.test(spotifyId || '')
            ? `<iframe title="Play ${escapeHtml(display.title)} by ${escapeHtml(display.artist)} on Spotify" style="border-radius:12px" src="https://open.spotify.com/embed/track/${spotifyId}" width="100%" height="152" frameborder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
            : '';
        const activity = available
            ? `<div class="conversation-music-cloze" data-conversation-music-cloze data-lesson-number="${lessonNumber}" data-song-index="${index}" data-publication-status="${escapeHtml(display.entry.status)}" data-music-state="idle"><div class="conversation-cloze-skeleton" aria-hidden="true"></div><p class="conversation-cloze-status">The lyrics activity will load when this slide opens.</p></div>`
            : `<div class="conversation-listening-unavailable" role="status"><i class="fas fa-headphones" aria-hidden="true"></i><div><strong>Listening activity unavailable today</strong><p>Continue to the conversation prompts; your lesson progress is not affected.</p></div></div>`;
        return `
            <section class="slide" data-slide-kind="music" data-song-index="${index}">
                <h2 class="text-4xl font-bold mb-4 text-center ${accentText}"><i class="fas fa-music text-${color}-400" aria-hidden="true"></i> Song ${index + 1}: ${escapeHtml(display.title)} <span class="text-xl text-gray-400">— ${escapeHtml(display.artist)}</span></h2>
                <div class="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-4xl mx-auto">
                    ${player ? `<div class="mb-4 rounded-xl overflow-hidden">${player}</div>` : ''}
                    ${song.angle ? `<div class="mb-4 bg-${color}-900/30 p-4 rounded-lg border border-${color}-500/30"><p class="text-sm italic"><i class="fas fa-headphones mr-2 text-${color}-300" aria-hidden="true"></i>${escapeHtml(song.angle)}</p></div>` : ''}
                    ${activity}
                </div>
            </section>`;
    }

    function debateSlide(song, index) {
        const display = displaySong(song, index);
        return `
            <section class="slide" data-slide-kind="debate" data-song-index="${index}">
                <div class="text-center">
                    <h2 class="text-4xl font-bold mb-2 ${accentText}"><i class="fas fa-comments" aria-hidden="true"></i> Song ${index + 1} Conversation</h2>
                    <p class="text-lg text-gray-400 mb-6 italic">${escapeHtml(display.title)}${song.discussionTitle ? ` — ${escapeHtml(song.discussionTitle)}` : ''}</p>
                    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                        ${song.questions.map((question, questionIndex) => `<article class="debate-card text-left"><span class="debate-label ${debateColors[questionIndex]}">${debateLabels[questionIndex]}</span><p class="text-xl"><i class="fas ${debateIcons[questionIndex]} mr-2 ${accentText}" aria-hidden="true"></i>${escapeHtml(question)}</p></article>`).join('')}
                    </div>
                </div>
            </section>`;
    }

    function contextSlide(block, index) {
        return `
            <section class="slide" data-slide-kind="context" data-context-index="${index}">
                <div class="text-center">
                    <h2 class="text-4xl font-bold mb-5 ${accentText}"><i class="fas ${escapeHtml(block.icon || 'fa-compass')}" aria-hidden="true"></i> ${escapeHtml(block.title)}</h2>
                    <div class="bg-gray-800 p-7 rounded-2xl shadow-xl max-w-4xl mx-auto text-left">
                        <p class="text-xl mb-3 ${accentText} font-bold">${escapeHtml(block.kicker)}</p>
                        <p class="text-xl mb-5">${escapeHtml(block.intro)}</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${block.cards.map((card, cardIndex) => `<article class="p-4 bg-gray-700 rounded-lg border-l-4 ${cardIndex % 2 ? 'border-purple-500' : 'border-blue-500'}"><b>${escapeHtml(card.title)}:</b> ${escapeHtml(card.text)}</article>`).join('')}</div>
                        <p class="mt-6 text-2xl text-center font-semibold italic">${escapeHtml(block.prompt)}</p>
                    </div>
                </div>
            </section>`;
    }

    function practiceSlide() {
        return `
            <section class="slide" data-slide-kind="practice" data-practice-layout="legacy-vertical">
                <div class="text-center">
                    <h2 class="text-4xl font-bold mb-6 ${accentText}"><i class="fas fa-puzzle-piece" aria-hidden="true"></i> Practice the Six Expressions</h2>
                    <div class="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
                        <p class="text-xl mb-6 text-gray-300">Choose the same six expressions from slide 2 and complete every situation.</p>
                        <div id="word-bank" class="flex flex-wrap justify-center gap-3 mb-8 p-5 bg-gray-900 rounded-xl border-2 border-dashed border-gray-700" aria-label="Expression bank"></div>
                        <div id="matching-activity" class="space-y-6 text-left"></div>
                        <button type="button" id="check-answers-btn" class="mt-8 ${accentBg} ${accentHover} text-white font-bold py-3 px-10 rounded-lg transition shadow-lg">Check answers</button>
                        <p id="practice-feedback" class="mt-4 min-h-7 text-lg font-semibold" role="status" aria-live="polite"></p>
                    </div>
                </div>
            </section>`;
    }

    function speakingSlide() {
        return `
            <section class="slide" data-slide-kind="speaking">
                <div class="text-center">
                    <h2 class="text-4xl font-bold mb-5 ${accentText}"><i class="fas ${escapeHtml(lesson.speaking.icon)}" aria-hidden="true"></i> ${escapeHtml(lesson.speaking.title)}</h2>
                    <div class="bg-gray-800 p-7 rounded-2xl shadow-xl max-w-4xl mx-auto text-left">
                        <p class="text-xl mb-5"><b class="${accentText}">Choose one prompt.</b> Speak for 2–3 minutes, support your answer with an example, and respond to a counterpoint.</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${lesson.speaking.prompts.map((prompt, index) => `<article class="p-4 bg-gray-700 rounded-xl border-l-4 ${index % 2 ? 'border-amber-500' : accentBorder}"><p class="text-xl"><b>${index + 1}.</b> ${escapeHtml(prompt)}</p></article>`).join('')}</div>
                        <div class="mt-6 bg-gray-700 p-4 rounded-lg border border-gray-600"><p class="text-lg"><i class="fas fa-language ${accentText} mr-2" aria-hidden="true"></i><b>Conversation support:</b> ${lesson.speaking.support.map(escapeHtml).join(' • ')}</p></div>
                    </div>
                </div>
            </section>`;
    }

    function homeworkSlide() {
        if (Array.isArray(lesson.homework)) {
            return `
                <section class="slide" data-slide-kind="homework" data-homework-mode="options">
                    <div class="text-center">
                        <h2 class="text-4xl font-bold mb-5 ${accentText}"><i class="fas fa-pen-nib" aria-hidden="true"></i> Homework</h2>
                        <div class="bg-gray-800 p-7 rounded-2xl shadow-lg max-w-4xl mx-auto">
                            <p class="text-xl mb-5 text-gray-300">Choose one option and write 120–180 words.</p>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                                ${lesson.homework.map((item, index) => `<article class="bg-gray-700 p-4 rounded-xl border border-gray-600" data-homework-option="${index + 1}"><h3 class="${accentText} font-bold mb-2">Option ${index + 1}</h3><p>${escapeHtml(item)}</p></article>`).join('')}
                            </div>
                            <p class="mt-6 text-lg text-gray-300">Use at least three expressions from the lesson and include one concrete example.</p>
                        </div>
                    </div>
                </section>`;
        }
        const homework = lesson.homework;
        return `
            <section class="slide" data-slide-kind="homework" data-homework-mode="modeled">
                <div class="text-center">
                    <h2 class="text-4xl font-bold mb-5 ${accentText}"><i class="fas fa-pen-nib" aria-hidden="true"></i> Homework</h2>
                    <div class="bg-gray-800 p-7 rounded-2xl shadow-lg max-w-4xl mx-auto text-left">
                        <h3 class="text-2xl font-bold ${accentText} mb-3">Your task</h3><p class="text-xl mb-5">${escapeHtml(homework.task)}</p>
                        <h3 class="text-2xl font-bold ${accentText} mb-3">Short model</h3><blockquote class="bg-gray-700 border-l-4 ${accentBorder} p-4 rounded-r-lg text-lg">${escapeHtml(homework.model)}</blockquote>
                        <p class="mt-5 text-lg text-gray-300"><b>Language target:</b> ${homework.requiredExpressions.map(escapeHtml).join(' • ')}</p>
                    </div>
                </div>
            </section>`;
    }

    document.title = `Conversation Class — Lesson ${lessonNumber}: ${lesson.title}`;
    document.getElementById('lesson-heading').textContent = `Lesson ${lessonNumber}: ${lesson.title}`;
    document.getElementById('lesson-main').innerHTML = `
        <section class="slide active" data-slide-kind="warmup"><div class="text-center"><h2 class="text-4xl font-bold mb-5 ${accentText}"><i class="fas ${escapeHtml(lesson.icon)}" aria-hidden="true"></i> ${escapeHtml(lesson.warmupTitle)}</h2><div class="bg-gray-800 p-7 rounded-2xl shadow-xl max-w-3xl mx-auto space-y-5 text-2xl"><p class="font-semibold text-gray-300">${escapeHtml(lesson.warmupIntro)}</p>${lesson.warmups.map((question, index) => `<p><i class="fas ${iconFor(index)} mr-2 ${accentText}" aria-hidden="true"></i>${escapeHtml(question)}</p>`).join('')}</div></div></section>
        <section class="slide" data-slide-kind="expressions"><div class="text-center"><h2 class="text-4xl font-bold mb-5 ${accentText}"><i class="fas fa-book-open" aria-hidden="true"></i> Six Useful Expressions</h2><div class="flashcard-grid max-w-6xl mx-auto">${expressionCards()}</div></div></section>
        ${songSlide(lesson.songs[0], 0)}
        ${debateSlide(lesson.songs[0], 0)}
        ${contextSlide(lesson.contexts[0], 0)}
        ${songSlide(lesson.songs[1], 1)}
        ${debateSlide(lesson.songs[1], 1)}
        ${contextSlide(lesson.contexts[1], 1)}
        ${songSlide(lesson.songs[2], 2)}
        ${debateSlide(lesson.songs[2], 2)}
        ${practiceSlide()}
        ${speakingSlide()}
        ${homeworkSlide()}
        <section class="slide" data-slide-kind="closing"><div class="text-center flex flex-col items-center justify-center h-full"><i class="fas ${escapeHtml(lesson.icon)} ${accentText} text-7xl mb-6" aria-hidden="true"></i><h2 class="text-5xl font-bold mb-4 text-gray-100">Well Done!</h2><p class="text-3xl italic text-gray-400 max-w-3xl mx-auto border-t border-gray-700 pt-8 mt-4">“${escapeHtml(lesson.closing)}”</p><div class="pt-8"><button type="button" id="finish-lesson-btn-main" class="${accentBg} ${accentHover} text-white text-2xl font-bold py-4 px-12 rounded-full transition shadow-lg">Finish lesson <i class="fas fa-check-circle ml-2" aria-hidden="true"></i></button></div></div></section>`;

    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const counter = document.getElementById('slide-counter');
    const progressBar = document.getElementById('progress-bar');
    let currentSlide = 0;

    function showSlide(index, { focus = false } = {}) {
        currentSlide = Math.max(0, Math.min(index, slides.length - 1));
        slides.forEach((slide, slideIndex) => {
            const active = slideIndex === currentSlide;
            slide.classList.toggle('active', active);
            slide.toggleAttribute('aria-hidden', !active);
        });
        prevBtn.disabled = currentSlide === 0;
        nextBtn.hidden = currentSlide === slides.length - 1;
        counter.textContent = `${currentSlide + 1} / ${slides.length}`;
        progressBar.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
        progressBar.setAttribute('aria-valuenow', String(currentSlide + 1));
        document.getElementById('lesson-main').scrollTo({ top: 0, behavior: 'smooth' });
        const activeSlide = slides[currentSlide];
        const musicRoot = activeSlide?.querySelector('[data-conversation-music-cloze]');
        if (musicRoot) window.ConversationMusicCloze?.mount(musicRoot);
        if (focus) activeSlide?.querySelector('h2')?.focus?.({ preventScroll: true });
    }

    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    document.addEventListener('keydown', (event) => {
        if (event.target.matches('input, textarea, select, button')) return;
        if (event.key === 'ArrowLeft') showSlide(currentSlide - 1);
        if (event.key === 'ArrowRight') showSlide(currentSlide + 1);
    });

    document.querySelectorAll('.flashcard').forEach((card) => {
        const toggleCard = () => {
            const expanded = card.getAttribute('aria-expanded') === 'true';
            card.setAttribute('aria-expanded', String(!expanded));
            card.classList.toggle('flipped', !expanded);
        };
        card.addEventListener('click', (event) => {
            if (event.target.closest('button')) return;
            toggleCard();
        });
        card.addEventListener('keydown', (event) => {
            if (event.target !== card || !['Enter', ' '].includes(event.key)) return;
            event.preventDefault();
            toggleCard();
        });
    });

    const vocabulary = lesson.expressions.map((item, index) => ({ id: `w${index}`, text: item.term }));
    const wordBank = document.getElementById('word-bank');
    const activity = document.getElementById('matching-activity');
    const feedback = document.getElementById('practice-feedback');
    [...vocabulary].sort((left, right) => left.text.localeCompare(right.text)).forEach((word) => {
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = 'word-pill';
        pill.draggable = true;
        pill.textContent = word.text;
        pill.addEventListener('dragstart', (event) => event.dataTransfer.setData('text/plain', word.text));
        pill.addEventListener('click', () => {
            document.querySelectorAll('.word-pill').forEach((item) => item.setAttribute('aria-pressed', 'false'));
            pill.setAttribute('aria-pressed', 'true');
            wordBank.dataset.selected = word.text;
        });
        pill.setAttribute('aria-pressed', 'false');
        wordBank.appendChild(pill);
    });
    activity.innerHTML = lesson.practice.map((item, index) => `<p class="text-xl text-gray-200">${escapeHtml(item.text).replace('{gap}', `<button type="button" class="drop-zone" data-answer="${escapeHtml(item.answer)}" aria-label="Expression answer ${index + 1}">________</button>`)}</p>`).join('');
    const zones = Array.from(document.querySelectorAll('.drop-zone'));
    zones.forEach((zone) => {
        const place = (value) => {
            if (!value) return;
            zone.textContent = value;
            zone.classList.add('filled');
        };
        zone.addEventListener('dragover', (event) => event.preventDefault());
        zone.addEventListener('drop', (event) => { event.preventDefault(); place(event.dataTransfer.getData('text/plain')); });
        zone.addEventListener('click', () => place(wordBank.dataset.selected));
    });
    document.getElementById('check-answers-btn').addEventListener('click', () => {
        let correct = 0;
        let answered = 0;
        zones.forEach((zone) => {
            const value = zone.textContent.trim();
            if (value !== '________') answered += 1;
            const isCorrect = value.toLowerCase() === zone.dataset.answer.toLowerCase();
            zone.classList.toggle('practice-correct', isCorrect);
            zone.classList.toggle('practice-incorrect', value !== '________' && !isCorrect);
            if (isCorrect) correct += 1;
        });
        feedback.textContent = answered < zones.length ? 'Complete every sentence first.' : correct === zones.length ? 'Perfect — all six expressions match.' : `${correct} of ${zones.length} correct. Review the highlighted answers.`;
    });

    document.getElementById('finish-lesson-btn-main').addEventListener('click', () => {
        if (typeof window.markLessonAsComplete === 'function') window.markLessonAsComplete('conversation', lessonNumber);
        else {
            localStorage.setItem(`lesson_conversation_${lessonNumber}_completed`, 'true');
            window.location.href = 'conversation.html';
        }
    });

    showSlide(0);
}());
