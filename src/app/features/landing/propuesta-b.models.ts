/**
 * Tipos de la Propuesta B de landing (modo Niño / modo Docente).
 *
 * Regla del archivo: ningún componente de sección conoce strings sueltos.
 * Todo texto que cambia entre modos viaja dentro de un `TextoPorModo`, así
 * el mismo árbol de componentes sirve a los dos públicos sin duplicar HTML.
 */

/** Los dos registros de la propuesta. `nino` es el que arranca. */
export type ModoPropuesta = 'nino' | 'docente';

/** Un texto con su variante para cada modo. */
export interface TextoPorModo {
  /** Segunda persona, frases cortas, promesa concreta. */
  nino: string;
  /** Registro institucional, mismo hecho, sin gamificar. */
  docente: string;
}

export interface EnlaceNavegacion {
  etiqueta: TextoPorModo;
  /** id de la sección de destino (se usa como fragmento). */
  fragmento: string;
}

/** Cabecera de una sección: antetítulo, título y bajada, por modo. */
export interface EncabezadoSeccion {
  antetitulo: TextoPorModo;
  titulo: TextoPorModo;
  /** Parte del título que va en serif itálica (acento de marca). */
  tituloAcento: TextoPorModo;
  bajada: TextoPorModo;
}

/** Contenido del hero. */
export interface ContenidoHero {
  titulo: TextoPorModo;
  tituloAcento: TextoPorModo;
  bajada: TextoPorModo;
  cta: TextoPorModo;
  ctaSecundario: TextoPorModo;
  nota: TextoPorModo;
}

/**
 * Las tres cifras que el hero muestra en su tablero.
 * En modo Niño son marcadores de juego; en modo Docente, indicadores de gestión.
 */
export interface IndicadorHero {
  valor: TextoPorModo;
  etiqueta: TextoPorModo;
  /** Token de acento: 1 = principal, 2 = secundario, 3 = éxito. */
  acento: 1 | 2 | 3;
}

/** Un nodo del camino de mundos (modo Niño) / una fila de avance (modo Docente). */
export interface Mundo {
  numero: string;
  nombre: TextoPorModo;
  materia: TextoPorModo;
  /** Avance del grupo en ese mundo, 0–100. */
  porcentaje: number;
  estado: TextoPorModo;
  /** Ya completado: cambia el tratamiento del nodo y de la fila. */
  completado: boolean;
}

export interface Modulo {
  titulo: TextoPorModo;
  descripcion: TextoPorModo;
  /** Etiqueta corta del módulo: insignia en modo Niño, rótulo en modo Docente. */
  insignia: TextoPorModo;
}

export interface RolComunidad {
  titulo: TextoPorModo;
  descripcion: TextoPorModo;
  /** Si el rol tiene un panel navegable dentro del prototipo, a dónde lleva. */
  enlace?: { texto: TextoPorModo; ruta: string };
}

export interface Testimonio {
  cita: TextoPorModo;
  citaAcento: TextoPorModo;
  autora: TextoPorModo;
  cargo: TextoPorModo;
  /** Sello sobre la cita: «logro desbloqueado» en modo Niño, «caso de éxito» en Docente. */
  sello: TextoPorModo;
}

export interface PasoImplementacion {
  numero: string;
  titulo: TextoPorModo;
  descripcion: TextoPorModo;
}

export type EstadoSolicitudDemo = 'inicial' | 'enviando' | 'enviada';

/** Rótulos, mensajes y nombres accesibles de la interfaz (nada de texto suelto en plantillas). */
export interface TextosInterfaz {
  saltar: TextoPorModo;
  logoSubtitulo: TextoPorModo;
  logoInicio: TextoPorModo;
  etiquetaEstudiante: TextoPorModo;
  etiquetaDocente: TextoPorModo;
  /** Nombre accesible del conmutador estando en cada modo: dice el estado Y la acción. */
  interruptorEnNino: TextoPorModo;
  interruptorEnDocente: TextoPorModo;
  panelDocente: TextoPorModo;
  menu: TextoPorModo;
  navPrincipal: TextoPorModo;
  navMovil: TextoPorModo;
  hudXp: TextoPorModo;
  hudRacha: TextoPorModo;
  hudMonedas: TextoPorModo;
  heroAntetitulo: TextoPorModo;
  heroSaludo: TextoPorModo;
  heroSaludoDetalle: TextoPorModo;
  heroRotulo: TextoPorModo;
  heroDescripcion: TextoPorModo;
  heroXp: TextoPorModo;
  placeholderCorreo: TextoPorModo;
  enviando: TextoPorModo;
  errorCorreo: TextoPorModo;
  porCiento: TextoPorModo;
}
