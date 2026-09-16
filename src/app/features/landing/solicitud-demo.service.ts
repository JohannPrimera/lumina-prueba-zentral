import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

/**
 * Envío del formulario "Solicitar demostración".
 * Igual que EstudiantesService: hoy simula la llamada; cuando exista el
 * endpoint, se reemplaza por `this.http.post(...)` sin tocar componentes.
 */
@Injectable({ providedIn: 'root' })
export class SolicitudDemoService {
  solicitar(correo: string): Observable<void> {
    console.info('[demo] solicitud simulada para', correo);
    return of(undefined).pipe(delay(700));
  }
}
