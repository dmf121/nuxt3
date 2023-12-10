<template>
    <div class="container mx-auto">
        <NuxtLink to="/" >
            <el-button type="warning" class="my-4 mx-2">Back to Search</el-button>
        </NuxtLink>
        <div>
            <h2 class="text-center text-lg">Add your own movie</h2>
            <form @submit.prevent="addMovie" class="block w-full my-4 p-4">
                <label for="title" class=" mr-4 block">Movie Title:</label>
                <input v-model="title" type="text" id="title" required class="w-full md:w-3/5 lg:w-3/5 border-2 rounded mb-3">

                <label for="poster" class=" mr-4 block">Poster link:</label>
                <input v-model="poster" type="text" id="poster" required class="w-full md:w-3/5 lg:w-3/5 border-2 rounded mb-3">

                <label for="director" class=" mr-4 block">Director:</label>
                <input v-model="director" type="text" id="director" required class="w-full md:w-3/5 lg:w-3/5 border-2 rounded mb-3">

                <label for="year" class=" mr-4 block">Year:</label>
                <input v-model="year" type="number" id="year" required min="1901" max="2040" class="w-1/2 md:w-1/5 lg:w-1/5 border-2 rounded mb-3">
                <div>
                    <button type="submit" class="addMovie rounded mt-6">Add</button>
                </div>
                
            </form>
    
            <div v-if="movieStore.movies.length > 0">
                <h2 class="text-center text-lg mt-12 mb-12">Added movies: </h2>
                <ul class="flex flex-wrap">
                    <li v-for="movie in movieStore.movies" :key="movie.title" class="w-full lg:w-1/2 md:w-1/2 p-3">
                        <div class="flex justify-between border p-1">
                            <img :src="movie.poster" alt="Poster" class="h-40">
                            <div class="ml-8 w-4/5">
                                <span class="w-full">{{ movie.title }}</span>
                                <p>{{ movie.year }}</p>
                                <p>{{ movie.director }}</p>
                            </div>
                            <el-button type="danger" :icon="Delete" circle @click="() => removeMovie(movie)" class="my-auto mx-2"/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { useMovieStore } from '~/store/index';
  import { Delete} from '@element-plus/icons-vue'
  const title = ref('');
  const poster = ref('');
  const director = ref('');
  const year = ref();
  
  const movieStore = useMovieStore();
  
  const addMovie = () => {
    const movie = { title: title.value, poster: poster.value, director: director.value, year: year.value };
    movieStore.addMovie(movie);
    title.value = '';
    poster.value = '';
    director.value = '';
    year.value = '';
  };

  const removeMovie = (movie) => {
  movieStore.removeMovie(movie);
};
  
  onMounted(() => {
    movieStore.loadMoviesFromSessionStorage();
  });
  
  onBeforeUnmount(() => {
    movieStore.saveMoviesToSessionStorage();
  });
  </script>

<style scoped>
    .addMovie{
        background-color: rgb(0, 174, 38);
        padding: 5px 10px;
        color: white;
    }
</style>
  