/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      // Tokens de marca Lúmina (definidos en la Fase 1 · landing v4).
      // Usar siempre estos nombres en vez de hex sueltos.
      colors: {
        lumina: {
          fondo: '#F3F1FB', // fondo general lavanda
          tinta: '#241E3D', // texto principal y bordes
          noche: '#1B1436', // bloques oscuros
          violeta: '#5B3AE0', // acento primario
          lima: '#B4E61D', // acción / CTA
          'lima-claro': '#C9F047', // hover de CTA
          texto: '#463E68', // texto secundario
        },
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
