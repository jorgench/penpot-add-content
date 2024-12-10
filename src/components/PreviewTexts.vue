<script setup lang="ts">
const { previewTexts } = defineProps<{
  previewTexts: string[]
}>()
</script>

<template>
  <div class="flow gap_8">
    <strong>Previsualización:</strong>
    <ul class="flow gap_8">
      <li v-for="text in previewTexts" :key="`preview-${text}`">{{ text }}</li>
    </ul>
  </div>
</template>
