import { HttpErrorResponse } from '@angular/common/http';

/** Traduce un error HTTP a un mensaje que el docente pueda entender y resolver. */
export function mensajeDeError(error: unknown, accion: string): string {
  if (error instanceof HttpErrorResponse) {
    const mensajeServidor = (error.error as { mensaje?: string } | null)?.mensaje;
    if (mensajeServidor) return mensajeServidor;
    if (error.status === 0) return `No se pudo ${accion}: revise su conexión e intente de nuevo.`;
    if (error.status === 404) return `No se pudo ${accion}: el estudiante ya no existe.`;
  }
  return `No se pudo ${accion}. Intente de nuevo en unos segundos.`;
}
