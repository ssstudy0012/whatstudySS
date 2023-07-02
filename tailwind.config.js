/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'Prompt': 'Prompt',
      },
      colors:{
        'hform':'#6F38C5',
        'htitle':'#87A2FB',
        'hun':'#ADDDD0',
      }
    },
  },
  plugins: [],
}
