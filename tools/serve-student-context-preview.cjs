// Isolated preview: every HTML document receives a fake Firebase, never real credentials/data.
const fs = require('node:fs'), path = require('node:path'), http = require('node:http');
const root = path.resolve(__dirname, '..');
const mock = '(' + function () {
    const params = new URLSearchParams(location.search);
    const uid = params.get('as') === 'student' ? 'qa-a' : 'qa-teacher';
    const student = name => ({ role: 'aluno', teacherId: 'qa-teacher', name, modules: ['a1-v3', 'a2-v3', 'b1-v3', 'b2-v3', 'c1-v3'], progress: {} });
    const profiles = { 'qa-teacher': { role: 'professor' }, 'qa-a': student('Aluno A fictício'), 'qa-b': student('Aluno B fictício') };
    const writes = JSON.parse(localStorage.getItem('qa-context-writes') || '[]');
    const report = () => { const el = document.getElementById('qa-writes'); if (el) el.textContent = writes.length ? writes.map(w => w.path).join(' | ') : 'Nenhuma gravação'; };
    const write = async (path, data) => { writes.push({ path, data }); localStorage.setItem('qa-context-writes', JSON.stringify(writes)); report(); };
    const collection = prefix => ({ doc: id => {
        const path = prefix + '/' + id;
        return { get: async () => ({ exists: !!profiles[id], data: () => profiles[id] }),
            update: data => write(path, data), set: data => write(path, data), collection: name => collection(path + '/' + name) };
    }});
    const db = { collection };
    const auth = { currentUser: { uid }, onAuthStateChanged: cb => { Promise.resolve().then(() => cb(auth.currentUser)); return () => {}; }, setPersistence: async () => {} };
    function firestore() { return db; } firestore.FieldValue = { serverTimestamp: () => new Date().toISOString() };
    function getAuth() { return auth; } getAuth.Auth = { Persistence: { LOCAL: 'local' } };
    window.firebase = { apps: [{}], app() {}, auth: getAuth, firestore };
    document.addEventListener('DOMContentLoaded', () => {
        const bar = document.createElement('aside');
        bar.style.cssText = 'position:relative;z-index:9999;padding:8px;background:#e0f2fe;color:#075985;font:12px sans-serif';
        bar.innerHTML = '<strong>PRÉVIA ISOLADA · dados fictícios</strong> <button id="qa-switch">Selecionar B no armazenamento compartilhado</button> <output id="qa-writes"></output>';
        document.body.prepend(bar); report();
        document.getElementById('qa-switch').onclick = () => { localStorage.setItem('selectedStudentId', 'qa-b'); document.getElementById('qa-switch').textContent = 'Seleção compartilhada: B'; };
    });
}.toString() + ')();';
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };
http.createServer((req, res) => {
    try {
        const url = new URL(req.url, 'http://127.0.0.1:8770');
        const file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
        const relative = path.relative(root, file);
        if (relative.startsWith('..') || path.isAbsolute(relative) || relative.split(path.sep).some(p => p.startsWith('.'))) throw Error('Invalid path');
        let body = fs.readFileSync(file);
        if (path.extname(file) === '.html') {
            body = body.toString().replace(/<script\b[^>]*src=["']https:\/\/www\.gstatic\.com\/firebasejs\/[^"']+["'][^>]*>\s*<\/script>/gi, '');
            body = body.replace(/<head>/i, '<head><script>' + mock + '</script>');
        }
        res.writeHead(200, { 'Content-Type': (types[path.extname(file)] || 'application/octet-stream') + '; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(body);
    } catch { res.writeHead(404); res.end('Not found'); }
}).listen(8770, '127.0.0.1', () => console.log('Isolated preview: http://127.0.0.1:8770/a1-v3/a1-v3.html?studentId=qa-a'));
