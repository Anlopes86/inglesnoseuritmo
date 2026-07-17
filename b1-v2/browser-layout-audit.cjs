const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debugPort = 9337;
const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'b1-v2-layout-'));
const moduleDir = __dirname;
const errors = [];
let chrome;
let socket;
let commandId = 0;
const pending = new Map();

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function requestJson(urlPath, method = 'GET') {
    return new Promise((resolve, reject) => {
        const request = http.request({
            hostname: '127.0.0.1',
            port: debugPort,
            path: urlPath,
            method
        }, response => {
            let body = '';
            response.setEncoding('utf8');
            response.on('data', chunk => { body += chunk; });
            response.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (error) {
                    reject(error);
                }
            });
        });
        request.on('error', reject);
        request.end();
    });
}

async function waitForDebugger() {
    for (let attempt = 0; attempt < 80; attempt += 1) {
        try {
            const version = await requestJson('/json/version');
            if (version.webSocketDebuggerUrl) return;
        } catch (error) {
            // Chrome is still starting.
        }
        await delay(100);
    }
    throw new Error('Chrome DevTools endpoint did not become available.');
}

function send(method, params = {}) {
    return new Promise((resolve, reject) => {
        const id = ++commandId;
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params }));
    });
}

async function evaluate(expression) {
    const response = await send('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true
    });
    if (response.exceptionDetails) {
        throw new Error(response.exceptionDetails.text || 'Runtime evaluation failed.');
    }
    return response.result.value;
}

function connect(webSocketUrl) {
    return new Promise((resolve, reject) => {
        socket = new WebSocket(webSocketUrl);
        socket.addEventListener('open', resolve, { once: true });
        socket.addEventListener('error', reject, { once: true });
        socket.addEventListener('message', event => {
            const message = JSON.parse(event.data);
            if (!message.id || !pending.has(message.id)) return;
            const waiter = pending.get(message.id);
            pending.delete(message.id);
            if (message.error) waiter.reject(new Error(message.error.message));
            else waiter.resolve(message.result || {});
        });
    });
}

function lessonUrl(number) {
    const filename = `licao-${String(number).padStart(2, '0')}.html`;
    return pathToFileURL(path.join(moduleDir, filename)).href;
}

async function setViewport(width, height, mobile = false) {
    await send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: 1,
        mobile
    });
}

async function openLesson(number) {
    await send('Page.navigate', { url: lessonUrl(number) });
    for (let attempt = 0; attempt < 120; attempt += 1) {
        const ready = await evaluate(`(() => ({
            ready: document.readyState,
            themed: document.body && document.body.classList.contains('prepb1-theme-ready'),
            slides: document.querySelectorAll('.slide').length,
            missing: Boolean(document.querySelector('.surface h2') && document.querySelector('.surface h2').textContent.includes('não encontrada'))
        }))()`);
        if (ready.ready === 'complete' && ready.themed && ready.slides > 0 && !ready.missing) return ready.slides;
        await delay(100);
    }
    throw new Error(`Lesson ${number} did not finish rendering.`);
}

