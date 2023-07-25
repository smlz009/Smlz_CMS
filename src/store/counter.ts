import { defineStore } from 'pinia'

const useCounter = defineStore('counter', {
  state: () => ({
    counter: 100
  }),
  actions: {
    changeCounterAction(newVal: number) {
      this.counter = newVal
    }
  }
})

export default useCounter
