const { execFile } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { promisify } = require('util');
const { pathToFileURL } = require('url');

const run = promisify(execFile);
const root = path.resolve(__dirname, '..');
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'v3-render-audit-'));
const failures = [];

const samples = [
    ['a1-v3', 1, false], ['a1-v3', 8, true], ['a1-v3', 32, true],
    ['a2-v3', 1, false], ['a2-v3', 8, true], ['a2-v3', 32, true],
    ['b1-v3', 1, false], ['b1-v3', 8, true], ['b1-v3', 32, true]
];

function fail(label, message) {
    failures.push(`${label}: ${message}`);
}

async function render(moduleId, number, mobile) {
    const filename = `licao-${String(number).padStart(2, '0')}.html`;
    const url = pathToFileURL(path.join(root, moduleId, filename)).href;
    const profile = path.join(tempRoot, `${moduleId}-${number}-${mobile ? 'mobile' : 'desktop'}`);
    const size = mobile ? '390,844' : '1440,1000';
    const { stdout } = await run(chrome, [
        '--headless=new',
        '--no-sandbox',
        '--in-process-gpu',
        '--disable-gpu',
        '--disable-gpu-compositing',
        '--disable-features=Vulkan,Graphite',
        '--use-angle=swiftshader',
        '--allow-file-access-from-files',
        '--run-all-compositor-stages-before-draw',
        '--virtual-time-budget=6500',
        `--window-size=${size}`,
        `--user-data-dir=${profile}`,
        '--dump-dom',
        url
    ], { encoding: 'utf8', maxBuffer: 30 * 1024 * 1024, timeout: 25000, windowsHide: true });
    return stdout;
}

