import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModoPropuesta, TextoPorModo } from '../propuesta-b.models';
import { RevelarDirective } from '../revelar.directive';

/**
 * Franja oscura con las tres promesas. Es la única banda a sangre completa de
 * la propuesta: corta el ritmo de tarjetas y separa el hero del recorrido.
 */
@Component({
  selector: 'app-propuesta-pilares',
  standalone: true,
  imports: [RevelarDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <section
      class="pb-morf border-y-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--oscuro)] px-5 py-12 text-[color:var(--oscuro-tinta)] sm:px-10"
      aria-label="Por qué Lúmina"
    >
      <ul class="mx-auto grid max-w-[1286px] gap-8 md:grid-cols-3 md:gap-0">
        @for (pilar of pilares; track pilar.docente; let i = $index) {
          <li
            [appRevelar]="i"
            class="pb-morf flex max-w-md items-start gap-3 text-[length:var(--cuerpo)] font-semibold leading-snug md:border-l md:border-white/20 md:px-8 md:first:border-l-0 md:first:pl-0"
          >
            <span
              class="pb-morf mt-1 h-3 w-3 shrink-0 rounded-full bg-[var(--premio)]"
              aria-hidden="true"
            ></span>
            {{ pilar[modo] }}
          </li>
        }
      </ul>
    </section>
  `,
})
export class PropuestaPilaresComponent {
  @Input({ required: true }) modo: ModoPropuesta = 'nino';
  @Input({ required: true }) pilares: TextoPorModo[] = [];
}
