//重置css
import 'normalize.css'
import './assets/css/index.less'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinpa from './store'

const app = createApp(App)
app.use(router)
app.use(pinpa)
app.mount('#app')
