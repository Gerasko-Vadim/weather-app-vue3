<template>
  <div class="app">
    <SiteNavigation />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router"
import SiteNavigation from "@/components/SiteNavigation.vue"


</script>

<style lang="scss">
.app {
  width: 100vw;
  min-height: 100vh;
  background: $color-primary;
}
</style>