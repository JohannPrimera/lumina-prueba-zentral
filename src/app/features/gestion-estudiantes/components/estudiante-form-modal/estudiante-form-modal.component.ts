import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, inject, ChangeDetectionStrategy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Estudiante, EstadoEstudiante, EstudianteFormValue, NivelEscolar } from '../../../../core/models/estudiante.model';
import { calcularEdad, hoyIso } from '../../../../core/utils/fechas';
import { EstudiantesService } from '../../estudiantes.service';
import { GRADOS_POR_NIVEL, NIVELES } from '../../estudiantes.constants';
import {
  PATRON_DOCUMENTO,
  PATRON_SOLO_LETRAS,
  PATRON_TELEFONO,
  correoDisponible,
  edadAcordeAlNivel,
  fechaNoFutura,
  nombreYApellido,
  sinEspaciosVacios,
} from '../../validators/estudiante.validators';

type Campo = keyof EstudianteFormValue;

/** Mensajes por campo y por tipo de error. Lo que no esté acá usa MENSAJES_GENERALES. */
const MENSAJES: Partial<Record<Campo, Record<string, string>>> = {
  nombreCompleto: {
    pattern: 'Use solo letras y espacios.',
    nombreYApellido: 'Ingrese al menos un nombre y un apellido.',
    minlength: 'Debe tener al menos 5 caracteres.',
  },
  documento: { pattern: 'Solo números, entre 6 y 10 dígitos.' },
  fechaNacimiento: { fechaFutura: 'La fecha no puede ser posterior a hoy.' },
  grado: { required: 'Elija el aula del estudiante.' },
  correo: {
    email: 'Ingrese un correo con formato válido, por ejemplo nombre@colegio.edu.',
    correoEnUso: 'Ese correo ya está registrado para otro estudiante.',
  },
  representante: {
    pattern: 'Use solo letras y espacios.',
    nombreYApellido: 'Ingrese nombre y apellido del representante.',
  },
  telefonoRepresentante: { pattern: 'Ingrese un teléfono válido: 7 a 15 dígitos, puede usar guiones.' },
};

const MENSAJES_GENERALES: Record<string, string> = {
  required: 'Este campo es obligatorio.',
  soloEspacios: 'No puede contener solo espacios.',
  maxlength: 'Es demasiado largo.',
};

@Component({
  selector: 'app-estudiante-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './estudiante-form-modal.component.html',
})
export class EstudianteFormModalComponent implements OnChanges {
  @Input() abierto = false;
  @Input() estudiante: Estudiante | null = null;
  @Input() guardando = false;
  /** Error devuelto por el backend al guardar (por ejemplo, 409 correo repetido). */
  @Input() errorServidor: string | null = null;
  @Output() guardar = new EventEmitter<EstudianteFormValue>();
  @Output() cancelar = new EventEmitter<void>();

  private readonly fb = inject(FormBuilder);
  private readonly estudiantesService = inject(EstudiantesService);

  protected readonly niveles = NIVELES;
  protected readonly fechaMaxima = hoyIso();

  protected readonly formulario = this.fb.nonNullable.group(
    {
      nombreCompleto: ['', [Validators.required, sinEspaciosVacios, Validators.minLength(5), Validators.maxLength(80), Validators.pattern(PATRON_SOLO_LETRAS), nombreYApellido]],
      documento: ['', [Validators.required, Validators.pattern(PATRON_DOCUMENTO)]],
      fechaNacimiento: ['', [Validators.required, fechaNoFutura]],
      nivel: ['Primaria' as NivelEscolar, Validators.required],
      grado: ['', Validators.required],
      correo: [
        '',
        {
          validators: [Validators.required, Validators.email, Validators.maxLength(100)],
          asyncValidators: [
            correoDisponible(
              (correo) => this.estudiantesService.buscarPorCorreo(correo),
              () => this.estudiante?.id ?? null,
            ),
          ],
        },
      ],
      representante: ['', [Validators.required, sinEspaciosVacios, Validators.maxLength(80), Validators.pattern(PATRON_SOLO_LETRAS), nombreYApellido]],
      telefonoRepresentante: ['', [Validators.required, Validators.pattern(PATRON_TELEFONO)]],
      estado: ['Activo' as EstadoEstudiante, Validators.required],
    },
    { validators: edadAcordeAlNivel },
  );

  constructor() {
    // Selects dependientes: al cambiar el nivel, el aula elegida deja de valer
    // ("3.° B" de Primaria no es "3.° B" de Bachillerato) y hay que volver a elegirla.
    this.formulario.controls.nivel.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.formulario.controls.grado.setValue('');
    });
  }

  ngOnChanges(cambios: SimpleChanges): void {
    if (cambios['estudiante'] || cambios['abierto']) {
      if (this.estudiante) {
        const { id, ...datos } = this.estudiante;
        this.formulario.reset(datos);
      } else {
        this.formulario.reset();
      }
    }
    if (cambios['abierto']?.currentValue === true) {
      setTimeout(() => document.getElementById('campo-nombreCompleto')?.focus());
    }
  }

  @HostListener('document:keydown.escape')
  protected alPresionarEscape(): void {
    if (this.abierto && !this.guardando) this.cerrar();
  }

  protected get esEdicion(): boolean {
    return this.estudiante !== null;
  }

  protected get gradosDisponibles(): string[] {
    return GRADOS_POR_NIVEL[this.formulario.controls.nivel.value];
  }

  protected get edadCalculada(): number | null {
    return calcularEdad(this.formulario.controls.fechaNacimiento.value);
  }

  /** En edición, "Guardar" se habilita solo si el usuario cambió algo. */
  protected get sinCambios(): boolean {
    return this.esEdicion && this.formulario.pristine;
  }

  /** Primer mensaje de error del campo, solo cuando el usuario ya interactuó con él. */
  protected error(campo: Campo): string | null {
    const control = this.formulario.controls[campo];
    if (!(control.touched || control.dirty)) return null;

    if (control.errors) {
      const clave = Object.keys(control.errors)[0];
      return MENSAJES[campo]?.[clave] ?? MENSAJES_GENERALES[clave] ?? 'Revise este campo.';
    }

    if (campo === 'fechaNacimiento') {
      const rango = this.formulario.errors?.['edadFueraDeRango'] as
        | { edad: number; min: number; max: number; nivel: NivelEscolar }
        | undefined;
      if (rango) {
        return `Para ${rango.nivel} la edad debe estar entre ${rango.min} y ${rango.max} años (tiene ${rango.edad}).`;
      }
    }
    return null;
  }

  protected enviar(): void {
    if (this.formulario.invalid || this.formulario.pending) {
      this.formulario.markAllAsTouched();
      return;
    }
    const valor = this.formulario.getRawValue();
    this.guardar.emit({
      ...valor,
      nombreCompleto: valor.nombreCompleto.trim().replace(/\s+/g, ' '),
      representante: valor.representante.trim().replace(/\s+/g, ' '),
      correo: valor.correo.trim().toLowerCase(),
      telefonoRepresentante: valor.telefonoRepresentante.trim(),
    });
  }

  protected cerrar(): void {
    this.cancelar.emit();
  }
}
