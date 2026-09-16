import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { PasoImplementacion } from '../../landing.models';

@Component({
  selector: 'app-implementacion-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <section id="implementacion" class="scroll-mt-4 px-5 pb-24 sm:px-10">
      <div class="mx-auto max-w-[1286px]">
        <h2 class="font-display text-[clamp(40px,5.2vw,68px)] uppercase leading-[1.02] text-lumina-tinta">
          Cómo entra Lúmina
          <em class="block font-serif normal-case italic text-lumina-violeta">a su colegio</em>
        </h2>

        <ol class="mt-12 border-b-2 border-lumina-tinta">
          @for (paso of pasos; track paso.numero) {
            <li class="grid grid-cols-[64px_1fr] gap-4 border-t-2 border-lumina-tinta py-8 sm:grid-cols-[195px_1fr]">
              <span class="font-display text-5xl leading-none text-lumina-violeta sm:text-6xl">{{ paso.numero }}</span>
              <div>
                <h3 class="text-2xl font-semibold text-lumina-tinta sm:text-[28px]">{{ paso.titulo }}</h3>
                <p class="mt-2 max-w-2xl text-[15px] leading-relaxed text-lumina-texto">{{ paso.descripcion }}</p>
              </div>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class ImplementacionSectionComponent {
  @Input({ required: true }) pasos: PasoImplementacion[] = [];
}
