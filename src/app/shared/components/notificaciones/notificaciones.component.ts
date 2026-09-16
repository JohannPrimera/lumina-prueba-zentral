import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { NotificacionesService } from '../../services/notificaciones.service';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex flex-col items-end gap-2 sm:left-auto" aria-live="polite">
      @for (aviso of servicio.notificaciones(); track aviso.id) {
        <div
          class="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border-[3px] border-lumina-tinta px-4 py-3 text-sm font-semibold text-lumina-tinta"
          [class.bg-lumina-lima]="aviso.tipo === 'exito'"
          [class.bg-white]="aviso.tipo === 'error'"
          [attr.role]="aviso.tipo === 'error' ? 'alert' : 'status'"
        >
          <span
            class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-lumina-tinta text-[11px] font-bold"
            [class.bg-red-600]="aviso.tipo === 'error'"
            [class.text-white]="aviso.tipo === 'error'"
            aria-hidden="true"
            >{{ aviso.tipo === 'exito' ? '✓' : '!' }}</span
          >
          <p class="flex-1">{{ aviso.mensaje }}</p>
          <button
            type="button"
            (click)="servicio.cerrar(aviso.id)"
            class="rounded-full px-1 text-base leading-none hover:bg-lumina-tinta/10"
            aria-label="Cerrar aviso"
          >
            ×
          </button>
        </div>
      }
    </div>
  `,
})
export class NotificacionesComponent {
  protected readonly servicio = inject(NotificacionesService);
}