async function layoutMetrics() {
    return evaluate(`(() => {
        const active = document.querySelector('.slide.active');
        const visibleRoots = [document.querySelector('header'), active, document.querySelector('footer')].filter(Boolean);
        const nodes = visibleRoots.flatMap(root => [root, ...root.querySelectorAll('*')]);
        const ignored = element => Boolean(element.closest('.lesson-table-scroll, iframe'));
        const offenders = nodes.filter(element => {
            if (ignored(element)) return false;
            const style = getComputedStyle(element);
            if (style.display === 'none' || style.visibility === 'hidden') return false;
            const rect = element.getBoundingClientRect();
            if (!rect.width || !rect.height) return false;
            return rect.left < -1 || rect.right > innerWidth + 1;
        }).slice(0, 12).map(element => {
            const rect = element.getBoundingClientRect();
            return {
                tag: element.tagName.toLowerCase(),
                id: element.id || '',
                className: typeof element.className === 'string' ? element.className.slice(0, 90) : '',
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
                text: (element.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 70)
            };
        });
        const main = document.querySelector('main');
        const mainStyle = main ? getComputedStyle(main) : null;
        const mainRect = main ? main.getBoundingClientRect() : null;
        return {
            innerWidth,
            documentWidth: document.documentElement.scrollWidth,
            bodyWidth: document.body.scrollWidth,
            slideType: active ? active.dataset.slideType : '',
            slideTitle: active ? active.dataset.title : '',
            main: mainRect ? {
                left: Math.round(mainRect.left),
                right: Math.round(mainRect.right),
                width: Math.round(mainRect.width),
                boxSizing: mainStyle.boxSizing,
                paddingLeft: mainStyle.paddingLeft,
                paddingRight: mainStyle.paddingRight
            } : null,
            offenders
        };
    })()`);
}

async function testInteraction(slideType) {
    if (slideType === 'vocabulary') {
        return evaluate(`(() => {
            const card = document.querySelector('.slide.active .b1-vocab-card');
            if (!card) return false;
            card.click();
            return card.classList.contains('flipped') && card.getAttribute('aria-pressed') === 'true';
        })()`);
    }

    if (slideType === 'reading') {
        return evaluate(`(() => {
            const buttons = [...document.querySelectorAll('.slide.active .reading-question-list .reveal-btn')];
            if (buttons.length !== 4 || buttons.some(button => !document.getElementById(button.dataset.target))) return false;
            const target = document.getElementById(buttons[0].dataset.target);
            buttons[0].click();
            return Boolean(!target.classList.contains('hidden') && buttons[0].getAttribute('aria-expanded') === 'true');
        })()`);
    }

    if (['practice', 'translation', 'teacherListening', 'music'].includes(slideType)) {
        return evaluate(`(() => {
            const button = document.querySelector('.slide.active .reveal-btn');
            if (!button) return ${slideType === 'teacherListening' ? 'true' : 'false'};
            const target = document.getElementById(button.dataset.target);
            button.click();
            return Boolean(target && !target.classList.contains('hidden') && button.getAttribute('aria-expanded') === 'true');
        })()`);
    }

    if (slideType === 'speaking') {
        return evaluate(`(() => {
            const prompts = [...document.querySelectorAll('.slide.active .speaking-prompt')];
            const focus = [...document.querySelectorAll('.slide.active .teacher-focus-chip')];
            return prompts.length >= 3
                && prompts.every(item => item.textContent.trim().length > 0)
                && focus.some(item => item.textContent.trim().length > 0);
        })()`);
    }

    return true;
}

async function captureScreenshot(filename) {
    const result = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false,
        fromSurface: true
    });
    fs.writeFileSync(path.join(moduleDir, filename), Buffer.from(result.data, 'base64'));
}

