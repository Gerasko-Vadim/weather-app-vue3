<template>
  <div v-if="store.getters.theme">
    <div class="overview">
      <h1 class="city">{{ route.params.city }}</h1>
      <p class="overview__time description">
        {{
          new Date(weatherData.currentTime).toLocaleDateString(
            locale[i18nLocale.locale.value],
            {
              weekday: "short",
              day: "2-digit",
              month: "long",
            }
          )
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString(
            locale[i18nLocale.locale.value],
            {
              timeStyle: "short",
            }
          )
        }}
      </p>
      <p class="overview__temp">
        {{ Math.round(weatherData.current.temp) }}&deg;
      </p>
      <p class="description">
        {{ $t("feels") }} {{ Math.round(weatherData.current.feels_like) }} &deg;
      </p>
      <p class="description overview__time">
        {{ weatherData.current.weather[0].description }}
      </p>
      <img
        class="overview__icon"
        :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        alt=""
      />
    </div>
    <div class="line"></div>
    <div class="hourly">
      <div class="hourly__wrapper">
        <h1 class="hourly__title">Hourly Weather</h1>
        <div class="hourly__scroll">
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="hourly__item"
          >
            <p class="hourly__item-title">
              {{
                new Date(hourData.currentTime).toLocaleTimeString(
                  locale[i18nLocale.locale.value],
                  {
                    hour: "numeric",
                  }
                )
              }}
              {{ locale[i18nLocale.locale.value] === "ru-RU" ? "ч" : "" }}
            </p>
            <img
              class="sm-icon"
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt=""
            />
            <p class="hourly__item-title">
              {{ Math.round(hourData.temp) }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="weekly">
      <h1 class="weekly__title">{{ $t("forecast7") }}</h1>
      <div class="weekly__wrapper">
        <div
          class="weekly__item"
          v-for="day in weatherData.daily"
          :key="day.dt"
        >
          <p class="weekly__item-title">
            {{
              new Date(day.dt * 1000)
                .toLocaleDateString(locale[i18nLocale.locale.value], {
                  weekday: "long",
                })
                .charAt(0)
                .toUpperCase() +
              new Date(day.dt * 1000)
                .toLocaleDateString(locale[i18nLocale.locale.value], {
                  weekday: "long",
                })
                .slice(1)
            }}
          </p>
          <img
            class="sm-icon"
            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt=""
          />
          <div class="weekly__min-max">
            <p>H: {{ Math.round(day.temp.max) }}</p>
            <p>L: {{ Math.round(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="remove-block" @click="removeCity">
      <i class="fa-solid fa-trash remove-icon"></i>
      <p>{{ $t("removeCity") }}</p>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import axios from "axios";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

import { useStore } from "vuex";
const store = useStore();

const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;

const locale = {
  en: "en-US",
  ru: "ru-RU",
};

const i18nLocale = useI18n();
console.log(i18nLocale.locale.value);
const route = useRoute();
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lang=${i18nLocale.locale.value}&lon=${route.query.lng}&appid=${apiKey}&units=${store.state.theme === 'dark' ? 'metric': 'imperial'}`
    );

    //current data & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    //hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });
    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};

const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = cities.filter((city) => city.id !== route.query.id);
  localStorage.setItem("savedCities", JSON.stringify(updatedCities));
  router.push({ name: "home" });
};

const weatherData = await getWeatherData();
</script>

<style lang="scss">
.overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding-top: 40px;
  &__time {
    margin-top: 5px;
  }

  &__temp {
    font-size: 70px;
    color: white;
    margin: 30px 0;
  }

  &__icon {
    width: 150px;
  }
}

.city {
  color: white;
  font-size: 36px;
}

.description {
  font-size: 12px;
  color: white;
}

.line {
  width: 100%;
  height: 1px;
  background: #ffffff10;
  margin: 10px 0;
}
.hourly {
  display: flex;
  width: 100vw;
  color: white;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    padding: 20px $container-padding;
    row-gap: 10px;
    width: calc(100vw - ($container-padding * 2));
  }

  &__title {
    font-size: 14px;
    color: white;
  }

  &__scroll {
    display: flex;
    overflow-x: scroll;
  }

  &__item {
    flex-direction: column;
    align-items: center;
    display: flex;
    column-gap: 10px;
    font-size: 16px;
  }

  &__item-title {
    font-size: 12px;
    color: white;
  }
}

.weekly {
  padding: 20px $container-padding;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 10px;

  &__wrapper {
    width: 100%;
  }

  &__title {
    font-size: 14px;
    color: white;
  }

  &__item {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__item-title {
    font-size: 14px;
    color: white;
    margin: 5px 0;
    flex: 1;
  }

  &__min-max {
    display: flex;
    flex-direction: row;
    column-gap: 8px;
    flex: 1;
    align-items: center;
    justify-content: flex-end;

    p {
      font-size: 14px;
      color: white;
    }
  }
}

.remove-icon {
  color: white;
}
.remove-block {
  display: flex;
  cursor: pointer;
  flex-direction: row;
  padding: 20px 0;
  column-gap: 10px;
  align-items: center;
  justify-content: center;
  p {
    color: white;
  }
}

.remove-block:hover {
  .remove-icon {
    color: red;
  }
  p {
    color: red;
  }
}

.sm-icon {
  height: 50px;
  object-fit: cover;
}
</style>