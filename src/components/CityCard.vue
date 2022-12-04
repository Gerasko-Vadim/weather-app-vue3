<template>
  <div class="city-card">
    <div class="city-card__wrapper">
      <div class="city-card__wrapper__name">
        <h2>{{ city.city }}</h2>
        <h3>{{ city.state }}</h3>
      </div>
      <div class="city-card__block-temp">
        <p>{{ Math.round(city.weather.current.temp) }}&deg;</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped>
.city-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  background: $color-secondary;
  border-radius: 5px;
  cursor: pointer;

  &__min-max{
    display: flex;
    flex-direction: row;
    column-gap: 10px;

    span{
        font-size: 12px;
        color: white;
    }
  }

  &__block-temp {
    display: flex;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    row-gap: 10px;
    p {
      color: white;
      align-self: self-end;
      font-size: 16px;
    }
  }

  &__wrapper {
    padding: 15px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__name {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      row-gap: 5px;
    }
  }
  h2 {
    font-size: 18px;
    color: white;
  }

  h3 {
    font-size: 14px;
    color: white;
  }
}
.city-card:hover {
  background: $color-primary;
}
</style>