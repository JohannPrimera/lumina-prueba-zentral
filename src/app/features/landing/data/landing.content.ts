import {
  EnlaceNavegacion,
  Modulo,
  PasoImplementacion,
  PestanaPanelPreview,
  RolComunidad,
  Testimonio,
} from '../landing.models';

/**
 * Textos de la landing (Fase 1 · v4). Separados de las plantillas para que
 * cambiar un copy no obligue a tocar HTML, y para que mañana puedan venir de
 * un CMS o de la API sin reescribir los componentes.
 */

export const ENLACES_NAVEGACION: EnlaceNavegacion[] = [
  { etiqueta: 'Plataforma', fragmento: 'modulos' },
  { etiqueta: 'Comunidad', fragmento: 'comunidad' },
  { etiqueta: 'Implementación', fragmento: 'implementacion' },
];

export const PILARES: string[] = [
  'Un solo sistema de preescolar a bachillerato.',
  'Los datos académicos y financieros quedan bajo resguardo del colegio.',
  'Migración de sus datos y formación docente incluidas.',
];

export const MODULOS: Modulo[] = [
  {
    titulo: 'Pagos y cobranza',
    descripcion: 'Costos por nivel y seguimiento de cobros: quién pagó, quién debe y desde cuándo, sin consolidar reportes a mano.',
  },
  {
    titulo: 'Asistencia',
    descripcion: 'Control diario por grupo y jornada, con el histórico disponible para dirección el mismo día.',
  },
  {
    titulo: 'Evaluaciones',
    descripcion: 'Resultados organizados por grupo y período, consultables por docentes y coordinación.',
  },
  {
    titulo: 'Prácticas',
    descripcion: 'Ejercicios y juegos alineados al contenido de clase para reforzar cada tema.',
  },
];

export const PESTANAS_PANEL_PREVIEW: PestanaPanelPreview[] = [
  {
    id: 'cobros',
    etiqueta: 'Cobros',
    indicadores: [
      { valor: '312', etiqueta: 'Al día', tono: 'lima' },
      { valor: '48', etiqueta: 'Por vencer', tono: 'fondo' },
      { valor: '21', etiqueta: 'Vencido', tono: 'violeta' },
    ],
    tituloBarras: 'Cobrado por nivel',
    barras: [
      { etiqueta: 'Preescolar', porcentaje: 92 },
      { etiqueta: 'Primaria', porcentaje: 81 },
      { etiqueta: 'Bachillerato', porcentaje: 74 },
    ],
    filas: [
      { texto: '4.° A · Mensualidad marzo', estado: 'Al día', tono: 'lima' },
      { texto: '2.° B · Mensualidad marzo', estado: 'Por vencer', tono: 'fondo' },
      { texto: '5.° A · Mensualidad febrero', estado: 'Vencido', tono: 'violeta' },
    ],
  },
  {
    id: 'asistencia',
    etiqueta: 'Asistencia',
    indicadores: [
      { valor: '94%', etiqueta: 'Presentes hoy', tono: 'lima' },
      { valor: '26', etiqueta: 'Justificadas', tono: 'fondo' },
      { valor: '9', etiqueta: 'Sin justificar', tono: 'violeta' },
    ],
    tituloBarras: 'Asistencia por nivel',
    barras: [
      { etiqueta: 'Preescolar', porcentaje: 96 },
      { etiqueta: 'Primaria', porcentaje: 93 },
      { etiqueta: 'Bachillerato', porcentaje: 88 },
    ],
    filas: [
      { texto: '1.° A · Jornada de mañana', estado: 'Completa', tono: 'lima' },
      { texto: '3.° B · Jornada de mañana', estado: 'Pendiente', tono: 'fondo' },
      { texto: '4.° B · Jornada de tarde', estado: 'Con faltas', tono: 'violeta' },
    ],
  },
];

export const ROLES_COMUNIDAD: RolComunidad[] = [
  {
    titulo: 'Dirección',
    descripcion: 'Organiza pagos, asistencia y la actividad escolar desde un mismo registro.',
    tono: 'blanco',
  },
  {
    titulo: 'Docentes',
    descripcion: 'Preparan evaluaciones y acompañan el progreso de sus grupos en el período.',
    tono: 'lima',
    enlace: { texto: 'Abrir panel docente', ruta: '/docente/estudiantes' },
  },
  {
    titulo: 'Representantes',
    descripcion: 'Consultan notas y asistencia de sus hijos en tiempo real, desde cualquier lugar.',
    tono: 'fondo',
  },
  {
    titulo: 'Estudiantes',
    descripcion: 'Practican, aprenden jugando y revisan sus resultados después de cada tema.',
    tono: 'noche',
  },
];

export const TESTIMONIO: Testimonio = {
  citaInicio: 'Pasamos de tres sistemas y muchas planillas',
  citaDestacada: 'a un solo registro.',
  autora: 'María Elena Rodríguez',
  cargo: 'Directora General · U. E. San Marcos · 1.240 estudiantes',
};

export const PASOS_IMPLEMENTACION: PasoImplementacion[] = [
  {
    numero: '01',
    titulo: 'Levantamiento',
    descripcion: 'Revisamos con dirección qué procesos consumen más tiempo y con qué cifras se mide el resultado.',
  },
  {
    numero: '02',
    titulo: 'Migración',
    descripcion: 'Cargamos niveles, grupos, costos y el histórico académico desde sus archivos actuales.',
  },
  {
    numero: '03',
    titulo: 'Formación',
    descripcion: 'Sesiones por rol: administración, docentes y atención a representantes.',
  },
  {
    numero: '04',
    titulo: 'Período piloto',
    descripcion: 'Un lapso completo acompañado, con revisión de las métricas acordadas al cierre.',
  },
];
