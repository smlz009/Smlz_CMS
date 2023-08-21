<template>
  <div class="role">
    <page-search :searchConfig="searchConfig" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'
</script>

<style lang="less" scoped></style>
