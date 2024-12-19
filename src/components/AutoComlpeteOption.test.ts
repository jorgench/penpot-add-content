import { render, screen, waitFor, cleanup } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import AutocompleteItem from './AutoCompleteOption.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { AppProviderKey } from '@/providers/AppProviderKey'
import { ref } from 'vue'
import { type Router, useRouter } from 'vue-router'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}))

vi.mock('i18next-vue', () => {
  return {
    useTranslation: () => ({
      t: (a: string) => a,
    }),
  }
})

describe('AutocompleteItem.vue', () => {
  const mockRouterPush = vi.fn()
  const mockSendMessageToPenpot = vi.fn()
  const mockShapes = ref([{ id: 'shape-1' }, { id: 'shape-2' }])

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useRouter).mockReturnValue({ push: mockRouterPush } as unknown as Router)
  })

  afterEach(() => {
    cleanup()
  })

  const renderComponent = (props = { option: {} }) => {
    const { option, ...rest } = props

    return render(AutocompleteItem, {
      props: {
        option: {
          icon: 'phone',
          name: 'testName',
          handler: vi.fn().mockResolvedValue(['result-1', 'result-2']),
          eventType: 'text',
          defaultOption: {},
          routeOption: 'testRoute',
          ...option,
        },
        state: 'normal',
        ...rest,
      },
      global: {
        components: { SvgIcon },
        provide: {
          [AppProviderKey]: {
            theme: 'dark',
            shapes: mockShapes,
            sendMessageToPenpot: mockSendMessageToPenpot,
          },
        },
      },
    })
  }

  it('When rendered, should display the icon and label', () => {
    renderComponent()

    expect(screen.getByText('testName')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'svg icon phone' })).toBeInTheDocument()
  })

  it('When button is clicked, should execute the handler function', async () => {
    const mockHandler = vi.fn().mockResolvedValue(Promise.resolve(['content-1', 'content-2']))
    const user = userEvent.setup()
    renderComponent({
      option: { handler: mockHandler },
    })

    const button = screen.getByLabelText(/testName/i)

    await user.click(button)

    expect(mockHandler).toHaveBeenCalledWith(mockShapes.value, {})
    await waitFor(() => {
      expect(mockSendMessageToPenpot).toHaveBeenCalledWith({
        type: 'text',
        payload: {
          content: ['content-1', 'content-2'],
          shapeIds: ['shape-1', 'shape-2'],
        },
      })
    })
  })

  it('When handler is executing, should show loading state', async () => {
    const mockHandler = vi
      .fn()
      .mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(['content']), 500)))

    renderComponent({
      option: { handler: mockHandler },
    })

    const button = screen.getByRole('button', { name: /testName/i })
    await userEvent.click(button)

    expect(button.parentElement).toHaveClass('loading')

    await waitFor(() => {
      expect(button).not.toHaveClass('loading')
    })
  })

  it('When route button is clicked, should navigate to the specified route', async () => {
    renderComponent()

    const routeButton = screen.getByRole('button', { name: /labelOpenDetailOption/i })
    await userEvent.click(routeButton)

    expect(mockRouterPush).toHaveBeenCalledWith({ name: 'testRoute' })
  })

  it('When routeOption is undefined, should not render the route button', () => {
    renderComponent({
      option: { routeOption: undefined },
    })

    expect(screen.queryByRole('button', { name: /config/i })).not.toBeInTheDocument()
  })

  it('When button is clicked multiple times while loading, should prevent additional handler executions', async () => {
    const mockHandler = vi
      .fn()
      .mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(['content']), 500)))

    renderComponent({
      option: { handler: mockHandler },
    })

    const button = screen.getByRole('button', { name: /testName/i })

    // Simulate loading state
    await userEvent.click(button)
    await userEvent.click(button)

    expect(mockHandler).toHaveBeenCalledTimes(1) // Should not execute again
  })

  it('When handler execution fails, should handle errors gracefully', async () => {
    const mockHandler = vi.fn().mockRejectedValue(new Error('Test Error'))

    renderComponent({
      option: { handler: mockHandler },
    })

    const button = screen.getByRole('button', { name: /testName/i })
    await userEvent.click(button)

    await waitFor(() => {
      expect(button).not.toHaveClass('loading')
    })
  })
})
