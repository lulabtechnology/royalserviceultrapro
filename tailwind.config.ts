import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F9EAEA",
          100: "#F1CFCF",
          500: "#7E0D05",
          900: "#3B0603"
        },
        surface: "#CECDCD"
      }
    }
  },
  plugins: []
} satisfies Config;
