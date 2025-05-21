<script setup>
import { useLangStore } from '../store/lang'

import { useStyleStore } from '../store/style'

const langStore = useLangStore()

function toggleLang() {
  langStore.toggleLang()
}

const styleStore = useStyleStore()

function toggleGrid() {
  styleStore.toggleGrid()
}
</script>

<template>
  <button class="lang-switcher" @click="toggleLang">
    {{ langStore.lang === 'cn' ? '繁' : '简' }}
  </button>

  <button class="extra-button" @click="toggleGrid">
    {{ styleStore.hasGrid ? '隐' : '显' }}
  </button>
</template>

<style scoped>
.lang-switcher {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #ccc;
  border-radius: 9999px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  transition: background-color 0.2s ease;
}

.lang-switcher:hover {
  background-color: rgba(255, 255, 255, 1);
}

/* 新增按钮样式 */
.extra-button {
  position: fixed;
  bottom: 60px;
  right: 20px;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #ccc;
  border-radius: 9999px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  transition: background-color 0.2s ease;
}

.extra-button:hover {
  background-color: rgba(255, 255, 255, 1);
}
</style>
