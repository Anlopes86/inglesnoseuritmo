const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profilePath = path.join(os.tmpdir(), `a2-v3-premium-audit-${process.pid}`);
const port = 12000 + (process.pid % 10000);
const failures = [];
const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

async function target() {
    for (let attempt = 0; attempt < 100; attempt += 1) {
        try {
            const response = await fetch(`http://127.0.0.1:${port}/json/list`);
            const pages = await response.json();
            const page = pages.find(item => item.type === 'page');
            if (page?.webSocketDebuggerUrl) return page;
        } catch {
            // Chrome is still starting.
        }
        await delay(100);
    }
    throw new Error('Chrome DevTools target was not available.');
}

function connect(url) {
    return new Promise((resolve, reject) => {
        const socket = new WebSocket(url);
        const pending = new Map();
        let sequence = 0;
        socket.addEventListener('open', () => resolve({
            socket,
            send(method, params = {}) {
                sequence += 1;
                const id = sequence;
                socket.send(JSON.stringify({ id, method, params }));
                return new Promise((resolveCommand, rejectCommand) => {
                    const timer = setTimeout(() => {
                        pending.delete(id);
                        rejectCommand(new Error(`${method} timed out.`));
                    }, 15000);
                    pending.set(id, {
                        resolve(value) { clearTimeout(timer); resolveCommand(value); },
                        reject(error) { clearTimeout(timer); rejectCommand(error); }
                    });
                });
            }
        }));
        socket.addEventListener('message', event => {
            const message = JSON.parse(event.data);
            if (!message.id || !pending.has(message.id)) return;
            const command = pending.get(message.id);
            pending.delete(message.id);
            if (message.error) command.reject(new Error(message.error.message));
            else command.resolve(message.result);
        });
        socket.addEventListener('error', reject);
    });
}

