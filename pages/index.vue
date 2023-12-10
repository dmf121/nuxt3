<!-- components/MovieSearch.vue -->
<template>
  <div class="container mx-auto h-screen">
    <NuxtLink to="/ownMovie" >
      <el-button type="information" class="my-4 mx-2">My movies</el-button>
    </NuxtLink>
    <div class="block">
      <div>
        <div class="flex justify-center items-center mt-5 p-4 md:h-2/5">
          <h1 class="text-2xl font-black font-sans	">MovieFinder</h1>
          <img src="/logo.png" alt="" class="w-32 md:w-48 lg:w-48">
        </div>

        <div class="flex mx-auto my-8 mb-0 p-4 pb-0 w-full md:w-3/4 lg:w-4/5">
          <el-input v-model="query" placeholder="Movie title..." @input="onInputChange" @keyup.enter="search"/>
          <el-button type="success" @click="search">Search</el-button>
          <el-button @click="clearSearch" type="danger" :disabled="searchResults.length === 0">Clear</el-button>
        </div>
      </div>

      <div class="searchbar-results mx-auto w-full md:w-3/4 ">
        <ul v-if="inputChange">
          <li v-for="result in searchBarResults" :key="result.imdbID">
            <NuxtLink :to="{ path: `/details/${result.imdbID}` }">{{ result.Title }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div class="search-results mt-20" v-if="searchResultsDisplay">
        <carousel :items-to-show="getItemsToShow" class="h-full px-10 " v-if="!(searchResults.length === 0)">
          <slide v-for="result in searchResults" :key="result.imdbID" class="mark w-4/5">
            <NuxtLink :to="{ path: `/details/${result._rawValue.imdbID}` }" class="h-full">
              <div class="p-2 flex h-full">
                <div class="w-1/2">
                  <img :src="result._rawValue.Poster" alt="poster" class="h-full">
                </div>
                <div class="w-1/2 px-1">
                  <span class="font-bold">{{ result._rawValue.Title }}</span>
                  <div class="bottom">
                    <p>{{ result._rawValue.Year }}</p>
                    <p>{{ result._rawValue.Director }}</p>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </slide>
          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
const query = ref('');
const searchBarResults = ref([]);
const searchResults = ref([]);
const searchResult = ref([]);
const searchResultsDisplay = ref(false);
const inputChange = ref(false);
const screenWidth = ref(process.client ? window.innerWidth : null);

onMounted(() => {
  const savedResults = localStorage.getItem('searchResults');
  if (savedResults) {
    searchResults.value = JSON.parse(savedResults);
    searchResultsDisplay.value = true;
  }
  if (process.client) {
    window.addEventListener('resize', handleResize);
  }
});

const onInputChange = () => {
  inputChange.value = true;
  if (query.value.trim() === '') {
    return;
  }

  clearTimeout(timer);
  timer = setTimeout(async () => {
    try {
      const { data } = await useFetch(`https://www.omdbapi.com/?apikey=df35e7&s=${query.value}`);
      const results = data._rawValue.Search;
      if (results) {
        searchBarResults.value = results;
        searchResultsDisplay.value = true;
        inputChange.value = true;
        const imdbIDs = results.map(item => item.imdbID);
        const requests = imdbIDs.map(async imdbID => {
          const { data: movieData } = await useFetch(`https://www.omdbapi.com/?apikey=df35e7&i=${imdbID}`);
          return movieData;
        });

        const movieDetails = await Promise.all(requests);
        searchResult.value = movieDetails;

      } else {
        searchBarResults.value = [];
        searchResultsDisplay.value = true;
        inputChange.value = true;
      }

    } catch (error) {
      console.error('Помилка під час отримання результатів пошуку:', error.message);
    }

    if (searchResults.value.length > 0) {
      localStorage.setItem('searchResults', JSON.stringify(searchResults.value));
    }
  }, 1500); 
};

let timer;

const search = () => {
  searchResults.value = searchResult.value;
  searchResultsDisplay.value = true;
  inputChange.value = false;
  localStorage.setItem('searchResults', JSON.stringify(searchResults.value));
};

const clearSearch = () => {
  query.value = '';
  searchResults.value = [];
  searchResultsDisplay.value = false;
  inputChange.value = false;
  localStorage.removeItem('searchResults');
};

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

const getItemsToShow = computed(() => {
  if (screenWidth.value < 784) { 
    return 1;
  } else if (screenWidth.value < 1024) { 
    return 2;
  } else {
    return 3;
  }
});
</script>

