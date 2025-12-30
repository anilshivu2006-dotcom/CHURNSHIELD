/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E50914', // Netflix Red
          dark: '#141414', // Netflix Background
          gray: '#2F2F2F',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'gradient-x': 'gradientX 15s ease infinite',
        'shine': 'shine 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientX: {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        shine: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' }
        }
      }
    }
  },
  plugins: [],
}