/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Vina Sans', 'sans-serif'],
        body: ['Saira Semi Condensed', 'sans-serif'],
      },
      colors: {
        'Purple': {
          50: "#F3F5FC",
          100: "#E7EAF9",
          200: "#CBD3F1",
          300: "#ACB8E7",
          400: "#8697DA",
          500: "#4D65C6",
          600: "#3B57C4",
          700: "#334DB2",
          800: "#293E94",
          900: "#1C2B69",
          950: "#0E1739"
        },
        'Pink': {
          50: "#FEF6F7",
          100: "#FCEDEF",
          200: "#F9D7DA",
          300: "#F6C0C6",
          400: "#F2A6AD",
          500: "#EE8691",
          600: "#EA6B78",
          700: "#E54857",
          800: "#D21D30",
          900: "#941521",
          950: "#701019"
        },
        'Dark': {
          50: "#F3F4F7",
          100: "#E7E8EE",
          200: "#C9CBD9",
          300: "#A8ACC2",
          400: "#787EA1",
          500: "#20222E",
          600: "#171921",
          700: "#171921",
          800: "#171921",
          900: "#000000",
          950: "#000000"
        },
        'chenius': {
          'black': '#000000',
          'white': '#FFFFFF',
          'gray': {
            '50': '#F8F9FA',
            '100': '#F1F3F5',
            '200': '#E9ECEF',
            '300': '#DEE2E6',
            '400': '#CED4DA',
            '500': '#ADB5BD',
            '600': '#868E96',
            '700': '#495057',
            '800': '#343A40',
            '900': '#212529',
          },
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}; 