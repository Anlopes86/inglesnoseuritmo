const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');

const root = path.resolve(__dirname, '..');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9351;
const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'inr-a1-review-unique-'));
const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const expectedFocusGroups = { 5: 4, 10: 4, 15: 4, 20: 4, 25: 4, 30: 4, 31: 12, 32: 12 };
const expectedCommunicativeActivities = { 5: 3, 10: 3, 15: 4, 20: 4, 25: 4, 30: 4, 31: 4, 32: 4 };

class CdpClient {
    constructor(url) {
        this.nextId = 1;
        this.pending = new Map();
        this.socket = new WebSocket(url);
    }

    async open() {
        await new Promise((resolve, reject) => {
            this.socket.addEventListener('open', resolve, { once: true });
            this.socket.addEventListener('error', reject, { once: true });
        });
        this.socket.addEventListener('message', event => {
            const payload = JSON.parse(event.data);
            if (!payload.id || !this.pending.has(payload.id)) return;
            const handlers = this.pending.get(payload.id);
            this.pending.delete(payload.id);
            if (payload.error) handlers.reject(new Error(payload.error.message));
            else handlers.resolve(payload.result);
        });
    }

    request(method, params = {}) {
        const id = this.nextId++;
        return new Promise((resolve, reject) => {
            this.pending.set(id, { resolve, reject });
            this.socket.send(JSON.stringify({ id, method, params }));
        });
    }

    close() {
        this.socket.close();
    }
}

async function waitForChrome() {
    for (let attempt = 0; attempt < 50; attempt += 1) {
        try {
            const response = await fetch(`http://127.0.0.1:${port}/json/version`);
            if (response.ok) return;
        } catch (_) {}
        await wait(150);
    }
    throw new Error('Chrome DevTools did not become available.');
}

