<template>
  <div class="content">
    <div class="header">
      <h2 class="title">用户列表</h2>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="55" align="center" />
        <el-table-column prop="name" label="部门名称" align="center" width="200" />
        <el-table-column prop="leader" label="部门领导" align="center" width="150" />
        <el-table-column prop="parentId" label="上级部门" align="center" />
        <el-table-column prop="createAt" label="创建时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template #default="scope">
            <el-button icon="Edit" type="primary" link @click="handleEditBtnClick(scope.row)">
              编辑
            </el-button>
            <el-button icon="Delete" type="danger" link @click="handleDeleteBtnClick(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
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
        @size-change="fetchPageListData"
        @current-change="fetchPageListData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'

const emit = defineEmits(['newClick', 'editClick'])

const systemStore = useSystemStore()
//页面相关数据
const currentPage = ref(1)
const pageSize = ref(10)

//获取用户列表数据
fetchPageListData()

//获取用户列表
const { pageList, pageTotalCount } = storeToRefs(systemStore)

//异步用户数据
function fetchPageListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const queryInfo = { size, offset, ...formData }
  systemStore.postPageListAction('department', queryInfo)
}

//监听数据删除
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageDataByIdAction('department', id)
}

//新建用户弹框
function handleNewUserClick() {
  emit('newClick')
}

//编辑用户
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

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
