import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/router.js'
import '@unocss/reset/tailwind.css'

import 'virtual:uno.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
