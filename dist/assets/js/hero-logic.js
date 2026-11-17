// ============================================================================
// HEROLY ESPAÑA - LÓGICA COMPLETA DEL PANEL PROFESIONAL DEL HÉROE (VERSIÓN 1)
// ============================================================================

const DEFAULT_INCOMING_MISSIONS = [
    {
        id: 'req-laura',
        clientName: 'Laura G. (Para su madre, 74 años)',
        city: 'Alicante · Centro',
        type: 'Bancos y Revisión Médica',
        level: 2,
        hours: 2,
        rate: 10,
        total: 20,
        commission: 4.00,
        scheduleText: 'Miércoles de 10:00h a 12:00h',
        photo: './assets/img/laura.jpg',
        notes: 'Recoger en el portal, acompañar a sucursal bancaria y activar GPS Red Familiar™.'
    },
    {
        id: 'req-familia-gomez',
        clientName: 'Familia Gómez (Abuelo, 79 años)',
        city: 'Elche · Sector V',
        type: 'Paseo de Tarde y Compañía',
        level: 1,
        hours: 2,
        rate: 8,
        total: 16,
        commission: 3.20,
        scheduleText: 'Lunes y Jueves de 17:30h a 19:30h',
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=500&q=80',
        notes: 'Paseo tranquilo por el parque y tomar un café. Trato paciente y amable.'
    },
    {
        id: 'req-maria',
        clientName: 'María P. (Directora Comercial, 36 años)',
        city: 'Madrid · Castellana',
        type: 'Retorno Nocturno al Parking',
        level: 2,
        hours: 1,
        rate: 12,
        total: 12,
        commission: 2.40,
        scheduleText: 'Jueves a las 22:00h',
        photo: './assets/img/maria.jpg',
        notes: 'Acompañamiento preventivo desde la salida del despacho hasta el aparcamiento.'
    },
    {
        id: 'req-andres',
        clientName: 'Andrés V. (Despacho Profesional, 48 años)',
        city: 'Valencia · Calle Colón',
        type: 'Gestión de Notaría y Banco',
        level: 3,
        hours: 2,
        rate: 15,
        total: 30,
        commission: 6.00,
        scheduleText: 'Martes de 11:00h a 13:00h',
        photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&crop=faces&w=500&q=80',
        notes: 'Acompañamiento discreto entre dos entidades bancarias y notaría.'
    }
];

let earningsChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    initHeroSession();
    renderIncomingMissions();
    renderHeroActiveServices();
    renderWalletSection();
    initEarningsChart();
    bindHeroEvents();
});

function initHeroSession() {
    const raw = localStorage.getItem('heroly_session');
    const user = raw ? JSON.parse(raw) : { name: 'Roberto S.', city: 'Alicante' };
    const nameDisp = document.getElementById('userNameDisplay');
    const nameInput = document.getElementById('heroNameInput');
    const locInput = document.getElementById('heroLocationInput');

    if (nameDisp) nameDisp.innerText = user.name || 'Roberto S.';
    if (nameInput) nameInput.value = (user.name || 'Roberto').split(' ')[0];
    if (locInput && user.city) locInput.value = user.city;
}

