import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1180px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        graphite: "#101113",
        ice: "#f4f7fb",
        "lusa-red": "#ef4444",
        "neon-green": "#2df28c"
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem"
      },
      boxShadow: {
        "premium-red": "0 0 0 1px rgba(239,68,68,0.14), 0 18px 60px rgba(239,68,68,0.14)",
        "premium-green": "0 0 0 1px rgba(45,242,140,0.16), 0 18px 60px rgba(45,242,140,0.1)",
        panel: "0 18px 70px rgba(0,0,0,0.32)"
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono", "Fira Code", ...defaultTheme.fontFamily.mono],
        code: ["Fira Code", "JetBrains Mono", ...defaultTheme.fontFamily.mono]
      },
      keyframes: {
        "grid-pan": {
          "0%": { backgroundPosition: "0 0, 0 0" },
          "100%": { backgroundPosition: "64px 64px, -64px -64px" }
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.42" },
          "50%": { opacity: "0.76" }
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" }
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" }
        }
      },
      animation: {
        "grid-pan": "grid-pan 20s linear infinite",
        scan: "scan 8s linear infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        float: "float 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
} satisfies Config;
