<template>
  <div :class="['pane-account', isLogin ? '' : 'active']">
    <transition name="slide">
      <div v-if="isLogin">
        <div class="login-title">欢迎登陆</div>
        <el-input
          placeholder="帐号"
          class="login-account"
          size="large"
          v-model="account.name"
        ></el-input>
        <el-input
          placeholder="密码"
          size="large"
          show-password
          v-model="account.password"
        ></el-input>
        <el-button class="login-btn">登陆</el-button>
      </div>
      <el-button v-else class="no-btn" @click="emit('update:isLogin', true)">
        已有帐号,直接登陆
      </el-button>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
defineProps(['isLogin'])
const emit = defineEmits(['update:isLogin'])

const account = reactive({
  name: '',
  password: ''
})
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
  border-radius: 20px 0 0 20px;
  .login-title {
    padding-top: 40px;
    padding-bottom: 20px;
    font-size: 22px;
    text-align: center;
  }
  .login-account {
    margin-bottom: 20px;
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