window.switchHeroTab = function(tabId) {
    document.querySelectorAll('.nav-link[data-tab]').forEach(link => {
        if (link.getAttribute('data-tab') === tabId) link.classList.add('active');
        else link.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(sec => {
        sec.classList.remove('active', 'hidden');
        if (sec.id === tabId) sec.classList.add('active');
    });
};

// 1. GESTIÓN DE BILLETERA PREPAGO Y COMISIONES (20%)
function getWalletState() {
    const raw = localStorage.getItem('heroly_hero_wallet');
    if (raw) return JSON.parse(raw);
    const initial = {
        balance: 15.00,
        totalEarned: 44.00,
        missionsDone: 4,
        history: [
            { id: 'tx-1', title: 'Bono de Bienvenida Héroe Verificado', amount: '+15,00 €', type: 'credit', date: 'Activación de cuenta' }
        ]
    };
    localStorage.setItem('heroly_hero_wallet', JSON.stringify(initial));
    return initial;
}

function saveWalletState(state) {
    localStorage.setItem('heroly_hero_wallet', JSON.stringify(state));
    renderWalletSection();
}

function renderWalletSection() {
    const state = getWalletState();
    const formattedBal = state.balance.toFixed(2).replace('.', ',') + ' €';
    const formattedEarn = state.totalEarned.toFixed(2).replace('.', ',') + ' €';

    const elBig = document.getElementById('walletBalanceBig');
    const elSide = document.getElementById('sidebarWalletBadge');
    const elKpiBal = document.getElementById('kpiWalletBalance');
    const elKpiEarn = document.getElementById('kpiEarningsToday');
    const elKpiMissions = document.getElementById('kpiMissionsCount');
    const elEarnBox = document.getElementById('earningsTotalBox');
    const elHist = document.getElementById('walletHistoryList');

    if (elBig) elBig.innerText = formattedBal;
    if (elSide) elSide.innerText = formattedBal;
    if (elKpiBal) elKpiBal.innerText = formattedBal;
    if (elKpiEarn) elKpiEarn.innerText = formattedEarn;
    if (elKpiMissions) elKpiMissions.innerText = state.missionsDone;
    if (elEarnBox) elEarnBox.innerText = formattedEarn;

    if (elHist) {
        elHist.innerHTML = state.history.map(tx => `
            <div class="p-3.5 rounded-2xl bg-[#FAFAF9] border border-stone-200 flex justify-between items-center">
                <div>
                    <div class="font-bold text-slate-900 text-sm">${tx.title}</div>
                    <div class="text-xs text-slate-500">${tx.date}</div>
                </div>
                <span class="font-display font-extrabold text-sm ${tx.type === 'credit' ? 'text-emerald-700' : 'text-amber-700'}">
                    ${tx.amount}
                </span>
            </div>
        `).join('');
    }
}

// 2. TABLÓN DE MISIONES ENTRANTES DE FAMILIAS
function getIncomingMissions() {
    const raw = localStorage.getItem('heroly_incoming_missions');
    let list = raw ? JSON.parse(raw) : [...DEFAULT_INCOMING_MISSIONS];

    // Añadir también anuncios publicados por ciudadanos desde su panel
    const customAnnouncements = JSON.parse(localStorage.getItem('heroly_custom_missions') || '[]');
    customAnnouncements.forEach(ca => {
        if (!list.some(x => x.id === ca.id)) {
            const total = (ca.rate || 10) * 2;
            list.unshift({
                id: ca.id,
                clientName: `${ca.name} (${ca.experience || 'Solicitud Familiar'})`,
                city: ca.city,
                type: 'Acompañamiento Personalizado',
                level: ca.level || 2,
                hours: 2,
                rate: ca.rate || 10,
                total: total,
                commission: +(total * 0.2).toFixed(2),
                scheduleText: 'Horario flexible (Mañana / Tarde)',
                photo: ca.photo || './assets/img/laura.jpg',
                notes: ca.shortBio
            });
        }
    });
    return list;
}

window.renderIncomingMissions = function() {
    const container = document.getElementById('missionsList');
    const badge = document.getElementById('badgeCount');
    if (!container) return;

    const list = getIncomingMissions();
    if (badge) badge.innerText = list.length;

    if (list.length === 0) {
        container.innerHTML = `
            <div class="col-span-full dash-card text-center py-12">
                <p class="text-slate-600 font-semibold">Has aceptado todas las misiones disponibles en este momento. Revisa la pestaña "Mis Acompañamientos".</p>
            </div>
        `;
        return;
    }

    container.innerHTML = list.map(m => `
        <div class="dash-card flex flex-col justify-between">
            <div>
                <div class="flex items-center gap-3.5 mb-4">
                    <img src="${m.photo}" class="w-14 h-14 rounded-2xl object-cover border-2 border-teal-600">
                    <div>
                        <span class="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-extrabold mb-1">Nivel ${m.level} · ${m.city}</span>
                        <h3 class="font-display font-extrabold text-slate-900 text-base">${m.clientName}</h3>
                        <p class="text-xs font-semibold text-teal-800">📅 ${m.scheduleText}</p>
                    </div>
                </div>
                <p class="text-sm text-slate-600 leading-relaxed mb-4 bg-[#FAFAF9] p-3.5 rounded-2xl border border-stone-200">
                    "${m.notes}"
                </p>
            </div>

            <div class="pt-3 border-t border-stone-200">
                <div class="flex justify-between items-center mb-3 text-xs">
                    <div>
                        <span class="text-slate-500 block">Tú cobras en mano/Bizum (100%):</span>
                        <strong class="text-base font-extrabold text-emerald-700">${m.total},00 € (${m.hours}h × ${m.rate} €/h)</strong>
                    </div>
                    <div class="text-right">
                        <span class="text-slate-500 block">Comisión Heroly (20%):</span>
                        <strong class="text-slate-800">-${m.commission.toFixed(2).replace('.', ',')} € de tu saldo</strong>
                    </div>
                </div>
                <button onclick="acceptFamilyMission('${m.id}')" class="w-full py-3.5 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs uppercase tracking-wider shadow transition">
                    ✓ Aceptar Misión y Contactar
                </button>
            </div>
        </div>
    `).join('');
};

window.acceptFamilyMission = function(missionId) {
    const list = getIncomingMissions();
    const mission = list.find(x => x.id === missionId);
    if (!mission) return;

    const wallet = getWalletState();
    if (wallet.balance < mission.commission) {
        alert(`Saldo insuficiente (${wallet.balance.toFixed(2)} €) para cubrir la comisión del 20% (${mission.commission.toFixed(2)} €). Por favor, recarga tu billetera primero.`);
        switchHeroTab('tab-recargas');
        return;
    }

    // Descontar 20% de comisión y sumar ganancias
    wallet.balance = +(wallet.balance - mission.commission).toFixed(2);
    wallet.totalEarned = +(wallet.totalEarned + mission.total).toFixed(2);
    wallet.missionsDone += 1;
    wallet.history.unshift({
        id: 'tx-' + Date.now(),
        title: `Comisión 20% · Misión con ${mission.clientName.split('(')[0].trim()}`,
        amount: `-${mission.commission.toFixed(2).replace('.', ',')} €`,
        type: 'debit',
        date: 'Hace un instante'
    });
    saveWalletState(wallet);

    // Mover a Mis Acompañamientos Activos
    const remaining = list.filter(x => x.id !== missionId);
    localStorage.setItem('heroly_incoming_missions', JSON.stringify(remaining));

    const activeList = JSON.parse(localStorage.getItem('heroly_hero_active_services') || '[]');
    activeList.unshift({
        ...mission,
        acceptedAt: 'Hoy · En curso',
        status: 'Aceptada · GPS Activo'
    });
    localStorage.setItem('heroly_hero_active_services', JSON.stringify(activeList));

    renderIncomingMissions();
    renderHeroActiveServices();
    switchHeroTab('tab-servicios');
    alert(`¡Misión aceptada! Se han descontado ${mission.commission.toFixed(2)} € (20%) de tu saldo. Cobrarás ${mission.total},00 € íntegros del cliente por Bizum o efectivo.`);
};

function renderHeroActiveServices() {
    const container = document.getElementById('heroActiveServicesList');
    if (!container) return;

    const list = JSON.parse(localStorage.getItem('heroly_hero_active_services') || '[]');
    if (list.length === 0) {
        container.innerHTML = `
            <div class="dash-card text-center py-10">
                <p class="text-slate-600 font-medium mb-4">Todavía no has aceptado ningún acompañamiento hoy.</p>
                <button onclick="switchHeroTab('tab-disponibles')" class="px-6 py-3 rounded-full bg-teal-700 text-white font-extrabold text-xs">
                    Ver solicitudes de familias →
                </button>
            </div>
        `;
        return;
    }

    container.innerHTML = list.map(s => `
        <div class="dash-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
                <img src="${s.photo}" class="w-14 h-14 rounded-2xl object-cover border-2 border-teal-600">
                <div>
                    <span class="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold mb-1">${s.status}</span>
                    <h4 class="font-display font-extrabold text-slate-900 text-base">${s.clientName}</h4>
                    <p class="text-xs text-slate-600">${s.city} · ${s.scheduleText} · <strong class="text-emerald-700">Cobro directo: ${s.total},00 €</strong></p>
                </div>
            </div>
            <div class="flex gap-2">
                <button onclick="alert('Mensaje enviado al cliente: ¡Hola! Ya voy de camino hacia el punto de encuentro con el GPS activado.')" class="px-4 py-2.5 rounded-full border border-teal-700 text-teal-800 font-bold text-xs hover:bg-teal-50">
                    💬 Avisar Llegada
                </button>
            </div>
        </div>
    `).join('');
}

function initEarningsChart() {
    const ctx = document.getElementById('heroEarningsChart');
    if (!ctx || typeof Chart === 'undefined') return;
    earningsChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Ingresos cobrados (€)',
                data: [10, 12, 0, 11, 11, 0, 0],
                backgroundColor: '#0F766E',
                borderRadius: 8,
                barThickness: 28,
                hoverBackgroundColor: '#115E59'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: '#E7E5E4' }, ticks: { color: '#475569' } },
                x: { grid: { display: false }, ticks: { color: '#475569' } }
            }
        }
    });
}

