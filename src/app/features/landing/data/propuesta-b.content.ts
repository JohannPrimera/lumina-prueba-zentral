import {
  ContenidoHero,
  EncabezadoSeccion,
  EnlaceNavegacion,
  IndicadorHero,
  Modulo,
  Mundo,
  PasoImplementacion,
  RolComunidad,
  Testimonio,
  TextoPorModo,
  TextosInterfaz,
} from '../propuesta-b.models';

/**
 * Textos de la Propuesta B. Cada bloque lleva las dos variantes de copy en el
 * mismo objeto: el componente no elige palabras, solo lee `texto[modo]`.
 *
 * Los hechos son los mismos que en la landing vigente (mismos módulos, mismos
 * pasos de implementación, mismo testimonio). Lo que cambia es a quién le habla.
 */

export const ENLACES_NAVEGACION: EnlaceNavegacion[] = [
  { etiqueta: { nino: 'Tus mundos', docente: 'Avance' }, fragmento: 'mundos' },
  { etiqueta: { nino: 'Qué hay adentro', docente: 'Plataforma' }, fragmento: 'modulos' },
  { etiqueta: { nino: 'Quiénes juegan', docente: 'Comunidad' }, fragmento: 'comunidad' },
  { etiqueta: { nino: 'Cómo empieza', docente: 'Implementación' }, fragmento: 'implementacion' },
];

export const HERO: ContenidoHero = {
  titulo: { nino: 'Subí de', docente: 'Un solo sistema' },
  tituloAcento: { nino: 'nivel', docente: 'escolar' },
  bajada: {
    nino: 'Practicá lo que viste en clase, ganá insignias y mirá cómo sube tu racha. Tus profes ven tu avance al mismo tiempo que vos.',
    docente:
      'Pagos, asistencia, evaluaciones y prácticas en una sola plataforma, instalada de preescolar a bachillerato con los niveles, grupos y costos reales de su institución.',
  },
  cta: { nino: 'Empezar a jugar', docente: 'Solicitar demostración' },
  ctaSecundario: { nino: 'Ver los mundos', docente: 'Ver el panel' },
  nota: {
    nino: 'Tu colegio te da el usuario. No necesitás instalar nada.',
    docente: 'Demostración de 30 minutos con su equipo directivo. Respondemos en un día hábil.',
  },
};

export const INDICADORES_HERO: IndicadorHero[] = [
  {
    valor: { nino: '12', docente: '1.240' },
    etiqueta: { nino: 'Tu nivel', docente: 'Estudiantes activos' },
    acento: 1,
  },
  {
    valor: { nino: '7', docente: '94%' },
    etiqueta: { nino: 'Días de racha', docente: 'Asistencia de hoy' },
    acento: 2,
  },
  {
    valor: { nino: '23', docente: '8' },
    etiqueta: { nino: 'Insignias ganadas', docente: 'Niveles cubiertos' },
    acento: 3,
  },
];

export const PILARES: TextoPorModo[] = [
  {
    nino: 'Cada tema de clase tiene su juego.',
    docente: 'Un solo sistema de preescolar a bachillerato.',
  },
  {
    nino: 'Tu avance queda guardado, siempre.',
    docente: 'Los datos académicos y financieros quedan bajo resguardo del colegio.',
  },
  {
    nino: 'Tus profes te acompañan desde el primer día.',
    docente: 'Migración de sus datos y formación docente incluidas.',
  },
];

export const ENCABEZADO_MUNDOS: EncabezadoSeccion = {
  antetitulo: { nino: 'Tu camino', docente: 'Avance del período' },
  titulo: { nino: 'Cinco mundos', docente: 'Cobertura por' },
  tituloAcento: { nino: 'por conquistar', docente: 'área' },
  bajada: {
    nino: 'Cada mundo se abre cuando terminás el anterior. Tocá uno para ver qué te espera.',
    docente:
      'Avance real por área curricular en el período en curso. Dirección y docentes ven la misma cifra el mismo día.',
  },
};

