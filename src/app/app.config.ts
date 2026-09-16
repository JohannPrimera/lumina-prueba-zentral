import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { estudiantesFakeBackendInterceptor } from './features/gestion-estudiantes/data/estudiantes-fake-backend.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      // Permite que los enlaces #modulos, #comunidad… de la landing hagan scroll
      // y que al cambiar de página se vuelva arriba.
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
    // ETAPA DE DATA FAKE: el interceptor responde /api/estudiantes en memoria.
    // Integración con Zentral: quitar estudiantesFakeBackendInterceptor y
    // proveer API_URL con la URL real. Nada más cambia.
    provideHttpClient(withInterceptors([estudiantesFakeBackendInterceptor])),
  ],
};
