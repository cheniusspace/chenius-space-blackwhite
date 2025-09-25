import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        chenius: {
          black: '#000000',
          white: '#FFFFFF',
          gray: {
            100: '#F1F1F1',
            200: '#E1E1E1',
            300: '#C8C8C9',
            400: '#888888',
            500: '#555555',
            600: '#333333',
            700: '#222222',
            800: '#111111'
          }
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        rich_black: {
          50: '#E6E8EB',
          100: '#C0C5CC',
          200: '#97A0AB',
          300: '#6D7A8A',
          400: '#4A5A6D',
          500: '#1A1B26',
          600: '#15161E',
          700: '#101117',
          800: '#0A0B0F',
          900: '#050608',
        },
        paynes_gray: {
          50: '#E6E8EB',
          100: '#C0C5CC',
          200: '#97A0AB',
          300: '#6D7A8A',
          400: '#4A5A6D',
          500: '#1A1B26',
          600: '#15161E',
          700: '#101117',
          800: '#0A0B0F',
          900: '#050608',
        },
        platinum: {
          50: '#FFFFFF',
          100: '#F5F5F5',
          200: '#EBEBEB',
          300: '#E0E0E0',
          400: '#D6D6D6',
          500: '#E5E4E2',
          600: '#B8B8B8',
          700: '#8A8A8A',
          800: '#5C5C5C',
          900: '#2E2E2E',
        },
        rich_black_alt: {
          50: '#E6E8EB',
          100: '#C0C5CC',
          200: '#97A0AB',
          300: '#6D7A8A',
          400: '#4A5A6D',
          500: '#1A1B26',
          600: '#15161E',
          700: '#101117',
          800: '#0A0B0F',
          900: '#050608',
        },
        space_cadet: {
          50: '#E6E8EB',
          100: '#C0C5CC',
          200: '#97A0AB',
          300: '#6D7A8A',
          400: '#4A5A6D',
          500: '#1A1B26',
          600: '#15161E',
          700: '#101117',
          800: '#0A0B0F',
          900: '#050608',
        },
        cs: {
          blue: {
            100: '#edeff9',
            200: '#d2d8f0',
            300: '#b7c1e7',
            400: '#8293d6',
            500: '#4d65c6',
            600: '#455bb2',
            700: '#2e3c76',
            800: '#222d58',
            900: '#171e3b',
          },
          pink: {
            100: '#fcf2f4',
            200: '#f9e0e6',
            300: '#f6cdd7',
            400: '#f2a9ba',
            500: '#ee8691',
            600: '#d7788d',
            700: '#8f505e',
            800: '#6b3c47',
            900: '#47272f',
          },
          purple: {
            100: '#f3f5fc',
            200: '#e7eaf9',
            300: '#cbd3f1',
            400: '#acb8e7',
            500: '#8697da',
            600: '#4d65c6',
            700: '#334db2',
            800: '#293e94',
            900: '#1c2b69',
          },
          gray: {
            100: '#f7f8f9',
            200: '#e1e5e9',
            300: '#c7cdd3',
            400: '#9aa0a6',
            500: '#5f6368',
            600: '#3c4043',
            700: '#202124',
            800: '#171717',
            900: '#0a0a0a',
          }
        }
      },
      borderRadius: {
        lg: '0',
        md: '0',
        sm: '0',
        none: '0',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'orbit': {
          '0%': {
            transform: 'translate(0, 0) scale(1)'
          },
          '25%': {
            transform: 'translate(10px, -10px) scale(1.1)'
          },
          '50%': {
            transform: 'translate(0, -20px) scale(1)'
          },
          '75%': {
            transform: 'translate(-10px, -10px) scale(1.1)'
          },
          '100%': {
            transform: 'translate(0, 0) scale(1)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'orbit': 'orbit 3s ease-in-out infinite'
      },
      fontSize: {
        'xs': ['0.7rem', { lineHeight: '1.125rem' }],
        'sm': ['0.8rem', { lineHeight: '1.35rem' }],
        'base': ['1rem', { lineHeight: '1.53rem' }],
        'lg': ['1.0125rem', { lineHeight: '1.62rem' }],
        'xl': ['1.125rem', { lineHeight: '1.71rem' }],
        '2xl': ['1.35rem', { lineHeight: '1.8rem' }],
        '3xl': ['1.6875rem', { lineHeight: '2.025rem' }],
        '4xl': ['2.025rem', { lineHeight: '2.16rem' }],
        '5xl': ['2.7rem', { lineHeight: '1.035' }],
        '6xl': ['3.375rem', { lineHeight: '0.9' }],
        '7xl': ['4.05rem', { lineHeight: '0.9' }],
        '8xl': ['5.4rem', { lineHeight: '0.9' }],
        '9xl': ['7.2rem', { lineHeight: '0.9' }],
        '10xl': ['9rem', { lineHeight: '0.9' }],
        '12xl': ['10.8rem', { lineHeight: '0.9' }],
        '14xl': ['12.6rem', { lineHeight: '0.9' }],
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.01em',
        'wider': '0.02em',
        'widest': '0.05em',
      },
      lineHeight: {
        'none': '1',
        'tight': '1.15',
        'snug': '1.3',
        'normal': '1.5',
        'relaxed': '1.7',
        'loose': '2',
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  corePlugins: {
    preflight: false,
  },
  important: true,
  safelist: [
    'tracking-wide'
  ]
} satisfies Config;
