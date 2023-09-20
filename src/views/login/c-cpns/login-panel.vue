<template>
  <div class="login-panel">
    <!-- 登陆 -->
    <pane-account v-model:isLogin="isLogin"></pane-account>
    <!-- 注册 -->
    <pane-register v-model:isLogin="isLogin"></pane-register>
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
  width: 40%;
  min-width: 668px;
  height: 40vh;
  background: url('https://dogefs.s3.ladydaily.com/~/source/wallhaven/full/x6/wallhaven-x67mkz.png?w=2560&h=1440&fmt=webp');
  background-size: cover;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
