import { Injectable, signal } from '@angular/core';

export type TipoNotificacion = 'exito' | 'error';

export interface Notificacion {
  id: number;
  tipo: TipoNotificacion;
  mensaje: string;
}

/** Avisos breves ("Estudiante creado", "No se pudo eliminar…") que se cierran solos. */
@Injectable({ providedIn: 'root' })
export class NotificacionesService {
  private siguienteId = 1;
  private readonly DURACION_MS = 4000;
  readonly notificaciones = signal<Notificacion[]>([]);

  exito(mensaje: string): void {
    this.mostrar('exito', mensaje);
  }

  error(mensaje: string): void {
    this.mostrar('error', mensaje);
  }

  cerrar(id: number): void {
    this.notificaciones.update((lista) => lista.filter((n) => n.id !== id));
  }

  private mostrar(tipo: TipoNotificacion, mensaje: string): void {
    const id = this.siguienteId++;
    this.notificaciones.update((lista) => [...lista, { id, tipo, mensaje }]);
    setTimeout(() => this.cerrar(id), this.DURACION_MS);
  }
}
