// stores/lang.ts
import { defineStore } from 'pinia'

export const useLangStore = defineStore('lang', {
  state: () => ({
    lang: localStorage.getItem('lang') || 'cn',
  }),
  actions: {
    toggleLang() {
      this.lang = this.lang === 'cn' ? 'tw' : 'cn'
      localStorage.setItem('lang', this.lang)
    },
  },
})
