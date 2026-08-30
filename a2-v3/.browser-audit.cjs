const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');

function resolveBrowserExecutable() {
    if (process.env.CHROME_PATH) {
        const explicit = path.resolve(process.env.CHROME_PATH);
        if (!fs.existsSync(explicit)) throw new Error(`CHROME_PATH does not exist: ${explicit}`);
        return { path: explicit, source: 'CHROME_PATH' };
    }

    for (const packageName of ['playwright', 'playwright-core']) {
        try {
            const executable = require(packageName).chromium.executablePath();
            if (executable && fs.existsSync(executable)) return { path: executable, source: `${packageName} Chromium` };
        } catch (error) {
            if (error?.code !== 'MODULE_NOT_FOUND') throw error;
        }
    }

    const candidates = process.platform === 'win32'
        ? [
            path.join(process.env.PROGRAMFILES || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
            path.join(process.env['PROGRAMFILES(X86)'] || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
            path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
            path.join(process.env.PROGRAMFILES || '', 'Microsoft', 'Edge', 'Application', 'msedge.exe')
        ]
        : process.platform === 'darwin'
            ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge']
            : ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/microsoft-edge'];
    const fallback = candidates.find(candidate => candidate && fs.existsSync(candidate));
    if (fallback) return { path: fallback, source: 'documented system fallback' };

    throw new Error('No Chromium executable found. Set CHROME_PATH or run “npx playwright install chromium” after installing dependencies.');
}

const browserExecutable = resolveBrowserExecutable();
const chromePath = browserExecutable.path;
const profilePath = path.join(os.tmpdir(), `a2-v3-premium-audit-${process.pid}`);
const auditRoot = path.resolve(__dirname);
const artifactPath = path.resolve(auditRoot, 'browser-audit-artifacts');
if (path.dirname(artifactPath) !== auditRoot) throw new Error('Browser audit artifact path escaped the A2 directory.');
const port = 12000 + (process.pid % 10000);
const failures = [];
const browserEvents = [];
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

function connect(url, onEvent = () => {}) {
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
            if (!message.id) {
                onEvent(message);
                return;
            }
            if (!pending.has(message.id)) return;
            const command = pending.get(message.id);
            pending.delete(message.id);
            if (message.error) command.reject(new Error(message.error.message));
            else command.resolve(message.result);
        });
        socket.addEventListener('error', reject);
    });
}

