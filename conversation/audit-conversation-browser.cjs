const fs = require('fs');
const path = require('path');
const http = require('http');
const vm = require('vm');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const runId = process.env.CONVERSATION_BROWSER_RUN_ID || new Date().toISOString().replace(/[:.]/g, '-');
const useProviderFixtures = process.env.CONVERSATION_BROWSER_REAL_PROVIDER !== '1';
const artifactDir = path.join(root, 'artifacts', 'conversation-qa', runId);
fs.mkdirSync(artifactDir, { recursive: true });

function loadMusicEntries() {
    const context = { window: {} };
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(path.join(root, 'conversation', 'conversation-music-catalog-01-48.js'), 'utf8'), context);
    vm.runInContext(fs.readFileSync(path.join(root, 'conversation', 'conversation-music-catalog-49-64.js'), 'utf8'), context);
    return [
        ...(context.window.ConversationMusicCatalog0148?.records || []),
        ...(context.window.ConversationMusicCatalog?.records || [])
    ];
}

function buildSyntheticProviderLyrics(entry) {
    return entry.gaps.map((gap, gapIndex) => {
        const occurrences = Math.max(1, Number(gap.occurrence) || 1);
        return Array.from({ length: occurrences }, (_, occurrenceIndex) => `fixturemarker ${gap.answer} segment ${gapIndex + 1} ${occurrenceIndex + 1}`).join(' ');
    }).join('\n');
}

const providerFixtures = new Map(loadMusicEntries().map((entry) => [String(entry.lyrics?.lrclibId), {
    id: entry.lyrics?.lrclibId,
    trackName: entry.song.title,
    artistName: entry.song.artist,
    albumName: entry.song.album || null,
    duration: entry.song.durationSeconds,
    instrumental: false,
    plainLyrics: buildSyntheticProviderLyrics(entry),
    syncedLyrics: null
}]));

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.woff2': 'font/woff2'
};

function createServer() {
    return http.createServer((request, response) => {
        const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
        const relative = pathname === '/' ? 'conversation/conversation.html' : pathname.replace(/^\/+/, '');
        const filePath = path.resolve(root, relative);
        if (!filePath.startsWith(root) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('Not found');
            return;
        }
        response.writeHead(200, {
            'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
            'Cache-Control': 'no-store'
        });
        fs.createReadStream(filePath).pipe(response);
    });
}

function listen(server) {
    return new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(0, '127.0.0.1', () => resolve(server.address().port));
    });
}

function close(server) {
    return new Promise((resolve) => server.close(resolve));
}

