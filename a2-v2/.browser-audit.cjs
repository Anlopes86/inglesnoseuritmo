const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');

const moduleRoot = __dirname;
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profilePath = path.join(os.tmpdir(), `a2-v2-cdp-audit-${process.pid}`);
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
                if (!isVisible(element) || element.closest('.lesson-table-scroll, .overflow-x-auto, .table-responsive')) return false;
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
                headerRight: Math.round(document.querySelector('header .container')?.getBoundingClientRect().right || 0),
                footerRight: Math.round(document.querySelector('footer .container')?.getBoundingClientRect().right || 0)
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
        const mobileLessonNumbers = [1, 3, 8, 9, 15, 21, 23, 26, 27];
        const mobileCounts = [];
        for (const lessonNumber of mobileLessonNumbers) {
            mobileCounts.push(await checkAllSlides(lessonNumber, mobile, `Lesson ${String(lessonNumber).padStart(2, '0')} mobile`));
        }

        if (lessonOneDesktopCount !== 11 || mobileCounts.some((count) => count !== 11)) {
            failures.push('Representative A2 lessons should each have 11 slides.');
        }

        const checkedLayoutCount = lessonOneDesktopCount + mobileCounts.reduce((total, count) => total + count, 0);

        await openLesson(1, desktop);
        const automatedListeningControls = await evaluate(`document.querySelectorAll('[data-a2-speak], [data-generated-speak], [data-choice-speak]').length`);
        if (automatedListeningControls) failures.push(`Automated listening controls found: ${automatedListeningControls}.`);

        await goToSlide(1);
        const flashcardWorks = await evaluate(`(() => {
            const card = document.querySelector('.slide.active .flashcard');
            if (!card) return false;
            card.click();
            return card.classList.contains('flipped');
        })()`);
        if (!flashcardWorks) failures.push('Flashcard interaction did not flip the card.');

        await goToSlide(3);
        const practice = await evaluate(`(() => {
            const cards = [...document.querySelectorAll('#practice-questions .activity-card')];
            const buttons = [...document.querySelectorAll('#practice-questions [data-a2-reveal]')];
            const first = buttons[0];
            const target = first?.closest('.activity-card')?.querySelector('.a2-answer');
            if (!first || !target) return { cards: cards.length, buttons: buttons.length, revealed: false, gaps: 0 };
            first.click();
            return {
                cards: cards.length,
                buttons: buttons.length,
                revealed: !target.classList.contains('hidden') && target.textContent.trim().length > 0,
                gaps: document.querySelectorAll('#practice-questions .border-b-2').length
            };
        })()`);
        if (practice.cards < 10 || practice.buttons !== practice.cards || !practice.revealed || practice.gaps < 1) {
            failures.push(`Practice interaction failed: ${JSON.stringify(practice)}.`);
        }

        await goToSlide(9);
        const music = await evaluate(`({
            gaps: (document.querySelector('#music-lyrics')?.textContent.match(/_{5,}/g) || []).length,
            spotifySrc: document.querySelector('.slide.active iframe[src*="open.spotify.com"]')?.src || ''
        })`);
        if (music.gaps < 5 || !/^https:\/\/open\.spotify\.com\/embed\/track\/[A-Za-z0-9]{22}\?/.test(music.spotifySrc)) {
            failures.push(`Music slide failed: ${JSON.stringify(music)}.`);
        }

        await openLesson(9, mobile);
        await goToSlide(9);
        const lessonNineMusic = await evaluate(`(() => {
            const buttons = [...document.querySelectorAll('#music-lyrics [data-music-reveal]')];
            const answers = [...document.querySelectorAll('#music-lyrics .music-gap-answer')];
            const placeholders = [...document.querySelectorAll('#music-lyrics .music-gap-placeholder')];
            const initiallyHidden = answers.every((answer) => answer.classList.contains('hidden'));
            const firstButton = buttons[0];
            const firstAnswer = firstButton ? document.getElementById(firstButton.getAttribute('aria-controls')) : null;
            const firstPlaceholder = firstButton ? document.getElementById(firstButton.dataset.placeholderId) : null;
            firstButton?.click();
            return {
                buttons: buttons.length,
                answers: answers.length,
                placeholders: placeholders.length,
                initiallyHidden,
                firstAnswer: firstAnswer?.textContent.trim() || '',
                firstRevealed: Boolean(firstAnswer && !firstAnswer.classList.contains('hidden')),
                firstPlaceholderHidden: Boolean(firstPlaceholder?.classList.contains('hidden')),
                expanded: firstButton?.getAttribute('aria-expanded') || '',
                otherAnswersHidden: answers.slice(1).every((answer) => answer.classList.contains('hidden'))
            };
        })()`);
        if (lessonNineMusic.buttons !== 10 || lessonNineMusic.answers !== 10 || lessonNineMusic.placeholders !== 10
            || !lessonNineMusic.initiallyHidden || lessonNineMusic.firstAnswer !== 'wake up'
            || !lessonNineMusic.firstRevealed || !lessonNineMusic.firstPlaceholderHidden
            || lessonNineMusic.expanded !== 'true' || !lessonNineMusic.otherAnswersHidden) {
            failures.push(`Lesson 09 lyric reveals failed: ${JSON.stringify(lessonNineMusic)}.`);
        }

        await goToSlide(10);
        await evaluate(`(() => {
            window.markLessonAsComplete = async () => false;
            document.getElementById('finish-btn').click();
        })()`);
        await delay(600);
        const navigationHistory = await client.send('Page.getNavigationHistory');
        const finishDestinations = (navigationHistory.entries || []).map((entry) => entry.url);
        if (!finishDestinations.some((url) => /\/a2-v2\/a2-v2\.html$/i.test(url))) {
            failures.push(`Finish button did not request a2-v2.html: ${JSON.stringify(finishDestinations.slice(-5))}.`);
        }

        await openLesson(1, desktop);
        await goToSlide(10);
        const homework = await evaluate(`({
            themes: document.querySelectorAll('#homework-list > li:first-child .grid > div').length,
            mentionsRecording: /gravar|grave uma|record|microfone|enviar audio|upload/i.test(document.querySelector('.slide.active').textContent),
            preparedForLiveClass: /ao vivo|professor/i.test(document.querySelector('.slide.active').textContent),
            automatedAudioControls: document.querySelectorAll('.slide.active [data-generated-speak], .slide.active [data-choice-speak]').length
        })`);
        if (homework.themes !== 3 || homework.mentionsRecording || !homework.preparedForLiveClass || homework.automatedAudioControls) {
            failures.push(`Homework slide failed: ${JSON.stringify(homework)}.`);
        }

        if (failures.length) {
            console.error(`Browser audit failed with ${failures.length} issue(s):`);
            failures.forEach((failure) => console.error(`- ${failure}`));
            process.exitCode = 1;
        } else {
            console.log(`Browser audit passed: ${checkedLayoutCount} representative A2 slide layouts plus flashcards, reveals, music, and live-class homework.`);
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
