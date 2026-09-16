import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, catchError, map, of, switchMap, timer } from 'rxjs';
import { Estudiante, NivelEscolar } from '../../../core/models/estudiante.model';
import { calcularEdad, hoyIso } from '../../../core/utils/fechas';
import { RANGO_EDAD_POR_NIVEL } from '../estudiantes.constants';

/**
 * Validadores propios del formulario de estudiantes. Son funciones puras
 * (salvo la asíncrona), separadas del componente para poder testearlas solas.
 */

export const PATRON_SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' ]+$/;
export const PATRON_DOCUMENTO = /^\d{6,10}$/;
export const PATRON_TELEFONO = /^\+?[\d\s-]{7,15}$/;

/** `required` acepta "   "; este validador no. */
export const sinEspaciosVacios: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const valor = control.value;
  return typeof valor === 'string' && valor.length > 0 && valor.trim().length === 0 ? { soloEspacios: true } : null;
};

/** Pide al menos dos palabras: nombre y apellido. */
export const nombreYApellido: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const valor = typeof control.value === 'string' ? control.value.trim() : '';
  if (!valor) return null;
  return valor.split(/\s+/).length >= 2 ? null : { nombreYApellido: true };
};

export const fechaNoFutura: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const valor = control.value as string;
  if (!valor) return null;
  return valor > hoyIso() ? { fechaFutura: true } : null;
};

/**
 * Validación CRUZADA (a nivel de FormGroup): la edad tiene que corresponder
 * con el nivel elegido. Se re-evalúa sola cuando cambia la fecha o el nivel.
 */
export const edadAcordeAlNivel: ValidatorFn = (grupo: AbstractControl): ValidationErrors | null => {
  const nivel = grupo.get('nivel')?.value as NivelEscolar | undefined;
  const edad = calcularEdad(grupo.get('fechaNacimiento')?.value);
  if (!nivel || edad === null || edad < 0) return null;
  const { min, max } = RANGO_EDAD_POR_NIVEL[nivel];
  return edad < min || edad > max ? { edadFueraDeRango: { edad, min, max, nivel } } : null;
};

/**
 * Validación ASÍNCRONA: consulta al backend si el correo ya lo usa otro
 * estudiante. Espera 400 ms desde la última tecla antes de consultar
 * (si el usuario sigue escribiendo, la consulta anterior se cancela).
 */
export function correoDisponible(
  buscarPorCorreo: (correo: string) => Observable<Estudiante[]>,
  idEnEdicion: () => number | null,
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const correo = typeof control.value === 'string' ? control.value.trim().toLowerCase() : '';
    if (!correo) return of(null);
    return timer(400).pipe(
      switchMap(() => buscarPorCorreo(correo)),
      map((coincidencias) => (coincidencias.some((e) => e.id !== idEnEdicion()) ? { correoEnUso: true } : null)),
      // Si la consulta falla, no bloqueamos el formulario: el backend vuelve a validar al guardar.
      catchError(() => of(null)),
    );
  };
}
