import type {
  NavItem,
  EnfoqueCard,
  PriceCard,
  Testimonial,
  RedCard,
} from "@/types/content";

export const BRAND = "Wellness by Diana";

/** Single conversion channel — every CTA points here. */
export const WHATSAPP = "https://wa.me/message/T2BITTDAGQGUA1";

export const NAV: NavItem[] = [
  { label: "Mi enfoque", href: "#enfoque" },
  { label: "Servicios", href: "#servicios" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Sígueme", href: "#redes" },
];

export const NAV_CTA = "Agenda tu consulta";

// --- Hero ---
// rendered line by line; split on "\n" in Hero.tsx
export const HERO_STATEMENT = "Nutrición con acompañamiento real,\nsin dietas extremas.";
export const HERO_LOCATION = "Monterrey · En línea a todo México";
export const HERO_CREDENTIAL = "Lic. en Nutrición y Bienestar Integral · Educadora en Diabetes";
export const SCROLL_CUE = "Baja para entrar";

// looping marquee — Diana's positioning pillars
export const MARQUEE = [
  "Sin dietas extremas",
  "Educación en diabetes",
  "Basado en evidencia",
  "Hábitos que sí se quedan",
];

// --- Mi enfoque ---
export const ENFOQUE_LABEL = "Mi enfoque";
// splits on ": " for line breaks
export const ENFOQUE_QUOTE =
  "La nutrición no es seguir una dieta en un papel: es aprender a hacer elecciones conscientes sobre tu salud y tu alimentación.";

export const ENFOQUE_CARDS: EnfoqueCard[] = [
  {
    icon: "leaf",
    title: "Sostenible",
    text: "Sin dietas restrictivas ni prohibiciones — cambios que sí puedes mantener.",
  },
  {
    icon: "target",
    title: "Adaptado a ti",
    text: "Tu plan se ajusta a tus gustos, horarios y estilo de vida — no al revés.",
  },
  {
    icon: "book",
    title: "Educación clara",
    text: "Aprendes el porqué de cada recomendación, para no depender de un papel.",
  },
  {
    icon: "flask",
    title: "Con evidencia",
    text: "Recomendaciones respaldadas por ciencia, no por modas ni mitos.",
  },
];

export const ENFOQUE_INTRO =
  "¡Hola! Soy Diana, nutrióloga y educadora en diabetes. Si quieres aprender a mejorar tus hábitos y tu salud sin dietas extremas, estás en el lugar correcto.";

// --- Servicios / precios ---
export const SERVICIOS_LABEL = "Consultas";
export const SERVICIOS_TITLE = "Elige cómo empezar";
export const SERVICIOS_NOTE = "📍 Presencial en Monterrey · En línea desde donde estés";

export const PRICING: PriceCard[] = [
  {
    tag: "Presencial · En línea",
    title: "Consulta completa",
    price: "$650 MXN",
    features: [
      "Historia clínica completa y revisión de tus estudios de laboratorio",
      "Análisis de composición corporal con InBody H30",
      "Plan de alimentación 100% personalizado a tus gustos",
      "Esquema de suplementación si lo necesitas",
      "Lista de productos recomendados del súper",
      "Educación nutricional y recomendaciones de estilo de vida",
      "Acompañamiento por WhatsApp entre consultas",
    ],
    cta: "Agendar consulta",
    featured: true,
    badge: "★ La más elegida",
  },
  {
    tag: "Presencial",
    title: "Solo análisis InBody H30",
    price: "$100 MXN",
    features: [
      "Medición de peso, músculo, grasa, % de grasa, grasa visceral y tasa metabólica basal",
      "Resultados explicados al momento",
    ],
    cta: "Agendar",
  },
];

// --- Programa / beneficios ---
export const PROGRAMA_LABEL = "Para mis pacientes";
export const PROGRAMA_TITLE = "Beneficios de agendar conmigo";
export const CAMINO = {
  title: "Tu camino Wellness",
  note: "Cada consulta cuenta: ve viendo tu avance y completa el camino para llegar a tus objetivos y obtener un beneficio adicional.",
  stepsDone: 3,
  stepsTotal: 5,
  footnote: "Programa de cliente frecuente · pregúntame en tu consulta",
};
export const TRIPLE = {
  title: "Triple Wellness",
  text: "Vengan tres el mismo mes — amigas, familia, quien tú quieras — y la tercera persona paga la mitad. Cada quien recibe su intervención y recomendaciones individuales y 100% personalizadas, y la persona que paga la mitad se la pueden ir rotando. Ese es el precio del programa mientras las tres sigan activas.",
};

// --- Testimonios ---
export const TESTIMONIOS_LABEL = "Pacientes reales";
export const TESTIMONIOS_TITLE = "Lo que dicen de trabajar conmigo";

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Desde que comencé mi proceso con la Lic. Diana, hace tres meses, he experimentado cambios muy positivos en mi salud y bienestar. Antes comía muy poco y solía sentir un cansancio intenso después de cada comida. Hoy puedo decir que he aprendido a entender mejor las necesidades de mi cuerpo, tanto en la calidad como en la cantidad de los alimentos que consumo, y esa sensación de agotamiento ha disminuido considerablemente. Además, este proceso me ha ayudado a sentirme mejor conmigo misma. Durante muchos años me resultó difícil bajar de peso y mantener los resultados, pero ahora noto una diferencia real, no solo en mi apariencia, sino también en cómo me siento día a día. Estoy muy agradecida por el acompañamiento y las herramientas que he recibido para construir hábitos más saludables y sostenibles.",
    initial: "D",
    age: "35 años",
  },
  {
    quote:
      "Mi experiencia con la nutrióloga ha sido muy agradable. Gracias a su acompañamiento he logrado avanzar en mis objetivos de disminuir grasa corporal y aumentar masa muscular. Me he sentido muy cómoda durante el proceso porque siempre escucha mis necesidades, gustos y antojos, adaptando el plan de alimentación a mi estilo de vida. Su atención personalizada y apoyo constante han hecho que alcanzar mis metas sea mucho más fácil y llevadero.",
    initial: "W",
    age: "21 años",
  },
  {
    quote:
      "Llevo unos meses siguiendo el plan alimenticio diseñado por Diana mi súper nutrióloga y no podría estar más satisfecha. Lo que más valoro es que no se trata de una dieta restrictiva o de pasar hambre, sino de aprender a comer de manera inteligente y equilibrada. Desde la primera consulta, se tomó el tiempo de escuchar mis objetivos, mis gustos y, sobre todo, mi ritmo de vida. El plan es sumamente variado, fácil de seguir y con ingredientes accesibles. Los resultados hablan por sí solos: he mejorado mis niveles de energía, mi digestión es otra y he logrado mis metas de composición corporal de forma sostenible. Su enfoque empático, profesional y motivador marca la diferencia. ¡La recomiendo al 100% si buscas un cambio real y saludable!",
    initial: "M",
    age: "57 años",
  },
  {
    quote:
      "Quiero compartir mi experiencia en el cambio de alimentación con la Lic. Diana Vázquez. Venía de un proceso de cáncer de mama con una alimentación no tan favorable, ya que solo comía lo que podía en las quimios; mi cuerpo quedó cansado y muy agotado. Gracias a la paciencia y a las enseñanzas de la Lic. Diana pude recuperar más mi energía. Un aprendizaje de vida cuando cambias el concepto de dieta por el estilo de vida, y lo más importante: su escucha, para poder entender que en ocasiones nuestras vivencias hacen que nos refugiemos en la comida. Las palabras correctas sin sentirme juzgada y su profesionalismo me han ayudado a reforzar mi salud, bajar de peso y, sobre todo, a creer que sí se puede recuperar la mejor versión de mí misma. De corazón, muchísimas gracias por lo que ha transformado mi vida. La recomiendo muchísimo.",
    initial: "L",
    age: "53 años",
  },
];

// --- Redes ---
export const REDES_LABEL = "Sígueme";
export const REDES_TITLE = "Para que cuidarte se te haga fácil";
export const REDES_NOTE = "Educación en diabetes, tips que sí puedes aplicar y mi día a día.";

export const REDES: RedCard[] = [
  {
    network: "instagram",
    name: "Instagram",
    handle: "@wellness.bydiana",
    href: "https://www.instagram.com/wellness.bydiana",
  },
  {
    network: "tiktok",
    name: "TikTok",
    handle: "@wellnessbydiana",
    href: "https://www.tiktok.com/@wellnessbydiana",
  },
  {
    network: "whatsapp",
    name: "WhatsApp",
    handle: "Agenda directo conmigo",
    href: WHATSAPP,
  },
];

// --- CTA final + footer ---
export const CTA = {
  left: "No es una dieta.",
  right: "Es un estilo de vida.",
  headline: "¿Empezamos? ✨",
  action: "¡Quiero agendar mi consulta!",
  copyright: "© Wellness by Diana 2026",
  credit: "Nutrición clínica y educación en diabetes",
  madeIn: "Hecho con cariño en México 🇲🇽",
};

export const WA_FLOAT = "💬 Escríbeme por WhatsApp";
