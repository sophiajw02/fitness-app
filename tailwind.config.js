/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#416E97',
        secondary: '#A8D0DC',
        tertiary: '#D9E7E8',
        focus: '#2D95F3',
        black: {
          DEFAULT: '#000000',
          100: '#333333',
          200: '#9DA5B2',
          300: '#667185',
        },
        white: {
          DEFAULT: '#FFFFFF',
          100: '#EDEFEE',
          200: '#929292'
        }
      }
    },
  },
  plugins: [],
}

