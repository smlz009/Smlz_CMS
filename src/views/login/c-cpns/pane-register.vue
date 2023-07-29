<template>
  <div :class="['pane-register', !isLogin ? '' : 'active']">
    <transition name="slide">
      <el-form v-if="!isLogin">
        <div class="register-title">注册帐号</div>
        <el-input placeholder="帐号" class="register-account" size="large"></el-input>
        <el-input placeholder="密码" size="large"></el-input>
        <el-button @click="registerAction" class="register-btn">点击注册</el-button>
      </el-form>
      <el-button v-else class="no-btn" @click="emit('update:isLogin', false)">
        没有帐号,点击注册
      </el-button>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
defineProps(['isLogin'])
const emit = defineEmits(['update:isLogin'])

function registerAction() {
  ElMessage.error('暂无注册功能，请使用默认帐号')
}
</script>

<style scoped lang="less">
.slide-enter-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.pane-register {
  width: calc(50% - 40px);
  height: 100%;
  background: rgba(255, 255, 255);
  padding: 0px 20px;
  border-radius: 0px 10px 10px 0px;
  .register-title {
    padding-top: 40px;
    padding-bottom: 20px;
    font-size: 22px;
    text-align: center;
  }
  .register-account {
    margin-bottom: 20px;
    height: 40px;
  }
  .register-btn {
    width: 6vw;
    margin-top: 20px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .no-btn {
    width: 50%;
    background: rgba(255, 255, 255, 0.8);
    margin-left: 50%;
    transform: translate(-50%, 450%);
  }
}
.active {
  background-color: transparent;
}
</style>
