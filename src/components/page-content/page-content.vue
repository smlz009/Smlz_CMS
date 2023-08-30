<template>
  <div class="content">
    <div class="header">
      <h2 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h2>
      <el-button type="primary" @click="handleNewUserClick" v-if="isCreate">
        {{ contentConfig?.header?.btnTitle ?? '新建数据' }}
      </el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%" v-bind="contentConfig.childrenTerr">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop"> </slot>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'timer'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                <el-button
                  icon="Edit"
                  type="primary"
                  link
                  @click="handleEditBtnClick(scope.row)"
                  v-if="isEdit"
                >
                  编辑
                </el-button>
                <el-button
                  icon="Delete"
                  type="danger"
                  link
                  @click="handleDeleteBtnClick(scope.row.id)"
                  v-if="isDelete"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item"> </el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        small
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @update:current-page="fetchPageListData"
        @update:page-size="fetchPageListData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import usePermissions from '@/hooks/usePermissions'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title: string
      btnTitle: string
    }
    propsList: any[]
    childrenTerr?: any
  }
}

const props = defineProps<IProps>()
const emit = defineEmits(['newClick', 'editClick'])

//用户权限
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isEdit = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

//页面相关数据
const currentPage = ref(1)
const pageSize = ref(10)
//监听systemStore

//获取用户列表数据
const systemStore = useSystemStore()

fetchPageListData()

//获取用户列表
const { pageList, pageTotalCount } = storeToRefs(systemStore)

//异步用户数据
function fetchPageListData(formData: any = {}) {
  if (!isQuery) return
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const queryInfo = { size, offset, ...formData }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

//监听数据删除
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageDataByIdAction(props.contentConfig.pageName, id)
}

//新建用户弹框
function handleNewUserClick() {
  emit('newClick')
}

//编辑用户
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

systemStore.$onAction(({ name, after }) => {
  //等待action完成后进行的回调
  after(() => {
    if (
      name === 'deletePageDataByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})
defineExpose({ fetchPageListData })
</script>

<style scoped lang="less">
.content {
  margin-top: 12px;
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;

  .header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .table {
    :deep(.el-table__cell) {
      padding: 10px 0;
    }
  }

  .pagination {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
