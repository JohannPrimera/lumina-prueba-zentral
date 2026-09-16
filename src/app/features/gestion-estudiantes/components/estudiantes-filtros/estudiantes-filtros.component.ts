import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { NivelEscolar } from '../../../../core/models/estudiante.model';

export interface OpcionFiltro<T extends string> {
  valor: T;
  etiqueta: string;
  cantidad: number;
}

/** Buscador + filtros rápidos por nivel y por grado (aula). Solo presentación. */
@Component({
  selector: 'app-estudiantes-filtros',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './estudiantes-filtros.component.html',
})
export class EstudiantesFiltrosComponent {
  @Input() texto = '';
  @Input({ required: true }) niveles: OpcionFiltro<NivelEscolar | 'Todos'>[] = [];
  @Input() nivelSeleccionado: NivelEscolar | 'Todos' = 'Todos';
  @Input() grados: OpcionFiltro<string>[] = [];
  @Input() gradoSeleccionado: string | null = null;
  @Input() hayFiltros = false;

  @Output() textoCambio = new EventEmitter<string>();
  @Output() nivelCambio = new EventEmitter<NivelEscolar | 'Todos'>();
  @Output() gradoCambio = new EventEmitter<string | null>();
  @Output() limpiar = new EventEmitter<void>();
}
