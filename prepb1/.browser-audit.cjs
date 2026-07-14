const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { spawn } = require('node:child_process');

global.window = {};
require(path.join(__dirname, '..', 'js', 'prepb1-lessons-data.js'));
const expectedCounts = new Map(window.PREPB1_LESSONS.map(lesson => [lesson.number, lesson.slides.length]));

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profilePath = path.join(os.tmpdir(), `prepb1-cdp-audit-${process.pid}`);
const port = 12000 + (process.pid % 8000);
const failures = [];
const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

async function waitForTarget() {
    for (let attempt = 0; attempt < 100; attempt += 1) {
        try {
            const response = await fetch(`http://127.0.0.1:${port}/json/list`);
            const targets = await response.json();
            const page = targets.find(target => target.type === 'page');
            if (page?.webSocketDebuggerUrl) return page;
        } catch {
            // Chrome is still starting.
        }
        await delay(120);
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

        socket.addEventListener('message', event => {
            const message = JSON.parse(event.data);
            if (!message.id || !pending.has(message.id)) return;
            const handlers = pending.get(message.id);
            pending.delete(message.id);
            if (message.error) handlers.reject(new Error(message.error.message));
            else handlers.resolve(message.result);
        });

        socket.addEventListener('error', error => {
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

        const evaluate = async expression => {
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

        const openLesson = async (lessonNumber, viewport) => {
            await setViewport(viewport.width, viewport.height);
            const lessonPath = path.join(__dirname, `licao-${String(lessonNumber).padStart(2, '0')}.html`);
            await client.send('Page.navigate', { url: pathToFileURL(lessonPath).href });
            for (let attempt = 0; attempt < 120; attempt += 1) {
                const ready = await evaluate(`document.readyState === 'complete'
                    && document.body.classList.contains('prepb1-theme-ready')
                    && document.querySelectorAll('.slide').length > 0`);
                if (ready) {
                    await delay(80);
                    return;
                }
                await delay(100);
            }
            throw new Error(`Lesson ${lessonNumber} did not hydrate.`);
        };

        const goToSlideType = async type => {
            const index = await evaluate(`[...document.querySelectorAll('.slide')].findIndex(slide => slide.dataset.slideType === ${JSON.stringify(type)})`);
            if (index < 0) throw new Error(`Slide type not found: ${type}`);
            await evaluate(`(() => {
                const previous = document.getElementById('prev-btn');
                const next = document.getElementById('next-btn');
                for (let step = 0; step < 30; step += 1) previous.click();
                for (let step = 0; step < ${index}; step += 1) next.click();
                window.scrollTo(0, 0);
            })()`);
            await delay(60);
        };

        const measureActiveSlide = () => evaluate(`(() => {
            const active = document.querySelector('.slide.active');
            const visible = element => {
                const style = getComputedStyle(element);
                const rect = element.getBoundingClientRect();
                return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
            };
            const overflowers = active ? [...active.querySelectorAll('*')].filter(element => {
                if (!visible(element) || element.closest('.lesson-table-scroll')) return false;
                const rect = element.getBoundingClientRect();
                return rect.left < -1 || rect.right > innerWidth + 1;
            }).slice(0, 8).map(element => ({
                tag: element.tagName,
                className: String(element.className || '').slice(0, 70),
                left: Math.round(element.getBoundingClientRect().left),
                right: Math.round(element.getBoundingClientRect().right)
            })) : [];
            const header = document.querySelector('header .container')?.getBoundingClientRect();
            const footer = document.querySelector('footer .container')?.getBoundingClientRect();
            return {
                title: active?.dataset.title || '',
                type: active?.dataset.slideType || '',
                activeCount: document.querySelectorAll('.slide.active').length,
                activeHeight: Math.round(active?.getBoundingClientRect().height || 0),
                bodyText: document.body.textContent,
                bodyWidth: document.body.scrollWidth,
                documentWidth: document.documentElement.scrollWidth,
                innerWidth,
                headerLeft: Math.round(header?.left || 0),
                headerRight: Math.round(header?.right || 0),
                footerLeft: Math.round(footer?.left || 0),
                footerRight: Math.round(footer?.right || 0),
                overflowers
            };
        })()`);

        const checkAllSlides = async (lessonNumber, viewport, label) => {
            await openLesson(lessonNumber, viewport);
            const count = await evaluate(`document.querySelectorAll('.slide').length`);
            if (count !== expectedCounts.get(lessonNumber)) {
                failures.push(`${label}: rendered ${count} slides; expected ${expectedCounts.get(lessonNumber)}.`);
            }

            for (let index = 0; index < count; index += 1) {
                if (index > 0) {
                    await evaluate(`document.getElementById('next-btn').click()`);
                    await delay(25);
                }
                const metrics = await measureActiveSlide();
                if (metrics.activeCount !== 1 || metrics.activeHeight < 80) {
                    failures.push(`${label}, slide ${index + 1}: invalid active slide ${JSON.stringify(metrics)}.`);
                }
                if (metrics.documentWidth > metrics.innerWidth + 1 || metrics.bodyWidth > metrics.innerWidth + 1) {
                    failures.push(`${label}, slide ${index + 1} (${metrics.title}): horizontal overflow ${metrics.documentWidth}/${metrics.bodyWidth}px.`);
                }
                if (metrics.headerLeft < -1 || metrics.headerRight > metrics.innerWidth + 1
                    || metrics.footerLeft < -1 || metrics.footerRight > metrics.innerWidth + 1
                    || metrics.overflowers.length) {
                    failures.push(`${label}, slide ${index + 1} (${metrics.title}): element overflow ${JSON.stringify(metrics.overflowers)}.`);
                }
                if (/Diego|Ã|Â|�|undefined/.test(metrics.bodyText)) {
                    failures.push(`${label}, slide ${index + 1}: forbidden or corrupted text rendered.`);
                }
            }
            return count;
        };

        const desktop = { width: 1440, height: 1000 };
        const mobile = { width: 390, height: 844 };
        let checkedLayouts = 0;

        for (let lessonNumber = 1; lessonNumber <= 10; lessonNumber += 1) {
            checkedLayouts += await checkAllSlides(lessonNumber, mobile, `Lesson ${String(lessonNumber).padStart(2, '0')} mobile`);
        }
        for (const lessonNumber of [1, 7, 10]) {
            checkedLayouts += await checkAllSlides(lessonNumber, desktop, `Lesson ${String(lessonNumber).padStart(2, '0')} desktop`);
        }

        await openLesson(1, desktop);
        await goToSlideType('practice');
        const practice = await evaluate(`(() => {
            const cards = [...document.querySelectorAll('.slide.active .practice-card')];
            const reveals = [...document.querySelectorAll('.slide.active .reveal-btn')];
            const initiallyHidden = cards.every(card => card.querySelector('.model-answer')?.classList.contains('hidden'));
            const firstReveal = reveals[0];
            firstReveal.click();
            const firstTarget = document.getElementById(firstReveal.dataset.target);
            const option = document.querySelector('.slide.active .prep-option-btn');
            if (option) option.click();
            return {
                cards: cards.length,
                reveals: reveals.length,
                initiallyHidden,
                firstRevealed: !firstTarget.classList.contains('hidden') && firstReveal.getAttribute('aria-expanded') === 'true',
                optionSelected: !option || option.getAttribute('aria-pressed') === 'true',
                completeGaps: cards.filter(card => /____/.test(card.querySelector('.practice-prompt')?.textContent || '')).length
            };
        })()`);
        if (practice.cards < 6 || practice.reveals !== practice.cards || !practice.initiallyHidden
            || !practice.firstRevealed || !practice.optionSelected || practice.completeGaps < 1) {
            failures.push(`Practice interaction failed: ${JSON.stringify(practice)}.`);
        }

        await goToSlideType('readingQuestions');
        const readingQuestions = await evaluate(`(() => {
            const rows = [...document.querySelectorAll('.slide.active .open-question-row')];
            const firstButton = rows[0]?.querySelector('.reveal-btn');
            const target = firstButton ? document.getElementById(firstButton.dataset.target) : null;
            const initiallyHidden = Boolean(target?.classList.contains('hidden'));
            firstButton?.click();
            return {
                rows: rows.length,
                inputs: document.querySelectorAll('.slide.active textarea').length,
                initiallyHidden,
                revealed: Boolean(target && !target.classList.contains('hidden'))
            };
        })()`);
        if (readingQuestions.rows < 5 || readingQuestions.inputs !== readingQuestions.rows
            || !readingQuestions.initiallyHidden || !readingQuestions.revealed) {
            failures.push(`Reading answers failed: ${JSON.stringify(readingQuestions)}.`);
        }

        await goToSlideType('translation');
        const translation = await evaluate(`(() => {
            const rows = [...document.querySelectorAll('.slide.active .translation-row')];
            const firstButton = rows[0]?.querySelector('.reveal-btn');
            const target = firstButton ? document.getElementById(firstButton.dataset.target) : null;
            const initiallyHidden = Boolean(target?.classList.contains('hidden'));
            firstButton?.click();
            return {
                rows: rows.length,
                source: rows[0]?.querySelector('.translation-source strong')?.textContent || '',
                initiallyHidden,
                revealed: Boolean(target && !target.classList.contains('hidden'))
            };
        })()`);
        if (translation.rows < 6 || !/[áàãâéêíóôõúç]/i.test(translation.source)
            || !translation.initiallyHidden || !translation.revealed) {
            failures.push(`Oral translation failed: ${JSON.stringify(translation)}.`);
        }

        await goToSlideType('speaking');
        const speaking = await evaluate(`(() => {
            const rounds = [...document.querySelectorAll('.slide.active .speaking-card')];
            const firstButton = rounds[0]?.querySelector('.reveal-btn');
            const target = firstButton ? document.getElementById(firstButton.dataset.target) : null;
            const initiallyHidden = Boolean(target?.classList.contains('hidden'));
            firstButton?.click();
            return {
                rounds: rounds.length,
                followUps: document.querySelectorAll('.slide.active .follow-up-box li').length,
                initiallyHidden,
                revealed: Boolean(target && !target.classList.contains('hidden'))
            };
        })()`);
        if (speaking.rounds < 2 || speaking.followUps < 4 || !speaking.initiallyHidden || !speaking.revealed) {
            failures.push(`Speaking models failed: ${JSON.stringify(speaking)}.`);
        }

        const theme = await evaluate(`(() => {
            const before = document.documentElement.dataset.theme;
            document.querySelector('[data-prepb1-theme-toggle]').click();
            return { before, after: document.documentElement.dataset.theme };
        })()`);
        if (!theme.before || theme.before === theme.after) failures.push(`Theme toggle failed: ${JSON.stringify(theme)}.`);

        await openLesson(2, desktop);
        await goToSlideType('teacherListening');
        const listening = await evaluate(`(() => {
            const button = document.querySelector('.slide.active .listening-toolbar .reveal-btn');
            const target = button ? document.getElementById(button.dataset.target) : null;
            const initiallyHidden = Boolean(target?.classList.contains('hidden'));
            button?.click();
            return {
                questions: document.querySelectorAll('.slide.active .open-question-row').length,
                initiallyHidden,
                revealed: Boolean(target && !target.classList.contains('hidden'))
            };
        })()`);
        if (listening.questions < 4 || !listening.initiallyHidden || !listening.revealed) {
            failures.push(`Teacher listening failed: ${JSON.stringify(listening)}.`);
        }

        await openLesson(10, mobile);
        await goToSlideType('homework');
        const homework = await evaluate(`({
            options: document.querySelectorAll('.slide.active .homework-card').length,
            checklist: document.querySelectorAll('.slide.active .prep-check-btn').length,
            finishVisible: !document.getElementById('finish-lesson-btn').classList.contains('hidden'),
            nextHidden: document.getElementById('next-btn').classList.contains('hidden'),
            mentionsRecording: /gravar (a |sua )?(voz|áudio)|voice note|record your voice/i.test(document.querySelector('.slide.active').textContent)
        })`);
        if (homework.options !== 3 || homework.checklist < 3 || !homework.finishVisible
            || !homework.nextHidden || homework.mentionsRecording) {
            failures.push(`Homework failed: ${JSON.stringify(homework)}.`);
        }

        if (process.argv.includes('--capture')) {
            await openLesson(7, mobile);
            const mobileScreenshot = await client.send('Page.captureScreenshot', {
                format: 'png',
                fromSurface: true,
                captureBeyondViewport: false
            });
            fs.writeFileSync(path.join(__dirname, '.audit-lesson-07-mobile.png'), Buffer.from(mobileScreenshot.data, 'base64'));

            await openLesson(1, desktop);
            await goToSlideType('practice');
            await delay(450);
            const practiceScreenshot = await client.send('Page.captureScreenshot', {
                format: 'png',
                fromSurface: true,
                captureBeyondViewport: false
            });
            fs.writeFileSync(path.join(__dirname, '.audit-lesson-01-practice.png'), Buffer.from(practiceScreenshot.data, 'base64'));
            console.log('Captured emulated mobile and desktop screenshots.');
        }

        if (failures.length) {
            console.error(`Browser audit failed with ${failures.length} issue(s):`);
            failures.forEach(failure => console.error(`- ${failure}`));
            process.exitCode = 1;
        } else {
            console.log(`Browser audit passed: ${checkedLayouts} slide layouts across all 10 lessons, desktop/mobile, reveal controls, listening, speaking, translation, theme and homework.`);
        }
    } finally {
        if (client?.socket?.readyState === WebSocket.OPEN) client.socket.close();
        chrome.kill();
        await Promise.race([
            new Promise(resolve => chrome.once('exit', resolve)),
            delay(2000)
        ]);
        try {
            fs.rmSync(profilePath, { recursive: true, force: true });
        } catch {
            // Windows can finish releasing the temporary Chrome profile after exit.
        }
    }
}

const keepAlive = setInterval(() => {}, 1000);

main()
    .catch(error => {
        console.error(error.stack || error.message);
        process.exitCode = 1;
    })
    .finally(() => clearInterval(keepAlive));
