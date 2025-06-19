/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./client/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D32F2F',
        secondary: '#1D3557',
        background: '#FFFFFF',
        surface: '#F6F6F6',
        text: '#1A1A1A'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}