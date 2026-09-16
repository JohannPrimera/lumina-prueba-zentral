import { Component, Input, computed, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { PestanaPanelPreview, TonoIndicador } from '../../landing.models';

/** Vista previa del "Panel de dirección" con pestañas funcionales (datos de ejemplo). */
@Component({
  selector: 'app-panel-preview',
  standalone: true,
  imports: [NgClass],
  templateUrl: './panel-preview.component.html',
})
export class PanelPreviewComponent {
  @Input({ required: true }) set pestanas(valor: PestanaPanelPreview[]) {
    this.lista.set(valor);
    if (!valor.some((p) => p.id === this.idActiva())) {
      this.idActiva.set(valor[0]?.id ?? '');
    }
  }

  protected readonly lista = signal<PestanaPanelPreview[]>([]);
  protected readonly idActiva = signal('');
  protected readonly pestanaActiva = computed(() => this.lista().find((p) => p.id === this.idActiva()) ?? null);

  protected seleccionar(id: string): void {
    this.idActiva.set(id);
  }

  protected claseIndicador(tono: TonoIndicador): string {
    const clases: Record<TonoIndicador, string> = {
      lima: 'bg-lumina-lima text-lumina-tinta',
      fondo: 'bg-lumina-fondo text-lumina-tinta',
      violeta: 'bg-lumina-violeta text-white',
    };
    return clases[tono];
  }

  protected claseEstado(tono: TonoIndicador): string {
    const clases: Record<TonoIndicador, string> = {
      lima: 'bg-lumina-lima text-lumina-tinta',
      fondo: 'bg-white text-lumina-tinta',
      violeta: 'bg-lumina-violeta text-white',
    };
    return clases[tono];
  }
}
