import { Component, computed, inject, signal } from '@angular/core';
import { Estudiante, EstudianteFormValue, NivelEscolar } from '../../core/models/estudiante.model';
import { mensajeDeError } from '../../core/http/mensaje-error';
import { NotificacionesService } from '../../shared/services/notificaciones.service';
import { EstudiantesService } from './estudiantes.service';
import { GRADOS_POR_NIVEL, NIVELES } from './estudiantes.constants';
import { EstudiantesFiltrosComponent, OpcionFiltro } from './components/estudiantes-filtros/estudiantes-filtros.component';
import { EstudiantesTablaComponent } from './components/estudiantes-tabla/estudiantes-tabla.component';
import { EstudianteFormModalComponent } from './components/estudiante-form-modal/estudiante-form-modal.component';
import { ConfirmarEliminarModalComponent } from './components/confirmar-eliminar-modal/confirmar-eliminar-modal.component';

/**
 * CONTENEDOR de la vista Gestión de Estudiantes.
 * Es el único que habla con EstudiantesService y NotificacionesService.
 * Guarda el estado en signals y se lo pasa a los componentes hijos.
 */
@Component({
  selector: 'app-gestion-estudiantes',
  standalone: true,
  imports: [EstudiantesFiltrosComponent, EstudiantesTablaComponent, EstudianteFormModalComponent, ConfirmarEliminarModalComponent],
  templateUrl: './gestion-estudiantes.component.html',
})
export class GestionEstudiantesComponent {
  private readonly estudiantesService = inject(EstudiantesService);
  private readonly notificaciones = inject(NotificacionesService);

  // ---- Datos ----
  protected readonly estudiantes = signal<Estudiante[]>([]);
  protected readonly cargando = signal(true);
  protected readonly errorCarga = signal<string | null>(null);

  // ---- Filtros ----
  protected readonly textoBusqueda = signal('');
  protected readonly nivelSeleccionado = signal<NivelEscolar | 'Todos'>('Todos');
  protected readonly gradoSeleccionado = signal<string | null>(null);

  protected readonly hayFiltros = computed(
    () => this.textoBusqueda().trim() !== '' || this.nivelSeleccionado() !== 'Todos' || this.gradoSeleccionado() !== null,
  );

  /** Chips de nivel con la cantidad de estudiantes de cada uno. */
  protected readonly opcionesNivel = computed<OpcionFiltro<NivelEscolar | 'Todos'>[]>(() => {
    const lista = this.estudiantes();
    return [
      { valor: 'Todos', etiqueta: 'Todos', cantidad: lista.length },
      ...NIVELES.map((nivel) => ({ valor: nivel, etiqueta: nivel, cantidad: lista.filter((e) => e.nivel === nivel).length })),
    ];
  });

  /** Chips de aula: solo las del nivel elegido que tienen estudiantes, en el orden oficial. */
  protected readonly opcionesGrado = computed<OpcionFiltro<string>[]>(() => {
    const nivel = this.nivelSeleccionado();
    if (nivel === 'Todos') return [];
    const delNivel = this.estudiantes().filter((e) => e.nivel === nivel);
    return GRADOS_POR_NIVEL[nivel]
      .map((grado) => ({ valor: grado, etiqueta: grado, cantidad: delNivel.filter((e) => e.grado === grado).length }))
      .filter((opcion) => opcion.cantidad > 0);
  });

  /** Se recalcula solo cuando cambian la lista, el texto, el nivel o el aula. */
  protected readonly estudiantesFiltrados = computed(() => {
    const texto = this.normalizar(this.textoBusqueda().trim());
    const nivel = this.nivelSeleccionado();
    const grado = this.gradoSeleccionado();
    return this.estudiantes()
      .filter((e) => nivel === 'Todos' || e.nivel === nivel)
      .filter((e) => grado === null || e.grado === grado)
      .filter(
        (e) =>
          texto === '' ||
          [e.nombreCompleto, e.correo, e.documento, e.representante, e.grado].some((campo) => this.normalizar(campo).includes(texto)),
      )
      .sort((a, b) => a.nombreCompleto.localeCompare(b.nombreCompleto, 'es'));
  });

