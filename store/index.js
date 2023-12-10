// store/index.js
import { defineStore } from 'pinia';

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [],
  }),
  actions: {
    addMovie(movie) {
      this.movies.push(movie);
      this.saveMoviesToSessionStorage();
    },
    removeMovie(movie) {
        this.movies = this.movies.filter((m) => m !== movie);
        this.saveMoviesToSessionStorage();
      },
    saveMoviesToSessionStorage() {
      sessionStorage.setItem('movies', JSON.stringify(this.movies));
    },
    loadMoviesFromSessionStorage() {
      const storedMovies = sessionStorage.getItem('movies');
      if (storedMovies) {
        this.movies = JSON.parse(storedMovies);
      }
    },
  },
  // Додайте виправлення, щоб завантажити фільми при створенні сховища
  onInit() {
    this.loadMoviesFromSessionStorage();
  },
});
