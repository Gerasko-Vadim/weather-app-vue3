<template>
  <div class="city-list">
    <CityCard v-for="city in savedCities" :key="city.id" :city="city" @click="goToCityView(city)" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import {useRouter} from "vue-router"
import CityCard from "./CityCard.vue";

const savedCities = ref([]);
const router = useRouter()

console.log(savedCities)

const getCities = async () => {
  const localCities = localStorage.getItem("savedCities");
  if (localCities) {
    savedCities.value = JSON.parse(localCities);
  }
  console.log("localCities", localCities);
  const requests = [];
  savedCities.value.forEach((city) => {
    console.log(city.coords);
    requests.push(
      axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=04feb8ac876a91f26dfe2023591b80e5&units=metric`
      )
    );
  });

  const weatherData = await Promise.all(requests);

  weatherData.forEach((value, index) => {
    savedCities.value[index].weather = value.data;
  });
};

const goToCityView = (city)=>{
    router.push({
        name:'cityView',
        params:{state:city.state, city:city.city},
        query:{
            id:city.id,
            lat:city.coords.lat,
            lng:city.coords.lng
        }
    })
}

await getCities();
</script>

<style lang="scss" scoped>
.city-list{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin-top: 20px;
}
</style>