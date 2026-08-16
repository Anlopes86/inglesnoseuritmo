(function advancedV3LessonPlayer(globalScope) {
    'use strict';

    const escapeHtml = value => String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const path = globalScope.location.pathname.replace(/\\/g, '/');
    const pathMatch = path.match(/\/(b2-v3|c1-v3)\/licao-(\d+)\.html$/i);
    const moduleId = (document.body.dataset.module || pathMatch?.[1] || '').toLowerCase();
    const lessonNumber = Number(document.body.dataset.lessonNumber || pathMatch?.[2] || 1);
    const baseLesson = globalScope.AdvancedV3Lessons?.[moduleId]?.find(item => item.number === lessonNumber);
    const editorial = globalScope.V3LessonEditorial;
    const lesson = baseLesson && editorial?.has(moduleId, lessonNumber)
        ? editorial.apply(moduleId, lessonNumber, baseLesson)
        : baseLesson;

    function reveal(id, answer) {
        return `<button type="button" class="advanced-reveal" data-reveal="${escapeHtml(id)}" aria-controls="${escapeHtml(id)}" aria-expanded="false"><i class="fas fa-eye" aria-hidden="true"></i> Conferir modelo</button>
            <div id="${escapeHtml(id)}" class="advanced-answer" hidden>${escapeHtml(answer)}</div>`;
    }

    function heading(eyebrow, title, lead = '') {
        return `<p class="advanced-eyebrow">${escapeHtml(eyebrow)}</p><h2>${escapeHtml(title)}</h2>${lead ? `<p class="advanced-lead">${escapeHtml(lead)}</p>` : ''}`;
    }

    function slide(title, minutes, html, oralMinutes = 0) {
        return { title, minutes, oralMinutes, html };
    }

    function renderQuestions(items, prefix) {
        return `<div class="advanced-grid">${(items || []).map(([question, answer], index) => `<article class="advanced-card">
            <h3>${index + 1}. ${escapeHtml(question)}</h3>
            ${reveal(`${prefix}-${index}`, answer)}
        </article>`).join('')}</div>`;
    }

    function renderDialogue(lines) {
        return `<div class="advanced-dialogue">${(lines || []).map(([speaker, text]) => `<div class="advanced-line"><strong>${escapeHtml(speaker)}</strong><span>${escapeHtml(text)}</span></div>`).join('')}</div>`;
    }

    function renderGrammarExample(example, translation = '') {
        if (!example) return '';
        return `<span class="v3-grammar-example"><span class="v3-grammar-example-en">${escapeHtml(example)}</span><em class="v3-grammar-example-translation" data-v3-translate="${escapeHtml(example)}"${translation ? ` data-v3-translation="${escapeHtml(translation)}"` : ''}></em></span>`;
    }

    function ensureTranslations(root) {
        if (globalScope.V3Translations) {
            globalScope.V3Translations.enhance(root);
            return;
        }
        if ([...document.scripts].some(script => (script.getAttribute('src') || '').endsWith('/js/v3-pt-translations.js'))) return;
        const script = document.createElement('script');
        script.src = '../js/v3-pt-translations.js';
        script.defer = true;
        document.body.appendChild(script);
    }

    function contentSlides(data) {
        return [
            slide('Mission & Dialogue', 6, `<section class="advanced-stage">
                ${heading(`${data.level} · Topic & Scene`, data.title, data.scenario)}
                <div class="advanced-badges"><span class="advanced-badge">60 minutes</span><span class="advanced-badge">${escapeHtml(data.linguisticFocus)}</span><span class="advanced-badge">Action-oriented</span></div>
                <div class="advanced-grid"><div class="advanced-card"><h3>Can-do outcomes</h3><ul class="advanced-list">${data.objectives.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div><div class="advanced-card"><h3>Dialog Sample</h3>${renderDialogue(data.dialogue)}</div></div>
            </section>`, 4),
            slide('Reading & Reception', 7, `<section class="advanced-stage">
                ${heading('Context Reading', data.input.title, 'Leia uma vez para a ideia central e outra vez para perspectiva, relações e escolhas linguísticas.')}
                <div class="advanced-card">${data.input.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}</div>
                <div style="height:18px"></div>${renderQuestions(data.input.questions, `input-${data.number}`)}
            </section>`, 1),
            slide('Language Control', 8, `<section class="advanced-stage">
                ${heading('Grammar in Context', data.language.focus, 'A forma serve ao significado, à organização da informação e ao registro.')}
                <div class="advanced-table-wrap"><table class="advanced-table"><thead><tr><th>Decision</th><th>How to control it</th><th>Model in context</th></tr></thead><tbody>${data.language.explanation.map((note, index) => `<tr><td>${index + 1}</td><td>${escapeHtml(note)}</td><td>${renderGrammarExample(data.language.examples[index % data.language.examples.length], data.language.translations?.[index % data.language.examples.length] || '')}</td></tr>`).join('')}</tbody></table></div>
            </section>`, 2),
            slide('Lexical Chunks', 5, `<section class="advanced-stage">
                ${heading('Vocabulary Expansion · Helping You', 'Expressions, collocations and stance', 'Observe significado, combinação, função discursiva e exemplo antes de adaptar o bloco ao caso.')}
                <div class="advanced-grid">${data.chunks.map(item => `<article class="advanced-card"><h3>${escapeHtml(item.term)}</h3><p>${escapeHtml(item.meaning)}</p><p><strong>${escapeHtml(item.example)}</strong></p></article>`).join('')}</div>
            </section>`, 3),
            slide('Controlled Practice', 6, `<section class="advanced-stage">
                ${heading('Short controlled practice', 'Choose, reformulate and justify', 'Responda antes de revelar; explique a diferença de significado ou registro.')}
                <div class="advanced-grid">${data.practice.map((item, index) => `<article class="advanced-card"><p class="advanced-eyebrow">${escapeHtml(item.label)}</p><h3>${escapeHtml(item.prompt)}</h3>${reveal(`practice-${data.number}-${index}`, item.answer)}</article>`).join('')}</div>
            </section>`, 3),
            slide('Teacher Listening', 6, `<section class="advanced-stage">
                ${heading('Listening', 'Evidence, qualification and action', data.listening.setup)}
                <article class="advanced-card"><h3>Teacher script</h3><p>O roteiro fica oculto durante as duas leituras.</p>${reveal(`listening-script-${data.number}`, data.listening.script)}</article>
                <div style="height:18px"></div>${renderQuestions(data.listening.questions, `listening-${data.number}`)}
            </section>`, 3),
            slide('Mediation Brief', 7, `<section class="advanced-stage">
                ${heading('Mediation', 'Combine without flattening the sources', data.mediation.task)}
                <div class="advanced-grid"><article class="advanced-card"><h3>Source A</h3><p>${escapeHtml(data.mediation.sourceA)}</p></article><article class="advanced-card"><h3>Source B</h3><p>${escapeHtml(data.mediation.sourceB)}</p></article></div>
                <article class="advanced-card" style="margin-top:18px"><h3>Output checklist</h3><ul class="advanced-list"><li>Marque a origem de cada afirmação.</li><li>Explique convergência ou contraste.</li><li>Adapte a densidade ao público sem inventar certeza.</li></ul></article>
            </section>`, 6),
            slide('Speaking Performance', 8, `<section class="advanced-stage">
                ${heading('Let’s Talk · Guided Conversation', 'Defend, answer and reformulate', data.speaking.scenario)}
                <div class="advanced-grid">${data.speaking.rounds.map((round, index) => `<article class="advanced-card advanced-round"><span class="advanced-round-number">${index + 1}</span><h3>${escapeHtml(round)}</h3><p>${index === 0 ? 'Organize posição, evidência e ressalva.' : index === 1 ? 'Responda diretamente e verifique entendimento.' : 'Adapte precisão, registro e extensão.'}</p></article>`).join('')}</div>
                <article class="advanced-card advanced-evidence" style="margin-top:18px"><h3>Teacher focus</h3><p>${escapeHtml(data.speaking.teacherFocus)}</p></article>
            </section>`, 8),
            slide('Online Interaction', 4, `<section class="advanced-stage">
                ${heading('Online interaction', 'Contribute and connect', 'A resposta deve se ligar explicitamente à contribuição anterior.')}
                <article class="advanced-card"><h3>Forum task</h3><p>${escapeHtml(data.online.prompt)}</p><ul class="advanced-list"><li>Acknowledge or quote the idea briefly.</li><li>Add evidence or a qualification.</li><li>Close with a focused question or next action.</li></ul></article>
            </section>`, 2),
            slide('Homework & Evidence', 3, `<section class="advanced-stage">
                ${heading('Independent production', 'Homework and CEFR evidence', data.homework)}
                <div class="advanced-grid"><article class="advanced-card"><h3>Quality checklist</h3><ul class="advanced-list"><li>O texto responde ao propósito e ao público.</li><li>As fontes e limitações permanecem visíveis.</li><li>As escolhas linguísticas sustentam o significado.</li><li>O produto foi revisado para coesão e precisão.</li></ul></article><article class="advanced-card advanced-evidence"><h3>CEFR coverage</h3><ul class="advanced-list">${data.cefrObjectives.map(item => `<li><strong>${escapeHtml(item.skill)}:</strong> ${escapeHtml(item.descriptor)}</li>`).join('')}</ul></article></div>
            </section>`, 0)
        ];
    }

    function reviewSlides(data) {
        const chunkCards = data.chunks.map(item => `<article class="advanced-card"><h3>${escapeHtml(item.term)}</h3><p>${escapeHtml(item.example)}</p></article>`).join('');
        return [
            slide('Mission Brief', 3, `<section class="advanced-stage">
                ${heading(`${data.level} · Conversation Review`, data.title, data.scenario)}
                <div class="advanced-badges"><span class="advanced-badge">${data.oralInteractionMinutes} minutes oral interaction</span></div>
            </section>`),
            slide('Context Input', 5, `<section class="advanced-stage">
                ${heading('Context Reading', data.input.title, 'Identifique fatos, perspectivas, linguagem recorrente e perguntas ainda abertas.')}
                <div class="advanced-card">${data.input.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}</div>
                <div style="height:18px"></div>${renderQuestions(data.input.questions, `review-input-${data.number}`)}
            </section>`, 3),
            slide('Recovered Language', 5, `<section class="advanced-stage">
                ${heading('Helping You · Key Phrases', 'Expressions and collocations', 'Explique a função de cada bloco e produza uma variação ligada ao tema.')}
                <div class="advanced-grid">${chunkCards}</div>
            </section>`, 4),
            slide('Controlled Practice', 5, `<section class="advanced-stage">
                ${heading('Brief control', 'Prepare accuracy for the mission', 'Resolva rapidamente; a maior parte da aula pertence à interação.')}
                <div class="advanced-grid">${data.controlledPractice.map((item, index) => `<article class="advanced-card"><p class="advanced-eyebrow">${escapeHtml(item.label)}</p><h3>${escapeHtml(item.prompt)}</h3>${reveal(`review-practice-${data.number}-${index}`, item.answer)}</article>`).join('')}</div>
            </section>`, 4),
            slide('Listening & Guided Questions', 5, `<section class="advanced-stage">
                ${heading('Listening input', 'Listen, confirm and answer', data.listening.setup)}
                <article class="advanced-card"><p>Ouça, confirme o que entendeu e responda às perguntas do professor antes de revelar o roteiro.</p>${reveal(`review-listening-${data.number}`, data.listening.script)}</article>
            </section>`, 4),
            ...data.rounds.map((round, index) => slide(round.title, 9, `<section class="advanced-stage">
                ${heading('Let’s Talk · Guided Conversation', round.title, round.condition)}
                <article class="advanced-card advanced-round"><span class="advanced-round-number">${index + 1}</span><h3>Observable target</h3><p>${escapeHtml(round.target)}</p><ul class="advanced-list"><li>Use evidence from the input.</li><li>Answer the follow-up question directly.</li><li>Confirm the conclusion, unresolved point or next action.</li></ul></article>
            </section>`, 9)),
            slide('Feedback & CEFR Evidence', 5, `<section class="advanced-stage">
                ${heading('Teacher focus', 'One priority, clearer final synthesis', data.teacherFocus)}
                <div class="advanced-grid"><article class="advanced-card advanced-evidence"><h3>CEFR evidence</h3><ul class="advanced-list">${data.cefrEvidence.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></article><article class="advanced-card"><h3>Cumulative recycling</h3><ul class="advanced-list">${data.cumulativeRecycling.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></article></div>
            </section>`, 3),
            slide('Online Follow-up & Homework', 5, `<section class="advanced-stage">
                ${heading('Online interaction & reflection', 'Record the final synthesis', data.online.prompt)}
                <div class="advanced-grid"><article class="advanced-card"><h3>Online post</h3><p>${escapeHtml(data.online.prompt)}</p></article><article class="advanced-card"><h3>Homework</h3><p>${escapeHtml(data.homework)}</p><ul class="advanced-list"><li>Nomeie o feedback aplicado.</li><li>Registre como a resposta ficou mais clara.</li><li>Defina o próximo passo.</li></ul></article></div>
            </section>`)
        ];
    }

    function mount() {
        const root = document.getElementById('advanced-root');
        if (!root || !lesson) {
            if (root) root.innerHTML = '<section class="advanced-stage advanced-error"><h2>Lição não encontrada</h2><p>Verifique o manifesto curricular e o número da página.</p></section>';
            return;
        }

        const slides = lesson.type === 'review' || (lesson.type === 'project' && lesson.number % 2 === 0)
            ? reviewSlides(lesson)
            : contentSlides(lesson);
        const totalMinutes = slides.reduce((sum, item) => sum + item.minutes, 0);
        const oralMinutes = slides.reduce((sum, item) => sum + item.oralMinutes, 0);
        root.innerHTML = slides.map((item, index) => `<div class="advanced-slide ${index === 0 ? 'active' : ''}" data-title="${escapeHtml(item.title)}" data-minutes="${item.minutes}" data-oral-minutes="${item.oralMinutes}" aria-hidden="${index === 0 ? 'false' : 'true'}">${item.html}</div>`).join('');
        ensureTranslations(root);

        const label = moduleId.toUpperCase();
        document.title = `${label} · Lição ${String(lesson.number).padStart(2, '0')}: ${lesson.title}`;
        document.getElementById('advanced-lesson-title').textContent = `${label} · Lição ${String(lesson.number).padStart(2, '0')}: ${lesson.title}`;
        document.getElementById('advanced-session-meta').textContent = `${lesson.type === 'content' ? 'Conteúdo integrado' : lesson.type === 'review' ? 'Revisão comunicativa' : 'Projeto'} · ${totalMinutes} min${oralMinutes ? ` · ${oralMinutes} min de interação oral` : ''}`;

        const elements = [...root.querySelectorAll('.advanced-slide')];
        const prev = document.getElementById('advanced-prev');
        const next = document.getElementById('advanced-next');
        const finish = document.getElementById('advanced-finish');
        const counter = document.getElementById('advanced-counter');
        const title = document.getElementById('advanced-slide-title');
        const progress = document.getElementById('advanced-progress-bar');
        let current = 0;

        const render = () => {
            elements.forEach((element, index) => {
                element.classList.toggle('active', index === current);
                element.setAttribute('aria-hidden', index === current ? 'false' : 'true');
            });
            prev.disabled = current === 0;
            next.hidden = current === elements.length - 1;
            finish.hidden = current !== elements.length - 1;
            counter.textContent = `${current + 1} / ${elements.length}`;
            title.textContent = `${elements[current].dataset.title} · ${elements[current].dataset.minutes} min`;
            progress.style.width = `${((current + 1) / elements.length) * 100}%`;
            globalScope.scrollTo({ top: 0, behavior: 'smooth' });
        };

        root.addEventListener('click', event => {
            const button = event.target.closest('[data-reveal]');
            if (!button) return;
            const answer = document.getElementById(button.dataset.reveal);
            if (!answer) return;
            const show = answer.hidden;
            answer.hidden = !show;
            button.setAttribute('aria-expanded', String(show));
            button.innerHTML = `<i class="fas ${show ? 'fa-eye-slash' : 'fa-eye'}" aria-hidden="true"></i> ${show ? 'Ocultar modelo' : 'Conferir modelo'}`;
        });
        prev.addEventListener('click', () => { if (current > 0) { current -= 1; render(); } });
        next.addEventListener('click', () => { if (current < elements.length - 1) { current += 1; render(); } });
        finish.addEventListener('click', async () => {
            finish.disabled = true;
            finish.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Salvando';
            const saved = typeof globalScope.markLessonAsComplete === 'function'
                ? await globalScope.markLessonAsComplete(moduleId, lesson.number)
                : false;
            if (!saved) {
                finish.disabled = false;
                finish.innerHTML = '<i class="fas fa-rotate-right" aria-hidden="true"></i> Tentar novamente';
            }
        });
        document.addEventListener('keydown', event => {
            if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || '')) return;
            if (event.key === 'ArrowLeft') prev.click();
            if (event.key === 'ArrowRight' && !next.hidden) next.click();
        });
        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount, { once: true });
    } else {
        mount();
    }
}(window));
