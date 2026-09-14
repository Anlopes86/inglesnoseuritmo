const assert = require('node:assert/strict'), fs = require('node:fs'), vm = require('node:vm');
// Real module/access/context code with an isolated document and database.
async function audit(modules, allowed) {
    const cards = [], callbacks = [];
    const student = { role: 'aluno', modules, accessibleProducts: modules, progress: {} };
    const loading = { textContent: '', classList: { add() {}, remove() {} } };
    const grid = { innerHTML: '', classList: loading.classList, appendChild: card => cards.push(card) };
    const document = {
        addEventListener: (event, callback) => { if (event === 'DOMContentLoaded') callbacks.push(callback); },
        getElementById: id => id === 'loading' ? loading : grid,
        querySelectorAll: () => [],
        createElement: () => ({ dataset: {}, className: '', attrs: {}, setAttribute(name, value) { this.attrs[name] = value; }, addEventListener() {} })
    };
    const db = { collection: () => ({ doc: id => ({ get: async () => ({ exists: id === 'test-student', data: () => student }) }) }) };
    const auth = { currentUser: { uid: 'test-student' }, onAuthStateChanged(callback) { callback(this.currentUser); } };
    const firebase = { auth: () => auth, firestore: () => db };
    const window = { db, firebase, console, location: new URL('http://localhost/a2-v3/a2-v3.html'), history: { state: null, replaceState() {} }, StudentContextSeed: {} };
    const context = vm.createContext({ window, document, firebase, console, URL, URLSearchParams, localStorage: { getItem: () => null } });
    for (const file of ['js/v3-curriculum.js', 'js/platform-access.js', 'js/student-context.js', 'js/a2-v3-module.js']) {
        vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
    }
    window.StudentContextReady = Promise.resolve(window.StudentContext);
    callbacks.forEach(callback => callback());
    for (let i = 0; i < 10; i++) await new Promise(resolve => setImmediate(resolve));
    if (allowed) {
        assert.equal(cards.length, 32);
        assert.equal(cards.filter(card => card.attrs['aria-disabled'] === 'true').length, 31);
        assert.equal(new URL(cards[0].href).pathname, '/a2-v3/licao-01.html');
        assert.equal(new URL(cards[0].href).searchParams.get('studentId'), null);
    } else {
        assert.equal(cards.length, 0);
        assert.match(loading.textContent, /não possui acesso/);
    }
    console.log(`${JSON.stringify(modules)}: ${allowed ? 'allowed' : 'denied'} OK`);
}
(async () => {
    for (const [modules, allowed] of [[['a2-v3'], true], [['a2'], true], [['a2-v2'], false], [['a1-v3', 'b1-v3'], false], [[], false]]) await audit(modules, allowed);
})().catch(error => { console.error(error); process.exitCode = 1; });