async function auditPage(browser, baseUrl, lessonNumber, profile, capture = false) {
    const context = await browser.newContext({
        viewport: profile.viewport,
        locale: 'pt-BR',
        reducedMotion: 'reduce'
    });
    const page = await context.newPage();
    if (useProviderFixtures) {
        await page.route('https://lrclib.net/api/**', async (route) => {
            const id = new URL(route.request().url()).pathname.match(/\/get\/(\d+)/)?.[1];
            const fixture = providerFixtures.get(String(id));
            await route.fulfill({
                status: fixture ? 200 : 404,
                contentType: 'application/json',
                body: JSON.stringify(fixture || { message: 'No browser-audit fixture' })
            });
        });
        await page.route('https://api.lyrics.ovh/**', (route) => route.fulfill({ status: 503, body: '{}' }));
        await page.route('https://open.spotify.com/embed/track/**', (route) => route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>Spotify embed audit fixture</title>' }));
    }
    await page.addInitScript(() => {
        window.__conversationSpoken = [];
        class TestUtterance {
            constructor(text) { this.text = text; }
        }
        Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, value: TestUtterance });
        Object.defineProperty(window, 'speechSynthesis', {
            configurable: true,
            value: { cancel() {}, getVoices() { return []; }, speak(utterance) { window.__conversationSpoken.push(utterance.text); } }
        });
    });
    const errors = [];
    page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
    page.on('console', (message) => {
        if (message.type() === 'error' && !/favicon|ERR_BLOCKED_BY_CLIENT/i.test(message.text())) errors.push(`console: ${message.text()}`);
    });
    const padded = String(lessonNumber).padStart(2, '0');
    const url = `${baseUrl}/conversation/licao-${padded}.html`;
    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
        await page.waitForSelector('.slide', { timeout: 20000 });
        const structural = await page.evaluate(() => ({
            count: document.querySelectorAll('.slide').length,
            active: document.querySelectorAll('.slide.active').length,
            kinds: Array.from(document.querySelectorAll('.slide')).map((slide) => slide.dataset.slideKind),
            counter: document.getElementById('slide-counter')?.textContent.trim(),
            warmups: document.querySelectorAll('[data-slide-kind="warmup"] p').length - 1,
            flashcards: document.querySelectorAll('.flashcard').length,
            nestedFlashcardButtons: document.querySelectorAll('button button').length,
            debates: Array.from(document.querySelectorAll('[data-slide-kind="debate"]')).map((slide) => slide.querySelectorAll('.debate-card').length),
            contexts: document.querySelectorAll('[data-slide-kind="context"]').length,
            practiceZones: document.querySelectorAll('.drop-zone').length,
            homeworkModel: Boolean(document.querySelector('[data-slide-kind="homework"] blockquote')),
            homeworkMode: document.querySelector('[data-slide-kind="homework"]')?.dataset.homeworkMode,
            homeworkOptions: document.querySelectorAll('[data-homework-option]').length,
            flashcardSemantics: Array.from(document.querySelectorAll('[data-flashcard-card]')).map((card) => ({
                terms: card.querySelectorAll('[data-flashcard-term]').length,
                meanings: card.querySelectorAll('[data-flashcard-meaning]').length,
                examples: card.querySelectorAll('[data-flashcard-example]').length,
                term: card.querySelector('[data-flashcard-term]')?.textContent.trim(),
                pronounce: card.querySelector('[data-pronounce-text]')?.dataset.pronounceText,
                savedFront: card.dataset.cardFront,
                savedBack: card.dataset.cardBack
            })),
            horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
        }));
        const expectedKinds = ['warmup', 'expressions', 'music', 'debate', 'context', 'music', 'debate', 'context', 'music', 'debate', 'practice', 'speaking', 'homework', 'closing'];
        if (structural.count !== 14) errors.push(`expected 14 slides, found ${structural.count}`);
        if (structural.active !== 1) errors.push(`expected one active slide, found ${structural.active}`);
        if (JSON.stringify(structural.kinds) !== JSON.stringify(expectedKinds)) errors.push(`slide order mismatch: ${structural.kinds.join(',')}`);
        if (structural.counter !== '1 / 14') errors.push(`initial counter is ${structural.counter}`);
        const expectedWarmups = lessonNumber <= 48 ? 5 : 4;
        if (structural.warmups !== expectedWarmups) errors.push(`warm-up count is ${structural.warmups}; expected ${expectedWarmups}`);
        if (structural.flashcards !== 6) errors.push(`flashcard count is ${structural.flashcards}`);
        if (structural.nestedFlashcardButtons !== 0) errors.push(`flashcards contain ${structural.nestedFlashcardButtons} invalid nested interactive controls`);
        if (structural.debates.some((count) => count !== 4)) errors.push(`debate counts are ${structural.debates.join('/')}`);
        if (structural.contexts !== 2 || structural.practiceZones !== 6) errors.push('context or practice contract missing');
        const expectsHomeworkOptions = lessonNumber === 42 || lessonNumber === 47 || lessonNumber >= 49;
        if (!expectsHomeworkOptions && (!structural.homeworkModel || structural.homeworkMode !== 'modeled' || structural.homeworkOptions !== 0)) errors.push(`modeled homework contract failed: ${JSON.stringify(structural)}`);
        if (expectsHomeworkOptions && (structural.homeworkMode !== 'options' || structural.homeworkOptions !== 3 || structural.homeworkModel)) errors.push(`three-option homework contract failed: ${JSON.stringify(structural)}`);
        structural.flashcardSemantics.forEach((card, index) => {
            if (card.terms !== 1 || card.meanings !== 1 || card.examples !== 1) errors.push(`flashcard ${index + 1}: semantic selectors are not exclusive`);
            if (card.pronounce !== card.term) errors.push(`flashcard ${index + 1}: pronunciation target differs from term`);
            if (card.savedFront !== card.term || /Show meaning|Show expression/i.test(`${card.savedFront} ${card.savedBack}`)) errors.push(`flashcard ${index + 1}: saved payload includes hint text or wrong front`);
        });
        if (structural.horizontalOverflow > 1) errors.push(`initial horizontal overflow ${structural.horizontalOverflow}px`);

        for (let index = 1; index < 14; index += 1) {
            await page.evaluate(() => window.scrollTo(0, 0));
            await page.locator('#next-btn').click();
            const activeKind = await page.locator('.slide.active').getAttribute('data-slide-kind');
            if (activeKind === 'music') {
                await page.waitForFunction(() => {
                    const state = document.querySelector('.slide.active [data-conversation-music-cloze]')?.dataset.musicState;
                    return state && state !== 'idle' && state !== 'loading';
                }, null, { timeout: 5000 });
            }
            const state = await page.evaluate(() => {
                const active = document.querySelector('.slide.active');
                const footer = document.querySelector('footer')?.getBoundingClientRect();
                const activeRect = active?.getBoundingClientRect();
                const musicRoot = active?.querySelector('[data-conversation-music-cloze]');
                const firstFlashcard = active?.querySelector('[data-flashcard-card]');
                const firstFlashcardFront = firstFlashcard?.querySelector('.flashcard-front');
                const firstFlashcardRect = firstFlashcardFront?.getBoundingClientRect();
                const matchingActivity = active?.querySelector('#matching-activity');
                return {
                    counter: document.getElementById('slide-counter')?.textContent.trim(),
                    kind: active?.dataset.slideKind,
                    songIndex: active?.dataset.songIndex,
                    iframes: active?.querySelectorAll('iframe').length || 0,
                    cloze: active?.querySelectorAll('[data-conversation-music-cloze]').length || 0,
                    unavailable: active?.querySelectorAll('.conversation-listening-unavailable').length || 0,
                    musicState: musicRoot?.dataset.musicState,
                    publicationStatus: musicRoot?.dataset.publicationStatus,
                    musicGaps: active?.querySelectorAll('[data-conversation-music-gap]').length || 0,
                    flashcardFrontWidth: firstFlashcardRect?.width || 0,
                    flashcardFrontHeight: firstFlashcardRect?.height || 0,
                    practiceLayout: active?.dataset.practiceLayout,
                    matchingDisplay: matchingActivity ? getComputedStyle(matchingActivity).display : null,
                    practiceFontSize: matchingActivity?.firstElementChild ? parseFloat(getComputedStyle(matchingActivity.firstElementChild).fontSize) : 0,
                    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
                    footerVisible: footer && footer.top < window.innerHeight && footer.bottom <= window.innerHeight + 1,
                    activeBottom: activeRect?.bottom || 0,
                    footerTop: footer?.top || window.innerHeight
                };
            });
            if (state.counter !== `${index + 1} / 14`) errors.push(`slide ${index + 1}: counter is ${state.counter}`);
            if (state.overflow > 1) errors.push(`slide ${index + 1}: horizontal overflow ${state.overflow}px`);
            if (!state.footerVisible) errors.push(`slide ${index + 1}: footer not visible`);
            if (state.kind === 'music') {
                const expectedPublicationStatus = lessonNumber <= 48 ? 'draft-until-provider-match' : 'provider-verified';
                if (state.iframes !== 1 || state.cloze !== 1 || state.unavailable !== 0) errors.push(`slide ${index + 1}: music UI failed (iframe ${state.iframes}, cloze ${state.cloze}, unavailable ${state.unavailable})`);
                if (state.publicationStatus !== expectedPublicationStatus) errors.push(`slide ${index + 1}: publication status is ${state.publicationStatus}; expected ${expectedPublicationStatus}`);
                if (state.musicState !== 'ready' || state.musicGaps !== 5) errors.push(`slide ${index + 1}: lyrics activity is ${state.musicState} with ${state.musicGaps} gaps`);
            }
            if (state.kind === 'expressions' && (state.flashcardFrontWidth < 200 || state.flashcardFrontHeight < 150)) errors.push(`slide ${index + 1}: flashcard face collapsed to ${Math.round(state.flashcardFrontWidth)}x${Math.round(state.flashcardFrontHeight)}px`);
            if (state.kind === 'practice' && (state.practiceLayout !== 'legacy-vertical' || state.matchingDisplay !== 'block' || state.practiceFontSize < 19)) errors.push(`slide ${index + 1}: legacy practice layout not restored (${state.practiceLayout}, ${state.matchingDisplay}, ${state.practiceFontSize}px)`);
            if (state.activeBottom > state.footerTop + 4) {
                const scrolledBottom = await page.evaluate(() => {
                    window.scrollTo(0, document.documentElement.scrollHeight);
                    const active = document.querySelector('.slide.active')?.getBoundingClientRect();
                    const footer = document.querySelector('footer')?.getBoundingClientRect();
                    return { activeBottom: active?.bottom || 0, footerTop: footer?.top || window.innerHeight };
                });
                if (scrolledBottom.activeBottom > scrolledBottom.footerTop + 4) errors.push(`slide ${index + 1}: content cannot scroll clear of footer by ${Math.round(scrolledBottom.activeBottom - scrolledBottom.footerTop)}px`);
            }
            if (state.kind === 'expressions') {
                const firstTerm = await page.locator('[data-flashcard-term]').first().textContent();
                await page.locator('.flashcard-pronounce-btn').first().click();
                const spoken = await page.evaluate(() => window.__conversationSpoken.at(-1));
                if (spoken !== firstTerm.trim()) errors.push(`slide ${index + 1}: pronunciation spoke ${JSON.stringify(spoken)} instead of ${JSON.stringify(firstTerm.trim())}`);
            }
        }
        const closingState = await page.evaluate(() => ({
            nextHidden: document.getElementById('next-btn')?.hidden,
            finishVisible: Boolean(document.getElementById('finish-lesson-btn-main')?.offsetParent),
            progress: document.getElementById('progress-bar')?.getAttribute('aria-valuenow')
        }));
        if (!closingState.nextHidden || !closingState.finishVisible || closingState.progress !== '14') errors.push(`closing controls invalid: ${JSON.stringify(closingState)}`);
        await page.locator('#prev-btn').click();
        if ((await page.locator('#slide-counter').textContent()).trim() !== '13 / 14') errors.push('Previous button did not return to homework.');

        if (capture) {
            const targetSlide = lessonNumber === 48 ? 12 : lessonNumber === 39 ? 10 : lessonNumber === 17 || lessonNumber === 35 || lessonNumber === 45 || lessonNumber === 47 ? 2 : 3;
            const targetSlides = lessonNumber === 31 ? [1, 2, 10] : [targetSlide];
            for (const captureSlide of targetSlides) {
                while (Number((await page.locator('#slide-counter').textContent()).split('/')[0].trim()) - 1 > captureSlide) await page.locator('#prev-btn').click();
                while (Number((await page.locator('#slide-counter').textContent()).split('/')[0].trim()) - 1 < captureSlide) await page.locator('#next-btn').click();
                if (captureSlide === 2) await page.waitForSelector('.slide.active [data-music-state="ready"]', { timeout: 5000 });
                await page.waitForTimeout(300);
                await page.screenshot({ path: path.join(artifactDir, `l${padded}-${profile.name}-slide-${captureSlide + 1}.png`), fullPage: true });
            }
        }
    } catch (error) {
        errors.push(`audit exception: ${error.message}`);
    } finally {
        await context.close();
    }
    return { lessonNumber, profile: profile.name, errors };
}

