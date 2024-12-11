import { CommandToPenpot } from '@/commands/commands'
import { type Shape } from '@penpot/plugin-types'
import { type Ref } from 'vue'

export const AppProviderKey = Symbol('App')

export interface AppProviderExport {
  shapes: Ref<Shape[]>
  sendMessageToPenpot: (command: CommandToPenpot) => void
}

export interface ShapeSelectionProvider {
  shapes: Ref<Shape[]>
  sendMessageToPenpot: (opt: { type: 'text' | 'image'; data: string[] }) => void
  changeLoading: (loading: boolean) => void
}
