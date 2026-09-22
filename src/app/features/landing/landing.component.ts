import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SolicitudDemoService } from './solicitud-demo.service';
import { EstadoSolicitudDemo, ModoPropuesta } from './propuesta-b.models';
import {
  CTA_FINAL,
  ENCABEZADO_COMUNIDAD,
  ENCABEZADO_IMPLEMENTACION,
  ENCABEZADO_MODULOS,
  ENCABEZADO_MUNDOS,
  ENLACES_NAVEGACION,
  HERO,
  INDICADORES_HERO,
  MODULOS,
  MUNDOS,
  PASOS_IMPLEMENTACION,
  PILARES,
  ROLES_COMUNIDAD,
  TESTIMONIO,
  TEXTOS,
} from './data/propuesta-b.content';
import { PropuestaHeaderComponent } from './components/propuesta-header.component';
import { PropuestaHeroComponent } from './components/propuesta-hero.component';
import { PropuestaPilaresComponent } from './components/propuesta-pilares.component';
import { PropuestaMundosComponent } from './components/propuesta-mundos.component';
import { PropuestaModulosComponent } from './components/propuesta-modulos.component';
import { PropuestaComunidadComponent } from './components/propuesta-comunidad.component';
import { PropuestaTestimonioComponent } from './components/propuesta-testimonio.component';
import { PropuestaImplementacionComponent } from './components/propuesta-implementacion.component';
import { PropuestaDemoCtaComponent } from './components/propuesta-demo-cta.component';
import { PropuestaFooterComponent } from './components/propuesta-footer.component';

const CLAVE_MODO = 'lumina.propuesta-b.modo';

/**
 * Propuesta B de landing · un solo árbol de componentes, dos registros.
 *
 * El modo no cambia de página ni de componentes: cambia el valor de un puñado
 * de custom properties declaradas acá abajo. Por eso pasar de Niño a Docente
 * es una transición y no un remonte del DOM — y por eso las secciones no saben
 * nada de colores: leen `var(--sup)`, `var(--radio)`, `var(--h1)`.
 *
 * `ViewEncapsulation.None` es deliberado: estas variables y las tres clases
 * utilitarias (`pb-morf`, `pb-revelar`, `pb-foco`) tienen que alcanzar a los
 * hijos. Todo queda acotado bajo `.pb`, así que no se filtra al resto de la app.
 */
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterLink,
    PropuestaHeaderComponent,
    PropuestaHeroComponent,
    PropuestaPilaresComponent,
    PropuestaMundosComponent,
    PropuestaModulosComponent,
    PropuestaComunidadComponent,
    PropuestaTestimonioComponent,
    PropuestaImplementacionComponent,
    PropuestaDemoCtaComponent,
    PropuestaFooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="pb pb-morf min-h-screen overflow-x-clip" [attr.data-modo]="modo()">
      <a class="pb-saltar pb-foco" routerLink="/" fragment="contenido" (click)="enfocarContenido()">{{ textos.saltar[modo()] }}</a>

      <app-propuesta-header
        [modo]="modo()"
        [enlaces]="enlaces"
        [textos]="textos"
        (cambiarModo)="cambiarModo($event)"
      />

      <main id="contenido" tabindex="-1" class="focus:outline-none">
        <app-propuesta-hero
          [modo]="modo()"
          [contenido]="hero"
          [indicadores]="indicadores"
          [textos]="textos"
          [estadoSolicitud]="estadoSolicitud()"
          (solicitarDemo)="solicitarDemo($event)"
        />
        <app-propuesta-pilares [modo]="modo()" [pilares]="pilares" />
        <app-propuesta-mundos [modo]="modo()" [encabezado]="encabezadoMundos" [mundos]="mundos" />
        <app-propuesta-modulos [modo]="modo()" [encabezado]="encabezadoModulos" [modulos]="modulos" />
        <app-propuesta-comunidad [modo]="modo()" [encabezado]="encabezadoComunidad" [roles]="roles" />
        <app-propuesta-testimonio [modo]="modo()" [testimonio]="testimonio" />
        <app-propuesta-implementacion
          [modo]="modo()"
          [encabezado]="encabezadoImplementacion"
          [pasos]="pasos"
        />
        <app-propuesta-demo-cta
          [modo]="modo()"
          [contenido]="ctaFinal"
          [textos]="textos"
          [estadoSolicitud]="estadoSolicitud()"
          (solicitarDemo)="solicitarDemo($event)"
        />
      </main>

      <app-propuesta-footer [modo]="modo()" [enlaces]="enlaces" [textos]="textos" />
    </div>
  `,
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  private readonly solicitudDemoService = inject(SolicitudDemoService);

  protected readonly textos = TEXTOS;
  protected readonly enlaces = ENLACES_NAVEGACION;
  protected readonly hero = HERO;
  protected readonly indicadores = INDICADORES_HERO;
  protected readonly pilares = PILARES;
  protected readonly encabezadoMundos = ENCABEZADO_MUNDOS;
  protected readonly mundos = MUNDOS;
  protected readonly encabezadoModulos = ENCABEZADO_MODULOS;
  protected readonly modulos = MODULOS;
  protected readonly encabezadoComunidad = ENCABEZADO_COMUNIDAD;
  protected readonly roles = ROLES_COMUNIDAD;
  protected readonly testimonio = TESTIMONIO;
  protected readonly encabezadoImplementacion = ENCABEZADO_IMPLEMENTACION;
  protected readonly pasos = PASOS_IMPLEMENTACION;
  protected readonly ctaFinal = CTA_FINAL;

  protected readonly modo = signal<ModoPropuesta>(leerModoGuardado());
  protected readonly estadoSolicitud = signal<EstadoSolicitudDemo>('inicial');

  protected cambiarModo(nuevo: ModoPropuesta): void {
    this.modo.set(nuevo);
    try {
      localStorage.setItem(CLAVE_MODO, nuevo);
    } catch {
      // Modo privado o almacenamiento bloqueado: la propuesta funciona igual,
      // solo no recuerda la elección entre recargas.
    }
  }

  /** El scroll lo hace el router; acá solo se mueve el foco, para quien navega con teclado. */
  protected enfocarContenido(): void {
    document.getElementById('contenido')?.focus({ preventScroll: true });
  }

  protected solicitarDemo(correo: string): void {
    this.estadoSolicitud.set('enviando');
    this.solicitudDemoService.solicitar(correo).subscribe({
      next: () => this.estadoSolicitud.set('enviada'),
      error: () => this.estadoSolicitud.set('inicial'),
    });
  }
}

/** Arranca en `nino`; solo respeta lo guardado si es uno de los dos modos. */
function leerModoGuardado(): ModoPropuesta {
  try {
    const guardado = localStorage.getItem(CLAVE_MODO);
    return guardado === 'docente' || guardado === 'nino' ? guardado : 'nino';
  } catch {
    return 'nino';
  }
}
