<template>
  <div class="search">
    <el-form size="large" label-width="80px" :model="searchFrom" ref="formRef">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchFrom[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchFrom[item.prop]"
                  :placeholder="item.placeholder"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                ></el-date-picker>
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchFrom[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :value="option.value" :label="option.label"></el-option>
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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

interface IProps {
  searchConfig: {
    formItems: any[]
  }
}

const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<IProps>()

const initiaForm: any = {}

for (const item of props.searchConfig.formItems) {
  initiaForm[item.prop] = item.initiaValue ?? ''
}

const searchFrom = reactive(initiaForm)
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
