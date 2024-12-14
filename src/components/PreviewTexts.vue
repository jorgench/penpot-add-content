<script setup lang="ts">
import { useTranslation } from 'i18next-vue'

const { previewTexts } = defineProps<{
  previewTexts: string[]
}>()

const { t } = useTranslation()
</script>

<template>
  <div class="flow gap_8">
    <strong>{{ t('preview') }}:</strong>
    <ul class="flow gap_8">
      <li v-for="text in previewTexts" :key="`preview-${text}`">{{ text }}</li>
    </ul>
  </div>
</template>
