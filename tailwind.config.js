/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      'articulat': ['Articulat', 'ui-sans-serif', 'sans-serif'],
      'articulat-bold': ['ArticulatBold', 'ui-sans-serif', 'sans-serif'],
      'articulat-light': ['ArticulatLight', 'ui-sans-serif', 'sans-serif'],
      'articulat-oblique': ['ArticulatOblique', 'ui-sans-serif', 'sans-serif'],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
