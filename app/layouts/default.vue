<template>
  <div class="min-h-screen flex flex-col bg-white">
    <SectionsNavigation />
    <main class="flex-1">
      <slot />
    </main>
    <SectionsFooter />
  </div>
</template>