export const MUNDOS: Mundo[] = [
  {
    numero: '01',
    nombre: { nino: 'Isla de los números', docente: 'Matemática' },
    materia: { nino: 'Sumas, restas y patrones', docente: 'Operaciones y patrones' },
    porcentaje: 100,
    estado: { nino: '¡Completado!', docente: 'Cerrado' },
    completado: true,
  },
  {
    numero: '02',
    nombre: { nino: 'Bosque de palabras', docente: 'Lengua' },
    materia: { nino: 'Leer, escribir y contar cuentos', docente: 'Comprensión y producción escrita' },
    porcentaje: 100,
    estado: { nino: '¡Completado!', docente: 'Cerrado' },
    completado: true,
  },
  {
    numero: '03',
    nombre: { nino: 'Laboratorio', docente: 'Ciencias naturales' },
    materia: { nino: 'Plantas, animales y experimentos', docente: 'Seres vivos y método científico' },
    porcentaje: 68,
    estado: { nino: 'Estás acá', docente: 'En curso' },
    completado: false,
  },
  {
    numero: '04',
    nombre: { nino: 'Ciudad del tiempo', docente: 'Ciencias sociales' },
    materia: { nino: 'Mapas, historia y comunidad', docente: 'Geografía e historia' },
    porcentaje: 0,
    estado: { nino: 'Se abre pronto', docente: 'Sin iniciar' },
    completado: false,
  },
  {
    numero: '05',
    nombre: { nino: 'Taller creativo', docente: 'Arte y tecnología' },
    materia: { nino: 'Dibujar, construir e inventar', docente: 'Expresión y pensamiento computacional' },
    porcentaje: 0,
    estado: { nino: 'Bloqueado', docente: 'Sin iniciar' },
    completado: false,
  },
];

export const ENCABEZADO_MODULOS: EncabezadoSeccion = {
  antetitulo: { nino: 'Qué hay adentro', docente: 'Plataforma' },
  titulo: { nino: 'Todo lo de la escuela,', docente: 'Gestión y' },
  tituloAcento: { nino: 'en un solo lugar', docente: 'aprendizaje' },
  bajada: {
    nino: 'Lo mismo que usan tus profes y la dirección del colegio. Vos ves tu parte.',
    docente: 'Cuatro módulos sobre un mismo registro, sin consolidar reportes a mano.',
  },
};

export const MODULOS: Modulo[] = [
  {
    insignia: { nino: 'Tus retos', docente: 'Prácticas' },
    titulo: { nino: 'Jugá y practicá', docente: 'Prácticas' },
    descripcion: {
      nino: 'Ejercicios y juegos del tema que acabás de ver en clase. Si fallás, podés reintentar.',
      docente: 'Ejercicios y juegos alineados al contenido de clase para reforzar cada tema.',
    },
  },
  {
    insignia: { nino: 'Tus notas', docente: 'Evaluaciones' },
    titulo: { nino: 'Mirá cómo te fue', docente: 'Evaluaciones' },
    descripcion: {
      nino: 'Tus resultados por tema, apenas tu profe los carga. Sin esperar la libreta.',
      docente: 'Resultados organizados por grupo y período, consultables por docentes y coordinación.',
    },
  },
  {
    insignia: { nino: 'Tu racha', docente: 'Asistencia' },
    titulo: { nino: 'Sumá días seguidos', docente: 'Asistencia' },
    descripcion: {
      nino: 'Cada día que entrás y practicás, tu racha crece. Faltar un día no la borra entera.',
      docente: 'Control diario por grupo y jornada, con el histórico disponible para dirección el mismo día.',
    },
  },
  {
    insignia: { nino: 'Tu familia', docente: 'Pagos y cobranza' },
    titulo: { nino: 'Tu familia al tanto', docente: 'Pagos y cobranza' },
    descripcion: {
      nino: 'En casa ven tu avance y lo del colegio desde el mismo lugar, sin papeles.',
      docente: 'Costos por nivel y seguimiento de cobros: quién pagó, quién debe y desde cuándo.',
    },
  },
];

export const ENCABEZADO_COMUNIDAD: EncabezadoSeccion = {
  antetitulo: { nino: 'Quiénes juegan', docente: 'Comunidad' },
  titulo: { nino: 'No jugás', docente: 'Cuatro roles,' },
  tituloAcento: { nino: 'solo', docente: 'un registro' },
  bajada: {
    nino: 'Cuatro personas miran la misma pantalla desde lugares distintos. Todas te acompañan.',
    docente: 'Cada rol entra a la vista que le corresponde, sobre el mismo dato.',
  },
};

