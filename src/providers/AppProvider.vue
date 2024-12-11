<script setup lang="ts">
import { Shape } from '@penpot/plugin-types'
import { ref, provide, onMounted, onUnmounted } from 'vue'
import { AppProviderExport, AppProviderKey } from './AppProviderKey'
import { CommandToPenpot, CommandToUi } from '@/commands/commands'
import { exhaustiveMatchingGuard } from '@/utils/TypeUtils'
import { option } from '@/utils/Option'

const nodeSelections = ref<Shape[]>([])
provide(AppProviderKey, {
  shapes: nodeSelections,
  sendMessageToPenpot,
} satisfies AppProviderExport)

const theme = ref<string | null>(null)

onMounted(() => {
  const url = new URL(window.location.href)

  const initialTheme = url.searchParams.get('theme')

  if (initialTheme) {
    theme.value = initialTheme as string
  }
  window.addEventListener('message', handlerEvent)
})

onUnmounted(() => {
  window.removeEventListener('message', handlerEvent)
})

function handlerEvent(event: { data: CommandToUi }) {
  console.log(event)
  switch (event.data.type) {
    case 'selectionchange':
      nodeSelections.value = event.data.payload as Shape[]
      break
    case 'themechange':
      theme.value = event.data.payload as string
      break
    case 'finish':
      executePromise(event.data.payload)
      break
    default:
      exhaustiveMatchingGuard(event.data as never)
  }
}

const promiseInProgress = ref<{ res?: () => void; rej?: () => void } | null>(null)

function sendMessageToPenpot(command: CommandToPenpot) {
  if (promiseInProgress.value) return
  console.log('send message to penpot:', { command })
  return new Promise<void>((res, rej) => {
    parent.postMessage(command, '*')
    promiseInProgress.value = { res, rej }
  })
}

function executePromise({ isOk }: { isOk: boolean }) {
  const promise = option(promiseInProgress.value)

  if (isOk) {
    promise.map(({ res }) => res).map(res => res())
  } else {
    promise.map(({ rej }) => rej).map(rej => rej())
  }

  promiseInProgress.value = null
}
</script>

<template>
  <slot></slot>
</template>
