import { describe, it, expect, vi } from 'vitest'
import { type CurrencyOptions, getCurrencyClean, getCurrencyValues } from './currency.feature'
import { getNumberRandom } from '@/utils/utils'
import { type Shape } from '@penpot/plugin-types'

vi.mock('@/utils/utils', () => ({
  getNumberRandom: vi.fn(min => min), // Mock para controlar el número aleatorio generado
}))

describe('getCurrencyClean', () => {
  const baseOptions = {
    currencySymbol: '$',
    currency: 'USD',
    decimalSeparator: '.',
    thousandsSeparator: ',',
  } satisfies CurrencyOptions

  it('When called with USD, should generate formatted values with two decimal places.', () => {
    const result = getCurrencyClean(3, baseOptions)

    expect(result).toEqual(['$ 100.00', '$ 100.00', '$ 100.00'])
  })

  it('When called with CLP or COP, should generate formatted values without decimals.', () => {
    const options = { ...baseOptions, currency: 'CLP' }
    const result = getCurrencyClean(2, options)

    expect(result).toEqual(['$ 100', '$ 100'])
  })

  it('When currency is EUR, should apply EUR-specific formatting.', () => {
    const options = { ...baseOptions, currency: 'EUR', currencySymbol: '€' }
    const result = getCurrencyClean(1, options)

    expect(result).toEqual(['100.00 €'])
  })

  it('When using custom separators, should respect the configured decimal and thousands separators.', () => {
    const options = {
      ...baseOptions,
      decimalSeparator: ',',
      thousandsSeparator: '.',
      currencySymbol: '€',
      currency: 'EUR',
    } satisfies CurrencyOptions
    vi.mocked(getNumberRandom).mockReturnValue(1000)
    const result = getCurrencyClean(1, options)

    expect(result).toEqual(['1.000,00 €'])
  })

  it('When size is 0, should return an empty array.', () => {
    const result = getCurrencyClean(0, baseOptions)

    expect(result).toEqual([])
  })
})

describe('getCurrencyValues', () => {
  it('When shapes is empty, should return an empty array.', async () => {
    const shapes = [] as Shape[]
    const options: CurrencyOptions = {
      currencySymbol: '$',
      currency: 'USD',
      decimalSeparator: '.',
      thousandsSeparator: ',',
    }

    const result = await getCurrencyValues(shapes, options)

    expect(result).toEqual([])
  })
})
