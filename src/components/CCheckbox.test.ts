import { render, screen, cleanup } from '@testing-library/vue'
import { describe, it, expect, beforeEach } from 'vitest'
import CCheckbox from './CCheckbox.vue'
import userEvent from '@testing-library/user-event'

describe('CCheckbox.vue', () => {
  beforeEach(() => {
    cleanup()
  })

  const renderComponent = (props = {}) => {
    const allProps = {
      label: '',
      modelValue: false,
      ...props,
    }

    return render(CCheckbox, {
      props: allProps,
    })
  }

  it('When label is provided, should render the label correctly', () => {
    renderComponent({ label: 'Test Label' })

    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('When modelValue changes, should bind the model value correctly', async () => {
    const { rerender, emitted } = renderComponent({ modelValue: true })
    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).toBeChecked()

    await userEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()

    expect(emitted('update:modelValue')).toHaveLength(1)
    expect(emitted('update:modelValue')[0]).toEqual([false])

    await rerender({ modelValue: false })
    expect(emitted('update:modelValue')).toHaveLength(1)
    expect(emitted('update:modelValue')[0]).toEqual([false])

    expect(checkbox).not.toBeChecked()
  })
})
