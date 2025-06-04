<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const author = route.query.author as string | undefined
const tag = route.query.tag as string | undefined

const { data } = useFetch('/api/poems', {
  params: {
    author,
    tag,
  },
})
</script>

<template>
  <div>
    <ul v-if="data?.poems.length" class="grid grid-cols-1 mt-4 gap-2 md:grid-cols-3">
      <li
        v-for="poem in data?.poems"
        :key="poem.id"
        class="flex cursor-pointer items-end justify-between opacity-75 hover:underline hover:opacity-100"
      >
        <div
          class="w-full truncate border b-gray-200 rounded-md p-2 text-lg dark:border-opacity-25"
          :title="`${poem.title}(${poem.author})`"
          @click="() => router.push(`/poems/${poem.id}`)"
        >
          {{ poem.title }}<span class="text-sm text-gray-500">({{ poem.author }})</span>
        </div>
      </li>
    </ul>

    <div v-else-if="data?.error" class="text-red-500">
      {{ data.error }}
    </div>

    <div v-else class="animate-pulse text-gray-600 italic">
      Loading...
    </div>
  </div>
</template>
