import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

type CallFnType = (data?: any) => void

function usePageModal(newCallBack?: CallFnType, editCallBack?: CallFnType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()

  function handleNewClick() {
    modalRef.value?.setModalVisble()
    if (newCallBack) newCallBack()
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