async function main() {
    const server = createServer();
    const port = await listen(server);
    const baseUrl = `http://127.0.0.1:${port}`;
    const browser = await chromium.launch({ headless: true });
    const allProfiles = [
        { name: 'desktop', viewport: { width: 1440, height: 1000 } },
        { name: 'mobile', viewport: { width: 390, height: 844 } }
    ];
    const requestedProfile = process.env.CONVERSATION_BROWSER_PROFILE;
    const profiles = requestedProfile ? allProfiles.filter((profile) => profile.name === requestedProfile) : allProfiles;
    if (!profiles.length) throw new Error(`Unknown CONVERSATION_BROWSER_PROFILE: ${requestedProfile}`);
    const critical = new Set([3, 13, 17, 24, 31, 35, 39, 43, 45, 47, 48, 49, 56, 64]);
    const requestedLessons = process.env.CONVERSATION_BROWSER_LESSONS
        ? new Set(process.env.CONVERSATION_BROWSER_LESSONS.split(',').map(Number))
        : null;
    const results = [];
    try {
        for (const profile of profiles) {
            for (let lessonNumber = 1; lessonNumber <= 64; lessonNumber += 1) {
                if (requestedLessons && !requestedLessons.has(lessonNumber)) continue;
                const result = await auditPage(browser, baseUrl, lessonNumber, profile, critical.has(lessonNumber));
                results.push(result);
                process.stdout.write(`${profile.name} L${String(lessonNumber).padStart(2, '0')} ${result.errors.length ? `FAIL ${result.errors.length}` : 'PASS'}\n`);
            }
        }
    } finally {
        await browser.close();
        await close(server);
    }
    const failures = results.filter((result) => result.errors.length);
    const expectedLessons = requestedLessons ? [...requestedLessons].filter((lesson) => lesson >= 1 && lesson <= 64).length : 64;
    const expectedPages = expectedLessons * profiles.length;
    if (results.length !== expectedPages) failures.push({ lessonNumber: null, profile: 'coverage', errors: [`expected ${expectedPages} pagesOpened, found ${results.length}`] });
    const screenshots = fs.readdirSync(artifactDir).filter((name) => name.endsWith('.png')).sort();
    console.log(JSON.stringify({
        pagesOpened: results.length,
        expectedPages,
        lessons: expectedLessons,
        profiles: profiles.map((profile) => profile.name),
        lyricsMode: useProviderFixtures ? 'deterministic-provider-fixture' : 'real-provider',
        runId,
        artifactDir: path.relative(root, artifactDir),
        screenshots,
        failures
    }, null, 2));
    if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
    console.error(error.stack || error.message);
    process.exitCode = 1;
});
