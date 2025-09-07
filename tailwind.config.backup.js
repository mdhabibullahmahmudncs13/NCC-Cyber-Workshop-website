/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Enhanced cybersecurity theme colors
        primary: {
          50: '#0a0f1c',
          100: '#0f1629',
          200: '#1a2342',
          300: '#253055',
          400: '#304069',
          500: '#3b507c',
          600: '#4a6090',
          700: '#5970a4',
          800: '#6880b8',
          900: '#7790cc',
        },
        cyber: {
          blue: '#00d4ff',
          'blue-dark': '#0099cc',
          green: '#00ff88',
          'green-dark': '#00cc66',
          purple: '#8000ff',
          'purple-dark': '#6600cc',
          pink: '#ff0080',
          'pink-dark': '#cc0066',
          orange: '#ff6600',
          'orange-dark': '#cc5500',
          yellow: '#ffff00',
          'yellow-dark': '#cccc00',
        },
        dark: {
          100: '#000510',
          200: '#0a0f1c',
          300: '#0f172a',
          400: '#1e293b',
          500: '#334155',
          600: '#475569',
          700: '#64748b',
          800: '#94a3b8',
          900: '#cbd5e1',
        },
        glow: {
          blue: 'rgba(0, 212, 255, 0.5)',
          green: 'rgba(0, 255, 136, 0.5)',
          purple: 'rgba(128, 0, 255, 0.5)',
          pink: 'rgba(255, 0, 128, 0.5)',
          orange: 'rgba(255, 102, 0, 0.5)',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': "url('/grid.svg')",
        'circuit-pattern': "url('/circuit.svg')",
        'cyber-gradient': 'linear-gradient(45deg, #00d4ff, #00ff88, #8000ff, #ff0080)',
        'holographic': 'linear-gradient(45deg, #00d4ff, #00ff88, #8000ff, #ff0080, #ff6600)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glitch': 'glitch 2s infinite',
        'neon-flicker': 'neon-flicker 2s infinite alternate',
        'holographic-shift': 'holographic-shift 3s ease-in-out infinite',
        'cyber-pulse': 'cyber-pulse 2s ease-in-out infinite',
        'matrix-rain': 'matrix-rain 10s linear infinite',
        'scan-lines': 'scan-lines 2s linear infinite',
        'data-stream': 'data-stream 2s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00d4ff, 0 0 10px #00d4ff, 0 0 15px #00d4ff' },
          '100%': { boxShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 30px #00d4ff' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glitch: {
          '0%, 74%, 76%, 100%': { transform: 'translate(0)', filter: 'hue-rotate(0deg)' },
          '75%': { transform: 'translate(-3px, 3px)', filter: 'hue-rotate(90deg)' }
        },
        'neon-flicker': {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { 
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor, 0 0 20px #00d4ff, 0 0 35px #00d4ff'
          },
          '20%, 24%, 55%': { textShadow: 'none' }
        },
        'holographic-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        'cyber-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.05)', opacity: 0.8 }
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        'scan-lines': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        'data-stream': {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(100px)' }
        }
      },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 212, 255, 0.5)',
        'glow-green': '0 0 20px rgba(0, 255, 136, 0.5)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.5)',
      }
    },
  },
  plugins: [],
}
