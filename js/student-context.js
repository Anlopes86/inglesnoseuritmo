(function (scope) {
    'use strict';

    // The seed is captured when Firebase starts, before any asynchronous loading.
    // Never re-read the dashboard's global selection during a lesson save.
    const seed = scope.StudentContextSeed || {};
    const requested = seed.studentId || null;
    let viewerId = seed.viewerId || null;
    let verified = null;

    class StudentContextError extends Error {
        constructor(message) { super(message); this.name = 'StudentContextError'; }
    }

    function link(href, context = verified) {
        if (!context) return href;
        const url = new URL(href, scope.location.href);
        if (url.origin !== scope.location.origin) return href;
        if (['professor', 'admin'].includes(context.role) && context.studentId) {
            url.searchParams.set('studentId', context.studentId);
        } else {
            url.searchParams.delete('studentId');
        }
        return url.href;
    }

    async function resolve(db, user) {
        if (!user) throw new StudentContextError('Entre na sua conta antes de salvar.');
        if (viewerId && viewerId !== user.uid) throw new StudentContextError('A conta mudou. Reabra a aula pelo painel.');
        viewerId = user.uid;
        verified = null;
        const viewer = await db.collection('students').doc(user.uid).get();
        const role = viewer.exists ? viewer.data().role : null;
        if (!['aluno', 'professor', 'admin'].includes(role)) throw new StudentContextError('Não foi possível validar seu perfil. Entre novamente.');
        let studentId = user.uid;
        let studentDoc = viewer;
        if (role !== 'aluno') {
            if (!requested) throw new StudentContextError('Selecione o aluno no painel e reabra esta aula.');
            studentId = requested;
            studentDoc = await db.collection('students').doc(studentId).get();
            if (!studentDoc.exists || studentDoc.data().role !== 'aluno' ||
                (role === 'professor' && studentDoc.data().teacherId !== user.uid)) {
                throw new StudentContextError('Você não tem acesso ao aluno desta aula.');
            }
        }
        // Authentication may change while a profile read is in flight.
        if (scope.firebase.auth().currentUser?.uid !== user.uid) {
            throw new StudentContextError('A conta mudou. Reabra a aula pelo painel.');
        }
        verified = { role, studentId, viewerId: user.uid, studentDoc };
        return verified;
    }

    function wireLinks(context) {
        if (!/\/(?:a1|a2|b1|b2|c1)-v3\//.test(scope.location.pathname)) return;
        // Preserve the validated context on reload and on returning to the hub.
        scope.history.replaceState(scope.history.state, '', link(scope.location.href, context));
        document.querySelectorAll('a[href]').forEach(anchor => {
            const href = anchor.getAttribute('href');
            if (!href || href.startsWith('#')) return;
            const url = new URL(href, scope.location.href);
            if (url.origin === scope.location.origin && /(?:licao-\d+|(?:a1|a2|b1|b2|c1)-v3|home-aluno)\.html$/.test(url.pathname)) {
                anchor.href = link(href, context);
            }
        });
    }

    scope.StudentContext = Object.freeze({ resolve, link, wireLinks });
}(window));
