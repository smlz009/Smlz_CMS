<template>
  <div class="main">
    <h2>{{ counterStore.counter }}</h2>
    <button @click="changeCounter">改变</button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '@/store/counter'
import $request from '@/service'

const counterStore = useCounterStore()

const changeCounter = () => {
  counterStore.changeCounterAction(66)
}

$request
  .request({
    url: 'home/goodprice'
  })
  .then((res) => {
    console.log(res)
  })
</script>

<style scoped></style>
