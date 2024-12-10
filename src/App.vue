<script setup lang="ts">
import { onMounted, ref } from 'vue'

const theme = ref<string | null>(null)

onMounted(() => {
  const url = new URL(window.location.href)

  const initialTheme = url.searchParams.get('theme')

  if (initialTheme) {
    theme.value = initialTheme as string
  }
})
</script>

<template>
  <main :data-theme="theme"></main>
</template>

<style scoped></style>
