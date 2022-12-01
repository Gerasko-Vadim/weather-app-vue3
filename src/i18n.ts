import { createI18n } from "vue-i18n";

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: {
      "title": "The local weather",
      "input": "Search city",
      "forecast7": "7 Day Forecast",
      "modal": {
        "about": "About app",
        "1": "The Local Weather allows you to track the current and future weather of cities of your choosing.",
        "howit": "How it works",
        "2": "Search for your city by entering the name into the search bar.",
        "3": "Select a city within the results, this will take you to the current weather for your selection.",
        "4": "Track the city by clicking on the " + " icon in the top right. This will save the city to view at a later time on the home page.",
        "remove": "Removing a city",
        "5": "If you no longer wish to track a city, simply select the city within the home page. At the bottom of the page, there will be am option to delete the city.",
        "btn":"Close"
      },
      "removeCity":"Remove City",
      "feels":"Feels like"
    },
    ru: {
      "title": "Местная погода",
      "input": "Поиск города",
      "forecast7": "Прогноз на 7 дней",
      "modal": {
        "about": "О приложении",
        "1": "Местная погода позволяет отслеживать текущую и будущую погоду в городах по вашему выбору.",
        "howit": "Как это работает",
        "2": "Найдите свой город, введя название в строку поиска.",
        "3": "Выберите город в результатах, это приведет вас к текущей погоде для вашего выбора.",
        "4": "Отслеживать город, нажав на значок «+» в правом верхнем углу. Это позволит сохранить город для просмотра позже на главной странице.",
        "remove": "Удаление города",
        "5": "Если вы больше не хотите отслеживать город, просто выберите город на главной странице. Внизу страницы будет возможность удалить город.",
        "btn":"Закрыть"
      },
      "removeCity":"Удалить город",
      "feels":"Ощущается"
    }
  },
});
