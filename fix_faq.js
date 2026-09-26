const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

const faqHtml = `<!-- FAQ (PREGUNTAS FRECUENTES) -->
    <section id="faq" class="py-24 bg-[#0A1526] border-t border-white/5">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 reveal">
                <h2 class="text-3xl font-extrabold text-white mb-4">Preguntas Frecuentes</h2>
                <p class="text-gray-400">Resolvemos todas tus dudas sobre nuestro servicio de acompa&ntilde;amiento.</p>
            </div>

            <div class="space-y-4 reveal delay-100">
                <!-- FAQ Item 1 -->
                <div class="glass-card rounded-2xl overflow-hidden faq-item">
                    <button class="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none faq-btn">
                        <span class="text-white font-semibold">&iquest;Qu&eacute; es MyHero y para qu&eacute; sirve?</span>
                        <svg class="w-5 h-5 text-cyan-500 transform transition-transform duration-300 faq-icon rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div class="faq-content open">
                        <div class="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
                            MyHero es una plataforma que te conecta con "H&eacute;roes" verificados para brindarte acompa&ntilde;amiento presencial, compa&ntilde;&iacute;a y seguridad preventiva en tu d&iacute;a a d&iacute;a (citas m&eacute;dicas, gestiones de valor, ocio nocturno, etc.).
                        </div>
                    </div>
                </div>

                <!-- FAQ Item 2 -->
                <div class="glass-card rounded-2xl overflow-hidden faq-item">
                    <button class="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none faq-btn">
                        <span class="text-white font-semibold">&iquest;C&oacute;mo funciona el proceso de pago?</span>
                        <svg class="w-5 h-5 text-cyan-500 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div class="faq-content">
                        <div class="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
                            El uso de la aplicaci&oacute;n es gratuito para el ciudadano. El pago del servicio se realiza <strong>de forma directa al Hero</strong> (en efectivo o transferencia/Bizum) al momento del encuentro o finalizado el servicio. Cada Hero configura sus propias tarifas por hora.
                        </div>
                    </div>
                </div>

                <!-- FAQ Item 3 -->
                <div class="glass-card rounded-2xl overflow-hidden faq-item">
                    <button class="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none faq-btn">
                        <span class="text-white font-semibold">&iquest;C&oacute;mo gana dinero la plataforma si yo no pago en la app?</span>
                        <svg class="w-5 h-5 text-cyan-500 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div class="faq-content">
                        <div class="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
                            MyHero funciona con un modelo estilo inDrive: cobramos una comisi&oacute;n autom&aacute;tica del 20% &uacute;nicamente al Hero por cada misi&oacute;n que acepta. El Hero descuenta esta comisi&oacute;n de su billetera virtual prepago dentro de la app.
                        </div>
                    </div>
                </div>

                <!-- FAQ Item 4 -->
                <div class="glass-card rounded-2xl overflow-hidden faq-item">
                    <button class="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none faq-btn">
                        <span class="text-white font-semibold">&iquest;Es seguro contratar a un Hero?</span>
                        <svg class="w-5 h-5 text-cyan-500 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div class="faq-content">
                        <div class="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
                            Absolutamente. La seguridad es nuestro pilar central. Todos los perfiles pasan por un filtro estricto de 4 fases que incluye: verificaci&oacute;n de identidad (DNI), revisi&oacute;n de antecedentes penales y una entrevista exhaustiva. Solo aprobamos al 12% de los solicitantes.
                        </div>
                    </div>
                </div>

                <!-- FAQ Item 5 -->
                <div class="glass-card rounded-2xl overflow-hidden faq-item">
                    <button class="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none faq-btn">
                        <span class="text-white font-semibold">&iquest;Puedo pedir un Hero para otra persona?</span>
                        <svg class="w-5 h-5 text-cyan-500 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div class="faq-content">
                        <div class="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
                            S&iacute;. En tu panel de ciudadano cuentas con la herramienta "Red Familiar". Puedes registrar los perfiles de tus padres, hijos o pareja (incluyendo observaciones m&eacute;dicas) y solicitar misiones de acompa&ntilde;amiento espec&iacute;ficamente para ellos.
                        </div>
                    </div>
                </div>

                <!-- FAQ Item 6 -->
                <div class="glass-card rounded-2xl overflow-hidden faq-item">
                    <button class="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none faq-btn">
                        <span class="text-white font-semibold">&iquest;Cu&aacute;les son los niveles de los H&eacute;roes?</span>
                        <svg class="w-5 h-5 text-cyan-500 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div class="faq-content">
                        <div class="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
                            Existen 3 niveles: <strong>Nivel 1</strong> (Compa&ntilde;&iacute;a general y emp&aacute;tica), <strong>Nivel 2</strong> (Presencia Asistencial con deportistas o perfiles robustos para disuasi&oacute;n), y <strong>Nivel 3</strong> (Especialistas con certificaciones en crisis, seguridad o primeros auxilios).
                        </div>
                    </div>
                </div>

                <!-- FAQ Item 7 -->
                <div class="glass-card rounded-2xl overflow-hidden faq-item">
                    <button class="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none faq-btn">
                        <span class="text-white font-semibold">&iquest;C&oacute;mo s&eacute; que mi familiar est&aacute; a salvo durante la misi&oacute;n?</span>
                        <svg class="w-5 h-5 text-cyan-500 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div class="faq-content">
                        <div class="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
                            Una vez iniciada la misi&oacute;n, la plataforma activa un sistema integrado de <strong>seguimiento por GPS en tiempo real</strong>. Esto te permite monitorear la ruta completa desde tu dispositivo hasta que la misi&oacute;n finalice con &eacute;xito.
                        </div>
                    </div>
                </div>

                <!-- FAQ Item 8 -->
                <div class="glass-card rounded-2xl overflow-hidden faq-item">
                    <button class="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none faq-btn">
                        <span class="text-white font-semibold">&iquest;Hay alg&uacute;n bot&oacute;n de p&aacute;nico o emergencia?</span>
                        <svg class="w-5 h-5 text-cyan-500 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div class="faq-content">
                        <div class="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
                            S&iacute;. Tanto el ciudadano como el Hero cuentan con un bot&oacute;n de "Centro de Seguridad SOS" en sus respectivos paneles. Esto permite alertar de inmediato a las autoridades o enviar avisos en caso de cualquier eventualidad durante el trayecto.
                        </div>
                    </div>
                </div>

                <!-- FAQ Item 9 -->
                <div class="glass-card rounded-2xl overflow-hidden faq-item">
                    <button class="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none faq-btn">
                        <span class="text-white font-semibold">&iquest;Qu&eacute; tipos de misiones puedo solicitar?</span>
                        <svg class="w-5 h-5 text-cyan-500 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div class="faq-content">
                        <div class="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
                            Puedes filtrar tu solicitud en 5 categor&iacute;as principales: Acompa&ntilde;amiento Simple (paseos, citas m&eacute;dicas), Ocio y Nocturno (retorno seguro a casa), Gesti&oacute;n de Valor (ir al banco), Asistencia/Recados, y Otras misiones espec&iacute;ficas.
                        </div>
                    </div>
                </div>

                <!-- FAQ Item 10 -->
                <div class="glass-card rounded-2xl overflow-hidden faq-item">
                    <button class="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none faq-btn">
                        <span class="text-white font-semibold">Soy Hero, &iquest;c&oacute;mo funciona mi billetera y el cobro?</span>
                        <svg class="w-5 h-5 text-cyan-500 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div class="faq-content">
                        <div class="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
                            En tu panel tendr&aacute;s una secci&oacute;n "Saldo / Recargas". Debes ingresar un m&iacute;nimo de 10 Euros a tu billetera virtual (v&iacute;a tarjeta o Bizum). Al aceptar una misi&oacute;n, cobramos nuestra comisi&oacute;n del 20% rest&aacute;ndola de este saldo. T&uacute; cobras el 100% en efectivo directamente del ciudadano.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

const startToken = '<!-- FAQ (PREGUNTAS FRECUENTES) -->';
const endToken = '<!-- FOOTER -->';

const startIndex = html.indexOf(startToken);
const endIndex = html.indexOf(endToken);

if (startIndex !== -1 && endIndex !== -1) {
    html = html.substring(0, startIndex) + faqHtml + '\n\n    ' + html.substring(endIndex);
    fs.writeFileSync('public/index.html', html, 'utf8');
    console.log('FAQ replaced successfully');
} else {
    console.log('Tokens not found');
}
