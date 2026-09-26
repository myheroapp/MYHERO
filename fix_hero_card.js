const fs = require('fs');
let code = fs.readFileSync('public/assets/js/citizen-logic.js', 'utf8');

const replacement = `
        const heroLevelBadge = h.heroLevel ? \`<span class="text-xs font-bold text-cyan-400 mt-1 block">\${h.heroLevel}</span>\` : '';
        const onlineDot = h.isOnline ? \`<div class="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-obsidian-950 rounded-full"></div>\` : \`<div class="absolute bottom-0 right-0 w-4 h-4 bg-gray-500 border-2 border-obsidian-950 rounded-full"></div>\`;

        let lowestRate = 0;
        if (h.rates) {
            const validRates = Object.values(h.rates).map(r => parseFloat(r)).filter(r => !isNaN(r) && r > 0);
            if(validRates.length > 0) {
                lowestRate = Math.min(...validRates);
            }
        }
        
        const rateHtml = lowestRate > 0 ? \`
            <div class="mt-4 pt-3 border-t border-white/5 flex items-baseline gap-1">
                <span class="text-xs text-gray-500 uppercase font-bold">Desde</span> 
                <span class="text-2xl font-extrabold text-white">\${lowestRate} €</span>
                <span class="text-xs text-gray-400">/hora</span>
            </div>
        \` : \`
            <div class="mt-4 pt-3 border-t border-white/5 flex items-baseline gap-1">
                <span class="text-xs text-gray-500 uppercase font-bold">Tarifa:</span> 
                <span class="text-sm font-bold text-gray-400">A consultar</span>
            </div>
        \`;

        html += \`
        <div class="dash-card border-cyan-500/20 hover:border-cyan-500/60 shadow-lg transition-all group relative overflow-hidden flex flex-col">
            <div class="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div class="flex items-center gap-4 mb-4 relative z-10">
                <div class="relative w-16 h-16">
                    <img src="https://i.pravatar.cc/150?img=\${avatarNum}" class="w-full h-full rounded-full border-2 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                    \${onlineDot}
                </div>
                <div>
                    <h3 class="font-bold text-white text-lg">\${h.name}</h3>
                    <p class="text-xs text-amber-500 font-bold flex items-center gap-1">
                        ? \${rating} <span class="text-gray-500">| Hero Verificado</span>
                    </p>
                    \${heroLevelBadge}
                </div>
            </div>
            
            <div class="text-sm text-gray-400 mb-6 flex-1 relative z-10 cursor-pointer" onclick="const p = this.querySelector('p.bio-text'); p.classList.toggle('line-clamp-3'); const hint = this.querySelector('.expand-hint'); hint.innerText = p.classList.contains('line-clamp-3') ? 'VER MÁS...' : 'VER MENOS';">
                <p class="bio-text line-clamp-3 transition-all duration-300">\${bioText}</p>
                <div class="expand-hint mt-1 text-[10px] uppercase tracking-wider font-bold text-cyan-500/70 hover:text-cyan-400">VER MÁS...</div>
                <div class="mt-3 flex flex-wrap gap-2">
                    \${skillsHtml}
                </div>
                \${rateHtml}
            </div>
            
            <button onclick="requestSpecificHero('\${h.id}', '\${h.name}')" class="w-full bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 font-extrabold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] relative z-10">
                Contactar Ahora
            </button>
        </div>
        \`;
`;

// regex to replace the existing logic
const regex = /const heroLevelBadge = h\.heroLevel \? .*?<\/button>\s*<\/div>\s*`;/s;
code = code.replace(regex, replacement);

fs.writeFileSync('public/assets/js/citizen-logic.js', code);
console.log('Fixed hero catalog card UI');
