<template>
  <div class="modal">
    <el-dialog v-model="dialogVisble" title="新建用户" center width="30%">
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisble = false">取消</el-button>
          <el-button type="primary" @click="dialogVisble = false"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialogVisble = ref(false)

function setModalVisble() {
  dialogVisble.value = true
}

defineExpose({ setModalVisble })
</script>

<style scoped lang="less"></style>
