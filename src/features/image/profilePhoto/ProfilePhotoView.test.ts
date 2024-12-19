import { render, screen, fireEvent, cleanup } from '@testing-library/vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import ProfilePhotoView from './ProfilePhotoView.vue'
import CRadio from '@/components/CRadio.vue'
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

describe('ProfilePhotoView.vue', () => {
  const mockSendCommand = vi.fn().mockImplementation(() => Promise.resolve())

  beforeEach(() => {
    cleanup()
    vi.mocked(useCommandToPenpot).mockReturnValue({ sendCommand: mockSendCommand, loading: ref(false) })
    vi.clearAllMocks()
  })

  const renderComponent = () => {
    return render(ProfilePhotoView, {
      global: {
        components: { CRadio, DetailLayout },
      },
    })
  }

  it('When rendered, should display all radio options', () => {
    renderComponent()

    const options = ['neutral', 'female', 'male']
    options.forEach(option => {
      expect(screen.getByLabelText(option)).toBeInTheDocument()
    })
  })

  it('When a radio option is selected, should update the bound value', async () => {
    renderComponent()

    const maleOption = screen.getByLabelText('male')
    await fireEvent.click(maleOption)

    expect(maleOption).toBeChecked()
    const neutralOption = screen.getByLabelText('neutral')
    expect(neutralOption).not.toBeChecked()
  })

  it('When "Apply" button is clicked, should call sendCommand with the selected option', async () => {
    renderComponent()

    const maleOption = screen.getByLabelText('male')
    await fireEvent.click(maleOption)

    const applyButton = screen.getByRole('button', { name: 'apply' })
    await fireEvent.click(applyButton)

    expect(mockSendCommand).toHaveBeenCalledWith({
      handler: expect.any(Function),
      eventType: 'image',
      options: { sex: 'male' },
    })
  })

  it('When rendered, should show attribution link to DiverseUI', () => {
    renderComponent()

    const link = screen.getByRole('link', { name: /Static Diverseui/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://diverseui.com/')
    expect(link).toHaveAttribute('target', '_blank')
  })
})
