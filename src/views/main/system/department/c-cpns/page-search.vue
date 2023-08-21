<template>
  <div class="search">
    <el-form size="large" label-width="80px" :model="searchFrom" ref="formRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input placeholder="帐号" v-model="searchFrom.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input placeholder="真实姓名" v-model="searchFrom.leader"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchFrom.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button type="primary" icon="Search" @click="handleQueryClick">搜索</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { ref, reactive } from 'vue'

const emit = defineEmits(['queryClick', 'resetClick'])

const searchFrom = reactive({
  name: '',
  leader: '',
  createAt: ''
})
const formRef = ref<InstanceType<typeof ElForm>>()

//重置
function handleResetClick() {
  formRef.value?.resetFields()
  emit('resetClick')
}

//查询
function handleQueryClick() {
  emit('queryClick', searchFrom)
}
</script>

<style scoped lang="less">
.search {
  background-color: #fff;
  padding: 12px 20px;
  border-radius: 5px;

  .el-form-item {
    padding: 15px;
    margin-bottom: 0;
  }
}

.btns {
  text-align: right;
  padding: 10px 50px 10px 0;
}
</style>
