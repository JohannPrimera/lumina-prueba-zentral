import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LuminaLogoComponent } from '../../../shared/components/lumina-logo/lumina-logo.component';
import { EnlaceNavegacion, ModoPropuesta, TextosInterfaz } from '../propuesta-b.models';

/** Pie. Repite la navegación principal. */
@Component({
  selector: 'app-propuesta-footer',
  standalone: true,
  imports: [RouterLink, LuminaLogoComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <footer class="pb-morf border-t-[length:var(--borde)] border-[color:var(--linea)] px-5 py-12 sm:px-10">
      <div class="mx-auto flex max-w-[1286px] flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <app-lumina-logo [subtitulo]="textos.logoSubtitulo[modo]" />
          <p class="pb-morf mt-4 max-w-xs text-sm text-[color:var(--sutil)]">
            {{
              modo === 'nino'
                ? 'Tu colegio, tus retos y tu avance en un mismo lugar.'
                : 'Plataforma de gestión y aprendizaje para instituciones de preescolar a bachillerato.'
            }}
          </p>
        </div>

        <nav class="flex flex-wrap gap-x-8 gap-y-3" aria-label="Pie de página">
          @for (enlace of enlaces; track enlace.fragmento) {
            <a
              routerLink="/"
              [fragment]="enlace.fragmento"
              class="pb-foco pb-morf text-[length:var(--micro)] font-bold uppercase tracking-[0.1em] text-[color:var(--tinta)] hover:text-[color:var(--acento-texto)]"
            >
              {{ enlace.etiqueta[modo] }}
            </a>
          }
        </nav>
      </div>

      <p class="pb-morf mx-auto mt-10 max-w-[1286px] text-[length:var(--micro)] uppercase tracking-[0.1em] text-[color:var(--sutil)]">
        Lúmina · {{ modo === 'nino' ? 'Modo estudiante' : 'Modo docente' }}
      </p>
    </footer>
  `,
})
export class PropuestaFooterComponent {
  @Input({ required: true }) modo: ModoPropuesta = 'nino';
  @Input({ required: true }) enlaces: EnlaceNavegacion[] = [];
  @Input({ required: true }) textos!: TextosInterfaz;
}
