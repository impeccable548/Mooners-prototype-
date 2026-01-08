/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellow-400': '#FACC15', // Mooners theme color
        'zinc-900': '#18181B',
      }
    },
  },
  plugins: [],
}
