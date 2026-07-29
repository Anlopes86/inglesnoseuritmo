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

async function auditViewport(width, height) {
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
    await client.request('Page.navigate', {
        url: pathToFileURL(path.join(root, 'a1-v3', 'licao-05.html')).href
    });
    let slideCount = 0;
    for (let attempt = 0; attempt < 30; attempt += 1) {
        await wait(400);
        const readiness = await client.request('Runtime.evaluate', {
            expression: "document.querySelectorAll('.slide').length",
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
            signatures.forEach((signature, first) => {
                signatures.slice(first + 1).forEach((candidate, offset) => {
                    if (signature && signature === candidate) duplicates.push([first + 1, first + offset + 2]);
                });
            });
            const roundSlides = slides.filter(slide => slide.querySelector('.v3-speaking-round'));
            const phases = roundSlides.map(slide => {
                const round = slide.querySelector('.v3-speaking-round');
                return ['attempt', 'twist', 'retry'].find(phase => round.classList.contains('v3-speaking-round-' + phase)) || '';
            });
            const overflow = [];
            roundSlides.forEach(slide => {
                slides.forEach(candidate => candidate.classList.toggle('active', candidate === slide));
                if (document.documentElement.scrollWidth > innerWidth + 1) {
                    overflow.push({
                        title: slide.dataset.title,
                        scrollWidth: document.documentElement.scrollWidth,
                        viewportWidth: innerWidth
                    });
                }
            });
            return JSON.stringify({
                slideCount: slides.length,
                duplicates,
                phases,
                overflow,
                href: location.href,
                readyState: document.readyState,
                bodyClass: document.body.className,
                bodyText: normalize(document.body.textContent).slice(0, 240),
                slideSixTitle: slides[5]?.dataset.title || '',
                slideTenTitle: slides[9]?.dataset.title || '',
                slideSixEqualsTen: signatures[5] === signatures[9]
            });
        })()`,
        returnByValue: true
    });
    client.close();

    const result = JSON.parse(evaluation.result.value);
    if (result.slideCount !== 12) {
        throw new Error(`${width}×${height}: expected 12 slides, found ${result.slideCount}; state=${JSON.stringify({
            href: result.href,
            readyState: result.readyState,
            bodyClass: result.bodyClass,
            bodyText: result.bodyText,
            observedBeforeEvaluation: slideCount
        })}.`);
    }
    if (result.duplicates.length) throw new Error(`${width}×${height}: duplicate slides ${JSON.stringify(result.duplicates)}.`);
    if (JSON.stringify(result.phases) !== JSON.stringify(['attempt', 'twist', 'retry'])) {
        throw new Error(`${width}×${height}: invalid communication phases ${JSON.stringify(result.phases)}.`);
    }
    if (result.slideSixEqualsTen) throw new Error(`${width}×${height}: slides 6 and 10 are still equal.`);
    if (result.overflow.length) throw new Error(`${width}×${height}: review round overflow ${JSON.stringify(result.overflow)}.`);
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
    await client.request('Page.navigate', {
        url: pathToFileURL(path.join(root, 'a1-v3', `licao-${padded}.html`)).href
    });
    let slideCount = 0;
    for (let attempt = 0; attempt < 30; attempt += 1) {
        await wait(400);
        const readiness = await client.request('Runtime.evaluate', {
            expression: "document.querySelectorAll('.slide').length",
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
                practiceItems: document.querySelector('.slide[data-title="Prática"]')?.querySelectorAll('.activity-card').length || 0,
                grammarRows: document.querySelector('.slide[data-title="Gramática"]')?.querySelectorAll('tbody tr').length || 0,
                dialogueCards: document.querySelectorAll('.dialogue-card').length,
                activityCards: document.querySelectorAll('.activity-card').length,
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
    if (result.slideCount !== 12) throw new Error(`${label}: expected 12 slides, found ${result.slideCount}.`);
    if (result.flashcards < 6) throw new Error(`${label}: vocabulary load is too small (${result.flashcards}).`);
    if (result.practiceItems < 6) throw new Error(`${label}: controlled-practice load is too small (${result.practiceItems}).`);
    if (result.grammarRows < 2 || result.grammarRows > 4) throw new Error(`${label}: grammar focus has ${result.grammarRows} rows.`);
    if (result.dialogueCards < 3) throw new Error(`${label}: dialogue practice is too small (${result.dialogueCards}).`);
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
        await auditContentLesson(1, 1440, 1000, 'Hello! I Am, You Are');
        await auditContentLesson(1, 390, 844, 'Hello! I Am, You Are');
        await auditContentLesson(2, 1440, 1000, 'He Is, She Is: Countries');
        await auditContentLesson(2, 390, 844, 'He Is, She Is: Countries');
        await auditContentLesson(14, 1440, 1000, 'Do You...? Does He...?');
        await auditContentLesson(14, 390, 844, 'Do You...? Does He...?');
        await auditContentLesson(24, 1440, 1000, 'At the Café: Some and Any');
        await auditContentLesson(24, 390, 844, 'At the Café: Some and Any');
        const desktop = await auditViewport(1440, 1000);
        const mobile = await auditViewport(390, 844);
        console.log(`A1-V3 gradual cadence browser audit passed: lessons 1 and 2 plus lesson 5 review rendered at desktop and mobile; ${desktop.slideCount} review slides are distinct and slides 6 (${desktop.slideSixTitle}) and 10 (${desktop.slideTenTitle}) differ.`);
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
