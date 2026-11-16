// ============================================================================
// HEROLY ESPAÑA (VERSIÓN 1) - LÓGICA ESTILO SITLY (CATÁLOGO PÚBLICO, DUAL ROLE, PERFIL 2 COLUMNAS)
// ============================================================================

const DAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

// 1. BASE DE DATOS CURADA DE HÉROES VERIFICADOS EN ESPAÑA (PRECIOS REALISTAS 8€ - 18€/h)
const DEFAULT_HEROES = [
    {
        id: 'hero-alejandro',
        name: 'Alejandro',
        age: 35,
        city: 'Valencia',
        zone: 'Eixample / Ruzafa',
        level: 1,
        levelLabel: 'Nivel 1 · Acompañamiento Cívico',
        rate: 8,
        rating: '5,0',
        reviewsCount: 19,
        experience: '3+ años de experiencia',
        online: 'Online ahora',
        isOnlineNow: true,
        photo: './assets/img/normal.jpg',
        shortBio: 'Graduado en Psicología con amplia experiencia en acompañamiento de personas mayores, visitas médicas, paseos tranquilos y gestiones administrativas.',
        fullBio: '¡Hola! Soy Alejandro, tengo 35 años y vivo en Valencia. Soy graduado universitario y me apasiona el trato humano, especialmente con nuestros mayores. Si necesitas que un Héroe de total confianza acompañe a tus padres al hospital, al banco, a dar un paseo matutino o a hacer la compra mientras trabajas, puedes contar conmigo.',
        daysAvailable: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'],
        schedule: {
            manana: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'],
            tarde: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'],
            noche: []
        },
        missions: ['Mayores y Médicos', 'Bancos y Cajeros', 'Trayectos A-B'],
        experienceCards: [
            { title: 'Especialista en Mayores', subtitle: 'Paciencia, conversación y empatía', icon: 'elderly' },
            { title: 'Citas Médicas y Hospitales', subtitle: 'Toma de notas médicas para la familia', icon: 'medical' },
            { title: 'Gestiones Cotidianas', subtitle: 'Compras, farmacia y ayuntamiento', icon: 'bank' }
        ],
        capabilities: ['Reporte detallado a los hijos tras la cita médica', 'Ayuda con bolsas de compra o movilidad', 'Puntualidad máxima', 'Antecedentes penales verificados'],
        references: [
            { author: 'Teresa S.', date: 'Hace 4 días', stars: 5, text: 'Alejandro es un encanto. Acompaña a mi padre todos los martes y jueves al centro médico y a pasear por 8 €/h. Mi padre está encantado con él.' }
        ]
    },
    {
        id: 'hero-patricia',
        name: 'Patricia',
        age: 40,
        city: 'Zaragoza',
        zone: 'Centro / Romareda',
        level: 1,
        levelLabel: 'Nivel 1 · Acompañamiento Cívico',
        rate: 9,
        rating: '5,0',
        reviewsCount: 11,
        experience: '5+ años de experiencia',
        online: 'Online ahora',
        isOnlineNow: true,
        photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&w=500&q=80',
        shortBio: 'Auxiliar de enfermería. Especializada en acompañar a personas mayores a consultas médicas, rehabilitación, bancos y paseos seguros.',
        fullBio: 'Soy Patricia, tengo 40 años y vivo en Zaragoza. Por mi vocación sanitaria sé lo importante que es que nuestros mayores vayan bien acompañados al médico o al banco, enterándose de todo lo que les dice el doctor y sin correr riesgos en la calle.',
        daysAvailable: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'],
        schedule: {
            manana: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'],
            tarde: ['Lu', 'Mi', 'Vi'],
            noche: []
        },
        missions: ['Mayores y Médicos', 'Bancos y Cajeros'],
        experienceCards: [
            { title: 'Formación Sanitaria', subtitle: 'Trato experto en visitas médicas', icon: 'medical' },
            { title: 'Apoyo Familiar Integral', subtitle: 'Comunicación constante con los hijos', icon: 'elderly' }
        ],
        capabilities: ['Conocimientos médicos y de primeros auxilios', 'Paciencia y cercanía con mayores', 'Vehículo propio disponible'],
        references: [
            { author: 'Ignacio T.', date: 'Hace 6 días', stars: 5, text: 'Patricia llevó a mi madre al especialista en el Hospital Miguel Servet y me llamó al salir para explicarme todo. Un 10.' }
        ]
    },
    {
        id: 'hero-elena',
        name: 'Elena',
        age: 37,
        city: 'Barcelona',
        zone: 'Sarrià / Gràcia',
        level: 1,
        levelLabel: 'Nivel 1 · Acompañamiento Cívico',
        rate: 10,
        rating: '4,9',
        reviewsCount: 22,
        experience: '5+ años de experiencia',
        online: 'Online ahora',
        isOnlineNow: true,
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=500&q=80',
        shortBio: 'Técnica sociosanitaria y Héroe cívica en Barcelona. Ideal para mujeres y personas mayores que buscan compañía cálida y segura en sus desplazamientos.',
        fullBio: 'Soy Elena, tengo 37 años y vivo en Barcelona. Tengo formación sociosanitaria y 5 años de experiencia acompañando a señoras mayores y profesionales en sus desplazamientos por la ciudad, visitas a especialistas médicos, gestiones en bancos o regresos a casa al anochecer.',
        daysAvailable: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        schedule: {
            manana: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
            tarde: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'],
            noche: ['Vi', 'Sa']
        },
        missions: ['Mayores y Médicos', 'Trayectos A-B', 'Bancos y Cajeros'],
        experienceCards: [
            { title: 'Atención Sociosanitaria', subtitle: 'Trato cálido y profesional con mayores', icon: 'elderly' },
            { title: 'Acompañamiento Preventivo', subtitle: 'Confianza y tranquilidad en trayectos', icon: 'shield' }
        ],
        capabilities: ['Titulación sociosanitaria oficial', 'Idiomas: Castellano, Catalán e Inglés', 'Carnet de conducir B', 'Seguimiento GPS activo'],
        references: [
            { author: 'Montserrat P.', date: 'Hace 1 semana', stars: 5, text: 'Elena acompañó a mi tía al oftalmólogo y luego hasta su casa. Nos avisó en todo momento y fue cariñosísima.' }
        ]
    },
    {
        id: 'hero-roberto',
        name: 'Roberto',
        age: 38,
        city: 'Alicante',
        zone: 'Centro / Ensanche Diputación',
        level: 2,
        levelLabel: 'Nivel 2 · Presencia Disuasoria',
        rate: 11,
        rating: '5,0',
        reviewsCount: 14,
        experience: '4+ años de experiencia',
        online: 'Online ahora',
        isOnlineNow: true,
        photo: './assets/img/roberto.jpg',
        shortBio: 'Deportista y Héroe acreditado. Especializado en acompañar a personas mayores al banco, citas médicas y retornos nocturnos con total cercanía y respeto.',
        fullBio: '¡Hola! Me llamo Roberto, tengo 38 años y resido en Alicante. Cuento con el Certificado Oficial de Antecedentes Penales libre de cargos y he superado las 4 fases psicotécnicas de Heroly. Durante los últimos 4 años me he dedicado al acompañamiento preventivo tanto de personas mayores en sus gestiones bancarias y médicas como de profesionales que salen tarde de trabajar.',
        daysAvailable: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        schedule: {
            manana: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
            tarde: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'],
            noche: ['Ju', 'Vi', 'Sa']
        },
        missions: ['Bancos y Cajeros', 'Mayores y Médicos', 'Retorno Nocturno', 'Trayectos A-B'],
        experienceCards: [
            { title: 'Personas Mayores (+65 años)', subtitle: 'Bancos, pensiones y citas médicas', icon: 'elderly' },
            { title: 'Disuasión y Retorno Seguro', subtitle: 'Salidas de oficina y aparcamientos', icon: 'shield' },
            { title: 'Primeros Auxilios y Calma', subtitle: 'Formación en soporte vital básico', icon: 'medical' }
        ],
        capabilities: ['Acompañamiento a pie o en transporte', 'Vehículo propio disponible', 'Espera en consulta o ventanilla bancaria', 'Enlace GPS Red Familiar™ activo'],
        references: [
            { author: 'Laura G. (Hija / Red Familiar)', date: 'Hace 2 semanas', stars: 5, text: 'Roberto acompañó a mi madre de 74 años al banco y a la notaría. Estuve viéndolos por el GPS todo el rato. Educación de diez y una tranquilidad enorme.' },
            { author: 'Carmen M.', date: 'Hace 1 mes', stars: 5, text: 'Sumamente puntual, amable y transmite muchísima seguridad. Volveré a contar con él sin dudarlo.' }
        ]
    },
    {
        id: 'hero-david',
        name: 'David',
        age: 34,
        city: 'Málaga',
        zone: 'Centro / Teatinos',
        level: 2,
        levelLabel: 'Nivel 2 · Presencia Disuasoria',
        rate: 12,
        rating: '4,9',
        reviewsCount: 15,
        experience: '4+ años de experiencia',
        online: 'Activo hoy',
        isOnlineNow: true,
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=500&q=80',
        shortBio: 'Deportista federado y socorrista titulado. Acompañamiento preventivo en Málaga para salidas laborales nocturnas, cajeros o mayores.',
        fullBio: '¡Hola! Soy David, malagueño de 34 años. Soy socorrista titulado y deportista federado. Me encanta ayudar a que la gente de mi ciudad camine tranquila a cualquier hora, ya sea acompañando a una persona mayor al cajero o asegurando la vuelta a casa de noche.',
        daysAvailable: ['Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
        schedule: {
            manana: ['Ma', 'Mi', 'Ju', 'Vi'],
            tarde: ['Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
            noche: ['Vi', 'Sa', 'Do']
        },
        missions: ['Retorno Nocturno', 'Mayores y Médicos', 'Trayectos A-B'],
        experienceCards: [
            { title: 'Socorrista Titulado', subtitle: 'Respuesta rápida ante emergencias', icon: 'medical' },
            { title: 'Presencia Atlética', subtitle: 'Disuasión pasiva en zonas solitarias', icon: 'shield' }
        ],
        capabilities: ['Certificado de Penales al día', 'Socorrismo y RCP', 'Moto y coche propios'],
        references: [
            { author: 'Rocío G.', date: 'Hace 10 días', stars: 5, text: 'Muy educado y atento en todo el trayecto. Da muchísima confianza.' }
        ]
    },
    {
        id: 'hero-carlos',
        name: 'Carlos',
        age: 41,
        city: 'Elche',
        zone: 'Altabix / Centro',
        level: 2,
        levelLabel: 'Nivel 2 · Presencia Disuasoria',
        rate: 13,
        rating: '4,9',
        reviewsCount: 26,
        experience: '6+ años de experiencia',
        online: 'Online ahora',
        isOnlineNow: true,
        photo: './assets/img/musculoso.jpg',
        shortBio: 'Entrenador personal de 1,88m de estatura. Gran presencia disuasoria y trato cordial para gestiones de valor, cajeros automáticos y desplazamientos nocturnos.',
        fullBio: 'Soy Carlos, tengo 41 años y soy preparador físico titulado en Elche. Sé perfectamente lo importante que es sentirse respaldado hoy en día al caminar por zonas solitarias, acudir a un cajero o regresar a casa de madrugada. Ofrezco una presencia física firme y disuasoria combinada con un trato caballeroso, discreto y cercano.',
        daysAvailable: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
        schedule: {
            manana: ['Lu', 'Mi', 'Vi'],
            tarde: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
            noche: ['Mi', 'Ju', 'Vi', 'Sa', 'Do']
        },
        missions: ['Retorno Nocturno', 'Bancos y Cajeros', 'Trayectos A-B'],
        experienceCards: [
            { title: 'Presencia Física Disuasoria', subtitle: '1,88m · Complexión atlética', icon: 'shield' },
            { title: 'Gestiones de Valor y Bancos', subtitle: 'Retirada de efectivo y notarías', icon: 'bank' },
            { title: 'Cobertura Nocturna', subtitle: 'Parkings, salidas laborales y eventos', icon: 'night' }
        ],
        capabilities: ['Disuasión preventiva inmediata', 'Acompañamiento hasta la puerta de casa', 'Vehículo propio disponible', 'Trazabilidad GPS en tiempo real'],
        references: [
            { author: 'María P. (Directora Comercial)', date: 'Hace 5 días', stars: 5, text: 'Salgo muy tarde del despacho y mi parking está en una calle solitaria. Ir con Carlos me da una paz absoluta. Profesional, discreto y siempre puntual.' }
        ]
    },
    {
        id: 'hero-miguel',
        name: 'Miguel Ángel',
        age: 46,
        city: 'Sevilla',
        zone: 'Nervión / Los Remedios',
        level: 3,
        levelLabel: 'Nivel 3 · Especialista Élite',
        rate: 15,
        rating: '5,0',
        reviewsCount: 31,
        experience: '15+ años de experiencia',
        online: 'Online ahora',
        isOnlineNow: true,
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&w=500&q=80',
        shortBio: 'Especialista certificado en prevención y primeros auxilios. Seriedad absoluta para notarías, gestiones bancarias y retornos nocturnos.',
        fullBio: 'Me llamo Miguel Ángel, tengo 46 años y resido en Sevilla. He trabajado durante más de 15 años en el ámbito de la prevención y protección familiar. Ofrezco mis servicios como Héroe de Nivel 3 en Heroly para aquellas familias y ciudadanos que desean la máxima tranquilidad en sus trámites financieros o desplazamientos.',
        daysAvailable: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
        schedule: {
            manana: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'],
            tarde: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
            noche: ['Ju', 'Vi', 'Sa', 'Do']
        },
        missions: ['Bancos y Cajeros', 'Retorno Nocturno', 'Trayectos A-B'],
        experienceCards: [
            { title: '15 Años en Prevención', subtitle: 'Temple, protocolo y saber estar', icon: 'shield' },
            { title: 'Operaciones Bancarias', subtitle: 'Protección en sucursales y firmas', icon: 'bank' }
        ],
        capabilities: ['Certificaciones verificadas', 'Vehículo berlina propio', 'Primeros auxilios avanzados', 'Disponibilidad fines de semana'],
        references: [
            { author: 'Fernando D.', date: 'Hace 2 semanas', stars: 5, text: 'Un caballero de los pies a la cabeza. Máxima puntualidad y seguridad en Sevilla.' }
        ]
    },
    {
        id: 'hero-javier',
        name: 'Javier',
        age: 44,
        city: 'Madrid',
        zone: 'Salamanca / Chamberí',
        level: 3,
        levelLabel: 'Nivel 3 · Especialista Élite',
        rate: 17,
        rating: '5,0',
        reviewsCount: 39,
        experience: '12+ años de experiencia',
        online: 'Online ahora',
        isOnlineNow: true,
        photo: './assets/img/karateka.jpg',
        shortBio: 'Cinturón negro 3º Dan federado y especialista en prevención de crisis y primeros auxilios. Máximo nivel de protección para familias, mayores y gestiones.',
        fullBio: 'Me llamo Javier, tengo 44 años y cuento con más de 12 años de trayectoria en artes marciales federadas, protocolos de autoprotección y primeros auxilios avanzados (DESA). Trabajo con familias, profesionales y personas mayores en Madrid que requieren el máximo estándar de seguridad preventiva en sus desplazamientos o visitas a entidades bancarias.',
        daysAvailable: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        schedule: {
            manana: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'],
            tarde: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
            noche: ['Ju', 'Vi', 'Sa']
        },
        missions: ['Bancos y Cajeros', 'Retorno Nocturno', 'Mayores y Médicos', 'Trayectos A-B'],
        experienceCards: [
            { title: 'Cinturón Negro Federado', subtitle: 'Especialista en control y prevención', icon: 'shield' },
            { title: 'Primeros Auxilios Oficiales', subtitle: 'Certificación sanitaria de emergencia', icon: 'medical' },
            { title: 'Custodia Familiar y Bancaria', subtitle: 'Notarías, joyerías y gestiones', icon: 'bank' }
        ],
        capabilities: ['Certificación federativa compulsada', 'Primeros auxilios y gestión de crisis', 'Discreción ejecutiva absoluta', 'Conexión directa SOS y Red Familiar™'],
        references: [
            { author: 'Alfonso R.', date: 'Hace 1 semana', stars: 5, text: 'Un verdadero profesional. Me acompañó en tres gestiones bancarias en Madrid centro. Impecable en el trato y máxima seguridad.' },
            { author: 'Beatriz L.', date: 'Hace 1 mes', stars: 5, text: 'Contraté a Javier para acompañar a mis padres mayores. Saber que además tiene primeros auxilios no tiene precio.' }
        ]
    }
];

// 2. ANUNCIOS DE FAMILIAS Y CIUDADANOS QUE BUSCAN UN HÉROE (PRECIOS REALISTAS 8€ - 15€/h)
const DEFAULT_FAMILY_MISSIONS = [
    {
        id: 'mision-familia-gomez',
        name: 'Familia Gómez',
        age: 51,
        city: 'Elche',
        zone: 'Sector V / Reina Victoria',
        level: 1,
        levelLabel: 'Busca Nivel 1 · Cívico',
        rate: 8,
        rating: '4,9',
        reviewsCount: 4,
        experience: 'Paseos diarios y médico abuelo',
        online: 'Busca esta semana',
        isOnlineNow: true,
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=500&q=80',
        shortBio: 'Necesitamos un Héroe paciente y conversador en Elche para salir a caminar 1 hora y media por las tardes con nuestro padre de 79 años.',
        fullBio: 'Nuestro padre tiene 79 años, camina bien pero no queremos que salga solo por temor a caídas o robos al descuido. Buscamos un Héroe de Nivel 1 en Elche que tenga paciencia, buena conversación y le acompañe por las tardes a dar su paseo por el parque.',
        daysAvailable: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'],
        schedule: {
            manana: [],
            tarde: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'],
            noche: []
        },
        missions: ['Mayores y Médicos', 'Trayectos A-B'],
        experienceCards: [
            { title: 'Paseo de Tarde Regular', subtitle: 'Lunes a Viernes de 17:30h a 19:00h', icon: 'elderly' },
            { title: 'Pago directo al terminar', subtitle: '8 €/hora en mano o Bizum', icon: 'bank' }
        ],
        capabilities: ['Acompañamiento tranquilo a pie', 'Aviso a los hijos al iniciar y terminar'],
        references: []
    },
    {
        id: 'mision-laura',
        name: 'Laura G.',
        age: 42,
        city: 'Alicante',
        zone: 'Av. Maisonnave / Centro',
        level: 2,
        levelLabel: 'Busca Nivel 1 o 2',
        rate: 10,
        rating: '5,0',
        reviewsCount: 6,
        experience: 'Acompañar a madre mayor (74 años)',
        online: 'Busca para esta semana',
        isOnlineNow: true,
        photo: './assets/img/laura.jpg',
        shortBio: 'Busco un Héroe educado y puntual para acompañar a mi madre de 74 años al banco a primeros de mes y a sus revisiones médicas los miércoles por la mañana.',
        fullBio: 'Hola, soy Laura (42 años). Por motivos de trabajo en mi despacho no siempre puedo acompañar a mi madre de 74 años cuando tiene que ir a la sucursal bancaria o al centro de especialidades en Alicante centro. Buscamos un Héroe serio, con certificado de penales verificado y buena presencia que la recoja en su portal, la acompañe durante unas 2 horas y mantenga el GPS activo.',
        daysAvailable: ['Lu', 'Mi', 'Vi'],
        schedule: {
            manana: ['Lu', 'Mi', 'Vi'],
            tarde: [],
            noche: []
        },
        missions: ['Bancos y Cajeros', 'Mayores y Médicos'],
        experienceCards: [
            { title: 'Duración estimada', subtitle: '2 a 3 horas por mañana (Lu / Mi / Vi)', icon: 'elderly' },
            { title: 'Pago garantizado al instante', subtitle: '10 €/hora vía Bizum o efectivo', icon: 'bank' }
        ],
        capabilities: ['Recogida en portal y retorno a casa', 'Acompañamiento a sucursal bancaria', 'Activación de GPS Red Familiar™'],
        references: [
            { author: 'Roberto S. (Héroe Nivel 2)', date: 'Hace 2 semanas', stars: 5, text: 'Laura y su madre son personas encantadoras y muy respetuosas. Pago puntual por Bizum nada más terminar.' }
        ]
    },
    {
        id: 'mision-maria',
        name: 'María P.',
        age: 36,
        city: 'Madrid',
        zone: 'Nuevos Ministerios / Castellana',
        level: 2,
        levelLabel: 'Busca Nivel 2 · Disuasorio',
        rate: 12,
        rating: '5,0',
        reviewsCount: 9,
        experience: 'Retorno nocturno salida de oficina',
        online: 'Activa ahora',
        isOnlineNow: true,
        photo: './assets/img/maria.jpg',
        shortBio: 'Salgo de trabajar sobre las 22:00h entre semana. Busco Héroe de Nivel 2 para acompañarme desde la oficina hasta mi aparcamiento a 10 minutos a pie.',
        fullBio: 'Soy María, directora comercial en Madrid. Entre semana suelo salir tarde de reuniones y la zona donde aparco el coche se queda muy solitaria a partir de las diez de la noche. Busco un Héroe de Nivel 2 (complexión atlética y presencia firme) para acompañarme en ese trayecto nocturno de forma habitual.',
        daysAvailable: ['Ma', 'Mi', 'Ju', 'Vi'],
        schedule: {
            manana: [],
            tarde: [],
            noche: ['Ma', 'Mi', 'Ju', 'Vi']
        },
        missions: ['Retorno Nocturno', 'Trayectos A-B'],
        experienceCards: [
            { title: 'Horario Nocturno Fijo', subtitle: 'De 21:45h a 22:45h (Martes a Viernes)', icon: 'night' },
            { title: 'Tarifa por hora', subtitle: '12 €/hora abonados en el acto por Bizum', icon: 'bank' }
        ],
        capabilities: ['Puntualidad en la recepción del edificio', 'Acompañamiento preventivo hasta el vehículo', 'Trato profesional y discreto'],
        references: [
            { author: 'Javier M. (Héroe Nivel 3)', date: 'Hace 1 mes', stars: 5, text: 'Cliente 100% recomendable, muy clara con los horarios y pago inmediato.' }
        ]
    },
    {
        id: 'mision-despacho-valencia',
        name: 'Andrés V.',
        age: 48,
        city: 'Valencia',
        zone: 'Calle Colón / Centro',
        level: 3,
        levelLabel: 'Busca Nivel 3 · Especialista',
        rate: 15,
        rating: '5,0',
        reviewsCount: 7,
        experience: 'Gestiones de notaría y banco',
        online: 'Online ahora',
        isOnlineNow: true,
        photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&crop=faces&w=500&q=80',
        shortBio: 'Administrador de fincas en Valencia. Solicito Héroe especialista de Nivel 3 para desplazamientos puntuales entre entidades bancarias y notaría.',
        fullBio: 'Soy Andrés, tengo 48 años y dirijo un despacho profesional en el centro de Valencia. Dos o tres veces por semana realizo gestiones presenciales en bancos y notarías. Busco un Héroe de Nivel 3 acreditado, con excelente presencia y máxima discreción.',
        daysAvailable: ['Ma', 'Ju'],
        schedule: {
            manana: ['Ma', 'Ju'],
            tarde: [],
            noche: []
        },
        missions: ['Bancos y Cajeros'],
        experienceCards: [
            { title: 'Perfil Ejecutivo / Discreto', subtitle: 'Vestimenta formal o smart casual', icon: 'shield' },
            { title: 'Honorarios Nivel 3', subtitle: '15 €/hora abonados al finalizar', icon: 'bank' }
        ],
        capabilities: ['Máxima puntualidad y reserva', 'Acreditación de Nivel 3'],
        references: []
    }
];

let currentMode = 'citizen'; // 'citizen' = Buscar un Héroe | 'worker' = Trabajo como Héroe
let activeFilters = {
    city: 'Todas',
    level: 'Todos',
    mission: 'Todas',
    maxRate: 25
};
let allHeroesList = [...DEFAULT_HEROES];
let allFamilyMissions = [...DEFAULT_FAMILY_MISSIONS];

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initRevealAnimations();
    initFaqAccordion();
    loadCustomLocalData();
    renderCatalogGrid();
    loadFirebaseHeroes();
});

