/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#C20202",
          black: "#000000",
          white: "#ffffff",
          gray: "#838383",
          accent: "#FF053F",
        },
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
        },
      },
    },
    plugins: [],
  }