export const ROLES_COMUNIDAD: RolComunidad[] = [
  {
    titulo: { nino: 'Vos', docente: 'Estudiantes' },
    descripcion: {
      nino: 'Practicás, ganás insignias y ves tus resultados después de cada tema.',
      docente: 'Practican, aprenden jugando y revisan sus resultados después de cada tema.',
    },
  },
  {
    titulo: { nino: 'Tus profes', docente: 'Docentes' },
    descripcion: {
      nino: 'Arman los retos y ven en qué tema necesitás una mano.',
      docente: 'Preparan evaluaciones y acompañan el progreso de sus grupos en el período.',
    },
    enlace: { texto: { nino: 'Ver la vista del profe', docente: 'Abrir panel docente' }, ruta: '/docente/estudiantes' },
  },
  {
    titulo: { nino: 'En casa', docente: 'Representantes' },
    descripcion: {
      nino: 'Tu familia ve tus notas y tu asistencia desde el teléfono.',
      docente: 'Consultan notas y asistencia de sus hijos en tiempo real, desde cualquier lugar.',
    },
  },
  {
    titulo: { nino: 'La dirección', docente: 'Dirección' },
    descripcion: {
      nino: 'Organizan el colegio entero para que todo funcione.',
      docente: 'Organiza pagos, asistencia y la actividad escolar desde un mismo registro.',
    },
  },
];

export const TESTIMONIO: Testimonio = {
  cita: { nino: 'Antes odiaba las divisiones.', docente: 'Pasamos de tres sistemas y muchas planillas' },
  citaAcento: { nino: 'Ahora voy por la racha 14.', docente: 'a un solo registro.' },
  autora: { nino: 'Valentina, 4.° A', docente: 'María Elena Rodríguez' },
  sello: { nino: 'Logro desbloqueado', docente: 'Caso de éxito' },
  cargo: {
    nino: 'Mundo 3 · Laboratorio · 23 insignias',
    docente: 'Directora General · U. E. San Marcos · 1.240 estudiantes',
  },
};

export const ENCABEZADO_IMPLEMENTACION: EncabezadoSeccion = {
  antetitulo: { nino: 'Cómo empieza', docente: 'Implementación' },
  titulo: { nino: 'Cuatro pasos y', docente: 'Cuatro pasos hasta el' },
  tituloAcento: { nino: 'a jugar', docente: 'período piloto' },
  bajada: {
    nino: 'Tu colegio hace casi todo. Vos entrás cuando ya está listo.',
    docente: 'Acompañamos la puesta en marcha completa, con métricas acordadas desde el primer día.',
  },
};

export const PASOS_IMPLEMENTACION: PasoImplementacion[] = [
  {
    numero: '01',
    titulo: { nino: 'El colegio se suma', docente: 'Levantamiento' },
    descripcion: {
      nino: 'La dirección decide qué mundos se abren primero según lo que estás viendo en clase.',
      docente: 'Revisamos con dirección qué procesos consumen más tiempo y con qué cifras se mide el resultado.',
    },
  },
  {
    numero: '02',
    titulo: { nino: 'Cargan tu grupo', docente: 'Migración' },
    descripcion: {
      nino: 'Tu nombre, tu grado y tu grupo ya quedan adentro. No tenés que registrarte.',
      docente: 'Cargamos niveles, grupos, costos y el histórico académico desde sus archivos actuales.',
    },
  },
  {
    numero: '03',
    titulo: { nino: 'Tus profes aprenden', docente: 'Formación' },
    descripcion: {
      nino: 'Les enseñamos a armar retos para tu grado antes de que vos entres.',
      docente: 'Sesiones por rol: administración, docentes y atención a representantes.',
    },
  },
  {
    numero: '04',
    titulo: { nino: '¡Arrancás!', docente: 'Período piloto' },
    descripcion: {
      nino: 'Entrás con tu usuario, elegís tu primer mundo y empezás a sumar.',
      docente: 'Un lapso completo acompañado, con revisión de las métricas acordadas al cierre.',
    },
  },
];

export const CTA_FINAL: ContenidoHero = {
  titulo: { nino: '¿Listo para', docente: 'Conozca Lúmina con' },
  tituloAcento: { nino: 'empezar?', docente: 'sus propios datos' },
  bajada: {
    nino: 'Pedile a tu profe el usuario de tu colegio. Si tu colegio todavía no lo tiene, mostrales esta página.',
    docente:
      'Dejamos una demostración armada con los niveles, grupos y costos de su institución, no con datos de ejemplo.',
  },
  cta: { nino: 'Quiero mi usuario', docente: 'Solicitar demostración' },
  ctaSecundario: { nino: 'Ver los mundos', docente: 'Ver el panel' },
  nota: {
    nino: 'Le llega el aviso a la dirección de tu colegio.',
    docente: 'Respondemos en un día hábil al correo institucional que indique.',
  },
};