// Cargar anuncios o perfiles guardados desde los nuevos Dashboards de Heroly
function loadCustomLocalData() {
    try {
        const localHeroes = JSON.parse(localStorage.getItem('heroly_custom_heroes') || '[]');
        if (Array.isArray(localHeroes) && localHeroes.length > 0) {
            allHeroesList = [...localHeroes, ...DEFAULT_HEROES];
        }
        const localMissions = JSON.parse(localStorage.getItem('heroly_custom_missions') || '[]');
        if (Array.isArray(localMissions) && localMissions.length > 0) {
            allFamilyMissions = [...localMissions, ...DEFAULT_FAMILY_MISSIONS];
        }
    } catch (e) {}
}

// Intentar cargar también Héroes reales desde Firebase Firestore cuando el usuario conecte su nueva clave
async function loadFirebaseHeroes() {
    try {
        const { db, collection, getDocs, query, where } = await import('./firebase.js');
        if (!db) return;
        const q = query(collection(db, 'users'), where('role', '==', 'hero'));
        const snap = await getDocs(q);
        const fbHeroes = [];
        snap.forEach(docSnap => {
            const d = docSnap.data();
            if (d && d.name && d.name !== 'Nuevo Usuario') {
                let minRate = 10;
                if (d.rates && typeof d.rates === 'object') {
                    const vals = Object.values(d.rates).map(Number).filter(n => !isNaN(n) && n > 0);
                    if (vals.length > 0) minRate = Math.min(...vals);
                }
                fbHeroes.push({
                    id: 'fb-' + docSnap.id,
                    name: d.name.split(' ')[0],
                    age: d.age || 36,
                    city: d.city || 'Alicante',
                    zone: d.zone || 'Zona verificada',
                    level: Number(d.level) || 2,
                    levelLabel: `Nivel ${d.level || 2} · Verificado`,
                    rate: minRate,
                    rating: '5,0',
                    reviewsCount: 5,
                    experience: 'Héroe Verificado Heroly',
                    online: 'Online ahora',
                    isOnlineNow: true,
                    photo: d.photoURL || './assets/img/normal.jpg',
                    shortBio: d.bio || 'Héroe verificado en la red Heroly España. Disponible para acompañamientos preventivos, gestiones y apoyo familiar.',
                    fullBio: d.bio || 'Héroe verificado en la red Heroly España con documentación e identidad validadas. Disponible para servicios de acompañamiento presencial en tu ciudad.',
                    daysAvailable: d.daysAvailable || ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                    schedule: d.schedule || {
                        manana: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'],
                        tarde: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                        noche: ['Vi', 'Sa']
                    },
                    missions: ['Bancos y Cajeros', 'Mayores y Médicos', 'Retorno Nocturno'],
                    experienceCards: [
                        { title: 'Identidad Verificada', subtitle: 'Documentación validada en Heroly', icon: 'shield' },
                        { title: 'Trato Cercano y Puntual', subtitle: 'Disponible en tu ciudad', icon: 'elderly' }
                    ],
                    capabilities: ['Seguimiento GPS Red Familiar™', 'Pago directo en mano o Bizum'],
                    references: []
                });
            }
        });
        if (fbHeroes.length > 0) {
            allHeroesList = [...fbHeroes, ...allHeroesList];
            renderCatalogGrid();
        }
    } catch (e) {}
}

