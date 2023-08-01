<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.png" alt="" />
      <h2 class="title">Smlz CMS</h2>
    </div>
    <div class="menu">
      <el-menu
        default-active="4"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <el-sub-menu :index="item.id + ''" v-for="item in userMenus" :key="item.id">
          <template #title>
            <el-icon>
              <component :is="item.icon.split('el-icon')[1]" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="c in item.children" :key="c.id" :index="c.id + ''">
            {{ c.name }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'

//获取动态菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  height: 35px;
  padding: 12px 10px 8px 10px;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 22px;
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
