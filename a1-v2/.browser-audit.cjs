const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');

const moduleRoot = __dirname;
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profilePath = path.join(os.tmpdir(), `a1-v2-cdp-audit-${process.pid}`);
const port = 10000 + (process.pid % 10000);
const failures = [];

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function waitForTarget() {
    for (let attempt = 0; attempt < 80; attempt += 1) {
        try {
            const response = await fetch(`http://127.0.0.1:${port}/json/list`);
            const targets = await response.json();
            const page = targets.find((target) => target.type === 'page');
            if (page?.webSocketDebuggerUrl) return page;
        } catch {
            // Chrome is still starting.
        }
        await delay(125);
    }
    throw new Error('Chrome DevTools target did not become available.');
}

function connect(webSocketUrl) {
    return new Promise((resolve, reject) => {
        const socket = new WebSocket(webSocketUrl);
        const pending = new Map();
        let commandId = 0;
        const connectionTimeout = setTimeout(() => {
            socket.close();
            reject(new Error('Chrome DevTools WebSocket did not open.'));
        }, 10000);

        socket.addEventListener('open', () => {
            clearTimeout(connectionTimeout);
            resolve({
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
                            resolve(value) {
                                clearTimeout(timeout);
                                resolveCommand(value);
                            },
                            reject(error) {
                                clearTimeout(timeout);
                                rejectCommand(error);
                            }
                        });
                    });
                }
            });
        });

        socket.addEventListener('message', (event) => {
            const message = JSON.parse(event.data);
            if (!message.id || !pending.has(message.id)) return;
            const handlers = pending.get(message.id);
            pending.delete(message.id);
            if (message.error) handlers.reject(new Error(message.error.message));
            else handlers.resolve(message.result);
        });

        socket.addEventListener('error', (error) => {
            clearTimeout(connectionTimeout);
            reject(error);
        });
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

        const setViewport = (width, height, mobile) => client.send('Emulation.setDeviceMetricsOverride', {
            width,
            height,
            deviceScaleFactor: 1,
            mobile
        });

        const openLesson = async (lessonNumber, viewport) => {
            await setViewport(viewport.width, viewport.height, viewport.mobile);
            const lessonPath = path.join(moduleRoot, `licao-${String(lessonNumber).padStart(2, '0')}.html`);
            await client.send('Page.navigate', { url: pathToFileURL(lessonPath).href });
            for (let attempt = 0; attempt < 100; attempt += 1) {
                const ready = await evaluate(`document.readyState === 'complete' && !document.body.classList.contains('lesson-loading') && document.querySelectorAll('.slide').length > 0`);
                if (ready) return;
                await delay(100);
            }
            throw new Error(`Lesson ${lessonNumber} did not hydrate.`);
        };

        const goToSlide = async (index) => {
            await evaluate(`(() => {
                const previous = document.getElementById('prev-btn');
                const next = document.getElementById('next-btn');
                for (let step = 0; step < 50; step += 1) previous.click();
                for (let step = 0; step < ${index}; step += 1) next.click();
                window.scrollTo(0, 0);
            })()`);
            await delay(80);
        };

        const measure = () => evaluate(`(() => {
            const active = document.querySelector('.slide.active');
            const isVisible = (element) => {
                const style = getComputedStyle(element);
                const rect = element.getBoundingClientRect();
                return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
            };
            const overflowers = active ? [...active.querySelectorAll('*')].filter((element) => {
                if (!isVisible(element) || element.closest('.lesson-table-scroll')) return false;
                const rect = element.getBoundingClientRect();
                return rect.left < -1 || rect.right > innerWidth + 1;
            }).slice(0, 8).map((element) => ({
                tag: element.tagName,
                className: String(element.className || '').slice(0, 80),
                left: Math.round(element.getBoundingClientRect().left),
                right: Math.round(element.getBoundingClientRect().right)
            })) : [];
            return {
                innerWidth,
                slideCount: document.querySelectorAll('.slide').length,
                title: active?.dataset.title || '',
                documentWidth: document.documentElement.scrollWidth,
                bodyWidth: document.body.scrollWidth,
                overflowers,
                headerRight: Math.round(document.querySelector('.header-inner').getBoundingClientRect().right),
                footerRight: Math.round(document.querySelector('.footer-inner').getBoundingClientRect().right)
            };
        })()`);

        const checkAllSlides = async (lessonNumber, viewport, label) => {
            await openLesson(lessonNumber, viewport);
            const count = await evaluate(`document.querySelectorAll('.slide').length`);
            for (let index = 0; index < count; index += 1) {
                await goToSlide(index);
                const metrics = await measure();
                if (metrics.innerWidth !== viewport.width) {
                    failures.push(`${label}: viewport ${metrics.innerWidth}px, expected ${viewport.width}px.`);
                }
                if (metrics.documentWidth > metrics.innerWidth + 1 || metrics.bodyWidth > metrics.innerWidth + 1) {
                    failures.push(`${label}, slide ${index + 1} (${metrics.title}): horizontal document overflow ${metrics.documentWidth}/${metrics.bodyWidth}px.`);
                }
                if (metrics.headerRight > metrics.innerWidth + 1 || metrics.footerRight > metrics.innerWidth + 1 || metrics.overflowers.length) {
                    failures.push(`${label}, slide ${index + 1} (${metrics.title}): element overflow ${JSON.stringify(metrics.overflowers)}.`);
                }
            }
            return count;
        };

        const desktop = { width: 1440, height: 1000, mobile: false };
        const mobile = { width: 390, height: 844, mobile: false };

        const lessonOneDesktopCount = await checkAllSlides(1, desktop, 'Lesson 01 desktop');
        const lessonOneMobileCount = await checkAllSlides(1, mobile, 'Lesson 01 mobile');
        const reviewDesktopCount = await checkAllSlides(4, desktop, 'Review 04 desktop');
        const reviewMobileCount = await checkAllSlides(4, mobile, 'Review 04 mobile');
        const variedReviewCount = await checkAllSlides(16, mobile, 'Review 16 mobile');
        const expandedCount = await checkAllSlides(29, desktop, 'Lesson 29 desktop');

        if (lessonOneDesktopCount !== 11 || lessonOneMobileCount !== 11) failures.push('Lesson 01 should have 11 slides.');
        if (reviewDesktopCount !== 11 || reviewMobileCount !== 11) failures.push('Review 04 should have 11 slides.');
        if (variedReviewCount <= reviewMobileCount) failures.push('Review 16 should demonstrate a longer review circuit.');
        if (expandedCount <= lessonOneDesktopCount) failures.push('Lesson 29 should demonstrate the variable slide count.');

        const checkedLayoutCount = lessonOneDesktopCount + lessonOneMobileCount + reviewDesktopCount
            + reviewMobileCount + variedReviewCount + expandedCount;

        await openLesson(1, desktop);
        await goToSlide(1);
        const flashcardWorks = await evaluate(`(() => {
            const card = document.querySelector('[data-flashcard]');
            card.click();
            return card.classList.contains('flipped') && card.getAttribute('aria-pressed') === 'true';
        })()`);
        if (!flashcardWorks) failures.push('Flashcard interaction did not flip the card.');

        await goToSlide(3);
        const practice = await evaluate(`(() => {
            const cards = [...document.querySelectorAll('.slide.active .activity-card')];
            const buttons = [...document.querySelectorAll('.slide.active [data-reveal-target]')];
            const first = buttons[0];
            const target = document.getElementById(first.dataset.revealTarget);
            first.click();
            return {
                cards: cards.length,
                buttons: buttons.length,
                revealed: !target.hidden && first.getAttribute('aria-expanded') === 'true',
                gaps: document.querySelectorAll('.slide.active .practice-input').length
            };
        })()`);
        if (practice.cards < 10 || practice.buttons !== practice.cards || !practice.revealed || practice.gaps < 1) {
            failures.push(`Practice interaction failed: ${JSON.stringify(practice)}.`);
        }

        await goToSlide(9);
        const music = await evaluate(`({
            inputs: document.querySelectorAll('.slide.active .music-input').length,
            rawGaps: (document.querySelector('.slide.active .music-copy')?.textContent.match(/___/g) || []).length,
            spotifySrc: document.querySelector('.slide.active iframe[src*="open.spotify.com"]')?.src || ''
        })`);
        if (music.inputs < 5 || music.rawGaps || !/^https:\/\/open\.spotify\.com\/embed\/track\/[A-Za-z0-9]{22}\?/.test(music.spotifySrc)) {
            failures.push(`Music slide failed: ${JSON.stringify(music)}.`);
        }

        await goToSlide(10);
        const homework = await evaluate(`({
            themes: document.querySelectorAll('.slide.active .theme-options article').length,
            mentionsRecording: /gravar|grave uma|record|microfone|enviar audio|upload/i.test(document.querySelector('.slide.active').textContent)
        })`);
        if (homework.themes !== 3 || homework.mentionsRecording) failures.push(`Homework slide failed: ${JSON.stringify(homework)}.`);

        if (failures.length) {
            console.error(`Browser audit failed with ${failures.length} issue(s):`);
            failures.forEach((failure) => console.error(`- ${failure}`));
            process.exitCode = 1;
        } else {
            console.log(`Browser audit passed: ${checkedLayoutCount} representative slide layouts plus flashcards, reveals, music, homework, and variable slide counts.`);
        }
    } finally {
        if (client?.socket?.readyState === WebSocket.OPEN) client.socket.close();
        chrome.kill();
        await Promise.race([
            new Promise((resolve) => chrome.once('exit', resolve)),
            delay(2000)
        ]);
        try {
            fs.rmSync(profilePath, { recursive: true, force: true });
        } catch {
            // The OS can finish releasing a Chrome profile after the audit exits.
        }
    }
}

const keepAlive = setInterval(() => {}, 1000);

main()
    .catch((error) => {
        console.error(error.stack || error.message);
        process.exitCode = 1;
    })
    .finally(() => clearInterval(keepAlive));
