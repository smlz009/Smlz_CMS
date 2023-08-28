import type { IModalConfig } from '@/components/page-modal/type'

const modalConfig: IModalConfig = {
  pageName: 'role',
  header: {
    newTitle: '新建角色',
    editTitle: '新建角色'
  },
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      type: 'input',
      prop: 'intro',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    },
    {
      type: 'custom',
      slotName: 'menuList',
      label: '权限设置'
    }
  ]
}

export default modalConfig
