/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Readex Pro", "sans-serif"],
      },
      colors: {
        deepBlue: "#000829",
        lessDeepBlue: "#10193b",
        logoOrange: "#fd9d03",
        elementBlack: "#121212",
        elementGray: "#1d1e20",
        elementLightGray: "#f9fafb",
        darkBackground: "#262626",
        lightBackground: "#f0f0f0",
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1240px",
      dxl: "1440px",
    },
  },
  plugins: [],
};
