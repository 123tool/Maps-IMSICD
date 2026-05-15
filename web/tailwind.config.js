module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'spy-black': '#050505',
        'spy-dark': '#0d0d0d',
        'spy-cyan': '#00f3ff',
        'spy-red': '#ff003c',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