async function auditViewport(lessonNumber, width, height) {
    const response = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' });
    const target = await response.json();
    const client = new CdpClient(target.webSocketDebuggerUrl);
    await client.open();
    await client.request('Page.enable');
    await client.request('Runtime.enable');
    await client.request('Network.enable');
    await client.request('Network.setBlockedURLs', { urls: ['*gstatic.com/firebasejs/*'] });
    await client.request('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: 1,
        mobile: width < 600,
        screenWidth: width,
        screenHeight: height
    });
    const padded = String(lessonNumber).padStart(2, '0');
    const lessonUrl = pathToFileURL(path.join(root, 'a1-v3', 'licao-' + padded + '.html')).href;
    await client.request('Page.navigate', { url: lessonUrl });
    let slideCount = 0;
    for (let attempt = 0; attempt < 80; attempt += 1) {
        await wait(400);
        const readiness = await client.request('Runtime.evaluate', {
            expression: `location.href === ${JSON.stringify(lessonUrl)} && document.readyState === 'complete' ? document.querySelectorAll('.slide').length : 0`,
            returnByValue: true
        });
        slideCount = readiness.result.value || 0;
        if (slideCount) break;
    }

    const evaluation = await client.request('Runtime.evaluate', {
        expression: `(async () => {
            const normalize = value => String(value || '').replace(/\\s+/g, ' ').trim();
            const slides = [...document.querySelectorAll('.slide')];
            const titles = slides.map(slide => slide.dataset.title || '');
            const signatures = slides.map(slide => normalize(slide.textContent));
            const duplicates = [];
            signatures.forEach((signature, first) => {
                signatures.slice(first + 1).forEach((candidate, offset) => {
                    if (signature && signature === candidate) duplicates.push([first + 1, first + offset + 2]);
                });
            });
            const roundSlides = slides.filter(slide => slide.querySelector('.v3-speaking-round-attempt, .v3-speaking-round-questions, .v3-speaking-round-condition, .v3-speaking-round-final'));
            const phases = roundSlides.map(slide => {
                const round = slide.querySelector('.v3-speaking-round');
                return ['attempt', 'questions', 'condition', 'final'].find(phase => round.classList.contains('v3-speaking-round-' + phase)) || '';
            });
            const overflow = [];
            slides.forEach(slide => {
                slides.forEach(candidate => candidate.classList.toggle('active', candidate === slide));
                if (document.documentElement.scrollWidth > innerWidth + 1) {
                    overflow.push({
                        title: slide.dataset.title,
                        scrollWidth: document.documentElement.scrollWidth,
                        viewportWidth: innerWidth
                    });
                }
            });
            const firstSlideText = signatures[0] || '';
            const multiplayerText = /\b(?:Dois alunos|dois colegas|Aluno A|Aluno B|Role A|Role B|Information gap|não mostrem|fichas|papéis diferentes|em dupla|a turma)\b/i.test(normalize(document.body.textContent));
            const memoryBoard = document.querySelector('[data-v3-memory-board]');
            let memoryFlow = null;
            if (memoryBoard) {
                const cards = [...memoryBoard.querySelectorAll('[data-v3-memory-card]')];
                const first = cards[0];
                const second = cards.find(card => card !== first && card.dataset.pairId !== first.dataset.pairId);
                const third = cards.find(card => card !== first && card !== second);
                first.click();
                second.click();
                const openAfterMismatch = [first, second].every(card => card.classList.contains('is-flipped'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                const openAfterDelay = [first, second].every(card => card.classList.contains('is-flipped'));
                third.click();
                memoryFlow = {
                    cardCount: cards.length,
                    openAfterMismatch,
                    openAfterDelay,
                    previousClosedOnNewCard: [first, second].every(card => !card.classList.contains('is-flipped')),
                    newCardOpened: third.classList.contains('is-flipped')
                };
            }
            return JSON.stringify({
                slideCount: slides.length,
                titles,
                duplicates,
                phases,
                overflow,
                firstSlideWords: firstSlideText.split(/\\s+/).filter(Boolean).length,
                firstSlideHasLongCopy: /Rota da aula|Contrato comunicativo|Foco do professor|Evidência CEFR|Objetivos da aula/i.test(firstSlideText),
                multiplayerText,
                memoryFlow,
                href: location.href,
                readyState: document.readyState,
                bodyClass: document.body.className,
                bodyText: normalize(document.body.textContent).slice(0, 240)
            });
        })()`,
        returnByValue: true,
        awaitPromise: true
    });
    client.close();

    const result = JSON.parse(evaluation.result.value);
    const label = `A1 review L${padded} ${width}×${height}`;
    const focusCount = expectedFocusGroups[lessonNumber];
    const expectedPhases = lessonNumber >= 31 ? ['attempt', 'questions', 'condition', 'final'] : ['attempt', 'questions', 'final'];
    const expectedSlideCount = 4 + expectedPhases.length + (focusCount * 2) + expectedCommunicativeActivities[lessonNumber];
    if (result.slideCount !== expectedSlideCount) {
        throw new Error(`${label}: expected ${expectedSlideCount} slides, found ${result.slideCount}; state=${JSON.stringify({
            href: result.href,
            readyState: result.readyState,
            bodyClass: result.bodyClass,
            bodyText: result.bodyText,
            observedBeforeEvaluation: slideCount
        })}.`);
    }
    if (result.duplicates.length) throw new Error(`${label}: duplicate slides ${JSON.stringify(result.duplicates)}.`);
    if (JSON.stringify(result.phases) !== JSON.stringify(expectedPhases)) {
        throw new Error(`${label}: invalid communication phases ${JSON.stringify(result.phases)}.`);
    }
    for (let index = 0; index < focusCount; index += 1) {
        const grammarTitle = result.titles[1 + (index * 2)];
        const practiceTitle = result.titles[2 + (index * 2)];
        if (!/^Revisão gramatical/.test(grammarTitle) || !/^Atividades:/.test(practiceTitle)) {
            throw new Error(`${label}: grammar/practice sequence is invalid at focus ${index + 1}: ${grammarTitle} -> ${practiceTitle}.`);
        }
    }
    if (result.firstSlideWords > 18 || result.firstSlideHasLongCopy) throw new Error(`${label}: first slide still contains instructional copy.`);
    if (result.multiplayerText) throw new Error(`${label}: a multiplayer or physical-class instruction is visible.`);
    if (lessonNumber === 5 && (!result.memoryFlow || Object.values(result.memoryFlow).some(value => !value))) {
        throw new Error(`${label}: memory flow is invalid: ${JSON.stringify(result.memoryFlow)}.`);
    }
    if (result.memoryFlow && result.memoryFlow.cardCount !== 10) {
        throw new Error(`${label}: memory game must contain exactly 10 cards, found ${result.memoryFlow.cardCount}.`);
    }
    if (result.overflow.length) throw new Error(`${label}: review overflow ${JSON.stringify(result.overflow)}.`);
    return result;
}

