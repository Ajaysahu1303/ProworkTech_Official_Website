/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edf7f4',
          100: '#d1ebe3',
          400: '#316b62',
          500: '#325d4f',
          600: '#2a4e42',
          700: '#275146',
          750: '#223f36',
          800: '#082d21ff',
          900: '#12211c',
        },
        accent: {
          50: '#fff9db',
          100: '#fff3bf',
          500: '#fdd835',
          600: '#fbc02d',
          700: '#fedf46'
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
