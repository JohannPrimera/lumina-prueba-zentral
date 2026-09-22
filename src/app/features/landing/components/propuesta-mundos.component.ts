import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { EncabezadoSeccion, ModoPropuesta, Mundo } from '../propuesta-b.models';
import { PropuestaEncabezadoComponent } from './propuesta-encabezado.component';
import { RevelarDirective } from '../revelar.directive';

/**
 * El recorrido. Es la sección donde los dos modos se separan de verdad:
 * el mismo avance por área se lee como camino de mundos o como tabla de
 * cobertura del período. Mismo dato, dos preguntas distintas.
 *
 * Es el único lugar de la propuesta donde el marcado se bifurca. Vale la pena:
 * forzar una tabla a parecer un camino (o al revés) daría un híbrido que no
 * sirve a ninguno de los dos públicos.
 */
@Component({
  selector: 'app-propuesta-mundos',
  standalone: true,
  imports: [PropuestaEncabezadoComponent, RevelarDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <section id="mundos" class="scroll-mt-24 px-5 py-[var(--pad-y)] sm:px-10">
      <div class="mx-auto max-w-[1286px]">
        <app-propuesta-encabezado [modo]="modo" [encabezado]="encabezado" />

        @if (modo === 'nino') {
          <!-- Camino de mundos -->
          <div class="relative mt-14">
            <!-- La senda. Decorativa: el orden ya lo da la lista. -->
            <div
              class="pb-morf absolute left-[46px] top-4 h-[calc(100%-2rem)] w-0 border-l-[3px] border-dashed border-[color:var(--linea)] lg:left-0 lg:top-[50px] lg:h-0 lg:w-full lg:border-l-0 lg:border-t-[3px]"
              aria-hidden="true"
            ></div>

            <ol class="relative grid gap-8 lg:grid-cols-5 lg:gap-4">
              @for (mundo of mundos; track mundo.numero; let i = $index) {
                <li [appRevelar]="i" class="flex items-start gap-5 lg:block lg:text-center">
                  <button
                    type="button"
                    class="pb-foco pb-morf pb-alzar relative z-10 flex h-[92px] w-[92px] shrink-0 items-center justify-center rounded-full border-[length:var(--borde)] border-[color:var(--linea)] font-display text-[34px] leading-none text-[color:var(--tinta)] shadow-[var(--sombra-sm)] lg:mx-auto"
                    [style.background]="fondoNodo(mundo)"
                    [attr.aria-expanded]="abierto() === mundo.numero"
                    [attr.aria-label]="'Mundo ' + mundo.numero + ', ' + mundo.nombre.nino + '. ' + mundo.estado.nino"
                    (click)="alternar(mundo)"
                  >
                    @if (mundo.completado) {
                      ★
                    } @else if (mundo.porcentaje === 0) {
                      <svg viewBox="0 0 24 24" class="h-9 w-9 fill-[color:var(--tinta)]" aria-hidden="true">
                        <path d="M7 10V8a5 5 0 0 1 10 0v2h1.5A1.5 1.5 0 0 1 20 11.5v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5v-8A1.5 1.5 0 0 1 5.5 10zm2.2 0h5.6V8a2.8 2.8 0 0 0-5.6 0z" />
                      </svg>
                    } @else {
                      {{ mundo.numero }}
                    }
                  </button>

                  <div class="min-w-0 pt-1 lg:pt-5">
                    <h3 class="font-display text-[length:var(--h3)] uppercase leading-none text-[color:var(--tinta)]">
                      {{ mundo.nombre.nino }}
                    </h3>
                    <p class="mt-2 text-sm leading-snug text-[color:var(--sutil)]">{{ mundo.materia.nino }}</p>
                    <p
                      class="pb-morf mt-3 inline-block rounded-full border-[length:var(--borde)] border-[color:var(--linea)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[color:var(--tinta)]"
                      [style.background]="fondoNodo(mundo)"
                    >
                      {{ mundo.estado.nino }}
                    </p>
                    @if (!mundo.completado && mundo.porcentaje > 0) {
                      <div
                        class="pb-morf mt-3 h-3 overflow-hidden rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--sup)] lg:mx-auto lg:w-32"
                        role="img"
                        [attr.aria-label]="'Avance: ' + mundo.porcentaje + ' por ciento'"
                      >
                        <div class="pb-xp pb-morf h-full rounded-full bg-[var(--exito)]" [style.width.%]="mundo.porcentaje"></div>
                      </div>
                    }

                    @if (abierto() === mundo.numero) {
                      <p
                        class="pb-premiado pb-morf mt-3 rounded-[var(--radio-sm)] border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--sup)] px-3 py-2 text-sm font-semibold text-[color:var(--tinta)]"
                        role="status"
                      >
                        {{ recompensa(mundo) }}
                      </p>
                    }
                  </div>
                </li>
              }
            </ol>
          </div>
        } @else {
          <!-- Cobertura por área -->
          <div
            class="pb-morf mt-12 overflow-x-auto rounded-[var(--radio)] border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--sup)] shadow-[var(--sombra)]"
            [appRevelar]="1"
          >
            <table class="w-full border-collapse text-left">
              <caption class="sr-only">Avance por área curricular en el período en curso</caption>
              <thead>
                <tr class="pb-morf border-b-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--campo)]">
                  <th scope="col" class="px-3 py-3 text-[length:var(--micro)] sm:px-5 font-bold uppercase tracking-[0.1em] text-[color:var(--sutil)]">Área</th>
                  <th scope="col" class="hidden px-3 py-3 text-[length:var(--micro)] sm:px-5 font-bold uppercase tracking-[0.1em] text-[color:var(--sutil)] sm:table-cell">Contenido</th>
                  <th scope="col" class="px-3 py-3 text-[length:var(--micro)] sm:px-5 font-bold uppercase tracking-[0.1em] text-[color:var(--sutil)]">Avance</th>
                  <th scope="col" class="px-5 py-3 text-right text-[length:var(--micro)] font-bold uppercase tracking-[0.1em] text-[color:var(--sutil)]">Estado</th>
                </tr>
              </thead>
              <tbody>
                @for (mundo of mundos; track mundo.numero) {
                  <tr class="pb-morf border-b-[length:var(--borde)] border-[color:var(--linea)] last:border-b-0">
                    <th scope="row" class="px-3 py-3 align-middle text-sm sm:px-5 sm:py-4 sm:text-[15px] font-bold text-[color:var(--tinta)]">
                      {{ mundo.nombre.docente }}
                    </th>
                    <td class="hidden px-5 py-4 align-middle text-sm text-[color:var(--sutil)] sm:table-cell">
                      {{ mundo.materia.docente }}
                    </td>
                    <td class="px-3 py-3 align-middle sm:px-5 sm:py-4">
                      <div class="flex items-center gap-2 sm:gap-3">
                        <div
                          class="pb-morf h-2 w-14 shrink-0 sm:w-24 overflow-hidden rounded-full bg-[var(--campo-alt)]"
                          role="img"
                          [attr.aria-label]="mundo.nombre.docente + ': ' + mundo.porcentaje + ' por ciento'"
                        >
                          <div class="pb-morf h-full rounded-full bg-[var(--acento)]" [style.width.%]="mundo.porcentaje"></div>
                        </div>
                        <span class="text-sm font-bold tabular-nums text-[color:var(--tinta)]">{{ mundo.porcentaje }}%</span>
                      </div>
                    </td>
                    <td class="px-3 py-3 text-right align-middle sm:px-5 sm:py-4">
                      <span
                        class="pb-morf inline-block rounded-full border-[length:var(--borde)] border-[color:var(--linea)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.04em] text-[color:var(--tinta)] sm:px-3 sm:text-[11px]"
                        [style.background]="fondoNodo(mundo)"
                      >
                        {{ mundo.estado.docente }}
                      </span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </section>
  `,
})
export class PropuestaMundosComponent {
  @Input({ required: true }) modo: ModoPropuesta = 'nino';
  @Input({ required: true }) encabezado!: EncabezadoSeccion;
  @Input({ required: true }) mundos: Mundo[] = [];

  /** Número del mundo con la recompensa abierta. Uno por vez. */
  protected readonly abierto = signal<string | null>(null);

  protected alternar(mundo: Mundo): void {
    this.abierto.set(this.abierto() === mundo.numero ? null : mundo.numero);
  }

  protected fondoNodo(mundo: Mundo): string {
    if (mundo.completado) return 'var(--exito)';
    if (mundo.porcentaje > 0) return 'var(--premio)';
    return 'var(--campo-alt)';
  }

  protected recompensa(mundo: Mundo): string {
    if (mundo.completado) return 'Insignia ganada. Podés volver a jugarlo cuando quieras.';
    if (mundo.porcentaje > 0) return `Llevás ${mundo.porcentaje}%. Te faltan 3 retos para la insignia.`;
    return 'Se abre cuando termines el mundo anterior.';
  }
}
