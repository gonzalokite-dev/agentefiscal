/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#002A3A',
        accent: '#EAAA00',
        stone: '#D7D2CB',
        surface: '#F7F6F4',
        'text-main': '#002A3A',
        muted: '#5F5E5A',
        border: '#E2DED9',
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Kumbh Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
