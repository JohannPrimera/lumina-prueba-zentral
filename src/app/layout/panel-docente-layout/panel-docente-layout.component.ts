import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LuminaLogoComponent } from '../../shared/components/lumina-logo/lumina-logo.component';
import { NotificacionesComponent } from '../../shared/components/notificaciones/notificaciones.component';

interface ItemMenuDocente {
  etiqueta: string;
  /** Sin ruta = módulo aún no disponible en el prototipo. */
  ruta?: string;
}

/**
 * Carcasa del panel del docente: navegación lateral + <router-outlet>.
 * No sabe nada de estudiantes; cada módulo del panel es una ruta hija.
 */
@Component({
  selector: 'app-panel-docente-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LuminaLogoComponent, NotificacionesComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './panel-docente-layout.component.html',
})
export class PanelDocenteLayoutComponent {
  protected readonly docente = { nombre: 'Prof. Andrea Salas', rol: 'Docente · Primaria', iniciales: 'AS' };

  protected readonly menu: ItemMenuDocente[] = [
    { etiqueta: 'Estudiantes', ruta: '/docente/estudiantes' },
    { etiqueta: 'Asistencia' },
    { etiqueta: 'Evaluaciones' },
    { etiqueta: 'Prácticas' },
  ];
}
