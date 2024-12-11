<script setup lang="ts">
import HorizontalTabs from '@/components/HorizontalTabs.vue'
import ListOptions from './views/ListOptions.vue'
import { TextOptions } from './features/text'
import AppProvider from './providers/AppProvider.vue'
import { inject } from 'vue'
import { AppProviderKey } from './providers/AppProviderKey'

//const language = window.navigator.language

const { theme } = inject(AppProviderKey, {
  theme: 'dark',
})
</script>

<template>
  <AppProvider>
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

      <ListOptions :options="TextOptions" />
    </main>
  </AppProvider>
</template>

<style>
.app {
  min-height: 100dvh;
  display: grid;
  gap: var(--spacing-16);
  padding: var(--spacing-16) 0;
  grid-template-rows: auto 1fr;
}
</style>
