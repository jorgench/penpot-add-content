<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { OptionAutocomplete } from '@/features/share/share.domain'

const { option } = defineProps<{
  option: OptionAutocomplete<unknown>
  state: 'normal' | 'loading' | 'disabled'
}>()

function openDetail() {
  console.log('Open detail!!')
}
</script>

<template>
  <button class="item_autocomplete gap_8">
    <div class="p_block_8">
      <SvgIcon :name="option.icon" />
    </div>
    <span class="text-start">{{ option.name }}</span>
    <button v-if="option.withOptions" class="item_autocomplete__option _block_8" @click.stop="openDetail">
      <SvgIcon name="menu" />
    </button>
  </button>
</template>

<style lang="scss">
.item_autocomplete {
  width: 100%;
  background-color: transparent;
  grid-template-columns: auto 1fr auto;
  border-radius: var(--radius-standard);
  padding: var(--spacing-16) var(--spacing-8);
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: var(--background-tertiary);
  }

  &:active {
    background-color: var(--background-quaternary);
  }

  &__option {
    background-color: transparent;
    border-radius: var(--radius-standard);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background-color: var(--background-quaternary);
      color: var(--accent-tertiary);
    }
    &:active {
      background-color: var(--accent-primary);
      color: var(--foreground-primary);
    }
    &:focus {
      border: 2px solid var(--accent-primary);
      background-color: var(--background-tertiary);
      color: var(--foreground-secondary);
      outline: none;
    }
  }
}
</style>
