export interface Command {
  type: string
  payload?: unknown
}

type ShapeId = string

export interface PenpotOperation {
  content: string[]
  shapeIds: ShapeId[]
}

export interface CommandToPenpot {
  type: 'text' | 'image'
  payload: PenpotOperation
}

interface InnerCommandToUi {
  type: 'selectionchange' | 'themechange' | 'finish'
  payload: unknown
}

interface CommandToUiSelectionChangeEvent extends InnerCommandToUi {
  type: 'selectionchange'
  payload: unknown
}

interface CommandToUiThemeChangeEvent extends InnerCommandToUi {
  type: 'themechange'
  payload: unknown
}

interface FinishEvent {
  isOk: boolean
}

interface CommandToUiFinishEvent extends InnerCommandToUi {
  type: 'finish'
  payload: FinishEvent
}

export type CommandToUi = CommandToUiFinishEvent | CommandToUiSelectionChangeEvent | CommandToUiThemeChangeEvent
