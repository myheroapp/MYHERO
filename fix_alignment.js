const fs = require('fs');

function updateHtml(path) {
    if (!fs.existsSync(path)) return;
    let html = fs.readFileSync(path, 'utf8');

    // 1. Replace the SVG to make sure it's consistent
    const svgRegex = /<svg class="absolute inset-0 w-full h-full text-cyan-500 opacity-50"[^>]*>\s*<line x1="20%" y1="80%" x2="80%" y2="20%" stroke="currentColor" stroke-width="2" stroke-dasharray="5,5" fill="none" \/>\s*<\/svg>/s;
    
    // 2. Replace the glowing dot (currently at top-1/2 left-1/2)
    const dotRegex = /<div class="absolute top-1\/2 left-1\/2 transform -translate-x-1\/2 -translate-y-1\/2">\s*<div\s*class="absolute inset-0 bg-cyan-500 rounded-full animate-ping opacity-50 w-8 h-8 -ml-2 -mt-2">\s*<\/div>\s*<div\s*class="w-4 h-4 bg-cyan-400 rounded-full border-2 border-obsidian-900 relative z-10 shadow-\[0_0_10px_#22d3ee\]">\s*<\/div>\s*<\/div>/s;
    
    // 3. Replace the Hero avatar (currently at bottom-16 left-12)
    const heroRegex = /<div class="absolute bottom-16 left-12 flex flex-col items-center animate-float">\s*<div\s*class="bg-obsidian-800 text-white border border-obsidian-700 text-\[10px\] font-bold px-2 py-1 rounded mb-1 shadow-lg">\s*Llegando \(2 min\)<\/div>\s*<img src="https:\/\/i.pravatar.cc\/150\?img=11"\s*class="w-10 h-10 rounded-full border-2 border-cyan-500 shadow-\[0_0_15px_rgba\(6,182,212,0.5\)\]">\s*<\/div>/s;

    const newDot = `<div class="absolute" style="top: 20%; left: 80%; transform: translate(-50%, -50%);">
                                    <div class="absolute inset-0 bg-cyan-500 rounded-full animate-ping opacity-50 w-8 h-8 -ml-2 -mt-2">
                                    </div>
                                    <div class="w-4 h-4 bg-cyan-400 rounded-full border-2 border-obsidian-900 relative z-10 shadow-[0_0_10px_#22d3ee]">
                                    </div>
                                </div>`;

    const newHero = `<div class="absolute flex flex-col items-center animate-float" style="top: 80%; left: 20%; transform: translate(-50%, -50%);">
                                    <div class="bg-obsidian-800 text-white border border-obsidian-700 text-[10px] font-bold px-2 py-1 rounded mb-1 shadow-lg">
                                        Llegando (2 min)</div>
                                    <img src="https://i.pravatar.cc/150?img=11"
                                        class="w-10 h-10 rounded-full border-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                                </div>`;

    html = html.replace(dotRegex, newDot);
    html = html.replace(heroRegex, newHero);
    
    fs.writeFileSync(path, html, 'utf8');
}

updateHtml('public/index.html');
updateHtml('dist/index.html');
console.log("Aligned dot and hero perfectly on the dashed line");
