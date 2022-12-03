<template>
    <select class="switch-lang" v-model="$i18n.locale">
      <option v-for="(locale, i) in locales" :key="`locale-${i}`" :value="locale">
        {{ locale }}
      </option>
    </select>
  </template>
  
  <script>
  export default {
    name: "LocaleSwitcher",
    data() {
      return { locales: ["ru", "en"] };
    },
  };
  </script>
  <style lang='scss'>
  .switch-lang{
    background: transparent;
    border: 1px solid transparent;
    font-size: 18px;
    color: white;
  }

  .swith-lang:focus{
    outline: none;
  }
  </style>