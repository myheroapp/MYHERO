const fs = require('fs');
let code = fs.readFileSync('public/assets/js/citizen-logic.js', 'utf8');

const marker = 'window.renderFamily = function(familyList) {';
const idx = code.indexOf(marker);
if (idx !== -1) {
    code = code.substring(0, idx) + `window.renderFamily = function(familyList) {
    userFamily = familyList;
    if (familyGrid) {
        if(familyList.length === 0) {
            familyGrid.innerHTML = \`<div class="text-gray-500 col-span-full">Aún no tienes familiares agregados.</div>\`;
        } else {
            familyGrid.innerHTML = familyList.map(f => \`
                <div class="dash-card relative overflow-hidden group">
                    <div class="absolute top-0 right-0 p-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onclick="editFamily('\${f.id}')" class="text-gray-400 hover:text-cyan-400" title="Editar"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                        <button onclick="deleteFamily('\${f.id}')" class="text-gray-400 hover:text-red-400" title="Eliminar"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                    </div>
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 rounded-full bg-cyan-900 flex items-center justify-center text-cyan-400 font-bold text-xl">\${f.name.charAt(0).toUpperCase()}</div>
                        <div>
                            <h3 class="font-bold text-lg text-white pr-16">\${f.name}</h3>
                            <p class="text-xs text-gray-400">\${f.relation} • \${f.age} años</p>
                        </div>
                    </div>
                    \${f.notes ? \`
                    <div class="bg-obsidian-950 p-3 rounded-xl border border-white/5">
                        <p class="text-[10px] text-cyan-500 uppercase font-bold mb-1">Observaciones:</p>
                        <p class="text-xs text-white">\${f.notes}</p>
                    </div>\` : ''}
                </div>
            \`).join('');
        }
    }
    
    if (reqBeneficiary) {
        reqBeneficiary.innerHTML = \`<option value="Yo">Para mí</option>\` + familyList.map(f => \`<option value="\${f.id}">Familiar: \${f.name}</option>\`).join('');
    }
}
`;
    fs.writeFileSync('public/assets/js/citizen-logic.js', code);
    console.log('Fixed syntax error');
}
