import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05070a",
          900: "#0a0f16",
          850: "#0d141d",
          800: "#111a25",
          700: "#1a2734"
        },
        leaf: {
          50: "#ecfdf3",
          100: "#d1fadf",
          200: "#a6f4c5",
          300: "#6ce9a6",
          400: "#32d583",
          500: "#12b76a",
          600: "#039855",
          700: "#027a48"
        },
        mint: "#7ff0c0"
      },
      fontFamily: {
        display: ["var(--font-sora)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-manrope)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        tightest: "-0.04em"
      },
      keyframes: {
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" }
        },
        "dash": {
          to: { strokeDashoffset: "0" }
        }
      },
      animation: {
        "spin-slow": "spin-slow 40s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
