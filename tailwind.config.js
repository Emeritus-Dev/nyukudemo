/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nyuku: {
          dark: '#070B16',
          surface: '#0F172A',
          gold: '#F59E0B',
          orange: '#FF5A1F',
        },
      },
      fontFamily: {
        sans: ['"Pirata One"', '"UnifrakturMaguntia"', 'cursive', 'serif'],
        gothic: ['"Pirata One"', '"UnifrakturMaguntia"', 'cursive', 'serif'],
      },
    },
  },
  plugins: [],
}