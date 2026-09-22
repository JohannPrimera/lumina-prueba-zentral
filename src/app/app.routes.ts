import { Routes } from '@angular/router';

/**
 * Rutas de la aplicación.
 *
 *  /                         → Landing (modo Niño / modo Docente)
 *  /docente                  → Panel del docente (layout con navegación)
 *  /docente/estudiantes      → Gestión de Estudiantes (Fase 2 · CRUD)
 *
 * Cada pantalla se carga de forma diferida (lazy loading con loadComponent):
 * quien entra a la landing no descarga el código del panel, y viceversa.
 */
export const routes: Routes = [
  {
    path: '',
    title: 'Lúmina · Aprender jugando',
    loadComponent: () => import('./features/landing/landing.component').then((m) => m.LandingComponent),
  },
  {
    path: 'docente',
    loadComponent: () =>
      import('./layout/panel-docente-layout/panel-docente-layout.component').then((m) => m.PanelDocenteLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'estudiantes' },
      {
        path: 'estudiantes',
        title: 'Lúmina · Gestión de estudiantes',
        loadComponent: () =>
          import('./features/gestion-estudiantes/gestion-estudiantes.component').then((m) => m.GestionEstudiantesComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
