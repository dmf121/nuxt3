<template>
    <div class="container mx-auto">
        <NuxtLink to="/" >
            <el-button type="warning" class="my-4 mx-2">Back to Search</el-button>
        </NuxtLink>
        <div>
            <div v-if="movieData" class=" xs:block lg:flex md:flex">
                <div class=" p-4 md:w-1/3 lg:w-1/3 sm:w-full xs:w-full">
                    <img :src=movieData.Poster alt="" class="w-11/12 mx-auto">
                </div>

                <div class="md:w-2/3 lg:w-2/3 p-4">
                    <p class="font-extrabold text-2xl mb-3">{{ movieData.Title }}</p>
                    <p class="mb-1"><span class="font-bold">Director: </span>{{ movieData.Director }}</p>
                    <p class="mb-1"><span class="font-bold">Year: </span>{{ movieData.Year }}</p>
                    <p class="mb-1"><span class="font-bold">Actors: </span>{{ movieData.Actors }}</p>
                    <p class="mb-1"><span class="font-bold">Genre: </span>{{ movieData.Genre }}</p>
                    <p class="mb-1"><span class="font-bold">Country: </span>{{ movieData.Country }}</p>
                    <p class="mb-1"><span class="font-bold">BoxOffice: </span>{{ movieData.BoxOffice }}</p>
                    <p class="mb-1"><span class="font-bold">Plot: </span>{{ movieData.Plot }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const route = useRoute();
const movieData = ref(null);

const fetchData = async () => {
    try {
      const { data: data } = await useFetch(`https://www.omdbapi.com/?apikey=df35e7&i=${route.params.imdbID}`);
      movieData.value = data._rawValue;
    } catch (error) {
      console.error('Помилка під час отримання результатів пошуку:', error.message);
    }
  };

onMounted(async () => {
  await fetchData();
});

</script>