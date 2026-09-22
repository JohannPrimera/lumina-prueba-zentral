import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModoPropuesta, Testimonio } from '../propuesta-b.models';
import { RevelarDirective } from '../revelar.directive';

/**
 * La prueba social cambia de testigo con el modo: a un chico le habla otro
 * chico; a una directora, otra directora. Es el mismo bloque, pero citar a la
 * persona equivocada es la forma más rápida de perder al visitante.
 */
@Component({
  selector: 'app-propuesta-testimonio',
  standalone: true,
  imports: [RevelarDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <section class="px-5 py-[var(--pad-y)] sm:px-10" aria-label="Testimonio">
      <figure
        class="pb-morf pb-burbuja mx-auto mb-8 max-w-[1000px] rounded-[var(--radio)] border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--sup)] px-7 py-12 text-center shadow-[var(--sombra)] sm:px-12 sm:py-16"
        [appRevelar]="0"
      >
        <p
          class="pb-inclinar pb-morf mb-6 inline-block rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--premio)] px-4 py-1.5 text-[length:var(--micro)] font-extrabold uppercase tracking-[0.12em] text-[color:var(--tinta)]"
        >
          {{ testimonio.sello[modo] }}
        </p>
        <blockquote
          class="pb-morf font-display text-[length:var(--h2)] uppercase text-[color:var(--tinta)]"
          [style.line-height]="'var(--alto-titulo)'"
        >
          {{ testimonio.cita[modo] }}
          <em class="pb-morf block font-serif normal-case italic text-[color:var(--acento-texto)]">
            {{ testimonio.citaAcento[modo] }}
          </em>
        </blockquote>
        <figcaption class="pb-morf mt-8 text-[color:var(--sutil)]">
          <span class="block text-[length:var(--cuerpo)] font-bold text-[color:var(--tinta)]">
            {{ testimonio.autora[modo] }}
          </span>
          <span class="mt-1 block text-sm">{{ testimonio.cargo[modo] }}</span>
        </figcaption>
      </figure>
    </section>
  `,
})
export class PropuestaTestimonioComponent {
  @Input({ required: true }) modo: ModoPropuesta = 'nino';
  @Input({ required: true }) testimonio!: Testimonio;
}
