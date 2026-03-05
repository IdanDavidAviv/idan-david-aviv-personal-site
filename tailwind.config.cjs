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
        'idan-david-aviv-grey': 'rgb(var(--idan-david-aviv-grey) / <alpha-value>)',
        'idan-david-aviv-red': 'rgb(var(--idan-david-aviv-red) / <alpha-value>)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}

