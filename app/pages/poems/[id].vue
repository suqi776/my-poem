<script setup lang="ts">
const route = useRoute<'poems-id'>()
const id = route.params.id

const { data } = useFetch('/api/poems', {
  params: {
    id,
  },
})
</script>

<template>
  <div class="flex flex-col">
    <Poem v-if="data" :poem="data" />

    <div v-else class="animate-pulse text-gray-500 italic">
      Loading...
    </div>
  </div>
</template>
