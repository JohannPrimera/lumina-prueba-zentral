import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EncabezadoSeccion, ModoPropuesta } from '../propuesta-b.models';
import { RevelarDirective } from '../revelar.directive';

/**
 * Encabezado de sección. Existe para que las cinco secciones compartan el
 * mismo ritmo vertical y la misma jerarquía: antetítulo, título con acento
 * en serif itálica, bajada. Cambiar el ritmo acá lo cambia en toda la página.
 */
@Component({
  selector: 'app-propuesta-encabezado',
  standalone: true,
  imports: [RevelarDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="max-w-3xl" [appRevelar]="0">
      <p
        class="pb-morf mb-4 inline-block rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--sup)] px-4 py-1.5 text-[length:var(--micro)] font-bold uppercase tracking-[0.12em] text-[color:var(--sutil)]"
      >
        {{ encabezado.antetitulo[modo] }}
      </p>
      <h2
        class="pb-morf font-display text-[length:var(--h2)] uppercase text-[color:var(--tinta)]"
        [style.line-height]="'var(--alto-titulo)'"
      >
        {{ encabezado.titulo[modo] }}
        <em class="pb-morf font-serif normal-case italic text-[color:var(--acento-texto)]">
          {{ encabezado.tituloAcento[modo] }}
        </em>
      </h2>
      <p class="pb-morf mt-5 max-w-2xl text-[length:var(--cuerpo)] leading-relaxed text-[color:var(--sutil)]">
        {{ encabezado.bajada[modo] }}
      </p>
    </div>
  `,
})
export class PropuestaEncabezadoComponent {
  @Input({ required: true }) modo: ModoPropuesta = 'nino';
  @Input({ required: true }) encabezado!: EncabezadoSeccion;
}
