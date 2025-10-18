module.exports = {
  content: [
    './views/**/*.{ejs,html}',
    './src/**/*.{js,ts}',
    './public/**/*.{js,html}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          50: '#f5e6f7',
          100: '#ead1ef',
          200: '#d39bdf',
          300: '#b85ccc',
          400: '#9d30b8',
          500: '#7f1f8c',
          600: '#68196f',
          700: '#511454',
          800: '#3b0f3c',
          900: '#260a27',
        },
      },
      boxShadow: {
        glow: '0 0 20px rgba(157, 48, 184, 0.5)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