function inspect(html, moduleId, number, expectedReview, mobile) {
    const label = `${moduleId} L${String(number).padStart(2, '0')} ${mobile ? 'mobile' : 'desktop'}`;
    if (!/v3-session-ready/.test(html)) fail(label, 'V3 session framework did not initialize.');
    if (!/v3-session-badge/.test(html) || !/>\s*60 min\s*</.test(html)) fail(label, '60-minute session badge is missing.');
    const minutes = [...html.matchAll(/data-v3-minutes="(\d+)"/g)].map(match => Number(match[1]));
    if (!minutes.length || minutes.reduce((sum, value) => sum + value, 0) !== 60) {
        fail(label, `rendered minute allocation is ${minutes.reduce((sum, value) => sum + value, 0)}.`);
    }
    const reviewMatch = html.match(/data-v3-review="(true|false)"/);
    if (!reviewMatch || reviewMatch[1] !== String(expectedReview)) fail(label, 'review classification is incorrect.');
    const expectsMission = !expectedReview && moduleId !== 'b1-v3' && !(moduleId === 'a1-v3' && number < 9);
    if (expectsMission && !/v3-live-mission/.test(html)) fail(label, 'curated live mission is missing.');
    if (expectsMission && (!/v3-speaking-structure/.test(html) || !/v3-speaking-rounds/.test(html) || !/v3-teacher-focus/.test(html))) {
        fail(label, 'B1-inspired speaking rounds or teacher focus are missing.');
    }
    if (expectedReview && /v3-can-do-assessment|data-slide-type="assessment"|data-title="Can-Do Check"/i.test(html)) fail(label, 'removed Can-Do assessment is still rendered.');
    if (expectedReview) {
        const interactiveGames = (html.match(/class="v3-review-game"/g) || []).length;
        if (interactiveGames < 2) fail(label, `expanded review has only ${interactiveGames} interactive game labs.`);
        if (moduleId === 'a1-v3' && (html.match(/class="v3-review-grammar-card"/g) || []).length < 6) fail(label, 'A1 review grammar was not expanded into explanatory cards.');
        if (moduleId === 'a2-v3' && (html.match(/class="v3-review-grammar-card"/g) || []).length < 4) fail(label, 'A2 review grammar was not expanded into explanatory cards.');
        if ((moduleId === 'a1-v3' || moduleId === 'a2-v3') && (html.match(/v3-review-grammar-table/g) || []).length < 2) fail(label, 'review grammar needs two visual summary tables.');
        if (moduleId === 'b1-v3' && (html.match(/review-grammar-slide/g) || []).length < 2) fail(label, 'B1 review grammar was not divided into two stages.');
        const gameKinds = [
            /data-v3-memory-board/.test(html),
            /data-v3-match-board/.test(html),
            /data-v3-hangman/.test(html),
            /data-v3-builder/.test(html)
        ].filter(Boolean).length;
        if (gameKinds < 2) fail(label, 'review does not combine at least two different game formats.');
    }
    if (!expectedReview && !/v3-lyric-placeholder/.test(html)) fail(label, 'designed lyric placeholder is missing.');
    if (!expectedReview && (html.match(/class="v3-lyric-line"/g) || []).length < 12) fail(label, 'flowing lyric placeholder has fewer than twelve lines.');
    if (!expectedReview && (html.match(/class="v3-lyric-gap"/g) || []).length < 6) fail(label, 'flowing lyric placeholder has fewer than six integrated gaps.');
    if (!expectedReview && /Cole aqui a linha|Verse 1|Verse 2/.test(html)) fail(label, 'editorial verse or line labels are still visible.');
    if (!expectedReview && /class="[^"]*(music-input|music-gap-answer|b1-music-gap)[^"]*"/.test(html)) {
        fail(label, 'unfinished lyric gaps are visible to the teacher.');
    }
    const speechControlCount = (html.match(/class="v3-speak-btn"/g) || []).length;
    const inlineUtteranceCount = (html.match(/class="[^"]*v3-dialogue-utterance[^"]*"/g) || []).length;
    if (!expectedReview && speechControlCount < 4) fail(label, 'per-line dialogue speech controls are missing.');
    if (!expectedReview && inlineUtteranceCount !== speechControlCount) fail(label, 'a dialogue speech control is not grouped beside its phrase.');
    if (!expectedReview && !/flashcard-pronounce-btn/.test(html)) fail(label, 'vocabulary pronunciation controls are missing.');
    const cardActionBarCount = (html.match(/class="v3-card-actions"/g) || []).length;
    const pronunciationControlCount = (html.match(/class="flashcard-pronounce-btn/g) || []).length;
    if (!expectedReview && cardActionBarCount < 4) fail(label, 'Useful Language cards do not expose their dedicated action bars.');
    if (!expectedReview && pronunciationControlCount < cardActionBarCount) fail(label, 'Useful Language pronunciation controls are incomplete.');
    if (!expectedReview && (html.match(/data-v3-translation-ready="true"/g) || []).length < 8) fail(label, 'contextual flashcard translations are incomplete.');
    if (/data-v3-translation-missing="true"/.test(html)) fail(label, 'a visible Portuguese support line has no translation.');
    if (moduleId === 'a1-v3' && number === 1 && !expectedReview) {
        if ((html.match(/class="dialogue-card"/g) || []).length !== 4) fail(label, 'early A1 stage does not show exactly four model dialogues.');
        if (!/Hello, Goodbye/.test(html) || !/The Beatles/.test(html)) fail(label, 'lesson 1 music selection is incorrect.');
    }
    if (!/id="next-btn"/.test(html) || !/id="prev-btn"/.test(html)) fail(label, 'lesson navigation controls are missing.');
    if (/não encontrada|not found/i.test(html)) fail(label, 'lesson rendered an error state.');
}

async function main() {
    for (const [moduleId, number, review] of samples) {
        const desktop = await render(moduleId, number, false);
        inspect(desktop, moduleId, number, review, false);
    }
    for (const [moduleId, number, review] of samples.filter(([, number]) => number !== 32)) {
        const mobile = await render(moduleId, number, true);
        inspect(mobile, moduleId, number, review, true);
    }

    if (failures.length) {
        console.error(`V3 browser render audit failed with ${failures.length} issue(s):`);
        failures.forEach(item => console.error(`- ${item}`));
        process.exitCode = 1;
    } else {
        console.log('V3 browser render audit passed: 15 representative desktop/mobile renders, session timing, missions, review classification, placeholders and controls checked.');
    }
}

main()
    .catch(error => {
        console.error(error.stack || error.message);
        process.exitCode = 1;
    })
    .finally(() => {
        const resolved = path.resolve(tempRoot);
        const systemTemp = path.resolve(os.tmpdir()) + path.sep;
        if (resolved.startsWith(systemTemp)) fs.rmSync(resolved, { recursive: true, force: true });
    });
