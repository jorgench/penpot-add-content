<script setup lang="ts">
import { IconsName } from '@/features/share/share.domain'
import { useId } from 'vue'

const id = useId()

const { name } = defineProps<{
  name: IconsName
}>()
</script>

<template>
  <svg class="svg_icon" role="img" :ariaLabelledby="id">
    <title :id="id">svg icon {{ name }}</title>
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
