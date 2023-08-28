import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

type EditFnType = (data: any) => void

function usePageModal(editCallBack?: EditFnType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()

  function handleNewClick() {
    modalRef.value?.setModalVisble()
  }

  function handleEditClick(itemData: any) {
    modalRef.value?.setModalVisble(true, itemData)
    if (editCallBack) editCallBack(itemData)
  }

  return {
    modalRef,
    handleNewClick,
    handleEditClick
  }
}

export default usePageModal