// ============================================================================
// CONMUTADOR SIMÉTRICO ESTILO SITLY: "BUSCAR UN HÉROE" vs "TRABAJO COMO HÉROE"
// ============================================================================
window.switchAppMode = function(mode) {
    currentMode = mode;
    closeProfileDetail(false);

    const tabCitizen = document.getElementById('nav-tab-citizen');
    const tabWorker = document.getElementById('nav-tab-worker');
    const heroBanner = document.getElementById('hero-banner-box');
    const heroBadge = document.getElementById('hero-badge-text');
    const heroTitle = document.getElementById('hero-title');
    const heroBullet1 = document.getElementById('hero-bullet-1');
    const heroBullet2 = document.getElementById('hero-bullet-2');
    const heroBullet3 = document.getElementById('hero-bullet-3');
    const heroPrimaryBtn = document.getElementById('hero-primary-btn');
    const heroSwitchLink = document.getElementById('hero-switch-link');
    const heroRightImage = document.getElementById('hero-right-image');
    const heroFloatingCardTitle = document.getElementById('hero-floating-title');
    const heroFloatingCardSub = document.getElementById('hero-floating-sub');
    const catalogHeading = document.getElementById('catalog-heading');
    const catalogCounter = document.getElementById('catalog-counter');

    if (mode === 'citizen') {
        tabCitizen.className = 'px-4 py-2 rounded-full text-sm font-extrabold bg-teal-700 text-white shadow-sm transition-all';
        tabWorker.className = 'px-4 py-2 rounded-full text-sm font-bold text-slate-600 hover:text-slate-900 transition-all';

        heroBanner.className = 'hero-banner-citizen rounded-[2rem] p-8 sm:p-12 lg:p-14 transition-colors duration-500';
        heroBadge.innerText = 'Red Nacional de Acompañamiento Preventivo (+30 años y Familias)';
        heroTitle.innerHTML = 'CONOCE A LOS MEJORES ACOMPAÑANTES Y HÉROES <span class="highlight-marker">EN TU CIUDAD</span>';
        heroBullet1.innerText = 'Busca Héroes verificados con Certificado de Penales desde 8 €/hora';
        heroBullet2.innerText = 'Revisa perfiles, horarios y tarifas cerradas antes de decidir';
        heroBullet3.innerText = 'Seguimiento GPS en vivo con Red Familiar™ y pago directo por Bizum';
        heroPrimaryBtn.innerText = 'Regístrate gratis';
        heroSwitchLink.innerHTML = '¿Prefieres ganar dinero trabajando como Héroe? <span class="underline font-bold text-teal-800">Ver misiones disponibles →</span>';
        heroSwitchLink.setAttribute('onclick', "switchAppMode('worker')");
        heroRightImage.src = './assets/img/roberto.jpg';
        heroFloatingCardTitle.innerText = 'Roberto (38) · Héroe Nivel 2 · 11 €/h';
        heroFloatingCardSub.innerText = '★ 5,0 · Certificado de Penales Verificado';

        catalogHeading.innerText = 'BUSCA HÉROES Y ACOMPAÑANTES DISPONIBLES AHORA';
        catalogCounter.innerText = 'Más de 1.480 Héroes verificados en España (Desde 8 €/h)';
    } else {
        tabWorker.className = 'px-4 py-2 rounded-full text-sm font-extrabold bg-amber-600 text-white shadow-sm transition-all';
        tabCitizen.className = 'px-4 py-2 rounded-full text-sm font-bold text-slate-600 hover:text-slate-900 transition-all';

        heroBanner.className = 'hero-banner-worker rounded-[2rem] p-8 sm:p-12 lg:p-14 transition-colors duration-500';
        heroBadge.innerText = 'Bolsa Oficial de Misiones para Héroes Acreditados';
        heroTitle.innerHTML = 'ESTABLECE TUS PROPIOS HORARIOS Y TARIFAS COMO HÉROE <span class="highlight-marker">EN TU CIUDAD</span>';
        heroBullet1.innerText = 'Accede a solicitudes reales de familias y profesionales en tu zona';
        heroBullet2.innerText = 'Define tu propia tarifa por hora (desde 8 €/h hasta 20 €/h) y tus días libres';
        heroBullet3.innerText = 'Cobras el 100% al instante en efectivo o Bizum al terminar cada misión';
        heroPrimaryBtn.innerText = 'Inscríbete como Héroe gratis';
        heroSwitchLink.innerHTML = '¿Estás buscando contratar un Héroe? <span class="underline font-bold text-amber-900">Ver catálogo de Héroes →</span>';
        heroSwitchLink.setAttribute('onclick', "switchAppMode('citizen')");
        heroRightImage.src = './assets/img/laura.jpg';
        heroFloatingCardTitle.innerText = 'Laura (42) · Busca Héroe en Alicante';
        heroFloatingCardSub.innerText = '10 € / hora · Pago inmediato por Bizum';

        catalogHeading.innerText = 'FAMILIAS Y CIUDADANOS BUSCANDO UN HÉROE AHORA MISMO';
        catalogCounter.innerText = 'Más de 640 solicitudes activas esta semana';
    }

    renderCatalogGrid();
};

