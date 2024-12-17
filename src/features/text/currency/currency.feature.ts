import { defineCompleteOption } from '@/features/share/share.domain'
import { getNumberRandom } from '@/utils/utils'
import { Shape } from '@penpot/plugin-types'
import currencyLib from 'currency.js'

interface BaseCurrencyOptions {
  currencySymbol: string
  currency: string
  min?: number
  max?: number
}

interface CommaDecimalCurrencyOptions extends BaseCurrencyOptions {
  decimalSeparator: ','
  thousandsSeparator: '.'
}

interface PointDecimalCurrencyOptions extends BaseCurrencyOptions {
  decimalSeparator: '.'
  thousandsSeparator: ','
}

export type CurrencyOptions = CommaDecimalCurrencyOptions | PointDecimalCurrencyOptions

export function getCurrencyClean(size: number, options: CurrencyOptions): string[] {
  const { currency, max = 100000, min = 100, decimalSeparator, thousandsSeparator, currencySymbol } = options
  const values: number[] = Array.from<number>({ length: size })

  return values.map(() => {
    const value = getNumberRandom(min, max)
    const precision = ['CLP', 'COP'].includes(currency) ? 0 : 2
    return currencyLib(value, { precision }).format({
      symbol: currencySymbol,
      decimal: decimalSeparator,
      separator: thousandsSeparator,
      pattern: currency === 'EUR' ? `# !` : `! #`,
    })
  })
}

export async function getCurrencyValues(shapes: Shape[], options: CurrencyOptions): Promise<string[]> {
  return getCurrencyClean(shapes.length, options)
}

export const currencyDefaultOption: CurrencyOptions = {
  currency: 'USD',
  currencySymbol: '$',
  decimalSeparator: '.',
  thousandsSeparator: ',',
}

export const currencyOption = defineCompleteOption({
  icon: 'money',
  eventType: 'text',
  name: 'currency',
  routeOption: 'currency',
  handler: getCurrencyValues,
  defaultOption: currencyDefaultOption,
})
