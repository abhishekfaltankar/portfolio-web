/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#0C0D0F',
          secondary: '#121417',
          elevated: '#181B20',
          hover: '#1F232A',
        },
        content: {
          primary: '#F1F0EA',
          secondary: '#A0A4AD',
          muted: '#747985',
        },
        edge: {
          DEFAULT: '#2A2E35',
          subtle: '#1C2026',
          bright: '#3D424D',
        },
        accent: {
          DEFAULT: '#B7F171',
          hover: '#A2DD5D',
          dim: 'rgba(183, 241, 113, 0.12)',
          glow: 'rgba(183, 241, 113, 0.25)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
      },
    },
  },
  plugins: [],
}
