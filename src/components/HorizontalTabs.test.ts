import { render, screen, cleanup } from '@testing-library/vue'
import { describe, it, expect, beforeEach } from 'vitest'
import HorizontalTabs from './HorizontalTabs.vue'
import userEvent from '@testing-library/user-event'

describe('HorizontalTabs.vue', () => {
  beforeEach(() => {
    cleanup()
  })

  const renderComponent = (props = {}) => {
    const allProps = {
      tabs: [],
      ...props,
    }

    return render(HorizontalTabs, {
      props: allProps,
    })
  }

  it('When tabs are provided, should render the tabs correctly', () => {
    const tabs = [
      { name: 'tab1', label: 'Tab 1' },
      { name: 'tab2', label: 'Tab 2' },
    ]
    renderComponent({ tabs })

    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
  })

  it('When component is initialized, should select the first tab by default', () => {
    const tabs = [
      { name: 'tab1', label: 'Tab 1' },
      { name: 'tab2', label: 'Tab 2' },
    ]
    renderComponent({ tabs })

    const firstTab = screen.getByRole('tab', { name: 'Tab 1' })
    expect(firstTab).toHaveClass('main_tab_switcher__tab__selected')
  })

  it('When a tab is clicked, should change the selected tab and emit an event', async () => {
    const tabs = [
      { name: 'tab1', label: 'Tab 1' },
      { name: 'tab2', label: 'Tab 2' },
    ]
    const { emitted } = renderComponent({ tabs })

    const secondTab = screen.getByRole('tab', { name: 'Tab 2' })
    await userEvent.click(secondTab)

    expect(secondTab).toHaveClass('main_tab_switcher__tab__selected')
    expect(emitted('change')).toHaveLength(1)
    expect(emitted('change')[0]).toEqual(['tab2'])
  })
})
