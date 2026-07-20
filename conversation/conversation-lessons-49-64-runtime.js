(function () {
    'use strict';

    const lessons = window.CONVERSATION_LESSONS_49_64 || {};
    const lessonNumber = Number(document.body.dataset.lesson);
    const lesson = lessons[lessonNumber];
    if (!lesson) {
        document.body.innerHTML = '<main class="p-10 text-white">Lesson data not found.</main>';
        return;
    }

    const accent = lesson.accent || 'fuchsia';
    const accentText = `text-${accent}-400`;
    const accentBg = `bg-${accent}-600`;
    const accentHover = `hover:bg-${accent}-500`;
    const accentBorder = `border-${accent}-500`;
    const spotifySrc = (song) => song.spotifyId
        ? `https://open.spotify.com/embed/track/${song.spotifyId}`
        : `https://open.spotify.com/embed/search/${encodeURIComponent(`${song.title} ${song.artist}`)}`;

    const iconFor = (index) => ['fa-user', 'fa-face-laugh', 'fa-lightbulb', 'fa-scale-balanced'][index % 4];
    const labelFor = (index) => ['Personal', 'Light & Fun', 'Ideas', 'Discuss'][index % 4];
    const labelColor = (index) => [
        'bg-blue-500/20 text-blue-300',
        'bg-amber-500/20 text-amber-300',
        'bg-purple-500/20 text-purple-300',
        'bg-green-500/20 text-green-300'
    ][index % 4];

    function expressionCards() {
        return lesson.expressions.map((item) => `
            <div class="flashcard">
                <div class="flashcard-inner">
                    <div class="flashcard-front"><h4 class="text-2xl font-bold">${item.term}</h4></div>
                    <div class="flashcard-back">
                        <p class="text-lg"><b>${item.meaning}</b><br><em>“${item.example}”</em></p>
                    </div>
                </div>
            </div>`).join('');
    }

    function listeningLines(song, color) {
        return song.listening.map((item) => {
            const field = `<input type="text" class="w-32 border-b-2 text-center bg-transparent border-gray-500 focus:border-${color}-400 outline-none" placeholder="..."> <button class="answer-btn" data-answer="${item.answer}"><i class="fas fa-eye"></i></button>`;
            return `<p>${item.text.replace('{gap}', field)}</p>`;
        }).join('');
    }

    function songSlide(song, index) {
        const colors = ['amber', 'blue', 'cyan'];
        const color = colors[index];
        return `
            <div class="slide">
                <h2 class="text-4xl font-bold mb-4 text-center ${accentText}">
                    <i class="fas fa-music text-${color}-400"></i>
                    Song ${index + 1}: ${song.title}
                    <span class="text-xl text-gray-400">- ${song.artist}</span>
                </h2>
                <div class="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-4xl mx-auto">
                    <div class="mb-4 rounded-xl overflow-hidden">
                        <iframe style="border-radius:12px" src="${spotifySrc(song)}" width="100%" height="152" frameborder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    </div>
                    <div class="mb-4 bg-${color}-900/30 p-4 rounded-lg border border-${color}-500/30">
                        <p class="text-sm italic"><i class="fas fa-headphones mr-2 text-${color}-300"></i>${song.angle}</p>
                    </div>
                    <div class="listening-box text-left text-lg space-y-4 bg-gray-700 p-6 rounded-xl border-l-4 border-${color}-500">
                        <p class="text-gray-400 text-sm uppercase tracking-wider">Listening lens: complete the ideas</p>
                        ${listeningLines(song, color)}
                    </div>
                </div>
            </div>`;
    }

    function debateSlide(song, index) {
        return `
            <div class="slide">
                <div class="text-center">
                    <h2 class="text-4xl font-bold mb-2 ${accentText}"><i class="fas fa-comments"></i> Song ${index + 1} Conversation</h2>
                    <p class="text-lg text-gray-400 mb-6 italic">${song.title} — ${song.discussionTitle}</p>
                    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                        ${song.questions.map((question, qIndex) => `
                            <div class="debate-card text-left">
                                <span class="debate-label ${labelColor(qIndex)}">${labelFor(qIndex)}</span>
                                <p class="text-xl"><i class="fas ${iconFor(qIndex)} mr-2 ${accentText}"></i>${question}</p>
                            </div>`).join('')}
                    </div>
                </div>
            </div>`;
    }

    function contextSlide(block, fallbackIcon) {
        return `
            <div class="slide">
                <div class="text-center">
                    <h2 class="text-4xl font-bold mb-6 ${accentText}"><i class="fas ${block.icon || fallbackIcon}"></i> ${block.title}</h2>
                    <div class="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-4xl mx-auto text-left">
                        <p class="text-xl mb-4 ${accentText} font-bold">${block.kicker}</p>
                        <p class="text-2xl mb-6">${block.intro}</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${block.cards.map((card, index) => `<div class="p-4 bg-gray-700 rounded-lg border-l-4 ${index % 2 ? 'border-purple-500' : 'border-blue-500'}"><b>${card.title}:</b> ${card.text}</div>`).join('')}
                        </div>
                        <p class="mt-8 text-2xl text-center font-semibold italic">${block.prompt}</p>
                    </div>
                </div>
            </div>`;
    }

    function practiceSlide() {
        return `
            <div class="slide">
                <div class="text-center">
                    <h2 class="text-4xl font-bold mb-6 ${accentText}"><i class="fas fa-puzzle-piece"></i> Practice: Match the Expressions</h2>
                    <div class="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
                        <p class="text-xl mb-6 text-gray-300">Choose an expression and place it in the matching situation.</p>
                        <div id="word-bank" class="flex flex-wrap justify-center gap-3 mb-8 p-5 bg-gray-900 rounded-xl border-2 border-dashed border-gray-700"></div>
                        <div id="matching-activity" class="space-y-6 text-left"></div>
                        <button id="check-answers-btn" class="mt-8 ${accentBg} ${accentHover} text-white font-bold py-3 px-10 rounded-lg transition shadow-lg">Check Answers</button>
                        <p id="practice-feedback" class="mt-4 min-h-7 text-lg font-semibold" aria-live="polite"></p>
                    </div>
                </div>
            </div>`;
    }

    function speakingSlide() {
        return `
            <div class="slide">
                <div class="text-center">
                    <h2 class="text-4xl font-bold mb-6 ${accentText}"><i class="fas ${lesson.speaking.icon}"></i> ${lesson.speaking.title}</h2>
                    <div class="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-4xl mx-auto text-left">
                        <p class="text-xl mb-6"><b class="${accentText}">Choose one prompt.</b> Speak for 2–3 minutes, then answer one follow-up question.</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${lesson.speaking.prompts.map((prompt, index) => `<div class="p-4 bg-gray-700 rounded-xl border-l-4 ${index % 2 ? 'border-amber-500' : accentBorder}"><p class="text-xl"><b>${index + 1}.</b> ${prompt}</p></div>`).join('')}
                        </div>
                        <div class="mt-7 bg-gray-700 p-5 rounded-lg border border-gray-600"><p class="text-lg"><i class="fas fa-language ${accentText} mr-2"></i><b>Conversation support:</b> ${lesson.speaking.support.join(' • ')}</p></div>
                    </div>
                </div>
            </div>`;
    }

    function homeworkSlide() {
        return `
            <div class="slide">
                <div class="text-center">
                    <h2 class="text-4xl font-bold mb-6 ${accentText}"><i class="fas fa-pen-nib"></i> Homework</h2>
                    <div class="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
                        <p class="text-2xl mb-6 text-gray-300">Choose one option and write 120–180 words.</p>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                            ${lesson.homework.map((item, index) => `<div class="bg-gray-700 p-4 rounded-xl border border-gray-600"><h4 class="${accentText} font-bold mb-2">Option ${index + 1}</h4><p>${item}</p></div>`).join('')}
                        </div>
                        <p class="mt-6 text-lg text-gray-300">Use at least three expressions from the lesson and include one concrete example.</p>
                    </div>
                </div>
            </div>`;
    }

    document.title = `Conversation Class - Lesson ${lessonNumber}: ${lesson.title}`;
    document.getElementById('lesson-heading').textContent = `Lesson ${lessonNumber}: ${lesson.title}`;
    document.getElementById('lesson-main').innerHTML = `
        <div class="slide active">
            <div class="text-center">
                <h2 class="text-4xl font-bold mb-6 ${accentText}"><i class="fas ${lesson.icon}"></i> ${lesson.warmupTitle}</h2>
                <div class="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-3xl mx-auto space-y-6 text-2xl">
                    <p class="font-semibold text-gray-300">${lesson.warmupIntro}</p>
                    ${lesson.warmups.map((question, index) => `<p><i class="fas ${iconFor(index)} mr-2 ${accentText}"></i>${question}</p>`).join('')}
                </div>
            </div>
        </div>
        <div class="slide">
            <div class="text-center">
                <h2 class="text-4xl font-bold mb-6 ${accentText}"><i class="fas fa-book-open"></i> Key Expressions</h2>
                <div class="flashcard-grid max-w-6xl mx-auto">${expressionCards()}</div>
            </div>
        </div>
        ${songSlide(lesson.songs[0], 0)}
        ${debateSlide(lesson.songs[0], 0)}
        ${contextSlide(lesson.contexts[0], 'fa-compass')}
        ${songSlide(lesson.songs[1], 1)}
        ${debateSlide(lesson.songs[1], 1)}
        ${contextSlide(lesson.contexts[1], 'fa-shuffle')}
        ${songSlide(lesson.songs[2], 2)}
        ${debateSlide(lesson.songs[2], 2)}
        ${practiceSlide()}
        ${speakingSlide()}
        ${homeworkSlide()}
        <div class="slide">
            <div class="text-center flex flex-col items-center justify-center h-full">
                <i class="fas ${lesson.icon} ${accentText} text-7xl mb-6"></i>
                <h2 class="text-5xl font-bold mb-4 text-gray-100">Well Done!</h2>
                <p class="text-3xl italic text-gray-400 max-w-3xl mx-auto border-t border-gray-700 pt-8 mt-4">“${lesson.closing}”</p>
                <div class="pt-8"><button id="finish-lesson-btn-main" class="${accentBg} ${accentHover} text-white text-2xl font-bold py-4 px-12 rounded-full transition shadow-lg">Finalizar e Sair <i class="fas fa-check-circle ml-2"></i></button></div>
            </div>
        </div>`;

    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const counter = document.getElementById('slide-counter');
    const progressBar = document.getElementById('progress-bar');
    let currentSlide = 0;

    function showSlide(index) {
        currentSlide = Math.max(0, Math.min(index, slides.length - 1));
        slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === currentSlide));
        prevBtn.disabled = currentSlide === 0;
        nextBtn.style.display = currentSlide === slides.length - 1 ? 'none' : 'inline-flex';
        counter.textContent = `${currentSlide + 1} / ${slides.length}`;
        progressBar.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
        document.getElementById('lesson-main').scrollTo({ top: 0, behavior: 'smooth' });
    }

    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

    document.querySelectorAll('.flashcard').forEach((card) => card.addEventListener('click', () => card.classList.toggle('flipped')));
    document.querySelectorAll('.answer-btn').forEach((button) => button.addEventListener('click', (event) => {
        event.stopPropagation();
        const input = button.previousElementSibling;
        if (input) {
            input.value = button.dataset.answer;
            input.classList.add('text-green-300', 'font-bold');
        }
    }));

    const vocabulary = lesson.expressions.map((item, index) => ({ id: `w${index}`, text: item.term }));
    const wordBank = document.getElementById('word-bank');
    const activity = document.getElementById('matching-activity');
    const feedback = document.getElementById('practice-feedback');
    vocabulary.slice().sort(() => Math.random() - 0.5).forEach((word) => {
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = 'word-pill';
        pill.draggable = true;
        pill.textContent = word.text;
        pill.addEventListener('dragstart', (event) => event.dataTransfer.setData('text/plain', word.text));
        pill.addEventListener('click', () => {
            document.querySelectorAll('.word-pill').forEach((item) => item.classList.remove('ring-4', 'ring-white'));
            pill.classList.add('ring-4', 'ring-white');
            wordBank.dataset.selected = word.text;
        });
        wordBank.appendChild(pill);
    });
    activity.innerHTML = lesson.practice.map((item) => `<p class="text-xl text-gray-200">${item.text.replace('{gap}', `<span class="drop-zone" role="button" tabindex="0" data-answer="${item.answer}">________</span>`)}</p>`).join('');
    const zones = Array.from(document.querySelectorAll('.drop-zone'));
    zones.forEach((zone) => {
        const place = (value) => { if (value) { zone.textContent = value; zone.classList.add('filled'); } };
        zone.addEventListener('dragover', (event) => event.preventDefault());
        zone.addEventListener('drop', (event) => { event.preventDefault(); place(event.dataTransfer.getData('text/plain')); });
        zone.addEventListener('click', () => place(wordBank.dataset.selected));
        zone.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); place(wordBank.dataset.selected); } });
    });
    document.getElementById('check-answers-btn').addEventListener('click', () => {
        let correct = 0;
        let answered = 0;
        zones.forEach((zone) => {
            const value = zone.textContent.trim();
            if (value !== '________') answered += 1;
            const isCorrect = value.toLowerCase() === zone.dataset.answer.toLowerCase();
            zone.style.color = isCorrect ? '#34d399' : value === '________' ? '#fcd34d' : '#f87171';
            if (isCorrect) correct += 1;
        });
        feedback.textContent = answered < zones.length ? 'Complete every sentence first.' : correct === zones.length ? 'Perfect — all expressions match.' : `${correct} of ${zones.length} correct. Adjust the red answers.`;
        feedback.className = `mt-4 min-h-7 text-lg font-semibold ${correct === zones.length ? 'text-green-400' : 'text-amber-300'}`;
    });

    document.getElementById('finish-lesson-btn-main').addEventListener('click', () => {
        if (typeof markLessonAsComplete === 'function') {
            markLessonAsComplete('conversation', lessonNumber);
        } else {
            localStorage.setItem(`lesson_conversation_${lessonNumber}_completed`, 'true');
            window.location.href = 'conversation.html';
        }
    });

    showSlide(0);
}());
