<template>
  <div class="flex flex-col gap-2" :class="{ 'min-h-0 flex-1': type === 'textarea' }">
    <!-- label sits above on desktop; on mobile it's hidden (still read by screen readers) and
         its text moves into the field's placeholder to save vertical space. -->
    <label :for="id" class="sr-only lg:not-sr-only text-tertiary-font/80 text-sm font-medium">
      {{ label }} <span v-if="required" class="text-red-400">*</span>
    </label>

    <textarea v-if="type === 'textarea'" :id="id" :value="modelValue" :rows="rows"
      :placeholder="placeholder" class="field resize-none rounded-lg min-h-24 flex-1"
      :class="{ 'field--error': error }"
      @input="$emit('update:modelValue', $event.target.value)" />

    <input v-else :id="id" :value="modelValue" :type="type" :placeholder="fieldPlaceholder"
      class="field lg:placeholder:text-transparent"
      :class="[{ 'field--error': error }, type === 'email' ? 'rounded-lg' : '']"
      @input="$emit('update:modelValue', $event.target.value)" />

    <p v-if="error" class="text-red-400 text-xs">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  type: { type: String, default: 'text' },
  rows: { type: Number, default: 4 },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
})

defineEmits(['update:modelValue'])

// inputs use the label as placeholder (visible on mobile where the label is hidden); an
// explicit placeholder prop still wins if one is passed.
const fieldPlaceholder = computed(() =>
  props.placeholder || props.label + (props.required ? ' *' : ''),
)
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
.field::placeholder { color: rgba(255, 255, 255, 0.4); }
.field:focus {
  outline: none;
  border-color: rgba(185, 212, 47, 0.6);
  background-color: rgba(255, 255, 255, 0.08);
}
</style>
