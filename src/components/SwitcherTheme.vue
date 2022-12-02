<template>
  <div>
    <input
      @change="toggleTheme"
      id="checkbox"
      type="checkbox"
      class="switch-checkbox"
    />
    <label for="checkbox" class="switch-label">
      <span>🌙</span>
      <span>☀️</span>
      <div
        class="switch-toggle"
        :class="{ 'switch-toggle-checked': userTheme === 'dark' }"
      ></div>
    </label>
  </div>
</template>
  
  <script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
const userTheme = ref(store.state.theme)

const toggleTheme = ()=>{
    store.commit('toggleTheme')
    userTheme.value = store.state.theme == 'dark' ? 'light': 'dark'
}

</script>
  
  <style lang="scss" scoped>
.switch-checkbox {
  display: none;
}

.switch-label {
  align-items: center;
  background: $color-primary;
  border: 1px solid #cacaca;
  border-radius: 4rem;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  height: 15px;
  position: relative;
  padding: calc(4rem * 0.1);
  transition: background 0.5s ease;
  justify-content: space-between;
  width: 40px;
  z-index: 1;
}

.switch-toggle {
  position: absolute;
  background-color: #cacaca;
  border-radius: 50%;
  top: calc(4rem * 0.07);
  left: calc(4rem * 0.07);
  height: 20px;
  width: 20px;
  transform: translateX(0);
  transition: transform 0.3s ease, background-color 0.5s ease;
}

.switch-toggle-checked {
  transform: translateX(24px) !important;
}
</style>
  