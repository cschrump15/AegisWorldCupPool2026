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
          900: '#0d1b3e',
          800: '#112247',
          700: '#172d5a',
          600: '#1e3a6e',
          500: '#2a4d8f',
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
