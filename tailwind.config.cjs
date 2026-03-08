module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        basebg: 'rgb(var(--base-bg) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'idan-david-aviv-blue': 'rgb(var(--idan-david-aviv-blue) / <alpha-value>)',
        'idan-david-aviv-gold': 'rgb(var(--idan-david-aviv-gold) / <alpha-value>)',
        'idan-david-aviv-cyan': 'rgb(var(--idan-david-aviv-cyan) / <alpha-value>)',
        'idan-david-aviv-purple': 'rgb(var(--idan-david-aviv-purple) / <alpha-value>)',
        'idan-david-aviv-slate': 'rgb(var(--idan-david-aviv-slate) / <alpha-value>)',
        'idan-david-aviv-red': 'rgb(var(--idan-david-aviv-red) / <alpha-value>)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { filter: 'drop-shadow(-8px -8px 25px rgb(var(--idan-david-aviv-blue) / 0.8))' },
          '33%': { filter: 'drop-shadow(8px 8px 35px rgb(var(--idan-david-aviv-gold) / 0.8))' },
          '66%': { filter: 'drop-shadow(8px -8px 35px rgb(var(--idan-david-aviv-purple) / 0.8))' }
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' }
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' }
        }
      },
      animation: {
        'glow-pulse': 'glow-pulse 8s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite'
      }


    }
  },
  plugins: []
}

