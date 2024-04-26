/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'outfit': ['outfit', 'sans-serif'],
        'mdMed': ['mdMed', 'sans-serif'],
        'mdReg': ['mdReg', 'sans-serif'],
        'mdSemi': ['mdSemi', 'sans-serif'],
        'mdBold': ['mdBold', 'sans-serif'],
        'BrandFont': ['BrandFont', 'sans-serif'],
        'afacad': ['afacad', 'sans-serif'],
        'kanit': ['kanit', 'sans-serif'],
      },
    },
  },
  plugins: [import('@tailwindcss/forms'),],
}

