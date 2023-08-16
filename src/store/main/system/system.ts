import { postUsersListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'

interface IsystemState {
  usersList: any[]
  userTotalCount: number
}

const useSystemStore = defineStore('system', {
  state: (): IsystemState => ({
    usersList: [],
    userTotalCount: 0
  }),
  actions: {
    async postUsersListAction() {
      const res = await postUsersListData()
      const { totalCount, list } = res.data
      this.userTotalCount = totalCount
      this.usersList = list
    }
  }
})

export default useSystemStore
