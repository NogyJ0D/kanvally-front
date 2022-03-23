module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        nunito: ['nunito', 'sans-serif']
      },
      colors: {
        crimson: {
          50: '#FBCED4',
          100: '#FABBC3',
          200: '#F795A1',
          300: '#F56F7F',
          400: '#F2495E',
          500: '#EF233C',
          600: '#CB0F26',
          700: '#970B1C',
          800: '#630712',
          900: '#2E0309'
        },
        'ebony-clay': {
          50: '#7B7FA9',
          100: '#6F73A1',
          200: '#5B608C',
          300: '#4B4F73',
          400: '#3B3E5B',
          500: '#2B2D42'
        },
        bali: {
          50: '#F8F9FA',
          100: '#ECEEF2',
          200: '#D5D9E1',
          300: '#BDC4D0',
          400: '#A5AEBF',
          500: '#8D99AE',
          600: '#6C7C97',
          700: '#546177',
          800: '#3D4656',
          900: '#262B35'
        }
      }
    }
  },
  plugins: []
}
