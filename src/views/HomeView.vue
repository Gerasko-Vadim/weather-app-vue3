

<template>
  <main class="container">
    <div class="wrapper">
        <input
          class="input"
          @input="getSearchResult"
          v-model="searchQuery"
          type="text"
          :placeholder="$t('input')"
        />
        <ul v-if="mapboxSearchResult" class="list-results">
          <li
            v-for="item in mapboxSearchResult"
            :key="item.id"
            @click="previewCity(item)"
          >
            {{ item.matching_place_name || item.place_name }}
          </li>
        </ul>
      </div>
      <div class="city-list">
        <Suspense>
          <CityList/>
          <template #fallback>
            <p>Loading....</p>
          </template>
        </Suspense>
      </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "@/components/CityList.vue"

const mapKey = import.meta.env.VITE__MAPBOX_KEY; 

const router = useRouter();

const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: "true",
    },
  });
};

const searchQuery = ref("");
const queryTimeout = ref();
const mapboxSearchResult = ref();

const getSearchResult = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      const result = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapKey}&types=place&limit=10`
      );
      mapboxSearchResult.value = result.data.features;
      console.log(mapboxSearchResult.value);
      return;
    }
    mapboxSearchResult.value = null;
  }, 300);
};
</script>

<style lang="scss">
.container {
  height: auto;
  padding: 20px $container-padding;
}

.wrapper {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}

.input {
  height: auto;
  padding: 10px;
  background: transparent;
  border: 1px solid transparent;
  color: white;
  border-bottom: 1px solid white;
}

.input:focus {
  outline: none;
  border-bottom: 1px solid #004e71;
}

.city-list{
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 15px;
}

.list-results {
  background: $color-secondary;
  padding: 5px;
  position: absolute;
  top: 128px;
  height: auto;
  margin-top: 10px;
  list-style-type: none;

  li {
    padding: 5px;
    color: white;
    font-size: 14px;
    cursor: pointer;
  }
  li:hover {
    color: rgb(190, 189, 241);
  }
}
</style>
