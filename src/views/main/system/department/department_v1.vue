<template>
  <div class="department">
    <page-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <page-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof PageContent>>()
const modalRef = ref<InstanceType<typeof PageModal>>()

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

<style scoped lang="less"></style>
