/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#0b0b0b",
        primary: "#ea580c",
        "primary-foreground": "#fef3c7",
        secondary: "#d4d4d8",
        "secondary-foreground": "#1a1a1a",
        card: "#fefefe",
        "card-foreground": "#3d3d3d",
        muted: "#f4f4f5",
        "muted-foreground": "#77777a",
        accent: "#f4f4f5",
        "accent-foreground": "#1a1a1a",
        destructive: "#ef4444",
        border: "#e5e7eb",
        input: "#e5e7eb",
        ring: "#ea580c",
        sidebar: "#fcfcfc",
        "sidebar-foreground": "#0b0b0b",
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        serif: "var(--font-serif)",
        mono: "var(--font-mono)",
      },
      boxShadow: {
        "2xs": "var(--shadow-2xs)",
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
      },
    },
  },
  plugins: [
    ({ addBase }) => {
      addBase({
        ":root": {
          "--radius": "0.65rem",
          "--background": "#ffffff",
          "--foreground": "#0b0b0b",
          "--card": "#fefefe",
          "--card-foreground": "#3d3d3d",
          "--primary": "#ea580c",
          "--primary-foreground": "#fef3c7",
          "--secondary": "#f4f4f5",
          "--secondary-foreground": "#1a1a1a",
          "--muted": "#f4f4f5",
          "--muted-foreground": "#77777a",
          "--accent": "#f4f4f5",
          "--accent-foreground": "#1a1a1a",
          "--destructive": "#ef4444",
          "--border": "#e5e7eb",
          "--input": "#e5e7eb",
          "--ring": "#ea580c",
          "--sidebar": "#fcfcfc",
          "--sidebar-foreground": "#0b0b0b",
          "--font-sans":
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
          "--font-serif":
            "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
          "--font-mono":
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          "--shadow-2xs": "0 1px 3px 0px hsl(0 0% 0% / 0.05)",
          "--shadow-xs": "0 1px 3px 0px hsl(0 0% 0% / 0.05)",
          "--shadow-sm":
            "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
          "--shadow":
            "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
          "--shadow-md":
            "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)",
          "--shadow-lg":
            "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)",
          "--shadow-xl":
            "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)",
          "--shadow-2xl": "0 1px 3px 0px hsl(0 0% 0% / 0.25)",
        },
        ".dark": {
          "--background": "#0b0b0b",
          "--foreground": "#fcfcfc",
          "--card": "#1a1a1a",
          "--card-foreground": "#fcfcfc",
          "--primary": "#ea580c",
          "--primary-foreground": "#fef3c7",
          "--secondary": "#252529",
          "--secondary-foreground": "#fcfcfc",
          "--muted": "#252529",
          "--muted-foreground": "#b2b2b5",
          "--accent": "#252529",
          "--accent-foreground": "#fcfcfc",
          "--destructive": "#dc2626",
          "--border": "rgba(255, 255, 255, 0.1)",
          "--input": "rgba(255, 255, 255, 0.15)",
          "--ring": "#ea580c",
          "--sidebar": "#1a1a1a",
          "--sidebar-foreground": "#fcfcfc",
        },
      });
    },
  ],
};