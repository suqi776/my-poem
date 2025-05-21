// 是否有格子
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 当前页面是否显示格子
export const useStyleStore = defineStore('style', () => {
  // const hasGrid = ref(true)
  const hasGrid = ref(JSON.parse(localStorage.getItem('hasGrid') ?? 'true'))

  // 切换格子显示状态
  function toggleGrid() {
    hasGrid.value = !hasGrid.value
    localStorage.setItem('hasGrid', JSON.stringify(hasGrid.value))
  }

  // 可以额外添加设置显示状态的函数
  function setGrid(value) {
    hasGrid.value = value
  }

  return { hasGrid, toggleGrid, setGrid }
})
