import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EncabezadoSeccion, ModoPropuesta, PasoImplementacion } from '../propuesta-b.models';
import { PropuestaEncabezadoComponent } from './propuesta-encabezado.component';
import { RevelarDirective } from '../revelar.directive';

/**
 * Los cuatro pasos. Lista ordenada de verdad (`ol`): el orden es el contenido,
 * no una decisión de maquetado.
 */
@Component({
  selector: 'app-propuesta-implementacion',
  standalone: true,
  imports: [PropuestaEncabezadoComponent, RevelarDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <section id="implementacion" class="pb-morf scroll-mt-24 bg-[var(--campo-alt)] px-5 py-[var(--pad-y)] sm:px-10">
      <div class="mx-auto max-w-[1286px]">
        <app-propuesta-encabezado [modo]="modo" [encabezado]="encabezado" />

        <ol class="mt-12 grid gap-[var(--gap)] sm:grid-cols-2 lg:grid-cols-4">
          @for (paso of pasos; track paso.numero; let i = $index) {
            <li
              [appRevelar]="i"
              class="pb-morf pb-sticker rounded-[var(--radio)] border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--sup)] p-6 shadow-[var(--sombra-sm)]"
            >
              <span
                class="pb-morf flex h-14 w-14 items-center justify-center rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--acento)] shadow-[var(--sombra-sm)] font-display text-[20px] leading-none text-[color:var(--acento-tinta)]"
                aria-hidden="true"
              >
                {{ paso.numero }}
              </span>
              <h3 class="pb-morf mt-5 font-display text-[length:var(--h3)] uppercase leading-none text-[color:var(--tinta)]">
                {{ paso.titulo[modo] }}
              </h3>
              <p class="pb-morf mt-3 text-[15px] leading-relaxed text-[color:var(--sutil)]">
                {{ paso.descripcion[modo] }}
              </p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class PropuestaImplementacionComponent {
  @Input({ required: true }) modo: ModoPropuesta = 'nino';
  @Input({ required: true }) encabezado!: EncabezadoSeccion;
  @Input({ required: true }) pasos: PasoImplementacion[] = [];
}
