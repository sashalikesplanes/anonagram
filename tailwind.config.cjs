/** @type {import('tailwindcss').Config} */
const iOSHeight = require('@rvxlab/tailwind-plugin-ios-full-height');

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    iOSHeight
  ],
}
