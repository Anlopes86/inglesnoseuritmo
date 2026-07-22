const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');

const root = path.resolve(__dirname, '..');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9343;
const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'inr-v3-review-ui-'));

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
    for (let attempt = 0; attempt < 50; attempt += 1) {
        try {
            const response = await fetch(`http://127.0.0.1:${port}/json/version`);
            if (response.ok) return;
        } catch (_) {}
        await wait(150);
    }
    throw new Error('Chrome DevTools did not become available.');
}

async function createTarget() {
    const response = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' });
    const target = await response.json();
    const client = new CdpClient(target.webSocketDebuggerUrl);
    await client.open();
    return client;
}

function luminance(rgb) {
    const channels = String(rgb).match(/[\d.]+/g)?.slice(0, 3).map(Number) || [0, 0, 0];
    const linear = channels.map(value => {
        const normalized = value / 255;
        return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
    });
    return (0.2126 * linear[0]) + (0.7152 * linear[1]) + (0.0722 * linear[2]);
}

function contrast(first, second) {
    const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
    return (values[0] + 0.05) / (values[1] + 0.05);
}

async function render(spec) {
    const client = await createTarget();
    await client.request('Page.enable');
    await client.request('Runtime.enable');
    await client.request('Network.enable');
    await client.request('Network.setBlockedURLs', { urls: ['*gstatic.com/firebasejs/*'] });
    await client.request('Emulation.setDeviceMetricsOverride', {
        width: spec.width,
        height: spec.height,
        deviceScaleFactor: 1,
        mobile: spec.width < 600,
        screenWidth: spec.width,
        screenHeight: spec.height
    });
    await client.request('Page.addScriptToEvaluateOnNewDocument', { source: "try { localStorage.setItem('insr-theme', 'dark'); } catch (_) {}" });
    await client.request('Page.navigate', { url: pathToFileURL(path.join(root, spec.file)).href });
    await wait(8500);

    const result = await client.request('Runtime.evaluate', {
        expression: `(() => {
            const target = document.querySelector(${JSON.stringify(spec.selector)});
            if (!target) return JSON.stringify({ error: 'target slide not found', href: location.href, readyState: document.readyState, slideCount: document.querySelectorAll('.slide').length, reviewGames: document.querySelectorAll('.v3-review-game').length, bodyClass: document.body.className });
            document.querySelectorAll('.slide').forEach(slide => slide.classList.toggle('active', slide === target));
            target.scrollIntoView({ block: 'start' });
            ${spec.action || ''}
            const back = document.querySelector('.b1-vocab-back');
            const next = document.getElementById('next-btn');
            const selectedMatch = target.querySelector('.v3-match-option.is-selected');
            const unselectedMatch = target.querySelector('.v3-match-option:not(.is-selected):not(.is-matched)');
            return JSON.stringify({
                title: target.dataset.title || target.querySelector('h2')?.textContent || '',
                memoryMatched: target.querySelectorAll('.v3-memory-card.is-matched').length,
                matchLinked: target.querySelectorAll('.v3-match-option.is-matched').length,
                hangmanMask: target.querySelector('[data-v3-hangman-mask]')?.textContent || '',
                scrollWidth: document.documentElement.scrollWidth,
                viewportWidth: innerWidth,
                backBackground: back ? getComputedStyle(back).backgroundColor : null,
                backColor: back ? getComputedStyle(back).color : null,
                nextBackground: next ? getComputedStyle(next).backgroundColor : null,
                nextColor: next ? getComputedStyle(next).color : null,
                selectedMatchCount: target.querySelectorAll('.v3-match-option.is-selected').length,
                selectedMatchBackground: selectedMatch ? getComputedStyle(selectedMatch).backgroundColor : null,
                selectedMatchColor: selectedMatch ? getComputedStyle(selectedMatch).color : null,
                selectedMatchBadge: selectedMatch ? getComputedStyle(selectedMatch, '::after').content : null,
                unselectedMatchBackground: unselectedMatch ? getComputedStyle(unselectedMatch).backgroundColor : null
            });
        })()`,
        returnByValue: true
    });
    const metrics = JSON.parse(result.result.value);
    if (metrics.error) throw new Error(`${spec.name}: ${metrics.error}`);
    if (metrics.scrollWidth > metrics.viewportWidth + 1) throw new Error(`${spec.name}: horizontal overflow`);
    if (spec.expect === 'memory' && metrics.memoryMatched !== 2) throw new Error(`${spec.name}: memory interaction failed`);
    if (spec.expect === 'matching' && metrics.matchLinked !== 2) throw new Error(`${spec.name}: matching interaction failed`);
    if (spec.expect === 'selection') {
        if (metrics.selectedMatchCount !== 1) throw new Error(`${spec.name}: selected match state is missing`);
        if (metrics.selectedMatchBackground === metrics.unselectedMatchBackground) throw new Error(`${spec.name}: selected match background is not visually distinct`);
        if (!/Selecionado/i.test(metrics.selectedMatchBadge || '')) throw new Error(`${spec.name}: selected match label is missing`);
        const selectedContrast = contrast(metrics.selectedMatchBackground, metrics.selectedMatchColor);
        if (selectedContrast < 4.5) throw new Error(`${spec.name}: selected match contrast is below 4.5:1`);
        metrics.selectedContrast = selectedContrast.toFixed(2);
    }
    if (spec.expect === 'hangman' && !/[A-Za-z]/.test(metrics.hangmanMask)) throw new Error(`${spec.name}: hangman reveal failed`);
    if (spec.expect === 'contrast') {
        const backContrast = contrast(metrics.backBackground, metrics.backColor);
        const buttonContrast = contrast(metrics.nextBackground, metrics.nextColor);
        if (backContrast < 4.5 || buttonContrast < 4.5) throw new Error(`${spec.name}: contrast below 4.5:1`);
        metrics.backContrast = backContrast.toFixed(2);
        metrics.buttonContrast = buttonContrast.toFixed(2);
    }

    await wait(500);
    const screenshot = await client.request('Page.captureScreenshot', { format: 'png', fromSurface: true });
    fs.writeFileSync(path.join(root, `.audit-${spec.name}.png`), Buffer.from(screenshot.data, 'base64'));
    client.close();
    console.log(`${spec.name}: ${JSON.stringify(metrics)}`);
}

