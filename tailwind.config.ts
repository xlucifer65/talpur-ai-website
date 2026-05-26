import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background:           "var(--color-bg)",
        surface:              "var(--color-surface)",
        "text-primary":       "var(--color-text-primary)",
        "text-secondary":     "var(--color-text-secondary)",
        "accent-blue":        "var(--color-accent)",
        "accent-blue-hover":  "var(--color-accent-hover)",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        dm:   ["var(--font-dm-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
