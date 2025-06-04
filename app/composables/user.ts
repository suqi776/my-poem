import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const currentName = ref('')
  const historyNames = ref(new Set<string>())
  const otherNames = computed(() => Array.from(historyNames.value).filter(name => name !== currentName.value))

  const setName = (newName: string) => {
    if (currentName.value)
      historyNames.value.add(currentName.value)
    currentName.value = newName
  }

  return {
    currentName,
    setName,
    otherNames,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
