import { defineCompleteOption } from '@/features/share/share.domain'
import { triggerRandomNumbers } from '@/utils/utils'
import { Shape } from '@penpot/plugin-types'

export async function getIdenticonProfile(shapes: Shape[]) {
  return shapes.map(() => {
    return `https://www.gravatar.com/avatar/${triggerRandomNumbers(10)}?d=identicon&f=y&s=500`
  })
}

export async function getUiAvatarProfile(shape: Shape[]) {
  return shape.map(() => {
    const name = (Math.random() + 1).toString(36).substring(2)
    return `https://ui-avatars.com/api/?background=random&name=${name}`
  })
}

export const identifyImage = defineCompleteOption({
  name: 'identifyImage',
  icon: 'image',
  eventType: 'image',
  handler: getIdenticonProfile,
  defaultOption: null,
})

export const avatarImage = defineCompleteOption({
  name: 'avatarImage',
  icon: 'image',
  eventType: 'image',
  handler: getUiAvatarProfile,
  defaultOption: null,
})
