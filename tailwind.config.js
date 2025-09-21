/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '12px',
    },
    extend: {
      colors: {
        primary: '#0F62FE',
        secondary: 'rgb(71 85 105)',
        dark: '#1e293b',
        third: 'rgb(148 163 184)',
      },
      screens: {
        '2xl': '1320px',
      },
      spacing: {
        34: '132px',
        35: '136px',
      },
    },
  },
  plugins: [],
};
