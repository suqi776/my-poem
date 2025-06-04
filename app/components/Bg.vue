<template>
  <div
    class="relative min-h-screen w-full bg-[url('/falao.jpg')] bg-cover bg-fixed bg-center md:bg-[url('/pc-bg.png')]"
  >
    <!-- 半透明遮罩层 -->
    <div class="absolute inset-0 bg-white/60 dark:bg-black/40" />

    <!-- 插槽内容 -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>
