const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');

const root = path.resolve(__dirname, '..');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9341;
const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'inr-premium-audit-'));

const teacher = {
    name: 'Professor Demo', email: 'professor@inglesnoseuritmo.com', role: 'professor',
    platformPlan: 'pro', subscriptionStatus: 'active', studentLimit: 40, billingCycle: 'monthly'
};
const admin = {
    name: 'Admin Demo', email: 'admin@inglesnoseuritmo.com', role: 'admin',
    platformPlan: 'admin', subscriptionStatus: 'active', accessibleProducts: ['*']
};
const student = {
    name: 'Marina Costa', email: 'marina@inglesnoseuritmo.com', role: 'aluno', teacherId: 'teacher-1',
    studentType: 'a1-v3', modules: ['a1', 'a1-v3', 'a2-v3', 'conversation'],
    accessibleProducts: ['a1', 'a1-v3', 'a2-v3', 'conversation'], classCount: 6, pacoteContratado: 16,
    valorPacote: 700, dataInicioPacote: '01/07/2026', lastClassRegisteredAt: '2026-07-18T14:30:00-03:00',
    progress: {
        a1: { lesson_1: true, lesson_2: true, lesson_3: true, lesson_4: true },
        'a1-v3': { lesson_1: true, lesson_2: true },
        'a2-v3': { lesson_1: true },
        conversation: { lesson_1: true, lesson_2: true, lesson_3: true }
    }
};
const teacherPastDue = {
    name: 'Teacher Past Due', email: 'attention@example.com', role: 'professor',
    platformPlan: 'starter', subscriptionStatus: 'past_due', studentLimit: 10, billingCycle: 'monthly'
};

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForChrome() {
    for (let attempt = 0; attempt < 40; attempt += 1) {
        try {
            const response = await fetch(`http://127.0.0.1:${port}/json/version`);
            if (response.ok) return;
        } catch (_) {}
        await wait(150);
    }
    throw new Error('Chrome DevTools did not become available.');
}

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
        this.socket.addEventListener('message', (event) => {
            const payload = JSON.parse(event.data);
            if (!payload.id || !this.pending.has(payload.id)) return;
            const { resolve, reject } = this.pending.get(payload.id);
            this.pending.delete(payload.id);
            if (payload.error) reject(new Error(payload.error.message));
            else resolve(payload.result);
        });
    }

    request(method, params = {}) {
        const id = this.nextId++;
        return new Promise((resolve, reject) => {
            this.pending.set(id, { resolve, reject });
            this.socket.send(JSON.stringify({ id, method, params }));
        });
    }

    close() {
        this.socket.close();
    }
}

function fakeFirebaseScript(role) {
    const currentId = role === 'admin' ? 'admin-1' : role === 'professor' ? 'teacher-1' : 'student-1';
    return `(() => {
        const records = ${JSON.stringify({ 'admin-1': admin, 'teacher-1': teacher, 'teacher-2': teacherPastDue, 'student-1': student })};
        const currentUser = { uid: '${currentId}', email: records['${currentId}'].email };
        const makeDoc = (id) => ({ id, exists: Boolean(records[id]), data: () => records[id] || {}, ref: { id } });
        const makeQuery = (conditions = []) => ({
            where(field, op, value) { return makeQuery([...conditions, [field, value]]); },
            async get() {
                const docs = Object.entries(records)
                    .filter(([, data]) => conditions.every(([field, value]) => data[field] === value))
                    .map(([id]) => makeDoc(id));
                return { docs, size: docs.length, empty: docs.length === 0, forEach(callback) { docs.forEach(callback); } };
            }
        });
        const db = {
            collection() {
                return Object.assign(makeQuery(), {
                    doc(id) { return { async get() { return makeDoc(id); }, async update() {}, async set() {}, async delete() {} }; }
                });
            },
            batch() { return { update() {}, async commit() {} }; },
            async runTransaction(callback) { return callback({ async get(ref) { return ref.get(); }, update() {} }); }
        };
        const auth = {
            currentUser,
            onAuthStateChanged(callback) { Promise.resolve().then(() => callback(currentUser)); },
            async signOut() {}
        };
        function firestore() { return db; }
        firestore.FieldValue = { serverTimestamp: () => new Date(), arrayUnion: (...values) => values };
        firestore.Timestamp = { now: () => new Date() };
        function firebaseAuth() { return auth; }
        window.firebase = { apps: [{}], firestore, auth: firebaseAuth, app: () => ({ options: {} }), initializeApp() { return window.firebase; } };
        ${role === 'professor' ? "localStorage.setItem('selectedStudentId', 'student-1'); localStorage.setItem('selectedStudentName', 'Marina Costa'); localStorage.setItem('insr-theme', 'dark');" : ''}
    })();`;
}

