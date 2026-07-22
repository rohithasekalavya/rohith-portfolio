/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080808",
        secondary: "#111111",
        accent: "#ffffff",
      },
      fontFamily: {
        space: ["'Space Grotesk'", "sans-serif"],
        satoshi: ["'Satoshi'", "sans-serif"],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
}
