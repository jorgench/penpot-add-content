import { describe, it, expect, vi } from 'vitest'
import { getAutoCompletePhone } from './phone.feature'
import { addPrefix, formatWithSeparator, triggerRandomNumbers } from '@/utils/utils'
import { Shape } from '@penpot/plugin-types'

vi.mock('@/utils/utils', () => ({
  triggerRandomNumbers: vi.fn((length: number) => '123456789'.slice(0, length)),
  formatWithSeparator: vi.fn((numbers: string, separator: string) => numbers.split('').join(separator)),
  addPrefix: vi.fn((formatted: string, prefix: string | undefined) => (prefix ? `${prefix}${formatted}` : formatted)),
}))

describe('getAutoCompletePhone', () => {
  const baseShape = { width: 100, height: 100 } as Shape

  it('When called with default options, should generate phone numbers with a default separator.', async () => {
    const shapes = [baseShape, baseShape]
    const options = { length: 9, ch: '-' }

    const result = await getAutoCompletePhone(shapes, options)

    expect(triggerRandomNumbers).toHaveBeenCalledWith(9)
    expect(formatWithSeparator).toHaveBeenCalledWith('123456789', '-')
    expect(addPrefix).toHaveBeenCalledWith('1-2-3-4-5-6-7-8-9', undefined)
    expect(result).toEqual(['1-2-3-4-5-6-7-8-9', '1-2-3-4-5-6-7-8-9'])
  })

  it('When called with a custom separator, should format phone numbers using the separator.', async () => {
    const shapes = [baseShape]
    const options = { length: 5, ch: '.' }

    const result = await getAutoCompletePhone(shapes, options)

    expect(triggerRandomNumbers).toHaveBeenCalledWith(5)
    expect(formatWithSeparator).toHaveBeenCalledWith('12345', '.')
    expect(addPrefix).toHaveBeenCalledWith('1.2.3.4.5', undefined)
    expect(result).toEqual(['1.2.3.4.5'])
  })

  it('When called with a custom prefix, should prepend the prefix to phone numbers.', async () => {
    const shapes = [baseShape]
    const options = { length: 5, ch: '-', prefix: '+1 ' }

    const result = await getAutoCompletePhone(shapes, options)

    expect(triggerRandomNumbers).toHaveBeenCalledWith(5)
    expect(formatWithSeparator).toHaveBeenCalledWith('12345', '-')
    expect(addPrefix).toHaveBeenCalledWith('1-2-3-4-5', '+1 ')
    expect(result).toEqual(['+1 1-2-3-4-5'])
  })

  it('When called with an empty shapes array, should return an empty array.', async () => {
    const shapes: Shape[] = []
    const options = { length: 9, ch: '-' }

    const result = await getAutoCompletePhone(shapes, options)

    expect(result).toEqual([])
  })
})
