import { defineStore } from 'pinia'
import { accountLoginRequset, getUserInfoById } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

const useLoginStore = defineStore('login', {
  state: () => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: {}
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const res = await accountLoginRequset(account)
      const id = res.data.id
      this.token = res.data.token

      //进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      //获取用户信息
      const userInfoRes = await getUserInfoById(id)
      this.userInfo = userInfoRes.data

      //跳转页面
      router.push('/main')
    }
  }
})

export default useLoginStore
