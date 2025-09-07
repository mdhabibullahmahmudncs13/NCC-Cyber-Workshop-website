/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        'cyber-blue': '#00d4ff',
        'cyber-green': '#00ff88',
        'cyber-purple': '#8000ff',
        'cyber-pink': '#ff0080',
        'dark': {
          100: '#1a1a1a',
          200: '#2a2a2a',
          300: '#3a3a3a',
        }
      }
    },
  },
  plugins: [],
}
