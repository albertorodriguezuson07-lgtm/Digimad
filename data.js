// =====================================================
// DigiMad — Data: cuestionario, dimensiones y stack
// TFG UCAM 2026 — Alberto Rodríguez Usón
// =====================================================

const DIMENSIONS = [
  {
    id: 'catalogo',
    name: 'Catálogo digital',
    icon: '📦',
    color: '#cc0000',
    description: 'Cobertura, calidad y escalabilidad del contenido de productos en el canal online.',
    questions: [
      {
        text: '¿Qué porcentaje de tu inventario físico está publicado en tu tienda online con ficha completa?',
        help: 'Considerar ficha completa: título, descripción, especificaciones técnicas, imágenes y precio actualizado.',
        options: [
          { text: 'Menos del 25%', score: 0 },
          { text: 'Entre el 25% y el 50%', score: 1 },
          { text: 'Entre el 50% y el 80%', score: 2 },
          { text: 'Más del 80%', score: 3 }
        ]
      },
      {
        text: '¿Cómo se generan actualmente las fichas de producto?',
        help: 'Pensar en el flujo habitual de incorporación de nuevos productos al catálogo.',
        options: [
          { text: 'Manualmente, una a una, sin proceso definido', score: 0 },
          { text: 'Manualmente con plantilla o estructura común', score: 1 },
          { text: 'Parcialmente automatizado (importación CSV o similar)', score: 2 },
          { text: 'Automatizado con IA generativa o pipeline completo', score: 3 }
        ]
      },
      {
        text: '¿Tus fichas de producto incluyen contenido optimizado para buscadores (SEO)?',
        help: 'Meta-título, meta-descripción, palabras clave en el cuerpo, alt text en imágenes, URL limpia.',
        options: [
          { text: 'No, son textos planos sin optimización', score: 0 },
          { text: 'Solo título y descripción básicos', score: 1 },
          { text: 'Sí, con SEO básico (meta tags y alt text)', score: 2 },
          { text: 'Sí, con SEO completo y diferenciado por producto', score: 3 }
        ]
      },
      {
        text: '¿Cuánto tiempo tarda en publicarse un producto nuevo en la tienda online desde que llega al almacén?',
        help: 'Tiempo medio desde la recepción del producto hasta su disponibilidad para venta online.',
        options: [
          { text: 'Más de un mes o no se publica', score: 0 },
          { text: 'Entre una semana y un mes', score: 1 },
          { text: 'Entre uno y siete días', score: 2 },
          { text: 'Menos de 24 horas', score: 3 }
        ]
      }
    ]
  },
  {
    id: 'seo_ux',
    name: 'SEO y experiencia de usuario',
    icon: '🔍',
    color: '#dc2626',
    description: 'Visibilidad orgánica, navegación, conversión y elementos de confianza.',
    questions: [
      {
        text: '¿Qué porcentaje de tu tráfico web procede de búsqueda orgánica (SEO)?',
        help: 'Si no lo sabes, consulta Google Analytics o similar. Indica la cifra aproximada de los últimos 3 meses.',
        options: [
          { text: 'Menos del 10% o no lo sé', score: 0 },
          { text: 'Entre el 10% y el 25%', score: 1 },
          { text: 'Entre el 25% y el 40%', score: 2 },
          { text: 'Más del 40%', score: 3 }
        ]
      },
      {
        text: '¿Tu tienda online tiene filtros de búsqueda y navegación por categorías?',
        help: 'Filtros por marca, precio, tipo, características técnicas, disponibilidad, etc.',
        options: [
          { text: 'No, solo se navega por listado general', score: 0 },
          { text: 'Solo categorías básicas, sin filtros laterales', score: 1 },
          { text: 'Categorías y filtros básicos (marca, precio)', score: 2 },
          { text: 'Categorías jerárquicas y filtros avanzados', score: 3 }
        ]
      },
      {
        text: '¿Qué elementos de confianza muestra tu tienda al visitante?',
        help: 'Sellos de pago seguro, reseñas, garantía, plazos de entrega, devoluciones, marcas oficiales.',
        options: [
          { text: 'Ninguno o solo logo', score: 0 },
          { text: 'Algún sello básico de pago', score: 1 },
          { text: 'Pago verificado, plazos y garantía', score: 2 },
          { text: 'Todo lo anterior + reseñas verificadas + logos de marcas', score: 3 }
        ]
      },
      {
        text: '¿Cuándo fue la última vez que rediseñaste la página de inicio o el tema de tu tienda?',
        help: 'Cambio significativo de diseño, no actualización menor de banners.',
        options: [
          { text: 'Hace más de 3 años o nunca', score: 0 },
          { text: 'Entre 1 y 3 años', score: 1 },
          { text: 'En el último año', score: 2 },
          { text: 'En los últimos 6 meses', score: 3 }
        ]
      }
    ]
  },
  {
    id: 'datos',
    name: 'Datos integrados (SSOT)',
    icon: '📊',
    color: '#2563eb',
    description: 'Consolidación de fuentes y capacidad de tomar decisiones con evidencia empírica.',
    questions: [
      {
        text: '¿Cómo consultas el rendimiento de tu negocio digital habitualmente?',
        help: 'Pensar en el proceso real de consulta de datos para tomar decisiones (semanal o mensual).',
        options: [
          { text: 'No consulto datos de forma sistemática', score: 0 },
          { text: 'Abro cada plataforma por separado cuando necesito un dato', score: 1 },
          { text: 'Tengo informes en Excel que actualizo manualmente', score: 2 },
          { text: 'Tengo un dashboard consolidado que muestra todo en un lugar', score: 3 }
        ]
      },
      {
        text: '¿Qué fuentes de datos tienes integradas y accesibles desde un único punto?',
        help: 'Por ejemplo: Shopify, Google Analytics, plataformas publicitarias, email marketing, etc.',
        options: [
          { text: 'Ninguna fuente integrada', score: 0 },
          { text: 'Una fuente (típicamente Shopify o el CMS)', score: 1 },
          { text: 'Dos o tres fuentes integradas', score: 2 },
          { text: 'Cuatro o más fuentes integradas', score: 3 }
        ]
      },
      {
        text: '¿Cómo tomas decisiones sobre dónde invertir el presupuesto de marketing?',
        help: 'Pensar en la última decisión significativa de redistribución presupuestaria.',
        options: [
          { text: 'Por intuición o experiencia del equipo', score: 0 },
          { text: 'Basándome en métricas de un solo canal', score: 1 },
          { text: 'Cruzando datos de varios canales manualmente', score: 2 },
          { text: 'Con evidencia consolidada de todas las fuentes en un único panel', score: 3 }
        ]
      },
      {
        text: '¿Con qué frecuencia se actualizan los datos que utilizas para decidir?',
        help: 'Pensar en la frescura real de los datos en el momento en que los consultas.',
        options: [
          { text: 'Datos manuales con más de un mes de retraso', score: 0 },
          { text: 'Datos mensuales actualizados manualmente', score: 1 },
          { text: 'Datos semanales o diarios actualizados manualmente', score: 2 },
          { text: 'Datos en tiempo real o diarios automatizados', score: 3 }
        ]
      }
    ]
  },
  {
    id: 'email',
    name: 'Email marketing y automatización',
    icon: '✉️',
    color: '#7c3aed',
    description: 'Automatización de comunicación con clientes a lo largo del ciclo de vida.',
    questions: [
      {
        text: '¿Tienes algún sistema de email marketing automatizado conectado con tu tienda?',
        help: 'Por ejemplo: Klaviyo, Mailchimp, ActiveCampaign, ConvertKit, etc.',
        options: [
          { text: 'No tengo email marketing', score: 0 },
          { text: 'Solo envío campañas manuales puntuales', score: 1 },
          { text: 'Tengo 1-3 flujos automatizados básicos', score: 2 },
          { text: 'Tengo más de 5 flujos automatizados activos', score: 3 }
        ]
      },
      {
        text: '¿Capturas el email de los visitantes que llegan a tu tienda?',
        help: 'Mediante popup, formulario, suscripción a newsletter, etc.',
        options: [
          { text: 'No', score: 0 },
          { text: 'Sí, con un formulario en el footer', score: 1 },
          { text: 'Sí, con popup configurado pero sin incentivo', score: 2 },
          { text: 'Sí, con popup + incentivo (descuento, contenido) + secuencia de bienvenida', score: 3 }
        ]
      },
      {
        text: '¿Tienes flujos automáticos de recuperación de carrito y checkout abandonado?',
        help: 'Emails que se envían automáticamente cuando alguien añade un producto sin comprar.',
        options: [
          { text: 'No', score: 0 },
          { text: 'Solo uno de los dos', score: 1 },
          { text: 'Ambos pero sin segmentar', score: 2 },
          { text: 'Ambos con segmentación y secuencias de varios emails', score: 3 }
        ]
      },
      {
        text: '¿Has segmentado tu base de contactos según comportamiento de compra?',
        help: 'Por ejemplo: clientes nuevos, recurrentes, VIP, en riesgo de abandono, inactivos (modelo RFM).',
        options: [
          { text: 'No tengo segmentos', score: 0 },
          { text: 'Solo segmentos demográficos básicos', score: 1 },
          { text: 'Algunos segmentos por comportamiento (2-3)', score: 2 },
          { text: 'Segmentos RFM completos (frecuencia, recencia, valor)', score: 3 }
        ]
      }
    ]
  },
  {
    id: 'omnicanal',
    name: 'Omnicanalidad',
    icon: '💬',
    color: '#0891b2',
    description: 'Captación y atención en redes sociales, mensajería y canales preferidos del cliente.',
    questions: [
      {
        text: '¿Cómo gestionas las consultas que llegan por WhatsApp, redes sociales o chat?',
        help: 'Pensar en el flujo real de atención al cliente fuera del email.',
        options: [
          { text: 'Una persona responde manualmente cuando puede', score: 0 },
          { text: 'Una persona responde de forma sistemática en horario laboral', score: 1 },
          { text: 'Hay respuestas automáticas básicas + atención humana', score: 2 },
          { text: 'Chatbot inteligente con consulta de inventario en tiempo real', score: 3 }
        ]
      },
      {
        text: '¿Captas tráfico desde redes sociales hacia canales donde puedes convertir?',
        help: 'Por ejemplo: Instagram → WhatsApp con incentivo, TikTok → tienda, etc.',
        options: [
          { text: 'No tengo estrategia de captación desde redes sociales', score: 0 },
          { text: 'Tengo enlaces en bio pero sin automatización', score: 1 },
          { text: 'Tengo redirección automatizada (ManyChat o similar)', score: 2 },
          { text: 'Tengo flujos completos con captura de contacto e incentivo', score: 3 }
        ]
      },
      {
        text: '¿Tu chatbot o sistema de atención puede consultar el inventario de tu tienda en tiempo real?',
        help: 'Cuando alguien pregunta por disponibilidad de un producto, el sistema responde con el stock actual.',
        options: [
          { text: 'No tengo chatbot o no tiene esa función', score: 0 },
          { text: 'El chatbot responde con datos estáticos', score: 1 },
          { text: 'El chatbot responde con datos actualizados manualmente', score: 2 },
          { text: 'El chatbot consulta la API de la tienda en tiempo real', score: 3 }
        ]
      },
      {
        text: '¿En qué canal se cierran finalmente la mayoría de tus ventas B2B?',
        help: 'Pensar en cómo el cliente realmente paga y confirma el pedido.',
        options: [
          { text: 'Solo presencial o por teléfono', score: 0 },
          { text: 'Mezcla de presencial y online, sin trazabilidad', score: 1 },
          { text: 'Online en su mayoría, con trazabilidad parcial', score: 2 },
          { text: 'Online con trazabilidad completa de origen del cliente', score: 3 }
        ]
      }
    ]
  },
  {
    id: 'eficiencia',
    name: 'Eficiencia publicitaria',
    icon: '💰',
    color: '#16a34a',
    description: 'Equilibrio entre medios pagados y propios; rentabilidad real de la inversión.',
    questions: [
      {
        text: '¿Conoces el coste real de adquisición de cliente (CAC) de tu canal online?',
        help: 'CAC = Inversión publicitaria total / clientes nuevos captados en un periodo.',
        options: [
          { text: 'No, no calculo el CAC', score: 0 },
          { text: 'Tengo una estimación aproximada', score: 1 },
          { text: 'Sí, lo calculo trimestralmente', score: 2 },
          { text: 'Sí, lo monitorizo mensualmente y por canal', score: 3 }
        ]
      },
      {
        text: '¿Conoces el ROAS (retorno sobre la inversión publicitaria) de cada canal?',
        help: 'ROAS = Ingresos atribuidos al canal / inversión en ese canal.',
        options: [
          { text: 'No, no calculo el ROAS', score: 0 },
          { text: 'Tengo una visión general agregada', score: 1 },
          { text: 'Lo conozco por canal pero sin tendencia', score: 2 },
          { text: 'Lo monitorizo por canal con tendencia mensual', score: 3 }
        ]
      },
      {
        text: '¿Cuánto depende tu negocio digital de la publicidad pagada para generar tráfico?',
        help: 'Pensar en qué porcentaje de tus visitas vienen de campañas pagadas vs orgánico/directo/email.',
        options: [
          { text: 'Más del 70% del tráfico viene de pago', score: 0 },
          { text: 'Entre el 40% y el 70%', score: 1 },
          { text: 'Entre el 15% y el 40%', score: 2 },
          { text: 'Menos del 15% del tráfico viene de pago', score: 3 }
        ]
      },
      {
        text: '¿Has conseguido reducir tu inversión publicitaria manteniendo o aumentando ventas?',
        help: 'Pensar si hay un momento en los últimos 12 meses donde se haya producido este escenario.',
        options: [
          { text: 'No, las ventas dependen totalmente del presupuesto publicitario', score: 0 },
          { text: 'Hay momentos en que reducir inversión no afecta proporcionalmente', score: 1 },
          { text: 'He reducido inversión sin perder ventas', score: 2 },
          { text: 'He reducido inversión y aumentado ventas significativamente', score: 3 }
        ]
      }
    ]
  }
];

