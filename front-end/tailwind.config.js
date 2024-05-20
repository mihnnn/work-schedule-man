/** @type {import ('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    theme: {
      'sm': '640px',
      'md': '768px',
      'lg': '960px', // Set lg breakpoint to 960px
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [require("daisyui")],
}