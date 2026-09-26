import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// Configuración de tu proyecto Firebase MyHero
const firebaseConfig = {
  apiKey: "AIzaSyDSDhluqxbXQcNuJkoPOpyzvBYpB51PVlk",
  authDomain: "myhero-b3b79.firebaseapp.com",
  projectId: "myhero-b3b79",
  storageBucket: "myhero-b3b79.firebasestorage.app",
  messagingSenderId: "742905702597",
  appId: "1:742905702597:web:5f0e60c2c259760c4de8ac",
  measurementId: "G-9K8LP86YTB"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Módulos de Firebase
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Proveedor de Google
const googleProvider = new GoogleAuthProvider();

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
    ref,
    uploadBytes,
    getDownloadURL
};
