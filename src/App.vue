<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HorizontalTabs from '@/components/HorizontalTabs.vue'

const theme = ref<string | null>(null)

onMounted(() => {
  const url = new URL(window.location.href)

  const initialTheme = url.searchParams.get('theme')

  if (initialTheme) {
    theme.value = initialTheme as string
  }
})

const language = window.navigator.language || navigator?.browserLanguage
</script>

<template>
  <main :data-theme="theme" class="app flow gap_16">
    <HorizontalTabs
      :tabs="[
        { name: 'home', label: 'Inicio' },
        {
          name: 'texts',
          label: 'Textos',
        },
        {
          name: 'image',
          label: 'Imágenes',
        },
      ]"
    />
    {{ language }}
  </main>
</template>

<style>
.app {
  min-height: 100dvh;
  display: grid;
  gap: var(--spacing-16);
  padding: var(--spacing-16) 0;
}
</style>
