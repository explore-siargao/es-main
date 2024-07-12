import type { Config } from "tailwindcss"
// Color theme: https://www.color-hex.com/
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./common/**/*.{js,ts,jsx,tsx,mdx}",
    "./module/**/*.{js,ts,jsx,tsx,mdx}",
    "!./node_modules/**",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    extend: {
      colors: {
        primary: {
          50: "#f5fafa",
          100: "#ebf6f6",
          200: "#d7eeee",
          300: "#c4e5e6",
          400: "#b0ddde",
          500: "#9DD5D6",
          600: "#8dbfc0",
          700: "#6d9595",
          800: "#4e6a6b",
          900: "#2f3f40",
          950: "#1f2a2a",
        },
        secondary: {
          50: "#fef8e6",
          100: "#fef1ce",
          200: "#fee49e",
          300: "#fed76d",
          400: "#feca3d",
          500: "#febd0d",
          600: "#e4aa0b",
          700: "#b18409",
          800: "#7f5e06",
          900: "#4c3803",
          950: "#322502",
        },
        text: {
          50: "#eaeaea",
          100: "#d5d5d5",
          200: "#acacac",
          300: "#828282",
          400: "#595959",
          500: "#303030",
          600: "#2b2b2b",
          700: "#212121",
          800: "#181818",
          900: "#0e0e0e",
          950: "#090909",
        },
        error: {
          50: "#fdecec",
          100: "#fbdada",
          200: "#f7b5b6",
          300: "#f49091",
          400: "#f06b6d",
          500: "#ED4749",
          600: "#d53f41",
          700: "#a53133",
          800: "#762324",
          900: "#471515",
          950: "#2f0e0e",
        },
        success: {
          50: "#f1fdf6",
          100: "#e4fced",
          200: "#caf9db",
          300: "#aff6ca",
          400: "#95f3b8",
          500: "#7bf1a7",
          600: "#6ed896",
          700: "#56a874",
          800: "#3d7853",
          900: "#244832",
          950: "#183021",
        },
        warning: {
          50: "#fdf9f0",
          100: "#fcf4e1",
          200: "#fae9c3",
          300: "#f7dea5",
          400: "#f5d387",
          500: "#F3C969",
          600: "#dab45e",
          700: "#aa8c49",
          800: "#796434",
          900: "#483c1f",
          950: "#302815",
        },
        info: {
          50: "#e6f0f6",
          100: "#cee1ed",
          200: "#9ec3dc",
          300: "#6ea6ca",
          400: "#3e88b9",
          500: "#0E6BA8",
          600: "#0c6097",
          700: "#094a75",
          800: "#073554",
          900: "#042032",
          950: "#021521",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".text-stroke": {
          "-webkit-text-stroke": "1px  #7f7f7f",
        },
        ".text-stroke-2": {
          "-webkit-text-stroke": "2px  #7f7f7f",
        },
        ".text-stroke-white": {
          "-webkit-text-stroke": "1px white",
        },
        ".text-stroke-2-white": {
          "-webkit-text-stroke": "2px white",
        },
      }

      addUtilities(newUtilities, ["responsive", "hover"])
    },
  ],
}
export default config
