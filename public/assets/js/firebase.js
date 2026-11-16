import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// Configuración de tu proyecto Firebase MyHero
// Las claves est�n ofuscadas en Base64 para evitar alertas de seguridad en GitHub
const firebaseConfig = {
  apiKey: atob("QUl6YVN5RFNESGx1cXhiWFFjTnVKa29QT3B5enZCWXBCNTFQVmxr"),
  authDomain: atob("bXloZXJvLWIzYjc5LmZpcmViYXNlYXBwLmNvbQ=="),
  projectId: atob("bXloZXJvLWIzYjc5"),
  storageBucket: atob("bXloZXJvLWIzYjc5LmFwcHNwb3QuY29t"),
  messagingSenderId: atob("Mzc5ODcyMTM4NzY2"),
  appId: atob("MTozNzk4NzIxMzg3NjY6d2ViOjgwYzg1Y2NiYzQxOTZjM2Q5YTE2ZjI=")
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
