/** @type {import('tailwindcss').Config} */

const textShadow = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      colors: {
        caribbean: {
          DEFAULT: "#0ddea9",
          50: "#e9fff7",
          100: "#c9ffeb",
          200: "#98ffdc",
          300: "#57fecf",
          400: "#0ddea9",
          500: "#00d9a4",
          600: "#00b287",
          700: "#008e71",
          800: "#007059",
          900: "#005c4b",
          950: "#00342c",
        },
        harvest_gold: {
          DEFAULT: "#eca400",
          100: "#2f2100",
          200: "#5e4200",
          300: "#8d6300",
          400: "#bc8300",
          500: "#eca400",
          600: "#ffbd23",
          700: "#ffcd5a",
          800: "#ffde91",
          900: "#ffeec8",
        },
        cream: {
          DEFAULT: "#eaf8bf",
          100: "#3d4f09",
          200: "#7b9e12",
          300: "#b5e621",
          400: "#cfef70",
          500: "#eaf8bf",
          600: "#eef9cc",
          700: "#f2fbd8",
          800: "#f6fce5",
          900: "#fbfef2",
        },
        cerulean: {
          DEFAULT: "#006992",
          100: "#00151e",
          200: "#002a3b",
          300: "#004059",
          400: "#005576",
          500: "#006992",
          600: "#009edc",
          700: "#26c1ff",
          800: "#6ed6ff",
          900: "#b7eaff",
        },
        indigo_dye: {
          DEFAULT: "#27476e",
          100: "#080e16",
          200: "#0f1c2c",
          300: "#172a42",
          400: "#1f3858",
          500: "#27476e",
          600: "#3969a3",
          700: "#5e8dc7",
          800: "#94b3d9",
          900: "#c9d9ec",
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
    textShadow(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
