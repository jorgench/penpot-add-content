import { render, screen, fireEvent, cleanup } from '@testing-library/vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import EmailView from './EmailView.vue'
import userEvent from '@testing-library/user-event'
import useCommandToPenpot from '@/compose/useCommandToPenpot'
import { ref } from 'vue'

vi.mock('@/compose/useCommandToPenpot', () => ({
  default: vi.fn(() => ({
    sendCommand: vi.fn(),
  })),
}))

vi.mock('i18next-vue', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Mock simple translation
  }),
}))

describe('EmailView.vue', () => {
  const mockSendCommand = vi.fn().mockImplementation(() => Promise.resolve())

  beforeEach(() => {
    cleanup()
    vi.mocked(useCommandToPenpot).mockReturnValue({ sendCommand: mockSendCommand, loading: ref(false) })
  })

  const renderComponent = () => {
    return render(EmailView)
  }

  it('When rendered, should display the domain input field with label', () => {
    renderComponent()

    const label = screen.getByText('domain')
    expect(label).toBeInTheDocument()

    const input = screen.getByRole('textbox', { name: 'domain' })
    expect(input).toBeInTheDocument()
  })

  it('When new domain is entered, should update the previews', async () => {
    renderComponent()

    const input = screen.getByRole('textbox', { name: 'domain' })
    const initialPreviews = screen.getAllByRole('listitem')

    // Initial preview texts should use default dummy domain
    expect(initialPreviews).toHaveLength(2)
    expect(initialPreviews[0]).toHaveTextContent('charlot.gonzales@dummyjson.com')
    expect(initialPreviews[1]).toHaveTextContent('mia.rodriguez@dummyjson.com')

    // Update domain
    await fireEvent.update(input, 'example.com')

    const updatedPreviews = screen.getAllByRole('listitem')
    expect(updatedPreviews).toHaveLength(2)
    expect(updatedPreviews[0]).toHaveTextContent('charlot.gonzales@example.com')
    expect(updatedPreviews[1]).toHaveTextContent('mia.rodriguez@example.com')
  })

  it('When "apply" button is clicked, should call sendCommand with the correct options', async () => {
    renderComponent()

    const input = screen.getByRole('textbox', { name: 'domain' })
    const button = screen.getByRole('button', { name: 'apply' })

    await fireEvent.update(input, 'test.com')
    await userEvent.click(button)

    expect(mockSendCommand).toHaveBeenCalledWith({
      eventType: 'text',
      handler: expect.any(Function),
      options: { domain: 'test.com' },
    })
  })

  it('When domain is empty, should use the fallback dummy domain in previews', async () => {
    renderComponent()

    const input = screen.getByRole('textbox', { name: 'domain' })
    await fireEvent.update(input, '')

    const previews = screen.getAllByRole('listitem')
    expect(previews).toHaveLength(2)
    expect(previews[0]).toHaveTextContent('charlot.gonzales@dummyjson.com')
    expect(previews[1]).toHaveTextContent('mia.rodriguez@dummyjson.com')
  })
})
