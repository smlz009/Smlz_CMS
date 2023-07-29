<template>
  <div :class="['pane-account', isLogin ? '' : 'active']">
    <transition name="slide">
      <el-form :model="account" :rules="accountRules" ref="formRef" v-if="isLogin">
        <div class="login-title">欢迎登陆</div>
        <el-form-item prop="name">
          <el-input placeholder="帐号" size="large" v-model="account.name"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            size="large"
            show-password
            v-model="account.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" @click="loginAction">登陆</el-button>
        </el-form-item>
      </el-form>
      <el-button v-else class="no-btn" @click="emit('update:isLogin', true)">
        已有帐号,直接登陆
      </el-button>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'

defineProps(['isLogin'])
const emit = defineEmits(['update:isLogin'])

const loginStore = useLoginStore()

//登录数据
const account = reactive<IAccount>({
  name: 'coderwhy',
  password: '123456'
})

//获取表单ref
const formRef = ref<InstanceType<typeof ElForm>>()

//表单规则
const accountRules: FormRules = {
  name: [{ required: true, message: '请输入帐号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

//点击登录 校验表单
function loginAction() {
  formRef.value?.validate((valid) => {
    if (valid) {
      const { name, password } = account
      //发送异步请求 进行登陆
      loginStore.loginAccountAction({ name, password })
    } else {
      ElMessage.error('请填写完整信息，并且进行校验')
    }
  })
}
</script>

<style scoped lang="less">
.slide-enter-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.pane-account {
  width: calc(50% - 40px);
  height: 100%;
  background: rgba(255, 255, 255);
  padding: 0px 20px;
  border-radius: 10px 0 0 10px;
  .login-title {
    padding-top: 40px;
    padding-bottom: 20px;
    font-size: 22px;
    text-align: center;
  }
  .login-btn {
    width: 6vw;
    margin-top: 20px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .no-btn {
    width: 50%;
    background: rgba(255, 255, 255, 0.8);
    margin-top: 50%;
    margin-left: 50%;
    transform: translate(-50%, -50%);
  }
}
.active {
  background-color: transparent;
}
</style>