// =====================================================
// MATURITY LEVELS
// =====================================================
const MATURITY_LEVELS = [
  {
    min: 0, max: 25,
    name: 'Nivel inicial',
    description: 'Tu microempresa está en una fase muy temprana de digitalización. Hay margen amplio de mejora en prácticamente todas las dimensiones. La buena noticia: con un stack de menos de 100 USD mensuales y un orden de implementación claro, los primeros resultados son visibles en pocas semanas.',
    color: '#dc2626'
  },
  {
    min: 26, max: 50,
    name: 'En desarrollo',
    description: 'Tu negocio digital tiene una base mínima funcional pero con carencias importantes. La prioridad es consolidar los componentes que ya existen y cubrir los huecos críticos antes de añadir complejidad. El retorno de las próximas inversiones puede ser muy alto si se ataca el orden correcto.',
    color: '#f59e0b'
  },
  {
    min: 51, max: 75,
    name: 'Avanzado',
    description: 'Tienes una arquitectura digital madura con la mayoría de los componentes operativos. La oportunidad ahora está en la integración entre piezas, en la optimización de los flujos existentes y en la reducción de la dependencia de los canales pagados a favor de los activos propios.',
    color: '#0891b2'
  },
  {
    min: 76, max: 100,
    name: 'Optimizado',
    description: 'Tu microempresa opera con un nivel de madurez digital comparable al de organizaciones mucho mayores. Las áreas de mejora restantes son específicas y requieren análisis fino caso por caso. Estás en posición de explorar capacidades emergentes (IA generativa, agentes conversacionales con contexto, automatizaciones más sofisticadas).',
    color: '#16a34a'
  }
];

