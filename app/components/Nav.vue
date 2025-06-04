<script setup lang="ts">
const route = useRoute()
const color = useColorMode()

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
})

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}

const routeMap: Record<string, string> = {
  '/': '总览',
  '/poems': '列表',
  '/authors': '作者',
  '/tags': '标签',
}

function isActive(path: string) {
  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <nav class="flex flex-row items-center justify-between gap-2 py-5">
    <div class="flex items-center gap-2 text-2xl font-bold">
      <NuxtLink
        v-for="(label, path) in routeMap"
        :key="path"
        :to="path"
        :class="isActive(path) ? 'opacity-100' : 'opacity-50'"
      >
        {{ label }}
      </NuxtLink>
    </div>
    <button icon-btn title="Toggle Dark Mode" @click="toggleDark">
      <div class="i-carbon-sun dark:i-carbon-moon text-2xl font-bold" />
    </button>
  </nav>
</template>