async function main() {
    const chrome = spawn(chromePath, [
        '--headless=new', '--no-sandbox', '--in-process-gpu', '--disable-gpu', '--disable-gpu-compositing', '--disable-features=Vulkan,Graphite', '--use-angle=swiftshader', '--allow-file-access-from-files', '--no-first-run',
        `--remote-debugging-port=${port}`, `--user-data-dir=${profileDir}`, 'about:blank'
    ], { windowsHide: true, stdio: 'ignore' });
    try {
        await waitForChrome();
        await render({ name: 'a1-review-game', file: 'a1-v3/licao-32.html', selector: '.slide:has([data-v3-memory-board])', width: 1440, height: 1000, expect: 'memory', action: `const cards = target.querySelectorAll('[data-v3-memory-card]'); const first = cards[0]; const pair = [...cards].find(card => card !== first && card.dataset.pairId === first.dataset.pairId); first.click(); pair.click();` });
        await render({ name: 'a2-review-game-mobile', file: 'a2-v3/licao-16.html', selector: '.slide:has([data-v3-match-board])', width: 390, height: 844, expect: 'matching', action: `const left = target.querySelector('[data-v3-match-option][data-side="left"]'); const right = target.querySelector('[data-v3-match-option][data-side="right"][data-pair-id="' + left.dataset.pairId + '"]'); left.click(); right.click();` });
        await render({ name: 'a2-match-selected-dark', file: 'a2-v3/licao-16.html', selector: '.slide:has([data-v3-match-board])', width: 390, height: 844, expect: 'selection', action: `target.querySelector('[data-v3-match-option][data-side="left"]').click();` });
        await render({ name: 'b1-review-game-dark', file: 'b1-v3/licao-16.html', selector: '.slide:has([data-v3-hangman])', width: 1440, height: 1000, expect: 'hangman', action: `target.querySelector('[data-v3-hangman-action="letter"]').click();` });
        await render({ name: 'b1-contrast-dark', file: 'b1-v3/licao-01.html', selector: '.slide[data-slide-type="vocabulary"]', width: 1440, height: 1000, expect: 'contrast', action: `target.querySelector('.b1-vocab-card')?.click();` });
        await render({ name: 'a1-review-grammar', file: 'a1-v3/licao-08.html', selector: '.slide[data-title="Grammar Lab 1"]', width: 1440, height: 1000, expect: 'layout' });
        await render({ name: 'a2-review-grammar', file: 'a2-v3/licao-16.html', selector: '.slide[data-title="Grammar Lab II"]', width: 1440, height: 1000, expect: 'layout' });
        await render({ name: 'a2-horoscope-reading-mobile', file: 'a2-v3/licao-04.html', selector: '.slide:has(#reading-text)', width: 390, height: 844, expect: 'layout' });
        await render({ name: 'b1-review-grammar-dark', file: 'b1-v3/licao-16.html', selector: '.slide.review-grammar-slide', width: 1440, height: 1000, expect: 'layout' });
        await render({ name: 'a1-music-flow', file: 'a1-v3/licao-01.html', selector: '.slide[data-title="Música"]', width: 1440, height: 1000, expect: 'layout' });
        await render({ name: 'a2-music-flow-mobile', file: 'a2-v3/licao-01.html', selector: '.slide[data-title="Music Moment"]', width: 390, height: 844, expect: 'layout' });
        await render({ name: 'b1-music-flow-dark', file: 'b1-v3/licao-01.html', selector: '.slide[data-slide-type="music"]', width: 1440, height: 1000, expect: 'layout' });
    } finally {
        await new Promise(resolve => {
            chrome.once('exit', resolve);
            chrome.kill();
            setTimeout(resolve, 1500);
        });
        fs.rmSync(profileDir, { recursive: true, force: true, maxRetries: 4, retryDelay: 200 });
    }
}

main().catch(error => {
    console.error(error.stack || error.message);
    process.exitCode = 1;
});
