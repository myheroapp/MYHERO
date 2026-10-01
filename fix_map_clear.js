const fs = require('fs');

function updateHtml(path) {
    if (!fs.existsSync(path)) return;
    let html = fs.readFileSync(path, 'utf8');

    // Remove the coordinates badge
    const coordRegex = /<div\s+class="absolute top-4 left-4 z-10 bg-obsidian-900\/80 px-2 py-1 rounded text-\[10px\] text-cyan-400 border border-cyan-500\/30 font-mono">\s*Elche: 38\.26.*?<\/div>/s;
    html = html.replace(coordRegex, '');

    // Restore the map colors
    const oldMapRegex = /<div class="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"[^>]*><\/div>\s*<div class="absolute inset-0 bg-\[#0A1526\]\/70"><\/div>\s*<div class="absolute inset-0 bg-cyan-900\/30 mix-blend-color"><\/div>/s;
    
    const newMapHtml = `<div class="absolute inset-0 bg-cover bg-center" style="background-image: url('./assets/img/mapa-elche.jpg');"></div>
                                <div class="absolute inset-0 bg-obsidian-950/40"></div>`;
                                
    html = html.replace(oldMapRegex, newMapHtml);
    
    fs.writeFileSync(path, html, 'utf8');
}

updateHtml('public/index.html');
updateHtml('dist/index.html');
console.log("Map cleared and coordinates removed.");
