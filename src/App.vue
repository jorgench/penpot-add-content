<script setup lang="ts">
import HorizontalTabs from '@/components/HorizontalTabs.vue'
import AppProvider from './providers/AppProvider.vue'
import { inject, onMounted } from 'vue'
import { AppProviderKey } from './providers/AppProviderKey'
import { useRouter } from 'vue-router'
import { useTranslation } from 'i18next-vue'

//const language = window.navigator.language

const router = useRouter()

const { i18next, t } = useTranslation()

const { theme } = inject(AppProviderKey, {
  theme: 'dark',
})

onMounted(() => {
  const language = window.navigator.language
  i18next.changeLanguage(language.includes('es') ? 'es' : 'en')
})

function changePage(newName: string) {
  router.push({
    name: newName,
  })
}
</script>

<template>
  <AppProvider>
    <main :data-theme="theme" class="app flow gap_16">
      <HorizontalTabs
        :tabs="[
          { name: 'home', label: t('home') },
          {
            name: 'texts',
            label: t('texts'),
          },
          {
            name: 'image',
            label: t('images'),
          },
        ]"
        @change="changePage"
      />

      <RouterView />
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
