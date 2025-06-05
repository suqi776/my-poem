<script setup lang="ts">
const props = defineProps<{
  poem: {
    id: string
    title: string
    author: string
    paragraphs: string[] | string
    tags?: string[]
  }
}>()

const router = useRouter()

useHead({
  title: props.poem?.title && props.poem?.author
    ? `${props.poem.title} - ${props.poem.author}`
    : '诗词详情',
})

</script>

<template>
  <div class="max-w-3xl">
    <h1 class="mb-2 text-4xl font-semibold tracking-tight">
      {{ poem.title }}
    </h1>
    <NuxtLink :to="`/poems?author=${poem.author}`" class="text-lg text-gray-500 opacity-75 dark:text-gray-400 hover:opacity-100">
      {{ poem.author }}
    </NuxtLink>
    <div v-if="poem.tags?.length" class="my-3 flex flex-wrap gap-2">
      <span
        v-for="tag in poem.tags"
        :key="tag"
        class="cursor-pointer rounded-xl bg-gray-100 bg-opacity-60 px-3 py-1 text-sm opacity-85 dark:bg-gray-500 dark:bg-opacity-50 hover:opacity-100"
        @click="router.push(`/poems?tag=${tag}`)"
      >
        #{{ tag }}
      </span>
    </div>
    <div class="rounded-xl bg-gray-100 bg-opacity-60 p-4 p-6 text-center dark:bg-gray-500 dark:bg-opacity-50">
      <div class="whitespace-pre-line text-lg text-gray-800 leading-loose tracking-wide dark:text-gray-200">
        <template v-if="Array.isArray(poem.paragraphs)">
          <p v-for="(line, index) in poem.paragraphs" :key="index" class="mb-2">
            {{ line }}
          </p>
        </template>
        <template v-else>
          {{ poem.paragraphs }}
        </template>
      </div>
    </div>
  </div>
</template>
