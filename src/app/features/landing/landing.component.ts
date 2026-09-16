import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { EstadoSolicitudDemo } from './landing.models';
import {
  ENLACES_NAVEGACION,
  MODULOS,
  PASOS_IMPLEMENTACION,
  PESTANAS_PANEL_PREVIEW,
  PILARES,
  ROLES_COMUNIDAD,
  TESTIMONIO,
} from './data/landing.content';
import { SolicitudDemoService } from './solicitud-demo.service';
import { LandingHeaderComponent } from './components/landing-header/landing-header.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { PilaresSectionComponent } from './components/pilares-section/pilares-section.component';
import { ModulosSectionComponent } from './components/modulos-section/modulos-section.component';
import { ComunidadSectionComponent } from './components/comunidad-section/comunidad-section.component';
import { TestimonioSectionComponent } from './components/testimonio-section/testimonio-section.component';
import { ImplementacionSectionComponent } from './components/implementacion-section/implementacion-section.component';
import { DemoCtaSectionComponent } from './components/demo-cta-section/demo-cta-section.component';
import { LandingFooterComponent } from './components/landing-footer/landing-footer.component';

/**
 * Página contenedora de la landing (Fase 1 · v4).
 * Arma las secciones, les pasa el contenido por @Input y es la única que
 * habla con un service (SolicitudDemoService). Mismo patrón que
 * GestionEstudiantesComponent en el panel del docente.
 */
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    LandingHeaderComponent,
    HeroSectionComponent,
    PilaresSectionComponent,
    ModulosSectionComponent,
    ComunidadSectionComponent,
    TestimonioSectionComponent,
    ImplementacionSectionComponent,
    DemoCtaSectionComponent,
    LandingFooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="min-h-screen overflow-x-hidden bg-lumina-fondo text-lumina-tinta">
      <app-landing-header [enlaces]="enlaces" />
      <main>
        <app-hero-section [estadoSolicitud]="estadoSolicitud()" (solicitarDemo)="solicitarDemo($event)" />
        <app-pilares-section [pilares]="pilares" />
        <app-modulos-section [modulos]="modulos" [pestanasPreview]="pestanasPreview" />
        <app-comunidad-section [roles]="roles" />
        <app-testimonio-section [testimonio]="testimonio" />
        <app-implementacion-section [pasos]="pasos" />
        <app-demo-cta-section />
      </main>
      <app-landing-footer [enlaces]="enlaces" />
    </div>
  `,
})
export class LandingComponent {
  private readonly solicitudDemoService = inject(SolicitudDemoService);

  protected readonly enlaces = ENLACES_NAVEGACION;
  protected readonly pilares = PILARES;
  protected readonly modulos = MODULOS;
  protected readonly pestanasPreview = PESTANAS_PANEL_PREVIEW;
  protected readonly roles = ROLES_COMUNIDAD;
  protected readonly testimonio = TESTIMONIO;
  protected readonly pasos = PASOS_IMPLEMENTACION;

  protected readonly estadoSolicitud = signal<EstadoSolicitudDemo>('inicial');

  protected solicitarDemo(correo: string): void {
    this.estadoSolicitud.set('enviando');
    this.solicitudDemoService.solicitar(correo).subscribe({
      next: () => this.estadoSolicitud.set('enviada'),
      error: () => this.estadoSolicitud.set('inicial'),
    });
  }
}
