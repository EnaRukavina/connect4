/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'purple-dark': '#5C2DD5',
        'purple-light': '#7945FF',
        pink: '#FD6687',
        yellow: '#FFCE67',
      },
      fontFamily: {
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        custom: '0 10px 0 rgba(0,0,0)',
        'custom-thinner': '0 5px 0 rgba(0,0,0)',
      },
      borderWidth: {
        3: '3px',
      },
    },
  },
  plugins: [],
};
