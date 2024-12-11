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

function getFullName(repository: FullNameRepository) {
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

export const fullname = defineCompleteOption({
  icon: 'text',
  name: 'fullName',
  withOptions: true,
  handler: getFullName(fullNameRepository),
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
  withOptions: false,
  handler: getName(nameRepository),
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
  withOptions: false,
  handler: getLastName(lastNameRepository),
  defaultOption: null as null,
})
