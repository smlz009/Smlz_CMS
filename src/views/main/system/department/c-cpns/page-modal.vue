<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisble"
      :title="isEditRef ? '编辑部门' : '新建部门'"
      center
      width="30%"
    >
      <div class="form">
        <el-form :model="formData" size="large" label-width="80">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称"></el-input>
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入部门领导"></el-input>
          </el-form-item>
          <el-form-item label="选择部门" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择部门" style="width: 100%">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :value="item.id" :label="item.name"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisble = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import useMainStore from '@/store/main/mian'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'

const useMain = useMainStore()
const systemStore = useSystemStore()

const { entireDepartments } = storeToRefs(useMain)

const dialogVisble = ref(false)
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})

const isEditRef = ref(false)
const editId = ref(0)

//显示弹框
function setModalVisble(isEdit: boolean = false, itemData?: any) {
  dialogVisble.value = true
  isEditRef.value = isEdit
  if (isEdit && itemData) {
    editId.value = itemData.id
    for (const key in formData) {
      formData[key] = itemData[key]
    }
  } else {
    editId.value = 0
    for (const key in formData) {
      formData[key] = ''
    }
  }
}

//确认编辑按钮
function handleConfirm() {
  dialogVisble.value = false
  if (isEditRef.value && editId.value) {
    systemStore.editPageDataAction('department', editId.value, formData)
  } else {
    systemStore.newPageDataAction('department', formData)
  }
}

defineExpose({ setModalVisble })
</script>

<style scoped lang="less">
.form {
  padding: 0 20px;
}
</style>
