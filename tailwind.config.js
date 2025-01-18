/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        "gray-dark": "#13141f",
      },
      fontFamily: {
        sans: ['Geist', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: []
};
