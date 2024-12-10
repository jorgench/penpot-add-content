<script setup lang="ts">
import { InputTypeHTMLAttribute, useId } from 'vue'

const { label = '', type = 'text' } = defineProps<{
  label?: string
  type?: InputTypeHTMLAttribute
}>()

const data = defineModel<string | number>()

const idControl = useId()
</script>

<template>
  <div class="flow">
    <label :for="idControl">{{ label }}</label>
    <input :id="idControl" class="text-input" :type="type" v-model="data" />
  </div>
</template>
