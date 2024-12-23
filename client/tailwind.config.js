/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gilroy: ['Gilroy-Regular', 'Gilroy-Medium', 'Gilroy-Semibold', 'Gilroy-Bold', 'sans-serif'],
      },
      boxShadow: {
        lightShadow: '0 2px 2px 0 rgba(114, 114, 114, 0.169)',
        darkShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.251)',
        leftLightShadow: '-2px 2px 2px 0 rgba(114, 114, 114, 0.169)',
        leftDarkShadow: '-2px 2px 2px 0 rgba(0, 0, 0, 0.251)',
        topLightShadow: '2px -2px 2px 0 rgba(114, 114, 114, 0.169)',
        topDarkShadow: '2px -2px 2px 0 rgba(0, 0, 0, 0.251)',
      },
      colors: {
        light: {
          primary: '#3390ec',
          primaryHover: '#2563eb',
          secondary: '#9333EA',
          accent: '#F59E0B',
          input: '#f5f5f5',
          inputHover: '#ececec',
          background: '#fff',
          button: '#3b82f6',
          textColor: '#000',
          iconColor: '#6B7280',
        },
        dark: {
          primary: '#8774e1',
          primaryHover: '#2563eb',
          secondary: '#64748B',
          accent: '#D97706',
          input: '#2c2c2c',
          lightInput: '#f5f5f5',
          inputHover: '#ececec',
          background: '#212121',
          button: '#3b82f6',
          textColor: '#fff',
          iconColor: '#fff',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
