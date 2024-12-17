import { describe, it, expect, vi } from 'vitest'
import { getEmail } from './email.feature'
import { emailRepository } from '../services/dummyJson.repository'
import { type Shape } from '@penpot/plugin-types'

vi.mock('../services/dummyJson.repository', () => ({
  emailRepository: vi.fn(async (size: number) => Array.from({ length: size }, (_, i) => `user${i}@example.com`)),
}))

describe('getEmail', () => {
  const baseShape = { width: 100, height: 100 }

  it('When shapes length exceeds 200, should throw an error.', async () => {
    const shapes = Array(201).fill(baseShape)
    const handler = getEmail

    await expect(handler(shapes, {})).rejects.toThrow('Remplazo por result luego')
  })

  it('When no domain is provided, should return emails as-is.', async () => {
    const shapes = [baseShape, baseShape, baseShape] as Shape[]
    const handler = getEmail

    const result = await handler(shapes, {})

    expect(result).toEqual(['user0@example.com', 'user1@example.com', 'user2@example.com'])
  })

  it('When a domain is provided, should replace the domain in the returned emails.', async () => {
    const shapes = [baseShape, baseShape] as Shape[]
    const handler = getEmail

    const result = await handler(shapes, { domain: 'customdomain.com' })

    expect(result).toEqual(['user0@customdomain.com', 'user1@customdomain.com'])
  })

  it('When domain is null or undefined, should return the original emails.', async () => {
    const shapes = [baseShape] as Shape[]
    const handler = getEmail

    const result = await handler(shapes, { domain: undefined })

    expect(result).toEqual(['user0@example.com'])
  })

  it('When called, should call the repository with the correct size.', async () => {
    const shapes = [baseShape, baseShape, baseShape] as Shape[]

    const result = await getEmail(shapes, { domain: 'example.com' })

    expect(emailRepository).toHaveBeenCalledWith(shapes.length)
    expect(result).toEqual(['user0@example.com', 'user1@example.com', 'user2@example.com'])
  })

  it('When shapes length exceeds 200, should throw an error.', async () => {
    const shapes = Array(201).fill(baseShape)

    await expect(getEmail(shapes, {})).rejects.toThrow('Remplazo por result luego')
  })
})
