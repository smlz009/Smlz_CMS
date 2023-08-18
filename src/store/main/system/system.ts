import { postUsersListData, deleteUserById } from '@/service/main/system/system'
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
    async postUsersListAction(data: any = {}) {
      const res = await postUsersListData(data)
      const { totalCount, list } = res.data
      this.userTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      const res = await deleteUserById(id)
      this.postUsersListAction()
    }
  }
})

export default useSystemStore
