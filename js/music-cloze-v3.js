(function installMusicClozeV3(globalScope) {
    'use strict';

    if (globalScope.MusicClozeV3) return;

    const STATES = Object.freeze([
        'loading', 'ready', 'checking', 'submitted', 'partial', 'complete', 'correct',
        'lyricsUnavailable', 'audioUnavailable', 'draft', 'rightsBlocked', 'syncMismatch'
    ]);

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    class ProviderLyricsAdapter {
        constructor({ service = globalScope.LyricsServiceV3, fetchImpl, storage } = {}) {
            this.service = service;
            this.fetchImpl = fetchImpl;
            this.storage = storage;
            this.models = new Map();
        }

        async load(entry, { signal } = {}) {
            if (!entry || entry.status !== 'provider-verified') return { state: 'draft' };
            if (!this.service) return { state: 'lyricsUnavailable' };
            try {
                const providerResult = await this.service.getLyrics(entry, {
                    signal,
                    fetchImpl: this.fetchImpl,
                    storage: this.storage
                });
                const model = this.service.buildFiveGapModel(providerResult.plainLyrics, entry.gaps);
                this.models.set(entry.id, model);
                const transferPrompts = Array.isArray(entry.pedagogy?.transferPrompts)
                    ? entry.pedagogy.transferPrompts.filter(prompt => String(prompt || '').trim())
                    : [];
                return {
                    state: 'ready',
                    payload: {
                        lines: model.lines,
                        gaps: model.gaps.map(({ id, absoluteTokenIndex }, index) => ({
                            id,
                            absoluteTokenIndex,
                            gapPosition: `gap-${index + 1}`
                        })),
                        source: providerResult.source,
                        transferPrompts,
                        transferPrompt: entry.pedagogy?.transferPrompt || entry.pedagogy?.application || null
                    }
                };
            } catch (error) {
                const mismatchCodes = new Set(['provider-mismatch', 'gap-not-found', 'duplicate-gap-position', 'invalid-gap-count']);
                return {
                    state: mismatchCodes.has(error?.code) ? 'syncMismatch' : 'lyricsUnavailable',
                    errorCode: error?.code || 'lyrics-unavailable'
                };
            }
        }

        async submit(entry, attempt, responses) {
            const model = this.models.get(entry?.id);
            if (!model) return { state: 'syncMismatch' };
            const items = this.service.gradeResponses(model.gaps, responses, { reveal: attempt >= (entry.pedagogy?.maxAttempts || 3) });
            return {
                state: 'submitted',
                payload: {
                    items,
                    completed: items.every(item => item.status === 'correct') || attempt >= (entry.pedagogy?.maxAttempts || 3)
                }
            };
        }

        reveal(entry, gapId) {
            const gap = this.models.get(entry?.id)?.gaps.find(item => item.id === gapId);
            return gap?.answer || null;
        }
    }

    class MusicClozeActivity {
        constructor(root, entry, options = {}) {
            this.root = root;
            this.entry = entry;
            this.adapter = options.adapter || new ProviderLyricsAdapter(options);
            this.attempt = 0;
            this.payload = null;
            this.revealed = new Set();
            this.revealSnapshots = new Map();
            this.abortController = new AbortController();
        }

        setState(state, message) {
            this.root.dataset.musicState = STATES.includes(state) ? state : 'lyricsUnavailable';
            const status = this.root.querySelector('[data-music-status]');
            if (status) status.textContent = message || state;
        }

        goToHomework(reason = 'complete') {
            this.root.dispatchEvent(new CustomEvent(`musiccloze:${reason}`, {
                bubbles: true,
                detail: { curriculumId: this.entry.curriculumId }
            }));
            globalScope.setTimeout(() => document.getElementById('next-btn')?.click(), 0);
        }

        renderFailure(state) {
            const messages = {
                lyricsUnavailable: 'A letra não carregou agora. Você pode seguir para o homework.',
                audioUnavailable: 'O player não está disponível agora. Você pode seguir sem penalidade.',
                draft: 'Atividade aguardando revisão do professor.',
                rightsBlocked: 'A exibição da letra está bloqueada. A aula continua normalmente.',
                syncMismatch: 'A gravação e as cinco ocorrências não coincidem. A atividade foi enviada para revisão.'
            };
            const body = this.root.querySelector('[data-music-body]');
            if (body) {
                body.innerHTML = `<div class="music-cloze-notice" role="alert"><i class="fas fa-circle-exclamation" aria-hidden="true"></i><span>${escapeHtml(messages[state] || messages.lyricsUnavailable)}</span></div><button type="button" class="music-cloze-secondary" data-music-skip>Ir para o homework</button>`;
                body.querySelector('[data-music-skip]')?.addEventListener('click', () => this.goToHomework('skip'));
            }
            this.setState(state, messages[state]);
        }

        renderReady(payload) {
            this.payload = payload;
            const body = this.root.querySelector('[data-music-body]');
            if (!body) return;
            const fields = new Map(payload.gaps.map((gap, index) => [gap.gapPosition, { ...gap, index }]));
            const lines = payload.lines.map(line => {
                if (!line.segments.length) return '<p class="music-cloze-line music-cloze-line-empty" aria-hidden="true">&nbsp;</p>';
                const content = line.segments.map(segment => {
                    if (segment.type !== 'gap') return escapeHtml(segment.text || '');
                    const field = fields.get(segment.gapPosition);
                    if (!field) return '';
                    return `<span class="music-cloze-gap" data-gap-wrap="${field.index}"><label><span class="sr-only">Lacuna ${field.index + 1} de 5</span><input type="text" inputmode="text" autocomplete="off" autocapitalize="off" spellcheck="false" data-music-gap="${field.index}" data-gap-id="${escapeHtml(field.id || `gap-${field.index + 1}`)}" aria-label="Lacuna ${field.index + 1} de 5" aria-describedby="music-gap-feedback-${field.index}"></label><button type="button" class="music-gap-reveal" data-music-reveal="${field.index}" aria-label="Revelar resposta da lacuna ${field.index + 1}" aria-pressed="false" title="Revelar resposta"><i class="fas fa-eye" aria-hidden="true"></i></button><span id="music-gap-feedback-${field.index}" class="music-gap-feedback" data-gap-feedback="${field.index}" aria-live="polite"></span></span>`;
                }).join('');
                return `<p class="music-cloze-line">${content}</p>`;
            }).join('');
            const transferPrompts = payload.transferPrompts?.length
                ? payload.transferPrompts
                : [payload.transferPrompt || 'Use duas palavras reconhecidas para comentar o tema da lição.'];

            body.innerHTML = `<div class="music-cloze-instructions"><span>1. Preveja</span><span>2. Ouça</span><span>3. Complete</span><span>4. Confira</span><span>5. Converse</span></div><div class="music-cloze-lines" aria-label="Letra da música com cinco lacunas">${lines}</div><div class="music-cloze-actions"><button type="button" class="music-cloze-primary" data-music-submit>Verificar respostas</button><button type="button" class="music-cloze-secondary" data-music-replay>Ouvir novamente</button></div><div class="music-cloze-transfer hidden" data-music-transfer><strong>Conversation after the song</strong><ol class="music-cloze-transfer-list">${transferPrompts.map((prompt, index) => `<li><span>${index + 1}</span><p>${escapeHtml(prompt)}</p></li>`).join('')}</ol><button type="button" class="music-cloze-primary" data-music-finish>Ir para o homework</button></div>`;
            this.setState('ready', 'Ouça e complete as 5 palavras. Progresso: 0 de 5.');
            this.wire();
            body.querySelector('[data-music-gap="0"]')?.focus({ preventScroll: true });
        }

        wire() {
            const inputs = Array.from(this.root.querySelectorAll('[data-music-gap]'));
            inputs.forEach((input, index) => {
                input.addEventListener('keydown', event => {
                    if (event.key !== 'Enter') return;
                    event.preventDefault();
                    (inputs[index + 1] || this.root.querySelector('[data-music-submit]'))?.focus();
                });
            });
            this.root.querySelector('[data-music-submit]')?.addEventListener('click', () => this.submit(inputs));
            this.root.querySelector('[data-music-replay]')?.addEventListener('click', () => {
                this.setState('ready', 'Use o controle do player oficial para ouvir novamente.');
            });
            this.root.querySelectorAll('[data-music-reveal]').forEach(button => {
                button.addEventListener('click', () => this.revealGap(Number(button.dataset.musicReveal), inputs));
            });
            this.root.querySelector('[data-music-finish]')?.addEventListener('click', () => this.goToHomework('complete'));
        }

        revealGap(index, inputs) {
            const input = inputs[index];
            if (!input) return;
            const feedback = this.root.querySelector(`[data-gap-feedback="${index}"]`);
            if (this.revealed.has(index)) {
                const snapshot = this.revealSnapshots.get(index) || {};
                this.revealed.delete(index);
                this.revealSnapshots.delete(index);
                input.value = snapshot.value || '';
                input.disabled = false;
                input.classList.remove('revealed');
                ['correct', 'incorrect', 'almost'].forEach(state => input.classList.toggle(state, snapshot.states?.includes(state)));
                if (snapshot.ariaInvalid == null) input.removeAttribute('aria-invalid');
                else input.setAttribute('aria-invalid', snapshot.ariaInvalid);
                if (feedback) feedback.textContent = snapshot.feedback || '';
                this.updateRevealButton(index, false);
                if (!this.finishIfResolved(inputs)) {
                    this.setState(this.attempt ? 'partial' : 'ready', 'Resposta ocultada. Ouça novamente e complete a lacuna.');
                }
                input.focus({ preventScroll: true });
                return;
            }
            const answer = this.adapter.reveal(this.entry, input.dataset.gapId);
            if (!answer) return;
            this.revealSnapshots.set(index, {
                value: input.value,
                feedback: feedback?.textContent || '',
                states: ['correct', 'incorrect', 'almost'].filter(state => input.classList.contains(state)),
                ariaInvalid: input.getAttribute('aria-invalid')
            });
            this.revealed.add(index);
            input.value = answer;
            input.disabled = true;
            input.classList.remove('incorrect', 'almost');
            input.classList.add('revealed');
            input.setAttribute('aria-invalid', 'false');
            if (feedback) feedback.textContent = '';
            this.updateRevealButton(index, true);
            this.finishIfResolved(inputs);
        }

        updateRevealButton(index, showingAnswer) {
            const button = this.root.querySelector(`[data-music-reveal="${index}"]`);
            if (!button) return;
            const action = showingAnswer ? 'Ocultar' : 'Revelar';
            button.hidden = false;
            button.disabled = false;
            button.setAttribute('aria-pressed', String(showingAnswer));
            button.setAttribute('aria-label', `${action} resposta da lacuna ${index + 1}`);
            button.title = `${action} resposta`;
            const icon = button.querySelector('i');
            icon?.classList.toggle('fa-eye', !showingAnswer);
            icon?.classList.toggle('fa-eye-slash', showingAnswer);
        }

        finishIfResolved(inputs) {
            const resolved = inputs.every((input, index) => input.classList.contains('correct') || this.revealed.has(index));
            const transfer = this.root.querySelector('[data-music-transfer]');
            if (!resolved) {
                transfer?.classList.add('hidden');
                return false;
            }
            transfer?.classList.remove('hidden');
            const correct = inputs.filter(input => input.classList.contains('correct')).length;
            this.setState(correct === 5 ? 'complete' : 'partial', correct === 5 ? 'Ótimo — 5 de 5!' : `${correct} de 5 corretas. As demais respostas foram reveladas.`);
            return true;
        }

        async submit(inputs) {
            this.attempt += 1;
            this.setState('checking', 'Verificando suas respostas…');
            const submitButton = this.root.querySelector('[data-music-submit]');
            inputs.forEach(input => { input.disabled = true; });
            if (submitButton) submitButton.disabled = true;
            try {
                const responses = inputs.map(input => ({ gapId: input.dataset.gapId, value: input.value }));
                const result = await this.adapter.submit(this.entry, this.attempt, responses);
                if (result.state !== 'submitted') {
                    this.renderFailure(result.state);
                    return;
                }
                this.setState('submitted', 'Respostas verificadas.');
                let correct = 0;
                let almost = 0;
                result.payload.items.forEach((item, index) => {
                    const input = inputs[index];
                    if (!input || this.revealed.has(index)) return;
                    const isCorrect = item.status === 'correct';
                    const isAlmost = item.status === 'almost';
                    const feedback = this.root.querySelector(`[data-gap-feedback="${index}"]`);
                    input.classList.toggle('correct', isCorrect);
                    input.classList.toggle('almost', isAlmost);
                    input.classList.toggle('incorrect', !isCorrect && !isAlmost);
                    input.setAttribute('aria-invalid', isCorrect ? 'false' : 'true');
                    if (item.reveal && !isCorrect) {
                        if (!this.revealSnapshots.has(index)) {
                            this.revealSnapshots.set(index, {
                                value: input.value,
                                feedback: feedback?.textContent || '',
                                states: ['correct', 'incorrect', 'almost'].filter(state => input.classList.contains(state)),
                                ariaInvalid: input.getAttribute('aria-invalid')
                            });
                        }
                        this.revealed.add(index);
                        input.value = item.reveal;
                        input.classList.remove('incorrect', 'almost');
                        input.classList.add('revealed');
                    }
                    if (feedback) feedback.textContent = isCorrect ? '✓ Correto' : isAlmost ? '≈ Quase' : item.reveal ? '' : '• Pendente';
                    if (isCorrect) correct += 1;
                    if (isAlmost) almost += 1;
                });

                correct = inputs.filter(input => input.classList.contains('correct')).length;
                const score = this.root.querySelector('.music-cloze-score');
                if (score) {
                    score.textContent = `${correct}/5`;
                    score.setAttribute('aria-label', `${correct} de 5 respostas corretas`);
                }
                const finished = this.finishIfResolved(inputs);
                if (!finished) {
                    const almostText = almost ? ` ${almost} quase.` : '';
                    this.setState('partial', `Você acertou ${correct} de 5.${almostText} Tente novamente.`);
                }
                this.root.querySelectorAll('[data-music-reveal]').forEach((button, index) => {
                    const correctAnswer = inputs[index].classList.contains('correct');
                    if (correctAnswer) {
                        button.hidden = true;
                        button.disabled = true;
                    } else {
                        this.updateRevealButton(index, this.revealed.has(index));
                    }
                });
                const pending = inputs.find((input, index) => !input.classList.contains('correct') && !this.revealed.has(index));
                pending?.focus();
            } catch (error) {
                console.error('MusicClozeV3 correction failed safely:', error?.code || error?.name || 'unknown');
                this.renderFailure('lyricsUnavailable');
            } finally {
                inputs.forEach((input, index) => {
                    input.disabled = input.classList.contains('correct') || this.revealed.has(index);
                });
                if (submitButton) submitButton.disabled = this.finishIfResolved(inputs) || this.attempt >= (this.entry.pedagogy?.maxAttempts || 3);
            }
        }

        async start() {
            this.setState('loading', 'Carregando música e letra…');
            try {
                const result = await this.adapter.load(this.entry, { signal: this.abortController.signal });
                if (result.state !== 'ready') {
                    this.renderFailure(result.state);
                    return;
                }
                this.renderReady(result.payload);
            } catch (error) {
                console.error('MusicClozeV3 failed safely:', error?.code || error?.name || 'unknown');
                this.renderFailure('lyricsUnavailable');
            }
        }
    }

    class TeacherMusicPanel {
        static render(entry, { authorized = false } = {}) {
            if (!authorized || !entry) return '';
            const gaps = entry.gaps || [];
            const source = entry.lyrics?.lrclibId ? `LRCLIB #${entry.lyrics.lrclibId}` : 'LRCLIB aguardando correspondência';
            return `<aside class="teacher-music-panel"><div class="teacher-music-head"><h3>Teacher Music Panel</h3><span>${escapeHtml(entry.status)}</span></div><p><strong>Faixa:</strong> ${escapeHtml(entry.song?.title)} — ${escapeHtml(entry.song?.artist)}</p><p><strong>Fonte:</strong> ${escapeHtml(source)}</p><p><strong>Spotify:</strong> ${escapeHtml(entry.song?.spotifyTrackId || 'aguardando confirmação')}</p><p><strong>Objetivos:</strong> ${escapeHtml((entry.pedagogy?.targetVocabulary || []).join(', '))}</p><p><strong>Justificativa:</strong> ${escapeHtml(entry.pedagogy?.application || '')}</p><ol>${gaps.map((gap, index) => `<li><strong>${index + 1}. ${escapeHtml(gap.answer)}</strong> · ocorrência ${escapeHtml(gap.occurrence)} <button type="button" data-teacher-reveal="${index}">Revelar</button></li>`).join('')}</ol><div class="teacher-music-actions"><button type="button" data-teacher-report>Reportar divergência</button></div></aside>`;
        }
    }

    function renderShell(entry, lesson) {
        const player = globalScope.SpotifyEmbedV3?.render(entry.song)
            || '<div class="music-cloze-notice" role="status">O player não está disponível agora.</div>';
        return `<div class="music-cloze-v3" data-music-cloze-v3 data-entry-id="${escapeHtml(entry.id)}" data-curriculum-id="${escapeHtml(entry.curriculumId)}" data-music-state="loading"><div class="music-cloze-head"><div><p class="lesson-panel-title">MusicCloze V3</p><h3>${escapeHtml(entry.song.title)}</h3><p>${escapeHtml(entry.song.artist)}</p></div><span class="music-cloze-score" aria-label="0 de 5 respostas corretas">0/5</span></div>${player}<div class="music-cloze-objective">Ouça e complete 5 palavras da aula · ${escapeHtml(lesson?.title || '')}</div><div class="music-cloze-body" data-music-body><div class="music-cloze-skeleton" aria-hidden="true"></div></div><p class="music-cloze-status" data-music-status role="status" aria-live="polite">Carregando música e letra…</p></div>`;
    }

    function getPublicEntry(lesson) {
        if (!lesson || lesson.lessonKind !== 'lexical') return null;
        return globalScope.MusicCatalogV3?.getForCurriculumId(lesson.curriculumId || lesson.id) || null;
    }

    function prepareSlides(slides, lesson) {
        const cleanSlides = (slides || []).filter(slide => !['music', 'musicCloze'].includes(slide?.type));
        const entry = getPublicEntry(lesson);
        if (!entry) return cleanSlides;
        const homeworkIndex = cleanSlides.findIndex(slide => slide?.type === 'homework');
        const musicSlide = { type: 'musicCloze', title: `Music Moment: ${entry.song.title}`, entry };
        cleanSlides.splice(homeworkIndex < 0 ? cleanSlides.length : homeworkIndex, 0, musicSlide);
        return cleanSlides;
    }

    function mountAll(options = {}) {
        document.querySelectorAll('[data-music-cloze-v3]').forEach(root => {
            if (root.dataset.musicMounted === 'true') return;
            const curriculumId = root.dataset.curriculumId;
            const entry = globalScope.MusicCatalogV3?.getForCurriculumId(curriculumId);
            if (!entry) {
                root.remove();
                return;
            }
            root.dataset.musicMounted = 'true';
            new MusicClozeActivity(root, entry, options).start();
        });
    }

    globalScope.MusicClozeV3 = Object.freeze({
        states: STATES,
        ProviderLyricsAdapter,
        MusicClozeActivity,
        TeacherMusicPanel,
        renderShell,
        getPublicEntry,
        prepareSlides,
        mountAll
    });
}(window));
