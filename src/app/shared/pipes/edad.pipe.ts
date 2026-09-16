import { Pipe, PipeTransform } from '@angular/core';
import { calcularEdad } from '../../core/utils/fechas';

/** `{{ estudiante.fechaNacimiento | edad }}` → 9 */
@Pipe({ name: 'edad', standalone: true })
export class EdadPipe implements PipeTransform {
  transform(fechaIso: string | null | undefined): number | null {
    return calcularEdad(fechaIso);
  }
}