function bindHeroEvents() {
    // Toggle Disponible / Desconectado
    const btnToggle = document.getElementById('btnToggleConnection');
    const txtStatus = document.getElementById('connectionStatusText');
    const circle = document.getElementById('toggleCircle');
    let isOnline = true;

    if (btnToggle) {
        btnToggle.addEventListener('click', () => {
            isOnline = !isOnline;
            if (isOnline) {
                btnToggle.className = 'relative inline-flex h-8 w-16 items-center rounded-full bg-emerald-600 transition-colors cursor-pointer';
                circle.className = 'inline-block h-6 w-6 transform rounded-full bg-white transition-transform translate-x-9 shadow-sm';
                txtStatus.innerText = '● Disponible Ahora';
                txtStatus.className = 'text-sm font-extrabold text-emerald-700';
            } else {
                btnToggle.className = 'relative inline-flex h-8 w-16 items-center rounded-full bg-stone-300 transition-colors cursor-pointer';
                circle.className = 'inline-block h-6 w-6 transform rounded-full bg-white transition-transform translate-x-1 shadow-sm';
                txtStatus.innerText = '○ Desconectado';
                txtStatus.className = 'text-sm font-extrabold text-slate-500';
            }
        });
    }

    // Recargar Saldo
    const topupForm = document.getElementById('formTopupWallet');
    if (topupForm) {
        topupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const amount = Number(document.getElementById('topupAmount').value || 10);
            const method = document.getElementById('topupMethod').value;
            if (amount < 10) return alert('El importe mínimo de recarga es de 10,00 €.');

            const state = getWalletState();
            state.balance = +(state.balance + amount).toFixed(2);
            state.history.unshift({
                id: 'tx-' + Date.now(),
                title: `Recarga de saldo vía ${method}`,
                amount: `+${amount.toFixed(2).replace('.', ',')} €`,
                type: 'credit',
                date: 'Completado ahora'
            });
            saveWalletState(state);
            alert(`¡Recarga de ${amount.toFixed(2)} € completada con éxito! Tu nuevo saldo disponible es de ${state.balance.toFixed(2)} €.`);
        });
    }

    // Subida de las 3 Fotos de Perfil
    const bindPhotoPreview = (inputId, imgId, updateSidebar = false) => {
        const inp = document.getElementById(inputId);
        const img = document.getElementById(imgId);
        if (inp && img) {
            inp.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                    img.src = ev.target.result;
                    if (updateSidebar) {
                        const sideImg = document.getElementById('sidebarHeroAvatar');
                        if (sideImg) sideImg.src = ev.target.result;
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };
    bindPhotoPreview('photoInput1', 'heroAvatarPreview', true);
    bindPhotoPreview('photoInput2', 'heroPhotoPreview2', false);
    bindPhotoPreview('photoInput3', 'heroPhotoPreview3', false);

    // Guardar Perfil Público del Héroe
    const heroForm = document.getElementById('formHeroProfile');
    if (heroForm) {
        heroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('heroNameInput').value.trim() || 'Roberto';
            const age = Number(document.getElementById('heroAgeInput').value || 38);
            const city = document.getElementById('heroLocationInput').value.trim() || 'Alicante';
            const level = Number(document.getElementById('heroLevelSelect').value || 2);
            const bio = document.getElementById('heroBioInput').value.trim();
            const rateSimple = Number(document.getElementById('rateSimple').value || 10);
            const rateValue = Number(document.getElementById('rateValue').value || 11);
            const rateNight = Number(document.getElementById('rateNight').value || 13);
            const minRate = Math.min(rateSimple, rateValue, rateNight);
            const mainPhoto = document.getElementById('heroAvatarPreview').src;

            const checkedDays = Array.from(document.querySelectorAll('#heroDaysCheckboxes input:checked')).map(c => c.value);

            const rawSession = JSON.parse(localStorage.getItem('heroly_session') || '{}');
            const customHeroes = JSON.parse(localStorage.getItem('heroly_custom_heroes') || '[]');
            const heroId = rawSession.uid || ('hero-custom-' + Date.now());
            const newHeroEntry = {
                id: heroId,
                uid: rawSession.uid || heroId,
                name,
                age,
                city,
                zone: 'Zona Verificada',
                level,
                levelLabel: `Nivel ${level} · Héroe Verificado`,
                rate: minRate,
                rating: '5,0',
                reviewsCount: 12,
                experience: 'Perfil Verificado Heroly',
                online: 'Online ahora',
                isOnlineNow: true,
                photo: mainPhoto,
                shortBio: bio,
                fullBio: bio,
                daysAvailable: checkedDays.length ? checkedDays : ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'],
                schedule: {
                    manana: checkedDays,
                    tarde: checkedDays,
                    noche: ['Vi', 'Sa']
                },
                missions: ['Bancos y Cajeros', 'Mayores y Médicos', 'Retorno Nocturno'],
                experienceCards: [
                    { title: 'Héroe Acreditado', subtitle: `Disponible desde ${minRate} €/h en ${city}`, icon: 'shield' }
                ],
                capabilities: ['Certificado de Penales Verificado', 'Seguimiento GPS Red Familiar™'],
                references: [],
                updatedAt: new Date().toISOString()
            };
            const filtered = customHeroes.filter(h => h.id !== newHeroEntry.id);
            filtered.unshift(newHeroEntry);
            localStorage.setItem('heroly_custom_heroes', JSON.stringify(filtered));
            import('./firebase.js').then(({ auth, db, doc, setDoc }) => {
                const authUid = auth.currentUser?.uid || newHeroEntry.uid;
                newHeroEntry.uid = authUid;
                setDoc(doc(db, 'heroes', authUid), { ...newHeroEntry, id: authUid }, { merge: true }).catch(() => {});
                if (auth.currentUser?.uid) {
                    setDoc(doc(db, 'users', auth.currentUser.uid), {
                        uid: auth.currentUser.uid,
                        name,
                        city,
                        age,
                        level,
                        bio,
                        rate: minRate,
                        role: 'hero',
                        updatedAt: new Date().toISOString()
                    }, { merge: true }).catch(() => {});
                }
            }).catch(() => {});

            const nameDisp = document.getElementById('userNameDisplay');
            const lvlDisp = document.getElementById('heroLevelDisplay');
            if (nameDisp) nameDisp.innerText = name;
            if (lvlDisp) lvlDisp.innerText = `Nivel ${level} · Desde ${minRate} €/h`;

            alert(`¡Tu perfil de Héroe ha sido guardado y publicado con tarifa desde ${minRate} €/h!`);
        });
    }

    // Logout
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                const { auth, signOut } = await import('./firebase.js');
                await signOut(auth);
            } catch (_) {}
            localStorage.removeItem('heroly_session');
            window.location.href = 'index.html';
        });
    }
}
