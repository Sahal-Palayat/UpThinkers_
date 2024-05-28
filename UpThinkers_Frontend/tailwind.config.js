/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    
  ],
  theme: {
    extend: {
      colors:{
        customBlue:'#2F6177',
        customGreen:'#7BD654'
      },
    },
  },
  plugins: [],
}

