export const translations = {
  es: {
    nav: {
      login: 'Ingresar',
      demo: 'Agenda una demo',
      langSwitch: 'EN',
    },
    hero: {
      eyebrow: 'Inteligencia de cultivo · Sabana Norte, Colombia',
      headline1: 'Convertimos en datos',
      headline2: 'la forma en que miras',
      headline3: 'el campo,',
      tagline: 'para que tu esfuerzo se convierta en valor.',
      subtext: 'Confirma tus pedidos de exportación con datos, no con esperanza.',
      cta: 'Agenda tu demo en campo',
      ctaSub: 'Sin costo · En tu propia finca',
      metrics: [
        { value: '≥85%', label: 'Precisión CV' },
        { value: '<15%', label: 'Error proyección' },
        { value: '30s', label: 'Foto a resultado' },
      ],
    },
    problem: {
      label: 'El problema',
      title: 'Cada semana, una apuesta.',
      items: [
        {
          number: '01',
          title: 'Proyecciones que no cierran',
          text: 'El gerente confirma pedidos a Miami con Excel y la intuición del agrónomo. Error promedio: 20–30%. En San Valentín, eso son entre $30M y $100M COP perdidos en una semana.',
        },
        {
          number: '02',
          title: 'Enfermedades detectadas tarde',
          text: 'Cuando el técnico identifica botritis o mildiu, ya se propagó al lote. El tratamiento llega 3–7 días tarde. Un foco tarde destruye el 15–40% de la cosecha.',
        },
        {
          number: '03',
          title: 'Logística que se improvisa',
          text: 'El armado de pallets y la asignación de camiones se hacen de memoria o en planillas. Un pallet mal armado o con temperatura incorrecta significa rechazo en destino: pérdida total.',
        },
      ],
    },
    solution: {
      label: 'La solución',
      title: 'Una foto. Tres módulos. Decisiones ciertas.',
      intro: 'Sin hardware costoso. Sin infraestructura adicional. Solo el celular que ya tienes.',
      items: [
        {
          tag: 'Módulo Campo',
          title: 'Estado fisiológico en tiempo real',
          text: 'Modelos de visión computacional entrenados exclusivamente en flores colombianas clasifican cada planta: botón, apertura, flor lista. Precisión ≥85%. Detección de botritis y mildiu antes de que se propague.',
          detail: 'YOLOv8 · Flores colombianas · Alerta inmediata',
        },
        {
          tag: 'Módulo Proyección',
          title: '¿Cuánto vas a producir?',
          text: 'XGBoost + series de tiempo predictivas generan una proyección de producción a 1–4 semanas con error menor al 15%. Confirma contratos internacionales con certeza, no con intuición.',
          detail: 'XGBoost · Proyección 1–4 semanas · Error <15%',
        },
        {
          tag: 'Módulo Logística',
          title: 'Despacho sin papel',
          text: 'Foto → lectura QR → armado de pallet → asignación de camión → despacho trazado. Un clic del gerente para ver el estado completo de cada envío en tiempo real.',
          detail: 'QR · Trazabilidad · Dashboard gerencial',
        },
      ],
    },
    howItWorks: {
      label: 'Cómo funciona',
      title: 'Del campo al dato.\nDel dato a la decisión.',
      steps: [
        {
          number: '01',
          title: 'Captura',
          text: 'El operador toma fotos con el celular durante el recorrido de campo. Sin entrenamiento especial. Sin hardware adicional.',
        },
        {
          number: '02',
          title: 'Análisis',
          text: 'Los modelos de visión computacional y XGBoost procesan las imágenes. Resultado en menos de 30 segundos.',
        },
        {
          number: '03',
          title: 'Dashboard',
          text: 'El gerente ve el estado completo del cultivo, la proyección a 4 semanas y el estado de logística en tiempo real.',
        },
        {
          number: '04',
          title: 'Decisión',
          text: 'Confirma tu pedido a Miami con datos reales de tu propio cultivo. De la ansiedad a la certeza.',
        },
      ],
    },
    metrics: {
      label: 'Resultados',
      title: 'Números que importan.',
      items: [
        { value: '≥85%', label: 'Precisión en clasificación fisiológica de plantas' },
        { value: '<15%', label: 'Error en proyección de producción a 2 semanas' },
        { value: '30s', label: 'De foto a resultado visible en el dashboard' },
        { value: '0', label: 'Hardware adicional necesario para operar' },
      ],
    },
    whyUs: {
      label: 'Ventaja competitiva',
      title: 'Lo que no se puede\ncomprar ni copiar.',
      items: [
        {
          title: '+10 años en flores colombianas',
          text: 'La única plataforma construida por alguien que vivió el campo. El conocimiento de dominio no se contrata en el mercado. No existe este perfil en Colombia.',
        },
        {
          title: 'Dataset propio · flores colombianas',
          text: 'Imágenes anotadas de rosas, claveles y crisantemos en condiciones reales de Sabana Norte. Cada nuevo cliente refuerza la barrera. El competidor que llegue tarde encontrará un modelo mucho más preciso.',
        },
        {
          title: 'Solo tu celular',
          text: 'YOLOv8 corre en tiempo real en el dispositivo que ya tienes. Sin drones. Sin sensores. Sin infraestructura. Sin inversión en hardware.',
        },
        {
          title: 'Integración end-to-end',
          text: 'De la foto del campo al dashboard gerencial. Campo → proyección → logística en un solo sistema. Ningún competidor conecta estos tres mundos.',
        },
      ],
      comparison: {
        title: 'AgriVision vs. alternativas',
        headers: ['', 'Satélite\n(EOSDA)', 'ERP\n(Granular)', 'CV frutas\n(Agerpix)', 'AgriVision'],
        rows: [
          ['CV en campo (no satélite)', '✗', '✗', '✓', '✓'],
          ['Especialización en flores', '✗', '✗', '✗', '✓'],
          ['Estado fisiológico real', '✗', '✗', '✗', '✓'],
          ['Módulo logístico', '✗', 'parcial', '✗', '✓'],
          ['Proyección XGBoost', 'parcial', '✗', '✗', '✓'],
          ['Presencia en Colombia', '✗', '✗', '✗', '✓'],
        ],
      },
    },
    segments: {
      label: 'Para quién es',
      title: 'Diseñado para quien\ntiene algo que perder.',
      items: [
        {
          icon: '◈',
          title: 'Gerentes de floricultoras',
          sub: '100–500 ha · Sabana Norte de Bogotá',
          text: 'Tienes contratos de exportación activos. Sabes cuánto cuesta un error de proyección en temporada alta. AgriVision te da la certeza que el agrónomo no puede darte solo.',
          signal: 'Señal de compra: "La última temporada quedé corto en San Valentín."',
        },
        {
          icon: '◇',
          title: 'Sector financiero',
          sub: 'Finagro · Bancoldex · Banca agro',
          text: 'Necesitas evaluar una finca antes de aprobar un crédito. Obtén un informe objetivo del inventario fisiológico, estado sanitario y proyección de producción en 48 horas.',
          signal: 'Señal de compra: "Necesito un peritaje en menos de una semana."',
        },
      ],
    },
    meeting: {
      label: 'Agenda una demo',
      title: 'Tu finca. Tus datos.\nPrimera demo sin costo.',
      subtitle: 'La demo se hace en campo, con tus propios cultivos. Ves los resultados en tiempo real antes de tomar cualquier decisión.',
      form: {
        name: 'Nombre completo',
        company: 'Finca / Empresa',
        phone: 'WhatsApp o teléfono',
        email: 'Correo electrónico',
        hectares: '¿Cuántas hectáreas cultivan?',
        hectaresPlaceholder: 'Ej: 120 ha',
        message: 'Mensaje (opcional)',
        messagePlaceholder: 'Cuéntanos brevemente tu situación o qué te interesa explorar',
        submit: 'Solicitar demo en campo →',
        submitting: 'Enviando solicitud...',
        success: '¡Listo! Te contactaremos en menos de 24 horas para coordinar la visita.',
        error: 'Hubo un error al enviar. Escríbenos directamente a hola@agrivision.co',
      },
    },
    footer: {
      tagline: 'Construido para durar.\nHecho para el campo colombiano.',
      description: 'Plataforma de inteligencia de cultivo especializada en floricultura colombiana. Visión computacional + modelos predictivos + logística integrada.',
      contact: 'hola@agrivision.co',
      links: ['Política de privacidad', 'Términos de uso'],
      copyright: '© 2026 AgriVision · Sabana Norte, Bogotá, Colombia',
    },
    login: {
      title: 'Acceder a AgriVision',
      subtitle: 'Dashboard para clientes',
      email: 'Correo electrónico',
      password: 'Contraseña',
      submit: 'Ingresar',
      submitting: 'Verificando...',
      forgot: '¿Olvidaste tu contraseña?',
      notClient: '¿Aún no eres cliente?',
      requestDemo: 'Solicita una demo',
    },
  },

  en: {
    nav: {
      login: 'Log in',
      demo: 'Schedule a demo',
      langSwitch: 'ES',
    },
    hero: {
      eyebrow: 'Crop intelligence · Sabana Norte, Colombia',
      headline1: 'We turn the way you',
      headline2: 'see your field',
      headline3: 'into data,',
      tagline: 'so your work becomes lasting value.',
      subtext: 'Confirm your export orders with data, not hope.',
      cta: 'Schedule your field demo',
      ctaSub: 'Free · At your own farm',
      metrics: [
        { value: '≥85%', label: 'CV accuracy' },
        { value: '<15%', label: 'Forecast error' },
        { value: '30s', label: 'Photo to result' },
      ],
    },
    problem: {
      label: 'The problem',
      title: 'Every week, a gamble.',
      items: [
        {
          number: '01',
          title: 'Projections that fail',
          text: 'Farm managers confirm Miami orders using Excel and their agronomist\'s gut. Average error: 20–30%. During Valentine\'s season, that\'s $7,000–$25,000 USD lost in a single week.',
        },
        {
          number: '02',
          title: 'Diseases caught too late',
          text: 'By the time the technician spots botrytis or mildew, it has already spread. Treatment arrives 3–7 days late. A late-detected outbreak destroys 15–40% of the harvest.',
        },
        {
          number: '03',
          title: 'Logistics left to chance',
          text: 'Pallet assembly and truck assignment are done from memory or spreadsheets. A wrongly packed pallet or wrong temperature means rejection at destination — total loss.',
        },
      ],
    },
    solution: {
      label: 'The solution',
      title: 'One photo. Three modules. Certain decisions.',
      intro: 'No expensive hardware. No extra infrastructure. Just the phone you already have.',
      items: [
        {
          tag: 'Field Module',
          title: 'Real-time physiological status',
          text: 'Computer vision models trained exclusively on Colombian flowers classify every plant: bud, opening, ready. Accuracy ≥85%. Botrytis and mildew detection before spreading.',
          detail: 'YOLOv8 · Colombian flowers · Instant alert',
        },
        {
          tag: 'Projection Module',
          title: 'How much will you produce?',
          text: 'XGBoost + predictive time-series models generate a 1–4 week production forecast with less than 15% error. Confirm international contracts with certainty, not intuition.',
          detail: 'XGBoost · 1–4 week forecast · Error <15%',
        },
        {
          tag: 'Logistics Module',
          title: 'Paperless dispatch',
          text: 'Photo → QR scan → pallet assembly → truck assignment → tracked dispatch. One click for the manager to see every shipment\'s full status in real time.',
          detail: 'QR · Traceability · Management dashboard',
        },
      ],
    },
    howItWorks: {
      label: 'How it works',
      title: 'From field to data.\nFrom data to decision.',
      steps: [
        {
          number: '01',
          title: 'Capture',
          text: 'The operator takes photos with their phone during field rounds. No special training. No extra hardware needed.',
        },
        {
          number: '02',
          title: 'Analysis',
          text: 'Computer vision and XGBoost models process the images. Result in under 30 seconds.',
        },
        {
          number: '03',
          title: 'Dashboard',
          text: 'The manager sees full crop status, 4-week forecast, and logistics state in real time.',
        },
        {
          number: '04',
          title: 'Decision',
          text: 'Confirm your Miami order with real data from your own crop. From anxiety to certainty.',
        },
      ],
    },
    metrics: {
      label: 'Results',
      title: 'Numbers that matter.',
      items: [
        { value: '≥85%', label: 'Accuracy in plant physiological classification' },
        { value: '<15%', label: 'Error in 2-week production forecast' },
        { value: '30s', label: 'From photo to result visible in dashboard' },
        { value: '0', label: 'Additional hardware required to operate' },
      ],
    },
    whyUs: {
      label: 'Competitive edge',
      title: 'What can\'t be bought\nor copied.',
      items: [
        {
          title: '10+ years in Colombian flowers',
          text: 'The only platform built by someone who lived the field. Domain knowledge can\'t be hired off the shelf. This profile doesn\'t exist in Colombia\'s job market.',
        },
        {
          title: 'Proprietary dataset · Colombian flowers',
          text: 'Annotated images of roses, carnations, and chrysanthemums in real Sabana Norte conditions. Every new client deepens the moat. A late competitor will face a far more accurate model.',
        },
        {
          title: 'Just your phone',
          text: 'YOLOv8 runs in real time on the device you already have. No drones. No sensors. No infrastructure. No hardware investment.',
        },
        {
          title: 'End-to-end integration',
          text: 'From field photo to management dashboard. Field → forecast → logistics in a single system. No competitor connects these three worlds.',
        },
      ],
      comparison: {
        title: 'AgriVision vs. alternatives',
        headers: ['', 'Satellite\n(EOSDA)', 'ERP\n(Granular)', 'Fruit CV\n(Agerpix)', 'AgriVision'],
        rows: [
          ['Field CV (not satellite)', '✗', '✗', '✓', '✓'],
          ['Flower specialization', '✗', '✗', '✗', '✓'],
          ['Real physiological status', '✗', '✗', '✗', '✓'],
          ['Logistics module', '✗', 'partial', '✗', '✓'],
          ['XGBoost forecast', 'partial', '✗', '✗', '✓'],
          ['Colombia presence', '✗', '✗', '✗', '✓'],
        ],
      },
    },
    segments: {
      label: 'Who it\'s for',
      title: 'Built for those with\nsomething to lose.',
      items: [
        {
          icon: '◈',
          title: 'Farm managers',
          sub: '100–500 ha · Sabana Norte, Bogotá',
          text: 'You have active export contracts. You know what a projection error costs during peak season. AgriVision gives you the certainty your agronomist alone can\'t provide.',
          signal: 'Buying signal: "Last Valentine\'s I came up short on my order."',
        },
        {
          icon: '◇',
          title: 'Financial sector',
          sub: 'Finagro · Bancoldex · Agro banking',
          text: 'You need to evaluate a farm before approving a loan. Get an objective report on physiological inventory, health status, and production forecast in 48 hours.',
          signal: 'Buying signal: "I need a farm appraisal in under a week."',
        },
      ],
    },
    meeting: {
      label: 'Schedule a demo',
      title: 'Your farm. Your data.\nFirst demo, no cost.',
      subtitle: 'The demo happens in the field, with your own crops. You see results in real time before making any decision.',
      form: {
        name: 'Full name',
        company: 'Farm / Company',
        phone: 'WhatsApp or phone',
        email: 'Email address',
        hectares: 'How many hectares do you grow?',
        hectaresPlaceholder: 'E.g.: 120 ha',
        message: 'Message (optional)',
        messagePlaceholder: 'Tell us briefly about your situation or what you\'d like to explore',
        submit: 'Request a field demo →',
        submitting: 'Sending request...',
        success: 'Done! We\'ll contact you within 24 hours to coordinate the visit.',
        error: 'Something went wrong. Write to us directly at hello@agrivision.co',
      },
    },
    footer: {
      tagline: 'Built to last.\nMade for the Colombian field.',
      description: 'Crop intelligence platform specialized in Colombian floriculture. Computer vision + predictive models + integrated logistics.',
      contact: 'hello@agrivision.co',
      links: ['Privacy policy', 'Terms of use'],
      copyright: '© 2026 AgriVision · Sabana Norte, Bogotá, Colombia',
    },
    login: {
      title: 'Access AgriVision',
      subtitle: 'Client dashboard',
      email: 'Email address',
      password: 'Password',
      submit: 'Log in',
      submitting: 'Verifying...',
      forgot: 'Forgot your password?',
      notClient: 'Not a client yet?',
      requestDemo: 'Request a demo',
    },
  },
}
