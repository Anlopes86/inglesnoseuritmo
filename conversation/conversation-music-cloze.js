(function installConversationMusicCloze(globalScope) {
    'use strict';

    if (globalScope.ConversationMusicCloze) return;

    const instances = new WeakMap();
    const runtimeMusicStatuses = new Set(['provider-verified', 'draft-until-provider-match']);

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    class ConversationMusicActivity {
        constructor(root, entry, { service = globalScope.LyricsServiceV3 } = {}) {
            this.root = root;
            this.entry = entry;
            this.service = service;
            this.model = null;
            this.attempt = 0;
            this.revealed = new Set();
            this.revealSnapshots = new Map();
            this.abortController = new AbortController();
        }

        setState(state, message) {
            this.root.dataset.musicState = state;
            const status = this.root.querySelector('[data-conversation-music-status]');
            if (status) status.textContent = message || state;
        }

        renderShell() {
            this.root.innerHTML = `
                <div class="conversation-cloze-head">
                    <div>
                        <p class="conversation-cloze-kicker">Real Lyrics Challenge</p>
                        <h3>Listen and complete five words</h3>
                    </div>
                    <span class="conversation-cloze-score" data-conversation-music-score aria-label="0 of 5 correct answers">0/5</span>
                </div>
                <div data-conversation-music-body><div class="conversation-cloze-skeleton" aria-hidden="true"></div></div>
                <p class="conversation-cloze-status" data-conversation-music-status role="status" aria-live="polite">Loading the lyrics…</p>`;
        }

        continueToDiscussion() {
            document.getElementById('next-btn')?.click();
        }

        renderFailure(state = 'lyricsUnavailable') {
            const messages = {
                lyricsUnavailable: 'The lyrics are temporarily unavailable. Continue to the conversation with no penalty.',
                syncMismatch: 'This recording and the five gaps no longer match. The activity needs review.',
                draft: 'This lyrics activity is still awaiting verification.'
            };
            const body = this.root.querySelector('[data-conversation-music-body]');
            if (body) {
                body.innerHTML = `<div class="conversation-cloze-notice" role="alert"><i class="fas fa-circle-exclamation" aria-hidden="true"></i><span>${escapeHtml(messages[state] || messages.lyricsUnavailable)}</span></div><button type="button" class="conversation-cloze-secondary" data-conversation-music-continue>Continue to the conversation</button>`;
                body.querySelector('[data-conversation-music-continue]')?.addEventListener('click', () => this.continueToDiscussion());
            }
            this.setState(state, messages[state] || messages.lyricsUnavailable);
        }

        renderReady(model) {
            this.model = model;
            const body = this.root.querySelector('[data-conversation-music-body]');
            if (!body) return;
            const feedbackPrefix = this.entry.id.replace(/[^a-z0-9-]/gi, '-');
            const lines = model.lines.map((line) => {
                if (!line.segments.length) return '<p class="conversation-lyrics-line conversation-lyrics-line-empty" aria-hidden="true">&nbsp;</p>';
                const content = line.segments.map((segment) => {
                    if (segment.type !== 'gap') return escapeHtml(segment.text || '');
                    const index = Number(segment.gapIndex);
                    const gap = model.gaps[index];
                    if (!gap) return '';
                    const feedbackId = `${feedbackPrefix}-feedback-${index}`;
                    return `<span class="conversation-lyrics-gap" data-conversation-gap-wrap="${index}"><label><span class="conversation-sr-only">Gap ${index + 1} of 5</span><input type="text" inputmode="text" autocomplete="off" autocapitalize="off" spellcheck="false" data-conversation-music-gap="${index}" data-gap-id="${escapeHtml(gap.id || `gap-${index + 1}`)}" aria-label="Gap ${index + 1} of 5" aria-describedby="${feedbackId}"></label><button type="button" class="conversation-gap-reveal" data-conversation-music-reveal="${index}" aria-label="Reveal answer for gap ${index + 1}" aria-pressed="false" title="Reveal answer"><i class="fas fa-eye" aria-hidden="true"></i></button><span id="${feedbackId}" class="conversation-gap-feedback" data-conversation-gap-feedback="${index}" aria-live="polite"></span></span>`;
                }).join('');
                return `<p class="conversation-lyrics-line">${content}</p>`;
            }).join('');

            body.innerHTML = `
                <div class="conversation-cloze-instructions"><span>1. Predict</span><span>2. Listen</span><span>3. Complete</span><span>4. Check</span><span>5. Discuss</span></div>
                <div class="conversation-lyrics-lines" aria-label="Real song lyrics with five gaps">${lines}</div>
                <div class="conversation-cloze-actions">
                    <button type="button" class="conversation-cloze-primary" data-conversation-music-submit>Check answers</button>
                    <button type="button" class="conversation-cloze-secondary" data-conversation-music-replay>Listen again</button>
                </div>
                <div class="conversation-cloze-transfer hidden" data-conversation-music-transfer>
                    <strong>Conversation bridge</strong>
                    <p>Use two words you recognized to comment on the song before moving on.</p>
                    <button type="button" class="conversation-cloze-primary" data-conversation-music-continue>Continue to the conversation</button>
                </div>`;
            this.wire();
            this.setState('ready', 'Listen and complete the five missing words. Progress: 0 of 5.');
        }

        inputs() {
            return Array.from(this.root.querySelectorAll('[data-conversation-music-gap]'));
        }

        wire() {
            const inputs = this.inputs();
            inputs.forEach((input, index) => {
                input.addEventListener('keydown', (event) => {
                    if (event.key !== 'Enter') return;
                    event.preventDefault();
                    (inputs[index + 1] || this.root.querySelector('[data-conversation-music-submit]'))?.focus();
                });
            });
            this.root.querySelector('[data-conversation-music-submit]')?.addEventListener('click', () => this.submit());
            this.root.querySelector('[data-conversation-music-replay]')?.addEventListener('click', () => {
                this.setState('ready', 'Use the Spotify player to listen again.');
            });
            this.root.querySelectorAll('[data-conversation-music-reveal]').forEach((button) => {
                button.addEventListener('click', () => this.toggleReveal(Number(button.dataset.conversationMusicReveal)));
            });
            this.root.querySelector('[data-conversation-music-continue]')?.addEventListener('click', () => this.continueToDiscussion());
        }

        updateRevealButton(index, showingAnswer) {
            const button = this.root.querySelector(`[data-conversation-music-reveal="${index}"]`);
            if (!button) return;
            const action = showingAnswer ? 'Hide' : 'Reveal';
            button.hidden = false;
            button.disabled = false;
            button.setAttribute('aria-pressed', String(showingAnswer));
            button.setAttribute('aria-label', `${action} answer for gap ${index + 1}`);
            button.title = `${action} answer`;
            button.querySelector('i')?.classList.toggle('fa-eye', !showingAnswer);
            button.querySelector('i')?.classList.toggle('fa-eye-slash', showingAnswer);
        }

        toggleReveal(index) {
            const input = this.inputs()[index];
            const gap = this.model?.gaps[index];
            if (!input || !gap || input.classList.contains('correct')) return;
            const feedback = this.root.querySelector(`[data-conversation-gap-feedback="${index}"]`);
            if (this.revealed.has(index)) {
                const snapshot = this.revealSnapshots.get(index) || {};
                this.revealed.delete(index);
                this.revealSnapshots.delete(index);
                input.value = snapshot.value || '';
                input.disabled = false;
                input.className = snapshot.className || '';
                if (snapshot.ariaInvalid == null) input.removeAttribute('aria-invalid');
                else input.setAttribute('aria-invalid', snapshot.ariaInvalid);
                if (feedback) feedback.textContent = snapshot.feedback || '';
                this.updateRevealButton(index, false);
                this.updateCompletion();
                input.focus({ preventScroll: true });
                return;
            }
            this.revealSnapshots.set(index, {
                value: input.value,
                className: input.className,
                feedback: feedback?.textContent || '',
                ariaInvalid: input.getAttribute('aria-invalid')
            });
            this.revealed.add(index);
            input.value = gap.answer;
            input.disabled = true;
            input.classList.remove('incorrect', 'almost');
            input.classList.add('revealed');
            input.setAttribute('aria-invalid', 'false');
            if (feedback) feedback.textContent = '';
            this.updateRevealButton(index, true);
            this.updateCompletion();
        }

        updateCompletion() {
            const inputs = this.inputs();
            const correct = inputs.filter((input) => input.classList.contains('correct')).length;
            const score = this.root.querySelector('[data-conversation-music-score]');
            if (score) {
                score.textContent = `${correct}/5`;
                score.setAttribute('aria-label', `${correct} of 5 correct answers`);
            }
            const resolved = inputs.length === 5 && inputs.every((input, index) => input.classList.contains('correct') || this.revealed.has(index));
            this.root.querySelector('[data-conversation-music-transfer]')?.classList.toggle('hidden', !resolved);
            if (resolved) {
                this.setState(correct === 5 ? 'complete' : 'partial', correct === 5 ? 'Excellent — 5 out of 5!' : `${correct} of 5 correct. The other answers were revealed.`);
            }
            return resolved;
        }

        submit() {
            if (!this.model || !this.service) return;
            this.attempt += 1;
            const inputs = this.inputs();
            const responses = inputs.map((input) => ({ gapId: input.dataset.gapId, value: input.value }));
            const maxAttempts = this.entry.pedagogy?.maxAttempts || 3;
            const items = this.service.gradeResponses(this.model.gaps, responses, { reveal: this.attempt >= maxAttempts });
            let almost = 0;
            items.forEach((item, index) => {
                const input = inputs[index];
                if (!input || this.revealed.has(index)) return;
                const feedback = this.root.querySelector(`[data-conversation-gap-feedback="${index}"]`);
                const correct = item.status === 'correct';
                const near = item.status === 'almost';
                input.classList.toggle('correct', correct);
                input.classList.toggle('almost', near);
                input.classList.toggle('incorrect', !correct && !near);
                input.setAttribute('aria-invalid', correct ? 'false' : 'true');
                input.disabled = correct;
                if (feedback) feedback.textContent = correct ? '✓ Correct' : near ? '≈ Almost' : '• Try again';
                if (near) almost += 1;
                const revealButton = this.root.querySelector(`[data-conversation-music-reveal="${index}"]`);
                if (revealButton) {
                    revealButton.hidden = correct;
                    revealButton.disabled = correct;
                }
                if (item.reveal && !correct) this.toggleReveal(index);
            });
            if (!this.updateCompletion()) {
                const correct = inputs.filter((input) => input.classList.contains('correct')).length;
                const nearText = almost ? ` ${almost} almost.` : '';
                this.setState('partial', `${correct} of 5 correct.${nearText} Listen and try again.`);
                inputs.find((input, index) => !input.classList.contains('correct') && !this.revealed.has(index))?.focus();
            }
        }

        async start() {
            this.renderShell();
            this.setState('loading', 'Loading the lyrics…');
            if (!this.entry || !runtimeMusicStatuses.has(this.entry.status)) {
                this.renderFailure('draft');
                return;
            }
            if (!this.service) {
                this.renderFailure('lyricsUnavailable');
                return;
            }
            try {
                const providerResult = await this.service.getLyrics(this.entry, { signal: this.abortController.signal });
                const model = this.service.buildFiveGapModel(providerResult.plainLyrics, this.entry.gaps);
                this.renderReady(model);
            } catch (error) {
                const mismatchCodes = new Set(['provider-mismatch', 'gap-not-found', 'duplicate-gap-position', 'invalid-gap-count']);
                const state = mismatchCodes.has(error?.code) ? 'syncMismatch' : 'lyricsUnavailable';
                console.error('Conversation music cloze failed safely:', error?.code || error?.name || 'unknown');
                this.renderFailure(state);
            }
        }
    }

    function mount(root) {
        if (!root || instances.has(root)) return instances.get(root) || null;
        const lessonNumber = Number(root.dataset.lessonNumber);
        const songIndex = Number(root.dataset.songIndex);
        const catalog = lessonNumber <= 48
            ? globalScope.ConversationMusicCatalog0148
            : globalScope.ConversationMusicCatalog;
        const entry = catalog?.get(lessonNumber, songIndex);
        const activity = new ConversationMusicActivity(root, entry);
        instances.set(root, activity);
        activity.start();
        return activity;
    }

    function mountAll(scope = document) {
        scope.querySelectorAll('[data-conversation-music-cloze]').forEach(mount);
    }

    globalScope.ConversationMusicCloze = Object.freeze({
        ConversationMusicActivity,
        mount,
        mountAll
    });
}(window));
