<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { OptionAutocomplete } from '@/features/share/share.domain'
import { AppProviderExport, AppProviderKey } from '@/providers/AppProviderKey'
import { inject, ref } from 'vue'

const { shapes, sendMessageToPenpot } = inject(AppProviderKey, {
  theme: 'dark',
  shapes: ref([]),
  sendMessageToPenpot: () => {},
} as AppProviderExport)

const { option } = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: OptionAutocomplete<any>
  state: 'normal' | 'loading' | 'disabled'
}>()

const loading = ref<boolean>(false)

function openDetail() {
  console.log('Open detail!!')
}

async function dispatchOption() {
  const content = await option.handler(shapes.value, option.defaultOption)
  await sendMessageToPenpot({
    type: option.eventType,
    payload: {
      content,
      shapeIds: shapes.value.map(d => d.id),
    },
  })
}

async function handlerOperation() {
  if (loading.value) return

  try {
    loading.value = true
    await dispatchOption()
    loading.value = false
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    loading.value = false
  }
}
</script>

<template>
  <button :class="['item_autocomplete gap_8', { loading: loading }]" @click="handlerOperation">
    <div class="p_block_8">
      <SvgIcon :name="option.icon" />
    </div>
    <span class="text_start">{{ option.name }}</span>
    <button v-if="option.withOptions" class="item_autocomplete__option _block_8" @click.stop="openDetail">
      <SvgIcon name="menu" />
    </button>
  </button>
</template>

<style lang="scss">
@layer component {
  .item_autocomplete {
    width: 100%;
    background-color: transparent;
    display: grid;
    gap: var(--spacing-8);
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
      aspect-ratio: 1;
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
}

@layer exception {
  .item_autocomplete.loading {
    position: relative;

    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      top: 0;
      position: absolute;
      background-color: var(--background-quaternary);
      opacity: 0.6;
      border-radius: var(--radius-standard);
      transform-origin: left center;
      animation: loadingAnimation 0.3s ease-in-out infinite;
    }
  }
}

@keyframes loadingAnimation {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}
</style>
