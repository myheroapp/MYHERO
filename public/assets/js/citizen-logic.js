import { auth, db, onAuthStateChanged, signOut, doc, getDoc, setDoc } from './firebase.js';
import { collection, addDoc, onSnapshot, deleteDoc, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let currentUser = null;
let currentMissionId = null;
let unsubscribeMission = null;

// Elementos del DOM
const btnSolicitarMision = document.getElementById('btnSolicitarMision');
const btnCancelarMision = document.getElementById('btnCancelarMision');
const searchingState = document.getElementById('searchingState');
const btnLogout = document.getElementById('btnLogout');
const userNameDisplay = document.getElementById('userNameDisplay');

// 1. Autenticación y Protección de Ruta
onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        
        try {
            // Cargar datos del usuario o crearlos si no existen por error previo
            const userDocRef = doc(db, "users", user.uid);
            let userDoc = await getDoc(userDocRef);
            
            if(!userDoc.exists()) {
                // Auto-reparación si el perfil no se guardó por el bloqueo anterior
                await setDoc(userDocRef, {
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName || 'Ciudadano',
                    role: 'ciudadano',
                    createdAt: new Date().toISOString()
                });
                userDoc = await getDoc(userDocRef);
            }

            if(userNameDisplay) {
                userNameDisplay.textContent = userDoc.data().name || user.email;
            }
            
            // Comprobar si ya tiene una misión buscando
            checkActiveMissions();
            
            // Cargar Catálogo (solo si hay conexión exitosa)
            loadHeroCatalog(); 
            
        } catch (error) {
            console.error("Error cargando perfil:", error);
            if (userNameDisplay) userNameDisplay.textContent = "Error de Conexión";
            alert("⚠️ BLOQUEO DE FIREBASE: No tienes permiso para leer la base de datos. Ve a Firestore -> Reglas y pon: allow read, write: if request.auth != null;");
        }
    } else {
        window.location.href = 'portal.html';
    }
});

// Cerrar sesión
if(btnLogout) {
    btnLogout.addEventListener('click', (e) => {
        e.preventDefault();
        signOut(auth).then(() => window.location.href = 'portal.html');
    });
}

// 2. Solicitar Misión
if(btnSolicitarMision) {
    btnSolicitarMision.addEventListener('click', async () => {
        if(!currentUser) return;
        
        const reqBeneficiary = document.getElementById('reqBeneficiary').value;
        const reqType = document.getElementById('reqType').value;
        const reqLevel = document.getElementById('reqLevel').value;

        // Ocultar botón, mostrar "buscando"
        btnSolicitarMision.classList.add('hidden');
        searchingState.classList.remove('hidden');

        try {
            const missionRef = await addDoc(collection(db, "misiones"), {
                citizenId: currentUser.uid,
                citizenName: userNameDisplay ? userNameDisplay.textContent : 'Ciudadano',
                beneficiary: reqBeneficiary,
                type: reqType,
                level: reqLevel,
                status: 'buscando',
                createdAt: new Date().toISOString()
            });
            
            currentMissionId = missionRef.id;
            listenToMission(currentMissionId);
        } catch (error) {
            console.error("Error al crear misión:", error);
            alert("No se pudo crear la solicitud. Revisa las reglas de Firestore.");
            resetUI();
        }
    });
}

// 3. Cancelar Misión
if(btnCancelarMision) {
    btnCancelarMision.addEventListener('click', async () => {
        if(!currentMissionId) return;
        try {
            await deleteDoc(doc(db, "misiones", currentMissionId));
            if(unsubscribeMission) unsubscribeMission();
            currentMissionId = null;
            resetUI();
        } catch (error) {
            console.error("Error al cancelar:", error);
        }
    });
}

// 4. Escuchar cambios en la misión en tiempo real
function listenToMission(missionId) {
    unsubscribeMission = onSnapshot(doc(db, "misiones", missionId), (docSnapshot) => {
        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            if (data.status === 'asignada') {
                // Un Hero ha aceptado!
                searchingState.innerHTML = `
                    <div class="bg-green-500/20 border border-green-500 p-4 rounded-xl mt-4">
                        <p class="text-green-400 font-extrabold mb-1">¡HERO ASIGNADO!</p>
                        <p class="text-white text-sm">Tu Hero está en camino.</p>
                    </div>
                `;
            }
        } else {
            // El documento fue borrado
            resetUI();
        }
    });
}

// Helper: Comprobar si ya hay misiones activas al cargar la página
function checkActiveMissions() {
    const q = query(collection(db, "misiones"), where("citizenId", "==", currentUser.uid));
    onSnapshot(q, (snapshot) => {
        // Filtrar localmente para evitar error de índice compuesto en Firebase
        const doc = snapshot.docs.find(d => d.data().status === 'buscando');
        if (doc) {
            currentMissionId = doc.id;
            btnSolicitarMision.classList.add('hidden');
            searchingState.classList.remove('hidden');
            listenToMission(currentMissionId);
        }
    }, (error) => {
        console.error("Error en checkActiveMissions:", error);
    });
}

