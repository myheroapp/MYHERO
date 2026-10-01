const fs = require('fs');

function updateHtml(path) {
    if (!fs.existsSync(path)) return;
    let html = fs.readFileSync(path, 'utf8');

    // FIX 1: Adjust Map Line and Hero Avatar so it doesn't get cut off
    // The line was 20% 80% to 80% 20%. Let's change it to 25% 65% to 80% 20%
    const svgRegex = /<svg class="absolute inset-0 w-full h-full text-cyan-500 opacity-50"[^>]*>\s*<line x1="20%" y1="80%" x2="80%" y2="20%" stroke="currentColor" stroke-width="2" stroke-dasharray="5,5" fill="none" \/>\s*<\/svg>/s;
    const newSvg = `<svg class="absolute inset-0 w-full h-full text-cyan-500 opacity-50" preserveAspectRatio="none">
                                    <line x1="25%" y1="65%" x2="80%" y2="20%" stroke="currentColor" stroke-width="2" stroke-dasharray="5,5" fill="none" />
                                </svg>`;
    html = html.replace(svgRegex, newSvg);

    // Update Hero Avatar position
    const heroRegex = /<div class="absolute flex flex-col items-center animate-float" style="top: 80%; left: 20%; transform: translate\(-50%, -50%\);">/s;
    html = html.replace(heroRegex, `<div class="absolute flex flex-col items-center animate-float" style="top: 65%; left: 25%; transform: translate(-50%, -50%); z-index: 10;">`);


    // FIX 2: Rewrite the 3 Nivel Cards to have the hover swap effect
    const levelsRegex = /<div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/s;
    
    const newLevels = `<div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                <!-- Nivel 1 -->
                <div class="bg-obsidian-900/90 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.3)] transition-all duration-500 group relative overflow-hidden reveal delay-100 flex flex-col min-h-[450px]">
                    <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 opacity-50 group-hover:opacity-100 transition-opacity z-20"></div>
                    
                    <!-- Foto difuminada base -->
                    <div class="absolute inset-0 bg-cover bg-top opacity-30 group-hover:opacity-0 transition-opacity duration-500 mix-blend-luminosity z-0" style="background-image: url('./assets/img/normal.jpg'); -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);"></div>
                    <!-- Foto Full (Aparece en hover) -->
                    <div class="absolute inset-0 bg-cover bg-top opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" style="background-image: url('./assets/img/normal.jpg');"></div>
                    <!-- Capa oscura extra para texto -->
                    <div class="absolute inset-0 bg-obsidian-950/40 group-hover:opacity-0 transition-opacity duration-500 z-0"></div>

                    <div class="relative z-10 flex flex-col flex-grow transition-opacity duration-500 group-hover:opacity-0">
                        <div class="flex justify-between items-start mb-6 mt-2">
                            <div class="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            </div>
                            <span class="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">Nivel 1</span>
                        </div>

                        <h3 class="text-2xl font-bold text-white mb-1">Acompa&ntilde;ante Est&aacute;ndar</h3>
                        <p class="text-cyan-400 text-sm font-semibold mb-5">Compa&ntilde;&iacute;a general y empat&iacute;a.</p>
                        
                        <p class="text-gray-300 text-sm mb-8 leading-relaxed flex-grow">Personas de absoluta confianza, educadas y emp&aacute;ticas. Ideales para acompa&ntilde;ar en caminatas, trayectos cotidianos, o simplemente cuando prefieres no ir solo.</p>
                        
                        <ul class="text-sm text-gray-300 space-y-4">
                            <li class="flex items-start gap-3">
                                <div class="mt-1 w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                    <svg class="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                </div>
                                <span class="leading-tight">Entrevista exhaustiva aprobada</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <div class="mt-1 w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                    <svg class="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                </div>
                                <span class="leading-tight">Rastreo GPS en tiempo real</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Nivel 2 -->
                <div class="bg-obsidian-900/90 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-8 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.3)] transition-all duration-500 group relative overflow-hidden reveal delay-200 flex flex-col min-h-[450px]">
                    <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 opacity-50 group-hover:opacity-100 transition-opacity z-20"></div>
                    
                    <!-- Foto difuminada base -->
                    <div class="absolute inset-0 bg-cover bg-top opacity-30 group-hover:opacity-0 transition-opacity duration-500 mix-blend-luminosity z-0" style="background-image: url('./assets/img/musculoso.jpg'); -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);"></div>
                    <!-- Foto Full (Aparece en hover) -->
                    <div class="absolute inset-0 bg-cover bg-top opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" style="background-image: url('./assets/img/musculoso.jpg');"></div>
                    <!-- Capa oscura extra para texto -->
                    <div class="absolute inset-0 bg-obsidian-950/40 group-hover:opacity-0 transition-opacity duration-500 z-0"></div>

                    <div class="relative z-10 flex flex-col flex-grow transition-opacity duration-500 group-hover:opacity-0">
                        <div class="flex justify-between items-start mb-6 mt-2">
                            <div class="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"></path></svg>
                            </div>
                            <span class="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">Nivel 2</span>
                        </div>

                        <h3 class="text-2xl font-bold text-white mb-1">Presencia Asistencial</h3>
                        <p class="text-blue-400 text-sm font-semibold mb-5">Respaldo visual y f&iacute;sico.</p>
                        
                        <p class="text-gray-300 text-sm mb-8 leading-relaxed flex-grow">Perfiles atl&eacute;ticos, deportistas o personal trainers. Aportan una gran sensaci&oacute;n de respaldo visual por su tama&ntilde;o y condici&oacute;n. Perfectos para salidas nocturnas o retornos a casa.</p>
                        
                        <ul class="text-sm text-gray-300 space-y-4">
                            <li class="flex items-start gap-3">
                                <div class="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                    <svg class="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                </div>
                                <span class="leading-tight">Atributos f&iacute;sicos destacados</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <div class="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                    <svg class="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                </div>
                                <span class="leading-tight">Alta capacidad de disuasi&oacute;n pasiva</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Nivel 3 -->
                <div class="bg-obsidian-900/90 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-8 hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-[0_10px_40px_-10px_rgba(245,158,11,0.25)] transition-all duration-500 group relative overflow-hidden reveal delay-300 flex flex-col min-h-[450px]">
                    <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 opacity-50 group-hover:opacity-100 transition-opacity z-20"></div>
                    
                    <!-- Foto difuminada base -->
                    <div class="absolute inset-0 bg-cover bg-top opacity-30 group-hover:opacity-0 transition-opacity duration-500 mix-blend-luminosity z-0" style="background-image: url('./assets/img/karateka.jpg'); -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);"></div>
                    <!-- Foto Full (Aparece en hover) -->
                    <div class="absolute inset-0 bg-cover bg-top opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" style="background-image: url('./assets/img/karateka.jpg');"></div>
                    <!-- Capa oscura extra para texto -->
                    <div class="absolute inset-0 bg-obsidian-950/40 group-hover:opacity-0 transition-opacity duration-500 z-0"></div>

                    <div class="relative z-10 flex flex-col flex-grow transition-opacity duration-500 group-hover:opacity-0">
                        <div class="flex justify-between items-start mb-6 mt-2">
                            <div class="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            </div>
                            <span class="bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">Nivel 3</span>
                        </div>

                        <h3 class="text-2xl font-bold text-white mb-1">Especialista</h3>
                        <p class="text-amber-500 text-sm font-semibold mb-5">Experiencia certificada.</p>
                        
                        <p class="text-gray-300 text-sm mb-8 leading-relaxed flex-grow">El m&aacute;ximo nivel de tranquilidad. Profesionales con certificaciones (Cintur&oacute;n negro en artes marciales, ex-militares, rescatistas). Ideales para gestiones de alto valor o m&aacute;xima prevenci&oacute;n.</p>
                        
                        <ul class="text-sm text-gray-300 space-y-4">
                            <li class="flex items-start gap-3">
                                <div class="mt-1 w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                    <svg class="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                </div>
                                <span class="leading-tight">Certificaciones verificadas</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <div class="mt-1 w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                    <svg class="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                </div>
                                <span class="leading-tight">Manejo de crisis / Primeros Auxilios</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

    html = html.replace(levelsRegex, newLevels);
    fs.writeFileSync(path, html, 'utf8');
}

updateHtml('public/index.html');
updateHtml('dist/index.html');
console.log("Fixed map avatar cutoff and implemented hover image effect");
