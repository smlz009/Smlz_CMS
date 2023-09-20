import { getEntireDepartments, getEntireRoles, getEntireMenus } from '@/service/main/main'
import { defineStore } from 'pinia'
import { localCache } from '@/utils/cache'
import { log } from 'three/examples/jsm/nodes/Nodes.js'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
  affixList: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: [],
    affixList: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const rolesRes = await getEntireRoles()
      const departmentsRes = await getEntireDepartments()
      const menusRes = await getEntireMenus()

      this.entireRoles = rolesRes.data.list
      this.entireDepartments = departmentsRes.data.list
      this.entireMenus = menusRes.data.list
    },
    addAffixListAction(item: any) {
      //登录页面不缓存
      if (item.path === '/login') return
      //高亮
      this.affixList.forEach((affixItem) => {
        if (affixItem.name === item.name) {
          affixItem.isActive = true
        } else {
          affixItem.isActive = false
        }
      })

      //重复的不添加
      if (!this.affixList.find((affixItem) => affixItem.name === item.name)) {
        item.isActive = true
        this.affixList.push(item)
      }

      localCache.setCache('MAIN_AFFIXLIST', this.affixList)
    },
    delAffixListAction(index: number) {
      //删除图钉
      this.affixList.splice(index, 1)
      localCache.setCache('MAIN_AFFIXLIST', this.affixList)
    }
  }
})

export default useMainStore