async function main() {
    const chrome = spawn(chromePath, [
        '--headless=new',
        '--disable-gpu',
        '--allow-file-access-from-files',
        '--run-all-compositor-stages-before-draw',
        '--no-first-run',
        '--no-default-browser-check',
        `--remote-debugging-port=${port}`,
        `--user-data-dir=${profilePath}`,
        'about:blank'
    ], { stdio: 'ignore' });

    let client;
    try {
        client = await connect((await target()).webSocketDebuggerUrl);
        await client.send('Page.enable');
        await client.send('Runtime.enable');

        const evaluate = async expression => {
            const response = await client.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
            if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
            return response.result.value;
        };

        async function open(number, width, height) {
            await client.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
            const file = path.join(__dirname, `licao-${String(number).padStart(2, '0')}.html`);
            await client.send('Page.navigate', { url: pathToFileURL(file).href });
            for (let attempt = 0; attempt < 100; attempt += 1) {
                if (await evaluate(`document.readyState === 'complete' && document.querySelectorAll('.slide').length > 0`)) return;
                await delay(80);
            }
            throw new Error(`Lesson ${number} did not hydrate.`);
        }

        const inspect = () => evaluate(`(() => {
            const slides = [...document.querySelectorAll('.slide')];
            const lessonNumber = Number(location.pathname.match(/licao-(\\d+)/)?.[1] || 0);
            const isContent = lessonNumber % 2 === 1 && lessonNumber < 31;
            const isConversation = lessonNumber % 2 === 0 && lessonNumber <= 30;
            const slideMetrics = slides.map((slide, index) => {
                slides.forEach(item => item.classList.remove('active'));
                slide.classList.add('active');
                const bad = [...slide.querySelectorAll('*')].filter(element => {
                    if (element.closest('.lesson-table-scroll, .overflow-x-auto, .table-responsive')) return false;
                    const style = getComputedStyle(element);
                    const rect = element.getBoundingClientRect();
                    if (style.display === 'none' || style.visibility === 'hidden' || rect.width < 1 || rect.height < 1) return false;
                    return rect.left < -1 || rect.right > innerWidth + 1;
                }).slice(0, 4).map(element => ({ tag: element.tagName, className: String(element.className || '').slice(0, 70) }));
                return { index, title: slide.dataset.title, bad };
            });
            slides.forEach(item => item.classList.remove('active'));
            slides[0]?.classList.add('active');
            return {
                title: document.title,
                slideCount: slides.length,
                content: isContent,
                conversation: isConversation,
                verbSlides: document.querySelectorAll('.slide[data-title="Verb List"]').length,
                helpingSlides: document.querySelectorAll('.slide[data-title="Helping You"]').length,
                guidedSlides: document.querySelectorAll('.slide[data-title="Guided Conversation"]').length,
                baseWithTo: [...document.querySelectorAll('.verb-table tbody td:first-child')].every(cell => /^to\\s+/i.test(cell.textContent.trim())),
                repeatedGuidance: [...document.querySelectorAll('.guided-question-card')].some(card => /Responda em inglês|pergunta complementar/.test(card.textContent)),
                practiceCards: document.querySelectorAll('#practice-questions .activity-card').length,
                activationPromptGrids: document.querySelectorAll('#practice-questions .activation-prompt-grid').length,
                portugueseCues: [...document.querySelectorAll('#practice-questions .activation-portuguese p')].filter(cue => cue.textContent.trim().length > 0).length,
                visibleActivationAnswers: [...document.querySelectorAll('#practice-questions .a2-answer')].filter(answer => !answer.classList.contains('hidden')).length,
                visibleDrillAnswers: [...document.querySelectorAll('#oral-translation-1 .a2-answer, #oral-translation-2 .a2-answer')].filter(answer => !answer.classList.contains('hidden')).length,
                conversationPath: document.querySelectorAll('.conversation-path-grid').length,
                conversationStages: document.querySelectorAll('.conversation-stage-note').length,
                conversationScripts: document.querySelectorAll('[data-a2-listening-script]').length,
                hiddenConversationScripts: [...document.querySelectorAll('[data-a2-listening-script]')].filter(script => script.hidden && script.classList.contains('hidden')).length,
                conversationDocuments: document.querySelectorAll('.conversation-document').length,
                conversationTools: document.querySelectorAll('.conversation-tool-card').length,
                conversationRecycle: document.querySelectorAll('.conversation-recycle-card').length,
                conversationRoles: document.querySelectorAll('.conversation-role-card').length,
                conversationQuestions: document.querySelectorAll('.conversation-guided-grid .guided-question-card').length,
                conversationFollowUps: document.querySelectorAll('.conversation-followups span').length,
                conversationFinals: document.querySelectorAll('.conversation-final-card').length,
                genericReviewHeadings: [...document.querySelectorAll('.slide > h2')].filter(heading => /Grammar in Context|Activation: use the language|Oral Retrieval in Context|common corrections/i.test(heading.textContent)).length,
                overflow: slideMetrics.filter(item => item.bad.length)
            };
        })()`);

        for (const viewport of [{ width: 1440, height: 1000, label: 'desktop' }, { width: 390, height: 844, label: 'mobile' }]) {
            for (let lesson = 1; lesson <= 32; lesson += 1) {
                await open(lesson, viewport.width, viewport.height);
                const result = await inspect();
                const label = `L${String(lesson).padStart(2, '0')} ${viewport.label}`;
                if (result.content && result.slideCount < 14) failures.push(`${label}: only ${result.slideCount} content slides.`);
                if (!result.content && result.slideCount < 10) failures.push(`${label}: only ${result.slideCount} review slides.`);
                if (result.content && (result.verbSlides !== 1 || result.helpingSlides !== 1 || result.guidedSlides !== 1)) failures.push(`${label}: premium sequence ${JSON.stringify(result)}.`);
                if (result.content && !result.baseWithTo) failures.push(`${label}: a base verb is missing to.`);
                if (result.content && (result.activationPromptGrids !== 8 || result.portugueseCues !== result.activationPromptGrids)) failures.push(`${label}: Activation is missing Portuguese targets ${JSON.stringify(result)}.`);
                if (result.content && result.visibleActivationAnswers) failures.push(`${label}: ${result.visibleActivationAnswers} Activation answers start visible.`);
                if (result.conversation && result.slideCount !== 10) failures.push(`${label}: expected 10 conversation slides, received ${result.slideCount}.`);
                if (result.conversation && (result.conversationPath !== 1 || result.conversationStages !== 3 || result.conversationScripts !== 1 || result.hiddenConversationScripts !== 1)) failures.push(`${label}: listening sequence is incomplete ${JSON.stringify(result)}.`);
                if (result.conversation && (result.conversationDocuments < 2 || result.conversationTools < 4 || result.conversationRecycle < 6)) failures.push(`${label}: input or lexical recycling is incomplete ${JSON.stringify(result)}.`);
                if (result.conversation && (result.conversationRoles !== 2 || result.conversationQuestions < 6 || result.conversationFollowUps < 4 || result.conversationFinals !== 1)) failures.push(`${label}: interaction sequence is incomplete ${JSON.stringify(result)}.`);
                if (result.conversation && result.genericReviewHeadings) failures.push(`${label}: generic review headings remain visible.`);
                if (result.repeatedGuidance) failures.push(`${label}: Let's Talk repeats instructions inside cards.`);
                if (result.visibleDrillAnswers) failures.push(`${label}: ${result.visibleDrillAnswers} drill answers start visible.`);
                if (result.overflow.length) failures.push(`${label}: horizontal overflow ${JSON.stringify(result.overflow.slice(0, 2))}.`);
            }
        }

        await open(1, 1440, 1000);
        const interactions = await evaluate(`(() => {
            const card = document.querySelector('#flashcards-container .flashcard');
            card?.click();
            const reveal = document.querySelector('#oral-translation-1 [data-a2-reveal]');
            reveal?.click();
            const answer = reveal?.closest('.activity-card')?.querySelector('.a2-answer');
            const activationReveal = document.querySelector('#practice-questions [data-a2-reveal]');
            activationReveal?.click();
            const activationAnswer = activationReveal?.closest('.activity-card')?.querySelector('.a2-answer');
            return {
                flipped: card?.classList.contains('flipped'),
                revealed: answer && !answer.classList.contains('hidden') && answer.textContent.trim().length > 0,
                activationRevealed: activationAnswer && !activationAnswer.classList.contains('hidden') && activationAnswer.textContent.trim().length > 0
            };
        })()`);
        if (!interactions.flipped || !interactions.revealed || !interactions.activationRevealed) failures.push(`L01 interactions failed: ${JSON.stringify(interactions)}.`);

        await open(2, 1440, 1000);
        const conversationInteractions = await evaluate(`(() => {
            const listeningToggle = document.querySelector('[data-a2-listening-toggle]');
            listeningToggle?.click();
            const script = document.querySelector('[data-a2-listening-script]');
            const readingReveal = document.querySelector('#practice-questions [data-a2-reveal]');
            readingReveal?.click();
            const readingAnswer = readingReveal?.closest('.activity-card')?.querySelector('.a2-answer');
            const finalReveal = document.querySelector('#oral-translation-2 [data-a2-reveal]');
            finalReveal?.click();
            const finalAnswer = finalReveal?.closest('.conversation-model-answer')?.querySelector('.a2-answer');
            return {
                scriptRevealed: script && !script.hidden && !script.classList.contains('hidden'),
                listeningExpanded: listeningToggle?.getAttribute('aria-expanded') === 'true',
                readingAnswerRevealed: readingAnswer && !readingAnswer.classList.contains('hidden') && readingAnswer.textContent.trim().length > 0,
                finalModelRevealed: finalAnswer && !finalAnswer.classList.contains('hidden') && finalAnswer.textContent.trim().length > 0
            };
        })()`);
        if (!conversationInteractions.scriptRevealed || !conversationInteractions.listeningExpanded || !conversationInteractions.readingAnswerRevealed || !conversationInteractions.finalModelRevealed) failures.push(`L02 conversation interactions failed: ${JSON.stringify(conversationInteractions)}.`);

        await open(2, 1440, 1000);
        const conversationNavigation = await evaluate(`(() => {
            const states = [];
            const next = document.getElementById('next-btn');
            for (let index = 0; index < 12; index += 1) {
                states.push({
                    title: document.querySelector('.slide.active')?.dataset.title || '',
                    counter: document.getElementById('slide-counter')?.textContent.trim() || '',
                    nextVisible: getComputedStyle(next).display !== 'none'
                });
                if (getComputedStyle(next).display === 'none') break;
                next.click();
            }
            return states;
        })()`);
        const navigationTitles = conversationNavigation.map(item => item.title);
        const conversationOpeningOrder = ['Intro & Dialogue', 'Lexical Recycling', 'Quick Start', 'Activity 1 · Listen & Practice'];
        if (conversationNavigation.length !== 10 || conversationNavigation[0]?.counter !== '1 / 10' || conversationNavigation.at(-1)?.counter !== '10 / 10' || navigationTitles.includes('Music Moment') || navigationTitles.at(-1) !== 'Homework · Keep Communicating' || !conversationOpeningOrder.every((title, index) => navigationTitles[index] === title)) failures.push(`L02 navigation failed: ${JSON.stringify(conversationNavigation)}.`);
    } finally {
        client?.socket.close();
        chrome.kill();
        await delay(250);
        try {
            fs.rmSync(profilePath, { recursive: true, force: true });
        } catch {
            // A terminating Chrome process can briefly keep a profile file locked on Windows.
        }
    }

    if (failures.length) {
        console.error(`A2-V3 browser audit failed with ${failures.length} issue(s):`);
        failures.forEach(item => console.error(`- ${item}`));
        process.exitCode = 1;
    } else {
        console.log('A2-V3 browser audit passed: 32 lessons, 15 communicative sequences, desktop/mobile layout, hidden answers and interactions.');
    }
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