async function auditLesson(number, viewport) {
    await setViewport(viewport.width, viewport.height, viewport.mobile);
    const total = await openLesson(number);
    const title = await evaluate('document.getElementById("lesson-title").textContent');
    if (!title.includes(`Lição ${number}:`)) errors.push(`L${number} ${viewport.label}: incorrect page title.`);

    for (let index = 0; index < total; index += 1) {
        const metrics = await layoutMetrics();
        const label = `L${String(number).padStart(2, '0')} ${viewport.label} slide ${index + 1} (${metrics.slideType})`;
        const captureKey = `${number}-${viewport.label}-${index}`;
        const captureNames = {
            '1-desktop-2': '.audit-cdp-lesson-01-grammar.png',
            '1-desktop-3': '.audit-cdp-lesson-01-practice.png',
            '1-desktop-7': '.audit-cdp-lesson-01-reading.png',
            '1-desktop-10': '.audit-cdp-lesson-01-music.png',
            '8-desktop-2': '.audit-cdp-lesson-08-station.png',
            '12-desktop-7': '.audit-cdp-lesson-12-reading.png',
            '32-desktop-7': '.audit-cdp-lesson-32-speaking.png',
            '1-mobile-0': '.audit-cdp-lesson-01-mobile.png',
            '1-mobile-7': '.audit-cdp-lesson-01-reading-mobile.png'
        };
        if (captureNames[captureKey]) {
            await delay(500);
            await captureScreenshot(captureNames[captureKey]);
        }
        if (metrics.documentWidth > metrics.innerWidth + 1 || metrics.bodyWidth > metrics.innerWidth + 1) {
            errors.push(`${label}: document overflow ${metrics.documentWidth}/${metrics.bodyWidth} > ${metrics.innerWidth}; ${JSON.stringify(metrics.main)}.`);
        }
        if (metrics.offenders.length) {
            errors.push(`${label}: elements outside viewport: ${JSON.stringify(metrics.offenders.slice(0, 3))}.`);
        }

        const interactionWorks = await testInteraction(metrics.slideType);
        if (!interactionWorks) errors.push(`${label}: primary interaction did not reveal or flip content.`);

        if (index < total - 1) {
            const advanced = await evaluate(`(() => {
                const before = document.querySelector('.slide.active');
                document.getElementById('next-btn').click();
                return before !== document.querySelector('.slide.active');
            })()`);
            if (!advanced) {
                errors.push(`${label}: next button did not advance.`);
                break;
            }
        }
    }

    const ending = await evaluate(`(() => ({
        finishVisible: !document.getElementById('finish-lesson-btn').classList.contains('hidden'),
        nextHidden: document.getElementById('next-btn').classList.contains('hidden'),
        backHref: document.querySelector('header a').getAttribute('href')
    }))()`);
    if (!ending.finishVisible || !ending.nextHidden) errors.push(`L${number} ${viewport.label}: final navigation state is incorrect.`);
    if (ending.backHref !== 'b1-v2.html') errors.push(`L${number} ${viewport.label}: back link is ${ending.backHref}.`);
}

async function main() {
    chrome = spawn(chromePath, [
        '--headless=new',
        '--disable-gpu',
        '--allow-file-access-from-files',
        `--remote-debugging-port=${debugPort}`,
        `--user-data-dir=${profileDir}`,
        '--no-first-run',
        '--no-default-browser-check',
        'about:blank'
    ], { stdio: 'ignore', windowsHide: true });

    await waitForDebugger();
    const pages = await requestJson('/json/list');
    const page = pages.find(item => item.type === 'page');
    if (!page) throw new Error('No Chrome page target was available.');
    await connect(page.webSocketDebuggerUrl);
    await send('Page.enable');
    await send('Runtime.enable');

    const desktop = { label: 'desktop', width: 1440, height: 1000, mobile: false };
    const mobile = { label: 'mobile', width: 390, height: 844, mobile: true };

    for (let number = 1; number <= 32; number += 1) {
        await auditLesson(number, desktop);
    }
    for (const number of [1, 8, 16, 24, 32]) {
        await auditLesson(number, mobile);
    }

    console.log(`B1-V2 browser audit: ${errors.length} layout or interaction errors.`);
    if (errors.length) console.log(errors.join('\n'));
    process.exitCode = errors.length ? 1 : 0;
}

main()
    .catch(error => {
        console.error(error.stack || error.message);
        process.exitCode = 1;
    })
    .finally(async () => {
        if (socket) socket.close();
        if (chrome && !chrome.killed) {
            chrome.kill();
            await Promise.race([
                new Promise(resolve => chrome.once('exit', resolve)),
                delay(2500)
            ]);
        }
        for (let attempt = 0; attempt < 5; attempt += 1) {
            try {
                fs.rmSync(profileDir, { recursive: true, force: true });
                break;
            } catch (error) {
                if (attempt === 4) {
                    console.warn(`Could not remove temporary Chrome profile: ${profileDir}`);
                    break;
                }
                await delay(500);
            }
        }
    });
