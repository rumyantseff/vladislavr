<template>
  <div ref="root" class="relative flex flex-col gap-2">
    <span class="sr-only lg:not-sr-only text-tertiary-font/80 text-sm font-medium">{{ t('form.area') }}</span>

    <button type="button" @click="toggle"
      class="field flex items-center justify-between gap-2 text-left">
      <span :class="contact.selectedArea ? 'text-tertiary-font' : 'text-tertiary-font/40'">
        {{ selectedLabel }}
      </span>
      <SharedIconsChevronDown
        :class="['size-4 shrink-0 text-tertiary-font/60 transition-transform', open ? 'rotate-180' : '']" />
    </button>

    <Transition name="area-dd">
      <ul v-if="open"
        class="absolute top-full left-0 z-20 mt-2 w-full min-w-60 lg:min-w-64 p-1.5
               rounded-xl bg-brand-950/90 backdrop-blur-xl border border-white/10
               shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
        <li v-for="a in areas" :key="a.value">
          <button type="button" @click="selectArea(a.value)"
            class="w-full flex items-start justify-between gap-3 rounded-lg px-3 py-2.5 text-left
                   hover:bg-white/5 transition">
            <span class="flex flex-col">
              <span class="text-tertiary-font font-medium text-sm">{{ t(a.labelKey) }}</span>
              <span class="text-tertiary-font/50 text-xs">{{ t(a.descKey) }}</span>
            </span>
            <SharedIconsCheck v-if="contact.selectedArea === a.value"
              class="size-4 shrink-0 mt-0.5 text-brand-400" />
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '~/composables/useI18n'
import { useServiceAreas } from '~/composables/useServiceAreas'
import { useContactStore } from '~/stores/contact'
import { useDropdownToggle } from '~/composables/useDropdownToggle'

const { t } = useI18n()
const areas = useServiceAreas()
const contact = useContactStore()
const { open, root, close, toggle } = useDropdownToggle()

const selectedLabel = computed(() => {
  const a = areas.find(x => x.value === contact.selectedArea)
  return a ? t(a.labelKey) : t('form.areaPlaceholder')
})

function selectArea(value) {
  contact.setArea(value)
  close()
}
</script>

<style scoped>
.field {
  width: 100%;
  border-radius: 0.75rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 0.7rem 0.9rem;
  font-size: 0.95rem;
  transition: border-color 200ms ease, background-color 200ms ease;
}

.area-dd-enter-active,
.area-dd-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
  transform-origin: top center;
}
.area-dd-enter-from,
.area-dd-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(-6px);
}
</style>