  protected readonly resumen = computed(() => {
    const lista = this.estudiantesFiltrados();
    return { total: lista.length, activos: lista.filter((e) => e.estado === 'Activo').length };
  });

  // ---- Modales ----
  protected readonly modalFormularioAbierto = signal(false);
  protected readonly estudianteEnEdicion = signal<Estudiante | null>(null);
  protected readonly guardando = signal(false);
  protected readonly errorGuardado = signal<string | null>(null);
  protected readonly estudianteAEliminar = signal<Estudiante | null>(null);
  protected readonly eliminando = signal(false);

  constructor() {
    this.cargarEstudiantes();
  }

  protected cargarEstudiantes(): void {
    this.cargando.set(true);
    this.errorCarga.set(null);
    this.estudiantesService.listar().subscribe({
      next: (lista) => {
        this.estudiantes.set(lista);
        this.cargando.set(false);
      },
      error: (error) => {
        this.errorCarga.set(mensajeDeError(error, 'cargar el listado'));
        this.cargando.set(false);
      },
    });
  }

  // ---- Filtros ----
  protected cambiarNivel(nivel: NivelEscolar | 'Todos'): void {
    this.nivelSeleccionado.set(nivel);
    this.gradoSeleccionado.set(null);
  }

  protected limpiarFiltros(): void {
    this.textoBusqueda.set('');
    this.nivelSeleccionado.set('Todos');
    this.gradoSeleccionado.set(null);
  }

  // ---- Crear / editar ----
  protected abrirCrear(): void {
    this.estudianteEnEdicion.set(null);
    this.errorGuardado.set(null);
    this.modalFormularioAbierto.set(true);
  }

  protected abrirEditar(estudiante: Estudiante): void {
    this.estudianteEnEdicion.set(estudiante);
    this.errorGuardado.set(null);
    this.modalFormularioAbierto.set(true);
  }

  protected cerrarFormulario(): void {
    this.modalFormularioAbierto.set(false);
    this.estudianteEnEdicion.set(null);
    this.errorGuardado.set(null);
  }

  protected guardarEstudiante(datos: EstudianteFormValue): void {
    const enEdicion = this.estudianteEnEdicion();
    this.guardando.set(true);
    this.errorGuardado.set(null);

    const operacion = enEdicion
      ? this.estudiantesService.actualizar(enEdicion.id, datos)
      : this.estudiantesService.crear(datos);

    operacion.subscribe({
      next: (guardado) => {
        // Actualización local con la respuesta del backend: sin volver a pedir toda la lista.
        this.estudiantes.update((lista) =>
          enEdicion ? lista.map((e) => (e.id === guardado.id ? guardado : e)) : [...lista, guardado],
        );
        this.guardando.set(false);
        this.cerrarFormulario();
        this.notificaciones.exito(enEdicion ? `Se guardaron los cambios de ${guardado.nombreCompleto}.` : `${guardado.nombreCompleto} se agregó a ${guardado.grado}.`);
      },
      error: (error) => {
        this.guardando.set(false);
        this.errorGuardado.set(mensajeDeError(error, enEdicion ? 'guardar los cambios' : 'crear el estudiante'));
      },
    });
  }

  // ---- Eliminar ----
  protected pedirConfirmacionEliminar(estudiante: Estudiante): void {
    this.estudianteAEliminar.set(estudiante);
  }

  protected cancelarEliminar(): void {
    this.estudianteAEliminar.set(null);
  }

  protected confirmarEliminar(): void {
    const estudiante = this.estudianteAEliminar();
    if (!estudiante) return;
    this.eliminando.set(true);
    this.estudiantesService.eliminar(estudiante.id).subscribe({
      next: () => {
        this.estudiantes.update((lista) => lista.filter((e) => e.id !== estudiante.id));
        this.eliminando.set(false);
        this.estudianteAEliminar.set(null);
        this.notificaciones.exito(`${estudiante.nombreCompleto} se eliminó del listado.`);
      },
      error: (error) => {
        this.eliminando.set(false);
        this.estudianteAEliminar.set(null);
        this.notificaciones.error(mensajeDeError(error, 'eliminar al estudiante'));
      },
    });
  }

  /** Búsqueda sin distinguir mayúsculas ni tildes: "maria" encuentra "María". */
  private normalizar(texto: string): string {
    return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }
}
