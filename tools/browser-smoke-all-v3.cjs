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
const requestedLessons = String(process.env.V3_SMOKE_LESSONS || '').trim();
const mobileViewport = process.env.V3_SMOKE_MOBILE === '1';
const viewport = mobileViewport ? { width: 390, height: 844, mobile: true } : { width: 1440, height: 1000, mobile: false };
const moduleIds = requestedModule ? [requestedModule] : Object.keys(curriculum.modules);
if (requestedModule && !curriculum.modules[requestedModule]) {
    throw new Error(`Unknown V3_SMOKE_MODULE: ${requestedModule}`);
}
function lessonNumberFilter(specification) {
    if (!specification) return null;
    const selected = new Set();
    specification.split(',').map(part => part.trim()).filter(Boolean).forEach(part => {
        const range = part.match(/^(\d+)\s*-\s*(\d+)$/);
        if (range) {
            const start = Number(range[1]);
            const end = Number(range[2]);
            for (let number = Math.min(start, end); number <= Math.max(start, end); number += 1) selected.add(number);
            return;
        }
        const number = Number(part);
        if (Number.isInteger(number)) selected.add(number);
    });
    return selected.size ? selected : null;
}
const selectedLessons = lessonNumberFilter(requestedLessons);
const lessonsFor = moduleId => curriculum.getModule(moduleId).filter(lesson => !selectedLessons || selectedLessons.has(lesson.number));
const expectedRenderCount = moduleIds.reduce((sum, moduleId) => sum + lessonsFor(moduleId).length, 0);

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
    for (let attempt = 0; attempt < 80; attempt += 1) {
        try {
            const ready = await evaluate(client, `location.href === ${JSON.stringify(expectedUrl)} && document.readyState === 'complete' && document.querySelectorAll(${JSON.stringify(selector)}).length > 0`);
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
    let state = null;
    try {
        state = await evaluate(client, `JSON.stringify({ href: location.href, readyState: document.readyState, slides: document.querySelectorAll(${JSON.stringify(selector)}).length, bodyClass: document.body?.className || '', title: document.title })`);
    } catch (_) {}
    throw new Error(`Timed out waiting for lesson hydration${state ? `: ${state}` : '.'}`);
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

        const errors = [];
        let rendered = 0;
        for (const moduleId of moduleIds) {
            const advanced = moduleId === 'b2-v3' || moduleId === 'c1-v3';
            for (const lesson of lessonsFor(moduleId)) {
                const file = path.join(root, moduleId, `licao-${String(lesson.number).padStart(2, '0')}.html`);
                const url = pathToFileURL(file).href;
                try {
                    await client.request('Page.navigate', { url });
                    await waitUntilRendered(client, advanced, url);
                    const metrics = JSON.parse(await evaluate(client, `(() => {
                        document.documentElement.dataset.theme = 'light';
                        document.body.dataset.theme = 'light';
                        const advanced = ${advanced};
                        const slides = [...document.querySelectorAll(advanced ? '.advanced-slide' : '.slide')];
                        const minuteAttribute = advanced ? 'data-minutes' : 'data-v3-minutes';
                        const minutes = slides.reduce((sum, slide) => sum + Number(slide.getAttribute(minuteAttribute) || 0), 0);
                        const bodyText = document.body.textContent;
                        const encodingIssue = bodyText.match(/\u00c3[\u0080-\u00bf]|\u00c2[\u0080-\u00bf]|\u00e2[\u0080-\u00bf]{2}|\uFFFD/);
                        const parseColor = (value) => {
                            const numbers = String(value || '').match(/[\d.]+/g)?.map(Number) || [];
                            if (String(value).startsWith('color(srgb') && numbers.length >= 3) {
                                return [numbers[0] * 255, numbers[1] * 255, numbers[2] * 255, numbers[3] ?? 1];
                            }
                            if (String(value).startsWith('rgb') && numbers.length >= 3) {
                                return [numbers[0], numbers[1], numbers[2], numbers[3] ?? 1];
                            }
                            return null;
                        };
                        const luminance = ([red, green, blue]) => {
                            const channels = [red, green, blue].map(channel => {
                                const value = channel / 255;
                                return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
                            });
                            return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
                        };
                        const contrast = (first, second) => {
                            const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
                            return (values[0] + 0.05) / (values[1] + 0.05);
                        };
                        const effectiveBackground = (element) => {
                            for (let current = element; current; current = current.parentElement) {
                                const background = parseColor(getComputedStyle(current).backgroundColor);
                                if (background && background[3] >= 0.98) return background;
                            }
                            return [255, 255, 255, 1];
                        };
                        const contrastTargets = [...document.querySelectorAll([
                            '.v3-speaking-support span', '.v3-speaking-evidence',
                            '.v3-grammar-example-en', '.v3-grammar-example-translation',
                            '.alphabet-tile strong', '.alphabet-tile span', '.alphabet-tile small',
                            '.number-tile strong', '.number-tile span',
                            '.number-chip strong', '.number-chip span',
                            '.hundred-card strong', '.hundred-card span',
                            '.number-spelling-alerts strong', '.number-spelling-alerts span'
                        ].join(','))];
                        const contrastIssue = contrastTargets.map((element) => {
                            const style = getComputedStyle(element);
                            const foreground = parseColor(style.color);
                            const background = effectiveBackground(element);
                            if (!foreground || !background) return null;
                            const ratio = contrast(foreground, background);
                            const fontSize = Number.parseFloat(style.fontSize);
                            const fontWeight = Number.parseInt(style.fontWeight, 10) || 400;
                            const largeText = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
                            const minimum = largeText ? 3 : 4.5;
                            return ratio + 0.01 < minimum
                                ? { text: element.textContent.trim().slice(0, 60), ratio: ratio.toFixed(2), minimum }
                                : null;
                        }).find(Boolean);
                        const originalStyles = slides.map(slide => slide.getAttribute('style'));
                        let maxScrollWidth = document.documentElement.scrollWidth;
                        slides.forEach((currentSlide) => {
                            slides.forEach(slide => slide.style.setProperty('display', 'none', 'important'));
                            currentSlide.style.setProperty('display', 'block', 'important');
                            maxScrollWidth = Math.max(maxScrollWidth, document.documentElement.scrollWidth);
                        });
                        slides.forEach((slide, index) => {
                            if (originalStyles[index] === null) slide.removeAttribute('style');
                            else slide.setAttribute('style', originalStyles[index]);
                        });
                        const idCounts = [...document.querySelectorAll('[id]')].reduce((counts, element) => {
                            counts[element.id] = (counts[element.id] || 0) + 1;
                            return counts;
                        }, {});
                        const invalidMemoryBoards = [...document.querySelectorAll('[data-v3-memory-board]')]
                            .map(board => board.querySelectorAll('[data-v3-memory-card]').length)
                            .filter(cardCount => cardCount !== 10);
                        const predictableMatchingBoards = [...document.querySelectorAll('[data-v3-match-board]')].map(board => {
                            const leftIds = [...board.querySelectorAll('[data-v3-match-option][data-side="left"]')].map(option => option.dataset.pairId);
                            const rightIds = [...board.querySelectorAll('[data-v3-match-option][data-side="right"]')].map(option => option.dataset.pairId);
                            const sameRow = rightIds.some((id, index) => id === leftIds[index]);
                            const reverseOrder = rightIds.every((id, index) => id === [...leftIds].reverse()[index]);
                            return sameRow || reverseOrder ? { leftIds, rightIds, sameRow, reverseOrder } : null;
                        }).filter(Boolean);
                        const listeningScript = document.querySelector('[data-a2-listening-script]');
                        const listeningToggle = document.querySelector('[data-a2-listening-toggle]');
                        const listeningInitiallyHidden = listeningScript ? listeningScript.hidden && listeningScript.classList.contains('hidden') : false;
                        let listeningToggleWorks = false;
                        if (listeningScript && listeningToggle) {
                            listeningToggle.click();
                            const revealed = !listeningScript.hidden && !listeningScript.classList.contains('hidden') && listeningToggle.getAttribute('aria-expanded') === 'true';
                            listeningToggle.click();
                            const hiddenAgain = listeningScript.hidden && listeningScript.classList.contains('hidden') && listeningToggle.getAttribute('aria-expanded') === 'false';
                            listeningToggleWorks = revealed && hiddenAgain;
                        }
                        return JSON.stringify({
                            title: document.title,
                            slides: slides.length,
                            minutes,
                            scrollWidth: maxScrollWidth,
                            viewportWidth: innerWidth,
                            bodyText,
                            clippedCardFaces: [...document.querySelectorAll('.flashcard-front, .flashcard-back')]
                                .filter(node => node.scrollHeight > node.clientHeight + 1).length,
                            duplicateIds: Object.entries(idCounts).filter(([, count]) => count > 1).map(([id]) => id),
                            brokenRevealTargets: [...document.querySelectorAll('[data-reveal-target]')]
                                .filter(button => !document.getElementById(button.dataset.revealTarget || '')).length,
                            invalidMemoryBoards,
                            predictableMatchingBoards,
                            listeningScriptCount: document.querySelectorAll('[data-a2-listening-script]').length,
                            listeningQuestionCount: document.querySelectorAll('#reading-questions .activity-card').length,
                            listeningInitiallyHidden,
                            listeningToggleWorks,
                            encodingIssue: encodingIssue
                                ? [...encodingIssue[0]].map(character => 'U+' + character.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')).join(' ')
                                : '',
                            contrastIssue,
                            error: /lição não encontrada|lesson not found|conteúdo da lição não encontrado/i.test(document.body.innerText),
                            review: advanced ? ${lesson.type !== 'content'} : document.body.dataset.v3Review === 'true'
                        });
                    })()`));
                    if (metrics.error) throw new Error('rendered an error state');
                    if (metrics.slides < 8) throw new Error(`only ${metrics.slides} rendered stages`);
                    if (metrics.minutes !== 60) throw new Error(`session total is ${metrics.minutes}, expected 60`);
                    if (metrics.scrollWidth > metrics.viewportWidth + 1) throw new Error(`horizontal overflow ${metrics.scrollWidth}/${metrics.viewportWidth}`);
                    if (metrics.clippedCardFaces) throw new Error(`${metrics.clippedCardFaces} flashcard face(s) clip their content`);
                    if (metrics.duplicateIds.length) throw new Error(`duplicate DOM ids: ${metrics.duplicateIds.join(', ')}`);
                    if (metrics.brokenRevealTargets) throw new Error(`${metrics.brokenRevealTargets} reveal control(s) have no target`);
                    if (metrics.invalidMemoryBoards.length) throw new Error(`memory board card count must be 10, found: ${metrics.invalidMemoryBoards.join(', ')}`);
                    if (metrics.predictableMatchingBoards.length) throw new Error(`matching board keeps a predictable row or reverse-order pattern: ${JSON.stringify(metrics.predictableMatchingBoards)}`);
                    if (moduleId === 'a2-v3' && lesson.type === 'review') {
                        if (metrics.listeningScriptCount !== 1 || !metrics.listeningInitiallyHidden) throw new Error('teacher listening script is not hidden by default');
                        if (metrics.listeningQuestionCount < 5) throw new Error(`only ${metrics.listeningQuestionCount} visible listening questions`);
                        if (!metrics.listeningToggleWorks) throw new Error('listening script show/hide control failed');
                    }
                    if (metrics.encodingIssue) throw new Error(`suspicious text encoding sequence ${metrics.encodingIssue}`);
                    if (metrics.contrastIssue) throw new Error(`light-theme contrast ${metrics.contrastIssue.ratio}:1 is below ${metrics.contrastIssue.minimum}:1 for “${metrics.contrastIssue.text}”`);
                    const expectedReview = lesson.type !== 'content';
                    if (metrics.review !== expectedReview) throw new Error(`review classification is ${metrics.review}, expected ${expectedReview}`);
                    const requiredStages = lesson.type === 'content'
                        ? ['Vocabulary Expansion', 'Helping You', 'Dialog Sample', 'Context Reading', 'Let’s Talk']
                        : lesson.type === 'review'
                            ? moduleId === 'a2-v3'
                                ? ['Helping You', 'Listening: listen without reading', 'Speaking: answer, develop and try again']
                                : ['Helping You', 'Context Reading', 'Let’s Talk']
                            : [];
                    const missingStages = requiredStages.filter(stage => !metrics.bodyText.includes(stage));
                    if (missingStages.length) throw new Error(`missing pedagogical stages: ${missingStages.join(', ')}`);
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
            console.log(`V3 browser smoke passed: ${rendered}/${expectedRenderCount} ${mobileViewport ? 'mobile' : 'desktop'} pages hydrated, totaled 60 minutes, had valid text encoding and no horizontal overflow.`);
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
        if (resolved.startsWith(tempPrefix)) {
            for (let attempt = 0; attempt < 6; attempt += 1) {
                try {
                    fs.rmSync(resolved, { recursive: true, force: true, maxRetries: 4, retryDelay: 250 });
                    break;
                } catch (error) {
                    if (attempt === 5) console.warn(`Temporary Chrome profile could not be removed: ${error.message}`);
                    else await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
        }
    }
}

main().catch(error => {
    console.error(error.stack || error.message);
    process.exitCode = 1;
});
