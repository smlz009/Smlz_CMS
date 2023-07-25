<template>
  <div class="main">
    <h2>{{ counterStore.counter }}</h2>
    <button @click="changeCounter">改变</button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '@/store/counter'

const counterStore = useCounterStore()

const changeCounter = () => {
  counterStore.changeCounterAction(66)
}
</script>

<style scoped></style>
