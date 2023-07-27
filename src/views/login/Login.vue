<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script setup lang="ts">
import LoginPanel from './c-cpns/login-panel.vue'
</script>

<style scoped lang="less">
.login {
  height: 100%;
  background: url('https://dogefs.s3.ladydaily.com/~/source/wallhaven/full/l3/wallhaven-l36xyy.png?w=2560&h=1440&fmt=webp')
    center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
