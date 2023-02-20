/** @type {import('tailwindcss').Config} */

const { nthChildPlugin } = require('./tailwind/nthChildPlugin');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts}',
  ],
  theme: {},
  plugins: [
    nthChildPlugin,
  ],
}
