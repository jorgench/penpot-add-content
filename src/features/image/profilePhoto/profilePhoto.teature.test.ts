import { describe, it, expect, vi } from 'vitest'
import { getUserStaticProfile } from './profilePhoto.feature'
import { getIntRandom } from '@/utils/utils'
import { type Shape } from '@penpot/plugin-types'

vi.mock('@/utils/utils', () => ({
  getIntRandom: vi.fn(min => min), // Mock para controlar el valor aleatorio generado
}))

describe('getUserStaticProfile', () => {
  const baseShape = { width: 100, height: 150 }

  it('When options.sex is "male", should generate male profile URLs.', async () => {
    const shapes = [baseShape, baseShape] as Shape[]
    const options = { sex: 'male' } as { sex: 'male' }

    const result = await getUserStaticProfile(shapes, options)

    expect(result).toEqual([`https://static.diverseui.com/male-0.jpg`, `https://static.diverseui.com/male-0.jpg`])
  })

  it('When options.sex is "female", should generate female profile URLs.', async () => {
    const shapes = [baseShape] as Shape[]
    const options = { sex: 'female' } as { sex: 'female' }

    const result = await getUserStaticProfile(shapes, options)

    expect(result).toEqual([`https://static.diverseui.com/female-0.jpg`])
  })

  it('When options.sex is "neutral", should alternate between male and female profiles based on the random number.', async () => {
    vi.mocked(getIntRandom).mockReturnValueOnce(1).mockReturnValueOnce(2) // Mock números aleatorios

    const shapes = [baseShape, baseShape] as Shape[]
    const options = { sex: 'neutral' } as { sex: 'neutral' }

    const result = await getUserStaticProfile(shapes, options)

    expect(result).toEqual([`https://static.diverseui.com/female-1.jpg`, `https://static.diverseui.com/male-2.jpg`])
  })

  it('When random numbers are generated, should include photo numbers within the valid range (0 to maxNumberInDiverseUi).', async () => {
    vi.mocked(getIntRandom).mockReturnValueOnce(50).mockReturnValueOnce(104) // Mock números aleatorios

    const shapes = [baseShape, baseShape] as Shape[]
    const options = { sex: 'male' } as { sex: 'male' }

    const result = await getUserStaticProfile(shapes, options)

    expect(result).toEqual([`https://static.diverseui.com/male-50.jpg`, `https://static.diverseui.com/male-104.jpg`])
  })

  it('When shapes is empty, should return an empty array.', async () => {
    const shapes = [] as Shape[]
    const options = { sex: 'male' } as { sex: 'male' }

    const result = await getUserStaticProfile(shapes, options)

    expect(result).toEqual([])
  })
})
