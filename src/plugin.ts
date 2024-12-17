import { CommandToPenpot } from './commands/commands'
import { handleCommandToPenpot, handleCommandToUi } from './commands/handlers'

initUiPlugin()
registerPluginListeners()
registerPluginCommands()

function initUiPlugin() {
  penpot.ui.open('PlaceHolder+ dev', `?theme=${penpot.theme}`)
}

function registerPluginListeners() {
  penpot.on('selectionchange', () => {
    handleCommandToUi({
      type: 'selectionchange',
      payload: penpot.selection,
    })
  })
  penpot.on('themechange', theme => {
    handleCommandToUi({
      type: 'themechange',
      payload: theme,
    })
  })
}

function registerPluginCommands() {
  penpot.ui.onMessage((command: CommandToPenpot) => {
    handleCommandToPenpot(command)
  })
}
