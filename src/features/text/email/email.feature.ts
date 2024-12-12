import { Shape } from '@penpot/plugin-types'
import { EmailRepository } from '../fullname/fullname.domain'
import { emailRepository } from '../services/dummyJson.repository'
import { defineCompleteOption } from '@/features/share/share.domain'

export type GenericEmailConfigOptions = {
  domain?: string
}

function innerGetAutoCompleteEmail(repository: EmailRepository) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (shapes: Shape[], opt: GenericEmailConfigOptions) => {
    if (shapes.length > 200) {
      throw Error('Remplazo por result luego')
    }
    return await repository(shapes.length)
  }
}

export const getEmail = innerGetAutoCompleteEmail(emailRepository)

export const email = defineCompleteOption({
  icon: '@',
  name: 'email',
  eventType: 'text',
  handler: getEmail,
  defaultOption: { domain: '' },
})
