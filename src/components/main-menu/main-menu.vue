<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.png" alt="" />
      <h2 class="title" v-show="!isCollapse">Smlz CMS</h2>
    </div>
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :collapse="isCollapse"
      >
        <el-sub-menu :index="item.id + ''" v-for="item in userMenus" :key="item.id">
          <template #title>
            <el-icon>
              <component :is="item.icon.split('el-icon')[1]" />
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
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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

const activeMenu = mapPathMenu(route.path, userMenus)

//跳转页面
function handelMenuClick(item: any) {
  router.push(item.url)
}

//菜单默认弹出
const defaultActive = ref(activeMenu.id + '')
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
    color: white;
    white-space: nowrap;
  }
}
.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #2d8cf0;
  }
}
</style>
