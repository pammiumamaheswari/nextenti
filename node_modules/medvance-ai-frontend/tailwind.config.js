/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#102A43',
          dark: '#0B1C2D',
          teal: '#0F766E',
          tealHover: '#0D655E',
          mint: '#DFF7F2',
          mintLight: '#F0FDF9',
          cyan: '#38BDF8',
          emerald: '#10B981',
          slate: '#486581',
          lightBg: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(16, 42, 67, 0.06)',
        'premium': '0 10px 30px -10px rgba(16, 42, 67, 0.12)',
        'glow': '0 0 20px rgba(15, 118, 110, 0.15)'
      }
    },
  },
  plugins: [],
}
