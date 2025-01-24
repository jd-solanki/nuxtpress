/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      spacing: {
        // 8xl => 1440px
        '8xl': '90rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}