//重置css
import 'normalize.css'
import './assets/css/index.less'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinpa from './store'
import icons from './global/register-icons'

const app = createApp(App)
app.use(router) //路由
app.use(pinpa) //状态管理
app.use(icons) //图标
app.mount('#app')
