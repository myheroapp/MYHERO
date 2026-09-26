const fs = require('fs');
let code = fs.readFileSync('public/dashboard-ciudadano.html', 'utf8');

const startIdx = code.indexOf('<div id="tab-familia"');
const endIdx = code.indexOf('<!-- FIN TABS -->');

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
                
                `;
    code = code.substring(0, startIdx) + replacement + code.substring(endIdx);
    fs.writeFileSync('public/dashboard-ciudadano.html', code);
    console.log('Fixed dashboard-ciudadano HTML tab-familia');
} else {
    console.log('Could not find markers');
}
