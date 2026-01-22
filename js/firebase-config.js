// js/firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyA4srp5nACEhOLLD8Yd4cwe5_rZ8izcm1Y",
    authDomain: "inglesnoseuritmo-bae14.firebaseapp.com",
    projectId: "inglesnoseuritmo-bae14",
    storageBucket: "inglesnoseuritmo-bae14.appspot.com",
    messagingSenderId: "112615489735",
    appId: "1:112615489735:web:9ee215ab9a2246f3a13ee2"
};

// Inicializa o Firebase apenas uma vez
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Exporta as variáveis globais para os outros scripts
const auth = firebase.auth();
const db = firebase.firestore();