import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-demo-cta-section',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section id="demo" class="scroll-mt-4 border-y-[3px] border-lumina-tinta bg-lumina-lima px-5 py-20 sm:px-10 lg:py-28">
      <div class="mx-auto max-w-4xl">
        <h2 class="font-display text-[clamp(40px,6vw,84px)] uppercase leading-[1] text-lumina-tinta">
          Véala con sus <em class="font-serif normal-case italic">propios datos</em>
        </h2>
        <p class="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-lumina-tinta/90">
          Treinta minutos con su equipo directivo, sobre la estructura real de su institución: niveles, grupos, costos y
          el reporte que hoy le cuesta armar.
        </p>
        <div class="mt-9 flex flex-wrap gap-3">
          <a
            routerLink="/"
            fragment="inicio"
            class="rounded-full border-[3px] border-lumina-tinta bg-lumina-tinta px-7 py-4 text-sm font-bold uppercase tracking-[0.08em] text-lumina-lima transition hover:bg-lumina-violeta hover:text-white"
          >
            Solicitar demostración
          </a>
          <a
            routerLink="/docente/estudiantes"
            class="rounded-full border-[3px] border-lumina-tinta px-7 py-4 text-sm font-bold uppercase tracking-[0.08em] text-lumina-tinta transition hover:bg-lumina-tinta hover:text-lumina-lima"
          >
            Probar el panel docente
          </a>
        </div>
      </div>
    </section>
  `,
})
export class DemoCtaSectionComponent {}
