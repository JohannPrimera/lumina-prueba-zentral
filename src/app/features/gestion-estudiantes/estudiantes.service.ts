import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../core/config/api-url.token';
import { Estudiante, EstudianteFormValue } from '../../core/models/estudiante.model';

/**
 * Único punto de acceso a los datos de estudiantes.
 *
 * Ya usa HttpClient contra `${API_URL}/estudiantes`. Hoy esas peticiones las
 * responde el backend simulado (estudiantes-fake-backend.interceptor.ts);
 * cuando Zentral entregue los endpoints, este archivo no cambia: solo se
 * quita el interceptor y se configura la URL real. Si el contrato difiere
 * (otros nombres de campos), el mapeo se hace acá con `map()`.
 */
@Injectable({ providedIn: 'root' })
export class EstudiantesService {
  private readonly http = inject(HttpClient);
  private readonly url = `${inject(API_URL)}/estudiantes`;

  listar(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.url);
  }

  /** Usado por la validación asíncrona de correo único. */
  buscarPorCorreo(correo: string): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.url, { params: new HttpParams().set('correo', correo) });
  }

  crear(datos: EstudianteFormValue): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.url, datos);
  }

  actualizar(id: number, datos: EstudianteFormValue): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.url}/${id}`, datos);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
