import { HandlerFunction } from '@/features/share/share.domain'
import { AppProviderExport, AppProviderKey } from '@/providers/AppProviderKey'
import { inject, ref } from 'vue'

export default function useCommandToPenpot<T>() {
  const { shapes, sendMessageToPenpot } = inject(AppProviderKey, {
    theme: 'dark',
    shapes: ref([]),
    sendMessageToPenpot: () => {},
  } as AppProviderExport)

  const loading = ref<boolean>(false)

  interface generateProps {
    eventType: 'text' | 'image'
    handler: HandlerFunction<T>
    options: T
  }

  async function sendCommand({ options, handler, eventType }: generateProps) {
    if (loading.value) return
    try {
      const content = await handler(shapes.value, options)
      await sendMessageToPenpot({
        type: eventType,
        payload: {
          content,
          shapeIds: shapes.value.map(d => d.id),
        },
      })
    } catch (e) {
      console.error(e)
    }
    loading.value = false
  }

  return { loading, sendCommand }
}
