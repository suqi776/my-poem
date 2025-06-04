<script setup lang="ts">
import { appName } from '@/constants'

useHead({
  title: appName,
})
</script>

<template>
  <Bg
    pc-image="/pc-bg.png"
    mobile-image="/falao.jpg"
  >
    <div class="m-auto max-w-75ch px-7 pb-10">
      <VitePwaManifest />
      <Nav />
      <NuxtPage />
    </div>
  </Bg>
</template>

<style>
html.dark {
  color-scheme: dark;
}
</style>
