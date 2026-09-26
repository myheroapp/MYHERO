import { auth, db, onAuthStateChanged, signOut, doc, getDoc, updateDoc } from './firebase.js';
import { collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let currentUser = null;
let currentHeroName = "Hero";

// Elementos del DOM
const userNameDisplay = document.getElementById('userNameDisplay');
const btnLogout = document.getElementById('btnLogout');
const missionsList = document.getElementById('missionsList');
const badgeCount = document.getElementById('badgeCount');

// 1. Autenticación y Carga de Perfil
onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        
        try {
            const userDocRef = doc(db, "users", user.uid);
            let userDoc = await getDoc(userDocRef);
            
            if(!userDoc.exists()) {
                const { setDoc } = await import('./firebase.js');
                await setDoc(userDocRef, {
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName || 'Hero Nuevo',
                    role: 'hero',
                    createdAt: new Date().toISOString()
                });
                userDoc = await getDoc(userDocRef);
            }

            if(userDoc.exists()) {
                const data = userDoc.data();
                currentHeroName = data.name || user.email;
                if(userNameDisplay) userNameDisplay.textContent = currentHeroName;
                
                // Rellenar formulario de perfil
                if(document.getElementById('heroNameInput')) {
                    document.getElementById('heroNameInput').value = data.name || '';
                    document.getElementById('heroPhoneInput').value = data.phone || '';
                    document.getElementById('heroBioInput').value = data.bio || '';
                                        document.getElementById('heroSkillsInput').value = data.skills || '';
                    if(document.getElementById('rateSimple')) document.getElementById('rateSimple').value = data.rates?.simple || '';
                    if(document.getElementById('rateNight')) document.getElementById('rateNight').value = data.rates?.night || '';
                    if(document.getElementById('rateValue')) document.getElementById('rateValue').value = data.rates?.value || '';
                    if(document.getElementById('rateErrands')) document.getElementById('rateErrands').value = data.rates?.errands || '';
                    if(document.getElementById('rateOther')) document.getElementById('rateOther').value = data.rates?.other || '';
                    if(document.getElementById('heroLocationInput')) document.getElementById('heroLocationInput').value = data.locationString || '';
                    if(document.getElementById('heroLat')) document.getElementById('heroLat').value = data.lat || '';
                    if(document.getElementById('heroLng')) document.getElementById('heroLng').value = data.lng || '';
                    
                    if(data.heroLevel) {
                        document.getElementById('heroLevelSelect').value = data.heroLevel;
                        if(document.getElementById('heroLevelDisplay')) {
                            document.getElementById('heroLevelDisplay').textContent = data.heroLevel;
                        }
                    }
                }
                
                // Rellenar estado de conexión
                if(data.isOnline && btnToggleConnection) {
                    isOnline = true;
                    btnToggleConnection.classList.remove('bg-obsidian-800');
                    btnToggleConnection.classList.add('bg-cyan-500');
                    if(toggleCircle) {
                        toggleCircle.classList.remove('translate-x-1');
                        toggleCircle.classList.add('translate-x-9');
                    }
                    if(connectionStatusText) {
                        connectionStatusText.textContent = "Conectado";
                        connectionStatusText.classList.replace('text-gray-400', 'text-cyan-400');
                    }
                }
            }
            // Empezar a escuchar misiones
            listenToAvailableMissions();
            listenToIncomingChats();
        } catch (error) {
            console.error("Error al conectar:", error);
            if(userNameDisplay) userNameDisplay.textContent = "Error de Conexión";
            alert("⚠️ BLOQUEO DE FIREBASE: No tienes permiso para acceder a los datos. Ve a las Reglas de Firestore y pon: allow read, write: if request.auth != null;");
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

// 2. Escuchar Misiones y Chats en Tiempo Real (Radar)

function listenToIncomingChats() {
    const qChats = query(collection(db, "chats"), where("heroId", "==", currentUser.uid));
    onSnapshot(qChats, (snapshot) => {
        const chats = [];
        snapshot.forEach(doc => {
            chats.push({ id: doc.id, ...doc.data() });
        });
        renderIncomingChats(chats);
    });
}

function renderIncomingChats(chats) {
    const list = document.getElementById('missionsList');
    if(!list) return;
    
    let html = '';
    chats.forEach(c => {
        html += `
        <div class="bg-obsidian-900 border border-cyan-500 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] mb-4">
            <div>
                <span class="text-xs bg-cyan-500/20 text-cyan-400 font-bold px-2 py-1 rounded mb-2 inline-block">Mensaje Directo (Chat)</span>
                <h3 class="font-bold text-white text-lg">${c.citizenName} quiere contactarte</h3>
                <p class="text-gray-400 text-sm mt-1">Revisa el chat para coordinar el servicio.</p>
            </div>
            <button onclick="openChat('${c.id}', '${c.citizenName}')" class="w-full md:w-auto bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 px-6 py-2 rounded-xl font-bold transition-colors shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                Abrir Chat
            </button>
        </div>
        `;
    });
    
    // Inject at top of missionsList (it will overlap if missions render later, but fine for now)
    const chatContainer = document.getElementById('chatContainer');
    if(!chatContainer) {
        const div = document.createElement('div');
        div.id = 'chatContainer';
        list.parentElement.insertBefore(div, list);
        div.innerHTML = html;
    } else {
        chatContainer.innerHTML = html;
    }
}

function listenToAvailableMissions() {
    const q = query(collection(db, "misiones"), where("status", "==", "buscando"));
    
    onSnapshot(q, (snapshot) => {
        const misiones = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            // Filtrar misiones: mostrar públicas o dirigidas explícitamente a este Hero
            if (!data.targetHeroId || data.targetHeroId === currentUser.uid) {
                misiones.push({ id: doc.id, ...data });
            }
        });
        
        renderMissions(misiones);
    });
}

