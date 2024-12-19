import { describe, it, expect } from 'vitest'
import { getIntRandom, getNumberRandom, triggerRandomNumbers, formatWithSeparator, addPrefix } from './utils'

describe('randomNumbers.ts', () => {
  describe('getIntRandom', () => {
    it('When provides a valid range should return an integer within the specified min and max values', () => {
      const result = getIntRandom(10, 20)
      expect(result).toBeGreaterThanOrEqual(10)
      expect(result).toBeLessThanOrEqual(20)
      expect(Number.isInteger(result)).toBe(true)
    })

    it('When are called without arguments should default to min = 0 and max = 100', () => {
      const result = getIntRandom()
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(100)
    })
  })

  describe('getNumberRandom', () => {
    it('When a valid range is provided should return a float within the specified min and max values', () => {
      const result = getNumberRandom(5.5, 10.5)
      expect(result).toBeGreaterThanOrEqual(5.5)
      expect(result).toBeLessThanOrEqual(10.5)
    })

    it('When are called without arguments should default to min = 0 and max = 100', () => {
      const result = getNumberRandom()
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(100)
    })
  })

  describe('triggerRandomNumbers', () => {
    it('When a valid string size is provided should generate a string of random numbers of the specified size', () => {
      const size = 5
      const result = triggerRandomNumbers(size)
      expect(result).toHaveLength(size)
      expect(result).toMatch(/^\d+$/)
    })

    it('When a string size of 0 is provided should return an empty string', () => {
      const result = triggerRandomNumbers(0)
      expect(result).toBe('')
    })
  })

  describe('formatWithSeparator', () => {
    it('When numbers and a separator are provided should format a string of numbers with the specified separator', () => {
      const numbers = '1234567890'
      const separator = '-'
      const result = formatWithSeparator(numbers, separator)
      expect(result).toBe('123-456-789-0')
    })

    it('When numbers are shorter than regex group size should not add a separator', () => {
      const numbers = '12'
      const separator = '-'
      const result = formatWithSeparator(numbers, separator)
      expect(result).toBe('12')
    })

    it('When input string is empty should return an empty string', () => {
      const result = formatWithSeparator('', '-')
      expect(result).toBe('')
    })
  })

  describe('addPrefix', () => {
    it('When a prefix is ​​provided should add the specified prefix to the number', () => {
      const number = '123456789'
      const prefix = '44'
      const result = addPrefix(number, prefix)
      expect(result).toBe('+44 123456789')
    })

    it('When a prefix is not provided should return the number unchanged', () => {
      const number = '123456789'
      const result = addPrefix(number)
      expect(result).toBe('123456789')
    })

    it('When number is an empty string should return the prefix followed by a space', () => {
      const number = ''
      const prefix = '44'
      const result = addPrefix(number, prefix)
      expect(result).toBe('+44 ')
    })
  })
})
