import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'

const pinpa = createPinia()

function registerStore(app: App<Element>) {
  app.use(pinpa)
  //加载后 匹配路由
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
