<template>
  <div class="relative min-h-screen w-full overflow-hidden">
    <div
      class="fixed inset-0 bg-[url('/falao.jpg')] bg-cover bg-center -z-10 md:bg-[url('/pc-bg.png')]"
    />

    <div class="absolute inset-0 z-0 bg-white/60 dark:bg-black/40" />

    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>
