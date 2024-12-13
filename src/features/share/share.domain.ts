import { Shape } from '@penpot/plugin-types'

export type IconsName = 'menu' | 'text' | '@' | 'number' | 'arrow-left' | 'phone' | 'image' | 'money' | 'user'

export type HandlerFunction<T> = (shapes: Shape[], options: T) => Promise<string[]>

export interface OptionAutocomplete<T> {
  icon: IconsName
  name: string
  routeOption?: string
  defaultOption: T
  handler: HandlerFunction<T>
  eventType: 'text' | 'image'
}

export function defineCompleteOption<T>(arg: OptionAutocomplete<T>): OptionAutocomplete<T> {
  return arg
}
