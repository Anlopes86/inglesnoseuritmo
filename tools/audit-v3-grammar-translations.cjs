const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');

const root = path.resolve(__dirname, '..');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9363;
const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'inr-v3-grammar-translations-'));
const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

global.window = {};
require(path.join(root, 'js', 'v3-curriculum.js'));
const curriculum = window.V3Curriculum;
const requestedModule = String(process.env.V3_GRAMMAR_MODULE || '').trim().toLowerCase();
const moduleIds = requestedModule ? [requestedModule] : Object.keys(curriculum.modules);
const mobileViewport = process.env.V3_GRAMMAR_MOBILE === '1';
const viewport = mobileViewport ? { width: 390, height: 844, mobile: true } : { width: 1440, height: 1000, mobile: false };

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

async function waitUntilRendered(client, advanced, expectedUrl) {
    const selector = advanced ? '#advanced-root .advanced-slide' : '.slide';
    for (let attempt = 0; attempt < 300; attempt += 1) {
        const state = await evaluate(client, `(() => {
            if (location.href !== ${JSON.stringify(expectedUrl)} || document.readyState !== 'complete') return false;
            if (!document.querySelector(${JSON.stringify(selector)})) return false;
            const translations = [...document.querySelectorAll('.v3-grammar-example-translation')];
            return translations.every(node => node.dataset.v3TranslationReady || node.dataset.v3TranslationMissing);
        })()`);
        if (state) return;
        await wait(100);
    }
    throw new Error(`Timed out waiting for grammar translations at ${expectedUrl}.`);
}

async function main() {
    const chrome = spawn(chromePath, [
        '--headless=new', '--no-sandbox', '--no-first-run', '--disable-component-update', '--disable-background-networking',
        '--in-process-gpu', '--disable-gpu', '--disable-gpu-compositing', '--disable-features=Vulkan,Graphite',
        '--use-angle=swiftshader', '--allow-file-access-from-files', `--remote-debugging-port=${port}`,
        `--user-data-dir=${profileDir}`, `--window-size=${viewport.width},${viewport.height}`, 'about:blank'
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
        await client.request('Emulation.setDeviceMetricsOverride', { ...viewport, deviceScaleFactor: 1 });

        const missing = new Map();
        const presentationIssues = [];
        let examples = 0;
        let pages = 0;
        for (const moduleId of moduleIds) {
            const advanced = moduleId === 'b2-v3' || moduleId === 'c1-v3';
            for (const lesson of curriculum.getModule(moduleId)) {
                const file = path.join(root, moduleId, `licao-${String(lesson.number).padStart(2, '0')}.html`);
                const url = pathToFileURL(file).href;
                await client.request('Page.navigate', { url });
                await waitUntilRendered(client, advanced, url);
                const result = await evaluate(client, `(() => {
                    const nodes = [...document.querySelectorAll('.v3-grammar-example-translation')];
                    return {
                        total: nodes.length,
                        missing: nodes.filter(node => !node.textContent.trim()).map(node => node.dataset.v3Translate || '').filter(Boolean),
                        presentation: nodes.map(node => {
                            const english = node.closest('.v3-grammar-example')?.querySelector('.v3-grammar-example-en');
                            const translationStyle = getComputedStyle(node);
                            const englishStyle = english ? getComputedStyle(english) : null;
                            return {
                                text: node.textContent.trim(),
                                italic: translationStyle.fontStyle === 'italic',
                                smaller: englishStyle ? Number.parseFloat(translationStyle.fontSize) < Number.parseFloat(englishStyle.fontSize) : false
                            };
                        }).filter(item => !item.italic || !item.smaller),
                        overflow: document.documentElement.scrollWidth > window.innerWidth + 1
                    };
                })()`);
                examples += result.total;
                pages += 1;
                result.missing.forEach(example => {
                    if (!missing.has(example)) missing.set(example, []);
                    missing.get(example).push(`${moduleId} L${String(lesson.number).padStart(2, '0')}`);
                });
                if (result.presentation.length) presentationIssues.push(`${moduleId} L${String(lesson.number).padStart(2, '0')}: estilo incorreto em ${result.presentation.length} tradução(ões)`);
                if (result.overflow) presentationIssues.push(`${moduleId} L${String(lesson.number).padStart(2, '0')}: overflow horizontal em ${viewport.width}×${viewport.height}`);
            }
        }

        if (missing.size || presentationIssues.length) {
            console.error(`V3 grammar translation audit failed across ${pages} pages at ${viewport.width}×${viewport.height}.`);
            [...missing.entries()].forEach(([example, locations]) => console.error(`- ${JSON.stringify(example)} :: ${locations.join(', ')}`));
            presentationIssues.forEach(issue => console.error(`- ${issue}`));
            process.exitCode = 1;
        } else {
            console.log(`V3 grammar translation audit passed: ${examples} translated examples across ${pages} pages at ${viewport.width}×${viewport.height}.`);
        }
    } finally {
        if (client) client.close();
        chrome.kill();
        await wait(400);
        const resolved = path.resolve(profileDir);
        const tempPrefix = path.resolve(os.tmpdir()) + path.sep;
        if (resolved.startsWith(tempPrefix)) {
            try {
                fs.rmSync(resolved, { recursive: true, force: true, maxRetries: 4, retryDelay: 150 });
            } catch (_) {
                // A lingering Chrome helper can keep a cache file locked briefly on Windows.
            }
        }
    }
}

main().catch(error => {
    console.error(error.stack || error.message);
    process.exitCode = 1;
});
