<script setup lang="ts">
const { data } = useFetch('/api/poems/overview')

interface ColorItem {
  bg: string
  text: string
}

const colors: ColorItem[] = [
  { bg: 'bg-red-100 dark:bg-red-500 dark:bg-opacity-50', text: 'text-red-600 dark:text-red-400' },
  { bg: 'bg-green-100 dark:bg-green-500 dark:bg-opacity-50', text: 'text-green-600 dark:text-green-400' },
  { bg: 'bg-blue-100 dark:bg-blue-500 dark:bg-opacity-50', text: 'text-blue-600 dark:text-blue-400' },
]
</script>

<template>
  <div>
    <h2 class="mb-4 text-xl font-bold">
      📊 诗词总览
    </h2>

    <!-- 统计数据卡片 -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div class="rounded-xl bg-gray-100 bg-opacity-60 p-4 text-center dark:bg-gray-500 dark:bg-opacity-50">
        <NuxtLink to="/poems?tag=唐诗三百首" class="text-lg">
          唐诗数量
        </NuxtLink>
        <p class="text-2xl text-blue-600 font-semibold dark:text-blue-400">
          {{ data?.tangCount }}
        </p>
      </div>
      <div class="rounded-xl bg-gray-100 bg-opacity-60 p-4 text-center dark:bg-gray-500 dark:bg-opacity-50">
        <NuxtLink to="/poems?tag=宋词三百首" class="text-lg">
          宋词数量
        </NuxtLink>
        <p class="text-2xl text-green-600 font-semibold dark:text-green-400">
          {{ data?.songCount }}
        </p>
      </div>
      <div class="rounded-xl bg-gray-100 bg-opacity-60 p-4 text-center dark:bg-gray-500 dark:bg-opacity-50">
        <NuxtLink to="/authors" class="text-lg">
          作者数量
        </NuxtLink>
        <p class="text-2xl text-purple-600 font-semibold dark:text-purple-400">
          {{ data?.authorCount }}
        </p>
      </div>
      <div class="rounded-xl bg-gray-100 bg-opacity-60 p-4 text-center dark:bg-gray-500 dark:bg-opacity-50">
        <NuxtLink to="/tags" class="text-lg">
          标签数量
        </NuxtLink>
        <p class="text-2xl text-red-600 font-semibold dark:text-red-400">
          {{ data?.tagCount }}
        </p>
      </div>
    </div>

    <h2 class="my-4 text-xl font-bold">
      📚 高频作者
    </h2>

    <!-- 统计数据卡片 -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div
        v-for="(author, index) in data?.topAuthors"
        :key="index"
        class="rounded-xl bg-gray-100 bg-opacity-60 p-4 text-center dark:bg-gray-500 dark:bg-opacity-50"
      >
        <NuxtLink :to="`/poems?author=${author.name}`" class="text-lg">
          {{ author.name }}
        </NuxtLink>
        <p class="text-2xl font-semibold" :class="colors?.[index % colors.length]?.text || 'text-blue-600'">
          {{ author.count }}
        </p>
      </div>
    </div>

    <h2 class="my-4 text-xl font-bold">
      🏷️ 高频标签
    </h2>

    <!-- 统计数据卡片 -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div
        v-for="(tag, index) in data?.topTags"
        :key="index"
        class="rounded-xl bg-gray-100 bg-opacity-60 p-4 text-center dark:bg-gray-500 dark:bg-opacity-50"
      >
        <NuxtLink :to="`/poems?tag=${tag.name}`" class="text-lg">
          {{ tag.name }}
        </NuxtLink>
        <p class="text-2xl font-semibold" :class="colors?.[index % colors.length]?.text || 'text-blue-600'">
          {{ tag.count }}
        </p>
      </div>
    </div>
  </div>
</template>
