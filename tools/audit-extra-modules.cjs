const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');

const root = path.resolve(__dirname, '..');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profilePath = fs.mkdtempSync(path.join(os.tmpdir(), 'extra-modules-audit-'));
const port = 12000 + (process.pid % 10000);
const failures = [];
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function waitForTarget() {
    for (let attempt = 0; attempt < 100; attempt += 1) {
        try {
            const response = await fetch(`http://127.0.0.1:${port}/json/list`);
            const targets = await response.json();
            const page = targets.find((target) => target.type === 'page');
            if (page?.webSocketDebuggerUrl) return page;
        } catch {
            // Chrome is still starting.
        }
        await delay(100);
    }
    throw new Error('Chrome DevTools target did not become available.');
}

function connect(webSocketUrl) {
    return new Promise((resolve, reject) => {
        const socket = new WebSocket(webSocketUrl);
        const pending = new Map();
        let commandId = 0;

        socket.addEventListener('open', () => resolve({
            socket,
            send(method, params = {}) {
                commandId += 1;
                const id = commandId;
                socket.send(JSON.stringify({ id, method, params }));
                return new Promise((resolveCommand, rejectCommand) => {
                    const timeout = setTimeout(() => {
                        pending.delete(id);
                        rejectCommand(new Error(`Chrome DevTools command timed out: ${method}`));
                    }, 15000);
                    pending.set(id, {
                        resolve(value) { clearTimeout(timeout); resolveCommand(value); },
                        reject(error) { clearTimeout(timeout); rejectCommand(error); }
                    });
                });
            }
        }));

        socket.addEventListener('message', (event) => {
            const message = JSON.parse(event.data);
            if (!message.id || !pending.has(message.id)) return;
            const handlers = pending.get(message.id);
            pending.delete(message.id);
            if (message.error) handlers.reject(new Error(message.error.message));
            else handlers.resolve(message.result);
        });
        socket.addEventListener('error', reject);
    });
}

