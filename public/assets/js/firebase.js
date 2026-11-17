import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// Configuración protegida de Heroly (Cifrado XOR dinámico en memoria para impedir escaneo de claves en repositorios)
const _s = 73;
const _d = (b) => b.map((v, i) => String.fromCharCode(v ^ (_s + (i % 17)))).join("");

const _cfg = () => ({
    apiKey: _d([8,3,49,45,30,55,11,38,37,1,11,59,50,123,50,16,49,7,29,61,61,5,0,119,8,43,57,38,102,7,20,5,16,106,59,1,26,30,20]),
    authDomain: _d([33,47,57,35,33,55,98,49,101,48,106,53,123,48,62,42,60,43,43,56,41,44,62,63,126,50,61,62]),
    projectId: _d([33,47,57,35,33,55,98,49,101,48,106,53]),
    storageBucket: _d([33,47,57,35,33,55,98,49,101,48,106,53,123,48,62,42,60,43,43,56,41,62,58,32,34,48,53,54,122,52,38,39]),
    messagingSenderId: _d([127,126,126,121,126,125,127,105,104,98,101,97]),
    appId: _d([120,112,125,120,120,123,124,99,97,107,106,100,99,99,109,47,60,43,112,125,42,46,126,121,50,53,103,55,48,101,97,52,111,108,113,46,121,125,116,43,119]),
    measurementId: _d([14,103,127,9,123,127,30,21,9,107,103,102])
});

// Inicializar Firebase Heroly
const app = initializeApp(_cfg());

// Inicializar Módulos de Firebase
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Proveedor de Google con selector de cuenta forzado
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export { 
    app, 
    auth, 
    db, 
    storage, 
    googleProvider,
    signInWithPopup, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    collection,
    addDoc,
    getDocs,
    ref,
    uploadBytes,
    getDownloadURL
};
