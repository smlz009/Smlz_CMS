//重置css
import 'normalize.css'
import './assets/css/index.less'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import icons from './global/register-icons'

const app = createApp(App)
app.use(icons) //图标

app.use(store) //状态存储

app.use(router) //路由
app.mount('#app')
