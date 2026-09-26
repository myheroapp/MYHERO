const fs = require('fs');
let code = fs.readFileSync('public/dashboard-ciudadano.html', 'utf8');

// Replace 4 consecutive closing divs with 3 before TAB: FAMILIA
code = code.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<!-- TAB: FAMILIA -->/g, '</div>\n                    </div>\n                </div>\n\n                <!-- TAB: FAMILIA -->');

fs.writeFileSync('public/dashboard-ciudadano.html', code);
console.log("Replaced with regex");
