// js/firebase-config.js

// Este objeto contém as "credenciais" do seu projeto Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyA4srp5nACEhOLLD8Yd4cwe5_rZ8izcm1Y",
    authDomain: "inglesnoseuritmo-bae14.firebaseapp.com",
    projectId: "inglesnoseuritmo-bae14",
    storageBucket: "inglesnoseuritmo-bae14.appspot.com",
    messagingSenderId: "112615489735",
    appId: "1:112615489735:web:9ee215ab9a2246f3a13ee2"
};

// Esta linha inicializa a conexão com o Firebase.
// A verificação 'if' garante que isso aconteça apenas uma vez,
// mesmo que o arquivo seja carregado em várias páginas.
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}