<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof UserContent>>()
const modalRef = ref<InstanceType<typeof UserModal>>()

function handleQueryClick(formData: any) {
  contentRef.value?.fetchUsersListData(formData)
}

function handleResetClick() {
  contentRef.value?.fetchUsersListData()
}

function handleNewClick() {
  modalRef.value?.setModalVisble()
}

function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisble(true, itemData)
}
</script>

<style lang="less" scoped></style>
