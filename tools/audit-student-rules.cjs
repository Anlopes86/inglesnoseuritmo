// Run against the local Firestore emulator only. Never uses production credentials.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { initializeTestEnvironment, assertSucceeds, assertFails } = require('@firebase/rules-unit-testing');
const { doc, getDoc, setDoc, updateDoc, deleteDoc, deleteField, setLogLevel, writeBatch } = require('firebase/firestore');
const projectId = 'demo-insr-security';
const endpoint = process.env.FIRESTORE_EMULATOR_HOST;
if (!/^127\.0\.0\.1:\d+$/.test(endpoint || '')) {
    throw new Error('Defina FIRESTORE_EMULATOR_HOST=127.0.0.1:8085. Este teste exige o emulador local.');
}
setLogLevel('silent');
(async () => {
    const env = await initializeTestEnvironment({ projectId, firestore: {
        host: '127.0.0.1', port: Number(endpoint.split(':')[1]), rules: fs.readFileSync('firestore.rules', 'utf8')
    }});
    let checks = 0;
    const allow = async promise => { await assertSucceeds(promise); checks++; };
    const deny = async promise => { await assertFails(promise); checks++; };
    try {
        await env.clearFirestore();
        await env.withSecurityRulesDisabled(async context => {
            const db = context.firestore();
            const profiles = {
                teacher: { role: 'professor' }, other: { role: 'professor' }, admin: { role: 'admin' },
                a: { role: 'aluno', teacherId: 'teacher', modules: ['a1-v3'], pacoteContratado: 16, classCount: 2, progress: {} },
                b: { role: 'aluno', teacherId: 'other', progress: {} },
                legacy: { role: 'aluno' }
            };
            await Promise.all(Object.entries(profiles).map(([id, data]) => setDoc(doc(db, 'students', id), data)));
        });
        const as = uid => env.authenticatedContext(uid).firestore();
        const student = as('a'), teacher = as('teacher'), other = as('other'), admin = as('admin');
        const own = doc(student, 'students/a');
        await allow(getDoc(own));
        await allow(updateDoc(own, { 'progress.a1-v3.byId.first-class': true, 'progress.a1-v3.version': 'test' }));
        await allow(updateDoc(doc(as('legacy'), 'students/legacy'), { progress: { 'a1-v3': {} } }));
        for (const patch of [
            { modules: ['c1-v3'] }, { accessibleProducts: ['c1-v3'] }, { studentType: 'c1-v3' },
            { pacoteContratado: 999 }, { classCount: 0 }, { valorPacote: 0 },
            { role: 'admin' }, { teacherId: 'other' }, { name: 'changed' },
            { modules: deleteField() }, { progress: 'invalid' }, { progress: deleteField() },
            { progress: {}, modules: ['c1-v3'] }
        ]) await deny(updateDoc(own, patch));
        await deny(setDoc(own, { role: 'aluno', progress: {} }));
        await deny(deleteDoc(own));
        await deny(updateDoc(doc(student, 'students/b'), { progress: {} }));
        await deny(getDoc(doc(student, 'students/b')));
        await deny(updateDoc(doc(other, 'students/a'), { classCount: 1 }));
        await allow(updateDoc(doc(teacher, 'students/a'), { modules: ['a1-v3', 'a2-v3'], classCount: 3, pacoteContratado: 20 }));
        await deny(updateDoc(doc(teacher, 'students/a'), { role: 'admin' }));
        await deny(updateDoc(doc(teacher, 'students/a'), { teacherId: 'other' }));
        await allow(updateDoc(doc(admin, 'students/a'), { classCount: 4 }));
        const card = { f: 'to order', b: 'pedir', l: 'Café' };
        await allow(setDoc(doc(student, 'users/a/myCards/card'), card));
        await allow(setDoc(doc(student, 'users/a/ratings/card'), { level: 'easy' }));
        await allow(setDoc(doc(teacher, 'users/a/myCards/teacher-card'), card));
        await allow(setDoc(doc(admin, 'users/a/myCards/admin-card'), card));
        await deny(setDoc(doc(other, 'users/a/myCards/foreign'), card));
        await deny(setDoc(doc(student, 'users/b/myCards/foreign'), card));
        await deny(updateDoc(doc(env.unauthenticatedContext().firestore(), 'students/a'), { progress: {} }));
        await deny(updateDoc(doc(as('missing'), 'students/a'), { progress: {} }));
        const forbiddenBatch = writeBatch(other);
        forbiddenBatch.delete(doc(other, 'users/a/myCards/card'));
        forbiddenBatch.delete(doc(other, 'users/a/ratings/card'));
        await deny(forbiddenBatch.commit());
        assert((await getDoc(doc(student, 'users/a/myCards/card'))).exists(), 'Denied deletion must preserve the card');
        const deletion = writeBatch(student);
        deletion.delete(doc(student, 'users/a/myCards/card'));
        deletion.delete(doc(student, 'users/a/ratings/card'));
        await allow(deletion.commit());
        assert(!(await getDoc(doc(student, 'users/a/myCards/card'))).exists());
        assert(!(await getDoc(doc(student, 'users/a/ratings/card'))).exists());
        const retry = writeBatch(student);
        retry.delete(doc(student, 'users/a/myCards/card'));
        retry.delete(doc(student, 'users/a/ratings/card'));
        await allow(retry.commit());
        console.log(`PASS: ${checks} Firestore authorization checks in ${projectId}.`);
    } finally { await env.cleanup(); }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
