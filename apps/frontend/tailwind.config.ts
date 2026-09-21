import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#edf8f1',
          100: '#d5f0df',
          200: '#a6e0b8',
          300: '#74c993',
          400: '#4ca874',
          500: '#2d8d5d',
          600: '#226f49',
          700: '#1c573b',
          800: '#194b34',
          900: '#123a2b'
        },
        shell: {
          950: '#05080b',
          900: '#0b1016',
          800: '#131c28',
          700: '#1d2733'
        }
      },
      boxShadow: {
        soft: '0 22px 55px rgba(9, 18, 28, 0.42)'
      }
    }
  },
  plugins: []
};

export default config;
