import { NivelEscolar } from '../../core/models/estudiante.model';

export const NIVELES: NivelEscolar[] = ['Preescolar', 'Primaria', 'Bachillerato'];

/** Aulas posibles por nivel. El formulario solo ofrece los grados del nivel elegido. */
export const GRADOS_POR_NIVEL: Record<NivelEscolar, string[]> = {
  Preescolar: ['1.er nivel', '2.° nivel', '3.er nivel'],
  Primaria: ['1.° A', '1.° B', '2.° A', '2.° B', '3.° A', '3.° B', '4.° A', '4.° B', '5.° A', '5.° B', '6.° A', '6.° B'],
  Bachillerato: ['1.° A', '1.° B', '2.° A', '2.° B', '3.° A', '3.° B', '4.° A', '4.° B', '5.° A', '5.° B'],
};

/** Edad válida (en años cumplidos) para cada nivel. Usada por la validación cruzada del formulario. */
export const RANGO_EDAD_POR_NIVEL: Record<NivelEscolar, { min: number; max: number }> = {
  Preescolar: { min: 3, max: 6 },
  Primaria: { min: 5, max: 13 },
  Bachillerato: { min: 11, max: 19 },
};
