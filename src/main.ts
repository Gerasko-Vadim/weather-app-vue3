import router from './router'
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPhone } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faPhone)

createApp(App)
.use(router)
.use(i18n)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
