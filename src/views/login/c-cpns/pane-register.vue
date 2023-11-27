<template>
  <div :class="['pane-register', !isLogin ? '' : 'active']">
    <transition name="slide">
      <el-form :model="account" :rules="accountRules" ref="formRef" v-if="!isLogin">
        <div class="register-title">注册帐号</div>
        <el-form-item prop="name">
          <el-input
            placeholder="帐号"
            class="register-account"
            size="large"
            v-model="account.name"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            size="large"
            v-model="account.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-button @click="registerAction" class="register-btn">点击注册</el-button>
      </el-form>
      <el-button v-else class="no-btn" @click="emit('update:isLogin', false)">
        没有帐号,点击注册
      </el-button>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import type { IAccount } from '@/types'
import useLoginStore from '@/store/login/login'

defineProps(['isLogin'])
const emit = defineEmits(['update:isLogin'])
const loginStore = useLoginStore()

//注册数据
const account = reactive<IAccount>({
  name: '',
  password: ''
})

//获取表单ref
const formRef = ref<InstanceType<typeof ElForm>>()

//表单规则
const accountRules: FormRules = {
  name: [{ required: true, message: '请输入帐号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

function registerAction() {
  formRef.value?.validate((valid) => {
    if (valid) {
      const { name, password } = account
      //发送异步请求 进行登陆
      loginStore.createUserAction({ name, password }, () => {
        emit('update:isLogin', true)
      })
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
  transform: translateX(100%);
}

.pane-register {
  width: calc(50% - 40px);
  height: 100%;
  background: rgba(255, 255, 255);
  padding: 0px 20px;
  border-radius: 0px 10px 10px 0px;
  .register-title {
    padding-top: 40px;
    padding-bottom: 20px;
    font-size: 22px;
    text-align: center;
  }
  .register-account {
    height: 40px;
  }
  .register-btn {
    width: 6vw;
    margin-top: 20px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .no-btn {
    width: 50%;
    background: rgba(255, 255, 255, 0.8);
    margin-left: 50%;
    transform: translate(-50%, 450%);
  }
}
.active {
  background-color: transparent;
}
</style>