async function main() {
    const chrome = spawn(chromePath, [
        '--headless=new',
        '--disable-gpu',
        '--allow-file-access-from-files',
        '--no-first-run',
        '--no-default-browser-check',
        `--remote-debugging-port=${port}`,
        `--user-data-dir=${profilePath}`,
        'about:blank'
    ], { stdio: 'ignore', windowsHide: true });

    let client;
    try {
        const target = await waitForTarget();
        client = await connect(target.webSocketDebuggerUrl);
        await client.send('Page.enable');
        await client.send('Runtime.enable');

        const evaluate = async (expression) => {
            const response = await client.send('Runtime.evaluate', {
                expression,
                awaitPromise: true,
                returnByValue: true
            });
            if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
            return response.result.value;
        };

        const setViewport = (width, height) => client.send('Emulation.setDeviceMetricsOverride', {
            width,
            height,
            deviceScaleFactor: 1,
            mobile: false
        });

        const open = async (relativePath, width, height, readyExpression = 'document.readyState === "complete"') => {
            await setViewport(width, height);
            await client.send('Page.navigate', { url: pathToFileURL(path.join(root, relativePath)).href });
            for (let attempt = 0; attempt < 100; attempt += 1) {
                if (await evaluate(readyExpression)) {
                    await delay(350);
                    return;
                }
                await delay(100);
            }
            throw new Error(`${relativePath} did not become ready.`);
        };

        const measure = () => evaluate(`(() => {
            const visible = (element) => {
                const style = getComputedStyle(element);
                const rect = element.getBoundingClientRect();
                return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
            };
            const overflowers = [...document.body.querySelectorAll('*')]
                .filter((element) => {
                    if (!visible(element) || element.closest('.lesson-table-scroll, .overflow-x-auto, .table-responsive')) return false;
                    const rect = element.getBoundingClientRect();
                    return rect.left < -1 || rect.right > innerWidth + 1;
                })
                .filter((element) => {
                    const parent = element.parentElement;
                    if (!parent || parent === document.body) return true;
                    const rect = parent.getBoundingClientRect();
                    return !(rect.left < -1 || rect.right > innerWidth + 1);
                })
                .slice(0, 10)
                .map((element) => ({
                    tag: element.tagName,
                    id: element.id,
                    className: String(element.className || '').slice(0, 90),
                    left: Math.round(element.getBoundingClientRect().left),
                    right: Math.round(element.getBoundingClientRect().right)
                }));
            return {
                innerWidth,
                documentWidth: document.documentElement.scrollWidth,
                bodyWidth: document.body.scrollWidth,
                overflowers
            };
        })()`);

        const assertLayout = async (label, width) => {
            const metrics = await measure();
            if (metrics.innerWidth !== width || metrics.documentWidth > width + 1 || metrics.bodyWidth > width + 1 || metrics.overflowers.length) {
                failures.push(`${label}: ${JSON.stringify(metrics)}`);
            }
        };

        for (const viewport of [{ width: 1440, height: 1000, label: 'desktop' }, { width: 390, height: 844, label: 'mobile' }]) {
            await open('essentials/essentials.html', viewport.width, viewport.height, 'document.readyState === "complete" && document.querySelectorAll("#lessons-grid .lesson-card").length === 16');
            await assertLayout(`Essentials ${viewport.label}`, viewport.width);
            if (viewport.width === 390) {
                const searchResult = await evaluate(`(() => {
                    const input = document.getElementById('lesson-search');
                    input.value = 'passado';
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    return [...document.querySelectorAll('#lessons-grid .lesson-card')].filter(card => !card.hidden).length;
                })()`);
                if (searchResult < 2 || searchResult > 4) failures.push(`Essentials search returned ${searchResult} cards for passado.`);
            }

            await open('business/licao-08.html', viewport.width, viewport.height, 'document.readyState === "complete" && document.body.classList.contains("business-theme-ready")');
            await assertLayout(`Business lesson 08 ${viewport.label}`, viewport.width);

            await open('vestibular/licao-16.html', viewport.width, viewport.height, 'document.readyState === "complete" && document.body.classList.contains("vestibular-theme-ready")');
            await assertLayout(`Vestibular lesson 16 ${viewport.label}`, viewport.width);

            await open('nivelamento/licao-01.html', viewport.width, viewport.height, 'document.readyState === "complete" && document.documentElement.classList.contains("theme-ready")');
            await assertLayout(`Nivelamento ${viewport.label}`, viewport.width);
        }

        await open('business/licao-08.html', 1440, 1000, 'document.readyState === "complete" && document.body.classList.contains("business-theme-ready")');
        const businessInteraction = await evaluate(`(() => {
            document.querySelectorAll('[data-rubric]').forEach(select => { select.value = '2'; });
            document.getElementById('calculate-rubric-btn').click();
            return document.getElementById('rubric-result').textContent;
        })()`);
        if (!businessInteraction.startsWith('10/10')) failures.push(`Business rubric failed: ${businessInteraction}`);

        await open('nivelamento/licao-01.html', 1440, 1000, 'document.readyState === "complete" && document.documentElement.classList.contains("theme-ready")');
        const placementInteraction = await evaluate(`(async () => {
            const targets = { A1: 3, A2: 4, PREB1: 2, B1: 4, B2: 0, C1: 0 };
            const used = { A1: 0, A2: 0, PREB1: 0, B1: 0, B2: 0, C1: 0 };
            for (const question of document.querySelectorAll('[data-question]')) {
                const level = question.dataset.level;
                const chooseCorrect = used[level] < targets[level];
                const options = [...question.querySelectorAll('.choice-btn')];
                const chosen = chooseCorrect ? options.find(option => option.dataset.correct === 'true') : options.find(option => option.dataset.correct !== 'true');
                chosen.click();
                if (chooseCorrect) used[level] += 1;
            }
            const feedbackVisible = Boolean(document.querySelector('.choice-btn.is-correct, .choice-btn.is-incorrect'));
            for (let step = 0; step < 5; step += 1) document.getElementById('next-btn').click();
            document.getElementById('finish-btn').click();
            await new Promise(resolve => setTimeout(resolve, 250));
            return {
                feedbackVisible,
                result: document.getElementById('result-level').textContent,
                score: document.getElementById('result-score').textContent
            };
        })()`);
        if (placementInteraction.feedbackVisible || placementInteraction.result !== 'A2 forte / transição' || placementInteraction.score !== '13/30') {
            failures.push(`Placement branch regression: ${JSON.stringify(placementInteraction)}`);
        }

        if (failures.length) {
            console.error(`Extra modules browser audit failed with ${failures.length} issue(s):`);
            failures.forEach((failure) => console.error(`- ${failure}`));
            process.exitCode = 1;
        } else {
            console.log('Extra modules browser audit passed: desktop/mobile layout, Essentials search, Business rubric and placement transition regression scenario checked.');
        }
    } finally {
        client?.socket.close();
        chrome.kill();
        await Promise.race([
            new Promise((resolve) => chrome.once('exit', resolve)),
            delay(3000)
        ]);
        const resolved = path.resolve(profilePath);
        const tempPrefix = path.resolve(os.tmpdir()) + path.sep;
        if (resolved.startsWith(tempPrefix)) {
            for (let attempt = 0; attempt < 5; attempt += 1) {
                try {
                    fs.rmSync(resolved, { recursive: true, force: true });
                    break;
                } catch (error) {
                    if (attempt === 4) throw error;
                    await delay(300);
                }
            }
        }
    }
}

main().catch((error) => {
    console.error(error.stack || error.message);
    process.exitCode = 1;
});
