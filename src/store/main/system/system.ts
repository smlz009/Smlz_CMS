import { postUsersListData, deleteUserById, newUserData } from '@/service/main/system/system'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

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
    async postUsersListAction(data: any) {
      const res = await postUsersListData(data)
      const { totalCount, list } = res.data
      this.userTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      const res = await deleteUserById(id)
      if (res.code == 0) {
        ElMessage({
          type: 'success',
          message: res.data
        })
        this.postUsersListAction({ offset: 0, size: 10 })
      }
    },
    async newUserDataAction(data: any) {
      const res = await newUserData(data)
      if (res.code == 0) {
        ElMessage({
          type: 'success',
          message: res.data
        })
        this.postUsersListAction({ offset: 0, size: 10 })
      }
    }
  }
})

export default useSystemStore
