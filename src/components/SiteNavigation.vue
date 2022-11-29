<template>
    <header class="navbar">
        <div class="navbar__wrapper">
            <i class="fa-regular fa-sun settings"></i>
            <h1>The Local Weather</h1>
        </div>
        <i @click="toggleModal" class="fa-solid fa-circle-info icon-info"></i>
    </header>
    <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
      <h1>Hello Modal vdfnvkjdfbvjhdfv dhf vjhdf vhdf vhfd vhfd vjdf vfd</h1>
    </BaseModal>
</template>

<script lang="ts" setup>
import BaseModal from "./BaseModal.vue"
import { ref } from "vue";

const modalActive= ref()
const toggleModal = () => {
  modalActive.value = !modalActive.value
}
</script>

<style lang="scss" >
.navbar {
    height: auto;
    padding: 20px $container-padding;
    display: flex;
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
}
</style>