function resetUI() {
    btnSolicitarMision.classList.remove('hidden');
    searchingState.classList.add('hidden');
    searchingState.innerHTML = `
        <p class="text-cyan-400 font-bold animate-pulse text-sm">Buscando Hero cercano...</p>
        <button id="btnCancelarMision" class="mt-2 text-xs text-red-400 hover:text-red-300 underline">Cancelar solicitud</button>
    `;
    // Re-bind cancel button since innerHTML overwrote it
    document.getElementById('btnCancelarMision').addEventListener('click', async () => {
        if(!currentMissionId) return;
        await deleteDoc(doc(db, "misiones", currentMissionId));
        if(unsubscribeMission) unsubscribeMission();
        currentMissionId = null;
        resetUI();
    });
}

// 5. CARGAR CATÁLOGO DE HEROES (NUEVA FUNCIONALIDAD)
const heroCatalogGrid = document.getElementById('heroCatalogGrid');
const searchHeroInput = document.getElementById('searchHeroInput');
let allHeroes = []; // Almacenar para poder filtrar localmente

async function loadHeroCatalog() {
    if (!heroCatalogGrid) return;
    
    // Obtenemos todos los usuarios con rol 'hero'
    const q = query(collection(db, "users"), where("role", "==", "hero"));
    onSnapshot(q, (snapshot) => {
        allHeroes = [];
        snapshot.forEach((doc) => {
            allHeroes.push({ id: doc.id, ...doc.data() });
        });
        renderCatalog(allHeroes);
    }, (error) => {
        console.error("Error cargando el catálogo:", error);
        heroCatalogGrid.innerHTML = `<div class="text-center text-red-400 py-12 col-span-full">Error al cargar: ${error.message}</div>`;
    });
}

function renderCatalog(heroes) {
    if (!heroCatalogGrid) return;
    if (heroes.length === 0) {
        heroCatalogGrid.innerHTML = `<div class="text-center text-gray-400 py-12 col-span-full">Aún no hay Heroes registrados en tu zona.</div>`;
        return;
    }

    let html = '';
    heroes.forEach((h, index) => {
        // Avatares aleatorios para que se vea bien el mockup
        const avatarNum = (index % 50) + 10; 
        const rating = (Math.random() * (5 - 4.2) + 4.2).toFixed(1); // Estrellas entre 4.2 y 5.0
        
        const bioText = h.bio ? h.bio : "Héroe sin descripción todavía.";
        
        // Parse skills to tags
        let skillsHtml = '';
        if(h.skills) {
            const skillsArray = h.skills.split(',').map(s => s.trim()).filter(s => s);
            skillsHtml = skillsArray.map(s => `<span class="bg-obsidian-950 px-2 py-1 rounded text-[10px] uppercase border border-white/5">${s}</span>`).join('');
        } else {
            skillsHtml = `<span class="bg-obsidian-950 px-2 py-1 rounded text-[10px] uppercase border border-white/5 text-gray-600">Sin habilidades listadas</span>`;
        }

        const heroLevelBadge = h.heroLevel ? `<span class="text-xs font-bold text-cyan-400 mt-1 block">${h.heroLevel}</span>` : '';
        const onlineDot = h.isOnline ? `<div class="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-obsidian-950 rounded-full"></div>` : `<div class="absolute bottom-0 right-0 w-4 h-4 bg-gray-500 border-2 border-obsidian-950 rounded-full"></div>`;

        html += `
        <div class="dash-card border-cyan-500/20 hover:border-cyan-500/60 shadow-lg transition-all group relative overflow-hidden flex flex-col">
            <div class="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div class="flex items-center gap-4 mb-4 relative z-10">
                <div class="relative w-16 h-16">
                    <img src="https://i.pravatar.cc/150?img=${avatarNum}" class="w-full h-full rounded-full border-2 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                    ${onlineDot}
                </div>
                <div>
                    <h3 class="font-bold text-white text-lg">${h.name}</h3>
                    <p class="text-xs text-amber-500 font-bold flex items-center gap-1">
                        ★ ${rating} <span class="text-gray-500">| Hero Verificado</span>
                    </p>
                    ${heroLevelBadge}
                </div>
            </div>
            
            <div class="text-sm text-gray-400 mb-6 flex-1 relative z-10">
                <p class="line-clamp-3">${bioText}</p>
                <div class="mt-3 flex flex-wrap gap-2">
                    ${skillsHtml}
                </div>
            </div>
            
            <button onclick="requestSpecificHero('${h.id}', '${h.name}')" class="w-full bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 font-extrabold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] relative z-10">
                Contactar Ahora
            </button>
        </div>
        `;
    });
    heroCatalogGrid.innerHTML = html;
}

// Búsqueda en tiempo real
if (searchHeroInput) {
    searchHeroInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allHeroes.filter(h => h.name.toLowerCase().includes(term));
        renderCatalog(filtered);
    });
}

// Función para solicitar un hero específico
window.requestSpecificHero = async (heroId, heroName) => {
    alert(`¡Solicitud directa enviada a ${heroName}!\n\n(Pronto esto abrirá un chat directo con el Hero).`);
    // Aquí a futuro crearemos un documento en una colección de "chats" o "misiones_directas"
};
