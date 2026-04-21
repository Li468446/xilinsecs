import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        border: "hsl(var(--border))",
        primary: "hsl(var(--primary))",
        primaryForeground: "hsl(var(--primary-foreground))",
        accent: "hsl(var(--accent))",
        accentForeground: "hsl(var(--accent-foreground))",
        card: "hsl(var(--card))",
        cardForeground: "hsl(var(--card-foreground))",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(9, 20, 46, 0.12)",
        glass: "0 20px 70px rgba(15, 23, 42, 0.16)",
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;

