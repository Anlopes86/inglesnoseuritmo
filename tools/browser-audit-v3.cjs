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

global.window = {};
require(path.join(root, 'js', 'v3-curriculum.js'));
const curriculum = window.V3Curriculum;
const samples = Object.keys(curriculum.modules).flatMap(moduleId => {
    const lessons = curriculum.getModule(moduleId);
    return [
        [moduleId, lessons.find(lesson => lesson.type === 'content').number, false],
        [moduleId, lessons.find(lesson => lesson.type === 'review' || (lesson.type === 'project' && lesson.number === 32)).number, true]
    ];
});

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
        '--no-first-run',
        '--disable-component-update',
        '--disable-background-networking',
        '--in-process-gpu',
        '--disable-gpu',
        '--disable-gpu-compositing',
        '--disable-features=Vulkan,Graphite',
        '--use-angle=swiftshader',
        '--allow-file-access-from-files',
        '--run-all-compositor-stages-before-draw',
        '--virtual-time-budget=7000',
        `--window-size=${size}`,
        `--user-data-dir=${profile}`,
        '--dump-dom',
        url
    ], { encoding: 'utf8', maxBuffer: 35 * 1024 * 1024, timeout: 30000, windowsHide: true });
    return stdout;
}

function inspect(html, moduleId, number, expectedReview, mobile) {
    const label = `${moduleId} L${String(number).padStart(2, '0')} ${mobile ? '390×844' : '1440×1000'}`;
    const advanced = moduleId === 'b2-v3' || moduleId === 'c1-v3';
    if (/lição não encontrada|lesson not found|conteúdo da lição não encontrado/i.test(html)) fail(label, 'estado de erro renderizado.');

    if (advanced) {
        const slides = (html.match(/class="advanced-slide/g) || []).length;
        if (slides !== 10) fail(label, `esperadas 10 etapas, encontradas ${slides}.`);
        const minutes = [...html.matchAll(/data-minutes="(\d+)"/g)].map(match => Number(match[1]));
        if (minutes.reduce((sum, value) => sum + value, 0) !== 60) fail(label, 'a sessão avançada não soma 60 minutos.');
        const oral = [...html.matchAll(/data-oral-minutes="(\d+)"/g)].map(match => Number(match[1])).reduce((sum, value) => sum + value, 0);
        if (expectedReview && oral !== 45) fail(label, `a revisão registra ${oral}, não 45 minutos orais.`);
        if (expectedReview && !/Attempt · Twist · Retry/.test(html)) fail(label, 'ciclo tentativa–mudança–segunda tentativa ausente.');
        if (expectedReview && !/CEFR evidence|CEFR Evidence/.test(html)) fail(label, 'evidência CEFR ausente.');
        if (!/id="advanced-prev"/.test(html) || !/id="advanced-next"/.test(html)) fail(label, 'navegação avançada ausente.');
        if (!/aria-hidden="(?:true|false)"/.test(html)) fail(label, 'estado acessível dos slides ausente.');
        return;
    }

    if (!/v3-session-ready/.test(html)) fail(label, 'framework de 60 minutos não inicializou.');
    const minutes = [...html.matchAll(/data-v3-minutes="(\d+)"/g)].map(match => Number(match[1]));
    if (minutes.reduce((sum, value) => sum + value, 0) !== 60) fail(label, 'a sessão não soma 60 minutos.');
    const reviewMatch = html.match(/data-v3-review="(true|false)"/);
    if (!reviewMatch || reviewMatch[1] !== String(expectedReview)) fail(label, 'classificação conteúdo/revisão incorreta.');
    if (expectedReview && !/Primeira tentativa|First Attempt/.test(html)) fail(label, 'primeira tentativa ausente.');
    if (expectedReview && !/Condição inesperada|Unexpected Condition/.test(html)) fail(label, 'condição inesperada ausente.');
    if (expectedReview && !/Segunda tentativa|Second Attempt/.test(html)) fail(label, 'segunda tentativa ausente.');
    if (expectedReview && !/Foco do professor|Teacher focus/i.test(html)) fail(label, 'foco de correção docente ausente.');
    if (expectedReview && !/Evidência CEFR|CEFR evidence/i.test(html)) fail(label, 'evidência CEFR ausente.');
    if (!/id="next-btn"/.test(html) || !/id="prev-btn"/.test(html)) fail(label, 'navegação da lição ausente.');
}

async function main() {
    for (const [moduleId, number, review] of samples) {
        inspect(await render(moduleId, number, false), moduleId, number, review, false);
        inspect(await render(moduleId, number, true), moduleId, number, review, true);
    }
    if (failures.length) {
        console.error(`V3 browser render audit failed with ${failures.length} issue(s):`);
        failures.forEach(item => console.error(`- ${item}`));
        process.exitCode = 1;
    } else {
        console.log(`V3 browser render audit passed: ${samples.length * 2} content/review renders across five levels at 1440×1000 and 390×844.`);
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
