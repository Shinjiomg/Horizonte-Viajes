/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: '#0077b6',
        secondary: '#00b4d8',
        accent: '#f77f00',
        footer: '#023e8a',
        'section-blue': '#dceef7',
        'section-soft': '#f0f7fa',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Fraunces', 'serif'],
      },
    },
  },
  plugins: [],
};
