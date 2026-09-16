import { InjectionToken } from '@angular/core';

/**
 * URL base del backend. Hoy apunta a `/api`, que responde el backend simulado
 * (ver estudiantes-fake-backend.interceptor.ts). En la integración se
 * sobreescribe con la URL real que entregue Zentral:
 *   { provide: API_URL, useValue: 'https://api.zentral…' }
 */
export const API_URL = new InjectionToken<string>('API_URL', {
  providedIn: 'root',
  factory: () => '/api',
});
