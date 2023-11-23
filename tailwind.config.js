/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      colors: {
        primary: "blue",
        secondary: "red",
        accent: "#ccc",
        muted: "#E5E7EB",
      }
      
    },
  },
  plugins: [],
}

