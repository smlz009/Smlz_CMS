<template>
  <div class="content">
    <div class="header">
      <h2 class="title">用户列表</h2>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="55" align="center" />
        <el-table-column prop="name" label="Name" align="center" width="200" />
        <el-table-column prop="realname" label="真实姓名" align="center" width="170" />
        <el-table-column prop="cellphone" label="电话号码" align="center" />
        <el-table-column prop="enable" label="状态" width="100" align="center">
          <template #default="scope">
            <el-button size="small" plain :type="scope.row.enable ? 'success' : 'danger'">
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
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
          <el-button icon="Edit" type="primary" link>编辑</el-button>
          <el-button icon="Delete" type="danger" link>删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="header">分页</div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'

const systemStore = useSystemStore()

systemStore.postUsersListAction()

//获取用户列表
const { usersList } = storeToRefs(systemStore)
</script>

<style scoped lang="less">
.content {
  margin-top: 15px;
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
}
</style>
