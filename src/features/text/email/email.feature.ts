import { Shape } from '@penpot/plugin-types'
import { EmailRepository } from '../fullname/fullname.domain'
import { emailRepository } from '../services/dummyJson.repository'
import { defineCompleteOption } from '@/features/share/share.domain'
import { option } from '@/utils/Option'

export type EmailConfigOptions = {
  domain?: string
}

function innerGetAutoCompleteEmail(repository: EmailRepository) {
  return async (shapes: Shape[], opt: EmailConfigOptions) => {
    if (shapes.length > 200) {
      throw Error('Remplazo por result luego')
    }

    const emails = await repository(shapes.length)

    return option(opt.domain)
      .map(domain => {
        return emails.map(email => {
          const [name] = email.split('@')
          return `${name}@${domain}`
        })
      })
      .getOrElse(emails)
  }
}

export const getEmail = innerGetAutoCompleteEmail(emailRepository)

export const email = defineCompleteOption({
  icon: '@',
  name: 'email',
  eventType: 'text',
  handler: getEmail,
  defaultOption: {},
  routeOption: 'email',
})
