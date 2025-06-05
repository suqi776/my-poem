<script setup lang="ts">
const router = useRouter()
const { data } = useFetch('/api/authors')

useHead({
  title: '作者',
})
</script>

<template>
  <div>
    <ul v-if="data?.authors" class="grid grid-cols-1 mt-4 gap-2 md:grid-cols-5">
      <li
        v-for="author in data?.authors"
        :key="author.name"
        class="flex cursor-pointer items-end justify-between opacity-75 hover:underline hover:opacity-100"
      >
        <span
          :title="author.name"
          class="w-full truncate border b-gray-200 rounded-md p-2 text-lg dark:border-opacity-25"
          @click="router.push(`/poems?author=${author.name}`)"
        >
          {{ author.name }} <em>{{ author.count }}</em>
        </span>
      </li>
    </ul>

    <div v-else class="animate-pulse text-gray-500 italic">
      Loading...
    </div>
  </div>
</template>
