const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const regex = /<div class="h-\[55%\] relative overflow-hidden bg-\[#0A1526\]">[\s\S]*?<div class="absolute inset-0 opacity-20"[\s\S]*?<\/div>/;

const replacement = `<div class="h-[55%] relative overflow-hidden bg-obsidian-950">
                                <!-- Mapa de Fondo -->
                                <div class="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity" style="background-image: url('./assets/img/mapa-elche.jpg');"></div>
                                <div class="absolute inset-0 bg-[#0A1526]/70"></div>
                                <div class="absolute inset-0 bg-cyan-900/30 mix-blend-color"></div>
                                
                                <div class="absolute inset-0 opacity-10"
                                    style="background-image: linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px); background-size: 20px 20px;">
                                </div>`;

if(regex.test(html)) {
    html = html.replace(regex, replacement);
    fs.writeFileSync('public/index.html', html, 'utf8');

    if (fs.existsSync('dist/index.html')) {
        let htmlDist = fs.readFileSync('dist/index.html', 'utf8');
        htmlDist = htmlDist.replace(regex, replacement);
        fs.writeFileSync('dist/index.html', htmlDist, 'utf8');
        fs.copyFileSync('public/assets/img/mapa-elche.jpg', 'dist/assets/img/mapa-elche.jpg');
    }
    console.log("Map injected successfully");
} else {
    console.log("Regex not matched");
}
