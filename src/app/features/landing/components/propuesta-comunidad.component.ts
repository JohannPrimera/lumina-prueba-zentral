import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EncabezadoSeccion, ModoPropuesta, RolComunidad } from '../propuesta-b.models';
import { PropuestaEncabezadoComponent } from './propuesta-encabezado.component';
import { RevelarDirective } from '../revelar.directive';

/**
 * Los cuatro roles. En modo Niño el orden arranca por "Vos": el visitante
 * tiene que encontrarse a sí mismo en la primera tarjeta. En modo Docente el
 * mismo orden se lee de abajo hacia arriba en la jerarquía, que es como se
 * arma la adopción real: primero el aula, después la dirección.
 */
@Component({
  selector: 'app-propuesta-comunidad',
  standalone: true,
  imports: [PropuestaEncabezadoComponent, RouterLink, RevelarDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <section id="comunidad" class="scroll-mt-24 px-5 py-[var(--pad-y)] sm:px-10">
      <div class="mx-auto max-w-[1286px]">
        <app-propuesta-encabezado [modo]="modo" [encabezado]="encabezado" />

        <ul class="mt-12 grid gap-[var(--gap)] sm:grid-cols-2 lg:grid-cols-4">
          @for (rol of roles; track rol.titulo.docente; let i = $index) {
            <li
              [appRevelar]="i"
              class="pb-morf pb-alzar pb-sticker flex flex-col rounded-[var(--radio)] border-[length:var(--borde)] border-[color:var(--linea)] p-6 shadow-[var(--sombra-sm)]"
              [style.background]="fondo(i)"
            >
              <span
                class="pb-morf flex h-14 w-14 items-center justify-center rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--sup)] font-display text-[26px] leading-none text-[color:var(--tinta)] shadow-[var(--sombra-sm)]"
                aria-hidden="true"
              >
                0{{ i + 1 }}
              </span>
              <h3 class="pb-morf mt-4 font-display text-[length:var(--h3)] uppercase leading-none text-[color:var(--tinta)]">
                {{ rol.titulo[modo] }}
              </h3>
              <p class="pb-morf mt-3 flex-1 text-[15px] leading-relaxed text-[color:var(--sutil)]">
                {{ rol.descripcion[modo] }}
              </p>
              @if (rol.enlace) {
                <a
                  [routerLink]="rol.enlace.ruta"
                  class="pb-foco pb-morf mt-5 inline-block text-[length:var(--micro)] font-bold uppercase tracking-[0.1em] text-[color:var(--tinta)] underline underline-offset-4"
                >
                  {{ rol.enlace.texto[modo] }}
                </a>
              }
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class PropuestaComunidadComponent {
  @Input({ required: true }) modo: ModoPropuesta = 'nino';
  @Input({ required: true }) encabezado!: EncabezadoSeccion;
  @Input({ required: true }) roles: RolComunidad[] = [];

  /**
   * Rotación de fondos por posición: el color distingue roles, no los jerarquiza.
   * En modo Docente la misma rotación se hace en tintes claros — cuatro lugares
   * distintos sin que ninguno grite más fuerte que el contenido.
   */
  protected fondo(indice: number): string {
    const paleta =
      this.modo === 'docente'
        ? ['var(--sup)', 'var(--campo-alt)', 'var(--premio)', 'var(--acento-2)']
        : ['var(--sup)', 'var(--acento-2)', 'var(--premio)', 'var(--exito)'];
    return paleta[indice % 4];
  }
}
