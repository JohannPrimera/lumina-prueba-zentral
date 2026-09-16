import { Component, Input } from '@angular/core';
import { Modulo, PestanaPanelPreview } from '../../landing.models';
import { PanelPreviewComponent } from '../panel-preview/panel-preview.component';

@Component({
  selector: 'app-modulos-section',
  standalone: true,
  imports: [PanelPreviewComponent],
  template: `
    <section id="modulos" class="scroll-mt-4 px-5 py-20 sm:px-10 lg:py-28">
      <div class="mx-auto max-w-[1286px]">
        <h2 class="max-w-3xl font-display text-[clamp(40px,5.2vw,68px)] uppercase leading-[1.02] text-lumina-tinta">
          Gestión y
          <em class="font-serif normal-case italic text-lumina-violeta">aprendizaje</em>
          en un mismo lugar
        </h2>

        <div class="mt-12 grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <app-panel-preview [pestanas]="pestanasPreview" />

          <ul class="border-b-2 border-lumina-tinta">
            @for (modulo of modulos; track modulo.titulo) {
              <li class="border-t-2 border-lumina-tinta py-7">
                <h3 class="font-display text-[clamp(26px,2.6vw,34px)] uppercase leading-none text-lumina-tinta">
                  {{ modulo.titulo }}
                </h3>
                <p class="mt-3 max-w-xl text-[15px] leading-relaxed text-lumina-texto">{{ modulo.descripcion }}</p>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
})
export class ModulosSectionComponent {
  @Input({ required: true }) modulos: Modulo[] = [];
  @Input({ required: true }) pestanasPreview: PestanaPanelPreview[] = [];
}
