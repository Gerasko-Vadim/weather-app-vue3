<template>
  <header class="navbar">
    <RouterLink :to="{ name: 'home' }">
      <div class="navbar__wrapper">
        <i class="fa-regular fa-sun settings"></i>
        <h1>{{ $t("title") }}</h1>
      </div>
    </RouterLink>
    <div class="navbar__actions">
      <i @click="toggleModal" class="fa-solid fa-circle-info icon-info"></i>
      <i
        v-if="route.query.preview"
        @click="addCity"
        class="fa-solid fa-plus icon-plus"
      ></i>
      <LocaleSwitcher />
      <SwitcherTheme/>
    </div>
  </header>
  <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
    <div class="modal">
      <h1 class="modal__title">{{ $t("modal.about") }}:</h1>
      <p class="mb-4">
        {{ $t("modal.1") }}
      </p>
      <h2 class="modal__title">{{ $t("modal.howit") }}:</h2>
      <ol class="list-decimal list-inside mb-4">
        <li>{{ $t("modal.2") }}</li>
        <li>
          {{ $t("modal.3") }}
        </li>
        <li>
          {{ $t("modal.4") }}
        </li>
      </ol>

      <h2 class="modal__title">{{ $t("modal.remove") }}</h2>
      <p>
        {{ $t("modal.5") }}
      </p>
    </div>
  </BaseModal>
</template>

<script lang="ts" setup>
import BaseModal from "./BaseModal.vue";
import LocaleSwitcher from "./LocalSwitcher.vue";
import SwitcherTheme from "./SwitcherTheme.vue"
import { uid } from "uid";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const modalActive = ref();
const savedCities = ref([]);
const localCities = localStorage.getItem("savedCities");

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

// const isExistCity = () => {
//   return JSON.parse(localCities).filter(
//     (city) => city.coords.lat === route.query.lat && city.coords.lng
//   ) == -1
//     ? true
//     : false;
// };

const addCity = () => {
  if (localCities) {
    savedCities.value = JSON.parse(localCities);
  }
  const locationObj: any = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  savedCities.value.push(locationObj);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};
</script>

<style lang="scss" >
.navbar {
  height: auto;
  padding: 20px $container-padding;
  display: flex;
  position: sticky;
  top: 0;
  z-index: 19000;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  &__wrapper {
    display: flex;
    flex-direction: row;
    column-gap: 16px;

    h1 {
      color: white;
      font-size: 14px;
    }
  }

  &__actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 10px;
  }

  .settings {
    color: white;
  }

  .icon-info {
    cursor: pointer;
    color: white;
  }

  .icon-info:hover {
    color: $color-secondary;
  }

  .icon-plus {
    color: white;
    cursor: pointer;
  }

  .icon-plus:hover {
    color: $color-secondary;
  }
}
</style>