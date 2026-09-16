import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EnlaceNavegacion } from '../../landing.models';
import { LuminaLogoComponent } from '../../../../shared/components/lumina-logo/lumina-logo.component';

@Component({
  selector: 'app-landing-footer',
  standalone: true,
  imports: [RouterLink, LuminaLogoComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <footer class="px-5 py-10 sm:px-10">
      <div class="mx-auto flex max-w-[1286px] flex-wrap items-center justify-between gap-6">
        <app-lumina-logo />
        <nav class="flex flex-wrap gap-x-6 gap-y-2" aria-label="Pie de página">
          @for (enlace of enlaces; track enlace.fragmento) {
            <a
              routerLink="/"
              [fragment]="enlace.fragmento"
              class="text-xs font-bold uppercase tracking-[0.08em] hover:text-lumina-violeta"
              >{{ enlace.etiqueta }}</a
            >
          }
          <a routerLink="/docente/estudiantes" class="text-xs font-bold uppercase tracking-[0.08em] hover:text-lumina-violeta"
            >Panel docente</a
          >
        </nav>
        <p class="text-xs font-semibold text-lumina-texto">© {{ anio }} Lúmina · Gestión escolar integral</p>
      </div>
    </footer>
  `,
})
export class LandingFooterComponent {
  @Input({ required: true }) enlaces: EnlaceNavegacion[] = [];
  protected readonly anio = new Date().getFullYear();
}
