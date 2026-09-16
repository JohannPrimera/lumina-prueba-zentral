export type NivelEscolar = 'Preescolar' | 'Primaria' | 'Bachillerato';
export type EstadoEstudiante = 'Activo' | 'Inactivo';

export interface Estudiante {
  id: number;
  nombreCompleto: string;
  /** Documento de identidad, solo dígitos. */
  documento: string;
  /** Fecha ISO `yyyy-mm-dd`, el mismo formato que devuelve un <input type="date">. */
  fechaNacimiento: string;
  nivel: NivelEscolar;
  /** Grado y sección, uno de GRADOS_POR_NIVEL[nivel]. Identifica el aula. */
  grado: string;
  correo: string;
  representante: string;
  telefonoRepresentante: string;
  estado: EstadoEstudiante;
}

/** Datos que envía el formulario: todo menos el id, que lo asigna el backend. */
export type EstudianteFormValue = Omit<Estudiante, 'id'>;
