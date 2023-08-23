<template>
  <div class="department">
    <page-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
      :searchConfig="searchConfig"
    />
    <page-content
      ref="contentRef"
      :contentConfig="contentConfig"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #name="scope">
        <span class="name">{{ scope.row[scope.prop] }}</span>
      </template>
    </page-content>
    <page-modal :modalConfig="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import { ref, computed } from 'vue'
import useMainStore from '@/store/main/mian'

const contentRef = ref<InstanceType<typeof PageContent>>()
const modalRef = ref<InstanceType<typeof PageModal>>()

const modalConfigRef = computed(() => {
  const useMain = useMainStore()
  const departments = useMain.entireDepartments.map((option) => {
    return {
      label: option.name,
      value: option.id
    }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options = departments
    }
  })
  return modalConfig
})

function handleQueryClick(formData: any) {
  contentRef.value?.fetchPageListData(formData)
}

function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

function handleNewClick() {
  modalRef.value?.setModalVisble()
}

function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisble(true, itemData)
}
</script>

<style scoped lang="less">
.name {
  color: pink;
}
</style>