async function main() {
    fs.rmSync(artifactPath, { recursive: true, force: true });
    const chrome = spawn(chromePath, [
        '--headless=new',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--no-sandbox',
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
        client = await connect((await target()).webSocketDebuggerUrl, message => {
            if (message.method === 'Runtime.exceptionThrown') {
                browserEvents.push(`Uncaught exception: ${message.params?.exceptionDetails?.text || 'unknown runtime exception'}`);
            }
            if (message.method === 'Runtime.consoleAPICalled' && message.params?.type === 'error') {
                const copy = (message.params.args || []).map(arg => arg.value ?? arg.description ?? '').join(' ').trim();
                browserEvents.push(`console.error: ${copy || 'unknown console error'}`);
            }
        });
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
                if (await evaluate(`document.readyState === 'complete' && document.body.classList.contains('a2-content-ready') && document.querySelectorAll('.slide').length > 0`)) return;
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
                const clipped = [...slide.querySelectorAll('h1, h2, h3, h4, p, li, button, label')].filter(element => {
                    if (element.closest('.lesson-table-scroll, .overflow-x-auto, .table-responsive, .flashcard-face')) return false;
                    const style = getComputedStyle(element);
                    const rect = element.getBoundingClientRect();
                    if (!element.textContent.trim() || style.display === 'none' || style.visibility === 'hidden' || rect.width < 1 || rect.height < 1) return false;
                    return (['hidden', 'clip'].includes(style.overflowX) && element.scrollWidth > element.clientWidth + 2)
                        || (['hidden', 'clip'].includes(style.overflowY) && element.scrollHeight > element.clientHeight + 2);
                }).slice(0, 4).map(element => ({ tag: element.tagName, text: element.textContent.trim().slice(0, 60) }));
                const badButtons = [...slide.querySelectorAll('button, [role="button"]')].filter(element => {
                    if (element.closest('.lesson-table-scroll, .overflow-x-auto, .table-responsive')) return false;
                    const style = getComputedStyle(element);
                    const rect = element.getBoundingClientRect();
                    if (style.display === 'none' || style.visibility === 'hidden' || rect.width < 1 || rect.height < 1) return false;
                    return rect.left < -1 || rect.right > innerWidth + 1 || rect.width < 24 || rect.height < 24;
                }).slice(0, 4).map(element => ({ text: element.textContent.trim().slice(0, 45), width: Math.round(element.getBoundingClientRect().width), height: Math.round(element.getBoundingClientRect().height) }));
                return { index, title: slide.dataset.title, bad, clipped, badButtons };
            });
            slides.forEach(item => item.classList.remove('active'));
            slides[0]?.classList.add('active');
            const manifest = window.V3Curriculum?.getLesson('a2-v3', lessonNumber);
            const publishedMusic = manifest ? window.MusicCatalogV3?.getForCurriculumId(manifest.id) : null;
            const slideTitles = slides.map(slide => slide.dataset.title || '');
            const footerButtons = ['prev-btn', 'next-btn'].map(id => document.getElementById(id)).filter(Boolean);
            return {
                title: document.title,
                titleMatchesManifest: Boolean(manifest?.title && document.title.includes(manifest.title) && document.querySelector('header h1')?.textContent.includes(manifest.title)),
                slideCount: slides.length,
                content: isContent,
                conversation: isConversation,
                consolidation: lessonNumber >= 31,
                verbSlides: document.querySelectorAll('.slide[data-title="Verb List"]').length,
                helpingSlides: document.querySelectorAll('.slide[data-title="Helping You"]').length,
                guidedSlides: document.querySelectorAll('.slide[data-title="Guided Conversation"]').length,
                routeIndicators: document.querySelectorAll('[data-a2-lesson-route] [data-route-tier]').length,
                homeworkOptions: document.querySelectorAll('[data-a2-homework-option]').length,
                homeworkPrompt: document.querySelector('[data-a2-homework-prompt]')?.textContent.trim() || '',
                homeworkSlides: slideTitles.filter(title => /^Homework/.test(title)).length,
                musicShells: document.querySelectorAll('[data-music-cloze-v3]').length,
                musicPrompts: publishedMusic?.pedagogy?.transferPrompts?.length || 0,
                musicBeforeHomework: !publishedMusic || (slideTitles.indexOf('Music Moment') >= 0 && slideTitles.indexOf('Music Moment') === slideTitles.findIndex(title => /^Homework/.test(title)) - 1),
                consolidationSource: lessonNumber >= 31 ? window.A2V3Consolidations?.get(lessonNumber)?.source || '' : '',
                consolidationListening: lessonNumber >= 31 ? document.querySelector('#reading-text h3')?.textContent.trim() || '' : '',
                footerNavigationAccessible: footerButtons.length === 2 && footerButtons.every(button => {
                    const rect = button.getBoundingClientRect();
                    return rect.left >= -1 && rect.right <= innerWidth + 1 && rect.bottom <= innerHeight + 1 && rect.width >= 44 && rect.height >= 32;
                }),
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
                overflow: slideMetrics.filter(item => item.bad.length),
                clippedText: slideMetrics.filter(item => item.clipped.length),
                inaccessibleButtons: slideMetrics.filter(item => item.badButtons.length)
            };
        })()`);

        async function captureFailure(label, slideIndex = 0) {
            fs.mkdirSync(artifactPath, { recursive: true });
            await evaluate(`(() => { const slides = [...document.querySelectorAll('.slide')]; slides.forEach(item => item.classList.remove('active')); slides[${Number(slideIndex) || 0}]?.classList.add('active'); window.scrollTo(0, 0); })()`);
            await delay(250);
            const screenshot = await client.send('Page.captureScreenshot', { format: 'png', fromSurface: true });
            fs.writeFileSync(path.join(artifactPath, `${label.replace(/[^a-z0-9-]+/gi, '-').toLowerCase()}.png`), Buffer.from(screenshot.data, 'base64'));
        }

        for (const viewport of [{ width: 1440, height: 1000, label: 'desktop' }, { width: 390, height: 844, label: 'mobile' }]) {
            for (let lesson = 1; lesson <= 32; lesson += 1) {
                await open(lesson, viewport.width, viewport.height);
                const result = await inspect();
                const label = `L${String(lesson).padStart(2, '0')} ${viewport.label}`;
                const failuresBeforeLesson = failures.length;
                if (result.content && result.slideCount < 14) failures.push(`${label}: only ${result.slideCount} content slides.`);
                if (!result.content && result.slideCount < 10) failures.push(`${label}: only ${result.slideCount} review slides.`);
                if (!result.titleMatchesManifest) failures.push(`${label}: document/header title does not match the curriculum manifest.`);
                if (!result.footerNavigationAccessible) failures.push(`${label}: previous/next navigation is outside the viewport or below the minimum target size.`);
                if (result.content && (result.verbSlides !== 1 || result.helpingSlides !== 1 || result.guidedSlides !== 1)) failures.push(`${label}: premium sequence ${JSON.stringify(result)}.`);
                if (result.content && result.routeIndicators !== 3) failures.push(`${label}: Core/Extended/Extra route indicator is incomplete.`);
                if (result.content && (result.homeworkOptions !== 3 || result.homeworkPrompt !== 'Choose one option.')) failures.push(`${label}: lexical homework must show exactly three choices and “Choose one option.”`);
                if (result.content && (result.musicShells !== 1 || result.musicPrompts !== 3 || !result.musicBeforeHomework)) failures.push(`${label}: music cloze, three post-song prompts, or placement before homework is incorrect.`);
                if (!result.content && result.musicShells !== 0) failures.push(`${label}: non-lexical lesson contains a music cloze.`);
                if (result.homeworkSlides !== 1) failures.push(`${label}: expected one accessible homework slide; found ${result.homeworkSlides}.`);
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
                if (result.clippedText.length) failures.push(`${label}: clipped text ${JSON.stringify(result.clippedText.slice(0, 2))}.`);
                if (result.inaccessibleButtons.length) failures.push(`${label}: inaccessible buttons ${JSON.stringify(result.inaccessibleButtons.slice(0, 2))}.`);
                if (result.consolidation && result.consolidationSource !== 'current-v3-consolidation') failures.push(`${label}: consolidation source is not current and explicit.`);
                if (lesson === 31 && result.consolidationListening !== 'A Busy Day in Town') failures.push(`${label}: consolidation 31 listening is not “A Busy Day in Town”.`);
                if (lesson === 32 && result.consolidationListening !== 'A Practical Plan for Progress') failures.push(`${label}: consolidation 32 listening is not current.`);
                if (failures.length > failuresBeforeLesson) {
                    const failedSlide = result.overflow[0]?.index ?? result.clippedText[0]?.index ?? result.inaccessibleButtons[0]?.index ?? 0;
                    await captureFailure(label, failedSlide);
                }
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

        const musicVisual = await evaluate(`(() => {
            const lesson = window.V3Curriculum.getLesson('a2-v3', 1);
            const entry = window.MusicCatalogV3.getForCurriculumId(lesson.id);
            const root = document.querySelector('[data-music-cloze-v3]');
            if (!root || !entry) return { ready: false };
            const slides = [...document.querySelectorAll('.slide')];
            const musicSlide = root.closest('.slide');
            slides.forEach(slide => slide.classList.remove('active'));
            musicSlide?.classList.add('active');
            const gaps = Array.from({ length: 5 }, (_, index) => ({ id: 'visual-gap-' + (index + 1), gapPosition: 'gap-' + (index + 1) }));
            const segments = gaps.flatMap((gap, index) => [{ type: 'text', text: index ? ' sample ' : 'Sample ' }, { type: 'gap', gapPosition: gap.gapPosition }]);
            const adapter = { load: async () => ({ state: 'ready' }), submit: async () => ({ state: 'submitted', payload: { items: [] } }), reveal: () => 'word' };
            const activity = new window.MusicClozeV3.MusicClozeActivity(root, entry, { adapter });
            activity.renderReady({ lines: [{ segments }], gaps, transferPrompts: entry.pedagogy.transferPrompts, transferPrompt: entry.pedagogy.transferPrompt });
            const transfer = root.querySelector('[data-music-transfer]');
            transfer?.classList.remove('hidden');
            const rect = transfer?.getBoundingClientRect();
            const rootRect = root.getBoundingClientRect();
            const promptItems = [...root.querySelectorAll('.music-cloze-transfer-list li')];
            return {
                ready: root.dataset.musicState === 'ready',
                gaps: root.querySelectorAll('[data-music-gap]').length,
                prompts: promptItems.length,
                numbered: [...root.querySelectorAll('.music-cloze-transfer-list li > span')].map(item => item.textContent.trim()).join(','),
                finish: Boolean(root.querySelector('[data-music-finish]')),
                visible: Boolean(rect && rect.width > 0 && rect.height > 0),
                minPromptFont: Math.min(...promptItems.map(item => parseFloat(getComputedStyle(item).fontSize) || 0)),
                overflow: Boolean(rect && (rect.left < -1 || rect.right > innerWidth + 1 || rootRect.left < -1 || rootRect.right > innerWidth + 1 || promptItems.some(item => item.scrollWidth > item.clientWidth + 2))),
                slideIndex: slides.indexOf(musicSlide)
            };
        })()`);
        if (!musicVisual.ready || musicVisual.gaps !== 5 || musicVisual.prompts !== 3 || musicVisual.numbered !== '1,2,3' || !musicVisual.finish || !musicVisual.visible || musicVisual.minPromptFont < 16 || musicVisual.overflow) {
            failures.push(`L01 music cloze visual contract failed: ${JSON.stringify(musicVisual)}.`);
            await captureFailure('L01-music-cloze', musicVisual.slideIndex || 0);
        }

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

        for (const lesson of [31, 32]) {
            await open(lesson, 1440, 1000);
            const consolidationInteraction = await evaluate(`(() => {
                const toggle = document.querySelector('[data-a2-listening-toggle]');
                toggle?.click();
                const script = document.querySelector('[data-a2-listening-script]');
                const reveal = document.querySelector('#reading-questions [data-a2-reveal]');
                reveal?.click();
                const answer = reveal?.closest('.activity-card')?.querySelector('.a2-answer');
                const expectedSpeakingItems = window.A2V3Consolidations?.get(${lesson})?.reviewSpeaking?.length || 0;
                return {
                    source: window.A2V3Consolidations?.get(${lesson})?.source || '',
                    scriptRevealed: Boolean(script && !script.hidden && !script.classList.contains('hidden')),
                    listeningQuestions: document.querySelectorAll('#reading-questions .activity-card').length,
                    answerRevealed: Boolean(answer && !answer.classList.contains('hidden') && answer.textContent.trim()),
                    expectedSpeakingItems,
                    speakingItems: document.querySelectorAll('#oral-translation-2 .activity-card').length,
                    music: document.querySelectorAll('[data-music-cloze-v3]').length
                };
            })()`);
            if (consolidationInteraction.source !== 'current-v3-consolidation' || !consolidationInteraction.scriptRevealed || consolidationInteraction.listeningQuestions !== 4 || !consolidationInteraction.answerRevealed || consolidationInteraction.expectedSpeakingItems < 3 || consolidationInteraction.speakingItems !== consolidationInteraction.expectedSpeakingItems || consolidationInteraction.music !== 0) {
                failures.push(`L${lesson} consolidation interaction failed: ${JSON.stringify(consolidationInteraction)}.`);
                await captureFailure(`L${lesson}-consolidation`, 0);
            }
        }

        if (browserEvents.length) failures.push(`Browser console/runtime errors: ${[...new Set(browserEvents)].slice(0, 8).join(' | ')}`);
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
        if (fs.existsSync(artifactPath)) console.error(`Failure screenshots: ${artifactPath}`);
        process.exitCode = 1;
    } else {
        console.log(`A2-V3 browser audit passed with ${browserExecutable.source}: 32 lessons, manifest titles, lexical routes/homeworks/music, 15 communicative sequences, two current consolidations, desktop/mobile layout, hidden answers and interactions.`);
    }
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
