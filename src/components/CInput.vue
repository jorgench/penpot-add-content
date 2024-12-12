<script setup lang="ts">
import { InputTypeHTMLAttribute, useId } from 'vue'

const { label = '', type = 'text' } = defineProps<{
  label?: string
  type?: InputTypeHTMLAttribute
}>()

const data = defineModel<string | number>()

const idControl = useId()
</script>

<template>
  <div class="form_control flow">
    <label :for="idControl">{{ label }}</label>
    <input :id="idControl" class="text-input" :type="type" v-model="data" />
  </div>
</template>

<style lang="scss">
.form_control {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
  z-index: 2;

  & + .form_control {
    margin-block-start: var(--spacing-16);
  }
}

.text-input {
  padding: var(--spacing-8);
  border-radius: var(--radius-standard);
}
</style>
