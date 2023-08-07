<template>
  <div class="user">
    <div class="search-warp">
      <user-search />
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
