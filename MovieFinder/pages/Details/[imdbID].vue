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

                <div class="w-2/3 p-4">
                    <p>{{ movieData.Title }}</p>
                    <p>Director: {{ movieData.Director }}</p>
                    <p>Year: {{ movieData.Year }}</p>
                    <p>Genre: {{ movieData.Genre }}</p>
                    <p>Country: {{ movieData.Country }}</p>
                    <p>BoxOffice: {{ movieData.BoxOffice }}</p>
                    <p>Plot: {{ movieData.Plot }}</p>
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