<script setup lang="ts">
const router = useRouter()
const { data } = useFetch('/api/tags')
</script>

<template>
  <div>
    <ul v-if="data?.tags" class="grid grid-cols-1 mt-4 gap-2 md:grid-cols-4">
      <li
        v-for="tag in data?.tags"
        :key="tag.name"
        class="flex cursor-pointer items-end justify-between opacity-75 hover:underline hover:opacity-100"
      >
        <span
          :title="tag.name"
          class="w-full truncate border b-gray-200 rounded-md p-2 text-lg dark:border-opacity-25"
          @click="router.push(`/poems?tag=${tag.name}`)"
        >
          {{ tag.name }} <em>{{ tag.count }}</em>
        </span>
      </li>
    </ul>

    <div v-else class="animate-pulse text-gray-500 italic">
      Loading...
    </div>
  </div>
</template>
