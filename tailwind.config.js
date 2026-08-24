/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
        led: ['var(--font-press-start)', 'cursive'],
        handwritten: ['var(--font-caveat)', 'cursive'],
      },
      colors: {
        dark: {
          900: '#09090b',
          800: '#121215',
          700: '#1c1c21',
          600: '#27272a',
        },
        brand: {
          orange: '#FF5722',
          neon: '#00E676',
          cyan: '#00E5FF',
          yellow: '#FFEA00',
          pink: '#FF007F',
        }
      }
    },
  },
  plugins: [],
}
