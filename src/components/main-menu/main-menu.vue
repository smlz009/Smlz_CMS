<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.png" alt="" />
      <h2 class="title" v-show="!isCollapse">Smlz CMS</h2>
    </div>
    <div class="menu">
      <el-menu :default-active="defaultActive" :collapse="isCollapse">
        <template v-for="item in userMenus">
          <template v-if="item.children && item.children.length > 0">
            <el-sub-menu :index="item.id + ''" :key="item.id">
              <template #title>
                <el-icon>
                  <component :is="item.icon" />
                </el-icon>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item
                v-for="c in item.children"
                :key="c.id"
                :index="c.id + ''"
                @click="handelMenuClick(c)"
              >
                {{ c.name }}
              </el-menu-item>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item @click="handelMenuClick(item)" :key="item.id">
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              {{ item.name }}
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useLoginStore from '@/store/login/login'
import { useRouter, useRoute } from 'vue-router'
import { mapPathMenu } from '@/utils/map-menus'

defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const route = useRoute()

//获取动态菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

//跳转页面
function handelMenuClick(item: any) {
  router.push(item.url)
}

//菜单默认弹出
const defaultActive = computed(() => {
  const activeMenu = mapPathMenu(route.path, userMenus)
  return activeMenu.id + ''
})
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  height: 25px;
  padding: 12px 10px 8px 10px;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 20px;
    font-weight: 700;
    color: var(--theme-color);
    white-space: nowrap;
  }
}
.el-menu {
  border-right: none;
  user-select: none;
  color: var(--theme-color);
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px;
  }
  :deep(.el-sub-menu__title) {
    color: var(--theme-color);
    background-color: var(--theme-bg);
  }

  .el-menu-item:hover {
    color: #49d4c6;
  }

  .el-menu-item.is-active {
    background-color: var(--theme-bg);
  }
}
</style>
