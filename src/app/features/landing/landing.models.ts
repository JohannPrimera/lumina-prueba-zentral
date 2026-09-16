/** Tipos del contenido de la landing. Los componentes de sección solo conocen estas formas. */

export interface EnlaceNavegacion {
  etiqueta: string;
  /** id de la sección de destino (se usa como fragmento: /#modulos). */
  fragmento: string;
}

export interface Modulo {
  titulo: string;
  descripcion: string;
}

export type TonoTarjeta = 'blanco' | 'lima' | 'fondo' | 'noche';

export interface RolComunidad {
  titulo: string;
  descripcion: string;
  tono: TonoTarjeta;
  /** Si el rol tiene un panel navegable dentro del prototipo, a dónde lleva. */
  enlace?: { texto: string; ruta: string };
}

export interface Testimonio {
  citaInicio: string;
  citaDestacada: string;
  autora: string;
  cargo: string;
}

export interface PasoImplementacion {
  numero: string;
  titulo: string;
  descripcion: string;
}

export type TonoIndicador = 'lima' | 'fondo' | 'violeta';

/** Una pestaña de la vista previa del "Panel de dirección". */
export interface PestanaPanelPreview {
  id: string;
  etiqueta: string;
  indicadores: { valor: string; etiqueta: string; tono: TonoIndicador }[];
  tituloBarras: string;
  barras: { etiqueta: string; porcentaje: number }[];
  filas: { texto: string; estado: string; tono: TonoIndicador }[];
}

export type EstadoSolicitudDemo = 'inicial' | 'enviando' | 'enviada';