async function auditContentLesson(number, width, height, expectedTitle) {
    const response = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' });
    const target = await response.json();
    const client = new CdpClient(target.webSocketDebuggerUrl);
    await client.open();
    await client.request('Page.enable');
    await client.request('Runtime.enable');
    await client.request('Network.enable');
    await client.request('Network.setBlockedURLs', { urls: ['*gstatic.com/firebasejs/*'] });
    await client.request('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: 1,
        mobile: width < 600,
        screenWidth: width,
        screenHeight: height
    });
    const padded = String(number).padStart(2, '0');
    const lessonUrl = pathToFileURL(path.join(root, 'a1-v3', `licao-${padded}.html`)).href;
    await client.request('Page.navigate', { url: lessonUrl });
    let slideCount = 0;
    for (let attempt = 0; attempt < 80; attempt += 1) {
        await wait(400);
        const readiness = await client.request('Runtime.evaluate', {
            expression: `location.href === ${JSON.stringify(lessonUrl)} && document.readyState === 'complete' ? document.querySelectorAll('.slide').length : 0`,
            returnByValue: true
        });
        slideCount = readiness.result.value || 0;
        if (slideCount) break;
    }

    const evaluation = await client.request('Runtime.evaluate', {
        expression: `(() => {
            const normalize = value => String(value || '').replace(/\\s+/g, ' ').trim();
            const slides = [...document.querySelectorAll('.slide')];
            const signatures = slides.map(slide => normalize(slide.textContent));
            const duplicates = [];
            signatures.forEach((signature, first) => signatures.slice(first + 1).forEach((candidate, offset) => {
                if (signature && signature === candidate) duplicates.push([first + 1, first + offset + 2]);
            }));
            const overflow = [];
            slides.forEach((slide, index) => {
                slides.forEach(candidate => candidate.classList.toggle('active', candidate === slide));
                if (document.documentElement.scrollWidth > innerWidth + 1) {
                    overflow.push({ slide: index + 1, title: slide.dataset.title, scrollWidth: document.documentElement.scrollWidth, viewportWidth: innerWidth });
                }
            });
            const minutes = [...document.querySelectorAll('[data-v3-minutes]')].reduce((sum, node) => sum + Number(node.dataset.v3Minutes || 0), 0);
            return JSON.stringify({
                title: document.getElementById('lesson-title')?.textContent || '',
                slideCount: slides.length,
                flashcards: document.querySelectorAll('.flashcard').length,
                practiceItems: document.querySelectorAll('.activity-grid .activity-card').length,
                grammarRows: document.querySelector('.slide[data-title="Gramática"]')?.querySelectorAll('tbody tr').length || 0,
                dialogueCards: document.querySelectorAll('.dialogue-card').length,
                activityCards: document.querySelectorAll('.activity-grid .activity-card').length,
                activityInstructions: [...document.querySelectorAll('.activity-card .activity-hint')].filter(node => /Como fazer:/.test(node.textContent)).length,
                rigidLabels: /Prática variada:|Seis frases|Quatro diálogos|Área reservada|etapa editorial|Music Moment|Dica:|Observe:|Apoio:/i.test(document.body.textContent),
                musicInstructions: [...document.querySelectorAll('.slide[data-title="Música"]')].filter(node => /Music Time/.test(node.textContent) && /Preencha as lacunas com a palavra que você ouvir/.test(node.textContent)).length,
                clippedCardFaces: [...document.querySelectorAll('.flashcard-front, .flashcard-back')].filter(node => node.scrollHeight > node.clientHeight + 1).length,
                missingTranslations: document.querySelectorAll('[data-v3-translation-missing="true"]').length,
                minutes,
                duplicates,
                overflow
            });
        })()`,
        returnByValue: true
    });
    client.close();

    const result = JSON.parse(evaluation.result.value);
    const label = `A1 L${padded} ${width}×${height}`;
    if (!result.title.includes(expectedTitle)) throw new Error(`${label}: unexpected title "${result.title}".`);
    if (result.slideCount < 11) throw new Error(`${label}: expected a complete flexible lesson, found only ${result.slideCount} slides.`);
    if (result.flashcards < 1) throw new Error(`${label}: vocabulary is missing.`);
    if (result.practiceItems < 1) throw new Error(`${label}: controlled practice is missing.`);
    if (result.grammarRows < 1) throw new Error(`${label}: grammar focus is missing.`);
    if (result.dialogueCards < 1) throw new Error(`${label}: dialogue practice is missing.`);
    if (result.activityInstructions !== result.activityCards) throw new Error(`${label}: ${result.activityCards - result.activityInstructions} activities do not explain what to do.`);
    if (result.rigidLabels) throw new Error(`${label}: a rigid-count or editorial label is visible.`);
    if (result.musicInstructions !== 1) throw new Error(`${label}: Music Time instruction is missing or duplicated.`);
    if (result.clippedCardFaces) throw new Error(`${label}: ${result.clippedCardFaces} vocabulary card faces clip their contextual examples.`);
    if (result.missingTranslations) throw new Error(`${label}: ${result.missingTranslations} contextual translations are missing.`);
    if (result.minutes !== 60) throw new Error(`${label}: session totals ${result.minutes}, not 60 minutes.`);
    if (result.duplicates.length) throw new Error(`${label}: duplicate slides ${JSON.stringify(result.duplicates)}.`);
    if (result.overflow.length) throw new Error(`${label}: overflow ${JSON.stringify(result.overflow)}.`);
    return result;
}

