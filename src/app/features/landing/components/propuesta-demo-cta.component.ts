import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONFIRMACION, ETIQUETA_CORREO } from '../data/propuesta-b.content';
import { ContenidoHero, EstadoSolicitudDemo, ModoPropuesta, TextosInterfaz } from '../propuesta-b.models';
import { RevelarDirective } from '../revelar.directive';

/**
 * Cierre. Repite el formulario del hero a propósito: quien llega hasta acá
 * ya leyó el argumento y no debería tener que volver arriba para actuar.
 */
@Component({
  selector: 'app-propuesta-demo-cta',
  standalone: true,
  imports: [ReactiveFormsModule, RevelarDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <section class="px-5 pb-[var(--pad-y)] pt-4 sm:px-10" [attr.aria-label]="contenido.cta[modo]">
      <div
        class="pb-confeti pb-morf mx-auto max-w-[1286px] rounded-[var(--radio)] border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--oscuro)] px-7 py-14 text-[color:var(--oscuro-tinta)] shadow-[var(--sombra)] sm:px-14 sm:py-20"
        [appRevelar]="0"
      >
        <div class="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div class="min-w-0">
            <h2
              class="pb-morf font-display text-[length:var(--h2)] uppercase"
              [style.line-height]="'var(--alto-titulo)'"
            >
              {{ contenido.titulo[modo] }}
              <em class="pb-morf block font-serif normal-case italic text-[color:var(--premio)]">
                {{ contenido.tituloAcento[modo] }}
              </em>
            </h2>
            <p class="pb-morf mt-5 max-w-lg text-[length:var(--cuerpo)] leading-relaxed opacity-90">
              {{ contenido.bajada[modo] }}
            </p>
          </div>

          <div class="min-w-0">
            @if (estadoSolicitud === 'enviada') {
              <div
                class="pb-morf pb-premiado rounded-[var(--radio-sm)] border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--exito)] px-6 py-5 text-[color:var(--tinta)]"
                role="status"
              >
                <p class="font-display text-[length:var(--h3)] uppercase leading-none">{{ confirmacion.titulo[modo] }}</p>
                <p class="mt-2 text-sm font-medium">{{ confirmacion.detalle[modo] }}</p>
              </div>
            } @else {
              <form [formGroup]="formulario" (ngSubmit)="enviar()" novalidate>
                <label
                  for="correo-cierre-propuesta-b"
                  class="pb-morf mb-2 block text-[length:var(--micro)] font-bold uppercase tracking-[0.12em]"
                >
                  {{ etiquetaCorreo[modo] }}
                </label>
                <div class="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="correo-cierre-propuesta-b"
                    type="email"
                    formControlName="correo"
                    [placeholder]="textos.placeholderCorreo[modo]"
                    autocomplete="email"
                    [attr.aria-invalid]="correoInvalido"
                    aria-describedby="nota-cierre-propuesta-b"
                    class="pb-foco pb-morf min-w-0 flex-1 rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--sup)] px-5 py-3.5 text-base font-medium text-[color:var(--tinta)] placeholder:text-[color:var(--sutil)] placeholder:opacity-75 focus:outline-none"
                  />
                  <button
                    type="submit"
                    [disabled]="estadoSolicitud === 'enviando'"
                    class="pb-foco pb-morf pb-alzar rounded-full border-[length:var(--borde)] border-[color:var(--linea)] bg-[var(--premio)] px-7 py-3.5 text-[length:var(--micro)] font-bold uppercase tracking-[0.08em] text-[color:var(--tinta)] shadow-[var(--sombra-sm)] disabled:opacity-60"
                  >
                    {{ estadoSolicitud === 'enviando' ? textos.enviando[modo] : contenido.cta[modo] }}
                  </button>
                </div>
                @if (correoInvalido) {
                  <p role="alert" class="mt-2 text-sm font-extrabold text-[color:var(--premio)]">{{ textos.errorCorreo[modo] }}</p>
                }
                <p id="nota-cierre-propuesta-b" class="mt-3 text-sm opacity-80">{{ contenido.nota[modo] }}</p>
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class PropuestaDemoCtaComponent {
  @Input({ required: true }) modo: ModoPropuesta = 'nino';
  @Input({ required: true }) contenido!: ContenidoHero;
  @Input({ required: true }) textos!: TextosInterfaz;
  @Input() estadoSolicitud: EstadoSolicitudDemo = 'inicial';
  @Output() solicitarDemo = new EventEmitter<string>();

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

  protected enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.solicitarDemo.emit(this.formulario.getRawValue().correo);
  }
}
