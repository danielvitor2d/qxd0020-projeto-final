import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faPlus, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import './assets/main.css'

import App from './App.vue'
import router from './router'
import apolloClient from './services/apollo'

library.add(faTrashCan)
library.add(faXmark)
library.add(faPlus)
library.add(faCheck)

const app = createApp(App)

app.provide(DefaultApolloClient, apolloClient)

app.use(Toast)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
