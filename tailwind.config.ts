import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F3F1E9",
        ink: "#17181A",
        line: "rgba(23,24,26,0.12)",
        green: { DEFAULT: "#1F8A5F", tint: "#E4F1EA" },
        indigo: { DEFAULT: "#5B5BD6", tint: "#EBEBFA" },
        amber: { DEFAULT: "#C98A00", tint: "#FBF0D9" },
        coral: { DEFAULT: "#E0567C", tint: "#FBE7ED" },
        pink: { DEFAULT: "#D6559C", tint: "#FBE9F3" },
        red: { DEFAULT: "#C24444", tint: "#FBEAE9" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
