/** @type {import ('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      // Extend the default theme
      colors: {
        'custom-primary': '#1DA1F2', // example color
      },
      borderRadius: {
        'custom': '0.375rem', // example radius
      },
      padding: {
        'btn-y': '0.25rem', // custom vertical padding
        'btn-x': '0.75rem', // custom horizontal padding
      },
      keyframes: {
        grow: {
          '0%': { opacity: 0, transform: 'scale(0.8)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        grow: 'grow 0.3s ease-in-out forwards',
      },
    },

  },
  plugins: [
    require("daisyui"),
    function ({ addComponents }) {
      addComponents({
        '.mini-btn': {
          '@apply bg-custom-primary text-white rounded-custom py-btn-y px-btn-x': {},
          '&:hover': {
            '@apply bg-blue-700': {},
          },
          '&:focus': {
            '@apply outline-none ring-2 ring-blue-500': {},
          },
          '&:active': {
            '@apply bg-blue-800': {},
          },
        },
      });
    }
  ],
}