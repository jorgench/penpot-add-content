<script setup lang="ts" generic="T">
import { useId } from 'vue'

const {
  label = '',
  name,
  value,
} = defineProps<{
  label?: string
  name: string
  value: unknown
}>()

//https://github.com/primefaces/primevue/blob/master/packages/primevue/src/radiobutton/RadioButton.vue
const id = useId()

const modelValue = defineModel<T>('modelValue')
</script>

<template>
  <div class="flex gap_4">
    <div class="radio-container">
      <input :id="id" type="radio" class="radio-input" v-model="modelValue" :name="name" :value="value" />
    </div>
    <label v-if="label" :for="id">{{ label }}</label>
  </div>
</template>
