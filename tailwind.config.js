/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
  ],
  theme: {
    screens: {
      '2xl': { 'max': '2000px' },
      'xl': { 'max': '1279px' },
      'lg': { 'max': '1023px' },
      'md': { 'max': '767px' },
      'sm': { 'max': '639px' },
      'mobileAndTablet': { 'max': '800px' },
    },
    extend: {},
  },
  plugins: [],
}