<script setup lang="ts">
import { IconsName } from '@/features/share/share.domain'

const { name } = defineProps<{
  name: IconsName
}>()
</script>

<template>
  <svg class="svg_icon">
    <use :href="`#icon-${name}`"></use>
  </svg>
</template>

<style lang="scss">
.svg_icon {
  width: 1em;
  height: 1em;
  stroke: currentColor;
}
</style>
