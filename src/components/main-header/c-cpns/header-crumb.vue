<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item, index) in curmbList" :key="index" :to="item.path">
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { mapPathCrumb } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'

const route = useRoute()
const loginStore = useLoginStore()

const curmbList = computed(() => {
  return mapPathCrumb(route.path, loginStore.userMenus)
})
</script>

<style scoped lang="less">
:deep(.el-breadcrumb__inner.is-link) {
  color: var(--theme-color);
}
</style>
