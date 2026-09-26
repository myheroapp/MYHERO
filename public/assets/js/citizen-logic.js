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
                        <p class="text-white text-sm mb-4">Tu Hero <strong>${data.heroName}</strong> ha aceptado.</p>
                        <button onclick="window.openChat('${data.citizenId}_${data.heroId}', '${data.heroName}')" class="w-full bg-green-500 hover:bg-green-400 text-obsidian-950 font-extrabold py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                            Abrir Chat
                        </button>
                        <button onclick="deleteDoc(doc(db, 'misiones', '${missionId}')).then(() => resetUI())" class="mt-4 text-xs text-red-400 hover:text-red-300 underline block text-center w-full">Finalizar / Borrar</button>
                    </div>
                `;
            }
        } else {
            resetUI();
        }
    });
}

// Helper: Comprobar si ya hay misiones activas al cargar la página
function checkActiveMissions() {
    const q = query(collection(db, "misiones"), where("citizenId", "==", currentUser.uid));
    onSnapshot(q, (snapshot) => {
        // Find if there is any active mission (buscando or asignada)
        const docSnap = snapshot.docs.find(d => d.data().status === 'buscando' || d.data().status === 'asignada');
        if (docSnap) {
            currentMissionId = docSnap.id;
            btnSolicitarMision.classList.add('hidden');
            searchingState.classList.remove('hidden');
            listenToMission(currentMissionId);
        } else {
            resetUI();
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

// Filtros combinados
const searchLocationInput = document.getElementById('searchLocationInput');
const btnSortGPS = document.getElementById('btnSortGPS');

function applyFilters() {
    let filtered = [...allHeroes];
    
    const nameTerm = searchHeroInput ? searchHeroInput.value.toLowerCase() : '';
    if(nameTerm) {
        filtered = filtered.filter(h => (h.name || '').toLowerCase().includes(nameTerm));
    }
    
    const locTerm = searchLocationInput ? searchLocationInput.value.toLowerCase() : '';
    if(locTerm) {
        filtered = filtered.filter(h => (h.locationString || '').toLowerCase().includes(locTerm));
    }
    
    renderCatalog(filtered);
}

if (searchHeroInput) searchHeroInput.addEventListener('input', applyFilters);
if (searchLocationInput) searchLocationInput.addEventListener('input', applyFilters);

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = (lat2-lat1) * (Math.PI/180);
  const dLon = (lon2-lon1) * (Math.PI/180); 
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; 
}

if (btnSortGPS) {
    btnSortGPS.addEventListener('click', () => {
        if ("geolocation" in navigator) {
            btnSortGPS.textContent = "Ubicando...";
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const myLat = position.coords.latitude;
                    const myLng = position.coords.longitude;
                    
                    let filtered = [...allHeroes];
                    filtered.forEach(h => {
                        if(h.lat && h.lng) h.distance = getDistanceFromLatLonInKm(myLat, myLng, h.lat, h.lng);
                        else h.distance = 999999;
                    });
                    
                    filtered.sort((a,b) => a.distance - b.distance);
                    renderCatalog(filtered);
                    
                    btnSortGPS.textContent = "Ordenado por cercanía";
                    btnSortGPS.classList.add('text-green-400');
                    btnSortGPS.classList.remove('text-cyan-400');
                },
                (error) => {
                    alert("No se pudo obtener la ubicación GPS.");
                    btnSortGPS.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg> Cerca de mí`;
                }
            );
        }
    });
}

// Lógica del Chat Directo
const chatModal = document.getElementById('chatModal');
const chatTitle = document.getElementById('chatTitle');
const btnColapseChat = document.getElementById('btnColapseChat');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const btnSendMsg = document.getElementById('btnSendMsg');

let currentChatId = null;
let unsubscribeChat = null;

window.requestSpecificHero = async (heroId, heroName) => {
    if(!currentUser) return;
    
    const confirmacion = confirm(`¿Quieres enviar una solicitud directa a ${heroName}?`);
    if(!confirmacion) return;

    try {
        // Creamos una misión directa
        const newMisionRef = await addDoc(collection(db, "misiones"), {
            citizenId: currentUser.uid,
            citizenName: userNameDisplay ? userNameDisplay.textContent : 'Ciudadano',
            beneficiary: 'Familiar / Propio', // Hardcoded por ahora
            type: 'Acompañamiento (Solicitud Directa)',
            level: 'Nivel 1 (Básico)', // O podríamos leerlo del perfil
            status: 'buscando',
            targetHeroId: heroId, // ESTO ES CLAVE: Indica que es directa para él
            createdAt: new Date().toISOString()
        });
        
        currentMissionId = newMisionRef.id;
        alert(`¡Solicitud enviada a ${heroName}! Esperando a que acepte...`);
        
    } catch(e) {
        console.error(e);
        alert("Error al enviar la solicitud.");
    }
};

// Global function to open chat (will be called when a mission is accepted)
window.openChat = async (chatId, otherName) => {
    currentChatId = chatId;
    chatTitle.textContent = `Chat con ${otherName}`;
    chatModal.classList.remove('hidden');
    chatModal.classList.add('flex');
    listenToChat(currentChatId);
};

if(btnColapseChat) {
    btnColapseChat.addEventListener('click', () => {
        chatModal.classList.add('hidden');
        chatModal.classList.remove('flex');
        if(unsubscribeChat) unsubscribeChat();
    });
}

function listenToChat(chatId) {
    if(unsubscribeChat) unsubscribeChat();
    
    const q = query(collection(db, "chats", chatId, "messages"));
    unsubscribeChat = onSnapshot(q, (snapshot) => {
        const msgs = [];
        snapshot.forEach(doc => msgs.push(doc.data()));
        
        // Sort por fecha localmente
        msgs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        
        chatMessages.innerHTML = '';
        msgs.forEach(m => {
            const isMe = m.senderId === currentUser.uid;
            const bubble = document.createElement('div');
            bubble.className = `max-w-[80%] rounded-xl p-3 text-sm flex flex-col ${isMe ? 'bg-cyan-500 text-obsidian-950 self-end ml-auto rounded-tr-sm' : 'bg-obsidian-800 text-white self-start mr-auto rounded-tl-sm'}`;
            
            const txt = document.createElement('span');
            txt.textContent = m.text;
            bubble.appendChild(txt);
            
            chatMessages.appendChild(bubble);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
}

if(btnSendMsg && chatInput) {
    const sendFn = async () => {
        const text = chatInput.value.trim();
        if(!text || !currentChatId) return;
        
        chatInput.value = '';
        await addDoc(collection(db, "chats", currentChatId, "messages"), {
            senderId: currentUser.uid,
            text: text,
            timestamp: new Date().toISOString()
        });
    };
    btnSendMsg.addEventListener('click', sendFn);
    chatInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') sendFn();
    });
}
