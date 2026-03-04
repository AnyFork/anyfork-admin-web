import '@/assets/styles/index.css'
import directive from '@/directive'
import { router } from '@/router'
import ui from '@nuxt/ui/vue-plugin'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(router).use(directive).use(ui).mount('#app')
