<template>
  <div class="city-list">
    <CityCard
      v-for="city in savedCities"
      :key="city.id"
      :city="city"
      @click="goToCityView(city)"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import api from "@/services/api";
import CityCard from "./CityCard.vue";

const savedCities = ref([]);
const router = useRouter();
const i18nLocale = useI18n();

const getCities = async () => {
  const localCities = localStorage.getItem("savedCities");
  if (localCities) {
    savedCities.value = JSON.parse(localCities);
  }

  const requests = [];
  savedCities.value.forEach((city) => {
    requests.push(
      api.getWeatherCity({
        lat: city.coords.lat,
        lon: city.coords.lng,
        lang: i18nLocale.locale.value,
      })
    );
  });

  const weatherData = await Promise.all(requests);

  weatherData.forEach((value, index) => {
    savedCities.value[index].weather = value.data;
  });
};

const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: { state: city.state, city: city.city },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};

await getCities();
</script>

<style lang="scss" scoped>
.city-list {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-top: 20px;
}
</style>