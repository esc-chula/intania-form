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
        header: [
          '36px',
          {
            fontWeight: '700',
            lineHeight: '48px',
          },
        ],
        title1: '24px',
        title2: '20px',
        subtitle: '18px',
        body: '16px',
        detail: '14px',
        smallest: '12px',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
