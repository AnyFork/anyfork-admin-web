import ui from '@nuxt/ui/vue-plugin'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/index.css'
import { router } from './router'

createApp(App).use(router).use(ui).mount('#app')
