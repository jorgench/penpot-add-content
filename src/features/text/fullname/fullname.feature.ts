import { defineCompleteOption } from '@/features/share/share.domain'
import { Shape } from '@penpot/plugin-types'
import { fullNameRepository, lastNameRepository, nameRepository } from '@/features/text/services/dummyJson.repository'
import { FullNameRepository, LastNameRepository, NameRepository } from './fullname.domain'

const LimitOfNodes = 20

/**
 * FullName
 */
export type FullNameOptions = {
  elementOrder: ('lastName' | 'name' | ',')[]
}

function innerGetFullName(repository: FullNameRepository) {
  return async (shapes: Shape[], options: FullNameOptions): Promise<string[]> => {
    if (shapes.length > LimitOfNodes) {
      throw Error('Remplazo por result luego')
    }
    const response = await repository(shapes.length)

    return response.map(text => {
      return options.elementOrder
        .map(item => {
          if (item === 'name') {
            return text.name
          } else if (item === 'lastName') {
            return text.lastName
          } else {
            return ','
          }
        })
        .join(' ')
    })
  }
}

export const getFullName = innerGetFullName(fullNameRepository)

export const fullname = defineCompleteOption({
  icon: 'text',
  name: 'fullName',
  routeOption: 'fullName',
  handler: getFullName,
  eventType: 'text',
  defaultOption: { elementOrder: ['name', 'lastName'] },
})

/**
 * Name
 */
function getName(repository: NameRepository) {
  return async (shapes: Shape[]): Promise<string[]> => {
    if (shapes.length > LimitOfNodes) {
      throw Error('Remplazo por result luego')
    }
    return await repository(shapes.length)
  }
}

export const name = defineCompleteOption<null>({
  icon: 'text',
  name: 'name',
  handler: getName(nameRepository),
  eventType: 'text',
  defaultOption: null,
})

/**LastName */
function getLastName(repository: LastNameRepository) {
  return async (shapes: Shape[]): Promise<string[]> => {
    if (shapes.length > LimitOfNodes) {
      throw Error('Remplazo por result luego')
    }
    return await repository(shapes.length)
  }
}

export const lastName = defineCompleteOption<null>({
  icon: 'text',
  name: 'lastName',
  handler: getLastName(lastNameRepository),
  eventType: 'text',
  defaultOption: null as null,
})