// =====================================================
// STACK BY DIMENSION
// =====================================================
const STACK_BY_DIMENSION = {
  catalogo: [
    { tool: 'Shopify Basic', function: 'Plataforma e-commerce', plan: 'Basic', cost: 29, mandatory: true },
    { tool: 'Make.com', function: 'Orquestación de automatizaciones', plan: 'Core', cost: 10, mandatory: false },
    { tool: 'OpenAI API', function: 'Generación automática de fichas con GPT-4', plan: 'Pay-as-you-go', cost: 10, mandatory: false },
    { tool: 'Airtable', function: 'Base de datos intermedia para productos', plan: 'Free', cost: 0, mandatory: false }
  ],
  seo_ux: [
    { tool: 'Tema premium Shopify', function: 'Plantilla con filtros y trust builders', plan: 'Compra única ~180 USD', cost: 15, mandatory: false },
    { tool: 'Google Search Console', function: 'Monitorización SEO', plan: 'Free', cost: 0, mandatory: true }
  ],
  datos: [
    { tool: 'Google Sheets', function: 'SSOT consolidado', plan: 'Free', cost: 0, mandatory: true },
    { tool: 'Chart.js + GitHub Pages', function: 'Dashboard visual gratuito', plan: 'Free', cost: 0, mandatory: false },
    { tool: 'Google Analytics 4', function: 'Analítica web', plan: 'Free', cost: 0, mandatory: true }
  ],
  email: [
    { tool: 'Klaviyo', function: 'Email marketing automatizado', plan: 'Por contactos', cost: 20, mandatory: true }
  ],
  omnicanal: [
    { tool: 'ManyChat', function: 'Automatización Instagram → WhatsApp', plan: 'Free', cost: 0, mandatory: false },
    { tool: 'n8n cloud', function: 'Orquestación chatbot WhatsApp', plan: 'Cloud Starter', cost: 15, mandatory: false },
    { tool: 'OpenAI GPT-4o-mini', function: 'Motor conversacional del chatbot', plan: 'Pay-as-you-go', cost: 5, mandatory: false }
  ],
  eficiencia: [
    { tool: 'Meta Business Suite', function: 'Gestión de campañas pagadas', plan: 'Free', cost: 0, mandatory: true }
  ]
};

