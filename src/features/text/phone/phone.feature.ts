import { defineCompleteOption } from '@/features/share/share.domain'
import { addPrefix, formatWithSeparator, triggerRandomNumbers } from '@/utils/utils'
import { Shape } from '@penpot/plugin-types'

export interface PhoneOptions {
  length?: number
  ch?: string
  prefix?: string
}

export async function getAutoCompletePhone(shapes: Shape[], options: PhoneOptions): Promise<string[]> {
  const { length = 9, ch = '-', prefix } = options

  return Array.from({ length: shapes.length }, () => {
    const numbers = triggerRandomNumbers(length)
    const formatNumber = formatWithSeparator(numbers, ch)
    return addPrefix(formatNumber, prefix)
  })
}

export const phone = defineCompleteOption({
  icon: 'phone',
  name: 'phone',
  handler: getAutoCompletePhone,
  eventType: 'text',
  defaultOption: {
    length: 9,
    ch: '-',
  },
})
