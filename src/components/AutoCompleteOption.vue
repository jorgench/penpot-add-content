<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { OptionAutocomplete } from '@/features/share/share.domain'
import { AppProviderExport, AppProviderKey } from '@/providers/AppProviderKey'
import { useTranslation } from 'i18next-vue'
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

const { t } = useTranslation()

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

const router = useRouter()
function openDetail() {
  router.push({ name: option.routeOption })
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
  <div :class="['item_autocomplete gap_8', { loading: loading }]">
    <button class="inner_button" @click="handlerOperation" :ariaLabel="t(option.name)">
      <div class="p_block_8">
        <SvgIcon :name="option.icon" />
      </div>
      <span class="text_start main_content">{{ t(option.name) }}</span>
    </button>
    <button
      v-if="option.routeOption"
      :ariaLabel="t('labelOpenDetailOption')"
      class="item_autocomplete__option _block_8"
      @click.stop="openDetail"
    >
      <SvgIcon name="config" />
    </button>
  </div>
</template>

<style lang="scss">
@layer component {
  .item_autocomplete {
    width: 100%;
    background-color: transparent;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: var(--spacing-8);
    justify-content: center;
    align-items: center;

    & .inner_button {
      width: 100%;
      grid-row: 1;
      grid-column: 1/-1;
      display: grid;
      grid-template-columns: subgrid;
      grid-template-rows: subgrid;
      background-color: transparent;
      gap: var(--spacing-8);
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
    }

    &__option {
      grid-row: 1;
      grid-column: 3;
      background-color: transparent;
      border-radius: var(--radius-standard);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      aspect-ratio: 1;
      padding: 0 var(--spacing-8);

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
