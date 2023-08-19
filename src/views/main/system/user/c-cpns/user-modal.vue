<template>
  <div class="modal">
    <el-dialog v-model="dialogVisble" title="新建用户" center width="30%">
      <div class="form">
        <el-form :model="formData" size="large" label-width="80">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :value="item.id" :label="item.name"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%">
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

const { entireRoles, entireDepartments } = storeToRefs(useMain)

const dialogVisble = ref(false)
const formData = reactive({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

//显示弹框
function setModalVisble() {
  dialogVisble.value = true
}

//确认按钮
function handleConfirm() {
  dialogVisble.value = false
  systemStore.newUserDataAction(formData)
}

defineExpose({ setModalVisble })
</script>

<style scoped lang="less">
.form {
  padding: 0 20px;
}
</style>
