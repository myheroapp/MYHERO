// ============================================================================
// HEROLY ESPAÑA - LÓGICA COMPLETA DEL PANEL DE PERSONAS Y FAMILIAS (VERSIÓN 1)
// ============================================================================

const DAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

const CITIZEN_HEROES = [
    {
        id: 'hero-alejandro',
        name: 'Alejandro',
        age: 35,
        city: 'Valencia',
        zone: 'Eixample / Ruzafa',
        level: 1,
        levelLabel: 'Nivel 1 · Cívico',
        rate: 8,
        rating: '5,0',
        reviews: 19,
        photo: './assets/img/normal.jpg',
        skills: ['Mayores', 'Auxilios'],
        daysAvailable: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'],
        bio: 'Graduado en Psicología. Especialista en acompañar a padres mayores al médico, banco y paseos tranquilos.'
    },
    {
        id: 'hero-patricia',
        name: 'Patricia',
        age: 40,
        city: 'Zaragoza',
        zone: 'Centro / Romareda',
        level: 1,
        levelLabel: 'Nivel 1 · Cívico',
        rate: 9,
        rating: '5,0',
        reviews: 11,
        photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&w=500&q=80',
        skills: ['Mayores', 'Auxilios', 'Vehículo'],
        daysAvailable: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'],
        bio: 'Auxiliar de enfermería con vehículo propio. Trato cálido para consultas médicas, bancos y rehabilitación.'
    },
    {
        id: 'hero-elena',
        name: 'Elena',
        age: 37,
        city: 'Barcelona',
        zone: 'Sarrià / Gràcia',
        level: 1,
        levelLabel: 'Nivel 1 · Cívico',
        rate: 10,
        rating: '4,9',
        reviews: 22,
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=500&q=80',
        skills: ['Mayores', 'Vehículo'],
        daysAvailable: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        bio: 'Técnica sociosanitaria en Barcelona. Ideal para mujeres y personas mayores que buscan compañía de confianza.'
    },
    {
        id: 'hero-roberto',
        name: 'Roberto',
        age: 38,
        city: 'Alicante',
        zone: 'Centro / Diputación',
        level: 2,
        levelLabel: 'Nivel 2 · Disuasorio',
        rate: 11,
        rating: '5,0',
        reviews: 14,
        photo: './assets/img/roberto.jpg',
        skills: ['Mayores', 'Vehículo', 'Auxilios'],
        daysAvailable: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        bio: 'Deportista y Héroe acreditado en Alicante. Acompañamiento a bancos, citas médicas y retornos nocturnos.'
    },
    {
        id: 'hero-david',
        name: 'David',
        age: 34,
        city: 'Málaga',
        zone: 'Centro / Teatinos',
        level: 2,
        levelLabel: 'Nivel 2 · Disuasorio',
        rate: 12,
        rating: '4,9',
        reviews: 15,
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=500&q=80',
        skills: ['Auxilios', 'Vehículo'],
        daysAvailable: ['Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
        bio: 'Socorrista titulado y deportista federado. Presencia preventiva para salidas laborales nocturnas o cajeros.'
    },
    {
        id: 'hero-carlos',
        name: 'Carlos',
        age: 41,
        city: 'Elche',
        zone: 'Altabix / Centro',
        level: 2,
        levelLabel: 'Nivel 2 · Disuasorio',
        rate: 13,
        rating: '4,9',
        reviews: 26,
        photo: './assets/img/musculoso.jpg',
        skills: ['Vehículo'],
        daysAvailable: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
        bio: 'Entrenador personal de 1,88m en Elche. Máxima disuasión pasiva para gestiones bancarias y parkings.'
    },
    {
        id: 'hero-miguel',
        name: 'Miguel Ángel',
        age: 46,
        city: 'Sevilla',
        zone: 'Nervión / Los Remedios',
        level: 3,
        levelLabel: 'Nivel 3 · Especialista',
        rate: 15,
        rating: '5,0',
        reviews: 31,
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&w=500&q=80',
        skills: ['Vehículo', 'Auxilios'],
        daysAvailable: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
        bio: 'Especialista con 15 años en prevención y primeros auxilios. Seriedad absoluta para notarías y bancos.'
    },
    {
        id: 'hero-javier',
        name: 'Javier',
        age: 44,
        city: 'Madrid',
        zone: 'Salamanca / Chamberí',
        level: 3,
        levelLabel: 'Nivel 3 · Especialista',
        rate: 17,
        rating: '5,0',
        reviews: 39,
        photo: './assets/img/karateka.jpg',
        skills: ['Auxilios', 'Mayores', 'Vehículo'],
        daysAvailable: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        bio: 'Cinturón negro 3º Dan federado y experto en soporte vital básico. El estándar más alto de tranquilidad.'
    }
];

let activeChatHeroId = 'hero-roberto';

document.addEventListener('DOMContentLoaded', () => {
    initSessionProfile();
    renderCitizenCatalog();
    renderPublishedAnnouncements();
    renderCitizenMissions();
    renderChatInbox();
    renderFamilyMembers();
    bindCitizenEvents();
});

function initSessionProfile() {
    const raw = localStorage.getItem('heroly_session');
    const user = raw ? JSON.parse(raw) : { name: 'Laura G.', email: 'laura@heroly.es', city: 'Alicante', phone: '612 345 678' };
    const nameEl = document.getElementById('userNameDisplay');
    const citName = document.getElementById('citNameInput');
    const citPhone = document.getElementById('citPhoneInput');
    const citLoc = document.getElementById('citLocationInput');

    if (nameEl) nameEl.innerText = user.name || 'Laura G.';
    if (citName) citName.value = user.name || 'Laura G.';
    if (citPhone) citPhone.value = user.phone || '612 345 678';
    if (citLoc) citLoc.value = user.city || 'Alicante';
}

window.switchCitizenTab = function(tabId) {
    document.querySelectorAll('.nav-link[data-tab]').forEach(link => {
        if (link.getAttribute('data-tab') === tabId) link.classList.add('active');
        else link.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(sec => {
        sec.classList.remove('active', ' hidden');
        if (sec.id === tabId) sec.classList.add('active');
    });
};

// 1. RENDERIZAR CATÁLOGO DE HÉROES DESBLOQUEADO
window.renderCitizenCatalog = function() {
    const grid = document.getElementById('heroCatalogGrid');
    if (!grid) return;

    const cityVal = document.getElementById('citFilterCity')?.value || 'Todas';
    const levelVal = document.getElementById('citFilterLevel')?.value || 'Todos';
    const maxRate = Number(document.getElementById('citFilterRate')?.value || 20);
    const skillVal = document.getElementById('citFilterSkill')?.value || 'Todos';

    const customHeroes = JSON.parse(localStorage.getItem('heroly_custom_heroes') || '[]');
    const fullList = [...customHeroes, ...CITIZEN_HEROES];

    const filtered = fullList.filter(h => {
        if (cityVal !== 'Todas' && h.city.toLowerCase() !== cityVal.toLowerCase()) return false;
        if (levelVal !== 'Todos' && String(h.level) !== String(levelVal)) return false;
        if (h.rate > maxRate) return false;
        if (skillVal !== 'Todos' && !(h.skills || []).includes(skillVal)) return false;
        return true;
    });

    grid.innerHTML = filtered.map(h => {
        const bubbles = DAYS.map(d => `<span class="day-bubble ${(h.daysAvailable || []).includes(d) ? 'on' : 'off'}">${d}</span>`).join('');
        return `
            <div class="dash-card flex flex-col justify-between">
                <div>
                    <div class="relative h-52 rounded-2xl overflow-hidden mb-4 bg-stone-100">
                        <img src="${h.photo}" alt="${h.name}" class="w-full h-full object-cover object-top">
                        <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-emerald-700 text-xs font-extrabold shadow-sm">● Online ahora</span>
                        <span class="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-teal-800 text-white text-xs font-extrabold shadow">${h.rate} € / hora</span>
                    </div>
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="font-display text-lg font-extrabold text-slate-900">${h.name} (${h.age || 36})</h3>
                        <span class="text-xs font-bold text-amber-500">★ ${h.rating || '5,0'} (${h.reviews || 8})</span>
                    </div>
                    <p class="text-xs font-semibold text-slate-500 mb-2">📍 ${h.city} · ${h.zone || 'Centro'}</p>
                    <span class="inline-block px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold mb-3">${h.levelLabel}</span>
                    <p class="text-sm text-slate-600 leading-relaxed mb-4">${h.bio || h.shortBio}</p>
                </div>
                <div class="pt-3 border-t border-stone-100 space-y-3">
                    <div class="flex justify-between gap-1">${bubbles}</div>
                    <div class="grid grid-cols-2 gap-2">
                        <button onclick="openChatWithHero('${h.id}')" class="py-2.5 px-3 rounded-xl border border-teal-700 text-teal-800 hover:bg-teal-50 font-bold text-xs transition">
                            💬 Mensaje
                        </button>
                        <button onclick="bookHeroNow('${h.id}')" class="py-2.5 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs shadow-sm transition">
                            🛡️ Contratar
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
};

// 2. CONTRATAR HÉROE / CREAR MISIÓN CON SEGUIMIENTO GPS
window.bookHeroNow = function(heroId) {
    const customHeroes = JSON.parse(localStorage.getItem('heroly_custom_heroes') || '[]');
    const hero = [...customHeroes, ...CITIZEN_HEROES].find(x => x.id === heroId) || CITIZEN_HEROES[3];

    const missions = getCitizenMissions();
    const newMission = {
        id: 'm-' + Date.now(),
        heroId: hero.id,
        heroName: hero.name,
        heroPhoto: hero.photo,
        heroLevel: hero.levelLabel,
        city: hero.city,
        rate: hero.rate,
        hours: 2,
        total: hero.rate * 2,
        status: 'En curso · GPS Activo',
        date: 'Hoy · En directo',
        rated: false
    };
    missions.unshift(newMission);
    localStorage.setItem('heroly_citizen_missions', JSON.stringify(missions));
    renderCitizenMissions();
    switchCitizenTab('tab-historial');
};

function getCitizenMissions() {
    const raw = localStorage.getItem('heroly_citizen_missions');
    if (raw) return JSON.parse(raw);
    const initial = [
        {
            id: 'm-default-1',
            heroId: 'hero-roberto',
            heroName: 'Roberto',
            heroPhoto: './assets/img/roberto.jpg',
            heroLevel: 'Nivel 2 · Disuasorio',
            city: 'Alicante',
            rate: 11,
            hours: 2,
            total: 22,
            status: 'En curso · GPS Activo',
            date: 'Hoy · Acompañamiento Bancario Madre',
            rated: false
        }
    ];
    localStorage.setItem('heroly_citizen_missions', JSON.stringify(initial));
    return initial;
}

window.renderCitizenMissions = function() {
    const container = document.getElementById('citizenMissionsContainer');
    const badge = document.getElementById('activeMissionsBadge');
    if (!container) return;

    const missions = getCitizenMissions();
    if (badge) badge.innerText = missions.length;

    container.innerHTML = missions.map(m => `
        <div class="bg-[#FAFAF9] border border-stone-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
                <img src="${m.heroPhoto}" class="w-14 h-14 rounded-2xl object-cover border-2 border-teal-600">
                <div>
                    <span class="inline-block px-2.5 py-0.5 rounded-full ${m.rated ? 'bg-stone-200 text-slate-700' : 'bg-emerald-100 text-emerald-800'} text-[11px] font-extrabold mb-1">${m.status}</span>
                    <h4 class="font-display font-extrabold text-slate-900 text-base">${m.heroName} · ${m.heroLevel}</h4>
                    <p class="text-xs text-slate-600">${m.date} · ${m.hours}h (${m.rate} €/h) · <strong>Total a abonar por Bizum/Efectivo: ${m.total} €</strong></p>
                </div>
            </div>
            <div class="flex flex-wrap gap-2 w-full sm:w-auto">
                <button onclick="openChatWithHero('${m.heroId}')" class="px-4 py-2 rounded-full border border-stone-300 bg-white text-slate-700 font-bold text-xs hover:bg-stone-50">
                    💬 Chat
                </button>
                ${!m.rated ? `
                    <button onclick="completeAndRateMission('${m.id}')" class="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-sm">
                        ★ Finalizar y Valorar (5★)
                    </button>
                ` : `<span class="px-3 py-2 text-xs font-bold text-amber-600">★★★★★ Valorado</span>`}
            </div>
        </div>
    `).join('');
};

window.completeAndRateMission = function(missionId) {
    const missions = getCitizenMissions().map(m => {
        if (m.id === missionId) {
            m.status = 'Finalizado y abonado por Bizum';
            m.rated = true;
        }
        return m;
    });
    localStorage.setItem('heroly_citizen_missions', JSON.stringify(missions));
    renderCitizenMissions();
    alert('¡Gracias! Has finalizado el acompañamiento y otorgado 5 estrellas a tu Héroe.');
};

window.shareFamilyGpsLink = function() {
    const url = window.location.origin + '/?gps-familiar=activo';
    if (navigator.clipboard) navigator.clipboard.writeText(url);
    alert('Enlace de seguimiento en vivo Red Familiar™ copiado al portapapeles:\n' + url);
};

// 3. PUBLICAR SOLICITUD / ANUNCIO (ESTILO SITLY)
function renderPublishedAnnouncements() {
    const listEl = document.getElementById('myPublishedMissionsList');
    if (!listEl) return;
    const list = JSON.parse(localStorage.getItem('heroly_custom_missions') || '[]');
    if (list.length === 0) {
        listEl.innerHTML = `<p class="text-sm text-slate-500 italic">Aún no has publicado ningún anuncio. Usa el formulario superior para que los Héroes de tu zona te contacten.</p>`;
        return;
    }
    listEl.innerHTML = list.map(item => `
        <div class="p-4 rounded-2xl bg-[#FAFAF9] border border-stone-200 flex justify-between items-center gap-4">
            <div>
                <span class="text-xs font-extrabold text-teal-800">${item.city} · ${item.levelLabel} · ${item.rate} €/h</span>
                <p class="text-sm font-bold text-slate-900 mt-0.5">${item.shortBio}</p>
            </div>
            <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold shrink-0">Publicado</span>
        </div>
    `).join('');
}

// 4. BANDEJA DE MENSAJES / CHAT CON HÉROES
function getChatStore() {
    const raw = localStorage.getItem('heroly_chats');
    if (raw) return JSON.parse(raw);
    const seed = {
        'hero-roberto': [
            { sender: 'hero', text: '¡Hola Laura! Soy Roberto, Héroe Nivel 2 en Alicante. Tengo disponibilidad completa los lunes y miércoles por la mañana para acompañar a tu madre al banco por 11 €/h.' },
            { sender: 'me', text: '¡Hola Roberto! Genial, nos viene perfecto este miércoles a las 10:00h.' }
        ],
        'hero-alejandro': [
            { sender: 'hero', text: '¡Hola! Soy Alejandro (Nivel 1 · 8 €/h). Estaré encantado de ayudaros en lo que necesitéis.' }
        ]
    };
    localStorage.setItem('heroly_chats', JSON.stringify(seed));
    return seed;
}

window.openChatWithHero = function(heroId) {
    activeChatHeroId = heroId;
    switchCitizenTab('tab-mensajes');
    renderChatInbox();
};

window.quickBookActiveChatHero = function() {
    bookHeroNow(activeChatHeroId);
};

function renderChatInbox() {
    const contactsEl = document.getElementById('chatContactsList');
    const msgsEl = document.getElementById('inboxMessagesArea');
    const avatarEl = document.getElementById('activeChatAvatar');
    const nameEl = document.getElementById('activeChatName');
    if (!contactsEl || !msgsEl) return;

    const store = getChatStore();
    const hero = CITIZEN_HEROES.find(h => h.id === activeChatHeroId) || CITIZEN_HEROES[3];

    if (avatarEl) avatarEl.src = hero.photo;
    if (nameEl) nameEl.innerText = `${hero.name} (${hero.age}) · ${hero.rate} €/h`;

    contactsEl.innerHTML = CITIZEN_HEROES.slice(0, 5).map(h => {
        const isActive = h.id === activeChatHeroId;
        return `
            <div onclick="openChatWithHero('${h.id}')" class="p-3 rounded-2xl cursor-pointer flex items-center gap-3 transition ${isActive ? 'bg-teal-700 text-white shadow-sm' : 'hover:bg-stone-100 text-slate-800'}">
                <img src="${h.photo}" class="w-10 h-10 rounded-full object-cover shrink-0">
                <div class="overflow-hidden">
                    <div class="font-bold text-sm truncate">${h.name} · ${h.rate} €/h</div>
                    <div class="text-xs ${isActive ? 'text-teal-100' : 'text-slate-500'} truncate">${h.city} · ${h.levelLabel}</div>
                </div>
            </div>
        `;
    }).join('');

    const msgs = store[activeChatHeroId] || [
        { sender: 'hero', text: `¡Hola! Soy ${hero.name}, Héroe verificado en ${hero.city} (${hero.rate} €/h). ¿En qué te puedo acompañar?` }
    ];

    msgsEl.innerHTML = msgs.map(m => `
        <div class="flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}">
            <div class="max-w-[78%] rounded-2xl px-4 py-2.5 text-sm ${m.sender === 'me' ? 'bg-teal-700 text-white' : 'bg-white border border-stone-200 text-slate-800 shadow-sm'}">
                ${m.text}
            </div>
        </div>
    `).join('');
    msgsEl.scrollTop = msgsEl.scrollHeight;
}

// 5. RED FAMILIAR™
function getFamilyMembers() {
    const raw = localStorage.getItem('heroly_family_members');
    if (raw) return JSON.parse(raw);
    const initial = [
        { id: 'fam-1', name: 'Carmen G.', relation: 'Madre / Padre', age: 74, notes: 'Acompañar al banco los días 1 y 15 de mes y revisiones médicas.' }
    ];
    localStorage.setItem('heroly_family_members', JSON.stringify(initial));
    return initial;
}

function renderFamilyMembers() {
    const grid = document.getElementById('familyGrid');
    if (!grid) return;
    const members = getFamilyMembers();
    grid.innerHTML = members.map(f => `
        <div class="dash-card flex flex-col justify-between">
            <div>
                <div class="flex justify-between items-start mb-2">
                    <span class="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-extrabold">${f.relation}</span>
                    <button onclick="deleteFamilyMember('${f.id}')" class="text-xs text-red-500 hover:underline font-bold">Eliminar</button>
                </div>
                <h3 class="font-display text-xl font-extrabold text-slate-900">${f.name} (${f.age} años)</h3>
                <p class="text-sm text-slate-600 mt-2">${f.notes || 'Sin observaciones especiales.'}</p>
            </div>
            <div class="mt-4 pt-3 border-t border-stone-100 flex justify-between items-center">
                <span class="text-xs font-bold text-emerald-700">● Trazabilidad GPS habilitada</span>
                <button onclick="switchCitizenTab('tab-catalogo')" class="text-xs font-extrabold text-teal-700 hover:underline">Pedir Héroe para ${f.name.split(' ')[0]} →</button>
            </div>
        </div>
    `).join('');
}

window.deleteFamilyMember = function(id) {
    const filtered = getFamilyMembers().filter(x => x.id !== id);
    localStorage.setItem('heroly_family_members', JSON.stringify(filtered));
    renderFamilyMembers();
};

window.openSosModal = function() {
    const m = document.getElementById('sosModal');
    if (m) m.classList.remove('hidden');
};

function bindCitizenEvents() {
    // Publicar anuncio
    const pubForm = document.getElementById('formPublishMission');
    if (pubForm) {
        pubForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const rawSession = JSON.parse(localStorage.getItem('heroly_session') || '{}');
            const city = document.getElementById('pubCity').value.trim() || 'Alicante';
            const level = Number(document.getElementById('pubLevel').value || 2);
            const rate = Number(document.getElementById('pubRate').value || 10);
            const bio = document.getElementById('pubBio').value.trim();
            const target = document.getElementById('pubTarget').value;

            const customList = JSON.parse(localStorage.getItem('heroly_custom_missions') || '[]');
            customList.unshift({
                id: 'mision-' + Date.now(),
                name: rawSession.name || 'Laura G.',
                age: 42,
                city: city,
                zone: 'Zona Centro',
                level: level,
                levelLabel: `Busca Nivel ${level}`,
                rate: rate,
                rating: '5,0',
                reviewsCount: 3,
                experience: target,
                online: 'Publicado ahora',
                isOnlineNow: true,
                photo: './assets/img/laura.jpg',
                shortBio: bio,
                fullBio: bio,
                daysAvailable: ['Lu', 'Mi', 'Vi'],
                schedule: { manana: ['Lu', 'Mi', 'Vi'], tarde: ['Ma', 'Ju'], noche: [] },
                missions: ['Bancos y Cajeros', 'Mayores y Médicos'],
                experienceCards: [{ title: target, subtitle: `${rate} €/hora en ${city}`, icon: 'elderly' }],
                capabilities: ['Pago inmediato por Bizum o efectivo', 'Seguimiento GPS activo'],
                references: []
            });
            localStorage.setItem('heroly_custom_missions', JSON.stringify(customList));
            pubForm.reset();
            renderPublishedAnnouncements();
            alert('¡Tu anuncio ha sido publicado con éxito! Ya es visible para los Héroes de tu ciudad.');
        });
    }

    // Enviar mensaje en el chat
    const chatForm = document.getElementById('inboxSendForm');
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('inboxMessageInput');
            const text = input.value.trim();
            if (!text) return;

            const store = getChatStore();
            if (!store[activeChatHeroId]) store[activeChatHeroId] = [];
            store[activeChatHeroId].push({ sender: 'me', text });
            localStorage.setItem('heroly_chats', JSON.stringify(store));
            input.value = '';
            renderChatInbox();

            const hero = CITIZEN_HEROES.find(h => h.id === activeChatHeroId) || CITIZEN_HEROES[3];
            setTimeout(() => {
                const updated = getChatStore();
                updated[activeChatHeroId].push({
                    sender: 'hero',
                    text: `¡Perfecto! Soy ${hero.name}. Quedo disponible para ese horario por ${hero.rate} €/h. Puedes pulsar en "Contratar" arriba cuando quieras dejarlo confirmado.`
                });
                localStorage.setItem('heroly_chats', JSON.stringify(updated));
                renderChatInbox();
            }, 900);
        });
    }

    // Red Familiar
    const btnAddFam = document.getElementById('btnAddFamily');
    const btnCloseFam = document.getElementById('btnCloseFamilyForm');
    const famContainer = document.getElementById('familyFormContainer');
    const famForm = document.getElementById('familyForm');

    if (btnAddFam && famContainer) {
        btnAddFam.addEventListener('click', () => famContainer.classList.remove('hidden'));
    }
    if (btnCloseFam && famContainer) {
        btnCloseFam.addEventListener('click', () => famContainer.classList.add('hidden'));
    }
    if (famForm) {
        famForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const members = getFamilyMembers();
            members.push({
                id: 'fam-' + Date.now(),
                name: document.getElementById('famName').value.trim(),
                relation: document.getElementById('famRelation').value,
                age: Number(document.getElementById('famAge').value || 70),
                notes: document.getElementById('famNotes').value.trim()
            });
            localStorage.setItem('heroly_family_members', JSON.stringify(members));
            famForm.reset();
            famContainer.classList.add('hidden');
            renderFamilyMembers();
        });
    }

    // Guardar perfil ciudadano
    const profForm = document.getElementById('formCitizenProfile');
    if (profForm) {
        profForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = {
                name: document.getElementById('citNameInput').value.trim(),
                phone: document.getElementById('citPhoneInput').value.trim(),
                city: document.getElementById('citLocationInput').value.trim(),
                role: 'ciudadano'
            };
            localStorage.setItem('heroly_session', JSON.stringify(user));
            initSessionProfile();
            alert('Perfil actualizado correctamente en Heroly.');
        });
    }

    // Logout
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('heroly_session');
            window.location.href = 'index.html';
        });
    }
}
