/** Fecha local de hoy en formato ISO `yyyy-mm-dd`. */
export function hoyIso(hoy: Date = new Date()): string {
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

/** Años cumplidos a partir de una fecha ISO. Devuelve null si la fecha no es válida. */
export function calcularEdad(fechaIso: string | null | undefined, hoy: Date = new Date()): number | null {
  if (!fechaIso || !/^\d{4}-\d{2}-\d{2}$/.test(fechaIso)) return null;
  const [anio, mes, dia] = fechaIso.split('-').map(Number);
  let edad = hoy.getFullYear() - anio;
  const mesActual = hoy.getMonth() + 1;
  if (mesActual < mes || (mesActual === mes && hoy.getDate() < dia)) edad--;
  return edad;
}
