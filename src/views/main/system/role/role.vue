<template>
  <div class="role">
    <page-search
      :searchConfig="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :contentConfig="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <page-modal :modalConfig="modalConfig" :otherInfo="otherInfo" ref="modalRef">
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/mian'
import { storeToRefs } from 'pinia'
import { ref, nextTick } from 'vue'
import type { ElTree } from 'element-plus'
import { mapMenuListToIds } from '@/utils/map-menus'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewClick, handleEditClick } = usePageModal(editCallBack)

const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})

function handleTreeCheck(node: any, kyes: any) {
  const menuList = [...kyes.checkedKeys, ...kyes.halfCheckedKeys]
  otherInfo.value = {
    menuList
  }
}

const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallBack(itemData: any) {
  nextTick(() => {
    const ids = mapMenuListToIds(itemData.menuList)
    console.log(ids)

    treeRef.value?.setCheckedKeys(ids)
  })
}
</script>

<style lang="less" scoped></style>
