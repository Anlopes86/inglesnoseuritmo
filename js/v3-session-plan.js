(() => {
    const TOTAL_MINUTES = 60;
    const reviewNumbers = Object.fromEntries(
        ['a1-v3', 'a2-v3', 'b1-v3'].map(module => [
            module,
            new Set((window.V3Curriculum?.getModule(module) || [])
                .filter(lesson => lesson.type !== 'content')
                .map(lesson => lesson.number))
        ])
    );

    function currentMissionSource(module, number) {
        if (module === 'a1-v3') return window.A1V3LessonRegistry?.get(number) || {};
        if (module === 'a2-v3') {
            return window.A2V3ConversationCurriculum?.lessons?.[number]
                || window.A2V3PremiumCurriculum?.lessons?.[number]
                || {};
        }
        return {};
    }

    function resolveMission(module, number) {
        return window.V3Curriculum?.resolveMission(module, number, currentMissionSource(module, number)) || null;
    }

    function moduleId() {
        const bodyModule = document.body?.dataset.module;
        if (bodyModule && reviewNumbers[bodyModule]) return bodyModule;
        const path = location.pathname.toLowerCase();
        return Object.keys(reviewNumbers).find(id => path.includes(`/${id}/`)) || '';
    }

    function lessonNumber() {
        const bodyValue = Number(document.body?.dataset.lessonNumber);
        if (bodyValue) return bodyValue;
        const match = location.pathname.match(/licao-(\d+)\.html$/i);
        return match ? Number(match[1]) : 0;
    }

    function slideWeight(slide) {
        const label = `${slide.dataset.title || ''} ${slide.dataset.slideType || ''} ${slide.querySelector('h2')?.textContent || ''}`.toLowerCase();
        if (/practice|station|drill|clinic/.test(label)) return 13;
        if (/speaking|dialog|role|oral test/.test(label)) return 10;
        if (/translation/.test(label)) return 9;
        if (/listening/.test(label)) return 8;
        if (/grammar/.test(label)) return 8;
        if (/reading|case file/.test(label)) return 6;
        if (/vocab|flashcard|language bank|express/.test(label)) return 5;
        if (/opening|intro|objetivo|review mission/.test(label)) return 4;
        if (/assessment|can-do/.test(label)) return 5;
        if (/music/.test(label)) return 3;
        if (/homework|portfolio/.test(label)) return 2;
        return 5;
    }

    function allocateMinutes(slides) {
        const minimum = 2;
        const remaining = TOTAL_MINUTES - (slides.length * minimum);
        const weights = slides.map(slideWeight);
        const totalWeight = weights.reduce((sum, value) => sum + value, 0);
        const raw = weights.map(weight => (remaining * weight) / totalWeight);
        const minutes = raw.map(value => minimum + Math.floor(value));
        let missing = TOTAL_MINUTES - minutes.reduce((sum, value) => sum + value, 0);
        raw.map((value, index) => ({ index, fraction: value - Math.floor(value) }))
            .sort((a, b) => b.fraction - a.fraction)
            .forEach(item => {
                if (missing > 0) {
                    minutes[item.index] += 1;
                    missing -= 1;
                }
            });
        return minutes;
    }

    function injectMission(module, number) {
        const mission = resolveMission(module, number);
        if (!mission || document.querySelector('.v3-speaking-structure')) return;
        const target = module === 'a1-v3'
            ? [...document.querySelectorAll('.slide')].find(slide => /mini diálogos/i.test(slide.dataset.title || ''))
            : [...document.querySelectorAll('.slide')].find(slide => /mini dialogues/i.test(slide.dataset.title || ''));
        const heading = target?.querySelector('.slide-heading, h2')?.parentElement || target?.querySelector('section');
        if (!heading) return;
        const panel = document.createElement('div');
        const isA1 = module === 'a1-v3';
        const focus = isA1
            ? (Array.isArray(mission.focus) && mission.focus.length ? mission.focus : ['Cumpriu a tarefa', 'Usou o bloco-alvo', 'Fala compreensível'])
            : ['Desenvolveu a resposta', 'Fez follow-up', 'Usou a forma-alvo', 'Fala compreensível'];
        panel.className = 'v3-live-mission v3-speaking-structure';
        panel.innerHTML = `
            <strong>${mission.title}</strong>
            <span>${mission.task}</span>
            <div class="v3-speaking-rounds" aria-label="Três rodadas de produção oral">
                <div><b>1</b><p><em>Primeira tentativa</em>Use o modelo e o apoio visual da tela.</p></div>
                <div><b>2</b><p><em>Nova condição</em>O professor muda um detalhe ou faz uma pergunta adicional.</p></div>
                <div><b>3</b><p><em>Segunda tentativa</em>Repita a missão incorporando uma correção prioritária.</p></div>
            </div>
            <div class="v3-teacher-focus"><small>Foco do professor</small>${focus.map(item => `<span>${item}</span>`).join('')}</div>
            <label class="v3-attempt-notes">Notas da tentativa ao vivo<textarea rows="2" placeholder="Registre evidência, correção prioritária e próximo passo."></textarea></label>`;
        heading.appendChild(panel);
    }

    function speakEnglish(text) {
        if (!text || !('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') return;
        const utterance = new SpeechSynthesisUtterance(String(text));
        utterance.lang = 'en-US';
        utterance.rate = 0.88;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    }

    function wireSpeech() {
        if (document.body.dataset.v3SpeechWired) return;
        document.body.dataset.v3SpeechWired = 'true';
        document.addEventListener('click', event => {
            const memoryCard = event.target.closest('[data-v3-memory-card]');
            if (memoryCard) {
                const board = memoryCard.closest('[data-v3-memory-board]');
                if (!board || memoryCard.classList.contains('is-matched')) return;
                if (board.dataset.pendingReset === 'true') {
                    if (memoryCard.classList.contains('is-pending')) return;
                    board.querySelectorAll('[data-v3-memory-card].is-pending').forEach(card => {
                        card.classList.remove('is-flipped', 'is-selected', 'is-pending');
                    });
                    board.dataset.pendingReset = 'false';
                }
                const selected = board.querySelector('[data-v3-memory-card].is-selected');
                if (selected === memoryCard) return;
                memoryCard.classList.add('is-flipped');
                if (!selected) {
                    memoryCard.classList.add('is-selected');
                    return;
                }
                const feedback = board.querySelector('[data-v3-game-feedback]');
                if (selected.dataset.pairId === memoryCard.dataset.pairId) {
                    selected.classList.remove('is-selected');
                    selected.classList.add('is-matched');
                    memoryCard.classList.add('is-matched');
                    const matchedPairs = board.querySelectorAll('[data-v3-memory-card].is-matched').length / 2;
                    const totalPairs = board.querySelectorAll('[data-v3-memory-card]').length / 2;
                    if (feedback) feedback.textContent = matchedPairs === totalPairs ? 'Todos os pares encontrados.' : `${matchedPairs}/${totalPairs} pares`;
                    return;
                }
                selected.classList.add('is-pending');
                memoryCard.classList.add('is-pending');
                board.dataset.pendingReset = 'true';
                if (feedback) feedback.textContent = 'Tente outra combinação.';
                return;
            }

            const matchOption = event.target.closest('[data-v3-match-option]');
            if (matchOption) {
                const board = matchOption.closest('[data-v3-match-board]');
                if (!board || matchOption.classList.contains('is-matched')) return;
                const side = matchOption.dataset.side;
                board.querySelectorAll(`[data-v3-match-option][data-side="${side}"]`).forEach(option => option.classList.remove('is-selected'));
                matchOption.classList.add('is-selected');
                const opposite = board.querySelector(`[data-v3-match-option][data-side="${side === 'left' ? 'right' : 'left'}"].is-selected`);
                if (!opposite) return;
                const feedback = board.querySelector('[data-v3-game-feedback]');
                if (opposite.dataset.pairId === matchOption.dataset.pairId) {
                    opposite.classList.remove('is-selected');
                    matchOption.classList.remove('is-selected');
                    opposite.classList.add('is-matched');
                    matchOption.classList.add('is-matched');
                    opposite.disabled = true;
                    matchOption.disabled = true;
                    if (feedback) feedback.textContent = 'Ligação correta. Leia a combinação completa em voz alta.';
                } else {
                    opposite.classList.add('is-wrong');
                    matchOption.classList.add('is-wrong');
                    if (feedback) feedback.textContent = 'Essa ligação não funciona. Tente outro par.';
                    window.setTimeout(() => {
                        opposite.classList.remove('is-selected', 'is-wrong');
                        matchOption.classList.remove('is-selected', 'is-wrong');
                    }, 800);
                }
                return;
            }

            const hangmanAction = event.target.closest('[data-v3-hangman-action]');
            if (hangmanAction) {
                const round = hangmanAction.closest('[data-v3-hangman]');
                const output = round?.querySelector('[data-v3-hangman-mask]');
                if (!round || !output) return;
                const answer = round.dataset.answer || '';
                if (hangmanAction.dataset.v3HangmanAction === 'answer') {
                    round.dataset.revealed = answer.split('').map((_, index) => index).join(',');
                    output.textContent = answer;
                    return;
                }
                const revealed = new Set((round.dataset.revealed || '').split(',').filter(Boolean).map(Number));
                const nextIndex = [...answer].findIndex((character, index) => /[a-z]/i.test(character) && !revealed.has(index));
                if (nextIndex >= 0) revealed.add(nextIndex);
                round.dataset.revealed = [...revealed].join(',');
                output.textContent = [...answer].map((character, index) => /[a-z]/i.test(character) && !revealed.has(index) ? '_' : character).join(' ');
                return;
            }

            const wordChip = event.target.closest('[data-v3-word-chip]');
            if (wordChip) {
                const round = wordChip.closest('[data-v3-builder]');
                const output = round?.querySelector('[data-v3-builder-output]');
                if (!round || !output || wordChip.disabled) return;
                const words = (round.dataset.words || '').split('\u001f').filter(Boolean);
                words.push(wordChip.dataset.word || '');
                round.dataset.words = words.join('\u001f');
                output.textContent = words.join(' ');
                wordChip.disabled = true;
                return;
            }

            const builderReset = event.target.closest('[data-v3-builder-reset]');
            if (builderReset) {
                const round = builderReset.closest('[data-v3-builder]');
                if (!round) return;
                round.dataset.words = '';
                const output = round.querySelector('[data-v3-builder-output]');
                if (output) output.textContent = 'Monte a frase aqui.';
                round.querySelectorAll('[data-v3-word-chip]').forEach(button => { button.disabled = false; });
                return;
            }

            const button = event.target.closest('[data-v3-speak]');
            if (!button) return;
            event.preventDefault();
            event.stopPropagation();
            speakEnglish(button.dataset.v3Speak || '');
        });
        document.addEventListener('keydown', event => {
            if (!['Enter', ' '].includes(event.key)) return;
            const card = event.target.closest('[data-flashcard], .b1-vocab-card');
            if (!card || event.target !== card) return;
            event.preventDefault();
            card.click();
        });
    }

    function ensureHelperScript(filename) {
        const existing = [...document.scripts].some(script => (script.getAttribute('src') || '').endsWith(`/js/${filename}`));
        if (existing) return;
        const script = document.createElement('script');
        script.src = `../js/${filename}`;
        script.defer = true;
        document.body.appendChild(script);
    }

    function annotate() {
        const module = moduleId();
        const number = lessonNumber();
        if (!module || !number) return false;
        const slides = [...document.querySelectorAll('.slide')];
        if (!slides.length || slides.every(slide => slide.dataset.v3Minutes)) return false;
        const minutes = allocateMinutes(slides);
        slides.forEach((slide, index) => {
            slide.dataset.v3Minutes = String(minutes[index]);
            const heading = slide.querySelector('h2');
            if (heading && !heading.querySelector('.v3-time-chip')) {
                heading.insertAdjacentHTML('beforeend', `<span class="v3-time-chip"><i class="fas fa-clock" aria-hidden="true"></i> ${minutes[index]} min</span>`);
            }
        });
        const header = document.querySelector('header .header-actions, header .container, header .header-inner');
        if (header && !header.querySelector('.v3-session-badge')) {
            const badge = document.createElement('span');
            badge.className = 'v3-session-badge';
            badge.innerHTML = `<i class="fas fa-stopwatch" aria-hidden="true"></i> 60 min`;
            header.appendChild(badge);
        }
        if (!reviewNumbers[module].has(number)) injectMission(module, number);
        wireSpeech();
        ensureHelperScript('v3-pt-translations.js');
        ensureHelperScript('flashcard-pronunciation.js');
        ensureHelperScript('lesson-flashcard-save.js');
        document.body.dataset.v3Review = reviewNumbers[module].has(number) ? 'true' : 'false';
        document.body.classList.add('v3-session-ready');
        return true;
    }

    function init() {
        if (annotate()) return;
        const observer = new MutationObserver(() => {
            if (annotate()) observer.disconnect();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    window.V3SessionPlan = { TOTAL_MINUTES, reviewNumbers, resolveMission, allocateMinutes, speakEnglish };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
})();
