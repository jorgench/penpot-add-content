import { type CommandToPenpot, type CommandToUi } from './commands'
import { type Board, type Ellipse, type ImageData, type Path, type Rectangle, type Shape } from '@penpot/plugin-types'

export async function handleCommandToPenpot(command: CommandToPenpot) {
  const { shapeIds, content } = command.payload
  const shapes = shapeIds.map(shapeId => penpot.currentPage?.getShapeById(shapeId)).filter(Boolean) as Shape[]
  switch (command.type) {
    case 'text':
      try {
        shapes.forEach((shape, i) => {
          if (penpot.utils.types.isText(shape)) {
            shape.characters = content[i]
          }
        })
        isResultOk()
      } catch (e) {
        console.error(e)
        isResultError()
      }
      break
    case 'image': {
      try {
        const imageData = await Promise.all(content.map(url => penpot.uploadMediaUrl('imageFile', url)))

        shapes.forEach((shape, i) => {
          if (penpot.utils.types.isBoard(shape)) {
            addImageToBoard(shape, imageData[i])
          } else if (isOneAcceptedForm(shape)) {
            addImageToObject(shape, imageData[i])
          }
        })
        isResultOk()
      } catch (e) {
        console.error(e)
        isResultError()
      }

      break
    }
    default:
      exhaustiveMatchingGuard(command.type as never)
  }
}

function isResultOk() {
  handleCommandToUi({
    type: 'finish',
    payload: { isOk: true },
  })
}

function isResultError() {
  handleCommandToUi({
    type: 'finish',
    payload: { isOk: false },
  })
}

function addImageToBoard(shape: Board, imageData: ImageData) {
  const rect = penpot.createRectangle()
  rect.resize(shape.width, shape.height)
  rect.fills = [
    {
      fillOpacity: 1,
      fillImage: {
        ...imageData,
        keepApectRatio: true,
      },
    },
  ]
  shape.children.forEach(o => o.remove())
  shape.appendChild(rect)

  rect.boardX = 0
  rect.boardY = 0
}

function addImageToObject(shape: Rectangle | Path | Ellipse, imageData: ImageData) {
  if (isOneAcceptedForm(shape)) {
    shape.fills = [
      {
        fillOpacity: 1,
        fillImage: {
          ...imageData,
          keepApectRatio: true,
        },
      },
    ]
  }
}

function isOneAcceptedForm(shape: Shape) {
  return (
    penpot.utils.types.isRectangle(shape) || penpot.utils.types.isEllipse(shape) || penpot.utils.types.isPath(shape)
  )
}

export function handleCommandToUi(command: CommandToUi) {
  penpot.ui.sendMessage(command)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function exhaustiveMatchingGuard(_: never) {
  throw new Error('Never value')
}
