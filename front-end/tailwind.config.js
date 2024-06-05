/** @type {import ('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Extend the default theme
      colors: {
        'custom-primary': '#1DA1F2', // example color
        'gray-400': '#9CA3AF',
        'gray-50': '#F9FAFB',
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
      backgroundColor: {
        'subtle': 'rgba(243, 244, 246, 0.1)',
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
    },
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.text-emphasis': {
          color: '#F3F4F6',
        },
        '.border-subtle': {
          borderColor: '#6B7280', // Fixed the color to be a valid hex
          'border-width': '1px',
        },
        // '.bg-active-tab': {
        //   backgroundColor: '#9CA3AF', // Tailwind's bg-gray-400 color
        //   opacity: '0.3',
        //   color: '#F9FAFB', // Tailwind's text-gray-50 color
        // },
      }
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}
