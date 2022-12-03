<template>
  <div class="app" :class="{'app-dart': store.state.theme === 'dark'}">
    <SiteNavigation />
    <RouterView class="flex-1" v-slot="{ Component }">
      <Transition name="page">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "@/components/SiteNavigation.vue";
import { useStore } from "vuex";
const store = useStore();

</script>

<style lang="scss">
.app {
  width: 100vw;
  min-height: 100vh;
  background: $color-primary;
  transition: background 0.5s ease-out;
}
.app-dart{
  background: #041C32 ;
}

.page-enter-active {
  transition: 600ms ease all;
}
.page-enter-from {
  opacity: 0;
}
</style>