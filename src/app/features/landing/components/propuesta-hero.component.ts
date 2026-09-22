import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BARRAS_HERO, CONFIRMACION, ETIQUETA_CORREO } from '../data/propuesta-b.content';
import { ContenidoHero, EstadoSolicitudDemo, IndicadorHero, ModoPropuesta, TextosInterfaz } from '../propuesta-b.models';
import { RevelarDirective } from '../revelar.directive';

/**
 * Hero de la Propuesta B.
 *
 * La columna derecha es el argumento central: el producto se muestra, no se
 * describe. En modo Niño es la pantalla de un juego (mascota, XP, misiones);
 * en modo Docente, los mismos datos leídos como panel de gestión.
 */
@Component({
  selector: 'app-propuesta-hero',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RevelarDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <section id="inicio" class="pb-confeti pb-morf scroll-mt-24 px-5 pb-[var(--pad-y)] pt-10 sm:px-10">
      <div class="mx-auto grid max-w-[1286px] items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div class="min-w-0" [appRevelar]="0">
          <p
            class="pb-inclinar pb-morf mb-6 inline-block rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--premio)] px-4 py-1.5 text-[length:var(--micro)] font-extrabold uppercase tracking-[0.12em] text-[color:var(--tinta)] shadow-[var(--sombra-sm)]"
          >
            {{ textos.heroAntetitulo[modo] }}
          </p>

          <h1 class="pb-morf font-display uppercase text-[color:var(--tinta)]" [style.line-height]="'var(--alto-titulo)'">
            <span class="block text-[length:var(--h1)]">{{ contenido.titulo[modo] }}</span>
            <span
              class="pb-morf font-serif mt-1 block text-[length:var(--h1)] normal-case leading-[1] text-[color:var(--acento-texto)]"
            >
              {{ contenido.tituloAcento[modo] }}
              <span
                class="pb-morf ml-1 inline-block h-[0.14em] w-[0.14em] rounded-full border-[0.035em] border-[color:var(--linea)] bg-[var(--premio)] align-baseline"
                aria-hidden="true"
              ></span>
            </span>
          </h1>

          <p class="pb-morf mt-7 max-w-[34rem] text-[length:var(--cuerpo)] leading-relaxed text-[color:var(--sutil)]">
            {{ contenido.bajada[modo] }}
          </p>

          @if (estadoSolicitud === 'enviada') {
            <div
              class="pb-morf pb-premiado mt-8 max-w-[36rem] rounded-[var(--radio-sm)] border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--exito)] px-5 py-4 text-[color:var(--tinta)] shadow-[var(--sombra-sm)]"
              role="status"
            >
              <p class="font-display text-[length:var(--h3)] uppercase leading-none">{{ confirmacion.titulo[modo] }}</p>
              <p class="mt-2 text-sm font-bold">{{ confirmacion.detalle[modo] }}</p>
            </div>
          } @else {
            <form class="mt-8 max-w-[38rem]" [formGroup]="formulario" (ngSubmit)="enviar()" novalidate>
              <label
                for="correo-propuesta-b"
                class="pb-morf mb-2 block text-[length:var(--micro)] font-extrabold uppercase tracking-[0.12em] text-[color:var(--tinta)]"
              >
                {{ etiquetaCorreo[modo] }}
              </label>
              <div class="flex flex-col gap-4 sm:flex-row">
                <input
                  id="correo-propuesta-b"
                  type="email"
                  formControlName="correo"
                  [placeholder]="textos.placeholderCorreo[modo]"
                  autocomplete="email"
                  [attr.aria-invalid]="correoInvalido"
                  aria-describedby="nota-propuesta-b"
                  [style.border-color]="correoInvalido ? 'var(--acento-texto)' : null"
                  class="pb-foco pb-morf min-w-0 flex-1 rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--sup)] px-5 py-4 text-base font-bold text-[color:var(--tinta)] placeholder:text-[color:var(--sutil)] placeholder:opacity-75 focus:outline-none"
                />
                <button
                  type="submit"
                  [disabled]="estadoSolicitud === 'enviando'"
                  class="pb-foco pb-morf pb-alzar rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--acento)] px-8 py-4 font-display text-[clamp(16px,1.6vw,20px)] uppercase tracking-[0.04em] text-[color:var(--acento-tinta)] shadow-[var(--sombra-sm)] hover:bg-[var(--acento-hover)] disabled:opacity-60"
                >
                  {{ estadoSolicitud === 'enviando' ? textos.enviando[modo] : contenido.cta[modo] }}
                </button>
              </div>
              @if (correoInvalido) {
                <p role="alert" class="mt-2 text-sm font-extrabold text-[color:var(--acento-texto)]">
                  {{ textos.errorCorreo[modo] }}
                </p>
              }
              <p id="nota-propuesta-b" class="pb-morf mt-3 max-w-[30rem] text-sm text-[color:var(--sutil)]">
                {{ contenido.nota[modo] }}
              </p>
            </form>
          }
        </div>

        <!-- La pantalla de juego / el panel: la prueba visible de lo que hace el producto. -->
        <div class="min-w-0" [appRevelar]="1">
          <div class="relative">
            @if (modo === 'nino') {
              <svg
                viewBox="0 0 24 24"
                class="pb-flotar absolute -right-3 -top-7 z-10 h-14 w-14 fill-[color:var(--premio)] stroke-[color:var(--tinta)]"
                stroke-width="1.8"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2.5l2.9 6.4 6.9.7-5.2 4.6 1.5 6.8L12 17.4l-6.1 3.6 1.5-6.8-5.2-4.6 6.9-.7z" />
              </svg>
              <svg
                viewBox="0 0 24 24"
                class="pb-flotar absolute -bottom-6 -left-5 z-10 h-10 w-10 fill-[color:var(--acento)] stroke-[color:var(--tinta)]"
                stroke-width="2"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2.5l2.9 6.4 6.9.7-5.2 4.6 1.5 6.8L12 17.4l-6.1 3.6 1.5-6.8-5.2-4.6 6.9-.7z" />
              </svg>
            }

            <div
              class="pb-morf relative rounded-[var(--radio)] border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--sup)] p-5 shadow-[var(--sombra)] sm:p-7"
            >
              @if (modo === 'nino') {
                <div class="flex items-end gap-3">
                  <!-- Chispa: personaje propio, construido sobre el punto de la marca. -->
                  <svg
                    viewBox="0 0 120 132"
                    class="pb-flotar h-[150px] w-auto shrink-0"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <g class="stroke-[color:var(--tinta)]" stroke-width="6">
                      <path d="M60 26V12" />
                      <circle cx="60" cy="9" r="7" stroke-width="5" class="fill-[color:var(--premio)]" />
                      <path d="M34 106v14M86 106v14" stroke-width="8" />
                      <rect x="14" y="26" width="92" height="82" rx="32" class="fill-[color:var(--acento-2)]" />
                      <circle cx="17" cy="88" r="9" stroke-width="5" class="fill-[color:var(--acento)]" />
                      <circle cx="103" cy="88" r="9" stroke-width="5" class="fill-[color:var(--acento)]" />
                      <circle cx="44" cy="58" r="7.5" stroke-width="0" class="fill-[color:var(--tinta)]" />
                      <circle cx="78" cy="58" r="7.5" stroke-width="0" class="fill-[color:var(--tinta)]" />
                      <path d="M44 78c6 9 26 9 32 0" />
                    </g>
                  </svg>
                  <div
                    class="pb-morf mb-3 min-w-0 rounded-[var(--radio-sm)] border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--premio)] px-4 py-3"
                  >
                    <p class="font-display text-[length:var(--h3)] uppercase leading-none text-[color:var(--tinta)]">
                      {{ textos.heroSaludo[modo] }}
                    </p>
                    <p class="mt-1.5 text-sm font-bold text-[color:var(--tinta)]">{{ textos.heroSaludoDetalle[modo] }}</p>
                  </div>
                </div>

                <div class="mt-5">
                  <p class="text-sm font-extrabold text-[color:var(--tinta)]">{{ textos.heroXp[modo] }}</p>
                  <div
                    class="pb-morf mt-1.5 h-6 overflow-hidden rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--campo)]"
                    role="img"
                    [attr.aria-label]="textos.heroXp[modo]"
                  >
                    <div class="pb-xp pb-morf h-full w-[68%] rounded-full bg-[var(--acento)]"></div>
                  </div>
                  <p class="mt-1.5 text-sm text-[color:var(--sutil)]">{{ textos.heroDescripcion[modo] }}</p>
                </div>
              } @else {
                <p class="text-[length:var(--micro)] font-extrabold uppercase tracking-[0.12em] text-[color:var(--sutil)]">
                  {{ textos.heroSaludo[modo] }}
                </p>
                <p class="mt-2 text-sm leading-relaxed text-[color:var(--sutil)]">{{ textos.heroSaludoDetalle[modo] }}</p>
              }

              <!-- Los tres marcadores. Mismo componente visual, otra lectura. -->
              <ul class="mt-5 grid grid-cols-3 gap-3">
                @for (indicador of indicadores; track indicador.etiqueta.docente) {
                  <li
                    class="pb-morf rounded-[var(--radio-sm)] border-[length:var(--borde)] border-[color:var(--linea)] px-2 py-3 text-center shadow-[var(--sombra-sm)]"
                    [style.background]="fondoIndicador(indicador)"
                  >
                    <p class="font-display text-[clamp(24px,3vw,36px)] leading-none text-[color:var(--tinta)]">
                      {{ indicador.valor[modo] }}
                    </p>
                    <p class="mt-1.5 text-[11px] font-extrabold uppercase leading-tight tracking-[0.05em] text-[color:var(--tinta)]">
                      {{ indicador.etiqueta[modo] }}
                    </p>
                  </li>
                }
              </ul>

              <p class="pb-morf mt-6 text-[length:var(--micro)] font-extrabold uppercase tracking-[0.12em] text-[color:var(--sutil)]">
                {{ textos.heroRotulo[modo] }}
              </p>
              <ul class="mt-3 space-y-3">
                @for (barra of barras; track barra.etiqueta.docente) {
                  <li>
                    <div class="flex items-baseline justify-between gap-3">
                      <span class="truncate text-sm font-extrabold text-[color:var(--tinta)]">{{ barra.etiqueta[modo] }}</span>
                      <span class="shrink-0 text-sm font-extrabold tabular-nums text-[color:var(--sutil)]">{{ barra.porcentaje }}%</span>
                    </div>
                    <div
                      class="pb-morf mt-1.5 h-4 overflow-hidden rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--campo)]"
                      role="img"
                      [attr.aria-label]="barra.etiqueta[modo] + ': ' + barra.porcentaje + ' ' + textos.porCiento[modo]"
                    >
                      <div class="pb-xp pb-morf h-full rounded-full bg-[var(--exito)]" [style.width.%]="barra.porcentaje"></div>
                    </div>
                  </li>
                }
              </ul>
            </div>
          </div>

          <a
            routerLink="/"
            fragment="mundos"
            class="pb-foco pb-morf mt-8 inline-block text-[length:var(--micro)] font-extrabold uppercase tracking-[0.1em] text-[color:var(--acento-texto)] underline underline-offset-4"
          >
            {{ contenido.ctaSecundario[modo] }}
          </a>
        </div>
      </div>
    </section>
  `,
})
export class PropuestaHeroComponent {
  @Input({ required: true }) modo: ModoPropuesta = 'nino';
  @Input({ required: true }) contenido!: ContenidoHero;
  @Input({ required: true }) indicadores: IndicadorHero[] = [];
  @Input({ required: true }) textos!: TextosInterfaz;
  @Input() estadoSolicitud: EstadoSolicitudDemo = 'inicial';
  @Output() solicitarDemo = new EventEmitter<string>();

  protected readonly barras = BARRAS_HERO;
  protected readonly etiquetaCorreo = ETIQUETA_CORREO;
  protected readonly confirmacion = CONFIRMACION;

  private readonly fb = inject(FormBuilder);

  protected readonly formulario = this.fb.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
  });

  protected get correoInvalido(): boolean {
    const control = this.formulario.controls.correo;
    return control.invalid && (control.dirty || control.touched);
  }

  /** El acento del marcador sale del token, no de un hex suelto. */
  protected fondoIndicador(indicador: IndicadorHero): string {
    if (indicador.acento === 1) return 'var(--premio)';
    if (indicador.acento === 2) return 'var(--acento-2)';
    return 'var(--exito)';
  }

  protected enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.solicitarDemo.emit(this.formulario.getRawValue().correo);
  }
}