// =====================================================
// PRIORITIES MAP — recomendaciones por dimensión débil
// =====================================================
const PRIORITY_RECOMMENDATIONS = {
  catalogo: {
    title: 'Escala tu catálogo digital con automatización',
    description: 'Si tu catálogo cubre menos del 80% de tu inventario físico, la prioridad inmediata es construir un sistema de generación automática de fichas. Combinando Make.com con la API de OpenAI puedes pasar de 30 minutos por ficha manual a menos de 10 segundos por ficha generada, a un coste aproximado de 0,03 USD por unidad. Es la inversión con mayor retorno inmediato porque cada ficha publicada es una página indexable que atraerá tráfico orgánico durante años.',
    impact: 'Impacto esperado: catálogo ×5 a ×10 en pocas semanas, base de tráfico orgánico SEO multiplicada por un factor similar a medio plazo.'
  },
  seo_ux: {
    title: 'Optimiza navegación y elementos de confianza',
    description: 'Si tu tienda no tiene filtros de búsqueda avanzados, navegación jerárquica y elementos de confianza visibles (sellos de pago, plazos de entrega, reseñas verificadas, logos de marcas oficiales), estás dejando dinero sobre la mesa en cada visita. El comprador B2B industrial necesita verificar antes de comprar; reducir la fricción en esa verificación tiene impacto directo sobre la conversión.',
    impact: 'Impacto esperado: mejora de la tasa de conversión entre el 30% y el 50% sin necesidad de aumentar tráfico.'
  },
  datos: {
    title: 'Construye un SSOT (Single Source of Truth)',
    description: 'Sin un panel consolidado, las decisiones se toman desde la intuición. Construir un SSOT en Google Sheets que reúna los datos de Shopify, Google Analytics 4, Meta Business Suite y la plataforma de email marketing es gratuito y permite responder con evidencia preguntas como qué canal genera más ventas reales o si vale la pena reducir la inversión publicitaria. Es la base sobre la que se sostienen todas las decisiones posteriores.',
    impact: 'Impacto esperado: capacidad de tomar decisiones de inversión con evidencia, reducción del riesgo de error en decisiones estratégicas.'
  },
  email: {
    title: 'Activa flujos de email marketing automatizados',
    description: 'Si no tienes email marketing o tienes menos de 3 flujos activos, estás perdiendo entre el 5% y el 15% de las ventas potenciales. Como mínimo necesitas: bienvenida con popup e incentivo, recuperación de carrito abandonado, recuperación de checkout abandonado, postcompra con cross-sell y winback de inactivos. Klaviyo se integra nativamente con Shopify y opera por menos de 30 USD mensuales en el rango de la microempresa.',
    impact: 'Impacto esperado: revenue adicional del 6% al 15% sobre ventas online totales, a coste marginal mínimo.'
  },
  omnicanal: {
    title: 'Implementa atención automatizada en WhatsApp e Instagram',
    description: 'En el comercio B2B, especialmente en mercados latinoamericanos, WhatsApp es el canal principal de consulta. Atender manualmente significa que las consultas fuera de horario se pierden o llegan tarde. Un chatbot construido con n8n y GPT-4o-mini con consulta de inventario en tiempo real puede responder 24/7 con información actualizada, capturar leads desde Instagram y derivar conversaciones complejas a humanos cuando sea necesario.',
    impact: 'Impacto esperado: respuesta inmediata 24/7, reducción del tiempo de gestión por consulta, aumento de la conversión de tráfico social.'
  },
  eficiencia: {
    title: 'Reduce dependencia de la publicidad pagada',
    description: 'Si más del 40% de tu tráfico viene de publicidad pagada, tu modelo de negocio depende mensualmente de mantener el presupuesto. Construir activos digitales acumulativos (catálogo indexado, contenido SEO, base de email, plantillas reutilizables) reduce progresivamente esa dependencia. El objetivo no es eliminar la publicidad, sino que cuando reduzcas el presupuesto las ventas no caigan proporcionalmente.',
    impact: 'Impacto esperado: reducción del CAC del 50% al 75% en 12-18 meses, ROAS multiplicado por 3 a 5 veces.'
  }
};