async function createTarget() {
    const response = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' });
    if (!response.ok) throw new Error(`Could not create Chrome target: ${response.status}`);
    const target = await response.json();
    const client = new CdpClient(target.webSocketDebuggerUrl);
    await client.open();
    return client;
}

async function render(name, file, width, height, role = null) {
    const client = await createTarget();
    await client.request('Page.enable');
    await client.request('Runtime.enable');
    await client.request('Network.enable');
    await client.request('Emulation.setDeviceMetricsOverride', {
        width, height, deviceScaleFactor: 1, mobile: width < 600, screenWidth: width, screenHeight: height
    });
    if (role) {
        await client.request('Network.setBlockedURLs', { urls: ['*gstatic.com/firebasejs/*'] });
        await client.request('Page.addScriptToEvaluateOnNewDocument', { source: fakeFirebaseScript(role) });
    }

    const url = pathToFileURL(path.join(root, file)).href;
    await client.request('Page.navigate', { url });
    await wait(role ? 4500 : 2500);

    const metrics = await client.request('Runtime.evaluate', {
        expression: `JSON.stringify({
            width: innerWidth,
            height: innerHeight,
            scrollWidth: document.documentElement.scrollWidth,
            scrollHeight: document.documentElement.scrollHeight,
            title: document.title,
            path: location.pathname,
            visibleCards: [...document.querySelectorAll('.student-module-card,.module-card,.teacher-card,.price-card,.deck-card')].filter(el => getComputedStyle(el).display !== 'none').length,
            conversationLimit: document.querySelector('[data-conversation-lesson-limit]')?.textContent.trim() || null,
            conversationSummaryBackground: (() => {
                const element = document.querySelector('[data-conversation-access-summary]');
                return element ? getComputedStyle(element).backgroundColor : null;
            })()
        })`, returnByValue: true
    });
    const parsed = JSON.parse(metrics.result.value);
    const screenshot = await client.request('Page.captureScreenshot', { format: 'png', fromSurface: true });
    const output = path.join(root, `.audit-${name}.png`);
    fs.writeFileSync(output, Buffer.from(screenshot.data, 'base64'));
    client.close();

    if (parsed.scrollWidth > parsed.width + 1) {
        throw new Error(`${name}: horizontal overflow ${parsed.scrollWidth}px > ${parsed.width}px`);
    }
    if (file === 'index.html' && role === 'professor') {
        if (parsed.conversationLimit !== '32') {
            throw new Error(`${name}: expected 32 conversation lessons for the Pack 32 teacher, got ${parsed.conversationLimit}`);
        }
        if (!parsed.conversationSummaryBackground || parsed.conversationSummaryBackground === 'rgba(248, 250, 252, 0.8)') {
            throw new Error(`${name}: conversation summary did not inherit the dark surface background`);
        }
    }
    console.log(`${name}: ${parsed.width}x${parsed.height}, scroll ${parsed.scrollWidth}x${parsed.scrollHeight}, cards ${parsed.visibleCards}, ${parsed.path}`);
}

async function main() {
    const chrome = spawn(chromePath, [
        '--headless=new', '--disable-gpu', '--allow-file-access-from-files', '--no-first-run',
        `--remote-debugging-port=${port}`, `--user-data-dir=${profileDir}`, 'about:blank'
    ], { windowsHide: true, stdio: 'ignore' });

    try {
        await waitForChrome();
        await render('landing-mobile-cdp', 'home.html', 390, 844);
        await render('student-mobile', 'home-aluno.html', 390, 844, 'aluno');
        await render('flashcards-desktop', 'flashcards-app.html', 1440, 1000, 'aluno');
        await render('flashcards-mobile', 'flashcards-app.html', 390, 844, 'aluno');
        await render('teacher-desktop', 'index.html', 1440, 1000, 'professor');
        await render('teacher-mobile', 'index.html', 390, 844, 'professor');
        await render('admin-desktop', 'admin.html', 1440, 1000, 'admin');
        await render('admin-mobile', 'admin.html', 390, 844, 'admin');
    } finally {
        await new Promise((resolve) => {
            chrome.once('exit', resolve);
            chrome.kill();
            setTimeout(resolve, 1500);
        });
        try {
            fs.rmSync(profileDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 250 });
        } catch (error) {
            console.warn(`Temporary Chrome profile could not be fully removed: ${error.code || error.message}`);
        }
    }
}

main().catch((error) => {
    console.error(error.stack || error.message);
    process.exitCode = 1;
});
