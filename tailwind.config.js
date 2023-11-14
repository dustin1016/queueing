/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mxl': '2000px',
        'sxl': '5000px'
      },
    },
  },
  plugins: [],
}

