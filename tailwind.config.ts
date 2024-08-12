import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'var(--font-ibm-plex-sans-thai)',
          ...fontFamily.sans,
        ],
        inter: ['var(--font-inter)', ...fontFamily.sans],
        thai: ['var(--font-ibm-plex-sans-thai)', ...fontFamily.sans],
      },
      borderRadius: {
        box: '2rem',
      },
      colors: {
        carmine: {
          50: 'hsl(var(--esc-carmine-50))',
          100: 'hsl(var(--esc-carmine-100))',
          200: 'hsl(var(--esc-carmine-200))',
          300: 'hsl(var(--esc-carmine-300))',
          400: 'hsl(var(--esc-carmine-400))',
          500: 'hsl(var(--esc-carmine-500))',
          600: 'hsl(var(--esc-carmine-600))',
          700: 'hsl(var(--esc-carmine-700))',
          800: 'hsl(var(--esc-carmine-800))',
          900: 'hsl(var(--esc-carmine-900))',
        },
        primary: {
          DEFAULT: 'hsl(var(--esc-carmine-500))',
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
export default config
