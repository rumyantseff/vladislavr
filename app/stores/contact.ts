import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useContactStore = defineStore('contact', () => {
  const selectedArea = ref('')

  function setArea(area: string) {
    selectedArea.value = area
  }

  function reset() {
    selectedArea.value = ''
  }

  return { selectedArea, setArea, reset }
})
