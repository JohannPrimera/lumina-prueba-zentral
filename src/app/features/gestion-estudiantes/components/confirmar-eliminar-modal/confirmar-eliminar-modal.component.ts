import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Estudiante } from '../../../../core/models/estudiante.model';

@Component({
  selector: 'app-confirmar-eliminar-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './confirmar-eliminar-modal.component.html',
})
export class ConfirmarEliminarModalComponent implements OnChanges {
  @Input() estudiante: Estudiante | null = null;
  @Input() eliminando = false;
  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  ngOnChanges(cambios: SimpleChanges): void {
    // Al abrir, el foco va a "Cancelar": la opción segura.
    if (cambios['estudiante'] && this.estudiante) {
      setTimeout(() => document.getElementById('btn-cancelar-eliminar')?.focus());
    }
  }

  @HostListener('document:keydown.escape')
  protected alPresionarEscape(): void {
    if (this.estudiante && !this.eliminando) this.cancelar.emit();
  }
}
