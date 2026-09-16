# Lúmina · Prueba técnica Zentral

Una sola aplicación Angular que junta las dos fases de la prueba:

| Ruta | Pantalla | Fase |
|---|---|---|
| `/` | Landing institucional («Aprender jugando») | Fase 1 · diseño |
| `/docente/estudiantes` | Panel del docente → Gestión de Estudiantes (CRUD) | Fase 2 · desarrollo |

Desde la landing se entra al panel por **Panel docente** (header y footer), la
tarjeta **Docentes → Abrir panel docente** o el botón **Probar el panel
docente**. Desde el panel se vuelve con **Volver al sitio**.

## Requisitos

- Node ^22.22.3, ^24.15.0 o ≥26.0.0 (lo que pide Angular CLI 22)
- npm ≥8

## Cómo correrlo

```bash
npm install
npm start
```

Abre en `http://localhost:4200`.

Otros comandos:

```bash
npm run build   # build de producción → dist/zentral-gestion-estudiantes
npm run watch   # build de desarrollo en watch mode
```

No hay test runner configurado (sin Karma/Jasmine ni specs) — `ng test` no aplica.

## Estructura

```
src/app/
├── app.routes.ts               → rutas con lazy loading (loadComponent)
├── app.config.ts               → provideRouter + scroll a anclas (#modulos…)
├── core/models/                → tipos compartidos (Estudiante, etc.)
├── shared/components/
│   └── lumina-logo/            → logo reutilizado en landing y panel
├── layout/
│   └── panel-docente-layout/   → carcasa del panel: menú lateral + <router-outlet>
└── features/
    ├── landing/                → FASE 1
    │   ├── landing.component.ts        → contenedor: arma secciones, habla con el service
    │   ├── landing.models.ts           → interfaces del contenido
    │   ├── data/landing.content.ts     → todos los textos (separados del HTML)
    │   ├── solicitud-demo.service.ts   → envío simulado del formulario de demo
    │   └── components/                 → secciones presentacionales (@Input/@Output)
    │       ├── landing-header/  hero-section/  pilares-section/
    │       ├── modulos-section/ panel-preview/ comunidad-section/
    │       └── testimonio-section/ implementacion-section/ demo-cta-section/ landing-footer/
    └── gestion-estudiantes/    → FASE 2
        ├── gestion-estudiantes.component.ts → CONTENEDOR: estado con signals
        ├── estudiantes.service.ts           → HttpClient contra `${API_URL}/estudiantes`
        ├── estudiantes.constants.ts         → niveles, aulas por nivel, rangos de edad
        ├── validators/                      → validadores sync, async y cruzados
        ├── data/
        │   ├── estudiantes-fake-data.ts                → 14 estudiantes de ejemplo
        │   └── estudiantes-fake-backend.interceptor.ts → backend simulado (GET/POST/PUT/DELETE)
        └── components/
            ├── estudiantes-filtros/         → buscador + chips de nivel y aula
            ├── estudiantes-tabla/           → solo pinta filas
            ├── estudiante-form-modal/       → Reactive Form de alta/edición
            └── confirmar-eliminar-modal/    → confirmación de borrado
```

## Criterios del brief

**1. Componentes desacoplados.** Patrón contenedor / presentacional en las dos
fases. `LandingComponent` y `GestionEstudiantesComponent` guardan el estado y hablan
con los services; las secciones, los filtros, la tabla y los modales reciben
datos por `@Input()` y avisan por `@Output()`. (El formulario solo usa el
service para la validación asíncrona del correo.)

**2. Reactive Forms.** `FormBuilder` tipado (`nonNullable`) con validadores
nativos, propios (`validators/estudiante.validators.ts`), asíncronos (correo
único) y cruzados a nivel de grupo (edad acorde al nivel), más selects
dependientes. También en el formulario de demostración del hero.

**3. Separación de responsabilidades.** Textos y datos de ejemplo en `data/`,
tipos en `models`, reglas en `constants` y `validators`, acceso HTTP en services,
simulación del backend en un interceptor, estado en contenedores, presentación en
componentes hijos. Los colores de marca viven como tokens en
`tailwind.config.js` (`lumina-tinta`, `lumina-violeta`, `lumina-lima`…).

## Data fake y cambio a datos reales

La vista ya usa `HttpClient`. En la etapa de data fake, las peticiones a
`/api/estudiantes` las responde `estudiantesFakeBackendInterceptor` en memoria,
con latencia y códigos reales (200, 201, 204, 404, 409).

Para conectar los endpoints de Zentral:

```ts
// app.config.ts
provideHttpClient(withXhr() /* quitar withInterceptors([estudiantesFakeBackendInterceptor]) */),
{ provide: API_URL, useValue: 'https://<url-de-zentral>' },
```

Si el contrato usa otros nombres de campo, se mapea en `EstudiantesService`.
Ningún componente cambia.

## Alcance cubierto

- [x] Landing v4 en Angular, desktop + responsive (menú móvil).
- [x] Vista previa del panel con pestañas Cobros / Asistencia funcionales.
- [x] Formulario de solicitud de demo con validación y estado de envío.
- [x] Panel del docente con navegación (Estudiantes activo, otros módulos «Pronto»).
- [x] Tabla de estudiantes con aula, edad, documento, representante y estado.
- [x] Buscador en tiempo real (nombre, correo, documento, representante o aula; sin tildes).
- [x] Filtro rápido con chips por nivel y por aula (grado y sección), con cantidades.
- [x] Creación y edición con Reactive Forms: obligatorios, formato de correo,
      correo único (async), documento, teléfono, nombre y apellido, fecha no
      futura, edad acorde al nivel (validación cruzada), aula dependiente del nivel.
- [x] Mismo modal para crear y editar; "Guardar cambios" solo si hubo cambios.
- [x] Eliminación con modal de confirmación.
- [x] Estados de carga, error con reintento, vacío y avisos de éxito/error.
- [x] Backend simulado por interceptor HTTP con la misma forma que el real.
- [ ] Endpoints reales — pendiente de que Zentral los entregue.
