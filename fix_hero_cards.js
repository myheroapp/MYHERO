const fs = require('fs');

function updateHtml(path) {
    if (!fs.existsSync(path)) return;
    let html = fs.readFileSync(path, 'utf8');

    // Nivel 1 Replacement
    let n1Regex = /<div class="bg-obsidian-900\/50 backdrop-blur-xl border border-white\/5 rounded-3xl p-8 hover:-translate-y-2 hover:border-cyan-500\/50 hover:shadow-\[0_10px_40px_-10px_rgba\(6,182,212,0\.3\)\] transition-all duration-300 group relative overflow-hidden reveal delay-100 flex flex-col">\s*<div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 opacity-50 group-hover:opacity-100 transition-opacity"><\/div>/s;
    
    let n1New = `<div class="bg-obsidian-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.3)] transition-all duration-300 group relative overflow-hidden reveal delay-100 flex flex-col">
                    <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 opacity-50 group-hover:opacity-100 transition-opacity z-20"></div>
                    <!-- Foto de Fondo Integrada -->
                    <div class="absolute inset-0 bg-cover bg-top opacity-30 group-hover:opacity-50 transition-opacity duration-500 mix-blend-luminosity z-0" style="background-image: url('./assets/img/normal.jpg'); -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%); mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);"></div>
                    <div class="absolute inset-0 bg-cyan-900/10 mix-blend-color z-0"></div>
                    
                    <div class="relative z-10 flex flex-col flex-grow">`;

    // Nivel 2 Replacement
    let n2Regex = /<div class="bg-obsidian-900\/50 backdrop-blur-xl border border-blue-500\/20 rounded-3xl p-8 hover:-translate-y-2 hover:border-blue-500\/50 hover:shadow-\[0_10px_40px_-10px_rgba\(59,130,246,0\.3\)\] transition-all duration-300 group relative overflow-hidden reveal delay-200 flex flex-col">\s*<div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 opacity-50 group-hover:opacity-100 transition-opacity"><\/div>/s;
    
    let n2New = `<div class="bg-obsidian-900/50 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-8 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.3)] transition-all duration-300 group relative overflow-hidden reveal delay-200 flex flex-col">
                    <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 opacity-50 group-hover:opacity-100 transition-opacity z-20"></div>
                    <!-- Foto de Fondo Integrada -->
                    <div class="absolute inset-0 bg-cover bg-top opacity-30 group-hover:opacity-50 transition-opacity duration-500 mix-blend-luminosity z-0" style="background-image: url('./assets/img/musculoso.jpg'); -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%); mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);"></div>
                    <div class="absolute inset-0 bg-blue-900/10 mix-blend-color z-0"></div>
                    
                    <div class="relative z-10 flex flex-col flex-grow">`;

    // Nivel 3 Replacement
    let n3Regex = /<div class="bg-obsidian-900\/50 backdrop-blur-xl border border-amber-500\/20 rounded-3xl p-8 hover:-translate-y-2 hover:border-amber-500\/50 hover:shadow-\[0_10px_40px_-10px_rgba\(245,158,11,0\.25\)\] transition-all duration-300 group relative overflow-hidden reveal delay-300 flex flex-col">\s*<div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 opacity-50 group-hover:opacity-100 transition-opacity"><\/div>/s;

    let n3New = `<div class="bg-obsidian-900/50 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-8 hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-[0_10px_40px_-10px_rgba(245,158,11,0.25)] transition-all duration-300 group relative overflow-hidden reveal delay-300 flex flex-col">
                    <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 opacity-50 group-hover:opacity-100 transition-opacity z-20"></div>
                    <!-- Foto de Fondo Integrada -->
                    <div class="absolute inset-0 bg-cover bg-top opacity-30 group-hover:opacity-50 transition-opacity duration-500 mix-blend-luminosity z-0" style="background-image: url('./assets/img/karateka.jpg'); -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%); mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);"></div>
                    <div class="absolute inset-0 bg-amber-900/10 mix-blend-color z-0"></div>
                    
                    <div class="relative z-10 flex flex-col flex-grow">`;

    // We also need to close the `<div class="relative z-10...">` wrapper at the end of each card before the closing `</div>`.
    // Let's replace `</ul>\n                </div>` with `</ul>\n                    </div>\n                </div>`
    
    html = html.replace(n1Regex, n1New);
    html = html.replace(n2Regex, n2New);
    html = html.replace(n3Regex, n3New);
    
    // Quick fix for the closing tags of the inner flex container
    html = html.replace(/<\/ul>\s*<\/div>\s*<!-- Nivel 2 -->/s, '</ul>\n                    </div>\n                </div>\n\n                <!-- Nivel 2 -->');
    html = html.replace(/<\/ul>\s*<\/div>\s*<!-- Nivel 3 -->/s, '</ul>\n                    </div>\n                </div>\n\n                <!-- Nivel 3 -->');
    html = html.replace(/<\/ul>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/s, '</ul>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>');

    fs.writeFileSync(path, html, 'utf8');
}

updateHtml('public/index.html');
console.log("Images injected");
