import { defineStore } from 'pinia'
import { accountLoginRequset, getUserInfoById, getUserMenuByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('USER_INFO') ?? {},
    userMenus: localCache.getCache('USER_MENUS') ?? {}
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

      //跳转页面
      router.push('/main')
    }
  }
})

export default useLoginStore
