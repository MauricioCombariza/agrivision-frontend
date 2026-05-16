/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/detector/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    preflight: false, // No resetear CSS global para no romper el landing page
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
