import {
  postUsersListData,
  deleteUserById,
  newUserData,
  editUserData,
  postPageListData,
  deletePageDataById,
  newPageData,
  editPageData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import type { IsystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): IsystemState => ({
    usersList: [],
    userTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    //请求用户数据
    async postUsersListAction(data: any) {
      const res = await postUsersListData(data)
      const { totalCount, list } = res.data
      this.userTotalCount = totalCount
      this.usersList = list
    },
    //删除用户数据
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
    //新增用户数据
    async newUserDataAction(data: any) {
      const res = await newUserData(data)
      if (res.code == 0) {
        ElMessage({
          type: 'success',
          message: res.data
        })
        this.postUsersListAction({ offset: 0, size: 10 })
      }
    },
    //修改用户数据
    async editUserDataAction(id: number, data: any) {
      const res = await editUserData(id, data)
      if (res.code == 0) {
        ElMessage({
          type: 'success',
          message: res.data
        })
        this.postUsersListAction({ offset: 0, size: 10 })
      }
    },

    //页面的数据
    async postPageListAction(pageName: string, data: any) {
      const res = await postPageListData(pageName, data)
      const { totalCount, list } = res.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageDataByIdAction(pageName: string, id: number) {
      const res = await deletePageDataById(pageName, id)
      if (res.code == 0) {
        ElMessage({
          type: 'success',
          message: res.data
        })
        this.postPageListAction(pageName, { offset: 0, size: 10 })
      }
    },
    async newPageDataAction(pageName: string, data: any) {
      const res = await newPageData(pageName, data)
      if (res.code == 0) {
        ElMessage({
          type: 'success',
          message: res.data
        })
        this.postPageListAction(pageName, { offset: 0, size: 10 })
      }
    },
    async editPageDataAction(pageName: string, id: number, data: any) {
      const res = await editPageData(pageName, id, data)
      if (res.code == 0) {
        ElMessage({
          type: 'success',
          message: res.data
        })
        this.postPageListAction(pageName, { offset: 0, size: 10 })
      }
    }
  }
})

export default useSystemStore
