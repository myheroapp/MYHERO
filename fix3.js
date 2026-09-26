const fs = require('fs');
let code = fs.readFileSync('public/dashboard-ciudadano.html', 'utf8');

const startIdx = code.indexOf('<div id="tab-familia"');
const endIdx = code.indexOf('<!-- TAB: PAGOS -->');

if (startIdx !== -1 && endIdx !== -1) {
    const replacement = `<div id="tab-familia" class="tab-content max-w-5xl mx-auto space-y-6 hidden">
                    <header class="mb-8 flex justify-between items-end">
                        <div>
                            <h1 class="text-3xl font-extrabold text-white">Red Familiar</h1>
                            <p class="text-gray-400 mt-1">Gestiona los perfiles de terceros para los que solicitas misiones.</p>
                        </div>
                        <button id="btnAddFamily" class="bg-obsidian-800 hover:bg-obsidian-700 text-white font-bold py-2 px-4 rounded-xl text-sm transition-colors border border-white/5">
                            + Añadir Familiar
                        </button>
                    </header>

                    <div id="familyGrid" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <!-- Red Familiar cards will be injected here via JS -->
                    </div>

                    <!-- Add/Edit Family Member Form (Hidden by default) -->
                    <div id="familyFormContainer" class="hidden dash-card border-cyan-500/30 relative">
                        <button id="btnCloseFamilyForm" class="absolute top-4 right-4 text-gray-500 hover:text-white"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                        <h3 id="familyFormTitle" class="text-xl font-bold text-white mb-4">Añadir Familiar</h3>
                        <form id="familyForm" class="space-y-4">
                            <input type="hidden" id="famId">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-xs font-semibold text-cyan-400 uppercase mb-1">Nombre Completo</label>
                                    <input type="text" id="famName" required class="w-full bg-obsidian-950/80 border border-obsidian-800 text-white text-sm rounded-xl p-3 focus:border-cyan-500 outline-none">
                                </div>
                                <div>
                                    <label class="block text-xs font-semibold text-cyan-400 uppercase mb-1">Parentesco</label>
                                    <select id="famRelation" class="w-full bg-obsidian-950/80 border border-obsidian-800 text-white text-sm rounded-xl p-3 focus:border-cyan-500 outline-none">
                                        <option value="Padre/Madre">Padre/Madre</option>
                                        <option value="Hijo/Hija">Hijo/Hija</option>
                                        <option value="Abuelo/Abuela">Abuelo/Abuela</option>
                                        <option value="Pareja">Pareja</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-semibold text-cyan-400 uppercase mb-1">Edad</label>
                                    <input type="number" id="famAge" required class="w-full bg-obsidian-950/80 border border-obsidian-800 text-white text-sm rounded-xl p-3 focus:border-cyan-500 outline-none">
                                </div>
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-cyan-400 uppercase mb-1">Observaciones / Condiciones Médicas</label>
                                <textarea id="famNotes" rows="2" class="w-full bg-obsidian-950/80 border border-obsidian-800 text-white text-sm rounded-xl p-3 focus:border-cyan-500 outline-none resize-none" placeholder="Ej: Movilidad reducida, alergias..."></textarea>
                            </div>
                            <button type="submit" class="bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 font-bold py-3 px-6 rounded-xl w-full sm:w-auto transition-colors">Guardar Familiar</button>
                        </form>
                    </div>
                </div>

                <!-- TAB: PERFIL (NUEVO) -->
                <div id="tab-perfil" class="tab-content max-w-5xl mx-auto space-y-6 hidden">
                    <header class="mb-8">
                        <h1 class="text-3xl font-extrabold text-white">Mi Perfil</h1>
                        <p class="text-gray-400 mt-1">Gestiona tu información personal.</p>
                    </header>
                    <div class="dash-card">
                        <form id="formCitizenProfile" class="space-y-4">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Nombre Completo</label>
                                    <input type="text" id="citNameInput" class="w-full bg-obsidian-950/80 border border-obsidian-800 text-white text-sm rounded-xl p-3 focus:border-cyan-500 outline-none" required>
                                </div>
                                <div>
                                    <label class="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Teléfono de Contacto</label>
                                    <input type="tel" id="citPhoneInput" class="w-full bg-obsidian-950/80 border border-obsidian-800 text-white text-sm rounded-xl p-3 focus:border-cyan-500 outline-none">
                                </div>
                                <div class="sm:col-span-2">
                                    <label class="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Provincia / Ciudad</label>
                                    <input type="text" id="citLocationInput" class="w-full bg-obsidian-950/80 border border-obsidian-800 text-white text-sm rounded-xl p-3 focus:border-cyan-500 outline-none" placeholder="Ej: Madrid, Barcelona...">
                                </div>
                            </div>
                            <button type="submit" class="bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 font-extrabold py-3 px-6 rounded-xl transition-all shadow-lg mt-4">Guardar Cambios</button>
                        </form>
                    </div>
                </div>
                
                `;
    code = code.substring(0, startIdx) + replacement + code.substring(endIdx);
    
    // Also add "Mi Perfil" to sidebar
    const sidebarRedFamiliar = `<a href="#" data-tab="tab-familia" class="nav-link rounded-xl">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    Red Familiar
                </a>`;
                
    const sidebarPerfil = `<a href="#" data-tab="tab-perfil" class="nav-link rounded-xl">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    Mi Perfil
                </a>`;
                
    if (code.includes(sidebarRedFamiliar) && !code.includes('data-tab="tab-perfil"')) {
        code = code.replace(sidebarRedFamiliar, sidebarRedFamiliar + '\n                ' + sidebarPerfil);
    }
    
    fs.writeFileSync('public/dashboard-ciudadano.html', code);
    console.log('Fixed dashboard-ciudadano HTML tab-familia & tab-perfil');
} else {
    console.log('Could not find markers');
}