// ============================================================================
// RENDERIZADO DE LA CUADRÍCULA DE TARJETAS PÚBLICAS (4 COLUMNAS ESTILO SITLY)
// ============================================================================
window.renderCatalogGrid = function() {
    const grid = document.getElementById('public-catalog-grid');
    if (!grid) return;

    const sourceList = currentMode === 'citizen' ? allHeroesList : allFamilyMissions;

    const filtered = sourceList.filter(item => {
        if (activeFilters.city !== 'Todas' && item.city.toLowerCase() !== activeFilters.city.toLowerCase()) return false;
        if (activeFilters.level !== 'Todos' && String(item.level) !== String(activeFilters.level)) return false;
        if (activeFilters.mission !== 'Todas' && !item.missions.some(m => m.toLowerCase().includes(activeFilters.mission.toLowerCase()))) return false;
        if (item.rate > activeFilters.maxRate) return false;
        return true;
    });

    const pillCity = document.getElementById('pill-city-label');
    const pillLevel = document.getElementById('pill-level-label');
    const pillMission = document.getElementById('pill-mission-label');
    if (pillCity) pillCity.innerText = activeFilters.city === 'Todas' ? 'Ciudad' : activeFilters.city;
    if (pillLevel) pillLevel.innerText = activeFilters.level === 'Todos' ? 'Nivel de Héroe' : `Nivel ${activeFilters.level}`;
    if (pillMission) pillMission.innerText = activeFilters.mission === 'Todas' ? 'Tipo de acompañamiento' : activeFilters.mission;

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full bg-white border border-stone-200 rounded-3xl p-12 text-center">
                <div class="w-14 h-14 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-4 font-bold text-xl">🔍</div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">No hay perfiles exactos con esa combinación de filtros</h3>
                <p class="text-slate-600 mb-6">Prueba a ampliar la ciudad o restablecer los filtros para ver todos los Héroes verificados.</p>
                <button onclick="resetPublicFilters()" class="px-6 py-3 rounded-full bg-teal-700 text-white font-bold text-sm hover:bg-teal-800 transition">
                    Mostrar todos los perfiles
                </button>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(item => {
        const dayBubblesHtml = DAYS.map(day => {
            const isOn = item.daysAvailable.includes(day);
            return `<span class="day-bubble ${isOn ? 'on' : 'off'}">${day}</span>`;
        }).join('');

        const levelBadgeColor = item.level === 1
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
            : item.level === 2
            ? 'bg-teal-50 text-teal-800 border-teal-200'
            : 'bg-amber-50 text-amber-800 border-amber-200';

        return `
            <article onclick="openProfileDetail('${item.id}')" class="profile-card p-5 cursor-pointer flex flex-col justify-between group">
                <div>
                    <!-- Foto + Estado Online y Tarifa -->
                    <div class="relative mb-4">
                        <div class="w-full h-56 rounded-2xl overflow-hidden bg-stone-100">
                            <img src="${item.photo}" alt="${item.name}" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500">
                        </div>
                        <span class="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 text-emerald-700 shadow-sm">
                            <span class="w-2 h-2 rounded-full ${item.isOnlineNow ? 'bg-emerald-500 animate-pulse' : 'bg-teal-500'}"></span>
                            ${item.online}
                        </span>
                        <span class="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-extrabold bg-teal-800 text-white shadow">
                            ${item.rate} € / hora
                        </span>
                    </div>

                    <!-- Nombre, Edad y Ciudad -->
                    <div class="flex justify-between items-start gap-2 mb-1.5">
                        <h3 class="font-display text-xl font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors">
                            ${item.name} (${item.age})
                        </h3>
                        <div class="flex items-center gap-1 text-amber-500 font-bold text-sm shrink-0">
                            <span>★</span>
                            <span class="text-slate-800">${item.rating}</span>
                            <span class="text-slate-400 text-xs">(${item.reviewsCount})</span>
                        </div>
                    </div>

                    <div class="flex items-center justify-between gap-2 mb-3">
                        <span class="text-xs font-semibold text-slate-500 flex items-center gap-1">
                            📍 ${item.city} · ${item.zone}
                        </span>
                    </div>

                    <div class="flex flex-wrap gap-1.5 mb-3">
                        <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${levelBadgeColor}">
                            ${item.levelLabel}
                        </span>
                        <span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-slate-700">
                            ${item.experience}
                        </span>
                    </div>

                    <p class="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
                        ${item.shortBio}
                    </p>
                </div>

                <!-- Disponibilidad Semanal (Lu a Do) + Enlace Ver Perfil -->
                <div class="pt-3 border-t border-stone-100">
                    <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Disponibilidad semanal</div>
                    <div class="flex items-center justify-between gap-1 mb-3">
                        ${dayBubblesHtml}
                    </div>
                    <div class="w-full py-2.5 rounded-xl bg-teal-50 group-hover:bg-teal-700 text-teal-800 group-hover:text-white font-bold text-xs text-center transition-colors">
                        ${currentMode === 'citizen' ? 'Ver perfil del Héroe y horarios →' : 'Ver detalles de la solicitud →'}
                    </div>
                </div>
            </article>
        `;
    }).join('');
};

