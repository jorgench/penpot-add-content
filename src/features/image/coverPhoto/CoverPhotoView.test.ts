import { render, screen, fireEvent, cleanup } from '@testing-library/vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import CoverPhotoView from './CoverPhotoView.vue'
import CCheckbox from '@/components/CCheckbox.vue'
import CInput from '@/components/CInput.vue'
import DetailLayout from '@/components/DetailLayout.vue'
import useCommandToPenpot from '@/compose/useCommandToPenpot'
import { ref } from 'vue'

// Mock dependencies
vi.mock('@/compose/useCommandToPenpot', () => ({
  default: vi.fn(() => ({
    sendCommand: vi.fn(),
  })),
}))

vi.mock('i18next-vue', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe('CoverPhotoView.vue', () => {
  const mockSendCommand = vi.fn()

  beforeEach(() => {
    cleanup()
    vi.mocked(useCommandToPenpot).mockReturnValue({ sendCommand: mockSendCommand, loading: ref(false) })
    vi.clearAllMocks()
  })

  const renderComponent = () => {
    return render(CoverPhotoView, {
      global: {
        components: { CCheckbox, CInput, DetailLayout },
      },
    })
  }

  it('When rendered, should display the checkbox for grayscale and input for blur', () => {
    renderComponent()

    const grayscaleCheckbox = screen.getByLabelText('applyGrayscale')
    const blurInput = screen.getByLabelText('applyBlur')

    expect(grayscaleCheckbox).toBeInTheDocument()
    expect(grayscaleCheckbox).not.toBeChecked()

    expect(blurInput).toBeInTheDocument()
    expect(blurInput).toHaveAttribute('type', 'number')
    expect(blurInput).toHaveValue(0)
  })

  it('When the checkbox is toggled, should update the grayscale state', async () => {
    renderComponent()

    const grayscaleCheckbox = screen.getByLabelText('applyGrayscale')
    await fireEvent.click(grayscaleCheckbox)

    expect(grayscaleCheckbox).toBeChecked()

    await fireEvent.click(grayscaleCheckbox)
    expect(grayscaleCheckbox).not.toBeChecked()
  })

  it('When the blur input is updated, should update the blur value', async () => {
    renderComponent()

    const blurInput = screen.getByLabelText('applyBlur')

    await fireEvent.update(blurInput, '5')
    expect(blurInput).toHaveValue(5)

    await fireEvent.update(blurInput, '10')
    expect(blurInput).toHaveValue(10)
  })

  it('When the "Apply" button is clicked, should call sendCommand with the correct options', async () => {
    renderComponent()

    const grayscaleCheckbox = screen.getByLabelText('applyGrayscale')
    const blurInput = screen.getByLabelText('applyBlur')
    const applyButton = screen.getByRole('button', { name: 'apply' })

    // Set values
    await fireEvent.click(grayscaleCheckbox)
    await fireEvent.update(blurInput, '7')

    await fireEvent.click(applyButton)

    expect(mockSendCommand).toHaveBeenCalledWith({
      eventType: 'image',
      handler: expect.any(Function),
      options: { blur: 7, grayscale: true },
    })
  })

  it('When rendered, should show attribution link to Picsum Photos', () => {
    renderComponent()

    const link = screen.getByRole('link', { name: /picsum photos/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://picsum.photos/')
    expect(link).toHaveAttribute('target', '_blank')
  })
})
