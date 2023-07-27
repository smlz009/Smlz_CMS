<template>
  <div class="pane-register">
    <div :class="['register-warp', !isLogin ? '' : 'active']">
      <div v-if="!isLogin">
        <div class="login-title">注册账号</div>
        <el-input placeholder="账号" class="login-account"></el-input>
        <el-input placeholder="密码"></el-input>
        <el-button class="login-btn">点击注册</el-button>
      </div>
      <el-button v-else class="no-btn" @click="emit('update:isLogin', false)">
        没有账号,点击注册
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['isLogin'])
const emit = defineEmits(['update:isLogin'])
</script>

<style scoped lang="less">
.register-warp {
  width: calc(20vw - 40px);
  height: 100%;
  background: rgba(255, 255, 255);
  padding: 0px 20px;
  border-radius: 0px 20px 20px 0px;
  .login-title {
    padding-top: 40px;
    padding-bottom: 20px;
    font-size: 22px;
    text-align: center;
  }
  .login-account {
    margin-bottom: 20px;
    height: 40px;
  }
  .login-btn {
    width: 6vw;
    margin-top: 20px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
}
.no-btn {
  width: 10vw;
  margin-top: 50%;
  margin-left: 50%;
  transform: translate(-50%, -100%);
  background: rgba(255, 255, 255, 0.8);
}
.active {
  background-color: transparent;
}
</style>
