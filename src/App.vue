<script setup lang="ts">
import HorizontalTabs from '@/components/HorizontalTabs.vue'
import AppProvider from './providers/AppProvider.vue'
import { computed, inject, onMounted } from 'vue'
import { AppProviderKey } from './providers/AppProviderKey'
import { useRoute, useRouter } from 'vue-router'
import { useTranslation } from 'i18next-vue'
import SvgIcon from './components/SvgIcon.vue'

//const language = window.navigator.language

const router = useRouter()
const route = useRoute()
const isInSubChild = computed<boolean>(() => {
  return route.path.split('/').length > 2
})

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
      <div class="flow gap_4">
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
        <section v-if="isInSubChild" class="flex gap_4 align_center">
          <button class="btn_icon" @click="() => router.go(-1)">
            <SvgIcon name="arrow-left" />
          </button>
          <span>{{ t(route.name as string) }}</span>
        </section>
      </div>

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