// 3. Renderizar las misiones entrantes en el HTML
function renderMissions(misiones) {
    if (badgeCount) {
        badgeCount.textContent = misiones.length;
        if(misiones.length > 0) badgeCount.classList.remove('hidden');
        else badgeCount.classList.add('hidden');
    }

    if (misiones.length === 0) {
        missionsList.innerHTML = `
            <div class="text-center text-gray-400 py-12 border border-obsidian-800 border-dashed rounded-xl">
                <p class="animate-pulse">Esperando nuevas misiones en tu zona...</p>
            </div>
        `;
        return;
    }

    let html = '';
    misiones.forEach(m => {
        const isDirect = m.targetHeroId ? `<div class="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-amber-600 text-obsidian-950 font-extrabold px-4 py-1.5 text-xs rounded-bl-2xl shadow-lg">DIRECTO PARA TI</div>` : `<div class="absolute top-0 right-0 bg-gradient-to-r from-cyan-400 to-cyan-600 text-obsidian-950 font-extrabold px-4 py-1.5 text-xs rounded-bl-2xl shadow-lg">NUEVA</div>`;
        
        html += `
        <div class="dash-card border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)] relative overflow-hidden group mb-4">
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            ${isDirect}
            
            <div class="flex flex-col md:flex-row justify-between gap-6 pt-4 relative z-10">
                <div>
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30">
                            <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 class="text-xl font-bold text-white">${m.type}</h3>
                    </div>
                    <p class="text-sm text-gray-400 mb-4 pl-13">Solicitado por: <strong>${m.citizenName}</strong> • Para: <strong>${m.beneficiary}</strong></p>
                    
                    <div class="flex items-center gap-3 pl-13 text-sm">
                        <div class="bg-obsidian-950/80 px-3 py-1.5 rounded-lg text-gray-300 flex items-center gap-2 border border-white/5 shadow-inner">
                            Nivel Requerido: ${m.level}
                        </div>
                    </div>
                </div>
                <div class="flex flex-col justify-end items-end gap-3 min-w-[200px]">
                    <div class="text-3xl font-extrabold text-white tracking-tight">15.00 €</div>
                    <div class="flex gap-2 w-full">
                        <button class="flex-1 bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 font-extrabold py-3 rounded-xl transition-transform hover:-translate-y-1 shadow-[0_0_15px_rgba(6,182,212,0.4)]" onclick="acceptMission('${m.id}', '${m.citizenId}', '${m.citizenName}')">Aceptar Misión</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    
    missionsList.innerHTML = html;
}

// 4. Aceptar la misión
window.acceptMission = async (missionId, citizenId, citizenName) => {
    try {
        const missionRef = doc(db, "misiones", missionId);
        await updateDoc(missionRef, {
            status: 'asignada',
            heroId: currentUser.uid,
            heroName: currentHeroName,
            acceptedAt: new Date().toISOString()
        });
        
        // Crear el chat
        const { setDoc } = await import('./firebase.js');
        const chatId = `${citizenId}_${currentUser.uid}`;
        await setDoc(doc(db, "chats", chatId), {
            citizenId: citizenId,
            citizenName: citizenName,
            heroId: currentUser.uid,
            heroName: currentHeroName,
            updatedAt: new Date().toISOString()
        }, { merge: true });
        
        alert("¡Misión Aceptada con éxito! Revisa tus chats abiertos.");
        window.openChat(chatId, citizenName);
    } catch (error) {
        console.error("Error al aceptar la misión:", error);
        alert("Hubo un error o alguien más ya la aceptó.");
    }
};

// 5. Toggle de Conexión
const btnToggleConnection = document.getElementById('btnToggleConnection');
const toggleCircle = document.getElementById('toggleCircle');
const connectionStatusText = document.getElementById('connectionStatusText');
let isOnline = false;

if(btnToggleConnection) {
    btnToggleConnection.addEventListener('click', async () => {
        isOnline = !isOnline;
        
        if(isOnline) {
            btnToggleConnection.classList.remove('bg-obsidian-800');
            btnToggleConnection.classList.add('bg-cyan-500');
            toggleCircle.classList.remove('translate-x-1');
            toggleCircle.classList.add('translate-x-9');
            connectionStatusText.textContent = "Conectado";
            connectionStatusText.classList.replace('text-gray-400', 'text-cyan-400');
        } else {
            btnToggleConnection.classList.remove('bg-cyan-500');
            btnToggleConnection.classList.add('bg-obsidian-800');
            toggleCircle.classList.remove('translate-x-9');
            toggleCircle.classList.add('translate-x-1');
            connectionStatusText.textContent = "Desconectado";
            connectionStatusText.classList.replace('text-cyan-400', 'text-gray-400');
        }
        
        // Guardar estado en Firestore si lo deseamos
        if(currentUser) {
            try {
                            await updateDoc(doc(db, "users", currentUser.uid), {
                name: newName,
                phone: newPhone,
                bio: newBio,
                skills: newSkills,
                heroLevel: newLevel,
                locationString: newLocation,
                lat: newLat,
                lng: newLng,
                rates: rates
            });
            } catch(e) {
                console.error("No se pudo actualizar estado:", e);
            }
        }
    });
}

// 5. Configurar Perfil
const formHeroProfile = document.getElementById('formHeroProfile');
if(formHeroProfile) {
    formHeroProfile.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newName = document.getElementById('heroNameInput').value;
        const newPhone = document.getElementById('heroPhoneInput').value;
        const newBio = document.getElementById('heroBioInput').value;
                const newSkills = document.getElementById('heroSkillsInput').value;
        const rates = {
            simple: document.getElementById('rateSimple')?.value || '',
            night: document.getElementById('rateNight')?.value || '',
            value: document.getElementById('rateValue')?.value || '',
            errands: document.getElementById('rateErrands')?.value || '',
            other: document.getElementById('rateOther')?.value || ''
        };
        const newLevel = document.getElementById('heroLevelSelect').value;
        const newLocation = document.getElementById('heroLocationInput') ? document.getElementById('heroLocationInput').value : '';
        const newLat = document.getElementById('heroLat') ? document.getElementById('heroLat').value : '';
        const newLng = document.getElementById('heroLng') ? document.getElementById('heroLng').value : '';

        const btn = formHeroProfile.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = "Guardando...";
        btn.disabled = true;

        try {
                        await updateDoc(doc(db, "users", currentUser.uid), {
                name: newName,
                phone: newPhone,
                bio: newBio,
                skills: newSkills,
                heroLevel: newLevel,
                locationString: newLocation,
                lat: newLat,
                lng: newLng,
                rates: rates
            });
            
            // Update local display
            currentHeroName = newName;
            if(userNameDisplay) userNameDisplay.textContent = newName;
            if(document.getElementById('heroLevelDisplay')) {
                document.getElementById('heroLevelDisplay').textContent = newLevel;
            }
            
            alert("¡Perfil guardado correctamente!");
            
        } catch (error) {
            console.error("Error guardando perfil:", error);
            alert("Hubo un error al guardar tu perfil.");
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    });
}

// 6. Obtener GPS
const btnUpdateGPS = document.getElementById('btnUpdateGPS');
if(btnUpdateGPS) {
    btnUpdateGPS.addEventListener('click', () => {
        if ("geolocation" in navigator) {
            btnUpdateGPS.textContent = "Obteniendo...";
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    document.getElementById('heroLat').value = position.coords.latitude;
                    document.getElementById('heroLng').value = position.coords.longitude;
                    btnUpdateGPS.innerHTML = "¡Ubicación Guardada (GPS)!";
                    btnUpdateGPS.classList.replace("text-cyan-400", "text-green-400");
                    btnUpdateGPS.classList.replace("border-cyan-500/30", "border-green-500/50");
                },
                (error) => {
                    console.error("Error GPS:", error);
                    alert("No se pudo obtener la ubicación. Por favor, asegúrate de haber dado permisos al navegador.");
                    btnUpdateGPS.innerHTML = "Actualizar GPS Actual";
                }
            );
        } else {
            alert("Tu navegador no soporta geolocalización.");
        }
    });
}

// 7. Lógica del Chat (Hero side)
const chatModal = document.getElementById('chatModal');
const chatTitle = document.getElementById('chatTitle');
const btnColapseChat = document.getElementById('btnColapseChat');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const btnSendMsg = document.getElementById('btnSendMsg');

let currentChatId = null;
let unsubscribeChat = null;

if(btnColapseChat) {
    btnColapseChat.addEventListener('click', () => {
        chatModal.classList.add('hidden');
        chatModal.classList.remove('flex');
        if(unsubscribeChat) unsubscribeChat();
    });
}

// Global function so we can open chat from anywhere
window.openChat = (chatId, otherName) => {
    currentChatId = chatId;
    chatTitle.textContent = `Chat con ${otherName}`;
    chatModal.classList.remove('hidden');
    chatModal.classList.add('flex');
    
    if(unsubscribeChat) unsubscribeChat();
    const q = query(collection(db, "chats", chatId, "messages"));
    unsubscribeChat = onSnapshot(q, (snapshot) => {
        const msgs = [];
        snapshot.forEach(doc => msgs.push(doc.data()));
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
};

if(btnSendMsg && chatInput) {
    const sendFn = async () => {
        const text = chatInput.value.trim();
        if(!text || !currentChatId) return;
        
        chatInput.value = '';
        const { addDoc } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');
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
