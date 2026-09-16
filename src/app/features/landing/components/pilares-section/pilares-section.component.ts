import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pilares-section',
  standalone: true,
  template: `
    <section class="mt-12 bg-lumina-noche px-5 py-10 text-white sm:px-10" aria-label="Por qué Lúmina">
      <ul class="mx-auto grid max-w-[1286px] gap-6 md:grid-cols-3 md:gap-0">
        @for (pilar of pilares; track pilar) {
          <li
            class="max-w-md text-base font-semibold leading-snug sm:text-[17px] md:border-l-2 md:border-white/20 md:px-8 md:first:border-l-0 md:first:pl-0"
          >
            {{ pilar }}
          </li>
        }
      </ul>
    </section>
  `,
})
export class PilaresSectionComponent {
  @Input({ required: true }) pilares: string[] = [];
}
