<template>
  <div class="main-affix">
    <el-affix :offset="20">
      <template v-for="(item, index) in affixList" :key="item.name">
        <el-button
          @click="handelAffixClick(item)"
          :class="['affix-text', item.isActive ? 'active' : '']"
        >
          <span>{{ item.name }}</span>
          <el-icon v-if="item.meta" @click.stop="handelAffixClose(item, index)"><Close /></el-icon>
        </el-button>
      </template>
    </el-affix>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/mian'
import { useRouter } from 'vue-router'

const router = useRouter()

const mainStore = useMainStore()

const { affixList } = mainStore

//点击图钉调整路由
function handelAffixClick(item: any) {
  const url = item.path || item.url
  router.push(url)
}

//关闭图钉
function handelAffixClose(item: any, index: number) {
  mainStore.delAffixListAction(index)

  let url = ''
  if (affixList.length === 1 || index - 1 === 0) {
    url = affixList[index - 1].url
  } else {
    url = affixList[index - 1].path
  }
  router.push(url)
}
</script>

<style scoped lang="less">
.main-affix {
  background-color: #f0f2f5;
  padding: 10px 0 10px 20px;
  display: flex;

  .affix-text {
    margin-right: 10px;
  }

  .active {
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
    border-color: var(--el-button-hover-border-color);
  }
}
</style>
