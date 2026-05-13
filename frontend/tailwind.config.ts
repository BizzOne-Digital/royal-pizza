import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#0B0A08",
        "royal-red": "#8B1E16",
        gold: "#C99A3A",
        parchment: "#D8C49A",
        cream: "#F6E8C8",
        umber: "#4A321F",
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "Georgia", "serif"],
        body: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-shine":
          "linear-gradient(135deg, rgba(201,154,58,0.35) 0%, transparent 45%, rgba(201,154,58,0.2) 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 24px rgba(201, 154, 58, 0.35)",
        innerWarm: "inset 0 1px 0 rgba(246, 232, 200, 0.12)",
        exotic: "0 0 80px rgba(201, 154, 58, 0.12), 0 0 120px rgba(139, 30, 22, 0.08)",
      },
      keyframes: {
        "gold-shimmer": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.65", transform: "scale(1.04)" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "gold-shimmer": "gold-shimmer 8s linear infinite",
        float: "float 7s ease-in-out infinite",
        pulseGlow: "pulseGlow 5s ease-in-out infinite",
        "border-flow": "borderFlow 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
