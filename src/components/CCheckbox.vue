<script setup lang="ts">
const { label = '' } = defineProps<{
  label?: string
}>()

const data = defineModel()
</script>

<template>
  <label class="checklist-item">
    <span class="checkbox-container">
      <input class="checkbox-input" type="checkbox" v-model="data" />
    </span>
    <span>{{ label }}</span>
  </label>
</template>

<style lang="scss">
.checklist-item {
  display: flex;
  gap: var(--spacing-8);
  padding: var(--spacing-8) 0;
}
</style>
