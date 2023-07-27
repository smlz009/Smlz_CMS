<template>
  <div class="login-panel">
    <!-- <div :class="['login-warp', isLogin ? '' : 'active']">
      <div class="login-form" v-if="isLogin">
        <div class="login-title">欢迎登陆</div>
        <el-input placeholder="账号" class="login-account"></el-input>
        <el-input placeholder="密码"></el-input>
        <el-button class="login-btn">登陆</el-button>
      </div>
      <el-button v-else class="no-btn" @click="isLogin = true">已有账号,直接登陆</el-button>
    </div> -->
    <pane-account v-model:isLogin="isLogin"></pane-account>
    <pane-register v-model:isLogin="isLogin"></pane-register>
    <!-- <div :class="['register-warp', !isLogin ? '' : 'active']">
      <div v-if="!isLogin">
        <div class="login-title">注册账号</div>
        <el-input placeholder="账号" class="login-account"></el-input>
        <el-input placeholder="密码"></el-input>
        <el-button class="login-btn">点击注册</el-button>
      </div>
      <el-button v-else class="no-btn" @click="isLogin = false">没有账号,点击注册</el-button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PaneAccount from './pane-account.vue'
import PaneRegister from './pane-register.vue'

//显示切换
const isLogin = ref(true)
</script>

<style scoped lang="less">
.login-panel {
  width: 40vw;
  height: 40vh;
  background: url('https://dogefs.s3.ladydaily.com/~/source/wallhaven/full/x6/wallhaven-x67mkz.png?w=2560&h=1440&fmt=webp');
  background-size: cover;
  display: flex;
  border-radius: 20px;
}
</style>
