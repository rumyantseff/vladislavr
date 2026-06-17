<template>
  <div class="w-full h-full p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0! overflow-hidden">
    <div class="sm-root p-1 sm:p-1 lg:p-2 relative 
                w-full h-full bg-brand-950/60 backdrop-blur-xl border border-white/10
                rounded-2xl lg:rounded-3xl overflow-hidden
                flex flex-col lg:flex-row">
      <SharedGlowField />
      <div class="sm-image relative z-10 h-56 lg:h-auto overflow-hidden
                  bg-brand-950 bg-cover bg-center rounded-xl lg:rounded-2xl"
        style="background-image: url('/about-futuristic.png')" />

      <div class="sm-fields relative z-10 min-h-0 flex flex-col justify-center
                  p-5 sm:p-8 lg:p-12 overflow-y-auto">
        <template v-if="!sent">
          <form class="flex flex-col gap-5 lg:gap-6" @submit.prevent="onSubmit">
            <div class="flex flex-col gap-2">
              <label for="sm-name" class="text-tertiary-font/80 text-sm font-medium">{{ t('form.name') }}</label>
              <input id="sm-name" v-model="name" type="text" required class="field" />
            </div>

            <div class="flex flex-col lg:flex-row gap-5 lg:gap-4">
              <div class="flex flex-col gap-2 lg:basis-2/3">
                <label for="sm-email" class="text-tertiary-font/80 text-sm font-medium">{{ t('form.email') }}</label>
                <input id="sm-email" v-model="email" type="email" required class="field rounded-lg" />
              </div>

              <div ref="areaRoot" class="relative flex flex-col gap-2 lg:basis-1/3">
                <span class="text-tertiary-font/80 text-sm font-medium">{{ t('form.area') }}</span>
                <button type="button" @click="areaOpen = !areaOpen"
                  class="field flex items-center justify-between gap-2 text-left">
                  <span :class="contact.selectedArea ? 'text-tertiary-font' : 'text-tertiary-font/40'">
                    {{ selectedLabel }}
                  </span>
                  <SharedIconsChevronDown
                    :class="['size-4 shrink-0 text-tertiary-font/60 transition-transform', areaOpen ? 'rotate-180' : '']" />
                </button>

                <Transition name="area-dd">
                  <ul v-if="areaOpen"
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
            </div>

            <div class="flex flex-col gap-2">
              <label for="sm-message" class="text-tertiary-font/80 text-sm font-medium">{{ t('form.message') }}</label>
              <textarea id="sm-message" v-model="message" rows="4" required
                :placeholder="t('form.messagePlaceholder')" class="field resize-none rounded-lg" />
            </div>

            <button type="submit"
              class="brand-gradient text-brand-950 font-semibold rounded-lg
                     py-4 lg:py-5 px-6 text-base lg:text-lg
                     hover:brightness-110 transition mt-2">
              {{ t('form.send') }}
            </button>
          </form>
        </template>

        <div v-else class="flex flex-col items-start gap-4 text-tertiary-font">
          <div class="size-12 rounded-full brand-gradient flex items-center justify-center text-brand-950">
            <SharedIconsChevronDoubleRight class="size-6" />
          </div>
          <p class="text-xl lg:text-2xl font-semibold">{{ t('form.success') }}</p>
          <p class="text-tertiary-font/70">{{ t('form.successHint') }}</p>
          <NuxtLink to="/"
            class="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20
                   px-5 py-2.5 text-sm lg:text-base font-medium transition">
            {{ t('form.back') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from '~/composables/useI18n'
import { useServiceAreas } from '~/composables/useServiceAreas'
import { useContactStore } from '~/stores/contact'

const { t } = useI18n()
const areas = useServiceAreas()
const contact = useContactStore()

const name = ref('')
const email = ref('')
const message = ref('')
const sent = ref(false)

const areaOpen = ref(false)
const areaRoot = ref(null)
const selectedLabel = computed(() => {
  const a = areas.find(x => x.value === contact.selectedArea)
  return a ? t(a.labelKey) : t('form.areaPlaceholder')
})
function selectArea(value) {
  contact.setArea(value)
  areaOpen.value = false
}
function onDocClick(e) {
  if (areaOpen.value && areaRoot.value && !areaRoot.value.contains(e.target)) areaOpen.value = false
}
function onKey(e) {
  if (e.key === 'Escape') areaOpen.value = false
}
onMounted(() => {
  document.addEventListener('click', onDocClick)
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  window.removeEventListener('keydown', onKey)
})

function onSubmit() {
  sent.value = true
  contact.reset()
}
</script>

<style scoped>
@media (min-width: 1024px) {
  .sm-image { flex: 0 0 50%; }
  .sm-fields { flex: 0 0 50%; }
}

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
.field::placeholder { color: rgba(255, 255, 255, 0.4); }
.field:focus {
  outline: none;
  border-color: rgba(185, 212, 47, 0.6);
  background-color: rgba(255, 255, 255, 0.08);
}
.field option { background-color: #131311; color: #fff; }

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
