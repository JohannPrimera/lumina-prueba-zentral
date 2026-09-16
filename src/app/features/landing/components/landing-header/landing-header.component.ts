import { Component, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EnlaceNavegacion } from '../../landing.models';
import { LuminaLogoComponent } from '../../../../shared/components/lumina-logo/lumina-logo.component';

@Component({
  selector: 'app-landing-header',
  standalone: true,
  imports: [RouterLink, LuminaLogoComponent],
  templateUrl: './landing-header.component.html',
})
export class LandingHeaderComponent {
  @Input({ required: true }) enlaces: EnlaceNavegacion[] = [];

  /** Menú desplegable en móvil. */
  protected readonly menuAbierto = signal(false);

  protected alternarMenu(): void {
    this.menuAbierto.update((abierto) => !abierto);
  }

  protected cerrarMenu(): void {
    this.menuAbierto.set(false);
  }
}
