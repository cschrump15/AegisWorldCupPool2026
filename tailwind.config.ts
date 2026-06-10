import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          900: '#1B2B6B',
          800: '#1f3278',
          700: '#243a8a',
          600: '#2a4499',
          500: '#3554b8',
        },
        orange: {
          500: '#F5A800',
          400: '#FFBE33',
          300: '#FFD166',
        },
      },
    },
  },
  plugins: [],
}

export default config
