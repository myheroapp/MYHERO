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

// 2. Escuchar Misiones en Tiempo Real (Radar)
function listenToAvailableMissions() {
    const q = query(collection(db, "misiones"), where("status", "==", "buscando"));
    
    onSnapshot(q, (snapshot) => {
        const misiones = [];
        snapshot.forEach((doc) => {
            misiones.push({ id: doc.id, ...doc.data() });
        });
        
        renderMissions(misiones);
    });
}

// 3. Renderizar las misiones entrantes en el HTML
function renderMissions(misiones) {
    // Actualizar el número rojo en el menú
    if (badgeCount) {
        badgeCount.textContent = misiones.length;
        if(misiones.length > 0) {
            badgeCount.classList.remove('hidden');
        } else {
            badgeCount.classList.add('hidden');
        }
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
        html += `
        <div class="dash-card border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)] relative overflow-hidden group mb-4">
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="absolute top-0 right-0 bg-gradient-to-r from-cyan-400 to-cyan-600 text-obsidian-950 font-extrabold px-4 py-1.5 text-xs rounded-bl-2xl shadow-lg">NUEVA</div>
            
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
                        <button class="flex-1 bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 font-extrabold py-3 rounded-xl transition-transform hover:-translate-y-1 shadow-[0_0_15px_rgba(6,182,212,0.4)]" onclick="acceptMission('${m.id}')">Aceptar Misión</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    
    missionsList.innerHTML = html;
}

// 4. Aceptar la misión
window.acceptMission = async (missionId) => {
    try {
        const missionRef = doc(db, "misiones", missionId);
        await updateDoc(missionRef, {
            status: 'asignada',
            heroId: currentUser.uid,
            heroName: currentHeroName,
            acceptedAt: new Date().toISOString()
        });
        alert("¡Misión Aceptada con éxito! El ciudadano ha sido notificado.");
        // A futuro, aquí se redirigiría al Hero a una pantalla de "En curso" o "Chat".
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
                    isOnline: isOnline,
                    lastSeen: new Date().toISOString()
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
        const newLevel = document.getElementById('heroLevelSelect').value;

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
                updatedAt: new Date().toISOString()
            });
            
            // Update local display
            currentHeroName = newName;
            if(userNameDisplay) userNameDisplay.textContent = newName;
            if(document.getElementById('heroLevelDisplay')) {
                document.getElementById('heroLevelDisplay').textContent = newLevel;
            }
            
            alert("¡Perfil guardado correctamente! (La funcionalidad de subir las 3 fotos la activaremos después de configurar Firebase Storage).");
            
        } catch (error) {
            console.error("Error guardando perfil:", error);
            alert("Hubo un error al guardar tu perfil.");
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    });
}
