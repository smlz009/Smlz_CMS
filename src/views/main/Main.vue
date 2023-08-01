<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside width="240px">
        <main-menu />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header />
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
  <!-- <el-button @click="exitAction">退出登录</el-button> -->
</template>

<script setup lang="ts">
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
// import { LOGIN_TOKEN } from '@/global/constants'
// import { localCache } from '@/utils/cache'
// import { useRouter } from 'vue-router'

// const router = useRouter()

//退出登录
// function exitAction() {
//   localCache.removeCache(LOGIN_TOKEN)
//   router.push('/login')
// }
</script>

<style scoped lang="less">
.main {
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
