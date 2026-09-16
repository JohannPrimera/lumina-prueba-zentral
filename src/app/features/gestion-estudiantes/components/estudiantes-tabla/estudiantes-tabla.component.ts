import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Estudiante, NivelEscolar } from '../../../../core/models/estudiante.model';
import { EdadPipe } from '../../../../shared/pipes/edad.pipe';

@Component({
  selector: 'app-estudiantes-tabla',
  standalone: true,
  imports: [EdadPipe],
  templateUrl: './estudiantes-tabla.component.html',
})
export class EstudiantesTablaComponent {
  @Input({ required: true }) estudiantes: Estudiante[] = [];
  @Input() hayFiltros = false;
  @Output() editar = new EventEmitter<Estudiante>();
  @Output() eliminar = new EventEmitter<Estudiante>();
  @Output() limpiarFiltros = new EventEmitter<void>();

  protected iniciales(nombre: string): string {
    return nombre
      .split(/\s+/)
      .slice(0, 2)
      .map((parte) => parte.charAt(0))
      .join('')
      .toUpperCase();
  }

  protected claseAvatar(nivel: NivelEscolar): string {
    const clases: Record<NivelEscolar, string> = {
      Preescolar: 'bg-lumina-lima text-lumina-tinta',
      Primaria: 'bg-lumina-violeta text-white',
      Bachillerato: 'bg-lumina-noche text-white',
    };
    return clases[nivel];
  }
}