// ============================================================================
// VISTA DE PERFIL COMPLETO EN 2 COLUMNAS (ESTILO SITLY CON CANDADO DE REGISTRO)
// ============================================================================
window.openProfileDetail = function(profileId) {
    const allItems = [...allHeroesList, ...allFamilyMissions];
    const item = allItems.find(x => x.id === profileId);
    if (!item) return;

    const landingView = document.getElementById('main-landing-view');
    const detailView = document.getElementById('profile-detail-view');
    const detailContainer = document.getElementById('profile-detail-content');

    const buildShiftRow = (label, activeDays) => {
        const cells = DAYS.map(d => {
            const has = activeDays && activeDays.includes(d);
            return `
                <td class="py-2.5 text-center border-b border-stone-100">
                    ${has
                        ? '<span class="inline-flex w-6 h-6 rounded-full bg-teal-600 text-white items-center justify-center text-xs font-bold">✓</span>'
                        : '<span class="inline-block w-2 h-2 rounded-full bg-stone-200"></span>'}
                </td>
            `;
        }).join('');
        return `
            <tr>
                <td class="py-2.5 pr-2 text-xs font-bold text-slate-700 border-b border-stone-100">${label}</td>
                ${cells}
            </tr>
        `;
    };

    const expIcons = {
        elderly: '👵',
        shield: '🛡️',
        medical: '🩺',
        bank: '🏦',
        night: '🌙'
    };

    const experienceCardsHtml = (item.experienceCards || []).map(c => `
        <div class="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex items-start gap-3.5">
            <div class="w-11 h-11 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-xl shrink-0 shadow-sm">
                ${expIcons[c.icon] || '🛡️'}
            </div>
            <div>
                <h4 class="font-bold text-slate-900 text-sm">${c.title}</h4>
                <p class="text-xs text-slate-600 mt-0.5">${c.subtitle}</p>
            </div>
        </div>
    `).join('');

    const capabilitiesHtml = (item.capabilities || []).map(cap => `
        <li class="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
            <span class="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
            ${cap}
        </li>
    `).join('');

    const referencesHtml = (item.references && item.references.length > 0)
        ? item.references.map(ref => `
            <div class="bg-stone-50 border border-stone-200 rounded-2xl p-5">
                <div class="flex justify-between items-center mb-2">
                    <div class="font-bold text-slate-900 text-sm">${ref.author}</div>
                    <span class="text-xs text-slate-500">${ref.date}</span>
                </div>
                <div class="text-amber-500 text-xs mb-2">★★★★★</div>
                <p class="text-slate-700 text-sm leading-relaxed italic">"${ref.text}"</p>
            </div>
        `).join('')
        : `<p class="text-sm text-slate-500 italic">Perfil auditado y verificado por el equipo de admisiones de Heroly España.</p>`;

    detailContainer.innerHTML = `
        <!-- Barra superior de retorno -->
        <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
            <button onclick="closeProfileDetail(true)" class="inline-flex items-center gap-2 text-sm font-bold text-teal-800 hover:text-teal-600 bg-white border border-stone-200 px-4 py-2.5 rounded-full shadow-sm transition">
                ← Volver a todos los perfiles en ${activeFilters.city === 'Todas' ? 'España' : activeFilters.city}
            </button>
            <div class="text-xs text-slate-500 font-medium">
                Heroly España &gt; ${item.city} &gt; <span class="text-slate-800 font-bold">${item.name} (${item.age})</span>
            </div>
        </div>

        <!-- Estructura Asimétrica de 2 Columnas (Idéntica a Sitly) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            <!-- COLUMNA IZQUIERDA (Foto + Matriz de Disponibilidad Semanal + Modalidades) -->
            <div class="lg:col-span-5 space-y-6">
                <div class="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
                    <div class="relative rounded-2xl overflow-hidden mb-5 h-80 bg-stone-100">
                        <img src="${item.photo}" alt="${item.name}" class="w-full h-full object-cover object-top">
                        <span class="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-emerald-700 shadow">
                            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            ${item.online}
                        </span>
                    </div>

                    <div class="flex items-center gap-2.5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold mb-5">
                        <svg class="w-5 h-5 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        <span>DNI/NIE y Certificado Oficial de Antecedentes Penales Verificados</span>
                    </div>

                    <!-- Tabla de Disponibilidad (Mañana / Tarde / Noche x Lu-Do) -->
                    <h3 class="font-display text-base font-extrabold text-slate-900 mb-3">Disponibilidad de ${item.name}</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="border-b border-stone-200 text-[11px] font-extrabold text-slate-500 uppercase">
                                    <th class="pb-2">Turno</th>
                                    ${DAYS.map(d => `<th class="pb-2 text-center">${d}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${buildShiftRow('Mañana', item.schedule.manana)}
                                ${buildShiftRow('Tarde', item.schedule.tarde)}
                                ${buildShiftRow('Noche', item.schedule.noche)}
                            </tbody>
                        </table>
                    </div>

                    <!-- Etiquetas de Modalidades -->
                    <div class="mt-5 pt-4 border-t border-stone-100">
                        <div class="text-xs font-bold text-slate-500 uppercase mb-2.5">Modalidades habituales</div>
                        <div class="flex flex-wrap gap-2">
                            ${(item.missions || []).map(m => `<span class="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">${m}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- COLUMNA DERECHA (Bio, Experiencia, Servicios, Referencias, Mapa Difuminado y Botón Contactar) -->
            <div class="lg:col-span-7 space-y-6">
                <div class="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                    <div class="flex flex-wrap justify-between items-start gap-4 pb-6 border-b border-stone-200">
                        <div>
                            <span class="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-extrabold mb-2">
                                ${item.levelLabel}
                            </span>
                            <h1 class="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">${item.name} (${item.age})</h1>
                            <p class="text-slate-600 font-medium text-base mt-1">📍 ${item.city} · Zona ${item.zone}</p>
                        </div>
                        <div class="bg-stone-50 border border-stone-200 rounded-2xl px-5 py-3 text-right">
                            <div class="text-xs font-bold text-slate-500 uppercase">Tarifa por hora</div>
                            <div class="font-display text-2xl font-extrabold text-teal-800">${item.rate},00 € <span class="text-xs font-normal text-slate-500">/h</span></div>
                            <div class="text-xs font-bold text-amber-500 mt-0.5">★ ${item.rating} (${item.reviewsCount} valoraciones)</div>
                        </div>
                    </div>

                    <!-- Sobre mí -->
                    <div class="py-6 border-b border-stone-200">
                        <h2 class="font-display text-lg font-extrabold text-slate-900 mb-3">Sobre ${item.name}</h2>
                        <p class="text-slate-700 text-base leading-relaxed">${item.fullBio}</p>
                    </div>

                    <!-- Mi experiencia y acreditaciones -->
                    <div class="py-6 border-b border-stone-200">
                        <h2 class="font-display text-lg font-extrabold text-slate-900 mb-4">Experiencia y especialidades</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            ${experienceCardsHtml}
                        </div>
                    </div>

                    <!-- Servicios incluidos -->
                    <div class="py-6 border-b border-stone-200">
                        <h2 class="font-display text-lg font-extrabold text-slate-900 mb-4">Detalles del acompañamiento</h2>
                        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            ${capabilitiesHtml}
                        </ul>
                    </div>

                    <!-- Referencias de otros clientes -->
                    <div class="py-6 border-b border-stone-200">
                        <h2 class="font-display text-lg font-extrabold text-slate-900 mb-4">Referencias verificadas (${item.reviewsCount})</h2>
                        <div class="space-y-3.5">
                            ${referencesHtml}
                        </div>
                    </div>

                    <!-- EL CANDADO INTELIGENTE ESTILO SITLY: MAPA DIFUMINADO + BOTÓN DE CONTACTO -->
                    <div class="pt-6">
                        <h2 class="font-display text-lg font-extrabold text-slate-900 mb-3">Ubicación y zona de cobertura de ${item.name}</h2>
                        <div class="relative w-full h-56 rounded-2xl overflow-hidden border border-stone-200 mb-6">
                            <div class="absolute inset-0 bg-cover bg-center filter blur-[5px] scale-105" style="background-image: url('./assets/img/mapa-elche.jpg');"></div>
                            <div class="absolute inset-0 bg-teal-950/20 flex items-center justify-center p-4">
                                <button onclick="openAuthGateModal('${item.name}')" class="bg-white hover:bg-teal-50 text-slate-900 font-extrabold px-6 py-3.5 rounded-full shadow-xl border border-stone-200 flex items-center gap-2.5 text-sm transition transform hover:scale-105">
                                    <span>📍</span>
                                    Mostrar ubicación exacta de ${item.name}
                                </button>
                            </div>
                        </div>

                        <!-- Aviso de confianza + CTA Principal de Contacto -->
                        <div class="bg-teal-50/70 border border-teal-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div class="text-xs text-slate-600 leading-relaxed">
                                <strong class="text-slate-900 block text-sm mb-0.5">¿Te gustaría contactar con ${item.name}?</strong>
                                El registro en Heroly es gratuito. Acuerda el horario por chat y abona directamente por Bizum o efectivo al finalizar.
                            </div>
                            <button onclick="openAuthGateModal('${item.name}')" class="w-full sm:w-auto shrink-0 bg-teal-700 hover:bg-teal-800 text-white font-extrabold px-8 py-4 rounded-full shadow-lg text-sm uppercase tracking-wider transition">
                                Enviar mensaje a ${item.name}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    `;

    landingView.classList.add('hidden');
    detailView.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.closeProfileDetail = function(scrollToGrid = false) {
    const landingView = document.getElementById('main-landing-view');
    const detailView = document.getElementById('profile-detail-view');
    if (!landingView || !detailView) return;

    detailView.classList.add('hidden');
    landingView.classList.remove('hidden');

    if (scrollToGrid) {
        const catSection = document.getElementById('catalogo-publico');
        if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
    }
};

// ============================================================================
// FILTROS RÁPIDOS Y MODAL DE FILTROS (PRECIOS 8€ - 25€/h)
// ============================================================================
window.filterByCity = function(cityName) {
    activeFilters.city = cityName;
    closeProfileDetail(false);
    renderCatalogGrid();
    const catSection = document.getElementById('catalogo-publico');
    if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
};

window.filterByLevel = function(levelNum) {
    activeFilters.level = levelNum;
    closeProfileDetail(false);
    renderCatalogGrid();
    const catSection = document.getElementById('catalogo-publico');
    if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
};

window.resetPublicFilters = function() {
    activeFilters = { city: 'Todas', level: 'Todos', mission: 'Todas', maxRate: 25 };
    const citySel = document.getElementById('modal-filter-city');
    const levelSel = document.getElementById('modal-filter-level');
    const missionSel = document.getElementById('modal-filter-mission');
    const rateInput = document.getElementById('modal-filter-rate');
    if (citySel) citySel.value = 'Todas';
    if (levelSel) levelSel.value = 'Todos';
    if (missionSel) missionSel.value = 'Todas';
    if (rateInput) {
        rateInput.value = 25;
        const lbl = document.getElementById('modal-rate-val');
        if (lbl) lbl.innerText = 'Hasta 25 €/h';
    }
    renderCatalogGrid();
};

window.openFilterModal = function() {
    const modal = document.getElementById('sitly-filter-modal');
    if (modal) modal.classList.remove('hidden');
};

window.closeFilterModal = function() {
    const modal = document.getElementById('sitly-filter-modal');
    if (modal) modal.classList.add('hidden');
};

window.applyFilterModal = function() {
    const citySel = document.getElementById('modal-filter-city');
    const levelSel = document.getElementById('modal-filter-level');
    const missionSel = document.getElementById('modal-filter-mission');
    const rateInput = document.getElementById('modal-filter-rate');

    if (citySel) activeFilters.city = citySel.value;
    if (levelSel) activeFilters.level = levelSel.value;
    if (missionSel) activeFilters.mission = missionSel.value;
    if (rateInput) activeFilters.maxRate = Number(rateInput.value);

    renderCatalogGrid();
    closeFilterModal();
};

// ============================================================================
// MODAL DE REGISTRO / CONVERSIÓN ("BIENVENIDO A HEROLY" AL QUERER CONTACTAR)
// ============================================================================
window.openAuthGateModal = function(targetPersonName = '') {
    const modal = document.getElementById('sitly-auth-modal');
    const titleEl = document.getElementById('auth-modal-title');
    if (titleEl) {
        titleEl.innerText = targetPersonName
            ? `Regístrate gratis para contactar con ${targetPersonName}`
            : 'Bienvenido a Heroly España';
    }
    if (modal) modal.classList.remove('hidden');
};

window.closeAuthGateModal = function() {
    const modal = document.getElementById('sitly-auth-modal');
    if (modal) modal.classList.add('hidden');
};

function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    let isMenuOpen = false;

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                setTimeout(() => {
                    mobileMenu.classList.remove('opacity-0', '-translate-y-4');
                    mobileMenu.classList.add('opacity-100', 'translate-y-0');
                }, 10);
                menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            } else {
                mobileMenu.classList.remove('opacity-100', 'translate-y-0');
                mobileMenu.classList.add('opacity-0', '-translate-y-4');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
                menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            }
        });

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) mobileBtn.click();
            });
        });
    }
}

function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
}

function initFaqAccordion() {
    const faqButtons = document.querySelectorAll('.faq-btn');
    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');
            content.classList.toggle('open');
            icon.classList.toggle('rotate-180');

            faqButtons.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    const otherContent = otherBtn.nextElementSibling;
                    const otherIcon = otherBtn.querySelector('.faq-icon');
                    if (otherContent.classList.contains('open')) {
                        otherContent.classList.remove('open');
                        otherIcon.classList.remove('rotate-180');
                    }
                }
            });
        });
    });
}
