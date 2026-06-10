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
          900: '#1a1a1a',
          800: '#242424',
          700: '#2e2e2e',
          600: '#3a3a3a',
          500: '#4a4a4a',
        },
        orange: {
          500: '#f97316',
          400: '#fb923c',
          300: '#fdba74',
        },
      },
      fontFamily: {
        display: ['Barlow Condensed', 'sans-serif'],
        sans: ['Barlow', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
