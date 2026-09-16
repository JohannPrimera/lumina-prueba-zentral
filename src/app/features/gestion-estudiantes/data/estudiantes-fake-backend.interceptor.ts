import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, mergeMap, of, throwError, timer } from 'rxjs';
import { Estudiante, EstudianteFormValue } from '../../../core/models/estudiante.model';
import { ESTUDIANTES_FAKE } from './estudiantes-fake-data';

/**
 * BACKEND SIMULADO (etapa de data fake).
 *
 * La vista ya hace peticiones HTTP reales con HttpClient. Este interceptor las
 * intercepta antes de salir a la red y responde como lo haría el backend:
 *   GET    /api/estudiantes            → 200 lista   (acepta ?correo=)
 *   POST   /api/estudiantes            → 201 creado  | 409 correo repetido
 *   PUT    /api/estudiantes/:id        → 200 editado | 404 | 409
 *   DELETE /api/estudiantes/:id        → 204         | 404
 *
 * Integración con Zentral: se quita este interceptor de app.config.ts y se
 * configura API_URL. El service y los componentes no cambian.
 */

const LATENCIA_MS = 450;
const RUTA = /\/estudiantes(?:\/(\d+))?$/;

let baseDeDatos: Estudiante[] = structuredClone(ESTUDIANTES_FAKE);
let siguienteId = Math.max(...baseDeDatos.map((e) => e.id)) + 1;

export const estudiantesFakeBackendInterceptor: HttpInterceptorFn = (req, next) => {
  const coincidencia = RUTA.exec(req.url.split('?')[0]);
  if (!coincidencia) return next(req);

  const id = coincidencia[1] ? Number(coincidencia[1]) : null;

  switch (req.method) {
    case 'GET':
      return responder(200, listar(req));
    case 'POST':
      return crear(req.body as EstudianteFormValue);
    case 'PUT':
      return id === null ? fallar(405, 'Método no permitido.') : actualizar(id, req.body as EstudianteFormValue);
    case 'DELETE':
      return id === null ? fallar(405, 'Método no permitido.') : eliminar(id);
    default:
      return next(req);
  }
};

function listar(req: HttpRequest<unknown>): Estudiante[] {
  const correo = req.params.get('correo')?.trim().toLowerCase();
  const lista = correo ? baseDeDatos.filter((e) => e.correo.toLowerCase() === correo) : baseDeDatos;
  return structuredClone(lista);
}

function crear(datos: EstudianteFormValue): Observable<HttpResponse<Estudiante>> {
  if (correoEnUso(datos.correo)) return fallar(409, 'Ese correo ya está registrado para otro estudiante.');
  const nuevo: Estudiante = { id: siguienteId++, ...datos };
  baseDeDatos = [...baseDeDatos, nuevo];
  return responder(201, structuredClone(nuevo));
}

function actualizar(id: number, datos: EstudianteFormValue): Observable<HttpResponse<Estudiante>> {
  if (!baseDeDatos.some((e) => e.id === id)) return fallar(404, 'El estudiante ya no existe.');
  if (correoEnUso(datos.correo, id)) return fallar(409, 'Ese correo ya está registrado para otro estudiante.');
  const actualizado: Estudiante = { id, ...datos };
  baseDeDatos = baseDeDatos.map((e) => (e.id === id ? actualizado : e));
  return responder(200, structuredClone(actualizado));
}

function eliminar(id: number): Observable<HttpResponse<null>> {
  if (!baseDeDatos.some((e) => e.id === id)) return fallar(404, 'El estudiante ya no existe.');
  baseDeDatos = baseDeDatos.filter((e) => e.id !== id);
  return responder(204, null);
}

function correoEnUso(correo: string, excluirId?: number): boolean {
  const buscado = correo.trim().toLowerCase();
  return baseDeDatos.some((e) => e.correo.toLowerCase() === buscado && e.id !== excluirId);
}

function responder<T>(status: number, body: T): Observable<HttpResponse<T>> {
  return timer(LATENCIA_MS).pipe(mergeMap(() => of(new HttpResponse<T>({ status, body }))));
}

function fallar(status: number, mensaje: string): Observable<never> {
  return timer(LATENCIA_MS).pipe(
    mergeMap(() => throwError(() => new HttpErrorResponse({ status, error: { mensaje }, statusText: mensaje }))),
  );
}
