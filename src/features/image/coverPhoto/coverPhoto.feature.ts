import { defineCompleteOption } from '@/features/share/share.domain'
import { Shape } from '@penpot/plugin-types'

const maxSizeImage = 3000

export interface CoverPhotoOptions {
  grayscale: boolean
  blur: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}

export async function getAutoCompletePhoto(shapes: Shape[], options: CoverPhotoOptions): Promise<string[]> {
  const { grayscale = false, blur = null } = options

  let params = '?random'

  if (grayscale) {
    params += '&grayscale'
  }
  if (blur) {
    params += '&blur=' + blur
  }

  return shapes.map(shape => {
    const height = Math.min(Math.ceil(shape.height * 2), maxSizeImage)
    const width = Math.min(Math.ceil(shape.width * 2), maxSizeImage)

    return `https://picsum.photos/${width}/${height}${params}`
  })
}

export const coverPhoto = defineCompleteOption({
  name: 'coverPhoto',
  handler: getAutoCompletePhoto,
  icon: 'image',
  eventType: 'image',
  withOptions: true,
  defaultOption: {
    grayscale: false,
    blur: 0,
  },
})
