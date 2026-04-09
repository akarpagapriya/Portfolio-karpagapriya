import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "bg-dark": "#050d18",
        "bg-light": "#f0f4f8",
        "surface-dark": "#0e1419",
        "surface-light": "#ffffff",
        primary: "#0a66c2",
        "primary-light": "#0952a0",
        accent: "#4fffb0",
        "accent-light": "#057642",
        "text-dark": "#e8edf2",
        "text-light": "#1a1a2e",
        "muted-dark": "#6b7f8e",
        "muted-light": "#56687a",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-dark":
          "linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)",
        "grid-light":
          "linear-gradient(rgba(10,102,194,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(10,102,194,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
    },
  },
  plugins: [],
};

export default config;
