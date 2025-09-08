/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',   // <-- this is your primary color
        secondary: '#10B981',
        danger: '#EF4444',
        accent: '#FBBF24',
        card: '#F9FAFB',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
