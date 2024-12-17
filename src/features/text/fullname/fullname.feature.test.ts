import { describe, it, expect, vi } from 'vitest'
import { type Shape } from '@penpot/plugin-types'

vi.mock('@/features/text/services/dummyJson.repository', () => {
  return {
    fullNameRepository: vi.fn((async (size: number) =>
      Array.from({ length: size }, (_, i) => ({
        name: `Name${i}`,
        lastName: `LastName${i}`,
      }))) satisfies FullNameRepository),
    nameRepository: vi.fn(async (size: number) => Array.from({ length: size }, (_, i) => `Name${i}`)),
    lastNameRepository: vi.fn(async (size: number) => Array.from({ length: size }, (_, i) => `Name${i}`)),
  }
})

import { FullNameOptions, getFullName, getLastName, getName } from './fullname.feature'
import { type FullNameRepository } from './fullname.domain'

describe('GetFullName', () => {
  const baseShape = { width: 100, height: 100 } as Shape

  it('When shapes exceed the limit of nodes, should throw an error.', async () => {
    const shapes = Array(21).fill(baseShape)

    await expect(getFullName(shapes, { elementOrder: ['name', 'lastName'] } satisfies FullNameOptions)).rejects.toThrow(
      'Remplazo por result luego',
    )
  })

  it('When elementOrder specifies "name" and "lastName", should return full names in that order.', async () => {
    const shapes = [baseShape, baseShape]
    const options: FullNameOptions = { elementOrder: ['name', ',', 'lastName'] }

    const result = await getFullName(shapes, options)

    expect(result).toEqual(['Name0 , LastName0', 'Name1 , LastName1'])
  })

  it('When elementOrder specifies only "name", should return only names.', async () => {
    const shapes = [baseShape, baseShape]
    const options: FullNameOptions = { elementOrder: ['name'] }

    const result = await getFullName(shapes, options)

    expect(result).toEqual(['Name0', 'Name1'])
  })

  it('When elementOrder specifies only "lastName", should return only last names.', async () => {
    const shapes = [baseShape, baseShape]
    const options: FullNameOptions = { elementOrder: ['lastName'] }

    const result = await getFullName(shapes, options)

    expect(result).toEqual(['LastName0', 'LastName1'])
  })

  it('When elementOrder is empty, should return empty strings.', async () => {
    const shapes = [baseShape]
    const options = { elementOrder: [] }

    const result = await getFullName(shapes, options)

    expect(result).toEqual([''])
  })
})

describe('getName', () => {
  const baseShape = { width: 100, height: 100 }
  const nameRepository = vi.fn(async (size: number) => Array.from({ length: size }, (_, i) => `Name${i}`))
  const handler = getName(nameRepository)

  it('When shapes exceed the limit of nodes, should throw an error.', async () => {
    const shapes = Array(21).fill(baseShape)

    await expect(handler(shapes)).rejects.toThrow('Remplazo por result luego')
  })

  it('When shapes are valid, should return a list of names.', async () => {
    const shapes = [baseShape, baseShape] as Shape[]

    const result = await handler(shapes)

    expect(result).toEqual(['Name0', 'Name1'])
  })
})

describe('getLastName', () => {
  const baseShape = { width: 100, height: 100 }
  const lastNameRepository = vi.fn(async (size: number) => Array.from({ length: size }, (_, i) => `LastName${i}`))
  const handler = getLastName(lastNameRepository)

  it('When shapes exceed the limit of nodes, should throw an error.', async () => {
    const shapes = Array(21).fill(baseShape)

    await expect(handler(shapes)).rejects.toThrow('Remplazo por result luego')
  })

  it('When shapes are valid, should return a list of last names.', async () => {
    const shapes = [baseShape, baseShape] as Shape[]

    const result = await handler(shapes)

    expect(result).toEqual(['LastName0', 'LastName1'])
  })
})
