import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import FullNameView from './FullNameView.vue'
import useCommandToPenpot from '@/compose/useCommandToPenpot'
import { ref } from 'vue'

// Mock external dependencies
vi.mock('i18next-vue', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

vi.mock('./FullNameView.feature', () => ({
  getFullNameView: vi.fn().mockResolvedValue('Generated Full Names'),
}))

vi.mock('@/compose/useCommandToPenpot', () => ({
  default: vi.fn(() => ({
    sendCommand: vi.fn(),
  })),
}))

describe('FullNameView.vue', () => {
  const mockSendCommand = vi.fn().mockImplementation(() => Promise.resolve())

  beforeEach(() => {
    cleanup()
    vi.mocked(useCommandToPenpot).mockReturnValue({ sendCommand: mockSendCommand, loading: ref(false) })
    vi.clearAllMocks()
  })

  const renderComponent = () => {
    return render(FullNameView)
  }

  it('when the component is rendered, it should display a list of draggable elements with checkboxes', () => {
    renderComponent()
    expect(screen.getByText(/orderOfElement/i)).toBeInTheDocument()
    expect(screen.getByLabelText('name')).toBeInTheDocument()
    expect(screen.getByLabelText('lastName')).toBeInTheDocument()
    expect(screen.getByLabelText(',')).toBeInTheDocument()
  })

  it('when checkboxes are toggled, the active items should update accordingly', async () => {
    renderComponent()

    const commaCheckbox = screen.getByLabelText(',')
    await fireEvent.click(commaCheckbox)

    await waitFor(() => {
      expect(commaCheckbox).toBeChecked()
    })
  })

  it('when the apply button is clicked, it should generate full names with the selected order', async () => {
    renderComponent()

    const button = screen.getByText(/apply/i)
    await fireEvent.click(button)

    await waitFor(() => {
      expect(mockSendCommand).toHaveBeenCalledWith({
        options: { elementOrder: ['name', 'lastName'] },
        eventType: 'text',
        handler: expect.any(Function),
      })
    })
  })

  it('when there are active items, it should update the preview list', async () => {
    renderComponent()

    const previewItems = screen.getAllByRole('listitem')
    expect(previewItems).toHaveLength(5)
    expect(previewItems[3]).toHaveTextContent('José Arrollo')
    expect(previewItems[4]).toHaveTextContent('Mateo Lewis')
  })
})
