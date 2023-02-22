/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        'brand-green-dark': '#0F5200',
        'brand-primary': '#488B49',
        'brand-green-light-1': '#A1CEA2',
        'brand-green-light-2': '#CFE5CF',
        'brand-white': '#FCFCFC',
      },
    },
  },
  plugins: [],
};
