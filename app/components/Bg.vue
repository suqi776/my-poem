<script setup lang="ts">
const props = defineProps<{
  pcImage: string
  mobileImage: string
}>()

const isPC = ref(true)

function updateScreenType() {
  isPC.value = window.innerWidth >= 768
}

onMounted(() => {
  updateScreenType()
  window.addEventListener('resize', updateScreenType)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenType)
})
</script>

<template>
  <div
    class="relative min-h-screen w-full bg-cover bg-fixed bg-center"
    :style="`background-image: url('${isPC ? props.pcImage : props.mobileImage}')`"
  >
    <!-- 半透明遮罩层 -->
    <div class="absolute inset-0 bg-white/60 dark:bg-black/40" />

    <!-- 插槽内容 -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>
