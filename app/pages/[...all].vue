<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main class="px-4 py-10 text-center text-gray">
    <div class="text-4xl">
      <div class="i-carbon-warning inline-block" />
    </div>
    <div>Not found</div>
    <div>
      <button class="m-4 mt-8 btn" @click="router.back()">
        Back
      </button>
    </div>
  </main>
</template>