// =====================================================
// ROADMAP TEMPLATE — secuencia universal con adaptaciones
// =====================================================
const ROADMAP_BASE = [
  {
    phase: 'Fase 1',
    title: 'Catálogo digital escalable',
    description: 'Implementar el sistema de generación automática de fichas y publicar al menos el 80% del inventario físico en la tienda online con contenido SEO optimizado.',
    duration: '4-6 semanas',
    dimension: 'catalogo'
  },
  {
    phase: 'Fase 2',
    title: 'SEO y rediseño de la tienda',
    description: 'Cambio de plantilla, reorganización de menús, incorporación de filtros, trust builders y reseñas verificadas. Los productos publicados necesitan una arquitectura que permita encontrarlos.',
    duration: '3-4 semanas',
    dimension: 'seo_ux'
  },
  {
    phase: 'Fase 3',
    title: 'SSOT y dashboard de control',
    description: 'Construcción del repositorio centralizado de datos en Google Sheets y dashboard visual gratuito con Chart.js. Sin esto, las decisiones de las fases siguientes son a ciegas.',
    duration: '2-3 semanas',
    dimension: 'datos'
  },
  {
    phase: 'Fase 4',
    title: 'Email marketing automatizado',
    description: 'Activación de los 9 flujos básicos en Klaviyo (bienvenida, abandonos, postcompra, winback, sunset). Captura de email mediante popup con incentivo.',
    duration: '4-6 semanas',
    dimension: 'email'
  },
  {
    phase: 'Fase 5',
    title: 'Automatización omnicanal',
    description: 'Captación desde Instagram a WhatsApp con cupón de incentivo. Chatbot de WhatsApp con n8n, GPT-4o-mini y consulta de inventario en tiempo real.',
    duration: '3-4 semanas',
    dimension: 'omnicanal'
  },
  {
    phase: 'Fase 6',
    title: 'Optimización publicitaria',
    description: 'Una vez consolidados los activos propios, redistribución del presupuesto publicitario. Reducción gradual de la dependencia de medios pagados sin perder volumen.',
    duration: 'Continua',
    dimension: 'eficiencia'
  }
];
