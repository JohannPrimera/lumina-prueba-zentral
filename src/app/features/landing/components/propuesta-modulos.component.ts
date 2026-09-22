import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EncabezadoSeccion, Modulo, ModoPropuesta } from '../propuesta-b.models';
import { PropuestaEncabezadoComponent } from './propuesta-encabezado.component';
import { RevelarDirective } from '../revelar.directive';

/**
 * Los cuatro módulos. El orden del contenido está pensado para modo Niño
 * (lo suyo primero: retos, notas, racha, familia); en modo Docente el mismo
 * orden se lee como cercanía al aula, que es lo que le importa a un docente.
 */
@Component({
  selector: 'app-propuesta-modulos',
  standalone: true,
  imports: [PropuestaEncabezadoComponent, RevelarDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <section id="modulos" class="pb-morf scroll-mt-24 bg-[var(--campo-alt)] px-5 py-[var(--pad-y)] sm:px-10">
      <div class="mx-auto max-w-[1286px]">
        <app-propuesta-encabezado [modo]="modo" [encabezado]="encabezado" />

        <ul class="mt-12 grid gap-[var(--gap)] sm:grid-cols-2">
          @for (modulo of modulos; track modulo.titulo.docente; let i = $index) {
            <li
              [appRevelar]="i"
              class="pb-morf pb-alzar pb-sticker rounded-[var(--radio)] border-[length:var(--borde)] border-[color:var(--linea)] p-6 shadow-[var(--sombra-sm)] sm:p-7"
              [style.background]="fondo(i)"
            >
              <span
                class="pb-morf inline-block rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--sup)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[color:var(--tinta)]"
              >
                {{ modulo.insignia[modo] }}
              </span>
              <h3 class="pb-morf mt-4 font-display text-[length:var(--h3)] uppercase leading-none text-[color:var(--tinta)]">
                {{ modulo.titulo[modo] }}
              </h3>
              <p class="pb-morf mt-3 text-[15px] leading-relaxed text-[color:var(--sutil)]">
                {{ modulo.descripcion[modo] }}
              </p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class PropuestaModulosComponent {
  @Input({ required: true }) modo: ModoPropuesta = 'nino';
  @Input({ required: true }) encabezado!: EncabezadoSeccion;
  @Input({ required: true }) modulos: Modulo[] = [];

  /**
   * En modo Niño cada módulo tiene su color: es lo que convierte una grilla de
   * cuatro tarjetas en cuatro lugares distintos. En modo Docente todas vuelven
   * a blanco — ahí la diferencia la hace el título, no el fondo.
   */
  protected fondo(indice: number): string {
    if (this.modo === 'docente') return 'var(--sup)';
    return ['var(--premio)', 'var(--acento-2)', 'var(--exito)', 'var(--acento-3)'][indice % 4];
  }
}
