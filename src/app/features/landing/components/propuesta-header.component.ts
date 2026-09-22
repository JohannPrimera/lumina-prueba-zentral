import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LuminaLogoComponent } from '../../../shared/components/lumina-logo/lumina-logo.component';
import { EnlaceNavegacion, ModoPropuesta, TextosInterfaz } from '../propuesta-b.models';

/**
 * Cabecera con el conmutador de modo.
 *
 * El conmutador es un `role="switch"`: un solo control, dos estados. Va pegado
 * al logotipo (segundo control del tabulador, después del enlace de salto)
 * porque define qué página se está leyendo. En modo Niño la cabecera suma un
 * HUD de juego (XP, racha, monedas); en modo Docente desaparece.
 */
@Component({
  selector: 'app-propuesta-header',
  standalone: true,
  imports: [RouterLink, LuminaLogoComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <header class="pb-morf sticky top-0 z-40 border-b-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--campo)]">
      <div class="mx-auto flex max-w-[1286px] items-center gap-2 px-4 py-3 sm:gap-5 sm:px-10">
        <a routerLink="/" fragment="inicio" class="pb-foco shrink-0" [attr.aria-label]="textos.logoInicio[modo]">
          <app-lumina-logo class="pb-logo-corto" [subtitulo]="textos.logoSubtitulo[modo]" />
        </a>

        <button
          type="button"
          role="switch"
          [attr.aria-checked]="modo === 'docente'"
          [attr.aria-label]="modo === 'docente' ? textos.interruptorEnDocente[modo] : textos.interruptorEnNino[modo]"
          (click)="alternar()"
          class="pb-foco pb-morf pb-alzar relative grid shrink-0 grid-cols-2 items-center rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--sup)] p-1 shadow-[var(--sombra-sm)]"
        >
          <span
            aria-hidden="true"
            class="pb-pulgar absolute bottom-1 left-1 top-1 w-[calc(50%-0.25rem)] rounded-full bg-[var(--acento)]"
            [style.transform]="modo === 'docente' ? 'translateX(100%)' : 'translateX(0)'"
          ></span>
          <span
            class="pb-morf relative z-10 px-1.5 py-1.5 text-center text-[10px] font-extrabold uppercase tracking-[0.04em] sm:px-4 sm:py-2 sm:text-[length:var(--micro)] sm:tracking-[0.06em]"
            [style.color]="modo === 'nino' ? 'var(--acento-tinta)' : 'var(--sutil)'"
          >
            {{ textos.etiquetaEstudiante[modo] }}
          </span>
          <span
            class="pb-morf relative z-10 px-1.5 py-1.5 text-center text-[10px] font-extrabold uppercase tracking-[0.04em] sm:px-4 sm:py-2 sm:text-[length:var(--micro)] sm:tracking-[0.06em]"
            [style.color]="modo === 'docente' ? 'var(--acento-tinta)' : 'var(--sutil)'"
          >
            {{ textos.etiquetaDocente[modo] }}
          </span>
        </button>

        @if (modo === 'nino') {
          <!-- HUD de juego: decorativo, por eso fuera del árbol de accesibilidad. -->
          <ul class="hidden items-center gap-2 xl:flex" aria-hidden="true">
            <li class="flex items-center gap-1.5 rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--sup)] px-3 py-1 text-[13px] font-extrabold shadow-[0_3px_0_0_var(--linea)]">
              <svg viewBox="0 0 24 24" class="h-4 w-4 fill-[color:var(--premio)] stroke-[color:var(--tinta)]" stroke-width="2.4" stroke-linejoin="round">
                <path d="M12 2.5l2.9 6.4 6.9.7-5.2 4.6 1.5 6.8L12 17.4l-6.1 3.6 1.5-6.8-5.2-4.6 6.9-.7z" />
              </svg>
              {{ textos.hudXp[modo] }}
            </li>
            <li class="flex items-center gap-1.5 rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--sup)] px-3 py-1 text-[13px] font-extrabold shadow-[0_3px_0_0_var(--linea)]">
              <svg viewBox="0 0 24 24" class="h-4 w-4 fill-[color:var(--acento)] stroke-[color:var(--tinta)]" stroke-width="2.4" stroke-linejoin="round">
                <path d="M12 2.5c.8 3.6 5.2 5.6 5.2 10.6a5.2 5.2 0 0 1-10.4 0c0-2 1-3.4 2.2-4.4.1 1.8.9 2.8 2 3 .2-3.2-.6-5.6 1-9.2z" />
              </svg>
              {{ textos.hudRacha[modo] }}
            </li>
            <li class="flex items-center gap-1.5 rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--sup)] px-3 py-1 text-[13px] font-extrabold shadow-[0_3px_0_0_var(--linea)]">
              <svg viewBox="0 0 24 24" class="h-4 w-4 fill-[color:var(--acento-2)] stroke-[color:var(--tinta)]" stroke-width="2.4">
                <circle cx="12" cy="12" r="8.5" />
                <path d="M12 8v8M9.5 12h5" stroke-linecap="round" />
              </svg>
              {{ textos.hudMonedas[modo] }}
            </li>
          </ul>
        }

        <nav class="ml-auto hidden items-center gap-7 lg:flex" [attr.aria-label]="textos.navPrincipal[modo]">
          @for (enlace of enlaces; track enlace.fragmento) {
            <a
              routerLink="/"
              [fragment]="enlace.fragmento"
              class="pb-foco pb-morf text-[length:var(--micro)] font-extrabold uppercase tracking-[0.1em] text-[color:var(--tinta)] hover:text-[color:var(--acento-texto)]"
            >
              {{ enlace.etiqueta[modo] }}
            </a>
          }
        </nav>

        <div class="ml-auto flex items-center gap-2 sm:gap-3 lg:ml-0">
          <a
            routerLink="/docente/estudiantes"
            class="pb-foco pb-morf pb-alzar hidden rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--premio)] px-5 py-2.5 text-[length:var(--micro)] font-extrabold uppercase tracking-[0.08em] text-[color:var(--tinta)] shadow-[var(--sombra-sm)] md:inline-block"
          >
            {{ textos.panelDocente[modo] }}
          </a>

          <button
            type="button"
            class="pb-foco pb-morf rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--sup)] p-2.5 text-[color:var(--tinta)] lg:hidden"
            [attr.aria-expanded]="menuAbierto()"
            aria-controls="menu-propuesta-b"
            [attr.aria-label]="textos.menu[modo]"
            (click)="menuAbierto.set(!menuAbierto())"
          >
            <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
              @if (menuAbierto()) {
                <path d="M3 1l10 10M13 1L3 11" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
              } @else {
                <path d="M1 1.5h14M1 6h14M1 10.5h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
              }
            </svg>
          </button>
        </div>
      </div>

      @if (menuAbierto()) {
        <nav
          id="menu-propuesta-b"
          [attr.aria-label]="textos.navMovil[modo]"
          class="pb-morf mx-4 mb-4 flex flex-col gap-1 rounded-[var(--radio)] border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--sup)] p-3 shadow-[var(--sombra-sm)] sm:mx-10 lg:hidden"
        >
          @for (enlace of enlaces; track enlace.fragmento) {
            <a
              routerLink="/"
              [fragment]="enlace.fragmento"
              (click)="menuAbierto.set(false)"
              class="pb-foco pb-morf rounded-[var(--radio-sm)] px-4 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-[color:var(--tinta)] hover:bg-[var(--campo)]"
            >
              {{ enlace.etiqueta[modo] }}
            </a>
          }
          <a
            routerLink="/docente/estudiantes"
            (click)="menuAbierto.set(false)"
            class="pb-foco pb-morf mt-1 rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--premio)] px-4 py-3 text-center text-[length:var(--micro)] font-extrabold uppercase tracking-[0.08em] text-[color:var(--tinta)]"
          >
            {{ textos.panelDocente[modo] }}
          </a>
        </nav>
      }
    </header>
  `,
})
export class PropuestaHeaderComponent {
  @Input({ required: true }) modo: ModoPropuesta = 'nino';
  @Input({ required: true }) enlaces: EnlaceNavegacion[] = [];
  @Input({ required: true }) textos!: TextosInterfaz;
  @Output() cambiarModo = new EventEmitter<ModoPropuesta>();

  protected readonly menuAbierto = signal(false);

  protected alternar(): void {
    this.cambiarModo.emit(this.modo === 'nino' ? 'docente' : 'nino');
  }
}
