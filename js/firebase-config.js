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

// Configurações de persistência (opcional, mantém o usuário logado mesmo fechando o navegador)
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch((error) => {
        console.error("Erro ao configurar persistência:", error.message);
    });