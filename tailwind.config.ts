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
      borderWidth: {
        default: '2px',
      },
      borderColor: {
        default: '#EFEFEF',
      },
      borderRadius: {
        box: '2rem',
      },
      boxShadow: {
        default: '0px 4px 40px 0px rgba(0, 0, 0, 0.05)',
      },
      fontSize: {
        'title': 'var(--font-size-title)',
        'header-1': 'var(--font-size-header-1)',
        'header-2': 'var(--font-size-header-2)',
        'header-3': 'var(--font-size-header-3)',
        'subtitle': 'var(--font-size-subtitle)',
        'body-1': 'var(--font-size-body-1)',
        'body-2': 'var(--font-size-body-2)',
        'detail': 'var(--font-size-detail)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
