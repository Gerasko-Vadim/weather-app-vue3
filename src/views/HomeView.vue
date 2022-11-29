

<template>
  <main class="container">
    <div class="wrapper">
      <input class="input" @input="getSearchResult" v-model="searchQuery" type="text" placeholder="Search city" />
      <ul v-if="mapboxSearchResult" class="list-results">
        <li v-for="item in mapboxSearchResult" :key="item.id">
          {{item.matching_place_name || item.place_name}}
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue"
import axios from "axios"

const ApiKeyMap = 'pk.eyJ1IjoidmFkaW1mcm9udCIsImEiOiJjbGIyZjJnbWkwM2xsM3ZvYTI0dHZodzgwIn0.3J-fwEd2Dbfd6w3C_VjpBA'
const searchQuery = ref("")
const queryTimeout = ref()
const mapboxSearchResult = ref()

const getSearchResult = () => {
  clearTimeout(queryTimeout.value)
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${ApiKeyMap}&types=place&limit=10`)
      mapboxSearchResult.value = result.data.features
      console.log(mapboxSearchResult.value)
      return
    }
    mapboxSearchResult.value = null
  }, 300)
}
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

.list-results{
  background: $color-secondary;
  padding: 5px;
  height: auto;
  margin-top: 10px;
  list-style-type: none;

  li{
    padding: 5px;
    color: white;
    font-size: 14px;
    cursor: pointer;
  }
  li:hover{
    color: rgb(190, 189, 241);
  }
}

</style>
