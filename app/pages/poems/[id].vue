<script setup lang="ts">
const route = useRoute<'poems-id'>()
const id = route.params.id

const { data } = useFetch('/api/poems', {
  params: {
    id,
  },
})

const poem = computed(() => {
  if (!data.value || !data.value.poems || data.value.poems.length === 0) {
    return null
  }
  return data.value.poems[0]
})
</script>

<template>
  <div class="flex flex-col">
    <Poem v-if="poem" :poem="poem" />

    <div v-else class="animate-pulse text-gray-500 italic">
      Loading...
    </div>
  </div>
</template>
