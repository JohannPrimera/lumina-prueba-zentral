import { Component, EventEmitter, Input, Output, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstadoSolicitudDemo } from '../../landing.models';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  /** Lo decide el contenedor (landing.component), que es quien habla con el service. */
  @Input() estadoSolicitud: EstadoSolicitudDemo = 'inicial';
  @Output() solicitarDemo = new EventEmitter<string>();

  private readonly fb = inject(FormBuilder);

  protected readonly formulario = this.fb.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
  });

  protected get correoInvalido(): boolean {
    const control = this.formulario.controls.correo;
    return control.invalid && (control.dirty || control.touched);
  }

  protected enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.solicitarDemo.emit(this.formulario.getRawValue().correo);
  }
}
