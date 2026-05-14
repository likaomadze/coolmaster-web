import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0F172A",
          foreground: "#FFFFFF"
        },
        cyan: {
          DEFAULT: "#06B6D4"
        },
        emerald: {
          DEFAULT: "#10B981"
        },
        warning: "#F59E0B",
        destructive: "#EF4444"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.10)",
        glow: "0 0 0 4px rgba(6, 182, 212, 0.16)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
