import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#000000",
          dark: "#0a0a0a",
          light: "#1a1a1a",
        },
        secondary: {
          DEFAULT: "#dc2626",
          light: "#ef4444",
          dark: "#b91c1c",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
        "gradient-secondary": "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",
        "gradient-mixed": "linear-gradient(135deg, #000000 0%, #dc2626 100%)",
      },
    },
  },
  plugins: [],
};
export default config;

