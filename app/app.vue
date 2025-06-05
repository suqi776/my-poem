<script setup lang="ts">
import { appName } from '@/constants'

useHead({
  title: appName,
})
</script>

<template>
  <Bg>
    <div class="m-auto max-w-75ch px-7 pb-10">
      <VitePwaManifest />
      <Nav />
      <NuxtPage />
      <Footer />
    </div>
  </Bg>
</template>

<style>
html.dark {
  color-scheme: dark;
}
</style>
