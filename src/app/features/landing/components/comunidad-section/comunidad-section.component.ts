import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RolComunidad, TonoTarjeta } from '../../landing.models';

@Component({
  selector: 'app-comunidad-section',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './comunidad-section.component.html',
})
export class ComunidadSectionComponent {
  @Input({ required: true }) roles: RolComunidad[] = [];

  protected claseTarjeta(tono: TonoTarjeta): string {
    const clases: Record<TonoTarjeta, string> = {
      blanco: 'bg-white text-lumina-tinta',
      lima: 'bg-lumina-lima text-lumina-tinta',
      fondo: 'bg-lumina-fondo text-lumina-tinta',
      noche: 'bg-lumina-noche text-white',
    };
    return clases[tono];
  }
}
