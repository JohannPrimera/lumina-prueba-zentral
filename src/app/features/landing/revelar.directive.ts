import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Entrada escalonada al entrar en viewport.
 *
 * Por qué una directiva y no una animación de Angular: la entrada es un
 * recorrido predeterminado que no se interrumpe, así que conviene que corra
 * como animación CSS (fuera del hilo principal) y no atada al ciclo de
 * detección de cambios. La directiva solo agrega la clase cuando corresponde.
 *
 * Se desconecta al primer disparo: revelar dos veces el mismo bloque al
 * subir y bajar la página es ruido, no información.
 */
@Directive({
  selector: '[appRevelar]',
  standalone: true,
})
export class RevelarDirective implements OnInit, OnDestroy {
  /** Posición dentro del grupo. Traduce a 60 ms de retraso por ítem, tope 6. */
  @Input('appRevelar') indice: number | string = 0;

  private readonly elemento = inject(ElementRef<HTMLElement>);
  private observador?: IntersectionObserver;

  ngOnInit(): void {
    const nodo = this.elemento.nativeElement as HTMLElement;
    const posicion = Math.min(Number(this.indice) || 0, 6);
    nodo.style.setProperty('--retraso', `${posicion * 60}ms`);
    nodo.classList.add('pb-revelar');

    // Prerender y navegadores sin soporte: el contenido queda visible de una.
    if (typeof IntersectionObserver === 'undefined') {
      nodo.classList.add('pb-visible');
      return;
    }

    this.observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          nodo.classList.add('pb-visible');
          this.observador?.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );
    this.observador.observe(nodo);
  }

  ngOnDestroy(): void {
    this.observador?.disconnect();
  }
}