export const ETIQUETA_CORREO: TextoPorModo = {
  nino: 'Correo de tu colegio',
  docente: 'Correo institucional',
};

export const CONFIRMACION: { titulo: TextoPorModo; detalle: TextoPorModo } = {
  titulo: { nino: '¡Listo, ya avisamos!', docente: 'Solicitud recibida' },
  detalle: {
    nino: 'La dirección de tu colegio recibe el mensaje hoy mismo.',
    docente: 'Le escribimos en un día hábil para coordinar la demostración.',
  },
};

/**
 * Las tres barras del tablero del hero. En modo Docente son cobertura por
 * nivel; en modo Niño, cuánto llevás de cada mundo abierto.
 */
export const BARRAS_HERO: { etiqueta: TextoPorModo; porcentaje: number }[] = [
  { etiqueta: { nino: 'Isla de los números', docente: 'Preescolar' }, porcentaje: 92 },
  { etiqueta: { nino: 'Bosque de palabras', docente: 'Primaria' }, porcentaje: 81 },
  { etiqueta: { nino: 'Laboratorio', docente: 'Bachillerato' }, porcentaje: 68 },
];

export const TITULO_TABLERO: TextoPorModo = {
  nino: 'Tu progreso de esta semana',
  docente: 'Cobertura por nivel',
};

export const TEXTOS: TextosInterfaz = {
  saltar: { nino: 'Saltar al contenido', docente: 'Saltar al contenido' },
  logoSubtitulo: { nino: 'Aprender jugando', docente: 'Aprender jugando' },
  logoInicio: { nino: 'Lúmina, ir al inicio', docente: 'Lúmina, ir al inicio' },
  etiquetaEstudiante: { nino: 'Estudiante', docente: 'Estudiante' },
  etiquetaDocente: { nino: 'Docente', docente: 'Docente' },
  interruptorEnNino: {
    nino: 'Modo estudiante activo. Cambiar a modo docente.',
    docente: 'Modo estudiante activo. Cambiar a modo docente.',
  },
  interruptorEnDocente: {
    nino: 'Modo docente activo. Cambiar a modo estudiante.',
    docente: 'Modo docente activo. Cambiar a modo estudiante.',
  },
  panelDocente: { nino: 'Panel docente', docente: 'Panel docente' },
  menu: { nino: 'Menú de navegación', docente: 'Menú de navegación' },
  navPrincipal: { nino: 'Principal', docente: 'Principal' },
  navMovil: { nino: 'Principal (móvil)', docente: 'Principal (móvil)' },
  hudXp: { nino: '1.250 XP', docente: '1.250 XP' },
  hudRacha: { nino: '7 días', docente: '7 días' },
  hudMonedas: { nino: '340', docente: '340' },
  heroAntetitulo: { nino: 'Aprender jugando', docente: 'Aprender jugando · Fase 1' },
  heroSaludo: { nino: '¡Hola de nuevo!', docente: 'Panel de dirección' },
  heroSaludoDetalle: {
    nino: 'Te faltan 3 retos para abrir el mundo 4.',
    docente: 'Vista consolidada del período en curso, con el mismo dato que ve cada docente en su grupo.',
  },
  heroDescripcion: { nino: 'Jugá, sumá XP y desbloqueá el próximo mundo.', docente: 'Actualizado hoy.' },
  heroRotulo: { nino: 'Misiones de esta semana', docente: 'Cobertura por nivel' },
  heroXp: { nino: 'Nivel 12 · 680 / 1.000 XP', docente: 'Nivel institucional 8' },
  placeholderCorreo: { nino: 'direccion@sucolegio.edu', docente: 'direccion@sucolegio.edu' },
  enviando: { nino: 'Enviando…', docente: 'Enviando…' },
  errorCorreo: { nino: 'Escribí un correo válido.', docente: 'Ingrese un correo válido.' },
  porCiento: { nino: 'por ciento', docente: 'por ciento' },
};
