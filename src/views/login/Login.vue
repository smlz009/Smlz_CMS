<template>
  <div class="login" id="login">
    <!-- <h2 class="login-title">Smlz CMS</h2> -->
    <!-- <login-panel></login-panel> -->
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted } from 'vue'
// import LoginPanel from './c-cpns/login-panel.vue'

// let container: HTMLElement | null = null //容器
let scene: any = '' //场景

onMounted(() => {
  // container = document.getElementById('login')
  initScene()
})
//初始化场景
function initScene() {
  scene = new THREE.Scene()
  //添加雾效果
  scene.fog = new THREE.Fog(0x000000, 0, 10000)
}
</script>

<style scoped lang="less">
.login {
  height: 100vh;
  // background: url('https://dogefs.s3.ladydaily.com/~/source/wallhaven/full/l3/wallhaven-l36xyy.png?w=2560&h=1440&fmt=webp')
  //   center;
  // background-size: cover;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  .login-title {
    font-size: 36px;
    padding-bottom: 50px;
    margin-top: 20vh;
  }
}
</style>
