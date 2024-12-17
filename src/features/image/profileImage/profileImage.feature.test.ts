import { describe, it, expect, vi } from 'vitest'
import { getIdenticonProfile, getUiAvatarProfile } from './profileImage.feature'
import { type Shape } from '@penpot/plugin-types'

vi.mock('@/utils/utils', () => ({
  triggerRandomNumbers: vi.fn(() => '1234567890'), // Mockea siempre el mismo número aleatorio
}))

describe('getIdenticonProfile', () => {
  const baseShape = { width: 100, height: 100 } as Shape

  it('When called with shapes, should generate a Gravatar identicon URL', async () => {
    const shapes = [baseShape, baseShape]

    const result = await getIdenticonProfile(shapes)

    expect(result).toEqual([
      'https://www.gravatar.com/avatar/1234567890?d=identicon&f=y&s=500',
      'https://www.gravatar.com/avatar/1234567890?d=identicon&f=y&s=500',
    ])
  })

  it('When called with an empty array of shapes, should return an empty array', async () => {
    const shapes = [] as Shape[]

    const result = await getIdenticonProfile(shapes)

    expect(result).toEqual([])
  })
})

describe('getUiAvatarProfile', () => {
  const baseShape = { width: 100, height: 100 }

  it('When called with shapes, should generate a UI Avatar URL with a random name.', async () => {
    const shapes = [baseShape, baseShape] as Shape[]

    const result = await getUiAvatarProfile(shapes)

    expect(result).toHaveLength(2)
    result.forEach(url => {
      expect(url).toMatch(/^https:\/\/ui-avatars.com\/api\/\?background=random&name=[a-z0-9]+$/)
    })
  })

  it('When called with an empty array of shapes, should return an empty array.', async () => {
    const shapes = [] as Shape[]

    const result = await getUiAvatarProfile(shapes)

    expect(result).toEqual([])
  })
})
