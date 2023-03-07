import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'

//vuetify
import vuetify from '@/plugins/vuetify'

//router
import router from '@/routes'

const app = createApp(App)

app.use(createPinia()).use(vuetify).use(router)

app.mount('#app')
