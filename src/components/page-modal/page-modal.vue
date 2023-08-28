<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisble"
      :title="isEditRef ? modalConfig.header?.editTitle : modalConfig.header?.newTitle"
      center
      width="30%"
    >
      <div class="form">
        <el-form :model="formData" size="large" label-width="80">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder"></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                ></el-date-picker>
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :value="option.value" :label="option.label"></el-option>
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
import useSystemStore from '@/store/main/system/system'
import type { IModalProps } from './type'

const systemStore = useSystemStore()

const props = defineProps<IModalProps>()

const initiaForm: any = {}

for (const item of props.modalConfig.formItems) {
  initiaForm[item.prop] = item.initiaValue ?? ''
}

const dialogVisble = ref(false)
const formData = reactive(initiaForm)

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
  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  if (isEditRef.value && editId.value) {
    systemStore.editPageDataAction(props.modalConfig.pageName, editId.value, infoData)
  } else {
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
  }
}

defineExpose({ setModalVisble })
</script>

<style scoped lang="less">
.form {
  padding: 0 20px;
}
</style>