async function main() {
    const chrome = spawn(chromePath, [
        '--headless=new',
        '--no-sandbox',
        '--in-process-gpu',
        '--disable-gpu',
        '--disable-gpu-compositing',
        '--disable-features=Vulkan,Graphite',
        '--use-angle=swiftshader',
        '--allow-file-access-from-files',
        '--no-first-run',
        '--disable-component-update',
        '--disable-background-networking',
        `--remote-debugging-port=${port}`,
        `--user-data-dir=${profileDir}`,
        'about:blank'
    ], { windowsHide: true, stdio: 'ignore' });

    try {
        await waitForChrome();
        await auditContentLesson(1, 1440, 1000, 'First Day of Class');
        await auditContentLesson(1, 390, 844, 'First Day of Class');
        await auditContentLesson(2, 1440, 1000, 'A Few Days Later');
        await auditContentLesson(2, 390, 844, 'A Few Days Later');
        await auditContentLesson(14, 1440, 1000, 'At the Store');
        await auditContentLesson(14, 390, 844, 'At the Store');
        await auditContentLesson(24, 1440, 1000, 'What Was Happening?');
        await auditContentLesson(24, 390, 844, 'What Was Happening?');
        const reviewNumbers = [5, 10, 15, 20, 25, 30, 31, 32];
        for (const lessonNumber of reviewNumbers) {
            await auditViewport(lessonNumber, 1440, 1000);
            await auditViewport(lessonNumber, 390, 844);
        }
        console.log(`A1-V3 browser audit passed: gradual content samples and all ${reviewNumbers.length} reviews rendered at desktop and mobile with alternating grammar/practice slides, individual speaking and no timed memory reset.`);
    } finally {
        await new Promise(resolve => {
            chrome.once('exit', resolve);
            chrome.kill();
            setTimeout(resolve, 1500);
        });
        for (let attempt = 0; attempt < 5; attempt += 1) {
            try {
                fs.rmSync(profileDir, { recursive: true, force: true, maxRetries: 4, retryDelay: 250 });
                break;
            } catch (error) {
                if (attempt === 4) throw error;
                await wait(500);
            }
        }
    }
}

main().catch(error => {
    console.error(error.stack || error.message);
    process.exitCode = 1;
});
