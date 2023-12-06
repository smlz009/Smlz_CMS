<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <!-- <main-menu :isCollapse="isCollapse" /> -->
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @fold-change="handleFoldMenu" />
        </el-header>
        <!-- <main-affix /> -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
import MainAffix from '@/components/main-affix/main-affix.vue'
import { ref } from 'vue'

const isCollapse = ref(false) //菜单是否缩放

function handleFoldMenu(isFold: boolean) {
  isCollapse.value = isFold
}
</script>

<style scoped lang="less">
.main {
  height: 100%;
  color: var(--theme-color);
  background-color: var(--theme-bg);
}

.main-content {
  height: 100vh;
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    padding-top: 0;
    background-color: var(--theme-bg);
    color: var(--theme-color);
  }
}
</style>
