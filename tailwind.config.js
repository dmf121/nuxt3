/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/index.vue",
    "./pages/Details/[imdbID].vue",
    "./pages/ownMovie.vue",
    "./app.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

