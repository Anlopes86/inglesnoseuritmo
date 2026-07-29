const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');

const root = path.resolve(__dirname, '..');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9351;
const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'inr-v3-all-pages-'));
const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

global.window = {};
require(path.join(root, 'js', 'v3-curriculum.js'));
const curriculum = window.V3Curriculum;
const requestedModule = String(process.env.V3_SMOKE_MODULE || '').trim().toLowerCase();
const moduleIds = requestedModule ? [requestedModule] : Object.keys(curriculum.modules);
if (requestedModule && !curriculum.modules[requestedModule]) {
    throw new Error(`Unknown V3_SMOKE_MODULE: ${requestedModule}`);
}
const expectedRenderCount = moduleIds.reduce((sum, moduleId) => sum + curriculum.getModule(moduleId).length, 0);

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
    close() { this.socket.close(); }
}

async function waitForChrome() {
    for (let attempt = 0; attempt < 80; attempt += 1) {
        try {
            const response = await fetch(`http://127.0.0.1:${port}/json`);
            if (response.ok) return response.json();
        } catch (_) {}
        await wait(150);
    }
    throw new Error('Chrome DevTools did not become available.');
}

async function evaluate(client, expression) {
    const result = await client.request('Runtime.evaluate', { expression, returnByValue: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || 'Runtime evaluation failed.');
    return result.result.value;
}

async function waitUntilRendered(client, advanced) {
    const selector = advanced ? '#advanced-root .advanced-slide' : '.slide';
    for (let attempt = 0; attempt < 80; attempt += 1) {
        try {
            const ready = await evaluate(client, `document.readyState === 'complete' && document.querySelectorAll(${JSON.stringify(selector)}).length > 0`);
            if (ready) {
                if (!advanced) {
                    const sessionReady = await evaluate(client, `document.body.classList.contains('v3-session-ready')`);
                    if (!sessionReady) {
                        await wait(80);
                        continue;
                    }
                }
                return;
            }
        } catch (_) {}
        await wait(100);
    }
    throw new Error('Timed out waiting for lesson hydration.');
}

async function main() {
    const chrome = spawn(chromePath, [
        '--headless=new', '--no-sandbox', '--no-first-run', '--disable-component-update', '--disable-background-networking',
        '--in-process-gpu', '--disable-gpu', '--disable-gpu-compositing', '--disable-features=Vulkan,Graphite',
        '--use-angle=swiftshader', '--allow-file-access-from-files', `--remote-debugging-port=${port}`,
        `--user-data-dir=${profileDir}`, '--window-size=1440,1000', 'about:blank'
    ], { windowsHide: true, stdio: 'ignore' });

    let client;
    try {
        const targets = await waitForChrome();
        const target = targets.find(item => item.type === 'page');
        if (!target) throw new Error('Chrome page target was not found.');
        client = new CdpClient(target.webSocketDebuggerUrl);
        await client.open();
        await client.request('Page.enable');
        await client.request('Runtime.enable');
        await client.request('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });

        const errors = [];
        let rendered = 0;
        for (const moduleId of moduleIds) {
            const advanced = moduleId === 'b2-v3' || moduleId === 'c1-v3';
            for (const lesson of curriculum.getModule(moduleId)) {
                const file = path.join(root, moduleId, `licao-${String(lesson.number).padStart(2, '0')}.html`);
                const url = pathToFileURL(file).href;
                try {
                    await client.request('Page.navigate', { url });
                    await waitUntilRendered(client, advanced);
                    const metrics = JSON.parse(await evaluate(client, `(() => {
                        const advanced = ${advanced};
                        const slides = [...document.querySelectorAll(advanced ? '.advanced-slide' : '.slide')];
                        const minuteAttribute = advanced ? 'data-minutes' : 'data-v3-minutes';
                        const minutes = slides.reduce((sum, slide) => sum + Number(slide.getAttribute(minuteAttribute) || 0), 0);
                        return JSON.stringify({
                            title: document.title,
                            slides: slides.length,
                            minutes,
                            scrollWidth: document.documentElement.scrollWidth,
                            viewportWidth: innerWidth,
                            error: /lição não encontrada|lesson not found|conteúdo da lição não encontrado/i.test(document.body.innerText),
                            review: advanced ? ${lesson.type !== 'content'} : document.body.dataset.v3Review === 'true'
                        });
                    })()`));
                    if (metrics.error) throw new Error('rendered an error state');
                    if (metrics.slides < 8) throw new Error(`only ${metrics.slides} rendered stages`);
                    if (metrics.minutes !== 60) throw new Error(`session total is ${metrics.minutes}, expected 60`);
                    if (metrics.scrollWidth > metrics.viewportWidth + 1) throw new Error(`horizontal overflow ${metrics.scrollWidth}/${metrics.viewportWidth}`);
                    const expectedReview = lesson.type !== 'content';
                    if (metrics.review !== expectedReview) throw new Error(`review classification is ${metrics.review}, expected ${expectedReview}`);
                    rendered += 1;
                    if (rendered % 16 === 0 || rendered === expectedRenderCount) console.log(`Rendered ${rendered}/${expectedRenderCount} pages.`);
                } catch (error) {
                    errors.push(`${moduleId} L${String(lesson.number).padStart(2, '0')}: ${error.message}`);
                }
            }
        }

        if (errors.length) {
            console.error(`All-page V3 browser smoke failed with ${errors.length} issue(s):`);
            errors.forEach(error => console.error(`- ${error}`));
            process.exitCode = 1;
        } else {
            console.log(`V3 browser smoke passed: ${rendered}/${expectedRenderCount} desktop pages hydrated, totaled 60 minutes and had no horizontal overflow.`);
        }
    } finally {
        client?.close();
        await new Promise(resolve => {
            chrome.once('exit', resolve);
            chrome.kill();
            setTimeout(resolve, 1500);
        });
        const resolved = path.resolve(profileDir);
        const tempPrefix = path.resolve(os.tmpdir()) + path.sep;
        if (resolved.startsWith(tempPrefix)) fs.rmSync(resolved, { recursive: true, force: true, maxRetries: 4, retryDelay: 200 });
    }
}

main().catch(error => {
    console.error(error.stack || error.message);
    process.exitCode = 1;
});
