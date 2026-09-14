// js/firebase-config.js

// Configuração oficial do seu projeto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA4srp5nACEhOLLD8Yd4cwe5_rZ8izcm1Y",
    authDomain: "inglesnoseuritmo-bae14.firebaseapp.com",
    projectId: "inglesnoseuritmo-bae14",
    storageBucket: "inglesnoseuritmo-bae14.appspot.com",
    messagingSenderId: "112615489735",
    appId: "1:112615489735:web:9ee215ab9a2246f3a13ee2"
};

// Capture the lesson owner once, before loading the shared context helper.
if (!window.StudentContextReady) {
    const pageQuery = new URLSearchParams(window.location.search);
    let selectedAtOpen = null;
    try { selectedAtOpen = localStorage.getItem('selectedStudentId'); } catch (_) {}
    window.StudentContextSeed = Object.freeze({
        studentId: pageQuery.has('studentId') ? pageQuery.get('studentId') : selectedAtOpen
    });
    const contextUrl = new URL('student-context.js', document.currentScript.src).href;
    window.StudentContextReady = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = contextUrl;
        const timer = setTimeout(() => reject(new Error('Não foi possível carregar o contexto do aluno. Recarregue a página.')), 15000);
        script.onload = () => { clearTimeout(timer); resolve(window.StudentContext); };
        script.onerror = () => { clearTimeout(timer); reject(new Error('Não foi possível carregar o contexto do aluno. Recarregue a página.')); };
        document.head.appendChild(script);
    });
    // Pages which do not save study data need not consume this promise.
    window.StudentContextReady.catch(() => {});
}

// Inicializa o Firebase apenas se ele ainda não tiver sido inicializado
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase inicializado com sucesso.");
} else {
    firebase.app(); // Se já inicializado, utiliza o app existente
}

/**
 * Variáveis Globais de Serviço
 * Usamos 'var' para garantir o escopo global entre diferentes arquivos .js
 */
var auth = firebase.auth();
var db = firebase.firestore();

window.StudentContextReady.then(context => {
    if (!/\/(?:a1|a2|b1|b2|c1)-v3\//.test(window.location.pathname)) return;
    auth.onAuthStateChanged(async user => {
        if (!user) return;
        try { context.wireLinks(await context.resolve(db, user)); }
        catch (error) { console.warn('Contexto da aula indisponível:', error.message); }
    });
}).catch(() => {});

// Configurações de persistência (opcional, mantém o usuário logado mesmo fechando o navegador)
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch((error) => {
        console.error("Erro ao configurar persistência:", error.message);
    });
