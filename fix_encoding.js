const fs = require('fs');

let html = fs.readFileSync('public/dashboard-ciudadano.html', 'utf8');

// Use literal strings and indexOf instead of complex regexes that break
html = html.replace(/<label class="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Tel.*? de Contacto<\/label>/g, '<label class="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">TELEFONO DE CONTACTO</label>');
html = html.replace(/\+ A.*?dir Familiar/g, '+ Anadir Familiar');
html = html.replace(/A.*?dir Familiar<\/h3>/g, 'Anadir Familiar</h3>');
html = html.replace(/Gestiona tu informaci.*? personal/g, 'Gestiona tu informacion personal');
html = html.replace(/A.*?n no tienes familiares/g, 'Aun no tienes familiares');
html = html.replace(/Red Familiar<\/a>/g, 'Red Familiar</a>');

fs.writeFileSync('public/dashboard-ciudadano.html', html, 'utf8');

let js = fs.readFileSync('public/assets/js/citizen-logic.js', 'utf8');
js = js.replace(/<span class="text-2xl font-extrabold text-white">\$\{lowestRate\}.*?<\/span>/g, '<span class="text-2xl font-extrabold text-white">${lowestRate} Euros</span>');
js = js.replace(/A.*?n no tienes familiares/g, 'Aun no tienes familiares');
fs.writeFileSync('public/assets/js/citizen-logic.js', js, 'utf8');

console.log("Fixed via file");
