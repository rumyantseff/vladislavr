<template>
  <div class="h-screen flex flex-col bg-brand-50 overflow-hidden">
    <div data-page-stack-nav class="shrink-0 px-4 sm:px-6 lg:px-10 pt-4 pb-4 sm:pt-6 sm:pb-6 lg:pt-10 lg:pb-10">
      <SectionsNavigation />
    </div>
    <main data-page-stack-scroll class="flex-1 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>
