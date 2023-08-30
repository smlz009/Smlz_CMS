import { defineStore } from 'pinia'
import { accountLoginRequset, getUserInfoById, getUserMenuByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenusToRoutes, mapMenuListToPermissions, firstMenu } from '@/utils/map-menus'
import useMainStore from '../main/mian'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: {},
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      //用户登录
      const res = await accountLoginRequset(account)
      const id = res.data.id
      this.token = res.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      //获取用户信息
      const userInfoRes = await getUserInfoById(id)
      this.userInfo = userInfoRes.data

      //获取用户菜单
      const userMenuRes = await getUserMenuByRoleId(this.userInfo.role.id)
      this.userMenus = userMenuRes.data

      //进行本地缓存
      localCache.setCache('USER_INFO', this.userInfo)
      localCache.setCache('USER_MENUS', this.userMenus)

      //请求数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      if (localCache.getCache('MAIN_AFFIXLIST') === undefined) {
        mainStore.affixList = [{ ...firstMenu }]
      } else {
        mainStore.affixList = localCache.getCache('MAIN_AFFIXLIST')
      }

      //权限按钮
      const permissions = mapMenuListToPermissions(this.userMenus)
      this.permissions = permissions

      //动态添加路由
      const routes = mapMenusToRoutes(this.userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      //跳转页面
      router.push('/main')
    },
    //刷新页面重新加载数据
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('USER_INFO')
      const userMenus = localCache.getCache('USER_MENUS')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        //请求数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        //权限按钮
        const permissions = mapMenuListToPermissions(this.userMenus)
        this.permissions = permissions

        //动态添加路由
        const routes = mapMenusToRoutes(this.userMenus)

        //头部导航固钉
        if (localCache.getCache('MAIN_AFFIXLIST') === undefined) {
          mainStore.affixList = [{ ...firstMenu }]
        } else {
          mainStore.affixList = localCache.getCache('MAIN_AFFIXLIST')
        }
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
