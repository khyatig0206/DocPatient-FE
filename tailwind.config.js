/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '100px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        mycolor: '#008e76',  
        buttoncolor: '#e6f9f6',
        buttoncolor2:'#00BD9D',
        textcolor:'#008e76'// Add custom color
      },
    },
  },
  plugins: [],
}

