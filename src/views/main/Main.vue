<template>
  <div class="main">main</div>
  <el-button @click="exitAction">退出登录</el-button>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()

//退出登录
function exitAction() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style scoped></style>
