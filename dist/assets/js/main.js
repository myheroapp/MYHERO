document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. LÓGICA DEL MENÚ MÓVIL (Hamburguesa)
    // ==========================================
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    let isMenuOpen = false;

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                // Pequeño timeout para que la transición de opacidad funcione
                setTimeout(() => {
                    mobileMenu.classList.remove('opacity-0', '-translate-y-4');
                    mobileMenu.classList.add('opacity-100', 'translate-y-0');
                }, 10);
                // Cambiar ícono a 'X'
                menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            } else {
                mobileMenu.classList.remove('opacity-100', 'translate-y-0');
                mobileMenu.classList.add('opacity-0', '-translate-y-4');
                // Esperar a que acabe la transición para ocultarlo con display:none
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
                // Cambiar ícono a hamburguesa
                menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            }
        });

        // Cerrar menú al hacer clic en un enlace
        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.click(); // Simula el clic para cerrar
            });
        });
    }


    // ==========================================
    // 2. ANIMACIONES AL HACER SCROLL (Reveal)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });


    // ==========================================
    // 3. LÓGICA DE PREGUNTAS FRECUENTES (FAQ)
    // ==========================================
    const faqButtons = document.querySelectorAll('.faq-btn');
    
    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');
            
            // Toggle de la clase open para animación de altura suave
            content.classList.toggle('open');
            icon.classList.toggle('rotate-180');
            
            // Opcional: Cerrar los demás acordeones al abrir uno
            faqButtons.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    const otherContent = otherBtn.nextElementSibling;
                    const otherIcon = otherBtn.querySelector('.faq-icon');
                    if(otherContent.classList.contains('open')) {
                        otherContent.classList.remove('open');
                        otherIcon.classList.remove('rotate-180');
                    }
                }
            });
        });
    });


    // ==========================================
    // 4. LÓGICA DEL FORMULARIO / TERMINAL HERO
    // ==========================================
    const btnScan = document.getElementById('btn-scan');
    const stepForm = document.getElementById('step-form');
    const stepScan = document.getElementById('step-scan');
    const stepLogin = document.getElementById('step-login');
    const scanText = document.getElementById('scan-text');

    if(btnScan) {
        btnScan.addEventListener('click', () => {
            // Ocultar formulario suavemente
            stepForm.classList.remove('fade-in-step');
            stepForm.classList.add('hidden-step');
            
            // Mostrar escaneo
            stepScan.classList.remove('hidden-step');
            stepScan.classList.add('fade-in-step');

            // Textos simulados de carga
            setTimeout(() => { scanText.innerText = "Filtrando Nivel y Misión seleccionada..."; }, 800);
            setTimeout(() => { scanText.innerText = "Verificando disponibilidad de agenda en tu zona..."; }, 1600);
            setTimeout(() => { scanText.innerText = "Conectando servidores de seguridad..."; }, 2400);

            // Transición a resultado
            setTimeout(() => {
                stepScan.classList.add('hidden-step');
                stepLogin.classList.remove('hidden-step');
                stepLogin.classList.add('fade-in-step');
            }, 3200);
        });
    }
});
