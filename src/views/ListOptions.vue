<script setup lang="ts">
import AutoCompleteOption from '@/components/AutoCompleteOption.vue'
import { OptionAutocomplete } from '@/features/share/share.domain'

const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: OptionAutocomplete<any>[]
}>()
</script>

<template>
  <ul>
    <li v-for="option in props.options" :key="option.name">
      <AutoCompleteOption :option="option" state="normal" />
    </li>
  </ul>
</template>
