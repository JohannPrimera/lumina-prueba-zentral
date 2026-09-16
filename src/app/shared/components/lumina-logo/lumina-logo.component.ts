import { Component, Input } from '@angular/core';

/** Logotipo textual de Lúmina. Reutilizado en la landing y en el panel del docente. */
@Component({
  selector: 'app-lumina-logo',
  standalone: true,
  template: `
    <span class="block leading-none">
      <span class="block font-display text-[22px] tracking-wide" [class.text-white]="invertido">LÚMINA</span>
      <span
        class="mt-1 block text-[9px] font-bold uppercase tracking-[0.26em]"
        [class.text-lumina-violeta]="!invertido"
        [class.text-lumina-lima]="invertido"
      >
        {{ subtitulo }}
      </span>
    </span>
  `,
})
export class LuminaLogoComponent {
  @Input() subtitulo = 'Gestión escolar';
  @Input() invertido = false;
}
