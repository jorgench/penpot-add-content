import { describe, it, expect } from 'vitest'
import { getAutoCompletePhoto, CoverPhotoOptions } from './coverPhoto.feature'
import { Shape } from '@penpot/plugin-types'

describe('getAutoCompletePhoto', () => {
  const baseShape = { width: 100, height: 150 } // Base para los tests
  const maxSize = 3000

  it('When no options are provided, should generate correct URLs.', async () => {
    const shapes = [baseShape]
    const options: CoverPhotoOptions = { grayscale: false, blur: 0 }

    const result = await getAutoCompletePhoto(shapes as Shape[], options)

    expect(result).toEqual(['https://picsum.photos/200/300?random'])
  })

  it('When the grayscale option is true, should include param grayscale', async () => {
    const shapes = [baseShape]
    const options: CoverPhotoOptions = { grayscale: true, blur: 0 }

    const result = await getAutoCompletePhoto(shapes as Shape[], options)

    expect(result).toEqual(['https://picsum.photos/200/300?random&grayscale'])
  })

  it('When the blur option is greater than 0, should include param blur.', async () => {
    const shapes = [baseShape]
    const options: CoverPhotoOptions = { grayscale: false, blur: 5 }

    const result = await getAutoCompletePhoto(shapes as Shape[], options)

    expect(result).toEqual(['https://picsum.photos/200/300?random&blur=5'])
  })

  it('When both options are enabled, should include params grayscale and blur.', async () => {
    const shapes = [baseShape]
    const options: CoverPhotoOptions = { grayscale: true, blur: 7 }

    const result = await getAutoCompletePhoto(shapes as Shape[], options)

    expect(result).toEqual(['https://picsum.photos/200/300?random&grayscale&blur=7'])
  })

  it('When shape dimensions exceed the maximum, should limit dimensions to maxSizeImage.', async () => {
    const shapes = [{ width: 5000, height: 4000 }] // Dimensiones mayores a maxSize
    const options: CoverPhotoOptions = { grayscale: false, blur: 0 }

    const result = await getAutoCompletePhoto(shapes as Shape[], options)

    expect(result).toEqual([`https://picsum.photos/${maxSize}/${maxSize}?random`])
  })

  it('When the shapes array is empty, should return an empty array.', async () => {
    const shapes = [] as Shape[]
    const options: CoverPhotoOptions = { grayscale: false, blur: 0 }

    const result = await getAutoCompletePhoto(shapes, options)

    expect(result).toEqual([])
  })

  it('When blur is less than 0 or null, should ignore invalid blur values.', async () => {
    const shapes = [baseShape] as Shape[]
    const options: CoverPhotoOptions = { grayscale: false, blur: -5 } // Blur negativo

    const result = await getAutoCompletePhoto(shapes, options)

    expect(result).toEqual(['https://picsum.photos/200/300?random'])
  })
})
