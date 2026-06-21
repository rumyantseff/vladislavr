<template>
  <div class="w-full h-full p-3 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0! overflow-hidden">
    <div class="sm-root p-4 sm:p-8 lg:p-12 gap-4 sm:gap-8 lg:gap-12 relative
                w-full h-full bg-brand-950/60 backdrop-blur-xl border border-white/10
                rounded-2xl lg:rounded-3xl overflow-hidden
                flex flex-col lg:flex-row">
      <SharedGlowField />
      <div class="sm-image relative z-10 min-h-0 flex-[1_1_30%] lg:flex-none overflow-hidden
                  bg-brand-950 rounded-2xl lg:rounded-3xl">
        <!-- the photo, refracted through reeded glass via an SVG displacement filter -->
        <div aria-hidden="true" class="sm-photo absolute inset-0 bg-cover bg-center" />
        <!-- per-rib specular highlight + dark seam, so the ridges catch light -->
        <div aria-hidden="true" class="sm-fluted absolute inset-0" />
      </div>

      <div class="sm-fields relative z-10 min-h-0 flex-[1_1_auto] lg:flex-none flex flex-col justify-start lg:justify-center
                  sm:p-3 lg:p-12">
        <form v-if="!sent" class="flex flex-col gap-3.5 sm:gap-5 lg:gap-6 min-h-0 flex-1 lg:flex-none" @submit.prevent="onSubmit">
          <PagesSendMessageFormField id="sm-name" v-model="name" :label="t('form.name')" required
            :error="errors.name" @update:model-value="revalidate" />

          <div class="flex flex-col lg:flex-row gap-5 lg:gap-4">
            <div class="lg:basis-2/3">
              <PagesSendMessageFormField id="sm-email" v-model="email" type="email"
                :label="t('form.email')" required :error="errors.email" @update:model-value="revalidate" />
            </div>
            <div class="lg:basis-1/3">
              <PagesSendMessageAreaDropdown />
            </div>
          </div>

          <PagesSendMessageFormField id="sm-message" v-model="message" type="textarea" :rows="4"
            :label="t('form.message')" required :placeholder="t('form.messagePlaceholder')"
            :error="errors.message" @update:model-value="revalidate" />

          <p v-if="submitError" class="text-red-400 text-sm">{{ submitError }}</p>

          <button type="submit" :disabled="submitting"
            class="brand-gradient text-brand-950 font-semibold rounded-lg
                   py-4 lg:py-5 px-6 text-base lg:text-lg
                   hover:brightness-110 transition mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
            {{ submitting ? t('form.sending') : t('form.send') }}
          </button>
        </form>

        <PagesSendMessageFormSuccess v-else />
      </div>
    </div>

    <!-- Reeded-glass refraction: a stepped vertical displacement map shifts each rib of the
         photo sideways (like looking through fluted glass). Tiled so it repeats every rib. -->
    <svg class="sr-only" aria-hidden="true" focusable="false" width="0" height="0">
      <filter id="reeded-glass" x="-2%" y="-2%" width="104%" height="104%"
        primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <!-- one rib: red ramps 0->255 across its width; tiled horizontally it becomes a
             sawtooth, so feDisplacementMap shoves each rib of the photo sideways. -->
        <feImage
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='8'%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='rgb(0,128,0)'/%3E%3Cstop offset='1' stop-color='rgb(255,128,0)'/%3E%3C/linearGradient%3E%3Crect width='44' height='8' fill='url(%23g)'/%3E%3C/svg%3E"
          x="0" y="0" width="44" height="8" result="ribTile"
          preserveAspectRatio="none" />
        <feTile in="ribTile" result="ribs" />
        <feDisplacementMap in="SourceGraphic" in2="ribs" scale="34"
          xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from '~/composables/useI18n'
import { useContactStore } from '~/stores/contact'
import { useServiceAreas } from '~/composables/useServiceAreas'

const { t } = useI18n()
const contact = useContactStore()
const areas = useServiceAreas()

const name = ref('')
const email = ref('')
const message = ref('')
const sent = ref(false)
const submitting = ref(false)
const submitError = ref('')
const submitted = ref(false)
const errors = reactive({ name: '', email: '', message: '' })

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate() {
  errors.name = name.value.trim() ? '' : t('form.err.name')
  if (!email.value.trim()) errors.email = t('form.err.emailRequired')
  else if (!EMAIL_RE.test(email.value.trim())) errors.email = t('form.err.emailInvalid')
  else errors.email = ''
  errors.message = message.value.trim() ? '' : t('form.err.message')
  return !errors.name && !errors.email && !errors.message
}

function revalidate() {
  if (submitted.value) validate()
}

async function onSubmit() {
  submitted.value = true
  submitError.value = ''
  if (!validate()) return

  submitting.value = true
  try {
    const key = useRuntimeConfig().public.web3formsKey
    if (key) {
      const selected = areas.find(a => a.value === contact.selectedArea)
      const data = await $fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: {
          access_key: key,
          subject: 'New message from portfolio',
          from_name: name.value,
          name: name.value,
          email: email.value,
          area: selected ? t(selected.labelKey) : '',
          message: message.value,
        },
      })
      if (!data?.success) throw new Error('send failed')
    }
    sent.value = true
    contact.reset()
  } catch {
    submitError.value = t('form.err.send')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
/* the photo itself, refracted sideways per rib through the SVG reeded-glass filter.
   Scaled up a hair so the displacement never pulls in the bare edge of the image. */
.sm-photo {
  /* dark wash rising from the bottom and fading out by the middle, layered over the photo */
  background-image:
    linear-gradient(to top, rgba(8, 9, 7, 0.92) 0%, rgba(8, 9, 7, 0.55) 28%, transparent 50%),
    image-set(
      url('/abstract-formular.webp') type('image/webp'),
      url('/abstract-formular.png') type('image/png')
    );
  background-image:
    linear-gradient(to top, rgba(8, 9, 7, 0.92) 0%, rgba(8, 9, 7, 0.55) 28%, transparent 50%),
    -webkit-image-set(
      url('/abstract-formular.webp') type('image/webp'),
      url('/abstract-formular.png') type('image/png')
    );
  background-size: cover;
  background-position: center;
  transform: scale(1.06);
  filter: url(#reeded-glass);
}

/* a thin specular line down each ridge crest + a dark seam in the valley, so the ribs read
   as glass catching the light on top of the refraction. */
.sm-fluted {
  --rib: 44px;
  background-image: repeating-linear-gradient(
    to right,
    rgba(0, 0, 0, 0.22) 0,
    rgba(0, 0, 0, 0) 30%,
    rgba(255, 255, 255, 0.28) 50%,
    rgba(0, 0, 0, 0) 70%,
    rgba(0, 0, 0, 0.22) 100%
  );
  background-size: var(--rib) 100%;
  mix-blend-mode: soft-light;
}

@media (min-width: 1024px) {
  .sm-image { flex: 1 1 0; }
  .sm-fields { flex: 1 1 0; }
}
</style>
