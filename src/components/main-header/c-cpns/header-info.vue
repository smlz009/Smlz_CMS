<template>
  <div class="header-info">
    <div class="operation">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <b class="dot"></b>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
      <span @click="changeTheme">
        <transition name="fade" mode="out-in">
          <Sun :width="'30px'" :height="'30px'" v-if="theme" />
          <Moon :width="'20px'" :height="'20px'" v-else />
        </transition>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar
            :size="30"
            src="https://foruda.gitee.com/avatar/1677093728847255252/7742932_smlz009_1625212746.png!avatar200"
          />
          <span class="name">{{ name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item @click="handleExit" divided>
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'
import useLoginStore from '@/store/login/login'
import useMainStore from '@/store/main/mian'
import { storeToRefs } from 'pinia'
import { setTheme } from '@/utils/theme-util'
import Sun from '@/svg/sun.vue'
import Moon from '@/svg/moon.vue'

const loginStore = useLoginStore()
const mainStore = useMainStore()

const { name } = loginStore.userInfo
const { theme } = storeToRefs(mainStore)

const ruter = useRouter()

//退出登录
function handleExit() {
  localCache.removeCache(LOGIN_TOKEN)
  localCache.removeCache('USER_INFO')
  localCache.removeCache('USER_MENUS')
  ruter.push('/login')
}

//更改主题
function changeTheme() {
  mainStore.changeThemeStatus()
  setTheme()
}
</script>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;
}
.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;
    color: var(--theme-color);
    cursor: pointer;

    &::after {
      width: 0;
      background-color: #49d4c6;
      bottom: 0px;
      content: '';
      height: 3px;
      left: 5px;
      position: absolute;
      transition: all 0.5s ease;
    }
    &:hover {
      &::after {
        width: 30px;
      }
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}
.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      color: var(--theme-color);
      margin-left: 5px;
    }
  }
}
.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
  .el-tooltip__trigger:focus-visible {
    outline: unset;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.65s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
