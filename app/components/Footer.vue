<script setup lang="ts">
import { load } from 'jinrishici'

const poem = ref([]) as any

onMounted(() => {
  load((result: any) => {
    poem.value = result.data
  })
})
</script>

<template>
  <footer class="w-full inline-flex flex-col items-center justify-center gap-1 pt-5 text-sm text-gray-500 dark:text-gray-300">
    <template v-if="poem">
      <div class="text-center">
        「{{ poem?.content }}」
      </div>
      <div class="text-xs">
        —— {{ poem?.origin?.author }} · 《{{ poem?.origin?.title }}》
      </div>
    </template>
    <div v-else>
      未能加载诗词。
    </div>
  </footer>
</template>
