<template>
  <div class="flex flex-col gap-1 lg:gap-2">
    <PagesHomeNameLine
      v-motion
      :initial="{ opacity: 0, x: -50 }"
      :enter="{ opacity: 1, x: 0, transition: { duration: 700, delay: 800 } }"
      text="Vlad" />
    <PagesHomeNameLine
      v-motion
      :initial="{ opacity: 0, x: -50 }"
      :enter="{ opacity: 1, x: 0, transition: { duration: 700, delay: 950 } }"
      text="Rumyantsev" />
  </div>
</template>
