import { createPinia } from 'pinia'
import { createApp } from 'vue'

import './assets/main.css'

import App from './App.vue'
import router from './router'

import { library } from "@fortawesome/fontawesome-svg-core"
import { faPlus, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faTrashCan);
library.add(faXmark);
library.add(faPlus);

const app = createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
