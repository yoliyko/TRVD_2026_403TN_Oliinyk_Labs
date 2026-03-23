/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Додамо власну "палітру мандрівника"
        travel: {
          primary: '#0ea5e9', // Блакитний (небо)
          secondary: '#10b981', // Зелений (природа)
          accent: '#f59e0b', // Помаранчевий (захід сонця)
          dark: '#0f172a', // Глибокий синій
        }
      }
    },
  },
  plugins: [],
}