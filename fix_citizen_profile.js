const fs = require('fs');
let code = fs.readFileSync('public/assets/js/citizen-logic.js', 'utf8');

const logicToAppend = `

// CIUDADANO PERFIL LOGIC
const formCitizenProfile = document.getElementById('formCitizenProfile');
if(formCitizenProfile) {
    formCitizenProfile.addEventListener('submit', async (e) => {
        e.preventDefault();
        if(!currentUser) return;
        
        const newName = document.getElementById('citNameInput').value;
        const newPhone = document.getElementById('citPhoneInput').value;
        const newLoc = document.getElementById('citLocationInput').value;
        
        const btn = formCitizenProfile.querySelector('button[type="submit"]');
        btn.textContent = "Guardando...";
        btn.disabled = true;
        
        try {
            // update doc
            await setDoc(doc(db, "users", currentUser.uid), {
                name: newName,
                phone: newPhone,
                locationString: newLoc,
                updatedAt: new Date().toISOString()
            }, { merge: true });
            
            if (document.getElementById('userNameDisplay')) {
                document.getElementById('userNameDisplay').textContent = newName;
            }
            alert("Perfil actualizado correctamente.");
        } catch(err) {
            console.error(err);
            alert("Error al actualizar perfil.");
        } finally {
            btn.textContent = "Guardar Cambios";
            btn.disabled = false;
        }
    });
}
`;

if (!code.includes('formCitizenProfile.addEventListener')) {
    code += logicToAppend;
}

// Add loading logic into onAuthStateChanged
const loadLogic = `
            if(document.getElementById('citNameInput')) document.getElementById('citNameInput').value = userDoc.data().name || '';
            if(document.getElementById('citPhoneInput')) document.getElementById('citPhoneInput').value = userDoc.data().phone || '';
            if(document.getElementById('citLocationInput')) document.getElementById('citLocationInput').value = userDoc.data().locationString || '';
`;

const marker = `if (userNameDisplay) userNameDisplay.textContent = userDoc.data().name;`;
if (code.includes(marker) && !code.includes('citNameInput')) {
    code = code.replace(marker, marker + '\n' + loadLogic);
}

fs.writeFileSync('public/assets/js/citizen-logic.js', code);
console.log('Fixed citizen logic profile');
