import { Component, Input } from '@angular/core';
import { Testimonio } from '../../landing.models';

@Component({
  selector: 'app-testimonio-section',
  standalone: true,
  template: `
    <section class="px-5 py-20 sm:px-10 lg:py-28" aria-label="Testimonio">
      <figure class="mx-auto max-w-5xl">
        <blockquote>
          <p class="font-display text-[clamp(32px,4.4vw,60px)] uppercase leading-[1.08] text-lumina-tinta">
            “{{ testimonio.citaInicio }}
            <em class="font-serif normal-case italic text-lumina-violeta">{{ testimonio.citaDestacada }}</em>”
          </p>
        </blockquote>
        <figcaption class="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
          <span class="font-bold text-lumina-tinta">{{ testimonio.autora }}</span>
          <span class="text-lumina-texto">{{ testimonio.cargo }}</span>
        </figcaption>
      </figure>
    </section>
  `,
})
export class TestimonioSectionComponent {
  @Input({ required: true }) testimonio!: Testimonio;
}
