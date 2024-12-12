import { defineCompleteOption } from '@/features/share/share.domain'
import { getIntRandom } from '@/utils/utils'
import { Shape } from '@penpot/plugin-types'

export interface ProfilePhotoOptions {
  sex: 'male' | 'female' | 'neutral'
}

export async function getUserStaticProfile(shapes: Shape[], options: ProfilePhotoOptions): Promise<string[]> {
  const maxNumberInDiverseUi = 105

  return shapes.map(() => {
    const numberPhoto = getIntRandom(0, maxNumberInDiverseUi)
    const sex = options.sex === 'neutral' ? (numberPhoto % 2 === 0 ? 'male' : 'female') : options.sex
    return `https://static.diverseui.com/${sex}-${numberPhoto}.jpg`
  })
}

export const profilePhoto = defineCompleteOption({
  name: 'profilePhoto',
  handler: getUserStaticProfile,
  routeOption: 'profilePhonto',
  icon: 'image',
  eventType: 'image',
  defaultOption: {
    sex: 'neutral',
  },
})
