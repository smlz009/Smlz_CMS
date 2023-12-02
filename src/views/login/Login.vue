<template>
  <div class="login" id="login">
    <h2 class="login-title">Smlz CMS</h2>
    <login-panel></login-panel>
    <el-button @click="a">555</el-button>
  </div>
</template>

<script setup lang="ts">
import LoginPanel from './c-cpns/login-panel.vue'

const a = () => {
  console.log(555)
}
</script>

<style scoped lang="less">
.login {
  height: 100vh;
  background: url('https://dogefs.s3.ladydaily.com/~/source/wallhaven/full/l3/wallhaven-l36xyy.png?w=2560&h=1440&fmt=webp')
    center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  .login-title {
    font-size: 36px;
    padding-bottom: 50px;
    margin-top: 20vh;
  }
}
</style>
